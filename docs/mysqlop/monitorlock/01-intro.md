---
title: 监控分析-锁监控介绍
---

::: tip
本文主要是介绍 监控分析-锁监控开启等知识 。
:::

[[toc]]

## 详解mysql数据库一键查看锁信息（开启InnoDB监控）

## 概述

很多时候在[MySQL](https://www.isolves.com/it/sjk/MYSQL/)处理死锁问题时，由于show engine innodb status输出来的死锁日志无任务事务上下文，并不能很好地诊断相关事务所持有的所有锁信息，包括：锁个数、锁类型等。

下面介绍如何开启锁监控来查看到更详细的事务锁占用情况。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/mysqlop/monitorlock/intro-1.png')" alt="wxmp">


------

## 1、INNODB监控机制(InnoDB Monitors)

mysql提供一套INNODB监控机制，用于周期性(每15钞)输出INNODB运行相关状态(INNODB运行状态、表空间状态、表状态等)到mysqld服务标准错误输出。另外，INNODB标准监控和锁监控，也可以通过命令：show engine innodb status输出到控制台。

此部分内容一般输出到mysql error log里。

官方说明：

> When you enable InnoDB monitors for periodic output, InnoDB writes their output to the mysqld server standard error output (stderr). In this case, no output is sent to clients. When switched on, InnoDB monitors print data about every 15 seconds. Server output usually is directed to the error log (see Section 5.4.2, “The Error Log”). This data is useful in performance tuning. On [windows](https://www.isolves.com/it/rj/czxt/windows/), start the server from a command prompt in a console window with the --console option if you want to direct the output to the window rather than to the error log.

该类监控机制默认是关闭状态，分析问题需要查看监控日志时再开启。

建议分析问题后，将监控关闭；否则，每15秒输出一次INNODB运行状态信息到错误日志，会使用日志变得特别大。

------

## 2、开启状态监控

INNODB监控机制目前主要提供如下四类监控：

标准监控(Standard InnoDB Monitor)：监视活动事务持有的表锁、行锁；事务锁等待；线程信号量等待；文件IO请求；buffer pool统计信息；InnoDB主线程purge和change buffer merge活动。

锁监控(InnoDB Lock Monitor)：提供额外的锁信息。

表空间监控(InnoDB Tablespace Monitor)：显示共享表空间中的文件段以及表空间数据结构配置验证。

表监控(InnoDB Table Monitor)：显示内部数据字典的内容。

关于四类监控开启与关闭方法，主要是通过创建系统可识读的特殊表名来完成。特别地，除表空间(InnoDB Tablespace Monitor)监控和表监控(InnoDB Table Monitor)外，其他二类监控还可能通过修改系统参数来完成。

基于系统表的方式和基于系统参数的方式，只要使用二者其中一种方式开启监控即可。

------

### 2.1. 标准监控(Standard InnoDB Monitor)

2.1.1、基于系统表：innodb_monitor

mysql会通过检查是否存在名为innodb_monitor的数据表，来判断是否开启标准监控，并打印日志。

需要开启，则创建表；需要关闭，则删除表。

``` sql
CREATE TABLE innodb_monitor (a INT) ENGINE=INNODB;
DROP TABLE innodb_monitor;
```

2.1.2、基于系统参数：innodb_status_output

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/mysqlop/monitorlock/intro-2.png')" alt="wxmp">

 

自mysql 5.6.16版本之后，可以通过设置系统参数(innodb_status_output)的方式开启或者关闭标准监控。

``` sql
set GLOBAL innodb_status_output=ON;
set GLOBAL innodb_status_output=OFF;
```

### 2.2. 开启锁监控(InnoDB Lock Monitor)

2.2.1、基于系统表：innodb_lock_monitor

mysql会通过检查是否存在名为innodb_lock_monitor的数据表，来判断是否开启锁监控，并打印日志。

需要开启，则创建表；需要关闭，则删除表。

``` sql
CREATE TABLE innodb_lock_monitor (a INT) ENGINE=INNODB;
DROP TABLE innodb_lock_monitor;
```

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/mysqlop/monitorlock/intro-3.png')" alt="wxmp">

 

2.2.2、基于系统参数：innodb_status_output_locks

自mysql 5.6.16版本之后，可以通过设置系统参数(innodb_status_output_locks)的方式开启或者关闭标准监控。

``` sql
--前提需要开启 innodb_status_output
set GLOBAL innodb_status_output=ON;
set GLOBAL innodb_status_output_locks=ON;
set GLOBAL innodb_status_output_locks=OFF;
```

### 2.3. 开启表空间监控(InnoDB Tablespace Monitor)

基于系统表：innodb_tablespace_monitor

mysql会通过检查是否存在名为innodb_tablespace_monitor的数据表，来判断是否开启表空间监控，并打印日志。

需要开启，则创建表；需要关闭，则删除表。

``` sql
CREATE TABLE innodb_tablespace_monitor (a INT) ENGINE=INNODB;
DROP TABLE innodb_tablespace_monitor;
```

注：表空间监控暂不支持通过参数方式配置，并且未来会被废弃。

### 2.4. 开启表监控(InnoDB Table Monitor)

mysql会通过检查是否存在名为innodb_table_monitor的数据表，来判断是否开启表监控，并打印日志。

需要开启，则创建表；需要关闭，则删除表。

``` sql
CREATE TABLE innodb_table_monitor (a INT) ENGINE=INNODB;
DROP TABLE innodb_table_monitor;
```

注：表监控暂不支持通过参数方式配置，并且未来会被废弃。

------

## 3、注意事宜

### 3.1. 监控复位

需要特别注意的一点是：mysql服务重启后，需要重启开启相应监控，才会生效。换句话说，服务重启后，之前配置的所有监控都被复位，处于关闭状态。

基于系统表方式开启的监控，在mysql服务重启后，即使表存在，监控也不会生效。需要重启drop表，再create表，才能使监控生效。

基于系统参数方式开启的监控，在mysql服务重启后，相关系统参数值都是OFF。需要重启设置对应的参数，才能使用监控生效。

### 3.2. 错误日志大小

不在停机或重启情况下，mysql每15秒输出一次INNODB运行状态信息到错误日志。

这会使用日志变得越来越大。建议在需要的时候开启，不需要的时候关闭掉。

### 参考文章
* https://www.isolves.com/it/sjk/MYSQL/2019-09-27/5459.html