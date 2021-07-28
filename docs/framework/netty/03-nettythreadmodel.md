---
title: Netty-线程模型总结
---

::: tip
本文主要是介绍 Netty-线程模型总结 。
:::

[[toc]]

## 深入了解Netty 线程模型

### 引言

不同的线程模型对程序的性能有很大的影响，Netty是建立在Reactor模型的基础上，要搞清Netty的线程模型，需要了解一目前常见线程模型的一些概念。 具体是进程还是线程，是和平台或者编程语言相关，本文为了描述方便，以线程描述。 目前存在的线程模型有：

- 传统阻塞IO服务模型
- Reactor模型
- Proactor模型

### 1、传统阻塞IO服务模型

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/framework/netty/nettythread-1.png')" alt="wxmp">


采用阻塞IO模型获取输入的数据。 每个连接需要独立的完成数据的输入，业务的处理，数据返回。 当并发数大的时候，会创建大量的线程，占用系统资源，如果连接创建后，当前线程没有数据可读，会阻塞，造成线程资源浪费。

### 2、Reactor模型

IO多路复用 线程池 = Reactor模型 

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/framework/netty/nettythread-2.png')" alt="wxmp">

根据Reactor的数量和处理线程的数量，Reactor模型分为三类：

- 单Reactor单线程
- 单Reactor多线程
- 主从Reactor多线程

下面分别描述。

#### 2.1、单Reactor单线程

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/framework/netty/nettythread-3.png')" alt="wxmp">

图中：

- Reactor中的select模块就是IO多路复用模型中的选择器，可以通过一个阻塞对象监听多路连接请求。
- Reactor对象通过Select监控客户端请求事件，收到事件后，通过Dispatch进行分发。
- 如果是`建立连接`事件，则用Acceptor通过Accept处理连接请求，然后创建一个Handler对象，处理连接完成后的业务处理。
- 如果不是建立连接事件，则Reactor会分发调用连接对应的Handler处理。
- Handler会处理Read-业务-Send流程。

这种模型，在客户端数量过多时，会无法支撑。因为只有一个线程，无法发挥多核CPU性能，且Handler处理某个连接的业务时，服务端无法处理其他连接事件。 以前在学习Redis原理的时候，发现它内部就是这种模型：[深入了解Redis【十二】Reactor事件模型在Redis中的应用](https://www.clawhub.club/posts/2019/10/16/深入了解Redis/深入了解Redis【十二】Reactor事件模型在Redis中的应用/)

#### 2.2、单Reactor多线程

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/framework/netty/nettythread-4.png')" alt="wxmp">

图中多线程体现在两个部分：

- Reactor主线程 Reactor通过select监听客户请求，如果是`连接请求`事件，则由Acceptor处理连接，如果是其他请求，则由dispatch找到对应的Handler,这里的Handler只负责响应事件，读取和响应，会将具体的业务处理交由Worker线程池处理。
- Worker线程池 Worker线程池会分配独立线程完成真正的业务，并将结果返回给Handler，Handler收到响应后，通过send将结果返回给客户端。

这里Reactor处理所有的事件监听和响应，高并发情景下容易出现性能瓶颈。

#### 2.3、主从Reactor多线程

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/framework/netty/nettythread-5.png')" alt="wxmp">

这种模式是对单Reactor的改进，由原来单Reactor改成了Reactor主线程与Reactor子线程。

- Reactor主线程的MainReactor对象通过select监听`连接事件`，收到事件后，通过Acceptor处理连接事件。
- 当Acceptor处理完连接事件之后，MainReactor将连接分配给SubReactor。
- SubReactor将连接加入到连接队列进行监听，并创建handler进行事件处理。
- 当有新的事件发生时，SubReactor就会调用对应的handler处理。
- handler通过read读取数据，交由Worker线程池处理业务。
- Worker线程池分配线程处理完数据后，将结果返回给handler。
- handler收到返回的数据后，通过send将结果返回给客户端。
- MainReactor可以对应多个SubReactor。

这种优点多多，各个模块各司其职，缺点就是实现复杂。

### 3、Proactor模型

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/framework/netty/nettythread-6.png')" alt="wxmp">

Proactor模型在理论上是比Reactor模型性能更好，但是因为依赖于操作系统的非阻塞异步模型，而linux的非阻塞异步模型还不完善，所以还是以Reactor为主。

### 总结

在学习这一部分知识的时候，想到redis中Reactor的应用，又想到了以前分析Tomcat源码时，其内部就是这种Reactor的思想。 突然感觉被我发现了一个天大的秘密：技术原理是通用的！

## 参考文章
* https://www.yht7.com/news/7974