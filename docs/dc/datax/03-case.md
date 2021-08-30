---
title: DataX-同步案例
---

::: tip
本文主要是介绍 DataX-同步案例 。
:::

[[toc]]


## DataX 增量同步数据

## [Datax UDF手册](https://links.jianshu.com/go?to=https%3A%2F%2Fgithub.com%2Falibaba%2FDataX%2Fblob%2Fmaster%2Ftransformer%2Fdoc%2Ftransformer.md)

### datax.py mongodb2mysql_inc.json
```json
{
  "job": {
    "setting": {
      "speed": {
        "channel": 4
      }
    },
    "content": [{
      "reader": {
        "name": "mongodbreader",
        "parameter": {
          "address": ["*.*.*.*:27017"],
          "userName": "DataXTest",
          "userPassword": "123456",
          "dbName": "weixin",
          "collectionName": "fileids_wxpy",
          "column": [{
            "index":0,
            "name": "_id",
            "type": "string"
          }, {
            "index":1,
            "name": "crawler_time",
            "type": "string"
          }, {
            "index":2,
            "name": "file_url",
            "type": "string"
          }, {
            "index":3,
            "name": "flag",
            "type": "string"
          }, {
            "index":4,
            "name": "logo_url",
            "type": "string"
          }, {
            "index":5,
            "name": "source",
            "type": "string"
          }, {
            "index":6,
            "name": "update_date",
            "type": "string"
          }, {
            "index":7,
            "name": "update_time",
            "type": "long"
          }, {
            "index":8,
            "name": "wx_id",
            "type": "string"
          }, {
            "index":9,
            "name": "wx_name",
            "type": "string"
          }]
        }
      },
       "writer": {
                    "name": "mysqlwriter", 
                    "parameter": {
                        "column": [
                        "id",
                        "crawler_time",
                        "file_url",
                        "flag",
                        "logo_url",
                        "source",
                        "update_date",
                        "update_time",
                        "wx_id",
                        "wx_name"
            ], 
                        "connection": [
                            {
                                "jdbcUrl": "jdbc:mysql://*.*.*.*:3306/weixin?characterEncoding=utf8", 
                                "table": ["fileids_wxpy"]
                            }
                        ], 
                        "password": "123456", 
                        "username": "root"
                    }
                },
                "transformer": [
                    {
                        "name": "dx_filter",
                        "parameter": 
                            {
                            "columnIndex":1,
                            "paras":["<","1560493441"]
                            }  
                    }
                ]
    }]
  }
}
```

### 运行
```shell
# python 环境为2.7
python datax.py mongodb2mysql_inc.json
```

### 运行结果
```shell
2019-06-14 15:22:58.886 [job-0] INFO  JobContainer - PerfTrace not enable!
2019-06-14 15:22:58.886 [job-0] INFO  StandAloneJobContainerCommunicator - Total 53 records, 18669 bytes | Speed 93B/s, 0 records/s | Error 0 records, 0 bytes |  All Task WaitWriterTime 0.000s |  All Task WaitReaderTime 0.000s | Transfermor Success 51848 records | Transformer Error 0 records | Transformer Filter 51795 records | Transformer usedTime 0.000s | Percentage 100.00%
2019-06-14 15:22:58.887 [job-0] INFO  JobContainer - 
任务启动时刻                    : 2019-06-14 15:19:37
任务结束时刻                    : 2019-06-14 15:22:58
任务总计耗时                    :                201s
任务平均流量                    :               93B/s
记录写入速度                    :              0rec/s
读出记录总数                    :                  53
读写失败总数                    :                   0

2019-06-14 15:22:58.887 [job-0] INFO  JobContainer - 
Transformer成功记录总数         :               51848
Transformer失败记录总数         :                   0
Transformer过滤记录总数         :               51795
```

### 扩展： 定时同步实现

- mysql_max_timestamp2csv.json
```json
{
    "job": {
        "content": [
            {
                "reader": {
                    "name": "mysqlreader",
                    "parameter": {
                        "connection": [
                            {
                                "jdbcUrl": ["jdbc:mysql://*.*.*.*:x:3306/weixin?characterEncoding=utf8"], 
                                "querySql": [
                                    "SELECT max(crawler_time) FROM fileids_wxpy"
                                ]
                            }
                        ], 
                        "password": "123456", 
                        "username": "root"
                    }
                },
                "writer": {
                    "name": "txtfilewriter",
                    "parameter": {
                        "fileName": "mysql_max_timestamp_result",
                        "fileFormat": "csv",
                        "path": "/root/datax/bin",
                        "writeMode": "truncate"
                    }
                }
            }
        ],
        "setting": { 
            "speed": {
                    "channel": 2
                }
        }
    }
}
```

- datax.py mongodb2mysql_inc.json(这里与上面的同名文件只有过滤条件时间戳不同，此处固定为"timestamp",方便shell脚本替换更新)
```json
{
  "job": {
    "setting": {
      "speed": {
        "channel": 4
      }
    },
    "content": [{
      "reader": {
        "name": "mongodbreader",
        "parameter": {
          "address": ["*.*.*.*:27017"],
          "userName": "DataXTest",
          "userPassword": "123456",
          "dbName": "weixin",
          "collectionName": "fileids_wxpy",
          "column": [{
            "index":0,
            "name": "_id",
            "type": "string"
          }, {
            "index":1,
            "name": "crawler_time",
            "type": "string"
          }, {
            "index":2,
            "name": "file_url",
            "type": "string"
          }, {
            "index":3,
            "name": "flag",
            "type": "string"
          }, {
            "index":4,
            "name": "logo_url",
            "type": "string"
          }, {
            "index":5,
            "name": "source",
            "type": "string"
          }, {
            "index":6,
            "name": "update_date",
            "type": "string"
          }, {
            "index":7,
            "name": "update_time",
            "type": "long"
          }, {
            "index":8,
            "name": "wx_id",
            "type": "string"
          }, {
            "index":9,
            "name": "wx_name",
            "type": "string"
          }]
        }
      },
       "writer": {
                    "name": "mysqlwriter", 
                    "parameter": {
                        "column": [
                        "id",
                        "crawler_time",
                        "file_url",
                        "flag",
                        "logo_url",
                        "source",
                        "update_date",
                        "update_time",
                        "wx_id",
                        "wx_name"
            ], 
                        "connection": [
                            {
                                "jdbcUrl": "jdbc:mysql://*.*.*.*:3306/weixin?characterEncoding=utf8", 
                                "table": ["fileids_wxpy"]
                            }
                        ], 
                        "password": "123456", 
                        "username": "root"
                    }
                },
                "transformer": [
                    {
                        "name": "dx_filter",
                        "parameter": 
                            {
                            "columnIndex":1,
                            "paras":["<","timestamp"]
                            }  
                    }
                ]
    }]
  }
}
```

- cron_datax_mongodb2mysql.sh
```shell
python2 /root/datax/bin/datax.py /root/datax/bin/mysql_max_timestamp2csv.json
# $?是shell变量,表示"最后一次执行命令"的退出状态.0为成功,非0为失败, -ne 为不等于
if [ $? -ne 0 ]; then
  echo "minute_data_sync.sh error, can not get max_time from target db!"
  exit 1
fi
# 找到 DataX 写入的文本文件，并将内容读取到一个变量中
RESULT_FILE=`ls /root/datax/bin/mysql_max_timestamp_result_*`
MAX_TIME=`cat $RESULT_FILE`
echo "$RESULT_FILE   $MAX_TIME"
# 如果最大时间戳不为 null 的话， 修改全部同步的配置，进行增量更新；
if [ "$MAX_TIME" != "null" ]; then
  # 设置增量更新过滤条件
  WHERE="$MAX_TIME"
  # 将timestamp字符串替换为上次同步的最大时间戳
  sed "s/timestamp/$WHERE/g" mongodb2mysql_inc.json > mongodb2mysql_inc_tmp.json
  #echo "增量更新"
  python2 /root/datax/bin/datax.py /root/datax/bin/mongodb2mysql_inc_tmp.json
  # 删除临时文件
  rm ./mongodb2mysql_inc_tmp.json
else
  # echo "全部更新"
  python2 /root/datax/bin/datax.py /root/datax/bin/mongodb2mysql.json
fi
```

- 通过linux 自带的crontab进行定时管理
```shell
30 22 * * * cd /root/datax/bin && sh cron_datax_mongodb2mysql.sh >>/root/datax/bin/cron_datax_mongodb2mysql.log
```

- 定时运行日志
```shell
vim /root/datax/bin/cron_datax_mongodb2mysql.log
······
2019-06-14 17:14:36.178 [job-0] INFO  JobContainer - PerfTrace not enable!
2019-06-14 17:14:36.178 [job-0] INFO  StandAloneJobContainerCommunicator - Total 65 records, 22919 bytes | Speed 114B/s, 0 records/s | Error 1 records, 350 bytes |  All Task WaitWriterTime 0.000s |  All Task WaitReaderTime 171.039s | Transfermor Success 52013 records | Transformer Error 0 records | Transformer Filter 51948 records | Transformer usedTime 0.000s | Percentage 100.00%
2019-06-14 17:14:36.179 [job-0] INFO  JobContainer -
任务启动时刻                    : 2019-06-14 17:11:13
任务结束时刻                    : 2019-06-14 17:14:36
任务总计耗时                    :                202s
任务平均流量                    :              114B/s
记录写入速度                    :              0rec/s
读出记录总数                    :                  65
读写失败总数                    :                   1

2019-06-14 17:14:36.179 [job-0] INFO  JobContainer -
Transformer成功记录总数         :               52013
Transformer失败记录总数         :                   0
Transformer过滤记录总数         :               51948
```

### 总结

- 优点： 就不说了，太多了
- 缺点：缺乏对增量更新的内置支持，但因为DataX的灵活架构，可以通过shell脚本等方式方便实现增量同步

> 对于DataX中支持querySql语法的源数据库推荐参考下文[使用 DataX 增量同步数据](https://links.jianshu.com/go?to=https%3A%2F%2Fbeginor.github.io%2F2018%2F06%2F29%2Fincremental-sync-with-datax.html),从数据源头过滤数据，可以很好的提高同步效率

## 【----------------------------】


## DATAX （原理， 增量全量同步数据实践）


## 理解

datax每张表都需要对应的配置文件。

Reader：数据采集模块，负责采集数据源的数据，将数据发送给Framework。

Writer：数据写入模块，负责不断向Framework取数据，并将数据写入到目的端。

Framework：用于连接reader和writer，作为两者的数据传输通道，并处理缓冲，流控，并发，数据转换等核心技术问题。

datax底层是以双缓冲阻塞队列为整个数据交换的媒介,读进程负责读取并向队列中添加读到的记录，写进程负责接收数据并从队列中取出写入记录。

 

## MYSQL -> MYSQL  (增量，全量)


1.先创建2张mysql数据表
``` sql
 数据源

 1.CREATE DATABASE /*!32312 IF NOT EXISTS*/`userdb` /*!40100 DEFAULT CHARACTER SET utf8 */;

 2.USE `userdb`;

 3.CREATE TABLE `emp` (
  `id` int(11) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `deg` varchar(100) DEFAULT NULL,
  `salary` int(11) DEFAULT NULL,
  `dept` varchar(10) DEFAULT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `is_delete` bigint(20) DEFAULT '1'
 ) ENGINE=InnoDB DEFAULT CHARSET=latin1;

 4.insert  into `emp`(`id`,`name`,`deg`,`salary`,`dept`,`create_time`,`update_time`,`is_delete`) values (1201,'gopal','manager',50000,'TP','2018-06-17 18:54:32','2019-01-17 11:19:32',1),(1202,'manishahello','Proof reader',50000,'TPP','2018-06-15 18:54:32','2018-06-17 18:54:32',0),(1203,'khalillskjds','php dev',30000,'AC','2018-06-17 18:54:32','2019-03-14 09:18:27',1),(1204,'prasanth_xxx','php dev',30000,'AC','2018-06-17 18:54:32','2019-04-07 09:09:24',1),(1205,'kranthixxx','admin',20000,'TP','2018-06-17 18:54:32','2018-12-08 11:50:33',0),(1206,'garry','manager',50000,'TPC','2018-12-10 21:41:09','2018-12-10 21:41:09',1),(1207,'oliver','php dev',2000,'AC','2018-12-15 13:49:13','2018-12-15 13:49:13',1),(1208,'hello','phpDev',200,'TP','2018-12-16 09:41:48','2018-12-16 09:41:48',1),(1209,'ABC','HELLO',300,NULL,'2018-12-16 09:42:04','2018-12-16 09:42:24',1),(1210,'HELLO','HELLO',5800,'TP','2019-01-24 09:02:43','2019-01-24 09:02:43',1),(1211,'WORLD','TEST',8800,'AC','2019-01-24 09:03:15','2019-01-24 09:03:15',1),(1212,'sdfs','sdfsdf',8500,'AC','2019-03-13 22:01:38','2019-03-13 22:01:38',1),(1213,NULL,'sdfsdf',9800,'sdfsdf','2019-03-14 09:08:31','2019-03-14 09:08:54',1),(1214,'xxx','sdfsdf',9500,NULL,'2019-03-14 09:13:32','2019-03-14 09:13:44',0),(1215,'sdfsf','sdfsdfsdf',9870,'TP','2019-04-07 09:10:39','2019-04-07 09:11:18',0),(1216,'hello','HELLO',5600,'AC','2019-04-07 09:37:05','2019-04-07 09:37:05',1),(1217,'HELLO2','hello2',7800,'TP','2019-04-07 09:37:40','2019-04-07 09:38:17',1);
```

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dc/datax/sum-1.png')" alt="wxmp">

  

 目标表：
 
``` sql
 1.USE userdb;

 2.CREATE TABLE `emp3` (
  `id` INT(11) DEFAULT NULL,
  `name` VARCHAR(100) DEFAULT NULL,
  `deg` VARCHAR(100) DEFAULT NULL,
  `salary` INT(11) DEFAULT NULL,
  `create_time` timestamp default CURRENT_TIMESTAMP,
  `update_time` timestamp default CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
 ) ENGINE=INNODB DEFAULT CHARSET=latin1;

```

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dc/datax/sum-2.png')" alt="wxmp">

### 增量导入


2.编写dataX配置文件：

 vim mysql2mysql.json  
``` json
{
    "job": {
        "setting": {
            "speed": {
                 "channel":1
            }
        },
        "content": [
            {
                "reader": {
                    "name": "mysqlreader",
                    "parameter": {
                        "username": "root",
                        "password": "root%123",
                        "connection": [
                            {
                                "querySql": [
                                    "select id,name,deg,salary,create_time,update_time from emp where create_time > '${start_time}' and create_time < '${end_time}';"
                                ],
                                "jdbcUrl": [
                                    "jdbc:mysql://192.168.72.112:3306/userdb"
                                ]
                            }
                        ]
                    }
                },
                  "writer": {
                    "name": "mysqlwriter",
                    "parameter": {
                        "writeMode": "insert",
                        "username": "root",
                        "password": "root%123",
                        "column": [
                            "id",
                            "name",
                                                        "deg",
                                                        "salary","create_time","update_time"
                        ],
                        "session": [
                                "set session sql_mode='ANSI'"
                        ],
                        "preSql": [
                            "delete from emp3"
                        ],
                        "connection": [
                            {
                                "jdbcUrl": "jdbc:mysql://192.168.72.112:3306/userdb?useUnicode=true&characterEncoding=utf-8",
                                "table": [
                                    "emp3"
                                ]
                            }
                        ]
                    }
                }
            }
        ]
    }
}
```
3.执行dataX同步任务

```py
python ../bin/datax.py ./mysql2mysql.json -p "-Dstart_time='2018-06-17 00:00:00' -Dend_time='2018-06-18 23:59:59'"
```

结果查看：增量同步17-18日的数据成功。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dc/datax/sum-3.png')" alt="wxmp">

### 全量导入

只需将上面配置文件中的querySql 改为： select id,name,deg,salary,create_time,update_time from emp 即可。

 

## MYSQL -> HIVE （增量，全量）

### 增量导入

1.创建hive表

```sql
  create external table emp(
 id int,name string,
 deg string,salary double,
 dept string,
 create_time timestamp,
 update_time timestamp , 
 isdeleted string) row format delimited fields terminated by '\001';
```

### 2.编辑dataX配置文件

``` json
  {
   "job": {
     "setting": {
       "speed": {
          "channel":1
       }
     },
     "content": [
       {
         "reader": {
           "name": "mysqlreader",
           "parameter": {
             "username": "root",
             "password": "root%123",
             "connection": [
               {
                 "querySql": [
                   "select * from emp where create_time > '${start_time}' and create_time < '${end_time}'"
                 ],
                 "jdbcUrl": [
                   "jdbc:mysql://192.168.72.112:3306/userdb"
                 ]
               }
             ]
           }
         },
          
                 "writer": {
           "name": "hdfswriter",
           "parameter": {
             "defaultFS": "hdfs://node01:8020",
             "fileType": "text",
             "path": "/warehouse/tablespace/external/hive/datax.db/emp",
             "fileName": "emp",
             "column": [
               {
                 "name": "id",
                 "type": "INT"
               },
               {
                 "name": "name",
                 "type": "STRING"
               },
               {
                 "name": "deg",
                 "type": "STRING"
               },
               {
                 "name": "salary",
                 "type": "DOUBLE"
               },
               {
                 "name": "dept",
                 "type": "STRING"
               },
               {
                 "name": "create_time",
                 "type": "TIMESTAMP"
               },
               {
                 "name": "update_time",
                 "type": "TIMESTAMP"
               },
               {
                 "name": "isdeleted",
                 "type": "STRING"
               }
             ],
             "writeMode": "append",
             "fieldDelimiter": "\u0001"
           }
         }
       }
     ]
   }
 }
```

 注意：writeMode 仅支持append, nonConflict两种模式

3.执行脚本
```py
 python ../bin/datax.py ./mysql2hive.json -p "-Dstart_time='2018-06-17 00:00:00' -Dend_time='2018-06-18 23:59:59'"
``` 

查看增量导入结果

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dc/datax/sum-4.png')" alt="wxmp">

### 全量导入

全量只需修改配置文件querysql即可。

## 参考文章
* https://www.jianshu.com/p/addf916df0ab
* https://www.freesion.com/article/39511091658/