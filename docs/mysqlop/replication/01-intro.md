---
title: 主从复制-基础介绍
---

::: tip
本文主要是介绍 主从复制-基础知识 。
:::

[[toc]]

## mysql主从复制

## 一、MySql介绍

MySQL作为世界上使用最为广泛的数据库之一，免费是其原因之一。但不可忽略的是它本身的功能的确很强大。随着技术的发展，在实际的生产环境中，由单台MySQL数据库服务器不能满足实际的需求。

此时数据库集群就很好的解决了这个问题了。采用MySQL分布式集群，能够搭建一个高并发、负载均衡的集群服务器。在此之前我们必须要保证每台MySQL服务器里的数据同步。

数据同步我们可以通过MySQL内部配置就可以轻松完成，主要有主从(master slave )复制和主主复制。

## 二、主从复制介绍

在MySQL集群环境中，可以分为主节点与从节点，通过主从复制可以实现数据备份、故障转移、MySQL集群、高可用、读写分离等。

MySQL的主从复制是MySQL本身自带的一个功能，不需要额外的第三方软件就可以实现，其复制功能并不是copy文件来实现的，而是借助binlog日志文件里面的SQL命令实现的主从复制，可以理解为我再Master端执行了一条SQL命令，那么在Salve端同样会执行一遍，从而达到主从复制的，同步数据的效果。

理解图:

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/mysqlop/replication/basic/1114349-20190423061441625-1607710015.png')" alt="wxmp">

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/mysqlop/replication/basic/1114349-20190423061453248-928946935.png')" alt="wxmp">

## 三、主从复制原理

Mysql 中有一种日志叫做 bin 日志（二进制日志）。这个日志会记录下所有修改了数据库的SQL 语句（insert,update,delete,create/alter/drop table, grant 等等）。

MySQL的主从复制是MySQL本身自带的一个功能，不需要额外的第三方软件就可以实现，其复制功能并不是copy文件来实现的，而是借助binlog日志文件里面的SQL命令实现的主从复制，

可以理解为我再Master端执行了一条SQL命令，那么在Salve端同样会执行一遍，从而达到主从复制的效果。

从库生成两个线程，一个I/O线程，一个SQL线程； i/o线程去请求主库 的binlog，并将得到的binlog日志写到relay log（中继日志） 文件中；

主库会生成一个 log dump 线程，用来给从库 i/o线程传binlog； SQL 线程，会读取relay log文件中的日志，并解析成具体操作，来实现主从的操作一致，而最终数据一致；

### 复制流程图（来自网络）:

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/mysqlop/replication/basic/1114349-20190423062939722-1628806265.png')" alt="wxmp">

### 自己理解画图:

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/mysqlop/replication/basic/1114349-20190423063036293-1210088248.png')" alt="wxmp">

###  复制过程:

- 1、主节点必须启用二进制日志，记录任何修改了数据库数据的事件。
- 2、从节点开启一个线程（I/O Thread)把自己扮演成 mysql 的客户端，通过 mysql 协议，请求主节点的二进制日志文件中的事件
- 3、主节点启动一个线程（dump Thread），检查自己二进制日志中的事件，跟对方请求的位置对比，如果不带请求位置参数，则主节点就会从第一个日志文件中的第一个事件一个一个发送给从节点。
- 4、从节点接收到主节点发送过来的数据把它放置到中继日志（Relay log）文件中。并记录该次请求到主节点的具体哪一个二进制日志文件内部的哪一个位置（主节点中的二进制文件会有多个，在后面详细讲解）。
- 5、从节点启动另外一个线程（sql Thread ），把 Relay log 中的事件读取出来，并在本地再执行一次。

## 复制中线程的作用：

#### 从节点：

- I/O Thread: 从 Master 节点请求二进制日志事件，并保存于中继日志中。
- Sql Thread: 从Relay log 中读取日志事件并在本地完成重放。

#### 主节点：

Dump Thread:为每个 Slave 的 I/O Thread 启动一个 dump 线程，用于向从节点发送二进制事件。

**思考**：从节点需要建立二进制日志文件吗？

看情况，如果从节点需要作为其他节点的主节点时，是需要开启二进制日志文件的。这种情况叫做级联复制。如果只是作为从节点，则不需要创建二进制文件。

### Mysql复制特点：

1、异步复制：主节点中一个用户请求一个写操作时，主节点不需要把写的数据在本地操作完成同时发送给从服务器并等待从服务器反馈写入完成，再响应用户。

主节点只需要把写入操作在本地完成，就响应用户。但是，从节点中的数据有可能会落后主节点，可以使用（很多软件来检查是否落后）
2、主从数据不一致。

### 主从复制配置过程：

#### 主服务器节点 

- 1. 启用二进制日志。
- 2. 为当前节点设置一个全局唯一的server_id。
- 3. 创建有复制权限的用户账号 REPLIACTION SLAVE ,REPLIATION CLIENT。

 vi /etc/my.cnf 新增以下内容

``` ini
server_id=177  ###服务器id
log-bin=mysql-bin   ###开启日志文件
```

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/mysqlop/replication/basic/1114349-20190423063948711-294274019.png')" alt="wxmp">

重启mysql服务 service mysqld restart

验证是否已经配置成功

show variables like '%server_id%';

能够查询对应配置文件中的server_id 说明已经配置成功,如下图:

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/mysqlop/replication/basic/1114349-20190423064032348-230922687.png')" alt="wxmp">

show master status;

能够看到同步的文件，和行数 说明已经配置成功。如图

 <img class= "zoom-custom-imgs" :src="$withBase('/assets/img/mysqlop/replication/basic/1114349-20190423064125113-2111901069.png')" alt="wxmp">

#### 从服务节点:

​      1、克隆服务器

​      2、启动中继日志。

​      3、为当前节点设置一个全局唯一的server_id。

​      4、使用有复制权限的用户账号连接至主节点，并启动复制线程。

```ini
vi /etc/my.cnf
server_id=178  ###从服务器server_id
log-bin=mysql-bin  ###日志文件同步方式
binlog_do_db=test   ###同步数据库
```

 <img class= "zoom-custom-imgs" :src="$withBase('/assets/img/mysqlop/replication/basic/1114349-20190423064737209-1645335312.png')" alt="wxmp">

重启mysql服务 service mysqld restart

验证是否已经配置成功

show variables like '%server_id%';

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/mysqlop/replication/basic/1114349-20190423065312586-309654211.png')" alt="wxmp">

能够查询对应配置文件中的server_id 说明已经配置成功

从服务器同步主服务器配置

``` ini
CHANGE MASTER TO MASTER_HOST='192.168.80.135',MASTER_USER='root',MASTER_PASSWORD='root',
         MASTER_LOG_FILE='mysql-bin.000004',MASTER_LOG_POS=415
```

参数详解： 
- master_host： 主服务器的IP 
- master_user： 主服务器上新创建的用户名 
- master_password： 用户的密码 
- master_port： 主服务器的端口，如果未曾修改，默认即可。 
- master_log_file： 主服务器二进制日志文件的名称，填写查看主服务器的master状态时显示的File的值 
- master_log_pos： 日志的位置，填写查看主服务器的master状态时显示的Position的值

开始同步 

start slave

检查从服务器复制功能状态

SHOW SLAVE STATUS

主要看这Slave_IO_Running、Slave_SQL_Running状态，为Yes则表明设置成功。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/mysqlop/replication/basic/1114349-20190423071422267-369613912.png')" alt="wxmp">

Slave_IO_Running：连接到主库，并读取主库的日志到本地，生成本地日志文件

Slave_SQL_Running:读取本地日志文件，并执行日志里的SQL命令。

 如果如下错误:

Fatal error: The slave I/O thread stops because master and slave have equal MySQL server UUIDs; these UUIDs must be different for replication to work.

解决办法

因为服务器克隆的时候交UUID产生了重复 ，解决办法

Cat  /etc/my.cnf

cd /var/lib/mysql

rm -rf auto.cnf

重启服务器即可

service mysqld restart

 

### 参考文章
* https://www.cnblogs.com/cxyyh/p/10754231.html