---
title: JUC-集合-基础介绍
---

## Java高级知识篇【JUC-集合-基础介绍】

::: tip
本文主要是介绍 JUC-集合-基础介绍 。
:::

[[toc]]

## 【----------------------------】
<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/java/juc/intro-1.png')" alt="wxmp">

## 一、概述

## 1.1、java集合

java集合的架构，主体内容包括Collection集合和Map类；而Collection集合又可以划分为List(队列)和Set(集合)。


**1. List的实现类主要有: LinkedList, ArrayList, Vector, Stack。**

(01) [LinkedList](http://www.cnblogs.com/skywang12345/p/3308807.html)是双向链表实现的双端队列；它不是线程安全的，只适用于单线程。
(02) [ArrayList](http://www.cnblogs.com/skywang12345/p/3308556.html)是数组实现的队列，它是一个动态数组；它也不是线程安全的，只适用于单线程。
(03) [Vector](http://www.cnblogs.com/skywang12345/p/3308833.html)是数组实现的矢量队列，它也一个动态数组；不过和ArrayList不同的是，Vector是线程安全的，它支持并发。
(04) [Stack](http://www.cnblogs.com/skywang12345/p/3308852.html)是Vector实现的栈；和Vector一样，它也是线程安全的。

**2. Set的实现类主要有: HastSet和TreeSet。**

(01) [HashSet](http://www.cnblogs.com/skywang12345/p/3311252.html)是一个没有重复元素的集合，它通过HashMap实现的；HashSet不是线程安全的，只适用于单线程。
(02) [TreeSet](http://www.cnblogs.com/skywang12345/p/3311268.html)也是一个没有重复元素的集合，不过和HashSet不同的是，TreeSet中的元素是有序的；它是通过TreeMap实现的；TreeSet也不是线程安全的，只适用于单线程。

**3.Map的实现类主要有: HashMap，WeakHashMap, Hashtable和TreeMap。**

(01) [HashMap](http://www.cnblogs.com/skywang12345/p/3310835.html)是存储“键-值对”的哈希表；它不是线程安全的，只适用于单线程。
(02) [WeakHashMap](http://www.cnblogs.com/skywang12345/p/3311092.html)是也是哈希表；和HashMap不同的是，HashMap的“键”是强引用类型，而WeakHashMap的“键”是弱引用类型，也就是说当WeakHashMap 中的某个键不再正常使用时，会被从WeakHashMap中被自动移除。WeakHashMap也不是线程安全的，只适用于单线程。
(03) [Hashtable](http://www.cnblogs.com/skywang12345/p/3310887.html)也是哈希表；和HashMap不同的是，Hashtable是线程安全的，支持并发。
(04) [TreeMap](http://www.cnblogs.com/skywang12345/p/3310928.html)也是哈希表，不过TreeMap中的“键-值对”是有序的，它是通过R-B Tree(红黑树)实现的；TreeMap不是线程安全的，只适用于单线程。

　　java集合包大多是“非线程安全的”，虽然可以通过Collections工具类中的方法获取java集合包对应的同步类，但是这些同步类的并发效率并不是很高。为了更好的支持高并发任务，并发大师Doug Lea在JUC(java.util.concurrent)包中添加了java集合包中单线程类的对应的支持高并发的类。*例如，ArrayList对应的高并发类是CopyOnWriteArrayList，HashMap对应的高并发类是ConcurrentHashMap，等等。*

　　*更多java集合参看：https://www.cnblogs.com/bjlhx/category/1484779.html*

## 1.2、JUC集合

juc-collections集合框架，是指`java.util.concurrent`包下的一些同步集合类，按类型划分可以分为：**符号表**、**队列**、**Set集合**、**列表**四大类，每个类都有自己适合的使用场景，整个juc-collections集合框架的结构如下图：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/java/juc/juccat-6.png')" alt="wxmp">

其中阻塞队列的分类及特性如下表：

| 队列特性 | 有界队列           | 近似无界队列                             | 无界队列            | 特殊队列                          |
| -------- | ------------------ | ---------------------------------------- | ------------------- | --------------------------------- |
| 有锁算法 | ArrayBlockingQueue | LinkedBlockingQueue、LinkedBlockingDeque | /                   | PriorityBlockingQueue、DelayQueue |
| 无锁算法 | /                  | /                                        | LinkedTransferQueue | SynchronousQueue                  |


　　JUC包在添加”java集合包“对应的高并发类时，为了保持API接口的一致性，使用了”Java集合包“中的框架。*例如，CopyOnWriteArrayList实现了“Java集合包”中的List接口，HashMap继承了“java集合包”中的AbstractMap类，等等。*得益于“JUC包使用了Java集合包中的类”，如果我们了解了Java集合包中的类的思想之后，理解JUC包中的类也相对容易；理解时，最大的难点是，对JUC包是如何添加对“高并发”的支持的！　　

　　为了方便，将JUC包中的集合类划分为3部分来进行说明。在简单的了解JUC包中集合类的框架之后。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/java/juc/juccolintro-1.png')" alt="wxmp">

 

**1. List和Set**

JUC集合包中的List和Set实现类包括: CopyOnWriteArrayList, CopyOnWriteArraySet和ConcurrentSkipListSet。ConcurrentSkipListSet稍后在说明Map时再说明，CopyOnWriteArrayList 和 CopyOnWriteArraySet的框架如下图所示：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/java/juc/juccolintro-2.png')" alt="wxmp">

　　(01) CopyOnWriteArrayList相当于线程安全的ArrayList，它实现了List接口。CopyOnWriteArrayList是支持高并发的。
　　(02) CopyOnWriteArraySet相当于线程安全的HashSet，它继承于AbstractSet类。CopyOnWriteArraySet内部包含一个CopyOnWriteArrayList对象，它是通过CopyOnWriteArrayList实现的。

**2. Map**

JUC集合包中Map的实现类包括: ConcurrentHashMap和ConcurrentSkipListMap。它们的框架如下图所示：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/java/juc/juccolintro-3.png')" alt="wxmp">

(01) ConcurrentHashMap是线程安全的哈希表(相当于线程安全的HashMap)；它继承于AbstractMap类，并且实现ConcurrentMap接口。ConcurrentHashMap是通过“锁分段”来实现的，它支持并发。
(02) ConcurrentSkipListMap是线程安全的有序的哈希表(相当于线程安全的TreeMap); 它继承于AbstractMap类，并且实现ConcurrentNavigableMap接口。ConcurrentSkipListMap是通过“跳表”来实现的，它支持并发。
(03) ConcurrentSkipListSet是线程安全的有序的集合(相当于线程安全的TreeSet)；它继承于AbstractSet，并实现了NavigableSet接口。ConcurrentSkipListSet是通过ConcurrentSkipListMap实现的，它也支持并发。

**3. Queue**

JUC集合包中Queue的实现类包括: ArrayBlockingQueue, LinkedBlockingQueue, LinkedBlockingDeque, ConcurrentLinkedQueue和ConcurrentLinkedDeque。它们的框架如下图所示：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/java/juc/juccolintro-4.png')" alt="wxmp">

(01) ArrayBlockingQueue是数组实现的线程安全的有界的阻塞队列。
(02) LinkedBlockingQueue是单向链表实现的(指定大小)阻塞队列，该队列按 FIFO（先进先出）排序元素。
(03) LinkedBlockingDeque是双向链表实现的(指定大小)双向并发阻塞队列，该阻塞队列同时支持FIFO和FILO两种操作方式。
(04) ConcurrentLinkedQueue是单向链表实现的无界队列，该队列按 FIFO（先进先出）排序元素。
(05) ConcurrentLinkedDeque是双向链表实现的无界队列，该队列同时支持FIFO和FILO两种操作方式。

## 参考文章
* https://www.cnblogs.com/bjlhx/p/11067891.html