---
title: Pig-基础知识总结
---

::: tip
本文主要是介绍 Pig-基础知识总结 。
:::

[[toc]]

## Pig-基础知识总结

Pig查询语言是基于Pig Latin,程序由一系列语句构成，操作和命令不区分大小写，别名和函数名区分大小写。下面，将介绍Pig Latin的常用语法。

## 1. 常用操作

- 加载与存储

| LOAD  | 导入外部文件中的数据，存入关系 |
| ----- | ------------------------------ |
| STORE | 将一个关系存储到文件系统中     |
| DUMP  | 将关系打印到控制台             |

- 过滤

| FILTER                   | 按条件筛选关系中的行                                          |
| ------------------------ | ------------------------------------------------------------- |
| DISTINCT                 | 去除关系中的重复行                                            |
| *FOREACH**...**GENERATE* | 对于集合的每个元素，生成或删除字段                            |
| STREAM                   | 使用外部程序对关系进行变换(例如，将Python程序嵌入到Pig中使用) |
| SAMPLE                   | 从关系中随机取样                                              |

- 分组与连接

| JOIN    | 连接两个或多个关系               |
| ------- | -------------------------------- |
| COGROUP | 在两个或多个关系中分组           |
| GROUP   | 在一个关系中对数据分组           |
| CROSS   | 获取两个或更多关系的乘积（叉乘） |

- 排序

| ORDER | 根据一个或多个字段对某个关系进行排序 |
| ----- | ------------------------------------ |
| LIMIT | 限制关系的元组个数                   |

- 合并与分割

| UNION | 合并两个或多个关系             |
| ----- | ------------------------------ |
| SPLIT | 把某个关系切分成两个或多个关系 |

- 诊断操作

| DESCRIBE   | 打印关系的模式                             |
| ---------- | ------------------------------------------ |
| EXPLAIN    | 打印逻辑和物理计划                         |
| ILLUSTRATE | 使用生成的输入子集显示逻辑计划的试运行结果 |

- *UDF**操作*

| REGISTER | 在*Pig*运行时环境中注册一个*JAR*文件 |
| -------- | ------------------------------------ |
| DEFINE   | 为*UDF*、流式脚本或命令规范新建别名  |

- *Pig Latin*命令操作

| kill | 中止某个*MapReduce*任务                               |
| ---- | ----------------------------------------------------- |
| exec | 在一个新的*Grunt shell*程序中以批处理模式运行一个脚本 |
| run  | 在当前*Grunt*外壳程序中运行程序                       |
| quit | 退出解释器                                            |
| set  | 设置*Pig*选项                                         |

- *Pig Latin*表达式

| 类型         | 表达式            | 描述                           | 示例                |
| ------------ | ----------------- | ------------------------------ | ------------------- |
| 字段         | $n                | 第*n*个字段                    | $0                  |
| 字段         | d                 | 字段名d                        | year                |
| 投影         | c.$n, c.f         | *c.f* 在关系、包或元组中的字段 | user.$0, user.year  |
| *Map*查找    | m#k               | 在映射*m*中键*k*对应的值       | *items**'**Coat**'* |
| 类型转换     | (t)f              | 将字段*t*转换成*f*类型         | (int)age            |
| 函数型平面化 | *fn(f1, f2,* …*)* | 在字段上应用函数               | fn isGood(quality)  |
| 函数型平面化 | FLATTEN(f)        | 从包和元组中去除嵌套           | flatten(group)      |



## 2. Pig Latin数据类型

数据类型：

- **int** (32位有符号整数)
- **long**(64位有符号整数)
- **float**(32位浮点数) 
- **double**(64位浮点数)
- **chararray**(UTF16格式的字符数组)
- **bytearray**(字节数组)
- **tuple(元组) : tuple: (1, **world**)        //任何类型的字段序列
- **bag(包) :bag: {(1, **world**), (2)}    //元组的无序多重集合（允许重复元组）
- **map(键值对)** : map: ['a' 'world']          //一组键值对，键必须是字符数组

## 3. 常用函数

计算函数：   

- AVG ： 所有值平均值
- COUNT ： 获取包中的元素数量
- CONCAT：将两列合并为一列
- COUNT_STAR：获取包中的元素数量。在计数元素时，COUNT_STAR() 函数包含NULL值
- DIFF：比较元组中的两个包
- MAX：计算单列包中的列（数值或字符）的最大值
- MIN：计算单列包中的列（数值或字符）的最小值
- SIZE：基于任何Pig数据类型计算元素的数量
- SUM：获取单列包中列的总数值
- TOKENIZE：用于在单个元组中分割字符串（其中包含一组字），并返回包含拆分操作输出的包

过滤函数：

- IsEmpty：检查包或映射是否为空

加载*/*存储函数：

- PigStorage：将数据加载并存储为结构化文本文件
- BinStorage：使用机器可读格式将数据加载并存储到Pig中
- TextLoader：用于以UTF-8格式加载非结构化数据

## 【----------------------------】

所有命令和脚本都在Pig 0.12.0 & Hadoop 2.2.0下测试通过。

## 准备两个数据文件：

1）student.txt 结构为（班级号，学号，成绩）,字段间逗号分隔。

C01,N0101,82

C01,N0102,59

C01,N0103,65

C02,N0201,81

C02,N0202,82

C02,N0203,79

C03,N0301,56

C03,N0302,92

C03,N0306,72

2）teacher.txt 结构为（班级号，教师）,字段间逗号分隔。

C01,Zhang

C02,Sun

C03,Wang

C04,Dong

 

## 加载和存储（Load，Store）

执行以下命令

*records = load'hdfs://localhost:9000/input/student.txt' using PigStorage(',') as(classNo:chararray, studNo:chararray, score:int);*

*dump records;*

*store records into ' hdfs://localhost:9000/input/student_out' using PigStorage(':');*

然后查看hdfs://localhost:9000/input/student_out目录下的part-m-00000文件，其内容如下：

C01:N0101:82

C01:N0102:59

C01:N0103:65

C02:N0201:81

C02:N0202:82

C02:N0203:79

C03:N0301:56

C03:N0302:92

C03:N0306:72

其中的load是加载操作，store是存储操作。他们分别可以指定其分隔符，比如上例中的逗号和分号。

## 筛选（Filter）

执行以下命令：

*records_c01 = filter records byclassNo=='C01';*

*dump records_c01;*

结果如下：

(C01,N0101,82)

(C01,N0102,59)

(C01,N0103,65)

注意：判断是否相等要用两个等号。

## Foreach Generate

Foreach对关系中的每一个记录循环，然后按指定模式生成一个新的关系。

执行以下命令：

*score_c01 = foreach records_c01generate 'Teacher',$1,score;*

*dump score_c01;*

结果如下：

(Teacher,N0101,82)

(Teacher,N0102,59)

(Teacher,N0103,65)

生成的新的关系中包括三个字段，第一个字段是常量，第二个字段是学号（我们是通过索引号引用的），第三个字段是分数（我们通过字段名引用的）。

## 分组（group）

执行以下命令：

*grouped_records = group recordsby classNo parallel 2;*

*dump grouped_records;*

结果如下：

(C02,{(C02,N0203,79),(C02,N0202,82),(C02,N0201,81)})

(C01,{(C01,N0103,65),(C01,N0102,59),(C01,N0101,82)})

(C03,{(C03,N0306,72),(C03,N0302,92),(C03,N0301,56)})

其中的Paraller 2表示启用2个Reduce操作。

如何统计每个班级及格和优秀的学生人数呢？执行以下两个命令：

``` shell

*result = foreach grouped_records {*

​     *fail =filter records by score < 60;*

​     *excellent =filter records by score >=90;*

​     *generategroup, COUNT(fail) as fail, COUNT(excellent) as excellent;*

*};*
```

*dump result;*

结果如下：

(C01,1,0)

(C02,0,0)

(C03,1,1)

 

题外话：

flatten操作，可以将数据格式扁平化。我们分别通过tuple和bag来看看flatten的作用：

1） Flatten对tuple的作用

执行以下命令:

*a= foreach records generate $0,($1,$2);*

*dumpa;*

输出结果如下：

(C01,(N0101,82))

(C01,(N0102,59))

(C01,(N0103,65))

(C02,(N0201,81))

(C02,(N0202,82))

(C02,(N0203,79))

(C03,(N0301,56))

(C03,(N0302,92))

(C03,(N0306,72))

然后，执行:

*b = foreach a generate $0,flatten($1);*

*dump b;*

结果如下：

(C01,N0101,82)

(C01,N0102,59)

(C01,N0103,65)

(C02,N0201,81)

(C02,N0202,82)

(C02,N0203,79)

(C03,N0301,56)

(C03,N0302,92)

(C03,N0306,72)

由此看见，flatten作用于tuple时，将flatten对应的字段（tuple）中的字段扁平化为关系中的字段。（不知道该如何解释比较好）

2） Flatten对bag的作用

执行以下命令

*c = foreach records generate $0,{($1),($1,$2)};*

*dump c;*

结果如下：

(C01,{(N0101),(N0101,82)})

(C01,{(N0102),(N0102,59)})

(C01,{(N0103),(N0103,65)})

(C02,{(N0201),(N0201,81)})

(C02,{(N0202),(N0202,82)})

(C02,{(N0203),(N0203,79)})

(C03,{(N0301),(N0301,56)})

(C03,{(N0302),(N0302,92)})

(C03,{(N0306),(N0306,72)})

接下来执行：

*d = foreach c generate $0,flatten($1);*

*dump d;*

结果如下：

(C01,N0101)

(C01,N0101,82)

(C01,N0102)

(C01,N0102,59)

(C01,N0103)

(C01,N0103,65)

(C02,N0201)

(C02,N0201,81)

(C02,N0202)

(C02,N0202,82)

(C02,N0203)

(C02,N0203,79)

(C03,N0301)

(C03,N0301,56)

(C03,N0302)

(C03,N0302,92)

(C03,N0306)

(C03,N0306,72)

可以看出，flatten作用于bag时，会消除嵌套关系，生成类似于笛卡尔乘积的结果。（不好表达，读者可以细细体会）。

## Stream操作

可以将Python程序嵌入到Pig中使用。

建立一个Python文件pass.py，内容如下：


``` python

\#! /usr/bin/envpython

import sys

 

for line insys.stdin:

​     (c,n,s) = line.split() 

​     if int(s) >= 60:

​          print "%s\t%s\t%s"%(c,n,s)

``` 

执行以下命令:

*define pass `pass.py` SHIP('/home/user/pass.py');*

*records_pass = stream records through pass as(classNo:chararray, studNo:chararray, score:int);*

*dump records_pass;*

结果如下：

(C01,N0101,82)

(C01,N0103,65)

(C02,N0201,81)

(C02,N0202,82)

(C02,N0203,79)

(C03,N0302,92)

(C03,N0306,72)

``` shell

可以看出，统计结果为所有及格的记录（>=60）。

其中，ship用于将python程序提交到Hadoop集群中去。

请注意第一个命令中的*`pass.py`*，不是用单引号括起来的，是用键盘1左边的那个键上的字符括起来的。（不知道这个字符怎么称呼，只知道是一种标注符号）

```

## Join

先执行以下两条命令：

*r_student = load'hdfs://localhost:9000/input/student.txt' using PigStorage(',') as (classNo:chararray, studNo: chararray, score: int);*

*r_teacher2 = load'hdfs://localhost:9000/input/teacher.txt' using PigStorage(',') as (classNo:chararray, teacher: chararray);*

回到本文开头，我们有两个数据文件，分别为学生（班级，学号，成绩）；老师（班级，姓名）。

执行以下命令：

*r_joined = join r_student by classNo,r_teacher by classNo;*

*dump r_joined;*

(C01,N0103,65,C01,Zhang)

(C01,N0102,59,C01,Zhang)

(C01,N0101,82,C01,Zhang)

(C02,N0203,79,C02,Sun)

(C02,N0202,82,C02,Sun)

(C02,N0201,81,C02,Sun)

(C03,N0306,72,C03,Wang)

(C03,N0302,92,C03,Wang)

(C03,N0301,56,C03,Wang)

类似于SQL中的内连接Inner Join。当然你也可以使用外连接，比如：

*r_joined = join r_student by classNo left outer,r_teacher by classNo;*

*dump r_joined;*

注意：left outer/right outer要写在第一个关系名的后面。以下语法是错误的：

*r_joined = join r_student by classNo, r_teacher by classNo leftouter; //错误*

 

## COGROUP

Join的操作结果是平面的（一组元组），而COGROUP的结果是有嵌套结构的。

运行以下命令：

*r1 = cogroup r_student by classNo,r_teacher by classNo;*

*dump r1;*

结果如下：

(C01,{(C01,N0103,65),(C01,N0102,59),(C01,N0101,82)},{(C01,Zhang)})

(C02,{(C02,N0203,79),(C02,N0202,82),(C02,N0201,81)},{(C02,Sun)})

(C03,{(C03,N0306,72),(C03,N0302,92),(C03,N0301,56)},{(C03,Wang)})

(C04,{},{(C04,Dong)})

由结果可以看出：

1） cogroup和join操作类似。

2） 生成的关系有3个字段。第一个字段为连接字段；第二个字段是一个包，值为关系1中的满足匹配关系的所有元组；第三个字段也是一个包，值为关系2中的满足匹配关系的所有元组。

3） 类似于Join的外连接。比如结果中的第四个记录，第二个字段值为空包，因为关系1中没有满足条件的记录。实际上第一条语句和以下语句等同：

*r1= cogroup r_student by classNo outer,r_teacher by classNo outer;*

 

如果你希望关系1或2中没有匹配记录时不在结果中出现，则可以分别在关系中使用inner而关键字进行排除。

执行以下语句：

*r1 = cogroup r_student by classNo inner,r_teacher byclassNo outer;*

*dump r1;*

结果为：

(C01,{(C01,N0103,65),(C01,N0102,59),(C01,N0101,82)},{(C01,Zhang)})

(C02,{(C02,N0203,79),(C02,N0202,82),(C02,N0201,81)},{(C02,Sun)})

(C03,{(C03,N0306,72),(C03,N0302,92),(C03,N0301,56)},{(C03,Wang)})

 

如先前我们讲到的flatten，执行以下命令：

`r2 = foreach r1 generate flatten($1),flatten($2);`

`dump r2;`

结果如下：

(C01,N0103,65,C01,Zhang)

(C01,N0102,59,C01,Zhang)

(C01,N0101,82,C01,Zhang)

(C02,N0203,79,C02,Sun)

(C02,N0202,82,C02,Sun)

(C02,N0201,81,C02,Sun)

(C03,N0306,72,C03,Wang)

(C03,N0302,92,C03,Wang)

(C03,N0301,56,C03,Wang)

 

## Cross

执行以下命令：

*r = cross r_student,r_teacher;*

*dump r;*

结果如下：

(C03,N0306,72,C04,Dong)

(C03,N0306,72,C03,Wang)

(C03,N0306,72,C02,Sun)

(C03,N0306,72,C01,Zhang)

(C03,N0302,92,C04,Dong)

(C03,N0302,92,C03,Wang)

(C03,N0302,92,C02,Sun)

(C03,N0302,92,C01,Zhang)

(C03,N0301,56,C04,Dong)

(C03,N0301,56,C03,Wang)

(C03,N0301,56,C02,Sun)

(C03,N0301,56,C01,Zhang)

(C02,N0203,79,C04,Dong)

(C02,N0203,79,C03,Wang)

(C02,N0203,79,C02,Sun)

(C02,N0203,79,C01,Zhang)

(C02,N0202,82,C04,Dong)

(C02,N0202,82,C03,Wang)

(C02,N0202,82,C02,Sun)

(C02,N0202,82,C01,Zhang)

(C02,N0201,81,C04,Dong)

(C02,N0201,81,C03,Wang)

(C02,N0201,81,C02,Sun)

(C02,N0201,81,C01,Zhang)

(C01,N0103,65,C04,Dong)

(C01,N0103,65,C03,Wang)

(C01,N0103,65,C02,Sun)

(C01,N0103,65,C01,Zhang)

(C01,N0102,59,C04,Dong)

(C01,N0102,59,C03,Wang)

(C01,N0102,59,C02,Sun)

(C01,N0102,59,C01,Zhang)

(C01,N0101,82,C04,Dong)

(C01,N0101,82,C03,Wang)

(C01,N0101,82,C02,Sun)

(C01,N0101,82,C01,Zhang)

由此可以看出，cross类似于笛卡尔乘积。一般情况下不建议直接使用cross，而应该事前对数据集进行筛选，提高效率。

## 排序（Order）

执行以下命令：

*r = order r_student by score desc, classNo asc;*

*dump r;*

结果如下：

(C03,N0302,92)

(C01,N0101,82)

(C02,N0202,82)

(C02,N0201,81)

(C02,N0203,79)

(C03,N0306,72)

(C01,N0103,65)

(C01,N0102,59)

(C03,N0301,56)

## 联合（Union）

执行以下语句：

*r_union = union r_student, r_teacher;*

*dump r_union;*

结果如下：

(C01,N0101,82)

(C01,N0102,59)

(C01,N0103,65)

(C02,N0201,81)

(C02,N0202,82)

(C02,N0203,79)

(C03,N0301,56)

(C03,N0302,92)

(C03,N0306,72)

(C01,Zhang)

(C02,Sun)

(C03,Wang)

(C04,Dong)

可以看出：

1） union是取两个记录集的并集。

2） 关系r_union的schema为未知（unknown），这是因为被union的两个关系的schema是不一样的。如果两个关系的schema是一致的，则union后的关系将和被union的关系的schema一致。


## 参考文章
* https://blog.csdn.net/yz930618/article/details/80701617
* https://blog.csdn.net/zythy/article/details/18426347