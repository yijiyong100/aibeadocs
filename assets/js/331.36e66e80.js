(window.webpackJsonp=window.webpackJsonp||[]).push([[331],{845:function(t,a,s){"use strict";s.r(a);var v=s(53),r=Object(v.a)({},(function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("div",{staticClass:"custom-block tip"},[s("p",{staticClass:"custom-block-title"},[t._v("TIP")]),t._v(" "),s("p",[t._v("本文主要是介绍 数据采集-常用工具 。")])]),t._v(" "),s("p"),s("div",{staticClass:"table-of-contents"},[s("ul",[s("li",[s("a",{attrs:{href:"#一-kettle"}},[t._v("(一) kettle")]),s("ul",[s("li",[s("a",{attrs:{href:"#特点"}},[t._v("特点：")])]),s("li",[s("a",{attrs:{href:"#适用场景"}},[t._v("适用场景：")])])])]),s("li",[s("a",{attrs:{href:"#二-sqoop"}},[t._v("(二) sqoop")]),s("ul",[s("li",[s("a",{attrs:{href:"#特点"}},[t._v("特点：")])]),s("li",[s("a",{attrs:{href:"#适用场景"}},[t._v("适用场景：")])])])]),s("li",[s("a",{attrs:{href:"#三-datax"}},[t._v("(三) dataX")]),s("ul",[s("li",[s("a",{attrs:{href:"#特点"}},[t._v("特点：")])]),s("li",[s("a",{attrs:{href:"#适用场景"}},[t._v("适用场景：")])])])]),s("li",[s("a",{attrs:{href:"#四-flume"}},[t._v("(四) flume")]),s("ul",[s("li",[s("a",{attrs:{href:"#特点"}},[t._v("特点：")])]),s("li",[s("a",{attrs:{href:"#适用场景"}},[t._v("适用场景：")])])])]),s("li",[s("a",{attrs:{href:"#五-logstash-简介"}},[t._v("(五)Logstash 简介")])]),s("li",[s("a",{attrs:{href:"#参考文章"}},[t._v("参考文章")])])])]),s("p"),t._v(" "),s("h2",{attrs:{id:"一-kettle"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#一-kettle"}},[t._v("#")]),t._v(" (一) kettle")]),t._v(" "),s("p",[t._v("说明：是国外开源ETL工具，支持数据库、FTP、文件、rest接口、hdfs、hive等平台的灵敏据进行抽取、转换、传输等操作，Java编写跨平台，C/S架构，不支持浏览器模式。")]),t._v(" "),s("h3",{attrs:{id:"特点"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#特点"}},[t._v("#")]),t._v(" 特点：")]),t._v(" "),s("p",[t._v("易用性：有可视化设计器进行可视化操作，使用简单。")]),t._v(" "),s("p",[t._v("功能强大：不仅能进行数据传输，能同时进行数据清洗转换等操作。")]),t._v(" "),s("p",[t._v("支持多种源：支持各种数据库、FTP、文件、rest接口、hdfs、Hive等源。")]),t._v(" "),s("p",[t._v("部署方便：独立部署，不依赖第三方产品。")]),t._v(" "),s("h3",{attrs:{id:"适用场景"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#适用场景"}},[t._v("#")]),t._v(" 适用场景：")]),t._v(" "),s("p",[t._v("数据量及增量不大，业务规则变化较快，要求可视化操作，对技术人员的技术门槛要求低。")]),t._v(" "),s("h2",{attrs:{id:"二-sqoop"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#二-sqoop"}},[t._v("#")]),t._v(" (二) sqoop")]),t._v(" "),s("p",[t._v("说明：Apache开源软件，主要用于在HADOOP(Hive)与传统的数据库(mysql、postgresql...)间进行数据的传递。")]),t._v(" "),s("h3",{attrs:{id:"特点-2"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#特点-2"}},[t._v("#")]),t._v(" 特点：")]),t._v(" "),s("p",[t._v("数据吞吐量大：依赖hadoop集群可进行大批量数据集成。")]),t._v(" "),s("p",[t._v("操作有技术要求：sqoop操作没有可视化设计器，对使用人员有较专业的技术要求。")]),t._v(" "),s("p",[t._v("多种交互方式：命令行，web UI，rest API。")]),t._v(" "),s("p",[t._v("部署不方便：sqoop依赖大数据集群，使用sqoop要求数据传输的的源要与大数据集群的所有节点能进行通信。")]),t._v(" "),s("h3",{attrs:{id:"适用场景-2"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#适用场景-2"}},[t._v("#")]),t._v(" 适用场景：")]),t._v(" "),s("p",[t._v("适用于能与大数据集群直接通信的关系数据库间的大批量数据传输。")]),t._v(" "),s("h2",{attrs:{id:"三-datax"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#三-datax"}},[t._v("#")]),t._v(" (三) dataX")]),t._v(" "),s("p",[t._v("说明：是阿里开源软件异构数据源离线同步工具，致力于实现包括关系型数据库(MySQL、Oracle等)、HDFS、Hive、ODPS、HBase、FTP等各种异构数据源之间稳定高效的数据同步功能。")]),t._v(" "),s("h3",{attrs:{id:"特点-3"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#特点-3"}},[t._v("#")]),t._v(" 特点：")]),t._v(" "),s("p",[t._v("易用性：没有界面，以执行脚本方式运行，对使用人员技术要求较高。")]),t._v(" "),s("p",[t._v("性能：数据抽取性能高。")]),t._v(" "),s("p",[t._v("部署：可独立部署")]),t._v(" "),s("h3",{attrs:{id:"适用场景-3"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#适用场景-3"}},[t._v("#")]),t._v(" 适用场景：")]),t._v(" "),s("p",[t._v("在异构数据库/文件系统之间高速交换数据。")]),t._v(" "),s("h2",{attrs:{id:"四-flume"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#四-flume"}},[t._v("#")]),t._v(" (四) flume")]),t._v(" "),s("p",[t._v("说明：flume是一个分布式、可靠、和高可用的海量日志采集、聚合和传输的系统。")]),t._v(" "),s("h3",{attrs:{id:"特点-4"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#特点-4"}},[t._v("#")]),t._v(" 特点：")]),t._v(" "),s("p",[t._v("分布式：flume分布式集群部署，扩展性好。")]),t._v(" "),s("p",[t._v("可靠性好: 当节点出现故障时，日志能够被传送到其他节点上而不会丢失。")]),t._v(" "),s("p",[t._v("易用性：flume配置使用较繁琐，对使用人员专业技术要求非常高。")]),t._v(" "),s("p",[t._v("实时采集：flume采集流模式进行数据实时采集。")]),t._v(" "),s("h3",{attrs:{id:"适用场景-4"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#适用场景-4"}},[t._v("#")]),t._v(" 适用场景：")]),t._v(" "),s("p",[t._v("适用于日志文件实时采集。")]),t._v(" "),s("h2",{attrs:{id:"五-logstash-简介"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#五-logstash-简介"}},[t._v("#")]),t._v(" (五)Logstash 简介")]),t._v(" "),s("p",[t._v("Logstash 的作用就是一个数据收集器，将各种格式各种渠道的数据通过它收集解析之后格式化输出到 Elasticsearch ，最后再由 Kibana 提供的比较友好的 Web 界面进行汇总、分析、搜索。")]),t._v(" "),s("h2",{attrs:{id:"参考文章"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#参考文章"}},[t._v("#")]),t._v(" 参考文章")]),t._v(" "),s("ul",[s("li",[t._v("https://blog.csdn.net/weixin_39824898/article/details/112474940")])])])}),[],!1,null,null,null);a.default=r.exports}}]);