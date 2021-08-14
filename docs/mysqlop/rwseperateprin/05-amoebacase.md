---
title: 读写分离-Amoeba案例说明
---

::: tip
本文主要是介绍 读写分离-Amoeba案例说明 。
:::

[[toc]]

## 【实战】Amoeba 代理 MySQL 主从复制 + 读写分离 【提供源码包】

## Amoeba 的介绍

### 1）Amoeba 是什么：

> 1·Amoeba 的中文名是：变形虫。它是一个以MySQL为底层数据存储，并对应用提供MySQL协议接口的proxy。它集中地响应应用的请求，依据用户事先设置的规则，将SQL请求发送到特定的数据库上执行。基于此可以实现负载均衡、读写分离、高可用性等需求。



> 2·Amoeba相当于一个SQL请求的路由器，目的是为负载均衡、读写分离、高可用性提供机制，而不是完全实现它们



> 3·Amoeba 由陈思儒开发，曾经就职阿里巴巴！该程序由 Java 程序开发。



### 2）Amoeba 的不足之处：

> a)、目前还不支持事务
> 
> b)、暂时不支持存储过程（近期会支持）
> 
> c)、不适合从amoeba导数据的场景或者对大数据量查询的query并不合适（比如一次请求返回10w以上甚至更多数据的场合）
> 
> d)、暂时不支持分库分表，amoeba目前只做到分数据库实例，每个被切分的节点需要保持库表结构一致



### 3）Amoeba 的优势之处：

> Amoeba主要解决以下问题：
> 
> a). 数据切分后复杂数据源整合
> 
> b). 提供数据切分规则并降低数据切分规则给数据库带来的影响
> 
> c). 降低数据库与客户端连接
> 
> d). 读写分离路由



## MySQL 主从复制原理

> 1·MySQL 主从复制和MySQL 的读写分离有着紧密的联系，只有主从复制完成，才能在此基础上完成数据的读写分离。



> 2·下图是MySQL主从复制的过程图：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/mysqlop/rwseperateprin/amoebacase/724109eba8aa28a059b2de3309655ee3.png')" alt="wxmp">



>  3·工作过程解读：
> 
> MySQL 主服务器开始写入数据，就会记录在二进制日志文件中。从服务器有两个线程，分别是 I/o线程 与 SQL 线程。这时从服务器就会让 I / O 线程在 主服务器上打开一个口，这时会读取二进制日志文件写入中继日志中，SQL 线程就会读取中继日志，并重放日志中的事件，从服务器就会通过日志来同步主服务器。



## MySQL 读写分离原理

> 1·读写分离简单来说就是在主服务器上进行写入，在从服务器上进行读取，这个中间就需要基于中间代理层Amoeba来实现，Amoeba 接收到请求后会判断这个是什么请求，它就会分别转发到后端的数据库。

### 2·以下是读写分离过程图解：



<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/mysqlop/rwseperateprin/amoebacase/04d9e415b869a5a0e0c3fe6381894ac4.png')" alt="wxmp">



## 实战部署之案例环境

拓扑图如上图，案例环境表如下表：

| 主机           | 操作系统   | IP地址          |
| -------------- | ---------- | --------------- |
| Master主服务器 | CentOS 7.4 | 192.168.106.154 |
| Slave 1 服务器 | CentOS 7.4 | 192.168.106.156 |
| Slave 2 服务器 | CentOS 7.4 | 192.168.106.157 |
| Amoeba 代理    | CentOS 7.4 | 192.168.106.129 |



> MySQL 主从复制+读写分离所需要的源码包都在我的[ 百度网盘](https://pan.baidu.com/s/11zJmmREeych3Kg8zRnV-SA) 密码：l23r 需要的请点击下载。



### 案例实施：

> 这里主、从服务器都需要事先安装好 MySQL ，这里就不再演示MySQL的安装，有兴趣的朋友可以看看之前的文章 [ MySQL5.7版本安装](https://blog.51cto.com/13746824/2163787)



> 1·如果是在实战环境中，而已是在时间差异较大的地区，建议首先需要建立时间同步的环境。

## 一：主从复制搭建

### 1）在主服务器上安装 NTP

> [root@localhost ~]# yum install ntp -y



### 2）配置 NTP 时间同步源

> [root@localhost ~]# vim /etc/ntp.conf -（加入如下两行）
> 
> server 127.127.106.0 ---（本地时间源）
> 
> fudge 127.127.106.0 stratum 8 ---（设置时间层级为8）



### 3）关闭防火墙、启动时间源服务

> [root@localhost ~]# systemctl stop firewalld.service
> 
> [root@localhost ~]# setenforce 0
> 
> [root@localhost ~]# systemctl start ntpd



### 4）时间源配置好了之后可以在从服务器上进行时间同步了

> [root@localhost ~]# yum install ntp ntpdate -y
> 
> [root@localhost ~]# systemctl stop firewalld.service
> 
> [root@localhost ~]# setenforce 0
> 
> [root@localhost ~]# systemctl start ntpd -（启动服务）
> 
> [root@localhost ~]# /usr/sbin/ntpdate 192.168.106.154 -（开始时间同步）



### 5）配置 MySQL Master 主服务器，因为主从复制的原理就是根据二进制日志来同步的，所以这里需要开启二进制日志文件，和允许 Slave 从服务器同步数据

> [root@localhost ~]# vim /etc/my.cnf -----（进入主服务器配置文件，添加如下）
> 
> [mysqld]
> 
> server-id = 11 （修改，这里的 id 不允许和从服务器一样）
> 
> log-bin=master-bin （有则修改，无则添加，master-bin只是为了容易识别）
> 
> log-slave-updates=true -（添加，允许从服务器来同步）



### 6）修改完成后重启 MySQL 主服务器，并且登陆 MySQL 给从服务器授权，允许从服务器以什么身份、什么主机登陆并且可以拥有复制的权限！

> [root@localhost ~]# systemctl restart mysqld.service -----（重启服务器）
> 
> [root@localhost ~]# mysql -u root -p -----（登陆主服务器MySQL）
> 
> mysql> GRANT REPLICATION SLAVE ON  TO ‘myslave’@‘192.168.106.%’ IDENTIFIED BY ‘123456’;
> 
> mysql> flush privileges;
> 
> mysql> show master status;
> 
> ±±---±-±-----±+
> | File | Position | Binlog_Do_DB | Binlog_Ignore_DB | Executed_Gtid_Set |
> ±±---±-±-----±+
> | master-bin.000001 | 604 | | | |
> ±±---±-±-----±+
> 1 row in set (0.00 sec)



> 对上面的表格做一个说明：File 列显示的是日志名字，我们在配置文件中修改的名字，Position 列显示偏移量，这两个值在后面配置从服务器的时候会用到。



<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/mysqlop/rwseperateprin/amoebacase/43fd1765c6cd7a8c6ab5f462ee0f0bcd.png')" alt="wxmp">



### 7）主服务器上的配置完成后，现在可以做从服务器上的配置，修改主配置文件

> [root@localhost ~]# vim /etc/my.cnf -----（进入从服务器配置文件，添加如下）
> 
> [mysqld] ----（在此模块下添加如下内容）
> 
> server-id = 22 （修改 ID ，注意不能与主服务器 ID 相同）
> 
> relay-log=relay-log-bin ----（从主服务器上同步日志文件记录到本地）
> 
> relay-log-index=slave-relay-bin.index -----（定义relay-log的位置和名称）



> [root@localhost ~]# systemctl restart mysqld.service ----（修改完毕，重启服务）



### 8）配置文件修改完成，登陆 MySQL ，配置同步，指定主服务器各种参数

> [root@localhost ~]# mysql -uroot -p ----（登陆MySQL，开始配置同步）
> mysql> change master to master_host=‘192.168.106.154’,master_user=‘myslave’,master_password=‘123456’,masterr_log_file=‘master-bin.000001’,master_log_pos=604;



> 这里需要说明两个参数：masterr_log_file ，master_log_pos 必须按主服务器 show master status 的结果给值



<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/mysqlop/rwseperateprin/amoebacase/14b66921a71c3e2ec8091e364005e423.png')" alt="wxmp">



### 9）启动同步，查看 Slave 状态，确保 以下两个值为 YES
``` sql
mysql> start slave; ----（启动同步）
mysql> show slave status; （查看 Slave 状态 确保以下两个值为 YES）
* 1. row *
Slave_IO_State: Waiting for master to send event
Master_Host: 192.168.106.154
Master_User: myslave
Master_Port: 3306
Connect_Retry: 60
Master_Log_File: master-bin.000002
Read_Master_Log_Pos: 150
Relay_Log_File: relay-log-bin.000002
Relay_Log_Pos: 270
Relay_Master_Log_File: master-bin.000002
Slave_IO_Running: Yes （确保这里的值为 YES）
Slave_SQL_Running: Yes （确保这里的值为 YES）
```


<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/mysqlop/rwseperateprin/amoebacase/7f8137e9adb86b03902c1a7add05448f.png')" alt="wxmp">



### 10）验证主从同步效果，在主服务器上创建一个数据库 school ，查看从服务器上是否也有。

> mysql> create database school4; -（主服务器创建库school4）
> Query OK, 1 row affected (0.00 sec)



> mysql> show databases; -----（在从服务器上查看是否同步过来school4）

``` sql
| Database |
±-+
| information_schema |
| #mysql50#.mozilla |
| bbs |
| mysql |
| performance_schema |
| school4 | （同步成功）
| test |
±-+
7 rows in set (0.00 sec)
```


## 二：MySQL 读写分离搭建：

### 1）在主机 Amoeba 上安装 Java 环境

> 在之前介绍了 Amoeba 是由 Java 程序所开发，所以这搭建 Amoeba 需要用到 jdk 。
> 
> [root@localhost ~]# cp jdk-6u14-linux-x64.bin /usr/local （把它移动到这个目录下）
> 
> [root@localhost local]# chmod +x /usr/local/jdk-6u14-linux-x64.bin --(给执行权限)
> 
> [root@localhost local]# ./jdk-6u14-linux-x64.bin —(根据提示按Enter就好,最后输入YES)
> 
> [root@localhost local]# mv jdk1.6.0_14/ /usr/local/jdk1.6 —（重命名，方便后面操作）



### 2）增加如下配置：

> [root@localhost local]# vim /etc/profile -----（增加如下的一些变量）
> 
> export JAVA_HOME=/usr/local/jdk1.6
> 
> export CLASSPATH=CLASSPATH:*CLASSPATH*:JAVA_HOME/lib:JAVA_HOME/jre/lib export PATH=*JAVAH*​*OME*/*jre*/*libexportPATH*=JAVA_HOME/lib:JAVA_HOME/jre/bin/:*JAVAH*​*OME*/*jre*/*bin*/:PATH:HOME/bin export AMOEBA_HOME=/usr/local/amoeba export PATH=*HOME*/*binexportAMOEBAH*​*OME*=/*usr*/*local*/
> *amoebaexportPATH*=PATH:$AMOEBA_HOME/bin
> 



> [root@localhost local]# source /etc/profile ----（刷新一下，使其生效）
> 
> [root@localhost local]# systemctl stop firewalld.service ----（关闭防火墙）
> 
> [root@localhost local]# setenforce 0



### 3）现在 Java 环境配置成功，可以开始配置 Amoeba 软件

> [root@localhost ~]# mkdir /usr/local/amoeba
> 
> [root@localhost ~]# tar zxvf amoeba-mysql-binary-2.2.0.tar.gz -C /usr/local/amoeba/ -----（解压 Amoeba 压缩包）



> [root@localhost ~]# chmod -R 755 /usr/local/amoeba/
> 
> [root@localhost ~]# /usr/local/amoeba/bin/amoeba
> 
> amoeba start|stop -----（显示此内容，说明 Amoeba安装成功）



### 4）在Master （主）、Slave1（从1）、Slave（从2）三台MySQL服务器中开放权限给 Amoeba 访问

> mysql> grant all on *.* to test@‘192.168.106.%’ identified by ‘123.com’;
> 
> Query OK, 0 rows affected (0.00 sec)



### 5）编辑 amoeba.xml 配置文件

> [root@localhost ~]# vim /usr/local/amoeba/conf/amoeba.xml —（修改内容如下）


``` xml

—30行–

<property name="user">amoeba</property> 客户机访问amoeba使用amoeba这个账号
----32行---
<property name="password">123456</property>访问密码

—117行-去掉注释-
<property name="defaultPool">master</property> 默认权限给master

<property name="writePool">master</property> 写入池为master

<property name="readPool">slaves</property> 读取池为slaves，注意这里要加上s

```



### 6）编辑 dbServers.xml 配置文件

``` xml
[root@localhost ~]# vim /usr/local/amoeba/conf/dbServers.xml —（如下内容）

–26-29–去掉注释–
<property name="user">test</property> //用test身份访问mysql

<property name="password">123.com</property>

-----42-主服务器地址—

<dbServer name="master" parent="abstractServer"> —（主服务器名字）

<property name="ipAddress">192.168.106.154</property> ----（主服务器地址）

–52-从服务器主机名-

<dbServer name="slave1" parent="abstractServer"> --（从服务器名字）

–55-从服务器地址-

<property name="ipAddress">192.168.106.156</property> --（从服务器1地址）

<property name="ipAddress">192.168.106.157</property> --（从服务器2地址）

<dbServer name="slaves" virtual="true">

<poolConfig class="com.meidusa.amoeba.server.MultipleServerPool">

```


<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/mysqlop/rwseperateprin/amoebacase/3b21f6b2d01b464b9b804ac368b701a7.png')" alt="wxmp">



### ）配置完成后，启动 Amoeba 软件 默认端口是 8066

> [root@localhost ~]# /usr/local/amoeba/bin/amoeba start&



## 测试

### 1）在打开一台客户端，通过用amoeba 账户远程连接。

> [root@localhost ~]# mysql -u amoeba -p123456 -h 192.168.106.129 -P8066
> 
> 连接上了说明授权没问题，客户端能访问amoeba



### 2）在 Master 上创建一个表，同步到各个从服务器上，然后关闭从服务器的 Slave 同步功能，再插入区别语句。

> mysql> use school4;
> 
> Database changed
> 
> mysql> create table zang (id int(10),name varchar(10),address varchar(20));
> 
> Query OK, 0 rows affected (0.03 sec)



### 3）在从服务器上关闭 同步功能

> mysql> stop slave;
> 
> Query OK, 0 rows affected (0.00 sec)



### 4）在主服务器上插入一条数据

> mysql> insert into zang values(‘1’,‘zhang’,‘this_is_master’);
> 
> Query OK, 1 row affected (0.01 sec)



### 5）在从服务器分别插入一条能够区别的数据 ‘2’ ‘3’

> mysql> insert into zang values(‘2’,‘zhang’,‘this_is_slave1’);
> 
> Query OK, 1 row affected (0.00 sec)



### 6）在客户机上测试几次读取表中的数据
<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/mysqlop/rwseperateprin/amoebacase/a9d4230735cf34040adbbb32821e6ec3.png')" alt="wxmp">



### 7）由以上图得出结论：客户端读取数据只会读取从服务器的数据。



### 8）在客户端上写入一条能够区别的数据，分别在 三台服务器上查询结果。从服务器因为之前需要验证读取效果 已经 stop slave ；所以在客户端上插入的数据不会同步到从服务器。

> mysql> insert into zang values(‘4’,‘zhang’,‘this_is_slave2’);
> Query OK, 1 row affected (0.02 sec)



### 9）查询主服务器的数据会不会由 ‘4’ 这条数据。如下图：

> mysql> select * from zang;
> ±-----±±---+
> | id | name | address |
> ±-----±±---+
> | 1 | zhang | this_is_master |
> | 4 | zhang | this_is_slave2 | -（主服务器上有在客户端插入的数据）
> ±-----±±---+
> 2 rows in set (0.00 sec)



<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/mysqlop/rwseperateprin/amoebacase/c108f94458b1e6ca0f424d6231b1491a.png')" alt="wxmp">



## 结论：

> 1·因为需要验证 读 和 写 的分离，所以必须在从服务器上关闭同步，这样才能验证。
> 
> 2·根据以上信息得出，客户端访问 Amoeba 代理服务器能够成功实现读写分离。
> 
> 3.读写分离是建立在主从复制之上。
> 
> 4·读写分离的最大作用就是为了减轻服务器的压力
> 
> 5·读写分离其次还有的作用是可以在备份的时候起到了作用，因为备份的时候，不管是什么方式吗，可能会锁定表，或者行！



## 参考文章
* https://blog.51cto.com/u_13746824/2172139