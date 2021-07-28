---
title: Netty-SpringBoot案例1
---

::: tip
本文主要是介绍 Netty-SpringBoot案例1 。
:::

[[toc]]

## SpringBoot+Netty+WebSocket实现实时通信

这篇随笔暂时不讲原理，首先搭建起一个简单的可以实现通信的Demo。之后的一系列随笔会进行一些原理上的分享。

不过在这之前大家最好了解一下Netty的线程模型和NIO编程模型，会对它的整体逻辑有所了解。

## pom文件引入netty依赖
首先创建好项目后在pom.xml引入Netty依赖**

``` xml
<dependency>
            <groupId>io.netty</groupId>
            <artifactId>netty-all</artifactId>
</dependency>
```

 

用Netty搭建一个WebSocket服务器整体上需要三样东西，不管是不是用的SpringBoot框架，这三样东西是必不可少的。

1.启动服务器的类（NettyServer），会进行一些初步的配置工作。

2.助手类（Handler），有自己定义的助手类，也有Netty提供的一些基本的助手类，比如对Http、WebSocket支持的助手类。

3.初始化器（Initializer），我们下面使用的是主从线程模型，从线程组里会分配出不同channel去处理不同客户端的请求，而每个channel里就会有各种助手类去实现一些功能。初始化器的作用就是对各种助手类进行绑定。

 

## 服务器启动类：

 



``` java
public class NettyServer {
    private static int port;

    public NettyServer(int port) {
        this.port = port;
    }
    public static void start() throws InterruptedException {//在main方法里调用这个方法，并用构造函数设置端口号
        //创建主线程组，接收请求
        EventLoopGroup bossGroup = new NioEventLoopGroup();
        //创建从线程组，处理主线程组分配下来的io操作
        EventLoopGroup workerGroup = new NioEventLoopGroup();
        //创建netty服务器
        try {
            ServerBootstrap serverBootstrap = new ServerBootstrap();
            serverBootstrap.group(bossGroup, workerGroup)//设置主从线程组
                    .channel(NioServerSocketChannel.class)//设置通道
                    .childHandler(new NettyServerInitializer());//子处理器，用于处理workerGroup中的操作
            //启动server
            ChannelFuture channelFuture = serverBootstrap.bind(port).sync();
            //监听关闭channel
            channelFuture.channel().closeFuture().sync();
        } finally {
            bossGroup.shutdownGracefully();//关闭主线程
            workerGroup.shutdownGracefully();//关闭从线程
        }
    }
}
```



 

 

## 初始化器：

 



``` java
public class NettyServerInitializer extends ChannelInitializer<SocketChannel> {
    @Override
    protected void initChannel(SocketChannel socketChannel) throws Exception {
        ChannelPipeline pipeline= socketChannel.pipeline();
        //以下三个是Http的支持
        //http解码器
        pipeline.addLast(new HttpServerCodec());
        //支持写大数据流
        pipeline.addLast(new ChunkedWriteHandler());
        //http聚合器
        pipeline.addLast(new HttpObjectAggregator(1024*62));
        //websocket支持,设置路由
        pipeline.addLast(new WebSocketServerProtocolHandler("/ws"));
        //添加自定义的助手类
        pipeline.addLast(new NettyHandler());
    }
}
```



 

 

## 自定义助手类：

这个类就是业务的核心，客户端的请求会在这里处理。比如客户端连接、客户端发送消息、给客户端发送消息等等。

自定义助手类需要重写的方法可以根据自己的需求重写，这里就不把每个方法都重写一遍了，完整的大家可以去找找文档看看。

如果需要在助手类中用到@Autowire注解，可以参考这个博客，网上有很多说明，这里就不再重复了https://blog.csdn.net/weixin_30828379/article/details/95009595

 



``` java
public class NettyHandler extends SimpleChannelInboundHandler<TextWebSocketFrame> {//TextWebSocketFrame是netty用于处理websocket发来的文本对象
　　//所有正在连接的channel都会存在这里面，所以也可以间接代表在线的客户端
    public static ChannelGroup channelGroup = new DefaultChannelGroup(GlobalEventExecutor.INSTANCE);
　　//在线人数
    public static int online;
    //接收到客户都发送的消息
    @Override
    public void channelRead0(ChannelHandlerContext ctx, TextWebSocketFrame msg) throws Exception {
        SendAllMessages(ctx,send_message);//send_message是我的自定义类型，前后端分离往往需要统一数据格式，可以先把对象转成json字符串再发送给客户端
    }
    //客户端建立连接
    @Override
    public void handlerAdded(ChannelHandlerContext ctx) throws Exception {
        channelGroup.add(ctx.channel());
        online=channelGroup.size();
        System.out.println(ctx.channel().remoteAddress()+"上线了!");
    }
    //关闭连接
    @Override
    public void handlerRemoved(ChannelHandlerContext ctx) throws Exception {
        channelGroup.remove(ctx.channel());
        online=channelGroup.size();
        System.out.println(ctx.channel().remoteAddress()+"断开连接");
    }

    //出现异常
    @Override
    public void exceptionCaught(ChannelHandlerContext ctx, Throwable cause) throws Exception {
        cause.printStackTrace();
    }

    //给某个人发送消息
    private void SendMessage(ChannelHandlerContext ctx, Send_Message msg) {
        ctx.channel().writeAndFlush(new TextWebSocketFrame(JSON.toJSONString(msg)));
    }

    //给每个人发送消息,除发消息人外
    private void SendAllMessages(ChannelHandlerContext ctx,Send_Message msg) {
        for(Channel channel:channelGroup){
            if(!channel.id().asLongText().equals(ctx.channel().id().asLongText())){
                channel.writeAndFlush(new TextWebSocketFrame(JSON.toJSONString(msg)));
            }
        }
    }
}
```



 

 

 

 
## 前端创建WebSocket对象进行访问

通过socket就可以用一些api进行发送消息，接收消息的操作。然后把接收的数据按各自的需求展示出来就行了，前端部分就不再赘述了。

下面8088端口记得要在main方法里面设置。

 



``` java
if (window.WebSocket) {
        var host = window.location.hostname;
        var url = "ws://" + host + ":8088/ws";
        var socket = new WebSocket(url);
}else{
     alert("你的浏览器不支持WebSocket。请不要使用低版本的IE浏览器。");   
}
```



## 参考文章
* https://www.cnblogs.com/lbhym/p/12497212.html