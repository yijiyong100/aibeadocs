---
title: Sklearn-基础入门介绍
---

::: tip
本文主要是介绍 Sklearn-基础入门介绍 。
:::

[[toc]]

## sklearn 【对传统的机器学习和数据挖掘比较友好】

SciKit learn的简称是SKlearn，是一个开源的python库，专门用于机器学习、数据挖掘和数据分析的模块。它建立在 NumPy ，SciPy 和 matplotlib 上。


来源：https://www.zhihu.com/question/53740695

Tensorflow和Caffe、MXNet等是针对深度学习特制的工具包，而Scikit-learn是对传统的机器学习，包括预处理，特征工程，模型构建，验证等的完整实现。这两类工具压根不是做同一件事的。

说实话，即使现在深度学习大行其道，很多时候你还是要用传统机器学习方法解决问题的。首先不是每个人都有一个彪悍的电脑/服务器，其次，大多数问题真的不需要深度网络。最后，只会调用工具包的程序员不是好的机器学习者。



## sklearn 官方文档和网站

scikit-learn 中文社区官网： https://scikit-learn.org.cn/

[scikit-learn 中文社区官网](https://scikit-learn.org.cn/)

### 分类
标识对象所属的类别。

- 应用范围： 垃圾邮件检测，图像识别。
- 算法： SVM 最近邻 随机森林 


<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ad/sklearn/intro-1.png')" alt="wxmp">


### 回归
预测与对象关联的连续值属性。
- 应用范围： 药物反应，股票价格。
- 算法： SVR 最近邻 随机森林 

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ad/sklearn/intro-2.png')" alt="wxmp">

### 聚类
自动将相似对象归为一组。

- 应用： 客户细分，分组实验成果。
- 算法： K-均值 谱聚类 MeanShift

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ad/sklearn/intro-3.png')" alt="wxmp">

### 降维
减少要考虑的随机变量的数量。

- 应用： 可视化，提高效率。
- 算法： K-均值 特征选择 非负矩阵分解

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ad/sklearn/intro-4.png')" alt="wxmp">

### 模型选择
比较，验证和选择参数和模型。

- 应用： 通过参数调整改进精度。
- 算法： 网格搜索 交叉验证 指标

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ad/sklearn/intro-5.png')" alt="wxmp">

### 预处理
特征提取和归一化。

- 应用程序： 转换输入数据，例如文本，以供机器学习算法使用。
- 算法： 预处理 特征提取

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ad/sklearn/intro-6.png')" alt="wxmp">



### 官网用户指南

- 1.有监督学习

  -  [1.1 线性模型](https://scikit-learn.org.cn/view/4.html)

  -  [1.2 线性和二次判别分析](https://scikit-learn.org.cn/view/77.html)

  -  [1.3 内核岭回归](https://scikit-learn.org.cn/view/80.html)

  -  [1.4 支持向量机](https://scikit-learn.org.cn/view/83.html)

  -  [1.5 随机梯度下降](https://scikit-learn.org.cn/view/84.html)

  -  [1.6 最近邻](https://scikit-learn.org.cn/view/85.html)

  -  [1.7 高斯过程](https://scikit-learn.org.cn/view/86.html)

  -  [1.8 交叉分解](https://scikit-learn.org.cn/view/87.html)

  -  [1.9 朴素贝叶斯](https://scikit-learn.org.cn/view/88.html)

  -  [1.10 决策树](https://scikit-learn.org.cn/view/89.html)

  -  [1.11 集成算法](https://scikit-learn.org.cn/view/90.html)

  -  [1.12 多类和多标签算法](https://scikit-learn.org.cn/view/91.html)

  -  [1.13 特征选择](https://scikit-learn.org.cn/view/101.html)

  -  [1.14 半监督学习](https://scikit-learn.org.cn/view/102.html)

  -  [1.15 Isotonic回归](https://scikit-learn.org.cn/view/103.html)

  -  [1.16 概率校准](https://scikit-learn.org.cn/view/104.html)

  -  [1.17 神经网络模型(有监督)](https://scikit-learn.org.cn/view/105.html)

- 2.无监督学习


  -  [2.1. 高斯混合模型](https://scikit-learn.org.cn/view/106.html)

  -  [2.2. 流形学习](https://scikit-learn.org.cn/view/107.html)

  -  [2.3. 聚类](https://scikit-learn.org.cn/view/108.html)

  -  [2.4. 双聚类](https://scikit-learn.org.cn/view/109.html)

  -  [2.5. 分解成分中的信号（矩阵分解问题）](https://scikit-learn.org.cn/view/110.html)

  -  [2.6. 协方差估计](https://scikit-learn.org.cn/view/111.html)

  -  [2.7. 奇异值和异常值检测](https://scikit-learn.org.cn/view/112.html)

  -  [2.8. 密度估计](https://scikit-learn.org.cn/view/113.html)

  -  [2.9. 神经网络模型（无监督）](https://scikit-learn.org.cn/view/114.html)

- 3.模型选择与评估


  -  [3.1 交叉验证：评估模型表现](https://scikit-learn.org.cn/view/6.html)

  -  [3.2 调整估计器的超参数](https://scikit-learn.org.cn/view/99.html)

  -  [3.3 指标和评分：量化预测的质量](https://scikit-learn.org.cn/view/93.html)

  -  [3.4 模型持久性](https://scikit-learn.org.cn/view/92.html)

  -  [3.5 验证曲线：绘制分数以评估模型](https://scikit-learn.org.cn/view/116.html)

- 4.检验

  -  [4.1 部分依赖图](https://scikit-learn.org.cn/view/15.html)

  -  [4.2基于排列的特征重要性](https://scikit-learn.org.cn/view/117.html)

- 5.可视化

  -  [5.1 提供的绘图工具](https://scikit-learn.org.cn/view/95.html)

- 6.数据集转换

  -  [6.1 管道和复合估算器](https://scikit-learn.org.cn/view/118.html)

  -  [6.2 特征提取](https://scikit-learn.org.cn/view/122.html)

  -  [6.3 数据预处理](https://scikit-learn.org.cn/view/123.html)

  -  [6.4 缺失值插补](https://scikit-learn.org.cn/view/124.html)

  -  [6.5 无监督降维](https://scikit-learn.org.cn/view/125.html)

  -  [6.6 随机投影](https://scikit-learn.org.cn/view/126.html)

  -  [6.7 内核近似](https://scikit-learn.org.cn/view/127.html)

  -  [6.8 成对度量，近似关系和内核](https://scikit-learn.org.cn/view/128.html)

  -  [6.9 转换预测目标（y）](https://scikit-learn.org.cn/view/129.html)

- 7.数据集加载实用程序
- 
  -  [7 数据集加载工具](https://scikit-learn.org.cn/view/121.html)

- 8.使用scikit-learn计算

  -  [8.1. 大数据的计算策略](https://scikit-learn.org.cn/view/130.html)

  -  [8.2. 计算性能](https://scikit-learn.org.cn/view/131.html)

  -  [8.3. 并行, 资源管理和配置](https://scikit-learn.org.cn/view/132.html)


## 【----------------------------】

## Python之（scikit-learn）机器学习

## 机器学习 定义
一、机器学习(Machine Learning, ML)是一门多领域交叉学科，涉及概率论、统计学、[逼近论](https://baike.baidu.com/item/逼近论/967006)、[凸分析](https://baike.baidu.com/item/凸分析)、[算法复杂度](https://baike.baidu.com/item/算法复杂度)理论等多门学科。专门研究计算机怎样模拟或实现人类的学习行为，以获取新的知识或技能，重新组织已有的知识结构使之不断改善自身的性能。

简而言之，机器学习就是通过一系列变种的数据公式，通过**大量的数据**推导，得出的接近于满足数据点的一个**公式**（f(x) = w1x1 + w2x2^2 + w3x3^3 + ...），然后需要推测的新数据，通过该公式来得出**预测的结果**。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ad/sklearn/intro-7.png')" alt="wxmp">

记住上面这个图，他是后续**选择算法**的规则，也是**核心**。

## scikit-learn 介绍
二、scikit-learn(简记`sklearn`)，是用`python`实现的**机器学习算法库**。`sklearn`可以实现数据预处理、**分类、回归**、**降维、模型选择**等常用的机器学习算法。`sklearn`是基于**[`NumPy`, ](https://www.cnblogs.com/ll409546297/p/11176631.html)`matplotlib,\**`SciPy`\**`**而形成的。

scikit-learn的强大主要是它提供了很多算法库，以及数据处理的方式，学习scikit-learn很大程度上可以了解机器学习的**实现、训练、预测**过程。

## 机器学习的流程
三、在开始scikit-learn之前，我们先了解机器学习的流程：

### 1、原始数据：
原始数据可以是很多种形式（比如：图片，json，文本，table等），这些数据可以通过[**pandas**](https://www.cnblogs.com/ll409546297/p/11176631.html)来加载成一个二维数组的数据。也可以通过[**numpy**](https://www.cnblogs.com/ll409546297/p/11176631.html)的方式生成数据。

数据来源一般通过[kaggle](https://www.kaggle.com/)官方获取，地址：https://www.kaggle.com/

### 2、数据处理：
得到原始数据过后，我们需要对**数据**进行处理（比如：**数据分割**（训练集、测试集），**构造特征**（比如：时间（年份一样，月份、天构造新的特征）），删除特征（没有用的，但是存在影响的特征）等）

### 3、特征工程：
在数据进行处理过后，我们不能盲目的使用该数据（比如：文本数据，数值差异过大的数据），这个时候就要转换数据（**转换器**）。**转换器**：**字典特征、文本特征、tf_idf（数据出现频次）、归一化、标准化、降维**等，然后得出提取特征后的[**矩阵**](https://baike.baidu.com/item/矩阵/18069?fr=aladdin)数据。

### 4、算法模型：
（核心）主要分为[**监督学习**](https://baike.baidu.com/item/监督学习/9820109?fr=aladdin)和[**无监督学习**](https://baike.baidu.com/item/无监督学习/810193)。机器学习的核心就是算法模型。

监督学习：**有特征值，目标值**（有标准答案）。常有算法为**分类算法**（离散型（具体的分类标准））、**回归算法**（连续型（预测值））

无监督学习：只有特征值。常有算法为**聚类。**

模型：数据在训练集和测试集上面，反复的训练过后，会得出最接近满足所有数据点的公式也称为**模型**，这个也是后续用于其他业务数据用于分类或者预测的基础。

### 5、算法评估：
分类模型：一般是通过**准确率、精准率、召回率、混淆矩阵、AUC**来确认模型的准确度，回归模型：一般是通过**均方误差**的方式来确认准确度。

## 知识点介绍：
四、通过第三点的大致介绍，基本可以了解机器学习需要掌握的**知识量**还是不小的。特别是很多**概念**，需要自己去理解。下面主要是讲具体的过程和部分原理。（注意：**算法是核心**会放到最后讲）

（1）[Python之原始数据-1](https://www.cnblogs.com/ll409546297/p/11212152.html)

（2）[Python之数据处理-2](https://www.cnblogs.com/ll409546297/p/11212717.html)

（3）[Python之特征工程-3](https://www.cnblogs.com/ll409546297/p/11213436.html)

（4）[Python之算法评估-4](https://www.cnblogs.com/ll409546297/p/11213700.html)

（5）[Python之算法模型-5.1](https://www.cnblogs.com/ll409546297/p/11215141.html)

（6）[Python之网格搜索与检查验证-5.2](https://www.cnblogs.com/ll409546297/p/11231299.html)

（7）[Python之模型的保存和加载-5.3](https://www.cnblogs.com/ll409546297/p/11248815.html)

## 源码
五、源码：
https://github.com/lilin409546297/scikit_learn_demo

## 数据下载
六、数据下载地址：

　　k_near/train.csv：https://www.kaggle.com/c/facebook-v-predicting-check-ins/data

　　decision_tree/titanic.csv：http://biostat.mc.vanderbilt.edu/wiki/pub/Main/DataSets/titanic.txt

　　market/orders.csv、order_products__prior.csv、products.csv、market/aisles.csv：https://www.kaggle.com/psparks/instacart-market-basket-analysis

　　classify_regression/breast-cancer-wisconsin.data：https://archive.ics.uci.edu/ml/machine-learning-databases/breast-cancer-wisconsin/

分类: [python](https://www.cnblogs.com/ll409546297/category/1408943.html)

标签: [python](https://www.cnblogs.com/ll409546297/tag/python/)

## 参考文章
* https://www.cnblogs.com/ll409546297/p/11211997.html
* https://scikit-learn.org.cn/