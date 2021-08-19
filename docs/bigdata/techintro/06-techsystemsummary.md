---
title: 大数据-技术体系总结
---

::: tip
本文主要是介绍 大数据-技术体系总结 。
:::

[[toc]]

## **大数据技术框架**：
<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/bigdata/techintro/sum/20190202100918284.png')" alt="wxmp">

## **Hadoop生态系统**（1）
<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/bigdata/techintro/sum/20190202101015989.png')" alt="wxmp">

## **Hadoop生态系统**（2）
<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/bigdata/techintro/sum/20190202101100187.png')" alt="wxmp">

## **Hadoop构成:Flume（非结构化数据收集）**：
Cloudera开源的日志收集系统

用于非结构化数据收集

Flume特点
- 分布式
- 高可靠性
- 高容错性
- 易于定制与扩展

### **日志收集工具：flume**
<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/bigdata/techintro/sum/20190202101134254.png')" alt="wxmp">

## **Hadoop构成:Sqoop（结构化数据收集）**

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/bigdata/techintro/sum/20190202101155388.png')" alt="wxmp">
### **Sqoop：SQL-to-Hadoop**

连接传统关系型数据库和Hadoop 的桥梁

把关系型数据库的数据导入到Hadoop 系统( 如HDFS,HBase 和Hive) 中；

把数据从Hadoop 系统里抽取并导出到关系型数据库里。

利用MapReduce加快数据传输速度

批处理方式进行数据传输

## **Hadoop构成：HDFS（分布式文件系统）**
源自于Google的GFS论文,发表于2003年10月

HDFS是GFS克隆版

### **HDFS特点:**
- 良好的扩展性。
- 高容错性。
- 适合PB级以上海量数据的存储。

### **基本原理**：
- 将文件切分成等大的数据块，存储到多台机器上
- 将数据切分、容错、负载均衡等功能透明化
- 可将HDFS看成一个容量巨大、具有高容错性的磁盘

### **应用场景**：
- 海量数据的可靠性存储
- 数据归档

## **Hadoop构成：YARN（资源管理系统）**
## **YARN是什么**
- Hadoop 2.0新增系统
- 负责集群的资源管理和调度
- 使得多种计算框架可以运行在一个集群中
## **YARN的特点**
- 良好的扩展性、高可用性
- 对多种类型的应用程序进行统一管理和调度
- 自带了多种多用户调度器，适合共享集群环境

如下图：图1，图2
<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/bigdata/techintro/sum/201902021013291.png')" alt="wxmp">
<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/bigdata/techintro/sum/20190202101346916.png')" alt="wxmp">

## **Hadoop构成：MapReduce（分布式计算框架）**
- 源自于Google的MapReduce论文
- 发表于2004年12月
- Hadoop MapReduce是Google MapReduce克隆版

## **MapReduce特点**

- 良好的扩展性
- 高容错性
- 适合PB级以上海量数据的离线处理

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/bigdata/techintro/sum/2019020210141878.png')" alt="wxmp">

## **Hadoop构成:Hive（基于MR的数据仓库）**
由facebook开源，最初用于解决海量结构化的日志数据统计问题；

ETL（Extraction-Transformation-Loading）工具

### **构建在Hadoop之上的数据仓库；**
数据计算使用MR，数据存储使用HDFS

### **Hive 定义了一种类SQL 查询语言——HQL；**
类似SQL，但不完全相同

通常用于进行离线数据处理（采用MapReduce）；

可认为是一个HQL <—>MR的语言翻译器。

### **日志分析**
统计网站一个时间段内的pv、uv

### **多维度数据分析**
大部分互联网公司使用Hive进行日志分析，包括百度、淘宝等

### **其他场景**
海量结构化数据离线分析

低成本进行数据分析（不直接编写MR）

## **Spark生态系统**：
spark主要是面向计算的生态系统，而hadoop则是涉及数据收集、存储、
资源管理和计算等的综合大数据解决方案。
<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/bigdata/techintro/sum/2019020210153234.png')" alt="wxmp">

## **Flink生态系统**：
<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/bigdata/techintro/sum/20190202101600847.png')" alt="wxmp">

## **典型企业级大数据架构**：
<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/bigdata/techintro/sum/20190202101622674.png')" alt="wxmp">

## **Hadoop发行版介绍（开源版）**
### **Apache Hadoop**
推荐使用最新的2.x.x版本，比如2.7.3

下载地址：http://hadoop.apache.org/releases.html

SVN：http://svn.apache.org/repos/asf/hadoop/common/branches/

### **CDH（Cloudera Distributed Hadoop）**
推荐使用最新的CDH5版本，比如CDH5.8.0

下载地址： http://archive.cloudera.com/cdh5/cdh/

### **HDP（Hortonworks Data Platform**）
推荐使用最新的HDP 2.x版本，比如HDP 2.6版本

下载地址：http://zh.hortonworks.com/hdp/downloads/

### **Hadoop版本选择**
- 不同发行版兼容性
- 架构、部署和使用方法一致，不同之处仅在若干内部实现。
- 建议选择公司发行版，比如CDH或HDP
- 类比原生linux与Ubuntu/Red Hat关系
- 更易维护和升级
- 经过集成测试，不会面临版本兼容问题

## **Hadoop集群搭建**
全人工搭建

自动化安装软件：Cloudera Manager，Ambari

Hadoop发行版CDH:如下图：
<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/bigdata/techintro/sum/20190202101705715.png')" alt="wxmp">

Hadoop发行版HDP:如下图
<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/bigdata/techintro/sum/20190202101714708.png')" alt="wxmp">

## **Hadoop全人工模式安装：常见错误**
### **1 防火墙未关闭(所有节点都要关系)**
Connection Refused…

### **2 配置文件抄错**
core-site.xml

yarn-site.xml

hdfs-site.xml

以及mapredsite.xml

### **3 多次格式化HDFS**
每次格式化后，均会导致HDFS启动失败，

解决方案：清空HDFS的各个数据目录，然后重启HDFS

格式化HDFS是非常危险的，会导致所有数据丢失！！！

## **Hadoop运行模式**
### 本地模式：
一个节点，不会启动任何服务

### 伪分布式模式：
一个节点，所有服务均运行在该节点上

### 分布式模式：
多于一个节点

## **自动化安装 Ambari 如下图**
<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/bigdata/techintro/sum/20190202101749847.png')" alt="wxmp">

## **自动化安装 Cloudera Manager**
- Coudera提供的Hadoop管理系统
- 软件免费，但代码不开源
- 迄今为止最好用的Hadoop管理系统
- Hadoop自动化安装、部署和配置
- Hadoop管理（一站式管理各种服务）
- Hadoop监控与报警
- Hadoop问题诊断

### **自动化安装 Cloudera Manager(主界面) 如下图**：
<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/bigdata/techintro/sum/20190202101812111.png')" alt="wxmp">

### **自动化安装 Cloudera Manager(节点管理) 如下图**：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/bigdata/techintro/sum/20190202101824993.png')" alt="wxmp">

### **自动化安装 Cloudera Manager(配置管理) 如下图**：
<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/bigdata/techintro/sum/201902021018403.png')" alt="wxmp">

### **自动化安装 Cloudera Manager(搭建集群) 如下图**：
<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/bigdata/techintro/sum/20190202101853378.png')" alt="wxmp">

### **自动化安装 Cloudera Manager(审计) 如下图**：
<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/bigdata/techintro/sum/20190202101905385.png')" alt="wxmp">

### **学习大数据技术栈**：

Linux虚拟机

Linux教程
**http://www.92csz.com/study/linux/**

集成开发环境：
Eclipse，intellij IDEA

## 【项目构建（包管理、编译、发布），maven】
maven教程：
**https://yq.aliyun.com/articles/28591**
http://www.yiibai.com/maven/
http://wenku.baidu.com/link?url=cceOGhtpf7xHs_KFbI2f_uh0B7uo915pSZhqbO2ymD2ouJ7qhcOZmlc1W9xB6VxHnqu9VPD_M9HloZ_Pt-wuL3uTJ6cfKCxuJm0Z_FSxCm**

## 【Hadoop与Spark版本】
Scala 2.11.X(不能是2.10或2.12)，Java 1.8

**Hadoop 2.7.3**
http://hadoop.apache.org/releases.html

**Hive 2.1.1**
http://hive.apache.org/downloads.html

**Hbase 1.2.4**
http://www.apache.org/dyn/closer.cgi/hbase/

**Flume 1.7.0**
http://flume.apache.org/download.html

**Sqoop1.99.7**
http://mirror.cc.columbia.edu/pub/software/apache/sqoop/1.99.7/sqoop-1.99.7-binhadoop200.tar.gz

**Presto 0.166**
https://prestodb.io/docs/current/installation/deployment.html

**Spark 2.1.0**
http://spark.apache.org/downloads.html

**Kafka 0.9.0**
http://kafka.apache.org/downloads

**Zookeeper 3.4.9**
http://zookeeper.apache.org/releases.html#download


## 参考文章
* https://blog.csdn.net/zejunwzj/article/details/86747736