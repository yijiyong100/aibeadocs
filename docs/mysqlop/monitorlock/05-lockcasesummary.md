---
title: 监控分析-锁和事务案例总结
---

::: tip
本文主要是介绍 监控分析-锁和事务案例总结 。
:::

[[toc]]

## MySQL 锁机制和事务

## 1. InnoDB锁机制



``` sql
• InnoDB存储引擎支持行级锁，其大类可以细分为共享锁和排它锁两类
• 共享锁(S)：允许拥有共享锁的事务读取该行数据。当一个事务拥有一行的共享锁时，另外的事务可以在同一行数据也获得共享锁，但另外的事务无法获得同一行数据上的排他锁
• 排它锁(X)：允许拥有排它锁的事务修改或删除该行数据。当一个事务拥有一行的排他锁时，另外的事务在此行数据上无法获得共享锁和排它锁，只能等待第一个事务的锁释放
• 除了共享锁和排他锁之外，InnoDB也支持意图锁。该锁类型是属于表级锁，表明事务在后期会对该表的行施加共享锁或者排它锁。所以对意图锁也有两种类型：
• 共享意图锁(IS)：事务将会对表的行施加共享锁
• 排他意图锁(IX)：事务将会对表的行施加排它锁
```



举例来说select … for share mode语句就是施加了共享意图锁，而select … for update语句就是施加了排他意图锁
这四种锁之间的相互共存和排斥关系如下：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/mysqlop/monitorlock/locksumcase-1.png')" alt="wxmp">

所以决定一个事务请求为数据加锁时能否立即施加上锁，取决于该数据上已经存在的锁是否和请求的锁可以共存还是排斥关系，当相互之间是可以共存时则立即施加锁，当相互之间是排斥关系时则需要等待已经存在的锁被释放才能施加

``` sql
alter table temp add primary key(id);
show create table temp;
```



``` sql
select trx_id,trx_state,trx_started,trx_tables_locked,trx_rows_locked from information_schema.innodb_trx;
发现主键位置和lock位置

mysql> select engine_lock_id,engine_transaction_id,lock_mode,lock_type,index_name,object_name,lock_data,lock_status,thread_id from performance_schema.data_locks;
看主键获得了行锁这个状态
看waiting状态，行锁
mysql> select locked_table_name,locked_index,waiting_pid,waiting_lock_id,blocking_lock_id,blocking_pid from  sys.innodb_lock_waits; 
看那两个锁获得的互锁的情况
```



### 1.1 InnoDB锁相关系统表

information_schema.innodb_trx记录了InnoDB中每一个正在执行的事务，包括该事务获得的锁信息，事务开始时间，事务是否在等待锁等信息



``` sql
TRX_ID        InnODB内部标示每个事务的ID
TRX_WEIGHT    表示该事务的权重，近似等于事务锁的行记录数。当发生死锁时，InnoDB会根据此值选择最小的值作为牺牲品.
TRX_STATE     事务当前状态，包括RUNNING, LOCK WAIT, ROLLING BACK, and COMMITTING.
TRX_STARTED   事务开始时间
TRX_REQUESTED_LOCK_ID   当事务状态为lock_wait时，表示需要等待的事务的锁ID，对应innodb_locks表里的lock_id；如果是其他值则为NULL
TRX_WAIT_STARTED        当事务状态为LOCK WAIT则代表事务等待锁的开始时间；如果是其他值则为NULL.
TRX_MYSQL_THREAD_ID     MySQL线程ID，对应show processlist里的值
TRX_QUERY     事务当前执行的语句
TRX_OPERATION_STATE  事务当前执行的语句类型，不执行则为NULL
TRX_TABLES_IN_USE    执行当前语句需要涉及到几个InnoDB表
TRX_TABLES_LOCKED    当前语句执行施加的行锁对应了几个表
TRX_LOCK_STRUCTS     当前事务保留的锁个数
TRX_LOCK_MEMORY_BYTES   当前事务的锁信息所占用的内存byte数
TRX_ROWS_LOCKED      近似等于当前事务施加的行锁数量，也会包含删除语句所涉及的行锁
TRX_ROWS_MODIFIED    当前事务插入或者修改的行数
TRX_CONCURRENCY_TICKETS
TRX_ISOLATION_LEVEL  当前事务的隔离级别
TRX_UNIQUE_CHECKS    唯一键约束检查是开启状态还是关闭状态，常用于批量导入数据时关闭检查
TRX_FOREIGN_KEY_CHECKS      外键约束检查是开启还是关闭状态，常用于批量导入数据时关闭检查
TRX_LAST_FOREIGN_KEY_ERROR  上一次外键约束错误的详细信息
TRX_ADAPTIVE_HASH_LATCHED
TRX_ADAPTIVE_HASH_TIMEOUT
TRX_IS_READ_ONLY            当值为1时表明事务为只读事务
TRX_AUTOCOMMIT_NON_LOCKING  当值为1代表事务中只有一个普通select语句，不会施加任何锁，且由于autocommit是开启的，所以事务只会包含该select语句
```





``` sql
mysql> select trx_id,trx_state,trx_started,trx_tables_locked,trx_rows_locked,trx_query from information_schema.innodb_trx;
+--------+-----------+---------------------+-------------------+-----------------+--------------------------------------+
| trx_id | trx_state | trx_started         | trx_tables_locked | trx_rows_locked | trx_query                            |
+--------+-----------+---------------------+-------------------+-----------------+--------------------------------------+
| 320562 | LOCK WAIT | 2020-05-04 20:16:42 |                 1 |               1 | update temp set name='aa' where id=1 |
| 320561 | RUNNING   | 2020-05-04 20:15:26 |                 1 |               2 | NULL                                 |
+--------+-----------+---------------------+-------------------+-----------------+--------------------------------------+
```



8.0: performance_schema.data_locks记录了InnoDB中事务的每个锁信息，以及当前事务的锁正在阻止其他事务获得锁



``` sql
ENGINE_LO/CK_ID    InnoDB内部标示每个锁的ID
LOCK_TRX_ID     表示持有该锁的事务ID，对应innodb_trx表中的事务ID
LOCK_MODE     表示该锁的模式。可以是S[,GAP], X[,GAP], IS[,GAP], IX[,GAP], AUTO_INC, UNKNOWN. 除了AUTO_INCand UNKNOWN的锁模式，其他的锁模式都暗含是GAP间隔锁
LOCK_TYPE     表示锁类型，可以是RECORD表示行锁, TABLE表示表锁
OBJECT_NAME     该锁涉及的表名
INDEX_NAME    当为行锁时，则代表该锁涉及的索引名，否则为NULL.
LOCK_SPACE    当为行锁时，则表示被锁记录所在的表空间ID；否则为NULL
LOCK_DATA   事务锁定记录主键值，若是表锁则该值为NULL
```





``` sql
mysql> select engine_lock_id,engine_transaction_id,lock_mode,lock_type,index_name,object_name,lock_data,lock_status,thread_id from performance_schema.data_locks;
+----------------+-----------------------+---------------+-----------+------------+-------------+-----------+-------------+-----------+
| engine_lock_id | engine_transaction_id | lock_mode     | lock_type | index_name | object_name | lock_data | lock_status | thread_id |
+----------------+-----------------------+---------------+-----------+------------+-------------+-----------+-------------+-----------+
| 320562:1172    |                320562 | IX            | TABLE     | NULL       | temp        | NULL      | GRANTED     |        49 |
| 320562:110:4:5 |                320562 | X,REC_NOT_GAP | RECORD    | PRIMARY    | temp        | 1         | WAITING     |        49 |
| 320561:1172    |                320561 | IX            | TABLE     | NULL       | temp        | NULL      | GRANTED     |        46 |
| 320561:110:4:5 |                320561 | X,REC_NOT_GAP | RECORD    | PRIMARY    | temp        | 1         | GRANTED     |        46 |
| 320561:110:4:6 |                320561 | X,REC_NOT_GAP | RECORD    | PRIMARY    | temp        | 2         | GRANTED     |        46 |
+----------------+-----------------------+---------------+-----------+------------+-------------+-----------+-------------+-----------+
```



5.7: information_schema.innodb_locks记录了InnoDB中事务在申请但目前还没有获取到的每个锁信息，以及当前事务的锁正在阻止其他事务获得锁



``` sql
LOCK_ID         InnoDB内部标示每个锁的ID
LOCK_TRX_ID     表示持有该锁的事务ID，对应innodb_trx表中的事务ID
LOCK_MODE   表示该锁的模式。可以是S[,GAP], X[,GAP], IS[,GAP], IX[,GAP], AUTO_INC, UNKNOWN. 除了AUTO_INC and UNKNOWN的锁模式，其他的锁模式都暗含是GAP间隔锁
LOCK_TYPE   表示锁类型，可以是RECORD表示行锁, TABLE表示表锁
LOCK_TABLE    该锁涉及的表名
LOCK_INDEX    当为行锁时，则代表该锁涉及的索引名，否则为NULL.
LOCK_SPACE    当为行锁时，则表示被锁记录所在的表空间ID；否则为NULL
LOCK_PAGE   当为行锁时，则表示被锁记录所在的数据页数量；否则为NULL
LOCK_REC    事务锁定行的数量，若是表锁则该值为NULL 
LOCK_DATA   事务锁定记录主键值，若是表锁则该值为NULL
```





``` sql
mysql> select engine_lock_id,engine_transaction_id,lock_mode,lock_type,index_name,object_name,lock_data,lock_status,thread_id from information_schema.innodb_locks;
+----------------+-----------------------+---------------+-----------+------------+-------------+-----------+-------------+-----------+
| engine_lock_id | engine_transaction_id | lock_mode     | lock_type | index_name | object_name | lock_data | lock_status | thread_id |
+----------------+-----------------------+---------------+-----------+------------+-------------+-----------+-------------+-----------+
| 320562:1172    |                320562 | IX            | TABLE     | NULL       | temp        | NULL      | GRANTED     |        49 |
| 320562:110:4:5 |                320562 | X,REC_NOT_GAP | RECORD    | PRIMARY    | temp        | 1         | WAITING     |        49 |
| 320561:1172    |                320561 | IX            | TABLE     | NULL       | temp        | NULL      | GRANTED     |        46 |
| 320561:110:4:5 |                320561 | X,REC_NOT_GAP | RECORD    | PRIMARY    | temp        | 1         | GRANTED     |        46 |
| 320561:110:4:6 |                320561 | X,REC_NOT_GAP | RECORD    | PRIMARY    | temp        | 2         | GRANTED     |        46 |
+----------------+-----------------------+---------------+-----------+------------+-------------+-----------+-------------+-----------+
```



8.0: sys.innodb_lock_waits记录了InnoDB中事务之间相互等待锁的信息

``` sql
waiting_trx_id    请求锁被阻止的事务ID
waiting_pid       请求锁被阻止的process id
blocking_trx_id   阻止上述事务获得锁的事务ID
blocking_pid      阻止事务对应的process id
```



```
mysql> select locked_table_name,locked_index,waiting_pid,waiting_lock_id,blocking_lock_id,blocking_pid from sys.innodb_lock_waits;
+-------------------+--------------+-------------+-----------------+------------------+--------------+
| locked_table_name | locked_index | waiting_pid | waiting_lock_id | blocking_lock_id | blocking_pid |
+-------------------+--------------+-------------+-----------------+------------------+--------------+
| temp              | PRIMARY      |          11 | 320562:110:4:5  | 320561:110:4:5   |            8 |
+-------------------+--------------+-------------+-----------------+------------------+--------------+
```



5.7: information_schema.innodb_lock_waits记录了InnoDB中事务之间相互等待锁的信息

``` sql
REQUESTING_TRX_ID   请求锁被阻止的事务ID
REQUESTED_LOCK_ID   请求锁被阻止的锁ID
BLOCKING_TRX_ID     阻止上述事务获得锁的事务ID
BLOCKING_LOCK_ID    阻止事务对应的锁ID 
```

### 1.2 行级锁

行级锁是施加在索引行数据上的锁。

比如SELECT c1 FROM t WHERE c1 = 10 FOR UPDATE语句是在t.c1=10的索引行上增加锁，来阻止其他事务对对应索引行的insert/update/delete操作。

当一个InnoDB表没有任何索引时，则行级锁会施加在隐含创建的聚簇索引上，所以说当一条sql没有走任何索引时，那么将会在每一条聚集索引后面加X锁，这个类似于表锁，但原理上和表锁应该是完全不同的



``` sql
create table temp(id int,name varchar(10));
insert into temp values(1,'a'),(2,'b'),(3,'c');
链接1:mysql> set autocommit=0;
链接1:mysql> update temp set name='aa' where id=1;  ## 步骤1：update加排他锁

链接2:mysql> update temp set name='bb' where id=2;  ## 步骤2：update等待第一个锁释放

链接1:mysql> commit;                                ## 步骤3：commit释放锁

链接2:mysql> update temp set name='bb' where id=2;  ## 步骤4：等待结束，释放锁
链接2:mysql> commit;                                ## 步骤5：释放自己的锁
```



``` sql
# 8.0select trx_id,trx_state,trx_started,trx_tables_locked,trx_rows_locked from information_schema.innodb_trx\G
select engine_lock_id,engine_transaction_id,lock_mode,lock_type,index_name,object_name,lock_data,lock_status from performance_schema.data_locks;
select locked_table_name,locked_index,waiting_pid,waiting_lock_id,blocking_lock_id,blocking_pid from sys.innodb_lock_waits;
# 5.7select trx_id,trx_state,trx_started,trx_tables_locked,trx_rows_locked from information_schema.innodb_trx\G
select lock_id,lock_trx_id,lock_mode,lock_type,lock_index,lock_rec,lock_data from information_schema.innodb_locks;
select * from information_schema.innodb_lock_waits;
```



``` sql
alter table temp add primary key(id);              ## 增加索引之后

链接1:mysql> set autocommit=0;
链接1:mysql> update temp set name='aa' where id=1;  ## 步骤1：update加排他锁

链接2:mysql> update temp set name='bb' where id=1;  ## 步骤2：update等待第一个锁释放
 
链接1:mysql> commit;                                ## 步骤3：commit释放锁

链接2:mysql> update temp set name='bb' where id=1;  ## 步骤4：等待结束，释放锁

链接2:mysql> commit;                                ## 步骤5：释放自己的锁
```





``` sql
alter table temp add primary key(id);              ## 增加索引之后

链接1:mysql> set autocommit=0;
链接1:mysql> update temp set name='aa' where id=1;  ## 步骤1：update加排他锁

链接2:mysql> update temp set name='bb' where id=2;  ## 步骤2：update不需要等待第一个锁释放，直接执行成功

链接1:mysql> commit;                                ## 步骤3：commit释放锁

链接2:mysql> commit;                                ## 步骤4：commit释放自己的锁
```



### 1.3 间隔锁
当我们用范围条件而不是相等条件检索数据，并请求共享或排他锁时，InnoDB会给符合条件的已有数据记录的索引项加锁；对于键值在条件范围内但并不存在的记录，叫做“间隙（GAP)”，InnoDB也会对这个“间隙”加锁
间隔锁是施加在索引记录之间的间隔上的锁，锁定一个范围的记录、但不包括记录本身。
比如SELECT c1 FROM t WHERE c1 BETWEEN 10 and 20 FOR UPDATE语句，尽管有可能对c1字段来说当前表里没有=15的值，但还是会阻止=15的数据的插入操作，是因为间隔锁已经把索引查询范围内的间隔数据也都锁住了
间隔锁的使用只在部分事务隔离级别才是生效的
间隔锁只会阻止其他事务的插入操作

gap lock的前置条件：
　　1 事务隔离级别为REPEATABLE-READ，innodb_locks_unsafe_for_binlog参数为0，且sql走的索引为非唯一索引（无论是等值检索还是范围检索）
　　2 事务隔离级别为REPEATABLE-READ，innodb_locks_unsafe_for_binlog参数为0，且sql是一个范围的当前读操作，这时即使不是非唯一索引也会加gap lock

innodb_locks_unsafe_for_binlog(强制不使用间隔锁)参数在8.0中已经取消 



``` sql
CREATE TABLE `temp` ( `id` int(11) NOT NULL, `name` varchar(10) DEFAULT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB DEFAULT CHARSET=latin1;
insert into temp values(1,'a'),(2,'b'),(3,'c');
 
链接1:mysql> set autocommit=0;
链接1:mysql> update temp set name='abc' where id between 4 and 6;  ## 步骤1：update加排他锁和间隔锁
 
链接2:mysql> insert into temp values(4,'d');                       ## 步骤2：update等待第一个锁释放
 
链接1:mysql> commit;                                               ## 步骤3：commit释放锁
 
链接2:mysql> insert into temp values(4,'d');                       ## 步骤4：等待结束，释放锁

链接2:mysql> commit;                                               ## 步骤5：释放自己的锁
```





``` sql
# 如果链接1的update语句是update temp set name=‘abc’ where id >4; 
# 那么链接2的插入数据的id=4时也会被阻止，是因为记录中的3~4之间也算是间隔 

链接1:mysql> set autocommit=0;
链接1:mysql> update temp set name='abc' where id >4;    ## 步骤1：update加排他锁和间隔锁
 
链接2:mysql> insert into temp values(4,'abc');          ## 步骤2：update等待第一个锁释放
 
链接1:mysql> commit;                                    ## 步骤3：commit释放锁

链接2:mysql> insert into temp values(4,'abc');          ## 步骤4：等待结束，释放锁

链接2:mysql> commit;                                    ## 步骤5：释放自己的锁
```



### 1.4 Next-key锁
在默认情况下，mysql的事务隔离级别是可重复读，并且innodb_locks_unsafe_for_binlog参数为0，这时默认采用next-key locks。
所谓Next-Key Locks，就是记录锁和间隔锁的结合，即除了锁住记录本身，还要再锁住索引之间的间隙。

### 1.5 插入意图锁
插入意图锁是在插入数据时首先获得的一种间隔锁，对这种间隔锁只要不同的事务插入的数据位置是不一样的，虽然都是同一个间隔，也不会产生互斥关系
比如有一个索引有4和7两个值，如果两个事务分别插入5和6两个值时，虽然两个事务都会在索引4和7之间施加间隔锁，但由于后续插入的数值不一样，所以两者不会互斥



``` sql
CREATE TABLE child (id int(11) NOT NULL, PRIMARY KEY(id)) ENGINE=InnoDB; 
INSERT INTO child (id) values (90),(102); 
事务A对索引>100的值施加了排他间隔锁，而事务B在插入数据之前就试图先施加插入意图锁而必须等待

事务A：
mysql> START TRANSACTION; 
mysql> SELECT * FROM child WHERE id > 100 FOR UPDATE; 

事务B：
mysql> START TRANSACTION; 
mysql> INSERT INTO child (id) VALUES (101);等待这个锁被授予10秒
```



可以通过show engine innodb status命令查看插入意向锁被阻止



``` sql
mysql> show engine innodb status\G
------- TRX一直在等待这个锁被授予10秒
------- TRX HAS BEEN WAITING 10 SEC FOR THIS LOCK TO BE 
GRANTED:
RECORD LOCKS space id 13 page no 4 n bits 72 index PRIMARY of table `course`.`child` trx id 5769 lock_mode X locks gap before rec insert intention waiting
Record lock, heap no 3 PHYSICAL RECORD: n_fields 3; compact format; info bits 0
 0: len 4; hex 80000066; asc    f;;
 1: len 6; hex 000000001683; asc       ;;
 2: len 7; hex 82000000a1011d; asc        ;;
```



### 1.6 自增锁
自增锁是针对事务插入表中自增列时施加的一种特殊的表级锁，即当一个事务在插入自增数据时，另一个事务必须等待前一个事务完成插入，以便获得顺序的自增值
参数innodb_autoinc_lock_mode可以控制自增锁的使用方法

## 2 InnoDB锁相关系统变量
查看当前系统隔离级别



``` sql
# 8.0/5.7
mysql> show variables like 'transaction_isolation';
+-----------------------+-----------------+
| Variable_name         | Value           |
+-----------------------+-----------------+
| transaction_isolation | REPEATABLE-READ |
+-----------------------+-----------------+

# 5.7
mysql> show variables like 'tx_isolation';
+---------------+-----------------+
| Variable_name | Value           |
+---------------+-----------------+
| tx_isolation  | REPEATABLE-READ |
+---------------+-----------------+
```



查看是否开启自动提交



``` sql
mysql> show variables like 'autocommit';
+---------------+-------+
| Variable_name | Value |
+---------------+-------+
| autocommit    | ON    |
+---------------+-------+

mysql> show variables like 'innodb_table_locks';
+--------------------+-------+
| Variable_name      | Value |
+--------------------+-------+
| innodb_table_locks | ON    |
+--------------------+-------+
```



查看innodb事务等待事务的超时时间（秒）

``` sql
mysql> show variables like 'innodb_lock_wait_timeout';
+--------------------------+-------+
| Variable_name            | Value |
+--------------------------+-------+
| innodb_lock_wait_timeout | 50    |
+--------------------------+-------+
```



``` sql
链接1：
mysql> set autocommit=0;
mysql> update temp set name='abc' where id>4;

链接2：
mysql> set autocommit=0;
mysql> insert into temp values(4,'abc');
……     ## 等待50秒后超时，事务回滚
ERROR 1205 (HY000): Lock wait timeout exceeded; try restarting transaction
```



innodb_locks_unsafe_for_binlog参数用来控制innodb中是否允许间隔锁，默认是OFF代表允许间隔锁，设置成ON则代表不使用间隔锁，只是使用行级锁



``` sql
# 8.0
mysql> show variables like 'innodb_locks_unsafe_for_binlog';
Empty set (0.04 sec)

# 5.7
mysql> show variables like 'innodb_locks_unsafe_for_binlog';
+--------------------------------+-------+
| Variable_name                  | Value |
+--------------------------------+-------+
| innodb_locks_unsafe_for_binlog | OFF   |
+--------------------------------+-------+
```





``` ini
# 5.7
/etc/my.cnf
innodb_locks_unsafe_for_binlog=on

链接1：
mysql> set autocommit=0;
mysql> update temp set name='abc' where id>=4;

链接2：
mysql> set autocommit=0;
mysql> insert into temp values(4,‘abc’);   ##未出现等待的情况
```



## 3 InnoDB事务隔离级别
InnoDB存储引擎提供了四种事务隔离级别，分别是：

``` sql
• READ UNCOMMITTED  ：读取未提交内容
• READ COMMITTED    ：读取提交内容
• REPEATABLE READ   ：可重复读，默认值。
• SERIALIZABLE      ：串行化
```

可以通过--transaction-isolation参数设置实例级别的事务隔离级别，也可以通过set [session/global] transaction isolation level语句修改当前数据库链接或者是后续创建的所有数据库链接的事务隔离级别
每个事务隔离级别所对应的锁的使用方法都有所不同



``` sql
SET [GLOBAL | SESSION] TRANSACTION ISOLATION LEVEL 
{ 
  READ UNCOMMITTED 
| READ COMMITTED 
| REPEATABLE READ 
| SERIALIZABLE 
}
```



REPEATABLE READ：可重复读，默认值。

``` sql
• 表明对同一个事务来说第一次读数据时会创建快照，在事务结束前的其他读操作(不加锁)会获得和第一次读相同的结果。
• 当读操作是加锁的读语句(select … for update或者lock in share mode),或者update和delete语句时，加锁的方式依赖于语句是否使用唯一索引访问唯一值或者范围值
• 当访问的是唯一索引的唯一值时，则InnoDB会在索引行施加行锁
• 当访问唯一索引的范围值时，则会在扫描的索引行上增加间隔锁或者next-key锁以防止其他链接对此范围的插入
```

READ COMMITTED：读取提交内容。



``` sql
• 意味着每次读都会有自己最新的快照。
• 对于加锁读语句(select … for update和lock in share mode)，或者update，delete语句会在对应的行索引上增加锁，但不像可重复读一样会增加间隔锁，因此其他的事务执行插入操作时如果是插入非索引行上的数值，则不影响插入。
• 由于该隔离级别是禁用间隔锁的，所以会导致幻读的情况
• 如果是使用此隔离级别，就必须使用行级别的二进制日志
• 此隔离级别还有另外的特点：
    • 对于update和delete语句只会在约束条件对应的行上增加锁
    • 对于update语句来说，如果对应的行上已经有锁，则InnoDB会执行半一致读的操作，来确定update语句对应的行在上次commit之后的数据是否在锁的范围，
      如果不是，则不影响update操作；
      如果是，则需要等待对应的锁解开。
```





``` sql
链接1:mysql> set session transaction isolation level read committed;
链接1:mysql> set autocommit=0;
链接1:mysql> update temp set name='aaa' where id=1;

链接2:mysql> set session transaction isolation level read committed;
链接2:mysql> set autocommit=0;
链接2:mysql> select * from temp;

链接1:mysql> commit;

链接2:mysql> select * from temp;          ##同一个事务中能看到另一个事务已经提交的数据

链接2:mysql> commit;
```





``` sql
如下情况：
CREATE TABLE t (a INT NOT NULL, b INT) ENGINE = InnoDB; INSERT INTO t VALUES (1,2),(2,3),(3,2),(4,3),(5,2); 
COMMIT;
表中并没有任何索引，所以会使用隐藏创建的聚簇索引来施加行级锁
当第一个链接执行修改:
SET autocommit = 0; 
UPDATE t SET b = 5 WHERE b = 3;
之后第二个链接执行修改：
SET autocommit = 0; 
UPDATE t SET b = 4 WHERE b = 2;
```





``` sql
• 对可重复读隔离级别来说，第一个事务的修改会在每行记录上都增加排他锁，并且直到事务结束后锁才会释放
• x-lock(1,2); retain x-lock 
• x-lock(2,3); update(2,3) to (2,5); retain x-lock 
• x-lock(3,2); retain x-lock 
• x-lock(4,3); update(4,3) to (4,5); retain x-lock 
• x-lock(5,2); retain x-lock
• 而第二个事务会一直等待前面事务的锁被释放后才能执行
• x-lock(1,2); block and wait for first UPDATE to commit or roll back

• 对读取提交内容事务隔离级别来说，第一个修改操作会在所有行上都加排他锁，但会在确定不修改上的行上释放对应的锁
• x-lock(1,2); unlock(1,2) 
• x-lock(2,3); update(2,3) to (2,5); retain x-lock 
• x-lock(3,2); unlock(3,2) 
• x-lock(4,3); update(4,3) to (4,5); retain x-lock 
• x-lock(5,2); unlock(5,2)
• 而第二个事务通过半一致读的方式判断每行的最后commit的数据是否在修改的范围里，会在未加锁的行上加上排他锁
• x-lock(1,2); update(1,2) to (1,4); retain x-lock 
• x-lock(2,3); unlock(2,3) 
• x-lock(3,2); update(3,2) to (3,4); retain x-lock 
• x-lock(4,3); unlock(4,3) 
• x-lock(5,2); update(5,2) to (5,4); retain x-lock
```



READ UNCOMMITTED：读取未提交内容，所读到的数据可能是脏数据



```
链接1:mysql> set session transaction isolation level read uncommitted;
链接1:mysql> set autocommit=0;
链接1:mysql> update temp set name='bb';

链接2:mysql> set session transaction isolation level read uncommitted;
链接2:mysql> set autocommit=0;
链接2:mysql> select * from temp; ##已经可以看到未提交的数据

链接1:mysql> commit;

链接2:mysql> commit;
```



SERIALIZABLE：串行化

```
• 此隔离级别更接近于可重复读这个级别，只是当autocommit功能被禁用后，InnoDB引擎会将每个select语句隐含的转化为select … lock in share mode
```



``` sql
链接1:mysql> set session transaction isolation level SERIALIZABLE;
链接1:mysql> set autocommit=0;
链接1:mysql> update temp set name='bb';

链接2:mysql> set session transaction isolation level SERIALIZABLE;
链接2:mysql> set autocommit=0;
链接2:mysql> select * from temp; ##锁等待

链接1:mysql> commit;

链接2:mysql> select * from temp;

链接2:mysql> commit;
```



## 4 Autocommit/commit/rollback



``` sql
• 当设置autocommit属性开启时，每个SQL语句都会隐含成为独立的事务。
• 默认情况下autocommit属性是开启的，也就意味着当每个SQL语句最后执行结果不返回错误时都会执行commit语句，当返回失败时会执行rollback语句
• 而当autocommit属性开启时，可以通过执行start transaction或者begin语句来显示的开启一个事务，而事务里可以包含多个SQL语句，最终事务的结束是由commit或者rollback来终结
• 而当在数据库链接里执行set autocommit=0代表当前数据库链接禁止自动提交，事务的终结由commit或者rollback决定，同时也意味着下一个事务的开始
• 如果一个事务在autocommit=0的情况下数据库链接退出而没有执行commit语句，则这个事务会回滚
• 一些特定的语句会隐含的终结事务，就好比是执行了commit语句
• commit语句代表将此事务的数据修改永久化，并对其他事务可见，而rollback则代表将此事务的数据修改回滚。
• commit和rollback都会把当前事务执行所施加的锁释放
```



当使用多语句事务时，如果全局的autocommit属性是开启的，则开始此事务的方式可以使set autocommit=0将当前链接的属性关闭，最后执行commit和rollback；或者是显示的使用start transaction语句开启事务



``` sql
mysql> -- Do a transaction with autocommit turned on.
mysql> START TRANSACTION;
mysql> INSERT INTO customer VALUES (10, 'Heikki');
mysql> COMMIT;

mysql> -- Do another transaction with autocommit turned off.
mysql> SET autocommit=0;
mysql> INSERT INTO customer VALUES (15, 'John');
mysql> INSERT INTO customer VALUES (20, 'Paul');
mysql> DELETE FROM customer WHERE b = 'Heikki';

mysql> -- Now we undo those last 2 inserts and the delete.
mysql> ROLLBACK;

mysql> SELECT * FROM customer;
+------+--------+
|    a |      b |
+------+--------+
| 10   | Heikki |
```



## 5 一致读

``` sql
• 在默认的隔离级别下一致读是指InnoDB在多版本控制中在事务的首次读时产生一个镜像，在首次读时间点之前其他事务提交的修改可以读取到，而首次读时间点之后其他事务提交的修改或者是未提交的修改都读取不到
• 唯一例外的情况是在首次读时间点之前的本事务未提交的修改数据可以读取到
• 在读取提交数据隔离级别下，一致读的每个读取操作都会有自己的镜像
• 一致读操作不会施加任何的锁，所以就不会阻止其他事务的修改动作一致读
```



``` sql
在这个例子中，链接A对链接B所做的修改，只有在链接A的事务和链接B的事务都提交的情况下才能看到
        Session A               Session B
        SET autocommit=0;       SET autocommit=0;
time
|       SELECT * FROM t;
|       empty set
|                               INSERT INTO t VALUES (1,2);
|       SELECT * FROM t;
v       empty set
                                COMMIT;
        SELECT * FROM t;
        empty set

        COMMIT;
        
        SELECT * FROM t;
        ---------------------
        |       1 |       2 |
        ---------------------
```





``` sql
链接1:mysql> set autocommit=0;
链接1:mysql> update temp set name='aaa' ;
链接2:mysql> start transaction;

链接1:mysql> commit;

链接2:mysql> select * from temp;

链接1:mysql> update temp set name='bbb' ;
链接1:mysql> commit;

链接2:mysql> select * from temp;
链接2:mysql> commit;
```



``` sql
一致读在某些DDL语句下不生效：
• 碰到drop table语句时，由于InnoDB不能使用被drop的表，所以无法实现一致读
• 碰到alter table语句时，也无法实现一致读
• 碰到insert into… select, update … select和create table … select语句时，在默认的事务隔离级别下，语句的执行更类似于在读取提交数据的隔离级别下
```

## 6 加锁读操作



``` sql
• 当在一个事务中在读操作结束后会执行insert和update操作时，普通的读操作无法阻止其他事务对相同数据执行修改操作，所以InnoDB提供了两种在读操作时就增加锁的方式
• select … lock in share mode：在读取的行数据上施加共享锁，其他的事务可以读相同的数据但无法修改；如果在执行此语句时有其他事务对相同的数据已经施加了锁，则需要等待事务完结释放锁
• select … for update：和update操作一样，在涉及的行上施加排他锁，并阻止任何其他事务对涉及行上的修改操作、以及加锁读操作，但不会阻止对涉及行上的一般读（不加锁）操作
• 同样，锁的释放也是在事务提交或者回滚之后加锁读操作
• 比如在子表中插入一行数据，要确保对应的列在父表中有值，通过一般的读操作先查父表有值然后再插入的方法是不保险的，因为在读操作和插入操作之间就有可能其他事务会将父表的数据修改掉。那保险的做法是在查询父表是用加锁读的方式，比如：
• SELECT * FROM parent WHERE NAME = 'Jones' LOCK IN SHARE MODE;
• 再比如当表中有一个行数计数字段时，使用一致读和lock in share mode都有可能导致重复错误数据出现，因为有可能两个事务会读到相同的值，在这种情况下就要使用select … for update语句保证一个事务在读时，另一个事务必须等待
• SELECT counter_field FROM child_codes FOR UPDATE;
• UPDATE child_codes SET counter_field = counter_field + 1;
```





``` sql
链接1:mysql> set autocommit=0;
链接1:mysql> select * from temp;

链接2:mysql> set autocommit=0;
链接2:mysql> delete from temp where id=3;
链接2:mysql> commit;
 
链接1:mysql> select * from temp;

链接1:mysql> insert into temp_child values(1,3);
ERROR 1452 (23000): Cannot add or update a child row: a foreign key constraint fails (`test`.`temp_child`, CONSTRAINT `temp_child_ibfk_1` FOREIGN KEY (`temp_id`) REFERENCES `temp` (`id`)) Rollback;

链接2:mysql> commit;
```



## 7 SQL语句对应的锁



``` sql
• 加锁读，修改和删除SQL语句都会在索引扫描过的每一行增加锁，也就是说不光是在where条件限制的索引行上增加锁，也会对扫描到的间隔增加间隔锁
• 如果SQL语句是使用二级索引查找数据而且施加的是排他锁，则InnoDB也会在对应的聚簇索引行上施加锁
• 如果SQL语句没有任何索引可以使用，则MySQL需要扫描全表数据，而每行数据都会被施加锁，所以一个良好的习惯是为InnoDB添加合适的索引
• 针对不同的语句，InnoDB会施加不同的锁：
• Select…from语句属于一致性读，在默认情况下不施加任何的锁，除非在可串行化隔离级别下，会施加共享next-key锁在扫描的索引行上，当碰到使用唯一索引查找唯一值时只在唯一值上施加锁
• Select…lock in share mode语句会在索引扫描行上施加共享next-key锁，除非是当碰到使用唯一索引查找唯一值时只在唯一值上施加锁SQL语句对应的锁
• Select…for update语句会对扫描索引的行上施加排他next-key锁，除非是当碰到使用唯一索引查找唯一值时只在唯一值上施加锁
• Update语句会对扫描索引的行上施加排他next-key锁，除非是当碰到使用唯一索引查找唯一值时只在唯一值上施加锁。
• Delete语句会对扫描索引的行上施加排他next-key锁，除非是当碰到使用唯一索引查找唯一值时只在唯一值上施加锁
• Insert语句会对索引扫描的行上施加锁，但不是next-key锁，所以不会阻止其他事务对该行值前的间隔上插入数据
• Insert into T select…from S语句会对插入到T表的行施加排他锁（非间隔锁），而在默认隔离级别下会对访问的S表上的行施加共享next-key锁
• 当表上有外键约束时，对任何的insert,update和delete操作都会在需要检查外键约束的行上施加共享行锁
• Lock table语句是施加表级锁
```



## 8 幻读

``` sql
• 幻读问题发生在同一个事务中当相同的读操作在前后两次读数据时返回不同的结果集。
• 比如在表的ID字段上有一个索引，当希望对ID>100的数据进行后续修改时，我们会使用如下的语句： SELECT * FROM child WHERE id > 100 FOR UPDATE，而如果表里目前只有90和102两个值时，如果没有间隔锁锁住90到102之间的间隔，则其他的事务会插入比如101这个值，这样的话在第二次读数据时就会返回三行记录而导致幻读
• 为了阻止幻读情况的发生，InnoDB使用了一种方法next-key锁将索引行锁和间隔锁合并在一起。InnoDb会在索引扫描的行上施加行级共享锁或者排他锁，而next-key锁也会在每个索引行之前的间隔上施加锁，会导致其他的session不能在每个索引之前的间隔内插入新的索引值
• 间隔锁会施加在索引读碰到的行数据上，所以对上例来说为了阻止插入任何>100的值，也会将最后扫描的索引值102之前的间隔锁住
```

## 9 InnoDB锁性能监控



``` sql
mysql> show status like '%innodb_row_lock%';
+-------------------------------+-------+
| Variable_name                 | Value |
+-------------------------------+-------+
| Innodb_row_lock_current_waits | 0     |
| Innodb_row_lock_time          | 0     |
| Innodb_row_lock_time_avg      | 0     |
| Innodb_row_lock_time_max      | 0     |
| Innodb_row_lock_waits         | 0     |
+-------------------------------+-------+
```



``` sql
Innodb_row_lock_current_waits  ：当前等待锁的数量
Innodb_row_lock_time      ：系统启动到现在、锁定的总时间长度
Innodb_row_lock_time_avg  ：每次平均锁定的时间
Innodb_row_lock_time_max  ：最长一次锁定时间
Innodb_row_lock_waits     ：系统启动到现在、总共锁定次数
```

## 10 InnoDB死锁



``` sql
• 死锁的情况发生在不同的的事务相互之间拥有对方需要的锁，而导致相互一直无限等待
• 死锁可能发生在不同的事务都会对多个相同的表和相同的行上施加锁，但事务对表的操作顺序不相同
• 为了减少死锁的发生，要避免使用lock table语句，要尽量让修改数据的范围尽可能的小和快速；当不同的事务要修改多个表或者大量数据时，尽可能的保证修改的顺序在事务之间要一致
• 默认情况下InnoDB下的死锁自动侦测功能是开启的，当InnoDB发现死锁时，会将其中的一个事务作为牺牲品回滚。
• 通过innodb_lock_wait_timeout参数配置自动侦测功能是否开启，如果关闭的话，InnoDB就会使用innodb_lock_wait_timeout参数来自动回滚等待足够时间的事务
• 可以通过show engine innodb status语句查看最后一次发生死锁的情况
```





``` sql
本例子产生的死锁：

链接1:mysql> CREATE TABLE t (i INT) ENGINE = InnoDB; 
链接1:mysql> INSERT INTO t (i) VALUES(1); 
链接1:mysql> START TRANSACTION; 
链接1:mysql> SELECT * FROM t WHERE i = 1 LOCK IN SHARE MODE; ##在i=1记录上加共享锁

链接2:mysql> START TRANSACTION; 
链接2:mysql> DELETE FROM t WHERE i = 1;                      ##请求在i=1的记录上增加排他锁，但被链接1的事务阻止

链接1:mysql> DELETE FROM t WHERE i = 1; 
      ERROR 1213 (40001): Deadlock found when trying to get lock; try restarting transaction
这个死锁发生是因为链接1试图施加排他锁，但因为链接2上的事务已经在请求排他锁，而这个锁的释放必须要等待链接1上的事务释放共享锁，而链接1上原本的共享锁由于顺序的原因也无法升级为排它锁，所以就导致了死锁的发生。
```



## 11 InnoDB死锁检测和回滚



``` shell
• 默认情况下死锁检测功能是开启的，当死锁发生时InnoDB会自动检测到并牺牲(回滚)其中的一个或者几个事务，以便让其他的事务继续执行下去。
• InnoDB选择牺牲的事务往往是代价比较小的事务，其代价计算是根据事务insert,update, delete的数据行规模决定
• 如果事务中的某个语句因为错误而回滚，则这个语句上的锁可能还会保留，是因为InnoDB仅会存储行锁信息，而不会存储行锁是由事务中的哪个语句产生的
• 如果在一个事务中，select语句调用了函数，而函数中的某个语句执行失败，则那个语句会回滚，如果在整个事务结束时执行rollback，则整个事务回滚
• 可以通过innodb_deadlock_detect 参数关闭死锁检测功能，而仅仅用innodb_lock_wait_timeout的功能来释放锁等待减少死锁发生的方法
• 在事务性数据库中，死锁是个经典的问题，但只要发生的频率不高则死锁问题不需要太过担心
• 查看死锁的方法有两种：
    • 通过show engine innodb status命令可以查看最后一个死锁的情况
    • 通过innodb_print_all_deadlocks参数配置可以将所有死锁的信息都打印到MySQL的错误日志中
• 减少死锁发生的方法：
    • 尽可能的保持事务小型化，减少事务执行的时间可以减少发生影响的概率
    • 及时执行commit或者rollback，来尽快的释放锁
    • 可以选用较低的隔离级别，比如如果要使用select... for update和select...lock in share mode语句时可以使用读取提交数据隔离级别
• 当要访问多个表数据或者要访问相同表的不同行集合时，尽可能的保证每次访问的顺序是相同的。比如可以将多个语句封装在存储过程中，通过调用同一个存储过程的方法可以减少死锁的发生减少死锁发生的方法
• 增加合适的索引以便语句执行所扫描的数据范围足够小
• 尽可能的少使用锁，比如如果可以承担幻读的情况，则直接使用select语句，而不要使用select...for update语句
• 如果没有其他更好的选择，则可以通过施加表级锁将事务执行串行化，最大限度的限制死锁发生
```



``` sql
SET autocommit=0;
LOCK TABLES t1 WRITE, t2 READ, ...;
 ... do something with tables t1 and t2 here ...
COMMIT;
UNLOCK TABLES;
```

 

## 参考文章
* https://www.cnblogs.com/dinghailong128/p/13450026.html