---
title: Python-机器学习库Top10
---

::: tip
本文主要是介绍 Python-机器学习库Top10 。
:::

[[toc]]

## Python机器学习库 Top 10，你值得拥有！


随着人工智能技术的发展与普及，Python超越了许多其他编程语言，成为了机器学习领域中最热门最常用的编程语言之一。有许多原因致使Python在众多开发者中如此受追捧，其中之一便是其拥有大量的与机器学习相关的开源框架以及工具库。根据[http://builtwith.com](https://link.zhihu.com/?target=http%3A//builtwith.com)的数据显示，45%的科技公司都倾向于使用Python作为人工智能与机器学习领域的编程语言。

使Python如此受欢迎主要由于：

- Python从设计之初就是为效率而生，以使项目从开发到部署再在运维都能保持较高的生产力；
- 坊间有大量的基于Python的开源框架及工具库；
- Python易于上手，可以说是编程小白的福音；
- 相比起C、Java、C++来讲，Python的语法更简单，更高级，只需要更少行数的代码便能实现其他编程语言同样的功能；
- Python的跨平台能力；

正是由于Python简单易用以及高开发效率，吸引了大量的开发者为其创建更多新的机器学习工具库；而又因为大量的机器学习工具库的出现，使得Python在机器学习领域变得如此流行。

下面我们就来探索一下机器学习领域中最受欢迎的十大框架或工具库：

## Tensorflow



<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ad/intro/pythonmltop10-1.png')" alt="wxmp">





如果你正在使用Python来从事机器学习项目，那么你一定听说过其中一个著名的框架——Tensorflow。Tensorflow框架主要由Google大脑团队开发，主要用于深度学习计算。几乎所有的Google机器学习应用都使用了它。比如在使用Google语音搜索或者Google相册时，你其实都是在间接地在使用Tensorflow所构建的模型。

Tensorflow把神经网络运算抽象成运算图（Graph），一个运算图中包含了大量的张量（Tensor）运算。而张量实际上就是N维数据的集合。神经网络运算的本质是通过张量运算来拟合输入张量与输出张量之间的映射关系。



并行运算是Tensorflow的主要优势之一。也就是说你可以通过代码设置来分配你的CPU、GPU计算资源来实现并行化的图运算。



Tensorflow框架中所有的工具库都是用C或者C++来编写，但它提供了用Python来编写的接口封装。事实上，你用Python编写的神经网络模型最终会调用基于C和C++编写的Tensorflow内核来执行运算。



Tensorflow使用了类似XLA（Accelerated Linear Algebra/加速线性代数）等技术对运算过程进行过优化，以保证其能够灵活地调用计算资源的同时保持高效的运算速度。

## Keras



<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ad/intro/pythonmltop10-2.png')" alt="wxmp">

Keras被认为是最酷的Python深度学习库之一。如果你是深度学习开发方面的新手，那么非常建议你使用它。它提供了非常简明的机制来表达神经网络结构。它也提供了许多非常棒的工具用于神经网络模型的编译、数据的处理、以及网络结构的可视化等等。

Keras本质上是对Tensorflow、Theano等基础框架作进一步的封装，以提供统一的API来简化神经网络的构建与训练。如果你打算以Tensorflow作为后端基础框架，则必须遵循以下架构图：



<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ad/intro/pythonmltop10-3.png')" alt="wxmp">



再有，Keras提供了许多预处理的数据集，比如MNIST，和预训练的模型，比如VGG、Inception、 ResNet等等。





## Theano

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ad/intro/pythonmltop10-4.png')" alt="wxmp">

Theano 是一个用于多维数组计算的 Python 运算框架。Theano 的工作原理与 Tensorflow 相似，但要比Tensorflow 低效。因此它不适用于生产环境。



此外，Theano还可以用于与Tensorflow类似的分布式或并行环境。



## PyTorch

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ad/intro/pythonmltop10-5.png')" alt="wxmp">



PyTorch是最大的深度学习库，允许开发人员通过加速GPU执行张量计算，创建动态计算图，并自动计算梯度。 除此之外，PyTorch还提供丰富的API，用于解决与神经网络相关的应用问题。

这个深度学习库基于Torch，这是一个用C语言实现的开源机器库，以Lua语言作了封装。与Tensorflow的区别在于Tensorflow用的是“静态计算图”的概念，而PyTorch用的是“动态计算图”的概念。最直观的感受是，用PyTorch来编写的神经网络模型代码更像常见的Python代码。PyTorch是在2017年推出的，自成立以来，该库越来越受欢迎并吸引了越来越多的机器学习开发人员。



## LightGBM

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ad/intro/pythonmltop10-6.png')" alt="wxmp">


Gradient Boosting
是最好和最受欢迎的机器学习库之一，它通过使用重新定义的基本模型和决策树来帮助开发人员构建新算法。 因此，有专门的库被设计用于快速有效地实现该方法。这些库包括LightGBM, XGBoost, 和CatBoost。这些库互为竞争对手，同样使用了几乎相同的思路来解决一个共同问题。这些库都提供了高度可扩展，优化和快速的梯度增强实现，使其在机器学习开发人员中很受欢迎。 因为大多数机器学习开发人员通过使用这些算法赢得了机器学习竞赛。

## Numpy



<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ad/intro/pythonmltop10-7.png')" alt="wxmp">



Numpy是公认的最受欢迎的Python机器学习库之一。Tensorflow以及其他的一些框架内部都使用了Numpy来对张量进行多种操作。数组接口是Numpy最佳及最重要的功能。这个接口可以用于把图像、音频、以及其他二进制流数据表示为多维实数数组。为了把这个库应用到机器学习中，掌握Numpy的操作对于开发者而言意义重大。

## Pandas



<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ad/intro/pythonmltop10-8.png')" alt="wxmp">

Pandas是一个Python机器学习库，它提供了各种高级的工具用于进行数据分析。其中一项了不起的功能便是它可以用一两行代码就能实现复杂的数据操作。Pandas有许多内置的方法用于分组统计、合并数据、数据筛选、以及时间序列操作。所有的这些操作都有出色的性能表现。因此，使用Pandas通常用于数据挖掘任务。

## SciPy

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ad/intro/pythonmltop10-9.png')" alt="wxmp">

SciPy是一个应用开发者与工程师们使用的机器学习库。然而，你需要知道的是SciPy库与SciPy-Stack的区别。SciPy库是SciPy-Stack的一个子集。SciPy库包含了优化器、线性代数、积分、插值、快速傅立叶变换、信号和图像处理、统计等子模块。所有子模块中的函数都有完整的文档说明，使用方便。

SciPy库的主要功能是基于Numpy来实现的，它的数组操作就是使用了Numpy的数组操作。



## Scikits_Learn

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ad/intro/pythonmltop10-10.png')" alt="wxmp">





Scikits-learn，又称为sk-learn，是一个基于Numpy与SciPy的Python库。Sk-learn被认为是用于处理复杂数据的最优秀的机器学习库之一。它包含了大量用于实现传统机器学习和数据挖掘任务的算法，比如数据降维、分类、回归、聚类、以及模型选择等。

随着时间的发展，sk-learn不断演进。其中包括它加入了交叉验证功能，提供了使用多个衡量指标的能力。许多的训练方法都得到了一定的改进，如逻辑回归、近邻算法（KNN）等。

## Eli5


<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ad/intro/pythonmltop10-11.png')" alt="wxmp">


通常，在机器学习任务中遇到的难题是模型的预测结果不准确。而用Python构建的Eli5机器学习库可以帮助攻克这个难题。它为现有的机器学习框架提供了若干内置的支持，比如模型数据可视化、模型调试、算法跟踪等，使得机器学习模型对于开发者而言不再是一个黑盒子。

Eli5支持sk-learn、XGBoost、LightGBM、lightning、sklearn-crfsuite等机器学习框架或机器学习库。



这些框架与库都能够实现以上提到的可视化、模型调试、算法跟踪等任务。

结语：



以上便是机器学习专家们与数据科学家们普遍认可的十大机器学习框架或工具库。所有的这些框架与库都值得看一看、试一试。



当然，除了以上提到的框架与工具库外，还有很多其他的机器学习库也同样值得关注。比如Scikit-image就是同属于Scikit系列的另一个侧重于图像领域的工具库。



希望本文能够帮助你为你的项目选择到合适的机器学习框架或工具库吧。

## 参考文章
* https://zhuanlan.zhihu.com/p/44952874