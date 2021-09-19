---
title: Flink-SpringBoot结合案例
---

::: tip
本文主要是介绍 Flink-SpringBoot结合案例 。
:::

[[toc]]


## Spring Boot整合Flink


使用spring boot整合flink可以快速的构建起整个应用，将关注点重点放在业务逻辑的实现上。在整合的过程中遇到许多问题，最大的问题是flink流无法访问spring容器中的类，从而导致空指针异常，解决思路是在流中进行spring bean的初始化以获得ApplicationContext，进而使用其getBean方法获取类实例。

软件版本:Spring Boot 2.1.6+Flink1.6.1+JDK1.8

程序主体：

```java
@SpringBootApplication
public class HadesTmsApplication implements CommandLineRunner {
 
 
    public static void main(String[] args) {
        SpringApplication application = new SpringApplication(HadesTmsApplication.class);
        application.setBannerMode(Banner.Mode.OFF);
        application.run(args);
    }
 
    @Override
    public void run(String... args) {
        StreamExecutionEnvironment env = StreamExecutionEnvironment.getExecutionEnvironment();
FlinkKafkaConsumer010 kafkaConsumer = new FlinkKafkaConsumer010<>("topic-name"), new SimpleStringSchema(), getProperties());
DataStream<String> dataStream = env.addSource(kafkaConsumer);
// 此处省略处理逻辑
dataStream.addSink(new MySink());
 
 
    }
 
private Properties getProperties() {
        Properties properties = new Properties();
        properties.setProperty("bootstrap.servers", bootstrap_servers);
        properties.setProperty("zookeeper.connect", zookeeper_connect);
        properties.setProperty("group.id", group_id);
        properties.setProperty("key.serializer", "org.apache.kafka.common.serialization.StringSerializer");
        properties.setProperty("value.serializer", "org.apache.kafka.common.serialization.StringSerializer");
        return properties;
    }
}
```

说明一下：因为是非web项目，所以实现CommandLineRunner接口，重写run方法。在里面编写流处理逻辑。

如果在MySink中需要使用spring容器中的类，而MySink是一个普通的类，那么是无法访问到的。会引发空指针异常。可能有人想到了ApplicationContextAware这个接口，实现这个接口获取ApplicationContext，也即是：

```java
@Component
public class ApplicationContextUtil implements ApplicationContextAware, Serializable {
    private static final long serialVersionUID = -6454872090519042646L;
    private static ApplicationContext applicationContext = null;
 
    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        if (ApplicationContextUtil.applicationContext == null) {
            ApplicationContextUtil.applicationContext = applicationContext;
        }
    }
 
    public static ApplicationContext getApplicationContext() {
        return applicationContext;
    }
 
    //通过name获取 Bean.
    public static Object getBean(String name) {
        return getApplicationContext().getBean(name);
    }
 
    //通过class获取Bean.
    public static <T> T getBean(Class<T> clazz) {
        return getApplicationContext().getBean(clazz);
    }
 
    //通过name,以及Clazz返回指定的Bean
    public static <T> T getBean(String name, Class<T> clazz) {
        return getApplicationContext().getBean(name, clazz);
    }
}
```

这种做法实际上在flink流处理中也是不可行的，在我之前的flink文章中 **Flink读写系列之-读mysql并写入mysql** 其中读和写阶段有一个open方法，这个方法专门用于进行初始化的，那么我们可以在这里进行spring bean的初始化。那么MySink改造后即为：

```java
@EnableAutoConfiguration
@MapperScan(basePackages = {"com.xxx.bigdata.xxx.mapper"})
public class SimpleSink extends RichSinkFunction<String> {
 
 
    TeacherInfoMapper teacherInfoMapper;
 
    @Override
    public void open(Configuration parameters) throws Exception {
        super.open(parameters);
        SpringApplication application = new SpringApplication(SimpleSink.class);
        application.setBannerMode(Banner.Mode.OFF);
        ApplicationContext context = application.run(new String[]{});
        teacherInfoMapper = context.getBean(TeacherInfoMapper.class);
    }
 
    @Override
    public void close() throws Exception {
        super.close();
    }
 
    @Override
    public void invoke(String value, Context context) throws Exception {
        List<TeacherInfo> teacherInfoList = teacherInfoMapper.selectByPage(0, 100);
        teacherInfoList.stream().forEach(teacherInfo -> System.out.println("teacherinfo:" + teacherInfo.getTeacherId() + "," + teacherInfo.getTimeBit() + "," + teacherInfo.getWeek()));
    }
}
```

在invoke中就可以访问spring容器中的Mapper方法了。

 pom如下：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.1.6.RELEASE</version>
        <relativePath/> <!-- lookup parent from repository -->
    </parent>
    <groupId>com.xxx.bigdata</groupId>
    <artifactId>flink-project</artifactId>
    <version>1.0.0</version>
    <name>flink-project</name>
    <packaging>jar</packaging>
    <description>My project for Spring Boot</description>
 
    <properties>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <project.reporting.outputEncoding>UTF-8</project.reporting.outputEncoding>
        <java.version>1.8</java.version>
        <flink.version>1.6.1</flink.version>
        <skipTests>true</skipTests>
        <maven.compiler.source>1.8</maven.compiler.source>
        <maven.compiler.target>1.8</maven.compiler.target>
    </properties>
 
    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter</artifactId>
            <exclusions>
                <exclusion>
                    <groupId>ch.qos.logback</groupId>
                    <artifactId>logback-classic</artifactId>
                </exclusion>
            </exclusions>
        </dependency>
        <dependency>
            <groupId>org.apache.flink</groupId>
            <artifactId>flink-java</artifactId>
            <version>${flink.version}</version>
        </dependency>
        <dependency>
            <groupId>org.apache.flink</groupId>
            <artifactId>flink-streaming-java_2.11</artifactId>
            <version>${flink.version}</version>
        </dependency>
        <dependency>
            <groupId>org.apache.flink</groupId>
            <artifactId>flink-connector-kafka-0.10_2.11</artifactId>
            <version>${flink.version}</version>
        </dependency>
        <dependency>
            <groupId>com.cloudera</groupId>
            <artifactId>ImpalaJDBC41</artifactId>
            <version>2.6.4</version>
        </dependency>
        <dependency>
            <groupId>com.zaxxer</groupId>
            <artifactId>HikariCP</artifactId>
            <version>3.2.0</version>
        </dependency>
        <dependency>
            <groupId>org.mybatis.spring.boot</groupId>
            <artifactId>mybatis-spring-boot-starter</artifactId>
            <version>1.3.1</version>
        </dependency>
        <dependency>
            <groupId>com.alibaba</groupId>
            <artifactId>fastjson</artifactId>
            <version>1.2.47</version>
        </dependency>
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>
 
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>
 
    <build>
        <sourceDirectory>src/main/java</sourceDirectory>
        <resources>
            <resource>
                <directory>src/main/resources</directory>
                <filtering>true</filtering>
                <includes>
                    <include>application.properties</include>
                    <include>application-${package.environment}.properties</include>
                </includes>
            </resource>
        </resources>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
                <configuration>
                    <skip>true</skip>
                    <mainClass>com.xxx.bigdata.xxx.Application</mainClass>
                </configuration>
                <executions>
                    <execution>
                        <goals>
                            <goal>repackage</goal>
                        </goals>
                    </execution>
                </executions>
            </plugin>
            <!--mybatis plugin to generate mapping file and class-->
            <plugin>
                <groupId>org.mybatis.generator</groupId>
                <artifactId>mybatis-generator-maven-plugin</artifactId>
                <version>1.3.5</version>
                <configuration>
                    <configurationFile>${basedir}/src/main/resources/generatorConfig.xml</configurationFile>
                    <overwrite>true</overwrite>
                    <verbose>true</verbose>
                </configuration>
                <dependencies>
                    <dependency>
                        <groupId>com.cloudera</groupId>
                        <artifactId>ImpalaJDBC41</artifactId>
                        <version>2.6.4</version>
                    </dependency>
                </dependencies>
            </plugin>
        </plugins>
    </build>
 
    <profiles>
        <!--开发环境-->
        <profile>
            <id>dev</id>
            <properties>
                <package.environment>dev</package.environment>
            </properties>
            <!--默认环境-->
            <activation>
                <activeByDefault>true</activeByDefault>
            </activation>
        </profile>
        <!--预发布环境-->
        <profile>
            <id>pre</id>
            <properties>
                <package.environment>pre</package.environment>
            </properties>
        </profile>
        <!--生产环境-->
        <profile>
            <id>pro</id>
            <properties>
                <package.environment>pro</package.environment>
            </properties>
        </profile>
    </profiles>
 
</project>
```

项目打包使用了默认的spring boot插件，配置了skip为true，如果不配置此项，打包后会多一个BOOT-INF目录，运行时会引起ClassNotFoundException等各种异常，比如KafkaStreming问题，甚至需要反转flink的类加载机制，由child-first变为parent-first(修改flink配置文件)等等。

遇到的问题：

```html
1.  java.lang.NoSuchMethodError: com.google.gson.GsonBuilder.setLenient()Lcom/google/gson/GsonBuilder
```

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/da/rtaflink/flinksprintboot-1.png')" alt="wxmp">

GsonBuilder类来自gson-xxx.jar包，而我在自己的项目中执行mvn dependency:tree并没有发现依赖这个包。莫非在flink运行时会使用自己lib库下的gson包，转而去flink的lib库下，发现flink-dist_2.11-1.6.1.jar里包含了gson-xxx包，但是打开这个包一看类中没有setLenient方法，于是在服务器上建立一个commlib，把gson-2.8.0.jar（包含setLenient方法）放进去，然后使用flink run提交时，指定classpath即可。

 2.日志冲突

**Caused by: java.lang.IllegalArgumentException: LoggerFactory is not a Logback LoggerContext but Logback is on the classpath. Either remove Logback or the competing implementation (class org.slf4j.impl.Log4jLoggerFactory loaded from file:/opt/flink-1.6.1/lib/slf4j-log4j12-1.7.7.jar). If you are using WebLogic you will need to add 'org.slf4j' to prefer-application-packages in WEB-INF/weblogic.xml: org.slf4j.impl.Log4jLoggerFactory**

排除springboot中的日志即可：

```xml
<dependency>
       <groupId>org.springframework.boot</groupId>
       <artifactId>spring-boot-starter</artifactId>
       <exclusions>
             <exclusion>
                 <groupId>ch.qos.logback</groupId>
                 <artifactId>logback-classic</artifactId>
             </exclusion>
       </exclusions>
</dependency>
```

3.flink run提交作业到yarn上时，如果需要指定classpath，则需要指定到确定的jar包，指定目录不可行。那么假如所有依赖包已经放置在目录中，拼接的shell可以这么写：

```shell
lib_classpath="";
 
for jar in `ls /home/hadoop/lib`
do
  jar_suffix=${jar##*.}
  if [ "$jar_suffix" = "jar" ]
  then
    jar_path=" --classpath file:///home/hadoop/lib/$jar "
    lib_classpath=${lib_classpath}${jar_path}
  else
    echo "the jar file $jar it not legal jar file,skip appendig"
  fi
done
```

拼接后的lib_classpath值如下效果：

```shell
--classpath file:///home/hadoop/lib/accessors-smart-1.2.jar  --classpath file:///home/hadoop/lib/akka-actor_2.11-2.4.20.jar 
```

注意：如果jar包放本地文件系统，那么需要每台机器都放一份。

## 【----------------------------】

## Flink与Spring Boot的集成



- flink 1.10.0
- spring boot 2.2.2.RELEASE

这方面的资料很少，网上有的方法不完整。基本思路是把spring容器的初始化放在sink的open方法中执行。

要么只使用spring framework组件，甚至使用xml这样的方式配置bean（使用ClassPathXmlApplicationContext ）；要么直接在open中启动了SpringApplication。有可能在单机的flink上能运行，但是on yarn的时候不行了。

其实想要达到的目的很简单：

- 使用spring的IoC容器管理组件
- 注解配置和自动配置
- 使用springboot的外部化配置（application.yml）
- 需要可以运行在yarn集群中

但是里面的坑非常多，除了需要了解一些flink的任务提交部署原理，需要对spring framework， spring boot， maven，hadoop yarn有一些了解。有些地方需要深入了解，否则莫名其妙入坑，半天爬不出来。所以需要记录一下，已方便后来者别再浪费时间。Flink的官方文档真的是很简短。

### Spring容器的集成点

需要算子（Operator）具体Function（Source、Sink）的初始化中，因为这些算子会被序列化到分布式计算节点中执行。所以通常的main只是任务提交的入口，并不是最终算子执行初始化入口。

所以，在Source和Sink的open方法中初始化容器。由于通常Source都由比较固定的组件，比如kafka集成了FlinkKafkaConsumer，所以这部分没有过多的需要编写处理逻辑，从而没有引入spring容器。但是，初始化这部分组件有配置参数传递的需求。

### 依赖jar包注意点

引入flink或者hadoop等等这种运行时会提供的jar包时，记得把作用域置scope设为*provided*。

典型的flink依赖包引入如下：

```xml
<dependency>
  <groupId>org.apache.flink</groupId>
  <artifactId>flink-java</artifactId>
  <version>1.10.0</version>
  <scope>provided</scope>
</dependency>
<dependency>
  <groupId>org.apache.flink</groupId>
  <artifactId>flink-streaming-java_2.11</artifactId>
  <version>1.10.0</version>
  <scope>provided</scope>
</dependency>

```

如果是kafka连接器这样的依赖，非flink核心依赖，则是需要打包时打进去的，使用默认的scope就行。

```xml
<dependency>
    <groupId>org.apache.flink</groupId>
    <artifactId>flink-connector-kafka-0.10_2.11</artifactId>
    <version>1.10.0</version>
</dependency>

```

这里是一个自定义Sink的例子，在open中初始化spring的容器。

```java
@Slf4j
public class MySink extends RichSinkFunction<String> {

    private AnnotationConfigApplicationContext ctx;

    public MySink(){
        log.info("MySink new");
    }

    @Override
    public void open(Configuration parameters) throws Exception {
        this.ctx = new AnnotationConfigApplicationContext(Config.class);
        log.info("MySink open");
      
        // 这里获取了配置的数据源
        DataSource ds = ctx.getBean(DataSource.class);
        log.info("----------test info------------{}",ds);
    }

    @Override
    public void invoke(String value, Context context) throws Exception {
      	//
        log.info(value);
    }

    @Override
    public void close() throws Exception {
       // 关闭容器
        ctx.close();
        log.info("MySink close");
    }
}

```

Flink的入口类，这里的是标准的Flink初始化步骤。

```java
@Slf4j
public class DemoApplication {

    public static void main(String[] args) throws Exception {
        StreamExecutionEnvironment env = StreamExecutionEnvironment.getExecutionEnvironment();
        // 有限的流
				// DataStream<String> stream = env.fromElements("1", "2", "3");
				// 这里模拟一个持续发送数据的源
        DataStream<String> stream = env.addSource(new SourceFunction<String>() {

            @Override
            public void run(SourceContext<String> sourceContext) throws Exception {
                long c = 0;
                while(true) {
                    sourceContext.collect("test"+ c++);
                    Thread.sleep(3000);
                }
            }

            @Override
            public void cancel() {}
        });

        stream.addSink(new MySink());
        env.execute("spring flink demo");
    }
}
```

### maven打包注意点

项目继承spring的parent后，需要覆盖打包插件配置：

这个配置源于[flink官网的打包模板](https://ci.apache.org/projects/flink/flink-docs-release-1.10/zh/dev/projectsetup/dependencies.html)，并做了集成Spring必要的修改。

```xml
<plugin>
  <groupId>org.apache.maven.plugins</groupId>
  <artifactId>maven-shade-plugin</artifactId>
  <version>3.1.1</version>
  <executions>
    <execution>
      <phase>package</phase>
      <goals>
        <goal>shade</goal>
      </goals>
      <configuration>
        <artifactSet>
          <excludes>
            <exclude>com.google.code.findbugs:jsr305</exclude>
            <exclude>org.slf4j:*</exclude>
            <exclude>log4j:*</exclude>
          </excludes>
        </artifactSet>
        <filters>
          <filter>
            <!-- 不要拷贝 META-INF 目录下的签名，否则会引起 SecurityExceptions 。 -->
            <artifact>*:*</artifact>
            <excludes>
              <exclude>META-INF/*.SF</exclude>
              <exclude>META-INF/*.DSA</exclude>
              <exclude>META-INF/*.RSA</exclude>
            </excludes>
          </filter>
        </filters>
        <transformers>
          <transformer implementation="org.apache.maven.plugins.shade.resource.AppendingTransformer">
            <resource>META-INF/spring.handlers</resource>
          </transformer>
          <transformer implementation="org.springframework.boot.maven.PropertiesMergingResourceTransformer">
            <resource>META-INF/spring.factories</resource>
          </transformer>
          <transformer implementation="org.apache.maven.plugins.shade.resource.AppendingTransformer">
            <resource>META-INF/spring.schemas</resource>
          </transformer>
          <transformer implementation="org.apache.maven.plugins.shade.resource.ServicesResourceTransformer"/>
          <transformer implementation="org.apache.maven.plugins.shade.resource.ManifestResourceTransformer">
            <mainClass>xx.demo.DemoApplication</mainClass>
          </transformer>
        </transformers>
      </configuration>
    </execution>
  </executions>
  <dependencies>
    <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-maven-plugin</artifactId>
      <version>2.2.2.RELEASE</version>
    </dependency>
  </dependencies>
</plugin>
```

### 注意包冲突

典型的包冲突一般不会和发生在与flink依赖上，flink使用shade把常用依赖包打到自己的命令空间下。

比如你可以找到这样的jar包：

- flink-shaded-asm-5.0.4-6.0.jar
- flink-shaded-guava-18.0-6.0.jar
- flink-shaded-jackson-2.7.9-6.0.jar

冲突往往发生在与第三方库的依赖使用上，比如hadoop，它的依赖非常多，冲突的概率就很大。

如果你的flink程序是需要提交到hadoop的yarn集群运行的话，你会遇到snake yml解析器的版本冲突问题。

spring 5.x 使用 snakeyaml-1.25.jar ，而hadoop 3.1.x的yarn lib中则使用了snakeyaml-1.16.jar。

这个导致你在flink client中执行时（就是main方法中执行），如果想使用spring的yml配置解析加载功能无法正确执行。但是它不会影响到提交到yarn中的job中的运行。在sink中open方法中执行spring的容器初始化，程序是可以正常工作的。

### 目前方案的缺陷与解决思路

上述方法存在的缺陷是，无法拿到main执行期间的Environment，这样无法使用Spring Boot的环境参数、命令参数覆盖配置。这一特性缺失，使应用的启动的灵活性大大降低了。只能手工从main把需要的参数传递到实际的Sink实例或者Source上。

应该有办法可以把SpringApplication的启动环境配置序列化保存，后移到flink的task启动的时候反序列化，然后传递给SpringApplication，这样就可以完美实现Spring Boot与Flink的完美集成了。有空看看SpringApplication启动的源码应该能找到办法。

## 参考文章
* https://blog.csdn.net/javajxz008/article/details/94656679
* https://blog.csdn.net/ccor2002/article/details/104863580