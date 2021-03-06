---
title: 主从复制原理
---

::: tip
本文主要是介绍 MySQL主从复制原理 。
:::

[[toc]]

## 一、为什么需要主从复制？
1、在业务复杂的系统中，有这么一个情景，有一句sql语句需要锁表，导致暂时不能使用读的服务，那么就很影响运行中的业务，使用主从复制，让主库负责写，从库负责读，这样，即使主库出现了锁表的情景，通过读从库也可以保证业务的正常运作。
2、做数据的热备
3、架构的扩展。业务量越来越大，I/O访问频率过高，单机无法满足，此时做多库的存储，降低磁盘I/O访问的频率，提高单个机器的I/O性能。

## 二、什么是mysql的主从复制？
MySQL 主从复制是指数据可以从一个MySQL数据库服务器主节点复制到一个或多个从节点。MySQL 默认采用异步复制方式，这样从节点不用一直访问主服务器来更新自己的数据，数据的更新可以在远程连接上进行，从节点可以复制主数据库中的所有数据库或者特定的数据库，或者特定的表。

## 三、mysql复制原理
### 原理：

- master服务器将数据的改变记录二进制binlog日志，当master上的数据发生改变时，则将其改变写入二进制日志中；
- slave服务器会在一定时间间隔内对master二进制日志进行探测其是否发生改变，如果发生改变，则开始一个I/OThread请求master二进制事件
- 同时主节点为每个I/O线程启动一个dump线程，用于向其发送二进制事件，并保存至从节点本地的中继日志中，从节点将启动SQL线程从中继日志中读取二进制日志，在本地重放，使得其数据和主节点的保持一致，最后I/OThread和SQLThread将进入睡眠状态，等待下一次被唤醒。

也就是说：

- 从库会生成两个线程,一个I/O线程,一个SQL线程;
- I/O线程会去请求主库的binlog,并将得到的binlog写到本地的relay-log(中继日志)文件中;
- 主库会生成一个log dump线程,用来给从库I/O线程传binlog;
- SQL线程,会读取relay log文件中的日志,并解析成sql语句逐一执行;

### 扩展：

- SQL线程执行完Relay log中的事件后，会将当前的中继日志Relay log删除，避免它占用更多的磁盘空间
- 为保证从库重启后，仍然知道从哪里开始复制，从库默认会创建两个文件master.info和relay-log.info，分别记录了从库的IO线程当前读取主库binlog的进度和SQL线程应用Relay-log的进度。可通过show slave status \G命令查看从库当前复制的状态

### 注意：

- master将操作语句记录到binlog日志中，然后授予slave远程连接的权限（master一定要开启binlog二进制日志功能；通常为了数据安全考虑，slave也开启binlog功能）。
- slave开启两个线程：IO线程和SQL线程。其中：IO线程负责读取master的binlog内容到中继日志relay log里；SQL线程负责从relay log日志里读出binlog内容，并更新到slave的数据库里，这样就能保证slave数据和master数据保持一致了。
- Mysql复制至少需要两个Mysql的服务，当然Mysql服务可以分布在不同的服务器上，也可以在一台服务器上启动多个服务。
- Mysql复制最好确保master和slave服务器上的Mysql版本相同（如果不能满足版本一致，那么要保证master主节点的版本低于slave从节点的版本）
- master和slave两节点间时间需同步

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/db/mysqlopt2/masterslaveprin-1.jpg')" alt="wxmp">

### 具体步骤：
* 1、从库通过手工执行change master to 语句连接主库，提供了连接的用户一切条件（user 、password、port、ip），并且让从库知道，二进制日志的起点位置（file名 position 号）； start slave
* 2、从库的IO线程和主库的dump线程建立连接。
* 3、从库根据change master to 语句提供的file名和position号，IO线程向主库发起binlog的请求。
* 4、主库dump线程根据从库的请求，将本地binlog以events的方式发给从库IO线程。
* 5、从库IO线程接收binlog events，并存放到本地relay-log中，传送过来的信息，会记录到master.info中
* 6、从库SQL线程应用relay-log，并且把应用过的记录到relay-log.info中，默认情况下，已经应用过的relay会自动被清理purge

## 四、mysql主从同步延时分析
mysql的主从复制都是单线程的操作，主库对所有DDL和DML产生的日志写进binlog，由于binlog是顺序写，所以效率很高，slave的sql thread线程将主库的DDL和DML操作事件在slave中重放。DML和DDL的IO操作是随机的，不是顺序，所以成本要高很多，另一方面，由于sql thread也是单线程的，当主库的并发较高时，产生的DML数量超过slave的SQL thread所能处理的速度，或者当slave中有大型query语句产生了锁等待，那么延时就产生了。

### 解决方案：

* 1.业务的持久化层的实现采用分库架构，mysql服务可平行扩展，分散压力。
* 2.单个库读写分离，一主多从，主写从读，分散压力。这样从库压力比主库高，保护主库。
* 3.服务的基础架构在业务和mysql之间加入memcache或者redis的cache层。降低mysql的读压力。
* 4.不同业务的mysql物理上放在不同机器，分散压力。
* 5.使用比主库更好的硬件设备作为slave，mysql压力小，延迟自然会变小。
* 6.使用更加强劲的硬件设备


复制方式
MySQL的主从复制有两种复制方式，分别是异步复制和半同步复制

### 一、异步复制
异步复制的缺点：

在异步复制中，主库执行完操作后，写入binlog日志后，就返回客户端，这一动作就结束了，并不会验证从库有没有收到，完不完整，所以这样可能会造成数据的不一致。说到底，复制过程中数据是否一致，主要取决于Binlog日志的安全性与完整性。在MySQL中，有[innodb_flush_log_at_trx_commit和sync_binlog两个参数](https://www.cnblogs.com/jelly12345/p/14441210.html)，sync_binlog值表示每进行n次事务提交，MySQL就将Binlog刷新到磁盘。如果这个值为1，就代表每提交一次事务（SQL），就将Binlog往磁盘刷新一次，这样一来，就算数据库宕机了，那么最多只能损失一次事务的数据。但是，一旦多个事务并发提交时，由于受sync_binlog的限制，MySQL只能按顺序来处理这些请求，另外，高频率的刷新binlog对IO的影响也很大，进一步影响了数据库的性能，所以，一般这个值都设为0或者其他值，在数据的安全性和高并发下的性能之间取得一个平衡。
为了更加有效的保护Binlog的安全性和完整性，MySQL5 .5之后引入了半同步复制。

### 二、半同步复制
在异步复制中，我们遇到的一个主要问题就是，在复制过程当中，主库不会去验证Binlog有没有成功复制到从库，那如果主库提交一个事务并写入Binlog中后，当从库还没有从主库得到Binlog时，主库宕机了或因磁盘损坏等故障导致该事务的Binlog丢失了，那从库就不会得到这个事务，也就造成了主从数据的不一致。

而半同步复制，当主库每提交一个事务后，不会立即返回，而是等待其中一个从库接收到Binlog并成功写入Relay-log中才返回客户端，所以这样就保证了一个事务至少有两份日志，一份保存在主库的Binlog，另一份保存在其中一个从库的Relay-log中，从而保证了数据的安全性和一致性。

另外，在半同步复制时，如果主库的一个事务提交成功了，在推送到从库的过程当中，从库宕机了或网络故障，导致从库并没有接收到这个事务的Binlog，此时主库会等待一段时间（这个时间由rpl_semi_sync_master_timeout的毫秒数决定），如果这个时间过后还无法推送到从库，那MySQL会自动从半同步复制切换为异步复制，当从库恢复正常连接到主库后，主库又会自动切换回半同步复制。

半同步复制的“半”体现在，虽然主从库的Binlog是同步的，但主库不会等待从库执行完Relay-log后才返回，而是确认从库接收到Binlog，达到主从Binlog同步的目的后就返回了，所以从库的数据对于主库来说还是有延时的，这个延时就是从库执行Relay-log的时间。所以只能称为半同步。


## 五、面试题之----主从复制作用及原理


### 一、什么是主从复制?
主从复制，是用来建立一个和主数据库完全一样的数据库环境，称为从数据库；主数据库一般是准实时的业务数据库。

### 二、主从复制的作用
（好处，或者说为什么要做主从）重点!

1、架构的扩展。业务量越来越大，I/O访问频率过高，单机无法满足，此时做多库的存储，物理服务器增加，负荷增加。

2、读写分离，使数据库能支撑更大的并发。主从只负责各自的写和读，极大程度的缓解X锁和S锁争用。在报表中尤其重要。由于部分报表sql语句非常的慢，导致锁表，影响前台服务。如果前台使用master，报表使用slave，那么报表sql将不会造成前台锁，保证了前台速度。

3、做数据的热备，作为后备数据库，主数据库服务器故障后，可切换到从数据库继续工作，避免数据丢失。

### 三、主从复制的原理（重中之重）：

**1.数据库有个bin-log二进制文件，记录了所有sql语句。**

**2.我们的目标就是把主数据库的bin-log文件的sql语句复制过来。**

**3.让其在从数据的relay-log重做日志文件中再执行一次这些sql语句即可。**

**4.下面的主从配置就是围绕这个原理配置**

**5.具体需要三个线程来操作：**

**1.****binlog输出线程****:**每当有从库连接到主库的时候，主库都会创建一个线程然后发送binlog内容到从库。

在从库里，当复制开始的时候，从库就会创建两个线程进行处理：

**2.****从库I/O线程****:**当START SLAVE语句在从库开始执行之后，从库创建一个I/O线程，该线程连接到主库并请求主库发送binlog里面的更新记录到从库上。从库I/O线程读取主库的binlog输出线程发送的更新并拷贝这些更新到本地文件，其中包括relay log文件。

**3.****从库的SQL线程****:**从库创建一个SQL线程，这个线程读取从库I/O线程写到relay log的更新事件并执行。

**可以知道，对于每一个主从复制的连接，都有三个线程。拥有多个从库的主库为每一个连接到主库的从库创建一个binlog输出线程，每一个从库都有它自己的I/O线程和SQL线程。**

**主从复制如图：**
<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/db/mysqlopt2/masterslaveprin-2.jpg')" alt="wxmp">


原理图2,帮助理解!

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/db/mysqlopt2/masterslaveprin-3.jpg')" alt="wxmp">


**步骤一：主库db的更新事件(update、insert、delete)被写到binlog**

**步骤二：从库发起连接，连接到主库**

**步骤三：此时主库创建一个binlog dump thread****线程****，把binlog的内容发送到从库**

**步骤四：从库启动之后，创建一个I/O线程，读取主库传过来的binlog内容并写入到relay log****.**

**步骤五：还会创建一个SQL线程，从relay log里面读取内容，从Exec_Master_Log_Pos位置开始执行读取到的更新事件，将更新内容写入到slave的db****.**





### 四、从数据库的读的延迟问题了解吗？如何解决？

原因：当主库的TPS并发较高时，产生的DDL数量超过slave一个sql线程所能承受的范围，那么延时就产生了，当然还有就是可能与slave的大型query语句产生了锁等待，还有网络延迟。（谈到MySQL数据库主从同步延迟原理，得从mysql的数据库主从复制原理说起，mysql的主从复制都是单线程的操作，主库对所有DDL和DML产生binlog，binlog是顺序写，所以效率很高；slave的Slave_IO_Running线程会到主库取日志，效率会比较高，slave的Slave_SQL_Running线程将主库的DDL和DML操作都在slave实施。DML和DDL的IO操作是随机的，不是顺序的，因此成本会很高，还可能是slave上的其他查询产生lock争用，由于Slave_SQL_Running也是单线程的，所以一个DDL卡主了，需要执行10分钟，那么所有之后的DDL会等待这个DDL执行完才会继续执行，这就导致了延时。有朋友会问：“主库上那个相同的DDL也需要执行10分，为什么slave会延时？”，答案是master可以并发，Slave_SQL_Running线程却不可以。）

解决方法一：最简单的减少slave同步延时的方案就是在架构上做优化，尽量让主库的DDL快速执行。还有就是主库是写，对数据安全性较高，比如sync_binlog=1，innodb_flush_log_at_trx_commit = 1 之类的设置，而slave则不需要这么高的数据安全，完全可以讲sync_binlog设置为0或者关闭binlog，innodb_flushlog也可以设置为0来提高sql的执行效率。另外就是使用比主库更好的硬件设备作为slave。

解决方法二：数据放入缓存中，更新数据库后，在预期可能马上用到的情况下，主动刷新缓存。

解决办法三：对于比较重要且必须实时的数据，比如用户刚换密码（密码写入 Master），然后用新密码登录（从 Slaves 读取密码），会造成密码不一致，导致用户短时间内登录出错。所以在这种需要读取实时数据的时候最好从 Master 直接读取，避免 Slaves 数据滞后现象发生。

### 五：做主从后主服务器挂了怎么办？

假设发生了突发事件，master宕机，现在的需求是要将192.168.1.102提升为主库，另外一个为从库

步骤：

1.确保所有的relay log全部更新完毕，在每个从库上执行stop slave io_thread; show processlist;直到看到Has read all relay log,则表

示从库更新都执行完毕了

2.登陆所有从库，查看master.info文件，对比选择pos最大的作为新的主库，这里我们选择192.168.1.102为新的主库

3.登陆192.168.1.102，执行stop slave; 并进入数据库目录，删除master.info和relay-log.info文件, 配置my.cnf文件，开启log-bin,如果有

log-slaves-updates和read-only则要注释掉，执行reset master

4.创建用于同步的用户并授权slave，同第五大步骤

5.登录另外一台从库，执行stop slave停止同步

6.根据第七大步骤连接到新的主库

7.执行start slave;

8.修改新的master数据，测试slave是否同步更新

读写分离实现方法：

为了减轻数据库的压力，一般会进行数据库的读写分离，实现方法一是通过分析sql语句是insert/select/update/delete中的哪一种，从而对应选择主从，二是通过拦截方法名称的方式来决定主从的，如：save*()、insert*() 形式的方法使用master库，select()开头的使用slave库。

虽然大多数都是从程序里直接实现读写分离的，但对于分布式的部署和水平和垂直分割，一些代理的类似中间件的软件还是挺实用的，如 MySQL Proxy比较。mysql proxy根本没有配置文件， lua脚本就是它的全部，当然lua是相当方便的。

### 六：innodb_flush_log_at_trx_commit 和 sync_binlog

innodb_flush_log_at_trx_commit 和 sync_binlog 是 MySQL 的两个配置参数。它们的配置对于 MySQL 的性能有很大影响（一般为了保证数据的不丢失，会设置为双1，该情形下数据库的性能也是最低的）。

#### 1、innodb_flush_log_at_trx_commit

innodb_flush_log_at_trx_commit：是 InnoDB 引擎特有的，ib_logfile的刷新方式（ ib_logfile：记录的是redo log和undo log的信息）
取值:0/1/2

innodb_flush_log_at_trx_commit=0，表示每隔一秒把log buffer刷到文件系统中(os buffer)去，并且调用文件系统的“flush”操作将缓存刷新到磁盘上去。也就是说一秒之前的日志都保存在日志缓冲区，也就是内存上，如果机器宕掉，可能丢失1秒的事务数据。

innodb_flush_log_at_trx_commit=1，表示在每次事务提交的时候，都把log buffer刷到文件系统中(os buffer)去，并且调用文件系统的“flush”操作将缓存刷新到磁盘上去。这样的话，数据库对IO的要求就非常高了，如果底层的硬件提供的IOPS比较差，那么MySQL数据库的并发很快就会由于硬件IO的问题而无法提升。

innodb_flush_log_at_trx_commit=2，表示在每次事务提交的时候会把log buffer刷到文件系统中去，但并不会立即刷写到磁盘。如果只是MySQL数据库挂掉了，由于文件系统没有问题，那么对应的事务数据并没有丢失。只有在数据库所在的主机操作系统损坏或者突然掉电的情况下，数据库的事务数据可能丢失1秒之类的事务数据。这样的好处，减少了事务数据丢失的概率，而对底层硬件的IO要求也没有那么高(log buffer写到文件系统中，一般只是从log buffer的内存转移的文件系统的内存缓存中，对底层IO没有压力)。

#### 2、sync_binlog

sync_binlog：是MySQL 的二进制日志（binary log）同步到磁盘的频率。
取值：0-N

sync_binlog=0，当事务提交之后，MySQL不做fsync之类的磁盘同步指令刷新binlog_cache中的信息到磁盘，而让Filesystem自行决定什么时候来做同步，或者cache满了之后才同步到磁盘。这个是性能最好的。

sync_binlog=1，当每进行1次事务提交之后，MySQL将进行一次fsync之类的磁盘同步指令来将binlog_cache中的数据强制写入磁盘。

sync_binlog=n，当每进行n次事务提交之后，MySQL将进行一次fsync之类的磁盘同步指令来将binlog_cache中的数据强制写入磁盘。
注：

大多数情况下，对数据的一致性并没有很严格的要求，所以并不会把 sync_binlog 配置成 1. 为了追求高并发，提升性能，可以设置为 100 或直接用 0.
而和 innodb_flush_log_at_trx_commit 一样，对于支付服务这样的应用，还是比较推荐 sync_binlog = 1.



参考博客：
https://blog.csdn.net/keil_wang/article/details/88669587
https://zhuanlan.zhihu.com/p/96212530
https://www.cnblogs.com/bigox/p/11530540.html


## 参考文章
* https://www.cnblogs.com/jelly12345/p/14931024.html
* http://t.zoukankan.com/xuxinstyle-p-9546365.html