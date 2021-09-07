---
title: Hive-存储和压缩
---

::: tip
本文主要是介绍 Hive-存储和压缩
:::

[[toc]]



## 大数据之Hive（五）：存储与压缩

### 5.1 Hive存储格式

Hive支持的存储数的格式主要有：TEXTFILE（行式存储） 、SEQUENCEFILE(行式存储)、ORC（列式存储）、PARQUET（列式存储）。

5.1.1 行式存储和列式存储

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dw/hive/lianzai12-1.png')" alt="wxmp">

上图左边为逻辑表，右边第一个为行式存储，第二个为列式存储。

**行存储的特点：** 查询满足条件的一整行数据的时候，列存储则需要去每个聚集的字段找到对应的每个列的值，行存储只需要找到其中一个值，其余的值都在相邻地方，所以此时行存储查询的速度更快。select  *

**列存储的特点：** 因为每个字段的数据聚集存储，在查询只需要少数几个字段的时候，能大大减少读取的数据量；每个字段的数据类型一定是相同的，列式存储可以针对性的设计更好的设计压缩算法。select  某些字段效率更高。

5.1.2 TEXTFILE

默认格式，数据不做压缩，磁盘开销大，数据解析开销大。可结合Gzip、Bzip2使用(系统自动检查，执行查询时自动解压)，但使用这种方式，hive不会对数据进行切分，从而无法对数据进行并行操作。

5.1.3 ORC格式

Orc (Optimized Row Columnar)是hive 0.11版里引入的新的存储格式。

可以看到每个Orc文件由1个或多个stripe组成，每个stripe250MB大小，这个Stripe实际相当于RowGroup概念，不过大小由4MB->250MB，这样能提升顺序读的吞吐率。每个Stripe里有三部分组成，分别是Index Data,Row Data,Stripe Footer：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dw/hive/lianzai12-2.png')" alt="wxmp">

- 1. Index Data：一个轻量级的index，默认是每隔1W行做一个索引。这里做的索引只是记录某行的各字段在Row Data中的offset。
- 2. Row Data：存的是具体的数据，先取部分行，然后对这些行按列进行存储。对每个列进行了编码，分成多个Stream来存储。
- 3. Stripe Footer：存的是各个stripe的元数据信息

每个文件有一个File Footer，这里面存的是每个Stripe的行数，每个Column的数据类型信息等；每个文件的尾部是一个PostScript，这里面记录了整个文件的压缩类型以及FileFooter的长度信息等。在读取文件时，会seek到文件尾部读PostScript，从里面解析到File Footer长度，再读FileFooter，从里面解析到各个Stripe信息，再读各个Stripe，即从后往前读。

5.1.4 PARQUET格式

Parquet是面向分析型业务的列式存储格式，由Twitter和Cloudera合作开发，2015年5月从Apache的孵化器里毕业成为Apache顶级项目。

Parquet文件是以二进制方式存储的，所以是不可以直接读取的，文件中包括该文件的数据和元数据，因此Parquet格式文件是自解析的。

通常情况下，在存储Parquet数据的时候会按照Block大小设置行组的大小，由于一般情况下每一个Mapper任务处理数据的最小单位是一个Block，这样可以把每一个行组由一个Mapper任务处理，增大任务执行并行度。Parquet文件的格式如下图所示。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dw/hive/lianzai12-3.png')" alt="wxmp">

上图展示了一个Parquet文件的内容，一个文件中可以存储多个行组，文件的首位都是该文件的Magic Code，用于校验它是否是一个Parquet文件，Footer length记录了文件元数据的大小，通过该值和文件长度可以计算出元数据的偏移量，文件的元数据中包括每一个行组的元数据信息和该文件存储数据的Schema信息。除了文件中每一个行组的元数据，每一页的开始都会存储该页的元数据，在Parquet中，有三种类型的页：数据页、字典页和索引页。数据页用于存储当前行组中该列的值，字典页存储该列值的编码字典，每一个列块中最多包含一个字典页，索引页用来存储当前行组下该列的索引，目前Parquet中还不支持索引页。

### 5.2 Hive压缩格式

在实际工作当中，hive当中处理的数据，一般都需要经过压缩，前期我们在学习hadoop的时候，已经配置过hadoop的压缩，我们这里的hive也是一样的可以使用压缩来节省我们的MR处理的网络带宽

mr支持的压缩格式:

| 压缩格式 | 工具  | 算法    | 文件扩展名 | 是否可切分 |
| :------- | :---- | :------ | :--------- | :--------- |
| DEFAULT  | 无    | DEFAULT | .deflate   | 否         |
| Gzip     | gzip  | DEFAULT | .gz        | 否         |
| bzip2    | bzip2 | bzip2   | .bz2       | 是         |
| LZO      | lzop  | LZO     | .lzo       | 否         |
| LZ4      | 无    | LZ4     | .lz4       | 否         |
| Snappy   | 无    | Snappy  | .snappy    | 否         |

hadoop支持的解压缩的类：

| 压缩格式 | 对应的编码/解码器                          |
| :------- | :----------------------------------------- |
| DEFLATE  | org.apache.hadoop.io.compress.DefaultCodec |
| gzip     | org.apache.hadoop.io.compress.GzipCodec    |
| bzip2    | org.apache.hadoop.io.compress.BZip2Codec   |
| LZO      | com.hadoop.compression.lzo.LzopCodec       |
| LZ4      | org.apache.hadoop.io.compress.Lz4Codec     |
| Snappy   | org.apache.hadoop.io.compress.SnappyCodec  |

压缩性能的比较：

| 压缩算法 | 原始文件大小 | 压缩文件大小 | 压缩速度 | 解压速度 |
| :------- | :----------- | :----------- | :------- | :------- |
| gzip     | 8.3GB        | 1.8GB        | 17.5MB/s | 58MB/s   |
| bzip2    | 8.3GB        | 1.1GB        | 2.4MB/s  | 9.5MB/s  |
| LZO      | 8.3GB        | 2.9GB        | 49.3MB/s | 74.6MB/s |

Snappy生成的压缩文件要大20%到100%。在64位模式下的core i7处理器的单内核上，Snappy以250 MB/秒或更多的速度压缩，并以500 MB/秒或更多的速度解压。

实现压缩hadoop需要配置的压缩参数:

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dw/hive/lianzai12-4.png')" alt="wxmp">

hive配置压缩的方式:

1. 开启map端的压缩方式:

```ini
1.1）开启hive中间传输数据压缩功能
 hive (default)>set hive.exec.compress.intermediate=true;
1.2）开启mapreduce中map输出压缩功能
 hive (default)>set mapreduce.map.output.compress=true;
1.3）设置mapreduce中map输出数据的压缩方式
 hive (default)>set mapreduce.map.output.compress.codec= org.apache.hadoop.io.compress.SnappyCodec;
1.4）执行查询语句
 select count(1) from score;
```

1. 开启reduce端的压缩方式

```ini
1）开启hive最终输出数据压缩功能
 hive (default)>set hive.exec.compress.output=true;
2）开启mapreduce最终输出数据压缩
 hive (default)>set mapreduce.output.fileoutputformat.compress=true;
3）设置mapreduce最终数据输出压缩方式
 hive (default)> set mapreduce.output.fileoutputformat.compress.codec = org.apache.hadoop.io.compress.SnappyCodec;
4）设置mapreduce最终数据输出压缩为块压缩
 hive (default)>set mapreduce.output.fileoutputformat.compress.type=BLOCK;
5）测试一下输出结果是否是压缩文件
 insert overwrite local directory '/export/servers/snappy' select * from score distribute by s_id sort by s_id desc;
```

### 5.3  存储和压缩相结合

ORC存储方式的压缩：

| Key                      | Default    | Notes                                       |
| :----------------------- | :--------- | :------------------------------------------ |
| orc.compress             | ZLIB       | 高级压缩(可选: NONE, ZLIB, SNAPPY)          |
| orc.compress.size        | 262,144    | 每个压缩块中的字节数                        |
| orc.stripe.size          | 67,108,864 | 每条stripe中的字节数                        |
| orc.row.index.stride     | 10,000     | 索引条目之间的行数(必须是>= 1000)           |
| orc.create.index         | true       | 是否创建行索引                              |
| orc.bloom.filter.columns | ""         | 逗号分隔的列名列表，应该为其创建bloom过滤器 |
| orc.bloom.filter.fpp     | 0.05       | bloom过滤器的假阳性概率(必须是>0.0和<1.0)   |

创建一个非压缩的ORC存储方式：

``` sql
1）建表语句
    create table log_orc_none(
    track_time string,
    url string,
    session_id string,
    referer string,
    ip string,
    end_user_id string,
    city_id string
    )ROW FORMAT DELIMITED FIELDS TERMINATED BY '\t' STORED AS orc tblproperties ("orc.compress"="NONE");
2）插入数据
 insert into table log_orc_none select * from log_text ;
3）查看插入后数据
 dfs -du -h /user/hive/warehouse/myhive.db/log_orc_none;
 结果显示:
 7.7 M  /user/hive/warehouse/log_orc_none/123456_0
```

创建一个SNAPPY压缩的ORC存储方式：

``` sql
1）建表语句
    create table log_orc_snappy(
    track_time string,
    url string,
    session_id string,
    referer string,
    ip string,
    end_user_id string,
    city_id string
    )ROW FORMAT DELIMITED FIELDS TERMINATED BY '\t' STORED AS orc tblproperties ("orc.compress"="SNAPPY");
2）插入数据
 insert into table log_orc_snappy select * from log_text ;
3）查看插入后数据
 dfs -du -h /user/hive/warehouse/myhive.db/log_orc_snappy ;
 结果显示: 
 3.8 M  /user/hive/warehouse/log_orc_snappy/123456_0
4）上一节中默认创建的ORC存储方式，导入数据后的大小为
 2.8 M  /user/hive/warehouse/log_orc/123456_0
 比Snappy压缩的还小。原因是orc存储文件默认采用ZLIB压缩。比snappy压缩的小。
5）存储方式和压缩总结：
 在实际的项目开发当中，hive表的数据存储格式一般选择：orc或parquet。压缩方式一般选择snappy。
```

### 5.4 主流存储文件性能对比

从存储文件的压缩比和查询速度两个角度对比。

压缩比比较：

- TextFile

``` sql
（1）创建表，存储数据格式为TEXTFILE
    create table log_text (
    track_time string,
    url string,
    session_id string,
    referer string,
    ip string,
    end_user_id string,
    city_id string
    )ROW FORMAT DELIMITED FIELDS TERMINATED BY '\t' STORED AS TEXTFILE ;
 
（2）向表中加载数据
 load data local inpath '/export/servers/hivedatas/log.data' into table log_text ;
 
（3）查看表中数据大小，大小为18.1M
 dfs -du -h /user/hive/warehouse/myhive.db/log_text;
 结果显示: 
 18.1 M  /user/hive/warehouse/log_text/log.data
```

- ORC

``` sql
（1）创建表，存储数据格式为ORC
    create table log_orc(
    track_time string,
    url string,
    session_id string,
    referer string,
    ip string,
    end_user_id string,
    city_id string
    )ROW FORMAT DELIMITED FIELDS TERMINATED BY '\t' STORED AS orc ;
 
（2）向表中加载数据
 insert into table log_orc select * from log_text ;
 
（3）查看表中数据大小
 dfs -du -h /user/hive/warehouse/myhive.db/log_orc;
 结果显示:
 2.8 M  /user/hive/warehouse/log_orc/123456_0
```

- Parquet

``` sql
1）创建表，存储数据格式为parquet
    create table log_parquet(
    track_time string,
    url string,
    session_id string,
    referer string,
    ip string,
    end_user_id string,
    city_id string
    )ROW FORMAT DELIMITED FIELDS TERMINATED BY '\t' STORED AS PARQUET ; 
 
2）向表中加载数据
 insert into table log_parquet select * from log_text ;
 
3）查看表中数据大小
 dfs -du -h /user/hive/warehouse/myhive.db/log_parquet;
 结果显示:
 13.1 M  /user/hive/warehouse/log_parquet/123456_0
```

数据压缩比结论:

**ORC >  Parquet >  textFile**

存储文件的查询效率测试

- textFile

``` sql
hive (default)> select count(*) from log_text;
_c0
100000
Time taken: 21.54 seconds, Fetched: 1 row(s)  
```

- ORC

``` sql
hive (default)> select count(*) from log_orc;
_c0
100000
Time taken: 20.867 seconds, Fetched: 1 row(s) 
```

- Parquet

``` sql
hive (default)> select count(*) from log_parquet; 
_c0
100000
Time taken: 22.922 seconds, Fetched: 1 row(s)
```

存储文件的查询效率比较:

**ORC > TextFile > Parquet**

## 参考文章

* https://blog.csdn.net/weixin_44291548/article/details/119764835