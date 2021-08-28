---
title: Sqoop-精华总结
---

::: tip
本文主要是介绍 Sqoop-精华总结 。
:::

[[toc]]

## sqoop知识总结

## sqoop

## 1.是什么

Sqoop(发音：skup)是一款开源的工具，主要用于在Hadoop(Hive)与传统的数据库(mysql、postgresql...)间进行数据的传递，可以将一个关系型数据库（例如 ： MySQL ,Oracle ,Postgres等）中的数据导进到Hadoop的HDFS中，也可以将HDFS的数据导进到关系型数据库中。

Sqoop项目开始于2009年，最早是作为Hadoop的一个第三方模块存在，后来为了让使用者能够快速部署，也为了让开发人员能够更快速的迭代开发，Sqoop独立成为一个Apache项目。

原来大部分数据存储关系型数据库的 mysql或者Oracle，随着数据量的激增，传统的关系型数据存储方案不适合，需要将传统关系型数据库的数据转移到大数据平台存储，即mysql|oracle ----> hadoop。

另外，大数据平台（hadoop）中分析的一些业务指标数据，为了便于web页面的可视化的展示，需要导出到mysql中，即hadoop--->mysql|oracle。

总结：**sqoop就是一个数据迁移工具**

## 2.作业本质

sqoop进行数据迁移的本质就是将sqoop命令转换为mapreduce任务进行数据迁移的，即sqoop就是hadoop的另一种形式的客户端。

### 数据导入

mysql|oracle ---> hdfs

map端：DBInputFormat 数据库输入类

 context.write();

 FileOutputFormat() 指定输出路径 hdfs

只有maptask即可，相当于定制了输入类

### 数据导出

hdfs ---> mysql

map端：FileInputFormat hdfs文件路径

 context.write()

 DBOutputFormat 将数据写出到mysql中

## 3.安装

### 安装节点

1个节点，这个节点必须可以访问到大数据平台（hdfs、hive）客户端

### 安装步骤

```shell
1)上传
2)解压
tar -xvzf sqoop-1.4.6.bin__hadoop-2.0.4-alpha.tar.gz 
ln -s sqoop-1.4.6.bin__hadoop-2.0.4-alpha sqoop
3)配置环境变量
export SQOOP_HOME=/home/hadoop/app/sqoop
export PATH=$PATH:$SQOOP_HOME/bin

source /etc/profile

验证：
sqoop version 

4)修改sqoop的配置文件
/home/hadoop/app/sqoop/conf
mv sqoop-env-template.sh sqoop-env.sh

#hadoop的common安装位置
export HADOOP_COMMON_HOME=/home/hadoop/app/hadoop-2.7.6

#hadoop的核心依赖的安装位置 mapreduce
export HADOOP_MAPRED_HOME=/home/hadoop/app/hadoop-2.7.6

#配置hbase的安装目录
#export HBASE_HOME=

#配置hive的安装目录
export HIVE_HOME=/home/hadoop/app/hive

#zookeeper的配置文件所在路径的
export ZOOCFGDIR=/home/hadoop/app/zookeeper/conf

5)将mysql的驱动包放在sqoop的lib下
6)测试
list-databases   查看mysql数据库中的所有数据库

bin/sqoop list-databases \
--connect jdbc:mysql://cdh01:3306/ \
--username root \
--password root
```

## 4.命令

sqoop help 查看sqoop的帮助文档

### 将mysql导入hdfs

#### 不指定导入hdfs路径

默认导入的hdfs的路径 /user/hadoop/表名

```shell
bin/sqoop import \
--connect 'jdbc:mysql://cdh01/test?useUnicode=true&characterEncoding=utf-8' \			
--username root \				mysql 用户名
--password root \				mysql用户密码
--table stu \					需要导入到hdfs的mysql表名
--fields-terminated-by '\t' \	列分割符
-m 1							map tasks的并行度
```

#### 指定导入hdfs路径

```shell
bin/sqoop import \
--connect 'jdbc:mysql://cdh01/test?useUnicode=true&characterEncoding=utf-8' \
--username root \
--password root \
--table stu \
--target-dir "/sqoop/job" \		指定路径
--fields-terminated-by '\t' \
-m 1
```

#### 指定导入列

--columns 指定需要导入的mysql数据库中的列，多列之间用逗号隔开

```shell
bin/sqoop import \
--connect 'jdbc:mysql://cdh01/test?useUnicode=true&characterEncoding=utf-8' \
--username root \
--password root \
--columns "name" \		指定导入列
--table stu \
--target-dir "/sqoop/job" \			
--fields-terminated-by '\t' \
-m 1
```

#### 指定过滤条件

```shell
bin/sqoop import \
--connect 'jdbc:mysql://cdh01/test?useUnicode=true&characterEncoding=utf-8' \
--username root \
--password root \
--columns "name" \		
--where "age>20" \		指定筛选条件
--table stu \
--target-dir "/sqoop/job" \			
--fields-terminated-by '\t' \
-m 1
```

#### 指定sql查询语句

```shell
bin/sqoop import \
--connect 'jdbc:mysql://cdh01/test?useUnicode=true&characterEncoding=utf-8' \
--username root \
--password root \
--query 'select * from stu where age>20 and $CONDITIONS' \		指定sql查询
--target-dir "/sqoop/job" \			
--fields-terminated-by '\t' \
-m 1
```

**注意：--query 和 --table --columns --where不能一起使用的**

#### 指定maptask的个数

```shell
bin/sqoop import \
--connect 'jdbc:mysql://cdh01/test?useUnicode=true&characterEncoding=utf-8' \
--username root \
--password root \
--query 'select * from stu where age>20 and $CONDITIONS' \		
--target-dir "/sqoop/job" \	
--split-by  sid \ 		指定每一个maptask切分数据的依据字段
--fields-terminated-by '\t' \
-m 4
每一个maptask数据怎么分配的？
平均分配  是
hash分配   否
```

### 将mysql导入hive

#### 默认导入

```shell
bin/sqoop import \
--connect 'jdbc:mysql://cdh01/test?useUnicode=true&characterEncoding=utf-8' \
--username root \
--password root \
--table stu \			mysql中的表名
--target-dir "/sqoop/job" \
--fields-terminated-by '\t' \
-m 1 \
--hive-import			与导入到hdfs唯一的差别
```

##### mysql数据导入到hive中的步骤

```markdown
1.首先将mysql中的数据导入到hdfs的默认路径下hdfs://cdh01/user/hadoop/表名
2.在hive中创建对应的表
3.将hdfs上的表加载到hive对应的表中  即load data 操作
```

##### 默认导入的hive的库和表

```markdown
默认库  default
默认的表名和mysql中的表名一致
导入hive表的数据的存储文件列之间的分割符 \001
```

#### 导入到hive中指定的库和表名

```shell
--fields-terminated-by  指定hive表文件存储的列分割符 最好指定
--lines-terminated-by   指定hive表文件存储的行之间的分割符
--hive-overwrite    	覆盖导入
--hive-database   		指定导入hive的数据库
--hive-table   			指定导入到hive中的表名
--create-hive-table 	创建hive中表,如果表不存在则创建
--delete-target-dir 	删除目标文件
sqoop import \
--connect 'jdbc:mysql://cdh01/test?useUnicode=true&characterEncoding=utf-8' \
--username root \
--password root \
--table stu \
--fields-terminated-by "\t" \
--lines-terminated-by "\n" \
--hive-import \
--hive-overwrite \
--create-hive-table  \
--delete-target-dir \
--hive-database test_sqoop \
--hive-table new_stu
```

**注意：mysql导入hive时候，如果指定了--hive-database，需要先手动创建好库。**

### 增量数据导入

每次只导入新增的数据

需要添加三个参数

```shell
--check-column		指定的增量导入数据的校验建，通常选主键   自增的
--incremental 	 	指定增量数据导入的类型：append 追加， lastmodified 最后一次修改
--last-value		知道上一次导入的最后一个校验建的值
```

案例

```shell
sqoop import \
--connect 'jdbc:mysql://cdh01/test?useUnicode=true&characterEncoding=utf-8' \
--username root \
--password root \
--table stu \
--target-dir "/sqoop/job" \
--incremental append \
--check-column  sid \
--last-value 10 \
-m 1
```

### 将hdfs导出到mysql

参数解释

```shell
导出的mysql数据库连接mysql url指定  也可以在表名之前指定
--table   指定需要导出的mysql中的表
--export-dir   指定hdfs需要导出的路径
--fields-terminated-by   指定hdfs文件的列分隔符的
bin/sqoop export \
--connect 'jdbc:mysql://cdh01/test?useUnicode=true&characterEncoding=utf-8' \		
											test表示mysql中的库名
--username root \
--password root \
--table stu2 \								导出到mysql中的哪个表，这个表需要先创建好
--export-dir '/user/hadoop/stu' \			需要导出的hdfs文件目录
--fields-terminated-by '\t' \
-m 1 \
--update-key uid \							根据uid来更新
--update-mode allowinsert					更新模式：允许插入，如果不存在的话
```

### 将hive导出到mysql

```shell
bin/sqoop export \
--connect 'jdbc:mysql://cdh01/test?useUnicode=true&characterEncoding=utf-8' \
--username root \
--password root \
--table stu \											导出到mysql的哪个表
--export-dir '/user/hive/warehouse/stu' \				需要导出的hive表在hdfs的存储路径
--input-fields-terminated-by "\t" \						指定的是hive表存储文件的列之间的分割符
-m 1
```

### 将mysql导入hbase

```shell
bin/sqoop import \
--connect 'jdbc:mysql://cdh01/test?useUnicode=true&characterEncoding=utf-8' \
--username root \
--password root \
-m 1 \
--table stu \
--hbase-create-table \					自动在hbase中创建
--hbase-table stu \
--column-family cf \					指定列簇名字
--hbase-row-key uid						指定rowkey对应的mysql主键
```

**注意：列族只能指定1个**


## 参考文章
* https://www.cnblogs.com/kyle-blog/p/14285848.html