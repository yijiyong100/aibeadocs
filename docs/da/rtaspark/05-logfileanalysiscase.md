---
title: Spark-日志文件分析案例
---

::: tip
本文主要是介绍 Spark-日志文件分析案例 。
:::

[[toc]]

## Spark数据分析及处理（实战分析）

## 项目需求：使用Spark完成下列日志分析项目需求：
- 1.日志数据清洗
- 2.用户留存分析

### 1.数据清洗

#### 读入日志文件并转化为RDD[Row]类型

- 按照Tab切割数据
- 过滤掉字段数量少于8个的

#### 对数据进行清洗

- 按照第一列和第二列对数据进行去重
- 过滤掉状态码非200
- 过滤掉event_time为空的数据
- 将url按照”&”以及”=”切割

#### 保存数据

- 将数据写入mysql表中

代码分析如下：

日志如下图片，分析日志，处理需求

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/da/rtaspark/logcase-1.png')" alt="wxmp">

```sql
   //spark操作外部数据
    val spark = SparkSession.builder()
      .master("local[*]")
      .appName("clear").getOrCreate()
    val sc = spark.sparkContext
    import spark.implicits._
    //将工作中的要分析的日志导入到spark中
    val linesRdd = sc.textFile("D:\\360Downloads\\scala\\test.log")
//    println(linesRdd.count())
    //需求1：按空格切分
    val line1 = linesRdd.map(x=>x.split("\t"))
    //需求2：过滤掉字段数量少于8个的
    val rdd = line1.filter(x => x.length == 8).map(x =>Row (x(0).trim, x(1).trim //trim去除两边空格的作用
      , x(2).trim, x(3).trim,
      x(4).trim, x(5).trim,
      x(6).trim, x(7).trim))
//    rdd.collect().foreach(println)
   //处理成数据表的形式
    val schema = StructType(Array(
      StructField("event_time", StringType),
      StructField("url", StringType),
      StructField("method", StringType),
      StructField("status", StringType),
      StructField("sip", StringType),
      StructField("user_uip", StringType),
      StructField("action_prepend", StringType),
      StructField("action_client", StringType)))
   val df1 = spark.createDataFrame(rdd,schema)
    df1.show(10,true)
```

结果如下：
<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/da/rtaspark/logcase-2.png')" alt="wxmp">

数据清洗需求：第一列和第二列对数据去重，过滤掉非200，过滤掉event_time为空的数据

```sql
println("-------对数据清洗开始-----------")
  //按照第一列和第二列对数据去重，过滤掉非200，过滤掉event_time为空的数据
    val ds1 = df1.dropDuplicates("event_time", "url")
      .filter(x => x(3) == "200")
//等同上一步骤  .filter(x => StringUtils.isNotEmpty(x(0).toString))
      .filter(x=>x(0).equals("")==false)
    ds1.show(10,true)
```

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/da/rtaspark/logcase-3.png')" alt="wxmp">

继续细化分，对url里的数据进行划分，重新生成一张新的表

## `需求：将url按照”&”以及”=”切割`

```sql
    val dfDetail = ds1.map(row => {
      val urlArray = row.getAs[String]("url").split("\\?")
      //      val ur2 = row(1).toString.split("\\?")
      
      var map = Map("params" -> "null")
      if (urlArray.length == 2) {
        map = urlArray(1)
          .split("&").map(x => x.split("="))
          .filter(_.length == 2).map(x => (x(0), x(1)))
          .toMap
      }

      (row.getAs[String]("event_time"),
        map.getOrElse("actionBegin", ""),
        map.getOrElse("actionClient", ""),
        map.getOrElse("actionEnd", ""),
        map.getOrElse("actionName", ""),
        map.getOrElse("actionTest", ""),
        map.getOrElse("actionType", ""),
        map.getOrElse("actionValue", ""),
        map.getOrElse("clientType",""),
        map.getOrElse("examType",""),
        map.getOrElse("ifEquipment",""),
        map.getOrElse("questionId", ""),
        map.getOrElse("skillIdCount", ""),
        map.getOrElse("userSID", ""),
        map.getOrElse("userUID", ""),
        map.getOrElse("userUIP", ""),
        row.getAs[String]("method"),
        row.getAs[String]("status"),
        row.getAs[String]("sip"),
        row.getAs[String]("user_uip"),
        row.getAs[String]("action_prepend"),
        row.getAs[String]("action_client")
      )
    }).toDF()
   //一定要对应上面的get后的数据
//    dfDetail.show(1)
    val detailRdd = dfDetail.rdd
    val detailschema = StructType(Array(
      StructField("event_time", StringType),
      StructField("actionBegin", StringType),
      StructField("actionClient", StringType),
      StructField("actionEnd",  StringType),
      StructField("actionName", StringType),
      StructField("actionTest",  StringType),
      StructField("actionType",  StringType),
      StructField("actionValue",  StringType),
      StructField("clientType", StringType),
      StructField("examType",  StringType),
      StructField("ifEquipment", StringType),
      StructField("questionId",  StringType),
      StructField("skillIdCount",  StringType),
      StructField("userSID", StringType),
      StructField("userUID",  StringType),
      StructField("userUIP", StringType),
      StructField("method", StringType),
      StructField("status", StringType),
      StructField("sip", StringType),
      StructField("user_uip", StringType),
      StructField("action_prepend", StringType),
      StructField("action_client", StringType)))
  

    val dforgDF = spark.createDataFrame(detailRdd,detailschema)
    dforgDF.show(3,false)
```

结果如下：
<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/da/rtaspark/logcase-4.png')" alt="wxmp">

## 需求：将数据写入mysql表中

连接mysql数据库，写入数据

```sql
  val url="jdbc:mysql://192.168.195.20:3306/kb09db"
    val prop=new Properties()
    prop.setProperty("user","root")
    prop.setProperty("password","ok")
    prop.setProperty("driver","com.mysql.jdbc.Driver")
    prop.setProperty("url",url)
     println("开始写入MySQL")
    dforgDF.write.mode("overwrite").jdbc(url,"logDetail",prop)
    println("写入MySQL结束")
```

运行结束，登录MySQL，查看数据库的表是否已写入

## 需求分析：求当天新增用户总数n

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/da/rtaspark/logcase-5.png')" alt="wxmp">

``` shell
注：
日志分析内容如下：（截取其中一篇日志）
event_time: 2018-09-04T20:27:31+08:00
url:http://datacenter.bdqn.cn/logs/user?actionBegin=1536150451617&actionClient=Mozilla%2F5.0+%28Windows+NT+6.1%3B+WOW64%29+AppleWebKit%2F537.36+%28KHTML%2C+like+Gecko%29+Chrome%2F63.0.3239.132+Safari%2F537.36&actionEnd=1536150451705&actionName=viewQuestionAnalysis&actionTest=0&actionType=3&actionValue=272878&clientType=001_bdqn&examType=001&ifEquipment=web&questionId=32415&skillIdCount=0&userSID=EDEC6A9CF8220BE663A22BDD13E428E7.exam-tomcat-node3.exam-tomcat-node3&userUID=272878&userUIP=117.152.82.106
method: GET
status: 200
sip: 192.168.168.63
user_uip : -
action_prepend : -
Apache-HttpClient/4.1.2
action_client: (java 1.5)

url:
http://datacenter.bdqn.cn/logs/user?
actionBegin=1536150451617
actionClient=Mozilla%2F5.0+%28Windows+NT+6.1%3B+WOW64%29+AppleWebKit%2F537.36+%28KHTML%2C+like+Gecko%29+Chrome%2F63.0.3239.132+Safari%2F537.36
actionEnd=1536150451705
actionName=viewQuestionAnalysis
actionTest=0
actionType=3
actionValue=272878
clientType=001_bdqn
examType=001
ifEquipment=web
questionId=32415
skillIdCount=0
userSID=EDEC6A9CF8220BE663A22BDD13E428E7.exam-tomcat-node3.exam-tomcat-node3
userUID=272878
userUIP=117.152.82.106

actionBegin
actionClient
actionEnd
actionName
actionTest
actionType
actionValue
clientType
examType
ifEquipment
questionId
skillIdCount
userSID
userUID
userUIP
```


## 参考文章
* https://blog.csdn.net/weixin_49165958/article/details/109782015