---
title: 读写分离-Springboot连载(一)
---

::: tip
本文主要是介绍 读写分离-Springboot连载(一) ，SpingBoot + Mybatis 案例。
:::

[[toc]]

## 【读写分离】SpringBoot整合多数据源实现读写分离（一）（转载）

## 背景

实际项目中大都读多写少，如果查询出现瓶颈之后，我们可以考虑使用读写分离。

比如有三台Mysql服务器A、B、C，一主二从，先配置好 [主从复制](https://blog.csdn.net/qq_33101675/article/details/89137208) 之后，再来做读写分离，A用来做update操作，B和C用来做select操作。

网上很多文章都写的比较乱，这里我尽量简单优雅的完成。

## 分析

有很多中间件可以使用，比如：Mycat，当当的Sharding-JDBC，美团的DBProxy等，但是都需要依赖第三方组件，增加学习和money成本，

这里我们使用Spring提供的轻量级数据路由类 AbstractRoutingDataSource 来实现

## 准备工作

1、我这边准备两个DB，maple_master，maple_slave，主从复制这里就不做了，感兴趣的可以看这里[主从复制](https://blog.csdn.net/qq_33101675/article/details/89137208) ；

DDL和DML为：

```sql
CREATE TABLE `user` (

  `user_id` varchar(16) NOT NULL,

  `user_name` varchar(64) DEFAULT NULL,

  PRIMARY KEY (`user_id`)

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='user';

INSERT INTO `maple_master`.`user`(`user_id`, `user_name`) VALUES ('1', 'maple_master');

INSERT INTO `maple_slave`.`user`(`user_id`, `user_name`) VALUES ('1', 'maple_slave');
```

2、我这里使用常规的技术栈：SpingBoot + Mybatis + Maven，首先导入pom和基本编码

```xml
<?xml version="1.0" encoding="UTF-8"?>

<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"

         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">

    <modelVersion>4.0.0</modelVersion>

    <parent>

        <groupId>org.springframework.boot</groupId>

        <artifactId>spring-boot-starter-parent</artifactId>

        <version>2.4.3</version>

        <relativePath/> <!-- lookup parent from repository -->

    </parent>

    <groupId>com.gane.maple</groupId>

    <artifactId>read-write-separation-mybatisplus</artifactId>

    <version>0.0.1-SNAPSHOT</version>

    <name>read-write-separation-mybatis</name>

    <description>Demo project for Spring Boot</description>

    <properties>

        <java.version>1.8</java.version>

    </properties>

    <dependencies>

        <dependency>

            <groupId>org.springframework.boot</groupId>

            <artifactId>spring-boot-starter</artifactId>

        </dependency>

        <dependency>

            <groupId>org.springframework.boot</groupId>

            <artifactId>spring-boot-starter-web</artifactId>

        </dependency>

        <dependency>

            <groupId>org.springframework.boot</groupId>

            <artifactId>spring-boot-starter-aop</artifactId>

            <version>2.4.2</version>

        </dependency>

        <dependency>

            <groupId>mysql</groupId>

            <artifactId>mysql-connector-java</artifactId>

            <scope>runtime</scope>

        </dependency>

        <dependency>

            <groupId>com.alibaba</groupId>

            <artifactId>druid-spring-boot-starter</artifactId>

            <version>1.1.10</version>

        </dependency>

        <dependency>

            <groupId>org.springframework</groupId>

            <artifactId>spring-jdbc</artifactId>

        </dependency>

        <dependency>

            <groupId>org.mybatis.spring.boot</groupId>

            <artifactId>mybatis-spring-boot-starter</artifactId>

            <version>2.1.3</version>

        </dependency>

        <dependency>

            <groupId>org.apache.commons</groupId>

            <artifactId>commons-lang3</artifactId>

            <version>3.9</version>

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

        <plugins>

            <plugin>

                <groupId>org.springframework.boot</groupId>

                <artifactId>spring-boot-maven-plugin</artifactId>

            </plugin>

        </plugins>

    </build>

</project>
```

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/mysqlop/rwseperatecase/serialcase1-1.png')" alt="wxmp">

## 编码

## 1、多数据源配置文件

```ini
#master

spring.datasource.master.type=com.alibaba.druid.pool.DruidDataSource

spring.datasource.master.driver-class-name=com.mysql.cj.jdbc.Driver

spring.datasource.master.jdbc-url=jdbc:mysql://localhost:3306/maple_master?useUnicode=true&characterEncoding=UTF-8&serverTimezone=Asia/Shanghai&zeroDateTimeBehavior=convertToNull

spring.datasource.master.username=root

spring.datasource.master.password=root

#slave

spring.datasource.slave.type=com.alibaba.druid.pool.DruidDataSource

spring.datasource.slave.driver-class-name=com.mysql.cj.jdbc.Driver

spring.datasource.slave.jdbc-url=jdbc:mysql://localhost:3306/maple_slave?useUnicode=true&characterEncoding=UTF-8&serverTimezone=Asia/Shanghai&zeroDateTimeBehavior=convertToNull

spring.datasource.slave.username=root

spring.datasource.slave.password=root
```

## 2、DataSource配置

```java
package com.gane.maple.jdbc.datasource;

import com.gane.maple.jdbc.routing.ClientDataSource;

import com.gane.maple.jdbc.routing.component.ClientDataSourceRouter;

import org.springframework.beans.factory.annotation.Qualifier;

import org.springframework.boot.context.properties.ConfigurationProperties;

import org.springframework.boot.jdbc.DataSourceBuilder;

import org.springframework.context.annotation.Bean;

import org.springframework.context.annotation.Configuration;

import org.springframework.context.annotation.Primary;

import javax.sql.DataSource;

import java.util.HashMap;

import java.util.Map;

/**

 * @author maple

 * @date 2021/3/3

 */

@Configuration

public class DataSourceConfig {

    @Bean(name = "masterDataSource")

    @ConfigurationProperties(prefix = "spring.datasource.master")

    public DataSource masterDataSource() {

        return DataSourceBuilder.create().build();

    }

    @Bean(name = "slaveDataSource")

    @ConfigurationProperties(prefix = "spring.datasource.slave")

    public DataSource slaveDataSource() {

        return DataSourceBuilder.create().build();

    }

    @Primary

    @Bean(name = "dynamicDatasource")

    public ClientDataSourceRouter dynamicDatasource(@Qualifier("masterDataSource") DataSource masterDataSource,

                                                    @Qualifier("slaveDataSource") DataSource slaveDataSource) {

        ClientDataSourceRouter dataSourceRouter = new ClientDataSourceRouter();

        dataSourceRouter.setDefaultTargetDataSource(masterDataSource);

        Map<Object, Object> targetDataSources = new HashMap<>();

        targetDataSources.put(ClientDataSource.MASTER, masterDataSource);

        targetDataSources.put(ClientDataSource.SLAVE, slaveDataSource);

        dataSourceRouter.setTargetDataSources(targetDataSources);

        return dataSourceRouter;

    }

}
```

## 3、MybatisConfig配置

```java
package com.gane.maple.jdbc.datasource;

import org.apache.ibatis.session.SqlSessionFactory;

import org.mybatis.spring.SqlSessionFactoryBean;

import org.mybatis.spring.annotation.MapperScan;

import org.springframework.beans.factory.annotation.Qualifier;

import org.springframework.context.annotation.Bean;

import org.springframework.context.annotation.Configuration;

import org.springframework.core.io.support.PathMatchingResourcePatternResolver;

import org.springframework.jdbc.datasource.DataSourceTransactionManager;

import javax.sql.DataSource;

/**

 * @author maple

 * @date 2021/3/3

 */

@Configuration

@MapperScan(MybatisConfig.MAPPER_PACKAGE)

public class MybatisConfig {

    public static final String MAPPER_PACKAGE = "com.gane.maple.dao";

    public static final String TYPE_ALIASES_PACKAGE = "com.gane.maple.dao.entity";

    public static final String MAPPER_XML_LOCATIONS = "mapper/*Mapper.xml";

    @Bean

    public SqlSessionFactory sqlSessionFactory(@Qualifier("dynamicDatasource") DataSource dataSource) throws Exception {

        SqlSessionFactoryBean factoryBean = new SqlSessionFactoryBean();

        factoryBean.setDataSource(dataSource);

        factoryBean.setTypeAliasesPackage(TYPE_ALIASES_PACKAGE);

        factoryBean.setMapperLocations(new PathMatchingResourcePatternResolver().getResources(MAPPER_XML_LOCATIONS));

        return factoryBean.getObject();

    }

    @Bean

    public DataSourceTransactionManager transactionManager(@Qualifier("dynamicDatasource") DataSource dataSource) {

        return new DataSourceTransactionManager(dataSource);

    }

}
```

## 4、创建 ClientDataSource 枚举 定义主从库

```java
package com.gane.maple.jdbc.routing;

/**

 * @author maple

 * @date 2021/3/3

 */

public enum ClientDataSource {

    MASTER, SLAVE

}
```

## 5、创建 ClientDataSourceContextHolder 来保存 ClientDataSource

```java
package com.gane.maple.jdbc.routing;

import java.util.Objects;

/**

 * Context Holder that will hold the value for datasource routing for each different thread 

 * (request).

 *

 * @author maple

 * @date 2021/3/3

 */

public class ClientDataSourceContextHolder {

    private static final ThreadLocal<ClientDataSource> CONTEXT = new ThreadLocal<>();

    public static void set(ClientDataSource clientDataSource) {

        CONTEXT.set(Objects.requireNonNull(clientDataSource, "clientDatabase cannot be null"));

    }

    public static ClientDataSource getClientDatabase() {

        return CONTEXT.get();

    }

    public static void clear() {

        CONTEXT.remove();

    }

}
```

## 6、继承 AbstractRoutingDataSource

重写 determineCurrentLookupKey 方法，返回所使用的数据源的Key(master/slave)给到 resolvedDataSources，从而通过Key从resolvedDataSources里拿到其对应的DataSource

```java
package com.gane.maple.jdbc.routing.component;

import com.gane.maple.jdbc.routing.ClientDataSource;

import com.gane.maple.jdbc.routing.ClientDataSourceContextHolder;

import lombok.extern.slf4j.Slf4j;

import org.springframework.jdbc.datasource.lookup.AbstractRoutingDataSource;

/**

 * {@link javax.sql.DataSource} for spring framework that will gives the desired     

 * datasource based on the

 * current value stored in the {@link ClientDataSourceContextHolder}

 *

 * @author maple

 * @date 2021/3/3

 */

@Slf4j

public class ClientDataSourceRouter extends AbstractRoutingDataSource {

    @Override

    protected Object determineCurrentLookupKey() {

        ClientDataSource clientDataSource = ClientDataSourceContextHolder.getClientDatabase();

        if (clientDataSource == null) {

            log.debug("null client database, use default {}", ClientDataSource.MASTER);

            clientDataSource = ClientDataSource.MASTER;

        }

        log.trace("use {} as database", clientDataSource);

        return clientDataSource;

    }

}
```

## 7、通过注解 DataSourceRouting 来标识走master/slave

```java
package com.gane.maple.jdbc.routing.annotation;

import com.gane.maple.jdbc.routing.ClientDataSource;

import java.lang.annotation.ElementType;

import java.lang.annotation.Retention;

import java.lang.annotation.RetentionPolicy;

import java.lang.annotation.Target;

/**

 * Indicates that a method uses a specific datasource defined in {@link ClientDataSource}.

 *

 * @author maple

 * @date 2021/3/3

 */

@Target(ElementType.METHOD)

@Retention(RetentionPolicy.RUNTIME)

public @interface DataSourceRouting {

    ClientDataSource value() default ClientDataSource.MASTER;

}
```

## 8、创建 DataSourceRoutingAspect，来处理注解 DataSourceRouting

```java
package com.gane.maple.jdbc.routing.component;

import com.gane.maple.jdbc.routing.ClientDataSource;

import com.gane.maple.jdbc.routing.ClientDataSourceContextHolder;

import com.gane.maple.jdbc.routing.annotation.DataSourceRouting;

import lombok.extern.slf4j.Slf4j;

import org.aspectj.lang.ProceedingJoinPoint;

import org.aspectj.lang.annotation.Around;

import org.aspectj.lang.annotation.Aspect;

import org.springframework.stereotype.Component;

/**

 * Aspect that will mark a method to route to the desired datasource before calling the 

 * method.

 *

 * @author maple

 * @date 2021/3/3

 */

@Aspect

@Component

@Slf4j

public class DataSourceRoutingAspect {

    @Around("@annotation(dataSourceRouting)")

    public Object aroundDataSourceRouting(ProceedingJoinPoint joinPoint, DataSourceRouting dataSourceRouting)

            throws Throwable {

        ClientDataSource previousClient = ClientDataSourceContextHolder.getClientDatabase();

        log.warn("Setting clientDatabase {} into DataSourceContext", dataSourceRouting.value());

        ClientDataSourceContextHolder.set(dataSourceRouting.value());

        try {

            return joinPoint.proceed();

        } finally {

            if (previousClient != null) {

                // revert context back to previous state after execute the method

                ClientDataSourceContextHolder.set(previousClient);

            } else {

                // there is no value being set into the context before, just clear the context

                // to prevent memory leak

                ClientDataSourceContextHolder.clear();

            }

        }

    }

}
```

## 9、主类 ReadWriteSeparationMybatisApplication

由于我们没有使用 spring.datasource.url、spring.datasource.username 默认的配置，而是自定义的 spring.datasource.master.jdbc-url、spring.datasource.master.username 等配置，

所以我们需要排除Spring的自动配置类 DataSourceAutoConfiguration，防止在我们启动项目的时候，由于找不到 spring.datasource.url、spring.datasource.username 等配置而报了 “url” 未配置的 错误。

```java
package com.gane.maple;

import org.springframework.boot.SpringApplication;

import org.springframework.boot.autoconfigure.SpringBootApplication;

import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class})

public class ReadWriteSeparationMybatisApplication {

    public static void main(String[] args) {

        SpringApplication.run(ReadWriteSeparationMybatisApplication.class, args);

    }

}
```

## 10、测试

自测成功，可自行debug

### TestController：

```java
package com.gane.maple.controller;

import com.gane.maple.entity.User;

import com.gane.maple.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.web.bind.annotation.RestController;

/**

 * @author maple

 * @date 2021/3/2

 */

@RestController

public class TestController {

    @Autowired

    private UserService userService;

    @GetMapping("/queryUser")

    public User queryUser() {

        User userFromMaster = userService.selectByUserId("1");

        User userFromSlave = userService.selectByUserName("maple_slave");

        User userFromMasterAndSlave = userService.selectFromMasterAndSlave("1", "maple_slave");

        User selectFromMasterAndSlaveWithDataSourceRouting = userService.selectFromMasterAndSlaveWithDataSourceRoutingInDao("1", "maple_slave");

        User selectFromMasterAndSlaveWithoutDataSourceRouting = userService.selectFromMasterAndSlaveWithoutDataSourceRoutingInDao("1", "maple_slave");

        return selectFromMasterAndSlaveWithDataSourceRouting;

    }

}
```

###  UserServiceImpl

```java
package com.gane.maple.service.impl;

import com.gane.maple.dao.UserDAO;

import com.gane.maple.entity.User;

import com.gane.maple.jdbc.routing.ClientDataSource;

import com.gane.maple.jdbc.routing.annotation.DataSourceRouting;

import com.gane.maple.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

/**

 * @Description UserServiceImpl

 * @Date 2020/4/24 7:41

 * @Created by 王弘博

 */

@Service

public class UserServiceImpl implements UserService {

    @Autowired

    private UserDAO userDAO;

    /**

     * 把 @DataSourceRouting 放进 dao 层

     *

     * @param userId

     * @return

     */

    @Override

    public User selectByUserId(String userId) {

        User userFromMaster = userDAO.selectByUserId(userId);

        System.out.println("查询master库：" + userFromMaster);

        return userFromMaster;

    }

    /**

     * 把 @DataSourceRouting 放进 dao 层

     *

     * @param userName

     * @return

     */

    @Override

    public User selectByUserName(String userName) {

        User userFromSlave = userDAO.selectByUserName(userName);

        System.out.println("查询slave库：" + userFromSlave);

        return userFromSlave;

    }

    /**

     * 把 @DataSourceRouting 放进 dao 层

     * 观察进入aspect几次

     *

     * @param userId

     * @param userName

     * @return

     */

    @Override

    public User selectFromMasterAndSlave(String userId, String userName) {

        User userFromMaster = userDAO.selectByUserId(userId);

        System.out.println("查询master库：" + userFromMaster);

        User userFromSlave = userDAO.selectByUserName(userName);

        System.out.println("查询slave库：" + userFromSlave);

        return userFromMaster;

    }

    /**

     * 把 @DataSourceRouting 放进 service 层 和 dao 层。判断具体以哪个datasource为准

     *

     * @param userId

     * @param userName

     * @return

     */

    @DataSourceRouting(value = ClientDataSource.SLAVE)

    @Override

    public User selectFromMasterAndSlaveWithDataSourceRoutingInDao(String userId, String userName) {

        User userFromMaster = userDAO.selectByUserId(userId);

        System.out.println("查询master库：" + userFromMaster);

        User userFromSlave = userDAO.selectByUserName(userName);

        System.out.println("查询slave库：" + userFromSlave);

        return userFromMaster;

    }

    @DataSourceRouting(value = ClientDataSource.SLAVE)

    @Override

    public User selectFromMasterAndSlaveWithoutDataSourceRoutingInDao(String userId, String userName) {

        User userFromMaster = userDAO.selectByUserIdWithoutDataSourceRouting(userId);

        System.out.println("查询master库：" + userFromMaster);

        User userFromSlave = userDAO.selectByUserNameWithoutDataSourceRouting(userName);

        System.out.println("查询slave库：" + userFromSlave);

        return userFromMaster;

    }

 

}
```

### UserDAO

```java
package com.gane.maple.dao;

import com.gane.maple.entity.User;

import com.gane.maple.jdbc.routing.ClientDataSource;

import com.gane.maple.jdbc.routing.annotation.DataSourceRouting;

/**

 * @Description UserDAO

 * @Date 2020/4/24 7:39

 * @Created by 王弘博

 */

public interface UserDAO {

    @DataSourceRouting(value = ClientDataSource.MASTER)

    User selectByUserId(String userId);

    @DataSourceRouting(value = ClientDataSource.SLAVE)

    User selectByUserName(String userName);

    User selectByUserIdWithoutDataSourceRouting(String userId);

    User selectByUserNameWithoutDataSourceRouting(String userName);

}
```

## 10、总结

- 1. 我们可以把注解 DataSourceRouting 作用在 service 接口 上，也可以作用在 dao 接口 上
- 2. 如果只作用在 service 接口上的话，比如配置的是 slave，那么该 service 里的所有调用 dao 的地方，都会走 slave 数据源；
- 3. 如果只作用在 dao 接口上的话，比如配置的是 slave，那么该 service 里的所有调用 dao 的地方，都会走 slave 数据源；
- 4. 如果 service 上配置的是 master，aDao配置的是 slave，bDao配置的是 master，当走到 service 的时候，会被 DataSourceRoutingAspect 拦截到，并赋值master给 ClientDataSourceContextHolder ，当执行到 aDao 的时候，又会被 DataSourceRoutingAspect 拦截到，拿到配置在aDao上的注解slave，重写determineCurrentLookupKey 方法里会返回 slave出去，最终走的是 slave 数据源；当执行到 bDao 的时候，又会被 DataSourceRoutingAspect 拦截到，拿到配置在bDao上的注解master，则最终执行 bDao 走的是 master 数据源；所以在dao接口上配置注解的优先级要高于在service上配置，遵循就近原则；这里需要开发人员根据自己的业务来做相应的处理。

## 11、源码

gitee地址：https://gitee.com/gane_maple/read-write-separation-mybatis

## 参考文章
* https://hongchenkezhan.blog.csdn.net/article/details/114396476