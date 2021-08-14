---
title: 读写分离-MyCat分库分表
---

::: tip
本文主要是介绍 读写分离-MyCat分库分表 。
:::

[[toc]]

## MyCat使用教程

## 前言


本文以实际操作为主，理论性比较少，主要包含mycat安装，mysql主从复制，mycat垂直分库，mycat水平分表等系列操作，希望对有机会接触到mycat的朋友一些启发。

## mycat安装

1、安装mysql5.7并导入数据

使用Navicat导入以下数据。
[shop_db.sql](https://links.jianshu.com/go?to=https%3A%2F%2Fdownload.csdn.net%2Fdownload%2Fqq_16192007%2F12383698)

2、下载并解压mycat



```bash
wget http://dl.mycat.io/1.6.7.4/Mycat-server-1.6.7.4-release/Mycat-server-1.6.7.4-release-20200105164103-linux.tar.gz
```

3、安装java7以上环境

此步骤各位可以网络搜索，此处略过。

4、新建mycat运行系统账号



```bash
adduser mycat
chown mycat:mycat -R mycat/
```

5、修改mycat启动参数

在mycat的conf目录下找到vi wrapper.conf

修改其中的运行内存为合适值，默认的是2G，最好是按照本机的情况来



```ini
wrapper.java.additional.4=-XX:MaxDirectMemorySize=512M
```

6、配置环境变量



```bash
vi /etc/profile  

## 添加：
MYCAT_HOME=/usr/local/mycat
export PATH=${MYCAT_HOME}/bin:${PATH}

## 最后：
source /etc/profile ## 使环境变量生效
```

## 【垂直分库】

## 1、分析数据表与业务之间的关系

首先对项目的业务需求要十分清晰，确定哪些模块哪些表是否需要分库，考虑表数据量是否很大，并发等问题，进而确定哪些表需要分库分表。
下面是一个例子：


<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/mysqlop/rwseperateprin/mycatcase-1.png')" alt="wxmp">



## 2、mysql主从数据库复制

项目一开始往往是一个数据库来弄的，随着业务量特别大的时候才会考虑分库分表。那么如何将原来的数据同步到另外一个新的数据库呢，这就是接下来要说的**mysql主从复制**。

### 2.1、导出当前数据库的数据



```bash
mysqldump --master-data=2 --single-transaction --routines --triggers --events -uroot -p order_db > bak_shop_db.sql
```

其中--master-data=2是为了记录事务日志点。

如果遇到以下问题：



```bash
mysqldump: Error: Binlogging on server not active
```

解决方案:

vi /etc/my.cnf
在[mysqld]标签下添加:



```bash
[mysqld]
log-bin=mysql-bin
server-id=1
```

### 2.2、将bak_shop_db.sql复制到其他的服务器



```bash
scp bak_shop_db.sql root@192.168.56.11:/root
scp bak_shop_db.sql root@192.168.56.12:/root
scp bak_shop_db.sql root@192.168.56.13:/root
```

### 2.3、导入数据

现以订单order_db（192.168.56.11）为例：
在mysql命令行中导入



```bash
mysql -uroot -p -e"create database order_db"
mysql -uroot -p order_db < bak_shop_db.sql
```

### 2.4、创建同步用户

建议添加一个同步用的用户，这样子比较安全点。



```bash
create user 'im_repl'@'192.168.56.%' identified by '123456';
grant replication slave on . to 'im_repl'@'192.168.56.%'
```

### 2.5、 在从数据库服务建立复制链路

建立主从复制链路



```bash
change master to master_host='192.168.56.10',master_user='im_repl',master_password='123456',MASTER_LOG_FILE='mysql-bin.000002', MASTER_LOG_POS=154;

change replication filter replicate_rewrite_db=((shop_db,order_db))
```

其中的MASTER_LOG_FILE和MASTER_LOG_POS值在bak_shop_db.sql中，表示导出的时间点。因为你导出sql的时候，有可能主数据库一直有数据增加，那么从数据库开始复制应该从什么时候开始复制呢，所以这两个参数的作用就是解决这个问题的。（这一小节的第1点是关键。）

**如果从数据库名和主数据库名不一样的话，可以考虑在从数据库中运行：**



```bash
change replication filter replicate_rewrite_db=((主数据库名,从数据库名))
```

### 2.6、启动slave服务

在mysql命令行中输入



```bash
start slave;show slave status \G
```

可能遇到问题如下：



```bash
Slave_IO_Running: No  ### 此处应该是Yes，才代表成功。
Slave_SQL_Running: Yes

启动失败，如果是以下错误：
Last_IO_Error: Fatal error: The slave I/O thread stops because master and slave have equal MySQL server UUIDs; these UUIDs must be different for replication to work.
```

原因：检查发现他们的auto.cnf中的server-uuid是一样的。因为复制的mysql才会出现这种情况。

解决办法：



```cpp
vi /var/lib/mysql/auto.cnf
修改它的id值.

然后重启mysql服务
systemctl restart mysqld
```

### 2.7、验证是否主从同步。

在主库（192.168.56.10）中修改数据，再看看从库是否已经同步修改了。



```bash
update order_detail set product_name='迪奥999' where order_detail_id = 1;
```

至此，mysql的主从同步已经成功了!!! _

## 3、mycat垂直分库配置

### 3.1、创建mycat用户并赋予增删改查的权限。



```bash
create user im_mycat@'192.168.56.%' identified by '123456';
grant select,insert,update,delete on . to im_mycat@'192.168.56.%';
```

### 3.2、配置schema.xml

关于配置文件的解析可以阅读我的上一篇文章或者《mycat权威指南》



```xml
<?xml version="1.0"?>
<!DOCTYPE mycat:schema SYSTEM "schema.dtd">
<mycat:schema xmlns:mycat="http://io.mycat/">
    
    <schema name="shop_db" checkSQLschema="false" sqlMaxLimit="100">
        
        <table name="region_info" primaryKey="region_id" dataNode="orddb,custdb,prodb" type="global"/>
        
        <table name="order_cart" primaryKey="cart_id" dataNode="orddb" />
        <table name="order_customer_addr" primaryKey="customer_addr_id" dataNode="orddb" />
        <table name="order_detail" primaryKey="order_detail_id" dataNode="orddb" />
        <table name="order_master" primaryKey="order_id" dataNode="orddb" />
        
        <table name="customer_balance_log" primaryKey="balance_id" dataNode="custdb" />
        <table name="customer_inf" primaryKey="customer_inf_id" dataNode="custdb" />
        <table name="customer_level_inf" primaryKey="customer_level" dataNode="custdb" />
        <table name="customer_login" primaryKey="customer_id" dataNode="custdb" />
        <table name="customer_login_log" primaryKey="login_id" dataNode="custdb" />
        <table name="customer_point_log" primaryKey="point_id" dataNode="custdb" />
        
        <table name="product_brand_info" primaryKey="brand_id" dataNode="prodb" />
        <table name="product_category" primaryKey="category_id" dataNode="prodb" />
        <table name="product_comment" primaryKey="comment_id" dataNode="prodb" />
        <table name="product_info" primaryKey="product_id" dataNode="prodb" />
        <table name="product_supplier_info" primaryKey="supplier_id" dataNode="prodb" />
        
    </schema>

    <dataNode name="orddb" dataHost="mysql11" database="order_db" />
    <dataNode name="custdb" dataHost="mysql12" database="customer_db" />
    <dataNode name="prodb" dataHost="mysql13" database="product_db" />
    
    <dataHost name="mysql11" maxCon="1000" minCon="10" balance="3" writeType="0" dbType="mysql" dbDriver="native" switchType="1">
        <heartbeat>select user()</heartbeat>
        <writeHost host="192.168.56.11" url="192.168.56.11:3306" user="im_mycat" password="123456" />
    </dataHost>
    
    <dataHost name="mysql12" maxCon="1000" minCon="10" balance="3" writeType="0" dbType="mysql" dbDriver="native" switchType="1">
        <heartbeat>select user()</heartbeat>
        <writeHost host="192.168.56.12" url="192.168.56.12:3306" user="im_mycat" password="123456" />
    </dataHost>
    
    
    <dataHost name="mysql13" maxCon="1000" minCon="10" balance="3" writeType="0" dbType="mysql" dbDriver="native" switchType="1">
        <heartbeat>select user()</heartbeat>
        <writeHost host="192.168.56.13" url="192.168.56.13:3306" user="im_mycat" password="123456" />
    </dataHost>
    
</mycat:schema>
```

### 3.3、配置server.xml

关于配置文件的解析可以阅读我的上一篇文章或者《mycat权威指南》



```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mycat:server SYSTEM "server.dtd">
<mycat:server xmlns:mycat="http://io.mycat/">
    <system>
        <property name="serverPort">8066</property>
        <property name="managerPort">9066</property>
        <property name="nonePasswordLogin">0</property>
        <property name="bindIp">0.0.0.0</property>
        <property name="frontWriteQueueSize">2048</property>
        
        <property name="charset">utf8</property>
        <property name="txIsolation">2</property>
        <property name="processors">8</property> 
        <property name="idleTimeout">1800000</property> 
        <property name="useSqlStat">0</property> <!-- 1为开启实时统计、0为关闭 -->
        <property name="useGlobleTableCheck">0</property>  <!-- 1为开启全加班一致性检测、0为关闭 -->
        <property name="sqlExecuteTimeout">300</property>  <!-- SQL 执行超时 单位:秒-->
        <property name="sequnceHandlerType">2</property>
        <property name="defaultMaxLimit">100</property>
        <property name="maxPacketSize">104857600</property>
    </system>
    
    <user name="root" defaultAccount="true">
        <property name="password">123456</property>
        <!--只配置逻辑库与schema的name值对应，对外-->
        <property name="schemas">shop_db</property>
    </user>
</mycat:server>
```

## 4、通过mycat访问数据库



```bash
 mysql -uroot -p123456 -P8066 -h192.168.56.10
```

查看逻辑数据库中的表的数据是否存在

## 5、删除多余的数据表

### 5.1、需要停止原先的主从同步。

在mysql控制台命令行输入



```dart
show slave status \G
stop slave;
reset slave all;
show slave status \G
```

### 5.2、保留每个分库的表，删除其他多余的数据表。

比如：订单库可以删除用户和商品相关的表。

## 6、配置全局表

### 6.1、复制全局表到各个节点。

6.2、配置schema.xml



```xml
<table name="region_info" primaryKey="region_id" dataNode="orddb,custdb,prodb" type="global"/>
```

## 【水平分表】

## 1、确定需要水平切分的表

业务量特别大，数据随着时间会越来越多数据的表，比如订单表。

## 2、选择合适分片键和分片算法

分片键（主键）选择原则：

- 1、尽可能均匀分布在各个节点（尽量是唯一性）；
- 2、查询时使用最频繁的或重要条件

分片算法选择：

- 1、尽可能将数据均匀分布在各个节点

## 3、使用mycat水平分片

### 3.1、schema.xml配置逻辑库和逻辑表



```xml
<?xml version="1.0"?>
<!DOCTYPE mycat:schema SYSTEM "schema.dtd">
<mycat:schema xmlns:mycat="http://io.mycat/">
    
    <schema name="shop_db" checkSQLschema="false" sqlMaxLimit="100">
        
        <table name="region_info" primaryKey="region_id" dataNode="orddb,custdb,prodb" type="global"/>
        
        <table name="order_cart" primaryKey="cart_id" dataNode="orddb" />
        <table name="order_customer_addr" primaryKey="customer_addr_id" dataNode="orddb" />
        <table name="order_detail" primaryKey="order_detail_id" dataNode="orddb" />
        
        <!-- 水平分片,分片规则（在rule.xml）：order_master -->
        <table name="order_master" primaryKey="order_id" dataNode="orddb01,orddb02,orddb03,orddb04" rule="order_master" />
        
        <table name="customer_balance_log" primaryKey="balance_id" dataNode="custdb" />
        <table name="customer_inf" primaryKey="customer_inf_id" dataNode="custdb" />
        <table name="customer_level_inf" primaryKey="customer_level" dataNode="custdb" />
        <table name="customer_login" primaryKey="customer_id" dataNode="custdb" />
        <table name="customer_login_log" primaryKey="login_id" dataNode="custdb" />
        <table name="customer_point_log" primaryKey="point_id" dataNode="custdb" />
        
        <table name="product_brand_info" primaryKey="brand_id" dataNode="prodb" />
        <table name="product_category" primaryKey="category_id" dataNode="prodb" />
        <table name="product_comment" primaryKey="comment_id" dataNode="prodb" />
        <table name="product_info" primaryKey="product_id" dataNode="prodb" />
        <table name="product_supplier_info" primaryKey="supplier_id" dataNode="prodb" />
        
    </schema>

    <dataNode name="orddb" dataHost="mysql11" database="order_db" />
    <dataNode name="custdb" dataHost="mysql12" database="customer_db" />
    <dataNode name="prodb" dataHost="mysql13" database="product_db" />
    
    <!-- 水平分片 -->
    <dataNode name="orddb01" dataHost="mysql11" database="orddb01" />
    <dataNode name="orddb02" dataHost="mysql11" database="orddb02" />
    <dataNode name="orddb03" dataHost="mysql12" database="orddb01" />
    <dataNode name="orddb04" dataHost="mysql13" database="orddb01" />


    
    
    
    <dataHost name="mysql13" maxCon="1000" minCon="10" balance="3" writeType="0" dbType="mysql" dbDriver="native" switchType="1">
        <heartbeat>select user()</heartbeat>
        <writeHost host="192.168.56.13" url="192.168.56.13:3306" user="im_mycat" password="123456" />
    </dataHost>
    
    <dataHost name="mysql11" maxCon="1000" minCon="10" balance="3" writeType="0" dbType="mysql" dbDriver="native" switchType="1">
        <heartbeat>select user()</heartbeat>
        <writeHost host="192.168.56.11" url="192.168.56.11:3306" user="im_mycat" password="123456" />
    </dataHost>
    
    
    <dataHost name="mysql12" maxCon="1000" minCon="10" balance="3" writeType="0" dbType="mysql" dbDriver="native" switchType="1">
        <heartbeat>select user()</heartbeat>
        <writeHost host="192.168.56.12" url="192.168.56.12:3306" user="im_mycat" password="123456" />
    </dataHost>
    
</mycat:schema>
```

### 3.2、rule.xml配置分片规则



```xml
<?xml version="1.0" encoding="UTF-8"?>
<!-- - - Licensed under the Apache License, Version 2.0 (the "License"); 
    - you may not use this file except in compliance with the License. - You 
    may obtain a copy of the License at - - http://www.apache.org/licenses/LICENSE-2.0 
    - - Unless required by applicable law or agreed to in writing, software - 
    distributed under the License is distributed on an "AS IS" BASIS, - WITHOUT 
    WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. - See the 
    License for the specific language governing permissions and - limitations 
    under the License. -->
<!DOCTYPE mycat:rule SYSTEM "rule.dtd">
<mycat:rule xmlns:mycat="http://io.mycat/">
    <tableRule name="order_master">
        <rule>
                        <!-- 分片键customer_id -->
            <columns>customer_id</columns>
            <algorithm>mod-long</algorithm>
        </rule>
    </tableRule>

    <function name="mod-long" class="io.mycat.route.function.PartitionByMod">
        <!-- how many data nodes -->
        <property name="count">4</property>
    </function>
    
</mycat:rule>
```

至此水平分表已经完成了80%，但是这里会有2个问题：

1、order_id如果是自增长的，那么现在就无法保证整体的order_id是唯一的。

2、如果order_master表与其他关联表order_detail进行join操作是没法实现的。

## 4、 配置全局自增长id

1、创建一个mycat数据库，找到mycat的配置目录中的dbseq.sql
然后导入



```bash
 mysql -uroot -p mycat < dbseq.sql
```

2、接着需要修改server.xml中的sequnceHandlerType=1



```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mycat:server SYSTEM "server.dtd">
<mycat:server xmlns:mycat="http://io.mycat/">
    <system>
        <property name="serverPort">8066</property>
        <property name="managerPort">9066</property>
        <property name="nonePasswordLogin">0</property>
        <property name="bindIp">0.0.0.0</property>
        <property name="frontWriteQueueSize">2048</property>
        
        <property name="charset">utf8</property>
        <property name="txIsolation">2</property>
        <property name="processors">8</property> 
        <property name="idleTimeout">1800000</property> 
        <property name="useSqlStat">0</property> <!-- 1为开启实时统计、0为关闭 -->
        <property name="useGlobleTableCheck">0</property>  <!-- 1为开启全加班一致性检测、0为关闭 -->
        <property name="sqlExecuteTimeout">300</property>  <!-- SQL 执行超时 单位:秒-->
        <property name="sequnceHandlerType">1</property> <!-- 全局id生成规则，1指的是使用数据库的方式 -->
        <property name="defaultMaxLimit">100</property>
        <property name="maxPacketSize">104857600</property>
    </system>
    
    <user name="root" defaultAccount="true">
        <property name="password">123456</property>
        <!--只配置逻辑库，对外-->
        <property name="schemas">shop_db</property>
    </user>
</mycat:server>
```

3、找到mycat的配置文件sequence_db_conf.properties，增加配置如下：



```ini
#sequence stored in datanode
GLOBAL=mycat
ORDER_MASTER=mycat
```

4、需要在mycat数据库的MYCAT_SEQUENCE表中增加一条记录



```sql
INSERT INTO ``MYCAT_SEQUENCE`(`name`, `current_value`, `increment`) VALUES ('ORDER_MASTER', 1, 1);
```

5、修改schema.xml中逻辑表的自增长属性autoIncrement=true



```xml
<table name="order_master" primaryKey="order_id" dataNode="orddb01,orddb02,orddb03,orddb04" rule="order_master" autoIncrement="true"/>
```

6、重启mycat插入数据即可。

如果遇到以下问题：



```rust
ERROR 1003 (HY000): mycat sequnce err.java.lang.RuntimeException: can't fetch sequnce in db,sequnce :ORDER_MASTER detail:execute command denied to user 'im_mycat'@'192.168.56.%' for routine 'mycat.mycat_seq_nextval'
```

表示im_mycat用户没有权限使用函数，所以要给他有权限执行。



```sql
grant execute on *.* to im_mycat@'192.168.56.%';
flush privileges;
show grants for im_mycat@'192.168.56.%';
```

重启mycat，执行插入数据。

## 5、 ER分片表操作

ER是什么东西？通俗来说就是一个表跟另外一个表有外键关联关系或者密切关系。

**主要是当sql中有join操作的时候，需要将相关数据分到同一个分片中**。

1、在相应的分片节点都要加上数据表，如order_detail

2、修改schema.xml中的配置



```xml
<?xml version="1.0"?>
<!DOCTYPE mycat:schema SYSTEM "schema.dtd">
<mycat:schema xmlns:mycat="http://io.mycat/">
    
    <schema name="shop_db" checkSQLschema="false" sqlMaxLimit="100">
        
        <table name="region_info" primaryKey="region_id" dataNode="orddb,custdb,prodb" type="global"/>
        
        <table name="order_cart" primaryKey="cart_id" dataNode="orddb" />
        <table name="order_customer_addr" primaryKey="customer_addr_id" dataNode="orddb" />
        <!--
        <table name="order_detail" primaryKey="order_detail_id" dataNode="orddb" />
        -->
        <!-- 水平分片 -->
        <table name="order_master" primaryKey="order_id" dataNode="orddb01,orddb02,orddb03,orddb04" rule="order_master" autoIncrement="true"/>
        
        <!-- ER分片表-->
        <table name="order_master" primaryKey="order_id" dataNode="orddb01,orddb02,orddb03,orddb04" rule="order_master" autoIncrement="true">
            <childTable name="order_detail" primaryKey="order_detail_id" joinKey="order_id" parentKey="order_id" autoIncrement="true" />
        </table>

        <table name="customer_balance_log" primaryKey="balance_id" dataNode="custdb" />
        <table name="customer_inf" primaryKey="customer_inf_id" dataNode="custdb" />
        <table name="customer_level_inf" primaryKey="customer_level" dataNode="custdb" />
        <table name="customer_login" primaryKey="customer_id" dataNode="custdb" />
        <table name="customer_login_log" primaryKey="login_id" dataNode="custdb" />
        <table name="customer_point_log" primaryKey="point_id" dataNode="custdb" />
        
        <table name="product_brand_info" primaryKey="brand_id" dataNode="prodb" />
        <table name="product_category" primaryKey="category_id" dataNode="prodb" />
        <table name="product_comment" primaryKey="comment_id" dataNode="prodb" />
        <table name="product_info" primaryKey="product_id" dataNode="prodb" />
        <table name="product_supplier_info" primaryKey="supplier_id" dataNode="prodb" />
        
    </schema>

    <dataNode name="orddb" dataHost="mysql11" database="order_db" />
    <dataNode name="custdb" dataHost="mysql12" database="customer_db" />
    <dataNode name="prodb" dataHost="mysql13" database="product_db" />
    
    <!-- 水平分片 -->
    <dataNode name="orddb01" dataHost="mysql11" database="orddb01" />
    <dataNode name="orddb02" dataHost="mysql11" database="orddb02" />
    <dataNode name="orddb03" dataHost="mysql12" database="orddb01" />
    <dataNode name="orddb04" dataHost="mysql13" database="orddb01" />

    <!-- 全局自增id-->
    <dataNode name="mycat" dataHost="mysql10" database="mycat" />
    
    
    
    <dataHost name="mysql10" maxCon="1000" minCon="10" balance="3" writeType="0" dbType="mysql" dbDriver="native" switchType="1">
        <heartbeat>select user()</heartbeat>
        <writeHost host="192.168.56.10" url="192.168.56.10:3306" user="im_mycat" password="123456" />
    </dataHost>
    
    <dataHost name="mysql11" maxCon="1000" minCon="10" balance="3" writeType="0" dbType="mysql" dbDriver="native" switchType="1">
        <heartbeat>select user()</heartbeat>
        <writeHost host="192.168.56.11" url="192.168.56.11:3306" user="im_mycat" password="123456" />
    </dataHost>
    
    
    <dataHost name="mysql12" maxCon="1000" minCon="10" balance="3" writeType="0" dbType="mysql" dbDriver="native" switchType="1">
        <heartbeat>select user()</heartbeat>
        <writeHost host="192.168.56.12" url="192.168.56.12:3306" user="im_mycat" password="123456" />
    </dataHost>
    <dataHost name="mysql13" maxCon="1000" minCon="10" balance="3" writeType="0" dbType="mysql" dbDriver="native" switchType="1">
        <heartbeat>select user()</heartbeat>
        <writeHost host="192.168.56.13" url="192.168.56.13:3306" user="im_mycat" password="123456" />
    </dataHost>
</mycat:schema>
```

3、因为配置了order_detail的是配置自增长，所以需要参考配置全局自增id的操作即可。

4、重启mycat即可。



## 参考文章
* https://www.jianshu.com/p/32e0f2dfcaf5