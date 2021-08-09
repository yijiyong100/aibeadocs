---
title: 开发效率-精华总结
---

::: tip
本文主要是介绍 开发效率-精华总结 。
:::

[[toc]]

作为软件研发人员，我们是软件产品的直接缔造者，软件产品都要经我们之手来实现。所以，在软件研发行业，研发人员的生产效率直接影响到研发的时间、成本和质量。

在实际工作中，往往有些人的业务能力或者技术能力并不比别人高出很多，但他的开发效率却往往令人惊讶。所以，**我们应当像追求技术一样，追求效率**。

这里，我个人总结了关于软件开发效率的几点心得。

## 一、思维方式

思想决定高度，要提高生产效率，首先要用思想武装自己。

### 1.时刻准备变化

软件研发与其他行业有个很大的不同，就是软件产品的生产过程并不直观，在客户看来，开发到10%和开发到99%好像没有什么不同，建房子少有建好一半突然推倒重做的，但做软件却频繁需要重构、扩展、各种改造，容易出现大量变更（当然，变更需要增加工期和费用，这里不细说）。

所以在我们的思想里，开发软件就要时刻准备好变化，这个准备，不是准备好修改软件功能，而是从函数到文件到模块到采用的框架，任何粒度都可能变更，我们必须时刻准备应对变化，应对的核心就是**减少变更带来的影响，降低波动带来的风险和工作量**。

从技术的角度，可以采用的手段有分层、模块化、抽象化、可扩展、开发封闭、依赖倒转等，实质就是通过分层、分模块、抽象接口等方式，把软件分割成不同粒度，既能方便团队并行开发，又能灵活方便地进行修改、扩展或重构。

对细节感兴趣的话，可以去看google在github上的示范项目[android-architecture](https://link.jianshu.com?t=https://github.com/googlesamples/android-architecture/tree/todo-mvp-rxjava/)，MVP的分层、接口类的使用，甚至于对第三方框架的抽象依赖（连rxjava的线程类型都做了抽象）。

### 2.为失败而设计

软件研发是为了走通预先设计的业务逻辑，从而实现软件价值，但是很多开发者特别是新手开发者容易有一个误区，就是过度关注“正确”的环境和操作，自己开发时感觉什么都好，一到实际环境就崩，健壮性惨不忍睹。

**软件的运行环境是不可靠的，用户操作是不可靠的**，作为开发者，我们不能决定软件运行在哪里，是谁在运行，我们能决定的，只有软件本身。

所以，我们要在整个研发过程中考虑失败的情况，如果设备型号太老怎么办，如果网络连不上怎么办，如果磁盘没空间怎么办，如果用户没有点击“下一步”怎么办...一个负责任的开发者，要首先想到这些问题。同时，异常处理要遵循一定的原则，此前整理过一篇[Java异常捕获的设计原则](https://www.jianshu.com/p/1e0199e3c34e)

另外，我在开发时有个习惯，只要时间允许，就先从异常处理写起，把异常分支都梳理出来，异常情况都做好处理和提示，然后再写“正确”的业务逻辑，事实证明，前期的这点投入，越到后期就越会表现出巨大的优势，bug的数量和对开发的干扰都降低很多。

### 3.复用化、配置化和自动化

软件研发做熟了，就应该对复用化、配置化和自动化的巨大优势有所领教了，这三个的价值不仅仅在于节约时间，还在于降低质量风险、降低变更成本、规避人为修改/操作带来的潜在错误和不确定性，说到底，人会出错，但是程序不会出错，所以，**开发者是不可信的、被大量应用所证明过的代码才是可信的**。

换个角度说，我们在开发软件时，要有意识地去实现这三个特性，凡是两处及以上重复的代码/函数，就有必要抽出来做成接口/类库；凡是逻辑不变但是需要切换参数的，就有必要做成配置化；凡是能用脚本、代码去实现的逻辑，就有必要做成自动化任务。

不仅是开发、我们甚至可以在日常生活中应用这些思想，[看程序员是如何把自动化做到极致的](https://link.jianshu.com?t=http://blog.jobbole.com/100744/)

### 4.全局观

现在的软件体量越来越大，软件研发都是团队行为，分工越来越细，每个开发者只负责软件的一部分，这对于团队来说可以提高效率、节省时间和成本，但是对开发者个人来说，容易陷入自己那一小部分技术和业务，久而久之，就缺少了全局观。

对于软件来说，他的价值在作为整体运转起来时，才能体现。一叶障目的开发者，很容易卡在涉及软件整体逻辑的问题上进行不下去，或者做出过于复杂的逻辑，事倍功半。

个人建议，开发者一定不能丢弃全局观，平时多了解整个产品的业务和价值，知道整个软件的结构都有哪些部分，明白自己负责的模块在哪个位置，起什么作用。在做具体功能前，最好先想清楚整个逻辑，数据流向是什么样子，逻辑分支都有哪些，有没有限制条件制约，尽量在动手写代码前，先找到问题，多找同事或业务进行讨论，胸有成竹，才能事半功倍。

### 5.自我管理

作为软件研发人员，应该主动了解业务、积极提升技术，努力拓展视野，不过在这里，我们主要从生产效率的角度看看，怎么更好更快地完成开发任务。

首先要正确认识任务目标：我们前面说过，研发人员是软件的直接缔造者，所以我们自己要对开发任务有清楚的认识，目标产品在什么环境下运作，由谁操作，产生什么价值，有哪些风险，业务数据/流程从哪里来到哪里去...如果开发者自己都含糊不清，就很难产出合格的产品，更不用说生产效率。

然后要管理好工作计划和任务清单：不论是团队也好，单干也罢，研发工作都是有时间和进度要求的，一个明确的工作计划和任务清单，可以直观准确的反映自己的工作进度。

当前任务栈和工作记录：程序员喜欢讲“心流”，就是进入一种全身心投入编码，失去时间概念的工作状态，但是实际工作中，“心流”状态很容易会被各种事情打断，我们不能指望把所有人拒之门外，只能尽量把“心流”的进度保存下来。个人喜欢用一个记事本记录当前要实现的任务目标，在工作中每遇到一个问题，就罗列出来，解决之后，再做好标记，这个记事本只增不删，把记录分组标记上日期，就是最好的每日工作记录，既能保存思路，又有助于回头梳理不足。

## 二、技术储备、代码储备和团队储备

软件研发是需要长期积累的，储备越多，选择越多，能用于提升生产效率的手段也就越多。我把储备分为技术储备、代码储备和团队储备三类。

### 1.跟踪与分享新技术

软件研发是个生命力和创造力很旺盛的行业，我们做软件研发既要考虑成熟技术的稳健可靠，又要理解新技术的便利和突破，保持追踪新的技术风向，才能更好地平衡新技术与成熟技术的应用。

技术储备工作需要持续的投入和关注，单就Android开发来说，需要跟踪的框架就包括：网络访问框架、图片加载框架、缓存框架、Json解析框架、事件总线、ORM框架、自定义控件、自定义动画、数据统计、异常搜集、推送、安全加固；另外编程思想或工具有MVC/MVP、RxJava链式编码、注解式框架等。

当然技术储备要有选择的使用，在工程领域，不是最新的好，也不是成熟的好，视具体需要，合适的才最好。

### 2.建立共享代码库

每次研发完成之后，我们的收获其实不止有软件产品，也不止是获得的经验，我们在开发过程中，一定会抽象出一些工具类、甚至框架，这些代码可以在团队内部共享，既提高开发速度、避免二次开发，又能在广泛的使用中暴露缺陷、迅速提高质量。

相对于每个项目自己的工具类，共享代码库虽然能提高开发效率，但是也放大了风险，一旦出现问题，会波及整个产品线上的多个产品，必须严格控制质量和性能，强调其扩展性和兼容性，建立持续改进机制。

至于代码托管的问题，我此前分享过如何[在AS+svn环境下建立和维护团队通用库](https://www.jianshu.com/p/b2c3192c2c1d)，可以聊做参考。

### 3.建立团队规范

在团队开发中，我们要做的储备工作主要是规范性，建立和遵循良好的代码规范，既可以保证团队成员之间的代码可读性，又能在代码合并、工作移交等细节上节省大量时间。

## 三、辅助工具 

每个程序员都有自己惯用的快捷键，也有自己偏好的一些辅助工具，这些能大大提升我们的开发效率。

个人此前整理过一部分辅助工具或配置项，包括：

[Android工程常用配置](https://www.jianshu.com/p/7f03858d1e09)

[Gradle多渠道打包的原理、实践与辅助开发](https://www.jianshu.com/p/4e4d5b5747e5)

[自定义Android Studio代码模板](https://www.jianshu.com/p/7ba79529d365)

[解决Android内存泄漏—轻松降低100M](https://www.jianshu.com/p/034c582403a5)

后续还将增加一些插件类工具的使用介绍。

## 四、定期总结

很多程序员只喜欢写代码，不喜欢写文字，这其实是一种浪费。

从技术角度上，定期总结能方便自己日后回顾，我自己就经常查阅自己以前的总结，当做技术字典来用，一些没有及时记录下来的思路或技术，就很遗憾地丢失或忘记了。

从交流的角度，定期总结能锻炼我们的表达能力，如果我们的总结有问题，会有大神出来评论反馈，帮助我们认识到误区。

另外，定期总结，即是鼓励也是鞭策，能让我们直观认识到自己近期的成长和进度，敦促我们跟上时代，这样，赚钱吃饭也有底气...



作者：蓝灰_q
链接：https://www.jianshu.com/p/86a53e471ea5
来源：简书
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

## 参考文章
* https://www.jianshu.com/p/86a53e471ea5