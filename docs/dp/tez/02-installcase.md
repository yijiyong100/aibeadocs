---
title: Tez-安装部署案例
---

::: tip
本文主要是介绍 Tez-安装部署案例 。
:::

[[toc]]

## hive运行模式

- 1. hive on mapreduce 离线计算（默认）
- 2. hive on tez 　YARN之上支持DAG作业的计算框架
- 3. hive on spark 内存计算


### hive on tez

Tez是一个构建于YARN之上的支持复杂的DAG任务的数据处理框架。它由Hontonworks开源，它把mapreduce的过程拆分成若干个子过程，同时可以把多个mapreduce任务组合成一个较大的DAG任务，减少了mapreduce之间的文件存储，同时合理组合其子过程从而大幅提升MapReduce作业的性能。


## 安装tez

tez的安装有源码安装和二进制包安装，这里使用二进制包安装。

hadoop版本：2.9.1

hive版本：2.1.1

tez版本：0.9.0

前提：hadoop环境已经搭建好，包括yarn（tez需要运行在yarn上）、hive



### 下载

wget http://mirror.bit.edu.cn/apache/tez/0.9.0/apache-tez-0.9.0-bin.tar.gz



### 安装

``` shell
# tar zxvf apache-tez-0.9.0-bin.tar.gz
# mv apache-tez-0.9.0-bin/ tez-0.9.0
# hdfs dfs -mkdir -p /tez-0.9.0
# cd /tez-0.9.0/
# hdfs dfs -put share/tez.tar.gz /tez-0.9.0
```



### 配置tez



``` shell
## cd /data1/hadoop/hadoop/etc/hadoop/
## cat tez-site.xml
```

``` xml
<property>
<name>tez.lib.uris</name>
<value>hdfs://MY-HADOOP/tez-0.9.0/tez.tar.gz</value>    #指定在hdfs上的tez包文件
</property>
<property>
<name>tez.dag.recovery.enabled</name>        #重启DAG，默认true
<value>true</value>
</property>
<property>
<name>tez.dag.recovery.io.buffer.size</name>   #恢复DAG时，使用的缓存大小，默认8192
<value>4096</value>
</property>
<property>
<name>tez.dag.recovery.flush.interval.secs</name>  #刷新间隔时间，默认30s。
<value>60</value>
</property>
<property>
<name>tez.dag.recovery.max.unflushed.events</name>   #刷新到磁盘前最大缓存的事件数量，默认100
<value>100</value>
</property>
<property>
<name>tez.task.heartbeat.timeout.check-ms</name>      #心跳间隔时间，默认30s
<value>10000</value>
</property>
<property>
<name>tez.task.timeout-ms</name>   #任务超时时间，默认300s
<value>300000</value>
</property>
<property>
<name>tez.am.acls.enabled</name>   #ACL权限控制，默认true
<value>true</value>
</property>
<property>
<name>tez.am.client.am.thread-count</name>   #处理客户端请求的线程数量，默认2
<value>50</value>
</property>
<property>
<name>tez.am.containerlauncher.thread-count-limit</name>    #启动容器上线，默认500
<value>500</value>
</property>
<property>
<name>tez.am.dag.scheduler.class</name>
<value>org.apache.tez.dag.app.dag.impl.DAGSchedulerNaturalOrder</value>
</property>
<property>
<name>tez.am.deletion.tracker.class</name>
<value>org.apache.tez.dag.app.launcher.DeletionTrackerImpl</value>
</property>
<property>
<name>tez.am.launch.cmd-opts</name>
<value>-XX:+PrintGCDetails -verbose:gc -XX:+PrintGCTimeStamps -XX:+UseNUMA -XX:+UseParallelGC</value>
</property>
<property>
<name>tez.am.resource.cpu.vcores</name>    #app master 使用的虚拟CPU数量，默认1
<value>2</value>
</property>
<property>
<name>tez.am.resource.memory.mb</name>   #app master使用的内存，默认1024
<value>2048</value>
</property>
<property>
<name>tez.am.am-rm.heartbeat.interval-ms.max</name>   #AM与RM心跳间隔时间，默认是3s
<value>3000</value>
</property>
<property>
<name>tez.am.shuffle.auxiliary-service.id</name>
<value>mapreduce_shuffle</value>
</property>
<property>
<name>tez.am.task.listener.thread-count</name> # 用于侦听任务心跳请求的线程数，默认30
<value>60</value>
</property>
<property>
<name>tez.am.tez-ui.webservice.enable</name>   #用于开启Tez UI的
<value>true</value>
</property>
<property>
<name>tez.client.timeout-ms</name>
<value>30000</value>
</property>
<property>
<name>tez.task.resource.cpu.vcores</name>     #任务使用的CPU数量。默认1
<value>1</value>
</property>
<property>
<name>tez.task.resource.memory.mb</name> #任务使用的内存，默认1024
<value>2048</value>
</property>
<property>
<name>tez.container.max.java.heap.fraction</name>   #容器在jvm中占用的比例，默认0.8，如果内存不足，建议调小该值。
<value>0.2</value>
</property>
</configuration>

参考：/tez-0.9.0/conf/tez-default-template.xml
```





### 环境变量配置（~/.bashrc）



``` ini
添加如下配置
export TEZ_CONF_DIR=$HADOOP_CONF_DIR

export TEZ_JARS=/tez-0.9.0/*:/tez-0.9.0/lib/*

export HADOOP_CLASSPATH=$TEZ_CONF_DIR:$TEZ_JARS:$HADOOP_CLASSPATH

执行"source ~/.bashrc"让环境变量生效。
```





### hadoop版本兼容问题



``` shell
[root@hadoop01 ~]## cd /tez-0.9.0/lib

[root@hadoop01 lib]## rm -rf hadoop-mapreduce-client-core-2.7.0.jar hadoop-mapreduce-client-common-2.7.0.jar

 

[root@hadoop01 lib]## cp /data1/hadoop/hadoop/share/hadoop/mapreduce/hadoop-mapreduce-client-core-2.9.1.jar /tez-0.9.0/lib/

[root@hadoop01 lib]## cp /data1/hadoop/hadoop/share/hadoop/mapreduce/hadoop-mapreduce-client-common-2.9.1.jar /tez-0.9.0/lib/
```





### 启动hive



``` shell
#hive
hive> SET hive.execution.engine=tez;  设置执行引擎为tez，默认是MapReduce
或者修改hive的配置文件hive-site.xml，添加如下配置：
```

``` xml
<property>
<name>hive.user.install.directory</name>
<value>/user/</value>
</property>
<property>
<name>hive.execution.engine</name>  #配置成默认使用tez
<value>tez</value>
</property>
```




### 测试数据



``` sql
创建表
hive> create table user_info(user_id bigint, firstname string, lastname string, count string);
插入数据
hive> insert into user_info values(1,'dennis','hu','CN'),(2,'Json','Lv','Jpn'),(3,'Mike','Lu','USA');
```

``` shell
Query ID = root_20190618043047_bfc41253-60f9-469d-b6a9-c26c93a92e82
Total jobs = 1
Launching Job 1 out of 1
Tez session was closed. Reopening...
Session re-established.


Status: Running (Executing on YARN cluster with App id application_1560826244680_0015)

\----------------------------------------------------------------------------------------------
VERTICES MODE STATUS TOTAL COMPLETED RUNNING PENDING FAILED KILLED
\----------------------------------------------------------------------------------------------
Map 1 .......... container SUCCEEDED 1 1 0 0 0 0
\----------------------------------------------------------------------------------------------
VERTICES: 01/01 [==========================>>] 100% ELAPSED TIME: 4.55 s
\----------------------------------------------------------------------------------------------
Loading data to table default.user_info
OK
Time taken: 9.488 seconds

查询

\> select count(1) from user_info;
Query ID = root_20190618043342_5f83efb4-39bf-4d67-bac4-d67205086ae7
Total jobs = 1
Launching Job 1 out of 1


Status: Running (Executing on YARN cluster with App id application_1560826244680_0015)

\----------------------------------------------------------------------------------------------
VERTICES MODE STATUS TOTAL COMPLETED RUNNING PENDING FAILED KILLED
\----------------------------------------------------------------------------------------------
Map 1 .......... container SUCCEEDED 1 1 0 0 0 0
Reducer 2 ...... container SUCCEEDED 1 1 0 0 0 0
\----------------------------------------------------------------------------------------------
VERTICES: 02/02 [==========================>>] 100% ELAPSED TIME: 4.46 s
\----------------------------------------------------------------------------------------------
OK
9
Time taken: 4.979 seconds, Fetched: 1 row(s)
hive> select count(1) from user_info;
Query ID = root_20190618043349_ecee5657-7c95-43ab-80e9-101dd36d6fc7
Total jobs = 1
Launching Job 1 out of 1


Status: Running (Executing on YARN cluster with App id application_1560826244680_0015)

\----------------------------------------------------------------------------------------------
VERTICES MODE STATUS TOTAL COMPLETED RUNNING PENDING FAILED KILLED
\----------------------------------------------------------------------------------------------
Map 1 .......... container SUCCEEDED 1 1 0 0 0 0
Reducer 2 ...... container SUCCEEDED 1 1 0 0 0 0
\----------------------------------------------------------------------------------------------
VERTICES: 02/02 [==========================>>] 100% ELAPSED TIME: 0.72 s
\----------------------------------------------------------------------------------------------
OK
9
Time taken: 1.156 seconds, Fetched: 1 row(s)
```




### yarn web界面查看

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dp/tez/install-1.png')" alt="wxmp">

 

 由此可看出，引擎类型变成TEZ。

 



##  配置tez-ui



### 修改tez-site.xml文件

添加如下：



``` xml
<property>
   <name>tez.history.logging.service.class</name>
   <value>org.apache.tez.dag.history.logging.ats.ATSHistoryLoggingService</value> 
 </property> 

 <property> 
  <description>URL for where the Tez UI is hosted</description> 
  <name>tez.tez-ui.history-url.base</name> 
  <value>http://master:9999/tez-ui/</value>     #启动tez-ui的地址
 </property>


<property>
<name>tez.allow.disabled.timeline-domains</name>
<value>true</value>
</property>

<property> 
    <name>tez.runtime.convert.user-payload.to.history-text</name> 
    <value>true</value> 
</property> 
<property> 
    <name>tez.task.generate.counters.per.io</name> 
    <value>true</value> 
</property> 
```





### 修改yarn-site.xml文件

添加如下：



``` xml
<property>
    <name>yarn.timeline-service.enabled</name>
    <value>true</value>
</property>
<property>
    <name>yarn.timeline-service.hostname</name>
    <value>master</value>
</property>
<property>
    <name>yarn.timeline-service.http-cross-origin.enabled</name>
    <value>true</value>
</property>
<property>
    <name>yarn.timeline-service.generic-application-history.enabled</name>
    <value>true</value>
</property>
<property>
    <name>yarn.resourcemanager.system-metrics-publisher.enabled</name>
    <value>true</value>
</property>
<property>
  <name>yarn.timeline-service.address</name>
  <value>${yarn.timeline-service.hostname}:10200</value>
</property>

<property>
  <name>yarn.timeline-service.webapp.address</name>
  <value>${yarn.timeline-service.hostname}:8188</value>
</property>

<property>
  <name>yarn.timeline-service.webapp.https.address</name>
  <value>${yarn.timeline-service.hostname}:8190</value>
</property>

<property>
  <description>Handler thread count to serve the client RPC requests.</description>
  <name>yarn.timeline-service.handler-thread-count</name>
  <value>10</value>
</property>
<property>
  <name>yarn.timeline-service.generic-application-history.enabled</name>
  <value>false</value>
</property>

<property>
  <name>yarn.timeline-service.generic-application-history.store-class</name>
  <value>org.apache.hadoop.yarn.server.applicationhistoryservice.FileSystemApplicationHistoryStore</value>
</property>
```





### 拷贝文件

拷贝tez-site.xml和yarn-site.xml文件到其他机器



### 安装tomcat

下载地址：https://tomcat.apache.org/download-80.cgi

1、把Tomcat目录下的webapps里的文件删除，再把把上面的tez-0.9.0 下的tez-ui2-0.9.0.war 复制到webapps目录里



```shell
#mkdir /data1/apache-tomcat-8.5.42/webapps/tez-ui
```

```shell
## cd /data1/apache-tomcat-8.5.42/webapps/tez-ui
#cp /tez-0.9.0/tez-ui-0.9.0.war /data1/apache-tomcat-8.5.42/webapps/tez-ui/tez-ui.war
#unzip tez-ui.war  #解压
#修改当前目录下config/configs.env文件
```

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dp/tez/install-2.png')" alt="wxmp">

 

``` shell
把localhost改成主机名或者ip，同时把前面的//去掉
```



 

2、修改Tomcat的配置文件:service.xml 修改8080端口为9999，也是跟上面的配置一样；

3、由于上面修改过了配置，所以要重新启动HDFS集群和Hive程序；而且还要启动一个叫：timelineserver服务；



```shell
./stop-all.sh     #停止HDFS集群
./start-dfs.sh
./start-yarn.sh
./mr-jobhistory-daemon.sh start historyserver
./yarn-daemon.sh start timelineserver       #必须要先启动HDFS集群后才可以启动起来
```

``` shell
root@master:/data1/apache-tomcat-8.5.42/webapps## jps
101719 Bootstrap   #tomcat服务进程
2551 HMaster
99878 DFSZKFailoverController
102662 JobHistoryServer
94729 RunJar
103561 Jps
94392 RunJar
99275 NameNode
99610 JournalNode
588 QuorumPeerMain
102271 ResourceManager
102798 ApplicationHistoryServer  `#这个就是timelineserver服务`

```



启动hive

``` shell
nohup hive --service metastore &
nohup hive --service hiveserver2 &
```

启动完成以后，访问主机的8088端口和8188端口，如果8088端口访问界面同8088端口要用，就ok，如下：

访问8088端口：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dp/tez/install-3.png')" alt="wxmp">

 

 访问8188端口：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dp/tez/install-4.png')" alt="wxmp">

 

接着去访问主机的9999端口，如下：

浏览器输入：192.168.4.46:9999/tez-ui

尴尬的不是，报错了，界面一直处于loading，网页下面提示的信息如下：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dp/tez/install-5.png')" alt="wxmp">

 分析上面日志里面的url：主机名或者ip为什么是localhost，，我在本地浏览器访问服务器，如果这里是localhost，那肯定不对啊。

我的解决方案：

修改tez-ui的端口，在tez-site.xml文件里面，把下面配置修改成8081端口

``` xml
 <property> 
  <description>URL for where the Tez UI is hosted</description> 
  <name>tez.tez-ui.history-url.base</name> 
  <value>http://master:8081/tez-ui/</value>     #启动tez-ui的地址，原先是9999端口
 </property>
```

 同时，把tomcat下面的service.xml配置文件的端口改成8081，如下：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dp/tez/install-6.png')" alt="wxmp">

 

 接着重新启动yarn和tomcat。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dp/tez/install-7.png')" alt="wxmp">

 

存在的问题：不清楚为什么端口会导致上诉的问题。

借鉴：https://blog.csdn.net/duguyiren3476/article/details/46349177

借鉴：https://blog.csdn.net/gobitan/article/details/85109644

借鉴：http://tez.apache.org/install.html （官网）

借鉴：https://www.58jb.com/html/114.html

## 参考文章
* https://www.cnblogs.com/yjt1993/p/11044578.html