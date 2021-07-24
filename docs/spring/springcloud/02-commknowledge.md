---
title: SpringCloud-图解重要知识点
---

::: tip
本文主要是介绍 SpringCloud-图解重要知识点 。
:::

[[toc]]

## 19张图带你梳理SpringCloud体系中的重要知识点！


## 1、什么是微服务

## 1.1、架构演进

架构的发展历程是从单体式架构，到分布式架构，到SOA架构，再到微服务架构。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/spring/springcloud/importknowledge/2M5d282N3VocEhhTlpNcmhNWWljaWN6Q3VoUHBtajhMTTBvc1hQaWFiNWo1bFJnWTNaV3hVOTlQZy82NDA.png')" alt="wxmp">

图1：架构演进

- 单体架构：未做任何拆分的Java Web程序

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/spring/springcloud/importknowledge/3UxbWFZcUw4b2VJMVlzUFZVeGliRE96bTJRaWNpYThRa1ZSY2hDc2ZnWE5uNUxRcnJqRGFNdnZNQS82NDA.png')" alt="wxmp">

图2：单体架构示意图

- 分布式架构:按照业务垂直划分，每个业务都是单体架构，通过API互相调用。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/spring/springcloud/importknowledge/3U0bndrRDlpYmpkZzlCV0drbzdhZUE3RWliNWswVTZ0dzE4eW9weEpGU2NUZEYyWVMwdEdRTExRLzY0MA.png')" alt="wxmp">

图3：分布式架构示意图

- SOA架构：SOA是一种面向服务的架构。其应用程序的不同组件通过网络上的通信协议向其它组件提供服务或消费服务，所以也是分布式架构的一种。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/spring/springcloud/importknowledge/2ozWHh1Vm9lcmliRE5id1pLRkdORzZHdUVHNkpqZ1ZFSzFIR3dpYnNIZ3liS2NaR2lhODNaTUdEdy82NDA.png')" alt="wxmp">

图4：SOA架构示意图

## 1.2、微服务架构

微服务架构在某种程度上是SOA架构的进一步的发展。汇总：[200期Java面试题阶段汇总](http://mp.weixin.qq.com/s?__biz=MzIyNDU2ODA4OQ%3D%3D&chksm=e80dbb08df7a321e7670b8c49e33a9ef03a94da3638eefc82581507c960179e5b955e2a9a568&idx=1&mid=2247486846&scene=21&sn=75bd4dcdbaad73191a1e4dbf691c118a#wechat_redirect)

微服务目前并没有比较官方的定义。微服务 Microservices 之父，马丁.福勒，对微服务大概的概述如下：

* 就目前而言，对于微服务业界并没有一个统一的、标准的定义（While there is no precise definition of this architectural style ) 。

* 但通常在其而言，微服务架构是一种架构模式或者说是一种架构风格，它提倡将单一应用程序划分成一组小的服务，每个服务运行独立的自己的进程中，服务之间互相协调、互相配合，为用户提供最终价值。

* 服务之间采用轻量级的通信机制互相沟通（通常是基于 HTTP 的 RESTful API ) 。每个服务都围绕着具体业务进行构建，并且能够被独立地部署到生产环境、类生产环境等。

* 另外，应尽量避免统一的、集中式的服务管理机制，对具体的一个服务而言，应根据业务上下文，选择合适的语言、工具对其进行构建，可以有一个非常轻量级的集中式管理来协调这些服务。可以使用不同的语言来编写服务，也可以使用不同的数据存储。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/spring/springcloud/importknowledge/zRJSGtITHk0SjlGWnFSM2hRN2VodVFyOXI5ckV5cnN3OWljbWV6NkM3WWZjbTdrMVFPT3lvTGcvNjQw.png')" alt="wxmp">

图5：微服务定义思维导图

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/spring/springcloud/importknowledge/zNnYWlhTE1FRDN5YzlLSWw0dHNhWXpvRkJKTGhYMEJvY3doaWNQOFpiQmxhT3pBREJvaEIyRmtnLzY0MA.png')" alt="wxmp">

图6：微服务架构示意图

## 1.3、微服务解决方案

目前最流行的两种微服务解决方案是SpringCloud和Dubbo。

# 2、SpringCloud概览

## 2.1、什么是SpringCloud

Spring Cloud 作为 Java 言的微服务框架，它依赖于 Spring Boot ，有快速开发、持续交付和容易部署等特点。Spring Cloud 的组件非常多，涉及微服务的方方面面，井在开源社区 Spring、Netflix Pivotal 两大公司的推动下越来越完善。

SpringCloud是一系列组件的有机集合。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/spring/springcloud/importknowledge/0ppYzJpY3NkRTVIalFIZzZZWnBQbzBjYUV5RnBZbVJTWHl4NUkxTlpEQ0ZtVjQ5UU9zaWNpYWFLMVEvNjQw.png')" alt="wxmp">

图7：SpringCloud技术体系

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/spring/springcloud/importknowledge/3pIbWVQUzFiQ2ZNeUJQYW9yN1NhTklpYmlhdTNyc213WDJuWWdpYm9IMGlhcEFxd1JiQ2ljdzg0NVlnLzY0MA.png')" alt="wxmp">

图8：SpringCloud技术体系思维导图

## 2.1、SpringCloud主要组件

### 2.1.1、Eureka

Netflix Eureka 是由 Netflix 开源的一款基于 REST 的服务发现组件，包括 Eureka Server 及 Eureka Client。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/spring/springcloud/importknowledge/1NlRThNWVpqQ1l1YTRMZWZZUGtGU3E1a01pYUFUQjVnNHF1TGliMGVsODZpYWN4UVROY3dtVE5aZy82NDA.png')" alt="wxmp">

在这里插入图片描述

### 2.1.2、Ribbon

Ribbon Netflix 公司开源的一个负载均衡的组件。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/spring/springcloud/importknowledge/0s4MklnMnFmNlpEb1h3RFVjb0tOUGliZUlFRnR1aWFpYzI2Q0VGVEF6SHpiUTFSNFREcDJrcUtPZy82NDA.png')" alt="wxmp">

在这里插入图片描述

### 2.1.3、Feign

Feign是是一个声明式的Web Service客户端。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/spring/springcloud/importknowledge/092a2ljUW15RWoydU5WQWJsT2liaWJlYkZldFRleHhIRGQwbDdwZHZrRWFDOW9LS3V6cHN3YzdmUS82NDA.png')" alt="wxmp">

在这里插入图片描述

### 2.1.4、Hystrix

Hystrix是Netstflix 公司开源的一个项目，它提供了熔断器功能，能够阻止分布式系统中出现联动故障。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/spring/springcloud/importknowledge/2FaTmRzaWNhQkFmY3RIeDJlaWJuVEVPS05MaWJRWXVaR3JqckhoOWNsT1BZZWljYjZJMlkwWjhIMVEvNjQw.png')" alt="wxmp">

在这里插入图片描述

### 2.1.5、Zuul

Zuul 是由 Netflix 孵化的一个致力于“网关 “解决方案的开源组件。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/spring/springcloud/importknowledge/1pjWTNpYXpya2RMbzNVaWFoZDVMc0tkSWMyZWtJWXhpYXVxZkY5dTVGYUxMOXVXaWMycmtKcXplMVEvNjQw.png')" alt="wxmp">

在这里插入图片描述

### 2.1.6、Gateway

Spring Cloud Gateway 是 Spring 官方基于 Spring 5.0、 Spring Boot 2.0 和 Project Reactor 等技术开发的网关， Spring Cloud Gateway 旨在为微服务架构提供简单、 有效且统一的 API 路由管理方式。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/spring/springcloud/importknowledge/zlQN091MGNoYWZmNmliZDBQeTR1aWM2ZVNkMllmTElWcGJJQ3RveHdpYTA1ZFdrWWliUlYySU1mbWcvNjQw.png')" alt="wxmp">

在这里插入图片描述

### 2.1.7、Config

Spring Cloud 中提供了分布式配置中 Spring Cloud Config ，为外部配置提供了客户端和服务器端的支持。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/spring/springcloud/importknowledge/3kxbTB5Yjh4MUV5c0ZZSjlUQUxkR3hjN0N1RlJaVXpiMnBXSFlkbFhJQzFpY3NTcG9uVENMa3cvNjQw.png')" alt="wxmp">

在这里插入图片描述

### 2.1.8、 Bus

使用 Spring Cloud Bus, 可以非常容易地搭建起消息总线。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/spring/springcloud/importknowledge/3RsbFNqdXNHZFFLSjZKMVVLY0xqdUx4eGliOW1pYlhpYllyRHNBZ3M0OVpiOW9KdlRBU0RlM0twUS82NDA.png')" alt="wxmp">

在这里插入图片描述

### 2.1.9、OAuth2

Sprin Cloud 构建的微服务系统中可以使用 Spring Cloud OAuth2 来保护微服务系统。汇总：[200期Java面试题阶段汇总](http://mp.weixin.qq.com/s?__biz=MzIyNDU2ODA4OQ%3D%3D&chksm=e80dbb08df7a321e7670b8c49e33a9ef03a94da3638eefc82581507c960179e5b955e2a9a568&idx=1&mid=2247486846&scene=21&sn=75bd4dcdbaad73191a1e4dbf691c118a#wechat_redirect)

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/spring/springcloud/importknowledge/3NQcmwxaWFjZjdReGNmb1lsTk12c0o5NTM0elJTODBFZm1oOXp3RTlncXhIUTRiS0xXWTBwYUEvNjQw.png')" alt="wxmp">

在这里插入图片描述

### 2.1.10、Sleuth

Spring Cloud Sleuth是Spring Cloud 个组件，它的主要功能是在分布式系统中提供服务链路追踪的解决方案。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/spring/springcloud/importknowledge/1NhT2RzM3E5ZE5IaWJiRmtpYWJXNmdEYUF3M3ZZTVQ5T3hTTmJKTmQ4MXZuZlUzckNDTHA3TXJBLzY0MA.png')" alt="wxmp">

在这里插入图片描述

# 3、总结

本文中对架构的演进及Spring Cloud 构建微服务的基本组件进行了概览。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/spring/springcloud/importknowledge/1RpY3JCcXdJd3c5UUp6MVk4amU5cDBpYTVFQUh5OEZVajY4OVNkQ1RsSWtuMlIwMWdNa28zZm53LzY0MA.png')" alt="wxmp">

在这里插入图片描述

------

博主水平有限，如有错漏，欢迎指出！

**参考：**

【1】：朱荣鑫、张天、黄迪璇编著《Spring Cloud微服务架构进阶》
【2】：翟永超著 《Spring Cloud 微服务实战》
【3】：许进等著《重新定义SpringCloud实战》
【4】: 方志朋著 《深入理解SpringCloud微服务构建》
【5】：SOA架构设计分析
【6】：【12张手绘图】我搞懂了微服务架构！
【7】：微服务架构深度解析与最佳实践

## 参考文章
* https://dalin.blog.csdn.net/article/details/110848741