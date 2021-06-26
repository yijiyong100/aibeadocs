---
title: 线程-常用方法和修饰符
---

## Java高级知识篇【线程-常用方法和修饰符】

::: tip
本文主要是介绍 线程-常用方法和修饰符 。
:::

[[toc]]

## 一、线程sleep join yield wait

### 1、sleep()

　　使当前线程（即调用该方法的线程）暂停执行一段时间，让其他线程有机会继续执行，但它并不释放对象锁，即并不会释放monitor锁。也就是说如果有synchronized同步快，其他线程仍然不能访问共享数据。注意该方法要捕捉异常。

　　例如：有两个线程同时执行(没有synchronized)一个线程优先级为MAX_PRIORITY，另一个为MIN_PRIORITY，如果没有Sleep()方法，只有高优先级的线程执行完毕后，低优先级的线程才能够执行；但是高优先级的线程sleep(500)后，低优先级就有机会执行了。

　　总之，sleep()可以使低优先级的线程得到执行的机会，当然也可以让同优先级、高优先级的线程有执行的机会。

``` java
            Thread.sleep(2000);
            TimeUnit.MICROSECONDS.sleep(2000);//推荐，方便时间控制，内部使用 Thread.sleep　　
```

### 2、join()

　　join()方法使调用该方法的线程在此之前执行完毕，也就是等待该方法的线程执行完毕后再往下继续执行。注意该方法也需要捕捉异常。

　　例如：thread1.join(). 要等待 thread1 结束才执行下面的线程。

### 3、yield()

　　该方法与sleep()类似，只是不能由用户指定暂停多长时间，并且yield（）方法只能让同优先级的线程有执行的机会。自愿放弃CPU资源，如果CPU资源不紧张，忽略提醒。会使线程从Runnable变成Runnable，这个方法不太常用。

## 4、wait()和notify()、notifyAll()

　　这三个方法用于协调多个线程对共享数据的存取，所以必须在synchronized语句块内使用。synchronized关键字用于保护共享数据，阻止其他线程对共享数据的存取，但是这样程序的流程就很不灵活了，如何才能在当前线程还没退出synchronized数据块时让其他线程也有机会访问共享数据呢？此时就用这三个方法来灵活控制。

　　wait()方法使当前线程暂停执行并释放对象锁标示，让其他线程可以进入synchronized数据块，当前线程被放入对象等待池中。当调用notify()方法后，将从对象的等待池中移走一个任意的线程并放到锁标志等待池中，只有锁标志等待池中线程能够获取锁标志；如果锁标志等待池中没有线程，则notify()不起作用。

　　notifyAll()则从对象等待池中移走所有等待那个对象的线程并放到锁标志等待池中。

　　注意 这三个方法都是java.lang.Object的方法。

## 5、优先级

　　setPriority ,获取更多的CPU调度机会，以及获得更多的CPU时间片。1<=x<=10，线程组设置高于线程设置，一般不设置，默认是5。

## 6、常用线程方法

getId：获取线程Id，默认从0开始

Thread.currentThread()：获取当前线程

setContextClassLoader：设置该线程的类加载器，这个方法可以打破java类加载器的父委托机制，有时候这个方法也被称为java类加载器的后门。获取：getContextClassLoader

## 二、run和start()

　　把需要处理的代码放到run()方法中，start()方法启动线程将自动调用run()方法，这个由java的内存机制规定的。并且run()方法必需是public访问权限，返回值类型为void。

### 2.1、线程关闭

1、正常关闭

线程运行结束，生命周期运行结束，就会正常退出

2、获取中断信号关闭线程

通过interrupt退出

3、使用volatile开关控制



``` java
public class ThreadDemo06ThreadExitFlag {
    static class MyTask extends Thread{
        private volatile boolean closed=false;
        @Override
        public void run() {
            System.out.println("started");
            while (!closed&&!isInterrupted()){
                try {
                    TimeUnit.SECONDS.sleep(2);
                } catch (InterruptedException e) {
                }
                System.out.println("do something");
            }
            System.out.println("exit");
        }
        public void close(){
            this.closed=true;
            this.interrupt();
        }
    }

    public static void main(String[] args) throws InterruptedException {
        MyTask myTask=new MyTask();
        myTask.start();
        TimeUnit.SECONDS.sleep(3);
        System.out.println("system will be shutdown");
        myTask.close();
    }
}
```



 

 

缺陷就是循环内任务过久，无法及时中断，如果内部任务4s，外面3s没有被及时终结。

### 2.2、异常退出

线程运行过程中不允许抛出checked异常，如果确定需要捕获checked异常，并且关闭，可以将checked异常封装成unchecked异常（RuntimeException）抛出而结束线程。

### 2.3、进程假死

一般发生进程假死，程序没有任何响应，绝大部分原因是某个线程阻塞，可用jstack、jconsole、jvisualvm等工具排查。

## 三、关键字synchronized

　　该关键字用于保护共享数据，当然前提条件是要分清哪些数据是共享数据。每个对象都有一个锁标志，当一个线程访问到该对象，被Synchronized修饰的数据将被"上锁"，阻止其他线程访问。当前线程访问完这部分数据后释放锁标志，其他线程就可以访问了。

## 四、wait()和notify(),notifyAll()是Object类的方法，sleep()和yield()是Thread类的方法。

## (1)、常用的wait方法有wait()和wait(long timeout);

　　void wait() 在其他线程调用此对象的 notify() 方法或者 notifyAll()方法前，导致当前线程等待。
　　void wait(long timeout)在其他线程调用此对象的notify() 方法 或者 notifyAll()方法，或者超过指定的时间量前，导致当前线程等待。

　　wait()后，线程**会释放掉它所占有的“锁标志”**，从而使线程所在对象中的其他shnchronized数据可被别的线程使用。
　　wait()和notify()因为会对对象的“锁标志”进行操作，所以他们必需在Synchronized函数或者 synchronized block 中进行调用。如果在non-synchronized 函数或 non-synchronized block 中进行调用，虽然能编译通过，但在运行时会发生IllegalMonitorStateException的异常。

示例：



``` java
public class WaitNotifyTest {
    public static void main(String[] args) {
        Object lock = new Object();

        new Thread(new Runnable() {
            @Override
            public void run() {
                System.out.println("线程A等待获取lock锁");
                synchronized (lock) {
                    try {
                        System.out.println("线程A获取了lock锁");
                        Thread.sleep(1000);
                        System.out.println("线程A将要运行lock.wait()方法进行等待");
                        lock.wait();
                        System.out.println("线程A等待结束");
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                }
            }
        }).start();

        new Thread(new Runnable() {
            @Override
            public void run() {
                System.out.println("线程B等待获取lock锁");
                synchronized (lock) {
                    System.out.println("线程B获取了lock锁");
                    try {
                        Thread.sleep(1000);
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                    System.out.println("线程B将要运行lock.notify()方法进行通知");
                    lock.notify();
                }
            }
        }).start();
    }
}
```



## (2)、Thread.sleep(long millis)必须带有一个时间参数。

　　sleep(long)使当前线程进入停滞状态，所以执行sleep()的线程在指定的时间内肯定不会被执行；
　　sleep(long)可使优先级低的线程得到执行的机会，当然也可以让同优先级的线程有执行的机会；
　　sleep(long)是**不会释放锁标志**的。

## (3)、yield()没有参数

　　sleep 方法使当前运行中的线程睡眠一段时间，进入不可以运行状态，这段时间的长短是由程序设定的，yield方法使当前线程让出CPU占有权，但让出的时间是不可设定的。
　　**yield()也不会释放锁标志**。

　　实际上，yield()方法对应了如下操作；先检测当前是否有相同优先级的线程处于同可运行状态，如有，则把CPU的占有权交给次线程，否则继续运行原来的线程，所以yield()方法称为“退让”，它把运行机会让给了同等级的其他线程。

　　sleep 方法允许较低优先级的线程获得运行机会，但yield（）方法执行时，当前线程仍处在可运行状态，所以不可能让出较低优先级的线程此时获取CPU占有权。在一个运行系统中，如果较高优先级的线程没有调用sleep方法，也没有受到I/O阻塞，那么较低优先级线程只能等待所有较高优先级的线程运行结束，方可有机会运行。

　　yield()只是使当前线程重新回到可执行状态，所有执行yield()的线程有可能在进入到可执行状态后马上又被执行，所以yield()方法只能使同优先级的线程有执行的机会。

　　从操作系统的角度讲，os会维护一个ready queue（就绪的线程队列）。并且在某一时刻cpu只为ready queue中位于队列头部的线程服务。

　　但是当前正在被服务的线程可能觉得cpu的服务质量不够好，于是提前退出，这就是yield。
　　或者当前正在被服务的线程需要睡一会，醒来后继续被服务，这就是sleep。

## 结论：

　　sleep方法不推荐使用，可用wait。

　　线程退出最好自己实现，在运行状态中一直检验一个状态，如果这个状态为真，就一直运行，如果外界更改了这个状态变量，那么线程就停止运行。

　　sleep()使当前线程进入停滞状态，所以执行sleep()的线程在指定的时间内肯定不会执行；yield()只是使当前线程重新回到可执行状态，所以执行yield()的线程有可能在进入到可执行状态后马上又被执行。

　　sleep()可使优先级低的线程得到执行的机会，当然也可以让同优先级和高优先级的线程有执行的机会；yield()只能使同优先级的线程有执行的机会。

　　当调用wait()后，线程会释放掉它所占有的“锁标志”，从而使线程所在对象中的其它synchronized数据可被别的线程使用。

　　waite()和notify()因为会对对象的“锁标志”进行操作，所以它们必须在synchronized函数或synchronized　block中进行调用。如果在non-synchronized函数或non-synchronized　block中进行调用，虽然能编译通过，但在运行时会发生IllegalMonitorStateException的异常。

五、示例

5.1、join示例

　　一个接口内获取多家机场接口信息，返回个客户端。串行任务局部并行化。

　　也可以使用CountDownLatch和CyclicBbarrier完成，这里先使用join实现。

查询接口类

``` java
public interface FightQuery {
    List<String> get();
}
```

 

查询任务类



``` java
public class FightQueryTask extends Thread implements FightQuery {
    private final String origin;
    private final String destination;
    private final List<String> fightList = new ArrayList<String>();

    public FightQueryTask(String airline, String origin, String destination) {
        super("[" + airline + "]");
        this.origin = origin;
        this.destination = destination;
    }

    @Override
    public List<String> get() {
        return this.fightList;
    }

    @Override
    public void run() {
        System.out.println(getName() + "-query " + origin + " to " + destination);
        int randomVal = ThreadLocalRandom.current().nextInt(10);
        try {
            TimeUnit.SECONDS.sleep(randomVal);
            this.fightList.add(getName() + "-" + randomVal);
            System.out.println(new Date()+":The fight" + getName() + " list query successful.");
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}
```



 

实践类



``` java
public class FightQueryExample {
    private static List<String> fightCompany = Arrays.asList("CSA", "CEA", "HNA");

    private static List<String> search(String origin, String dest) {
        final List<String> result = new ArrayList<>();
        List<FightQueryTask> tasks = fightCompany.stream().map(p -> createSearchTask(p, origin, dest))
                .collect(Collectors.toList());
        tasks.forEach(p -> p.start());
//        每个线程启动join方法
        tasks.forEach(p -> {
            try {
                p.join();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        });
//        结果汇总
        tasks.stream().map(p -> p.get()).forEach(p -> result.addAll(p));
        return result;
    }

    private static FightQueryTask createSearchTask(String fight, String original, String dest) {
        return new FightQueryTask(fight, original, dest);
    }

    public static void main(String[] args) {
        System.out.println(new Date());
        List<String> search = search("SH", "BJ");
        System.out.println("==============result===============");
        search.forEach(p -> System.out.println(p));
    }
}
```



 

输出



``` java
Thu Feb 18 10:19:40 CST 2021
[CSA]-query SH to BJ
[CEA]-query SH to BJ
[HNA]-query SH to BJ
Thu Feb 18 10:19:45 CST 2021:The fight[HNA] list query successful.
Thu Feb 18 10:19:48 CST 2021:The fight[CSA] list query successful.
Thu Feb 18 10:19:49 CST 2021:The fight[CEA] list query successful.
==============result===============
[CSA]-8
[CEA]-9
[HNA]-5
```



 




## 参考文章
* https://www.cnblogs.com/bjlhx/p/7594108.html