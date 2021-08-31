---
title: Hadoop-核心组件架构
---

::: tip
本文主要是介绍 Hadoop-核心组件架构 。
:::

[[toc]]


## Hadoop-架构总结

### 1 hadoop1.0时期架构

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ds/ecology/archi-1.png')" alt="wxmp">

### 2 hadoop2.0时期架构

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ds/ecology/archi-2.png')" alt="wxmp">

### 3 hdfs架构

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ds/ecology/archi-3.png')" alt="wxmp">

【Active Namenode】：主 Master（只有一个），管理 HDFS 的名称空间，管理数据块映射信息；配置副本策略；处理客户端读写请求

【Secondary NameNode】：NameNode 的热备；定期合并 fsimage 和 fsedits，推送给 NameNode；当 Active NameNode 出现故障时，快速切换为新的 Active NameNode。

【Datanode】：Slave（有多个）；存储实际的数据块；执行数据块读 / 写

【Client】：与 NameNode 交互，获取文件位置信息；与 DataNode 交互，读取或者写入数据；管理 HDFS、访问 HDFS。

### 4 MapReduce架构

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ds/ecology/archi-4.png')" alt="wxmp">

或

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ds/ecology/archi-5.png')" alt="wxmp">

或

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ds/ecology/archi-6.png')" alt="wxmp">

或

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ds/ecology/archi-7.png')" alt="wxmp">

### 5 yarn架构

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ds/ecology/archi-8.png')" alt="wxmp">

### 6 hadoop1.0与hadoop2.0比较图

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ds/ecology/archi-9.png')" alt="wxmp">

参考网址：

http://blog.csdn.net/babyfish13/article/details/52527665

http://www.cnblogs.com/sharpxiajun/p/3151395.html




## 参考文章
* https://www.cnblogs.com/zhangwuji/p/7594725.html
* https://www.cnblogs.com/zzlchn/p/6254435.html