---
title: CDH-基础介绍
---

::: tip
本文主要是介绍 CDH-基础知识 。
:::

[[toc]]

## 1.CDH概述

CDH（Cloudra's Distribution Apache Of Hadoop）是Apache Hadoop和相关项目的最完整，经过测试和最流行的发行版。CDH提供Hadoop的核心要素–可扩展的存储和分布式计算–以及基于Web的用户界面和重要的企业功能。CDH是Apache许可的开源软件，并且是唯一提供统一批处理，交互式SQL和交互式搜索以及基于角色的访问控制的Hadoop解决方案。 一句话概括CDH就是集成多种技术的一个框架。

### CDH提供

- 灵活性-存储任何类型的数据并使用各种不同的计算框架进行处理，包括批处理，交互式SQL，自由文本搜索，机器学习和统计计算。
- 集成-在可与广泛的硬件和软件解决方案一起使用的完整Hadoop平台上快速启动并运行。
- 安全性-处理和控制敏感数据。
- 可扩展性-启用广泛的应用程序并进行扩展，并扩展它们以满足您的要求。
- 高可用性-自信地执行关键任务业务任务。
- 兼容性-利用您现有的IT基础架构和投资。

### Hadoop生态构成

- HDFS:分布式文件系统
  - ZKFC：为实现NameNode高可用，在NameNode和Zookeeper之间传递信息，选举主节点工具。
  - NameNode：存储文件元数据
  - DateNode：存储具体数据
  - JournalNode：同步主NameNode节点数据到从节点NameNode
- MapReduce:开源的分布式批处理计算框架
- Spark：分布式基于内存的批处理框架
- Zookeeper:分布式协调管理
- Yarn:调度资源管理器
- HBase：基于HDFS的NoSql列式数据库
- Hive：将SQL转换为MapReduce进行计算
- Hue：是CDH的一个UI框架
- Impala：是Cloudra公司开发的一个查询系统，类似于Hive，可以通过SQL执行任务，但是它不基于MapReduce算法，而是直接执行分布式计算，这样就提高了效率。
- oozie:是一个工作流调度引擎，负责将多个任务组合在一起按序执行。
- kudu：Apache Kudu是转为hadoop平台开发的列式存储管理器。和impala结合使用，可以进行增删改查。
- Sqoop：将hadoop和关系型数据库互相转移的工具。
- Flume：采集日志
- 还有一些其它的

### CDH结构图

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dw/cdh/intro-1.png')" alt="wxmp">

## 【----------------------------】

## CDH 基础知识

### 1、Apache Hadoop 不足之处

- 版本管理混乱
- 部署过程繁琐、升级过程复杂
- 兼容性差
- 安全性低

### 2、Hadoop 发行版

- Apache Hadoop
- Cloudera’s Distribution Including Apache Hadoop（CDH）
- Hortonworks Data Platform (HDP)
- MapR
- EMR
- …

### 3、CDH能解决哪些问题

- 1000台服务器的集群，最少要花费多长时间来搭建好Hadoop集群，包括Hive、Hbase、Flume、Kafka、Spark等等
- 只给你一天时间，完成以上工作？
- 对于以上集群进行hadoop版本升级，你会选择什么升级方案，最少要花费多长时间？
- 新版本的Hadoop，与Hive、Hbase、Flume、Kafka、Spark等等兼容？

### 4、CDH简介　

- Cloudera's Distribution, including Apache Hadoop
- 是Hadoop众多分支中的一种，由Cloudera维护，基于稳定版本的Apache Hadoop构建
- 提供了Hadoop的核心
　　　　– 可扩展存储
　　　　– 分布式计算
- 基于Web的用户界面

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dw/cdh/intro-2.png')" alt="wxmp">

### 5、CDH的优点　　

- 版本划分清晰
- 版本更新速度快
- 支持Kerberos安全认证
- 文档清晰
- 支持多种安装方式（Cloudera Manager方式）

### 6、CDH安装方式

- Cloudera Manager
- Yum
- Rpm
- Tarball

### 7、CDH下载地址

- CDH5.4
　　　　 http://archive.cloudera.com/cdh5/
- Cloudera Manager5.4.3：
　　　　 http://www.cloudera.com/downloads/manager/5-4-3.html


## 参考文章
* https://www.cnblogs.com/raphael5200/p/5293960.html
* https://www.cnblogs.com/shun7man/p/12326282.html