---
title: Yarn-架构组件原理
---

::: tip
本文主要是介绍 Yarn-架构组件原理 。
:::

[[toc]]
## 1. YARN产生背景

MapReduce本身存在着一些问题：

- 1）JobTracker单点故障问题；如果Hadoop集群的JobTracker挂掉，则整个分布式集群都不能使用了。
- 2）JobTracker承受的访问压力大，影响系统的扩展性。
- 3）不支持MapReduce之外的计算框架，比如Storm、Spark、Flink等。

与旧MapReduce相比，YARN采用了一种分层的集群框架，具有以下几种优势。

- 1）Hadoop2.0提出了HDFSFederation；它让多个NameNode分管不同的目录进而实现访问隔离和横向扩展。对于运行中NameNode的单点故障，通过 NameNode热备方案（NameNode HA）实现 。
- 2） YARN通过将资源管理和应用程序管理两部分剥离开来，分别由ResourceManager和ApplicationMaster进程来实现。其中，ResouceManager专管资源管理和调度，而ApplicationMaster则负责与具体应用程序相关的任务切分、任务调度和容错等。
- 3）YARN具有向后兼容性，用户在MR1上运行的作业，无需任何修改即可运行在YARN之上。
- 4）对于资源的表示以内存为单位（在目前版本的 Yarn 中没有考虑 CPU的占用），比之前以剩余 slot 数目为单位更合理。
- 5）支持多个框架，YARN不再是一个单纯的计算框架，而是一个框架管理器，用户可以将各种各样的计算框架移植到YARN之上，由YARN进行统一管理和资源分配，由于将现有框架移植到YARN之上需要一定的工作量，当前YARN仅可运行MapReduce这种离线计算框架。
- 6）框架升级容易，在YARN中，各种计算框架不再是作为一个服务部署到集群的各个节点上（比如MapReduce框架，不再需要部署JobTracker、 TaskTracker等服务），而是被封装成一个用户程序库（lib）存放在客户端，当需要对计算框架进行升级时，只需升级用户程序库即可，

## 2. 什么是YARN

YARN是Hadoop2.0版本新引入的资源管理系统，直接从MR1演化而来。

核心思想：将MP1中JobTracker的资源管理和作业调度两个功能分开，分别由ResourceManager和ApplicationMaster进程来实现。

- 1）ResourceManager：负责整个集群的资源管理和调度。
- 2）ApplicationMaster：负责应用程序相关的事务，比如任务调度、任务监控和容错等。

YARN的出现，使得多个计算框架可以运行在一个集群当中。

- 1）每个应用程序对应一个ApplicationMaster。
- 2）目前可以支持多种计算框架运行在YARN上面比如MapReduce、Storm、Spark、Flink等。
## 3. YARN的基本架构

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dp/yarn/archiprin-1.png')" alt="wxmp">

从YARN的架构图来看，它主要由ResourceManager和ApplicationMaster、NodeManager、ApplicationMaster和Container等组件组成。

### ResourceManager（RM）

YARN分层结构的本质是ResourceManager。这个实体控制整个集群并管理应用程序向基础计算资源的分配。ResourceManager 将各个资源部分（计算、内存、带宽等）精心安排给基础NodeManager（YARN 的每节点代理）。ResourceManager还与 ApplicationMaster 一起分配资源，与NodeManager 一起启动和监视它们的基础应用程序。在此上下文中，ApplicationMaster 承担了以前的 TaskTracker 的一些角色，ResourceManager 承担了 JobTracker 的角色。

- 1）处理客户端请求；
- 2）启动或监控ApplicationMaster；
- 3）监控NodeManager；
- 4）资源的分配与调度。

### NodeManager（NM）

NodeManager管理一个YARN集群中的每个节点。NodeManager提供针对集群中每个节点的服务，从监督对一个容器的终生管理到监视资源和跟踪节点健康。MRv1通过插槽管理Map和Reduce任务的执行，而NodeManager 管理抽象容器，这些容器代表着可供一个特定应用程序使用的针对每个节点的资源。YARN继续使用HDFS层。它的主要 NameNode用于元数据服务，而DataNode用于分散在一个集群中的复制存储服务。

- 1）单个节点上的资源管理；
- 2）处理来自ResourceManager上的命令；
- 3）处理来自ApplicationMaster上的命令。

### ApplicationMaster（AM）

ApplicationMaster管理一个在YARN内运行的应用程序的每个实例。ApplicationMaster 负责协调来自 ResourceManager 的资源，并通过 NodeManager 监视容器的执行和资源使用（CPU、内存等的资源分配）。请注意，尽管目前的资源更加传统（CPU 核心、内存），但未来会带来基于手头任务的新资源类型（比如图形处理单元或专用处理设备）。从 YARN 角度讲，ApplicationMaster 是用户代码，因此存在潜在的安全问题。YARN 假设 ApplicationMaster 存在错误或者甚至是恶意的，因此将它们当作无特权的代码对待。

- 1）负责数据的切分；
- 2）为应用程序申请资源并分配给内部的任务；
- 3）任务的监控与容错。

### Container

对任务运行环境进行抽象，封装CPU、内存等多维度的资源以及环境变量、启动命令等任务运行相关的信息。比如内存、CPU、磁盘、网络等，当AM向RM申请资源时，RM为AM返回的资源便是用Container表示的。YARN会为每个任务分配一个Container，且该任务只能使用该Container中描述的资源。

要使用一个YARN集群，首先需要来自包含一个应用程序的客户的请求。ResourceManager 协商一个容器的必要资源，启动一个ApplicationMaster 来表示已提交的应用程序。通过使用一个资源请求协议，ApplicationMaster协商每个节点上供应用程序使用的资源容器。执行应用程序时，ApplicationMaster 监视容器直到完成。当应用程序完成时，ApplicationMaster 从 ResourceManager 注销其容器，执行周期就完成了。

## 4. YARN的原理

YARN 的作业运行，主要由以下几个步骤组成：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dp/yarn/archiprin-2.png')" alt="wxmp">

 

#### 1）作业提交

   client调用job.waitForCompletion方法，向整个集群提交MapReduce作业 (第1步) 。 新的作业ID(应用ID)由资源管理器分配(第2步). 作业的client核实作业的输出, 计算输入的split,将作业的资源(包括Jar包, 配置文件, split信息)拷贝给HDFS(第3步). 最后, 通过调用资源管理器的submitApplication()来提交作业(第4步).

#### 2）作业初始化

   当资源管理器收到submitApplication()的请求时, 就将该请求发给调度器(scheduler), 调度器分配container, 然后资源管理器在该container内启动应用管理器进程, 由节点管理器监控(第5a和5b步)。
 MapReduce作业的应用管理器是一个主类为MRAppMaster的Java应用。其通过创造一些bookkeeping对象来监控作业的进度, 得到任务的进度和完成报告(第6步)。然后其通过分布式文件系统得到由客户端计算好的输入split(第7步)。然后为每个输入split创建一个map任务, 根据mapreduce.job.reduces创建reduce任务对象。

#### 3）任务分配 

   如果作业很小，应用管理器会选择在其自己的JVM中运行任务。如果不是小作业, 那么应用管理器向资源管理器请求container来运行所有的map和reduce任务(第8步). 这些请求是通过心跳来传输的, 包括每个map任务的数据位置, 比如存放输入split的主机名和机架(rack). 调度器利用这些信息来调度任务, 尽量将任务分配给存储数据的节点, 或者退而分配给和存放输入split的节点相同机架的节点.

#### 4）任务运行

 当一个任务由资源管理器的调度分配给一个container后, 应用管理器通过联系节点管理器来启动container(第9a步和9b步). 任务由一个主类为YarnChild的Java应用执行. 在运行任务之前首先本地化任务需要的资源, 比如作业配置, JAR文件, 以及分布式缓存的所有文件(第10步). 最后, 运行map或reduce任务(第11步).
 YarnChild运行在一个专用的JVM中, 但是YARN不支持JVM重用.

#### 5）进度和状态更新 

　　YARN中的任务将其进度和状态（包括counter）返回给应用管理器，客户端每秒（通过mapreduce.client.progressmonitor.pollinterval设置）向应用管理器请求进度更新，展示给用户。

#### 6）作业完成

 除了向应用管理器请求作业进度外，客户端每5分钟都会通过调用waitForCompletion()来检查作业是否完成。时间间隔可以通过mapreduce.client.completion. pollinterval来设置。作业完成之后, 应用管理器和container会清理工作状态, OutputCommiter的作业清理方法也会被调用。作业的信息会被作业历史服务器存储以备之后用户核查。
## 5. MapReduce on YARN

### 1、MapReduce on TARN

1）YARN负责资源管理和调度；

2）ApplicationMaster负责任务管理。

### 2、MapReduce ApplicationMaster

1）MRAppMaster；

2）每个MapReduce启动一个MRAppMaster；

3）MRAppMaster负责任务切分、任务调度、任务监控和容错。

### 3、MRAppMaster任务调度

1）YARN将资源分配给MRAppMaster；

2）MRAppMaster进一步将资源分配给内部任务。

### 4、MRAppMaster容错

1）MRAppMaster运行失败后，由YARN重新启动；

2）任务运行失败后，由YARN重新申请资源。

### 6. YARN HA（高可用）

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dp/yarn/archiprin-3.png')" alt="wxmp">

ResourceManager由一对分别处于Active和Standby状态的ResourceManager组成，它使用基于Zookeeper的选举算法来决定ResourceManager的状态。其中，ZKFC仅为ResourceManager的一个进程服务，不是单独存在的（区别于HDFS，它是独立存在的进程），负责监控ResourceManager的健康状况并定期向Zookeeper发送心跳。ResourceManager通过RMStateStore（目前有基于内存的、基于文件系统的和基于Zookeeper的等，此处使用后者）来存储内部数据、主要应用数据和标记等。

 

## 参考文章
* https://www.cnblogs.com/zimo-jing/p/8846569.html