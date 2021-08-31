---
title: Hadoop-工作原理
---

::: tip
本文主要是介绍 Hadoop-工作原理 。
:::

[[toc]]

## Hadoop工作原理浅析

Hadoop是Apache软件基金会所开发的并行计算框架与分布式文件系统。最核心的模块包括Hadoop Common、HDFS与MapReduce。

## HDFS

HDFS是Hadoop分布式文件系统（Hadoop Distributed File System）的缩写，为分布式计算存储提供了底层支持。采用Java语言开发，可以部署在多种普通的廉价机器上，以集群处理数量积达到大型主机处理性能。

### HDFS 架构原理

HDFS采用master/slave架构。一个HDFS集群包含一个单独的NameNode和多个DataNode。

NameNode作为master服务，它负责管理文件系统的命名空间和客户端对文件的访问。NameNode会保存文件系统的具体信息，包括文件信息、文件被分割成具体block块的信息、以及每一个block块归属的DataNode的信息。对于整个集群来说，HDFS通过NameNode对用户提供了一个单一的命名空间。

DataNode作为slave服务，在集群中可以存在多个。通常每一个DataNode都对应于一个物理节点。DataNode负责管理节点上它们拥有的存储，它将存储划分为多个block块，管理block块信息，同时周期性的将其所有的block块信息发送给NameNode。

下图为HDFS系统架构图，主要有三个角色，Client、NameNode、DataNode。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ds/hadoop/workprin-1.png')" alt="wxmp">

 

### 文件写入时：

Client向NameNode发起文件写入的请求。

NameNode根据文件大小和文件块配置情况，返回给Client它所管理部分DataNode的信息。

Client将文件划分为多个block块，并根据DataNode的地址信息，按顺序写入到每一个DataNode块中。

### 当文件读取：

Client向NameNode发起文件读取的请求。

NameNode返回文件存储的block块信息、及其block块所在DataNode的信息。

Client读取文件信息。

### HDFS 数据备份

HDFS被设计成一个可以在大集群中、跨机器、可靠的存储海量数据的框架。它将所有文件存储成block块组成的序列，除了最后一个block块，所有的block块大小都是一样的。文件的所有block块都会因为容错而被复制。每个文件的block块大小和容错复制份数都是可配置的。容错复制份数可以在文件创建时配置，后期也可以修改。HDFS中的文件默认规则是write one（一次写、多次读）的，并且严格要求在任何时候只有一个writer。NameNode负责管理block块的复制，它周期性地接收集群中所有DataNode的心跳数据包和Blockreport。心跳包表示DataNode正常工作，Blockreport描述了该DataNode上所有的block组成的列表。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ds/hadoop/workprin-2.png')" alt="wxmp">

 

### 备份数据的存放：

备份数据的存放是HDFS可靠性和性能的关键。HDFS采用一种称为rack-aware的策略来决定备份数据的存放。通过一个称为Rack Awareness的过程，NameNode决定每个DataNode所属rack id。缺省情况下，一个block块会有三个备份，一个在NameNode指定的DataNode上，一个在指定DataNode非同一rack的DataNode上，一个在指定DataNode同一rack的DataNode上。这种策略综合考虑了同一rack失效、以及不同rack之间数据复制性能问题。

### 副本的选择：

为了降低整体的带宽消耗和读取延时，HDFS会尽量读取最近的副本。如果在同一个rack上有一个副本，那么就读该副本。如果一个HDFS集群跨越多个数据中心，那么将首先尝试读本地数据中心的副本。

### 安全模式：

系统启动后先进入安全模式，此时系统中的内容不允许修改和删除，直到安全模式结束。安全模式主要是为了启动检查各个DataNode上数据块的安全性。

### MapReduce

MapReduce是由Google在一篇论文中提出并广为流传的。它最早是Google提出的一个软件架构，用于大规模数据集群分布式运算。任务的分解（Map）与结果的汇总（Reduce）是其主要思想。Map就是将一个任务分解成多个任务，Reduce就是将分解后多任务分别处理，并将结果汇总为最终结果。熟悉Function Language的人一定感觉很熟悉，不是什么新的思想。

MapReduce 处理流程

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ds/hadoop/workprin-3.png')" alt="wxmp">

 

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ds/hadoop/workprin-4.png')" alt="wxmp">

上图就是MapReduce大致的处理流程。在Map之前，可能还有对输入数据的Split过程以保证任务并行效率，在Map之后可能还有Shuffle过程来提高Reduce的效率以及减小数据传输的压力。

## Hadoop

Hadoop被定位为一个易于使用的平台，以HDFS、MapReduce为基础，能够运行上千台PCServer组成的系统集群，并以一种可靠、容错的方式分布式处理请求。

Hadoop 部署

下图显示Hadoop部署结构示意图

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ds/hadoop/workprin-5.png')" alt="wxmp">

 

在Hadoop的系统中，会有一台master，主要负责NameNode的工作以及JobTracker的工作。JobTracker的主要职责就是启动、跟踪和调度各个Slave的任务执行。还会有多台slave，每一台slave通常具有DataNode的功能并负责TaskTracker的工作。TaskTracker根据应用要求来结合本地数据执行Map任务以及Reduce任务。

Hadoop 处理流程

在描述Hadoop处理流程之前，先提一个分布式计算最为重要的设计原则：Moving Computation is Cheaper than Moving Data。意思是指在分布式计算中，移动计算的代价总是低于移动数据的代价。本地计算使用本地数据，然后汇总才能保证分布式计算的高效性。

下图所示Hadoop处理流程：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ds/hadoop/workprin-6.png')" alt="wxmp">

### MapReduce 计算模型

MapReduce 是 Google 公司的核心计算模型，它将复杂的运行于大规模集群上的并行计算过程高度的抽象到了两个函数，Map 和 Reduce, 这是一个令人惊讶的简单却又威力巨大的模型。适合用 MapReduce 来处理的数据集(或任务)有一个基本要求: 待处理的数据集可以分解成许多小的数据集，而且每一个小数据集都可以完全并行地进行处理。


图 1. MapReduce 计算流程 
<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ds/hadoop/workprin-7.png')" alt="wxmp">

图一说明了用 MapReduce 来处理大数据集的过程, 这个 MapReduce 的计算过程简而言之，就是将大数据集分解为成百上千的小数据集，每个(或若干个)数据集分别由集群中的一个结点(一般就是一台普通的计算机)进行处理并生成中间结果，然后这些中间结果又由大量的结点进行合并, 形成最终结果。
``` shell
计算模型的核心是 Map 和 Reduce 两个函数，这两个函数由用户负责实现，功能是按一定的映射规则将输入的 <key, value> 对转换成另一个或一批 <key, value> 对输出。
```
表一 Map 和 Reduce 函数

| 函数   | 输入          | 输出          | 说明                                                                                                                                             |
| ------ | ------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| Map    | <k1, v1>      | List(<k2,v2>) | 1. 将小数据集进一步解析成一批 <key,value> 对，输入 Map 函数中进行处理。  2. 每一个输入的 <k1,v1> 会输出一批 <k2,v2>。 <k2,v2> 是计算的中间结果。 |
| Reduce | <k2,List(v2)> | <k3,v3>       | 输入的中间结果 <k2,List(v2)> 中的 List(v2) 表示是一批属于同一个 k2 的 value                                                                      |

``` shell
以一个计算文本文件中每个单词出现的次数的程序为例，<k1,v1> 可以是 <行在文件中的偏移位置, 文件中的一行>，经 Map 函数映射之后，形成一批中间结果 <单词，出现次数>, 而 Reduce 函数则可以对中间结果进行处理，将相同单词的出现次数进行累加，得到每个单词的总的出现次数。
```

基于 MapReduce 计算模型编写分布式并行程序非常简单，程序员的主要编码工作就是实现 Map 和 Reduce 函数，其它的并行编程中的种种复杂问题，如分布式存储，工作调度，负载平衡，容错处理，网络通信等，均由 MapReduce 框架(比如 Hadoop )负责处理，程序员完全不用操心。

### 集群上的并行计算

MapReduce 计算模型非常适合在大量计算机组成的大规模集群上并行运行。图一中的每一个 Map 任务和每一个 Reduce 任务均可以同时运行于一个单独的计算结点上，可想而知其运算效率是很高的，那么这样的并行计算是如何做到的呢？

### 数据分布存储

Hadoop 中的分布式文件系统 HDFS 由一个管理结点 ( NameNode )和N个数据结点 ( DataNode )组成，每个结点均是一台普通的计算机。在使用上同我们熟悉的单机上的文件系统非常类似，一样可以建目录，创建，复制，删除文件，查看文件内容等。但其底层实现上是把文件切割成 Block，然后这些 Block 分散地存储于不同的 DataNode 上，每个 Block 还可以复制数份存储于不同的 DataNode 上，达到容错容灾之目的。NameNode 则是整个 HDFS 的核心，它通过维护一些数据结构，记录了每一个文件被切割成了多少个 Block，这些 Block 可以从哪些 DataNode 中获得，各个 DataNode 的状态等重要信息。如果你想了解更多的关于 HDFS 的信息，可进一步阅读参考资料： [ The Hadoop Distributed File System:Architecture and Design](http://hadoop.apache.org/core/docs/r0.16.0/hdfs_design.html)

### 分布式并行计算

Hadoop 中有一个作为主控的 JobTracker，用于调度和管理其它的 TaskTracker, JobTracker 可以运行于集群中任一台计算机上。TaskTracker 负责执行任务，必须运行于 DataNode 上，即 DataNode 既是数据存储结点，也是计算结点。 JobTracker 将 Map 任务和 Reduce 任务分发给空闲的 TaskTracker, 让这些任务并行运行，并负责监控任务的运行情况。如果某一个 TaskTracker 出故障了，JobTracker 会将其负责的任务转交给另一个空闲的 TaskTracker 重新运行。

### 本地计算

数据存储在哪一台计算机上，就由这台计算机进行这部分数据的计算，这样可以减少数据在网络上的传输，降低对网络带宽的需求。在 Hadoop 这样的基于集群的分布式并行系统中，计算结点可以很方便地扩充，而因它所能够提供的计算能力近乎是无限的，但是由是数据需要在不同的计算机之间流动，故网络带宽变成了瓶颈，是非常宝贵的，“本地计算”是最有效的一种节约网络带宽的手段，业界把这形容为“移动计算比移动数据更经济”。


图 2. 分布存储与并行计算 
<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ds/hadoop/workprin-8.png')" alt="wxmp">

### 任务粒度

把原始大数据集切割成小数据集时，通常让小数据集小于或等于 HDFS 中一个 Block 的大小(缺省是 64M)，这样能够保证一个小数据集位于一台计算机上，便于本地计算。有 M 个小数据集待处理，就启动 M 个 Map 任务，注意这 M 个 Map 任务分布于 N 台计算机上并行运行，Reduce 任务的数量 R 则可由用户指定。

### Partition

把 Map 任务输出的中间结果按 key 的范围划分成 R 份( R 是预先定义的 Reduce 任务的个数)，划分时通常使用 hash 函数如: hash(key) mod R，这样可以保证某一段范围内的 key，一定是由一个 Reduce 任务来处理，可以简化 Reduce 的过程。

### Combine
``` shell
在 partition 之前，还可以对中间结果先做 combine，即将中间结果中有相同 key的 <key, value> 对合并成一对。combine 的过程与 Reduce 的过程类似，很多情况下就可以直接使用 Reduce 函数，但 combine 是作为 Map 任务的一部分，在执行完 Map 函数后紧接着执行的。Combine 能够减少中间结果中 <key, value> 对的数目，从而减少网络流量。
```

### Reduce 任务从 Map 任务结点取中间结果

Map 任务的中间结果在做完 Combine 和 Partition 之后，以文件形式存于本地磁盘。中间结果文件的位置会通知主控 JobTracker, JobTracker 再通知 Reduce 任务到哪一个 DataNode 上去取中间结果。注意所有的 Map 任务产生中间结果均按其 Key 用同一个 Hash 函数划分成了 R 份，R 个 Reduce 任务各自负责一段 Key 区间。每个 Reduce 需要向许多个 Map 任务结点取得落在其负责的 Key 区间内的中间结果，然后执行 Reduce 函数，形成一个最终的结果文件。

### 任务管道

有 R 个 Reduce 任务，就会有 R 个最终结果，很多情况下这 R 个最终结果并不需要合并成一个最终结果。因为这 R 个最终结果又可以做为另一个计算任务的输入，开始另一个并行计算任务。


## 参考文章
* https://blog.csdn.net/qq_16681169/article/details/86669454