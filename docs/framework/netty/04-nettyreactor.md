---
title: Netty-Reactor模式总结
---

::: tip
本文主要是介绍 Netty-Reactor模式总结 。
:::

[[toc]]

## Netty 线程模型与Reactor 模式

### 前言

​    Netty 的线程模型是基于NIO的Selector 构建的，使用了异步驱动的Reactor 模式来构建的线程模型，可以很好的支持成百上千的 SocketChannel 连接。由于 READ/WRITE 都是非阻塞的，可以充分提升I/O线程的运行效率 ，避免了IO阻塞导致线程挂起， 同时可以让一个线程支持对多个客户端的连接SocketChannel的 READ/WRITE 操作， 从根本上解决了传统阻塞IO的一线程处理一连接的弊端。



### 高效率的Reactor模式

Reactor 模式 

> ```
> 是一种为处理服务请求并发,提交到一个或者多个服务处理程序的事件设计模式。当请求抵达后，服务处理程序使用解多路分配策略，然后同步地派发这些请求至相关的请求处理程序
> （来自维基百科：https://zh.wikipedia.org/wiki/反应器模式）
> ```

常见的reactor模式有以下三种

1. 单线程reactor
2. 多线程reactor
3. 主从reactor

 

### 1、单线程reactor

ractor 单线程模式是指所有的I/O操作都在一个NIO线程完成，该线程的职责：

1.作为NIO服务端，接收客户端TCP连接

2.作为NIO客户端，向客户端发送TCP连接

3.READ/WRITE 客户端的请求

 

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/framework/netty/nettyreactor-1.png')" alt="wxmp">




不过单线程的reactor 模式无法发挥多核的优势，因此对于高并发量的系统仍然存在瓶颈，主要原因如下：

 

1、reactor 线程既要处理来自客户端的连接，又要处理READ/WRITE/编码/解码。即便cpu 100% 也难以满足实际场景的需求

 

多线程Reactor 解决了这些问题

 

### 2、多线程reactor模型

reactor 多线程的实现最大的区别是拥有一个专门用来处理实际I/O 操作是线程池

优点：

1、拥有一个Acceptor 专门用来监听请求的I/O 类型

2、使用专门线程池可以提高acceptor的并发量，并且可以将同一个SocketChannel 放于同一个I/O 线程处理，同一个I/O线程可以处理多个SocketChannel的READ/WRITE事件

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/framework/netty/nettyreactor-2.png')" alt="wxmp">

 

 

 

在大部分场景，该线程模型都能处理，但存在这样一种场景：单个Acceptor 线程 可能会因为需要监听大量的 SocketChannel 连接 或 I/O事件处理或在建立建立时需要进行安全的握手认证、黑白名单过滤，而导致出现性能瓶颈。所以这种场景下，单独一个Accceptor 会导致性能不足，便出现了第三种线程模型，主从Reactor 模型

 

### 3、主从reactor 多线程模型

相比多线程reactor模型，主从reactor多线程模型拥有了一个独立处理 SocketChannel 连接的线程池，当客户端从Acceptor建立连接之后，便将该连接绑定到subreactor 线程池中的某个线程中，然后由该线程绑定客户端感兴趣的I/O事件（READ/WRITE），监听客户端连接请求，最后处理。

mainReactor : 监听 ServerSocketChannel 、建立与 SocketChannel 的连接、将完成建立连接之后的Socket 交给subReactor

subReactor : 监听SocketChannel的 I/O事件，完成编解码、相应的业务处理（默认为CPU个数）

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/framework/netty/nettyreactor-3.png')" alt="wxmp">

 

 

## reactor线程模型案例
Netty的线程模型可以通过配置不同参数实现不同reactor的线程模型（netty4版本未发现多线程reactor版本实现方式）

### 1、单线程reactor代码案例




``` java
NioEventLoopGroup loopGroup = new NioEventLoopGroup(1);
ServerBootstrap b = new ServerBootstrap();
b.group(loopGroup, loopGroup)
        .channel(NioServerSocketChannel.class)
        .handler(new LoggingHandler(LogLevel.DEBUG))
        .childHandler(new ChannelInitializer<Channel>() {
            @Override
            protected void initChannel(Channel ch) throws Exception {
                // xxx
            }
        });
try {
    ChannelFuture future = b.bind(8086).sync();
    future.channel().closeFuture().sync();
} catch (InterruptedException e) {
    e.printStackTrace();
} finally {
    loopGroup.shutdownGracefully().sync();
}
```



### 2、主从reactor代码案例

 


``` java
NioEventLoopGroup mainGroup = new NioEventLoopGroup(1);
NioEventLoopGroup subGroup = new NioEventLoopGroup(Runtime.getRuntime().availableProcessors());
ServerBootstrap b = new ServerBootstrap();
b.group(mainGroup, subGroup)
        .channel(NioServerSocketChannel.class)
        .handler(new LoggingHandler(LogLevel.DEBUG))
        .childHandler(new ChannelInitializer<Channel>() {
            @Override
            protected void initChannel(Channel ch) throws Exception {
                // xxx
            }
        });
 
try {
    ChannelFuture future = b.bind(8086).sync();
    future.channel().closeFuture().sync();
} catch (InterruptedException e) {
    e.printStackTrace();
} finally {
    mainGroup.shutdownGracefully().sync();
    subGroup.shutdownGracefully().sync();
}
```




## 线程模型代码总结 

### NioEventLoop 与 NioEventLoopGroup 介绍

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/framework/netty/nettyreactor-4.png')" alt="wxmp">

 

1、NioEventLoopGroup 是通过实现JUC 包相关线程池的接口来达到自定义线程池的目的，而NioEventLoop 则持有一个线程，用来处理SocketChannel 建立连接之后的I/O事件。

2、在初始化 NioEventLoopGroup 时，将初始化一定数量 NioEventLoop，并将这些初始化之后的 NioEventLoops 的引用交给NioEventLoopGroup 管理

3、由接口的实现可以看出，他们都是实现了juc 线程池的顶层接口 Executor，因此都具有公共的 execute（Runable command）及 submit(Runable task) 方法，那么这些通用的方法将为 NioEventLoopGroup 把任务交给 子的NioEventLoop处理提供标准及便利



``` java
//轮询一个子的 NioEventLoop 进行提交处理
@Override
public Future<?> submit(Runnable task) {
    return next().submit(task);
}
......
@Override
public void execute(Runnable command) {
    next().execute(command);
}
```


### Netty 具体线程模

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/framework/netty/nettyreactor-5.png')" alt="wxmp">

 

### 从整个线程模型来看 相关组件之间的是如何相互协作的

 

1、初始化NioEventLoopGroup , 将为ServerSocketChannel 提供一个 bossGroup 线程池，为 SockerChannel 的I/O 事件处理 提供一个workGroup

2、使用ServerBootstrap 绑定端口等相关信息，此时会初始化一个ServerSocketChannel 和 bossGroup，并且将 ServerSocketChannel 绑定到 bossGroup 中的一个NioEventLoop 中进行监听客户端的连接请求

3、当 Client 发起连接请求时，首先经过三次握手通过后，然后服务端被触发，接着收到连接成功的通知（因为是异步所以是触发）

4、ServerSocketChannel 收到连接成功的通知后，将建立好的连接交给 workGroup中的某个NioEventLoop，然后将感兴趣的事件注册到 该 NioEventLoop 持有的Selector上，等待Client 下一次请求

5、当 Client 发起 READ/WRITE 相关的请求时，则提交给NioEventLoop 进行处理 

 

参考：

http://gee.cs.oswego.edu/dl/cpjslides/nio.pdf

## 参考文章
* https://www.cnblogs.com/coding400/p/10865333.html