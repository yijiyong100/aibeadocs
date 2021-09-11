---
title: Spark与Flink比较和区别
---

::: tip
本文主要是介绍 Spark与Flink比较和区别 。
:::

[[toc]]


## Spark 和 Flink 全方面对比(谁是下一代大数据流计算引擎?)



最近也是有很多同学问我spark和flink到底谁好,应该怎么选择,这也是近年来被问的最多的问题,也是经常被拿来比较的,今天就简单的做一个对比,我没有要挑起spark和flink之间的战争,社区间取长补短也好,互相抄袭也罢,我尽量站在一个公平的角度对待他们.下面会从多个方面对两者进行分析(当然有不全面),希望对大家有所帮助.篇幅较长,望大家耐心阅读.

## Spark简介

Spark的历史比较悠久,已经发展了很长时间,目前在大数据领域也有了一定的地位.Spark是Apache的一个顶级项目。它是一种快速的、轻量级、基于内存、分布式迭代计算的大数据处理框架。,Spark最初由美国加州伯克利大学（UCBerkeley）的AMP（Algorithms，Machines and People）实验室与2009年开发，是基于内存计算的大数据并行计算框架，可用于构建大型的、低延迟的数据分析应用程序。2003年加入Apache孵化器项目后的到迅猛的发展，如今已成为Apache的顶级项目。

## Flink简介

Flink出来的时间比较晚,可以说是大数据流计算的新贵,但是发展速度很快,劲头不容小觑,到2016年的时候才崭露头角,Stratosphere 项目最早在 2010 年 12 月由德国柏林理工大学教授 Volker Markl 发起，主要开发人员包括 Stephan Ewen、Fabian Hueske。Stratosphere 是以 MapReduce 为超越目标的系统，同时期有加州大学伯克利 AMP 实验室的 Spark。相对于 Spark，Stratosphere 是个彻底失败的项目。其实刚开始的时候Flink也是做批处理的,但是当时,spark已经在批处理领域有所建树,所以Flink决定放弃批处理,直接在流处理方面发力.所以 Volker Markl 教授参考了谷歌的流计算最新论文 MillWheel，决定以流计算为基础，开发一个流批结合的分布式流计算引擎 Flink。Flink 于 2014 年 3 月进入 Apache 孵化器并于 2014 年 11 月毕业成为 Apache 顶级项目。

## 1.两者最重要的区别(流和微批)

### (1). Micro Batching 模式(spark)

Micro-Batching 计算模式认为 "流是批的特例"， 流计算就是将连续不断的批进行持续计算，如果批足够小那么就有足够小的延时，在一定程度上满足了99%的实时计算场景。那么那1%为啥做不到呢?这就是架构的魅力，在Micro-Batching模式的架构实现上就有一个自然流数据流入系统进行攒批的过程，这在一定程度上就增加了延时。具体如下示意图：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dp/streamdiff/sparkflinkdiff-1.png')" alt="wxmp">

从上面可以看到是把输入的数据,分成微笑的批次,然后一个批次一个批次的处理,然后也是一片批次的输出.很显然Micro-Batching模式有其天生的低延时瓶颈，但任何事物的存在都有两面性，在大数据计算的发展历史上，最初Hadoop上的MapReduce就是优秀的批模式计算框架，Micro-Batching在设计和实现上可以借鉴很多成熟实践。

### (2). Native Streaming 模式(flink)

Native Streaming 计算模式认为 ""批是流的特例"，这个认知更贴切流的概念，比如一些监控类的消息流，数据库操作的binlog，实时的支付交易信息等等自然流数据都是一条，一条的流入。Native Streaming 计算模式每条数据的到来都进行计算，这种计算模式显得更自然，并且延时性能达到更低。具体如下示意图：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dp/streamdiff/sparkflinkdiff-2.png')" alt="wxmp">

从上图可以看到输入的数据过来一条处理一条,然后输出,几乎不存在延迟,很明显Native Streaming模式占据了流计算领域 "低延时" 的核心竞争力，当然Native Streaming模式的实现框架是一个历史先河，第一个实现Native Streaming模式的流计算框架是第一个吃螃蟹的人，需要面临更多的挑战，后续章节我们会慢慢介绍。当然Native Streaming模式的框架实现上面很容易实现Micro-Batching和Batching模式的计算，Apache Flink就是Native Streaming计算模式的流批统一的计算引擎。

## 2.数据模型

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dp/streamdiff/sparkflinkdiff-3.png')" alt="wxmp">

### Spark 的数据模型

Spark 最早采用 RDD 模型，达到比 MapReduce 计算快 100 倍的显著优势，对 Hadoop 生态大幅升级换代。RDD 弹性数据集是分割为固定大小的批数据，RDD 提供了丰富的底层 API 对数据集做操作。为持续降低使用门槛，Spark 社区开始开发高阶 API：DataFrame/DataSet，Spark SQL 作为统一的 API，掩盖了底层，同时针对性地做 SQL 逻辑优化和物理优化，非堆存储优化也大幅提升了性能。

Spark Streaming 里的 DStream 和 RDD 模型类似，把一个实时进来的无限数据分割为一个个小批数据集合 DStream，定时器定时通知处理系统去处理这些微批数据。劣势非常明显，API 少、难胜任复杂的流计算业务，调大吞吐量而不触发背压是个体力活。不支持乱序处理，或者说很难处理乱序的问题。Spark Streaming 仅适合简单的流处理，这里稍微解释一下,因为spark的创始人在当时认为延迟不是那么的重要,他认为现实生活中没有那么多低延迟的应用场景,所以就没太注重延迟的问题,但是随着生活多样化场景的不断增加,对实时性的要求越来越高,所以spark也注意到了这个问题,开始在延迟方面发力,进而推出了Structured Streaming,相信很快sparkstreaming就会被Structured Streaming替代掉.

Spark Structured Streaming 提供了微批和流式两个处理引擎。微批的 API 虽不如 Flink 丰富，窗口、消息时间、trigger、watermarker、流表 join、流流 join 这些常用的能力都具备了。时延仍然保持最小 100 毫秒。当前处在试验阶段的流式引擎，提供了 1 毫秒的时延，但不能保证 exactly-once 语义，支持 at-least-once 语义。同时，微批作业打了快照，作业改为流式模式重启作业是不兼容的。这一点不如 Flink 做的完美。当然了现在还在优化阶段.

综上，Spark Streaming 和 Structured Streaming 是用批计算的思路做流计算。其实，用流计算的思路开发批计算才是最合理的。对 Spark 来讲，大换血不大可能，只有局部优化。其实，Spark 里 core、streaming、structured streaming、graphx 四个模块，是四种实现思路，通过上层 SQL 统一显得不纯粹和谐。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dp/streamdiff/sparkflinkdiff-4.png')" alt="wxmp">

 Flink 的基本数据模型是数据流，及事件(Event)的序列。数据流作为数据的基本模型可能没有表或者数据块直观熟悉，但是可以证明是完全等效的。流可以是无边界的无限流，即一般意义上的流处理。也可以是有边界的有限流，这样就是批处理。

Flink 采用 Dataflow 模型，和 Lambda 模式不同。Dataflow 是纯粹的节点组成的一个图，图中的节点可以执行批计算，也可以是流计算，也可以是机器学习算法，流数据在节点之间流动，被节点上的处理函数实时 apply 处理，节点之间是用 netty 连接起来，两个 netty 之间 keepalive，网络 buffer 是自然反压的关键。经过逻辑优化和物理优化，Dataflow 的逻辑关系和运行时的物理拓扑相差不大。这是纯粹的流式设计，时延和吞吐理论上是最优的。

## 3. 运行时架构

### Spark 运行时架构

批计算是把 DAG 划分为不同 stage，DAG 节点之间有血缘关系，在运行期间一个 stage 的 task 任务列表执行完毕，销毁再去执行下一个 stage；Spark Streaming 则是对持续流入的数据划分一个批次，定时去执行批次的数据运算。Structured Streaming 将无限输入流保存在状态存储中，对流数据做微批或实时的计算，跟 Dataflow 模型比较像。

### Flink 运行时架构

Flink 有统一的 runtime，在此之上可以是 Batch API、Stream API、ML、Graph、CEP 等，DAG 中的节点上执行上述模块的功能函数，DAG 会一步步转化成 ExecutionGraph，即物理可执行的图，最终交给调度系统。节点中的逻辑在资源池中的 task 上被 apply 执行，task 和 Spark 中的 task 类似，都对应线程池中的一个线程。

在 DAG 的执行上，Spark 和 Flink 有一个比较显著的区别。在 Flink 的流执行模式中，一个事件在一个节点处理完后的输出就可以发到下一个节点立即处理。这样执行引擎并不会引入额外的延迟。与之相应的，所有节点是需要同时运行的。而 Spark 的 micro batch 和一般的 batch 执行一样，处理完上游的 stage 得到输出之后才开始下游的 stage。

在流计算的运行时架构方面，Flink 明显更为统一且优雅一些。

## 4. 时延和吞吐

至于延迟和吞吐方面,sparkstreaming是秒级别的,Structured Streaming是毫秒级别的,Flink是亚秒级别的,其实这个没差多少,吞吐量的话,我测试的结果是Flink是Spark的1.X倍.也相差不是太大.

## 5.反压

Flink 中，下游的算子消费流入到网络 buffer 的数据，如果下游算子处理能力不够，则阻塞网络 buffer，这样也就写不进数据，那么上游算子发现无法写入，则逐级把压力向上传递，直到数据源，这种自然反压的方式非常合理。Spark Streaming 是设置反压的吞吐量，到达阈值就开始限流，从批计算上来看是合理的。从这点看Flink的反压机制是要比spark好的.

## 6.状态存储

Spark 的快照 API 是 RDD 基础能力，定时开启快照后，会对同一时刻整个内存数据持久化。Spark 一般面向大数据集计算，内存数据较大，快照不宜太频繁，会增加集群计算量。spark的状态管理目前做的比较简单,只有两个对应的算子,[具体可以看这篇文章](https://blog.csdn.net/xianpanjia4616/article/details/82729724).保存在checkpoint中的.

Flink 提供文件、内存、RocksDB 三种状态存储，可以对运行中的状态数据异步持久化。打快照的机制是给 source 节点的下一个节点发一条特殊的 savepoint 或 checkpoint 消息，这条消息在每个算子之间流动，通过协调者机制对齐多个并行度的算子中的状态数据，把状态数据异步持久化。

Flink 打快照的方式，是我见过最为优雅的一个。Flink 支持局部恢复快照，作业快照数据保存后，修改作业，DAG 变化，启动作业恢复快照，新作业中未变化的算子的状态仍旧可以恢复。而且 Flink 也支持增量快照，面对内存超大状态数据，增量无疑能降低网络和磁盘开销。我们会发现Flink的状态存储也有较多的选择.

## 7. API方面

Spark 的初衷之一就是用统一的编程模型来解决用户的各种需求，在这方面一直很下功夫。最初基于 RDD 的 API 就可以做各种类型的数据处理。后来为了简化用户开发，逐渐推出了更高层的 DataFrame(在 RDD 中加了列变成结构化数据)和 Datasets(在 DataFrame 的列上加了类型)，并在 Spark 2.0 中做了整合(DataFrame = DataSet[Row])。Spark SQL 的支持也比较早就引入了。在加上各个处理类型 API 的不断改进，比如 Structured Streaming 以及和机器学习深度学习的交互，到了今天 Spark 的 API 可以说是非常好用的，也是 Spark 最强的方面之一。

　Flink 的 API 也有类似的目标和发展路线。Flink 和 Spark 的核心 API 可以说是可以基本对应的。今天 Spark API 总体上更完备一下，比如说最近一两年大力投入的和机器学习深度学习的整合方面。Flink 在流处理相关的方面还是领先一些，比如对 watermark、window、trigger 的各种支持要比spark好很多.

## 总结

spark和flink最大的区别还是在对流计算的支持上面,现在两者也都在做批流统一的相关工作,从spark最新的发展来看,会发展成一个和 Flink 的流处理模式比较相似的执行引擎。不过主要的功能都还在开发中或者待开发。对将来能做到什么程度，和 Spark 原来的 batch 执行引擎怎么结合，我们拭目以待。Flink也在做大量的完善工作,也逐步在ML,图计算等领域发力,使得Flink的生态系统越来越完善.



## 参考文章
* https://blog.csdn.net/xianpanjia4616/article/details/85076247