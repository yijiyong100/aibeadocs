---
title: 常用SQL-连表查询
---

::: tip
本文主要是介绍 常用SQL-连表查询 。
:::

[[toc]]

# SQL总结（二）连表查询

连接查询包括合并、内连接、外连接和交叉连接，如果涉及多表查询，了解这些连接的特点很重要。

只有真正了解它们之间的区别，才能正确使用。

## 1、Union

UNION 操作符用于合并两个或多个 SELECT 语句的结果集。

UNION 运算符通过组合其他两个结果表（例如 TABLE1 和 TABLE2）并消去表中任何重复行而派生出一个结果表。

当 ALL 随 UNION 一起使用时（即 UNION ALL），不消除重复行。两种情况下，派生表的每一行不是来自 TABLE1 就是来自 TABLE2。

注意：使用UNION时，两张表查询的结果有相同数量的列、列类型相似。

学生表信息（Students）：

| **ID** | **Name** | **Age** | **City** | **MajorID** |
| ------ | -------- | ------- | -------- | ----------- |
| 101    | Tom      | 20      | BeiJing  | 10          |
| 102    | Lucy     | 18      | ShangHai | 11          |

 
教师表信息（Teachers）：

| **ID** | **Name** |
| ------ | -------- |
| 101    | Mrs Lee  |
| 102    | Lucy     |



预置脚本：

``` sql
INSERT INTO Students(ID,Name,Age,City,MajorID) VALUES(101,'Tom',20,'BeiJing',10)
INSERT INTO Students(ID,Name,Age,City,MajorID) VALUES(102,'Lucy',18,'ShangHai',11)

INSERT INTO Teachers(ID,Name) VALUES(101,'Mrs Lee')
INSERT INTO Teachers(ID,Name) VALUES(102,'Lucy')
```

 

1）基本UNION查询，查询学校教师、学生的总的信息表，包括ID和姓名

``` sql
SELECT ID,Name FROM Students
UNION
SELECT ID,Name FROM Teachers
```

查询结果：

| **ID** | **Name** |
| ------ | -------- |
| 101    | Mrs Lee  |
| 101    | Tom      |
| 102    | Lucy     |

2)带条件的UNION查询，也可以查询同一张表，查询年龄为18，23岁的学生信息

``` sql
SELECT ID,Name FROM Student WHERE Age=18
UNION
SELECT ID,Name FROM Student WHERE Age=23
```

当然，这可以使用IN或者OR很容易实现，这里只是点到，以后遇到复杂查询，相信你会用到。

3）查询教师学生全部姓名

 因为UNION只会选择不同的值，如果学生中和教师中有重名的情况，这就需要UNION ALL

``` sql
SELECT Name FROM Students
UNION ALL
SELECT Name FROM Teachers
```

查询结果：

| **ID** | **Name** |
| ------ | -------- |
| 101    | Tom      |
| 102    | Lucy     |
| 101    | Mrs Lee  |
| 102    | Lucy     |


## 2、INNER JOIN（内连接）

INNER JOIN（内连接），也成为自然连接

作用：根据两个或多个表中的列之间的关系，从这些表中查询数据。

注意: 内连接是从结果中删除其他被连接表中没有匹配行的所有行，所以内连接可能会丢失信息。

重点：内连接，只查匹配行。

语法：(INNER可省略)

``` sql
SELECT fieldlist
FROM table1 [INNER] join table2
ON table1.column=table2.column
```

学生表信息（Students）：

| **ID** | **Name** | **Age** | **City** | **MajorID** |
| ------ | -------- | ------- | -------- | ----------- |
| 101    | Tom      | 20      | BeiJing  | 10          |
| 102    | Lucy     | 18      | ShangHai | 11          |


专业信息表（Majors）： 

| **ID** | **Name** |
| ------ | -------- |
| 10     | English  |
| 12     | Computer |


 预置脚本：



``` sql
DELETE FROM Students
INSERT INTO Students(ID,Name,Age,City,MajorID) VALUES(101,'Tom',20,'BeiJing',10)
INSERT INTO Students(ID,Name,Age,City,MajorID) VALUES(102,'Lucy',18,'ShangHai',11)

DELETE FROM Majors
INSERT INTO Majors(ID,Name) VALUES(10,'English')
INSERT INTO Majors(ID,Name) VALUES(12,'Computer')
```


实例：查询学生信息，包括ID,姓名、专业名称

``` sql
SELECT Students.ID,Students.Name,Majors.Name AS MajorName
FROM Students INNER JOIN Majors
ON Students.MajorID = Majors.ID
```

 查询结果：

| **ID** | **Name** | **MajorName** |
| ------ | -------- | ------------- |
| 101    | Tom      | English       |


根据结果可以清晰看到，确实只有匹配的行。学生Lucy的信息丢失了。

 

**但是，inner join也会产生重复数据**。如果将Majors表的主键约束去掉，可以插入重复的ID，如：

``` sql
DELETE FROM Majors
INSERT INTO Majors(ID,Name) VALUES(10,'English')
INSERT INTO Majors(ID,Name) VALUES(10,'Computer')
```

继续执行上面的关联语句，结果为：

| **ID** | **Name** | **MajorName** |
| ------ | -------- | ------------- |
| 101    | Tom      | English       |
| 101    | Tom      | Computer      |



如果是LEFT JOIN也会有重复记录，其结果为：

| **ID** | **Name** | **MajorName** |
| ------ | -------- | ------------- |
| 101    | Tom      | English       |
| 101    | Tom      | Computer      |
| 102    | Lucy     | NULL          |


RIGHT JOIN 结果与INNER JOIN一样。

后续我们会深入研究JOIN的具体原理。

## 3、外连接

与内连接相比，即使没有匹配行，也会返回一个表的全集。

外连接分为三种：左外连接，右外连接，全外连接。对应SQL：LEFT/RIGHT/FULL OUTER JOIN。通常我们省略outer 这个关键字。写成：LEFT/RIGHT/FULL JOIN。

重点：至少有一方保留全集，没有匹配行用NULL代替。

1）LEFT OUTER JOIN，简称LEFT JOIN，左外连接（左连接）

结果集保留左表的所有行，但只包含第二个表与第一表匹配的行。第二个表相应的空行被放入NULL值。

**依然沿用内链接的例子**

（1）使用左连接查询学生的信息，其中包括学生ID，学生姓名和专业名称。

``` sql
SELECT Students.ID,Students.Name,Majors.Name AS MajorNameFROM Students LEFT JOIN MajorsON Students.MajorID = Majors.ID
```

 

**结果：**

| **ID** | **Name** | **MajorName** |
| ------ | -------- | ------------- |
| 101    | Tom      | English       |
| 102    | Lucy     | NULL          |



 **结论：**

通过结果，我们可以看到左连接包含了第一张表的所有信息，在第二张表中如果没有匹配项，则用NULL代替。 

 

2）RIGHT JOIN(right outer join)右外连接(右连接)

右外连接保留了第二个表的所有行，但只包含第一个表与第二个表匹配的行。第一个表相应空行被入NULL值。

右连接与左连接思想类似。只是第二张保留全集，如果第一张表中没有匹配项，用NULL代替

依然沿用内链接的例子，只是改为右连接

（1）使用右连接查询学生的信息，其中包括学生ID，学生姓名和专业名称。

``` sql
SELECT Students.ID,Students.Name,Majors.Name AS MajorNameFROM Students RIGHT JOIN MajorsON Students.MajorID = Majors.ID
```

查询结果：

| **ID** | **Name** | **MajorName** |
| ------ | -------- | ------------- |
| 101    | Tom      | English       |
| NULL   | NULL     | Computer      |



通过结果可以看到，包含了第二张表Majors的全集，Computer在Students表中没有匹配项，就用NULL代替。 


3）FULL JOIN (FULL OUTER JOIN，全外连接）

全外连接，简称：全连接。会把两个表所有的行都显示在结果表中

1)使用全连接查询学生的信息，其中包括学生ID，学生姓名和专业名称。

``` sql
SELECT Students.ID,Students.Name,Majors.Name AS MajorNameFROM Students FULL JOIN MajorsON Students.MajorID = Majors.ID
```

查询结果： 

| **ID** | **Name** | **MajorName** |
| ------ | -------- | ------------- |
| 101    | Tom      | English       |
| 102    | Lucy     | NULL          |
| NULL   | NULL     | Computer      |

 

包含了两张表的所有记录，没有记录丢失，没有匹配的行用NULL代替。

## 4、CROSS JOIN（交叉连接）

交叉连接。交叉连接返回左表中的所有行，左表中的每一行与右表中的所有行组合。交叉连接也称作笛卡尔积。 

简单查询两张表组合，这是求笛卡儿积，效率最低。

笛卡儿积：笛卡尔乘积，也叫直积。假设集合A={a,b}，集合B={0,1,2}，则两个集合的笛卡尔积为{(a,0),(a,1),(a,2),(b,0),(b,1), (b,2)}。可以扩展到多个集合的情况。类似的例子有，如果A表示某学校学生的集合，B表示该学校所有课程的集合，则A与B的笛卡尔积表示所有可能的选课情况。

1）交叉连接查询学生的信息，其中包括学生ID，学生姓名和专业名称。

``` sql
SELECT Students.ID,Students.Name,Majors.Name AS MajorNameFROM Students CROSS JOIN Majors
```

查询结果：

| **ID** | **Name** | **MajorName** |
| ------ | -------- | ------------- |
| 101    | Tom      | English       |
| 102    | Lucy     | English       |
| 101    | Tom      | Computer      |
| 102    | Lucy     | Computer      |

 


2）查询多表，其实也是笛卡儿积，与CROSS JOIN等价，以下查询同上述结果一样。

这个可能很常见，但是大家一定要注意了，这样就查询了两张表中所有组合的全集。

``` sql
SELECT Students.ID,Students.Name,Majors.Name AS MajorNameFROM Students,Majors
```

3）加了查询条件

注意:在使用CROSS JOIN关键字交叉连接表时，因为生成的是两个表的笛卡尔积，因而不能使用ON关键字，只能在WHERE子句中定义搜索条件。

``` sql
SELECT Students.ID,Students.Name,Majors.Name AS MajorNameFROM Students CROSS JOIN MajorsWHERE Students.MajorID = Majors.ID
```

查询结果：

| **ID** | **Name** | **MajorName** |
| ------ | -------- | ------------- |
| 101    | Tom      | English       |

 

 

 

 

查询结果与INNER JOIN一样，但是其效率就慢很多了。

## 5、全部实例脚本 


``` sql
CREATE DATABASE TestDB

USE TestDB

------------------------------------------
--创建相关表
IF OBJECT_ID('Students','U') IS NOT NULL
DROP TABLE Students
--学生信息表
CREATE TABLE Students(
ID int primary key not null,
Name nvarchar(50),
Age int,
City nvarchar(50),
MajorID int
)


--专业信息表
IF OBJECT_ID('Majors','U') IS NOT NULL
DROP TABLE Majors

CREATE TABLE Majors(
ID int primary key not null,
Name nvarchar(50)
)

--教师信息表
IF OBJECT_ID('Teachers','U') IS NOT NULL
DROP TABLE Teachers
CREATE TABLE Teachers(
    ID int primary key not null,
    Name nvarchar(20) not null
)

--预置数据
DELETE FROM Students
INSERT INTO Students(ID,Name,Age,City,MajorID) VALUES(101,'Tom',20,'BeiJing',10)
INSERT INTO Students(ID,Name,Age,City,MajorID) VALUES(102,'Lucy',18,'ShangHai',11)

DELETE FROM Majors
INSERT INTO Majors(ID,Name) VALUES(10,'English')
INSERT INTO Majors(ID,Name) VALUES(12,'Computer')

DELETE FROM Teachers
INSERT INTO Teachers(ID,Name) VALUES(101,'Mrs Lee')
INSERT INTO Teachers(ID,Name) VALUES(102,'Lucy')



SELECT ID,Name FROM Students
UNION
SELECT ID,Name FROM Teachers

SELECT ID,Name FROM Students
UNION ALL
SELECT ID,Name FROM Teachers

--内连接
SELECT Students.ID,Students.Name,Majors.Name AS MajorName
FROM Students INNER JOIN Majors
ON Students.MajorID = Majors.ID

--左连接
SELECT Students.ID,Students.Name,Majors.Name AS MajorName
FROM Students LEFT JOIN Majors
ON Students.MajorID = Majors.ID

--右连接
SELECT Students.ID,Students.Name,Majors.Name AS MajorName
FROM Students LEFT JOIN Majors
ON Students.MajorID = Majors.ID

--全连接
SELECT Students.ID,Students.Name,Majors.Name AS MajorName
FROM Students FULL JOIN Majors
ON Students.MajorID = Majors.ID

--交叉连接
SELECT Students.ID,Students.Name,Majors.Name AS MajorName
FROM Students CROSS JOIN Majors

--交叉连接
SELECT Students.ID,Students.Name,Majors.Name AS MajorName
FROM Students CROSS JOIN Majors
WHERE Students.MajorID = Majors.ID

--一次查询多表
SELECT Students.ID,Students.Name,Majors.Name AS MajorName
FROM Students,Majors
```



 

## 参考文章
* https://www.cnblogs.com/yank/p/3726491.html