---
title: SpringBoot-工作原理
---

::: tip
本文主要是介绍 SpringBoot-工作原理 。
:::

[[toc]]

# spring boot 工作原理

------

## 一，spring

### spring ioc

ioc（inversion of control，控制反转）有两种实现方式，一种是di（dependency injection），另一种是dl（dependency lookup，依赖查找），前者是当前软件实体被动接受其依赖的其他组件被ioc容器注入，而后者则是当前软件实体主动去某个服务注册地查找其依赖的那么服务。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/spring/springboot/workprin/20180728160809491.png')" alt="wxmp">

任何一个使用spring框架构建的独立的Java应用，通常会存在一些类似于`context.getBean(...)`的代码，实际上，这行代码做的就是dl的工作，而构建的任何一种ioc容器背后（比如BeanFactory或者ApplicationContext）发送的事情，则更多是di的过程（也可能有部分dl的逻辑用于对接遗留系统）。

而di依赖注入是spring ioc容器最常见的实现方式。

spring ioc容器的依赖注入工作可以分为两个阶段：

**阶段一：收集和注册**

第一个阶段可以认为是构建和收集bean定义的阶段，在这个阶段，我们可以通过xml或者Java代码的方式定义一些bean，然后通过手动组装或者让容器基于某些机制自动扫描的方式，将这些bean定义收集到ioc容器中。

**阶段二：分析和组装**

当第一阶段工作完成后，我们可以先暂且认为ioc容器中充斥着一个个独立的bean，它们之间没有任何关系。但实际上，它们之间是有依赖关系的，所以，ioc容器在第二个阶段要干的事情就是分析这些已经在ioc容器中的bean，然后根据它们之间的依赖关系先后组装它们。如果ioc容器发现某个bean依赖另一个bean，它就会将这另一个bean注入给依赖它的那个bean，直到所有bean的依赖都注入完成，所有bean都整装待发，整个ioc容器的工作即算完成。

### 作用域

在默认情况下，spring应用上下文中所有bean都是作为以单例（singleton）的形式创建的。也就是说，不管给定的一个bean被注入到其他bean多少次，每次所注入的都是同一个实例。

spring定义了多种作用域，可以基于这些作用域创建bean，包括：

* 单例（singleton）：在整个应用中，只创建bean的一个实例。
* 原型（prototype）：每次注入或者通过spring应用上下文获取的时候，都会创建一个新的bean实例。
* 会话（session）：在web应用中，为每个会话创建一个bean实例。
* 请求（request）：在web应用中，为每个请求创建一个bean实例。

### 注解 annotation

### @configuration

任何一个标注了@configuration的Java类定义都是一个JavaConfig配置类。

### @bean

任何一个标注了@bean的方法，其返回值将作为一个bean定义注册到spring的ioc容器，方法名将默认成为该bean定义的id。

### @ComponentScan

@ComponentScan用于配合一些元信息Java annotation，比如@component和@repository等，将标注了这些元信息annotation的bean定义类批量采集到spring的ioc容器中。

我们可以通过basePackages等属性来细粒度地定制@ComponentScan自动扫描的范围，如果不指定，则默认spring框架实现会从声明@ComponentScan所在类的package进行扫描。

### @PropertySource与@PropertySources

@PropertySource用于从某些地方加载*.properties文件内容，并将其中的属性加载到ioc容器中，便于填充一些bean定义属性的占位符。

### @Import与@ImportResource

@Import负责引入JavaConfig形式定义的ioc容器配置，如果有一些遗留的配置或者遗留系统需要以xml的形式来配置（比如dubbo框架），我们依然可以通过@ImportResource将它们一起合并到当前JavaConfig配置的容器中。

### aop

aop是aspect oriented programing的简称，意为面向切面编程。

spring aop使用了动态代理技术在运行期织入增强的代码，使用了两种代理机制，一种是基于jdk的动态代理，另一种是基于CGLib的动态代理。

图示1
<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/spring/springboot/workprin/20180729150648746.png')" alt="wxmp">

------

## 二，spring boot

一个典型的springboot应用

``` java
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class DemoApplication {

    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }
}
```

### @SpringBootApplication

@SpringBootApplication是一个复合annotation。

``` java
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Inherited
@SpringBootConfiguration
@EnableAutoConfiguration
@ComponentScan(excludeFilters = {
        @Filter(type = FilterType.CUSTOM, classes = TypeExcludeFilter.class),
        @Filter(type = FilterType.CUSTOM, classes = AutoConfigurationExcludeFilter.class) })
public @interface SpringBootApplication {
    ...
}
```

其中最重要的三个annotation是@SpringBootConfiguration，@EnableAutoConfiguration和@ComponentScan。
所以以下 的springboot启动类也可以启动。

``` java
@SpringBootConfiguration
@EnableAutoConfiguration
@ComponentScan
public class DemoApplication {

    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }
}
```

### @SpringBootConfiguration和@Configuration

``` java
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Configuration
public @interface SpringBootConfiguration 12345
```

@SpringBootConfiguration本质上是一个@Configuration。
启动类标注了@SpringBootConfiguration之后，本身其实也是一个ioc容器的配置类。

### @EnableAutoConfiguration

spring框架提供了各种名字以@Enable开头的annotation定义，比如@EnableScheduling、@EnableCaching、@EnableMBeanExport等，@EnableAutoConfiguration就是借助@Import的支持，收集和注册特定场景相关的bean定义：
@EnableScheduling是通过@Import将spring调度框架相关的bean定义都加载到ioc容器。
@EnableMBeanExport是通过@Import将JMX相关的bean定义都加载到ioc容器

``` java
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Inherited
@AutoConfigurationPackage
@Import(AutoConfigurationImportSelector.class)
public @interface EnableAutoConfiguration 1234567
```

@EnableAutoConfiguration作为一个复合annotation，其中最关键的要属@Import(AutoConfigurationImportSelector.class)，借助AutoConfigurationImportSelector，@EnableAutoConfiguration可以帮助springboot应用将所有符合条件的@Configuration配置都加载到当前springboot创建并使用的ioc容器，就跟一只八爪鱼一样。

AutoConfigurationImportSelector借助spring框架原有的一个工具类SpringFactoriesLoader的支持，@EnableAutoConfiguration可以智能地完成自动配置。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/spring/springboot/workprin/2018072817215161.png')" alt="wxmp">

SpringFactoriesLoader主要功能是从指定的配置文件META-INF/spring.factories加载配置，spring.factories是一个典型的Java properties文件，配置的格式为key=value形式，只不过key和value都是Java类型的完整类型。

SpringFactoriesLoader在@EnableAutoConfiguration的场景中，更多的是提供了一种配置查找的功能支持，即根据@EnableAutoConfiguration的完整类名org.springframework.boot.autoconfigure.EnableAutoConfiguration作为查找的key，获取对应的一组@Configuration类：

``` java
org.springframework.boot.autoconfigure.EnableAutoConfiguration=\
org.springframework.boot.autoconfigure.admin.SpringApplicationAdminJmxAutoConfiguration,\
org.springframework.boot.autoconfigure.aop.AopAutoConfiguration,\
...
```

所以，@EnableAutoConfiguration的自动配置就是从classpath中搜寻所有META-INF/spring.factories配置文件，并将其中org.springframework.boot.autoconfigure.EnableAutoConfiguration对应的配置项通过反射实例化为对应的标注了@Configuration的JavaConfig形式的ioc容器配置类，然后汇总为一个并加载到ioc容器。

### @ComponentScan

@ComponentScan的功能其实就是自动扫描并加载符合条件的组件或bean定义，最终将这些bean定义加载到容器中。

### SpringApplication执行流程

具体流程可以参考《springboot揭秘 快速构建微服务体系》的3.3.1
图示1

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/spring/springboot/workprin/20180728183555425.png')" alt="wxmp">

图示2

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/spring/springboot/workprin/20180728183727701.png')" alt="wxmp">

图示3

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/spring/springboot/workprin/20180728183739129.png')" alt="wxmp">

图示4

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/spring/springboot/workprin/20180728183747863.png')" alt="wxmp">

------

## 三，参考

《springboot揭秘 快速构建微服务体系》
《spring实战》
spring boot启动流程解析：https://www.cnblogs.com/trgl/p/7353782.html
spring boot启动流程详解：https://www.cnblogs.com/xinzhao/p/5551828.html
java Headless模式：https://www.cnblogs.com/wudi-dudu/p/7871405.html

## 参考文章
* https://blog.csdn.net/Chen_Victor/article/details/81262233