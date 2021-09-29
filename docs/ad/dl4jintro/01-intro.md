---
title: DL4J-入门知识介绍
---

::: tip
本文主要是介绍 DL4J-入门基础知识 。
:::

[[toc]]

## Deeplearning4j 概述

DeepLearning4J（DL4J）是一套基于**Java语言的神经网络工具包**，可以构建、定型和部署神经网络。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ad/dl4jintro/intro-1.png')" alt="wxmp">

DeepLearning4J（DL4J）对于**Java开发者**开发人工智能应用比较友好。

DL4J与Hadoop和[Spark](https://link.zhihu.com/?target=https%3A//deeplearning4j.org/cn/spark)集成，支持分布式CPU和GPU，为商业环境（而非研究工具目的）所设计。[Skymind](https://link.zhihu.com/?target=http%3A//www.skymind.ai/%3F__hstc%3D3042607.a7ccacb889310ae8ee9e75399d132dd6.1464754825987.1480748718367.1480752621996.152%26__hssc%3D3042607.4.1480752621996%26__hsfp%3D4201184654)是DL4J的商业支持机构。

Deeplearning4j拥有先进的技术，以即插即用为目标，通过更多预设的使用，避免多余的配置，让非企业也能够进行快速的原型制作。DL4J同时可以规模化定制。DL4J遵循Apache 2.0许可协议，一切以其为基础的衍生作品均属于衍生作品的作者。

## **DL4J 的功能**

Deeplearning4j包括了分布式、多线程的深度学习框架，以及普通的单线程深度学习框架。定型过程以集群进行，也就是说，Deeplearning4j可以快速处理大量数据。神经网络可通过[迭代化简]平行定型，与 Java、 [Scala](https://link.zhihu.com/?target=http%3A//nd4j.org/scala.html) 和 [Clojure](https://link.zhihu.com/?target=https%3A//github.com/wildermuthn/d4lj-iris-example-clj/blob/master/src/dl4j_clj_example/core.clj) 均兼容。Deeplearning4j在开放堆栈中作为模块组件的功能，使之成为首个为[微服务架构](https://link.zhihu.com/?target=http%3A//microservices.io/patterns/microservices.html)打造的深度学习框架。



### **DL4J 有那个神经网络？**

目前（2017年4月，因为Skymind团队有逐步增加不同的神经网络）有：

- 1. 受限玻尔兹曼机
- 2. 卷积网络
- 3. 循环网络/LSTMs
- 4. 深度置信网络
- 5. 深度自动编码器
- 6. 递归神经传感器网络
- 7. 堆叠式降噪自动编码器
- 8. 深度增强学习
- 9. 迁移学习



### **DL4J 可以在哪里运行？**

过去几年里，DL4J已获得以下机构的认证：

- Cloudera CDH
- Hortonwork HDP
- NVIDIA CUDA
- Hadoop
- Hadoop Yarn
- Apache Spark
- Apache Flink
- Canonical
- Reactive Platform





## **DL4J 平台解剖**

DL4J 不只是一个深度学习库，它拥有完整的生态，让你从各类浅层网络（其中每一层在英文中被称为layer）出发，设计深层神经网络。这一灵活性使用户可以根据所需，在分布式、生产级、能够在分布式CPU或GPU的基础上与Spark和Hadoop协同工作的框架内。此处为我们已经建立的各个库及其在系统整体中的所处位置：





<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ad/dl4jintro/intro-2.png')" alt="wxmp">

### **DATAVEC**

神经网络专门处理多维数组形式的数值数据。DataVec可以将来自一个CSV文件或一批图像的数据序列化，转换为数值数组。数据的摄取、清理、联接、缩放、标准化和转换是开展任何类型的数据分析时都必须完成的工作。这类工作可能有些无趣，但却是深度学习的先决条件。DataVec是专为这一流程设计的工具包。数据科学家和开发人员可以用其中的工具将图像、视频、声音、文本和时间序列等原始数据转变为特征向量，输入神经网络。

- 数据的的 ETL （抽取、转换、装载）和向量化
- DataVec帮助克服机器学习及深度学习实现过程中最重大的障碍之一：将数据转化为神经网络能够识别的格式
- DataVec使用Apache [Spark](https://link.zhihu.com/?target=https%3A//spark.apache.org/)来进行转换运算。
- 开源工具 ASF 2.0许可证：[github.com/deeplearning4j/DataVec](https://link.zhihu.com/?target=https%3A//github.com/deeplearning4j/datavec)
- 想了解更多关于DataVec的可以点击[这里](https://link.zhihu.com/?target=https%3A//deeplearning4j.org/cn/datavec)

### **DL4J**

算法库：DeepLearning4J用于设计神经网络：

- DL4J与Hadoop和Spark集成，为商业环境（而非研究工具目的）所设计。
- 支持并行迭代算法架构
- DeepLearning4J的JavaDoc可在[此处](https://link.zhihu.com/?target=http%3A//deeplearning4j.org/doc/)获取
- DeepLearning4J示例的Github代码库请见[此处](https://link.zhihu.com/?target=https%3A//github.com/deeplearning4j/dl4j-examples)。相关示例的简介汇总请见[此处](https://link.zhihu.com/?target=https%3A//deeplearning4j.org/cn/examples-tour)。
- 开源工具 ASF 2.0许可证：[github.com/deeplearning4j/deeplearning4j](https://link.zhihu.com/?target=https%3A//github.com/deeplearning4j/deeplearning4j)

### **ND4J**

ND4J是DeepLearning4J的数值处理库和张量库，在JVM中实现NumPy的功能：

- [ND4J](https://link.zhihu.com/?target=http%3A//nd4j.org/) 是 Java 科学运算引擎，用来驱动矩阵操作。
- JavaCPP功能: Java 到 Objective-C 的桥，可像其他 Java 对象一样来使用 Objective-C 对象。
- CPU 后瑞：OpenMP、OpenBlas 或 MKL、与SIMD的扩展
- GPU 后瑞：最新CUDA 及 CuDNN
- ND4J的JavaDoc可在[此处](https://link.zhihu.com/?target=http%3A//nd4j.org/doc/)获取。
- ND4J示例请见[此处](https://link.zhihu.com/?target=https%3A//github.com/deeplearning4j/dl4j-examples/tree/master/nd4j-examples)。
- 开源工具 ASF 2.0许可证：[github.com/deeplearning4j/nd4j](https://link.zhihu.com/?target=https%3A//github.com/deeplearning4j/nd4j)

### **ARBITER**

Arbiter帮助您搜索超参数空间，为神经网络寻找最理想的参数组合及架构。这非常重要，因为寻找恰当的架构和超参数是一个很大的组合问题。来自微软研发部等企业实验室的ImageNet大赛获胜团队正是通过搜索超参数空间才得出了ResNet这样的150层神经网络：

- 深度学习模型检测、评估器

- 调整及优化机器学习模型

- 使用Grid search和Random Search 作超参数寻优

- 开源工具 ASF 2.0许可证：[github.com/deeplearning4j/Arbiter](https://link.zhihu.com/?target=https%3A//github.com/deeplearning4j/Arbiter)

- - [arbiter-core](https://link.zhihu.com/?target=https%3A//github.com/deeplearning4j/Arbiter/tree/master/arbiter-core)：Aribter-core用网格搜索等算法来搜索超参数空间。它会提供一个GUI界面。
  - [arbiter-deeplearning4j](https://link.zhihu.com/?target=https%3A//github.com/deeplearning4j/Arbiter/tree/master/arbiter-deeplearning4j)：Arbiter可以同DL4J模型互动。在进行模型搜索时，您需要能运行模型。这样可以对模型进行试点，进而找出最佳的模型。



## **其他组件**

- Keras Model Import（Keras模型导入）帮助用户将已定型的Python和Keras模型导入DeepLearning4J和Java环境。参考[模型导入](https://link.zhihu.com/?target=https%3A//deeplearning4j.org/cn/%23modelimport)

- DL4J-Examples（DL4J示例）包含图像、时间序列及文本数据分类与聚类的工作示例。

  - Github 上的[DL4J 实例](https://link.zhihu.com/?target=https%3A//github.com/deeplearning4j/dl4j-examples)

- ScalNet是受Keras启发而为Deeplearning4j开发的Scala语言包装。它通过Spark在多个GPU上运行。

  - ScalNet针对Scala语言开发，功能相当于Keras。它是DeepLearning4J的Scala语言包装，可以在多个GPU上运行Spark。
  - [Github上的ScalNet代码库](https://link.zhihu.com/?target=https%3A//github.com/deeplearning4j/ScalNet)

- RL4J用于在JVM上实现深度Q学习、A3C及其他强化学习算法。

- - RL4J是在Java中实现深度Q学习、A3C及其他强化学习算法的库和环境，与DL4J和ND4J相集成。

  - Github代码库：

  - - [RL4J](https://link.zhihu.com/?target=https%3A//github.com/deeplearning4j/rl4j)
    - [Gym集成](https://link.zhihu.com/?target=https%3A//github.com/deeplearning4j/rl4j/tree/master/rl4j-gym)
    - [RL4J玩《Doom》](https://link.zhihu.com/?target=https%3A//github.com/deeplearning4j/rl4j/tree/master/rl4j-doom)

## 参考文章
* https://zhuanlan.zhihu.com/p/26389690