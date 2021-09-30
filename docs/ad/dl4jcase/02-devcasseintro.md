---
title: DL4J-开发案例入门介绍
---

::: tip
本文主要是介绍 DL4J-开发案例入门介绍 。
:::

[[toc]]


## Java机器学习框架deeplearing4j入门教程

## 1.添加项目

maven添加依赖 or 导入jar包 or 使用jvm

``` xml
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
<modelVersion>4.0.0</modelVersion>

<groupId>YOURPROJECTNAME.com</groupId>
<artifactId>YOURPROJECTNAME</artifactId>
<version>1.0-SNAPSHOT</version>
<packaging>jar</packaging>

<name>YOURNAME</name>
<url>http://maven.apache.org</url>

<properties>
<nd4j.backend>nd4j-native-platform</nd4j.backend>
<project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
<shadedClassifier>bin</shadedClassifier>
<java.version>1.7</java.version>
<nd4j.version>0.6.0</nd4j.version>
<dl4j.version>0.6.0</dl4j.version>
<datavec.version>0.6.0</datavec.version>
<arbiter.version>0.6.0</arbiter.version>
<guava.version>19.0</guava.version>
<logback.version>1.1.7</logback.version>
<jfreechart.version>1.0.13</jfreechart.version>
<maven-shade-plugin.version>2.4.3</maven-shade-plugin.version>
<exec-maven-plugin.version>1.4.0</exec-maven-plugin.version>
<maven.minimum.version>3.3.1</maven.minimum.version>
</properties>

<dependencyManagement>
<dependencies>
<dependency>
<groupId>org.nd4j</groupId>
<artifactId>nd4j-native-platform</artifactId>
<version>${nd4j.version}</version>
</dependency>
<dependency>
<groupId>org.nd4j</groupId>
<artifactId>nd4j-cuda-7.5-platform</artifactId>
<version>${nd4j.version}</version>
</dependency>
</dependencies>
</dependencyManagement>

 

<dependencies>
<dependency>
<groupId>junit</groupId>
<artifactId>junit</artifactId>
<version>3.8.1</version>
<scope>test</scope>
</dependency>
<!-- ND4J后端。每个DL4J项目都需要一个。一般将artifactId指定为"nd4j-native-platform"或者"nd4j-cuda-7.5-platform" -->
<dependency>
<groupId>org.nd4j</groupId>
<artifactId>${nd4j.backend}</artifactId>
</dependency>

<!-- DL4J核心功能 -->
<dependency>
<groupId>org.deeplearning4j</groupId>
<artifactId>deeplearning4j-core</artifactId>
<version>${dl4j.version}</version>
</dependency>

<dependency>
<groupId>org.deeplearning4j</groupId>
<artifactId>deeplearning4j-nlp</artifactId>
<version>${dl4j.version}</version>
</dependency>

<!-- deeplearning4j-ui用于HistogramIterationListener + 可视化：参见http://deeplearning4j.org/cn/visualization -->
<dependency>
<groupId>org.deeplearning4j</groupId>
<artifactId>deeplearning4j-ui</artifactId>
<version>${dl4j.version}</version>
</dependency>

<!-- 强制指定使用UI/HistogramIterationListener时的guava版本 -->
<dependency>
<groupId>com.google.guava</groupId>
<artifactId>guava</artifactId>
<version>${guava.version}</version>
</dependency>

<!-- datavec-data-codec：仅用于在视频处理示例中加载视频数据 -->
<dependency>
<artifactId>datavec-data-codec</artifactId>
<groupId>org.datavec</groupId>
<version>${datavec.version}</version>
</dependency>

<!-- 用于前馈/分类/MLP*和前馈/回归/RegressionMathFunctions示例 -->
<dependency>
<groupId>jfree</groupId>
<artifactId>jfreechart</artifactId>
<version>${jfreechart.version}</version>
</dependency>

<!-- Arbiter：用于超参数优化示例 -->
<dependency>
<groupId>org.deeplearning4j</groupId>
<artifactId>arbiter-deeplearning4j</artifactId>
<version>${arbiter.version}</version>
</dependency>
</dependencies>
</project>
```



 

## 2.项目引用库



``` java
import org.deeplearning4j.nn.multilayer._
import org.deeplearning4j.nn.graph._
import org.deeplearning4j.nn.conf._
import org.deeplearning4j.nn.conf.inputs._
import org.deeplearning4j.nn.conf.layers._
import org.deeplearning4j.nn.weights._
import org.deeplearning4j.optimize.listeners._
import org.deeplearning4j.datasets.datavec.RecordReaderMultiDataSetIterator
import org.deeplearning4j.eval.Evaluation

import org.nd4j.linalg.learning.config._ // for different updaters like Adam, Nesterovs, etc.
import org.nd4j.linalg.activations.Activation // defines different activation functions like RELU, SOFTMAX, etc.
import org.nd4j.linalg.lossfunctions.LossFunctions // mean squared error, multiclass cross entropy, etc.
```



 

## 3.准备加载数据
dl4j有数据迭代器。帮助批处理和迭代数据集。Deeplearning4j带有一个内置的BaseDatasetIteratorEMNIST 实现，
称为EmnistDataSetIterator。这个特殊的迭代器是一个便利实用程序，用于处理数据的下载和准备。

可以创建多个数据迭代器，用于训练模型或者评估模型等。


### 创建迭代器代码



``` java
import org.deeplearning4j.datasets.iterator.impl.EmnistDataSetIterator //引入数据迭代器库

val batchSize = 16 // how many examples to simultaneously train in the network //数据集大小
val emnistSet = EmnistDataSetIterator.Set.BALANCED
val emnistTrain = new EmnistDataSetIterator(emnistSet, batchSize, true) //实例化训练迭代器
val emnistTest = new EmnistDataSetIterator(emnistSet, batchSize, false) //实例化评估迭代器
```



 

## 4.建立神经网络
在dl4j中使用的任何与神经网络有关的操作是在NeuralNetConfiguration类中的。可在此处配置超参数和算法的学习方式。



``` java
val outputNum = EmnistDataSetIterator.numLabels(emnistSet) // total output classes
val rngSeed = 123 // integer for reproducability of a random number generator
val numRows = 28 // number of "pixel rows" in an mnist digit
val numColumns = 28

val conf = new NeuralNetConfiguration.Builder()
.seed(rngSeed)
.optimizationAlgo(OptimizationAlgorithm.STOCHASTIC_GRADIENT_DESCENT)
.updater(new Adam())
.l2(1e-4)
.list()
.layer(new DenseLayer.Builder()
.nIn(numRows * numColumns) // Number of input datapoints.
.nOut(1000) // Number of output datapoints.
.activation(Activation.RELU) // Activation function.
.weightInit(WeightInit.XAVIER) // Weight initialization.
.build())
.layer(new OutputLayer.Builder(LossFunctions.LossFunction.NEGATIVELOGLIKELIHOOD)
.nIn(1000)
.nOut(outputNum)
.activation(Activation.SOFTMAX)
.weightInit(WeightInit.XAVIER)
.build())
.pretrain(false).backprop(true)
.build()
```

## 5.训练模型
现在我们已经构建了一个NeuralNetConfiguration，我们可以使用配置来实例化一个MultiLayerNetwork。当我们init()在网络上调用该 方法时，它会在网络上应用所选的权重初始化，并允许我们将数据传递给训练。如果我们想在培训期间看到损失分数，我们也可以将听众传递给网络。

实例化模型有一个fit()接受数据集迭代器（扩展的迭代器BaseDatasetIterator），单个DataSet或ND数组（实现INDArray）的方法。由于我们的EMNIST迭代器已经扩展了迭代器基类，我们可以直接传递它来适应。如果我们想要训练多个时代，DL4J还提供了一个MultipleEpochsIterator可以为我们处理多个时代的类。

``` java
// create the MLN
val network = new MultiLayerNetwork(conf)
network.init()

// pass a training listener that reports score every 10 iterations
val eachIterations = 5
network.addListeners(new ScoreIterationListener(eachIterations))

// fit a dataset for a single epoch
// network.fit(emnistTrain)

// fit for multiple epochs
// val numEpochs = 2
// network.fit(new MultipleEpochsIterator(numEpochs, emnistTrain))
```



 


## 6.评估模型
Deeplearning4j公开了几种工具来评估模型的性能。您可以执行基本评估并获取精度和准确度等指标，或使用接收器操作特性（ROC）。请注意，通用ROC类适用于二进制分类器，而ROCMultiClass适用于分类器，例如我们在此构建的模型。

A MultiLayerNetwork方便地有一些内置的方法来帮助我们进行评估。您可以将包含测试/验证数据的数据集迭代器传递给evaluate()方法。



``` java
// evaluate basic performance
val eval = network.evaluate(emnistTest)
eval.accuracy()
eval.precision()
eval.recall()

// evaluate ROC and calculate the Area Under Curve
val roc = network.evaluateROCMultiClass(emnistTest)
roc.calculateAverageAUC()

val classIndex = 0
roc.calculateAUC(classIndex)

// optionally, you can print all stats from the evaluations
print(eval.stats())
print(roc.stats())
```





``` java
// evaluate basic performance
val eval = network.evaluate(emnistTest)
eval.accuracy()
eval.precision()
eval.recall()

// evaluate ROC and calculate the Area Under Curve
val roc = network.evaluateROCMultiClass(emnistTest)
roc.calculateAverageAUC()

val classIndex = 0
roc.calculateAUC(classIndex)

// optionally, you can print all stats from the evaluations
print(eval.stats())
print(roc.stats())
```



## 参考文章
* https://www.cnblogs.com/liaohai/p/9620947.html