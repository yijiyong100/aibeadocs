---
title: SpringBoot集成ES基础案例
---

::: tip
本文主要是介绍 SpringBoot集成ES基础案例 。
:::

[[toc]]

## docker+es+kibana和springboot中使用es

本次和大家分享的主要是docker搭建es和springboot操作es的内容，也便于工作中或将来使用方便，因此从搭建es环境开始到代码插入信息到es中；主要节点如下：

1. elasticsearch启动
2. mobz/elasticsearch-head启动
3. kibana启动
4. springboot操作es

## 1.elasticsearch启动

　　我本机环境是windows10，要挂载es的配置文件需要在本机上创建配置文件，因此这里创建配置文件C:UsersAdministratoreses-master.yml，配置文件内容如：



``` shell
 1 #集群名称
 2 cluster.name: "shenniu_elasticsearch"
 3 #本节点名称
 4 node.name: master
 5 #是否master节点
 6 node.master: true
 7 #是否存储数据
 8 node.data: true
 9 #head插件设置
10 http.cors.enabled: true
11 http.cors.allow-origin: "*"
12 http.port: 9200
13 transport.tcp.port: 9300
14 #可以访问的ip
15 network.bind_host: 0.0.0.0
```



　　这里配置一个es的cluster的master节点，集群名称shenniu_elasticsearch，有了配置下面就是启动es命令：

``` shell
1 docker pull elasticsearch
2 docker run -d --name es-master -p 9200:9200 -p 9300:9300 -v C:/Users/Administrator/es/es-mast
3 er.yml:/usr/share/elasticsearch/config/elasticsearch.yml elasticsearch
```

　　启动完后在浏览器浏览 http://192.168.183.9:9200/ 得到如下成功信息：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/es/case/casesimple/ee75aa886423e639ea6d17fd4cc2c3140bcdc48b.png')" alt="wxmp">

# 2.mobz/elasticsearch-head启动

　　elasticsearch-head做为es集群状态查看插件工具，用起来还是挺方便的，启动命令如：

``` shell
1 docker pull mobz/elasticsearch-head
2 docker run -d -p 9100:9100 --name mobz-es mobz/elasticsearch-head
```

　　然后在浏览器录入 http://192.168.183.9:9100/ ，能够看到插件的操作界面，其中包含了索引，数据，基本查询等功能很是方便

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/es/case/casesimple/667c3510bd1758144a90159ade89967d43ed9de1.png')" alt="wxmp">

　　为了博客内容充实性，这里我添加了一些日志到es中，通过head工具能够看到如：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/es/case/casesimple/d606584e77a0fa283cfc3147489caa85f0089b18.png')" alt="wxmp">　　

# 3.kibana启动

　　kibana是专门针对es内容的一款查看工具，和elasticsearch-head不同的是前者主要是内容显示，通常有elk的组合，这里同样通过docker来启动下

``` shell
1 docker pull kibana
2 docker run --name kibana -e ELASTICSEARCH_URL=http://192.168.183.9:9200 -p 5601:5601 -d kibana
```

　　这里需要配置关联的es的地址，否则kibana界面无法正常使用，倘若es停了，kibana界面也会变成如下

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/es/case/casesimple/b2788d5e86c1507f27cdc79a942d295e8be6ff86.png')" alt="wxmp">

　　如果es和kibana都正常的话，就能够进入到如下界面

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/es/case/casesimple/8ad3adf4cab29ed45ad891d9a10cf8328f506bbd.png')" alt="wxmp">

# 4.springboot操作es

　　要说springboot中使用es有很多方式，这里使用的是它集成的包，通过maven添加如下依赖：

```xml
1 <!--es-->
2 <dependency>
3      <groupId>org.springframework.boot</groupId>
4      <artifactId>spring-boot-starter-data-elasticsearch</artifactId>
5 </dependency>
```

　　然后需要在配置文件中增加关于es的的相关配置，由于这里采用的是resposity操作es，所以这里需要设置为启动状态：



```yml
1 spring:
2   data:
3     elasticsearch:
4       cluster-name: shenniu_elasticsearch
5       cluster-nodes: 192.168.183.9:9300
6       repositories:
7         enabled: true
```



　　cluster-name对应的是上面启动es时集群配置的名称，cluster-nodes对应集群访问的ip和端口；一般往es中存储的都是对象形式，所以这里需要定义一个实体类，这里是 MoEsLog：



``` java
 1 @Document(indexName = "eslog")
 2 public class MoEsLog {
 3     private String message;
 4 
 5     public String getMessage() {
 6         return message;
 7     }
 8 
 9     public void setMessage(String message) {
10         this.message = message;
11     }
12 
13     private String dateTime;
14 
15     public String getDateTime() {
16         return dateTime;
17     }
18 
19     public void setDateTime(String dateTime) {
20         this.dateTime = dateTime;
21     }
22 
23     @Id
24     private String _id;
25 }
```



　　通过注解@Document里面的indexName来创建es索引名，然后通过继承ElasticsearchRepository来使用里面的增删改查方法，这里创建一个es工厂接口如：

```java
1 @Repository
2 public interface IEsRepository extends ElasticsearchRepository<MoEsLog, String> {
3 }
```

　　到此基本的配置和底层的工厂接口都完成了，剩下的就是怎么调用和简单的封装了，这里以save方法为例：



```java
 1 @Service
 2 public class EsLogServiceImpl implements EsLogService {
 3 
 4     @Autowired
 5     private IEsRepository esRepository;
 6 
 7     @Override
 8     public void addEsLog(String message) {
 9 
10         Executors.newFixedThreadPool(10).submit(new Runnable() {
11             @Override
12             public void run() {
13                 SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSZ");
14 
15                 MoEsLog esLog = new MoEsLog();
16                 esLog.setMessage(message);
17                 esLog.setDateTime(simpleDateFormat.format(new Date()));
18                 esRepository.save(esLog);
19             }
20         });
21     }
22 
23     @Override
24     public <T> void addEs(T t) {
25         addEsLog(JsonUtil.toJson(t));
26     }
27 }
```



　　值得主要的是里面对datetime属性赋值的是一个时间字符串，格式如：yyyy-MM-dd'T'HH:mm:ss.SSSZ，这里匹配es的时间格式，不出意外的运行程序后，能够在kibana中看到如下信息：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/es/case/casesimple/00e431e50377412552e58adc8d82e30a6e083bb9.png')" alt="wxmp">

　　这里再转到9100端口的mobz/elasticsearch-head界面，也能够看到如下的记录：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/es/case/casesimple/bb7e04bb13d6b0171aabb3c0641bcf7cc042aa37.png')" alt="wxmp">

 

git地址： https://github.com/shenniubuxing3  云栖社区博客：https://yq.aliyun.com/users/xjexlr3no5xj4



## 参考文章
* https://www.cnblogs.com/wangrudong003/archive/2018/10/11/9770537.html