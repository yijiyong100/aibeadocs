---
title: Kafka-数据采集简单案例
---

::: tip
本文主要是介绍 Kafka-数据采集简单案例 。
:::

[[toc]]


## 整合Flume与Kafka完成实时数据采集


## 1.架构

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dc/kafka/intro-1.png')" alt="wxmp">

## 2.Flume

第一个Agent配置 -> exec-memory-avro.conf：

```ini
exec-memory-avro.sources = exec-source
exec-memory-avro.sinks = avro-sink
exec-memory-avro.channels = memory-channel
 
exec-memory-avro.sources.exec-source.type = exec
exec-memory-avro.sources.exec-source.command = tail -F /home/hadoop/data/data.log
exec-memory-avro.sources.exec-source.shell = /bin/sh -c
 
exec-memory-avro.sinks.avro-sink.type = avro
exec-memory-avro.sinks.avro-sink.hostname = hadoop000
exec-memory-avro.sinks.avro-sink.port = 44444
 
exec-memory-avro.channels.memory-channel.type = memory
 
exec-memory-avro.sources.exec-source.channels = memory-channel
exec-memory-avro.sinks.avro-sink.channel = memory-channel
```

第二个Agent配置 -> avro-memory-kafka.conf：

```ini
avro-memory-kafka.sources = avro-source
avro-memory-kafka.sinks = kafka-sink
avro-memory-kafka.channels = memory-channel
 
avro-memory-kafka.sources.avro-source.type = avro
avro-memory-kafka.sources.avro-source.bind = hadoop000
avro-memory-kafka.sources.avro-source.port = 44444
 
avro-memory-kafka.sinks.kafka-sink.type = org.apache.flume.sink.kafka.KafkaSink
avro-memory-kafka.sinks.kafka-sink.brokerList = hadoop000:9092
avro-memory-kafka.sinks.kafka-sink.topic = hello_topic
avro-memory-kafka.sinks.kafka-sink.batchSize = 5
avro-memory-kafka.sinks.kafka-sink.requiredAcks =1 
 
avro-memory-kafka.channels.memory-channel.type = memory
 
avro-memory-kafka.sources.avro-source.channels = memory-channel
avro-memory-kafka.sinks.kafka-sink.channel = memory-channel
```

# 3.启动

Zookeeper：

``` shell
zkServer.sh start
```

Kafka：

``` shell
kafka-server-start.sh /home/hadoop/app/kafka_2.11-0.9.0.0/config/server.properties 
```

Flume-Agent2：

``` shell
flume-ng agent \
--name avro-memory-kafka \
--conf $FLUME_HOME/conf \
--conf-file $FLUME_HOME/conf/avro-memory-kafka.conf \
-Dflume.root.logger=INFO,console
```

Flume-Agent1：

``` shell
flume-ng agent \
--name exec-memory-avro \
--conf $FLUME_HOME/conf \
--conf-file $FLUME_HOME/conf/exec-memory-avro.conf \
-Dflume.root.logger=INFO,console
```

检查一下：

``` shell
[hadoop@hadoop000 ~]$ jps -m
18371 Application --name exec-memory-avro --conf-file /home/hadoop/app/apache-flume-1.6.0-cdh5.7.0-bin/conf/exec-memory-avro.conf
17546 Application --name avro-memory-kafka --conf-file /home/hadoop/app/apache-flume-1.6.0-cdh5.7.0-bin/conf/avro-memory-kafka.conf
16619 Kafka /home/hadoop/app/kafka_2.11-0.9.0.0/config/server.properties
16317 QuorumPeerMain /home/hadoop/app/zookeeper-3.4.5-cdh5.7.0/bin/../conf/zoo.cfg
19198 Jps -m
```

启动Kafka Consumer：

``` shell
kafka-console-consumer.sh --zookeeper hadoop000:2181 --topic hello_topic
```

测试：

``` shell
echo Its a test >> data.log
```

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dc/kafka/intro-2.png')" alt="wxmp">


## 参考文章
* https://blog.csdn.net/qq_36329973/article/details/104629923