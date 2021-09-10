---
title: Storm-基础知识介绍
---

::: tip
本文主要是介绍 Storm-基础知识 。
:::

[[toc]]

## Storm笔记整理（一）：简介与设计思想

## 实时计算概述

有别于传统的离线批处理操作(对很多数据的集合进行的操作)，实时处理，说白就是针对一条一条的数据/记录进行操作，所有的这些操作进行一个汇总(截止到目前为止的所有的统计总和)。

### 实时计算与离线计算比较

```html
Bounded：有界
	离线计算面临的操作数据都是有界限的，无论是1G、1T、1P、1EB、1NB
	数据的有界必然会导致计算的有界

UnBounded：×××
	实时计算面临的操作数据是源源不断的向水流一样，是没有界限的，
	数据的×××必然导致计算的×××
```

来自Flink官网的说明：

```html
First, 2 types of datasets
	Unbounded: Infinite datasets that are appended to continuously
	Bounded: Finite, unchanging datasets
	
Second, 2 types of execution models
	Streaming: Processing that executes continuously as long as data is being produced
	Batch: Processing that is executed and runs to completeness in a finite amount of 
		   time, releasing computing resources when finished
```

### 大数据处理的6大问题


1、大计算中心

- 离线批处理
	
- 准实时流计算中心
	
- 实时流计算

2、大计算引擎
	
- 用户交互式计算引擎:SQL/ES
	
- 图计算引擎
	
- 机器学习计算引擎

## Storm简介

ApacheStorm是Twitter开源的一个类似于Hadoop的实时数据处理框架，它原来是由BackType开发，后BackType被Twitter收购，将Storm作为Twitter的实时数据分析系统。

Storm能实现高频数据和大规模数据的实时处理。

官网资料显示storm的一个节点1秒钟能够处理100万个100字节的消息(IntelE5645@2.4Ghz的CPU,24GB的内存)。（即单节点每秒大概处理95MB左右数据）

官网：[ http://storm.apache.org](http://storm.apache.org/)

### Storm和Hadoop比较

- 数据来源

  HADOOP处理的是HDFS上TB级别的数据(历史数据)，STORM是处理的是实时新增的某一笔数据(实时数据)；

- 处理过程

  HADOOP是分MAP阶段到REDUCE阶段，STORM是由用户定义处理流程，流程中可以包含多个步骤，每个步骤可以是数据源(SPOUT)或处理逻辑(BOLT)；

- 是否结束

  HADOOP最后是要结束的，STORM是没有结束状态，到最后一步时，就停在那，直到有新数据进入时再从头开始；

- 处理速度

HADOOP是以处理HDFS上TB级别数据为目的，处理速度慢，STORM是只要处理新增的某一笔数据即可，可以做到很快；

- 适用场景

HADOOP是在要处理批量数据时用的，不讲究时效性，STORM是要处理某一新增数据时用的，要讲时效性。

## Storm的设计思想

Storm是对流Stream的抽象，流是一个不间断的×××的连续tuple，注意Storm在建模事件流时，把流中的事件抽象为tuple即元组。

 Storm将流中元素抽象为Tuple，一个tuple就是一个值列表——valuelist，list中的每个value都有一个name，并且该value可以是基本类型，字符类型，字节数组等，当然也可以是其他可序列化的类型。

Storm认为每个stream都有一个stream源，也就是原始元组的源头，所以它将这个源头称为Spout。

有了源头即spout也就是有了stream，那么该如何处理stream内的tuple呢。将流的状态转换称为Bolt，bolt可以消费任意数量的输入流，只要将流方向导向该bolt，同时它也可以发送新的流给其他bolt使用，这样一来，只要打开特定的spout（管口）再将spout中流出的tuple导向特定的bolt，又bolt对导入的流做处理后再导向其他bolt或者目的地。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dp/storm/intro1-1.png')" alt="wxmp">


以上处理过程统称为Topology即拓扑。拓扑是storm中最高层次的一个抽象概念，它可以被提交到storm集群执行，一个拓扑就是一个流转换图，图中每个节点是一个spout或者bolt，图中的边表示bolt订阅了哪些流，当spout或者bolt发送元组到流时，它就发送元组到每个订阅了该流的bolt（这就意味着不需要我们手工拉管道，只要预先订阅，spout就会将流发到适当bolt上）。

拓扑的每个节点都要说明它所发出的元组的字段的name，其他节点只需要订阅该name就可以接收处理。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dp/storm/intro1-2.png')" alt="wxmp">


## 【----------------------------】
# storm简介、原理、概念


## 1.什么是storm

​    Storm是Twitter开源的分布式实时大数据处理框架，被业界称为实时版Hadoop。随着越来越多的场景对Hadoop的MapReduce高延迟无法容忍，比如网站统计、推荐系统、预警系统、金融系统(高频交易、股票)等等，大数据实时处理解决方案（流计算）的应用日趋广泛，目前已是分布式技术领域最新爆发点，而Storm更是流计算技术中的佼佼者和主流。

​    按照storm作者的说法，Storm对于实时计算的意义类似于Hadoop对于批处理的意义。Hadoop提供了map、reduce原语，使我们的批处理程序变得简单和高效。同样，Storm也为实时计算提供了一些简单高效的原语，而且Storm的Trident是基于Storm原语更高级的抽象框架，类似于基于Hadoop的Pig框架，让开发更加便利和高效。

 

## 2.storm应用场景

推荐系统（实时推荐，根据下单或加入购物车推荐相关商品）、金融系统、预警系统、网站统计（实时销量、流量统计，如淘宝双11效果图）、交通路况实时系统等等。

 

## 3.storm的一些特性

1.**适用场景广泛**： storm可以实时处理消息和更新DB，对一个数据量进行持续的查询并返回客户端（持续计算），对一个耗资源的查询作实时并行化的处理(分布式方法调用，即DRPC），storm的这些基础API可以满足大量的场景。

2. **可伸缩性高**: Storm的可伸缩性可以让storm每秒可以处理的消息量达到很高。扩展一个实时计算任务，你所需要做的就是加机器并且提高这个计算任务的并行度 。Storm使用ZooKeeper来协调集群内的各种配置使得Storm的集群可以很容易的扩展。

3. **保证无数据丢失**： 实时系统必须保证所有的数据被成功的处理。 那些会丢失数据的系统的适用场景非常窄， 而storm保证每一条消息都会被处理， 这一点和S4相比有巨大的反差。

4. **异常健壮**： storm集群非常容易管理，轮流重启节点不影响应用。

5. **容错性好**：在消息处理过程中出现异常， storm会进行重试

6. **语言无关性**： Storm的topology和消息处理组件(Bolt)可以用任何语言来定义， 这一点使得任何人都可以使用storm.

 

## 4.storm集群结构

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dp/storm/intro2-1.png')" alt="wxmp">

| <img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dp/storm/intro2-2.png')" alt="wxmp">
                                 | Nimbus 和Supervisors 之间所有的协调工作是通过 一个Zookeeper 集群。                                                          |
                                 | --------------------------------------------------------------------------------------------------------------------------- | --- |
                                 | Nimbus进程和 Supervisors 进程是无法直接连接，并且是无状态的;  所有的状态维持在Zookeeper中或保存在本地磁盘上。               |     |
                                 | 意味着你可以 kill -9 Nimbus 或Supervisors 进程，而不需要做备份。这种设计导致storm集群具有令人难以置信的稳定性，并且无耦合。 |     |

 

## 5.storm工作原理

Nimbus 负责在集群分发的代码，topo只能在nimbus机器上提交，将任务分配给其他机器，和故障监测。

Supervisor，监听分配给它的节点，根据Nimbus 的委派在必要时启动和关闭工作进程。 每个工作进程执行topology 的一个子集。一个运行中的topology 由很多运行在很多机器上的工作进程组成。

在Storm中有对于流stream的抽象，流是一个不间断的无界的连续tuple，注意Storm在建模事件流时，把流中的事件抽象为tuple即元组

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dp/storm/intro2-3.png')" alt="wxmp">

Storm认为每个stream都有一个源，也就是原始元组的源头，叫做Spout（管口）

处理stream内的tuple，抽象为Bolt，bolt可以消费任意数量的输入流，只要将流方向导向该bolt，同时它也可以发送新的流给其他bolt使用，这样一来，只要打开特定的spout再将spout中流出的tuple导向特定的bolt，bolt又对导入的流做处理后再导向其他bolt或者目的地。

可以认为spout就是水龙头，并且每个水龙头里流出的水是不同的，我们想拿到哪种水就拧开哪个水龙头，然后使用管道将水龙头的水导向到一个水处理器（bolt），水处理器处理后再使用管道导向另一个处理器或者存入容器中。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dp/storm/intro2-4.png')" alt="wxmp">

为了增大水处理效率，我们很自然就想到在同个水源处接上多个水龙头并使用多个水处理器，这样就可以提高效率。

| <img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dp/storm/intro2-5.png')" alt="wxmp">
 | 这是一张有向无环图，Storm将这个图抽象为Topology(拓扑)，Topo就是storm的Job抽象概念，一个拓扑就是一个流转换图 |
 | ----------------------------------------------------------------------------------------------------------- | --- |
 | 图中每个节点是一个spout或者bolt，每个spout或者bolt发送元组到下一级组件。                                    |     |
 | 而Spout到单个Bolt有6种流分组策略。                                                                          |     |

 

## 6.Topology

Storm将流中元素抽象为tuple，一个tuple就是一个值列表value list，list中的每个value可以是任意可序列化的类型。拓扑的每个节点都要说明它所发射出的元组的字段的name，其他节点只需要订阅该name就可以接收处理。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dp/storm/intro2-6.png')" alt="wxmp">

   

## 7.storm相关概念

**Streams**：消息流

​    消息流是一个没有边界的tuple序列，而这些tuples会被以一种分布式的方式并行创建和处理。 每个tuple可以包含多列，字段类型可以是： integer, long, short, byte, string, double, float, boolean和byte array。 你还可以自定义类型 — 只要你实现对应的序列化器。

**Spouts**：消息源

   Spouts是topology消息生产者。Spout从一个外部源(消息队列)读取数据向topology发出tuple。 **消息源****Spouts****可以是可靠的也可以是不可靠的**。一个可靠的消息源可以重新发射一个处理失败的tuple， 一个不可靠的消息源Spouts不会。

   Spout类的方法nextTuple不断发射tuple到topology，storm在检测到一个tuple被整个topology成功处理的时候调用ack, 否则调用fail。

   storm只对可靠的spout调用ack和fail。

**Bolts**：消息处理者

   消息处理逻辑被封装在bolts里面，Bolts可以做很多事情： 过滤， 聚合， 查询数据库等。

   Bolts可以简单的做消息流的传递。复杂的消息流处理往往需要很多步骤， 从而也就需要经过很多Bolts。第一级Bolt的输出可以作为下一级Bolt的输入。而Spout不能有一级。

   Bolts的主要方法是execute（死循环）连续处理传入的tuple，成功处理完每一个tuple调用OutputCollector的ack方法，以通知storm这个tuple被处理完成了。当处理失败时，可以调fail方法通知Spout端可以重新发送该tuple。

   流程是： Bolts处理一个输入tuple, 然后调用ack通知storm自己已经处理过这个tuple了。storm提供了一个IBasicBolt会自动调用ack。

   Bolts使用OutputCollector来发射tuple到下一级Blot。

**一组形象的对比**：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dp/storm/intro2-7.png')" alt="wxmp">


## 【----------------------------】


## Storm概述简介

## 1.流式计算与Storm概述(背景)：

　　根据业务需求，数据的处理可以分为离线处理和实时(流式)处理，在离线处理方面Hadoop提供了很好的解决方案，Hadoop不仅可以用

来存储海量数据，还以用来计算海量数据。因为其高吞吐、高可靠等特点，很多互联网公司都已经使用Hadoop来构建数据仓库，高频使用

并促进了Hadoop生态圈的各项技术的发展.但是针对海量数据的实时处理却一直没有比较好的解决方案,Storm横空出世，与生俱来的分布式

、高可靠、高吞吐的特性，横扫市面上的一些流式计算框架，渐渐的成为了流式计算的首选框架；

　　2013年，阿里巴巴开源了基于storm的设计思路使用java重现编写的流式计算框架*JStorm* ，JStorm 是一个类似Hadoop MapReduce的系

统， 用户按照指定的接口实现一个任务，然后将这个任务递交给JStorm系统，Jstorm将这个任务跑起来，并且按7 * 24小时运行起来，一

旦中间一个Worker 发生意外故障， 调度器立即分配一个新的Worker替换这个失效的Worker。因此，从应用的角度，JStorm 应用是一种遵

守某种编程规范的分布式应用。从系统角度， JStorm是一套类似MapReduce的调度系统。 从数据的角度， 是一套基于流水线的消息处理机

制；*鉴于大多数企业的生产环境还在使用storm，我们学习的目标还是切换到Apache基金会的storm上来。

## 2.Storm用来解决什么样的问题(背景)：

　　信息的时效(实时)性　

　　举个搜索场景中的例子，当一个卖家发布了一条宝贝信息时，他希望的当然是这个宝贝马上就可以被卖家搜索出来、点击、购买啦，相反，如果这个宝贝要等到第二天或者更久才可以被搜出来，估计这个大哥就要骂娘了；

## 3.离线计算是什么？

　　`离线计算：批量获取数据、批量传输数据、周期性批量计算数据、数据展示`

`　　代表技术：Sqoop批量导入数据、HDFS批量存储数据、MapReduce批量计算数据、Hive批量计算数据、批量计算任务调度`

相关岗位日常业务：
- 1、hivesql
- 2、调度平台
- 3、Hadoop集群运维
- 4、数据清洗（脚本语言）
- 5、元数据管理
- 6、数据稽查
- 7、数据仓库模型架构

## 4.流式计算是什么？

　　流式计算：数据实时产生、数据实时传输、数据实时计算、实时展示

　　代表技术：Flume实时获取数据、Kafka/metaq实时数据存储、Storm/JStorm实时数据计算、Redis实时结果缓存、持久化存储(mysql)。

　　一句话总结：将源源不断产生的数据实时收集并实时计算，尽可能快(依赖外部系统)的得到计算结果

　　所以：离线计算和实时计算的最大区别在于：实时计算是：实时收集、实时计算、实时展示的

## 5.Storm是什么？

　　Flume实时采集，低延迟

　　Kafka消息队列，低延迟

　　Storm实时计算，低延迟

　　Redis实时存储，低延迟

　　Storm用来实时处理数据，特点：低延迟、高可用、分布式、可扩展、数据不丢失。提供简单容易理解的接口，便于开发。

## 6.Storm的应用场景及其行业案例：

　　Storm用来*实时计算*源源不断产生的数据，如同流水线生产

### 6.1：应用场景：

　　Storm处理数据的方式是基于消息的流水线处理， 因此特别适合无状态计算，也就是计算单元的依赖的数据全部在接受的消息

中可以找到， 并且最好一个数据流不依赖另外一个数据流。因此，常常用于

- 日志分析，从海量日志中分析出特定的数据，并将分析的结果存入外部存储器用来辅佐决策。

- 管道系统， 将一个数据从一个系统传输到另外一个系统， 比如将数据库同步到Hadoop

- 消息转化器， 将接受到的消息按照某种格式进行转化，存储到另外一个系统如消息中间件

- 统计分析器，从日志或消息中，提炼出某个字段，然后做count或sum计算，最后将统计值存入外部存储器。中间处理过程可

能更复杂

### 6.2：典型案例：　　

　　案列1：一淘-实时分析系统，实时分析用户的属性，反馈给搜索引擎

     一淘-实时分析系统：实时分析用户的属性，并反馈给搜索引擎。最初，用户属性分析是通过每天在云梯上定时运行的MR job来完成的。为满足实时性的要求，希望能够实时分析用户的行为日志，将最新的用户属性反馈给搜索引擎，能够为用户展现最贴近其当前需求的结果

　　案列2：实时分析系统监控携程网的网站性能

     携程-网站性能监控：实时分析系统监控携程网的网站性能。利用HTML5提供的performance标准获得可用的指标，并记录日志。Storm集群实时分析日志和入库。使用DRPC聚合成报表，通过历史数据对比等判断规则，触发预警事件。

　　案列3：游戏实时运营

     一个游戏新版本上线，有一个实时分析系统，收集游戏中的数据，运营或者开发者可以在上线后几秒钟得到持续不断更新的游戏监控报告和分析结果，然后马上针对游戏的参数 和平衡性进行调整。这样就能够大大缩短游戏迭代周期，加强游戏的生命力

　　案列4：实时计算在腾讯的运用

     实时计算在腾讯的运用：精准推荐（广点通广告推荐、新闻推荐、视频推荐、游戏道具推荐）；实时分析（微信运营数据门户、效果统计、订单画像分析）；实时监控（实时监控平台、游戏内接口调用）

　　案列5：阿里妈妈--用户画像，实时计算用户的兴趣数据

     为了更加精准投放广告，阿里妈妈后台计算引擎需要维护每个用户的兴趣点（理想状态是，你对什么感兴趣，就向你投放哪类广告）用户兴趣主要基于用户的历史行为、用户的实时查询、用户的实时点击、用户的地理信息而得，其中实时查询、实时点击等用户行为都是实时数据。考虑到系统的实时性，阿里妈妈使用Storm维护用户兴趣数据，并在此基础上进行受众定向的广告投放。

## 7.Storm和Hadoop的区别：　　　

　 Storm用于实时计算，Hadoop是面向基于内存流转的离线计算。

　　Storm处理的数据保存在内存中，源源不断；Hadoop处理的数据保存在文件系统中，一批一批(数据存储的介质不同)

　　Storm的数据通过网络传输进来；Hadoop的数据保存在磁盘中。(Hadoop是磁盘级计算，进行计算时，数据在磁盘上，需要读写

磁盘；Storm是内存级计算，数据直接通过网络导入内存。读写内存比读写磁盘速度快n个数量级)

　　Storm与Hadoop的架构一样，编程模型相似

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dp/storm/intro3-1.png')" alt="wxmp">

## 8.Storm的核心组件(重点)：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dp/storm/intro3-2.png')" alt="wxmp">

　　Nimbus：负责资源分配和任务调度。

　　Supervisor：负责接受nimbus分配的任务，启动和停止属于自己管理的worker进程。通过配置文件设置当前supervisor上启动多少个worker

　　Worker：运行具体处理组件逻辑的进程。一种是Spout任务，一种是Bolt任务。

　　Task：worker中每一个spout/bolt的线程称为一个task. 在storm0.8之后，task不再与物理线程对应，同一个spout/bolt

的task可能会共享一个物理线程，该线程称为executor。

## 9.Storm的编程模型(重点)：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dp/storm/intro3-3.png')" alt="wxmp">

　　各个组件说明：

　　1.DataSource：外部数据源

　　2.Topology：Storm中运行的一个实时应用程序的名称，因为各个组件间的消息流动形成逻辑上的一个拓扑结构

　　3.Spout：在一个Topology中获取源数据流的组件，通常情况下spout会从外部数据源中读取数据，然后转换为Storm内部的源数据。

以Tuple为基本的传输单元下发给Bolt,Spout是一个主动的角色，其接口中有个nextTuple()函数，storm框架会不停地调用此函数，用户

只要在其中生成源数据即可

　　4.Bolt：在一个Topology中接收数据然后执行处理的组件,Bolt可以执行过滤、函数操作、合并、写数据库等任何操作。Bolt是一个

被动的角色，其接口中有个execute(Tuple input)函数,在接受到消息后会调用此函数，用户可以在其中执行自己想要的操作。

　　5.Tuple：一次消息传递的基本单元。本来应该是一个key-value的map，但是由于各个组件间传递的tuple的字段名称已经事先定义好，

所以tuple中只要按序填入各个value就行了，所以就是一个value list.

　　6.Stream grouping：即消息的partition方法。Storm中提供若干种实用的grouping方式，包括shuffle, fields hash, all, global,

none, direct和localOrShuffle等，Stream Grouping定义了一个流在Bolt任务间该如何被切分。

　　7.Stream：源源不断传递的tuple就组成了stream。

　　这里有Storm提供的6个Stream Grouping类型：



``` shell
1. 随机分组(Shuffle grouping)：随机分发tuple到Bolt的任务，保证每个任务获得相等数量的tuple。
2. 字段分组(Fields grouping)：根据指定字段分割数据流，并分组。例如，根据“user-id”字段，相同“user-id”的元组总是分发到同一个任务，不同“user-id”的元组可能分发到不同的任务。
3. 全部分组(All grouping)：tuple被复制到bolt的所有任务。这种类型需要谨慎使用。
4. 全局分组(Global grouping)：全部流都分配到bolt的同一个任务。明确地说，是分配给ID最小的那个task。
5. 无分组(None grouping)：你不需要关心流是如何分组。目前，无分组等效于随机分组。但最终，Storm将把无分组的Bolts放到Bolts或Spouts订阅它们的同一线程去执行(如果可能)。
6. 直接分组(Direct grouping)：这是一个特别的分组类型。元组生产者决定tuple由哪个元组处理者任务接收。
```



## 10.Storm流向整体结构图(重点)：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dp/storm/intro3-4.png')" alt="wxmp">

其中flume用来获取数据。Kafka用来临时保存数据。Strom用来计算数据。Redis是个内存数据库，用来保存数据。




## 参考文章
* https://blog.51cto.com/xpleaf/2097596
* https://blog.csdn.net/u011082453/article/details/82417259
* https://www.cnblogs.com/yaboya/p/9373385.html