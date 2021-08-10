---
title: ES优化-精华总结
---

::: tip
本文主要是介绍 ES优化-精华总结 。
:::

[[toc]]


## 转发 让Elasticsearch飞起来!——性能优化实践干货


### 视频入门教程：

视频原文地址：链接：[让Elasticsearch飞起来!——性能优化实践干货](https://blog.csdn.net/laoyang360/article/details/85109769)


<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/es/optimize/opt-v.png')" alt="wxmp">

视频截图

## 0、题记

Elasticsearch性能优化的最终目的：用户体验`爽`。

关于爽的定义——著名产品人梁宁曾经说过“人在满足时候的状态叫做愉悦，人不被满足就会难受，就会开始寻求。如果这个人在寻求中，能立刻得到即时满足，这种感觉就是爽！”。

Elasticsearch的爽点就是：`快、准、全`!

关于Elasticsearch性能优化，阿里、腾讯、京东、携程、滴滴、58等都有过很多深入的实践总结，都是非常好的参考。本文换一个思路，基于Elasticsearch的`爽点`，进行性能优化相关探讨。

## 1、集群规划优化实践

### 1.1 基于目标数据量规划集群

在业务初期，经常被问到的问题，要几个节点的集群，内存、CPU要多大，要不要SSD？

最主要的考虑点是：你的`目标存储数据量`是多大？可以针对目标数据量反推节点多少。

### 1.2 要留出容量Buffer

注意：Elasticsearch有三个警戒水位线，磁盘使用率达到85%、90%、95%。

不同警戒水位线会有不同的应急处理策略。

这点，磁盘容量选型中要规划在内。控制在`85%之下`是合理的。

当然，也可以通过配置做调整。

### 1.3 ES集群各节点尽量不要和其他业务功能复用一台机器。

除非内存非常大。

举例：普通服务器，安装了ES+Mysql+redis，业务数据量大了之后，势必会出现内存不足等问题。

### 1.4 磁盘尽量选择SSD

Elasticsearch官方文档肯定`推荐SSD`，考虑到成本的原因。需要结合业务场景，

如果业务对写入、检索速率有较高的速率要求，建议使用SSD磁盘。

阿里的业务场景，SSD磁盘比机械硬盘的速率提升了5倍。

但要因业务场景而异。

### 1.5 内存配置要合理

官方建议：堆内存的大小是官方建议是：Min（32GB，机器内存大小/2）。

Medcl和wood大叔都有明确说过，不必要设置32/31GB那么大，建议：`热数据设置：26GB，冷数据：31GB`。

总体内存大小没有具体要求，但肯定是内容越大，检索性能越好。

经验值供参考：每天200GB+增量数据的业务场景，服务器至少要64GB内存。

除了JVM之外的预留内存要充足，否则也会经常OOM。

### 1.6 CPU核数不要太小

CPU核数是和ESThread pool关联的。和写入、检索性能都有关联。
建议：`16核+`。

### 1.7 超大量级的业务场景，可以考虑跨集群检索

除非业务量级非常大，例如：滴滴、携程的PB+的业务场景，否则基本不太需要跨集群检索。

### 1.8 集群节点个数无需奇数

ES内部维护集群通信，不是基于zookeeper的分发部署机制，所以，`无需奇数`。

但是discovery.zen.minimum_master_nodes的值要设置为：候选主节点的个数/2+1，才能有效避免脑裂。

### 1.9 节点类型优化分配

集群节点数：<=3，建议：所有节点的master：true， data：true。既是主节点也是路由节点。

集群节点数：>3, 根据业务场景需要，建议：逐步独立出Master节点和协调/路由节点。

### 1.10 建议冷热数据分离

`热数据存储SSD`和普通历史数据存储机械磁盘，物理上提高检索效率。

## 2、索引优化实践

Mysql等关系型数据库要分库、分表。Elasticserach的话也要做好充分的考虑。

### 2.1 设置多少个索引？

建议根据业务场景进行存储。

不同通道类型的数据要`分索引存储`。举例：知乎采集信息存储到知乎索引；APP采集信息存储到APP索引。

### 2.2 设置多少分片？

建议根据数据量衡量。

经验值：建议每个分片大小`不要超过30GB`。

### 2.3 分片数设置？


建议根据集群节点的个数规模，分片个数建议>=集群节点的个数。

5节点的集群，5个分片就比较合理。

注意：除非reindex操作，`分片数是不可以修改`的。

### 2.4副本数设置？

除非你对系统的健壮性有异常高的要求，比如：银行系统。可以考虑2个副本以上。

否则，1个副本足够。

注意：`副本数是可以通过配置随时修改`的。

### 2.5不要再在一个索引下创建多个type

即便你是5.X版本，考虑到未来版本升级等后续的可扩展性。

建议：一个索引对应一个type。6.x默认对应_doc，5.x你就直接对应type统一为doc。

### 2.6 按照日期规划索引

随着业务量的增加，单一索引和数据量激增给的矛盾凸显。

按照日期规划索引是必然选择。
- 好处1：可以实现历史数据秒删。很对历史索引delete即可。注意：一个索引的话需要借助delete_by_query+force_merge操作，慢且删除不彻底。
- 好处2：便于冷热数据分开管理，检索最近几天的数据，直接物理上指定对应日期的索引，速度快的一逼！

操作参考：`模板使用+rollover API使用`。

### 2.7 务必使用别名

ES不像mysql方面的更改索引名称。使用别名就是一个相对灵活的选择。

## 3、数据模型优化实践

### 3.1 不要使用默认的Mapping

默认Mapping的字段类型是系统`自动识别`的。其中：string类型默认分成：text和keyword两种类型。如果你的业务中不需要分词、检索，仅需要精确匹配，仅设置为keyword即可。

根据业务需要选择合适的类型，有利于节省空间和提升精度，如：浮点型的选择。

### 3.2 Mapping各字段的选型流程

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/es/optimize/opt-1.png')" alt="wxmp">


### 3.3 选择合理的分词器

常见的开源中文分词器包括：ik分词器、ansj分词器、hanlp分词器、结巴分词器、海量分词器、“ElasticSearch最全分词器比较及使用方法” 搜索可查看对比效果。

如果选择ik，建议使用ik_max_word。因为：粗粒度的分词结果基本包含细粒度ik_smart的结果。

### 3.4 date、long、还是keyword

根据业务需要，如果需要基于时间轴做分析，必须date类型；

如果仅需要秒级返回，建议使用`keyword`。

## 4、数据写入优化实践

### 4.1 要不要秒级响应？

Elasticsearch近实时的本质是：最快1s写入的数据可以被查询到。

如果`refresh_interval`设置为1s，势必会产生大量的segment，检索性能会受到影响。

所以，非实时的场景可以调大，设置为30s，甚至-1。

### 4.2 减少副本，提升写入性能。

写入前，副本数设置为0，

写入后，副本数设置为原来值。

### 4.3 能批量就不单条写入

批量接口为bulk，批量的大小要结合队列的大小，而队列大小和线程池大小、机器的cpu核数。

### 4.4 禁用swap

在Linux系统上，通过运行以下命令临时禁用交换：

``` shell 
sudo swapoff -a
```

## 5、检索聚合优化实战

### 5.1 禁用 wildcard模糊匹配

数据量级达到TB+甚至更高之后，wildcard在多字段组合的情况下很容易出现卡死，甚至导致集群节点`崩溃宕机`的情况。

后果不堪设想。

替代方案：

- 方案一：针对精确度要求高的方案:两套分词器结合，standard和ik结合，使用match_phrase检索。
- 方案二：针对精确度要求不高的替代方案：建议ik分词，通过match_phrase和slop结合查询。

### 5.2极小的概率使用match匹配

`中文match匹配显然结果是不准确`的。很大的业务场景会使用短语匹配“match_phrase"。

match_phrase结合合理的分词词典、词库，会使得搜索结果精确度更高，避免噪音数据。

### 5.3 结合业务场景，大量使用filter过滤器

对于不需要使用计算相关度评分的场景，无疑`filter缓存机制`会使得检索更快。

举例：过滤某邮编号码。

### 5.3控制返回字段和结果

和mysql查询一样，业务开发中，select * 操作几乎是不必须的。

同理，ES中，_source 返回全部字段也是非必须的。

要通过`_source 控制字段`的返回，只返回业务相关的字段。

网页正文content，网页快照html_content类似字段的批量返回，可能就是业务上的设计缺陷。

显然，摘要字段应该提前写入，而不是查询content后再截取处理。

### 5.4 分页深度查询和遍历

分页查询使用：from+size;

遍历使用：scroll；

并行遍历使用：`scroll+slice`。

斟酌集合业务选型使用。

### 5.5 聚合Size的合理设置

聚合结果是不精确的。除非你设置size为2的32次幂-1，否则聚合的结果是取每个分片的Top size元素后综合排序后的值。

实际业务场景要求精确反馈结果的要注意。

`尽量不要获取全量聚合结果`——从业务层面取TopN聚合结果值是非常合理的。因为的确排序靠后的结果值意义不大。

### 5.6 聚合分页合理实现

聚合结果展示的时，势必面临聚合后分页的问题，而ES官方基于性能原因不支持聚合后分页。

如果需要`聚合后分页`，需要自开发实现。包含但不限于：

- 方案一：每次取聚合结果，拿到内存中分页返回。
- 方案二：scroll结合scroll after集合redis实现。

## 6、业务优化

让Elasticsearch做它擅长的事情，很显然，它更擅长基于倒排索引进行搜索。

业务层面，用户想最快速度看到自己想要的结果，中间的“字段处理、格式化、标准化”等一堆操作，用户是不关注的。

为了让Elasticsearch更高效的检索，建议：

1）要做足“前戏”

字段抽取、倾向性分析、分类/聚类、相关性判定放在写入ES之前的ETL阶段进行；

2）“睡服”产品经理

产品经理基于各种奇葩业务场景可能会提各种无理需求。

作为技术人员，要“通知以情晓之以理”，给产品经理讲解明白搜索引擎的原理、Elasticsearch的原理，哪些能做，哪些真的“`臣妾做不到`”。

## 7、小结

实际业务开发中，公司一般要求又想`马儿不吃草，又想马儿飞快跑`。

对于Elasticsearch开发也是，硬件资源不足（cpu、内存、磁盘都爆满）几乎没有办法提升性能的。

除了检索聚合，让Elasticsearch做N多相关、不相干的工作，然后得出结论“Elastic也就那样慢，没有想像的快”。

你脑海中是否也有类似的场景浮现呢？

提供相对NB的硬件资源、做好前期的各种准备工作、让Elasticsearch`轻装上阵`，相信你的Elasticsearch也会飞起来！

来日我们再相会…

推荐阅读：
- 1、阿里：https://elasticsearch.cn/article/6171
- 2、滴滴：http://t.cn/EUNLkNU
- 3、腾讯：http://t.cn/E4y9ylL
- 4、携程：https://elasticsearch.cn/article/6205
- 5、社区：https://elasticsearch.cn/article/6202
- 6、社区：https://elasticsearch.cn/article/708
- 7、社区：https://elasticsearch.cn/article/6202



## 【----------------------------】

## Elasticsearch性能优化总结

Elasticsearch是目前大数据领域最热门的技术栈之一，经过近8年的发展，已从0.0.X版升级至6.X版本，虽然增加了很多的特性和功能，但是在主体架构上，还是没有太多的变化。下面就把我对于ES使用实践的一些经验总结一下，供大家参考；也请大家拍砖。

## 一、 硬件环境选择：

如果有条件，尽可能使用SSD硬盘， 不错的CPU。ES的厉害之处在于ES本身的分布式架构以及lucene的特性。IO的提升，会极大改进ES的速度和性能。

## 二、系统拓朴设计：

ES集群在架构拓朴时，一般都会采用Hot-Warm的架构模式，即设置3种不同类型的节点：Master节点、Hot 节点和 Warm节点。

**Master节点设置**：一般会设置３个专用的maste节点，以提供最好的弹性扩展能力。当然，必须注意discovery.zen.minimum_master_nodes 属性的设置，以防split-brain问题，使用公式设置：N/2+1(N为候选master节点数）。 该节点保持: node.data: false ; 因为master节点不参与查询、索引操作，仅负责对于集群管理，所以在CPU、内存、磁盘配置上，都可以比数据节点低很多。

**Hot节点设置**： 索引节点（写节点），同时保持近期频繁使用的索引。 属于IO和CPU密集型操作，建议使用SSD的磁盘类型，保持良好的写性能；节点的数量设置一般是大于等于3个。将节点设置为hot类型:

```shell
node.attr.box_type: hot 
```

针对index, 通过设置*index.routing.allocation.require.box_type： hot* 可以设置将索引写入hot节点。

**Warm节点设置**： 用于不经常访问的read-only索引。由于不经常访问，一般使用普通的磁盘即可。内存、CPU的配置跟Hot节点保持一致即可；节点数量一般也是大于等于3个。

当索引不再被频繁查询时，可通过*index.routing.allocation.require.box_type： warm*， 将索引标记为warm, 从而保证索引不写入hot节点，以便将SSD磁盘资源用在刀刃上。一旦设置这个属性，ES会自动将索引合并到warm节点。同时，也可以在elasticsearch.yml中设置 *index.codec: best_compression* 保证warm 节点的压缩配置

**Coordinating节点**：协调节点用于做分布式里的协调，将各分片或节点返回的数据整合后返回。在ES集群中，所有的节点都有可能是协调节点，但是，可以通过设置node.master、node.data 、 node.ingest 都为 false 来设置专门的协调节点。需要较好的CPU和较高的内存。

## 三、ES的内存设置：

由于ES构建基于lucene, 而lucene设计强大之处在于lucene能够很好的利用操作系统内存来缓存索引数据，以提供快速的查询性能。lucene的索引文件segements是存储在单文件中的，并且不可变，对于OS来说，能够很友好地将索引文件保持在cache中，以便快速访问；因此，我们很有必要将一半的物理内存留给lucene ; 另一半的物理内存留给ES（JVM heap )。所以， 在ES内存设置方面，可以遵循以下原则：

**1**. 当机器内存小于64G时，遵循通用的原则，50%给ES，50%留给lucene。

**2**. 当机器内存大于64G时，遵循以下原则：

- a. 如果主要的使用场景是全文检索, 那么建议给ES Heap分配 4~32G的内存即可；其它内存留给操作系统, 供lucene使用（segments cache), 以提供更快的查询性能。
- b. 如果主要的使用场景是聚合或排序， 并且大多数是numerics, dates, geo_points 以及not_analyzed的字符类型， 建议分配给ES Heap分配 4~32G的内存即可，其它内存留给操作系统，供lucene使用(doc values cache)，提供快速的基于文档的聚类、排序性能。
- c. 如果使用场景是聚合或排序，并且都是基于analyzed 字符数据，这时需要更多的 heap size, 建议机器上运行多ES实例，每个实例保持不超过50%的ES heap设置(但不超过32G，堆内存设置32G以下时，JVM使用对象指标压缩技巧节省空间)，50%以上留给lucene。

**3**. 禁止swap，一旦允许内存与磁盘的交换，会引起致命的性能问题。 通过： 在elasticsearch.yml 中 *bootstrap.memory_lock: true*， 以保持JVM锁定内存，保证ES的性能。

**4**. GC设置原则：

- a. 保持GC的现有设置，默认设置为：Concurrent-Mark and Sweep (CMS)，别换成G1GC，因为目前G1还有很多BUG。
- b. 保持线程池的现有设置，目前ES的线程池较1.X有了较多优化设置，保持现状即可；默认线程池大小等于CPU核心数。如果一定要改，按公式（（CPU核心数* 3）/ 2）+ 1 设置；不能超过CPU核心数的2倍；但是不建议修改默认配置，否则会对CPU造成硬伤。

## 四、 集群分片设置：

ES一旦创建好索引后，就无法调整分片的设置，而在ES中，一个分片实际上对应一个lucene 索引，而lucene索引的读写会占用很多的系统资源，因此，分片数不能设置过大；所以，在创建索引时，合理配置分片数是非常重要的。一般来说，我们遵循一些原则：

**1**. 控制每个分片占用的硬盘容量不超过ES的最大JVM的堆空间设置（一般设置不超过32G，参加上文的JVM设置原则），因此，如果索引的总容量在500G左右，那分片大小在16个左右即可；当然，最好同时考虑原则2。

**2**. 考虑一下node数量，一般一个节点有时候就是一台物理机，如果分片数过多，大大超过了节点数，很可能会导致一个节点上存在多个分片，一旦该节点故障，即使保持了1个以上的副本，同样有可能会导致数据丢失，集群无法恢复。所以， 一般都设置分片数不超过节点数的3倍。

## 五、 Mapping建模:

**1**. 尽量避免使用nested或 parent/child，能不用就不用；nested query慢， parent/child query 更慢，比nested query慢上百倍；因此能在mapping设计阶段搞定的（大宽表设计或采用比较smart的数据结构），就不要用父子关系的mapping。

**2**. 如果一定要使用nested fields，保证nested fields字段不能过多，目前ES默认限制是50。参考：

```shell
index.mapping.nested_fields.limit ：50
```

因为针对1个document, 每一个nested field, 都会生成一个独立的document, 这将使Doc数量剧增，影响查询效率，尤其是JOIN的效率。

**3**. 避免使用动态值作字段(key), 动态递增的mapping，会导致集群崩溃；同样，也需要控制字段的数量，业务中不使用的字段，就不要索引。控制索引的字段数量、mapping深度、索引字段的类型，对于ES的性能优化是重中之重。以下是ES关于字段数、mapping深度的一些默认设置：

```shell
index.mapping.nested_objects.limit :10000
index.mapping.total_fields.limit:1000
index.mapping.depth.limit: 20
```

## 六、 索引优化设置：

**1**.设置*refresh_interval* 为-1，同时设置*number_of_replicas* 为0，通过关闭refresh间隔周期，同时不设置副本来提高写性能。

**2**. 修改index_buffer_size 的设置，可以设置成百分数，也可设置成具体的大小，大小可根据集群的规模做不同的设置测试。

```shell
 indices.memory.index_buffer_size：10%（默认）
indices.memory.min_index_buffer_size： 48mb（默认）
indices.memory.max_index_buffer_size
```

**3**. 修改translog相关的设置：

- a. 控制数据从内存到硬盘的操作频率，以减少硬盘IO。可将sync_interval的时间设置大一些。

```shell
index.translog.sync_interval：5s(默认)。
```

- b. 控制tranlog数据块的大小，达到threshold大小时，才会flush到lucene索引文件。

```shell
index.translog.flush_threshold_size：512mb(默认)
```

**4**. _id字段的使用，应尽可能避免自定义_id, 以避免针对ID的版本管理；建议使用ES的默认ID生成策略或使用数字类型ID做为主键。

**5. _**all字段及_source字段的使用，应该注意场景和需要，_all字段包含了所有的索引字段，方便做全文检索，如果无此需求，可以禁用；_source存储了原始的document内容，如果没有获取原始文档数据的需求，可通过设置includes、excludes 属性来定义放入_source的字段。

**6**. 合理的配置使用index属性，analyzed 和not_analyzed，根据业务需求来控制字段是否分词或不分词。只有 groupby需求的字段，配置时就设置成not_analyzed, 以提高查询或聚类的效率。

## 七、 查询优化：

**1**. query_string 或 multi_match的查询字段越多， 查询越慢。可以在mapping阶段，利用copy_to属性将多字段的值索引到一个新字段，multi_match时，用新的字段查询。

**2**. 日期字段的查询， 尤其是用now 的查询实际上是不存在缓存的，因此， 可以从业务的角度来考虑是否一定要用now, 毕竟利用query cache 是能够大大提高查询效率的。

**3**. 查询结果集的大小不能随意设置成大得离谱的值， 如query.setSize不能设置成 Integer.MAX_VALUE， 因为ES内部需要建立一个数据结构来放指定大小的结果集数据。

**4**. 尽量避免使用script，万不得已需要使用的话，选择painless & experssions 引擎。一旦使用script查询，一定要注意控制返回，千万不要有死循环（如下错误的例子），因为ES没有脚本运行的超时控制，只要当前的脚本没执行完，该查询会一直阻塞。

```agda
如： {
    “script_fields”：{
        “test1”：{
            “lang”：“groovy”，
            “script”：“while（true）{print 'don’t use script'}”
        }
    }
}
```

**5**. 避免层级过深的聚合查询， 层级过深的group by , 会导致内存、CPU消耗，建议在服务层通过程序来组装业务，也可以通过pipeline的方式来优化。

**6**. 复用预索引数据方式来提高AGG性能：

如通过 terms aggregations 替代 range aggregations， 如要根据年龄来分组，分组目标是: 少年（14岁以下） 青年（14-28） 中年（29-50） 老年（51以上）， 可以在索引的时候设置一个age_group字段，预先将数据进行分类。从而不用按age来做range aggregations, 通过age_group字段就可以了。

**7**. Cache的设置及使用：

**a) QueryCache**: ES查询的时候，使用filter查询会使用query cache, 如果业务场景中的过滤查询比较多，建议将querycache设置大一些，以提高查询速度。

```shell
indices.queries.cache.size： 10%（默认），可设置成百分比，也可设置成具体值，如256mb。
```

当然也可以禁用查询缓存（默认是开启）， 通过index.queries.cache.enabled：false设置。

**b)** **FieldDataCache**: 在聚类或排序时，field data cache会使用频繁，因此，设置字段数据缓存的大小，在聚类或排序场景较多的情形下很有必要，可通过indices.fielddata.cache.size：30% 或具体值10GB来设置。但是如果场景或数据变更比较频繁，设置cache并不是好的做法，因为缓存加载的开销也是特别大的。

**c) ShardRequestCache**: 查询请求发起后，每个分片会将结果返回给协调节点(Coordinating Node), 由协调节点将结果整合。

如果有需求，可以设置开启; 通过设置*index.requests.cache.enable: true*来开启。

不过，shard request cache只缓存hits.total, aggregations, suggestions类型的数据，并不会缓存hits的内容。也可以通过设置*indices.requests.cache.size: 1%（默认）*来控制缓存空间大小。



## 参考文章
* https://zhuanlan.zhihu.com/p/43437056
* https://blog.csdn.net/laoyang360/article/details/85109769
