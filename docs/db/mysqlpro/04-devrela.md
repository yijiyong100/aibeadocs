---
title: MySQL-存储过程函数开发
---

::: tip
本文主要是介绍 MySQL-存储过程函数开发，包括变量、流程、条件控制等 。
:::

[[toc]]

## MySQL变量的定义和赋值

在 MySQL 中，除了支持标准的存储过程和函数外，还引入了表达式。表达式与其它高级语言的表达式一样，由变量、运算符和流程控制来构成。

变量是表达式语句中最基本的元素，可以用来临时存储数据。在存储过程和函数中都可以定义和使用变量。用户可以使用 DECLARE 关键字来定义变量，定义后可以为变量赋值。这些变量的作用范围是 BEGIN...END 程序段中。

下面将讲解如何定义变量和为变量赋值。

## 1. 定义变量

MySQL 中可以使用 **DECLARE** 关键字来定义变量，其基本语法如下：

DECLARE var_name[,...] type [DEFAULT value]

其中：

- DECLARE 关键字是用来声明变量的；
- var_name 参数是变量的名称，这里可以同时定义多个变量；
- type 参数用来指定变量的类型；
- DEFAULT value 子句将变量默认值设置为 value，没有使用 DEFAULT 子句时，默认值为 NULL。

### 变量定义样例

下面定义变量 my_sql，数据类型为 INT 类型，默认值为 10。SQL 语句如下：

DECLARE my_sql INT DEFAULT 10;

## 2. 为变量赋值

MySQL 中可以使用 **SET** 关键字来为变量赋值，SET 语句的基本语法如下：

SET var_name = expr[,var_name = expr]...

其中：

- SET 关键字用来为变量赋值；
- var_name 参数是变量的名称；
- expr 参数是赋值表达式。


注意：一个 SET 语句可以同时为多个变量赋值，各个变量的赋值语句之间用逗号隔开。

### 变量赋值样例

下面为变量 my_sql 赋值为 30。SQL 语句如下：

SET my_sql=30;

MySQL 中还可以使用 **SELECT..INTO** 语句为变量赋值。其基本语法如下：

SELECT col_name [...] INTO var_name[,...]
FROM table_name WEHRE condition

其中：

- col_name 参数表示查询的字段名称；
- var_name 参数是变量的名称；
- table_name 参数指表的名称；
- condition 参数指查询条件。


注意：当将查询结果赋值给变量时，该查询语句的返回结果只能是单行。

### 查询结果赋值样例

下面从 tb_student 表中查询 id 为 2 的记录，将该记录的 id 值赋给变量 my_sql。SQL 语句如下：

SELECT id INTO my_sql FROM tb_student WEHRE id=2；

## 【----------------------------】

## MySQL定义条件和处理程序

在程序的运行过程中可能会遇到问题，此时我们可以通过定义条件和处理程序来事先定义这些问题。

定义条件是指事先定义程序执行过程中遇到的问题，处理程序定义了在遇到这些问题时应当采取的处理方式和解决办法，保证存储过程和函数在遇到警告或错误时能继续执行，从而增强程序处理问题的能力，避免程序出现异常被停止执行。

下面将详细讲解如何定义条件和处理程序。

## 1. 定义条件

MySQL 中可以使用 **DECLARE** 关键字来定义条件。其基本语法如下：

``` sql
DECLARE condition_name CONDITION FOR condition_value
condition value:
SQLSTATE [VALUE] sqlstate_value | mysql_error_code
```

其中：

- condition_name 参数表示条件的名称；
- condition_value 参数表示条件的类型；
- sqlstate_value 参数和 mysql_error_code 参数都可以表示 MySQL 的错误。sqlstate_value 表示长度为 5 的字符串类型错误代码，mysql_error_code 表示数值类型错误代码。例如 ERROR 1146(42S02) 中，sqlstate_value 值是 42S02，mysql_error_code 值是 1146。

例子：

下面定义“ERROR 1146 (42S02)”这个错误，名称为 can_not_find。 可以用两种不同的方法来定义，代码如下：

``` sql
//方法一：使用sqlstate_value
DECLARE can_not_find CONDITION FOR SQLSTATE '42S02';

//方法二：使用 mysql_error_code
DECLARE can_not_find CONDITION FOR 1146;
```

## 2. 定义处理程序

MySQL 中可以使用 **DECLARE** 关键字来定义处理程序。其基本语法如下：

``` sql
DECLARE handler_type HANDLER FOR condition_value[...] sp_statement
handler_type:
CONTINUE | EXIT | UNDO
condition_value:
SQLSTATE [VALUE] sqlstate_value | condition_name | SQLWARNING | NOT FOUND | SQLEXCEPTION | mysql_error_code
```

其中，handler_type 参数指明错误的处理方式，该参数有 3 个取值。这 3 个取值分别是 CONTINUE、EXIT 和 UNDO。

- CONTINUE 表示遇到错误不进行处理，继续向下执行；
- EXIT 表示遇到错误后马上退出；
- UNDO 表示遇到错误后撤回之前的操作，MySQL 中暂时还不支持这种处理方式。


注意：通常情况下，执行过程中遇到错误应该立刻停止执行下面的语句，并且撤回前面的操作。但是，MySQL 中现在还不能支持 UNDO 操作。因此，遇到错误时最好执行 EXIT 操作。如果事先能够预测错误类型，并且进行相应的处理，那么可以执行 CONTINUE 操作。

参数指明错误类型，该参数有 6 个取值：

- sqlstate_value：包含 5 个字符的字符串错误值；
- condition_name：表示 DECLARE 定义的错误条件名称；
- SQLWARNING：匹配所有以 01 开头的 sqlstate_value 值；
- NOT FOUND：匹配所有以 02 开头的 sqlstate_value 值；
- SQLEXCEPTION：匹配所有没有被 SQLWARNING 或 NOT FOUND 捕获的 sqlstate_value 值；
- mysql_error_code：匹配数值类型错误代码。


sp_statement 参数为程序语句段，表示在遇到定义的错误时，需要执行的一些存储过程或函数。

###  定义处理程序样例

下面是定义处理程序的几种方式，代码如下：

``` sql
//方法一：捕获 sqlstate_value
DECLARE CONTINUE HANDLER FOR SQLSTATE '42S02' SET @info='CAN NOT FIND';

//方法二：捕获 mysql_error_code
DECLARE CONTINUE HANDLER FOR 1146 SET @info='CAN NOT FIND';

//方法三：先定义条件，然后调用
DECLARE can_not_find CONDITION FOR 1146;
DECLARE CONTINUE HANDLER FOR can_not_find SET @info='CAN NOT FIND';

//方法四：使用 SQLWARNING
DECLARE EXIT HANDLER FOR SQLWARNING SET @info='ERROR';

//方法五：使用 NOT FOUND
DECLARE EXIT HANDLER FOR NOT FOUND SET @info='CAN NOT FIND';

//方法六：使用 SQLEXCEPTION
DECLARE EXIT HANDLER FOR SQLEXCEPTION SET @info='ERROR';
```

上述代码是 6 种定义处理程序的方法。

1. 捕获 sqlstate_value 值。如果遇到 sqlstate_value 值为 42S02，执行 CONTINUE 操作，并且输出“CAN NOT FIND”信息。
2. 捕获 mysql_error_code 值。如果遇到 mysql_error_code 值为 1146， 执行 CONTINUE 操作，并且输出“CAN NOT FIND”信息。
3. 先定义条件，然后再调用条件。这里先定义 can_not_find 条件，遇到 1146 错误就执行 CONTINUE 操作。
4. 使用 SQLWARNING。SQLWARNING 捕获所有以 01 开头的 sqlstate_value 值，然后执行 EXIT 操作，并且输出“ERROR"信息。
5. 使用 NOT FOUND。NOT FOUND 捕获所有以 02 开头的 sqlstate_value 值，然后执行 EXIT 操作，并且输出“CAN NOT FIND”信息。
6. 使用 SQLEXCEPTION。 SQLEXCEPTION 捕获所有没有被 SQLWARNING 或 NOT FOUND 捕获的 sqlstate_value 值，然后执行 EXIT 操作，并且输出“ERROR”信息。

### 条件和处理顺序样例

定义条件和处理顺序，具体的执行过程如下：

``` sql
mysql> CREATE TABLE t8(s1 INT,PRIMARY KEY(s1));
Query OK, 0 rows affected (0.07 sec)

mysql> DELIMITER //
mysql> CREATE PROCEDURE handlerdemo()
    -> BEGIN
    -> DECLARE CONTINUE HANDLER FOR SQLSTATE '23000' SET @X2=1;
    -> SET @X=1;
    -> INSERT INTO t8 VALUES(1);
    -> SET @X=2;
    -> INSERT INTO t8 VALUES(1);
    -> SET @X=3;
    -> END //
Query OK, 0 rows affected (0.02 sec)

mysql> DELIMITER ;
mysql> CALL handlerdemo();
Query OK, 0 rows affected (0.01 sec)

mysql> SELECT @X;
+------+
| @X   |
+------+
|    3 |
+------+
1 row in set (0.00 sec)
```

上述代码中，@X 是一个用户变量，执行结果 @X 等于 3，这表明 MySQL 执行到程序的末尾。

如果`DECLARE CONTINUE HANDLER FOR SQLSTATE '23000' SET @X2=1;`这一行不存在，第二个 INSERT 因 PRIMARY KEY 约束而失败之后，MySQL 可能已经采取 EXIT 策略，且 SELECT @X 可能已经返回 2。

注意：@X 表示用户变量，使用 SET 语句为其赋值，用户变量与连接有关，一个客户端定义的变量不能被其他客户端所使用，当客户端退出时，该客户端连接的所有变量将自动释放。

## 【----------------------------】

## MySQL流程控制语句详解

在存储过程和自定义函数中可以使用流程控制语句来控制程序的流程。MySQL 中流程控制语句有：IF 语句、CASE 语句、LOOP 语句、LEAVE 语句、ITERATE 语句、REPEAT 语句和 WHILE 语句等。

下面将详细讲解这些流程控制语句。

## 1. IF语句

IF 语句用来进行条件判断，根据是否满足条件（可包含多个条件），来执行不同的语句，是流程控制中最常用的判断语句。其语法的基本形式如下：

``` sql
IF search_condition THEN statement_list
    [ELSEIF search_condition THEN statement_list]...
    [ELSE statement_list]
END IF
```

其中，search_condition 参数表示条件判断语句，如果返回值为 TRUE ，相应的 SQL 语句列表（statement_list）被执行；如果返回值为 FALSE，则 ELSE 子句的语句列表被执行。statement_list 可以包括一个或多个语句。



下面是一个使用 IF 语句的示例。代码如下：

``` sql
IF age>20 THEN SET @count1=@count1+1;
    ELSEIF age=20 THEN @count2=@count2+1;
    ELSE @count3=@count3+1;
END lF;
```

该示例根据 age 与 20 的大小关系来执行不同的 SET 语句。如果 age 值大于20，那么将 count1 的值加 1；如果 age 值等于 20，那么将 count2 的值加 1；其他情况将 count3 的值加 1。IF 语句都需要使用 END IF 来结束。

## 2. CASE语句

CASE 语句也是用来进行条件判断的，它提供了多个条件进行选择，可以实现比 IF 语句更复杂的条件判断。CASE 语句的基本形式如下：

``` sql
CASE case_value
    WHEN when_value THEN statement_list
    [WHEN when_value THEN statement_list]...
    [ELSE statement_list]
END CASE
```

其中：

- case_value 参数表示条件判断的变量，决定了哪一个 WHEN 子句会被执行；
- when_value 参数表示变量的取值，如果某个 when_value 表达式与 case_value 变量的值相同，则执行对应的 THEN 关键字后的 statement_list 中的语句；
- statement_list 参数表示 when_value 值没有与 case_value 相同值时的执行语句。
- CASE 语句都要使用 END CASE 结束。


CASE 语句还有另一种形式。该形式的语法如下：

``` sql
CASE
    WHEN search_condition THEN statement_list
    [WHEN search_condition THEN statement_list] ...
    [ELSE statement_list]
END CASE
```

其中，search_condition 参数表示条件判断语句；statement_list 参数表示不同条件的执行语句。

与上述语句不同的是，该语句中的 WHEN 语句将被逐个执行，直到某个 search_condition 表达式为真，则执行对应 THEN 关键字后面的 statement_list 语句。如果没有条件匹配，ELSE 子句里的语句被执行。

> 这里介绍的 CASE 语句与“控制流程函数”里描述的 SQL CASE 表达式的 [CASE 语句](http://c.biancheng.net/mysql/case.html)有轻微的不同。这里的 CASE 语句不能有 ELSE NULL 语句，并且用 END CASE 替代 END 来终止。


下面是一个使用 CASE 语句的示例。代码如下：

``` sql
CASE age
    WHEN 20 THEN SET @count1=@count1+1;
    ELSE SET @count2=@count2+1;
END CASE;
```

代码也可以是下面的形式：

``` sql
CASE
    WHEN age=20 THEN SET @count1=@count1+1;
    ELSE SET @count2=@count2+1;
END CASE;
```

本示例中，如果 age 值为 20，count1 的值加 1，否则 count2 的值加 1。

## 3. LOOP 语句

LOOP 语句可以使某些特定的语句重复执行。与 IF 和 CASE 语句相比，LOOP 只实现了一个简单的循环，并不进行条件判断。

LOOP 语句本身没有停止循环的语句，必须使用 LEAVE 语句等才能停止循环，跳出循环过程。LOOP 语句的基本形式如下：

``` sql
[begin_label:]LOOP
    statement_list
END LOOP [end_label]
```

其中，begin_label 参数和 end_label 参数分别表示循环开始和结束的标志，这两个标志必须相同，而且都可以省略；statement_list 参数表示需要循环执行的语句。


使用 LOOP 语句进行循环操作。代码如下：

``` sql
add_num:LOOP
    SET @count=@count+1;
END LOOP add_num;
```

该示例循环执行 count 加 1 的操作。因为没有跳出循环的语句，这个循环成了一个死循环。LOOP 循环都以 END LOOP 结束。

## 4. LEAVE 语句

LEAVE 语句主要用于跳出循环控制。其语法形式如下：

LEAVE label

其中，label 参数表示循环的标志，LEAVE 语句必须跟在循环标志前面。


下面是一个 LEAVE 语句的示例。代码如下：

``` sql
add_num:LOOP
    SET @count=@count+1;
    IF @count=100 THEN
        LEAVE add_num;
END LOOP add num;
```

该示例循环执行 count 加 1 的操作。当 count 的值等于 100 时，跳出循环。

## 5. ITERATE 语句

ITERATE 是“再次循环”的意思，用来跳出本次循环，直接进入下一次循环。ITERATE 语句的基本语法形式如下：

ITERATE label

其中，label 参数表示循环的标志，ITERATE 语句必须跟在循环标志前面。


下面是一个 ITERATE 语句的示例。代码如下：

``` sql
add_num:LOOP
    SET @count=@count+1;
    IF @count=100 THEN
        LEAVE add_num;
    ELSE IF MOD(@count,3)=0 THEN
        ITERATE add_num;
    SELECT * FROM employee;
END LOOP add_num;
```

该示例循环执行 count 加 1 的操作，count 值为 100 时结束循环。如果 count 的值能够整除 3，则跳出本次循环，不再执行下面的 SELECT 语句。

> 说明：LEAVE 语句和 ITERATE 语句都用来跳出循环语句，但两者的功能是不一样的。LEAVE 语句是跳出整个循环，然后执行循环后面的程序。而 ITERATE 语句是跳出本次循环，然后进入下一次循环。使用这两个语句时一定要区分清楚。

## 6. REPEAT 语句

REPEAT 语句是有条件控制的循环语句，每次语句执行完毕后，会对条件表达式进行判断，如果表达式返回值为 TRUE，则循环结束，否则重复执行循环中的语句。

REPEAT 语句的基本语法形式如下：

[begin_label:] REPEAT
  statement_list
  UNTIL search_condition
END REPEAT [end_label]

其中：

- begin_label 为 REPEAT 语句的标注名称，该参数可以省略；
- REPEAT 语句内的语句被重复，直至 search_condition 返回值为 TRUE。
- statement_list 参数表示循环的执行语句；
- search_condition 参数表示结束循环的条件，满足该条件时循环结束。
- REPEAT 循环都用 END REPEAT 结束。


下面是一个使用 REPEAT 语句的示例。代码如下：

``` sql
REPEAT
    SET @count=@count+1;
    UNTIL @count=100
END REPEAT;
```

该示例循环执行 count 加 1 的操作，count 值为 100 时结束循环。

## 7. WHILE 语句

WHILE 语句也是有条件控制的循环语句。WHILE 语句和 REPEAT 语句不同的是，WHILE 语句是当满足条件时，执行循环内的语句，否则退出循环。WHILE 语句的基本语法形式如下：

[begin_label:] WHILE search_condition DO
  statement list
END WHILE [end label]

其中，search_condition 参数表示循环执行的条件，满足该条件时循环执行；statement_list 参数表示循环的执行语句。WHILE 循环需要使用 END WHILE 来结束。


下面是一个使用 WHILE 语句的示例。代码如下：

``` sql
WHILE @count<100 DO
    SET @count=@count+1;
END WHILE;
```

该示例循环执行 count 加 1 的操作，count 值小于 100 时执行循环。如果 count 值等于 100 了，则跳出循环。

## 参考文章
* http://c.biancheng.net/view/7840.html
* http://c.biancheng.net/view/7849.html
* http://c.biancheng.net/view/7853.html
* https://blog.csdn.net/weixin_45743799/category_9547295.html