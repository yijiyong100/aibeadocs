---
title: Netty-入门介绍
---

::: tip
本文主要是介绍 Netty-入门知识总结 。
:::

[[toc]]

## Netty 入门介绍

## 为什么使用Netty

Netty是业界最流行的NIO框架之一，它的健壮性、功能、性能、可定制性、可扩展性在同类框架中都是首屈一指的，它已经得到了成百上千的商用项目的证明。对于为什么使用Netty这个话题，我们先看一下使用原生的NIO有什么缺点：

### NIO缺点
- NIO的类库和API繁杂，使用麻烦，需要熟练掌握Selector、ServerSocketChannel、SocketChannel、ByteBuffer等，这就像我们会使用Hibernate、MyBatis这些ORM框架而不会直接使用Connection、Statement一样
- 需要其他额外技能作为铺垫，必须对多线程和网络编程非常熟悉才能写出高质量的NIO程序
- 可靠性能力补齐，工作量和难度都非常大，例如客户端面临断线重连、网络闪断、半包读写、失败缓存、网络拥塞、异常码流等问题的处理
- JDK NIO的BUG，例如著名的epoll bug，该问题会导致Selector空轮训，最终导致CPU 100%

也正是因为有种种缺点，因此不建议使用原生的NIO而是建议使用一些比较成熟的NIO框架例如Netty、Mina，这一系列文章讲的是Netty，Netty作为一款高性能NIO框架，其优点总结有：
## netty NIO框架优点
- API使用简单、开发门槛低
- 功能强大，预置了多种编码解码功能，支持多种主流协议
- 定制能力强，可以通过ChannelHandler对通信框架进行灵活扩展
- 性能高，与业界其他主流NIO框架对比，Netty性能最优
- 成熟、稳定，Netty修复了已经发现的所有JDK NIO的BUG，业务开发人员不需要再为NIO的BUG而烦恼
- 社区活跃、版本迭代周期短，发现的BUG可以被及时修复，同时，更多的新功能会被加入
- 经历了大规模的商业应用考验，质量得到验证

正因为这些优点，Netty逐渐成为了Java NIO变成的首选框架。

 

## Netty入门Demo

下面演示一下Netty的Demo（注：Demo来自Netty权威指南第三章），本文只写代码与演示结果，不做讲解，对Netty的使用基本讲解放在下一篇文章中，循序渐进，先感性地认识Netty，再理性地认识Netty中的东西。

提一下，本文及之后的文章Netty基于**5.0.0.Alpha1**这个版本，贴一下我自己的Maven配置吧：

### 配置xml文件

``` xml
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
      <modelVersion>4.0.0</modelVersion>

      <groupId>org.xrq.netty</groupId>
      <artifactId>netty-test</artifactId>
      <version>1.0.0</version>
      <packaging>jar</packaging>


      <properties>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
      </properties>

      <dependencies>
        <dependency>
              <groupId>junit</groupId>
              <artifactId>junit</artifactId>
              <version>4.11</version>
              <scope>test</scope>
        </dependency>
        <dependency>
            <groupId>io.netty</groupId>
            <artifactId>netty-all</artifactId>
            <version>5.0.0.Alpha1</version>
        </dependency>
        <dependency>
            <groupId>org.slf4j</groupId>
            <artifactId>slf4j-api</artifactId>
            <version>1.7.25</version>
        </dependency>
        <dependency>
            <groupId>ch.qos.logback</groupId>
            <artifactId>logback-classic</artifactId>
            <version>1.2.3</version>
        </dependency>
      </dependencies>
      
</project>
```



首先从服务端代码开始，定义一个TimeServer：

### netty服务端代码入门案例


``` java
 1 public class TimeServer {
 2 
 3     public void bind(int port) throws Exception {
 4         // NIO线程组
 5         EventLoopGroup bossGroup = new NioEventLoopGroup();
 6         EventLoopGroup workerGroup = new NioEventLoopGroup();
 7         
 8         try {
 9             ServerBootstrap b = new ServerBootstrap();
10             b.group(bossGroup, workerGroup)
11                 .channel(NioServerSocketChannel.class)
12                 .option(ChannelOption.SO_BACKLOG, 1024)
13                 .childHandler(new ChildChannelHandler());
14             
15             // 绑定端口，同步等待成功
16             ChannelFuture f = b.bind(port).sync();
17             // 等待服务端监听端口关闭
18             f.channel().closeFuture().sync();
19         } finally {
20             // 优雅退出，释放线程池资源
21             bossGroup.shutdownGracefully();
22             workerGroup.shutdownGracefully();
23         }
24     }
25     
26     private class ChildChannelHandler extends ChannelInitializer<SocketChannel> {
27         @Override
28         protected void initChannel(SocketChannel arg0) throws Exception {
29             arg0.pipeline().addLast(new TimeServerHandler());
30         }
31     }
32     
33 }
```



TimeServerHandler这么定义：



``` java
 1 public class TimeServerHandler extends ChannelHandlerAdapter {
 2 
 3     @Override
 4     public void channelRead(ChannelHandlerContext ctx, Object msg) throws Exception {
 5         ByteBuf buf = (ByteBuf)msg;
 6         byte[] req = new byte[buf.readableBytes()];
 7         buf.readBytes(req);
 8         
 9         String body = new String(req, "UTF-8");
10         System.out.println("The time server receive order:" + body);
11         String currentTime = "QUERY TIME ORDER".equalsIgnoreCase(body) ? new Date(System.currentTimeMillis()).toString() : "BAD ORDER";
12         
13         ByteBuf resp = Unpooled.copiedBuffer(currentTime.getBytes());
14         ctx.write(resp);
15     }
16     
17     @Override
18     public void channelReadComplete(ChannelHandlerContext ctx) throws Exception {
19         ctx.flush();
20     }
21     
22     @Override
23     public void exceptionCaught(ChannelHandlerContext ctx, Throwable cause) throws Exception {
24         ctx.close();
25     }
26     
27 }
```



即读取来自客户端的数据，如果是"QUERY TIME ORDER"，则把当前时间写到Channel中去。至此，Netty服务端代码已经开发完毕。接下来是Netty客户端代码，首先还是TimeClient：

### netty客户端代码入门案例


``` java
 1 public class TimeClient {
 2 
 3     public void connect(int port, String host) throws Exception {
 4         EventLoopGroup group = new NioEventLoopGroup();
 5         try {
 6             Bootstrap b = new Bootstrap();
 7             
 8             b.group(group)
 9                 .channel(NioSocketChannel.class)
10                 .option(ChannelOption.TCP_NODELAY, true)
11                 .handler(new ChannelInitializer<SocketChannel>() {
12                     protected void initChannel(SocketChannel ch) throws Exception {
13                         ch.pipeline().addLast(new TimeClientHandler());
14                     };
15                 });
16             
17             // 发起异步连接操作
18             ChannelFuture f = b.connect(host, port).sync();
19             // 等待客户端连接关闭
20             f.channel().closeFuture().sync();
21         } finally {
22             // 优雅退出，释放NIO线程组
23             group.shutdownGracefully();
24         }
25     }
26     
27 }
```



同样的，定义一个TimeClientHandler：



``` java
 1 public class TimeClientHandler extends ChannelHandlerAdapter {
 2 
 3     private static final Logger LOGGER = LoggerFactory.getLogger(TimeClientHandler.class);
 4     
 5     private final ByteBuf firstMessage;
 6     
 7     public TimeClientHandler() {
 8         byte[] req = "QUERY TIME ORDER".getBytes();
 9         firstMessage = Unpooled.buffer(req.length);
10         firstMessage.writeBytes(req);
11     }
12     
13     @Override
14     public void channelActive(ChannelHandlerContext ctx) throws Exception {
15         ctx.writeAndFlush(firstMessage);
16     }
17     
18     @Override
19     public void channelRead(ChannelHandlerContext ctx, Object msg) throws Exception {
20         ByteBuf buf = (ByteBuf)msg;
21         byte[] req = new byte[buf.readableBytes()];
22         buf.readBytes(req);
23         
24         String body = new String(req, "UTF-8");
25         System.out.println("Now is:" + body);
26     }
27     
28     @Override
29     public void exceptionCaught(ChannelHandlerContext ctx, Throwable cause) throws Exception {
30         LOGGER.warn("Unexcepted exception from downstream:" + cause.getMessage());
31         ctx.close();
32     }
33     
34 }
```



客户端的操作为打印来自服务端的数据，这样，整个Netty Demo代码就写完了，结构比较清楚，都是一个Server+一个Handler的模式，Handler用于处理读取到的信息。

 

### 运行Demo

上面写完了Demo，接着写一下测试代码，很简单，分别运行bind方法和connect方法即可：



``` java
 1 public class CoreTest {
 2 
 3     @Test
 4     public void timeServerTest() throws Exception {
 5         new TimeServer().bind(8080);
 6     }
 7     
 8     @Test
 9     public void timeClientTest() throws Exception {
10         new TimeClient().connect(8080, "127.0.0.1");
11     }
12     
13 }
```



先运行timeServerTest让服务端先启动，再运行timeClientServer让客户端后启动，运行结果服务端的打印为：

```
The time server receive order:QUERY TIME ORDER
```

结合代码可以看到，服务端读取到了来自客户端的数据，数据内容为"QUERY TIME ORDER"，接着服务端取自己的时间，传输给客户端，看一下客户端的打印：

```
Now is:Thu Apr 05 21:07:39 CST 2018
```

打印了来自服务端的时间，这样，利用Netty进行服务端+客户端的相互通信的Demo完成，有了这个Demo，对Netty有了感性上的认识，接着我们一点一点深入去学习Netty。



## 参考文章
* https://www.cnblogs.com/xrq730/p/8723728.html