---
title: 热门微服务框架概览
---

::: tip
本文主要是介绍 热门微服务框架概览 。
:::

[[toc]]
最受欢迎的微服务架构

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/framework/basic/microservinro-1.png')" alt="wxmp">

## Spring Boot

Java 构建 Spring 应用程序已经有很长一段时间了， Spring Boot 是 Spring 的一个特定版本， 它通过对配置细节的处理， 使微服务构建更加简便。创建 Spring Boot 旨在自启动任何类型的 Spring 项目，而不仅仅是微服务。应用程序完成后，Spring Boot 将在 web 服务器中混合，并输出一个 JAR 文件， JVM 除外。你可以将其视为原始 Docker 容器。这也是许多负责构建微服务的开发者都非常喜欢 Spring Boot 的原因。

使用 Spring 开发微服务遵循与 Web 应用相同的 MVC 理念。该框架享有多年 Java 开发中建立的所有深度连接，包括所有主要和次要数据存储、 LDAP 服务器和 Apache Kafka 等消息传递工具的集成。还有许多用于维护运行服务器集合的小特性，比如 Spring Vault ，这是一种用于维护生产环境中服务器所需的密码的工具。所有这些优点都说明了为什么 Java 程序员多年来一直喜欢 Spring Boot 的原因。



## Eclipse MicroProfile

2016 年，Java Enterprise 社区决定清理 Java Enterprise Edition 中的内容，以便人们可以使用经典部件构建简单的微服务。他们去除了大量的库， 但保留了处理 REST请求，解析 JSON 和管理依赖注入的功能代码，最终被称为 Eclipse MicroProfile ，其特性为快速而简单。

从那以后， MicroProfile 社区制定了一个协议， 每季度发布一个新版本， 同时添加新代码以保持微服务平稳安全地运行。任何 Java EE开发者都会非常熟悉开发过程和代码结构，而且还把配置麻烦给省去了。



## Dropwizard

当 Dropwizard 在 2011 年出现时， Dropwizard 框架为开发者提供了一个非常简单的模型，里面包含了许多重要的模块，你可以根据需求添加一些业务逻辑，或者配置其他内容，最后你会发现 JAR 文件非常小，并且能够快速启动。

Dropwizard 最大的限制可能是缺乏依赖注入。如果你希望使用依赖项注入来保持代码的整洁和松散耦合，则需要自己添加库，这点和 Spring 不同，但是现在Dropwizard 也支持大多数功能，包括日志记录、健康检查和提供弹性代码。



## Cricket

另外一个用于快速 API 开发框架的是 Cricket 。Cricket 很小，尽管它包括许多额外的功能， 如键值数据存储， 以避免连接数据库和调度程序来控制后台重复处理。没有添加复杂性或其他依赖项，因此很容易将代码添加到 Cricket 并启动独立的微服务。



## Jersey

开发 web 服务的标准方法之一是 RESTful web 服务的 Java API(又名 JAX-RS)，这是 Jersey 框架中实现的通用规范。这种方法主要依赖于使用注释来指定路径映射和返回细节。从参数解析到 JSON 打包的所有其他内容都由 Jersey 处理。

Jersey 的主要优点是它实现了 JAX-RS 标准，这个特性非常受欢迎， 一些开发人员习惯将 Jersey 与 Spring Boot 结合在一起使用。



## Play

体验 JVM 跨语言能力的最佳方式之一是使用 Play 框架，这是可以与 Java 或任何其他 JVM 语言兼容的。它的基础非常现代，具有异步、无状态的模型，不会让试图跟踪用户及其会话数据的线程使服务器过载。还有许多额外的特性可以用来充实网站，比如 OpenID 、验证和文件上传支持。

Play 代码库已经发展了十多年， 因此你还会发现类似于对 XML 的支持的这种古老的功能。play 既成熟又轻盈，这种组合还是比较有特色的。



## Swagger

构建一个 API 看起来就像编写一个监听端口的代码一样简单， 但是 Swagger 的开发人员不这么认为。他们已经创建了一个完整的 API 规范语言 OpenAPI ，你可以使用它来说明你的 API。这似乎是一个额外的步骤，但是 Swagger 团队还提供了将该规范转换为自动化测试、文档等的代码。

Swagger 配置文件中的 API 很简单，用于实现接口、记录接口的，并提供一组工具来测试构建在其下的代码，甚至还有一种 API 治理机制。

Swagger 是一个 api 生态系统，它不局限于 Java。如果你的团队迁移到 Node.js或其他几十种语言中的任何一种，都有一个 Swagger Codegen 模块将OpenAPI 规范转换成该语言的实现。



## Restlet

不同框架之间最大的区别之一是和其他服务或库的连接数量。Restlet 项目提供了更大的特性和连接集合，它已经与 JavaMail 之类的库集成，避免微服务需要对某些邮件服务器使用 POP、IMAP 或 SMTP ；为防构建大量文本索引和元数据，还集成了 Lucene 和 Solr 。

Restlet 中还有很多特性在持续开发。例如，你不需要使用 JSON，因为它可以直接处理 XML 、CSV、YAML 和其他一些文件格式，此外，它还允许用户从Chrome 浏览器测试 api 。



## apache dubbo

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/framework/basic/microservinro-2.png')" alt="wxmp">

Dubbo 是阿里巴巴公司开源的一个高性能优秀的服务框架，使得应用可通过高性能的 RPC 实现服务的输出和输入功能，可以和 Spring 框架无缝集成。

主要核心部件：

Remoting: 网络通信框架，实现了 sync-over-async 和 request-response 消息机制?RPC: 一个远程过程调用的抽象，支持负载均衡、容灾和集群功能?Registry: 服务目录框架用于服务的注册和服务事件发布和订阅



## motan

Motan 是一套高性能、易于使用的分布式远程服务调用(RPC)框架。

支持通过spring配置方式集成，无需额外编写代码即可为服务提供分布式调用能力。?支持集成consul、zookeeper等配置服务组件，提供集群环境的服务发现及治理能力。?支持动态自定义负载均衡、跨机房流量调整等高级服务调度能力。?基于高并发、高负载场景进行优化，保障生产环境下RPC服务高可用。



## grpc

gRPC 是一个高性能、开源和通用的 RPC 框架，面向移动和 HTTP/2 设计。目前提供 C、Java 和 Go 语言版本，分别是：grpc, grpc-java, grpc-go. 其中 C 版本支持 C, C++, Node.js, Python, Ruby, Objective-C, PHP 和 C# 支持.

开源中国组织翻译的《gRPC 官方文档中文版》：http://doc.oschina.net/grpc

gRPC 基于 HTTP/2 标准设计，带来诸如双向流、流控、头部压缩、单 TCP 连接上的多复用请求等特。这些特性使得其在移动设备上表现更好，更省电和节省空间占用。



## kubernates

kubernetes，简称K8s，是用8代替8个字符“ubernete”而成的缩写。是一个开源的，用于管理云平台中多个主机上的容器化的应用，Kubernetes的目标是让部署容器化的应用简单并且高效（powerful）,Kubernetes提供了应用部署，规划，更新，维护的一种机制。

传统的应用部署方式是通过插件或脚本来安装应用。这样做的缺点是应用的运行、配置、管理、所有生存周期将与当前操作系统绑定，这样做并不利于应用的升级更新/回滚等操作，当然也可以通过创建虚拟机的方式来实现某些功能，但是虚拟机非常重，并不利于可移植性。

新的方式是通过部署容器方式实现，每个容器之间互相隔离，每个容器有自己的文件系统 ，容器之间进程不会相互影响，能区分计算资源。相对于虚拟机，容器能快速部署，由于容器与底层设施、机器文件系统解耦的，所以它能在不同云、不同版本操作系统间进行迁移。

容器占用资源少、部署快，每个应用可以被打包成一个容器镜像，每个应用与容器间成一对一关系也使容器有更大优势，使用容器可以在build或release 的阶段，为应用创建容器镜像，因为每个应用不需要与其余的应用堆栈组合，也不依赖于生产环境基础结构，这使得从研发到测试、生产能提供一致环境。类似地，容器比虚拟机轻量、更“透明”，这更便于监控和管理。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/framework/basic/microservinro-3.png')" alt="wxmp">

## 参考文章
* https://my.oschina.net/u/2335629/blog/4667396