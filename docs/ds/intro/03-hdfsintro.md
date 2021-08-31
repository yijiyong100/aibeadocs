---
title: HDFS-简要介绍
---

::: tip
本文主要是介绍 HDFS-基础信息 。
:::

[[toc]]

## HDFS的基本了解

## 一.什么是HDFS
HDFS（Hadoop Distributed File System ）Hadoop 分布式文件系统。 是基于流数据模式访问和处理超大文件的需求而开发的。

HDFS思想就是分而治之再综合的过程，但是对于我们使用者来说是透明的，就像我们使用Windows的文件系统一样，只需要知道你要操作的文件的路径和名称而不需要他的每一部分存储在什么节点

## 二.HDFS的一些基本的概念

### Block：

HDFS中的存储单元是每个数据块block，HDFS默认的最基本的存储单位是64M(在Apache Hadoop中默认是64M，Cloudera Hadoop版本中默认是128M。)的数据块。和普通的文件系统相同的是，HDFS中的文件也是被分成64M一块的数据块存储的。不同的是，在HDFS中，如果一个文件大小小于一个数据块的大小，它是不需要占用整个数据块的存储空间的。

### NameNode：
元数据节点。该节点用来管理文件系统中的命名空间，是master。其将所有的为了见和文件夹的元数据保存在一个文件系统树中，这些信息在硬盘上保存为了：命名空间镜像（namespace image）以及修改日志（edit log），后面还会讲到。此外，NameNode还保存了一个文件包括哪些数据块，分布在哪些数据节点上。然而，这些信息不存放在硬盘上，而是在系统启动的时候从数据节点收集而成的。

### DataNode：
数据节点。是HDFS真正存储数据的地方。客户端（client）和元数据节点（NameNode）可以向数据节点请求写入或者读出数据块。此外，DataNode需要周期性的向元数据节点回报其存储的数据块信息。

### Secondary NameNode:
从元数据节点。从元数据节点并不是NameNode出现问题时候的备用节点，它的主要功能是周期性的将NameNode中的namespace image和edit log合并，以防log文件过大。此外，合并过后的namespace image文件也会在Secondary NameNode上保存一份，以防NameNode失败的时候，可以恢复。

### edit log：
修改日志。当文件系统客户端client进行------写------操作的时候，我们就要把这条记录放在修改日志中。在记录了修改日志后，NameNode则修改内存中的数据结构。每次写操作成功之前，edit log都会同步到文件系统中。

### fsimage：
命名空间镜像。它是内存中的元数据在硬盘上的checkpoint。当NameNode失败的时候，最新的checkpoint的元数据信息就会从fsimage加载到内存中，然后注意重新执行修改日志中的操作。而Secondary NameNode就是用来帮助元数据节点将内存中的元数据信息checkpoint到硬盘上的。

## 三.HDFS的特点



### 1.高容错和高可用性，硬件错误是常态而不是异常
HDFS 设计为运行在普通硬件(节省成本)上，所以硬件故障是很正常的。HDFS 提供文件存储副本策略，可以实现错误自检并快速自动恢复。个别硬件的损坏不影响整体数据完整性和计算任务的正常执行。横向增加一些普通的硬件(节点)，而不是纵向

### 2.流式数据访问 (一次写入，多次读取)

HDFS 主要采用流式数据读取，做批量处理而不是用户交互处理，因此 HDFS 更关注数据访问的高吞吐量。

### 3.弹性存储，支持大规模数据集

HDFS 支持大文件存储，典型的文件在 GB 甚至 TB 级别，可以支持数以千万计的大规模数据集。根据业务需要灵活的增加或者缩减存储节点。(好比淘宝平时用的节点的数量和双十一的节点数量)弹性存储的最大挑战是减小在修改存储节点时的数据震荡问题。

### 4.简单一致性模型

HDFS 文件实行一次性写、多次读的访问模式。设计为文件一经创建、写入和关闭之后就不需要再更改了，这种设计和假定简化了数据一致性问题，使高吞吐量成为可能。

### 5.移动计算而非移动数据

由于 HDFS 支持大文件存储，对于大文件来说，移动计算比移动数据的代价要低。这样也可以减少网络的拥塞和提高系统的吞吐量。

### 6.协议和接口多样性

为上层应用提供了多种接口，Http RestFul 接口、NFS 接口、Ftp 接口等等 POSIX 标准协议，另外通常会有自己的专用接口。

### 7.多样的数据管理功能

对于数据压缩、数据加密、数据缓存和存储配额等提供了多样的管理功能。
<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ds/hadoop/hdfsintro-1.png')" alt="wxmp">

HDFS 是一个主从式(Master/Slave)的体系结构。HDFS 集群中有一个 NameNode 和一些 DataNodes， NameNode 管理文件的元数据，DataNode 存储实际的数据。从用户的角度看，就像操作传统的文件系统一样，可以通过目录路径对文件执行创建、读取、删除操作。客户端联系 NameNode 来获取元数据信息，而真正的文件 I/O 是直接和 DataNode 进行交互的。

## 四.读写文件
### 1.读文件
<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ds/hadoop/hdfsintro-2.png')" alt="wxmp">

- 第一步：Client 向 NameNode 发送数据请求后，寻找数据对应的数据块的位置信息。
- 第二步：NameNode 返回文件对应的数据块元数据信息，如所属机器、数据块的 block_id、数据块的先后顺序等。
- 第三步：由 Client 与 DataNode 直接通信，读取各个 block 数据块的信息。过程为并行读取，由客户端合并数据。

### 2.写文件的过程
<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ds/hadoop/hdfsintro-3.png')" alt="wxmp">

 注意有个将更新的元数据回显给NameNode的过程
## 五.为什么HDFS可以做到高可靠性

### 1、冗余备份
数据存储在这些 HDFS 中的节点上，为了防止因为某个节点宕机而导致数据丢失，HDFS 对数据进行冗余备份，至于具体冗余多少个副本，在 dfs.replication 中配置。

### 2、跨机架副本存放
仅仅对数据进行冗余备份还不够，假设所有的备份都在一个节点上，那么该节点宕机后，数据一样会丢失，因此 HDFS 要有一个好的副本存放策略，该策略还在开发中。目前使用的是，以dfs.replication=3 为例，在同一机架的两个节点上各备份一个副本，然后在另一个机架的某个节点上再放一个副本。前者防止该机架的某个节点宕机，后者防止某个机架宕机。

### 3、心跳检测
DataNode 节点定时向 NameNode 节点发送心跳包，以确保 DataNode 没有宕机。如果宕机，会采取相应措施，比如数据副本的备份。

### 4、数据完整性检测
NameNode 在创建 HDFS 文件时，会计算每个数据的校验和并储存起来。当客户端从 DataNode 获取数据时，他会将获取的数据的校验和与之前储存的校验和进行对比。

### 5、安全模式
HDFS 启动时，会进入安全模式，此时不允许写操作。这时NameNode 会收到所有 DataNode 节点的数据块报告，在确认安全之后，系统自动退出安全模式。

### 6、核心文件备份
HDFS 的核心文件是映像文件和事务日志，如果这些文件损坏，将会导致 HDFS 不可用。系统支持对这两个文件的备份，以确保 NameNode 宕机后的恢复。

### 7、空间回收
从 HDFS 中删除的文件会首先被放入到/trash 中，/trash 文件夹中的内容是被删除文件最后的副本，该文件夹会被定时清空。该文件夹中不存在的文件就彻底不存在了。

## 六.常用备份
- 查看所有命令hdfs dfs
- 查看文件列表hdfs dfs -ls/
- 查看文件的内容hdfs dfs -cat
- 创建目录 hdfs dfs -mkdir /目录
- 删除目录 hdfs dfs -rmr /
- 下载到本地 hdfs dfs -copyToLocal /
- 上传到hdfs dfs -copyFromLocal 本地路径 hdfs路径
- 查看压缩文件内容 hdfs dfs -test 文件
- 创建文件 hdfs dfs -touchz



原文来自：https://blog.csdn.net/Teacher_du/article/details/86383508


## 参考文章
* https://www.cnblogs.com/USTC-ZCC/p/13297915.html