---
title: Yarn-基础参数和配置优化
---

::: tip
本文主要是介绍 Yarn-基础参数和配置优化 。
:::

[[toc]]

## Yarn的资源调优

## 一、概述

 每个job提交到yarn上执行时，都会分配Container容器去运行，而这个容器需要资源才能运行，这个资源就是Cpu和内存。

1、CPU资源调度

 目前的CPU被Yarn划分为虚拟CPU，这是yarn自己引入的概念，因为每个服务器的Cpu计算能力不一样，有的机器可能是 其他机器的计算能力的2倍，然后可以通过多配置几个虚拟内存弥补差异。在yarn中，cpu的相关配置如下。

- yarn.nodemanager.resource.cpu-vcores

  表示该节点服务器上yarn可以使用的虚拟的CPU个数，默认是8，推荐配置与核心个数相同，如果节点CPU的核心个数不足8个，需要调小这个值，yarn不会智能的去检测物理核数。如果机器性能较好，可以配置为物理核数的2倍。

- yarn.scheduler.minimum-allocation-vcores

 表示单个任务最小可以申请的虚拟核心数，默认为1

- yarn.sheduler.maximum-allocation-vcores

 表示单个任务最大可以申请的虚拟核数，默认为4；如果申请资源时，超过这个配置，会抛出 InvalidResourceRequestException

2、Memory资源调度

 yarn一般允许用户配置每个节点上可用的物理资源，可用指的是将机器上内存减去hdfs的，hbase的等等剩下的可用的内存。

- yarn.nodemanager.resource.memory-mb

 设置该节点上yarn可使用的内存，默认为8G，如果节点内存不足8G，要减少这个值，yarn不会智能的去检测内存资源，一般这个值式yarn的可用内存资源。

- yarn.scheduler.minmum-allocation-mb

 单个任务最小申请物理内存量，默认是1024M，根据自己业务设定

- yarn.scheduler.maximum-allocation-mb

 单个任务最大可以申请的物理内存量，默认为8291M

##  二、服务器参数设置

 如果一个服务器是32核，虚拟后为64核，128G内存，我们该如何设置上面的6个参数呢？即如何做到资源最大化利用

生产上我们一般要预留15-20%的内存，那么可用内存就是128*0.8=102.4G，去除其他组件的使用，我们设置成90G就可以了。

  1、yarn.sheduler.maximum-allocation-vcores

  一般就设置成4个，cloudera公司做过性能测试，如果CPU大于等于5之后，CPU的利用率反而不是很好。这个参数可以根据生成服务器决定，比如公司服务器很富裕，那就直接设置成1:1；设置成32，如果不是很富裕，可以直接设置成1:2。我们以1:2来计算。

  2、yarn.scheduler.minimum-allocation-vcores

  如果设置vcoure = 1，那么最大可以跑64/1=64个container，如果设置成这样，最小container是64/4=16个。

  3、yarn.scheduler.minmum-allocation-mb

  如果设置成2G，那么90/2=45最多可以跑45个container，如果设置成4G，那么最多可以跑24个；vcore有些浪费。

 4、yarn.scheduler.maximum-allocation-mb

 这个要根据自己公司的业务设定，如果有大任务，需要5-6G内存，那就设置为8G，那么最大可以跑11个container。




## 【----------------------------】

## Yarn参数优化(Fair Scheduler版本)

### YARN

自从hadoop2.0之后, 我们可以使用apache yarn 来对集群资源进行管理。yarn把可以把资源（内存,CPU）以Container的方式进行划分隔离。YARN会管理集群中所有机器的可用计算资源. 基于这些资源YARN会调度应用(比如MapReduce)发来的资源请求, 然后YARN会通过分配Container来给每个应用提供处理能力, Container（容器）是YARN中处理能力的基本单元, 是对内存, CPU等的封装（容器）。

ResourceManager：以下简称RM。YARN的中控模块，负责统一规划资源的使用。
NodeManager:以下简称NM。YARN的资源结点模块，负责启动管理container。
ApplicationMaster:以下简称AM。YARN中每个应用都会启动一个AM，负责向RM申请资源，请求NM启动container，并告诉container做什么事情。
Container：资源容器。YARN中所有的应用都是在container之上运行的。AM也是在container上运行的，不过AM的container是RM申请的。

> 了解上面的基本概念之后，就可以开始优化集群的配置了



### 配置NM的注册资源

``` xml
<property>
<name>yarn.nodemanager.resource.cpu-vcores</name>
<value>30</value>
<discription>每个nodemanager可分配的cpu总核数</discription>
</property>
<property>
<name>yarn.nodemanager.resource.memory-mb</name>
<value>122880</value>
<discription>每个nodemanager可分配的内存总量</discription>
</property>
```

优化建议：
- 1. cpu核数=逻辑核数-其他应用数（datanode？work？zk？等）
  `cat /proc/cpuinfo | grep "processor" | wc -l`

- 2. 可以查看集群的逻辑核数2. 内存建议是CPU的整数倍，给系统预留好足够用的内存



### ApplicationMaster配置
``` xml
<property>
<name>yarn.app.mapreduce.am.resource.cpu-vcores</name>
<value>1</value>
</property>
<property>
<name>yarn.app.mapreduce.am.resource.mb</name>
<value>4096</value>
<discription>ApplicationMaster的占用的内存大小</discription>
</property>
```
优化建议1. cpu和内存比

例和 nm的分配比例保持一致



### Container 配置优化
``` xml
<property>
<name>yarn.scheduler.maximum-allocation-mb</name>
<value>16384</value>
<discription>单个任务可申请最大内存，默认8192MB</discription>
</property>
<property>
<name>yarn.scheduler.maximum-allocation-vcores</name>
<value>4</value>
<discription>单个任务可申请的最多虚拟CPU个数</discription>
</property>
<property>
<name>yarn.scheduler.minimum-allocation-vcores</name>
<value>1</value>
<discription>单个任务可申请的最小虚拟CPU个数</discription>
</property>
<property>
<name>yarn.scheduler.minimum-allocation-mb</name>
<value>4096</value>
<discription>container最小可申请的内存</discription>
</property>
```
优化建议
- 1. 在调度器中，很多资源计算部分会转化为这个最小值的N倍进行计算。所以，设定可分配内存等资源的时候，最好是刚好为这个最小值的倍数
- 2. cpu/内存比例保持一致
- 3. YARN采用了线程监控的方法判断任务是否超量使用内存，一旦发现超量，则直接将其杀死。由于Cgroups对内存的控制缺乏灵活性（即任务任何时刻不能超过内存上限，如果超过，则直接将其杀死或者报OOM），而Java进程在创建瞬间内存将翻倍，之后骤降到正常值，这种情况下，采用线程监控的方式更加灵活（当发现进程树内存瞬间翻倍超过设定值时，可认为是正常现象，不会将任务杀死），因此YARN未提供Cgroups内存隔离机制来控制容器。



### mapreduce参数设置
``` xml
<property>
<name>mapreduce.map.memory.mb</name>
<value>4096</value>
<discription>map的内存大小</discription>
</property>
<property>
<name>mapreduce.map.java.opts</name>
<value>-Xmx3072M</value>
<discription>用户设定的map/reduce阶段申请的container的JVM参数。最大堆设定要比申请的内存少一些，用于JVM的非堆部分使用0.80-0.85建议</discription>
</property>
<property>
<name>mapreduce.reduce.memory.mb</name>
<value>8192</value>
</property>
<property>
<name>mapreduce.reduce.java.opts</name>
<value>-Xmx6144M</value>
</property>
```
优化参考
- 1. 如果集群主要使用mr进行计算，那么建议map的内存和cpu和容器最小的相等。
- 2. 一个容器里面最多跑几个map？yarn.scheduler.maximum-allocation-mb/mapreduce.map.memory.mb=4

问题来了,如何控制一个nodemanager里Container的数量呢？

``` xml
<property>
<name>yarn.scheduler.fair.assignmultiple</name>
<value>true</value>
<discription>是否允许NodeManager一次分配多个容器</discription>
</property>
<property>
<name>yarn.scheduler.fair.max.assign</name>
<value>20</value>
<discription>如果允许一次分配多个,一次最多可分配多少个,这里按照一个最小分配yarn.scheduler.minimum-allocation-mb4gb来计算总共内存120/4=30给20即可</discription>
</property>
```



### Fari Scheduler 配置案例

24个节点每个节点120GB内存30个逻辑CPU

``` xml
<?xml version="1.0"?>
<allocations>
<queue name="mapreduce">
<minResources>368640 mb,90 vcores</minResources><!--3 nodes-->
<maxResources>2334720 mb,570 vcores</maxResources><!--19 nodes-->
<maxRunningApps>70</maxRunningApps>
<weight>5</weight>
<queue name="vipquery">
<minResources>122880 mb,30 vcores</minResources><!--1 nodes-->
<maxResources>1966080 mb,480 vcores</maxResources><!--16 nodes-->
<maxRunningApps>20</maxRunningApps>
<weight>8</weight>
</queue>
<queue name="hive">
<minResources>122880 mb,30 vcores</minResources><!--1 nodes-->
<maxResources>1966080 mb,480 vcores</maxResources><!--16 nodes-->
<maxRunningApps>20</maxRunningApps>
<weight>7</weight>
</queue>
<queue name="hadoop">
<minResources>122880 mb,30 vcores</minResources><!--1 nodes-->
<maxResources>1966080 mb,480 vcores</maxResources><!--16 nodes-->
<maxRunningApps>30</maxRunningApps>
<weight>6</weight>
</queue>
</queue>
<queue name="default">
<minResources>122880 mb,30 vcores</minResources><!--1 nodes-->
<maxResources>614400 mb,150 vcores</maxResources><!--5 nodes-->
<maxRunningApps>20</maxRunningApps>
<weight>1</weight>
</queue>
</allocations>
```

## 总结

通过合理的配置Yarn可以有效的控制，资源抢占，还有峰值并发等问题。

## 参考文章
* https://www.cnblogs.com/chhyan-dream/p/12031311.html
* https://www.cnblogs.com/qfdy123/p/13500859.html