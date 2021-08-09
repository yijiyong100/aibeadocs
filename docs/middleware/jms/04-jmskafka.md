---
title: JMS规范与Kafka
---

::: tip
本文主要是介绍 JMS规范与Kafka 。
:::

[[toc]]

## JMS规范与Kafka

### 一、为什么需要消息队列

　　消息队列的核心作用就是三点：解耦一个系统中各个子模块的互相绑定与依赖，异步执行后台耗时逻辑，并行处理一个请求中涉及的多个操作。

　　以我们常见的下订单场景来说明，我们熟悉的淘宝，后台运作着成千上百的子系统，一个简单的加入购物车并下单的操作，后台要经过购物车存储记录，计费中心计算总值，订单中心处理订单，后转交仓库处理等等子系统的逻辑，如果每下单一件物品，都要等所有流程跑完，再返回下单成功的提示，那用户体验是极差的，因为在多个子系统的信息传递和处理会带来时间上的巨大开销。同时这样的架构设计也是不合理的，各个子系统会存在互相依赖甚至循环依赖的情况，在子系统日益增多的场景下，这样的一个庞大系统是难以维护的。

　　而我们现实的体验是，每次一点击下单，马上就返回了订单处理成功的提示。那是因为淘宝后台广泛的使用了消息中间件，将订单信息以消息的形式发送到MQ消息中间件。而后台所有子系统各自独立运作，通过收发消息来并行的对订单作存储，计费，入库，出库操作，这样极大的提高了系统的灵活性，减少用户等待提示的时间，带来了更好的用户体验。

### 二、JMS规范

　　**JMS是什么**：JMS是Java提供的一套技术规范和关于消息中间件的协议

　　**JMS干什么用**：通过生产者Producer，消息服务器，以及消费者通力合作，使异构系统能进行集成通信，缓解系统瓶颈，提高系统的伸缩性增强系统用户体验，使得系统模块化和组件化变得可行并更加灵活，其中生产者，消息服务器，以及消费者的工作模型如下：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/middleware/jms/kafkajms-1.png')" alt="wxmp">


　　**JMS的消息传输模型**

　　点对点模式（一对一，消费者主动拉取数据，消息收到后消息清除）
点对点模型通常是一个基于拉取或者轮询的消息传送模型，这种模型从队列中请求信息，而不是将消息推送到客户端。这个模型的特点是发送到队列的消息被一个且只有一个接收者接收处理，即使有多个消息监听者也是如此。

　　发布/订阅模式（一对多，数据生产后，推送给所有订阅者）

发布订阅模型则是一个基于推送的消息传送模型。发布订阅模型可以有多种不同的订阅者，临时订阅者只在主动监听主题时才接收消息，而持久订阅者则监听主题的所有消息，即使当前订阅者不可用，处于离线状态。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/middleware/jms/kafkajms-2.png')" alt="wxmp">

### 三、Kafka介绍

　　Apache Kafka是一个开源消息系统，由Scala写成。是由Apache软件基金会开发的一个开源消息系统项目，目标是为处理实时数据提供一个统一、高通量、低等待的平台，Kafka被广泛地应用于各种流式计算中。

　　Kafka提供了类JMS的特性，但在设计实现上并不遵循JMS规范，Kafka对消息保存时根据Topic进行归类，发送消息者称为Producer,消息接受者称为Consumer,此外kafka集群有多个kafka实例组成，每个实例(server)称为broker。同时无论是kafka集群，还是producer和consumer都依赖于zookeeper集群保存一些meta信息，来保证系统可用性。

**Kafka核心组件及简单的运作流程图**：

- **Topic**：消息根据Topic进行归类
- **Producer**：发送消息者
- **Consumer**：消息接受者

- **Kafka cluster**：kafka集群
- **broker**：每个kafka实例(server)
- **Zookeeper**：依赖集群保存meta信息

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/middleware/jms/kafkajms-3.png')" alt="wxmp">

## 参考文章
* https://www.cnblogs.com/jiyukai/p/9463905.html