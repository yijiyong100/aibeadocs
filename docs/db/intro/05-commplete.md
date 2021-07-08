---
title: 数据库完整性
---

::: tip
本文主要是介绍 数据库完整性 。
:::

[[toc]]

　　

本节要点：

- 实体完整性
- 参照完整性
- 用户定义的完整性
- 完整性约束命名子句
- 触发器

 

数据库的完整性是指数据的正确性和相容性。

例如，学生的学号必须唯一；性别只能是男或女；本科学生年龄的取值范围为14~50的整数；学生选的课程必须是学校开设的课程；学生所在的院系必须是学校已经成立的院系等。

数据的完整性和安全性是两个不同概念。

为维护数据库的完整性，DBMS必须：

-  提供定义完整性约束条件的机制
-  提供完整性检查的方法
-  违约处理

## 1、实体完整性

### 1.1、实体完整性定义

关系模型的实体完整性在CREATE TABLE中用PRIMARY KEY定义。对单属性构成的码有两种说明方法，一种是定义为列级约束条件，另一种是定义为表级约束条件。对多个属性构成的码只有一种说明方法，即定义为表级约束条件。

示例：将Student表中的Sno属性定义为主键（单属性构成的主键）

 (1)在列级定义主键

​     CREATE TABLE Student

​      (Sno CHAR(9) PRIMARY KEY，

​      Sname CHAR(20) NOT NULL，  

​      Ssex CHAR(2) ，

​      Sage SMALLINT，

​      Sdept CHAR(20));

(2)在表级定义主键

  CREATE TABLE Student

​    (Sno CHAR(9)， 

​     Sname CHAR(20) NOT NULL，

​     Ssex CHAR(2) ，

​     Sage SMALLINT，

​     Sdept CHAR(20)，

​     PRIMARY KEY (Sno));

示例：将SC表中的Sno，Cno属性组定义为主键（多属性构成的主键）

   CREATE TABLE SC

​      (Sno  CHAR(9) ，

​      Cno CHAR(4) ， 

​      Grade  SMALLINT，

​      PRIMARY KEY (Sno，Cno)   /*只能在表级定义主键*/

​     );

### 1.2、实体完整性检查和违约处理

插入或对主键列进行更新操作时，RDBMS自动进行检查：

\1. 检查主键值是否唯一，如果不唯一则拒绝插入或修改

\2. 检查主键的各个属性是否为空，只要有一个为空就拒绝插入或修改

## 2、参照完整性

### 2.1、参照完整性定义

关系模型的参照完整性在CREATE TABLE中用FOREIGN KEY短语定义哪些列为外码，用REFERENCES短语指明这些外码参照哪些表的主键 。

例如，关系SC中一个元祖表示一个学生选修的某门课程的成绩，（Sno，Cno）是主键。Sno，Cno分别参照Student表的主键和Course表的主键。

示例：定义SC中的参照完整性

   CREATE TABLE SC

​     (Sno    CHAR(9),

​     Cno    CHAR(4),

​     Grade   INT,

​     PRIMARY KEY (Sno， Cno), /*在表级定义实体完整性*/

​     FOREIGN KEY (Sno) REFERENCES Student (Sno) , 

​     FOREIGN KEY (Cno) REFERENCES Course(Cno) /*表级定义参照完整性*/

   );

### 2.2、参照完整性检查和违约处理

一个参照完整性将两个表中的相应元组联系起来了。因此，对被参照表和参照表进行增删改操作时有可能破坏参照完整性，必须进行检查。

例如，对表SC和Student有四种可能破坏参照完整性的情况，如下表：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/db/intro/dbscomplete-1.png')" alt="wxmp">

1)     SC表中增加一个元组，该元组的Sno属性的值在表Student中找不到一个元组，其Sno属性的值与之相等。

2)     修改SC表中的一个元组，修改后该元组的Sno属性的值在表Student中到不到一个元组，其Sno属性的值与之相等。

3)     从Student表中删除一个元组，造成SC表中某些元组的Sno属性的值在Student中找不到一个元组，其Sno属性的值与之相等。

4)     修改Student表中的一个元组的Sno属性，造成SC表中某些元组的Sno属性的值在Student中找不到一个元组，其Sno属性的值与之相等。

当上述的不一致发生时，系统可以采用以下的策略加以处理：

1)     拒绝(NO ACTION)执行

默认策略

2)     级联(CASCADE)操作

当删除或修改被参照表（Student）的一个元组造成了与参照表（SC）的不一致，则删除或修改参照表中的所有造成不一致的元组。

例如，删除Student表中的元组，Sno值为200215121，则要从SC表中级联删除SC.Sno=’ 200215121’的所有元组。

3)     设置为空值（SET NULL）

当删除或修改被参照表的一个元组时造成了不一致，则将参照表中的所有造成不一致的元组的对应属性设置为空值。例如，有下面2个关系：

学生（学号，姓名，性别，专业号，年龄）

专业（专业号，专业名）

学生关系的“专业号”是外码，因为专业号是专业关系的主键。

假设专业表中某个元组被删除，专业号为12，按照设置为空值的策略，就要把学生表中专业号=12的所有元组的专业号设置为空值。这就对应了这样的语义：某个专业删除了，该专业所有学生专业未定，等待重新分配专业。

但是并不是所有情况都适用于这种策略。比如，删除Student表中的元组，Sno值为200215121，则要从SC表中把SC.Sno=’ 200215121’的所有元组中Sno的值置空，这样一来SC表中就剩下单独的一个Cno，表示某个不知名的学生选了一门或多门课，这不符合现实应用逻辑。

示例：显式说明参照完整性的违约处理示例

  CREATE TABLE SC

​    (Sno  CHAR(9) NOT NULL，

​     Cno  CHAR(4) NOT NULL，

​     Grade INT，

​     PRIMARY KEY（Sno，Cno），                 

​     FOREIGN KEY (Sno) REFERENCES Student(Sno)

​             ON DELETE CASCADE   /*级联删除SC表中相应的元组*/

​     ON UPDATE CASCADE， /*级联更新SC表中相应的元组*/

​     FOREIGN KEY (Cno) REFERENCES Course(Cno)             

​     )；

## 3、用户定义的完整性

用户定义的完整性就是针对某一具体应用的数据必须满足的语义要求。

### 3.1、属性上的约束条件的定义

在CREATE TABLE中定义属性的同时可以根据应用要求，定义属性上的约束条件，即属性值限制，包括：

- 列值非空（NOT NULL）
- 列值唯一（UNIQUE）
- 检查列值是否满足一个布尔表达式（CHECK）

### 3.1.1、不允许取空值

示例： 在定义SC表时，说明Sno、Cno、Grade属性不允许取空值。

  CREATE TABLE SC

   （Sno CHAR(9) ， 

​     Cno CHAR(4) ，   

​     Grade SMALLINT NOT NULL，    

​     PRIMARY KEY (Sno， Cno)， 

​     /* 表级定义实体完整性已隐含了Sno，Cno不允许取空值* /

​    ）；

### 3.1.2、列值唯一

示例：建立部门表DEPT，要求部门名称Dname列取值唯一，部门编号Deptno列为主键

  CREATE TABLE DEPT

​    (Deptno NUMERIC(2)，

​     Dname CHAR(9) UNIQUE，/*要求Dname列值唯一*/

​     Location CHAR(10)，

​     PRIMARY KEY (Deptno)

​    )；

### 3.1.3、 用CHECK短语指定列值应该满足的条件

示例：Student表的Ssex只允许取“男”或“女”。

  CREATE TABLE Student

​    (Sno CHAR(9) PRIMARY KEY，

​     Sname CHAR(8) NOT NULL，          

​     Ssex CHAR(2) CHECK (Ssex IN (‘男’，‘女’) ) ，        

​       /*性别属性Ssex只允许取'男'或'女' */

​     Sage INT，

​     Sdept CHAR(20)

​    );

## 3.2、元组上的约束条件的定义

在CREATE TABLE时可以用CHECK短语定义元组上的约束条件，即元组级的限制。同属性值限制相比，元组级的限制可以设置不同属性之间的取值的相互约束条件 。

示例： 当学生的性别是男时，其名字不能以Ms.打头。

  CREATE TABLE Student

​     (Sno  CHAR(9)，

​     Sname CHAR(8) NOT NULL，

​     Ssex  CHAR(2)，

​     Sage  SMALLINT，

​     Sdept CHAR(20)，

​     PRIMARY KEY (Sno)，

​     CHECK (Ssex='女' OR Sname NOT LIKE 'Ms.%')

​     /*定义了元组中Sname和 Ssex两个属性值之间的约束条件*/

​    )；

性别是女性的元组都能通过该项检查，因为Ssex=‘女’成立；当性别是男性时，要通过检查则名字一定不能以Ms.打头。

## 4、完整性约束命名子句

以上讲解的完整性约束条件都在CREATE TABLE语句中定义。SQL还在CREATE TABLE语句中提供了完整性约束名子句CONSTRAINT，用来对完整性约束条件命名。从而可以灵活地增加、删除完整性约束条件。

### 4.1、完整性约束命名子句

语法格式：

CONSTRAINT<完整性约束条件名>[PRIMARY KEY 短语|FOREIGN KEY短语|CHECK 短语]

示例：建立学生登记表Student，要求学号在90000~99999之间，姓名不能取空值，年龄小于30，性别只能是“男”或“女”。

  CREATE TABLE Student

   (Sno NUMERIC(6) CONSTRAINT C1 CHECK (Sno BETWEEN 90000 AND 99999)，

​    Sname CHAR(20) CONSTRAINT C2 NOT NULL，

​    Sage NUMERIC(3) CONSTRAINT C3 CHECK (Sage < 30)，

​    Ssex CHAR(2) CONSTRAINT C4 CHECK (Ssex IN ( '男'，'女'))，

​    CONSTRAINT StudentKey PRIMARY KEY(Sno)

   )；

### 4.2、修改表中的完整性限制

可以使用ALTER TABLE语句修改表中的完整性限制。

示例：修改表Student中的约束条件，要求学号改为在900000~999999之间。（可以先删除原来的约束条件，再增加新的约束条件）

1)     ALTER TABLE Student DROP CONSTRAINT C1;

2)     ALTER TABLE Student ADD CONSTRAINT C1 CHECK (Sno BETWEEN 900000 AND 999999);

## 5、触发器

触发器（Trigger）是用户定义在关系表上的一类由事件驱动的特殊过程。一旦定义，任何用户对表的增、删、改操作均由服务器自助激活相应的触发器，在DBMS核心层进行集中的完整性控制。可以进行更为复杂的检查和操作，具有更精细和更强大的数据控制能力。

定义触发器语法格式：

　　CREATE TRIGGER <触发器名>

　　　　{AFTER | BEFORE}<触发器事件>ON <表名>

　　　　FOR EACH {ROW|STATEMENT}

　　　　[WHEN <触发条件>]

　　　　<触发动作体>

详细说明：

1)     表的拥有者即创建表的用户才可以在表上创建触发器，并且一个表上只能创建一定数量的触发器

2)     当这个表的数据发生变化时，将激活定义在该表上相应<触发事件>的触发器

3)     触发事件可以是insert、delete或update，也可以是这几个事件的组合，如insert or update等。Update后面还可以有of<触发列，…>，即进一步指明修改哪些列时触发器激活

4)     触发器按照所触发动作的间隔尺寸可以分为行级触发器（for each row）和语句级触发器（for each statement）。

行级触发器和语句级触发器区别：如果使用的是语句级触发器，那么触发器只会在相应的语句（eg：update）执行或者是执行之后执行一次，一般情况下不会这样使用；而对于行级触发器，相应的语句（eg:update）有影响到几行记录，就执行几次触发器。

5)     触发器被激活时，只有当触发条件为真时触发动作体才执行，否则触发动作体不执行。如果省略when触发条件，则触发动作体在触发器激活后立即执行

6)     触发动作体既可以是一个匿名的PL/SQL过程块，也可以是对已创建存储过程的调用。再一个行级触发器能够通过new和old获得update或者insert发生之前的新值和发生值之后的旧值。

示例：定义一个before行级触发器，为教师表定义完整性规则，“教授”的工资不得低于4000元，如果低于4000自动改为4000元。

CREATE TRIGGER tri_teacher /*在Teacher 表上定义触发器，触发事件是插入或更新*/

BEFORE INSERT or update ON Teacher

FOR EACH ROW /*这是行级触发器*/

AS BEGIN /*定义触发器动作体，这是一个PL/SQL过程块*/

IF (new.Job = ‘教授’) AND ( new.sal<4000) THEN/*在过程块中使用插入或更新后的值*/

new.sal:=4000;

END IF;

END tri_teacher;

 

触发器的执行顺序：

1)     执行该表上的before触发器

2)     激活触发器的SQL语句

3)     执行该表上的after触发器

对于同一个表上多个before（after）触发器，遵循“谁先创建谁先执行”的原则。

 

删除触发器语法：

​     DROP TRIGGER <触发器名> ON <表名>；

示例：DROP TRIGGER tri_teacher ON Teacher；

## 参考文章
* https://www.cnblogs.com/zhouyeqin/p/7401670.html