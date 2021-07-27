---
title: Java-常用ORM框架区别
---

::: tip
本文主要是介绍 Java-常用ORM框架区别 。
:::

[[toc]]


## JPA、Hibernate和Mybatis区别和总结

很多人都用过java的数据库连接池C3P0，但官方没有说明名称的由来。

据传闻：连接池作者是《星球大战》迷，C3P0就是其中的一个机器人，并且这个名称中包涵connection 和pool的单词字母。因此叫这个名字（根据网友提醒，机器人的名字为C3PO，这里应该是附会了）。

 

C3P0就是下图中的右边的那个机器人。左边是他哥哥R2D2。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/framework/orm/diff-1.png')" alt="wxmp">


## 一、JPA 概述

1. Java Persistence API（Java 持久层 API）：用于对象持久化的 API

2. 作用：使得应用程序以统一的方式访问持久层

3. 前言中提到了 Hibernate，那么JPA 与 Hibernate究竟是什么关系呢：

1）JPA 是 Hibernate 的一个抽象，就像 JDBC 和 JDBC 驱动的关系

2）JPA 是一种 ORM 规范，是 Hibernate 功能的一个子集 (既然 JPA 是规范，Hibernate 对 JPA 进行了扩展，那么说 JPA 是 Hibernate 的一个子集不为过)

3）Hibernate 是 JPA 的一个实现

4. JPA 包括三个方面的技术：

1）ORM 映射元数据，支持 XML 和 **JDK 注解**两种元数据的形式

2）JPA 的 API

3）查询语言：JPQL

 

hibernate是持久化实现技术,而jpa是持久化的标准,一个是具体实现，一个是接口协议，当然springdata jpa是在hibernate的基础上更上层的封装实现。

目前比较成熟的 JPA 框架主要包括 Jboss 的 Hibernate EntityManager、Oracle 捐献给 Eclipse 社区的 EclipseLink、Apache 的 OpenJPA 等。

 
### 一、应用场合：

传统公司、部分个人开发者喜欢用jpa；而互联网公司更青睐于mybatis

原因：

1、mybatis更加灵活，开发迭代模式决定了他是互联网公司的首先；每一次的修改不会带来性能上的下降。

2、传统公司需求迭代速度慢、项目改动小，hibernate可以做到一劳永逸；hibernate容易因为添加关联关系或者开发者不了解优化导致项目，造成越改越糟糕。

### 二、各自特点：

1、mybatis官方文档就说了他是一个半自动化的持久层框架，相对于按自动的hibernate更加灵活可控；

2、mybatis的学习成本低于hibernate。

3、使用hibernate需要对他有深入的了解，尤其是缓存方面，作为一个持久层框架，性能还是第一位的。

hibernate具有三级缓存，一级缓存默认是开启的，二级缓存需要手动开始并配置优化，三级缓存可以整合业界流行的缓存技术：redis，ecache等等。

4、hibernate在关联查询中的懒加载。（在开发中，还是不建议去过多使用外键去关联操作）

5、jpa是一种规范，hibernate也是遵从这种规范；

6、springDataJpa是对repository的封装，简化了repository的操作。
 

使用了一段时间jpa，而mybatis是之前一直在用的，不说区别是啥，因为有很多人比较这两个框架了！ 

从国内开源的应用框架来看，国内使用jpa做orm的人还是比较少，如果换成hibernate还会多一些，所以面临的风险可能就是你会用，和你合作的人不一定会用，如果要多方协作，肯定要考虑这个问题！ 

灵活性方面，jpa更灵活，包括基本的增删改查、数据关系以及数据库的切换上都比mybatis灵活，但是jpa门槛较高，另外就是更新数据需要先将数据查出来才能进行更新，数据量大的时候，jpa效率会低一些，这时候需要做一些额外的工作去处理！ 

 

1.相对来说，jpa的学习成本比mybatis略高 

2.公司业务需求频繁变更导致表结构复杂，此处使用mybatis比jpa更灵活 

3.就方言来讲，一般公司选定数据库后再变更微乎其微，所以此处方言的优势可以忽略

 

很多人青睐 Mybatis ，原因是其提供了便利的 SQL 操作，自由度高，封装性好……SpringData JPA对复杂 SQL 的支持不好，没有实体关联的两个表要做 join ，的确要花不少功夫。

 

谈起操作数据库，大致可以分为几个阶段：首先是 JDBC 阶段，初学 JDBC 可能会使用原生的 JDBC 的 API，再然后可能会使用数据库连接池，比如：c3p0、dbcp，还有一些第三方工具，比如 dbutils 等，楼主认为 JDBC 是贯穿始终的，即使到了框架部分，也会对 JDBC 进行整合，此阶段还是自己手写 SQL 语句；下一个阶段就是 Hibernate，大家体会到了操作数据库可以不用自己手动编写 SQL，调用 Hibernate 提供的 API 即可。

 

 

 

**（文章借用了其他几篇博客中的内容，因为是初学者，许多概念性的关系自己不能完全理解，就将大神的搬了过来，如有不当，可留言，本人自会妥善处理，谢谢）**

在学习框架的过程中，发现学的东西很多，但是感觉他们之间的联系区别都不是很了解，知道JPA可以去实现持久化数据到数据库当中，Hibernate也有这样的功能，总以为他们之间是一种平级的关系，拥有同样的作用，是一种可以相互替代的关系，就像你吃饭时，选择吃米饭和吃面条一样，然而，在进行了一番搜索之后，发现并不是那么回事儿。

JPA本身是一种规范，它的本质是一种ORM规范（不是ORM框架，因为JPA并未提供ORM实现，只是制定了规范）因为JPA是一种规范，所以，只是提供了一些相关的接口，但是接口并不能直接使用，JPA底层需要某种JPA实现，JPA现在就是Hibernate功能的一个子集

Hibernate 从3.2开始，就开始兼容JPA。Hibernate3.2获得了Sun TCK的 JPA(Java Persistence API) 兼容认证。**JPA和Hibernate之间的关系，可以简单的理解为JPA是标准接口，Hibernate是实现，并不是对标关系，借用下图可以看清楚他们之间的关系，Hibernate属于遵循JPA规范的一种实现，但是JPA是Hibernate遵循的规范之一，Hibernate还有其他实现的规范**，所以它们的关系更像是JPA是一种做面条的规范，而Hibernate是一种遵循做面条的规范的汤面，他不仅遵循了做面条的规范，同时也会遵循做汤和调料的其他规范，他们之间并不是吃面条和吃米饭的关系

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/framework/orm/diff-2.png')" alt="wxmp">


### 1.JPA

 JPA全称： Java Persistence API，JPA通过JDK 5.0注解或XML描述对象－关系表的映射关系，并将运行期的实体对象持久化到数据库中。
 
 JPA的出现有两个原因：
 
 * 其一，简化现有Java EE和Java SE应用的对象持久化的开发工作；
 * 其二，Sun希望整合对ORM技术，实现持久化领域的统一。

 Sun之所以提出JPA规范，其目的是以官方身份来统一各种ORM框架的规范，包括著名的Hibernate、TopLink等

 不过JPA规范给开发者带来了福音：开发者面向JPA规范的接口，但底层的JPA实现可以任意切换：觉得Hibernate好的，可以选择Hibernate JPA实现；觉得TopLink好的，可以选择TopLink JPA实现……这样开发者可以避免为使用Hibernate学习一套ORM框架，为使用TopLink又要再学习一套ORM框架

 JPA提供的技术：
 * (1)ORM映射元数据 : JPA支持XML和JDK 5.0注解两种元数据的形式，元数据描述对象和表之间的映射关系，框架据此将实体对象持久化到数据库表中；
 * (2)JPA 的API:用来操作实体对象，执行CRUD操作，框架在后台替我们完成所有的事情，开发者从繁琐的JDBC和SQL代码中解脱出来。
 * (3)查询语言: 通过面向对象而非面向数据库的查询语言查询数据，避免程序的SQL语句紧密耦合

### 2. Hibernate

 JPA是需要Provider来实现其功能的，Hibernate就是JPA Provider中很强的一个。

 例如： 

 (1)实体对象的状态，在Hibernate有自由、持久、游离三种，JPA里有new，managed，detached，removed，而这些状态都是一一对应的。

 (2)flush方法，都是对应的，

 (3)Query query = manager.createQuery(sql)，它在Hibernate里写法上是session，而在JPA中变成了  manager

### 3.  JPA和Hibernate之间的关系，可以简单的理解为JPA是标准接口，Hibernate是实现。

 那么Hibernate是如何实现与JPA 的这种关系的呢？

 Hibernate主要是通过三个组件来实现的，及hibernate-annotation、hibernate-entitymanager和hibernate-core。

 (1)hibernate-annotation是Hibernate支持annotation方式配置的基础，它包括了标准的JPA annotation以及  Hibernate自身特殊功能的annotation。

 (2)hibernate-core是Hibernate的核心实现，提供了Hibernate所有的核心功能。

 (3)hibernate-entitymanager实现了标准的JPA，可以把它看成hibernate-core和JPA之间的适配器，它并不直接提供ORM的功能，而是对hibernate-core进行封装，使得Hibernate符合JPA的规范。

　　总的来说，JPA是规范，Hibernate是框架，JPA是持久化规范，而Hibernate实现了JPA。

题外的一些思考：如果抛开JPA直接使用Hibernate的注解来定义一个实例，很快发现了几个问题：

*1. jpa中有Entity, Table，hibernate中也有，但是内容不同
*2. jpa中有Column,OneToMany等，Hibernate中没有，也没有替代品

     hibernate对jpa的支持，不是另提供了一套专用于jpa的注解。一些重要的注解如Column, OneToMany等，hibernate没有提供，这说明jpa的注解已经是hibernate 的核心，hibernate只提供了一些补充，而不是两套注解。要是这样，hibernate对jpa的支持还真够足量，我们要使用hibernate注解就必定要使用jpa。

两个额外的问题：

第一个是问如果想用hibernate注解，是不是一定会用到jpa的。网友的回答：“是。如果hibernate认为jpa的注解够用，就直接用。否则会弄一个自己的出来作为补充”

第二个是问，jpa和hibernate都提供了Entity，我们应该用哪个，还是说可以两个一起用？网友回答说“Hibernate的Entity是继承了jpa的，所以如果觉得jpa的不够用，直接使用hibernate的即可”

https://blog.csdn.net/sinolover/article/details/96966213

## 参考文章
* https://www.cnblogs.com/Irving88/p/14459806.html