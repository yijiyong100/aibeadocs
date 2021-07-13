---
title: Redis中IO多路复用
---

::: tip
本文主要是介绍 Redis中IO多路复用 。
:::

[[toc]]

IO多路复用：Redis中经典的Reactor设计模式




## Redis为什么快

相比大家都是见惯不怪的了，主要的原因时什么呢，主要时以下的三个原因：

1.单线程 避免了锁 线程之间的互相竞争
2.多路复用
3.内存的读取

下边我们主要的分析下Redis中基于多路复用的模型，如果这个不了解，那么你不能说自己熟悉Redis了。

Redis Server跑在单进程单线程中，接收到的命令操作都是按照顺序线性执行的，即便如此，它的读写性能依然能达到10W+的QPS，不得不说：Redis的设计十分优秀。

IO即为网络I/O，多路即为多个TCP连接，复用即为共用一个线程或者进程，模型最大的优势是系统开销小，不必创建也不必维护过多的线程或进程。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/db/redis/io-1.png')" alt="wxmp">

 



 

## IO多路复用是经典的Reactor设计模式，

有时也称为异步阻塞IO（异步指socket为non-blocking，堵塞指select堵塞），为常见的四种IO模型之一，

其他三种分别是：同步堵塞IO、同步非堵塞IO、异步（非堵塞）IO。

## Reactor 是什么

关于reactor 是什么，我们先从wiki上看下:

> The reactor design pattern is an event handling pattern for handling service requests delivered concurrently to a service handler by one or more inputs. The service handler then demultiplexes the incoming requests and dispatches them synchronously to the associated request handlers.

从上述文字中我们可以看出以下关键点 ：

> 1. 事件驱动（event handling）
> 2. 可以处理一个或多个输入源（one or more inputs）
> 3. 通过Service Handler同步的将输入事件（Event）采用多路复用分发给相应的Request Handler（多个）处理
<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/db/redis/io-0.png')" alt="wxmp">


IO多路复用的核心是可以同时处理多个连接请求，为此使用了两个系统调用，分别是：

select/poll/epoll--模型机制：可以监视多个描述符（fd），一旦某个描述符就绪（读/写/异常）就能通知程序进行相应的读写操作。读写操作都是自己负责的，也即是阻塞的，所以本质上都是同步（堵塞）IO。

Redis支持这三种机制，默认使用epoll机制。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/db/redis/io-2.png')" alt="wxmp">

 

 

## epoll原理：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/db/redis/io-3.png')" alt="wxmp">

 

 

调用epoll_create：linux内核会在epoll文件系统创建一个file节点，同时创建一个eventpoll结构体，结构体中有两个重要的成员：rbr是一棵红黑树，用于存放epoll_ctl注册的socket和事件；rdllist是一条双向链表，用于存放准备就绪的事件供epoll_wait调用。调用epoll_ctl：会检测rbr中是否已经存在节点，有就返回，没有则新增，同时会向内核注册回调函数ep_poll_callback，当有事件中断来临时，调用回调函数向rdllist中插入数据，epoll_ctl也可以增删改事件。调用epoll_wait：返回或者判断rdllist中的数据即可。epoll两种工作模式：LT--水平触发 ET--边缘触发

LT：只要文件描述符还有数据可读，每次 epoll_wait都会返回它的事件，提醒用户程序去操作。

ET：检测到有IO事件时，通过epoll_wait调用会得到有事件通知的文件描述符，对于每一个被通知的文件描述符，必须将该文件描述符一直读到空，让errno返回EAGAIN为止，否则下次的epoll_wait不会返回余下的数据，会丢掉事件。

ET比LT更加高效，因为ET只通知一次，而LT会通知多次，LT可能会充斥大量不关心的就绪文件描述符。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/db/redis/io-4.png')" alt="wxmp">


## epoll总结：

使用红黑树而不是数组存放描述符和事件，增删改查非常高效，轻易可处理大量并发连接。红黑树及双向链表都在内核cache中，避免拷贝开销。采用回调机制，事件的发生只需关注rdllist双向链表即可。

## 参考文章
* https://www.cnblogs.com/gxyandwmm/p/13056487.html