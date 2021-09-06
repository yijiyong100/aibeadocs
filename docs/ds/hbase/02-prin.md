---
title: HBASE-原理总结
---

::: tip
本文主要是介绍 HBASE-原理总结 。
:::

[[toc]]

　HBase是一个分布式的、面向列的开源数据库，该技术来源于 Fay Chang 所撰写的Google论文“Bigtable：一个结构化数据的分布式存储系统”。就像Bigtable利用了Google文件系统（File System）所提供的分布式数据存储一样，HBase在Hadoop之上提供了类似于Bigtable的能力。HBase是Apache的Hadoop项目的子项目。HBase不同于一般的关系数据库，它是一个适合于非结构化数据存储的数据库。另一个不同的是HBase基于列的而不是基于行的模式。

## 1、Hadoop生太圈

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ds/hbase/prin-1.png')" alt="wxmp">

　　通过Hadoop生态圈，可以看到HBase的身影，可见HBase在Hadoop的生态圈是扮演这一个重要的角色那就是 实时、分布式、高维数据 的数据存储；

## 2、HBase简介

　　– HBase – Hadoop Database，是一个高可靠性、高性能、面向列、可伸缩、 实时读写的分布式数据库 

　　– 利用Hadoop HDFS作为其文件存储系统,利用Hadoop MapReduce来处理 HBase中的海量数据,利用Zookeeper作为其分布式协同服务

　　– 主要用来存储非结构化和半结构化的松散数据（列存NoSQL数据库）

## 3、HBase数据模型## 

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ds/hbase/prin-2.png')" alt="wxmp">

　　以关系型数据的思维下会感觉，上面的表格是一个5列4行的数据表格，但是在HBase中这种理解是错误的，其实在HBase中上面的表格只是一行数据；

### Row Key:

- 决定一行数据的唯一标识

- RowKey是按照字典顺序排序的。

- Row key最多只能存储64k的字节数据。

### Column Family列族（CF1、CF2、CF3） & qualifier列：

- HBase表中的每个列都归属于某个列族，列族必须作为表模式(schema) 定义的一部分预先给出。如create ‘test’, ‘course’；

- 列名以列族作为前缀，每个“列族”都可以有多个列成员(column，每个列族中可以存放几千~上千万个列)；如 CF1:q1, CF2:qw,

　　　　  新的列族成员（列）可以随后按需、动态加入，Family下面可以有多个Qualifier，所以可以简单的理解为，HBase中的列是二级列，

　　　　　也就是说Family是第一级列，Qualifier是第二级列。两个是父子关系。

- 权限控制、存储以及调优都是在列族层面进行的；

- HBase把同一列族里面的数据存储在同一目录下，由几个文件保存。

- 目前为止HBase的列族能能够很好处理最多不超过3个列族。

### Timestamp时间戳：

- 在HBase每个cell存储单元对同一份数据有多个版本，根据唯一的时间 戳来区分每个版本之间的差异，不同版本的数据按照时间倒序排序，

　　　　　最新的数据版本排在最前面。

- 时间戳的类型是64位整型。

- 时间戳可以由HBase(在数据写入时自动)赋值，此时时间戳是精确到毫 秒的当前系统时间。

- 时间戳也可以由客户显式赋值，如果应用程序要避免数据版本冲突， 就必须自己生成具有唯一性的时间戳。

### Cell单元格：

- 由行和列的坐标交叉决定；

- 单元格是有版本的（由时间戳来作为版本）；

- 单元格的内容是未解析的字节数组（Byte[]），cell中的数据是没有类型的，全部是字节码形式存贮。

``` shell
- 由{row key，column(=<family> +<qualifier>)，version}唯一确定的单元。
```
　

## 4、HBase体系架构

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ds/hbase/prin-3.png')" alt="wxmp">

### Client

- 包含访问HBase的接口并维护cache来加快对HBase的访问

### Zookeeper

- 保证任何时候，集群中只有一个master

- 存贮所有Region的寻址入口。

- 实时监控Region server的上线和下线信息。并实时通知Master

- 存储HBase的schema和table元数据

### Master

- 为Region server分配region

- 负责Region server的负载均衡

- 发现失效的Region server并重新分配其上的region

- 管理用户对table的增删改操作

### RegionServer

- Region server维护region，处理对这些region的IO请求

- Region server负责切分在运行过程中变得过大的region　

 

HLog(WAL log)：

- HLog文件就是一个普通的Hadoop Sequence File，Sequence File 的Key是 HLogKey对象，HLogKey中记录了写入数据的归属信息，除了table和 region名字外，同时还包括sequence number和timestamp，timestamp是” 写入时间”，sequence number的起始值为0，或者是最近一次存入文件系 统中sequence number。

- HLog SequeceFile的Value是HBase的KeyValue对象，即对应HFile中的 KeyValue

### Region

- HBase自动把表水平划分成多个区域(region)，每个region会保存一个表 里面某段连续的数据；每个表一开始只有一个region，随着数据不断插 入表，　region不断增大，当增大到一个阀值的时候，region就会等分会 两个新的region（裂变）；

- 当table中的行不断增多，就会有越来越多的region。这样一张完整的表 被保存在多个Regionserver上。

### Memstore 与 storefile

- 一个region由多个store组成，一个store对应一个CF（列族）

- store包括位于内存中的memstore和位于磁盘的storefile写操作先写入 memstore，当memstore中的数据达到某个阈值，

hregionserver会启动 flashcache进程写入storefile，每次写入形成单独的一个storefile

- 当storefile文件的数量增长到一定阈值后，系统会进行合并（minor、 major compaction），在合并过程中会进行版本合并和删除工作 （majar），形成更大的storefile。

- 当一个region所有storefile的大小和超过一定阈值后，会把当前的region 分割为两个，并由hmaster分配到相应的regionserver服务器，实现负载均衡。

- 客户端检索数据，先在memstore找，找不到再找storefile

- HRegion是HBase中分布式存储和负载均衡的最小单元。最小单元就表 示不同的HRegion可以分布在不同的HRegion server上。

- HRegion由一个或者多个Store组成，每个store保存一个columns family。

- 每个Strore又由一个memStore和0至多个StoreFile组成。

　　　　　　　如图：StoreFile 以HFile格式保存在HDFS上。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ds/hbase/prin-4.png')" alt="wxmp">

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ds/hbase/prin-5.png')" alt="wxmp">

## 【----------------------------】

## Hbase工作原理图

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ds/hbase/prin-6.png')" alt="wxmp">

## 数据模型

- 一个RegionServer会管理多个Region，一个表的一段键值会生成一个Region，个别情况一行数据太大也会导致同一段Region根据列族切分为不同Region。
- 每个Region包含多个Store，一个列族分为一个Store
- 一个Store只有一个MemStore,和0到多个HFile
- 一个Store有多个HFile，每次Memstore刷写都会生成一个HFile

## 角色

### Master

虽说是Master，但其实可以理解为打杂的。负责启动的时候分配Region到具体的RegionServer，Master不负责查询相关，只负责创建表、修改列族以及Region分割、合并、移动并等。所以如果Master宕机，集群仍能提供服务，只是不能做表级修改操作了。

### RegionServer

负责管理一个或多个Region，是存放Region的容器，一般来说一个服务器只有一个RegionServer，但是也允许启动多个，客户端从Zookeeper获取数据的地址后，会直接从RegionServer读取数据，不经过Master，数据的插入删除也是直接在RegionServer上进行的。

### Region

表的一部分数据，相当于关系型数据库中的一个分区，Region不能跨服务器，每个Region包含起始rowkey和结束rowkey来确定其存储的数据范围

### Zookeeper

虽然是第三方的组件，但是其重要性要超过Master。读取数据的元数据表hbase:meata的位置存储在Zookeeper上，没有Zookeeper就什么都做不了。Zookeeper负责监控RegionServer的活性，如果RegionServer死了，Zookeeper检测到后会通知Master将数据迁移到其他RegionServer。

------

## 预写日志WAL

Write-AHead Log，用来解决宕机之后的操作恢复问题。当操作到达Region的时候，HBase先将数据写入到WAL中，保存在HDFS的/hbase/.logs中。之后才会将数据写到Memstore中，如果超时，那么将其刷写到最终的HFile中，如果过程数据丢失那么就可以通过WAL来恢复，WAL中不区分Store，数据不能被直接读取和使用。
 WAL默认是开启的，可以使用下边的语句关闭：



```css
Mutation.setDurability(Durability.SKIP_WAL)
```

Put/Append/Increment/Delete都是Mutation的子类，都有setDurability。关闭WAL可以让数据导入更快一些，但是一般不建议这么做。不过有一个折中方案，一步写入WAL来实现提高写入性能；正常的WAL（同步）都是在数据来到Region时候先放入内存中，这些改动会立刻被写入WAL，就算只有一个改动也会调用HDFS接口来同步数据。而异步写入会等到条件满足的时候才写入WAL，这里主要使用hbase.regionserver.optionallogflushinterval，也就是每隔多长时间将数据写入WAL，默认1s。设置方式也是setDurability：



```css
Mutation.setDurability(Durability.ASYNC_WAL)
```

但是异步写入灭有事务保证，异步数据及时写入成功，失败的时候也会丢失，所以**除非对系统性能要求极高，对数据一致性要求不高，并且系统的性能总是出现在WAL上的时候才需要考虑异步写入**。

### 预写日志滚动机制

WAL是一个**环状滚动日志结构**。数据放入WAL时候会被写入HDFS的/hbase/.logs目录下，而超过检查时间并且数据已经持久化了，那么就会移动到/hbase/.oldlogs目录下，这个过程叫滚动。之后如果超过TTL时间，或者不需要作为恢复数据的备份了，那么数据会从/hbase.oldlogs中删除，至此一份数据在WAL的旅程就走完了。触发滚动的条件有：

- 每隔hbase.regionserver.logroll.period时间，检查WAL中数据是否已经被持久化到HDFS上了
- WAL所在的Block块快要满了
- WAL所占的空间大于等于阈值：hbase.regionserver.hlog.blocksize * hbase.regionserver.logroll.multiplier(默认0.95)

影响WAL文件从/hbase/.oldlogs完全删除的条件有：

- TTL进程：该进程保证WAL文件一致存货到hbase.master.logcleaner.ttl定义的超时时间
- replication被份机制：如果开启HBase备份机制，要保证备份集群已经不需要该WAL了。

------

## MemStore

这个过程相当于我们在打扑克的时候，抽牌之后在手上对牌进行整理的过程。有时候我们会想，既然WAL已经写到HDFS上了，为什么还要再放入MemStore中呢。这是因为HDFS是只允许数据写入和追加，而不允许数据修改，Hbase为了高性能需要保证一个Region的数据是按照数据顺序存放的。而MemStore的意义就在于现在内存中实现数据排序之后在分别写入对应的数据位置。每个Store只有一个MemStore，MemStore内部先将数据整理为LSM树结构，然后再刷写到HFile中。所以区别于正常的理解，Memstore存入内存并不是为了写入快，而且就算增加Memstore大小也不能加快写入速度，Memstore的意义是维持数据按照rowkey顺序排列而不是做一个缓存。缓存有专门的BlockCache来实现。
 另外，Memstore可以优化数据的存储，比如有些数据在插入之后马上删除了，刷写的时候就可以直接跳过该数据。LSM树是Google BigTable和Hbase的基本存储算法，注重的是**在频繁的数据改动下保持系统读取速度的稳定性**，算法的核心是尽量保证数据顺序存储到磁盘上。
 当MemStore太大达到了阀值，或者达到了耍些时间间隔阀值，会将内容刷写为HFile。

## HFile

MemStore的每一次刷写都会生成一个HFile，很多人管HFile叫做StoreFile，我们可以理解StoreFile就是HFile的抽象类。HFile是由一个个块组成的，在HBase中一个块的默认为64k，由列族上的BlockSize属性定义。HFile存储的数据如图：



<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ds/hbase/prin-7.png')" alt="wxmp">

这些块区分了不同的角色，有的块只负责存储目标块索引信息，也就是指定块的偏移值（offset）：

- Trailer：必选，存储FileInfo、DataIndex、MetaIndex
- MetaIndex：可选，存储Meta块索引信息，有Meta块才会有MetaIndex
- DataIndex：可选，存储Data块索引信息，有Data块才会有DataIndex
- FileInfo：必选，文件信息，其实也是数据存储块，存储当前文件的信息，比如最后一个Last Key，平均Key的长度（Avg Key Len）等，只有在文件关闭的时候才会写入
- Meta：可选，元数据块，也是只有在文件关闭的时候才会写入，Meta块存储了该Hfile文件的元数据信息
- Data：可选，数据块，HBase的数据就存放在这里，虽然是可选，但是很难看到没有Data块的HFile

### Data块

上述HFile中最重要的数据存储位置-Data块，其实内部也非常复杂：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ds/hbase/prin-8.png')" alt="wxmp">

Data块会在第一位存储块的类型，后边存储的是多个keyValue键值对，也就是单元格Cell的实现类。Cell是一个接口，keyValue是它的实现类。
 BlockType（块类型）随着Hbase的发展一直在增加，到目前有以下几种：

- DATA
- ENCODED_DATA
- LEAF_INDEX
- BLOOM_CHUNK
- META
- INTERMEDIATE_INDEX
- ROOT_INDEX
- FILE_INFO
- GENERAL_BOOLM_META
- DELETE_FAMILY_BLOOM_META
- TRAILER
- INDEX_V1

### KeyValue类（Cell单元）

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ds/hbase/prin-9.png')" alt="wxmp">

一个KeyValue类最后一个部分是存储的Value，前面的部分都是存储和该单元格相关的元数据信息，所以会导致有时候value很小，那么单元格大部分空间存储元数据的情况。

 因为HDFS是不可修改的，那么HBase是怎么实现怎删改查的呢？其实都是基于增加记录实现的，修改数据的的时候，增加一个记录，只是版本号比之前的大而已。当需要删除一个数据的时候，依旧会在增加一个记录，但是没有value值，他的类型为Delete，被叫做墓碑标记（Tombstone），在major compaction会完全删除。

------

## 查询定位

读取数据的时候优先从BlocakCache中找，如果没有再去Memstore和HFile，而不是我们理解的上来直接寻找Memstore。另一个与我们常规认知不同的是，san操作在扫描到包含的数据依旧会继续进行扫描，因为有些数据的墓碑标记是很之前版本分开存放的，至少扫描出的数据大于给定的条件为止，这样它才知道应该返回哪些数据，所以过滤条件的使用并不能加快san速度，只有缩小行键范围才能明显加快扫描速度。另外，scan的过程中，store会创建StoreScanner实例，会把Memstore和HFile结合起来扫描，所以并不是所说的先扫Memstore后扫HFile。

## Region定位

早期（0.96.0）版本之前是三层查询架构，这个只做了解。-ROOT- => .META. => Region 这种结构步骤为：

- 从Zookeeper查询/hbase/root-region-server节点查询-ROOT-表的RegionServer位置
- 访问-ROOT-表得到.META的RegionServer位置
- 访问.META.表得到所需行键的Region范围
- 得到具体数据的RegionServer范围，之后Scan

后来发现，上述的架构可以容纳多大17亿个Region，但实际上不可能用这么多。并且设计上允许多个.META表存在，但发现.META.一直只有一个，-ROOT-只是存了一行数据，形同虚设，并且三层架构较复杂，bug可能性更高。

 后来改为了两层架构hbase:meta => Region。将-ROOT-表去掉了，同时zk中的/hbase/root-region-server也去掉了，.META.表改为了/hbase/meta-region-server存储，并把.META.表的名字也修改为hbase:meta了。流程为：

- 客户端通过zk的/hbase/meta-region-server节点查询hbase:meta在哪个RegionServer上，
- 客户端直接访问RegionServer的hbase:meta表，查询rowkey的Region范围，以及RegionServer是哪个
- 客户端连接RegionServer获取rowkey
- 一般会将meta信息缓存，下次操作就可以直接从第二步开始了，不需要访问zk了。





## 参考文章
* https://www.cnblogs.com/raphael5200/p/5229164.html
* https://www.jianshu.com/p/e870cb4d610b