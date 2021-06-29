---
title: JUC-锁-基础使用
---

## Java高级知识篇【JUC-锁-基础使用】

::: tip
本文主要是介绍 JUC-锁-基础使用 。
:::

[[toc]]


# 003-多线程-锁-JUC锁-Lock及ReentrantLock、公平锁、非公平锁

## 一、概述

　　重入锁ReentrantLock,就是支持重进入的锁 ，它表示该锁能够支持一个线程对资源的重复加锁。支持公平性与非公平性选择，默认为非公平。 

　　以下梳理ReentrantLock。作为依赖于AbstractQueuedSynchronizer。 所以要理解ReentrantLock，先要理解AQS。

【参见AQS原理章节】

aqs有多神奇，让ReentrantLock没有使用更“高级”的机器指令，也不依靠JDK编译时的特殊处理，就完成了代码的并发访问控制。

  重进入是指任意线程在获取到锁之后能够再次获取该锁而不被锁所阻塞，需要解决两个问题：

1） 线程再次获取锁（锁需要识别获取锁的线程是否未当前占据锁的线程）

2）锁的最终释放（要求锁对于获取进行计数自增，锁释放技数自减。技数=0表示锁已经成功释放）

## 1.1、Lock定义以及说明

``` java
public interface Lock {
     // 获取锁，若当前lock被其他线程获取；则此线程阻塞等待lock被释放
     // 如果采用Lock，必须主动去释放锁，并且在发生异常时，不会自动释放锁
    void lock();

    // 获取锁，若当前锁不可用（被其他线程获取）;
    // 则阻塞线程，等待获取锁，则这个线程能够响应中断，即中断线程的等待状态
    void lockInterruptibly() throws InterruptedException;

    // 来尝试获取锁，如果获取成功，则返回true；
    // 如果获取失败（即锁已被其他线程获取），则返回false
    // 也就是说，这个方法无论如何都会立即返回
    boolean tryLock();

    // 在拿不到锁时会等待一定的时间
    // 等待过程中，可以被中断
    // 超过时间，依然获取不到，则返回false；否则返回true
    boolean tryLock(long time, TimeUnit unit) throws InterruptedException;

    // 释放锁
    void unlock();

    // 返回一个绑定该lock的Condtion对象
    // 在Condition#await()之前，锁会被该线程持有
    // Condition#await() 会自动释放锁，在wait返回之后，会自动获取锁
    Condition newCondition();
}
```



## 1.2、ReentrantLock

　　可重入锁。jdk中ReentrantLock是唯一实现了Lock接口的类

　　可重入的意思是一个线程拥有锁之后，可以再次获取锁，

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/java/juc/juclockuse-1.png')" alt="wxmp">

基本使用:

1. 创建锁对象 `Lock lock = new ReentrantLock()`
2. 在希望保证线程同步的代码之前显示调用 `lock.lock()` 尝试获取锁，若被其他线程占用，则阻塞
3. 执行完之后，一定得手动释放锁，否则会造成死锁 `lock.unlock()`; 一般来讲，把释放锁的逻辑，放在需要线程同步的代码包装外的`finally`块中

### 使用方式



``` java
private Lock lock = new ReentrantLock();try {
  lock.lock();
  // .....
} finally {
  lock.unlock();
}
```



　　ReentrantLock会保证 do something在同一时间只有一个线程在执行这段代码，或者说，同一时刻只有一个线程的lock方法会返回。其余线程会被挂起，直到获取锁。从这里可以看出，其实ReentrantLock实现的就是一个独占锁的功能：有且只有一个线程获取到锁，其余线程全部挂起，直到该拥有锁的线程释放锁，被挂起的线程被唤醒重新开始竞争锁。

## 二、代码探究【主要逻辑即AQS的实现+子类实现的tryAcquire和tryRelease】　　

　　ReentrantLock的内部类Sync继承了AQS，分为公平锁FairSync和非公平锁NonfairSync。如果在绝对时间上，先对锁进行获取的请求你一定先被满足，那么这个锁是公平的，反之，是不公平的。公平锁的获取，也就是等待时间最长的线程最优先获取锁，也可以说锁获取是顺序的。ReentrantLock的公平与否，可以通过它的构造函数来决定。

　　事实上，公平锁往往没有非公平锁的效率高，但是，并不是任何场景都是以TPS作为唯一指标，公平锁能够减少“饥饿”发生的概率，等待越久的请求越能够得到优先满足。

### 实现重进入

　　重进入是指任意线程在获取到锁之后能够再次获取该锁而不会被锁阻塞，该特性的首先需要解决以下两个问题：

　　线程再次获取锁：所需要去识别获取锁的线程是否为当前占据锁的线程，如果是，则再次获取成功；
　　锁的最终释放：线程重复n次获取了锁，随后在第n次释放该锁后，其它线程能够获取到该锁。锁的最终释放要求锁对于获取进行计数自增，计数表示当前线程被重复获取的次数，而被释放时，计数自减，当计数为0时表示锁已经成功释放。
　　ReentrantLock是通过自定义同步器来实现锁的获取与释放，我们以非公平锁（默认）实现为例，对锁的获取和释放进行详解。

## 2.1、获取锁lock【持续等待】


lock获取锁是一种阻塞是获取。该种方式获取锁不可中断，如果获取不到则一直休眠等待。

默认构造

``` java
public ReentrantLock() {
    sync = new NonfairSync();
}
```

 

即内部同步组件为非公平锁，获取锁的代码为：

``` java
public void lock() {
    sync.lock();
}
```

通过简介中的类图可以看到，Sync类是ReentrantLock自定义的同步组件，它是ReentrantLock里面的一个内部类，它继承自AQS，它有两个子类：公平锁FairSync和非公平锁NonfairSync。ReentrantLock的获取与释放锁操作都是委托给该同步组件来实现的。下面我们来看一看非公平锁的lock()方法：



``` java
final void lock() {
    if (compareAndSetState(0, 1))
        setExclusiveOwnerThread(Thread.currentThread());
    else
        acquire(1);
}
```



该程序首先会通过compareAndSetState(int, int)方法来尝试修改同步状态，如果修改成功则表示获取到了锁，然后调用setExclusiveOwnerThread(Thread)方法来设置获取到锁的线程，该方法是继承自AbstractOwnableSynchronizer类，AQS继承自AOS类，它的主要作用就是记录获取到独占锁的线程，AOS类的定义很简单：



``` java
public abstract class AbstractOwnableSynchronizer
    implements java.io.Serializable {
    private static final long serialVersionUID = 3737899427754241961L;
 
    protected AbstractOwnableSynchronizer() { }
 
    // The current owner of exclusive mode synchronization.
    private transient Thread exclusiveOwnerThread;
 
    protected final void setExclusiveOwnerThread(Thread thread) {
        exclusiveOwnerThread = thread;
    }
 
    protected final Thread getExclusiveOwnerThread() {
        return exclusiveOwnerThread;
    }
}
```



### 2.1.1、查看ReentrantLock的sync的实现非公平锁与公平锁

　　可见，是Lock接口的操作都委派到一个Sync类上，该类继承了AbstractQueuedSynchronizer：

``` java
abstract static class Sync extends AbstractQueuedSynchronizer{
```

　　锁的API是面向使用者的，它定义了与锁交互的公共行为，而每个锁需要完成特定的操作也是透过这些行为来完成的，但是实现是依托给同步器来完成，这样贯穿就容易理解代码。这是一个抽象类，Sync有两个子类：

``` java
static final class FairSync extends Sync {}
static final class NonfairSync extends Sync {}
```

　　分别对应于非公平锁、公平锁，默认情况下为非公平锁。
　　　　公平锁：每个线程抢占锁的顺序为先后调用lock方法的顺序依次获取锁。在并发环境中，每个线程在获取锁时会先查看此锁维护的等待队列，如果为空，或者当前线程是等待队列的第一个，就占有锁，否则就会加入到等待队列中，以后会按照FIFO的规则从队列中取到自己
　　　　非公平锁：每个线程抢占锁的顺序不定，谁运气好，谁就获取到锁，和调用lock方法的先后顺序无关。上来就直接尝试占有锁，如果尝试失败，就再采用类似公平锁那种方式。其中synchronized是非公平锁。ReentrantLock可以选择创建，默认是非公平。

### 2.1.2、查看acquire

　　如果获取锁失败的情况,就是 acquire(1)，acquire的是调用AQS来实现的。代码如下：

```
     public final void acquire(int arg) {
        if (!tryAcquire(arg) &&
            acquireQueued(addWaiter(Node.EXCLUSIVE), arg))
            selfInterrupt();
    }
```

### 2.1.3、查看tryAcquire

　　AbstractQueuedSynchronizer中抽象了绝大多数Lock的功能，而只把tryAcquire方法延迟到子类中实现

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/java/juc/juclockuse-2.png')" alt="wxmp">

## 2.2、其他方法

### 2.2.1、lockInterruptibly【中断】

　　这个方法和lock方法的区别就是，lock会一直阻塞下去直到获取到锁，而lockInterruptibly则不一样，它可以响应中断而停止阻塞返回。ReentrantLock对其的实现是调用的Sync的父类AbstractQueuedSynchronizer#acquireInterruptibly方法： 

``` java
//ReentrantLock#lockInterruptibly public void lockInterruptibly() throws InterruptedException {     sync.acquireInterruptibly(1);//因为ReentrantLock是排它锁，故调用AQS的acquireInterruptibly方法 } 
```



``` java
//AbstractQueuedSynchronizer#acquireInterruptibly public final void acquireInterruptibly(int arg) throws InterruptedException{ 　　if (Thread.interrupted()) //线程是否被中断，中断则抛出中断异常，并停止阻塞 　　　　throw new InterruptedException; 　　if (!tryAcquire(arg)) //首先还是获取锁，具体参照上文 　　　　doAcquireInterruptibly(arg);//独占模式下中断获取同步状态 } 
```



　　通过查看doAcquireInterruptibly的方法实现发现它和acquireQueued大同小异，前者抛出异常，后者返回boolean。【参看：[013-AbstractQueuedSynchronizer-用于构建锁和同步容器的框架、独占锁与共享锁的获取与释放](https://www.cnblogs.com/bjlhx/p/10365620.html)】独占锁的获取与释放

同lock区别，

示例一、Lock，lock()忽视interrupt(), 锁被主线程占有，子线程拿不到锁就一直阻塞



``` java
    @Test
    public void testLock() throws Exception{
        final Lock lock=new ReentrantLock();
        lock.lock();
        Thread.sleep(1000);
        Thread t1 = new Thread(() -> {
            lock.lock();
            System.out.println(Thread.currentThread().getName() + " interrupted.");

        });
        t1.start();
        Thread.sleep(1000);
        t1.interrupt();//lock()忽视interrupt(), 拿不到锁就 一直阻塞
        Thread.sleep(10000);
    }
```



无任何输出

示例二、lockInterruptibly()会响应打扰 并catch到InterruptedException



``` java
    @Test
    public void testlockInterruptibly() throws Exception {
        final Lock lock = new ReentrantLock();
        lock.lock();
        Thread.sleep(1000);
        Thread t1 = new Thread(() -> {
            try {
                lock.lockInterruptibly();
            } catch (InterruptedException e) {
                System.out.println(Thread.currentThread().getName() + " interrupted.");
            }
        });
        t1.start();
        Thread.sleep(1000);
        t1.interrupt();
        Thread.sleep(10000);
    }
```



输出：Thread-0 interrupted.

### 2.2.2、tryLock【立即返回】

此方法为非阻塞式的获取锁，不管有没有获取锁都返回一个boolean值。

```
public boolean tryLock() {
        return sync.nonfairTryAcquire(1);
    }
```

　　查看实现，它实际调用了Sync#nonfairTryAcquire非公平锁获取锁的方法，这个方法我们在上文lock()方法非公平锁获取锁的时候有提到，而且还特地强调了该方法不是在NonfairSync实现，而是在Sync中实现很有可能这个方法是一个公共方法，果然在非阻塞获取锁的时候调用的是此方法。



``` java
final boolean nonfairTryAcquire(int acquires) {
            final Thread current = Thread.currentThread();
            int c = getState();
            if (c == 0) {
                if (compareAndSetState(0, acquires)) {
                    setExclusiveOwnerThread(current);
                    return true;
                }
            }
            else if (current == getExclusiveOwnerThread()) {
                int nextc = c + acquires;
                if (nextc < 0) // overflow
                    throw new Error("Maximum lock count exceeded");
                setState(nextc);
                return true;
            }
            return false;
        }
```



　　当获取锁时，只有当该锁资源没有被其他线程持有才可以获取到，并且返回true，同时设置持有count为1；
　　当获取锁时，当前线程已持有该锁，那么锁可用时，返回true，同时设置持有count加1；
　　当获取锁时，如果其他线程持有该锁，无可用锁资源，直接返回false，这时候线程不用阻塞等待，可以先去做其他事情；
　　即使该锁是公平锁fairLock，使用tryLock()的方式获取锁也会是非公平的方式，只要获取锁时该锁可用那么就会直接获取并返回true。这种直接插入的特性在一些特定场景是很有用的。但是如果就是想使用公平的方式的话，可以试一试tryLock(0, TimeUnit.SECONDS)，几乎跟公平锁没区别，只是会监测中断事件。

示例



``` java
    @Test
    public void testtryLock() throws Exception {
        final Lock lock = new ReentrantLock();
        lock.lock();
        Thread.sleep(1000);
        Thread t1 = new Thread(() -> {
            boolean b = lock.tryLock();
            System.out.println(Thread.currentThread().getName() + " tryLock."+b);

        });
        t1.start();
        Thread.sleep(1000);
        t1.interrupt();
        Thread.sleep(10000);
    }
```



### 2.2.3、tryLock(long timeout, TimeUnit unit) 【限时等待】

此方法是表示在超时时间内获取到同步状态则返回true，获取不到则返回false。由此可以联想到AQS的tryAcquireNanos(int arg, long nanosTimeOut)方法 

``` java
//ReentrantLock#tryLock 
public boolean tryLock(long timeout, TimeUnit unit) throws InterruptedException { 
　　return sync.tryAcquireNanos(1, unit.toNanos(timeout)); 
} 
```

Sync实际上调用了父类AQS的tryAcquireNanos方法



``` java
//AbstractQueuedSynchronizer#tryAcquireNanos 
public final boolean tryAcquireNanos(int arg, long nanosTimeout) throws InterruptedException { 
　　if (Thread.interrupted())  
　　　　throw new InterruptedException();//可以看到前面和lockInterruptibly一样 
　　return tryAcquire(arg) || doAcquireNanos(arg, nanosTimeout);//首先也会先尝试获取锁 
} 
```




## 三、小结

1. 创建锁对象 `Lock lock = new ReentrantLock()`
2. 在希望保证线程同步的代码之前显示调用 `lock.lock()` 尝试获取锁，若被其他线程占用，则阻塞
3. 执行完之后，一定得手动释放锁，否则会造成死锁 `lock.unlock()`; 一般来讲，把释放锁的逻辑，放在需要线程同步的代码包装外的`finally`块中
4. lock() 和 unlock() 配套使用，不要出现一个比另一个用得多的情况
5. 不要出现`lock()`,`lock()`连续调用的情况，即两者之间没有释放锁`unlock()`的显示调用
6. Condition与Lock配套使用，通过 `Lock#newConditin()` 进行实例化
7. `Condition#await()` 会释放lock，线程阻塞；直到线程中断or `Condition#singal()`被执行，唤醒阻塞线程，并重新获取lock
8. `ReentrantLock#lock`的流程图大致如下

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/java/juc/juclockuse-3.png')" alt="wxmp">


## 参考文章
* https://www.cnblogs.com/bjlhx/p/10561391.html