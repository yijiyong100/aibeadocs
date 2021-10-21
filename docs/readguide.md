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

## ♥♥♥-----【Java篇】------♥♥♥

### Java历史简述

计算机被发明以后，经历了主要有三代语言，第一代：机器语言，第二代：汇编语言，第三代：高级语言，前面两代语言都是面向机器"0"和"1"，理解和使用都还是比较困难的。第三代高级语言，进入了 面向人类 的阶段。主要分为面向过程和面向对象两种，其中面向过程的语言代表有C、ADA、COBOL、Fortan、PASCAL，面对对象的语言代表有：C#、C++、Java、Python，其中 C++ 是属于半面向对象，半面向过程。另外C#属于微软.Net的生态语言，设计和使用和Java极为相似。Python属于面向对象的解释性语言，性能较慢，而且语言版本之间的兼容性不是很好，比如Python2和python3之间的语法和使用有很多的差别，没有延续性，但是Python的使用极为简单，而且提供大量非常丰富的数学、机器学习、网络服务、文件处理的工具库。在爬虫类、AI机器学习、大数据挖掘这方面有非常广泛的使用。

Java语言因为其跨操作系统平台，以及早期的互联网网络特性的支持，成为互联网Web应用、企业服务应用、中间件开发的主流语言，在最近20年，长期在语言市场占比中排名top5，同时也是市场需求容量最大的语言之一。

1995年5月23日，Sun在Sun World会议上正式发布Java语言和HotJava浏览器。IBM、Apple、DEC、Adobe、HP、Oracle、Netscape和Microsoft等各大公司都纷纷停止了自己的相关开发项目，竞相购买了Java使用许可证，并为自己的产品开发了相应的Java平台。

Java 分为三个体系：

- JavaSE(J2SE): Java2 Platform Standard Edition，Java平台标准版
- JavaEE(J2EE): Java 2 Platform,Enterprise Edition，Java平台企业版
- JavaME(J2ME): Java 2 Platform Micro Edition，Java平台微型版

2005年6月，JavaOne 大会召开，Sun 公司公开 Java SE 6。此时，Java 的各种版本已经更名以取消其中的数字"2"：J2EE更名为Java EE, J2SE更名为Java SE，J2ME更名为Java ME。

### Java虚拟机

Java语言的核心设计理念之一：跨平台。一处编写，处处执行，成为Java早期传播和发展的重要口号。

Java语言的跨平台的核心机制是Java虚拟机(简称Jvm)：

Java虚拟机的工作原理。从最初的我们编写的Java源文件（.java文件）是如何一步步执行的，如下图所示，首先Java源文件经过前端编译器（javac或ECJ）将.java文件编译为Java字节码文件，然后JRE加载Java字节码文件，载入系统分配给JVM的内存区，然后执行引擎解释或编译类文件，再由即时编译器将字节码转化为机器码。主要介绍下图中的类加载器和运行时数据区两个部分。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/java/jvm/prin-1.png')" alt="wxmp">

虚拟机的基础和工作原理详细内容可以参见如下文章：  

- [虚拟机知识入门](/java/jvm/01-intro.html)
- [虚拟机工作原理](/java/jvm/02-workprinciple.html)

### Java语言特性
- **简单**

Java 语言的语法与 `C` 语言和 `C++` 语言很接近，使得大多数程序员很容易学习和使用。另一方面，Java 丢弃了 `C++` 中很少使用的、很难理解的、令人迷惑的那些特性，如操作符重载、多继承、自动的强制类型转换。特别地，Java 语言不使用指针，而使用引用。并提供了自动的垃圾回收，使得程序员不必为内存管理而担忧。

- **面向对象**

Java 语言提供类、接口和继承等面向对象的特性，为了简单起见，只支持类之间的单继承，但支持接口之间的多继承，并支持类与接口之间的实现机制(关键字为 `implements` )。Java 语言全面支持动态绑定，而 `C++` 语言只对虚函数使用动态绑定。总之，Java 语言是一个纯的面向对象程序设计语言。

- **分布式**

Java 语言支持 `Internet` 应用的开发，在基本的 Java 应用编程接口中有一个网络应用编程接口(`java net`)，它提供了用于网络应用编程的类库，包括`URL`、`URLConnection`、`Socket`、`ServerSocket`等。Java 的 `RMI`(远程方法激活)机制也是开发分布式应用的重要手段。

- **健壮**

Java 的强类型机制、异常处理、垃圾的自动收集等是 Java 程序健壮性的重要保证。对指针的丢弃是 Java 的明智选择。Java的安全检查机制使得 Java 更具健壮性。

推荐阅读：

  - [Java异常和错误](/java/basic/06-exception.html)


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
  - [Java泛型介绍](/java/basic/03.1-generics.html)
  - [Java反射机制基础](/java/basic/04-reflection.html)
  - [Java反射精华总结](/java/basic/04.1-relectionsummay.html)
  - [Java注解基础](/java/basic/05-annotation.html)
  - [Java注解与反射](/java/basic/05.1-annotationandreflection.html)
  - [Java异常和错误](/java/basic/06-exception.html)
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
  - [JVM-类加载过程](/java/jvm/04.1-classloadprocedure.html)
  - [JVM-类加载器区别](/java/jvm/04.2-classloaderdiff.html)
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

## ♥♥♥-----【数据库】------♥♥♥

数据库是数据管理的最新技术，是计算机科学的重要分支。

感性认识一下数据库：

数据：学生数据

数据管理：数据的存储，更新，查询统计排序等

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/db/intro/intro-01.png')" alt="wxmp">

## 数据库系统概述

在系统介绍数据库的基本概念之前，首先了解一些数据库最常用的术语和基本概念。

### 基础概念 

数据、数据库、数据库管理系统、数据库系统

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

## ♥♥♥--【数据结构和算法】--♥♥♥

## 算法基础知识体系简介

### 数据结构介绍

数据结构是计算机存储、组织数据的方式。数据结构是指相互之间存在一种或多种特定关系的数据元素的集合。通常情况下，精心选择的数据结构可以带来更高的运行或者存储效率。数据结构往往同高效的检索算法和索引技术有关。

- **定义**

数据结构(data structure)是带有结构特性的数据元素的集合，它研究的是数据的逻辑结构和数据的物理结构以及它们之间的相互关系，并对这种结构定义相适应的运算，设计出相应的算法，并确保经过这些运算以后所得到的新结构仍保持原来的结构类型。简而言之，数据结构是相互之间存在一种或多种特定关系的数据元素的集合，即带“结构”的数据元素的集合。“结构”就是指数据元素之间存在的关系，分为逻辑结构和存储结构。
数据结构的研究内容是构造复杂软件系统的基础，它的核心技术是分解与抽象。通过分解可以划分出数据的层次；再通过抽象，舍弃数据元素的具体内容，就得到逻辑结构。类似地，通过分解将处理要求划分成各种功能，再通过抽象舍弃实现细节，就得到运算的定义。上述两个方面的结合可以将问题变换为数据结构。这是一个从具体（即具体问题）到抽象（即数据结构）的过程。然后，通过增加对实现细节的考虑进一步得到存储结构和实现运算，从而完成设计任务。这是一个从抽象（即数据结构）到具体（即具体实现）的过程。

- **研究对象**

- **数据的逻辑结构**

指反映数据元素之间的逻辑关系的数据结构，其中的逻辑关系是指数据元素之间的前后间关系，而与他们在计算机中的存储位置无关。逻辑结构包括：
- 1.集合：数据结构中的元素之间除了“同属一个集合” 的相互关系外，别无其他关系；
- 2.线性结构：数据结构中的元素存在一对一的相互关系；
- 3.树形结构：数据结构中的元素存在一对多的相互关系；
- 4.图形结构：数据结构中的元素存在多对多的相互关系。

- **数据的物理结构**

指数据的逻辑结构在计算机存储空间的存放形式。

数据的物理结构是数据结构在计算机中的表示（又称映像），它包括数据元素的机内表示和关系的机内表示。由于具体实现的方法有顺序、链接、索引、散列等多种，所以，一种数据结构可表示成一种或多种存储结构。

数据元素的机内表示（映像方法）： 用二进制位（bit）的位串表示数据元素。通常称这种位串为节点（node）。当数据元素有若干个数据项组成时，位串中与各个数据项对应的子位串称为数据域（data field）。因此，节点是数据元素的机内表示（或机内映像）。

关系的机内表示（映像方法）：数据元素之间的关系的机内表示可以分为顺序映像和非顺序映像，常用两种存储结构：顺序存储结构和链式存储结构。顺序映像借助元素在存储器中的相对位置来表示数据元素之间的逻辑关系。非顺序映像借助指示元素存储位置的指针（pointer）来表示数据元素之间的逻辑关系。

- **数据存储结构**

数据的逻辑结构在计算机存储空间中的存放形式称为数据的物理结构(也称为存储结构)。一般来说，一种数据结构的逻辑结构根据需要可以表示成多种存储结构，常用的存储结构有顺序存储、链式存储、索引存储和哈希存储等。
数据的顺序存储结构的特点是：借助元素在存储器中的相对位置来表示数据元素之间的逻辑关系；非顺序存储的特点是：借助指示元素存储地址的指针表示数据元素之间的逻辑关系。

### 常用的数据结构

在计算机科学的发展过程中，数据结构也随之发展。程序设计中常用的数据结构包括如下几个。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/algorithm/basic/intro-1.png')" alt="wxmp">

- **常用算法数组(Array)**

数组是一种聚合数据类型，它是将具有相同类型的若干变量有序地组织在一起的集合。数组可以说是最基本的数据结构，在各种编程语言中都有对应。一个数组可以分解为多个数组元素，按照数据元素的类型，数组可以分为整型数组、字符型数组、浮点型数组、指针数组和结构数组等。数组还可以有一维、二维以及多维等表现形式。

- **常用算法栈( Stack)**

栈是一种特殊的线性表，它只能在一个表的一个固定端进行数据结点的插入和删除操作。栈按照后进先出的原则来存储数据，也就是说，先插入的数据将被压入栈底，最后插入的数据在栈顶，读出数据时，从栈顶开始逐个读出。栈在汇编语言程序中，经常用于重要数据的现场保护。栈中没有数据时，称为空栈。

- **队列(Queue)**

队列和栈类似，也是一种特殊的线性表。和栈不同的是，队列只允许在表的一端进行插入操作，而在另一端进行删除操作。一般来说，进行插入操作的一端称为队尾，进行删除操作的一端称为队头。队列中没有元素时，称为空队列。

- **链表( Linked List)**

链表是一种数据元素按照链式存储结构进行存储的数据结构，这种存储结构具有在物理上存在非连续的特点。链表由一系列数据结点构成，每个数据结点包括数据域和指针域两部分。其中，指针域保存了数据结构中下一个元素存放的地址。链表结构中数据元素的逻辑顺序是通过链表中的指针链接次序来实现的。

- **树( Tree)**

树是典型的非线性结构，它是包括，2个结点的有穷集合K。在树结构中，有且仅有一个根结点，该结点没有前驱结点。在树结构中的其他结点都有且仅有一个前驱结点，而且可以有两个后继结点，m≥0。

- **图(Graph)**

图是另一种非线性数据结构。在图结构中，数据结点一般称为顶点，而边是顶点的有序偶对。如果两个顶点之间存在一条边，那么就表示这两个顶点具有相邻关系。

- **堆(Heap)**

堆是一种特殊的树形数据结构，一般讨论的堆都是二叉堆。堆的特点是根结点的值是所有结点中最小的或者最大的，并且根结点的两个子树也是一个堆结构。

- **散列表(Hash)**

散列表源自于散列函数(Hash function)，其思想是如果在结构中存在关键字和T相等的记录，那么必定在F(T)的存储位置可以找到该记录，这样就可以不用进行比较操作而直接取得所查记录。

### 常用算法

数据结构研究的内容：就是如何按一定的逻辑结构，把数据组织起来，并选择适当的存储表示方法把逻辑结构组织好的数据存储到计算机的存储器里。算法研究的目的是为了更有效的处理数据，提高数据运算效率。数据的运算是定义在数据的逻辑结构上，但运算的具体实现要在存储结构上进行。一般有以下几种常用运算：
- (1)检索。检索就是在数据结构里查找满足一定条件的节点。一般是给定一个某字段的值，找具有该字段值的节点。
- (2)插入。往数据结构中增加新的节点。
- (3)删除。把指定的结点从数据结构中去掉。
- (4)更新。改变指定节点的一个或多个字段的值。
- (5)排序。把节点按某种指定的顺序重新排列。例如递增或递减。


### 算法和数据结构知识图谱

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/algorithm/basic/intro-2.png')" alt="wxmp">



### 算法定义

算法（Algorithm）是指解题方案的准确而完整的描述，是一系列解决问题的清晰指令，算法代表着用系统的方法描述解决问题的策略机制。也就是说，能够对一定规范的输入，在有限时间内获得所要求的输出。如果一个算法有缺陷，或不适合于某个问题，执行这个算法将不会解决这个问题。不同的算法可能用不同的时间、空间或效率来完成同样的任务。一个算法的优劣可以用空间复杂度与时间复杂度来衡量。

### 算法的五个重要特征

一个算法应该具有以下五个重要的特征：

- **有穷性（Finiteness）**

算法的有穷性是指算法必须能在执行有限个步骤之后终止；

- **确切性(Definiteness)**

算法的每一步骤必须有确切的定义；

- **输入项(Input)**

一个算法有0个或多个输入，以刻画运算对象的初始情况，所谓0个输入是指算法本身定出了初始条件；

- **输出项(Output)**

一个算法有一个或多个输出，以反映对输入数据加工后的结果。没有输出的算法是毫无意义的；

- **可行性(Effectiveness)**

算法中执行的任何计算步骤都是可以被分解为基本的可执行的操作步骤，即每个计算步骤都可以在有限时间内完成（也称之为有效性）。

### 算法的核心要素

- **一、数据对象的运算和操作**

计算机可以执行的基本操作是以指令的形式描述的。一个计算机系统能执行的所有指令的集合，成为该计算机系统的指令系统。一个计算机的基本运算和操作有如下四类：
- 1.算术运算：加减乘除等运算
- 2.逻辑运算：或、且、非等运算
- 3.关系运算：大于、小于、等于、不等于等运算
- 4.数据传输：输入、输出、赋值等运算

- **二、算法的控制结构**

一个算法的功能结构不仅取决于所选用的操作，而且还与各操作之间的执行顺序有关。

### 算法的评定方式

同一问题可用不同算法解决，而一个算法的质量优劣将影响到算法乃至程序的效率。算法分析的目的在于选择合适算法和改进算法。一个算法的评价主要从时间复杂度和空间复杂度来考虑。

- **时间复杂度**

算法的时间复杂度是指执行算法所需要的计算工作量。一般来说，计算机算法是问题规模n 的函数f(n)，算法的时间复杂度也因此记做。
T(n)=Ο(f(n))
因此，问题的规模n 越大，算法执行的时间的增长率与f(n) 的增长率正相关，称作渐进时间复杂度（Asymptotic Time Complexity）。

- **空间复杂度**

算法的空间复杂度是指算法需要消耗的内存空间。其计算和表示方法与时间复杂度类似，一般都用复杂度的渐近性来表示。同时间复杂度相比，空间复杂度的分析要简单得多。

```bash
算法的时间复杂度和空间复杂度是衡量一个算法优劣的重要指标，也是面试常问的问题。
```

- **正确性**

算法的正确性是评价一个算法优劣的最重要的标准。

- **可读性**

算法的可读性是指一个算法可供人们阅读的容易程度。

- **健壮性**

健壮性是指一个算法对不合理数据输入的反应能力和处理能力，也称为容错性。

### 算法思想

- **递推法**

递推是序列计算机中的一种常用算法。它是按照一定的规律来计算序列中的每个项，通常是通过计算机前面的一些项来得出序列中的指定项的值。其思想是把一个复杂的庞大的计算过程转化为简单过程的多次重复，该算法利用了计算机速度快和不知疲倦的机器特点。

- **递归法**

程序调用自身的编程技巧称为递归（recursion）。一个过程或函数在其定义或说明中有直接或间接调用自身的一种方法，它通常把一个大型复杂的问题层层转化为一个与原问题相似的规模较小的问题来求解，递归策略只需少量的程序就可描述出解题过程所需要的多次重复计算，大大地减少了程序的代码量。递归的能力在于用有限的语句来定义对象的无限集合。一般来说，递归需要有边界条件、递归前进段和递归返回段。当边界条件不满足时，递归前进；当边界条件满足时，递归返回。

注意：
- (1) 递归就是在过程或函数里调用自身;
- (2) 在使用递归策略时，必须有一个明确的递归结束条件，称为递归出口。

- **穷举法**

穷举法，或称为暴力破解法，其基本思路是：对于要解决的问题，列举出它的所有可能的情况，逐个判断有哪些是符合问题所要求的条件，从而得到问题的解。它也常用于对于密码的破译，即将密码进行逐个推算直到找出真正的密码为止。例如一个已知是四位并且全部由数字组成的密码，其可能共有10000种组合，因此最多尝试10000次就能找到正确的密码。理论上利用这种方法可以破解任何一种密码，问题只在于如何缩短试误时间。因此有些人运用计算机来增加效率，有些人辅以字典来缩小密码组合的范围。

- **贪心算法**

贪心算法是一种对某些求最优解问题的更简单、更迅速的设计技术。

用贪心法设计算法的特点是一步一步地进行，常以当前情况为基础根据某个优化测度作最优选择，而不考虑各种可能的整体情况，它省去了为找最优解要穷尽所有可能而必须耗费的大量时间，它采用自顶向下,以迭代的方法做出相继的贪心选择,每做一次贪心选择就将所求问题简化为一个规模更小的子问题, 通过每一步贪心选择,可得到问题的一个最优解，虽然每一步上都要保证能获得局部最优解，但由此产生的全局解有时不一定是最优的，所以贪婪法不要回溯。

贪婪算法是一种改进了的分级处理方法，其核心是根据题意选取一种量度标准，然后将这多个输入排成这种量度标准所要求的顺序，按这种顺序一次输入一个量，如果这个输入和当前已构成在这种量度意义下的部分最佳解加在一起不能产生一个可行解，则不把此输入加到这部分解中。这种能够得到某种量度意义下最优解的分级处理方法称为贪婪算法。

对于一个给定的问题，往往可能有好几种量度标准。初看起来，这些量度标准似乎都是可取的，但实际上，用其中的大多数量度标准作贪婪处理所得到该量度意义下的最优解并不是问题的最优解，而是次优解。因此，选择能产生问题最优解的最优量度标准是使用贪婪算法的核心。
一般情况下，要选出最优量度标准并不是一件容易的事，但对某问题能选择出最优量度标准后，用贪婪算法求解则特别有效。

- **分治法**

分治法是把一个复杂的问题分成两个或更多的相同或相似的子问题，再把子问题分成更小的子问题……直到最后子问题可以简单的直接求解，原问题的解即子问题的解的合并。

分治法所能解决的问题一般具有以下几个特征：
- (1) 该问题的规模缩小到一定的程度就可以容易地解决；
- (2) 该问题可以分解为若干个规模较小的相同问题，即该问题具有最优子结构性质；
- (3) 利用该问题分解出的子问题的解可以合并为该问题的解；
- (4) 该问题所分解出的各个子问题是相互独立的，即子问题之间不包含公共的子子问题。

- **动态规划法**

动态规划是一种在数学和计算机科学中使用的，用于求解包含重叠子问题的最优化问题的方法。其基本思想是，将原问题分解为相似的子问题，在求解的过程中通过子问题的解求出原问题的解。动态规划的思想是多种算法的基础，被广泛应用于计算机科学和工程领域。

动态规划程序设计是对解最优化问题的一种途径、一种方法，而不是一种特殊算法。不象前面所述的那些搜索或数值计算那样，具有一个标准的数学表达式和明确清晰的解题方法。动态规划程序设计往往是针对一种最优化问题，由于各种问题的性质不同，确定最优解的条件也互不相同，因而动态规划的设计方法对不同的问题，有各具特色的解题方法，而不存在一种万能的动态规划算法，可以解决各类最优化问题。因此读者在学习时，除了要对基本概念和方法正确理解外，必须具体问题具体分析处理，以丰富的想象力去建立模型，用创造性的技巧去求解。

- **迭代法**

迭代法也称辗转法，是一种不断用变量的旧值递推新值的过程，跟迭代法相对应的是直接法（或者称为一次解法），即一次性解决问题。迭代法又分为精确迭代和近似迭代。“二分法”和“牛顿迭代法”属于近似迭代法。迭代算法是用计算机解决问题的一种基本方法。它利用计算机运算速度快、适合做重复性操作的特点，让计算机对一组指令（或一定步骤）进行重复执行，在每次执行这组指令（或这些步骤）时，都从变量的原值推出它的一个新值。

- **分支界限法**

分枝界限法是一个用途十分广泛的算法，运用这种算法的技巧性很强，不同类型的问题解法也各不相同。

分支定界法的基本思想是对有约束条件的最优化问题的所有可行解（数目有限）空间进行搜索。该算法在具体执行时，把全部可行的解空间不断分割为越来越小的子集（称为分支），并为每个子集内的解的值计算一个下界或上界（称为定界）。在每次分支后，对凡是界限超出已知可行解值那些子集不再做进一步分支，这样，解的许多子集（即搜索树上的许多结点）就可以不予考虑了，从而缩小了搜索范围。这一过程一直进行到找出可行解为止，该可行解的值不大于任何子集的界限。因此这种算法一般可以求得最优解。

与贪心算法一样，这种方法也是用来为组合优化问题设计求解算法的，所不同的是它在问题的整个可能解空间搜索，所设计出来的算法虽其时间复杂度比贪婪算法高，但它的优点是与穷举法类似，都能保证求出问题的最佳解，而且这种方法不是盲目的穷举搜索，而是在搜索过程中通过限界，可以中途停止对某些不可能得到最优解的子空间进一步搜索（类似于人工智能中的剪枝），故它比穷举法效率更高。

- **回溯法**

回溯法（探索与回溯法）是一种选优搜索法，按选优条件向前搜索，以达到目标。但当探索到某一步时，发现原先选择并不优或达不到目标，就退回一步重新选择，这种走不通就退回再走的技术为回溯法，而满足回溯条件的某个状态的点称为“回溯点”。

其基本思想是，在包含问题的所有解的解空间树中，按照深度优先搜索的策略，从根结点出发深度探索解空间树。当探索到某一结点时，要先判断该结点是否包含问题的解，如果包含，就从该结点出发继续探索下去，如果该结点不包含问题的解，则逐层向其祖先结点回溯。（其实回溯法就是对隐式图的深度优先搜索算法）。 若用回溯法求问题的所有解时，要回溯到根，且根结点的所有可行的子树都要已被搜索遍才结束。 而若使用回溯法求任一个解时，只要搜索到问题的一个解就可以结束。

## 算法基础知识体系目录

### 数据结构和算法
  - [数据结构基本概念](/algorithm/basic/01-basicconcept.html)
  - [数据结构和算法介绍](/algorithm/basic/02-intro.html)
  - [算法时间和空间复杂度](/algorithm/basic/03-timespacecomplexity.html)
  - [数据结构和算法精要总结](/algorithm/basic/03.1-summaryknowledge.html)
  - [线性数据结构-线性表](/algorithm/basic/04-linetable.html)
  - [线性数据结构-栈与队列](/algorithm/basic/05-stackandqueue.html)
### 数据结构-【树】
  - [树-基础概念](/algorithm/basic/06-treebasic.html)
  - [树-【二叉查找树】](/algorithm/basic/07-binarysearchtree.html)
  - [树-【平衡二叉树】](/algorithm/basic/08-balancedbinarytree.html)
  - [树-【红黑树】](/algorithm/basic/09-redblacktree.html)
  - [树-【B树】](/algorithm/basic/09.1-btree.html)
  - [树-【B-树】](/algorithm/basic/09.2-bsubtracttree.html)
  - [树-【B+树】](/algorithm/basic/09.3-bplustree.html)
  - [树-【B*树】](/algorithm/basic/09.4-bplusaddtree.html)
  - [树-哈夫曼树](/algorithm/basic/10-huffmantree.html)
  - [树-堆](/algorithm/basic/10.1-heap.html)
  - [树-完全二叉树和满二叉树](/algorithm/basic/10.2-treediff.html)
### 数据结构-【图】
  - [图-定义和介绍](/algorithm/basic/11-mapintro.html)
  - [图-数据存储结构](/algorithm/basic/12-mapstorage.html)
  - [图-遍历广度优先(BFS)](/algorithm/basic/13-mapvisitbfs.html)
  - [图-遍历深度优先(DFS)](/algorithm/basic/13-mapvisitdfs.html)
  - [图-最小生成树(Prim)算法](/algorithm/basic/15-mapmstprim.html)
  - [图-最小生成树(Kruskal)算法](/algorithm/basic/16-mapmstkruskal.html)
  - [图-最短路径(Dijkstra)算法](/algorithm/basic/17-mapspdijkstra.html)
  - [图-最短路径(Floyd)算法](/algorithm/basic/18-mapfloyd.html)
  - [图-拓扑排序](/algorithm/basic/19-maptopologicalsort.html)
  - [图-关键路径](/algorithm/basic/20-mapcriticalpath.html)
  - [图-知识点总结](/algorithm/basic/21-mapknowledgesum.html)
  - [图-代码实现总结](/algorithm/basic/22-mapcodesum.html)
  - [图-精华总结](/algorithm/basic/23-mapsummary.html)
### 算法动态展示
  - [常用算法动态演示](/algorithm/visual/01-commondy.html)
  - [Algorithm Visualizer](/algorithm/visual/02-algorithmvisualizer.html)
  - [Usfca大学 数据结构可视化](/algorithm/visual/03-usfcavisual.html)
  - [VisuAlgo 支持中文可视化](/algorithm/visual/04-visualgo.html)
### 算法思想总结
  - [八种常用算法思想](/algorithm/thought/01-thoughts8intro.html)
  - [五种基本算法思想介绍](/algorithm/thought/02-thoughts5intro.html)
  - [五种基本算法思想总结](/algorithm/thought/03-thoughts5detail.html)
  - [常用算法思想-分治算法](/algorithm/thought/04-divideandconquer.html)
  - [常用算法思想-动态规划](/algorithm/thought/05-dynamicprogramming.html)
  - [常用算法思想-贪心算法](/algorithm/thought/06-greedyalgorithm.html)
  - [常用算法思想-回溯算法](/algorithm/thought/07-backtracking.html)
  - [常用算法思想-分支限界法](/algorithm/thought/08-branchandbound.html)
### 查找算法
  - [常用搜索算法-介绍](/algorithm/search/01-intro.html)
  - [常用搜索算法-顺序查找](/algorithm/search/02-sequentialsearch.html)
  - [常用搜索算法-二分查找](/algorithm/search/03-binarysearch.html)
  - [常用搜索算法-插值查找](/algorithm/search/04-interpolationsearch.html)
  - [常用搜索算法-斐波那契查找](/algorithm/search/05-fibonaccisearch.html)
  - [常用搜索算法-树表查找](/algorithm/search/06-treetablesearch.html)
  - [常用搜索算法-分块查找](/algorithm/search/07-blocksearch.html)
  - [常用搜索算法-哈希查找](/algorithm/search/08-hashsearch.html)
  - [常用搜索算法-A*查找](/algorithm/search/09-astarsearch.html)
### 排序算法
  - [常用排序算法-介绍](/algorithm/sort/01-intro.html)
  - [插入排序—直接插入排序](/algorithm/sort/02-insertionsort.html)
  - [插入排序—希尔排序](/algorithm/sort/03-shellsort.html)
  - [选择排序—简单选择排序](/algorithm/sort/04-simpleselectionsort.html)
  - [选择排序—堆排序](/algorithm/sort/05-heapsort.html)
  - [交换排序—冒泡排序](/algorithm/sort/06-bubblesort.html)
  - [交换排序—快速排序](/algorithm/sort/07-quicksort.html)
  - [归并排序](/algorithm/sort/08-mergesort.html)
  - [桶排序/基数排序](/algorithm/sort/09-radixsort.html)
  - [排序-综合总结](/algorithm/sort/10-sumamry.html)
  - [排序-源码加动画总结](/algorithm/sort/10.1-dyphotosummary.html)
  - [排序-精华总结Python版](/algorithm/sort/11-summarypython.html)
### 字符串匹配算法
  - [常见字符串匹配算法](/algorithm/strmatch/01-intro.html)
  - [BF算法(Brute Force)](/algorithm/strmatch/02-bf.html)
  - [MP算法(Morris-Pratt)](/algorithm/strmatch/03-mp.html)
  - [KMP算法(Knuth-Morris-Pratt)](/algorithm/strmatch/04-kmp.html)
  - [BM算法(Boyer-Moore)](/algorithm/strmatch/05-bm.html)
  - [BMH算法](/algorithm/strmatch/06-bmh.html)
  - [Needleman–Wunsch算法](/algorithm/strmatch/07-needlemanwunsch.html)
  - [Trie 树(字典树)算法](/algorithm/strmatch/08-trie.html)
  - [AC自动机算法](/algorithm/strmatch/09-acautomatch.html)
  - [RK(Rabin-Karp)算法](/algorithm/strmatch/10-rk.html)
### 加密解密算法
  - [常见加密解密算法介绍](/algorithm/encryption/01-intro.html)
  - [项目中常用加解密算法](/algorithm/encryption/02-prouse.html)
  - [Java常用的加解密算法](/algorithm/encryption/03-javacode.html)
  - [常见加解密算法(Python)](/algorithm/encryption/04-summarypython.html)
  - [加密解密算法精华总结](/algorithm/encryption/05-summary.html)

## ♥♥♥-----【大数据】------♥♥♥

## 大数据基础概念介绍

### 通俗介绍大数据技术

如今，大家都在说大数据，比如AI算法、智慧城市、精准营销、推荐系统...

但其实，大家可能仅仅是对“大数据”这三个词比较熟悉，至于大数据究竟是个啥，底层的技术结构、技术概念是什么，则完全不懂。

这篇文章，就希望通过通俗易懂的语言，为大家介绍下大数据的基本概念。

### **大数据的定义**：

麦肯锡全球研究所给出的定义是：一种规模大到在获取、存储、管理、分析方面大大超出了传统数据库软件工具能力范围的数据集合，具有海量的数据规模、快速的数据流转、多样的数据类型和价值密度低四大特征。

大数据最大的特征，自然就是数据量巨大，大到传统的数据处理软件如Excel、Mysql等都无法很好的支持分析。这也意味着大数据阶段，无论是数据的存储还是加工计算等等过程，用到的处理技术也会完全不同，例如Hadoop、Spark等等。

### **大数据的架构**：

在企业内部，数据从生产、存储，到分析、应用，会经历各个处理流程。它们相互关联，形成了整体的大数据架构。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/bigdata/techintro/intro-1.png')" alt="wxmp">

通常来说，在我们最终查看数据报表，或者使用数据进行算法预测之前，数据都会经历以下这么几个处理环节：

- 1. 数据采集：是指将应用程序产生的数据和日志等同步到大数据系统中。
- 2. 数据存储：海量的数据，需要存储在系统中，方便下次使用时进行查询。
- 3. 数据处理：原始数据需要经过层层过滤、拼接、转换才能最终应用，数据处理就是这些过程的统称。一般来说，有两种类型的数据处理，一种是离线的批量处理，另一种是实时在线分析。
- 4. 数据应用：经过处理的数据可以对外提供服务，比如生成可视化的报表、作为互动式分析的素材、提供给推荐系统训练模型等等。

我们现在常用的大数据技术，其实都是基于Hadoop生态的。Hadoop是一个分布式系统基础架构，换言之，它的数据存储和加工过程都是分布式的，由多个机器共同完成。通过这样的并行处理，提高安全性和数据处理规模。

Hadoop的框架最核心的设计就是：HDFS和MapReduce。HDFS为海量的数据提供了存储，而MapReduce则为海量的数据提供了计算。我们可以把HDFS（Hadoop Distributed File System）理解为一套分布式的文件系统，大数据架构里的海量数据就是存储在这些文件里，我们每次分析，也都是从这些文件里取数。

而MapReduce则是一种分布式计算过程，它包括Map（映射）和Reduce（归约）。当你向MapReduce框架提交一个计算作业时，它会首先把计算作业拆分成若干个Map任务，然后分配到不同的节点上去执行，每一个Map任务处理输入数据中的一部分，当Map任务完成后，Reduce会把前面若干个Map的输出汇总到一起并输出。相当于利用了分布式的机器，完成了大规模的计算任务。

理解了大数据技术的基础——Hadoop，我们再来看看每个数据环节具体的技术。

### hadoop 架构核心知识图谱

- 1 hadoop1.0时期架构

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ds/ecology/archi-1.png')" alt="wxmp">

- 2 hadoop2.0时期架构

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ds/ecology/archi-2.png')" alt="wxmp">

- 3 hdfs架构

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ds/ecology/archi-3.png')" alt="wxmp">


### **数据采集**：

数据并不是天然就从Hadoop里生长出来，它往往存在于业务系统、外部文件里。当我们需要收集这些不同场景下的数据时，就需要用到各种不同的数据采集技术。这其中包括用于数据库同步的Sqoop，用于采集业务日志的Flume，还有用于数据传输的Kafka等等。

- 数据迁移：Sqoop是一个在结构化数据和Hadoop之间进行批量数据迁移的工具，结构化数据可以是MySQL、Oracle等RDBMS。用户可以在 Sqoop 的帮助下，轻松地把关系型数据库的数据导入到 Hadoop 与其相关的系统 (如HBase和Hive)中；同时也可以把数据从 Hadoop 系统里抽取并导出到关系型数据库里。
- 日志采集：Flume是一个分布式的海量日志采集系统。支持在日志系统中定制各类数据发送方，并写到各种数据接受方的能力。它的基本结构如下，包含三个部分：数据收集组件Source，缓存Channel，保存Sink。多个Agent也可以组合使用。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/bigdata/techintro/intro-2.png')" alt="wxmp">

- 数据传输：Kafka是一个著名的分布式消息队列。通过它，数据的发送方和接收方可以准确、稳定的传输数据。它以可水平扩展，并支持高吞吐率。kafka的结构如下图所示：

### **数据存储**：

采集下来的数据需要保存到Hadoop里，从物理的角度看，它们保存为一个一个的HDFS文件。当然，除了HDFS以外，Hadoop还提供了一些配套工具，如便于实时处理数据的列族数据库Hbase，以及一个类似SQL的查询工具Hive，方便对HDFS数据进行查询。

- HDFS：在Hadoop里，底层的数据文件都存储在HDFS里，它是大数据的底层基础。HDFS容错率很高，即便是在系统崩溃的情况下，也能够在节点之间快速传输数据。
- Hbase：是一个高可靠性、高性能、面向列、可伸缩的分布式列族数据库，可以对大数据进行随机性的实时读取/写入访问。基于HDFS而建。
- Hive：是基于Hadoop的一个数据仓库工具，可以将结构化的数据文件映射为一张数据库表，并提供简单的sql查询功能，可以将sql语句转换为MapReduce任务进行运行。 其优点是学习成本低，可以通过类SQL语句快速实现简单的MapReduce统计，不必开发专门的MapReduce应用，十分适合数据仓库的统计分析。Hive通过元数据来描述Hdfs上的结构化文本数据，通俗点来说，就是定义一张表来描述HDFS上的结构化文本，包括各列数据名称，数据类型是什么等，方便我们处理数据，当前很多SQL ON Hadoop的计算引擎均用的是hive的元数据，如Spark SQL、Impala等。

### **数据处理**：

**数据处理**：

- 批数据处理：批处理是指一次批量的数据处理，它存在明确的开始和结束节点。常见的技术包括Hadoop自带的MapReduce，以及Spark。

- - MapReduce：如前文所说，通过Hadoop的MapReduce功能，可以将大的数据处理任务，拆分为分布式的计算任务，交给大量的机器处理，最终等处理完后拼接成我们需要的结果。这是一张批量处理的逻辑。
  - Spark：Spark是一个高速、通用大数据计算处理引擎。拥有Hadoop MapReduce所具有的优点，但不同的是Job的中间输出结果可以保存在内存中，从而不再需要读写HDFS，因此Spark能更好地适用于数据挖掘与机器学习等需要迭代的MapReduce的算法。

- 流数据处理：对于一些需要实时不间断处理的数据而言，等待MapReduce一次次缓慢加工，将文件反复保存到HDFS里并读取，显然太费时间了。一些新的流式数据处理工具被研发出来，它们的处理流程和批处理完全不同：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/bigdata/techintro/intro-3.png')" alt="wxmp">

- - Spark Streaming：基于 Spark，另辟蹊径提出了 D-Stream（Discretized Streams）方案：将流数据切成很小的批（micro-batch），用一系列的短暂、无状态、确定性的批处理实现流处理。
  - Storm：是Twitter开源的分布式实时大数据处理框架，被业界称为实时版Hadoop。
  - Flink：可以理解为Storm的下一代解决方案，与HDFS完全兼容。Flink提供了基于Java和Scala的API，是一个高效、分布式的通用大数据分析引擎。更主要的是，Flink支持增量迭代计算，使得系统可以快速地处理数据密集型、迭代的任务。

**资源管理**：

在完成大数据处理任务的过程中，难免会涉及到多个任务、服务之间协调。这里面既包括资源的协调，也包括任务的协调。

- ZooKeeper：是一个分布式的，开放源码的分布式应用程序协调服务。假设我们的程序是分布式部署在多台机器上，如果我们要改变程序的配置文件，需要逐台机器去修改，非常麻烦，现在把这些配置全部放到zookeeper上去，保存在 zookeeper 的某个目录节点中，然后所有相关应用程序对这个目录节点进行监听，一旦配置信息发生变化，每个应用程序就会收到 zookeeper 的通知，然后从 zookeeper 获取新的配置信息应用到系统中，以此保证各个程序的配置信息同步。
- Yarn：是一个分布式资源调度器组件。这个组件的主要作用是在每次接收到请求后，会查看当下的各个子节点的状况，统筹出运算资源的调度方案来保证任务可以顺利执行。通常来说，Yarn所调度的资源常常包括磁盘空间的资源，内存的资源和通讯带宽的资源等。



**ETL任务管理**：

- Kettle：这是一个ETL工具集，它允许你管理来自不同数据库的数据，通过提供一个图形化的界面来描述任务过程和彼此的依赖关系，以此来设定任务流程。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/bigdata/techintro/intro-4.png')" alt="wxmp">

- Azkaban：是一款基于Java编写的任务调度系统任务调度，来自LinkedIn公司，用于管理他们的Hadoop批处理工作流。Azkaban根据工作的依赖性进行排序，提供友好的Web用户界面来维护和跟踪用户的工作流程。

### **数据应用**：

- **分析工具**：

数据处理完后，最终要想发挥价值，很重要的环节是进行分析和展示。很多工具都能提供分析支持，例如Kylin和Zeppelin。

- Kylin：是一个开源的分布式分析引擎，提供了基于Hadoop的超大型数据集（TB/PB级别）的SQL接口以及多维度的OLAP分布式联机分析。通过预先定义cube的方式，使得它能在亚秒内查询巨大的Hive表。
- Zeppelin：是一个提供交互数据分析且基于Web的笔记本。方便你做出可数据驱动的、可交互且可协作的精美文档，并且支持多种语言，包括 Scala(使用 Apache Spark)、Python(Apache Spark)、SparkSQL、 Hive、 Markdown、Shell等。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/bigdata/techintro/intro-5.png')" alt="wxmp">

- **机器学习**：

除了分析外，大数据很重要的一个应用场景就是AI，借助于一些机器学习工具，大数据可以灵活的完成AI相关工作。

- Tensorflow：是Google开源的一款深度学习工具，它是一个采用数据流图（data flow graphs），用于数值计算的开源软件库。在这个图中，节点（Nodes）表示数学操作，线（edges）表示在节点间相互联系的多维数据数组，即张量（tensor）。它配备了大量的机器学习相关API，能大幅提升机器学习的工作效率。它灵活的架构让你可以在多种平台上展开计算，例如台式计算机中的一个或多个CPU（或GPU），服务器，移动设备等等。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/bigdata/techintro/intro-6.png')" alt="wxmp">

- Mahout：是一个算法库,集成了很多算法。旨在帮助开发人员更加方便快捷地创建智能应用程序。Mahout包括许多实现，包括聚类、分类、推荐引擎、频繁子项挖掘等等。

## 大数据知识体系目录
## 大数据基础介绍
### 大数据基础概念介绍
  - [大数据-基础概念介绍](/bigdata/intro/01-intro.html)
  - [大数据-相关核心领域介绍](/bigdata/intro/02-comconcepts.html)
  - [大数据-业务场景分析案例](/bigdata/intro/03-classiccase.html)
###  OLTP和OLAP介绍
  - [OLTP和OLAP的定义](/bigdata/oltpandolap/01-intro.html)
  - [OLTP和OLAP的区别](/bigdata/oltpandolap/02-diff.html)
  - [OLTP和OLAP精华总结](/bigdata/oltpandolap/03-summary.html)
### 大数据技术体系介绍
  - [大数据-技术基础介绍](/bigdata/techintro/01-intro.html)
  - [大数据-技术常用组件](/bigdata/techintro/02-commtechcomponent.html)
  - [大数据-技术框架方案](/bigdata/techintro/03-techarchitecture.html)
  - [大数据-技术体系构成](/bigdata/techintro/04-techsystem.html)
  - [大数据-技术架构总结](/bigdata/techintro/05-corearchitecture.html)
  - [大数据-技术体系总结](/bigdata/techintro/06-techsystemsummary.html)
## 大数据采集
### 大数据采集-工具介绍
  - [数据采集-常用工具介绍](/dc/intro/01-intro.html)
  - [数据采集-常用工具比较](/dc/intro/02-diff.html)
  - [数据采集-常用工具总结](/dc/intro/03-summary.html)
### 大数据采集-Sqoop
  - [Sqoop-基础知识](/dc/sqoop/01-intro.html)
  - [Sqoop-工作原理](/dc/sqoop/02-prin.html)
  - [Sqoop-精华总结](/dc/sqoop/03-summary.html)
### 大数据采集-Flume
  - [Flume-基础知识](/dc/flume/01-intro.html)
  - [Flume-部署和安装](/dc/flume/02-installuse.html)
  - [Flume-工作原理](/dc/flume/03-prin.html)
  - [Flume-Sqoop和Flume比较](/dc/flume/04-flumesqoopdiff.html)
  - [Flume-Sqoop和Flume案例](/dc/flume/05-sumcase.html)
  - [Flume-分布式配置](/dc/flume/06-districonf.html)
### 大数据采集-Kafka
  - [Kafka-数据采集简单案例](/dc/kafka/01-basiccase.html)
  - [Kafka-数据采集案例原理](/dc/kafka/02-caseprin.html)
  - [Kafka-数据采集综合案例](/dc/kafka/03-summarycase.html)
### 大数据采集-DataX
  - [DataX-基础介绍](/dc/datax/01-intro.html)
  - [DataX-工作原理](/dc/datax/02-prin.html)
  - [DataX-同步案例](/dc/datax/03-case.html)
## 大数据存储 
### 大数据存储-Hadoop介绍
  - [Hadoop-基础介绍](/ds/intro/01-basicintro.html)
  - [Hadoop-详细介绍](/ds/intro/02-detailintro.html)
  - [HDFS-简要介绍](/ds/intro/03-hdfsintro.html)
  - [Hadoop-核心组件介绍](/ds/intro/04-corecomponent.html)
  - [MapReduce-运行原理](/ds/intro/05-mrrunprin.html)
  - [Hadoop-设计原理](/ds/intro/06-designprin.html)
  - [Hadoop-工作原理](/ds/intro/07-workprin.html)
  - [Hadoop-运行原理](/ds/intro/08-runprin.html)
### 大数据存储-Hadoop生态
  - [Hadoop-生态介绍](/ds/ecology/01-intro.html)
  - [Hadoop-生态组件](/ds/ecology/02-compnent.html)
  - [Hadoop-核心组件架构](/ds/ecology/03-basicarchi.html)
  - [Hadoop-2.X技术架构](/ds/ecology/04-2.xverarchi.html)
  - [Hadoop-生态详细总结](/ds/ecology/05-summary.html)
### 大数据存储-HDFS总结
  - [HDFS-基础介绍](/ds/hdfs/01-intro.html)
  - [HDFS-写入流程](/ds/hdfs/02-writeprocedure.html)
  - [HDFS-命令行接口](/ds/hdfs/03-cmdinterface.html)
  - [HDFS-Java接口](/ds/hdfs/04-javainterface.html)
  - [HDFS-常见知识总结](/ds/hdfs/05-knowledgesum.html)
  - [HDFS-精华知识总结](/ds/hdfs/06-detailsum.html)
### 大数据存储-HBASE总结
  - [HBASE-基础介绍](/ds/hbase/01-intro.html)
  - [HBASE-原理总结](/ds/hbase/02-prin.html)
  - [HBASE-配置优化](/ds/hbase/03-opt1.html)
  - [HBASE-读写优化](/ds/hbase/04-opt2.html)
  - [HBASE-系统架构](/ds/hbase/05-archiprin.html)
  - [HBASE-精华总结](/ds/hbase/06-summary.html)
## 大数据仓库
### 大数据仓库-概念介绍
  - [数据仓库-基础介绍](/dw/intro/01-intro.html)
  - [数据仓库-基础结构](/dw/intro/02-basicarchi.html)
  - [数据仓库-精华总结](/dw/intro/03-summary.html)
### 大数据仓库-Hive总结
  - [Hive-基础入门介绍](/dw/hive/01-intro.html)
  - [Hive-基础知识总结](/dw/hive/02-basicarchi.html)
  - [Hive-基础知识连载](/dw/hive/03-basiclianzai.html)
  - [Hive-存储和压缩](/dw/hive/04-storageandcompression.html)
  - [Hive-HiveSQL总结](/dw/hive/05-hivesql.html)
  - [Hive-HiveSQL执行计划](/dw/hive/06-hiveexplainplan.html)
  - [Hive-HiveSQL执行原理](/dw/hive/07-hivesqlexecprin.html)
  - [Hive-千亿级数据倾斜](/dw/hive/08-hivedataskew.html)
  - [Hive-企业级性能优化](/dw/hive/09-hiveenterpriselevelopt.html)
  - [Hive-HiveSQL流程源码分析](/dw/hive/10-hivesqlexecsourcecode.html)
### 大数据仓库-Hive优化
  - [Hive优化-12种常用方式](/dw/hiveopt/01-optbasic.html)
  - [Hive优化-优化策略总结](/dw/hiveopt/02-optstrategy.html)
  - [Hive优化-常用优化方法](/dw/hiveopt/03-commonoptmethods.html)
  - [Hive优化-汇总精华总结(一)](/dw/hiveopt/04-optsummary1.html)
  - [Hive优化-汇总精华总结(二)](/dw/hiveopt/05-optsummary2.html)
### 大数据仓库-Pig介绍
  - [Pig-基础信息介绍](/dw/pig/01-intro.html)
  - [Pig-基础原理总结](/dw/pig/02-basicprin.html)
  - [Pig-基础知识总结](/dw/pig/03-summary.html)
### 大数据仓库-ClickHouse介绍
  - [ClickHouse-基础介绍](/dw/clickhouse/01-intro.html)
  - [ClickHouse-基础总结](/dw/clickhouse/02-summaryintro.html)
  - [ClickHouse-案例介绍](/dw/clickhouse/03-caseintro.html)
### 大数据仓库-CDH介绍
  - [CDH-基础介绍](/dw/cdh/01-cdhintro.html)
  - [CDH-CM基础介绍](/dw/cdh/02-cmintroandinstall.html)
  - [CDH-安装案例总结](/dw/cdh/03-summarycase.html)
### 大数据仓库-Ambari介绍
  - [Ambari-介绍和安装](/dw/ambari/01-introandinstall.html)
  - [Ambari-集群安装攻略](/dw/ambari/02-installcase.html)
  - [Ambari-和CDH的区别](/dw/ambari/03-diff.html)
## 大数据应用
### 数据应用-案例和原理
  - [大数据基础和应用场景](/da/intro/01-intro.html)
  - [大数据技术和应用场景](/da/intro/02-techandsecene.html)
  - [大数据应用场景技术方案](/da/intro/03-secnetecharchi.html)
  - [大数据应用综合案例(一)](/da/intro/04-summarycase1.html)
  - [大数据应用综合案例(二)](/da/intro/05-summarycase2.html)
### 数据应用-BI系统介绍
  - [数据分析-BI基础概念介绍](/da/introbi/01-intro.html)
  - [数据分析-BI常用分析方法](/da/introbi/02-bicommonmethod.html)
  - [数据分析-BI技术场景介绍](/da/introbi/03-techsceneintro.html)
  - [数据分析-自助BI工具介绍](/da/introbi/04-bitoolintro.html)
  - [数据分析-BI自助报表介绍](/da/introbi/05-bireportsintro.html)
  - [数据分析-传统和自助BI区别](/da/introbi/06-traditionalandselfbidiff.html)
  - [数据分析-BI系统架构方案](/da/introbi/07-bidataarchi.html)
### 数据应用-BI工具介绍
  - [常用BI工具基础介绍](/da/introbitool/01-commintro.html)
  - [阿里QuickBI工具介绍](/da/introbitool/02-aliquickbiintro.html)
  - [自助式BI工具综合比较](/da/introbitool/03-summarydiff.html)
### 数据应用-数据可视化
  - [数据可视化-常用工具介绍](/da/dataview/01-intro.html)
  - [数据可视化-30款推荐工具](/da/dataview/02-30recommendtools.html)
  - [数据可视化-基本处理流程](/da/dataview/03-dataviewbasicproedure.html)
  - [数据可视化-大屏工具介绍](/da/dataview/04-dataviewlargescreentools.html)
  - [数据可视化-DataV基础介绍](/da/dataview/05-datavintro.html)
  - [数据可视化-DataV简单案例](/da/dataview/06-datavsimplecase.html)
  - [数据可视化-DataV功能特性](/da/dataview/07-datavsummaryfunctions.html)
  - [数据可视化-DataV和Sugar区别](/da/dataview/08-datavandsugardiff.html)
  - [数据可视化-精华综合总结](/da/dataview/09-dataviewsummary.html)
### 实时分析-Spark应用
  - [Spark-数据处理场景介绍](/da/rtaspark/01-intro.html)
  - [Spark-用户分析系统设计](/da/rtaspark/02-sparkuseranalysiscase.html)
  - [Spark-SpringBoot集成案例](/da/rtaspark/03-sparkandspringboot.html)
  - [Spark-实时购物分析案例](/da/rtaspark/04-realtimebuycase.html)
  - [Spark-日志文件分析案例](/da/rtaspark/05-logfileanalysiscase.html)
  - [Spark-新闻实时分析案例](/da/rtaspark/06-realtimenewscase.html)
  - [Spark-部署springboot项目](/da/rtaspark/07-sparkappdeploy.html)
  - [Spark-综合案例和博客连载](/da/rtaspark/08-summarycaseandbolg.html)
  - [Spark-大数据分析精华总结](/da/rtaspark/09-summary.html)
### 实时分析-Flink应用
  - [Flink-流式窗口概念](/da/rtaflink/01-streamwindowintro.html)
  - [Flink-SpringBoot结合案例](/da/rtaflink/02-flinkspringboot.html)
  - [Flink-ClickHouse结合案例](/da/rtaflink/03-finkandclickhouse.html)
  - [Flink-Boot脚手架介绍](/da/rtaflink/04-flinkbootintro.html)
  - [Flink-电商用户行为项目介绍](/da/rtaflink/05-flinkuserbehaviorcasepro.html)
  - [Flink-电商实时热门商品统计](/da/rtaflink/06-flinkrealtimegoodsstat.html)
  - [Flink-电商实时访问流量统计](/da/rtaflink/07-flinkrealtimepagevist.html)
  - [Flink-电商实时核心指标总结](/da/rtaflink/08-flinkecommercecoreindicators.html)
  - [Flink-实战基础和博客推荐](/da/rtaflink/09-blogrecommend.html)
  - [Flink-核心概念和原理回顾](/da/rtaflink/10-summary.html)


## ♥♥♥----【人工智能】-----♥♥♥
## 人工智能基础介绍
## 什么是人工智能

### 一、人工智能概述

**人工智能对社会的影响**

- 智能化：让生活更方便，同时大大提高社会资源的利用率
- 精细化：精细追踪各个业务环节、服务从标准化到个性化
- 全面：穷举并应用所有可能
- 无隐私：在大数据、人工智能前没有隐私，超级权利
- 大量工作被抢占：计算机正取代人类完成更多智力工作、只有2%的人能在初期掌握新技术并以此工作
- 财富更加集中：数据成为最重要的资本

**人工智能的能力阶段**

- 弱人工智能：仅在特定领域、既定规则中拥有强大的智能
- 强人工智能：不受领域、规则限定，拥有与人类媲美的智能
- 超人工智能：在所有领域都拥有超越人类的智能

**现代人工智能的研究方法**

- 把智能问题转化为消除不确定性的问题，通过大数据+超级计算来消除不确定性
- 用若干个简单模型来代替复杂模型，最大限度利用计算机技术的进步，用数据量、计算量来节约研究时间

**人工智能在各行业的应用**

- 农业：通过智能浇灌节约成本、提高产量
- 体育：改进战术战略、分析总结优秀选手的动作姿势、训练棋牌选手
- 制造业：通过装配机器人节约成本、硬件联网成为智能服务终端
- 医疗：通过识别医学影像、手术机器人、智能诊断来降低医疗成本、平衡医疗资源、提高诊断准确率，数据驱动降低药物研制成本，攻克医疗难题
- 新闻业：计算机写作
- 律政：司法领域认可数据强相关关系作为证据、智能庭审、智能处理法律文件、自助合规审查、合同管理、法律研究、庭审结果预测

### 二、计算机视觉

**定义**

- Computer Vision，研究如何让计算机代替人眼对目标进行识别、跟踪、测量，并根据要求处理图像

**技术能力**

**图像识别**：

- 物体识别：人脸、物体、字符...
- 属性识别：大小、位置、环境、颜色、数量、时间...
- 行为识别：移动、动作、完整行为...

**图像处理**：

- 前端处理：信号变换、降噪
- 后端处理：基于业务目标处理图像

**目前已有的后端处理技术**：

- 图像还原：将经过修饰的人像还原，用于人脸识别、身份认证等
- 生成图像描述：根据图像内容生成一段描述文字
- 图片缩放：让图片在不同分辨率设备上都显示良好
- 低清转高清：将低分辨率的图像转换为高清图像

**应用领域**

- 图像搜索（包括人脸识别）
- 智能安防
- 照片分类与处理
- 直播监管
- 无人驾驶
- 医学影像分析
- 手势人机交互
- VR
- 质量检测

### 三、自然语言处理

**定义**

- Natural Language Processing，研究人与计算机如何用自然语言进行有效沟通

**技术能力**

- 理解自然语言
- 用自然语言表达

**现状和难题**

现状：

- 通用、高质量的自然语言处理系统还未出现
- 针对具体领域、具体应用的自然语言处理系统已经商品化、产业化

难题：

- 消除自然语言中的歧义
- 联系上下文、场景来分析语意
- 理解大量的专业领域词汇

**应用领域**

- 机器翻译
- 机器写作
- 语意搜索
- 自动回答问题
- 自动打标签
- 自动文摘

### 四、智能语音

**定义**

- Automatic Speech Recognition，研究如何让机器听懂人说的话，并且像人一样说话

**技术能力**

- 声音前置处理：排除回声、干扰、噪声，提高信噪比
- 语音识别：人机交互、口语评测
- 语音合成：人机交互
- 声音后置处理：语音转文字、音色变换...

**现状和难题**

现状：

- 技术相对成熟，各大厂商声称识别准确率在96%以上
- 智能语音的软硬件已经开始商业化

难题：

- 远距离声音采集：目前极限在10米左右，超过后很难识别
- 嘈杂场景下的声音识别
- 方言、口音、专业名词的识别
- 带韵律、情感的语音合成
- 缺少低功耗低成本的芯片
- 缺少声学的专业设备和人才

**应用领域**

- 智能语音助手
- 语音搜索
- 实时字幕
- 语音游戏
- 会议记录（语音转文字）

### 五、机器学习

**定义**

- 研究如何让计算机识别现有知识，并不断学习新知识、新技能

**技术能力**

- 智能决策：通过大数据来迭代建立决策模型，输入相关信息后输出决策

影响决策能力的因素：

- 输入信息的质量
- 知识库能力：容量、表达能力、推理能力、扩展性

**应用领域**

- 个性化推荐
- 舆情分析、预测
- 医疗诊断
- 机器编程
- 智能城市
- 商业决策


在计算机出现之前人们就幻想着一种机器可以实现人类的思维，可以帮助人们解决问题，甚至比人类有更高的智力。随着上世纪40年代计算机的发明，这几十年来计算速度飞速提高，从最初的科学数学计算演变到了现代的各种计算机应用领域，诸如多媒体应用，计算机辅助设计，数据库，数据通信，自动控制等等，人工智能是计算机科学的一个研究分支，是多年来计算机科学研究发展的结晶。

【**人工智能**】是一门基于【**计算机科学，生物学，心理学，神经科学，数学和哲学等学科**】的科学和技术。

【**人工智能**】的一个主要推动力要【**开发与人类智能相关的计算机功能**】，例如【**推理，学习和解决问题的能力**】。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ai/intro/intro-1.png')" alt="wxmp">

人工智能之父 John McCarthy说：人工智能就是制造智能的机器，更特指制作人工智能的程序。人工智能模仿人类的思考方式使计算机能智能的思考问题，人工智能通过研究人类大脑的思考、学习和工作方式，然后将研究结果作为开发智能软件和系统的基础。

## 人工智能知识体系目录
## 人工智能基础知识介绍
### 人工智能基础概念介绍
  - [人工智能-入门基础介绍](/ai/intro/01-intro.html)
  - [人工智能-学科发展历程](/ai/intro/02-subjectanddevelopment.html)
  - [人工智能-精华概念总结](/ai/intro/03-summary.html)
### 大数据和AI的联系区别
  - [大数据和AI联系区别(一)](/ai/diff/01-intro.html)
  - [大数据和AI联系区别(二)](/ai/diff/02-diff2.html)
  - [云计算、大数据和AI联系区别](/ai/diff/03-summary.html)
### 机器学习-基础介绍
  - [机器学习-基础知识入门介绍](/ai/mlintro/01-intro.html)
  - [机器学习-学习分类原理总结](/ai/mlintro/01.1-mlcoreprocedure.html)
  - [机器学习-和深度学习的区别](/ai/mlintro/02-mlanddldiff.html)
  - [机器学习-案例场景基础介绍](/ai/mlintro/02.1-mlcase.html)
  - [机器学习-基础知识精华总结](/ai/mlintro/03-summary.html)
### 深度学习-基础介绍
  - [深度学习-基础入门和概念介绍](/ai/dlintro/01-intro.html)
  - [深度学习-和神经网络概念介绍](/ai/dlintro/02-neuralnetworkintro.html)
  - [深度学习-发展历史和核心事件](/ai/dlintro/03-developmentintro.html)
  - [深度学习-应用场景和主要流程](/ai/dlintro/04-applicationsceneandprocedure.html)
  - [深度学习-核心思想和精华总结](/ai/dlintro/05-summary.html)
  - [深度学习-原理案例和博客推荐](/ai/dlintro/06-blogrecommend.html)
### 神经网络-基础介绍
  - [神经网络-基础信息入门介绍](/ai/nnintro/01-intro.html)
  - [神经网络-常见神经网络区别](/ai/nnintro/02-diff.html)
  - [神经网络-核心概念精华总结](/ai/nnintro/03-summary.html)
### 神经网络-原理介绍
  - [神经网络-工作原理简介](/ai/nnprin/01-intro.html)
  - [神经网络-算法工作原理](/ai/nnprin/02-algorithmprin.html)
  - [神经网络-BP算法原理](/ai/nnprin/03-bpnnprin.html)
### 机器学习-算法介绍
  - [机器学习算法-入门基础介绍](/ai/mlalgorithm/01-intro.html)
  - [机器学习算法-图解说明(上)](/ai/mlalgorithm/02-photointrotop10-1.html)
  - [机器学习算法-图解说明(下)](/ai/mlalgorithm/03-photointrotop10-2.html)
  - [机器学习算法-编码案例总结](/ai/mlalgorithm/04-top10case.html)
  - [机器学习算法-精华知识总结](/ai/mlalgorithm/05-summary.html)
### 机器学习-数学总结
  - [机器学习-数学入门介绍](/ai/mlmath/01-intro.html)
  - [机器学习-数学知识点汇总](/ai/mlmath/02-mathknowledge.html)
  - [机器学习-数学基础理论](/ai/mlmath/03-mathbasic.html)
  - [机器学习-线性代数总结](/ai/mlmath/04-linearalgebrasum.html)
  - [机器学习-概率统计总结](/ai/mlmath/05-probabilitystatisticssum.html)
  - [机器学习-博客连载推荐](/ai/mlmath/06-blogserialsrecommend.html)
  - [机器学习-数学视频推荐](/ai/mlmath/07-videorecommend.html)

## AI开发框架介绍
### AI开发框架-基础介绍
  - [主流AI机器学习框架介绍](/ad/intro/01-intro.html)
  - [Java-机器学习框架介绍](/ad/intro/02-javamllibintro.html)
  - [Java-6大机器学习库介绍](/ad/intro/03-6javamllibintro.html)
  - [Python-机器学习库Top10](/ad/intro/04-pythonmllibintro.html)
  - [Python-主流机器学习库比较](/ad/intro/04.1-corepythonmldiff.html)
  - [AI深度学习框架Top10比较](/ad/intro/05-top10diff.html)
### AI开发框架-DL4J介绍
  - [DL4J-入门知识介绍](/ad/dl4jintro/01-intro.html)
  - [DL4J-特性优点总结](/ad/dl4jintro/02-featuressummary.html)
  - [DL4J-学习资源推荐](/ad/dl4jintro/03-learnsourcerecommend.html)
### AI开发框架-DL4J案例
  - [DL4J-开发入门知识介绍](/ad/dl4jcase/01-intro.html)
  - [DL4J-开发案例入门介绍](/ad/dl4jcase/02-devcasseintro.html)
  - [DL4J-训练和保存模型](/ad/dl4jcase/03-trainingmodelandsave.html)
  - [DL4J-BP网络分类器](/ad/dl4jcase/04-bpnetclassifier.html)
  - [DL4J-简单人脸识别案例](/ad/dl4jcase/05-facerecognitioncase.html)
  - [DL4J-案例实战博客连载](/ad/dl4jcase/06-casesummary.html)
### Python机器学习-基础介绍
  - [Pyhon机器学习-常用工具库](/ad/pymlbasic/01-intro.html)
  - [Pyhon机器学习-数学符号字母](/ad/pymlbasic/02-mathsymbols.html)
  - [机器学习-Jupyter-Notebook用法](/ad/pymlbasic/03-jupyternotebook.html)
  - [Pyhon机器学习-NumPy介绍](/ad/pymlbasic/04-numpyintro.html)
  - [Pyhon机器学习-Pandas介绍](/ad/pymlbasic/05-pandasintro.html)
  - [Pyhon机器学习-Matplotlib介绍](/ad/pymlbasic/06-matplotlibintro.html)
### Python机器学习-入门案例
  - [Python机器学习-入门实践](/ad/pymlcase/01-intro.html)
  - [Python机器学习-线性回归预测](/ad/pymlcase/02-linearregressioncase.html)
  - [Python机器学习-逻辑回归分类](/ad/pymlcase/03-logisticregressionclassification.html)
  - [Python机器学习-向量机SVM](/ad/pymlcase/04-svmcase.html)
  - [Python机器学习-决策树随机森林](/ad/pymlcase/05-decisiontreeandrandomforest.html)
  - [Python机器学习-K-Means聚类](/ad/pymlcase/06-kmenascase.html)
### AI开发框架-SKLearn介绍
  - [Sklearn-基础入门介绍](/ad/sklearn/01-intro.html)
  - [Sklearn-简单实战案例](/ad/sklearn/02-simplecase.html)
  - [Sklearn-基础精华总结](/ad/sklearn/03-summary.html)
### AI开发框架-Pytorch介绍
  - [Pytorch-基础入门介绍](/ad/pytorch/01-intro.html)
  - [Pytorch-安装过程详解](/ad/pytorch/02-install.html)
  - [Pytorch-基本流程案例](/ad/pytorch/03-basicsprocedureandcase.html)
  - [Pytorch-图像识别案例(一)](/ad/pytorch/04-imagerecognitioncase1.html)
  - [Pytorch-图像识别案例(二)](/ad/pytorch/05-imagerecognitioncase2.html)
  - [Pytorch-博客连载推荐](/ad/pytorch/06-blogrecommend.html)
  - [Pytorch-基础精华总结](/ad/pytorch/07-basicsummay.html)
### AI开发框架-Tensorflow介绍
  - [TensorFlow-基础入门介绍](/ad/tensorflow/01-intro.html)
  - [TensorFlow-安装步骤详解](/ad/tensorflow/02-intsall.html)
  - [TensorFlow-数据结构及概念](/ad/tensorflow/03-datastructureandconcept.html)
  - [TensorFlow-三大核心功能](/ad/tensorflow/04-core3function.html)
  - [TensorFlow-简单应用案例](/ad/tensorflow/05-simplecase.html)
  - [TensorFlow-实战博客推荐](/ad/tensorflow/06-blogrecommend.html)
  - [TensorFlow-精华基础总结](/ad/tensorflow/07-summary.html)

## AI应用案例总结
### AI应用案例介绍
  - [人工智能-常见案例和趋势](/ac/intro/01-intro.html)
  - [人工智能-2019年Top100案例](/ac/intro/02-2019top100case.html)
  - [人工智能-2020年Top100案例](/ac/intro/03-2020top100case.html)
### 推荐系统-基础介绍
  - [推荐系统-入门基础介绍](/ac/rsintro/01-intro.html)
  - [推荐系统-产品视角介绍](/ac/rsintro/02-rspdintro.html)
  - [推荐系统-技术视角介绍](/ac/rsintro/03-rstechintro.html)
  - [推荐系统-推荐算法介绍](/ac/rsintro/04-basicalgorithm.html)
  - [推荐系统-推荐算法详解](/ac/rsintro/05-rsalgorithmdetail.html)
  - [京东-推荐系统演进历史](/ac/rsintro/06-jdrshis.html)
  - [推荐系统-精华基础总结](/ac/rsintro/07-rssummary.html)
### 推荐系统-案例介绍
  - [推荐系统-技术基础介绍](/ac/rscase/01-intro.html)
  - [推荐系统-系统架构原理](/ac/rscase/02-casearchiprin.html)
  - [推荐系统-案例算法介绍](/ac/rscase/03-casealgorithmintro.html)
  - [推荐系统-协同过滤算法](/ac/rscase/04-collaborativefilteringalgorithm.html)
  - [推荐系统-实战精华总结(一)](/ac/rscase/05-casesummary1.html)
  - [推荐系统-实战精华总结(二)](/ac/rscase/06-casesummary2.html)
  - [推荐系统-实战博客推荐](/ac/rscase/07-caserecommendblog.html)
  - [推荐系统-实战视频教程](/ac/rscase/08-caserecommendvideo.html)
### 智慧城市-基础介绍
  - [智慧城市-基础概念介绍](/ac/aicity/01-intro.html)
  - [智慧城市-智慧原理介绍](/ac/aicity/02-aicitysmartmethod.html)
  - [智慧城市-城市大脑介绍](/ac/aicity/03-citybrainintro.html)
  - [智慧城市-城市大脑区别](/ac/aicity/04-aicityandcitybraindiff.html)
  - [智慧城市-基础精华总结](/ac/aicity/05-aicitysummary.html)
### 智慧大屏-基础介绍
  - [智慧大屏-数据可视化介绍](/ac/aibigscreen/01-intro.html)
  - [智慧大屏-5个经典大屏案例](/ac/aibigscreen/02-5classiccase.html)
  - [智慧大屏-20个酷炫大屏案例](/ac/aibigscreen/03-20caseview.html)
  - [智慧大屏-专项数据可视化案例](/ac/aibigscreen/04-specialthemecaseview.html)
  - [智慧大屏-热门开源项目介绍](/ac/aibigscreen/05-githubcaseview.html)
  - [智慧大屏-开源Vue-BigScreen](/ac/aibigscreen/06-vuebigscreen.html)
  - [智慧大屏-开源AJ-Report工具](/ac/aibigscreen/07-ajreporttool.html)
  - [智慧大屏-开源综合汇总案例](/ac/aibigscreen/08-summarycase.html)

## ♥♥♥-----【Spring】-----♥♥♥
## Spring基础知识
### 1、Spring框架的概述

*   Spring 是 2003 年兴起的一个轻量级的 Java 开发框架，由 Rod Johnson 创建。它解决了业务逻辑层和其他各层的松耦合问题，并将面向接口的编程思想贯穿整个系统应用。简单来说，Spring 是一个分层的 JavaSE/EE Full-Stack（一站式） 轻量级开源框架。

*   官方网址：[https://spring.io](https://spring.io/)

*   下载地址：https://repo.spring.io/libs-release-local/org/springframework/spring

  那么问题来了，为什么说 Spring 是**分层**、**一站式**、**轻量级**的框架呢？
  （1）分层，JavaEE 经典的 MVC 三层结构为表现层、业务层、持久层。

|                | 功能                                   | 举例                     |
| -------------- | -------------------------------------- | ------------------------ |
| Web 表现层     | 负责页面数据显示、页面跳转调度。       | JSP/Servlet、SpringMVC   |
| Service 业务层 | 负责业务处理、功能逻辑和事务控制。     | Service、JavaBean、EJB   |
| Dao 持久层     | 负责数据存取和封装，及与数据库打交道。 | JDBC、Hibernate、Mybatis |

  （2）一站式，指 Spring 为JavaEE 的每一层都提供了解决方案，比如：

|                | 解决方案                                                        |
| -------------- | --------------------------------------------------------------- |
| Web 表现层     | Struts1、Struts2、Spring MVC                                    |
| Service 业务层 | IoC 控制反转、AOP 面向切面编程、事务控制                        |
| Dao 持久层     | JdbcTemplate、HibernateTemplate、ORM 框架（对象关系映射）的整合 |

  （3）轻量级，指从大小与开销两方面而言，Spring都是轻量的。

  完整的 Spring 框架可以在一个大小只有 1MB 多的 Jar 文件里发布。并且 Spring 所需的处理开销也是微不足道的。Spring 的出现解决了 EJB 臃肿、低效、繁琐复杂、脱离现实的情况。而且使用 Spring 编程是非侵入式的。Spring 应用中的对象不依赖于 Spring 的特定类。

### 2、Spring框架的体系结构

  Spring 框架是一个分层架构，它包含一系列的功能要素，被分为大约20个模块。这些模块分为 Core Container、Data Access/Integration、Web、AOP、Aspects、Instrumentation 和 Test，如下图所示：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/spring/basic/intro-1.png')" alt="wxmp">

核心容器（Core Container）包括 Core、Beans、Context、EL 模块：

1、Core 和 Beans 模块提供了 Spring 最基础的功能，Core 模块是核心，为其他模块提供支持，包括 Spring 的核心工具类。Beans 是 Spring 管理实体类 Bean 的主要模块，提供 IoC 控制反转和依赖注入 DI。控制反转即将控制权由原来的程序员自己管理交给 Spring 来管理，依赖注入就是注入对象实例，有四种方式，即接口注入、setter 方法注入、构造器注入和注解注入。

2、Context 上下文模块，主要基于 Core 和 Beans 模块 Context 模块的 Context 包继承了 Beans 包的功能，还增加了国际化（I18N）、事件传播等，Context 上下文模块，还包括企业服务，例如 JNDI、EJB、电子邮件、国际化、校验和调度功能。

3、Expression Language，表达式语言模块，又称 SpEL，提供了在运行期间查询和操作对象图的强大能力。包含五个主要特性：①使用 Bean 的 ID 引用 Bean；②调用方法和访问对象的属性；③对值进行算术，关系和逻辑运算；④正则表达式匹配；⑤集合操作。

### 3、Spring框架的两大核心

  Spring 两大核心分别为 IOC（Inverse of Control 控制反转）和 AOP（Aspect Oriented Programming 面向切面编程）。

### IoC（Inversion of Control）

(1). IoC（Inversion of Control）是指容器控制程序对象之间的关系，而不是传统实现中，由程序代码直接操控。控制权由应用代码中转到了外部容器，控制权的转移是所谓反转。 对于Spring而言，就是由Spring来控制对象的生命周期和对象之间的关系；IoC还有另外一个名字——“依赖注入（Dependency Injection）”。从名字上理解，所谓依赖注入，即组件之间的依赖关系由容器在**运行期决定**，即由容器动态地将某种依赖关系注入到组件之中。

(2). 在Spring的工作方式中，所有的类都会在spring容器中登记，告诉spring这是个什么东西，你需要什么东西，然后spring会在系统运行到适当的时候，把你要的东西主动给你，同时也把你交给其他需要你的东西。所有的类的创建、销毁都由 spring来控制，也就是说控制对象生存周期的不再是引用它的对象，而是spring。对于某个具体的对象而言，以前是它控制其他对象，现在是所有对象都被spring控制，所以这叫控制反转。

(3). 在系统运行中，动态的向某个对象提供它所需要的其他对象。

(4). 依赖注入的思想是通过反射机制实现的
在实例化一个类时，它通过反射调用类中set方法将事先保存在HashMap中的类属性注入到类中。 总而言之，在传统的对象创建方式中，通常由调用者来创建被调用者的实例，而在Spring中创建被调用者的工作由Spring来完成，然后注入调用者，即所谓的依赖注入or控制反转。 注入方式有两种：依赖注入和设置注入；
IoC的优点：降低了组件之间的耦合，降低了业务对象之间替换的复杂性，使之能够灵活的管理对象。

### AOP（Aspect Oriented Programming）

- (1). AOP面向方面编程基于IoC，是对OOP的有益补充；

- (2). AOP利用一种称为“横切”的技术：
剖解开封装的对象内部，并将那些影响了 多个类的公共行为封装到一个可重用模块，并将其名为“Aspect”，即方面。所谓“方面”，简单地说，就是将那些与业务无关，却为业务模块所共同调用的 逻辑或责任封装起来，比如日志记录，便于减少系统的重复代码，降低模块间的耦合度，并有利于未来的可操作性和可维护性。

- (3). AOP代表的是一个横向的关 系：
将“对象”比作一个空心的圆柱体，其中封装的是对象的属性和行为；则面向方面编程的方法，就是将这个圆柱体以切面形式剖开，选择性的提供业务逻辑。而 剖开的切面，也就是所谓的“方面”了。然后它又以巧夺天功的妙手将这些剖开的切面复原，不留痕迹，但完成了效果。

- (4). 实现AOP的技术，主要分为两大类：

一是采用动态代理技术，利用截取消息的方式，对该消息进行装饰，以取代原有对象行为的执行；

二是采用静态织入的方式，引入特定的语法创建“方面”，从而使得编译器可以在编译期间织入有关“方面”的代码。

- (5). Spring实现AOP：JDK动态代理和CGLIB代理
JDK动态代理：其代理对象必须是某个接口的实现，它是通过在运行期间创建一个接口的实现类来完成对目标对象的代理；
其核心的两个类是InvocationHandler和Proxy。

CGLIB代理：实现原理类似于JDK动态代理，只是它在运行期间生成的代理对象是针对目标类扩展的子类。CGLIB是高效的代码生成包，底层是依靠ASM（开源的java字节码编辑类库）操作字节码实现的，性能比JDK强；需要引入包asm.jar和cglib.jar。
使用AspectJ注入式切面和@AspectJ注解驱动的切面实际上底层也是通过动态代理实现的。

- (6). AOP使用场景：

* Authentication 权限检查
* Caching 缓存
* Context passing 内容传递
* Error handling 错误处理
* Lazy loading　延迟加载
* Debugging　　调试
* logging, tracing, profiling and monitoring　日志记录，跟踪，优化，校准
* Performance optimization　性能优化，效率检查
* Persistence　　持久化
* Resource pooling　资源池
* Synchronization　同步
* Transactions 事务管理
另外Filter的实现和struts2的拦截器的实现都是AOP思想的体现。

## Spring知识体系目录

### Spring基础知识
  - [Spring-基础介绍](/spring/basic/01-intro.html)
  - [IOC和AOP-原理简介](/spring/basic/02-iocaopintro.html)
  - [IOC和AOP-原理总结](/spring/basic/03-iocaopsumary.html)
  - [IOC和AOP-代码案例介绍](/spring/basic/04-iocaopcasesum.html)
  - [Spring-简洁版总结](/spring/basic/05-springsimplesum.html)
  - [Spring-精华知识总结](/spring/basic/06-springsummary.html)
### SpringMVC知识总结
  - [SpringMVC-入门介绍](/spring/springmvc/01-intro.html)
  - [SpringMVC-工作原理介绍](/spring/springmvc/02-prinintro.html)
  - [SpringMVC-工作原理详解](/spring/springmvc/03-prindetail.html)
  - [SpringMVC-执行流程和原理](/spring/springmvc/04-procedureprin.html)
  - [SpringMVC-案例使用总结](/spring/springmvc/05-casesum.html)
  - [SpringMVC-常见面试题](/spring/springmvc/06-comminterview.html)
### SpringBoot知识总结
  - [SpringBoot-基础介绍](/spring/springboot/01-intro.html)
  - [SpringBoot-入门案例](/spring/springboot/02-caseintro.html)
  - [SpringBoot-配置文件区别](/spring/springboot/02.1-caseymlpropertiesdiff.html)
  - [SpringBoot-工作原理](/spring/springboot/03-workprin.html)
  - [SpringBoot-3个核心注解](/spring/springboot/04-coreannotation3.html)
  - [SpringBoot-27个重要注解](/spring/springboot/05-importantannotation27.html)
  - [启动原理分析和源码解读](/spring/springboot/06-startprincodeanalysis.html)
  - [SpringBoot-常见面试题](/spring/springboot/07-comminterview.html)
### SpringBoot注解总结
  - [注解基础知识介绍](/spring/annotation/01-intro.html)
  - [注解作用和使用方法](/spring/annotation/02-useandmethods.html)
  - [Spring注解实现原理](/spring/annotation/03-springannprin.html)
  - [Spring注解大全(一)](/spring/annotation/04-anntotal1.html)
  - [Spring注解大全(二)](/spring/annotation/05-anntotal2.html)
  - [SpringMVC常用注解](/spring/annotation/06-commannotationmvc.html)
  - [SpringBoot常用注解](/spring/annotation/07-commannotationboot.html)
### SpringCloud知识介绍
  - [SpringCloud-基础介绍](/spring/springcloud/01-intro.html)
  - [SpringCloud-图解重要知识点](/spring/springcloud/02-commknowledge.html)
  - [SpringCloud-原理详解](/spring/springcloud/03-prindetail.html)

## ♥♥♥-----【框架篇】------♥♥♥
## 框架相关的基础知识：

## 开发框架-概念

　　做为一个程序员，在开发的过程中会发现，有框架同无框架，做起事来是完全不同的概念，关系到开发的效率、程序的健壮、性能、团队协作、后续功能维护、扩展......等方方面面的事情。很多朋友在学习搭建自己的框架，很多公司也在创建或使用自己的框架，网上开源的框架多如牛毛，每年新上线的各种框架也不知多少。而不停的重复造轮子，也让更多的朋友鸟枪换炮，越跑越快，工作效率越来越高。那么什么是框架呢？
 
### 什么是框架

　　度娘上说：框架（Framework）是整个或部分系统的可重用设计，表现为一组抽象构件及构件实例间交互的方法; 另一种定义认为，框架是可被应用开发者定制的应用骨架。前者是从应用方面而后者是从目的方面给出的定义。


　　可以说，一个框架是一个可复用的设计构件，它规定了应用的体系结构，阐明了整个设计、协作构件之间的依赖关系、责任分配和控制流程，表现为一组抽象类以及其实例之间协作的方法，它为构件复用提供了上下文(Context)关系。因此构件库的大规模重用也需要框架。

　　应用框架指的是实现了某应用领域通用完备功能（除去特殊应用的部分）的底层服务。使用这种框架的编程人员可以在一个通用功能已经实现的基础上开始具体的系统开发。框架提供了所有应用期望的默认行为的类集合。具体的应用通过重写子类(该子类属于框架的默认行为)或组装对象来支持应用专用的行为。

　　应用框架强调的是软件的设计重用性和系统的可扩充性，以缩短大型应用软件系统的开发周期，提高开发质量。与传统的基于类库的面向对象重用技术比较，应用框架更注重于面向专业领域的软件重用。应用框架具有领域相关性，构件根据框架进行复合而生成可运行的系统。框架的粒度越大，其中包含的领域知识就更加完整。

### 框架的定义
**框架，即framework**。其实就是某种应用的半成品，就是一组组件，供你选用完成你自己的系统。 简单说就是使用别人搭好的舞台，你来做表演。而且，框架一般是成熟的，不断升级的软件。

　　上面是[度娘百科——框架](http://www.baidu.com/link?url=nUSLa82hqc3Uqk3Z1ByJfJGzLuALC2IGtCU-Hw5_9QBRrdLJMxNAffAilUbcccOPU3nphL1TxUkpVvxk3yeIj_)里讲的内容，讲得挺理论挺全面的，直接复制了一些过来。

 

　　简单来讲，软件开发框架可以理解为我们起楼房时，用梁+柱子+承重墙做起来的钢筋混凝土结构框架。而实现的软件功能，也就像在这个框架结构中所要实现的不同类型、功能的房子，比如停车场、商场、酒店、饭店、商住房......

　　功能强大，结构扎实的框架，可承载的类型就更多，适用性就更强。

　　不论是什么开发框架，都是为现实不同的业务功能而创建的。好的开发框架能提高企业的竞争能力，包括降低开发成本、提高产品质量、改善客户满意程度、控制开发进度等。同时，开发框架也是某一领域为实现某种业务的知识积累，它是一种持续性的活动，随着特定业务功能实现而创建，且跳出软件开发周期而存活。一个成熟的框架，不单单只是代码而已，它除了将某一领域业务的基础功能以代码的方式实现外，还必须编写对应的文档、模型、流程图、数据字典、开发使用说明.....等一系列的文档来支撑，这样的框架才更加成熟和健壮。

 

### 为什么要使用框架

　　软件系统随着业务的发展，变得越来越复杂，不同领域的业务所涉及到的知识、内容、问题非常非常多。如果每次都从头开发，那都是一个很漫长的事情，且并不一定能将它做好。团队协作开发时，没有了统一标准，大家各写各的，同样的重复的功能到处都是。由于没有统一调用规范，很难看懂别人写的代码，出现Bug或二次开发维护时，根本无从下手。（无框架不堪回首的黑暗日子请看前面章节的讲述）

　　而一个成熟的框架，它是模板化的代码，它会帮我们实现很多基础性的功能，我们只需要专心的实现所需要的业务逻辑就可以了。而很多底层功能操作，就可以完完全全不用做太多的考虑，框架已帮我们实现了。这样的话，整个团队的开发效率可想而知。另外对于团队成员的变动，也不用太过担心，框架的代码规范让我们能轻松的看懂其他开发人员所写的代码。



### 框架和设计模式
　　度娘上说：框架、设计模式这两个概念总容易被混淆，其实它们之间还是有区别的。构件通常是代码重用，而设计模式是设计重用，框架则介于两者之间，部分代码重用，部分设计重用，有时分析也可重用。在软件生产中有三种级别的重用：内部重用，即在同一应用中能公共使用的抽象块;代码重用，即将通用模块组合成库或工具集，以便 在多个应用和领域都能使用；应用框架的重用，即为专用领域提供通用的或现成的基础结构，以获得最高级别的重用性。

　　框架与设计模式虽然相似，但却有着根本的不同。设计模式是对在某种环境中反复出现的问题以及解决该问题的方案的描述，它比框架更抽象；框架可以用代码表示，也能直接执行或复用，而对模式而言只有实例才能用代码表示;设计模式是比框架更小的元素，一个框架中往往含有一个或多个设计模式，框架总是针对某一特定应 用领域，但同一模式却可适用于各种应用。可以说，框架是软件，而设计模式是软件的知识。

 

### 框架的主要特点和要求

- 1、代码模板化

　　框架一般都有统一的代码风格，同一分层的不同类代码，都是大同小异的模板化结构，方便使用模板工具统一生成，减少大量重复代码的编写。在学习时通常只要理解某一层有代表性的一个类，就等于了解了同一层的其他大部分类结构和功能，容易上手。团队中不同的人员采用类同的调用风格进行编码，很大程度提高了代码的可读性，方便维护与管理。

 

- 2、重用

　　开发框架一般层次清晰，不同开发人员开发时都会根据具体功能放到相同的位置，加上配合相应的开发文档，代码重用会非常高，想要调用什么功能直接进对应的位置去查找相关函数，而不是每个开发人员各自编写一套相同的方法。

- 3、高内聚（封装）

　　框架中的功能会实现高内聚，开发人员将各种需要的功能封装在不同的层中，给大家调用，而大家在调用时不需要清楚这些方法里面是如果实现的，只需要关注输出的结果是否是自己想要的就可以了。

- 4、规范

　　框架开发时，必须根据严格执行代码开发规范要求，做好命名、注释、架构分层、编码、文档编写等规范要求。因为你开发出来的框架并不一定只有你自己在用，要让别人更加容易理解与掌握，这些内容是非常重要的。

- 5、可扩展

 　开发框架时必须要考虑可扩展性，当业务逻辑更加复杂、数量记录量爆增、并发量增大时，能否通过一些小的调整就能适应？还是需要将整个框架推倒重新开发？当然对于中小型项目框架，也不必考虑太多这些内容，当个人能力和经验足够时水到渠成，自然就会注意到很多开发细节。

- 7、可维护

　　成熟的框架，对于二次开发或现有功能的维护来说，操作上应该都是非常方便的。比如项目要添加、修改或删除一个字段或相关功能，只需要简单的操作，十来分钟或不用花太多的工夫就可以搞定。新增一个数据表和对应的功能，也可以快速的完成。功能的变动修改，不会对系统产生不利的影响。代码不存在硬编码等等，保证软件开发的生产效率和质量。

- 8、协作开发

　　有了开发框架，我们才能组织大大小小的团队更好的进行协作开发，成熟的框架将大大减轻项目开发的难度，加快开发速度，降低开发费用，减轻维护难度。

- 9、通用性

　　同一行业或领域的框架，功能都是大同小异的，不用做太大的改动就可以应用到类似的项目中。在框架中，我们一般都会实现一些同质化的基础功能，比如权限管理、角色管理、菜单管理、日志管理、异常处理......或该行业中所要使用到的通用功能，使框架能应用到某一行业或领域中，而不是只针对某公司某业务而设定（当然也肯定存在那些特定功能的应用框架，这只是非常少的特殊情况，不在我们的考虑范围）。

 

## 框架知识体系目录

### 框架基础知识总结
  - [框架基础知识介绍](/framework/basic/01-intro.html)
  - [框架架构组件定义和区别](/framework/basic/02-commconceptdiff.html)
  - [框架架构组件关系整理](/framework/basic/03-commconceptrela.html)
  - [组件化框架方案简介](/framework/basic/04-componentframe.html)
  - [热门微服务框架概览](/framework/basic/05-microservintro.html)
  - [常见的15种微服务架构框架](/framework/basic/06-microserv15.html)
  - [Spring框架核心组件思想](/framework/basic/07-springframethink.html)
### 日志框架知识总结
  - [Java-常用日志框架介绍](/framework/log/01-intro.html)
  - [SpringBoot-常用日志框架](/framework/log/02-springbootlogintro.html)
  - [SpringBoot-日志框架Logback详解](/framework/log/03-springbootlogback.html)
### ORM框架知识总结
  - [Java-常用ORM框架介绍](/framework/orm/01-intro.html)
  - [Java-常用ORM框架区别](/framework/orm/02-commormdiff.html)
  - [SpringBoot-Mybatis案例](/framework/orm/03-mybatiscase.html)
  - [SpringBoot-Hibernate案例](/framework/orm/04-hibernatecase.html)
  - [SpringBoot-JPA案例](/framework/orm/05-jpacase.html)
  - [SpringBoot-Mybatis学习连载](/framework/orm/06-mybatissum.html)
### NIO框架知识总结
  - [Java-常用NIO框架介绍](/framework/nio/01-intro.html)
  - [常用IO框架概述](/framework/nio/02-commiointro.html)
  - [BIO、NIO和AIO区别](/framework/nio/03-niobioaiodiff.html)
  - [常见NIO框架区别](/framework/nio/04-nioframediff.html)
  - [NIO线程模型原理](/framework/nio/05-nioprin.html)
  - [NIO底层运行原理](/framework/nio/06-niounderprin.html)
### Netty框架知识总结
  - [Netty-入门介绍](/framework/netty/01-intro.html)
  - [Netty-IO模型总结](/framework/netty/02-nettyio.html)
  - [Netty-线程模型总结](/framework/netty/03-nettythreadmodel.html)
  - [Netty-Reactor模式总结](/framework/netty/04-nettyreactor.html)
  - [Netty-工作原理总结](/framework/netty/05-nettyworkprin.html)
  - [Netty-架构原理精华总结](/framework/netty/06-nettysum.html)
### Netty案例实战总结
  - [Netty-入门案例介绍](/framework/nettycase/01-intro.html)
  - [Netty-设计模式应用](/framework/nettycase/02-designmodel.html)
  - [I/O通信-聊天室IO模式](/framework/nettycase/03-chatcaseio.html)
  - [I/O通信-聊天室BIO模式](/framework/nettycase/04-chatcasebio.html)
  - [I/O通信-聊天室NIO模式](/framework/nettycase/05-chatcasenio.html)
  - [I/O通信-聊天室AIO模式](/framework/nettycase/06-chatcaseaio.html)
  - [Netty-SpringBoot案例1](/framework/nettycase/07-springbootcase1.html)
  - [Netty-SpringBoot案例2](/framework/nettycase/08-springbootcase2.html)
  - [Netty-SpringBoot案例3](/framework/nettycase/09-springbootcase3.html)
  - [Netty-SpringBoot远程调用](/framework/nettycase/10-rpccase.html)

## ♥♥♥-----【架构篇】------♥♥♥
## 架构相关的基础知识：

### 什么是架构和架构本质

在软件行业，对于什么是架构，都有很多的争论，每个人都有自己的理解。此君说的架构和彼君理解的架构未必是一回事。因此我们在讨论架构之前，我们先讨论架构的概念定义，概念是人认识这个世界的基础，并用来沟通的手段，如果对架构概念理解不一样，那沟通起来自然不顺畅。

Linux有架构，MySQL有架构，JVM也有架构，使用Java开发、MySQL存储、跑在Linux上的业务系统也有架构，应该关注哪一个？

想要清楚以上问题需要梳理几个有关系又相似的概念：系统与子系统、模块与组建、框架与架构:

### 区分系统、模块、组件、框架和架构


*  系统(system)和子系统：有**关联**的个体，根据某种**规则**运行，共同完成独特的**功能**。子系统：系统的组成部分。
*  模块(module)和组件(component)：模块和组件都是系统的组成部分，只是从不同角度拆分系统而已。 从逻辑角度拆分得到的是模块，从物理角度拆分得到的是组件。 模块是为了实现职责分离， 组件是为了实现复用。
*  框架：为了实现某个业界标准或完成特定基本任务的软件组件规范，按照规范提供所要求基础功能的软件产品。
*  架构：顶层设计

### 系统与子系统

系统：泛指由一群有关联的个体组成，根据某种规则运作，能完成个别元件不能独立完成的工作能力的群体。

子系统：也是由一群关联的个体组成的系统，多半是在更大的系统中的一部分。

### 模块与组件

都是系统的组成部分，从不同角度拆分系统而已。模块是逻辑单元，组件是物理单元。

模块就是从逻辑上将系统分解， 即分而治之， 将复杂问题简单化。模块的粒度可大可小， 可以是系统，几个子系统、某个服务，函数， 类，方法、 功能块等等。

组件可以包括应用服务、数据库、网络、物理机、还可以包括MQ、容器、Nginx等技术组件。

### 框架与架构

框架是组件实现的规范，例如：MVC、MVP、MVVM等，是提供基础功能的产品，例如开源框架：Ruby on Rails、Spring、Laravel、Django等，这是可以拿来直接使用或者在此基础上二次开发。

框架是规范，架构是结构。

### 架构重新定义

架构是什么？架构师解决什么问题？

* 架构是经过**系统性地思考1**, 权衡利弊之后在现有资源约束下的最合理决策, 最终明确的**系统骨架2**。包括子系统, 模块, 组件. 以及他们之间**协作关系**3, **约束规范, 指导原则**4。并由它来指导团队中的每个人思想层面上的一致。
* 架构师能力要求：理解业务，全局把控，选择合适技术，解决关键问题、指导研发落地实施。

我在这重新定义架构：软件架构指软件系统的顶层结构。

架构是经过系统性地思考, 权衡利弊之后在现有资源约束下的最合理决策, 最终明确的系统骨架。包括子系统, 模块, 组件. 以及他们之间协作关系, 约束规范, 指导原则。并由它来指导团队中的每个人思想层面上的一致。涉及四方面：

* 系统性思考的合理决策：比如技术选型、解决方案等。
* 明确的系统骨架：明确系统有哪些部分组成。
* 系统协作关系：各个组成部分如何协作来实现业务请求。
* 约束规范和指导原则：保证系统有序，高效、稳定运行。

**因此架构师具备能力：理解业务，全局把控，选择合适技术，解决关键问题、指导研发落地实施。**

架构的本质就是对系统进行有序化地重构以致符合当前业务的发展，并可以快速扩展。

那什么样的系统要考虑做架构设计 技术不会平白无故的出和自驱动发展起来，而架构的发展和需求是基于业务的驱动。

架构设计完全是为了业务：

* 1. 需求相对复杂。
* 2. 非功能性需求在整个系统占据重要位置。
* 3. 系统生命周期长,有扩展性需求。
* 4. 系统基于组件或者集成的需要。
* 5. 业务流程再造的需要。

### 架构分层和分类


*  业务架构是战略，应用架构是战术，技术架构是装备
*  业务架构（俯视架构）：包括业务规划，业务模块、业务流程，对整个系统的业务进行拆分，对领域模型进行设计，把现实的业务转化成抽象对象。
*  应用架构(剖面架构): 承接业务架构和技术架构。应用架构的本质是通过系统拆分，平衡业务和技术复杂性，保证系统形散神不散。
*  应用作为独立可部署的单元，为系统划分了明确的边界，深刻影响系统功能组织、代码开发、部署和运维等各方面，应用架构定义系统有哪些应用、以及应用之间如何分工和合作。应用的分偏向于业务，反映业务架构，应用的合偏向于技术，影响技术架构。
*  技术架构：确定组成应用系统的实际运行组件(技术选型)，这些运行组件之间的关系，以及部署到硬件的策略。
*  技术架构主要考虑系统的非功能性特征，对系统的高可用、高性能、扩展、安全、伸缩性、简洁等做系统级的把握
*  三者关系：
*   业务架构是生产力，应用架构是生产关系，技术架构是生产工具。业务架构决定应用架构，应用架构需要适配业务架构，并随着业务架构不断进化，同时应用架构依托技术架构最终落地


### 架构五视图：
*  逻辑架构：逻辑架构关注功能，不仅包括用户可见的功能，还包括为实现用户功能而必须提供的“辅助功能模块”。
*  开发架构：开发架构关注程序包，不仅包括要编写的源程序，还包括可以直接使用的第三方SDK 和现场框架、类库，以及开发的系统将运行于其上的系统软件或中间件。关注编译时刻的静态依赖关系。
*  运行架构：运行架构关注进程、线程、对象等运行时概念，以及相关的并发，同步，通信等问题。运行架构关注运行期间各个单元的交互。
*  物理架构：物理架构关注“目标程序及其依赖的运行库和系统软件”最终如何安装或部署到物理机器，以及如何部署机器和网络来配合软件系统的可靠性，可伸缩性等要求。
*  数据架构：数据架构关注持久化数据的存储方案，不仅包括实体及实体关系的存储格式、还包括数据传递，数据复制，数据同步等策略。

架构分类可细分为业务架构、应用架构、技术架构, 代码架构, 部署架构、数据架构

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/architecture/basic/essence/1920424-20200322164534220-1088336447.png')" alt="wxmp">

业务架构是战略，应用架构是战术，技术架构是装备。其中应用架构承上启下，一方面承接业务架构的落地，另一方面影响技术选型。

熟悉业务，形成业务架构，根据业务架构，做出相应的应用架构，最后技术架构落地实施。

如何针对当前需求，选择合适的应用架构，如何面向未来，保证架构平滑过渡，这个是软件开发者，特别是架构师，都需要深入思考的问题。

[更多内容可以点击:](/architecture/basic/02-essence.html)

## 架构知识体系目录

### 架构基础知识总结
  - [架构概念基础介绍](/architecture/basic/01-intro.html)
  - [架构基本概念和架构本质](/architecture/basic/02-essence.html)
  - [架构设计-核心思维](/architecture/basic/03-arcthink.html)
  - [架构设计-核心思维案例](/architecture/basic/04-arcthinkcase.html)
  - [架构设计原则(核心价值)](/architecture/basic/05-arcdesingcorevalue.html)
  - [三大架构设计原则](/architecture/basic/06-arcdesingprin3.html)
  - [架构设计原则精华总结](/architecture/basic/07-arcdesignprindeatail.html)
### 微服务架构和分布式
  - [微服务架构介绍](/architecture/microservanddistribute/01-intro.html)
  - [微服务和分布式区别](/architecture/microservanddistribute/02-microservanddistributediff.html)
  - [微服务和集群区别](/architecture/microservanddistribute/03-microservandclusterdiff.html)
  - [微服务和SOA区别](/architecture/microservanddistribute/04-micorservandsoadiff.html)
  - [微服务精华总结](/architecture/microservanddistribute/05-microservsum.html)

## ♥♥♥-----【开发篇】------♥♥♥
## 开发人员能力评估参考
### 如何辨别一个程序员水平的高低？
程序员水平的高低，感觉有时候真不能看写过多少代码。太多的程序员日常的工作就是调调现有接口，复制黏贴。代码是写了不少，但做的东西并没有多少不同。

拉开程序员差距的主要在架构能力方面。这个需要很多的大项目的搭建经验，一点点成长起来。一个好的架构，可以让整个项目的耗时，人力成本减少很多。需要很多的实践经验以及源码的解读，来避免掉很多不必要的坑。

这样的程序员市场很稀缺，价值也不菲。

不请自来，一介码农路过，留下些看法。

### 程序员主要是有四种综合能力
也就是debug 能力、 performance分析、 保护性编程和 投入产出比。

**debug 能力**。这是我们生活中常用的一种能力，也就是调试问题的问题。
**performance分析**。能够对业务和代码进行精准的分析。
**保护性编程**。对代码的侵入性尽量的低，也就是解耦。
**投入产出比**。效率的问题。

### **仅仅独立完成日后必然成高手**？

在这里不能说一棒子打死，至少对于很多人来说，能独立完成是没什么问题的，有的是因为对业务熟悉，有的是真的基础扎实。但怎么说呢，程序员和浏览器打交道是最多的，现在这个互联网时代，遇到的大部分问题百度都是可以解决的，也就是普通程序员 + 百度 = 超级程序员。 但很多人也没明白具体的原理，甚至都是这个项目抄抄那个项目抄抄的，久而久之虽然解决了平时的业务，但进步的空间却很少，甚至止步不前，写出来的代码也可能存在很多坑，所以，仅仅能独立完成任务的话，离高手还有比较远的一段距离。


### **如何辨别高手程序员**？

也就是结合我们一开始列举的那四个能力进行判断。不同级别的程序员，在那综合能力面前，强弱也是不同的。例如在奔溃的或者其他性能调优问题上，即使是面对大量复杂的代码，在信息不全的时候也会一步步的分析，抽丝剥茧缩小范围，最终定位根本原因，并且最终给出一个好的方案。


### **如何成为高手程序员**？

- **学习设计模式**。
设计模式对程序员来说是一门重要的课程，设计模式是前辈程序员们总结下来的宝贵的解决问题的问题，能让我们写出更好的代码。写代码其实也可以看成是一门艺术，代码写得优雅就会让人看着舒服。

- **动手前养成先思考规划的习惯**。
很多时候，我们临急临忙的动手，反而留的坑会越来越多。就比如我最近项目上遇到的一个问题，一开始做得复杂了，越写下去就发现越多坑，而且代码也比较凌乱。后来冷静的思考了一下，发现只有设计库的设计稍微修改修改，问题就能变得简单起来，代码也写得比之前的优雅了许多。

- **有条件的话学习下算法和数据结构**。
在这里，也还是推荐适当的学习算法和数据结构的，虽然很枯燥，但这也是让我们变强大的内功。虽然可能很多时候用不到，但其实算法是在潜移默化的改变了我们思考的能力，让我们脑子变得更加的灵活，甚至会慢慢的一点点渗入我们的生活中。


### 如下是程序员的面试内容

- （1）是否能熟练使用所用编程语言的主要功能；
- （2）是否知道用合适的数据结构解决问题；
- （3）是否知道基本的算法，并且用这些算法解决问题；
- （4）只看少量代码的话，从变量命名和程序结构一般能够判断是否是新手；
- （5）给出具体问题，能够用程序解决，能考虑到所有的边界条件；
- （6）考虑程序的可扩展性，可维护性；再往高一点走，就需要
- （7）面对模糊的问题能够分析并且找到细节和具体的需求；
- （8）知道利用已有的库，架构和工具等来解决新的问题，而不是什么都自己实现；
- （9）能发现并改进已有程序中的瓶颈；
- （10）对整个大项目的程序架构有很清晰的了解，知道相互之间的依赖，以及知道为什么采用这样就架构；
- （11）给一个大的项目，能够对整个项目的程序架构和组件进行合理的设计，考虑并行性，低延迟，大数据量等各种需求和应对方式。

### 程序员能力阶段分类

**第一阶段（黄金）**:会用编程语言实现需求，比如现在的业务系统，都会找一些会搬代码的人来拼工作量，也就是能自己独立基于搭好的框架实现crud常规操作。

**第二阶段（铂金）**:除了crud，还会有一些自己踩过坑的经验，知道如何处理一些常见问题，或者可以基于搜索引擎快速解决一些异常情况。

**第三阶段（钻石）**:能解决一些疑难杂症和会通过debug部分源码类库查看到这些疑难杂症是如何引发的，并通过编码解决这些问题，还能进行一些局部的性能优化，类似某个系统接口缓慢可以单独去优化。

**第四阶段（星耀）**:会基于整个系统进行设计和规划，根据业务特性选择合适的框架，从源头控制开发遇到问题的频率，可以自主的搭建框架并完善机制，了解各个组件工作原理。

**第五阶段（王者）**:小说里面总是说练武功的永远比不过创造武功的，同样的道理，用框架的也往往不如写框架的，所以写框架的这类人单独分层。

**第六阶段（荣耀）**:其实这个阶段不应该列入进来，因为这类人往往不编码的，只是给出思想；像Hadoop这种框架就是基于人家发表的一些论文（bigdata)进行编码实现的，这类人注重的是思想和算法，区块链，大数据，云计算等等概念的创造和理论的支撑是这类人提出来的，这些人才是真正影响行业走向的人。

[更多内容可以点击:](/dev/abilityevaluation/05-abilitysummary.html)

## 开发相关知识体系目录
### 开发工具知识总结
  - [Java-常用开发工具](/dev/tool/01-intro.html)
  - [MySQL-常用开发工具](/dev/tool/02-mysql.html)
  - [版本管理-Git命令总结](/dev/tool/03-gitcmd.html)
  - [版本管理-Git命令撤销更改](/dev/tool/03.1-gitcmdcancel.html)
  - [版本管理-Git可视化工具](/dev/tool/04-gitvisualtool.html)
  - [20个精选Idea插件推荐](/dev/tool/05-idea20recommendedplug.html)
  - [Jvm调优-工具总结](/dev/tool/06-jvmtool.html)
### 开发规范知识总结
  - [Java开发规范(阿里巴巴)](/dev/standard/01-intro.html)
  - [SQL编写规范36条](/dev/standard/02-mysqlstandard.html)
  - [Mybatis规范和标签](/dev/standard/03-mybatisstandard.html)
### 开发设计模式总结
  - [JAVA设计模式基础介绍](/dev/designpattern/01-intro.html)
  - [设计模式-六大原则简介](/dev/designpattern/02-6prinsintro.html)
  - [设计模式-六大原则详解](/dev/designpattern/03-6prinsdetail.html)
  - [设计模式-六大原则案例](/dev/designpattern/04-6prinscase.html)
  - [设计模式-创建型模式](/dev/designpattern/05-createpattern.html)
  - [设计模式-结构型模式](/dev/designpattern/06-structpattern.html)
  - [设计模式-行为型模式](/dev/designpattern/07-actionpattern.html)
  - [设计模式-23种模式精华总结](/dev/designpattern/08-designpatternsum.html)
### 开发效率总结
  - [开发效率-入门介绍](/dev/deveffciency/01-intro.html)
  - [开发效率-常用提升方法](/dev/deveffciency/02-commpromethods.html)
  - [开发效率-利用好框架](/dev/deveffciency/03-devframe.html)
  - [开发效率-利用好工具](/dev/deveffciency/04-devtools.html)
  - [开发效率-4个团队关键点](/dev/deveffciency/05-4keypoints.html)
  - [开发效率-30个效能锦囊](/dev/deveffciency/06-30methods.html)
  - [开发效率-5%的神话](/dev/deveffciency/07-5percentmythology.html)
  - [开发效率-硅谷工程师](/dev/deveffciency/08-siliconvalley5skills.html)
  - [开发效率-精华总结](/dev/deveffciency/09-summary.html)
### 技术能力评估总结
  - [技术能力-评估基础要素](/dev/abilityevaluation/01-abilityevbasic.html)
  - [技术能力-成长6个阶段](/dev/abilityevaluation/02-6devabilitystage.html)
  - [技术能力-评估要素总结](/dev/abilityevaluation/03-abilityevmethod.html)
  - [技术能力-等级评价杂谈](/dev/abilityevaluation/04-gradeevaluationgossip.html)
  - [技术能力-模型精华总结](/dev/abilityevaluation/05-abilitysummary.html)

## ♥♥♥-----【综合篇】------♥♥♥

## 综合技能相关知识体系目录
## 中间件知识总结
### 消息队列基础总结
  - [消息队列-功能介绍](/middleware/mq/01-intro.html)
  - [消息队列-常见使用场景](/middleware/mq/02-commscene.html)
  - [常用消息队列介绍](/middleware/mq/03-commmqintro.html)
  - [常用消息队列总结和区别](/middleware/mq/04-commmqdiff.html)
  - [消息队列-kafka精彩总结](/middleware/mq/05-kafkaintro.html)
  - [SpringBoot整合ActiveMq](/middleware/mq/06-springbootactivemq.html)
  - [SpringBoot整合Kafka](/middleware/mq/07-springbootkafka.html)
  - [消息队列-精华总结](/middleware/mq/08-summary.html)
### 消息队列JMS
  - [JMS规范-入门介绍](/middleware/jms/01-intro.html)
  - [JMS规范-Spring JMS组件](/middleware/jms/02-springjms.html)
  - [JMS规范-ActiveMQ案例](/middleware/jms/03-activemqjms.html)
  - [JMS规范与Kafka](/middleware/jms/04-jmskafka.html)
  - [JMS规范-精华总结](/middleware/jms/05-jmssum.html)
### zookeeper基础总结
  - [Zookeeper-入门介绍](/middleware/zookeeper/01-intro.html)
  - [Zookeeper-安装和配置](/middleware/zookeeper/02-installandconfig.html)
  - [Zookeeper-工作原理](/middleware/zookeeper/03-workprindetail.html)
  - [Zookeeper-开发配置](/middleware/zookeeper/04-devconfig.html)
  - [Zookeeper-应用场景](/middleware/zookeeper/05-appscene.html)

## ElasticSearch知识总结
### ES基础知识总结
  - [ES-入门介绍](/es/basic/01-intro.html)
  - [ES-倒排索引介绍](/es/basic/02-invertedindexprin.html)
  - [ES-技术栈ELK介绍](/es/basic/03-es-elk.html)
  - [ES-安装和配置](/es/basic/04-installconfig.html)
  - [ES-集群原理](/es/basic/05-colonyprin.html)
  - [ES-精华总结](/es/basic/06-summary.html)
### Springboot集成ES案例
  - [SpringBoot集成ES基础案例](/es/case/01-case1.html)
  - [SpringBoot集成案例ES6.x](/es/case/02-case2.html)
  - [SpringBoot集成案例ES7.x](/es/case/03-case3.html)
### Logstash知识总结
  - [Logstash-入门介绍](/es/logstash/01-intro.html)
  - [Logstash-安装使用](/es/logstash/02-installuse.html)
  - [Logstash-配置详解(一)](/es/logstash/03-configdetai1.html)
  - [Logstash-配置详解(二)](/es/logstash/04-configdetai2.html)
  - [Logstash-精彩连载推荐](/es/logstash/05-recommend.html)
### Kibana知识总结
  - [Kibana-入门介绍](/es/kibana/01-intro.html)
  - [Kibana-安装和配置](/es/kibana/02-installconfig.html)
  - [Kibana-精华总结](/es/kibana/03-summary.html)
### ES性能优化
  - [ES优化-基础篇](/es/optimize/01-intro.html)
  - [ES优化-优化原则和方法](/es/optimize/02-basicopt.html)
  - [ES优化-参数优化](/es/optimize/03-paramopt.html)
  - [ES优化-查询性能优化](/es/optimize/04-selectopt.html)
  - [ES优化-写入性能优化](/es/optimize/05-writeopt.html)
  - [ES优化-精华总结](/es/optimize/06-sumopt.html)

## MySQL运维
### MySQL运维基础知识
  - [MySQL-运维常用操作](/mysqlop/basic/01-intro.html)
  - [MySQL-运维精华操作](/mysqlop/basic/02-essenceoperatio.html)
  - [MySQL-运维经典问题](/mysqlop/basic/03-classicop.html)
  - [MySQL-运维基础知识](/mysqlop/basic/04-commknowledge.html)
  - [MySQL-运维命令汇总](/mysqlop/basic/05-summary.html)
### MySQL监控分析-慢SQL
  - [监控分析-慢SQL入门介绍](/mysqlop/monitorsql/01-intro.html)
  - [监控分析-慢SQL案例操作](/mysqlop/monitorsql/02-slowsqlcase.html)
  - [监控分析-慢SQL辅助工具](/mysqlop/monitorsql/03-slowsqltool.html)
### MySQL监控分析-锁
  - [监控分析-锁监控介绍](/mysqlop/monitorlock/01-intro.html)
  - [监控分析-锁问题基础核查](/mysqlop/monitorlock/02-lockdealcase.html)
  - [监控分析-监控锁表工具](/mysqlop/monitorlock/03-locktabletool.html)
  - [监控分析-锁机制和事务原理](/mysqlop/monitorlock/04-lockprindetail.html)
  - [监控分析-锁和事务案例总结](/mysqlop/monitorlock/05-lockcasesummary.html)
### MySQL主从复制
  - [主从复制-基础介绍](/mysqlop/replication/01-intro.html)
  - [主从复制-binlog介绍和作用](/mysqlop/replication/02-binlogintro.html)
  - [主从复制-基于binlog复制案例](/mysqlop/replication/03-binlogreplication.html)
  - [主从复制-Centos操作案例](/mysqlop/replication/04-replicationcase.html)
  - [主动复制-延迟基础检查](/mysqlop/replication/05-replicationdelaybasic.html)
  - [主动复制-延迟问题详解](/mysqlop/replication/06-replicationdelaydetail.html)
### MySQL读写分离-中间代理
  - [读写分离-基础知识介绍](/mysqlop/rwseperateprin/01-intro.html)
  - [读写分离-MyCat介绍](/mysqlop/rwseperateprin/02-mycatintro.html)
  - [读写分离-MyCat案例说明](/mysqlop/rwseperateprin/03-mycatcase.html)
  - [读写分离-MyCat分库分表](/mysqlop/rwseperateprin/04-mycatsplitdbandtable.html)
  - [读写分离-Amoeba案例说明](/mysqlop/rwseperateprin/05-amoebacase.html)
### MySQL读写分离-SpringBoot
  - [读写分离-Springboot案例(一)](/mysqlop/rwseperatecase/01-intro.html)
  - [读写分离-Springboot案例(二)](/mysqlop/rwseperatecase/02-druidcase.html)
  - [读写分离-Springboot案例(三)](/mysqlop/rwseperatecase/03-baomihuacase.html)
  - [读写分离-数据路由注解详解](/mysqlop/rwseperatecase/04-annotationcase.html)
  - [读写分离-Springboot连载(一)](/mysqlop/rwseperatecase/05-serialmybatis.html)
  - [读写分离-Springboot连载(二)](/mysqlop/rwseperatecase/06-serialmybatisplus.html)
### MySQL备份与恢复
  - [备份与恢复-基础知识介绍](/mysqlop/bak/01-intro.html)
  - [备份与恢复-简要操作案例](/mysqlop/bak/02-bakrecoverycase.html)
  - [备份与恢复-精华知识总结](/mysqlop/bak/03-bakrecoverysum.html)

## Linux命令和Nginx配置
### Linux操作系统命令
  - [Linux命令-基础篇](/operation/linux/01-intro.html)
  - [Linux命令-Top50](/operation/linux/02-cmdtop50.html)
  - [Linux命令-常用命令大全](/operation/linux/03-cmdsum.html)
  - [Linux命令-Http工具Curl](/operation/linux/04-cmdcurl.html)
  - [Linux命令-Shell脚本编程](/operation/linux/05-shell.html)
### Linux系统运维总结
  - [Linux运维-文件系统简介](/operation/linuxop/01-filesystem.html)
  - [Linux运维-文件系统详解](/operation/linuxop/02-filesysdetail.html)
### Nginx安装配置总结
  - [Nginx-入门介绍](/operation/ng/01-intro.html)
  - [常见Web服务器介绍](/operation/ng/02-commwebserver.html)
  - [Nginx-安装和配置详解](/operation/ng/03-installconfig.html)
  - [Nginx-负载均衡配置案例](/operation/ng/03.1-ngloadbalancingcase.html)
  - [Nginx-gzip压缩开启](/operation/ng/04-nggzip.html)
  - [Nginx-精华总结](/operation/ng/05-ngsum.html)

## 面试求职知识整理
### 面试求职-基础篇
  - [面试求职-简历编写技巧](/post/basic/01-prepareresume.html)
  - [面试求职-如何自我介绍](/post/basic/02-selfintroduction.html)
  - [面试求职-经典面试问题](/post/basic/03-classicqa.html)
  - [面试求职-面试注意事项](/post/basic/04-needingattention.html)
  - [面试求职-面试技巧资源](/post/basic/05-resourcesharing.html)
### Java面试-基础篇
  - [Java基础知识面试题](/post/javabasic/01-javabasic.html)
  - [网络编程面试题](/post/javabasic/02-network.html)
  - [Java集合容器面试题](/post/javabasic/03-collectiion.html)
  - [Java异常面试题](/post/javabasic/04-javaexception.html)
  - [Java并发编程面试题](/post/javabasic/05-concurrentprogramming.html)
  - [Jvm基础面试题](/post/javabasic/06-jvmbasic.html)
  - [Netty编程面试题](/post/javabasic/07-nettybasic.html)
### 算法面试-基础篇
  - [50道基础数据结构面试题](/post/algorithm/01-50basic.html)
  - [常见互联网公司算法概览](/post/algorithm/02-commonalgorithmoverview.html)
  - [常见算法面试题摘选](/post/algorithm/03-commonalgorithmquestions.html)
  - [30道经典算法面试题摘选](/post/algorithm/04-30classicinterviewquestions.html)
  - [80道经典算法面试题摘选](/post/algorithm/05-80classicinterviewquestions.html)
  - [算法和数据结构视频讲解](/post/algorithm/06-recommendvideo.html)
### Spring面试-基础篇
  - [Spring 面试题](/post/springbasic/01-springbasic.html)
  - [Spring MVC面试题](/post/springbasic/02-springmvc.html)
  - [Spring Boot面试题](/post/springbasic/03-springboot.html)
  - [Spring Cloud面试题](/post/springbasic/04-springcloud.html)
  - [Spring Cloud Alibaba面试题](/post/springbasic/05-springcloudalibaba.html)
  - [Spring Boot综合汇总面试题](/post/springbasic/06-springcloudsummary.html)
### 数据库面试-基础篇
  - [MyBatis面试题](/post/dbbasic/01-mybatis.html)
  - [Redis精简面试题](/post/dbbasic/02-redis.html)
  - [Redis常见面试题](/post/dbbasic/02.1-redissum.html)
  - [MySQL数据库面试题](/post/dbbasic/04-mysqlbasic.html)
### 系统架构和中间件基础
  - [Linux面试题](/post/sysarchibasic/01-linuxbasic.html)
  - [架构设计分布式基础](/post/sysarchibasic/02-sysarchibasic.html)
  - [数据结构与算法基础](/post/sysarchibasic/03-structureandalgorithm.html)
  - [ZooKeeper面试题](/post/sysarchibasic/04-zkbasic.html)
  - [消息中间件MQ与RabbitMQ](/post/sysarchibasic/05-mqbasic.html)
### 源码解析-基础篇
  - [如何阅读Java源码](/post/sourcecode/01-intro.html)
  - [源码解析-Java IO包](/post/sourcecode/02-javaio.html)
  - [源码解析-ArrayList](/post/sourcecode/03-arraylist.html)
  - [源码解析-ArrayBlockingQueue](/post/sourcecode/04-arrayblockingqueue.html)
  - [源码解析-Vector](/post/sourcecode/05-vector.html)
  - [源码解析-LinkedList](/post/sourcecode/06-linkedlist.html)
  - [源码解析-HashMap(一)](/post/sourcecode/07-hashmap1.html)
  - [源码解析-HashMap(二)](/post/sourcecode/08-hashmap2.html)
  - [源码解析-ConcurrentHashMap](/post/sourcecode/09-concurrenthashmpap.html)
  - [源码解析-ArrayList和LinkedList](/post/sourcecode/10-arraylistandlinkedlist.html)
  - [源码解析-CopyOnWriteArrayList](/post/sourcecode/11-copyonwritearraylist.html)
  - [源码解析-SpringBoot启动原理](/post/sourcecode/12-startprincodeanalysis.html)
  - [源码解析-常见面试题视频讲解](/post/sourcecode/13-recommendvideo.html)

## ♥♥♥---【项目|产品】-----♥♥♥
## 研发效能基础介绍

**效率竖井是研发效能改进的最大问题**

产品交付需要前后职能（如：产品、开发、测试等）和平行部门（如：前端、后端、算法等）的协作。传统方法更多关注各个职能和部门的独立改进。然而，过度局部优化，往往导致效率竖井，反而损害整体效率。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/projprod/rdefficiencyintro/intro-2.png')" alt="wxmp">

什么是效率竖井呢？上图描述了传统开发方式下，产品交付面临的普遍困境——各职能和部门局部优化带来一系列问题，如：

基于局部信息的工作优先级安排，造成不同部门和职能间相互等待，让需求无法顺畅流动。比如前、中、后台对工作的优先处理不一致，进度无法对齐，让已经开始的需求不能及时交付。

批量式的工作移交，带来进一步等待。为了最大化单个环节的效率，各职能往往倾向于批量接受和移交工作，如批量的集成，批量的转测等。进一步造成需求在过程中的积压和等待。

跨部门的问题，经常得不到及时和有效的处理。公共环境的维护，就是一个典型的问题，是影响用户需求的顺畅交付。过程中需求跨部门的有效澄清、接口对齐、问题排查是另一些常见的公共问题，它们都会造成需求无法顺畅进展。

以上只是一部分问题，它们共同作用，结果是：站在各自的视角，每个部门都觉得自己繁忙且“高效”；然而，站在全局和业务的视角，系统对外的反应却非常迟缓。这就是所谓效率竖井。

效率竖井：由局部优化导致，表现为：各个环节和部门繁忙而“高效”，但总体的效率和响应速度却很低。它是研发效能提升的普遍症结所在。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/projprod/rdefficiencyintro/intro-3.png')" alt="wxmp">

上图的折线反映了效率竖井下，单个需求的交付过程。绿色线表示需求正在被处理，红色线则表示需求在等待中。工作量不大的需求，交付周期却很长。因为大部分时间需求都处于等待状态。各个局部一片繁忙，外部却抱怨连连，相信很多人会感同身受。

### “持续快速交付价值的能力”

“持续快速交付价值的能力”是效能改进的核心目标


要改进研发效能，我们必须走出效率竖井。为此组织必须把改进的焦点从关注各个资源环节，转向关注整个系统。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/projprod/rdefficiencyintro/intro-4.png')" alt="wxmp">

上图反映了效能改进的关键——从以局部资源效率为核心，转变为价值流动效率为核心的改进。

资源效率指的是，各环节的资源利用率和产出情况，如：资源的忙闲程度、使用率、代码产出和测试执行速度等。流动效率指的是，用户价值在系统中的流动速度，如：用户需求从提出到交付的时长，它越短越好；或者是过程中等待时间的占比，它越小越好。[1]

用户价值的流动是串起整个系统，促进整体优化的不二选择。为了提高价值的流动效率，组织就必须关注用户价值在系统中端到端的流动过程，改进整个系统，而不仅仅是局部环节。以此为基础，效能改进的目标是：持续快速交付价值的能力。这也是对研发效能的基本定义。

持续快速交付价值的能力，是研发效能的核心定义。为此我们必须把改进的焦点从局部资源效率，转向价值流动效率，以保证全局和系统的优化。

### 研发效能的度量

研发效能的度量——五组指标回答研发效能的根本问题

以上定性的定义了研发效能。管理学之父德鲁克说：“如果你不能度量它，就无法改进它”。度量帮助我们更深刻认识研发效能，设定改进方向，并衡量改进效果。

产品开发过程中会产生大量的数据，但数据不是度量。好的度量的标准是：它要为回答一个根本的问题讲述完整的故事。效能度量要回答的根本问题就是：一个组织“持续快速交付价值的能力”怎么样？

为回答这个问题，应该提供怎样的一个完整故事呢？基于在天猫新零售、闲鱼、优酷、阿里健康、研发中台、阿里云等部门持续实践和探索，我们发展并验证了系统的研发效能指标体系。如上图所示，它由5组指标构成，分别是：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/projprod/rdefficiencyintro/intro-5.png')" alt="wxmp">

第一：持续发布能力。具体包含两个细分指标，分别是：

发布频率。 团队对外响应的速度不会大于其交付频率，发布频率约束团队对外响应和价值的流动速度。它的衡量标准是单位时间内的有效发布次数。

发布前置时间（也被称为变更前置时间），也就是从代码提交到功能上线花费的时间，它体现了团队发布的基本能力。如果时间开销很大，就不合适加大发版频率。

第二：需求响应周期。具体包含两个细分的指标，分别是：

交付周期时间。指的是从确认用户提出的需求开始，到需求上线所经历的平均时长。它反映团队（包含业务、开发、运营等职能）对客户问题或业务机会的响应速度；

开发周期时间。指的是从开发团队理解需求开始，到需求可以上线所经历的平均时长。它反映技术团队的响应能力。

区分交付周期和开发周期，是为了解耦并明确问题，以做出针对性的改进。其中，交付周期是最终的目标和检验标准。

第三：交付吞吐率。指的是单位时间内交付需求的数量。关于这一点，常见的问题是，个数能准确反映交付效率吗？这是个问题。所以，我们更多强调单个团队的需求吞吐率的前后对比，统计意义上它足以反映趋势和问题。

第四：交付过程质量。它包含两个细分的指标，分别是：

开发过程中缺陷的创建和修复时间分布。我们希望缺陷能够持续和及时地被发现，并且在发现后尽快修复；

缺陷库存。我们希望在整个开发过程中控制缺陷库存量，让产品始终处于接近可发布状态，奠定持续交付的基础。

交付过程质量的核心是内建质量，也就是全过程和全时段的质量。而非依赖特定的阶段，如测试阶段；或特定的时段，如项目后期。内建质量是持续交付的基础，关于其具体度量方法，下文会给出详细实例。

第五：对外交付质量。 它包含两个细分的指标，分别是：1)单位时间的故障（线上问题）数；2）故障平均解决时长。这两者共同决定了系统的可用性。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/projprod/rdefficiencyintro/intro-6.png')" alt="wxmp">

如上图所示，这5组指标，从流动效率、资源效率和质量三个方面讲述了一个完整的故事，回答了组织持续交付价值的能力如何这个核心问题。其中，持续发布能力和需求响应周期这两组指标反映价值的流动效率；吞吐率反映资源效率；交付过程质量和对外交付质量这两组指标共同反映质量水平。

### 缺陷趋势图

一个度量指标实例：缺陷趋势图

针对这些指标，[云效](https://www.aliyun.com/product/yunxiao)提供了丰富的度量图表，后续[云效](https://www.aliyun.com/product/yunxiao)产品团队还会进行场景化的梳理，提高其可用性。我会及时跟进，用专门的文章介绍云效的完整度量方案。在这里我先介绍一个例子——关于过程质量的度量图表。

“缺陷趋势图”是[云效](https://www.aliyun.com/product/yunxiao)新设计的度量图表，它反映交付过程中缺陷发现和移除的时间分布，以及缺陷的库存趋势。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/projprod/rdefficiencyintro/intro-7.png')" alt="wxmp">

如上图所示，图形的横坐标是日期，横坐标上方红色竖条代表这一天发现缺陷数量；横坐标下方绿色竖条代表当天解决的缺陷数量；橙色曲线代表缺陷存量。图中左右两个部分比较了两种交付模式。

左半部分，团队属于小瀑布的开发模式。“迭代”前期，团队集中设计、编码，引入缺陷，但并未即时地集成和验证。缺陷一直掩藏在系统中，直到项目后期，团队才开始集成和测试，缺陷集中爆发。

小瀑布模式下，过程质量差，带来大量的返工、延期和交付质量问题。该模式下，产品的交付时间依赖于何时缺陷能被充分移除，当然不能做到持续交付，也无法快速响应外部的需求和变化。并且，这一模式通常都导致后期的赶工，埋下交付质量隐患。

右半部分，团队开始向持续交付模式演进。在整个迭代过程中，团队以小粒度的需求为单位开发，持续地集成和测试它们，即时发现和解决问题。缺陷库存得到控制，系统始终处于接近可发布状态。这一模式更接近持续发布状态，团队对外的响应能力随之增强。

缺陷趋势图从一个侧面反映了团队的开发和交付模式。它引导团队持续且尽早发现缺陷并及时移除它们。控制缺陷库存，让系统始终处于接近可发布状态，保障了持续交付能力和对外响应能力。

缺陷趋势图是[云效](https://www.aliyun.com/product/yunxiao)研发效能度量图表中的一个。后面，我会用专门的文章系统地解读这些图表的使用。

[更多内容可以点击:](/projprod/rdefficiencyintro/01-intro.html)

## 项目|产品相关知识体系目录

### 研发效能介绍
  - [研发效能-入门介绍](/projprod/rdefficiencyintro/01-intro.html)
  - [研发效能-5组重要指标](/projprod/rdefficiencyintro/02-5indicators.html)
  - [研发效能-6个关键点](/projprod/rdefficiencyintro/03-6keypoints.html)
  - [研发效能-度量方式](/projprod/rdefficiencyintro/04-measurementmethod.html)
  - [研发效能-应对之道](/projprod/rdefficiencyintro/05-copingmethods.html)
  - [高效能研发体系构建概论](/projprod/rdefficiencyintro/06-efficiencysystem.html)
### 研发效能提升
  - [研发效能提升-入门介绍](/projprod/rdeffciencypromote/01-intro.html)
  - [研发效能提升-效能度量(1)](/projprod/rdeffciencypromote/02-efficiencymeasurement1.html)
  - [研发效能提升-效能度量(2)](/projprod/rdeffciencypromote/03-efficiencymeasurement2.html)
  - [研发效能提升-进度看板(1)](/projprod/rdeffciencypromote/04-kanban1.html)
  - [研发效能提升-进度看板(2)](/projprod/rdeffciencypromote/05-kanban2.html)
  - [研发效能提升-持续交付](/projprod/rdeffciencypromote/06-shipping.html)
  - [研发效能提升-质量管理](/projprod/rdeffciencypromote/07-qualitymanage.html)
  - [研发效能提升-每日站会](/projprod/rdeffciencypromote/08-dailyscrummeeting.html)
  - [研发效能提升-精华总结](/projprod/rdeffciencypromote/09-summary.html)
### 项目管理工具
  - [敏捷项目-管理系统工具](/projprod/rdeffciencytool/01-intro.html)
  - [敏捷项目-敏捷开发工具](/projprod/rdeffciencytool/02-scrumtool.html)
  - [敏捷项目-敏捷管理系统](/projprod/rdeffciencytool/03-openprojtool.html)

## ♥♥♥------【关于】-------♥♥♥

## 为什么要做这个网站

* 一直都想有一个属于自己的技术博客，偶然间看到一些其他类似的博客
* 博客类网站：在csdn、cnblogs、SegmentFault、简书、知乎，自己独立注册即可。
* 自己的网站：使用博客建站工具平台，比如：jekyll、hugo、wordpress、hexo、ghost、vuepress，最好有自己的域名和服务器，如果没有自己的域名和服务器，也可以发布到通过git上传到Github Pages、Coding Pages等托管平台免费展示。
* 因为自己学习过vue相关的知识，正好看到一些基于vuepress建设的博主，有挺多好的案例，同时vuepress也支持markdown 转义成静态html的实现方案。
* 自己一直多年的知识学习，一直被信息碎片化的内容困扰，希望能够更多体系化学习，帮助在工作中更好的提高学习效率和工作效率。
* 人工智能的发展，越来越多的智能化场景需要后端服务来参与，希望借此机会，更好的学习后端相关的人工智能技术。
* 学无止境，很多知识不可能完全重新整理，因为我们需要站在巨人的肩膀上，但是很多知识都会有一个我自己的整理的知识图谱和个人知识收获总结。希望这些整理帮助自己也能帮助你成长进步。

## 如果你也想搭建一个类似的博客
基于vuepress的博客搭建网上有很多的入门教程，感兴趣的同学，可以自己搜索。

个人学习推荐如下：B站的vuepress教程可以让你自己少走一些弯路：

[【啰里啰嗦】一步步搭建 VuePress 及优化](https://www.bilibili.com/video/BV1vb411m7NY?p=1)

https://www.bilibili.com/video/BV1vb411m7NY?p=1

感兴趣的可以三连。



## 参考的部分VuePress博主个人博客

* [飞跃高山与大洋的鱼](https://docs.shanyuhai.top/)
* [左小白的技术日常](http://www.zuo11.com/)
* [Java 全栈知识体系](https://www.pdai.tech/)

其中有较多的内容参考和借鉴上述博客 , 感谢博客的博主 ,也希望上面的博客能对你有帮助。

## 期待与你一起分享交流
  
最后，希望每个人在此都能找到自己有用的知识，如果你有任何问题，同时也期待和你一起交流一起提升。感兴趣的同学，可以关注如下公众号获取最新的更新内容：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/wx/wxmp.jpg')" alt="wxmp">

如果你有问题期待和站长以及其他的同学们一起交流，也可以加入如果QQ群：

QQ群:569556849 

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/qq/qqgroup.png')" alt="wxmp">

- [更多信息可以查看](/about/aboutme.html)

## ♥♥♥------【总结】-------♥♥♥

### **期待**
**万丈高楼平地起，不积跬步无以至千里**，希望体系化的知识沉淀和积累，能帮助自己和更多的同学一起 夯实基础，希望和更多的同学一起成长和进步。

知识的沉淀需要点滴的积累和不断的实践，知识体系的整理过程中难免有疏漏和错误，如果有问题欢迎加入群和站长一起沟通交流。

也欢迎在本站[【问题反馈页面】](https://www.yijiyong.com/about/aboutqa.html)留言反馈。

### **未来**

暂时关于 架构、人工智能案例、自动和智能化编程相关的内容还比较少，后面还会有持续的更新和整理，也可以关注公众号，及时获取更多最新的消息。同时也会加强更多的原创的内容整理，敬请期待。@Landry

