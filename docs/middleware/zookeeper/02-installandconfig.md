---
title: Zookeeper-安装和配置
---

::: tip
本文主要是介绍 Zookeeper-安装和配置 。
:::

[[toc]]

## Zookeeper 2、Zookeeper的安装和配置（集群模式）

## 1、下载与解压

Zookeeper下载地址：http://www.apache.org/dyn/closer.cgi/zookeeper/

下载完成以后解压到一个特定目录

``` shell
同步时间所有节点的时间，并关闭防火墙
$ ntpdate -u ntp.sjtu.edu.cn
$ service iptables stop
```

 

## 2、Zooker配置

Zookeeper集群模式至少需要3台主机进行搭建，准备三台主机Serve1、Server2、Server3　

在Zookeeper的conf目录下创建myid文件，server1机器的内容为：1，server2机器的内容为：2，server3机器的内容为：3
在conf目录下创建一个配置文件zoo.cfg(标红的最主要)：

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)

``` shell
tickTime=2000
dataDir=/Users/zdandljb/zookeeper/data
dataLogDir=/Users/zdandljb/zookeeper/dataLog
clientPort=2181
initLimit=5
syncLimit=2
server.1=server1:2888:3888
server.2=server2:2888:3888
server.3=server3:2888:3888
```


配置完成以后把配置文件分发到其他的主机上；

参数解释:　　

- tickTime：发送心跳的间隔时间，单位：毫秒
- dataDir：zookeeper保存数据的目录。
- clientPort：客户端连接 Zookeeper 服务器的端口，Zookeeper 会监听这个端口，接受客户端的访问请求。
- initLimit： 这个配置项是用来配置 Zookeeper 接受客户端（这里所说的客户端不是用户连接 Zookeeper 服务器的客户端，

而是 Zookeeper 服务器集群中连接到 Leader 的Follower 服务器）初始化连接时最长能忍受多少个心跳时间间隔数。

当已经超过 5 个心跳的时间（也就是 tickTime）长度后 Zookeeper 服务器还没有收到客户端的返回信息，那么表明这个客户端连接失败。

总的时间长度就是 5*2000=10 秒

syncLimit：这个配置项标识 Leader 与 Follower 之间发送消息，请求和应答时间长度，最长不能超过多少个 tickTime 的时间长度，

总的时间长度就是 2*2000=4 秒

server.A=B：C：D：其 中

A 是一个数字，表示这个是第几号服务器；

B 是这个服务器的 ip地址；

C 表示的是这个服务器与集群中的 Leader 服务器交换信息的端口；

D 表示的是万一集群中的 Leader 服务器挂了，需要一个端口来重新进行选举，选出一个新的 Leader，

而这个端口就是用来执行选举时服务器相互通信的端口。如果是伪集群的配置方式，由于 B 都是一样，

所以不同的 Zookeeper 实例通信端口号不能一样，所以要给它们分配不同的端口号。

## 3、配置zookeeper的环境变量

``` shell
$ vim /root/.bash``_``profile``#``写入``PATH``=``$PATH``:``/usr/local/zookeeper-``3.4``.``6``/bin
```

## 4.启动zookeeper(所有节点都要启动)

``` shell
$ cd /usr/local/zookeeper``$ bin/zkServer.sh start``#` `显示：Starting zookeeper ... STARTED 表示启动成功
```

　　

## 参考文章
* https://www.cnblogs.com/raphael5200/p/5285380.html