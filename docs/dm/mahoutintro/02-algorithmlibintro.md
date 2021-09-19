---
title: Mahout-算法库介绍
---

::: tip
本文主要是介绍 Mahout-算法库介绍 。
:::

[[toc]]

 

## **mahout算法库**

　分为三大块

1、**聚类算法**

2、**协同过滤算法（一般用于推荐）**

**协同过滤算法也可以称为推荐算法!!!**

3、**分类算法**

 
<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dm/mahoutintro/algorithmlibintro-1.png')" alt="wxmp">


## 算法库汇总


| 算法类                                                                                                                                                                                                                                                                                                    | 算法名                                                                                                                                   | 中文名                                                           |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| **分类算法**                                                                                                                                                                                                                                                                                              | **[Logistic Regression](https://cwiki.apache.org/confluence/display/MAHOUT/Logistic+Regression)**                                        | 逻辑回归                                                         |
| **[Bayesian](https://cwiki.apache.org/confluence/display/MAHOUT/Bayesian)**                                                                                                                                                                                                                               | 贝叶斯                                                                                                                                   |                                                                  |
| **[Support Vector Machines](https://cwiki.apache.org/confluence/display/MAHOUT/Support+Vector+Machines)**                                                                                                                                                                                                 | 支持向量机                                                                                                                               |                                                                  |
| **[Perceptron and Winnow](https://cwiki.apache.org/confluence/display/MAHOUT/Perceptron+and+Winnow)**                                                                                                                                                                                                     | 感知器算法                                                                                                                               |                                                                  |
| **[Neural Network](https://cwiki.apache.org/confluence/display/MAHOUT/Neural+Network)**                                                                                                                                                                                                                   | 神经网络                                                                                                                                 |                                                                  |
| **[Random Forests](https://cwiki.apache.org/confluence/display/MAHOUT/Random+Forests)**                                                                                                                                                                                                                   | 随机森林                                                                                                                                 |                                                                  |
| **[Restricted Boltzmann Machines](https://cwiki.apache.org/confluence/display/MAHOUT/Restricted+Boltzmann+Machines)**                                                                                                                                                                                     | 有限波尔兹曼机                                                                                                                           |                                                                  |
| **聚类算法**                                                                                                                                                                                                                                                                                              | **[Canopy Clustering](https://cwiki.apache.org/confluence/display/MAHOUT/Canopy+Clustering)**                                            | Canopy聚类（重点）                                               |
| **[K-Means Clustering](https://cwiki.apache.org/confluence/display/MAHOUT/K-Means+Clustering)**                                                                                                                                                                                                           | K均值算法（重点）                                                                                                                        |                                                                  |
| **[Fuzzy K-Means](https://cwiki.apache.org/confluence/display/MAHOUT/Fuzzy+K-Means)**                                                                                                                                                                                                                     | 模糊K均值（重点）                                                                                                                        |                                                                  |
| **[Expectation Maximization](https://cwiki.apache.org/confluence/display/MAHOUT/Expectation+Maximization)**                                                                                                                                                                                               | EM聚类（期望最大化聚类）                                                                                                                 |                                                                  |
| **[Mean Shift Clustering](https://cwiki.apache.org/confluence/display/MAHOUT/Mean+Shift+Clustering)**                                                                                                                                                                                                     | 均值漂移聚类                                                                                                                             |                                                                  |
| **[Hierarchical Clustering](https://cwiki.apache.org/confluence/display/MAHOUT/Hierarchical+Clustering)**                                                                                                                                                                                                 | 层次聚类（重点）                                                                                                                         |                                                                  |
| **[Dirichlet Process Clustering](https://cwiki.apache.org/confluence/display/MAHOUT/Dirichlet+Process+Clustering)**                                                                                                                                                                                       | 狄里克雷过程聚类                                                                                                                         |                                                                  |
| **[Latent Dirichlet Allocation](https://cwiki.apache.org/confluence/display/MAHOUT/Latent+Dirichlet+Allocation)**                                                                                                                                                                                         | LDA聚类（重点）                                                                                                                          |                                                                  |
| **[Spectral Clustering](https://cwiki.apache.org/confluence/display/MAHOUT/Spectral+Clustering)**    **[Minhash Clustering](https://cwiki.apache.org/confluence/display/MAHOUT/Minhash+Clustering)**    **[Top Down Clustering](https://cwiki.apache.org/confluence/display/MAHOUT/Top+Down+Clustering)** | 谱聚类                                                                                                                                   |                                                                  |
| 关联规则挖掘                                                                                                                                                                                                                                                                                              | Parallel FP Growth Algorithm                                                                                                             | 并行FP Growth算法                                                |
| 回归                                                                                                                                                                                                                                                                                                      | **[Locally Weighted Linear Regression](https://cwiki.apache.org/confluence/display/MAHOUT/Locally+Weighted+Linear+Regression)**          | 局部加权线性回归                                                 |
| 降维/维约简                                                                                                                                                                                                                                                                                               | **[Stochastic Singular ValueDecomposition](https://cwiki.apache.org/confluence/display/MAHOUT/Stochastic+Singular+Value+Decomposition)** | 奇异值分解                                                       |
| **[Principal Components Analysis](https://cwiki.apache.org/confluence/display/MAHOUT/Principal+Components+Analysis)**                                                                                                                                                                                     | **主成分分析**                                                                                                                           |                                                                  |
| **[Independent Component Analysis](https://cwiki.apache.org/confluence/display/MAHOUT/Independent+Component+Analysis)**                                                                                                                                                                                   | 独立成分分析                                                                                                                             |                                                                  |
| **[Gaussian Discriminative Analysis](https://cwiki.apache.org/confluence/display/MAHOUT/Gaussian+Discriminative+Analysis)**                                                                                                                                                                               | 高斯判别分析                                                                                                                             |                                                                  |
| 进化算法                                                                                                                                                                                                                                                                                                  | 并行化了Watchmaker框架                                                                                                                   |                                                                  |
| **推荐/协同过滤**                                                                                                                                                                                                                                                                                         | Non-distributed recommenders                                                                                                             | Taste(UserCF, ItemCF, SlopeOne）                                 |
| Distributed Recommenders                                                                                                                                                                                                                                                                                  | ItemCF                                                                                                                                   |                                                                  |
| 向量相似度计算                                                                                                                                                                                                                                                                                            | RowSimilarityJob                                                                                                                         | 计算列间相似度                                                   |
| **VectorDistanceJob**                                                                                                                                                                                                                                                                                     | 计算向量间距离                                                                                                                           |                                                                  |
| 非Map-Reduce算法                                                                                                                                                                                                                                                                                          | **[Hidden Markov Models](https://cwiki.apache.org/confluence/display/MAHOUT/Hidden+Markov+Models)**                                      | 隐马尔科夫模型                                                   |
| 集合方法扩展                                                                                                                                                                                                                                                                                              | **[Collocations](https://cwiki.apache.org/confluence/display/MAHOUT/Collocations)**                                                      | 扩展了[**Java**](http://lib.csdn.net/base/javase)的Collections类 |

 

 Mahout自从2008年兴起以来，发展迅速，从**最开始的只有推荐系统****到现在的多个算法模块**，涵盖了很多行业。这些模块有聚类算法、分类算法、协同过滤算法和频繁项集挖掘算法，每个模块都含有一个或者几个不同的实现算法，下面分别进行介绍。

**协同过滤算法也可以称为推荐算法!!!**

## **聚类算法**

**聚类分析**又称为群分析，它是研究（样品或指标）分类问题的一种统计分析方法，同时也是数据挖掘的一个重要算法。

**聚类（Cluster）分析**是由若干模式（Pattern）组成的，通常，模式是一个度量（Measurement）的向量，或者是多维空间中的一个点。

**聚类分析以相似性为基础**，在一个聚类中的模式之间比不在同一聚类中的模式之间具有更多的相似性。

聚类的用途是很广泛的。

例如：在商业上，聚类可以帮助市场分析人员从消费者数据库中分出不同的消费群体来，并且概括出每一类消费者的消费模式或者说习惯。

　　中国有句古谚语“物以类聚，人以群分”。一个聚类即是一类物体的集合，集合中的个体是相似的，不同聚类中的个体是不相似的。

　　聚类的二维图如下图所示。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dm/mahoutintro/algorithmlibintro-2.png')" alt="wxmp">

　　　　　　　　　　　　　　　　　　    图      聚类二维图


针对上面的数据，我们可以很容易地把**它们分为右边阴影中的3类**，这里的分类依据是**不同点之间的距离**：对于两个或者多个数据点，**当它们之间的距离达到一定程度的时候，我们就把它们分为一个类**，采用这种方式的聚类称做**基于几何距离的聚类**。

可以看到，**聚类的目的就是把一组无标签的数据加上标签**。那么，如何去评价一个模型的好坏？如何去评判一个模型**把一组无标签的数据“完美地”贴上了标签呢？??**事实上，没有一个绝对的标准来衡量这些模型算法，所以，一般都是用户根据自己的需要评测一个模型的好坏，而且还要求模型的参数要根据用户的不同数据加以调整以适应具体的情况。

Mahout算法库中聚类模块包含的算法有：Canopy、K-Means、Fuzzy K-Means、Mean Shift、Hierarchical、Spectral、Minhash、Top Down，其中在小括号中标注“开发中”的算法其编写还不是很完善。下面对这些算法分别进行简要分析。

### **（1）Canopy算法**

　　Canopy算法是一种非常简单、快速的聚类方法。Canopy算法经常用于其他聚类算法的初始步骤，比如K-Means算法等。

### **（2）K-Means算法**

　　K-Means算法是一种相对简单但是广为人知的聚类算法，一般聚类问题都可以使用聚类算法。在Mahout中，该算法在每次循环时都会新建一个任务，对于算法来说，增加了很多外部消耗。

### **（3）Fuzzy K-Means**

　　Fuzzy K-Means是K-means的扩展，是一种比较简单且流行的聚类方法。相比于K-Means聚类方法用于发现严格的聚类中心（即一个数据点只属于一个聚类中心），Fuzzy K-Means聚类方法用于发现松散的聚类中心（即一个数据点可能属于几个聚类中心）。

### **（4）Mean Shift算法**

　　Mean Shift 算法最开始应用于图像平滑、图像分割和跟踪方面，在1995年一篇重要的文献发表后，Mean Shift才被大家所了解。Mean Shift算法比较吸引人的地方是该算法不需要提前知道要聚类的类别数（K-Means算法就需要），并且该算法形成的聚类形状是任意的且与要聚类的数据是相关的。

### **（5）Spectral算法**

　　Spectral算法相对于K-Means算法来说更加有效和专业化，它是处理图像谱分类的一种有效的算法，主要针对的数据也是图像数据。

### **（6）Minhash算法**

　　Minhash算法只负责将原始内容尽量均匀随机地映射为一个签名值，原理上相当于伪随机数产生算法。对于传统hash算法产生的两个签名，如果相等，说明原始内容在一定概率下是相等的；如果不相等，除了说明原始内容不相等外，不再提供任何信息，因为即使原始内容只相差一个字节，所产生的签名也很可能差别极大。从这个意义上来说，要设计一个hash算法，使相似的内容产生的签名也相近，是更为艰难的任务，因为它的签名值除了提供原始内容是否相等的信息外，还能额外提供不相等的原始内容的差异程度的信息。

### **（7）Top Down算法**

　　Top Down算法是分层聚类的一种，它首先寻找比较大的聚类中心，然后对这些中心进行细粒度分类。

 



## **分类算法**

**分类**（Categorization or Classfication）就是按照某种标准给对象贴标签（lable），再根据标签来区分归类。

**分类**是事先定义好类别，类别数不变。

案例
　　　　比如程序是区分大豆和绿豆的。我们输入的数据是比如颜色值、半径大小，属于黄豆还是绿豆等等（当然这是个简单的例子）。首先我们需要拿出一些“豆子”的数据给程序，并告诉它是黄豆还是绿豆，然后通过自己的算法，让程序“计算”出区分两种东西的“边界条件”，或者简单说就是提取特征（一般用的比较多的就是距离）。这就相当于训练/学习等概念。

**分类**是一种**基于训练样本数据（这些数据都已经被贴标签）区分**另外的样本数据标签的过程，即**另外的样本数据应该如何贴标签的问题**。举一个简单的例子，现在有一批人的血型已经被确定，并且每个人都有M个指标来描述这个人，那么**这批人的M个指标数据就是训练样本数据（这些数据都是已经被贴好标签了的）**，根据这些训练样本数据，建立分类器（即运用分类算法得到一些规则），然后使用分类器对**测试样本集中的未被贴标签的数据进行血型判断**。下图是分类算法的一般过程。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dm/mahoutintro/algorithmlibintro-3.png')" alt="wxmp">

　　即在分类里，

**训练样本数据**（**这些数据都是已经被贴好标签的**）

　　　　　　　　　　　　---> 

根据这些训练样本数据，建立好分类器（运用分类算法得到一些规则）

　　　　　　　　　　　　　　　　--->

使用分类器对**测试样本数据**（**这些数据是没有贴标签的**）

　　　　　　　　　　　　　　　　　　　　--->

做出判断，达到分类的目的。

### **分类算法和聚类算法的不同之处在于**：

分类是有指导的学习，而聚类是一种无指导的学习。
 
有指导和无指导其实是指**在训练的时候训练样本数据是否提前被贴上了标签**。

 

 

## Mahout算法库中分类模块包含的算法有：
Logistic Regression、Bayesian、Support Vector Machine、Random Forests、Hidden Markov Models。

### **（1）Logistic Regression**

　　Logistic Regression是一种利用预测变量（预测变量可以是数值型，也可以是离散型）来预测事件出现概率的模型。其主要应用于生产欺诈检测、广告质量估计，以及定位产品预测等。在Mahout中主要使用随机梯度下降（Stochastic Gradient Decent，SGD）思想来实现该算法。

### **（2）Bayesian**

　　通常，事件A在事件B发生的条件下的概率，与事件B在事件A发生的条件下的概率是不一样的；然而，这两者是有确定的关系，贝叶斯（Bayesian）定理就是这种关系的陈述。通过联系事件A与事件B，计算从一个事件产生另一事件的概率，即从结果上溯源。

　　在Mahout中，目前已经有两种实现的贝叶斯分类器了，其中一种是朴素贝叶斯算法，另外一种是互补型的朴素贝叶斯算法。

### **（3）Support Vector Machine**

　　Support Vector Machine（支持向量机）属于一般化线性分类器，也可以认为是提克洛夫规范化（Tikhonov Regularization）方法的一个特例。这种分类器的特点是它能够同时最小化经验误差与最大化几何边缘区，因此支持向量机也称为最大边缘区分类器。

### **（4）Random Forests**

　　Random Forests（随机森林）是一个包含多个决策树的分类器，并且其输出的类别由个别树输出的类别的众数而定。这里的众数是指个别树输出类别重复最多的一个类别数值。随机森林算法在决策树的基础上发展而来，继承了决策树的优点，同时弱化了决策树的缺点。

### **（5）Hidden Markov Models**

　　Hidden Markov Models（隐马尔科夫模型）主要用在机器学习上，比如语音识别、手写识别及自然语音处理等。隐马尔科夫模型是一个包含两个随机变量O和Y（O和Y可以按照顺序改变它们自身的状态）的分析模型。其中，变量Y是隐含变量，包含{y_1，…，y_n}个状态，其状态不能被直接检测出来。变量Y的状态按照一定的顺序改变，其状态改变的概率只与当前状态有关而不随时间改变。变量O称为可观察变量，包含{o_1，…，o_m}个状态，其状态可以被直接检测出来。变量O的状态与当前变量Y的状态有关。

 


## **协调过滤**

　　电子商务推荐系统的一种重要算法。如推荐系统

**协同过滤推荐（Collaborative Filter recommendation）**是在信息过滤和信息系统中正迅速成为一项很受欢迎的技术。与传统的基于内容过滤直接分析内容进行推荐不同，协调过滤分析用户兴趣，在用户群中找到指定用户的相似（兴趣）用户，综合这些相似用户对某一信息的评价，形成系统对该指定用户对此信息的喜好程度预测。

案例：推荐系统、商品推荐和用户推荐。

　

**协同过滤算法也可以称为推荐算法!!!**。在Mahout算法库中，主要包括：Distributed Item-Based Collaborative Filtering、Collaborative Filtering using a parallel matrix factorization，下面进行简要分析。

 

### **（1）Distributed Item-Based Collaborative Filtering**

　　Distributed Item-Based Collaborative Filtering是基于项目的协同过滤算法，其简单思想就是利用项目之间的相似度来为用户进行项目推荐。项目之间的相似度通过不同用户对该项目的评分来求出，每个项目都有一个用户向量，两个项目之间的相似度便是根据这个用户向量求得的。求得项目之间的相似度，便可以针对用户对项目的评分清单来推荐与清单中极为相似的项目。

### **（2）Collaborative Filtering using a parallel matrix factorization**

　　Collaborative Filtering using a parallel matrix factorization在Mahout的介绍中是以Collaborative Filtering with ALS-WR的名称出现的。该算法最核心的思想就是把所有的用户以及项目想象成一个二维表格，该表格中有数据的单元格（i，j），便是第i个用户对第j个项目的评分，然后利用该算法使用表格中有数据的单元格来预测为空的单元格。预测得到的数据即为用户对项目的评分，然后按照预测的项目评分从高到低排序，便可以进行推荐了。

## **繁项集挖掘算法**

在**Mahout算法库中，频繁项集挖掘算法主要是指FP树关联规则算法**。传统关联规则算法是根据数据集建立FP树，然后对FP树进行挖掘，得到数据库的频繁项集。在Mahout中实现并行FP树关联规则算法的主要思路是按照一定的规则把数据集分开，然后在每个分开的部分数据集建立FP树，然后再对FP树进行挖掘，得到频繁项集。这里使用的是把数据集分开的规则，可以保证最后通过所有FP树挖掘出来的频繁项集全部加起来没有遗漏，但是会有少量重叠。

 

作者：[大数据和人工智能躺过的坑](http://www.cnblogs.com/zlslch/)
出处：http://www.cnblogs.com/zlslch/

本文版权归作者和博客园共有，欢迎转载，但未经作者同意必须保留此段声明，且在文章页面明显位置给出原文链接，否则保留追究法律责任的权利。 如果您认为这篇文章还不错或者有所收获，您可以通过右边的“打赏”功能 打赏我一杯咖啡【物质支持】，也可以点击右下角的【好文要顶】按钮【精神支持】，因为这两种支持都是我继续写作，分享的最大动力！


## 参考文章
* https://www.cnblogs.com/zlslch/p/6673846.html