---
title: Flink-流式窗口概念
---

::: tip
本文主要是介绍 Flink-流式窗口概念 。
:::

[[toc]]

## 流式计算的windowing

作为对流式数据流进行stateful统计的基础，window函数是各流式计算框架必不可少的特性。然而目前业界并没有对windowing作出标准的定义和分类，不同计算框架提供的windowing方法各有不同，同一术语在不同框架的含义也不一致，这给流式计算造成了不必要的学习成本。因此本文试图从工作积累出发并结合个人理解，总结出较为全面的windowing概念以及常见策略。


## windowing概念

因为实时数据流是永不停歇的，我们无法获取所有的数据并产出一个最终的结果。更重要的是很多情况下我们更关心的是最近的状态，而不是从实时数据流启动至今的统计数据。所以我们将数据流切分为一个个片段，即计算窗口，比如最近5分钟或最近100条消息，然后在每个窗口的基础上进行统计，这种计算方式就是windowing。总而言之，**windowing是将无边界的实时数据流划分为计算窗口的统计手段**。通常window函数会配合groupby函数一起使用，即作用于grouped stream上。

## windowing策略

Windowing策略从对象指标上分为3种，即基于时间(time window)，基于计数(count window)以及基于会话(session window)，其中基于时间和基于的windowing又可以分为滚动窗口(tumbling window)和滑动窗口(sliding window)。其中与时间相关的windowing，计算间隔(step)与统计窗口(window)的关系如下:

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/da/rtaflink/intro-1.png')" alt="wxmp">

window分类

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/da/rtaflink/intro-1.png')" alt="wxmp">

window分类(count-based和time-based相似)

## 时间窗口

时间窗口顾名思义是根据时间来划分窗口，然而这里的时间是有所讲究的，总体来讲可以分为以下三种：

- 事件时间(event time)：消息所代表事件的业务时间，依赖于数据本身
- 消化时间(ingestion time)：消息到达计算引擎的时间
- 处理时间(processing time)：消息被实际处理的时间

根据业务需求不同用户可以灵活采用时间口径。事件时间最为有用但处理最为复杂，因为消息有可能乱序到达甚至迟到，所以我们不能保证在合理的时间窗口内收集到所有的事件。处理时间容易处理一些，因为消息窗口起始结束时间都由服务端控制，但对业务的价值比较小。

#### 滚动时间窗口

滚动窗口是最为简单的windowing策略，实际上离线计算从某种程度上就属于滚动窗口。滚动窗口的特点是计算间隔与统计窗口相等，任意两次计算的数据没有重叠部分(non-overlapping)，因此每次计算只需要考虑前一次计算间隔对应的数据，不需要维持跨计算间隔的数据或状态。

#### 滑动时间窗口

滑动窗口的概念借鉴自TCP，一般统计窗口大于计算间隔，因此连续的两次计算间有重叠(overlapping)，一条记录会出现在ceil(统计窗口/计算间隔)个统计窗口里。从图上来看就像统计窗口随着数据流滑动，每次滑动的步长就是计算间隔。实时计算中很大部分指标都应用了滑动窗口，例如监控中常见的qps/tps或者搜索引擎近24小时的热搜关键词。实际上滚动窗口也是滑动窗口的一个特例。

## 计数窗口

滚动计数窗口与滑动计数机制类似于上文两种窗口，区别仅在于用于划分边界的指标不是时间而是当前未处理的记录数。计数窗口不如时间窗口直观，但更适合数据量较小或在时间上分布不均匀的数据流。比如广告系统可能一天会展示10000次某个广告，不过时间并不固定而是通过用户画像判断是否应该展示，这时最近1000次展示的购买率则比最近1小时的购买率更有意义。

## 会话窗口

会话窗口是比较特殊的一类windowing策略，它基于时间间隔来划分窗口。会话窗口没有固定的大小或起始结束时间，而是动态地打开和关闭窗口。当收到消息时判断当前是否有会话，若有则并入当前会话，否则新建一个会话，一个会话超过一定时长没有新的消息则会关闭。其中值得注意的地方是由于会话的判断基于时间，这里也涉及到上文所说的三种时间的区别。如果基于处理时间，那么消息一定有序的，但如果基于事件时间和消化时间，消息可能是乱序的，这样可能遇到已经关闭的窗口被重新打开，甚至和下一个窗口合并的情况，具体决定于处理迟到记录的策略。

## 总结

尽管不同计算引擎的提供的window API有所差异，但其背后的策略都是相似的。在享受window函数带来的便捷的同时，更重要的是考虑如何持续化和恢复计算状态，会不会带来数据丢失或数据重复的潜在问题。

## 参考文献

1.[Flink document - Windows](https://ci.apache.org/projects/flink/flink-docs-release-1.2/dev/windows.html)
2.[Introducing-windows](https://flink.apache.org/news/2015/12/04/Introducing-windows.html)
3.[Kafka Stream DSL](http://kafka.apache.org/10/documentation/streams/developer-guide/dsl-api.html#windowing)
4.[windowing-data-in-big-data-streams](https://www.slideshare.net/SoftwareMill/windowing-data-in-big-data-streams)
5.[Windowing data in Big Data Streams - Spark, Flink, Kafka, Akka](https://softwaremill.com/windowing-in-big-data-streams-spark-flink-kafka-akka/)



- **本文作者：林小铂 (Paul Lin)**
- **本文链接：** [2018/03/21/流式计算的windowing/](http://www.whitewood.me/2018/03/21/流式计算的windowing/)
- **版权声明：** 本博客所有文章除特别声明外，均采用 [CC BY-NC-SA 3.0 CN](http://creativecommons.org/licenses/by-nc-sa/3.0/cn/) 许可协议。转载请注明出处！


## 【----------------------------】


## FLINK 理解流式计算中的窗口概念

## 一、描述

Window 是处理无限流的核心。Flink 认为 Batch 是 Streaming 的一个特例，所以 Flink 底层的引擎是一个流式引擎，在上面实现了流处理和批处理。

而窗口（Window）就是从Streaming 到 batch 的一个桥梁。Flink 提供了非常完善的窗口机制，这是 Flink 最大的亮点之一（其他的亮点包括消息乱序处理和 Checkpoint 机制）

## 二、窗口的生命周期

窗口的生命周期，就是创建和销毁。

窗口的开始时间和结束时间是基于自然时间创建的，比如指定一个5s的窗口，那么1分钟内就会创建12个窗口。

什么时候窗口会被创建？当第一个元素进入到窗口开始时间的时候，这个窗口就被创建了。

什么时候窗口会被销毁？当时间（ProcessTime、EventTime或者 IngestionTime）越过了窗口的结束时间，再加上用户自定义的窗口延迟时间（allowed lateness），窗口就会被销毁。

举个例子来说，假设我们定义了一个基于事件时间的窗口，长度是5分钟，并且允许有1分钟的延迟。

当第一个元素包含了一个12:00的事件时间进来时，Flink会创建一个12:00 到 12:05 的窗口；在水位到 12:06 的时候，会销毁这个窗口。

每个窗口都会绑定一个触发器和一个执行函数。触发器定义了何时会触发窗口的执行函数的计算
，比如在窗口元素数量大于等于4的时候，或者水位经过了窗口结束时间的时候。
另外，每个窗口可以指定 驱逐器（Evictor），它的作用是在触发器触发后，执行函数执行前，移除一些元素。

## 三、KEYED 和 NON-KEYED WINDOW

在定义窗口之前，首先要指定你的流是否应该被分区，使用 keyBy(…) 后，相同的 key 会被划分到不同的流里面，每个流可以被一个单独的 task 处理。如果 不使用 keyBy ，所有数据会被划分到一个窗口里，只有一个task处理，并行度是1。

## 四、窗口的分类和选择

在指定了数据流是否分区之后，下一步是要去指定窗口的类型。窗口分配器（window assigner）定义了元素如何划分到不同的窗口中。

对于 keyed Streams，使用 window （…） 来定义，对于 非 keyed Streams，使用 windowAll（…）来定义。

Flink 预定义了很多种窗口类型，可以满足大多数日常使用需求：tumbling windows（翻滚窗口）, sliding windows（滑动窗口）, session windows（会话窗口） and global windows（全局窗口）。

所有内置的窗口（除了全局窗口）都是基于时间（ProcessTime或 EventTime）的。

### 1、TUMBLING WINDOWS

翻滚窗口有一个固定的长度，并且不会重复。比如，下图是指定了一个5分钟的翻滚窗口的样子：

![在这里插入图片描述](https://www.freesion.com/images/692/85de281cc8fa1d5d491b18f353f2bacc.png)

（每个窗口都不重叠，每5分钟一个窗口）

```java
// 例子1：tumbling event-time windows
// 定义一个数据流
val input: DataStream[T] = ...
// 这里的 key selector，如果是元组的化，可以使用_._1，如果是case class 可以使用字段名来指定
input
    .keyBy(<key selector>)
// 指定了一个TumblingEventTimeWindows，窗口大小为5分钟
    .window(TumblingEventTimeWindows.of(Time.seconds(5)))
// 窗口的操作
    .<windowed transformation>(<window function>)

// 例子2：tumbling processing-time windows
input
    .keyBy(<key selector>)
    .window(TumblingProcessingTimeWindows.of(Time.seconds(5)))
    .<windowed transformation>(<window function>)

// 例子3：daily tumbling event-time windows offset by -8 hours.
// 
input
    .keyBy(<key selector>)
    .window(TumblingEventTimeWindows.of(Time.days(1), Time.hours(-8)))
    .<windowed transformation>(<window function>)

```

在例子3中，TumblingEventTimeWindows.of 指定了第二个参数 offset，它的作用是改变窗口的时间。

如果我们指定了一个15分钟的窗口，那么每个小时内，每个窗口的开始时间和结束时间为：

- [00:00,00:15)
- [00:15,00:30)
- [00:30,00:45)
- [00:45,01:00)

如果我们指定了一个5分钟的offset，那么每个窗口的开始时间和结束时间为：

- [00:05,00:20)
- [00:20,00:35)
- [00:35,00:50)
- [00:50,01:05)

一个实际的应用场景是，我们可以使用 offset 使我们的时区以0时区为准。比如我们生活在中国，时区是

UTC+08:00，可以指定一个 Time.hour(-8)，使时间以0时区为准。

### 2、SLIDDING WINDOWS

滑动窗口指定了两个参数，第一个参数是窗口大小，第二个参数控制了新的窗口开始的频率。

如果 滑动距离小于窗口距离的话，那么一个元素可能被分配到多个窗口中。

比如，窗口大小10分钟，每5分钟滑动一次，如下图：

![在这里插入图片描述](https://www.freesion.com/images/41/55ab032d6e209b6117d035257e076d91.png)

```java
val input: DataStream[T] = ...

// 例子1：sliding event-time windows
input
    .keyBy(<key selector>)
    .window(SlidingEventTimeWindows.of(Time.seconds(10), Time.seconds(5)))
    .<windowed transformation>(<window function>)

// 例子2：sliding processing-time windows
input
    .keyBy(<key selector>)
    .window(SlidingProcessingTimeWindows.of(Time.seconds(10), Time.seconds(5)))
    .<windowed transformation>(<window function>)

// 例子3，sliding processing-time windows offset by -8 hours
input
    .keyBy(<key selector>)
    .window(SlidingProcessingTimeWindows.of(Time.hours(12), Time.hours(1), Time.hours(-8)))
    .<windowed transformation>(<window function>)

```

例子3中，同样指定了一个 offset 参数，用来控制窗口开始的时间。

### 3、SESSION WINDOWS

会话窗口根据会话的间隔来把数据分配到不同的窗口。

会话窗口不重叠，没有固定的开始时间和结束时间。

比如音乐 app 听歌的场景，我们想统计一个用户在一个独立的 session 中听了多久的歌曲（如果超过15分钟没听歌，那么就是一个新的 session 了）

我们可以用 spark Streaming ，每一个小时进行一次批处理，计算用户session的数据分布，但是 spark Streaming 没有内置对 session 的支持，我们只能手工写代码来维护每个 user 的 session 状态，里面仍然会有诸多的问题。
下一次会单独写一篇文章来讨论，如何使用flink 的 session window 来实现这个问题

### 4、GLOBAL WINDOWS

全局 window 把所有相同 key 的数据，放到一个 window 来，它没有自然的窗口结束时间，所以我们需要自己指定触发器

```java
val input: DataStream[T] = ...

input
    .keyBy(<key selector>)
    .window(GlobalWindows.create())
    .<windowed transformation>(<window function>)
```





## 参考文章
* https://www.freesion.com/article/6127186317/
* http://www.whitewood.me/2018/03/21/%E6%B5%81%E5%BC%8F%E8%AE%A1%E7%AE%97%E7%9A%84windowing/  