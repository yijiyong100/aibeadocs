---
title: Spring-基础介绍
---

::: tip
本文主要是介绍 Spring-基础内容。
:::

[[toc]]

# Spring框架的入门介绍


## 1、Spring框架的概述

*   Spring 是 2003 年兴起的一个轻量级的 Java 开发框架，由 Rod Johnson 创建。它解决了业务逻辑层和其他各层的松耦合问题，并将面向接口的编程思想贯穿整个系统应用。简单来说，Spring 是一个分层的 JavaSE/EE Full-Stack（一站式） 轻量级开源框架。

*   官方网址：[https://spring.io](https://spring.io/)

*   下载地址：https://repo.spring.io/libs-release-local/org/springframework/spring

那么问题来了，为什么说 Spring 是**分层**、**一站式**、**轻量级**的框架呢？
  
（1）分层，JavaEE 经典的 MVC 三层结构为表现层、业务层、持久层。

|                | 功能                                   | 举例                     |
| -------------- | -------------------------------------- | ------------------------ |
| Web 表现层     | 负责页面数据显示、页面跳转调度。       | JSP/Servlet、SpringMVC   |
| Service 业务层 | 负责业务处理、功能逻辑和事务控制。     | Service、JavaBean、EJB   |
| Dao 持久层     | 负责数据存取和封装，及与数据库打交道。 | JDBC、Hibernate、Mybatis |

  （2）一站式，指 Spring 为 JavaEE 的每一层都提供了解决方案，比如：

|                | 解决方案                                                        |
| -------------- | --------------------------------------------------------------- |
| Web 表现层     | Struts1、Struts2、Spring MVC                                    |
| Service 业务层 | IoC 控制反转、AOP 面向切面编程、事务控制                        |
| Dao 持久层     | JdbcTemplate、HibernateTemplate、ORM 框架（对象关系映射）的整合 |

  （3）轻量级，指从大小与开销两方面而言，Spring都是轻量的。

  完整的 Spring 框架可以在一个大小只有 1MB 多的 Jar 文件里发布。并且 Spring 所需的处理开销也是微不足道的。Spring 的出现解决了 EJB 臃肿、低效、繁琐复杂、脱离现实的情况。而且使用 Spring 编程是非侵入式的。Spring 应用中的对象不依赖于 Spring 的特定类。

## 2、Spring框架的体系结构

  Spring 框架是一个分层架构，它包含一系列的功能要素，被分为大约20个模块。这些模块分为 Core Container、Data Access/Integration、Web、AOP、Aspects、Instrumentation 和 Test，如下图所示：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/spring/basic/intro-1.png')" alt="wxmp">

核心容器（Core Container）包括 Core、Beans、Context、EL 模块：

1、Core 和 Beans 模块提供了 Spring 最基础的功能，Core 模块是核心，为其他模块提供支持，包括 Spring 的核心工具类。Beans 是 Spring 管理实体类 Bean 的主要模块，提供 IoC 控制反转和依赖注入 DI。控制反转即将控制权由原来的程序员自己管理交给 Spring 来管理，依赖注入就是注入对象实例，有四种方式，即接口注入、setter 方法注入、构造器注入和注解注入。

2、Context 上下文模块，主要基于 Core 和 Beans 模块 Context 模块的 Context 包继承了 Beans 包的功能，还增加了国际化（I18N）、事件传播等，Context 上下文模块，还包括企业服务，例如 JNDI、EJB、电子邮件、国际化、校验和调度功能。

3、Expression Language，表达式语言模块，又称 SpEL，提供了在运行期间查询和操作对象图的强大能力。包含五个主要特性：①使用 Bean 的 ID 引用 Bean；②调用方法和访问对象的属性；③对值进行算术，关系和逻辑运算；④正则表达式匹配；⑤集合操作。

## 3、Spring框架的两大核心

  Spring 两大核心分别为 IOC（Inverse of Control 控制反转）和 AOP（Aspect Oriented Programming 面向切面编程）。

### 3.1、IOC（Inverse of Control 控制反转）

  简单来说，IOC 就是将对象的创建权利交给 Spring 工厂进行管理。比如说原来我们创建对象的方法是：

```java
User user= new User();
```

  使用 IOC 后可以这样写：

```java
User user = UserFactory.getUser();
```

  其中，控制反转还包括了 DI（Dependency Injection，依赖注入）和DL（Dependency Lookup，依赖查找）。

### 3.1.1、DI（Dependency Injection，依赖注入）

  依赖注入是指在 Spring 框架创建 Bean 对象时，动态地将依赖对象注入到 Bean 组件。简单的说，就是将另外一个 Bean 对象动态地注入到另一个 Bean 中。

  依赖注入的做法：由 Spring 容器创建 Service、Dao 对象，并且通过注解或配置将 Dao 传入Servcie，那么 Service 对象就包含了 Dao 对象的引用。比如：

```java
@Service
public class UserServiceImpl implements UserService {
	@Autowired //通过注解注入UserMapper对象
	private UserMapper userMapper;
	...
}

```

### 3.2、AOP（Aspect Oriented Programming 面向切面编程）

  AOP 采取横向抽取机制，取代了传统纵向继承体系重复性代码的编写方式（例如性能监视、事务管理、安全检查、缓存、日志记录等）。

  AOP 基于代理思想，对原来目标对象，创建代理对象，在不修改原对象代码情况下，通过代理对象，调用增强功能的代码，从而对原有业务方法进行增强。例如可以在插入 User 对象之前进行打印日志，请看下面的代码示例。
  UserService.java：

```java
public interface UserService {
	void add(User user);
}
```

  前置增强类 PrintLogBefore.java：

```java
//前置增强代码
public class PrintLogBefore implements MethodBeforeAdvice {
	private static final Logger log = Logger.getLogger(PrintLogBefore.c
	lass);
	@Override
	public void before(Method method, Object[] arguments, Object target) throws Throwable {
		log.info("在插入User之前执行的方法");
 	}
 }

```

  最后配置切入点：

``` xml
<bean id="printBefore" class="com.atlantis.aop.test.PrintLogBefore"></bean>
<aop:config>
	<aop:pointcut expression="execution(public void save(com.atlantis.aop.domain.User))" id="pointcut"/>
	<aop:advisor advice-ref="printBefore" pointcut-ref="pointcut"/>
</aop:config>

```

  这样在调用 add(User user) 方法之前就会执行前置增强类`PrintLogBefore.java`的`before()`方法。

## 4、Spring框架的优势

  **（1）方便解耦，简化开发**。通过 Spring 提供的 IoC 容器，可以将对象间的依赖关系交由 Spring 进行控制，避免硬编码所造成的过度程序耦合。用户也不必再为单例模式类、属性文件解析等这些很底层的需求编写代码，可
以更专注于上层的应用。

  **（2）AOP 编程的支持**。通过 Spring 的 AOP 功能，方便进行面向切面的编程，许多不容易用传统 OOP 实现的功能可以通过 AOP 轻松应付。

  **（3）声明式事务的支持**。可以将我们从单调烦闷的事务管理代码中解脱出来，通过声明式方式灵活的进行事务的管理，提高开发效率和质量。

  **（4）方便程序的测试**。可以用非容器依赖的编程方式进行几乎所有的测试工作，测试不再是昂贵的操作，而是随手可做的事情。

  **（5）方便集成各种优秀框架**。Spring 可以降低各种框架的使用难度，提供了对各种优秀框架（Struts、Hibernate、Hessian、Quartz等）的直接支持。

  **（6）降低 JavaEE API 的使用难度**。Spring 对 JavaEE API（如 JDBC、JavaMail、远程调用等）进行了薄薄的封装层，使这些 API 的使用难度大为降低。

  **（7）Java 源码是经典学习范例**。Spring 的源代码设计精妙、结构清晰、匠心独用，处处体现着大师对 Java 设计模式灵活运用以及对 Java 技术的高深造诣。它的源代码无意是 Java 技术的最佳实践的范例。

## 参考文章
* https://blog.csdn.net/q961250375/article/details/102817130