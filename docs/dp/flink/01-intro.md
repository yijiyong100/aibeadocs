---
title: Flink-基础知识介绍
---

::: tip
本文主要是介绍 Flink-基础知识 。
:::

[[toc]]

## Flink(一)-基本概念

> **前言**：前段时间因为项目需求，需要开发一个实时采集分析日志的任务，最后选择的计算框架是Flink。项目完成后，基本上就没再接触。但总觉得既然用过了，不了解，不清楚，日后又需要还得重新看，很亏啊 ! 所以决定抽空总结一下，一方面可以跟大家交流分享一下新的学习内容，共同进步；另一方面也能更深入的了解传说中的下一代大数据实时计算神器。

这篇文章主要按照以下思路，简单的交流一下Flink的基本概念和用途。自知资历尚浅，见闻有限，如有纰漏还望指正！

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dp/flink/intro1-1.png')" alt="wxmp">


## 1. Flink 简介

在当前的互联网用户，设备，服务等激增的时代下，其产生的数据量已不可同日而语了。各种业务场景都会有着大量的数据产生，如何对这些数据进行有效地处理是很多企业需要考虑的问题。以往我们所熟知的Map Reduce，Storm，Spark等框架可能在某些场景下已经没法完全地满足用户的需求，或者是实现需求所付出的代价，无论是代码量或者架构的复杂程度可能都没法满足预期的需求。新场景的出现催产出新的技术，Flink即为实时流的处理提供了新的选择。Apache Flink就是近些年来在社区中比较活跃的分布式处理框架，加上阿里在中国的推广，相信它在未来的竞争中会更具优势。 Flink的产生背景不过多介绍，感兴趣的可以Google一下。Flink相对简单的编程模型加上其高吞吐、低延迟、高性能以及支持exactly-once语义的特性，让它在工业生产中较为出众。相信正如很多博客资料等写的那样"Flink将会成为企业内部主流的数据处理框架，最终成为下一代大数据处理标准。"

## 2. Flink 架构中的服务类型

下面是从Flink官网截取的一张架构图：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dp/flink/intro1-2.png')" alt="wxmp">



在Flink运行时涉及到的进程主要有以下两个： 

**JobManager**：主要负责调度task，协调checkpoint已经错误恢复等。当客户端将打包好的任务提交到JobManager之后，JobManager就会根据注册的TaskManager资源信息将任务分配给有资源的TaskManager，然后启动运行任务。TaskManger从JobManager获取task信息，然后使用slot资源运行task； 

**TaskManager**：执行数据流的task，一个task通过设置并行度，可能会有多个subtask。 每个TaskManager都是作为一个独立的JVM进程运行的。他主要负责在独立的线程执行的operator。其中能执行多少个operator取决于每个taskManager指定的slots数量。Task slot是Flink中最小的资源单位。假如一个taskManager有3个slot，他就会给每个slot分配1/3的内存资源，目前slot不会对cpu进行隔离。同一个taskManager中的slot会共享网络资源和心跳信息。

当然在Flink中并不是一个slot只可以执行一个task，在某些情况下，一个slot中也可能执行多个task，如下：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dp/flink/intro1-3.png')" alt="wxmp">

一般情况下，flink都是默认允许共用slot的，即便不是相同的task，只要都是来同一个job即可。共享slot的好处有以下两点：

1. 当Job的最高并行度正好和flink集群的slot数量相等时，则不需要计算总的task数量。例如，最高并行度是6时，则只需要6个slot，各个subtask都可以共享这6个slot； 
  
2. 共享slot可以优化资源管理。如下图，非资源密集型subtask `source/map`在不共享slot时会占用6个slot，而在共享的情况下，可以保证其他的资源密集型subtask也能使用这6个slot，保证了资源分配。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dp/flink/intro1-4.png')" alt="wxmp">



## 3. Flink中的数据

Flink中的数据主要分为两类：**有界数据流(Bounded streams)**和**无界数据流(Unbounded streams)**。

### 3.1 无界数据流

顾名思义，**无界数据流**就是指有始无终的数据，数据一旦开始生成就会持续不断的产生新的数据，即数据没有时间边界。无界数据流需要持续不断地处理。

### 3.2 有界数据流

相对而言，**有界数据流**就是指输入的数据有始有终。例如数据可能是一分钟或者一天的交易数据等等。处理这种有界数据流的方式也被称之为**批处理**：



<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dp/flink/intro1-5.png')" alt="wxmp">


需要注意的是，我们一般所说的**数据流**是指数据集，而**流数据**则是指数据流中的数据。

## 4. Flink中的编程模型

### 4.1 编程模型

在Flink，编程模型的抽象层级主要分为以下4种，越往下抽象度越低，编程越复杂，灵活度越高。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dp/flink/intro1-6.png')" alt="wxmp">


这里先不一一介绍，后续会做详细说明。这4层中，一般用于开发的是第三层，即`DataStrem/DataSetAPI`。用户可以使用`DataStream API`处理无界数据流，使用`DataSet API`处理有界数据流。同时这两个API都提供了各种各样的接口来处理数据。例如常见的map、filter、flatMap等等，而且支持python，scala，java等编程语言，后面的demo主要以scala为主。

### 4.2 程序结构

与其他的分布式处理引擎类似，Flink也遵循着一定的程序架构。下面以常见的WordCount为例：

```java
val env = ExecutionEnvironment.getExecutionEnvironment

// get input data
val text = env.readTextFile("/path/to/file")

val counts = text.flatMap { _.toLowerCase.split("\\W+") filter { _.nonEmpty } }
  .map { (_, 1) }
  .groupBy(0)
  .sum(1)

counts.writeAsCsv(outputPath, "\n", " ")
```

下面我们分解一下这个程序。
第一步，我们需要获取一个`ExecutionEnvironment`(如果是实时数据流的话我们需要创建一个`StreamExecutionEnvironment`)。这个对象可以设置执行的一些参数以及添加数据源。所以在程序的main方法中我们都要通过类似下面的语句获取到这个对象：

```java
val env = ExecutionEnvironment.getExecutionEnvironment
```

第二步，我们需要为这个应用添加数据源。这个程序中是通过读取文本文件的方式获取数据。在实际开发中我们的数据源可能有很多中，例如kafka，ES等等，Flink官方也提供了很多的connector以减少我们的开发时间。一般都是都通addSource方法添加的，这里是从文本读入，所以调用了readTextFile方法。当然我们也可以通过实现接口来自定义source。

```java
val text = env.readTextFile("/path/to/file")
```

第三步，我们需要定义一系列的operator来对数据进行处理。我们可以调用Flink API中已经提供的算子，也可以通过实现不同的Function来实现自己的算子，这个我们会在后面讨论。这里我们只需要了解一般的程序结构即可。

```java
val counts = text.flatMap { _.toLowerCase.split("\\W+") filter { _.nonEmpty } }
  .map { (_, 1) }
  .groupBy(0)
  .sum(1)
```

上面的就是先对输入的数据进行分割，然后转换成（word，count）这样的Tuple，接着通过第一个字段进行分组，最后sum第二个字段进行聚合。
第四步，数据处理完成之后，我们还要为它指定数据的存储。我们可以从外部系统导入数据，亦可以将处理完的数据导入到外部系统，这个过程称为Sink。同Connector类似，Flink官方提供了很多的Sink供用户使用，用户也可以通过实现接口自定义Sink。

```java
counts.writeAsCsv(outputPath, "\n", " ")
```

## 小结：

以上，通过简单的介绍来了解Flink中的一些基本概念及编程方式。后面会对每个细节进行更为详尽地分析。

## 【----------------------------】

## 一. Flink的引入

这几年大数据的飞速发展，出现了很多热门的开源社区，其中著名的有 Hadoop、Storm，以及后来的 Spark，他们都有着各自专注的应用场景。Spark 掀开了内存计算的先河，也以内存为赌注，赢得了内存计算的飞速发展。Spark 的火热或多或少的掩盖了其他分布式计算的系统身影。就像 Flink，也就在这个时候默默的发展着。

在国外一些社区，有很多人将大数据的计算引擎分成了 4 代，当然，也有很多人不会认同。我们先姑且这么认为和讨论。

首先第一代的计算引擎，无疑就是 Hadoop 承载的 MapReduce。这里大家应该都不会对 MapReduce 陌生，它将计算分为两个阶段，分别为 Map 和 Reduce。对于上层应用来说，就不得不想方设法去拆分算法，甚至于不得不在上层应用实现多个 Job 的串联，以完成一个完整的算法，例如迭代计算。

由于这样的弊端，催生了支持 DAG 框架的产生。因此，支持 DAG 的框架被划分为第二代计算引擎。如 Tez 以及更上层的 Oozie。这里我们不去细究各种 DAG 实现之间的区别，不过对于当时的 Tez 和 Oozie 来说，大多还是批处理的任务。

接下来就是以 Spark 为代表的第三代的计算引擎。第三代计算引擎的特点主要是 Job 内部的 DAG 支持（不跨越 Job），以及强调的实时计算。在这里，很多人也会认为第三代计算引擎也能够很好的运行批处理的 Job。

随着第三代计算引擎的出现，促进了上层应用快速发展，例如各种迭代计算的性能以及对流计算和 SQL 等的支持。Flink 的诞生就被归在了第四代。这应该主要表现在 Flink 对流计算的支持，以及更一步的实时性上面。当然 Flink 也可以支持 Batch 的任务，以及 DAG 的运算。

## 二. Flink简介

Apache Flink是一个框架和分布式处理引擎，用于对无界和有界数据流进行有状态计算。Flink设计为在所有常见的集群环境中运行，以内存速度和任何规模执行计算。

### 1.无界流和有界流

任何类型的数据都是作为事件流产生的。信用卡交易，传感器测量，机器日志或网站或移动应用程序上的用户交互，所有这些数据都作为流生成。

数据可以作为无界或有界流处理。

1. 无界流有一个开始但没有定义的结束。它们不会在生成时终止并提供数据。必须持续处理无界流，即必须在摄取事件后立即处理事件。无法等待所有输入数据到达，因为输入是无界的，并且在任何时间点都不会完成。处理无界数据通常要求以特定顺序（例如事件发生的顺序）摄取事件，以便能够推断结果完整性。
2. 有界流具有定义的开始和结束。可以在执行任何计算之前通过摄取所有数据来处理有界流。处理有界流不需要有序摄取，因为可以始终对有界数据集进行排序。有界流的处理也称为批处理。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dp/flink/intro2-1.png')" alt="wxmp">

Apache Flink擅长处理无界和有界数据集。精确控制时间和状态使Flink的运行时能够在无界流上运行任何类型的应用程序。有界流由算法和数据结构内部处理，这些算法和数据结构专门针对固定大小的数据集而设计，从而产生出色的性能。

### 2.随处部署应用程序

Apache Flink是一个分布式系统，需要计算资源才能执行应用程序。Flink与所有常见的集群资源管理器（如[Hadoop YARN](https://hadoop.apache.org/docs/stable/hadoop-yarn/hadoop-yarn-site/YARN.html)，[Apache Mesos](https://mesos.apache.org/)和[Kubernetes）集成，](https://kubernetes.io/)但也可以设置为作为独立集群运行。

Flink旨在很好地适用于之前列出的每个资源管理器。这是通过特定于资源管理器的部署模式实现的，这些模式允许Flink以其惯用的方式与每个资源管理器进行交互。

部署Flink应用程序时，Flink会根据应用程序配置的并行性自动识别所需资源，并从资源管理器请求它们。如果发生故障，Flink会通过请求新资源来替换发生故障的容器。提交或控制应用程序的所有通信都通过REST调用进行。这简化了Flink在许多环境中的集成。

### 3.以任何比例运行应用程序

Flink旨在以任何规模运行有状态流应用程序。应用程序可以并行化为数千个在集群中分布和同时执行的任务。因此，应用程序可以利用几乎无限量的CPU，主内存，磁盘和网络IO。而且，Flink可以轻松维护非常大的应用程序状态。其异步和增量检查点算法确保对处理延迟的影响最小，同时保证一次性状态一致性。

[用户报告了](https://flink.apache.org/poweredby.html)在其生产环境中运行的Flink应用程序的[可扩展性数字令人印象深刻](https://flink.apache.org/poweredby.html)，例如

- 应用程序每天处理数万亿个事件，
- 应用程序维护多个TB的状态，以及
- 应用程序在数千个内核的运行。

### 4.利用内存中的性能

有状态Flink应用程序针对本地状态访问进行了优化。任务状态始终保留在内存中，或者，如果状态大小超过可用内存，则保存在访问高效的磁盘上数据结构中。因此，任务通过访问本地（通常是内存中）状态来执行所有计算，从而产生非常低的处理延迟。Flink通过定期和异步检查本地状态到持久存储来保证在出现故障时的一次状态一致性。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dp/flink/intro2-2.png')" alt="wxmp">

### 5.Flink的架构

  Flink 可以支持本地的快速迭代，以及一些环形的迭代任务。并且 Flink 可以定制化内存管理。在这点，如果要对比 Flink 和 Spark 的话，Flink 并没有将内存完全交给应用层。这也是为什么 Spark 相对于 Flink，更容易出现 OOM 的原因（out of memory）。就框架本身与应用场景来说，Flink 更相似与 Storm。如果之前了解过 Storm 或者 Flume 的读者，可能会更容易理解 Flink 的架构和很多概念。下面让我们先来看下 Flink 的架构图。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dp/flink/intro2-3.png')" alt="wxmp">

我们可以了解到 Flink 几个最基础的概念，Client、JobManager 和 TaskManager。Client 用来提交任务给 JobManager，JobManager 分发任务给 TaskManager 去执行，然后 TaskManager 会心跳的汇报任务状态。看到这里，有的人应该已经有种回到 Hadoop 一代的错觉。确实，从架构图去看，JobManager 很像当年的 JobTracker，TaskManager 也很像当年的 TaskTracker。然而有一个最重要的区别就是 TaskManager 之间是是流（Stream）。其次，Hadoop 一代中，只有 Map 和 Reduce 之间的 Shuffle，而对 Flink 而言，可能是很多级，并且在 TaskManager 内部和 TaskManager 之间都会有数据传递，而不像 Hadoop，是固定的 Map 到 Reduce。

## 三. Flink技术特点

### 1. 流处理特性

支持高吞吐、低延迟、高性能的流处理

支持带有事件时间的窗口（Window）操作

支持有状态计算的Exactly-once语义

支持高度灵活的窗口（Window）操作，支持基于time、count、session，以及data-driven的窗口操作

支持具有Backpressure功能的持续流模型

支持基于轻量级分布式快照（Snapshot）实现的容错

一个运行时同时支持Batch on Streaming处理和Streaming处理

Flink在JVM内部实现了自己的内存管理

支持迭代计算

支持程序自动优化：避免特定情况下Shuffle、排序等昂贵操作，中间结果有必要进行缓存

### 2. API支持

对Streaming数据类应用，提供DataStream API

对批处理类应用，提供DataSet API（支持Java/Scala）

### 3. Libraries支持

支持机器学习（FlinkML）

支持图分析（Gelly）

支持关系数据处理（Table）

支持复杂事件处理（CEP）

### 4. 整合支持

支持Flink on YARN

支持HDFS

支持来自Kafka的输入数据

支持Apache HBase

支持Hadoop程序

支持Tachyon

支持ElasticSearch

支持RabbitMQ

支持Apache Storm

支持S3

支持XtreemFS

### 5. Flink生态圈

Flink 首先支持了 Scala 和 Java 的 API，Python 也正在测试中。Flink 通过 Gelly 支持了图操作，还有机器学习的 FlinkML。Table 是一种接口化的 SQL 支持，也就是 API 支持，而不是文本化的 SQL 解析和执行。对于完整的 Stack 我们可以参考下图。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dp/flink/intro2-4.png')" alt="wxmp">

Flink 为了更广泛的支持大数据的生态圈，其下也实现了很多 Connector 的子项目。最熟悉的，当然就是与 Hadoop HDFS 集成。其次，Flink 也宣布支持了 Tachyon、S3 以及 MapRFS。不过对于 Tachyon 以及 S3 的支持，都是通过 Hadoop HDFS 这层包装实现的，也就是说要使用 Tachyon 和 S3，就必须有 Hadoop，而且要更改 Hadoop 的配置（core-site.xml）。如果浏览 Flink 的代码目录，我们就会看到更多 Connector 项目，例如 Flume 和 Kafka。

## 四. Flink的编程模型

Flink提供不同级别的抽象来开发流/批处理应用程序。

编程抽象级别

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dp/flink/intro2-1.png')" alt="wxmp">




## 参考文章
* https://zhuanlan.zhihu.com/p/96105903
* https://www.cnblogs.com/frankdeng/p/9400622.html