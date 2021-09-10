---
title: Storm-架构运行原理
---

::: tip
本文主要是介绍 Storm-架构运行原理 。
:::

[[toc]]

## storm架构及原理

## 1 storm简介

### 1.1 storm是什么

- 如果只用一句话来描述 [storm](http://storm.apache.org/) 是什么的话：分布式 && 实时 计算系统。按照作者 [Nathan Marz](http://nathanmarz.com/) 的说法，storm对于实时计算的意义类似于hadoop对于批处理的意义。
- Hadoop（大数据分析领域无可争辩的王者）专注于批处理｡这种模型对许多情形（比如为网页建立索引）已经足够,但还存在其他一些使用模型,它们需要来自高度动态的来源的实时信息｡为了解决这个问题,就得借助 Nathan Marz 推出的 storm（现在已经被Apache孵化）storm 不处理静态数据,但它处理连续的流数据。

### 1.2 storm 与传统的大数据

- storm 与其他大数据解决方案的不同之处在于它的处理方式。Hadoop 在本质上是一个批处理系统｡数据被引入 Hadoop 文件系统 (HDFS) 并分发到各个节点进行处理｡当处理完成时,结果数据返回到 HDFS 供始发者使用。storm 支持创建拓扑结构来转换没有终点的数据流。不同于 Hadoop 作业,这些转换从不停止,它们会持续处理到达的数据。
- Hadoop 的核心是使用 Java™ 语言编写的,但支持使用各种语言编写的数据分析应用程序。而 Twitter Storm 是使用 Clojure语言实现的。
- Clojure 是一种基于虚拟机 (VM) 的语言,在 Java 虚拟机上运行。但是,尽管 storm 是使用 Clojure 语言开发的,您仍然可以在 storm 中使用几乎任何语言编写应用程序｡所需的只是一个连接到 storm 的架构的适配器。已存在针对 Scala，JRuby，Perl 和 PHP 的适配器,但是还有支持流式传输到 Storm 拓扑结构中的结构化查询语言适配器。

## 2 Hadoop 架构的瓶颈

- Hadoop是优秀的大数据离线处理技术架构,主要采用的思想是“分而治之”,对大规模数据的计算进行分解,然后交由众多的计算节点分别完成,再统一汇总计算结果。Hadoop架构通常的使用方式为批量收集输入数据,批量计算,然后批量吐出计算结果。然而Hadoop结构在处理实时性要求较高的业务时,却显得力不从心。本章内容对Hadoop架构这种瓶颈的产生原因进行了探究。 实时性不足（基于离线）

### 2.1 Hadoop架构简介

- Hadoop架构的核心组成部分是HDFS(Hadoop Distributed File System,Hadoop分布式文件系统)和MapReduce分布式计算框架｡HDFS采用Master/Slave体系结构,在集群中由一个主节点充当NameNode,负责文件系统元数据的管理,其它多个子节点充当Datanode,负责存储实际的数据块。
- MapReduce分布式计算模型由JobTracker和TaskTracker两类服务进程实现,JobTracker负责任务的调度和管理,TaskTracker负责实际任务的执行。

 

### 2.2 Hadoop架构的瓶颈

- 在手机阅读BI大屏时延项目中,业务需求为处理业务平台产生的海量用户数据,展现业务中PV(Page View,页面浏览量)、UV(Unique Visitor,独立访客)。营收和付费用户数等关键运营指标,供领导层实时了解运营状况,做出经营决策，在一期项目的需求描述中,允许的计算时延是15分钟。
- 根据需求,在一期项目的实施中,搭建了Hadoop平台与Hive数据仓库,通过编写Hive存储过程,来完成数据的处理,相当于是一个离线的批处理过程，不同的运营指标拥有不同的算法公式,各公式的复杂程度不同导致各运营指标算法复杂度不同,因此所需要的计算时延也各不相同,如PV指标的计算公式相对简单,可以在5分钟内完成计算,而页面访问成功率指标的计算公式相对复杂,需要10分钟以上才能完成计算｡项目到达二期阶段时,对实时性的要求有了进一步提高,允许的计算时延减少到5分钟，在这种应用场景下,Hadoop架构已经不能满足需要,无法在指定的时延内完成所有运营指标的计算。
- 在以上的应用场景中,Hadoop的瓶颈主要体现在以下两点:
  - \1) MapReduce计算框架初始化较为耗时,并不适合小规模的批处理计算｡因为MapReduce框架并非轻量级框架,在运行一个作业时,需要进行很多 初始化 的工作,主要包括检查作业的输入输出路径,将作业的输入数据分块,建立作业统计信息以及将作业代码的Jar文件和配置文件拷贝到HDFS上，当输入数据的规模很大时,框架初始化所耗费的时间远远小于计算所耗费的时间,所以初始化的时间可以忽略不计;而当输入数据的规模较小时,初始化所耗费的时间甚至超过了计算所耗费的时间,导致计算效率低下,产生了性能上的瓶颈。
  - \2) Reduce任务的计算速度较慢｡有的运营指标计算公式较为复杂,为之编写的Hive存储过程经Hive解释器解析后产生了Reduce任务,导致无法在指定的时延内完成计算｡这是由于Reduce任务的计算过程分为三个阶段,分别是copy阶段,sort阶段和reduce阶段｡其中copy阶段要求每个计算节点从其它所有计算节点上抽取其所需的计算结果,copy操作需要占用大量的网络带宽,十分耗时,从而造成Reduce任务整体计算速度较慢。

## 3 storm 架构的优点

- storm的流式处理计算模式保证了任务能够只进行一次初始化,就能够持续计算,同时使用了ZeroMQ（Netty）作为底层消息队列,有效地提高了整体架构的数据处理效率,避免了Hadoop的瓶颈。
- Storm的适用场景:
  - 1.流数据处理，Storm可以用来处理源源不断流进来的消息,处理之后将结果写入到某个存储中去。
  - 2.分布式rpc，由于storm的处理组件是分布式的,而且处理延迟极低,所以可以作为一个通用的分布式rpc框架来使用。
  - 3.持续计算,任务一次初始化,一直运行,除非你手动kill它。

### 3.1 storm架构的设计

- 与Hadoop主从架构一样,Storm也采用Master/Slave体系结构,分布式计算由Nimbus和Supervisor两类服务进程实现,Nimbus进程运行在集群的主节点,负责任务的指派和分发,Supervisor运行在集群的从节点,负责执行任务的具体部分。

 

- 如图所示：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dp/storm/archiprin1-1.png')" alt="wxmp">

- Nimbus:负责资源分配和任务调度。
- Supervisor:负责接受nimbus分配的任务,启动和停止属于自己管理的worker进程。
- Worker:运行具体处理组件逻辑的进程。
- Task:worker中每一个spout/bolt的线程称为一个task｡同一个spout/bolt的task可能会共享一个物理线程,该线程称为executor。

- storm架构中使用Spout/Bolt编程模型来对消息进行流式处理｡消息流是storm中对数据的基本抽象,一个消息流是对一条输入数据的封装,源源不断输入的消息流以分布式的方式被处理，Spout组件是消息生产者，是storm架构中的数据输入源头，它可以从多种异构数据源读取数据，并发射消息流，Bolt组件负责接收Spout组件发射的信息流，并完成具体的处理逻辑｡在复杂的业务逻辑中可以串联多个Bolt组件，在每个Bolt组件中编写各自不同的功能，从而实现整体的处理逻辑。

### 3.2 storm架构与Hadoop架构的对比

- storm架构与Hadoop架构的总体结构相似。

  | 结构         | Hadoop       | Storm        |
  | ------------ | ------------ | ------------ |
  | 主节点       | JobTracker   | Nimbus       |
  | 从节点       | TaskTracker  | Supervisor   |
  | 应用程序     | Job          | Topology     |
  | 工作进程名称 | Child        | Worker       |
  | 计算模型     | Map / Reduce | Spout / Bolt |

- 在Hadoop架构中,主从节点分别运行JobTracker和TaskTracker进程,在storm架构中,主从节点分别运行Nimbus和Supervisor进程。在Hadoop架构中,应用程序的名称是Job,Hadoop将一个Job解析为若干Map和Reduce任务,每个Map或Reduce任务都由一个Child进程来运行,该Child进程是由TaskTracker在子节点上产生的子进程。

- 在Storm架构中,应用程序的名称是Topology,Storm将一个Topology划分为若干个部分,每部分由一个Worker进程来运行,该Worker进程是Supervisor在子节点上产生的子进程,在每个Worker进程中存在着若干Spout和Bolt线程,分别负责Spout和Bolt组件的数据处理过程。

- 从应用程序的比较中可以看明显地看到Hadoop和Storm架构的主要不同之处｡在Hadoop架构中,应用程序Job代表着这样的作业:输入是确定的,作业可以在有限时间内完成,当作业完成时Job的生命周期走到终点,输出确定的计算结果；而在Storm架构中,Topology代表的并不是确定的作业,而是持续的计算过程，在确定的业务逻辑处理框架下,输入数据源源不断地进入系统，经过流式处理后以较低的延迟产生输出。如果不主动结束这个Topology或者关闭Storm集群,那么数据处理的过程就会持续地进行下去。

- 通过以上的分析，我们可以看到，storm架构是如何解决Hadoop架构瓶颈的：

  - Storm的Topology只需初始化一次。在将Topology提交到Storm集群的时候,集群会针对该Topology做一次初始化的工作，此后,在Topology运行过程中,对于输入数据而言,是没有计算框架初始化耗时的,有效避免了计算框架初始化的时间损耗。
  - Storm使用Netty作为底层的消息队列来传递消息,保证消息能够得到快速的处理，同时Storm采用内存计算模式,无需借助文件存储,直接通过网络直传中间计算结果,避免了组件之间传输数据的大量时间损耗。

### 3.3 storm的优点

- Storm 实现的一些特征决定了它的性能和可靠性的，Storm 使用 Netty 传送消息,这就消除了中间的排队过程,使得消息能够直接在任务自身之间流动，在消息的背后,是一种用于序列化和反序列化 Storm 的原语类型的自动化且高效的机制。
- Storm 的一个最有趣的地方是它注重容错和管理，Storm 实现了有保障的消息处理,所以每个元组(Turple)都会通过该拓扑(Topology)结构进行全面处理;如果发现一个元组还未处理,它会自动从Spout处重发，Storm 还实现了任务级的故障检测，在一个任务发生故障时，消息会自动重新分配以快速重新开始处理。Storm 包含比 Hadoop 更智能的处理管理,流程会由zookeeper来进行管理,以确保资源得到充分使用。
- 总结一下，有以下优点：
  - 简单编程，在大数据处理方面相信大家对hadoop已经耳熟能详,基于Google Map/Reduce来实现的Hadoop为开发者提供了map､reduce原语，使并行批处理程序变得非常地简单和优美。同样,Storm也为大数据的实时计算提供了一些简单优美的原语，这大大降低了开发并行实时处理的任务的复杂性,帮助你快速、高效的开发应用。
  - 多语言支持，除了用java实现spout和bolt，你还可以使用任何你熟悉的编程语言来完成这项工作，这一切得益于Storm所谓的多语言协议。多语言协议是Storm内部的一种特殊协议,允许spout或者bolt使用标准输入和标准输出来进行消息传递，传递的消息为单行文本或者是json编码的多行。
  - 支持水平扩展，在Storm集群中真正运行topology的主要有三个实体：工作进程、线程和任务。Storm集群中的每台机器上都可以运行多个工作进程，每个工作进程又可创建多个线程,每个线程可以执行多个任务,任务是真正进行数据处理的实体，我们开发的spout、bolt就是作为一个或者多个任务的方式执行的。因此，计算任务在多个线程，进程和服务器之间并行进行,支持灵活的水平扩展。
  - 容错性强，如果在消息处理过程中出了一些异常，Storm会重新安排这个出问题的处理单元，Storm保证一个处理单元永远运行(除非你显式杀掉这个处理单元)。
  - 可靠性的消息保证　Storm可以保证spout发出的每条消息都能被“完全处理”。
  - 快速的消息处理，用Netty作为底层消息队列, 保证消息能快速被处理。
  - 本地模式，支持快速编程测试。

## 4 其他大数据解决方案

- 自 Google 在 2004 年推出 MapReduce 范式以来,已诞生了多个使用原始 MapReduce 范式(或拥有该范式的质量)的解决方案。Google 对 MapReduce 的最初应用是建立万维网的索引。尽管此应用程序仍然很流行，但这个简单模型解决的问题也正在增多。
- 下标中提供了一个可用开源大数据解决方案的列表，包括传统的批处理和流式处理应用程序｡在将 Storm 引入开源之前将近一年的时间里,Yahoo! 的 S4 分布式流计算平台已向 Apache 开源｡S4 于 2010 年 10 月发布，它提供了一个高性能计算 (HPC) 平台,向应用程序开发人员隐藏了并行处理的复杂性｡S4 实现了一个可扩展的､分散化的集群架构,并纳入了部分容错功能。

| 解决方案 | 开发商             | 类型     | 描述                                     |
| -------- | ------------------ | -------- | ---------------------------------------- |
| storm    | Twitter            | 流式处理 | Twitter 的新流式大数据分析解决方案       |
| S4       | Yahoo!             | 流式处理 | 来自 Yahoo! 的分布式流计算平台           |
| Hadoop   | Apache             | 批处理   | MapReduce 范式的第一个开源实现           |
| Spark    | UC Berkeley AMPLab | 批处理   | 支持内存中数据集和恢复能力的最新分析平台 |
| Disco    | Nokia              | 批处理   | Nokia 的分布式 MapReduce 框架            |
| HPCC     | LexisNexis         | 批处理   | HPC 大数据集群                           |

## 5 storm基本概念

- 下面介绍Storm的基本概念和数据流模型。Storm是一个开源的实时计算系统，它提供了一系列的基本元素用于进行计算:Topology、Stream、Spout、Bolt等等。
- Storm集群和Hadoop集群表面上看很类似。但是Hadoop上运行的是MapReduce jobs,而在Storm上运行的是拓扑(topology),这两者之间是非常不一样的，一个关键的区别是: 一个MapReduce job最终会结束, 而一个topology永远会运行(除非你手动kill掉)。
- 在Storm的集群里面有两种节点: 控制节点(master node)和工作节点(worker node)。控制节点上面运行一个叫Nimbus后台程序,它的作用类似Hadoop里面的JobTracker，Nimbus负责在集群里面分发代码，分配计算任务给机器，并且监控状态。每一个工作节点上面运行一个叫做Supervisor的进程。Supervisor会监听分配给它那台机器的工作，根据需要启动/关闭工作进程worker。每一个工作进程执行一个topology的一个子集；一个运行的topology由运行在很多机器上的很多工作进程worker组成。(一个supervisor里面有多个workder，一个worker是一个JVM。可以配置worker的数量，对应的是conf/storm.yaml中的supervisor.slot的数量）

 

- Nimbus和Supervisor之间的所有协调工作都是通过Zookeeper集群完成。另外，Nimbus进程和Supervisor进程都是快速失败(fail-fast)和无状态的｡所有的状态要么在zookeeper里面, 要么在本地磁盘上。这也就意味着你可以用kill -9来杀死Nimbus和Supervisor进程,然后再重启它们，就好像什么都没有发生过，这个设计使得Storm异常的稳定。

### 5.1 Topology

- 在Storm中,一个实时应用的计算任务被打包作为Topology发布，这同Hadoop的MapReduce任务相似。但是有一点不同的是:在Hadoop中，MapReduce任务最终会执行完成后结束；而在Storm中，Topology任务一旦提交后永远不会结束，除非你显示去停止任务。计算任务Topology是由不同的Spouts和Bolts，通过数据流（Stream）连接起来的图｡下面是一个Topology的结构示意图：

 

- 其中包含有：
  - Spout：Storm中的消息源,用于为Topology生产消息(数据),一般是从外部数据源(如Message Queue、RDBMS、NoSQL、Realtime Log ）不间断地读取数据并发送给Topology消息(tuple元组)。
  - Bolt：Storm中的消息处理者，用于为Topology进行消息的处理，Bolt可以执行过滤，聚合， 查询数据库等操作，而且可以一级一级的进行处理。
- 下图是Storm的数据交互图，可以看出两个模块Nimbus和Supervisor之间没有直接交互。状态都是保存在Zookeeper上，Worker之间通过Netty传送数据。Storm与Zookeeper之间的交互过程，暂时不细说了。重要的一点:storm所有的元数据信息保存在Zookeeper中！

### 5.2 数据模型Turple

- storm使用tuple来作为它的数据模型。每个tuple是一堆值，每个值有一个名字，并且每个值可以是任何类型，在我的理解里面一个tuple可以看作一个java对象。总体来看，storm支持所有的基本类型：字符串以及字节数组作为tuple的值类型。你也可以使用你自己定义的类型来作为值类型，只要你实现对应的序列化器(serializer)。

- 一个Tuple代表数据流中的一个基本的处理单元，它可以包含多个Field，每个Field表示一个属性。比如举例一个，三个字段（taskID：int； StreamID：String； ValueList： List）：

  

- Tuple是一个Key-Value的Map，由于各个组件间传递的tuple的字段名称已经事先定义好了，所以Tuple只需要按序填入各个Value，所以就是一个Value List。一个没有边界的，源源不断的，连续的Tuple序列就组成了Stream。

 

- topology里面的每个节点必须定义它要发射的tuple的每个字段。

 

### 5.3 worker（进程）

- 一个topology可能会在一个或者多个worker(工作进程)里面执行，每个worker是一个物理JVM并且执行整个topology的一部分。比如,对于并行度是300的topology来说，如果我们使用50个工作进程worker来执行，那么每个工作进程会处理其中的6个tasks。Storm会尽量均匀的工作分配给所有的worker，setBolt 的最后一个参数是你想为bolts的并行量。

### 5.4 Spouts

- 消息源spout是Storm里面一个topology里面的消息生产者｡一般来说消息源会从一个外部源读取数据并且向topology里面发出消息:tuple。Spout可以是可靠的也可以是不可靠的，如果这个tuple没有被storm成功处理,可靠的消息源spouts可以重新发射一个tuple，但是不可靠的消息源spouts一旦发出一个tuple就不能重发了。
- 消息源可以发射多条消息流stream｡使用OutputFieldsDeclarer。declareStream来定义多个stream,然后使用SpoutOutputCollector来发射指定的stream。代码上是这样的:collector.emit(new Values(str));
- Spout类里面最重要的方法是nextTuple。要么发射一个新的tuple到topology里面或者简单的返回如果已经没有新的tuple。要注意的是nextTuple方法不能阻塞，因为storm在同一个线程上面调用所有消息源spout的方法。另外两个比较重要的spout方法是ack和fail。storm在检测到一个tuple被整个topology成功处理的时候调用ack，否则调用fail。storm只对可靠的spout调用ack和fail。

### 5.5 Bolts

- 所有的消息处理逻辑被封装在bolts里面。Bolts可以做很多事情：过滤，聚合，查询数据库等等。
- Bolts可以简单的做消息流的传递(来一个元组,调用一次execute)。复杂的消息流处理往往需要很多步骤，从而也就需要经过很多bolts。比如算出一堆图片里面被转发最多的图片就至少需要两步:第一步算出每个图片的转发数量，第二步找出转发最多的前10个图片。(如果要把这个过程做得更具有扩展性那么可能需要更多的步骤)。
- Bolts可以发射多条消息流, 使用OutputFieldsDeclarer.declareStream定义stream,使用OutputCollector.emit来选择要发射的stream。
- Bolts的主要方法是execute，它以一个tuple作为输入，bolts使用OutputCollector来发射tuple(spout使用SpoutOutputCollector来发射指定的stream)，bolts必须要为它处理的每一个tuple调用OutputCollector的ack方法，以通知Storm这个tuple被处理完成了，从而通知这个tuple的发射者spouts。一般的流程是: bolts处理一个输入tuple, 发射0个或者多个tuple, 然后调用ack通知storm自己已经处理过这个tuple了。storm提供了一个IBasicBolt会自动调用ack。

### 5.6 Reliability

- Storm保证每个tuple会被topology完整的执行。Storm会追踪由每个spout tuple所产生的tuple树(一个bolt处理一个tuple之后可能会发射别的tuple从而形成树状结构)，并且跟踪这棵tuple树什么时候成功处理完。每个topology都有一个消息超时的设置，如果storm在这个超时的时间内检测不到某个tuple树到底有没有执行成功，那么topology会把这个tuple标记为执行失败，并且过一会儿重新发射这个tuple（超时的时间在storm0.9.0.1版本中是可以设置的,默认是30s）。

### 5.7 Tasks

- 每一个spout和bolt会被当作很多task在整个集群里执行。每一个executor对应到一个线程,在这个线程上运行多个task，而stream grouping则是定义怎么从一堆task发射tuple到另外一堆task。你可以调用TopologyBuilder类的setSpout和setBolt来设置并行度。SetSpout里面的并行度参数含义：parallelism_hint the number of tasks that should be assigned to execute this spout. Each task will run on a thread in a process somwehere around the cluster。（执行这个spout安排了N个tasks｡每个task是一个线程，他们都在同一个进程中。）setBolt的参数含义也是一样的。

## 6 Storm数据流模型

- 数据流(Stream)是Storm中对数据进行的抽象，它是时间上无界的tuple元组序列｡在Topology中，Spout是Stream的源头。负责为Topology从特定数据源发射Stream；Bolt可以接收任意多个Stream作为输入，然后进行数据的加工处理过程,如果需要，Bolt还可以发射出新的Stream给下级Bolt进行处理。下面是一个Topology内部Spout和Bolt之间的数据流关系:

 

- Topology中每一个计算组件(Spout和Bolt)都有一个并行执行度，在创建Topology时可以进行指定，Storm会在集群内分配对应并行度个数的线程来同时执行这一组件。那么,有一个问题：既然对于一个Spout或Bolt,都会有多个task线程来运行,那么如何在两个组件(Spout和Bolt)之间发送tuple元组呢？Storm提供了若干种数据流分发(Stream Grouping)策略用来解决这一问题。在Topology定义时，需要为每个Bolt指定接收什么样的Stream作为其输入(注:Spout并不需要接收Stream,只会发射Stream)。目前Storm中提供了以下7种Stream Grouping策略:Shuffle Grouping、Fields Grouping、All Grouping、Global Grouping、Non Grouping、Direct Grouping、Local or shuffle grouping。

### 6.1 Stream groupings

- Storm里面有7种类型的stream grouping
  - Shuffle Grouping: 随机分组, 随机派发stream里面的tuple，保证每个bolt接收到的tuple数目大致相同。
  - Fields Grouping:按字段分组，比如按userid来分组，具有同样userid的tuple会被分到相同的Bolts里的一个task。而不同的userid则会被分配到不同的bolts里的task。
  - All Grouping:广播发送，对于每一个tuple，所有的bolts都会收到。
  - Global Grouping:全局分组, 这个tuple被分配到storm中的一个bolt的其中一个task，再具体一点就是分配给id值最低的那个task。
  - Non Grouping:不分组，这个分组的意思是说stream不关心到底谁会收到它的tuple。目前这种分组和Shuffle grouping是一样的效果。有一点不同的是storm会把这个bolt放到这个bolt的订阅者同一个线程里面去执行。
  - Direct Grouping: 直接分组, 这是一种比较特别的分组方法，用这种分组意味着消息的发送者指定由消息接收者的哪个task处理这个消息｡。只有被声明为Direct Stream的消息流可以声明这种分组方法。而且这种消息tuple必须使用emitDirect方法来发射｡消息处理者可以通过TopologyContext来获取处理它的消息的task的id (OutputCollector.emit方法也会返回task的id)。
  - Local or shuffle grouping：如果目标bolt有一个或者多个task在同一个工作进程worker中，tuple将会被随机发生给这些tasks。否则,和普通的Shuffle Grouping行为一致。

### 6.2 storm 记录级容错

- 相比于s4, puma等其他实时计算系统，storm最大的亮点在于其记录级容错和能够保证消息精确处理的事务功能，下面就重点来看一下这两个亮点的实现原理。
- Storm记录级容错的基本原理。首先来看一下什么叫做记录级容错？storm允许用户在spout中发射一个新的源tuple时为其指定一个message id，这个message id可以是任意的object对象。多个源tuple可以共用一个message id，表示这多个源 tuple对用户来说是同一个消息单元。storm中记录级容错的意思是说，storm会告知用户每一个消息单元是否在指定时间内被完全处理了。那什么叫做完全处理呢，就是该message id绑定的源tuple及由该源tuple后续生成的tuple经过了topology中每一个应该到达的bolt的处理｡举个例子。如下图,在spout由message 1绑定的tuple1和tuple2经过了bolt1和bolt2的处理生成两个新的tuple，并最终都流向了bolt3。当这个过程完成处理完时,称message 1被完全处理了。

- 在storm的topology中有一个系统级组件，叫做acker。这个acker的任务就是追踪从spout中流出来的每一个message id绑定的若干tuple的处理路径，如果在用户设置的最大超时时间内这些tuple没有被完全处理，那么acker就会告知spout该消息处理失败了，相反则会告知spout该消息处理成功了。在刚才的描述中,我们提到了”记录tuple的处理路径”，如果曾经尝试过这么做的同学可以仔细地思考一下这件事的复杂程度。但是storm中却是使用了一种非常巧妙的方法做到了。在说明这个方法之前,我们来复习一个数学定理。
  A xor A = 0.
  A xor B…xor B xor A = 0,其中每一个操作数出现且仅出现两次。

- storm中使用的巧妙方法就是基于这个定理。具体过程是这样的：在spout中系统会为用户指定的message id生成一个对应的64位整数，作为一个root id。root id会传递给acker及后续的bolt作为该消息单元的唯一标识。同时无论是spout还是bolt每次新生成一个tuple的时候,都会赋予该tuple一个64位的整数的id。Spout发射完某个message id对应的源tuple之后,会告知acker自己发射的root id及生成的那些源tuple的id。而bolt呢，每次接受到一个输入tuple处理完之后，也会告知acker自己处理的输入tuple的id及新生成的那些tuple的id。Acker只需要对这些id做一个简单的异或运算，就能判断出该root id对应的消息单元是否处理完成了。下面通过一个图示来说明这个过程。

  - 第1步：初始化 spout中绑定message 1生成了两个源tuple，id分别是0010和1011。

    

  - 第2步：计算一个turple达到第1个bolt。bolt1处理tuple 0010时生成了一个新的tuple，id为0110。

    

  - 第3步：计算一个turple达到第2个bolt，bolt2处理tuple 1011时生成了一个新的tuple，id为0111。

    

  - 第4步：消息到达最后一个bolt。

    

- 可能有些细心的同学会发现，容错过程存在一个可能出错的地方，那就是，如果生成的tuple id并不是完全各异的，acker可能会在消息单元完全处理完成之前就错误的计算为0｡这个错误在理论上的确是存在的，但是在实际中其概率是极低极低的，完全可以忽略。

### 6.3 Storm的事务拓扑

- 事务拓扑(transactional topology)是storm0.7引入的特性，在0.8版本以后的版本中已经被封装为Trident，提供了更加便利和直观的接口｡因为篇幅所限，在此对事务拓扑做一个简单的介绍。
- 事务拓扑的目的是为了满足对消息处理有着极其严格要求的场景，例如实时计算某个用户的成交笔数，要求结果完全精确，不能多也不能少。Storm的事务拓扑是完全基于它底层的spout/bolt/acker原语实现的。通过一层巧妙的封装得出一个优雅的实现。
- 事务拓扑简单来说就是将消息分为一个个的批(batch)，同一批内的消息以及批与批之间的消息可以并行处理，另一方面，用户可以设置某些bolt为committer，storm可以保证committer的finishBatch()操作是按严格不降序的顺序执行的。用户可以利用这个特性通过简单的编程技巧实现消息处理的精确。

## 7 并法度的理解

### 7.1 Example of a running topology

- The following illustration shows how a simple topology would look like in operation. The topology consists of three components: one spout called BlueSpout and two bolts called GreenBolt and YellowBolt. The components are linked such that BlueSpout sends its output to GreenBolt, which in turns sends its own output to YellowBolt.

 

- 总结：
  - 一个Topology可以包含多个worker ,一个worker只能对应于一个topology。worker process是一个topology的子集。
  - 一个worker可以包含多个executor，一个executor只能对应于一个component（spout或者bolt）。
  - Task就是具体的处理逻辑，一个executor线程可以执行一个或多个tasks。线程就是资源，task就是要运行的任务。

 

### 7.2 并发度的配置有效的顺序

``` shell
- Storm currently has the following order of precedence for configuration settings:
  defaults.yaml < storm.yaml < topology-specific configuration < internal component-specific configuration < external component-specific configuration。
```

本文转自：http://www.cnblogs.com/swanspouse/p/5135679.html


## 【----------------------------】

## storm 架构原理

参考链接：https://blog.csdn.net/u013332124/article/details/79682782

Storm 是一个分布式的，可靠的，容错的数据流处理系统。下面我将分别从storm的整体架构以及部分原理进行讲解。

## 一、基本的概念

storm中服务器节点分为主节点和从节点,Nimbus为主节点和Supervisor为从节点。以及若干组件构成。下面为对一些术语进行简单的介绍: 
- Nimbus：主节点，是一个调度中心，负责分发任务 
- Supervisor：从节点，任务执行的地方 
- Worker：任务工作进程，一个Supervisor中可以有多个Worker。 
- Executor：Worker进程在执行任务时，会启动多个Executor线程 
- Topology：任务的抽象概念。由于storm是流式计算的框架，它的数据流和拓扑图很像，所以它的任务就叫topology。 
- Spout：从数据源获取数据并进行分发。 
- Bolt：得到Spout或者上一个Bolt的数据,然后进行处理后交给下一个Bolt处理。 
- Tuple：在storm中，一条数据可以理解为是一个Tuple。

## 二、storm的架构

#### 任务提交处理流程

Nimbus是调度中心，Supervisor是任务执行的地方。Supervisor上面有若干个Worker，每个Worker都有自己的端口,Worker可以理解为一个进程。另外，每个Worker中还可以运行若干个线程。

当客户端向storm集群提交一个Topology时，这里的提交就是在集群上通过命令`storm jar xxx`启动topology。如果我们是在Supervisor节点上执行`storm jar xxx`，那么Supervisor会将jar包拷贝到Nimbus,之后Nimbus对Topology进行调度。

Nimbus会根据Topology所需要的Worker进行分配，将其分配到各个Supervisor的节点上执行。

现在假设我们我们有4个Supervisor节点，每个Supervisor都配置4个Worker。这是我们提交了一个Topology，需要4个Worker,那可能的分配情况可能如下图所示: 

topology提交流程图

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dp/storm/archiprin2-1.png')" alt="wxmp">


#### storm中的数据流

启动完Topology后,相关组件就开始运行起来了。在Storm中，Spout组件主要用来从数据源拉取数据,形成一个Tuple后转交给Bolt处理。Bolt接受到Tuple处理完后,可以选择继续交给下一个Bolt处理，也可以选择不往下传。这样数据以Tuple的形式一个接一个的往下执行,就形成了一个拓扑数据流。

storm数据在组件间的流向如下图所示: 

storm数据流

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dp/storm/archiprin2-2.png')" alt="wxmp">

## 三、Storm的并发度

在Storm中，Worker不是组件执行的最小单位。Executor才是，Executor可以理解为是一个线程。我们在创建topology的时候，可以设置执行spout的线程数和bolt的线程数。

假设spout和bolt的线程数加起来设置了8个，然后设置了2个worker，那么这8个线程可能就会随机分配到2个worker中，可能一个worker3个，一个worker5个。也有可能各自分配4个。如下图所示: 

Executor分布

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dp/storm/archiprin2-3.png')" alt="wxmp">


## 四、数据的Grouping策略

在实际应用中,Bolt组件的实例可能有多个,Tuple在流向Bolt时，选择哪个Bolt实例的策略就是grouping策略。 
下面是Storm中的6种Grouping策略: 
- 1. Shuffle Grouping: 随机分组， 随机派发stream里面的tuple， 保证每个bolt接收到的tuple数目相同。轮询，平均分配。 
- 2. Fields Grouping：按字段分组， 比如按userid来分组， 具有同样userid的tuple会被分到相同的Bolts， 而不同的userid则会被分配到不同的Bolts。 
- 3. All Grouping： 广播发送， 对于每一个tuple， 所有的Bolts都会收到。 
- 4. Global Grouping: 全局分组， 这个tuple被分配到storm中的一个bolt的其中一个task。再具体一点就是分配给id值最低的那个task。 
- 5. Non Grouping: 不分组， 这个分组的意思是说stream不关心到底谁会收到它的tuple。目前这种分组和Shuffle grouping是一样的效果，不平均分配。 
- 6. Direct Grouping: 直接分组， 这是一种比较特别的分组方法，用这种分组意味着消息的发送者举鼎由消息接收者的哪个task处理这个消息。 只有被声明为Direct Stream的消息流可以声明这种分组方法。而且这种消息tuple必须使用emitDirect方法来发射。消息处理者可以通过TopologyContext来或者处理它的消息的taskid(OutputCollector.emit方法也会返回taskid)

## 五、消息的可靠性保证 —— ack机制

一条数据在Spout中形成一个Tuple，然后交给一个个Bolt执行,那我们怎么保证这个Tuple被完整的执行了呢？这里的完整执行说的是这个Tuple必须在后面的每一个Bolt都成功处理，假设在一个Bolt中发生异常导致失败，这就不能算完整处理。

为了保证消息处理过程中的可靠性,storm使用了ack机制。storm会专门启动若干acker线程，来追踪tuple的处理过程。acker线程数量可以设置。

每一个Tuple在Spout中生成的时候,都会分配到一个64位的messageId。通过对messageId进行哈希我们可以执行要对哪个acker线程发送消息来通知它监听这个Tuple。

acker线程收到消息后,会将发出消息的Spout和那个messageId绑定起来。然后开始跟踪该tuple的处理流程。如果这个tuple全部都处理完，那么acker线程就会调用发起这个tuple的那个spout实例的ack()方法。如果超过一定时间这个tuple还没处理完，那么acker线程就会调用对应spout的fail()方法,通知spout消息处理失败。spout组件就可以重新发送这个tuple。

从上面的介绍我们知道了，tuple数据的流向会形成一个拓扑图，也可以理解成是一个tuple树。这个拓扑图的节点可能会有很多个，如果要把这些节点全部保存起来，处理大量的数据时势必会造成内存溢出。

对于这个难题，storm使用了一种非常巧妙的方法，使用20个字节就可以追踪一个tuple是否被完整的执行。这也是storm的一个突破性的技术。

#### ack机制的具体原理

``` shell
我们都知道,自己异或自己,结果肯定为零( a ^ a = 0)。ack中就利用这个特性

- acker对于每个spout-tuple保存一个ack-val的校验值，它的初始值是0， 然后每发射一个tuple/ack一个tuple，那么tuple的id都要跟这个校验值异或一下。注意，这里的tuple的id不是spout-tuple的id,和我们上面理解的messageId不是一个概念，要区分一下,是每个新生产的tuple的id，这个tupleId是随机生成的64位比特值
- 之后把得到的值更新为ack-val的新值。那么假设每个发射出去的tuple都被ack了， 那么最后ack-val一定是0(因为一个数字跟自己异或得到的值是0)。

> 举个例子,比如发射了某个tuple，就 ack-val ^ tupleId，然后ack了某个tuple,就再ack-val ^ tupleId，这样，ack-val 最终又变成了0，说明tuple已经全部处理成功了。
```
## 六、Storm的HA保证——高可用性保证

#### 1. 数据方面的高可用

使用ack机制保证数据处理的高可用

#### 2. Worker进程挂了怎么办？

Supervisor会自动重启worker线程。

#### 3. Supervisor节点失效了怎么办？

可以在其他节点重启该supervisor任务。

#### 4. Nimbus挂了怎么办？

在storm1.0之前,Nimbus是不支持HA的。Nimbus如果挂了，重启Nimbus进程就可以了，不会影响到现有topology的运行。

因为Nimbus只是一个调度中心，Nimbus和Supervisor的状态都保存在本地文件和ZooKeeper，因此他们进程可以随便杀死，然后重启，不会影响到Worker进程的运行。

另外，Nimbus的作用在就是在拓扑任务开始阶段，负责将任务提交到集群，后期负责拓扑任务的管理，比如任务查看，终止等操作。在通常情况下，nimbus的任务压力并不会很大，在自然情况下不会出现宕机的情况。

storm1.0后Nimbus的HA策略还没有具体研究过，有兴趣的小伙伴可自行前往官网查看文档。http://storm.apache.org/releases/1.2.1/nimbus-ha-design.html

## 七、总结

Storm的架构及原理整体理解起来不算很难，但很多细节还是需要在实践中才能发现。有兴趣的小伙伴可以去读读storm的源码，storm源码大多数都是用Clojure实现，对Clojure语言不熟悉的朋友可以去看一下JStorm的源码实现。这是阿里基于Storm用java实现的框架，据说更加稳定高效。

## 【----------------------------】


## Storm架构与运行原理

## 一、Storm简介

Storm是一个免费并开源的分布式实时计算系统。利用Storm可以很容易做到可靠地处理无限的数据流，像Hadoop批量处理大数据一样，Storm可以实时处理数据。

Storm 很简单，可用于任意编程语言。Apache Storm 采用 Clojure 开发。Storm 有很多应用场景，包括实时数据分析、联机学习、持续计算、分布式 RPC、ETL 等。

Hadoop（大数据分析领域无可争辩的王者）专注于批处理?这种模型对许多情形（比如为网页建立索引）已经足够,但还存在其他一些使用模型,它们需要来自高度动态的来源的实时信息?为了解决这个问题,就得借助 Nathan Marz 推出的 storm（现在已经被Apache孵化）storm 不处理静态数据,但它处理连续的流数据。

### storm特点：

- 1. 编程简单：开发人员只需要关注应用逻辑，而且跟Hadoop类似，Storm提供的编程原语也很简单
- 2. 高性能，低延迟：可以应用于广告搜索引擎这种要求对广告主的操作进行实时响应的场景。
- 3. 分布式：可以轻松应对数据量大，单机搞不定的场景
- 4. 可扩展： 随着业务发展，数据量和计算量越来越大，系统可水平扩展
- 5. 容错：单个节点挂了不影响应用
- 6. 消息不丢失：保证消息处理

### storm与hadoop的比较：

1.Storm用于实时计算，Hadoop用于离线计算。

2. Storm处理的数据保存在内存中，源源不断；Hadoop处理的数据保存在文件系统中，一批一批。

3. Storm的数据通过网络传输进来；Hadoop的数据保存在磁盘中。

4. Storm与Hadoop的编程模型相似

| 结构         | Hadoop       | Storm        |
| :----------- | :----------- | :----------- |
| 主节点       | JobTracker   | Nimbus       |
| 从节点       | TaskTracker  | Supervisor   |
| 应用程序     | Job          | Topology     |
| 工作进程名称 | Child        | Worker       |
| 计算模型     | Map / Reduce | Spout / Bolt |


     
## 二、Storm集群架构



Storm集群采用主从架构方式，主节点是Nimbus，从节点是Supervisor，有关调度相关的信息存储到ZooKeeper集群中，架构如下图所示：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dp/storm/archiprin3-1.png')" alt="wxmp">


### Nimbus
Storm集群的Master节点，负责分发用户代码，指派给具体的Supervisor节点上的Worker节点，去运行Topology对应的组件（Spout/Bolt）的Task。

### Supervisor

Storm集群的从节点，负责管理运行在Supervisor节点上的每一个Worker进程的启动和终止。通过Storm的配置文件中的supervisor.slots.ports配置项，可以指定在一个Supervisor上最大允许多少个Slot，每个Slot通过端口号来唯一标识，一个端口号对应一个Worker进程（如果该Worker进程被启动）。



### Worker

运行具体处理组件逻辑的进程。Worker运行的任务类型只有两种，一种是Spout任务，一种是Bolt任务。

### Task

worker中每一个spout/bolt的线程称为一个task. 在storm0.8之后，task不再与物理线程对应，不同spout/bolt的task可能会共享一个物理线程，该线程称为executor。

### ZooKeeper

用来协调Nimbus和Supervisor，如果Supervisor因故障出现问题而无法运行Topology，Nimbus会第一时间感知到，并重新分配Topology到其它可用的Supervisor上运行


     
## 三、Storm编程模型



Strom在运行中可分为spout与bolt两个组件，其中，数据源从spout开始，数据以tuple的方式发送到bolt，多个bolt可以串连起来，一个bolt也可以接入多个spot/bolt.运行时原理如下图：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dp/storm/archiprin3-2.png')" alt="wxmp">



Topology：Storm中运行的一个实时应用程序的名称。将 Spout、 Bolt整合起来的拓扑图。定义了 Spout和 Bolt的结合关系、并发数量、配置等等。

Spout：在一个topology中获取**源数据流**的组件。通常情况下spout会从外部数据源中读取数据，然后转换为topology内部的源数据。

Bolt：接受数据然后执行处理的组件,用户可以在其中执行自己想要的操作。

Tuple：一次消息传递的基本单元，理解为一组消息就是一个Tuple。

Stream：Tuple的集合。表示数据的流向。


     
## 四、Topology运行



在Storm中,一个实时应用的计算任务被打包作为Topology发布，这同Hadoop的MapReduce任务相似。但是有一点不同的是:在Hadoop中，MapReduce任务最终会执行完成后结束；而在Storm中，Topology任务一旦提交后永远不会结束，除非你显示去停止任务。计算任务Topology是由不同的Spouts和Bolts，通过数据流（Stream）连接起来的图?一个Storm在集群上运行一个Topology时，主要通过以下3个实体来完成Topology的执行工作：
- (1). Worker（进程）
- (2). Executor（线程）
- (3). Task

下图简要描述了这3者之间的关系：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dp/storm/archiprin3-3.png')" alt="wxmp">

1个worker进程执行的是1个topology的子集（注：不会出现1个worker为多个topology服务）。1个worker进程会启动1个或多个executor线程来执行1个topology的component(spout或bolt)。因此，1个运行中的topology就是由集群中多台物理机上的多个worker进程组成的。

executor是1个被worker进程启动的单独线程。每个executor只会运行1个topology的1个component(spout或bolt)的task（注：task可以是1个或多个，storm默认是1个component只生成1个task，executor线程里会在每次循环里顺序调用所有task实例）。



task是最终运行spout或bolt中代码的单元（注：1个task即为spout或bolt的1个实例，executor线程在执行期间会调用该task的nextTuple或execute方法）。topology启动后，1个component(spout或bolt)的task数目是固定不变的，但该component使用的executor线程数可以动态调整（例如：1个executor线程可以执行该component的1个或多个task实例）。这意味着，对于1个component存在这样的条件：#threads<=#tasks（即：线程数小于等于task数目）。默认情况下task的数目等于executor线程数目，即1个executor线程只运行1个task。

总体的Topology处理流程图为：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dp/storm/archiprin3-4.png')" alt="wxmp">

下图是Storm的数据交互图，可以看出两个模块Nimbus和Supervisor之间没有直接交互。状态都是保存在Zookeeper上，Worker之间通过Netty传送数据。Storm与Zookeeper之间的交互过程，暂时不细说了。重要的一点:storm所有的元数据信息保存在Zookeeper中！

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dp/storm/archiprin3-5.png')" alt="wxmp">


     
## 五、Storm Streaming Grouping



Storm中最重要的抽象，应该就是Stream grouping了，它能够控制Spot/Bolt对应的Task以什么样的方式来分发Tuple，将Tuple发射到目的Spot/Bolt对应的Task

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dp/storm/archiprin3-6.png')" alt="wxmp">

目前，Storm Streaming Grouping支持如下几种类型：
**Shuffle Grouping** ：随机分组，尽量均匀分布到下游Bolt中

将流分组定义为混排。这种混排分组意味着来自Spout的输入将混排，或随机分发给此Bolt中的任务。shuffle grouping对各个task的tuple分配的比较均匀。

**Fields Grouping** ：按字段分组，按数据中field值进行分组；相同field值的Tuple被发送到相同的Task

这种grouping机制保证相同field值的tuple会去同一个task，这对于WordCount来说非常关键，如果同一个单词不去同一个task，那么统计出来的单词次数就不对了。“if the stream is grouped by the “user-id” field, tuples with the same “user-id” will always[Go](http://lib.csdn.net/base/go) to the same task”. —— 小示例

**All grouping** ：广播

广播发送， 对于每一个tuple将会复制到每一个bolt中处理。

**Global grouping** ：全局分组，Tuple被分配到一个Bolt中的一个Task，实现事务性的Topology。

Stream中的所有的tuple都会发送给同一个bolt任务处理，所有的tuple将会发送给拥有最小task_id的bolt任务处理。

**None grouping** ：不分组

不关注并行处理负载均衡策略时使用该方式，目前等同于shuffle grouping,另外storm将会把bolt任务和他的上游提供数据的任务安排在同一个线程下。

**Direct grouping** ：直接分组 指定分组

由tuple的发射单元直接决定tuple将发射给那个bolt，一般情况下是由接收tuple的bolt决定接收哪个bolt发射的Tuple。这是一种比较特别的分组方法，用这种分组意味着消息的发送者指定由消息接收者的哪个task处理这个消息。 只有被声明为Direct Stream的消息流可以声明这种分组方法。而且这种消息tuple必须使用emitDirect方法来发射。消息处理者可以通过TopologyContext来获取处理它的消息的taskid (OutputCollector.emit方法也会返回taskid)。

另外，Storm还提供了用户自定义Streaming Grouping接口，如果上述Streaming Grouping都无法满足实际业务需求，也可以自己实现，只需要实现backtype.storm.grouping.CustomStreamGrouping接口，该接口重定义了如下方法：

List chooseTasks(int taskId, List values)

上面几种Streaming Group的内置实现中，最常用的应该是Shuffle Grouping、Fields Grouping、Direct Grouping这三种，使用其它的也能满足特定的应用需求。


     
## 六、可靠性



### (1)、spout的可靠性
spout会记录它所发射出去的tuple，当下游任意一个bolt处理失败时spout能够重新发射该tuple。在spout的nextTuple()发送一个tuple时，为实现可靠消息处理需要给每个spout发出的tuple带上唯一ID，并将该ID作为参数传递给SpoutOutputCollector的emit()方法：collector.emit(new Values("value1","value2"), tupleID);

实际上Values extends ArrayList`<Object>`

保障过程中，每个bolt每收到一个tuple，都要向上游应答或报错，在tuple树上的所有bolt都确认应答，spout才会隐式调用ack()方法表明这条消息（一条完整的流）已经处理完毕，将会对编号ID的消息应答确认；处理报错、超时则会调用fail()方法。

### (2)、bolt的可靠性
bolt的可靠消息处理机制包含两个步骤：

- a、当发射衍生的tuple，需要锚定读入的tuple
- b、当处理消息时，需要应答或报错

可以通过OutputCollector中emit()的一个重载函数锚定或tuple：collector.emit(tuple, new Values(word)); 并且需要调用一次this.collector.ack(tuple)应答。

## 七、总结



最后再来梳理一下Storm中涉及的主要概念：

- 1.拓扑(Topology)：打包好的实时应用计算任务，同Hadoop的MapReduce任务相似。
- 2.元组(Tuple)：是Storm提供的一个轻量级的数据格式，可以用来包装你需要实际处理的数据。
- 3.流(Streams)：数据流(Stream)是Storm中对数据进行的抽象，它是时间上无界的tuple元组序列（无限的元组序列）?
- 4.Spout(喷嘴)：Storm中流的来源。Spout从外部数据源，如消息队列中读取元组数据并吐到拓扑里。
- 5.Bolts：在拓扑中所有的计算逻辑都是在Bolt中实现的。
- 6.任务(Tasks)：每个Spout和Bolt会以多个任务(Task)的形式在集群上运行。
- 7.组件(Component)：是对Bolt和Spout的统称。
- 8.流分组(Stream groupings)：流分组定义了一个流在一个消费它的Bolt内的多个任务(task)之间如何分组。
- 9.可靠性(Reliability)：Storm保证了拓扑中Spout产生的每个元组都会被处理。
- 10.Workers(工作进程)：拓扑以一个或多个Worker进程的方式运行。每个Worker进程是一个物理的Java虚拟机，执行拓扑的一部分任务。

- 11.Executor(线程)：是1个被worker进程启动的单独线程。每个executor只会运行1个topology的1个component。

- 12.Nimbus：Storm集群的Master节点，负责分发用户代码，指派给具体的Supervisor节点上的Worker节点，去运行Topology对应的组件（Spout/Bolt）的Task。

- 13.Supervisor：Storm集群的从节点，负责管理运行在Supervisor节点上的每一个Worker进程的启动和终止。


参考：

http://www.cnblogs.com/swanspouse/p/5135679.html

http://blog.csdn.net/evankaka/article/details/61190291

http://www.cnblogs.com/Jack47/p/storm_intro-1.html



## 参考文章
* https://www.cnblogs.com/gzxbkk/p/9456029.html
* https://www.cnblogs.com/txfsheng/p/9242539.html
* https://blog.csdn.net/weiyongle1996/article/details/77142245