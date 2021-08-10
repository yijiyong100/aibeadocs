---
title: ES-技术栈ELK介绍
---

::: tip
本文主要是介绍 ES-技术栈ELK介绍 。
:::

[[toc]]

## 为什么应该掌握Elastic Stack技术栈？

## 序言

从Elasticsearch 到大名鼎鼎的ELK三件套，从ELK到Elastic Stack生态，ES的生态发展越来越完善，应用领域也越来越宽广。下面就以我个人视角谈谈 “为什么你会需要Elastic Stack？”，仅代表本人观点，如有异议，欢迎讨论。


## 行业发展阶段与痛点


### 程序员工作的本质

从业IT多年，从开发、架构、专家、运维、带团队、布道，**一直也在思考程序****员工作本质****是什么？**

**程序员日常的工作与其说是面向对象编程，不如说是面向数据编程****。**所有写的代码程序逻辑都是围绕数据处理展开，对于一个程序员的技能要求，无非两点，**一是编程语言本身，二是数据库（泛指所有数据类产品）**。

编程语言不用说，是入行程序界的必备基础。那对于数据产品呢，由于单人个体精力有限，仅能掌握精通少数的产品。因此，**选择一个合适****的****数据产品****来****增强自己的核心竞争力是必须考虑的。**



### 大数据痛点

Hadoop过去的快速发展，已经成为了大数据的代名词，Hadoop是一个非常庞大完善的技术生态，从数据采集、存储系统、计算处理、查询分析、机器学习都有，唯一的问题就是太过于复杂，企业上**Hadoop需要投入很多的人力资源**，很多的硬件资源，对于中小型公司，成本实在太高。对于大数据从业者，需要掌握的技术点太多而不够精深，从而导致实际项目落地非常困难。

程序员圈流传过一句话 ”从入门到放弃“，说的就是Hadoop。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/es/basic/elk/intro-1.png')" alt="wxmp">


图示 ：非常复杂的Hadoop技术栈，令人望而生畏


## Elastic Stack生态介绍

Elastic Stack官方即支持自有的独立生态技术栈，也有三方社区支持的技术产品。即可以独立完成大数据领域很多业务诉求，也可以与Hadoop生态集成。

### Elasticsearch

Elasticsearch 简称ES，是Elastic Stack技术栈的数据中台，承担了存储、查询、聚合、机器学习等核心功能

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/es/basic/elk/intro-2.png')" alt="wxmp">


图示：Elasticsearch核心功能

### Logstash

Logstash数据处理服务程序，支持已知常用所有数据源类型，非常灵活的ETL处理引擎，解析转换加工丰富数据。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/es/basic/elk/intro-3.png')" alt="wxmp">


图示：Logstash支持的数据源类型



### Kibana

Kibana是一个可视化的管理工具与报表工具，仅支持Elasticsearch，功能强大且便捷，可以直接看到Elastic Stack技术栈的运行状况，也可以很方便的管理集群与数据。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/es/basic/elk/intro-4.png')" alt="wxmp">


图示：Kibana可视化界面



### Beats家族

Beats家族侧重成熟数据采集，相比Logstash更加具体化，简单配置，资源消耗少，可以直接将数据采集到Elasticsearch，也可以将数据传送到Logstash处理，然后发送到Elasticsearch。

· Metricbeat，采集各种指标数据，内置支持多种操作系统、中间件

· Filebeat，采集文本文件数据，内置支持多种操作系统、中间件、其它格式等文本文件

· Packetbeat，采集多种网络指标数据

· Heartbeat，心跳检测采集器，采集应用在线指标，支持HTTP、TCP协议，可以监听任何应用程序心跳

 
<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/es/basic/elk/intro-5.png')" alt="wxmp">



### ES-Hadoop

Elastic Stack本身既有一定的大数据处理能力与生态组合，a可以对接Hadoop生态，成为其中一员虎将。官方提供了ES-Hadoop驱动包，可以很快速的与Hive、Spark，HDFS集成，数据互相访问，优势互补。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/es/basic/elk/intro-6.png')" alt="wxmp">



### 非官方支持技术产品

Elastic Stack是开源产品，其核心主题功能开源免费，围绕其开发的周边产品也有很多，其中部分已经成为各自领域的领头羊。

· Flinkx，当下最火的流式实时计算平台产品，可以将实时数据写入到Elasticsearch中。

· Grafana，非常漂亮的可视化界面，擅长运维监控，展示各种指标图示，与Elasticsearch直接集成，类似Kibana的职责。

· NiFi，大规模数据ETL平台，可视化配置多种数据处理逻辑

· Presto，交互式即席查询产品，可以连接Elasticssearch，解决索引数据关联问题

· Elassandra，是Cassandra与Elasticsearch混合，将列式数据与搜索引擎结合，即可以大规模支持Key-Value应用场景，也可以支持复杂条件查询，是不可多得的混合产品，个人非常喜爱。

 

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/es/basic/elk/intro-7.png')" alt="wxmp">




## Elastic Stack能干什么

前面概要介绍了Elastic Stack的官方生态与三方社区生态，那Elastic Stack擅长干什么，解决哪些业务场景需求呢 ？



### 全文搜索

Elasticsearch基于Lucene打造，天然支持文本分词，关键词文本搜索，可应用在企业知识库、电商商品搜索、以及其它垂直搜索业务领域。

 

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/es/basic/elk/intro-8.png')" alt="wxmp">


图示：电商关键词商品搜索

**其中涉及到的技术点--文本分词深入探查**

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/es/basic/elk/intro-9.png')" alt="wxmp">




### 地理应用

内置Geohash算法，支持地理位置搜索，结合分布式架构特性，可满足海量数据地理检索，应用在大规模的轨迹项目上，如：物流汽车运输领域，快速检索出汽车历史轨迹路径范围。 

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/es/basic/elk/intro-10.png')" alt="wxmp">


**其中涉及到的技术点--索引查询篇**

 
<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/es/basic/elk/intro-11.png')" alt="wxmp">


 

### 向量检索

Elasticsearch内置Dense Vector字段类型，借助三方向量产品可以将文字、语音、图片、视频等转换为一个向量坐标，存储在ES中，供业务进行相似性与相关度检索，应用在图片相似、类似语音、问答系统、推荐系统领域。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/es/basic/elk/intro-12.png')" alt="wxmp">


图示：简单的向量坐标体系



### 查询加速

关系型数据库有严格的事务特性，能保证数据的可靠性，但在应对海量数据查询方面比较弱，业界通用的做法会采用DB+ES混合的策略，将数据实时同步到Elasticserch中。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/es/basic/elk/intro-13.png')" alt="wxmp">


图示：DB+ES混合示意图



### 大数据应用

ES非常擅长海量数据查询，大数据计算平台将海量数据经过计算之后，需要把最终的结果数据或者半结果数据存储起来，提供外部查询，传统的做法会选择关系型数据库承载，很容易到达性能瓶颈，此时会搭配Elasticsearch替代；另外ES自有生态也可以进行数据的计算，如：简单场景的数据实时计算，可以直接基于聚合实现

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/es/basic/elk/intro-14.png')" alt="wxmp">


图示 ：Hadoop+ES 混合大数据场景

 

**运用到的技术点--索引聚合、数据变换**

 

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/es/basic/elk/intro-15.png')" alt="wxmp">




### 日志平台

ES非常适合海量日志存储查询，早已成为业界通用日志平台的代名词，只要遇到日志查询分析需求，第一时间想到的就是ELK。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/es/basic/elk/intro-16.png')" alt="wxmp">


图示：支持多种日志类型采集

 

**涉及到的技术点--日志分析**

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/es/basic/elk/intro-17.png')" alt="wxmp">




### 基础监控

在基础监控领域，有很多成熟有名的产品，Elastic Stack作为后期之秀快速崛起，得益于其通用数据平台能力，其它基础监控产品多数仅支持指标数据，不支持其它类型，而ES几乎一网打尽，尽量使用一个通用平台搞定所有的监控需求。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/es/basic/elk/intro-18.png')" alt="wxmp">


图示：基础指标监控


### APM监控

同样的问题，研发人员不仅需要应用程序的监控信息，也需要采集应用程序的运行日志，而这又是Elasitc Stack的优势

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/es/basic/elk/intro-19.png')" alt="wxmp">


图示：APM监控示意图


### 安全分析

Elastic Stack支持多种数据采集，指标数据、文本数据、网络数据等，这些数据组合在一起，可以进行机器学习分析，依据机器学习算法，可以分析出异常点，这个特性非常完美的契合网络安全，可以自动的发现潜在的安全威胁

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/es/basic/elk/intro-20.png')" alt="wxmp">


图示：异常事件检测分析

## 参考文章
* https://blog.csdn.net/weixin_44460333/article/details/107624942