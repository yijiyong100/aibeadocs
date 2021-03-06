---
title: Flume-分布式配置
---

::: tip
本文主要是介绍 Flume-分布式配置 。
:::

[[toc]]

## 一、Flume介绍

Flume是一个分布式、可靠、和高可用的海量日志聚合的系统，支持在系统中定制各类数据发送方，用于收集数据；同时，Flume提供对数据进行简单处理，并写到各种数据接受方（可定制）的能力。

## 设计目标：

### (1) 可靠性

当节点出现故障时，日志能够被传送到其他节点上而不会丢失。Flume提供了三种级别的可靠性保障，从强到弱依次分别为：end-to-end（收到数据agent首先将event写到磁盘上，当数据传送成功后，再删除；如果数据发送失败，可以重新发送。），Store on failure（这也是scribe采用的策略，当数据接收方crash时，将数据写到本地，待恢复后，继续发送），Best effort（数据发送到接收方后，不会进行确认）。

### (2) 可扩展性

Flume采用了三层架构，分别为agent，collector和storage，每一层均可以水平扩展。其中，所有agent和collector由master统一管理，这使得系统容易监控和维护，且master允许有多个（使用ZooKeeper进行管理和负载均衡），这就避免了单点故障问题。

### (3) 可管理性

所有agent和colletor由master统一管理，这使得系统便于维护。多master情况，Flume利用ZooKeeper和gossip，保证动态配置数据的一致性。用户可以在master上查看各个数据源或者数据流执行情况，且可以对各个数据源配置和动态加载。Flume提供了web 和shell script command两种形式对数据流进行管理。

### (4) 功能可扩展性

用户可以根据需要添加自己的agent，collector或者storage。此外，Flume自带了很多组件，包括各种agent（file， syslog等），collector和storage（file，HDFS等）。

 

## 二、Flume架构

flume的逻辑架构：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dc/flume/distri-1.png')" alt="wxmp">

正如前面提到的，Flume采用了分层架构：分别为agent，collector和storage。其中，agent和collector均由两部分组成：source和sink，source是数据来源，sink是数据去向。

### Flume使用两个组件：Master和Node，Node根据在Master shell或web中动态配置，决定其是作为Agent还是Collector。

### (1) agent

agent的作用是将数据源的数据发送给collector。

Flume自带了很多直接可用的数据源（source），如：

- text(“filename”)：将文件filename作为数据源，按行发送
- tail(“filename”)：探测filename新产生的数据，按行发送出去
- fsyslogTcp(5140)：监听TCP的5140端口，并且接收到的数据发送出去
- tailDir("*dirname*"[, fileregex=".*"[, startFromEnd=false[, recurseDepth=0]]])：监听目录中的文件末尾，使用正则去选定需要监听的文件（不包含目录），recurseDepth为递归监听其下子目录的深度

更多可参见这位朋友的整理：http://www.cnblogs.com/zhangmiao-chp/archive/2011/05/18/2050465.html

同时提供了很多sink，如：

- console[("format")] ：直接将将数据显示在consolr上
- text(“txtfile”)：将数据写到文件txtfile中
- dfs(“dfsfile”)：将数据写到HDFS上的dfsfile文件中
- syslogTcp(“host”,port)：将数据通过TCP传递给host节点
- agentSink[("machine"[,port])]：等价于agentE2ESink，如果省略，machine参数，默认使用flume.collector.event.host与flume.collector.event.port作为默认collecotr
- agentDFOSink[("machine" [,port])]：本地热备agent，agent发现collector节点故障后，不断检查collector的存活状态以便重新发送event，在此间产生的数据将缓存到本地磁盘中
- agentBESink[("machine"[,port])]：不负责的agent，如果collector故障，将不做任何处理，它发送的数据也将被直接丢弃
- agentE2EChain：指定多个collector提高可用性。 当向主collector发送event失效后，转向第二个collector发送，当所有的collector失败后，它会非常执着的再来一遍

更多可参见这位朋友的整理：http://www.cnblogs.com/zhangmiao-chp/archive/2011/05/18/2050472.html

### (2) collector

collector的作用是将多个agent的数据汇总后，加载到storage中。

它的source和sink与agent类似。

数据源（source），如：

- collectorSource[(*port*)]：Collector source，监听端口汇聚数据
- autoCollectorSource：通过master协调物理节点自动汇聚数据
- logicalSource：逻辑source，由master分配端口并监听rpcSink

### sink，如：

- collectorSink( "fsdir","fsfileprefix",rollmillis)：collectorSink，数据通过collector汇聚之后发送到hdfs, fsdir 是hdfs目录，fsfileprefix为文件前缀码
- customdfs("hdfspath"[, "format"])：自定义格式dfs

### (3) storage

storage是存储系统，可以是一个普通file，也可以是HDFS，HIVE，HBase，分布式存储等。

### (4) Master

Master是管理协调agent和collector的配置等信息，是flume集群的控制器。

 

在Flume中，最重要的抽象是data flow（数据流），data flow描述了数据从产生，传输、处理并最终写入目标的一条路径。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dc/flume/distri-2.png')" alt="wxmp">

1. 对于agent数据流配置就是从哪得到数据，把数据发送到哪个collector。
2. 对于collector是接收agent发过来的数据，把数据发送到指定的目标机器上。

### 注：Flume框架对hadoop和zookeeper的依赖只是在jar包上，并不要求flume启动时必须将hadoop和zookeeper服务也启动。

 

## 三、Flume分布式环境部署

### 1.实验场景

- 操作系统版本：RedHat 5.6
- Hadoop版本：0.20.2
- Jdk版本：jdk1.6.0_26
- 安装flume版本：flume-distribution-0.9.4-bin

部署flume在集群上，按照如下步骤：

1. 在集群上的每台机器上安装flume
2. 选择一个或多个节点当做master
3. 修改静态配置文件
4. 在至少一台机器上启动一个master ，所有节点启动flume node
5. 动态配置

需要在集群的每台机器上部署Flume。

### 注意：flume集群整个集群的网络环境要保证稳定，可靠，否则会出现一些莫名错误（比如：agent端发送不了数据到collector）。

### 1.Flume环境安装



``` shell
$wget http://cloud.github.com/downloads/cloudera/flume/flume-distribution-0.9.4-bin.tar.gz
$tar -xzvf flume-distribution-0.9.4-bin.tar.gz
$cp -rf flume-distribution-0.9.4-bin /usr/local/flume
$vi /etc/profile  #添加环境配置
    export FLUME_HOME=/usr/local/flume
    export PATH=.:$PATH::$FLUME_HOME/bin
$source /etc/profile

$flume #验证安装
```



 

### 2.选择一个或多个节点当做master

对于master的选择情况，可以在集群上定义一个master，也可以为了提高可用性选择多个节点做为master。

- 单点master模式：容易管理，但在系统的容错和扩展性有缺陷
- 多点master模式：通常是运行3/5个master，能很好的容错

### Flume master数量的选择原则：

   *分布式的master能够继续正常工作不会崩溃的前提是正常工作的master数量超过总master数量的一半。*

Flume master 的作用主要有两个：

- 跟踪各节点的配置情况，通知节点配置的改变；
- 跟踪来自flow的结尾操控在可靠模式下（E2E）的信息，以至于让flow的源头知道什么时候停止传输event。


### 3.修改静态配置文件

site-specific设置对于flume节点和master通过在每一个集群节点的conf/flume-site.xml是可配置的，如果这个文件不存在，设置的属性默认的在conf/flume--conf.xml中，在接下来的例子中，在flume的节点上设置master名，让节点自己去寻找叫“master”的flume Master。



``` xml
<?xml version="1.0"?>
    <?xml-stylesheet type="text/xsl"  href="configuration.xsl"?>
    <configuration>
        <property>
            <name>flume.master.servers</name>
            <value>master</value>
         </property>
    </configuration>
```



在多master的情况下需要如下配置：



``` xml
<property>
    <name>flume.master.servers</name>
   <value>hadoopmaster.com,hadoopedge.com,datanode4.com</value>
    <description>A comma-separated list of hostnames, one for each machine in the Flume Master.</description>
</property>
<property>
    <name>flume.master.store</name>
    <value>zookeeper</value>
    <description>How the Flume Master stores node configurations. Must be either 'zookeeper' or 'memory'.</description>
</property>
<property>
    <name>flume.master.serverid</name>
    <value>2</value>
    <description>The unique identifier for a machine in a Flume Master ensemble. Must be different on every master instance.</description>
</property>
```



*注意：flume.master.serverid 属性的配置主要是针对master，集群上Master节点的flume.master.serverid 必须是不能相同的，该属性的值以0开始。*

当使用agent角色时，你可以通过添加下面的配置文件在flume-conf.xml中，来设置默认的collector主机：



``` xml
<property>
    <name>flume.collector.event.host</name>
    <value>collector</value>
    <description>This is the host name of the default "remote"  collector.</description>
</property>
<property>
    <name>flume.collector.port</name>
    <value>35853</value>
    <description>This default tcp port that the collector listens to in order to receive events it is collecting.</description>
</property>
```



关于配置可参见：http://www.cnblogs.com/zhangmiao-chp/archive/2011/05/18/2050443.html。

 

### 4.启动集群

集群上节点启动：

1. 在命令行输入：flume master 启动master节点
2. 在命令行输入：flume node –n nodeName 启动其他节点，nodeName最好根据集群逻辑的划分来取名子，这样在 master进行配置的时候比较清晰。

名字规则自己定义，方便记忆和动态配置即可（后续会有介绍动态配置）

 

###  5.基于flume shell的动态配置

关于flume shell 中的command参见：http://www.cnblogs.com/zhangmiao-chp/archive/2011/05/18/2050461.html

假设我们目前部署的Flume集群结构如下：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dc/flume/distri-3.png')" alt="wxmp">

我们想将A-F所在的机器的系统日志收集到HDFS中，怎么样在flume shell中配置达到我们的目的呢？

### 1. 设置逻辑节点（logical node）



``` shell
$flume shell
>connect localhost
>help
>exec map 192.168.0.1 agentA
>exec map 192.168.0.2 agentB
>exec map 192.168.0.3 agentC
>exec map 192.168.0.4 agentD
>exec map 192.168.0.5 agentE
>exec map 192.168.0.6 agentF
>getnodestatus
        192.168.0.1 --> IDLE
        192.168.0.2 --> IDLE
        192.168.0.3 --> IDLE
        192.168.0.4 --> IDLE
        192.168.0.5 --> IDLE
        192.168.0.6 --> IDLE
        agentA --> IDLE
        agentB --> IDLE
        agentC --> IDLE
        agentD --> IDLE
        agentE --> IDLE
        agentF --> IDLE
>exec map 192.168.0.11 collector
```



这里你也可以打开web master界面查看。

### 2.启动Collector的监听端口

``` shell
>exec config collector 'collectorSource(35853)' 'collectorSink("","")'#collector节点监听35853端口过来的数据，这一部非常重要
```

登陆到collector服务器进行端口检测

``` shell
$netstat -nalp|grep 35853 
```

如果在master中未进行上述配置，在collector上检测不到此打开端口

### 3.设置各节点的source和sink

``` xml
>exec config collector 'collectorSource(35853)' 'collectorSink("hdfs://namenode/flume/","syslog")' 
>exec config agentA 'tail("/tmp/log/message")' 'agentBESink("192.168.0.11")' #经过实验，好像一个逻辑节点，最多只能有一个source和sink.>...>exec config agentF 'tail("/tmp/log/message")' 'agentBESink("192.168.0.11")'
```

这时的配置情况可从master web中一目了然，此时已经可以达到我们最初的目的了。

以上通过flume shell进行的动态配置，在flume master web中都可以进行，在此不做进一步说明。

 

##  四、高级动态配置

高级配置其实就是在上述简单配置中增加了以下几个特性来保证系统更好的运行：

- 多Master(Master节点的高可用)
- Collector Chain（Collector的高可用）

多Master的情况在上面已经有过介绍，包括用途和master个数等。下面来简单看一下Collector Chain，其实也很简单，就是在动态配置时，使用agent*Chain来指定多个Collector来保证其日志传输的可用性。看一下一般正式环境中flume的逻辑图：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dc/flume/distri-4.png')" alt="wxmp">

这里agentA和agentB指向collectorA，如果CollectorA crach了，根据配置的可靠性级别agent会有相应的动作，我们很可能为了保障高效传输而没有选择E2E（即使是这种方式，Agent本地日志累积过多依然是一个问题），一般会配置多个Collector，形成collector chain。

``` xml
>exec config agentC 'tail("/tmp/log/message")' 'agentE2EChain("collectorB:35853","collectorA:35853")'
>exec config agentD 'tail("/tmp/log/message")' 'agentE2EChain("collectorB:35853","collectorC:35853")'
```

这样collectorB在出问题时：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dc/flume/distri-5.png')" alt="wxmp">

 

## 五、问题和总结

上述节点有如下几类：master、agent、collector、storage，针对每类节点我们看一下高可用和有没有可能引起性能瓶颈问题。

首先，storage层的失败和collector层的失败是一样的，只要数据放不到最终的位置，就认为节点是失败的。我们一定会根据收集数据的可靠性设定合适的传输模式，而且会根据我们的配置，自己控制collector接收数据的情况，collector的性能影响的是整个flume集群的数据吞吐量，所以collector最好单独部署，所以一般不用考虑高可用问题。

然后，agent层的失败，Flume数据安全级别的配置主要Agent的配置上，Agent提供三种级别发送数据到collector：E2E、DFO、BF，在些不赘述。看一下一位大牛的总结：

```xml
agent节点监控日志文件夹下的所有文件，每一个agent最多监听1024个文件，每一个文件在agent的都会有一个类似游标的东西，记录监听文件读取的位置，这样每次文件有新的记录产生，那么游标就会读取增量记录，根据agent配置发送到collector的安全层级属性有E2E,DFO。如果是E2E的情况那么agent节点会首先把文件写入到agent节点的文件夹下，然后发送给collector，如果最终数据最终成功存储到storage层，那么agent删除之前写入的文件，如果没有收到成功的信息，那么就保留信息。

如果agent节点出现问题，那么相当于所有的记录信息都消失了，如果直接重新启动，agent会认为日志文件夹下的所有文件都是没有监听过的，没有文件记录的标示，所以会重新读取文件，这样，日志就会有重复，具体恢复办法如下

      将agent节点上监听的日志文件夹下已经发送的日志文件移出，处理完，故障重新启动agent即可。
注：在agent节点失败的情况下，按照失败的时间点，将时间点之前的数据文件移出，将flume.agent.logdir配置的文件夹清空，重新启动agent。
```

最后，master失败，master宕机，整个集群将不能工作，在重新启动集群，将agent监听的日志文件夹下的所有文件移出，然后重新启动master即可。在多master节点情况下，只要集群上正常工作的master大于总master数量的一半，集群就能正常工作，那么只要恢复其中宕机的master即可。

 

### 问题总结：



``` xml
1.Flume在agent端采集数据的时候默认会在/tmp/flume-{user}下生成临时的目录用于存放agent自己截取的日志文件，如果文件过大导致磁盘写满那么agent端会报出
   Error closing logicalNode a2-18 sink: No space left on device，所以在配置agent端的时候需要注意
  <property>
    <name>flume.agent.logdir</name>
    <value>/data/tmp/flume-${user.name}/agent</value>
  </property>
属性，只要保证flume在7*24小时运行过程agent端不会使该路径flume.agent.logdir磁盘写满即可。
```



``` xml
2. Flume在启动时候会去寻找hadoop-core-*.jar的文件，需要修改标准版的hadoop核心jar包的名字 将hadoop-*-core.jar改成hadoop-core-*.jar。

3.Flume集群中的flume必须版本一致。否则会出现莫名其妙的错误。

4.Flume集群收集的日志发送到hdfs上建立文件夹的时间依据是根据event的时间，在源代码上是Clock.unixTime()，所以如果想要根据日志生成的时间来生成文件的话，需要对
com.cloudera.flume.core.EventImpl 类的构造函数
public EventImpl(byte[] s, long timestamp, Priority pri, long nanoTime,
      String host, Map<String, byte[]> fields)重新写，解析数组s的内容取出时间，赋给timestamp。注意：flume的框架会构造s内容是空的数组，用来发送类似简单验证的event，所以需要注意s内容为空的时候timestamp的问题。

5.如果collector和agent不在一个网段的话会发生闪断的现象，这样的话，就会造成agent端不能传送数据个collector所以，在部署agent和collector最好在一个网段。

6.如果在启动master时出现：“试着启动hostname，但是hostname不在master列表里的错误“，这是需要检查是否主机地址和hostname配置的正确与否。

7.在源端，有一个比较大的缺陷，在tail类的source，不支持，断点续传功能。因为重启node后没有记录上次文件读到的位置，从而没办法知道，下次再读时，从什么地方开始读。

特别是在日志文件一直在增加的时候。flume的source node挂了。等flume的source再次开启的这段时间内，增加的日志内容，就没办法被source读取到了。

不过flume有一个execStream的扩展，可以自己写一个监控日志增加情况，把增加的日志，通过自己写的工具把增加的内容，传送给flume的node。再传送给sink的node。

```

 

以前文章中介绍过Scribe方案，给我的最直观感受就是：

- scribe安装复杂，配置简单
- flume安装简单，动态配置复杂

下面董的博客中的一副对比图：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dc/flume/distri-6.png')" alt="wxmp">



## 参考文章
* https://www.cnblogs.com/oubo/archive/2012/05/25/2517751.html