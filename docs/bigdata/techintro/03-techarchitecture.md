---
title: 大数据-技术框架方案
---

::: tip
本文主要是介绍 大数据-技术框架方案 。
:::

[[toc]]

## 大数据技术框架


## **一 大数据应用场景**


- 1、互联网领域：搜索引擎、推荐系统、广告系统
- 2、电信领域：网络管理和优化、市场与精准营销、客户关系管理、企业运营管理、数据商业化
- 3、医疗领域：临床数据对比、药品研发、临床决策支持、实时统计分析、基本药物临床应用分析、远程病人数据分析、人口统计学分析、新农合基金数据分析、就诊行为分析、新的服务模式等。
- 4、金融领域：客户画像应用、精准营销、风险管控、运营优化、

 

## **二 企业级大数据技术框架**


   从数据在信息系统中的生命周期看，大数据从数据源开始，经过分析、挖掘到最终获得价值一般需要经过6个主要环节，包括数据收集、数据存储、资源管理与服务协调、计算引擎、数据分析、数据可视化。
- （1）**数据收集层**：负责将数据源中的数据近实时或实时收集到一起。数据源具有分布性、异构性、多样化及流式生产等特点，故将分散的数据源中的数据收集到一起通常是十分困难的事情。一个适用于大数据领域的收集系统，一般具备以下几个特点：扩展性、可靠性、安全性、低延迟。
- （2）**数据存储层**：负责海量结构化与非结构化数据的存储。由于数据收集系统会将各类数据源源不断的发到中央化存储系统中，这对数据存储层的扩展性、容错性、存储模型等有较高要求。
- （3）**资源管理与服务协调层**：资源管理负责对共享集群资源的不同应用们，采用轻量级隔离方案对各个应用进行隔离的方法，来解决资源利用率低、运维成本高、数据共享困难等问题。服务协调层负责避免重复开发分布式系统过程中的通用功能，包括leader选举、服务命名、分布式队列、分布式锁、发布订阅等。
- （4）**计算引擎层**：负责针对不同应用场景，单独构建一个计算引擎。分为批处理（高吞吐量）、交互式处理、实时处理（低延迟）。
- （5）**数据分析层**：负责提供易用的数据处理工具。包括应用程序API、类SQL查询语言、数据挖掘SDK等。典型的使用模式是：首先使用批处理框架对原始海量数据进行分析，产生较小规模的数据集，在此基础上，在使用交互式处理工具对该数据集进行快速查询，获取最终结果，
- （6）**数据可视化**：指运用计算机图形学和图像处理技术，将数据转换为图形或图像在屏幕上显示出来，并进行交互处理的理论、方法和技术。涉及计算机图形学、图像处理、计算机辅助设计、计算机视觉和人机交互技术等多个领域。

 

## **三 企业级大数据技术实现方案（Hadoop与Spark开源大数据技术栈）**


- （1）**数据收集**：主要由关系型与非关系型数据收集组件、分布式消息队列构成。Sqoop（可将关系型数据库中的数据全量到入Hadoop，反之亦然）、Canal（可用于实现数据的增量导入）、Flume（可近实时收集非关系型数据-如流式日志，经过滤聚集后加载到HDFS等存储系统）、Kafka（分布式消息队列）
- （2）**数据存储**：主要由分布式文件系统（面向文件的存储）和分布式数据库（面向行/列的存储）构成。HDFS（Hadoop分布式文件系统，存储格式有：SSTable-sorted string table、文本文件、二进制key/value格式SequenceFile、列式存储格式Parquet、ORC、Carbondata等）、HBase（构建在HDFS之上的分布式数据库，允许存储结构化与半结构化数据，支持行列无限扩展以及数据随机查找与删除）、Kudu（分布式列式存储数据库，允许存储结构化数据，支持行无限扩展以及数据随机查找与更新）
- （3）**资源管理与服务协调**：YARN（统一资源管理与调度系统，内置了多种多租户资源调度器，允许用户按照队列的方式组织和管理资源，且每个队列的调度机制可独立定制）、Zookeeper（基于简化的Paxos协议实现的服务协调系统，提供了类似于文件系统的数据模型，允许通过简单的API实现leader选举、服务命名、分布式队列与分布式锁等复杂的分布式通用模块）
- （4）**计算引擎**：包含批处理、交互式处理、流式处理。MapReduce（经典的批处理计算引擎，允许通过API写分布式程序）、Tez（基于MapReduce开发的通用的有向无环图DAG计算引擎，能更高效的实现复杂的数据处理逻辑，目前被应用在Hive、Pig等数据分析系统中）、Spark（通用的DAG计算引擎，提供基于RDD-Resilient Distributed Dataset的数据抽象表示，允许充分利用内存进行快速的数据挖掘和分析）、Impala/Presto（分别由Cloudera和Facebook开源的MPP-MassivelyParallelProcessing系统，允许用标准SQL处理存储在Hadoop中的数据，采用了并行数据库架构，内置了查询优化器，查询下推，代码生成等优化机制）、Storm/SparkStreaming（分布式流式实时计算引擎）
- （5）**数据分析**：Hive（支持SQL或脚本语言的分析系统、基于MapReduce/Tez实现的SQL引擎）、Pig（基于MapReduce/Tez实现的工作流引擎）、SparkSQL（基于Spark实现的SQL引擎）、Mahout/MLlib（在计算机引擎之上构建的机器学习库，实现了常用的机器学习和数据挖掘算法。Mahout最初基于MapReduce，目前正向Spark迁移，MLlib基于Spark实现）

 

## **四 大数据架构 Lambda Architecture（LA）**


### 1、提出者：
Twitter的工程师Nathan Marz

### 2、目的：
指导用户充分利用批处理和流式计算技术各自的优点实现一个复杂的大数据处理系统，LA可以在延迟、吞吐量和容错之间找到平衡点。

### 3、主要思想：**批处理层、流式处理层、服务层**
- （1）批处理层：以批为单位处理数据，并产生一个经预计算产生的只读数据视图。
- （2）流式处理：数据处理延迟低，但无法进行复杂的逻辑计算，得到的结果往往是近似解。
- （3）服务层：整合前两层的计算结果，对外提供统一的访问接口以方便用户使用。

### 4、案例--典型的推荐系统数据流水架构：

在该架构中，数据同一流入Kafka,之后按照不同时间粒度导入批处理和流式处理两个系统中。

批处理层拥有所有历史数据(通常保存到HDFS/ HBase中),通常用以实现推荐模型,它以当前数据(比如最近一小时数据)和历史数据为输人,通过特征工程、模型构建(通常是迭代算法,使用MapReduce/Spark实现)及模型评估等计算环节后,最终获得最优的模型并将产生的推荐结果存储(比如 Redis)起来,整个过程延迟较大(分钟甚至小时级别);

为了解决推荐系统中的冷启动问题(新用户推荐问题),往往会引入流式处理层:它会实时收集用户的行为,并基于这些行为数据通过简单的推荐算法(通常使用Sorm/ Spark Streaming实现)快速产生推荐结果并存储起来。为了便于其他系统获取推荐结果,推荐系统往往通过服务层对外提供访问接口,比如网站后台在渲染某个访问页面时,可能从广告系统、推荐系统以及内容存储系统中获取对应的结果,并返回给客户端。

## 参考文章
* https://blog.csdn.net/xike1024/article/details/104272901