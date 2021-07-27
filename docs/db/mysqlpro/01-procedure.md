---
title: MySQL-存储过程
---

::: tip
本文主要是介绍 MySQL-存储过程 。
:::

[[toc]]

## MySQL存储过程是什么？

我们前面所学习的 MySQL 语句都是针对一个表或几个表的单条 SQL 语句，但是在数据库的实际操作中，经常会有需要多条 SQL 语句处理多个表才能完成的操作。

例如，为了确认学生能否毕业，需要同时查询学生档案表、成绩表和综合表，此时就需要使用多条 SQL 语句来针对这几个数据表完成处理要求。

存储过程是一组为了完成特定功能的 SQL 语句集合。使用存储过程的目的是将常用或复杂的工作预先用 SQL 语句写好并用一个指定名称存储起来，这个过程经编译和优化后存储在数据库服务器中，因此称为存储过程。当以后需要数据库提供与已定义好的存储过程的功能相同的服务时，只需调用“CALL存储过程名字”即可自动完成。

常用操作数据库的 SQL 语句在执行的时候需要先编译，然后执行。存储过程则采用另一种方式来执行 SQL 语句。

一个存储过程是一个可编程的函数，它在数据库中创建并保存，一般由 SQL 语句和一些特殊的控制结构组成。当希望在不同的应用程序或平台上执行相同的特定功能时，存储过程尤为合适。

MySQL 5.0 版本以前并不支持存储过程，这使 MySQL 在应用上大打折扣。MySQL 从 5.0 版本开始支持存储过程，既提高了数据库的处理速度，同时也提高了数据库编程的灵活性

存储过程是数据库中的一个重要功能，存储过程可以用来转换数据、数据迁移、制作报表，它类似于编程语言，一次执行成功，就可以随时被调用，完成指定的功能操作。

使用存储过程不仅可以提高数据库的访问效率，同时也可以提高数据库使用的安全性。

对于调用者来说，存储过程封装了 SQL 语句，调用者无需考虑逻辑功能的具体实现过程。只是简单调用即可，它可以被 Java 和 C# 等编程语言调用。

编写存储过程对开发者要求稍微高一些，但这并不影响存储过程的普遍使用，因为存储过程有如下优点：

### 1) 封装性

通常完成一个逻辑功能需要多条 SQL 语句，而且各个语句之间很可能传递参数，所以，编写逻辑功能相对来说稍微复杂些，而存储过程可以把这些 SQL 语句包含到一个独立的单元中，使外界看不到复杂的 SQL 语句，只需要简单调用即可达到目的。并且数据库专业人员可以随时对存储过程进行修改，而不会影响到调用它的应用程序源代码。

### 2) 可增强 SQL 语句的功能和灵活性

存储过程可以用流程控制语句编写，有很强的灵活性，可以完成复杂的判断和较复杂的运算。

### 3) 可减少网络流量

由于存储过程是在服务器端运行的，且执行速度快，因此当客户计算机上调用该存储过程时，网络中传送的只是该调用语句，从而可降低网络负载。

### 4) 高性能

当存储过程被成功编译后，就存储在数据库服务器里了，以后客户端可以直接调用，这样所有的 SQL 语句将从服务器执行，从而提高性能。但需要说明的是，存储过程不是越多越好，过多的使用存储过程反而影响系统性能。

### 5) 提高数据库的安全性和数据的完整性

存储过程提高安全性的一个方案就是把它作为中间组件，存储过程里可以对某些表做相关操作，然后存储过程作为接口提供给外部程序。这样，外部程序无法直接操作数据库表，只能通过存储过程来操作对应的表，因此在一定程度上，安全性是可以得到提高的。

### 6) 使数据独立

数据的独立可以达到解耦的效果，也就是说，程序可以调用存储过程，来替代执行多条的 SQL 语句。这种情况下，存储过程把数据同用户隔离开来，优点就是当数据表的结构改变时，调用表不用修改程序，只需要数据库管理者重新编写存储过程即可。

## MySQL创建存储过程（CREATE PROCEDURE）

存储过程是一些 SQL 语句的集合，比如有时候我们可能需要一大串的 SQL 语句，或者说在编写 SQL 语句的过程中需要设置一些变量的值，这个时候我们就完全有必要编写一个存储过程。

编写存储过程并不是件简单的事情，但是使用存储过程可以简化操作，且减少冗余的操作步骤，同时，还可以减少操作过程中的失误，提高效率，因此应该尽可能的学会使用存储过程。

下面主要介绍如何创建存储过程。

可以使用 **CREATE PROCEDURE** 语句创建存储过程，语法格式如下：

CREATE PROCEDURE <过程名> ( [过程参数[,…] ] ) <过程体>
[过程参数[,…] ] 格式
[ IN | OUT | INOUT ] <参数名> <类型>

语法说明如下：

### 1) 过程名

存储过程的名称，默认在当前数据库中创建。若需要在特定数据库中创建存储过程，则要在名称前面加上数据库的名称，即 db_name.sp_name。

需要注意的是，名称应当尽量避免选取与 MySQL 内置函数相同的名称，否则会发生错误。

### 2) 过程参数

存储过程的参数列表。其中，`<参数名>`为参数名，`<类型>`为参数的类型（可以是任何有效的 MySQL 数据类型）。当有多个参数时，参数列表中彼此间用逗号分隔。存储过程可以没有参数（此时存储过程的名称后仍需加上一对括号），也可以有 1 个或多个参数。

MySQL 存储过程支持三种类型的参数，即输入参数、输出参数和输入/输出参数，分别用 IN、OUT 和 INOUT 三个关键字标识。其中，输入参数可以传递给一个存储过程，输出参数用于存储过程需要返回一个操作结果的情形，而输入/输出参数既可以充当输入参数也可以充当输出参数。

需要注意的是，参数的取名不要与数据表的列名相同，否则尽管不会返回出错信息，但是存储过程的 SQL 语句会将参数名看作列名，从而引发不可预知的结果。

### 3) 过程体

存储过程的主体部分，也称为存储过程体，包含在过程调用的时候必须执行的 SQL 语句。这个部分以关键字 **BEGIN** 开始，以关键字 **END** 结束。若存储过程体中只有一条 SQL 语句，则可以省略 BEGIN-END 标志。

在存储过程的创建中，经常会用到一个十分重要的 MySQL 命令，即 DELIMITER 命令，特别是对于通过命令行的方式来操作 MySQL 数据库的使用者，更是要学会使用该命令。

在 MySQL 中，服务器处理 SQL 语句默认是以分号作为语句结束标志的。然而，在创建存储过程时，存储过程体可能包含有多条 SQL 语句，这些 SQL 语句如果仍以分号作为语句结束符，那么 MySQL 服务器在处理时会以遇到的第一条 SQL 语句结尾处的分号作为整个程序的结束符，而不再去处理存储过程体中后面的 SQL 语句，这样显然不行。

为解决以上问题，通常使用 **DELIMITER** 命令将结束命令修改为其他字符。语法格式如下：

DELIMITER $$

语法说明如下：

- $$ 是用户定义的结束符，通常这个符号可以是一些特殊的符号，如两个“?”或两个“￥”等。
- 当使用 DELIMITER 命令时，应该避免使用反斜杠“\”字符，因为它是 MySQL 的转义字符。


在 MySQL 命令行客户端输入如下 SQL 语句。

mysql > DELIMITER ??

成功执行这条 SQL 语句后，任何命令、语句或程序的结束标志就换为两个问号“??”了。

若希望换回默认的分号“;”作为结束标志，则在 MySQL 命令行客户端输入下列语句即可：

mysql > DELIMITER ;

注意：DELIMITER 和分号“;”之间一定要有一个空格。在创建存储过程时，必须具有 CREATE ROUTINE 权限。

### 例 1

创建名称为 ShowStuScore 的存储过程，存储过程的作用是从学生成绩信息表中查询学生的成绩信息，输入的 SQL 语句和执行过程如下所示。

``` sql
mysql> DELIMITER //
mysql> CREATE PROCEDURE ShowStuScore()
    -> BEGIN
    -> SELECT * FROM tb_students_score;
    -> END //
Query OK， 0 rows affected (0.09 sec)
```

结果显示 ShowStuScore 存储过程已经创建成功。

### 例 2

创建名称为 GetScoreByStu 的存储过程，输入参数是学生姓名。存储过程的作用是通过输入的学生姓名从学生成绩信息表中查询指定学生的成绩信息，输入的 SQL 语句和执行过程如下所示。

``` sql
mysql> DELIMITER //
mysql> CREATE PROCEDURE GetScoreByStu
    -> (IN name VARCHAR(30))
    -> BEGIN
    -> SELECT student_score FROM tb_students_score
    -> WHERE student_name=name;
    -> END //
Query OK, 0 rows affected (0.01 sec)
```

## MySQL查看存储过程

创建好存储过程后，用户可以通过 SHOW ATATUS 语句来查看存储过程的状态，也可以通过 SHOW CREATE 语句来查看存储过程的定义。本节主要讲解查看存储过程的状态和定义的方法。

## 查看存储过程的状态

MySQL 中可以通过 SHOW STATUS 语句查看存储过程的状态，其基本语法形式如下：

SHOW PROCEDURE STATUS LIKE 存储过程名;

`LIKE 存储过程名`用来匹配存储过程的名称，LIKE 不能省略。

### 实例 1

创建数据表 studentinfo，SQL 语句如下：

``` sql
CREATE TABLE `studentinfo` (
    `ID` int(11) NOT NULL,
    `NAME` varchar(20) DEFAULT NULL,
    `SCORE` decimal(4,2) DEFAULT NULL,
    `SUBJECT` varchar(20) DEFAULT NULL,
    `TEACHER` varchar(20) DEFAULT NULL,
    PRIMARY KEY (`ID`)
);
```


向数据表 studentinfo 中插入数据，SQL 语句和执行结果如下：

``` sql
mysql> INSERT INTO studentinfo(id,name,score) VALUES(1,"zhangsan",80),(2,"lisi","70");
Query OK, 2 rows affected (0.01 sec)
Records: 2  Duplicates: 0  Warnings: 0
```


创建存储过程 showstuscore，SQL 语句和运行结果如下：

``` sql
mysql> DELIMITER //
mysql> CREATE PROCEDURE showstuscore()
    -> BEGIN
    -> SELECT id,name,score FROM studentinfo;
    -> END //
Query OK, 0 rows affected (0.07 sec)
```


下面查询名为 showstuscore 的存储过程的状态，SQL 语句和运行结果如下：

``` sql
mysql> SHOW PROCEDURE STATUS LIKE 'showstuscore' \G
*************************** 1. row ***************************
                  Db: test
                Name: showstuscore
                Type: PROCEDURE
             Definer: root@localhost
            Modified: 2020-02-20 13:34:50
             Created: 2020-02-20 13:34:50
       Security_type: DEFINER
             Comment:
character_set_client: gbk
collation_connection: gbk_chinese_ci
  Database Collation: latin1_swedish_ci
1 row in set (0.01 sec)

mysql> SHOW PROCEDURE STATUS LIKE 'show%' \G
*************************** 1. row ***************************
                  Db: test
                Name: showstuscore
                Type: PROCEDURE
             Definer: root@localhost
            Modified: 2020-02-21 09:34:50
             Created: 2020-02-21 09:34:50
       Security_type: DEFINER
             Comment:
character_set_client: gbk
collation_connection: gbk_chinese_ci
  Database Collation: latin1_swedish_ci
1 row in set (0.00 sec)
```

查询结果显示了存储过程的创建时间、修改时间和字符集等信息。

## 查看存储过程的定义

MySQL 中可以通过 SHOW CREATE 语句查看存储过程的状态，语法格式如下：

SHOW CREATE PROCEDURE 存储过程名;

### 实例 2

下面使用 SHOW CREATE 查询名为 showstuscore 的存储过程的状态，SQL 语句和运行结果如下：

``` sql
mysql> SHOW CREATE PROCEDURE showstuscore \G
*************************** 1. row ***************************
           Procedure: showstuscore
            sql_mode: STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION
    Create Procedure: CREATE DEFINER=`root`@`localhost` PROCEDURE `showstuscore`()
BEGIN
SELECT id,name,score FROM studentinfo;
END
character_set_client: gbk
collation_connection: gbk_chinese_ci
  Database Collation: latin1_swedish_ci
1 row in set (0.01 sec)
```

查询结果显示了存储过程的定义和字符集信息等。

SHOW STATUS 语句只能查看存储过程是操作的哪一个数据库、存储过程的名称、类型、谁定义的、创建和修改时间、字符编码等信息。但是，这个语句不能查询存储过程的集体定义，如果需要查看详细定义，需要使用 SHOW CREATE 语句。

### 拓展阅读

存储过程的信息都存储在 information_schema 数据库下的 Routines 表中，可以通过查询该表的记录来查询存储过程的信息，SQL 语句如下：

SELECT * FROM information_schema.Routines WHERE ROUTINE_NAME=存储过程名;

在 information_schema 数据库下的 routines 表中，存储着所有存储过程的定义。所以，使用 SELECT 语句查询 routines 表中的存储过程和函数的定义时，一定要使用 routine_name 字段指定存储过程的名称，否则，将查询出所有的存储过程的定义。

## MySQL修改存储过程（ALTER PROCEDURE）编辑存储过程

在实际开发过程中，业务需求修改的情况时有发生，所以修改 中的存储过程是不可避免的。

MySQL 中通过 ALTER PROCEDURE 语句来修改存储过程。本节将详细讲解修改存储过程的方法。

MySQL 中修改存储过程的语法格式如下：

ALTER PROCEDURE 存储过程名 [ 特征 ... ]

`特征`指定了存储过程的特性，可能的取值有：

* CONTAINS SQL 表示子程序包含 SQL 语句，但不包含读或写数据的语句。
* NO SQL 表示子程序中不包含 SQL 语句。
* READS SQL DATA 表示子程序中包含读数据的语句。
* MODIFIES SQL DATA 表示子程序中包含写数据的语句。
* SQL SECURITY { DEFINER |INVOKER } 指明谁有权限来执行。
* DEFINER 表示只有定义者自己才能够执行。
* INVOKER 表示调用者可以执行。
* COMMENT 'string' 表示注释信息。

### MySQL 修改存储过程 编辑存储过程 实例1

下面修改存储过程 showstuscore 的定义，将读写权限改为 MODIFIES SQL DATA，并指明调用者可以执行，代码如下：

``` sql
mysql> ALTER PROCEDURE showstuscore MODIFIES SQL DATA SQL SECURITY INVOKER;
Query OK, 0 rows affected (0.01 sec)
```

``` sql
-- 修改存储过程备注 信息 
alter procedure pro_update_extend_handler_fruit	 COMMENT '新的备注信息 ';

```

执行代码，并查看修改后的信息，运行结果如下：

``` sql
mysql> SHOW CREATE PROCEDURE showstuscore \G
*************************** 1. row ***************************
           Procedure: showstuscore
            sql_mode: STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION
    Create Procedure: CREATE DEFINER=`root`@`localhost` PROCEDURE `showstuscore`()
    MODIFIES SQL DATA
    SQL SECURITY INVOKER
BEGIN
SELECT id,name,score FROM studentinfo;
END
character_set_client: gbk
collation_connection: gbk_chinese_ci
  Database Collation: latin1_swedish_ci
1 row in set (0.00 sec)
```

结果显示，存储过程修改成功。从运行结果可以看到，访问数据的权限已经变成了 MODIFIES SQL DATA，安全类型也变成了 INVOKE。

提示：ALTER PROCEDURE 语句用于修改存储过程的某些特征。如果要修改存储过程的内容，可以先删除原存储过程，再以相同的命名创建新的存储过程；如果要修改存储过程的名称，可以先删除原存储过程，再以不同的命名创建新的存储过程。

## MySQL删除存储过程（DROP PROCEDURE）
存储过程被创建后，就会一直保存在数据库服务器上，直至被删除。当数据库中存在废弃的存储过程时，我们需要将它从数据库中删除。

MySQL 中使用 DROP PROCEDURE 语句来删除数据库中已经存在的存储过程。语法格式如下：

DROP PROCEDURE [ IF EXISTS ] <过程名>

语法说明如下：

- 过程名：指定要删除的存储过程的名称。
- IF EXISTS：指定这个关键字，用于防止因删除不存在的存储过程而引发的错误。


注意：存储过程名称后面没有参数列表，也没有括号，在删除之前，必须确认该存储过程没有任何依赖关系，否则会导致其他与之关联的存储过程无法运行。

#### 实例 1

下面删除存储过程 ShowStuScore，SQL 语句和运行结果如下：

``` sql
mysql> DROP PROCEDURE ShowStuScore;
Query OK, 0 rows affected (0.08 sec)
```

删除后，可以通过查询 information_schema 数据库下的 routines 表来确认上面的删除是否成功。SQL 语句和运行结果如下：

``` sql
mysql> SELECT * FROM information_schema.routines WHERE routine_name='ShowStuScore';
Empty set (0.03 sec)
```

结果显示，没有查询出任何记录，说明存储过程 ShowStuScore 已经被删除了。


## 参考文章
* http://c.biancheng.net/view/7234.html
* http://c.biancheng.net/view/2593.html
* http://c.biancheng.net/view/7238.html
* http://c.biancheng.net/view/2594.html
* http://c.biancheng.net/view/2596.html
* https://blog.csdn.net/weixin_45743799/category_9547295.html