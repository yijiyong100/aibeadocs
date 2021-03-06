---
title: JVM-优化案例
---



::: tip
本文主要是介绍 虚拟机优化案例 。
:::

[[toc]]

## JVM调优工具

**Jconsole，jProfile，VisualVM**

**Jconsole :** jdk自带，功能简单，但是可以在系统有一定负荷的情况下使用。对垃圾回收算法有很详细的跟踪。

**JProfiler**：商业软件，需要付费。功能强大。可以自行查看官网文档。

**VisualVM**：JDK自带，功能强大，与JProfiler类似。推荐。

## 【重点推荐】VisualVM
VisualVM 是一个性能分析工具，自从 JDK 6 Update 7 以后已经作为 Oracle JDK 的一部分，位于 JDK 根目录的 bin 文件夹下。相关的安装教程可以自行百度。

**【推荐】使用VisualVM 定位内存泄露** [案例参考](https://www.cnblogs.com/aishangJava/p/7631714.html)

https://www.cnblogs.com/aishangJava/p/7631714.html

## 如何调优

观察内存释放情况、集合类检查、对象树

上面这些调优工具都提供了强大的功能，但是总的来说一般分为以下几类功能

**堆信息查看**

 <img class= "zoom-custom-imgs" :src="$withBase('/assets/img/java/jvm/optcase-1.png')" alt="wxmp">

可查看堆空间大小分配（年轻代、年老代、持久代分配）

提供即时的垃圾回收功能

垃圾监控（长时间监控回收情况）

 <img class= "zoom-custom-imgs" :src="$withBase('/assets/img/java/jvm/optcase-2.png')" alt="wxmp">

查看堆内类、对象信息查看：数量、类型等

 <img class= "zoom-custom-imgs" :src="$withBase('/assets/img/java/jvm/optcase-3.png')" alt="wxmp">

对象引用情况查看

有了堆信息查看方面的功能，我们一般可以顺利解决以下问题：

--年老代年轻代大小划分是否合理

--内存泄漏

--垃圾回收算法设置是否合理

## 线程监控

 <img class= "zoom-custom-imgs" :src="$withBase('/assets/img/java/jvm/optcase-4.png')" alt="wxmp">

线程信息监控：系统线程数量。

线程状态监控：各个线程都处在什么样的状态下

 <img class= "zoom-custom-imgs" :src="$withBase('/assets/img/java/jvm/optcase-5.png')" alt="wxmp">

Dump线程详细信息：查看线程内部运行情况

死锁检查

**热点分析**

 <img class= "zoom-custom-imgs" :src="$withBase('/assets/img/java/jvm/optcase-6.png')" alt="wxmp">

**CPU热点**：检查系统哪些方法占用的大量CPU时间

**内存热点**：检查哪些对象在系统中数量最大（一定时间内存活对象和销毁对象一起统计）

这两个东西对于系统优化很有帮助。我们可以根据找到的热点，有针对性的进行系统的瓶颈查找和进行系统优化，而不是漫无目的的进行所有代码的优化。

**快照**

快照是系统运行到某一时刻的一个定格。在我们进行调优的时候，不可能用眼睛去跟踪所有系统变化，依赖快照功能，我们就可以进行系统两个不同运行时刻，对象（或类、线程等）的不同，以便快速找到问题

举例说，我要检查系统进行垃圾回收以后，是否还有该收回的对象被遗漏下来的了。那么，我可以在进行垃圾回收前后，分别进行一次堆情况的快照，然后对比两次快照的对象情况。

## 内存泄漏检查

内存泄漏是比较常见的问题，而且解决方法也比较通用，这里可以重点说一下，而线程、热点方面的问题则是具体问题具体分析了。

内存泄漏一般可以理解为系统资源（各方面的资源，堆、栈、线程等）在错误使用的情况下，导致使用完毕的资源无法回收（或没有回收），从而导致新的资源分配请求无法完成，引起系统错误。

内存泄漏对系统危害比较大，因为他可以直接导致系统的崩溃。

需要区别一下，内存泄漏和系统超负荷两者是有区别的，虽然可能导致的最终结果是一样的。内存泄漏是用完的资源没有回收引起错误，而系统超负荷则是系统确实没有那么多资源可以分配了（其他的资源都在使用）。

**年老代堆空间被占满**

**异常：** java.lang.OutOfMemoryError: Java heap space

**说明：**

 <img class= "zoom-custom-imgs" :src="$withBase('/assets/img/java/jvm/optcase-7.png')" alt="wxmp">

这是最典型的内存泄漏方式，简单说就是所有堆空间都被无法回收的垃圾对象占满，虚拟机无法再在分配新空间。

如上图所示，这是非常典型的内存泄漏的垃圾回收情况图。所有峰值部分都是一次垃圾回收点，所有谷底部分表示是一次垃圾回收后剩余的内存。连接所有谷底的点，可以发现一条由底到高的线，这说明，随时间的推移，系统的堆空间被不断占满，最终会占满整个堆空间。因此可以初步认为系统内部可能有内存泄漏。（上面的图仅供示例，在实际情况下收集数据的时间需要更长，比如几个小时或者几天）

**解决：**

这种方式解决起来也比较容易，一般就是根据垃圾回收前后情况对比，同时根据对象引用情况（常见的集合对象引用）分析，基本都可以找到泄漏点。

**持久代被占满**

**异常：**java.lang.OutOfMemoryError: PermGen space

**说明：**

Perm空间被占满。无法为新的class分配存储空间而引发的异常。这个异常以前是没有的，但是在Java反射大量使用的今天这个异常比较常见了。主要原因就是大量动态反射生成的类不断被加载，最终导致Perm区被占满。

更可怕的是，不同的classLoader即便使用了相同的类，但是都会对其进行加载，相当于同一个东西，如果有N个classLoader那么他将会被加载N次。因此，某些情况下，这个问题基本视为无解。当然，存在大量classLoader和大量反射类的情况其实也不多。

**解决：**

\1. -XX:MaxPermSize=16m

\2. 换用JDK。比如JRocket。

**堆栈溢出**

**异常：**java.lang.StackOverflowError

**说明：**这个就不多说了，一般就是递归没返回，或者循环调用造成

**线程堆栈满**

**异常**：Fatal: Stack size too small

**说明**：java中一个线程的空间大小是有限制的。JDK5.0以后这个值是1M。与这个线程相关的数据将会保存在其中。但是当线程空间满了以后，将会出现上面异常。

**解决**：增加线程栈大小。-Xss2m。但这个配置无法解决根本问题，还要看代码部分是否有造成泄漏的部分。

**系统内存被占满**

**异常**：java.lang.OutOfMemoryError: unable to create new native thread

**说明**：

这个异常是由于操作系统没有足够的资源来产生这个线程造成的。系统创建线程时，除了要在Java堆中分配内存外，操作系统本身也需要分配资源来创建线程。因此，当线程数量大到一定程度以后，堆中或许还有空间，但是操作系统分配不出资源来了，就出现这个异常了。

分配给Java虚拟机的内存愈多，系统剩余的资源就越少，因此，当系统内存固定时，分配给Java虚拟机的内存越多，那么，系统总共能够产生的线程也就越少，两者成反比的关系。同时，可以通过修改-Xss来减少分配给单个线程的空间，也可以增加系统总共内生产的线程数。

**解决：**

1. 重新设计系统减少线程数量。
2. 线程数量不能减少的情况下，通过-Xss减小单个线程大小。以便能生产更多的线程




## JVM内存泄露问题定位案例


**【推荐】使用VisualVM 定位内存泄露** [案例参考](https://www.cnblogs.com/aishangJava/p/7631714.html)

https://www.cnblogs.com/aishangJava/p/7631714.html

 <img class= "zoom-custom-imgs" :src="$withBase('/assets/img/java/jvm/optcase-11.png')" alt="wxmp">

 <img class= "zoom-custom-imgs" :src="$withBase('/assets/img/java/jvm/optcase-12.png')" alt="wxmp">



## 参考文章
* https://www.iteye.com/blog/pengjiaheng-552456
* https://www.cnblogs.com/aishangJava/p/7631714.html