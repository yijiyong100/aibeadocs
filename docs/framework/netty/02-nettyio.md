---
title: Netty-IO模型总结
---

::: tip
本文主要是介绍 Netty-IO模型总结 。
:::

[[toc]]

## 深入了解Netty IO模型
------

### 引言

IO模型就是操作数据输入输出的方式，在Linux系统中有5大IO模型：阻塞式IO模型、非阻塞式IO模型、IO复用模型、信号驱动式IO模型、异步IO模型。 因为学习Netty必不可少的要了解IO多路复用模型，本篇是基础。

### 名词概念

- 阻塞：指向调用方，在调用结果返回之前，调用方线程会挂起，直到结果返回。
- 非阻塞：指向调用方，在调用结果返回之前，调用方线程会处理其他事情，不会阻塞。
- 同步：指向被调用方，被调用方得到结果后再返回给调用方。
- 异步：指向被调用方，被调用方先应答调用方，然后计算结果，最终通知并返回给调用方。
- recvfrom函数：系统调用，经socket接收数据。

### 5种IO模型

#### 1、阻塞式IO模型(blocking I/O)

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/framework/netty/nettyio-1.png')" alt="wxmp">

进程调用recvfrom函数，在数据没有返回之前，进程阻塞，直到数据返回后，才会处理数据。

#### 2、非阻塞式IO模型(non-blocking I/O)

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/framework/netty/nettyio-2.png')" alt="wxmp">

进程调用recvfrom函数，如果数据没有准备好就返回错误提示，之后进程循环调用recvfrom函数，直到有数据返回。

#### 3、IO复用模型(I/O multiplexing)

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/framework/netty/nettyio-3.png')" alt="wxmp">

进程调用select,如果没有套接字变为可读，则阻塞，直到有可读套接字之后，调用recvfrom函数，返回结果。

#### 4、信号驱动式IO模型(signal-driven I/O)

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/framework/netty/nettyio-4.png')" alt="wxmp">

进程先注册信号驱动，之后进程不阻塞，当数据准备好后，会给进程返回信号提示，这时进程调用ecvfrom函数，返回数据。

#### 5、异步IO模型(asynchronous I/O)

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/framework/netty/nettyio-5.png')" alt="wxmp">

由POSIX规范定义，应用程序告知内核启动某个操作，并让内核在整个操作（包括将数据从内核拷贝到应用程序的缓冲区）完成后通知应用程序。这种模型与信号驱动模型的主要区别在于：信号驱动I/O是由内核通知应用程序何时启动一个I/O操作，而异步I/O模型是由内核通知应用程序I/O操作何时完成。

### IO模型对比

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/framework/netty/nettyio-6.png')" alt="wxmp">

阻塞越少，理论上性能也越优。

- 阻塞式IO，每个连接要对应一个线程单独处理，浪费资源。
- 非阻塞式IO，需要不断的轮询，也耗费CPU资源。
- 信号驱动式IO,在大量IO操作时会有信号队列溢出，且对于TCP而言，通知条件过多，每一个进行判断会消耗资源。
- 异步IO,理论最优，但是目前Linux支持还不是很完善。

因此在Linux下网络编程都以IO复用模型为主。

## 参考文章
* https://www.yht7.com/news/7975