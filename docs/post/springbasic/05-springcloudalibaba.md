---
title: Spring Cloud Alibaba面试题
---

::: tip
本文主要是介绍 Spring Cloud Alibaba面试题，面试题和相关解答来自网络，难免有纰漏和疏忽，阅读的时候，发现有疑问的地方，建议多方求证，也可以关注原文评论区，也欢迎在本站[【问题反馈页面】](https://www.yijiyong.com/about/aboutqa.html)留言反馈。
:::

[[toc]]

## 1.微服务个人理解

微服务架构是一种架构模式或者说是一种架构风格，它提倡将单一应用程序划分为一组小的服务，每个服务运行在其独立的自己的进程中，服务之间相互协调、互相配合，为用户提供最终价值。服务之间采用轻量级的通信机制互相沟通（通常是基于HTTP的RESTful API），每个服务都围绕着具体的业务进行构建，并且能够被独立的构建在生产环境、类生产环境等。另外，应避免统一的、集中式的服务管理机制，对具体的一个服务而言，应根据业务上下文，选择合适的语言、工具对其进行构建，可以有一个非常轻量级的集中式管理来协调这些服务，可以使用不同的语言来编写服务，也可以使用不同的数据存储。

## 2.什么是Spring Cloud&&Alibaba？

Spring Cloud是Spring开源组织下的一个子项目，提供了一系列用于实现分布式微服务系统的工具集，帮助开发者快速构建微服务应用。

Spring Cloud Alibaba是Spring Cloud的子项目；包含微服务开发必备组件；基于和符合Spring Cloud标准的阿里的微服务解决方案。


## 3.服务注册和发现是什么意思？Spring Cloud如何实现？

当我们开始一个项目时，我们通常在属性文件中进行所有的配置。随着越来越多的服务开发和部署，添加和修改这些属性变得更加复杂。有些服务可能会下降，而某些位置可能会发生变化。手动更改属性可能会产生问题。 Nacos服务注册和发现可以在这种情况下提供帮助。由于所有服务都在Eureka服务器上注册并通过调用Nacos服务器完成查找，因此无需处理服务地点的任何更改和处理。

## 4.什么是Nacos?

英文全称Dynamic Naming and Configuration Service，Na为naming/nameServer即注册中心,co为configuration即注册中心，service是指该注册/配置中心都是以服务为核心。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/post/springbasic/springcloudalibaba-1.png')" alt="wxmp">

## 5.Nacos注册中心原理

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/post/springbasic/springcloudalibaba-2.png')" alt="wxmp">

服务提供者、服务消费者、服务发现组件这三者之间的关系大致如下

1、微服务在启动时，将自己的网络地址等信息注册到服务发现组件(nacos server)中，服务发现组件会存储这些信息。

2、各个微服务与服务发现组件使用一定机制通信（例如在一定的时间内发送心跳包）。服务发现组件若发现与某微服务实例通信正常则保持注册状态(up在线状态)、若长时间无法与某微服务实例通信，就会自动注销（即：删除）该实例。

3、服务消费者可从服务发现组件查询服务提供者的网络地址，并使用该地址调用服务提供者的接口。

4、当微服务网络地址发生变更（例如实例增减或者IP端口发生变化等）时，会重新注册到服务发现组件。

## 6.Nacos注册中心使用【Nacos-Client客户端】

（1）pom文件加依赖:alibaba-nacos-discovery

```xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
</dependency>
```

（2）启动类加注解

```java
//Nacos服务端【早期版本需要加注解，现在0.0.9版本后已不是必须的】
@EnableDiscoveryClient
```

（3）在对应的微服务的yml配置文件【服务名称和nacos server 地址】

```ini
spring:
  cloud:
    nacos:
      discovery:
        #指定nacos server的地址，不需要写http
        server-addr: localhost:8848 
```

## 7.Nacos配置中心使用【Nacos-Server服务端】

1）加依赖–alibaba-nacos-config

```xml
<!--nacos-config nacos管理配置的依赖-->
<dependency>
	<groupId>org.springframework.cloud</groupId>
	<artifactId>spring-cloud-starter-alibaba-nacos-config</artifactId>
</dependency>
```

2）加配置，新增bootstrap.yml文件配置，配置属性如下

```yml
spring:
  cloud:
    nacos:
      config:
        server-addr: 127.0.0.1:8848 #这里的server-addr用作配置管理
        file-extension: yaml
  application:
    name: user-server
  profiles: # profiles区分多环境配置
    active: dev #切换配置文件，如dev、test、pro等环境
```

3）配置中心包含：配置管理、服务管理(微服务管理)、命名空间、集群管理

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/post/springbasic/springcloudalibaba-3.png')" alt="wxmp">

4）通过配置更改动态刷新参数–@RefreshScope注解
普通application参数在配置中心直接配置皆可，如果需要可以动态刷新的配置，需要在相应类上加上@RefreshScope注解,示例如下，当在nacos配置中心更改配置后，方法getId的值也会刷新。

```java
@RefreshScope
public class IdEntity {
    @Value("${id}")
    private int id;
    public int getId(){
        return this.id;
}
```

## 8.Feign介绍

Feign是Netfilx开源的声明式HTTP客户端，Feign是一个http请求调用的轻量级框架，可以以Java接口注解的方式调用Http请求。Spring Cloud引入 Feign并且集成了Ribbon实现客户端负载均衡调用。

## 9.Feign调用原理

Feign远程调用，核心就是通过一系列的封装和处理，将以JAVA注解的方式定义的远程调用API接口，最终转换成HTTP的请求形式，然后将HTTP的请求的响应结果，解码成JAVA Bean，放回给调用者。

基于重试器发送HTTP请求：Feign 内置了一个重试器，当HTTP请求出现IO异常时，Feign会有一个最大尝试次数发送请求。

## 10.Feign调用原理

（1）加依赖–openfeign

```xml
 <!--feign依赖、服务通信-->
<dependency>
	<groupId>org.springframework.cloud</groupId>
	<artifactId>spring-cloud-starter-openfeign</artifactId>
</dependency>
```

（2）启动类加注解

```java
@EnableFeignClients//feign注解
```

（3）请求接口的类加FeignClient注解：

```java
@FeignClient(value="article-server")1
```

## 11.Feign使用中遇到的相关问题

（1）使用feign客户端调用其他微服务时，发送POST请求时，对象信息没有传递成功。关键在于加上注解：`@RequestBody`
（2）使用feign客户端调用其他微服务时，报错超时：`e=feign.RetryableException: Read timed out executing POST`

```java
ribbon.ReadTimeout=60000ribbon.ConnectTimeout=6000012
```

## 12.什么是服务熔断？什么是服务降级？

`熔断机制`是应对雪崩效应的一种微服务链路保护机制。当某个微服务不可用或者响应时间太长时，会进行服务降级，进而熔断该节点微服务的调用，快速返回“错误”的响应信息。当检测到该节点微服务调用响应正常后恢复调用链路。在SpringCloud框架里熔断机制通过Hystrix实现，Hystrix会监控微服务间调用的状况，当失败的调用到一定阈值，缺省是5秒内调用20次，如果失败，就会启动熔断机制。

`服务降级`，一般是从整体负荷考虑。就是当某个服务熔断之后，服务器将不再被调用，此时客户端可以自己准备一个本地的fallback回调，返回一个缺省值。这样做，虽然水平下降，但好歹可用，比直接挂掉强。

## 13.什么是服务雪崩效应?

雪崩效应是在大型互联网项目中，当某个服务发生宕机时，调用这个服务的其他服务也会发生宕机，大型项目的微服务之间的调用是互通的，这样就会将服务的不可用逐步扩大到各个其他服务中，从而使整个项目的服务宕机崩溃。

## 14.@LoadBalanced注解的作用

开启客户端负载均衡。

## 15. Nginx与Ribbon的区别

Nginx是反向代理同时可以实现负载均衡，nginx拦截客户端请求采用负载均衡策略根据upstream配置进行转发，相当于请求通过nginx服务器进行转发。Ribbon是客户端负载均衡，从注册中心读取目标服务器信息，然后客户端采用轮询策略对服务直接访问，全程在客户端操作。

## 16.Ribbon底层实现原理

Ribbon使用discoveryClient从注册中心读取目标服务信息，对同一接口请求进行计数，使用%取余算法获取目标服务集群索引，返回获取到的目标服务信息。

## 17.Ribbon负载均衡算法

IRule是以下七种负载均衡算法的父接口


<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/post/springbasic/springcloudalibaba-4.png')" alt="wxmp">
说明：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/post/springbasic/springcloudalibaba-5.png')" alt="wxmp">

- **RoundRobinRule**： 默认轮询的方式
- **RandomRule**： 随机方式
- **WeightedResponseTimeRule**： 根据响应时间来分配权重的方式，响应的越快，分配的值越大。
- **BestAvailableRule**： 选择并发量最小的方式
- **RetryRule**： 在一个配置时间段内当选择server不成功，则一直尝试使用subRule的方式选择一个可用的server
- **ZoneAvoidanceRule**： 根据性能和可用性来选择。
- **AvailabilityFilteringRule**： 过滤掉那些因为一直连接失败的被标记为circuit tripped的后端server，并过滤掉那些高并发的的后端server（active connections 超过配置的阈值）

## 18.分布式事务产生的背景？

在传统的单体项目中，多个不同的业务逻辑使用的都是同一个数据源，使用的都是同一个事务管理器，所以不会存在事务问题。
在分布式或者微服务架构中，每个服务都有自己的数据源，使用不同事务管理器，如果A服务去调用B服务，B服务执行失败了，A服务的事务和B服务的事务都会回滚，这时候是不存在事务问题的，但是如果A服务B服务执行成功之后出现异常，A服务的事务会回滚，但是B服务的事务不会回滚，此时就存在分布式事务问题。

## 19.seata是什么

Seata是阿里巴巴退出的一款用来解决分布式事务问题的框架，他经过天猫双十一的考验，很有可能成为解决分布式事务问题的主流框架

## 20.seata术语

Seata分为三个模块，分别是TM、RM和TC(简写)。
- TC(transaction Coordinator)，代表seata服务器，seata是一个spring boot的jar包。
- TM(transaction Manager)事务管理器。
- RM(Resource Manager) 代表每个数据库。
Seata还用了一个XID，代表了一个分布式事务，相当于dubbo中的Request ID。

## 21.seata流程

- TM向TC注册全局事务，并生成全局唯一的XID。
- RM向TC注册分支事务，并将其纳入该XID对应的全局事务范围。
- RM向TC汇报资源的准备状态。
- TC汇总所有事务参与者的执行状态，决定分布式事务是全部提交还是全部回滚。
- TC通知所有RM提交/回滚事务。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/post/springbasic/springcloudalibaba-6.png')" alt="wxmp">

## 22.seata流程相亲版

- 张学霸（TM）跟导师(TC)提议，为卢学霸安排对象，卢学霸生成了一个相亲id。
- 女神（RM）向tc注册了资料，卢学霸在他的相亲id中接收到了推送。
- 女神向卢学霸汇报自己的资料。
- TC汇总所有女神的资料，让卢学霸决定是否去参加相亲。
- TC向卢学霸汇报相亲结果。

## 23.Seata分布式事务框架实现原理？

Seata有三个组成部分：事务协调器TC：协调者、事务管理器TM：发起方、资源管理器RM：参与方
- （1）发起方会向协调者申请一个全局事务id，并保存到ThreadLocal中（为什么要保存到ThreadLocal中？弱引用，线程之间不会发生数据冲突）
- （2）Seata数据源代理发起方和参与方的数据源，将前置镜像和后置镜像写入到undo_log表中，方便后期回滚使用
- （3）发起方获取全局事务id，通过改写Feign客户端请求头传入全局事务id。
- （4）参与方从请求头中获取全局事务id保存到ThreadLocal中，并把该分支注册到SeataServer中。
- （5）如果没有出现异常，发起方会通知协调者，协调者通知所有分支，通过全局事务id和本地事务id删除undo_log数据，如果出现异常，通过undo_log逆向生成sql语句并执行，然后删除undo_log语句。如果处理业务逻辑代码超时，也会回滚。

## 24.SpringBoot如何整合Seata?

一般情况下，学一个知识不需要去学API，学的主要是思想，API会发生变化，思想几乎是不会变的
- 第一步：引入依赖
- 第二步：bin下的file文件和registry文件放入到每个项目中，并修改，分组名称要保持一致
- 第三步：yml配置seata
- 第四步：引入`DataSourceProxy`配置文件
- 第五步：添加核心主机`@GlobalTransaction`注解

## 25.常见的分布式事务解决方案？

- 1、使用MQ
- 2、使用LCN
- 3、使用Seata
- 4、2PC、3PC

## 26、SpringCloud Alibaba的面试题视频参考：
SpringCloud Alibaba的面试题视频参考:https://www.bilibili.com/video/av500291691

[SpringCloud Alibaba的面试题视频参考](https://www.bilibili.com/video/av500291691)


## 参考文章
* https://blog.csdn.net/BruceLiu_code/article/details/115322713