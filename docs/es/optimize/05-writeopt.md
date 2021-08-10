---
title: ES优化-写入性能优化
---

::: tip
本文主要是介绍 ES优化-写入性能优化 。
:::

[[toc]]

## (Elasticsearch)ES写入性能优化方案

在ES的默认设置下，是综合考虑数据的可靠性，搜索实时性，写入速度等因素的。当离开默认设置，追求极致写入速度时，很多是以牺牲可靠性和搜索实时性为代价的。有时候，业务上对数据可靠性和搜索实时性要求不高，反而对写入速度要求很高，此时可以调整一些策略，最大化写入速度。

综合来说可以从以下几个方面入手：

> - 加大translog flush间隔，目的是降低iops,writeblock (可靠性降低)
> - 加大index refresh间隔，除了降低I/O，更重要的是降低segment merge频率
> - 调整bulk请求（批处理）
> - 优化磁盘间的任务均匀情况，将shard尽量均匀分布到物理机各个磁盘
> - 优化节点间的任务分布，将任务尽量均匀地发到各节点
> - 优化Lucene层建立索引的过程，目的是降低CPU占用率，例如，禁用_all字段


## translog flush

ES请求进行，先会写入到translog文件中，在ES 2.x开始，默认情况下，translog的持久化策略为：每个请求都“flush”。对应配置

> index.translog.durability:request

这会影响ES写入的最大因素。但是只有这样，写操作才可能是最可靠的，如果系统允许接收一定概率的数据丢掉，则可以调整translog持久化策略为周期性和一定大小的时候“flush”。

> 设置translog策略为异步，时间120s
>
> index.translog.durability:async
>
> 设置刷盘时间为120s,默认5s
>
> index.translog.sync_interval:120s
>
> 超过设置大小会导致refresh操作，产生新的Lucene分段。默认为512MB
>
> index.translog.flush_threshold_size:1024mb


## 索引刷新间隔refresh_interval

默认情况下索引的refresh_interval为1秒，这意味着数据写如1秒后就可以被搜索到，每次索引的refresh会产生一个新的Lucene段（segment）,试想以下，如果segment过多会怎么样，因此ES 会进行segment merge 段合并，如果不需要这么高的搜索实时性，可以适当降低refresh周期，如下：

> index.refresh_interval:120s


## segment段合并优化

segment merge 操作对系统I/O和内存占用都比较高，从ES 2.0 开始，merge操作不再由ES 控制，而是由Lucene 控制，改为以下

> index.merge.scheduler.max_thread_count
>
> index.merge.policy.*

最大线程数max_thread_count默认值是：

Math.max(1,Math.min(4,Runtime.getRuntime().availableProcessors()/2))

这是一个比较理想的值，如果只是一块硬盘而非SSD，则应该设置为1，因为在旋转存储介质上并发写，由于寻址原因，只会降低写入速度。

merge策略index.merge.policy有三种

> - tiered(默认)
> - log_byete_size
> - log_doc

索引创建时合并策略就已确定，不能进行修改，但是可以动态更新策略参数，可以不做此项调整。

如果堆栈经常有很多merge,则可以尝试调整以下策略配置：

> index.merge.policy.segments_per_tier

该属性指定了每层分段的数量，取值越小最终segment越少，因此需要merge操作越多，可以考虑适当增加值，默认10，其应该大于等于index.merge_at_once

> index.merge.policy.max_merged_segment

指定单个segment最大容量，默认5GB，可以适当降低


## index buffer 

indexing buffer 在为doc建立索引时使用，当缓冲满时会刷入磁盘，生成一个新的segment,这是除了refresh_interval 刷新索引外，另一个生成新segment的机会。每个shard有自己的indexing buffer,下面的这个buffer大小的配置需要除以这个节点上索引shard的数量：

> indices.memory.index_buffer_size
>
> 默认是整个堆空间的10%
>
> indices.memory.min_index_buffer_size
>
> 默认48MB
>
> indices.memory.max_index_buffer_size
>
> 默认无限制

在执行大量的索引操作时，indices.memory.index_buffer_size的默认设置可能不够，这和可用堆内存，单节点上的shard数量相关，可以考虑适当增大该值。


## 使用bulk请求

批量写比一个索引请求只写单个文档的效率高得多，但是要注意bulk请求得整体字节数不要太大，太大可能给集群带来内存压力，因此每个请求最好避免超过几十MB，即使较大得请求看上去执行可能更好。

索引建立过程属于CPU密集型任务，应该使用固定大小的线程池，来不及处理的任务放入队列。这样可以减少上下文的切换带来的性能消耗，队列大小要适当，过大的队列导致较高的GC压力，并可能导致FGC频繁发生。

bulk写请求是一个长任务，为了给系统增加足够的写入 压力，写入过程应该多个客户端，多个线程冰箱执行。


## 磁盘间的任务均衡

ES 在分配shard的时候，落到各个磁盘的shard可能并不均匀，这种不均匀可能导致某些磁盘繁忙，对写入性能会产生一定的影响

节点间的任务均衡,为了节点间的任务尽量均衡，数据写入客户端应该把bulk请求轮询发送到各个节点。


## 索引过程调整和优化

### 1.自动生成docID(避免ES对自定义ID验证的操作)

### 2.调整字段Mapping

- 减少不必要的字段数量
- 将不需要建立索引字段的index属性设置为not_analyzed或no。对字段不分词或不建立索引，减少相应的操作，特别是binary类型
- 减少字段内容长度
- 使用不同的分析器（analyzer），不同分析器之间的运算复杂度也不相同

### 3.调整_source字段

_source字段用于存储doc原始数据，对于部分不需要存储的字段，可以通过includes excludes过滤，或者禁用_source，一般实际场景不会禁用

### 4.禁用_all

从ES 6.0开始，_all字段默认不启用，_all字段中包含所有字段分词后的关键词，作用是可以搜索的时候不指定特定字段，从所有字段所有中减少。

### 5.对Analyzed的字段禁用Norms

 Norms用于在搜索时计算doc的评分，如果不需要评分，则可以将其禁用：

"title":{"type":"string","norms":{"enabled":false}}

### 6.index_options设置

index_options用于控制在建立倒排索引过程中，哪些内容会被添加到倒排索引中，例如，doc数量，词频，positions,offsets等信息，优化这些设置可以一定程度上降低索引过程中的计算任务，接收CPU占用率（注:实际场景一般不会用，除非方案一开始很明确）

## 参考文章
* https://www.pianshen.com/article/52651592752/