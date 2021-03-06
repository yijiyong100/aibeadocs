---
title: Java-6大机器学习库介绍
---

::: tip
本文主要是介绍 Java-6大机器学习库介绍 。
:::

[[toc]]

## 6大最常用的Java机器学习库一览


> 导读：机器学习是目前盛行于世的技术之一，这几年一时风头无两。虽然在机器学习中，Python是人工智能从业者使用最多的编程语言，但是，Java 在项目开发中仍然发挥着不可替代的作用，而且许多流行的机器学习框架本身就是 Java编写的。Python 的资料到处都是，而 Java 相关的资料就相对少了很多。今天我们翻译了 Fatema Patrawala> 撰写的《六大最常用的 Java 机器学习库一览》。

在 [MLOSS.org](http://mloss.org/) 网站上，列出了 70 多个基于 Java 的开源机器学习项目，可能还有更多未列出的项目，存于大学里的服务器、GitHub 或 Bitbucket 中。我们将在本文中回顾 Java 中的主流机器学习库和平台，它们能够解决的问题类型，支持的算法以及可以使用的数据类型。

> 本文节选自 Machine learning in Java，由 Bostjan Kaluza 编写，Packt Publishing Ltd. 出版

## Weka

Weka 是 Waikato Environment for Knowledge Analysis（Waikato 智能分析环境）的缩写，是新西兰 Waikato 大学开发的机器学习库，也可能是最为有名的 Java 库。Weka 是一个通用的库，能够解决各种机器学习任务，如分类、回归和聚类。它具有丰富的图形用户界面、命令行界面和 Java API。有关 Weka 更多详情，请参阅：http://www.cs.waikato.ac.nz/ml/weka/

截止到本书写作之时，Weka 总共包含 267 个算法，其中：数据预处理（82），属性选择（33），分类和回归（133），聚类（12），关联规则挖掘（7）。图形界面非常适合用于探索数据，而 Java API 可以让你开发新的机器学习方案并在应用中使用这些算法。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ad/intro/javatop6mllib-1.png')" alt="wxmp">

Weka 是在 GNU 通用公共许可证（GNU GPL）下发布的，这意味着你可以复制、分发和修改它，只要你跟踪源文件中的更改并将其保存在 GNU GPL 下。你甚至可以进行商业分发，但前提是你必须公开源代码或获得商业许可证。

除了几种支持的文件格式外，Weka 还提供了自己的默认数据格式 ARFF，用于通过属性 - 数据对描述数据。它由两部分组成：第一部分包含标题头，它指定所有属性（即特性）及其类型；例如，标称、数字、日期和字符串。第二部分包含数据，其中每行对应于一个实例。标题头中的最后一个属性隐式地被视为目标变量，缺失的数据用问号标记。例如，用 ARFF 文件格式编写的 Bob 实例如下:

```java
    @RELATION person_dataset
    
    @ATTRIBUTE `Name`  STRING
    @ATTRIBUTE `Height`  NUMERIC
    @ATTRIBUTE `Eye color`{blue, brown, green}
    @ATTRIBUTE `Hobbies`  STRING
    
    @DATA
    'Bob', 185.0, blue, 'climbing, sky diving'
    'Anna', 163.0, brown, 'reading'
    'Jane', 168.0, ?, ?
```

该文件由三个部分组成。第一部分以 @relation 关键字开始，指定数据集名称。下一部分以 @ATTRIBUTE 关键字开始，后面是属性名和类型。可用的类型是 STRING（字符串）、NUMERIC（数字）、DATE（日期）和一组分类值。最后一个属性被隐式假设为我们想要预测的目标变量。最后一部分以 @DATA 关键字开始，每行后面跟着一个实例。实例值用逗号分隔，并且必须遵循与第二部分中的属性相同的顺序。

Weka 的 Java API 由以下的顶层包组成：

- weka.associations：这些是关联规则学习的数据结构和算法，包括 Apriori、 predictive apriori、FilteredAssociator、FP-Growth、Generalized Sequential Patterns (GSP)、Hotspot 和 Tertius。
- weka.classifiers：这些是监督学习算法、评估期和数据结构。该包由以下几个部分组成：
  - weka.classifiers.bayes：它实现了贝叶斯（Bayesian）方法，包括朴素贝叶斯、贝式网络、贝叶斯逻辑回归等。
  - weka.classifiers.evaluation：这些是评价统计、混淆矩阵、ROC 曲线等标称和数值预测的监督评价算法。
  - weka.classifiers.functions：这些是回归算法，包括线性回归、保序回归、高斯过程、支持向量机、多层感知器、表决感知器等。
  - weka.classifiers.lazy：这些是基于实例的算法，比如 k- 最近邻、K*，惰性贝叶斯规则。
  - weka.classifiers.meta：这些是监督学习元算法，包括 AdaBoost、bagging、加性回归、随机委员会（random committee）等。
  - weka.classifiers.mi：这些是多实例算法，如 Citation-KNN、多样性密度、MI AdaBoost 等。
  - weka.classifiers.rules：这些是基于变治法（separate-and-conquer）、Ripper、Part、Prism 的决策表和决策规格。
  - weka.classifiers.trees：这些是各种决策树算法，包括 ID3、C4.5、M5、功能树、逻辑树、随机森林等。
- weka.clusterers：这些是聚类算法，包括 k-means、Clope、Cobweb、DBSCAN 层次聚类、Farthest 等
- weka.core：这些是各种实用类、数据表示、配置文件等。
- weka.datagenerators：这些是用于分类、回归和聚类算法的数据生成器。
- weka.estimators：这些是用于离散 / 标称域、条件概率估计等的各种数据分布估计。
- weka.experiment：这是一组类，支持运行实验所需的配置、数据集、模型设置和统计信息。
- weka.filters：这些是基于属性和基于实例的选择算法，用于监督和非监督数据预处理。
- weka.gui：这些是实现 Explorer、Experimenter、和 Knowledge Flow 的图形界面。Explorer 允许你调查数据集、算法及其参数，并使用散点图和其他可视化的形式对数据集进行可视化。Experimenter 用于设计批量实验，但它只能用于分类和回归问题。Knowledge Flow 实现了可视化的拖放式用户界面来构建数据流，如：加载数据、应用过滤器、构建分类器和评估。

## 用于机器学习的 Java-ML

Java 机器学习库（Java-ML）是一组机器学习算法的集合，具备用于相同类型的算法的公共接口。它只提供 Java API，因此，它主要面向的是软件工程师和程序员。Java-ML 包含用于数据预处理、特征选择、分类和聚类的算法。此外，它还提供了几个 Weka 桥来直接通过 Java-ML API 访问 Weka 的算法。Java-ML 可从 [http://java-ml.sourceforge.net](http://java-ml.sourceforge.net/) 下载，截至本书完成之际，最近版本发布于 2012 年。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ad/intro/javatop6mllib-2.png')" alt="wxmp">

Java-ML 也是一个通用机器学习库。与 Weka 相比，它提供了更为一致的接口和最新算法的实现，在其他包中不存在这些算法，如一系列最先进的相似性度量和特征选择技术等，这些包含动态时间规整、随机森林属性评估等等。Java-ML 也可以在 GNU GPL 许可证下使用。

Java-ML 支持任何类型的文件，只要它每行包含一个数据样本，并且特征用逗号、分号和制表符分隔。

Java-ML 库由以下顶层包组成：

- net.sf.javaml.classification：这些是分类算法，包括朴素贝叶斯、随机森林、Bagging、自组织映射、k- 最近邻等。
- net.sf.javaml.clustering：这些是聚类算法，包括 kmeans、自组织映射、空间聚类、Cobweb、AQBC 等。
- net.sf.javaml.core：这些表示实例和数据集。
- net.sf.javaml.distance：这些是测量实例距离和相似度的算法，如切比雪夫距离（Chebyshev distance）、余弦距离 / 相似度、欧几里得距离（Euclidian distance）、杰卡德距离（Jaccard distance）/ 相似度、马氏距离（Mahalanobis distance）、曼哈顿距离（Manhattan distance）、明氏距离（Minkowski distance）、皮尔逊积矩相关系数（Pearson correlation coefficient）、斯皮尔曼简捷距离（Spearman’s footrule distance）、动态时间规整（dynamic time wrapping，DTW）等。
- net.sf.javaml.featureselection：这些是用于特征评估、评分、选择和排名的算法，如增益比、ReliefF、Kullback-Liebler 散度、对称不确定性等。
- net.sf.javaml.filter：这些是通过过滤、删除属性、设置类或属性值等操作实例的方法。
- net.sf.javaml.matrix：实现内存或基于文件的数组。
- net.sf.javaml.sampling：实现选择数据集子集的采样算法。net.sf.javaml.tools：这些是关于数据集、实例操作、序列化、Weka API 接口等的使用方法。
- net.sf.javaml.utils：这些是算法的实用方法，如统计、数学方法、列联表等表等。

## Apache Mahout

Apache Mahout 项目旨在构建可扩展的机器学习库。它是在可扩展分布式体系结构（如 Hadoop）上构建的，实用 MapReduce 范例，这是一种实用服务器集群处理和生成具有并行分布式算法的大型数据及的方法。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ad/intro/javatop6mllib-3.png')" alt="wxmp">

Mahout 提供了控制台界面和 Java API，可用于聚类、分类和写作过滤的可扩展算法。它可以解决这三个业务问题：项目推荐，如向喜欢某部电影的人推荐其他可能喜欢的电影；聚类，如将文本文档分组与主题相关的文档组中归档；分类，如学习将哪个主题分配给未标记的文档。

Mahout 是在商业化的 Apache 许可证下分发的，这意味着只要你保留 Apache 许可证并将其显示在程序的版权声明中，你就可以使用它。

Mahout 提供了以下库：
org.apache.mahout.cf.taste：这些是基于用户和基于项目的协同过滤算法，及基于 ALS 的矩阵分解算法。

- org.apache.mahout.classifier：这些是内存和分布式实现，包括逻辑回归、朴素贝叶斯、随机森林、隐马尔科夫模型（hidden Markov models，HMM）和多层感知器。
- org.apache.mahout.clustering：这些是聚类算法，例如 Canopy 聚类、k-means、模糊 k-means、流式 K-means 和谱聚类。
- org.apache.mahout.common：这些是算法的实用方法，包括距离、MapReduce 操作、迭代器等。
- org.apache.mahout.driver：实现了通用驱动程序来运行其他类的主要方法。
- org.apache.mahout.ep：这是使用记录步骤突变的进化优化。
- org.apache.mahout.math：这些是 Hadoop 中的各种数据额实用方法和实现。
- org.apache.mahout.vectorizer：这些是用于数据表示、操作和 MapReduce 任务的类。

## Apache Spark

Apache Spark（或简称 Spark）是在 Hadoop 上构建大规模数据处理的平台，但与 Mahout 不同的是，它与 MapReduce 范式无关。相反，它使用内存缓存提取工作数据集，对其进行处理并重复查询。据报道，Spark 直接处理磁盘存储数据的速度是 Mahout 实现的十倍。可从 [https://spark.apache.org](https://spark.apache.org/) 下载。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ad/intro/javatop6mllib-4.png')" alt="wxmp">

在 Spark 之上构建了许多模块，例如用于图形处理的 GraphX、用于处理实时数据流的 Spark Streaming 和用于机器学习库的 MLlib，这些模块具有分类、回归、协同过滤、聚类、降维和优化。

Spark 的 MLlib 可以使用基于 Hadoop 的数据源，例如 Hadoop 分布式文件系统（HDFS）或 HBase，以及本地文件。支持的数据类型包括以下几种：

- 局部向量存储在一台机器上。稠密向量表示为双类型值数组，如 (2.0,0.0,10.,0.0)；而稀疏向量由向量的大小、索引数组和值数组表示，如 [4, (0, 2), (2.0, 1.0)]。
- 标记点用于监督学习算法，由局部向量组成，用双类型的类值标记。标签可以是类索引、二进制结果或多个类索引的列表（多类分类）。例如，标记的稠密向量表示为 [1.0, (2.0, 0.0, 1.0, 0.0)]。
- 局部矩阵在单台机器上存储稠密矩阵。它由矩阵维数和以列主序排列的单个双数组定义。
- 分布式矩阵对存储在 Spark 的弹性分布式数据集（Resilient Distributed Dataset，RDD）中的数据进行操作，RDD 表示可以并行操作的元素集合。有三种表示：行矩阵，其中每一行都是可以存储在一台机器上的局部向量，但行索引没有意义；索引行矩阵，类似于行矩阵，但行索引是有意义的，即可以识别行并执行行连接；坐标矩阵，当行不能存储在一台机器上，且矩阵非常稀疏时才使用。

Spark 的 MLlib API 库提供了各种学习算法和实用工具的接口，如下所示：

- org.apache.spark.mllib.classification：这些是二元和多类分类算法，包括线性 SVM、逻辑回归、决策树和朴素贝叶斯。
- org.apache.spark.mllib.clustering：这些是 k-means 聚类。
- org.apache.spark.mllib.linalg：这些是数据表示，包括稠密向量、稀疏向量和矩阵。
- org.apache.spark.mllib.optimization：这是 MLlib 中作为低级基元的各种优化算法，包括梯度下降、随机梯度下降、分布式 SGD 的更新方案和有限内存 BFGS。
- org.apache.spark.mllib.recommendation：这些是基于模型的协同过滤，通过交替最小二乘矩阵分解来实现。
- org.apache.spark.mllib.regression：这些是回归学习算法，如线性最小二乘、决策树、Lasso 和 Ridge 回归。
- org.apache.spark.mllib.stat：这些是稀疏或稠密向量格式的样本的统计函数，用于计算均值、方差、最小值、最大值、计数和非零计数。org.apache.spark.mllib.tree：实现了分类和回归决策树的算法。
- org.apache.spark.mllib.util：这些是用于加载、保存、预处理、生成和验证数据的方法的集合。

## Deeplearning4j

DeepLearning4j（或称 DL4J），是一个用 Java 编写的深度学习库。它具有分布式和单机深度学习框架，包括并支持各种神经网络结构，如前馈神经网络、RBM（Restricted Boltzmann Machine，受限玻尔兹曼机）、卷积神经网络、深度信念网络、自动编码器等。DL4J 可以解决不同的问题，比如识别面孔、声音、垃圾邮件和电子商务欺诈。

Deeplearning4j 也是在 Apache 2.0 许可下分发的，可从 [http://deeplearning4j.org](http://deeplearning4j.org/) 下载。该库由以下组成：

- org.deeplearning4j.base：这些是加载类。
- org.deeplearning4j.berkeley：这些是数学使用方法。
- org.deeplearning4j.clustering：k-means 的聚类实现。
- org.deeplearning4j.datasets：这是数据集的操作，包括导入、创建、迭代等。
- org.deeplearning4j.distributions：这是用于分发的实用方法。
- org.deeplearning4j.eval：这些是评估类，包括混淆矩阵。
- org.deeplearning4j.exceptions：实现异常处理程序。
- org.deeplearning4j.models：这些是监督学习算法，包括深度信念网络、堆叠式自动编码器、堆叠去噪式自动编码器和 RBM。
- org.deeplearning4j.nn：这些是基于神经网络的组件和算法的实现，例如神经网络、多层网络、卷积多层网络等。
- org.deeplearning4j.optimize：这些是神经网络优化算法，包括反向传播、多层优化、输出层优化等。
- org.deeplearning4j.plot：这些是用于呈现数据的各种方法。
- org.deeplearning4j.rng：这是一个随机数据生成器。
- org.deeplearning4j.util：这些是帮助和实用方法。

## MALLET

机器学习语言工作包（Machine Learning for Language Toolkit，MALLET），是一个包含自然语言处理算法和实用程序的大型库。它可以用于各种任务，如文档分类、分档聚类、信息提取和主题建模。MALLET 提供了命令行界面和 Java API，适用于多种算法，如朴素贝叶斯、HMM（Hidden Markov Model，隐马尔可夫模型）、隐含狄利克主题模型（Latent Dirichlet topic model）、逻辑回归和条件随机域（conditional random fields）。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ad/intro/javatop6mllib-5.png')" alt="wxmp">

MALLET 可以在通用公共许可证 1.0 下使用，这意味着你甚至可以在商业应用程序中使用它。可以从 [http://mallet.cs.umass.edu](http://mallet.cs.umass.edu/) 下载。MALLET 实例由名称、标签、数据和源表示。但是，有两种方法可以将数据导入到 MALLET 格式中，如下所示:

- Instance per file：每个文件（即文档）对应一个实例，MALLET 接受输入的目录名。
- Instance per line：每行对应一个实例，假设使用以下格式：instance_name 标签令牌。数据将是一个特征向量，由作为标记出现的不同单词和它们出现次数组成。

该库由以下包组成：

- cc.mallet.classify：这些是用于训练和分类实例的算法，包括 AdaBoost、Bagging、C4.5、以及其他决策树模型、多元逻辑回归、朴素贝叶斯和 Winnow2。
- cc.mallet.cluster：这些是无监督聚类算法，包括贪心凝聚（ greedy agglomerative）、爬山算法（hill climbing）、k-best 和 k-means 聚类。
- cc.mallet.extract：实现分词器（tokenizers）、文档提取器、文档查看器和清理器等。
- cc.mallet.fst: 实现了序列模型，包括条件随机域、HMM、最大熵马尔科夫模型（maximum entropy Markov models），以及相应的算法和评估器。
- cc.mallet.grmm：实现了如推理算法、学习和测试的图形模型和因子图。例如环状信念传播（loopy belief propagation）、吉布斯采样（Gibbs sampling）等。
- cc.mallet.optimize：这些是用于寻找函数最大值的优化算法，例如梯度上升、有限内存 BFGS、随机元上升（stochastic meta ascent）等。
- cc.mallet.pipe：这些方法是将数据处理为 MALLET 实例中的管道。cc.mallet.topics：这些是主题建模算法，例如隐含狄利克分布（Latent Dirichlet allocation）、四级弹球分布（four-level pachinko allocation）、分层 PAM、DMRT 等。
- cc.mallet.types：实现了基本数据类型，如数据集、特征向量、实例和标签。
- cc.mallet.util：这些是各种实用工具功能，如命令行处理、搜索、数学、测试等。

如果你想利用关键的 Java 机器学习库进行设计、构建和部署你自己的机器学习应用，请查阅 Packt Publishing 出版社出版的《Java 机器学习》（Machine Learning in Java）一书。

转载自：https://hub.packtpub.com/most-commonly-used-java-machine-learning-libraries/#

下一步阅读:

[5 JavaScript machine learning libraries you need to know](https://hub.packtpub.com/5-javascript-machine-learning-libraries-you-need-to-know/)

[A non programmer’s guide to learning Machine learning](https://hub.packtpub.com/a-non-programmers-guide-to-learning-machine-learning/)

[Why use JavaScript for machine learning?](https://hub.packtpub.com/should-you-use-javascript-for-machine-learning-and-how-do-you-get-started/)

## 参考文章
* https://blog.csdn.net/chekongfu/article/details/84231789