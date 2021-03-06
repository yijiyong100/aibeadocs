---
title: MySQL-事务
---

::: tip
本文主要是介绍 MySQL-事务 。
:::

[[toc]]

## 事务

### 概念

- 事务就是一组原子性的SQL查询，或者说是一个独立的工作单元。如果数据库引擎能够成功的对数据库应用该组查询的全部语句，那么就执行该查询，否则所有的语句都不会执行。综述：事务内的语句，要么全部执行成功，要么全部执行失败。

### 事务中的相关术语

1. 事务：是指一组SQL语句。
2. 回退：指撤销指定SQL语句的过程。
3. 提交：将未存储的SQL语句结果写入数据库表。
4. 保留点：指事务处理中设置的临时占位符，你可以对他发布回退。

### 事务的相关操作

1. 使用ROLLBACK
   - 你不能回退CREATE 或 DROP操作，你可以将要回退的代码写在START TRANSACTION 和 ROLLBACK之间。
2. 使用COMMIT
   - 在事务处理块中，提交不会隐式进行，需要在提交的位置写明COMMIT语句，注意，如果在事务块中有语句执行错误，则整个语句都不会被执行。
3. 使用保留点
   - 可以使用SAVEPOINT语句创建一个保留点。使用ROLLBACK TO savePointName来回退到保留点。保留点会在事务结束时自动释放，你也可以使用RELEASE SAVEPOINT来释放保留点。
4. 更改默认提交行为
   - 你可以使用SET autocommit = 0；来指定MySQL不自动提交更改。

### 事务的ACID特性

1. 原子性：一个事务必须被视为一个不可分割的最小工作单元，事务中的所有操纵要么全部提交成功，要么全部失败回滚。
2. 一致性：数据库总是从一个一致性的状态转换到另一个一致性的状态。数据在传说过程中是处于一个中间状态的，中间状态对人是透明的，事务的一致性就是为了监视中间状态的数据库数据，如果有不符合系统设定的变化则立刻将事务回滚。
3. 隔离性：一个事务所做的修改在最终提交之前对其他事务是不可见的。
4. 持久性：一旦事务提交，则其所做的修改就会永远保存到数据库中。

### 事务的隔离级别

- SQL标准中定义了4种隔离级别，每一种级别都规定了一个事务中所做的修改，哪些在事务内和事务间是可见的，哪些是不可见的。较低级别的隔离级别通常可以执行更高的并发，系统开销也更低。MySQL可以通过执行SET TRANSACTION ISOLATIN LEVEL READ COMMITTED命令设置隔离级别，新的隔离级别会在下一个事务开始的时候生效。

1. 未提交读：事务中的修改即使没有提交也对其他事务可见。
   - 脏读：在这一级别中，事务可以读取未提交的数据。
2. 提交读（不可重复读）：提交读解决了脏读的问题。一个事务开始时，只能看见已提交事务所做的修改。换句话说，一个事务从开始直到提交之前，所做的任何操作对其他事务都是不可见的。
   - 不可重复读：一个事务在多次读取同一数据时的结果不一样，数据被另一个事务修改了。
3. 可重复读：可重复读保证了在同一个事务中多次读取记录的结果是一致的。一个事务不会修改其他事务读取但未回滚的数据。可重复读是MySQL的默认事务隔离级别。
   - 幻读：指的是当某个事务在读取某个范围内的记录时，另外一个事务又在该范围内插入（或删除）了新的记录（记录），当之前的事务再次读取该范围的记录时会产生幻行。
4. 可串行化：是最高的隔离级别。它通过强制事务串行执行，避免了前面说的幻读问题。但是这一级别会在读取的每一行数据上都加锁，所以可能导致大量的超时和锁争用的问题。一般只有非常需要保证数据的一致性而且可以接受没有并发的情况下使用。

### 死锁

- InnoDB目前处理死锁的办法是，将持有最少行级排他锁的事务进行回滚。

### 事务日志（预写式日志）

- 使用事务日志，存储引擎在修改表的数据时只需要修改其内存拷贝，再把该修改行为记录到持久在硬盘上的事务日志中，而不用每次都将修改的数据本身持久到磁盘。事务日志持久之后，内存中被修改的数据在后台可以慢慢的刷回磁盘。写日志的操作是操作磁盘上的一小块区域，是顺序I/O。而直接持久化到硬盘是随机I/O。

### MySQL中的事务

- MySQL默认采用自动提交模式，也就是说如果不是显示的开始一个事务，则每个查询都被当作一个事务执行提交操作。当autocommit = 0时，所有的查询都是在一个事务中，直到显示执行COMMIT或ROLLBACK时，该事务结束，同时又开始了另一个新事务。
- 执行一些命令之前会强制执行COMMIT提交当前的事务，如果是会导致大量数据改变的操作，比如ALTER TABLE和LOCK TABLES。
- 事务是由下层的存储引擎实现的。所以在同一个事物中，使用多种存储引擎是不可靠的。
- InnoDB采用两段锁协议。在事务执行过程中，随时都可以执行锁定，锁只有在执行了COMMIT或ROLLBACK后才会被释放，并且所有的锁是同一时刻被释放的。
- 两段锁协议：每个事务的执行分为生长阶段和衰退阶段。生长阶段只能加锁，衰退阶段只能释放锁。生长阶段在衰退阶段之前。
- InnoDB支持通过特定的语句进行显示锁定，这些锁定不属于SQL规范。
  - SELECT ... LOCK IN SHARE MODE
  - SELECT ... FOR UPDATE
- MySQL也支持LOCK TABLES和UNLOCK TABLES

### mysql中事务包含两种启动方式
显示启动事务语句，begin或者start transcation。配套的提交语句是commit，回滚语句为rollback。
形如：
		START TRANSACTION;
		事务代码
		commit;

比如更新用户名：
	    START TRANSACTION;
		update t_user set username='jack' where id=1;
		commit;

set autocommit=0，这个命令会将这个线程的更新自动提交掉。这意味着如果你只执行一个select语句，这个事务就启动了，并且不会自动提交。这个事务持续存在知道你主动执行commit或rollback语句，或者链接断开。
mysql中查看当前自动提交状态的命令为：show VARIABLES like 'autocommit'; 如下value为on代表是自动提交已经打开。

## 参考文章
* https://www.cnblogs.com/bianjunting/p/14344244.html