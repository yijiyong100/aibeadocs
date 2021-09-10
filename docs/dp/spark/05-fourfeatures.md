---
title: Spark-四大特征分析
---

::: tip
本文主要是介绍 Spark-四大特征分析 。
:::

[[toc]]


## Spark四大特征分析介绍


<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dp/spark/fourfeature-1.png')" alt="wxmp">

Spark是一种基于内存的、分布式的、大数据处理框架，在 Hadoop 的强势之下，Spark凭借着快速、简洁易用、通用性以及支持多种运行模式四大特征，冲破固有思路成为很多企业标准的大数据分析框架。

## 1 快速

面向磁盘的MapReduce受限于磁盘读/写性能和网络I/O性能的约束，在处理迭代计算、实时计算、交互式数据查询等方面并不高效，但是这些却在图计算、数据挖掘和机器学习等相关应用领域中非常常见。针对这一不足，将数据存储在内存中并基于内存进行计算是一个有效的解决途径。

Spark是面向内存的大数据处理引擎，这使得Spark能够为多个不同数据源的数据提供近乎实时的处理性能，适用于需要多次操作特定数据集的应用场景。

在相同的实验环境下处理相同的数据，若在内存中运行，那么Spark要比MapReduce快100倍，如图1所示；在磁盘中运行时Spark要比MapReduce快10倍，如图2所示。综合各种实验表明，处理迭代计算问题Spark要比MapReduce快20多倍，计算数据分析类报表的速度可提高40多倍，能够在5~7秒的延时内交互式扫描1TB数据集。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dp/spark/fourfeature-2.png')" alt="wxmp">

图1 基于内存Spark与MapReduce执行逻辑回归的性能对比

排序问题是最考验系统性能的问题之一。图2是Spark与MapReduce对相同的100TB数据样本排序的性能对比。在实验中，MapReduce用了2100台节点，用时72分钟；而Spark仅用207台节点，是前者的1/10，用时23分钟，是前者的1/3。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dp/spark/fourfeature-3.png')" alt="wxmp">

图2 基于磁盘Spark与MapReduce对100T数据排序的性能对比

Spark与MapReduce相比在计算性能上有如此显著的提升，主要得益于以下两方面。

#### 1．Spark是基于内存的大数据处理框架

Spark既可以在内存中处理一切数据，也可以使用磁盘来处理未全部装入到内存中的数据。由于内存与磁盘在读/写性能上存在巨大的差距，因此CPU基于内存对数据进行处理的速度要快于磁盘数倍。然而MapReduce对数据的处理是基于磁盘展开的。一方面，MapReduce对数据进行Map操作后的结果要写入磁盘中，而且Reduce操作也是在磁盘中读取数据，另一方面，分布式环境下不同物理节点间的数据通过网络进行传输，网络性能使得该缺点进一步被放大。因此磁盘的读/写性能、网络传输性能成为了基于MapReduce大数据处理框架的瓶颈。图3为MapReduce数据处理流程示意图。

（a） MapReduce处理流程

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dp/spark/fourfeature-4.png')" alt="wxmp">

图3 MapReduce数据处理流程示意图

#### 2．Spark具有优秀的作业调度策略

Spark中使用了有向无环图（Directed Acyclic Graph，DAG）这一概念。一个Spark应用由若干个作业构成，首先Spark将每个作业抽象成一个图，图中的节点是数据集，图中的边是数据集之间的转换关系；然后Spark基于相应的策略将DAG划分出若干个子图，每个子图称为一个阶段，而每个阶段对应一组任务；最后每个任务交由集群中的执行器进行计算。借助于DAG，Spark可以对应用程序的执行进行优化，能够很好地实现循环数据流和内存计算。

## 2 简洁易用

Spark不仅计算性能突出，在易用性方面也是其他同类产品难以比拟的。一方面，Spark提供了支持多种语言的API，如Scala、Java、Python、R等，使得用户开发Spark程序十分方便。另一方面，Spark是基于Scala语言开发的，由于Scala是一种面向对象的、函数式的静态编程语言，其强大的类型推断、模式匹配、隐式转换等一系列功能结合丰富的描述能力使得Spark应用程序代码非常简洁。Spark的易用性还体现在其针对数据处理提供了丰富的操作。

在使用MapReduce开发应用程序时，通常用户关注的重点与难点是如何将一个需求Job（作业）拆分成Map和Reduce。由于MapReduce中仅为数据处理提供了两个操作，即Map和Reduce，因此系统开发人员需要解决的一个难题是如何把数据处理的业务逻辑合理有效地封装在对应的两个类中。与之相对比，Spark提供了80多个针对数据处理的基本操作，如map、flatMap、reduceByKey、filter、cache、collect、textFile等，这使得用户基于Spark进行应用程序开发非常简洁高效。以分词统计为例，虽然MapReduce固定的编程模式极大地简化了并行程序开发，但是代码至少几十行；若换成Spark，其核心代码最短仅需一行，如示例1-1所示，极大地提高了应用程序开发效率。

示例1 基于Spark的WordCount程序核心代码

``` shell
sc.textFile("hdfs://master:8020/user/dong/Spark/wc.input").flatMap(_.split("")).map((_,1)).reduceByKey(_ + _).collect
```

此外，MapReduce自身并没有交互模式，需要借助Hive和Pig等附加模块。Spark则提供了一种命令行交互模式，即Spark Sheep，使得用户可以获取到查询和其他操作的即时反馈。
但需要注意的是，在Spark的实际项目开发中多用Scala语言，约占70%；其次是Java，约占20%；而Python约占10%。通常使用方便、简洁的工具，其内部往往封装了更为复杂的机理，因此Scala与Java等语言比较起来，学习难度要大一些。

## 3 通用

相对于第一代的大数据生态系统Hadoop中的MapReduce，Spark 无论是在性能还是在方案的统一性方面，都有着极大的优势。Spark框架包含了多个紧密集成的组件，如图4所示。位于底层的是Spark Core，其实现了Spark的作业调度、内存管理、容错、与存储系统交互等基本功能，并针对弹性分布式数据集提供了丰富的操作。在Spark Core的基础上，Spark提供了一系列面向不同应用需求的组件，主要有Spark SQL、Spark Streaming、MLlib、GraphX。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dp/spark/fourfeature-5.png')" alt="wxmp">

图4 Spark软件栈

### 1．Spark SQL

Spark SQL是Spark用来操作结构化数据的组件。通过Spark SQL，用户可以使用SQL或者Apache Hive版本的SQL方言（HQL）来查询数据。Spark SQL支持多种数据源类型，例如Hive表、Parquet以及JSON等。Spark SQL不仅为Spark提供了一个SQL接口，还支持开发者将SQL语句融入到Spark应用程序开发过程中，无论是使用Python、Java还是Scala，用户可以在单个的应用中同时进行SQL查询和复杂的数据分析。由于能够与Spark所提供的丰富的计算环境紧密结合，Spark SQL得以从其他开源数据仓库工具中脱颖而出。Spark SQL在Spark l.0中被首次引入。在Spark SQL之前，美国加州大学伯克利分校曾经尝试修改Apache Hive以使其运行在Spark上，进而提出了组件Shark。然而随着Spark SQL的提出与发展，其与Spark引擎和API结合得更加紧密，使得Shark已经被Spark SQL所取代。

### 2．Spark Streaming

众多应用领域对实时数据的流式计算有着强烈的需求，例如网络环境中的网页服务器日志或是由用户提交的状态更新组成的消息队列等，这些都是实时数据流。Spark Streaming是Spark平台上针对实时数据进行流式计算的组件，提供了丰富的处理数据流的API。由于这些API与Spark Core中的基本操作相对应，因此开发者在熟知Spark核心概念与编程方法之后，编写Spark Streaming应用程序会更加得心应手。从底层设计来看，Spark Streaming支持与Spark Core同级别的容错性、吞吐量以及可伸缩性。

### 3．MLlib

MLlib是Spark提供的一个机器学习算法库，其中包含了多种经典、常见的机器学习算法，主要有分类、回归、聚类、协同过滤等。MLlib不仅提供了模型评估、数据导入等额外的功能，还提供了一些更底层的机器学习原语，包括一个通用的梯度下降优化基础算法。所有这些方法都被设计为可以在集群上轻松伸缩的架构。

### 4．GraphX

GraphX是Spark面向图计算提供的框架与算法库。GraphX中提出了弹性分布式属性图的概念，并在此基础上实现了图视图与表视图的有机结合与统一；同时针对图数据处理提供了丰富的操作，例如取子图操作subgraph、顶点属性操作mapVertices、边属性操作mapEdges等。GraphX还实现了与Pregel的结合，可以直接使用一些常用图算法，如PageRank、三角形计数等。

上述这些Spark核心组件都以jar包的形式提供给用户，这意味着在使用这些组件时，与MapReduce上的Hive、Mahout、Pig等组件不同，无需进行复杂烦琐的学习、部署、维护和测试等一系列工作，用户只要搭建好Spark平台便可以直接使用这些组件，从而节省了大量的系统开发与运维成本。将这些组件放在一起，就构成了一个Spark软件栈。基于这个软件栈，Spark提出并实现了大数据处理的一种理念——“一栈式解决方案（one stack to rule them all）”，即Spark可同时对大数据进行批处理、流式处理和交互式查询，如图5所示。借助于这一软件栈用户可以简单而低耗地把各种处理流程综合在一起，充分体现了Spark的通用性。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dp/spark/fourfeature-6.png')" alt="wxmp">

图5 Spark面向大数据的综合处理示意图

## 4 多种运行模式

Spark支持多种运行模式：本地local运行模式、分布式运行模式。Spark集群的底层资源可以借助于外部的框架进行管理，目前Spark对Mesos和Yarn提供了相对稳定的支持。在实际生产环境中，中小规模的Spark集群通常可满足一般企业绝大多数的业务需求，而在搭建此类集群时推荐采用Standalone模式（不采用外部的资源管理框架）。该模式使得Spark集群更加轻量级。

Spark on Yarn模式：在这一模式下，Spark作为一个提交程序的客户端将Spark任务提交到Yarn上，然后通过Yarn来调度和管理Spark任务执行过程中所需的资源。在搭建此模式的Spark集群过程中，需要先搭建Yarn集群，然后将Spark作为Hadoop中的一个组件纳入到Yarn的调度管理下，这样将更有利于系统资源的共享。
Spark on Mesoes模式：Spark和资源管理框架Mesos相结合的运行模式。Apache Mesos与Yarn类似，能够将CPU、内存、存储等资源从计算机的物理硬件中抽象地隔离出来，搭建了一个高容错、弹性配置的分布式系统。Mesos同样也采用Master/Slave架构，并支持粗粒度模式和细粒度模式两种调度模式。

Spark Standalone模式：该模式是不借助于第三方资源管理框架的完全分布式模式。Spark使用自己的Master进程对应用程序运行过程中所需的资源进行调度和管理。对于中小规模的Spark集群首选Standalone模式。


## 参考文章
* http://www.broadview.com.cn/article/419394