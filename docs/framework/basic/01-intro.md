---
title: 框架基础知识介绍
---

::: tip
本文主要是介绍 开发框架概念等基础知识 。
:::

[[toc]]

## 开发框架-概念

## 前言

　　做为一个程序员，在开发的过程中会发现，有框架同无框架，做起事来是完全不同的概念，关系到开发的效率、程序的健壮、性能、团队协作、后续功能维护、扩展......等方方面面的事情。很多朋友在学习搭建自己的框架，很多公司也在创建或使用自己的框架，网上开源的框架多如牛毛，每年新上线的各种框架也不知多少。而不停的重复造轮子，也让更多的朋友鸟枪换炮，越跑越快，工作效率越来越高。那么什么是框架呢？

 

## 什么是框架

　　度娘上说：框架（Framework）是整个或部分系统的可重用设计，表现为一组抽象构件及构件实例间交互的方法; 另一种定义认为，框架是可被应用开发者定制的应用骨架。前者是从应用方面而后者是从目的方面给出的定义。


　　可以说，一个框架是一个可复用的设计构件，它规定了应用的体系结构，阐明了整个设计、协作构件之间的依赖关系、责任分配和控制流程，表现为一组抽象类以及其实例之间协作的方法，它为构件复用提供了上下文(Context)关系。因此构件库的大规模重用也需要框架。

　　应用框架指的是实现了某应用领域通用完备功能（除去特殊应用的部分）的底层服务。使用这种框架的编程人员可以在一个通用功能已经实现的基础上开始具体的系统开发。框架提供了所有应用期望的默认行为的类集合。具体的应用通过重写子类(该子类属于框架的默认行为)或组装对象来支持应用专用的行为。

　　应用框架强调的是软件的设计重用性和系统的可扩充性，以缩短大型应用软件系统的开发周期，提高开发质量。与传统的基于类库的面向对象重用技术比较，应用框架更注重于面向专业领域的软件重用。应用框架具有领域相关性，构件根据框架进行复合而生成可运行的系统。框架的粒度越大，其中包含的领域知识就更加完整。

## 框架的定义
　　**框架，即framework。其实就是某种应用的半成品，就是一组组件，供你选用完成你自己的系统。** 简单说就是使用别人搭好的舞台，你来做表演。而且，框架一般是成熟的，不断升级的软件。

　　上面是[度娘百科——框架](http://www.baidu.com/link?url=nUSLa82hqc3Uqk3Z1ByJfJGzLuALC2IGtCU-Hw5_9QBRrdLJMxNAffAilUbcccOPU3nphL1TxUkpVvxk3yeIj_)里讲的内容，讲得挺理论挺全面的，直接复制了一些过来。

 

　　简单来讲，软件开发框架可以理解为我们起楼房时，用梁+柱子+承重墙做起来的钢筋混凝土结构框架。而实现的软件功能，也就像在这个框架结构中所要实现的不同类型、功能的房子，比如停车场、商场、酒店、饭店、商住房......

　　功能强大，结构扎实的框架，可承载的类型就更多，适用性就更强。

　　不论是什么开发框架，都是为现实不同的业务功能而创建的。好的开发框架能提高企业的竞争能力，包括降低开发成本、提高产品质量、改善客户满意程度、控制开发进度等。同时，开发框架也是某一领域为实现某种业务的知识积累，它是一种持续性的活动，随着特定业务功能实现而创建，且跳出软件开发周期而存活。一个成熟的框架，不单单只是代码而已，它除了将某一领域业务的基础功能以代码的方式实现外，还必须编写对应的文档、模型、流程图、数据字典、开发使用说明.....等一系列的文档来支撑，这样的框架才更加成熟和健壮。

 

## 为什么要使用框架

　　软件系统随着业务的发展，变得越来越复杂，不同领域的业务所涉及到的知识、内容、问题非常非常多。如果每次都从头开发，那都是一个很漫长的事情，且并不一定能将它做好。团队协作开发时，没有了统一标准，大家各写各的，同样的重复的功能到处都是。由于没有统一调用规范，很难看懂别人写的代码，出现Bug或二次开发维护时，根本无从下手。（无框架不堪回首的黑暗日子请看前面章节的讲述）

　　而一个成熟的框架，它是模板化的代码，它会帮我们实现很多基础性的功能，我们只需要专心的实现所需要的业务逻辑就可以了。而很多底层功能操作，就可以完完全全不用做太多的考虑，框架已帮我们实现了。这样的话，整个团队的开发效率可想而知。另外对于团队成员的变动，也不用太过担心，框架的代码规范让我们能轻松的看懂其他开发人员所写的代码。

 

## 搭建框架时，我们要如何定位

　　是不是框架的扩展性、可移值性、功能越强大就越好呢？

　　好的框架是相对的，它都有自己特定的应用领域，合适才是最好。

　　个人觉得在实际开发中要根据具体情况来看的，因为功能越全面它的复杂度就越大，所需要的开发人员能力和技能就会要求更高，付出的成本也就最大。比如做一个还未发展起来的电商网就想 将系统做成像京东那样，直接用京东分模块分布式的框架来开发，那得怎么来组建这个团队？更不用说开发成本了。就算团队有能力做到，也没有那个必要这么去做，因为从成本预算和开发周期等方面来看，得不尝失，更多的可能项目还未完成公司就给拖垮了。

　 　一般来说，一个中小型项目，1到5人左右的开发团队，使用一般的三层结构就可以了，不用去细想框架要分三层还是五层，每个层之间要怎么实现解耦，要用什么设计模式.....因为当今飞速发展的互联网时代，快才是王道，做一个中小型项目能用一周完成的，绝不能拖了一个月还未做完。人工与时间成本才是重点中 的重点，唯有快才能更好的生存下来并壮大。至于扩展功能、接口、分布式、并发、大数据......等等问题，实际上过早考虑太多并不是好事情，有经验的程序员在写这个框架时早已留下扩展方案或思路，而没到这一层次的开发人员你想再多也可能想不明白，还不如先做出来积累一定经验后再慢慢学习，慢慢升级框架。

　　当然也不是说设计框架时不用考虑高内聚低耦合，而是要根据自己的能力与经验来设计出自己能把控的框架出来。因为框架不是开发出来后就不再变动，它也需要不停的进行升级，将你所学到的新知识新技术融合到框架中，使它的功能更加强大，更加健壮。而对于自己不能把控的框架，在团队协作开发和上生产环境后，你就发现有一大堆的坑等着你去填埋，这种框架只能拿来先练练手，有空再慢慢完善。

　　框架通过小步快跑，不断的迭代升级来慢慢扩展的，当项目上生产环境后，根据新的需求和所碰到的问题，去不停的调整，最终越来越强大。所有框架都是从1.0版本到2.0、3.0......发展而来，而不是直接跳过最初版本到最终成熟版本。

　 　所以说我们在创建一个框架时，必须根据我们当前个人的技术能力、团队成功技术水平、时间、投入成本、项目现状（规模与需求复杂程度）、以后的发展前景来决定所要开发的框架的最终设计方案。当然也不是说不能一步到位，心有多大世界就有多大，只要个人能力和团队能力配得上，老板资金成本雄厚，时间充足，直接上大项目使用超级框架也完全没有问题。

 

## 框架和设计模式
　　度娘上说：框架、设计模式这两个概念总容易被混淆，其实它们之间还是有区别的。构件通常是代码重用，而设计模式是设计重用，框架则介于两者之间，部分代码重用，部分设计重用，有时分析也可重用。在软件生产中有三种级别的重用：内部重用，即在同一应用中能公共使用的抽象块;代码重用，即将通用模块组合成库或工具集，以便 在多个应用和领域都能使用；应用框架的重用，即为专用领域提供通用的或现成的基础结构，以获得最高级别的重用性。

　　框架与设计模式虽然相似，但却有着根本的不同。设计模式是对在某种环境中反复出现的问题以及解决该问题的方案的描述，它比框架更抽象；框架可以用代码表示，也能直接执行或复用，而对模式而言只有实例才能用代码表示;设计模式是比框架更小的元素，一个框架中往往含有一个或多个设计模式，框架总是针对某一特定应 用领域，但同一模式却可适用于各种应用。可以说，框架是软件，而设计模式是软件的知识。

 

## 框架的主要特点和要求

### 1、代码模板化

　　框架一般都有统一的代码风格，同一分层的不同类代码，都是大同小异的模板化结构，方便使用模板工具统一生成，减少大量重复代码的编写。在学习时通常只要理解某一层有代表性的一个类，就等于了解了同一层的其他大部分类结构和功能，容易上手。团队中不同的人员采用类同的调用风格进行编码，很大程度提高了代码的可读性，方便维护与管理。

 

### 2、重用

　　开发框架一般层次清晰，不同开发人员开发时都会根据具体功能放到相同的位置，加上配合相应的开发文档，代码重用会非常高，想要调用什么功能直接进对应的位置去查找相关函数，而不是每个开发人员各自编写一套相同的方法。

### 3、高内聚（封装）

　　框架中的功能会实现高内聚，开发人员将各种需要的功能封装在不同的层中，给大家调用，而大家在调用时不需要清楚这些方法里面是如果实现的，只需要关注输出的结果是否是自己想要的就可以了。

### 4、规范

　　框架开发时，必须根据严格执行代码开发规范要求，做好命名、注释、架构分层、编码、文档编写等规范要求。因为你开发出来的框架并不一定只有你自己在用，要让别人更加容易理解与掌握，这些内容是非常重要的。

### 5、可扩展

 　开发框架时必须要考虑可扩展性，当业务逻辑更加复杂、数量记录量爆增、并发量增大时，能否通过一些小的调整就能适应？还是需要将整个框架推倒重新开发？当然对于中小型项目框架，也不必考虑太多这些内容，当个人能力和经验足够时水到渠成，自然就会注意到很多开发细节。

### 7、可维护

　　成熟的框架，对于二次开发或现有功能的维护来说，操作上应该都是非常方便的。比如项目要添加、修改或删除一个字段或相关功能，只需要简单的操作，十来分钟或不用花太多的工夫就可以搞定。新增一个数据表和对应的功能，也可以快速的完成。功能的变动修改，不会对系统产生不利的影响。代码不存在硬编码等等，保证软件开发的生产效率和质量。

### 8、协作开发

　　有了开发框架，我们才能组织大大小小的团队更好的进行协作开发，成熟的框架将大大减轻项目开发的难度，加快开发速度，降低开发费用，减轻维护难度。

### 9、通用性

　　同一行业或领域的框架，功能都是大同小异的，不用做太大的改动就可以应用到类似的项目中。在框架中，我们一般都会实现一些同质化的基础功能，比如权限管理、角色管理、菜单管理、日志管理、异常处理......或该行业中所要使用到的通用功能，使框架能应用到某一行业或领域中，而不是只针对某公司某业务而设定（当然也肯定存在那些特定功能的应用框架，这只是非常少的特殊情况，不在我们的考虑范围）。

 

## 参考文章
* https://blog.csdn.net/u011555996/article/details/