---
title: Netty-SpringBoot案例3
---

::: tip
本文主要是介绍 Netty-SpringBoot案例3 。
:::

[[toc]]

## 在SpringBoot中整合使用Netty框架

## 在SpringBoot中整合使用Netty框架 
官方文档
https://springboot.io/t/topic/2103

Netty是一个非常优秀的Socket框架。如果需要在SpringBoot开发的app中，提供Socket服务，那么Netty是不错的选择。

Netty与SpringBoot的整合，我想无非就是要整合几个地方

- 让netty跟springboot生命周期保持一致，同生共死
- 让netty能用上ioc中的Bean
- 让netty能读取到全局的配置

## 整合Netty，提供WebSocket服务

这里演示一个案例，在SpringBoot中使用Netty提供一个Websocket服务。

> servlet容器本身提供了websocket的实现，但这里用netty的实现 💖

### 添加依赖

```xml
<dependency>
	<groupId>io.netty</groupId>
	<artifactId>netty-all</artifactId>
</dependency>
```

是的，不用声明版本号。因为 **spring-boot-dependencies** 中已经声明了最新的netty依赖。

### 通过yaml配置基本的属性

```yml
server:
  port: 80

logging:
    level:
      root: DEBUG

management:
  endpoints: 
    web:
      exposure:
        include: "*"
    
  endpoint:
    shutdown:
      enabled: true

netty:
  websocket:
    # Websocket服务端口
    port: 1024
    # 绑定的网卡
    ip: 0.0.0.0
    # 消息帧最大体积
    max-frame-size: 10240
    # URI路径
    path: /channel
```

App使用了，**actuator**，并且开启暴露了 `shutdown` 端点，可以让SpringBoot App优雅的停机。
在这里通过 `netty.websocket.*` 配置 websocket服务相关的配置。

### 通过 ApplicationRunner 启动Websocket服务

```java
import java.net.InetSocketAddress;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeansException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextClosedEvent;
import org.springframework.stereotype.Component;

import io.netty.bootstrap.ServerBootstrap;
import io.netty.channel.Channel;
import io.netty.channel.ChannelFutureListener;
import io.netty.channel.ChannelHandlerContext;
import io.netty.channel.ChannelInboundHandlerAdapter;
import io.netty.channel.ChannelInitializer;
import io.netty.channel.ChannelPipeline;
import io.netty.channel.EventLoopGroup;
import io.netty.channel.nio.NioEventLoopGroup;
import io.netty.channel.socket.SocketChannel;
import io.netty.channel.socket.nio.NioServerSocketChannel;
import io.netty.handler.codec.http.DefaultFullHttpResponse;
import io.netty.handler.codec.http.FullHttpRequest;
import io.netty.handler.codec.http.HttpObjectAggregator;
import io.netty.handler.codec.http.HttpResponseStatus;
import io.netty.handler.codec.http.HttpServerCodec;
import io.netty.handler.codec.http.HttpVersion;
import io.netty.handler.codec.http.websocketx.WebSocketServerProtocolHandler;
import io.netty.handler.codec.http.websocketx.extensions.compression.WebSocketServerCompressionHandler;
import io.netty.handler.stream.ChunkedWriteHandler;
import io.springboot.netty.websocket.handler.WebsocketMessageHandler;

/**
 * 初始化Netty服务
 * @author Administrator
 */
@Component
public class NettyBootsrapRunner implements ApplicationRunner, ApplicationListener<ContextClosedEvent>, ApplicationContextAware {

	private static final Logger LOGGER = LoggerFactory.getLogger(NettyBootsrapRunner.class);
	
	@Value("${netty.websocket.port}")
	private int port;

	@Value("${netty.websocket.ip}")
	private String ip;
	
	@Value("${netty.websocket.path}")
	private String path;
	
	@Value("${netty.websocket.max-frame-size}")
	private long maxFrameSize;
	
	private ApplicationContext applicationContext;
	
	private Channel serverChannel;
	
	public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
		this.applicationContext = applicationContext;
	}
	
	public void run(ApplicationArguments args) throws Exception {
		
		EventLoopGroup bossGroup = new NioEventLoopGroup();
		EventLoopGroup workerGroup = new NioEventLoopGroup();
		try {
			ServerBootstrap serverBootstrap = new ServerBootstrap();
			serverBootstrap.group(bossGroup, workerGroup);
			serverBootstrap.channel(NioServerSocketChannel.class);
			serverBootstrap.localAddress(new InetSocketAddress(this.ip, this.port));
			serverBootstrap.childHandler(new ChannelInitializer<SocketChannel>() {
				@Override
				protected void initChannel(SocketChannel socketChannel) throws Exception {
					ChannelPipeline pipeline = socketChannel.pipeline();
					pipeline.addLast(new HttpServerCodec());
					pipeline.addLast(new ChunkedWriteHandler());
					pipeline.addLast(new HttpObjectAggregator(65536));
					pipeline.addLast(new ChannelInboundHandlerAdapter() {
						@Override
						public void channelRead(ChannelHandlerContext ctx, Object msg) throws Exception {
							if(msg instanceof FullHttpRequest) {
								FullHttpRequest fullHttpRequest = (FullHttpRequest) msg;
								String uri = fullHttpRequest.uri();
								if (!uri.equals(path)) {
									// 访问的路径不是 websocket的端点地址，响应404
									ctx.channel().writeAndFlush(new DefaultFullHttpResponse(HttpVersion.HTTP_1_1, HttpResponseStatus.NOT_FOUND))
										.addListener(ChannelFutureListener.CLOSE);
									return ;
								}
							}
							super.channelRead(ctx, msg);
						}
					});
					pipeline.addLast(new WebSocketServerCompressionHandler());
					pipeline.addLast(new WebSocketServerProtocolHandler(path, null, true, maxFrameSize));

					/**
					 * 从IOC中获取到Handler
					 */
					pipeline.addLast(applicationContext.getBean(WebsocketMessageHandler.class));
				}
			});
			Channel channel = serverBootstrap.bind().sync().channel();	
			this.serverChannel = channel;
			LOGGER.info("websocket 服务启动，ip={},port={}", this.ip, this.port);
			channel.closeFuture().sync();
		} finally {
			bossGroup.shutdownGracefully();
			workerGroup.shutdownGracefully();
		}
	}

	public void onApplicationEvent(ContextClosedEvent event) {
		if (this.serverChannel != null) {
			this.serverChannel.close();
		}
		LOGGER.info("websocket 服务停止");
	}
}
```

`NettyBootsrapRunner` 实现了 ApplicationRunner, `ApplicationListener<ContextClosedEvent>`, `ApplicationContextAware` 接口。

这样一来，`NettyBootsrapRunner` 可以在App的启动和关闭时执行Websocket服务的启动和关闭。而且通过 `ApplicationContextAware` 还能获取到 `ApplicationContext`

### 通过IOC管理 Netty 的Handler

```java
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import io.netty.channel.ChannelHandlerContext;
import io.netty.channel.SimpleChannelInboundHandler;
import io.netty.channel.ChannelFutureListener;
import io.netty.channel.ChannelHandler.Sharable;
import io.netty.handler.codec.http.websocketx.TextWebSocketFrame;
import io.netty.handler.codec.http.websocketx.WebSocketCloseStatus;
import io.netty.handler.codec.http.websocketx.WebSocketFrame;
import io.springboot.netty.service.DiscardService;
/**
 * 
 * @author Administrator
 *
 */
@Sharable
@Component
public class WebsocketMessageHandler extends SimpleChannelInboundHandler<WebSocketFrame> {
	
	private static final Logger LOGGER = LoggerFactory.getLogger(WebsocketMessageHandler.class);
	
	@Autowired
	DiscardService discardService;
	
	@Override
	protected void channelRead0(ChannelHandlerContext ctx, WebSocketFrame msg) throws Exception {
		if (msg instanceof TextWebSocketFrame) {
			TextWebSocketFrame textWebSocketFrame = (TextWebSocketFrame) msg;
			// 业务层处理数据
			this.discardService.discard(textWebSocketFrame.text());
			// 响应客户端
			ctx.channel().writeAndFlush(new TextWebSocketFrame("我收到了你的消息：" + System.currentTimeMillis()));
		} else {
			// 不接受文本以外的数据帧类型
			ctx.channel().writeAndFlush(WebSocketCloseStatus.INVALID_MESSAGE_TYPE).addListener(ChannelFutureListener.CLOSE);
		}
	}
	
	@Override
	public void channelInactive(ChannelHandlerContext ctx) throws Exception {
		super.channelInactive(ctx);
		LOGGER.info("链接断开：{}", ctx.channel().remoteAddress());
	}
	@Override
	public void channelActive(ChannelHandlerContext ctx) throws Exception {
		super.channelActive(ctx);
		LOGGER.info("链接创建：{}", ctx.channel().remoteAddress());
	}
}
```

handler已经是一个IOC管理的Bean，可以自由的使用依赖注入等Spring带来的快捷功能。由于是单例存在，所有的链接都使用同一个hander，所以尽量不要保存任何实例变量。

这个Handler处理完毕客户端的消息后，给客户端会响应一条：`"我收到了你的消息：" + System.currentTimeMillis()` 的消息

为了演示在Handler中使用业务层，这里假装注入了一个 `DiscardService`服务。它的逻辑很简单，就是丢弃消息

```java
public void discard (String message) {
	LOGGER.info("丢弃消息:{}", message);
}
```

## 演示

### 启动客户端

```html
<!DOCTYPE html>
	<html>
	<head>
		<meta charset="UTF-8">
		<title>Websocket</title>
	</head>
	<body>
	
	</body>
	<script type="text/javascript">
		;(function(){
			const websocket = new WebSocket('ws://localhost:1024/channel');
			websocket.onmessage = e => {
				console.log('收到消息:', e.data);
			}
			websocket.onclose = e => {
				let {code, reason} = e;
				console.log(`链接断开:code=${code}, reason=${reason}`);
			}
			websocket.onopen = () => {
				console.log(`链接建立...`);
				websocket.send('Hello');
			}
			websocket.onerror = e => {
				console.log('链接异常:', e);
			}
		})();

	</script>
</html>
```

链接创建后就给服务端发送一条消息：`Hello`

### 关闭服务端

使用 PostMan 请求服务器的停机端点
<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/framework/nettycase/nettyspringboot3-1.png')" alt="wxmp">




### 日志

#### 客户端日志

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/framework/nettycase/nettyspringboot3-2.png')" alt="wxmp">


#### 服务端日志

```
2020-06-22 17:08:22.728  INFO 9392 --- [           main] io.undertow                              : starting server: Undertow - 2.1.3.Final
2020-06-22 17:08:22.740  INFO 9392 --- [           main] org.xnio                                 : XNIO version 3.8.0.Final
2020-06-22 17:08:22.752  INFO 9392 --- [           main] org.xnio.nio                             : XNIO NIO Implementation Version 3.8.0.Final
2020-06-22 17:08:22.839  INFO 9392 --- [           main] org.jboss.threads                        : JBoss Threads version 3.1.0.Final
2020-06-22 17:08:22.913  INFO 9392 --- [           main] o.s.b.w.e.undertow.UndertowWebServer     : Undertow started on port(s) 80 (http)
2020-06-22 17:08:22.931  INFO 9392 --- [           main] io.springboot.netty.NettyApplication     : Started NettyApplication in 4.536 seconds (JVM running for 5.175)
2020-06-22 17:08:23.653  INFO 9392 --- [           main] i.s.n.w.runner.NettyBootsrapRunner       : websocket 服务启动，ip=0.0.0.0,port=1024
2020-06-22 17:08:28.484  INFO 9392 --- [  XNIO-1 task-1] io.undertow.servlet                      : Initializing Spring DispatcherServlet 'dispatcherServlet'
2020-06-22 17:08:28.484  INFO 9392 --- [  XNIO-1 task-1] o.s.web.servlet.DispatcherServlet        : Initializing Servlet 'dispatcherServlet'
2020-06-22 17:08:28.492  INFO 9392 --- [  XNIO-1 task-1] o.s.web.servlet.DispatcherServlet        : Completed initialization in 8 ms
2020-06-22 17:08:28.724  INFO 9392 --- [ntLoopGroup-3-1] i.s.n.w.handler.WebsocketMessageHandler  : 链接创建：/0:0:0:0:0:0:0:1:12093
2020-06-22 17:08:28.790  INFO 9392 --- [ntLoopGroup-3-1] i.s.netty.service.DiscardService         : 丢弃消息:Hello
2020-06-22 17:08:33.688  INFO 9392 --- [     Thread-232] i.s.n.w.runner.NettyBootsrapRunner       : websocket 服务停止
2020-06-22 17:08:33.691  INFO 9392 --- [ntLoopGroup-3-1] i.s.n.w.handler.WebsocketMessageHandler  : 链接断开：/0:0:0:0:0:0:0:1:12093
2020-06-22 17:08:33.699  INFO 9392 --- [     Thread-232] io.undertow                              : stopping server: Undertow - 2.1.3.Final
2020-06-22 17:08:33.704  INFO 9392 --- [     Thread-232] io.undertow.servlet                      : Destroying Spring FrameworkServlet 'dispatcherServlet'
2020-06-22 17:08:33.708  INFO 9392 --- [     Thread-232] o.s.s.concurrent.ThreadPoolTaskExecutor  : Shutting down ExecutorService 'applicationTaskExecutor'
```

Netty会在SpringBoot App启动后启动，App停止后关闭，可以正常的对外提供服务
并且Handler交给IOC管理可以注入Service，完成业务处理。

## 完整的代码

https://github.com/springboot-community/springboot-netty

同步发布
https://springboot.io/t/topic/2103

## 参考文章
* https://www.cnblogs.com/kevinblandy/p/13177944.html