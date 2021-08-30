---
title: Flume-基础知识
---

::: tip
本文主要是介绍 Flume-基础知识 。
:::

[[toc]]

## Flume基础介绍

**官网：[https://flume.apache.org](https://flume.apache.org/documentation.html)**

### **概述**

Flume是一个高可用的，高可靠的，分布式的海量日志采集、聚合和传输系统。Flume基于流式架构，灵活可靠。Flume最主要的作用就是实时读取服务器本地磁盘数据，将数据写到HDFS。Flume针对特殊场景也具备良好的自定义扩展能力，因此，flume可以适用于大部分的日常数据采集场景

### 系统要求（flume1.7版本）

1.Java运行时环境-Java 1.7或更高版本

2.内存-足够的内存，用于源，通道或接收器使用的配置

3.磁盘空间-足够的磁盘空间用于通道或接收器使用的配置

4.目录权限-代理使用的目录的读/写权限

### Flume主要架构

Flume最核心的角色就是Agent，Agent是一个JVM进程，它以事件的形式将数据从源头送至目的，是Flume数据传输的基本单元。

Agent内部主要具有三个组件：Source、Channel、Sink。


<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dc/flume/intro-1.png')" alt="wxmp">


 

### Source

数据采集的源，就是要采集的数据源。

数据输入端的常见类型有：spooling directory（目录）、exec、kafka、avro、netcat等。

### Channel

是Agent内部数据的传输通道，位于Source和Sink之间的缓冲区。

Flume自带两种Channel：Memory Channel和File Channel。

Memory Channel是基于内存缓存，在不需要关心数据丢失的情境下使用。

File Channel是Flume的持久化Channel。系统宕机不会丢失数据。

### Sink

采集数据要传送的目的地，目的地可以是HDFS、hbase、hive、kafka等众多外部存储系统中 。

### Flume的后台启动

nohup /home/pirate/programs/flume/bin/flume-ng agent --conf-file /home/pirate/programs/flume/conf/job2/kafka_flume_hdfs.conf --name a2 -Dflume.monitoring.type=http -Dflume.monitoring.port=34545 -Dflume.root.logger=INFO,LOGFILE >/home/pirate/programs/flume/log.txt  2>&1 &

注：

--conf-file /home/pirate/programs/flume/conf/job2/kafka_flume_hdfs.conf：指定配置文件位置

--name a2 ：指定agent的名称

-Dflume.monitoring.type=http -Dflume.monitoring.port=34545：自带http（json）监控agent

-Dflume.root.logger=INFO,LOGFILE >/home/pirate/programs/flume/log.txt  2>&1 &：打印日志到指定的文件中去


## Flume 1.9用户手册中文版

[Flume 1.9用户手册中文版](https://flume.liyifeng.org/#)

## 简介

### 概览

Apache Flume 是一个分布式、高可靠、高可用的用来收集、聚合、转移不同来源的大量日志数据到中央数据仓库的工具

Apache Flume是Apache软件基金会（ASF）的顶级项目

一句话总结：我，Flume，牛B

### 系统要求

- 1. Java运行环境 - Java 1.8或更高版本
- 2. 内存 - 足够的内存 用来配置Souuces、Channels和Sinks
- 3. 硬盘空间 - 足够的硬盘用来配置Channels 和 Sinks
- 4. 目录权限 - Agent用来读写目录的权限

提示

 

唯一有用的就是第一行，其余都是废话。我找出了最近几个Flume版本对JRE的依赖，如下表：

| Flume版本                        | 依赖的JRE版本                     |
| :------------------------------- | :-------------------------------- |
| Flume 1.9.0                      | Java1.8 或更高版本                |
| Flume 1.8.0                      | Java1.8 或更高版本                |
| Flume 1.7.0                      | Java1.7 或更高版本                |
| Flume 1.4.0、1.5.0、1.5.2、1.6.0 | Java1.6 或更高版本（建议使用1.7） |


## 参考文章
* https://www.cnblogs.com/-courage/p/14449719.html
* https://flume.liyifeng.org/#