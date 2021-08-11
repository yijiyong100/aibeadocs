---
title: MySQL-运维常用操作
---

::: tip
本文主要是介绍 MySQL-运维常用操作 。
:::

[[toc]]

## MySQL运维之--日常维护操作


**转载请注明出处**：http://blog.csdn.net/guoyjoe/article/details/46697825



## 一、Linux内核和发行版本号
``` sql
 uname -a
 cat /etc/issue
```

## 二、glibc的版本号
``` sql
  /lib/libc.so.6   ---没有man函数据的动态链接库
```

## 三、MySQL的版本号
``` sql
  MySQL二进制分发版的文件名称格式为：mysql-VERSION-OS.tar.gz
  比如：Linux-Generic(glibc 2.5) (x86,64bit),Compressed TAR Archive(mysql-5.6.16-linux-glibc2.5-x86_64.tar.gz)

 1、下载
 http://dev.mysql.com/downloads/mysql/
 2、查rpm包装在什么文件夹下
  rpm -qpl MySQL-server-5.6.23-1.el6.i686.rpm  |more
  rpm -qpl MySQL-client-5.6.23-1.el6.x86_64.rpm |more
 3、更改rpm安装路径
 rpm --help
 rpm --prefix  --relocate
 rpmbuild spec binary rpm
 yum install 
```

## 四、rpm安装
``` sql
rpm -ivh xxx.rmp
rpm -pql xxx.rmp


 MySQL  实例安装和启动
	1. 安装
		mysql_install_db --defaults-file=/root/data/mysql3306/my.cnf --basedir=/usr/ --datadir=/root/data/mysql3306/data
	2. 启动
		mysqld_safe --defaults-file=/root/data/mysql3306/my.cnf &
	3. 登录
		mysql -h127.0.0.1 -uroot -P3306 -p
```

## 五、安装演示：
### 1.关闭mysql
``` sql
  ps -ef |grep mysqld
  kill  3397 3801
```

### 2.安装
``` sql
cat init3306
sh init3306.sh
```

### 3.启动
``` sql
cat start3306.sh
sh start3306.sh

 注意：mysql_install_db(通过安装rpm包产生mysql_install_db)。有例如以下命令查看：
  rpm -pql MySQL-server-5.5.42-1.linux2.6.i386.rpm |grep install
  which  mysql_install_db
```

### 4.看日志
``` sql
tail  -100f /root/data/mysql3306/log/alert.log
 发生数据字典不存在。就会自己主动创建。。。


```

### 5.查看进程
``` sql
ps -ef |grep mysqld
  mysqld_safe是mysqld的父进程 

```

### 6.登录
``` sql
sh  my3306.sh  --mysql -h127.0.0.1 -uroot --P3306
```

## 六、脚本：
``` shell
1.---安装mysql: init3306.sh   
 rm -rf /root/data/mysql3306/data/*
 rm -rf /root/log/mysql3306/iblog/*
 rm -rf /root/log/mysql3306/binlog/*
 chmod -R 777 /root/data/mysql3306/data/
 chmod -R 777 /root/log/mysql3306/iblog/
 chmod -R 777 /root/log/mysql3306/binlog/
 
 chmod 755 /root/data/mysql3306/my.cnf
 
 mysql_install_db --defaults-file=/root/data/mysql3306/my.cnf --basedir=/usr/ --datadir=/root/data/mysql3306/data
 
 chmod -R 777 /root/data/mysql/3306/data/
 chmod -R 777 /root/log/mysql3306/iblog/
 chmod -R 777 /root/log/mysql3306/binlog/


2.--启动mysql: start336.sh   
 mysqld_safe --defaults-file=/root/data/mysql3306/my.cnf &
 
 
3.--登录mysql: my3306.sh    
 mysql -h127.0.0.1 -uroot -P3306 -p


------研究下
cd /root/data/mysql3306/data/mysql   
cd /root/data/mysql3306/data/performance_schema  --性能相关的
cd /root/data/mysql3306/data/test   ---測试库
cd /root/log/mysql3306/iblog/     ---innodb自己的数据和日志




------了解my.cnf(多实例用端口来取分)
vi /root/data/mysql3306/my.cnf


[client]
port=3306
socket=/root/data/mysql3306/run/mysql.sock


[mysql]
port=3306
promprt=\\u@\\d \\r:\\m:\\s>


[mysqld]
default-storage-engine=INNODB
character-set-server=iatin1
explicit_defaults_for_timestamp=true


#dir
innodb_log_group_home_dir=/root/log/mysql3306/iblog
innodb_data_home_dir=/root/log/mysql3306/iblog
basedir=/usr
datadir=/root/data/mysql3306/data
tmpdir=/root/data/mysql3306/tmp
slave_load_tmpdir=/root/data/mysql3306/tmp
log-error=/root/data/mysql3306/log/alert.log
slow_query_log_file=/root/data/mysql3306/log/slow.log
relay_log_info_file=/root/log/mysql3306/binlog/relay-log.info
master-info-file=/root/log/mysql3306/binlog/master.info
socket=/root/data/mysql3306/run/mysql.sock
log-bin=/root/log/mysql3306/binlog/binlog
relay-log=/root/log/mysql3306/binlog/relaylog


innodb_force_recovery=0
```

## 七、操作mysql

### 1、登录mysql:
``` sql
 本地：  mysql -u$usrename -p$password
 远程：  mysql -u$username -p$passwrod -h$ip
 多实例：mysql -u$username -p$passwrod -P$port
```

### 2、用户操用
``` sql
(1)创建用户
 方法一：
  insert into mysql.user(user,host,password) values('mytest','localhost',password('1234'));
  flush privilege;
 方法二：create user mystest@'%' identified by '1234';

 
(2)用户授权
 单纯的授权
  grant all privileges on *.* to mytest@localhost; 
  grant insert,update,delete,select on *.* to mytest@localhost;
 授权并创建用户  
  grant all privileges on *.* to mytest@localhost identified by '1234';--创建用户并刷缓存，
                                   （等同于:insert into mysql.user ,flush privilege）
  grant all privileges on *.* to mytest@localhost;  --对象权限
  grant super on *.* to mytest@'%';  --系统权限  (supert相当于oracle中的dba权限)
  
```
 
### 3、实操
``` sql
show databases;  --查看全部的数据库
use mysql;     --切到mysql数据库
use tables;    --在mysql库的tables
select user,host,password from mysql.user;  ----查mysql的全部用户，这个是由mysql_install_db创建的
grant all privilege on *.* to test_1@'%'; --all代表(select update,delete,alter admin,super_acl),第一个*用户，第二个*对象。%全部的主机 
mysql -h127.0.0.1 -utest_1   ----用grant创建的用户登录mysql
select user();  ---当前是什么用户
create database jianfeng; ---创建数据库（mysql中的数据库相似于oracle中的schema
create table user(id int) engine=innodb  ---创建表;
grant select on jianfeng.user to test_1@'%';  ---jianfeng.user表的查询授权给test_1用户
insert into mysql.user(user,host,password) values('test_2','%',password('1234')); --用这样的方法创建test_2用户。有个问题权限没有
flush privileges;  ---把mysql.user表的用户权限又一次刷到内存中
show master status\G; 
change master to xxx; 
show processlist;  ---查看当前用户的连接,线程形式（相似oracle中的v$session）
```

### 4、drop table处理
``` sql
 rename table test_1 to test;(能够高速切回来rename table test to test_1;)
 备份mysqldump：mysqldump -h127.0.0.1 -uroot mydb gyj_t1 >/tmp/gyj_t1.sql
 drop table test;
```


## 5、自增主键(最好是自定义主键，系统默认的是全局的增量)
``` sql
create table test (id int primary key auto_increment,name varchar(100)) engine=innodb;
show create table test\G;
create index test_name_idx on test(name);
show create table test\G;
insert into test(name) values('test');
commit;
select * from test;
```

### 6、alter table处理  --会动原来的数据，须要拷贝数据
``` sql
alter table test add coll int;
```

### 7、运行计划
``` sql
select * from test where id=1\G;
explain select * from test where id=1;
create index test_id_coll_idx on test(id,coll);
explain select * from test where id=1;
create index test_col_name on test(coll,name);
explain select * from test where coll>10 and name='xx';
show create table test\G;
alter table test drop index test_name_idx;
explain select * from test where coll>10 and name>'xx';
```

## 8、数据导出
``` sql
（1）用dump导出数据
mysqldump -h127.0.0.1 -uroot mydb gyj_t1 >/tmp/xx.sql
drop table test;
source /tmp/xx.sql   --导入数据


(2)用select导出数据
select * from test into outfile '/tmp/yy.sql';
```

## 9、数据迁移
``` sql
(1)停机方式
  mysqldump/loadata
(2)不停机方式
 物理上：搭备库（能够级联5.5-->5.6，向下兼容的）
   把主库read only,备库就能把主库转过来的binlog消化完，再把备库切为主
   show variables like '%read%';
   set global read_only=on;
   insert into test(name) values('xx');  --插不进的。不能用root用户
(3)不同平台小表：oracle--->mysql
   脚本：synfull.pl
   
(4)不同平台的一个大表迁多：增量迁移
  a.把数据的全量迁过去
  b.把迁的过程中产生的日志传过去
  c.apply增量
  d.锁表切切换
 
 （5）增量
 a.Oracle:物化视图
 b.MySQL:trigger
   create trigger tri_test
   before insert,delete,update
   insert test_log value(type,id);
   end;
   /
  insert into test values(1,'xxx');
  test_log value('insert','1');  
  lock table test;
  应用切换
```

## 10、binlog
``` sql
  reset master;  --会把当前的binlog清掉
  show binlog events;
  create table x1(id int);
  show binlog events;
  insert into x1 values(1);
  commit;
  show binlog events;
 相似于： mysqlbinlog -vvv binlog.00001 > /tmp/binlog.log
      vi /tmp/binlog.log
  WAL: write ahead log,日志优先写
```

## 11、归档 
``` sql 
 flush logs;
 show master status;
 
 
 write ahead log. recover backup, duriably. undo acid mvcc
```

## 12、參数和统计信息
``` sql
show variables;  ----參数
show variables like '%bin%';
show status;    ----统计信息
show global status like'%insert%';
insert into test(name) values('xxxxx');


show variables like '%default%';
set global default_storage_engine=myisam;  ---不影响当前会话的操作，影响新建立的连接
set session default_storage_engine=myisam;  ---影响当前会话的操作


---连接池
max_connect
min_connect
max_idle
time_out

disconnect --释放
```

## 【----------------------------】

## Mysql数据库常用运维指令

## 表

``` sql
1. 查看表结构
DESCRIBE/DESC table_name
SHOW CREATE TABLE table_name 以sql语句形式查看表结构


2. 修改表名
ALTER TABLE table_name RENAME new_table_name


3. 生成备份表
CREATE TABLE table_name SECLET * FROM origin_table


4. 修改字符集
ALTER TABLE table_name charset gbk

5. 清空表数据
DELETE FROM table_name
TRUNCATE table_name

6. 删除表
DROP TABLE table_name
```
## 字段
``` sql
1. 修改字段
ALTER TABLE table_name MODIFY sname varchar(50) not null

2. 添加字段
ALTER TABLE table_name ADD sex smallint default null

3. 移动字段
ALTER TABLE table_name CHANGE GatewayId GatewayId int not null default 0 AFTER RegionID

4. 添加字段并指定位置
ALTER TABLE table_name ADD email varchar(50) default null AFTER id

5. 添加字段到第一个位置
ALTER TABLE table_name ADD qq varchar(30) default null first

6. 删除字段
ALTER TABLE table_name DROP sex
```

## 键
``` sql
1. 添加主键
ALTER TABLE table_name ADD PRIMARY KEY (id)

2. 删除主键
ALTER TABLE table_name DROP PRIMARY KEY
```

## 索引
``` sql

1. 添加索引
ALTER TABLE table_name ADD INDEX/UNIQUE index_name(column_1,column_2,...,column_n)
CREATE [UNIQUE] INDEX index_name ON table_name(column_1,column_2,...,column_n)

2. 删除索引
DROP INDEX index_name ON table_name
ALTER TABLE table_name DROP INDEX index_name

3. 查看索引
SHOW INDEX FROM table_name

4. 重建索引
4.1 DUMP&RELOAD METHOD

4.2 mysqldump导出后重新导入
ALTER TABLE METHOD
DROP INDEX+ADD INDEX
ALTER TABLE table_name ENGINE=InnoDB

4.3 REPAIR TABLE METHOD
用于修复数据被破坏的表。仅对MyISAM ARCHIVE CSV引擎的数据表有效
REPAIR TABLE table_name
```

## 其他常用指令
``` sql

1. mysqldump
1.1 导出
mysqldump -h ip_address -u username -p password -P port_number db_name table_name_1 [tablename_2] [tablename_3] [tablename_n]>xxx.sql
注:
只导出表结构不导表数据，添加“-d”命令参数
只导出表数据不导表结构，添加“-t”命令参数

1.2 导入
mysql -h ip_address -u username -p password -P port_number db_name< xxx.sql

1.3 导出到文本文件
mysqldump -u root -proot -T target_text_file db_name table_name --fields-terminated-by=',' --lines-terminated-by='\r\n'
mysqladmin

2. 创建用户
CREATE USER username

3. 修改密码
mysqladmin -u username -p old_password password 'new_password'

4. 授权
grant 权限1,权限2,...权限n on 数据库名称.表名称 to '用户名'@'用户地址' identified by '密码'
注:所有权限 ALL PRIVILEGES
```

## 【----------------------------】
## Mysql运维基础操作

## Windows安装步骤

### 1、添加环境变量

``` sql
C:\mysql-5.6.39-winx64\bin
```

### 2、设置my.ini
``` sql
basedir=C:\mysql-5.6.39-winx64
datadir=C:\mysql-5.6.39-winx64\data
sql-mode="NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION"
```

### 3、安装mysql

``` sql
管理员身份进cmd
$ cd C:\mysql-5.6.39-winx64\bin
$ mysqld -install
（如果安装失败，先运行安装vcredist_x64）
$ net start mysql
$ mysql -uroot -p
```

## Linux跳过安装，下面是配置步骤

### 1、配置文件

``` sql
编译配置文件my.cnf，在windows中为my.ini
[mysqld]
basedir = /usr/local/mysql
datadir = /usr/local/mysql/data
sql-mode="NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION"

```

### 2、登录数据库

``` sql
$ mysql -uroot -p -S /tmp/mysql.sock
注：-S参数指定sock登录
```

### 3、设置root密码

``` sql
方式一：
> set password for root@localhost = password('root'); 
方式二：
> use mysql
> update user set password=password("root") where user='root';
> flush privileges;
```

### 4、删除数据库

``` sql
> drop database `db`;
```

### 5、创建数据库设置编码

``` sql
> CREATE DATABASE `db` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
```

### 6、导入数据库

``` sql
> use `db`;
> source /tmp/db.sql;
注：如果发生报错有两个可能。一个是外键限制，暂时先关闭检查；另外是因为配置文件的编码原因（如下修改）。

[client]
default-character-set = utf8
[mysqld]
default-character-set = utf8
```

### 7、创建数据库账号及授权

``` sql
1）如果语句一执行报错，就尝试语句二创建账号。
语句一：
> CREATE USER 'user'@'localhost' IDENTIFIED BY 'user_pwd';
语句二：
> insert into mysql.user(Host,User,Password) values("localhost","user",password("user_pwd"));
2）授权：
示例一：
> GRANT ALL ON `db`.* TO 'user'@'localhost';
示例二：
> GRANT PROCESS, FILE, SUPER, REPLICATION CLIENT ON *.* TO 'nagios'@'192.168.1.1' IDENTIFIED BY 'nagios';
给远程用户授权时注意设置密码，否则连不上哦。
3）刷新生效：
> flush privileges;
4）删除用户：
> delete from user where user='user' and host='localhost';
```

### 8、创建php文件测试

```php
<?php
header("Content-Type: text/html; charset=utf-8") ;

//set_time_limit(0);
//error_reporting( E_ALL&~E_NOTICE );
 
$con = mysql_connect("localhost:3306","user","user_pwd");
if (!$con) {  die('Could not connect: ' . mysql_error());  }

mysql_select_db("db", $con);

$result = mysql_query("SELECT * FROM table");

while($row = mysql_fetch_array($result))
  {
  echo $row['user_id'] . " " . $row['user_pwd'];
  echo "<br />";
  }

mysql_close($con);
```

### 9、数据库改名

``` sql
常见的主要有两种方法：
1）如果所有表都是MyISAM类型的话，可以直接修改文件夹的名字。
$ service mysqld stop
$ mv db_name new_db_name

2）利用mysqldump命令从旧的数据导出数据，再导入新数据库。
$ mysqldump -uroot -p db_name > db_name_dump.SQL
$ mysql -uroot -p -e `CREATE DATABASE new_db_name`
$ mysql -uroot -p new_db_name < db_name_dump.SQL
$ mysql -uroot -p -e `DROP DATABASE db_name`
```

### 10、常用语句

``` sql
1）查看建库语句
> SHOW CREATE DATABASE `db`;

2）查看表结构
> desc `table`;

3）查看表类型（存储引擎）
> SHOW TABLE STATUS FROM `table`;

4）查看数据库默认编码
> show variables like '%char%';

5）查看数据库所有用户
> SELECT DISTINCT CONCAT('User: ''',user,'''@''',host,''';') AS query FROM mysql.user;

6）查看某个用户的权限
> show grants for 'root'@'localhost';   

7）条件导出数据表
> mysqldump -uroot -proot `db` `table` --where="id>0 and id<100" > /tmp/table.sql

8）获取最新的十条数据
> SELECT * FROM `table` ORDER BY date DESC LIMIT 10;

9）格式化输出查询数据
> select * from mysql.user\G;

10）查询数据表大小
> select concat(round(sum(DATA_LENGTH/1024/1024),2),'M') from information_schema.tables where table_schema=`db` AND table_name=`table`; 

11）查看数据库默认的存储引擎
> show variables like '%storage_engine%';

12）查看数据库的所有数据表名
> select table_name from information_schema.tables where table_schema='数据库';
```

### 11、导出数据库

``` sql
1. 全量导出数据库
    $ mysqldump --lock-all-tables --flush-logs --master-data=2 -uroot -proot `db` > db.sql

2. 增量导出数据库
    1）执行增量备份的前提条件是MySQL打开binlog日志功能，在配置文件中加入
    [mysqld]
    log-bin=/db/mysql/data/log-bin/mysql-bin
    “log-bin=”后的字符串为日志记载目录，一般建议放在不同于MySQL数据目录的磁盘上。
    2）使用flush-logs命令来创建新日志
    > flush-logs
    
3.根据编码导出数据库
	$ mysqldump -uroot -proot --default-character-set=utf8 `db` > db.sql
	
4.导出导入数据表
	导出：
	$ mysqldump -uroot -proot `db` `table` > /tmp/table.sql
	导入：
	$ mysql -uroot -proot `db` < /tmp/table.sql

5.导出到cvs文件
	$ mysql -uroot -proot -e "select * from table" -ss | sed 's/\t/","/g;s/^/"/;s/$/"/;s/\n//g' > /tmp/table.csv
```

### 12、忘记数据库密码

``` sql
1.暂停数据库
$ /etc/init.d/mysqld stop

2.执行以下命令
$ /usr/local/mysql/bin/mysqld_safe --skip-grant-tables --user=root &

3.使用root进入数据库，无需密码
$ mysql -uroot -p
```

### 13、不同版本mysql的初始化命令

``` sql
1.mysql5.7版本初始化
/usr/local/mysql/bin/mysqld --initialize --user=mysql

2.mysql5.6版本初始化
/usr/local/mysql/bin/mysql_install_db --user=mysql --basedir=/usr/local/mysql/ --datadir=/db/mysql/data
12345
```

> 参考链接：
> 1、The vervice already exists!-mysql安装服务
> https://blog.csdn.net/snihcel/article/details/9464189

想学习

## 参考文章
* https://blog.csdn.net/weixin_38642130/article/details/84937186
* https://zhuanlan.zhihu.com/p/391779577
* https://www.cnblogs.com/wgwyanfs/p/6970383.html