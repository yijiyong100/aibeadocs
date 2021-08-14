---
title: 主从复制-基于binlog复制案例
---

::: tip
本文主要是介绍 主从复制-基于binlog复制案例 。
:::

[[toc]]

## mysql 主从复制 基于binlog 简单实践


> 主从复制使得数据可以从一个数据库服务器复制到其他服务器上，在复制数据时，一个服务器充当主服务器（master），其余的服务器充当从服务器（slave）。因为复制是异步进行的，所以从服务器不需要一直连接着主服务器，从服务器甚至可以通过拨号断断续续地连接主服务器。通过配置文件，可以指定复制所有的数据库，某个数据库，甚至是某个数据库上的某个表。
> 
> 原文地址：代码汇个人博客 http://www.codehui.net/info/64.html

### 主从同步机制

Mysql服务器之间的主从同步是基于二进制日志机制，主服务器使用二进制日志来记录数据库的变动情况，从服务器通过读取和执行该日志文件来保持和主服务器的数据一致。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/mysqlop/replication/intro-1.png')" alt="wxmp">


在使用二进制日志时，主服务器的所有操作都会被记录下来，然后从服务器会接收到该日志的一个副本。从服务器可以指定执行该日志中的哪一类事件（譬如只插入数据或者只更新数据），默认会执行日志中的所有语句。

每一个从服务器会记录关于二进制日志的信息：文件名和已经处理过的语句，这样意味着不同的从服务器可以分别执行同一个二进制日志的不同部分，并且从服务器可以随时连接或者中断和服务器的连接。

主服务器和每一个从服务器都必须配置一个唯一的ID号（在my.cnf文件的[mysqld]模块下有一个server-id配置项），另外，每一个从服务器还需要通过CHANGE MASTER TO语句来配置它要连接的主服务器的ip地址，日志文件名称和该日志里面的位置（这些信息存储在主服务器的数据库里）

使用主从同步的好处：

- 1、通过增加从服务器来提高数据库的性能，在主服务器上执行写入和更新，在从服务器上向外提供读功能，可以动态地调整从服务器的数量，从而调整整个数据库的性能。
- 2、提高数据安全-因为数据已复制到从服务器，从服务器可以终止复制进程，所以，可以在从服务器上备份而不破坏主服务器相应数据
- 3、在主服务器上生成实时数据，而在从服务器上分析这些数据，从而提高主服务器的性能

### 硬件要求

主从服务器操作系统版本和位数一致，主从数据库的版本要一致。

测试环境：`centos7.6`,`mysql5.5`,可以使用虚拟机或者docker安装，这里用的是`docker`环境

主服务器： **192.168.73.130**
从服务器： **192.168.73.131**

### 主服务器配置

1、修改配置文件

可以通过如下命令查看mysql读取的配置文件，顺序排前的优先



```bash
root@ba586179fe4b:/# mysql --help|grep 'my.cnf'
                      order of preference, my.cnf, $MYSQL_TCP_PORT,
/etc/my.cnf /etc/mysql/my.cnf /usr/local/mysql/etc/my.cnf ~/.my.cnf
root@ba586179fe4b:/# vi /etc/my.cnf
```

首先检查你的主服务器上的my.cnf文件中是否已经在[mysqld]模块下配置了log-bin和server-id



```bash
[mysqld]
# 设置server_id，一般设置为IP,注意要唯一
server-id=1
# 开启二进制日志功能，名字可以随便取
log-bin=mysql-bin
```

注意上面的log-bin和server-id的值都是可以改为其他值的，如果没有上面的配置，首先关闭mysql服务器，然后添加上去，接着重启服务器

2、创建用户，每一个从服务器都需要用到一个账户名和密码来连接主服务器，可以为每一个从服务器都创建一个账户，也可以让全部服务器使用同一个账户。下面就为同一个ip网段的所有从服务器创建一个只能进行主从同步的账户。

首先登陆mysql，然后创建一个用户名为rep，密码为123456的账户，该账户可以被192.168.73网段下的所有ip地址使用，且该账户只能进行主从同步



```sql 
root@ba586179fe4b:/# mysql -u root -p
...
mysql > grant replication slave on *.* to 'rep'@'192.168.73.131' identified by '123456';
```

3、获取二进制日志的信息并导出数据库，步骤：

首先登陆数据库，然后刷新所有的表，同时给数据库加上一把锁，阻止对数据库进行任何的写操作



```bash
mysql > flush tables with read lock;
```

然后执行下面的语句获取二进制日志的信息，



```sql 
mysql> show master status;
+------------------+----------+--------------+------------------+
| File             | Position | Binlog_Do_DB | Binlog_Ignore_DB |
+------------------+----------+--------------+------------------+
| mysql-bin.000001 |      352 |              |                  |
+------------------+----------+--------------+------------------+
1 row in set (0.00 sec)
```

File的值是当前使用的二进制日志的文件名，Position是该日志里面的位置信息，**记录二进制文件名(mysql-bin.000001)和位置(352)**，会在下面配置从服务器时用到。

这时可以对数据库解锁，恢复对主数据库的操作



```sql
mysql > unlock tables;
```

## 从服务器配置

1、修改配置文件



```sql 
root@ba586179fe4b:/# vi /etc/my.cnf
```

设置server-id，必须唯一，如果有多个从服务器上，那么每个服务器上配置的server-id都必须不一致。从服务器上没必要配置log-bin，当然也可以配置log-bin选项，因为可以在从服务器上进行数据备份和灾难恢复，或者某一天让这个从服务器变成一个主服务器



```sql 
[mysqld]
server-id=2
```

配置同步参数，登陆mysql，输入如下信息：(以下依次是主服务器ip、主服务器mysql端口、主服务器上配置过用来主从的用户名和密码、刚才记录的二进制文件名称和位置)



```sql 
mysql> CHANGE MASTER TO
    -> MASTER_HOST='192.168.73.130',
    -> MASTER_PORT=3306,
    -> MASTER_USER='rep',
    -> MASTER_PASSWORD='123456',
    -> MASTER_LOG_FILE='mysql-bin.000001',
    -> MASTER_LOG_POS=352;
# 或者
mysql> CHANGE MASTER TO MASTER_HOST='192.168.73.130', MASTER_PORT=3306, MASTER_USER='rep', MASTER_PASSWORD='123456', MASTER_LOG_FILE='mysql-bin.000001', MASTER_LOG_POS=352;
```

启动主从同步进程



```sql
mysql > start slave;
```

检查状态



```sql 
mysql> show slave status \G
*************************** 1. row ***************************
               Slave_IO_State: 
                  Master_Host: 192.168.73.130
                  Master_User: rep
                  Master_Port: 3306
                Connect_Retry: 60
              Master_Log_File: mysql-bin.0.000001
          Read_Master_Log_Pos: 352
               Relay_Log_File: aa0fcaec42a1-relay-bin.000001
                Relay_Log_Pos: 4
        Relay_Master_Log_File: mysql-bin.0.000001
             Slave_IO_Running: No
            Slave_SQL_Running: Yes
              Replicate_Do_DB: 
          Replicate_Ignore_DB: 
           Replicate_Do_Table: 
       Replicate_Ignore_Table: 
      Replicate_Wild_Do_Table: 
  Replicate_Wild_Ignore_Table: 
                   Last_Errno: 0
                   Last_Error: 
                 Skip_Counter: 0
          Exec_Master_Log_Pos: 352
              Relay_Log_Space: 107
              Until_Condition: None
               Until_Log_File: 
                Until_Log_Pos: 0
           Master_SSL_Allowed: No
           Master_SSL_CA_File: 
           Master_SSL_CA_Path: 
              Master_SSL_Cert: 
            Master_SSL_Cipher: 
               Master_SSL_Key: 
        Seconds_Behind_Master: NULL
Master_SSL_Verify_Server_Cert: No
                Last_IO_Errno: 1236
                Last_IO_Error: Got fatal error 1236 from master when reading data from binary log: 'Could not find first log file name in binary log index file'
               Last_SQL_Errno: 0
               Last_SQL_Error: 
  Replicate_Ignore_Server_Ids: 
             Master_Server_Id: 1
1 row in set (0.00 sec)

mysql> 
```

当`Slave_IO_Running`和`Slave_SQL_Running`都为YES的时候就表示主从同步设置成功了。但是上面`Slave_IO_Running`为No了，说明没有启动成功，网上搜的错误原因：

- 1、主服务器的网络不通，或者主服务器的防火墙拒绝了外部连接3306端口
- 2、在配置从服务器时，输错了ip地址和密码，或者主服务器在创建用户时写错了用户名和密码
- 3、在配置从服务器时，输错了主服务器的二进制日志信息

我们发现`Last_IO_Error`里面输出了错误信息:

> Got fatal error 1236 from master when reading data from binary log: 'Could not find first log file name in binary log index file'
> 
> 从二进制日志中读取数据时，来自master的致命错误1236：'无法在二进制日志索引文件中找到第一个日志文件名'

- 检查发现从服务器配置同步参数时`MASTER_LOG_FILE`多写了一个0, 这块还是要注意的。
- 然后通过`stop slave;`关闭同步进程重新配置。
- 发现`Slave_IO_Running`和`Slave_SQL_Running`都为No了，最终解决办法:



```sql 
mysql> slave stop;
Query OK, 0 rows affected, 1 warning (0.00 sec)

mysql> set GLOBAL SQL_SLAVE_SKIP_COUNTER=1;
Query OK, 0 rows affected (0.00 sec)

mysql> slave start;
Query OK, 0 rows affected (0.00 sec)
```

然后两个都为Yes了,就可以测试一下效果了。

### 测试主从复制

### 主服务器操作



```sql 
# 创建库codehui
mysql> create database codehui; 
Query OK, 1 row affected (0.00 sec)
mysql> use codehui
Database changed

# 创建表demo
mysql> CREATE TABLE `demo` (
    ->   `id` int(11) NOT NULL AUTO_INCREMENT,
    ->   `name` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
    ->   PRIMARY KEY (`id`)
    -> ) ENGINE=InnoDB DEFAULT CHARSET=latin1;
Query OK, 0 rows affected (0.01 sec)

# 添加一条数据
mysql> INSERT INTO `demo` (`name`) VALUES ('代码汇');

Query OK, 1 row affected (0.00 sec)
```

### 从服务器查看



```sql 
# 查看数据库，codehui自动生成了
mysql> show databases;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| codehui            |
| mysql              |
| performance_schema |
+--------------------+
4 rows in set (0.00 sec)

mysql> use codehui;
Database changed

# 查看表，demo表也自动创建
mysql> show tables;
+-------------------+
| Tables_in_codehui |
+-------------------+
| demo              |
+-------------------+
1 row in set (0.00 sec)

# 查看表，记录成功
mysql> select * from demo;
+----+------+
| id | name |
+----+------+
|  1 | 111  |
+----+------+
1 row in set (0.00 sec)
```

到这主从复制就完成了。

### 其他相关配置

### 主服务器

master开启二进制日志后默认记录所有库所有表的操作，可以通过配置来指定只记录指定的数据库甚至指定的表的操作，具体在mysql配置文件的[mysqld]可添加修改如下选项：



```bash
# 不同步哪些数据库  
binlog-ignore-db = mysql
binlog-ignore-db = test
binlog-ignore-db = information_schema

# 只同步哪些数据库，除此之外，其他不同步
binlog-do-db = game
```

### 从服务器



```bash
# 停止主从同步
mysql> stop slave;

# 连接断开时，重新连接超时时间
mysql> change master to master_connect_retry=50;

# 开启主从同步
mysql> start slave;
```


## 参考文章
* https://www.jianshu.com/p/5ad1f8fc00cc