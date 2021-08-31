---
title: Hadoop-设计原理
---

::: tip
本文主要是介绍 Hadoop-设计原理 。
:::

[[toc]]

## hadoop设计原理


## 一、hadoop概念

> Hadoop由两部分组成，一是负责存储与管理文件的分布式文件系统HDFS、二是负责处理与计算的MapReduce的计算框架。

## 二、HDFS
### 1.namenode

> 负责管理工作(管理文件系统的目录结构,元数据信息,响应用户请求)
> 包含了两个核心的数据结构，FsImage和EditLog。
> FsImage:用于维护整个文件系统数以及文件树中所有的文件和文件夹的元数据
> EditLog:记录了所有针对文件的创建,删除,重命名等操作

### 2.Seconday NameNode

> 为主namenode内存中的文件系统元数据,创建检查点,在文件系统中设置一个检查点来帮助NameNode更好的工作,不是取代掉NameNode,也不是备份SecondayName有两个作用
> 一是镜像备份,二是日志与镜像的定期合并。两个同时进行称为checkpoint。
> 镜像备份的作用：备份fsImage
> 合并作用:防止如果NameNode节点故障,namenode下次启动时,会把fsImage加载到内存中,应用editLog,EditLog往往很大,可以减少重启时间,同时保证HDFS系统的完整性。

### 3.dataname

> 以块的形式进行存储数据

在HDFS中,我们真实的数据是由DataNode来负责来存储的，但是数据具体被存储到了哪个DataNode节点等元数据信息则是由我们的NameNode来存储的。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ds/hadoop/desinprin-1.png')" alt="wxmp">

image.png

## 三、mapreduce

### 1. mapreduce概念

> *将复杂运行与大规模集群上的并行运算的过程高度抽象到两个函数：map和reduce
> *采用"分而治之"策略,一个存储在分布式文件系统中的大规模数据集,会被切分成许多独立分片,这些可以被多个map任务执行。
> map(映射):将小数据集解析成一批<key,value>
> reduce(递归):将所有相同Key的value合并起来

### 2.mapreduced的结构体系

> 主从式的结构,JobTrack只有一个,TaskTracker有很多个
<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ds/hadoop/desinprin-2.png')" alt="wxmp">


JobTracker的职责

> 1.负责接受用户提交给的任务
> 2.将计算任务分配给TaskTracker
> 3.跟踪监控TaskTracker的任务和task的执行状况

TaskTracker的职责

> 执行JobTracker分配给的计算任务task。

### 3.mapreduce的 input split



<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ds/hadoop/desinprin-3.png')" alt="wxmp">


image.png

> hdfs以固定大小的block为基本单位存储数据,而对于MR而言,集中处理单位split,输入分片（input split）存储的并非数据本身，而是一个分片长度和一个记录数据的位置的数组。大多数情况下,理想的分片大小是一个hdfs块。

### 4.shuffle过程



<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ds/hadoop/desinprin-4.png')" alt="wxmp">


shuffle过程

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ds/hadoop/desinprin-5.png')" alt="wxmp">


image.png

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ds/hadoop/desinprin-6.png')" alt="wxmp">


image.png

#### 1.map端shuffle


<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ds/hadoop/desinprin-7.png')" alt="wxmp">


map端shuffle

①写入环形内存缓冲区

> 因为频繁的磁盘I/O操作会严重的降低效率，因此“中间结果”不会立马写入磁盘，而是优先存储到map节点的“环形内存缓冲区”，并做一些预排序以提高效率，当写入的数据量达到预先设置的阙值后便会执行一次I/O操作将数据写入到磁盘。每个map任务都会分配一个环形内存缓冲区，用于存储map任务输出的键值对（默认大小100MB，mapreduce.task.io.sort.mb调整）以及对应的partition，被缓冲的（key,value）对已经被序列化（为了写入磁盘）。

②缓存达到阈值，溢写到磁盘文件 溢写前会进行分区。

#### 2、分区内排序和合并（可选）
2.1分区partition

> 在将map()函数后得到的(key,value)对写入到缓冲区之间,需要进行分区,这样能把map任务处理结果发送给指定的reducer去执行,从而达到负载均衡,避免数据倾斜MapReduce提供默认的分区类（HashPartitioner）



```cpp
      public class HashPartitioner<K, V> extends Partitioner<K, V> {
 
  /** Use {@link Object#hashCode()} to partition. */
  public int getPartition(K key, V value,
                          int numReduceTasks) {
    return (key.hashCode() & Integer.MAX_VALUE) % numReduceTasks;
  }
 
}
```

> getPartition()方法有三个参数，前两个指的是mapper任务输出的键值对，而第三个参数指的是设置的reduce任务的数量，默认值为1。因为任何整数与1相除的余数肯定是0。也就是说默认的getPartition()方法的返回值总是0，也就是Mapper任务的输出默认总是送给同一个Reducer任务，最终只能输出到一个文件中。如果想要让mapper输出的结果给多个reducer处理，那么只需要写一个类，让其继承Partitioner类，并重写getPartition()方法，让其针对不同情况返回不同数值即可。并在最后通过job设置指定分区类和reducer任务数量即可。

2.2分区内排序

> 旦缓冲区内容达到阈值（mapreduce.map.io.sort.spill.percent,默认0.80，或者80%），就会会锁定这80%的内存，并在每个分区中对其中的键值对按键进行sort排序，具体是将数据按照partition和key两个关键字进行排序，排序结果为缓冲区内的数据按照partition为单位聚集在一起，同一个partition内的数据按照key有序。排序完成后会创建一个溢出写文件（临时文件），然后开启一个后台线程把这部分数据以一个临时文件的方式溢出写（spill）到本地磁盘中

2.3合并（可选）

> 如果客户端自定义了Combiner（相当于map阶段的reduce），则会在分区排序后到溢写出前自动调用combiner，将相同的key的value相加，这样的好处就是减少溢写到磁盘的数据量。这个过程叫“合并”

④归并merge

> 当一个map task处理的数据很大，以至于超过缓冲区内存时，就会生成多个spill文件。此时就需要对同一个map任务产生的多个spill文件进行归并生成最终的一个已分区且已排序的大文件。配置属性mapreduce.task.io.sort.factor控制着一次最多能合并多少流，默认值是10。这个过程包括排序和合并（可选），归并得到的文件内键值对有可能拥有相同的key，这个过程如果client设置过Combiner，也会合并相同的key值的键值对（根据上面提到的combine的调用时机可知）。
> 溢出写文件归并完毕后，Map将删除所有的临时溢出写文件，并告知NodeManager任务已完成，只要其中一个MapTask完成，ReduceTask就开始复制它的输出（Copy阶段分区输出文件通过http的方式提供给reducer）

map shuffle一些特点

> 1.每个Map任务分配一个缓存
> 2.MapReduce默认100MB缓存
> 3.设置溢写比例0.8
> 4.分区默认采用哈希函数
> 5.排序是默认的操作
> 6.排序后可以合并（Combine）
> 7.合并不能改变最终结果
> 8.在Map任务全部结束之前进行归并
> 9.归并得到一个大的文件，放在本地磁盘
> 10.文件归并时，如果溢写文件数量大于预定值（默认是3）则可以再次启动Combiner，少于3不需要

合并（Combine）和归并（Merge）的区别：

> 两个键值对<“a”,1>和<“a”,1>，如果合并，会得到<“a”,2>，如果归并，会得到<“a”,<1,1>>

#### 3.Reduce端的Shuffle过程



<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ds/hadoop/desinprin-8.png')" alt="wxmp">


image.png

①领取数据

> Map端的shuffle过程结束后，结果会保存在本地磁盘中，Reduce任务只需要把这些数据领取（Fetch）回来首先存放到缓存当中

②归并数据

> 如果缓存到一定阈值，就会像发生溢写操作,当溢写程序启动时，具有相同key的键值对会被归并，如果用户定义了combiner，则归并后还可以执行combiner，减少写入磁盘的数据量，每个溢写过程结束后，都会在磁盘生成一个溢写文件，当溢写文件过多时也会像Map一样被归并成一个大文件，归并是也会进行排序，当数据很少时，写入缓存就行，不需要溢写到磁盘，而是直接在内存中执行归并操作，直接输出给Reduce任务

面试宝典之mapreduce的shuffle过程

> 首先shuffle是贯彻整个mapreduce过程,可以分为2部分,map端的shuffle和reduce端的shuffle。map端shuffle,map任务执行后的中间结果”不会立马写入磁盘，而是优先存储到map节点的“环形内存缓冲区”(默认100MB)，当内存缓存区达到一定阈值(默认0.8)就会进行溢写到磁盘文件,溢写之前会先进行分区,然后分区内的排序,如果客户端自定义了Combiner，还会进行合并操作。最后如果有多个溢写文件。会对这个多个溢写文件进行归并生成最终的一个已分区且已排序的大文件。reduce端shuffle先领取不同节点map任务执行结束数据存储到缓存区,当缓存区到达一定阈值,就是发生溢写操作,溢写之前具有相同key的键值对会被归并,如果客户端定义combiner，归并后还可以执行combiner(合并),但溢写文件过多,也会归并成一个大文件。输出给Reduce任务，整个shuffle才最终结束。

## 四、hadoop 2.0新特性
1.针对1.0中NameNode的单点故障问题，在2.0中引入了新的HA机制：即如果Active的NameNode节点挂掉，处于Standby的NameNode节点将替换掉它继续工作

2.引入yarn资源管理



<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ds/hadoop/desinprin-9.png')" alt="wxmp">


### yarn资源管理

> Yarn是Hadoop2.0中的资源管理系统，它的基本设计思想是将MR1.0中的JobTracker拆分成两个独立的服务：一个是全局的资源管理器ResouceManager和每个应用程序特有的AppMaster。

在Yarn平台中，各个组件的详细功能如下：
#### 1.ResouceManager

> 是一个全局的资源管理器，负责整个系统的资源管理和分配，ResouceManager相当于Hadoop1.0中的JobTracker的部分职能：资源分配。

#### 2.AppMaster

> 负责管理单个应用程序，即负责一个Job生命周期内的所有工作，监控整个任务的执行，跟踪整个任务的状态，处理任务失败以异常情况。AppMaster类似老的框架中的JobTracker的部分职能：任务分配与任务监控。特别注意：每一个Job（而不是每一种）都有一个相应的APPMaster，APPMaster可以运行在除主节点ResouceManager节点以外的其它机器上，但是在Hadoop1.0中，JobTracker的位置是固定的。

#### 3.NodeManager

> NodeManager 是 YARN 集群当中真正资源的提供者，是真正执行应用程序的容器的提供者， 监控应用程序的资源使用情况（CPU，内存，硬盘，网络），并通过心跳向集群资源调度器 ResourceManager 进行汇报以更新自己的健康状态。同时其也会监督 Container 的生命周期 管理，监控每个 Container 的资源使用（内存、CPU 等）情况，追踪节点健康状况，管理日志和不同应用程序用到的附属服务（auxiliary service）。

### YARN 作业执行流程



<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ds/hadoop/desinprin-10.png')" alt="wxmp">


### YARN 作业执行流程

> 1>首先，用户的应用程序通过Yarn平台的客户端程序将我们的应用程序提交给我们的YARN平台
> 2>YARN平台的ResouceManager接受到我们客户端提交给的应用程序后，将应用程序交给某个NodeManager，并在其上面启动一个新的进程AppMaster
> 3>AppMaster首先为应用程序在ResouceManager中进行注册，这样用户可以通过ResouceManager查看应用程序的执行进度
> 4>注册完之后，APPMaster将通过Rpc协议向ResouceManager申请资源并领取相应的资源
> 5>获取到资源后，APPMaster便于对应的NodeManager节点进行通信，要求其启动相应的任务
> 6>各个任务在执行的过程中将通过RPC协议向APPMaster汇报自己的执行进度和执行状况，以便让APPMaster可以随时掌握各个任务的执行状况，进而在任务运行失败时可以重新启动相应的任务。
> 7>mapper任务和reducer任务执行完之后，AppMaster向ResouceManager节点注销并关闭自己，此时资源得到回收，应用程序执行完毕。

## 参考文章
* https://www.jianshu.com/p/ad9b9e2ecd25