---
title: 消息队列-功能介绍
---

::: tip
本文主要是介绍 消息队列-功能介绍 。
:::

[[toc]]

## MQ（消息队列）功能介绍


## MQ（消息队列）

### 介绍

消息队列就是基础数据结构中的“先进先出”的一种数据机构。想一下，生活中买东西，需要排队，先排的人先买消费，就是典型的“先进先出”。



<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/middleware/mq/intro-1.png')" alt="wxmp">


image.png

### MQ解决什么问题

MQ是一直存在，不过随着微服务架构的流行，成了解决微服务之间问题的常用工具。

#### 应用解耦

以电商应用为例，应用中有订单系统、库存系统、物流系统、支付系统。用户创建订单后，如果耦合调用库存系统、物流系统、支付系统，任何一个子系统出了故障，都会造成下单操作异常。

当转变成基于消息队列的方式后，系统间调用的问题会减少很多，比如物流系统因为发生故障，需要几分钟来修复。在这几分钟的时间里，物流系统要处理的内存被缓存在消息队列中，用户的下单操作可以正常完成。当物流系统恢复后，继续处理订单信息即可，中单用户感受不到物流系统的故障。提升系统的可用性。



<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/middleware/mq/intro-2.png')" alt="wxmp">


image.png

#### 流量消峰

举个栗子，如果订单系统最多能处理一万次订单，这个处理能力应付正常时段的下单时绰绰有余，正常时段我们下单一秒后就能返回结果。但是在高峰期，如果有两万次下单操作系统是处理不了的，只能限制订单超过一万后不允许用户下单。

使用消息队列做缓冲，我们可以取消这个限制，把一秒内下的订单分散成一段时间来处理，这事有些用户可能在下单十几秒后才能收到下单成功的操作，但是比不能下单的体验要好。

#### 消息分发

多个服务队数据感兴趣，只需要监听同一类消息即可处理。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/middleware/mq/intro-3.png')" alt="wxmp">


image.png

例如A产生数据，B对数据感兴趣。如果没有消息的队列A每次处理完需要调用一下B服务。过了一段时间C对数据也感性，A就需要改代码，调用B服务，调用C服务。只要有服务需要，A服务都要改动代码。很不方便。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/middleware/mq/intro-4.png')" alt="wxmp">

image.png



有了消息队列后，A只管发送一次消息，B对消息感兴趣，只需要监听消息。C感兴趣，C也去监听消息。A服务作为基础服务完全不需要有改动。

#### 异步消息

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/middleware/mq/intro-5.png')" alt="wxmp">


image.png

有些服务间调用是异步的，例如A调用B，B需要花费很长时间执行，但是A需要知道B什么时候可以执行完，以前一般有两种方式，A过一段时间去调用B的查询api查询。或者A提供一个callback api，B执行完之后调用api通知A服务。这两种方式都不是很优雅

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/middleware/mq/intro-6.png')" alt="wxmp">


image.png

使用消息总线，可以很方便解决这个问题，A调用B服务后，只需要监听B处理完成的消息，当B处理完成后，会发送一条消息给MQ，MQ会将此消息转发给A服务。

这样A服务既不用循环调用B的查询api，也不用提供callback api。同样B服务也不用做这些操作。A服务还能及时的得到异步处理成功的消息。

## 参考文章
* https://www.jianshu.com/p/9a0e9ffa17dd