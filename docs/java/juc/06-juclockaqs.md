---
title: JUC-锁-AQS原理
---


::: tip
本文主要是介绍 JUC-锁-AQS原理 。
:::

[[toc]]

# 009-多线程-基础-AbstractQueuedSynchronizer-用于构建锁和同步容器的框架、独占锁与共享锁的获取与释放

## 一、概述

　　AbstractQueuedSynchronizer （简称AQS），位于java.util.concurrent.locks.AbstractQueuedSynchronizer包下，

　　AQS是一个用于构建锁和同步容器的框架。事实上concurrent包内许多类都是基于AQS构建，例如ReentrantLock，Semaphore，CountDownLatch，ReentrantReadWriteLock，FutureTask等。AQS解决了在实现同步容器时设计的大量细节问题。这些锁都有一个特点，都不是直接扩展自AQS，而是都有一个内部类继承自AQS。为什么会这么设计而不是直接继承呢？简而言之，锁面向的是使用者，同步器面向的是线程控制，在锁的实现中聚合同步器而不是直接继承AQS很好的隔离了二者所关注的领域。

　　AQS使用一个FIFO的队列表示排队等待锁的线程，队列头节点称作“哨兵节点”或者“哑节点”，它不与任何线程关联。其他的节点与等待线程关联，每个节点维护一个等待状态waitStatus。

　　UML类图

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/java/juc/juclockaqs-1.png')" alt="wxmp">

## 二、源码分析


``` java
package java.util.concurrent.locks;
import java.util.concurrent.TimeUnit;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import sun.misc.Unsafe;

/**
 * 提供一个框架，用于实现依赖先进先出（FIFO）等待队列的阻塞锁和相关同步器（信号量、事件等）。
 * 此类被设计为大多数类型的同步器的有用基础，这些同步器依赖单个原子@code int值来表示状态。
 * 子类必须定义更改此状态的受保护方法，以及定义此状态对于正在获取或释放的对象意味着什么。
 * 考虑到这些，这个类中的其他方法执行所有排队和阻塞机制。
 * 子类可以维护其他状态字段，但只有使用方法@link getstate、@link setstate和@link compareandsetstate对原子更新的@code int值进行同步跟踪。
 **/
public abstract class AbstractQueuedSynchronizer extends AbstractOwnableSynchronizer implements java.io.Serializable {

    private static final long serialVersionUID = 7373984972572414691L;

    protected AbstractQueuedSynchronizer() { }

    /**
     * Wait queue node class.
     *
     * 等待队列是“clh”（craig、landin和hagersten）锁队列的变体。CLH锁通常用于旋转锁。
     * 相反，我们使用它们来阻塞同步器，但是使用相同的基本策略来保存关于其节点前一个线程的一些控制信息。
     * 每个节点中的“状态”字段跟踪线程是否应该阻塞。节点的前一个版本发布时会发出信号。
     * 否则，队列的每个节点都充当一个特定的通知样式监控器，其中包含一个等待线程。但状态字段不控制是否授予线程锁等。
     * 如果线程是队列中的第一个线程，它可能会尝试获取。但是，作为第一名并不能保证成功，它只给予竞争的权利。
     * 因此，当前发布的竞争者线程可能需要重新等待。
     *
     */
    static final class Node {
        /** Marker to indicate a node is waiting in shared mode */
        static final Node SHARED = new Node();
        /** Marker to indicate a node is waiting in exclusive mode */
        static final Node EXCLUSIVE = null;

        /** waitStatus value to indicate thread has cancelled */
        static final int CANCELLED =  1;
        /** waitStatus value to indicate successor's thread needs unparking */
        static final int SIGNAL    = -1;
        /** waitStatus value to indicate thread is waiting on condition */
        static final int CONDITION = -2;
        /**
         * waitStatus value to indicate the next acquireShared should
         * unconditionally propagate
         */
        static final int PROPAGATE = -3;

        /**
         * Status field, taking on only the values:
         *   SIGNAL:     The successor of this node is (or will soon be)
         *               blocked (via park), so the current node must
         *               unpark its successor when it releases or
         *               cancels. To avoid races, acquire methods must
         *               first indicate they need a signal,
         *               then retry the atomic acquire, and then,
         *               on failure, block.
         *   CANCELLED:  This node is cancelled due to timeout or interrupt.
         *               Nodes never leave this state. In particular,
         *               a thread with cancelled node never again blocks.
         *   CONDITION:  This node is currently on a condition queue.
         *               It will not be used as a sync queue node
         *               until transferred, at which time the status
         *               will be set to 0. (Use of this value here has
         *               nothing to do with the other uses of the
         *               field, but simplifies mechanics.)
         *   PROPAGATE:  A releaseShared should be propagated to other
         *               nodes. This is set (for head node only) in
         *               doReleaseShared to ensure propagation
         *               continues, even if other operations have
         *               since intervened.
         *   0:          None of the above
         *
         * The values are arranged numerically to simplify use.
         * Non-negative values mean that a node doesn't need to
         * signal. So, most code doesn't need to check for particular
         * values, just for sign.
         *
         * The field is initialized to 0 for normal sync nodes, and
         * CONDITION for condition nodes.  It is modified using CAS
         * (or when possible, unconditional volatile writes).
         */
        volatile int waitStatus;

        /**
         * Link to predecessor node that current node/thread relies on
         * for checking waitStatus. Assigned during enqueuing, and nulled
         * out (for sake of GC) only upon dequeuing.  Also, upon
         * cancellation of a predecessor, we short-circuit while
         * finding a non-cancelled one, which will always exist
         * because the head node is never cancelled: A node becomes
         * head only as a result of successful acquire. A
         * cancelled thread never succeeds in acquiring, and a thread only
         * cancels itself, not any other node.
         */
        volatile Node prev;

        /**
         * Link to the successor node that the current node/thread
         * unparks upon release. Assigned during enqueuing, adjusted
         * when bypassing cancelled predecessors, and nulled out (for
         * sake of GC) when dequeued.  The enq operation does not
         * assign next field of a predecessor until after attachment,
         * so seeing a null next field does not necessarily mean that
         * node is at end of queue. However, if a next field appears
         * to be null, we can scan prev's from the tail to
         * double-check.  The next field of cancelled nodes is set to
         * point to the node itself instead of null, to make life
         * easier for isOnSyncQueue.
         */
        volatile Node next;

        /**
         * The thread that enqueued this node.  Initialized on
         * construction and nulled out after use.
         */
        volatile Thread thread;

        /**
         * Link to next node waiting on condition, or the special
         * value SHARED.  Because condition queues are accessed only
         * when holding in exclusive mode, we just need a simple
         * linked queue to hold nodes while they are waiting on
         * conditions. They are then transferred to the queue to
         * re-acquire. And because conditions can only be exclusive,
         * we save a field by using special value to indicate shared
         * mode.
         */
        Node nextWaiter;

        /**
         * Returns true if node is waiting in shared mode.
         */
        final boolean isShared() {
            return nextWaiter == SHARED;
        }

        /**
         * Returns previous node, or throws NullPointerException if null.
         * Use when predecessor cannot be null.  The null check could
         * be elided, but is present to help the VM.
         *
         * @return the predecessor of this node
         */
        final Node predecessor() throws NullPointerException {
            Node p = prev;
            if (p == null)
                throw new NullPointerException();
            else
                return p;
        }

        Node() {    // Used to establish initial head or SHARED marker
        }

        Node(Thread thread, Node mode) {     // Used by addWaiter
            this.nextWaiter = mode;
            this.thread = thread;
        }

        Node(Thread thread, int waitStatus) { // Used by Condition
            this.waitStatus = waitStatus;
            this.thread = thread;
        }
    }

    更多内容参见 JDK源代码
}
```



示意图

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/java/juc/juclockaqs-2.png')" alt="wxmp">

　　AbstractQueuedSynchronizer在内部依赖一个双向同步队列来完成同步状态的管理，当前线程获取同步状态失败时，同步器会将该线程和等待状态信息构造成一个节点并将其加入到同步队列中。Node节点以AQS的内部类存在。

## 2.1、Node节点以AQS的内部类存在，其中属性

| AbstractQueuedSynchronizer$Node |                                                                                                                                                                                                                                                                                                                                                                                     |
| ------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 属性                            | 描述                                                                                                                                                                                                                                                                                                                                                                                |
| volatile int waitStatus         | 等待状态，并不是同步状态，而是在队列中的线程节点等待状态（Node节点中一共定义四种状态）CANCELLED = 1  //线程由于超时或被中断会被取消在队列中的等待，被取消了的线程不会再被阻塞，即状态不会再改变SIGNAL = -1  //后继节点处于等待状态，当前节点释放锁或者取消等待时会通知后继节点CONDITION = -2  //暂时忽略，涉及ConditionPROPAGATE = -3  //下一次共享式同步状态获取将会无条件传播下去 |
| volatile Node prev              | 前驱节点                                                                                                                                                                                                                                                                                                                                                                            |
| volatile Node next              | 后继节点                                                                                                                                                                                                                                                                                                                                                                            |
| volatile Thread thread          | 保持对当前获取同步状态线程的引用                                                                                                                                                                                                                                                                                                                                                    |
| Node nextWaiter                 | 等待队列中的后继节点，同时也表示该节点是共享模式（SHARED）还是独占（EXCLUSIVE）模式。它们共用一个字段。因为在等待队列中的线程一定是独占模式。所以如果nextWatiter == SHARED，那么表示该节点为共享模式。                                                                                                                                                                              |

　　在AQS同步器中由一个头节点和尾节点来维护这个同步队列。

## 2.2、AbstractQueuedSynchronizer属性

| AbstractQueuedSynchronizer           |                |
| ------------------------------------ | -------------- |
| 属性                                 | 描述           |
| private transient volatile Node head | 同步队列头节点 |
| private transient volatile Node tail | 同步队列尾节点 |

注意其中的volatile【主存中存取】、transient【不被**串行化**】等

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/java/juc/juclockaqs-3.png')" alt="wxmp">

　　同步器中是依靠一个同步队列来完成的同步状态管理，当线程获取锁（或者称为同步状态）失败时，会将线程构造为一个Node节点新增到同步队列的尾部。

　　在锁的获取当中，并不一定是只有一个线程才能持有这个锁（或者称为同步状态），所以此时有了独占模式和共享模式的区别，也就是在Node节点中由nextWait来标识。比如ReentrantLock就是一个独占锁，只能有一个线程获得锁，而WriteAndReadLock的读锁则能由多个线程同时获取，但它的写锁则只能由一个线程持有。独占模式下锁（或者称为同步状态）的获取与释放，在此之前要稍微提一下“模板方法模式”，在AQS同步器中提供了不少的模板方法，定义一个操作中的算法的骨架，而将一些步骤的实现延迟到子类中。

　　独占模式锁：ReentrantLock的公平锁和非公平锁

　　共享模式锁：java.util.concurrent.Semaphore的公平锁和非公平锁、java.util.concurrent.CountDownLatch、java.util.concurrent.locks.ReentrantReadWriteLock等

## 2.3、独占模式同步状态的获取-以ReentrantLock的非公平锁为例

### 2.3.1、代码入口获取锁

``` java
        Lock lock=new ReentrantLock();
        lock.lock();
```

内部调用

``` java
    public void lock() {
        sync.lock();
    }
```

查看sync的非公平锁实现



``` java
        final void lock() {
            if (compareAndSetState(0, 1))
                setExclusiveOwnerThread(Thread.currentThread());
            else
                acquire(1);
        }
```



compareAndSetState(0, 1) 这个是尝试获取锁,把state的状态从0改为1表示取得锁.这个时候设置获取锁的线程就是当前线程. 

``` java
    protected final boolean compareAndSetState(int expect, int update) {
        // See below for intrinsics setup to support this
        return unsafe.compareAndSwapInt(this, stateOffset, expect, update);
    }
```

底层有unsafe方法实现，Unsafe类是什么呢？java不能直接访问操作系统底层，而是通过本地方法来访问。Unsafe类提供了硬件级别的原子操作。

### 2.3.2、针对acquire

| AbstractQueuedSynchronizer         |                                                                              |
| ---------------------------------- | ---------------------------------------------------------------------------- |
| 方法                               | 描述                                                                         |
| public final void acquire(int arg) | 独占模式下获取同步状态，忽略中断，即表示无论如何也会在获得同步状态后才返回。 |

 此方法实现

``` java
    public final void acquire(int arg) {
        if (!tryAcquire(arg) &&
            acquireQueued(addWaiter(Node.EXCLUSIVE), arg))
            selfInterrupt();
    }
```

#### 2.3.2.1、父类框架实现

tryAcquire:AQS中有一个默认实现，其默认实现即抛出一个UnsupportedOperationException异常，意为默认下独占模式是不支持此操作的。需要在子类中实现具体逻辑

```
    protected boolean tryAcquire(int arg) {
        throw new UnsupportedOperationException();
    }
```

#### 2.3.2.1、模板方法子类实现

可以通过查看ReentrantLock中的Sync的子类实现，如非公平锁



``` java
    static final class NonfairSync extends Sync {
        //……
        final void lock() {//do
        }
        protected final boolean tryAcquire(int acquires) {
            return nonfairTryAcquire(acquires);
        }
    }
```



非公平锁获取的实现



``` java
 boolean nonfairTryAcquire(int acquires) {
            final Thread current = Thread.currentThread();//获取当前线程
            int c = getState();//获取标志位
            if (c == 0) {//没有线程竞争锁
                if (compareAndSetState(0, acquires)) {//通过cas设置状态位
                    setExclusiveOwnerThread(current);//如果cas成功，则代表当前线程获取锁，把当前线程设置到aqs参数中
                    return true;
                }
            }
            else if (current == getExclusiveOwnerThread()) {//因为ReentrantLock是可重入锁，这里判断获取锁的线程是不是当前线程
                int nextc = c + acquires;//每次重入+1，
                if (nextc < 0) // overflow
                    throw new Error("Maximum lock count exceeded");
                setState(nextc);//设置状态
                return true;
            }
            return false;
        }
```



　　如果如果获取锁，tryAcquire返回true，反之，返回false。回到AQS的acquire方法继续执行addWaiter。

　　该方法会首先判断当前状态，如果c==0说明没有线程正在竞争该锁，如果不c !=0 说明有线程正拥有了该锁。

　　如果发现c==0，则通过CAS设置该状态值为acquires,acquires的初始调用值为1，每次线程重入该锁都会+1，每次unlock都会-1，但为0时释放锁。如果CAS设置成功，则可以预计其他任何线程调用CAS都不会再成功，也就认为当前线程得到了该锁，也作为Running线程，很显然这个Running线程并未进入等待队列。

　　如果c !=0 但发现自己已经拥有锁，只是简单地++acquires，并修改status值，但因为没有竞争，所以通过setStatus修改，而非CAS，也就是说这段代码实现了偏向锁的功能，并且实现的非常漂亮。

#### 2.3.2.3、addWaiter

通过上述在AQS的其中一个实现中，ReentrantLock$Sync对它进行了重写。这个在AQS定义的方法表示该方法保证线程安全的获取同步状态，如果同步状态获取失败（返回false）则构造同步节点并将节点加入到同步队列的尾部，这个操作即是addWaiter方法的实现：





``` java
private Node addWaiter(Node mode) {
    Node node = new Node(Thread.currentThread(), mode);  //将线程构造成Node节点。
    /*尝试强行直接挂到同步队列的尾部*/
    Node pred = tail;   
    if (pred != null) {
       node.prev = pred;
       if (compareAndSetTail(pred, node)) {
           pred.next = node;
           return node;
       }
    }
    /*如果此时有多个线程都在想把自己挂到同步队列的尾部，上面的操作就会
    失败，此时将“无限期”线程安全的等待着挂到同步队列的尾部*/
    enq(node);
    return node;
}
```



　　在enq的实现中实际就是一个for“死循环”，其目的就是直到成功地添加到同步队列尾部才推出循环。

其中入队实现





``` java
private Node enq(final Node node) {
    //CAS"自旋"，直到成功加入队尾
    for (;;) {
        Node t = tail;
        if (t == null) { // 队列为空，创建一个空的标志结点作为head结点，并将tail也指向它。
            if (compareAndSetHead(new Node()))
                tail = head;
        } else {//正常流程，放入队尾
            node.prev = t;
            if (compareAndSetTail(t, node)) {
                t.next = node;
                return t;
            }
        }
    }
}
```



如果看过AtomicInteger.getAndIncrement()函数源码，那么相信你一眼便看出这段代码的精华。**CAS自旋volatile变量**，是一种很经典的用法。

### 2.3.3、**acquireQueued自旋**

　　在获取同步状态失败(tryAcqurie) ->构造节点(addWaiter)->添加到同步队列尾部(addWaiter)过后，接下来就是一个很重要的操作**acquireQueued自旋**。这个动作很重要，其目的就在于每个节点都各自的在做判断是否能获取到同步状态，每个节点都在自省地观察，当条件满足获取到了同步状态则可以从自旋过程中退出，否则继续。

　　通过tryAcquire()和addWaiter()，该线程获取资源失败，已经被放入等待队列尾部了。进入等待状态休息，直到其他线程彻底释放资源后唤醒自己，自己再拿到资源，然后就可以去干自己想干的事了。在等待队列中排队拿号（中间没其它事干可以休息），直到拿到号后再返回。这个函数非常关键，



``` java
final boolean acquireQueued(final Node node, int arg) {
    boolean failed = true;//标记是否成功拿到资源
    try {
        boolean interrupted = false;//标记等待过程中是否被中断过
        
        //“自旋”！
        for (;;) {
            final Node p = node.predecessor();//拿到前驱
            //如果前驱是head，即该结点已成老二，那么便有资格去尝试获取资源（可能是老大释放完资源唤醒自己的，当然也可能被interrupt了）。
            if (p == head && tryAcquire(arg)) {
                setHead(node);//拿到资源后，将head指向该结点。所以head所指的标杆结点，就是当前获取到资源的那个结点或null。
                p.next = null; // setHead中node.prev已置为null，此处再将head.next置为null，就是为了方便GC回收以前的head结点。也就意味着之前拿完资源的结点出队了！
                failed = false;
                return interrupted;//返回等待过程中是否被中断过
            }
            
            //如果自己可以休息了，就进入waiting状态，直到被unpark()
            if (shouldParkAfterFailedAcquire(p, node) &&
                parkAndCheckInterrupt())
                interrupted = true;//如果等待过程中被中断过，哪怕只有那么一次，就将interrupted标记为true
        }
    } finally {
        if (failed)
            cancelAcquire(node);
    }
}
```



从上面的代码实现我们可以看到，尽管每个节点都在“无限期”的获取锁，但并不是每个节点能有获取锁的这个资格，而是当它的前驱节点是头节点时才会去获取锁(tryAcquire)。当这个节点获取同步状态时，接下来的方法shouldParkAfterFailedAcquire则会判断当前线程是否需要被阻塞，而这个判断方法则是通过它的前驱节点的waitStatus判断。

#### 2.3.3.1、shouldParkAfterFailedAcquire

此方法主要用于检查状态，看看自己是否真的可以去休息了（进入waiting状态



``` java
private static boolean shouldParkAfterFailedAcquire(Node pred, Node node) {
    int ws = pred.waitStatus;   //首先获取当前节点的前驱节点等待状态
    if (ws == Node.SIGNAL)   //当前线程需要被阻塞，即需要被unpark(唤醒)
       return true;
    if (ws > 0) { //pred.waitStatus == CANCELLED
       do {
           node.prev = pred = pred.prev;   //前驱节点等待状态已经处于取消，即不会再获取同步状态时，把前驱节点从同步状态中移除。
        } while (pred.waitStatus > 0);
    　　pred.next = node;
    } else {   //pred.waitStatus == CONDITION || PROPAGATE
       compareAndSetWaitStatus(pred, ws, Node.SIGNAL);
    }
    return false;
}
```



　　如果调用该方法判断为当前线程需要被阻塞（返回true），则接着执行parkAndCheckInterrupt阻塞当前线程，直到当前线程被唤醒的时候才从parkAndCheckInterrupt返回。

　　Node结点是对每一个访问同步代码的线程的封装，其包含了需要同步的线程本身以及线程的状态，如是否被阻塞，是否等待唤醒，是否已经被取消等。变量waitStatus则表示当前被封装成Node结点的等待状态，共有4种取值CANCELLED、SIGNAL、CONDITION、PROPAGATE。

- CANCELLED：值为1，在同步队列中等待的线程等待超时或被中断，需要从同步队列中取消该Node的结点，其结点的waitStatus为CANCELLED，即结束状态，进入该状态后的结点将不会再变化。
- SIGNAL：值为-1，被标识为该等待唤醒状态的后继结点，当其前继结点的线程释放了同步锁或被取消，将会通知该后继结点的线程执行。说白了，就是处于唤醒状态，只要前继结点释放锁，就会通知标识为SIGNAL状态的后继结点的线程执行。
- CONDITION：值为-2，与Condition相关，该标识的结点处于**等待队列**中，结点的线程等待在Condition上，当其他线程调用了Condition的signal()方法后，CONDITION状态的结点将**从等待队列转移到同步队列中**，等待获取同步锁。
- PROPAGATE：值为-3，与共享模式相关，在共享模式中，该状态标识结点的线程处于可运行状态。
- 0状态：值为0，代表初始化状态。

　　AQS在判断状态时，通过用waitStatus>0表示取消状态，而waitStatus<0表示有效状态。

　　用当前线程去构造一个Node对象，然后加入到对尾。其中参数mode是独占锁还是共享锁，默认为null，独占锁。这里lock调用的是AQS独占的API。在队列不为空的时候，先尝试通过cas方式修改尾节点为最新的节点，如果修改失败，意味着有并发，这个时候才会进入enq中死循环，“自旋”方式修改。

　　将线程的节点接入到队里中后，当让还需要做一件事:将当前线程挂起！这个事，由acquireQueued来做。

#### 2.3.3.2、parkAndCheckInterrupt()

　　此方法就是让线程去休息，真正进入等待状态

``` java
 private final boolean parkAndCheckInterrupt() {
     LockSupport.park(this);//调用park()使线程进入waiting状态
     return Thread.interrupted();//如果被唤醒，查看自己是不是被中断的。
 }
```

　　park()会让当前线程进入waiting状态。在此状态下，有两种途径可以唤醒该线程：1）被unpark()；2）被interrupt()。需要注意的是，Thread.interrupted()会清除当前线程的中断标记位。

### 独占模式获取同步状态-小结：

　　AQS的模板方法acquire通过调用子类自定义实现的tryAcquire获取同步状态失败后->将线程构造成Node节点(addWaiter)->将Node节点添加到同步队列对尾(addWaiter)->每个节点以自旋的方法获取同步状态(acquirQueued)。在节点自旋获取同步状态时，只有其前驱节点是头节点的时候才会尝试获取同步状态，如果该节点的前驱不是头节点或者该节点的前驱节点是头节点单获取同步状态失败，则判断当前线程需要阻塞，如果需要阻塞则需要被唤醒过后才返回。

## 2.4、独占模式同步状态的释放 -以ReentrantLock的非公平锁为例

``` java
public void unlock() {
        sync.release(1);
}
```

### 2.4.1、release

| AbstractQueuedSynchronizer            |                              |
| ------------------------------------- | ---------------------------- |
| 方法                                  | 描述                         |
| public final boolean release(int arg) | 释放同步状态，并唤醒后继节点 |

当线程获取到了同步状态并且执行了相应的逻辑过后，此时就应该释放同步状态。

release此方法是独占模式下线程释放共享资源的顶层入口。它会释放指定量的资源，如果彻底释放了（即state=0）,它会唤醒等待队列里的其他线程来获取资源。



``` java
public final boolean release(int arg) {
    if (tryRelease(arg)) {
        Node h = head;//找到头结点
        if (h != null && h.waitStatus != 0)
            unparkSuccessor(h);//唤醒等待队列里的下一个线程
        return true;
    }
    return false;
}
```



　　调用tryRelease()来释放资源。有一点需要注意的是，它是根据tryRelease()的返回值来判断该线程是否已经完成释放掉资源了！所以自定义同步器在设计tryRelease()的时候要明确这一点

　　unlock方法调用了AQS的release方法，同样传入了参数1，和获取锁的相应对应，获取一个锁，标示为+1，释放一个锁，标志位-1。tryRelease有子类实现。

　　跟tryAcquire()一样，这个方法是需要独占模式的自定义同步器去实现的。正常来说，tryRelease()都会成功的，因为这是独占模式，该线程来释放资源，那么它肯定已经拿到独占资源了，直接减掉相应量的资源即可(state-=arg)，也不需要考虑线程安全的问题。但要注意它的返回值，上面已经提到了，**release()是根据tryRelease()的返回值来判断该线程是否已经完成释放掉资源了！**所以自义定同步器在实现时，如果已经彻底释放资源(state=0)，要返回true，否则返回false。

#### 2.4.1.1、tryRelease



``` java
protected final boolean tryRelease(int releases) {
            int c = getState() - releases;//释放，-1
            if (Thread.currentThread() != getExclusiveOwnerThread())//判断释放的线程跟获取锁的线程是否一致
                throw new IllegalMonitorStateException();
            boolean free = false;
            if (c == 0) {//因为重入的关系，则进行多次释放，直至status==0则真正释放锁
                free = true;
                setExclusiveOwnerThread(null);
            }
            setState(c);
            return free;
        }
```



释放锁，成功后，找到AQS的头节点（Head），并唤醒它即可unparkSuccessor：

#### 2.4.1.2、unparkSucessor

AQS中的release释放同步状态和acquire获取同步状态一样，都是模板方法，tryRelease释放的具体操作都有子类去实现，父类AQS只提供一个算法骨架。



``` java
private void unparkSucessor(Node node) {
    int ws = node.waitStatus;
    if (ws < 0)   //ws != CANCELLED
    compareAndSetWaitStatus(node, ws, 0);  //利用CAS将当前线程的等待状态置为CANCELLE
    Node s = node.next;
    if (s == null || s.waitSatatus > 0) {  //如果当前线程的后继节点为空，则从同步队列的尾节点开始向前寻找当前线程的下一个不为空的节点
       s = null;
       for (Node t = tail; t != null && t != node; t = t.prev)
           if (t.waitStatus <= 0)  
               s = r;
    }
    if (s != null)
        LockSuport.unpark(s.thread);    //如果当前线程的后继节点不为空，则调用LockSuport.unpark唤醒其后继节点，使得后继节点得以重新尝试获取同步状态
}
```



用unpark()唤醒等待队列中最前边的那个未放弃线程

## 2.5、共享模式同步状态的获取

 

| AbstractQueuedSynchronizer                |                                  |
| ----------------------------------------- | -------------------------------- |
| 方法                                      | 描述                             |
| public final void acquireShared (int arg) | 共享模式下获取同步状态，忽略中断 |

同独占模式获取同步状态的acquire方法类似

``` java
//AbstractQueuedSynchronizer#acquireShared
public final void acquireShared(int arg) {
    if (tryAcquireShared(arg)) //获取锁，由子类具体实现
    doAcquireShared(arg);
}
```

针对tryAcquireShared的实现可以发现有：java.util.concurrent.Semaphore的公平锁和非公平锁、java.util.concurrent.CountDownLatch、java.util.concurrent.locks.ReentrantReadWriteLock等

查看doAcquireShared代码





``` java
    private void doAcquireShared(int arg) {
        final Node node = addWaiter(Node.SHARED);
        boolean failed = true;
        try {
            boolean interrupted = false;
            for (;;) {
                final Node p = node.predecessor();
                if (p == head) {
                    int r = tryAcquireShared(arg);
                    if (r >= 0) {
                        setHeadAndPropagate(node, r);
                        p.next = null; // help GC
                        if (interrupted)
                            selfInterrupt();
                        failed = false;
                        return;
                    }
                }
                if (shouldParkAfterFailedAcquire(p, node) &&
                    parkAndCheckInterrupt())
                    interrupted = true;
            }
        } finally {
            if (failed)
                cancelAcquire(node);
        }
    }
```



　　共享模式下获取同步状态的自旋过程和独占模式大致相同，从代码实现角度来看不同的是共享模式下把线程构造节点加入队列，以及在获取同步状态后中断当前线程都放到了同一个方法里doAcquireShared。共享模式同样也是只有在是其前驱节点是头结点的时候才会尝试获取同步状态，调用tryAcquireShared获取同步状态成功后会返回大于等于0的数，这个时候将会执行setHeadAndPropagate方法，这个方法首先会将当前获取同步状态的这个线程置为头节点（同独占模式一样），但在将当前线程置为头节点过后，又做了一部分操作，其代码如下：



``` java
private void setHeadAndPropagate(Node node, int propagate) {
    Node h = head;
    setHead(node);    //将当前获取到同步状态的线程节点置为头节点 
    if (propagate > 0 || h == null || h.waitStatus < 0) {    //唤醒后继节点
    Node s = node.next;
    if (s == null || s.isShared()) 
        doReleaseShared();    //唤醒后继节点，因为是共享模式，所以允许多个线程同时获取同步状态
    }
}
```



　　在doReleaseShared方法中，首先便利队列中的所有节点，如果节点状态为SIGNAL，则把SIGNAL状态置为0(初始状态)，并调用unparkSuccessor把该节点的后继节点唤醒，如果该节点的状态为0，则把状态置为PROPAGATE。

## 2.6、共享模式同步状态的释放

| AbstractQueuedSynchronizer                  |                              |
| ------------------------------------------- | ---------------------------- |
| 方法                                        | 描述                         |
| public final boolean releaseShared(int arg) | 释放同步状态，并唤醒后继节点 |

该方法的实现同独占模式类似，也是一个模板方法，具体的释放实现由子类自定义，在成功释放同步状态后将会唤醒后继节点：



``` java
public final boolean releaseShared(int arg) {
    if (tryReleaseShared(arg)) {    //释放同步状态
        doReleaseShared();    //唤醒后继节点
        return true;
    }
    return false;
}
```



三、总结

3.1、Main exported method【主要方法】

| AbstractQueuedSynchronizer                                       |                                                                                                                                                                                   |
| ---------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| public final void acquire(int arg)                               | 独占模式下阻塞获取同步状态，成功获取则返回，失败则进入同步队列等待。(例：ReentrantLock.lock)                                                                                      |
| public final void acquireInterruptibly(int arg)                  | 该方法与acquire类似，唯一不同的是如果当前线程被中断，该方法会抛出InterruptedException并返回，也就是说如果当前线程不被中断则和acquire一样。（例：ReentrantLock.lockInterruptibly） |
| public final boolean tryAcquireNanos(int arg, long nanosTimeOut) | 该方法在acquireInterruptibly的基础上增加了超时限制，如果当前线程在超时时间内获取到同步状态则返回true，获取不到则返回false。（例：ReentrantLock.tryLock）                          |
| public final acquireShared(int arg)                              | 共享模式下阻塞获取同步状态，成功获取则返回，失败则进入同步队列。（例：ReentrantReadWriteLock.unlock）                                                                             |
| public final acquireSharedInterruptibly(int arg)                 | 与acquireShared不同是此方法响应中断，与acquireInterruptibly类似，不同是的此方法是在共享模式下。（例：ReentrantReadWriteLock.lockInterruptibly）                                   |
| public final tryAcquireSharedNanos(int arg, long nanos)          | 在acquireSharedInterruptibly基础上增加了超时限制，同样是在共享模式下。（例：ReentrantReadWriteLock.tryAcquireSharedNanos）                                                        |
| public final boolean release(int arg)                            | 独占模式下释放同步状态，释放之后会将同步队列中的第一个包含的线程唤醒                                                                                                              |
| public final boolean releaseShared(int arg)                      | 共享模式下释放同步状态                                                                                                                                                            |

子类可以重写的模板方法

| AbstractQueuedSynchronizer              |                                                                            |
| --------------------------------------- | -------------------------------------------------------------------------- |
| protected boolean tryAcquire(int arg)   | 子类可实现在独占模式下获取同步状态的具体方法。                             |
| protected boolean tryRelease()          | 子类可实现在独占模式下释放同步状态的具体方法。                             |
| protected int tryAcquireShared(int arg) | 子类可实现在共享模式下获取同步状态的具体方法。                             |
| protected int tryReleaseShared()        | 子类可实现在共享模式下释放同步状态的具体方法。                             |
| protected boolean isHeldExclusively()   | 当前同步器是否在独占模式下被线程占用，一般表示该方法是否被当前线程所独占。 |

3.2、Queue inspection methods【队列检查方法】

| AbstractQueuedSynchronizer                       |                                                                                   |
| ------------------------------------------------ | --------------------------------------------------------------------------------- |
| public final boolean hasQueuedThreads()          | 同步队列中是否有等待线程。                                                        |
| public final boolean hasContended()              | 查询是否其他线程也曾争则获取此同步器，也就是说acquire是否已经阻塞，是则返回true。 |
| public final Thread getFirstQueuedThread()       | 返回当前同步队列中的第一个线程，米有则返回null。                                  |
| public final boolean isQueued(Thread thread)     | 线程是否已经在等待队列中，是则返回true。                                          |
| final boolean apparentlyFirstQueuedIsExclusive() | （包级可见）同步队列中第一个等待节点是否为独占模式                                |
| public final boolean hasQueuedPredecessors()     | 查询是否有其他线程获取同步状态的时间大于当前线程，用于公平锁的实现。              |

3.3、Instrumentation and monitoring methods【监控监测方法】
``` java
| AbstractQueuedSynchronizer                                  |                                                                |
| ----------------------------------------------------------- | -------------------------------------------------------------- |
| public final int getQueueLength()                           | 返回同步队列的估计长度，该方法用于监视系统状态，而非同步控制。 |
| public final Collection<Thread> getQueuedThreads()          | 获取同步队列线程集合，同样是一个估计值。                       |
| public final Collection<Thread> getExclusiveQueuedThreads() | 获取同步队列中独占模式线程集合，估计值。                       |
| public final Collection<Thread> getSharedQueuedThreads()    | 获取同步队列中共享模式线程集合，同估计值。                     |
```

3.4、Internal support methods for Conditions【内部支持的Conditions方法】

| AbstractQueuedSynchronizer     |                              |
| ------------------------------ | ---------------------------- |
| final isOnSyncQueue(Node node) | 当前节点是否在sync等待队列中 |

 其实还有：Instrumentation methods for conditions等一些方法。



## 参考文章
* https://www.cnblogs.com/bjlhx/p/10365620.html