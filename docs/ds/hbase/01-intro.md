---
title: HBASE-基础介绍
---

::: tip
本文主要是介绍 HBASE-基础知识。
:::

[[toc]]

## hbase的基本介绍

## 1. hbase的简介：

HBASE是bigTable,（源代码是Java编写）的开源版本，是Apache Hadoop的数据库，是建立在hdfs之上，被设计用来提供高可靠性，高性能、列存储、可伸缩、多版本，的Nosql的分布式数据存储系统，实现对大型数据的实时，随机的读写请求。更是弥补了hive不能低延迟、以及行级别的增删改的缺点。
- HBASE依赖于hdfs做底层的数据存储
- HBASE依赖于MapReduce做数据计算
- HBASE依赖于zookeeper做服务协调

## 2. hbase的设计思想：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ds/hbase/intro-1.png')" alt="wxmp">


- 面向列，可以实现一个近实时的查询的一个分布式的数据库。
- 索引，hbase的rowkey都是按照字典排序的
- 查询，查询机制是通过索引+布隆过滤器实现

## 3. hbase的特点：

- 它介于nosql和RDBMS之间，仅能通过主键和主键的range（范围）来检索数据。
- hbase查询数据功能很简单，依然是以key-value数据库，不支持join等复杂操作
- 不支持复杂的事务，只支持行级事务(可通过 hive 支持来实现多表 join 等复杂操作）
- 主要用来存储结构化和半结构化的松散数据。
- 无模式，每行都有一个可排序的主键和多个任意的列，列可以根据需要动态的增加，同一张表中不同的行可以有截然不同的列。

## 4. hbase中表的特点：

- **大**，一个表可以是10亿行，上百万列
- **面向列**，面向列(族)的存储和权限控制，列(簇)独立检索。（提升查询的性能）
- **稀疏**，对于空（null）的列，并不占用空间，因此，表可以设计非常稀疏
- **无严格模式**，每行都有一个可排序的主键和任意多的列，列可以根据需要动态的增加，同一张表中不同的行可以有截然不同的列。（读写的时候，都会做格式校验）

## 5. hbase中表结构的逻辑视图：

hbase以表结构的形式存储数据。表由行和列组成，列划分为若干个列簇。
  查询数据的流程：
- **表**—rowkey—列簇----列—**时间戳**
- **Rowkey**：按照字典排序
- **列簇**：包含一组列，列在插入数据时指定，列簇在建表的时候指定
- **列**：一个列簇中会有多个列，并且可以不同
- **时间戳**：每一个列的值可以存储多个版本的值，版本号就是时间戳，按照时间由近到远排序。
  
<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ds/hbase/intro-2.png')" alt="wxmp">


特点：
- RDBMS完全可以抽象成为一张二维表，表由行和列组成，有行和列确定一个唯一的值
- HBASE本质是key-value数据库，key是行键rowkey,value是所有的真实key-value的集合
- HBASE也可以抽象成为一个四维表，四维分别由行健 RowKey，列簇 Column Family，列 Column 和时间戳 Timestamp 组成。
- 一张HBASE的所有列划分为若干个列簇
- 每一个region的每一个列簇又是一个store，在hdfs的表现就是一个文件夹。

## 6. hbase具体名词解释：

### **行键（rowkey）**：
  与Nosql数据库一样，rowkey是用于检索记录的主键，rowkey 行键可以是任意字符串(最大长度是 64KB，实际应用中长度一般为 10-100bytes)，最好是16。在 HBase 内部，rowkey 保存为字节数组，HBase 会对表中的数据按照 rowkey 排序 (字典顺序)
  访问HBASE table中的行。只有三种方式：
- 通过单个rowkey访问
- 通过rowkey的range（范围）
- 全表扫描

### **列簇**：
  HBASE表中的每一个列，都归属于某个列簇。列簇是表的Schema 的一部分(而列不是)，必须 在使用表之前定义好，而且定义好了之后就不能更改。列名都是以列簇为前缀，访问控制、磁盘和内存的使用统计等都是在列簇层面进行的。
  注意：列簇越多，在取一行数据时所要参与 IO、搜寻的文件就越多，所以，如果没有必要，不要 设置太多的列簇（最好就一个列簇）。
### **时间戳**：
  在HBASE中通过rowkey 和 columns 确定的为一个存储单元称为 cell。每一个cell都保存着同一份数据的多个版本。版本通过时间戳来索引。时间戳的类型是 64 位整型。时间戳可以由 hbase(在数据写入时自动)赋值，此时时间戳是精确到毫秒的当前系统时间。每个 cell 中，不同版本的数据按照时间倒序排序，即最新的数据排在最前面。

 为了避免数据存在过多版本造成的管理负担，HBASE提供了两种数据版本的回收方式：
- 保存数据的最后n个版本（个数）
- 保存最近一段是时间内的版本（设置数据的生命周期 TTL）
### **单元格**：
``` shell
  在HBASE中通过rowkey 和 columns 确定的为一个存储单元称为 cell。由{rowkey,column(=<family>+< column>),version}组成一个cellCell中的数据是没有类型的，全是字节码形式存储。
```

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ds/hbase/intro-3.png')" alt="wxmp">


## 7. hbase与hive的比较：

### **相同点**：

- HBASE和hive都是架构在hadoop之上，用hdfs做底层的数据存储。用MapReduce做数据计算。


### **不同点**：
- hive是建立在hadoop之上的，为了减低Mapreduce编程的复杂度，而hbase是为了弥补hadoop对实时操作的缺陷
- Hive的表示纯逻辑表，因为hive本身并不能做数据存储和计算，而是完全依赖于hadoop，hbaseHBASE是物理表，提供了一张超大的内存 Hash 表来存储索引，方便查询。
- Hive是数据仓库，需要全表扫描，就用hive，hive是文件存储，HBase 是数据库，需要索引访问，则用 HBase，因为 HBase 是面向列的 NoSQL 数据库
- Hive 不支持单行记录操作，数据处理依靠 MapReduce，操作延时高；HBase 支持单行记录的 CRUD，并且是实时处理，效率比 Hive 高得多

## 【----------------------------】


## Apache HBase

### 1.Hbase起源

HBase是一个开源的非关系型分布式数据库，它参考了谷歌的BigTable建模，实现的编程语言为Java。它是Apache软件基金会的Hadoop项目的一部分，运行于HDFS文件系统之上，为 Hadoop 提供类似于BigTable 规模的服务。因此，它可以容错地存储海量稀疏的数据。

HBase是一个高可靠、高性能、**面向列**、可伸缩的分布式数据库，是谷歌BigTable的开源实现，主要用来存储非结构化和半结构化的松散数据。HBase的目标是处理非常庞大的表，可以通过水平扩展的方式，利用廉价计算机集群处理由超过10亿行数据和数百万列元素组成的数据表。

#### 1.1 关系数据库已经流行很多年，并且Hadoop已经有了HDFS和MapReduce，为什么需要HBase?

- Hadoop可以很好地解决大规模数据的离线批量处理问题，但是，受限于HadoopMapReduce编程框架的高延迟数据处理机制，使得Hadoop无法满足**大规模数据实时处理应用**的需求。
- HDFS面向批量访问模式，**不是随机访问模式。**
- 传统的通用关系型数据库无法应对在数据规模剧增时导致的系统扩展性和性能问题（分库分表也不能很好解决）。
- 传统关系数据库在数据结构变化时一般需要停机维护；空列浪费存储空间。

#### 1.2HBase与传统的关系数据库的区别主要体现在以下几个方面：

- 1、数据类型：关系数据库采用关系模型，具有丰富的数据类型和存储方式，HBase则采用了更加简单的数据模型，**它把数据存储为未经解释的字符串。**
- 2、数据操作：关系数据库中包含了丰富的操作，其中会涉及复杂的多表连接。**HBase操作则不存在复杂的表与表之间的关系，只有简单的插入、查询、删除、清空等**，因为HBase在设计上就避免了复杂的表和表之间的关系。
- 3、存储模式：关系数据库是基于行模式存储的。HBase是**基于列存储的**，每个列族都由几个文件保存，不同列族的文件是分离的。
- 4、数据索引：关系数据库通常可以针对不同列构建复杂的多个索引，以提高数据访问性能。**HBase只有一个索引——行键**，通过巧妙的设计，HBase中的所有访问方法，或者通过行键访问，或者通过行键扫描，从而使得整个系统不会慢下来。
- 5、数据维护：在关系数据库中，更新操作会用最新的当前值去替换记录中原来的旧值，旧值被覆盖后就不会存在。**而在HBase中执行更新操作时，并不会删除数据旧的版本，而是生成一个新的版本，旧有的版本仍然保留。**
- 6、可伸缩性：关系数据库很难实现横向扩展，纵向扩展的空间也比较有限。相反，HBase和BigTable这些分布式数据库就是为了实现灵活的**水平扩展**而开发的，能够轻易地通过在集群中增加或者减少硬件数量来实现性能的伸缩。

### 2.Hbase访问接口

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ds/hbase/intro2-1.png')" alt="wxmp">


image.png

### 3.Hbase数据模型

Hbase是一个稀疏、多维度、排序的映射表，这张表的索引是行键、列族、列限定符和时间戳。

- 每个值是一个未经解释的字符串，没有数据类型。用户在表中存储数据，每一行都有一个可排序的行键和任意多的列。
- 表在水平方向由一个或多个列族组成，一个列族中可以包含任意多个列，同一个列族里面的数据存储在一起。
- 列族支持动态扩展，可以很轻松地添加一个列族或列，无需预先定义列的数量以及类型，所有列均以字符串形式存储，用户需要自行进行数据类型转换。
- HBase中执行更新操作时，并不会删除数据旧的版本，而是生成一个新的版本，旧的版本仍然保留（这是和HDFS只允许追加不允许修改的特性相关的）

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ds/hbase/intro2-2.png')" alt="wxmp">


图片.png

下面对上图的一个具体解释：

表：HBase采用表来组织数据，表由行和列组成，列划分为若干列族。

行：每个HBase表都由若干行组成，每个行由行键（row key）来标识。

列族：一个HBase表被分组成许多“列族”（Column Family）的集合，它是基本的访问控制单元。

列限定符：列族里的数据通过限定符（或列）来定位。

单元格：在HBase表中，通过行、列族和列限定符确定一个“单元格”（cell），单元格中存储的数据没有数据类型，总被视为字节数组byte[]

时间戳：每个单元格都保存着同一份数据的多个版本，这些版本采用时间戳进行索引。

### 4.Hbase的实现原理

HBase的实现包括三个主要的功能组件：

- 1、库函数：链接到每个客户端
- 2、一个Master主服务器
- 3、许多个Region服务器

主服务器Master负责管理和维护Hbase表的分区信息，维护Region服务器列表，分配Region，负载均衡。

Region服务器负责存储和维护分配给自己的Region，处理来自客户端的读写请求。

客户端并不是直接从Master主服务器上读取数据，而是在获得Region的存储位置信息后，直接从Region服务器上读取数据。

客户端并不依赖Master，而是通过Zookeeper来Region位置信息，大多数客户端甚至从来不和Master通信，这种设计方式使得Master负载很小。

#### 4.1表和Region

一个HBase表被划分成多个Region。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ds/hbase/intro2-3.png')" alt="wxmp">


图片.png

开始只有一个Region，后台不断分裂。Region拆分操作非常快，接近瞬间，因为拆分之后Region读取的仍然是原存储文件，直到“合并”过程把存储文件异步地写到独立的文件之后，才会读取新文件。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ds/hbase/intro2-4.png')" alt="wxmp">


图片.png

#### 4.2Region的定位

元数据表，又名.META.表，存储了Region和Region服务器的映射关系。当HBase表很大时， .META.表也会被分裂成多个Region

根数据表，又名-ROOT-表，记录所有元数据的具体位置，-ROOT-表只有唯一一个Region，名字是在程序中被写死的。Zookeeper文件记录了-ROOT-表的位置

Hbase的三层结构图如下：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ds/hbase/intro2-5.png')" alt="wxmp">


图片.png

客户端访问数据时的“三级寻址”：

- 为了加速寻址，客户端会缓存位置信息，同时，需要解决缓存失效问题。
- 寻址过程客户端只需要询问Zookeeper服务器，不需要连接Master服务器。

### 5.Hbase系统架构

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ds/hbase/intro2-6.png')" alt="wxmp">


图片.png

**客户端**

客户端包含访问Hbase的接口，同时在缓存中维护着已经访问过的Region位置信息，用来加快后续数据访问过程。

**Zookeeper服务器**

Zookeeper可以帮助选举出一个Master作为集群的总管，并保证在任何时刻总有唯一一个Master在运行，这就避免了Master的“单点失效”的问题。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ds/hbase/intro2-7.png')" alt="wxmp">


图片.png

**Master服务器**

主服务器Master主要负责表和Region的管理工作：

- 管理用户对表的增加、删除、修改、查询等操作
- 实现不同Region服务器之间的负载均衡
- 在Region分裂或合并后，负责重新调整Region的分布
- 对发生故障失效的Region服务器上Region进行迁移

**Region服务器**

Region服务器是Hbase中最核心的模块，负责维护分配给自己的Region，并响应用户的读写请求。

#### 5.1Region服务器工作原理

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ds/hbase/intro2-8.png')" alt="wxmp">


图片.png

Region服务器向HDFS文件系统中读写数据过程：

- 1、用户读写数据过程
  - 用户写入数据时，被分配到相应Region服务器去执行
  - 用户数据首先被写入到MEMStore和Hlog中
  - 只有当操作写入Hlog之后，commit()调用才会将其返回给客户端
  - 当用户读取数据时，Region服务器首先访问MEMStore缓存，如果找不到，再去磁盘上面的StoreFile中寻找
- 2、缓存的刷新
  - 系统会周期性地把MemStore缓存里的内容刷写到磁盘的StoreFile文件中，清空缓存，并在Hlog里面写入一个标记
  - 每次刷写都生成一个新的StoreFile文件，因此，每个Store包含多个StoreFile文件
  - 每个Region服务器都有一个自己的HLog 文件，每次启动都检查该文件，确认最近一次执行缓存刷新操作之后是否发生新的写入操作；如果发现更新，则先写入MemStore，再刷写到StoreFile，最后删除旧的Hlog文件，开始为用户提供服务。
- 3、StoreFile的合并
  - 每次刷写都生成一个新的StoreFile，数量太多，影响查找速度、
  - 调用Store.compact()把多个合并成一个
  - 合并操作比较耗费资源，只有数量达到一个阈值才启动合并

### 6.在Hbase之上构建SQL引擎

NoSQL区别于关系型数据库的一点就是NoSQL不使用SQL作为查询语言，至于为何在NoSQL数据存储HBase上提供SQL接口，有如下原因：

- 1、易使用。使用诸如SQL这样易于理解的语言，使人们能够更加轻松地使用Hasee。
- 2、减少编码。使用诸如SQL这样更高层次的语言来编写，减少了编写的代码量。

解决方案：Hive整合HBase

Hive与HBase的整合功能从Hive0.6.0版本已经开始出现，利用两者对外的API接口互相通信，通信主要依靠hive_hbase-handler.jar工具包(Hive
 Storage Handlers)。由于HBase有一次比较大的版本变动，所以并不是每个版本的Hive都能和现有的HBase版本进行整合，所以在使用过程中特别注意的就是两者版本的一致性。

### 7.构建Hbase二级索引

HBase只有一个针对行键的索引，访问Hbase表中的行，只有三种方式：

- 通过单个行键访问
- 通过一个行键的区间来访问
- 全表扫描

使用其他产品为Hbase行键提供索引功能：

- Hindex二级索引
- Hbase+Redis
- Hbase+solr



## 参考文章
* https://blog.51cto.com/u_14048416/2342799
* https://www.jianshu.com/p/53864dc3f7b4