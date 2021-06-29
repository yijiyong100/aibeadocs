---
title: JUC-原子框架-ABA解决方案
---

## Java高级知识篇【JUC-原子框架-ABA解决方案】

::: tip
本文主要是介绍 JUC-原子框架-ABA解决方案 。
:::

[[toc]]


## ABA问题的产生

CAS会导致“ABA问题”。

CAS算法实现一个重要前提需要取出内存中某时刻的数据并在当下时刻比较并替换，那么在这个时间差类会导致数据的变化。

比如说一个线程1从内存位置V中取出A，这时候另一个线程2也从内存中取出A，并且线程2进行了一些操作将值变成了B，然后线程2又将V位置的数据 变成了A，这时候线程1进行CAS操作发现内存中仍然是A，然后线程1操作成功。只关注开始和结尾，不关心中间过程。

尽管线程1的CAS操作成功，但是不代表这个过程就是没有问题的。

演示ABA问题的产生

``` java
/**
 * 演示ABA问题产生
 */
public class ABADemo1 {
 
    public static AtomicReference<Integer> atomicReference=new AtomicReference<>(100);
 
    public static void main(String[] args) {
        System.out.println("------------ABA问题的产生----------------");
        new Thread(()->{
            //100改101再改回100
            atomicReference.compareAndSet(100,101);
            atomicReference.compareAndSet(101,100);
        },"t1").start();
 
        new Thread(()->{
            //暂停1s，保证上面的t1完成一次ABA操作
            try {TimeUnit.SECONDS.sleep(1);} catch (InterruptedException e) { e.printStackTrace();}
            //只看结果值，不看过程
            System.out.println(atomicReference.compareAndSet(100,2019)+"---"+atomicReference.get());;
        },"t2").start();
    }
}
```

## ABA问题解决

理解原子引用+新增一种机制，那就是修改版本号（类似时间戳）

 先了大概解下原子引用

java.util.concurrent.atomic的atomic包里AtomicReference。
AtomicReference是作用是对”对象”进行原子操作。提供了一种读和写都是原子性的对象引用变量。原子意味着多个线程试图改变同一个AtomicReference(例如比较和交换操作)将不会使得AtomicReference处于不一致的状态。

``` java
/**
 * AtomicReference原子引用
 */
public class AtomicReferenceDemo {
     
    public static void main(String[] args) {
        User user1= new User("张三",22);
        User user2= new User("李四",23);
 
        AtomicReference<User> atomicReference=new AtomicReference<>();
        //设置主物理内存值为user1
        atomicReference.set(user1);
        //现在比较并交换
        System.out.println(atomicReference.compareAndSet(user1,user2)+"-----"+atomicReference.get());
        System.out.println(atomicReference.compareAndSet(user1,user2)+"-----"+atomicReference.get());
    }
}
 
@Data
@AllArgsConstructor
class User{
    private String name;
    private int age;
}
```

然后再用JDK的atomic包里提供了一个类AtomicStampedReference来解决ABA问题。

简单说就是加个类似时间戳的标志，也就是说每一次修改只需要设置不同的版本好即可。如果当前引用 == 预期引用，并且当前标志等于预期标志，则以原子方式将该引用和该标志的值设置为给定的更新值。

演示ABA问题解决

``` java
/**
 * ABA问题解决AtomicStampedReference
 */
public class ABADemo2 {
 
    public static AtomicStampedReference<Integer> atomicStampedReference=new AtomicStampedReference<>(100,1);
 
    public static void main(String[] args) {
        System.out.println("------------ABA问题的解决----------------");
        new Thread(()->{
            //获取版本号
            int stamp=atomicStampedReference.getStamp();
            System.out.println(Thread.currentThread().getName()+" 第1次版本号:"+stamp+
                    "\t 当前值："+atomicStampedReference.getReference());
            //暂停1s为了让t4获取到同一版本号
            try {TimeUnit.SECONDS.sleep(1);} catch (InterruptedException e) { e.printStackTrace();}
            atomicStampedReference.compareAndSet(100,101,atomicStampedReference.getStamp(),atomicStampedReference.getStamp()+1);
            System.out.println(Thread.currentThread().getName()+" 第2次版本号:"+atomicStampedReference.getStamp()+
                    "\t当前值："+atomicStampedReference.getReference());
            atomicStampedReference.compareAndSet(101,100,atomicStampedReference.getStamp(),atomicStampedReference.getStamp()+1);
            System.out.println(Thread.currentThread().getName()+" 第3次版本号:"+atomicStampedReference.getStamp()+
                    "\t当前值："+atomicStampedReference.getReference());
        },"t3").start();
 
        new Thread(()->{
            //获取版本号
            int stamp=atomicStampedReference.getStamp();
            System.out.println(Thread.currentThread().getName()+" 第1次版本号:"+stamp+"\t当前值："+atomicStampedReference.getReference());
            //暂停3s，保证上面的t3完成一次ABA操作
            try {TimeUnit.SECONDS.sleep(3);} catch (InterruptedException e) { e.printStackTrace();}
            //t4还是用傻傻地用上面获取的版本号
            boolean result=atomicStampedReference.compareAndSet(100,2019,stamp,stamp+1);
            System.out.println(Thread.currentThread().getName()+" 修改结果："+result);
            System.out.println(Thread.currentThread().getName()+"当前版本号："+atomicStampedReference.getStamp()+
                    "\t当前最新值"+atomicStampedReference.getReference());
        },"t4").start();
    }
}

```

　　
## 动画图解CAS和ABA

比较并交换。

### CAS示例



``` java
package com.chinda.java.audition;

import java.util.concurrent.atomic.AtomicInteger;

/**
 * CAS示例
 * 1. 什么是CAS
 * CAS就是比较并交换
 *
 * @author Wang Chinda
 * @date 2020/5/3
 * @see
 * @since 1.0
 */

public class CASDemo {
    static AtomicInteger atomicInteger = new AtomicInteger(5);

    public static void main(String[] args) {
        // 若主内存中的值是5, 替换成2020, 返回是否替换成功
        System.out.println(atomicInteger.compareAndSet(5, 2020) + "\t current data: " + atomicInteger.get());
        // 若主内存中的值是5, 替换成2048, 返回是否替换成功
        System.out.println(atomicInteger.compareAndSet(5, 2048) + "\t current data: " + atomicInteger.get());
    }
}
```

### 内存模型解析

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/java/juc/jucatoaba-1.gif')" alt="wxmp">


## CAS 底层原理

### getAndIncrement源码解析



``` java
public class AtomicInteger extends Number implements java.io.Serializable {
    private static final long serialVersionUID = 6214790243416807050L;

    // setup to use Unsafe.compareAndSwapInt for updates
    private static final Unsafe unsafe = Unsafe.getUnsafe();
    private static final long valueOffset;

    static {
        try {
            valueOffset = unsafe.objectFieldOffset
                (AtomicInteger.class.getDeclaredField("value"));
        } catch (Exception ex) { throw new Error(ex); }
    }

    private volatile int value;

    public final int getAndIncrement() {
        return unsafe.getAndAddInt(this, valueOffset, 1);
    }
}	
```

- **Unsafe**

Unsafe是CAS核心类，由于Java方法无法直接访问底层系统，需要通过本地(native)方法来访问，Unsafe相当于一个后门，基于该类可以直接操作特定内存的数据。`Unsafe`类存在于`sun.misc`包中，其内部方法操作可以像C的指针一样直接操作内存，因此Java中CAS操作的执行操作依赖于Unsafe类的方法。

```
注意：Unsafe类中所有的方法都是native修饰的，也就是说Unsage类中的方法都直接调用操作系统底层资源执行相应任务。
```

- **valueOffset**

表示该变量值在内存中的偏移量地址(内存地址)，因为Unsafe就是根据内存偏移地址获取数据的。



```
public final int getAndIncrement() {
    return unsafe.getAndAddInt(this, valueOffset, 1);
}
```

- **变量value**

变量value是用volatile修饰的，保证了多线程之间的内存可见性。



``` java
public final int getAndAddInt(Object var1, long var2, int var4) {
    int var5;
    do {
        // 获取var1对象在var2地址的值, 即当前对象，当前时间，主内存中var2地址的值
        var5 = this.getIntVolatile(var1, var2);
        // 获取当前对象当，前时间，var2地址的值与var5比较，若是相同，说明主内存中的值没有被其余线程修改，将主内存中的值修改为var5+var4,返回true跳出循环；若是不同，继续获取主内存中的值，继续比较，直至相同，赋值，返回true，跳出循环为止。
    } while(!this.compareAndSwapInt(var1, var2, var5, var5 + var4));

    return var5;
}
```

var1：AtomicInteger对象本身。

var2：该对象值的引用地址。

var4：需要变动的值。

var5：是用var1，var2找出的主内存中真实的值。

用该对象当前的值与var5比较，如果相同，将主内存中的只修改为var5+var4，并且返回true，跳出循环；如果不同，继续取值再比较，直至相同，赋值，返回true为止。

### 多线程情况解析

假设线程A和线程B两个线程同时执行getAndIncrement操作。

1. AtomicInteger的value属性的原始值设为3，即主内存中AtomicInteger的value值为3，根据JMM模型，线程A和线程B各自持有一份值为3的value副本分别存放在各自的工作内存中。
2. 线程A通过getIntVolatile(var1, var2)拿到value值为3，这时线程A被挂起。
3. 线程B也通过getIntVolatile(var1, var2)拿到value值为3，此时线程B被没有被挂起并执行compareAndSwapInt方法比较内存值也为3，成功修改内存值为4，线程B执行完成。
4. 这时线程A恢复，执行compareAndSwapInt方法比较，发现自己工作内存中的3和主内存中的数值4不一致，说明该值已经被其它线程抢先一步修改过，那么线程A本次修改失败，只能重新读取重新来过。
5. 线程A重新获取value值，因为变量value被volatile修饰，所以其他线程对它修改，线程A总是可见的，线程A继续执行compareAndSwapInt进行比较替换，直到替换成功。

## CAS 缺点

- 循环时间长，开销大。
- 只能保证一个共享变量的原子性。
- 存在ABA问题。

## ABA问题

CAS算法实现一个重要的前提是需要取出内存中某一时刻数据并在当下时刻比较并替换，那么在这个时间差会导致数据的变化。

比如说线程A从主内存中取出10，这时线程B也从主内存中取出10，并且线程B进行一些操作，将值改成了不为10的值，将这个值各种蹂躏，最后给改回10，这时线程A进行CAS操作发现主内存中的值仍然是10，然后进行替换，操作成功。尽管线程A的CAS操作成功，但不代表这个过程是没有问题的。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/java/juc/jucatoaba-1.gif')" alt="wxmp">


### 原子引用



``` java
package com.chinda.java.audition;

import java.util.concurrent.atomic.AtomicReference;

/**
 * 原子引用
 *
 * @author Wang Chinda  
 * @date 2020/5/8
 * @see
 * @since 1.0
 */
public class AtomicRe {

    public static void main(String[] args) {
        AtomicReference<User> atomicReference = new AtomicReference<User>();
        User zs = new User("张三", 25);
        User ls = new User("李四", 23);
        atomicReference.set(zs);
        System.out.println(atomicReference.compareAndSet(zs, ls) + "\t " + atomicReference.get());
        System.out.println(atomicReference.compareAndSet(zs, ls) + "\t " + atomicReference.get());
    }
}

class User {
    private String name;
    private Integer age;

    public User() {
    }

    public User(String name, Integer age) {
        this.name = name;
        this.age = age;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    @Override
    public String toString() {
        return "User{" +
                "name='" + name + '\'' +
                ", age=" + age +
                '}';
    }
}
```

### 解决ABA问题

原子引用上添加一种机制，添加版本号(类似时间戳)。


``` java
package com.chinda.java.audition;

import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicReference;
import java.util.concurrent.atomic.AtomicStampedReference;

/**
 * ABA解决
 *
 * @author Wang Chinda
 * @date 2020/5/8
 * @see
 * @since 1.0
 */
public class ABADemo {
    static AtomicReference<Integer> atomicReference = new AtomicReference<Integer>(100);
    static AtomicStampedReference<Integer> stampedReference = new AtomicStampedReference<Integer>(100, 1);

    public static void main(String[] args) {

        System.out.println("--------------------产生ABA问题代码-----------------------");
        new Thread(() -> {
            atomicReference.compareAndSet(100, 101);
            atomicReference.compareAndSet(101, 100);
        }, "t1").start();

        new Thread(() -> {
            try {
                TimeUnit.SECONDS.sleep(1);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            System.out.println(atomicReference.compareAndSet(100, 2020) + "\t " + atomicReference.get());
        }, "t2").start();
        try {
            TimeUnit.SECONDS.sleep(2);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        System.out.println("--------------------解决ABA问题代码-----------------------");
        new Thread(() -> {
            int stamp = stampedReference.getStamp();
            System.out.println(Thread.currentThread().getName() + "\t 第一次版本号： " + stamp);
            try {
                // 保证t4线程可以从主内存中获取第一版本数据
                TimeUnit.SECONDS.sleep(1);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            stampedReference.compareAndSet(100, 101, stamp, stamp + 1);
            stamp = stampedReference.getStamp();
            System.out.println(Thread.currentThread().getName() + "\t 第二次版本号： " + stamp);
            stampedReference.compareAndSet(101, 100, stamp, stamp + 1);
            stamp = stampedReference.getStamp();
            System.out.println(Thread.currentThread().getName() + "\t 第三次版本号： " + stamp);
        }, "t3").start();

        new Thread(() -> {
            int stamp = stampedReference.getStamp();
            System.out.println(Thread.currentThread().getName() + "\t 第一次版本号： " + stamp);
            try {
                // 保证t3线程完成一次ABA操作
                TimeUnit.SECONDS.sleep(3);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            System.out.println(Thread.currentThread().getName() + "\t" + stampedReference.compareAndSet(100, 2020, stamp, stamp + 1) + "\t 版本号： " + stamp);

        }, "t4").start();
    }
}
```




## 参考文章
* https://www.cnblogs.com/mabaoying/p/13094173.html
* https://www.cnblogs.com/chinda/p/12852868.html