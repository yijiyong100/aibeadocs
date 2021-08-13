---
title: 备份与恢复-简要操作案例
---

::: tip
本文主要是介绍 备份与恢复-简要操作案例 。
:::

[[toc]]

## MySQL 完全备份 + 增量备份+完全恢复

### 简介

> 1·完全备份与增量备份的概念
> 2·使用 mysqldump 完全备份
> 3·使用 mysqldump 进行表结构备份
> 4·完全备份恢复的两种方法
> 5·使用 flush logs 进行增量备份
> 6·增量备份恢复
> 7·基于时间点与位子的恢复
> 8·MySQL 备份思路



### 完全备份与增量备份的概念

> 1·MySQL 完全备份：是对整个数据库的备份、数据库结构和文件结构的备份，保存的是备份完成时刻的数据库，它也是增量备份的基础。它的优点：备份与恢复操作简单，缺点是数据存在大量的重复，占用大量的备份空间，备份时间长。
> 
> 2·MySQL 增量备份：是针对在上次完全备份或增量备份后被修改的文件才会备份。因为完全备份的 缺点会占用很多的资源，所以增量备份与完全备份这中结合就能解决这样的缺点。
> 
> 3·MySQL 是没有提供直接的增量备份的办法，但是可以通过MySQL的二进制日志间接实现增量备份。二进制日志保存了所有更新或者可能更新数据库的操作，使用flush logs 可以使日志分割开来，这样就可以识别每次更新的操作会在另一个日志文件中。



**实验前准备：**

> 因为这里涉及到数据库的表，所以在这之前就创建好了一张表，如下图所示：



<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/mysqlop/bak/case/167827e1d4a53f3a4c11fff38123cbe0.png')" alt="wxmp">



### mysqldump 完全备份与恢复

> 1·针对一个库完全备份命令格式：
> 
> mysqldump -uroot -p123123 --databases kgc（库名） > /opt/kgc.sql（备份到什么地方）
> 2·模拟kgc这个库中的表丢失。
> 
> mysql> drop tabale school;



<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/mysqlop/bak/case/2c2c8800ed6b0613021ba2c40e4ec818.png')" alt="wxmp">



> 3·数据库中的表丢失，恢复表的命令格式：
> 
> mysql -uroot -p123123 < /opt/kgc.sql ---- （恢复kgc库中的表，重你备份的地方导入即可）
> 
> 4·验证恢复备份：
> 
> mysql> show tables;
> 
> mysql> select * from school;



<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/mysqlop/bak/case/ca2be1cc5258d024b47a5b60b4001af2.png')" alt="wxmp">



> 5·对数据库所有表进行备份
> 
> mysqldump -uroot -p123123 --all-databases > /opt/all.sql ----（对所有库备份加入选项 --all ）



> 6·对库中的一张表的表结构进行备份，注意这里只是备份表结构
> 
> mysqldump -uroot -p123123 -d kgc（库名）school（表名） > /opt/desc.sql



### MySQL 增量备份

> 1·增量备份是基于完全备份之后的所修改的数据进行备份，所以这里必须先做完全备份，在做增量备份。上面的实验已经做过了完全备份，现在可以直接做增量分了。
> 
> 2·要进行MySQL增量备份需要开启二进制日志功能。需要在主配置文件【mysqld】项中加入：log-bin=mysql-bin 如下图：
> [root@localhost ~]# vim /etc/my.cnf



<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/mysqlop/bak/case/271dd5d1fc7f8168db60ee99342f7d7d.png')" alt="wxmp">



> 3·重启MySQL服务、查看二进制日志文件
> 
> [root@localhost ~]# systemctl restart mysqld.service



<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/mysqlop/bak/case/ced62e8f560a3ea8969b1b30a492e7cb.png')" alt="wxmp">



> 4·模拟在表中添加数据，然后把只备份添加的数据。
> 
> mysql> insert into school (姓名,成绩) values (‘成龙’,79);



<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/mysqlop/bak/case/889722a7cb3d789573c545638601477b.png')" alt="wxmp">



> 5·模拟故障，因为人员误操作或其他因素，导致表被删除。
> 
> 使用命令 mysqladmin -uroot -p123123 flush-logs 再次生成一份日志文件，这样接下来对MySQL的记录将会写在新的日志文件中
> 
> mysql> drop table school;
> 
> mysql> show tables;



<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/mysqlop/bak/case/e27295a256313bcaaa12e6526ed5b3c1.png')" alt="wxmp">



> 6·数据恢复。恢复思路
> 
> （1）首先需要把完全备份恢复
> 
> （2）其次，需要知道我们之前在插入数据的时候的所有操作都会纪律在日志文件中。
> 
> （3）最后我们需要重日志文件中恢复之前插入的数据。
> 
> （4）这样就能完全恢复之前表中的数据。



<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/mysqlop/bak/case/b298f854cafc3a4327fffdfbd95a392c.png')" alt="wxmp">



> 7·验证数据是否恢复成功。



<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/mysqlop/bak/case/6e4293379e8efa3e70bc6fd4c19af881.png')" alt="wxmp">



> 8·基于时间点与位置的恢复
> 
> 列如：需要往数据库中插入两条数据，但是由于误操作，两条插入语句中间删除了一条数据，而这条数据是不应该被删除的，这个时候就需要恢复到误操作之前，跳过删除这一条数据这个命令，再恢复后面的正确操作。
> 
> （1）再次分割日志：
> 
> [root@localhost data]# mysqladmin -uroot -p123123 flush-logs
> 
> （2）模拟误操作，添加数据的过程中，误删除一条数据，因为大意没注意删除的数据还需要保留，再次继续写入数据



<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/mysqlop/bak/case/3f698dbfb3b831e5e68c6cba3055cdd5.png')" alt="wxmp">



> 9·这时候发现表数据丢失，需要恢复表中被删除的数据。恢复思路：
> 
> （1）再次进行日志分割，是接下来的操作归于另一个二进制日志文件中
> 
> （2）查看需要恢复的二进制日志文件，找到需要恢复的时间点或位置点并且记录
> 
> （3）如果是基于时间点恢复则使用命令：
> 
> –stop-datetime（到这个错误操作的时间点停止）
> 
> –start-datetime （再到下一个正确的时间点开始）
> 
> （4）如果是基于位置的恢复则使用命令：
> 
> –stop-position —（上一次可以正确执行的位子点）
> 
> –start-position —（下一次可以正确执行的位子点）



> 10·使用以下命令查看二进制日志文件，查找正确与错的时间和位子点：
> 
> [root@localhost data]# mysqlbinlog --no-defaults --base64-output=decode-rows -v mysql-bin.000003
> 
> 查找的内容如下图：



<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/mysqlop/bak/case/98a45a79e5ce236cef453ec300771af5.png')" alt="wxmp">



> 11·模拟故障数据库中的表丢失，开始恢复数据，恢复思路：
> 
> （1）首先完全备份恢复
> 
> （2）其次找到恢复的时间点或者位子点
> 
> （3）开始增量备份位子点的恢复（这里我选择位子点恢复）
> 
> [root@localhost data]# mysqlbinlog --no-defaults --stop-position=‘344’ /usr/local/mysql/data/mysql-bin.000003 | mysql -uroot -p123123 —（恢复正确位子点）
> 
> [root@localhost data]# mysqlbinlog --no-defaults --start-position=‘835’ /usr/local/mysql/data/mysql-bin.000003 | mysql -uroot -p123123 —（下一次正确位子点）



### 总结

> 1·MySQL 中使用mysqldump 工具备份，它生成的是sql的脚本文件
> 
> 2·恢复数据使用mysql
> 
> 3·备份可以针对整库、一些库或表、表结构进行备份。
> 
> 4·增量备份需要使用分割日志的方式备份
> 
> 5·增量恢复需要根据日志文件的先后，做个执行
> 
> 6·使用基于时间和位子的方式恢复，可以更精确的恢复数据
> 
> 7·大企业应该每周做一次全备，每天做一次增量备份；中小企业应该每天进行一次全备
> 
> 8·可以结合周期性计划任务进行备份，定时备份。时间主要放在业务需求量较小的时间段

## 参考文章
* https://blog.51cto.com/u_13746824/2170577