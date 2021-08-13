---
title: 监控分析-锁问题基础核查
---

::: tip
本文主要是介绍 监控分析-锁问题基础核查 。
:::

[[toc]]

## MySQL 锁的监控及处理

## 故障模拟

```ini
# 添加两项配置
vi /etc/my.cnf
[mysqld]
autocommit=0
innodb_lock_wait_timeout = 3600

systemctl restart mysqld

# 登录数据库
use klvchen;
UPDATE t1 SET k1='av' WHERE id=1;

# 新开一个窗口，再登录数据库
use klvchen;
UPDATE t1 SET k1='az' WHERE id=1;
# 此时页面卡住
```

## (一)看有没有锁等待

``` sql
# 新开一个窗口，登录数据库
SHOW  STATUS LIKE 'innodb_row_lock%';
+-------------------------------+-------+
| Variable_name                 | Value |
+-------------------------------+-------+
| Innodb_row_lock_current_waits | 1     |        # 当前正在等待锁的数量；
| Innodb_row_lock_time          | 0     |        # 从系统启动到现在锁定总时间长度；
| Innodb_row_lock_time_avg      | 0     |        # 每次等待所花平均时间；
| Innodb_row_lock_time_max      | 0     |        # 从系统启动到现在等待最长的一次所花的时间长度；
| Innodb_row_lock_waits         | 1     |        # 系统启动到现在总共等待的次数；
+-------------------------------+-------+
```

## (二)查看哪个事务在等待(被阻塞了)

``` sql
USE information_schema;
SELECT * FROM information_schema.INNODB_TRX WHERE trx_state='LOCK WAIT';
*************************** 1. row ***************************
                    trx_id: 14597                               # 事务ID号
                 trx_state: LOCK WAIT                           # 当前事务的状态
               trx_started: 2019-12-21 09:20:25
     trx_requested_lock_id: 14597:32:3:2
          trx_wait_started: 2019-12-21 09:20:25
                trx_weight: 2
       trx_mysql_thread_id: 3                                   # 连接层的,连接线程ID(SHOW PROCESSLIST ===>Id或trx_id )
                 trx_query: UPDATE t1 SET k1='az' WHERE id=1    # 当前被阻塞的操作(一般是要丢给开发的)
       trx_operation_state: starting index read
         trx_tables_in_use: 1
         trx_tables_locked: 1
          trx_lock_structs: 2
     trx_lock_memory_bytes: 1136
           trx_rows_locked: 1
         trx_rows_modified: 0
   trx_concurrency_tickets: 0
       trx_isolation_level: REPEATABLE READ
         trx_unique_checks: 1
    trx_foreign_key_checks: 1
trx_last_foreign_key_error: NULL
 trx_adaptive_hash_latched: 0
 trx_adaptive_hash_timeout: 0
          trx_is_read_only: 0
trx_autocommit_non_locking: 0

# 或者你可以简单地进行查看
select trx_state,trx_started,trx_wait_started,trx_weight,trx_rows_locked,now() from information_schema.innodb_trx;

# 字段说明：
trx_state            事务状态，有以下几种状态：RUNNING、LOCK WAIT、ROLLING BACK 和 COMMITTING
trx_started          事务开始时间
trx_wait_started     事务开始等待的时间
trx_weight           事务的权重
trx_rows_locked      事务锁住的记录数，包含标记为 DELETED，并且已经保存到磁盘但对事务不可见的行
```

## (三)查看锁源,谁锁的我

``` sql
SELECT * FROM sys.innodb_lock_waits;                          # 被锁的和锁定它的之间关系
*************************** 1. row ***************************
                wait_started: 2019-12-21 09:20:25
                    wait_age: 00:01:30
               wait_age_secs: 90
                locked_table: `klvchen`.`t1`                    # 哪张表出现的等待 
                locked_index: GEN_CLUST_INDEX
                 locked_type: RECORD
              waiting_trx_id: 14597                             # 等待的事务(与上个视图trx_id 对应)
         waiting_trx_started: 2019-12-21 09:20:25
             waiting_trx_age: 00:01:30
     waiting_trx_rows_locked: 1
   waiting_trx_rows_modified: 0
                 waiting_pid: 3                                 # 等待的线程号(与上个视图trx_mysql_thread_id)
               waiting_query: UPDATE t1 SET k1='az' WHERE id=1
             waiting_lock_id: 14597:32:3:2
           waiting_lock_mode: X
             blocking_trx_id: 14596                             # 锁源的事务ID 
                blocking_pid: 2                                 # 锁源的线程号
              blocking_query: NULL
            blocking_lock_id: 14596:32:3:2
          blocking_lock_mode: X
        blocking_trx_started: 2019-12-21 09:20:12
            blocking_trx_age: 00:01:43
    blocking_trx_rows_locked: 5
  blocking_trx_rows_modified: 0
     sql_kill_blocking_query: KILL QUERY 2
sql_kill_blocking_connection: KILL 2
```

## (四)找到锁源的 thread_id

``` sql
SELECT * FROM performance_schema.threads WHERE processlist_id=2;
*************************** 1. row ***************************
          THREAD_ID: 27
               NAME: thread/sql/one_connection
               TYPE: FOREGROUND
     PROCESSLIST_ID: 2
   PROCESSLIST_USER: root
   PROCESSLIST_HOST: localhost
     PROCESSLIST_DB: klvchen
PROCESSLIST_COMMAND: Sleep
   PROCESSLIST_TIME: 261
  PROCESSLIST_STATE: NULL
   PROCESSLIST_INFO: UPDATE t1 SET k1='av' WHERE id=1
   PARENT_THREAD_ID: 1
               ROLE: NULL
       INSTRUMENTED: YES
            HISTORY: YES
    CONNECTION_TYPE: Socket
       THREAD_OS_ID: 2557
```

## (五)找到锁源的SQL语句

``` sql
-- 当前在执行的语句
SELECT * FROM performance_schema.`events_statements_current` WHERE thread_id=27;
*************************** 1. row ***************************
              THREAD_ID: 27
               EVENT_ID: 8
           END_EVENT_ID: 8
             EVENT_NAME: statement/sql/update
                 SOURCE: 
            TIMER_START: 16785505578000
              TIMER_END: 16785741560000
             TIMER_WAIT: 235982000
              LOCK_TIME: 126000000
               SQL_TEXT: UPDATE t1 SET k1='av' WHERE id=1
                 DIGEST: c75120019b1993cf2423bd9add827987
            DIGEST_TEXT: UPDATE `t1` SET `k1` = ? WHERE `id` = ? 
         CURRENT_SCHEMA: klvchen
            OBJECT_TYPE: NULL
          OBJECT_SCHEMA: NULL
            OBJECT_NAME: NULL
  OBJECT_INSTANCE_BEGIN: NULL
            MYSQL_ERRNO: 0
      RETURNED_SQLSTATE: 00000
           MESSAGE_TEXT: Rows matched: 1  Changed: 0  Warnings: 0
                 ERRORS: 0
               WARNINGS: 0
          ROWS_AFFECTED: 0
              ROWS_SENT: 0
          ROWS_EXAMINED: 4
CREATED_TMP_DISK_TABLES: 0
     CREATED_TMP_TABLES: 0
       SELECT_FULL_JOIN: 0
 SELECT_FULL_RANGE_JOIN: 0
           SELECT_RANGE: 0
     SELECT_RANGE_CHECK: 0
            SELECT_SCAN: 0
      SORT_MERGE_PASSES: 0
             SORT_RANGE: 0
              SORT_ROWS: 0
              SORT_SCAN: 0
          NO_INDEX_USED: 0
     NO_GOOD_INDEX_USED: 0
       NESTING_EVENT_ID: NULL
     NESTING_EVENT_TYPE: NULL
    NESTING_EVENT_LEVEL: 0

-- 执行语句的历史
SELECT * FROM performance_schema.`events_statements_history` WHERE thread_id=27;
```

得出结果,丢给开发

表信息

被阻塞的

锁源SQL

## 快速方法

### 方法 一

``` sql
# 查看有没有锁表
SHOW  STATUS LIKE 'innodb_row_lock%';

# 获取正在等待的语句，kill 锁源语句，锁源ID，锁源线程ID
select a.waiting_query  as '被锁住的SQL语句', a.sql_kill_blocking_connection, a.blocking_pid, b.THREAD_ID AS '锁源线程ID'
from
(SELECT waiting_query, sql_kill_blocking_connection, blocking_pid FROM sys.innodb_lock_waits) a, 
(SELECT THREAD_ID, PROCESSLIST_ID FROM performance_schema.threads WHERE processlist_id IN (SELECT blocking_pid FROM sys.innodb_lock_waits)) b 
where a.blocking_pid = b.PROCESSLIST_ID order by b.THREAD_ID;

# 查出锁源 SQL 语句
SELECT THREAD_ID, SQL_TEXT AS '锁源当前执行的SQL语句' ,CURRENT_SCHEMA AS '数据库' FROM performance_schema.`events_statements_current` WHERE thread_id IN (SELECT THREAD_ID FROM performance_schema.threads pt WHERE processlist_id IN (SELECT blocking_pid FROM sys.innodb_lock_waits));
```

### 方法 二

``` sql
# 查看有没有锁表
SHOW  STATUS LIKE 'innodb_row_lock%';

# 获取正在等待的语句，kill 锁源语句，锁源ID
SELECT waiting_query as '被锁住的SQL语句',sql_kill_blocking_connection,blocking_pid FROM sys.innodb_lock_waits;

# 查找对应关系
SELECT THREAD_ID AS '锁源线程ID', PROCESSLIST_ID FROM performance_schema.threads WHERE processlist_id IN (SELECT blocking_pid FROM sys.innodb_lock_waits);

# 查出锁源 SQL 语句
SELECT THREAD_ID, SQL_TEXT AS '锁源当前执行的SQL语句' ,CURRENT_SCHEMA AS '数据库' FROM performance_schema.`events_statements_current` WHERE thread_id IN (SELECT THREAD_ID FROM performance_schema.threads pt WHERE processlist_id IN (SELECT blocking_pid FROM sys.innodb_lock_waits));
```



## 参考文章
* https://www.cnblogs.com/klvchen/p/12076019.html