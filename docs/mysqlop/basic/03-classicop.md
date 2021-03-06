---
title: MySQL-运维经典问题
---

::: tip
本文主要是介绍 MySQL-运维经典问题 。
:::

[[toc]]

##  MySQL 数据库管理 + 密码破解 (用户管理+日志管理+数据乱码解决)
### 简介




> 在企业信息化的过程中，数据库中库和表都会大量存在，需要分配给管理者合适的权限进行管理操作。不会给你最高的权限，万一因为一些误操作导致数据丢失就麻烦了！所以说合理的分配权限，可以使数据库管理井然有序，各个管理者只需要关注自己负责 的内容，就可以避免误操作。
> 任何数据库系统都有日志文件，用来记录操作和错误等等信息，这样才会有助于管理、排查错误，保证数据库正常运行。



### 用户管理

**1·新建用户**：

> 新建用户的命令格式：
> CREATE USER ‘username’@‘host’ INDETIFIED BY PASSWORD ‘password’;



<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/mysqlop/basic/commdeal-1.png')" alt="wxmp">



**2·使用密文作为密码创建用户**：

> **mysql> select password(‘123123’);**-----用select 生成一段密文密码
> ±+
> | password(‘123123’) |
> ±+
> | *E56A114692FE0DE073F9A1DD68A00EEB9703F3F1 |
> ±+
> 1 row in set, 1 warning (0.00 sec)
> **mysql> create user ‘lisi’@‘localhost’ identified by password’\*E56A114692FE0DE073F9A1DD68A00EEB9703F3F1’;**



<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/mysqlop/basic/commdeal-2.png')" alt="wxmp">



**3·删除用户**

> 删除用户命令格式：
> DROP USER ‘删除的用户名’@‘允许登陆的地点’;



<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/mysqlop/basic/commdeal-3.png')" alt="wxmp">



**4·重命名用户**：

> 重命名用户的格式：
> RENMAE USER ‘旧用户名’@‘登陆地点’ TO ‘新用户名’@‘登陆地点’;



<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/mysqlop/basic/commdeal-4.png')" alt="wxmp">



**5·修改用户登陆密码**

> （1）修改当前登陆用户密码命令格式：
> SET PASSWORD=PASSWORD(‘密码’);



<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/mysqlop/basic/commdeal-5.png')" alt="wxmp">



> (2)修改其他用户密码命令格式：
> SET PASSWORD FOR ‘需要修改的用户’@‘登陆地点’=PASSWORD(‘密码’);



<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/mysqlop/basic/commdeal-6.png')" alt="wxmp">



### MySQL 密码破解 （5.7版本）

> 在使用MySQL时忘记root密码怎么办，我们可以在主配置文件里面加上一段话，登陆MySQL跳过密码检测，这样我们直接再次修改root密码即可。



> [root@localhost ~]# systemctl stop mysqld.service (停止mysql服务)
> [root@localhost ~]# vim /etc/my.cnf --(进入主配置文件)
>
> [mysqld]
> 加入以下一段话，跳过密码登陆
> skip-grant-tables
> [root@localhost ~]# systemctl start mysqld.service (启动mysql服务)
> [root@localhost ~]# mysql -uroot ----（使用root用户登陆，可以不用密码）
> mysql> update mysql.user set authentication_string=password(‘123123’) where user=‘root’; ---（这样修改root 密码）
> [root@localhost ~]# vim /etc/my.cnf ——（进入主配置文件删除skip-grant-tables）
> [root@localhost ~]# systemctl restart mysqld.service ——（重启服务）



<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/mysqlop/basic/commdeal-7.png')" alt="wxmp">



### 授权控制

> **1· 授予权限使用命令 grant 命令，格式如下**：
> GRANT 给予的权限 ON 库名.表名 TO ‘用户名’@‘登陆的主机’ IDENTIFIED BY ‘密码’;



<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/mysqlop/basic/commdeal-8.png')" alt="wxmp">



> 这里需要注意的是，如果在MySQL中没有wangwu这个用户，则创建用户；如果存在则修改权限，并且密码也同时修改。




**2·查看权限**

> 查看用户拥有的权限命令格式如下：
> SHOW GRANTS FOR ‘用户名’@‘登陆主机’;



<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/mysqlop/basic/commdeal-9.png')" alt="wxmp">



**3·撤销权限**

> 使用 REVOKE 语句可以撤销指定用户的权限，格式如下：
> REVOKE 撤销的权限 ON 数据库名.表名 FROM ‘用户’@‘登陆地址’;



<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/mysqlop/basic/commdeal-10.png')" alt="wxmp">



> **这里需要注意的是：如果需要撤销所有权限则使用，all 关键字**。



### MySQL 日志管理：

**1·错误日志**：

> 主要记录当MySQL 启动和停止时，以及运行中发生任何错误的 相关信息，默认路径保存在 MySQL的安装路径data 文件下。在MySQL配置文件中，可以指定日志文件的保存位子和日志的文件名。log_error=file_name 选项来指定保存错误日志的文件位子。



**2·通用查询日志**

> （1）通用查询日志用来记录MySQL的所有连接和语句，默认是关闭的。使用show 语句可以查询出日志信息。
> mysql> show variables like ‘general%’; -----（查询通用日志状态，是否关闭和路径）
> （2）修改MySQL配置文件的 general_log=ON 选项，可以打开通用查询通用日志，general_log_file=存放路径，定义日志位子



**3·二进制日志**

> （1）二进制日志用来记录所有更新了数据或者已经在更新数据的语句，记录了数据的变更，它的主要目的是在恢复数据是能够最大成都的恢复数据库，它默认是开启的，在data 文件下，数据量大时，它会自动分割成多个文件，以数值作为扩展名。
> （2）因为是 二进制 文件，所以只有机器能识别，人要识别，需要使用MySQL的工具 mysqlbinlog 查看二进制文件
> mysqlbinlog --no-defaults mysql-bin.000001 -----（查看二进制格式范例）



**4·慢日志**

> 慢日志记录所有执行时间超过 long_query_time 秒的SQL 语句，用于找到哪些查询语句执行时间长，以便对其进行优化。默认慢查询日志是关闭的。可以在MySQL主配置文件 使用 slow_query_log=ON 开启慢日志查询



<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/mysqlop/basic/commdeal-11.png')" alt="wxmp">



<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/mysqlop/basic/commdeal-12.png')" alt="wxmp">



> **这里需要注意的是：二进制文件的查看方式需要独立的工具 mysqlbinlog ，格式如下：mysqlbinlog --no-defaults mysql-bin.000001 -----（查看二进制格式范例）**



### MySQL数据乱码：

**乱码产生原因**：

> 1·服务器系统字符设置问题
> 2·数据表语设置的问题。
> 3·客户端连接语系问题



> UTF-8是可变储存长度的字符集，如英文字母只需要一个字节，节省了存储空间，所以数据库中通常采用 UTF-8的字符集。



**MySQL 乱码解决方法**：

> （1）对于MySQL服务器，只要设置存储的字符集为 UTF-8，对应的客户端也使用相同编码，就不会产生乱码。
> （2）修改MySQL配置文件时，在 [client] 部分，加入选项 default-character-set=utf8 ，可以设置字符集，这样就可以统一数据库的字符集，重启后字符集生效，如果有其他的字符集需要使用，再特殊指定。



<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/mysqlop/basic/commdeal-13.png')" alt="wxmp">



### 总结：

1·MySQL 创建用户需要指定权限，all 代表所有权限。
2·忘记 root 密码，可以跳过权限表，登陆MySQL 修改密码。
3·MySQL 日志包括：错误日志、通用查询日志、二进制日志、慢查询日志。
4·MySQL 乱码问题可以采用指定字符集 UTF-8 来解决

## 参考文章
* https://blog.51cto.com/u_13746824/2169381