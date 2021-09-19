---
title: Mahout-推荐入门介绍
---

::: tip
本文主要是介绍 Mahout-推荐入门案例 。
:::

[[toc]]

## mahout 推荐系统 之 hello world

### **前言** ：

推荐系统的输入是必要的 ,这些数据是推荐的基础。因为非常熟悉的推荐系统引擎将item(物品)推荐给user(用户)，很容易的认为偏好(Preference)是user和item之间的联系。偏好包含了一个user ID和一个item ID，通常情况下，一个数值代表了user对item偏好的强度。Mahout中ID都是数值，实际上是整数（lang型）。偏好值可以是任何值，值越大代表这正向偏好 越大。例如，这些值可能是1到5的打分，user将1给于他不喜欢的，5给他很喜欢的。

基础数据：intro.csv

``` shell
1,101,5.0
1,102,3.0
1,103,2.5

2,101,2.0
2,102,2.5
2,103,5.0
2,104,2.0

3,101,2.5
3,104,4.0
3,105,4.5
3,107,5.0

4,101,5.0
4,103,3.0
4,104,4.5
4,106,4.0

5,101,4.0
5,102,3.0
5,103,2.0
5,104,4.0
5,105,3.5
5,106,4.0
```

用户1和用户5具有相同的喜好。他们都喜欢101这本书，对102的喜欢弱一些，对103的喜欢更弱。同理，用户1和4具有相同的兴趣，他们都喜欢101和103，没有信息显示用户4喜欢102。另一方面，用户1和用户2的兴趣好像正好相反，用户1喜欢 101，但用户2讨厌101，用户1喜欢103而用户2正好相反。用户1和3的交集很少，只有101这本书显示了他们的兴趣。

### 简单的推荐程序demo，如下：

``` java
package com.xh.recommender;

import org.apache.mahout.cf.taste.impl.model.file.FileDataModel;
import org.apache.mahout.cf.taste.impl.neighborhood.NearestNUserNeighborhood;
import org.apache.mahout.cf.taste.impl.recommender.GenericUserBasedRecommender;
import org.apache.mahout.cf.taste.impl.similarity.PearsonCorrelationSimilarity;
import org.apache.mahout.cf.taste.model.DataModel;
import org.apache.mahout.cf.taste.neighborhood.UserNeighborhood;
import org.apache.mahout.cf.taste.recommender.RecommendedItem;
import org.apache.mahout.cf.taste.recommender.Recommender;
import org.apache.mahout.cf.taste.similarity.UserSimilarity;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.File;
import java.net.URL;
import java.util.List;

/**
 * @author xiaohe
 * @version V1.0.0
 * @Description: mahout 推荐简介
 * @date: 2018-8-20 20:51
 * @Copyright: 
 */
public class RecommenderIntro {

    private static Logger logger = LoggerFactory.getLogger(RecommenderIntro.class);

    public static void main(String[] args) throws Exception {
        final String filePath = "recommend/intro.csv";
        URL url = RecommenderIntro.class.getClassLoader()
                .getResource(filePath);
        File modelFile = new File(url.getFile());
        if(!modelFile.exists()) {
            System.err.println("Please, specify name of file, or put file 'input.csv' into current directory!");
            System.exit(1);
        }
        /**
         *
         * 装载  数据  文件
         * DataModel 实现储存并为计算机提供所需的所有偏好、用户和物品数据
         *
         */
        DataModel model = new FileDataModel(modelFile);
        /**
         * UserSimilarity 实现给出两个用户之间的相似度
         * 可以从多种可能度量或计算机中选一种作为依赖
         */
        UserSimilarity similarity = new PearsonCorrelationSimilarity(model);

        // UserNeighborhood 实现   明确与给定用户最相似的一组用户
        UserNeighborhood neighborhood =
                new NearestNUserNeighborhood(2, similarity, model);

        /**
         *
         * 生成推荐引擎
         * Recommender 合并所有的组件为用户推荐物品
         *
         */
        Recommender recommender = new GenericUserBasedRecommender(
                model, neighborhood, similarity);
        // 为用户1 推荐2件  物品
        List<RecommendedItem> recommendations =
                recommender.recommend(1, 2);

        for (RecommendedItem recommendation : recommendations) {
            System.out.println(recommendation);
        }

    }

}
```

### 项目结构如图：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dm/mahoutrecommend/intro-1.png')" alt="wxmp">

### 附上pom.xml

``` xml
<?xml version="1.0" encoding="UTF-8"?>

<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>com.xh</groupId>
    <artifactId>springboot-mahout</artifactId>
    <version>1.0.0-SNAPSHOT</version>
    <packaging>war</packaging>

    <name>springboot-mahout Maven Webapp</name>
    <!-- FIXME change it to the project's website -->
    <url>http://www.example.com</url>

    <properties>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <maven.compiler.source>1.8</maven.compiler.source>
        <maven.compiler.target>1.8</maven.compiler.target>
    </properties>

    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>1.5.8.RELEASE</version>
        <relativePath /> <!-- lookup parent from repository -->
    </parent>

    <dependencies>
        <dependency>
            <groupId>org.mybatis.spring.boot</groupId>
            <artifactId>mybatis-spring-boot-starter</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>

        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
            <scope>runtime</scope>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>

        <dependency>
            <groupId>com.fasterxml.jackson.core</groupId>
            <artifactId>jackson-annotations</artifactId>
        </dependency>
        <dependency>
            <groupId>com.fasterxml.jackson.core</groupId>
            <artifactId>jackson-core</artifactId>
        </dependency>
        <dependency>
            <groupId>com.fasterxml.jackson.core</groupId>
            <artifactId>jackson-databind</artifactId>
        </dependency>

        <!-- https://mvnrepository.com/artifact/org.apache.mahout/mahout-core -->
        <dependency>
            <groupId>org.apache.mahout</groupId>
            <artifactId>mahout-core</artifactId>
            <version>0.9</version>
        </dependency>

        <!-- https://mvnrepository.com/artifact/commons-io/commons-io -->
        <dependency>
            <groupId>commons-io</groupId>
            <artifactId>commons-io</artifactId>
            <version>2.6</version>
        </dependency>

    </dependencies>

    <build>
        <finalName>springboot-mahout</finalName>
    </build>
</project>
```

## 参考文章
* https://blog.csdn.net/qq_37502106/article/details/82054167