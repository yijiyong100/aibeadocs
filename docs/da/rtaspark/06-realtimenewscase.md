---
title: Spark-新闻实时分析案例
---

::: tip
本文主要是介绍 Spark-新闻实时分析案例 。
:::

[[toc]]

## 基于Spark2.x新闻网大数据实时分析可视化系统项目


本次项目是基于企业大数据经典案例项目（大数据日志分析），全方位、全流程讲解 大数据项目的业务分析、技术选型、架构设计、集群规划、安装部署、整合继承与开发和web可视化交互设计。

**项目代码**托管于github，大家可以自行[下载](https://github.com/ZzXxL1994/News_Spark)。
## 一、业务需求分析

1. 捕获用户浏览日志信息
2. 实时分析前20名流量最高的新闻话题
3. 实时统计当前线上已曝光的新闻话题
4. 统计哪个时段用户浏览量最高

## 二、系统架构图设计

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/da/rtaspark/newscase-1.png')" alt="wxmp">

## 三、系统数据流程设计

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/da/rtaspark/newscase-2.png')" alt="wxmp">

## 四、集群资源规划设计

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/da/rtaspark/newscase-3.png')" alt="wxmp">

## 五、步骤详解

考虑到实际情况，本人集群配置共三个节点（node5、node6、node7）。

### 1. Zookeeper分布式集群部署

  参考 [博客](https://blog.csdn.net/u011254180/article/details/79480234)

### 2. Hadoop2.X HA架构与部署

  参考 [博客](https://blog.csdn.net/u011254180/article/details/77922331)

### 3. HBase分布式集群部署与设计

  参考 [博客](https://blog.csdn.net/u011254180/article/details/80171500)

### 4. Kafka分布式集群部署

  参考 [博客](https://blog.csdn.net/u011254180/article/details/79481088)

### 5. Flume部署及数据采集准备

  参考 [博客](https://blog.csdn.net/u011254180/article/details/80000763)，node6与node7中flume数据采集到node5中，而且node6和node7的flume配置文件大致相同，node7中将a2改为a3，如下

```ini
a2.sources = r1
a2.sinks = k1
a2.channels = c1

a2.sources.r1.type = exec
a2.sources.r1.command = tail -F /opt/data/weblog-flume.log
a2.sources.r1.channels = c1

a2.channels.c1.type = memory
a2.channels.c1.capacity = 1000
a2.channels.c1.transactionCapacity = 1000
a2.channels.c1.keep-alive = 5

a2.sinks.k1.type = avro
a2.sinks.k1.channel = c1
a2.sinks.k1.hostname = node5
a2.sinks.k1.port = 5555
```

### 6. Flume+HBase+Kafka集成与开发

- 1. 下载Flume源码并导入Idea开发工具

  1）将apache-flume-1.7.0-src.tar.gz源码下载到本地解压

  2）通过idea导入flume源码

  打开idea开发工具，选择File——》Open

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/da/rtaspark/newscase-4.png')" alt="wxmp">

  然后找到flume源码解压文件，选中flume-ng-hbase-sink，点击ok加载相应模块的源码。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/da/rtaspark/newscase-5.png')" alt="wxmp">

- 2. 官方flume与hbase集成的参数介绍

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/da/rtaspark/newscase-6.png')" alt="wxmp">

- 3. 下载日志数据并分析

到搜狗实验室 [下载](http://www.sogou.com/labs/resource/q.php)用户查询日志

  1）介绍

  搜索引擎查询日志库设计为包括约1个月(2008年6月)Sogou搜索引擎部分网页查询需求及用户点击情况的网页查询日志数据集合。为进行中文搜索引擎用户行为分析的研究者提供基准研究语料。

  2）格式说明

  数据格式为:访问时间\t用户ID\t[查询词]\t该URL在返回结果中的排名\t用户点击的顺序号\t用户点击的URL

  其中，用户ID是根据用户使用浏览器访问搜索引擎时的Cookie信息自动赋值，即同一次使用浏览器输入的不同查询对应同一个用户ID

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/da/rtaspark/newscase-7.png')" alt="wxmp">

- 4. node5聚合节点与HBase和Kafka的集成配置

  node5通过flume接收node6与node7中flume传来的数据，并将其分别发送至hbase与kafka中，配置内容如下

```ini
a1.sources = r1
a1.channels = kafkaC hbaseC
a1.sinks = kafkaSink hbaseSink

a1.sources.r1.type = avro       
a1.sources.r1.channels = hbaseC kafkaC
a1.sources.r1.bind = node5
a1.sources.r1.port = 5555 
a1.sources.r1.threads = 5 

#****************************flume + hbase****************************** 
a1.channels.hbaseC.type = memory
a1.channels.hbaseC.capacity = 10000
a1.channels.hbaseC.transactionCapacity = 10000
a1.channels.hbaseC.keep-alive = 20

a1.sinks.hbaseSink.type = asynchbase
a1.sinks.hbaseSink.table = weblogs
a1.sinks.hbaseSink.columnFamily = info
a1.sinks.hbaseSink.serializer = org.apache.flume.sink.hbase.KfkAsyncHbaseEventSerializer
a1.sinks.hbaseSink.channel = hbaseC
a1.sinks.hbaseSink.serializer.payloadColumn = datetime,userid,searchname,retorder,cliorder,cliurl

#****************************flume + kafka******************************
a1.channels.kafkaC.type = memory
a1.channels.kafkaC.capacity = 10000
a1.channels.kafkaC.transactionCapacity = 10000
a1.channels.kafkaC.keep-alive = 20

a1.sinks.kafkaSink.channel = kafkaC
a1.sinks.kafkaSink.type = org.apache.flume.sink.kafka.KafkaSink
a1.sinks.kafkaSink.brokerList = node5:9092,node6:9092,node7:9092
a1.sinks.kafkaSink.topic = weblogs
a1.sinks.kafkaSink.zookeeperConnect = node5:2181,node6:2181,node7:2181
a1.sinks.kafkaSink.requiredAcks = 1
a1.sinks.kafkaSink.batchSize = 1
a1.sinks.kafkaSink.serializer.class = kafka.serializer.StringEncoder
```

- 5. 对日志数据进行格式处理

  1）将文件中的tab更换成逗号

```shell
cat weblog.log|tr "\t" "," > weblog.log
```

  2）将文件中的空格更换成逗号

```shell
cat weblog2.log|tr " " "," > weblog.log
```

- 6. 自定义SinkHBase程序设计与开发

  1）模仿SimpleAsyncHbaseEventSerializer自定义KfkAsyncHbaseEventSerializer实现类，修改一下代码即可。

```java
@Override
public List<PutRequest> getActions() {
    List<PutRequest> actions = new ArrayList<PutRequest>();
    if (payloadColumn != null) {
        byte[] rowKey;
        try {
            /*---------------------------代码修改开始---------------------------------*/
            // 解析列字段
            String[] columns = new String(this.payloadColumn).split(",");
            // 解析flume采集过来的每行的值
            String[] values = new String(this.payload).split(",");
            for(int i=0;i < columns.length;i++){
                byte[] colColumn = columns[i].getBytes();
                byte[] colValue = values[i].getBytes(Charsets.UTF_8);
 
                // 数据校验：字段和值是否对应
                if(colColumn.length != colValue.length) break;
 
                // 时间
                String datetime = values[0].toString();
                // 用户id
                String userid = values[1].toString();
                // 根据业务自定义Rowkey
                rowKey = SimpleRowKeyGenerator.getKfkRowKey(userid,datetime);
                // 插入数据
                PutRequest putRequest =  new PutRequest(table, rowKey, cf,
                            colColumn, colValue);
                actions.add(putRequest);
            /*---------------------------代码修改结束---------------------------------*/
            }
 
        } catch (Exception e) {
                throw new FlumeException("Could not get row key!", e);
        }
    }
    return actions;
}
```

  2）在SimpleRowKeyGenerator类中，根据具体业务自定义Rowkey生成方法

```java
public static byte[] getKfkRowKey(String userid, String datetime) throws UnsupportedEncodingException {
    return (userid + "-" + datetime + "-" + String.valueOf(System.currentTimeMillis())).getBytes("UTF8");
}
```

- 7. 自定义编译程序打jar包

1）在idea工具中，选择File——》ProjectStructrue

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/da/rtaspark/newscase-8.png')" alt="wxmp">

2）左侧选中Artifacts，然后点击右侧的+号，最后选择JAR——》From modules with dependencies

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/da/rtaspark/newscase-9.png')" alt="wxmp">

3）然后直接点击ok

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/da/rtaspark/newscase-10.png')" alt="wxmp">

4）删除其他依赖包，只把flume-ng-hbase-sink打成jar包就可以了。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/da/rtaspark/newscase-11.png')" alt="wxmp">

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/da/rtaspark/newscase-12.png')" alt="wxmp">

5）然后依次点击apply，ok

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/da/rtaspark/newscase-13.png')" alt="wxmp">

6）点击build进行编译，会自动打成jar包

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/da/rtaspark/newscase-14.png')" alt="wxmp">

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/da/rtaspark/newscase-15.png')" alt="wxmp">

7）到项目的apache-flume-1.7.0-src\flume-ng-sinks\flume-ng-hbase-sink\classes\artifacts\flume_ng_hbase_sink_jar目录下找到刚刚打的jar包

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/da/rtaspark/newscase-16.png')" alt="wxmp">

8）将打包名字替换为flume自带的包名flume-ng-hbase-sink-1.7.0.jar ，然后上传至flume/lib目录下，覆盖原有的jar包即可。

### 7. 数据采集/存储/分发完整流程测试

- 1. 在idea开发工具中构建weblogs项目，编写数据生成模拟程序。

```java
package main.java;
 
import java.io.*;
public class ReadWrite {
 
    static String readFileName;
    static String writeFileName;
 
    public static void main(String args[]){
        readFileName = args[0];
        writeFileName = args[1];
        try {
            // readInput();
            readFileByLines(readFileName);
        }catch(Exception e){
        }
    }
 
    public static void readFileByLines(String fileName) {
        FileInputStream fis = null;
        InputStreamReader isr = null;
        BufferedReader br = null;
        String tempString = null;
        try {
            System.out.println("以行为单位读取文件内容，一次读一整行：");
            fis = new FileInputStream(fileName);// FileInputStream
            // 从文件系统中的某个文件中获取字节
            isr = new InputStreamReader(fis,"GBK");
            br = new BufferedReader(isr);
            int count=0;
            while ((tempString = br.readLine()) != null) {
                count++;
                // 显示行号
                Thread.sleep(300);
                String str = new String(tempString.getBytes("UTF8"),"GBK");
                System.out.println("row:"+count+">>>>>>>>"+tempString);
                method1(writeFileName,tempString);
                //appendMethodA(writeFileName,tempString);
            }
            isr.close();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (InterruptedException e) {
            e.printStackTrace();
        } finally {
            if (isr != null) {
                try {
                    isr.close();
                } catch (IOException e1) {
                }
            }
        }
    }
 
    public static void method1(String file, String conent) {
        BufferedWriter out = null;
        try {
            out = new BufferedWriter(new OutputStreamWriter(
                    new FileOutputStream(file, true)));
            out.write("\n");
            out.write(conent);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                out.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}
```

- 2. 参照前面idea工具项目打包方式，将该项目打成weblogs.jar包，然后上传至bigdata-pro01.kfk.com节点的/opt/jars目录下（目录需要提前创建）

- 3. 将weblogs.jar分发到另外两个节点（node6和node7）

  1）在另外两个节点上分别创建/opt/jars目录

```shell
mkdir /opt/jars
```

  2）将weblogs.jar分发到另外两个节点

```shell
scp weblogs.jar node6:/opt/jars/
scp weblogs.jar node7:/opt/jars/
```

- 4. 编写运行模拟程序的shell脚本

  在node6和node7节点的/opt/datas目录下，创建weblog-shell.sh脚本。内容为

```shell
#/bin/bash
echo "start log......"
#第一个参数是原日志文件，第二个参数是日志生成输出文件
java -jar /opt/jars/weblogs.jar /opt/datas/weblog.log /opt/datas/weblog-flume.log
```

  修改weblog-shell.sh可执行权限

```java
chmod 777 weblog-shell.sh
```

- 5. 编写启动flume服务程序的shell脚本

  在各节点的flume安装目录下编写flume启动脚本flume-kfk-start.sh。

  下面是node5中的配置写法，node6与node7中将a1分别改为a2和a3。

```shell
#/bin/bash
echo "flume-1 start ......"
bin/flume-ng agent --conf conf -f conf/flume-conf.properties -n a1 -Dflume.root.logger=INFO,console
```

- 6. 编写Kafka Consumer执行脚本kfk-test-consumer.sh。

```java
#/bin/bash
echo "kfk-kafka-consumer.sh start......"
bin/kafka-console-consumer.sh --zookeeper node5:2181,node6:2181,node7:2181 --from-beginning --topic weblogs
```

- 7. 将kfk-test-consumer.sh脚本分发另外两个节点

```java
scp kfk-test-consumer.sh node6:/opt/modules/kakfa_2.11-0.8.2.1/
scp kfk-test-consumer.sh node7:/opt/modules/kakfa_2.11-0.8.2.1/
```

- 8. 启动模拟程序并测试

  在node6节点启动日志产生脚本，模拟产生日志是否正常。

```shell
/opt/datas/weblog-shell.sh
```

- 9. 启动数据采集所有服务

  1）启动Zookeeper服务

  2）启动hdfs服务

  3）启动HBase服务

  创建hbase业务表

```sql
create 'weblogs','info'
```

  4）启动Kafka服务，并创建业务数据topic

```java
bin/kafka-server-start.sh config/server.properties &

bin/kafka-topics.sh --create --zookeeper node5:2181,node6:2181,node7:2181 --topic weblogs --partitions 1 --replication-factor 3
```

- 10. 完成数据采集全流程测试

  1）在node5节点上启动flume聚合脚本，将采集的数据分发到Kafka集群和hbase集群。

```shell
./flume-kfk-start.sh
```

  2）在node6和node7节点上完成数据采集。

  （1）使用shell脚本模拟日志产生

```shell
cd /opt/datas/
./weblog-shell.sh
```

  （2）启动flume采集日志数据发送给聚合节点

```shell
./flume-kfk-start.sh
```

  3）启动Kafka Consumer查看flume日志采集情况

```shell
bin/kafka-console-consumer.sh --zookeeper localhost:2181 --topic weblogs --from-beginning
```

  4）查看hbase数据写入情况

```shell
./hbase-shell
count 'weblogs'
```

### 8. MySQL安装

  参考[博客](https://blog.csdn.net/u011254180/article/details/77893585)

### 9. Hive与HBase集成进行数据分析

- 1. Hive安装（本地mysql模式），参考 [博客](https://blog.csdn.net/u011254180/article/details/78068897)

- 2. Hive与HBase集成

  1）在hive-site.xml文件中配置Zookeeper，hive通过这个参数去连接HBase集群。

```xml
<property>
    <name>hbase.zookeeper.quorum</name>   
    <value>node5,node6,node7</value>
</property>
```

  2）将hbase的9个包拷贝到hive/lib目录下。如果是CDH版本，已经集成好不需要导包。

```shell
export HBASE_HOME=/opt/modules/hbase-0.98.6-cdh5.3.0
export HIVE_HOME=/opt/modules/hive-0.13.1/lib
ln -s $HBASE_HOME/lib/hbase-server-0.98.6-cdh5.3.0.jar $HIVE_HOME/lib/hbase-server-0.98.6-cdh5.3.0.jar
ln -s $HBASE_HOME/lib/hbase-client-0.98.6-cdh5.3.0.jar $HIVE_HOME/lib/hbase-client-0.98.6-cdh5.3.0.jar
ln -s $HBASE_HOME/lib/hbase-protocol-0.98.6-cdh5.3.0.jar $HIVE_HOME/lib/hbase-protocol-0.98.6-cdh5.3.0.jar 
ln -s $HBASE_HOME/lib/hbase-it-0.98.6-cdh5.3.0.jar $HIVE_HOME/lib/hbase-it-0.98.6-cdh5.3.0.jar 
ln -s $HBASE_HOME/lib/htrace-core-2.04.jar$HIVE_HOME/lib/htrace-core-2.04.jar
ln -s $HBASE_HOME/lib/hbase-hadoop2-compact-0.98.6-cdh5.3.0.jar $HIVE_HOME/lib/hbase-hadoop2-compact-0.98.6-cdh5.3.0.jar 
ln -s $HBASE_HOME/lib/hbase-hadoop-compact-0.98.6-cdh5.3.0.jar $HIVE_HOME/lib/hbase-hadoop-compact-0.98.6-cdh5.3.0.jar 
ln -s $HBASE_HOME/lib/high-scale-lib-1.1.1.jar $HIVE_HOME/lib/high-scale-lib-1.1.1.jar 
ln -s $HBASE_HOME/lib/hbase-common-0.98.6-cdh5.3.0.jar $HIVE_HOME/lib/hbase-common-0.98.6-cdh5.3.0.jar 
```

  3）在hive中创建与hbase集成的外部表

```sql
CREATE EXTERNAL TABLE weblogs(
id string,
datetime string,
userid string,
searchname string,
retorder string,
cliorder string,
cliurl string
)
STORED BY 'org.apache.hadoop.hive.hbase.HBaseStorageHandler'
WITH SERDEPROPERTIES("hbase.columns.mapping"=
":key,info:datetime,info:userid,info:searchname,info:retorder,info:cliorder,info:cliurl")
TBLPROPERTIES("hbase.table.name"="weblogs");
 
#查看hbase数据记录
select count(*) from weblogs;
```

  4）hive中beeline和hiveserver2的使用

```shell
## 启动hiveserver2
bin/hiveserver2
## 启动beeline
bin/beeline
## 连接hive2服务
!connect jdbc:hive2//node7.kfk.com:10000
## 查看表
show tables;
## 查看前10条数据
select * from weblogs limit 10;
```

### 10. Cloudera HUE大数据可视化分析

  参考 [博客](https://blog.csdn.net/u011254180/article/details/80178771)

### 11. Spark2.X环境准备、编译部署及运行

  参考 [博客](https://blog.csdn.net/u011254180/article/details/80179911)，搭建spark集群参考 [博客](https://blog.csdn.net/u011254180/article/details/79381172)

### 12. Spark SQL快速离线数据分析

- 1. Spark SQL 与Hive集成（spark-shell），参考 [博客](https://blog.csdn.net/u011254180/article/details/79395227)
- 2. Spark SQL 与Hive集成（spark-sql），参考 [博客](https://blog.csdn.net/u011254180/article/details/79395227)
- 3. Spark SQL之ThriftServer和beeline使用，参考 [博客](https://blog.csdn.net/u011254180/article/details/79395227)

- 4. Spark SQL与MySQL集成，参考 [博客](https://blog.csdn.net/u011254180/article/details/79395227)

- 5. Spark SQL与HBase集成，参考 [博客](https://blog.csdn.net/u011254180/article/details/79395227)

### 13. Structured Streaming业务数据实时分析

- 1. Structured Streaming与kafka集成

  1）Structured Streaming是Spark2.2.0新推出的，要求kafka的版本0.10.0及以上。集成时需将如下的包拷贝到Spark的jar包目录下。

```java
kafka_2.11-0.10.1.0.jar
kafka-clients-0.10.1.0.jar
spark-sql-kafka-0-10_2.11-2.2.0.jar
spark-streaming-kafka-0-10_2.11-2.1.0.jar
```

  2）与kafka集成代码

```java
val df = spark
      .readStream
      .format("kafka")
      .option("kafka.bootstrap.servers", "node5:9092")
      .option("subscribe", "weblogs")
      .load()

import spark.implicits._
val lines = df.selectExpr("CAST(value AS STRING)").as[String]
```

- 2. Structured Streaming与MySQL集成

  1）mysql创建相应的数据库和数据表，用于接收数据

```sql
create database test;
use test;
 
CREATE TABLE `webCount` (
    `titleName` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
    `count` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
```

  2）与mysql集成代码

```java
val url ="jdbc:mysql://node5:3306/test"
    val username="root"
    val password="1234"

    val writer = new JDBCSink(url,username,password)
    val query = titleCount.writeStream
      .foreach(writer)      
      .outputMode("update")
      .trigger(ProcessingTime("5 seconds"))
      .start()
```

- 3. Structured Streaming向mysql数据库写入中文乱码解决

  修改数据库文件my.cnf（linux下）

```ini
[client]
socket=/var/lib/mysql/mysql.sock    //添加
default-character-set=utf8          //添加
[mysqld]
character-set-server=utf8           //添加
datadir=/var/lib/mysql
socket=/var/lib/mysql/mysql.sock
user=mysql
## Disabling symbolic-links is recommended to prevent assorted security risks
symbolic-links=0
[mysqld_safe]
log-error=/var/log/mysqld.log
pid-file=/var/run/mysqld/mysqld.pid
```

### 14. 大数据Web可视化分析系统开发

1. 基于业务需求的WEB系统设计（具体参照代码）

2. 基于Echart框架的页面展示层开发

1）echart、JQuery下载

2）页面效果图选取及代码实现

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/da/rtaspark/newscase-17.png')" alt="wxmp">

1. 工程编译并打包发布

  参照之前将的idea打包方式，将spark web项目打包发布。

4. 启动各个服务
``` shell
1）启动zookeeper： zkServer.sh start

2）启动hadoop： start-all.sh

3）启动hbase： start-hbase

4）启动mysql： service mysqld start

5）node6（node7）启动flume： flume-kfk-start.sh，将数据发送到node5中

6）node5启动flume： flume-kfk-start.sh，将数据分别传到hbase和kafka中

7）启动kafka-0.10(最好三台都启动，不然易出错)：
```

```shell
bin/kafka-server-start.sh config/server.properties > kafka.log 2>&1 & 
```

8）启动node6(node7)中的脚本：weblog-shell.sh

9）启动 StructuredStreamingKafka来从kafka中取得数据，处理后存到mysql中

10）启动web项目（sparkStu），该项目会从mysql数据库中读取数据展示到页面

1. 最终项目运行效果

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/da/rtaspark/newscase-18.png')" alt="wxmp">


## 参考文章
* https://blog.csdn.net/u011254180/article/details/80172452