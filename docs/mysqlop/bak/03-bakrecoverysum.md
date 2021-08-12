---
title: 备份与恢复-精华知识总结
---

::: tip
本文主要是介绍 备份与恢复-精华知识总结 。
:::

[[toc]]

## mysql备份与恢复

## 1. 二进制格式mysql安装

``` shell
//下载二进制格式的mysql软件包
[root@cl ~]# cd /usr/src/
[root@cl src]# wget https://downloads.mysql.com/archives/get/file/mysql-5.7.22-linux-glibc2.12-x86_64.tar.gz
--2018-08-13 23:56:27--  https://downloads.mysql.com/archives/get/file/mysql-5.7.22-linux-glibc2.12-x86_64.tar.gz
Resolving downloads.mysql.com (downloads.mysql.com)... 137.254.60.14
Connecting to downloads.mysql.com (downloads.mysql.com)|137.254.60.14|:443... connected.
HTTP request sent, awaiting response... 302 Found
Location: https://cdn.mysql.com/archives/mysql-5.7/mysql-5.7.22-linux-glibc2.12-x86_64.tar.gz [following]
......
Saving to: ‘mysql-5.7.22-linux-glibc2.12-x86_64.tar.gz’

100%[=====================================>] 643,790,848 2.46MB/s   in 4m 20s

2018-08-14 00:00:50 (2.36 MB/s) - ‘mysql-5.7.22-linux-glibc2.12-x86_64.tar.gz’saved [643790848/643790848]


//创建用户和组
[root@cl src]# groupadd -r mysql
[root@cl src]# useradd -M -s /sbin/nologin -g mysql mysql


//解压软件至/usr/local/
[root@clcl src]# ls
debug  kernels  mysql-5.7.22-linux-glibc2.12-x86_64.tar.gz
[root@clcl src]# tar xf mysql-5.7.22-linux-glibc2.12-x86_64.tar.gz -C /usr/local/
[root@clcl ~]# ls /usr/local/
bin  games    lib    libexec                              sbin   src
etc  include  lib64  mysql-5.7.22-linux-glibc2.12-x86_64  share
[root@clcl ~]# cd /usr/local/
[root@clcl local]# ln -sv mysql-5.7.22-linux-glibc2.12-x86_64/ mysql
‘mysql’ -> ‘mysql-5.7.22-linux-glibc2.12-x86_64/’
[root@clcl local]# ll
total 0
drwxr-xr-x. 2 root root   6 Mar 10  2016 bin
drwxr-xr-x. 2 root root   6 Mar 10  2016 etc
drwxr-xr-x. 2 root root   6 Mar 10  2016 games
drwxr-xr-x. 2 root root   6 Mar 10  2016 include
drwxr-xr-x. 2 root root   6 Mar 10  2016 lib
drwxr-xr-x. 2 root root   6 Mar 10  2016 lib64
drwxr-xr-x. 2 root root   6 Mar 10  2016 libexec
lrwxrwxrwx  1 root root  36 Aug 14 16:00 mysql -> mysql-5.7.22-linux-glibc2.12-x86_64/
drwxr-xr-x  9 root root 129 Aug 14 00:16 mysql-5.7.22-linux-glibc2.12-x86_64
drwxr-xr-x. 2 root root   6 Mar 10  2016 sbin
drwxr-xr-x. 5 root root  49 Jun 13 19:03 share
drwxr-xr-x. 2 root root   6 Mar 10  2016 src


//修改目录/usr/local/mysql的属主属组
[root@clcl ~]# chown -R mysql.mysql /usr/local/mysql
[root@clcl ~]# ll /usr/local/mysql -d
lrwxrwxrwx 1 mysql mysql 36 Aug 14 16:00 /usr/local/mysql -> mysql-5.7.22-linux-glibc2.12-x86_64/



//添加环境变量
[root@clcl ~]# ls /usr/local/mysql
bin  COPYING  docs  include  lib  man  README  share  support-files
[root@clcl ~]# echo 'export PATH=/usr/local/mysql/bin:$PATH' > /etc/profile.d/mysql.sh
[root@clcl ~]# . /etc/profile.d/mysql.sh
[root@clcl ~]# echo $PATH
/usr/local/mysql/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/root/bin



//建立数据存放目录
[root@cl mysql]# mkdir /opt/data
[root@cl mysql]# chown -R mysql.mysql /opt/data/
[root@cl mysql]# ll /opt/
total 0
drwxr-xr-x 2 mysql mysql 6 Aug 14 16:54 data



//初始化数据库
[root@localhost ~]# /usr/local/mysql/bin/mysqld --initialize --user=mysql --datadir=/opt/data/
2018-08-15T07:57:46.168380Z 0 [Warning] TIMESTAMP with implicit DEFAULT value is deprecated. Please use --explicit_defaults_for_timestamp server option (see documentation for more details).
2018-08-15T07:57:50.542516Z 0 [Warning] InnoDB: New log files created, LSN=45790
2018-08-15T07:57:50.927286Z 0 [Warning] InnoDB: Creating foreign key constraint system tables.
2018-08-15T07:57:51.071260Z 0 [Warning] No existing UUID has been found, so we assume that this is the first time that this server has been started. Generating a new UUID: e8600890-a060-11e8-b1a2-000c294c50b4.
2018-08-15T07:57:51.074566Z 0 [Warning] Gtid table is not ready to be used. Table 'mysql.gtid_executed' cannot be opened.
2018-08-15T07:57:51.078089Z 1 [Note] A temporary password is generatedfor root@localhost: /Tw,fZyuq4db
//请注意，这个命令的最后会生成一个临时密码，此处密码是/Tw,fZyuq4db
//再次注意，这个密码是随机的，你的不会跟我一样，一定要记住这个密码，因为一会登录时会用到





//生成配置文件
[root@cl ~]# cat > /etc/my.cnf <<EOF
> [mysqld]
> basedir = /usr/local/mysql
> datadir = /opt/data
> socket = /tmp/mysql.sock
> port = 3306
> pid-file = /opt/data/mysql.pid
> user = mysql
> skip-name-resolve
> EOF

[root@cl ~]# cat /etc/my.cnf
[mysqld]
basedir = /usr/local/mysql
datadir = /opt/data
socket = /tmp/mysql.sock
port = 3306
pid-file = /opt/data/mysql.pid
user = mysql
skip-name-resolve



//配置服务启动脚本
[root@cl ~]# cp -a /usr/local/mysql/support-files/mysql.server /etc/init.d/mysqld
[root@cl ~]# sed -ri 's#^(basedir=).*#\1/usr/local/mysql#g' /etc/init.d/mysqld
[root@cl ~]# sed -ri 's#^(datadir=).*#\1/opt/data#g' /etc/init.d/mysqld




//启动mysql
[root@cl ~]# /etc/init.d/mysqld start
Starting MySQL.Logging to '/opt/data/localhost.localdomain.err'.
 SUCCESS! 
[root@cl ~]# ps -ef|grep mysql
root       1521      1  0 01:58 pts/0    00:00:00 /bin/sh /usr/local/mysql/binmysqld_safe --datadir=/opt/data --pid-file=/opt/data/mysql.pid
mysql      1699   1521  0 01:58 pts/0    00:00:00 /usr/local/mysql/bin/mysqld --basedir=/usr/local/mysql --datadir=/opt/data --plugin-dir=/usr/local/mysql/lib/plugin --user=mysql --log-error=localhost.localdomain.err --pid-file=/opt/data/mysql.pid --socket=/tmp/mysql.sock --port=3306
root       1734   1301  0 01:59 pts/0    00:00:00 grep --color=auto mysql
[root@cl ~]# ss -antl
State       Recv-Q Send-Q Local Address:Port               Peer Address:Port
LISTEN      0      128         *:22                      *:*
LISTEN      0      100    127.0.0.1:25                      *:*
LISTEN      0      128        :::22                     :::*
LISTEN      0      100       ::1:25                     :::*
LISTEN      0      80         :::3306                   :::* 
 
 

//修改密码
//使用临时密码登录
[root@cl ~]# /usr/local/mysql/bin/mysql -uroot -p
Enter password:
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 2
Server version: 5.7.22

Copyright (c) 2000, 2018, Oracle and/or its affiliates. All rights reserved.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

mysql> 

//设置新密码
mysql> set password = password('cljhfy');
Query OK, 0 rows affected, 1 warning (0.00 sec)
```

## 1.1破解密码以及无密码登录

### 1.1.1破解密码

``` shell
[root@cl ~]# vim /etc/my.cnf
[mysqld]
skip-grant-tables        //增加这一行，然后重启服务
[root@cl ~]# mysql

mysql> use mysql;
mysql> select * from user \G
*************************** 1. row ***************************
-----//密码
 authentication_string: *376C8403A2C3233B69F4763C3E428E4ED7314D42
-----

 
mysql> UPDATE user SET password（或authentication_string）=password("123456") WHERE user='root';  
mysql> flush privileges;
 
mysql> exit;
```

### 1.1.2无密码登录

``` shell
[root@cl ~]# vim .my.cnf 
[client]
user=root //你要无秘登录的用户
password=cl //用户的密码
```

### 1.1.3定义不同的客户端

``` shell
[mysql]                        //给/usr/local/mysql/bin/mysql使用
user="root"
password="123456"

[mysqladmin]               //给/usr/local/mysql/bin/mysqladmin使用
user="root"
password="123456"
```

//在家目录下的隐藏文件`.my.cnf`

# 2. mysql配置文件

``` shell
mysql`的配置文件为`/etc/my.cnf
```

**配置文件查找次序：若在多个配置文件中均有设定，则最后找到的最终生效**

```
/etc/my.cnf --> /etc/mysql/my.cnf --> --default-extra-file=/PATH/TO/CONF_FILE --> ~/.my.cnf
```

**mysql常用配置文件参数：**

| 参数                             | 说明                                                                                                                                                                     |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| port = 3306                      | 设置监听端口                                                                                                                                                             |
| socket = /tmp/mysql.sock         | 指定套接字文件位置                                                                                                                                                       |
| basedir = /usr/local/mysql       | 指定MySQL的安装路径                                                                                                                                                      |
| datadir = /data/mysql            | 指定MySQL的数据存放路径                                                                                                                                                  |
| pid-file = /data/mysql/mysql.pid | 指定进程ID文件存放路径                                                                                                                                                   |
| user = mysql                     | 指定MySQL以什么用户的身份提供服务                                                                                                                                        |
| skip-name-resolve                | - 禁止MySQL对外部连接进行DNS解析 - 使用这一选项可以消除MySQL进行DNS解析的时间。 - 若开启该选项，则所有远程主机连接授权都要使用IP地址 方式否则MySQL将无法正常处理连接请求 |

## 3. mysql数据库备份与恢复

> **为什么要备份**

> 灾难恢复：硬件故障、软件故障、自然灾害、黑客攻击、误操作测试等数据丢失场景

> 备份注意要点

> 能容忍最多丢失多少数据

> 恢复数据需要在多长时间内完成

> 需要恢复哪些数据

> 还原要点

> 做还原测试，用于测试备份的可用性
> 还原演练

## 3.1备份类型

**备份类型：**

- 完全备份，部分备份
  - 完全备份：整个数据集
  - 部分备份：只备份数据子集，如部分库或表
- 完全备份、增量备份、差异备份
  - 增量备份：仅备份最近一次完全备份或增量备份（如果存在增量）以来变化的数据，备份较快，还原复杂
  - 差异备份：仅备份最近一次完全备份以来变化的数据，备份较慢，还原简单
    //注意：二进制日志文件不应该与数据文件放在同一磁盘

## 3.2备份种类

**冷、温、热备份**

- 冷备：读写操作均不可进行
- 温备：读操作可执行；但写操作不可执行
- 热备：读写操作均可执行

> MyISAM引擎：温备，不支持热备
>
> InnoDB引擎: 都支持

- 物理和逻辑备份
- 物理备份：直接复制数据文件进行备份，与存储引擎有关，占用较多的空间，速度快
- 逻辑备份：从数据库中“导出”数据另存而进行的备份，与存储引擎无关，占用空间少，速度慢，可能丢失精度

## 3.3mysql备份工具

**mysqldump+复制binlog：**

- mysqldump：完全备份复制binlog中指定时间范围的event：增量备份

**LVM快照+复制binlog**：

- LVM快照：使用cp或tar等做物理备份；完全备份复制binlog中指定时间范围的event：增量备份
  **其他工具**
- xtrabackup：由Percona提供支持对InnoDB做热备(物理备份)的工具，支持完全备份、增量备份
- MariaDB Backup： 从MariaDB 10.1.26开始集成，基于
  Percona XtraBackup 2.3.8实现
- mysqlbackup：热备份， MySQL Enterprise Edition组件

### 3.3.1 mysqldump备份命令

``` shell
//语法：
    mysqldump [OPTIONS] database [tables ...]
    mysqldump [OPTIONS] --all-databases [OPTIONS]
    mysqldump [OPTIONS] --databases [OPTIONS] DB1 [DB2 DB3...]
    
//常用的OPTIONS：
    -uUSERNAME      //指定数据库用户名
    -hHOST          //指定服务器主机，请使用ip地址
    -pPASSWORD      //指定数据库用户的密码
    -P#             //指定数据库监听的端口，这里的#需用实际的端口号代替，如-P3307
    -A， --all-databases 备份所有数据库，含create database
    -B , --databases db_name… 指定备份的数据库，包括
create database语句
    -E, --events：备份相关的所有event scheduler
    -R, --routines：备份所有存储过程和存储函数
    --triggers：备份表相关的触发器，默认启用,用--skip-triggers，不备份触发器
    --master-data[=#]： 此选项须启用二进制日志
    1：所备份的数据之前加一条记录为CHANGE MASTER TO语句，非注释，不指定#，默认为1
    2：记录为注释的CHANGE MASTER TO语句
    此选项会自动关闭--lock-tables功能，自动打开--lock-all-tables功能（除非开启--single-transaction）
    -F, --flush-logs ：备份前滚动日志，锁定表完成后，执行flush logs命令,生成新的二进制日志文件，配合-A时，会导致刷新多次数据
    库，在同一时刻执行转储和日志刷新，则应同时使用--flush-logs和-x，--master-data或-single-transaction,此时只刷新一次
    建议：和-x，--master-data或 --single-transaction一起使用
    --compact 去掉注释，适合调试，生产不使用
    -d, --no-data 只备份表结构
    -t, --no-create-info 只备份数据,不备份create table
    -n,--no-create-db 不备份create database，可被-A或-B覆盖
    --flush-privileges 备份mysql或相关时需要使用
    -f, --force 忽略SQL错误，继续执行
    --hex-blob 使用十六进制符号转储二进制列（例如，“abc”变为0x616263），受影响的数据类型包括BINARY， VARBINARY，BLOB，BIT
    -q, --quick 不缓存查询，直接输出，加快备份速度
 
 
    
//备份整个数据库(全备)
mysql> show databases;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| mysql              |
| performance_schema |
| sys                |
| cljhfy             |
+--------------------+
5 rows in set (0.00 sec)

mysql> use cljhfy;
Database changed
mysql> show tables;
+----------------------+
| Tables_in_wangqingge |
+----------------------+
| teacher              |
| student              |
+----------------------+
3 rows in set (0.00 sec)

[root@cl ~]# ls
anaconda-ks.cfg
[root@cl ~]# mysqldump -uroot -p -h127.0.0.1 --all-databases > all-201904301500.sql
Enter password:
[root@cl ~]# ls
all-201904301500.sql  anaconda-ks.cfg




//备份cljhfy库的student表和teacher表
[root@cl ~]# mysqldump -uroot -p -h127.0.0.1 cljhfy student teacher > table-201904301500.sql
Enter password:
[root@cl ~]# ls
all-201904301500.sql  anaconda-ks.cfg  table-201904301500.sql




//备份wangqingge库
[root@cl ~]# mysqldump -uroot -p -h127.0.0.1 --databases cljhfy > cl-201904301500.sql
Enter password:
[root@cl ~]# ls
all-201904301500.sql  table-201904301500.sql
anaconda-ks.cfg       cl-201904301500.sql
```

// mysql数据恢复

```
//模拟误删cljhfy数据库
mysql> drop database wangqingge;
Query OK, 3 rows affected (0.02 sec)

mysql> show databases;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| mysql              |
| performance_schema |
| sys                |
+--------------------+
4 rows in set (0.00 sec)


//恢复cljhfy数据库
[root@cl ~]# ls
all-201904301500.sql  table-201904301500.sql
anaconda-ks.cfg       cl-201904301500.sql
[root@cl ~]# mysql -uroot -p -h127.0.0.1 < all-201904301500.sql
Enter password:
[root@cl ~]# mysql -uroot -p -h127.0.0.1 -e 'show databases;'
Enter password:
+--------------------+
| Database           |
+--------------------+
| information_schema |
| mysql              |
| performance_schema |
| sys                |
| wangqingge         |
+--------------------+
//恢复的方式都一样
```

### 3.3.2 xtrabackup备份命令

**Xtrabackup**

- percona提供的mysql数据库备份工具，惟一开源的能够对innodb和xtradb数据库进行热备的工具

**特点：**

- 1. 备份还原过程快速、可靠
- 2. 备份过程不会打断正在执行的事务
- 3. 能够基于压缩等功能节约磁盘空间和流量
- 4. 自动实现备份检验
- 5. 开源，免费

**Xtrabackup2.2版之前包括4个可执行文件：**

- Innobackupex: perl 脚本
- Xtrabackup: C/C++ 编译的二进制
- Xbcrypt:加解密
- Xbstream:支持并发写的流文件格式

> xtrabackup 是用来备份 InnoDB 表的，不能备份非 InnoDB 表，和 mysqld server 没有交互；innobackupex 脚本用来备份非InnoDB 表，同时会调用 xtrabackup 命令来备份 InnoDB 表，还会和 mysqld server 发送命令进行交互，如加读锁（FTWRL）、获取位点（SHOW SLAVESTATUS）等。即innobackupex是在xtrabackup 之上做了一层封装实现的。

> 虽然目前一般不用 MyISAM 表，只是mysql 库下的系统表是MyISAM 的，因此备份基本都通过 innobackupex 命令进行

**xtrabackup的特性：**
使用innobakupex备份时，其会调用xtrabackup备份所有的InnoDB表，复制所有关于表结构定义的相关文件(.frm)、以及MyISAM、MERGE、CSV和ARCHIVE表的相关文件，同时还会备份触发器和数据库配置信息相关的文件。这些文件会被保存至一个以时间命名的目录中,在备份时，innobackupex还会在备份目录中创建如下文件：

1. xtrabackup_checkpoints：备份类型（如完全或增量）、备份状态（如是否已经为prepared状态）和LSN(日志序列号)范围信息,每个InnoDB页(通常为16k大小)都会包含一个日志序列号，即LSN。LSN是整个数据库系统的系统版本号，每个页面相关的LSN能够表明此页面最近是如何发生改变的
2. xtrabackup_binlog_info：mysql服务器当前正在使用的二进制日志文件及至备份这一刻为止二进制日志事件的位置
3. xtrabackup_binlog_pos_innodb：二进制日志文件及用于InnoDB或XtraDB表的二进制日志文件的当position
4. xtrabackup_binary：备份中用到的xtrabackup的可执行文件
5. backup-my.cnf：备份命令用到的配置选项信息在使用innobackupex进行备份时，还可以使用--no-timestamp选项来阻止命令自动创建一个以时间命名的目录；innobackupex命令将会创建一个BACKUP-DIR目录来存储备份数据

**xtrabackup用法**

```
备份：innobackupex [option] BACKUP-ROOT-DIR
选项说明：
--user：该选项表示备份账号
--password：该选项表示备份的密码
--host：该选项表示备份数据库的地址
--databases：该选项接受的参数为数据名，如果要指定多个数据库，彼此间需要以空格隔开；如："xtra_test dba_test"，同时，在指定某数据库时，也可以只指定其中的某张表。如："mydatabase.mytable"。该选项对innodb引擎表无效，还是会备份所有innodb表
--defaults-file：该选项指定了从哪个文件读取MySQL配置，必须放在命令行第一个选项的位置
--incremental：该选项表示创建一个增量备份，需要指定--incremental-
basedir
--incremental-basedir：该选项表示接受了一个字符串参数指定含有full backup的目录为增量备份的base目录，与--incremental同时使用
--incremental-dir：该选项表示增量备份的目录
--include=name：指定表名，格式：databasename.tablename
Prepare：innobackupex --apply-log [option] BACKUP-DIR
选项说明：
--apply-log：一般情况下,在备份完成后，数据尚且不能用于恢复操作，因为备份的数据中可能会包含尚未提交的事务或已经提交但尚未同步至数据文件中的事务。因此，此时数据文件仍处理不一致状态。此选项作用是通过回滚未提交的事务及同步已经提交的事务至数据文件使数据文件处于一致性状态
--use-memory：该选项表示和--apply-log选项一起使用，prepare 备份的时候，xtrabackup做crash recovery分配的内存大小，单位字节。也可(1MB,1M,1G,1GB)，推荐1G
--defaults-file：该选项指定了从哪个文件读取MySQL配置，必须放在命令行第一个选项的位置
-export：表示开启可导出单独的表之后再导入其他Mysql中
--redo-only：这个选项在prepare base full backup，往其中merge增量备份时候使用
还原：innobackupex --copy-back [选项] BACKUP-DIR
innobackupex --move-back [选项] [--defaults-group=GROUP-NAME] BACKUP-DIR
选项说明：
--copy-back：做数据恢复时将备份数据文件拷贝到MySQL服务器的datadir
--move-back：这个选项与--copy-back相似，唯一的区别是它不拷贝文件，而是移动文件到目的地。这个选项移除backup文件，用时候必须小心。使用场景：没有足够的磁盘空间同事保留数据文件和Backup副本
```

**注意事项**

> 1.datadir目录必须为空。除非指定innobackupex --force-non-empty-directorires选项指定，否则--copy-backup选项不会覆盖
>
> 2.在restore之前,必须shutdown MySQL实例，你不能将一个运行中的实例restore到datadir目录中
>
> 3.由于文件属性会被保留，大部分情况下你需要在启动实例之前将文件的属主改为mysql，这些文件将属于创建备份的用户chown -R mysql:mysql /data/mysql以上需要在用户调用innobackupex之前完成--force-non-empty-directories：指定该参数时候，使得innobackupex --copy-back或--move-back选项转移文件到非空目录，已存在的文件不会被覆盖。如果--copy-back和--move-back文件需要从备份目录拷贝一个在datadir已经存在的文件，会报错失败!

## 4.知识补充：差异备份

## 4.1开启MySQL服务器的二进制日志功能

``` shell
[mysqld]
basedir = /usr/local/mysql
datadir = /opt/data
socket = /tmp/mysql.sock
port = 3306
user = mysql
pid-file = /tmp/mysql.pid
skip-name-resolve

server-id=16         //设置服务器标识符
log-bin=cl_bin    //开启二进制日志功能

[root@localhost ~]# service mysqld restart
Shutting down MySQL.. SUCCESS!
Starting MySQL. SUCCESS!
[root@cl ~]# cd /opt/data/
[root@cl data]# ls
auto.cnf       cl.err          ib_logfile0  mysql               sys
cl_bin.000001  ib_buffer_pool  ib_logfile1  mysql.pid
cl_bin.index   ibdata1         ibtmp1       performance_schema
```

## 4.2对数据库进行完全备份

``` shell
[root@cl ~]# mysql -uroot -pcljhfy
mysql: [Warning] Using a password on the command line interface can be insecure.
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 2
Server version: 5.7.22-log MySQL Community Server (GPL)

Copyright (c) 2000, 2018, Oracle and/or its affiliates. All rights reserved.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

mysql> show databases;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| chenliang          |
| mysql              |
| performance_schema |
| sys                |
+--------------------+
5 rows in set (0.00 sec)

mysql> show tables;
+---------------------+
| Tables_in_chenliang |
+---------------------+
| student             |
| teacher             |
+---------------------+
2 rows in set (0.00 sec)

mysql> select * from student;
+----+---------+
| id | name    |
+----+---------+
|  1 | leo     |
|  2 | natasha |
|  3 | tonny   |
+----+---------+
3 rows in set (0.01 sec)

mysql> select * from teacher;
+----+---------+
| id | name    |
+----+---------+
|  1 | leo     |
|  2 | natasha |
|  3 | tor     |
+----+---------+
3 rows in set (0.00 sec)

//完全备份
[root@cl ~]# mysqldump -uroot -pcljhfy --single-transaction --flush-logs --master-data=2 --all-databases --delete-master-logs > chen-201904301600.sql
mysqldump: [Warning] Using a password on the command line interface can be insecure.
[root@cl ~]# ls
anaconda-ks.cfg        mysql-5.7.22-linux-glibc2.12-x86_64.tar.gz
chen-201904301600.sql

//增加新内容
mysql> use chenliang;
Reading table information for completion of table and column names
You can turn off this feature to get a quicker startup with -A

Database changed
mysql> insert teacher values(1,'jerry'),(2,'kiso');
Query OK, 2 rows affected (0.00 sec)
Records: 2  Duplicates: 0  Warnings: 0

mysql> select * from teacher;
+----+---------+
| id | name    |
+----+---------+
|  1 | leo     |
|  2 | natasha |
|  3 | tor     |
|  1 | jerry   |
|  2 | kiso    |
+----+---------+
5 rows in set (0.00 sec)
```

## 4.3mysql差异备份恢复

模拟误删数据

``` sql
[root@cl ~]# mysql -uroot -pcljhfy -e 'drop database chenliang'
mysql: [Warning] Using a password on the command line interface can be insecure.
[root@cl ~]# mysql -uroot -pcljhfy -e 'show databases'
mysql: [Warning] Using a password on the command line interface can be insecure.
+--------------------+
| Database           |
+--------------------+
| information_schema |
| mysql              |
| performance_schema |
| sys                |
+--------------------+
```

刷新创建新的二进制日志

``` shell
[root@cl ~]# ll /opt/data/
total 122944
-rw-r-----. 1 mysql mysql       56 May  2 11:44 auto.cnf
-rw-r-----. 1 mysql mysql      613 May  2 12:07 cl_bin.000002
-rw-r-----. 1 mysql mysql       16 May  2 12:03 cl_bin.index
-rw-r-----. 1 mysql mysql    12587 May  2 11:54 cl.err
-rw-r-----. 1 mysql mysql      349 May  2 11:54 ib_buffer_pool
-rw-r-----. 1 mysql mysql 12582912 May  2 12:07 ibdata1
-rw-r-----. 1 mysql mysql 50331648 May  2 12:07 ib_logfile0
-rw-r-----. 1 mysql mysql 50331648 May  2 11:44 ib_logfile1
-rw-r-----. 1 mysql mysql 12582912 May  2 12:03 ibtmp1
drwxr-x---. 2 mysql mysql     4096 May  2 11:44 mysql
-rw-r-----. 1 mysql mysql        5 May  2 11:54 mysql.pid
drwxr-x---. 2 mysql mysql     8192 May  2 11:44 performance_schema
drwxr-x---. 2 mysql mysql     8192 May  2 11:44 sys
[root@cl ~]# mysqladmin -uroot -pcljhfy flush-logs  //刷新创建新的二进制日志
mysqladmin: [Warning] Using a password on the command line interface can be insecure.
[root@cl ~]# ll /opt/data/
total 122948
-rw-r-----. 1 mysql mysql       56 May  2 11:44 auto.cnf
-rw-r-----. 1 mysql mysql      657 May  2 12:08 cl_bin.000002
-rw-r-----. 1 mysql mysql      154 May  2 12:08 cl_bin.000003
-rw-r-----. 1 mysql mysql       32 May  2 12:08 cl_bin.index
-rw-r-----. 1 mysql mysql    12587 May  2 11:54 cl.err
-rw-r-----. 1 mysql mysql      349 May  2 11:54 ib_buffer_pool
-rw-r-----. 1 mysql mysql 12582912 May  2 12:07 ibdata1
-rw-r-----. 1 mysql mysql 50331648 May  2 12:07 ib_logfile0
-rw-r-----. 1 mysql mysql 50331648 May  2 11:44 ib_logfile1
-rw-r-----. 1 mysql mysql 12582912 May  2 12:03 ibtmp1
drwxr-x---. 2 mysql mysql     4096 May  2 11:44 mysql
-rw-r-----. 1 mysql mysql        5 May  2 11:54 mysql.pid
drwxr-x---. 2 mysql mysql     8192 May  2 11:44 performance_schema
drwxr-x---. 2 mysql mysql     8192 May  2 11:44 sys
```

## 4.4恢复完全备份

``` shell
[root@cl ~]# mysql -uroot -pcljhfy < chen-201904301600.sql 
mysql: [Warning] Using a password on the command line interface can be insecure.
[root@cl ~]# mysql -uroot -pcljhfy -e 'show databases'
mysql: [Warning] Using a password on the command line interface can be insecure.
+--------------------+
| Database           |
+--------------------+
| information_schema |
| chenliang          |
| mysql              |
| performance_schema |
| sys                |
+--------------------+
[root@cl ~]# mysql -uroot -pcljhfy -e 'select * from chenliang.teacher'
mysql: [Warning] Using a password on the command line interface can be insecure.
+----+---------+
| id | name    |
+----+---------+
|  1 | leo     |
|  2 | natasha |
|  3 | tor     |
+----+---------+
```

## 4.5恢复差异备份

``` shell
//检查误删数据库的位置在什么地方
mysql> show binlog events in 'cl_bin.000002';
+---------------+-----+----------------+-----------+-------------+---------------------------------------+
| Log_name      | Pos | Event_type     | Server_id | End_log_pos | Info                                  |
+---------------+-----+----------------+-----------+-------------+---------------------------------------+
| cl_bin.000002 |   4 | Format_desc    |        16 |         123 | Server ver: 5.7.22-log, Binlog ver: 4 |
| cl_bin.000002 | 123 | Previous_gtids |        16 |         154 |                                       |
| cl_bin.000002 | 154 | Anonymous_Gtid |        16 |         219 | SET @@SESSION.GTID_NEXT= 'ANONYMOUS'  |
| cl_bin.000002 | 219 | Query          |        16 |         296 | BEGIN                                 |
| cl_bin.000002 | 296 | Table_map      |        16 |         354 | table_id: 113 (chenliang.teacher)     |
| cl_bin.000002 | 354 | Write_rows     |        16 |         410 | table_id: 113 flags: STMT_END_F       |
| cl_bin.000002 | 410 | Xid            |        16 |         441 | COMMIT /* xid=485 */                  |
| cl_bin.000002 | 441 | Anonymous_Gtid |        16 |         506 | SET @@SESSION.GTID_NEXT= 'ANONYMOUS'  |
| cl_bin.000002 | 506 | Query          |        16 |         613 | drop database chenliang               |
| cl_bin.000002 | 613 | Rotate         |        16 |         657 | cl_bin.000003;pos=4                   |
+---------------+-----+----------------+-----------+-------------+---------------------------------------+
10 rows in set (0.00 sec)

//使用mysqlbinlog恢复差异备份
[root@cl ~]# mysqlbinlog --stop-position=506 /opt/data/cl_bin.000002 |mysql -uroot -pcljhfy
mysql: [Warning] Using a password on the command line interface can be insecure.

[root@cl ~]# mysql -uroot -pcljhfy -e 'select * from chenliang.teacher'
mysql: [Warning] Using a password on the command line interface can be insecure.
+----+---------+
| id | name    |
+----+---------+
|  1 | leo     |
|  2 | natasha |
|  3 | tor     |
|  1 | jerry   |
|  2 | kiso    |
+----+---------+
```


## 参考文章
* https://www.cnblogs.com/cljhfy/p/10802020.html