---
title: Java-常用日志框架介绍
---

::: tip
本文主要是介绍 Java-常用日志框架介绍 。
:::

[[toc]]

## Java系统中常用日志框架



## 日志介绍

## 日志概念

> 日志：在计算机领域，日志文件（logfile）是一个记录了发生在运行中的操作系统或其他软件中的事件的文件，或者记录了在网络聊天软件的用户之间发送的消息[1](https://blog.csdn.net/xintonghanchuang/article/details/90752323#fn1)。

> 日志记录（Logging）：是指保存日志的行为。最简单的做法是将日志写入单个存放日志的文件。

日志级别[2](https://blog.csdn.net/xintonghanchuang/article/details/90752323#fn2)：

> - FATAL — 表示需要立即被处理的系统级错误。当该错误发生时，表示服务已经出现了某种程度的不可用，系统管理员需要立即介入。这属于最严重的日志级别，因此该日志级别必须慎用，如果这种级别的日志经常出现，则该日志也失去了意义。通常情况下，一个进程的生命周期中应该只记录一次FATAL级别的日志，即该进程遇到无法恢复的错误而退出时。当然，如果某个系统的子系统遇到了不可恢复的错误，那该子系统的调用方也可以记入FATAL级别日志，以便通过日志报警提醒系统管理员修复；
> - ERROR — 该级别的错误也需要马上被处理，但是紧急程度要低于FATAL级别。当ERROR错误发生时，已经影响了用户的正常访问。从该意义上来说，实际上ERROR错误和FATAL错误对用户的影响是相当的。FATAL相当于服务已经挂了，而ERROR相当于好死不如赖活着，然而活着却无法提供正常的服务，只能不断地打印ERROR日志。特别需要注意的是，ERROR和FATAL都属于服务器自己的异常，是需要马上得到人工介入并处理的。而对于用户自己操作不当，如请求参数错误等等，是绝对不应该记为ERROR日志的；
> - WARN — 该日志表示系统可能出现问题，也可能没有，这种情况如网络的波动等。对于那些目前还不是错误，然而不及时处理也会变为错误的情况，也可以记为WARN日志，例如一个存储系统的磁盘使用量超过阀值，或者系统中某个用户的存储配额快用完等等。对于WARN级别的日志，虽然不需要系统管理员马上处理，也是需要及时查看并处理的。因此此种级别的日志也不应太多，能不打WARN级别的日志，就尽量不要打；
> - INFO — 该种日志记录系统的正常运行状态，例如某个子系统的初始化，某个请求的成功执行等等。通过查看INFO级别的日志，可以很快地对系统中出现的 WARN,ERROR,FATAL错误进行定位。INFO日志不宜过多，通常情况下，INFO级别的日志应该不大于TRACE日志的10%；
> - DEBUG or TRACE — 这两种日志具体的规范应该由项目组自己定义，该级别日志的主要作用是对系统每一步的运行状态进行精确的记录。通过该种日志，可以查看某一个操作每一步的执 行过程，可以准确定位是何种操作，何种参数，何种顺序导致了某种错误的发生。可以保证在不重现错误的情况下，也可以通过DEBUG（或TRACE）级别的日志对问题进行诊断。需要注意的是，DEBUG日志也需要规范日志格式，应该保证除了记录日志的开发人员自己外，其他的如运维，测试人员等也可以通过 DEBUG（或TRACE）日志来定位问题；

日志级别优先级：

> ALL < TRACE < DEBUG < INFO < WARN < ERROR < FATAL < OFF

## 日志作用

日志记录了系统行为的时间、地点、状态等相关信息，能够帮助我们了解并监控系统状态，在发生错误或者接近某种危险状态时能够及时提醒我们处理，同时在系统产生问题时，能够帮助我们快速的定位、诊断并解决问题。

## Java中常用日志框架

在Java程序中常用日志框架可以分为两类：

> - 无具体实现的抽象门面框架，如：Commons Logging、SLF4J
> - 具体实现的框架，如：Log4j，Log4j 2，Logback，Jul

Java常用日志框架历史：

> - 1996年早期，欧洲安全电子市场项目组决定编写它自己的程序跟踪API(Tracing API)。经过不断的完善，这个API终于成为一个十分受欢迎的Java日志软件包，即Log4j。后来Log4j成为Apache基金会项目中的一员。
> - 期间Log4j近乎成了Java社区的日志标准。据说Apache基金会还曾经建议sun引入Log4j到java的标准库中，但Sun拒绝了。
> - 2002年Java1.4发布，Sun推出了自己的日志库JUL(Java Util Logging),其实现基本模仿了Log4j的实现。在JUL出来以前，log4j就已经成为一项成熟的技术，使得log4j在选择上占据了一定的优势。
> - 接着，Apache推出了Jakarta Commons Logging，JCL只是定义了一套日志接口(其内部也提供一个Simple Log的简单实现)，支持运行时动态加载日志组件的实现，也就是说，在你应用代码里，只需调用Commons Logging的接口，底层实现可以是log4j，也可以是Java Util Logging。
> - 后来(2006年)，Ceki Gülcü不适应Apache的工作方式，离开了Apache。然后先后创建了slf4j(日志门面接口，类似于Commons Logging)和Logback(Slf4j的实现)两个项目，并回瑞典创建了QOS公司，QOS官网上是这样描述Logback的：The Generic，Reliable Fast&Flexible Logging Framework(一个通用，可靠，快速且灵活的日志框架)。
> - 现今，Java日志领域被划分为两大阵营：Commons Logging阵营和SLF4J阵营。
>   Commons Logging在Apache大树的笼罩下，有很大的用户基数。但有证据表明，形式正在发生变化。2013年底有人分析了GitHub上30000个项目，统计出了最流行的100个Libraries，可以看出slf4j的发展趋势更好：
> - Apache眼看有被Logback反超的势头，于2012-07重写了log4j 1.x，成立了新的项目Log4j 2。Log4j 2具有logback的所有特性。

## Java常用日志框架之间的关系

> - Log4j2与Log4j1发生了很大的变化，log4j2不兼容log4j1。
> - Commons Logging和Slf4j是日志门面(门面模式是软件工程中常用的一种软件设计模式，也被称为正面模式、外观模式。它为子系统中的一组接口提供一个统一的高层接口，使得子系统更容易使用)。log4j和Logback则是具体的日志实现方案。可以简单的理解为接口与接口的实现，调用这只需要关注接口而无需关注具体的实现，做到解耦。
> - 比较常用的组合使用方式是Slf4j与Logback组合使用，Commons Logging与Log4j组合使用。
> - Logback必须配合Slf4j使用。由于Logback和Slf4j是同一个作者，其兼容性不言而喻。

## 日志门面框架

> 日志门面:是门面模式的一个典型的应用,门面模式，也称外观模式，请参照我的博文[设计模式之外观模式](https://blog.csdn.net/xintonghanchuang/article/details/90754196)，日志门面框架就使一套提供了日志相关功能的接口而无具体实现的框架，其调用具体的实现框架来进行日志记录。也就是说日志门面天然的兼容日志实现框架。典型的日志门面就是Commons Logging、SLF4J。

日志门面的优点：

> 日志门面是介于具体的日志框架与系统之间的桥梁，通过日志门面框架的应用实现了系统与具体实现日志框架的解耦。无论具体实现的日志框架如何变化，都不会影响系统日志的记录功能，更无须更改系统代码，符合“开放-闭合原则”。

### Commons Logging

> Apache Commons Logging是一个基于Java的日志记录实用程序，是用于日志记录和其他工具包的编程模型。它通过其他一些工具提供API，日志实现和包装器实现。

### SLF4J

> Java简易日志门面（Simple Logging Facade for Java，缩写SLF4J），是一套包装Logging 框架的界面程式，以外观模式实现。可以在软件部署的时候决定要使用的 Logging 框架，目前主要支援的有Java Logging API、Log4j及logback等框架。以MIT 授权方式发布。SLF4J 的作者就是 Log4j和Logback 的作者 Ceki Gülcü.

详细请参考我的博文[日志框架门面之SLF4J](https://blog.csdn.net/xintonghanchuang/article/details/91348467)

> 

### Commons Logging和SLF4J实现机制

Commons logging实现机制：

> Commons logging是通过动态查找机制，在程序运行时，使用自己的ClassLoader寻找和载入本地具体的实现。详细策略可以查看commons-logging-*.jar包中的org.apache.commons.logging.impl.LogFactoryImpl.java文件。由于OSGi不同的插件使用独立的ClassLoader，OSGI的这种机制保证了插件互相独立, 其机制限制了commons logging在OSGi中的正常使用。

Slf4j实现机制：

> Slf4j在编译期间，静态绑定本地的LOG库，因此可以在OSGi中正常使用。它是通过查找类路径下org.slf4j.impl.StaticLoggerBinder，然后绑定工作都在这类里面进。

## 日志实现框架

### Jul

> Jul：Java Util Logging，自Java1.4以来的官方日志实现。

### Log4j

> Apache Log4j是一个基于Java的日志记录工具。它是由Ceki Gülcü首创的，现在则是Apache软件基金会的一个项目。

Log4j的使用请参考我的博文[日志框架之Log4j](https://blog.csdn.net/xintonghanchuang/article/details/90905236)

### Log4j2

> Apache Log4j 2是apache开发的一款Log4j的升级产品,并且不兼容Log4j。

### Logback

> Logback是一个日志框架，Log4j是同一作者，都出自Ceki Gülcü之手。j
> Logback的使用请参考我的博文[日志框架之Logback](https://blog.csdn.net/xintonghanchuang/article/details/91348257)

## Java 日志框架的选择

* 1. 成本考虑：Logback文档免费。Logback的所有文档是全面免费提供的，不象Log4J那样只提供部分免费文档而需要用户去购买付费文档。
* 2. 资源开销：Commons Logging相比较与SLF4J开销更高.
* 3. 性能：Logback相比Log4j、Log4j2拥有更好的性能。Logback声称：某些关键操作，比如判定是否记录一条日志语句的操作，其性能得到了显著的提高。这个操作在Logback中需要3纳秒，而在Log4J中则需要30纳秒。LogBack创建记录器（logger）的速度也更快：13毫秒，而在Log4J中需要23毫秒。更重要的是，它获取已存在的记录器只需94纳秒，而Log4J需要2234纳秒，时间减少到了1/23。跟JUL相比的性能提高也是显著的。

------

1. https://zh.wikipedia.org/zh-hans/日志文件 [↩︎](https://blog.csdn.net/xintonghanchuang/article/details/90752323#fnref1)
2. https://zhuanlan.zhihu.com/p/27363484 [↩︎](https://blog.csdn.net/xintonghanchuang/article/details/90752323#fnref2)



## 参考文章
* https://blog.csdn.net/xintonghanchuang/article/details/90752323