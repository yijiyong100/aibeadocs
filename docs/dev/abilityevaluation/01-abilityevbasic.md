---
title: 技术能力-评估基础要素
---

::: tip
本文主要是介绍 技术能力-评估基础要素 。
:::

[[toc]]

## 如何衡量一个程序员的能力？


因为是软件工程专业的学生的原因，专业就是培养程序员的所以一直在考虑如何衡量一个程序员的能力，在我看来，程序员的能力很大部分是由其**眼界，深入程度，学习状态**所决定的。

眼界就是见世面，所能接触到的专业知识和编程思想开发过程方法等方面的储备，强调的是广度；

深入程度是对于眼界中的技术深入了解思考以及细节的把控，强调的是深度；

学习状态是指对于专业学习的热情以及学习专业知识的状态，强调的是自身。

眼界同时会影响学习状态，因为你所储备的知识越多对于学习新知识的理解以及掌握就会越快，对技术深入应当是有选择性的而选择来自眼界，学习状态对于技术的深入程度起着至关重要的作用。假如以为程序员负责开发一个较为复杂的系统，那么开发中最重要的三点都可通过这三项能力来衡量，**眼界将从技术选型上控制系统的复杂度，深入程度将从实现上控制系统复杂度，学习状态以及眼界中的（软件工程+系统架构）将从时间上控制系统的复杂度。**

## **眼界**:

眼界就如同你工具箱里面的工具，眼界的广度就是你工具的多少，为了解决不同的难题你需要选择合适的工具。

### 1.**基础理论知识**
（主要算法理论，数据结构，计算机网络，计算机组成原理，操作系统，数据库原理，Linux等）

这些是专业基础知识，你的能力是构建在这些基础理论知识之上的，如果基础不牢固自然你想建高也会比较困难。算法，数据库和数据结构服务于实际编程的需求，计算机网络是网络的基础认识，计算机组成和操作系统是对计算机的工作原理的详细介绍，这些都是专业必修课。

### 2.**编程语言**

编程语言有很多种分发，我们按照编程范式将编程语言分为：过程式，面向对象，函数式，泛型，混合式等。

例如：

C语言：过程式编程语言

Java：面向对象编程语言（应当最为熟悉不过了）

Haskell:函数式编程语言

Python:面向对象+函数式编程

C++/swift：过程+面向对象+泛型

### 3.**基础框架知识+WEB技术**

例如：JAVA EE基础框架Hibernate,Mybatis,Struts 2,Spring等

大数据处理框架 Hadoop（HDFS,YARN,MapReduce...）, Flink , Spark等

### 4.**数据库**

关系型数据库：mysql，oracle等

Nosql:Redis，MongoDB，Memcache等

### 5.**系统架构**

如何架构出低耦合易扩展的优秀系统，其中就包括六大原则23种设计模式，正好现在就在看，可以讲的细一点，有兴趣的可以看看我做的笔记。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dev/abilityevaluation/basic-1.png')" alt="wxmp">


<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dev/abilityevaluation/basic-2.png')" alt="wxmp">



23种设计模式比较常用的是：工厂方法模式，抽象工厂模式，单例模式，原形模式，builder模式，观察者模式，代理模式，策略模式等。推荐本书——Android源码设计模式解析与实战，里面对23种设计模式都有详细介绍。23种设计模式都围绕着低耦合高内聚可扩展来设计，其中面向接口编程尤为重要。

### 6.**软件工程**

主要是三要素（方法，工具，过程）和软件生命周期（需求分析，总体设计等巴拉巴拉一大堆）等

方法：主要是传统方法学和面向对象方法学。

传统方法学（面向过程）：（结构化分析+结构化设计+结构化设计）一个阶段一个阶段顺序进行开发，前一个阶段是下一个阶段工作的前提和基础，每一个阶段的开始和结束都有严格的标准，强调自顶向下顺序的完成软件开发。

面向对象方法学：一种把面向对象的思想应用于软件开发过程中，是建立在“对象”概念基础上的方法学，强调主动多次反复迭代的演化过程。

传统方法编程以过程为中心,把大的程序划分为若干个相对独立、功能简单的程序模块，强调过程,强调功能和模块化,通过一系列过程的调用和处理完成相应的任务。

面向对象编程以对象为中心,是对一系列相关对象的操纵,发送消息给对象,由对象执行相应的操作并返回结果,强调对象。理论上,面向对象的程序设计方法将产生更好的模块内聚和耦合特性,使得软件更易于重用与维护。



工具：计算机辅助软件。



过程：教科书上主要讲的瀑布模型，螺旋模型，喷泉模型，rational统一过程我就不多累赘了。主要讲一下现在最为流行的敏捷开发（敏捷开发包含《敏捷开发宣言》和《敏捷开发十二条原则》，敏捷（Agile）是一套原则和价值观，以价值驱动，人为核心、迭代、循序渐进的开发理念,注重人与人之间的沟通、交流）。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dev/abilityevaluation/basic-3.png')" alt="wxmp">

其中Scrum是最为广泛的敏捷开发实现方式，迭代式增量开发过程了。主要流程包括三个角色（PO,ST,SM），四个会议(Sprint Planning,Daily Scrum,Sprint Review,Sprint Retrospective)，三个物件(Product Backlog ,Sprint Backlog,Burn Down Chart)。极限编程就不介绍了，因为结对编程，我觉得不行。





## **深入程度**:

深入程度相当于你使用工具的熟练程度，对技术的深入程度，是在眼界的基础上对各项领域的研究和投入，最好在某一两个领域有深入的研究。我们首先从接触学习到简单使用，再深入就是对其运行机制和底层内核原理的研究（如果开源项目研究其源码也是一种方式）。

对于眼界中提到的几大领域，我尤为要提出的就是编程语言+架构能力+软件工程，我觉得对这三方面的深入程度对系统实现的影响较大。

编程语言拿java举例，java的深入我们就该去了解java虚拟机的运行机制(比如类是如何加载的,保证线程安全的实现方式等)，集合框架，泛型和反射机制等等。对于架构能力和软件工程，我在前面都有介绍。



## **学习状态**:

轮子哥说过：计算机天赋就是学习的时候心无旁骛！

## 参考文章
* https://zhuanlan.zhihu.com/p/51044143