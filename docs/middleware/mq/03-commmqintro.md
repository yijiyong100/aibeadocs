---
title: 常用消息队列介绍
---

::: tip
本文主要是介绍 常用消息队列介绍 。
:::

[[toc]]


## 常用消息队列介绍

消息队列是分布式应用间交换信息的重要组件，消息队列可驻留在内存或磁盘上, 队列可以存储消息直到它们被应用程序读走。

通过消息队列，应用程序可以在不知道彼此位置的情况下独立处理消息，或者在处理消息前不需要等待接收此消息。

所以消息队列可以解决应用解耦、异步消息、流量削锋等问题，是实现高性能、高可用、可伸缩和最终一致性架构中不可以或缺的一环。

现在比较常见的消息队列产品主要有ActiveMQ、RabbitMQ、ZeroMQ、Kafka、RocketMQ等。

## 1 ActiveMQ

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/middleware/mq/commmq-1.png')" alt="wxmp">

 

ActiveMQ 是Apache出品，最流行的，能力强劲的开源消息总线。ActiveMQ 是一个完全支持JMS1.1和J2EE 1.4规范的 JMS Provider实现，尽管JMS规范出台已经是很久的事情了，但是JMS在当今的J2EE应用中间仍然扮演着特殊的地位。

ActiveMQ特性如下：

⒈ 多种语言和协议编写客户端。语言: Java,C,C++,C#,Ruby,Perl,Python,PHP。应用协议： OpenWire,Stomp REST,WS Notification,XMPP,AMQP

⒉ 完全支持JMS1.1和J2EE 1.4规范 （持久化，XA消息，事务)

⒊ 对Spring的支持，ActiveMQ可以很容易内嵌到使用Spring的系统里面去，而且也支持Spring2.0的特性

⒋ 通过了常见J2EE服务器（如 Geronimo,JBoss 4,GlassFish,WebLogic)的测试，其中通过JCA 1.5 resource adaptors的配置，可以让ActiveMQ可以自动的部署到任何兼容J2EE 1.4 商业服务器上

⒌ 支持多种传送协议：in-VM,TCP,SSL,NIO,UDP,JGroups,JXTA

⒍ 支持通过JDBC和journal提供高速的消息持久化

⒎ 从设计上保证了高性能的集群，客户端-服务器，点对点

⒏ 支持Ajax

⒐ 支持与Axis的整合

⒑ 可以很容易得调用内嵌JMS provider，进行测试

## 2 RabbitMQ

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/middleware/mq/commmq-2.png')" alt="wxmp">

RabbitMQ是流行的开源消息队列系统，用erlang语言开发。RabbitMQ是AMQP（高级消息队列协议）的标准实现。支持多种客户端，如：Python、Ruby、.NET、Java、JMS、C、PHP、ActionScript、XMPP、STOMP等，支持AJAX，持久化。用于在分布式系统中存储转发消息，在易用性、扩展性、高可用性等方面表现不俗。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/middleware/mq/commmq-3.png')" alt="wxmp">

几个重要概念：

Broker：简单来说就是消息队列服务器实体。

　　Exchange：消息交换机，它指定消息按什么规则，路由到哪个队列。

　　Queue：消息队列载体，每个消息都会被投入到一个或多个队列。

　　Binding：绑定，它的作用就是把exchange和queue按照路由规则绑定起来。

　　Routing Key：路由关键字，exchange根据这个关键字进行消息投递。

　　vhost：虚拟主机，一个broker里可以开设多个vhost，用作不同用户的权限分离。

　　producer：消息生产者，就是投递消息的程序。

　　consumer：消息消费者，就是接受消息的程序。

　　channel：消息通道，在客户端的每个连接里，可建立多个channel，每个channel代表一个会话任务。

消息队列的使用过程，如下：

（1）客户端连接到消息队列服务器，打开一个channel。

（2）客户端声明一个exchange，并设置相关属性。

（3）客户端声明一个queue，并设置相关属性。

（4）客户端使用routing key，在exchange和queue之间建立好绑定关系。

（5）客户端投递消息到exchange。

exchange接收到消息后，就根据消息的key和已经设置的binding，进行消息路由，将消息投递到一个或多个队列里。

## 3 ZeroMQ

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/middleware/mq/commmq-4.png')" alt="wxmp">

号称史上最快的消息队列，它实际类似于Socket的一系列接口，他跟Socket的区别是：普通的socket是端到端的（1:1的关系），而ZMQ却是可以N：M 的关系，人们对BSD套接字的了解较多的是点对点的连接，点对点连接需要显式地建立连接、销毁连接、选择协议（TCP/UDP）和处理错误等，而ZMQ屏蔽了这些细节，让你的网络编程更为简单。ZMQ用于node与node间的通信，node可以是主机或者是进程。

引用官方的说法： “ZMQ(以下ZeroMQ简称ZMQ)是一个简单好用的传输层，像框架一样的一个socket library，他使得Socket编程更加简单、简洁和性能更高。是一个消息处理队列库，可在多个线程、内核和主机盒之间弹性伸缩。ZMQ的明确目标是“成为标准网络协议栈的一部分，之后进入Linux内核”。现在还未看到它们的成功。但是，它无疑是极具前景的、并且是人们更加需要的“传统”BSD套接字之上的一 层封装。ZMQ让编写高性能网络应用程序极为简单和有趣。”

特点是：

- 高性能，非持久化
- 跨平台：支持Linux、Windows、OS X等
- 多语言支持； C、C++、Java、.NET、Python等30多种开发语言
- 可单独部署或集成到应用中使用
- 可作为Socket通信库使用

与RabbitMQ相比，ZMQ并不像是一个传统意义上的消息队列服务器，事实上，它也根本不是一个服务器，更像一个底层的网络通讯库，在Socket API之上做了一层封装，将网络通讯、进程通讯和线程通讯抽象为统一的API接口。支持“Request-Reply “，”Publisher-Subscriber“，”Parallel Pipeline”三种基本模型和扩展模型。

 

ZeroMQ高性能设计要点：

1、无锁的队列模型

  对于跨线程间的交互（用户端和session）之间的数据交换通道pipe，采用无锁的队列算法CAS；在pipe两端注册有异步事件，在读或者写消息到pipe的时，会自动触发读写事件。

2、批量处理的算法

  对于传统的消息处理，每个消息在发送和接收的时候，都需要系统的调用，这样对于大量的消息，系统的开销比较大，zeroMQ对于批量的消息，进行了适应性的优化，可以批量的接收和发送消息。

3、多核下的线程绑定，无须CPU切换

  区别于传统的多线程并发模式，信号量或者临界区， zeroMQ充分利用多核的优势，每个核绑定运行一个工作者线程，避免多线程之间的CPU切换开销。

## 4 Kafka

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/middleware/mq/commmq-5.png')" alt="wxmp">

Kafka是一种高吞吐量的分布式发布订阅消息系统，它可以处理消费者规模的网站中的所有动作流数据。 这种动作（网页浏览，搜索和其他用户的行动）是在现代网络上的许多社会功能的一个关键因素。 这些数据通常是由于吞吐量的要求而通过处理日志和日志聚合来解决。 对于像Hadoop的一样的日志数据和离线分析系统，但又要求实时处理的限制，这是一个可行的解决方案。Kafka的目的是通过Hadoop的并行加载机制来统一线上和离线的消息处理，也是为了通过集群机来提供实时的消费。

Kafka是一种高吞吐量的分布式发布订阅消息系统，有如下特性：

- 通过O(1)的磁盘数据结构提供消息的持久化，这种结构对于即使数以TB的消息存储也能够保持长时间的稳定性能。（文件追加的方式写入数据，过期的数据定期删除）
- 高吞吐量：即使是非常普通的硬件Kafka也可以支持每秒数百万的消息
- 支持通过Kafka服务器和消费机集群来分区消息
- 支持Hadoop并行数据加载

 

Kafka相关概念

- Broker

Kafka集群包含一个或多个服务器，这种服务器被称为broker[5]

- Topic

每条发布到Kafka集群的消息都有一个类别，这个类别被称为Topic。（物理上不同Topic的消息分开存储，逻辑上一个Topic的消息虽然保存于一个或多个broker上但用户只需指定消息的Topic即可生产或消费数据而不必关心数据存于何处）

- Partition

Parition是物理上的概念，每个Topic包含一个或多个Partition.

- Producer

负责发布消息到Kafka broker

- Consumer

消息消费者，向Kafka broker读取消息的客户端。

- Consumer Group

每个Consumer属于一个特定的Consumer Group（可为每个Consumer指定group name，若不指定group name则属于默认的group）。

 

一般应用在大数据日志处理或对实时性（少量延迟），可靠性（少量丢数据）要求稍低的场景使用。

## 5 RocketMQ

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/middleware/mq/commmq-6.png')" alt="wxmp">


RocketMQ是阿里开源的消息中间件，纯Java开发，具有高吞吐量、高可用性、适合大规模分布式系统应用的特点。RocketMQ思路起源于Kafka，但并不是简单的复制，它对消息的可靠传输及事务性做了优化，目前在阿里集团被广泛应用于交易、充值、流计算、消息推送、日志流式处理、binglog分发等场景，支撑了阿里多次双十一活动。

因为是阿里内部从实践到产品的产物，因此里面很多接口、api并不是很普遍适用。可靠性毋庸置疑，而且与Kafka一脉相承（甚至更优），性能强劲，支持海量堆积。

## 6 Apollo

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/middleware/mq/commmq-7.png')" alt="wxmp">


Apache ActiveMQ 是一个非常流行、强大、开源的消息和集成模式（Integration Patterns）服务器，速度快、支持多种跨语言客户端和协议，易于使用企业集成模式（Enterprise Integration Patterns），拥有许多先进的特性，完全支持JMS 1.1和J2EE 1.4规范。ActiveMQ 基于Apache 2.0许可。 

Apollo 以 ActiveMQ原型为基础，是一个更快、更可靠、更易于维护的消息代理工具。Apache 号称 Apollo 为最快、最强健的STOMP（Streaming Text Orientated Message Protocol，流文本定向消息协议）服务器。 

**Apollo的特性如下：** 

- 支持Stomp 1.0和Stomp 1.1协议
- 主题和队列
- 队列浏览器
- 主题持久订阅
- 镜像队列
- 可靠的消息传递
- 消息过期和交换
- 消息选择器
- JAAS验证
- 基于ACL的授权
- 支持SSL/TLS，证书验证
- REST Management API

## 参考文章
* https://www.cnblogs.com/xifengxiaoma/p/9391647.html