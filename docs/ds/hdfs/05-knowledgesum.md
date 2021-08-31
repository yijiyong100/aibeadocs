---
title: HDFS-常见知识总结
---

::: tip
本文主要是介绍 HDFS-常见知识总结 。
:::

[[toc]]

## HDFS-常见知识总结

**HDFS（Hadoop Distributed File System）**

### (1) HDFS--Hadoop分布式文件存储系统
源自于Google的GFS论文，HDFS是GFS的克隆版

HDFS是Hadoop中数据存储和管理的基础

他是一个高容错的系统，能够自动解决硬件故障，eg：硬盘损坏，HDFS可以自动修复，可以运行于低成本的通用硬件上（低廉的硬盘，4TB是1200元左右）

一次写入多次读取，不支持修改操作，数据按块切分（按128M切块），按位存储（就近原则）

 

### (2) HDFS底层架构 - 分布式文件存储系统
基于物理层存储的分布式（用多台虚拟机来存储咱们的存在）

基于客户端/服务器模式

通常情况下HDFS都会提供容错和备份机制

通常情况下：HDFS都是基于本地系统的文件存储系统

 

### (3) 分布式文件系统的特点（优缺点）

**优点**：

高可靠：

按位存储，数据分配就近原则，会把数据分配到离他最近的DataNode,所以值得人们信赖

高扩展：

集群节点可以根据业务需求随时扩展和缩减

高效性：

可以在各个集群集群节点之间动态的移动数据，并且保证集群间各节点之间的动态平衡，因此处理速度非常快

高容错：

Hadoop能够自动保存多个副本（默认3份，可修改），并且能够将失败的任务自动重新分配，解决硬件故障

**成本低**：

不适合高效存储大量小文件

不适合低延迟的数据访问

不支持多用户的写入和修改操作，支持单用户的写入

 

### (4) HDFS基本概念
HDFS是一个分布式文件存储系统（NDFS、GFS）

HDFS是用Java语言实现的、分布式的、可扩展的文件系统

HDFS是Hadoop的三大核心和四大模块之一

HDFS主要应用于海量数据的存储

HDFS是*nix(eg:Linux,Unix)

 

### (5) HDFS的前提和设计目标
硬件问题

错误检测和快速、自动的恢复是HDFS最核心的架构目标

存储超大文件，存储量可以达到PB、EB级别（单个文件一般至少是百MB以上）

数据访问：流式访问（不支持随机访问）

HDFS的简单一致性模型：

HDFS需要对它的应用程序实行一次写入、多次读取的访问模式

 

### (6) HDFS的基本概念

HDFS的基本存储单位：块，块是最小的数据读写单位

Hadoop1.0*默认存储块大小：64M

Hadoop2.0*默认存储块大小：128M

 

块大小可以在配置文件hdfs-site.xml修改（1.0参数dfs.block.size/2.0参数dfs.blocksize）

块的默认单位：byte

每个块都有自己的全局（唯一）ID

以块为单位在集群服务器上分配存储

 

【块的好处】：

一个文件的大小可以大于集群中任一磁盘的容量

块适合于数据备份，通过了容错能力和可用性

 

### (7) HDFS 底层架构

#### NameNode：

集群的老大，主节点，存放元数据（Metedata）信息

元数据：命名空间，块的生成时间，块的大小，文件目录，最后访问时间等。。。

记录每一条数据块在各个DataNode上的位置和副本信息

协调客户端对文件的访问

NameNode使用事物日志（EditsLog）记录元数据的变化信息，使用映像文件（FsImageLog）来存储系统的命名空间，包括：文件映射、文件属性等；

通说检查点（Checkpoint）更新映像文件

 

#### SecondaryNameNode：

NameNode的小秘书，排行老二，协助NameNode

是NameNode的备份，实质上相当于虚拟机的快照

尽量不要把SecondaryNameNode和NameNode放在同一台机器上

 

#### DataNode：

小弟，负责存储数据的

一次写入，多次读取（不支持数据修改操作）

数据文件是以块存储的

数据块尽量分布在不同节点的不同DataNode上（保证读取效率大大提升）

 

### (8) HDFS读文件流程
- 1. 先通过客户端调用FileSyStem对象的.open()方法打开HDFS中需要读取的文件
- 2. FileSyStem通过远程协议调用NameNode，确定要访问的文件的数据块的位置；NameNode返回一个含有数据块的“元数据”信息（即文件的基本信息）；然后，DataNode按照NameNode定义的距离值进行排序，如果客户端本身就是一个DataNode，那么会优先从本地的DataNode节点上进行数据读取返回一个InputStream给客户端，让其从FSDataInputStream中读取数据，FSDataInputStream接着包装一个DInputStream，用来用来管理DataNode和NameNode的I/O
- 3. NameNode向客户端返回一个包含数据块信息的地址，客户端会根据创建一个FSDataInputStream，开始对数据进行读取
- 4. FSDataInputStream根据开始时候存放的位置，连接到离它最近的DataNode，对其上数据进行从头读取操作。读取过程中客户端会反复调  用.read()方法，以I/O的（流式方式）从DataNode上访问读取数据
- 5. 当读取到Block的最后一块时，FSDataInputStream会关闭掉当前DataNode的连接，然后查找能够读取的下一个Block所在的距离当前最近的DataNode
- 6. 读取完之后调用.close()方法，关闭FSDataInputStream8

 

### (9) HDFS写文件流程
- 1. 客户端调用FileSyStem的.create()方法来请求创建文件
- 2. FileSyStem通过NameNode发送请求，创建一个新文件，但此时并不关联其它任何数据块。NameNode进行很多检查保证不存在要创建文件已经在与HDFS系统当中，同时检查是否有相应的权限来创建这个文件。如果这些检查都已完成，那么NameNode就会记录下来这个新建的文件的信息。FileSyStem就返回一个FSDataOutputStream给客户端让他来写数据。和读的情况一样，FSDataOutputStream将会包装一个DFSOutputStream用于和DataNode和NameNode进行通讯的。一旦文件创建失败，客户端会接收到一个IOException，表示文件创建失败，停止后续的所有任务
- 3. 客户端开始写数据。FSDataOutputStream把要写入的数据分成块的形式，将其写入到队列中。其中的数据有DataStream读取（DataStream的职责：让NameNode分配新的块--通过找到合适的DataNode来存储备份的副本数据）这些DataNode组成一条流水线，假设是一个三级流水线，那么里面含有三个节点。此时DataStream把数据首先写入到离他最近的DataNode上（第一个节点）；然后由第一个节点将数据块写入到第二个节点，第二个节点继续把数据块传送到第三个节点上
- 4. FSDataOutputStream维护了一个内部关于write packet的队列，里面存放了等待DataNode确认无误的packets信息。这个队列称为等待队列。一个packet的信息被移出本队列并且当packet流水线中的所有节点确认无误
- 5. 当完成数据写入操作后，客户端会调用.close()方法，在通知NameNode它些数据完成之前，这个方法将Flush（刷新）残留的packets，并且等待信息确认，NameNode已经知道了文件由哪些数据块，通过DataStream询问数据块的分配，所以它在返回成功之前必须要完成配置文件中配置的最小副本数的复制操作

 

### (10) HDFS-可靠性
按位存储 -- 就近原则

 

### (11) HDFS -- 容错率

冗（rong）余副本策略

   可以在hdfs-site中指定副本数

   所有的数据块都有副本数

   DataNode启动时便利本地文件系统，产生一份hdfs数据块和本地文件系统对应的数据队列进行数据效验，然后汇报给NameNode，NameNode负责管理

 

### (12) HDFS的机架策略

   集群的节点一般是放在不同的机架上，机架之间带宽要比机架内带宽要小（这样做的话传输速度）

   默认一个机架内存两个副本，然后再在另一个机架存放一个副本，这样可以防止机架失效数据的丢失，同时他也能够提高带宽利用率

 

   0.17版之前

​     默认存3个副本

​     第一个副本放在与客户端同一个机架的距离最近的机器中

​     第二个副本放在同一个机架

​     第三个副本放到不同机架的某一设备中

   0.17版之后

​     默认存3个副本

​     第一个副本放在与客户端同一个机架的机器中

​     第二个 副本放到不同机架的某一设备中   

​     第三个副本放到与第二个副本同一机架的不同设备中

 

### (13) 心跳机制

 

  心跳  3秒一次

   块报告 5分钟一次


判断DataNode是否死亡

10*3+2*5+60=630秒


NameNode周期性从DataNode接收心跳报告（3s）和块报告（5min）《用来监控集群状态；如果出现错误 -- 自动修复

NameNode根据块报告验证元数据信息

没有按时发送心跳报告的DataNode，会被NameNode标记为死亡状态（宕《dang》机），不会再给DataNode分配任何I/O请求，如果DataNode失效（死亡或者假死）了，NameNode发现DataNode的副本数降低，低于之前设定的副本因子值（副本数），NameNode在检测出这些数据块丢失之后会在何时的时间自动修复

自动修复数据的原因：

数据副本本身损坏，磁盘故障，修改系统配文件导致副本因子增大，断电等等

 

### (14) 安全模式（SafeInMode）

NameNode启动的时候会先经过一个"安全模式"（保证数据安全）

安全模式下不会产生数据写入操作，因为NameNode验证数据，不支持此操作；支持读取

在此阶段NameNode收集各个DataNode节点的报告，当数据块的最小副本数=配置文件中设置的值时，认为他是“安全式”

此时退出安全模式，才可以进行数据写入操作

当检测到副本数不足的数据块时，该数据块会被HDFS自动复制直到达到配置文件中设置的最小副本数时停止复制

安全模式（SadeInMode）下了可以进行的操作：

只能够查询，不支持任何对于数据改动（增加，删除）

如何进入安全模式？

进入| 离开 | 下载

hdfs dfsadmin -safemode enter|leave|get

 

进入时的情景：

- 1. NameNode启动过程中进入
- 2. 手动进入 hdfs dfsadmin -safemode enter
- 3. 阀值计算公式：已经启动的DataNode节点数 / 总数、

 

 阀值为1的进入安全模式

   <0   永远不安全

   0.999和1之间  离开安全模式

   0~0.999之间   处于安全模式

 

### (15) HDFS的校验和

HDFS的客户端软件实现了对于HDFS文件内容的效验和（Chechsum）的检查（提高可靠性）

在文件创建时（调用。creat（）），会计算出每个数据块的校验和

校验和会作为一个单独的隐藏文件保存在命名空间NameSpace下

获取文件时会检查数据块对应的校验和是否和隐藏文件（NameSpace下的文件）相同，值相同数据块未发生丢失，值不同数据块丢失，如果损坏或丢失NameNode会自动修复数据块

正在读取数据时发生丢失，不会进行数据修复，不影响数据读取，可以正常操作

 

### (16) 回收站（类似于windows的回收站，防止误删除操作）

删除文件时，实际上是吧他放入了回收站（trash）

如果误删除文件可以进行还原

可以在集群配置文件中设置一个时间阀值，当回收站的文件存放时间达到此时间阀值时会自动清空，彻底删除文件，并且彻底释放原来文件占用的DataNode节点中的数据块

默认是关闭状态，可以通过core-site.xml添加fs.trash.interval来打开并配置时间阀值，时间以分钟为单位

 

### (17) 元数据 -- 保护

影响文件和事物日志是NameNode的核心数据

NameNode会因为副本数的增加而大大降低它的处理速度，但是可以增加它的安全性（即可靠性）

Hadoop1.0*中NameNode依然只有一个，NameNode死掉之后必须手动启动

Hadoop2.0*中集群配置高可用，使其拥有多个NameNode，一个处于Active状态的NameNode节点死掉之后，HA会自动通过SecondaryNameNode启动处于StandBy（准备）状态的NameNode，集群可以正常运行

Hadoop3.0*中拥有多个NameNode，无需进行高可用HA集群配置，StandBy状态的NameNode立刻自动切换为Active状态

 

### (18) HDFS常用命令

 
``` shell
hadoop/hdfs/yarn fs -cmd <args>

1)文件操作

列出hdfs文件系统中根目录

hdfs dfs -ls /           //列出hdfs下的二级目录

hdfs dfs -ls -R /        //会列出hdfs的所有文件详细信息

 

2）上传文件（hdfs测试命令）


hadoop/hdfs/yarn dfs -put  ./test1  ./test

​|上传文件路径  目标位置路径

<local src><hdfs src>

 

3）将hdfs的文件下载到本地并且重名

hadoop/hdfs/yarn  dfs  -get  in getin(in:下载文件的地址 getin：下载下来的文件放在的地址) 

<hdfs src> <local src>

先是hdfs文件路径，后是本地文件路径

 

 4）copyToLocal命令 复制

hdfs dfs -copyToLocal <hdfs src> <local src>

作用与-get命令一样

 

5)copyFromLocal命令 复制

 

hdfs dfs -copyFromLocal <local src><hdfs src>

作用与-put命令一样

 

moveFromLocal  移动

hdfs dfs -moveFromLocal <local src><hdfs src>

 

6）删除文档

hdfs dfs -rmr <hdfs file>

hdfs dfs -rm 

hdfs dfs -rm -r 

 

7)查看文件内容

hdfs dfs -cat 文件

 

8)建目录

hdfs dfs -mkdir 目录名

建立多级目录时父目录不存在会报错，目录需要一级一级创建

 

9)合并多个文件

hdfs dfs -getmerge 多个文件路径空格隔开 合并之后文件名

 

10)执行基本信息

hdfs dfsadmin -report

 

11)进入/查看/退出安全模式

hdfs dfsadmin -safemode enter|get |leave

 

12)添加节点

start-all.sh

 

13)负载均衡

start-balancer.sh

```


## 参考文章
* https://www.cnblogs.com/SmallBird-Nest/p/11420158.html