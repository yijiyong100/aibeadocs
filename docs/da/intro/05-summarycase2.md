---
title: 大数据应用综合案例(二)
---

::: tip
本文主要是介绍 大数据应用综合案例(二) 。
:::

[[toc]]

## 生活中大数据分析案例以及背后的技术原理

## 一、大数据分析在商业上的应用

### 1、体育赛事预测

世界杯期间，谷歌、百度、微软和高盛等公司都推出了比赛结果预测平台。百度预测结果最为亮眼，预测全程64场比赛，准确率为67%，进入淘汰赛后准确率为94%。现在互联网公司取代章鱼保罗试水赛事预测也意味着未来的体育赛事会被大数据预测所掌控。

“在百度对世界杯的预测中，我们一共考虑了团队实力、主场优势、最近表现、世界杯整体表现和博彩公司的赔率等五个因素，这些数据的来源基本都是互联网，随后我们再利用一个由搜索专家设计的机器学习模型来对这些数据进行汇总和分析，进而做出预测结果。”—百度北京大数据实验室的负责人张桐

### 2、股票市场预测

去年英国华威商学院和美国波士顿大学物理系的研究发现，用户通过谷歌搜索的金融关键词或许可以金融市场的走向，相应的投资战略收益高达326%。此前则有专家尝试通过Twitter博文情绪来预测股市波动。

想盈利，只有股票涨才能盈利，这会吸引一些游资利用信息不对称等情况人为改变股票市场规律，因此中国股市没有相对稳定的规律则很难被预测，且一些对结果产生决定性影响的变量数据根本无法被监控。

目前，美国已经有许多对冲基金采用大数据技术进行投资，并且收获甚丰。中国的中证广发百度百发100指数基金(下称百发100)，上线四个多月以来已上涨68%。

和传统量化投资类似，大数据投资也是依靠模型，但模型里的数据变量几何倍地增加了，在原有的金融结构化数据基础上，增加了社交言论、地理信息、卫星监测等非结构化数据，并且将这些非结构化数据进行量化，从而让模型可以吸收。

由于大数据模型对成本要求极高，业内人士认为，大数据将成为共享平台化的服务，数据和技术相当于食材和锅，基金经理和分析师可以通过平台制作自己的策略。

### 3、市场物价预测

CPI表征已经发生的物价浮动情况，但统计局数据并不权威。但大数据则可能帮助人们了解未来物价走向，提前预知通货膨胀或经济危机。最典型的案例莫过于马云通过阿里B2B大数据提前知晓亚洲金融危机，当然这是阿里数据团队的功劳。

### 4、用户行为预测

基于用户搜索行为、浏览行为、评论历史和个人资料等数据，互联网业务可以洞察消费者的整体需求，进而进行针对性的产品生产、改进和营销。《纸牌屋》选择演员和剧情、百度基于用户喜好进行精准广告营销、阿里根据天猫用户特征包下生产线定制产品、亚马逊预测用户点击行为提前发货均是受益于互联网用户行为预测。

购买前的行为信息，可以深度地反映出潜在客户的购买心理和购买意向：例如，客户 A 连续浏览了 5 款电视机，其中 4 款来自国内品牌 S，1 款来自国外品牌 T;4 款为 LED 技术，1 款为 LCD 技术;5 款的价格分别为 4599 元、5199 元、5499 元、5999 元、7999 元;这些行为某种程度上反映了客户 A 对品牌认可度及倾向性，如偏向国产品牌、中等价位的 LED 电视。

而客户 B 连续浏览了 6 款电视机，其中 2 款是国外品牌 T，2 款是另一国外品牌 V，2 款是国产品牌 S;4 款为 LED 技术，2 款为 LCD 技术;6 款的价格分别为 5999 元、7999 元、8300 元、9200 元、9999 元、11050 元;类似地，这些行为某种程度上反映了客户 B 对品牌认可度及倾向性，如偏向进口品牌、高价位的 LED 电视等。

### 5、人体健康预测

中医可以通过望闻问切手段发现一些人体内隐藏的慢性病，甚至看体质便可知晓一个人将来可能会出现什么症状。人体体征变化有一定规律，而慢性病发生前人体已经会有一些持续性异常。理论上来说，如果大数据掌握了这样的异常情况，便可以进行慢性病预测。

### 6、疾病疫情预测

基于人们的搜索情况、购物行为预测大面积疫情爆发的可能性，最经典的“流感预测”便属于此类。如果来自某个区域的“流感”、“板蓝根”搜索需求越来越多，自然可以推测该处有流感趋势。

Google成功预测冬季流感:

2009年，Google通过分析5000万条美国人最频繁检索的词汇，将之和美国疾病中心在2003年到2008年间季节性流感传播时期的数据进行比较，并建立一个特定的数学模型。最终google成功预测了2009冬季流感的传播甚至可以具体到特定的地区和州。

### 7、灾害灾难预测

气象预测是最典型的灾难灾害预测。地震、洪涝、高温、暴雨这些自然灾害如果可以利用大数据能力进行更加提前的预测和告知便有助于减灾防灾救灾赈灾。与过往不同的是，过去的数据收集方式存在着死角、成本高等问题，物联网时代可以借助廉价的传感器摄像头和无线通信网络，进行实时的数据监控收集，再利用大数据预测分析，做到更精准的自然灾害预测。

### 8、环境变迁预测

除了进行短时间微观的天气、灾害预测之外，还可以进行更加长期和宏观的环境和生态变迁预测。森林和农田面积缩小、野生动物植物濒危、海岸线上升，温室效应这些问题是地球面临的“慢性问题“。如果人类知道越多地球生态系统以及天气形态变化数据，就越容易模型化未来环境的变迁，进而阻止不好的转变发生。而大数据帮助人类收集、储存和挖掘更多的地球数据，同时还提供了预测的工具。

### 9、交通行为预测

基于用户和车辆的LBS定位数据，分析人车出行的个体和群体特征，进行交通行为的预测。交通部门可预测不同时点不同道路的车流量进行智能的车辆调度，或应用潮汐车道;用户则可以根据预测结果选择拥堵几率更低的道路。

百度基于地图应用的LBS预测涵盖范围更广。春运期间预测人们的迁徙趋势指导火车线路和航线的设置，节假日预测景点的人流量指导人们的景区选择，平时还有百度热力图来告诉用户城市商圈、动物园等地点的人流情况，指导用户出行选择和商家的选点选址。

多尔戈夫的团队利用机器学习算法来创造路上行人的模型。无人驾驶汽车行驶的每一英里路程的情况都会被记录下来，汽车电脑就会保持这些数据，并分析各种不同的对象在不同的环境中如何表现。有些司机的行为可能会被设置为固定变量(如“绿灯亮，汽车行”)，但是汽车电脑不会死搬硬套这种逻辑，而是从实际的司机行为中进行学习。

这样一来，跟在一辆垃圾运输卡车后面行驶的汽车，如果卡车停止行进，那么汽车可能会选择变道绕过去，而不是也跟着停下来。谷歌已建立了70万英里的行驶数据，这有助于谷歌汽车根据自己的学习经验来调整自己的行为。

### 10、能源消耗预测

加州电网系统运营中心管理着加州超过80%的电网，向3500万用户每年输送2.89亿兆瓦电力，电力线长度超过25000英里。该中心采用了Space-Time Insight的软件进行智能管理，综合分析来自包括天气、传感器、计量设备等各种数据源的海量数据，预测各地的能源需求变化，进行智能电能调度，平衡全网的电力供应和需求，并对潜在危机做出快速响应。中国智能电网业已在尝试类似大数据预测应用。

## 二、大数据分析种类

按照数据分析的实时性，分为实时数据分析和离线数据分析两种。

实时数据分析一般用于金融、移动和互联网B2C等产品，往往要求在数秒内返回上亿行数据的分析，从而达到不影响用户体验的目的。要满足这样的需求，可以采用精心设计的传统关系型数据库组成并行处理集群，或者采用一些内存计算平台，或者采用HDD的架构，这些无疑都需要比较高的软硬件成本。目前比较新的海量数据实时分析工具有EMC的Greenplum、SAP的HANA等。

对于大多数反馈时间要求不是那么严苛的应用，比如离线统计分析、机器学习、搜索引擎的反向索引计算、推荐引擎的计算等，应采用离线分析的方式，通过数据采集工具将日志数据导入专用的分析平台。但面对海量数据，传统的ETL工具往往彻底失效，主要原因是数据格式转换的开销太大，在性能上无法满足海量数据的采集需求。互联网企业的海量数据采集工具，有Facebook开源的Scribe、LinkedIn开源的Kafka、淘宝开源的Timetunnel、Hadoop的Chukwa等，均可以满足每秒数百MB的日志数据采集和传输需求，并将这些数据上载到Hadoop中央系统上。

按照大数据的数据量，分为内存级别、BI级别、海量级别三种。

这里的内存级别指的是数据量不超过集群的内存最大值。不要小看今天内存的容量，Facebook缓存在内存的Memcached中的数据高达320TB，而目前的PC服务器，内存也可以超过百GB。因此可以采用一些内存数据库，将热点数据常驻内存之中，从而取得非常快速的分析能力，非常适合实时分析业务。

MongoDB大集群目前存在一些稳定性问题，会发生周期性的写堵塞和主从同步失效，但仍不失为一种潜力十足的可以用于高速数据分析的NoSQL。

此外，目前大多数服务厂商都已经推出了带4GB以上SSD的解决方案，利用内存+SSD，也可以轻易达到内存分析的性能。随着SSD的发展，内存数据分析必然能得到更加广泛的应用。

BI级别指的是那些对于内存来说太大的数据量，但一般可以将其放入传统的BI产品和专门设计的BI数据库之中进行分析。目前主流的BI产品都有支持TB级以上的数据分析方案。种类繁多。

海量级别指的是对于数据库和BI产品已经完全失效或者成本过高的数据量。海量数据级别的优秀企业级产品也有很多，但基于软硬件的成本原因，目前大多数互联网企业采用Hadoop的HDFS分布式文件系统来存储数据，并使用MapReduce进行分析。本文稍后将主要介绍Hadoop上基于MapReduce的一个多维数据分析平台。

## 三、大数据分析一般过程

### 3.1 采集

大数据的采集是指利用多个数据库来接收发自客户端(Web、App或者传感器形式等)的 数据，并且用户可以通过这些数据库来进行简单的查询和处理工作。比如，电商会使用传统的关系型数据库MySQL和Oracle等来存储每一笔事务数据，除 此之外，Redis和MongoDB这样的NoSQL数据库也常用于数据的采集。

在大数据的采集过程中，其主要特点和挑战是并发数高，因为同时有可能会有成千上万的用户 来进行访问和操作，比如火车票售票网站和淘宝，它们并发的访问量在峰值时达到上百万，所以需要在采集端部署大量数据库才能支撑。并且如何在这些数据库之间 进行负载均衡和分片的确是需要深入的思考和设计。

### 3.2 导入/预处理

虽然采集端本身会有很多数据库，但是如果要对这些海量数据进行有效的分析，还是应该将这 些来自前端的数据导入到一个集中的大型分布式数据库，或者分布式存储集群，并且可以在导入基础上做一些简单的清洗和预处理工作。也有一些用户会在导入时使 用来自Twitter的Storm来对数据进行流式计算，来满足部分业务的实时计算需求。

导入与预处理过程的特点和挑战主要是导入的数据量大，每秒钟的导入量经常会达到百兆，甚至千兆级别。

### 3.3 统计/分析

统计与分析主要利用分布式数据库，或者分布式计算集群来对存储于其内的海量数据进行普通 的分析和分类汇总等，以满足大多数常见的分析需求，在这方面，一些实时性需求会用到EMC的GreenPlum、Oracle的Exadata，以及基于 MySQL的列式存储Infobright等，而一些批处理，或者基于半结构化数据的需求可以使用Hadoop。

统计与分析这部分的主要特点和挑战是分析涉及的数据量大，其对系统资源，特别是I/O会有极大的占用。

### 3.4 挖掘

与前面统计和分析过程不同的是，数据挖掘一般没有什么预先设定好的主题，主要是在现有数 据上面进行基于各种算法的计算，从而起到预测(Predict)的效果，从而实现一些高级别数据分析的需求。比较典型算法有用于聚类的Kmeans、用于 统计学习的SVM和用于分类的NaiveBayes，主要使用的工具有Hadoop的Mahout等。该过程的特点和挑战主要是用于挖掘的算法很复杂，并 且计算涉及的数据量和计算量都很大，常用数据挖掘算法都以单线程为主。

## 四、大数据分析工具

### 4.1 Hadoop

Hadoop 是一个能够对大量数据进行分布式处理的软件框架。但是 Hadoop 是以一种可靠、高效、可伸缩的方式进行处理的。Hadoop 是可靠的，因为它假设计算元素和存储会失败，因此它维护多个工作数据副本，确保能够针对失败的节点重新分布处理。Hadoop 是高效的，因为它以并行的方式工作，通过并行处理加快处理速度。Hadoop 还是可伸缩的，能够处理 PB 级数据。此外，Hadoop 依赖于社区服务器，因此它的成本比较低，任何人都可以使用。

### 4.2 HPCC

HPCC，High Performance Computing and Communications(高性能计算与通信)的缩写。1993年，由美国科学、工程、技术联邦协调理事会向国会提交了“重大挑战项目：高性能计算与 通信”的报告，也就是被称为HPCC计划的报告，即美国总统科学战略项目，其目的是通过加强研究与开发解决一批重要的科学与技术挑战问题。HPCC是美国 实施信息高速公路而上实施的计划，该计划的实施将耗资百亿美元，其主要目标要达到：开发可扩展的计算系统及相关软件，以支持太位级网络传输性能，开发千兆 比特网络技术，扩展研究和教育机构及网络连接能力。

### 4.3 Storm

Storm是自由的开源软件，一个分布式的、容错的实时计算系统。Storm可以非常可靠的处理庞大的数据流，用于处理Hadoop的批量数据。Storm很简单，支持许多种编程语言，使用起来非常有趣。Storm由Twitter开源而来，其它知名的应用企业包括Groupon、淘宝、支付宝、阿里巴巴、乐元素、Admaster等等。

Storm有许多应用领域：实时分析、在线机器学习、不停顿的计算、分布式RPC(远过程调用协议，一种通过网络从远程计算机程序上请求服务)、 ETL(Extraction-Transformation-Loading的缩写，即数据抽取、转换和加载)等等。Storm的处理速度惊人：经测 试，每个节点每秒钟可以处理100万个数据元组。Storm是可扩展、容错，很容易设置和操作。

### 4.4 Apache Drill

为了帮助企业用户寻找更为有效、加快Hadoop数据查询的方法，Apache软件基金会近日发起了一项名为“Drill”的开源项目。Apache Drill 实现了 Google’s Dremel.

据Hadoop厂商MapR Technologies公司产品经理Tomer Shiran介绍，“Drill”已经作为Apache孵化器项目来运作，将面向全球软件工程师持续推广。

该项目将会创建出开源版本的谷歌Dremel Hadoop工具(谷歌使用该工具来为Hadoop数据分析工具的互联网应用提速)。而“Drill”将有助于Hadoop用户实现更快查询海量数据集的目的。

“Drill”项目其实也是从谷歌的Dremel项目中获得灵感：该项目帮助谷歌实现海量数据集的分析处理，包括分析抓取Web文档、跟踪安装在Android Market上的应用程序数据、分析垃圾邮件、分析谷歌分布式构建系统上的测试结果等等。

通过开发“Drill”Apache开源项目，组织机构将有望建立Drill所属的API接口和灵活强大的体系架构，从而帮助支持广泛的数据源、数据格式和查询语言。

### 4.5 RapidMiner

RapidMiner是世界领先的数据挖掘解决方案，在一个非常大的程度上有着先进技术。它数据挖掘任务涉及范围广泛，包括各种数据艺术，能简化数据挖掘过程的设计和评价。

### 4.6 Pentaho BI

Pentaho BI 平台不同于传统的BI 产品，它是一个以流程为中心的，面向解决方案(Solution)的框架。其目的在于将一系列企业级BI产品、开源软件、API等等组件集成起来，方便商务智能应用的开发。它的出现，使得一系列的面向商务智能的独立产品如Jfree、Quartz等等，能够集成在一起，构成一项项复杂的、完整的商务智能解决方案。


## 五、 案例

### 5.1 啤酒与尿布

“啤酒与尿布”的故事产生于20世纪90年代的美国沃尔玛超市中，沃尔玛的超市管理人员分析销售数据时发现了一个令人难于理解的现象：在某些特定的情况下，“啤酒”与“尿布”两件看上去毫无关系的商品会经常出现在同一个购物篮中，这种独特的销售现象引起了管理人员的注意，经过后续调查发现，这种现象出现在年轻的父亲身上。

在美国有婴儿的家庭中，一般是母亲在家中照看婴儿，年轻的父亲前去超市购买尿布。父亲在购买尿布的同时，往往会顺便为自己购买啤酒，这样就会出现啤酒与尿布这两件看上去不相干的商品经常会出现在同一个购物篮的现象。如果这个年轻的父亲在卖场只能买到两件商品之一，则他很有可能会放弃购物而到另一家商店， 直到可以一次同时买到啤酒与尿布为止。沃尔玛发现了这一独特的现象，开始在卖场尝试将啤酒与尿布摆放在相同的区域，让年轻的父亲可以同时找到这两件商品，并很快地完成购物;而沃尔玛超市也可以让这些客户一次购买两件商品、而不是一件，从而获得了很好的商品销售收入，这就是“啤酒与尿布” 故事的由来。

当然“啤酒与尿布”的故事必须具有技术方面的支持。1993年美国学者Agrawal提出通过分析购物篮中的商品集合，从而找出商品之间关联关系的关联算法，并根据商品之间的关系，找出客户的购买行为。艾格拉沃从数学及计算机算法角度提 出了商品关联关系的计算方法——Aprior算法。沃尔玛从上个世纪 90 年代尝试将 Aprior算法引入到 POS机数据分析中，并获得了成功，于是产生了“啤酒与尿布”的故事。

### 5.2 数据分析帮助辛辛那提动物园提高客户满意度

辛辛那提动植物园成立于1873年，是世界上著名的动植物园之一，以其物种保护和保存以及高成活率繁殖饲养计划享有极高声誉。它占地面积71英亩，园内有500种动物和3000多种植物，是国内游客人数最多的动植物园之一，曾荣获Zagat十佳动物园，并被《父母》(Parent)杂志评为最受儿童喜欢的动物园，每年接待游客130多万人。

辛辛那提动植物园是一个非营利性组织，是俄亥州同时也是美国国内享受公共补贴最低的动植物园，除去政府补贴，2600万美元年度预算中，自筹资金部分达到三分之二以上。为此，需要不断地寻求增加收入。而要做到这一点，最好办法是为工作人员和游客提供更好的服务，提高游览率。从而实现动植物园与客户和纳税人的双赢。

借助于该方案强大的收集和处理能力、互联能力、分析能力以及随之带来的洞察力，在部署后，企业实现了以下各方面的受益：

帮助动植物园了解每个客户浏览、使用和消费模式，根据时间和地理分布情况采取相应的措施改善游客体验，同时实现营业收入最大化。

根据消费和游览行为对动植物园游客进行细分，针对每一类细分游客开展营销和促销活动，显著提高忠诚度和客户保有量。

识别消费支出低的游客，针对他们发送具有战略性的直寄广告，同时通过具有创意性的营销和激励计划奖励忠诚客户。

360度全方位了解客户行为，优化营销决策，实施解决方案后头一年节省40,000多美元营销成本，同时强化了可测量的结果。

采用地理分析显示大量未实现预期结果的促销和折扣计划，重新部署资源支持产出率更高的业务活动，动植物园每年节省100,000多美元。

通过强化营销提高整体游览率，2011年至少新增50,000人次“游览”。

提供洞察结果强化运营管理。例如，即将关门前冰激淋销售出现高潮，动植物园决定延长冰激淋摊位营业时间，直到关门为止。这一措施夏季每天可增加2,000美元收入。

与上年相比，餐饮销售增加30.7%，零售销售增加5.9%。

动植物园高层管理团队可以制定更好的决策，不需要 IT 介入或提供支持。

将分析引入会议室，利用直观工具帮助业务人员掌握数据。

## 参考文章
* https://zhuanlan.zhihu.com/p/27994456