---
title: 监控分析-慢SQL辅助工具
---

::: tip
本文主要是介绍 监控分析-慢SQL辅助工具 。
:::

[[toc]]

## MySQL慢日志查询分析方法与工具

## MySQL日志介绍

MySQL中的日志包括：错误日志、二进制日志、通用查询日志、慢查询日志等等。这里主要介绍下比较常用的两个功能：通用查询日志和慢查询日志。

1）通用查询日志：记录建立的客户端连接和执行的语句。

2）慢查询日志：记录所有执行时间超过long_query_time秒的所有查询或者不使用索引的查询

MySQL日志文件系统的组成
- a、[错误日志](http://blog.csdn.net/leshami/article/details/39759849)：记录启动、运行或停止mysqld时出现的问题。
- b、[通用日志](http://blog.csdn.net/leshami/article/details/39779225)：记录建立的客户端连接和执行的语句。
- c、更新日志：记录更改数据的语句。该日志在MySQL 5.1中已不再使用。
- d、[二进制日志](http://blog.csdn.net/leshami/article/details/39801867)：记录所有更改数据的语句。还用于复制。
- e、[慢查询日志](http://write.blog.csdn.net/postedit/39829605)：记录所有执行时间超过long_query_time秒的所有查询或不使用索引的查询。
- f、Innodb日志：innodb redo log

 缺省情况下，所有日志创建于mysqld数据目录中。
- 可以通过刷新日志，来强制mysqld来关闭和重新打开日志文件（或者在某些情况下切换到一个新的日志）。
- 当你执行一个FLUSH LOGS语句或执行mysqladmin flush-logs或mysqladmin refresh时，则日志被老化。
- 对于存在MySQL复制的情形下，从复制服务器将维护更多日志文件，被称为接替日志。

同大多数关系型数据库一样，日志文件是MySQL数据库的重要组成部分。MySQL有几种不同的日志文件，通常包括错误日志文件，二进制日志，通用日志，慢查询日志，等等。这些日志可以帮助我们定位mysqld内部发生的事件，数据库性能故障，记录数据的变更历史，用户恢复数据库等等。今天我们要讲的是如何分析和查询mysql慢日志（主要影响程序调用和前端数据呈现）。

mysql slow log 是用来记录执行时间较长(超过long_query_time秒)的sql的一种日志工具

## 启用 slow log 

有两种启用方式:

1, 在my.cnf 里 通过 log-slow-queries[=file_name]

2, 在mysqld进程启动时,指定--log-slow-queries[=file_name]选项

### 比较的五款常用工具 

mysqldumpslow, mysqlsla, myprofi, mysql-explain-slow-log, mysqllogfilter

开源的MySQL慢日志查询监控工

pmm server、Navicat、mysqltop（天兔Lepus）、Box Anemometer、explain、pt-query-digest

慢查询日志
- 慢查询日志是将mysql服务器中影响数据库性能的相关SQL语句记录到日志文件，通过对这些特殊的SQL语句分析，改进以达到提高数据库性能的目的。
- 通过使用--slow_query_log[={0|1}]选项来启用慢查询日志。所有执行时间超过long_query_time秒的SQL语句都会被记录到慢查询日志。
- 缺省情况下hostname-slow.log为慢查询日志文件安名，存放到数据目录，同时缺省情况下未开启慢查询日志。
- 缺省情况下数据库相关管理型SQL(比如OPTIMIZE TABLE、ANALYZE TABLE和ALTER TABLE)不会被记录到日志。
- 对于管理型SQL可以通过--log-slow-admin-statements开启记录管理型慢SQL。
- mysqld在语句执行完并且所有锁释放后记入慢查询日志。记录顺序可以与执行顺序不相同。获得初使表锁定的时间不算作执行时间。
  
- 可以使用mysqldumpslow命令获得日志中显示的查询摘要来处理慢查询日志。
- 用查询缓存处理的查询不加到慢查询日志中，表有零行或一行而不能从索引中受益的查询也不写入慢查询日志。
- MySQL服务器按以下顺序记录SQL是否写入到慢查询日志
 a. The query must either not be an administrative statement, or --log-slow-adminstatements must have been specified.
 b. The query must have taken at least long_query_time seconds, or log_queries_not_using_indexes must be enabled and the query used no indexes for row lookups.
  c. The query must have examined at least min_examined_row_limit rows.
 d. The query must not be suppressed according to the log_throttle_queries_not_using_indexes setting.## dumpslow 慢查询的工具

[mysql](https://www.2cto.com/database/MySQL/)dumpslow是mysql自带的用来分析慢查询的工具，当然不止这一种工具，还有percona-toolkit是percona公司出的一组命令行工具的集合，用来执行各种通过手工执行非常复杂和麻烦的mysql相关任务，包含以下内容：

检查master和slave数据一致性/记录有效的归档/服务器信息汇总/分析和统计日志,为了省事这块使用mysqldumpslow命令做分析。

需要开启mysql的慢查询日志，否则无法进行统计分析，开启mysql慢查询日志需要在mysql的配置文件中进行如下配置：

```ini
slow_query_log=1#定义超过1秒的查询计数到变量Slow_queries
        
slow-query-log-file=mysql-slow.log
        
long_query_time=1
```

## 慢SQL日志查看

### 1.1 简介

开启慢查询日志，可以让MySQL记录下查询超过指定时间的语句，通过定位分析性能的瓶颈，才能更好的优化数据库系统的性能。

### 1.2 登录数据库查看

```shell
[root@localhost lib]# mysql –uroot
```

因为没有设置设置密码，有密码的在 mysql –uroot –p 接密码

### 1.2.1 进入MySql 查询是否开了慢查询

```sql
mysql> show variables like 'slow_query%';
 
+---------------------+--------------------------------------------+
 
| Variable_name    | Value                   |
 
+---------------------+--------------------------------------------+
 
| slow_query_log   | OFF                    |
 
| slow_query_log_file | /application/mysql/data/localhost-slow.log |
 
+---------------------+--------------------------------------------+
 
2 rows in set (0.00 sec)
```

参数说明：

1. slow_query_log 慢查询开启状态 OFF 未开启 ON 为开启
2. slow_query_log_file 慢查询日志存放的位置（这个目录需要MySQL的运行帐号的可写权限，一般设置为MySQL的数据存放目录）

### 1.2.2 查看慢查询超时时间

```sql
mysql> show variables like 'long%';
 
+-----------------+-----------+
 
| Variable_name  | Value   |
 
+-----------------+-----------+
 
| long_query_time | 10.000000 |
 
+-----------------+-----------+
 
1 row in set (0.00 sec)
```

long_query_time 查询超过多少秒才记录  默认10秒 修改为1秒

### 1.3 修改方法1：（不推荐）

方法一：优点临时开启慢查询，不需要重启数据库 缺点：MySql 重启慢查询失效

推荐：根据业务需求，建议使用第二种，临时可以用第一种

默认情况下slow_query_log的值为OFF，表示慢查询日志是禁用的，可以通过设置slow_query_log的值来开启，如下所示：：是否开启慢查询日志，1表示开启，0表示关闭。

### 1.3.1 查看是否开启慢查询

```sql
mysql> show variables like '%slow_query_log%';
 
+---------------------+--------------------------------------------+
 
| Variable_name    | Value                   |
 
+---------------------+--------------------------------------------+
 
| slow_query_log   | OFF                    |
 
| slow_query_log_file | /application/mysql/data/localhost-slow.log |
 
+---------------------+--------------------------------------------+
 
2 rows in set (0.01 sec)
```

输入 语句修改（重启后失效，建议在/etc/my.cnf中修改永久生效）

```sql
mysql> set global slow_query_log=1;
 
Query OK, 0 rows affected (0.11 sec)
```

### 1.3.2 再次查看

```sql
mysql> show variables like '%slow_query_log%';
 
+---------------------+--------------------------------------------+
 
| Variable_name    | Value                   |
 
+---------------------+--------------------------------------------+
 
| slow_query_log   | ON                     |
 
| slow_query_log_file | /application/mysql/data/localhost-slow.log |
 
+---------------------+--------------------------------------------+
 
2 rows in set (0.00 sec)
```

### 1.4 修改方法2：（推荐）

修改 MySql 慢查询，好多人不知道my.cnf 路径，可以用 find 查找

备注：我的MySQL 是编译的 路径为 /etc/my.cnf （一般都是这里）

```shell
[root@localhost log]# find / -type f -name "my.cnf"

/application/mysql-5.5.51/mysql-test/suite/rpl/my.cnf

/application/mysql-5.5.51/mysql-test/suite/federated/my.cnf

/application/mysql-5.5.51/mysql-5.5.51-linux2.6-x86_64/mysql-test/suite/rpl/my.cnf

/application/mysql-5.5.51/mysql-5.5.51-linux2.6-x86_64/mysql-test/suite/federated/my.cnf

/etc/my.cnf  ###（一般都是这里）
```

### 1.4.1.1 修改

``` shell
[root@localhost log]# vim /etc/my.cnf
```

找到 [mysqld] 下面添加

```ini
slow_query_log =1

slow_query_log_file=/application/mysql/data/localhost-slow.log

long_query_time = 1
```

参数说明：

1. slow_query_log 慢查询开启状态 1 为开启
2. slow_query_log_file 慢查询日志存放的位置
3. long_query_time 查询超过多少秒才记录  默认10秒 修改为1秒

修改完重启MySQL

### 1.5 查看、测试

### 1.5.1.1 插入一条测试慢查询

```sql
mysql> select sleep(2);
 
+----------+
 
| sleep(2) |
 
+----------+
 
|    0 |
 
+----------+
 
1 row in set (2.00 sec)
```

### 1.5.1.2 查看慢查询日志

``` shell
[root@localhost data]# cat /application/mysql/data/localhost-slow.log

/application/mysql/bin/mysqld, Version: 5.5.51-log (MySQL Community Server (GPL)). started with:

Tcp port: 3306 Unix socket: /tmp/mysql.sock

Time         Id Command  Argument

/application/mysql/bin/mysqld, Version: 5.5.51-log (MySQL Community Server (GPL)). started with:

Tcp port: 3306 Unix socket: /tmp/mysql.sock

Time         Id Command  Argument

/application/mysql/bin/mysqld, Version: 5.5.51-log (MySQL Community Server (GPL)). started with:

Tcp port: 3306 Unix socket: /tmp/mysql.sock

Time         Id Command  Argument

# Time: 170605 6:37:00

# User@Host: root[root] @ localhost []

# Query_time: 2.000835 Lock_time: 0.000000 Rows_sent: 1 Rows_examined: 0

SET timestamp=1496615820;

select sleep(2);
```

### 1.5.1.3 通过MySQL命令查看有多少慢查询

```sql
mysql> show global status like '%Slow_queries%';
 
+---------------+-------+
 
| Variable_name | Value |
 
+---------------+-------+
 
| Slow_queries | 1   |
 
+---------------+-------+
 
1 row in set (0.00 sec)
 
```

### 1.6 日志分析工具mysqldumpslow

在生产环境中，如果要手工分析日志，查找、分析SQL，显然是个体力活，MySQL提供了日志分析工具mysqldumpslow
``` shell
mysql> show variables like '%slow%';
+---------------------+-------------------------+
| Variable_name    | Value          |
+---------------------+-------------------------+
| log_slow_queries  | ON            |
| slow_launch_time  | 2             |
| slow_query_log   | ON             |
| slow_query_log_file | D:/log/slow.txt    |
+---------------------+-------------------------+

其中,各参数说明如下:

slow_launch_time: 慢查询超过的执行时间值

slow_query_log: 是否打开慢查询日志功能

show_query_log_file:慢查询日志目录 

开启慢查询日志功能:

mysql配置文件(win mysql.ini linux mysql.conf)下,

[mysqld]

log-slow-queries ="D:/xampp/mysql/long.txt"
long_query_time = 1

log-slow-queries=/var/lib/mysql/slowquery.log (指定日志文件存放位置，可以为空，系统会给一个缺省的文件host_name-slow.log)
long_query_time=2 (记录超过的时间，默认为10s)
log-queries-not-using-indexes (log下来没有使用索引的query,可以根据情况决定是否开启)
log-long-format (如果设置了，所有没有使用索引的查询也将被记录)## 不同的慢查询日志分析工具比对 
```

## 慢SQL日志分析工具比较


### mysqldumpslow

mysql官方提供的慢查询日志分析工具. 输出图表如下:



主要功能是, 统计不同慢sql的

出现次数(Count), 

执行最长时间(Time), 

累计总耗费时间(Time), 

等待锁的时间(Lock), 

发送给客户端的行总数(Rows), 

扫描的行总数(Rows), 

用户以及sql语句本身(抽象了一下格式, 比如 limit 1, 20 用 limit N,N 表示).

### mysqlsla 

hackmysql.com推出的一款日志分析工具(该网站还维护了 mysqlreport, mysqlidxchk 等比较实用的mysql工具)

整体来说, 功能非常强大. 数据报表,非常有利于分析慢查询的原因, 包括执行频率, 数据量, 查询消耗等.

格式说明如下:

总查询次数 (queries total), 去重后的sql数量 (unique)

输出报表的内容排序(sorted by)

最重大的慢sql统计信息, 包括 平均执行时间, 等待锁时间, 结果行的总数, 扫描的行总数.

Count, sql的执行次数及占总的slow log数量的百分比.

Time, 执行时间, 包括总时间, 平均时间, 最小, 最大时间, 时间占到总慢sql时间的百分比.

95% of Time, 去除最快和最慢的sql, 覆盖率占95%的sql的执行时间.

Lock Time, 等待锁的时间.

95% of Lock , 95%的慢sql等待锁时间.

Rows sent, 结果行统计数量, 包括平均, 最小, 最大数量.
Rows examined, 扫描的行数量.

Database, 属于哪个数据库

Users, 哪个用户,IP, 占到所有用户执行的sql百分比

Query abstract, 抽象后的sql语句

Query sample, sql语句

除了以上的输出, 官方还提供了很多定制化参数, 是一款不可多得的好工具.

### mysql-explain-slow-log

德国人写的一个perl脚本.
http://www.willamowius.de/mysql-tools.html





功能上有点瑕疵, 不仅把所有的 slow log 打印到屏幕上, 而且统计也只有数量而已. 不推荐使用.

### mysql-log-filter

google code上找到的一个分析工具.提供了 python 和 php 两种可执行的脚本.
http://code.google.com/p/mysql-log-filter/



功能上比官方的mysqldumpslow, 多了查询时间的统计信息(平均,最大, 累计), 其他功能都与 mysqldumpslow类似.
特色功能除了统计信息外, 还针对输出内容做了排版和格式化, 保证整体输出的简洁. 喜欢简洁报表的朋友, 推荐使用一下.

### myprofi 
纯php写的一个开源分析工具.项目在 sourceforge 上.
http://myprofi.sourceforge.net/

 

功能上, 列出了总的慢查询次数和类型, 去重后的sql语句, 执行次数及其占总的slow log数量的百分比.
从整体输出样式来看, 比mysql-log-filter还要简洁. 省去了很多不必要的内容. 对于只想看sql语句及执行次数的用户来说, 比较推荐.

### 工具推荐比较总结 

| 工具/功能              | 一般统计信息 | 高级统计信息 | 脚本          | 优势                                |
| ---------------------- | ------------ | ------------ | ------------- | ----------------------------------- |
| mysqldumpslow          | 支持         | 不支持       | perl          | mysql官方自带                       |
| mysqlsla               | 支持         | 支持         | perl          | 功能强大,数据报表齐全,定制化能力强. |
| mysql-explain-slow-log | 支持         | 不支持       | perl          | 无                                  |
| mysql-log-filter       | 支持         | 部分支持     | python or php | 不失功能的前提下,保持输出简洁       |
| myprofi                | 支持         | 不支持       | php           | 非常精简                            |

【参考资料】

1、MySQL 慢查询日志分析及可视化结果 – 运维生存时间 http://www.ttlsa.com/mysql/mysql-slow-query-log-analysis-and-visualization-of-results/

2、Mysql 慢日志分析系统搭建 —— Box Anemometer_SleePerSir_新浪博客 http://blog.sina.com.cn/s/blog_c2839d2a0102wkuv.html

3、mysql性能监控软件 慢日志分析利器 - pmm server https://blog.csdn.net/john1337/article/details/70855293

4、MySQL 慢查询日志(Slow Query Log) - CSDN博客 https://blog.csdn.net/leshami/article/details/39829605

5、关于MySQL 通用查询日志和慢查询日志分析 - CSDN博客 https://blog.csdn.net/timchen525/article/details/75268151

6、mysql 慢日志分析工具pt-query-digest - CSDN博客 https://blog.csdn.net/stevendbaguo/article/details/47612359
## 参考文章
* https://blog.csdn.net/enweitech/article/details/80239189