---
title: Ambari-和CDH的区别
---

::: tip
本文主要是介绍 Ambari-和CDH的区别 。
:::

[[toc]]

## CDH 和ambari之间的比较

## 1 什么是CDH

 

Ambari是Apache软件基金顶级项目，它是一个基于web的工具，用于安装、配置、管理和监视Apache Hadoop集群，支持Hadoop HDFS,、Hadoop MapReduce、Hive、HCatalog,、HBase、ZooKeeper、Oozie、Pig和Sqoop。Ambari同样还提供了集群状况仪表盘，比如heatmaps和查看MapReduce、Pig、Hive应用程序的能力，以友好的用户界面对它们的性能特性进行诊断。

Cloudera Manager是cloudera公司的一个产品，着重于帮助大家管理自己的CDH集群，通过Cloudera Manager统一的UI界面来快速地自动配置和部署CDH和其相关组件，同时Cloudera Manager还提供了各种丰富的可自定义化的监视诊断和报告功能，集群上统一的日志管理功能，统一的集群配置管理和实时配置变更功能，多租户功能，高可用容灾部署功能和自动恢复功能等， 方便企业统一管理和维护自己的数据中心。Cloudera Manager产品也是我们主要的安装内容和介绍对象。它细分为免费的Express版本和功能完全并提供众多增值服务的收费版本Enterprise

### CDH简介　

- Cloudera's Distribution, including Apache Hadoop
- 是Hadoop众多分支中的一种，由Cloudera维护，基于稳定版本的Apache Hadoop构建
- 提供了Hadoop的核心
　　　　– 可扩展存储
　　　　– 分布式计算
- 基于Web的用户界面

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dw/ambari/diff-1.png')" alt="wxmp">

 

 

### CDH的优点　　

- 版本划分清晰
- 版本更新速度快
- 支持Kerberos安全认证
- 文档清晰
- 支持多种安装方式（Cloudera Manager方式

 

## 2 为什么需要他们

- 1000台[服务器](https://www.baidu.com/s?wd=服务器&tn=24004469_oem_dg&rsv_dl=gh_pl_sl_csd)的集群，最少要花费多长时间来搭建好Hadoop集群，包括Hive、Hbase、Flume、Kafka、Spark等等
- 只给你一天时间，完成以上工作？
- 对于以上集群进行hadoop[版本升级](https://www.baidu.com/s?wd=版本升级&tn=24004469_oem_dg&rsv_dl=gh_pl_sl_csd)，你会选择什么升级方案，最少要花费多长时间？

- 新版本的Hadoop，与Hive、Hbase、Flume、Kafka、Spark等等兼容？

大数据集群管理方式分为**手工方式（Apache hadoop）和工具方式（Ambari + hdp 和Cloudera Manger + CDH）**。

**手工部署呢**，需配置太多参数，但是，好理解其原理，建议初学这样做，能学到很多。该方式啊，均得由用户执行，细节太多，切当设计多个组件时，用户须自己解决组件间版本兼容问题。

**工具部署呢**，比如Ambari或Cloudera Manger。（当前两大最主流的集群管理工具，前者是Hortonworks公司，后者是Cloudera公司）使用工具来，可以说是一键操作，难点都在工具Ambari或Cloudera Manger本身部署上。

　　　　　　　　　　　　　　**手工方式**　　　　　　　　　　　　　　　　　　**工具方式**

难易度　　　　　　　　难，几乎不可能成功　　　　　　　　　　　　　　简单，易行

兼容性　　　　　　　　自己解决组件兼容性问题　　　　　　　　　　　　自动安装兼容组件

组件支持数　　　　　　支持全部组件　　　　　　　　　　　　　　　　　支持常用组件

优点　　　　　　　　　对组件和集群管理深刻　　　　　　　　　　　　  简单、容易、可行

缺点　　　　　　　　　太复杂，不可能成功　　　　　　　　　　　　　　屏蔽太多细节，妨碍对组件理解

 
 ## 3、CDH和 ambari 区别

 
 ### 基础比较
 

工具名　　　　　　　　所属机构　　　　　　开源性　　　　　　　　社区支持性　　　　　　易用性、稳定性　　　　　　市场占有率

Cloudera Manger   Cloudera　　　　　   商用　　　　　　　　　　不支持　　　　　　　　易用、稳定　　　　　　　　   高

Ambari　　　　　　Hortonwork　　　　　　开源　　　　　　　　　　支持　　　　　　　　 较易用、较稳定　　　　　　  较高


### 出版商:

- hortonworks研发了Ambari和hdp的大数据分析集成平台
- cloudera研发了cloudera manger和cdh大数据分析集成平台


### 稳定性:

- cloudera相对来说比较稳定
- ambari相对来说不稳定(页面打开速度慢)


### 资源消耗:

- cloudera manager的server端Xmx是2G,agent是1G,但是有host monitor和service monitor总共大概1G
- ambari的server端Xmx是2G,metric的ams和hbase的env大概也就是2G


### 集群重启:

- cloudera支持滚动重启(hdfs需要设计成ha,才能滚动重启)
- ambari支持滚动重启(hdfs需要设计成ha,才能滚动重启)


### 集群升级(一般来讲不要轻易升级集群):

- cloudera不支持滚动升级服务
- ambari支持滚动升级服务(这个是ambari的优点,hdfs必须是ha)


### 二次开发:

- cloudera不支持
- ambari支持


### 服务版本:

- cloudera较老
- ambari较新


### 服务集成性:

- cloudera较弱
- ambari较强,支持es、redis、presto、kylin等


### 体验效果:

- cloudera好
- ambari相对差


### 安装过程:

- cloudera复杂
- ambari简单

### 邮件报警:
- cloudera支持不好
- ambari支持很好


### 安装包:

- cloudera是parcel包
- ambari是rpm包


### 总结:

不要轻易升级组件版本

如果对集成性要求高,稳定性相对弱点的,可以选择ambari

如果对稳定性要求高,集成性相对弱点的,可以选择cloudera

> 打算对新建的hadoop集群使用管理工具，列了以下主要的不同点：

| 主要的不同点           | apache [Ambari](https://www.baidu.com/s?wd=Ambari&tn=24004469_oem_dg&rsv_dl=gh_pl_sl_csd) | ClouderaManager Express(免费版)                             |
| :--------------------- | :---------------------------------------------------------------------------------------- | :---------------------------------------------------------- |
| 配置版本控制和历史记录 | 支持                                                                                      | 不支持                                                      |
| 二次开发               | 支持                                                                                      | 不支持                                                      |
| 集成                   | 支持                                                                                      | no (不支持redis、kylin、es)                                 |
| 维护                   | 依靠社区力量                                                                              | cloudera做了一些定制开发，自行维护或打patch会离社区越来越远 |
| 权限控制               | ranger(相对简单)                                                                          | sentry(复杂)                                                |
| 视图定制               | 支持创建自己的视图，添加自定义服务                                                        | 不支持                                                      |

------

> 新建的集群综合需要集成es、kylin等技术，以及维护和二次开发等支持，决定使用Ambari

另外，目前 Ambari 和 CDH 两家公司已经合并。后续的选择不用纠结了。



## 两者之间如何选择？

1、如果对【集成性要求高】,稳定性相对弱点的,可以选择 ambari

2、如果对【稳定性要求高】,集成性相对弱点的,可以选择 cloudera

## 参考文章
* https://blog.csdn.net/matrix_google/article/details/86648067