---
title: Flink-经典案例分析
---

::: tip
本文主要是介绍 Flink-经典案例分析 。
:::

[[toc]]

## Flink 案例分析

### Flink程序的执行过程

| no-desc          | 说明                   | 详情                                                                                                                                                                                                                                                                                                                 |
| ---------------- | ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1-env            | 获取flink的执行环境    | 批处理：ExecutionEnvironment env = ExecutionEnvironment.getExecutionEnvironment();流处理：StreamExecutionEnvironment env = StreamExecutionEnvironment.getExecutionEnvironment();                                                                                                                                     |
| 2-source         | 加载数据               | 1) socketTextStream – 读取Socket 数据流 2) readTextFile() – 逐行读取文本文件获取数据流，每行都返回字符串 3) fromCollection() – 从集合中创建数据流 4) fromElements() – 从给定的数据对象创建数据流，所有数据类型要一致 5) addSource() – 添加新的源函数,例如从kafka 中读取数据，参见读取kafka 数据案例                  |
| 3-transformation | 对加载的数据进行转换   |                                                                                                                                                                                                                                                                                                                      |
| 4-sink           | 对结果进行保存或者打印 | 1) writeAsText() – 以字符串的形式逐行写入文件，调用每个元素的toString()得到写入的字符串 2) writeAsCsv() – 将元组写出以逗号分隔的csv 文件。注意：只能作用到元组数据上 3) print() – 控制台直接输出结果，调用对象的toString()方法得到输出结果。 4) addSink() – 自定义接收函数。例如将结果保存到kafka 中，参见kafka 案例 |
| 5-execute        | 触发flink程序的执行    | 代码流程必须符合 source ->transformation -> sink transformation 都是**懒**执行，需要最后使用env.execute()或者使用 print(),count(),collect() **触发**执行                                                                                                                                                             |

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dp/flink/caseanalysis-1.png')" alt="wxmp">

**注意**

Flink编程不是基于K,V格式的编程，通过某些方式来指定虚拟key

Flink中的tuple最多支持25个元素，每个元素是从0开始



### 算子

中间处理、转换的环节是通过不同的算子完成的。

算子将一个或多个DataStream转换为新的DataStream

| 转型                          | 描述                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Map DataStream→DataStream     | 采用一个数据元并生成一个数据元。一个map函数，它将输入流的值加倍：`DataStream<Integer> dataStream = //... dataStream.map(new MapFunction<Integer, Integer>() {    @Override    public Integer map(Integer value) throws Exception {        return 2 * value;    } });`                                                                                                                                                                                                                                                                                                                                   |
| FlatMap DataStream→DataStream | 采用一个数据元并生成零个，一个或多个数据元。将句子分割为单词的flatmap函数：`dataStream.flatMap(new FlatMapFunction<String, String>() {    @Override    public void flatMap(String value, Collector<String> out)        throws Exception {        for(String word: value.split(" ")){            out.collect(word);        }    } });`                                                                                                                                                                                                                                                                   |
| Filter DataStream→DataStream  | 计算每个数据元的布尔函数，并保存函数返回true的数据元。过滤掉零值的过滤器：`dataStream.filter(new FilterFunction<Integer>() {    @Override    public boolean filter(Integer value) throws Exception {        return value != 0;    } });    `                                                                                                                                                                                                                                                                                                                                                            |
| KeyBy DataStream→KeyedStream  | 逻辑上将流分区为不相交的分区。具有相同Keys的所有记录都分配给同一分区。在内部，*keyBy（）*是使用散列分区实现的。[指定键](https://flink.sojb.cn/dev/api_concepts.html#specifying-keys)有不同的方法。此转换返回*KeyedStream*，其中包括使用[被Keys化状态](https://flink.sojb.cn/dev/stream/state/state.html#keyed-state)所需的*KeyedStream*。`dataStream.keyBy("someKey") // Key by field "someKey" dataStream.keyBy(0) // Key by the first element of a Tuple    `注意 如果出现以下情况，则类型不能成为关键：它是POJO类型但不覆盖*hashCode（）*方法并依赖于*Object.hashCode（）*实现。它是任何类型的数组。 |
| Reduce KeyedStream→DataStream | 被Keys化数据流上的“滚动”Reduce。将当前数据元与最后一个Reduce的值组合并发出新值。  reduce函数，用于创建部分和的流：`keyedStream.reduce(new ReduceFunction<Integer>() {    @Override    public Integer reduce(Integer value1, Integer value2)    throws Exception {        return value1 + value2;    } });`                                                                                                                                                                                                                                                                                              |



### 案例1： 元素处理

env: 批

Source：fromElements

Sink：print

算子：Map


``` java
public class MapTest {
    public static void main(String[] args) throws Exception {
        ExecutionEnvironment env = ExecutionEnvironment.getExecutionEnvironment();

        DataSet<Integer> dataSet = env.fromElements(1, 2, -3, 0, 5, -9, 8);
        DataSet<Integer> dataSet2 = dataSet.map(new Tokenizer());
//        DataSet<Integer> dataSet2 = dataSet.map(i->i * 2);
        dataSet2.print();
    }

    public static class Tokenizer implements MapFunction<Integer, Integer> {
        @Override
        public Integer map(Integer in) {
            return in * 2;
        }
    }
}
```


### 案例2： 词频统计

env: 批

Source：readTextFile 

Sink：writeAsCsv

算子：Map



``` java
public class SocketWindowWordCountJava {
    public static void main(String[] args) throws Exception {
        ExecutionEnvironment env = ExecutionEnvironment.getExecutionEnvironment();

        DataSet<String> dataSet = env.readTextFile("/yourpath/in.txt");

        DataSet<Tuple2<String, Integer>> counts =
                // split up the lines in pairs (2-tuples) containing: (word,1)
                dataSet.flatMap(new Tokenizer())
                        // group by the tuple field "0" and sum up tuple field "1"
                        .groupBy(0)
                        .sum(1);

        String outputPath = "/yourpath/out.txt";
        counts.writeAsCsv(outputPath, "\n", " ");
        env.execute("myflink");
    }

    public static class Tokenizer implements FlatMapFunction<String, Tuple2<String, Integer>> {
        @Override
        public void flatMap(String value, Collector<Tuple2<String, Integer>> out) {
            String[] tokens = value.split(" ");
            // emit the pairs
            for (String token : tokens) {
                if (token.length() > 0) {
                    out.collect(new Tuple2<String, Integer>(token, 1));
                }
            }
        }
    }
}
```

### 案例3：数据流汇总

env: 流

Source：addSource

Sink：print

算子：keyBy、Reduce

``` java
public class ReduceTest {
    private static final Logger LOG = LoggerFactory.getLogger(ReduceTest.class);
    private static final String[] TYPE = {"苹果", "梨", "西瓜", "葡萄", "火龙果"};

    public static void main(String[] args) throws Exception {
        final StreamExecutionEnvironment env = StreamExecutionEnvironment.getExecutionEnvironment();

        //添加自定义数据源,每秒发出一笔订单信息{商品名称,商品数量}
        DataStreamSource<Tuple2<String, Integer>> orderSource = env.addSource(new SourceFunction<Tuple2<String, Integer>>() {
            private volatile boolean isRunning = true;
            private final Random random = new Random();

            @Override
            public void run(SourceContext<Tuple2<String, Integer>> ctx) throws Exception {
                while (isRunning) {
                    TimeUnit.SECONDS.sleep(1);
                    ctx.collect(Tuple2.of(TYPE[random.nextInt(TYPE.length)], 1));
                }
            }

            @Override
            public void cancel() {
                isRunning = false;
            }

        }, "order-info");

        orderSource.keyBy(0)
                //将上一元素与当前元素相加后，返回给下一元素处理
                .reduce(new ReduceFunction<Tuple2<String, Integer>>() {
                    @Override
                    public Tuple2<String, Integer> reduce(Tuple2<String, Integer> value1, Tuple2<String, Integer> value2)
                            throws Exception {
                        return Tuple2.of(value1.f0, value1.f1 + value2.f1);
                    }
                })
                .print();

        env.execute("Flink Streaming Java API Skeleton");
    }
}
```


Source：readTextFile 

Sink：writeAsCsv

算子：Map



## 参考

https://blog.csdn.net/qq_40929921/article/details/99603150

https://flink.sojb.cn/dev/stream/operators/

## 参考文章
* https://www.cnblogs.com/kaituorensheng/p/13717210.html