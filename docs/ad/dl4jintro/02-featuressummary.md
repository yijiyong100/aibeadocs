---
title: DL4J-特性优点总结
---

::: tip
本文主要是介绍 DL4J-特性优点总结 。
:::

[[toc]]

## Java 工程师快速入门深度学习，从 Deeplearning4j 开始

[![华为云开发者社区](https://pica.zhimg.com/v2-31e47f21cb0d425f7dfdf801537157de_xs.jpg?source=172ae18b)](https://www.zhihu.com/org/hua-wei-yun-ji-zhu-zhai-ji-di)

[华为云开发者社区](https://www.zhihu.com/org/hua-wei-yun-ji-zhu-zhai-ji-di)[](https://www.zhihu.com/question/48510028)

随着机器学习、深度学习为主要代表的人工智能技术的逐渐成熟，越来越多的 AI 产品得到了真正的落地。

无论是以语音识别和自然语言处理为基础的个人助理软件，还是以人脸识别为基础的刷脸付费系统，这些都是 AI 技术在现实生活中的实际应用。

应当说 AI 正在走进千家万户，来到你我的身边。

另一方面，从研发角度来讲，AI 产品的落地并不是一件容易的事情：

- AI 技术数学理论要求高，数理统计、神经理论与脑科学、优化理论、矩阵论……
- AI 硬件层面要求非常高，GPU、TPU、FPGA……

如何基于目前的主流研究成果和硬件，对 AI 产品进行一站式的开发？这正是当前企业工程师面临的实际痛点。

对此，多家企业及研究机构推出了自己的解决方案，如 Google 推出并开源了 TensorFlow，Facebook 主导 PyTorch 和 Caffe 2，Amazon 选择 MXNet 并打算投资围绕 MXNet 的系统，微软开发并大力推广 CNTK......

这些都是以 Python 和 C/C++ 语言为主，而在目前企业项目中，无论是 Web 应用、Andriod 开发还是大数据应用，Java 语言都占有很大的比例。

此外，我们必须看到，越来越多的从事传统 Java 应用开发的工程师尝试将 AI 技术融入到项目中，或者自身在尝试转型 AI 领域。

因此如果有类似 TensorFlow、Caffe 这些 AI 解决方案而又同时基于 Java 的，那么无疑会为项目的推进及个人的发展带来很多便利。

Deeplearning4j 正是这类解决方案中的佼佼者。

## 01 Deeplearning4j 是什么？

Deeplearning4j 是由美国 AI 创业公司 Skymind 开源并维护的一个基于 Java/JVM 的深度学习框架。

同时也是在 Apache Spark 平台上为数不多的，可以原生态支持分布式模型训练的框架之一。

此外，Deeplearning4j 还支持多 CPU/GPU 集群，可以与高性能异构计算框架无缝衔接，从而进一步提升运算性能。

在 2017 年下半年，Deeplearning4j 正式被 Eclipse 社区接收，同 Java EE 一道成为 Eclipse 社区的一员。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ad/dl4jintro/features-1.png')" alt="wxmp">

## 02 为什么选择 Deeplearning4j？

### 1. 基于 Java，专为企业应用而生

Deeplearning4j 是基于 Java 的深度学习开源框架。从实际开发的角度上，它是面向 Layer 编程的神经网络开发框架，对很多常见的神经网络结构做了高度的封装。

熟悉 Keras 的朋友可以认为 Deeplearning4j 是 Java 版本的 Keras。

同时 Deeplearning4j 也完美兼容 Scala 和 Clojure。

### 2. 丰富的开源生态圈，遵循 Apache 2.0

Deeplearning4j 也拥有自己的生态。在 Deeplearning4j 的相关开源项目中，就有专门为张量运算而开发的 ND4J 和数据处理的 DataVec。它们的作用相当于 Python 中的 NumPy 和 Pandas。

当然，除了这些项目以外，Arbiter、RL4J 等项目也大大丰富了 Deeplearning4j 的生态圈。

### 3. 与 Hadoop 和 Spark 集成，支持分布式 CPU 和 GPU

Deeplearning4j 是原生支持在 Apache Spark 上构建分布式深度学习解决方案的框架。

由于在企业的实际应用场景中，大数据的统计和存储往往会依赖 Hive/HDFS 等存储介质。

而算法模型的构建必须依赖庞大的数据，因此如果可以完成一站式的数据存储、数据提取和清洗、训练数据的构建、模型训练和调优的所有开发环节，无疑是非常理想的解决方案。

Deeplearning4j 以数据并行化为理论基础构建了分布式神经网络建模的解决方案，为大数据 + 算法的开发提供了直接的支持。

Deepleanring4j 支持多 CPU/GPU 集群的建模。就像在上文中提到的，GPU 等硬件的成熟大大加速了 AI 的发展。

Deeplearning4j 通过 JavaCPP 技术调用 cuBLAS 来实现在 GPU 上的加速建模。对于 GPU 集群的支持则需要依赖 Spark。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ad/dl4jintro/features-2.png')" alt="wxmp">

### 4. 越来越受开发人员欢迎

自 Deeplearning4j 从 2016 年左右开源以来，功能优化与新特性的丰富使得项目本身不断得到完善，在 GitHub 上的 Commiter 活跃度与 Star 数量也不断增加，使得该开源框架越来越得到国内外企业的关注。

就目前 Skymind 官网提供的信息来看，就有数十家明星企业和研发机构在部署使用 Deeplearning4j，其中就不乏有 Oracle、Cisco、IBM、软银、亚马逊、阿里巴巴等知名企业。

而随着 Deeplearning4j 在工业界的使用逐渐增多，更多的研发人员希望有一套教程可以用来辅助开发和作为参考。

## 03 Deeplearning4j 的最新进展

目前 Deeplearning4j 已经来到了 1.0.0-beta3 的阶段，马上也要发布正式的 1.0.0 版本。

这里罗列下从 0.7.0 版本到 1.0.0-alpha 版本主要新增的几个功能点：

- Spark 2.x 的支持（>0.8.0）
- 支持迁移学习（>0.8.0）
- 内存优化策略 Workspace 的引入（>0.9.0）
- 增加基于梯度共享（Gradients Sharing）策略的并行化训练方式（>0.9.0）
- LSTM 结构增加 cuDNN 的支持（>0.9.0）
- 自动微分机制的支持，并支持导入 TensorFlow 模型（>1.0.0-alpha）
- YOLO9000 模型的支持（>1.0.0-aplpha）
- CUDA 9.0 的支持（>1.0.0-aplpha）
- Keras 2.x 模型导入的支持（>1.0.0-alpha）
- 增加卷积、池化等操作的 3D 版本（>1.0.0-beta）

除此之外，在已经提及的 Issue 上，已经考虑在 1.0.0 正式版本中增加对 YOLO v3、GAN、MobileNet、ShiftNet 等成果的支持，进一步丰富 Model Zoo 的直接支持范围，满足更多开发者的需求。

## 04 学习建议

由于 AI 是一项跨多学科且对理论和工程开发都有着一定要求的技术，因此实际动手操作非常重要。

只有自己动手做过一两个项目或者参加过一些算法比赛，研发人员才会对如何做好算法项目和产品有感性的认识，而不会仅仅停留在理论层面。

踩坑虽然痛苦，但其实也是加深对理论理解的必需过程，在这个方面并没有太多捷径可走。

## 参考文章
* https://zhuanlan.zhihu.com/p/52691353