---
title: 读写分离-Springboot案例(三)
---

::: tip
本文主要是介绍 读写分离-Springboot案例(三)，使用 baomidou 开源分库的插件 。
:::

[[toc]]

## 崛起于Springboot2.X + Mysql读写分离
   
   序言：这个读写分离摘自于[Springboot多数据源快速启动器](https://www.oschina.net/p/dynamic-datasource-spring-boot-starter)，读写分离的话并不是按照传统方式的springmvc看方法命名那样，而是在每个方法上加注解或者类上添加注解表明选用的数据源。支持事物！

##  使用了 baomidou 数据源选择插件

##  1、创建Springboot项目

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/mysqlop/rwseperatecase/case3-1.png')" alt="wxmp">

   勾选Web，Mysql，MyBatis三个模块，最终创建springboot项目成功



## 2、pom.xml

```xml
<!-- springboot-aop包,AOP切面注解,Aspectd等相关注解 -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-aop</artifactId>
</dependency>

<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-configuration-processor</artifactId>
    <optional>true</optional>
</dependency>
<dependency>
    <groupId>com.baomidou</groupId>
    <artifactId>dynamic-datasource-spring-boot-starter</artifactId>
    <version>1.0.0</version>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-jdbc</artifactId>
</dependency>
```



## 3、application.properties

```ini
server.port=8088
#数据源1
spring.datasource.db1.jdbc-url=jdbc:mysql://127.0.0.1:3306/test_msg2?useUnicode=true&characterEncoding=utf-8&useSSL=false
spring.datasource.db1.username=root
spring.datasource.db1.password=root
spring.datasource.db1.driver-class-name=com.mysql.jdbc.Driver
spring.datasource.db1.max-idle=10
spring.datasource.db1.max-wait=10000
spring.datasource.db1.min-idle=5
spring.datasource.db1.initial-size=5
#数据源2
spring.datasource.db2.jdbc-url=jdbc:mysql://127.0.0.1:3306/test_msg3?useUnicode=true&characterEncoding=utf-8&useSSL=false
spring.datasource.db2.username=root
spring.datasource.db2.password=root
spring.datasource.db2.driver-class-name=com.mysql.jdbc.Driver
spring.datasource.db2.max-idle=10
spring.datasource.db2.max-wait=10000
spring.datasource.db2.min-idle=5
spring.datasource.db2.initial-size=5
#mybatis
mybatis.mapper-locations=classpath*:mapper/*.xml
mybatis.type-aliases-package=com.springboot2.mjt04.dao
```



## 4、实体类

``` java
public class User {
    private int id;
    private String name;
    private int age;

    public User(){}

    public User(String name, int age){
        this.name = name;
        this.age  = age;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }
}
```



## 5、创建UserDao.xml

``` java
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd" >

<mapper namespace="com.springboot2.mjt04.dao.UserDao">
       <!-- 查询所有user -->
       <select id="getAllUser" resultType="java.util.Map">
              select * from user
       </select>
       <!-- 添加数据并返回主键ID,接收主键,必须以实体类接收 -->
       <!-- keyColumn="id"对应数据库字段,keyProperty="id"对应实体类属性  -->
       <insert id="addUserGetID" parameterType="com.springboot2.mjt04.entity.User" useGeneratedKeys="true" keyColumn="id" keyProperty="id">
              insert into user(name,age) values(#{name},#{age})
       </insert>
       <insert id="addUser">
              insert into user(name,age) values(#{name},#{age})
       </insert>
</mapper>
```



## 6、UserDao

``` java
@Mapper
public interface UserDao {
    //使用xml配置形式查询

    List<Map> getAllUser();
    Long addUserGetID(User user);


    void addUser(User user);
}
```



## 7、UserService

``` java
@Service
public class UserService {

    @Autowired
    private UserDao moredataDao;

    //使用数据源1查询
   @DS("datasource1")
    public List<Map> getAllUser1(){
        return moredataDao.getAllUser();
    }
    //使用数据源2查询
    @DS("datasource2")
    public List<Map> getAllUser2(){
        return moredataDao.getAllUser();
    }

    //使用数据源1插入数据
    @DS("datasource1")
    public Long addUserGetID1(User user){
        return moredataDao.addUserGetID(user);
    }
    //使用数据源1插入数据
    @DS("datasource2")
    public Long addUserGetID2(User user){
        return moredataDao.addUserGetID(user);
    }

    //使用数据源1插入数据
    @DS("datasource1")
    public void addUser1(User user){
        moredataDao.addUser(user);
    }

    //使用数据源2插入数据
    @DS("datasource2")
    public void addUser2(User user){
        moredataDao.addUser(user);
    }

    @Transactional
    public void test1(){

       moredataDao.addUserGetID(new User("mdx1",18));
       int a =10/0;
       moredataDao.addUserGetID(new User("mdxl1",20));

    }
}
```



## 8、创建controller

``` java
@Controller
public class RWController {


    @Autowired
    UserService userService;

    //走数据源1库
    @GetMapping(value = "/test1")
    @ResponseBody
    public String testOne(){
        User user = new User("mjt01",20);
        userService.addUser1(user);
        return "success";
    }

    //使用数据源2插入数据
    @GetMapping(value = "/test2")
    @ResponseBody
    public String testTwo(){
        User user = new User("mjt02",20);
        userService.addUser2(user);
        return "success";
    }

}
```



## 9、mysql多数据源配置类

   5个配置文件，切记如果照着写的话，小心里面的路径要准确对应上

``` java
//import org.springframework.boot.autoconfigure.jdbc.DataSourceBuilder;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.transaction.PlatformTransactionManager;

import javax.sql.DataSource;
import java.util.HashMap;
import java.util.Map;

/**
 * 多数据源配置类
 * Created by pure on 2018-05-06.
 */
@Configuration
public class DataSourceConfig {
    //数据源1
    @Bean(name = "datasource1")
    @ConfigurationProperties(prefix = "spring.datasource.db1") // application.properteis中对应属性的前缀
    public DataSource dataSource1() {
        return DataSourceBuilder.create().build();
    }

    //数据源2
    @Bean(name = "datasource2")
    @ConfigurationProperties(prefix = "spring.datasource.db2") // application.properteis中对应属性的前缀
    public DataSource dataSource2() {
        return DataSourceBuilder.create().build();
    }

    /**
     * 动态数据源: 通过AOP在不同数据源之间动态切换
     * @return
     */
    @Primary
    @Bean(name = "dynamicDataSource")
    public DataSource dynamicDataSource() {
        DynamicDataSource dynamicDataSource = new DynamicDataSource();
        // 默认数据源
        dynamicDataSource.setDefaultTargetDataSource(dataSource1());
        // 配置多数据源
        Map<Object, Object> dsMap = new HashMap();
        dsMap.put("datasource1", dataSource1());
        dsMap.put("datasource2", dataSource2());

        dynamicDataSource.setTargetDataSources(dsMap);
        return dynamicDataSource;
    }

    /**
     * 配置@Transactional注解事物
     * @return
     */
    @Bean
    public PlatformTransactionManager transactionManager() {
        return new DataSourceTransactionManager(dynamicDataSource());
    }
}
public class DataSourceContextHolder {
    /**
     * 默认数据源
     */
    public static final String DEFAULT_DS = "datasource1";

    private static final ThreadLocal<String> contextHolder = new ThreadLocal<>();

    // 设置数据源名
    public static void setDB(String dbType) {
        System.out.println("切换到{"+dbType+"}数据源");
        contextHolder.set(dbType);
    }

    // 获取数据源名
    public static String getDB() {
        return (contextHolder.get());
    }

    // 清除数据源名
    public static void clearDB() {
        contextHolder.remove();
    }
}
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.METHOD})
public @interface DS {
    String value() default "datasource1";
}
public class DynamicDataSource extends AbstractRoutingDataSource {
    @Override
    protected Object determineCurrentLookupKey() {
        System.out.println("数据源为"+DataSourceContextHolder.getDB());
        return DataSourceContextHolder.getDB();
    }
}
@Aspect
@Component
public class DynamicDataSourceAspect {

    @Before("@annotation(com.springboot2.mjt04.config.mysql.DS)")
    public void beforeSwitchDS(JoinPoint point){
        //获得当前访问的class
        Class<?> className = point.getTarget().getClass();
        //获得访问的方法名
        String methodName = point.getSignature().getName();
        //得到方法的参数的类型
        Class[] argClass = ((MethodSignature)point.getSignature()).getParameterTypes();
        String dataSource = DataSourceContextHolder.DEFAULT_DS;
        try {
            // 得到访问的方法对象
            Method method = className.getMethod(methodName, argClass);
            // 判断是否存在@DS注解
            if (method.isAnnotationPresent(DS.class)) {
                DS annotation = method.getAnnotation(DS.class);
                // 取出注解中的数据源名
                dataSource = annotation.value();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        // 切换数据源
        DataSourceContextHolder.setDB(dataSource);
    }

    @After("@annotation(com.springboot2.mjt04.config.mysql.DS)")
    public void afterSwitchDS(JoinPoint point){
        DataSourceContextHolder.clearDB();
    }
}
```

   最终目录结构图：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/mysqlop/rwseperatecase/case3-2.png')" alt="wxmp">



## 10、注意的问题

### 10.1 出现这个错误 jdbcUrl is required with driverClassName.

运行出现这个过程是因为在多数据源的情况下，springboot2.0与1.X版本都不同配置属性，解决jdbcUrl is required with driverClassName.问题，点击[这里](https://my.oschina.net/chinesedragon/blog/1647846)，但是我现在已经改过来了，以前是

```
spring.datasource.db1.url=jdbc:mysql://127.0.0.1:3306/test_msg2?useUnicode=true&characterEncoding=utf-8&useSSL=false
```

   而现在添加了jdbc-url

```ini
spring.datasource.db1.jdbc-url=jdbc:mysql://127.0.0.1:3306/test_msg2?useUnicode=true&characterEncoding=utf-8&useSSL=false
```

### 10.2 包名路径跟换

   以前1.X版本为

```ini
import org.springframework.boot.autoconfigure.jdbc.DataSourceBuilder;
```

   而现在2.X版本

```ini
import org.springframework.boot.jdbc.DataSourceBuilder;
```

   注意一下就好，因为我都给大家改好了。

   5.3 事物可以正常使用，也支持读写分离，不过在事物的方法可能比springmvc的项目麻烦些，毕竟目前我的技术只能用注解才能切换数据源，目前我没有成功找到在配置类根据方法前缀名就可以判断数据源的。

   5.4 这个是application启动类上面的一个注解，表明是不使用DataSourceAutoCOnfiguration.class,因为我们的是多个数据源，不能默认使用一个单数据源，所以要加上这个。

```ini
@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class})
```

   成功！不懂可以私信我或者留言就好。

## 参考文章
* https://my.oschina.net/mdxlcj/blog/1835656