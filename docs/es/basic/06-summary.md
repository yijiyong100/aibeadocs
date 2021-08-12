---
title: ES-精华总结
---

::: tip
本文主要是介绍 ES-精华总结 。
:::

[[toc]]

##  ElasticSearch总结

## 更多 ElasticSearch 精彩的博客专题推荐：

https://elasticstack.blog.csdn.net/ 

Elastic 中国社区官方博客  链接地址：[Elastic 中国社区官方博客](https://elasticstack.blog.csdn.net/)

## 一  ES简介


### 1  ES简介　　

　　Elasticsearch 是一个开源的**搜索引擎**，建立在全文搜索引擎库 Apache Lucene 基础之上用 Java 编写的，它的内部使用 Lucene 做索引与搜索，但是它的目的是使全文检索变得简单， 通过隐藏 Lucene 的复杂性，取而代之的提供一套**简单一致的 RESTful API**。

　　Elasticsearch 不仅仅只是一个全文搜索引擎。 它可以被下面这样准确的形容：一个分布式的实时文档存储，每个字段可以被索引与搜索——**作数据库用**或者一个分布式实时分析搜索引擎，能胜任上百个服务节点的扩展，并支持 PB 级别的结构化或者非结构化数据。



### 2  ES的特性

　　　　（1）分布式：横向扩展非常灵活

　　　　（2）全文检索：基于lucene的强大的全文检索能力；

　　　　（3）近实时搜索和分析：数据进入ES，可达到近实时搜索，还可进行聚合分析

　　　　（4）高可用：容错机制，自动发现新的或失败的节点，重组和重新平衡数据

　　　　（5）模式自由：ES的动态mapping机制可以自动检测数据的结构和类型，创建索引并使数据可搜索。

　　　　（6）RESTful API：JSON + HTTP



### 3  ES的架构

　　<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/es/basic/sum/1626845-20190902202901568-809684224.png')" alt="wxmp">

　　（1）Gateway是ES用来存储索引的文件系统，支持多种类型，包括Local FileSystem、Shared FileSystem等。

　　（2）Gateway的上层是一个分布式的lucene框架，即Distributed Lucene Directory。

　　（3）Lucene之上是ES的模块，包括：索引模块（Index Module）、搜索模块（Search Module）、映射解析模块（Mapping）等。　　

　　（4）ES模块之上是 Discovery、Scripting和第三方插件。Discovery是ES的节点发现模块，不同机器上的ES节点要组成集群需要进行消息通信，集群内部需要选举master节点，这些工作都是由Discovery模块完成。支持多种发现机制，如 Zen 、EC2、gce、Azure。

　　　　 Scripting用来支持在查询语句中插入javascript、python等脚本语言，scripting模块负责解析这些脚本，使用脚本语句性能稍低。ES也支持多种第三方插件。

　　（5）再上层是ES的传输模块和JMX.传输模块支持多种传输协议，如 Thrift、memecached、http，默认使用http。JMX是java的管理框架，用来管理ES应用。

　　（6）最上层是ES提供给用户的接口，可以通过RESTful接口和ES集群进行交互。



### 4  ES的核心概念

　　**Near Realtime（NRT）近实时**：数据提交索引后，立马就可以搜索到。

　　**Cluster 集群**：一个集群由一个唯一的名字标识，默认为“elasticsearch”。集群名称非常重要，具有相同集群名的节点才会组成一个集群。集群名称可以在配置文件中指定。

　　**Node 节点**：存储集群的数据，参与集群的索引和搜索功能。像集群有名字，节点也有自己的名称，默认在启动时会以一个随机的UUID的前七个字符作为节点的名字，你可以为其指定任意的名字。通过集群名在网络中发现同伴组成集群。一个节点也可是集群。

　　**Index 索引**: 一个索引是一个文档的集合（等同于solr中的集合）。每个索引有唯一的名字，通过这个名字来操作它。一个集群中可以有任意多个索引。

　　**Type 类型**：指在一个索引中，可以索引不同类型的文档，如用户数据、博客数据。从6.0.0 版本起已废弃，一个索引中只存放一类数据。

　　**Document 文档**：被索引的一条数据，索引的基本信息单元，以JSON格式来表示。

　　**Shard 分片**：在创建一个索引时可以指定分成多少个分片来存储。每个分片本身也是一个功能完善且独立的“索引”，可以被放置在集群的任意节点上。分片的好处：

　　　　允许我们水平切分/扩展容量

　　　　可在多个分片上进行分布式的、并行的操作，提高系统的性能和吞吐量。

　　**注意 分片数创建索引时指定，创建后不可改了。备份数可以随时改**

　　**Replication 备份**: 一个分片可以有多个备份（副本）。备份的好处：

　　　　高可用。一个主分片挂了，副本分片就顶上去

　　　　扩展搜索的并发能力、吞吐量。搜索可以在所有的副本上并行运行。- 高并发下副本也可搜索。

　　<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/es/basic/sum/1626845-20190902204707639-2017694448.png')" alt="wxmp">

　　参考：https://www.cnblogs.com/leeSmall/p/9189078.html



## 二  索引数据结构



### 1  单词 - 文档矩阵

　　单词 - 文档矩阵是表达两者之间所具有的一种包含关系的概念模型，图3-1展示了其含义。图3-1的每列代表一个文档，每行代表一个单词，打对勾的位置代表包含关系。

　　<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/es/basic/sum/1626845-20190902210308168-1752137595.png')" alt="wxmp">

　　从纵向即文档这个维度来看，每列代表文档包含了哪些单词，比如文档1包含了词汇1和词汇4，而不包含其它单词。

　　从横向即单词这个维度来看，每行代表了哪些文档包含了某个单词。比如对于词汇1来说，文档1和文档4中出现过单词1，而其它文档不包含词汇1。矩阵中其它的行列也可作此种解读。

　　**搜索引擎的索引其实就是实现“单词-文档矩阵”的具体数据结构**。可以有不同的方式来实现上述概念模型，比如“倒排索引”、“签名文件”、“后缀树”等方式。但是各项实验数据表明，“倒排索引”是实现单词到文档映射关系的最佳实现方式，所以本章主要介绍“倒排索引”的技术细节。



### 2  倒排索引基本概念

　　1. **文档(Document)**：一般搜索引擎的处理对象是互联网网页，而文档这个概念要更宽泛些，代表以文本形式存在的存储对象，相比网页来说，涵盖更多种形式，比如Word，PDF，html，XML等不同格式的文件都可以称之为文档。再比如一封邮件，一条短信，一条微博也可以称之为文档。

　　2. **文档集合(Document Collection)**：由若干文档构成的集合称之为文档集合。比如海量的互联网网页或者说大量的电子邮件都是文档集合的具体例子。

　　3. **文档编号(Document ID)**：在搜索引擎内部，会将文档集合内每个文档赋予一个唯一的内部编号，以此编号来作为这个文档的唯一标识，这样方便内部处理，每个文档的内部编号即称之为“文档编号”，后文有时会用DocID来便捷地代表文档编号。

　　4. **单词编号(Word ID)**：与文档编号类似，搜索引擎内部以唯一的编号来表征某个单词，单词编号可以作为某个单词的唯一表征。

　　5. **倒排索引(Inverted Index)**：倒排索引是实现“单词-文档矩阵”的一种具体存储形式，通过倒排索引，可以根据单词快速获取包含这个单词的文档列表。倒排索引主要由两个部分组成：“**单词词典**”和“**倒排文件**”。

　　　　（1）**词条(Term)**：索引里面最小的存储和查询单元，对于英文来说是一个单词，对于中文来说一般指分词后的一个词。

　　　　（2）**单词词典(Lexicon)**：搜索引擎的通常索引单位是单词，单词词典是由文档集合中出现过的所有单词构成的字符串集合，单词词典内每条索引项记载单词本身的一些信息以及指向“倒排列表”的指针。

　　　　（3）**倒排列表(PostingList)**：倒排列表记载了出现过某个单词的所有文档的文档列表及单词在该文档中出现的位置信息，每条记录称为一个**倒排项(Posting)**。根据倒排列表，即可获知哪些文档包含某个单词。

　　　　（4）**倒排文件(Inverted File)**：所有单词的倒排列表往往顺序地存储在磁盘的某个文件里，这个文件即被称之为倒排文件，倒排文件是存储倒排索引的物理文件。

　　关于这些概念之间的关系，可以查看如下图：

　　　　<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/es/basic/sum/1626845-20190919213002789-264855713.png')" alt="wxmp">



### 3  倒排索引简单实例

　　假设文档集合包含五个文档，每个文档内容如图所示，在图中最左端一栏是每个文档对应的文档编号。我们的任务就是对这个文档集合建立倒排索引。

 　<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/es/basic/sum/1626845-20190902220545363-722048551.png')" alt="wxmp">

　　中文和英文等语言不同，单词之间没有明确分隔符号，所以首先要用分词系统将文档自动切分成单词序列，这样每个文档就转换为由单词序列构成的数据流。

　　为了系统后续处理方便，需要对每个不同的单词赋予唯一的单词编号，同时记录下哪些文档包含这个单词，在如此处理结束后，我们可以得到最简单的倒排索引（参考图3-4）。

　　在图3-4中，“单词ID”一栏记录了每个单词的单词编号，第二栏是对应的单词，第三栏即每个单词对应的倒排列表。比如单词“谷歌”，其单词编号为1，倒排列表为{1,2,3,4,5}，说明文档集合中每个文档都包含了这个单词。

　　<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/es/basic/sum/1626845-20190903120745544-464203958.png')" alt="wxmp">

　　　　　　　　图3-4 简单的倒排索引　　

　　之所以说上图所示倒排索引是最简单的，是因为这个索引系统只记载了哪些文档包含某个单词，而事实上，索引系统还可以记录除此之外的更多信息。

　　下图是一个相对复杂些的倒排索引，与图3-4的基本索引系统比，在单词对应的倒排列表中不仅记录了文档编号，还记载了**单词频率信息（TF）**，即这个单词在某个文档中的出现次数，之所以要记录这个信息，是因为词频信息在搜索结果排序时，计算查询和文档相似度是很重要的一个计算因子，所以将其记录在倒排列表中，以方便后续排序时进行分值计算。

　　在图3-5的例子里，单词“创始人”的单词编号为7，对应的倒排列表内容为：（3:1），其中的3代表文档编号为3的文档包含这个单词，数字1代表词频信息，即这个单词在3号文档中只出现过1次，其它单词对应的倒排列表所代表含义与此相同。

　　<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/es/basic/sum/1626845-20190903181220783-157138597.png')" alt="wxmp">

 　　　　　　　图3-5 带有单词频率信息的倒排索引

　　实用的倒排索引还可以记载更多的信息，图3-6所示索引系统除了记录文档编号和单词频率信息外，额外记载了两类信息，即每个单词对应的“文档频率信息”（对应图3-6的第三栏）以及在倒排列表中记录单词在某个文档出现的位置信息。

 　<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/es/basic/sum/1626845-20190903181804607-1390883926.png')" alt="wxmp">

　　“**文档频率信息**”代表了在文档集合中有多少个文档包含某个单词，之所以要记录这个信息，其原因与单词频率信息一样，这个信息在搜索结果排序计算中是非常重要的一个因子。而单词在某个文档中出现的位置信息并非索引系统一定要记录的，在实际的索引系统里可以包含，也可以选择不包含这个信息，之所以如此，因为这个信息对于搜索系统来说并非必需的，位置信息只有在支持“短语查询”的时候才能够派上用场。

   以单词“拉斯”为例，其单词编号为8，文档频率为2，代表整个文档集合中有两个文档包含这个单词，对应的倒排列表为：{(3;1;<4>)，(5;1;<4>)},其含义为在文档3和文档5出现过这个单词，单词频率都为1，单词“拉斯”在两个文档中的出现位置都是4，即文档中第四个单词是“拉斯”。

   图3-6所示倒排索引已经是一个非常完备的索引系统，实际搜索系统的倒排索引结构基本如此，区别无非是采取哪些具体的数据结构来实现上述逻辑结构。

   有了这个索引系统，搜索引擎可以很方便地响应用户的查询，比如用户输入查询词“Facebook”，搜索系统查找倒排索引，从中可以读出包含这个单词的文档，这些文档就是提供给用户的搜索结果，而利用单词频率信息、文档频率信息即可以对这些候选搜索结果进行排序，计算文档和查询的相似性，按照相似性得分由高到低排序输出，此即为搜索系统的部分内部流程。



### 4  单词词典

　　单词词典是倒排索引中非常重要的组成部分，它用来维护文档集合中出现过的所有单词的相关信息，同时用来记载某个单词对应的倒排列表在倒排文件中的位置信息。在支持搜索时，根据用户的查询词，去单词词典里查询，就能够获得相应的倒排列表，并以此作为后续排序的基础。

　　对于一个规模很大的文档集合来说，可能包含几十万甚至上百万的不同单词，能否快速定位某个单词，这直接影响搜索时的响应速度，所以需要高效的数据结构来对单词词典进行构建和查找，常用的数据结构包括哈希加链表结构和树形词典结构。

**（1）哈希 + 链表**

　　如下图所示，主体部分是哈希表，每个哈希表项保存一个指针，指针指向冲突链表，在冲突链表里，相同哈希值的单词形成链表结构。之所以会有冲突链表，是因为两个不同单词获得相同的哈希值，如果是这样，在哈希方法里被称做是一次冲突，可以将相同哈希值的单词存储在链表里，以供后续查找。

　　 <img class= "zoom-custom-imgs" :src="$withBase('/assets/img/es/basic/sum/1626845-20190903210933527-1016132256.png')" alt="wxmp">

　　在建立索引的过程中，词典结构也会相应地被构建出来。比如在解析一个新文档的时候，对于某个在文档中出现的单词T，首先利用哈希函数获得其哈希值，之后根据哈希值对应的哈希表项读取其中保存的指针，就找到了对应的冲突链表。如果冲突链表里已经存在这个单词，说明单词在之前解析的文档里已经出现过。如果在冲突链表里没有发现这个单词，说明该单词是首次碰到，则将其加入冲突链表里。通过这种方式，当文档集合内所有文档解析完毕时，相应的词典结构也就建立起来了。

​    在响应用户查询请求时，其过程与建立词典类似，不同点在于即使词典里没出现过某个单词，也不会添加到词典内。以图1-7为例，假设用户输入的查询请求为单词3，对这个单词进行哈希，定位到哈希表内的2号槽，从其保留的指针可以获得冲突链表，依次将单词3和冲突链表内的单词比较，发现单词3在冲突链表内，于是找到这个单词，之后可以读出这个单词对应的倒排列表来进行后续的工作，如果没有找到这个单词，说明文档集合内没有任何文档包含单词，则搜索结果为空。

**（2）树形结构**

　　B树（或者B+树）是另外一种高效查找结构，图1-8是一个 B树结构示意图。B树与哈希方式查找不同，需要字典项能够按照大小排序（数字或者字符序），而哈希方式则无须数据满足此项要求。

　　B树形成了层级查找结构，中间节点用于指出一定顺序范围的词典项目存储在哪个子树中，起到根据词典项比较大小进行导航的作用，最底层的叶子节点存储单词的地址信息，根据这个地址就可以提取出单词字符串。
　　<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/es/basic/sum/1626845-20190903211351421-1118483313.png')" alt="wxmp">



## 三  集群（Cluster）

　　ES的集群搭建很简单，不需要依赖第三方协调管理组件，自身内部就实现了集群的管理功能。ES集群由一个或多个Elasticsearch节点组成，每个节点配置相同的 **`cluster.name`** 即可加入集群，默认值为 “**elasticsearch**”。确保不同的环境中使用不同的集群名称，否则最终会导致节点加入错误的集群。

　　一个Elasticsearch服务启动实例就是一个节点（Node）。节点通过 **`node.name `**来设置节点名称，如果不设置则在启动时给节点分配一个随机通用唯一标识符作为名称。

　　Solr 和 Elasticsearch 都是比较成熟的全文搜索引擎，能完成的功能和性能也基本一样。但是 ES 本身就具有分布式的特性和易安装使用的特点，而Solr的分布式需要借助第三方来实现，例如通过使用ZooKeeper来达到分布式协调管理。



### 1  发现机制

　　ES内部是如何通过一个相同的设置 `cluster.name` 就能将不同的节点连接到同一个集群的？答案是 **`Zen Discovery`**。

　　Zen Discovery是Elasticsearch的内置默认发现模块（发现模块的职责是发现集群中的节点以及选举master节点）。它提供单播和基于文件的发现，并且可以扩展为通过插件支持云环境和其他形式的发现。

　　Zen Discovery 可以与其他模块集成，例如，节点之间的所有通信都使用**Transport**模块完成。节点使用发现机制通过Ping的方式查找其他节点。

　　Elasticsearch 默认被配置为使用单播发现，以防止节点无意中加入集群。只有在同一台机器上运行的节点才会自动组成集群。

　　如果集群的节点运行在不同的机器上，使用单播，你可以为 Elasticsearch 提供一些它应该去尝试连接的节点列表。当一个节点联系到单播列表中的成员时，它就会得到整个集群所有节点的状态，然后它会联系 master 节点，并加入集群。

　　这意味着单播列表不需要包含集群中的所有节点，它只是需要足够的节点，当一个新节点联系上其中一个并且说上话就可以了。如果你使用 master 候选节点作为单播列表，你只要列出三个就可以了。这个配置在 elasticsearch.yml 文件中：

``` shell
discovery.zen.ping.unicast.hosts:["host1","host2:port"]
```

　　节点启动后先 ping，如果 `discovery.zen.ping.unicast.hosts` 有设置，则 ping 设置中的 host，否则尝试 ping localhost 的几个端口， Elasticsearch 支持同一个主机启动多个节点，Ping 的 response 会包含该节点的基本信息以及该节点认为的 master 节点。选举开始，先从各节点认为的 master 中选，规则很简单，**按照 id 的字典序排序**，取第一个。如果各节点都没有认为的 master ，则从所有节点中选择，规则同上。

　　这里有个限制条件就是 `discovery.zen.minimum_master_nodes` ，如果节点数达不到最小值的限制，则循环上述过程，直到节点数足够可以开始选举。最后选举结果是肯定能选举出一个 master ，如果只有一个 local 节点那就选出的是自己。如果当前节点是 master ，则开始等待节点数达到 discovery.zen.minimummasternodes，然后提供服务。如果当前节点不是 master ，则尝试加入 master 。Elasticsearch 将以上服务发现以及选主的流程叫做 ZenDiscovery 。

　　由于它支持任意数目的集群（ 1- N ），所以不能像 Zookeeper 那样限制节点必须是奇数，也就无法用投票的机制来选主，而是通过一个规则，只要所有的节点都遵循同样的规则，得到的信息都是对等的，选出来的主节点肯定是一致的。但分布式系统的问题就出在信息不对等的情况，这时候很容易出现脑裂（ Split-Brain ）的问题，大多数解决方案就是设置一个 quorum 值，要求可用节点必须大于 quorum （一般是超过半数节点），才能对外提供服务。而 Elasticsearch 中，这个 quorum 的配置就是 **`discovery.zen.minimum_master_nodes`** 。



### 2  节点角色

　　每个节点既可以是 **候选主节点** 也可以是 **数据节点**，通过在配置文件 `../config/elasticsearch.yml`中设置即可，默认都为 `true`。

``` shell
node.master:true//是否候选主节点
node.data: true//是否数据节点
```

　　**数据节点**负责数据的存储和相关的操作，例如对数据进行增、删、改、查和聚合等操作，所以数据节点（data节点）对机器配置要求比较高，对CPU、内存和I/O的消耗很大。通常随着集群的扩大，需要增加更多的数据节点来提高性能和可用性。

　　**候选主节点**可以被选举为主节点（master节点），集群中只有候选主节点才有选举权和被选举权，其他节点不参与选举的工作。主节点负责创建索引、删除索引、跟踪哪些节点是群集的一部分，并决定哪些分片分配给相关的节点、追踪集群中节点的状态等，稳定的主节点对集群的健康是非常重要的。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/es/basic/sum/1626845-20190919215110825-2115847448.png')" alt="wxmp">

　　一个节点既可以是候选主节点也可以是数据节点，但是由于数据节点对CPU、内存核I/0消耗都很大，所以如果某个节点既是数据节点又是主节点，那么可能会对主节点产生影响从而对整个集群的状态产生影响。

　　因此为了提高集群的健康性，我们应该对Elasticsearch集群中的节点做好角色上的划分和隔离。可以使用几个配置较低的机器群作为候选主节点群。

　　**主节点和其他节点之间通过Ping的方式互检查，主节点负责Ping所有其他节点，判断是否有节点已经挂掉。其他节点也通过Ping的方式判断主节点是否处于可用状态。**

　　虽然对节点做了角色区分，但是用户的请求可以发往任何一个节点，并由该节点负责分发请求、收集结果等操作，而不需要主节点转发，这种节点可称之为**协调节点**，协调节点是不需要指定和配置的，集群中的任何节点都可以充当协调节点的角色。



### 3  脑裂现象

**（1）可能导致脑裂的原因**　　

　　同时如果由于网络或其他原因导致集群中选举出多个Master节点，使得数据更新时出现不一致，这种现象称之为**脑裂**，即集群中不同的节点对于master的选择出现了分歧，出现了多个master竞争。

　　“脑裂”问题可能有以下几个原因造成：

　　　　**1. 网络问题**：集群间的网络延迟导致一些节点访问不到master，认为master挂掉了从而选举出新的master，并对master上的分片和副本标红，分配新的主分片 

　　　　**2. 节点负载**：主节点的角色既为master又为data，访问量较大时可能会导致ES停止响应（假死状态）造成大面积延迟，此时其他节点得不到主节点的响应认为主节点挂掉了，会重新选取主节点。

　　　　**3. 内存回收**：主节点的角色既为master又为data，当data节点上的ES进程占用的内存较大，引发JVM的大规模内存回收，造成ES进程失去响应。

**（2）如何优化防止脑裂**　　

　　为了避免脑裂现象的发生，我们可以从原因着手通过以下几个方面来做出优化措施：

　　　　**1. 适当调大响应时间**：通过参数 **`discovery.zen.ping_timeout`**设置节点状态的响应时间，默认为3s，可以适当调大，如果master在该响应时间的范围内没有做出响应应答，判断该节点已经挂掉了。调大参数（如6s，discovery.zen.ping_timeout:6），可适当减少误判。

　　　　**2. 选举触发条件**：我们需要在候选集群中的节点的配置文件中设置参数 **`discovery.zen.munimum_master_nodes`**的值，这个参数表示在选举主节点时需要参与选举的候选主节点的节点数，默认值是1，官方建议取值 **`(master_eligibel_nodes/2)+1`**，其中 `master_eligibel_nodes`为候选主节点的个数。这样做既能防止脑裂现象的发生，也能最大限度地提升集群的高可用性，因为只要不少于discovery.zen.munimum_master_nodes个候选节点存活，选举工作就能正常进行。当小于这个值的时候，无法触发选举行为，集群无法使用，不会造成分片混乱的情况。

　　　　**3. 角色分离**即是上面我们提到的候选主节点和数据节点进行角色分离，这样可以减轻主节点的负担，防止主节点的假死状态发生，减少对主节点“已死”的误判。

　　　　候选主节点配置为：

　　　　　　node.master: true

　　　　　　node.data: false

　　　　数据节点配置为：

　　　　　　node.master: false

　　　　　　node.data: true

**（3）如何确定脑裂现象**

　　一个比较容易的方法是定时获取每一个节点/_nodes响应，它返回了集群中所有节点的状态报告，如果两个节点返回的集群状态不一样，就是一个脑裂情况发生的警示信号。

　　**curl GET http://10.10.2.111:9200/_nodes**



## 四  elasticsearch集群扩容和容灾



### 1  集群健康

　　Elasticsearch 的集群监控信息中包含了许多的统计数据，其中最为重要的一项就是集群健康，它在 status 字段中展示为 green 、 yellow 或者 red。

　　在kibana中执行：GET /_cat/health?v

``` shell
epoch      timestamp cluster   status node.total node.data shards  pri relo init unassign pending_tasks max_task_wait_time active_shards_percent
1571291441 13:50:41  jiesi-5.4 yellow          3         3   4635 2306    0    0        1             0                  -                100.0%
```

　　其中我们可以看到当前我本地的集群健康状态是yellow ，但这里问题来了，集群的健康状况是如何进行判断的呢？

``` shell
green（很健康）
    所有的主分片和副本分片都正常运行。
yellow（亚健康）
    所有的主分片都正常运行，但不是所有的副本分片都正常运行。
red（不健康）
    有主分片没能正常运行。
```



### 2 主分片和复制分片

　　分片是Elasticsearch在集群中分发数据的关键。把分片想象成数据的容器。文档存储在分片中，然后分片分配到你集群中的节点上。当ES集群扩容或缩小，Elasticsearch将会自动在节点间迁移分片，以使集群保持平衡。 分片可以是主分片(primary shard)或者是复制分片(replica shard)。

　　索引中的每个文档都属于一个单独的主分片，所以主分片的数量决定了索引最多能存储多少数据。 理论上主分片能存储的数据大小是没有限制的，限制取决于你实际的使用情况。分片的最大容量完全取决于你的使用状况：硬件存储的大小、文档的大小和复杂度、如何索引 和查询你的文档，以及你期望的响应时间。

　　复制分片只是主分片的一个副本，它可以防止硬件故障导致的数据丢失，同时可以提供读请 求，比如搜索或者从别的shard取回文档。 当索引创建完成的时候，主分片的数量就固定了，但是复制分片的数量可以随时调整。 让我们在集群中唯一一个空节点上创建一个叫做 blogs 的索引。默认情况下，一个索引被分配5个主分片，一个主分片默认只有一个复制分片。

``` shell
重点：
shard分为两种：
    1，primary shard --- 主分片
    2，replica shard --- 复制分片（或者称为备份分片或者副本分片）
```

　　需要注意的是，在业界有一个约定俗称的东西，单说一个单词shard一般指的是primary shard，而单说一个单词replica就是指的replica shard。

　　另外一个需要注意的是replica shard是相对于主分片而言的，如果说当前index有一个复制分片，那么相对于主分片来说就是每一个主分片都有一个复制分片，即如果有5个主分片就有5个复制分片，并且主分片和复制分片之间是一一对应的关系。

　　很重要的一点**：primary shard不能和自己的replica shard在同一个节点上。所以es最小的高可用配置为两台服务器。** 



### 3  扩容

　　一般的扩容模式分为两种，一种是水平扩容，一种是垂直扩容。

（1）垂直扩容：

　　所谓的垂直扩容就是升级服务器，买性能更好的，更贵的然后替换原来的服务器，这种扩容方式不推荐使用。因为单台服务器的性能总是有瓶颈的。

（2）水平扩容：

　　水平扩容也称为横向扩展，很简单就是增加服务器的数量，这种扩容方式可持续性强，将众多普通服务器组织到一起就能形成强大的计算能力。水平扩容 VS 垂直扩容用一句俗语来说再合适不过了：三个臭皮匠赛过诸葛亮。

（3）水平扩容的过程分析

　　上面我们详细介绍了分片，master和协调节点，接下来我们通过画图的方式一步步带大家看看横向扩容的过程。

首先呢需要铺垫一点关于自定义索引shard数量的操作



``` shell
PUT /student
{
    "settings" : {
       "number_of_shards" : 3,
       "number_of_replicas" : 1
    }
}
```



　　以上代码意味着我们创建的索引student将会分配三个primary shard和三个replica shard。

　　**1. 只有一台服务器** 

 　<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/es/basic/sum/1626845-20191017164647426-1654750529.png')" alt="wxmp">

　　注：P代表primary shard， R代表replica shard。

　　分析一下上面的过程，首先需要明确的两点：

　　1：primary shard和replica shard不能再同一台机器上，因为replica和shard在同一个节点上就起不到副本的作用了。

　　2：当集群中只有一个节点的时候，node1节点将成为主节点。它将临时管理集群级别的一些变更，例如新建或 删除索引、增加或移除节点等。

　　因为集群中只有一个节点，该节点将直接被选举为master节点。其次我们为student索引分配了三个shard，由于只有一个节点，所以三个primary shard都被分配到该节点，replica shard将不会被分配。此时集群的健康状况为yellow。

　　**2. 两台服务器**

　　<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/es/basic/sum/1626845-20191017165138013-307012181.png')" alt="wxmp">

　　Rebalance（再平衡），当集群中节点数量发生变化时，将会触发es集群的rebalance，即重新分配shard。Rebalance的原则就是尽量使shard在节点中分布均匀，达到负载均衡的目的。

　　原先node1节点上有p0、p1、p2三个primary shard，另外三个replica shard还未分配，当集群新增节点node2，触发集群的Rebalance，三个replica shard将被分配到node2上，即如上图所示。

　　此时集群中所有的primary shard和replica shard都是active（可用）状态的所以此时集群的健康状况为green。可见es集群的最小高可用配置就是两台服务器。

 　**3. 三台服务器**

　　<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/es/basic/sum/1626845-20191017171653647-1438974385.png')" alt="wxmp">

　　继续新增服务器，集群将再次进行Rebalance，在primary shard和replica shard不能分配到一个节点上的原则，这次rebalance同样本着使shard均匀分布的原则，将会从node1上将P1，P2两个primary shard分配到node2，node3上面，然后将node2在primary shard和replica shard不能分配到一台机器上的原则上将另外两个replica shard分配到node1和node3上面。



### 4  集群容灾

　　分布式的集群是一定要具备容灾能力的，对于es集群同样如此，那es集群是如何进行容灾的呢？

　　replica shard作为primary shard的副本当集群中的节点发生故障，replica shard将被提升为primary shard。具体的演示如下

 　<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/es/basic/sum/1626845-20191017200146536-1348263327.png')" alt="wxmp">

　　集群中有三台服务器，其中node1节点为master节点，primary shard 和 replica shard的分布如上图所示。此时假设node1发生宕机，也就是master节点发生宕机。此时集群的健康状态为red，因为不是所有的primary shard都是active的。

　　具体的容灾过程如下：

　　　　1：重新选举master节点，当es集群中的master节点发生故障，此时es集群将再次进行master的选举，选举出一个新的master节点。假设此时新的主节点为node2。

　　　　2：node2被选举为新的master节点，node2将作为master行使其分片分配的任务。

　　　　3：replica shard升级，此时master节点会寻找node1节点上的P0分片的replica shard，发现其副本在node2节点上，然后将R0提升为primary shard。这个升级过程是瞬间完成的，就像按下一个开关一样。因为每一个shard其实都是lucene的实例。此时集群如下所示，集群的健康状态为yellow，因为不是每一个replica shard都是active的：

　　<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/es/basic/sum/1626845-20191017200434938-1547886103.png')" alt="wxmp">



## 五  ES索引和分片



### 1  索引和分片的关系

　　ES支持PB级全文搜索，当索引上的数据量太大的时候，ES通过水平拆分的方式将一个索引上的数据拆分出来分配到不同的数据块上，拆分出来的数据库块称之为一个**分片**。　

　　1. 为了将数据添加到ES中，我们需要索引（index），索引是一个存储关联数据的地方。实际上，索引只是一个用来指定一个或多个分片的 "逻辑命名空间"，实际数据都是存储在索引对应的分片上。

　　2. 一个分片（shard）是一个最小级别"工作单元"，一个分片只是保存了索引中的所有数据的一部分，每个分片就是一个Lucene实例，并且它本身就是一个完整的搜索引擎。我们的文档存储在分片中，并且在分片中被索引，但是我们的应用程序不会直接与它们通信，取而代之的是，**直接与索引通信**。

　　3. 分片是ES在进群中分发数据的关键，可以把分片想象成数据的容器。文档存储在分片中，然后分片分配到集群中的节点上。当集群扩容或缩小，ES将会自动在节点间迁移分片，以使集群保持平衡。

　　4. 分片可以是主分片或者是复制分片，**索引中的每个文档属于一个单独的主分片**，所以**主分片的数量决定了索引最多能存储多少数据**。

　　5. 理论上主分片能存储的数据大小是没有限制的，限制取决于你实际的使用情况：硬件存储的大小，文档的大小和复杂度、如何索引和查询你的文档，以及你期望的响应时间

　　6. 复制分片只是主分片的一个副本，它可以防止硬件故障导致的数据丢失，同时可以提供请求，比如搜索或者从别的shard取回文档。

　　7. 在一个多分片的索引中写入数据时，通过路由来确定具体写入哪一个分片中，所以当索引创建完成的时候，主分片的数量就固定了，但是复制分片的数量可以随时调整。

　　分片的数量和下面介绍的副本数量都是可以通过创建索引时的 `settings`来配置，ES默认为一个索引创建5个主分片, 并分别为每个主分片创建一个副本。



``` shell
PUT /myIndex{   
　　"settings":{
　　　　"number_of_shards":5,
　　　　"number_of_replicas":1
　　}
}
```





### 2  副本

　　副本就是对分片的Copy，每个主分片都有一个或多个副本分片，当主分片异常时，副本可以提供数据的查询等操作。主分片和对应的副本分片是不会在同一个节点上的，所以**副本分片数的最大值是 n -1（其中n为节点数）**。

　　对文档的新建、索引和删除请求都是写操作，必须在主分片上面完成之后才能被复制到相关的副本分片，ES为了提高写入的能力这个过程是并发写的，同时为了解决并发写的过程中数据冲突的问题，ES通过乐观锁的方式控制，每个文档都有一个 _version （版本）号，当文档被修改时版本号递增。一旦所有的副本分片都报告写成功才会向协调节点报告成功，协调节点向客户端报告成功。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/es/basic/sum/1626845-20190919220537232-1510974070.png')" alt="wxmp">

　　从上图可以看出为了达到高可用，Master节点会避免将主分片和副本分片放在同一个节点上。

　　假设这时节点Node1服务宕机了或者网络不可用了，那么主节点上主分片S0也就不可用了。幸运的是还存在另外两个节点能正常工作，这时ES会重新选举新的主节点，而且这两个节点上存在我们的所需要的S0的所有数据，我们会将S0的副本分片提升为主分片，这个提升主分片的过程是瞬间发生的。此时集群的状态将会为 yellow。

　　为什么我们集群状态是 yellow 而不是 green 呢？虽然我们拥有所有的2个主分片，但是同时设置了每个主分片需要对应两份副本分片，而此时只存在一份副本分片。所以集群不能为 green 的状态。如果我们同样关闭了 Node2 ，我们的程序依然可以保持在不丢任何数据的情况下运行，因为Node3 为每一个分片都保留着一份副本。

　　如果我们重新启动Node1 ，集群可以将缺失的副本分片再次进行分配，那么集群的状态又将恢复到原来的正常状态。如果Node1依然拥有着之前的分片，它将尝试去重用它们，只不过这时Node1节点上的分片不再是主分片而是副本分片了，如果期间有更改的数据只需要从主分片上复制修改的数据文件即可。



### 3  分片的详细解说

　　1. 我们能够发送请求给集群中任意一个节点。每个节点都有能力处理任意请求。每个节点都知道任意文档所在的节点。

　　2. 新建索引和删除请求都是写操作，它们必须在主分片上成功完成才能复制到相关的复制分片上。

　　3. 在主分片和复制分片上成功新建、索引或删除一个文档必要的顺序步骤如下：

　　<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/es/basic/sum/1626845-20190903221720082-1758148564.png')" alt="wxmp">

　　　　(1) 客户端给 Node1 发送新建、索引或删除请求。

　　　　(2) 节点使用文档的 doc_id 确定文档属于主分片 P0 。转发请求到Node3，主分片 P0 位于这个节点上。

　　　　(3) Node3在主分片上执行请求，如果成功，它转发请求到相应的位于Node1和Node2的复制分片 R0 上。当所有的复制分片报告成功，Node3报告成功到请求的节点，请求的节点再报告给客户端。

　　　　(4)客户端接收到成功响应的时候，文档的修改已经被用于主分片和所有的复制分片，修改生效了。



### 4  ES分片复制

　　复制默认的值是sync。这将导致主分片得到复制分片的成功响应后才返回。

　　如果你设置replication为async，请求在主分片上被执行后就会返回给客户端。它依旧会转发给复制节点，但你将不知道复制分片执行成功与否。

　　上面的这个选项不建议使用。默认的sync复制允许ES强制反馈传输。async复制可能会因为在不等待其他分片就绪的情况下发送过多的请求而使ES过载。



## 六  ES索引过程



### 1  索引过程图解

　　写索引是只能写在主分片上，然后同步到副本分片。如果有四个主分片，一条数据ES是根据什么规则写到特定分片上的呢？这条索引数据为什么被写到S0上而不写到S1或S2上？那条数据为什么又被写到S3上而不写到S0上了？

　　首先这肯定不会是随机的，否则将来要获取文档的时候我们就不知道从何处寻找了。实际上，这个过程是根据下面这个公式决定的：

``` shell
　　shard = hash(routing) % number_of_primary_shards
```

　　routing 是一个可变值，默认是文档的 `_id` ，也可以设置成一个自定义的值。routing 通过 hash 函数生成一个数字，然后这个数字再除以 `number_of_primary_shards` （主分片的数量）后得到余数 。这个在 0 到 numberofprimary_shards-1 之间的余数，就是我们所寻求的文档所在分片的位置。

　　这就解释了为什么我们要在创建索引的时候就确定好主分片的数量并且永远不会改变这个数量：因为如果数量变化了，那么所有之前路由的值都会无效，文档也再也找不到了。

　　由于在ES集群中每个节点通过上面的计算公式都知道集群中的文档的存放位置，所以每个节点都有处理读写请求的能力。在一个写请求被发送到某个节点后，该节点即为协调节点，协调节点会根据路由公式计算出需要写到哪个分片上，再将请求转发到该分片的主分片节点上。

　　假如此时数据通过路由计算公式取余后得到的值是 shard = hash(routing) % 3 = 2，则具体流程如下：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/es/basic/sum/1626845-20190904175358917-1322374527.png')" alt="wxmp">

　　（1）api向集群发送索引请求，集群会使用负载均衡节点来处理该请求，如果没有单独的负载均衡点，master节点会充当负载均衡点的角色。

　　（2）负载均衡节点根据routing参数来计算要将该索引存储到哪个primary shard上，然后将数据给到对应的primary shard。

　　（3）对应的shard拿到数据后进行索引写入，写入成功后，将数据给到自己的replica shard。

　　（4）当replica shard也将数据成功写入后，返回成功的结果到负载均衡节点。

　　（5）此时负载均衡节点才认为数据写入成功，将成功索引的结果返回给请求的api



### 2  routing（路由）参数

**1. routing参数的指定和计算原理**

　　每个document存放在哪个shard上是由routing参数决定的，那这个参数的值是什么，ElasticSearch又是怎么通过该参数来确定存放在哪个shard上呢？

　　（1）routing参数的默认值为doc_id，也可以进行手动指定routing参数，可以是值，也可以是某个字段:

``` shell
　　PUT /index/type/id?routing=user_id 　　{　　　　"user_id":"M9472323048", 　　　　"name":"zhangsan", 　　　　"age":54 　　}
```

　　（2）ElasticSearch有个哈希算法，通过 Hash(routing) % number_of_shards算得存储到哪个shard上面去，比如上面的语句，假设Hash("M9472323048") = 23，该index含有3个shard，则存储到 23 % 3 = 2，即P2上面。shard编号取值为0 至 number_of_shards - 1。

**2. 手动指定routing和自动routing的区别**

　　routing的值默认为_id字段，_id可以保证在集群中唯一，但是有时候需要手动指定routing来优化后续的查询过程。因为routing确定，那就可以指定用哪个routing进行查询，缩减了目标结果集，减少了ElasticSearch集群的压力。

- 使用自动routing:
  - 优点: 简单，可以很均衡的分配每个shard中的文档数量，做到负载均衡
  - 缺点: 当查询一下复杂的数据时，需要到多个shard中查找，查询偏慢
- 使用手动routing:
  - 优点: 查询时指定当初入库的routing进行查询，锁定shard，直达目标，查询速度快
  - 缺点: 麻烦，要保证存储的均衡比较复杂



### 3  存储过程

**1  物理索引过程**　　

　　在es中“索引”是分片（shard）的集合，在lucene中“索引”从宏观上来说就是es中的一个分片，从微观上来说就是segment的集合。

　　<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/es/basic/sum/1626845-20191017213408588-1072569856.png')" alt="wxmp">

 

　　文档被索引的过程如上面所示，大致可以分为 内存缓冲区buffer、translog（事务日志）、filesystem cache（文件缓存系统）、系统磁盘这几个部分，接下来我们梳理一下这个过程。

　　**阶段1**：

　　　　这个阶段很简单，一个document文档第一步会同时被写进内存缓冲区buffer和translog。此时文档还不能被检索。

　　**阶段2**：

　　　　refresh：内存缓冲区的documents每隔一秒会被refresh（刷新）到filesystem cache中的一个新的segment中，segment就是索引的最小单位，此时segment将会被打开供检索。也就是说一旦文档被刷新到文件系统缓存中，其就能被检索使用了。这也是es近实时性（NRT）的关键。后面会详细介绍。

　　**阶段3**：

　　　　merge：每秒都会有新的segment生成，这将意味着用不了多久segment的数量就会爆炸，每个段都将十分消耗文件句柄、内存、和cpu资源。这将是系统无法忍受的，所以这时，我们急需将零散的segment进行合并。ES通过后台合并段解决这个问题。小段被合并成大段，再合并成更大的段。然后将新的segment打开供搜索，旧的segment删除。

　　**阶段4**：

　　　　flush：经过阶段3合并后新生成的更大的segment将会被flush到系统磁盘上。这样整个过程就完成了。但是这里留一个包袱就是flush的时机。在后面介绍translog的时候会介绍。

**2  近实时花搜索（NRT）**

　　因为 per-segment search 机制，索引和搜索一个文档之间是有延迟的。新的文档会在几分钟内可以搜索，但是这依然不够快。磁盘是瓶颈。提交一个新的段到磁盘需要 fsync 操作，确保段被物理地写入磁盘，即时电源失效也不会丢失数据。但是 fsync 是昂贵的，它不能在每个文档被索引的时就触发。

　　所以需要一种更轻量级的方式使新的文档可以被搜索，这意味这移除 fsync 。

　　位于Elasticsearch和磁盘间的是**文件系统缓存**。如前所说，在内存索引缓存中的文档被写入新的段，但是新的段首先写入文件系统缓存，这代价很低，之后会被同步到磁盘，这个代价很大。但是一旦一个文件被写入文件系统缓存，它也可以被打开和读取，就像其他文件一样。

　　在es中**每隔一秒**写入内存缓冲区的文档就会被刷新到filesystem cache中的新的segment，也就意味着可以被搜索了。这就是ES的NRT——近实时性搜索。

　　**简单介绍一下refresh API**

　　如果你遇到过你新增了doc，但是没检索到，很可能是因为还未自动进行refresh，这是你可以尝试手动刷新：

``` shell
　　POST /student/_refresh
```

　　**性能优化**

　　在这里我们需要知道一点refresh过程是很消耗性能的。如果你的系统对实时性要求不高，可以通过API控制refresh的时间间隔，但是如果你的新系统很要求实时性，那你就忍受它吧。

　　如果你对系统的实时性要求很低，我们可以调整refresh的时间间隔，调大一点将会在一定程度上提升系统的性能。

``` shell
PUT /student
{
  "settings": {
    "refresh_interval": "30s" 
  }
}
```

相关阅读：https://www.cnblogs.com/hello-shf/p/11553317.html



## 七  ES存储原理

　　上面介绍了在ES内部索引的写处理流程，这个流程是在ES的内存中执行的，数据被分配到特定的分片和副本上之后，最终是存储到磁盘上的，这样在断电的时候就不会丢失数据。具体的存储路径可在配置文件 `../config/elasticsearch.yml`中进行设置，默认存储在安装目录的data文件夹下。建议不要使用默认值，因为若ES进行了升级，则有可能导致数据全部丢失。　　　　 

``` shell
path.data:/path/to/data  //索引数据
path.logs:/path/to/logs  //日志记录
```



### 1  分段存储

　　索引文档以段的形式存储在磁盘上，何为**段**？索引文件被拆分为多个子文件，则每个子文件叫作**段**， 每一个段本身都是一个倒排索引，并且段具有不变性，一旦索引的数据被写入硬盘，就不可再修改。在底层采用了分段的存储模式，使它在读写时几乎完全避免了锁的出现，大大提升了读写性能。

　　段被写入到磁盘后会生成一个**提交点**，提交点是一个用来记录所有提交后段信息的文件。一个段一旦拥有了提交点，就说明这个段只有读的权限，失去了写的权限。相反，当段在内存中时，就只有写的权限，而不具备读数据的权限，意味着不能被检索。

　　**段**的概念提出主要是因为：在早期全文检索中为整个文档集合建立了一个很大的倒排索引，并将其写入磁盘中。如果索引有更新，就需要重新全量创建一个索引来替换原来的索引。这种方式在数据量很大时效率很低，并且由于创建一次索引的成本很高，所以对数据的更新不能过于频繁，也就不能保证时效性。

　　索引文件分段存储并且不可修改，那么新增、更新和删除如何处理呢？

- 1. 新增，新增很好处理，由于数据是新的，所以只需要对当前文档新增一个段就可以了。
- 2. 删除，由于不可修改，所以对于删除操作，不会把文档从旧的段中移除而是通过新增一个 `.del`文件，文件中会列出这些被删除文档的段信息。这个被标记删除的文档仍然可以被查询匹配到， 但它会在最终结果被返回前从结果集中移除。
- 3. 更新，不能修改旧的段来进行反映文档的更新，其实更新相当于是删除和新增这两个动作组成。会将旧的文档在 `.del`文件中标记删除，然后文档的新版本被索引到一个新的段中。可能两个版本的文档都会被一个查询匹配到，但被删除的那个旧版本文档在结果集返回前就会被移除。

　　段被设定为不可修改具有一定的优势也有一定的缺点，优势主要表现在：

- 1. 不需要锁。如果你从来不更新索引，你就不需要担心多进程同时修改数据的问题。
- 2. 一旦索引被读入内核的文件系统缓存，便会留在哪里，由于其不变性。只要文件系统缓存中还有足够的空间，那么大部分读请求会直接请求内存，而不会命中磁盘。这提供了很大的性能提升。
- 3. 其它缓存(像filter缓存)，在索引的生命周期内始终有效。它们不需要在每次数据改变时被重建，因为数据不会变化。
- 4. 写入单个大的倒排索引允许数据被压缩，减少磁盘 I/O 和 需要被缓存到内存的索引的使用量。

　　段的不变性的缺点如下：

- 1. 当对旧数据进行删除时，旧数据不会马上被删除，而是在 `.del`文件中被标记为删除。而旧数据只能等到段更新时才能被移除，这样会造成大量的空间浪费。
- 2. 若有一条数据频繁的更新，每次更新都是新增新的标记旧的，则会有大量的空间浪费。
- 3. 每次新增数据时都需要新增一个段来存储数据。当段的数量太多时，对服务器的资源例如文件句柄的消耗会非常大。
- 4. 在查询的结果中包含所有的结果集，需要排除被标记删除的旧数据，这增加了查询的负担。



### 2  延迟写策略

　　介绍完了存储的形式，那么索引是写入到磁盘的过程是这怎样的？是否是直接调 fsync 物理性地写入磁盘？

　　答案是显而易见的，如果是直接写入到磁盘上，磁盘的I/O消耗上会严重影响性能，那么当写数据量大的时候会造成ES停顿卡死，查询也无法做到快速响应。如果真是这样ES也就不会称之为**近实时**全文搜索引擎了。

　　为了提升写的性能，ES并没有每新增一条数据就增加一个段到磁盘上，而是采用**延迟写**的策略。

　　**每当有新增的数据时，就将其先写入到内存中，在内存和磁盘之间是文件系统缓存，当达到默认的时间（1秒钟）或者内存的数据达到一定量时，会触发一次刷新（Refresh），将内存中的数据生成到一个新的段上并缓存到文件缓存系统 上，稍后再被刷新到磁盘中并生成提交点**。

　　这里的内存使用的是ES的JVM内存，而文件缓存系统使用的是操作系统的内存。新的数据会继续的被写入内存，但内存中的数据并不是以段的形式存储的，因此不能提供检索功能。由内存刷新到文件缓存系统的时候会生成了新的段，并将段打开以供搜索使用，而不需要等到被刷新到磁盘。

　　在 Elasticsearch 中，写入和打开一个新段的轻量的过程叫做 **refresh** （即内存刷新到文件缓存系统）。默认情况下每个分片会每秒自动刷新一次。这就是为什么我们说 Elasticsearch 是**近实时搜索**，因为文档的变化并不是立即对搜索可见，但会在一秒之内变为可见。我们也可以手动触发 refresh， `POST/_refresh` 刷新所有索引， `POST/nba/_refresh`刷新指定的索引。

　　虽然通过延时写的策略可以减少数据往磁盘上写的次数提升了整体的写入能力，但是我们知道文件缓存系统也是内存空间，属于操作系统的内存，只要是内存都存在断电或异常情况下丢失数据的危险。

　　为了避免丢失数据，Elasticsearch添加了**事务日志（Translog）**，事务日志记录了所有还没有持久化到磁盘的数据。添加了事务日志后整个写索引的流程如下图所示。

 <img class= "zoom-custom-imgs" :src="$withBase('/assets/img/es/basic/sum/1626845-20190925213257311-1834581014.png')" alt="wxmp">

- 1. 一个新文档被索引之后，先被写入到内存中，但是为了防止数据的丢失，会追加一份数据到事务日志中。不断有新的文档被写入到内存，同时也都会记录到事务日志中。这时新数据还不能被检索和查询。
- 2. 当达到默认的刷新时间或内存中的数据达到一定量后，会触发一次 refresh，将内存中的数据以一个新段形式刷新到文件缓存系统中并清空内存。这时虽然新段未被提交到磁盘，但是可以提供文档的检索功能且不能被修改。
- 3. 随着新文档索引不断被写入，当日志数据大小超过512M或者时间超过30分钟时，会触发一次 flush。内存中的数据被写入到一个新段同时被写入到文件缓存系统，文件系统缓存中数据通过 fsync 刷新到磁盘中，生成提交点，日志文件被删除，创建一个空的新日志。



### 3  段合并

　　由于自动刷新流程每秒会创建一个新的段 ，这样会导致短时间内的段数量暴增。而段数目太多会带来较大的麻烦。每一个段都会消耗文件句柄、内存和cpu运行周期。更重要的是，每个搜索请求都必须轮流检查每个段然后合并查询结果，所以段越多，搜索也就越慢。

　　Elasticsearch通过在后台定期进行段合并来解决这个问题。小的段被合并到大的段，然后这些大的段再被合并到更大的段。段合并的时候会将那些旧的已删除文档从文件系统中清除。被删除的文档不会被拷贝到新的大段中。合并的过程中不会中断索引和搜索。

 <img class= "zoom-custom-imgs" :src="$withBase('/assets/img/es/basic/sum/1626845-20190925213603932-498631962.png')" alt="wxmp">

　　段合并在进行索引和搜索时会自动进行，合并进程选择一小部分大小相似的段，并且在后台将它们合并到更大的段中，这些段既可以是未提交的也可以是已提交的。合并结束后老的段会被删除，新的段被 flush 到磁盘，同时写入一个包含新段且排除旧的和较小的段的新提交点，新的段被打开可以用来搜索。

　　段合并的计算量庞大， 而且还要吃掉大量磁盘 I/O，段合并会拖累写入速率，如果任其发展会影响搜索性能。Elasticsearch在默认情况下会对合并流程进行资源限制，所以搜索仍然有足够的资源很好地执行。



## 八  ES使用中的坑



### 1  实时性要求高的查询走DB

　　对于ES写入机制的有了解的同学可能会知道，新增的文档会被收集到Indexing Buffer，然后写入到文件系统缓存中，到了文件系统缓存中就可以像其他的文件一样被索引到。

　　然而默认情况文档从Indexing Buffer到文件系统缓存（即Refresh操作）是每秒分片自动刷新，所以这就是我们说ES是近实时搜索而非实时的原因：文档的变化并不是立即对搜索可见，但会在一秒之内变为可见。

　　当前订单系统ES采用的是默认Refresh配置，故对于那些订单数据实时性比较高的业务，直接走数据库查询，保证数据的准确性。

　　<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/es/basic/sum/1626845-20191017122134449-65906442.png')" alt="wxmp">



### 2  避免深分页查询

　　ES集群的分页查询支持from和size参数，查询的时候，每个分片必须构造一个长度为from+size的优先队列，然后回传到网关节点，网关节点再对这些优先队列进行排序找到正确的size个文档。

　　假设在一个有6个主分片的索引中，from为10000，size为10，每个分片必须产生10010个结果，在网关节点中汇聚合并60060个结果，最终找到符合要求的10个文档。

　　由此可见，当from足够大的时候，就算不发生OOM，也会影响到CPU和带宽等，从而影响到整个集群的性能。所以应该避免深分页查询，尽量不去使用。

　　比如执行如下查询：



``` shell
 GET /student/student/_search
 {
  "query":{
     "match_all": {}
  },
   "from":5000,
   "size":10
 }
```



　　意味着 es 需要在各个分片上匹配排序并得到5010条数据，协调节点拿到这些数据再进行排序等处理，然后结果集中取最后10条数据返回。

　　我们会发现这样的深度分页将会使得效率非常低，因为我只需要查询10条数据，而es则需要执行from+size条数据然后处理后返回。

　　其次：es为了性能，限制了我们分页的深度，**es目前支持的最大的 max_result_window = 10000**；也就是说我们不能分页到10000条数据以上。 

　　参考：https://www.cnblogs.com/hello-shf/p/11543453.html

　　**深度分页之scroll**

　　在es中如果我们分页要请求大数据集或者一次请求要获取较大的数据集，scroll都是一个非常好的解决方案。

　　使用scroll滚动搜索，可以先搜索一批数据，然后下次再搜索一批数据，以此类推，直到搜索出全部的数据来。

　　scroll搜索会在第一次搜索的时候，保存一个当时的视图快照，之后只会基于该旧的视图快照提供数据搜索，如果这个期间数据变更，是不会让用户看到的。

　　每次发送scroll请求，我们还需要指定一个scroll参数，指定一个时间窗口，每次搜索请求只要在这个时间窗口内能完成就可以了。

　　一个滚屏搜索允许我们做一个初始阶段搜索并且持续批量从Elasticsearch里拉取结果直到没有结果剩下。这有点像传统数据库里的cursors（游标）。

　　滚屏搜索会及时制作快照。这个快照不会包含任何在初始阶段搜索请求后对index做的修改。它通过将旧的数据文件保存在手边，所以可以保护index的样子看起来像搜索开始时的样子。这样将使得我们无法得到用户最近的更新行为。

　　scroll的使用很简单

　　执行如下curl，每次请求两条。可以定制 scroll = 5m意味着该窗口过期时间为5分钟。



``` shell
GET /student/student/_search?scroll=5m
 {
   "query": {
     "match_all": {}
   },
   "size": 2
 }
```



　　**search_after**

　　from + size的分页方式虽然是最灵活的分页方式，但是当分页深度达到一定程度将会产生深度分页的问题。scroll能够解决深度分页的问题，但是其无法实现实时查询，即当scroll_id生成后无法查询到之后数据的变更，因为其底层原理是生成数据的快照。这时 search_after应运而生。其是在es-5.X之后才提供的。

　　search_after 是一种假分页方式，根据上一页的最后一条数据来确定下一页的位置，同时在分页请求的过程中，如果有索引数据的增删改查，这些变更也会实时的反映到游标上。为了找到每一页最后一条数据，每个文档必须有一个全局唯一值，官方推荐使用 _uid 作为全局唯一值，但是只要能表示其唯一性就可以。

　　为了演示，我们需要给上文中的student索引增加一个uid字段表示其唯一性。



``` shell
GET /student/student/_search
 {
   "query":{
      "match_all": {}
    },
    "size":2,
    "sort":[
      {
        "uid": "desc"
     }  
   ]
 }
```





### 假设返回结果如下：





``` shell
{
  "took" : 1,
  "timed_out" : false,
  "_shards" : {
    "total" : 5,
    "successful" : 5,
    "skipped" : 0,
    "failed" : 0
  },
  "hits" : {
    "total" : 6,
    "max_score" : null,
    "hits" : [
      {
        "_index" : "student",
        "_type" : "student",
        "_id" : "6",
        "_score" : null,
        "_source" : {
          "uid" : 1006,
          "name" : "dehua",
          "age" : 27,
          "class" : "3-1"
        },
        "sort" : [
        ]
      },
      {
        "_index" : "student",
        "_type" : "student",
        "_id" : "5",
        "_score" : null,
        "_source" : {
          "uid" : 1005,
          "name" : "fucheng",
          "age" : 23,
          "class" : "2-3"
        },
        "sort" : [
        ]
      }
    ]
  }
}
```



下一次分页，需要将上述分页结果集的最后一条数据的值带上。



``` shell
GET /student/student/_search
{
  "query":{
    "match_all": {}
  },
  "size":2,
  "search_after":[1005],
  "sort":[
    {
      "uid": "desc"
    }  
  ]
}
```



　　这样我们就使用search_after方式实现了分页查询。

　　<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/es/basic/sum/1626845-20191019154532619-1489151746.png')" alt="wxmp">



### 3  FieldData与Doc Values

（1）FieldData

　　线上查询出现偶尔超时的情况，通过调试查询语句，定位到是跟排序有关系。排序在es1.x版本使用的是FieldData结构，FieldData占用的是JVM Heap内存，JVM内存是有限，对于FieldData Cache会设定一个阈值。

　　如果空间不足时，使用最久未使用（LRU）算法移除FieldData，同时加载新的FieldData Cache，加载的过程需要消耗系统资源，且耗时很大。所以导致这个查询的响应时间暴涨，甚至影响整个集群的性能。针对这种问题，解决方式是采用Doc Values。

（2）Doc Values

　　Doc Values是一种列式的数据存储结构，跟FieldData很类似，但其存储位置是在Lucene文件中，即不会占用JVM Heap。随着ES版本的迭代，Doc Values比FieldData更加稳定，Doc Values在2.x起为默认设置。

　　<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/es/basic/sum/1626845-20191019141933442-1098777535.png')" alt="wxmp">

 　一方面，doc_values比fielddata慢一点，大概10-25%，但是具有更好的稳定性。

　　另一方面，doc_values写入磁盘文件中，OS Cache先进行缓存，以提升访问doc value正排索引的性能，如果OS Cache内存大小不足够放得下整个正排索引，doc value，就会将doc value的数据写入磁盘文件中。



## 九  ES写一致性保障

　　首先需要说明的一点，增删改其实都是一个写操作，所以这里的写指的是增删改三个操作。

　　这里我们所说的写一致性指的是primary shard和replica shard上数据的一致性。es API为我们提供了一个可自定的参数**consistency**。该参数可以让我们自定义处理一次增删改请求，是不是必须要求所有分片都是active的才会执行。

　　该参数可选的值有三个**：one**，**all**，**quorum**（default，默认）。

``` shell
　　one：要求我们这个写操作，只要有一个primary shard是active活跃可用的，就可以执行。
　　all：要求我们这个写操作，必须所有的primary shard和replica shard都是活跃的，才可以执行这个写操作
　　quorum：默认的值，要求所有的shard中，必须是大部分的shard都是活跃的，可用的，才可以执行这个写操作
```

　　这里着重介绍一下quorum，quorum机制，写之前必须确保大多数shard都可用，下面有个公式，当集群中的active（可用）分片数量达到如下公式结果时写操作就是可以执行的。否则该操作将无法进行：

``` shell
int( (primary + number_of_replicas) / 2 ) + 1
```

　　假设我们创建了一个student索引，并且设置primary shard为3个，replica shard有1个（这个1个是相对于索引来说的，对于主分片该数字1意味着每个primary shard都对应的存在一个副本）。也就意味着primary=3，number_of_replicas=1（依然是相对于索引）。shard总数为6。

　　此时计算上面公式可知：

``` shell
　　int((3+1)/2) + 1 = 3
```

　　也就是说当集群中可用的shard数量>=3写操作就是可以执行的。

``` shell
　　PUT /index/type/id?consistency=quorum
```

　　但是这里我们要注意一点，举例说明：比如新建一个索引，有一个主分片，一个副分片，那（1 + 1/2） + 1 = 2，那就必须要有两个节点活跃才能执行写操作，那咱们要是只有单节点集群，这就无法玩了，所以es对这种特殊情况，做了处理，就是说**当number_of_replicas>1时才生效**。

　　另外quorum不齐全时，不会立即判定写入失败，而是进入wait状态，默认1分钟，等待期间，期望活跃的shard数量可以增加，最后实在不行，就会timeout。我们其实可以在写操作的时候，加一个timeout参数，比如说

``` shell
　　put /index/type/id?timeout=30
```

　　这个就是说自己去设定quorum不齐全的时候，es的timeout时长，可以缩短，也可以增长



 

参考：

　　搜索引擎索引之索引基础　　https://blog.csdn.net/malefactor/article/details/7256305

　　E[S索引和分片](https://www.cnblogs.com/1234AAA/p/9380791.html)　　https://www.cnblogs.com/1234AAA/p/9380791.html

## 参考文章
* https://www.cnblogs.com/aiqiqi/p/11451411.html