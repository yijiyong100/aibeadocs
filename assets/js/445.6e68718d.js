(window.webpackJsonp=window.webpackJsonp||[]).push([[445],{960:function(a,e,t){"use strict";t.r(e);var r=t(53),o=Object(r.a)({},(function(){var a=this,e=a.$createElement,t=a._self._c||e;return t("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[t("div",{staticClass:"custom-block tip"},[t("p",{staticClass:"custom-block-title"},[a._v("TIP")]),a._v(" "),t("p",[a._v("本文主要是介绍 Hadoop-生态基础知识 。")])]),a._v(" "),t("p"),t("div",{staticClass:"table-of-contents"},[t("ul",[t("li",[t("a",{attrs:{href:"#hadoop生态圈技术概述"}},[a._v("Hadoop生态圈技术概述")])]),t("li",[t("a",{attrs:{href:"#一-hadoop诞生记"}},[a._v("一 hadoop诞生记")])]),t("li",[t("a",{attrs:{href:"#二-hadoop生态圈"}},[a._v("二 hadoop生态圈")])]),t("li",[t("a",{attrs:{href:"#三-常见组件简介"}},[a._v("三 常见组件简介")]),t("ul",[t("li",[t("a",{attrs:{href:"#一-hdfs"}},[a._v("（一）Hdfs")])]),t("li",[t("a",{attrs:{href:"#二-mapreduce"}},[a._v("（二）Mapreduce")])]),t("li",[t("a",{attrs:{href:"#三-hive"}},[a._v("（三）Hive")])]),t("li",[t("a",{attrs:{href:"#四-hbase"}},[a._v("（四）Hbase")])]),t("li",[t("a",{attrs:{href:"#五-zookeeper"}},[a._v("（五）Zookeeper")])]),t("li",[t("a",{attrs:{href:"#六-sqoop"}},[a._v("（六）Sqoop")])]),t("li",[t("a",{attrs:{href:"#七-pig"}},[a._v("（七）Pig")])]),t("li",[t("a",{attrs:{href:"#八-mahout"}},[a._v("（八）Mahout")])]),t("li",[t("a",{attrs:{href:"#九-flume"}},[a._v("（九）Flume")])]),t("li",[t("a",{attrs:{href:"#十-spark"}},[a._v("（十）Spark")])]),t("li",[t("a",{attrs:{href:"#十一-storm"}},[a._v("（十一）Storm")])]),t("li",[t("a",{attrs:{href:"#十二-impala"}},[a._v("（十二）Impala")])]),t("li",[t("a",{attrs:{href:"#十三-kafka"}},[a._v("（十三）Kafka")])]),t("li",[t("a",{attrs:{href:"#十四-yarn"}},[a._v("（十四）Yarn")])]),t("li",[t("a",{attrs:{href:"#十五-hue"}},[a._v("（十五）Hue")])]),t("li",[t("a",{attrs:{href:"#十六-oozie"}},[a._v("（十六）Oozie")])]),t("li",[t("a",{attrs:{href:"#十七-ambari"}},[a._v("（十七）Ambari")])]),t("li",[t("a",{attrs:{href:"#参考文章"}},[a._v("参考文章")])])])])])]),t("p"),a._v(" "),t("h2",{attrs:{id:"hadoop生态圈技术概述"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#hadoop生态圈技术概述"}},[a._v("#")]),a._v(" Hadoop生态圈技术概述")]),a._v(" "),t("h2",{attrs:{id:"一-hadoop诞生记"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#一-hadoop诞生记"}},[a._v("#")]),a._v(" "),t("strong",[a._v("一 hadoop诞生记")])]),a._v(" "),t("p",[a._v("最早Doug Cutting（后面被称为hadoop之父）领导创立了Apache的项目Lucene，然后Lucene又衍生出子项目Nutch，Nutch又衍生了子项目Hadoop。Lucene是一个功能全面的文本搜索和查询库，Nutch目标就是要试图以Lucene为核心建立一个完整的搜索引擎，并且能达到提到Google商业搜索引擎的目标。网络搜索引擎和基本文档搜索区别就在规模上，Lucene目标是索引数百万文档，而Nutch应该能处理数十亿的网页。因此Nutch就面临了一个极大的挑战，即在Nutch中建立一个层，来负责分布式处理、冗余、故障恢复及负载均衡等等一系列问题。")]),a._v(" "),t("p",[a._v("曙光的到来，2004年，Google发表了两篇论文来论述Google文件系统（GFS）和MapReduce框架，并且使用了这两项技术来拓展自己的搜索系统，于是Doug Cutting看到了这两篇论文的价值并带领他的团队便实现了这个框架，并将Nutch移植上去，于是Nutch的可扩展性得到极大的提高。这个新的框架就是最初的hadoop。2005年，Hadoop作为Lucene的子项目Nutch的一部分正式引入Apache基金会。")]),a._v(" "),t("p",[a._v("在2006年1月，雅虎雇佣Doug Cutting，并让他和一个专门的团队来一起改进Hadoop，并将其作为一个开源项目继续发展。")]),a._v(" "),t("h2",{attrs:{id:"二-hadoop生态圈"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#二-hadoop生态圈"}},[a._v("#")]),a._v(" "),t("strong",[a._v("二 hadoop生态圈")])]),a._v(" "),t("p",[a._v("我们通常说到的hadoop包括两部分，一是Hadoop核心技术（或者说狭义上的hadoop），对应为apache开源社区的一个项目，主要包括三部分内容：hdfs，mapreduce，yarn。其中hdfs用来存储海量数据，mapreduce用来对海量数据进行计算，yarn是一个通用的资源调度框架（是在hadoop2.0中产生的）。")]),a._v(" "),t("p",[a._v("另一部分指广义的，广义上指一个生态圈，泛指大数据技术相关的开源组件或产品，如hbase、hive、spark、pig、zookeeper、kafka、flume、phoenix、sqoop等。")]),a._v(" "),t("p",[a._v("生态圈中的这些组件或产品相互之间会有依赖，但又各自独立。比如habse和kafka会依赖zookeeper，hive会依赖mapreduce。")]),a._v(" "),t("p",[a._v("下面图给出了Hadoop技术生态圈的一个大致组件分布图：")]),a._v(" "),t("img",{staticClass:"zoom-custom-imgs",attrs:{src:a.$withBase("/assets/img/ds/ecology/intro-1.png"),alt:"wxmp"}}),a._v(" "),t("p",[a._v("需要说明的是，上图并没有包括当前生态圈中的所有组件。而且hadoop生态圈技术在不断的发展，会不断有新的组件出现，一些老的组件也可能被新的组件替代。需要持续关注Hadoop开源社区的技术发展才能跟得上变化。")]),a._v(" "),t("h2",{attrs:{id:"三-常见组件简介"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#三-常见组件简介"}},[a._v("#")]),a._v(" "),t("strong",[a._v("三 常见组件简介")])]),a._v(" "),t("h3",{attrs:{id:"一-hdfs"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#一-hdfs"}},[a._v("#")]),a._v(" "),t("strong",[a._v("（一）Hdfs")])]),a._v(" "),t("p",[a._v("Hdfs是一种分布式文件系统，是Hadoop体系中数据存储管理的基础。它是一个高度容错的系统，能检测和应对硬件故障，用于在低成本的通用硬件上运行。Hdfs简化了文件的一致性模型，通过流式数据访问，提供高吞吐量应用程序数据访问功能，适合带有大型数据集的应用程序。")]),a._v(" "),t("h3",{attrs:{id:"二-mapreduce"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#二-mapreduce"}},[a._v("#")]),a._v(" "),t("strong",[a._v("（二）Mapreduce")])]),a._v(" "),t("p",[a._v("MapReduce分为第一代（称为 MapReduce 1.0或者MRv1，对应hadoop第1代）和第二代（称为MapReduce 2.0或者MRv2，对应hadoop第2代）。第一代MapReduce计算框架，它由两部分组成：编程模型（programming model）和运行时环境（runtime environment）。它的基本编程模型是将问题抽象成Map和Reduce两个阶段，其中Map阶段将输入数据解析成key/value，迭代调用map()函数处理后，再以key/value的形式输出到本地目录，而Reduce阶段则将key相同的value进行规约处理，并将最终结果写到HDFS上。它的运行时环境由两类服务组成：JobTracker和TaskTracker，其中，JobTracker负责资源管理和所有作业的控制，而TaskTracker负责接收来自JobTracker的命令并执行它。")]),a._v(" "),t("p",[a._v("MapReduce 2.0或者MRv2具有与MRv1相同的编程模型，唯一不同的是运行时环境。MRv2是在MRv1基础上经加工之后，运行于资源管理框架YARN之上的MRv1，它不再由JobTracker和TaskTracker组成，而是变为一个作业控制进程ApplicationMaster，且ApplicationMaster仅负责一个作业的管理，至于资源的管理，则由YARN完成。")]),a._v(" "),t("p",[a._v("总结下，MRv1是一个独立的离线计算框架，而MRv2则是运行于YARN之上的MRv1。")]),a._v(" "),t("h3",{attrs:{id:"三-hive"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#三-hive"}},[a._v("#")]),a._v(" "),t("strong",[a._v("（三）Hive")])]),a._v(" "),t("p",[a._v("Hive是一种基于Hadoop的数据仓库，由facebook开源，最初用于解决海量结构化的日志数据统计问题。Hive定义了一种类似SQL的查询语言(HQL),将SQL转化为MapReduce任务在Hadoop上执行。通常用于离线分析。")]),a._v(" "),t("h3",{attrs:{id:"四-hbase"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#四-hbase"}},[a._v("#")]),a._v(" "),t("strong",[a._v("（四）Hbase")])]),a._v(" "),t("p",[a._v("HBase是Google Bigtable的克隆版。它是一个针对结构化数据的可伸缩、高可靠、高性能、分布式和面向列的动态模式数据库。和传统关系数据库不同，HBase采用了BigTable的数据模型：增强的稀疏排序映射表（Key/Value），其中，键由行关键字、列关键字和时间戳构成。HBase提供了对大规模数据的随机、实时读写访问，同时，HBase中保存的数据可以使用MapReduce来处理，它将数据存储和并行计算完美地结合在一起。")]),a._v(" "),t("h3",{attrs:{id:"五-zookeeper"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#五-zookeeper"}},[a._v("#")]),a._v(" "),t("strong",[a._v("（五）Zookeeper")])]),a._v(" "),t("p",[a._v("ZooKeeper是一个分布式的，开放源码的分布式应用程序协调服务，是Google的Chubby一个开源的实现。它是一个为分布式应用提供一致性服务的软件，提供的功能包括：配置维护、域名服务、分布式同步、组服务等。ZooKeeper的目标就是封装好复杂易出错的关键服务，将简单易用的接口和性能高效、功能稳定的系统提供给用户。ZooKeeper包含一个简单的原语集，提供Java和C的接口。")]),a._v(" "),t("h3",{attrs:{id:"六-sqoop"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#六-sqoop"}},[a._v("#")]),a._v(" "),t("strong",[a._v("（六）Sqoop")])]),a._v(" "),t("p",[a._v("Sqoop是一款开源的工具，主要用于在Hadoop和传统的数据库(mysql、postgresql等)进行数据的传递，可以将一个关系型数据库（例如：MySQL、Oracle、Postgres等）中的数据导进到Hadoop的HDFS中，也可以将HDFS的数据导进到关系型数据库中。")]),a._v(" "),t("p",[a._v("Sqoop分为一代（称为Sqoop1）和二代（称为Sqoop2），其中Sqoop1的架构，仅仅使用一个Sqoop客户端，Sqoop2的架构，引入了Sqoop server集中化管理connector，以及rest api，web，UI，并引入权限安全机制。")]),a._v(" "),t("h3",{attrs:{id:"七-pig"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#七-pig"}},[a._v("#")]),a._v(" "),t("strong",[a._v("（七）Pig")])]),a._v(" "),t("p",[a._v("Apache Pig是MapReduce的一个抽象。它是一个工具/平台，用于分析较大的数据集，并将它们表示为数据流。Pig通常与 Hadoop 一起使用；我们可以使用Apache Pig在Hadoop中执行所有的数据处理操作。要编写数据分析程序，Pig提供了一种称为 Pig Latin 的高级语言。该语言提供了各种操作符，程序员可以利用它们开发自己的用于读取，写入和处理数据的功能。")]),a._v(" "),t("p",[a._v("要使用 Apache Pig 分析数据，程序员需要使用Pig Latin语言编写脚本。所有这些脚本都在内部转换为Map和Reduce任务。Apache Pig有一个名为 Pig Engine 的组件，它接受Pig Latin脚本作为输入，并将这些脚本转换为MapReduce作业。\n所以使用PIG，可以让不太擅长编写Java程序的程序员来进行大数据分析处理。")]),a._v(" "),t("h3",{attrs:{id:"八-mahout"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#八-mahout"}},[a._v("#")]),a._v(" "),t("strong",[a._v("（八）Mahout")])]),a._v(" "),t("p",[a._v("Mahout起源于2008年，最初是Apache Lucent的子项目，它在极短的时间内取得了长足的发展，现在是Apache的顶级项目。")]),a._v(" "),t("p",[a._v("Mahout的主要目标是创建一些可扩展的机器学习领域经典算法的实现，旨在帮助开发人员更加方便快捷地创建智能应用程序。Mahout现在已经包含了聚类、分类、推荐引擎（协同过滤）和频繁集挖掘等广泛使用的数据挖掘方法。除了算法，Mahout还包含数据的输入/输出工具、与其他存储系统（如数据库、MongoDB 或Cassandra）集成等数据挖掘支持架构。")]),a._v(" "),t("h3",{attrs:{id:"九-flume"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#九-flume"}},[a._v("#")]),a._v(" "),t("strong",[a._v("（九）Flume")])]),a._v(" "),t("p",[a._v("Flume是Cloudera（一个知名的基于开源hadoop的大数据发行商）设计开发的一个开源的日志收集工具， 具有分布式、高可靠、高容错、易于定制和扩展的特点。它将数据从产生、传输、处理并最终写入目标的路径的过程抽象为数据流，在具体的数据流中，数据源支持在Flume中定制数据发送方，从而支持收集各种不同协议数据。同时，Flume数据流提供对日志数据进行简单处理的能力，如过滤、格式转换等。此外，Flume还具有能够将日志写往各种数据目标（可定制）的能力。总的来说，Flume是一个可扩展、适合复杂环境的海量日志收集系统。")]),a._v(" "),t("h3",{attrs:{id:"十-spark"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#十-spark"}},[a._v("#")]),a._v(" "),t("strong",[a._v("（十）Spark")])]),a._v(" "),t("p",[a._v("Spark是一个通用计算引擎，能对大规模数据进行快速分析，可用它来完成各种各样的运算，包括 SQL 查询、文本处理、机器学习等，而在 Spark 出现之前，我们一般需要学习各种各样的引擎来分别处理这些需求。Spark不依赖于MapReduce，它使用了自己的数据处理框架。Spark使用内存进行计算，速度更快。Spark本身就是一个生态系统，除了核心API之外，Spark生态系统中还包括其他附加库，可以在大数据分析和机器学习领域提供更多的能力，如Spark SQL，Spark Streaming，Spark MLlib，Spark GraphX，BlinkDB，Tachyon等。")]),a._v(" "),t("h3",{attrs:{id:"十一-storm"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#十一-storm"}},[a._v("#")]),a._v(" "),t("strong",[a._v("（十一）Storm")])]),a._v(" "),t("p",[a._v("Storm是Twitter开源的分布式实时大数据处理框架，最早开源于github，从0.9.1版本之后，归于Apache社区，被业界称为实时版Hadoop。它与Spark Streaming的最大区别在于它是逐个处理流式数据事件，而Spark Streaming是微批次处理，因此，它比Spark Streaming更实时。")]),a._v(" "),t("h3",{attrs:{id:"十二-impala"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#十二-impala"}},[a._v("#")]),a._v(" "),t("strong",[a._v("（十二）Impala")])]),a._v(" "),t("p",[a._v("Impala是Cloudera公司主导开发的新型查询系统，它提供SQL语义，能查询存储在Hadoop的HDFS和HBase中的PB级大数据。已有的Hive系统虽然也提供了SQL语义，但由于Hive底层执行使用的是MapReduce引擎，仍然是一个批处理过程，难以满足查询的交互性。相比之下，Impala的最大特点也是最大卖点就是它的快速。")]),a._v(" "),t("p",[a._v("另外Impala可以Hive结合使用，它可以直接使用Hive的元数据库Metadata。")]),a._v(" "),t("h3",{attrs:{id:"十三-kafka"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#十三-kafka"}},[a._v("#")]),a._v(" "),t("strong",[a._v("（十三）Kafka")])]),a._v(" "),t("p",[a._v("Kafka是一种分布式的，基于发布/订阅的消息系统,类似于消息对列的功能，可以接收生产者（如webservice、文件、hdfs、hbase等）的数据，本身可以缓存起来，然后可以发送给消费者（同上），起到缓冲和适配的作。")]),a._v(" "),t("h3",{attrs:{id:"十四-yarn"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#十四-yarn"}},[a._v("#")]),a._v(" "),t("strong",[a._v("（十四）Yarn")])]),a._v(" "),t("p",[a._v("Yarn是一种新的 Hadoop 资源管理器，它是一个通用资源管理系统，可为上层应用提供统一的资源管理和调度。它将资源管理和处理组件分开，它的引入为集群在利用率、资源统一管理和数据共享等方面带来了巨大好处。可以把它理解为大数据集群的操作系统。可以在上面运行各种计算框架（包括MapReduce、Spark、Storm、MPI等）。")]),a._v(" "),t("h3",{attrs:{id:"十五-hue"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#十五-hue"}},[a._v("#")]),a._v(" "),t("strong",[a._v("（十五）Hue")])]),a._v(" "),t("p",[a._v("Hue是一个开源的Apache Hadoop UI系统,通过使用Hue我们可以在浏览器端的Web控制台上与Hadoop集群进行交互来分析处理数据，例如操作HDFS上的数据，运行MapReduce Job等等。")]),a._v(" "),t("h3",{attrs:{id:"十六-oozie"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#十六-oozie"}},[a._v("#")]),a._v(" "),t("strong",[a._v("（十六）Oozie")])]),a._v(" "),t("p",[a._v("在Hadoop中执行的任务有时候需要把多个Map/Reduce作业连接到一起，这样才能够达到目的。Oozie让我们可以把多个Map/Reduce作业组合到一个逻辑工作单元中，从而完成更大型的任务。wuOozie是一种Java Web应用程序，它运行在Java servlet容器中，并使用数据库来存储相关信息。")]),a._v(" "),t("h3",{attrs:{id:"十七-ambari"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#十七-ambari"}},[a._v("#")]),a._v(" "),t("strong",[a._v("（十七）Ambari")])]),a._v(" "),t("p",[a._v("Ambari是一个开源的大数据集群管理系统，可以用来就是创建、管理、监视 Hadoop 的集群，并提供WEB可视化的界面来让用户进行管理。")]),a._v(" "),t("h3",{attrs:{id:"参考文章"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#参考文章"}},[a._v("#")]),a._v(" 参考文章")]),a._v(" "),t("ul",[t("li",[a._v("https://www.cnblogs.com/suheng01/p/12143338.html")])])])}),[],!1,null,null,null);e.default=o.exports}}]);