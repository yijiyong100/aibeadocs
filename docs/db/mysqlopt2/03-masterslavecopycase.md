---
title: 主从复制案例
---

::: tip
本文主要是介绍 主从复制案例 。
:::

[[toc]]

## 第一步：开启所有MYSQL服务器的BIN日志
每台服务器设置一个唯一的server-id的值(默认是1，一般取IP最后一段)

修改主服务器(master)的my.cnf

``` sql
[mysqld]
log-bin=mysql-bin
server-id=91
```

修改从服务器(slave)的my.cnf

``` sql
[mysqld]
log-bin=mysql-bin
server-id=92
```

## 第二步：重启主和从服务器

``` sql
service mysqld restart
```

## 第三步：在主服务器上创建一个用来同步数据的帐号

(如下边的test_slave，%表示所有客户端都可能连)

``` sql
GRANT replication slave ON *.* TO 'test_slave'@'%' IDENTIFIED BY '123456';
flush privileges;
```

## 第四步：登录主服务器的mysql，查询master的状态

``` sql
show master status
```

见到如下所示

``` sql
+------------------+----------+--------------+------------------+
| File             | Position | Binlog_Do_DB | Binlog_Ignore_DB |
+------------------+----------+--------------+------------------+
| mysql-bin.000025 |      700 |              |                  | 
+------------------+----------+--------------+------------------+
```

## 第五步：配置从服务器状态



``` sql
stop slave;

change master to
master_host='192.168.1.91',
master_user='test_slave',
master_password='123456',
master_log_file='mysql-bin.000025',
master_log_pos=700;

start slave;
```



解释：
MASTER_HOST='主服务器的IP地址',
MASTER_USER='主服务器上用于同步数据的账号',
MASTER_PASSWORD='同步的账号的密码',
MASTER_LOG_FILE='bin日志的文件名',
MASTER_LOG_POS=bin日志中的position的值;

## 第六步：查看从服务器状态

``` sql
show slave status\G
```

出现



``` sql
* 1. row *
               Slave_IO_State: Waiting for master to send event
                  Master_Host: 192.168.1.91
                  Master_User: slave
                  Master_Port: 3306
                Connect_Retry: 60
              Master_Log_File: mysql-bin.000025
          Read_Master_Log_Pos: 700
               Relay_Log_File: bogon-relay-bin.000002
                Relay_Log_Pos: 342
        Relay_Master_Log_File: mysql-bin.000025
             Slave_IO_Running: Yes
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
          Exec_Master_Log_Pos: 700
              Relay_Log_Space: 498
              Until_Condition: None
               Until_Log_File: 
                Until_Log_Pos: 0
           Master_SSL_Allowed: No
           Master_SSL_CA_File: 
           Master_SSL_CA_Path: 
              Master_SSL_Cert: 
            Master_SSL_Cipher: 
               Master_SSL_Key: 
        Seconds_Behind_Master: 0
Master_SSL_Verify_Server_Cert: No
                Last_IO_Errno: 0
                Last_IO_Error: 
               Last_SQL_Errno: 0
               Last_SQL_Error: 
  Replicate_Ignore_Server_Ids: 
             Master_Server_Id: 1
1 row in set (0.00 sec)
```



如果Slave_IO_Running: Yes Slave_SQL_Running: Yes代表成功
一般出现这句Slave_IO_State: Waiting for master to send event 也代表成功

 

附：主主复制即相互设置对方为自己的主服务器和从服务器，有点绕，原理就是反过来设置一遍
ID冲突的\解决\办法：每台服务器的ID都不同：可以设置ID开始的数字和每次加几
让1台服务器的自增ID 1,3,5,7来增长,另1台服务器自增ID 2,4,6,8来增长
第一台服务器(192.168.1.91)：

``` sql
set global auto_increment_increment = 2;
set global auto_increment_offset = 1;
set session auto_increment_increment = 2;
set session auto_increment_offset = 1; 
```

第二台服务器(192.168.1.92)：

``` sql
set global auto_increment_increment = 2;
set global auto_increment_offset = 2;
set session auto_increment_increment=2;
set session auto_increment_offset = 2; 
```

注意：auto-increment-increment和auto-increment-offset要写到配置文件中，防止下次重启后失效

``` sql
auto_increment_increment=2; #每次加几
auto_increment_offset=1; #第一个数从几开始，如第一台从1开始，第二台从2开始
```



## 参考文章
* https://www.cnblogs.com/chenqionghe/p/4305229.html