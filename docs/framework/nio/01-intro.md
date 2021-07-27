---
title: Java-常用NIO框架介绍
---

::: tip
本文主要是介绍 Java-常用NIO框架介绍 。
:::

[[toc]]

## NIO

**全称是Non-Blocking IO或New IO，也就是非阻塞IO或新版IO。**

### NIO的特性如下：

**1.面向缓冲区(Buffer)：每个Buffer 实质上是一个容器对象
 \**每一种基本 Java 类型都对应一种缓冲区类型：
 ByteBuffer——byte
 CharBuffer——char
 ShortBuffer——short
 IntBuffer——int
 LongBuffer——long
 FloatBuffer——float
 DoubleBuffer——double\**
 2.选择器(Selectors)：选择器用于监听多个管道的事件，使用传统的阻塞时可以方便的知道什么时候可以进行读写，而使用非阻塞通道，选择器可以让我们知道什么时候通道准备好了
 3.非阻塞模式
 4.管道(Channel)：管道实际上就像传统IO中的流，到任何目的地(或来自任何地方)的所有数据都必须通过一个 Channel 对象。**

## NIO和BIO的区别

**1.BIO是面向流，NIO是面向块(缓冲区)**
 IO面向流的操作一次一个字节地处理数据。一个输入流产生一个字节的数据，一个输出流消费一个字节的数据。，导致了数据的读取和写入效率不佳；
 NIO面向块的操作在一步中产生或者消费一个数据块。按块处理数据比按(流式的)字节处理数据要快得多，同时数据读取到一个它稍后处理的缓冲区，需要时可在缓冲区中前后移动。这就增加了处理过程中的灵活性。通俗来说，NIO采取了“预读”的方式，当你读取某一部分数据时，会猜测你下一步可能会读取的数据而预先缓冲下来。
 **2.BIO是阻塞的，NIO是非阻塞的。**
 传统的IO中一个线程调用`read()` 或`write()`时，该线程被阻塞，直到有一些数据被读取，或数据完全写入。线程在此期间不能再干任何事情了。
 而对于NIO，使用一个线程发送读取数据请求，没有得到响应之前，线程是空闲的，此时线程可以去执行别的任务，而不是像IO中那样只能等待响应完成。

## 拓展：JDK1.7引入了AIO

**简单来说
 BIO:同步阻塞IO
 NIO:同步非阻塞IO
 AIO:异步阻塞IO**

## 适用场景

**BIO：适用于连接数目比较小且固定的架构，这种方式对服务器资源要求比较高，并发局限于应用中。比如：文件的上传下载
 NIO：适用于连接数目多且连接比较短（轻操作）的架构，比如聊天服务器，并发局限于应用中，编程比较复杂
 AIO：使用于连接数目多且连接比较长（重操作）的架构，比如相册服务器，充分调用OS参与并发操作，编程比较复杂。**

## 目前常见的NIO框架

## 1.Netty(主流版本为4.1)

**Netty是一个NIO客户端服务器框架，是一个提供异步的、事件驱动的网络应用程序框架和工具，用以快速开发高性能、高可靠性的网络服务器和客户端程序。可以快速轻松地开发协议服务器和客户端等网络应用程序。
 Github地址：https://github.com/netty/netty
 官网：https://netty.io/
 开发文档：https://netty.io/wiki/user-guide-for-4.x.html
 API文档：https://netty.io/4.1/api/index.html**

**Netty极大地简化并简化了TCP和UDP套接字服务器等网络编程。具有丰富的协议，如FTP，SMTP，HTTP以及各种二进制和基于文本的传统协议。因此，Netty实现易于开发，性能，稳定性和灵活性的方法。**

### Netty服务框架：

**Netty是典型的Reactor模型结构，其中常用的Reactor线程模型有三种，
 分别为：
 Reactor单线程模型
 Reactor多线程模型
 主从Reactor多线程模型**

### Netty架构图

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/framework/nio/intro-1.png')" alt="wxmp">


image.png

### 中文版：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/framework/nio/intro-2.png')" alt="wxmp">


image.png

### 使用场景

**1.分布式服务框架 Dubbo 的 RPC 框架使用 Dubbo 协议进行节点间通信，Dubbo 协议默认使用 Netty 作为基础通信组件，用于实现各进程节点之间的内部通信。
 2.消息中间件 RocketMQ 的消息生产者和消息消费者之间，也采用 Netty 进行高性能、异步通信。
 3.Hadoop 的高性能通信和序列化组件 Avro 的 RPC 框架，默认采用 Netty 进行跨节点通信，它的 Netty Service 基于 Netty 框架二次封装实现。
 4.在游戏行业也是使用Netty实现各种服务器之间的通信**

### Netty高性能原理和框架架构解析可以参考

**https://www.cnblogs.com/imstudy/p/9908791.html**

## 2.Mina

**Apache Mina Server 是一个网络通信应用框架，通过Java nio技术基于TCP/IP和UDP/IP协议提供了抽象的、事件驱动的、异步的API。也就是说，它主要是对基于TCP/IP、UDP/IP协议栈的通信框架（当然，也可以提供JAVA 对象的序列化服务、虚拟机管道通信服务等），帮助我们快速开发高性能、高扩展性的网络通信应用，并且提供了事件驱动、异步操作的编程模型。
 Github地址：https://github.com/apache/mina
 官网：https://mina.apache.org/
 开发文档：https://mina.apache.org/mina-project/documentation.html
 API文档：https://mina.apache.org/mina-project/apidocs/index.html**

### 需要深入了解Mina可以参考：

**https://www.cnblogs.com/duanxz/p/5143227.html**

## 3.Grizzly

**Grizzly是一种应用程序框架，专门解决编写成千上万用户访问服务器时候产生的各种问题。使用JAVA NIO作为基础，并隐藏其编程的复杂性。容易使用的高性能的API。带来非阻塞socketd到协议处理层。利用高性能的缓冲和缓冲管理使用高性能的线程池。
 Github地址：https://github.com/javaee/grizzly
 官网：https://javaee.github.io/grizzly/
 开发文档：https://javaee.github.io/grizzly/documentation.html**

### 设计理念：

**Grizzly NIO框架的设计初衷便是帮助开发者更好地利用Java NIO API，构建强大的可扩展的服务器应用，并提供扩展框架的组件：Web框架（HTTP/S）、WebSocket、Comet等。**

### Grizzly体系结构图

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/framework/nio/intro-3.png')" alt="wxmp">


image.png

### Grizzly体系结构理解可以参考：

**https://blog.csdn.net/a_dreaming_fish/article/details/50468607**



作者：意识流丶
链接：https://www.jianshu.com/p/8e594959249e
来源：简书
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

## 参考文章
* https://www.jianshu.com/p/8e594959249e