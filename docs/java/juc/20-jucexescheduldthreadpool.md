---
title: JUC-执行器-计划线程池
---

## Java高级知识篇【JUC-执行器-计划线程池】

::: tip
本文主要是介绍 JUC-执行器-计划线程池 。
:::

[[toc]]

## 一、ScheduledThreadPoolExecutor简介

在[executors框架概述](https://segmentfault.com/a/1190000016586578)一节中，我们曾经提到过一种可对任务进行延迟/周期性调度的执行器（Executor），这类Executor一般实现了**ScheduledExecutorService**这个接口。ScheduledExecutorService在普通执行器接口（ExecutorService）的基础上引入了Future模式，使得可以限时或周期性地调度任务。

`ScheduledThreadPoolExecutor`的类继承关系如下图，该图中除了本节要讲解的ScheduledThreadPoolExecutor外，其它部分已经在前2节详细介绍过了：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/java/juc/jucexeschpool-1.png')" alt="wxmp">

从上图中可以看到，ScheduledThreadPoolExecutor其实是继承了ThreadPoolExecutor这个普通线程池，我们知道ThreadPoolExecutor中提交的任务都是实现了Runnable接口，但是ScheduledThreadPoolExecutor比较特殊，由于要满足任务的延迟/周期调度功能，它会对所有的Runnable任务都进行包装，包装成一个`RunnableScheduledFuture`任务。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/java/juc/jucexeschpool-2.png')" alt="wxmp">

RunnableScheduledFuture是Future模式中的一个接口，关于Future模式，我们后续会专门章节讲解，这里只要知道RunnableScheduledFuture的作用就是可以异步地执行【延时/周期任务】。

另外，我们知道在ThreadPoolExecutor中，需要指定一个阻塞队列作为任务队列。ScheduledThreadPoolExecutor中也一样，不过特殊的是，ScheduledThreadPoolExecutor中的任务队列是一种特殊的延时队列（[DelayQueue](https://segmentfault.com/a/1190000016388106)）。

我们曾经在juc-collections框架中，分析过该种阻塞队列，DelayQueue底层基于优先队列（PriorityQueue）实现，是一种“堆”结构，通过该种阻塞队列可以实现任务的延迟到期执行（即每次从队列获取的任务都是最先到期的任务）。

ScheduledThreadPoolExecutor在内部定义了DelayQueue的变种——`DelayedWorkQueue`，它和DelayQueue类似，只不过要求所有入队元素必须实现**RunnableScheduledFuture**接口。

## 二、ScheduledThreadPoolExecutor基本原理

### 构造线程池

我们先来看下**ScheduledThreadPoolExecutor**的构造，其实在[executors框架概述](https://segmentfault.com/a/1190000016586578)中讲Executors时已经接触过了，Executors使用`newScheduledThreadPool`工厂方法创建ScheduledThreadPoolExecutor：

``` java
public static ScheduledExecutorService newScheduledThreadPool(int corePoolSize) {
    return new ScheduledThreadPoolExecutor(corePoolSize);
}

public static ScheduledExecutorService newScheduledThreadPool(int corePoolSize, ThreadFactory threadFactory) {
    return new ScheduledThreadPoolExecutor(corePoolSize, threadFactory);
}
```

我们来看下ScheduledThreadPoolExecutor的构造器，内部其实都是调用了父类**ThreadPoolExecutor**的构造器，这里最需要注意的就是任务队列的选择——**DelayedWorkQueue**，我们后面会详细介绍它的实现原理。

``` java
public ScheduledThreadPoolExecutor(int corePoolSize) {
    super(corePoolSize, Integer.MAX_VALUE, 0, NANOSECONDS, new DelayedWorkQueue());
}
 
public ScheduledThreadPoolExecutor(int corePoolSize, ThreadFactory threadFactory) {
    super(corePoolSize, Integer.MAX_VALUE, 0, NANOSECONDS, new DelayedWorkQueue(), threadFactory);
}
 
public ScheduledThreadPoolExecutor(int corePoolSize, RejectedExecutionHandler handler) {
    super(corePoolSize, Integer.MAX_VALUE, 0, NANOSECONDS, new DelayedWorkQueue(), handler);
}
 
public ScheduledThreadPoolExecutor(int corePoolSize, ThreadFactory threadFactory, RejectedExecutionHandler handler) {
    super(corePoolSize, Integer.MAX_VALUE, 0, NANOSECONDS, new DelayedWorkQueue(), threadFactory, handler);
}
```

### 线程池的调度

ScheduledThreadPoolExecutor的核心调度方法是`schedule`、`scheduleAtFixedRate`、`scheduleWithFixedDelay`，我们通过schedule方法来看下整个调度流程：

``` java
public ScheduledFuture<?schedule(Runnable command, long delay, TimeUnit unit) {
    if (command == null || unit == null)
        throw new NullPointerException();
    RunnableScheduledFuture<?t = decorateTask(command, new ScheduledFutureTask<Void>(command, null,
            triggerTime(delay, unit)));
    delayedExecute(t);
    return t;
}
```

上述的**decorateTask**方法把Runnable任务包装成ScheduledFutureTask，用户可以根据自己的需要覆写该方法：

``` java
protected <VRunnableScheduledFuture<VdecorateTask(Runnable runnable, RunnableScheduledFuture<Vtask) {
    return task;
}
```

**注意：****ScheduledFutureTask**是RunnableScheduledFuture接口的实现类，任务通过`period`字段来表示任务类型

``` java
private class ScheduledFutureTask<Vextends FutureTask<Vimplements RunnableScheduledFuture<V{
 
    /**
     * 任务序号, 自增唯一
     */
    private final long sequenceNumber;
 
    /**
     * 首次执行的时间点
     */
    private long time;
 
    /**
     * 0: 非周期任务
     * >0: fixed-rate任务
     * <0: fixed-delay任务
     */
    private final long period;
 
    /**
     * 在堆中的索引
     */
    int heapIndex;
 
    ScheduledFutureTask(Runnable r, V result, long ns) {
        super(r, result);
        this.time = ns;
        this.period = 0;
        this.sequenceNumber = sequencer.getAndIncrement();
    }
    
    // ...
}
```

ScheduledThreadPoolExecutor中的任务队列——**DelayedWorkQueue**，保存的元素就是ScheduledFutureTask。DelayedWorkQueue是一种**堆结构**，time最小的任务会排在堆顶（表示最早过期），每次出队都是取堆顶元素，这样最快到期的任务就会被先执行。如果两个ScheduledFutureTask的time相同，就比较它们的序号——sequenceNumber，序号小的代表先被提交，所以就会先执行。


schedule的核心是其中的**delayedExecute**方法：

``` java
private void delayedExecute(RunnableScheduledFuture<?task) {
    if (isShutdown())   // 线程池已关闭
        reject(task);   // 任务拒绝策略
    else {
        super.getQueue().add(task);                 // 将任务入队
 
        // 如果线程池已关闭且该任务是非周期任务, 则将其从队列移除
        if (isShutdown() && !canRunInCurrentRunState(task.isPeriodic()) && remove(task))
            task.cancel(false);  // 取消任务
        else
            ensurePrestart();   // 添加一个工作线程
    }
}
```

通过delayedExecute可以看出，ScheduledThreadPoolExecutor的整个任务调度流程大致如下图：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/java/juc/jucexeschpool-3.png')" alt="wxmp">

我们来分析这个过程：

1. 首先，任务被提交到线程池后，会判断线程池的状态，如果不是***RUNNING\***状态会执行拒绝策略。

2. 然后，将任务添加到阻塞队列中。（注意，由于DelayedWorkQueue是无界队列，所以一定会**add**成功）

3. 然后，会创建一个工作线程，加入到核心线程池或者非核心线程池：

   ``` java
   void ensurePrestart() {
       int wc = workerCountOf(ctl.get());
       if (wc < corePoolSize)
           addWorker(null, true);
       else if (wc == 0)
           addWorker(null, false);
   }
   ```

   通过**ensurePrestart**可以看到，如果核心线程池未满，则新建的工作线程会被放到核心线程池中。如果核心线程池已经满了，ScheduledThreadPoolExecutor不会像ThreadPoolExecutor那样再去创建归属于非核心线程池的工作线程，而是直接返回。也就是说，**在ScheduledThreadPoolExecutor中，一旦核心线程池满了，就不会再去创建工作线程。**

***这里思考一点，什么时候会执行else if (wc == 0)创建一个归属于非核心线程池的工作线程？\***
答案是，当通过setCorePoolSize方法设置核心线程池大小为0时，这里必须要保证任务能够被执行，所以会创建一个工作线程，放到非核心线程池中。

最后，线程池中的工作线程会去任务队列获取任务并执行，当任务被执行完成后，如果该任务是周期任务，则会重置time字段，并重新插入队列中，等待下次执行。这里注意从队列中获取元素的方法：

- 对于核心线程池中的工作线程来说，如果没有超时设置（`allowCoreThreadTimeOut == false`），则会使用阻塞方法**take**获取任务（因为没有超时限制，所以会一直等待直到队列中有任务）；如果设置了超时，则会使用**poll**方法（方法入参需要超时时间），超时还没拿到任务的话，该工作线程就会被回收。
- 对于非工作线程来说，都是调用poll获取队列元素，超时取不到任务就会被回收。



上述就是ScheduledThreadPoolExecutor的核心调度流程，通过我们的分析可以看出，相比ThreadPoolExecutor，ScheduledThreadPoolExecutor主要有以下几点不同：

1. 总体的调度控制流程略有区别；
2. 任务的执行方式有所区别；
3. 任务队列的选择不同。

最后，我们来看下ScheduledThreadPoolExecutor中的延时队列——**DelayedWorkQueue**。

### 延时队列

DelayedWorkQueue，该队列和已经介绍过的[DelayQueue](https://segmentfault.com/a/1190000016388106)区别不大，只不过队列元素是RunnableScheduledFuture：

``` java
static class DelayedWorkQueue extends AbstractQueue<Runnableimplements BlockingQueue<Runnable{
    private static final int INITIAL_CAPACITY = 16;
    private RunnableScheduledFuture<?>[] queue = new RunnableScheduledFuture<?>[INITIAL_CAPACITY];
    private int size = 0;
 
    private final ReentrantLock lock = new ReentrantLock();
    private final Condition available = lock.newCondition();
 
    private Thread leader = null;
 
    // ...
}
```

**DelayedWorkQueue**是一个无界队列，在队列元素满了以后会自动扩容，它并没有像DelayQueue那样，将队列操作委托给PriorityQueue，而是自己重新实现了一遍堆的核心操作——上浮、下沉。我这里不再赘述这些堆操作，读者可以参考PriorityBlockingQueue自行阅读源码。

我们关键来看下`add`、`take`、`poll`这三个队列方法，因为ScheduledThreadPoolExecutor的核心调度流程中使用到了这三个方法：

``` java
public boolean add(Runnable e) {
    return offer(e);
}
 
public boolean offer(Runnable e, long timeout, TimeUnit unit) {
    return offer(e);
}
```

add、offer内部都调用了下面这个方法：

``` java
public boolean offer(Runnable x) {
    if (x == null)
        throw new NullPointerException();
    
    RunnableScheduledFuture<?e = (RunnableScheduledFuture<?>) x;
    final ReentrantLock lock = this.lock;
    lock.lock();
    try {
        int i = size;           // 队列已满, 扩容
        if (i >= queue.length)
            grow();
        size = i + 1;
        if (i == 0) {
            queue[0] = e;
            setIndex(e, 0);
        } else {
            siftUp(i, e);       // 堆上浮操作
        }
        
        if (queue[0] == e) {    // 当前元素是首个元素
            leader = null;
            available.signal(); // 唤醒一个等待线程
        }   
    } finally {
        lock.unlock();
    }
    return true;
}
```

***take方法：\***

``` java
public RunnableScheduledFuture<?take() throws InterruptedException {
    final ReentrantLock lock = this.lock;
    lock.lockInterruptibly();
    try {
        for (; ; ) {
            RunnableScheduledFuture<?first = queue[0];
            if (first == null)          // 队列为空
                available.await();      // 等待元素入队
            else {
                long delay = first.getDelay(NANOSECONDS);
                if (delay <= 0)         // 元素已到期
                    return finishPoll(first);
 
                // 执行到此处, 说明队首元素还未到期
                first = null;
                if (leader != null)
                    available.await();
                else {
                    // 当前线程成功leader线程
                    Thread thisThread = Thread.currentThread();
                    leader = thisThread;
                    try {
                        available.awaitNanos(delay);
                    } finally {
                        if (leader == thisThread)
                            leader = null;
                    }
                }
            }
        }
    } finally {
        if (leader == null && queue[0] != null)
            available.signal();
        lock.unlock();
    }
}
```

**注意：**上述leader表示一个等待获取队首元素的出队线程，这是一种称为“***Leader-Follower pattern\***”的多线程设计模式（读者可以参考[DelayQueue](https://segmentfault.com/a/1190000016388106)中的讲解）。

每次出队元素时，如果队列为空或者队首元素还未到期，线程就会在condition条件队列等待。一般的思路是无限等待，直到出现一个入队线程，入队元素后将一个出队线程唤醒。
为了提升性能，当队列非空时，用`leader`保存第一个到来并尝试出队的线程，并设置它的等待时间为队首元素的剩余期限，这样当元素过期后，线程也就自己唤醒了，不需要入队线程唤醒。这样做的好处就是提升一些性能。

## 三、总结

本节介绍了ScheduledThreadPoolExecutor，它是对普通线程池ThreadPoolExecutor的扩展，增加了延时调度、周期调度任务的功能。概括下ScheduledThreadPoolExecutor的主要特点：

1. 对Runnable任务进行包装，封装成`ScheduledFutureTask`，该类任务支持任务的周期执行、延迟执行；
2. 采用`DelayedWorkQueue`作为任务队列。该队列是无界队列，所以任务一定能添加成功，但是当工作线程尝试从队列取任务执行时，只有最先到期的任务会出队，如果没有任务或者队首任务未到期，则工作线程会阻塞；
3. `ScheduledThreadPoolExecutor`的任务调度流程与ThreadPoolExecutor略有区别，最大的区别就是，先往队列添加任务，然后创建工作线程执行任务。

另外，`maximumPoolSize`这个参数对ScheduledThreadPoolExecutor其实并没有作用，因为除非把corePoolSize设置为0，这种情况下ScheduledThreadPoolExecutor只会创建一个属于非核心线程池的工作线程；否则，ScheduledThreadPoolExecutor只会新建归属于核心线程池的工作线程，一旦核心线程池满了，就不再新建工作线程。


## 参考文章
* https://segmentfault.com/a/1190000016672638