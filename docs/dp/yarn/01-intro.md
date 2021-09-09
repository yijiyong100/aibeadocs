---
title: Yarn-基础知识介绍
---

::: tip
本文主要是介绍 Yarn-基础知识 。
:::

[[toc]]

## 一.Yarn简介

在古老的 Hadoop1.0 中，MapReduce 的 JobTracker 负责了太多的工作，包括资源调度，管理众多的 TaskTracker 等工作。这自然是不合理的，于是 Hadoop 在 1.0 到 2.0 的升级过程中，便将 JobTracker 的资源调度工作独立了出来，而这一改动，直接让 Hadoop 成为大数据中最稳固的那一块基石。，而这个独立出来的资源管理框架，就是 Yarn 。

在详细介绍 Yarn 之前，我们先简单聊聊 Yarn ，Yarn 的全称是 ** Yet Another Resource Negotiator**，意思是“另一种资源调度器”，这种命名和“有间客栈”这种可谓是异曲同工之妙。这里多说一句，以前 Java 有一个项目编译工具，叫做 Ant，他的命名也是类似的，叫做 “Another Neat Tool”的缩写，翻译过来是”另一种整理工具“。

Yarn原理图:



<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dp/yarn/intro-1.png')" alt="wxmp">

image.png

## 二.Yarn基本服务组件

YARN 总体上是 master/slave 结构，在整个资源管理框架中，ResourceManager 为 master，NodeManager 是 slave。

YARN的基本组成结构，YARN 主要由 ResourceManager、NodeManager、ApplicationMaster 和 Container 等几个组件构成。

ResourceManager是Master上一个独立运行的进程，负责集群统一的资源管理、调度、分配等等；
 NodeManager是Slave上一个独立运行的进程，负责上报节点的状态；
 ApplicationMaster相当于这个Application的监护人和管理者，负责监控、管理这个Application的所有Attempt在cluster中各个节点上的具体运行，同时负责向Yarn ResourceManager申请资源、返还资源等；
 Container是yarn中分配资源的一个单位，包涵内存、CPU等等资源，YARN以Container为单位分配资源；

CDH上Yarn的组件信息:



<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dp/yarn/intro-2.png')" alt="wxmp">


image.png

jobhistory组件详细的记录了各类job运行的日志，需要查找报错信息一般是这边查看

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dp/yarn/intro-3.png')" alt="wxmp">

image.png

## 三.Yarn工作的过程

Application在Yarn中的执行过程，整个执行过程可以总结为三步：

1. 应用程序提交
2. 启动应用的ApplicationMaster实例
3. ApplicationMaster 实例管理应用程序的执行

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dp/yarn/intro-4.png')" alt="wxmp">

image.png

## 参考

1.Hadoop权威指南
 2.[https://zhuanlan.zhihu.com/p/54192454?utm_source=qq](https://links.jianshu.com/go?to=https%3A%2F%2Fzhuanlan.zhihu.com%2Fp%2F54192454%3Futm_source%3Dqq)
 3.https://www.jianshu.com/p/f50e85bdb9ce
 4.[https://www.cnblogs.com/yehuili/p/9946010.html](https://links.jianshu.com/go?to=https%3A%2F%2Fwww.cnblogs.com%2Fyehuili%2Fp%2F9946010.html)


## 参考文章
* https://www.jianshu.com/p/1c416910fc40