(window.webpackJsonp=window.webpackJsonp||[]).push([[609],{1125:function(t,e,r){"use strict";r.r(e);var a=r(53),n=Object(a.a)({},(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[r("div",{staticClass:"custom-block tip"},[r("p",{staticClass:"custom-block-title"},[t._v("TIP")]),t._v(" "),r("p",[t._v("本文主要是介绍 并发编程-JUC包介绍 。")])]),t._v(" "),r("p"),r("div",{staticClass:"table-of-contents"},[r("ul",[r("li",[r("a",{attrs:{href:"#j-u-c包简介"}},[t._v("J.U.C包简介")]),r("ul",[r("li",[r("a",{attrs:{href:"#juc-locks-锁框架"}},[t._v("juc-locks 锁框架")])]),r("li",[r("a",{attrs:{href:"#juc-atomic-原子类框架"}},[t._v("juc-atomic 原子类框架")])]),r("li",[r("a",{attrs:{href:"#juc-sync-同步器框架"}},[t._v("juc-sync 同步器框架")])]),r("li",[r("a",{attrs:{href:"#juc-collections-集合框架"}},[t._v("juc-collections 集合框架")])]),r("li",[r("a",{attrs:{href:"#juc-executors-执行器框架"}},[t._v("juc-executors 执行器框架")])])])]),r("li",[r("a",{attrs:{href:"#参考文章"}},[t._v("参考文章")])])])]),r("p"),t._v(" "),r("h1",{attrs:{id:"导读【重要】"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#导读【重要】"}},[t._v("#")]),t._v(" 导读【重要】")]),t._v(" "),r("p",[t._v("进入Java多线程进阶篇的学习。初学者通过基础篇的学习，应该已经对多线程的初步使用有了基本概念和掌握。多线程这块知识的学习，真正的难点不在于多线程程序的逻辑有多复杂，而在于理清J.U.C包中各个多线程工具类之间的关系、特点及其使用场景（从整体到局部、高屋建瓴，这对学习任何知识都至关重要，如果读者能坚持阅读到本系列的Executors框架，你会明白我为什么强调全局视野的重要性）。")]),t._v(" "),r("p",[t._v("坦白的说，我还没有遇到过程序逻辑复杂到看不懂的生产级别的代码，所以要真正掌握Java多线程，必须要弄懂J.U.C，并不是说必须是源码级别的，深入源码确实能够让你掌握底层原理，但死扣细节往往造成“当局者迷”。")]),t._v(" "),r("p",[t._v("关于JUC的内容，内容非常的繁杂，且体系较多，这里由于篇幅有限，只是对个人认为JUC中重点内容进行摘选和记录。\n详细的一些更为深入的JUC介绍，可以参见：参见：【并发编程-JUC博客推荐】 章节")]),t._v(" "),r("h2",{attrs:{id:"j-u-c包简介"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#j-u-c包简介"}},[t._v("#")]),t._v(" J.U.C包简介")]),t._v(" "),r("p",[t._v("J.U.C并发包，即"),r("code",[t._v("java.util.concurrent")]),t._v("包，是JDK的核心工具包，是JDK1.5之后，由 Doug Lea实现并引入。")]),t._v(" "),r("p",[t._v("整个"),r("code",[t._v("java.util.concurrent")]),t._v("包，按照功能可以大致划分如下：")]),t._v(" "),r("ul",[r("li",[t._v("juc-locks 锁框架")]),t._v(" "),r("li",[t._v("juc-atomic 原子类框架")]),t._v(" "),r("li",[t._v("juc-sync 同步器框架")]),t._v(" "),r("li",[t._v("juc-collections 集合框架")]),t._v(" "),r("li",[t._v("juc-executors 执行器框架")])]),t._v(" "),r("p",[t._v("本系列将按上述顺序分析J.U.C，分析所基于的源码为Oracle JDK1.8.0_111。")]),t._v(" "),r("p",[t._v("主要参考书籍：")]),t._v(" "),r("ul",[r("li",[r("a",{attrs:{href:"https://book.douban.com/subject/1888733/",target:"_blank",rel:"noopener noreferrer"}},[t._v("《Java Concurrency in Practice》 Brian Goetz等"),r("OutboundLink")],1)]),t._v(" "),r("li",[r("a",{attrs:{href:"https://book.douban.com/subject/27116724/",target:"_blank",rel:"noopener noreferrer"}},[t._v("《JAVA多线程设计模式》 结城 浩"),r("OutboundLink")],1)])]),t._v(" "),r("p",[t._v("Java多线程基础系列主要是考虑没有接触过多线程的初学者，该系列完全参考自结城浩的《Java多线程设计模式》，感兴趣的读者可以先阅读该书后再来看进阶部分的文章。")]),t._v(" "),r("img",{staticClass:"zoom-custom-imgs",attrs:{src:t.$withBase("/assets/img/java/juc/juccat-1.png"),alt:"wxmp"}}),t._v(" "),r("hr"),t._v(" "),r("h3",{attrs:{id:"juc-locks-锁框架"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#juc-locks-锁框架"}},[t._v("#")]),t._v(" juc-locks 锁框架")]),t._v(" "),r("p",[t._v("早期的JDK版本中，仅仅提供了synchronizd、wait、notify等等比较底层的多线程同步工具，开发人员如果需要开发复杂的多线程应用，通常需要基于JDK提供的这些基础工具进行封装，开发自己的工具类。JDK1.5+后，Doug Lea根据一系列常见的多线程设计模式，设计了JUC并发包，其中"),r("code",[t._v("java.util.concurrent.locks")]),t._v("包下提供了一系列基础的锁工具，用以对synchronizd、wait、notify等进行补充、增强。")]),t._v(" "),r("p",[r("code",[t._v("java.util.concurrent.locks")]),t._v("包的结构如下：")]),t._v(" "),r("img",{staticClass:"zoom-custom-imgs",attrs:{src:t.$withBase("/assets/img/java/juc/juccat-2.png"),alt:"wxmp"}}),t._v(" "),r("p",[t._v("包内接口和类的简单UML图如下：\n"),r("img",{staticClass:"zoom-custom-imgs",attrs:{src:t.$withBase("/assets/img/java/juc/juccat-3.png"),alt:"wxmp"}})]),t._v(" "),r("p",[r("strong",[t._v("本部分包含以下文章：")])]),t._v(" "),r("ul",[r("li",[r("a",{attrs:{href:"https://segmentfault.com/a/1190000015562196",target:"_blank",rel:"noopener noreferrer"}},[t._v("J.U.C之locks框架（1）：接口说明"),r("OutboundLink")],1)]),t._v(" "),r("li",[r("a",{attrs:{href:"https://segmentfault.com/a/1190000015562293",target:"_blank",rel:"noopener noreferrer"}},[t._v("J.U.C之locks框架（2）：ReentrantLock 的使用"),r("OutboundLink")],1)]),t._v(" "),r("li",[r("a",{attrs:{href:"https://segmentfault.com/a/1190000015562389",target:"_blank",rel:"noopener noreferrer"}},[t._v("J.U.C之locks框架（3）：ReentrantReadWriteLock 的使用"),r("OutboundLink")],1)]),t._v(" "),r("li",[r("a",{attrs:{href:"https://segmentfault.com/a/1190000015562456",target:"_blank",rel:"noopener noreferrer"}},[t._v("J.U.C之locks框架（4）：LockSupport 工具类"),r("OutboundLink")],1)]),t._v(" "),r("li",[r("a",{attrs:{href:"https://segmentfault.com/a/1190000015562787",target:"_blank",rel:"noopener noreferrer"}},[t._v("J.U.C之locks框架（5）：AbstractQueuedSynchronizer 综述"),r("OutboundLink")],1)]),t._v(" "),r("li",[r("a",{attrs:{href:"https://segmentfault.com/a/1190000015804888",target:"_blank",rel:"noopener noreferrer"}},[t._v("J.U.C之locks框架（6）：AbstractQueuedSynchronizer 的独占功能原理"),r("OutboundLink")],1)]),t._v(" "),r("li",[r("a",{attrs:{href:"https://segmentfault.com/a/1190000015807209",target:"_blank",rel:"noopener noreferrer"}},[t._v("J.U.C之locks框架（7）：Condition 原理"),r("OutboundLink")],1)]),t._v(" "),r("li",[r("a",{attrs:{href:"https://segmentfault.com/a/1190000015807573",target:"_blank",rel:"noopener noreferrer"}},[t._v("J.U.C之locks框架（8）：AbstractQueuedSynchronizer 的共享功能原理"),r("OutboundLink")],1)]),t._v(" "),r("li",[r("a",{attrs:{href:"https://segmentfault.com/a/1190000015807600",target:"_blank",rel:"noopener noreferrer"}},[t._v("J.U.C之locks框架（9）：ReentrantReadWriteLock 原理"),r("OutboundLink")],1)]),t._v(" "),r("li",[r("a",{attrs:{href:"https://segmentfault.com/a/1190000015808032",target:"_blank",rel:"noopener noreferrer"}},[t._v("J.U.C之locks框架（10）：更强的读写锁——StampedLock"),r("OutboundLink")],1)])]),t._v(" "),r("hr"),t._v(" "),r("h3",{attrs:{id:"juc-atomic-原子类框架"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#juc-atomic-原子类框架"}},[t._v("#")]),t._v(" juc-atomic 原子类框架")]),t._v(" "),r("p",[t._v("早期的JDK版本中，如果要并发的对Integer、Long、Double之类的Java原始类型或引用类型进行操作，一般都需要通过锁来控制并发，以防数据不一致。")]),t._v(" "),r("p",[t._v("从JDK1.5开始，引入了"),r("code",[t._v("java.util.concurrent.atomic")]),t._v("工具包，该包提供了许多Java原始/引用类型的映射类，如"),r("code",[t._v("AtomicInteger")]),t._v("、"),r("code",[t._v("AtomicLong")]),t._v("、"),r("code",[t._v("AtomicBoolean")]),t._v("，这些类可以通过一种“无锁算法”，线程安全的操作Integer、Long、Boolean等原始类型。")]),t._v(" "),r("p",[t._v("所谓“无锁算法”，我们在讲juc-locks锁框架系列中，已经接触过太多次了，其实底层就是通过Unsafe类实现的一种比较并交换的算法，大致的结构如下（具体入参，根据上下文有所不同）：\n"),r("code",[t._v("boolean compareAndSet(expectedValue, updateValue);")]),t._v("\n当希望修改的值与expectedValue相同时，则尝试将值更新为updateValue，更新成功返回true，否则返回false。")]),t._v(" "),r("p",[r("code",[t._v("java.util.concurrent.atomic")]),t._v("包结构如下：\n"),r("img",{staticClass:"zoom-custom-imgs",attrs:{src:t.$withBase("/assets/img/java/juc/juccat-4.png"),alt:"wxmp"}})]),t._v(" "),r("p",[t._v("包内类的简单UML图如下：\n"),r("img",{staticClass:"zoom-custom-imgs",attrs:{src:t.$withBase("/assets/img/java/juc/juccat-5.png"),alt:"wxmp"}})]),t._v(" "),r("p",[r("strong",[t._v("本部分包含以下文章：")])]),t._v(" "),r("ul",[r("li",[r("a",{attrs:{href:"https://segmentfault.com/a/1190000015815012",target:"_blank",rel:"noopener noreferrer"}},[t._v("J.U.C之atomic框架（1）：Unsafe类"),r("OutboundLink")],1)]),t._v(" "),r("li",[r("a",{attrs:{href:"https://segmentfault.com/a/1190000015825207",target:"_blank",rel:"noopener noreferrer"}},[t._v("J.U.C之atomic框架（2）：AtomicInteger"),r("OutboundLink")],1)]),t._v(" "),r("li",[r("a",{attrs:{href:"https://segmentfault.com/a/1190000015831791",target:"_blank",rel:"noopener noreferrer"}},[t._v("J.U.C之atomic框架（3）：AtomicReference"),r("OutboundLink")],1)]),t._v(" "),r("li",[r("a",{attrs:{href:"https://segmentfault.com/a/1190000015843953",target:"_blank",rel:"noopener noreferrer"}},[t._v("J.U.C之atomic框架（4）：Atomic数组"),r("OutboundLink")],1)]),t._v(" "),r("li",[r("a",{attrs:{href:"https://segmentfault.com/a/1190000015864724",target:"_blank",rel:"noopener noreferrer"}},[t._v("J.U.C之atomic框架（5）：AtomicXXXFieldUpdater"),r("OutboundLink")],1)]),t._v(" "),r("li",[r("a",{attrs:{href:"https://segmentfault.com/a/1190000015865714",target:"_blank",rel:"noopener noreferrer"}},[t._v("J.U.C之atomic框架（6）：更强的原子类——LongAdder"),r("OutboundLink")],1)])]),t._v(" "),r("hr"),t._v(" "),r("h3",{attrs:{id:"juc-sync-同步器框架"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#juc-sync-同步器框架"}},[t._v("#")]),t._v(" juc-sync 同步器框架")]),t._v(" "),r("p",[t._v("这里的juc-sync同步器框架，是指"),r("code",[t._v("java.util.concurrent")]),t._v("包下一些辅助同步器类，每个类都有自己适合的使用场景：")]),t._v(" "),r("table",[r("thead",[r("tr",[r("th",[t._v("同步器名称")]),t._v(" "),r("th",[t._v("作用")])])]),t._v(" "),r("tbody",[r("tr",[r("td",[t._v("CountDownLatch")]),t._v(" "),r("td",[t._v("倒数计数器，构造时设定计数值，当计数值归零后，所有阻塞线程恢复执行；其内部实现了AQS框架")])]),t._v(" "),r("tr",[r("td",[t._v("CyclicBarrier")]),t._v(" "),r("td",[t._v("循环栅栏，构造时设定等待线程数，当所有线程都到达栅栏后，栅栏放行；其内部通过ReentrantLock和Condition实现同步")])]),t._v(" "),r("tr",[r("td",[t._v("Semaphore")]),t._v(" "),r("td",[t._v("信号量，类似于“令牌”，用于控制共享资源的访问数量；其内部实现了AQS框架")])]),t._v(" "),r("tr",[r("td",[t._v("Exchanger")]),t._v(" "),r("td",[t._v("交换器，类似于双向栅栏，用于线程之间的配对和数据交换；其内部根据并发情况有“单槽交换”和“多槽交换”之分")])]),t._v(" "),r("tr",[r("td",[t._v("Phaser")]),t._v(" "),r("td",[t._v("多阶段栅栏，相当于CyclicBarrier的升级版，可用于分阶段任务的并发控制执行；其内部比较复杂，支持树形结构，以减少并发带来的竞争")])])])]),t._v(" "),r("p",[r("strong",[t._v("本部分包含以下文章：")])]),t._v(" "),r("ul",[r("li",[r("a",{attrs:{href:"https://segmentfault.com/a/1190000015886497",target:"_blank",rel:"noopener noreferrer"}},[t._v("J.U.C之synchronizer框架（1）：倒数计数器——CountDownLatch"),r("OutboundLink")],1)]),t._v(" "),r("li",[r("a",{attrs:{href:"https://segmentfault.com/a/1190000015888316",target:"_blank",rel:"noopener noreferrer"}},[t._v("J.U.C之synchronizer框架（2）：循环栅栏——CyclicBarrier"),r("OutboundLink")],1)]),t._v(" "),r("li",[r("a",{attrs:{href:"https://segmentfault.com/a/1190000015918459",target:"_blank",rel:"noopener noreferrer"}},[t._v("J.U.C之synchronizer框架（3）：信号量——Semaphore"),r("OutboundLink")],1)]),t._v(" "),r("li",[r("a",{attrs:{href:"https://segmentfault.com/a/1190000015963932",target:"_blank",rel:"noopener noreferrer"}},[t._v("J.U.C之synchronizer框架（4）：数据交换器——Exchanger"),r("OutboundLink")],1)]),t._v(" "),r("li",[r("a",{attrs:{href:"https://segmentfault.com/a/1190000015979879",target:"_blank",rel:"noopener noreferrer"}},[t._v("J.U.C之synchronizer框架（5）：多阶段栅栏——Phaser"),r("OutboundLink")],1)])]),t._v(" "),r("hr"),t._v(" "),r("h3",{attrs:{id:"juc-collections-集合框架"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#juc-collections-集合框架"}},[t._v("#")]),t._v(" juc-collections 集合框架")]),t._v(" "),r("p",[t._v("这里的juc-collections集合框架，是指"),r("code",[t._v("java.util.concurrent")]),t._v("包下的一些同步集合类，按类型划分可以分为："),r("strong",[t._v("符号表")]),t._v("、"),r("strong",[t._v("队列")]),t._v("、"),r("strong",[t._v("Set集合")]),t._v("、"),r("strong",[t._v("列表")]),t._v("四大类，每个类都有自己适合的使用场景，整个juc-collections集合框架的结构如下图：")]),t._v(" "),r("img",{staticClass:"zoom-custom-imgs",attrs:{src:t.$withBase("/assets/img/java/juc/juccat-6.png"),alt:"wxmp"}}),t._v(" "),r("p",[t._v("其中阻塞队列的分类及特性如下表：")]),t._v(" "),r("table",[r("thead",[r("tr",[r("th",[t._v("队列特性")]),t._v(" "),r("th",[t._v("有界队列")]),t._v(" "),r("th",[t._v("近似无界队列")]),t._v(" "),r("th",[t._v("无界队列")]),t._v(" "),r("th",[t._v("特殊队列")])])]),t._v(" "),r("tbody",[r("tr",[r("td",[t._v("有锁算法")]),t._v(" "),r("td",[t._v("ArrayBlockingQueue")]),t._v(" "),r("td",[t._v("LinkedBlockingQueue、LinkedBlockingDeque")]),t._v(" "),r("td",[t._v("/")]),t._v(" "),r("td",[t._v("PriorityBlockingQueue、DelayQueue")])]),t._v(" "),r("tr",[r("td",[t._v("无锁算法")]),t._v(" "),r("td",[t._v("/")]),t._v(" "),r("td",[t._v("/")]),t._v(" "),r("td",[t._v("LinkedTransferQueue")]),t._v(" "),r("td",[t._v("SynchronousQueue")])])])]),t._v(" "),r("p",[r("strong",[t._v("本部分包含以下文章：")])]),t._v(" "),r("ul",[r("li",[r("a",{attrs:{href:"https://segmentfault.com/a/1190000016096542",target:"_blank",rel:"noopener noreferrer"}},[t._v("J.U.C之collections框架（1）：ConcurrentHashMap的基本原理"),r("OutboundLink")],1)]),t._v(" "),r("li",[r("a",{attrs:{href:"https://segmentfault.com/a/1190000016124883",target:"_blank",rel:"noopener noreferrer"}},[t._v("J.U.C之collections框架（2）：ConcurrentHashMap的扩容"),r("OutboundLink")],1)]),t._v(" "),r("li",[r("a",{attrs:{href:"https://segmentfault.com/a/1190000016168566",target:"_blank",rel:"noopener noreferrer"}},[t._v("J.U.C之collections框架（3）：跳表——ConcurrentSkipListMap"),r("OutboundLink")],1)]),t._v(" "),r("li",[r("a",{attrs:{href:"https://segmentfault.com/a/1190000016214450",target:"_blank",rel:"noopener noreferrer"}},[t._v("J.U.C之collections框架（4）：ConcurrentSkipListSet"),r("OutboundLink")],1)]),t._v(" "),r("li",[r("a",{attrs:{href:"https://segmentfault.com/a/1190000016214572",target:"_blank",rel:"noopener noreferrer"}},[t._v("J.U.C之collections框架（5）：“写时复制”的应用——CopyOnWriteArrayList"),r("OutboundLink")],1)]),t._v(" "),r("li",[r("a",{attrs:{href:"https://segmentfault.com/a/1190000016214610",target:"_blank",rel:"noopener noreferrer"}},[t._v("J.U.C之collections框架（6）：CopyOnWriteArraySet"),r("OutboundLink")],1)]),t._v(" "),r("li",[r("a",{attrs:{href:"https://segmentfault.com/a/1190000016248143",target:"_blank",rel:"noopener noreferrer"}},[t._v("J.U.C之collections框架（7）：无锁队列——ConcurrentLinkedQueue"),r("OutboundLink")],1)]),t._v(" "),r("li",[r("a",{attrs:{href:"https://segmentfault.com/a/1190000016284649",target:"_blank",rel:"noopener noreferrer"}},[t._v("J.U.C之collections框架（8）：无锁双端队列——ConcurrentLinkedDeque"),r("OutboundLink")],1)]),t._v(" "),r("li",[r("a",{attrs:{href:"https://segmentfault.com/a/1190000016296278",target:"_blank",rel:"noopener noreferrer"}},[t._v("J.U.C之collections框架（9）：阻塞队列简介——BlockingQueue"),r("OutboundLink")],1)]),t._v(" "),r("li",[r("a",{attrs:{href:"https://segmentfault.com/a/1190000016311925",target:"_blank",rel:"noopener noreferrer"}},[t._v("J.U.C之collections框架（10）：基于数组的阻塞队列——ArrayBlockingQueue"),r("OutboundLink")],1)]),t._v(" "),r("li",[r("a",{attrs:{href:"https://segmentfault.com/a/1190000016315487",target:"_blank",rel:"noopener noreferrer"}},[t._v("J.U.C之collections框架（11）：基于单链表的阻塞队列——LinkedBlockingQueue"),r("OutboundLink")],1)]),t._v(" "),r("li",[r("a",{attrs:{href:"https://segmentfault.com/a/1190000016353839",target:"_blank",rel:"noopener noreferrer"}},[t._v("J.U.C之collections框架（12）：基于堆的优先级阻塞队列——PriorityBlockingQueue"),r("OutboundLink")],1)]),t._v(" "),r("li",[r("a",{attrs:{href:"https://segmentfault.com/a/1190000016359551",target:"_blank",rel:"noopener noreferrer"}},[t._v("J.U.C之collections框架（13）：特殊的同步队列——SynchronousQueue"),r("OutboundLink")],1)]),t._v(" "),r("li",[r("a",{attrs:{href:"https://segmentfault.com/a/1190000016388106",target:"_blank",rel:"noopener noreferrer"}},[t._v("J.U.C之collections框架（14）：延时阻塞队列——DelayQueue"),r("OutboundLink")],1)]),t._v(" "),r("li",[r("a",{attrs:{href:"https://segmentfault.com/a/1190000016398508",target:"_blank",rel:"noopener noreferrer"}},[t._v("J.U.C之collections框架（15）：基于双链表的阻塞双端队列——LinkedBlockingDeque"),r("OutboundLink")],1)]),t._v(" "),r("li",[r("a",{attrs:{href:"https://segmentfault.com/a/1190000016460411",target:"_blank",rel:"noopener noreferrer"}},[t._v("J.U.C之collections框架（16）：LinkedTransferQueue"),r("OutboundLink")],1)])]),t._v(" "),r("hr"),t._v(" "),r("h3",{attrs:{id:"juc-executors-执行器框架"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#juc-executors-执行器框架"}},[t._v("#")]),t._v(" juc-executors 执行器框架")]),t._v(" "),r("p",[t._v("executors框架是整个J.U.C包中类/接口关系最复杂的框架，executors其实可以划分为3大块，每一块的核心都是基于***Executor***这个接口：")]),t._v(" "),r("ol",[r("li",[t._v("线程池")]),t._v(" "),r("li",[t._v("Future模式")]),t._v(" "),r("li",[t._v("Fork/Join框架")])]),t._v(" "),r("p",[r("strong",[t._v("本部分包含以下文章：")])]),t._v(" "),r("ul",[r("li",[r("a",{attrs:{href:"https://segmentfault.com/a/1190000016586578",target:"_blank",rel:"noopener noreferrer"}},[t._v("J.U.C之executors框架（1）：executors框架概述"),r("OutboundLink")],1)]),t._v(" "),r("li",[r("a",{attrs:{href:"https://segmentfault.com/a/1190000016629668",target:"_blank",rel:"noopener noreferrer"}},[t._v("J.U.C之executors框架（2）：普通线程池——ThreadPoolExecutor"),r("OutboundLink")],1)]),t._v(" "),r("li",[r("a",{attrs:{href:"https://segmentfault.com/a/1190000016672638",target:"_blank",rel:"noopener noreferrer"}},[t._v("J.U.C之executors框架（3）：计划线程池——ScheduledThreadPoolExecutor"),r("OutboundLink")],1)]),t._v(" "),r("li",[r("a",{attrs:{href:"https://segmentfault.com/a/1190000016767676",target:"_blank",rel:"noopener noreferrer"}},[t._v("J.U.C之executors框架（4）：Future 模式"),r("OutboundLink")],1)]),t._v(" "),r("li",[r("a",{attrs:{href:"https://segmentfault.com/a/1190000016781127",target:"_blank",rel:"noopener noreferrer"}},[t._v("J.U.C之executors框架（5）：Fork/Join 框架的原理"),r("OutboundLink")],1)]),t._v(" "),r("li",[r("a",{attrs:{href:"https://segmentfault.com/a/1190000016877931",target:"_blank",rel:"noopener noreferrer"}},[t._v("J.U.C之executors框架（6）：Fork/Join 框架的实现"),r("OutboundLink")],1)])]),t._v(" "),r("h2",{attrs:{id:"参考文章"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#参考文章"}},[t._v("#")]),t._v(" 参考文章")]),t._v(" "),r("ul",[r("li",[t._v("https://segmentfault.com/a/1190000015558984")])])])}),[],!1,null,null,null);e.default=n.exports}}]);