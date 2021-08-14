---
title: 读写分离-MyCat介绍
---

::: tip
本文主要是介绍 读写分离-MyCat介绍 。
:::

[[toc]]

## Mycat -- 数据库中间件

## 基础介绍
官网：http://www.mycat.io/

历史：2012年，阿里巴巴开源Cobar；2013年，Leaderus 基于Cobar开发出 Mycat

## 功能和原理
功能：读写分离，读负载均衡，高可用（心跳检测，故障切换），垂直拆分（分库），水平分片（分表）

原理：作为代理，拦截SQL语句，做特定的分析（分片分析、路由分析、读写分离分析、缓存分析等），然后将此SQL发往后端的真实数据库，并将返回的结果做适当的处理，最终再返回给用户

## 概念
- 逻辑仓库：schema，客户端看到的db
- 主备仓库：dataNode，主从数据库集群里的同名（主备）db
- 主从集群：dataHost，主从数据库集群master-slave
- 具体数据库：writeHost，readHost，实际存储数据的rds

## Linux安装
- 1、到官网上下载tar.gz，放到 /usr，tar -zxvf 解压
- 2、在/etc/profile 设置环境变量：export MYCAT_HOME=/usr/mycat；source /etc/profile
- 3、启停：bin/mycat start；bin/mycat stop；bin/mycat restart；bin/mycat status
- 4、访问 mysql -uroot -p123456 -hlocalhost -P8066 # 用户密码在conf/server.xml中配置

### Mycat配置

逻辑库和逻辑表的定义：conf/schema.xml



```xml
<!-- 逻辑仓库定义，对应一个主备仓库 -->
<schema name="user" checkSQLschema="false" sqlMaxLimit="100" dataNode="user" />

<schema name="pay"  checkSQLschema="false" sqlMaxLimit="100" dataNode="pay" > <!-- table配置不命中时，这里的dataNode才有用 -->
    <!-- 不同的表访问不同的主备仓库，对客户端来说是还一个逻辑仓库，从而实现对客户端透明的垂直拆分 -->
    <table name="balance" dataNode="balance"/>
    <!-- 一个表可用对应多个主备仓库，实现水平分片 --> 
    <table name="order" dataNode="pay1,pay2" rule="rule1"/> <!-- 指定水平分片规则 -->
</schema>

<!-- 主备仓库定义 -->
<dataNode name="user" dataHost="host" database="user" />
<dataNode name="pay1" dataHost="host" database="pay1" />
<dataNode name="pay2" dataHost="host" database="pay2" />

<!-- 主从集群定义 -->
<dataHost name="host" maxCon="1000" minCon="10" balance="1" writeType="0" dbType="mysql" dbDriver="native">
   <heartbeat>select 1</heartbeat> <!-- 心跳检测命令 -->
   <!-- 多个写数据库实现高可用（故障切换），以下具体数据库需要部署成主从复制集群（Replication、PXC、MHA） -->
   <writeHost host="hostM1" url="192.168.0.1:3306" user="root" password="root">
      <!-- 多个从节点实现读负载均衡 -->
      <readHost host="hostM2" url="192.168.0.2:3306" user="root" password="root" />
      <readHost host="hostM3" url="192.168.0.3:3306" user="root" password="root" />
   </writeHost>
   <!-- hostM1出现故障时，写操作会切换到hostM4，但是hostM3跟随的仍然是hostM1，即无法进行主从切换，需要配合MHA实现高可用 -->
   <writeHost host="hostM4" url="192.168.0.3:3306" user="root" password="root" />
</dataHost>
```

分片规则配置 ：conf/rule.xml



```xml
  <tableRule name="rule1">
    <rule>
       <columns>user_id</columns>  <!-- 分片字段 -->
       <algorithm>func1</algorithm>  <!-- 分片算法 -->
    </rule>
  </tableRule>
  <function name="func1" class="org.opencloudb.route.function.PartitionByLong">
     <property name="partitionCount">2</property>
     <property name="partitionLength">512</property>
  </function>
```

Mycat服务器配置：conf/server.xml



```xml
   <system>
    <property name="serverPort">3306</property> <!-- SQL端口 -->
        <property name="managerPort">9066</property> <!-- 管理端口 -->
    </system> 
 <user name="root">  <!-- 访问Mycat的用户 -->
        <property name="password">123456</property>
        <property name="schemas">TESTDB</property> <!-- 能访问的schema -->
 </user>
```

### 全局序列号

- 公共全局序列号：select next value for MYCATSEQ_GLOBAL
- 某字段全局系列号：select next value for MYCATSEQ_*
- 插入记录时引用全局系列号：insert into tb2(id,name) values(next value for MYCATSEQ_MY, 'hogen');

### Mycat管理

连接：mysql -uroot -p123456 -hlocalhost -P9066

#### Mycat日志

配置：cong/log4j2.xml



## 参考文章
* https://www.jianshu.com/p/e1b11d49b9e2