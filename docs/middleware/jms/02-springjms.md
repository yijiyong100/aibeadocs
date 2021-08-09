---
title: JMS规范-Spring JMS组件
---

::: tip
本文主要是介绍 JMS规范-Spring JMS组件 。
:::

[[toc]]

## Spring JMS各组件详解


## JmsTemplate

用来send、receive消息（receive是同步式的，会block）。每个`JmsTemplate`实例拥有自己的配置，比如：`connectionFactory`、`sessionTransacted`、`sessionAcknowledgeMode`、`deliveryMode`、`timeToLive`等等，所以需根据不同场景配置提供不同的`JmsTemplate` Bean而不是一个Singleton Bean通吃所有JMS操作。

下面是类图（只包含了部分关键属性）：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/middleware/jms/springjms-1.png')" alt="wxmp">

## ConnectionFactory

Spring提供了两个`javax.jms.ConnectionFactory`的实现：[SingleConnectionFactory](https://link.segmentfault.com/?url=https%3A%2F%2Fdocs.spring.io%2Fspring-framework%2Fdocs%2F4.3.9.RELEASE%2Fjavadoc-api%2Forg%2Fspringframework%2Fjms%2Fconnection%2FSingleConnectionFactory.html)和[CachingConnectionFactory](https://link.segmentfault.com/?url=https%3A%2F%2Fdocs.spring.io%2Fspring-framework%2Fdocs%2F4.3.9.RELEASE%2Fjavadoc-api%2Forg%2Fspringframework%2Fjms%2Fconnection%2FCachingConnectionFactory.html)。它们实际上是一种Wrapper，用来缓存如：`Connection`、`Session`、`MessageProducer`、`MessageConsumer`。

事实上[JmsTemplate的Javadoc](https://link.segmentfault.com/?url=https%3A%2F%2Fdocs.spring.io%2Fspring-framework%2Fdocs%2F4.3.9.RELEASE%2Fjavadoc-api%2Forg%2Fspringframework%2Fjms%2Fcore%2FJmsTemplate.html)提到过：

> NOTE: The ConnectionFactory used with this template should return pooled Connections (or a single shared Connection) as well as pooled Sessions and MessageProducers. Otherwise, performance of ad-hoc JMS operations is going to suffer.

在Spring JMS文档的[Caching Messaging Resources](https://link.segmentfault.com/?url=https%3A%2F%2Fdocs.spring.io%2Fspring%2Fdocs%2F4.3.9.RELEASE%2Fspring-framework-reference%2Fhtml%2Fjms.html%23jms-caching-resources)中也提到了需要优化资源使用以提升性能：

> The standard API involves creating many intermediate objects. To send a message the following 'API' walk is performed
> ConnectionFactory->Connection->Session->MessageProducer->send
> Between the ConnectionFactory and the Send operation there are three intermediate objects that are created and destroyed. To optimise the resource usage and increase performance two implementations of `ConnectionFactory` are provided.

下面是类图（只包含了部分关键属性）：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/middleware/jms/springjms-2.png')" alt="wxmp">

### SingleConnectionFactory

[SingleConnectionFactory](https://link.segmentfault.com/?url=https%3A%2F%2Fdocs.spring.io%2Fspring-framework%2Fdocs%2F4.3.9.RELEASE%2Fjavadoc-api%2Forg%2Fspringframework%2Fjms%2Fconnection%2FSingleConnectionFactory.html)顾名思义，无论调用多少次`createConnection(..)`都返回同一个`Connection`实例。但是它并不缓存`Session`，也就是说调用一次`createSession(...)`就会创建一个新的实例。

可以通过[SingleConnectionFactoryTest](https://link.segmentfault.com/?url=https%3A%2F%2Fgithub.com%2Fchanjarster%2Fspring-jms-learn%2Fblob%2Fmaster%2Fsrc%2Ftest%2Fjava%2Fme%2Fchanjar%2Fspringjmslearn%2FSingleConnectionFactoryTest.java)了解详情。

所以在大多数情况下，不推荐使用`SingleConnectionFactory`。

### CachingConnectionFactory

[CachingConnectionFactory](https://link.segmentfault.com/?url=https%3A%2F%2Fdocs.spring.io%2Fspring-framework%2Fdocs%2F4.3.9.RELEASE%2Fjavadoc-api%2Forg%2Fspringframework%2Fjms%2Fconnection%2FCachingConnectionFactory.html)继承自`SingleConnectionFactory`，除了依然保留缓存同一个`Connection`实例的特性外，还增加了对于`Session`、`MessageProducer`、`MessageConsumer`的缓存。

`CachingConnectionFactory`其内部维护了一个`Acknowledge Mode -> List<Session>`的Map，sessionCacheSize实际上指的是`List<Session>`的大小，所以最多会有4 * sessionCacheSize数量的`Session`被缓存（因为JMS规定了四种Acknowledge Mode）。
并且`CachingConnectionFactory`其本质不是一个Object Pool，所以不会因为实际请求Session数量超出sessionCacheSize导致block或者返回null，可以放心使用。

`CachingConnectionFactory`返回的每个`Session`内部都有`ConsumerCacheKey -> MessageConsumer`以及`DestinationCacheKey -> MessageProducer`的Map，用来缓存`MessageProducer`和`MessageConsumer`。

可以通过[CachingConnectionFactory](https://link.segmentfault.com/?url=https%3A%2F%2Fgithub.com%2Fchanjarster%2Fspring-jms-learn%2Fblob%2Fmaster%2Fsrc%2Ftest%2Fjava%2Fme%2Fchanjar%2Fspringjmslearn%2FCachingConnectionFactoryTest.java)了解详情。

## MessageListenerContainer

Spring JMS中有一个特性[MessageListenerContainer](https://link.segmentfault.com/?url=https%3A%2F%2Fdocs.spring.io%2Fspring-framework%2Fdocs%2F4.3.9.RELEASE%2Fjavadoc-api%2Forg%2Fspringframework%2Fjms%2Flistener%2FMessageListenerContainer.html)，按照官方文档的说法：

> A message listener container is used to receive messages from a JMS message queue and drive the MessageListener that is injected into it.

上面提到的`MessageListener`就是`javax.jms.MessageListener`，第一次看到这个东西感觉有点奇怪，因为`MessageListener`的正规用法应该`MessageConsumer.setMessageListener()`就行了。

因为`MessageListenerContainer`继承自`SmartLifeCycle`，所以它提供了程序启动时开启connection、session，程序关闭是关闭session、connection的功能，能够让你不用操心资源回收问题。

下面介绍一下两个实现[SimpleMessageListenerContainer](https://link.segmentfault.com/?url=https%3A%2F%2Fdocs.spring.io%2Fspring-framework%2Fdocs%2F4.3.9.RELEASE%2Fjavadoc-api%2Forg%2Fspringframework%2Fjms%2Flistener%2FSimpleMessageListenerContainer.html)和[DefaultMessageListenerContainer](https://link.segmentfault.com/?url=https%3A%2F%2Fdocs.spring.io%2Fspring-framework%2Fdocs%2F4.3.9.RELEASE%2Fjavadoc-api%2Forg%2Fspringframework%2Fjms%2Flistener%2FDefaultMessageListenerContainer.html)。

下面是类图（只包含了部分关键属性）：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/middleware/jms/springjms-3.png')" alt="wxmp">

### SimpleMessageListenerContainer

[SimpleMessageListenerContainer](https://link.segmentfault.com/?url=https%3A%2F%2Fdocs.spring.io%2Fspring-framework%2Fdocs%2F4.3.9.RELEASE%2Fjavadoc-api%2Forg%2Fspringframework%2Fjms%2Flistener%2FSimpleMessageListenerContainer.html)使用`MessageConsumer.setMessageListener()`来监听消息，它不支持参与外部事务（比如PlatformTransactionManager）。

它是可以持有多个`MessageConsumer`实例的。代码如下：

```java
// ...

private int concurrentConsumers = 1;
private Set<Session> sessions;
private Set<MessageConsumer> consumers;

// ...
protected void initializeConsumers() throws JMSException {
  // Register Sessions and MessageConsumers.
  synchronized (this.consumersMonitor) {
    if (this.consumers == null) {
      this.sessions = new HashSet<Session>(this.concurrentConsumers);
      this.consumers = new HashSet<MessageConsumer>(this.concurrentConsumers);
      Connection con = getSharedConnection();
      for (int i = 0; i < this.concurrentConsumers; i++) {
        Session session = createSession(con);
        MessageConsumer consumer = createListenerConsumer(session);
        this.sessions.add(session);
        this.consumers.add(consumer);
      }
    }
  }
}
```

其处理消息的方式有两种：1）传统的`MessageConsumer.setMessageListener()`；2）使用`Executor`。

```java
if (this.taskExecutor != null) {
  consumer.setMessageListener(new MessageListener() {
    @Override
    public void onMessage(final Message message) {
      taskExecutor.execute(new Runnable() {
        @Override
        public void run() {
          processMessage(message, session);
        }
      });
    }
  });
}
else {
  consumer.setMessageListener(new MessageListener() {
    @Override
    public void onMessage(Message message) {
      processMessage(message, session);
    }
  });
}
```

### DefaultMessageListenerContainer

[DefaultMessageListenerContainer](https://link.segmentfault.com/?url=https%3A%2F%2Fdocs.spring.io%2Fspring-framework%2Fdocs%2F4.3.9.RELEASE%2Fjavadoc-api%2Forg%2Fspringframework%2Fjms%2Flistener%2FDefaultMessageListenerContainer.html)和[SimpleMessageListenerContainer](https://link.segmentfault.com/?url=https%3A%2F%2Fdocs.spring.io%2Fspring-framework%2Fdocs%2F4.3.9.RELEASE%2Fjavadoc-api%2Forg%2Fspringframework%2Fjms%2Flistener%2FSimpleMessageListenerContainer.html)不同，它使用`MessageConsumer.receive()`来处理消息，并且支持XA transaction。

因为`receive()`是同步的、blocking方法，其性能没有`setMessageListener()`好，所以它非常依赖多线程(`TaskExecutor`)，这也也带来来dynamic scaling的好处。

请注意不要对Topic采用多线程，否则会收到重复的消息，详情见[官方文档](https://link.segmentfault.com/?url=https%3A%2F%2Fdocs.spring.io%2Fspring%2Fdocs%2F4.3.9.RELEASE%2Fjavadoc-api%2Forg%2Fspringframework%2Fjms%2Flistener%2FDefaultMessageListenerContainer.html%23setConcurrentConsumers-int-)。

## 异步接收消息

同步接收消息的方式有`JmsTemplate.receive*()`和`MessageConsumer.receive*()`，这里不多讲，重点讲异步接收消息的几种方式。

### MessageListener & MessageListenerContainer

把`MessageListener`包装到`MessageListenerContainer`里接收消息，例子参见官方文档[Asynchronous Reception - Message-Driven POJOs](https://link.segmentfault.com/?url=https%3A%2F%2Fdocs.spring.io%2Fspring%2Fdocs%2F4.3.9.RELEASE%2Fspring-framework-reference%2Fhtml%2Fjms.html%23jms-asynchronousMessageReception)

### SessionAwareMessageListener

[SessionAwareMessageListener](https://link.segmentfault.com/?url=https%3A%2F%2Fdocs.spring.io%2Fspring%2Fdocs%2F4.3.9.RELEASE%2Fjavadoc-api%2Forg%2Fspringframework%2Fjms%2Flistener%2FSessionAwareMessageListener.html)是Spring提供和`MessageListener`类似的接口，`MessageListenerContainer`支持这个接口，用法和`MessageListener`一样。

### MessageListenerAdapter

[MessageListenerAdapter](https://link.segmentfault.com/?url=https%3A%2F%2Fdocs.spring.io%2Fspring-framework%2Fdocs%2F4.3.9.RELEASE%2Fjavadoc-api%2Forg%2Fspringframework%2Fjms%2Flistener%2Fadapter%2FMessageListenerAdapter.html)是Spring提供的另一个异步接收消息的方式，它`MessageListener`与`SessionAwareMessageListener`更灵活，因为它采用反射机制来把消息传递到你的接收消息的方法上。

使用方法见官方文档[the SessionAwareMessageListener interface](https://link.segmentfault.com/?url=https%3A%2F%2Fdocs.spring.io%2Fspring%2Fdocs%2F4.3.9.RELEASE%2Fspring-framework-reference%2Fhtml%2Fjms.html%23jms-receiving-async-session-aware-message-listener)。

### @JmsListener

[@JmsListener](https://link.segmentfault.com/?url=https%3A%2F%2Fdocs.spring.io%2Fspring-framework%2Fdocs%2F4.3.9.RELEASE%2Fjavadoc-api%2Forg%2Fspringframework%2Fjms%2Fannotation%2FJmsListener.html)是另一种接收消息的方法，怎么使用它可以看官方文档[Annotation-driven listener endpoints](https://link.segmentfault.com/?url=https%3A%2F%2Fdocs.spring.io%2Fspring%2Fdocs%2F4.3.9.RELEASE%2Fspring-framework-reference%2Fhtml%2Fjms.html%23jms-annotated)。

`@JmsListener`和`MessageListener`、`SessionAwareMessageListener`、`MessageListenerAdapter`一样也需要一个Container，用户可以通过`@JmsListener.containerFactory`属性来指定[JmsListenerContainerFactory](https://link.segmentfault.com/?url=https%3A%2F%2Fdocs.spring.io%2Fspring-framework%2Fdocs%2F4.3.9.RELEASE%2Fjavadoc-api%2Forg%2Fspringframework%2Fjms%2Fconfig%2FJmsListenerContainerFactory.html)。

Spring提供了两种JmsListenerContainerFactory实现：

1. [DefaultJmsListenerContainerFactory](https://link.segmentfault.com/?url=https%3A%2F%2Fdocs.spring.io%2Fspring-framework%2Fdocs%2F4.3.9.RELEASE%2Fjavadoc-api%2Forg%2Fspringframework%2Fjms%2Fconfig%2FDefaultJmsListenerContainerFactory.html)，用来生产DefaultMessageListenerContainer，Spring Boot提供`DefaultJmsListenerContainerFactoryConfigurer`作为配置工具
2. [SimpleJmsListenerContainerFactory](https://link.segmentfault.com/?url=https%3A%2F%2Fdocs.spring.io%2Fspring-framework%2Fdocs%2F4.3.9.RELEASE%2Fjavadoc-api%2Forg%2Fspringframework%2Fjms%2Fconfig%2FSimpleJmsListenerContainerFactory.html)，用来生产SimpleMessageListenerContainer

所以在使用`@JmsListener`需要仔细的选择正确的`JmsListenerContainerFactory`，而不是全局采用一种配置。

## 总结

使用Spring JMS时有需要注意以下三点：

- 1. 根据实际情况，配置合适的ConnectionFactory Bean，如有需要可以有多个ConnectionFactory Bean。
- 2. JmsTemplate, MessageListenerContainer, JmsListenerContainerFactory需根据实际情况配置不同Bean，避免全局使用一套。
- 3. JmsTemplate, MessageListenerContainer, JmsListenerContainerFactory选择合适的ConnectionFactory。
- 4. 设定好合适的Executor/线程池大小，避免大量Thread block。

下面是一张各个组件的关系图。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/middleware/jms/springjms-4.png')" alt="wxmp">

## 参考资料

- [Spring JMS](https://link.segmentfault.com/?url=https%3A%2F%2Fdocs.spring.io%2Fspring%2Fdocs%2F4.3.9.RELEASE%2Fspring-framework-reference%2Fhtml%2Fjms.html)
- [Spring JMS Listener Adapters](https://link.segmentfault.com/?url=https%3A%2F%2Fdzone.com%2Farticles%2Fspring-jms-listener-adapters)
- [JMS Javadoc](https://link.segmentfault.com/?url=https%3A%2F%2Fdocs.oracle.com%2Fjavaee%2F7%2Fapi%2Fjavax%2Fjms%2Fpackage-summary.html)

[spring](https://segmentfault.com/t/spring)[jms](https://segmentfault.com/t/jms)

## 参考文章
* https://segmentfault.com/a/1190000012875201