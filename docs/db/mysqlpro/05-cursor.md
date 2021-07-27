---
title: MySQL-游标
---

::: tip
本文主要是介绍 MySQL-游标 。
:::

[[toc]]

## MySQL游标（Cursor）的定义及使用

在 MySQL 中，存储过程或函数中的查询有时会返回多条记录，而使用简单的 SELECT 语句，没有办法得到第一行、下一行或前十行的数据，这时可以使用游标来逐条读取查询结果集中的记录。游标在部分资料中也被称为光标。

关系数据库管理系统实质是面向集合的，在 MySQL 中并没有一种描述表中单一记录的表达形式，除非使用 WHERE 子句来限制只有一条记录被选中。所以有时我们必须借助于游标来进行单条记录的数据处理。

一般通过游标定位到结果集的某一行进行数据修改。

> 结果集是符合 SQL 语句的所有记录的集合。

个人理解游标就是一个标识，用来标识数据取到了什么地方，如果你了解编程语言，可以把他理解成数组中的下标。

不像多数 DBMS，MySQL 游标只能用于存储过程和函数。

 

下面介绍游标的使用，主要包括游标的声明、打开、使用和关闭。

## 1. 声明游标

MySQL 中使用 **DECLARE** 关键字来声明游标，并定义相应的 SELECT 语句，根据需要添加 WHERE 和其它子句。其语法的基本形式如下：

DECLARE cursor_name CURSOR FOR select_statement;

其中，cursor_name 表示游标的名称；select_statement 表示 SELECT 语句，可以返回一行或多行数据。

### 游标声明样例

下面声明一个名为 nameCursor 的游标，代码如下：

``` sql
mysql> DELIMITER //
mysql> CREATE PROCEDURE processnames()
    -> BEGIN
    -> DECLARE nameCursor CURSOR
    -> FOR
    -> SELECT name FROM tb_student;
    -> END//
Query OK, 0 rows affected (0.07 sec)
```

以上语句定义了 nameCursor 游标，游标只局限于存储过程中，存储过程处理完成后，游标就消失了。

## 2. 打开游标

声明游标之后，要想从游标中提取数据，必须首先打开游标。在 MySQL 中，打开游标通过 **OPEN** 关键字来实现，其语法格式如下：

OPEN cursor_name;

其中，cursor_name 表示所要打开游标的名称。需要注意的是，打开一个游标时，游标并不指向第一条记录，而是指向第一条记录的前边。

在程序中，一个游标可以打开多次。用户打开游标后，其他用户或程序可能正在更新数据表，所以有时会导致用户每次打开游标后，显示的结果都不同。

## 3. 使用游标

游标顺利打开后，可以使用 **FETCH...INTO** 语句来读取数据，其语法形式如下：

FETCH cursor_name INTO var_name [,var_name]...

上述语句中，将游标 cursor_name 中 SELECT 语句的执行结果保存到变量参数 var_name 中。变量参数 var_name 必须在游标使用之前定义。使用游标类似高级语言中的数组遍历，当第一次使用游标时，此时游标指向结果集的第一条记录。

MySQL 的游标是只读的，也就是说，你只能顺序地从开始往后读取结果集，不能从后往前，也不能直接跳到中间的记录。

## 4. 关闭游标

游标使用完毕后，要及时关闭，在 MySQL 中，使用 **CLOSE** 关键字关闭游标，其语法格式如下：

CLOSE cursor_name;

CLOSE 释放游标使用的所有内部内存和资源，因此每个游标不再需要时都应该关闭。

在一个游标关闭后，如果没有重新打开，则不能使用它。但是，使用声明过的游标不需要再次声明，用 OPEN 语句打开它就可以了。

如果你不明确关闭游标，MySQL 将会在到达 END 语句时自动关闭它。游标关闭之后，不能使用 FETCH 来使用该游标。

###  关闭游标样例

创建 users 数据表，并插入数据，SQL 语句和运行结果如下：

``` sql
mysql> CREATE TABLE `users`
    ->  (
    ->  `ID` BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
    ->  `user_name` VARCHAR(60),
    ->  `user_pass` VARCHAR(64),
    ->  PRIMARY KEY (`ID`)
    -> );
Query OK, 0 rows affected (0.06 sec)

mysql> INSERT INTO users VALUES(null,'sheng','sheng123'),
    -> (null,'yu','yu123'),
    -> (null,'ling','ling123');
Query OK, 3 rows affected (0.01 sec)
```

创建存储过程 test_cursor，并创建游标 cur_test，查询 users 数据表中的第 3 条记录，SQL 语句和执行过程如下：

``` sql
mysql> DELIMITER //
mysql> CREATE PROCEDURE test_cursor (in param INT(10),out result VARCHAR(90))
    -> BEGIN
    -> DECLARE name VARCHAR(20);
    -> DECLARE pass VARCHAR(20);
    -> DECLARE done INT;
    -> DECLARE cur_test CURSOR FOR SELECT user_name,user_pass FROM users;
    -> DECLARE continue handler FOR SQLSTATE '02000' SET done = 1;
    -> IF param THEN INTO result FROM users WHERE id = param;
    -> ELSE
    -> OPEN cur_test;
    -> repeat
    -> FETCH cur_test into name,pass;
    -> SELECT concat_ws(',',result,name,pass) INTO result;
    -> until done
    -> END repeat;
    -> CLOSE cur_test;
    -> END IF;
    -> END //
Query OK, 0 rows affected (0.10 sec)

mysql> call test_cursor(3,@test)//
Query OK, 1 row affected (0.03 sec)

mysql> select @test//
+-----------+
| @test     |
+-----------+
| ling,ling123 |
+-----------+
1 row in set (0.00 sec)
```

创建 pro_users() 存储过程，定义 cur_1 游标，将表 users 中的 user_name 字段全部修改为 MySQL，SQL 语句和执行过程如下。

``` sql
mysql> CREATE PROCEDURE pro_users()
    -> BEGIN
    -> DECLARE result VARCHAR(100);
    -> DECLARE no INT;
    -> DECLARE cur_1 CURSOR FOR SELECT user_name FROM users;
    -> DECLARE CONTINUE HANDLER FOR NOT FOUND SET no=1;
    -> SET no=0;
    -> OPEN cur_1;
    -> WHILE no=0 do
    -> FETCH cur_1 into result;
    -> UPDATE users SET user_name='MySQL'
    -> WHERE user_name=result;
    -> END WHILE;
    -> CLOSE cur_1;
    -> END //
Query OK, 0 rows affected (0.05 sec)

mysql> call pro_users() //
Query OK, 0 rows affected (0.03 sec)

mysql> SELECT * FROM users //
+----+-----------+-----------+
| ID | user_name | user_pass |
+----+-----------+-----------+
|  1 | MySQL     | sheng      |
|  2 | MySQL     | zhang     |
|  3 | MySQL     | ying      |
+----+-----------+-----------+
3 rows in set (0.00 sec)
```

结果显示，users 表中的 user_name 字段已经全部修改为 MySQL。

## 参考文章
* http://c.biancheng.net/view/7823.html
* https://blog.csdn.net/weixin_45743799/category_9547295.html