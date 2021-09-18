---
title: Spark-SpringBoot集成案例
---

::: tip
本文主要是介绍 Spark-SpringBoot集成案例 。
:::

[[toc]]

## 转载-Springboot 集成Apache Spark 2.4.4与Scala 2.12

Apache Spark是用于大规模数据处理的统一分析引擎。它提供Java，Scala，Python和R中的高级API，以及支持常规执行图的优化引擎。它还支持一组丰富的更高级别的工具，包括[星火SQL](https://spark.apache.org/docs/latest/sql-programming-guide.html)用于SQL和结构化数据的处理，[MLlib](https://spark.apache.org/docs/latest/ml-guide.html)机器学习，[GraphX](https://spark.apache.org/docs/latest/graphx-programming-guide.html)用于图形处理，以及[结构化流](https://spark.apache.org/docs/latest/structured-streaming-programming-guide.html)的增量计算和流处理。

请注意，在Spark 2.0之前，Spark的主要编程接口是弹性分布式数据集（RDD）。在Spark 2.0之后，RDD被Dataset取代，Dataset的类型像RDD一样强，但是在后台进行了更丰富的优化。仍支持RDD界面，您可以在[RDD编程指南中](https://spark.apache.org/docs/latest/rdd-programming-guide.html)获得更详细的参考。但是，我们强烈建议您切换到使用数据集，该数据集的性能比RDD更好。请参阅[SQL编程指南](https://spark.apache.org/docs/latest/sql-programming-guide.html)以获取有关数据集的更多信息。

Apache Spark 3.0的示例请参考：[快速开始](https://spark.apache.org/docs/latest/quick-start.html)

### Maven依赖配置

pom.xml

```XML
    <properties>
        <maven.test.skip>true</maven.test.skip>
        <java.version>1.8</java.version>
        <scala.version>2.12</scala.version>
        <spark.version>2.4.4</spark.version>
    </properties>
 
 
 <!-- Spark dependency  start -->
        <dependency>
            <groupId>org.apache.spark</groupId>
            <artifactId>spark-core_${scala.version}</artifactId>
            <version>${spark.version}</version>
            <exclusions>
                <exclusion>
                    <groupId>org.slf4j</groupId>
                    <artifactId>slf4j-log4j12</artifactId>
                </exclusion>
                <exclusion>
                    <groupId>log4j</groupId>
                    <artifactId>log4j</artifactId>
                </exclusion>
            </exclusions>
            <scope>provided</scope>
        </dependency>
        <dependency>
            <groupId>org.apache.spark</groupId>
            <artifactId>spark-streaming_${scala.version}</artifactId>
            <version>${spark.version}</version>
            <scope>provided</scope>
        </dependency>
        <dependency>
            <groupId>org.apache.spark</groupId>
            <artifactId>spark-sql_${scala.version}</artifactId>
            <version>${spark.version}</version>
        </dependency>
        <!-- Spark dependency  end -->
```

### 项目yml配置

```ini
## ====服务端设置配置====
server:
  port: 8090
 
## ====Spark 数据解析流引擎配置==https://my.oschina.net/woter/blog/1843755==
## ====Spark SQL 方式HiveSql https://www.cnblogs.com/cord/p/9530404.html
spark:
  spark-home: .
  ## appName 参数是一个在集群 UI 上展示应用程序的名称
  app-name: sparkTest
  ## master 是一个 Spark，Mesos 或 YARN 的 cluster URL，或者指定为在 local mode（本地模式）中运行的 “local” 字符串
  master: local[4]
```

### Spark Java配置

```java
package com.patrol.spark.config;
 
import org.apache.spark.SparkConf;
import org.apache.spark.api.java.JavaSparkContext;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;
 
/**
 * @Copyright: 2019-2021
 * @FileName: SparkConfiguration.java
 * @Author: PJL
 * @Date: 2020/9/1 16:56
 * @Description: Spark配置
 */
@Component
@Configuration
@ConfigurationProperties(prefix = "spark")
@EnableConfigurationProperties
public class SparkConfiguration {
 
    private String sparkHome = ".";
 
    /**
     * appName 参数是一个在集群 UI 上展示应用程序的名称
     */
    private String appName = "sparkPatrol";
 
    /**
     * master 是一个 Spark，Mesos 或 YARN 的 cluster URL，或者指定为在 local mode（本地模式）中运行的 “local” 字符串
     */
    private String master = "local";
 
    @Bean
    @ConditionalOnMissingBean(SparkConf.class)
    public SparkConf sparkConf()  {
        SparkConf conf = new SparkConf().setAppName(appName).setMaster(master);
        return conf;
    }
 
    @Bean
    @ConditionalOnMissingBean(JavaSparkContext.class)
    public JavaSparkContext javaSparkContext()  {
        return new JavaSparkContext(sparkConf());
    }
 
    public String getSparkHome() {
        return sparkHome;
    }
 
    public void setSparkHome(String sparkHome) {
        this.sparkHome = sparkHome;
    }
 
    public String getAppName() {
        return appName;
    }
 
    public void setAppName(String appName) {
        this.appName = appName;
    }
 
    public String getMaster() {
        return master;
    }
 
    public void setMaster(String master) {
        this.master = master;
    }
}
```

### Main函数示例

```java
package com.patrol.spark.examples;
 
import org.apache.spark.sql.Dataset;
import org.apache.spark.sql.SparkSession;
 
/**
 * @Copyright: 2019-2021
 * @FileName: WordCount.java
 * @Author: PJL
 * @Date: 2020/9/1 16:39
 * @Description: 文字计算统计
 */
public class WordCount {
 
    /**
     * 函数入口
     *
     * @param args
     */
    public static void main(String[] args) {
        String logFile = "YOUR_SPARK_HOME/README.md"; // Should be some file on your system
        SparkSession spark = SparkSession.builder().appName("Simple Application").getOrCreate();
        Dataset<String> logData = spark.read().textFile(logFile).cache();
        // 聚合计算
        long numAs = logData.filter("a").count();
        long numBs = logData.filter("b").count();
 
        System.out.println("Lines with a: " + numAs + ", lines with b: " + numBs);
        // 停止作业
        spark.stop();
    }
}
```

### Spark Service

```java
package com.patrol.spark.service;
 
 
import com.patrol.spark.receiver.CustomStreamingReceiver;
import lombok.extern.slf4j.Slf4j;
import org.apache.spark.api.java.JavaPairRDD;
import org.apache.spark.api.java.JavaRDD;
import org.apache.spark.api.java.JavaSparkContext;
import org.apache.spark.storage.StorageLevel;
import org.apache.spark.streaming.Durations;
import org.apache.spark.streaming.api.java.JavaDStream;
import org.apache.spark.streaming.api.java.JavaReceiverInputDStream;
import org.apache.spark.streaming.api.java.JavaStreamingContext;
import org.spark_project.guava.base.Joiner;
import org.spark_project.guava.collect.Lists;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import scala.Tuple2;
 
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Pattern;
 
/**
 * @Copyright: 2019-2021
 * @FileName: SparkService.java
 * @Author: PJL
 * @Date: 2020/9/1 17:02
 * @Description: Spark服务
 */
@Slf4j
@Service
public class SparkService {
 
    private static final Pattern SPACE = Pattern.compile(" ");
 
    @Autowired
    private JavaSparkContext javaSparkContext;
 
 
    public Map<String, Object> calculateTopTen() {
 
        Map<String, Object> result = new HashMap<>();
        JavaRDD<String> lines = javaSparkContext.textFile("src/test/java/test.txt").cache();
 
        System.out.println();
        System.out.println("-------------------------------------------------------");
        System.out.println(lines.count());
 
        JavaRDD<String> words = lines.flatMap(str -> Arrays.asList(SPACE.split(str)).iterator());
 
        JavaPairRDD<String, Integer> ones = words.mapToPair(str -> new Tuple2<String, Integer>(str, 1));
 
        JavaPairRDD<String, Integer> counts = ones.reduceByKey((Integer i1, Integer i2) -> (i1 + i2));
 
        JavaPairRDD<Integer, String> temp = counts.mapToPair(tuple -> new Tuple2<Integer, String>(tuple._2, tuple._1));
 
        JavaPairRDD<String, Integer> sorted = temp.sortByKey(false).mapToPair(tuple -> new Tuple2<String, Integer>(tuple._2, tuple._1));
 
        System.out.println();
        System.out.println("-------------------------------------------------------");
        System.out.println(sorted.count());
 
        //List<Tuple2<String, Integer>> output = sorted.collect();
 
        //List<Tuple2<String, Integer>> output = sorted.take(10);
 
        List<Tuple2<String, Integer>> output = sorted.top(10);
 
        for (Tuple2<String, Integer> tuple : output) {
            result.put(tuple._1(), tuple._2());
        }
 
        return result;
    }
 
    /**
     * 练习demo，熟悉其中API
     */
    public void sparkExerciseDemo() {
        List<Integer> data = Lists.newArrayList(1, 2, 3, 4, 5, 6);
        JavaRDD<Integer> rdd01 = javaSparkContext.parallelize(data);
        rdd01 = rdd01.map(num -> {
            return num * num;
        });
        //data map :1,4,9,16,25,36
        log.info("data map :{}", Joiner.on(",").skipNulls().join(rdd01.collect()).toString());
 
        rdd01 = rdd01.filter(x -> x < 6);
 
        //data filter :1,4
        log.info("data filter :{}", Joiner.on(",").skipNulls().join(rdd01.collect()).toString());
 
        rdd01 = rdd01.flatMap(x -> {
            Integer[] test = {x, x + 1, x + 2};
            return Arrays.asList(test).iterator();
        });
 
        //flatMap :1,2,3,4,5,6
        log.info("flatMap :{}", Joiner.on(",").skipNulls().join(rdd01.collect()).toString());
 
        JavaRDD<Integer> unionRdd = javaSparkContext.parallelize(data);
 
        rdd01 = rdd01.union(unionRdd);
 
        //union :1,2,3,4,5,6,1,2,3,4,5,6
        log.info("union :{}", Joiner.on(",").skipNulls().join(rdd01.collect()).toString());
 
        List<Integer> result = Lists.newArrayList();
        result.add(rdd01.reduce((Integer v1, Integer v2) -> {
            return v1 + v2;
        }));
 
        //reduce :42
        log.info("reduce :{}", Joiner.on(",").skipNulls().join(result).toString());
        result.forEach(System.out::print);
 
        JavaPairRDD<Integer, Iterable<Integer>> groupRdd = rdd01.groupBy(x -> {
            log.info("======grouby========：{}", x);
            if (x > 10) return 0;
            else return 1;
        });
 
        List<Tuple2<Integer, Iterable<Integer>>> resultGroup = groupRdd.collect();
 
        //group by  key:1 value:1,2,3,4,5,6,1,2,3,4,5,6
        resultGroup.forEach(x -> {
            log.info("group by  key:{} value:{}", x._1, Joiner.on(",").skipNulls().join(x._2).toString());
        });
 
    }
 
    /**
     * spark streaming 练习
     */
    public void sparkStreaming() throws InterruptedException {
        JavaStreamingContext jsc = new JavaStreamingContext(javaSparkContext, Durations.seconds(10));//批间隔时间
        JavaReceiverInputDStream<String> lines = jsc.receiverStream(new CustomStreamingReceiver(StorageLevel.MEMORY_AND_DISK_2()));
        JavaDStream<Long> count = lines.count();
        count = count.map(x -> {
            log.info("这次批一共多少条数据：{}", x);
            return x;
        });
        count.print();
        jsc.start();
        jsc.awaitTermination();
        jsc.stop();
    }
}
```

### Spark Streaming Receiver

```java
package com.patrol.spark.receiver;
 
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang.math.RandomUtils;
import org.apache.spark.storage.StorageLevel;
import org.apache.spark.streaming.receiver.Receiver;
 
/**
 * @Copyright: 2019-2021
 * @FileName: CustomStreamingReceiver.java
 * @Author: PJL
 * @Date: 2020/9/1 17:07
 * @Description: 自定义接收streaming类
 */
@Slf4j
public class CustomStreamingReceiver extends Receiver<String> {
 
    /**
     *
     * @author	hz15041240
     * @date	2018年1月18日 下午4:37:22
     * @version
     */
    private static final long serialVersionUID = 5817531198342629801L;
 
    public CustomStreamingReceiver(StorageLevel storageLevel) {
        super(storageLevel);
    }
 
    @Override
    public void onStart() {
        new Thread(this::doStart).start();
        log.info("开始启动Receiver...");
        //doStart();
    }
 
    public void doStart() {
        while(!isStopped()) {
            int value = RandomUtils.nextInt(100);
            if(value <20) {
                try {
                    Thread.sleep(1000);
                }catch (Exception e) {
                    log.error("sleep exception",e);
                    restart("sleep exception", e);
                }
            }
            store(String.valueOf(value));
        }
    }
 
 
    @Override
    public void onStop() {
        log.info("即将停止Receiver...");
    }
}
```

控制层服务接口

```java
package com.patrol.spark.controller;
 
import com.patrol.spark.service.SparkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
 
import java.util.Map;
 
/**
 * @Copyright: 2019-2021
 * @FileName: SparkController.java
 * @Author: PJL
 * @Date: 2020/9/1 17:11
 * @Description: Spark控制器
 */
@RestController
public class SparkController {
 
    @Autowired
    private SparkService sparkService;
 
    @RequestMapping("/spark/top10")
    public Map<String, Object> calculateTopTen() {
        return sparkService.calculateTopTen();
    }
 
    @RequestMapping("/spark/exercise")
    public void exercise() {
        sparkService.sparkExerciseDemo();
    }
 
    @RequestMapping("/spark/stream")
    public void streamingDemo() throws InterruptedException {
        sparkService.sparkStreaming();
    }
}
```

### Spark向集群提交任务

接口调用

```java
package com.patrol.spark.controller;
 
import com.patrol.spark.threads.InputStreamReaderRunnable;
import org.apache.spark.launcher.SparkLauncher;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.HashMap;
 
/**
 * @Copyright: 2019-2021
 * @FileName: SparkLauncherController.java
 * @Author: PJL
 * @Date: 2020/9/1 17:59
 * @Description: Spark向集群提交任务[https://blog.csdn.net/lyd882/article/details/103806085]
 */
@RestController
public class SparkLauncherController {
 
    /**
     * 利用官方提供的SparkLauncher java接口来使用java代码提交Spark任务到Spark集群
     *
     * @return
     */
    @GetMapping(value = "spark/kpi")
    public String submitTast(){
        HashMap env = new HashMap();
        //hadoop、spark环境变量读取
        env.put("HADOOP_CONF_DIR" ,  System.getenv().getOrDefault("HADOOP_CONF_DIR","/usr/local/hadoop/etc/overriterHaoopConf"));
        env.put("JAVA_HOME", System.getenv().getOrDefault("JAVA_HOME","/usr/local/java/jdk1.8.0_151"));
        //创建SparkLauncher启动器
        SparkLauncher handle = new SparkLauncher(env)
                .setSparkHome("/home/spark/spark-2.4.4-bin-hadoop2.7")
                .setAppResource("/home/sino/spark-model-1.0/lib/spark-model-1.0.jar")
                .setMainClass("com.sinovatio.spark.JobStarter")
                .setMaster("yarn")
                .setDeployMode("client")
                .setConf("spark.yarn.queue","sino")
                .setConf("spark.app.id", "luncher-test")
                .setConf("spark.driver.memory", "1g")
                .setConf("spark.executor.memory", "1g")
                .setConf("spark.executor.instances", "2")
                .setConf("spark.executor.cores", "2")
                .setConf("spark.default.parallelism", "12")
                .setConf("spark.driver.allowMultipleContexts","true")
                .setVerbose(true);
 
        try {
            //任务提交
            Process process = handle.launch();
            //日志跟踪子线程
            InputStreamReaderRunnable inputStreamReaderRunnable = new InputStreamReaderRunnable(process.getInputStream(), "input");
            Thread inputThread = new Thread(inputStreamReaderRunnable, "LogStreamReader input");
            inputThread.start();
 
            InputStreamReaderRunnable errorStreamReaderRunnable = new InputStreamReaderRunnable(process.getErrorStream(), "error");
            Thread errorThread = new Thread(errorStreamReaderRunnable, "LogStreamReader error");
            errorThread.start();
 
            System.out.println("Waiting for finish...");
            int exitCode = process.waitFor();
            System.out.println("Finished! Exit code:" + exitCode);
            return "status: "+exitCode;
 
        }catch (Exception e){
            e.printStackTrace();
            return "status: "+1;
        }
 
    }
}
```

使用Runable实现线程

```java
package com.patrol.spark.threads;
 
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
 
/**
 * @Copyright: 2019-2021
 * @FileName: InputStreamReaderRunnable.java
 * @Author: PJL
 * @Date: 2020/9/1 18:01
 * @Description: 输入流读取线程实现
 */
public class InputStreamReaderRunnable implements Runnable {
 
    private BufferedReader reader;
 
    private String name;
 
    public InputStreamReaderRunnable(InputStream is, String name) {
        this.reader = new BufferedReader(new InputStreamReader(is));
        this.name = name;
    }
 
    public void run() {
        System.out.println("InputStream " + name + ":");
        try {
            String line = reader.readLine();
            while (line != null) {
                System.out.println(line);
                line = reader.readLine();
            }
            reader.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

### 程序jar包运行

利用spark-submit指令运行(在spark安装目录bin下)：

```shell
spark-submit \
    --class com.patrol.spark.PatrolSparkServiceApplication  \
    --executor-memory 4G \
    --num-executors 8 \
    --master yarn-client \
/data/test/patrol-spark-service-0.0.1-SNAPSHOT.jar
```

目前大多数环境都是在Linux服务器上运行，请使用Linux实验。

项目下载地址：https://download.csdn.net/download/boonya/12800097

Github代码地址：https://github.com/open-micro-services/springcloud/tree/master/demo-projects/sb-spark

## 参考文章
* https://blog.csdn.net/boonya/article/details/108367451