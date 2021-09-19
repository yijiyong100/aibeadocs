---
title: Mahout-推荐系统案例(二)
---

::: tip
本文主要是介绍 Mahout-推荐系统案例(二) 。
:::

[[toc]]

## 基于mahout的推荐系统(电商案例)

## 1. 概念介绍
### 1.1 推荐系统

推荐系统是利用电子商务网站向客户提供商品信息和建议，帮助用户决定应该购买什么产品，模拟销售人员帮助客户完成购买过程。个性化推荐是根据用户的兴趣特点和购买行为，向用户推荐用户感兴趣的信息和商品。

随着电子商务规模的不断扩大，商品个数和种类快速增长，据数据联盟的统计，淘宝拥有8千万的商品，顾客需要花费大量的时间才能找到自己想买的商品。这种浏览大量无关的信息和产品过程无疑会使淹没在信息过载问题中的消费者不断流失。

为了解决这些问题，个性化推荐系统应运而生。个性化推荐系统是建立在海量数据挖掘基础上的一种高级商务智能平台，以帮助电子商务网站为其顾客购物提供完全个性化的决策支持和信息服务。同时也可以提升下单转化率，为平台带来一定的收益。

目前比较成熟的案例有：

- 亚马逊的猜你喜欢

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dm/mahoutrecommend/recommendcase2-1.png')" alt="wxmp">

京东的热门推荐

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dm/mahoutrecommend/recommendcase2-2.png')" alt="wxmp">

爱奇艺的猜你喜欢，qq好友推荐，相亲网站的用户推荐，招聘网站的职业推荐等等。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dm/mahoutrecommend/recommendcase2-3.png')" alt="wxmp">

### 1.2 Mahout介绍

Mahout 是 Apache Software Foundation 旗下的一个开源的分布式机器学习算法的算法库，使用了Taste来提高协同过滤算法的实现，它是一个基于Java实现的可扩展的，高效的推荐引擎。提供一些可扩展的机器学习领域经典算法的实现，同时mahout也是一个强大的数据挖掘工具，旨在帮助开发人员更加方便快捷地创建智能应用程序。Taste不仅仅只适用于Java应用程序，它可以作为内部服务器的一个组件以HTTP和Web Service的形式向外界提供推荐的逻辑。

Mahout另外一个大特点是具有基于hadoop的实现，可以把算法运行在hadoop之上，运用MapReduce模式大大提高算法处理能力。

Mahout包含了许多算法实现：

- 聚类算法：K-means（K均值算法）、Canopy（Canopy聚类）、Hierarchical（层次聚类）等。
- 分类算法：Logistic Regression（逻辑回归）、Bayesian（贝叶斯）、SVM（支持向量机）、Perceptron（感知器算法）等。
- 回归算法：Locally Weighted Linear Regression（局部加权线性回归）等。
- 计算相似性算法：Non-distributed recommenders（Non-distributed recommenders）、Non-distributed recommenders（欧几里得距离算法）、CosineMeasureSimilarity（余弦计算）、SpearmanCorrelationSimilarity（斯皮尔曼相关系数）
- 推荐算法：GenericUserBasedRecommender（基于用户的推荐）、GenericItemBasedRecommender（基于内容的推荐）、SlopeOneRecommender（SlopeOne算法）、SVDRecommender （SVD算法）、TreeClusteringRecommender（树形聚类的推荐算法）。

## 2. 协同过滤实现过程

推荐系统一般包含以下几个步骤：

### 2.1 收集用户偏好数据

要从用户的行为和偏好中发现规律，并基于此给予推荐，如何收集用户的偏好信息成为系统推荐效果最基础的决定因素。用户有很多方式向系统提供自己的偏好信息，而且不同的应用也可能大不相同，通用的用户行为有评分，投票，转发，保存，书签，标记，评论，点击流，页面停留时间，是否购买等。以上行为常见的有两种组合方式：方式1：根据查询或者购买分组，给用户显示时，提示查看过该商品的用户还查看过什么什么商品，购买过该商品的用户还购买过什么什么商品。方式2：根据不同的行为加权，比如购买了该商品权重高，查看权重低。

偏好数据的来源一般有：

- 数据库或者缓存：可以收集到用户的订单信息，购物车信息，关注，评论，收藏等信息，能直观的反应出用户的喜好数据。
- 日志信息：通过flume组件收集用户从打开网站，浏览过什么商品，页面停留多久这些可以收集到用户点击流数据。
- 第三方数据平台：与第三方平台合作拿到用户在其他平台的偏好数据。

下面是在数据库中通过sql对用户行为的一个偏好值简单计算示例 

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dm/mahoutrecommend/recommendcase2-4.png')" alt="wxmp">

### 2.2 数据减噪与归一处理

减噪的目的是去除误操作，归一的目的是通过加权操作，比如刚才的行为划分1234类，权重也是从0.1到0.4不等，这样就可以把各个行为数据统一在一定范围中，使得最终的喜好值更加精确。

### 2.3 算出相似的物品或者用户

常用的算法基于用户UserCF和基于内容ItemCF的推荐

- UserCF：推荐和此用户相似的用户行为过的商品给该用户，比如，张三买过苹果、香蕉、橘子、梨等物品，李四只买过香蕉，王五买过香蕉、橘子、梨、火龙果。张三和李四相似度是1，张三和王五相似度是3。则基于UserCF则会给张三推荐相似度高的用户王五，产生行为过的商品火龙果给张三。

- ItemCF：推荐和此用户历史上行为过商品的相似商品推荐给该用户，比如张三以前买过笔记本电脑，则基于ItemCF则会把和笔记本电脑相似度高的其他商品推荐给张三。

两者区别：UserCF本质是基于用户对物品的偏好找到相邻的用户，然后将邻居用户喜欢的推荐给当前用户,适用于用户较少的情况，如果用户比较多计算量太大，侧重于跟当前用户相似的其他用户的行为，ItemCF本质基于用户对物品的偏好找到相似的物品，然后依据用户的历史偏好。推荐相似的物品给他，适用于商品较少的情况，更偏向于用户的历史行为。

### 2.4 将相似商品推荐给用户

算法推荐出来id以后，在根据id查询出商品其他信息展示给用户。


## 3. 代码实现
### 3.1 数据准备

创建商品表

```sql
CREATE TABLE `tb_item` (
  `pid` bigint(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(2000) CHARACTER SET latin1 DEFAULT NULL,
  `types` varchar(2000) CHARACTER SET latin1 DEFAULT NULL,
  PRIMARY KEY (`pid`)
) ENGINE=InnoDB AUTO_INCREMENT=65134 DEFAULT CHARSET=utf8;
```

创建用户偏好表

```sql
CREATE TABLE `user_pianhao_data1` (
  `id` bigint(11) NOT NULL AUTO_INCREMENT,
  `uid` bigint(11) DEFAULT NULL,
  `pid` bigint(11) DEFAULT NULL,
  `val` bigint(11) DEFAULT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1001 DEFAULT CHARSET=utf8;
```

表中测试数据较多，可在网盘下载数据进行初始化链接：https://pan.baidu.com/s/1VSgD2uiJ69zDsw-KCtfEUQ

### 3.2 搭建springboot工程 

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dm/mahoutrecommend/recommendcase2-5.png')" alt="wxmp">

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dm/mahoutrecommend/recommendcase2-6.png')" alt="wxmp">

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dm/mahoutrecommend/recommendcase2-7.png')" alt="wxmp">

### 3.3 编写application.properties配置文件

```ini
#DB Configuration:
spring.datasource.driverClassName=com.mysql.jdbc.Driver
spring.datasource.url=jdbc:mysql://127.0.0.1:3306/recommend?useUnicode=true&characterEncoding=utf8
spring.datasource.username=root
spring.datasource.password=123456
 
#spring集成Mybatis环境
#pojo别名扫描包
mybatis.type-aliases-package=cn.itcast.domain
#加载Mybatis映射文件
mybatis.mapper-locations=classpath:mapper/*Mapper.xml
```

### 3.4 编写domain实体类

``` java
package cn.itcast.domain;
public class Item {
    private Long pid;
    private String name;
    private String types;
 
    public Long getPid() {
        return pid;
    }
    public void setPid(Long pid) {
        this.pid = pid;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getTypes() {
        return types;
    }
    public void setTypes(String types) {
        this.types = types;
    }
    @Override
    public String toString() {
        return "Item{" +
                "pid=" + pid +
                ", name='" + name + '\'' +
                ", types='" + types + '\'' +
                '}';
    }
}
```

### 3.5 编写Dao层的mapper接口和xml映射文件

``` java
package cn.itcast.dao;
 
import cn.itcast.domain.Item;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import java.util.List;
@Mapper
public interface ItemMapper {
    public List<Item> findAllByIds(@Param("Ids") List<Long> Ids);
}
<?xml version="1.0" encoding="utf-8" ?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd" >
<mapper namespace="cn.itcast.dao.ItemMapper">
    <select id="findAllByIds" resultType="item">
      select * from tb_item
        WHERE pid in
        <foreach collection="Ids" item="id" open="(" close=")" separator=",">
            #{id}
        </foreach>
    </select>
</mapper>
```

### 3.6 编写MyConfig配置类和Service层

MyConfig配置类：用于设置基于数据库的DataModel模型。

``` java
package cn.itcast.myconfig;
 
import com.mysql.jdbc.jdbc2.optional.MysqlDataSource;
import org.apache.mahout.cf.taste.impl.model.jdbc.MySQLJDBCDataModel;
import org.apache.mahout.cf.taste.model.DataModel;
import org.apache.mahout.cf.taste.model.JDBCDataModel;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
 
@Configuration
public class MyConfig {
    @Bean
    public DataModel getMySQLDataModel(){
        MysqlDataSource dataSource=new MysqlDataSource();
        dataSource.setServerName("localhost");
        dataSource.setUser("root");
        dataSource.setPassword("123456");
        dataSource.setDatabaseName("recommend");//数据库名字
        //参数1：mysql数据源信息，参数2：表名，参数3：用户列字段，参数4：商品列字段，参数5：偏好值字段，参数6：时间戳
        JDBCDataModel dataModel=new MySQLJDBCDataModel(dataSource,"user_pianhao_data1","uid","pid","val", "time");
       
                   /
         *  DataModel可基于数据也可基于文件
         *  文件汇总数据格式
         *  用户id::商品id::偏好分值::时间戳
         *  1::122::5::838985046
         *  1::185::5::838983525
         *  1::231::5::838983392
         *  .........
         */
        //File file = new File("E:\\initData.dat");
        //try {
        //   DataModel dataModel = new GroupLensDataModel(file);
        //} catch (IOException e) {
        //    e.printStackTrace();
        //}
       
        return dataModel;
    }
}
```

Service接口：

``` java
package cn.itcast.service;
 
import cn.itcast.domain.Item;
import java.util.List;
 
public interface RecommendService {
          //基于用户的商品推荐
    List<Item> getRecommendItemsByUser(Long userId, int howMany);
    //基于内容的商品推荐
    List<Item> getRecommendItemsByItem(Long userId, Long itemId, int howMany);
}
```

Service实现类：

``` java
package cn.itcast.service.impl;
 
import cn.itcast.dao.ItemMapper;
import cn.itcast.domain.Item;
import cn.itcast.service.RecommendService;
import com.mysql.jdbc.jdbc2.optional.MysqlDataSource;
import org.apache.mahout.cf.taste.common.TasteException;
import org.apache.mahout.cf.taste.impl.model.jdbc.MySQLJDBCDataModel;
import org.apache.mahout.cf.taste.impl.neighborhood.NearestNUserNeighborhood;
import org.apache.mahout.cf.taste.impl.recommender.GenericItemBasedRecommender;
import org.apache.mahout.cf.taste.impl.recommender.GenericUserBasedRecommender;
import org.apache.mahout.cf.taste.impl.similarity.PearsonCorrelationSimilarity;
import org.apache.mahout.cf.taste.model.DataModel;
import org.apache.mahout.cf.taste.model.JDBCDataModel;
import org.apache.mahout.cf.taste.neighborhood.UserNeighborhood;
import org.apache.mahout.cf.taste.recommender.RecommendedItem;
import org.apache.mahout.cf.taste.recommender.Recommender;
import org.apache.mahout.cf.taste.similarity.ItemSimilarity;
import org.apache.mahout.cf.taste.similarity.UserSimilarity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
 
import java.util.ArrayList;
import java.util.List;
 
@Service
public class RecommendServiceImpl implements RecommendService {
    @Autowired
    private ItemMapper itemMapper;
 
    @Autowired
    private DataModel dataModel;
 
    @Override
    public List<Item> getRecommendItemsByUser(Long userId, int howMany) {
        List<Item> list = null;
        try {
            //计算相似度，相似度算法有很多种，采用基于皮尔逊相关性的相似度 
            UserSimilarity similarity = new PearsonCorrelationSimilarity(dataModel);
            //计算最近邻域，邻居有两种算法，基于固定数量的邻居和基于相似度的邻居，这里使用基于固定数量的邻居
            UserNeighborhood userNeighborhood = new NearestNUserNeighborhood(100, similarity, dataModel);
            //构建推荐器，基于用户的协同过滤推荐
            Recommender recommender = new GenericUserBasedRecommender(dataModel, userNeighborhood, similarity);
            long start = System.currentTimeMillis();
            //推荐商品
            List<RecommendedItem> recommendedItemList = recommender.recommend(userId, howMany);
            List<Long> itemIds = new ArrayList<Long>();
            for (RecommendedItem recommendedItem : recommendedItemList) {
                System.out.println(recommendedItem);
                itemIds.add(recommendedItem.getItemID());
            }
            System.out.println("推荐出来的商品id集合"+itemIds);
 
            //根据商品id查询商品
            if(itemIds!=null &&itemIds.size()>0) {
                list = itemMapper.findAllByIds(itemIds);
            }else{
                list = new ArrayList<>();
            }
            System.out.println("推荐数量:"+list.size() +"耗时："+(System.currentTimeMillis()-start));
        } catch (TasteException e) {
            e.printStackTrace();
        }
        return list;
    }
 
    @Override
    public List<Item> getRecommendItemsByItem(Long userId, Long itemId, int howMany) {
 
        List<Item> list = null;
        try {
            //计算相似度，相似度算法有很多种，采用基于皮尔逊相关性的相似度 
            ItemSimilarity itemSimilarity = new PearsonCorrelationSimilarity(dataModel);
            //4)构建推荐器，使用基于物品的协同过滤推荐
            GenericItemBasedRecommender recommender = new GenericItemBasedRecommender(dataModel, itemSimilarity);
            long start = System.currentTimeMillis();
            // 物品推荐相似度，计算两个物品同时出现的次数，次数越多任务的相似度越高。
            List<RecommendedItem> recommendedItemList = recommender.recommendedBecause(userId, itemId, howMany);
            //打印推荐的结果
            List<Long> itemIds = new ArrayList<Long>();
            for (RecommendedItem recommendedItem : recommendedItemList) {
                System.out.println(recommendedItem);
                itemIds.add(recommendedItem.getItemID());
            }
            System.out.println("推荐出来的商品id集合"+itemIds);
 
            //根据商品id查询商品
            if(itemIds!=null &&itemIds.size()>0) {
                list = itemMapper.findAllByIds(itemIds);
            }else{
                list = new ArrayList<>();
            }
            System.out.println("推荐数量:"+list.size() +"耗时："+(System.currentTimeMillis()-start));
        } catch (TasteException e) {
            e.printStackTrace();
        }
        return list;
    }
}
```

### 3.7 编写controller

``` java
package cn.itcast.controller;
 
import cn.itcast.domain.Item;
import cn.itcast.service.RecommendService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
 
@RestController
public class RecommendController {
 
    @Autowired
    private RecommendService recommendService;
 
    /
     * 基于用户的推荐
     * @param userId 用户id
     * @param num 推荐数量
     * @return
     */
    @RequestMapping("recommendByUser")
    public List<Item> getRecommendItemsByUser(Long userId, int num){
        List<Item> items= recommendService.getRecommendItemsByUser(userId,num);
        return items;
    }
    /
     * 基于内容的推荐
     * @param userId 用户id
     * @param itemId 商品id
     * @param num 推荐数量
     * @return
     */
    @RequestMapping("recommendByItem")
    public List<Item> getRecommendItemsByItem(Long userId,Long itemId, int num){
        List<Item> items= recommendService.getRecommendItemsByItem(userId,itemId, num);
        return items;
    }
}
```

### 3.8 测试

打开浏览器访问http://localhost:8080/recommendByUser?userId=5&num=10, 给id为5的用户推荐10个商品,输出:

``` shell
[{"pid":50,"name":"Usual Suspects, The (1995)","types":"Crime|Mystery|Thriller"},{"pid":260,"name":"Star Wars: Episode IV - A New Hope (a.k.a. Star Wars) (1977)","types":"Action|Adventure|Sci-Fi"},{"pid":590,"name":"Dances with Wolves (1990)","types":"Adventure|Drama|Western"},{"pid":1732,"name":"Big Lebowski, The (1998)","types":"Comedy|Crime|Mystery|Thriller"},{"pid":2335,"name":"Waterboy, The (1998)","types":"Comedy"},{"pid":2478,"name":"Three Amigos (1986)","types":"Comedy|Western"},{"pid":4027,"name":"O Brother, Where Art Thou? (2000)","types":"Adventure|Comedy|Crime"},{"pid":4226,"name":"Memento (2000)","types":"Crime|Drama|Mystery|Thriller"},{"pid":5481,"name":"Austin Powers in Goldmember (2002)","types":"Comedy"},{"pid":5502,"name":"Signs (2002)","types":"Sci-Fi|Thriller"}]
```

访问http://localhost:8080/recommendByItem?userId=5&itemId=231&num=10, 给id为5的用户推荐10个与231相似的商品,输出:

``` shell
[{"pid":253,"name":"Interview with the Vampire: The Vampire Chronicles (1994)","types":"Drama|Horror"},{"pid":592,"name":"Batman (1989)","types":"Action|Crime|Sci-Fi|Thriller"}]
```

## 4.总结

大家可以看得出来，用mahout这个算法库来做推荐系统写起来很简单，大致使用过程有：

步骤1：创建DataModel模型，可以基于文件File的DataModel，也可基于数据库的JDBCDataModel，如果数据库中表数据比较多，推荐耗时非常非常的慢，一般来说数据量都比较大可以基于文件DataModel模型来推荐，也可以将文件上传到hadoop，使用hadoop进行mapreduce计算，提高运算性能。     

步骤2：采用欧几里得、皮尔逊等算法计算相似度。

步骤3：构建推荐器，基于用户或基于内容进行推荐。

步骤4：将推荐出来的商品id补全其他数据返回给用户展示。


## 连载博客推荐：
连载博客推荐:[https://blog.csdn.net/chensanwa/category_8640959.html](https://blog.csdn.net/chensanwa/category_8640959.html)


## 参考文章
* https://blog.csdn.net/qq_40208605/article/details/105838555
* https://blog.csdn.net/qq_40208605/article/details/105840101