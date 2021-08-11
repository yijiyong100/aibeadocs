---
title: MySQL-运维精华操作
---

::: tip
本文主要是介绍 MySQL-运维精华操作 。
:::

[[toc]]

## MySQL运维总结

> 近日支持某项目甲方运维人员做了一些数据整合，项目基于MySQL数据库，部署于客户专用内网的Linux（CentOS 7.6）服务器，这里顺便做一个MySQL常用基础运维命令总结。

## 一、本地破解root密码

由于当前数据库提供给各子项目程序使用的账户仅具有特定库的部分权限，不具备创建新用户，授权、创建或删除库的权限。且原运维人员离职，未交接root账户密码。现运维需创建新用户新库等，以支持数据脱敏工作。总之，需要更高权限，只好本地破解root账户的密码。

### Step1/4，停止数据库服务

 killall -TERM mysqld 

### Step2/4，编辑数据库配置文件

 vim /etc/my.cnf 

在mysqld节添加 skip-grant-tables 。

### Step3/4，启动数据库服务

 systemctl restart mysqld.service 

这一步遇到一个小问题，数据库启动失败，根据提示查看报错信息，是数据库日志文件没有访问权限，反复确认了日志文件权限配置为 640,mysql,mysql 是没有问题的，最后发现是其所在文件夹权限不对，不知为何被改成了644，修改为755后成功启动数据库服务。

### Step4/4，Root账户登录修改密码

 mysql -uroot -hlocalhost 

``` sql
1 use mysql ;
2 update user set authentication_string=password('newPassword') where user='root';
3 flush privileges ;
4 quit
```

如此便完成了root账户的密码修改，然后应关闭数据库服务，将数据库配置还原后再重启数据库服务。需要注意的是，破解操作期间应关闭数据库服务器网络确保安全。

## 二、常用查看语句

查看数据库版本。

 select version(); 

查看某项配置，如连接数设置。

 show variables like '%max_connections%'; 

查看当前连接信息。

 show full processlist; 

查看当前登录用户。

 select user(); 

查看数据库列表。

 show databases; 

查看所有库表，需先切换库。

 show tables; 

查看某个表结构。

 desc tablename; 

查看数据库用户列表。

```sql
select distinct concat('User: ''',user,'''@''',host,''';') as query from mysql.user order by query; 
```

查看某用户的权限。

 show grants for 'username'@'%'; 

## 三、常用创建及授权语句

root登录数据库。

 mysql -uroot -p -hlocalhost 

创建数据库db_test1。

 create database db_test1 default charset utf8mb4 collate utf8mb4_general_ci; 

**创建用户**，命令格式为：

```sql
create user 'username'@'host' identified by 'password';
```

其中 host 参数指定该用户在哪个主机上可以登陆，可以指定IP，如果是本地用户可用localhost，如果想让该用户可以从任意远程主机登陆，可以使用通配符%。

其中 password 参数为该用户的登陆密码，如果为空则该用户可以不需要密码登陆服务器。

举例，创建数据库新用户db_user1，可远程登录。

```sql
create user 'db_user1'@'%' identified by 'Abcd@1234'; 
```

**为用户授权**，命令格式为：

```sql
grant privileges on databasename.tablename to 'username'@'host' with grant option;
```

其中 privileges 参数指定用户的操作权限，如select,insert,update,delete等，如果要授予所有的权限则使用all。

其中 databasename 参数指定数据库名， tablename 参数指定数据库表名，通配符*表示所有。

其中最后的 with grant option 表示此用户可以将权限授权给其它用户。

举例，为db_user1授权全部权限。

```sql
grant all privileges on *.* to db_user1@"%" with grant option;
```

**撤销用户权限**，命令格式为：

 revoke privilege on databasename.tablename from 'username'@'host'; 

举例，撤销db_user1对数据库db_test1的删除权限。

```sql
revoke delete on db_test1.* from 'db_user1'@'%';
```

完成权限操作后需执行 flush privileges ; 。

**删除用户**，命令格式为：

 drop user 'username'@'host'; 

**删除数据库**，命令格式为：

 drop database databasename; 

## 四、备份还原及执行SQL文件等

**备份数据库**，命令格式为：

```sql
mysqldump -u username -p databasename > /tmp/bak/databasebak.sql
```

增加 --opt -d，仅备份数据库结构；

增加 -R 参数，可以导出存储过程及自定义函数；

增加 -E 参数，可以导出事件。

**还原数据库**，命令格式同执行sql文件：

```sql
mysql -u username -p databasename < /tmp/bak/databasebak.sql
```

**执行SQL文件**，命令格式为：

```sql
mysql -u username -p databasename < /tmp/1.sql
```

也可以登录并切换至目标库后，使用命令 source /tmp/**1**.sql 执行sql文件。

两者的区别是使用source命令执行遇到报错不会中止，而使用<执行遇到报错会中止，所以推荐使用<的方式。

**使用pager**将sql执行结果重定向输出到文件，pager是MySQL的一项强大且易用的功能，用法丰富，比如有时需要专网运维在内网帮忙查询生产数据，查询后拍照传递结果，当查询结果数据量稍大时很不方便，这种情况就可以用pager功能将查询结果重定向输出到文件中再发送邮件，避免了Linux系统编码问题、ssh终端编码问题、手机拍照不清晰、多屏内容拍不全等问题。

```sql
pager cat > /tmp/1.log
```

 

## 五、配置文件 

Centos 7中 MySQL 配置文件位置确认，使用命令：

```
ps aux|grep mysql|grep 'my.cnf'
```

如果没有输出内容则是使用默认配置位置。

默认 my.cnf 配置文件的位置，使用命令查看：

```sql
mysql --help|grep 'my.cnf' 
```

输出结果为：

```sql
/etc/my.cnf、/etc/mysql/my.cnf、 /usr/local/etc/my.cnf、 ~/.my.cnf
```

顺序排前的优先。

下面附一份配置文件 cat /etc/my.cnf ：





```sql
[mysqld]
datadir=/var/lib/mysql
socket=/var/lib/mysql/mysql.sock

symbolic-links=0

log-error=/var/log/mysql/mysqld.log
pid-file=/var/run/mysqld/mysqld.pid

sql_mode ='STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION'
character_set_server=utf8mb4
default-time_zone = '+8:00'
log_timestamps = SYSTEM
explicit_defaults_for_timestamp=off  # 应用兼容问题，不能开启

slow_query_log=1
slow_query_log_file=/var/log/mysql/mysqld-slow.log
long_query_time=1

server-id=1  #只对serverid 配置

skip-name-resolve
open_files_limit=65535
table_open_cache=2048
table_open_cache_instances=1

# log-bin=/data/mysql-binlog/mysql-bin  # 开启binlog，主库开启，从库不开启。
# relay-log=relay-bin # 从库开启中继日志，主库不开启。
# expire_logs_days = 30   # 过期binlog天数，优化binlog磁盘占用，看情况开启。
# binlog-ignore-db=mysql  # 忽略的数据库，一般不选择。

binlog_cache_size = 4M
key_buffer_size = 128M
read_buffer_size = 32M
max_connections=10240
max_allowed_packet=50M

#read_only=1 #从库只读开启
[client]
host=mysqlserverip
user=test
password="Abcd@1234"
[mysqldump]
host=mysqlserverip
user=test
password="Abcd@1234"
```



 

## 参考文章
* https://www.cnblogs.com/jiujiduilie/p/14086597.html