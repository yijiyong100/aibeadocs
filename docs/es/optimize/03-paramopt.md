---
title: ES优化-参数优化
---

::: tip
本文主要是介绍 ES优化-参数优化 。
:::

[[toc]]

## ES优化-参数优化

### ELK优化之参数调优

2018.12.19-2018.12.21 elk优化

### 问题描述：

近期fat环境kafka日志堆积到4百万，因此优化ELK

### 配置调优：(效果略微提升)

``` shell
1. 修改es默认分片数
    每个分片本质上就是一个Lucene索引, 因此会消耗相应的文件句柄, 内存和CPU资源
    每个搜索请求会调度到索引的每个分片中. 如果分片分散在不同的节点倒是问题不太. 但当分片开始竞争相同的硬件资源时, 性能便会逐步下降
    es默认分片数为5，鉴于当前机器紧张，将默认分片数调至2
        "number_of_shards": 2

2. 刷新频率调优：
    默认情况下索引的refresh_interval为1秒,这意味着数据写1秒后就可以被搜索到,每次索引的 refresh 会产生一个新的 lucene 段,
    这会导致频繁的 segment merge 行为,占用磁盘io，如果你不需要这么高的搜索实时性,应该降低索引refresh 周期
        "refresh_interval" : 30

3. 默认副本数
    副本数默认为1，暂未修改，副本用来提高查询速度，数据恢复
    分片及副本的分配将是高可用及快速搜索响应的设计核心.主分片与副本都能处理查询请求, 它们的唯一区别在于只有主分片才能处理索引请求.
        "number_of_replicas": 1,
```

### logstash优化：(效果不明显)

``` shell
1. 调整工作线程数
    logstash正则解析极其消耗计算资源，而我们的业务要求大量的正则解析，因此filter是我们的瓶颈。
    一般pipeline.workers的数量要大于Cpu的核心数，因为output的io等待会消耗大量的空闲时间
    官方建议线程数设置大于核数，因为存在I/O等待。我们的机器为4核， io压力较大，此处设置为6
        pipeline.output.workers: 6 # 默认为CPU核心数
2. 调整调用es api传输量
    batch_size 参数决定 logstash 每次调用ES bulk index API时传输的数据量
        pipeline.batch.size: 1000 # 默认为125
3. 调整Logstash管道的延迟
    批处理的最大等待值（input需要按照batch处理的最大值发送到消息队列，但是不能一直等，所以需要一个最大的超时机制
        pipeline.batch.delay: 10 # 默认为5
```

### 调用es的api修改优化参数：

使用kibana dev工具调用es接口，修改默认索引模板

``` shell
PUT /_template/log
{
"template": "tarsclient-*",
"settings": {
        "number_of_shards": 2,
        "number_of_replicas": 1,
        "refresh_interval" : "30s"
        }
}
```

### 用法扩展：

``` shell
1. 如何修改现有的副本数为0
       curl -XPUT http://192.168.x.x:9200/_settings -d '
        {
        "index": { "number_of_replicas":0 }
        }'

2. es 2.x版本可以在es配置文件中设置索引属性
        index.number_of_shards: 2
        index.number_of_replicas: 1
        index.refresh_interval : 30s
```



## 参考文章
* https://www.kkwen.cn/index.php/archives/22/