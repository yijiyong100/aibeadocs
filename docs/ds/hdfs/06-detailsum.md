---
title: HDFS-精华知识总结
---

::: tip
本文主要是介绍 HDFS-精华知识总结 。
:::

[[toc]]

## HDFS详细介绍

> 之前有人问我，"我放了一个***.avi在linux服务器上，你肯定找不到嘻嘻"。登上去发现etc文件夹大了好几个G。。。。

你4不4撒，你为什么不把avi切成多块，放到不同服务器上，这谁能发现呢？？


## 1. HDFS前言

上面开个玩笑，hdfs实际上不是让我们当作网盘来使用的。


● 设计思想

  ○ 分而治之:将大文件、大批量文件，分布式存放在大量服务器上，以便于采取分而治之的方式对海量数据进行运算分析。


● 在大数据系统中作用:

  ○ 为各类分布式运算框架(如:mapreduce,spark,tez,....)提供数据存储服务

● 重点概念:文件切块，副本存放，元数据

## 2.HDFS的概念和特性

首先，它是一个文件系统，用于存储文件，通过统一的命名空间--目录树来定位文件
其次，它是分布式的，由很多服务器联合起来实现其功能，集群中的服务器有各自的角色；

### 重要特性如下:

- 1. HDFS中的文件在物理上是分块存储(block)，块的大小可以通过配置参数(dfs.blocksize)来规定，默认大小在hadoop2.x版本中是128M，老版本中是64M
- 2. HDFS文件系统会给客户端提供一个统一的抽象目录树，客户端通过路径来访问文件，形如:hdfs://namenode:port/dir-a/dir-b/file.data
- 3. 目录结构及文件分块信息(元数据)的管理由namenode节点承担-------namenode是HDFS集群主节点，负责维护整个hdfs文件系统的目录树，以及每一个路径(文件)所对应的block块信息(block的id。及所在的datanode服务器)
- 4. 文件的各个block的存储管理由datanode节点承担-----------namenode是HDFS集群从节点，每一个block都可以在多个dataname上存储多个副本(副本数量也可以通过参数设置dfs.replication)

- 5.HDFS是设计成适应一次写入，多次读出的场景，且不支持文件的修改
（注：适合用来做数据分析，并不适合用来做网盘应用，因为，不便修改，延迟大，网络开销大，成本太高）

## 3.HDFS的shell(命令行客户端)操作

> 对于HDFS的shell操作可以说懂linux基本操作的都能玩两下，无非是在前面加上(hadoop fs -)，后面加上操作的文件或目录

### 3.1命令行客户端支持的命令参数
``` shell

- help

功能:输出这个命令参数手册

- ls

功能:显示目录信息
示例: hadoop fs -ls hdfs://hadoop-server01:9000/
备注:这些参数中，所有的hdfs路径都可以简写
-->hadoop fs -ls / 等同于上一条命令的效果

- moveFromLocal

功能:从本地剪切到hdfs

示例: hadoop fs -moveFromLocal /home/hadoop/a.txt /aaa/bbb/cc/dd

- moveToLocal

功能:从hdfs剪切粘贴到本地

示例:hadoop fs -moveToLocal /aaa/bbb/ccc/dd/b.txt /home/hadoop/a.txt

- appendToFile

功能:追加一个文件到已经存在的文件末尾

示例: hadoop fs -appendToFile ./hello.txt /hello.txt

- cat

功能:显示文件内容
示例:hadoop fs -cat /hello.txt

- tail

功能:显示一个文件的末尾
示例:hadoop fs -tail /weblog/access_log.1

- text

功能:以字符形式打印一个文件的内容
示例:hadoop fs -text /weblog/access_log.1

- chgrp
- chmod
- chown

功能:linux文件系统中的用法一样，操作文件的所属权限
示例:hadoop fs -chmod 666 /hello.txt
hadoop fs -chown someuser:somegrp /hello.txt

- copyFromLocal

功能:从本地复制文件到hdfs路径去
示例:hadoop fs -copyFromLocal ./jdk.tar.gz /aaa/

- copyToLocal

功能:从hdfs拷贝到本地
示例: hadoop fs -coptToLocal /aaa/jdk.tar.gz

- cp

功能:从hdfs的一个路径拷贝hdfs的另一个路径
示例:hadoop fs -cp /aaa/jdk.tar.gz /bbb/jdk.tar.gz.2

- mv

功能:在hdfs目录中移动文件
示例:hadoop fs -mv /aaa/jdk.tar.gz /

- get

功能:等同于copyToLocal，就是从hdfs下载文件到本地
示例:hadoop fs -get /aaa/jdk.tar.gz

- getmerge

功能:合并下载多个文件
示例:比如hdfs的目录/aaa/下有多个文件:log.1,log.2,log.3,....

hadoop fs -getmerge /aaa/log.* ./log.sum

- put

功能:等同于copyFromLocal
示例:hadoop fs -put /aaa/jdk.tar.gz /bbb/jdk.tar.gz.2

- rm

功能:删除文件或文件夹
示例:hadoop fs -rm -r /aaa/bbb/

- rmdir

功能:删除空目录
示例:hadoop fs -rmdir /aaa/bbb/ccc

- df

功能:统计文件系统的可用空间信息
示例:hadoop fs -df -h /

- du

功能:统计文件夹的大小信息
示例:hadoop fs -du -s -h /aaa/*

- count

功能:统计一个指定目录下的文件节点数量
示例:hadoop fs -count /aaa/

- setrep

功能:设置hdfs中文件的副本数量
示例:hadoop fs -setrep 3 /aaa/jdk.tar.gz
<这里设置的副本数只是记录在namenode的元数据中，是否真的会有这么多副本，还得看datanode的数量>

- 查看hdfs状态

hdfs dfsadmin -report

```

## HDFS原理篇

## 4.hdfs的工作机制

> (工作机制的学习主要是为加深对分布式系统的理解，以及增强遇到各种问题时的分析解决能力，形成一定的集群运维能力)
> 注:很多不是真正理解hadoop技术体系的人会常常觉得HDFS可用于网盘类应用，但实际并非如此。要想将技术准确用在恰当的地方，必须对技术有深刻的理解。

### 4.1概述

- 1. HDFS集群分为两大角色:NameNode、DataNode
- 2. NameNode负责管理整个文件系统的元数据
- 3. DataNode负责管理用户的文件数据块
- 4. 文件会按照固定的大小(blocksize)切成若干块后分布式存储在若干台datanode上
- 5. 每一个文件块可以有多个副本，并存放在不同的datanode上
- 6. DataNode会==定期==向NameNode汇报自身所保存的文件block信息，而namenode则会负责保持文件的副本数量
- 7. HDFS的内部工作机制对客户端保持透明，==客户端请求访问HDFS都是通过向namenode申请来进行==

### 4.2 HDFS写数据流程

4.2.1客户端要向HDFS写数据，首先要跟namenode通信以确认可以写文件并获得接收文件block的datanode，然后客户端按顺序将文件逐个block传递给相应datanode，==并由接收到block的datanode负责向其他datanode复制block的副本。==

这里说明文件的切割是在客户端实现的，而不是NameNode。文件的传输也是由客户端传到指定datanode上，副本由datanode传给其他datanode。

### 4.2.3详细步骤(重要)

- 1. 跟namenode通信请求上传文件，==namenode检查目前文件是否已存在，父目录是否存在==
- 2. namenode返回是否可以上传
- 3. client请求第一个block该传输到哪些datanode服务器上(副本)
- 4. namenode返回3个datanode服务器ABC(假如副 本数为3。优先找同机架的，其次不同机架，再其次是同机架的再一台机器。还会根据服务器的容量，)
- 5. client请求3台datanode中的一台A上传数据==(本质上是一个RPC调用，建立pipeline)==，A收到请求会继续调用B，然后B调用C，将整个pipeline建立完成，逐级返回客户端
- 6. client开始往A上传第一个block(先从磁盘读取数据放到一个本地内存缓存)，以packet为单位，A收到一个packet就会传给B，B传给C；A每传一个packet会放入一个应答队列等待应答。
- 7. 当一个block传输完成之后，client再次请求namenode上传第二个block的服务器。

## 4.3. HDFS读数据流程

### 4.3.1概述

客户端将要读取的文件路径发给namenode，namenode获取文件的元信息(主要是block的存放位置信息)返回给客户端，客户端根据返回的信息找到相应datanode逐个获取文件的block并在==客户端进行数据追加合并从而获得整个文件。==

### 4.3.2详细步骤解析

- 1. 跟namenode通信查询元数据，找到文件块所在的datanoede服务器
- 2. 挑选一台datanode(就近原则，然后随机)服务器，请求建立socket流
- 3. datanode开始发送数据(从磁盘里面读取数据放入流，以packet为单位来做校验)
- 4. 客户端以packet为单位接收，先在本地缓存，然后写入目标文件

## 5. NAMENODE工作机制

学习目标:理解namenode的工作机制尤其是元数据管理机制，以增强对HDFS工作原理的理解，及培养hadoop集群运营中"性能调优"、"namenode"故障问题的分析解决能力

### 问题场景:

- 1. 集群启动后，可以查看文件，但是上传文件时报错，打开web可看到namenode正处于safemode状态，怎么处理?
- 2. Namenode服务器的磁盘故障导致namenode宕机，如何挽救集群及数据？
- 3. Namenode是否可以有多个？namenode内存要配置多大？namenode跟集群数据存储能力有关系吗？
- 4. 文件的blocksize究竟调大好还是调小好？

。。。。。。。
诸如此类问题的回答，都需要基于对namenode自身的工作原理的深刻理解。

### 5.1 NAMENODE职责

NAMENODE职责:

- 负责客户端请求的响应
- 元数据的管理(查询、修改)


### 5.2 元数据管理


namenode对数据的管理采用了三种存储形式:
- 内存元数据(NameSystem)
- 磁盘元数据镜像文件(fsimage)
- 数据操作日志文件(edits.xml)可通过日志运算出元数据


#### 5.2.1元数据存储机制(重要)

```gcode
A、内存中有一份完整的元数据(内存meta data)
B、磁盘有一个"准完整"的元数据镜像(fsimage)文件(在namenode的工作目录中)
C、用于衔接内存metadata和持久化元数据镜像fsimage之间的操作日志(edits文件)
```

==注:当客户端对hdfs中的文件进行新增或者修改操作，操作记录首先被记入edits日志文件中，当客户端操作完成后，相应的元数据会更新到内存meta.data中。==

#### 5.2.2 元数据手动查看

可通过hdfs的一个工具来查看edits中的信息
``` shell
hdfs oev -i edits -o edits.xml
hdfs oiv -i fsimage_0000000087 -p XML -o fsimage.xml
```

> inputfile: 要查看的fsimage文件
>
> ```dts
>    outputfile: 用于保存格式化之后的文件
>    process: 使用什么进程解码，XML|Web|...
> ```

#### 5.2.3 元数据的checkpoint

每隔一段时间(30分钟)，会由secondary namenode将namenode上积累的所有edits(edits文件会立即滚动一次，以便checkpoint的是最新的操作)和一个最新的fsimage下载到本地(一般只在第一次checkpoint时下载，后面checkpont，secondary namenode中已经有最新的fsimage)，并加载到内存进行merge，然后dump成新的image文件，上传给namenode，然后在namenode重命名为fsimage(这个过程称为checkpoint)

#### 详细过程:

checkpoint操作的触发条件配置参数

```ini
dfs.namenode.checkpoint.check.period=60 #每60秒检查，是否需要checkpoint
dfs.namenode.checkpoint.dir=file://${hadoop.tmp.dir}/dfs/namesecondary
#以上两个参数做checkpoint操作时，secondary namenode的本地工作目录
dfs.namenode.checkpoint.edits.dir=${dfs.namenode.checkpoint.dir}

dfs.namenode.checkpoint.max-retries=3 #最大重试次数
dfs.namenode.checkpoint.period=3600 #两次checkpoint之间的时间间隔3600秒
dfs.namenode.checkpoint.txns=1000000 #两次checkpoint之间最大的操作记录
```

##### checkpoint的附带作用

namenode和secondary namenode的工作目录存储结构完全相同，所以，==当namenode故障退出需要重新恢复时，可以从secondary namenode的工作目录将fsimage拷贝到namenode的工作目录，以恢复namenode的元数据(namenode启动时会加载fsimage)。==

#### 5.2.4 元数据目录说明

```shell
在第一次部署好Hadoop集群的时候，我们需要在NameNode(NN)节点上格式化磁盘:
==hdfs namenode -format==
格式化完成之后，将会在$dfs.name.dir/current目录下如下的文件结构
    current/
    |-- VERSION
    |-- edits_*
    |-- fsimage_00000000008547077
    |-- fsimage_00000000008547077.md5
    | -- seen_txid
```

其中的dfs.namenode.dir是在hdfs-site.xml文件中配置的，默认值如下:

```xml
<property>
    <name>dfs.name.dir</name>
    <value>file://${hadoop.tmp.dir}/dfs/name</value>
</property>
```

hadoop.tmp.dir是在core-site.xml中配置的，默认值如下

```xml
<property> 
<name>hadoop.tmp.dir</name> 
<value>/tmp/hadoop-${user.name}</value> 
<description>A base for other temporary directories.</description>
</property>
```

> dfs.namenode.name.dir属性可以配置多个目录，如/data1/dfs/name,/data2/dfs/name,/data3/dfs/name,....。各个目录存储的文件结构和内容都完全一样，相当于备份，这样做的好处是当其中一个目录损坏了，也不会影响到Hadoop的元数据，特别是当其中一个目录是NFS(网络文件系统 Network File System,NFS) 之上，即时你这台机器损坏了，元数据也得到保存。

#### 下面对$dfs.namenode.name.dir/current/目录下的文件进行解释。

```shell
1、VERSION文件是Java属性文件，内容大致如下:
#Fri Nov 15 19:47:46 CST 2013namespaceID=934548976clusterID=CID-cdff7d73-93cd-4783-9399-0a22e6dce196cTime=0storageType=NAME_NODEblockpoolID=BP-893790215-192.168.24.72-1383809616115layoutVersion=-47
```

其中

```shell
(1)、namespaceID是文件系统的唯一标识符，==在文件系统首次格式化之后生成的；==

(2)、storageType说明这个文件存储的是什么进程的数据结构信息(如果是DataNode，storageType=DATA_NODE)；

(3)、cTime表示NameNode存储的创建时间，由于我的NameNode没有更新过，所以这里的记录值为0，以后对NameNode升级之后，cTime将会记录更新时间戳；

(4)、layoutVersion表示HDFS永久性数据结构的版本信息，只要数据结构变更，版本号也要递减，此时的HDFS也需要升级，否则磁盘仍旧是使用旧版本的数据结构，这会导致新版本的NameNode无法使用

(5)、clusterID是系统生成或手动指定的集群ID，在-clusterid选项中可以使用它:如下说明
   
 a、使用如下命令格式化一个Namenode:
        $HADOOP_HOME/bin/hdfs namenode -format [-clusterid <cluster_id>]
        
        选择一个唯一的cluster_id，并且这个cluster_id不能与环境中其他集群有冲突。如果没有提供cluster_id，则会自动生成一个唯一的ClusterID。

        b、使用如下命令格式化其他Namenode：

        $HADOOP_HOME/bin/hdfs -format -clusterId <cluster_id>

        c、升级集群至最新版本。在升级过程中需要提供一个ClusterID，例如:

        $HADOOP_PREFIX_HOME/bin/hdfs start namenode --config $HADOOP_CONF_DIR -upgrade -clusterId <cluster_ID>
        如果没有提供ClusterID，则会自动生成一个ClusterID。

(6)、blockpoolID:是针对每一个Namespace所对应的blockpool的ID，上面的这个BP-893790215-192.168.24.72-1383809616115就是在我的server1的namespace下的存储块池的ID，==这个ID包括了其对应的NameNode节点的ip地址。==
```

2、$dfs.namenode.name.dir/current/seen_txid非常重要，是存放transactionId的文件，format之后是0，==它代表的是namenode里面的edits_*文件的尾数==，==namenode重启的时候，会按照seen_txid的数字，循序从头跑edits_00000001~到seen_txid的数字。所以当你的hdfs发生异常重启的时候，一定要比对seen_txid内的数字是不是你edits最后的尾数，不然会发生建立namenode时metaData的资料有缺少，导致误删Datanode上多余Block的资讯。==

3、$dfs.namenode.name.dir/current目录下在format的同时也会生成fsimage和edits文件，及其对应的md5校验文件。

补充:seen_txid
文件中记录的是edits滚动的序号，每次重启namenode时，namenode就知道要将哪些edits进行加载。

## 6、DATANODE的工作机制

问题场景:
- 1、集群容量不够，怎么扩容？
- 2、如果有一些datanode宕机，该怎么办？
- 3、datanode明明已启动，但是集群中的可用datanode列表中就是没有，怎么办？

以上这类问题的解答，有赖于对datanode工作机制的深刻理解。

### 6.1 概述

#### 1、Datanode工作职责:

```xml
存储管理用户的文件块数据

定期向namenode汇报自身所持有的block信息(通过心跳信息上报)

(这点很重要，因为当集群发生某些block副本失效时，集群如何恢复block初始副本数量的问题)

<property>
    <name>dfs.blockreport.intervalMsec</name>
    <value>3600000</value>
    <description>Determines blockreporting interval in milliseconds.</description>
</property>
```

#### 2、Datanode掉线判断时限参数

```xml

datanode进程死亡或者网络故障造成datanode无法与namenode通信，==namenode不会立即把该节点判定为死亡，要经过一段时间，这段时间暂称作超时时长。HDFS默认的超时时长为10分钟+30秒==。如果定义超时时间为timeout，则超时时长的计算公式为:

==timeout  = 2 * heartbeat.recheck.interval + 10 * dfs.heartbeat.interval。==

而默认的heartbeat.recheck.interval大小为5分钟，dfs.heartbeat.interval默认为3秒总共为10分钟+30秒

需要注意的是hdfs-site.xml配置文件的heart.recheck.interval的单位为毫秒，dfs.heartbeat.interval的单位为秒。所以举个例子，如果heartbeat.recheck.interval设置为5000(毫秒)，dfs.heartbeat.interval设置为3(秒，默认)，则总的超时时间为40秒。
    $hadoop.temp.dir/dfs/data/current/BP-193442119-192.168.2.120-1432457733977/current/finalized

    <property>
        <name>heartbeat.recheck.interval</name>
        <value>5000</value>
    </property>
    <property>
        <name>dfs.heartbeat.interval</name>
        <value>3</value>
    </property>
```

#### 6.2 观察验证DATANODE功能

上传一个文件，观察文件的block具体的物理存放情况:
在每一台datanode机器上的这个目录能找到文件的切块:


## 7.javaAPI操作HDFS


hdfs在生产应用中主要是客户端的开发，==其核心步骤是从hdfs提供的api中构造一个HDFS的访问客户对象，然后通过该客户端对象操作(增删改查)HDFS上的文件==

## 7.1、环境准备

### 1、导入依赖

```xml
<dependency>
    <groupId>org.apache.hadoop</groupId>
    <artifactId>hadoop-client</artifactId>
    <version>2.6.1</version>
    </dependency>
```

### 7.2、创建配置实例

> 在java中操作hdfs，首先要获得一个客户端实例

```java
Configuration conf = new Configuration();
 FileSystem fs = FileSystem.get(conf);
```

==而我们的操作目标是HDFS，所以获取到的fs对象应该是DistributedFileSystem的实例；==

``` shell
get方法是从何处判断具体实例化哪种客户端类呢？
--------从conf中的一个参数fs.defaultFS的配置值判断;
```

如果我们的代码中没有指定fs.defaultFS，并且工程classpath下也没有给定相应的配置，conf中的默认值就来自于hadoop的jar包中的core-default.xml，==默认值为: file:///，则获取的将不是一个DistributedFileSystem的实例，而是一个本地文件系统的客户端对象。==

### 7.3 HDFS客户端操作数据代码示例:

#### 7.3.1文件的增删改查

```java
public class HdfsClient {
FileSystem fs = null;
@Before
public void init() throws Exception {
// 构造一个配置参数对象，设置一个参数：我们要访问的hdfs的URI
// 从而FileSystem.get()方法就知道应该是去构造一个访问hdfs文件系统的客户端，以及hdfs的访问地址
// new Configuration();的时候，它就会去加载jar包中的hdfs-default.xml
// 然后再加载classpath下的hdfs-site.xml
Configuration conf = new Configuration();
conf.set("fs.defaultFS", "hdfs://hdp-node01:9000");
/**
* 参数优先级： 1、客户端代码中设置的值 2、classpath下的用户自定义配置文件 3、然后是服务器的默认配置
*/
conf.set("dfs.replication", "3");
// 获取一个hdfs的访问客户端，根据参数，这个实例应该是DistributedFileSystem的实例
// fs = FileSystem.get(conf);
// 如果这样去获取，那conf里面就可以不要配"fs.defaultFS"参数，而且，这个客户端的身份标识已经是hadoop用户
fs = FileSystem.get(new URI("hdfs://server1:9000"), conf, "hadoop");
}
/**
* 往hdfs上传文件
*
* @throws Exception
*/
@Test
public void testAddFileToHdfs() throws Exception {
// 要上传的文件所在的本地路径
Path src = new Path("/home/redis-recommend.zip");
// 要上传到hdfs的目标路径
Path dst = new Path("/aaa");
fs.copyFromLocalFile(src, dst);
fs.close();
    
}
/**
* 从hdfs中复制文件到本地文件系统
*
* @throws IOException
* @throws IllegalArgumentException
*/
@Test
public void testDownloadFileToLocal() throws IllegalArgumentException, IOException {
fs.copyToLocalFile(new Path("/jdk8.tar.gz"), new Path("/home"));
fs.close();
    
}
@Test
public void testMkdirAndDeleteAndRename() throws IllegalArgumentException, IOException {
// 创建目录
fs.mkdirs(new Path("/a1/b1/c1"));
// 删除文件夹 ，如果是非空文件夹，参数2必须给值true
fs.delete(new Path("/aaa"), true);
// 重命名文件或文件夹
fs.rename(new Path("/a1"), new Path("/a2"));
}
/**
* 查看目录信息，只显示文件
*
* @throws IOException
* @throws IllegalArgumentException
* @throws FileNotFoundException
*/
@Test
public void testListFiles() throws FileNotFoundException, IllegalArgumentException, IOException {
    // 思考：为什么返回迭代器，而不是List之类的容器
    //因为如果集群中有成千上万的文件，放入集合中很损耗性能。而返回一个迭代器，则无需将全部文件一次性返回。要取哪个文件再去访问HDFS获取
    RemoteIterator<LocatedFileStatus> listFiles = fs.listFiles(new Path("/"), true);
    while (listFiles.hasNext()) {
        LocatedFileStatus fileStatus = listFiles.next();
        System.out.println(fileStatus.getPath().getName());
        System.out.println(fileStatus.getBlockSize());
        System.out.println(fileStatus.getPermission());
        System.out.println(fileStatus.getLen());                     //获取该文件的块信息
        BlockLocation[] blockLocations = fileStatus.getBlockLocations();
        for (BlockLocation bl : blockLocations) {
        System.out.println("block-length:" + bl.getLength() + "--" + "block-offset:" + bl.getOffset());
        String[] hosts = bl.getHosts();
        for (String host : hosts) {
        System.out.println(host);
        
    }
    
}

    
}
}
/**
* 查看文件及文件夹信息
*
* @throws IOException
* @throws IllegalArgumentException
* @throws FileNotFoundException
*/
@Test
public void testListAll() throws FileNotFoundException, IllegalArgumentException, IOException {
FileStatus[] listStatus = fs.listStatus(new Path("/"));
String flag = "d--";
for (FileStatus fstatus : listStatus) {
if (fstatus.isFile()) flag = "f--";
System.out.println(flag + fstatus.getPath().getName());
}
}}
```

==注意:listFiles和listStatus的区别。listFiles可以递归遍历所有文件，而listStatus只能查看某一目录下的文件和文件夹。==

### 7.4.2 通过流的方式访问hdfs

```java
/**
* 相对那些封装好的方法而言的更底层一些的操作方式
* 上层那些mapreduce spark等运算框架，去hdfs中获取数据的时候，就是调的这种底层的api
* @author
*
*/
public class StreamAccess {
    FileSystem fs = null;
    @Before
    public void init() throws Exception {
    Configuration conf = new Configuration();
    fs = FileSystem.get(new URI("hdfs://server1:9000"), conf, "hadoop");
}

/**
* 通过流的方式上传文件到hdfs
* @throws Exception
*/
@Test
public void testUpload() throws Exception {
    FSDataOutputStream outputStream = fs.create(new Path("/hello.txt"), true);
    FileInputStream inputStream = new FileInputStream("/home/hello.txt");
    IOUtils.copy(inputStream, outputStream);
}

@Test
public void testDownLoadFileToLocal() throws IllegalArgumentException, IOException{
    //先获取一个文件的输入流----针对hdfs上的
    FSDataInputStream in = fs.open(new Path("/jdk8.tar.gz"));
    //再构造一个文件的输出流----针对本地的
    FileOutputStream out = new FileOutputStream(new File("/home/jdk.tar.gz"));
    //再将输入流中数据传输到输出流
    IOUtils.copyBytes(in, out, 4096);
}

/**
* hdfs支持随机定位进行文件读取，而且可以方便地读取指定长度
* 用于上层分布式运算框架并发处理数据
* @throws IllegalArgumentException
* @throws IOException
*/
@Test
public void testRandomAccess() throws IllegalArgumentException, IOException{
    //先获取一个文件的输入流----针对hdfs上的
    FSDataInputStream in = fs.open(new Path("/hello.txt"));
    //可以将流的起始偏移量进行自定义
    in.seek(22);
    //再构造一个文件的输出流----针对本地的
    FileOutputStream out = new FileOutputStream(new File("/home/hello.line.2.txt"));
    IOUtils.copyBytes(in,out,19L,true);
}

/**
* 显示hdfs上文件的内容
* @throws IOException
* @throws IllegalArgumentException
*/
@Test
public void testCat() throws IllegalArgumentException, IOException{
    FSDataInputStream in = fs.open(new Path("/hello.txt"));
    IOUtils.copyBytes(in, System.out, 1024);
}
    
}
```


## 参考文章
* https://segmentfault.com/a/1190000020231486