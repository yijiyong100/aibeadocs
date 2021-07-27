---
title: SpringBoot-Mybatis案例
---

::: tip
本文主要是介绍 SpringBoot-Mybatis案例 。
:::

[[toc]]


## SpringBoot 2.X整合Mybatis

## 1、创建工程环境

勾选Web、Mybatis、MySQL，如下

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/framework/orm/mybatiscase-1.png')" alt="wxmp">


依赖如下

``` xml
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
            <groupId>org.mybatis.spring.boot</groupId>
            <artifactId>mybatis-spring-boot-starter</artifactId>
            <version>2.1.0</version>
        </dependency>
```

创建完成之后注意，MyBatis依赖的命名和其他库的命名不太一样，是的这个整合jar包并不是springboot自己的，这表示该starter是由第三方提供的，就像`Druid`数据源一样，也是第三方的。

方便阅读，先贴出下面操作编写的类位置信息，如下图：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/framework/orm/mybatiscase-2.png')" alt="wxmp">


## 2、配置数据库连接信息

这里使用yml方式

``` 
spring:
  datasource:
    username: root
    url: jdbc:mysql://localhost:3306/ufida?serverTimezone=UTC
    password: 123456
    driver-class-name: com.mysql.jdbc.Driver
#如果要使用Druid数据源就要导入相应jar包，当然也可以不指定type
    type: com.alibaba.druid.pool.DruidDataSource
```

配置完成后，MyBatis就可以创建实体类来使用。

## 3、编写实体类

实体类：dao包下的Userdao

``` java
public class Userdao {
    private int user_id;
    private String userName;
    private String passWord;
    private int usertypeid;

	getXXX...
	setXXX...
	toString...
}
```

## 4、编写Mapper接口类

Mapper接口类：mapper包下的UserMapper

``` java
@Mapper
@Repository   
public interface UserMapper {
   //只是整合测试，为了可读性，只写了一个方法
    List<Userdao> queryUserList();
}
```

这里要注意一下@Mapper注解，@Mapper注解添加位置在接口类上面它的作用是在编译之后会生成相应的接口实现类，这种方法也是官方推荐使用的！这里只是测试整合mybatis编写一个Mapper接口即可，如果有需求要很多接口都要变成实现类，那么需要在每个接口类上加上@Mapper注解，比较麻烦，解决这个问题用@MapperScan注解。简单点说@MapperScan注解就相当于直接扫描指定包，上面的代码所在包是`com.yichunnnn.jdbcboot.mapper`包下，如果要用@MapperScan注解，就相当于如下即可

``` java
@MapperScan("com.yichunnnn.jdbcboot.mapper")  //相当于@Mapper
@SpringBootApplication
public class JdbcbootApplication {
    public static void main(String[] args) {
        SpringApplication.run(JdbcbootApplication.class, args);
    }
}
```

## 5、编写Mapper映射文件

Mapper映射文件编写的位置以及名字为：`classpath:mybatis/mapper/UserMapper.xml`

``` java
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">

<mapper namespace="com.yichunnnn.jdbcboot.mapper.UserMapper">

    <select id="queryUserList" resultType="Userdao">
        select * from user
    </select>
</mapper>
```

考虑到可读性，这里只编写一个查询的方法，同时特别注意

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/framework/orm/mybatiscase-3.png')" alt="wxmp">


只要错了一处都会报错！

## 6、SpringBoot 整合Mybatis

实际上Mybatis的整合过程像极了我们程序员的一生。

在SpringBoot 整合Mybatis之前，我们回忆回忆以前 MyBatis 单独使用时，myBatis 核心配置文件要配置数据源、事务、连接数据库账号、密码....是的全是这货一个人干，都要亲力亲为。这就是我们的低谷期

myBatis 与 spring 整合的时候，配置数据源、事务、连接数据库的账号什么的都交由 spring 管理就行，就不用什么都自己管理自己去干。这就是我们春风得意的时候，事业有着落...

再后来，SpringBoot 整合Mybatis的时候，数据源什么的，springboot都默认准备好了，甚至不使用mybatis配置文件也没问题，如果我们自己已经编写了 myBatis 的映射配置文件，则只要告诉 spring boot 这些文件的位置的好了，如下（yml写法），这简直是事业有成，迎娶白富美，走上人生巅峰...

``` xml
#整合Mybatis   #指定myBatis的核心配置文件与Mapper映射文件
mybatis:
  mapper-locations: classpath:mybatis/mapper/*.xml
#注意：对应实体类的路径
  type-aliases-package: com.yichunnnn.jdbcboot.dao
```

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/framework/orm/mybatiscase-4.png')" alt="wxmp">

故事是美好的，然而事实却是骨感的.....

最后的配置文件也就如上图效果所示，如果需要完全理解配置文件可以从 `org.mybatis.spring.boot.autoconfigure.MybatisProperties` 类中查看（鼠标点击属性就可以进入），当然也可以从官方文档中查阅：http://mybatis.org/spring-boot-starter/mybatis-spring-boot-autoconfigure/

## 7、编写controller层代码

``` java
@RestController
public class MybatisController {
    @Autowired
    private UserMapper userMapper;

    @GetMapping("/selectUser")
    public String selectUser(){
        List<Userdao> userdaos = userMapper.queryUserList();
        for (Userdao user : userdaos) {
            System.out.println(user);
        }
        return "select success == SpringBoot 2.X整合Mybatis成功！";
    }
}
```

运行测试

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/framework/orm/mybatiscase-5.png')" alt="wxmp">


效果如上，则整合成功！

## 8、SpringBoot 2.X整合Mybatis原理

SpringBoot 2.X整合Mybatis原理实际上就隐含在`org.mybatis.spring.boot.autoconfigure` 包中，这里面蕴含着SpringBoot 整合Mybatis的精华原理所在，具体位置如下

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/framework/orm/mybatiscase-6.png')" alt="wxmp">


在myBatis 与 spring 整合的时候，开发者需要自己提供两个`Bean`，一个`SqlSessionFactoryBean`，还有一个是`MapperScannerConfigurer`，在`Spring Boot`中，这两个东西虽然不用开发者自己提供了，但是并不意味着这两个Bean不需要了，在`org.mybatis.spring.boot.autoconfigure.MybatisAutoConfiguration`类中，我们可以看到Spring Boot提供了这两个Bean，关键源码如下：

``` java
@org.springframework.context.annotation.Configuration
@ConditionalOnClass({ SqlSessionFactory.class, SqlSessionFactoryBean.class })
@ConditionalOnSingleCandidate(DataSource.class)
@EnableConfigurationProperties(MybatisProperties.class)
@AutoConfigureAfter(DataSourceAutoConfiguration.class)
public class MybatisAutoConfiguration implements InitializingBean {

  @Bean
  @ConditionalOnMissingBean
  public SqlSessionFactory sqlSessionFactory(DataSource dataSource) throws Exception {
    SqlSessionFactoryBean factory = new SqlSessionFactoryBean();
    factory.setDataSource(dataSource);
    return factory.getObject();
  }
  @Bean
  @ConditionalOnMissingBean
  public SqlSessionTemplate sqlSessionTemplate(SqlSessionFactory sqlSessionFactory) {
    ExecutorType executorType = this.properties.getExecutorType();
    if (executorType != null) {
      return new SqlSessionTemplate(sqlSessionFactory, executorType);
    } else {
      return new SqlSessionTemplate(sqlSessionFactory);
    }
  }
  @org.springframework.context.annotation.Configuration
  @Import({ AutoConfiguredMapperScannerRegistrar.class })
  @ConditionalOnMissingBean(MapperFactoryBean.class)
  public static class MapperScannerRegistrarNotFoundConfiguration implements InitializingBean {

    @Override
    public void afterPropertiesSet() {
      logger.debug("No {} found.", MapperFactoryBean.class.getName());
    }
  }
}
```

从类上的注解可以看出，当当前类路径下存在`SqlSessionFactory`、 `SqlSessionFactoryBean`以及`DataSource`时，这里的配置才会生效，`SqlSessionFactory`和`SqlTemplate`都被提供了。这段代码的意义就在于`Spring Boot`中`MyBatis`多数据源的配置时做了重要的参考！

当然如果对mybatis的配置属性感兴趣的也可以参考`MybatisProperties`类，要探索更多原理主要以`org.mybatis.spring.boot.autoconfigure` 包为中心进行参考！


## 参考文章
* https://www.cnblogs.com/yichunguo/p/12164679.html