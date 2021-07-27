---
title: MySQL-函数
---

::: tip
本文主要是介绍 MySQL-函数 。
:::

[[toc]]

## 基础定义
存储函数和存储过程一样，都是在数据库中定义一些 SQL 语句的集合。存储函数可以通过 return 语句返回函数值，主要用于计算并返回一个值。而存储过程没有直接返回值，主要用于执行操作。

在 MySQL 中，使用 **CREATE FUNCTION** 语句来创建存储函数，其语法形式如下：
``` sql
CREATE FUNCTION sp_name ([func_parameter[...]])
RETURNS type
[characteristic ...] routine_body
```

其中：

* sp_name 参数：表示存储函数的名称；
* func_parameter：表示存储函数的参数列表；
* RETURNS type：指定返回值的类型；
* characteristic 参数：指定存储函数的特性，该参数的取值与存储过程是一样的；
* routine_body 参数：表示 SQL 代码的内容，可以用 BEGIN...END 来标示 SQL 代码的开始和结束。


注意：在具体创建函数时，函数名不能与已经存在的函数名重名。除了上述要求外，推荐函数名命名（标识符）为 function_xxx 或者 func_xxx。

func_parameter 可以由多个参数组成，其中每个参数由参数名称和参数类型组成，其形式如下：

[IN | OUT | INOUT] param_name type;

其中：

* IN 表示输入参数，OUT 表示输出参数，INOUT 表示既可以输入也可以输出；
*  param_name 参数是存储函数的参数名称；
* type 参数指定存储函数的参数类型，该类型可以是 MySQL 数据库的任意数据类型。

### 函数创建例

使用 CREATE FUNCTION 创建查询 tb_student 表中某个学生姓名的函数，SQL 语句和执行过程如下：

``` sql
mysql> USE test;
Database changed
mysql> DELIMITER //
mysql> CREATE FUNCTION func_student(id INT(11))
    -> RETURNS VARCHAR(20)
    -> COMMENT '查询某个学生的姓名'
    -> BEGIN
    -> RETURN(SELECT name FROM tb_student WHERE tb_student.id = id);
    -> END //
Query OK, 0 rows affected (0.10 sec)
mysql> DELIMITER ;
```

上述代码中，创建了 func_student 函数，该函数拥有一个类型为 INT(11) 的参数 id，返回值为 VARCHAR(20) 类型。SELECT 语句从 tb_student 表中查询 id 字段值等于所传入参数 id 值的记录，同时返回该条记录的 name 字段值。

创建函数与创建存储过程一样，需要通过命令 `DELIMITER //` 将 SQL 语句的结束符由“;”修改为“//”，最后通过命令 `DELIMITER ;` 将结束符号修改成 SQL 语句中默认的结束符号。

如果在存储函数中的 RETURN 语句返回一个类型不同于函数的 RETURNS 子句中指定类型的值，返回值将被强制为恰当的类型。比如，如果一个函数返回一个 ENUM 或 SET 值，但是 RETURN 语句返回一个整数，对于 SET 成员集的相应的 ENUM 成员，从函数返回的值是字符串。

### 拓展阅读

由于存储函数和存储过程的查看、修改、删除等操作几乎相同，所以我们不再详细讲解如何操作存储函数了。

查看存储函数的语法如下：

SHOW FUNCTION STATUS LIKE 存储函数名;
SHOW CREATE FUNCTION 存储函数名;
SELECT * FROM information_schema.Routines WHERE ROUTINE_NAME=存储函数名;

可以发现，操作存储函数和操作存储过程不同的是将 PROCEDURE 替换成了 FUNCTION。同样，修改存储函数的语法如下：

ALTER FUNCTION 存储函数名 [ 特征 ... ]

存储函数的特征与存储过程的基本一样。

删除存储过程的语法如下：

DROP FUNCTION [ IF EXISTS ] <函数名>

## 参考文章
* http://c.biancheng.net/view/7838.html
* https://blog.csdn.net/weixin_45743799/category_9547295.html