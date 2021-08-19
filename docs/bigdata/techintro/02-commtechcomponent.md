---
title: 大数据-技术常用组件
---

::: tip
本文主要是介绍 大数据-技术常用组件 。
:::

[[toc]]

## 大数据技术总结


## 大纲

概念，应用，难题，技术栈，思想

## 概念

大数据是以容量大、类型多、存储速度快、应用价值高为主要特征的数据集合，正快速发展为对数量巨大、来源分散、格式多样的数据进行采集、存储和关联分析，从中发现新知识、创造新价值、提升新能力的新一代信息技术和服务业态。

## 应用

互联网领域（推荐，广告，搜索），电信（网络管理，市场营销），医疗（药品研发，临床数据对比），金融（客户画像，风险管控）

## 难题

- 数据安全，计算速度，分析工具等。
- 数据收集层：分布式，异构性，格式多样化，流式产生。需有扩展性、可靠性、安全性、低延迟
- 数据存储层：需有扩展性、容错性、支持多种存储模型等特点等特点
- 资源管理与服务协调层：需有资源利用率高、运维成本低、数据共享等特点
- 计算引擎层：需有系统吞吐量大和数据处理延迟低特点
- 数据分析层：算法能力强
- 数据可视化层：易于人理解

## 技术栈

## 大数据架构

LA(Lambda Architecture)，分为三层，批处理层、流式处理层和服务层。优势：兼顾了数据可靠性和低延时。主要有Google为主和Hadoop+Spark两种主流生态技术栈。下图是Hadoop+Spark主流技术栈
<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/bigdata/techintro/tech2-1.png')" alt="wxmp">

## 1. 数据收集

### Sqoop/Canal

关系型数据收集和导入工具，是连接关系型数据库的桥梁；Cannal可用于实现数据的增量导入

### Flume

非关系型数据收集工具，主要是流式日志数据

### Kafka

分布式消息队列

## 2. 数据存储

### HDFS

hadoop分布式文件系统

### HBase

构建在HDFS之上的分布式数据库

### Kudu

分布式列式存储数据库

## 3. 分布式协调与资源管理

### Zookeeper

基于简化的Paxos协议实现的服务系协调系统

### Yarn

同一资源管理与调度系统

## 4. 数据计算

### MapReduce

经典的Hadoop批处理计算引擎

### Spark

通用DAG计算引擎，可以批处理和流处理

### Impala/Presto

分别由Cloudera和Facebook开源的MPP系统，均是为了克服Hive性能低下而提出来的SQL查询引擎

### Storm

分布式流式实时计算引擎

### Flink

开源流处理框架，阿里发展为Blink，成为主流

## 5. 数据分析

### Hive

基于MapReduce/Tez实现的SQL引擎

### Pig

基于MapReduce/Tez实现的工作流引擎

### SparkSQL

基于Spark实现的SQL引擎

### Mahout/MLLib

机器学习和数据挖掘算法，Mahout基于MapReduce，MLlib基于Spark

### Apache Beam

基于各类计算框架而封装的高级API，方便用户构建复杂的数据流水线

### MOLAP

是一种通过与计算cube方式加速查询的OLAP引擎，核心思想是“空间换时间”，典型的有Druid和Kylin。

## Hadoop发行版本

Apache Hadoop，CDH（Cloudera Distribute Hadoop），HDP（Hortonworks Data Platform）

## 大数据计算模式

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/bigdata/techintro/tech2-2.png')" alt="wxmp">

## 技术指标

1. 可扩展性（水平扩展，垂直扩展）
2. 一致性（强一致性，弱一致性，最终一致性）
3. 持久性（复制）

## 思想

分而治之，MapReduce分片并行处理；scale-up  scale-out。

计算向数据移动，数据移动花销大。

主从灾备。

Paxos举手投票保证数据一致性。

## 参考文章
* https://blog.csdn.net/u011570492/article/details/105577120