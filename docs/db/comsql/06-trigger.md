---
title: 常用SQL-触发器
---

::: tip
本文主要是介绍 常用SQL-触发器 。
:::

[[toc]]

# SQL总结（六）触发器

## 概念

触发器是一种特殊类型的存储过程，不由用户直接调用。创建触发器时会对其进行定义，以便在对特定表或列作特定类型的数据修改时执行。

触发器可以查询其他表，而且可以包含复杂的 SQL 语句。 它们主要用于强制服从复杂的业务规则或要求。 例如，您可以根据客户当前的帐户状态，控制是否允许插入新订单。
触发器也可用于强制引用完整性，以便在多个表中添加、更新或删除行时，保留在这些表之间所定义的关系。

注意：不同的数据库Mysql、SQLServer、Oracle、DB2，上的SQL语法会有差异，具体需要参考对应的数据库文档。
如下案例主要参考SQLServer数据库。

## 作用

1）触发器可通过数据库中的相关表实现级联更改；通过级联引用完整性约束可以更有效地执行这些更改。

2）触发器可以强制比用 CHECK 约束定义的约束更为复杂的约束。与 CHECK 约束不同，触发器可以引用其它表中的列。例如，触发器可以使用另一个表中的 SELECT 比较插入或更新的数据，以及执行其它操作，如修改数据或显示用户定义错误信息。

3）触发器还可以强制执行业务规则

4）触发器也可以评估数据修改前后的表状态，并根据其差异采取对策。

## 实际应用

尽管触发器有很多优点，但是在实际的项目开发中，特别是OOP思想的深入，触发器的弊端也逐渐突显，主要：

1、过多的触发器使得数据逻辑变得复杂

2、数据操作比较隐含，不易进行调整修改

3、触发器的功能逐渐在代码逻辑或事务中替代实现，更符合OO思想。

建议：

使用触发器需慎重。

## 语法

``` sql
CREATE TRIGGER trigger_name 
ON {table_name | view_name} 
{FOR | After | Instead of } [ insert, update,delete ]
AS           
    sql_statement  
```

 

## 触发器类型

SQL Server 包括两种常规类型的触发器：数据操作语言 (DML) 触发器和数据定义语言 (DDL) 触发器。 当INSERT、UPDATE 或 DELETE 语句修改指定表或视图中的数据时，可以使用 DML 触发器。 DDL 触发器激发存储过程以响应各种 DDL 语句，这些语句主要以CREATE、ALTER 和 DROP 开头。 DDL 触发器可用于管理任务，例如审核和控制数据库操作。

通常说的触发器就是DML触发器。

DML 触发器在 INSERT、UPDATE 和 DELETE 语句上操作，并且有助于在表或视图中修改数据时强制业务规则，扩展数据完整性。

在SQL Server2005后又增加了DDL触发器。

DDL 触发器将激发存储过程以响应事件。但与 DML 触发器不同的是，它们不会为响应针对表或视图的 UPDATE、INSERT 或 DELETE 语句而激发。相反，它们将为了响应各种数据定义语言 (DDL) 事件而激发。这些事件主要与以关键字 CREATE、ALTER 和 DROP 开头的 Transact-SQL 语句对应。执行 DDL 式操作的系统存储过程也可以激发 DDL 触发器。

DDL 触发器使用场合：

- 要防止对数据库架构进行某些更改。
- 希望数据库中发生某种情况以响应数据库架构中的更改。
- 要记录数据库架构中的更改或事件。

 

在这里我们只讲述DML触发器。DML触发器又分以下分类：

1、 After触发器

After触发器要求只有执行某一操作insert、update、delete之后触发器才被触发，且只能定义在表上。

   1）insert触发器

   2）update触发器

   3）delete触发器 

2、Instead of 触发器 

 Instead of 触发器表示并不执行其定义的操作（insert、update、delete）而仅是执行触发器本身。既可以在表上定义instead of触发器，也可以在视图上定义。

## inserted与deleted对比

触发器有两个特殊的表：插入表（instered表）和删除表（deleted表）。这两张是逻辑表也是虚表。有系统在内存中创建者两张表，不会存储在数据库中。而且两张表的都是只读的，只能读取数据而不能修改数据。这两张表的结果总是与被改触发器应用的表的结构相同。当触发器完成工作后，这两张表就会被删除。Inserted表的数据是插入或是修改后的数据，而deleted表的数据是更新前的或是删除的数据。

| 对表的操作         | Inserted逻辑表   | Deleted逻辑表    |
| ------------------ | ---------------- | ---------------- |
| 增加记录（insert） | 存放增加的记录   | 无               |
| 删除记录（delete） | 无               | 存放被删除的记录 |
| 修改记录（update） | 存放更新后的记录 | 存放更新前的记录 |


## 具体应用

在触发器实际应用中，主要还是建立约束以及级联更新。在这里主要通过简单实例予以说明。

###  1、触发器新增

原理：

 当触发INSERT触发器时，新的数据行就会被插入到触发器表和inserted表中。inserted表是一个逻辑表，它包含了已经插入的数据行的一个副本。inserted表包含了INSERT语句中已记录的插入动作。inserted表还允许引用由初始化INSERT语句而产生的日志数据。触发器通过检查inserted表来确定是否执行触发器动作或如何执行它。inserted表中的行总是触发器表中一行或多行的副本。

场景：增加学生信息时，要校验其年龄，暂定其年龄必须大于18，否则新增失败 

作用：校验约束

具体实例：

``` sql
--触发器新增：只允许录取18岁以上学生
IF OBJECT_ID (N'TRIGER_Students_Insert', N'tr') IS NOT NULL
    DROP TRIGGER TRIGER_Students_Insert;
GO
CREATE TRIGGER TRIGER_Students_Insert
ON Students
FOR INSERT
AS
    declare @age int
    select @age=COUNT(Students.ID) FROM Students INNER JOIN inserted ON Students.ID =inserted.ID    
    PRINT @age
    if(@age<18)
    begin
        raiserror('学生年龄必须要大于18哦',16,8)
        rollback tran
    end
```



**执行insert:**

``` sql
INSERT INTO Students(ID,Name,Age,City,MajorID) VALUES(105,'李四',16,'BeiJing',11)
```

**执行结果：**

会直接异常，返回错误信息

``` sql
消息 50000，级别 16，状态 8，过程 TRIGER_Students_Insert，第 10 行
学生年龄必须要大于18哦
消息 3609，级别 16，状态 1，第 1 行
事务在触发器中结束。批处理已中止。
```

 

 

### 2、触发器更新

原理：

可将UPDATE语句看成两步操作：即捕获数据前像(before image)的DELETE语句，和捕获数据后像(after image)的INSERT语句。当在定义有触发器的表上执行UPDATE语句时，原始行（前像）被移入到deleted表，更新行（后像）被移入到inserted表。

触发器检查deleted表和inserted表以及被更新的表，来确定是否更新了多行以及如何执行触发器动作。

可以使用IF UPDATE语句定义一个监视指定列的数据更新的触发器。这样，就可以让触发器容易的隔离出特定列的活动。当它检测到指定列已经更新时，触发器就会进一步执行适当的动作，例如发出错误信息指出该列不能更新，或者根据新的更新的列值执行一系列的动作语句。

场景：

专业信息ID修改，对应的学生信息中专业ID也相应进行修改

实例实现：



``` sql
--更新触发器：更新专业ID时,同时更新学生的专业信息
IF OBJECT_ID (N'TRIGER_Majors_Update', N'tr') IS NOT NULL
    DROP TRIGGER TRIGER_Majors_Update;
GO
CREATE TRIGGER TRIGER_Majors_Update
ON Majors
FOR UPDATE
AS
    IF UPDATE(ID)
    UPDATE Students Set MajorID=inserted.ID
    FROM Students,deleted,inserted
    WHERE Students.MajorID = deleted.ID
```



**原始数据：**

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/db/comsql/tri-1.png')" alt="wxmp">

**执行更新操作：**

``` sql
UPDATE Majors SET ID=12 WHERE ID=11
```

**执行结果：**

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/db/comsql/tri-2.png')" alt="wxmp">

### 3、触发器删除

原理：

当触发DELETE触发器后，从受影响的表中删除的行将被放置到一个特殊的deleted表中。deleted表是一个逻辑表，它保留已被删除数据行的一个副本。deleted表还允许引用由初始化DELETE语句产生的日志数据。

使用DELETE触发器时，需要考虑以下的事项和原则：

- 当某行被添加到deleted表中时，它就不再存在于数据库表中；因此，deleted表和数据库表没有相同的行。
- 创建deleted表时，空间是从内存中分配的。deleted表总是被存储在高速缓存中。
- 为DELETE动作定义的触发器并不执行TRUNCATE TABLE语句，原因在于日志不记录TRUNCATE TABLE语句。

场景：学校某选修课取消。

处理逻辑：在删除课程的同时，需要删除该课程的选课信息。

**触发器：**



``` sql
--删除触发器：删除课程时,同时删除该课程的选课信息
IF OBJECT_ID (N'TRIGER_Courses_Delete', N'tr') IS NOT NULL
    DROP TRIGGER TRIGER_Courses_Delete;
GO
CREATE TRIGGER TRIGER_Courses_Delete
ON Courses
FOR DELETE
AS
    DELETE SC
    FROM SC,deleted     
    WHERE SC.CourseID = deleted.ID
```



**原始数据：**

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/db/comsql/tri-3.png')" alt="wxmp">

**执行课程删除操作：**

``` sql
DELETE FROM Courses WHERE ID=10
```

**执行结果：**

可以看到，删除课程的同时，选修课程10的选课记录也被删除。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/db/comsql/tri-4.png')" alt="wxmp">

### 4、Instead Of 触发器

用Instead Of触发器实现与实例3相同的功能，具体实现代码如下：

``` sql
--Instead Of触发器：删除课程时,同时删除该课程的选课信息
IF OBJECT_ID (N'TRIGER_Courses_Instead_Delete', N'tr') IS NOT NULL
    DROP TRIGGER TRIGER_Courses_Instead_Delete;
GO
CREATE TRIGGER TRIGER_Courses_Instead_Delete
ON Courses
Instead Of DELETE
AS
    declare @courseId int
    --获取要删除的课程ID
    SELECT @courseId=ID FROM deleted
    --删除选课信息
    DELETE FROM SC WHERE CourseID = @courseId
    --删除课程信息
    DELETE FROM Courses WHERE ID=@courseId
```



执行删除：

``` sql
--测试用例DELETE FROM Courses WHERE ID=10
```

测试结果：

其测试结果与实例3相同。

## 本文测试用例脚本：

``` sql
--数据准备
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

/*
基础数据
*/

--专业信息
DELETE FROM Majors
INSERT INTO Majors(ID,Name) VALUES(10,'法律')
INSERT INTO Majors(ID,Name) VALUES(11,'美学')

--课程信息
DELETE FROM Courses
INSERT INTO Courses(ID,Name) VALUES (10,'太极拳')
INSERT INTO Courses(ID,Name) VALUES (11,'摄影入门')
INSERT INTO Courses(ID,Name) VALUES (12,'生命科学导论')

--学生信息
DELETE FROM Students
INSERT INTO Students(ID,Name,Age,City,MajorID) VALUES(101,'Tom',20,'BeiJing',10)
INSERT INTO Students(ID,Name,Age,City,MajorID) VALUES(103,'李明',20,'BeiJing',11)
INSERT INTO Students(ID,Name,Age,City,MajorID) VALUES(104,'王涛',18,'ShangHai',11)


--选课信息
DELETE FROM SC
INSERT INTO SC(StudentID,CourseID) VALUES(101,10)
INSERT INTO SC(StudentID,CourseID) VALUES(101,11)
INSERT INTO SC(StudentID,CourseID) VALUES(102,12)



--触发器新增：只允许录取18岁以上学生
IF OBJECT_ID (N'TRIGER_Students_Insert', N'tr') IS NOT NULL
    DROP TRIGGER TRIGER_Students_Insert;
GO
CREATE TRIGGER TRIGER_Students_Insert
ON Students
FOR INSERT
AS
    declare @age int
    select @age=COUNT(Students.ID) FROM Students INNER JOIN inserted ON Students.ID =inserted.ID    
    PRINT @age
    if(@age<18)
    begin
        raiserror('学生年龄必须要大于18哦',16,8)
        rollback tran
    end

--测试用例
INSERT INTO Students(ID,Name,Age,City,MajorID) VALUES(105,'李四',16,'BeiJing',11)
SELECT * FROM Students

--更新触发器：更新专业ID时,同时更新学生的专业信息
IF OBJECT_ID (N'TRIGER_Majors_Update', N'tr') IS NOT NULL
    DROP TRIGGER TRIGER_Majors_Update;
GO
CREATE TRIGGER TRIGER_Majors_Update
ON Majors
FOR UPDATE
AS
    IF UPDATE(ID)
    UPDATE Students Set MajorID=inserted.ID
    FROM Students,deleted,inserted
    WHERE Students.MajorID = deleted.ID

--测试用例
UPDATE Majors SET ID=12 WHERE ID=11

SELECT * FROM Students
SELECT * FROM Majors

--删除触发器：删除课程时,同时删除该课程的选课信息
IF OBJECT_ID (N'TRIGER_Courses_Delete', N'tr') IS NOT NULL
    DROP TRIGGER TRIGER_Courses_Delete;
GO
CREATE TRIGGER TRIGER_Courses_Delete
ON Courses
FOR DELETE
AS
    DELETE SC
    FROM SC,deleted     
    WHERE SC.CourseID = deleted.ID

--测试用例
DELETE FROM Courses WHERE ID=10

--执行结果
SELECT * FROM Students
SELECT * FROM Courses
SELECT * FROM SC



--Instead Of触发器：删除课程时,同时删除该课程的选课信息
IF OBJECT_ID (N'TRIGER_Courses_Instead_Delete', N'tr') IS NOT NULL
    DROP TRIGGER TRIGER_Courses_Instead_Delete;
GO
CREATE TRIGGER TRIGER_Courses_Instead_Delete
ON Courses
Instead Of DELETE
AS
    declare @courseId int
    --获取要删除的课程ID
    SELECT @courseId=ID FROM deleted
    --删除选课信息
    DELETE FROM SC WHERE CourseID = @courseId
    --删除课程信息
    DELETE FROM Courses WHERE ID=@courseId

--测试用例
DELETE FROM Courses WHERE ID=10

--执行结果
SELECT * FROM Students
SELECT * FROM Courses
SELECT * FROM SC
```


## 其他

关于raiserror可见：

https://msdn.microsoft.com/zh-cn/library/ms178592.aspx

 


## 参考文章
* https://www.cnblogs.com/yank/p/4193820.html