---
title: Spark-常用调优整理
---

::: tip
本文主要是介绍 Spark-常用调优整理 。
:::

[[toc]]


## 前言
在写spark任务中，离不开调优的工作，因此将常用的操作记录下来，方便以后的调优工作；同时如果之后发现了其他的调优手段，也会将其记录进来

ps：
- (1) 将八斗的spark调优手段也补充进来
- (2) 抽时间将这些调优操作都亲自执行一遍，并记录感想

## 一、分配更多的资源

原则：在能力许可的范围内，尽可能的分配更多的资源

### 1. 增加executor数量

**executor越多，spark任务并行能力越强**

- executor为3，core为2，则同一时间可以同时执行6个task
- executor为6，core为2，则同一时间可以同时执行12个task

执行速度提升2倍

### 2. 增加core数量

**core越多，spark任务并行执行能力越强**
- executor为3，core为2，则同一时间可以同时执行6个task
- executor为3，core为4，则同一时间可以同时执行12个task

执行速度提升2倍

### 3. 增加每个executor的内存数量

好处：

- 可以cache更多的数据到内存，提高读性能
- shuffle操作聚合时，若内存不足也会写到磁盘，影响性能
- task执行过程会创建很多对象，若内存不足会频繁GC，影响性能

### 4. 增加driver内存(影响很小)

如果spark任务中有collect或者广播变量比较大时，可以适当调大该值避免OOM

### 小结

可参考的值

```java
计算出yarn集群的所有大小，比如一共500g内存，100个cpu
此时最多可分配50个executor、每个executor的内存大小10g,每个executor使用的cpu个数为2
```

## 二、提高并行度

各个Stage中task的数量(分区数)就代表了spark任务的并行度

最好将task的数量设置为总core数的2~3倍

```java
## 这种设置方式只有在遇到shuffle过程才生效
- 设置参数spark.defalut.parallelism 
  new SparkConf().set("spark.defalut.parallelism","500")

## 这种设置方式会立马生效，但是会触发shuffle，需要进行衡量
- rdd.repartition 来重新分区，该方法会生成一个新的rdd，使其分区数变大

## 可以适当增大，来提高sql并行度
- 通过设置参数 spark.sql.shuffle.partitions=500  默认为200；
```

## 三、RDD重用

如果有些RDD比较常用，或者RDD的链路比较长，可以缓存共用的RDD

- 设置为仅内存模式性能最佳，但是最容易触发OOM
- 可以退而求次，选择仅内存但序列化，这种依然可能会触发OOM
- 此时可以在退一步，选择内存和磁盘但不序列化，这种不会触发OOM

## 四、广播变量的使用

如果执行任务的过程中，依赖的外部中间数据比较大，或者执行任务的task数量比较大，可以考虑采用广播变量

- 采用广播变量后，数据不再加载dataNum *taskNum ,而是仅加载 dataNum* ExecutorNum
- 减少内存使用量以及提高spark任务的性能

如果每个task都加载一份占用大量内存，会直接导致

- 持久化到内存的RDD会被溢写到磁盘，无法在提升读性能
- 导致频繁的GC
- 涉及到大量的网络传输

## 五、避免采用shuffle算子

shuffle不仅涉及到大量的网络传输，而且还涉及到了读写磁盘
*因为聚合阶段数据会膨胀几倍，内存一般放不下*、

spark任务中，shuffle是最耗费性能的操作

### 案例

**采用广播变量取代join**
如果两个RDD存在join操作，并且其中一个RDD比较小(仅几百M或者1,2G)
可将小RDD作为广播变量，然后对大RDD进行操作，比对广播变量中的小RDD做map操作，满足条件才写到下游

**做预聚合操作**
采用reduceByKey或aggregateByKey取代groupByKey

因为前两者会在shuffle上游对数据先做一次预聚合，这个操作的好处有

- 大大减少shuffle阶段网络传输的数据
- 上游先做一次预聚合，会大大减小下游做聚合时的计算时间

## 六、使用高性能的算子

### 1. 使用reduceByKey/aggregateByKey替代groupByKey

### 2. 使用mapPartitions替代普通map

虽然性能提高了，但是可能会抛OOM异常(因为一次处理一个partition的数据)

### 3. 使用foreachPartitions替代foreach

这个阶段一般会依赖于外部介质，如果每处理一条数据都跟外部介质建立一次连接，会大大影响性能，而且如果是对一个partition建立一次连接，还可以进行批量的提交，大大提高吞吐量

实践中发现，对于1万条左右的数据量写MySQL，性能可以提升30%以上

### 4. filter之后进行coalesce操作

一般filter会过滤30%以上的数据，因此可能存在数据倾斜的问题，个别小partition数据比较多，直接影响整体任务执行速度。在某种场景下，此时进行coalesce可以提高性能

### 5. 使用repartitionAndSortWithinPartitions替代repartition与sort类操作

如果需要在repartition重分区之后，还要进行排序，建议直接使用repartitionAndSortWithinPartitions算子(**官方推荐**)

## 七、采用Kryo提高序列化性能

Kryo比Java原生的序列化方式要快，且序列化之后的数据仅为Java的1/10

带来的好处有

- 优化读取外部数据性能
  序列化后的数据量变少，提高网络传输效率
- 缓存时采用序列化
  持久化的RDD占用内存更少，task执行过程中GC的频率也会下降
- shuffle阶段性能提升
  网络传输的性能提升

### 如何使用

```java
// 创建SparkConf对象。
val conf = new SparkConf().setMaster(...).setAppName(...)
// 设置序列化器为KryoSerializer。
conf.set("spark.serializer", "org.apache.spark.serializer.KryoSerializer")

// 注册要序列化的自定义类型。
conf.registerKryoClasses(Array(classOf[MyClass1], classOf[MyClass2]))
```

八、使用fastutil优化数据格式
- fastutil能够提供更小的内存占用，更快的存取速度
- 可使用fastutil提供的集合类来替代自己平时使用的JDK的原生的Map、List、Set

### 使用场景 1

使用Broadcast广播变量优化

使用Kryo序列化类库，提升序列化性能和效率

如果外部变量是某种比较大的集合，那么可以考虑使用fastutil改写外部变量

首先从源头上就减少内存的占用(fastutil)，通过广播变量进一步减少内存占用，再通过Kryo序列化类库进一步减少内存占用

### 使用场景 2

算子函数里使用了比较大的集合Map/List

如果在task计算逻辑里会创建比较大的Map，可能会占用较大的内存空间，而且涉及到消耗性能的遍历、存取等集合操作；那么此时，可以考虑将这些集合类型使用fastutil类库重写

使用了fastutil集合类以后，就可以在一定程度上，减少task创建出来的集合类型的内存占用。 避免executor内存频繁占满，频繁唤起GC，导致性能下降

### 使用方式

```xml
第一步：在pom.xml中引用fastutil的包
    <dependency>
      <groupId>fastutil</groupId>
      <artifactId>fastutil</artifactId>
      <version>5.0.9</version>
    </dependency>
    
第二步：平时使用List （Integer）的替换成IntList即可。 
    List<Integer>的list对应的到fastutil就是IntList类型
    
    
使用说明：
基本都是类似于IntList的格式，前缀就是集合的元素类型； 
特殊的就是Map，Int2IntMap，代表了key-value映射的元素类型。
```

## 九、调节数据本地化等待时长

在本地执行，看看任务是否都在进程本地执行，如果不是可以适当调高该值

（1）PROCESS_LOCAL：进程本地化

```java
代码和数据在同一个进程中，也就是在同一个executor中；计算数据的task由executor执行，数据在executor的BlockManager中；性能最好
```

（2）NODE_LOCAL：节点本地化

```java
代码和数据在同一个节点中；比如说数据作为一个HDFS block块，就在节点上，而task在节点上某个executor中运行；或者是数据和task在一个节点上的不同executor中；数据需要在进程间进行传输；性能其次
```

（3）RACK_LOCAL：机架本地化

```java
数据和task在一个机架的两个节点上；数据需要通过网络在节点之间进行传输； 性能比较差
```

（4） ANY：无限制

```java
数据和task可能在集群中的任何地方，而且不在一个机架中；性能最差
```

spark.locality.wait，默认是3s

首先采用最佳的方式，等待3s后降级,还是不行，继续降级...,最后还是不行，只能够采用最差的。


在代码中设置：
```java
new SparkConf().set("spark.locality.wait","10")
```

## 十、内存模型划分

如果我们cache数据量比较大，或者是我们的广播变量比较大，

```java
那我们就把spark.storage.memoryFraction这个值调大一点。
但是如果我们代码里面没有广播变量，也没有cache，shuffle又比较多，那我们要把spark.shuffle.memoryFraction 这值调大。
```

- java.lang.OutOfMemoryError
- ExecutorLostFailure
- Executor exit code 为143
- executor lost
- hearbeat time out
- shuffle file lost

如果遇到以上问题，很有可能就是内存除了问题，可以先尝试增加内存


## 参考文章
* https://segmentfault.com/a/1190000022526479