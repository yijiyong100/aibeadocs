---
title: Spark-基础参数优化
---

::: tip
本文主要是介绍 Spark-基础参数优化 。
:::

[[toc]]

## Spark性能优化

## **1、Spark优化**

### 1） 使用foreachPartitions替代foreach。

原理类似于“使用mapPartitions替代map”，也是一次函数调用处理一个partition的所有数据，而不是一次函数调用处理一条数据。在实践中发现，foreachPartitions类的算子，对性能的提升还是很有帮助的。比如在foreach函数中，将RDD中所有数据写MySQL，那么如果是普通的foreach算子，就会一条数据一条数据地写，每次函数调用可能就会创建一个数据库连接，此时就势必会频繁地创建和销毁数据库连接，性能是非常低下；但是如果用foreachPartitions算子一次性处理一个partition的数据，那么对于每个partition，只要创建一个数据库连接即可，然后执行批量插入操作，此时性能是比较高的。实践中发现，对于1万条左右的数据量写MySQL，性能可以提升30%以上。

 

### 2） 设置num-executors参数

**参数说明**：该参数用于设置Spark作业总共要用多少个Executor进程来执行。Driver在向YARN集群管理器申请资源时，YARN集群管理器会尽可能按照你的设置来在集群的各个工作节点上，启动相应数量的Executor进程。这个参数非常之重要，如果不设置的话，默认只会给你启动少量的Executor进程，此时你的Spark作业的运行速度是非常慢的。

 

**参数调优建议**：该参数设置的太少，无法充分利用集群资源；设置的太多的话，大部分队列可能无法给予充分的资源。针对数据交换的业务场景，建议该参数设置1-5。

 

### 3） 设置executor-memory参数

**参数说明**：该参数用于设置每个Executor进程的内存。Executor内存的大小，很多时候直接决定了Spark作业的性能，而且跟常见的JVM OOM异常也有直接的关联。

 

**参数调优建议**：针对数据交换的业务场景，建议本参数设置在512M及以下。

 

### 4） executor-cores

**参数说明**：该参数用于设置每个Executor进程的CPU core数量。这个参数决定了每个Executor进程并行执行task线程的能力。因为每个CPU core同一时间只能执行一个task线程，因此每个Executor进程的CPU core数量越多，越能够快速地执行完分配给自己的所有task线程。

 

**参数调优建议**：Executor的CPU core数量设置为2~4个较为合适。建议，如果是跟他人共享一个队列，那么num-executors * executor-cores不要超过队列总CPU core的1/3~1/2左右比较合适，避免影响其他人的作业运行。

 

### 5） driver-memory

**参数说明**：该参数用于设置Driver进程的内存。

 

**参数调优建议**：Driver的内存通常来说不设置，或者设置512M以下就够了。唯一需要注意的一点是，如果需要使用collect算子将RDD的数据全部拉取到Driver上进行处理，那么必须确保Driver的内存足够大，否则会出现OOM内存溢出的问题。

 

### 6） spark.default.parallelism

**参数说明**：该参数用于设置每个stage的默认task数量。这个参数极为重要，如果不设置可能会直接影响你的Spark作业性能。

 

**参数调优建议**：如果不设置这个参数， Spark自己根据底层HDFS的block数量来设置task的数量，默认是一个HDFS block对应一个task。Spark官网建议的设置原则是，设置该参数为num-executors * executor-cores的2~3倍较为合适，此时可以充分地利用Spark集群的资源。针对数据交换的场景，建议此参数设置为1-10。

 

### 7） spark.storage.memoryFraction

**参数说明**：该参数用于设置RDD持久化数据在Executor内存中能占的比例，默认是0.6。也就是说，默认Executor 60%的内存，可以用来保存持久化的RDD数据。根据你选择的不同的持久化策略，如果内存不够时，可能数据就不会持久化，或者数据会写入磁盘。

 

**参数调优建议**：如果Spark作业中，有较多的RDD持久化操作，该参数的值可以适当提高一些，保证持久化的数据能够容纳在内存中。避免内存不够缓存所有的数据，导致数据只能写入磁盘中，降低了性能。但是如果Spark作业中的shuffle类操作比较多，而持久化操作比较少，那么这个参数的值适当降低一些比较合适。如果发现作业由于频繁的gc导致运行缓慢（通过spark web ui可以观察到作业的gc耗时），意味着task执行用户代码的内存不够用，那么同样建议调低这个参数的值。针对数据交换的场景，建议降低此参数值到0.2-0.4。

 

### 8） spark.shuffle.memoryFraction

**参数说明**：该参数用于设置shuffle过程中一个task拉取到上个stage的task的输出后，进行聚合操作时能够使用的Executor内存的比例，默认是0.2。也就是说，Executor默认只有20%的内存用来进行该操作。shuffle操作在进行聚合时，如果发现使用的内存超出了这个20%的限制，那么多余的数据就会溢写到磁盘文件中去，此时就会极大地降低性能。

 

**参数调优建议**：如果Spark作业中的RDD持久化操作较少，shuffle操作较多时，建议降低持久化操作的内存占比，提高shuffle操作的内存占比比例，避免shuffle过程中数据过多时内存不够用，必须溢写到磁盘上，降低了性能。如果发现作业由于频繁的gc导致运行缓慢，意味着task执行用户代码的内存不够用，那么同样建议调低这个参数的值。针对数据交换的场景，建议此值设置为0.1或以下。

 

**资源参数参考示例**

 

以下是一份spark-submit命令的示例，可以参考一下，并根据自己的实际情况进行调节：

 

./bin/spark-submit \

 --master yarn-cluster \

 --num-executors 1 \

 --executor-memory 512M \

 --executor-cores 2 \

 --driver-memory 512M \

 --conf spark.default.parallelism=2 \

 --conf spark.storage.memoryFraction=0.2 \

 --conf spark.shuffle.memoryFraction=0.1 \

 

 

## **2、Spark对磁盘的要求**

### 1） 设置独立的日志分区

**说明**：开源Spark 的Job任务在运行过程中产生大量的临时日志，导致某个分区磁盘写满，主要原因spark运行产生临时目录的默认路径/tmp/下的spark-*日志会把/分区磁盘写满。

 

**优化建议**：更改日志路径到独立的分区。

 

**修改方法**：

可以通过在`$SPARK_HOME/conf/spark-env.sh`中指定配置内容来更改默认的存储位置。

SPARK_WORK_DIR 指定work目录，默认是`$SPARK_HOME/work`子目录

SPARK_LOCAL_DIRS 指定executor运行生成的临时文件目录，默认是/tmp，由于/tmp目录有可能是采用了tmpfs，建议在实际部署中将其更改到其它目录

修改配置spark-env.sh增加：

export SPARK_LOCAL_DIRS=spark.local.dir /diskb/sparktmp,/diskc/sparktmp,/diskd/sparktmp,/diske/sparktmp,/diskf/sparktmp,/diskg/sparktmp

\---------------------

### 2） Spark磁盘临时文件自动清理

（1） SPARK_LOCAL_DIRS下的产生的文件夹，会在应用程序退出的时候自动清理掉，如果观察仔细的话，还会发现在spark_local_dirs目录有有诸如*_cache和*_lock的文件， *_cache文件是为了避免同一台机器中多个executor执行同一application时多次下载第三方依赖的问题而引进的patch。

（2） SPARK_WORK_DIR目录下的形如app-timestamp-seqid的文件夹默认不会自动清除。可同通过在spark-env.sh中加入如下内容来自动清除：

SPARK_WORKER_OPTS=”-Dspark.worker.cleanup.enabled=**true** –Dspark.workder.cleanup.interval=1200”

停止掉的程序文件夹就会被删除。

（3） 可以通过配置**spark.worker.cleaner.appDataTtl**来设置清理的时间。

（4） SPARK_WORKER_OPTS支持以下属性：

| 属性名                          | 默认值                 | 含义                                                                                                                                                                                               |
| ------------------------------- | ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| spark.worker.cleanup.enabled    | false                  | 是否定期清理 worker 和应用的工作目录。注意，该设置仅在独立模式下有效，YARN有自己的清理方式；同时，只会清理已经结束的应用对应的目录。                                                               |
| spark.worker.cleanup.interval   | 1800 (30 minutes)      | worker清理本地应用工作目录的时间间隔（秒）                                                                                                                                                         |
| spark.worker.cleanup.appDataTtl | 7 * 24 * 3600 (7 days) | 清理多久以前的应用的工作目录。这个选项值将取决于你的磁盘总量。spark应用会将日志和jar包都放在其对应的工作目录下。随着时间流逝，应用的工作目录很快会占满磁盘，尤其是在你的应用提交比较频繁的情况下。 |


## 参考文章
* https://www.cnblogs.com/zhoufly-blog/p/10100350.html