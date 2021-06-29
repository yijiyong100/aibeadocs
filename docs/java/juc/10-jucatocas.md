---
title: JUC-原子框架-CAS原理
---

## Java高级知识篇【JUC-原子框架-CAS原理】

::: tip
本文主要是介绍 JUC-原子框架-CAS原理 。
:::

[[toc]]

## 一、Atomic简介

　　Atomic包是java.util.concurrent下的另一个专门为线程安全设计的Java包，包含多个原子操作类。这个包里面提供了一组原子变量类。其基本的特性就是在多线程环境下，当有多个线程同时执行这些类的实例包含的方法时，具有排他性，即当某个线程进入方法，执行其中的指令时，不会被其他线程打断，而别的线程就像自旋锁一样，一直等到该方法执行完成，才由JVM从等待队列中选择一个另一个线程进入，这只是一种逻辑上的理解。实际上是借助硬件的相关指令来实现的，不会阻塞线程(或者说只是在硬件级别上阻塞了)。可以对基本数据、数组中的基本数据、对类中的基本数据进行操作。原子变量类相当于一种泛化的volatile变量，能够支持原子的和有条件的读-改-写操作。

## 1、传统锁的问题

我们先来看一个例子：计数器（Counter），采用Java里比较方便的锁机制synchronized关键字，初步的代码如下：



``` java
class Counter { 　　
　　private int value; 
　　public synchronized int getValue() { 
　　　　return value; 
　　}　　 

　　public synchronized int increment() { 
　　　　return ++value; 
　　} 

　　public synchronized int decrement() { 
　　　　return --value; 
　　} 
}
```



　　其实像这样的锁机制，满足基本的需求是没有问题的了，但是有的时候我们的需求并非这么简单，我们需要更有效，更加灵活的机制，synchronized关键字是基于阻塞的锁机制，也就是说当一个线程拥有锁的时候，访问同一资源的其它线程需要等待，直到该线程释放锁，这里会有些问题：首先，如果被阻塞的线程优先级很高很重要怎么办？其次，如果获得锁的线程一直不释放锁怎么办？（这种情况是非常糟糕的）。还有一种情况，如果有大量的线程来竞争资源，那CPU将会花费大量的时间和资源来处理这些竞争（事实上CPU的主要工作并非这些），同时，还有可能出现一些例如死锁之类的情况，最后，其实锁机制是一种比较粗糙，粒度比较大的机制，相对于像计数器这样的需求有点儿过于笨重，因此，对于这种需求我们期待一种更合适、更高效的线程安全机制。

## 硬件同步策略

现在的处理器都支持多重处理，当然也包含多个处理器共享外围设备和内存，同时，加强了指令集以支持一些多处理的特殊需求。特别是几乎所有的处理器都可以将其他处理器阻塞以便更新共享变量。

## Compare and swap(CAS)

　　当前的处理器基本都支持CAS，只不过每个厂家所实现的算法并不一样罢了，每一个CAS操作过程都包含三个运算符：一个内存地址V，一个期望的值A和一个新值B，操作的时候如果这个地址上存放的值等于这个期望的值A，则将地址上的值赋为新值B，否则不做任何操作。CAS的基本思路就是，**如果这个地址上的值和期望的值相等，则给其赋予新值，否则不做任何事儿，但是要返回原值是多少**。我们来看一个例子，解释CAS的实现过程（并非真实的CAS实现）：



``` java
public class SimulatedCAS {
    private int value;

    public synchronized int getValue() {
        return value;
    }

    public synchronized int compareAndSwap(int expectedValue, int newValue) {
        int oldValue = value;
        if (value == expectedValue)
            value = newValue;
        return oldValue;
    }
}
```



下面是一个用CAS实现的Counter



``` java
public class CasCounter {
    private SimulatedCAS value;

    public int getValue() {
        return value.getValue();
    }

    public int increment() {
        int oldValue = value.getValue();
        while (value.compareAndSwap(oldValue, oldValue + 1) != oldValue)
            oldValue = value.getValue();
        return oldValue + 1;
    }
}
```



## Atomic类

在JDK5.0之前，想要实现无锁无等待的算法是不可能的，除非用本地库，自从有了Atomic变量类后，这成为可能。下面这张图是java.util.concurrent.atomic包下的类结构。

● 标量类：AtomicBoolean，AtomicInteger，AtomicLong，AtomicReference
● 数组类：AtomicIntegerArray，AtomicLongArray，AtomicReferenceArray
● 更新器类：AtomicLongFieldUpdater，AtomicIntegerFieldUpdater，AtomicReferenceFieldUpdater
● 复合变量类：AtomicMarkableReference，AtomicStampedReference

　　第一组AtomicBoolean，AtomicInteger，AtomicLong，AtomicReference这四种基本类型用来处理布尔，整数，长整数，对象四种数据，其内部实现不是简单的使用synchronized，而是一个更为高效的方式CAS (compare and swap) + volatile和native方法，从而避免了synchronized的高开销，执行效率大为提升。我们来看个例子，与我们平时i++所对应的原子操作为：getAndIncrement()



``` java
    public static void main(String[] args) {
        AtomicInteger ai = new AtomicInteger();
        System.out.println(ai);
        ai.getAndIncrement();
        System.out.println(ai);
    }
```



我们可以看一下AtomicInteger的实现：



``` java
    /**
     * Atomically increments by one the current value.
     *
     * @return the previous value
     */
    public final int getAndIncrement() {
        return unsafe.getAndAddInt(this, valueOffset, 1);
    }
```



　　这里直接调用一个叫Unsafe的类去处理，看来我们还需要继续看一下unsafe类的源码了。JDK8中sun.misc下UnSafe类，点击查看源码

　　从源码注释得知，这个类是用于执行低级别、不安全操作的方法集合。尽管这个类和所有的方法都是公开的（public），但是这个类的使用仍然受限，你无法在自己的java程序中直接使用该类，因为只有授信的代码才能获得该类的实例。所以我们平时的代码是无法使用这个类的，因为其设计的操作过于偏底层，如若操作不慎可能会带来很大的灾难，所以直接禁止普通代码的访问，当然JDK使用是没有问题的。

Atomic中的CAS
　　从前面的解释得知，CAS的原理是拿期望的值和原本的一个值作比较，如果相同则更新成新的值，此处这个“原本的一个值”怎么来，我们看看AtomicInteger里的实现：



``` java
    // setup to use Unsafe.compareAndSwapInt for updates
    private static final Unsafe unsafe = Unsafe.getUnsafe();
    private static final long valueOffset;

    static {
        try {
            valueOffset = unsafe.objectFieldOffset
                (AtomicInteger.class.getDeclaredField("value"));
        } catch (Exception ex) { throw new Error(ex); }
    }
```



这里用到UnSafe的一个方法objectFieldOffset()，查看源码：



``` java
    /**
     * Report the location of a given static field, in conjunction with {@link #staticFieldBase}.
     * <p>Do not expect to perform any sort of arithmetic on this offset;
     * it is just a cookie which is passed to the unsafe heap memory accessors.
     * <p>
     * <p>Any given field will always have the same offset, and no two distinct
     * fields of the same class will ever have the same offset.
     * <p>
     * <p>As of 1.4.1, offsets for fields are represented as long values,
     * although the Sun JVM does not use the most significant 32 bits.
     * It is hard to imagine a JVM technology which needs more than
     * a few bits to encode an offset within a non-array object,
     * However, for consistency with other methods in this class,
     * this method reports its result as a long value.
     *
     * @see #getInt(Object, long)
     */
    public native long objectFieldOffset(Field f);
```



这个方法是用来拿到我们上文提到的这个“原来的值”的内存地址。是一个本地方法，返回值是valueOffset。它的参数field就是AtomicInteger里定义的value属性：



``` java
    private volatile int value;

    /**
     * Creates a new AtomicInteger with the given initial value.
     *
     * @param initialValue the initial value
     */
    public AtomicInteger(int initialValue) {
        value = initialValue;
    }

    /**
     * Creates a new AtomicInteger with initial value {@code 0}.
     */
    public AtomicInteger() {
    }
```

　　value是一个volatile变量，在内存中可见，任何线程都不允许对其进行拷贝，因此JVM可以保证任何时刻任何线程总能拿到该变量的最新值。此处value的值，可以在AtomicInteger类初始化的时候传入，也可以留空，留空则自动赋值为0。

　　再回到CAS，看看getAndIncrement()方法是怎么利用CAS实现的。

``` java
    /**
     * Atomically increments by one the current value.
     *
     * @return the previous value
     */
    public final int getAndIncrement() {
        return unsafe.getAndAddInt(this, valueOffset, 1);
    }
```

　　继续：


``` java
    public final int getAndAddInt(Object var1, long var2, int var4) {
        int var5;
        do {
            var5 = this.getIntVolatile(var1, var2);//---0
        } while(!this.compareAndSwapInt(var1, var2, var5, var5 + var4));//---1

        return var5;
    }
```


``` java
    /**
     * Atomically update Java variable to <tt>x</tt> if it is currently
     * holding <tt>expected</tt>.
     *
     * @return <tt>true</tt> if successful
     */
    public final native boolean compareAndSwapInt(Object o, long offset, int expected, int x);//---2
```

　　其实compareAndSwapInt的注释解释的很明确，原子的将变量的值更新为x，如果成功了返回true，我们知道，如果我们创建AtomicInteger实例时不传入参数，则原始变量的值即为0，

　　所以上面//---0处得到的var5的值即为0,

　　//---1处的代码为：while(!compareAndSwapInt(o, offset, 0, 1))我们知道offset指向的地址对应的值就是原始变量的初值0，所以与期望的值0相同，所以将初值赋值为1，返回true，取反后为false，循环结束，返回v即更新之前的值0. 这就是类似于i++操作的原子操作的实现，当然最终CAS的实现都是native的，用C语言实现的，我们这里看不到源码，有时间我会反编译一下这段代码看看。

## CAS线程安全

　　cas如何实现线程安全呢？请大家自己先考虑一下这个问题，其实我们在语言层面是没有做任何同步的操作的，可以看到源码没有任何锁加在上面，可它为什么是线程安全的呢？这就是Atomic包下这些类的奥秘：语言层面不做处理，我们将其交给硬件—CPU和内存，利用CPU的多处理能力，实现硬件层面的阻塞，再加上volatile变量的特性即可实现基于原子操作的线程安全。所以说，CAS并不是无阻塞，只是阻塞并非在语言、线程方面，而是在硬件层面，所以无疑这样的操作会更快更高效！

## 总结

　　虽然基于CAS的线程安全机制很好很高效，但要说的是，并非所有线程安全都可以用这样的方法来实现，这只适合一些粒度比较小，型如计数器这样的需求用起来才有效，否则也不会有锁的存在了。



## 参考文章
* https://www.cnblogs.com/bjlhx/p/7599369.html