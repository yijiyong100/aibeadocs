---
title: 常用SQL-存储过程
---

::: tip
本文主要是介绍 常用SQL-存储过程 。
:::

[[toc]]

# SQL总结（五）存储过程

## 概念

存储过程（Stored Procedure）：已预编译为一个可执行过程的一个或多个SQL语句。

注意：不同的数据库Mysql、SQLServer、Oracle、DB2，上的SQL语法会有差异，具体需要参考对应的数据库文档。
如下案例主要参考SQLServer数据库。

## 创建存储过程语法



``` sql
CREATE proc | procedure procedure_name
    [{@参数数据类型} [=默认值] [output],
     {@参数数据类型} [=默认值] [output],
     ....
    ]
as
    SQL_statementsgo
```



## 存储过程与SQL语句对比

**优势:**

1、提高性能
SQL语句在创建过程时进行分析和编译。 存储过程是预编译的，在首次运行一个存储过程时，查询优化器对其进行分析、优化，并给出最终被存在系统表中的存储计划，这样，在执行过程时便可节省此开销。
2、降低网络开销
存储过程调用时只需用提供存储过程名和必要的参数信息，从而可降低网络的流量。
3、便于进行代码移植
数据库专业人员可以随时对存储过程进行修改，但对应用程序源代码却毫无影响，从而极大的提高了程序的可移植性。
4、更强的安全性
1）系统管理员可以对执行的某一个存储过程进行权限限制，避免非授权用户对数据的访问
2）在通过网络调用过程时，只有对执行过程的调用是可见的。 因此，恶意用户无法看到表和数据库对象名称、嵌入自己的 Transact-SQL 语句或搜索关键数据。
3）使用过程参数有助于避免 SQL 注入攻击。 因为参数输入被视作文字值而非可执行代码，所以，攻击者将命令插入过程内的 Transact-SQL 语句并损害安全性将更为困难。
4）可以对过程进行加密，这有助于对源代码进行模糊处理。 

**劣势：**

1、存储过程需要专门的数据库开发人员进行维护，但实际情况是，往往由程序开发员人员兼职

2、设计逻辑变更，修改存储过程没有SQL灵活

## **为什么在实际应用中，存储过程用到相对较少呢？**

在通常的项目研发中，用存储过程却相对较少，这是为什么呢？
分析原因如下：
1）没有特定的数据库开发人员，普通程序员兼职进行数据库操作
2）程序员往往只需操作程序，即可完成数据访问，无需再在数据库上进行开发
3）项目需求变动比较频繁，修改SQL语句比较方便，特别是涉及逻辑变更 

## **存储过程与SQL语句如何抉择？**

基于实际应用的经验，给予如下建议：

1、在一些高效率或者规范性要求比较高的项目，建议采用存储过程
2、对于一般项目建议采用参数化命令方式，是存储过程与SQL语句一种折中的方式
3、对于一些算法要求比较高，涉及多条数据逻辑，建议采用存储过程

 

## 存储过程的具体应用

### 一、基础查询

### 1、创建不带参数的存储过程

例子：查询学生总数



``` sql
--查询存储过程
IF OBJECT_ID (N'PROC_SELECT_STUDENTS_COUNT', N'P') IS NOT NULL
    DROP procedure PROC_SELECT_STUDENTS_COUNT;
GO
CREATE procedure PROC_SELECT_STUDENTS_COUNT
AS 
    SELECT COUNT(ID) FROM Students
GO
```



执行：

``` sql
EXEC PROC_SELECT_STUDENTS_COUNT
```

 

### 2、带参数的存储过程



``` sql
--查询存储过程，根据城市查询总数
IF OBJECT_ID (N'PROC_SELECT_STUDENTS_BY_CITY_COUNT', N'P') IS NOT NULL
    DROP procedure PROC_SELECT_STUDENTS_BY_CITY_COUNT;
GO
CREATE procedure PROC_SELECT_STUDENTS_BY_CITY_COUNT(@city nvarchar(50))
AS
    SELECT COUNT(ID) FROM Students WHERE City=@city
GO
```



执行语句：

``` sql
EXEC PROC_SELECT_STUDENTS_BY_CITY_COUNT N'Beijing'
```

### 3、带有通配符

通配符，在参数值赋值时，加上相应的通配符



``` sql
--3、查询姓氏为李的学生信息，含通配符
IF OBJECT_ID (N'PROC_SELECT_STUDENTS_BY_SURNNAME', N'P') IS NOT NULL
    DROP procedure PROC_SELECT_STUDENTS_BY_SURNNAME;
GO
CREATE procedure PROC_SELECT_STUDENTS_BY_SURNNAME
    @surnName nvarchar(20)='李%' --默认值
AS 
    SELECT ID,Name,Age FROM Students WHERE Name like @surnName
GO
```



执行：

``` sql
EXEC PROC_SELECT_STUDENTS_BY_SURNNAME
EXEC PROC_SELECT_STUDENTS_BY_SURNNAME N'李%'
EXEC PROC_SELECT_STUDENTS_BY_SURNNAME N'%李%'
```

 

### 4、带有输出参数



``` sql
--根据姓名查询的学生信息，返回学生的城市及年龄
IF OBJECT_ID (N'PROC_SELECT_STUDENTS_BY_NAME', N'P') IS NOT NULL
    DROP procedure PROC_SELECT_STUDENTS_BY_NAME;
GO
CREATE procedure PROC_SELECT_STUDENTS_BY_NAME
    @name nvarchar(50),     --输入参数
    @city nvarchar(20) out, --输出参数
    @age  int output        --输入输出参数
AS 
    SELECT @city=City,@age=Age FROM Students WHERE Name=@name AND Age=@age
GO
```



执行：



``` sql
--执行
declare @name nvarchar(50),
        @city nvarchar(20),
        @age int;
set @name = N'李明';
set @age = 20;
exec PROC_SELECT_STUDENTS_BY_NAME @name,@city out, @age output;
select @city, @age;
```



## 二、使用存储过程进行增删改

### 1、新增

新增学生信息 



``` sql
--1、存储过程：新增学生信息
IF OBJECT_ID (N'PROC_INSERT_STUDENT', N'P') IS NOT NULL
    DROP procedure PROC_INSERT_STUDENT;
GO
CREATE procedure PROC_INSERT_STUDENT
    @id int,
    @name nvarchar(20),
    @age int,
    @city nvarchar(20)
AS 
    INSERT INTO Students(ID,Name,Age,City) VALUES(@id,@name,@age,@city)
GO
```



 执行：

``` sql
EXEC PROC_INSERT_STUDENT 1001,N'张三',19,'ShangHai'
```

### 2、修改

根据学生ID，更新学生信息 

``` sql
IF OBJECT_ID (N'PROC_UPDATE_STUDENT', N'P') IS NOT NULL
    DROP procedure PROC_UPDATE_STUDENT;
GO
CREATE procedure PROC_UPDATE_STUDENT
    @id int,
    @name nvarchar(20),
    @age int,
    @city nvarchar(20)
AS 
    UPDATE Students SET Name=@name,Age=@age,City=@city WHERE ID=@id
GO
```



执行：

``` sql
EXEC PROC_UPDATE_STUDENT 1001,N'张思',20,'ShangHai'
```

 

### 3、删除

根据ID，删除某学生记录



``` sql
--3、存储过程：删除学生信息
IF OBJECT_ID (N'PROC_DELETE_STUDENT_BY_ID', N'P') IS NOT NULL
    DROP procedure PROC_DELETE_STUDENT_BY_ID;
GO
CREATE procedure PROC_DELETE_STUDENT_BY_ID
    @id int
AS 
    DELETE FROM  Students WHERE ID=@id
GO
```



执行：

``` sql
EXEC PROC_DELETE_STUDENT_BY_ID 1001
```

 

## 三、存储过程实现分页查询

### 1、使用row_number函数分页



``` sql
--分页查询
IF OBJECT_ID (N'PROC_SELECT_BY_PAGE', N'P') IS NOT NULL
    DROP procedure PROC_SELECT_BY_PAGE;
GO
CREATE procedure PROC_SELECT_BY_PAGE
    @startIndex int,
    @endIndex int
AS 
    SELECT  * FROM (SELECT ID,Name,Age,City,ROW_NUMBER() OVER(ORDER BY ID DESC) AS RowNumber FROM Students) AS Temp 
    WHERE Temp.RowNumber BETWEEN @startIndex AND @endIndex
GO
```



执行：

``` sql
EXEC PROC_SELECT_BY_PAGE 1,10
```

### 2、使用传统的top分页



``` sql
--使用TOP分页
IF OBJECT_ID (N'PROC_SELECT_BY_PAGE_WITH_TOP', N'P') IS NOT NULL
    DROP procedure PROC_SELECT_BY_PAGE_WITH_TOP;
GO
CREATE procedure PROC_SELECT_BY_PAGE_WITH_TOP
    @pageIndex int,
    @pageSize int
AS 
    SELECT TOP(@pageSize) * FROM Students 
    WHERE ID >=(SELECT MAX(ID) FROM (SELECT TOP(@pageSize*(@pageIndex-1) + 1) ID FROM Students ORDER BY ID) AS Temp)    
GO
```



执行：

``` sql
EXEC PROC_SELECT_BY_PAGE_WITH_TOP 1,2
```

 

## 四、其他功能：

### 1、存储过程，每次执行都进行重新编译



``` sql
--1、存储过程，重复编译
IF OBJECT_ID (N'PROC_SELECT_STUDENTS_WITH_RECOMPILE', N'P') IS NOT NULL
    DROP procedure PROC_SELECT_STUDENTS_WITH_RECOMPILE;
GO
CREATE procedure PROC_SELECT_STUDENTS_WITH_RECOMPILE
with recompile --重复编译
AS 
    SELECT * FROM Students
GO
```



 

### 2、对存储过程进行加密

加密后，不能查看和修改源脚本



``` sql
--2、查询存储过程，进行加密
IF OBJECT_ID (N'PROC_SELECT_STUDENTS_WITH_ENCRYPTION', N'P') IS NOT NULL
    DROP procedure PROC_SELECT_STUDENTS_WITH_ENCRYPTION;
GO
CREATE procedure PROC_SELECT_STUDENTS_WITH_ENCRYPTION
with encryption --加密
AS 
    SELECT * FROM Students
GO
```



执行：

``` sql
EXEC PROC_SELECT_STUDENTS_WITH_ENCRYPTION
```

效果，无法查看脚本或者导出创建脚本

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/db/comsql/pro-1.png')" alt="wxmp">


## 参考文章
* https://www.cnblogs.com/yank/p/4235609.html