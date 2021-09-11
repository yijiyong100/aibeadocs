---
title: Spark-基础参数调优
---

::: tip
本文主要是介绍 Spark-基础参数调优 。
:::

[[toc]]

## 1 配置内存

### 操作场景

Flink是依赖内存计算，计算过程中内存不够对Flink的执行效率影响很大。可以通过监控GC（Garbage Collection），评估内存使用及剩余情况来判断内存是否变成性能瓶颈，并根据情况优化。
 监控节点进程的YARN的Container GC日志，如果频繁出现Full GC，需要优化GC。

------

GC的配置：在客户端的“conf/flink-conf.yaml”配置文件中，在“env.java.opts”配置项中添加参数：“



```java
-Xloggc:<LOG_DIR>/gc.log 
-XX:+PrintGCDetails 
-XX:-OmitStackTraceInFastThrow 
-XX:+PrintGCTimeStamps 
-XX:+PrintGCDateStamps 
-XX:+UseGCLogFileRotation 
-XX:NumberOfGCLogFiles=20 
-XX:GCLogFileSize=20M
```

此处默认已经添加GC日志。

------

### 操作步骤

- 优化GC。

  调整老年代和新生代的比值。在客户端的“conf/flink-conf.yaml”配置文件中，在“env.java.opts”配置项中添加参数：“-XX:NewRatio”。如“ -XX:NewRatio=2”，则表示老年代与新生代的比值为2:1，新生代占整个堆空间的1/3，老年代占2/3。

- 开发Flink应用程序时，优化DataStream的数据分区或分组操作。

  - 当分区导致数据倾斜时，需要考虑优化分区。
  - 避免非并行度操作，有些对DataStream的操作会导致无法并行，例如WindowAll。
  - keyBy尽量不要使用String。

------

### 补充:



```java
-Xloggc:<LOG_DIR>/gc.log
#GC详情 
-XX:+PrintGCDetails 
-XX:-OmitStackTraceInFastThrow 
#打印GC时间信息
-XX:+PrintGCTimeStamps 
-XX:+PrintGCDateStamps 
-XX:+UseGCLogFileRotation 
-XX:NumberOfGCLogFiles=20 
-XX:GCLogFileSize=20M。
#表示老年代与新生代的比值为2:1，新生代占整个堆空间的1/3，老年代占2/3。
#设置年轻代和年老代的比值。如:为3，表示年轻代与年老代比值为1:3，年轻代占整个年轻代年老代和的1/4 
-XX:NewRatio=2
======================================================================================================

堆设置
-Xms :初始堆大小
-Xmx :最大堆大小
-XX:NewSize=n :设置年轻代大小
-XX:NewRatio=n: 设置年轻代和年老代的比值。如:为3，表示年轻代与年老代比值为1：3，年轻代占整个年轻代年老代和的1/4
-XX:SurvivorRatio=n :年轻代中Eden区与两个Survivor区的比值。注意Survivor区有两个。如：3，表示Eden：Survivor=3：2，一个Survivor区占整个年轻代的1/5
-XX:MaxPermSize=n :设置持久代大小
收集器设置
-XX:+UseSerialGC :设置串行收集器
-XX:+UseParallelGC :设置并行收集器
-XX:+UseParalledlOldGC :设置并行年老代收集器
-XX:+UseConcMarkSweepGC :设置并发收集器
垃圾回收统计信息
-XX:+PrintHeapAtGC GC的heap详情
-XX:+PrintGCDetails  GC详情
-XX:+PrintGCTimeStamps  打印GC时间信息
-XX:+PrintTenuringDistribution    打印年龄信息等
-XX:+HandlePromotionFailure   老年代分配担保（true  or false）
并行收集器设置
-XX:ParallelGCThreads=n :设置并行收集器收集时使用的CPU数。并行收集线程数。
-XX:MaxGCPauseMillis=n :设置并行收集最大暂停时间
-XX:GCTimeRatio=n :设置垃圾回收时间占程序运行时间的百分比。公式为1/(1+n)
并发收集器设置
-XX:+CMSIncrementalMode :设置为增量模式。适用于单CPU情况。
-XX:ParallelGCThreads=n :设置并发收集器年轻代收集方式为并行收集时，使用的CPU数。并行收集线程数
```

## 2 设置并行度

### 操作场景

- 并行度控制任务的数量，影响操作后数据被切分成的块数。调整并行度让任务的数量和每个任务处理的数据与机器的处理能力达到最优。
- 查看CPU使用情况和内存占用情况，当任务和数据不是平均分布在各节点，而是集中在个别节点时，可以增大并行度使任务和数据更均匀的分布在各个节点。增加任务的并行度，充分利用集群机器的计算能力，一般并行度设置为集群CPU核数总和的2-3倍。

### 操作步骤

任务的并行度可以通过以下四种层次（按优先级从高到低排列）指定，用户可以根据实际的内存、CPU、数据以及应用程序逻辑的情况调整并行度参数。

- 算子层次
   一个算子、数据源和sink的并行度可以通过调用setParallelism()方法来指定，例如



```java
final StreamExecutionEnvironment env = StreamExecutionEnvironment.getExecutionEnvironment();

DataStream<String> text = [...]
DataStream<Tuple2<String, Integer>> wordCounts = text
    .flatMap(new LineSplitter())
    .keyBy(0)
    .timeWindow(Time.seconds(5))
    .sum(1).setParallelism(5);

wordCounts.print();

env.execute("Word Count Example");
```

- 执行环境层次
   Flink程序运行在执行环境中。执行环境为所有执行的算子、数据源、data sink定义了一个默认的并行度。
   执行环境的默认并行度可以通过调用setParallelism()方法指定。例如：



```java
final StreamExecutionEnvironment env = StreamExecutionEnvironment.getExecutionEnvironment();
    env.setParallelism(3);
    DataStream<String> text = [...]
    DataStream<Tuple2<String, Integer>> wordCounts = [...]
    wordCounts.print();
    env.execute("Word Count Example");
```

- 客户端层次
   并行度可以在客户端将job提交到Flink时设定。对于CLI客户端，可以通过“-p”参数指定并行度。例如：
   `./bin/flink run -p 10 ../examples/*WordCount-java*.jar`
- 系统层次
   在系统级可以通过修改Flink客户端conf目录下的“flink-conf.yaml”文件中的“parallelism.default”配置选项来指定所有执行环境的默认并行度。

## 3.配置进程参数

### 操作场景

- Flink on YARN模式下，有JobManager和TaskManager两种进程。在任务调度和运行的过程中，JobManager和TaskManager承担了很大的责任。
- 因而JobManager和TaskManager的参数配置对Flink应用的执行有着很大的影响意义。用户可通过如下操作对Flink集群性能做优化。

### 操作步骤

#### 1.配置JobManager内存。

- JobManager负责任务的调度，以及TaskManager、RM之间的消息通信。当任务数变多，任务平行度增大时，JobManager内存都需要相应增大。

您可以根据实际任务数量的多少，为JobManager设置一个合适的内存。
 •在使用yarn-session命令时，添加“-jm MEM”参数设置内存。
 •在使用yarn-cluster命令时，添加“-yjm MEM”参数设置内存。

#### 2.配置TaskManager个数。

每个TaskManager每个核同时能跑一个task，所以增加了TaskManager的个数相当于增大了任务的并发度。在资源充足的情况下，可以相应增加TaskManager的个数，以提高运行效率。
 •在使用yarn-session命令时，添加“-n NUM”参数设置TaskManager个数。
 •在使用yarn-cluster命令时，添加“-yn NUM”参数设置TaskManager个数。

#### 3.配置TaskManager Slot数。

每个TaskManager多个核同时能跑多个task，相当于增大了任务的并发度。但是由于所有核共用TaskManager的内存，所以要在内存和核数之间做好平衡。
 •在使用yarn-session命令时，添加“-s NUM”参数设置SLOT数。
 •在使用yarn-cluster命令时，添加“-ys NUM”参数设置SLOT数。

#### 4.配置TaskManager内存。

TaskManager的内存主要用于任务执行、通信等。当一个任务很大的时候，可能需要较多资源，因而内存也可以做相应的增加。
 •将在使用yarn-sesion命令时，添加“-tm MEM”参数设置内存。
 •将在使用yarn-cluster命令时，添加“-ytm MEM”参数设置内存。



### 参考文章
* https://www.jianshu.com/p/9e65c2ce63ec