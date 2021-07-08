---
title: 常用SQL-基本查询
---

::: tip
本文主要是介绍 常用SQL-基本查询 。
:::

[[toc]]

# SQL总结（一）基本查询

 SQL查询的事情很简单，但是常常因为很简单的事情而出错。遇到一些比较复杂的查询我们更是忘记了SQL查询的基本语法。

本文希望通过简单的总结，把常用的查询方法予以总结，希望能够明确在心。

场景：学生信息系统，包括学生信息、教师信息、专业信息和选课信息。



``` sql
--学生信息表
IF OBJECT_ID (N'Students', N'U') IS NOT NULL
    DROP TABLE Students;
GO
CREATE TABLE Students(
    ID int primary key not null,
    Name nvarchar(50),
    Age int,
    City nvarchar(50),
    MajorID int
)


--专业信息表
IF OBJECT_ID (N'Majors', N'U') IS NOT NULL
    DROP TABLE Majors;
GO
CREATE TABLE Majors(
    ID int primary key not null,
    Name nvarchar(50)
)

--课程表
IF OBJECT_ID (N'Courses', N'U') IS NOT NULL
    DROP TABLE Courses;
GO
CREATE TABLE Courses(
    ID int primary key not null,
    Name nvarchar(50) not null
)

IF OBJECT_ID (N'SC', N'U') IS NOT NULL
    DROP TABLE SC;
GO
--选课表
CREATE TABLE SC(
    StudentID int not null,
    CourseID int not null,
    Score int    
)
```



 

## 1、基本查询

从表中查询某些列的值，这是最基本的查询语句。

``` sql
SELECT 列名1,列名2 FROM 表名
```

 

## 2、Where（条件）

作用：按照一定的条件查询数据

语法：

``` sql
SELECT 列名1,列名2 FROM 表名 WHERE 列名1 运算符  值
```

运算符：

| 运算符  | 描述         |
| ------- | ------------ |
| =       | 等于         |
| <>      | 不等于       |
| >       | 大于         |
| <       | 小于         |
| >=      | 大于等于     |
| <=      | 小于等于     |
| BETWEEN | 在某个范围内 |
| LIKE    | 搜索某种模式 |

比较操作符都比较简单，不再赘述。关于BETWEEN和LIKE，专门拿出来重点说下

## 3、BETWEEN

在两个值之间，比如我从学生中查询年龄在18-20之间的学生信息

``` sql
SELECT ID,Name,Age FROM Students WHERE Age BETWEEN 18 AND 20
```

 

## 4、LIKE

作用：模糊查询。LIKE关键字与通配符一起使用

主要的通配符：

| **通配符**                             | **描述**                   |
| -------------------------------------- | -------------------------- |
| **%**                                  | 替代一个或多个字符         |
| **_**                                  | 仅替代一个字符             |
| **[charlist]**                         | 字符列中的任何单一字符     |
| **[^charlist]****或者****[!charlist]** | 不在字符列中的任何单一字符 |

实例：

1）查询姓氏为张的学生信息

``` sql
SELECT ID,Name FROM Students WHERE Name LIKE '张%'
```

 2）查询名字最后一个为“生”的同学

``` sql
SELECT ID,Name FROM Students WHERE Name LIKE '%生'
```

3）查询名字中含有“生”的学生信息

``` sql
SELECT ID,Name FROM Students WHERE Name LIKE '%生%'
```

4）查询姓名为两个字，且姓张学生信息

``` sql
SELECT ID,Name FROM Students WHERE Name LIKE '张_'
```

5)查询姓氏为张、李的学生信息

这个可以使用or关键字，但是使用通配符更简单高效

``` sql
SELECT ID,Name FROM Students WHERE Name LIKE '[张李]%'
```

6)查询姓氏非张、李的学生信息

这个也可以使用NOT LIKE 来实现，用下面方法更好。

``` sql
SELECT ID,Name FROM Students WHERE Name LIKE '[^张李]%'
```

或者：

``` sql
SELECT ID,Name FROM Students WHERE Name LIKE '[!张李]%'
```

 

 

## 5、AND

AND 在 WHERE 子语句中把两个或多个条件结合起来。表示和的意思，多个条件都成立。

1）查询年龄大于18且姓张的学生信息

``` sql
SELECT ID,Name FROM Students WHERE Age>18 AND Name LIKE '张%'
```

 

## 6、OR 

 OR可在 WHERE 子语句中把两个或多个条件结合起来。或关系，表示多个条件，只有一个符合即可。

1)查询姓氏为张、李的学生信息

``` sql
SELECT ID,Name FROM Students WHERE Name LIKE '张%' OR Name LIKE '李%'
```

 

##  7、IN

IN 操作符允许我们在 WHERE 子句中规定多个值。表示：在哪些值当中。

1）查询年龄是18、19、20的学生信息

``` sql
SELECT ID,Name FROM Students WHERE Age IN (18,19,20)
```

 

## 8、NOT 否定

NOT对于条件的否定，取非。

1）查询非张姓氏的学习信息

``` sql
SELECT ID,Name FROM Students WHERE Name NOT LIKE '张%'
```

 

## 9、ORDER BY（排序）

功能：对需要查询后的结果集进行排序

| **标识** | **含义** | **说明** |
| -------- | -------- | -------- |
| ASC      | 升序     | 默认     |
| DESC     | 倒序     |          |

 

实例：

1）查询学生信息表的学号、姓名、年龄，并按Age升序排列

``` sql
SELECT ID,Name,Age FROM Students ORDER BY Age
```

或指明ASC

``` sql
SELECT ID,Name,Age FROM Students ORDER BY Age ASC
```

2)查询学生信息，并按Age倒序排列

``` sql
SELECT ID,Name,Age FROM Students ORDER BY Age DESC
```

 

除了制定某个列排序外，还能指定多列排序，每个排序字段可以制定排序规则

说明：优先第一列排序，如果第一列相同，则按照第二列排序规则执行，以此类推。

3）查询学生的信息，按照总成绩倒序、学号升序排列

``` sql
SELECT ID,Name,Score FROM Students ORDER BY Score DESC,ID ASC
```

这个查询含义：首先按Score倒序排列，如果有多条记录Score相同，再按ID升序排列。

查询结果，例子：

| **ID** | **Name** | **Score** |
| ------ | -------- | --------- |
| 2      | 广坤     | 98        |
| 3      | 老七     | 98        |
| 1      | 赵四     | 79        |

##  10、AS(Alias)

可以为列名称和表名称指定别名（Alias）

作用：我们可以将查询的列，或者表指定需要的名字，如表名太长，用其简称，在连表查询中经常用到。

1) 将结果列改为需要的名称

``` sql
SELECT ID AS StudentID,Name AS StudentName FROM Students
```

2）用表名的别名，标识列的来源

``` sql
SELECT S.ID,S.Name,M.Name AS MajorName FROM Students AS S LEFT JOIN Majors AS MON S.MajorID = M.ID
```

3)在合计函数中，给合计结果命名

``` sql
SELECT COUNT(ID) AS StudentCount FROM Students
```

 

 

## 11、Distinct

含义：不同的

作用：查询时忽略重复值。

**语法：**

```
SELECT DISTINCT 列名称 FROM 表名称
```

**实例：**

1）查询学生所在城市名，排除重复

``` sql
SELECT DISTINCT City FROM Student
```

2)查询成绩分布分布情况

``` sql
SELECT DISTINCT(Score),Count(ID) FROM Student GROUP BY Score
```

学生成绩可能重复，以此得到分数、得到这一成绩的学生数。后续会详细介绍GROUP BY 用法。 



## 12、MAX/MIN

MAX 函数返回一列中的最大值。NULL 值不包括在计算中。

MIN 函数返回一列中的最小值。NULL 值不包括在计算中。

MIN 和 MAX 也可用于文本列，以获得按字母顺序排列的最高或最低值。

1）查询学生中最高的分数

``` sql
SELECT MAX(Score) FROM Students
```

2)查询学生中最小年龄

``` sql
SELECT MIN(Age) FROM Students
```

 

## 13、SUM

查询某列的合计值。

1）查询ID为1001的学生的各科总成绩

SC即为学生的成绩表，字段：StudentID，CourseID，Score.

``` sql
SELECT SUM(Score) AS TotalScore FROM SC WHERE StudentID='1001' 
```

## 14、AVG

AVG 函数返回数值列的平均值

1)查询学生的平均年龄

``` sql
SELECT AVG(Age) AS AgeAverage FROM Students
```

2）求课程ID为C001的平均成绩

``` sql
SELECT AVG(Score) FROM SC WHERE CourseID='C001'
```

 

## 15、COUNT

COUNT() 函数返回匹配指定条件的行数。

1)查询学生总数

``` sql
SELECT COUNT(ID) FROM Students
```

2)查询学生年龄分布的总数

``` sql
SELECT COUNT(DISTINCT Age) FROM Students
```

3)查询男生总数

``` sql
SELECT COUNT(ID) FROM Students WHERE Sex='男'
```

4）查询男女生各有多少人

``` sql
SELECT Sex,COUNT(ID) FROM Students GROUP BY Sex
```

 

## 16、GROUP BY

 GROUP BY 语句用于结合合计函数，根据一个或多个列对结果集进行分组。

1）查询男女生分布，上面已经给了答案。

``` sql
SELECT Sex,COUNT(ID) FROM Students GROUP BY Sex
```

2) 查询学生的城市分布情况

``` sql
SELECT City,COUNT(ID) FROM Students GROUP BY City
```

3)学生的平均成绩，查询结果包括：学生ID，平均成绩

``` sql
SELECT StudentID,AVG(Score) FROM SC GROUP BY StudentID
```

 4）删除学生信息中重复记录

根据列进行分组，如果全部列相同才定义为重复，则就需要GROUP BY所有字段。否则可按指定字段进行处理。

 

``` sql
DELETE FROM Students WHERE ID NOT IN (SELECT MAX(ID) FROM Students GROUP BY ID,Name,Age,Sex,City,MajorID)
```

## 17、HAVING

 在 SQL 中增加 HAVING 子句原因是，WHERE 关键字无法与合计函数一起使用。

语法：

```
SELECT column_name, aggregate_function(column_name)FROM table_nameWHERE column_name operator valueGROUP BY column_nameHAVING aggregate_function(column_name) operator value
```

 

1）查询平均成绩大等于于60的学生ID及平均成绩

``` sql
SELECT StudentID,AVG(Score) FROM SC GROUP BY StudentID HAVING AVG(Score)>=60
```

2）还是用HAVING的SQL语句中，可以有普通的WHERE条件

查询平均成绩大于等于60，且学生ID等于1的学生的ID及平均成绩。

``` sql
SELECT StudentID,AVG(Score) FROM SC WHERE StudentID='1' GROUP BY StudentID HAVING AVG(Score)>=60
```

3）查询总成绩在600分以上（包括600）的学生ID

``` sql
SELECT StudentID FROM SC GROUP BY StudentID HAVING SUM(Score)>=600
```

 

## 18、TOP

TOP 子句用于规定要返回的记录的数目。对于大数据很有用的，在分页时也会常常用到。

1）查询年龄最大的三名学生信息

``` sql
SELECT TOP 3 ID,Name FROM Students ORDER BY Age DESC
```

2）还是上一道题，如果有相同年龄的如何处理呢？

``` sql
SELECT ID,Name,Age FROM Students WHERE Age IN (SELECT TOP 3 Age FROM Students)
```

## 19、Case语句 

计算条件列表，并返回多个可能的结果表达式之一。
CASE 表达式有两种格式：

- CASE 简单表达式，它通过将表达式与一组简单的表达式进行比较来确定结果。
- CASE 搜索表达式，它通过计算一组布尔表达式来确定结果。

简单表达式语法：

``` sql
CASE input_expression      WHEN when_expression THEN result_expression [ ...n ]      [ ELSE else_result_expression ] END 
```

搜索式语法：

``` sql
CASE     WHEN Boolean_expression THEN result_expression [ ...n ]      [ ELSE else_result_expression ] END
```

1）查询学习信息，如果Sex为0则显示为男，如果为1显示为女，其他显示为其他。

``` sql
SELECT ID, Name, CASE Sex WHEN '0' THEN '男' WHEN '1' THEN '女' ELSE '其他' END AS SexFROM Students
```

2）查询学生信息，根据年龄统计是否成年，大于等于18为成年，小于18为未成年

``` sql
SELECT ID, Name, CASE WHEN Age>=18 THEN '成年' ELSE '未成年'END AS 是否成年FROM Students
```

3）统计成年未成年学生的个数

要求结果

| **成年** | **未成年** |
| -------- | ---------- |
| 23       | 6          |

 

 

 

SQL语句

``` sql
SELECT SUM(CASE WHEN Age>=18 THEN  1 ELSE 0 END) AS '成年',SUM(CASE WHEN Age<18 THEN  1 ELSE 0 END) AS '未成年'
FROM Students
```

 4）行列转换。统计男女生中未成年、成年的人数

结果如下：

| **性别** | **未成年** | **成年** |
| -------- | ---------- | -------- |
| 男       | 3          | 13       |
| 女       | 2          | 18       |

 

 

 

SQL语句:

``` sql
SELECT CASE WHEN Sex=0 THEN '男' ELSE '女' END AS '性别',
SUM(CASE WHEN Age<18 THEN 1 ELSE 0 END) AS '未成年', 
SUM(CASE WHEN Age>=18 THEN 1 ELSE 0 END) AS '成年'
FROM Students
GROUP BY Sex
```

 


## 参考文章
* https://www.cnblogs.com/yank/p/3672478.html