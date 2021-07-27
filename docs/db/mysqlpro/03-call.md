---
title: MySQL-存储过程和函数调用
---

::: tip
本文主要是介绍 MySQL-存储过程和函数调用 。
:::

[[toc]]

存储过程和存储函数都是存储在服务器端的 SQL 语句集合。要想使用这些已经定义好的存储过程和存储函数就必须要通过调用的方式来实现。

存储过程通过 CALL 语句来调用，存储函数的使用方法与 MySQL 内部函数的使用方法相同。执行存储过程和存储函数需要拥有 EXECUTE 权限（EXECUTE 权限的信息存储在 information_schema 数据库下的 USER_PRIVILEGES 表中）。

本节主要讲解如何调用存储过程和存储函数。

## 调用存储过程

MySQL 中使用 **CALL** 语句来调用存储过程。调用存储过程后，数据库系统将执行存储过程中的 SQL 语句，然后将结果返回给输出值。

CALL 语句接收存储过程的名字以及需要传递给它的任意参数，基本语法形式如下：

CALL sp_name([parameter[...]]);

其中，sp_name 表示存储过程的名称，parameter 表示存储过程的参数。

### 调用存储过程

下面调用创建的存储过程，SQL 语句和执行过程如下：

例 1

``` sql
mysql> DELIMITER ;
mysql> CALL ShowStuScore();
+--------------+---------------+
| student_name | student_score |
+--------------+---------------+
| Dany         |            90 |
| Green        |            99 |
| Henry        |            95 |
| Jane         |            98 |
| Jim          |            88 |
| John         |            94 |
| Lily         |           100 |
| Susan        |            96 |
| Thomas       |            93 |
| Tom          |            89 |
+--------------+---------------+
10 rows in set (0.00 sec)
Query OK, 0 rows affected (0.02 sec)

mysql> CALL GetScoreByStu('Green');
+---------------+
| student_score |
+---------------+
|            99 |
+---------------+
1 row in set (0.03 sec)
Query OK, 0 rows affected (0.03 sec)
```

因为存储过程实际上也是一种函数，所以存储过程名后需要有`( )`符号，即使不传递参数也需要。

## 调用存储函数

在 MySQL 中，存储函数的使用方法与 MySQL 内部函数的使用方法是一样的。换言之，用户自己定义的存储函数与 MySQL 内部函数是一个性质的。区别在于，存储函数是用户自己定义的，而内部函数是 MySQL 开发者定义的。

### 调用函数

下面调用创建的存储函数，SQL 语句和执行过程如下：

例 2

``` sql
mysql> SELECT func_student(3);
+-----------------+
| func_student(3) |
+-----------------+
| 王五            |
+-----------------+
1 row in set (0.10 sec)
```


通过例 1 和例 2 的比较，可以看出虽然存储函数和存储过程的定义稍有不同，但它们都可以实现相同的功能，我们应该在实际应用中灵活选择。

## 参考文章
* http://c.biancheng.net/view/7996.html
* https://blog.csdn.net/weixin_45743799/category_9547295.html