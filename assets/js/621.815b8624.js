(window.webpackJsonp=window.webpackJsonp||[]).push([[621],{1136:function(t,a,e){"use strict";e.r(a);var r=e(53),s=Object(r.a)({},(function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[e("div",{staticClass:"custom-block tip"},[e("p",{staticClass:"custom-block-title"},[t._v("TIP")]),t._v(" "),e("p",[t._v("本文主要是介绍 JUC-集合-基础介绍 。")])]),t._v(" "),e("p"),e("div",{staticClass:"table-of-contents"},[e("ul",[e("li",[e("a",{attrs:{href:"#【-】"}},[t._v("【----------------------------】")])]),e("li",[e("a",{attrs:{href:"#一、概述"}},[t._v("一、概述")])]),e("li",[e("a",{attrs:{href:"#_1-1、java集合"}},[t._v("1.1、java集合")])]),e("li",[e("a",{attrs:{href:"#_1-2、juc集合"}},[t._v("1.2、JUC集合")])]),e("li",[e("a",{attrs:{href:"#参考文章"}},[t._v("参考文章")])])])]),e("p"),t._v(" "),e("h2",{attrs:{id:"【-】"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#【-】"}},[t._v("#")]),t._v(" 【----------------------------】")]),t._v(" "),e("img",{staticClass:"zoom-custom-imgs",attrs:{src:t.$withBase("/assets/img/java/juc/intro-1.png"),alt:"wxmp"}}),t._v(" "),e("h2",{attrs:{id:"一、概述"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#一、概述"}},[t._v("#")]),t._v(" 一、概述")]),t._v(" "),e("h2",{attrs:{id:"_1-1、java集合"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_1-1、java集合"}},[t._v("#")]),t._v(" 1.1、java集合")]),t._v(" "),e("p",[t._v("java集合的架构，主体内容包括Collection集合和Map类；而Collection集合又可以划分为List(队列)和Set(集合)。")]),t._v(" "),e("p",[e("strong",[t._v("1. List的实现类主要有: LinkedList, ArrayList, Vector, Stack。")])]),t._v(" "),e("p",[t._v("(01) "),e("a",{attrs:{href:"http://www.cnblogs.com/skywang12345/p/3308807.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("LinkedList"),e("OutboundLink")],1),t._v("是双向链表实现的双端队列；它不是线程安全的，只适用于单线程。\n(02) "),e("a",{attrs:{href:"http://www.cnblogs.com/skywang12345/p/3308556.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("ArrayList"),e("OutboundLink")],1),t._v("是数组实现的队列，它是一个动态数组；它也不是线程安全的，只适用于单线程。\n(03) "),e("a",{attrs:{href:"http://www.cnblogs.com/skywang12345/p/3308833.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("Vector"),e("OutboundLink")],1),t._v("是数组实现的矢量队列，它也一个动态数组；不过和ArrayList不同的是，Vector是线程安全的，它支持并发。\n(04) "),e("a",{attrs:{href:"http://www.cnblogs.com/skywang12345/p/3308852.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("Stack"),e("OutboundLink")],1),t._v("是Vector实现的栈；和Vector一样，它也是线程安全的。")]),t._v(" "),e("p",[e("strong",[t._v("2. Set的实现类主要有: HastSet和TreeSet。")])]),t._v(" "),e("p",[t._v("(01) "),e("a",{attrs:{href:"http://www.cnblogs.com/skywang12345/p/3311252.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("HashSet"),e("OutboundLink")],1),t._v("是一个没有重复元素的集合，它通过HashMap实现的；HashSet不是线程安全的，只适用于单线程。\n(02) "),e("a",{attrs:{href:"http://www.cnblogs.com/skywang12345/p/3311268.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("TreeSet"),e("OutboundLink")],1),t._v("也是一个没有重复元素的集合，不过和HashSet不同的是，TreeSet中的元素是有序的；它是通过TreeMap实现的；TreeSet也不是线程安全的，只适用于单线程。")]),t._v(" "),e("p",[e("strong",[t._v("3.Map的实现类主要有: HashMap，WeakHashMap, Hashtable和TreeMap。")])]),t._v(" "),e("p",[t._v("(01) "),e("a",{attrs:{href:"http://www.cnblogs.com/skywang12345/p/3310835.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("HashMap"),e("OutboundLink")],1),t._v("是存储“键-值对”的哈希表；它不是线程安全的，只适用于单线程。\n(02) "),e("a",{attrs:{href:"http://www.cnblogs.com/skywang12345/p/3311092.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("WeakHashMap"),e("OutboundLink")],1),t._v("是也是哈希表；和HashMap不同的是，HashMap的“键”是强引用类型，而WeakHashMap的“键”是弱引用类型，也就是说当WeakHashMap 中的某个键不再正常使用时，会被从WeakHashMap中被自动移除。WeakHashMap也不是线程安全的，只适用于单线程。\n(03) "),e("a",{attrs:{href:"http://www.cnblogs.com/skywang12345/p/3310887.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("Hashtable"),e("OutboundLink")],1),t._v("也是哈希表；和HashMap不同的是，Hashtable是线程安全的，支持并发。\n(04) "),e("a",{attrs:{href:"http://www.cnblogs.com/skywang12345/p/3310928.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("TreeMap"),e("OutboundLink")],1),t._v("也是哈希表，不过TreeMap中的“键-值对”是有序的，它是通过R-B Tree(红黑树)实现的；TreeMap不是线程安全的，只适用于单线程。")]),t._v(" "),e("p",[t._v("java集合包大多是“非线程安全的”，虽然可以通过Collections工具类中的方法获取java集合包对应的同步类，但是这些同步类的并发效率并不是很高。为了更好的支持高并发任务，并发大师Doug Lea在JUC(java.util.concurrent)包中添加了java集合包中单线程类的对应的支持高并发的类。"),e("em",[t._v("例如，ArrayList对应的高并发类是CopyOnWriteArrayList，HashMap对应的高并发类是ConcurrentHashMap，等等。")])]),t._v(" "),e("p",[e("em",[t._v("更多java集合参看：https://www.cnblogs.com/bjlhx/category/1484779.html")])]),t._v(" "),e("h2",{attrs:{id:"_1-2、juc集合"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_1-2、juc集合"}},[t._v("#")]),t._v(" 1.2、JUC集合")]),t._v(" "),e("p",[t._v("juc-collections集合框架，是指"),e("code",[t._v("java.util.concurrent")]),t._v("包下的一些同步集合类，按类型划分可以分为："),e("strong",[t._v("符号表")]),t._v("、"),e("strong",[t._v("队列")]),t._v("、"),e("strong",[t._v("Set集合")]),t._v("、"),e("strong",[t._v("列表")]),t._v("四大类，每个类都有自己适合的使用场景，整个juc-collections集合框架的结构如下图：")]),t._v(" "),e("img",{staticClass:"zoom-custom-imgs",attrs:{src:t.$withBase("/assets/img/java/juc/juccat-6.png"),alt:"wxmp"}}),t._v(" "),e("p",[t._v("其中阻塞队列的分类及特性如下表：")]),t._v(" "),e("table",[e("thead",[e("tr",[e("th",[t._v("队列特性")]),t._v(" "),e("th",[t._v("有界队列")]),t._v(" "),e("th",[t._v("近似无界队列")]),t._v(" "),e("th",[t._v("无界队列")]),t._v(" "),e("th",[t._v("特殊队列")])])]),t._v(" "),e("tbody",[e("tr",[e("td",[t._v("有锁算法")]),t._v(" "),e("td",[t._v("ArrayBlockingQueue")]),t._v(" "),e("td",[t._v("LinkedBlockingQueue、LinkedBlockingDeque")]),t._v(" "),e("td",[t._v("/")]),t._v(" "),e("td",[t._v("PriorityBlockingQueue、DelayQueue")])]),t._v(" "),e("tr",[e("td",[t._v("无锁算法")]),t._v(" "),e("td",[t._v("/")]),t._v(" "),e("td",[t._v("/")]),t._v(" "),e("td",[t._v("LinkedTransferQueue")]),t._v(" "),e("td",[t._v("SynchronousQueue")])])])]),t._v(" "),e("p",[t._v("JUC包在添加”java集合包“对应的高并发类时，为了保持API接口的一致性，使用了”Java集合包“中的框架。*例如，CopyOnWriteArrayList实现了“Java集合包”中的List接口，HashMap继承了“java集合包”中的AbstractMap类，等等。*得益于“JUC包使用了Java集合包中的类”，如果我们了解了Java集合包中的类的思想之后，理解JUC包中的类也相对容易；理解时，最大的难点是，对JUC包是如何添加对“高并发”的支持的！")]),t._v(" "),e("p",[t._v("为了方便，将JUC包中的集合类划分为3部分来进行说明。在简单的了解JUC包中集合类的框架之后。")]),t._v(" "),e("img",{staticClass:"zoom-custom-imgs",attrs:{src:t.$withBase("/assets/img/java/juc/juccolintro-1.png"),alt:"wxmp"}}),t._v(" "),e("p",[e("strong",[t._v("1. List和Set")])]),t._v(" "),e("p",[t._v("JUC集合包中的List和Set实现类包括: CopyOnWriteArrayList, CopyOnWriteArraySet和ConcurrentSkipListSet。ConcurrentSkipListSet稍后在说明Map时再说明，CopyOnWriteArrayList 和 CopyOnWriteArraySet的框架如下图所示：")]),t._v(" "),e("img",{staticClass:"zoom-custom-imgs",attrs:{src:t.$withBase("/assets/img/java/juc/juccolintro-2.png"),alt:"wxmp"}}),t._v(" "),e("p",[t._v("(01) CopyOnWriteArrayList相当于线程安全的ArrayList，它实现了List接口。CopyOnWriteArrayList是支持高并发的。\n　　(02) CopyOnWriteArraySet相当于线程安全的HashSet，它继承于AbstractSet类。CopyOnWriteArraySet内部包含一个CopyOnWriteArrayList对象，它是通过CopyOnWriteArrayList实现的。")]),t._v(" "),e("p",[e("strong",[t._v("2. Map")])]),t._v(" "),e("p",[t._v("JUC集合包中Map的实现类包括: ConcurrentHashMap和ConcurrentSkipListMap。它们的框架如下图所示：")]),t._v(" "),e("img",{staticClass:"zoom-custom-imgs",attrs:{src:t.$withBase("/assets/img/java/juc/juccolintro-3.png"),alt:"wxmp"}}),t._v(" "),e("p",[t._v("(01) ConcurrentHashMap是线程安全的哈希表(相当于线程安全的HashMap)；它继承于AbstractMap类，并且实现ConcurrentMap接口。ConcurrentHashMap是通过“锁分段”来实现的，它支持并发。\n(02) ConcurrentSkipListMap是线程安全的有序的哈希表(相当于线程安全的TreeMap); 它继承于AbstractMap类，并且实现ConcurrentNavigableMap接口。ConcurrentSkipListMap是通过“跳表”来实现的，它支持并发。\n(03) ConcurrentSkipListSet是线程安全的有序的集合(相当于线程安全的TreeSet)；它继承于AbstractSet，并实现了NavigableSet接口。ConcurrentSkipListSet是通过ConcurrentSkipListMap实现的，它也支持并发。")]),t._v(" "),e("p",[e("strong",[t._v("3. Queue")])]),t._v(" "),e("p",[t._v("JUC集合包中Queue的实现类包括: ArrayBlockingQueue, LinkedBlockingQueue, LinkedBlockingDeque, ConcurrentLinkedQueue和ConcurrentLinkedDeque。它们的框架如下图所示：")]),t._v(" "),e("img",{staticClass:"zoom-custom-imgs",attrs:{src:t.$withBase("/assets/img/java/juc/juccolintro-4.png"),alt:"wxmp"}}),t._v(" "),e("p",[t._v("(01) ArrayBlockingQueue是数组实现的线程安全的有界的阻塞队列。\n(02) LinkedBlockingQueue是单向链表实现的(指定大小)阻塞队列，该队列按 FIFO（先进先出）排序元素。\n(03) LinkedBlockingDeque是双向链表实现的(指定大小)双向并发阻塞队列，该阻塞队列同时支持FIFO和FILO两种操作方式。\n(04) ConcurrentLinkedQueue是单向链表实现的无界队列，该队列按 FIFO（先进先出）排序元素。\n(05) ConcurrentLinkedDeque是双向链表实现的无界队列，该队列同时支持FIFO和FILO两种操作方式。")]),t._v(" "),e("h2",{attrs:{id:"参考文章"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#参考文章"}},[t._v("#")]),t._v(" 参考文章")]),t._v(" "),e("ul",[e("li",[t._v("https://www.cnblogs.com/bjlhx/p/11067891.html")])])])}),[],!1,null,null,null);a.default=s.exports}}]);