---
title: Zookeeper-应用场景
---

::: tip
本文主要是介绍 Zookeeper-应用场景 。
:::

[[toc]]

## Zookeeper 5、Zookeeper应用场景

## 应用场景1 、统一命名服务

分布式应用中，通常需要有一套完整的命名规则，既能够产生唯一的名称又便于人识别和记住，通常情况
下用树形的名称结构是一个理想的选择，树形的名称结构是一个有层次的目录结构，既对人友好又不会重复。
　　  
Name Service 是 Zookeeper 内置的功能，只要调用 Zookeeper 的 API 就能实现

## 应用场景2 、配置管理

配置的管理在分布式应用环境中很常见，例如同一个应用系统需要多台 PC Server 运行，但是它们运行的应用系统的某些配置项是相同的，如果要修改这些相同的配置项，那么就必须同时修改每台运行这个应用系统的 PC Server，这样非常麻烦而且容易出错。

将配置信息保存在 Zookeeper 的某个目录节点中，然后将所有需要修改的应用机器监控配置信息的状态，一旦配置信息发生变化，每台应用机器就会收到Zookeeper的通知，然后从 Zookeeper 获取新的配置信息应用到系统中。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/middleware/zookeeper/appscene-1.png')" alt="wxmp">


## 应用场景 3、集群管理　

Zookeeper 能够很容易的实现集群管理的功能，如有多台 Server 组成一个服务集群，那么必须要一个“总管”知道当前集群中每台机器的服务状态，一旦有机器不能提供服务，集群中其它集群必须知道，从而做出调整重新分配服务策略。同样当增加集群的服务能力时，就会增加一台或多台 Server，同样也必须让“总管”知道。

Zookeeper 不仅能够维护当前的集群中机器的服务状态，而且能够选出一个“总管”，让这个总管来管理集群，这就是 Zookeeper 的另一个功能 LeaderElection

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/middleware/zookeeper/appscene-2.png')" alt="wxmp">

规定编号最小的为master,所以当我们对SERVERS节点做监控的时候，得到服务器列表，只要所有集群机器逻辑认为最小编号节点为master，那么master就被选出，而这个master宕机的时候，相应的znode会消失，然后新的服务器列表就被推送到客户端，然后每个节点逻辑认为最小编号节点为master，这样就做到动态master选举

## 总结

Zookeeper 作为 Hadoop 项目中的一个子项目，是Hadoop 集群管理的一个必不可少的模块，它主要用来控制集群中的数据，如它管理 Hadoop集群中的NameNode，还有 Hbase 中 Master Election、Server 之间状态同步等。

Zoopkeeper 提供了一套很好的分布式集群管理的机制，就是它这种基于层次型的目录树的数据结构，并对树中的节点进行有效管理，从而可以设计出多种多样的分布式的数据管理模型

## 参考文章
* https://www.cnblogs.com/raphael5200/p/5289768.html