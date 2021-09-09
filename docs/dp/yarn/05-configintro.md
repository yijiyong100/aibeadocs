---
title: Yarn-参数配置详解
---

::: tip
本文主要是介绍 Yarn-参数配置详解 。
:::

[[toc]]

## yarn-site.xml 配置说明

### 1. ResourceManager相关配置参数

- （1） `yarn.resourcemanager.address`
  参数解释：ResourceManager 对客户端暴露的地址。客户端通过该地址向RM提交应用程序，杀死应用程序等。
  默认值：${yarn.resourcemanager.hostname}:8032
- （2） `yarn.resourcemanager.scheduler.address`
  参数解释：ResourceManager 对ApplicationMaster暴露的访问地址。ApplicationMaster通过该地址向RM申请资源、释放资源等。
  默认值：${yarn.resourcemanager.hostname}:8030
- （3） `yarn.resourcemanager.resource-tracker.address`
  参数解释：ResourceManager 对NodeManager暴露的地址.。NodeManager通过该地址向RM汇报心跳，领取任务等。
  默认值：${yarn.resourcemanager.hostname}:8031
- （4） `yarn.resourcemanager.admin.address`
  参数解释：ResourceManager 对管理员暴露的访问地址。管理员通过该地址向RM发送管理命令等。
  默认值：${yarn.resourcemanager.hostname}:8033
- （5） `yarn.resourcemanager.webapp.address`
  参数解释：ResourceManager对外web ui地址。用户可通过该地址在浏览器中查看集群各类信息。
  默认值：${yarn.resourcemanager.hostname}:8088
- （6） `yarn.resourcemanager.scheduler.class`
  参数解释：启用的资源调度器主类。目前可用的有FIFO、Capacity Scheduler和Fair Scheduler。
  默认值：
  org.apache.hadoop.yarn.server.resourcemanager.scheduler.capacity.CapacityScheduler
- （7） `yarn.resourcemanager.resource-tracker.client.thread-count`
  参数解释：处理来自NodeManager的RPC请求的Handler数目。
  默认值：50
- （8） `yarn.resourcemanager.scheduler.client.thread-count`
  参数解释：处理来自ApplicationMaster的RPC请求的Handler数目。
  默认值：50
- （9） `yarn.scheduler.minimum-allocation-mb/ yarn.scheduler.maximum-allocation-mb`
  参数解释：单个可申请的最小/最大内存资源量。比如设置为1024和3072，则运行MapRedce作业时，每个Task最少可申请1024MB内存，最多可申请3072MB内存。
  默认值：1024/8192
- （10） `yarn.scheduler.minimum-allocation-vcores / yarn.scheduler.maximum-allocation-vcores`
  参数解释：单个可申请的最小/最大虚拟CPU个数。比如设置为1和4，则运行MapRedce作业时，每个Task最少可申请1个虚拟CPU，最多可申请4个虚拟CPU。什么是虚拟CPU，可阅读我的这篇文章：“YARN 资源调度器剖析”。
  默认值：1/32
- （11） `yarn.resourcemanager.nodes.include-path /yarn.resourcemanager.nodes.exclude-path`
  参数解释：NodeManager黑白名单。如果发现若干个NodeManager存在问题，比如故障率很高，任务运行失败率高，则可以将之加入黑名单中。注意，这两个配置参数可以动态生效。（调用一个refresh命令即可）
  默认值：“”
- （12） `yarn.resourcemanager.nodemanagers.heartbeat-interval-ms`
  参数解释：NodeManager心跳间隔
  默认值：1000（毫秒）

1. NodeManager相关配置参数

- （1） `yarn.nodemanager.resource.memory-mb`
  参数解释：NodeManager总的可用物理内存。注意，该参数是不可修改的，一旦设置，整个运行过程中不可动态修改。另外，该参数的默认值是8192MB，即使你的机器内存不够8192MB，YARN也会按照这些内存来使用（傻不傻？），因此，这个值通过一定要配置。不过，Apache已经正在尝试将该参数做成可动态修改的。
  默认值：8192
- （2） `yarn.nodemanager.vmem-pmem-ratio`
  参数解释：每使用1MB物理内存，最多可用的虚拟内存数。
  默认值：2.1
- （3） `yarn.nodemanager.resource.cpu-vcores`
  参数解释：NodeManager总的可用虚拟CPU个数。
  默认值：8
- （4） `yarn.nodemanager.local-dirs`
  参数解释：中间结果存放位置，类似于1.0中的mapred.local.dir。注意，这个参数通常会配置多个目录，已分摊磁盘IO负载。
  默认值：${hadoop.tmp.dir}/nm-local-dir
- （5） `yarn.nodemanager.log-dirs`
  参数解释：日志存放地址（可配置多个目录）。
  默认值：${yarn.log.dir}/userlogs
- （6） `yarn.nodemanager.log.retain-seconds`
  参数解释：NodeManager上日志最多存放时间（不启用日志聚集功能时有效）。
  默认值：10800（3小时）
- （7） `yarn.nodemanager.aux-services`
  参数解释：NodeManager上运行的附属服务。需配置成mapreduce_shuffle，才可运行MapReduce程序
  默认值：“”

转载自[董的博客](https://link.jianshu.com/?t=http://dongxicheng.org/)

## 【----------------------------】

## yarn参数调节

### scheduler设置：

单个容器(container)可申请的最小与最大内存，应用在运行申请内存时不能超过最大值，小于最小值则分配最小值

``` shell
yarn.scheduler.minimum-allocation-mb 
yarn.scheduler.maximum-allocation-mb
```

单个任务可申请的最小/最大虚拟CPU个数（运行MapRedce作业时，每个Task最少可申请虚拟CPU个数，最多可申请的虚拟CPU个数）

``` shell
yarn.scheduler.minimum-allocation-vcores 
yarn.scheduler.maximum-allocation-vcores
```

### nodemanager设置：

每个节点可用的最大物理(虚拟)内存，默认是8192MB(2.1)。此数值可以用于计算container最大数目

yarn.nodemanager.resource.memory-mb
yarn.nodemanager.vmem-pmem-ratio

NodeManager总的可用CPU个数

``` shell
yarn.nodemanager.resource.cpu-vcores
```

启动一个线程检查每个任务正使用的物理(虚拟)内存量，如果任务超出分配值，则直接将其杀掉，默认是true

 yarn.nodemanager.pmem-check-enabled
 yarn.nodemanager.vmem-check-enabled

CDH Yarn资源队列划分管理

``` shell
yarn.scheduler.fair.user-as-default-queue ：参数设置为false后，没有创建资源队列的用户，提交任务时，任务最重提交到默认队列(如果勾了这个，切没有创建对应用户名的资源池，任务直接提交失败)
yarn.scheduler.fair.allow-undeclared-pools  ： 参数设置为ture后,应用程序在执行时会创建权重为1的对应用户名的资源池，这样起不到资源管控的效果，所以这里我们要设置为false
```

 Task 可使用的内存上限（单位:MB）及container的最大值，默认为 1024。如果Task 实际使用的资源量超过该值，则会被强制杀死

``` shell
mapreduce.(map)reduce.memory.mb
```

task 可用的最多 cpu core 数目, 默认值: 1

``` shell
mapreduce.map(reduce).cpu.vcores
```

java jvm 堆内存非堆内存的调整

``` shell
mapreduce.reduce.java.opts='-Xmx5120m -XX:MetaspaceSize=256m -XX:MaxMetaspaceSize=256m -verbose:gc -XX:+PrintGCDetails -XX:+PrintGCTimeStamps -Xloggc:/tmp/@taskid@.gc -XX:+HeapDumpOnOutOfMemoryError -XX:HeapDumpPath=/tmp/@taskid@.dump' 
```

这个参数是指reduce每次fetceh数据的时候，达到reduce jvm内存的百分之多少的时候，就把数据写入到磁盘；默认是0.25 可以在代码里面设置

 mapreduce.reduce.shuffle.memory.limit.percent=0.1

reduce进程启动数据copy线程(Fetcher)最大的时间段

``` shell
mapreduce.reduce.shuffle.read.timeout（default180000秒）
```

shuffile在reduce内存中的数据最多使用内存量为：JVM的heapsize的70%

``` shell
mapreduce.reduce.shuffle.input.buffer.percent（default 0.7f ）
```

内存到磁盘merge的限度阈值

``` shell
mapreduce.reduce.shuffle.merge.percent（default0.66）
```

保存map输出文件的堆内存比例

``` shell
mapreduce.reduce.input.buffer.percent
```

## 【----------------------------】

## yarn的配置参数解释

| 属性名称                                         | 默认值                | 含义                                                                                                                         |
| ------------------------------------------------ | --------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| spark.yarn.am.memory                             | 512m                  | client模式下，YARN Application Master使用的内存总量                                                                          |
| spark.yarn.am.cores                              | 1                     | client模式下，Application Master使用的cpu数量                                                                                |
| spark.driver.cores                               | 1                     | cluster模式下，driver使用的cpu core数量，driver与Application Master运行在一个进程中，所以也控制了Application Master的cpu数量 |
| spark.yarn.am.waitTime                           | 100s                  | cluster模式下，Application Master要等待SparkContext初始化的时长; client模式下，application master等待driver来连接它的时长    |
| spark.yarn.submit.file.replication               | hdfs副本数            | 作业写到hdfs上的文件的副本数量，比如工程jar，依赖jar，配置文件等，最小一定是1                                                |
| spark.yarn.preserve.staging.files                | false                 | 如果设置为true，那么在作业运行完之后，会避免工程jar等文件被删除掉                                                            |
| spark.yarn.scheduler.heartbeat.interval-ms       | 3000                  | application master向resourcemanager发送心跳的间隔，单位ms                                                                    |
| spark.yarn.scheduler.initial-allocation.interval | 200ms                 | application master在有pending住的container分配需求时，立即向resourcemanager发送心跳的间隔                                    |
| spark.yarn.max.executor.failures                 | executor数量*2，最小3 | 整个作业判定为失败之前，executor最大的失败次数                                                                               |
| spark.yarn.historyServer.address                 | 无                    | spark history server的地址                                                                                                   |
| spark.yarn.dist.archives                         | 无                    | 每个executor都要获取并放入工作目录的archive                                                                                  |
| spark.yarn.dist.files                            | 无                    | 每个executor都要放入的工作目录的文件                                                                                         |
| spark.executor.instances                         | 2                     | 默认的executor数量                                                                                                           |
| spark.yarn.executor.memoryOverhead               | executor内存10%       | 每个executor的堆外内存大小，用来存放诸如常量字符串等东西                                                                     |
| spark.yarn.driver.memoryOverhead                 | driver内存7%          | 同上                                                                                                                         |
| spark.yarn.am.memoryOverhead                     | AM内存7%              | 同上                                                                                                                         |
| spark.yarn.am.port                               | 随机                  | application master端口                                                                                                       |
| spark.yarn.jar                                   | 无                    | spark jar文件的位置                                                                                                          |
| spark.yarn.access.namenodes                      | 无                    | spark作业能访问的hdfs namenode地址                                                                                           |
| spark.yarn.containerLauncherMaxThreads           | 25                    | application master能用来启动executor container的最大线程数量                                                                 |
| spark.yarn.am.extraJavaOptions                   | 无                    | application master的jvm参数                                                                                                  |
| spark.yarn.am.extraLibraryPath                   | 无                    | application master的额外库路径                                                                                               |
| spark.yarn.maxAppAttempts                        | /                     | 提交spark作业最大的尝试次数                                                                                                  |
| spark.yarn.submit.waitAppCompletion              | true                  | cluster模式下，client是否等到作业运行完再退出                                                                                |



## 参考文章
* https://www.jianshu.com/p/35374384a1aa
* https://www.cnblogs.com/zyanrong/p/14831960.html
* https://www.cnblogs.com/mergy/p/12160643.html