---
title: 监控分析-慢SQL入门介绍
---

::: tip
本文主要是介绍 监控分析-慢SQL入门介绍 。
:::

[[toc]]

## mysql 慢查询 慢SQL 记录和调整
在mysql 中，可以通过设置配置参数，开启慢 SQL 的记录

在 my.cnf 的 [mysqld] 配置下，可以设置以下参数实现慢查询记录



```  shell
## 启用记录慢SQL 功能
slow_query_log=1
## 设置超过 1 秒的SQL 为慢SQL
long_query_time=1
## 将慢SQL 的信息保存 table 中
log_output=table
```



> NOTE:
>
> log_output 参数默认为：file，代表保存在文件中

如果设置了将慢SQL 保存在 table中，默认就是保存于 mysql.slow_log 表，默认的建表语句如下：



``` sql
CREATE TABLE `slow_log` (
  `start_time` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `user_host` mediumtext NOT NULL,
  `query_time` time(6) NOT NULL,
  `lock_time` time(6) NOT NULL,
  `rows_sent` int(11) NOT NULL,
  `rows_examined` int(11) NOT NULL,
  `db` varchar(512) NOT NULL,
  `last_insert_id` int(11) NOT NULL,
  `insert_id` int(11) NOT NULL,
  `server_id` int(10) unsigned NOT NULL,
  `sql_text` mediumblob NOT NULL,
  `thread_id` bigint(21) unsigned NOT NULL
) ENGINE=CSV DEFAULT CHARSET=utf8 COMMENT='Slow log'
```



## 将慢SQL 日志设置为全局查看

这里可以抖一个机灵，将这个 slow_log 的表保存于 SequoiaDB中，这样就实现了全局共享。

首先将 my.cnf 中的 slow_query_log 设置为0（关闭记录慢SQL 的功能），重启了mysql 后，进入mysql shell，将 mysql.slow_log 表删除，然后再创建为 SequoiaDB 的表



``` sql
drop table mysql.slow_log;
CREATE TABLE `slow_log` (
  `start_time` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `user_host` mediumtext NOT NULL,
  `query_time` time(6) NOT NULL,
  `lock_time` time(6) NOT NULL,
  `rows_sent` int(11) NOT NULL,
  `rows_examined` int(11) NOT NULL,
  `db` varchar(512) NOT NULL,
  `last_insert_id` int(11) NOT NULL,
  `insert_id` int(11) NOT NULL,
  `server_id` int(10) unsigned NOT NULL,
  `sql_text` mediumblob NOT NULL,
  `thread_id` bigint(21) unsigned NOT NULL
) ENGINE=SEQUOIADB DEFAULT CHARSET=utf8 COMMENT='Slow log'
```



然后再此修改 my.cnf 配置，重启mysql 后，以后mysql 的慢SQL 信息都会保存于SequoiaDB 存储引擎中，这样全局所有的mysql 节点看到的都是相同的慢SQL 了。

## mysql 记录DDL 和 DML的方式

临时设置开启记录 DDL和DML 操作

``` sql
set global log_output='table';
set global general_log=on;
关闭记录的步骤
set global general_log=off;
```

永久性打开的方式，直接修改 my.cnf 配置文件中 [mysqld] 的配置，然后重启mysql 服务

```
log_output=table
general_log=1
```

### 逆天改命 -- 骚操作

在关闭 general_log=off 设置下，将 mysql.general_log 表重建到 sequoiadb 引擎中，操作方法



``` sql
use mysql;
drop table general_log;
CREATE TABLE `general_log` (
  `event_time` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `user_host` mediumtext NOT NULL,
  `thread_id` bigint(21) unsigned NOT NULL,
  `server_id` int(10) unsigned NOT NULL,
  `command_type` varchar(64) NOT NULL,
  `argument` mediumblob NOT NULL
) ENGINE=SEQUOIADB DEFAULT CHARSET=utf8 COMMENT='General log';
```



如果所有服务器上的mysql 都做同样的操作，则所有的机器都可以看到相同的、执行过的DDL和DML 操作了。

## mysql 分析SQL 利器

很多朋友在mysql 中，分析一个SQL时，都是采用简单的 explain 方法，但是这种方法只能够查看访问计划，对于mysql 底层的数据交互的时间消耗，无法做到进一步的分析，好在mysql 自带了一个SQL执行效率分析功能，它就是

``` sql
show profiles;
```

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/mysqlop/monitorsql/intro-1.png')" alt="wxmp">

设置启用方法

``` sql
SET profiling=1;
```

这个SQL 分析功能，当然不止这些功能，你可以通过它，查看一个SQL 在各个阶段的消耗，还有服务器资源的消耗，例如：选择查看 query 1 在各个执行阶段的消耗

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/mysqlop/monitorsql/intro-2.png')" alt="wxmp">

查看query 1 对服务器的资源消耗

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/mysqlop/monitorsql/intro-3.png')" alt="wxmp">

关闭这个功能也非常简单

```
SET profiling=0;
```

## mysql 运维建议

关于mysql 的日常运维，网上的资料非常多，适合自己的才是最重要。
但是对于我个人而已，我认为想mysql 的slow query 功能，是建议打开的，原因有二
- 1 slow query 对于mysql 的消耗不算很大
- 2 slow query 的启用和关闭，只能够重启生效，对于在线业务影响非常大

而对于全面记录mysql 的DDL 和DML 操作的方法，还有记录每个sql 的执行效率的方法，我个人是建议日常关闭，等到出现了慢查询了，或者需要对系统做更加深度的检查时，才临时打开，毕竟这两个功能对mysql 自身消耗太大。如果你希望有更好的性能，那样这两个功能日常还是要关闭的。

 

### 参考文章
* https://www.cnblogs.com/chenfool/p/mysql-man-cha-xun-mansql-ji-lu-he-diao-zheng.html