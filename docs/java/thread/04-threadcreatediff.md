---
title: 线程-实现方式比较
---


::: tip
本文主要是介绍 并发编程-线程实现方式比较 。
:::

[[toc]]

### 1、实现方式

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/java/thread/threaddiff-1.png')" alt="wxmp">

　　在java中对于多线程实现一定要有一个线程的主类，而这个线程的主类往往是需要操作一些资源，但是对于多线程主类的实现是：
　　主要是继承Thread父类，Thread内实现了Runnable接口

　　　　从java的Thread类继承实现多线程，也是实现其run方法，然后声明实例，并调用实例的start方法启动线程。

　　　　实现Runnable接口（Callable接口）

　　　　　　使用Runnable接口实现多线程需要两个步骤，首先实现Runnable接口类，然后声明Thread实例，调用thread实例的start方法，开始执行。

​    run接口及模板方法设计模式的标准体现。

### 2、java Thread类的主要方法介绍 

Thread的实例方法：

| **方法定义**                         | **方法说明**                                                                                                             |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------ |
| public void start()                  | 最常用的方法，顾名思义启动线程，即开始执行线程的run方法                                                                  |
| public void run()                    | 如果线程重写了run方法，那么执行重写的方法，否则执行线程的Runnable接口中定义的run                                         |
| public final void setName(String)    | 设置线程的名称，不指定：Thread-数字`    public Thread() {        init(null, null, "Thread-" + nextThreadNum(), 0);    }` |
| public final void setPriority(int)   | 设置线程的优先级（范围在1-10包含1，10）                                                                                  |
| public final void setDeamon(boolean) | 设置线程是否是后台线程                                                                                                   |
| public final void join(long)         | 在另外一个线程中调用当前线程的join方法，会导致当前线程阻塞，直到另一线程执行完毕，或者超过参数指定毫秒数                 |
| public void interrupt()              | 中断线程                                                                                                                 |
| public final boolean isAlive()       | 线程是否处于存活状态，线程在启动和结束之前都处于存活状态                                                                 |

 Thread类的常用静态方法：

| **方法定义**                              | **方法说明**                                                                             |
| ----------------------------------------- | ---------------------------------------------------------------------------------------- |
| public static void yield()                | 使当前运行线程相同优先级的线程获得执行机会，类似sleep，但是只会将cpu让给相同优先级的线程 |
| public static void sleep(long)            | 使当前线程休眠指定毫秒的时间                                                             |
| public static boolean holdsLock(Object x) | 判断当前线程是否拥有对象的锁                                                             |
| public static Thread currentThread()      | 获得当前线程实例                                                                         |
| public static void dumpStack()            | 打印当前线程的执行堆栈，这对多线程程序的调试很有帮助                                     |

## 二、继承Thread类

java.lang.Thread,子类继承Thread，之后覆写run方法，线程主方法



``` java
class MyThread extends Thread {
    private String name;
    public MyThread(String name) {
        this.name = name;
    }
    @Override
    public void run() {// 主方法
        for (int i = 0; i < 10; i++) {
            System.out.println(this.name + " i:" + i);
        }
    }
}
```



　　需要注意，所有线程都是并发执行，在某个时间段上会有多个线程交替执行。所以为了达到这样的目的，绝对不能够直接调用run方法，而是调用线程对象中的start方法



``` java
        MyThread mt1 = new MyThread("线程A");
        MyThread mt2 = new MyThread("线程B");
        MyThread mt3 = new MyThread("线程C");
        //mt1.run()  此时 就是方法调用顺序执行
        mt1.start();
        mt2.start();
        mt3.start();
```



思考？为什么多线程启动不用run，而用start方法？源码

``` java
public synchronized void start() {
        if (threadStatus != 0)
            throw new IllegalThreadStateException(); //异常说明
        group.add(this);
        boolean started = false;
        try {
            start0();
            started = true;
        } finally {
            try {
                if (!started) {
                    group.threadStartFailed(this);
                }
            } catch (Throwable ignore) {
            }
        }
    }
    private native void start0();
```

**源码解析：**
1、throw new IllegalThreadStateException(); //异常说明

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/java/thread/threaddiff-2.png')" alt="wxmp">

　　是Runtime异常，多次启动会抛出
2、start0()
　　调用native的本机操作系统函数

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/java/thread/threaddiff-3.png')" alt="wxmp">

　　由于线程启动需要牵扯操作系统中资源的分配问题，所以具体的线程的启动需要根据不同操作系统有不同的实现，而JVM相当于根据系统中定义的start0()方法来根据不同的操作系统进行该方法的实现，这样在多线程的层次上start0()方法名称不变，而不同的操作系统上有不同的实现。
　　结论：只有Thread类的start()方法才能够进行操作系统的资源分配，所以启动多线程的方式永远就是调用thread类的start来实现。

## 三、实现Runnable接口

　　设计过程中尽量少继承普通类，出现单继承。尽量实现接口或者抽象类。

　　继承Thread类会产生单继承的局限操作，所以现在最好做法利用接口实现。

　　使用Runnable接口实现。Runnable接口的结构：　　

```
@FunctionalInterface
public interface Runnable {
    public abstract void run();//接口定义的抽象方法
}
```

　　此时的代码使用的是函数式接口，可以利用lambda表达式完成

###  1、常规实现



``` java
class MyThread2 implements Runnable {
    private String name;
    public MyThread2(String name) {
        this.name = name;
    }
    @Override
    public void run() {// 主方法
        for (int i = 0; i < 10; i++) {
            System.out.println(this.name + " i:" + i);
        }
    }
}
```



　　如果启动多线程只能依靠Thread类中的start方法，之前继承thread可以使用，现在继承Runnable接口没有此方法。
　　查看Thread类中的构造方法：public Thread(Runnable target) 



``` jav
        MyThread2 mt21 = new MyThread2("线程A");
        MyThread2 mt22 = new MyThread2("线程B");
        MyThread2 mt23 = new MyThread2("线程C");
        new Thread(mt21).start();
        new Thread(mt22).start();
        new Thread(mt23).start();
```



### 2、匿名内部类实现



``` jav
        String name = "线程对象";//以前必须加上finall，由于lamdba，可以不适用
        new Thread(new Runnable() {            
            @Override
            public void run() {
                for (int i = 0; i < 10; i++) {
                    System.out.println(name + " i:" + i);
                }
            }
        }).start();
```



### 3、lamda实现【jdk1.8】

由于Runnable接口是函数式接口



``` jav
        String name = "线程对象";//以前必须加上finall，由于lamdba，可以不适用
        new Thread(() -> {
            for (int i = 0; i < 10; i++) {
                System.out.println(name + " i:" + i);
            }
        }).start();
```



　　**结论：只要给出的是函数式接口基本上就可以使用lamda表达式或者是方法引用**

## 四、实现Callable接口【jdk1.5之后】
Runnable执行完毕，不能回调

　　从JDK1.5之后，对于多线程的实现多了一个Callable接口，在这个接口里面比Runnable接口唯一的强大之处，可以返回执行结果。此接口定义在package java.util.concurrent;包中。

　　定义：

``` java
@FunctionalInterface
public interface Callable<V> {
    V call() throws Exception;
}
```

　　这个泛型表示的是返回值类型，call（）方法就相当于run（）方法。
　　使用：



``` java
class MyThread5 implements Callable<String> {
    private int taket=5;
    @Override
    public String call() {// 主方法
        for (int i = 0; i < 10; i++) {
            if(taket>0)
                System.out.println("卖票 i:" + taket);
        }
        return "票卖完了！";
    }
}
```



　　问题：现在Thread类中并没有提供接口Callable接口对象的操作。现在如何启动多线程？？
``` java
　　　　为了分析启动的操作，需要分析继承结构

　　　　首先来观察java.util.concurrent.FutureTask<V>结构
```
<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/java/thread/threaddiff-4.png')" alt="wxmp">

　　方法调用　　　　



``` java
        Callable<String> callable = new MyThread5();
        //取得执行结果
        FutureTask<String> task = new FutureTask<>(callable);
        Thread thread = new Thread(task);
        thread.start();
        System.out.println(task.get());
```



　　对于此种方式没有特殊要求。一般使用Runnable方式

总结：
　　1.Thread有单继承局限。但是所有线程独享一定要通过Thread中的start启动。
　　2.Runnable可以避免单继承局限，建议使用
　　3.Callable比run唯一好处多了返回值的数据。但是使用复杂一些。

## 五、对于继承Thread方式和实现Runnable接口对比

Thread负责线程本身相关的职责和控制，Runnable负责逻辑执行单元部分。

### 1、区别和联系

　　1.多线程需要一个线程的主类，这个类要么继承Thread类，要么实现Runnable接口

　　2.使用Runnable接口可以比Thread类更好的实现数据共享的操作，并且利用Runnable接口可以避免单继承局限问题

###  2、分析

　　两种模式本质上来讲，一定使用Runnable接口实现，这样可以避免单继承局限，除了使用原则之外，还需要知道两种实现方式的联系：

#### 1.Thread类的定义结构：

　　public class Thread implements Runnable

#### 2.代码分析




``` java
class MyThread2 implements Runnable {
    private String name;
    public MyThread2(String name) {
        this.name = name;
    }
    @Override
    public void run() {// 主方法
        for (int i = 0; i < 10; i++) {
            System.out.println(this.name + " i:" + i);
        }
    }
}
```


main方法


``` java
        MyThread2 mt21 = new MyThread2("线程A");
        MyThread2 mt22 = new MyThread2("线程B");
        MyThread2 mt23 = new MyThread2("线程C");
        new Thread(mt21).start();
        new Thread(mt22).start();
        new Thread(mt23).start();
```



<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/java/thread/threaddiff-5.png')" alt="wxmp">

　　分析代码结构，整个代码的操作中使用的就是一个代理设计模式的结构，但是与传统的代理结构有差别。如果按照传统代理模式，现在要想启动多线程，理论上应该是run()方法，但是实质上调用的是start()方法，名称不符合。之所以这样是因为长期发展的产物，以前设计模式不成熟。2000年以后设计模式快速发展。

　　除了以上继承关联之外，还有一些区别：Runnable接口实现的多线程要比Thread类实现的多线更方便表示出数据共享的概念。

#### 3.数据共享示例

示例：希望有三个线程卖票。

thread实现



``` java
class MyThread3 extends Thread {
    private int taket=5;
    @Override
    public void run() {// 主方法
        for (int i = 0; i < 10; i++) {
            if(taket>0)
                System.out.println("卖票 i:" +taket);
        }
    }
}
```



main方法



``` java
        MyThread3 mt31 = new MyThread3();
        MyThread3 mt32 = new MyThread3();
        MyThread3 mt33 = new MyThread3();
        mt31.start();
        mt32.start();
        mt33.start();
```



每个线程各自卖各自的票，数据没有被共享

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/java/thread/threaddiff-6.png')" alt="wxmp">

Runnable实现



``` java
class MyThread4 implements Runnable {
    private int taket=5;
    @Override
    public void run() {// 主方法
        for (int i = 0; i < 10; i++) {
            if(taket>0)
                System.out.println("卖票 i:" + taket);
        }
    }
}
```



main方法实现

``` java
        MyThread4 mt = new MyThread4();
        new Thread(mt).start();
        new Thread(mt).start();
        new Thread(mt).start();
```

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/java/thread/threaddiff-7.png')" alt="wxmp">

 


## 参考文章
* https://www.cnblogs.com/bjlhx/p/7588971.html