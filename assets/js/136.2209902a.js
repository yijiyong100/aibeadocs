(window.webpackJsonp=window.webpackJsonp||[]).push([[136],{652:function(t,s,a){"use strict";a.r(s);var r=a(53),e=Object(r.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[t._v("TIP")]),t._v(" "),a("p",[t._v("本文主要是介绍 树-【B+树】 。")])]),t._v(" "),a("p"),a("div",{staticClass:"table-of-contents"},[a("ul",[a("li",[a("a",{attrs:{href:"#b-树"}},[t._v("B+树")]),a("ul",[a("li",[a("a",{attrs:{href:"#概念"}},[t._v("概念")])]),a("li",[a("a",{attrs:{href:"#特点"}},[t._v("特点")])])])]),a("li",[a("a",{attrs:{href:"#参考文章"}},[t._v("参考文章")])])])]),a("p"),t._v(" "),a("h2",{attrs:{id:"b-树"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#b-树"}},[t._v("#")]),t._v(" B+树")]),t._v(" "),a("h3",{attrs:{id:"概念"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#概念"}},[t._v("#")]),t._v(" 概念")]),t._v(" "),a("p",[t._v("B+树是B树的一个升级版，相对于B树来说B+树更充分的利用了节点的空间，让查询速度更加稳定，其速度完全接近于二分法查找。为什么说B+树查找的效率要比B树更高、更稳定；我们先看看两者的区别")]),t._v(" "),a("ul",[a("li",[t._v("规则\n（1）B+跟B树不同B+树的非叶子节点不保存关键字记录的指针，只进行数据索引，这样使得B+树每个非叶子节点所能保存的关键字大大增加；\n（2）B+树叶子节点保存了父节点的所有关键字记录的指针，所有数据地址必须要到叶子节点才能获取到。所以每次数据查询的次数都一样；\n（3）B+树叶子节点的关键字从小到大有序排列，左边结尾数据都会保存右边节点开始数据的指针。\n（4）非叶子节点的子节点数=关键字数（来源百度百科）（根据各种资料 这里有两种算法的实现方式，另一种为非叶节点的关键字数=子节点数-1（来源维基百科)，虽然他们数据排列结构不一样，但其原理还是一样的Mysql 的B+树是用第一种方式实现）;")])]),t._v(" "),a("img",{staticClass:"zoom-custom-imgs",attrs:{src:t.$withBase("/assets/img/algorithm/basic/treez/20190822142812954.png"),alt:"wxmp"}}),t._v(" "),a("p",[t._v("百度百科示意图")]),t._v(" "),a("img",{staticClass:"zoom-custom-imgs",attrs:{src:t.$withBase("/assets/img/algorithm/basic/treez/20190822142826661.png"),alt:"wxmp"}}),t._v(" "),a("p",[t._v("维基百科示意图")]),t._v(" "),a("h3",{attrs:{id:"特点"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#特点"}},[t._v("#")]),t._v(" 特点")]),t._v(" "),a("p",[t._v("1、B+树的层级更少：相较于B树B+每个非叶子节点存储的关键字数更多，树的层级更少所以查询数据更快；")]),t._v(" "),a("p",[t._v("2、B+树查询速度更稳定：B+所有关键字数据地址都存在叶子节点上，所以每次查找的次数都相同所以查询速度要比B树更稳定;")]),t._v(" "),a("p",[t._v("3、B+树天然具备排序功能：B+树所有的叶子节点数据构成了一个有序链表，在查询大小区间的数据时候更方便，数据紧密性很高，缓存的命中率也会比B树高。\n4、B+树全节点遍历更快：B+树遍历整棵树只需要遍历所有的叶子节点即可，，而不需要像B树一样需要对每一层进行遍历，这有利于数据库做全表扫描。")]),t._v(" "),a("p",[t._v("B树相对于B+树的优点是，如果经常访问的数据离根节点很近，而B树的非叶子节点本身存有关键字其数据的地址，所以这种数据检索的时候会要比B+树快。")]),t._v(" "),a("h2",{attrs:{id:"参考文章"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#参考文章"}},[t._v("#")]),t._v(" 参考文章")]),t._v(" "),a("ul",[a("li",[t._v("https://blog.csdn.net/chai471793/article/details/99563704")])])])}),[],!1,null,null,null);s.default=e.exports}}]);