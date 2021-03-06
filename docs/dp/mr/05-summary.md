---
title: MapReduce-精华知识总结
---

::: tip
本文主要是介绍 MapReduce-精华知识总结 。
:::

[[toc]]

## MapReduce学习总结



## 1、MapReduce简介

### 1.1、基本概念

  MapReduce是Hadoop的组成部分，它是一个软件框架，基于该框架能够容易地编写应用程序，这些应用程序能够运行在由上千个商用机器组成的大集群上，并以一种可靠的，具有容错能力的方式并行地处理上TB级别的海量数据集。

  MapReduce擅长处理大数据。MapReduce的思想就是“分而治之”。

  Mapper负责“分”，即把复杂的任务分解为若干个“简单的任务”来处理。

- 数据或计算的规模相对原任务要大大缩小
- 就近计算原则，即任务会分配到存放着所需数据的节点上进行计算
- 小任务可以并行计算，彼此间几乎没有依赖关系。

  Reduce负责对map阶段的结果进行汇总。

### 1.2、MapReduce的适用场景

- 数据查找 ：分布式Grep
- Web访问日志分析：词频统计、网站PV UV统计、Top K问题
- 倒排索引：建立搜索引擎索引（根据值找健）
- 分布式排序

### 1.3、MapReduce的优点和缺点

- 优点：

模型简单：Map + Reduce

高伸缩性：支持横向扩展

灵活：结构化和非结构化数据

速度快：高吞吐离线处理数据

并行处理：编程模型天然支持并行处理

容错能力强 

- 缺点：

流式数据：MapReduce处理模型就决定了需要静态数据

实时计算：不适合低延迟数据处理，需要毫秒级别响应（MapReduce处理延迟较高）

复杂算法：例如SVM支持向量（机器学习算法）

迭代计算：例如斐波那契数列（后边的计算需要前面的计算结果）

## 2、MapReduce的编程模型

### 2.1、统计文本中单词出现次数

  Bash命令实现

- tr -s " " "\n"：将文本中的空格替换成换行
- sort file：对单词内容进行排序
- uniq –c：去除相同的行（相同的必须相邻），统计相同单词的次数
- 完整命令行：cat wordcount.txt | tr -s " " "\n" | sort | uniq -c

  单机版实现

- 使用HashMap统计 ：将文本读到代码，以单词为key，次数为value，将文本的单词次数放到HashMap中。

### 2.2、MapReduce实现WordCount程序原理

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dp/mr/sum-1.png')" alt="wxmp">

  将文本读入代码中，根据块的大小切分成多个块，每块负责一部分数据的Map，Map处理后将结果发送到Reduce端，Reduce接收到Map输出的结果进行聚合，输出一个或者多个聚合结果，输出到文件中。

  在Reduce端相同的key会被划分到同一个Reduce上，如图示：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dp/mr/sum-2.png')" alt="wxmp">

### 2.3、Map端额Reduce端的数据输入

  Map端输入：

- Map阶段由一定的数量的Map Task组成
- 文件分片：输入数据会被split切分为多份
- HDFS默认Block大小：Hadoop 1.0 = 64MB，Hadoop 2.0 = 128MB
- 数据切分时默认实现是TextInputFormat，将文件解析为`<key, value>`对，其中key为偏移量，value为每一行内容
- Map Task任务个数：一个split一个Map Task，默认情况下一个block对应一个split；例如一个文件大小为10TB，block大小设置为128MB，则一共会有81920 个Map Task任务（10 * 1024 * 1024 / 128 = 81920）

  Reduce 数据输入

- Partitioner决定了哪个Reduce会接收到Map输出的`<key, value>`对，在Hadoop中默认的Partitioner实现为HashPartitione
- 计算公式：Abs(Hash(key)) mod NR 其中 NR等于Reduce Task数目
- Partitioner可以自定义
- 例如：有3个Reduce Task ? 那么Partitioner会返回0 ~ 2
- 至于需要多少个Reduce，用户可以根据具体问题，通过在mapred-site.xml配置文件里设置参数mapred.reduce.tasks的值，缺省值为1或Job.setNumReduceTasks(Int number)进行控制。

### 2.4、shuffle介绍

  将maptask输出的处理结果数据，分发给reducetask，并在分发的过程中，对数据按key进行了分区和排序，这个过程称为shuffle。完整的shuffle是由Map端和Reduce端组成，Map端负责数据的溢写，Reduce负责将Map的数据拷贝到本地，并进行归并排序。

  Map端shuffle：

- Map端把数据源源不断的写入到一个环形缓冲区（RingBuffer）
- 当达到一定阀值时会新启一个线程，将缓冲区的数据溢写到磁盘
- 在溢写过程中，调用Partitioner进行分组，对于每个组按照Key进行排序
- Map处理完毕后对磁盘的多个文件进行Merge操作，将大量文件合并为一个大文件（数据文件）和一个索引文件（每个partition在文件中的起始位置、长度等等）

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dp/mr/sum-3.png')" alt="wxmp">

  Reduce端的shuffle：

- Map端shuffle结束后，会暴露一个http服务，供Reduce端获取数据
- Reduce端启动拷贝线程，从各个Map端拷贝数据，一边拷贝一边进行归并排序操作，便于数据的下一步处理

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dp/mr/sum-4.png')" alt="wxmp">

### 2.5、Combiner介绍

   Map端本地的Reduce，对Map的数据进行合并排序，减少HTTP进行文件的操作，用户可以自定义combiner。在WordCount开启combiner，在Map端处理数据后，对相同的Key先进行Reduce操作，先对Map中的数据进行求和，在发送到reduce端。Combiner适合满足结合律的数据（求和、求最大值），不适用对于求平均数。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dp/mr/sum-5.png')" alt="wxmp">

## 3、WordCount代码示例

Hadoop 2.6.0版本API均在包org.apache.hadoop.mapreduce

编写MapReduce程序的核心：

- 继承Hadoop提供的Mapper类并实现其中的map方法
- public class Mapper`<KEYIN(输入Map的key)`, VALUEIN(输入Map的value), KEYOUT(输出中间值的key), VALUEOUT(输出中间值的value)>
- 继承Hadoop提供的Reducer类并实现其中的reduce方法
- public class Reducer`<KEYIN(输入Reducer的key)`, VALUEIN(输入Reducer的value), KEYOUT(输出的key), VALUEOUT(输出的value)>

### Map程序：

```java
/**
     * Object：输入行号，无意义
     * Text：输入的内容
     * Text：输入的key
     * IntWritable：输入key对应的值
     */
    public static class TokenizerMapper
            extends Mapper<Object, Text, Text, IntWritable> {
        //定义value的值
        private final static IntWritable one = new IntWritable(1);
        //定义输出的key
        private Text word = new Text();
        /**
         * @param key 输入行号，无意义
         * @param value 输入的内容
         * @param context 上下文对象
         * @throws IOException
         * @throws InterruptedException
         */
        public void map(Object key, Text value, Context context
        ) throws IOException, InterruptedException {
            //根据空格进行切分
            StringTokenizer itr = new StringTokenizer(value.toString());
            while (itr.hasMoreTokens()) {
                word.set(itr.nextToken());
                //输入中间值交给下一步处理
                context.write(word, one);
            }
        }
    }
```

### Reduce端程序：

```java
/**
     * Text：输入key
     * IntWritable：输入值
     * Text：输出key
     * IntWritable：输出值
     */
    public static class IntSumReducer
            extends Reducer<Text, IntWritable, Text, IntWritable> {
        //定义输入的结果
        private IntWritable result = new IntWritable();
 
        /**
         * @param key 输入的key
         * @param values key对应的结果集合
         * @param context 上下文对象
         * @throws IOException
         * @throws InterruptedException
         */
        public void reduce(Text key, Iterable<IntWritable> values,
                           Context context
        ) throws IOException, InterruptedException {
            //定义输出结果，对结果进行累加
            int sum = 0;
            for (IntWritable val : values) {
                sum += val.get();
            }
            result.set(sum);
            context.write(key, result);
        }
    }
```

### Main方法：

```java
public static void main(String[] args) throws Exception {
        Configuration conf = new Configuration();
        Job job = Job.getInstance(conf, "word count");
        job.setJarByClass(WordCount.class);
        job.setMapperClass(TokenizerMapper.class);
        //Combiner方法的签名和Reducer一致
        job.setCombinerClass(IntSumReducer.class);
        job.setReducerClass(IntSumReducer.class);
        job.setOutputKeyClass(Text.class);
        job.setOutputValueClass(IntWritable.class);
        //输入文件地址
        FileInputFormat.addInputPath(job, new Path(args[0]));
        //结果输出地址
        FileOutputFormat.setOutputPath(job, new Path(args[1]));
        System.exit(job.waitForCompletion(true) ? 0 : 1);
    }
```

## 4、数据倾斜问题

  简单的讲，数据倾斜就是我们在计算数据的时候，数据的分散度不够，导致大量的数据集中到了一台或者几台机器上计算，这些数据的计算速度远远低于平均计算速度，导致整个计算过程过慢。

### 数据倾斜一般有两种情况:

- 一种是唯一值非常少，极少数值有非常多的记录值(唯一值少于几千)
- 一种是唯一值比较多，这个字段的某些值有远远多于其他值的记录数，但是它的占比也小于百分之一或千分之一

### 解决思路：

- 增加jvm内存,这适用于第一种情况
- 增加reduce的个数,这适用于第二种情况
- 自定义分区,这需要用户自己继承partition类,指定分区策略
- 重新设计key,有一种方案是在map阶段时给key加上一个随机数,有了随机数的key就不会被大量的分配到同一节点(小几率),待到reduce后再把随机数去掉即可
- 使用combinner合并,combinner是在map阶段,reduce之前的一个中间阶段,在这个阶段可以选择性的把大量的相同key数据先进行一个合并,可以看做是local reduce,然后再交给reduce来处理,这样做的好处很多,即减轻了map端向reduce端发送的数据量

## 5、MapReduce 容错性 

### 5.1、Task运行失败 

- Map Task失败：MRAppMaster重启Map Task，Map Task没有依赖性
- Reduce Task失败：MRAppMaster重启Reduce Task，Map Task的输出保存在磁盘上
- 同一个Task运行多次失败（默认4次）则本次作业失败 

### 5.2、如果Task所在的Node节点挂了

在另外一个节点上重启所有在挂掉节点上曾经运行过的任务 

### 5.3、如果Task运行缓慢

- 通常由于硬件损坏、软件Bug或者配置错误导致
- 单个task运行缓慢会显著影响整体作业运行时间
- 推测执行：在另外一个节点上启动相同的任务，谁先完成就kill掉另外一个节点 上的任务
- 无法启动推测执行的情况：写入数据库

### 5.4、数据本地性

- HDFS上同一份文件会有多份拷贝（默认是3份）
- MapReduce调度原则：在副本的节点上启动Map Task任务，或者在就近的节点上启动Map Task任务
- 数据本地性有三个级别 ：数据和Task在同一个节点、数据和Task在同一机架、数据和Task不在同一个节点也不在同一个机架

## 6、MapReduce相关问题思考：

1、Shuffle的定义是什么？

   每个map task都有一个内存缓冲区，存储着map的输出结果，当缓冲区快满的时候需要将缓冲区的数据以一个临时文件的方式存放到磁盘，当整个map task结束后再对磁盘中这个map task产生的所有临时文件做合并，生成最终的正式输出文件，然后等待reduce task来拉数据。

2、map task与reduce task的执行是否在不同的节点上？

  大部分map task与reduce task的执行是在不同的节点上。当然很多情况下Reduce执行时需要跨节点去拉取其它节点上的map task结果。

3、Shuffle产生的意义是什么？

  跨节点拉取数据时，尽可能减少对带宽的不必要消耗。减少磁盘IO对task执行的影响。

4、每个map task都有一个内存缓冲区，存储着map的输出结果，当缓冲区快满的时候需要将缓冲区的数据该如何处理？

  新开启一个线程将数据溢写到磁盘。

5、在map task执行时，它是如何读取HDFS的？

  在map task执行时，它的输入数据来源于HDFS的block，当然在MapReduce概念中，map task只读取split。

6、读取的Split与block的对应关系可能是什么？

  Split与block的对应关系可能是多对一，默认是一对一。

7、MapReduce提供Partitioner接口，它的作用是什么？

  根据key或value及reduce的数量来决定当前的这对输出数据最终应该交由哪个reduce task处理。默认对key hash后再以reduce task数量取模。默认的取模方式只是为了平均reduce的处理能力，如果用户自己对Partitioner有需求，可以订制并设置到job.set(..)。

8、溢写是在什么情况下发生？

  当map task 的输出结果大于这个内存缓冲区的阀值是（buffer size * spill percent = 100MB * 0.8 = 80MB）溢写线程启动。

9、溢写是为什么不影响往缓冲区写map结果的线程？

  1、溢写为新开启线程，

  2、溢写过程中会剩余20M继续写入，对缓存区map的结果无影响

10、当溢写线程启动后，需要对这80MB空间内的key做排序(Sort)。排序是MapReduce模型默认的行为，这里的排序也是对谁的排序？

  排序是MapReduce模型默认的行为，这里的排序也是对序列化的字节做的排序。

11、哪些场景才能使用Combiner呢？

  Combiner只应该用于那种 Reduce的输入key/value与输出key/value类型完全一致，且不影响最终结果的场景。比如累加，最大值等。Combiner的使用一定 得慎重，如果用好，它对job执行效率有帮助，反之会影响reduce的最终结果。

12、Merge的作用是什么？

  每次溢写会在磁盘上产生一个溢写文件，Map 输出结果很大时，会有多次这样的溢写文件到磁盘上，当 Map task 结束完成时，内存缓冲区的数据同样也会溢写到磁盘上，结果磁盘会有一个或多个溢出的文件，同时合并溢出的文件。（如果map输出的结果很少，map完成时，溢出的文件只有一个）合并这个过程就叫做Merge。

  merge是将多个溢写文件合并到一个文件，所以可能也有相同的key存在，在这个过程中如果client设置过Combiner，也会使用Combiner来合并相同的key。

13、reduce中Copy过程采用是什么协议？

  确认map task是否完成为RPC协议，拷贝文件为HTTP协议

14、.reduce中merge过程有几种方式，与map有什么相似之处？
  
  合并后会生成一个文件，可能在内存，也可能在磁盘，默认在磁盘。

  这里和map中内存溢出一样，当内存中的数据达到一定的阀值，就会启动内存到磁盘的溢出....合并Merge。这个过程我们设置Combiner，也会启用的，然后在磁盘中生成很多一些文件。值到map端没有数据才结束。然后启动第三种磁盘到磁盘的merge方式生成最终的那个文件。

15、溢写过程中如果有很多个key/value对需要发送到某个reduce端去，那么如何处理这些key/value值

  有很多个key/value 对需要发送到某个reduce端去，那么需要将这些key/value值拼接到一块，减少与partition相关的索引记录

## 参考文章
* https://blog.csdn.net/qq_33581278/article/details/83375296