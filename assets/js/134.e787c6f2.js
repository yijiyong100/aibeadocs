(window.webpackJsonp=window.webpackJsonp||[]).push([[134],{649:function(t,s,a){"use strict";a.r(s);var r=a(53),i=Object(r.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[t._v("TIP")]),t._v(" "),a("p",[t._v("本文主要是介绍 树-【B树】 。")])]),t._v(" "),a("p"),a("div",{staticClass:"table-of-contents"},[a("ul",[a("li",[a("a",{attrs:{href:"#b树"}},[t._v("B树")]),a("ul",[a("li",[a("a",{attrs:{href:"#概念"}},[t._v("概念")])]),a("li",[a("a",{attrs:{href:"#规则"}},[t._v("规则")])])])]),a("li",[a("a",{attrs:{href:"#b树查询流程"}},[t._v("B树查询流程")]),a("ul",[a("li",[a("a",{attrs:{href:"#b树插入节点流程"}},[t._v("B树插入节点流程")])]),a("li",[a("a",{attrs:{href:"#b树节点删除"}},[t._v("B树节点删除")])]),a("li",[a("a",{attrs:{href:"#特点"}},[t._v("特点：")])])])]),a("li",[a("a",{attrs:{href:"#参考文章"}},[t._v("参考文章")])])])]),a("p"),t._v(" "),a("h2",{attrs:{id:"b树"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#b树"}},[t._v("#")]),t._v(" B树")]),t._v(" "),a("p",[t._v("注意:之前有看到有很多文章把B树和B-tree理解成了两种不同类别的树，其实这两个是同一种树;")]),t._v(" "),a("h3",{attrs:{id:"概念"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#概念"}},[t._v("#")]),t._v(" 概念")]),t._v(" "),a("p",[t._v("B树和平衡二叉树稍有不同的是B树属于多叉树又名平衡多路查找树（查找路径不只两个），数据库索引技术里大量使用者B树和B+树的数据结构，让我们来看看他有什么特点;")]),t._v(" "),a("h3",{attrs:{id:"规则"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#规则"}},[t._v("#")]),t._v(" 规则")]),t._v(" "),a("p",[t._v("（1）排序方式：所有节点关键字是按递增次序排列，并遵循左小右大原则；\n（2）子节点数：非叶节点的子节点数>1，且<=M ，且M>=2，空树除外（注：M阶代表一个树节点最多有多少个查找路径，M=M路,当M=2则是2叉树,M=3则是3叉）；\n（3）关键字数：枝节点的关键字数量大于等于ceil(m/2)-1个且小于等于M-1个（注：ceil()是个朝正无穷方向取整的函数 如ceil(1.1)结果为2);\n（4）所有叶子节点均在同一层、叶子节点除了包含了关键字和关键字记录的指针外也有指向其子节点的指针只不过其指针地址都为null对应下图最后一层节点的空格子;\n最后我们用一个图和一个实际的例子来理解B树（这里为了理解方便我就直接用实际字母的大小来排列C>B>A）\n"),a("img",{staticClass:"zoom-custom-imgs",attrs:{src:t.$withBase("/assets/img/algorithm/basic/treez/20190822112219861.png"),alt:"wxmp"}})]),t._v(" "),a("h2",{attrs:{id:"b树查询流程"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#b树查询流程"}},[t._v("#")]),t._v(" B树查询流程")]),t._v(" "),a("p",[t._v("如上图我要从上图中找到E字母，查找流程如下")]),t._v(" "),a("p",[t._v("（1）获取根节点的关键字进行比较，当前根节点关键字为M，E<M（26个字母顺序），所以往找到指向左边的子节点（二分法规则，左小右大，左边放小于当前节点值的子节点、右边放大于当前节点值的子节点）；\n（2）拿到关键字D和G，D<E<G 所以直接找到D和G中间的节点；\n（3）拿到E和F，因为E=E 所以直接返回关键字和指针信息（如果树结构里面没有包含所要查找的节点则返回null）；")]),t._v(" "),a("h3",{attrs:{id:"b树插入节点流程"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#b树插入节点流程"}},[t._v("#")]),t._v(" B树插入节点流程")]),t._v(" "),a("p",[t._v("定义一个5阶树（平衡5路查找树;），现在我们要把3、8、31、11、23、29、50、28 这些数字构建出一个5阶树出来;")]),t._v(" "),a("p",[t._v("遵循规则：")]),t._v(" "),a("p",[t._v("（1）节点拆分规则：当前是要组成一个5路查找树，那么此时m=5,关键字数必须<=5-1（这里关键字数>4就要进行节点拆分）；\n（2）排序规则：满足节点本身比左边节点大，比右边节点小的排序规则;\n先插入 3、8、31、11")]),t._v(" "),a("img",{staticClass:"zoom-custom-imgs",attrs:{src:t.$withBase("/assets/img/algorithm/basic/treez/20190822142608760.png"),alt:"wxmp"}}),t._v(" "),a("p",[t._v("再插入23、29")]),t._v(" "),a("img",{staticClass:"zoom-custom-imgs",attrs:{src:t.$withBase("/assets/img/algorithm/basic/treez/20190822142625179.png"),alt:"wxmp"}}),t._v(" "),a("p",[t._v("再插入50、28")]),t._v(" "),a("img",{staticClass:"zoom-custom-imgs",attrs:{src:t.$withBase("/assets/img/algorithm/basic/treez/20190822142635318.png"),alt:"wxmp"}}),t._v(" "),a("h3",{attrs:{id:"b树节点删除"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#b树节点删除"}},[t._v("#")]),t._v(" B树节点删除")]),t._v(" "),a("p",[t._v("规则：\n（1）节点合并规则：当前是要组成一个5路查找树，那么此时m=5,关键字数必须大于等于ceil（5/2）（这里关键字数<2就要进行节点合并）；")]),t._v(" "),a("p",[t._v("（2）满足节点本身比左边节点大，比右边节点小的排序规则;")]),t._v(" "),a("p",[t._v("（3）关键字数小于二时先从子节点取，子节点没有符合条件时就向向父节点取，取中间值往父节点放；")]),t._v(" "),a("img",{staticClass:"zoom-custom-imgs",attrs:{src:t.$withBase("/assets/img/algorithm/basic/treez/20190822142708959.png"),alt:"wxmp"}}),t._v(" "),a("h3",{attrs:{id:"特点"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#特点"}},[t._v("#")]),t._v(" 特点：")]),t._v(" "),a("p",[t._v("B树相对于平衡二叉树的不同是，每个节点包含的关键字增多了，特别是在B树应用到数据库中的时候，数据库充分利用了磁盘块的原理（磁盘数据存储是采用块的形式存储的，每个块的大小为4K，每次IO进行数据读取时，同一个磁盘块的数据可以一次性读取出来）把节点大小限制和充分使用在磁盘快大小范围；把树的节点关键字增多后树的层级比原来的二叉树少了，减少数据查找的次数和复杂度;")]),t._v(" "),a("h2",{attrs:{id:"参考文章"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#参考文章"}},[t._v("#")]),t._v(" 参考文章")]),t._v(" "),a("ul",[a("li",[t._v("https://blog.csdn.net/chai471793/article/details/99563704")])])])}),[],!1,null,null,null);s.default=i.exports}}]);