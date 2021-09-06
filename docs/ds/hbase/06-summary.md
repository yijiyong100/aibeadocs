---
title: HBASE-精华总结
---

::: tip
本文主要是介绍 HBASE-精华总结 。
:::

[[toc]]

## 1 HBase的特点

海量存储、列式存储、极易扩展、高并发、稀疏数据、准实时查询（弥补MapReduce的离线延时）

## 2 逻辑结构和物理结构

### 2.1 逻辑结构

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ds/hbase/sum/20200401134153278.png')" alt="wxmp">

HBase表由行和列组成，每个行由`行键（row key）`来标识，列划分为若干列族，一个列族中可以包含任意多个列，同一个列族里面的数据存储在一个文件中。当这个文件达到一定大小后，会进行分裂形成多个region。当一个行键在不同的列族中都有相应的列值的话，不同列族中的文件都会存储这个行键的值。也就是说，一行可能包含多个列族，一个列族有多个列，对某一行而言，某列族文件中只存储了这一行键在列族中有值的那些列（列族可能有上百个列），没有不会存储（不存null）。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ds/hbase/sum/20200402184630991.png')" alt="wxmp">

- **RowKey**
  与 nosql 数据库们一样,RowKey 是用来检索记录的主键。访问 HBASE table 中的行，只有三种方式：
  1.通过单个 RowKey 访问

  2.通过 RowKey 的 range（正则）
  
  3.全表扫描
  RowKey 行键 (RowKey)可以是任意字符串(最大长度是 64KB，实际应用中长度一般为 10-100bytes)，在 HBASE 内部，RowKey 保存为字节数组。存储时，数据按照 RowKey 的字典序(byte order)排序存储。设计 RowKey 时，要充分排序存储这个特性，将经常一起读取的行存储放到一起。(位置相关性)
- **Column Family**
  列族：HBASE 表中的每个列，都归属于某个列族。列族是表的 schema 的一部分(而列不是)，必须在使用表之前定义。列名都以列族作为前缀。例如 courses:history，courses:math都属于 courses 这个列族。
- **Cell**
  由`{rowkey, column Family:column, version}` 唯一确定的单元。cell 中的数据是没有类型的，全部是字节码形式存贮。 关键字：无类型、字节码
- **Time Stamp**
  每个 cell 都保存着同一份数据的多个版本。版本通过时间戳来索引。时间戳的类型是 `64` 位整型。时间戳可以由 HBASE(在数据写入时自动 )赋值，此时时间戳是精确到毫秒 的当前系统时间。时间戳也可以由客户显式赋值。如果应用程序要避免数据版本冲突，就必须自己生成具有唯一性的时间戳。每个 cell 中，不同版本的数据按照时间**倒序排序，即最新的数据排在最前面**。 为了避免数据存在过多版本造成的的管理 (包括存贮和索引)负担，HBASE 提供 了两种数据版本回收方式。一是保存数据的最后 n 个版本，二是保存最近一段 时间内的版本（比如最近七天）。**用户可以针对每个列族进行设置**。在HBase中，timestamp是一个很重要的概念。它记录着往HBase进行增删改操作的时间（系统自动赋值），它的值越大，说明是这个操作就越新，通常我们从HBase得到的只是那个最新操作的结果，但是之前的操作（时间戳小的）会保留直到达到一定的版本数或者设定时间。例如：

```shell
#timestamp1<timestamp2<timestamp3
put 'student','1002','info:name','shane'#step1，timestamp1=1585836527749
put 'student','1002','info:name','shane'#step2，timestamp2=1585838153208
#那么get 'student','1002','info:name'只会得到最新的timestamp2=1585838153208的数据，即value=shane
#step1的数据在进行step2后并不会被立即删除，通过scan 'student',{RAW=>TRUE,VERSIONS=>3}可以查看同一个cell的最近的三个版本
delete 'student','1002','info:name'#step3，timestamp3=1585838197596
put 'student','1002','info:name','shane',1585838166666#step4，指定timestamp4=1585838166666
#timestamp<timestamp3,timestamp3是最新的且是delete操作，所以在scan 'student'时并不会得到1002的info:name的信息。
#但是通过scan 'student',{RAW=>TRUE,VERSIONS=>5}可以看到之前插入的信息
123456789
```

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ds/hbase/sum/202004022250062.png')" alt="wxmp">

- **命名空间**
  命名空间的结构:

- 1. `Table`：表，所有的表都是命名空间的成员，即表必属于某个命名空间，如果没有指定，则在 default 默认的命名空间中。
- 2. `RegionServer group`：一个命名空间包含了默认的 RegionServer Group。
- 3. `Permission`：权限，命名空间能够让我们来定义访问控制列表 `ACL（Access Control List）`。例如，创建表，读取表，删除，更新等等操作。
- 4. `Quota`：限额，可以强制一个命名空间可包含的 region 的数量。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ds/hbase/sum/20200402233147808.png')" alt="wxmp">

### 2.2 物理结构

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ds/hbase/sum/20200401170544601.png')" alt="wxmp">

当在t4时间put（插入）row_key1的phone数据时，原来t3的并不会马上被覆盖。当查询row_key1的phone时会返回时间戳最大的t4那一个数据（最新的）。

## 3 系统架构

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ds/hbase/sum/20200401211233504.png')" alt="wxmp">

Hbase 是由 Client、Zookeeper、Master、HRegionServer、HDFS 等几个组件组成，HBase依赖于ZooKeeper和HDFS。

- **Zookeeper** ：HBase 通过 Zookeeper 来做 **master 的高可用**（通过 Zoopkeeper 来保证集群中只有 1 个 master 在运行，如果 master 异常，会通过竞争机制产生新的 master 提供服务。）、**RegionServer 的监控**（通过 Zoopkeeper 来监控 RegionServer 的状态，当 RegionSevrer 有异常的时候，通过回调的形式通知 Master RegionServer 上下线的信息）、**元数据的入口**以及**集群配置的维护**等工作。（DML的请求通过ZK分发到HRegionServer不通过HMaster，HMaster是处理DDL的请求。HMaster宕机不会影响客户端的读写请求；但是取法进行`create 'stu4','info'`的DDL操作。当原有的Meta元数据信息改变时也无法维护。）
  
<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ds/hbase/sum/20200403182708427.png')" alt="wxmp">

- **Hmaster**： **监控 RegionServer**，**为 RegionServer 分配 Region**（维护整个集群的负载均衡，在空闲时间进行数据的负载均衡 ） ，**维护集群的元数据信息**，**处理 region 的分配或转移**（发现失效的 Region，并将失效的 Region 分配到正常的 RegionServer 上 ；当 RegionSever 失效的时候，协调对应 Hlog 的拆分）


- **HregionServer**：HregionServer 直接对接用户的读写请求，是真正的“干活”的节点。它的功能概括如下： **管理 master 为其分配的 Region**，**处理来自客户端的读写请求** ，**负责和底层 HDFS 的交互**（存储数据到 HDFS），**负责 Region 变大以后的拆分**，**负责 Storefile 的合并工作** ，**刷新缓存到HDFS**，**维护Hlog**


- **HDFS** ：为 Hbase 提供最终的底层数据存储服务，同时为HBase 提供高可用（Hlog 存储在HDFS）的支持，具体功能概括如下：**提供元数据和表数据的底层分布式存储服务**，**保证的高可靠和高可用性** （数据多副本）

- [MemStore](https://www.jianshu.com/p/396664db17be) ：内存缓存，达到一定缓存大小或者时间节点触发一次 flush，文件系统中生成新的 HFile，每次 Flush 的最小单位是 Region。每个 Column family 维护一个 MemStore。

- **Write-Ahead logs（WAL，Hlog）** ：**用来容灾**。当对 HBase 写数据的时候，数据会在内存MemStore中保留一段时间，MemStore达到一定的数据量（时间以及数据量阈值可以设定），数据再写进磁盘。但把数据保存在内存中可能有更高的概率引起数据丢失，为了解决这个问题，数据会先写在一个叫做 Write-Ahead logfile 的文件中，然后再写入内存中，所以在系统出现故障的时候，数据可以通过这个日志文件重建。 （[参考文章](https://www.jianshu.com/p/65cb8cd81f40)，[参考文章](https://www.jianshu.com/p/56b83585d8ce)）
- [Region](http://c.biancheng.net/view/6528.html) ：Hbase表的分片，HBase 表会根据 RowKey 值被切分成不同的 region 存储在 
  
  RegionServer中，在一个 RegionServer 中可以有多个不同的 region。同一个行键的 Region 不会被拆分到多个 Region 服务器上。 一个HBase表被划分成多个Region，开始只有一个Region，后台不断分裂。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ds/hbase/sum/20200401165102958.png')" alt="wxmp">

一个表中包含多个列族，一个列族一个文件存储，region的切分是横向切分的，那么包含了多个列族。

- **Meta表**：描述HBase表的表，元数据表。有了 Region 标识符，就可以唯一标识每个 Region。为了定位每个 Region 所在的位置，可以构建一张映射表。映射表的每个条目包含两项内容，一项是 **Region 标识符**，另一项是 **Region 服务器标识**。这个条目就表示 Region 和 Region 服务器之间的对应关系，从而就可以使用户知道某个 Region 存储在哪个 Region 服务器中。这个映射表包含了关于 Region 的元数据，因此也被称为“元数据表”，又名“Meta表”。使用 scan 命令可查看 Meta 表的结构，如图所示
  
<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ds/hbase/sum/20200401224315845.png')" alt="wxmp">
  
Meta 表中的每一行记录了一个 Region 的信息。RowKey 包含表名、起始行键和时间戳信息，中间用逗号隔开，第一个 Region 的起始行键为空。时间戳之后用.隔开的为分区名称的编码字符串，该信息是由前面的表名、起始行键和时间戳进行字符串编码后形成的。

  Meta 表里有一个列族 info。info 包含了三个列，分别为 Regioninfo、Server 和 Serverstartcode。Regionlnfo中记录了 Region 的详细信息，包括行键范围 StartKey 和 EndKey、列族列表和属性。
  Server 记录了管理该 Region 的 Region 服务器的地址，如 localhost:16201。Serverstartcode 记录了 Region 服务器开始托管该 Region 的时间。

  当用户表特别大时，用户表的 Region 也会非常多。Meta 表存储了这些 Region 信息，也变得非常大。Meta 表也需要划分成多个 Region，每个 Meta 分区记录一部分用户表和分区管理的情况。（有了meta表，就可以得到region和HRegionServer的对应关系，可以进行[Region定位](http://c.biancheng.net/view/6528.html)：客户端通过 ZooKeeper 获取 Meta 表（分区表）存储的地址，首先在对应的 Regionserver上获取 Meta 表的信息（meta表存在Regionserver上），得到所需的Region对应的Regionserver的信息，然后从Region 服务器上找到所需的数据）
- **Store** ：HFile 存储在 Store 中，一个 Store 对应 HBase 表中的一个列族。

- **HFile** ：这是在磁盘上保存原始数据的实际的物理文件，是实际的存储文件。StoreFile 是以 Hfile的形式存储在 HDFS 的。

- **Block Cache**：见4.2

## 4 实现原理

### 4.1 写数据流程

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ds/hbase/sum/20200403102107684.png')" alt="wxmp">

### 4.2 读数据流程

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ds/hbase/sum/20200403103919328.png')" alt="wxmp">

- 1）Client 先访问 zookeeper，从 meta 表读取 region 的位置，然后读取 meta 表中的数据。meta中又存储了用户表的 region 信息；
- 2）根据 namespace、表名和 rowkey 在 meta 表中找到对应的 region 信息；
- 3）找到这个 region 对应的 regionserver；
- 4）查找对应的 region；
- 5）先从 MemStore 找数据，如果没有，再到 BlockCache 里面读；
- 6）BlockCache 还没有，再到 StoreFile 上读(为了读取的效率)；
- 7）如果是从 StoreFile 里面读取的数据，不是直接返回给客户端，而是先写入 BlockCache，再返回给客户端。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ds/hbase/sum/20200403143124752.png')" alt="wxmp">

**Block Cache**：缓存磁盘中的数据（磁盘慢）（仅仅放内存中的数据，不放内存中的数据）。当读取`stu3,1001，info:name`的时候，如果Block Cache没有，同时读取内存和磁盘中的数据（将磁盘的数据放到block Cache，[LRU原理，缓存淘汰](https://www.cnblogs.com/Dhouse/p/8615481.html)），然后将merge(内存读取，磁盘读取)的结果返回。下图中，zhangsan在磁盘中（手动刷入），时间戳t1；lisi在内存中（默认等到一定大小或时间），时间戳t2，且t1>t2。如果是读取内存而不读取磁盘，得到的应该是lisi。而HBase通过上述的方式返回时间戳最大的那一条数据，为zhangsan。（读比写慢）

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ds/hbase/sum/20200403140021404.png')" alt="wxmp">

### 4.3 数据 flush 过程

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ds/hbase/sum/20200403112835537.png')" alt="wxmp">
（上图中，一个Region中有两个store（两个列族），在flush的时候会往hdfs的不同datanode中写入。每一个列族中的列具有高的‘查询同时性’，不同列族中的列再一次查询中不同时查询，所以可以存放在hdfs的不同DataNode节点上）
- 1）当 MemStore 数据达到阈值（默认是 128M，老版本是 64M），将数据刷到硬盘，将内存中的数据删除，同时删除 HLog 中的历史数据；
- 2）并将数据存储到 HDFS 中；
- 3）在 HLog 中做标记点。

### 4.4 数据合并拆分过程

- 1）当数据块达到 4 块，Hmaster 触发合并操作，Region 将数据块加载到本地，进行合并；
- 2）当合并的数据超过 256M，进行拆分，将拆分后的 Region 分配给不同的 HregionServer管理（一个表中的region就会被不同的HRegionServer管理，分布式存储，高可用容灾）；
- 3）当 HregionServer 宕机后，将 HregionServer 上的 hlog 拆分，然后分配给不同的 HregionServer加载，修改.META.；
- 4）注意：HLog 会同步到 HDFS。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ds/hbase/sum/20200403144835181.png')" alt="wxmp">

memstore每次刷写都会生成一个新的HFile，且同一个数据（`{namespace:table,rowkey,column family:column}`相同）的不同版本（`timestamp`）和不同类型的（`put/delete`）有可能会分布在不同的HFile中，所以查询时需要遍历所有的HFile。为了减少HFile的个数，以及清理掉过期和最后版本是（`delete`）的数据，会进行`StoreFile Compaction`合。StoreFile Compaction分为`Minor Compaction`和`Major Compaction`，前者Minor将邻近的若干个HFile合并成一个较大的HFile，但不会清理过期和删除的数据；后者Major将一个Store下的所有HFile合并成一个大的HFile，并且会清理掉过期和删除的数据。

【附录】
**META是啥？**

`META`是一种思想概念，一种抽象思维，用来描述数据的数据，比如有一张学生表，记录着学生的基本信息，我们通过表可以获取学生信息（数据），但是有时候也要得到表本身的信息数据（比如表结构信息：字段名称，字段数据类型，长度等信息），对于这种基础信息的描述，就会使用META的概念，使用META元数据来描述表本身。放到HTML中也是一样的，HTML用来描述网页信息，但是HTML自己也有一些信息（比如网页标题，网页描述，搜索关键字），这些信息也就称之为HTML META信息，并且HTML也定义了专门的META标签。

**列族是如何进行动态扩展的？**

一个列族中的所有列是保存在同一个文件的（多了会分region），当有新的列族时，在一个新的文件中存储新的列族。某keyrow如果在这个列族中有相应的列的信息，则新文件中存储rowkey和列信息，没有的话不存储（而不是null值）。

**HBase的检索支持3种方式**：
- （1） 通过单个Rowkey访问，即按照某个Rowkey键值进行get操作，这样获取唯一一条记录；
- （2） 通过Rowkey的range进行scan，即通过设置startRowKey和endRowKey，在这个范围内进行扫描。这样可以按指定的条件获取一批记录；
- （3） 全表扫描，即直接扫描整张表中所有行记录。

- 注：由于row key默认按照字典顺序升序排序，按照row key检索的效率很高

**为什么不建议用多个列族？**

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ds/hbase/sum/2020040320502416.png')" alt="wxmp">

一个列族就对应一个store，当一个表中有多个列族时，这个表拆分后的一个Region中就会有多个Store文件。如果在一些Region中有大量的数据（存着那个列族中的列的数据），而剩下的Region仅有少量的数据，那么就会生成多个的小文件。当查询rowkey的数据时，会找到某个Region，然后在那个Region中需要扫描所有的Store中的文件（有多少个列族就有多少个Store）造成效率低。当使用多个列族时，需要每个列族中的列的数据的量差不多。



### 参考文章
* https://blog.csdn.net/qq_33208851/article/details/105223419