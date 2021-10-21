(window.webpackJsonp=window.webpackJsonp||[]).push([[720],{1236:function(t,a,e){"use strict";e.r(a);var s=e(53),i=Object(s.a)({},(function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[e("div",{staticClass:"custom-block tip"},[e("p",{staticClass:"custom-block-title"},[t._v("TIP")]),t._v(" "),e("p",[t._v("本文主要是介绍 常见Web服务器介绍 。")])]),t._v(" "),e("p"),e("div",{staticClass:"table-of-contents"},[e("ul",[e("li",[e("a",{attrs:{href:"#小知识-几个常见的web服务器介绍"}},[t._v("小知识：几个常见的web服务器介绍")])]),e("li",[e("a",{attrs:{href:"#_1-apache【阿帕奇】"}},[t._v("1：apache【阿帕奇】")])]),e("li",[e("a",{attrs:{href:"#_2-nginx-engine-x"}},[t._v("2：Nginx (engine x)")])]),e("li",[e("a",{attrs:{href:"#_3-iis【internet-information-services】"}},[t._v("3：IIS【Internet Information Services】")])]),e("li",[e("a",{attrs:{href:"#其他"}},[t._v("其他：")])]),e("li",[e("a",{attrs:{href:"#市场"}},[t._v("市场：")])]),e("li",[e("a",{attrs:{href:"#参考文章"}},[t._v("参考文章")])])])]),e("p"),t._v(" "),e("h2",{attrs:{id:"小知识-几个常见的web服务器介绍"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#小知识-几个常见的web服务器介绍"}},[t._v("#")]),t._v(" 小知识：几个常见的web服务器介绍")]),t._v(" "),e("p",[t._v("可能，你还不知道网站是怎么运行起来的，可能你还没有自己搭建过网站，没关系，先了解下几个常见的web网站搭建需要的服务器软件。")]),t._v(" "),e("h2",{attrs:{id:"_1-apache【阿帕奇】"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_1-apache【阿帕奇】"}},[t._v("#")]),t._v(" 1：apache【阿帕奇】")]),t._v(" "),e("p",[t._v("一个比较常见的web服务器软件，世界使用排名第一，目前的许多网站都是使用apache作为web服务器。Apache起初由伊利诺伊大学香槟分校的国家超级电脑应用中心（NCSA）开发。此后，Apache 被开放源代码团体的成员不断的发展和加强。"),e("strong",[t._v("Apache 网站服务器拥有牢靠可信的美誉，已经在全球超过半数的网站中被使用－特别是几乎所有最热门和访问量最大的网站。")])]),t._v(" "),e("img",{staticClass:"zoom-custom-imgs",attrs:{src:t.$withBase("/assets/img/operation/ng/commwebserver-1.png"),alt:"wxmp"}}),t._v(" "),e("p",[t._v("特性：Apache支持许多特性，大部分通过编译的模块实现。这些特性从服务端的编程语言支持到身份认证方案。一些通用的语言接口支持Perl，Python，Tcl， 和PHP。流行的认证模块包括mod_access，mod_auth和mod_digest。其他的例子有SSL和TLS支持（mod_ssl），代理服务器（proxy）模块，很有用的URL重写（由mod_rewrite实现），定制日志文件（mod_log_config），以及过滤支持（mod_include和mod_ext_filter）。Apache日志可以通过网页浏览器使用免费的脚本AWStats或Visitors来进行分析。")]),t._v(" "),e("h2",{attrs:{id:"_2-nginx-engine-x"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_2-nginx-engine-x"}},[t._v("#")]),t._v(" 2：Nginx (engine x)")]),t._v(" "),e("p",[t._v("一个高性能的反向代理web服务器，轻量级的，占用内存比较少，并发能力比较强。Nginx在官方测试的结果中，能够支持五万个并行连接，而在实际的运作中，可以支持二万至四万个并行连接。国内的许多大型网站使用了Nginx，例如百度。")]),t._v(" "),e("img",{staticClass:"zoom-custom-imgs",attrs:{src:t.$withBase("/assets/img/operation/ng/commwebserver-2.png"),alt:"wxmp"}}),t._v(" "),e("p",[t._v("与apache相比：Nginx 的编写有一个明确目标就是超越 Apache Web 服务器的性能[20]。Nginx 提供开箱即用的静态文件，使用的内存比 Apache 少得多，每秒可以处理大约四倍于 Apache 的请求[21]。 在低并发下 Nginx 的性能与 Apache 相当（有时候还低于），但是在高并发下 Nginx 能保持低资源低消耗高性能。Nginx 的优点还包括：高度模块化的设计，模块编写简单，以及配置文件简洁。截至2018年1月，Nginx 服务或者代理了全球 30.46% 的网站。")]),t._v(" "),e("h2",{attrs:{id:"_3-iis【internet-information-services】"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_3-iis【internet-information-services】"}},[t._v("#")]),t._v(" 3：IIS【Internet Information Services】")]),t._v(" "),e("p",[t._v("微软公司提供的，基于Windows的互联网基本服务，各种权限的设置还挺麻烦的。从IIS1.0到目前的IIS10.0。IIS是在Windows操作系统平台下开发的，这也限制了它只能在这种操作系统下运行，c++语言开发，apache和nginx为C语言。")]),t._v(" "),e("img",{staticClass:"zoom-custom-imgs",attrs:{src:t.$withBase("/assets/img/operation/ng/commwebserver-3.png"),alt:"wxmp"}}),t._v(" "),e("p",[t._v("IIS的发展伴随着安全漏洞；而随着IIS 6.0的发布，这种情况有所好转。在低于6.0的版本中，其用户权限是系统用户；而在IIS 6.0中，引入了网络服务账户，这是一个限制用户。这样，即使服务遭到了破坏，也不会造成系统的瘫痪。")]),t._v(" "),e("h2",{attrs:{id:"其他"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#其他"}},[t._v("#")]),t._v(" 其他：")]),t._v(" "),e("p",[t._v("Java平台的tomcat，IBM WAS，WildFly")]),t._v(" "),e("p",[t._v("用python语言编写的Tornado web server作为Web服务器，Tornado有较为出色的抗负载能力，官方用nginx反向代理的方式部署Tornado和其它Python web应用框架进行对比，结果最大浏览量超过第二名近40%。")]),t._v(" "),e("p",[t._v("Zope：Zope是一个以Python编写的开源、面向对象的Web应用服务器。Zope代表着“Z对象发布环境（Z Object Publishing Environment）”，并且是第一个系统使用了新的通用对象发布方法的框架。Zope已经被认为是一个Python的杀手级应用，一个帮助Python走到聚光灯下的应用。")]),t._v(" "),e("p",[t._v("同属C阵营的"),e("strong",[t._v("lighttd，lighty****：开源的网页服务器，相较于其他的网页服务器，仅需少量的内存及CPU资源即可达到同样的性能。")])]),t._v(" "),e("h2",{attrs:{id:"市场"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#市场"}},[t._v("#")]),t._v(" 市场：")]),t._v(" "),e("p",[t._v("根据Netcraft在2009年12月的最新统计数据，Apache的市占率已经降为53.67％，IIS降为18.26％，谷歌网页服务器13.53％，nginx 8.75％。")]),t._v(" "),e("img",{staticClass:"zoom-custom-imgs",attrs:{src:t.$withBase("/assets/img/operation/ng/commwebserver-4.png"),alt:"wxmp"}}),t._v(" "),e("p",[e("strong",[t._v("2020年，Apache 增长了 980 万个站点，微软和 nginx 分别增长了 540 万和 250 万个站点。")])]),t._v(" "),e("h2",{attrs:{id:"参考文章"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#参考文章"}},[t._v("#")]),t._v(" 参考文章")]),t._v(" "),e("ul",[e("li",[t._v("https://baijiahao.baidu.com/s?id=1674179851809711716")])])])}),[],!1,null,null,null);a.default=i.exports}}]);