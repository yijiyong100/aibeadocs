---
title: 数据采集-常用工具总结
---

::: tip
本文主要是介绍 数据采集-常用工具总结 。
:::

[[toc]]


## 一、大数据平台与数据采集

任何完整的大数据平台，一般包括以下的几个过程：

数据采集–>数据存储–>数据处理–>数据展现(可视化，报表和监控)

其中，数据采集是所有数据系统必不可少的，随着大数据越来越被重视，数据采集的挑战也变的尤为突出。这其中包括：

- 1. 数据源多种多样
- 2. 数据量大
- 3. 变化快
- 4. 如何保证数据采集的可靠性的性能
- 5. 如何避免重复数据
- 6. 如何保证数据质量

## 二、数据采集组件

### Nutch
1. Nutch是一个开源Java实现的搜索引擎。它提供了我们运行自己的搜索引擎所需的全部工具，包括全文搜索和Web爬虫。

### Scrapy
2. Scrapy 是一个为了爬取网站数据、提取结构性数据而编写的应用框架，可以应用在数据挖掘，信息处理或存储历史数据等一系列的程序中。大数据的采集需要掌握Nutch与Scrapy爬虫技术。

### Scribe
3. Scribe 是Facebook开源的日志收集系统，在Facebook内部已经得到大量的应用。它能够从各种日志源上收集日志，存储到一个中央存储系统（可以是NFS，分布式文件系统等）上，以便于进行集中统计分析处理。它为日志的“分布式收集，统一处理”提供了一个可扩展的，高容错的方案。当中央存储系统的网络或者机器出现故障时，scribe会将日志转存到本地或者另一个位置，当中央存储系统恢复后，scribe会将转存的日志重新传输给中央存储系统。其通常与Hadoop结合使用，scribe用于向HDFS中push日志，而Hadoop通过MapReduce作业进行定期处理。

### Flume
4. Flume 是Cloudera提供的一个高可用的，高可靠的，分布式的海量日志采集、聚合和传输的系统，Flume支持在日志系统中定制各类数据发送方，用于收集数据；同时，Flume提供对数据进行简单处理，并写到各种数据接受方（可定制）的能力。

   Flume提供了从console（控制台）、RPC（Thrift-RPC）、text（文件）、tail（UNIX tail）、syslog（syslog日志系统，支持TCP和UDP等2种模式），exec（命令执行）等数据源上收集数据的能力。当前Flume有两个版本Flume 0.9X版本的统称Flume-og，Flume1.X版本的统称Flume-ng。由于Flume-ng经过重大重构，与Flume-og有很大不同，使用时请注意区分。

### logstash
5. logstash 是一个应用程序日志、事件的传输、处理、管理和搜索的平台。你可以用它来统一对应用程序日志进行收集管理，提供 Web 接口用于查询和统计。他可以对你的日志进行收集、分析，并将其存储供以后使用（如，搜索），您可以使用它。说到搜索，logstash带有一个web界面，搜索和展示所有日志。

### Kibana
6. Kibana 是一个为 Logstash 和 ElasticSearch 提供的日志分析的 Web 接口。可使用它对日志进行高效的搜索、可视化、分析等各种操作。kibana 也是一个开源和免费的工具，他可以帮助您汇总、分析和搜索重要数据日志并提供友好的web界面。他可以为 Logstash 和 ElasticSearch 提供的日志分析的 Web 界面。

### Fluentd
7. Fluentd 是另一个开源的数据收集框架。Fluentd使用C/Ruby开发，使用JSON文件来统一日志数据。它的可插拔架构，支持各种不同种类和格式的数据源和数据输出。最后它也同时提供了高可靠和很好的扩展性。Treasure Data, Inc 对该产品提供支持和维护。

### Chukwa
8. Apache Chukwa 是apache旗下另一个开源的数据收集平台，它远没有其他几个有名。Chukwa基于Hadoop的HDFS和Map Reduce来构建(显而易见，它用Java来实现)，提供扩展性和可靠性。Chukwa同时提供对数据的展示，分析和监视。很奇怪的是它的上一次 github的更新事7年前。可见该项目应该已经不活跃了。

### Sqoop
9.  Sqoop 是一个用于在Hadoop和关系数据库服务器之间传输数据的工具。它用于从关系数据库（如MySQL，Oracle）导入数据到Hadoop HDFS，并从Hadoop文件系统导出到关系数据库，学习使用Sqoop对关系型数据库数据和Hadoop之间的导入有很大的帮助。

### Kettle
10. Kettle是一个ETL工具集，它允许你管理来自不同数据库的数据，通过提供一个图形化的用户环境来描述你想做什么，而不是你想怎么做。作为Pentaho的一个重要组成部分，现在在国内项目应用上逐渐增多，其数据抽取高效稳定。

### NiFi
11. Apache NiFi 是一个易于使用、功能强大而且可靠的数据拉取、数据处理和分发系统，用于自动化管理系统间的数据流。它支持高度可配置的指示图的数据路由、转换和系统中介逻辑，支持从多种数据源动态拉取数据。NiFi原来是NSA(National Security Agency [美国国家安全局])的一个项目，目前已经代码开源，是Apache基金会的顶级项目之一。NiFi基于Web方式工作，后台在服务器上进行调度。用户可以为数据处理定义为一个流程，然后进行处理，后台具有数据处理引擎、任务调度等组件。

### Splunk
12. Splunk是一个分布式的机器数据平台，主要有三个角色：

    1. Search Head负责数据的搜索和处理，提供搜索时的信息抽取。
    2. Indexer负责数据的存储和索引
    3. Forwarder，负责数据的收集，清洗，变形，并发送给Indexer

    Splunk内置了对Syslog，TCP/UDP，Spooling的支持，同时，用户可以通过开发 Input和Modular Input的方式来获取特定的数据。在Splunk提供的软件仓库里有很多成熟的数据采集应用，例如AWS，数据库(DBConnect)等等，可以方便的从云或者是数据库中获取数据进入Splunk的数据平台做分析。

    这里要注意的是，Search Head和Indexer都支持Cluster的配置，也就是高可用，高扩展的，但是Splunk现在还没有针对Farwarder的Cluster的功能。也就是说如果有一台Farwarder的机器出了故障，数据收集也会随之中断，并不能把正在运行的数据采集任务Failover到其它的 Farwarder上。

### canal
13. [canal](https://github.com/alibaba/canal)主要用途是基于 MySQL 数据库增量日志解析，提供增量数据订阅和消费。基于日志增量订阅和消费的业务包括

    - 数据库镜像
    - 数据库实时备份
    - 索引构建和实时维护(拆分异构索引、倒排索引等)
    - 业务 cache 刷新
    - 带业务逻辑的增量数据处理

    当前的 canal 支持源端 MySQL 版本包括 5.1.x , 5.5.x , 5.6.x , 5.7.x , 8.0.x

### yugong
14. [yugong](https://github.com/alibaba/yugong)阿里巴巴开始尝试MySQL的相关研究，并开发了基于MySQL分库分表技术的相关产品，Cobar/TDDL(目前为阿里云DRDS产品)，解决了单机Oracle无法满足的扩展性问题，当时也掀起一股去IOE项目的浪潮，愚公这项目因此而诞生，其要解决的目标就是帮助用户完成从Oracle数据迁移到MySQL上，完成去IOE的第一步。

### DataX
15. [DataX](https://github.com/alibaba/DataX)是阿里巴巴集团内被广泛使用的离线数据同步工具/平台，实现包括 MySQL、Oracle、SqlServer、Postgre、HDFS、Hive、ADS、HBase、TableStore(OTS)、MaxCompute(ODPS)、DRDS 等各种异构数据源之间高效的数据同步功能。

### Kafka Connect
16. Kafka Connect是一种用于在Kafka和其他系统之间可扩展的、可靠的流式传输数据的工具。它使得能够快速定义将大量数据集合移入和移出Kafka的连接器变得简单。 Kafka Connect可以获取整个数据库或从所有应用程序服务器收集指标到Kafka主题，使数据可用于低延迟的流处理。导出作业可以将数据从Kafka topic传输到二次存储和查询系统，或者传递到批处理系统以进行离线分析。

## 三、开源大数据处理工具

1. [开源大数据处理工具(上篇)](https://blog.csdn.net/ShiZhixin/article/details/46881145)
2. [开源大数据处理工具(下篇)](https://blog.csdn.net/ShiZhixin/article/details/46881167)


## 参考文章
* https://blog.csdn.net/weixin_41609807/article/details/105863935