---
title: 读写分离-Springboot连载(二)
---

::: tip
本文主要是介绍 读写分离-Springboot连载(一) ，SpingBoot + MybatisPlus 案例。
:::

[[toc]]

## 【读写分离】SpringBoot整合多数据源实现读写分离（二）（转载）


我们使用 SpingBoot + MybatisPlus + Maven 来做，由于比较简单，我们直接开始。


## 数据源配置文件

------

数据源配置文件 application.properties

```ini
spring.datasource.dynamic.primary=master

spring.datasource.dynamic.strict=false

spring.datasource.dynamic.datasource.master.url=jdbc:mysql://localhost:3306/maple_master?useUnicode=true&characterEncoding=UTF-8&serverTimezone=Asia/Shanghai&zeroDateTimeBehavior=convertToNull

spring.datasource.dynamic.datasource.master.username=root

spring.datasource.dynamic.datasource.master.password=123456

spring.datasource.dynamic.datasource.master.driver-class-name=com.mysql.cj.jdbc.Driver

spring.datasource.dynamic.datasource.slave.url=jdbc:mysql://localhost:3306/maple_slave?useUnicode=true&characterEncoding=UTF-8&serverTimezone=Asia/Shanghai&zeroDateTimeBehavior=convertToNull

spring.datasource.dynamic.datasource.slave.username=root

spring.datasource.dynamic.datasource.slave.password=123456

spring.datasource.dynamic.datasource.slave.driver-class-name=com.mysql.cj.jdbc.Driver

#mybatis plus

mybatis-plus.type-aliases-package=com.gane.maple.entity

mybatis-plus.mapper-locations=classpath*:/mapper/**Mapper.xml

mybatis-plus.global-config.field-strategy=1

mybatis-plus.global-config.db-column-underline=true

mybatis-plus.global-config.refresh-mapper=true

mybatis-plus.global-configid-type=0

mybatis-plus.configuration.map-underscore-to-camel-case=true

mybatis-plus.configuration.cache-enabled=false

mybatis-plus.configuration.log-impl=org.apache.ibatis.logging.stdout.StdOutImpl
```

## 完成pom和基础编码

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

    <name>read-write-separation-mybatisplus</name>

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

        <!-- mybatis plus start -->

        <dependency>

            <groupId>com.baomidou</groupId>

            <artifactId>mybatis-plus</artifactId>

            <version>3.2.0</version>

        </dependency>

        <dependency>

            <groupId>com.baomidou</groupId>

            <artifactId>mybatis-plus-boot-starter</artifactId>

            <version>3.2.0</version>

        </dependency>

        <!-- mybatis plus end -->

        <dependency>

            <groupId>com.baomidou</groupId>

            <artifactId>dynamic-datasource-spring-boot-starter</artifactId>

            <version>3.2.0</version>

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

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/mysqlop/rwseperatecase/serialcase2-1.png')" alt="wxmp">

## 注册 MasterSlaveAutoRoutingPlugin 

```java
package com.gane.maple.config;

import com.baomidou.dynamic.datasource.plugin.MasterSlaveAutoRoutingPlugin;

import org.springframework.context.annotation.Bean;

import org.springframework.context.annotation.Configuration;

@Configuration

public class DynamicDatasourceConfig {

    @Bean

    public MasterSlaveAutoRoutingPlugin masterSlaveAutoRoutingPlugin() {

        return new MasterSlaveAutoRoutingPlugin();

    }

}
```

## 在service层使用MybatisPlus的定义的注解 @DS

```java
package com.gane.maple.service.impl;

import com.baomidou.dynamic.datasource.annotation.DS;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;

import com.gane.maple.dao.UserDAO;

import com.gane.maple.entity.User;

import com.gane.maple.service.UserService;

import org.springframework.stereotype.Service;

/**

 * @Description UserServiceImpl

 * @Date 2020/4/24 7:41

 * @Created by 王弘博

 */

@DS("slave")

@Service

public class UserServiceImpl extends ServiceImpl<UserDAO, User> implements UserService {

}
```

## 测试 TestController

```java
package com.gane.maple.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;

import com.gane.maple.entity.User;

import com.gane.maple.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.util.Assert;

import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.web.bind.annotation.RestController;

@RestController

public class TestController {

   
    @Autowired

    private UserService userService;

    @GetMapping("/queryUser")

    public User queryUser() {

        User user = userService.getOne(new QueryWrapper<User>().eq("user_id", "1"));

        Assert.isTrue(user.getUserName().equals("maple_slave"));

        return user;

    }

}
```

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/mysqlop/rwseperatecase/serialcase2-2.png')" alt="wxmp">

修改service层的注解为 @DS("master")

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/mysqlop/rwseperatecase/serialcase2-3.png')" alt="wxmp">

## 源码

gitee地址：https://gitee.com/gane_maple/read-write-separation-mybatis-plus

## 参考文章
* https://hongchenkezhan.blog.csdn.net/article/details/114445195