---
title: 关系数据库语言SQL
---

::: tip
本文主要是介绍 关系数据库语言SQL 。
:::

[[toc]]

本节要点：

- l SQL概述
- l 学生-课程关系
- l 数据定义
  -  基本表的定义、删除与修改
  -  索引的建立与删除
- l 查询
  -  单表查询
  -  连接查询
  -  嵌套查询
  -  集合查询
- l 数据更新
  -  插入数据
  -  修改数据
  -  删除数据
- l 视图
  -  定义视图
  -  查询视图
  -  更新视图
  -  视图的作用

 

SQL（Structured Query Language），即结构化查询语言，是关系数据库的标准语言，SQL是一个通用的、功能极强的关系数据库语言。当前，几乎所有的关系数据库管理系统软件都支持SQL。本节将主要介绍SQL。

## 1、SQL概述

SQL是在1974年由Boyce和Chamberlin提出的，并在IBM公司研制的关系数据库管理系统原型System R上实现。SQL之所以能够为用户和业界所接受，并成为国际标准，是因为它是一个综合的、功能极强同时又简介易学的语言。SQL集数据查询（Data Query）、数据操纵（Data Manipulation）、数据定义（Data Definition）和数据控制（Data Control）功能于一体。

SQL的特点：

- l 综合统一
- l 高度非过程化
- l 面向集合的操作方式
- l 以同一种语法结构提供两种使用方法(交互式, 嵌入式)
- l 语言简洁，易学易用

注：SQL完成核心功能只用了下面9个动词：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/db/intro/dbtheory-1.png')" alt="wxmp">

## 2、学生-课程关系

接下来知识的学习需要用到学生-课程的关系作为例子来讲解，所以先给出3个表的关系：

- l 学生表：Student（Sno，Sname，Ssex，Sage，Sdept）
- l 课程表：Course（Cno，Cname，Cpno，Ccredit）
- l 学生选课表：SC（Sno，Cno，Grade）

注：加下划线的是关系中的主码。

各个表中的数据示例如下（表的具体定义后续会讲到，先看看表的结构和信息）：

Student

| 学号Sno   | 姓名Sname | 性别Ssex | 年龄Sage | 所在系Sdept |
| --------- | --------- | -------- | -------- | ----------- |
| 200215121 | 李勇      | 男       | 20       | CS          |
| 200215122 | 刘晨      | 女       | 19       | CS          |
| 200215123 | 王敏      | 女       | 18       | MA          |
| 200215125 | 张立      | 男       | 19       | IS          |

Course

| 课程号Cno | 课程名Cname | 先行课Cpno | 学分Ccredit |
| --------- | ----------- | ---------- | ----------- |
| 1         | 数据库      | 5          | 4           |
| 2         | 数学        |            | 2           |
| 3         | 信息系统    | 1          | 4           |
| 4         | 操作系统    | 6          | 3           |
| 5         | 数据结构    | 7          | 4           |
| 6         | 数据处理    |            | 2           |
| 7         | PASCAL语言  | 6          | 4           |

SC

| 学号Sno   | 课程号Cno | 成绩Grade |
| --------- | --------- | --------- |
| 200215121 | 1         | 92        |
| 200215121 | 2         | 85        |
| 200215121 | 3         | 88        |
| 200215122 | 2         | 90        |
| 200215122 | 3         | 80        |

## 3、数据定义

关系数据库系统支持三级模式结构，其模式、外模式和内模式中的基本对象由表、视图和索引，因此SQL的数据定义功能包括表定义、视图和索引的定义，如下表是SQL的数据定义语句总结：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/db/intro/dbtheory-2.png')" alt="wxmp">

### 3.1、基本表的定义、删除与修改

### 3.1.1、 定义基本表

语法：

CREATE TABLE <表名>

（<列名> <数据类型>[ <列级完整性约束条件> ]

   [，<列名> <数据类型>[ <列级完整性约束>] ] …

   [，<表级完整性约束> ]

 ）；

<表名>：所要定义的基本表的名字

<列名>：组成该表的各个属性（列）

<列级完整性约束条件>：涉及相应属性列的完整性约束条件

<表级完整性约束条件>：涉及一个或多个属性列的完整性约束条件

示例：

- 建立学生表Student：

  CREATE TABLE Student

​    (Sno    CHAR(5)PRIMARY KEY， /* PRIMARY KEY是完整性约束，以后讲到*/

​     Sname CHAR(20)NOT NULL，     

​     Ssex   CHAR(1)，

​     Sage   INT，

​     Sdept  CHAR(15))；

- 建立一个“课程”表Course：

​    CREATE TABLE Course

​    (Cno    CHAR(5)PRIMARY KEY，

​     Cname CHAR(20)NOT NULL，     

​     Cpno   CHAR(5)，

​     Credit   INT，

​     FOREIGN KEY Cpno REFERENCES Course(Cno))；

注：说明参照表和被参照表可以是同一个。

- 建立一个“学生选课”表SC，它由学号Sno、课程号Cno，修课成绩Grade组成，其中(Sno, Cno)为主码:

CREATE TABLE SC(

​      Sno CHAR(5),

​      Cno CHAR(3),

​      Grade  INT,

​      Primary key (Sno, Cno),

FOREIGN KEY (Sno)REFERENCES Student(Sno)

FOREIGN KEY (Cno)REFERENCES Course(Cno));

### 3.1.2、 数据类型

关系模型中一个很重要的概念是域，每一个属性来自一个域，它的取值必须是域中的值。在SQL中域的概念用数据类型来实现，在定义表的各个属性时需要指明其数据类型及长度。SQL提供了一些主要数据类型如下（不同的RDBMS中支持的数据类型不尽相同）：

| 数据类型         | 含义                                                           |
| ---------------- | -------------------------------------------------------------- |
| CHAR(n)          | 长度为n的定长字符串                                            |
| VARCHAR(n)       | 最大长度为n的变长字符串                                        |
| INT              | 长整数（也可以写成INTEGER）                                    |
| SMALLINT         | 短整数                                                         |
| NUMBERIC(p,d)    | 定点数，由p为数字（不包括符号、小数点）组成，小数后面有d位数字 |
| REAL             | 取决于机器精度的浮点数                                         |
| Double Percision | 取决于机器精度的双精度浮点数                                   |
| FLOAT(n)         | 浮点数，精度至少为n位数字                                      |
| DATE、           | 日期，包含年月日，格式为YYYY-MM-DD                             |
| TIME             | 时间，包含一日的时分秒，格式为HH：MM：SS                       |

注：VARCHAR、NUMBERIC和DATE较常用。

### 3.1.3、删除基本表

语法：

DROP TABLE <表名> [RESTRICT|CASCADE];

RESTRICT：该表删除是有限制的，待删除的表不能被其他表的约束所引用，否则不能删除；

CASCADE：删除表的同时删除其他约束对象。

一般默认是RESTRICT。

 

示例：（慎用，一旦删除不可恢复）

删除Student表

   DROP TABLE Student RESTRICT;

### 3.1.4、修改基本表

语法：

ALTER TABLE <表名>

[ ADD <新列名> <数据类型> [ 完整性约束 ] ]

[ DROP <原列名>|<完整性约束名> ]

[ALTER COLUMN <原列名> <数据类型> ]；

- <表名>：要修改的基本表
- ADD子句：增加新列和新的完整性约束条件
- DROP子句：删除指定的列或完整性约束
- ALTER COLUMN子句：用于修改指定列的数据类型

示例：

向Student表增加“入学时间”列，其数据类型为日期型：

​    ALTER TABLE Student ADD Scome DATE；

将年龄的数据类型由字符型（假设原来的数据类型是字符型）改为整数：

​      ALTER TABLE Student ALTER COLUMN Sage INT；

​     删除列属性：

ALTER TABLE Student Drop Scome；

### 3.2、索引的建立与删除

假设你负责一本学生记录表(2万学生要近千页). 经常有人来要求按学生名查询某某学生信息。你如何查才能提高查询速度?我们知道一般在文档操作的时候就有建立学生名目录(按拼音排序)。同样，运用到数据库上，可以在一列或者多列上建立索引，根据索引去查询。相比较对整个表进行查询，索引查询只是选取了一列或者几列，查询的范围小，查询时数据占用的内存小。

### 3.2.1、建立索引

建立索引是加快查询速度的有效手段

语法：

CREATE  INDEX <索引名>  

   ON <表名>(<列名 [,<列名> ]…)；

示例：

为Student的sname列建立索引：

CREATE INDEX StuName ON Student(Sname)；

### 3.2.2、 删除索引

语法：

DROP INDEX <索引名>；

示例：删除Student表的Stusname索引。

DROP INDEX Stusname；

## 4、查询

数据库查询时数据库的核心操作。SQL提供了SELECT语句进行数据库的操作，其一般格式如下：

SELECT [ALL|DISTINCT] <目标列表达式>   [，<目标列表达式>] …

FROM <表或视图名>[，<表或视图名> ] …

[ WHERE <条件表达式> ]

[ GROUP BY <列名1>

   [ HAVING <条件表达式> ] ]

[ ORDER BY <列名2> [ ASC|DESC ] ]；

- SELECT子句：指定要显示的属性列
- FROM子句：指定查询对象(基本表或视图)
- WHERE子句：指定查询条件
- GROUP BY子句：对查询结果按指定列的值分组，该属性列值相等的元组为一个组。通常会在每组中作用集函数。
- HAVING短语：筛选出只有满足指定条件的组
- ORDER BY子句：对查询结果表按指定列值的升序或降序排序

### 4.1、单表查询

单表查询表示查询仅涉及一个表，是一种最简单的查询操作：

一、选择表中的若干列

二、选择表中的若干元组

三、对查询结果排序

四、使用集函数

五、对查询结果分组

### 4.1.1、查询指定列

示例：查询全体学生的学号与姓名。

SELECT Sno，Sname FROM Student； 

示例： 查询全体学生的姓名、学号、所在系。

SELECT Sname，Sno，Sdept FROM Student；

### 4.1.2、查询全部列

示例：查询全体学生的详细记录。

SELECT Sno，Sname，Ssex，Sage，Sdept FROM Student；

  或

SELECT * FROM Student；

### 4.1.3、 查询经过计算的值

SELECT子句的<目标列表达式>不仅可以是表中的属性列，也可以是表达式。

示例：查全体学生的姓名及其出生年份。

SELECT Sname，2012-SageFROM Student； 

示例：查询全体学生的姓名、出生年份和所有系，要求用小写字母表示所有系名。

SELECT Sname，'Year of Birth: '，2012 Sage， ISLOWER(Sdept)FROM Student；

### 4.1.4、使用列别名(可选)改变查询结果的列标题

示例：SELECT Sname NAME，'Year of Birth: ' BIRTH，2012-Sage BIRTHDAY，ISLOWER(Sdept)DEPARTMENT FROM Student；

输出结果：

   NAME  BIRTH    BIRTHDAY  DEPARTMENT

 -------   --------     ------- ------- --------

   李勇  Year of Birth:  1986    cs

   刘晨  Year of Birth:  1987    is

   王名  Year of Birth:  1988    ma

   张立  Year of Birth:  1987    is

### 4.1.5、 消除取值重复的行

- ALL查询满足条件的元组

SELECT ALL Sno FROM SC;

等价于

SELECT Sno FROM SC;

结果：Sno 

​     \-------

​     95001 

​     95001 

​     95001 

​     95002 

​     95002

- DISTINCT消除取值重复的行

SELECT DISTINCT Sno FROM SC;

结果： Sno 

   \-------

   95001 

   95002

注意 DISTINCT短语的作用范围是所有目标列

例：查询选修课程的各种成绩

错误的写法：

SELECT DISTINCT Cno，DISTINCT Grade FROM SC;

正确的写法

SELECT DISTINCT Cno，Grade FROM SC; 

### 4.1.6、查询满足条件的元组

查询满足指定条件的元组可以通过WHERE字句实现。WHERE字句常用的查询条件如下：

| 查询条件             | 谓词                                       |
| -------------------- | ------------------------------------------ |
| 比较                 | =,>,<,>=,<=,!=,<>,!>,!<;NOT+上述比较运算符 |
| 确定范围             | BETWEEN AND,NOT BETWEEN AND                |
| 确定集合             | IN,NOT IN                                  |
| 字符匹配             | LIKE,NOT LIKE                              |
| 空值                 | IS NULL,IS NOT NULL                        |
| 多重条件（逻辑运算） | AND,OR,NOT                                 |

- 比较大小

在WHERE子句的<比较条件>中使用比较运算符=，>，<，>=，<=，!= 或 <>，!>，!<，逻辑运算符NOT + 比较运算符

示例： 查询所有年龄在20岁以下的学生姓名及其年龄。

   SELECT  Sname，Sage

FROM Student  

WHERE  Sage < 20；    

或 

SELECT  Sname，Sage

FROM  Student

WHERE  NOT  Sage >= 20； 

- 确定范围

使用谓词  BETWEEN … AND …

​      NOT BETWEEN … AND …

示例：查询年龄在20~23岁（包括20岁和23岁）之间的学生的姓名、系别和年龄。

  SELECT  Sname，Sdept，Sage

FROM  Student

WHERE  Sage BETWEEN 20 AND 23；

示例：查询年龄不在20~23岁之间的学生姓名、系别和年龄。

SELECT  Sname，Sdept，Sage

FROM Student

WHERE Sage NOT BETWEEN 20 AND 23；

- 确定集合

使用谓词IN (值表)、NOT IN (值表)。值表：用逗号分隔的一组取值

示例：

查询信息系（IS）、数学系（MA）和计算机科学系（CS）学生的姓名和性别。

SELECT Sname，Ssex

FROM Student

WHERE Sdept IN ( 'IS'，'MA'，'CS' );

查询既不是信息系、数学系，也不是计算机科学系的学生的姓名和性别。

SELECT Sname，Ssex

FROM Student

​     WHERE Sdept NOT IN ( 'IS'，'MA'，'CS' );

- 字符串匹配

谓词like可以用来进行字符串的匹配。其一般语法格式如下：

[NOT] LIKE ‘<匹配串>’ [ESCAPE ‘ <换码字符>’]

其中<匹配串>用来指定匹配模板，可以是一个完整的字符串，也可以含有通配符%和_。其中：

- -  % (百分号)代表任意长度（长度可以为0）的字符串。例：a%b表示以a开头，以b结尾的任意长度的字符串。如acb，addgb，ab 等都满足该匹配串
  -  _ (下横线)代表任意单个字符。例：a_b表示以a开头，以b结尾的长度为3的任意字符串。如acb，afb等都满足该匹配串

​    a  匹配模板为固定字符串

示例：查询学号为95001的学生的详细情况。

   SELECT *  

​    FROM Student 

​    WHERE Sno LIKE '95001'；

等价于

   SELECT *

   FROM Student

   WHERE  Sno = '95001'；

​    b  匹配模板为含通配符的字符串

示例： 查询所有姓刘学生的姓名、学号和性别。

   SELECT Sname，Sno，Ssex

   FROM Student

   WHERE Sname LIKE ‘刘%’；

示例： 查询姓"欧阳"且全名为三个汉字的学生的姓名。

   SELECT  Sname

   FROM  Student

   WHERE Sname LIKE '欧阳__'；

示例： 查询名字中第2个字为"阳"字的学生的姓名和学号。

   SELECT Sname，Sno

   FROM Student

   WHERE Sname LIKE '__阳%'；

示例： 查询所有不姓刘的学生姓名。

   SELECT Sname，Sno，Ssex

   FROM Student

   WHERE Sname NOT LIKE '刘%'；

ESCAPE 短语：当用户要查询的字符串本身就含有 % 或 _ 时，要使用ESCAPE '<换码字符>' 短语对通配符进行转义。

使用换码字符将通配符转义为普通字符

 示例：查询DB_Design课程的课程号和学分。

   SELECT Cno，Ccredit

   FROM Course

   WHERE Cname LIKE 'DB\_Design' ESCAPE '\'

示例：查询以"DB_"开头，且倒数第3个字符为 i的课程的详细情况。

   SELECT *

   FROM  Course

   WHERE Cname LIKE 'DB\_%i_ _' ESCAPE ' \ '；

- 涉及空值的查询

使用谓词 IS NULL 或 IS NOT NULL。“IS NULL” 不能用 “= NULL” 代替。

示例：某些学生选修课程后没有参加考试，所以有选课记录，但没有考试成绩。查询缺少成绩的学生的学号和相应的课程号。

   SELECT Sno，Cno

   FROM SC

   WHERE Grade IS NULL；

示例：查所有有成绩的学生学号和课程号。

   SELECT Sno，Cno

   FROM SC

   WHERE Grade IS NOT NULL；

- 多重条件查询

用逻辑运算符AND和 OR来联结多个查询条件。AND的优先级高于OR，可以用括号改变优先级。

可用来实现多种其他谓词[NOT] IN和 [NOT] BETWEEN …  AND …

示例：查询计算机系年龄在20岁以下的学生姓名。

   SELECT Sname

​    FROM Student

​    WHERE Sdept= 'CS' AND Sage<20；

示例：查询信息系（IS）、数学系（MA）和计算机科学系（CS）学生的姓名和性别。

SELECT Sname，Ssex

FROM Student

WHERE Sdept IN ( 'IS'，'MA'，'CS' )

等价于：

SELECT Sname，Ssex

FROM  Student

WHERE Sdept= ' IS ' OR Sdept= ' MA' OR Sdept= ' CS

示例：查询年龄在20~23岁（包括20岁和23岁）之间的学生的姓名、系别和年龄。
    SELECT Sname，Sdept，Sage

FROM Student

WHERE Sage BETWEEN 20 AND 23；

等价于：

SELECT Sname，Sdept，Sage

FROM Student

​    WHERE Sage>=20 AND Sage<=23；

### 4.1.7、对查询结果排序

排序使用ORDER BY子句，可以按一个或多个属性列排序，升序关键字是ASC，降序关键字是DESC，缺省值为升序。当排序列含空值时，ASC：排序列为空值的元组最后显示；DESC：排序列为空值的元组最先显示 。

示例：查询选修了3号课程的学生的学号及其成绩，查询结果按分数降序排列。

  SELECT Sno，Grade

  FROM SC

  WHERE Cno= ' 3 '

  ORDER BY Grade DESC；

示例：查询全体学生情况，查询结果按所在系的系号升序排列，同一系中的学生按年龄降序排列。

  SELECT *

  FROM Student

  ORDER BY Sdept，Sage DESC；

### 4.1.8、 使用集函数

1行计数

（1）COUNT（[DISTINCT|ALL] *）：对每行计数；DISTINCT短语表示在计算时要取消指定列中的重复值；ALL短语表示不取消重复值，ALL为缺省值

（2）COUNT（[DISTINCT|ALL] <列名>）：对<列名>非空的行计数

示例： 查询学生总人数。

  SELECT COUNT(*)

  FROM Student；

示例： 查询选修了课程的学生人数。

   SELECT COUNT(DISTINCT Sno)

   FROM SC；

注：对Sno非空的行，排除重复Sno计数。以避免重复计算学生人数

有什么区别？

  SELECT COUNT(*)FROM SC；

  SELECT COUNT(Grade)FROM SC；

有什么区别？

  SELECT COUNT(SNO)FROM SC；

  SELECT COUNT(DISTINCT SNO)FROM SC；

2.计算总和(对非空列)

  SUM（[DISTINCT|ALL] <列名>） 

3.计算平均值(对非空列)

   AVG（[DISTINCT|ALL] <列名>）

示例：计算1号课程的学生平均成绩。

   SELECT AVG(Grade)

   FROM SC

   WHERE Cno= ' 1 '；

4.求最大值(对非空列)

MAX（[DISTINCT|ALL] <列名>） 

示例：查询选修1号课程的学生最高分数。

   SELECT MAX(Grade)

   FROM SC

   WHER Cno= ' 1 '；

5.求最小值(对非空列)

MIN（[DISTINCT|ALL] <列名>） 

 

### 4.1.9、对查询结果分组

使用GROUP BY子句分组，用来细化集函数的作用对象

- 未对查询结果分组，集函数将作用于整个查询结果
- 对查询结果分组后，集函数将分别作用于每个组

示例：求各个课程号及相应的选课人数。

   SELECT Cno，COUNT(Sno)

   FROM  SC

   GROUP BY Cno； 

易犯错误:

   SELECT Sno, Cno, COUNT(Sno)

   FROM  SC

   GROUP BY Cno；

注意：使用GROUP BY子句后，SELECT子句的列名列表中只能出现分组属性和集函数

用多个列分组

示例：查询每个系男女生人数。

   SELECT Sdept, Ssex, COUNT(*)

   FROM  Student

   GROUP BY Sdept, Ssex；

 

使用HAVING短语筛选最终输出结果（having都是跟随group by对分组信息进行筛选）：

示例：查询选修了3门以上课程的学生学号。

   SELECT Sno

   FROM SC

   GROUP BY Sno

​       HAVING COUNT(*)>=3；   

示例：查询有3门以上课程是90分以上的学生的学号及（90分以上的）课程数

​    SELECT Sno, COUNT(*)

​    FROM  SC

​    WHERE Grade>=90

​    GROUP BY Sno

​    HAVING COUNT(*)>=3;         

只有满足HAVING短语指定条件的组才输出，HAVING短语与WHERE子句的区别：作用对象不同：WHERE子句作用于基表或视图，从中选择满足条件的元组；HAVING短语作用于组，从中选择满足条件的组。

 

### 4.2、连接查询

前面的查询都是针对一个表进行的。若一个查询同时涉及两个以上的表，则称之为连接查询。连接查询是关系数据库中最主要的查询，包括等值连接查询、自然连接查询、非等值连接查询、自身连接查询、外连接查询和复合条件连接查询等。

连接查询的WHERE字句中用来连接两个表的条件称为连接条件或连接谓词，其一般格式为：

[<表名1>.] <列名1> <比较运算符> [<表名2>.] <列名2>

其中比较运算符主要有：=、>、<、>=、<=、!=(或<>)等。

此外连接谓词还可以使用下面形式：

[<表名1>.] <列名1> between [<表名2>.] <列名2> and [<表名2>.] <列名3>

### 4.2.1、等值与非等值连接查询

当连接运算符为=时，称为等值连接。使用其他运算符称为非等值连接。

连接谓词中的列名称为连接字段。连接条件中的各连接字段类型必须是可比的，但名字不必相同。

- 等值连接

等值连接的运算符是=。

示例：查询每个学生及其选修课程的情况。

SELECT *

FROM Student，SC

WHERE Student.Sno = SC.Sno；

查询结果：

Student.Sno  Sname  Ssex Sage   Sdept  SC.Sno   Cno  Grade

  95001   李勇 男  20   CS       95001    1   92 

  95001   李勇 男  20      CS         95001    2   85 

  95001   李勇 男  20      CS         95001    3   88 

  95002   刘晨 女  19      IS       95002    2   90 

  95002   刘晨 女  19      IS     95002    3   80 

注：引用两表中同名属性时，必须加表名前缀区分。引用唯一属性名时可以加也可以省略表名前缀。

​     若在等值连接中把目标列中重复的属性列去掉则为自然连接。

- 非等值连接

不是 = 的连接操作就是非等值连接。

示例：查询选课信息,并显示成绩级别

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/db/intro/dbtheory-3.png')" alt="wxmp"><img class= "zoom-custom-imgs" :src="$withBase('/assets/img/db/intro/dbtheory-4.png')" alt="wxmp">



SELECT Sno,Cno,Grade,Stage

FROM  Sc, Gstage

WHERE Grade BETWEEN Low AND High;

### 4.2.2、 自身连接

一个表与其自己进行连接，称为表的自身连接。

示例：查询每一门课的先行课名

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/db/intro/dbtheory-5.png')" alt="wxmp">

 SELECT First.Cname 课名, Second.Cname 先行课名

  FROM Course First，course Second

  WHERE First.Cpno = Second.Cno；

输出：       

​     课名         先行课名

​     数据库       数据结构

​     信息系统     数据库

注：需要给表起别名以示区别如示例中的First和Second；由于所有属性名都是同名属性，因此必须使用别名前缀，如示例中的First.Cname和Second.Cname。

### 4.2.3、外连接（Outer Join）

普通连接操作只输出满足连接条件的元组。有时想保留不满足条件的元组，比如说以Student表为主体列出每个学生的基本情况及其选课情况，若某个学生没有选课，但是依旧想保留该学生的信息，这时需要使用到的就是外连接。实现方式就是以Student表为主体，对每一个学生如果没有选课信息则选课表的属性上填空值（Null）。

示例：查询每个学生及其选修课程的情况(包括没有选修课程的学生)

SELECT Student.Sno，Sname，Ssex，Sage，Sdept，Cno，Grade

 FROM   Student，SC

WHERE Student.Sno *= SC.Sno；

或

SELECT Student.Sno，Sname，Ssex，Sage，Sdept，Cno，Grade

 FROM Student  LEFT OUTER JOIN SC ON Student.Sno = SC.Sno；

查询结果：

Student.Sno Sname Ssex  Sage   Sdept  Cno  Grade

 95001   李勇  男   20    CS   1    92

 95001   李勇  男   20    CS   2   85

 95001   李勇  男   20    CS   3   88

 95002   刘晨  女   19    IS   2   90

 95002   刘晨  女   19    IS   3   80

 95003   王敏  女   18    MA  null  null

 95004   张立  男   19    IS   null  null

外连接类型：

- 左外连接

将左边关系的不满足连接条件的行输出

 WHERE 子句方式(*出现在左边)：

   WHERE R.A1 *= S.A1

 FROM子句方式：

   FROM R LEFT [OUTER] JOIN S ON R.A1=S.A1

- 右外连接

将右边关系的不满足连接条件的行输出

 WHERE 子句方式(*出现在右边)：

   WHERE R.A1 =* S.A1

 FROM子句方式：

   FROM R RIGHT [OUTER] JOIN S ON R.A1=S.A1

- 全外连接

将两边关系的不满足连接条件的行输出

 WHERE 子句方式(*出现在两边)：

   WHERE R.A1 *=* S.A1

 FROM子句方式：

   FROM R FULL [OUTER] JOIN S ON R.A1=S.A1

1) 复合条件连接

​     上面各个连接查询中，WHERE字句中只有一个查询条件。WHERE字句中可以有多个连接条件，称为复合条件连接。

示例：查询选修2号课程且成绩在90分以上的所有学生

Select Student.sno, sname

From student, sc

Where student.sno = sc.sno

And sc.cno = ‘2’

And sc.grade > 90;

### 4.3、嵌套查询

### 4.3.1、嵌套查询概述

一个SELECT-FROM-WHERE语句称为一个查询块。将一个查询块嵌套在另一个查询块的WHERE子句或HAVING短语的条件中的查询称为嵌套查询。

示例：嵌套查询

SELECT Sname     /*外层查询或父查询*/

FROM Student

WHERE Sno IN

  （SELECT Sno   /*内层查询/子查询*/

   FROM SC

   WHERE Cno= ' 2 '）；

注：子查询中不能使用Order by。

### 4.3.2、嵌套查询分类

- 不相关子查询：子查询的查询条件不依赖于父查询

- 相关子查询：子查询的查询条件依赖于父查询

### 4.3.3、引出子查询的谓词

- 带有IN谓词的子查询

在嵌套查询中，子查询的结果往往是一个集合，所以谓词IN是嵌套查询中最经常使用的谓词。

示例：查询与“刘晨”在同一个系学习的学生。

此查询要求可以分步来完成

① 确定“刘晨”所在系名      

  SELECT Sdept 

   FROM   Student              

   WHERE Sname= ' 刘晨 '；

结果为： 

​     Sdept

​     IS

② 查找所有在IS系学习的学生。  

​    SELECT  Sno，Sname，Sdept  

​    FROM   Student        

​    WHERE Sdept= ' IS '；

结果为：

Sno     Sname  Sdept

95001     刘晨    IS

95004     张立    IS

③ 将第一步查询嵌入到第二步查询的条件中

  SELECT Sno，Sname，Sdept

  FROM Student

  WHERE Sdept IN

​     (SELECT Sdept

​      FROM Student

​      WHERE Sname= ‘ 刘晨 ’)；

注：本例中，子查询的查询条件不依赖于父查询，所以此查询为不相关子查询。

本例中的查询也可以用自身连接来完成：

SELECT S1.Sno，S1.Sname，S1.Sdept

   FROM Student S1，Student S2

   WHERE S1.Sdept = S2.Sdept 

AND  S2.Sname = '刘晨'；

示例：查询选修了课程名为“信息系统”的学生学号和姓名

 SELECT Sno，Sname      ③ 最后在Student关系中

 FROM  Student         取出Sno和Sname

 WHERE Sno IN

​    (SELECT Sno      ② 然后在SC关系中找出选

​     FROM  SC        修了3号课程的学生学号

​     WHERE Cno IN

​       (SELECT Cno   ① 首先在Course关系中找出“信

​       FROM Course   息系统”的课程号，结果为3号

​        WHERE Cname= ‘信息系统’));

或

  SELECT Student.Sno，Sname

   FROM Student，SC，Course

   WHERE Student.Sno = SC.Sno AND

​      SC.Cno = Course.Cno AND

​      Course.Cname=‘信息系统’；

- 带有比较运算符的子查询

指父查询与子查询之间用比较运算符进行连接，当能确切知道内层查询返回单值时，可用比较运算符（=，>，<，>=，<=，!=或< >）。

示例：假设只有一个学生刘晨,则对上例可以用 = 代替IN ：

   SELECT Sno，Sname，Sdept

   FROM  Student

   WHERE Sdept  =

​      (SELECT Sdept

​      FROM  Student

​      WHERE Sname= ‘刘晨’)；

示例：查询比刘晨年龄大的学生号,姓名 ：

   SELECT Sno，Sname

   FROM  Student

   WHERE Sage >

​      (SELECT Sage

​      FROM  Student

​      WHERE Sname= ‘刘晨’)；

- 在HAVING中使用子查询

示例： 查询平均分大于95002这个学生的平均分的学号

SELECT SNO FROM SC

GROUP BY SNO

HAVING AVG(GRADE)>

  (SELECT AVG(GRADE)

   FROM SC

   WHERE SNO=95002

  )

- 带有EXISTS谓词的子查询

EXISTS谓词相当于存在量词$。带有EXISTS谓词的子查询不返回任何数据，只产生逻辑真值“TRUE”或逻辑假值“false”：

- -  若内层查询结果非空，则返回真值
  -  若内层查询结果为空，则返回假值

由EXISTS引出的子查询，其目标列表达式通常都用* ，因为带EXISTS的子查询只返回真值或假值，给出列名无实际意义。由EXISTS引出的子查询一般都是相关子查询。所有其他谓词的子查询都能用带EXISTS谓词的子查询等价替换；一些带EXISTS或NOT EXISTS谓词的子查询不能被其他形式的子查询等价替换。

示例：查询所有选修了1号课程的学生姓名

- 用IN子查询实现：

SELECT Sname

FROM Student

WHERE Sno IN (Select Sno

​              FROM sc

​             WHERE Cno= ‘1’);

- 用连接运算实现：

SELECT distinct Sname

FROM Student, SC

WHERE Student.Sno=SC.Sno

 AND SC.Cno= '1';

- 用EXISTS语句实现：

SELECT Sname FROM Student

 WHERE EXISTS

  (SELECT * 

   FROM SC     /*相关子查询*/

   WHERE Sno=Student.Sno AND Cno= '1')；

### 4.4、集合查询

Select语句的查询结果是元组的集合，所以多个select语句的结果可进行集合操作。集合操作主要包括并操作（union）、交操作（intersect）和差操作（except）。注意：参加集合操作的各查询结果的列数必须相同；对应项的数据类型也必须相同。

### 4.4.1、并操作

形式

​     <查询块>

​      UNION

​     <查询块>

示例：查询计算机科学系的学生与年龄不大于19岁的学生的并集。

方法一：并操作会自动去除相同记录，而union all则不会

​    SELECT *

​    FROM Student

​    WHERE Sdept= 'CS'

​    UNION

​    SELECT *

​    FROM Student

​    WHERE Sage<=19；

方法二：

​    SELECT  DISTINCT *

​    FROM Student

​    WHERE Sdept= 'CS' OR Sage<=19；

### 4.4.2、交操作

示例：查询计算机科学系的学生与年龄不大于19岁的学生的交集

SELECT *

FROM Student

WHERE Sdept='CS'

INTERSECT

SELECT *

FROM Student

WHERE Sage<=19

实际上就是查询计算机科学系中年龄不大于19岁的学生：

​          SELECT *

​         FROM Student

​         WHERE Sdept= 'CS' AND Sage<=19；

### 4.4.3、 差操作

示例1：查询计算机科学系的学生与年龄不大于19岁的学生的差集。

  SELECT *

  FROM Student

  WHERE Sdept='CS'

  MINUS

  SELECT *

  FROM Student

  WHERE Sage <=19;

实际上是查询计算机科学系中年龄大于19岁的学生：

​    SELECT *

​    FROM Student

​    WHERE Sdept= 'CS' AND Sage>19；

示例2：查询未选课的学号(所有学号与选过课的学号的差集)

​    SELECT Sno

​    FROM Student

​    EXCEPT

​    SELECT Sno

​    FROM SC;

NOT IN实现:

​    SELECT Sno

​    FROM Student

​    WHERE Sno NOT IN

​          (SELECT Sno

​            FROM SC);

NOT EXISTS实现:

 SELECT Sno

 FROM Student S

 WHERE NOT EXISTS

​        (SELECT *

​         FROM SC WHERE SC.SNO=S.SNO);

实际应用中交操作和差操作应用较少，并操作使用较多。

### 4.5、SELECT语句的一般格式

SELECT [ALL|DISTINCT] <目标列表达式> [别名] [ ，<目标列表达式> [别名]] …

FROM <表名或视图名> [别名] [，<表名或视图名> [别名]] …

[WHERE <条件表达式>]

[GROUP BY <列名1>[，<列名1’>] ...[HAVING <条件表达式>] ]

[ORDER BY <列名2> [ASC|DESC] [，<列名2’> [ASC|DESC] ] … ]；

## 5、数据更新

数据更新操作有3种：向表中添加若干行数据、修改表中的数据和删除表中的若干行数据。在SQL中有相应的三类语句。

### 5.1、插入数据

SQL的数据插入语句INSERT通常有两种形式。一种是插入一个元组，另一种是插入子查询结果。后者可以一次插入多个元组。

### 5.1.1、插入单个元组

语句格式：

INSERT

INTO <表名> [(<属性列1>[，<属性列2 >…)]

VALUES (<常量1> [，<常量2>] …)

其功能是将新元组插入指定表中。其中新元组的属性列1的值为常量1，属性列2的值为常量2，…。INTO子句中没有出现的属性列，新元组在这些列上将取空值。但必须注意的是，在表定义时说明了not null的属性列不能取空值，否则会出错。

示例：插入一条选课记录( '95020'，'1 ')，新插入的记录在Grade列上取空值

   INSERT

   INTO SC(Sno，Cno)

   VALUES (' 95020 '，' 1 ')；

示例：将一个新学生记录（学号：95020；姓名：陈冬；性别：男；所在系：IS；年龄：18岁）插入到Student表中。

 INSERT 

INTO Student(sno,sname,ssex,sdept,sage)

 VALUES ('95020'，'陈冬'，'男'，'IS'，18)；

或

INSERT INTO Student VALUES ('95020'，'陈冬'，'男'，'IS'，18)；

注：当新元组在所有属性列上都指定了值，并且顺序一致，则可以省略属性名

INTO子句：

- 指定要插入数据的表名及属性列
- 属性列的顺序可与表定义中的顺序不一致
- 没有指定属性列：表示要插入的是一条完整的元组，且属性列属性与表定义中的顺序一致
- 指定部分属性列：插入的元组在其余属性列上取空值

VALUES子句 ：

- 提供的值必须在值的个数和值的类型与INTO子句匹配

### 5.1.2、插入子查询结果

子查询不仅可以嵌套在select语句中，用以构造父查询的条件，也可以嵌套在insert语句中，用以生成要插入的批量数据。

语句格式：

  INSERT

  INTO <表名> [(<属性列1> [，<属性列2>… )]

  子查询；

示例：对每一个系，求学生的平均年龄，并把结果存入数据库。

第一步：建表

   CREATE TABLE Deptage

​     (Sdept CHAR(15)  /* 系名*/

​     Avgage INT)； /*学生平均年龄*/

第二步：插入数据

​    INSERT

​    INTO Deptage(Sdept，Avgage)

​       SELECT Sdept，AVG(Sage)

​       FROM Student

​       GROUP BY Sdept；

### 5.2、修改数据

修改操作又称为更新操作，其一般语句格式：

   UPDATE <表名>

​    SET <列名>=<表达式>[，<列名>=<表达式>]…

  [WHERE <条件>]；

其功能是修改指定表中满足WHERE子句条件的元组。其中set子句给出<表达式>[的值用于取代相应的属性值。如果省略WHERE子句，则表示要修改表中的所有元组。

修改指定表中满足WHERE子句条件的元组。

### 5.2.1、修改某一个元组的值

示例：将学生95001的年龄改为22岁。

​     UPDATE Student

​     SET Sage=22

​     WHERE Sno=' 95001 '；

### 5.2.2、 修改多个元组的值

示例1：将所有学生的年龄增加1岁。

​     UPDATE Student

​     SET Sage= Sage+1；

示例2：将信息系所有学生的年龄增加1岁。

​     UPDATE Student

​     SET Sage= Sage+1

​     WHERE Sdept=' IS '；

### 5.2.3、带子查询的修改语句 

示例：将计算机科学系全体学生的成绩置零。

​    UPDATE SC

​    SET Grade=0

​    WHERE SNO IN

​       (SELETE SNO

​        FROM Student

​        WHERE SDEPT=‘CS’)；

### 5.3、删除数据

删除语句的一般格式为：   

DELETE

​     FROM   <表名>

​     [WHERE <条件>]；

DELETE语句的功能是删除指定表中满足WHERE子句条件的所有元组。如果省略WHERE子句表示要删除表中所有元组，但是表的定义仍在字典中。

### 5.3.1、 删除某一个元组的值

示例：删除学号为95019的学生记录。

​    DELETE

​    FROM Student

​    WHERE Sno='95019'；

### 5.3.2、 删除多个元组的值

示例：删除2号课程的所有选课记录。

​    DELETE

​    FROM SC；

​    WHERE Cno='2'；

  示例：删除所有的学生选课记录。

​    DELETE

​    FROM SC；

### 5.3.3、 带子查询的删除语句

示例：删除计算机科学系所有学生的选课记录。

​    DELETE

​    FROM SC

​    WHERE SNO IN

​      (SELETE SNO

​       FROM Student

​       WHERE SDEPT='CS')；

## 6、视图

视图是从一个或几个基本表（或视图）导出的表。它与基本表不同，是一个虚表。数据库中只存放视图的定义，而不存放视图对应的数据，这些数据仍存放在原来的基本表中，不会出现数据冗余。所以基表中的数据发生变化，从视图中查询出的数据也随之改变。

视图一经定义，就可以和基本表一样被查询、被删除。也可以在一个视图之上再定义新的视图，但对视图的更新（增、删、改）操作则有一定的限制。

### 6.1、定义视图

语句格式：

​    CREATE VIEW  <视图名> [(<列名> [，<列名>]…)]

​      AS <子查询>

​    [WITH CHECK OPTION]；

其中，子查询可以是任意复杂的select语句，但通常不允许含有order by子句和distinct短语。WITH CHECK OPTION表示对视图进行update，insert和delete操作时要保证更新、插入或删除的行满足视图定义中的谓词条件（即子查询中的条件表达式）。

### 6.1.1、建立视图

示例1：建立信息系学生的视图。

​    CREATE VIEW IS_Student(No,Name,Age)AS 

​        SELECT Sno, Sname, Sage

​        FROM  Student

​        WHERE Sdept= 'IS'

WITH CHECK OPTION；

注：由于在定义视图时加上了WITH  CHECK OPTION子句，以后对该视图进行增删改操作时，RDBMS会自动加上Sdept=‘IS’的条件。

示例2： 建立1号课程的选课视图，并要求透过该视图进行的更新操作只涉及1号课程，同时对该视图的任何操作只能在工作时间进行。

  CREATE VIEW IS_SC AS

   SELECT Sno，Cno，Grade

   FROM SC

   WHERE Cno= '1' 

   AND TO_CHAR(SYSDATE,'HH24')BETWEEN 9 AND 17

   AND TO_CHAR(SYSDATE,'D')BETWEEN 2 AND 6

   WITH CHECK OPTION;

视图不仅可以建立在单个基本表上，也可以建立在多个基本表上；不仅可以建立在一个或多个基本表上，也可以建立在一个或多个已定义好的视图上；或者建立在基本表与视图上。

示例3：建立新型系统选修了1号课程的学生的视图

CREATE VIEW IS_SI(Sno,Sname,Sgrade)AS 

​        SELECT Student.Sno, Sname, Grade

​         FROM  Student,SC

​        WHERE Sdept= 'IS'

AND  Student.Sno = SC.Sno

AND  SC.Cno = ‘1’；

  视图的定义也可以包含分组计算的值，如下例。

​     示例4：实现查询每个同学的平均成绩

​         CREAT VIEW S_G(Sno ,Gavg)

​          AS

​          SELECT Sno,AVG(Grade)

​          FROM SC

​          GROUP BY Sno;

### 6.1.2、删除视图

格式：

​     DROP VIEW <视图名> [CASCADE];

视图删除后视图的定义将从数据字典中删除。如果该视图上还导出了其他视图，则使用CASCADE级联删除语句，把该视图和由它导出的所有视图一起删除。

基本表删除后，由该基本表导出的所有视图没有删除，但均已无法使用了。

示例：删除视图IS_SI

​     DROP VIEW IS_SI;

### 6.2、查询视图

示例：视图建立后, 可对视图查询, 如同基本表:

​     SELECT Name

​     FROM  IS_Student

DBMS执行CREATE VIEW语句时只是把视图的定义存入数据字典，并不执行其中的SELECT语句。在对视图查询时，按视图的定义从基本表中将数据查出。

### 6.3、更新视图

更新视图是指通过视图来插入、删除和修改数据。由于视是不实际存储数据的虚表，因此对视图的操作，最终要转换为对基本表的操作。

为了防止用户通过视图对数据进行增删改时，有意无意地对不属于视图范围内的基本表数据进行操作，可在定义视图时加上WITH CHECK OPTION子句。这样在视图上增删改数据时，RDBMS会检查视图定义中的条件，若不满足条件，则拒绝执行该操作。

​     示例：将信息系学生视图IS_Student中学号为200215122的学生姓名改为“刘晨”。

UPDATE IS_Student

SET Sname = ‘刘晨’

WHERE Sno = ‘200215122’;

转换后的更新语句为：

​           UPDATE Student

SET Sname = ‘刘晨’

WHERE Sno = ‘200215122’ AND Sdept = ‘IS’;

注：如果IS_Student视图定义的时候含有WITH CHECK OPTION子句，则对视图IS_Student的更新范围只能是信息系学生信息。

​     在关系数据库中，并不是所有的视图都是可以更新的，因为有些视图的更新不能唯一地有意义地转换成对相应基本表的更新。例如，建立视图中定义的S_G视图，如果想把视图S_G中学号为200215121的学生的平均成绩改成90分，SQL语句如下：

​     UPDATE S_G

​     SET Gavg = 90

​     WHERE Sno = ‘200215121’;

注：对这个视图的更新是无法转换成对基本表SC的更新的，因为系统无法修改各科成绩，以使平均成绩为90。所以S_G视图是不可更新的。

​     目前各个关系数据库系统一般都只允许对行列子集视图进行更新，而且各个系统对视图的更新还有更进一步的规定，由于各系统实现方法上的差异，这些规定也不尽相同。

​     例如DB2规定：

1) 若视图是由两个以上基本表导出的，则此视图不允许更新。

2) 若视图的字段来自字段表达式或常数，则不允许对此视图执行INSERT和UPDATE操作，但允许执行delete操作。

3) 若视图的字段来自聚集函数，则此视图不允许更新

4) 若视图定义中含有Group By子句，则此视图不允许更新

5) 若视图定义中含有DISTINGCT短语，则此视图不允许更新

6) 若视图定义中有嵌套查询，并且内层查询的from子句中设计的表也是导出该视图的基本表，则此视图不允许更新。例如，将SC中成绩在平均成绩之上的元组定义成一个视图GOOD_SC：

CREATE VIEW GOOD_SC

AS 

SELECT Sno,Cno,Grade

FROM SC

WHERE Grade > ( SELECT AVG(Grade)FROM SC )；

导出视图GOOD_SC的基本表是SC，内层查询中涉及的表也是SC，所以视图GOOD_SC是不允许更新的

1) 一个不允许更新的视图也是不允许更新。

### 6.4、视图的作用

视图最终是定义在基本表之上的，对视图的一切操作最终也要转换为对基本表的操作。而且对于非行列子集视图进行更新时还有可能出现问题。既然如此，为什么还要定义视图呢？这是因为合理使用视图能够带来许多好处。

1) 简化用户的操作

视图机制是用户可以将注意力集中在所关心的数据上，是数据库看起来结构清晰、简单。并且可以简化用户的数据查询操作。例如，那些定义了若干张表连接的视图，就将表与表之间的连接操作对用户隐蔽起来了。换句话说，用户所做的只是对一个虚表的简单查询，而这个虚表是怎样得来的，用户无需了解。

1) 使用户能以多种角度看待同一数据

视图机制能使不同用户以不同方式看待同一数据，当许多不同种类的用户共享同一个数据库时，这种灵活性非常重要。

1) 提供了一定程度的逻辑独立性

数据的物理独立性是指用户的应用程序不依赖于数据的物理结构；数据的逻辑独立性是指当数据库重构造时，如增加新的关系或对原有关系增加新的字段等，用户的应用程序不会受影响。

例：数据库逻辑结构发生改变学生关系Student(Sno， Sname， Ssex，Sage，Sdept)“垂直”地分成两个基本表：

​    SX(Sno，Sname，Sage)

​    SY(Sno，Ssex，Sdept)

通过建立一个视图Student：

CREATE VIEW Student(Sno，Sname，Ssex，Sage，Sdept)

AS 

SELECT SX.Sno，SX.Sname，SY.Ssex，SX.Sage，SY.Sdept

FROM SX，SY

WHERE SX.Sno=SY.Sno；

使用户的外模式保持不变，从而对原Student表的查询程序不必修改。

1) 能够对机密数据提供安全保护  

对不同用户定义不同视图，使每个用户只能看到他有权看到的数据；通过WITH CHECK OPTION对关键数据定义操作限制，限制操作的范围和时间等。

## 参考文章
* https://www.cnblogs.com/zhouyeqin/p/7395037.html