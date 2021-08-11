---
title: MySQL-运维命令汇总
---

::: tip
本文主要是介绍 MySQL-运维命令汇总 。
:::

[[toc]]

## MySQL常用命令汇总（偏向运维管理）

### 基础部分

1. select @@version; ##查询当前mysql的版本.

2. show variables like 'port';##查看mysql实例的端口。

3. show variables like 'socket';##查看实例的socket数据。

4. show variables like 'datadir';##查看实例的数据路径。

5. show databases;  ##显示所有数据库名的命令 。

6. desc tablename;  ## 显示表结构和列结构的命令。

7. show processlist \G;##显示正在执行的线程。

8. explain ##查看语句的执行计划。

9. show index from table_name ##查看表的索引情况。

10. select * from STATISTICS where table_name='XXX'\G ##查看表的统计信息。

11. select @@max_allowed_packet; ## 查询定义的packet大小。

12. show master status;##查看master状态。可以查看 最后(最新)一个binlog日志的编号名称，及其最后一个操作事件pos结束点(Position)值

   show slave status ;##查看slave状态。

13. show master logs;##查看所有的log文件，在主服务器上执行。(即查看所有binlog日志列表)

14. purge binary logs to 'mysql-bin3306.000003'; #mysql-bin3306.000003之前的日志被purge。

15. show warnings; ##显示最近的警告详情。

16. show variables \G; ##查看当前mysqld的所有参数，包括默认值。

17. show grants for 'username'@'hostip' \G; ##查看某一个用户的权限,请替换参数username 和 hostip。

18. show create table tablename \G; ##查看某表的创建脚本

### 实例参数部分

19. show variables like 'log_slave%' \G; ##指定条件的参数设置查询，例如查询以log_slave开头的参数设置。

20. show variables like 'slow_query_log';##查看是否开启了慢查询日志；ON代表开启。可以在线打开。set global slow_query_log = 1;

21. show variables like 'slow_query_log_file';## 查看慢查询日志的路径。

22. show variables like 'long_query_time'; ##查看慢查询定义的阈值，单位是秒。记录的查询是大于该值，不包括该值。

23. show variables like 'log_output'; ##查看日志的输出格式（file或table）。

24. show variables like 'log_timestamps';##查看日志的时间信息，UTC时间或者SYSTEM时间。

25. show variables like 'log_slow_slave_statements';##查看从服务器是否开启慢查询日志，ON代表开启。

26. show variables like 'log_queries_not_using_indexes';##将没有使用索引的SQL语句记录到慢查询日志中。

27. show variables like 'log_throttle_queries_not_using_indexes';##集合上面的参数一起使用，限制每分钟内，在慢查询日志中，记录没有使用
索引的次数。避免日志快速增长。

28. show variables like "default%tmp%";查看创建的临时表的存储引擎类型。

29. show variables like 'innodb_log_file_size';##查询log文件大小。

30. show variables like 'innodb_page_size'; ##查询页的大小。一旦数据库通过innodb_page_size设置完成，则后续无法更改。innodb_page_size
是针对普通表的，压缩表不受限制。

31. show variables like 'innodb_buffer_pool_size';##查看缓冲池的大小，每次读写数据都是通过buffer pool；当buffer pool中没有所需的数据
时，才去硬盘中获取。该值设置的越大越好。buffer pool 也是以页（page）为单位的，且大小和innodb_page_size一致。

32. show variables like 'innodb_buffer_pool_instances'; ##设置多少个缓冲池。设置多个instance可将热点打散，提高并发性能（建议设置成cpu
个数值）

33. show engine innodb status \G;##查看buffer pool的状态。（查看默认存储引擎的类型：  SELECT @@default_storage_engine;）

34. set global innodb_buffer_pool_size=2*1024*1024*1024;##在线调整innodb_buffer_pool_size。MySQL 5.7之前的版本，修改该值，需要重启。

35. show variables like 'innodb_buffer_pool_dump_at_shutdown'; ##在MySQL 5.6 以后，可以在停机的时候dump出buffer pool的数据，然后在
启动的时候Load进buffer pool。该功能可以在MySQL启动时自动预热，无需人工干预。

36. show variables like 'innodb_buffer_pool_dump_pct';##dumpd 百分比，是每个buffer pool文件，而不是整体。

37. show variables like 'innodb_buffer_pool_load_at_startup';## 启动时加载dump的文件，恢复到buffer pool中。dump的越多，启动的越慢。

38. select * from innodb_lock_waits;##查看锁的信息，在数据库sys下执行。

39. show variables like 'transaction_isolation'; ##查看隔离级别

40. set transaction_isolation='read-committed'; ##设置隔离级别。

41.show variables like 'innodb_print_all_deadlocks';##设置为ON，表示将死锁信息打印到err_log中。

42.show variables like "%innodb_flush_log_at_timeout%";##master thread 每秒刷新redo的buffer到logfile。5.7版本可以设置刷新间隔时间，
默认是1秒。

43. show variables like 'binlog_format';##查看binlog的类型。statement 记录SQL语句；ROW 记录SQL语句操作的那些行（行的变化）；mixed 混
合statement 和 Row 格式（不推荐）。

### MHA 常用命令 

44. masterha_check_ssh --conf=/etc/masterha/app1.conf  ##检查MHA集群SSH配置。

45. masterha_check_repl --conf=/etc/masterha/app1.conf  ##检查整个集群的复制状况。

46. masterha_check_status --conf=/etc/masterha/app1.conf ##检查MHA Manager的状态：如果正常，会显示"PING_OK"，否则会显示"NOT_RUNNING" ，这代表MHA监控没有开启。

47. nohup masterha_manager --conf=/etc/masterha/app1.conf --remove_dead_master_conf --ignore_last_failover < /dev/null > /var/log/masterha/app1/manager.log 2>&1 & ###监控进程通过nohup管理，可以通过jobs查看后台进程。

48. show slave hosts;##在master节点上执行，查看Slave节点数据。

50. CHANGE MASTER TO MASTER_HOST='172.XXX.XXX.XXX',MASTER_USER='replname',MASTER_PASSWORD='pwd',MASTER_LOG_FILE='mysql-bin.000001',MASTER_LOG_POS=154; ##change master 示例

51. 若在Slave机器上对数据库进行修改或者删除，会导致主从的不一致，需对Slave机器设置为read_only = 1 ，让Slave提供只读操作。

  注意： read_only 仅仅对没有SUPER权限的用户有效（即 mysql.user表的Super_priv字段为Y），一般给App 的权限是不需要SUPER权限的。参数super_read_only 可以将有SUPER权限的用户也设置为只读，且该参数设置为ON 后， read_only 也跟着自动设置为ON。

52. show variables like "server_uuid";## 查看UUID。 GTID（G lobal T ransaction Id entifier） 全局事物ID。GTID = Server_UUID +
Transaction_ID 其中 Server_UUID 是全局唯一的，Transaction_ID 是自增的。

53. show variables like "%gtid%";##查看gtid相关数据及配置

54.从服务器跳过一个错误的事务
``` sql
  步骤1: 关闭复制
  stop slave;
  步骤2 ： 设置 gtid_next 为回放失败的gtid
  set session gtid_next='4e659069-3cd8-11e5-9a49-001c4270714e:1'; #在session里设置gtid_next，即跳过这个GTID
  步骤3 : 执行一个空的事物，让回放失败的gtid对应到这个空的事物
  begin;
  commit;
  步骤4 : 还原gtid_next为automatic
  SET SESSION GTID_NEXT = AUTOMATIC; #把gtid_next设置回来
  步骤5: 开启复制
  start slave;
```

55. 通过GTID的复制都是没有指定MASTER_LOG_FILE和MASTER_LOG_POS的，所以通过GTID复制都是从最先开始的事务开始，除非在自己的binlog里面有执行过之前的记录，才会继续后面的执行。Slave如何跳过purge的部分，而不是在最先开始的事务执行。
``` sql
   步骤1：在主上执行，查看被purge的GTID
   show global variables like 'gtid_purged';

   以下步骤在从上执行，跳过这个GTID：
   步骤2
  stop slave;
  步骤3
  reset master;
  步骤4
  start slave;
```

### 其他部分(binlog和主从复制)

56. show binlog events in 'mysql-bin.000008'; ##查看指定binlog中的内容。

57. flush binary logs;#刷新日志，并且会产生一个新的日志文件。

58. show variables like "binlog_rows_query_log_events";##设置为ON，可以在ROW格式下，看到SQL的信息。

60. show variables like "binlog_cache_size";##binlog默认写入到binlog_cache中，系统默认是32K，当有一个大的事务时（几百兆），内存中显然
放不下那么多binlog，所以会记录到磁盘上。

61. show global status like 'binlog_cache_disk_use';##记录了使用临时文件写二进制日志的次数。注意：写日志本来就停满的，如果cache写不下，
再写入磁盘，然后再写binlog，就是写入2次磁盘，会更慢。如果参数binlog_cache_disk_use次数很多，就要看一下binlog_cache_size设置是否太小，
或者事务本身是否太大。

62.xtrabackup 只能备份innodb存储引擎表（用的较少）；innobackupex可以备份其他存储引擎（含innodb）。innobackupex在xtrabackup的基础上做
了包装，可以兼容各种存储引擎。

63 .mysqldump重要参数 --all-databases ：备份所有的数据库;--databases DB1 [DB2 DB3] ：备份指定的数据库;--single-transaction ： 在一个
事物中导出，确保产生一致性的备份，当前只对innodb支持;--master-data ： 备份的时候dump出CHANGE MASTER 信息（file 和 pos），可供主从复制
的时候使用， 默认值为1,当值设置为2 的时候，也会dump出信息，但是会被注释掉 。

参数说明：
* -B：指定数据库
* -F：刷新日志
* -R：备份存储过程等

由于上面在全备份的时候使用了-F选项，那么当数据备份操作刚开始的时候系统就会自动刷新log，这样就会自动产生
一个新的binlog日志，这个新的binlog日志就会用来记录备份之后的数据库“增删改”操作

64. show variables like '%slave_parallel_workers%';##从数据库用来还原的并发线程数。

65.通过 mysqlbinlog工具去查看二进制文件binlog，内容较多，不容易分辨查看pos点信息。

mysql> show binlog events [IN 'log_name'] [FROM pos] [LIMIT [offset,] row_count];

选项解析：IN 'log_name' 指定要查询的binlog文件名(不指定就是第一个binlog文件)
         FROM pos 指定从哪个pos起始点开始查起(不指定就是从整个文件首个pos点开始算)
         LIMIT [offset,] 偏移量(不指定就是0)
         row_count 查询总条数(不指定就是所有行)

 

66.从binlog日志恢复数据

``` sql
 恢复语法格式：
 # mysqlbinlog mysql-bin.0000xx | mysql -u用户名 -p密码 数据库名（上面的mysql 可以是mysql可执行文目录bin下的mysql文件，例如 /data/mysql57/bin/mysql，如果是多实例或者socket不是默认的，还需指定 -S 选项。）例如以下的一个恢复案例
 /data/mysql57/bin/mysqlbinlog  --no-defaults --start-position=1210 --stop-position=2019 --database=测试数据库 /data/mysql_test/mysql3306_bin.000009 |  /data/mysql57/bin/mysql -S /tmp/mysql_3307.sock -u用户名 -p密码
 常用选项：
  --start-position=???                   起始pos点
  --stop-position=???                    结束pos点
  --start-datetime="XXXXXXX"             起始时间点
  --stop-datetime="XXXXXXXX"             结束时间点
  --database=要恢复的数据库名字             指定只恢复zyyshop数据库(一台主机上往往有多个数据库，只限本地log日志)
            
  不常用选项：    
  -u --user=name              Connect to the remote server as username.连接到远程主机的用户名
  -p --password[=name]        Password to connect to remote server.连接到远程主机的密码
  -h --host=name              Get the binlog from server.从远程主机上获取binlog日志
  --read-from-remote-server   Read binary logs from a MySQL server.从某个MySQL服务器上读取binlog日志

 小结：实际是将读出的binlog日志内容，通过管道符传递给mysql命令。这些命令、文件尽量写成绝对路径；
```

 67.查看某数据库下账号

select * from mysql.db WHERE db LIKE 'db_name';

（root超级权限的账号除外）

 

68.mysql 5.7 新特性中在线in-place 修改字段的大小（VARCHAR inplace enlarge）

255字节长度是个门槛；不跨越255长度门槛即可在线调大；

没必要再为VARCHAR列预留更大长度；缩短长度不能in-place。

提示错误如下：

``` sql
ERROR 1846 (0A000): ALGORITHM=INPLACE ``is` `not` `supported. Reason: Cannot change ``column` `type INPLACE. Try ALGORITHM=COPY
```

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/mysqlop/basic/sum-1.png')" alt="wxmp">

如果没有 ALGORITHM=INPLACE 参数是可以修改的。例如

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/mysqlop/basic/sum-2.png')" alt="wxmp">

思考点：为什么255字节长度是个门槛？

This is true as long as the number of length bytes required by a VARCHAR column remains the same.只要修改字段后字段varchar所占字节数和原先的相同就能实现，例如对于 VARCHAR 值在 0到 255,只需要一个bytes. 对于 VARCHAR 的值是 256 bytes 或者大于256 需要两个字节.这样的话,通过 in-place ALTER TABLE 只支持0到255 之间的修改，或者说256 以及大于256之间修改.in-place alter table 不支持小于256的varchar值变更为大于256的值。因为在这种情况下存储的字节会从1个字节变为两个字节。（这里需要着重说明的一点是需要针对不同的字符集来对应如果是英文 0-255 随便修改如果是其它字符集那么就需要注意了因为不同字符集占存储位不同）

69. 多源复制时（此处单只多个实例中的数据库复制同步到一个从实例中，即从实例上的数据库同步来源于多个主实例）。

如果们在源A实例上删除一个账号，在源B上也删除同一个账号，第二次执行时，就会导致主从异常，因为从库上没有了这个账号信息。

在从库上执行： show slave status;

``` sql
Last_SQL_Errno: 1396
Last_SQL_Error: Coordinator stopped because there were error(s) in the worker(s). The most recent failure being: Worker 1 failed executing transaction 'ANONYMOUS' at master log mysql-bin.000XXX, end_log_pos XXxxxxxx. See error log and/or performance_schema.replication_applier_status_by_worker table for more details about this failure or others, if any.
```

根据提示，查看表performance_schema.replication_applier_status_by_worker

其相关信息为：



``` sql
*************************** 2. row ***************************
         CHANNEL_NAME: QQ_DO15060
            WORKER_ID: 2
            THREAD_ID: NULL
        SERVICE_STATE: OFF
LAST_SEEN_TRANSACTION: ANONYMOUS
    LAST_ERROR_NUMBER: 1396
   LAST_ERROR_MESSAGE: Worker 2 failed executing transaction 'ANONYMOUS' at master log mysql-bin.000XXX, end_log_pos XXXXXx; Error 'Operation DROP USER failed for 'QQ_user_woaizhonghua'@'108.108.108.%'' on query. Default database: ''. Query: 'drop user 'QQ_user_woaizhonghua'@'108.108.108.%''
 LAST_ERROR_TIMESTAMP: 2017-12-16 18:47:02
```



解决方案为：Step 1 先创建QQ_user_woaizhonghua 账号 ；Step 2: stop slave for channel 'QQ_DO15060';Step 3 : start slave for channel 'QQ_DO15060';此时再次查看状态，恢复正常。

注意：这个多源复制情况下删除账号，创建账号同样是这个问题。如果源实例A创建了账号User1，此时会同步到了从实例B上。过了一段时间源实例B再创建了账号User1，就会导致主从同步报错。

 **70. MHA 中关于VIP 增减**

添加：



```shell
ifconfig ens3:1 178.10.10.19/23  

#命令解释ifconfig 网卡名:1 虚拟IP/子网掩码，可以通过ip addr 获取

arping -q -c 2 -U -I ens3 178.10.10.19

虚拟IP刷新生效
```



移除虚拟IP：

``` shell
ifconfig 网卡:$key down
###例如 上面添加的虚拟IP：
/sbin/ifconfig ens3:1 down
```

### 其他部分(免密登录)

 **71.无用户密码条件下SSH免密钥登录设置**

搭建MHA，必须先搭建Server节点的SSH免密钥登录设置，但是因为安全要求，我们可能只能通过堡垒机登陆，但没有用户相应的密码。

step1 生成密钥文件和私钥文件(id_rsa,id_rsa.pub)

``` sql
 ssh-keygen -t rsa
```

注意：此文件位于目录.ssh 下( 目录可 **ll -d ~/.ssh** 查看)，通过ll -a 查看。

如果需要转到root账号下，可执行 sudo su -

重点在第二步，怎么在没有账号密码的情况下，实现

``` sql
ssh-copy-id -i ~/.ssh/id_rsa.pub user@17.10.XXX.XXX
```

因为此步需要输入密码。

知识补充：

ssh-copy-id - 将你的公共密钥**填充**到一个远程机器上的authorized_keys文件中。（注意是填充，不是覆盖）

参数 -i：指定公钥文件。

**解决方案：**

其实不一定需要通过这个ssh-copy-id命令进行数据的copy,我们可以**直接通过复制粘贴文件中的数据就可以**。
即将本地主机的公钥id_rsa.pub 内容 追加 到远程主机的authorized_keys文件内即可。注意是追加。

此类方法已通过线上使用。

72. 搭建MySQL主从，start slave；查看主从状态。



``` yml
  Master_SSL_Verify_Server_Cert: No
         Last_IO_Errno: 2003
         Last_IO_Error: error connecting to master 'q123q_wei123xin@110.110.110.111:3308' - retry-time: 60  retries: 1
         Last_SQL_Errno: 0
         Last_SQL_Error: 
```



查看log 错误类似，

``` sql
---
2018-12-19 19:54:41 70664 [ERROR] Slave I/O: error connecting to master 'q123q_wei123xin@110.110.110.111:3308' - retry-time: 60  retries: 1, Error_code: 2003
-----
```

1.密码不对 2.POS不对 3.网络问题

可以Ping的通，使用账号密码从从节点远程主节点OK （排除问题1）；多次配置，xtraback 和mysqldump 都有问题（基本排除问题 2).

难道是网络问题？！

最后结果是 ： 非标准端口上的 Mysql复制连接错误（非标准端口是指除了3306端口以外的MySQL端口 ）。

必须在系统上设置 （注意：这里指从库系统中）

``` sql
# semanage port -a -t mysqld_port_t -p tcp 3308    （3308指端口号）
```
### 其他部分(备份和事件)

**73 Xtrabackup注意事项**

如果使用的是xtrabackup，注意从节点会把event还原上去，可能会造成数据不一致，同步失败的问题。如果主节点有event，需要手动关闭从节点的event。例如，主节点有归档删除数据的event，从节点需要关闭，否则报错。类似如下错误：

``` sql
Could not execute Delete_rows event on table ????DB.*****table; Can't find record in '*****', Error_code: 1032; handler error HA_ERR_KEY_NOT_FOUND; the event's master log FIRST, end_log_pos XXXXXXX
```

**74 event 相关命令**
``` sql

查看event是否开启 : show variables like '%event_sche%';
将事件计划开启 : set global event_scheduler = 1;
将事件计划关闭 : set global event_scheduler = 0;
（上面参数的设置，注意是否同时修改了my.cnf文件，防止重启失效）
关闭事件任务 : alter event eventName on completion preserve disable;
开启事件任务 : alter event eventName on completion preserve enable;
查看事件任务 : show events \G;

（ 也可通过命令show full processlist 查看event。显示为User：event_scheduler； State;Waiting for next activation.）

```
### 其他部分(日志和存储过程)

**75 MySQL 日志文件的截断和新建**
``` sql
主要用到的语法为：flush-logs [log_type ...]
[仅适用于mysql5.7.x或以上版本]
log_type的可选值包括：binary/ engine/error/general/relay/slow

例如截取slow慢查询log，具体的步骤如下：

step 1 刷新慢查询日志文件
mysqladmin -uroot -p flush-logs slow

step 2 重命名旧慢查询日志
mv slow.log _del_20200421_slow.log

step 3 生成新慢查询日志文件
mysqladmin -uroot -p flush-logs slow

```
**76.查看存储过程或函数的创建代码**
``` sql
　　show create procedure proc_name;
　　show create function func_name;
```

## 参考文章
* https://www.cnblogs.com/xuliuzai/p/9878586.html