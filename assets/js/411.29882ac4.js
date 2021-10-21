(window.webpackJsonp=window.webpackJsonp||[]).push([[411],{926:function(a,t,s){"use strict";s.r(t);var r=s(53),e=Object(r.a)({},(function(){var a=this,t=a.$createElement,s=a._self._c||t;return s("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[s("div",{staticClass:"custom-block tip"},[s("p",{staticClass:"custom-block-title"},[a._v("TIP")]),a._v(" "),s("p",[a._v("本文主要是介绍 Spark-基础架构总结 。")])]),a._v(" "),s("p"),s("div",{staticClass:"table-of-contents"},[s("ul",[s("li",[s("a",{attrs:{href:"#spark简述及基本架构"}},[a._v("Spark简述及基本架构")])]),s("li",[s("a",{attrs:{href:"#spark简述"}},[a._v("Spark简述")])]),s("li",[s("a",{attrs:{href:"#为什么spark性能比hadoop快"}},[a._v("为什么Spark性能比Hadoop快？")])]),s("li",[s("a",{attrs:{href:"#spark-on-standalone执行过程-client模式"}},[a._v("Spark on Standalone执行过程（client模式）")])]),s("li",[s("a",{attrs:{href:"#spark-on-yarn-执行过程-cluster模式"}},[a._v("Spark on YARN 执行过程（cluster模式）")])]),s("li",[s("a",{attrs:{href:"#rdd简单介绍"}},[a._v("RDD简单介绍")]),s("ul",[s("li",[s("a",{attrs:{href:"#rdd-是spark进行并行运算的基本单位。rdd提供了四种算子"}},[a._v("RDD 是Spark进行并行运算的基本单位。RDD提供了四种算子：")])]),s("li",[s("a",{attrs:{href:"#wordcount样例"}},[a._v("wordcount样例：")])]),s("li",[s("a",{attrs:{href:"#rdd支持两种操作"}},[a._v("RDD支持两种操作：")])]),s("li",[s("a",{attrs:{href:"#执行和调度"}},[a._v("执行和调度")])])])]),s("li",[s("a",{attrs:{href:"#spark生态系统"}},[a._v("Spark生态系统")])]),s("li",[s("a",{attrs:{href:"#参考文章"}},[a._v("参考文章")])])])]),s("p"),a._v(" "),s("h2",{attrs:{id:"spark简述及基本架构"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#spark简述及基本架构"}},[a._v("#")]),a._v(" Spark简述及基本架构")]),a._v(" "),s("h2",{attrs:{id:"spark简述"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#spark简述"}},[a._v("#")]),a._v(" "),s("strong",[a._v("Spark简述")])]),a._v(" "),s("p",[a._v("Spark发源于美国加州大学伯克利分校AMPLab的集群计算平台。它立足\n于内存计算。从多迭代批量处理出发，兼收并蓄数据仓库、流处理和图计算等多种计算范式。")]),a._v(" "),s("p",[s("strong",[a._v("特点：")]),a._v("\n1、轻\nSpark 0.6核心代码有2万行，Hadoop1.0为9万行，2.0为22万行。")]),a._v(" "),s("p",[a._v("2、快\nSpark对小数据集能达到亚秒级的廷迟，这对于Hadoop MapReduce是无法想象的（因为”心跳”间隔机制，仅任务启动就有数秒的延迟）")]),a._v(" "),s("p",[a._v("3、灵\n在实现层，它"),s("strong",[a._v("完美演绎了Scala trait动态混入策略")]),a._v("（如可更换的集群调度器、序列化库）；\n在原语层，它同意扩展新的数据算子、新的数据源、新的language bindings(Java和Python)。\n在范式层，Spark支持内存计算、多迭代批星处理、流处理和图计算等多种范式。")]),a._v(" "),s("p",[a._v("4、巧\n巧在借势和借力。")]),a._v(" "),s("p",[a._v("Spark借Hadoop之势，与Hadoop无缝结合。")]),a._v(" "),s("h2",{attrs:{id:"为什么spark性能比hadoop快"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#为什么spark性能比hadoop快"}},[a._v("#")]),a._v(" "),s("strong",[a._v("为什么Spark性能比Hadoop快？")])]),a._v(" "),s("p",[a._v("1、Hadoop数据抽取运算模型")]),a._v(" "),s("img",{staticClass:"zoom-custom-imgs",attrs:{src:a.$withBase("/assets/img/dp/spark/archiprin-1.png"),alt:"wxmp"}}),a._v(" "),s("p",[a._v("数据的抽取运算基于磁盘，中间结果也是存储在磁盘上。MR运算伴随着大量的磁盘IO。")]),a._v(" "),s("p",[a._v("2、Spark则使用内存取代了传统HDFS存储中间结果")]),a._v(" "),s("img",{staticClass:"zoom-custom-imgs",attrs:{src:a.$withBase("/assets/img/dp/spark/archiprin-2.png"),alt:"wxmp"}}),a._v(" "),s("p",[a._v("第一代的Hadoop全然使用hdfs存储中间结果，第二带的Hadoop增加了cache来保存中间结果。而Spark则是基于内存的中间数据集存储。能够将Spark理解为Hadoop的升级版本号，Spark兼容了Hadoop的API，而且能够读取Hadoop的数据文件格式，包含HDFS，Hbase等。")]),a._v(" "),s("h2",{attrs:{id:"spark-on-standalone执行过程-client模式"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#spark-on-standalone执行过程-client模式"}},[a._v("#")]),a._v(" "),s("strong",[a._v("Spark on Standalone执行过程")]),a._v("（client模式）")]),a._v(" "),s("img",{staticClass:"zoom-custom-imgs",attrs:{src:a.$withBase("/assets/img/dp/spark/archiprin-3.png"),alt:"wxmp"}}),a._v(" "),s("p",[a._v("1、SparkContext连接到Master，向Master注冊并申请资源（CPU Core 和Memory）")]),a._v(" "),s("p",[a._v("2、Master依据"),s("strong",[a._v("SparkContext的资源申请要求和worker心跳周期内报告的信息")]),a._v("决定在哪个worker上分配资源。然后在该worker上获取资源，然后启动StandaloneExecutorBackend。")]),a._v(" "),s("p",[a._v("3、StandaloneExecutorBackend向SparkContext注冊。")]),a._v(" "),s("p",[a._v("4、SparkContext将Applicaiton代码发StandaloneExecutorBackend；而且SparkContext解析Applicaiton代码，构建DAG图。并提交给DAG Scheduler分解成Stage（当碰到Action操作时，就会催生Job。每个Job中含有1个或多个Stage，Stage一般在获取外部数据和shuffle之前产生）。然后以Stage（或者称为TaskSet）提交给Task Scheduler，\nTask Scheduler负责将Task分配到对应的worker，最后提交给StandaloneExecutorBackend执行；")]),a._v(" "),s("p",[a._v("5、StandaloneExecutorBackend会建立executor 线程池。開始执行Task，"),s("strong",[a._v("并向SparkContext报告。直至Task完毕。")])]),a._v(" "),s("p",[a._v("6、全部Task完毕后。SparkContext向Master注销。释放资源。")]),a._v(" "),s("h2",{attrs:{id:"spark-on-yarn-执行过程-cluster模式"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#spark-on-yarn-执行过程-cluster模式"}},[a._v("#")]),a._v(" "),s("strong",[a._v("Spark on YARN 执行过程")]),a._v("（cluster模式）")]),a._v(" "),s("img",{staticClass:"zoom-custom-imgs",attrs:{src:a.$withBase("/assets/img/dp/spark/archiprin-4.png"),alt:"wxmp"}}),a._v(" "),s("hr"),a._v(" "),s("img",{staticClass:"zoom-custom-imgs",attrs:{src:a.$withBase("/assets/img/dp/spark/archiprin-5.png"),alt:"wxmp"}}),a._v(" "),s("p",[a._v("1、用户通过bin/spark-submit（ Spark1.0.0 应用程序部署工具spark-submit）或 bin/spark-class 向YARN提交Application。")]),a._v(" "),s("p",[a._v("2、RM为Application分配第一个container，并在指定节点的container上启动SparkContext。")]),a._v(" "),s("p",[a._v("3、SparkContext向RM申请资源以执行Executor。")]),a._v(" "),s("p",[a._v("4、RM分配Container给SparkContext，"),s("strong",[a._v("SparkContext和相关的NM通讯，在获得的Container上启动StandaloneExecutorBackend，StandaloneExecutorBackend启动后，開始向SparkContext注冊并申请Task。")])]),a._v(" "),s("p",[a._v("5、SparkContext分配Task给StandaloneExecutorBackend执行StandaloneExecutorBackend"),s("strong",[a._v("执行Task")]),a._v("并"),s("strong",[a._v("向SparkContext汇报执行状况")])]),a._v(" "),s("p",[a._v("6、Task执行完毕。SparkContext归还资源给RM，并注销退出。")]),a._v(" "),s("h2",{attrs:{id:"rdd简单介绍"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#rdd简单介绍"}},[a._v("#")]),a._v(" "),s("strong",[a._v("RDD简单介绍")])]),a._v(" "),s("p",[a._v("RDD(Resilient Distributed Datasets)弹性分布式数据集，有例如以下几个特点：\n1、它在集群节点上是不可变的、已分区的集合对象。")]),a._v(" "),s("p",[a._v("2、通过并行转换的方式来创建。如map, filter, join等。\n3、失败自己主动重建。")]),a._v(" "),s("p",[a._v("4、能够控制存储级别（内存、磁盘等）来进行重用。")]),a._v(" "),s("p",[a._v("5、必须是可序列化的。")]),a._v(" "),s("p",[a._v("6、是静态类型的。")]),a._v(" "),s("p",[a._v("RDD本质上是一个计算单元。能够知道它的父计算单元。")]),a._v(" "),s("img",{staticClass:"zoom-custom-imgs",attrs:{src:a.$withBase("/assets/img/dp/spark/archiprin-6.png"),alt:"wxmp"}}),a._v(" "),s("img",{staticClass:"zoom-custom-imgs",attrs:{src:a.$withBase("/assets/img/dp/spark/archiprin-7.png"),alt:"wxmp"}}),a._v(" "),s("h3",{attrs:{id:"rdd-是spark进行并行运算的基本单位。rdd提供了四种算子"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#rdd-是spark进行并行运算的基本单位。rdd提供了四种算子"}},[a._v("#")]),a._v(" RDD 是Spark进行并行运算的基本单位。RDD提供了四种算子：")]),a._v(" "),s("p",[s("strong",[a._v("1、输入算子")]),a._v("：将原生数据转换成RDD，如parallelize、txtFile等")]),a._v(" "),s("p",[s("strong",[a._v("2、转换算子")]),a._v("：最基本的算子，是Spark生成DAG图的对象。")]),a._v(" "),s("p",[a._v("转换算子并不马上执行，在触发行动算子后再提交给driver处理，生成DAG图 –> Stage –> Task –> Worker执行。\n按转化算子在DAG图中作用。能够分成"),s("strong",[a._v("两种")]),a._v("：")]),a._v(" "),s("p",[s("strong",[a._v("窄依赖算子")])]),a._v(" "),s("ul",[s("li",[a._v("输入输出一对一的算子，且结果RDD的"),s("strong",[a._v("分区结构不变")]),a._v("，主要是map、flatMap；")]),a._v(" "),s("li",[a._v("输入输出一对一的算子，但结果RDD的"),s("strong",[a._v("分区结构发生了变化")]),a._v("，如union、coalesce；")])]),a._v(" "),s("p",[a._v("从"),s("strong",[a._v("输入中选择部分元素")]),a._v("的算子。如filter、distinct、subtract、sample。")]),a._v(" "),s("p",[s("strong",[a._v("宽依赖算子")])]),a._v(" "),s("p",[a._v("宽依赖会涉及shuffle类，在DAG图解析时以此为边界产生Stage。")]),a._v(" "),s("ul",[s("li",[a._v("对单个RDD基于key进行重组和reduce，如groupByKey、reduceByKey；")]),a._v(" "),s("li",[a._v("对两个RDD基于key进行join和重组。如join、cogroup。")])]),a._v(" "),s("p",[s("strong",[a._v("3、缓存算子")]),a._v("：对于要多次使用的RDD，能够缓冲加快执行速度，对关键数据能够採用多备份缓存。")]),a._v(" "),s("p",[s("strong",[a._v("4、行动算子")]),a._v("：将运算结果RDD转换成原生数据，如count、reduce、collect、saveAsTextFile等。")]),a._v(" "),s("img",{staticClass:"zoom-custom-imgs",attrs:{src:a.$withBase("/assets/img/dp/spark/archiprin-8.png"),alt:"wxmp"}}),a._v(" "),s("h3",{attrs:{id:"wordcount样例"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#wordcount样例"}},[a._v("#")]),a._v(" "),s("strong",[a._v("wordcount样例：")])]),a._v(" "),s("p",[a._v("1、初始化。"),s("strong",[a._v("构建SparkContext")]),a._v("。")]),a._v(" "),s("div",{staticClass:"language-shell extra-class"},[s("pre",{pre:!0,attrs:{class:"language-shell"}},[s("code",[a._v("val "),s("span",{pre:!0,attrs:{class:"token assign-left variable"}},[a._v("ssc")]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v("new SparkContext"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),a._v("args"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),s("span",{pre:!0,attrs:{class:"token number"}},[a._v("0")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v(","),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"WordCount"')]),a._v(",System.getenv"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"SPARK_HOME"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v(",Seq"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),a._v("System.getenv"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"SPARK_EXAMPLES_JAR"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("))")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v("\n")])])]),s("p",[a._v("2、输入算子")]),a._v(" "),s("div",{staticClass:"language-shell extra-class"},[s("pre",{pre:!0,attrs:{class:"language-shell"}},[s("code",[a._v("val "),s("span",{pre:!0,attrs:{class:"token assign-left variable"}},[a._v("lines")]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v("ssc.textFlle"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),a._v("args"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),s("span",{pre:!0,attrs:{class:"token number"}},[a._v("1")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("))")]),a._v("\n")])])]),s("p",[a._v("3、变换算子")]),a._v(" "),s("div",{staticClass:"language-shell extra-class"},[s("pre",{pre:!0,attrs:{class:"language-shell"}},[s("code",[a._v("val "),s("span",{pre:!0,attrs:{class:"token assign-left variable"}},[a._v("words")]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v("lines.flatMap"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),a._v("x"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(">")]),a._v("x.split"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('" "')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("))")]),a._v("\n")])])]),s("p",[a._v("4、缓存算子")]),a._v(" "),s("div",{staticClass:"language-shell extra-class"},[s("pre",{pre:!0,attrs:{class:"language-shell"}},[s("code",[a._v("words.cache"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v(" //缓存\n")])])]),s("p",[a._v("5、变换算子")]),a._v(" "),s("div",{staticClass:"language-shell extra-class"},[s("pre",{pre:!0,attrs:{class:"language-shell"}},[s("code",[a._v("val "),s("span",{pre:!0,attrs:{class:"token assign-left variable"}},[a._v("wordCounts")]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v("words.map"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),a._v("x"),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(">")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),a._v("x,1"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("))")]),a._v("\nval "),s("span",{pre:!0,attrs:{class:"token assign-left variable"}},[a._v("red")]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v("wordCounts.reduceByKey"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("((")]),a._v("a,b"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(">")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),a._v("a+b"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v("\n")])])]),s("p",[a._v("6、行动算子")]),a._v(" "),s("div",{staticClass:"language-shell extra-class"},[s("pre",{pre:!0,attrs:{class:"language-shell"}},[s("code",[a._v("red.saveAsTextFile"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"/root/Desktop/out"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v("\n")])])]),s("h3",{attrs:{id:"rdd支持两种操作"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#rdd支持两种操作"}},[a._v("#")]),a._v(" "),s("strong",[a._v("RDD支持两种操作：")])]),a._v(" "),s("p",[a._v("转换（transformation）从现有的数据集创建一个新的数据集\n动作（actions）在数据集上执行计算后，返回一个值给驱动程序")]),a._v(" "),s("p",[a._v("比如。map就是一种"),s("strong",[a._v("转换")]),a._v("，它将数据集每个元素都传递给函数，并返回一个新的分布数据集表示结果。而reduce是一种"),s("strong",[a._v("动作")]),a._v("。通过一些函数将全部的元素叠加起来，并将终于结果返回给Driver程序。（只是另一个并行的reduceByKey。能返回一个分布式数据集）")]),a._v(" "),s("p",[a._v("Spark中的全部转换都是惰性的，也就是说，他们并不会直接计算结果。相反的。它们仅仅是记住应用到基础数据集（比如一个文件）上的这些转换动作。**仅仅有当发生一个要求返回结果给Driver的动作时，这些转换才会真正执行。**这个设计让Spark更加有效率的执行。\n比如我们能够实现：通过map创建的一个新数据集，并在reduce中使用，终于仅仅返回reduce的结果给driver，而不是整个大的新数据集。")]),a._v(" "),s("p",[a._v("**默认情况下，**每个转换过的RDD都会在你在它之上执行一个动作时被又一次计算。")]),a._v(" "),s("p",[a._v("只是。你也能够使用persist(或者cache)方法，持久化一个RDD在内存中。")]),a._v(" "),s("p",[a._v("在这样的情况下，Spark将会在集群中。保存相关元素。下次你查询这个RDD时。它将能更高速訪问。")]),a._v(" "),s("p",[a._v("在磁盘上持久化数据集或在集群间复制数据集也是支持的。")]),a._v(" "),s("p",[a._v("Spark中支持的RDD转换和动作")]),a._v(" "),s("img",{staticClass:"zoom-custom-imgs",attrs:{src:a.$withBase("/assets/img/dp/spark/archiprin-9.png"),alt:"wxmp"}}),a._v(" "),s("p",[s("strong",[a._v("注意：")]),a._v("\n有些操作仅仅对键值对可用，比方join。")]),a._v(" "),s("p",[a._v("另外。函数名与Scala及其它函数式语言中的API匹配，比如，map是一对一的映射，而flatMap是将每个输入映射为一个或多个输出（与MapReduce中的map相似）。")]),a._v(" "),s("p",[a._v("除了这些操作以外，用户还能够请求将RDD缓存起来。而且。用户还能够通过Partitioner类获取RDD的分区顺序，然后将另一个RDD依照相同的方式分区。有些操作会自己主动产生一个哈希或范围分区的RDD，像groupByKey，reduceByKey和sort等。")]),a._v(" "),s("h3",{attrs:{id:"执行和调度"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#执行和调度"}},[a._v("#")]),a._v(" "),s("strong",[a._v("执行和调度")])]),a._v(" "),s("img",{staticClass:"zoom-custom-imgs",attrs:{src:a.$withBase("/assets/img/dp/spark/archiprin-10.png"),alt:"wxmp"}}),a._v(" "),s("p",[a._v("第一阶段记录"),s("strong",[a._v("变换算子")]),a._v("序列、增带构建DAG图。")]),a._v(" "),s("p",[a._v("第二阶段由"),s("strong",[a._v("行动算子触发")]),a._v("，DAGScheduler把DAG图转化为作业及其任务集。Spark支持本地单节点执行（开发调试实用）或集群执行。对于集群执行，客户端执行于master带点上，通过Cluster manager把划分好分区的任务集发送到集群的worker/slave节点上执行。")]),a._v(" "),s("p",[s("strong",[a._v("配置")])]),a._v(" "),s("img",{staticClass:"zoom-custom-imgs",attrs:{src:a.$withBase("/assets/img/dp/spark/archiprin-11.png"),alt:"wxmp"}}),a._v(" "),s("h2",{attrs:{id:"spark生态系统"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#spark生态系统"}},[a._v("#")]),a._v(" "),s("strong",[a._v("Spark生态系统")])]),a._v(" "),s("img",{staticClass:"zoom-custom-imgs",attrs:{src:a.$withBase("/assets/img/dp/spark/archiprin-12.png"),alt:"wxmp"}}),a._v(" "),s("h2",{attrs:{id:"参考文章"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#参考文章"}},[a._v("#")]),a._v(" 参考文章")]),a._v(" "),s("ul",[s("li",[a._v("https://www.cnblogs.com/bhlsheji/p/5153108.html")])])])}),[],!1,null,null,null);t.default=e.exports}}]);