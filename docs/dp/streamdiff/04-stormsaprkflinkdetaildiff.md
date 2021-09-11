---
title: Storm、Spark与Flink详细比较
---

::: tip
本文主要是介绍 Storm、Spark与Flink详细比较 。
:::

[[toc]]

## Storm，Spark和Flink简介 联系与区别


storm、spark streaming、flink是三个最著名的分布式流处理框架，并且都是开源的分布式系统，具有低延迟、可扩展和容错性诸多优点，允许你在运行数据流代码时，将任务分配到一系列具有容错能力的计算机上并行运行,都提供了简单的API来简化底层实现的复杂程度。

## 1、Apache Storm

  Storm是一个免费并开源的分布式实时计算系统。利用Storm可以很容易做到可靠地处理无限的数据流，像Hadoop批量处理大数据一样，Storm可以实时处理数据。

Storm 很简单，可用于任意编程语言。Apache Storm 采用 Clojure 开发。Storm 有很多应用场景，包括实时数据分析、联机学习、持续计算、分布式 RPC、ETL 等。

主节点 nimbus  从节点 supervisor

用户提交作业给nimbus， nimbus把任务分配给supervisor，这些提交的任务就是topology（拓扑）

运行的作业分为两种 spout 和 bolt。

Storm是流式的处理既stream，stream的内容是tuple（元组）

Spout生产tuple（元组）发送给bolt处理，bolt处理过的tuple也可以再次发送给其他的tuple处理，最后存入容器。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dp/streamdiff/stormsparkflinkdetaildiff-1.png')" alt="wxmp">

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dp/streamdiff/stormsparkflinkdetaildiff-2.png')" alt="wxmp">


- Nimbus

Storm集群的Master节点，负责分发用户代码，指派给具体的Supervisor节点上的Worker节点，去运行Topology对应的组件

- Supervisor

Storm集群的从节点，负责管理运行在Supervisor节点上的每一个Worker进程的启动和终止。

- Worker

运行具体处理组件逻辑的进程。Worker运行的任务类型只有两种，一种是Spout任务，一种是Bolt任务。

- Task

worker中每一个spout/bolt的线程称为一个task. 在storm0.8之后，task不再与物理线程对应，不同spout/bolt的task可能会共享一个物理线程，该线程称为executor。

- ZooKeeper

用来协调Nimbus和Supervisor，如果Supervisor因故障出现问题而无法运行Topology，Nimbus会第一时间感知到，并重新分配Topology到其它可用的Supervisor上运行

- Topology

Storm中运行的一个实时应用程序的名称。将 Spout、 Bolt整合起来的拓扑图。定义了 Spout和 Bolt的结合关系、并发数量、配置等等。

-  Spout

在一个topology中获取源数据流的组件。通常情况下spout会从外部数据源中读取数据，然后转换为topology内部的源数据。

-  Bolt

接受数据然后执行处理的组件,用户可以在其中执行自己想要的操作。

-  Tuple

一次消息传递的基本单元，理解为一组消息就是一个Tuple。

-  Stream

Tuple的集合。表示数据的流向。

Storm处理的是每次传入的一个事件，并且Storm处理一个事件是可以达到亚秒级的。在Storm中，当每条单独的记录通过系统时必须被跟踪，所以Storm能够至少保证每条记录将被处理一次，但是在从错误中恢复过来时候允许出现重复记录，这意味着可变状态可能不正确地被更新两次。

## 2、Spark Streaming

Spark流是对于Spark核心API的拓展，从而支持对于实时数据流的可拓展，高吞吐量和容错性流处理。数据可以由多个源取得，例如：Kafka，Flume，Twitter，ZeroMQ，Kinesis或者TCP接口，同时可以使用由如map，reduce，join和window这样的高层接口描述的复杂算法进行处理。最终，处理过的数据可以被推送到文件系统，数据库和HDFS。**Spark Streaming是一个粗粒度的框架【也就是只能对一批数据指定处理方法】，核心是采用微批次（Mcro-batch）架构。和Storm采用的以条处理的不同。**

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dp/streamdiff/stormsparkflinkdetaildiff-3.png')" alt="wxmp">

Spark Streaming会运行接收器来不断的接收输入的数据流，然后根据程序配置的时间，将时间范围内的所有数据打成一个RDD，发送给Spark Core去进行处理。依次来打成对数据流的计算。在saprkStreaming中，如果入水口的速度大于出水口的速度，那么势必导致水管爆裂，Spark Streaming也存在这个问题，内部采用背压机制来进行处理，会通过ReceiverRateController来不断计算RDD的处理速度和RDD的生成速度，来通过令牌桶机制进行速度控制。只要是控制令牌的生成周期。

Spark Streaming 运行时的角色(standalone 模式)主要有：

- **Master**:主要负责整体集群资源的管理和应用程序调度；
- **Worker**:负责单个节点的资源管理，driver 和 executor 的启动等；
- **Driver**:用户入口程序执行的地方，即 SparkContext 执行的地方，主要是 DAG 生成、stage 划分、task 生成及调度；
- **Executor**:负责执行 task，反馈执行状态和执行结果。

对于编码完成的 Spark Core 任务在生成到最终执行结束主要包括以下几个部分：

- 构建 DGA 图；
- 划分 stage；
- 生成 taskset；
- 调度 task。

## 3、Flink

Flink是原生的流处理系统，提供high level的API。Flink也提供 API来像Spark一样进行批处理，但两者处理的基础是完全不同的。Flink把批处理当作流处理中的一种特殊情况。在Flink中，所有 的数据都看作流，是一种很好的抽象，因为这更接近于现实世界。

Flink系统的架构与Spark类似，是一个基于Master-Slave风格的架构。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dp/streamdiff/stormsparkflinkdetaildiff-4.png')" alt="wxmp">

当 Flink 集群启动后，首先会启动一个 JobManger 和一个或多个的 TaskManager。由 Client 提交任务给 JobManager， JobManager 再调度任务到各个 TaskManager 去执行，然后 TaskManager 将心跳和统计信息汇报给 JobManager。 TaskManager 之间以流的形式进行数据的传输。上述三者均为独立的 JVM 进程。

 

Client 为提交 Job 的客户端，可以是运行在任何机器上（与 JobManager 环境连通即可）。提交 Job 后，Client 可以结束进程 （Streaming的任务），也可以不结束并等待结果返回。

 

JobManager 主要负责调度 Job 并协调 Task 做 checkpoint，职责上很像 Storm 的 Nimbus。从 Client 处接收到 Job 和 JAR 包 等资源后，会生成优化后的执行计划，并以 Task 的单元调度到各个 TaskManager 去执行。

 

TaskManager 在启动的时候就设置好了槽位数（Slot），每个 slot 能启动一个 Task，Task 为线程。从 JobManager 处接收需要 部署的 Task，部署启动后，与自己的上游建立 Netty 连接，接收数据并处理。

 

JobManager

JobManager是Flink系统的协调者，它负责接收Flink Job，调度组成Job的多个Task的执行。同时，JobManager还负责收集Job 的状态信息，并管理Flink集群中从节点TaskManager。JobManager所负责的各项管理功能，它接收到并处理的事件主要包括：

 

RegisterTaskManager

在Flink集群启动的时候，TaskManager会向JobManager注册，如果注册成功，则JobManager会向TaskManager回复消息 AcknowledgeRegistration。

 

SubmitJob

Flink程序内部通过Client向JobManager提交Flink Job，其中在消息SubmitJob中以JobGraph形式描述了Job的基本信息。

 

CancelJob

请求取消一个Flink Job的执行，CancelJob消息中包含了Job的ID，如果成功则返回消息CancellationSuccess，失败则返回消息 CancellationFailure。

 

UpdateTaskExecutionState

TaskManager会向JobManager请求更新ExecutionGraph中的ExecutionVertex的状态信息，更新成功则返回true。

 

RequestNextInputSplit

运行在TaskManager上面的Task，请求获取下一个要处理的输入Split，成功则返回NextInputSplit。

 

JobStatusChanged

ExecutionGraph向JobManager发送该消息，用来表示Flink Job的状态发生的变化，例如：RUNNING、CANCELING、 FINISHED等。

 

TaskManager

TaskManager也是一个Actor，它是实际负责执行计算的Worker，在其上执行Flink Job的一组Task。每个TaskManager负责管理 其所在节点上的资源信息，如内存、磁盘、网络，在启动的时候将资源的状态向JobManager汇报。TaskManager端可以分成两个 阶段：

 

注册阶段

TaskManager会向JobManager注册，发送RegisterTaskManager消息，等待JobManager返回AcknowledgeRegistration，然 后TaskManager就可以进行初始化过程。

 

可操作阶段

该阶段TaskManager可以接收并处理与Task有关的消息，如SubmitTask、CancelTask、FailTask。如果TaskManager无法连接 到JobManager，这是TaskManager就失去了与JobManager的联系，会自动进入“注册阶段”，只有完成注册才能继续处理Task 相关的消息。

 

Client

当用户提交一个Flink程序时，会首先创建一个Client，该Client首先会对用户提交的Flink程序进行预处理，并提交到Flink集群中处 理，所以Client需要从用户提交的Flink程序配置中获取JobManager的地址，并建立到JobManager的连接，将Flink Job提交给 JobManager。Client会将用户提交的Flink程序组装一个JobGraph， 并且是以JobGraph的形式提交的。一个JobGraph是一个 Flink Dataflow，它由多个JobVertex组成的DAG。其中，一个JobGraph包含了一个Flink程序的如下信息：JobID、Job名称、配 置信息、一组JobVertex等。

在基于Yarn层面的架构上，

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dp/streamdiff/stormsparkflinkdetaildiff-5.png')" alt="wxmp">

基于yarn层面的架构类似spark on yarn模式，都是由Client提交App到RM上面去运行，然后RM分配第一个container去运行 AM，然后由AM去负责资源的监督和管理。需要说明的是，Flink的yarn模式更加类似spark on yarn的cluster模式，在cluster模式 中，dirver将作为AM中的一个线程去运行，在Flink on yarn模式也是会将JobManager启动在container里面，去做个driver类似 的task调度和分配，YARN AM与Flink JobManager在同一个Container中，这样AM可以知道Flink JobManager的地址，从而 AM可以申请Container去启动Flink TaskManager。待Flink成功运行在YARN集群上，Flink YARN Client就可以提交Flink Job到 Flink JobManager，并进行后续的映射、调度和计算处理。

Flink有高吞吐 & 低延迟、支持 Event Time 和乱序事件、状态计算的 exactly-once 语义、高度灵活的流式窗口、带反压的连续流模型、容错性、内存管理、迭代和增量迭代等特性和优点。

 

## 4、三者对比

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dp/streamdiff/stormsparkflinkdetaildiff-6.png')" alt="wxmp">

如果你想要的是一个允许增量计算的高速事件处理系统，Storm会是最佳选择。

如果你必须有状态的计算，恰好一次的递送，并且不介意高延迟的话，那么可以考虑Spark Streaming，特别如果你还计划图形操作、机器学习或者访问SQL的话，Apache Spark的stack允许你将一些library与数据流相结合(Spark SQL，Mllib，GraphX)，它们会提供便捷的一体化编程模型。尤其是数据流算法(例如：K均值流媒体)允许Spark实时决策的促进。


Flink支持增量迭代，具有对迭代自动优化的功能，在迭代式数据处理上，比Spark更突出，Flink基于每个事件一行一行地流式处理，真正的流式计算，流式计算跟Storm性能差不多，支持毫秒级计算，而Spark则只能支持秒级计算。

## 参考文章
* https://blog.csdn.net/mojir/article/details/96033432