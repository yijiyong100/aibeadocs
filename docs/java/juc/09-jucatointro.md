---
title: JUC-原子框架-原子类介绍
---

## Java高级知识篇【JUC-原子框架-原子类介绍】

::: tip
本文主要是介绍 JUC-原子框架-原子类介绍 。
:::

[[toc]]

# Java并发包-Atomic-原子类


j.u.c.atomic包含了诸多原子操作类，且JDK1.8对此包进行扩展了。通过JUC源码的阅读和分析能进一步巩固并发知识和Java的并发体系。

## Atomic概览

整个atomic包包含了17个类，如下图所示：根据其功能及其实现原理，可将其分为五个部分。本文主要针对图中序号1都部分进行源码阅读和分析。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/java/juc/jucatointro-1.png')" alt="wxmp">


j.u.c.atomic

## 核心对象——Unsafe

整个atomic都是基于`Unsafe`实现的，Unsafe通过通过单例模式来提供实例对象，这里我们主要关注它提供的几个方法：



```java
# 清单1 sun.misc.Unsafe.class
public final native boolean compareAndSwapInt(Object var1, long var2, 
        int var4, int var5);      // 核心方法CAS
// 参数释义：var1为类对象，参数var2为Field的偏移量，var4为旧值，var5为更新后的值
//（对象和偏移量构成唯一的内存地址，如果对源码JVM有兴趣，可下载源码参考，非本文范畴，不赘述）。

// 计算偏移量
public native long staticFieldOffset(Field var1);
public native long objectFieldOffset(Field var1);
```

Unsafe提供的大多是native方法，`compareAndSwapInt()`通过原子的方式将期望值和内存中的值进行对比，如果两者相等，则执行更新操作。
`staticFieldOffset()`和`objectFieldOffset()`两方法分别提供两静态、非静态域的偏移量计算方法。

注意：之所以命名为Unsafe，因为该对于大部分Java开发者来说是不安全的，它像C一样，拥有操作指针、分配和回收内存的能力，由该对象申请的内存是无法被JVM回收的，因此轻易别用。当然，如果对并发有非常浓厚的兴趣，就要好好研究下它，许多高性能的框架都使用它作为底层实现，如Netty、Kafka。

## AtomicInteger的基本实现

接着再来看`AtomicInteger`的源码：



``` java
# 清单2 AtomicInteger
private static final Unsafe unsafe = Unsafe.getUnsafe();    // 获取单例对象
private static final long valueOffset;    // 偏移量
static {
    try{
        valueOffset = unsafe.objectFieldOffset
                (AtomicInteger.class.getDeclaredField("value"))    // 计算偏移量
    } catch(Exception ex){ throw new Error(ex);}
}    
private volatile int value;    // 使用volatile修饰，保证可见性
```

私有的静态域Unsafe对象和偏移量都是final修饰的，在静态代码块中，通过Unsafe实例计算出域value的偏移地址。
value使用volatile来修饰，保证了其可见性。



```csharp
# 清单3 getAndSetInt的实现
public final int getAndSetInt(Object var1, long var2, int var4) {
    int var5;
    do {
        var5 = this.getIntVolatile(var1, var2);        // 原子获取变量的值
    } while(!this.compareAndSwapInt(var1, var2, var5, var4));
                                                       // CAS操作，失败重试
    return var5;
}
```

通过方法名可知清单3中的方法`getAndSetInt()`为获取旧值并赋予新值的操作，通过CAS失败重试的机制来实现原子操作，这就是乐观锁的思想，也是整个并发包的核心思想。

## 扩展-灵活的函数式编程

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/java/juc/jucatointro-2.png')" alt="wxmp">

AtomicInteger方法

AtomicInteger的方法中，除了简单的加、减、更新和获取的原子操作外，在JDK1.8中增加了4个方法，即图上标红的方法。通过函数式编程，可以灵活的实现更加复杂的原子操作。



```java
# 清单5 IntUnaryOperator接口
int applyAsInt(int operand);

default IntUnaryOperator compose(IntUnaryOperator before) {
    Objects.requireNonNull(before);
    return (int v) -applyAsInt(before.applyAsInt(v));
}

default IntUnaryOperator andThen(IntUnaryOperator after) {
    Objects.requireNonNull(after);
    return (int t) -after.applyAsInt(applyAsInt(t));
}
```

该接口定义了一个待实现方法和两个默认方法，通过compose和andThen即可实现多个IntUnaryOperator的组合调用。在AtomicInteger中做如下调用：



```java
# 清单6 AtomicInteger代码片段
public final int getAndUpdate(IntUnaryOperator updateFunction) {
    int prev, next;
    do {
        prev = get();   // 获取当前值
        next = updateFunction.applyAsInt(prev);  // 函数调用计算
    } while (!compareAndSet(prev, next));   // CAS更新操作
    return prev;
}
```

如同代码清单7，通过函数式编程，可以轻易地完成复杂计算的原子操作。除了IntUnaryOperator接口，还有一个IntBinaryOperator接口，该接口支持额外增加的参数参与计算，两者有相似之处



```java
# 清单7 IntUnaryOperatorTest
public static void main(String[] args) {
    IntOperatorAdd add = new IntOperatorAdd();
    IntOperatorMul mul = new IntOperatorMul();
    int result = new AtomicInteger(3).updateAndGet(add);   // 结果为6 -3+3
    int result2 = new AtomicInteger(3).updateAndGet(mul);  // 结果为9 -3*3
    int result3 = new AtomicInteger(3).updateAndGet(add.andThen(mul));
                                         // 结果为36 -3+3=6, 6*6=36
}

private static class IntOperatorAdd implements IntUnaryOperator {
    @Override
    public int applyAsInt(int operand) {
        return operand + operand;
    }
}

private static class IntOperatorMul implements IntUnaryOperator {
    @Override
    public int applyAsInt(int operand) {
        return operand * operand;
    }
}
```

## 其他原子操作类

除了AtomicInteger外，还有AtomicLong、AtomicReference以及AtomicBoolean三个原子包装类。其实现原理都是一致的，均可举一反三。

至此，原子类部分完
可扩展的知识点：原子性、可见性、乐观锁与悲观锁
其余的四个部分分别是：
原子数组、原子域、ABA问题与解决方案以及支持更高并发能力的累加器&计数器。




## 参考文章
* https://www.jianshu.com/p/7263611fef19