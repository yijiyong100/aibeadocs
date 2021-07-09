---
title: 常用SQL-其他查询
---

::: tip
本文主要是介绍 常用SQL-其他查询 。
:::

[[toc]]

# SQL总结（三）其他查询

 其他常用的SQL，在这里集合。

## 1、SELECT INTO

从一个表中选取数据，然后把数据插入另一个表中。常用于创建表的备份或者用于对记录进行存档。

语法：

``` sql
SELECT column_name(s)
INTO new_table_name [IN externaldatabase] 
FROM old_tablename
```

IN 子句可用于向另一个数据库中拷贝表。

1）备份表信息

``` sql
SELECT ID,Name 
INTO Students_Backup
FROM Students
```

2)复制到备份库

``` sql
SELECT *
INTO Students IN 'Backup.mdb'
FROM Students
```

## 2、IDENTITY 

作用：创建唯一的，递增的列

注意：一张表中只能有一列为IDENTITY

1）创建学生信息表时，指定其ID为自增列，从1开始，每次递增1



``` sql
IF OBJECT_ID (N'Students', N'U') IS NOT NULL
    DROP TABLE Students;
GO
--学生信息表
CREATE TABLE Students(
ID int primary key IDENTITY(1,1) not null,
Name nvarchar(50),
Age int,
Sex bit,
City nvarchar(50),
MajorID int
)
```



 

2）如果指定了自增列，又需要插入指定ID的值，需要停止INDENTIY，执行后再开启。

``` sql
SET IDENTITY_Insert Students ON 
insert Students(ID,Name,Age,City) values(10,'Jim',18,'NewYank') 
SET IDENTITY_Insert Students OFF 
```

3）与SELECT INTO 合用，插入行号

这个常常用于临时表分页时使用。

注意：如果查询的列中有自增列，需要将其删除，或者屏蔽，因为一张表中只有一个IDENTITY字段。

``` sql
SELECT IDENTITY(int,1,1) AS RowNumber,Name,Age,Sex,City
INTO Students_Backup
FROM Students
```

**SCOPE_IDENTITY()** 

还有一个常用的函数，与此一起使用 SCOPE_IDENTITY()

常常在有IDENTITY列的插入时，需要返回当前的行的IDENTITY的列值。

如： 



``` sql
IF OBJECT_ID (N'Students', N'U') IS NOT NULL
    DROP TABLE Students;
GO
--学生信息表
CREATE TABLE Students(
    ID int IDENTITY(1,1) PRIMARY KEY not null,
    Name nvarchar(50),
    Age int,
    Sex bit,
    City nvarchar(50),
    MajorID int
)

INSERT INTO Students(Name,Age,Sex,City,MajorID) VALUES('Jim',18,0,'ShangHai',12)
SELECT SCOPE_IDENTITY()
```



 

这个例子，每次返回插入记录的ID的值。如果有其他关联表用到此ID，这时就不用再从数据库查一遍了。 

## 3、OBJECT_ID 

返回架构范围内对象的数据库对象标识号。

1）查询表是否存在

``` sql
SELECT OBJECT_ID(N'Students',N'U')
```

与以下语句等价：

``` sql
SELECT id FROM sysobjects WHERE name=N'Students' and type=N'U'
```

 

2）常常用于创建表、视图时，做判定。保证脚本的重复执行

创建学生信息表时，需要判定该表是否存在，如果存在则删除



``` sql
IF OBJECT_ID (N'Students', N'U') IS NOT NULL
    DROP TABLE Students;
GO
--学生信息表
CREATE TABLE Students(
ID int primary key IDENTITY(1,1) not null,
Name nvarchar(50),
Age int,
Sex bit,
City nvarchar(50),
MajorID int
)
```


##  4、跨库执行

 
如果系统需要多个数据库，当执行跨库脚本，无需再次进行连接，可以执行如下脚本

 

实例：当前在master库，查询TestDB库的Students表信息：

 

``` sql
USE masterSELECT * FROM TestDB..Students
```

 

 

## 常用函数

### 1、LEN函数

计算字段值的长度

``` sql
SELECT LEN(Name) AS NameLength FROM Students
```

### 2、FORMAT函数

FORMAT 函数用于对字段的显示进行格式化。

语法：

``` sql
SELECT FORMAT(column_name,format) FROM table_name
```

1）时间格式化

```
SELECT FORMAT(GETDATE(),'yyyy-MM-dd') 
```

结果：2014-05-13

### 3、CAST函数

1、实例：将价格转为整型

``` sql
SELECT CAST(Price AS smallint) AS CPrice FROM Orders
```

结果：10

2、将字段解析为XML

``` sql
SELECT CAST(Scheme AS xml) AS CPrice FROM Orders
```

结果：

``` sql
<xml>  <ProductID>101</ProductID>  <ProductName>Card</ProductName></xml>
```

###  4、CONVERT

语法：

 CONVERT(data_type,expression[,style])

说明:
此样式一般在时间类型(datetime,smalldatetime)与字符串类型(nchar,nvarchar,char,varchar)
相互转换的时候才用到.

tyle数字在转换时间时的含义如下:

```  sql

------------------------------------------------------------------------------------------------------------
Style(2位表示年份)     | Style(4位表示年份)  |  输入输出格式                  
------------------------------------------------------------------------------------------------------------
0                | 100              |  mon dd yyyy hh:miAM(或PM)       
------------------------------------------------------------------------------------------------------------
1                | 101  美国        |  mm/dd/yy                    
------------------------------------------------------------------------------------------------------------
2                | 102  ANSI        |  yy-mm-dd                    
------------------------------------------------------------------------------------------------------------
3                | 103  英法        |  dd/mm/yy                    
------------------------------------------------------------------------------------------------------------
4                | 104  德国        |  dd.mm.yy                    
------------------------------------------------------------------------------------------------------------
5                | 105  意大利       |  dd-mm-yy                    
------------------------------------------------------------------------------------------------------------
6                | 106              |  dd mon yy                    
------------------------------------------------------------------------------------------------------------
7                | 107              |  mon dd,yy                    
------------------------------------------------------------------------------------------------------------
8                | 108              |  hh:mm:ss                     
------------------------------------------------------------------------------------------------------------
9                | 109              |  mon dd yyyy hh:mi:ss:mmmmAM(或PM)
------------------------------------------------------------------------------------------------------------
10               | 110  美国         |  mm-dd-yy                     
------------------------------------------------------------------------------------------------------------
11               | 111  日本         |  yy/mm/dd                    
------------------------------------------------------------------------------------------------------------
12               | 112  ISO         |  yymmdd                      
------------------------------------------------------------------------------------------------------------
13               | 113   欧洲默认值   |  dd mon yyyy hh:mi:ss:mmm(24小时制) 
------------------------------------------------------------------------------------------------------------
14               | 114              |  hh:mi:ss:mmm(24小时制)          
------------------------------------------------------------------------------------------------------------
20               | 120   ODBC 规范   |  yyyy-mm-dd hh:mi:ss(24小时制)     
------------------------------------------------------------------------------------------------------------
21               |  121              |  yyyy-mm-dd hh:mi:ss:mmm(24小时制) 
------------------------------------------------------------------------------------------------------------
```
1）实例：时间转换为指定形式

``` sql
SELECT CONVERT(NVARCHAR(20),GETDATE(),120) 
```

结果：2014-05-13 23:49:34

2）实例转为XML格式

``` sql
SELECT CONVERT(xml,Scheme) FROM Orders
```

结果：

``` sql
<xml>  <ProductID>101</ProductID>  <ProductName>Card</ProductName></xml>
```

  

## 全部脚本



``` sql
SELECT UCASE(Name) FROM Students
SELECT UCASE(LastName) as LastName,FirstName FROM Persons





SELECT GETDATE() --2014-05-13 23:15:36.130

SELECT FORMAT(GETDATE(),'yyyy-MM-dd')  --2014-05-13

IF OBJECT_ID('Orders','U') IS NOT NULL
DROP TABLE Orders
CREATE TABLE Orders
(
    ID bigint primary key not null,
    ProductID int,
    ProductName nvarchar(50),
    Price float,
    Scheme text,
    Created datetime default(getdate())
)

INSERT INTO Orders(ID,ProductID,ProductName,Price,Scheme) 
VALUES(201405130001,101,'Card',10.899,'<xml><ProductID>101</ProductID><ProductName>Card</ProductName></xml>')


SELECT LEN(ProductName) AS NameLength FROM Orders    --4

SELECT FORMAT(Created,'yyyy-MM-dd') AS FormatDate FROM Orders 

--2014-05-13

SELECT ROUND(Price,2) FROM Orders   --10.9

SELECT CAST(Price AS smallint) AS CPrice FROM Orders     
--10

SELECT CAST(Scheme AS xml) AS CPrice FROM Orders

--CONVERT
SELECT CONVERT(NVARCHAR(20),GETDATE(),120) --2014-05-13 23:49:34
SELECT CONVERT(xml,Scheme) FROM Orders
/* 结果：
<xml>
  <ProductID>101</ProductID>
  <ProductName>Card</ProductName>
</xml>
*/
```


 


## 参考文章
* https://www.cnblogs.com/yank/p/3722565.html