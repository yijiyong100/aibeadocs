---
title: 主从复制-Centos操作案例
---

::: tip
本文主要是介绍 主从复制-Centos操作案例 。
:::

[[toc]]

## mysql数据库的主从同步

## 前言

大型网站为了软解大量的并发访问，除了在网站实现分布式负载均衡，远远不够。到了数据业务层、数据访问层，如果还是传统的数据结构，或者只是单单靠一台服务器来处理如此多的数据库连接操作，数据库必然会崩溃，特别是数据丢失的话，后果更是不堪设想。这时候，我们会考虑如何减少数据库的连接，下面就进入我们今天的主题。

利用主从数据库来实现读写分离，从而分担主数据库的压力。在多个服务器上部署mysql，将其中一台认为主数据库，而其他为从数据库，实现主从同步。其中主数据库负责主动写的操作，而从数据库则只负责主动读的操作（slave从数据库仍然会被动的进行写操作，为了保持数据一致性），这样就可以很大程度上的避免数据丢失的问题，同时也可减少数据库的连接，减轻主数据库的负载。

下面让我们来看下一个图：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/mysqlop/replication/centoscase-1.png')" alt="wxmp">


> 在上面的模型中，Mysql-A就是主服务器，即master，Mysql-B就是从服务器，即slave。
>
> 在Mysql-A的数据库事件（例如修改数据库的sql操作语句），都会存储到日志系统A中，在相应的端口（默认3306）通过网络发送给Mysql-B。Mysql-B收到后，写入本地日志系统B，然后一条条的将数据库事件在数据库Mysql-B中完成。
>
> 日志系统A，是MYSQL的日志类型中的二进制日志，也就是专门用来保存修改数据库表的所有动作，即bin log，注意MYSQL会在执行语句之后，释放锁之前，写入二进制日志，确保事务安全。
>
> 日志系统B，不是二进制日志，由于它是从MYSQL-A的二进制日志复制过来的，并不是自己的数据库变化产生的，有点接力的感觉，称为中继日志，即relay log。
>
> 通过上面的机制，可以保证Mysql-A和Mysql-B的数据库数据一致，但是时间上肯定有延迟，即Mysql-B的数据是滞后的。因此，会出现这样的问题，Mysql-A的数据库操作是可以并发的执行的，但是Mysql-B只能从relay log中一条一条的读取执行。若Mysql-A的写操作很频繁，Mysql-B很可能就跟不上了。

主从同步复制有以下几种方式：

（1）同步复制，master的变化，必须等待slave-1,slave-2,...,slave-n完成后才能返回。

（2）异步复制，master只需要完成自己的数据库操作即可，至于slaves是否收到二进制日志，是否完成操作，不用关心。MYSQL的默认设置。

（3）半同步复制，master只保证slaves中的一个操作成功，就返回，其他slave不管。这个功能，是由google为MYSQL引入的。

本文说的是在centos 7系统上，实现的mysql5.7数据库的主从同步配置，从而实现读写分离操作。

 

## 1 分别在两台centos 7系统上安装mysql 5.7

具体的安装步骤可以见此链接，https://blog.csdn.net/qq_15092079/article/details/81629238。

本文中的两台服务器的IP地址分别为主服务器（192.168.17.130）和从服务器（192.168.17.132）。

分别在这两个服务器上创建test数据库，以备后面测试。

 

## 2 master主服务器的配置

### 2.1 配置文件my.cnf的修改

``` sql
#根据上一篇文章，编辑my.cnf文件

[root@localhost mysql]## vim /etc/my.cnf

 

#在[mysqld]中添加：

server-id=1

log_bin=master-bin

log_bin_index=master-bin.index

binlog_do_db=test

#备注：

#server-id 服务器唯一标识。

#log_bin 启动MySQL二进制日志，即数据同步语句，从数据库会一条一条的执行这些语句。

#binlog_do_db 指定记录二进制日志的数据库，即需要复制的数据库名，如果复制多个数据库，重复设置这个选项即可。

#binlog_ignore_db 指定不记录二进制日志的数据库，即不需要复制的数据库名，如果有多个数据库，重复设置这个选项即可。

#其中需要注意的是，binlog_do_db和binlog_ignore_db为互斥选项，一般只需要一个即可。
```

 

### 2.2 创建从服务器的用户和权限

``` sql
#进入mysql数据库

[root@localhost mysql]## mysql -uroot -p

Enter password:

 

#创建从数据库的masterbackup用户和权限

mysql> grant replication slave on *.* to masterbackup@'192.168.17.%' identified by '123456';

#备注

#192.168.17.%通配符，表示0-255的IP都可访问主服务器，正式环境请配置指定从服务器IP

#若将 192.168.17.% 改为 %，则任何ip均可作为其从数据库来访问主服务器

 

#退出mysql

mysql> exit;
```

 

### 2.3 重启mysql服务

``` sql
[root@localhost mysql]## service mysql restart

Shutting down MySQL.... SUCCESS! 

Starting MySQL. SUCCESS! 
```

 

### 2.4 查看主服务器状态

``` sql
#进入mysql数据库

[root@localhost mysql]## mysql -uroot -p

Enter password:

 

#查看主服务器状态

mysql> show master status;

+-------------------+----------+--------------+------------------+-------------------+

| File              | Position | Binlog_Do_DB | Binlog_Ignore_DB | Executed_Gtid_Set |

+-------------------+----------+--------------+------------------+-------------------+

| master-bin.000001 |      154 | test         |                  |                   |

+-------------------+----------+--------------+------------------+-------------------+

1 row in set (0.00 sec)
```

 

## 3 slave从服务器的配置

### 3.1 配置文件my.cnf的修改

``` sql
#根据上一篇文章，编辑my.cnf文件

[root@localhost mysql]## vim /etc/my.cnf

 

#在[mysqld]中添加：

server-id=2

relay-log=slave-relay-bin

relay-log-index=slave-relay-bin.index

#replicate-do-db=test

#备注：

#server-id 服务器唯一标识，如果有多个从服务器，每个服务器的server-id不能重复，跟IP一样是唯一标识，如果你没设置server-id或者设置为0，则从服务器不会连接到主服务器。

#relay-log 启动MySQL二进制日志，可以用来做数据备份和崩溃恢复，或主服务器挂掉了，将此从服务器作为其他从服务器的主服务器。

#replicate-do-db 指定同步的数据库，如果复制多个数据库，重复设置这个选项即可。若在master端不指定binlog-do-db，则在slave端可用replication-do-db来过滤。

#replicate-ignore-db 不需要同步的数据库，如果有多个数据库，重复设置这个选项即可。

#其中需要注意的是，replicate-do-db和replicate-ignore-db为互斥选项，一般只需要一个即可。
```

 

### 3.2 重启mysql服务

``` sql
[root@localhost mysql]## service mysql restart

Shutting down MySQL.... SUCCESS! 

Starting MySQL. SUCCESS! 
```

 

### 3.3 连接master主服务器

``` sql
#进入mysql数据库

[root@localhost mysql]## mysql -uroot -p

Enter password:

 

#连接master主服务器

mysql> change master to master_host='192.168.17.130',master_port=3306,master_user='masterbackup',master_password='123456',master_log_file='master-bin.000001',master_log_pos=154;

#备注：

#master_host对应主服务器的IP地址。

#master_port对应主服务器的端口。

#master_log_file对应show master status显示的File列：master-bin.000001。

#master_log_pos对应show master status显示的Position列：154。
```

 

### 3.4 启动slave数据同步

``` sql
#启动slave数据同步

mysql> start slave;



#停止slave数据同步（若有需要）

mysql> stop slave;
```

 

### 3.5 查看slave信息

``` sql
mysql> show slave status;
```

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/mysqlop/replication/centoscase-2.png')" alt="wxmp">

Slave_IO_Running和Slave_SQL_Running都为yes，则表示同步成功。

 

## 4 测试

（1）在主服务器上登陆mysql，且进入test数据库，创建test表，且插入一条数据

提示：这里最好用数据库管理工具（如nacicat）来操作。

``` sql
#创建tb_test表

create table tb_test(ID varchar(36) primary key comment '主键ID',MEMO varchar(500) not null comment '信息');

 

#插入一条数据

insert into tb_test(ID,MEMO) values('1','one test');

 

#提交

commit;
```

 

（2）在从服务器上登陆mysql，且进入test数据库

你会发现从数据库中，也出现了tb_test表，且表中还有one test数据存在，证明同步数据成功。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/mysqlop/replication/centoscase-3.png')" alt="wxmp">

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/mysqlop/replication/centoscase-4.png')" alt="wxmp">

 

## 5 解决错误

若在主从同步的过程中，出现其中一条语句同步失败报错了，则后面的语句也肯定不能同步成功了。例如，主库有一条数据，而从库并没有这一条数据，然而，在主库执行了删除这一条数据的操作，那么从库没有这么一条数据就肯定删除不了，从而报错了。在此时的从数据库的数据同步就失败了，因此后面的同步语句就无法继续执行。

这里提供的解决方法有两种：

（1）在从数据库中，使用SET全局sql_slave_skip_counter来跳过事件，跳过这一个错误，然后执行从下一个事件组开始。

``` sql
#在从数据库上操作

mysql > stop slave;

mysql > set global sql_slave_skip_counter=1;

mysql > start slave;
```

（2）在从数据库中，重新连上主数据库。这种操作会直接跳过中间的那些同步语句，可能会导致一些数据未同步过去的问题，但这种操作也是最后的绝招。最好就是令从数据库与主数据库的数据结构和数据都一致了之后，再来恢复主从同步的操作。

``` sql
#在从数据库上操作

mysql > stop slave;

mysql> change master to master_host='192.168.17.130',master_port=3306,master_user='masterbackup',master_password='123456',master_log_file='master-bin.000001',master_log_pos=2050;

mysql > start slave;

 

#备注

#master_log_file和master_log_pos可能会不同，需要在主数据库中show master status来查看
```

 

## 6 总结

至此，mysql数据库的主从同步就完成了，至于读写分离，我们可以通过程序来实现，这里简单讲解一下实现思想。

我们可以在主服务器创建一个数据库用户（出于安全，根据需求给予相应的权限）主要用于写操作，在程序中通过这一用户连接主数据库的只用于写操作而不用读操作。

在从服务器上创建一个数据库用户（出于安全，只给予读select的权限）主要用于读操作，在程序中通过这一用户连接从数据库即可。

当然，也可以找一个组件来完成MYSQL的代理，实现SQL语句的路由，这样就不需要我们在程序上关注哪个数据库是写，哪个数据库是读的了。

### 参考文章
* https://blog.csdn.net/qq_15092079/article/details/81672920