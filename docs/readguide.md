---
title: 知识目录体系【必读】
sidebar: auto
---

::: tip
大家好，我是一个技术爱好者，目前主要岗位方向是后端。随着人工智能的发展，智能化已经是一个不可逆转的浪潮和趋势。与此同时，生活和工作节奏不断加快，智能推荐、智能识别、智能决策等智能技术不断在身边的应用和服务中使用，每个人在工作和生活中的时间很容易被碎片化。
:::


## 为什么要整理这个知识体系
在这个信息碎片化的环境下，很多技术知识点，就会有些零散，不成体系，同时很多同学也有学习人工智能方面的愿望和需求，因为越来越多的后端服务需要处理智能化业务场景。 整理这些内容的初衷第一是为了帮助自己掌握后端的相关知识体系，提升自己的在Java基础、架构基础、智能化后端方面的能力，同时也希望借助这些整理，帮助到一些被信息和知识碎片困扰的同学。


**万丈高楼平地起，不积跬步无以至千里**，希望体系化的知识沉淀和积累，能帮助自己和更多的同学一起 夯实基础，希望和更多的同学一起成长和进步。

## 智能后端的知识体系整理

智能后端的知识体系 涉及到领域初步划分：

* Java
* 数据库
* 算法
* 人工智能
* Spring
* 框架
* 架构
* 开发
* 综合
* 项目和产品
...


## 适合什么样的人群阅读 
* 新手开发者：知识体系沉淀的整理，对于新手可以提供个人知识体系成长参考
* 在校大学生：在考虑职业发展方向为后端时，里面的知识体系应该对你的选择会有一定的帮助。
* 开发学习进阶：对于有一定经验的同学来说，里面相对来说一些高阶的知识和原理对你的提升应该会有些许帮助
* 全栈开发：对于想全面发展的同学来说，希望这里的知识体系能帮助你提升知识的广度
* 架构师进阶：如果你是架构大神，希望能帮助到你补缺知识体系，如果发现有不足和纰漏，也请可以联系作者和提交Issue。
* 后端自学AI提升：对于想学AI的同学来说，希望这里的基础内容能帮助你走进AI的大门
* 面试官：总体的知识图谱和体系，可以帮助你面试人员过程更好的甄别适合你团队的人才
  
最后，希望每个人在此都能找到自己有用的知识，同时也期待和你一起交流一起提升。感兴趣的同学，可以关注如下公众号获取最新的更新内容：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/wx/wxmp.jpg')" alt="wxmp">

如果你有问题期待和作者以及其他的同学们一起交流，也可以加入如果QQ群：

QQ群:569556849 

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/qq/qqgroup.png')" alt="wxmp">


## 知识分类的目录整理：

## Java相关整理

## Java历史简述

计算机被发明以后，经历了主要有三代语言，第一代：机器语言，第二代：汇编语言，第三代：高级语言，前面两代语言都是面向机器"0"和"1"，理解和使用都还是比较困难的。第三代高级语言，进入了 面向人类 的阶段。主要分类面向过程和面向对象两种，其中面向过程的 语言有C、ADA、COBOL、Fortan、PASCAL，面对对象的语言代表有：C#、C++、Java、Python，其中 C++ 是属于半面向对象，半面向过程。另外C#属于微软.Net的生态语言，设计和使用和Java极为相似。Python属于面向对象的解释性语言，性能较慢，而且语言版本之间的兼容性不是很好，比如Python2和python3之间的语法和使用有很多的差别，没有延续性，但是Python的使用极为简单，而且提供大量非常丰富的数学、机器学习、网络服务、文件处理的工具库。在爬虫类、AI机器学习、大数据挖掘这方面有非常广泛的使用。

Java语言因为其跨操作系统平台，以及早期的互联网网络特性的支持，成为互联网Web应用、企业服务应用、中间件开发的主流语言，在最近20年，长期在语言市场占比中排名top5，同时也是市场需求容量最大的语言之一。

1995年5月23日，Sun在Sun World会议上正式发布Java语言和HotJava浏览器。IBM、Apple、DEC、Adobe、HP、Oracle、Netscape和Microsoft等各大公司都纷纷停止了自己的相关开发项目，竞相购买了Java使用许可证，并为自己的产品开发了相应的Java平台。

Java 分为三个体系：

- JavaSE(J2SE): Java2 Platform Standard Edition，Java平台标准版
- JavaEE(J2EE): Java 2 Platform,Enterprise Edition，Java平台企业版
- JavaME(J2ME): Java 2 Platform Micro Edition，Java平台微型版

2005年6月，JavaOne 大会召开，Sun 公司公开 Java SE 6。此时，Java 的各种版本已经更名以取消其中的数字"2"：J2EE更名为Java EE, J2SE更名为Java SE，J2ME更名为Java ME。

## Java虚拟机

Java语言的核心设计理念之一：跨平台。一处编写，处处执行，成为Java早期传播和发展的重要口号。

Java语言的跨平台的核心机制是Java虚拟机(简称Jvm)：

Java虚拟机的工作原理。从最初的我们编写的Java源文件（.java文件）是如何一步步执行的，如下图所示，首先Java源文件经过前端编译器（javac或ECJ）将.java文件编译为Java字节码文件，然后JRE加载Java字节码文件，载入系统分配给JVM的内存区，然后执行引擎解释或编译类文件，再由即时编译器将字节码转化为机器码。主要介绍下图中的类加载器和运行时数据区两个部分。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/java/jvm/prin-1.png')" alt="wxmp">

虚拟机的基础和工作原理详细内容可以参见如下文章：  

- [虚拟机知识入门](/java/jvm/01-intro.html)
- [虚拟机工作原理](/java/jvm/02-workprinciple.html)

## Java语言特性
- **简单**

Java 语言的语法与 `C` 语言和 `C++` 语言很接近，使得大多数程序员很容易学习和使用。另一方面，Java 丢弃了 `C++` 中很少使用的、很难理解的、令人迷惑的那些特性，如操作符重载、多继承、自动的强制类型转换。特别地，Java 语言不使用指针，而使用引用。并提供了自动的垃圾回收，使得程序员不必为内存管理而担忧。

- **面向对象**

Java 语言提供类、接口和继承等面向对象的特性，为了简单起见，只支持类之间的单继承，但支持接口之间的多继承，并支持类与接口之间的实现机制(关键字为 `implements` )。Java 语言全面支持动态绑定，而 `C++` 语言只对虚函数使用动态绑定。总之，Java 语言是一个纯的面向对象程序设计语言。

- **分布式**

Java 语言支持 `Internet` 应用的开发，在基本的 Java 应用编程接口中有一个网络应用编程接口(`java net`)，它提供了用于网络应用编程的类库，包括`URL`、`URLConnection`、`Socket`、`ServerSocket`等。Java 的 `RMI`(远程方法激活)机制也是开发分布式应用的重要手段。

- **健壮**

Java 的强类型机制、异常处理、垃圾的自动收集等是 Java 程序健壮性的重要保证。对指针的丢弃是 Java 的明智选择。Java的安全检查机制使得 Java 更具健壮性。

推荐阅读：

  - [Java异常和错误](/java/basic/05-exception.html)


- **安全**

Java 通常被用在网络环境中，为此，Java 提供了一个安全机制以防恶意代码的攻击。除了 Java 语言具有的许多安全特性以外，Java 对通过网络下载的类具有一个安全防范机制(类 `ClassLoader`)，如分配不同的名字空间以防替代本地的同名类、字节代码检查，并提供安全管理机制(类 `SecurityManager`)让 Java 应用设置安全哨兵。

- **体系结构**

Java 程序(后缀为 `.java` 的文件)在 Java 平台上被编译为体系结构中立的字节码格式(后缀为 `.class` 的文件)，然后可以在实现这个 Java 平台的任何系统中运行。这种途径适合于异构的网络环境和软件的分发。

- **可移植**

这种可移植性来源于体系结构中立性，另外，Java 还严格规定了各个基本数据类型的长度。Java 系统本身也具有很强的可移植性，Java 编译器是用Java 实现的，Java 的运行环境是用 `ANSI C` 实现的。

- **解释型**

如前所述，Java 程序在 Java 平台上被编译为字节码格式，然后可以在实现这个 Java 平台的任何系统中运行。在运行时，Java 平台中的 Java 解释器对这些字节码进行解释执行，执行过程中需要的类在联接阶段被载入到运行环境中。

- **高性能**

与那些解释型的高级脚本语言相比，Java 的确是高性能的。事实上，Java 的运行速度随着 `JIT(Just-In-Time)` 编译器技术的发展越来越接近于 `C++`。

- **多线程**

在 Java 语言中，线程是一种特殊的对象，它必须由 `Thread` 类或其子(孙)类来创建。通常有两种方法来创建线程：其一，使用型构为 `Thread(Runnable)` 的构造子类将一个实现了 `Runnable` 接口的对象包装成一个线程，其二，从 `Thread` 类派生出子类并重写 `run` 方法，使用该子类创建的对象即为线程。值得注意的是 `Thread` 类已经实现了 `Runnable` 接口，因此，任何一个线程均有它的 `run` 方法，而 `run` 方法中包含了线程所要运行的代码。线程的活动由一组方法来控制。Java 语言支持多个线程的同时执行，并提供多线程之间的同步机制(关键字为 `synchronized`)。

多线相关和并发编程的知识推荐阅读：

  - [并发编程-入门介绍](/java/thread/01-intro.html)
  - [并发编程-线程创建](/java/thread/02-multithread.html)
  - [并发编程-综合介绍](/java/thread/03-conintro.html)
  - [线程-实现方式比较](/java/thread/04-threadcreatediff.html)
  - [并发编程-JUC简介](/java/juc/01-intro.html)
  - [并发编程-JUC包介绍](/java/juc/02-juccatogray.html)

- **动态**

Java 语言的设计目标之一是适应于动态变化的环境。Java 程序需要的类能够动态地被载入到运行环境，也可以通过网络来载入所需要的类。这也有利于软件的升级。另外，Java 中的类有一个运行时刻的表示，能进行运行时刻的类型检查。

## Java知识体系图谱

### Java基础知识总体图谱


<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/guide/intro/javabasicsum-1.png')" alt="wxmp">


### Java核心知识详细图谱


<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/guide/intro/javacore-1.png')" alt="wxmp">


### Java工程师整体知识体系图谱


<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/guide/intro/javaknowledgesystem-1.png')" alt="wxmp">


## Java基础知识体系目录

### Java语言基础
  - [Java基础介绍](/java/intro/01-java-intro.html)
  - [Java安装和环境变量](/java/intro/02-java-install.html)
  - [Java基础语法](/java/intro/03-java-grammer.html)
  - [Java类和对象操作](/java/intro/04-java-classaobject.html)
  - [Java流程执行操作](/java/intro/05-java-process-op.html)
  - [Java常用类和结构](/java/intro/06-java-syscomclass.html)
  - [Java类型转换](/java/intro/06.1-java-typeconvert.html)
  - [Java正则表达式](/java/intro/07-java-regexp.html)
  - [Java方法定义和操作](/java/intro/08-java-method.html)
### Java面向对象基础
  - [Java语言特性](/java/basic/01-lan-feature.html)
  - [Java面向对象特征](/java/basic/02-oop-feature.html)
  - [Java类和接口基础](/java/basic/03-class.html)
  - [Java反射机制](/java/basic/04-reflection.html)
  - [Java异常和错误](/java/basic/05-exception.html)
### Java集合类
  - [Java集合类基础介绍](/java/collection/01-intro.html)
  - [集合接口Collction、Map](/java/collection/02-collectionmap.html)
  - [Java集合类 Set](/java/collection/03-set.html)
  - [Java集合类 List](/java/collection/04-list.html)
  - [Java集合类 Queue](/java/collection/05-queue.html)
  - [Java集合类 Map](/java/collection/06-map.html)
  - [List原理和总结](/java/collection/07-listmapprinciple.html)
  - [Hash集合原理和总结](/java/collection/08-hashcollectionprin.html)
  - [集合List和Array数组转化](/java/collection/08.1-listconvertarray.html)
  - [集合List交集、并集、差集](/java/collection/08.2-listlistdeal.html)
  - [lambda表达式-基础语法](/java/collection/08.3-lambdabascigrammar.html)
  - [lambda表达式-Stream语法](/java/collection/08.3-lambdagrammarstream.html)
  - [lambda表达式-入门介绍](/java/collection/08.3-lambdaintro.html)
  - [lambda表达式-使用案例总结](/java/collection/08.4-lambdacommon.html)
  - [lambda表达式-项目常用总结](/java/collection/08.5-lambdaintroprosum.html)
  - [集合类精华总结](/java/collection/09-collectionsummary.html)
### Java文件IO流
  - [IO流编程入门](/java/file/01-intro.html)
  - [File类介绍](/java/file/02-file.html)
  - [IO流输入输出操作](/java/file/03-iobasic.html)
  - [IO流详解](/java/file/04-iodetail.html)
  - [IO流精华总结](/java/file/05-summary.html)
### Java网络编程
  - [Java网络编程入门](/java/net/01-intro.html)
  - [OSI七层模型和TCP/IP](/java/net/02-netmodel.html)
  - [网络编程基本概念](/java/net/03-basicconcept.html)
  - [网络编程基础入门](/java/net/04-basicintro.html)
  - [网络编程-TCP详解](/java/net/05-tcpdetail.html)
  - [网络编程-UDP详解](/java/net/06-udpdetail.html)
  - [网络编程-URI和URL](/java/net/07-urlanduri.html)
  - [网络编程-分类详解](/java/net/08-netdetail.html)
  - [网络编程-精华总结](/java/net/09-netsummary.html)
### Java并发编程基础
  - [并发编程-入门介绍](/java/thread/01-intro.html)
  - [并发编程-线程创建](/java/thread/02-multithread.html)
  - [并发编程-综合介绍](/java/thread/03-conintro.html)
  - [线程-实现方式比较](/java/thread/04-threadcreatediff.html)
  - [线程-基础操作和属性](/java/thread/05-threadattrop.html)
  - [线程-常用方法和修饰符](/java/thread/06-threadmethod.html)
  - [线程-同步问题总结](/java/thread/07-threadsyncsum.html)
  - [线程-变量副本](/java/thread/08-threadlocal.html)
  - [线程-线程组](/java/thread/09-threadgroup.html)
  - [线程-非阻塞算法介绍](/java/thread/10-threadsyncalgorithm.html)
  - [线程-Hook和异常捕捉](/java/thread/11-threadhookexception.html)
### Java并发编程JUC
  - [并发编程-JUC简介](/java/juc/01-intro.html)
  - [并发编程-JUC包介绍](/java/juc/02-juccatogray.html)
  - [并发编程-JUC博客推荐](/java/juc/03-jucblogrecommend.html)
  - [JUC-锁-介绍](/java/juc/04-juclockintro.html)
  - [JUC-锁-比较](/java/juc/05-juclockdiff.html)
  - [JUC-锁-AQS原理](/java/juc/06-juclockaqs.html)
  - [JUC-锁-基础使用](/java/juc/07-juclockuse.html)
  - [JUC-原子框架-Unsafe类](/java/juc/08-jucatounsafe.html)
  - [JUC-原子框架-原子类介绍](/java/juc/09-jucatointro.html)
  - [JUC-原子框架-CAS原理](/java/juc/10-jucatocas.html)
  - [JUC-原子框架-ABA解决方案](/java/juc/11-jucatoaba.html)
  - [JUC-同步器-介绍](/java/juc/12-jucsyncintro.html)
  - [JUC-同步器-AQS框架原理](/java/juc/13-jucsyncaqs.html)
  - [JUC-集合-基础介绍](/java/juc/14-juccolintro.html)
  - [JUC-ConcurrentHashMap原理](/java/juc/15-juccolhashmapbasic.html)
  - [JUC-ConcurrentHashMap扩容](/java/juc/16-juccolhashmapadd.html)
  - [JUC-ConcurrentHashMap比较](/java/juc/17-juccolhashmapdiff.html)
  - [JUC-执行器-框架介绍](/java/juc/18-jucexeintro.html)
  - [JUC-执行器-普通线程池](/java/juc/19-jucexecommonthreadpool.html)
  - [JUC-执行器-计划线程池](/java/juc/20-jucexescheduldthreadpool.html)
  - [JUC-执行器-Future 模式](/java/juc/21-jucexefuture.html)
  - [JUC-执行器-Fork/Join原理](/java/juc/22-jucexeforkjoinprin.html)
  - [JUC-执行器-Fork/Join实现](/java/juc/23-jucexeforkjoindetail.html)
### Jvm虚拟机相关
  - [虚拟机知识入门](/java/jvm/01-intro.html)
  - [虚拟机工作原理](/java/jvm/02-workprinciple.html)
  - [JVM-内存模型](/java/jvm/03-memorymodel.html)
  - [JVM-类加载机制](/java/jvm/04-classload.html)
  - [JVM-垃圾回收机制](/java/jvm/05-gc.html)
  - [JVM-优化命令](/java/jvm/06-optcmd.html)
  - [JVM-优化案例](/java/jvm/07-optcase.html)
  - [JVM-精华总结](/java/jvm/08-summary.html)
### Java语言特性
  - [Java 8语言新特性](/java/characteristic/01-java8.html)
  - [Java 9语言新特性](/java/characteristic/02-java9.html)
  - [Java 10语言新特性](/java/characteristic/03-java10.html)
  - [Java 11语言新特性](/java/characteristic/04-java11.html)
  - [Java 12语言新特性](/java/characteristic/05-java12.html)
  - [Java 13语言新特性](/java/characteristic/06-java13.html)
  - [Java 14语言新特性](/java/characteristic/07-java14.html)
  - [Java 15语言新特性](/java/characteristic/08-java15.html)

## 数据库相关知识体系

数据库是数据管理的最新技术，是计算机科学的重要分支。

感性认识一下数据库：

数据：学生数据

数据管理：数据的存储，更新，查询统计排序等

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/db/intro/intro-01.png')" alt="wxmp">

## 数据库系统概述

在系统介绍数据库的基本概念之前，首先了解一些数据库最常用的术语和基本概念。

 

### 数据、数据库、数据库管理系统、数据库系统

#### a) 数据（data）（数据是数据库中存储的基本对象）

例如：李明，男，21，1972，江苏，计算机，1999

- 描述事物的符号记录称为数据。
- 数据！=数字 (数字只是其中的一种形式）
- 形式：数值、文字、图形、图像、声音 等。（符号）
- 信息(information)：数据所表示的含义称为信息。
- 数据与信息的关系：数据是信息的载体，数据的内涵是信息，数据语义表达了信息，同时数据和语义是不可分的。

 

#### b) 数据库Database(DB)

数据库:长期存储在计算机内的、有组织的、可共享的数据集合。

特点：数据库中的数据具有较小的冗余度、较高的数据独立性和易扩展性，并可为各种用户共享。

- 冗余度，通俗的讲就是数据的重复度。在一个数据集合中重复的数据称为数据冗余
- 数据独立性是指应用程序和数据结构之间相互独立, 互不影响
- 易扩展性指当有新的业务逻辑，数据库结构变动无须太大

 

#### c) 数据库管理系统Database Management System(DBMS)

DBMS是对数据库建立、操纵、维护的系统软件。它主要功能包括以下几个方面：

l 数据定义功能

提供数据定义语言DDL（Data Definition Language),定义数据库对象（如数据库，数据表，视图等）

l 数据组织、存储和管理

提高存储空间利用率和方便存取，提供多种存取方法（如索引查找）来提高存取效率。

l 数据操纵功能

提供数据操纵语言DML（Data Manipulation Language),实现数据插入，修改，删除，查询等

l 数据库的事务管理和运行管理

实现数据库的安全性、完整性(有效性)，多用户并发控制

l 数据库的建立和维护功能

数据库初始数据的装入、转换功能，数据库的转储、恢复功能，数据库的重组织功能和性能监视、分析功能等。

l 其他功能

DBMS与网络中其他软件系统的通信功能；一个DBMS与另一个DBMS或文件系统的数据转换功能；异构数据库之间的互访和互操作功能等。

 

#### d) 数据库系统Database System(DBS)

数据库系统是指在计算机系统中引入数据库后的系统，通常由下面部分组成：

​                    i.       数据库 DB

​                   ii.       操作系统（ Operating System ，简称OS）

​                  iii.       数据库管理系统 DBMS

​                  iv.       开发工具SDK开发的应用系统APP

​                   v.       管理员DBA

​                  vi.       用户USER

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/db/intro/intro-02.png')" alt="wxmp">

更多信息推荐阅读：

- [数据库绪论](/db/intro/01-intro.html)

## 常见数据库种类的分类：

### 数据库的分类

按照早期的数据库理论，比较流行的数据库模型有三种，分别为层次式数据库、网状数据库和关系型数据库。而在当今的互联网中，最常见的数据库模型主要是两种，即**SQL关系型数据库**和**NoSQL非关系型数据库**。

### 关系型数据库介绍

**关系数据库前 10 名如下**：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/db/intro/dbcatrank-2.png')" alt="wxmp">

**1、关系型数据库的由来**

虽然网状数据库和层次数据库已经很好的解决了数据的集中和共享问题，但是在数据库独立性和抽象级别上扔有很大欠缺。用户在对这两种数据库进行存取时，仍然需要明确数据的存储结构，指出存取路径。而关系型数据库就可以较好的解决这些问题。

**2、关系型数据库介绍**

关系型数据库模型是把复杂的数据结构归结为简单的二元关系（即二维表格形式）。在关系型数据库中，对数据的操作几乎全部建立在一个或多个关系表格上，通过对这些关联的表格分类、合并、连接或选取等运算来实现数据库的管理。

关系型数据库诞生40多年了，从理论产生发展到现实产品，例如**Oracle**和**MySQL**，Oracle在数据库领域上升到霸主地位，形成每年高达数百亿美元的庞大产业市场。

**传统关系数据库**：[Oracle](https://db-engines.com/en/system/Oracle)、[MySQL](https://db-engines.com/en/system/MySQL)、[Microsoft SQL Server](https://db-engines.com/en/system/Microsoft+SQL+Server)、[PostgreSQL](https://db-engines.com/en/system/PostgreSQL)

**大数据常见数据库**：[Hive](https://db-engines.com/en/system/Hive)、[Impala](https://db-engines.com/en/system/Impala)、[Presto](https://db-engines.com/en/system/Presto)、[ClickHouse](https://db-engines.com/en/system/ClickHouse)

### 非关系型数据库介绍

**1、非关系型数据库诞生背景**

NoSQL，泛指非关系型的数据库。随着互联网web2.0网站的兴起，传统的关系数据库在应付web2.0网站，特别是超大规模和高并发的SNS类型的web2.0纯动态网站已经显得力不从心，暴露了很多难以克服的问题，而非关系型的数据库则由于其本身的特点得到了非常迅速的发展。NoSql数据库在特定的场景下可以发挥出难以想象的高效率和高性能，它是作为对传统关系型数据库的一个有效的补充。

NoSQL(NoSQL = Not Only SQL )，意即“不仅仅是SQL”，是一项全新的数据库革命性运动，早期就有人提出，发展至2009年趋势越发高涨。NoSQL的拥护者们提倡运用非关系型的数据存储，相对于铺天盖地的关系型数据库运用，这一概念无疑是一种全新的思维的注入。

**2、非关系型数据库种类**

（1）键值（Key-Value）存储数据库**

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/db/intro/dbcatrank-3.png')" alt="wxmp">

键值数据库就类似传统语言中使用的**哈希表**。可以通过key来添加、查询或者删除数据库，因为使用key主键访问，所以会获得很高的性能及扩展性。

键值数据库主要使用一个**哈希表**，这个表中有一个特定的键和一个指针指向特定的数据。Key/value模型对于IT系统来说的优势在于简单、易部署、高并发。

**典型产品：Memcached、Redis、Ehcache**

更多信息推荐阅读：

- [数据库分类介绍](/db/intro/02.1-dbcatintro.html)

 
## 数据库基础知识体系目录

### 数据库基础
  - [数据库绪论](/db/intro/01-intro.html)
  - [关系数据库](/db/intro/02-relationdb.html)
  - [关系数据库语言SQL](/db/intro/03-sqlintro.html)
  - [数据库安全性](/db/intro/04-security.html)
  - [数据库完整性](/db/intro/05-commplete.html)
  - [关系数据理论](/db/intro/06-dbtheory.html)
  - [数据库设计](/db/intro/07-dbdesign.html)
  - [数据库设计三大范式](/db/intro/08-dbthreepara.html)
### 基础常用SQL
  - [常用SQL-基本查询](/db/comsql/01-basicselect.html)
  - [常用SQL-连表查询](/db/comsql/02-joinselect.html)
  - [常用SQL-其他查询](/db/comsql/03-otherselect.html)
  - [常用SQL-编辑类](/db/comsql/04-editsql.html)
  - [常用SQL-存储过程](/db/comsql/05-procedure.html)
  - [常用SQL-触发器](/db/comsql/06-trigger.html)
  - [常用SQL-综合案例](/db/comsql/07-sumcase.html)
### MySQL基础知识
  - [MySQL-入门介绍](/db/mysqlbasic/01-intro.html)
  - [MySQL-常用命令](/db/mysqlbasic/01.1-mysqlcmd.html)
  - [MySQL-常用函数](/db/mysqlbasic/01.2-mysqlfunction.html)
  - [MySQL-存储引擎](/db/mysqlbasic/02-storageengine.html)
  - [MySQL-索引](/db/mysqlbasic/03-mysqlindex.html)
  - [MySQL-事务](/db/mysqlbasic/04-mysqltransaction.html)
  - [MySQL-锁](/db/mysqlbasic/05-mysqllock.html)
  - [MySQL-系统字典数据库](/db/mysqlbasic/05.1-informationschema.html)
  - [MySQL-获取业务数据字典](/db/mysqlbasic/05.2-mysqlbusidict.html)
  - [MySQL-精华总结](/db/mysqlbasic/06-mysqlsummary.html)
### MySQL存储过程和函数
  - [MySQL-存储过程](/db/mysqlpro/01-procedure.html)
  - [MySQL-函数](/db/mysqlpro/02-function.html)
  - [MySQL-存储过程和函数调用](/db/mysqlpro/03-call.html)
  - [MySQL-存储过程函数开发](/db/mysqlpro/04-devrela.html)
  - [MySQL-游标](/db/mysqlpro/05-cursor.html)
  - [MySQL-触发器](/db/mysqlpro/06-trigger.html)
  - [MySQL-触发器案例](/db/mysqlpro/06.1-triggercase.html)
### MySQL性能优化(一)
  - [性能优化方案](/db/mysqlopt1/01-solutionsum.html)
  - [索引设计优化](/db/mysqlopt1/02-idxdesignopt.html)
  - [查看执行计划](/db/mysqlopt1/03-explainplan.html)
  - [查询性能优化](/db/mysqlopt1/04-selectopt.html)
  - [慢查询和索引优化](/db/mysqlopt1/05-slowselect.html)
  - [查询优化总结](/db/mysqlopt1/06-selectsummary.html)
### MySQL性能优化(二)
  - [分区和分表](/db/mysqlopt2/01-districtandtable.html)
  - [主从复制原理](/db/mysqlopt2/02-masterslavecopyprin.html)
  - [主从复制案例](/db/mysqlopt2/03-masterslavecopycase.html)
  - [负载均衡介绍](/db/mysqlopt2/04-loadbalance.html)
  - [读写分离介绍](/db/mysqlopt2/05-readwritesepration.html)
  - [配置和硬件优化](/db/mysqlopt2/06-paramopt.html)
### Redis介绍和总结
  - [Redis入门介绍](/db/redis/01-intro.html)
  - [Redis安装部署](/db/redis/02-install.html)
  - [Redis操作命令](/db/redis/03-optcmd.html)
  - [Redis中IO多路复用](/db/redis/04-iomultiplexing.html)
  - [Redis核心技术总结](/db/redis/05-coreknowledge.html)
  - [Redis精华总结](/db/redis/06-summary.html)




