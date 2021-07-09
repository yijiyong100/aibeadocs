---
title: MySQL-存储引擎
---

::: tip
本文主要是介绍 MySQL-存储引擎 。
:::

[[toc]]

 MySQL的存储引擎

## 一.存储引擎简介

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/db/mysqlbasic/storage-1.png')" alt="wxmp">

1、文件系统：

 1.1 操作系统组织和存取数据的一种机制。

 1.2 文件系统是一种软件。

2、文件系统类型：ext2 3 4 ，xfs 数据

 2.1 不管使用什么文件系统，数据内容不会变化

 2.2 不同的是，存储空间、大小、速度。

3、MySQL引擎：

 3.1 可以理解为，MySQL的“文件系统”，只不过功能更加强大。

4、MySQL引擎功能：

 4.1 除了可以提供基本的存取功能，还有更多功能事务功能、锁定、备份和恢复、优化以及特殊功能

**总之，存储引擎的各项特性就是为了保障数据库的安全和性能设计结构。**

## 二.MySQL自带的存储引擎类型

> **MySQL 提供以下存储引擎:**
> **01）InnoDB**
>
> **02）MyISAM**
> 03）MEMORY
> 04）ARCHIVE
> 05）FEDERATED
> 06）EXAMPLE
> 07）BLACKHOLE
> 08）MERGE
> 09）NDBCLUSTER
> 10）CSV

------

> **还可以使用第三方存储引擎:**
> 01）MySQL当中插件式的存储引擎类型
> 02）MySQL的两个分支
> 03）perconaDB
> 04）mariaDB

```bash
#查看当前MySQL支持的存储引擎类型
mysql> show engines
#查看innodb的表有哪些
mysql> select table_schema,table_name,engine from information_schema.tables where engine='innodb';
#查看myisam的表有哪些
mysql> select table_schema,table_name,engine from information_schema.tables where engine='myisam';
```

**1、innodb和myisam的区别**

*物理上的区别：*

```bash
# myisam
#进入mysql目录
[root@db01~l]# cd /application/mysql/data/mysql
#查看所有user的文件
[root@db01 mysql]# ll user.*
-rw-rw---- 1 mysql mysql 10684 Mar  6  2017 user.frm
-rw-rw---- 1 mysql mysql   960 Aug 14 01:15 user.MYD
-rw-rw---- 1 mysql mysql  2048 Aug 14 01:15 user.MYI

# innodb
#进入word目录
[root@db01 world]# cd /application/mysql/data/world/
#查看所有city的文件
[root@db01 world]# ll city.*
-rw-rw---- 1 mysql mysql   8710 Aug 14 16:23 city.frm
-rw-rw---- 1 mysql mysql 688128 Aug 14 16:23 city.ibd
```

**2.innodb存储引擎的简介**

**在MySQL5.5版本之后，默认的存储引擎，提供高可靠性和高性能。**

> 优点:
> 01）事务安全（遵从 ACID）
> 02）MVCC（Multi-Versioning Concurrency Control，多版本并发控制）
> 03）InnoDB 行级别锁定
> 04）Oracle 样式一致非锁定读取
> 05）表数据进行整理来优化基于主键的查询
> 06）支持外键引用完整性约束
> 07）大型数据卷上的最大性能
> 08）将对表的查询与不同存储引擎混合
> 09）出现故障后快速自动恢复
> 10）用于在内存中缓存数据和索引的缓冲区池

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/db/mysqlbasic/storage-2.png')" alt="wxmp">

**innodb核心特性**

> 重点:
> MVCC
> 事务
> 行级锁
> 热备份
> Crash Safe Recovery（自动故障恢复）

**3.查看存储引擎**

1）使用 SELECT 确认会话存储引擎

``` sql
#查询默认存储引擎
SELECT @@default_storage_engine;
+--------------------------+
| @@default_storage_engine |
+--------------------------+
| InnoDB                   |
+--------------------------+
```

2）使用 SHOW 确认每个表的存储引擎

``` sql
#查看表的存储引擎
show create table city\G
show create table world.countrylanguage;
```

3）使用 INFORMATION_SCHEMA 确认每个表的存储引擎

``` sql
#查看表的存储引擎
select table_name, engine from information_schema.tables where table_name = 'city' and table_schema = 'world'\G
```

**4.存储引擎的设置**

1）在启动配置文件中设置服务器存储引擎

```bash
#在配置文件的[mysqld]标签下添加
[mysqld]
default-storage-engine=<Storage Engine>

[mysqld]
default-storage-engine=innodb
```

2）使用 SET 命令为当前客户机会话设置

``` sql
#在MySQL命令行中临时设置
SET @@storage_engine=<Storage Engine>

mysql> SET @@storage_engine=myisam;
Query OK, 0 rows affected, 1 warning (0.00 sec)
```

（3）在 create table 语句指定

``` sql
#建表的时候指定存储引擎
CREATE TABLE t (i INT) ENGINE = <Storage Engine>;￼
```

## 三.真实企业案例

**项目背景：**

公司原有的架构：一个展示型的网站，LAMT，MySQL5.1.77版本（MYISAM），50M数据量。

**小问题不断：**

- 1、表级锁：对表中任意一行数据修改类操作时，整个表都会锁定，对其他行的操作都不能同时进行。
- 2、不支持故障自动恢复（CSR）：当断电时有可能会出现数据损坏或丢失的问题。

**如何解决：**

- 1、提建议将现有的MYISAM引擎替换为Innodb，将版本替换为5.6.38
  - 1）如果使用MYISAM会产生”小问题”，性能安全不能得到保证，使用innodb可以解决这个问题。
  - 2）5.1.77版本对于innodb引擎支持不够完善，5.6.38版本对innodb支持非常完善了。
- 2、实施过程和注意要素

1）备份生产库数据（mysqldump）

```bash
[root@db01 ~]# mysql -uroot -p1
mysql> use test1

#创建程序业务库
create table test1(id int) engine=myisam;
create table test2(id int) engine=myisam;
create table test3(id int) engine=myisam;

[root@db01 ~]# mysqldump -uroot -p1 -B test1 > /tmp/full.sql
```

2）准备一个新的MySQL环境 5.6.44 版本

3）更改数据，将myisam替换成innodb

```bash
[root@db01 ~]# sed -i 's#ENGINE=MyISAM#ENGINE=InnoDB#g' /tmp/full.sql
[root@db01 ~]# vim /tmp/full.sql 
:%s#MyISAM#InnoDB#g
```

4）将修改后的sql文件恢复到新库里

``` sql
[root@db01 ~]# scp /tmp/full.sql root@172.16.1.52:/tmp/
[root@db02 ~]# mysql -uroot -p123 < /tmp/full.sql 
#或者
[root@db01 test]# mysql -uroot -p123 -h 10.0.0.52 < /tmp/full.sql 

[root@db02 ~]# mysql -uroot -p123
mysql> show databases;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| mysql              |
| performance_schema |
| test               |
| test1              |
+--------------------+

mysql> select table_schema,table_name,engine from information_schema.tables where engine='innodb';
+--------------+----------------------+--------+
| table_schema | table_name           | engine |
+--------------+----------------------+--------+
| mysql        | innodb_index_stats   | InnoDB |
| mysql        | innodb_table_stats   | InnoDB |
| mysql        | slave_master_info    | InnoDB |
| mysql        | slave_relay_log_info | InnoDB |
| mysql        | slave_worker_info    | InnoDB |
| test1        | test1                | InnoDB |
| test1        | test2                | InnoDB |
| test1        | test3                | InnoDB |
+--------------+----------------------+--------+
```

5）应用测试环境连接新库，测试所有功能

6）停应用，将备份之后的生产库发生的新变化，补偿到新库

7）应用割接到新数据库

**项目结果：**

*解决了”小问题” *

## 四.Innodb存储引擎——表空间介绍

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/db/mysqlbasic/storage-3.png')" alt="wxmp">

**5.5版本以后出现共享表空间概念**

表空间的管理模式的出现是为了数据库的存储更容易扩展

**5.6版本中默认的是独立表空间**

- **1、共享表空间**

1）查看共享表空间

```bash
#物理查看
[root@db01 ~]# ll /application/mysql/data/
-rw-rw---- 1 mysql mysql 79691776 Aug 14 16:23 ibdata1

#命令行查看
mysql> show variables like '%path%';
+-----------------------+------------------------+
| Variable_name         | Value                  |
+-----------------------+------------------------+
| innodb_data_file_path | ibdata1:12M:autoextend |
+-----------------------+------------------------+

#查看共享表空间大小
[root@db01 data]# du -sh ibdata1
76M	ibdata1
```

> 5.6版本中默认存储:
> 1.系统数据
> 2.undo
> 3.临时表

**5.7版本中默认会将undo和临时表独立出来，5.6版本也可以独立，只不过需要在初始化的时候进行配置**

2）设置方法

```bash
#编辑配置文件
[root@db01 ~]# vim /etc/my.cnf
[mysqld]
innodb_data_file_path=ibdata1:50M;ibdata2:50M:autoextend
```

- **2、独立表空间**

对于用户自主创建的表，会采用此种模式，每个表由一个独立的表空间进行管理

1）查看独立表空间

```bash
#物理查看
[root@db01 ~]# ll /application/mysql/data/world/
-rw-rw---- 1 mysql mysql 688128 Aug 14 16:23 city.ibd
#命令行查看
mysql> show variables like '%per_table%';
innodb_file_per_table=ON
```

------

**企业案例**

在没有备份数据的情况下，突然断电导致表损坏，打不开数据库。

```bash
#模拟环境拷贝库目录到新库中
[root@db01 data]# tar czf world.tgz world
[root@db01 data]# scp world.tgz 172.16.1.52:/application/mysql/data/
[root@db02 ~]# cd /application/mysql/data/
[root@db02 data]# tar xf world.tgz 
#登陆数据库查看
[root@db02 ~]# mysql -uroot -p123
mysql> show databases;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| mysql              |
| performance_schema |
| test               |
| test1              |
| world              |
+--------------------+

mysql> use world
mysql> show tables;
+-----------------+
| Tables_in_world |
+-----------------+
| city            |
| country         |
| countrylanguage |
+-----------------+

# 查询表中数据
mysql> select * from city;
ERROR 1146 (42S02): Table 'world.city' doesn't exist
```

1.在企业中管开发要建表语句

``` sql
#创建新表city1
mysql> show create table world.city;
CREATE TABLE `city1` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Name` char(35) NOT NULL DEFAULT '',
  `CountryCode` char(3) NOT NULL DEFAULT '',
  `District` char(20) NOT NULL DEFAULT '',
  `Population` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`ID`),
  KEY `CountryCode` (`CountryCode`),
  KEY `idx_pop` (`Population`)
 #删除外键创建语句
 #CONSTRAINT `city_ibfk_1` FOREIGN KEY (`CountryCode`) REFERENCES `country` (`Code`)
  ) ENGINE=InnoDB AUTO_INCREMENT=4080 DEFAULT CHARSET=latin1;

mysql> show tables;
+-----------------+
| Tables_in_world |
+-----------------+
| city            |
| city1           |
| country         |
| countrylanguage |
+-----------------+
```

2.删除新表的，独立表空间

```bash
# 删除表空间文件
mysql> alter table world.city1 discard tablespace;
[root@db02 world]#  ll
total 1092
-rw-rw---- 1 mysql mysql   8710 Nov  8 01:52 city1.frm
#-rw-rw---- 1 mysql mysql 131072 Nov  7 21:11 city1.ibd（已删除）
-rw-rw---- 1 mysql mysql   8710 Nov  7 23:17 city.frm
-rw-rw---- 1 mysql mysql 671744 Nov  7 23:17 city.ibd
-rw-rw---- 1 mysql mysql   9172 Nov  4 11:49 country.frm
-rw-rw---- 1 mysql mysql 163840 Nov  4 11:49 country.ibd
-rw-rw---- 1 mysql mysql   8702 Nov  4 11:49 countrylanguage.frm
-rw-rw---- 1 mysql mysql 229376 Nov  4 11:49 countrylanguage.ibd
-rw-rw---- 1 mysql mysql     61 Nov  4 11:49 db.opt
```

3.拷贝旧表的独立表空间

```bash
[root@db02 world]# cp -a city.ibd city1.ibd
[root@db02 world]# ll
total 1748
-rw-rw---- 1 mysql mysql   8710 Nov  8 01:52 city1.frm
-rw-r----- 1 mysql mysql  671744 Nov  8 01:54 city1.ibd
-rw-rw---- 1 mysql mysql   8710 Nov  7 23:17 city.frm
-rw-rw---- 1 mysql mysql 671744 Nov  7 23:17 city.ibd
-rw-rw---- 1 mysql mysql   9172 Nov  4 11:49 country.frm
-rw-rw---- 1 mysql mysql 163840 Nov  4 11:49 country.ibd
-rw-rw---- 1 mysql mysql   8702 Nov  4 11:49 countrylanguage.frm
-rw-rw---- 1 mysql mysql 229376 Nov  4 11:49 countrylanguage.ibd
-rw-rw---- 1 mysql mysql     61 Nov  4 11:49 db.opt
mysql> select * from city1;
ERROR 1814 (HY000): Tablespace has been discarded for table 'city1'
```

4.导入独立表空间

``` sql
mysql> alter table city1 import tablespace;
```

5.物理删除 旧表

``` sql
[root@db02 world]# rm -fr city.*
```

6.改表名

``` sql
mysql> alter table city1 rename city;
```

7.如果是新库，那么最后一步，还是 应用割接（修改代码连库的IP）

## 五.Innodb核心特性——事务

- **1.什么是事务**

*主要针对DML语句（update，delete，insert）*

> 一组数据操作执行步骤，这些步骤被视为一个工作单元:
> 1）用于对多个语句进行分组
> 2）可以在多个客户机并发访问同一个表中的数据时使用

------

> 所有步骤都成功或都失败
> 1）如果所有步骤正常，则执行
> 2）如果步骤出现错误或不完整，则取消

- **2.事务的通俗理解**

*伴随着“交易”出现的数据库概念。*

> 我们理解的“交易”是什么？
> 1）物与物的交换（古代）
> 2）货币现金与实物的交换（现代1）
> 3）虚拟货币与实物的交换（现代2）
> 4）虚拟货币与虚拟实物交换（现代3）

------

> 数据库中的“交易”是什么？
> 1）事务又是如何保证“交易”的“和谐”？
> 2）ACID

- **3.事务ACID特性**

------

Atomic（原子性）
所有语句作为一个单元全部成功执行或全部取消。

Consistent（一致性）
如果数据库在事务开始时处于一致状态，则在执行该。 事务期间将保留一致状态。

Isolated（隔离性）
事务之间不相互影响。

Durable（持久性）
事务成功完成后，所做的所有更改都会准确地记录在 数据库中。所做的更改不会丢失。

------

- **4.事务流程举例**
<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/db/mysqlbasic/storage-4.png')" alt="wxmp">
- **5.事务的控制语句**

> 如下:
> start transaction;（或 begin;）：显式开始一个新事务
> SAVEPOINT：分配事务过程中的一个位置，以供将来引用（存档）
> COMMIT：永久记录当前事务所做的更改
> ROLLBACK：取消当前事务所做的更改
> ROLLBACK TO SAVEPOINT：取消在 savepoint 之后执行的更改（读挡）
> RELEASE SAVEPOINT：删除 savepoint 标识符（删档）
> SET AUTOCOMMIT：为当前连接禁用或启用默认 autocommit 模式

**一个成功事务的生命周期**
begin;
sql1
sql2
sql3
...
commit;

**一个失败事务的生命周期**
begin;
sql1
sql2
sql3
...
rollback;

- **3.自动提交**

``` sql
#查看自动提交
mysql> show variables like 'autocommit';
+---------------+-------+
| Variable_name | Value |
+---------------+-------+
| autocommit    | OFF   |
+---------------+-------+

#临时关闭
mysql> set autocommit=0;
#永久关闭
[root@db01 world]# vim /etc/my.cnf
[mysqld]
autocommit=0
```

- **4.事务演示**

1）成功事务

``` sql
mysql> create table stu(id int,name varchar(10),
sex enum('f','m'),
money int);
mysql> begin;
mysql> insert into stu(id,name,sex,money) 
values(1,'zhang3','m',100), (2,'zhang4','m',110);
mysql> commit;
```

2）事务回滚

``` sql
mysql> begin;
mysql> update stu set name='zhang3';
mysql> delete from stu;
mysql> rollback;
```

- **6.事务隐式提交情况**

1）现在版本在开启事务时，不需要手工begin，只要你输入的是DML语句，就会自动开启事务。
2）有些情况下事务会被隐式提交

> 例如:
> 在事务运行期间，手工执行begin的时候会自动提交上个事务
> 在事务运行期间，加入DDL、DCL操作会自动提交上个事务
> 在事务运行期间，执行锁定语句（lock tables、unlock tables）
> load data infile
> select for update xxx set xxx where xx=xxx;
> 在autocommit=1的时候

- **7.事务日志redo基本功能**

**1）Redo是什么？**

redo,顾名思义“重做日志”，是事务日志的一种。

**2）作用是什么？**

在事务ACID过程中，实现的是“D”持久化的作用。
<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/db/mysqlbasic/storage-5.png')" alt="wxmp">

**特性:WAL(Write Ahead Log)日志优先写**
**REDO：记录的是，内存数据页的变化过程**

**3）REDO工作过程**

``` sql
#执行步骤
update t1 set num=2 where num=1; 
```

1）首先将t1表中num=1的行所在数据页加载到内存中buffer page
2）MySQL实例在内存中将num=1的数据页改成num=2
3）num=1变成num=2的变化过程会记录到，redo内存区域，也就是redo buffer page中

``` sql
#提交事务执行步骤
commit; 
```

1）当敲下commit命令的瞬间，MySQL会将redo buffer page写入磁盘区域redo log
2）当写入成功之后，commit返回ok

- **8.redo数据实例恢复过程**

图解

- **9.事务日志undo**

**1）undo是什么？**

undo,顾名思义“回滚日志”，是事务日志的一种。

_**2）作用是什么？**

在事务ACID过程中，实现的是“A”原子性的作用。当然CI的特性也和undo有关

原子性：你的事务 要么全部成功，要么全部取消

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/db/mysqlbasic/storage-6.png')" alt="wxmp">

- **10.redo和undo的存储位置**

```bash
#redo位置
[root@db01 data]# ll /application/mysql/data/
-rw-rw---- 1 mysql mysql 50331648 Aug 15 06:34 ib_logfile0
-rw-rw---- 1 mysql mysql 50331648 Mar  6  2017 ib_logfile1
#undo位置
[root@db01 data]# ll /application/mysql/data/
-rw-rw---- 1 mysql mysql 79691776 Aug 15 06:34 ibdata1
-rw-rw---- 1 mysql mysql 79691776 Aug 15 06:34 ibdata2
```

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/db/mysqlbasic/storage-7.png')" alt="wxmp">

**在MySQL5.6版本中undo是在ibdata文件中，在MySQL5.7版本会独立出来。**

- **11.事务中的锁**

**1）什么是“锁”？**

“锁”顾名思义就是锁定的意思。

**2）“锁”的作用是什么？**

在事务ACID特性过程中，“锁”和“隔离级别”一起来实现“I”隔离性的作用。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/db/mysqlbasic/storage-8.png')" alt="wxmp">

排他锁：保证在多事务操作时，数据的一致性。

共享锁：保证在多事务工作期间，数据查询时不会被阻塞。

悲观锁：同时修改数据，谁先修改谁为准

乐观锁：谁先提交谁为准

- **12.多版本并发控制（MVCC）**

1）只阻塞修改类操作，不阻塞查询类操作 （排它锁和共享锁）
2）乐观锁的机制（谁先提交谁为准）

- **13.锁的粒度**
  MyIsam：低并发锁（表级锁）
  Innodb：高并发锁（行级锁）
- **14.事务的隔离级别**

*四种隔离级别：*

READ UNCOMMITTED（独立提交）
允许事务查看其他事务所进行的未提交更改

READ COMMITTED
允许事务查看其他事务所进行的已提交更改

REPEATABLE READ******
确保每个事务的 SELECT 输出一致
InnoDB 的默认级别

SERIALIZABLE
将一个事务的结果与其他事务完全隔离

``` sql
#查看隔离级别
mysql> show variables like '%iso%';
+---------------+-----------------+
| Variable_name | Value           |
+---------------+-----------------+
| tx_isolation  | REPEATABLE-READ |
+---------------+-----------------+

#修改隔离级别为RU
[mysqld]
transaction_isolation=read-uncommit
mysql> use oldboy
mysql> select * from stu;
mysql> insert into stu(id,name,sex,money) values(2,'li4','f',123);
#修改隔离级别为RC
[mysqld]
transaction_isolation=read-commit
```

脏读 幻读 重复读 查询原因，和解决办法

```bash
脏读:一个事务读到另外一个事务还没有提交的数据。
解决方法：把事务隔离级别调整到READ COMMITTED

不可重复读:一个事务先后读取同一条记录，但两次读取的数据不同。
解决方法：把事务隔离级别调整到REPEATABLE READ。

幻象读:一个事务先后读取一个范围的记录，但两次读取的纪录数不同。
解决方法：把事务隔离级别调整到SERIALIZABLE。

1, 脏读
一个事务读到另一个事务，尚未提交的修改，就是脏读。这里所谓的修改，除了Update操作,不要忘了,还包括
Insert和Delete操作。
脏读的后果：如果后一个事务回滚，那么它所做的修改，统统都会被撤销。前一个事务读到的数据，就是垃圾数据。

举个例子：预订房间。
有一张Reservation表，往表中插入一条记录，来订购一个房间。
事务1：在Reservation表中插入一条记录，用于预订99号房间。
事务2：查询，尚未预定的房间列表，因为99号房间，已经被事务1预订。所以不在列表中。
事务1：信用卡付款。由于付款失败，导致整个事务回滚。所以插入到Reservation 表中的记录并不置为持久（即它将被删除）。现在99号房间则为可用。所以，事务2所用的是一个无效的房间列表，因为99号房间，已经可用。如果它是最后一个没有被预定的房间，那么这将是一个严重的失误。

注：脏读的后果很严重。

2，不可重复读。
在同一个事务中，再次读取数据时【就是你的select操作】，所读取的数据，和第1次读取的数据，不一样了。就是不可重复读。
举个例子：
事务1：查询99号房间是否为双人床房间。结果99号是。
事务2：将99号房间，改成单人床房间。
事务1：再次执行查询，99号房间不是双人房了。也就是说，事务1，可以看到其他事务所做的修改。

在不可重复读里面，可以看到其他事务所做的修改，而导致2次的查询结果不再一样了。
这里的修改，是提交过的。也可以是没有提交的，这种情况同时也是脏读。

如果，数据库系统的隔离级别允许不可重复读。那么你启动一个事务，并做一个select查询操作。查询到的数据，就有可能，和你第2次，3次...n次，查询到的数据不一样。一般情况下，你只会做一次，select查询，并以这一次的查询数据，作为后续计算的基础。因为允许出现，不可重复读。那么任何时候，查询到的数据，都有可能被其他事务更新，查询的结果将是不确定的。
注：如果允许不可重复读，你的查询结果将是不确定的。一个不确定的结果，你能容忍吗？

3，幻读
事务1读取指定的where子句所返回的一些行。然后，事务2插入一个新行，这个新行也满足事务1使用的查询where子句。然后事务1再次使用相同的查询读取行，但是现在它看到了事务2刚插入的行。这个行被称为幻象，因为对事务1来说，这一行的出现是不可思议的。

举个例子：
事务1：请求没有预定的，双人床房间列表。99号在其中。
事务2：向Reservation表中插入一个新纪录，以预订99号房间，并提交。
事务1：再次请求有双人床的未预定的房间列表，99号房间，不再位于列表中。

注：幻读，针对的是，Insert操作。如果事务2，插入的记录，没有提交。那么同时也是脏读。
```




## 参考文章
* 