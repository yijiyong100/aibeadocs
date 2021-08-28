---
title: Sqoop-基础知识
---

::: tip
本文主要是介绍 Sqoop-基础知识 。
:::

[[toc]]

## sqoop知识点总结(全)

## 1、概述

sqoop是apache旗下一款“Hadoop和关系数据库服务器之间传送数据”的工具。

Sqoop(发音：skup)是一款开源的工具，主要用于在Hadoop(Hive)与传统的数据库(mysql、postgresql...)间进行数据的传递，可以将一个关系型数据库（例如 ： MySQL ,Oracle ,Postgres等）中的数据导进到Hadoop的HDFS中，也可以将HDFS的数据导进到关系型数据库中。


导入数据：MySQL，Oracle导入数据到Hadoop的HDFS、HIVE、HBASE等数据存储系统；

导出数据：从Hadoop的文件系统中导出数据到关系数据库mysql等。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dc/sqoop/intro-1.png')" alt="wxmp">

## 2、工作机制

将导入或导出命令翻译成mapreduce程序来实现。

在翻译出的mapreduce中主要是对inputformat和outputformat进行定制。

## 3、简单安装及使用

安装sqoop的前提是已经具备java和hadoop的环境。
### 3.1、下载并解压
最新版下载地址http://ftp.wayne.edu/apache/sqoop/1.4.6/


### 3.2、修改配置文件

``` shell
$ cd $SQOOP_HOME/conf
$ mv sqoop-env-template.sh sqoop-env.sh
```

打开sqoop-env.sh并编辑下面几行：

``` shell
export HADOOP_COMMON_HOME=/home/hadoop/apps/hadoop-2.6.1/
export HADOOP_MAPRED_HOME=/home/hadoop/apps/hadoop-2.6.1/
export HIVE_HOME=/home/hadoop/apps/hive-1.2.1
```

### 3.3、加入mysql的jdbc驱动包

``` shell
cp  ~/app/hive/lib/mysql-connector-java-5.1.28.jar   $SQOOP_HOME/lib/
```

### 3.4、验证启动

``` shell
$ cd $SQOOP_HOME/bin
$ sqoop-version
```

预期的输出：

``` shell
18/07/01 14:52:32 INFO sqoop.Sqoop: Running Sqoop version: 1.4.6
Sqoop 1.4.6 git commit id 5b34accaca7de251fc91161733f906af2eddbe83
Compiled by abe on Fri Aug 1 11:19:26 PDT 2018
```

到这里，整个Sqoop安装工作完成。

验证sqoop到mysql业务库之间的连通性：

``` shell
bin/sqoop-list-databases --connect jdbc:mysql://localhost:3306 --username root --password root
bin/sqoop-list-tables --connect jdbc:mysql://localhost:3306/userdb --username root --password root
```
## 4、sqoop的数据导入

导入单个表从RDBMS到HDFS。表中的每一行被视为HDFS的记录。所有记录都存储为文本文件的文本数据（或者Avro、sequence文件等二进制数据）

### 4.1、语法
下面的语法用于将数据导入HDFS：

``` shell
$ sqoop import (generic-args) (import-args) 
```

### 4.2、示例

表数据在mysql中有一个库userdb中三个表：emp, emp_add和emp_conn

表emp:
| ***\*id\**** | ***\*name\**** | ***\*deg\**** | ***\*salary\**** | ***\*dept\**** |
| ------------ | -------------- | ------------- | ---------------- | -------------- |
| 1201         | gopal          | manager       | 50,000           | TP             |
| 1202         | manisha        | Proof reader  | 50,000           | TP             |
| 1203         | khalil         | php dev       | 30,000           | AC             |
| 1204         | prasanth       | php dev       | 30,000           | AC             |
| 1205         | kranthi        | admin         | 20,000           | TP             |
表emp_add:
| ***\*id\**** | ***\*hno\**** | ***\*street\**** | ***\*city\**** |
| ------------ | ------------- | ---------------- | -------------- |
| 1201         | 288A          | vgiri            | jublee         |
| 1202         | 108I          | aoc              | sec-bad        |
| 1203         | 144Z          | pgutta           | hyd            |
| 1204         | 78B           | old city         | sec-bad        |
| 1205         | 720X          | hitec            | sec-bad        |
表emp_conn：
| ***\*id\**** | ***\*phno\**** | ***\*email\**** |
| ------------ | -------------- | --------------- |
| 1201         | 2356742        | gopal@tp.com    |
| 1202         | 1661663        | manisha@tp.com  |
| 1203         | 8887776        | khalil@ac.com   |
| 1204         | 9988774        | prasanth@ac.com |
| 1205         | 1231231        | kranthi@tp.com  |

#### 4.2.1、导入表数据到HDFS

下面的命令用于从MySQL数据库服务器中的emp表导入HDFS：

``` shell
bin/sqoop import   \
--connect jdbc:mysql://hdp-node-01:3306/test   \
--username root  \
--password root   \
--table emp   \
--m 1  
```

如果成功执行，那么会得到下面的输出：

``` shell
INFO sqoop.Sqoop: Running Sqoop version: 1.4.5
INFO manager.MySQLManager: Preparing to use a MySQL streaming resultset.
INFO orm.CompilationManager: Writing jar file: /tmp/sqoop-hadoop/compile/cebe706d23ebb1fd99c1f063ad51ebd7/emp.jar
-----------------------------------------------------
O mapreduce.Job: map 0% reduce 0%
INFO mapreduce.Job: map 100% reduce 0%
INFO mapreduce.Job: Job job_1419242001831_0001 completed successfully
-----------------------------------------------------
-----------------------------------------------------
INFO mapreduce.ImportJobBase: Transferred 145 bytes in 177.5849 seconds (0.8165 bytes/sec)
INFO mapreduce.ImportJobBase: Retrieved 5 records.
```

为了验证在HDFS导入的数据，请使用以下命令查看导入的数据：

``` shell
$ $HADOOP_HOME/bin/hadoop fs -cat /user/hadoop/emp/part-m-00000
```

emp表的数据和字段之间用逗号(,)表示：

``` shell
1201, gopal,    manager, 50000, TP
1202, manisha,  preader, 50000, TP
1203, kalil,    php dev, 30000, AC
1204, prasanth, php dev, 30000, AC
1205, kranthi,  admin,   20000, TP
```
#### 4.2.2、导入到HDFS指定目录

在导入表数据到HDFS使用Sqoop导入工具，我们可以指定目标目录。

以下是指定目标目录选项的Sqoop导入命令的语法：

``` shell
--target-dir <new or exist directory in HDFS>
```

下面的命令是用来导入emp_add表数据到'/queryresult'目录：

``` shell
bin/sqoop import \
--connect jdbc:mysql://hdp-node-01:3306/test \
--username root \
--password root \
--target-dir /queryresult \指定目录
--fields-terminated-by ‘\001’ \指定分隔符
--table emp 
--split-by id
--m 1
```

注意：如果报错，说emp类找不到，则可以手动从sqoop生成的编译目录(/tmp/sqoop-root/compile)中，找到这个emp.class和emp.jar，拷贝到sqoop的lib目录下。
如果设置了 --m 1，则意味着只会启动一个maptask执行数据导入；
如果不设置 --m 1，则默认为启动4个map task执行数据导入，则需要指定一个列来作为划分map task任务的依据。

下面的命令是用来验证 /queryresult 目录中 emp_add表导入的数据形式：

``` shell
$HADOOP_HOME/bin/hadoop fs -cat /queryresult/part-m-*
```

它会用逗号（，）分隔emp_add表的数据和字段：

``` shell
1201, 288A, vgiri,   jublee
1202, 108I, aoc,     sec-bad
1203, 144Z, pgutta,  hyd
1204, 78B,  oldcity, sec-bad
1205, 720C, hitech,  sec-bad
```
#### 4.2.3、导入关系表到HIVE

``` shell
bin/sqoop import 
--connect jdbc:mysql://hdp-node-01:3306/test 
--username root 
--password root 
--table emp 
--hive-import  \增加导入hive声明
--split-by id  
--m 1
```
#### 4.2.4、导入表数据子集

我们可以使用Sqoop导入工具导入表的"where"子句的一个子集。它执行在各自的数据库服务器相应的SQL查询，并将结果存储在HDFS的目标目录。

where子句的语法如下：

``` shell
--where <condition>
```

下面的命令用来导入emp_add表数据的子集。子集查询检索员工ID和地址，居住城市为（sec-bad）：

``` shell
bin/sqoop import \
--connect jdbc:mysql://hdp-node-01:3306/test \
--username root \
--password root \
--where "city ='sec-bad'" \子集条件声明
--target-dir /wherequery \
--table emp_add \
 --m 1
```

按需导入：

``` shell
bin/sqoop import \
--connect jdbc:mysql://hdp-node-01:3306/test \
--username root \
--password root \
--target-dir /wherequery2 \
--query 'select id,name,deg from emp WHERE id>1207 and $CONDITIONS' \
--split-by id \
--fields-terminated-by '\t' \
--m 2
```

下面的命令用来验证数据从emp_add表导入/wherequery目录：

``` shell
$HADOOP_HOME/bin/hadoop fs -cat /wherequery/part-m-*
```

它用逗号（，）分隔 emp_add表数据和字段：

``` shell
1202, 108I, aoc, sec-bad
1204, 78B, oldcity, sec-bad
1205, 720C, hitech, sec-bad
```
#### 4.2.5、增量导入

增量导入是仅导入新添加的表中的行的技术。
sqoop支持两种增量MySql导入到hive的模式，

   一种是append，即通过指定一个递增的列，比如：

``` shell
--incremental append  --check-column num_id --last-value 0 
```

另种是可以根据时间戳，比如：

``` shell
--incremental lastmodified --check-column created --last-value '2018-02-01 11:0:00' 
```

就是只导入created 比'2018-02-01 11:0:00'更大的数据。

##### 4.2.5.1、append模式
它需要添加‘incremental’, ‘check-column’, 和 ‘last-value’选项来执行增量导入。

下面的语法用于Sqoop导入命令增量选项：

``` shell
--incremental <mode>
--check-column <column name>
--last value <last check column value>
```

假设新添加的数据转换成emp表如下：

1206, satish p, grp des, 20000, GR

下面的命令用于在EMP表执行增量导入：

``` shell
bin/sqoop import \
--connect jdbc:mysql://hdp-node-01:3306/test \
--username root \
--password root \
--table emp \
--m 1 \
--incremental append \
--check-column id \
--last-value 1208
```

以下命令用于从emp表导入HDFS emp/ 目录的数据验证：

``` shell
$ $HADOOP_HOME/bin/hadoop fs -cat /user/hadoop/emp/part-m-*
1201, gopal,    manager, 50000, TP
1202, manisha,  preader, 50000, TP
1203, kalil,    php dev, 30000, AC
1204, prasanth, php dev, 30000, AC
1205, kranthi,  admin,   20000, TP
1206, satish p, grp des, 20000, GR
```

下面的命令是从表emp 用来查看修改或新添加的行：

``` shell
$HADOOP_HOME/bin/hadoop fs -cat /emp/part-m-*1
1206, satish p, grp des, 20000, GR
```
## 5、Sqoop的数据导出

### 5.1、将数据从HDFS文件导出到RDBMS数据库
- 导出前，目标表必须存在于目标数据库中。
- 默认操作是将文件中的数据使用INSERT语句插入到表中
- 更新模式下，是生成UPDATE语句更新表数据

语法

以下是export命令语法:

``` shell
$ sqoop export (generic-args) (export-args) 
```
示例

数据是在HDFS 中“EMP/”目录的emp_data文件中。所述emp_data如下：

``` shell
1201, gopal,     manager, 50000, TP
1202, manisha,   preader, 50000, TP
1203, kalil,     php dev, 30000, AC
1204, prasanth,  php dev, 30000, AC
1205, kranthi,   admin,   20000, TP
1206, satish p,  grp des, 20000, GR
```

#### 5.1.1、首先需要手动创建mysql中的目标表

``` shell
$ mysql
mysql> USE db;
mysql> CREATE TABLE employee (
   id INT NOT NULL PRIMARY KEY,
   name VARCHAR(20),
   deg VARCHAR(20),
   salary INT,
   dept VARCHAR(10));
```

#### 5.1.2、然后执行导出命令

``` shell
bin/sqoop export \
--connect jdbc:mysql://hdp-node-01:3306/test \
--username root \
--password root \
--table employee \
--export-dir /user/hadoop/emp/
```

#### 5.1.3、验证表mysql命令行。

``` shell
mysql>select * from employee;
```

如果给定的数据存储成功，那么可以找到数据在如下的employee表:

``` shell
+------+--------------+-------------+-------------------+--------+
| Id   | Name         | Designation | Salary            | Dept   |
+------+--------------+-------------+-------------------+--------+
| 1201 | gopal        | manager     | 50000             | TP     |
| 1202 | manisha      | preader     | 50000             | TP     |
| 1203 | kalil        | php dev     | 30000             | AC     |
| 1204 | prasanth     | php dev     | 30000             | AC     |
| 1205 | kranthi      | admin       | 20000             | TP     |
| 1206 | satish p     | grp des     | 20000             | GR     |
+------+--------------+-------------+-------------------+--------+
```

## 参考文章
* https://blog.csdn.net/qq_26803795/article/details/80905651