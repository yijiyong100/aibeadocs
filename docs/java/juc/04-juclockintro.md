---
title: JUC-锁-介绍
---

## Java高级知识篇【JUC-锁-介绍】

::: tip
本文主要是介绍 JUC-锁-介绍 。
:::

[[toc]]
 

## 一、概述

　　Java中的锁，可以分为"**同步锁**"和"**JUC包中的锁**"。

## 1.1、同步锁　　

　　即通过synchronized关键字来进行同步，实现对竞争资源的互斥访问的锁。Java 1.0版本中就已经支持同步锁了。

　　同步锁的原理是，对于每一个对象，有且仅有一个同步锁；不同的线程能共同访问该同步锁。但是，在同一个时间点，该同步锁能且只能被一个线程获取到。这样，获取到同步锁的线程就能进行CPU调度，从而在CPU上执行；而没有获取到同步锁的线程，必须进行等待，直到获取到同步锁之后才能继续运行。这就是，多线程通过同步锁进行同步的原理！

## 1.2、JUC包中的锁

　　相比同步锁，JUC包中的锁的功能更加强大，它为锁提供了一个框架，该框架允许更灵活地使用锁，只是它的用法更难罢了。

　　JUC包中的锁，包括：Lock接口，ReadWriteLock接口，LockSupport阻塞原语，Condition条件，AbstractOwnableSynchronizer/AbstractQueuedSynchronizer/AbstractQueuedLongSynchronizer三个抽象类，ReentrantLock独占锁，ReentrantReadWriteLock读写锁。由于CountDownLatch，CyclicBarrier和Semaphore也是通过AQS来实现的；因此，也将它们归纳到锁的框架中进行介绍。

　　先看看锁的框架图，如下所示。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/java/juc/juclockintro-1.png')" alt="wxmp">

**01. Lock接口**

　　JUC包中的 Lock 接口支持那些语义不同(重入、公平等)的锁规则。所谓语义不同，是指锁可是有"公平机制的锁"、"非公平机制的锁"、"可重入的锁"等等。"公平机制"是指"不同线程获取锁的机制是公平的"，而"非公平机制"则是指"不同线程获取锁的机制是非公平的"，"可重入的锁"是指同一个锁能够被一个线程多次获取。

**02. ReadWriteLock**

　　ReadWriteLock 接口以和Lock类似的方式定义了一些读取者可以共享而写入者独占的锁。JUC包只有一个类实现了该接口，即 ReentrantReadWriteLock，因为它适用于大部分的标准用法上下文。但程序员可以创建自己的、适用于非标准要求的实现。

**03. AbstractOwnableSynchronizer/AbstractQueuedSynchronizer/AbstractQueuedLongSynchronizer**
　　AbstractQueuedSynchronizer就是被称之为**AQS**的类，它是一个非常有用的超类，可用来定义锁以及依赖于排队阻塞线程的其他同步器；ReentrantLock，ReentrantReadWriteLock，CountDownLatch，CyclicBarrier和Semaphore等这些类都是基于AQS类实现的。AbstractQueuedLongSynchronizer 类提供相同的功能但扩展了对同步状态的 64 位的支持。两者都扩展了类 AbstractOwnableSynchronizer（一个帮助记录当前保持独占同步的线程的简单类）。

**04. LockSupport**
　　LockSupport提供“创建锁”和“其他同步类的基本线程阻塞原语”。 
　　LockSupport的功能和"Thread中的Thread.suspend()和Thread.resume()有点类似"，LockSupport中的park() 和 unpark() 的作用分别是阻塞线程和解除阻塞线程。但是park()和unpark()不会遇到“Thread.suspend 和 Thread.resume所可能引发的死锁”问题。 

**05. Condition**
　　Condition需要和Lock联合使用，它的作用是代替Object监视器方法，可以通过await(),signal()来休眠/唤醒线程。
Condition 接口描述了可能会与锁有关联的条件变量。这些变量在用法上与使用 Object.wait 访问的隐式监视器类似，但提供了更强大的功能。需要特别指出的是，单个 Lock 可能与多个 Condition 对象关联。为了避免兼容性问题，Condition 方法的名称与对应的 Object 版本中的不同。

**06. ReentrantLock**
　　ReentrantLock是独占锁。所谓独占锁，是指只能被独自占领，即同一个时间点只能被一个线程锁获取到的锁。ReentrantLock锁包括"公平的ReentrantLock"和"非公平的ReentrantLock"。"公平的ReentrantLock"是指"不同线程获取锁的机制是公平的"，而"非公平的　　ReentrantLock"则是指"不同线程获取锁的机制是非公平的"，ReentrantLock是"可重入的锁"。
　　ReentrantLock的UML类图如下：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/java/juc/juclockintro-2.png')" alt="wxmp">

　　(01) ReentrantLock实现了Lock接口。
　　(02) ReentrantLock中有一个成员变量sync，sync是Sync类型；Sync是一个抽象类，而且它继承于AQS。
　　(03) ReentrantLock中有"公平锁类"FairSync和"非公平锁类"NonfairSync，它们都是Sync的子类。ReentrantReadWriteLock中sync对象，是FairSync与NonfairSync中的一种，这也意味着ReentrantLock是"公平锁"或"非公平锁"中的一种，ReentrantLock默认是非公平锁。

**07. ReentrantReadWriteLock**
　　ReentrantReadWriteLock是读写锁接口ReadWriteLock的实现类，它包括子类ReadLock和WriteLock。ReentrantLock是共享锁，而WriteLock是独占锁。
　　ReentrantReadWriteLock的UML类图如下：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/java/juc/juclockintro-3.png')" alt="wxmp">

　  (01) ReentrantReadWriteLock实现了ReadWriteLock接口。
　　(02) ReentrantReadWriteLock中包含sync对象，读锁readerLock和写锁writerLock。读锁ReadLock和写锁WriteLock都实现了Lock接口。
　　(03) 和"ReentrantLock"一样，sync是Sync类型；而且，Sync也是一个继承于AQS的抽象类。Sync也包括"公平锁"FairSync和"非公平锁"NonfairSync。

**08. CountDownLatch**
　　CountDownLatch是一个同步辅助类，在完成一组正在其他线程中执行的操作之前，它允许一个或多个线程一直等待。 
　　CountDownLatch的UML类图如下：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/java/juc/juclockintro-4.png')" alt="wxmp">

　　CountDownLatch包含了sync对象，sync是Sync类型。CountDownLatch的Sync是实例类，它继承于AQS。

**09. CyclicBarrier**
　　CyclicBarrier是一个同步辅助类，允许一组线程互相等待，直到到达某个公共屏障点 (common barrier point)。因为该 barrier 在释放等待线程后可以重用，所以称它为循环 的 barrier。
　　CyclicBarrier的UML类图如下：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/java/juc/juclockintro-5.png')" alt="wxmp">

　　CyclicBarrier是包含了"ReentrantLock对象lock"和"Condition对象trip"，它是通过独占锁实现的。
　　**CyclicBarrier和CountDownLatch的区别**是：
　　(01) CountDownLatch的作用是允许1或N个线程等待其他线程完成执行；而CyclicBarrier则是允许N个线程相互等待。
　　(02) CountDownLatch的计数器无法被重置；CyclicBarrier的计数器可以被重置后使用，因此它被称为是循环的barrier。

**10. Semaphore**
　　Semaphore是一个计数信号量，它的本质是一个"共享锁"。
　　信号量维护了一个信号量许可集。线程可以通过调用acquire()来获取信号量的许可；当信号量中有可用的许可时，线程能获取该许可；否则线程必须等待，直到有可用的许可为止。 线程可以通过release()来释放它所持有的信号量许可。
　　Semaphore的UML类图如下：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/java/juc/juclockintro-6.png')" alt="wxmp">

　　和"ReentrantLock"一样，Semaphore包含了sync对象，sync是Sync类型；而且，Sync也是一个继承于AQS的抽象类。Sync也包括"公平信号量"FairSync和"非公平信号量"NonfairSync。

## 参考文章
* https://www.cnblogs.com/bjlhx/p/11053421.html