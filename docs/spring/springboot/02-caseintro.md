---
title: SpringBoot-入门案例
---

::: tip
本文主要是介绍 SpringBoot-入门案例 。
:::

[[toc]]

# SpringBoot介绍与使用

## 1.什么是SpringBoot

SpringBoot是Spring项目中的一个子工程，与我们所熟知的Spring-framework 同属于spring的产品:

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/spring/springboot/introcase/1870574-20200107152050875-292944333.png')" alt="wxmp">

我们可以看到下面的一段介绍：

> Takes an opinionated view of building production-ready Spring applications. Spring Boot favors convention over configuration and is designed to get you up and running as quickly as possible.

翻译一下：

> 用一些固定的方式来构建生产级别的spring应用。Spring Boot 推崇约定大于配置的方式以便于你能够尽可能快速的启动并运行程序。

其实人们把Spring Boot 称为搭建程序的`脚手架`。其最主要作用就是帮我们快速的构建庞大的spring项目，并且尽可能的减少一切xml配置，做到开箱即用，迅速上手，让我们关注与业务而非配置。

## 2.为什么要学习SpringBoot

java一直被人诟病的一点就是臃肿、麻烦。当我们还在辛苦的搭建项目时，可能Python程序员已经把功能写好了，究其原因注意是两点：

- 复杂的配置，

  项目各种配置其实是开发时的损耗， 因为在思考 Spring 特性配置和解决业务问题之间需要进行思维切换，所以写配置挤占了写应用程序逻辑的时间。

- 一个是混乱的依赖管理。

  项目的依赖管理也是件吃力不讨好的事情。决定项目里要用哪些库就已经够让人头痛的了，你还要知道这些库的哪个版本和其他库不会有冲突，这难题实在太棘手。并且，依赖管理也是一种损耗，添加依赖不是写应用程序代码。一旦选错了依赖的版本，随之而来的不兼容问题毫无疑问会是生产力杀手。

而SpringBoot让这一切成为过去！

> Spring Boot 简化了基于Spring的应用开发，只需要“run”就能创建一个独立的、生产级别的Spring应用。Spring Boot为Spring平台及第三方库提供开箱即用的设置（提供默认设置，存放默认配置的包就是启动器），这样我们就可以简单的开始。多数Spring Boot应用只需要很少的Spring配置。

我们可以使用SpringBoot创建java应用，并使用java –jar 启动它，就能得到一个生产级别的web工程。

## 3.SpringBoot的特点

Spring Boot 主要目标是：

- 为所有 Spring 的开发者提供一个非常快速的、广泛接受的入门体验
- 开箱即用（启动器starter-其实就是SpringBoot提供的一个jar包），但通过自己设置参数（.properties），即可快速摆脱这种方式。
- 提供了一些大型项目中常见的非功能性特性，如内嵌服务器、安全、指标，健康检测、外部化配置等
- 绝对没有代码生成，也无需 XML 配置。

更多细节，大家可以到[官网](http://projects.spring.io/spring-boot/)查看。

## 4.SpringBoot搭建web工程

接下来，我们就来利用SpringBoot搭建一个web工程，体会一下SpringBoot的魅力所在！

### 4.1.创建工程

我们先新建一个空的工程：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/spring/springboot/introcase/1870574-20200107151841788-249813710.png')" alt="wxmp">

工程名为demo：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/spring/springboot/introcase/1870574-20200107151850447-2080207698.png')" alt="wxmp">

新建一个model：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/spring/springboot/introcase/1870574-20200107151858468-566760405.png')" alt="wxmp">

使用maven来构建：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/spring/springboot/introcase/1870574-20200107151908964-1995888213.png')" alt="wxmp">

然后填写项目坐标：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/spring/springboot/introcase/1870574-20200107151918260-410976956.png')" alt="wxmp">

目录结构：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/spring/springboot/introcase/1870574-20200107151926827-566703320.png')" alt="wxmp">

项目结构：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/spring/springboot/introcase/1870574-20200107151934401-269509826.png')" alt="wxmp">

### 4.2.添加依赖

看到这里很多同学会有疑惑，前面说传统开发的问题之一就是依赖管理混乱，怎么这里我们还需要管理依赖呢？难道SpringBoot不帮我们管理吗？

别着急，现在我们的项目与SpringBoot还没有什么关联。SpringBoot提供了一个名为spring-boot-starter-parent的工程，里面已经对各种常用依赖（并非全部）的版本进行了管理，我们的项目需要以这个项目为父工程，这样我们就不用操心依赖的版本问题了，需要什么依赖，直接引入坐标即可！

#### 4.2.1.添加父工程坐标

```xml
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.0.0.RELEASE</version>
    </parent>
```

#### 4.2.2.添加web启动器

为了让SpringBoot帮我们完成各种自动配置，我们必须引入SpringBoot提供的自动配置依赖，我们称为`启动器`。因为我们是web项目，这里我们引入web启动器：

```xml
    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
    </dependencies>
```

需要注意的是，我们并没有在这里指定版本信息。因为SpringBoot的父工程已经对版本进行了管理了。

这个时候，我们会发现项目中多出了大量的依赖：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/spring/springboot/introcase/1870574-20200107151946712-1488212532.png')" alt="wxmp">

这些都是SpringBoot根据spring-boot-starter-web这个依赖自动引入的，而且所有的版本都已经管理好，不会出现冲突。

#### 4.2.3.管理jdk版本

默认情况下，maven工程的jdk版本是1.5，而我们开发使用的是1.8，因此这里我们需要修改jdk版本，只需要简单的添加以下属性即可：

```xml
    <properties>
        <java.version>1.8</java.version>
    </properties>
```

#### 4.2.4.完整pom

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>com.leyou.demo</groupId>
    <artifactId>springboot-demo</artifactId>
    <version>1.0-SNAPSHOT</version>

    <properties>
        <java.version>1.8</java.version>
    </properties>

    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.0.0.RELEASE</version>
    </parent>

    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
    </dependencies>
</project>
```

### 4.3.启动类

Spring Boot项目通过main函数即可启动，我们需要创建一个启动类：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/spring/springboot/introcase/1870574-20200107151957644-1785670489.png')" alt="wxmp">

然后编写main函数：

```java
@SpringBootApplication
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
```

### 4.4.编写controller

接下来，我们就可以像以前那样开发SpringMVC的项目了！

我们编写一个controller：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/spring/springboot/introcase/1870574-20200107152006685-2001039746.png')" alt="wxmp">

代码：

```java
@RestController
public class HelloController {

    @GetMapping("hello")
    public String hello(){
        return "hello, spring boot!";
    }
}
```

### 4.5Yaml配置文件

配置文件除了可以使用application.properties类型，还可以使用后缀名为: .yml 或者 .yaml的类型，也就是：application.yml或者application.yaml

```
Yaml是一种简洁的非标记语言。Yaml是以数据为中心，使用空白，缩进，分行组织数据，从而使得表示更加简洁易读。
```

基本格式：

```
#服务端口
server:
  port: 8080
```

如果两个配置文件都有，会把两个文件的配置合并，如果有重复属性，以Properties中的为准

### 4.6.启动测试

接下来，我们运行main函数，查看控制台：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/spring/springboot/introcase/1870574-20200107152016764-1376831306.png')" alt="wxmp">

并且可以看到监听的端口信息：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/spring/springboot/introcase/1870574-20200107152024638-870327918.png')" alt="wxmp">

- 1）监听的端口是8080
- 2）SpringMVC的映射路径是：/
- 3）`/hello`路径已经映射到了`HelloController`中的`hello()`方法

打开页面访问：http://localhost:8080/hello

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/spring/springboot/introcase/1870574-20200107152032991-1054332374.png')" alt="wxmp">

测试成功了！

## 参考文章
* https://www.cnblogs.com/jimlau/p/12161747.html