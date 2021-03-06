---
title: 微服务架构介绍
---

::: tip
本文主要是介绍 微服务架构定义相关信息 。
:::

[[toc]]

## 什么是微服务

在认识微服务之前，需要先了解一下与微服务对应的单体式（Monolithic）式架构。在Monolithic架构中，系统通常采用分层架构模式，按技术维度对系统进行划分，比如持久化层、业务逻辑层、表示层。 Monolithic架构主要存在以下问题：

* 1. 系统间通常以API的形式互相访问，耦合紧密导致难以维护；
* 2. 各业务领域需要采用相同的技术栈，难以快速应用新技术；
* 3. 对系统的任何修改都必须整个系统一起重新部署/升级，运维成本高；
* 4. 在系统负载增加时，难以进行水平扩展；
* 5. 当系统中一处出现问题，会影响整个系统；

为了解决这些问题，微服务架构应运而生。微服务，又叫微服务架构。

微服务架构是一种架构风格，它将一个复杂的应用拆分成多个独立自治的服务，服务与服务间通过松耦合的形式交互。

比如下面的示例，将一个系统的后端划分成Account/Inventory/Shipping三个微服务，每个微服务有自己的数据库存储，对外提供风格统一的REST API。


<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/architecture/microservanddistribute/intro-1.png')" alt="wxmp">



## 微服务的主要特点

### 单一职责

每个微服务都需要满足单一职责原则，微服务本身是内聚的，因此微服务通常比较小。比如示例中每个微服务按业务逻辑划分，每个微服务仅负责自己归属于自己业务领域的功能。

微服务的开发通常与DevOps结合在一起，比如根据亚马逊给出的经验，一个微服务应该可以由一个Two Pizza Team负责设计、开发、测试和运维。

### 自治

一个微服务就是一个独立的实体，它可以独立部署、升级，服务与服务之间通过REST等形式的标准接口进行通信，并且一个微服务实例可以被替换成另一种实现，而对其它的微服务不产生影响。

比如，我们可以对示例中的Account Service替换成一个具备相同接口不同实现方式的实例，在替换后将不会对其它服务产生影响。或者在我们修正了它的一个BUG时，可以通过灰度升级技术保证其它服务在升级期间仍然可以使用Account Service提供的服务。

## 为什么需要微服务

### 逻辑清晰

这个特点是由微服务的单一职责的要求所带来的。一个仅负责一项很明确业务的微服务，在逻辑上肯定比一个复杂的系统更容易让人理解。

逻辑清晰带来的是微服务的可维护性，在我们对一个微服务进行修改时，能够更容易分析到这个修改到底会产生什么影响，从而通过完备的测试保证修改质量。

### 简化部署

在一个单块系统中，只要修改了一行代码，就需要对整个系统进行重新的构建、测试，然后将整个系统进行部署。而微服务则可以对一个微服务进行部署。

这样带来的一个好处是，我们可以更频繁的去更改我们的软件，通过很低的集成成本，快速的发布新的功能。

### 可扩展

应对系统业务增长的方法通常采用横向（Scale out）或纵向（Scale up）的方向进行扩展。分布式系统中通常要采用Scale out的方式进行扩展。因为不同的功能会面对不同的负荷变化，因此采用微服务的系统相对单块系统具备更好的可扩展性。

### 灵活组合

在微服务架构中，可以通过组合已有的微服务以达到功能重用的目的。

比如在示例中，如果我们要新增一个Booking Service，在预订时可以直接重用Account Service和Inventory Service检查用户权限和库存情况。

### 技术异构

在一个大型系统中，不同的功能具有不同的特点，并且不同的团队可能具备不同的技术能力。因为微服务间松耦合，不同的微服务可以选择不同的技术栈进行开发。

同时，在应用新技术时，可以仅针对一个微服务进行快速改造，而不会影响系统中的其它微服务，有利于系统的演进。

比如在示例中，如果因为库存系统数据量变大，我们需要数据由当前的sqlite数据库修改为MySQL，可以仅修改Inventory Service，而不需要要求整个系统的数据库全部替换。

### 高可靠

微服务间独立部署，一个微服务的异常不会导致其它微服务同时异常。通过隔离、融断等技术可以避免极大的提升微服务的可靠性。

## 微服务的缺点

### 复杂度高

微服务间通过REST、RPC等形式交互，相对于Monolithic模式下的API形式，需要考虑被调用方故障、过载、消息丢失等各种异常情况，代码逻辑更加复杂。

对于微服务间的事务性操作，因为不同的微服务采用了不同的数据库，将无法利用数据库本身的事务机制保证一致性，需要引入二阶段提交等技术。

同时，在微服务间存在少部分共用功能但又无法提取成微服务时，各个微服务对于这部分功能通常需要重复开发，或至少要做代码复制，以避免微服务间的耦合，增加了开发成本。

### 运维复杂

在采用微服务架构时，系统由多个独立运行的微服务构成，需要一个设计良好的监控系统对各个微服务的运行状态进行监控。运维人员需要对系统有细致的了解才对够更好的运维系统。

### 影响性能

相对于Monolithic架构，微服务的间通过REST、RPC等形式进行交互，通信的时延会受到较大的影响。

## 总结

微服务在近几年大火，它具备了灵活部署、可扩展、技术异构等优点，但同时也带来了开发、运维的复杂性。是否要采用微服务架构需要根据系统的特点，结合企业的组织架构、团队能力等多个方面进行综合的判断，而不是为了微服务而微服务。

个人建议，在开发一个新的系统时，因为业务逻辑和系统边界还不是那么清晰，可以先采用Monolithic方式开发，直到能够识别出稳定逻辑后再进行微服务的拆分，从而避免因为边界不清而进行重划分所带来的返工。

## 【----------------------------】

## 微服务架构定义那点事
从微服务架构定义的历史可以看出，这些概念来源都是提出者对个人实际工作工面临问题的解决方案的总结，是那些技术专家对十多年前工作中遇到问题的解决方案，在他们提出后不断被发展，进而成了现在流行的微服务架构。

 相信很多朋友了解微服务架构都是从Martin Fowler的那篇文章开始。而实际上，Martin却并不是最早谈及微服务架构的，本篇文章就和你聊聊微服务架构定义的那点事。

### 最易懂的版本 
Martin Fowler的这篇文章《Microservices》通俗易懂的讲解了什么是微服务架构.


**微服务架构是一种架构模式**，它提倡将单一应用程序划分成一组小的服务，服务之间互相协调、互相配合，为用户提供最终价值。每个服务运行在其独立的进程中，服务与服务间采用轻量级的通信机制互相协作（通常是基于HTTP协议的RESTful API）。每个服务都围绕着具体业务进行构建，并且能够被独立的部署到生产环境、类生产环境等。


我在2015年4月QCon的《基于微服务架构，改造企业遗留系统的实践》演讲上，将这四个特性定义抽象为“小、独、轻、松”。最后一个字之所以定义成松，是为了读起来能朗朗上口。确切的讲，松所代表的含义其实是服务具备独立的流水线，能够被独立的构建，并且被独立的部署。实际上，Martin Fowler并不是最早提出微服务架构概念的人。

### 最早期的版本

最早提出微服务架构概念的，是Fred George。他一位非常传奇的人物，从业40多年，接触过70+编程语言，就职过IBM、TW等多家公司，并在社区和大会上做过很多分享。后来成立独立的咨询公司，为金融、电信、保险、航空等多个行业提供敏捷、持续交付、DevOps等转型服务，他也是最早实践XP、Scrum、和看板的人之一.


在2012年3月的Agile India上，Fred George分享了题为

“Micro (u)Services Architecture -small, short lived services rather than SOA.”

的演讲。在演讲中，他描述了从2005~2009年期间，他和所在的团队是如何将100万行的传统J2EE程序，通过解耦、自动化验证等实践，逐渐分解成20多个5K行代码的小服务，又分解成200多个500行代码的服务的过程，而其中，也大谈了基于Kafka的消息解耦服务间依赖。我认为，这是对微服务定义的最早版本了。

### 最简洁的版本
Adrain Cockcroft，Netflix的云架构师，主导了Netflix从2009到2016年服务化拆分、从数据中心迁移到云平台、以及组织、流程、工具等的演进等.


他对微服务的定义是:

Loosely coupled service oriented architecture with bounded contexts.

其中两个核心点Loosely coupled 和 Bounded context。Loosely coupled表明，服务之间是松耦合的。什么叫松耦合?就是指服务能够被独立更新。如果不能被独立更新，那证明服务就不是松耦合的。Bounded context，源于DDD(领域驱动设计)，表明对于服务而言，它的业务是独立的，我们不需要知道它的依赖者，根据接口就可以更新服务的代码。我认为，这是对微服务定义的最简洁版本了。

### 最与时俱进的版本
第三个版本，来自Neal Ford，他是TW的资深技术专家，《卓有成效的程序员》作者，也是TW技术雷达的发起者和维护者之一。


他对微服务架构的定义是

“Microservices are the first post DevOps revolution architecture.”

这是第一次将微服务和DevOps紧密关联起来的版本。

实际上，DevOps作为一场开发与运维手拉手，心连心的运动，正在席卷着整个社区。DevOps所涵盖的一系列文化、实践以及自动化的理念(CALMS)，是微服务演进过程中必不可少的先决条件。可以说，在传统的运维模式下，有效实现微服务架构几乎是不可能的，因为微服务的实施需要自动化基础设施、自动化部署、自动化验证、以及利用有效的工具完成运维、监控、告警等。而只有将DevOps与微服务紧密的结合起来，才能达到事半功倍的效果。

总结

如上就是我认为微服务演进过程中，最具有代表性的几个定义，当然，除了这3位大师，还有很多其他大师，譬如Sam Newman，James Lewis等发表的见解。

感兴趣的朋友可以继续挖掘一下，了解微服务架构演进过程中，大师们是如何看待微服务架构的。


## 参考文章
* https://zhuanlan.zhihu.com/p/46459720
* https://www.cnblogs.com/doit8791/p/9894040.html