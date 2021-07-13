---
title: 查看执行计划
---

::: tip
本文主要是介绍 MySQL查看执行计划 。
:::

[[toc]]

MYSQL查看执行计划


## 1、 概述：

   执行计划的查看是进行数据库的sql语句调优时依据的一个重要依据，mysql的执行计划查看相对oracle简便很多，功能也相对简单很多的SQL语句都不能直接查看。

本文档整理了mysql执行计划的生成方法和查看。

 

## 2、 执行计划的生成和查看

### 2.1 执行计划的生成方法：explain select …………….

   生成的方法很简单在相应的select前面加explain即可

 

### 2.2 执行计划的查看

### Id：
包含一组数字，表示查询中执行select子句或操作表的顺序；

执行顺序从大到小执行；

​ 当id值一样的时候，执行顺序由上往下；

### Select_type:
表示查询中每个select子句的类型（简单OR复杂），有以下几种

### SIMPLE：
查询中不包含子查询或者UNIONPRIMARY：查询中若包含任何复杂的子部分，最外层查询则被标记为PRIMARYSUBQUERY：在SELECT或WHERE列表中包含了子查询，该子查询被标记为SUBQUERYDERIVED：在FROM列表中包含的子查询被标记为DERIVED（衍生）若第二个SELECT出现在UNION之后，则被标记为UNION；若UNION包含在FROM子句的子查询中，外层SELECT将被标记为：DERIVED从UNION表获取结果的SELECT被标记为：UNION RESULT

 
### Type：
表示MySQL在表中找到所需行的方式，又称“访问类型”，常见有以下几种

### ALL：
Full Table Scan， MySQL将进行全表扫描； index：Full Index Scan，index与ALL区别为index类型只遍历索引树；range：range Index Scan，对索引的扫描开始于某一点，返回匹配值域的行，常见于between、<、>等的查询； ref：非唯一性索引扫描，返回匹配摸个单独值的所有行。常见于使用非唯一索引或唯一索引的非唯一前缀进行的查找； eq_ref：唯一性索引扫描，对于每个索引键，表中只有一条记录与之匹配。常见于主键或唯一索引扫描const、system：当MySQL对查询某部分进行优化，并转换为一个常量时，使用这些类型访问。如将主键置于where列表中，MySQL就能将该查询转换为一个常量NULL：MySQL在优化过程中分解语句，执行时甚至不用访问表或索引

 

### possible_keys：
指出MySQL能使用哪个索引在表中找到行，查询涉及到的字段上若存在索引，则该索引将被列出，但不一定被查询使用；

### key：
显示MySQL在查询中实际使用的索引，若没有使用索引，显示为NULL。当查询中若使用了覆盖索引，则该索引仅出现在key列表中

### key_len：
表示索引中使用的字节数，可通过该列计算查询中使用的索引的长度

### ref：
表示上述表的连接匹配条件，即那些列或常量被用于查找索引列上的值；

### rows：
表示MySQL根据表统计信息及索引选用情况，估算的找到所需的记录所需要读取的行数；

### Extra：
包含不适合在其他列中显示但十分重要的额外信息；

### Using where：
表示MySQL服务器在存储引擎受到记录后进行“后过滤”（Post-filter）,如果查询未能使用索引，Using where的作用只是提醒我们MySQL将用where子句来过滤结果集 Using temporary：表示MySQL需要使用临时表来存储结果集，常见于排序和分组查询； Using filesort：MySQL中无法利用索引完成的排序操作称为“文件排序”；

 

 

### 2.3 mysql执行计划的局限

 

EXPLAIN不会告诉你关于触发器、存储过程的信息或用户自定义函数对查询的影响情况EXPLAIN不考虑各种CacheEXPLAIN不能显示MySQL在执行查询时所作的优化工作部分统计信息是估算的，并非精确值EXPALIN只能解释SELECT操作，其他操作要重写为SELECT后查看执行计划

 
## 3、 对于非select语句查看执行计划

在实际的工作中也经常需要查看一些诸如update、delete的执行计划，（mysql5.6的版本已经支持直接查看）但是这时候并不能直接通过explain来进行查看，而需要通过改写语句进行查看执行计划；

在一个生产数据库的慢查询日志发现有条语句如下：

Count: 13 Time=73.44s (954s) Lock=0.00s (0s) Rows=0.0 (0), ipos[ipos]@2hostsupdate ipos_zdjhd m,ipos_zdjhdtj tj set m.qr=N,m.qrrq='S',m.qrr='S',tj.qr=N,tj.qrrq='S'where m.ydjh='S' and tj.djbh='S'

 

可以改写如下：

Explain Select m.qr , m.qrr , tj.qr , tj.qrrq from ipos_zdjhd m,ipos_zdjhdtj tj where m.ydjh='17233' and tj.djbh='48632';

 

马上可以发现ipos_zdjhd表进行了全表扫描，而ipos_zdjhd表有1076971行的数据，所以整个update的操作肯定是一个很慢的过程，经过和开发人员沟通后，在ipos_zdjhd表增加相应的索引便让整个过程提升了500倍。



 小结：执行计划加上慢查询日志组成了mysql调优过程的一组调优利器，当数据库稳定过后参数的调优是很少的一部分，80%以上的调优都会是SQL调优。


## 参考文章
* https://blog.51cto.com/xiaocao13140/2126580