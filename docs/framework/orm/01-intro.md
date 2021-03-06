---
title: Java-常用ORM框架介绍
---

::: tip
本文主要是介绍 Java-常用ORM框架介绍 。
:::

[[toc]]

## 主流Java ORM框架有哪些？

ORM 是 Object Relational Mapping 的缩写，译为“对象关系映射”框架。

所谓的 ORM 框架就是一种为了解决面向对象与关系型数据库中数据类型不匹配的技术，它通过描述 Java 对象与数据库表之间的映射关系，自动将 Java 应用程序中的对象持久化到关系型数据库的表中。

ORM 框架是一种数据持久化技术，即在对象模型和关系型数据库之间建立起对应关系，并且提供一种机制，可通过 JavaBean 对象操作数据库表中的数据，如图1所示。



<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/framework/orm/intro-1.png')" alt="wxmp">

图1：ORM 映射关系


在实际开发中，程序员使用面向对象的技术操作数据，而存储数据时，使用的却是关系型数据库，这样就造成了很多不便。ORM 可以在对象模型和关系型数据库的表之间建立一座桥梁，程序员使用 API 直接操作 JavaBean 对象就可以实现数据的存储、查询、更改和删除等操作。

MyBatis 框架通过简单的 XML 或注解进行配置和原始映射，将实体类和 SQL 语句之间建立起映射关系，是一种半自动化的 ORM 实现。

## 主流的 Java ORM 框架

当前 Java ORM 框架产品有很多，常见的框架有 MyBatis 和 Hibernate、JPA，其主要区别如下。

### 1) MyBatis  【目前互联网主流项目使用】

MyBatis 框架是一个半自动映射的框架。这里所谓的“半自动”是相对于 Hibernate 框架全表映射而言的，MyBatis 框架需要手动匹配提供 POJO、SQL 和映射关系，而 Hibernate 框架只需提供 POJO 和映射关系即可。

与 Hibernate 框架相比，虽然使用 MyBatis 框架手动编写 SQL 要比使用 Hibernate 框架的工作量大，但 MyBatis 框架可以配置动态 SQL 并优化 SQL、通过配置决定 SQL 的映射规则，以及支持存储过程等。对于一些复杂的和需要优化性能的项目来说，显然使用 MyBatis 框架更加合适。

MyBatis 框架可应用于需求多变的互联网项目，如电商项目；Hibernate 框架可应用于需求明确、业务固定的项目，如 OA 项目、ERP 项目等。

MyBatis 3 中文文档：https://mybatis.org/mybatis-3/zh/

### 2) Hibernate

Hibernate 框架是一个全表映射的框架。通常开发者只要定义好持久化对象到数据库表的映射关系，就可以通过 Hibernate 框架提供的方法完成持久层操作。

开发者并不需要熟练地掌握 SQL 语句的编写，Hibernate 框架会根据编制的存储逻辑，自动生成对应的 SQL，并调用 JDBC 接口来执行，所以其开发效率会高于 MyBatis 框架。

然而Hibernate框架自身也存在一些缺点，例如：

- 多表关联时，对 SQL 查询的支持较差；
- 更新数据时，需要发送所有字段；
- 不支持存储过程；
- 不能通过优化 SQL 来优化性能。


这些问题导致其只适合在场景不太复杂且对性能要求不高的项目中使用。

Hibernate 官网：http://hibernate.org/



### 3) JPA 

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/framework/orm/intro-2.png')" alt="wxmp">

#### 1、简介：

Java Persistence API：用于对象持久化的 API。

Java EE 5.0 平台标准的 ORM 规范，使得应用程序以统一的方式访问持久层。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/framework/orm/intro-3.png')" alt="wxmp">

#### 2、JPA 是 hibernate 的一个抽象（就像JDBC和JDBC驱动的关系）：

 JPA 是规范：JPA 本质上就是一种 ORM 规范，不是ORM 框架 —— 因为 JPA 并未提供 ORM 实现，它只是制订了一些规范，提供了一些编程的 API 接口，但具体实现则由 ORM 厂商提供实现。

 Hibernate 是实现：Hibernate 除了作为 ORM 框架之外，它也是一种 JPA 实现从功能上来说， JPA 是 Hibernate 功能的一个子集。

#### 3、JPA 的特点：

 标准化: 提供相同的 API，这保证了基于JPA 开发的企业应用能够经过少量的修改就能够在不同的 JPA 框架下运行。
 
简单易用，集成方便: JPA 的主要目标之一就是提供更加简单的编程模型，在 JPA 框架下创建实体和创建 Java 类一样简单，只需要使用 javax.persistence.Entity 进行注释；JPA 的框架和接口也都非常简单。

 可媲美JDBC的查询能力: JPA的查询语言是面向对象的，JPA定义了独特的JPQL，而且能够支持批量更新和修改、JOIN、GROUP BY、HAVING 等通常只有 SQL 才能够提供的高级查询特性，甚至还能够支持子查询。

 支持面向对象的高级特性: JPA 中能够支持面向对象的高级特性，如类之间的继承、多态和类之间的复杂关系，最大限度的使用面向对象的模型。
#### 4、JPA 技术：

 ORM 映射元数据：JPA 支持 XML 和 JDK 5.0 注解两种元数据的形式，元数据描述对象和表之间的映射关系，框架据此将实体对象持久化到数据库表中。

 JPA 的 API：用来操作实体对象，执行CRUD操作，框架在后台完成所有的事情，开发者从繁琐的 JDBC和 SQL代码中解脱出来。

 查询语言（JPQL）：这是持久化操作中很重要的一个方面，通过面向对象而非面向数据库的查询语言查询数据，避免程序和具体的 SQL 紧密耦合。



## 参考文章
* http://c.biancheng.net/view/8117.html
* https://blog.csdn.net/lizhiqiang1217/article/details/89743650