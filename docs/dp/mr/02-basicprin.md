---
title: MapReduce-基本工作原理
---

::: tip
本文主要是介绍 MapReduce-基本工作原理 。
:::

[[toc]]

## MapReduce的基本工作原理



## MapReduce的基本模型和处理思想：

三个层面上的基本构思

### 1.如果对付大数据处理：分而治之

对相互之间不具有计算依赖关系的大数据，实现并行最自然的办法就是采取分而治之的策略。

### 2.上升到抽象模型：Mapper与Reduce

MPI等并行计算方法缺少高层并行编程模型，程序员需要自行指定存储，计算，分发等任务，为了克服这一缺陷，MapReduce借鉴了Lisp函数式语言中的思想，用Map和Reduce两个函数提供了高层的并发编程模型抽象。

### 3.上升到架构：
统一架构，为程序员隐藏系统层细节

​    MPI等并行计算方法缺少统一的计算框架支持，程序员需要考虑数据存储、划分、分发、结果收集、错误恢复等诸多细节；为此,MapReduce设计并提供了同意的计算框架，为程序员隐藏了绝大多数系统层面的处理系统。

### 大数据分而治之

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dp/mr/basicprin-1.png')" alt="wxmp">

建立Map和Reduce抽象模型

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dp/mr/basicprin-2.png')" alt="wxmp">

借鉴函数式程序设计语言Lisp中的思想，定义了Map和Reduce两个抽象的操作函数：


``` c
- Map:(k1:v1)->[(k2:v2)]
- Reduce:(k2:[v2])->[(k3:v3)]
```
每个map都处理结构、大小相同的初始数据块，也就是（k1:v1）,其中k1是主键，可以是数据块索引，也可以是数据块地址；

v1是数据。经过Map节点的处理后，生成了很多中间数据集，用[]表示数据集的意思。而Reduce节点接收的数据是对中间数据合并后的数据，也就是把key值相等的数据合并在一起了，即(k2:[v2])；再经过Reduce处理后，生成处理结果。

### 例如要把一个统计一篇英语文章中各个单词出现的次数

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dp/mr/basicprin-3.png')" alt="wxmp">

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dp/mr/basicprin-4.png')" alt="wxmp">

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dp/mr/basicprin-5.png')" alt="wxmp">

1.有一个待处理的大数据，被划分成大小相同的数据库(如64MB)，以及与此相应的用户作业程序。

2.系统中有一个负责调度的主节点(Master)，以及数据Map和Reduce工作节点(Worker).

3.用户作业提交个主节点。

4.主节点为作业程序寻找和配备可用的Map节点，并将程序传送给map节点。

5.主节点也为作业程序寻找和配备可用的Reduce节点，并将程序传送给Reduce节点。

6.主节点启动每一个Map节点执行程序，每个Map节点尽可能读取本地或本机架的数据进行计算。(实现代码向数据靠拢，减少集群中数据的通信量)。

7.每个Map节点处理读取的数据块，并做一些数据整理工作(combining,sorting等)并将数据存储在本地机器上；同时通知主节点计算任务完成并告知主节点中间结果数据的存储位置。

8.主节点等所有Map节点计算完成后，开始启动Reduce节点运行；Reduce节点从主节点所掌握的中间结果数据位置信息，远程读取这些数据。

9.Reduce节点计算结果汇总输出到一个结果文件，即获得整个处理结果。


## 参考文章
* https://blog.csdn.net/fanxin_i/article/details/80388221