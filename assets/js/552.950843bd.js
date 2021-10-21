(window.webpackJsonp=window.webpackJsonp||[]).push([[552],{1068:function(t,a,e){"use strict";e.r(a);var s=e(53),r=Object(s.a)({},(function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[e("div",{staticClass:"custom-block tip"},[e("p",{staticClass:"custom-block-title"},[t._v("TIP")]),t._v(" "),e("p",[t._v("本文主要是介绍 常见NIO框架区别 。")])]),t._v(" "),e("p"),e("div",{staticClass:"table-of-contents"},[e("ul",[e("li",[e("a",{attrs:{href:"#基于java-nio框架区别对比"}},[t._v("基于Java NIO框架区别对比")]),e("ul",[e("li",[e("a",{attrs:{href:"#一-通信框架"}},[t._v("一.通信框架")])]),e("li",[e("a",{attrs:{href:"#二-它们的出身"}},[t._v("二.它们的出身")])]),e("li",[e("a",{attrs:{href:"#三-它们的设计理念"}},[t._v("三.它们的设计理念")])])])]),e("li",[e("a",{attrs:{href:"#四-netty为什么这么火"}},[t._v("四.Netty为什么这么火？")]),e("ul",[e("li",[e("a",{attrs:{href:"#netty的优点可以总结如下"}},[t._v("Netty的优点可以总结如下：")])]),e("li",[e("a",{attrs:{href:"#与mina相比有什么优势"}},[t._v("与Mina相比有什么优势：")])])])]),e("li",[e("a",{attrs:{href:"#参考文章"}},[t._v("参考文章")])])])]),e("p"),t._v(" "),e("h2",{attrs:{id:"基于java-nio框架区别对比"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#基于java-nio框架区别对比"}},[t._v("#")]),t._v(" 基于Java NIO框架区别对比")]),t._v(" "),e("h3",{attrs:{id:"一-通信框架"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#一-通信框架"}},[t._v("#")]),t._v(" 一.通信框架")]),t._v(" "),e("p",[t._v("流行基于Java NIO通信框架有Mina、Netty、Grizzly等。接下来说下它们之间的对比。")]),t._v(" "),e("h3",{attrs:{id:"二-它们的出身"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#二-它们的出身"}},[t._v("#")]),t._v(" 二.它们的出身")]),t._v(" "),e("ul",[e("li",[t._v("1、Mina出身于开源界的大牛Apache组织；")]),t._v(" "),e("li",[t._v("2、Netty出身于商业开源大亨Jboss；")]),t._v(" "),e("li",[t._v("3、Grizzly则出身于土鳖Sun公司。")])]),t._v(" "),e("h3",{attrs:{id:"三-它们的设计理念"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#三-它们的设计理念"}},[t._v("#")]),t._v(" 三.它们的设计理念")]),t._v(" "),e("h4",{attrs:{id:"_1、mina"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_1、mina"}},[t._v("#")]),t._v(" 1、Mina")]),t._v(" "),e("p",[t._v("Mina(Multipurpose Infrastructure for Network Applications) 是 Apache 组织一个较新的项目，它为开发高性能和高可用性的网络应用程序提供了非常便利的框架。当前发行的 Mina 版本2.04支持基于 Java NIO 技术的 TCP/UDP 应用程序开发、串口通讯程序，Mina 所支持的功能也在进一步的扩展中。\n目前，正在使用Mina的应用包括：Apache Directory Project、AsyncWeb、AMQP（Advanced Message Queuing Protocol）、RED5 Server（Macromedia  Flash Media RTMP）、ObjectRADIUS、 Openfire等等。")]),t._v(" "),e("h4",{attrs:{id:"_2、netty"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_2、netty"}},[t._v("#")]),t._v(" 2、Netty")]),t._v(" "),e("p",[t._v("Netty是一款异步的事件驱动的网络应用框架和工具，用于快速开发可维护的高性能、高扩展性协议服务器和客户端。也就是说，Netty是一个NIO客户端/服务器框架，支持快速、简单地开发网络应用，如协议服务器和客户端。它极大简化了网络编程，如TCP和UDP套接字服务器。")]),t._v(" "),e("h4",{attrs:{id:"_3、grizzly"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_3、grizzly"}},[t._v("#")]),t._v(" 3、Grizzly")]),t._v(" "),e("p",[t._v("Grizzly是一种应用程序框架，专门解决编写成千上万用户访问服务器时候产生的各种问题。使用JAVA NIO作为基础，并隐藏其编程的复杂性。容易使用的高性能的API。带来非阻塞socketd到协议处理层。利用高性能的缓冲和缓冲管理使用高性能的线程池。")]),t._v(" "),e("p",[t._v("从设计的理念上来看，Mina的设计理念是最为优雅的。当然，由于Netty的主导作者与Mina的主导作者是同一人，出自同一人之手的Netty在设计理念上与Mina基本上是一致的。而Grizzly在设计理念上就较差了点，几乎是JavaNIO的简单封装。")]),t._v(" "),e("h2",{attrs:{id:"四-netty为什么这么火"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#四-netty为什么这么火"}},[t._v("#")]),t._v(" 四.Netty为什么这么火？")]),t._v(" "),e("p",[t._v("Netty是目前最流行的由JBOSS提供的一个Java开源框架NIO框架，Netty提供异步的、事件驱动的网络应用程序框架和工具，用以快速开发高性能、高可靠性的网络服务器和客户端程序。")]),t._v(" "),e("p",[t._v("相比JDK原生NIO，Netty提供了相对十分简单易用的API，非常适合网络编程。Netty是完全基于NIO实现的，所以Netty是异步的。\n作为一个异步NIO框架，Netty的所有IO操作都是异步非阻塞的，通过Future-Listener机制，用户可以方便的主动获取或者通过通知机制获得IO操作结果。")]),t._v(" "),e("p",[t._v("Netty无疑是NIO的老大，它的健壮性、功能、性能、可定制性和可扩展性在同类框架都是首屈一指的。它已经得到成百上千的商业/商用项目验证，如Hadoop的RPC框架Avro、RocketMQ以及主流的分布式通信框架Dubbo等等。")]),t._v(" "),e("p",[t._v("为什么这么火，是有原因的。")]),t._v(" "),e("h3",{attrs:{id:"netty的优点可以总结如下"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#netty的优点可以总结如下"}},[t._v("#")]),t._v(" Netty的优点可以总结如下：")]),t._v(" "),e("ul",[e("li",[t._v("1、API使用简单，开发门槛低；")]),t._v(" "),e("li",[t._v("2、功能强大，预置了多种编解码功能，支持多种主流协议；")]),t._v(" "),e("li",[t._v("3、定制能力强，可以通过ChannelHandler对通信框架进行灵活地扩展；")]),t._v(" "),e("li",[t._v("4、性能高，通过与其他业界主流的NIO框架对比，Netty的综合性能最优；")]),t._v(" "),e("li",[t._v("5、成熟、稳定，Netty修复了已经发现的所有JDK NIO BUG，业务开发人员不需要再为NIO的BUG而烦恼；")]),t._v(" "),e("li",[t._v("6、社区活跃，版本迭代周期短，发现的BUG可以被及时修复，同时，更多的新功能会加入；")]),t._v(" "),e("li",[t._v("7、经历了大规模的商业应用考验，质量得到验证。在互联网、大数据、网络游戏、企业应用、电信软件等众多行业得到成功商用，证明了它已经完全能够满足不同行业的商业应用了。")])]),t._v(" "),e("h3",{attrs:{id:"与mina相比有什么优势"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#与mina相比有什么优势"}},[t._v("#")]),t._v(" 与Mina相比有什么优势：")]),t._v(" "),e("ul",[e("li",[t._v("1、都是Trustin Lee的作品，Netty更晚；")]),t._v(" "),e("li",[t._v("2、Mina将内核和一些特性的联系过于紧密，使得用户在不需要这些特性的时候无法脱离，相比下性能会有所下降，Netty解决了这个设计问题；")]),t._v(" "),e("li",[t._v("3、Netty的文档更清晰，很多Mina的特性在Netty里都有；")]),t._v(" "),e("li",[t._v("4、Netty更新周期更短，新版本的发布比较快；")]),t._v(" "),e("li",[t._v("5、它们的架构差别不大，Mina靠apache生存，而Netty靠jboss，和jboss的结合度非常高，Netty有对google protocal buf的支持，有更完整的ioc容器支持(spring,guice,jbossmc和osgi)；")]),t._v(" "),e("li",[t._v("6、Netty比Mina使用起来更简单，Netty里你可以自定义的处理upstream events或/和downstream events，可以使用decoder和encoder来解码和编码发送内容；")]),t._v(" "),e("li",[t._v('7、Netty和Mina在处理UDP时有一些不同，Netty将UDP无连接的特性暴露出来；而Mina对UDP进行了高级层次的抽象，可以把UDP当成"面向连接"的协议，而要Netty做到这一点比较困难。')]),t._v(" "),e("li",[t._v("8、从任务调度粒度上看，mina会将有IO任务的session写入队列中，当循环执行任务时，则会轮询所有的session，并依次把session中的所有任务取出来运行。这样粗粒度的调度是不公平调度，会导致某些请求的延迟很高。")])]),t._v(" "),e("p",[t._v("转载地址：http://url.cn/5APmE03")]),t._v(" "),e("p",[t._v("版权声明：本文为博主原创文章，遵循"),e("a",{attrs:{href:"https://creativecommons.org/licenses/by-sa/4.0/",target:"_blank",rel:"noopener noreferrer"}},[t._v(" CC 4.0 BY-SA "),e("OutboundLink")],1),t._v("版权协议，转载请附上原文出处链接和本声明。本文链接：https://blog.csdn.net/sdmxdzb/article/details/80414531")]),t._v(" "),e("h2",{attrs:{id:"参考文章"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#参考文章"}},[t._v("#")]),t._v(" 参考文章")]),t._v(" "),e("ul",[e("li",[t._v("https://www.pianshen.com/article/6997808433/")])])])}),[],!1,null,null,null);a.default=r.exports}}]);