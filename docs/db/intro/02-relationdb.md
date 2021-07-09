---
title: 关系数据库
---

::: tip
本文主要是介绍 关系数据库 。
:::

[[toc]]

本节要点：

- 关系数据结构
  -  关系
  -  关系模式
  -  关系数据库
- 关系操作
- 关系的完整性约束

 

关系数据库系统是支持关系模型的数据库系统，关系数据库应用数学方法来处理数据库中的数据。按照数据模型的3个要素，关系模型由关系数据结构、关系操作集合和关系完整性约束3个部分组成。

## 1、关系数据结构

### 1.1、 关系

关系模型是建立在集合代数的基础上的，这里从集合论角度给出关系数据结构的形式化定义。

#### 1) 域（Domain）

域是一组具有相同数据类型的值的集合。例:整数、实数、介于某个取值范围的整数、指定长度的字符串集合、{‘男’，‘女’}、介于某个取值范围的日期等，都可以是域。

#### 2) 笛卡尔积（Cartesian Product）

给定一组域*D*1，*D*2，…，*Dn*，这些域中可以有相同的域。*D*1，*D*2，*…*，*Dn*的笛卡尔积为：

*D*1×*D*2×…×*Dn*＝｛（*d*1，*d*2，…，*dn*）｜*di*Î*Di*，*i*＝1，2，…，*n*｝

元素中每一个元素（*d*1，*d*2，…，*dn*）叫作一个*n*元组（n-tuple）或简称元组（tuple）。

笛卡尔积元素（*d*1，*d*2，…，*dn*）中的每一个值*di*叫作一个分量。

若*Di*（*i*＝1，2，…，*n*）为有限集，其基数（Cardinal number）为*mi*（*i*＝1，2，…，*n*），则*D*1×*D*2×…×*Dn*的基数*M*为：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/db/intro/relationdb-1.png')" alt="wxmp">

示例：给出三个域：

  *D*1=SUPERVISOR ={ 张清玫，刘逸 } 

  *D*2=SPECIALITY={计算机专业，信息专业}

  *D*3=POSTGRADUATE={李勇，刘晨，王敏}

则*D*1，*D*2，*D*3的笛卡尔积为：

*D*1×*D*2×*D*3 ＝{(张清玫,计算机专业,李勇)，(张清玫,计算机专业,刘晨)，(张清玫,计算机专业,王敏)，(张清玫，信息专业，李勇)，(张清玫，信息专业，刘晨)，(张清玫，信息专业，王敏)， (刘逸，计算机专业，李勇)，(刘逸，计算机专业，刘晨)，(刘逸，计算机专业，王敏)，(刘逸，信息专业，李勇)，(刘逸，信息专业，刘晨)，(刘逸，信息专业，王敏)｝

(张清玫,计算机专业,李勇)叫做一个元组；

张清玫叫做一个分量；

基数为2×2×3＝12，即*D*1×*D*2×*D*3共有2×2×3＝12个元组。基数可以理解为里面有多少个元素。

 

笛卡尔积可表示为一个二维表。表中的每行对应一个元组，表中的每列对应一个域。如*D*1×*D*2×*D*3的笛卡尔积：

| SUPERVISOR | SPECIALITY | POSTGRADUATE |
| ---------- | ---------- | ------------ |
| 张清玫     | 计算机专业 | 李勇         |
| 张清玫     | 计算机专业 | 刘晨         |
| 张清玫     | 计算机专业 | 王敏         |
| 张清玫     | 信息专业   | 李勇         |
| 张清玫     | 信息专业   | 刘晨         |
| 张清玫     | 信息专业   | 王敏         |
| 刘逸       | 计算机专业 | 李勇         |
| 刘逸       | 计算机专业 | 刘晨         |
| 刘逸       | 计算机专业 | 王敏         |
| 刘逸       | 信息专业   | 李勇         |
| 刘逸       | 信息专业   | 刘晨         |
| 刘逸       | 信息专业   | 王敏         |

 

#### 3) 关系（Relation）

*D*1×*D*2×…×*Dn*的子集叫作在域*D*1，*D*2，…，*Dn*上的关系，表示为*R*（*D*1，*D*2，…，*Dn*）

​     *R：*关系名

​     *n：*关系的目或度（Degree）

关系中的每个元素是关系中的元组，通常用*t*表示。

当*n*=1时，称该关系为单元关系（Unary relation）。

当*n*=2时，称该关系为二元关系（Binary relation）。

关系是笛卡尔积的有限子集，所以关系也是一个二维表，表的每行对应一个元组，表的每列对应一个域。关系中不同列可以对应相同的域，为了加以区分，必须对每列起一个名字，称为属性（Attribute）。*n*目关系必有*n*个属性。

若关系中的某一属性组的值能唯一地标识一个元组，则称该属性组为候选码（Candidate key）。

若一个关系由多个候选码，则选定其中一个为主码（Primary key）。

候选码的诸属性称为主属性（Prime attribute）。不包含在任何候选码中的属性称为非主属性（Non-prime attribute）或非码属性（Non-key attribute）。

在最简单的情况下，候选码只包含一个属性。在最极端的情况下，关系模式的所有属性组是这个关系模式的候选码，称为全码（All-key）。

一般来说*D*1×*D*2×…×*Dn*的笛卡尔积是没有实际语义的，只有她的某个子集才有实际含义。

基本关系应具有以下6条性质：

- 列是同质的
- 每个列对应一个属性名，属性名不重复，多个列可对应一个域
- 列的顺序无所谓
- 任意两个元组的候选码不能相同
- 行的顺序无所谓
- 分量必须是原子值（不能再有分量）

### 1.2、关系模式

在数据库中药区分型和值。关系数据库中，关系模式是型，关系是值。关系模式是对关系的描述。

关系的描述称为关系模式（Relation Schema）关系模式可以形式化地表示为：

​       *R*（*U*，*D*，dom，*F*）

​          *R*   关系名

​          *U*   组成该关系的属性名集合

​          *D*   属性组*U*中属性所来自的域

​          dom  属性向域的映象集合

​          *F*   属性间的数据依赖关系集合

关系模式通常可以简记为*R* (*U*)或 *R* (*A*1，*A*2，…，*An*)

 *R*  关系名

 *A*1，*A*2，…，*An*   属性名

 如：学生（学号，姓名，性别，年龄，班级）

 

### 1.3、关系数据库

在关系模型中，实体以及实体间的联系都是用关系来表示的。在一个给定的应用领域中，所有实体及实体之间联系的关系的集合构成一个关系数据库。

关系数据库也有型和值之分。关系数据库的型也称为关系数据库模式，是对关系数据库的描述。关系数据库的值是这些关系模式在某一时刻对应的关系的集合。

 

## 2、关系操作

关系模式由关系数据结构、关系操作集合和关系完整性约束三部分组成。下面关系操作的一些基本操作和分类。

关系模型给出了关系操作的能力的说明，但不对RDBMS语言给出具体的语法要求，也就是说不同的RDBMS可以定义和开发不同的语言来实现这些操作。

### 2.1、基本的关系操作

关系模型中常用的关系操作包括查询（Query）操作和插入（insert）、删除（Delete）、修改（Update）操作两大部分。

关系的查询表达能力很强，是关系操作中最主要的部分。查询操作又可以分为：选择（Select）、投影（Project）、连接（Join）、除（Divide）、并（Union）、差（Except）、交（Intersection）、笛卡尔积等。

关系操作的特点是集合操作方式，即操作的对象和结果都是集合。

### 2.2、关系的语言分类

- l 关系代数语言 例如ISBL
- l 关系演算语言
  -  元组关系演算语言 例如APLHA，QUEL
  -  域关系演算语言 例如QBE
- l 具有关系代数和关系演算双重特点的语言 例如SQL

关系代数是用对关系的运算来表达查询要求的。关系演算是用谓词来表达查询要求的。关系演算又可按谓词变元的基本对象是元组变量还是域变量分为元组关系演算和域关系演算。SQL是介于关系代数和关系演算之间的结构化语言，SQL不仅具有丰富的查询功能，而且具有数据定义和数据控制功能，是集查询、DDL、DML和DCL于一体的关系数据语言，它充分体现了关系数据语言的特点和优点，是关系数据库的标准语言。

## 3、关系完整性约束

关系模型的完整性规则是对关系的某种约束条件，这些约束条件实际上是现实世界的要求，用来满足数据的正确性、有效性和相容性。关系模型中有三类完整性约束：实体完整性、参照完整性和用户定义的完整性。

### 3.1、实体完整性（Entity Integrity）

若属性*A*是基本关系*R*的主码中的属性，则属性*A*不能取空值。空值就是“不知道”或“不存在”的值。空值一般用null表示，不同于0或空串

关系模型必须遵守实体完整性规则的原因：一个基本表通常对应现实世界的一个实体集。现实世界中的实体和实体间的联系都是可区分的，即它们具有某种唯一性标识。相应地，关系模型中以主码作为唯一性标识。主码中的属性即主属性不能取空值。

### 3.2、参照完整性

在关系模型中实体及实体间的联系都是用关系来描述的，因此可能存在着关系与关系间的引用。

例1 学生实体、专业实体以及专业与学生间的一对多联系

​    学生（学号，姓名，性别，专业号，年龄）

　  专业（专业号，专业名）

这两个关系之间存在着属性的引用，即学生关系引用了专业关系的主码“专业号”。显然，学生关系中的“专业号”值必须是确实存在的专业的专业号，即专业关系中有该专业的记录。也就是说，学生关系中的某个属性的取值需要参照专业关系的属性取值。

 

例2 学生、课程、学生与课程之间的多对多联系

   学生（学号，姓名，性别，年龄，系）

   课程（课程号，课程名，学分，先行课）

   选修（学号，课程号，成绩）

这3个关系之间也存在着属性的引用，即选修关系引用了学生关系的主码“学号”和课程关系的主码“课程号”。

不仅两个或两个以上的关系间可以存在引用关系，同一关系内部属性间也可能存在引用关系。

 

例3 在学生（学号，姓名，性别，专业号，年龄，班长）关系中，“学号”属性是主码，“班长”属性表示该学生所在班级的班长的学号，它引用了本关系“学号”属性，即“班长”必须是确实存在的学生的学号。

 

这三个例子说明关系与关系之间存在着相互引用，相互约束的情况。

引用分析：

- 引用发生在两个表之间或一个表内部
- 分别称为被引用表和引用表
- 被引用列和引用列是同质的（一般同名）
- 被引用列是主码
- 引用列称为外码

​    

设*F*是关系*R*的一个或一组属性，但不是关系*R*的码。如果F与关系*S*的主码Ks相对应，则称F是关系*R*的外码，关系*R称*为参照关系（Referencing Relation）关系，*S称*为被参照关系（Referenced Relation）或目标关系（Target Relation）。

- 关系*R*和*S*不一定是不同的关系
- 目标关系*S*的主码Ks 和参照关系的外码F必须定义在同一个（或一组）域上
- 外码并不一定要与相应的主码同名，当外码与相应的主码属于不同关系时，往往取相同的名字，以便于识别

若属性（或属性组）*F*是关系*R*的外码它与关系*S*的主码Ks相对应（关系*R*和*S可是一个*关系），则对于*R*中每个元组在*F*上的值必须为：

- · 或者取空值（*F*的每个属性值均为空值）
- · 或者等于*S*中某个元组的主码值。

例1：学生关系中每个元组的“专业号”属性只取下面两类值：

（1）空值，表示尚未给该学生分配专业

（2）非空值，这时该值必须是专业关系中某个元组的“专业号”值，表示该学生不可能分配到一个不存在的专业中

例2 ：选修（学号，课程号，成绩）

“学号”和“课程号”是选修关系中的主属性，按照实体完整性和参照完整性规则，它们

只能取相应被参照关系中已经存在的主码值

例3 ：学生（学号，姓名，性别，专业号，年龄，班长）

“班长”属性值可以取两类值：

（1）空值，表示该学生所在班级尚未选出班长，或该学生本人即是班长；

（2）非空值，这时该值必须是本关系中某个元组的学号值

 

### 3.3、用户定义的完整性

用户定义的完整性是针对某一具体关系数据库的约束条件，反映某一具体应用所涉及的数据必须满足的语义要求。

例:课程(课程号，课程名，学分)

- “课程名”属性必须取唯一值
- 非主属性“课程名”也不能取空值
- “学分”属性只能取值{1，2，3，4}

关系模型应提供定义和检验这类完整性的机制，以便用统一的系统的方法处理它们，而不要由应用程序承担这一功能。

 

## 参考文章
* https://www.cnblogs.com/zhouyeqin/p/7296240.html