---
title: 线程-基础操作和属性
---


::: tip
本文主要是介绍 线程-基础操作和属性 。
:::

[[toc]]


　　一个线程的创建肯定是由另一个线程创建。

　　被创建线程的父线程就是创建他的线程。



``` java
    private void init(ThreadGroup g, Runnable target, String name,
                      long stackSize, AccessControlContext acc,
                      boolean inheritThreadLocals) {
        if (name == null) {
            throw new NullPointerException("name cannot be null");
        }

        this.name = name;

        Thread parent = currentThread();//父线程
        SecurityManager security = System.getSecurityManager();
        //……
}
```



## 一、线程命名和取得

　　线程的所有操作方法几乎都在Thread类中定义好了

　　从本质上上来讲，多线程的运行状态并不是固定的，唯一的区别就在于线程的名称上。

　　起名：尽可能避免重名，或者避免修改名称。

　　在thread类中提供如下方法：

　　　　构造方法：public Thread(Runnable target, String name)

　　　　设置名字：public final synchronized void setName(String name)

　　　　取得名字：public final String getName()

　　既然线程本身是不缺定的状态，所以如果要取得线程名字的话，那么唯一能做的就是取得当前线程的名字。

　　所以在Thread类中有提供如下方法：

　　　　public static native Thread currentThread();

示例1：





``` java
class MyThread6 implements Runnable {
    @Override
    public void run() {// 主方法
        for (int i = 0; i < 10; i++) {
            System.out.println(Thread.currentThread().getName() + ",i:" + i);
        }
    }
}
```



main方法

``` java
        MyThread6 myThread6 = new MyThread6();
        new Thread(myThread6, "线程A").start();
        new Thread(myThread6).start();
        new Thread(myThread6).start();
```

如果在设置线程对象时没有设置具体名字，那么就采用一个默认的名字进行定义。

示例2



``` java
class MyThread7 implements Runnable {
    @Override
    public void run() {// 主方法
        System.out.println("MyThread7线程类：" + Thread.currentThread().getName());
    }
}
```



main方法

``` java
        MyThread7 myThread7 = new MyThread7();
        new Thread(myThread7, "线程A").start();
        myThread7.run();
```

输出
　　MyThread7线程类：线程A【new Thread(myThread7, "线程A").start();】
　　MyThread7线程类：main【myThread7.run();】

结论　　

　　线程依附于进程，那么进程在哪里？

　　每当使用java命令在JVM上解释一个程序执行的时候，那么都会默认的启动一个JVM的进程，而主方法只是这进程中的一个线程，所以整个程序一直都泡在线程的运行机制上

　　每一个JVM至少会启动两个线程，主线程、GC线程

## 1.1、线程组

创建线程的时候可以显示的指定线程组



``` java
        if (g == null) {
            /* Determine if it's an applet or not */

            /* If there is a security manager, ask the security manager
               what to do. */
            if (security != null) {
                g = security.getThreadGroup();
            }

            /* If the security doesn't have a strong opinion of the matter
               use the parent thread group. */
            if (g == null) {
                g = parent.getThreadGroup();
            }
        }
```



 

小结：1、main线程所在的ThreadGroup称为main；2、构造一个线程如果没有显示的指定ThreadGroup，那么它将会和创建他的父线程同属一个ThreadGroup。并且和父线程同属优先级、以及daemon。

## 二、休眠

如果想让某些线程延缓执行，那么就可以使用休眠的方式来进行处理，在Thread类里面提供如下休眠操作 。

休眠方法：public static native void sleep(long millis) throws InterruptedException;

InterruptedException：如果休眠时间没到就停止休眠了，那么就会产生中断异常

示例代码1：





``` java
class MyThread8 implements Runnable {
    @Override
    public void run() {// 主方法
        for (int i = 0; i < 100; i++) {
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            System.out.println(Thread.currentThread().getName() + ",i=" + i);
        }
    }
}
```



main方法

``` java
        MyThread8 mt = new MyThread8();
        new Thread(mt, "线程A").start();
        new Thread(mt, "线程B").start();
        new Thread(mt, "线程C").start();
```

输出
　　线程C,i=0
　　线程A,i=0
　　线程B,i=0
　　线程A,i=1
　　线程B,i=1
　　线程C,i=1

结论：以上代码执行中感觉像是所有的线程对象都同时休眠了，但严格来讲不是同时，是有先后顺序的，只不过顺序小一点而已。

示例2
main方法

``` java
        MyThread8 mt = new MyThread8();
        Thread thread = new Thread(mt, "线程A");
        thread.start();
        Thread.sleep(3000);
        thread.interrupt();
```

结论：要想中断必须在其他线程操作。

### 三、优先级

从理论上来讲优先级越高的线程越有可能先执行。而在Thread类里面定义有以下的优先级操作方法。

设置优先级：public final void setPriority(int newPriority)

对于优先级一共定义三种：

　　最低优先级：public final static int MIN_PRIORITY = 1;

　　中等优先级：public final static int NORM_PRIORITY = 5;

　　最高优先级：public final static int MAX_PRIORITY = 10;

　　取得优先级：public final int getPriority()

示例1，观察优先级





``` java
class MyThread8 implements Runnable {
    @Override
    public void run() {// 主方法
        for (int i = 0; i < 100; i++) {
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            System.out.println(Thread.currentThread().getName() + ",i=" + i);
        }
    }
}
```



main 方法





``` java
        MyThread8 mt = new MyThread8();
        Thread threadA = new Thread(mt, "线程A");    
        Thread threadB = new Thread(mt, "线程B");    
        Thread threadC = new Thread(mt, "线程C");    
        threadA.setPriority(Thread.MAX_PRIORITY);
        threadB.setPriority(Thread.MIN_PRIORITY);
        threadC.setPriority(Thread.MIN_PRIORITY);
        threadA.start();
        threadB.start();
        threadC.start();
```



理论上A最先

示例2、查看当前线程优先级

``` java
System.out.println(Thread.currentThread().getPriority());
```

结论：

1.线程要有名称，Thread.currentThread()取得当前线程；
2.线程休眠是有先后顺序的；
3.理论上线程的优先级越高，越先执行

## 四、深入理解线程状态

　　利用JDK提供的jstack工具，查看下thread dump文件中线程的状态。NEW、RUNNABLE、TERMINATED这3个状态很容易理解，主要说明其它3种状态。

### 1、显示BLOCKED状态





``` java
public class BlockedState {
    private static Object object = new Object();

    public static void main(String[] args) {
        Runnable task = new Runnable() {
            @Override
            public void run() {
                synchronized (object) {
                    long begin = System.currentTimeMillis();

                    long end = System.currentTimeMillis();

                    // 让线程运行5分钟,会一直持有object的监视器
                    while ((end - begin) <= 5 * 60 * 1000) {

                    }
                }
            }
        };

        new Thread(task, "t1").start();
        new Thread(task, "t2").start();
    }
}
```



先获取object的线程会执行5分钟，这5分钟内会一直持有object的监视器，另一个线程无法执行处在BLOCKED状态

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/java/thread/threadop-1.png')" alt="wxmp">

通过thread dump可以看到：t2线程确实处在BLOCKED (on object monitor)。waiting for monitor entry 等待进入synchronized保护的区域。

### 2、显示WAITING状态 





``` java
public class WaitingState {
    private static Object object = new Object();

    public static void main(String[] args) {
        Runnable task = new Runnable() {
            @Override
            public void run() {
                synchronized (object) {
                    long begin = System.currentTimeMillis();
                    long end = System.currentTimeMillis();

                    // 让线程运行5分钟,会一直持有object的监视器
                    while ((end - begin) <= 5 * 60 * 1000) {
                        try {
                            // 进入等待的同时,会进入释放监视器
                            object.wait();
                        } catch (InterruptedException e) {
                            e.printStackTrace();
                        }
                    }
                }
            }
        };

        new Thread(task, "t1").start();
        new Thread(task, "t2").start();
    }
}
```



<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/java/thread/threadop-2.png')" alt="wxmp">

可以发现t1和t2都处在WAITING (on object monitor)，进入等待状态的原因是调用了in Object.wait()。通过J.U.C包下的锁和条件队列，也是这个效果，大家可以自己实践下。

### 3、显示TIMED_WAITING状态




``` java
public class TimedWaitingState {
    // java的显示锁,类似java对象内置的监视器
    private static Lock lock = new ReentrantLock();
    // 锁关联的条件队列(类似于object.wait)
    private static Condition condition = lock.newCondition();

    public static void main(String[] args) {
        Runnable task = new Runnable() {
            @Override
            public void run() {
                // 加锁,进入临界区
                lock.lock();
                try {
                    condition.await(5, TimeUnit.MINUTES);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
                // 解锁,退出临界区
                lock.unlock();
            }
        };

        new Thread(task, "t1").start();
        new Thread(task, "t2").start();
    }
}
```



<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/java/thread/threadop-3.png')" alt="wxmp">

可以看到t1和t2线程都处在java.lang.Thread.State: TIMED_WAITING (parking)，这个parking代表是调用的JUC下的工具类，而不是java默认的监视器。

## 五、如何使用interupt方法中断线程 

 代码：



``` java
public class GeneralInterrupt extends Object implements Runnable {
    public void run() {
        try {
            System.out.println("in run() - about to work2()");
            work2();
            System.out.println("in run() - back from  work2()");
        } catch (InterruptedException x) {
            System.out.println("in run() -  interrupted in work2()");
            return;
        }
        System.out.println("in run() - doing stuff after nap");
        System.out.println("in run() - leaving normally");
    }

    public void work2() throws InterruptedException {
        while (true) {
            if (Thread.currentThread().isInterrupted()) {
                System.out.println("C isInterrupted()=" + Thread.currentThread().isInterrupted());
                Thread.sleep(2000);
                System.out.println("D isInterrupted()=" + Thread.currentThread().isInterrupted());
            }
        }
    }

    public void work() throws InterruptedException {
        while (true) {
            for (int i = 0; i < 100000; i++) {
                int j = i * 2;
            }
            System.out.println("A isInterrupted()=" + Thread.currentThread().isInterrupted());
            if (Thread.interrupted()) {
                System.out.println("B isInterrupted()=" + Thread.currentThread().isInterrupted());
                throw new InterruptedException();
            }
        }
    }

    public static void main(String[] args) {
      GeneralInterrupt si = new GeneralInterrupt();
      Thread t = new Thread(si);
      t.start();
      try {
         Thread.sleep(2000);
      }
      catch (InterruptedException x) {
      }
      System.out.println("in main() - interrupting other thread");
      t.interrupt();
      System.out.println("in main() - leaving");
   }
}
```



执行结果
　　in run() - about to work2()
　　in main() - interrupting other thread
　　in main() - leaving
　　C isInterrupted()=true
　　in run() - interrupted in work2()

　　方法：sleep、wait、join、等会使当前线程进入阻塞状态，而调用当前线程的interrupt，就可以打断阻塞。

　　主要是：interrupt0(); // Just to set the interrupt flag；设置线程内部的 flag。。

　　isInterrupted()：判断是否被中断，interrupted：判断是否被中断，没有中断的话要擦除标记中断，

# 六、Thread与Jvm虚拟机栈

　　在Thread构造函数中，有个参数stackSize。

## 6.1、StackSize

　　一般情况下，创建线程的时候不会手动指定栈内存地址空间字节数组，统一通过xss参数设置即可。stackSize这个参数对平台依赖性比较高，比如操作系统、硬件等。

　　stackSize越大，代表着正在线程内方法调用递归的深度就越深。

　　stackSIze越小，代表着创建线程数量越多

示例



``` java
public class ThreadDemo02StackSize {
    public static void main(String[] args) {
        if (args.length < 1) {
            System.out.println("please enter the stack size.");
            System.exit(1);
        }
        ThreadGroup threadGroup = new ThreadGroup("testGroup");
        Runnable runnable = new Runnable() {
            final int MAX = Integer.MAX_VALUE;

            @Override
            public void run() {
                int i = 0;
                recurse(i);
            }

            private void recurse(int i) {
                System.out.println(i);
                if (i < MAX) {
                    recurse(i + 1);
                }
            }
        };
        Thread thread = new Thread(threadGroup, runnable, "Test", Integer.parseInt(args[0]));
        thread.start();
    }
}
```



 

配置启动jvm参数

``` java
java -Xmx512m -Xms64m ThreadDemo02StackSize 10
```

 

可以看到随着StackSize参数不断增加，递归的深度也变得越来越大，该参数一般不会主动设置，采用系统默认值即可。默认会设置成0.

## 6.2、JVM内存结构与线程创建

参看：https://www.cnblogs.com/bjlhx/category/980087.html以及https://www.cnblogs.com/bjlhx/p/8877862.html

虽然stackSize不用设置，但是线程与jvm栈内存紧密相关。通过-Xss1m配置，JDK5.0以后每个线程堆栈大小为1M

其中程序计数器是比较小的一块内存，而且该部分内存是不会出现任何溢出异常的， 与线程创建、运行销毁相关比较多的是虚拟机栈内存，而且栈内存划分的大小直接决定一个JVM进程中可以创建多少个线程。

测试代码



``` java
public class ThreadDemo05ThreadCounter extends Thread {
    final static AtomicInteger counter = new AtomicInteger();

    public static void main(String[] args) {
        try {
            while (true) {
                new ThreadDemo05ThreadCounter().start();
            }
        } catch (Throwable e) {
            System.out.println("counter:" + counter.get());
            e.printStackTrace();
        }
    }

    @Override
    public void run() {
        try {
            System.out.println("counter:" + counter.getAndIncrement());
            TimeUnit.SECONDS.sleep(10);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}
```



 

首先查看默认线程栈大小：java -XX:+PrintFlagsFinal -version|grep ThreadStackSize

``` java
intx ThreadStackSize                           = 1024
```

 

即1m

注意一：mac上有一个单进程的最大线程数限制,可以输入下面命令查看。sysctl kern.num_taskthreads

``` java
sysctl kern.num_taskthreads
kern.num_taskthreads: 4096
```

 

注意二：在mac上-Xss1m不起作用，推荐-XX:ThreadStackSize=1m配置

jvm配置：-Xmx64m -Xms64m -XX:ThreadStackSize=1m；输出：

``` java
counter:4071
java.lang.OutOfMemoryError: unable to create new native thread
```

jvm配置：-Xmx64m -Xms64m -XX:ThreadStackSize=100m；输出：

``` java
counter:1304
java.lang.OutOfMemoryError: unable to create new native thread
```

jvm配置：-Xmx64m -Xms64m -XX:ThreadStackSize=256m；输出：

counter:505
java.lang.OutOfMemoryError: unable to create new native thread

 

小结：

　　一个进程内存大小：堆内存+线程数量*栈内存

　　线程数量=（最大地址空间-JVM堆内存-系统保留内存）/ThreadStackSize

　　　　最大地址空间：一般是最大进程内存MaxProcessMemory 在32位的 windows下是 2G，

　　　　这个公式还要注意进程最大线程数量比如有的mac系统为4096个

　　线程实际创建数量也与操作系统参数有关，如mac系统的单进程最大线程数；linux系统 三个：

　　　　/proc/sys/kernal/thread-max；

　　　　/proc/sys/kernal/pid_max；

　　　　/proc/sys/vm/max_map_count；

　　　　max_user_process（ulimit -u） 在64位Linux系统（CentOS 6， 3G内存）下测试，发现还有一个参数是会限制线程数量：max user process（可通过ulimit –a查看，默认值1024，通过ulimit –u可以修改此值），这个值在上面的32位Ubuntu测试环境下并无限制

 



## 参考文章
* https://www.cnblogs.com/bjlhx/p/7589162.html