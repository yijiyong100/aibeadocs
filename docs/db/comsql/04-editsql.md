---
title: 常用SQL-编辑类
---

::: tip
本文主要是介绍 常用SQL-编辑类 。
:::

[[toc]]

# SQL总结（四）编辑类


## 1、数据库

创建数据库语法：

``` sql
CREATE DATABASE database_name
```

1）创建测试库

``` sql
CREATE DATABASE TestDB
```

 2）使用库

``` sql
USE TestDB
```

3）删除库

``` sql
DROP DATABASE TestDB
```

 

## 2、表

1）创建用户信息表，包括ID、姓名、年龄、专业ID、所在城市



``` sql
CREATE TABLE Students(
ID int,
Name nvarchar(20),
Age int,
MajorID int,
City nvarchar(50)
)
```



 2）更新表

- 添加字段

语法：

``` sql
ALTER TABLE table_name
ADD column_name datatype
```

学生信息表增加年纪字段

``` sql
ALTER TABLE Students ADD Grade int
```

- 修改字段

语法：

``` sql
ALTER TABLE table_name
ALTER COLUMN column_name datatype
```

实例：将Grade字段，int改为nvarchar

``` sql
ALTER TABLE Students ALTER COLUMN Grade nvarchar(20)
```

- 删除字段

语法：

``` sql
ALTER TABLE table_name DROP COLUMN column_name
```

实例：删除学生信息表中的Grade字段

``` sql
ALTER TABLE Students DROP COLUMN Grade
```

 

3）删除表

删除学生信息表：

``` sql
DROP TABLE Students
```

 

## 3、约束(Constraints)

CHECK 约束用于限制列中的值的范围。
如果对单个列定义 CHECK 约束，那么该列只允许特定的值。
如果对一个表定义 CHECK 约束，那么此约束会在特定的列中对值进行限制。

主要有以下几种约束：

- NOT NULL
- UNIQUE
- PRIMARY KEY
- FOREIGN KEY
- CHECK
- DEFAULT

###  1）不可空（NOT NULL）

 约束强制列不接受 NULL 值

### 2）唯一约束（UNIQUE）

UNIQUE 约束唯一标识数据库表中的每条记录

UNIQUE 和 PRIMARY KEY 约束均为列或列集合提供了唯一性的保证.

创建表时指定



``` sql
CREATE TABLE Students(
ID int primary key not null,
Name nvarchar(50) UNIQUE,
Age int,
City nvarchar(50),
MajorID int
)
```



但是这样UNIQUE约束名是按规则默认的，我们无法确认，不便于后续修改。

需在创建时指定约束名称，当然可以同时多多列建立唯一约束。建议创建表后添加约束。

（1）创建学生表时，指定ID和Name唯一约束



``` sql
CREATE TABLE Students(
ID int not null,
Name nvarchar(50),
Age int,
City nvarchar(50),
MajorID int,
CONSTRAINT UK_Students_ID_And_Name UNIQUE (ID,Name)
)
```



（2）为学生的姓名添加唯一约束

``` sql
ALTER TABLE Students ADD CONSTRAINT UK_Students_Name UNIQUE(Name) 
```

（3）删除学生姓名唯一约束

``` sql
ALTER TABLE Students DROP CONSTRAINT UK_Students_Name
```

 

### 3）主键（PRIMARY KEY）

PRIMARY KEY 约束唯一标识数据库表中的每条记录。

规则：

- 主键必须包含唯一的值。
- 主键列不能包含 NULL 值。
- 每个表都应该有一个主键，并且每个表只能有一个主键。

其使用方法与UNIQUE一样，这里只说几个简单例子

（1）指定学生ID为主键

``` sql
ALTER TABLE Students ADD CONSTRAINT PK_Students_ID PRIMARY KEY(ID)
```

（2）删除学生ID主键

``` sql
ALTER TABLE Students DROP CONSTRAINT PK_Students_ID
```

（3）创建学生ID和姓名的联合主键

注意：在创建主键时，一定要保证列有NOT NULL约束

``` sql
ALTER TABLE Students ADD CONSTRAINT PK_Students_ID_AND_Name PRIMARY KEY(ID,Name)
```

### 4）外键（FOREIGN KEY）

一个表中的 FOREIGN KEY 指向另一个表中的 PRIMARY KEY。

如：学生信息表中的MajorID即是专业信息表Majors的外键。

（1）学生信息表中的MajorID添加外键约束

``` sql
ALTER TABLE Students ADD CONSTRAINT FK_Students_MajorID FOREIGN KEY(MajorID) REFERENCES Majors(ID)
```

（2）删除外键约束

``` sql
ALTER TABLE Students DROP CONSTRAINT FK_Students_MajorID
```

### 5）校验约束（CHECK）

CHECK 约束用于限制列中的值的范围。

（1) 设置学生的名称长度不能少于2

``` sql
ALTER TABLE Students ADD CONSTRAINT CK_Students_Name CHECK(LEN(Name)>=2)
```

（2）删除该约束

``` sql
ALTER TABLE Students DROP CONSTRAINT CK_Students_Name
```

（3）多列约束，对姓名和年龄添加约束

``` sql
ALTER TABLE Students ADD CONSTRAINT CK_Students_Name_AND_Age CHECK(LEN(Name)>=2 AND Age>=18)
```

### 6）默认值（DEFAULT）

DEFAULT 约束用于向列中插入默认值。

此约束可以直接在创建表时执行。一般改动较小。

（1）建表时指定默认值，指定性别的默认值为0（0代表男，1代表女）



``` sql
--学生信息表
CREATE TABLE Students(
ID int primary key not null,
Name nvarchar(50),
Age int,
Sex bit DEFAULT(0),
City nvarchar(50),
MajorID int
)
```



（2）单独语句增加Sex默认值约束

``` sql
ALTER TABLE Students ADD CONSTRAINT DF_Students_Sex DEFAULT(1) FOR Sex
```

（3）删除默认值约束

``` sql
ALTER TABLE Students DROP CONSTRAINT DF_Students_Sex
```

（4）修改默认值约束，暂时没找到 

建议删除后重建。

## 4、索引

索引类似于书记的目录

索引可以加快查询速度，当然过多的索引会影响数据的更新效率，建议索引建立在那些变化不大且经常查询的列。

1）创建索引

CREATE INDEX 语句用于在表中创建索引。

CREATE UNIQUE INDEX是创建唯一索引，意味着其值唯一。

（1）在学生表的ID上创建索引

``` sql
CREATE INDEX Index_Student_IDON Students (ID)
```

（2)在学生表的ID上创建唯一索引

``` sql
CREATE UNIQUE INDEX Index_Student_IDON Students (ID)
```

（3）在学生ID降序创建索引

``` sql
CREATE UNIQUE INDEX Index_Student_IDON Students (ID DESC)
```

（4）创建多个列联合索引

``` sql
CREATE INDEX Index_Student_ID_AND_NAMEON Students(ID,Name)
```

 2）删除索引

语法：

``` sql
DROP Index TABLE_NAME.INDEX_NAME
```

如：删除学生表的ID索引

``` sql
DROP Index Students.Index_Student_ID
```

 

### 5、视图(VIEW)

概念: 是基于 SQL 语句的结果集的可视化的表。

视图包含行和列，就像一个真实的表。视图中的字段就是来自一个或多个数据库中的真实的表中的字段。我们可以向视图添加 SQL 函数、WHERE 以及 JOIN 语句，我们也可以提交数据，就像这些来自于某个单一的表。 

1）创建视图，查询所有成年的学生信息

``` sql
CREATE VIEW V_Adult_Students ASSELECT ID,Name,Age,City FROM Students WHERE Age>=18
```

2）删除视图

``` sql
DROP VIEW V_Adult_Students
```

3）更新视图，暂时没有直接方法，建议删除重建。 

 

## 对于记录

### 1、插入

语法：

``` sql
INSERT INTO 表名称 VALUES (值1, 值2,....)
```

指定所要插入数据的列（推荐）：

``` sql
INSERT INTO table_name (列1, 列2,...) VALUES (值1, 值2,....)
```

实例：增加学生信息

``` sql
INSERT INTO Students VALUES(2,'Lucy',17,'BeiJing','10')
```

建议使用，指定列。

``` sql
INSERT INTO Students(ID,Name,Age,City) VALUES(1,'Tom',19,'BeiJing')
```

 

### 2、更新

Update 语句用于修改表中的数据。

语法：

``` sql
UPDATE 表名称 SET 列名称 = 新值 WHERE 列名称 = 某值
```

实例：

更新Lucy的年龄

``` sql
UPDATE Students SET Age=18 WHERE Name='Lucy'
```

更新多列的值：

``` sql
UPDATE Students SET Age=18,City='ShangHai' WHERE Name='Lucy'
```

### 3、删除

DELETE 语句用于删除表中的行。

 

语法：

``` sql
DELETE FROM 表名称 WHERE 列名称 = 值
```

实例：

1）删除Lucy的学生信息

``` sql
DELETE FROM Students WHERE Name='Lucy'
```

2）删除所有学生信息

``` sql
DELETE FROM Students
```

 


## 参考文章
* https://www.cnblogs.com/yank/p/3722564.html