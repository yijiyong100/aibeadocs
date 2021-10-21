(window.webpackJsonp=window.webpackJsonp||[]).push([[518],{1034:function(a,s,t){"use strict";t.r(s);var e=t(53),r=Object(e.a)({},(function(){var a=this,s=a.$createElement,t=a._self._c||s;return t("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[t("div",{staticClass:"custom-block tip"},[t("p",{staticClass:"custom-block-title"},[a._v("TIP")]),a._v(" "),t("p",[a._v("本文主要是介绍 ES优化-优化原则和方法 。")])]),a._v(" "),t("p"),t("div",{staticClass:"table-of-contents"},[t("ul",[t("li",[t("a",{attrs:{href:"#es的性能优化"}},[a._v("ES的性能优化")]),t("ul",[t("li",[t("a",{attrs:{href:"#_1、减少字段"}},[a._v("1、减少字段")])]),t("li",[t("a",{attrs:{href:"#_2、数据预热"}},[a._v("2、数据预热")])]),t("li",[t("a",{attrs:{href:"#_3、冷热分离"}},[a._v("3、冷热分离")])])])]),t("li",[t("a",{attrs:{href:"#【-】"}},[a._v("【----------------------------】")])]),t("li",[t("a",{attrs:{href:"#elasticsearch三个重要的优化"}},[a._v("elasticsearch三个重要的优化")]),t("ul",[t("li",[t("a",{attrs:{href:"#_1、内存优化"}},[a._v("1、内存优化")])])])]),t("li",[t("a",{attrs:{href:"#_2、合理配置主节点和数据节点"}},[a._v("2、合理配置主节点和数据节点")]),t("ul",[t("li",[t("a",{attrs:{href:"#_3、设置合理的刷新时间"}},[a._v("3、设置合理的刷新时间")])])])]),t("li",[t("a",{attrs:{href:"#【-】"}},[a._v("【----------------------------】")])]),t("li",[t("a",{attrs:{href:"#漫谈elasticsearch关于es性能调优几件必须知道的事-转"}},[a._v("漫谈ElasticSearch关于ES性能调优几件必须知道的事(转)")])]),t("li",[t("a",{attrs:{href:"#关于lucene"}},[a._v("关于Lucene")])]),t("li",[t("a",{attrs:{href:"#回到elasticsearch-es的架构遵循的设计理念有以下几个特征"}},[a._v("回到ElasticSearch，ES的架构遵循的设计理念有以下几个特征")]),t("ul",[t("li",[t("a",{attrs:{href:"#一-分片策略"}},[a._v("（一）分片策略")])]),t("li",[t("a",{attrs:{href:"#二-路由优化"}},[a._v("（二）路由优化")])]),t("li",[t("a",{attrs:{href:"#三-es上的gc调优"}},[a._v("（三）ES上的GC调优")])]),t("li",[t("a",{attrs:{href:"#四-避免内存交换"}},[a._v("（四）避免内存交换")])]),t("li",[t("a",{attrs:{href:"#五-控制索引合并"}},[a._v("（五）控制索引合并")])])])]),t("li",[t("a",{attrs:{href:"#参考文章"}},[a._v("参考文章")])])])]),t("p"),a._v(" "),t("h2",{attrs:{id:"es的性能优化"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#es的性能优化"}},[a._v("#")]),a._v(" ES的性能优化")]),a._v(" "),t("p",[a._v("es在数据量很大的情况下（数十亿级别）如何提高查询效率？")]),a._v(" "),t("p",[a._v("在es里，不要期待着随手调一个参数，就可以万能的应对所有的性能慢的场景。也许有的场景是你换个参数，或者调整一下语法，就可以搞定，但是绝对不是所有场景都可以这样。")]),a._v(" "),t("p",[a._v("es的性能优化，主要是围绕着"),t("strong",[a._v("fileSystem cache")]),a._v("也可以叫做OS cache来进行；")]),a._v(" "),t("p",[a._v("前面已经分析了es写入数据的原理，实际上数据最终都会写入到磁盘中去，当我们搜索读取的时候，系统会将数据放入到os cache中，而es严重依赖于这个os cache，如果我们给机器的内存足够多，在es里存的书库里昂小于内存容量，那么搜索的效率是非常高的，")]),a._v(" "),t("h3",{attrs:{id:"_1、减少字段"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1、减少字段"}},[a._v("#")]),a._v(" 1、减少字段")]),a._v(" "),t("p",[a._v("如果我们的表里有很多的字段，而我们只需要往es库里写入我们需要检索的那几个字段就可以了，对于其他的字段我们可以存到mysql或者说其他的比如Hbase中，hbase的特点是适用于海量数据的在线存储，就是对hbase可以写入海量数据，不要做复杂的搜索，就是做很简单的一些根据id或者范围进行查询的这么一个操作就可以了，从es中根据检索的字段去搜索，拿到的结果可能就十几个doc id，然后根据doc id到hbase里去查询每个doc id对应的完整的数据，给查出来，再返回给前端。简单地说就是：elastcisearch减少数据量仅仅放要用于搜索的几个关键字段即可，尽量写入es的数据量跟es机器的filesystem cache是差不多的就可以了；其他不用来检索的数据放hbase里，或者mysql。")]),a._v(" "),t("h3",{attrs:{id:"_2、数据预热"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_2、数据预热"}},[a._v("#")]),a._v(" 2、数据预热")]),a._v(" "),t("p",[a._v("如果说我们按照方案一的方法做了之后，效率还是不行，存的数据量还是超过os cache的空间，那么我们就可以吧一些比较热门的数据，比如在电商系统中，像一些热门的商品，我们可以在后台单独的写一个子系统，每隔一段时间，我们就访问一下，然数据进入到os cache中，这样用户来访问的时候就访问到的是os cache中的数据，就比较快。")]),a._v(" "),t("h3",{attrs:{id:"_3、冷热分离"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_3、冷热分离"}},[a._v("#")]),a._v(" 3、冷热分离")]),a._v(" "),t("p",[a._v("es可以做类似于mysql的水平拆分，就是说将大量的访问很少，频率很低的数据，单独写一个索引，然后将访问很频繁的热数据单独写一个索引，这样可以确保热数据在被预热之后，尽量都让他们留在filesystem os cache里，别让冷数据给冲刷掉。")]),a._v(" "),t("h2",{attrs:{id:"【-】"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#【-】"}},[a._v("#")]),a._v(" 【----------------------------】")]),a._v(" "),t("h2",{attrs:{id:"elasticsearch三个重要的优化"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#elasticsearch三个重要的优化"}},[a._v("#")]),a._v(" elasticsearch三个重要的优化")]),a._v(" "),t("h3",{attrs:{id:"_1、内存优化"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1、内存优化"}},[a._v("#")]),a._v(" 1、内存优化")]),a._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[a._v("在bin/elasticsearch.in.sh中进行配置\n修改配置项为尽量大的内存：\n"),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[a._v("ES_MIN_MEM")]),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v("8g\n"),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[a._v("ES_MAX_MEM")]),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v("8g\n两者最好改成一样的，否则容易引发长时间GC（stop-the-world）\n\nelasticsearch默认使用的GC是CMS GC\n如果你的内存大小超过6G，CMS是不给力的，容易出现stop-the-world\n建议使用G1 GC\n注释掉：\n"),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[a._v("JAVA_OPTS")]),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v("”"),t("span",{pre:!0,attrs:{class:"token variable"}},[a._v("$JAVA_OPTS")]),a._v(" -XX:+UseParNewGC”\n"),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[a._v("JAVA_OPTS")]),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v("”"),t("span",{pre:!0,attrs:{class:"token variable"}},[a._v("$JAVA_OPTS")]),a._v(" -XX:+UseConcMarkSweepGC”\n\n"),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[a._v("JAVA_OPTS")]),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v("”"),t("span",{pre:!0,attrs:{class:"token variable"}},[a._v("$JAVA_OPTS")]),a._v(" -XX:CMSInitiatingOccupancyFraction"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),t("span",{pre:!0,attrs:{class:"token number"}},[a._v("75")]),a._v("″\n"),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[a._v("JAVA_OPTS")]),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v("”"),t("span",{pre:!0,attrs:{class:"token variable"}},[a._v("$JAVA_OPTS")]),a._v(" -XX:+UseCMSInitiatingOccupancyOnly”\n修改为：\n"),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[a._v("JAVA_OPTS")]),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v("”"),t("span",{pre:!0,attrs:{class:"token variable"}},[a._v("$JAVA_OPTS")]),a._v(" -XX:+UseG1GC”\n"),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[a._v("JAVA_OPTS")]),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v("”"),t("span",{pre:!0,attrs:{class:"token variable"}},[a._v("$JAVA_OPTS")]),a._v(" -XX:MaxGCPauseMillis"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),t("span",{pre:!0,attrs:{class:"token number"}},[a._v("200")]),a._v("″\n\n如果G1 GC优点是减少stop-the-world在几率，但是CPU占有率高。\n需要更优化的性能，你可以参考\nhttp://www.oracle.com/webfolder/technetwork/tutorials/obe/java/G1GettingStarted/index.html\n")])])]),t("h2",{attrs:{id:"_2、合理配置主节点和数据节点"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_2、合理配置主节点和数据节点"}},[a._v("#")]),a._v(" 2、合理配置主节点和数据节点")]),a._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[a._v("配置文件：conf/elasticsearch.yaml\nnode.master: "),t("span",{pre:!0,attrs:{class:"token boolean"}},[a._v("true")]),a._v("\nnode.data: "),t("span",{pre:!0,attrs:{class:"token boolean"}},[a._v("true")]),a._v("\n\n"),t("span",{pre:!0,attrs:{class:"token number"}},[a._v("1")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v(" 当master为false，而data为true时，会对该节点产生严重负荷；\n"),t("span",{pre:!0,attrs:{class:"token number"}},[a._v("2")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v(" 当master为true，而data为false时，该节点作为一个协调者；\n"),t("span",{pre:!0,attrs:{class:"token number"}},[a._v("3")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v(" 当master为false，data也为false时，该节点就变成了一个负载均衡器。\n")])])]),t("h3",{attrs:{id:"_3、设置合理的刷新时间"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_3、设置合理的刷新时间"}},[a._v("#")]),a._v(" 3、设置合理的刷新时间")]),a._v(" "),t("div",{staticClass:"language-bash extra-class"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[a._v("建立的索引，不会立马查到，这是为什么elasticsearch为near-real-time的原因\n需要配置index.refresh_interval参数，默认是1s。\n你可以像\nhttp://zhaoyanblog.com/archives/299.html\n文件中一样，调用接口配置\n也可以直接写到conf/elasticsearch.yaml文件中\nindex.refresh_interval：1s\n这样所有新建的索引都使用这个刷新频率。\n")])])]),t("p",[a._v("除非注明，"),t("a",{attrs:{href:"https://zhaoyanblog.com/",target:"_blank",rel:"noopener noreferrer"}},[a._v("赵岩的博客"),t("OutboundLink")],1),a._v("文章均为原创，转载请以链接形式标明本文地址\n本文地址：https://zhaoyanblog.com/archives/319.html")]),a._v(" "),t("h2",{attrs:{id:"【-】-2"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#【-】-2"}},[a._v("#")]),a._v(" 【----------------------------】")]),a._v(" "),t("h2",{attrs:{id:"漫谈elasticsearch关于es性能调优几件必须知道的事-转"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#漫谈elasticsearch关于es性能调优几件必须知道的事-转"}},[a._v("#")]),a._v(" 漫谈ElasticSearch关于ES性能调优几件必须知道的事(转)")]),a._v(" "),t("p",[a._v("ElasticSearch是现在技术前沿的大数据引擎，常见的组合有ES+Logstash+Kibana作为一套成熟的日志系统，其中Logstash是ETL工具，Kibana是数据分析展示平台。ES让人惊艳的是他强大的搜索相关能力和灾备策略，ES开放了一些接口供开发者研发自己的插件，ES结合中文分词的插件会给ES的搜索和分析起到很大的推动作用。ElasticSearch是使用开源全文检索库ApacheLucene进行索引和搜索的，说架构必须和Lucene的一些东西打交道。")]),a._v(" "),t("h2",{attrs:{id:"关于lucene"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#关于lucene"}},[a._v("#")]),a._v(" 关于Lucene")]),a._v(" "),t("p",[a._v("ApacheLucene将写入索引的所有信息组织成一种倒排索引（Inverted Index）的结构之中，该结构是种将词项映射到文档的数据结构。其工作方式与传统的关系数据库不同，大致来说倒排索引是面向词项而不是面向文档的。且Lucene索引之中还存储了很多其他的信息，如词向量等等，每个Lucene都是由多个段构成的，每个段只会被创建一次但会被查询多次，段一旦创建就不会再被修改。多个段会在段合并的阶段合并在一起，何时合并由Lucene的内在机制决定，段合并后数量会变少，但是相应的段本身会变大。段合并的过程是非常消耗I/O的，且与之同时会有些不再使用的信息被清理掉。在Lucene中，将数据转化为倒排索引，将完整串转化为可用于搜索的词项的过程叫做分析。文本分析由分析器（Analyzer）来执行，分析其由分词器（Tokenizer），过滤器（Filter）和字符映射器（Character Mapper）组成，其各个功能显而易见。除此之外，Lucene有自己的一套完整的查询语言来帮助我们进行搜索和读写。")]),a._v(" "),t("p",[a._v("**[注]**ES中的索引指的是查询/寻址时URI中的一个字段如：[host]：[port（9200）]/[index]/[type]/[ID]?[option]，而Lucene中的索引更多地和ES中的分片的概念相对应。")]),a._v(" "),t("h2",{attrs:{id:"回到elasticsearch-es的架构遵循的设计理念有以下几个特征"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#回到elasticsearch-es的架构遵循的设计理念有以下几个特征"}},[a._v("#")]),a._v(" 回到ElasticSearch，ES的架构遵循的设计理念有以下几个特征")]),a._v(" "),t("ol",[t("li",[t("p",[t("strong",[a._v("合理的默认配置")]),a._v("：只需修改节点中的Yaml配置文件，就可以迅捷配置。这和Spring4中对配置的简化有相似的地方。")])]),a._v(" "),t("li",[t("p",[t("strong",[a._v("分布式工作模式")]),a._v("：ES强大的Zen发现机制不仅支持组广播也支持点单播，且有“知一点即知天下”之妙。")])]),a._v(" "),t("li",[t("p",[t("strong",[a._v("对等架构")]),a._v("：节点之间自动备份分片，且使分片本身和样本之间尽量”远离“，可以避免单点故障。且Master节点和Data节点几乎完全等价。")])]),a._v(" "),t("li",[t("p",[t("strong",[a._v("易于向集群扩充新节点")]),a._v("：大大简化研发或运维将新节点加入集群所需的工作。")])]),a._v(" "),t("li",[t("p",[t("strong",[a._v("不对索引中的数据结构增加任何限制")]),a._v("：ES支持在一个索引之中存在多种数据类型。")])]),a._v(" "),t("li",[t("p",[t("strong",[a._v("准实时")]),a._v("：搜索和版本同步，由于ES是分布式应用，一个重大的挑战就是一致性问题，无论索引还是文档数据，然而事实证明ES表现优秀。")])])]),a._v(" "),t("h3",{attrs:{id:"一-分片策略"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#一-分片策略"}},[a._v("#")]),a._v(" （一）分片策略")]),a._v(" "),t("p",[a._v("选择合适的分片数和副本数。ES的分片分为两种，主分片（Primary Shard）和副本（Replicas）。默认情况下，ES会为每个索引创建5个分片，即使是在单机环境下，这种冗余被称作过度分配（Over Allocation），目前看来这么做完全没有必要，仅在散布文档到分片和处理查询的过程中就增加了更多的复杂性，好在ES的优秀性能掩盖了这一点。假设一个索引由一个分片构成，那么当索引的大小超过单个节点的容量的时候，ES不能将索引分割成多份，因此必须在创建索引的时候就指定好需要的分片数量。此时我们所能做的就是创建一个新的索引，并在初始设定之中指定这个索引拥有更多的分片。反之如果过度分配，就增大了Lucene在合并分片查询结果时的复杂度，从而增大了耗时，所以我们得到了以下结论：")]),a._v(" "),t("p",[t("strong",[a._v("我们应该使用最少的分片！")])]),a._v(" "),t("p",[a._v("主分片，副本和节点最大数之间数量存在以下关系：")]),a._v(" "),t("p",[t("strong",[a._v("节点数<=主分片数*（副本数+1）")])]),a._v(" "),t("p",[a._v("**控制分片分配行为。**以上是在创建每个索引的时候需要考虑的优化方法，然而在索引已创建好的前提下，是否就是没有办法从分片的角度提高了性能了呢？当然不是，首先能做的是调整分片分配器的类型，具体是在elasticsearch.yml中设置cluster.routing.allocation.type属性，共有两种分片器even_shard,balanced（默认）。even_shard是尽量保证每个节点都具有相同数量的分片，balanced是基于可控制的权重进行分配，相对于前一个分配器，它更暴漏了一些参数而引入调整分配过程的能力。")]),a._v(" "),t("p",[a._v("每次ES的分片调整都是在ES上的数据分布发生了变化的时候进行的，最有代表性的就是有新的数据节点加入了集群的时候。当然调整分片的时机并不是由某个阈值触发的，ES内置十一个裁决者来决定是否触发分片调整，这里暂不赘述。另外，这些分配部署策略都是可以在运行时更新的，更多配置分片的属性也请大家自行Google。")]),a._v(" "),t("h3",{attrs:{id:"二-路由优化"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#二-路由优化"}},[a._v("#")]),a._v(" （二）路由优化")]),a._v(" "),t("p",[a._v("ES中所谓的路由和IP网络不同，是一个类似于Tag的东西。在创建文档的时候，可以通过字段为文档增加一个路由属性的Tag。ES内在机制决定了拥有相同路由属性的文档，一定会被分配到同一个分片上，无论是主分片还是副本。那么，在查询的过程中，一旦指定了感兴趣的路由属性，ES就可以直接到相应的分片所在的机器上进行搜索，而避免了复杂的分布式协同的一些工作，从而提升了ES的性能。于此同时，假设机器1上存有路由属性A的文档，机器2上存有路由属性为B的文档，那么我在查询的时候一旦指定目标路由属性为A，即使机器2故障瘫痪，对机器1构不成很大影响，所以这么做对灾况下的查询也提出了解决方案。所谓的路由，本质上是一个分桶（Bucketing）操作。当然，查询中也可以指定多个路由属性，机制大同小异。")]),a._v(" "),t("h3",{attrs:{id:"三-es上的gc调优"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#三-es上的gc调优"}},[a._v("#")]),a._v(" （三）ES上的GC调优")]),a._v(" "),t("p",[a._v("ElasticSearch本质上是个Java程序，所以配置JVM垃圾回收器本身也是一个很有意义的工作。我们使用JVM的Xms和Xmx参数来提供指定内存大小，本质上提供的是JVM的堆空间大小，当JVM的堆空间不足的时候就会触发致命的OutOfMemoryException。这意味着要么内存不足，要么出现了内存泄露。处理GC问题，首先要确定问题的源头，一般有两种方案：")]),a._v(" "),t("p",[t("strong",[a._v("1. 开启ElasticSearch上的GC日志")])]),a._v(" "),t("p",[t("strong",[a._v("2. 使用jstat命令")])]),a._v(" "),t("p",[t("strong",[a._v("3. 生成内存Dump")])]),a._v(" "),t("p",[a._v("第一条:在ES的配置文件elasticsearch.yml中有相关的属性可以配置，关于每个属性的用途这里当然说不完。")]),a._v(" "),t("p",[a._v("第二条:jstat命令可以帮助我们查看JVM堆中各个区的使用情况和GC的耗时情况。")]),a._v(" "),t("p",[a._v("第三条:最后的办法就是将JVM的堆空间转储到文件中去，实质上是对JVM堆空间的一个快照。")]),a._v(" "),t("p",[a._v("想了解更多关于JVM本身GC调优方法请参考：http://www.oracle.com/technetwork/java/javase/gc-tuning-6-140523.html")]),a._v(" "),t("p",[a._v("另外，通过修改ES节点的启动参数，也可以调整GC的方式，但是实质上和上述方法是等同的。")]),a._v(" "),t("h3",{attrs:{id:"四-避免内存交换"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#四-避免内存交换"}},[a._v("#")]),a._v(" （四）避免内存交换")]),a._v(" "),t("p",[a._v("这一点很简单，由于操作系统的虚拟内存页交换机制，会给性能带来障碍，如数据写满内存会写入Linux中的Swap分区。")]),a._v(" "),t("p",[a._v("可以通过在elasticsearch.yml文件中的bootstrap.mlockall设置为true来实现，但是需要管理员权限，需要修改操作系统的相关配置文件。")]),a._v(" "),t("h3",{attrs:{id:"五-控制索引合并"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#五-控制索引合并"}},[a._v("#")]),a._v(" （五）控制索引合并")]),a._v(" "),t("p",[a._v("上文提到过，ES中的分片和副本本质上都是Lucene索引，而Lucene索引又基于多个索引段构建（至少一个），索引文件中的绝大多数都是只被写一次，读多次，在Lucene内在机制控制下，当满足某种条件的时候多个索引段会被合并到一个更大的索引段，而那些旧的索引段会被抛弃并移除磁盘，这个操作叫做段合并。")]),a._v(" "),t("p",[a._v("Lucene要执行段合并的理由很简单充分：索引段粒度越小，查询性能越低且耗费的内存越多。频繁的文档更改操作会导致大量的小索引段，从而导致文件句柄打开过多的问题，如修改系统配置，增大系统允许的最大文件打开数。总的来讲，当索引段由多一个合并为一个的时候，会减少索引段的数量从而提高ES性能。对于研发者来讲，我们所能做的就是选择合适的合并策略，尽管段合并完全是Lucene的任务，但随着Lucene开放更多配置借口，新版本的ES还是提供了三种合并的策略tiered，log_byte_size，log_doc。另外，ES也提供了两种Lucene索引段合并的调度器：concurrent和serial。其中各者具体区别，这里暂不赘述，只是抛砖引玉。")]),a._v(" "),t("h2",{attrs:{id:"参考文章"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#参考文章"}},[a._v("#")]),a._v(" 参考文章")]),a._v(" "),t("ul",[t("li",[a._v("https://www.cnblogs.com/huanglog/p/9021073.html")]),a._v(" "),t("li",[a._v("https://zhaoyanblog.com/archives/319.html")]),a._v(" "),t("li",[a._v("https://www.cnblogs.com/kt-ting/p/12374043.html")])])])}),[],!1,null,null,null);s.default=r.exports}}]);