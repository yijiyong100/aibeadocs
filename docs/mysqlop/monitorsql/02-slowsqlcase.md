---
title: 监控分析-慢SQL案例操作
---

::: tip
本文主要是介绍 监控分析-慢SQL案例操作 。
:::

[[toc]]

对慢SQL优化一般可以按下面几步的思路：

1、开启慢查询日志，设置超过几秒为慢SQL，抓取慢SQL

2、通过explain对慢SQL分析（重点）

3、show profile查询SQL在Mysql服务器里的执行细节和生命周期情况（重点）

4、对数据库服务器的参数调优

## 一、慢查询日志**

### 1、设置慢查询



``` shell
（1）设置开启：SET GLOBAL slow_query_log = 1;　　　#默认未开启，开启会影响性能，mysql重启会失效
（2）查看是否开启：SHOW VARIABLES LIKE '%slow_query_log%';
（3）设置阈值：SET GLOBAL long_query_time=3;
（4）查看阈值：SHOW 【GLOBAL】 VARIABLES LIKE 'long_query_time%';　　#重连或新开一个会话才能看到修改值
（5）通过修改配置文件my.cnf永久生效，在[mysqld]下配置：
　　[mysqld]
　　slow_query_log = 1;　　#开启
　　slow_query_log_file=/var/lib/mysql/atguigu-slow.log　　　#慢日志地址，缺省文件名host_name-slow.log
　　long_query_time=3;　　  #运行时间超过该值的SQL会被记录，默认值>10
　　log_output=FILE　　　　　　　　　　　
```

### 2、获取慢SQL信息　　　



``` shell
查看慢查询日志记录数：SHOW GLOBAL STATUS LIKE '%Slow_queries%';
```

　　模拟语句：select sleep(4);

　　查看日志：cat atguigu-slow.log

 　<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/mysqlop/monitorsql/slowsqlcase-1.png')" alt="wxmp">


### 3、搭配日志分析工具mysqldumpslow



``` shell
mysqldumpslow -s r -t 10 /var/lib/mysql/atguigu-slow.log     #得到返回记录集最多的10个SQL
mysqldumpslow -s c -t 10 /var/lib/mysql/atguigu-slow.log     #得到访问次数最多的10个SQL
mysqldumpslow -s t -t 10 -g "LEFT JOIN" /var/lib/mysql/atguigu-slow.log   #得到按照时间排序的前10条里面含有左连接的查询语句
mysqldumpslow -s r -t 10 /var/lib/mysql/atguigu-slow.log | more      #结合| more使用，防止爆屏情况

s：表示按何种方式排序
c：访问次数
l：锁定时间
r：返回记录
t：查询时间
al：平均锁定时间
ar：平均返回记录数
at：平均查询时间
t：返回前面多少条的数据
g：后边搭配一个正则匹配模式，大小写不敏感
```

## 二、explain分析慢SQL**

　　通过**explain**分析慢SQL很重要，单独一章列举，[MySQL优化(4)：explain分析](https://www.cnblogs.com/zjxiang/p/9160564.html)。

## 三、Show Profile分析慢SQL**

   **Show Profile**也是分析慢SQL的一种手段，但它能获得比explain更详细的信息，能分析当前会话中语句执行的资源消耗情况，能获得这条SQL在整个生命周期的耗时，相当于执行时间的清单，也很重要。

### 1、默认关闭。开启后，会在后台保存最近15次的运行结果，然后通过Show Profile命令查看结果。



``` shell
开启：set profiling = on;
查看：SHOW VARIABLES LIKE 'profiling%';
```

### 2、通过Show Profile能查看SQL的耗时

　　<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/mysqlop/monitorsql/slowsqlcase-2.png')" alt="wxmp">


### 3、通过Query_ID可以得到具体SQL从连接 - 服务 - 引擎 - 存储四层结构完整生命周期的耗时

　　<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/mysqlop/monitorsql/slowsqlcase-3.png')" alt="wxmp">




``` shell
可用参数type:
ALL  　　#显示所有的开销信息
BLOCK IO　　#显示块IO相关开销
CONTEXT SWITCHES　　#上下文切换相关开销
CPU     #显示CPU相关开销信息
IPC     #显示发送和接收相关开销信息
MEMORY　#显示内存相关开销信息
PAGE FAULTS　　#显示页面错误相关开销信息
SOURCE　　#显示和Source_function，Source_file，Source_line相关的开销信息
SWAPS　　#显示交换次数相关开销的信息
```

### 4、出现这四个status时说明有问题，group by可能会创建临时表



``` shell
#危险状态：converting HEAP to MyISAM  　　#查询结果太大，内存不够用了，在往磁盘上搬
Creating tmp table         　　#创建了临时表，回先把数据拷贝到临时表，用完后再删除临时表
Copying to tmp table on disk 　#把内存中临时表复制到磁盘，危险！！！
locked
```

　　<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/mysqlop/monitorsql/slowsqlcase-4.png')" alt="wxmp">


## 四、全局查询日志**

只在测试环境用，别在生产环境用，会记录所有使用过的SQL

### 1、开启：



``` shell
开启：会将sql记录到mysql库的general_log表
    set global general_log=1;
    set global log_output='TABLE';
配置文件的方式：
    在my.cnf中配置
    general_log=1    #开启
    general_log_file=/path/logfile    #记录日志文件的路径
    log_output=FILE    #输出格式
```

### 2、查看



```
select * from mysql.general_log;
```

 　<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/mysqlop/monitorsql/slowsqlcase-5.png')" alt="wxmp">




__EOF__

![img](https://pic.cnblogs.com/avatar/1350843/20180623112544.png)

**本文作者**：**[愿起起起起落起起起起起](https://www.cnblogs.com/zjxiang/p/9157398.html)**

**本文链接**：https://www.cnblogs.com/zjxiang/p/9157398.html

**关于博主**：评论和私信会在第一时间回复。或者[直接私信](https://msg.cnblogs.com/msg/send/zjxiang)我。

**版权声明**：本博客所有文章除特别声明外，均采用 [BY-NC-SA](https://creativecommons.org/licenses/by-nc-nd/4.0/) 许可协议。转载请注明出处！

**声援博主**：如果您觉得文章对您有帮助，可以点击文章右下角**【[推荐](javascript:void(0);)】**一下。您的鼓励是博主的最大动力！

## 参考文章
* https://www.cnblogs.com/zjxiang/p/9157398.html 