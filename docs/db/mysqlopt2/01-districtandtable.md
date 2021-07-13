---
title: 分区和分表
---

::: tip
本文主要是介绍 MySQL分区和分表 。
:::

[[toc]]

## 一、mysql的分区和分表

## 二、分区

分区就是把一个数据表的文件和索引分散存储在不同的物理文件中。

* mysql支持的分区类型包括Range、List、Hash、Key，其中Range比较常用：

* RANGE分区：基于属于一个给定连续区间的列值，把多行分配给分区。

* LIST分区：类似于按RANGE分区，区别在于LIST分区是基于列值匹配一个离散值集合中的某个值来进行选择。

* HASH分区：基于用户定义的表达式的返回值来进行选择的分区，该表达式使用将要插入到表中的这些行的列值进行计算。这个函数可以包含MySQL 中有效的、产生非负整数值的任何表达式。

* KEY分区：类似于按HASH分区，区别在于KEY分区只支持计算一列或多列，且MySQL服务器提供其自身的哈希函数。必须有一列或多列包含整数值。

### 案例：

建立一个user 表 以id进行分区 id 小于10的在user_1分区id小于20的在user_2分区

``` sql
create table user(
    id int not null auto_increment,
    username varchar(10),
    primary key(id)
)engine = innodb charset=utf8
partition by range (id)(
    partition user_1 values less than (10),
    partition user_2 values less than (20)
);
```



### 建立后添加分区：

maxvalue 表示最大值  这样大于等于20的id 都出存储在user_3分区

``` sql
alter table user add partition(
    partition user_3 values less than maxvalue
);
```

### 删除分区：

``` sql
alter  table user drop partition user_3;
```

现在打开mysql的数据目录

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/db/mysqlopt2/district-1.png')" alt="wxmp">

可以看见多了user#P#user_1.ibd 和user#P#user_2.ibd  这两个文件

如果表使用的存储引擎是MyISAM类型，就是：

user#P#user_1.MYD,user#P#user_1.MYI和user#P#user_2.MYD,user#P#user_2.MYI

由此可见，mysql通过分区把数据保存到不同的文件里，同时索引也是分区的。相对于未分区的表来说，分区后单独的数据库文件索引文件的大小都明显降低，效率则明显的提示了。可以插入一条数据然后分析查询语句验证一下：

``` sql
insert into user values(null,'测试');

explain partitions select * from user where id =1;
```

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/db/mysqlopt2/district-2.png')" alt="wxmp">

可以看见仅仅在user_1分区执行了这条查询。

具体分区的效率是多少还需要看数据量。在分区时可以通过 DATA DIRECTORY 和 　INDEX DIRECTORY 选项吧不同的分区放到不同的磁盘上进一步提高系统的I/O吞吐量。

分区类型的选择，通常使用Range类型，不过有些情况，比如主从结构中，主服务器很少使用‘select’查询，在主服务器上使用 Range类型分区通常没有太大的意义，此时使用Hash类型分区更好例如：

partition by hash(id) partitions 10;

当插入数据时，根据id吧数据平均散到各个分区上，由于文件小，效率高，更新操作变得更快。

在分区时使用的字段,通常情况下按时间字段分区，具体情况以需求而定。划分应用的方式有很多种，比如按时间或用户，哪种用的多，就选择哪种分区。如果使用主从结构可能就更加灵活，有的从服务器使用时间，有的使用用户。不过如此一来当执行查询时，程序应该负责选择真确的服务器查询，写个mysql proxy脚本应该可以透明的实现。

### 分区的限制：

* 1.主键或者唯一索引必须包含分区字段，如primary key (id,username),不过innoDB的大组建性能不好。

* 2.很多时候，使用分区就不要在使用主键了，否则可能影响性能。

* 3.只能通过int类型的字段或者返回int类型的表达式来分区，通常使用year或者to_days等函数（mysql 5.6 对限制开始放开了）。

* 4.每个表最多1024个分区，而且多分区会大量消耗内存。

* 5.分区的表不支持外键，相关的逻辑约束需要使用程序来实现。

* 6.分区后，可能会造成索引失效，需要验证分区可行性。

分区模式详解：

### Range（范围）
这种模式允许DBA将数据划分不同范围。例如DBA可以将一个表通过年份划分成三个分区，80年代（1980's）的数据，90年代（1990's）的数据以及任何在2000年（包括2000年）后的数据。



``` sql
CREATE TABLE users (  
       id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,  
       usersname VARCHAR(30) NOT NULL DEFAULT '',  
       email VARCHAR(30) NOT NULL DEFAULT ''  
)  
PARTITION BY RANGE (id) (  
       PARTITION p0 VALUES LESS THAN (3000000),  
      
       PARTITION p1 VALUES LESS THAN (6000000), 
     
       PARTITION p2 VALUES LESS THAN (9000000),  
     
       PARTITION p3 VALUES LESS THAN MAXVALUE     
);  
```



在这里，将用户表分成4个分区，以每300万条记录为界限，每个分区都有自己独立的数据、索引文件的存放目录。

还可以将这些分区所在的物理磁盘分开完全独立，可以提高磁盘IO吞吐量。



``` sql
CREATE TABLE users (  
       id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,  
       usersname VARCHAR(30) NOT NULL DEFAULT '',  
       email VARCHAR(30) NOT NULL DEFAULT ''  
)  
PARTITION BY RANGE (id) (  
       PARTITION p0 VALUES LESS THAN (3000000)  
       DATA DIRECTORY = '/data0/data'  
       INDEX DIRECTORY = '/data0/index',  
  
       PARTITION p1 VALUES LESS THAN (6000000)  
       DATA DIRECTORY = '/data1/data'  
       INDEX DIRECTORY = '/data1/index',  
  
       PARTITION p2 VALUES LESS THAN (9000000)  
       DATA DIRECTORY = '/data2/data'  
       INDEX DIRECTORY = '/data2/index',  
  
       PARTITION p3 VALUES LESS THAN MAXVALUE     
       DATA DIRECTORY = '/data3/data'   
       INDEX DIRECTORY = '/data3/index'  
);  
```



 

### List（预定义列表）
这种模式允许系统通过DBA定义的列表的值所对应的行数据进行分割。例如：DBA根据用户的类型进行分区。 



``` sql
CREATE TABLE user (  
     id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,  
     name VARCHAR(30) NOT NULL DEFAULT '' ,
     user_type   int not null
)  
PARTITION BY LIST (user_type ) (  
     PARTITION p0 VALUES IN (0,4,8,12) , 
     PARTITION p1 VALUES IN (1,5,9,13) ,  
     PARTITION p2 VALUES IN (2,6,10,14),  
     PARTITION p3 VALUES IN (3,7,11,15)   
);     
```



分成4个区,同样可以将分区设置的独立的磁盘中。



### Key（键值） 
上面Hash模式的一种延伸，这里的Hash Key是MySQL系统产生的。 



``` sql
CREATE TABLE user (  
     id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,  
     name VARCHAR(30) NOT NULL DEFAULT '',  
     email VARCHAR(30) NOT NULL DEFAULT ''  
)  
PARTITION BY KEY (id) PARTITIONS 4 (  
     PARTITION p0,  
     PARTITION p1,  
     PARTITION p2,  
     PARTITION p3
);     
```



 

### Hash（哈希） 
 这中模式允许DBA通过对表的一个或多个列的Hash Key进行计算，最后通过这个Hash码不同数值对应的数据区域进行分区，。例如DBA可以建立一个对表主键进行分区的表。 



``` sql
CREATE TABLE user (  
     id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,  
     username VARCHAR(30) NOT NULL DEFAULT '',  
     email VARCHAR(30) NOT NULL DEFAULT ''  
)  
PARTITION BY HASH (id) PARTITIONS 4 (  
     PARTITION p0 ,  
     PARTITION p1,  
     PARTITION p2,
     PARTITION p3  
); 
```



分成4个区,同样可以将分区设置的独立的磁盘中。


## 三、分区管理


### 删除分区

``` sql
ALERT TABLE users DROP PARTITION p0;  
```

### 重建分区

 RANGE 分区重建

``` sql
ALTER TABLE users REORGANIZE PARTITION p0,p1 INTO (PARTITION p0 VALUES LESS THAN (6000000));  
```

将原来的 p0,p1 分区合并起来，放到新的 p0 分区中。

### LIST 分区重建

``` sql
ALTER TABLE users REORGANIZE PARTITION p0,p1 INTO (PARTITION p0 VALUES IN(0,1,4,5,8,9,12,13));  
```

将原来的 p0,p1 分区合并起来，放到新的 p0 分区中。

### HASH/KEY 分区重建

``` sql
ALTER TABLE users REORGANIZE PARTITION COALESCE PARTITION 2;  
```

用 REORGANIZE 方式重建分区的数量变成2，在这里数量只能减少不能增加。想要增加可以用 ADD PARTITION 方法。

新增分区

### 新增 RANGE 分区 

``` sql
alter table user add partition(partition user_3 values less than maxvalue);
```

 

### 新增 LIST 分区 

``` sql
ALTER TABLE category ADD PARTITION (PARTITION p4 VALUES IN (16,17,18,19));  
```

### 新增 HASH/KEY 分区

``` sql
ALTER TABLE users ADD PARTITION PARTITIONS 8;  
```

将分区总数扩展到8个。

给已有的表加上分区



``` sql
alter table results partition by RANGE (month(ttime))   
(PARTITION p0 VALUES LESS THAN (1),  
PARTITION p1 VALUES LESS THAN (2) , PARTITION p2 VALUES LESS THAN (3) ,  
PARTITION p3 VALUES LESS THAN (4) , PARTITION p4 VALUES LESS THAN (5) ,  
PARTITION p5 VALUES LESS THAN (6) , PARTITION p6 VALUES LESS THAN (7) ,  
PARTITION p7 VALUES LESS THAN (8) , PARTITION p8 VALUES LESS THAN (9) ,  
PARTITION p9 VALUES LESS THAN (10) , PARTITION p10 VALUES LESS THAN (11),  
PARTITION p11 VALUES LESS THAN (12),  
PARTITION P12 VALUES LESS THAN (13) ); 
```



## 四、分表

### 分表和分区 区别
区别是，分区是把一个逻辑表文件分成几个物理文件后进行存储，而分表则是把原先的一个表分成几个表。进行分表查询时可以通过union或者视图。

分表又分垂直分割和水平分割，其中水平分分割最为常用。水平分割通常是指切分到另外一个数据库或表中。例如对于一个会员表，按对3的模进行分割:

table = id%3

如果id%3 = 0 则将用户数据放入到user_0表中，如id%3=1就放入user_1表中，依次类推。

在这里有个问题，这个uid应该是所有会员按序增长的，可他是怎么得到的呢？使用auto_increment是不行的，这样就用到序列了。

对于一些流量统计系统，其数据量比较大，并且对过往数据的关注度不高，这时按年、月、日进行分表，将每日统计信息放到一个以日期命名的表中；或者按照增量进行分表，如每个表100万数据，超过100万就放入第二个表。还可以按Hash进行分表，但是按日期和取模余数分表最为常见，也容易扩展。

分表后可能会遇到新的问题，那就是查询，分页和统计。通用的方法是在程序中进行处理，辅助视图。

使用分表案例：

案例1：

对会员数据对5取模，放在5个表中，如何查询会员数据：

### 1.已知id查询会员数据，
代码如下：


``` php
<?php
//查询单个会员数据
$customer_table = 'customer'.$id%5;
$sql = 'select * from '.$customer_table.' where customer_id = '.$id;
//查询全部会员数据
$sql = '';
$tbale = ['customer0','customer1','customer2','customer3','customer4'];
foreach($table as $v){
$sql .='select * from '.$v.' union';
}
$sql = substr($sql,0,-5);

?>
```



这样就可以查询某一个会员的数据或者全部会员的数据了。同理，分页的话在这个大集合中使用limit 就可以了。但是这样做又会有一个疑问，把所有的表连起来查询和部分表没有什么区别，其实在实际的应用中，不可能查看所有的会员资料，一次查看20个然后分页。完全没有必要做union，仅查询一个表就可以了，唯一需要考虑的是在分页零界点时的衔接。其实，这个衔接是否那么重要？即使偶尔出现几条数据的差异，也不会对业务有任何的影响。

### 2.和其它表进行关联和1类似。

### 3.根据会员姓名搜索用户信息。

在这种需求下，需要搜索所有的表，并对结果进行汇总。虽然这样做产生了多次的查询，但并不代表效率低。好的sql语句执行10次也比差的sql语句执行一次快。

案例2：

在一个流量监控系统中，由于网络流量巨大，统计数据很庞大，需要按天分表。先要得到任意日，周，月的数据。

1.需要任意一天的数据。直接查询当天的数据表即可。

2.需要几天的数据。分爱查询这几天的数据，然后进行汇总。

3.需要查询一周的数据。对一周的数据定期汇总到一个week表，从这个表里面查询。这个汇总过程可以由一个外部程序完成，也可以由定期的脚本完成。

4.查询一个月的数据。汇总本月所有的数据到month表，在此表查询。

5.查询5个月内的详细数据。不支持。仅支持最多3个月的详细数据。数据没3个月已归档一次。在大数据的处理中，必须做出一些牺牲。对于超出3个月的数据，仅提供统计数据，详细数据需要查看归档。90天或者180天，给数据保存设个界限，也是大部分这类系统的常规做法，超出90天的数据就不再提供数据详单了。比如，移动的通话记录最多保存半年，即180天，超过这个范围的数据不在提供查询。如果你实在需要，可能就要联系移动的工程师了。

分表前应该尽量按照实际业务来分表，参考依据就是哪些字段在查询中起到作用，那就这些字段来分表，并且需要在分表前就估算好规模，也就是先确定好规则在分表。

对于分表后的操作，依然是联合查询，视图等基本操作，或者使用merge引擎合并数据并在此表中查询。复杂一些操作需要借助存储过程来完成，借助外部工具实现对分表的管理。

对于比较庞大的数据，不论是否进行分表，都必须考虑功能和效率的平衡性，并在功能上做出让步。我们不能事事迁就用户，而应该对某些影响效率的功能做出限制。例如移动公司的180天限制、论坛禁止对老帖进行回复等。

## 参考文章
* https://www.cnblogs.com/phpshen/p/6198375.html