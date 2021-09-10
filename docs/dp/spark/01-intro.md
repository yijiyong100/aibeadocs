---
title: Spark-基础知识介绍
---

::: tip
本文主要是介绍 Spark-基础知识介绍 。
:::

[[toc]]

[Spark入门的教程参考：](https://blog.csdn.net/xwc35047/category_6168792.html)

Spark入门的教程参考：https://blog.csdn.net/xwc35047/category_6168792.html

随着互联网为代表的信息技术深度发展，其背后由于历史积累产生了TB、PB甚至EB级数据量，由于传统机器的软硬件不足以支持如此庞大的数据量的存储、管理及分析能力，因而专门应对大数据的分布式处理技术应运而生。如今业界大数据处理的主流平台非Hadoop和Spark莫属，本书主要介绍大数据平台的后起之秀Spark，目的是通过系统学习让读者了解和应用大数据，进而提炼大数据中蕴藏的价值。 本章主要向读者介绍Spark的基础概念、发展历程、特点、与现有主流分布式应用框架的区别以及其生态系统中其他的重要组成部分（如Spark SQL、Spark Streaming、GraphX和MLlib等子项目）。目的在于让读者对分布式框架的背景及主流应用有一个宏观而全面的了解，具体细节将在后续章节向读者介绍。

## 1.1 Spark初见

Spark是一个基于内存的开源计算框架，于2009年诞生于加州大学伯克利分校AMPLab（AMP：Algorithms，Machines，People），它最初属于伯克利大学的研究性项目，后来在2010年正式开源，并于 2013 年成为了 Apache 基金项目，到2014年便成为 Apache 基金的顶级项目，该项目整个发展历程刚过六年时间，但其发展速度非常惊人。
正由于Spark来自于大学，其整个发展过程都充满了学术研究的标记，是学术带动Spark核心架构的发展，如弹性分布式数据集（RDD，resilient distributed datasets）、流处理（Spark streaming）、机器学习（MLlib）、SQL分析（Spark SQL）和图计算（GraphX），本节将主要介绍Spark发展

### 1.1.1Spark发展史及近况

Spark起初只是一个学术性研究项目，从创立到如今蜚声海外并且在大数据领域成为风尖浪口的热门项目只花了6年左右的时间，其具体发展大事记如下。

- 2009年Spark诞生于伯克利AMPLab。
- 项目在2010年早些时候开源，很多早期关于Spark系统的思想在不同论文中发表。
- 项目开源之后，在GitHub上成立了Spark开发社区并在2013年成为Apache孵化项目。
- 该项目在2014年2月成为Apache顶级项目。
- 2014年5月30日Spark 1.0.0版正式上线。
- 截止到2015年，Spark官方维护运营公司Databricks已经组织并举办了三年Spark Summit技术峰会。

Spark项目组核心成员在2013年创建了Databricks公司，到目前为止已经在San Francisco连续举办了从2013年到2015年的Spark Summit峰会。会议得到大数据主流厂商Hortonworks、IBM、cloudera、MAPR和Pivotal等公司的支持和大数据方案解决商Amazon、DATASTAX和SAP等公司的合作，Spark的用户和应用量一直在迅速增加，如图1-1所示。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dp/spark/intro-1.png')" alt="wxmp">

从图1-1[ 图1-1引用自https://spark-summit.org/2015/]中可以看出Spark的影响力在2014年（可参考2014年Spark峰会资料）的基础上不断扩大，已经有越来越多Spark用户使用该平台，其中包括传统工业厂商TOYOTA和著名O2O公司Uber与airbnb，说明Spark的用户领域不断深化到传统工业界和互联网与传统行业交叉的领域。不仅如此，越来越多的大数据商业版发行商例如Cloudera以及Hortonworks也开始将Spark纳入其部署范围，这无疑对Spark的商业应用和推广起到巨大作用，另一方面也显示Spark平台技术的先进性。

从Spark的版本演化速度看，说明这个平台旺盛的生命力以及社区的活跃度。尤其在2013年来，Spark进入了一个高速发展期，代码库提交与社区活跃度都有显著增长。以活跃度论，Spark在所有Aparch基金会开源项目中位列前三。相较于其他大数据平台或框架而言，Spark的代码库最为活跃，表现出强劲的发展势头，从图1-2中可以看到。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dp/spark/intro-2.png')" alt="wxmp">

从2013年6月到2014年6月，参与贡献的开发人员从原来的68位增长到255位，截止到2015年6月参与开发的人员已经达到730位（数据引用自Spark Summit 2015中报告），参与贡献的公司逐渐有来自中国的阿里巴巴、百度、网易、腾讯和搜狐等公司。代码库的代码行也从2014年的17万行增长到2015年的40万行。下图为截止2014年Spark代码贡献者的增长曲线，如图1-3可以了解到。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dp/spark/intro-3.png')" alt="wxmp">

从图1-3可以看出Spark从2010年到2014年间社区开源工作者的数量不断增加，而且速度越来越快，从2010年初始到2015年，每月的代码贡献者增到到现在的135位，在这些代码贡献者中出现很多中国公司和开发者的身影。例如目前世界上最大的Spark集群在腾讯，拥有高达8000个节点；最大的单任务处理数据量达到1PB，这项记录是由阿里巴巴公司和databricks公司共同持有。中国之所以能在这方面发展迅速，因为中国市场体量巨大，信息产业发展背后积累了更多数据，进而产生更为迫切的大数据处理需求，最后通过市场需求来推动技术发展。

除了影响力巨大的Spark Summit之外，Spark社区还不定期地在全球各地召开小型的Meetup活动。其中在中国的北京、上海和深圳都有相应的Spark技术分享的Meetup[ Meetup是一家知名的在线活动组织平台。]活动，并且活动受到亚信、微软和InfoQ等公司的大力赞助。Spark Meetup Group已经遍布北美、欧洲、亚洲和大洋洲。下图1-4为Spark Meetup Groups在全球的分布图。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dp/spark/intro-4.png')" alt="wxmp">

从以上近况可以看出Spark的迅猛发展态势，国内外工业界还是学术界都对其抱有极大兴趣，相信Spark有望成为未来大数据分析的主流平台。

### 1.1.2 Spark特点

Spark之所以这么受关注，主要是因为其有与其他大数据平台不同的特点，主要如下。
1．轻量级快速处理
大数据处理中速度往往被置于第一位，Spark允许传统Hadoop集群中的应用程序在内存中以100倍的速度运行，即使在磁盘上运行也能快10倍。Spark通过减少磁盘IO来达到性能的提升，它们将中间处理数据全部放到了内存中。Spark使用了RDD（Resilient Distributed Datasets）数据抽象，这允许它可以在内存中存储数据，只在需要时才持久化到磁盘。这种做法大大的减少了数据处理过程中磁盘的读写，大幅度的降低了运行时间。

2．易于使用
Spark支持多语言。Spark允许Java、Scala、Python及R（Spark 1.4版最新支持），这允许更多的开发者在自己熟悉的语言环境下进行工作，普及了Spark的应用范围，它自带80多个高等级操作符，允许在shell中进行交互式查询，它多种使用模式的特点让应用更灵活。

3．支持复杂查询
除了简单的map及reduce操作之外，Spark还支持filter、foreach、reduceByKey、aggregate以及SQL查询、流式查询等复杂查询。Spark更为强大之处是用户可以在同一个工作流中无缝的搭配这些功能，例如Spark可以通过Spark Streaming（1.2.2小节对Spark Streaming有详细介绍）获取流数据，然后对数据进行实时SQL查询或使用MLlib库进行系统推荐，而且这些复杂业务的集成并不复杂，因为它们都基于RDD这一抽象数据集在不同业务过程中进行转换，转换代价小，体现了统一引擎解决不同类型工作场景的特点。有关Streaming技术以及MLlib库和RDD将会这之后几个章节进行详述。

4．实时的流处理
对比MapReduce只能处理离线数据，Spark还能支持实时流计算。Spark Streaming主要用来对数据进行实时处理，当然在YARN之后Hadoop也可以借助其他的工具进行流式计算。对于Spark Streaming，著名的大数据产品开发公司Cloudera曾经对Spark Streaming有如下评价：
1）简单、轻量且具备功能强大的API，Sparks Streaming允许用户快速开发流应用程序。
2）容错能力强，不像其他的流解决方案，比如使用Storm需要额外的配置，而Spark无需额外的代码和配置，因为直接使用其上层应用框架Spark Streaming就可以做大量的恢复和交付工作，让Spark的流计算更适应不同的需求。
3）集成性好，为流处理和批处理重用了同样的代码，甚至可以将流数据保存到历史数据中（如HDFS）。

5．与已存Hadoop数据整合
Spark不仅可以独立的运行（使用standalone模式），还可以运行在当下的YARN管理集群中。它还可以读取已有的任何Hadoop数据，这是个非常大的优势，它可以运行在任何Hadoop数据源上，比如HBase、HDFS等。如果合适的话，这个特性让用户可以轻易迁移已有Hadoop应用。

6．活跃和不断壮大的社区
Spark起源于2009年，当下已有超过50个机构730个工程师贡献过代码，与2014年6月相比2015年代码行数扩大了近三倍（数据源于Spark Summit 2015公布的数据），这是个惊人的增长。

### 1.1.3 Spark的作用

为什么现阶段Spark被如此众多的公司应用呢？从需求角度来看，信息行业数据量的不断积累膨胀，传统单机因本身软硬件限制无法处理，很需要能对大量数据进行存储和分析处理的系统，另一方面如Google、Yahoo等大型互联网公司因为业务数据量增长非常快，强劲的需求促进了数据存储和计算分析系统技术的发展，同时公司对大数据处理技术的高效实时性要求越来越高，Spark就是在这样一个需求导向的背景下出现，其设计的目的就是能快速处理多种场景下的大数据问题，能高效挖掘大数据中的价值，从而为业务发展提供决策支持。

目前Spark已经在电商、电信、视频娱乐、零售、商业分析和金融等领域有广泛应用，在本书第四部分的应用篇能看到这些领域公司在Spark方面的应用分享，读者能从中一窥Spark的强大能力。

### 1.1.4 Spark的体系结构

如图1-5所示，Spark的体系结构不同于Hadoop的MapReduce和HDFS，Spark主要包括Spark Core和在Spark Core基础之上建立的应用框架Spark SQL、Spark Streaming、MLlib和GraphX。

Core库中主要包括上下文（Spark Context）、抽象数据集（RDD）、调度器（Scheduler）、洗牌（shuffle）和序列化器（Serializer）等。Spark系统中的计算、IO、调度和shuffle等系统基本功能都在其中。

在Core库之上就根据业务需求分为用于交互式查询的SQL、实时流处理Streaming、机器学习Mllib和图计算GraphX四大框架，除此外还有一些其他实验性项目如Tachyon、BlinkDB和Tungsten等。这些项目共同组成Spark体系结构，当然Hadoop中的存储系统HDFS迄今仍是不可被替代，一直被各分布式系统所使用，它也是Spark主要应用的持久化存储系统。在1.3节和第四章可以更全面的学习到这四大应用框架的内容。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dp/spark/intro-5.png')" alt="wxmp">

### 1.1.5 Spark发展趋势

不论国内外，信息技术都不断被企业和政府所重视，从德国的“工业4.0”到美国的“工业互联网”战略规划，再到中国的“中国制造2025”和“互联网+”，这其中无不体现政府对以云计算、物联网和大数据技术与传统工业深度融合，协同发展的期待，而中国本身是制造业大国，更需要先进的信息技术对接来提升工业制造水平来满足客户越来越个性化的需求。

Spark平台技术本身也正被医疗、金融、电信、电商和政府等越来越多的领域所使用，相信在未来以大数据技术为代表的Spark平台以其优良的设计理念加上社区蓬勃的发展态势，极有可能在未来5到10年内成为大数据处理平台事实的标准。

## 1.2 与现有分布式框架对比


在讲述了关于Spark的背景、特点等内容后，还有一点值得提出的就是点燃大数据处理技术迅猛发展的技术平台应该是始于2004年的Hadoop，然而经过10多年的发展，传统以Hadoop为代表大数据处理技术因其当初设计目的缺陷，已经不能满足当前应用实时性以及迭代运算需求，一批新处理框架如雨后春笋般的出现，如流处理框架Storm、Samza、Spark Streaming和即席查询框架Spark SQL。本节将对他们进行对比，目的是让读者对新老框架的设计目的、应用及趋势有一定了解。

### 1.2.1 批处理框架

这里主要对比Hadoop与Spark在批处理方面的区别，他们在设计目的、计算模型和使用场景等方面进行对比，如表1-1所示。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dp/spark/intro-6.png')" alt="wxmp">

从表1-1中可以看出，发展10余年的Hadoop解决了处理大数据的问题，但因其设计之初没有考虑到效率，导致在面对迭代计算问题时效率很低，主要原因归结于其M/R计算模型太单一且计算过程中的Shuffle过程对本地硬盘的I/O消耗太大，不能适应复杂需求。不仅如此，当Hadoop要面对SQL交互式查询场景、实时流处理场景以及机器学习场景就力不从心，不得不跟其他第三方应用框架结合，导致不同类型业务（如流处理和SQL交互查询）在衔接过程中因涉及不同的数据格式，数据在共享和转换过程中要消耗大量资源。

大家都知道内存计算速度比机械硬盘快几个数量级，Spark作为基于内存计算大数据处理平台以其高速、多场景适用的特点逐渐脱颖而出，体现了一个堆栈来解决各种场景（One stack rule all）的宗旨。

### 1.2.2 流处理框架

storm是一个分布式的、容错的实时计算系统，它由Twitter公司开源，专门用于数据实时处理的平台。它与Spark streaming功能相似，都是将流数据分成一个个小块的批（batch）数据进行数据处理，但也有很多不同，下面主要从处理延迟和容错两个方面进行分析：


1．处理模型，延迟 虽然这两个框架都提供可扩展性和容错性，它们根本的区别在于他们的处理模型。Storm处理的是每次传入的一个事件，而Spark Streaming是处理某个时间段窗口内的事件流。因此，Storm处理一个事件可以达到秒内的延迟，而Spark Streaming则有秒级延迟。

2．容错、数据保证
在容错数据保证方面，Spark Streaming提供了更好的支持容错状态计算。在Storm中，每个单独的记录当它通过系统时必须被跟踪，所以Storm能够至少保证每个记录将被处理一次，但是在从错误中恢复过来时候允许出现重复记录。这意味着可变状态可能被错误的更新两次。

另一方面，Spark Streaming只需要在批级别进行跟踪处理，因此即便一个节点发生故障，也可以有效地保证每个批处理过程的数据将完全被处理一次。实际上Storm的Trident library库也提供了完全一次处理，但它依赖于事务更新状态，这比较慢，通常必须由用户实现。

对于目前版本的Spark Streaming而言，最小选取的批数据量（Batch Size）可以在0.5-2秒钟之间（Storm目前最小的延迟是100ms左右），故Spark Streaming能够满足除对实时性要求非常高（如高频实时交易）之外的流式准实时（“准实时”表示数据延迟在秒级）计算场景。

简而言之，如果需要毫秒级的延迟，Storm是一个不错的选择，而且没有数据丢失。如果需要有状态的计算，计算的时延是秒级，Spark Streaming则更好。Spark Streaming编程逻辑也可能更容易，因为它类似于批处理模型MapReduce，此外Spark因为融合了多种业务模型，如果面对融合不同业务场景，考虑到人工维护成本和数据转换成本，Spark平台能更符合需求。

## 1.3 Spark生态系统

Spark设计目的是全栈式解决批处理、结构化数据查询、流计算、图计算和机器学习业务场景，此外其通用性还体现在对存储层（如HDFS、cassandra[ cassandra：最初由Facebook开发的分布式NoSQL数据库，于2008年开源。]）和资源管理层（MESOS[ MESOS：AMPLab最初开发的一个集群管理器，提供了有效的、跨分布式应用或框架的资源隔离和共享。]、YARN[ YARN：是一种新的 Hadoop 资源管理器，它是一个通用资源管理系统。]）的支持。如图1-6是Spark生态系统，在Spark Core的上层有支持SQL查询的子项目Spark SQL、支持机器学习的MLlib库、支持图计算的GraphX以及支持流计算的Spark Streaming等。这样的生态圈让Spark的核心RDD抽象数据集能在不同应用中使用，大大减少数据转换的消耗和运维管理的资源。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dp/spark/intro-7.png')" alt="wxmp">

图1-6所示的生态系统被AMPLab称为伯克利数据分析栈（BDAS：Berkeley Data Analytics Stack,），下面对BDAS中的主要项目进行介绍。

### 1．Spark
作为Spark生态系统的核心，Spark主要提供基于内存计算的功能，不仅包含Hadoop的计算模型的MapReduce，还包含很多其他的如reduceByKey、groupByKey、foreach、join和filter等API。Spark将数据抽象为弹性分布式数据集，有效扩充了Spark编程模型，能让Spark成为多面手，能让交互式查询、流处理、机器学习和图计算的应用无缝交叉融合，极大的扩张了Spark的应用业务场景，同时Spark使用函数式编程语言Scala，让编程更简洁高效。

### 2．SQL/Shark
Shark是为了将Hive应用移植到Spark平台下而出现的数据仓库。Shark在HQL（一般将Hive上对SQL支持的语言称为HQL）方面重用了Hive的HQL解析、逻辑计划翻译、执行计划优化等逻辑，可以认为仅将底层物理执行计划从Hadoop的MR作业转移到Spark作业，此外还赖Hive Metastore和Hive SerDe。这样做会导致执行计划过于依赖Hive，不方便添加新的优化策略，因此为了减少对Hive本身框架的依赖，引入Spark SQL解决上述问题。

Spark SQL仅依赖HQL Parser、Hive metastore和Hive SerDe，即说明在解析SQL生成抽象语法树（Abstract Syntax Tree，AST）后的部分都是由Spark SQL自身的Calalyst负责（图1-7所示为Spark SQL与Hive之间的关系），利用scala模式匹配等函数式语言的特性，让Catalyst开发的执行计划优化策略比Hive更简洁。除了HQL以外，Spark SQL还内建了一个精简的SQL parser，以及一套Scala特定领域语言（Domain Specific Language， DSL）。也就是说，如果只是使用Spark SQL内建的SQL方言或Scala DSL对原生RDD对象进行关系查询，用户在开发Spark应用时完全不需要依赖Hive的任何东西，因而日后的发展趋势重点在Spark SQL，对Shark的支持会逐渐淡化。

Spark SQL从Spark1.3开始支持提供一个抽象的编程结构DataFrames，能充当分布式SQL查询引擎。DataFrame本质就是一张关系型数据库中的表，但是底层有很多方面的优化，它能从多种数据源中转化而来，例如结构型数据文件（如Avro, Parquet, ORC, JSON和JDBC）、Hive表、外部数据库或已经存在的RDD。对于Spark SQL，本书将在之后的第4章4.1节对其展开进行更详细的介绍。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dp/spark/intro-8.png')" alt="wxmp">

### 3．Spark Streaming
Spark Streaming是基于Spark的上层应用框架，使用内建API，能像写批处理文件一样编写流处理任务，易于使用，它还提供良好的容错特性，能在节点宕机情况下同时恢复丢失的工作和操作状态。

在处理时间方面，Spark Streaming是基于时间片准实时处理，能达到秒级延迟，吞吐量比Storm大，此外还能和Spark SQL与Spark MLlib联合使用，构建强大的流状态运行即席（ad-hoc）查询和实时推荐系统。对于Spark Streaming，本书将在之后第4章4.2节对其展开进行更详细的介绍。

### 4．GraphX
GraphX是另一个基于Spark的上层的分布式图计算框架，提供了类似Google图算法引擎Pregel的功能，主要处理社交网络等节点和边模型的问题。因为Spark能很好的支持迭代计算，故处理效率优势明显。GraphX的最新版（Spark 1.4.1）支持PageRank、SVD++和三角形计数等算法。目前国内的淘宝技术部在graphX方面的应用成果很多，可以参考http://rdc.taobao.org了解更多信息。对于GraphX，本书将在之后第4章4.3节对其展开进行更详细的介绍。

### 5．MLlib
MLlib是Spark生态系统在机器学习领域的重要应用，它充分发挥Spark迭代计算的优势，能比传统MapReduce模型算法快100倍以上。
MLlib 1.3实现了逻辑回归、线性SVM、随机森林、K-means、奇异值分解等多种分布式机器学习算法，充分利用RDD的迭代优势，能对大规模数据应用机器学习模型，并能与Spark Streaming、Spark SQL进行协作开发应用，让机器学习算法在基于大数据的预测、推荐和模式识别等方面应用更广泛。对于MLlib以及其中支持的算法，本书将在之后第4章4.4节对其展开进行更详细的介绍。

### 6．Tachyon
Tachyon是基于内存的分布式文件系统。过去Spark的计算功能和内存管理都在JVM中，导致JVM负载较高，同时各任务共享数据也不方便，当JVM崩溃后很多缓冲数据也会丢失，为了解决上述问题，从而衍生出Tachyon技术。

其主要设计目的是分离Spark的计算功能和内存管理功能，让内存管理脱离JVM，专门设计Tachyon来在JVM外管理内存数据。这样做解决了Spark在数据共享、缓存数据丢失情况下效率较低的问题，还能减少JVM因为数据量过多导致经常的GC垃圾收集，有效提升了Spark的计算效率。从另一个角度看，Tachyon在Spark计算框架和基于磁盘HDFS之间可看成内存与硬盘之间的缓存，能有效提升数据读取速度。

### 7．Mesos
Mesos是一个集群管理器，与YARN功能类似，提供跨分布式应用或框架的资源隔离与共享，上面运行Hadoop（一种类似Spark的分布式系统基础架构）、Hypertable（一种类似Google公司Bigtable的数据库）、Spark，。Mesos使用分布式应用程序协调服务Zookeeper实现容错，同时利用基于Linux的容器隔离任务，支持不同的资源分配计划。

### 8．YARN
YARN（Yet Another Resource Negotiator）最初是为Hadoop生态设计的资源管理器，能在上面运行Hadoop、Hive、Pig（Pig是一种基于Hadoop平台的高级过程语言）、Spark等应用框架。在Spark使用方面，YARN与Mesos很大的不同是Mesos是AMPlab开发的资源管理器，对Spark支持力度很大，但国内主流使用仍是YARN，主要是YARN对Hadoop生态的适用性更好。

### 9．BlinkDB
BlinkDB 是一个用于在海量数据上运行交互式SQL近似查询的大规模并行查询引擎。它允许用户在查询结果精度和时间上作出权衡，其数据的精度被控制在允许的误差范围内。BlinkDB达到这样目标的两个核心思想分别是提供一个自适应优化框架，从原始数据随着时间的推移建立并维护一组多维样本，另一个是使用一个动态样本选择策略，选择一个适当大小的示例，基于查询的准确性和响应时间来实现需求。

## 1.4 Spark的数据存储

Spark本身是基于内存计算的架构，数据的存储也主要分为内存和磁盘两个路径，Spark本身则根据存储位置、是否可序列化和副本数目这几个要素将数据存储分为多种存储级别。此外还可选择使用Tachyon来管理内存数据。

为了适应迭代计算，Spark将经常被重用的数据缓存到内存中以提升数据读取速度，当内存容量有限的时候则将数据存入磁盘中或根据最近最少使用页面置换算法（Least Recently Used，LRU）算法将内存中使用频率较低的文件空间收回，从而让新的数据进来。

Tachyon的出现主要是为了解决三个问题而设计。第一个是多应用数据共享问题，其次是JVM缓存数据丢失问题，再次是GC开销问题。它将过去的Spark中计算和内存管理两个部分分离，专门使用Tachyon在JVM堆外管理Spark计算所需要的数据，极大的减轻了Spark管理上的负担和JVM内存负担。这种设计思路能很好的解决以上三个问题并提升程序运行的稳定性和速度，在第5.4节能了解更多Tachyon的内容。

## 1.5 本章小结

本章首先对Spark进行概述，对Spark发展历程及目前应用态势进行详细说明，体现了Spark在全球和国内在大数据平台领域如火如荼的发展形势；然后对Spark平台与Hadoop平台在数据批处理以及流式处理方面进行对比分析，让读者知道大数据平台的来龙去脉和发展趋势。最后介绍了Spark的生态系统，Spark作为一个开源分析处理平台，为了应对现实环境中复杂的场景，必然要与不同的框架结合使用才能发挥更好的性能，其中的Spark SQL、Spark Streaming、MLlib和graphX被广泛的应用在工业界各领域，后面章节将对这些技术应用进行详细说明，下一章将学习Spark运行环境和源码阅读环境的搭建方法。


## 参考文章
* https://blog.csdn.net/xwc35047/article/details/51072145
* https://blog.csdn.net/xwc35047/category_6168792.html