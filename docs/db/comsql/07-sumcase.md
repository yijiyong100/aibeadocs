---
title: 常用SQL-综合案例
---

::: tip
本文主要是介绍 常用SQL-综合案例 。
:::

[[toc]]

# SQL总结（七）查询实战

## 一、场景

给定一个场景，学生选课系统为例，大家很熟悉。

主要关系：

学生（学号、姓名、年龄、性别）

教师（教师ID，教师姓名）

课程（课程ID,课程名称,任教教师ID）

成绩（学生ID,课程ID，成绩）

## 二、创建表并预置数据

创建关系表：

``` sql
--学生:Student(SID,SName,SAge,SSex)
--学生表（学号、姓名、年龄、性别）
--性别,0表示男,1表示女
--
--IF EXISTS(SELECT OBJECT_ID('Student')) /*此处永远为true，原因是OBJECT_ID返回具体ID，或者NULL*/
--使用下列语句，如果没有，什么都不返回，也就不存在
IF EXISTS(SELECT id FROM sysobjects WHERE name='Student') 
   DROP Table Student

Create table Student
(
    SID nvarchar(20) primary key not null,
    SName nvarchar(20),
    SAge int,
    SSex bit
)


--教师：Teacher(TID,TName)
--教师表（教师ID，教师姓名）
IF EXISTS(SELECT id FROM sysobjects WHERE name='Teacher') 
Drop table Teacher 
GO

Create table Teacher
(
    TID nvarchar(20) primary key not null,
    TName nvarchar(20) not null,    
)

--课程：Course(CID,CName,TID)
--课程表（课程ID,课程名称,任教教师ID）
IF EXISTS(SELECT id FROM sysobjects WHERE name='Course') 
BEGIN 
   DROP Table Course
END
Create table Course
(
    CID  nvarchar(20)  primary key not null,
    CName nvarchar(50) not null,
    TID nvarchar(20)
)

IF EXISTS(SELECT id FROM sysobjects WHERE name='SC') 
DROP TABLE SC

--成绩：SC(SID,CID,Score)
--成绩表（学生ID,课程ID，成绩）
Create table SC
(
    SID nvarchar(20) not null,
    CID nvarchar(20) not null,
    Score int
)
alter table SC add constraint PK_SC primary key(SID,CID)
```



## 预置数据

这里仅仅是个例子，针对不同的题目，可以预置适当的数据进行检测。

``` sql
/*预置数据*/
DELETE FROM Student
INSERT INTO Student(SID,SName,SAge,SSex) VALUES('S001','Tom','20','0')
INSERT INTO Student(SID,SName,SAge,SSex) VALUES('S002','Lucy','21','1')
INSERT INTO Student(SID,SName,SAge,SSex) VALUES('S003','Jim','18','0')
INSERT INTO Student(SID,SName,SAge,SSex) VALUES('S004','Brush','20','0')
INSERT INTO Student(SID,SName,SAge,SSex) VALUES('S005','Kim','22','1')
INSERT INTO Student(SID,SName,SAge,SSex) VALUES('S006','Fka','20','0')
INSERT INTO Student(SID,SName,SAge,SSex) VALUES('S007','Cidy','17','1')
INSERT INTO Student(SID,SName,SAge,SSex) VALUES('S008','YouNi','19','0')
GO

DELETE FROM Teacher
INSERT INTO Teacher(TID,TName) VALUES('T001','张三')
INSERT INTO Teacher(TID,TName) VALUES('T002','李四')
INSERT INTO Teacher(TID,TName) VALUES('T003','王五')
GO

DELETE FROM Course
INSERT INTO Course(CID,CName,TID) VALUES('C01','英语','T001')
INSERT INTO Course(CID,CName,TID) VALUES('C02','体育','T002')
INSERT INTO Course(CID,CName,TID) VALUES('C03','数学','T003')
GO

DELETE FROM SC
INSERT INTO SC(SID,CID,Score) VALUES('S001','C01','78')
INSERT INTO SC(SID,CID,Score) VALUES('S001','C02','60')
INSERT INTO SC(SID,CID,Score) VALUES('S001','C03','97')
INSERT INTO SC(SID,CID,Score) VALUES('S002','C01','56')
INSERT INTO SC(SID,CID,Score) VALUES('S003','C01','55')
INSERT INTO SC(SID,CID,Score) VALUES('S004','C01','55')
GO
```



## 三、具体题目

以下题目，希望是一种练习题，是对具体SQL查询方法的具体应用。对于一些复杂查询，也进行分步求解，希望不只是明白了一道题的解法，培养一种解题思路。

以后遇到类似的问题就能轻易破解。

答案默认隐藏，意在希望读者在思考之后，再看参考答案。

当然参考答案也不一定完全正确，或许还有更优解，如果你发现了，请提出。

 

### 1、查询“C01”课程比“C02”课程成绩高的所有学生的学号

``` sql
--1) 最笨的方法
--分别得到C01成绩单和C02课程的成绩单,然后再得到C01课程比C02课程高的学生学号
SELECT SID,Score FROM SC WHERE CID='C01' 

SELECT SID,Score FROM SC WHERE CID='C02' 

SELECT A.SID FROM 
(SELECT SID,Score FROM SC WHERE CID='C01') AS A
INNER JOIN
(SELECT SID,Score FROM SC WHERE CID='C02') AS B
ON A.SID = B.SID WHERE A.Score>B.Score
```



### 2、查询平均成绩大于60分的同学的学号和平均成绩
``` sql
SELECT SID,AVG(Score) AS ScoreAverage FROM SC GROUP BY SID HAVING AVG(Score)>60 
```

### 3、查询所有同学的学号、姓名、选课数、总成绩

``` sql
--1)通过Group查询总成绩和选课数,然后再联表查询
SELECT SID,COUNT(CID) AS CourseCount,SUM(Score) as SumScore FROM SC GROUP BY SID

SELECT Student.SID,SName,CourseCount,SumScore FROM Student 
LEFT JOIN 
(SELECT SID,COUNT(CID) AS CourseCount,SUM(Score) as SumScore FROM SC GROUP BY SID) AS B 
ON Student.SID = B.SID

--2）联表查询后再GROUP By
SELECT Student.SID,Student.Sname,COUNT(SC.CID),SUM(Score)
FROM Student LEFT OUTER JOIN SC ON Student.SID=SC.SID
GROUP BY Student.SID,Sname
```



### 4、查询姓“李”的老师的个数，不能重复
``` sql
SELECT COUNT(DISTINCT(TID)) FROM Teacher WHERE TName LIKE '李%'
```

### 5、查询没学过“张三”老师课的同学的学号、姓名 
``` sql
--1)查询没有学过“张三”老师课的同学的学号,然后再查询得到学生姓名
SELECT SID FROM SC 
LEFT JOIN Course ON SC.CID = Course.CID 
LEFT JOIN Teacher ON Course.TID = Teacher.TID WHERE Tname ='张三'

SELECT SID,Sname FROM Student WHERE SID NOT IN (SELECT SID FROM SC 
LEFT JOIN Course ON SC.CID = Course.CID 
LEFT JOIN Teacher ON Course.TID = Teacher.TID WHERE Tname ='张三')

--2）先查询张三老师的所有课程,然后查询选择了张三老师课程的学生ID，最后查询未选其课程的学生信息
SELECT CID FROM Course INNER JOIN Teacher ON Course.TID = Teacher.TID WHERE Teacher.TName='张三'

SELECT SID FROM SC LEFT JOIN 
(SELECT CID FROM Course INNER JOIN Teacher ON Course.TID = Teacher.TID WHERE Teacher.TName='张三') AS TeacherCID 
ON SC.CID = TeacherCID.CID

SELECT SID,SName FROM Student WHERE SID NOT IN
(
SELECT SID FROM SC LEFT JOIN 
(SELECT CID FROM Course INNER JOIN Teacher ON Course.TID = Teacher.TID WHERE Teacher.TName='张三') AS TeacherCID 
ON SC.CID = TeacherCID.CID
)

--3)查询多表,获取张三老师的课程
SELECT Student.SID,Student.SName FROM Student 
WHERE SID NOT IN 
(SELECT DISTINCT(SC.SID) FROM SC,Course,Teacher WHERE  SC.CID=Course.CID and Teacher.TID=Course.TID and Teacher.Tname='张三')
```



### 6、查询两门以上不及格课程的同学的学号及其平均成绩
``` sql
--1)查询有课程不及格的学生ID
SELECT DISTINCT(SID) FROM SC WHERE Score<60
SELECT SID,AVG(Score) AS ScoreAverage FROM SC GROUP BY SID HAVING  COUNT(SID)>2  AND SID IN (SELECT DISTINCT(SID) FROM SC WHERE Score<60)


--2)查询有两门以上不及格的学号
SELECT SID FROM SC WHERE Score<60 GROUP BY SID HAVING COUNT(SID)>2

SELECT SID,AVG(ISNULL(Score,0)) FROM SC 
WHERE SID IN (SELECT SID FROM SC WHERE Score<60 GROUP BY SID HAVING COUNT(SID)>2)
GROUP BY SID
```



### 7、查询全部学生都选修的课程的课程号和课程名
``` sql
--查询各个课程的学生总数
SELECT CID,COUNT(DISTINCT(SID)) AS SCount FROM SC GROUP BY CID
--查询学生的总数
SELECT COUNT(DISTINCT(SID)) AS SCount FROM Student

--得到结果
SELECT CID,CName FROM Course 
WHERE CID IN (SELECT CID FROM SC GROUP BY CID 
HAVING COUNT(DISTINCT(SID))=(SELECT COUNT(DISTINCT(SID)) AS SCount FROM Student))
```



### 8、统计每门课程的学生选修人数（超过10人的课程才统计）

要求输出课程号和选修人数，查询结果按人数降序排列，查询结果按人数降序排列，若人数相同，按课程号升序排列 



``` sql
SELECT CID,COUNT(SID) FROM SC GROUP BY CID HAVING COUNT(SID)>10 ORDER BY COUNT(SID) DESC,CID
```

### 9、查询每门功成绩最好的前三名，要求输出课程ID、前三名学号以及成绩，并且按照课程号升序排列，同课程的成绩倒叙排列


``` sql
--1)取前三名
--查询一门课的前三名
SELECT TOP 3 CID,SID,Score FROM SC WHERE CID='C01' ORDER BY Score DESC

--查询每门课的前三名
SELECT CID,SID,Score FROM SC AS A 
WHERE SID IN (SELECT  TOP 3 SID FROM SC WHERE CID=A.CID ORDER BY Score DESC)
ORDER BY CID,Score DESC
```



如果成绩有并列现象
``` sql
--2)按分数取前三名,可以并列
--如果有并列分数就有问题了，可能前三名不止3人，应该按分数处理
SELECT CID,SID,Score FROM SC AS A
WHERE Score IN (SELECT TOP 3 Score FROM SC WHERE CID=A.CID ORDER BY Score DESC)
ORDER BY CID,Score DESC
```

加上排名
``` sql
--3)相比第二种方法更合理，再深入一下，查询结果加上排名
SELECT CID,SID,Score,Place=(SELECT COUNT(Score) FROM SC AS B WHERE B.CID=A.CID AND B.Score>A.Score)+1 FROM SC AS A
WHERE Score IN (SELECT TOP 3 Score FROM SC WHERE CID=A.CID ORDER BY Score DESC)
ORDER BY CID,Score DESC
```

### 10、查询选修“张三老师所授课程的学生中，成绩最高的学生姓名及其成绩

``` sql
--(1)根据教师姓名查询其所授课程ID   
SELECT CID FROM Course WHERE Course.TID IN (SELECT TID FROM Teacher WHERE Teacher.TName='张三')
--(2)查询一门课的最高成绩           
SELECT TOP 1 Score FROM SC WHERE CID='C01' ORDER BY Score DESC
--(3)查询所有课程中成绩最高的学生ID,成绩   
SELECT SID,CID,Score FROM SC AS A WHERE A.Score IN (SELECT TOP 1 Score FROM SC AS B WHERE A.CID=B.CID ORDER BY B.Score DESC)
--(4)查询张三教师所授课程的成绩最高的学生ID\成绩, 
SELECT SID,CID,Score FROM SC AS A WHERE A.CID IN(SELECT CID FROM Course WHERE Course.TID IN (SELECT TID FROM Teacher WHERE Teacher.TName='张三')) AND A.Score IN (SELECT TOP 1 Score FROM SC AS B WHERE A.CID=B.CID ORDER BY B.Score DESC)
--(5)查询学生姓名和成绩
SELECT A.SID,Student.SName,Score FROM SC AS A 
LEFT JOIN Student ON A.SID = Student.SID 
WHERE A.CID IN(SELECT CID FROM Course WHERE Course.TID IN (SELECT TID FROM Teacher WHERE Teacher.TName='张三')) 
AND A.Score IN (SELECT TOP 1 Score FROM SC AS B WHERE A.CID=B.CID ORDER BY B.Score DESC)
--(6)查询优化
```



### 11、查询每门课程的平均成绩，结果按平均成绩降序排列，平均成绩相同时，按课程号升序排列



``` sql
SELECT CID,AVG(Score) FROM SC GROUP BY CID ORDER BY AVG(Score) DESC,CID
```

### 12、查询学生总成绩以及名次

``` sql
--(1)查询学生总成绩
SELECT SID,SUM(Score) FROM SC GROUP BY SID

--(2)查询总排名
SELECT SID,TotalScore,
Place=(SELECT COUNT(DISTINCT(TotalScore)) FROM (SELECT SID,SUM(Score) AS TotalScore FROM SC GROUP BY SID) AS T1 WHERE T1.TotalScore> T2.TotalScore) +1 
FROM (SELECT SID,SUM(Score) AS TotalScore FROM SC GROUP BY SID) AS T2
ORDER BY Place,SID

```

如果有的学生未选课怎么办

``` sql
--2)需要查询所有学生的排名，有的学生没有选课，成绩为0

SELECT SID,TotalScore,
Place=(SELECT COUNT(DISTINCT(TotalScore)) FROM (SELECT SID,SUM(Score) AS TotalScore FROM SC GROUP BY SID) AS T1 WHERE T1.TotalScore> T3.TotalScore) +1 
FROM (SELECT Student.SID,Student.SName,ISNULL(TotalScore,0) AS TotalScore  FROM Student LEFT JOIN (SELECT SID,SUM(Score) AS TotalScore FROM SC GROUP BY SID) AS T2 ON Student.SID = T2.SID) AS T3
ORDER BY Place,SID
```

### 13、统计各科成绩,各分数段人数，结果包括：课程ID,课程名称,[100-85],[85-70],[70-60],[ <60]
``` sql
SELECT SC.CID AS 课程ID,CName AS 课程名称        ,SUM(CASE WHEN Score BETWEEN 85 AND 100 THEN 1 ELSE 0 END) AS [100 - 85]        ,SUM(CASE WHEN Score BETWEEN 70 AND 85 THEN 1 ELSE 0 END) AS [85 - 70]        ,SUM(CASE WHEN Score BETWEEN 60 AND 70 THEN 1 ELSE 0 END) AS [70 - 60]        ,SUM(CASE WHEN Score < 60 THEN 1 ELSE 0 END) AS [60 -]FROM SC,Coursewhere SC.CID=Course.CIDGROUP BY SC.CID,Cname
```



### 14、查询各科的及格率
``` sql
SELECT CID,
      SUM(CASE WHEN Score>=60 THEN 1 ELSE 0 END) AS Pass,
      SUM(CASE WHEN Score<60 THEN 1 ELSE 0 END) AS Fail 
FROM SC GROUP BY CID

--2)再查询及格率
SELECT CID,Pass/(Pass + Fail) FROM 
(
SELECT CID,
      SUM(CASE WHEN Score>=60 THEN 1 ELSE 0 END) AS Pass,
      SUM(CASE WHEN Score<60 THEN 1 ELSE 0 END) AS Fail 
FROM SC GROUP BY CID
) AS T1
```



### 15、求各科成绩的最高分和最低分
``` sql
SELECT CID,MAX(Score),MIN(Score) FROM SC GROUP BY CID
```

### 16、查询出生1990年之前的学生名单
``` sql
SELECT  DATEPART(YEAR,SAge),* FROM Student WHERE DATEPART(YEAR,GETDATE())-SAge < 1990
```

### 17、查询选课少于两门课程的学生名单
``` sql
--1)以下结果错误，还有没选课的学生
SELECT SID,SName FROM Student WHERE SID IN (
SELECT SID FROM SC GROUP BY SID HAVING COUNT(CID)<2)

--2)用其否定，NOT IN
SELECT SID,SName FROM Student  WHERE SID NOT IN (
SELECT SID FROM SC GROUP BY SID HAVING COUNT(CID)>=2)
```



### 18、查询英语成绩第三名的学生成绩单 
``` sql
--1)查询英语课程ID
SELECT CID FROM Course WHERE CName='英语'
--2)查询英语所有成绩
SELECT DISTINCT Score FROM SC WHERE CID = (SELECT CID FROM Course WHERE CName='英语')
--3)查询前三名成绩
SELECT DISTINCT TOP 3 Score FROM SC WHERE CID = (SELECT CID FROM Course WHERE CName='英语') ORDER BY Score ASC
--4)查询第三名成绩
SELECT TOP 1 Score FROM (SELECT DISTINCT TOP 3 Score FROM SC WHERE CID = (SELECT CID FROM Course WHERE CName='英语') ORDER BY Score ASC) AS TopThree

--5)查询学生ID
SELECT SID FROM SC WHERE CID = (SELECT CID FROM Course WHERE CName='英语') AND Score= (SELECT TOP 1 Score FROM (SELECT DISTINCT TOP 3 Score FROM SC WHERE CID = (SELECT CID FROM Course WHERE CName='英语') ORDER BY Score ASC) AS TopThree)

--6)查询学生成绩单
SELECT SID,CID,Score FROM SC WHERE SID IN (
SELECT SID FROM SC WHERE CID = (SELECT CID FROM Course WHERE CName='英语') AND Score= (SELECT TOP 1 Score FROM (SELECT DISTINCT TOP 3 Score FROM SC WHERE CID = (SELECT CID FROM Course WHERE CName='英语') ORDER BY Score ASC) AS TopThree)
)
```


## 参考文章
* https://www.cnblogs.com/yank/p/3673450.html