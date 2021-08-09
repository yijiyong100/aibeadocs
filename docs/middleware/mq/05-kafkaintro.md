---
title: 消息队列-kafka精彩总结
---

::: tip
本文主要是介绍 消息队列-kafka精彩总结 。
:::

[[toc]]

## 【Kafka从入门到放弃系列 零】Kafka看这一篇就够了


系统间的耦合高怎么办，我们如何不让一个服务过于庞大，一个好的方式就是依据具体的功能模块拆分服务，降低服务的耦合度，服务间的交互可以通过消息传递数据来实现，除此之外Kafka非常适合在线日志收集等高吞吐场景，kafka有**更好的吞吐量，内置分区，副本和故障转移**，这有利于处理大规模的消息，所以kafka被各大公司广泛运用于消息队列的构建：

- 1. **消息队列模型-生产者消费者模型**
- 2. **Kafka基本概念和架构模型**
- 3. **Kafka工作流程和文件存储机制**
- 4. **生产者策略：分区策略、ACK机制、故障转移机制、Kafka可靠高效原因**
- 5. **消费者策略：消费方式、分区分配策略、offset的维护**
- 6. **Zookeeper管理**
- 7. **Kafka框架搭建实战**

**适合人群**：不了解Kafka的新手，对Kafka的实现机制感兴趣的技术人员

本文的全部内容来自我个人在Kafka学习过程中整理的博客，是该博客专栏的精华部分。在书写过程中过滤了流程性的上下文，例如部署环境、配置文件等，而致力于向读者讲述其中的核心部分，如果读者有意对过程性内容深入探究，可以移步[MaoLinTian的Blog](https://tianmaolin.blog.csdn.net/article/details/109325831)，在这篇索引目录里找到答案分布式技术相关专栏索引
<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/middleware/mq/kafkaintro/20210111211613838.png')" alt="wxmp">

## 消息队列模型-生产者消费者模型

在正式介绍Kafka之前，先来了解下什么是**生产者消费者模式**，以及什么是**消息队列**，再由消息队列聊到**Kafka**。

**生产者消费者模型**具体来讲，就是在一个系统中，存在生产者和消费者两种角色，他们通过内存缓冲区进行通信，生产者生产消费者需要的资料，消费者把资料做成产品。可以理解为生产者不停的生产馒头，然后把馒头扔到筐里，消费者不停的从筐里拿出馒头吃。具体到消息系统可以这么理解：

- **生产者**：消息的制造者，生产馒头的一方
- **管道容器**：消息的传递者，也就是放馒头的筐
- **消费者**：消息的消费者，也就是吃馒头的一方

其中最重要的环节就是这个管道容器，其实就是一个**消息队列**

### 消息队列的应用场景

消息队列具有**低耦合、可靠投递、广播、流量控制、最终一致性**等一系列功能，成为**异步RPC**的主要手段之一。那么为什么要使用队列呢？我这么理解：

- 1，在分布式高并发场景下，如何保证系统性能不受影响，请求不会超时中断并且能让用户无感知（**削峰、减少响应所需时间**）,一般网站响应时间超过200ms就难以忍受了，高并发同步向数据库内写数据，数据库会扛不住压力的，而且响应速度也会明显减慢。
- 2，不同系统之间的异步通信如何实现（ **降低系统耦合性**）,一个系统必然有很多模块组成，不同模块各自有实现，各自有自己的迭代，如果耦合性低，不存在强依赖，那最好了，微服务架构的思想也类似此，降低耦合性。

第一个场景下，例如有个业务：下班打车，企业滴滴，晚上8点半上地这边爆满，各种打车订单同时涌入系统，系统要爆，加上消息队列后，订单进入消息队列，然后反馈给用户订单在处理，然后按照入队顺序一个个处理该消息，直到消费到该消息订单后才将订单入库，当然这个时候才能反馈给用户说打车成功。**这样有效的抵抗了峰值时间的冲击**。

第二个场景下，系统的不同模块之间各自有各自的实现。模块之间不存在直接调用，那么新增模块或者修改模块就对其他模块影响较小，所以如果有个消息系统在中间作为中转，**消息发送者将消息发送至分布式消息队列即结束对消息的处理，消息接受者从分布式消息队列获取该消息后进行后续处理，并不需要知道该消息从何而来**。对新增业务，只要对该类消息感兴趣，即可订阅该消息，对原有系统和业务没有任何影响，从而实现网站业务的可扩展性设计。

### 消息队列模型

消息队列目前有两种协议：JMS和AMQP，JMS轻量不能跨平台，AMQP性能强但是复杂，感觉就是美图秀秀和PS的区别，但是大家用的多的还是美图秀秀，那么就**以JMS为主**吧，咱就好好用轮子吧。

**1 点到点（P2P）模型**

使用队列（Queue）作为消息通信载体：满足**生产者与消费者模式**，**一条消息只能被一个消费者使用，未被消费的消息在队列中保留直到被消费或超时**。
<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/middleware/mq/kafkaintro/20210111212418359.png')" alt="wxmp">

假如我们存在这样⼀种情况：我们需要将⽣产者产⽣的消息分发给多个消费者，并且每个消费者都能接收到完全的消息内容。这种情况，队列模型就不好解决了

**2 发布/订阅（Pub/Sub）模型**

发布订阅模型（Pub/Sub） 使用主题（Topic）作为消息通信载体，类似于广播模式,发布者发布一条消息，**该消息通过主题传递给所有的订阅者**，一条消息可以被多个消费者使用。
<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/middleware/mq/kafkaintro/20210111212525562.png')" alt="wxmp">

**在一条消息广播之后才订阅的用户则是收不到该条消息的**。在发布 - 订阅模型中，如果只有⼀个订阅者，那它和队列模型就基本是⼀样的了。所以说，**发布 - 订阅模型在功能层⾯上是可以兼容点到点（P2P）模型的**

### 消息队列问题

系统里平白无故加入一个消息队列服务器当然会影响系统的整体性能，增加系统的复杂性，还需要担心异步消息发送的一致性问，消息服务器的稳定性等问题：

- **系统可用性降低**： 系统可用性在某种程度上降低，在加入MQ之前，不用考虑消息丢失或者说MQ挂掉等等的情况，但是，引入MQ之后就需要去考虑了
- **系统复杂性提高**： 加入MQ之后，需要保证**消息没有被重复消费、处理消息丢失的情况、保证消息传递的顺序性**，消息服务器有没有宕机等问题
- **一致性问题**： 消息队列可以实现异步，异步确实可以提高系统响应速度。但是，万一消息的真正消费者并没有正确消费消息就会导致数据不一致的情况了。

其实这些问题就是作为一个消息队列中间件所要面对的挑战，这个消息中间件该如何设计才能解决消息框架可能遇到的一系列问题：**故障转移恢复、数据一致性保证、数据可靠性保证**

## Kafka基本概念和架构模型

了解了生产者-消费者模型以及消息队列模型后，我们知道如果系统需要**解耦、削峰**，一定要使用消息队列，但是消息队列存在诸多问题，所以需要一个功能完备的中间件来解决这些问题。

Kafka 是⼀个分布式流式处理平台，与大多数消息系统比较，kafka有**更好的吞吐量，内置分区，副本和故障转移**。kafka流平台具有三个关键功能：

- 1. **消息队列【传递消息】**：发布和订阅消息流，这个功能类似于消息队列，这也是 Kafka 也被归类为消息队列的原因。
- 2. **容错的持久方式存储记录消息流【存储消息】**： Kafka 会把消息持久化到磁盘，有效避免了消息丢失的⻛险·。
- 3. **流式处理平台【处理消息】**： 在消息发布的时候进⾏处理，Kafka 提供了⼀个完整的流式处理类库。

所以Kafka 主要有两⼤应⽤场景：首先基于传递和存储消息的有效和可靠性，**kafka可以建⽴实时流数据管道，以可靠地在系统或应⽤程序之间获取数据**。其次基于处理消息数据流的完备能力，**kafka可以构建实时的流数据处理程序来转换或处理数据流**。

### Kafka架构模型

看了那么多的Kafka的优点，那么相信各位对Kafka的实现架构有了一些好奇，下图为一个Kafka的基本架构图，接下来我会对其中的概念分点详述并举例说明
<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/middleware/mq/kafkaintro/20210111213626819.png')" alt="wxmp">

**1 Producer（生产者）**：负责发布消息到Kafka broker，就是向kafka broker发消息的客户端。

**2 主题和分区**：**一个主题包含一个或多个Partition**

- **Topics（主题）**: 属于**特定类别的消息流**称为主题。 数据存储在主题中。主题被拆分成分区。 对于每个主题，Kafka保存一个分区的数据。 每个这样的分区包含不可变有序序列的消息。 分区被实现为具有相等大小的一组分段文件。（物理上不同Topic的消息分开存储，逻辑上一个Topic的消息虽然保存于一个或多个broker上但用户只需指定消息的Topic即可生产或消费数据而不必关心数据存于何处），也可以理解为一个队列，通过对消息指定主题可以将消息分类，消费者可以只关注自己需要的Topic中的消息。
- **Partition（分区）**，Parition是**物理**上的概念，每个Topic包含一个或多个Partition。每个Partition包含N个**副本**。为了实现扩展性，一个非常大的topic可以分布到多个broker（即服务器）上，一个topic可以分为多个partition，每个partition是一个有序的队列， partition中的每条消息都会被分配一个有序的id（offset **分区偏移量**）。kafka只保证按一个partition中的顺序将消息发给consumer，不保证一个topic的整体（多个partition间）的顺序，
- **Leader（领导者）【针对某个分区的Leader副本】**： Leader 负责指定分区的所有读取和写入的操作。 每个分区都有一个服务器充当Leader。
- **Follower（追随者）【针对某个分区的Follower副本】**：跟随领导者指令的节点被称为Follower。 如果领导失败，一个追随者将自动成为新的领导者。 跟随者作为正常消费者，拉取消息并更新其自己的数据存储。 **follower从不用来读取或写入数据**， 它们用于防止数据丢失。

**3 Kafka集群和Kafka服务器**：**一个Kafka集群包含多个Kafka服务器**

- **Kafka Cluster（Kafka集群）**：Kafka有多个服务器被称为Kafka集群。 可以扩展Kafka集群，无需停机。 这些集群用于管理消息数据的持久性和复制。
- **Broker（Kafka服务器）**：一台kafka服务器就是一个broker。一个集群由多个broker组成。一个broker可以容纳多个topic。

**4 Consumer(消费者)和 Consumer Group（消费者集群）**：**一个消费者集群包含多个消费者**

- **Consumer Group（消费者集群）**：consumer group是kafka提供的可扩展且具有容错性的消费者机制。组内可以有多个消费者或消费者实例，它们共享一个公共的group ID。组内的所有消费者协调在一起来共享订阅主题的所有分区。
- **Consumer(消费者)**：消息消费者，向Kafka broker读取消息的客户端。

综合而言我理解就是，**Kafka集群和Kafka服务器属于物理机器上的概念，而主题和分区属于发出去的消息的分类，一个纵向，一个横向，一个broker上可以有很多主题的分区，一个主题也可以在很多broker上放置分区，是多对多的关系**。由于这部分比较难理解，这里我举个例子：

### Kafka概念举例

我在**有三台机器【broker的id分别为101、102、103】的Kafka集群上创建了一个主题为tml-kafka的集群，指定副本数为3**，查看详情时第一个行显示所有partitions的一个总结，以下每一行给出一个partition中的信息，如果我们只有一个partition，则只显示一行。

- **leader 和follwer都是针对某个分区的概念**，例如对于分区0，其leader在0也就是broker为101的机器，而对于分区1和分区2其leader在2也就是broker为103的机器上
- **Replicas** 显示给定partiton所有副本所存储节点的节点列表，不管该节点是否是leader或者是否存活，这里就是我们的三台机器、0、1、2，分别对应101、102、103。
- **Isr 副本**都已同步的的节点集合，这个集合中的所有节点都是存活状态，并且跟leader同步,这里也是我们的三台机器、0、1、2，分别对应101、102、103.说明我们三台机器都在集群里没有脱机，ISR的概念在后续会提到。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/middleware/mq/kafkaintro/20200902221824365.png')" alt="wxmp">

## Kafka工作流程和文件存储机制

了解了Kafka的基本架构和示例后我们来了解下Kafka到底是怎么工作的，以及消息是如何在Kafka持久化存储的。

### Kafka的工作流程

通过基础概念的学习可以知道kafka的消息分为Topic，而Topic从逻辑上又可以划分为Partion，关于Topic&Partion需要注意以下几点：

- 一个 Topic可以认为是一类消息，每个 topic 将被分成多个 Partion，每个 Partion在存储层面是 **append log** 文件。Kafka 机制中，producer push 来的消息是追加（append）到 Partion中的，这是一种**顺序写磁盘的机制**，效率远高于随机写内存
- **任何发布到partition 的消息都会被追加到log文件的尾部**，每条消息在文件中的位置称为 offset（偏移量），offset 为一个 long 型的数字，它**唯一标记一条消息**。**Kafka只保证Partion内的消息有序，不能保证全局Topic的消息有序**
- 消费者组中的每个消费者，都会**实时记录自己消费到了哪个 offset**，以便出错恢复时，从上次的位置继续消费

下图为一个消息写入过程，Producer向同一主题的不同分区写消息，也即不停的在各个append log文件后顺序追加消息，每追加一个append log文件偏移量加一，只有单append log文件中有序

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/middleware/mq/kafkaintro/20210111223015825.png')" alt="wxmp">

整体消息的生产传递和消费的的流程如下图所示，注意这里偏移量数字从consumer消费的视角来看，**无论是生产者还是消费者对消息的处理都是偏移量从小到大的**：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/middleware/mq/kafkaintro/20200906103040917.png')" alt="wxmp">

消息由生产者生产，并发往Kafka集群，Kafka集群获取到消息后再发往消费者，以下是Pub-Sub消息的逐步工作流程 ：

- 1. **Producer生产者定期向Kafka集群发送消息**，在发送消息之前，会对消息进行分类，即Topic, Kafka集群存储该Topic配置的分区中的所有消息。 它确保消息在分区之间平等共享。 如果生产者发送两个消息并且有两个分区，Kafka将在第一分区中存储一个消息，在第二分区中存储第二消息。
- 2. **Kafk接收生产者消息并转发给消费者**，消费者订阅特定主题，一旦消费者订阅Topic，Kafka将向消费者提供Topic下分区的当前offset，并且还将偏移保存在Zookeeper系统中。消费者通过与kafka集群建立长连接的方式，不断地从集群中拉取消息，然后可以对这些消息进行处理，一旦Kafka收到来自生产者的消息，它将这些消息转发给消费者。
- 3. **消费者将收到消息进行处理**,一旦消息被处理，消费者将向Kafka代理发送确认。消费者需要实时的记录自己消费到了哪个offset，便于后续发生故障恢复后继续消费。Kafka 0.9版本之前，consumer默认将offset保存在Zookeeper中，从0.9版本开始，consumer默认将offset保存在Kafka一个内置的topic中 一旦Kafka收到确认，它将offset更改为新值，并在Zookeeper中更新它。

以上流程将重复，直到消费者停止请求。消费者可以随时回退/跳到所需的主题偏移量，并阅读所有后续消息

### Kafka文件存储机制

我们上文提到每个partion是一个**append log** 文件，虽然我们已经把Topic物理上划分为多个Partion用来**负载均衡**，但即使是对一个Partition 而言，如果消息量过大的话也会有堵塞的风险，所以我们需要定期清理消息。

清理消息时如果只有一个Partion，那么就得全盘清除，这将对消息文件的维护以及已消费的消息的清理带来严重的影响。**所以我们需要在物理上进一步细分Partition**

- Kafka**以 segment 为单位将 partition 进一步细分**，每个 partition（目录）相当于一个巨型文件被平均分配到多个**大小相等的 segment**（段）数据文件中（每个 segment 文件中消息数量不一定相等）

这种特性也方便 old segment 的删除，即方便已被消费的消息的清理，提高磁盘的利用率，每个 partition 只需要支持顺序读写就行。

#### Partition&Segment

接下来我们发送一条消息，看看在物理存储上是什么样的，在机器上我们可以看到，**一组index和log**，这就是**一个segment**的内容：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/middleware/mq/kafkaintro/20200906105411597.png')" alt="wxmp">

**segment 文件由两部分组成，分别为 “.index” 文件和 “.log” 文件，分别表示为 segment 索引文件和数据文件**。这两个文件的命令规则为：**partition 全局的第一个 segment 从 0 开始**，后续每个 segment 文件名为上一个 segment 文件最后一条消息的 offset 值，数值大小为 64 位，

20 位数字字符长度，没有数字用 0 填充，我这里只有一条数据，所以是从0开始的，整体的存储架构如下：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/middleware/mq/kafkaintro/20200906111447733.png')" alt="wxmp">

#### Segment存储结构

通过以上对Segment落盘文件的了解，我们基本搞清楚了Segment的结构，当然我这里是单segment，看不出来。这里从网上找了一个大量文件的示例：

```java
//第一段segment，起始位置为0
00000000000000000000.index
00000000000000000000.log
//第二段segment，起始位置为170410
00000000000000170410.index
00000000000000170410.log
//第三段segment，起始位置为239430
00000000000000239430.index
00000000000000239430.log
```

以上面的 segment 文件为例，展示出 segment：00000000000000170410 的 “.index” 文件和 “.log” 文件的对应的关系，如下图：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/middleware/mq/kafkaintro/20200906111554519.png')" alt="wxmp">

如上图，“.index” 索引文件存储大量的元数据，“.log” 数据文件存储大量的消息，索引文件中的元数据指向对应数据文件中 message 的物理偏移地址。其中以 “.index” 索引文件中的元数据 [3, 348] 为例，在 **“.log” 数据文件表示第 3 个消息，即在全局 partition 中表示 170410+3=170413 个消息，该消息的segementoffset为3，全局offset为170413，物理偏移地址为 348（注意此物理偏移地址不是消息数量的offset，而是消息的内存存储偏移量 ）**

### 快速定位partion中消息

既然消息在Partion中被分为了一段段的segment，那么我们如何快速定位消息的位置，来精准的对消息进行操作呢？以上图为例，读取 offset=170418 的消息：

- 首先查找 segment 文件，其中 00000000000000000000.index 为最开始的文件，第二个文件为 00000000000000170410.index（起始偏移为 170410+1=170411），而第三个文件为 00000000000000239430.index（起始偏移为 239430+1=239431），所以这个 offset=170418 就落到了第二个文件之中。其它后续文件依次类推，以其偏移量命名并排列这些文件，然后根据**二分查找法**就可以快速定位到具体文件位置。
- 其次根据 00000000000000170410.index 文件中的170418 -170410=8，得出是该segment 中的第8个消息，再次依据**二分查找法**定位到该索引，得到segment内[**消息偏移量，物理偏移量**]坐标 **[8,1325]** 定位到 00000000000000170410.log 文件中的 1325 的位置进行读取。
- 找到1325位置后，**顺序读取**消息即可，确定读完本条消息【本条消息读到哪里结束】由消息的物理结构解决，消息都具有固定的物理结构，包括：offset（8 Bytes）、消息体的大小（4 Bytes）、crc32（4 Bytes）、magic（1 Byte）、attributes（1 Byte）、key length（4 Bytes）、key（K Bytes）、payload（N Bytes）等等字段，可以确定一条消息的大小，即读取到哪里截止。

以上就是定位消息的详细方法，通过索引的方式，可以在kafka顺序写磁盘的基础上仍然能快速的找到对应的消息。

## 生产者策略：分区策略、数据可靠性保证、故障转移机制

前面提到消息系统的三大问题： **系统可用性降低**，**系统复杂性提高**，**数据一致性问题**，为了解决这些问题，Kafka支持一些机制，例如：

- 使用**分区策略来提高系统可用性和进行负载均衡**【高可扩展】
- 使用**ACK应答机制**来保障数据的可靠性【副本同步策略、ISR、Exactly Once语义】保证的一系列策略来解决系统复杂性问题，例如保证**消息的不重不漏**【高并发】
- 使用**故障转移机制**【HW&LEO概念、故障同步机制、Leader选举】来**保证消息的数据一致性**，防止意外宕机丢数据导致不一致【高可用】

接下来就这三个机制以及其附加的策略来进行详细的讨论。

### 生产者分区策略

Kafka 每个 topic 的 partition 有 N 个副本（replicas），其中 N（大于等于 1）是 topic 的复制因子（replica fator）的个数。Kafka 通过多副本机制实现故障自动转移，当 Kafka 集群中出现 broker 失效时，副本机制可保证服务可用。对于任何一个 partition，**它的 N 个 replicas 中，其中一个 replica 为 leader，其他都为 follower**，leader 负责处理 partition 的所有读写请求，follower 则负责被动地去复制 leader 上的数据。
<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/middleware/mq/kafkaintro/20200906152851683.png')" alt="wxmp">

#### 分区的原因

为什么要分区呢？对于分布式系统的三高我们已经很熟悉了，我们再来强调一下：

- **高可扩展**：方便在集群中扩展，每个 Partition 可以通过调整以适应它所在的机器，而一个 topic，又可以有多个 Partition 组成，因此整个集群就可以适应任意大小的数据了
- **高并发**：可以提高并发，因为可以以 Partition 为单位读写了，可以并发的往一个Topic的多个Partion中发送消息
- **高可用**：当然有了高可用和高可扩展了，我们还希望整个集群稳定，并发的情况下消息不会有丢失现象，为了保证数据的可靠性，我们每个分区都有多个副本来保证不丢消息，如果 leader 所在的 broker 发生故障或宕机，对应 partition 将因无 leader 而不能处理客户端请求，这时副本的作用就体现出来了：一个新 leader 将从 follower 中被选举出来并继续处理客户端的请求

如上图所示展示的，我们分布式集群的特性才能体现出来，其实不光是Kafka，所有的分布式中间件，都需要满足以上的特性。

#### 分区的原则

producer 采用 push 模式将消息发布到 broker，每条消息都被 append 到 patition 中，属于顺序写磁盘（顺序写磁盘效率比随机写内存要高，保障 kafka 吞吐率）。producer 发送消息到 broker 时，既然分区了，我们怎么知道生产者的消息该发往哪个分区呢？producer 会根据**分区算法**选择将其存储到哪一个 partition。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/middleware/mq/kafkaintro/20200906153518606.png')" alt="wxmp">

从代码结构里我们可以看到实际上可以归纳为三种方法，也就是三种路由机制，决定消息被发往哪个分区，分别是：

- 1. 指明 partition 的情况下，**直接将指明的值直接作为 partiton 值**；
- 2. 没有指明 partition 值但有 key 的情况下，**将 key 的 hash 值与 topic 的 partition数进行取余得到 partition 值**
- 3. 既没有 partition 值又没有 key 值的情况下，**第一次调用时随机生成一个整数（后面每次调用在这个整数上自增），将这个值与 topic 可用的 partition 总数取余得到 partition值，也就是常说的 round-robin 算法**【轮询算法】。

可以说分区策略对于Kafka来说是三高机制的基础，有了分区才能实现Kafka的高可扩展，在这样的构建模型之上我们来看看基于分区机制，Kafka如何实现**数据可靠性【高并发】\**和\**故障转移【高可用】**。

### ACK应答机制

为保证 producer 发送的数据，能可靠的发送到指定的 topic，**topic 的每个 partition 收到producer 发送的数据后，都需要向 producer 发送 ack**（acknowledgement 确认收到），如果producer 收到 ack，就会进行下一轮的发送，否则重新发送数据。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/middleware/mq/kafkaintro/20200906155733326.png')" alt="wxmp">

那么基于此，因为在Kafka集群中一个分区会存在多个副本，leader负责读写，但同时需要把消息可靠的同步，防止消息丢失和遗漏或者重复。基于性能考虑，同时存在多种ACK应答机制。

Kafka 为用户提供了三种可靠性级别，**用户根据对可靠性和延迟的要求进行权衡**，当 producer 向 leader 发送数据时，可以通过 request.required.acks 参数来设置数据可靠性的级别：

1. request.required.acks = 0，producer 不停向leader发送数据，而不需要 leader 反馈成功消息，这种情况下数据传输效率最高，但是数据可靠性确是最低的。可能在发送过程中丢失数据，可能在 leader 宕机时丢失数据。【**传输效率最高，可靠性最低**】

2. request.required.acks = 1，这是默认情况，即：producer 发送数据到 leader，leader 写本地日志成功，返回客户端成功；此时 ISR 中的其它副本还没有来得及拉取该消息，如果此时 leader 宕机了，那么此次发送的消息就会丢失。【**传输效率中，可靠性中**】

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/middleware/mq/kafkaintro/20200906161201598.png')" alt="wxmp">

3. request.required.acks = -1（all），producer 发送数据给 leader，leader 收到数据后要等到 ISR 列表中的所有副本都同步数据完成后（强一致性），才向生产者返回成功消息，如果一直收不到成功消息，则认为发送数据失败会自动重发数据。这是可靠性最高的方案，当然，性能也会受到一定影响。【**传输效率低，可靠性高**】，同时**如果在 follower 同步完成后，broker 发送 ack 之前，leader 发生故障，那么会造成数据重复**
   
<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/middleware/mq/kafkaintro/20200906160858171.png')" alt="wxmp">

当 request.required.acks = -1时需要注意，如果要提高数据的可靠性，在设置 request.required.acks=-1 的同时，还需参数 `min.insync.replicas` 配合，如此才能发挥最大的功效。min.insync.replicas 这个参数用于设定 ISR 中的最小副本数，默认值为1，**当且仅当 request.required.acks 参数设置为-1时，此参数才生效。当 ISR 中的副本数少于 min.insync.replicas 配置的数量时，客户端会返回异常**：`org.apache.kafka.common.errors.NotEnoughReplicasExceptoin: Messages are rejected since there are fewer in-sync replicas than required`。通过将参数 min.insync.replicas 设置为 2，当 ISR 中实际副本数为 1 时（只有leader），将无法保证可靠性，**因为如果发送ack后leader宕机，那么此时该条消息就会被丢失，所以应该拒绝客户端的写请求以防止消息丢失**。在-1策略下有三个问题单独讨论一下：

#### 副本同步策略

我们知道当 request.required.acks=-1时需要ISR中的全部副本都同步完成，才返回ACK，但是其实在最终确定这个方案之前还有一些别的方案，讨论核心是那么到底多少foller副本同步完成，才发送ack呢？

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/middleware/mq/kafkaintro/20200906155003812.png')" alt="wxmp">

现有的两种方案我们选择了第二种，第一种占用的机器资源过多，造成了大量的数据冗余，而网络延迟对于Kafka的影响并不大。

#### ISR选举策略

采用全量副本同步方案后，我们发送ack的时机确定如下：**leader 收到数据，所有 follower 都开始同步数据**，但是设想如下情况：有一个 follower，因为某种故障，迟迟不能与 leader 进行同步，那 leader 就要一直等下去，直到它完成同步，才能发送 ack。这个问题怎么解决呢？我们引入ISR的概念

- **所有的副本（replicas）统称为 Assigned Replicas，即 AR**
- ISR 是 AR 中的一个子集，由 leader 维护 ISR列表，follower 从 leader 同步数据有一些延迟（由参数 replica.lag.time.max.ms **设置超时阈值**），超过阈值的 follower 将被剔除出 ISR， 存入 OSR（Outof-Sync Replicas）列表，新加入的 follower 也会先存放在 **OSR** 中
- **AR=ISR+OSR**，也就是**所有副本=可用副本+备用副本**。
- ISR列表包括：leader + 与leader保持同步的followers，Leader 发生故障之后，会从 ISR 中选举新的 leader

在这种机制下，ISR始终是动态保持稳定的集群，消息来了之后，leader先读取，然后推送到各个follwer里，保证ISR中各个副本处于同步状态，**只要所有ISR中的follwer都同步完成即可发布ACK**，leader挂掉后，立即能从ISR中选举新的leader来处理消息。

#### Exactly Once语义

对于一些非常重要的信息，消费者要求数据既不重复也不丢失，即 **Exactly Once 语义**。其实以上讨论的三种策略可以如此归类语义：

- 1. 将服务器 ACK 级别设置为 0，可以保证生产者每条消息只会被发送一次，即 At Most Once 语义，极容易丢失数据。
- 2. 将服务器 ACK 级别设置为 1，可以理解为碰运气语义，正常情况下，leader不宕机且刚好宕机前将数据同步给了副本的话不会丢失数据，其它情况就会造成数据的丢失。
- 3. 将服务器的 ACK 级别设置为-1，可以保证 Producer 到 Server 之间不会丢失数据，即 At Least Once 语义，At Least Once **可以保证数据不丢失，但是不能保证数据不重复**

顾名思义，我们一定是需要在不丢数据的基础上去去重，在 0.11 版本以前的 Kafka，对此是无能为力的，只能保证数据不丢失，再在下游消费者对数据做全局去重。对于多个下游应用的情况，每个都需要单独做全局去重，这就对性能造成了很大影响。

##### 幂等性【partion Exactly Once】

0.11 版本的 Kafka，引入了一项重大特性：幂等性。所谓的幂等性就是指 Producer 不论向 Server 发送多少次重复数据，Server 端都只会持久化一条。幂等性结合 At Least Once 语义，就构成了 Kafka 的 Exactly Once 语义。即：**At Least Once + 幂等性 = Exactly Once**

要启用幂等性，只需要将 Producer 的参数中 enable.idompotence 设置为 true 即可。Kafka的幂等性实现其实就是将原来下游需要做的去重放在了数据上游。开启幂等性的 Producer 在初始化的时候会被分配一个 PID，发往同一 Partition 的消息会附带 Sequence Number。而Broker 端会对<PID, Partition, SeqNumber>做缓存，当具有相同主键的消息提交时，Broker 只会持久化一条。但是 **PID 重启就会变化，同时不同的 Partition 也具有不同主键，所以幂等性无法保证跨分区跨会话的 Exactly Once**。

##### 生产者事务【topic Exactly Once】

为了实现跨分区跨会话的事务以及防止PID重启造成的数据重复，需要引入一个Topic全局唯一的 Transaction ID，并**将 Producer获得的PID和Transaction ID绑定**。这样当Producer重启后就可以通过正在进行的TransactionID 获得原来的 PID。为了管理 Transaction，Kafka 引入了一个新的组件 Transaction Coordinator。Producer 就是通过和 Transaction Coordinator 交互获得 Transaction ID 对应的任务状态TransactionCoordinator 还负责将事务所有写入 Kafka 的一个内部 Topic，这样即使整个服务重启，由于事务状态得到保存，进行中的事务状态可以得到恢复，从而继续进行。

### 故障转移机制

在数据可靠性保障策略中我们了解到如何通过分区和副本，以及动态的ISR和ACK机制来确保消息的可靠，那么接下来深入探讨下，**故障发生的时候，我们如何将集群恢复正常**？首先需要明确两个概念：LEO和HW：

- **Base Offset**：是起始位移，该副本中第一条消息的offset，如下图，这里的起始位移是0，如果一个日志文件写满1G后（默认1G后会log rolling），这个起始位移就不是0开始了。
- **HW（high watermark）**：副本的高水位值，**replica中leader副本和follower副本都会有这个值，通过它可以得知副本中已提交或已备份消息的范围，leader副本中的HW，决定了消费者能消费的最新消息能到哪个offset**。如下图所示，HW值为8，代表offset为[0,8]的9条消息都可以被消费到，它们是对消费者可见的，而[9,12]这4条消息由于未提交，对消费者是不可见的。注意HW最多达到LEO值时，这时可见范围不会包含HW值对应的那条消息了，如下图如果HW也是13，则消费的消息范围就是[0,12]。
- **LEO（log end offset）**：日志末端位移，代表日志文件中下一条待写入消息的offset，**这个offset上实际是没有消息的。不管是leader副本还是follower副本，都有这个值。当leader副本收到生产者的一条消息，LEO通常会自增1**，而follower副本需要从leader副本fetch到数据后，才会增加它的LEO，最后**leader副本会比较自己的LEO以及满足条件的follower副本上的LEO，选取两者中较小值作为新的HW，来更新自己的HW值**。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/middleware/mq/kafkaintro/20210112220157821.png')" alt="wxmp">

而leader和副本之间LEO及HW的更新时机如下：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/middleware/mq/kafkaintro/20210112223350399.png')" alt="wxmp">

- **remote LEO是保存在leader副本上的follower副本的LEO**，可以看出leader副本上保存所有副本的LEO，当然也包括自己的。remote LEO是保存在leader副本上的follower副本的LEO，可以看出leader副本上保存所有副本的LEO，当然也包括自己的。
- **follower LEO就是follower副本的LEO**，它的更新是在follower副本得到leader副本发送的数据并随后写入到log文件，就会更新自己的LEO

HW和LEO在消息流转的层面上过程如下。

#### 标准写入流程

在了解故障转移机制前，我们先来看看标准的写入流程是什么样的，这样在故障的时候我们可以看到故障发生在哪些节点影响标准写入流程，以及故障转移机制如何处理使其恢复正常：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/middleware/mq/kafkaintro/20200906164455851.png')" alt="wxmp">

整个过程分为如下几个步骤

- 1. producer发送消息4、5给leader【之前提到过只有leader可以读写数据】，leader收到后更新自己的LEO为5
- 2. fetch尝试更新remote LEO，因为此时leader的HW为3，且follower1和follower2的最小LEO也是3，所以remote LEO为3
- 3. leader判读ISR中哪些副本还和自己保持同步，剔除不能保持同步的follower，得出follower1和follower2都可以
- 4. leader计算自己的HW，取所有分区LEO的最小值为HW为3
- 5. leader将消息4、5以及自己的HW发往follower1和follower2，follower1和follower2开始向自己的log写日志并更新消息4、5，但是follower1更新的快些，leo为5，而follower2更新的慢些，leo为4
- 6. fetch再次更新remote LEO，取所有follower中的最小LEO为4，然后更新Leader的HW为4
- 7. leader将自己的HW发往follower1和follower2，直到follower2同步完了更新自己的LEO为5，remote LEO为5，leaderHW为5，更新follower2中的HW为5则同步结束

实质上，**Leader的HW是所有LEO最短的offset，并且是消费者需要认定的offset，Follower的HW则是Leader的HW和自身LEO取最小值，也就是长度不能超过消费者认定的offset**Kafka 的复制机制既不是完全的同步复制，也不是单纯的异步复制。

- 同步复制要求所有能工作的 follower 都复制完，这条消息才会被 commit，这种复制方式受限于复制最慢的 follower，会极大的影响吞吐率。**也就是 request.required.acks = -1策略**
- 异步复制方式下，follower 异步的从 leader 复制数据，数据只要被 leader 写入 log 就被认为已经 commit，这种情况下如果 follower 都还没有复制完，落后于 leader 时，突然 leader 宕机，则会丢失数据，降低可靠性，**也就是 request.required.acks = 1策略**

而 Kafka 使用`request.required.acks = -1 + ISR` 的策略则在可靠性和吞吐率方面取得了较好的平衡，**同步复制并干掉复制慢的副本，只同步ISR中的Follwer**，

#### 故障转移机制

当不同的机器宕机故障时来看看ISR如何处理集群以及消息，分为 follower 故障和leader故障：

- **follower故障**，follower 发生故障后会被临时踢出 ISR，待该 follower 恢复后，follower 会读取本地磁盘记录的上次的 follower HW，并**将 log 文件高于follower HW 的【follower HW一定小于leader HW】部分截取掉，令副本的LEO与故障时的follower HW一致，然后follower LEO 开始从 leader 同步**。等该 follower 的 LEO 大于等于该 Partition 的 的 HW【**也就是leader的HW**】，即 follower 追上 leader 之后，就可以重新加入 ISR 了。你可能会问为什么不从follower的LEO之后开始截呢？试想一下，如果follower故障离场后，leader也故障离场，一个LEO比故障follower低的ISR follower当选为新leader，那么故障follower回归后会比新leader多消息，这显然造成了数据不一致。
- **leader 故障**，leader 发生故障之后，会从 ISR 中选出一个新的 leader之后，为保证多个副本之间的数据一致性，其余的 follower 会先将各自的 log 文件高于HW【**也就是leader的HW**】的部分截掉，然后从新的 leader同步数据。如果新leader的LEO就是HW，则直接接收新的消息即可，如果是其它某个Follower的LEO是HW，则从新Leader同步Leader的LEO-HW之间的消息给所有副本

总而言之，要以所有副本都同步好的**最新的HW为准（这样可以保证follower的消息永远是小于等于leader的）**。但这只是处理方法，并不能保证数据不重复或者不丢失，我们来看一种数据重复的案例： **Leader宕机**：考虑这样一种场景：acks=-1，部分 ISR 副本完成同步，此时leader挂掉，如下图所示：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/middleware/mq/kafkaintro/20200906170445360.png')" alt="wxmp">

整个过程分为如下几个步骤

- 1. follower1 同步了消息 4、5，follower2 同步了消息 4，HW为4。
- 2. leader宕机，由于还未收到follower2 同步完成的消息，所以没有给生产者发送ACK，与此同时 follower1 被选举为 leader，follower2从- follower1开始同步数据。当然如果follower2被选为leader，那么follower就需要截断自己的消息5。
- 3. producer未收到ACK，于是重新发送，发送了给了新的leader(老的follower1)，但因为follower1其实已经同步了4、5，所以此时来的消息就是重复消息。

这样就出现了**数据重复**的现象，**所以HW&LEO机制只能保证副本之间保持同步，并不能保证数据不重复或不丢失，要想都保证，需要结合ACK机制食用**

#### Leader选举

在可能发生的故障中，当Leader挂了的时候我们需要选举新的leader，遵循如下策略：Kafka 在 ZooKeeper 中为每一个 partition 动态的维护了一个 ISR，这个 ISR 里的所有 replica 都与 leader 保持同步，**只有 ISR 里的成员才能有被选为 leader 的可能。**

当然也有 **极端情况**：当 ISR 中至少有一个 follower 时（ISR 包括 leader），Kafka 可以确保已经 commit 的消息不丢失，但如果某一个 partition 的所有 replica 都挂了，自然就无法保证数据不丢失了。这种情况下如何进行 leader 选举呢？通常有两种方案：

- 等待 ISR 中任意一个 replica 恢复过来，并且选它作为 leader【**高可靠性**】，如果一定要等待 ISR 中的 replica 恢复过来，不可用的时间就可能会相对较长。而且如果 ISR 中所有的 replica 都无法恢复了，或者数据丢失了，这个 partition 将永远不可用。
- 选择第一个恢复过来的 replica（并不一定是在 ISR 中）作为leader【**高可用性**】，选择第一个恢复过来的 replica 作为 leader，如果这个 replica 不是 ISR 中的 replica，那么，它可能并不具备所有已经 commit 的消息，从而造成消息丢失。

默认情况下，Kafka 采用第二种策略，即 unclean.leader.election.enable=true，也可以将此参数设置为 false 来启用第一种策略

### Kafka可靠高效原因

Kafka是如何保证高效读写数据的呢，有三点支持：**分布式读写、顺序写磁盘以及零拷贝技术**，其实前两点在之前的blog中也有提到

- **分布式读写**，我们提到的各种策略都是为了满足分布式的可靠高效读写
- **顺序写磁盘**，Kafka 的 producer 生产数据，要写入到 log 文件中，写的过程是一直追加到文件末端，为顺序写。同样的磁盘，顺序写能到 600M/s，而随机写只有 100K/s。这与磁盘的机械机构有关，顺序写之所以快，是因为其**省去了大量磁头寻址的时间**。
- **零拷贝技术**，简单来说就是数据不需要经过用户态，传统的文件读写或者网络传输，通常需要将数据从内核态转换为用户态。应用程序读取用户态内存数据，写入文件 / Socket之前，需要从用户态转换为内核态之后才可以写入文件或者网卡当中，而Kafka使用零拷贝技术让数据直接在内核态中进行传输。详细原理可以参照[Kafka是如何利用零拷贝提高性能的](https://www.cnblogs.com/zz-ksw/p/12801632.html)

通过以上这几种技术可以实现Kafka的高并发读写

## 消费者策略：消费方式、分区分配策略、offset的维护

聊完了生产者策略，知道了消息是如何发送到Kafka集群并且保证不重不漏，以及在故障时如何保证多个副本的数据一致性之后，我们再从消费端来看下，消费者是如何消费消息的。

### 两种消费方式

消息有两种方式被投递，一种是broker推给消费者，一种是消费者从broker拉。这两种方式各自有优缺点：

- **push 模式很难适应消费速率不同的消费者**，因为消息发送速率是由 broker 决定的。它的目标是尽可能以最快速度传递消息，但是这样很容易造成 consumer 来不及处理消息，典型的表现就是拒绝服务以及网络拥塞。
- **pull 模式则可以根据 consumer 的消费能力以适当的速率消费消息**。pull 模式不足之处是，如果 kafka 没有数据，消费者可能会陷入循环中，一直返回空数据

Kafka 采取的是pull 模式，它可简化 broker 的设计，consumer 可自主控制消费消息的速率，同时 consumer 可以自己控制消费：

- 控制消费方式——**既可批量消费也可逐条消费**，同时还能选择不同的提交方式从而实现不同的传输语义
- 超时返回机制——Kafka 的消费者在消费数据时会传入一个时长参数 timeout，如果当前没有数据可供消费，consumer 会等待一段时间之后再返回，这段时长即为 timeout

通过pull以及一定的策略可以满足Kafka的消费诉求。需要注意：

- 如果消费线程大于 patition 数量，则有些线程将收不到消息；
- 如果 patition 数量大于消费线程数，则有些线程多收到多个 patition 的消息；如果一个线程消费多个 patition，则无法保证你收到的topic消息的顺序，而一个 patition 内的消息是有序的。

这三点需要注意，消息的消费和分区个数的关系。

### 消费者分区分配策略

一个 consumer group 中有多个 consumer，一个 topic 有多个 partition，所以必然会涉及到 partition 的分配问题，即确定那个 partition 由哪个 consumer 来消费。Kafka 有三种分配策略： **RoundRobin， Range，Sticky**。。

- 目前我们还不能自定义分区分配策略，只能通过partition.assignment.strategy参数选择 range 或 roundrobin。**partition.assignment.strategy参数默认的值是range**
- **同一个组内同一分区只能被一个消费者消费，可以理解，如果一个组内多个消费者消费同一个分区，那么该消费者组如何保证单分区消息的顺序性呢？**

无论是哪种策略，**当消费者组里的消费者个数的变化【增多或减少】或者订阅主题分区的增加都会触发重新分配**,**这种将分区的所有权从一个消费者移到另一个消费者称为**重新平衡（rebalance）**

#### Rang策略

Range分配策略是面向每个主题的，首先会对**同一个topic里面的分区按照序号进行排序，并把消费者线程按照字母顺序进行排序**。然后用分区数除以消费者线程数量来判断每个消费者线程消费几个分区。如果除不尽，那么前面几个消费者线程将会多消费一个分区。当然，这样的缺点就是对**每个组内的每个消费者分布不均匀**。举例如下：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/middleware/mq/kafkaintro/20200906184138764.png')" alt="wxmp">
这样ConsumerA承受的压力会越来越大。**局部打散【计算后顺序整体分，不是轮询分】，每个topic的局部压力都会压向消费者组中的某个消费者**

#### RoudRobin策略

RoudRobin策略也即轮询策略，**RoundRobin策略的原理是将消费组内所有消费者以及消费者所订阅的所有topic的partition按照字典序排序**，然后通过**轮询算法**逐个将分区以此分配给每个消费者：

- 如果同一消费组内，所有的消费者订阅的消息都是相同的【也就是所有消费者订阅的topic数量相同】，那么 RoundRobin 策略的分区分配会是均匀的。
- 如果同一消费者组内，所订阅的消息是不相同的，那么在执行分区分配的时候，就不是完全的轮询分配，有可能会导致分区分配的不均匀。**如果某个消费者没有订阅消费组内的某个 topic，那么在分配分区的时候，此消费者将不会分配到这个 topic 的任何分区**。

**这样的好处是，分配较为均衡**。
<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/middleware/mq/kafkaintro/2020090619163059.png')" alt="wxmp">

当然前提是**同一个消费者组里的每个消费者订阅的主题必须相同**，当然也一定是相同的，如果不同也就没必要放到一个消费组里了。

#### Sticky策略

这样的分区策略是从0.11版本才开始引入的，它主要有两个目的

- 分区的分配要尽可能的均匀，分配给消费者者的主题分区数最多相差一个
- 分区的分配要尽可能与上次分配的保持相同

举例进行分析：比如有3个消费者（C0，C1，C2），都订阅了2个主题（T0 和 T1）并且每个主题都有 3 个分区(p0、p1、p2)，那么所订阅的所有分区可以标识为T0p0、T0p1、T0p2、T1p0、T1p1、T1p2。此时使用Sticky分配策略后，得到的分区分配结果和RoudRobin相同：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/middleware/mq/kafkaintro/2020090619092873.png')" alt="wxmp">

但如果这里假设C2故障退出了消费者组，然后需要对分区进行再平衡操作，如果使用的是RoundRobin分配策略，它会按照消费者C0和C1进行重新轮询分配，再平衡后的结果如下：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/middleware/mq/kafkaintro/202009061909533.png')" alt="wxmp">

但是如果使用的是Sticky分配策略，再平衡后的结果会是这样：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/middleware/mq/kafkaintro/20200906191016909.png')" alt="wxmp">

虽然触发了再分配，但是记忆了上一次C0和C1的分配结果。这样的好处是发生分区重分配后，**对于同一个分区而言有可能之前的消费者和新指派的消费者不是同一个，对于之前消费者进行到一半的处理还要在新指派的消费者中再次处理一遍，这时就会浪费系统资源**。而使用Sticky策略就可以让分配策略具备一定的“粘性”，尽可能地让前后两次分配相同，进而可以减少系统资源的损耗以及其它异常情况的发生

### offset的维护

在现实情况下，消费者在消费数据时可能会出现各种会导致宕机的故障问题，这个时候，如果消费者后续恢复了，它就需要**从发生故障前的位置开始继续消费**，而不是从头开始消费。所以消费者需要实时的记录自己消费到了哪个offset，便于后续发生故障恢复后继续消费。Kafka 0.9版本之前，consumer默认将offset保存在Zookeeper中，从0.9版本开始，consumer默认将offset保存在Kafka一个内置的topic中，该topic为 `__consumer_offsets` :

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/middleware/mq/kafkaintro/20200906191758723.png')" alt="wxmp">

同一个组里的，当动态扩展分区分配时新进入的消费者接着消费分区消息而不是重新消费。offset是按照：**goup+topic+partion**来划分的，这样保证组内机器有问题时能接着消费

## Zookeeper管理

在基于 Kafka 的分布式消息队列中，ZooKeeper 的作用有：Producer端注册及管理、Consumer端注册及管理以及Kafka集群策略管理 等。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/middleware/mq/kafkaintro/20210113225232803.png')" alt="wxmp">

### Producer端注册及管理

在Producer端Zookeeper能够实现：注册并动态调整broker，注册并动态调整topic，Producers负载均衡。

#### 注册并动态调整Broker

broker是注册在zookeeper中的，还记得在分布式集群搭建的时候，我们在zk的配置文件中添加的服务节点，就是用来注册broker的。

- **存放地址**：为了记录 broker 的注册信息，在 ZooKeeper 上，专门创建了属于 Kafka 的一个节点，其路径为 **/brokers**
- **创建节点**： Kafka 的每个 broker 启动时，都会到 ZooKeeper 中进行注册，告诉 ZooKeeper 其 broker.id，**在整个集群中，broker.id 应该全局唯一，并在 ZooKeeper 上创建其属于自己的节点**，其节点路径为`/brokers/ids/{broker.id}`； 创建完节点后，Kafka 会将该 broker 的 **broker.name 及端口号**记录到该节点；
- **删除节点**：该 broker 节点属性为临时节点，当 broker 会话失效时，ZooKeeper 会删除该节点，这样，我们就可以很方便的监控到broker 节点的变化，及时调整负载均衡等。

当然注册完Broker还需要注册Topic

#### 注册并动态调整Topic

在 Kafka 中，所有 topic 与 broker 的对应关系都由 ZooKeeper 进行维护，在 ZooKeeper 中，建立专门的节点来记录这些信息，其节点路径为 `/brokers/topics/{topic_name}`前面说过，为了保障数据的可靠性，每个 Topic 的 Partitions 实际上是存在备份的，并且备份的数量由 Kafka 机制中的 replicas 来控制。

#### Producers负载均衡

对于同一个 topic 的不同 partition，Kafka会尽力将这些 partition 分布到不同的 broker 服务器上，**这种均衡策略实际上是基于 ZooKeeper 实现的**。

- **监听broker变化**，producers 启动后也要到 ZooKeeper 下注册，创建一个临时节点来监听 broker 服务器列表的变化。由于ZooKeeper 下 broker 创建的也是临时节点，当 brokers 发生变化时，producers 可以得到相关的通知，从改变自己的 broker list。
- **监听topic变化**，topic 的变化以及broker 和 topic 的关系变化，也是通过 ZooKeeper 的 Watcher 监听实现的

当broker变化以及topic变化的时候，zookeeper能监听到，并控制消息和分区的分布。

### Kafka集群策略管理

除了生产者涉及的管理行为，在我们前面提到的故障转移机制以及分区策略等内容中相关的其它管理行为也是由Zookeeper完成的

- **选举leader**，Kafka 为每一个 partition 找**一个节点作为 leader，其余备份作为 follower**，**如果 leader 挂了，follower 们会选举出一个新的 leader 替代**，继续业务
- **副本同步**，当 producer push 的消息写入 partition（分区) 时，**作为 leader 的 broker（Kafka 节点） 会将消息写入自己的分区，同时还会将此消息复制到各个 follower，实现同步**。
- **维护ISR**，**如果某个follower 挂掉，leader 会再找一个替代并同步消息**

所有的这些操作都是Zookeeper做的。

### Consumer端注册及管理

在Consumer端Zookeeper能够实现：注册并动态调整Consumer，Consumer负载均衡。

#### 注册并动态调整Consumer

在消费者端ZooKeeper 做的工作有那些呢？

- 注册新的消费者分组，当新的消费者组注册到 ZooKeeper 中时，ZooKeeper 会创建专用的节点来保存相关信息，其节点路径为

   

  ```
  /consumers/{group_id}
  ```

  ，其节点下有三个子节点，分别为 [ids, owners, offsets]。

  - **ids 节点：记录该消费组中当前正在消费的消费者**，**记录分组下消费者**
  - **owners 节点：记录该消费组消费的 topic 信息**，`/consumers/[group_id]/owners/[topic]/[broker_id-partition_id]`，其中，`[broker_id-partition_id]`就是一个消息分区的标识，节点内容就是该 消息分区上消费者的Consumer ID，这样分区和消费者就能关联起来了。**关联分区和消费者**
  - **offsets 节点：记录每个 topic 的每个分区offset**，在消费者对指定消息分区进行消息消费的过程中，需要定时将分区消息的消费进度Offset记录到Zookeeper上，以便在该消费者进行重启或者其他消费者重新接管该消息分区的消息消费后，能从之前进度继续消息消费。Offset在Zookeeper中由一个专门节点进行记录，其节点路径为:`/consumers/[group_id]/offsets/[topic]/[broker_id-partition_id]`节点内容就是Offset的值，**记录消费者offset**，当然新版本的不记录在zookeeper中

- **注册新的消费者**，当新的消费者注册到 Kafka 中时，会在 `/consumers/{group_id}/ids` 节点下创建临时子节点，并记录相关信息。

- **监听消费者分组中消费者的变化**，每个消费者都要关注其所属消费者组中消费者数目的变化，即监听 `/consumers/{group_id}/ids` 下子节点的变化。一但发现消费者新增或减少，就会触发消费者的负载均衡。

其实不光是注册consumer，还包括对消费者策略的管理，例如Consumer负载均衡

#### Consumer负载均衡

Consumer在启动时会到 ZooKeeper下以自己的 Consumer-id 创建临时节点 `/consumer/[group-id]/ids/[conusmer-id]`，并对 `/consumer/[group-id]/ids` 注册监听事件：

- **监听消费者列表**，当消费者发生变化时，同一 group 的其余消费者会得到通知。
- **监听broker列表**，消费者还要监听 broker 列表的变化。

然后按照我们之前提到的策略进行排序和消费

## Kafka框架搭建实战

好了，在了解了这么多基础知识以及核心原理之后，我们再来看看真正的实战场景是如何操作的。我们有如下场景，假设我们要从当前站点发送一个导出消息给导出ESB，由导出ESB处理业务逻辑来达到解耦的目标该怎么通过Kafka实现呢？

### 发送消息

我们发送Kafka消息的时候，外层的封装方法如下，需要传递**一个Kafka的topic、一个用来计算Partition【路由转发】的标识key【tenantId】，以及需要传递的消息**。

```java 
public static bool SendKafkaExportData(
      string appName,
      int tenantId,
      int userId,
      string metaObjName,
      string viewName,
      string exportFileName,
      SearchCondition condition,
      string version = null,
      int total = -1,
      ExportFileType fileType = ExportFileType.Xlsx,
      string applicationContext = null,
      string msgTemplate = null)
    {
      Common.HelperObjects.ArgumentHelper.AssertNotEmpty(appName, nameof (appName));
      Common.HelperObjects.ArgumentHelper.AssertNotEmpty(metaObjName, nameof (metaObjName));
      Common.HelperObjects.ArgumentHelper.AssertNotEmpty(viewName, nameof (viewName));
      Common.HelperObjects.ArgumentHelper.AssertNotEmpty(exportFileName, nameof (exportFileName));
      Common.HelperObjects.ArgumentHelper.AssertPositive(tenantId, nameof (tenantId));
      Common.HelperObjects.ArgumentHelper.AssertPositive(userId, nameof (userId));
      Common.HelperObjects.ArgumentHelper.AssertNotNull<SearchCondition>(condition, nameof (condition));
      bool flag = true;
      try
      {
        ExportRequestDataModel exportRequestData = ExportRequestDataModel.GetExportRequestData(appName, tenantId, userId, metaObjName, viewName, exportFileName, condition, version, total, fileType, applicationContext, msgTemplate);
        long num = KafkaProducer.Send<ExportRequestDataModel>("TMLSent", tenantId, exportRequestData);
        ExportRequestDataModel.logger.Debug((object) string.Format("{0}-{1}-{2}发送Kafka消息{3}成功", (object) appName, (object) tenantId, (object) userId, (object) num));
      }
      catch (Exception ex)
      {
        ExportRequestDataModel.logger.Error((object) string.Format("{0}-{1}-{2}发送Kafka消息异常", (object) appName, (object) tenantId, (object) userId), ex);
        flag = false;
      }
      return flag;
    }

```

而其中的核心方法： `long num = KafkaProducer.Send<ExportRequestDataModel>("TMLSent", tenantId, exportRequestData);`的实现逻辑如下，将kafka携带的消息序列化为二进制数组：

```java 
    /// <summary>Send a message to a topic.</summary>
    /// <param name="topic">The name of the topic to send the message to.</param>
    /// <param name="tenant">The id of the tenant the message belongs to.</param>
    /// <param name="value">The message content.</param>
    /// <returns>The offset of the message.</returns>
    public static long Send<T>(string topic, int tenant, T value) where T : IBinarySerializable
    {
      ArgumentHelper.AssertNotEmpty(topic, nameof (topic));
      ArgumentHelper.AssertPositive(tenant, nameof (tenant));
      return KafkaProducer.Send(topic, tenant, (object) value == null ? (byte[]) null : BigEndianEncoder.Encode<T>(value));
    }

```

消息发送机制如下，获取到需要的topic，用于计算Partition的标识tenantId以及序列化后可以直接发送的二进制字符串消息：

```java 
    /// <summary>Send a message to a topic.</summary>
    /// <param name="topic">The name of the topic to send the message to.</param>
    /// <param name="tenant">The id of the tenant the message belongs to.</param>
    /// <param name="value">The message content.</param>
    /// <returns>The offset of the message.</returns>
    public static long Send(string topic, int tenant, byte[] value)
    {
      ArgumentHelper.AssertNotEmpty(topic, nameof (topic));
      ArgumentHelper.AssertPositive(tenant, nameof (tenant));
      try
      {
        return KafkaProtocol.Produce(topic, tenant, value);
      }
      catch (ConnectionPoolException ex)
      {
        return KafkaProtocol.Produce(topic, tenant, value);
      }
      catch (KafkaException ex)
      {
        if (ex.Error == ErrorCode.NotLeaderForPartition || ex.Error == ErrorCode.LeaderNotAvailable)
          return KafkaProtocol.Produce(topic, tenant, value);
        throw;
      }
    }

```

核心的发送方法为：

```java 
public static long Produce(string topic, int tenant, byte[] value)
    {
      TopicConfig topicConfig = BaseConfig<KafkaMapping>.Instance.GetTopicConfig(topic);
      int num = tenant % KafkaProtocol.GetTopicPartitionCount(topic);  //计算要发往哪个分区
      int partitionLeader = KafkaProtocol.GetPartitionLeader(topic, num);  //获取分区leader
      try
      {
        using (KafkaSession kafkaSession = new KafkaSession(topicConfig.Cluster, partitionLeader))  //创建一个kafka消息发送实例
        {
          Message message = new Message(value, TimeUtil.CurrentTimestamp);
          ProduceRequest request = new ProduceRequest((IDictionary<TopicAndPartition, MessageSet>) new Dictionary<TopicAndPartition, MessageSet>()
          {
            {
              new TopicAndPartition(topic, num),   //将设置好的topic和partition传入参数
              new MessageSet(topicConfig.Codecs, (IList<Message>) new List<Message>()
              {
                message
              })
            }
          });   //设置要发送的消息
          ProduceResponse produceResponse = kafkaSession.Issue<ProduceRequest, ProduceResponse>(request);   //发送Kafka消息并
          KafkaProtocol.CheckErrorCode(produceResponse.Error, topic, new int?(num), new int?(tenant));
          return produceResponse.Offset;
        }
      }
      catch (Exception ex)
      {
        KafkaProtocol.RefreshPartitionMetadata(topic);
        throw;
      }
    }
```

这样一个我们需要传递的消息就发送到对应的topic和对应的partition上了（不同的partition可以存放在不同 的机器上，这样取同样余数的租户的数据会被放置到相同分区），无需再自己封装消息分发。

### 消费消息

在消费者端，机器需要预热并开启消息消费服务，当然也要有关闭消息服务的方法，开启消费服务意味着开启消息接收和开启消息处理线程，关闭消息服务同理表示关闭消息接收和关闭消息处理线程。

```java 
  /// <summary>
  /// 接收导出消息的服务
  /// </summary>
  public class ReceiveMsgProvider : IReceiveMsgProvider
  {
      #region 日志、构造方法以及单例
 
      protected static readonly LogWrapper Logger = new LogWrapper();
 
      private ReceiveMsgProvider()
      {
      }
 
      public static ReceiveMsgProvider Instance { get; } = new ReceiveMsgProvider();
 
      #endregion 日志、构造方法以及单例
 
      #region 开启消息接收服务
 
      public bool _ActivateService()
      {
          // 预热
         Cloud.Plugins.Helper.ESBProxy.WarmUp();
 
          //开启消息接收服务
          StartMessageService();
 
          //开始处理ExportQueue队列中的消息
          ExportConsumer.Instance.BeginImportData();
 
          Logger.Debug("_ActivateService was called.");
 
          return true;
      }
 
      protected void StartMessageService()
      {
          try
          {
              //开始消费消息
              ExportConsumer.Instance.Start();
          }
          catch (Exception ex)
          {
              Logger.Error(ex);
          }
      }
 
      #endregion 开启消息接收服务
 
      #region 关闭消息接收服务
 
      public bool _UnActivateService()
      {
          //关闭消息接收服务
          StopMessageService();
 
          //关闭处理queue的线程
          ExportConsumer.CloseQueueThreads(); 
 
          Logger.Debug("_UnActivateService was called.");
          return true;
      }
 
      protected void StopMessageService()
      {
          try
          {
              //停止消费消息
              ExportConsumer.Instance.Stop();
          }
          catch (Exception ex)
          {
              Logger.Error(ex);
          }
      }
 
     
  }
```

其中，开启和关闭消息接收服务的核心方法如下：

```java 
       /// <summary>
        /// ESB服务调用入口:启动
        /// </summary>
        public void Start()
        {
             _loggging.Debug("ESB服务调用入口:启动");
             //开启一个消费者组实例，这里设置启用了消费者组来接收消息，相当于启动了一个消费者组实例，在OnMessage里去具体写接收到消息之后的代码处理逻辑
            _consumer = new KafkaGroupConsumer(ExportKafkaConst.ExportKafkaConsumerGroup, ExportKafkaConst.ExportKafkaTopic, OnMessage);   
            _consumer .Start();
        }

        /// <summary>
        /// ESB服务调用入口:停止
        /// </summary>
        public void Stop()
        {
            _loggging.Debug("ESB服务调用入口:停止");
            if (_consumer  != null && _consumer .IsRunning)
            {
                _consumer .Stop();
            }
        }
```

其中消费者的核心实现方法如下：

```java
  public KafkaGroupConsumer(string consumerGroup, string topic, Func<Message, bool> handler)
        {
            ArgumentHelper.AssertNotEmpty(consumerGroup, "consumerGroup");   //消费者组
            ArgumentHelper.AssertNotEmpty(topic, "topic"); //消费主题
            ArgumentHelper.AssertNotNull(handler, "handler");  //消息处理函数
            _consumerGroup = consumerGroup;  //设置消费者组
            _topic = topic;  //设置topic
            _consumerId = GenerateConsumerId(consumerGroup);   //按照自定义规则给消费者组内生成一个消费者id
            _handler = handler;  
            ConsumerConfig consumerConfig = BaseConfig<KafkaMapping>.Instance.GetConsumerConfig(consumerGroup);//获取消费者组配置，例如该组内消费者的重试机制、reblance原则等等消费者组的配置
            _context = new ConsumerContext(consumerGroup, topic, _consumerId, consumerConfig, Trace.GetTraceHandler(topic, consumerGroup, handler, newConsumer: true));  //整个消费者的上下文，包括组的设置，当前id以及调用trace链路[便于排查问题]
            _zooKeeperStateManager = new ZooKeeperStateManager(_context);  //将该上下文注册到zookeeper中
            BaseConfig<KafkaMapping>.ConfigChanged += ReloadConfig;    //将消费者变更注册到Zookeeper，当消费者发生变化时，同一 group 的其余消费者会得到通知
        }

```

使用Kafka实现生产者消费者系统的整体流程就是这样。

行文至此，已洋洋洒洒3万5千言，希望能让你对Kafka有个整体的认知，大家共同进步，与诸君共勉

感谢作者分享，出处：https://tianmaolin.blog.csdn.net/article/details/112492221

## 参考文章
* https://tianmaolin.blog.csdn.net/article/details/112492221