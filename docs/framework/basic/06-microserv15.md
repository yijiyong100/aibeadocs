---
title: 常见的15种微服务架构框架
---

::: tip
本文主要是介绍 常见的15种微服务架构框架 。
:::

[[toc]]

这几年来，微服务这个概念越来越火了，火到什么程度呢？2019年有一个统计说，两千家企业里，45%在使用微服务，16%在实验开发和测试微服务架构，24%在学习微服务准备转型，只有剩下的15%的企业没有使用微服务。
微服务到底有什么好呢？微服务在2013年才被提出，短短几年就有这么快速的发展。微服务架构能够实现由小型自主服务组成一个整体应用，各个组成部分之间是松耦合的，复杂性低，各个部分可以独立部署，修复bug或者引入新特性更容易，能够独立扩展，不同技术栈之间可以使用不同框架、不同版本库甚至不同的操作系统平台。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/framework/basic/microserv15-1.png')" alt="wxmp">


对于中大型架构系统来说，微服务更加便捷，微服务成为很多企业架构重构的方向，同时也对架构师提出更高的挑战。目前有很多常用于微服务构建的框架，对于构建微服务架构能够带来一些帮助。


## Java语言相关微服务框架


### Spring Boot 
Spring Boot的设计目的是简化新Spring应用初始搭建以及开发过程，2017年有64.4%的受访者决定使用Spring Boot，可以说是最受欢迎的微服务开发框架。利用Spring Boot开发的便捷度简化分布式系统基础设施的开发，比如像配置中心、注册、负载均衡等方面都可以做到一键启动和一键部署。

### Spring Cloud 

Spring Cloud是一个系列框架的合计，基于HTTP（s）的RETS服务构建服务体系，Spring Cloud能够帮助架构师构建一整套完整的微服务架构技术生态链。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/framework/basic/microserv15-2.png')" alt="wxmp">


### Dubbo 
Dubbo是由阿里巴巴开源的分布式服务化治理框架，通过RPC请求方式访问。Dubbo是在阿里巴巴的电商平台中逐渐探索演进所形成的，经历过复杂业务的高并发挑战，比Spring Cloud的开源时间还要早。目前阿里、京东、当当、携程、去哪等一些企业都在使用Dubbo。

### Dropwizard 
Dropwizard将Java生态系统中各个问题域里最好的组建集成于一身，能够快速打造一个Rest风格的后台，还可以整合Dropwizard核心以外的项目。国内现在使用Dropwizard还很少，资源也不多，但是与Spring Boot相比，Dropwizard在轻量化上更有优势，同时如果用过Spring，那么基本也会使用Spring Boot。

### Akka 
Akka是一个用Scala编写的库，可以用在有简化编写容错、高可伸缩性的Java和Scala的Actor模型，使用Akka能够实现微服务集群。

Vert.x/Lagom/ReactiveX/Spring 5 

这四种框架主要用于响应式微服务开发，响应式本身和微服务没有关系，更多用于提升性能上，但是可以和微服务相结合，也可以提升性能。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/framework/basic/microserv15-3.png')" alt="wxmp">



## .Net相关微服务框架

### .NET Core 
.NET Core是专门针对模块化微服务架构设计的，是跨平台应用程序开发框架，是微软开发的第一个官方版本。

### Service Fabric 
Service Fabric是微软开发的一个微服务框架，基于Service Fabric构建的很多云服务被用在了Azure上。

### Surging 
Surging是基于RPC协议的分布式微服务技术框架，基于.NET Core而来。
 
### Microdot Framework 
Microdot Framework用于编写定义服务逻辑代码，不需要解决开发分布式系统的挑战，能够很方便的进行MicrosoftOrleans集成。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/framework/basic/microserv15-4.png')" alt="wxmp">


## Node.js相关微服务框架 

Seneca 
Seneca是Node.js的微服务框架开发工具，可以用于编写可用于产品环境的代码。
 Hapi/Restify/LoopBack 
这三种框架的分工不同，前两种更适合开发简单的微服务后端系统，第三种更适合用在大型复杂应用开发，还可以用在现有微服务上的构建。



## Go相关微服务框架

 Go-Kit/Goa/Dubbogo 
Go-Kit是分布式开发的工具合集，适合用于大型业务场景下构建微服务；Goa是用Go语言构建的微服务框架；Dubbogo是和阿里巴巴开源的Dubbo能够兼容的Golang微服务框架。

## Python相关微服务框架

Python相关的微服务框架非常少，用的比较多的是Nameko。Nameko让实现微服务变得更简单，同时也提供了很丰富的功能，比如支持负载均衡、服务发现还支持依赖自动注入等，使用起来很方便，但是有限速、超时和权限机制不完善等缺点。

总结

微服务已经成为很多大型互联网公司的选择，对于架构师和想要成为架构师的工程师来说，掌握微服务不仅要学会使用相关框架来实现，还要掌握具体用法，在具体的实践中仍然要避开很多坑。



## 参考文章
*  https://www.bilibili.com/read/cv7424802/