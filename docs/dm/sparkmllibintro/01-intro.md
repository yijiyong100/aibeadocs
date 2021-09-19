---
title: SparkMLLib-基础知识简介
---

::: tip
本文主要是介绍 SparkMLLib-基础知识简介 。
:::

[[toc]]

## Spark MLlib简介

Spark之所以在机器学习方面具有得天独厚的优势，有以下几点原因：

（1）机器学习算法一般都有很多个步骤迭代计算的过程，机器学习的计算需要在多次迭代后获得足够小的误差或者足够收敛才会停止，迭代时如果使用Hadoop的MapReduce计算框架，每次计算都要读/写磁盘以及任务的启动等工作，这回导致非常大的I/O和CPU消耗。而Spark基于内存的计算模型天生就擅长迭代计算，多个步骤计算直接在内存中完成，只有在必要时才会操作磁盘和网络，所以说Spark正是机器学习的理想的平台。

（2）从通信的角度讲，如果使用Hadoop的MapReduce计算框架，JobTracker和TaskTracker之间由于是通过heartbeat的方式来进行的通信和传递数据，会导致非常慢的执行速度，而Spark具有出色而高效的Akka和Netty通信系统，通信效率极高。

MLlib(Machine Learnig lib) 是Spark对常用的机器学习算法的实现库，同时包括相关的测试和数据生成器。Spark的设计初衷就是为了支持一些迭代的Job, 这正好符合很多机器学习算法的特点。在Spark官方首页中展示了Logistic Regression算法在Spark和Hadoop中运行的性能比较，如图下图所示。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dm/sparkmllibintro/intro-1.png')" alt="wxmp">

可以看出在Logistic Regression的运算场景下，Spark比Hadoop快了100倍以上！

## MLlib目前支持4种常见的机器学习问题: 

分类、回归、聚类和协同过滤，MLlib在Spark整个生态系统中的位置如图下图所示。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dm/sparkmllibintro/intro-2.png')" alt="wxmp">

MLlib基于RDD，天生就可以与Spark SQL、GraphX、Spark Streaming无缝集成，以RDD为基石，4个子框架可联手构建大数据计算中心！

MLlib是MLBase一部分，其中MLBase分为四部分：MLlib、MLI、ML Optimizer和MLRuntime。

l ML Optimizer会选择它认为最适合的已经在内部实现好了的机器学习算法和相关参数，来处理用户输入的数据，并返回模型或别的帮助分析的结果；

l MLI 是一个进行特征抽取和高级ML编程抽象的算法实现的API或平台；

l MLlib是Spark实现一些常见的机器学习算法和实用程序，包括分类、回归、聚类、协同过滤、降维以及底层优化，该算法可以进行可扩充；MLRuntime 基于Spark计算框架，将Spark的分布式计算应用到机器学习领域。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dm/sparkmllibintro/intro-3.png')" alt="wxmp">

## 参考文章
* https://blog.csdn.net/yimingsilence/article/details/72724408