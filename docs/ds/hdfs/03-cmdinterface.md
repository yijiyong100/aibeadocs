---
title: HDFS-命令行接口
---

::: tip
本文主要是介绍 HDFS-命令行接口 。
:::

[[toc]]

## HDFS命令行接口

通过前面对HDFS基本概念、高可用性、数据读写流程的介绍，我们对HDFS已经有了大致的了解。这里我们还需要明确一点：Hadoop作为一个完整的分布式系统，它**有一个抽象的文件系统的概念-而我们介绍的HDFS只是其中的一个实现**一个最常用的实现，实际上还有很多其他的分布式文件系统。

  Hadoop对文件系统提供了很多接口，一般使用URI（统一资源定位符）来表示选取的文件系统具体是哪一个，比如file://表示本地文件系统，而hdfs://表示HDFS，还有其他一些具体的实现，但是不常用到。

  至此，我们对HDFS的理论技术基础已经基本了解，既然它是一个文件系统，类似于我们日常使用的本地文件系统，我们就可以通过命令行的一些命令来与其进行交互，接下来主要介绍其命令行接口。

------

  当然，为了使用HDFS，首先我们安装和配置Hadoop，可以先以伪分布式的模式在一台电脑中试用，配置的过程这里不再赘述，可以参考《Hadoop权威指南》的附录。

  配置完成后，作为一个文件系统，其主要的操作无非就是：读取文件、新建目录、移动文件、删除数据、列出目录等等，可以使用`hadoop fs -help`来查看命令帮助。

## 命令行接口案例
  以下例子演示其命令行接口的基本使用方法。

```shell
# 从本地文件系统将一个文件复制到HDFS
$ hadoop fs -copyFromLocal ~/1.txt hdfs://localhost/user/gz.shan/2.txt
# 从本地文件系统将一个文件复制到HDFS，省略hdfs://localhost，因为这在启动hadoop时已经在配置文件指定
$ hadoop fs -copyFromLocal ~/1.txt /user/gz.shan/2.txt
# 从本地文件系统将一个文件复制到HDFS，相对路径，默认就是用户的home目录
$ hadoop fs -copyFromLocal ~/1.txt 2.txt

# 从HDFS中将文件复制回本地文件系统
$ hadoop fs -copyToLocal  /user/gz.shan/2.txt ~/3.txt

# 在HDFS中新建目录
$ hadoop fs -mkdir test 

# 查看当前路径下的文件信息
$ hadoop fs -ls .
# 得到的结果是：
-rw-r--r--   1 gz.shan supergroup         60 2019-06-20 18:18 2.txt                               
drwxr-xr-x   - gz.shan supergroup          0 2019-06-20 18:21 test 
# 第一列代表文件模式，第二列代表文件的副本数量，第三列和第四列是文件的所属用户和组别，第五列是文件的大小，以字节为单位，目录是0，第六列和第七列是文件最后修改日期和时间，第八列是文件名

# 删除文件
$ hadoop fs -rm /user/gz.shan/2.txt
```

  以上就是Hadoop HDFS的命令行接口简单示例，需要补充说明的是：HDFS中的文件访问权限和POSIX中是差不多的，一共三类权限：只读、写入和可执行（分别对应r，w，x），每个文件同样都有所属用户（owner）、所属组别（group）以及模式（mode），这个模式由所属用户的权限、组内成员的权限以及其他用户的权限组成。


## 参考文章
* https://www.cnblogs.com/gzshan/p/11060579.html