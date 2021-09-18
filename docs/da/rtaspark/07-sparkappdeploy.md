---
title: Spark-部署springboot项目
---

::: tip
本文主要是介绍 Spark-部署springboot项目 。
:::

[[toc]]

## 部署spring boot项目到spark上

### 先说一下开发环境大概情况：

IDE：IntelliJ IDEA

使用spring boot和gradle进行项目的构建

jdk版本 1.8，这里注意一下，开发环境打jar包时的jdk版本要和spark配置里的jdk的版本一致。



## 步骤

1、完成coding后，把当前module打成jar包，具体可参考  [这篇文章](http://blog.csdn.net/asd1098626303/article/details/60868123)，自行修改build.gradle打包。

成功后从目录`build/libs/${module_name}.jar下取出${module_name}.jar`放到部署了spark的机器上。

2、对于spring boot的项目，它的启动类一般是org.springframework.boot.loader.JarLauncher。具体可以打开`${module_name}.jar`查看META-INF目录下的MANIFEST.MF文件，Main-Class这一项后面的值即为启动class。这里要记下。

3、在部署了spark的机器上，在`${module_name}.jar`包所在的目录下新建一个start.sh文件。（这个jar包也可以放在HDFS上，我这里是放在了本地）。编辑start.sh文件如下



```shell
#!/bin/bash

spark-submit --master yarn \
    --num-executors 1 \
    --executor-memory 2G \
    --driver-memory 2G \
    --executor-cores 2 \
    --total-executor-cores 2 \
    --class org.springframework.boot.loader.JarLauncher \
    ${module_name}.jar \
```

这里spark-submit涉及的参数比较简单，可根据自己实际情况进行修改。其中--class要指定项目的启动类，在spring boot里，即为上述类名。



4、执行启动文件即可：bash start.sh



### 可能遇到的问题及解决思路

1、打包环境和spark部署环境的jdk版本不一致。

这种情况下spark-submit的时候一般会报

java.lang.UnsupportedClassVersionError unsupported major.minor version 52.0这个error。

可以在打包的时候指定jdk版本，比如在当前module和当前project的build.gradle文件里修改



```ini
sourceCompatibility=1.8
targetCompatibility=1.8
```

或者修改部署spark的机器上的JAVA_HOME。


## 【----------------------------】


## Spark任务提交与SpringBoot项目集成

------

## 原理

```
利用官方提供的SparkLauncher java接口来使用java代码提交Spark任务到Spark集群
```

## 实现

- 一个SparkPI 的计算demo，并打包成jar
- 新建SpringBoot项目，项目加入spark-core依赖，否则无法找到SparkLuncher

### 关键配置

```xml
 	<properties>
        <java.version>1.8</java.version>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <sala-version>2.11</sala-version>
        <spark-version>2.4.4</spark-version>
        <scope-type>compile</scope-type>
    </properties>
    <dependency>
        <groupId>org.apache.spark</groupId>
        <artifactId>spark-core_${sala-version}</artifactId>
        <version>${spark-version}</version>
        <scope>${scope-type}</scope>
   </dependency>
```

### 新建个sparkController，内部代码如下：

```java
package com.ly.spark.oneline.controller;

import org.apache.spark.launcher.SparkLauncher;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;

@RestController
public class SparkLauncherController {

    @GetMapping(value = "/sparkPI")
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
    @GetMapping(value = "/hello")
    public String hello(){
        return "this is hello page!";
    }

}
    
```

### 子线程日志监控类：

```java
package com.ly.spark.oneline.controller;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

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

- SpringBoot项目打包，与sparkPi项目一起放到hadoop集群里某台机器上
- 启动该SpringBoot项目，访问该rest接口: http://ip:port/sparkPI 实现任务提交，成功并返回状态码0,否则任务失败

------

以上参考官网与 ：https://blog.csdn.net/u011244682/article/details/79170134


## 参考文章
* https://blog.csdn.net/u011054678/article/details/79075881
* https://blog.csdn.net/feiying0canglang/article/details/114173420