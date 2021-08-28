---
title: Sqoop-工作原理
---

::: tip
本文主要是介绍 Sqoop-工作原理 。
:::

[[toc]]

## Sqoop原理篇

## 1 Sqoop简介

   Apache Sqoop（SQL-to-Hadoop）项目旨在协助RDBMS与Hadoop之间进行高效的大数据交流。用户可以在 Sqoop 的帮助下，轻松地把关系型数据库的数据导入到 Hadoop 与其相关的系统 (如HBase和Hive)中；同时也可以把数据从 Hadoop 系统里抽取并导出到关系型数据库里。

   Sqoop是一个在结构化数据和Hadoop之间进行批量数据迁移的工具，结构化数据可以是MySQL、Oracle等RDBMS。Sqoop底层用MapReduce程序实现抽取、转换、加载，MapReduce天生的特性保证了并行化和高容错率，而且相比Kettle等传统ETL工具，任务跑在Hadoop集群上，减少了ETL服务器资源的使用情况。在特定场景下，抽取过程会有很大的性能提升。
   
   如果要用Sqoop，必须正确安装并配置Hadoop，因依赖于本地的Hadoop环境启动MR程序；MySQL、Oracle等数据库的JDBC驱动也要放到Sqoop的lib目录下。

## 2 Sqoop架构

### 2.1 Sqoop1和Sqoop2的对比

（1）Sqoop1架构
<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dc/sqoop/prin-1.png')" alt="wxmp">

（2）Sqoop2架构 
<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dc/sqoop/prin-2.png')" alt="wxmp">

（3）对比分析
   ① 在架构上，Sqoop1仅仅使用一个Sqoop客户端；Sqoop2引入了Sqoop Server，对Connector实现了集中的管理，其访问方式也变得多样化了，其可以通过REST API、JAVA API、WEB UI以及CLI控制台方式进行访问。
   
   ② 在安全性能方面，在Sqoop1中我们经常用脚本的方式将HDFS中的数据导入到MySQL中，或者反过来将MySQL数据导入到HDFS中，其中在脚本里边都要显示指定MySQL数据库的用户名和密码的，安全性做的不是太完善。在Sqoop2中，如果是通过CLI方式访问的话，会有一个交互过程界面，你输入的密码信息不被看到，同时Sqoop2引入基于角色的安全机制。

（4）优缺点
   ① Sqoop1优点：架构部署简单；

   ② Sqoop1缺点：命令行方式容易出错，格式紧耦合，无法支持所有数据类型，安全机制不够完善，例如密码暴漏，安装需要root权限，connector必须符合JDBC模型；
   
   ③ Sqoop2优点：多种交互方式，命令行，Web UI，REST API，Conncetor集中化管理，所有的链接安装在Sqoop Server上，完善权限管理机制，Connector规范化，仅仅负责数据的读写；
   
   ④ Sqoop2缺点：架构稍复杂，配置部署更繁琐。

### 2.2 Sqoop2数据导入

将数据从关系型数据库导入到Hadoop中
   Step1：Sqoop与数据库Server通信，获取数据库表的元数据信息；
   
   Step2：Sqoop启动一个Map-Only的MR作业，利用元数据信息并行将数据写入Hadoop。
   
   Sqoop在import时，需要制定split-by参数。Sqoop根据不同的split-by参数值来进行切分,然后将切分出来的区域分配到不同map中。每个map中再处理数据库中获取的一行一行的值，写入到HDFS中。同时split-by根据不同的参数类型有不同的切分方法，如比较简单的int型，Sqoop会取最大和最小split-by字段值，然后根据传入的num-mappers来确定划分几个区域。 比如select max(split_by),min(split-by) from得到的max(split-by)和min(split-by)分别为1000和1，而num-mappers为2的话，则会分成两个区域(1,500)和(501-100),同时也会分成2个sql给2个map去进行导入操作，分别为select XXX from table where split-by>=1 and split-by<500和select XXX from table where split-by>=501 and split-by<=1000。最后每个map各自获取各自SQL中的数据进行导入工作。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dc/sqoop/prin-3.png')" alt="wxmp">

#### 2.2.1 Sqoop大概流程

（1）读取要导入数据的表结构，生成运行类，默认是QueryResult，打成jar包，然后提交给Hadoop；

（2）设置好job，主要也就是设置好各个参数

（3）这里就由Hadoop来执行MapReduce来执行Import命令
   ① 首先要对数据进行切分，也就是DataSplit，DataDrivenDBInputFormat.getSplits(JobContext job)
   
   ② 切分好范围后，写入范围，以便读取DataDrivenDBInputFormat.write(DataOutput output)，这里是lowerBoundQuery and upperBoundQuery
   
   ③ 读取以上②）写入的范围DataDrivenDBInputFormat.readFields(DataInput input)
   
   ④ 然后创建RecordReader从数据库中读取数据DataDrivenDBInputFormat.createRecordReader(InputSplit split,TaskAttemptContext context)
   
   ⑤ 创建MAP，MapTextImportMapper.setup(Context context)
   
   ⑥ RecordReader一行一行从关系型数据库中读取数据，设置好Map的Key和Value，交给MapDBRecordReader.nextKeyValue()
   
   ⑦ 运行MAP，mapTextImportMapper.map(LongWritable key, SqoopRecord val, Context context),最后生成的Key是行数据，由QueryResult生成，Value是NullWritable.get()

（4）导入控制

   Sqoop不需要每次都导入整张表。例如，可以指定导入表的部分列。用户也可以在查询中加入WHERE子句（使用—where参数），以此来限定需要导入的记录。

（5）导入和一致性

   在向HDFS导入数据时，重要的是要确保访问的是数据源的一致性快照。保证一致性的最好方法是在导入时不允许运行任何对表中现有数据进行更新的进程。

（6）增量导入

   定期运行导入时一种很常见的方式，这样做可以使HDFS的数据与数据库的数据保持同步。为此需要识别哪些是新数据。对于某一行来说，只有当特定列（由—check-column参数指定）的值大于指定值（通过—last-value设置）时，Sqoop才会导入该行数据。

（7）直接模式导入

   在Sqoop的文档中将使用外部工具的方法称为直接模式。

（8）导入大对象

   “内联”存储大对象，它们会严重影响扫描的性能。因此将大对象与它们的行分开存储，如下图：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dc/sqoop/prin-4.png')" alt="wxmp">
   由于大对象单条记录太大，无法在内存中实现物化。为了克服这个困难，当导入大对象数据大于阈值16M时（通过sqoop.inline.lob.length.max设置，以字节为单位），Sqoop将导入的大对象存储在LobFile格式的单独文件中。LobFile格式能够存储非常大的单条记录（使用了64位的地址空间），每条记录保存一个大对象。LobFile格式允许客户端持有对记录的引用，而不访问记录内容，对记录的访问通过java.io.InputStream（用于二进制对象）或java.io.Reader（用于字符对象）来实现的。在导入一条记录时，所有的“正常”字段会在一个文本文件中一起被物化，同时还生成一个指向保存CLOB或BLOB列的LobFile文件的引用。

### 2.3 Sqoop2数据导出

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dc/sqoop/prin-5.png')" alt="wxmp">

   Sqoop导出功能的架构与其导入功能非常相似，在执行导出操作之前，Sqoop会根据数据库连接字符串来选择一个导出方法。一般为jdbc。然后，Sqoop会根据目标表的定义生成一个java类。这个生成的类能够从文本文件中解析记录，并能够向表中插入类型合适的值。接着会启动一个MapReduce作业，从HDFS中读取源数据文件，使用生成的类解析记录，并且执行选定的导出方法。

基于jdbc的导出方法会产生一批insert语句，每条语句都会向目标表中插入多条记录。多个单独的线程被用于从HDFS读取数据并与数据库进行通信，以确保涉及不同系统的I/O操作能够尽可能重叠执行。

虽然HDFS读取数据的MapReduce作业大多根据所处理文件的数量和大小来选择并行度（Map任务的数量），但Sqoop的导出工具允许用户明确设定任务的数量。由于导出性能会受并行的数据库写入线程数量的影响，所以Sqoop使用CombineFileInput类将输入文件分组分配给少数几个Map任务去执行。

（1）导出与实务
   进程的并行特性，导致导出操作往往不是原子操作。Sqoop会采用多个并行的任务导出，并且数据库系统使用固定大小的缓冲区来存储事务数据，这时一个任务中的所有操作不可能在一个事务中完成。因此，在导出操作进行过程中，提交过的中间结果都是可见的。在导出过程完成前，不要启动那些使用导出结果的应用程序，否则这些应用会看到不完整的导出结果。

   为了解决这个问题，Sqoop可以先将数据导出到一个临时阶段表中，然后在导出任务完成前（即导出操作成功执行后），在一个事务中将临时阶段表中的数据全部移动到目标表中。使用临时阶段表会降低执行速度，因为它需要写两次数据：先写入临时阶段表，再写入目标表。整个导出过程运行所使用的的空间也更多，因为从临时阶段表向目标表导出时存在数据的两个复本。

（2）导出与SequenceFile
   Sqoop还可以将存储在SequenceFile中的记录导出到输出表，不过有一些限制。SequenceFile中可以保存任意类型的记录。Sqoop的导出工具从SequenceFile中读取对象，然后直接发送到OutputCollector，由它将这些对象传递给数据库导出OutputFormat。为了能让Sqoop使用，记录必须被保存在SequenceFile键值对格式的值部分，并且必须继承抽象类com.cloudera.sqoop.lib.SqoopRecord。

**参考文章**：

[1]《Hadoop权威指南》

[2] https://www.liangzl.com/get-article-detail-8271.html

[3] https://www.biaodianfu.com/sqoop.html

[4] https://www.jianshu.com/p/dd723351b39e


## 参考文章
* https://blog.csdn.net/huahuaxiaoshao/article/details/90273148