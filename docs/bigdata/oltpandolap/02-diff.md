---
title: OLTP和OLAP的区别
---

::: tip
本文主要是介绍 OLTP和OLAP的区别 。
:::

[[toc]]

## 大数据分析之OLTP与OLAP的区别

数据从何而来？

企业日常的各个环节都会产生数据，一个企业从小到大的过程中，最初建设IT系统的时刻是一个分隔点。

在此之前，数据零散分布在邮箱、发票、单据、APP等各种地方。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/bigdata/oltpandolap/diff-1.png')" alt="wxmp">

零散的数据分布

企业规模达到一定程度时则必须要建设IT系统，此时，数据开始在各种系统（ERP、CRM、MES等）中积累。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/bigdata/oltpandolap/diff-2.png')" alt="wxmp">

IT系统中的数据分布

数据价值随着其体量不断的累积也在一直增加。

获取其中的知识，能够帮助企业发现问题与机遇并进行正确的决策，以达到赢得市场之目的。

数据分析则是实现以上目标的重要手段之一。

数据分析体系的建设往往是在初次进行信息化建设后某个时间开始。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/bigdata/oltpandolap/diff-3.png')" alt="wxmp">

信息化之后数据分析体系的建立

数据分析体系与其他业务类系统有着显著的不同。

业务类系统主要供基层人员使用，进行一线业务操作，通常被称为OLTP（On-Line Transaction Processing，联机事务处理）。

数据分析的目标则是探索并挖掘数据价值，作为企业高层进行决策的参考，通常被称为OLAP（On-Line Analytical Processing，联机分析处理）。

从功能角度来看，OLTP负责基本业务的正常运转，而业务数据积累时所产生的价值信息则被OLAP不断呈现，企业高层通过参考这些信息会不断调整经营方针，也会促进基础业务的不断优化，这是OLTP与OLAP最根本的区别（其他OLTP与OLAP的差别各位可以自行网上搜索，这里不再啰嗦）。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/bigdata/oltpandolap/diff-4.png')" alt="wxmp">

OLTP与OLAP

OLAP不应该对OLTP产生任何影响，（理想情况下）OLTP应该完全感觉不到OLAP的存在。

## 数据仓库(OLAP)与数据库(OLTP)的区别

**OLAP(数据仓库）**：分析型处理，联机分析处理。

**OLTP(数据库）**：操作型处理，联机事务处理。

**注意**：数据仓库的出现不能取代数据库的存在。

## 区别：

### **OLAP**：
A指的是分析联机分析处理面向分析指的就是数据仓库，例如Apache Hive Apche lmpala。存储的是历史数据数据仓库有意引入冗余，根据需求进行分析

### **OLTP**：
T事务联机事务处理面向事务面向业务指的就是关系型数据库（RDBMS）：Mysql Oracle nosql（注意不是非关系型数据库）：redis mongodb存储的是业务数据避免沉余**注意**：数据仓库，是在数据库大量存在的情况下，为了进一步挖掘数据资源，为了决策需要而产生，它绝不是大型数据库，只是对数据进行清洗处理分析，不会对数据发生改变。

## 数仓的分层架构：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/bigdata/oltpandolap/diff-5.png')" alt="wxmp">

**因为数据仓库本身不生产数据不消费数据按照数据的流入流出进行分层。**

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/bigdata/oltpandolap/diff-6.png')" alt="wxmp">

**ODS**：临时存储层，一般不用于直接开屏数据分析该层的数据来自各个不同数据源之间可能会存在差异。

**DW**：数据仓库层，也称之为细节层，其数据来自于ODS层经过ETL而来。当中的数据呈现这主题的特性，特性一般都是统一规则干净清晰的。

**DA**：数据应用层，最终消费使用数据，其数据来自于DW。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/bigdata/oltpandolap/diff-7.png')" alt="wxmp">

## 总结：

**数仓分层的优势**：

解耦合，分布式执行，降低出问题的风险。

用空间换时间，用多步换取最终使用的数据高效性。


## 参考文章
* https://baijiahao.baidu.com/s?id=1611554859260686629&wfr=spider&for=pc
* https://baijiahao.baidu.com/s?id=1670814690089912971&wfr=spider&for=pc