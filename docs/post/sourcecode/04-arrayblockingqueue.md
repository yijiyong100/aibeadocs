---
title: 源码解析-ArrayBlockingQueue
---

::: tip
本文主要是介绍 源码解析-ArrayBlockingQueue 。
:::

[[toc]]

## **ArrayBlockingQueue源码解析**

ArrayBlockingQueue是一个阻塞式的队列，继承自AbstractBlockingQueue,间接的实现了Queue接口和Collection接口。底层以数组的形式保存数据(实际上可看作一个循环数组)。常用的操作包括 add ,offer,put，remove,poll,take,peek。

## **一、类声明**

```java
public class ArrayBlockingQueue<E> extends AbstractQueue<E> implements BlockingQueue<E>, Serializable
```

 

1）AbstractQueue提供了Queue接口的默认实现。

2）BlockingQueue接口定义了阻塞队列必须实现的方法。

3）通过实现 java.io.Serializable 接口以启用其序列化功能。未实现此接口的类将无法使其任何状态序列化或反序列化。序列化接口没有方法或字段，仅用于标识可序列化的语义。

 

## **二、成员变量**



```java
private final E[] items;//底层数据结构

private int takeIndex;//用来为下一个take/poll/remove的索引（出队）

private int putIndex;//用来为下一个put/offer/add的索引（入队）

private int count;//队列中元素的个数

private final ReentrantLock lock;//锁

private final Condition notEmpty;//等待出队的条件

private final Condition notFull;//等待入队的条件
```



 

## **三、构造方法**

ArrayBlockingQueue提供了两个构造方法：



```java
/**
* 创造一个队列，指定队列容量，指定模式
* @param fair
* true：先来的线程先操作
* false：顺序随机
*/
public ArrayBlockingQueue(int capacity, boolean fair) {
    if (capacity <= 0)
        throw new IllegalArgumentException();
    this.items = (E[]) new Object[capacity];//初始化类变量数组items
    lock = new ReentrantLock(fair);//初始化类变量锁lock
    notEmpty = lock.newCondition();//初始化类变量notEmpty Condition
    notFull = lock.newCondition();//初始化类变量notFull Condition
}

/**
* 创造一个队列，指定队列容量，默认模式为非公平模式
* @param capacity <1会抛异常
*/
public ArrayBlockingQueue(int capacity) {
    this(capacity, false);
}
```



ArrayBlockingQueue的组成：一个对象数组+1把锁ReentrantLock+2个条件Condition

 

## **三、成员方法**

### **入队方法**

　　ArrayBlockingQueue的添加数据方法有add，put，offer这3个方法，总结如下：

　　add方法内部调用offer方法，如果队列满了，抛出IllegalStateException异常，否则返回true

　　offer方法如果队列满了，返回false，否则返回true

　　**add方法和offer方法不会阻塞线程，put方法如果队列满了会阻塞线程，直到有线程消费了队列里的数据才有可能被唤醒。**

　　这3个方法内部都会使用可重入锁保证原子性。

### 1）add方法：

```java
public boolean add(E e) {
    if (offer(e))
        return true;
    else
        throw new IllegalStateException("Queue full");
}
```

### 2）offer方法：

在队尾插入一个元素， 如果队列没满，立即返回true； 如果队列满了，立即返回false。因为使用的是ReentrantLock重入锁，所以需要显式地加锁和释放锁。



```java
public boolean offer(E e) {
        if (e == null)
            throw new NullPointerException();
        final ReentrantLock lock = this.lock;
        lock.lock();
        try {
            if (count == items.length)//数组满了
                return false;
            else {//数组没满
                insert(e);//插入一个元素
                return true;
            }
        } finally {
            lock.unlock();
        }
}
```



在插入元素结束后，唤醒等待notEmpty条件（即获取元素）的线程。



```java
/**
* 在队尾插入一个元素,并设置了超时等待的时间
* 如果数组已满，则进入等待，直到出现以下三种情况：
* 1、被唤醒
* 2、等待时间超时
* 3、当前线程被中断
*/
public boolean offer(E e, long timeout, TimeUnit unit)throws InterruptedException {
　　if (e == null)
　　　　throw new NullPointerException();
　　long nanos = unit.toNanos(timeout);//将超时时间转换为纳秒
　　final ReentrantLock lock = this.lock;
        /*
         * lockInterruptibly():
         * 1、 在当前线程没有被中断的情况下获取锁。
         * 2、如果获取成功，方法结束。
         * 3、如果锁无法获取，当前线程被阻塞，直到下面情况发生：
         * 1）当前线程(被唤醒后)成功获取锁
         * 2）当前线程被其他线程中断
         * 
         * lock()
         * 获取锁，如果锁无法获取，当前线程被阻塞，直到锁可以获取并获取成功为止。
         */
　　lock.lockInterruptibly();//加可中断的锁
　　try {
　　　　for (;;) {
　　　　　　if (count != items.length) {//队列未满
　　　　　　　　insert(e);
　　　　　　　　return true;
　　　　　　}
　　　　　　if (nanos <= 0)//已超时
　　　　　　　　return false;
　　　　　　try {
　　　　　　　　/*
　　　　　　　　* 进行等待：
　　　　　　　　* 在这个过程中可能发生三件事：
　　　　　　　　* 1、被唤醒-->继续当前这个for(;;)循环
　　　　　　　　* 2、超时-->继续当前这个for(;;)循环
　　　　　　　　* 3、被中断-->之后直接执行catch部分的代码
　　　　　　　　*/
　　　　　　　　nanos = notFull.awaitNanos(nanos);//进行等待（在此过程中，时间会流失,在此过程中，线程也可能被唤醒）
　　　　　　} catch (InterruptedException ie) {//在等待的过程中线程被中断
　　　　　　　　notFull.signal(); // 唤醒其他未被中断的线程
　　　　　　　　throw ie;
　　　　　　}
　　　　}
　　} finally {
　　　　lock.unlock();
　　}
}
```



无论是第一个offer方法还是第二个offer方法都调用了insert方法，insert方法的步骤是首先添加元素，然后利用inc函数进行索引的添加，最后会唤醒因为队列中没有数据而等待被阻塞的获取数据的方法。

```java
private void insert(E x) {
    items[putIndex] = x; // 元素添加到数组里
    putIndex = inc(putIndex); // 放数据索引+1，当索引满了变成0
    ++count; // 元素个数+1
    notEmpty.signal(); // 使用条件对象notEmpty通知，比如使用take方法的时候队列里没有数据，被阻塞。这个时候队列insert了一条数据，需要调用signal进行通知
}
```

其中inc函数来改变索引的增加：

```java
final int inc(int i) {
    return (++i == items.length) ? 0 : I;
}
```

### 3）put方法



```java
/**
* 在队尾插入一个元素
* 如果队列满了，一直阻塞，直到数组不满了或者线程被中断
*/
public void put(E e) throws InterruptedException {
　　if (e == null)
　　　　throw new NullPointerException();
　　final E[] items = this.items;
　　final ReentrantLock lock = this.lock;
　　lock.lockInterruptibly();
　　try {
　　　　try {
　　　　　　while (count == items.length)//队列满了，一直阻塞在这里
　　　　　　　　/*
　　　　　　　　* 一直等待条件notFull，即被其他线程唤醒
　　　　　　　　* （唤醒其实就是，有线程将一个元素出队了，然后调用notFull.signal()唤醒其他等待这个条件的线程，同时队列也不慢了）
  　　　　　　　*/
　　　　　　　　notFull.await();
　　　　} catch (InterruptedException ie) {//如果被中断
　　　　　　notFull.signal(); // 唤醒其他等待该条件（notFull，即入队）的线程
　　　　　　throw ie;
　　　　}
　　　　insert(e);
　　} finally {
　　　　lock.unlock();
　　}
}
```



 

###  出队方法

ArrayBlockingQueue有不同的几个数据删除方法，poll、take、remove方法。

ArrayBlockingQueue的删除数据方法有poll，take，remove这3个方法，总结如下：

poll方法对于队列为空的情况，返回null，否则返回队列头部元素。

remove方法取的元素是基于对象的下标值，删除成功返回true，否则返回false。

poll方法和remove方法不会阻塞线程。

**take方法对于队列为空的情况，会阻塞并挂起当前线程，直到有数据加入到队列中。**

这3个方法内部都会调用notFull.signal方法通知正在等待队列满情况下的阻塞线程。

### 1）poll方法



```java
public E poll() {
    final ReentrantLock lock = this.lock;
    lock.lock(); // 加锁，保证调用poll方法的时候只有1个线程
    try {
        return (count == 0) ? null : extract(); // 如果队列里没元素了，返回null，否则调用extract方法
    } finally {
        lock.unlock(); // 释放锁，让其他线程可以调用poll方法
    }
}
```



poll方法内部调用extract方法：



```java
private E extract() {
　　final E[] items = this.items;
　　E x = items[takeIndex];//获取出队元素
　　items[takeIndex] = null;//将出队元素位置置空
　　/*
　　* 第一次出队的元素takeIndex==0,第二次出队的元素takeIndex==1
　　* (注意：这里出队之后，并没有将后面的数组元素向前移)
　　*/
　　takeIndex = inc(takeIndex);
　　--count;//数组元素个数-1
　　notFull.signal();//数组已经不满了，唤醒其他等待notFull条件的线程
　　return x;//返回出队的元素
}
```



同样地notfull标志表示数组已经不满，可以执行被阻塞的入队操作。

### 2）take方法



```java
public E take() throws InterruptedException {
    final ReentrantLock lock = this.lock;
    lock.lockInterruptibly(); // 加锁，保证调用take方法的时候只有1个线程
    try {
        while (count == 0) // 如果队列空，阻塞当前线程，并加入到条件对象notEmpty的等待队列里
            notEmpty.await(); // 线程阻塞并被挂起，同时释放锁
        return extract(); // 调用extract方法
    } finally {
        lock.unlock(); // 释放锁，让其他线程可以调用take方法
    }
}
```



### 3）remove方法



```java
public boolean remove(Object o) {
    if (o == null) return false;
    final Object[] items = this.items;
    final ReentrantLock lock = this.lock;
    lock.lock(); // 加锁，保证调用remove方法的时候只有1个线程
    try {
        for (int i = takeIndex, k = count; k > 0; i = inc(i), k--) { // 遍历元素
            if (o.equals(items[i])) { // 两个对象相等的话
                removeAt(i); // 调用removeAt方法
                return true; // 删除成功，返回true
            }
        }
        return false; // 删除成功，返回false
    } finally {
        lock.unlock(); // 释放锁，让其他线程可以调用remove方法
    }
}
```



以及



```java
void removeAt(int i) {
    final Object[] items = this.items;
    if (i == takeIndex) { // 如果要删除数据的索引是取索引位置，直接删除取索引位置上的数据，然后取索引+1即可
        items[takeIndex] = null;
        takeIndex = inc(takeIndex);
    } else { // 如果要删除数据的索引不是取索引位置，移动元素元素，更新取索引和放索引的值
        for (;;) {
            int nexti = inc(i);
            if (nexti != putIndex) {
                items[i] = items[nexti];
                i = nexti;
            } else {
                items[i] = null;
                putIndex = i;
                break;
            }
        }
    }
    --count; // 元素个数-1
    notFull.signal(); // 使用条件对象notFull通知，比如使用put方法放数据的时候队列已满，被阻塞。这个时候消费了一条数据，队列没满了，就需要调用signal进行通知 
}
```




## 参考文章
* https://www.cnblogs.com/winterfells/p/8870104.html