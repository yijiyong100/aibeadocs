---
title: 读写分离-MyCat案例说明
---

::: tip
本文主要是介绍 读写分离-MyCat案例说明 。
:::

[[toc]]




## Mycat 实现 MySQL 读写分离

环境：CentOS 6.8

## 实验拓扑：



```sql
        mycat
        /    \
  master -- slave (主从复制)
```

mycat: 192.168.0.121
master: 192.168.0.120
slave: 192.168.0.122

## 下载安装

Mycat 提供了编译好的安装包，下载地址：[http://dl.mycat.io](https://link.jianshu.com/?t=http://dl.mycat.io)

Mycat 官方首页：[http://mycat.org.cn](https://link.jianshu.com/?t=http://mycat.org.cn)

```shell
Index of /

../
1.6-RELEASE/                                       28-Oct-2016 12:56                   -
1.6.5-DEV/                                         15-Jan-2017 07:10                   -
2.0-dev/                                           02-Jan-2017 07:24                   -
mycat-web-1.0/                                     02-Jan-2017 07:40                   -
yum/                                               18-May-2016 02:51                   -
Mycat-server-1.4-beta-20150604171601-linux.tar.gz  27-Jun-2015 10:09             7663894
apache-maven-3.3.3-bin.tar.gz                      27-Jun-2015 10:09             8042383
apache-tomcat-7.0.62.tar.gz                        27-Jun-2015 10:09             8824528
jdk-7u79-linux-x64.tar.gz                          27-Jun-2015 10:09           153512879
jdk-8u20-linux-x64.tar.gz                          27-Jun-2015 10:09           160872342
phpMyAdmin-4.4.9-all-languages.tar.gz              27-Jun-2015 10:09             9352049
probe-2.3.3.zip                                    27-Jun-2015 10:09             7957290
toolset.sh                                         26-Oct-2015 05:03               16015
zookeeper-3.4.6.tar.gz
```

wget 一下 Mycat-server 1.6 和 jdk-7u79 两个包：



```sql
wget http://dl.mycat.io/1.6-RELEASE/Mycat-server-1.6-RELEASE-20161028204710-linux.tar.gz
wget http://dl.mycat.io/jdk-7u79-linux-x64.tar.gz

[root@vm2 ~]# ll -h Mycat* jdk*
-rw-r--r-- 1 root root 147M Jun 27  2015 jdk-7u79-linux-x64.tar.gz
-rw-r--r-- 1 root root 7.4M Jun 27  2015 Mycat-server-1.4-beta-20150604171601-linux.tar.gz
```

Mycat-server 包解压后可直接使用。


### 安装mycat
```bash
tar -xf Mycat-server-1.6-RELEASE-20161028204710-linux.tar.gz -C /usr/local/
```

其目录结构是这样的：



```sql
[root@vm2 local]# tree -L 1 mycat
mycat
|-- bin
|-- catlet
|-- conf
|-- lib
|-- logs
`-- version.txt

5 directories, 1 file
```

bin 目录中是可执行文件以及脚本，我们可以使用其中的 mycat 脚本控制mycat的启动和关闭。

conf 目录中是配置文件，这里配置读写分离主要使用 schema.xml 和 server.xml。其他配置分片的配置请参考官方文档。

logs 目录存放日志文件，遇到mycat出错了，就在这里查看问题的原因。

### 安装 jdk:



```bash
mkdir /usr/java
tar -xf jdk-7u79-linux-x64.tar.gz -C /usr/java 

[root@vm2 logs]# cat /etc/profile.d/java.sh
export JAVA_HOME=/usr/java/jdk1.7.0_79
export PATH=$JAVA_HOME/bin:$PATH

source /etc/profile.d/java.sh

[root@vm2 logs]# java -version
java version "1.7.0_79"
Java(TM) SE Runtime Environment (build 1.7.0_79-b15)
Java HotSpot(TM) 64-Bit Server VM (build 24.79-b02, mixed mode)
```

完成。

这里只讲解一下读写分离用到的配置文件：server.xml, schema.xml。

前提：已经有一个配置好的 mysql 一主一从架构。

一个主从集群在Mycat里面由一个 dataNode 定义，dataNode 定义了一个数据库实例及其中的一个具体的库。Mycat 的一个数据库实例可以实际上是一个主从复制架构：一主多从，一主一从，多主多从等等，具体在 dataHost 中定义。

这里建立一个非拆分库（将mycat逻辑库绑定到一个具体的 dataNode 上）testdb，绑定到 dn1 这个 dataNode 上。

### schema.xml:



```xml
<schema name="testdb" checkSQLschema="false" sqlMaxLimit="100" dataNode="dn1">

</schema>
```

现在所有的表会走默认的节点 dn1。逻辑库 testdb，对应了数据节点 dn1。dn1 对应着真实的数据库实例上的一个真实的库。



```xml
<dataNode name="dn1" dataHost="vm3306" database="db1" >
</dataNode>
```

定义数据节点，dn1，这个节点对应一个数据库实例中的一个真实的库，库名为 db1。

dataNode 标签定义了 MyCat 中的数据节点,也就是我们通常说所的数据分片。一个 dataNode 标签就是 一个独立的数据分片。

例子中所表述的意思为:使用名字为 vm3306 数据库实例上的 db1 物理数据库,这就组成一个数据分片,最 后,我们使用名字 dn1 标识这个分片。

该属性用于定义该分片属性哪个具体数据库实例上的具体库,因为这里使用两个纬度来定义分片,就是:实 例+具体的库。因为每个库上建立的表和表结构是一样的。所以这样做就可以轻松的对表进行水平拆分。

dataHost: 包含一个 writeHost 和 一个 readHost，它们之前已经配置好主从复制了。

balance="3"：表示写请求只发给节点，读请求只发给读节点。



```xml
<dataHost name="vm3306" maxCon="1000" minCon="10" balance="3" writeType="0" dbType="mysql" dbDriver="native">

    <heartbeat>select user()</heartbeat>

    <!-- can have multi write hosts -->

    <writeHost host="hostM1" url="192.168.0.120:3306" user="tuser" password="guli123">
        <!-- can have multi read hosts -->
        <readHost host="hostS1" url="192.168.0.122:3306" user="tuser" password="guli123"/>
    </writeHost>

    <!-- <writeHost host="hostM2" url="localhost:3316" user="tuser" password="guli123"/> --> 
</dataHost>
```

user 及 password属性是后端主从mysql的账户密码信息。

dataHost属性说明：

- 1. writeType="0", 所有写操作发送到配置的第一个 writeHost,第一个挂了切到还生存的第二个 writeHost,重新启动后已切换后的为准,切换记录在配置文件中:dnindex.properties .
- 2. balance="3",所有读请求随机的分发到 wiriterHost 对应的 readhost 执行,writerHost 不负担读压力,注意 balance=3 只在 1.4 及其以后版本有,1.3 没有。

### server.xml 配置：



```xml
    <user name="test">
            <property name="password">test</property>
            <property name="schemas">testdb</property>
    </user>

    <user name="user">
            <property name="password">user</property>
            <property name="schemas">testdb</property>
            <property name="readOnly">true</property>
    </user>
```

我们在主从 mysql 中创建测试用户 tuser，赋予增删改查，创建库和表的权限。

master：



```bash
mysql> GRANT CREATE,DELETE,INSERT,SELECT,UPDATE ON db1.* TO 'tuser'@'192.168.0.%' IDENTIFIED BY 'guli123';
```

启动 mycat:



```bash
cd /usr/local/mycat/bin./mycat start
```

启动 mycat 遇到第一个日志报错，在 logs/wrapper.log 看到如下错误：



```sql
ERROR  | wrapper  | 2017/01/23 11:59:42 | JVM exited while loading the application.
INFO   | jvm 1    | 2017/01/23 11:59:42 | Java HotSpot(TM) 64-Bit Server VM warning: INFO: os::commit_memory(0x00000007a6aa0000, 1431699456, 0) failed; error='Cannot allocate memory' (errno=12)
INFO   | jvm 1    | 2017/01/23 11:59:42 | #
INFO   | jvm 1    | 2017/01/23 11:59:42 | # There is insufficient memory for the Java Runtime Environment to continue.
INFO   | jvm 1    | 2017/01/23 11:59:42 | # Native memory allocation (malloc) failed to allocate 1431699456 bytes for committing reserved memory.
```

提示说没有足够的内存来启动 Java 运行时环境，因为我用的虚拟机，给了 512M 内存，所以内存不够，重新分配了1.5G，就不会报这个错了。

启动 mycat 遇到第二个日志报错，在 logs/wrapper.log 看到如下错误：

[root@vm2 logs]# tail -f wrapper.log：



```sql
ERROR  | wrapper  | 2017/01/23 17:19:28 | JVM exited while loading the application.
INFO   | jvm 5    | 2017/01/23 17:19:28 | 错误: 代理抛出异常错误: java.net.MalformedURLException: Local host name unknown: java.net.UnknownHostException: vm2: vm2: 未知的名称或服务
```

错误提示，可能没有配置好本地主机名的名称解析。

添加本地主机名解析：



```sql
[root@vm2 bin]# cat /etc/hosts
127.0.0.1   localhost localhost.localdomain localhost4 localhost4.localdomain4
::1         localhost localhost.localdomain localhost6 localhost6.localdomain6

192.168.0.121 vm2
```

再次尝试启动：



```bash
# ./mycat start
```

查看日志 wrapper.log：



```sql
INFO   | jvm 1    | 2017/01/23 17:24:40 | log4j 2017-01-23 17:24:40 [./conf/log4j.xml] load completed.
INFO   | jvm 1    | 2017/01/23 17:24:41 | MyCAT Server startup successfully. see logs in logs/mycat.log
```

显示启动成功，这次OK了。

## Mycat 管理命令与监控

### 1. 管理命令



```sql
mysql -h127.0.0.1 -utest -ptest -P9066
```

MyCAT 自身有类似其他数据库的管理监控方式,可以通过 Mysql 命令行,登录管理端口(9066)执行相应 的 SQL 进行管理,也可以通过 jdbc 的方式进行远程连接管理,本小节主要讲解命令行的管理操作。

登录:目前 mycat 有两个端口,8066 数据端口,9066 管理端口,命令行的登陆是通过 9066 管理端口来操 作,登录方式类似于 mysql 的服务端登陆。



```sql
mysql -h127.0.0.1 -utest -ptest -P9066 [-dmycat]
-h 后面是主机,即当前 mycat 按照的主机地址,本地可用 127.0.0.1 远程需要远程 ip -u Mycat server.xml 中配置的逻辑库用户
-p Mycat server.xml 中配置的逻辑库密码
-P 后面是端口 默认 9066,注意 P 是大写
-d Mycat server.xml 中配置的逻辑库 
```

数据端口与管理端口的配置端口修改:数据端口默认 8066,管理端口默认 9066 ,如果需要修改需要配置 server.xml

管理端口用于执行管理命令：



```sql
mysql -h127.0.0.1 -utest -ptest -P9066 
```

命令端口用户执行增删改查等 SQL 语句：



```sql
mysql -h127.0.0.1 -utest -ptest -P8066 
```

下面先看看管理端口支持的命令。

从 9066 管理端口登陆后，执行 show @@help 可以查看到所有命令：



```sql
mysql> show @@help;
+------------------------------------------+--------------------------------------------+
| STATEMENT                                | DESCRIPTION                                |
+------------------------------------------+--------------------------------------------+
| show @@time.current                      | Report current timestamp                   |
| show @@time.startup                      | Report startup timestamp                   |
| show @@version                           | Report Mycat Server version                |
| show @@server                            | Report server status                       |
| show @@threadpool                        | Report threadPool status                   |
| show @@database                          | Report databases                           |
| show @@datanode                          | Report dataNodes                           |
| show @@datanode where schema = ?         | Report dataNodes                           |
| show @@datasource                        | Report dataSources                         |
| show @@datasource where dataNode = ?     | Report dataSources                         |
| show @@datasource.synstatus              | Report datasource data synchronous         |
| show @@datasource.syndetail where name=? | Report datasource data synchronous detail  |
| show @@datasource.cluster                | Report datasource galary cluster variables |
| show @@processor                         | Report processor status                    |
| show @@command                           | Report commands status                     |
| show @@connection                        | Report connection status                   |
| show @@cache                             | Report system cache usage                  |
| show @@backend                           | Report backend connection status           |
| show @@session                           | Report front session details               |
| show @@connection.sql                    | Report connection sql                      |
| show @@sql.execute                       | Report execute status                      |
| show @@sql.detail where id = ?           | Report execute detail status               |
| show @@sql                               | Report SQL list                            |
| show @@sql.high                          | Report Hight Frequency SQL                 |
| show @@sql.slow                          | Report slow SQL                            |
| show @@sql.resultset                     | Report BIG RESULTSET SQL                   |
| show @@sql.sum                           | Report  User RW Stat                       |
| show @@sql.sum.user                      | Report  User RW Stat                       |
| show @@sql.sum.table                     | Report  Table RW Stat                      |
| show @@parser                            | Report parser status                       |
| show @@router                            | Report router status                       |
| show @@heartbeat                         | Report heartbeat status                    |
| show @@heartbeat.detail where name=?     | Report heartbeat current detail            |
| show @@slow where schema = ?             | Report schema slow sql                     |
| show @@slow where datanode = ?           | Report datanode slow sql                   |
| show @@sysparam                          | Report system param                        |
| show @@syslog limit=?                    | Report system mycat.log                    |
| show @@white                             | show mycat white host                      |
| show @@white.set=?,?                     | set mycat white host,[ip,user]             |
| show @@directmemory=1 or 2               | show mycat direct memory usage             |
| switch @@datasource name:index           | Switch dataSource                          |
| kill @@connection id1,id2,...            | Kill the specified connections             |
| stop @@heartbeat name:time               | Pause dataNode heartbeat                   |
| reload @@config                          | Reload basic config from file              |
| reload @@config_all                      | Reload all config from file                |
| reload @@route                           | Reload route config from file              |
| reload @@user                            | Reload user config from file               |
| reload @@sqlslow=                        | Set Slow SQL Time(ms)                      |
| reload @@user_stat                       | Reset show @@sql  @@sql.sum @@sql.slow     |
| rollback @@config                        | Rollback all config from memory            |
| rollback @@route                         | Rollback route config from memory          |
| rollback @@user                          | Rollback user config from memory           |
| reload @@sqlstat=open                    | Open real-time sql stat analyzer           |
| reload @@sqlstat=close                   | Close real-time sql stat analyzer          |
| offline                                  | Change MyCat status to OFF                 |
| online                                   | Change MyCat status to ON                  |
| clear @@slow where schema = ?            | Clear slow sql by schema                   |
| clear @@slow where datanode = ?          | Clear slow sql by datanode                 |
+------------------------------------------+--------------------------------------------+
58 rows in set (0.00 sec)
```

查看 mycat 版本：



```sql
mysql> show @@version;
+-----------------------------------------+
| VERSION                                 |
+-----------------------------------------+
| 5.6.29-mycat-1.6-RELEASE-20161028204710 |
+-----------------------------------------+
1 row in set (0.00 sec)
```

查看当前的库：



```sql
mysql> show @@database;
+----------+
| DATABASE |
+----------+
| testdb   |
+----------+
1 row in set (0.00 sec)
```

查看 MyCAT 的数据节点的列表,对应 schema.xml 配置文件的 dataNode 节点:



```sql
mysql> show @@datanode;
+------+------------+-------+-------+--------+------+------+---------+------------+----------+---------+---------------+
| NAME | DATHOST    | INDEX | TYPE  | ACTIVE | IDLE | SIZE | EXECUTE | TOTAL_TIME | MAX_TIME | MAX_SQL | RECOVERY_TIME |
+------+------------+-------+-------+--------+------+------+---------+------------+----------+---------+---------------+
| dn1  | vm3306/db1 |     0 | mysql |      0 |    8 | 1000 |     244 |          0 |        0 |       0 |            -1 |
+------+------------+-------+-------+--------+------+------+---------+------------+----------+---------+---------------+
1 row in set (0.00 sec)
```

其中,“NAME”表示 dataNode 的名称;“dataHost”表示对应 dataHost 属性的值,即数据主机; “ACTIVE”表示活跃连接数;“IDLE”表示闲置连接数;“SIZE”对应总连接数量。

这里有 8 个空闲连接，那我们去主从节点用 netstat -ntp 命令看看建立的连接情况：

master:



```sql
[root@vm1 ~]# netstat -ntp
Active Internet connections (w/o servers)
Proto Recv-Q Send-Q Local Address               Foreign Address             State       PID/Program name
tcp        0      0 192.168.0.120:22            192.168.0.104:60060         ESTABLISHED 1492/sshd
tcp        0      0 ::ffff:192.168.0.120:3306   ::ffff:192.168.0.121:58636  ESTABLISHED 1414/mysqld
tcp        0      0 ::ffff:192.168.0.120:3306   ::ffff:192.168.0.121:58640  ESTABLISHED 1414/mysqld
tcp        0      0 ::ffff:192.168.0.120:3306   ::ffff:192.168.0.121:58582  ESTABLISHED 1414/mysqld
tcp        0      0 ::ffff:192.168.0.120:3306   ::ffff:192.168.0.121:58644  ESTABLISHED 1414/mysqld
tcp        0      0 ::ffff:192.168.0.120:3306   ::ffff:192.168.0.121:58646  ESTABLISHED 1414/mysqld
tcp        0      0 ::ffff:192.168.0.120:3306   ::ffff:192.168.0.121:58641  ESTABLISHED 1414/mysqld
tcp        0      0 ::ffff:192.168.0.120:3306   ::ffff:192.168.0.121:58635  ESTABLISHED 1414/mysqld
tcp        0      0 ::ffff:192.168.0.120:3306   ::ffff:192.168.0.121:58632  ESTABLISHED 1414/mysqld
tcp        0      0 ::ffff:192.168.0.120:3306   ::ffff:192.168.0.122:48205  ESTABLISHED 1414/mysqld
```

slave:



```sql
[root@vm3 ~]# netstat -ntp
Active Internet connections (w/o servers)
Proto Recv-Q Send-Q Local Address               Foreign Address             State       PID/Program name
tcp        0      0 192.168.0.122:48205         192.168.0.120:3306          ESTABLISHED 1607/mysqld
tcp        0      0 192.168.0.122:22            192.168.0.104:60102         ESTABLISHED 1196/sshd
tcp        0      0 ::ffff:192.168.0.122:3306   ::ffff:192.168.0.121:45593  ESTABLISHED 1607/mysqld
tcp        0      0 ::ffff:192.168.0.122:3306   ::ffff:192.168.0.121:45591  ESTABLISHED 1607/mysqld
tcp        0      0 ::ffff:192.168.0.122:3306   ::ffff:192.168.0.121:45583  ESTABLISHED 1607/mysqld
tcp        0      0 ::ffff:192.168.0.122:3306   ::ffff:192.168.0.121:45589  ESTABLISHED 1607/mysqld
tcp        0      0 ::ffff:192.168.0.122:3306   ::ffff:192.168.0.121:45579  ESTABLISHED 1607/mysqld
tcp        0      0 ::ffff:192.168.0.122:3306   ::ffff:192.168.0.121:45580  ESTABLISHED 1607/mysqld
tcp        0      0 ::ffff:192.168.0.122:3306   ::ffff:192.168.0.121:45588  ESTABLISHED 1607/mysqld
tcp        0      0 ::ffff:192.168.0.122:3306   ::ffff:192.168.0.121:45577  ESTABLISHED 1607/mysqld
```

可看到有很多从 mycat 服务器发起数据库连接（主有9个连接，从有8个连接）。

查看心跳报告：



```sql
mysql> show @@heartbeat;
+--------+-------+---------------+------+---------+-------+--------+---------+--------------+---------------------+-------+
| NAME   | TYPE  | HOST          | PORT | RS_CODE | RETRY | STATUS | TIMEOUT | EXECUTE_TIME | LAST_ACTIVE_TIME    | STOP  |
+--------+-------+---------------+------+---------+-------+--------+---------+--------------+---------------------+-------+
| hostM1 | mysql | 192.168.0.120 | 3306 |       1 |     0 | idle   |       0 | 1,1,1        | 2017-01-24 06:44:38 | false |
| hostS1 | mysql | 192.168.0.122 | 3306 |       1 |     0 | idle   |       0 | 1,1,1        | 2017-01-24 06:44:38 | false |
+--------+-------+---------------+------+---------+-------+--------+---------+--------------+---------------------+-------+
2 rows in set (0.00 sec)
```

该命令用于报告心跳状态



```sql
RS_CODE 状态:
    OK_STATUS = 1;正常状态
    ERROR_STATUS = -1; 连接出错
    TIMEOUT_STATUS = -2; 连接超时
    INIT_STATUS = 0; 初始化状态
```

若节点故障,会连续默认 5 个周期检测,心跳连续失败,就会变成-1,节点故障确认,然后可能发生切换

查看 Mycat 的前端连接状态，即应用与 mycat 的连接：



```sql
mysql> show @@connection\G
*************************** 1. row ***************************
    PROCESSOR: Processor0
           ID: 1
         HOST: 127.0.0.1
         PORT: 9066
   LOCAL_PORT: 50317
       SCHEMA: NULL
      CHARSET: latin1:8
       NET_IN: 257
      NET_OUT: 6343
ALIVE_TIME(S): 1264
  RECV_BUFFER: 4096
   SEND_QUEUE: 0
      txlevel:
   autocommit:
1 row in set (0.00 sec)
```

从上面获取到的连接 ID 属性，可以手动杀掉某个连接。



```objectivec
kill @@connection id,id,id
```

显示后端连接状态：



```sql
mysql> show @@backend\G
...
...
...
*************************** 16. row ***************************
 processor: Processor0
        id: 4
   mysqlId: 8
      host: 192.168.0.122
      port: 3306
    l_port: 45583
    net_in: 7018
   net_out: 1646
      life: 6287
    closed: false
  borrowed: false
SEND_QUEUE: 0
    schema: db1
   charset: utf8:33
   txlevel: 3
autocommit: true
16 rows in set (0.00 sec)
```

一共有16个后端连接，这里截取最后一个。

显示数据源：



```sql
mysql> show @@datasource;
+----------+--------+-------+---------------+------+------+--------+------+------+---------+-----------+------------+
| DATANODE | NAME   | TYPE  | HOST          | PORT | W/R  | ACTIVE | IDLE | SIZE | EXECUTE | READ_LOAD | WRITE_LOAD |
+----------+--------+-------+---------------+------+------+--------+------+------+---------+-----------+------------+
| dn1      | hostM1 | mysql | 192.168.0.120 | 3306 | W    |      0 |    8 | 1000 |     231 |         0 |          2 |
| dn1      | hostS1 | mysql | 192.168.0.122 | 3306 | R    |      0 |    8 | 1000 |     211 |         8 |          0 |
+----------+--------+-------+---------------+------+------+--------+------+------+---------+-----------+------------+
2 rows in set (0.00 sec)
```

可以看到主从信息。

### 2. 执行SQL语句



```sql
mysql -h127.0.0.1 -utest -ptest -P8066
```

创建 tb1 表:



```sql
mysql> show databases;
+----------+
| DATABASE |
+----------+
| testdb   |
+----------+
1 row in set (0.00 sec)

mysql> use testdb;create table tb1 (id INT, name VARCHAR(20));
Database changed
Query OK, 0 rows affected (0.25 sec)

mysql> show tables;
+---------------+
| Tables_in_db1 |
+---------------+
| tb1           |
+---------------+
1 row in set (0.01 sec)
```

插入两条数据：



```sql
mysql> insert into tb1 values (1, 'guli'), (2, 'xie');
Query OK, 2 rows affected (0.03 sec)
Records: 2  Duplicates: 0  Warnings: 0
```

查看一下插入结果：



```sql
mysql> select * from tb1;
+------+------+
| id   | name |
+------+------+
|    1 | guli |
|    2 | xie  |
+------+------+
2 rows in set (0.00 sec)
```

没问题。

再分别到主从节点看数据插入没有：

master:



```sql
mysql> use db1;
Reading table information for completion of table and column names
You can turn off this feature to get a quicker startup with -A

Database changed
mysql> show tables;
+---------------+
| Tables_in_db1 |
+---------------+
| tb1           |
+---------------+
1 row in set (0.00 sec)

mysql> select * from tb1;
+------+------+
| id   | name |
+------+------+
|    1 | guli |
|    2 | xie  |
+------+------+
2 rows in set (0.00 sec)
```

slave:



```sql
mysql> use db1;
Reading table information for completion of table and column names
You can turn off this feature to get a quicker startup with -A

Database changed
mysql> show tables;
+---------------+
| Tables_in_db1 |
+---------------+
| tb1           |
+---------------+
1 row in set (0.00 sec)

mysql> select * from tb1;
+------+------+
| id   | name |
+------+------+
|    1 | guli |
|    2 | xie  |
+------+------+
2 rows in set (0.00 sec)
```

好，可以看到 OK 了。

查看刚才执行过的 sql 语句：



```sql
mysql> show @@sql;
+------+------+---------------+--------------+-------------------+
| ID   | USER | START_TIME    | EXECUTE_TIME | SQL               |
+------+------+---------------+--------------+-------------------+
|    1 | test | 1485212346188 |            1 | select * from tb1 |
|    2 | test | 1485212040101 |            1 | select * from tb1 |
|    3 | test | 1485211834831 |            1 | select * from tb1 |
|    4 | test | 1485211803688 |            1 | select * from tb1 |
|    5 | test | 1485209518691 |            2 | select * from tb1 |
+------+------+---------------+--------------+-------------------+
5 rows in set (0.00 sec)
```

遇到的问题：



```sql
似乎无法统计 insert 语句，不知为什么。
```

查看统计数据：



```sql
mysql> show @@sql.sum;
+------+------+------+------+------+------+--------+---------+--------------+--------------+---------------+
| ID   | USER | R    | W    | R%   | MAX  | NET_IN | NET_OUT | TIME_COUNT   | TTL_COUNT    | LAST_TIME     |
+------+------+------+------+------+------+--------+---------+--------------+--------------+---------------+
|    1 | test |    5 |    0 | 1.00 | 1    |     85 |     709 | [5, 0, 0, 0] | [5, 0, 0, 0] | 1485212346189 |
+------+------+------+------+------+------+--------+---------+--------------+--------------+---------------+
1 row in set (0.00 sec)
```

端口号: 该命令工作在 9066 端口,用来记录用户通过本地 8066 端口向 Mycat-Server 发送的 SQL 请求执行
信息。信息包括有 ID 值,执行 SQL 语句的用户名称,执行的 SQL 语句,命令执行的起始时间,命令执行消耗时间

查看慢查询语句：

设置慢查询阈值为0：reload @@sqlslow=0;



```sql
mysql> reload @@sqlslow=0;
Query OK, 1 row affected (0.00 sec)
Reset show  @@sql.slow time success
```

在8066端口执行查询：select * from tb1;



```sql
mysql> select * from tb1;
+------+-------+
| id   | name  |
+------+-------+
|    1 | guli  |
|    2 | xie   |
|    3 | xu    |
|    4 | he    |
|    5 | huang |
|    6 | ma    |
|    7 | liu   |
|    8 | zeng  |
+------+-------+
8 rows in set (0.00 sec)
```

在 9066 端口执行 show @@sql.slow 查看抓取的慢查询SQL语句：



```sql
mysql> show @@sql.slow;
+------+------------+---------------+--------------+-------------------+
| USER | DATASOURCE | START_TIME    | EXECUTE_TIME | SQL               |
+------+------------+---------------+--------------+-------------------+
| test | NULL       | 1485213017329 |            1 | select * from tb1 |
+------+------------+---------------+--------------+-------------------+
1 row in set (0.00 sec)
```

### 3，如果要验证一下读写分离已经成功了，应该怎么验证呢？

使用mysql客户端连接9066管理端口，执行 show @@datasource 可以观察到 READ_LOAD，WRITE_LOAD 两个统计参数的变化：

这里显示 hostM1 为写节点，hostS1 为读节点：

hostM1 的 WRITE_LOAD = 2

hostS1 的 READ_LOAD = 12



```sql
mysql> show @@datasource;
+----------+--------+-------+---------------+------+------+--------+------+------+---------+-----------+------------+
| DATANODE | NAME   | TYPE  | HOST          | PORT | W/R  | ACTIVE | IDLE | SIZE | EXECUTE | READ_LOAD | WRITE_LOAD |
+----------+--------+-------+---------------+------+------+--------+------+------+---------+-----------+------------+
| dn1      | hostM1 | mysql | 192.168.0.120 | 3306 | W    |      0 |    8 | 1000 |     287 |         0 |          2 |
| dn1      | hostS1 | mysql | 192.168.0.122 | 3306 | R    |      0 |    8 | 1000 |     271 |        12 |          0 |
+----------+--------+-------+---------------+------+------+--------+------+------+---------+-----------+------------+
2 rows in set (0.00 sec)
```

使用mysql客户端连接8066管理端口，执行查询，插入语句，同时使用mysql客户端连接 9066 端口观察一下读写统计参数的变化：

8066：执行查询 select * from tb1;



```sql
mysql> select * from tb1;
+------+------+
| id   | name |
+------+------+
|    1 | guli |
|    2 | xie  |
|    3 | xu   |
|    4 | he   |
+------+------+
4 rows in set (0.00 sec)
```

9066：



```sql
mysql> show @@datasource;
+----------+--------+-------+---------------+------+------+--------+------+------+---------+-----------+------------+
| DATANODE | NAME   | TYPE  | HOST          | PORT | W/R  | ACTIVE | IDLE | SIZE | EXECUTE | READ_LOAD | WRITE_LOAD |
+----------+--------+-------+---------------+------+------+--------+------+------+---------+-----------+------------+
| dn1      | hostM1 | mysql | 192.168.0.120 | 3306 | W    |      0 |    8 | 1000 |     308 |         0 |          2 |
| dn1      | hostS1 | mysql | 192.168.0.122 | 3306 | R    |      0 |    8 | 1000 |     293 |        13 |          0 |
+----------+--------+-------+---------------+------+------+--------+------+------+---------+-----------+------------+
2 rows in set (0.00 sec)
```

读节点的读计数加1，



```sql
hostM1 的 WRITE_LOAD = 2
hostS1 的 READ_LOAD = 13
```

8066：执行插入操作 insert into tb1 values (5,'huang');



```sql
mysql> insert into tb1 values (5,'huang');
Query OK, 1 row affected (0.02 sec)
```

9066：



```sql
mysql> show @@datasource;
+----------+--------+-------+---------------+------+------+--------+------+------+---------+-----------+------------+
| DATANODE | NAME   | TYPE  | HOST          | PORT | W/R  | ACTIVE | IDLE | SIZE | EXECUTE | READ_LOAD | WRITE_LOAD |
+----------+--------+-------+---------------+------+------+--------+------+------+---------+-----------+------------+
| dn1      | hostM1 | mysql | 192.168.0.120 | 3306 | W    |      0 |    8 | 1000 |     332 |         0 |          4 |
| dn1      | hostS1 | mysql | 192.168.0.122 | 3306 | R    |      0 |    8 | 1000 |     315 |        13 |          0 |
+----------+--------+-------+---------------+------+------+--------+------+------+---------+-----------+------------+
2 rows in set (0.00 sec)
```

写节点的读计数加2



```sql
hostM1 的 WRITE_LOAD = 2
hostS1 的 READ_LOAD = 13
```

由此可见读写分离是成功的。可以看到数据也成功写入数据库：



```sql
mysql> select * from tb1;
+------+-------+
| id   | name  |
+------+-------+
|    1 | guli  |
|    2 | xie   |
|    3 | xu    |
|    4 | he    |
|    5 | huang |
+------+-------+
5 rows in set (0.00 sec)
```

到此基本演示了 mycat 的主从读写分离功能，配置的前提是已经有一个配置好的 mysql 主从复制架构，mycat 工作于 mysql 主从架构的前端，负责 SQL 语句的分发。





## 参考文章
* https://www.jianshu.com/p/cb7ec06dae05