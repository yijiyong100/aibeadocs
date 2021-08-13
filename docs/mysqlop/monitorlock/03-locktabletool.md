---
title: 监控分析-监控锁表工具
---

::: tip
本文主要是介绍 监控分析-监控锁表工具 。
:::

[[toc]]

## mysql监控锁表的工具

最近无意发现了mysql的客户端监控工具“Nero Profile SQL”，刚开始还不知道怎么使用，经过半小时摸索，现将使用步骤写下来。

　　背景：开发的时候，如果数据存储层这块使用EF，或者其他orm框架，数据库是mysql，想知道最终执行的sql语句，那么这款工具就帮你忙了。

### 1、去官网下载安装windows版本http://www.profilesql.com/download/

### 2、安装完成，连接mysql数据库

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/mysqlop/monitorlock/tool-1.png')" alt="wxmp">

 

### 3、修改程序里面的连接字符串

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/mysqlop/monitorlock/tool-2.png')" alt="wxmp">

　　　我的理解是，Nero Profile SQL工具接管了mysql数据库的某部分权限并且分配出程序的访问地址以及端口，这里是127.0.0.1以及4040端口

 

### 4、执行数据库操作

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/mysqlop/monitorlock/tool-3.png')" alt="wxmp">

 

### 5、打开监控工具

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/mysqlop/monitorlock/tool-4.png')" alt="wxmp">

 

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/mysqlop/monitorlock/tool-5.png')" alt="wxmp">

 

   这个工具是不是很强大。

 
 ### 6、注意事项：

　　**注意：MySQL 5.7.17版本，安装在windows服务器上面不需要改\**MySQL\** 任何配置；**

　　　　 **经实测，如安装在linux上面，则需要禁用MySQL 的 useSSL 功能，对应的配置是 skip_ssl；**

　　　　 **或者在连接字符串后面加上 SSL Mode=None 也是可以正常运行的。**

## 参考文章
* https://www.cnblogs.com/jingzhi-sksk/p/12172693.html