---
title: Flink-Boot脚手架介绍
---

::: tip
本文主要是介绍 Flink-Boot脚手架介绍 。
:::

[[toc]]
## 懒松鼠Flink-Boot(Flink+Spring):一款将Flink与Spring生态完美融合的脚手架工程

还在为开发Flink流处理应用程序时无法像开发Spring Boot程序那么优雅的分层以及装配Bean而烦恼吗？

## 你可能面临如下苦恼：

- 1. 开发的Flink流处理应用程序，业务逻辑全部写在Flink的操作符中，代码无法服用，无法分层
- 2. 要是有一天它可以像开发Spring Boot程序那样可以优雅的分层，优雅的装配Bean，不需要自己new对象好了
- 3. 可以使用各种Spring生态的框架，一些琐碎的逻辑不再硬编码到代码中。

GitHub最近超火的一款开源框架，懒松鼠Flink-Boot脚手架，该脚手架简直是Spring开发工程师的福音，完美融合Spring生态体系，再也不需要手动在Java类中创建臃肿的Java对象，简直是开发大型流处理应用程序的必不可少的工具。

## 懒松鼠 Flink-Boot脚手架(FlinkBoot脚手架)

地址：[懒松鼠Flink-Boot 脚手架由《深入理解Flink核心设计与实践原理》作者开发。](https://github.com/intsmaze/flink-boot)

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/da/rtaflink/flinkboot-1.png')" alt="wxmp">

### 接口缓存

**你的现状**

``` java
static Map<String,String> cache=new HashMap<String,String>();

public String findUUID(FlowData flowData) {
    String value=cache.get(flowData.getSubTestItem());
    if(value==null)
    {
        String uuid=userMapper.findUUID(flowData);
        cache.put(uuid,value);
        return uuid;
    }
    return value;
}
```

**你想要的是这样**

``` java
@Cacheable(value = "FlowData.findUUID", key = "#flowData.subTestItem")
public String findUUID(FlowData flowData) {
    return userMapper.findUUID(flowData);
}
```

### 重试机制

**你的现状**

```java
public void insertFlow(FlowData flowData) {
    try{
        userMapper.insertFlow(flowData);
      }Cache(Exception e)
      {
         Thread.sleep(10000);
         userMapper.insertFlow(flowData);
      }
}
```

**你想要的是这样**

```java
    @Retryable(value = Exception.class, maxAttempts = 3, backoff = @Backoff(delay = 2000L, multiplier = 1.5))
    @Override
    public void insertFlow(FlowData flowData) {
        userMapper.insertFlow(flowData);
    }
```

### Bean校验

**你的现状**

``` java
if(flowData.getSubTestItem().length()<2&&flowData.getSubTestItem().length()>7)
{
    return null;
}
if(flowData.getBillNumber()==null)
{
    return null;
}
```

**你想要的是这样**

``` java
Map<String, StringBuffer> validate = ValidatorUtil.validate(flowData);
if (validate != null) {
    System.out.println(validate);
    return null;
}

public class FlowData {

    private String uuid;
    //声明该参数的校验规则字符串长度必须在7到20之间
    @Size(min = 7, max = 20, message = "长度必须在{min}-{max}之间")
    private String subTestItem;
    //声明该参数的校验规则字符串不能为空
    @NotBlank(message = "billNumber不能为空")
    private String billNumber;
}
```

### 等等......

GitHub最近超火的一款开源框架，懒松鼠Flink-Boot脚手架，该脚手架简直是Spring开发工程师的福音，完美融合Spring生态体系，再也不需要手动在Java类中创建臃肿的Java对象，简直是开发大型流处理应用程序的必不可少的工具。[懒松鼠Flink-Boot 脚手架由《深入理解Flink核心设计与实践原理》作者开发。](https://github.com/intsmaze/flink-boot)

## 它为流计算开发工程师解决了

- 1. 将所有对象的创建和依赖关系的维护工作都交给Spring容器的管理，降低了对象之间的耦合性，使代码变得更简洁，拒绝臃肿。
- 2. 消除在工程中对单例的过多使用。
- 3. 声明式事务处理，通过配置就可以完成对事物的管理，而无须手动编程。
- 4. 声明式注解，可以通过注解定义方法的缓冲功能，无序手动编程。
- 5. 注解式定义Bean对象的校验规则，通过注解即可完成对对象的参数校验，无序手动编程。
- 6. 集成MyBatis ORM框架，注解式维护实例对象的依赖关系。
- 7. 解耦Flink SQL,SQL语句剥离出JAVA文件，以简洁的模式表现在XML文件中。
- 8. 封装Flink API，仅提供业务方法去编写，Spring生态融合全部搞定，无需操心。

### 有了它你的代码就像这样子：

```java
/**
* github地址: https://github.com/intsmaze
* 博客地址：https://www.cnblogs.com/intsmaze/
* 出版书籍《深入理解Flink核心设计与实践原理》 随书代码
* RichFlatMapFunction为Flink框架的一个通用型操作符（算子）,开发者一般在该算子的flatMap方法中编写业务逻辑
* @auther: intsmaze(刘洋)
* @date: 2020/10/15 18:33
*/
public class MybatisFlatMap extends RichFlatMapFunction<String, String> {

   private static Gson gson = new GsonBuilder().setDateFormat("yyyy-MM-dd HH:mm:ss").create();

    protected ApplicationContext beanFactory;
    //mybatis的Service对象，操作数据库的user表
    private UserService userService;

    @Override
    public void open(Configuration parameters) {
        ExecutionConfig.GlobalJobParameters globalJobParameters = getRuntimeContext()
                .getExecutionConfig().getGlobalJobParameters();
        beanFactory = BeanFactory.getBeanFactory((Configuration) globalJobParameters);
        
        userService = beanFactory.getBean(UserServiceImpl.class);
    }

    @Override
    public void flatMap(String value, Collector<String> out){

        FlowData flowData = gson.fromJson(message, new TypeToken<FlowData>() {
        }.getType());
        Map<String, StringBuffer> validate = ValidatorUtil.validate(flowData);
        if (validate != null) {
            System.out.println(validate);
            return null;
        }
        //数据库查询，屏蔽掉获取数据库连接，是否数据库连接，事务的声明等
        String flowUUID = userService.findUUID(flowData);
        if (StringUtils.isBlank(flowUUID)) {
            flowUUID = UUID.randomUUID().toString();
            flowData.setUuid(flowUUID);
            //数据库插入，屏蔽掉获取数据库连接，是否数据库连接，事务的声明等
            userService.insertFlow(flowData);
        }
        out.collect(gson.toJson(flowData));
    }
}


public interface UserService {

    String findUUID(FlowData flowData);

    void insertFlow(FlowData flowData);
}

//通过注解实例化Bean对象。
@Service
//通过注解声明进行事务管理
@Transactional
//通过注解声明方法具有异常重试机制
@EnableRetry
public class UserServiceImpl implements UserService {
   //通过注解进行依赖注入
    @Resource
    private UserMapper userMapper;

    @Cacheable(value = "FlowData.findUUID", key = "#flowData.subTestItem")
    @Override
    public String findUUID(FlowData flowData) {
        return userMapper.findUUID(flowData);
    }
    
   //通过注解声明该方法异常后的重试机制，无需手动编程
    @Retryable(value = Exception.class, maxAttempts = 3, backoff = @Backoff(delay = 2000L, multiplier = 1.5))
    @Override
    public void insertFlow(FlowData flowData) {
        userMapper.insertFlow(flowData);
    }
}

public interface UserMapper {

    String findUUID(FlowData flowData);

    void insertFlow(FlowData flowData);
}

//注解式声明参数校验规则
public class FlowData {

    private String uuid;
    //声明该参数的校验规则字符串长度必须在7到20之间
    @Size(min = 7, max = 20, message = "长度必须在{min}-{max}之间")
    private String subTestItem;
    //声明该参数的校验规则字符串不能为空
    @NotBlank(message = "billNumber不能为空")
    private String billNumber;

    @NotBlank(message = "barcode不能为空")
    private String barcode;

    private String flowName;

    private String flowStatus;

    ......
}
```

## 仓库地址：[懒松鼠Flink-Boot](https://github.com/intsmaze/flink-boot)

**仓库地址：[懒松鼠Flink-Boot](https://github.com/intsmaze/flink-boot)脚手架由《深入理解Flink核心设计与实践原理》作者开发。**

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/da/rtaflink/flinkboot-2.png')" alt="wxmp">

- 1. 该脚手架屏蔽掉组装Flink API细节，让跨界变得简单，使得开发者能以传统Java WEB模式的开发方式开发出具备分布式计算能力的流处理程序。
- 2. 开发者完全不需要理解分布式计算的理论知识和Flink框架的细节，便可以快速编写业务代码实现。
- 3. 为了进一步提升开发者使用该脚手架开发大型项目的敏捷的程度，该脚手架工程默认集成Spring框架进行Bean管理，同时将微服务以及WEB开发领域中经常用到的框架集成进来，进一步提升开发速度。
- 4. 除此之外针对目前流行的各大Java框架，该Flink脚手架工程也进行了集成，加快开发人员的编码速度,比如:

- 集成Jbcp-template对Mysql,Oracle,SQLServer等关系型数据库的快速访问。
- 集成Hibernate Validator框架进行参数校验。
- 集成Spring Retry框架进行重试标志。
- 集成Mybatis框架,提高对关系型数据库增，删，改，查的开发速度。
- 集成Spring Cache框架,实现注解式定义方法缓存。
- ......

### 1. 组织结构

```shell
Flink-Boot
├── Flink-Base -- Flink-Boot工程基础模块
├── Flink-Client -- Flink-Boot 客户端模块
├── flink-annotation -- 注解生效模块
├── flink-mybatis -- mybatis orm模块
├── flink-retry -- 注解重试机制模式
├── flink-validate -- 校验模块
├── flink-sql -- Flink SQL解耦至XML配置模块
├── flink-cache-annotation -- 接口缓冲模块
├── flink-junit -- 单元测试模块
├── flink-apollo -- 阿波罗配置客户端模块
```

### 2. 技术选项和集成情况

| 技术                            | 名称                        | 状态   |
| ------------------------------- | --------------------------- | ------ |
| Spring Framework                | 容器                        | 已集成 |
| Spring 基于XML方式配置Bean      | 装配Bean                    | 已集成 |
| Spring 基于注解方式配置Bean     | 装配Bean                    | 已集成 |
| Spring 基于注解声明方法重试机制 | Retry注解                   | 已集成 |
| Spring 基于注解声明方法缓存     | Cache注解                   | 已集成 |
| Hibernate Validator             | 校验框架                    | 已集成 |
| Druid                           | 数据库连接池                | 已集成 |
| MyBatis                         | ORM框架                     | 已集成 |
| Kafka                           | 消息队列                    | 已集成 |
| HDFS                            | 分布式文件系统              | 已集成 |
| Log4J                           | 日志组件                    | 已集成 |
| Junit                           | 单元测试                    | 已集成 |
| Mybatis-Plus                    | MyBatis扩展包               | 进行中 |
| PageHelper                      | MyBatis物理分页插件         | 进行中 |
| ZooKeeper                       | 分布式协调服务              | 进行中 |
| Dubbo                           | 分布式服务框架              | 进行中 |
| Redis                           | 分布式缓存数据库            | 进行中 |
| Solr & Elasticsearch            | 分布式全文搜索引擎          | 进行中 |
| Ehcache                         | 进程内缓存框架              | 进行中 |
| sequence                        | 分布式高效ID生产            | 进行中 |
| Dubbole消费者                   | 服务消费者                  | 进行中 |
| Spring eurake消费者             | 服务消费者                  | 进行中 |
| Apollo配置中心                  | 携程阿波罗配置中心          | 进行中 |
| Spring Config配置中心           | Spring Cloud Config配置中心 | 进行中 |

### 3. 快速开始

下面是集成Spring生态的基础手册.

#### 3.1 核心基础工程

- flink-base :基础工程，封装了开发Flink工程的必须参数，同时集成Spring容器，为后续集成Spring各类框架提供了支撑。
  1. 可以在本地开发环境和Flink集群运行环境中随意切换。
  2. 可以在增量检查点和全量检查点之间随意切换。
  3. 内置使用HDFS作为检查点的持久存储介质。
  4. 默认使用Kafka作为数据源
  5. 内置实现了任务的暂停机制-达到任务仍在运行但不再接收Kafka数据源中的数据，代替了停止任务后再重新部署任务这一繁琐流程。
- flink-client：业务工程，该工程依赖flink-base工程，开发任务在该工程中进行业务逻辑的开发。

#### 3.2 Spring容器

该容器模式配置了JdbcTemplate实例，数据库连接池采用Druid，在业务方法中只需要获取容器中的JdbcTemplate实例便可以快速与关系型数据库进行交互,dataService实例封装了一些访问数据库表的方法。

##### topology-base.xml

``` xml
<beans ......
       default-lazy-init="true" default-init-method="init">

    <context:property-placeholder location="classpath:config.properties"/>

    <bean id="druidDataSource" class="com.alibaba.druid.pool.DruidDataSource">
        <property name="driverClassName" value="com.mysql.jdbc.Driver"></property>
        <property name="url"
                  value="${jdbc.url}"></property>
        <property name="username" value="${jdbc.user}"></property>
        <property name="password" value="${jdbc.password}"></property>
    </bean>
    
    <bean id="jdbcTemplate" class="org.springframework.jdbc.core.JdbcTemplate">
        <constructor-arg ref="druidDataSource"></constructor-arg>
    </bean>
    
    <bean id="dataService" class="com.intsmaze.flink.base.service.DataService">
        <property name="jdbcTemplate" ref="jdbcTemplate"></property>
    </bean>

</beans>
```

##### config.properties

```ini
jdbc.user = intsmaze
jdbc.password = intsmaze
jdbc.url = jdbc:mysql://127.0.0.1:3306/flink-boot?useUnicode=true&characterEncoding=UTF-8
```

#### 3.3 启动类示例

如下是SimpleClient（com.intsmaze.flink.client.SimpleClient）类的示例代码，该类继承了BaseFlink，可以看到对应实现的方法中分别设置如下：

- public String getTopoName()：定义本作业的名称。
- public String getConfigName()：定义本作业需要读取的spring配置文件的名称
- public String getPropertiesName()：定义本作业需要读取的properties配置文件的名称。
- public void createTopology(StreamExecutionEnvironment builder)：构造本作业的拓扑结构。

```java
/**
 * github地址: https://github.com/intsmaze
 * 博客地址：https://www.cnblogs.com/intsmaze/
 * 出版书籍《深入理解Flink核心设计与实践原理》 随书代码
 *
 * @auther: intsmaze(刘洋)
 * @date: 2020/10/15 18:33
 */
public class SimpleClient extends BaseFlink {

    public static void main(String[] args) throws Exception {
        SimpleClient topo = new SimpleClient();
        topo.run(ParameterTool.fromArgs(args));
    }

    @Override
    public String getTopoName() {
        return "SimpleClient";
    }

    @Override
    public String getConfigName() {
        return "topology-base.xml";
    }

    @Override
    public String getPropertiesName() {
        return "config.properties";
    }

    @Override
    public void createTopology(StreamExecutionEnvironment builder) {

        DataStream<String> inputDataStrem = env.addSource(new SimpleDataSource());

        DataStream<String> processDataStream = inputDataStrem.flatMap(new SimpleFunction());

        processDataStream.print("输出结果");
    }

}
```

#### 3.4 数据源

采用自定义数据源，用户需要编写自定义DataSource类，该类需要继承XXX抽象类，实现如下方法。

- public abstract void open(StormBeanFactory beanFactory):获取本作业在Spring配置文件中配置的bean对象。
- public abstract String sendMessage():本作业spout生成数据的方法，在该方法内编写业务逻辑产生源数据，产生的数据以String类型进行返回。

```java
public class SimpleDataSource extends CommonDataSource {

    private static Gson gson = new GsonBuilder().setDateFormat("yyyy-MM-dd HH:mm:ss").create();
	......

    @Override
    public void open(Configuration parameters) throws Exception {
        super.open(parameters);
        ...//构造读取各类外部系统数据的连接实例
    }

    @Override
    public String sendMess() throws InterruptedException {
        Thread.sleep(1000);
		......
        MainData mainData = new MainData();
        ......//通过外部系统数据的连接实例读取外部系统数据，封装进MainData对象中，然后返回即可。
        return gson.toJson(mainData);
    }
}
```

#### 3.5 业务逻辑实现

本作业计算的业务逻辑在Flink转换操作符中进行实现，一般来说开发者只需要实现flatMap算子即可以满足大部分算子的使用。

用户编写的自定义类需要继承com.intsmaze.flink.base.transform.CommonFunction抽象类，均需实现如下方法。

- public abstract String execute(String message)：本作业业务逻辑计算的方法，参数message为Kafka主题中读取过来的参数，默认参数为String类型，如果需要将处理的数据发送给Kakfa主题中，则要通过return将处理的数据返回即可。

```java
public class SimpleFunction extends CommonFunction {

    private static Gson gson = new GsonBuilder().setDateFormat("yyyy-MM-dd HH:mm:ss").create();
    
    @Override
    public String execute(String message) throws Exception {
        FlowData flowData = gson.fromJson(message, new TypeToken<FlowData>() {
        }.getType());

        String flowUUID = dataService.findUUID(flowData);
        if (StringUtils.isBlank(flowUUID)) {
            flowUUID = UUID.randomUUID().toString();
            flowData.setUuid(flowUUID);
            dataService.insertFlow(flowData);
        }
        return gson.toJson(flowData);
    }
}
```

##### CommonFunction

CommonFunction抽象类中默认在open方法中通过BeanFactory对象获取到了Spring容器中对于的dataService实例，对于Spring中的其他实例同理在SimpleFunction类中的open方法中获取即可。

```java
public abstract class CommonFunction extends RichFlatMapFunction<String, String> {

    private IntCounter numLines = new IntCounter();

    protected DataService dataService;

    protected ApplicationContext beanFactory;

    @Override
    public void open(Configuration parameters) {
        getRuntimeContext().addAccumulator("num-FlatMap", this.numLines);

        ExecutionConfig.GlobalJobParameters globalJobParameters = getRuntimeContext()
                .getExecutionConfig().getGlobalJobParameters();
        beanFactory = BeanFactory.getBeanFactory((Configuration) globalJobParameters);

        dataService = beanFactory.getBean(DataService.class);
    }

    @Override
    public void flatMap(String value, Collector<String> out) throws Exception {
        this.numLines.add(1);
        String execute = execute(value);
        if (StringUtils.isNotBlank(execute)) {
            out.collect(execute);
        }
    }

    public abstract String execute(String message) throws Exception;

}
```

可以根据情况选择重写open(Configuration parameters)方法，同时重写的open(Configuration parameters)方法的第一行要调用父类的open(Configuration parameters)方法。

```java
public void open(Configuration parameters){
	super.open(parameters);
	......
	//获取在Spring配置文件中配置的实例
	XXX xxx=beanFactory.getBean(XXX.class);
}
```

#### 3.6 集群/本地运行

在自定义的Topology类编写Main方法，创建自定义的Topology对象后，调用对象的run(...)方法。

public class SimpleClient extends BaseFlink {

```java
/**
 * 本地启动参数  -isLocal local
 * 集群启动参数  -isIncremental isIncremental
 */
public static void main(String[] args) throws Exception {
    SimpleClient topo = new SimpleClient();
    topo.run(ParameterTool.fromArgs(args));
}

.......
```

作者：[intsmaze(刘洋)](http://www.cnblogs.com/intsmaze/)

畅销书籍：[《深入理解Flink核心设计与实践原理》](http://www.cnblogs.com/intsmaze/)作者

出处：http://www.cnblogs.com/intsmaze/

老铁，你的--->推荐，--->关注,--->评论--->是我继续写作的动力。

由于博主能力有限，文中可能存在描述不正确，欢迎指正、补充！

本文版权归作者和博客园共有，欢迎转载，但未经作者同意必须保留此段声明，且在文章页面明显位置给出原文连接，否则保留追究法律责任的权利。


## 参考文章
* https://www.cnblogs.com/intsmaze/p/14110713.html