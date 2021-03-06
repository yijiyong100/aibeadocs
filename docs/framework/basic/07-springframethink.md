---
title: Spring框架核心组件思想
---

::: tip
本文主要是介绍 Spring框架核心组件思想 。
:::

[[toc]]

## Spring框架核心组件，架构思想总结

## 一、Spring框架

### 1、框架简介

Spring是一个开源框架，框架的主要优势之一就是其分层架构，分层架构允许使用者选择使用哪一个组件，同时为 J2EE 应用程序开发提供集成的框架。Spring使用基本的JavaBean来完成以前只可能由EJB完成的事情。然而，Spring的用途不仅限于服务器端的开发。从简单性、可测试性和松耦合的角度而言，任何Java应用都可以从Spring中受益。简单来说，Spring是一个分层的轻量级开源框架。

### 2、优点分析

#### 1)、分层架构

一站式，每一个层都提供的解决方案web层：struts，spring-MVCservice层：springdao层：hibernate，mybatis，jdbcTemplate，JPA

#### 2)、轻量级

依赖资源少，销毁的资源少。

#### 3)、高内聚低耦合

Spring就是一个大容器，可以将所有对象创建和依赖关系统一维护，交给Spring管理。

#### 4)、AOP编程的支持

Spring提供面向切面编程，可以方便的实现对程序进行权限拦截、运行监控等功能。

#### 5)、事务的支持

只需要通过配置就可以完成对事务的管理，而无需手动编程

#### 6)、集成测试

Spring对Junit4支持，可以通过注解方便的测试Spring程序。

#### 7)、降低API的使用难度

Spring 对JavaEE开发中非常难用的一些API（JDBC、JavaMail、远程调用等），都提供了封装，使这些API应用难度大大降低

#### 8)、集成各种框架

Spring不排斥各种优秀的开源框架，其内部提供了对各种优秀框架的集成，如：Struts、Hibernate、MyBatis等。

## 二、核心组件分析

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/framework/basic/springthink-1.jpeg')" alt="wxmp">

### 1、核心容器

容器是Spring框架的核心模式，该模块包含Bean的创建、配置、管理等功能。

### 2、AOP编程

AOP 编程可以帮助应用程序解耦，使用AOP编程模式，可以把系统中的核心点从对象方法中解耦，统一管理。

### 3、数据访问

该模块集成了JDBC，解决JDBC开发模式导致的大量代码冗余，集成常用的Dao层框架，hibernate，mybatis等，使开发环境的搭建更加便捷。

### 4、Web编程

Spring不仅集成各种流程的MVC框架，还自带springmvc强大的框架，有助实现界面逻辑和应用程序分离，在Web层面实现应用的解耦。

## 三、IOC控制反转

### 1、IOC容器思想

Java系统中对象耦合关系十分复杂，系统的各模块之间依赖，微服务模块之间的相互调用请求，都是这个道理。降低系统模块之间、对象之间、微服务的服务之间耦合度，是软件工程核心问题之一。因为Spring框架中核心思想就是IOC控制反转，用来实现对象之间的解耦。

### 2、控制反转

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/framework/basic/springthink-2.jpeg')" alt="wxmp">

传统方式对象A如果想使用对象B的功能方法，在需要的时候创建对象B的实例，调用需要的方法，对对象B有主动的控制权。

IOC容器当使用IOC容器之后，对象A和B之间失去了直接联系，对象A如果想使用对象B的功能方法，IOC容器会自动创建一个对象B实例注入到对象A需要的功能模块中，这样对象A失去了主动控制权，也就是控制反转了。

### 3、依赖注入

IOC给对象直接建立关系的动作，称为DI依赖注入(Dependency Injection);依赖：对象A需要使用对象B的功能，则称对象A依赖对象B。注入：在对象A中实例化对象B，从而使用对象B的功能，该动作称为注入。

## 四、核心API总结

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/framework/basic/springthink-3.jpeg')" alt="wxmp">

针对上面用到的几个核心API进行说明，后续持续总结。

### 1、BeanFactory

这是一个工厂，用于生成任意bean。采取延迟加载，第一次getBean时才会初始化Bean。

### 2、ApplicationContext

是BeanFactory的子接口，功能更强大。（国际化处理、事件传递、Bean自动装配、各种不同应用层的Context实现）。当配置文件被加载，就进行对象实例化。

### 3、ClassPathXmlApplicationContext

用于加载classpath（类路径、src）下的xml加载xml运行时位置：/WEB-INF/classes/...xml

### 4、FileSystemXmlApplicationContext

用于加载指定盘符下的xml加载xml运行时位置：/WEB-INF/...xml，通过ServletContext.getRealPath()获得具体盘符配置。

## 五、AOP基础简介

### 1、切面编程简介

AOP全称：Aspect Oriented Programming，面向切面编程。通过预编译方式和运行期动态代理实现程序功能的统一维护的一种技术。核心作用：可以对业务逻辑的各个部分进行隔离，从而使得业务逻辑各部分之间的耦合度降低，提高程序的复用性和开发效率。AOP提供了取代继承和委托的一种新的方案，而且使用起来更加简洁清晰，是软件开发中的一个热点理念。

### 2、AOP术语

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/framework/basic/springthink-4.jpeg')" alt="wxmp">

(1)、通知类型:Advice

前置通知[Before]：目标方法被调用之前;返回通知[After-returning]：目标方法执行成功之后;异常通知[After-throwing]：在目标方法抛出异常之后; 后置通知[After]：目标方法完成之后;环绕通知[Around]：在目标方法执行前后环绕通知;

(2)、连接点：JoinPoint

程序执行的某一个特定位置，如类初始前后，方法的运行前后。

(3)、切点:Pointcut

连接点是指那些在指定策略下可能被拦截到的方法。

(4)、切面：Aspect

切面由切点和通知的结合。

(5)、引入：Introduction

特殊的增强,为类添加一些属性和方法。

(6)、织入：Weaving

将增强添加到目标类的具体连接点上的过程。编译期织入，这要求使用特殊编译器；类装载期织入，这要求使用特殊的类加载器；动态代理织入，在运行期为目标类添加增强生成子类的方式，Spring采用的是动态代理织入，而AspectJ采用编译期织入和类装载期织入。

(7)、代理：Proxy

类被AOP织入后生成一个结果类，它是融合了原类和增强逻辑的代理类。

## 参考文章
* https://baijiahao.baidu.com/s?id=1669486760104123818