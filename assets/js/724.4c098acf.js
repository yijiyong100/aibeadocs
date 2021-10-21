(window.webpackJsonp=window.webpackJsonp||[]).push([[724],{1240:function(s,t,a){"use strict";a.r(t);var n=a(53),e=Object(n.a)({},(function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[s._v("TIP")]),s._v(" "),a("p",[s._v("本文主要是介绍 Nginx-精华总结 。")])]),s._v(" "),a("p"),a("div",{staticClass:"table-of-contents"},[a("ul",[a("li",[a("a",{attrs:{href:"#nginx概述"}},[s._v("nginx概述")])]),a("li",[a("a",{attrs:{href:"#_1-反向代理"}},[s._v("1. 反向代理")]),a("ul",[a("li",[a("a",{attrs:{href:"#正向代理"}},[s._v("正向代理")])]),a("li",[a("a",{attrs:{href:"#反向代理"}},[s._v("反向代理")])])])]),a("li",[a("a",{attrs:{href:"#_2-负载均衡"}},[s._v("2. 负载均衡")])]),a("li",[a("a",{attrs:{href:"#_3-nginx安装"}},[s._v("3. Nginx安装")]),a("ul",[a("li",[a("a",{attrs:{href:"#_3-1-windows安装"}},[s._v("3.1. windows安装")])]),a("li",[a("a",{attrs:{href:"#启动nginx"}},[s._v("启动nginx")])]),a("li",[a("a",{attrs:{href:"#访问nginx"}},[s._v("访问nginx")])]),a("li",[a("a",{attrs:{href:"#停止nginx"}},[s._v("停止nginx")])]),a("li",[a("a",{attrs:{href:"#_3-2-ubuntu安装"}},[s._v("3.2. ubuntu安装")])]),a("li",[a("a",{attrs:{href:"#_3-3-mac-os安装"}},[s._v("3.3. mac os安装")])])])]),a("li",[a("a",{attrs:{href:"#_4-nginx配置"}},[s._v("4. nginx配置")]),a("ul",[a("li",[a("a",{attrs:{href:"#main模块"}},[s._v("main模块")])]),a("li",[a("a",{attrs:{href:"#event-模块"}},[s._v("event 模块")])]),a("li",[a("a",{attrs:{href:"#http模块"}},[s._v("http模块")])]),a("li",[a("a",{attrs:{href:"#server模块"}},[s._v("server模块")])]),a("li",[a("a",{attrs:{href:"#location模块"}},[s._v("location模块")])]),a("li",[a("a",{attrs:{href:"#upstream模块"}},[s._v("upstream模块")])])])]),a("li",[a("a",{attrs:{href:"#参考文章"}},[s._v("参考文章")])])])]),a("p"),s._v(" "),a("h2",{attrs:{id:"nginx概述"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#nginx概述"}},[s._v("#")]),s._v(" nginx概述")]),s._v(" "),a("p",[s._v("nginx是一款自由的、开源的、高性能的HTTP服务器和反向代理服务器；同时也是一个IMAP、POP3、SMTP代理服务器；nginx可以作为一个HTTP服务器进行网站的发布处理，另外nginx可以作为反向代理进行负载均衡的实现。")]),s._v(" "),a("p",[s._v("这里主要通过三个方面简单介绍nginx")]),s._v(" "),a("ul",[a("li",[s._v("反向代理")]),s._v(" "),a("li",[s._v("负载均衡")]),s._v(" "),a("li",[s._v("nginx特点")])]),s._v(" "),a("h2",{attrs:{id:"_1-反向代理"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-反向代理"}},[s._v("#")]),s._v(" 1. 反向代理")]),s._v(" "),a("p",[s._v("关于代理")]),s._v(" "),a("p",[s._v("说到代理，首先我们要明确一个概念，所谓代理就是一个代表、一个渠道；")]),s._v(" "),a("p",[s._v("此时就设计到两个角色，一个是被代理角色，一个是目标角色，被代理角色通过这个代理访问目标角色完成一些任务的过程称为代理操作过程；如同生活中的专卖店~客人到adidas专卖店买了一双鞋，这个专卖店就是代理，被代理角色就是adidas厂家，目标角色就是用户")]),s._v(" "),a("img",{staticClass:"zoom-custom-imgs",attrs:{src:s.$withBase("/assets/img/operation/ng/ngsum-1.png"),alt:"wxmp"}}),s._v(" "),a("h3",{attrs:{id:"正向代理"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#正向代理"}},[s._v("#")]),s._v(" 正向代理")]),s._v(" "),a("p",[s._v("说反向代理之前，我们先看看正向代理，正向代理也是大家最常接触的到的代理模式，我们会从两个方面来说关于正向代理的处理模式，分别从软件方面和生活方面来解释一下什么叫正向代理")]),s._v(" "),a("p",[s._v("在如今的网络环境下，我们如果由于技术需要要去访问国外的某些网站，此时你会发现位于国外的某网站我们通过浏览器是没有办法访问的，此时大家可能都会用一个操作FQ进行访问，FQ的方式主要是找到一个可以访问国外网站的代理服务器，我们将请求发送给代理服务器，代理服务器去访问国外的网站，然后将访问到的数据传递给我们！")]),s._v(" "),a("p",[s._v("上述这样的代理模式称为正向代理，正向代理最大的特点是客户端非常明确要访问的服务器地址；服务器只清楚请求来自哪个代理服务器，而不清楚来自哪个具体的客户端；正向代理模式屏蔽或者隐藏了真实客户端信息。")]),s._v(" "),a("img",{staticClass:"zoom-custom-imgs",attrs:{src:s.$withBase("/assets/img/operation/ng/ngsum-2.png"),alt:"wxmp"}}),s._v(" "),a("h3",{attrs:{id:"反向代理"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#反向代理"}},[s._v("#")]),s._v(" 反向代理")]),s._v(" "),a("p",[s._v("明白了什么是正向代理，我们继续看关于反向代理的处理方式，举例如我大天朝的某宝网站，每天同时连接到网站的访问人数已经爆表，单个服务器远远不能满足人民日益增长的购买欲望了，此时就出现了一个大家耳熟能详的名词：分布式部署；也就是通过部署多台服务器来解决访问人数限制的问题；某宝网站中大部分功能也是直接使用nginx进行反向代理实现的，并且通过封装nginx和其他的组件之后起了个高大上的名字：Tengine，有兴趣的童鞋可以访问Tengine的官网查看具体的信息：http://tengine.taobao.org/\n那么反向代理具体是通过什么样的方式实现的分布式的集群操作呢，我们先看一个示意图：")]),s._v(" "),a("img",{staticClass:"zoom-custom-imgs",attrs:{src:s.$withBase("/assets/img/operation/ng/ngsum-3.png"),alt:"wxmp"}}),s._v(" "),a("p",[s._v("通过上述的图解大家就可以看清楚了，多个客户端给服务器发送的请求，nginx服务器接收到之后，按照一定的规则分发给了后端的业务处理服务器进行处理了。此时~请求的来源也就是客户端是明确的，但是请求具体由哪台服务器处理的并不明确了，nginx扮演的就是一个反向代理角色")]),s._v(" "),a("p",[s._v("反向代理，主要用于服务器集群分布式部署的情况下，反向代理隐藏了服务器的信息！")]),s._v(" "),a("p",[s._v("项目场景")]),s._v(" "),a("p",[s._v("通常情况下，我们在实际项目操作时，正向代理和反向代理很有可能会存在在一个应用场景中，正向代理代理客户端的请求去访问目标服务器，目标服务器是一个反向单利服务器，反向代理了多台真实的业务处理服务器。具体的拓扑图如下：")]),s._v(" "),a("img",{staticClass:"zoom-custom-imgs",attrs:{src:s.$withBase("/assets/img/operation/ng/ngsum-4.png"),alt:"wxmp"}}),s._v(" "),a("h2",{attrs:{id:"_2-负载均衡"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-负载均衡"}},[s._v("#")]),s._v(" 2. 负载均衡")]),s._v(" "),a("p",[s._v("我们已经明确了所谓代理服务器的概念，那么接下来，nginx扮演了反向代理服务器的角色，它是以依据什么样的规则进行请求分发的呢？不用的项目应用场景，分发的规则是否可以控制呢？")]),s._v(" "),a("p",[s._v("这里提到的客户端发送的、nginx反向代理服务器接收到的请求数量，就是我们说的负载量")]),s._v(" "),a("p",[s._v("请求数量按照一定的规则进行分发到不同的服务器处理的规则，就是一种均衡规则")]),s._v(" "),a("p",[s._v("所以~将服务器接收到的请求按照规则分发的过程，称为负载均衡。")]),s._v(" "),a("p",[s._v("负载均衡在实际项目操作过程中，有硬件负载均衡和软件负载均衡两种，硬件负载均衡也称为硬负载，如F5负载均衡，相对造价昂贵成本较高，但是数据的稳定性安全性等等有非常好的保障，如中国移动中国联通这样的公司才会选择硬负载进行操作；更多的公司考虑到成本原因，会选择使用软件负载均衡，软件负载均衡是利用现有的技术结合主机硬件实现的一种消息队列分发机制")]),s._v(" "),a("img",{staticClass:"zoom-custom-imgs",attrs:{src:s.$withBase("/assets/img/operation/ng/ngsum-5.png"),alt:"wxmp"}}),s._v(" "),a("p",[s._v("nginx支持的负载均衡调度算法方式如下：")]),s._v(" "),a("ol",[a("li",[s._v("weight轮询（默认）：接收到的请求按照顺序逐一分配到不同的后端服务器，即使在使用过程中，某一台后端服务器宕机，nginx会自动将该服务器剔除出队列，请求受理情况不会受到任何影响。 这种方式下，可以给不同的后端服务器设置一个权重值（weight），用于调整不同的服务器上请求的分配率；权重数据越大，被分配到请求的几率越大；该权重值，主要是针对实际工作环境中不同的后端服务器硬件配置进行调整的。")]),s._v(" "),a("li",[s._v("ip_hash：每个请求按照发起客户端的ip的hash结果进行匹配，这样的算法下一个固定ip地址的客户端总会访问到同一个后端服务器，这也在一定程度上解决了集群部署环境下session共享的问题。")]),s._v(" "),a("li",[s._v("fair：智能调整调度算法，动态的根据后端服务器的请求处理到响应的时间进行均衡分配，响应时间短处理效率高的服务器分配到请求的概率高，响应时间长处理效率低的服务器分配到的请求少；结合了前两者的优点的一种调度算法。但是需要注意的是nginx默认不支持fair算法，如果要使用这种调度算法，请安装upstream_fair模块")]),s._v(" "),a("li",[s._v("url_hash：按照访问的url的hash结果分配请求，每个请求的url会指向后端固定的某个服务器，可以在nginx作为静态服务器的情况下提高缓存效率。同样要注意nginx默认不支持这种调度算法，要使用的话需要安装nginx的hash软件包")])]),s._v(" "),a("h2",{attrs:{id:"_3-nginx安装"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_3-nginx安装"}},[s._v("#")]),s._v(" 3. Nginx安装")]),s._v(" "),a("h3",{attrs:{id:"_3-1-windows安装"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_3-1-windows安装"}},[s._v("#")]),s._v(" 3.1. windows安装")]),s._v(" "),a("p",[s._v("官方网站下载地址：")]),s._v(" "),a("div",{staticClass:"language-shell extra-class"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[s._v("https://nginx.org/en/download.html\n")])])]),a("p",[s._v("如下图所示，下载对应的版本的nginx压缩包，解压到自己电脑上存放软件的文件夹中即可")]),s._v(" "),a("img",{staticClass:"zoom-custom-imgs",attrs:{src:s.$withBase("/assets/img/operation/ng/ngsum-6.png"),alt:"wxmp"}}),s._v(" "),a("p",[s._v("解压完成后，文件目录结构如下：")]),s._v(" "),a("img",{staticClass:"zoom-custom-imgs",attrs:{src:s.$withBase("/assets/img/operation/ng/ngsum-7.png"),alt:"wxmp"}}),s._v(" "),a("h3",{attrs:{id:"启动nginx"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#启动nginx"}},[s._v("#")]),s._v(" 启动nginx")]),s._v(" "),a("p",[s._v("1） 直接双击该目录下的nginx.exe，即可启动nginx服务器")]),s._v(" "),a("p",[s._v("2） 命令行计入该文件夹，执行nginx命令，也会直接启动nginx服务器")]),s._v(" "),a("div",{staticClass:"language-shell extra-class"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[s._v("D:/resp_application/nginx-1.13."),a("span",{pre:!0,attrs:{class:"token operator"}},[a("span",{pre:!0,attrs:{class:"token file-descriptor important"}},[s._v("5")]),s._v(">")]),s._v(" nginx\n")])])]),a("img",{staticClass:"zoom-custom-imgs",attrs:{src:s.$withBase("/assets/img/operation/ng/ngsum-8.png"),alt:"wxmp"}}),s._v(" "),a("h3",{attrs:{id:"访问nginx"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#访问nginx"}},[s._v("#")]),s._v(" 访问nginx")]),s._v(" "),a("p",[s._v("打开浏览器，输入地址：http://localhost，访问页面，出现如下页面表示访问成功")]),s._v(" "),a("img",{staticClass:"zoom-custom-imgs",attrs:{src:s.$withBase("/assets/img/operation/ng/ngsum-9.png"),alt:"wxmp"}}),s._v(" "),a("h3",{attrs:{id:"停止nginx"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#停止nginx"}},[s._v("#")]),s._v(" 停止nginx")]),s._v(" "),a("p",[s._v("命令行进入nginx根目录，执行如下命令，停止服务器：")]),s._v(" "),a("div",{staticClass:"language-shell extra-class"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 强制停止nginx服务器，如果有未处理的数据，丢弃")]),s._v("\nD:/resp_application/nginx-1.13."),a("span",{pre:!0,attrs:{class:"token operator"}},[a("span",{pre:!0,attrs:{class:"token file-descriptor important"}},[s._v("5")]),s._v(">")]),s._v(" nginx -s stop\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 优雅的停止nginx服务器，如果有未处理的数据，等待处理完成之后停止")]),s._v("\nD:/resp_application/nginx-1.13."),a("span",{pre:!0,attrs:{class:"token operator"}},[a("span",{pre:!0,attrs:{class:"token file-descriptor important"}},[s._v("5")]),s._v(">")]),s._v(" nginx -s quit\n")])])]),a("img",{staticClass:"zoom-custom-imgs",attrs:{src:s.$withBase("/assets/img/operation/ng/ngsum-10.png"),alt:"wxmp"}}),s._v(" "),a("h3",{attrs:{id:"_3-2-ubuntu安装"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_3-2-ubuntu安装"}},[s._v("#")]),s._v(" 3.2. ubuntu安装")]),s._v(" "),a("p",[s._v("按照正常软件的安装方式，直接通过如下命令进行安装：")]),s._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("$ sudo apt-get install nginx\n")])])]),a("img",{staticClass:"zoom-custom-imgs",attrs:{src:s.$withBase("/assets/img/operation/ng/ngsum-11.png"),alt:"wxmp"}}),s._v(" "),a("p",[s._v("安装完成即可，在/usr/sbin/目录下是nginx命令所在目录，在/etc/nginx/目录下是nginx所有的配置文件，用于配置nginx服务器以及负载均衡等信息")]),s._v(" "),a("h5",{attrs:{id:"查看nginx进程是否启动"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#查看nginx进程是否启动"}},[s._v("#")]),s._v(" 查看nginx进程是否启动")]),s._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[s._v("$ ps -ef|grep nginx\n")])])]),a("p",[s._v("nginx会自动根据当前主机的CPU的内核数目创建对应的进程数量(当前ubuntu主机是2核4线程配置)")]),s._v(" "),a("img",{staticClass:"zoom-custom-imgs",attrs:{src:s.$withBase("/assets/img/operation/ng/ngsum-12.png"),alt:"wxmp"}}),s._v(" "),a("blockquote",[a("p",[s._v("备注：这里启动的服务进程其实是4个进程，因为nginx进程在启动的时候，会附带一个守护进程，用于保护正式进程不被异常终止；如果守护进程一旦返现nginx继承被终止了，会自动重启该进程。")]),s._v(" "),a("p",[s._v("守护进程一般会称为master进程，业务进程被称为worker进程")])]),s._v(" "),a("h5",{attrs:{id:"启动nginx服务器命令"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#启动nginx服务器命令"}},[s._v("#")]),s._v(" 启动nginx服务器命令")]),s._v(" "),a("p",[s._v("直接执行nginx会按照默认的配置文件进行服务器的启动")]),s._v(" "),a("div",{staticClass:"language-shell extra-class"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[s._v("$ nginx\n")])])]),a("img",{staticClass:"zoom-custom-imgs",attrs:{src:s.$withBase("/assets/img/operation/ng/ngsum-13.png"),alt:"wxmp"}}),s._v(" "),a("h5",{attrs:{id:"停止nginx服务命令"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#停止nginx服务命令"}},[s._v("#")]),s._v(" 停止nginx服务命令")]),s._v(" "),a("p",[s._v("和windows系统执行过程一样，两种停止方式")]),s._v(" "),a("div",{staticClass:"language-shell extra-class"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[s._v("$ nginx -s stop\nor\n$ nginx -s quit\n")])])]),a("img",{staticClass:"zoom-custom-imgs",attrs:{src:s.$withBase("/assets/img/operation/ng/ngsum-14.png"),alt:"wxmp"}}),s._v(" "),a("h5",{attrs:{id:"重新启动加载"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#重新启动加载"}},[s._v("#")]),s._v(" 重新启动加载")]),s._v(" "),a("p",[s._v("同样也可以使用命令reopen和reload来重新启动nginx或者重新加载配合着文件。")]),s._v(" "),a("h3",{attrs:{id:"_3-3-mac-os安装"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_3-3-mac-os安装"}},[s._v("#")]),s._v(" 3.3. mac os安装")]),s._v(" "),a("p",[s._v("直接通过brew进行nginx的安装，或者下载tar.gz压缩包都是可以的。")]),s._v(" "),a("p",[s._v("直接通过brew进行安装")]),s._v(" "),a("div",{staticClass:"language-shell extra-class"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[s._v("brew "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("install")]),s._v(" nginx\n")])])]),a("p",[s._v("安装完成后，后续的命令操作，服务器的启动、进程查看、服务器的停止、服务器的重启已经文件加载命令都是一致的。")]),s._v(" "),a("h2",{attrs:{id:"_4-nginx配置"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_4-nginx配置"}},[s._v("#")]),s._v(" 4. nginx配置")]),s._v(" "),a("p",[s._v("nginx是一个功能非常强大的web服务器加反向代理服务器，同时又是邮件服务器等等")]),s._v(" "),a("p",[s._v("在项目使用中，使用最多的三个核心功能是反向代理、负载均衡和静态服务器")]),s._v(" "),a("p",[s._v("这三个不同的功能的使用，都跟nginx的配置密切相关，nginx服务器的配置信息主要集中在nginx.conf这个配置文件中，并且所有的可配置选项大致分为以下几个部分")]),s._v(" "),a("div",{staticClass:"language-shell extra-class"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[s._v("main                                "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 全局配置")]),s._v("\n\nevents "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("                            "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# nginx工作模式配置")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n\nhttp "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("                                "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# http设置")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("..")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("..")]),s._v("\n\n    server "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("                        "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 服务器主机配置")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("..")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("..")]),s._v("\n        location "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("                    "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 路由配置")]),s._v("\n            "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("..")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("..")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n\n        location path "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n            "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("..")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("..")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n\n        location otherpath "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n            "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("..")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("..")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n\n    server "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("..")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("..")]),s._v("\n\n        location "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n            "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("..")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("..")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n\n    upstream name "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("                    "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 负载均衡配置")]),s._v("\n        "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("..")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("..")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])])]),a("p",[s._v("如上述配置文件所示，主要由6个部分组成：")]),s._v(" "),a("ul",[a("li",[a("ol",[a("li",[s._v("main：用于进行nginx全局信息的配置")])])]),s._v(" "),a("li",[a("ol",{attrs:{start:"2"}},[a("li",[s._v("events：用于nginx工作模式的配置")])])]),s._v(" "),a("li",[a("ol",{attrs:{start:"3"}},[a("li",[s._v("http：用于进行http协议信息的一些配置")])])]),s._v(" "),a("li",[a("ol",{attrs:{start:"4"}},[a("li",[s._v("server：用于进行服务器访问信息的配置")])])]),s._v(" "),a("li",[a("ol",{attrs:{start:"5"}},[a("li",[s._v("location：用于进行访问路由的配置")])])]),s._v(" "),a("li",[a("ol",{attrs:{start:"6"}},[a("li",[s._v("upstream：用于进行负载均衡的配置")])])])]),s._v(" "),a("h3",{attrs:{id:"main模块"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#main模块"}},[s._v("#")]),s._v(" main模块")]),s._v(" "),a("p",[s._v("观察下面的配置代码")]),s._v(" "),a("div",{staticClass:"language-shell extra-class"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# user nobody nobody;")]),s._v("\nworker_processes "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("2")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# error_log logs/error.log")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# error_log logs/error.log notice")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# error_log logs/error.log info")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# pid logs/nginx.pid")]),s._v("\nworker_rlimit_nofile "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1024")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n")])])]),a("p",[s._v("上述配置都是存放在main全局配置模块中的配置项")]),s._v(" "),a("ul",[a("li",[s._v("user用来指定nginx worker进程运行用户以及用户组，默认nobody账号运行")]),s._v(" "),a("li",[s._v("worker_processes指定nginx要开启的子进程数量，运行过程中监控每个进程消耗内存(一般几M~几十M不等)根据实际情况进行调整，通常数量是CPU内核数量的整数倍")]),s._v(" "),a("li",[s._v("error_log定义错误日志文件的位置及输出级别【debug / info / notice / warn / error / crit】")]),s._v(" "),a("li",[s._v("pid用来指定进程id的存储文件的位置")]),s._v(" "),a("li",[s._v("worker_rlimit_nofile用于指定一个进程可以打开最多文件数量的描述")])]),s._v(" "),a("h3",{attrs:{id:"event-模块"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#event-模块"}},[s._v("#")]),s._v(" event 模块")]),s._v(" "),a("p",[s._v("上干货")]),s._v(" "),a("div",{staticClass:"language-shell extra-class"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[s._v("event "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    worker_connections "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1024")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n    multi_accept on"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n    use epoll"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])])]),a("p",[s._v("上述配置是针对nginx服务器的工作模式的一些操作配置")]),s._v(" "),a("ul",[a("li",[s._v("worker_connections 指定最大可以同时接收的连接数量，这里一定要注意，最大连接数量是和worker processes共同决定的。")]),s._v(" "),a("li",[s._v("multi_accept 配置指定nginx在收到一个新连接通知后尽可能多的接受更多的连接")]),s._v(" "),a("li",[s._v("use epoll 配置指定了线程轮询的方法，如果是linux2.6+，使用epoll，如果是BSD如Mac请使用Kqueue")])]),s._v(" "),a("h3",{attrs:{id:"http模块"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#http模块"}},[s._v("#")]),s._v(" http模块")]),s._v(" "),a("p",[s._v("作为web服务器，http模块是nginx最核心的一个模块，配置项也是比较多的，项目中会设置到很多的实际业务场景，需要根据硬件信息进行适当的配置，常规情况下，使用默认配置即可！")]),s._v(" "),a("div",{staticClass:"language-shell extra-class"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[s._v("http "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("##")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 基础配置")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("##")]),s._v("\n\n    sendfile on"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n    tcp_nopush on"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n    tcp_nodelay on"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n    keepalive_timeout "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("65")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n    types_hash_max_size "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("2048")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# server_tokens off;")]),s._v("\n\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# server_names_hash_bucket_size 64;")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# server_name_in_redirect off;")]),s._v("\n\n    include /etc/nginx/mime.types"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n    default_type application/octet-stream"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("##")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# SSL证书配置")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("##")]),s._v("\n\n    ssl_protocols TLSv1 TLSv1.1 TLSv1.2"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# Dropping SSLv3, ref: POODLE")]),s._v("\n    ssl_prefer_server_ciphers on"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("##")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 日志配置")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("##")]),s._v("\n\n    access_log /var/log/nginx/access.log"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n    error_log /var/log/nginx/error.log"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("##")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# Gzip 压缩配置")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("##")]),s._v("\n\n    "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("gzip")]),s._v(" on"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n    gzip_disable "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"msie6"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# gzip_vary on;")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# gzip_proxied any;")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# gzip_comp_level 6;")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# gzip_buffers 16 8k;")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# gzip_http_version 1.1;")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# gzip_types text/plain text/css application/json application/javascript")]),s._v("\n text/xml application/xml application/xml+rss text/javascript"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("##")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 虚拟主机配置")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("##")]),s._v("\n\n    include /etc/nginx/conf.d/*.conf"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n    include /etc/nginx/sites-enabled/*"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n")])])]),a("ol",[a("li",[s._v("基础配置")])]),s._v(" "),a("div",{staticClass:"language-shell extra-class"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[s._v("sendfile on：配置on让sendfile发挥作用，将文件的回写过程交给数据缓冲去去完成，而不是放在应用中完成，这样的话在性能提升有有好处\ntc_nopush on：让nginx在一个数据包中发送所有的头文件，而不是一个一个单独发\ntcp_nodelay on：让nginx不要缓存数据，而是一段一段发送，如果数据的传输有实时性的要求的话可以配置它，发送完一小段数据就立刻能得到返回值，但是不要滥用哦\n\nkeepalive_timeout "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("10")]),s._v("：给客户端分配连接超时时间，服务器会在这个时间过后关闭连接。一般设置时间较短，可以让nginx工作持续性更好\nclient_header_timeout "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("10")]),s._v("：设置请求头的超时时间\nclient_body_timeout "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("10")]),s._v(":设置请求体的超时时间\nsend_timeout "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("10")]),s._v("：指定客户端响应超时时间，如果客户端两次操作间隔超过这个时间，服务器就会关闭这个链接\n\nlimit_conn_zone "),a("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$binary_remote_addr")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("zone")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("addr:5m ：设置用于保存各种key的共享内存的参数，\nlimit_conn addr "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("100")]),s._v(": 给定的key设置最大连接数\n\nserver_tokens：虽然不会让nginx执行速度更快，但是可以在错误页面关闭nginx版本提示，对于网站安全性的提升有好处哦\ninclude /etc/nginx/mime.types：指定在当前文件中包含另一个文件的指令\ndefault_type application/octet-stream：指定默认处理的文件类型可以是二进制\ntype_hash_max_size "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("2048")]),s._v("：混淆数据，影响三列冲突率，值越大消耗内存越多，散列key冲突率会降低，检索速度更快；值越小key，占用内存较少，冲突率越高，检索速度变慢\n")])])]),a("ol",{attrs:{start:"2"}},[a("li",[s._v("日志配置")])]),s._v(" "),a("div",{staticClass:"language-shell extra-class"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[s._v("access_log logs/access.log：设置存储访问记录的日志\nerror_log logs/error.log：设置存储记录错误发生的日志\n")])])]),a("ol",{attrs:{start:"3"}},[a("li",[s._v("SSL证书加密")])]),s._v(" "),a("div",{staticClass:"language-shell extra-class"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[s._v("ssl_protocols：指令用于启动特定的加密协议，nginx在1.1.13和1.0.12版本后默认是ssl_protocols SSLv3 TLSv1 TLSv1.1 TLSv1.2，TLSv1.1与TLSv1.2要确保OpenSSL "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1.0")]),s._v(".1 ，SSLv3 现在还有很多地方在用但有不少被攻击的漏洞。\nssl prefer server ciphers：设置协商加密算法时，优先使用我们服务端的加密套件，而不是客户端浏览器的加密套件\n")])])]),a("ol",{attrs:{start:"4"}},[a("li",[s._v("压缩配置")])]),s._v(" "),a("div",{staticClass:"language-shell extra-class"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("gzip")]),s._v(" 是告诉nginx采用gzip压缩的形式发送数据。这将会减少我们发送的数据量。\ngzip_disable 为指定的客户端禁用gzip功能。我们设置成IE6或者更低版本以使我们的方案能够广泛兼容。\ngzip_static 告诉nginx在压缩资源之前，先查找是否有预先gzip处理过的资源。这要求你预先压缩你的文件（在这个例子中被注释掉了），从而允许你使用最高压缩比，这样nginx就不用再压缩这些文件了（想要更详尽的gzip_static的信息，请点击这里）。\ngzip_proxied 允许或者禁止压缩基于请求和响应的响应流。我们设置为any，意味着将会压缩所有的请求。\ngzip_min_length 设置对数据启用压缩的最少字节数。如果一个请求小于1000字节，我们最好不要压缩它，因为压缩这些小的数据会降低处理此请求的所有进程的速度。\ngzip_comp_level 设置数据的压缩等级。这个等级可以是1-9之间的任意数值，9是最慢但是压缩比最大的。我们设置为4，这是一个比较折中的设置。\ngzip_type 设置需要压缩的数据格式。上面例子中已经有一些了，你也可以再添加更多的格式。\n")])])]),a("ol",{attrs:{start:"5"}},[a("li",[s._v("文件缓存配置")])]),s._v(" "),a("div",{staticClass:"language-shell extra-class"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[s._v("open_file_cache 打开缓存的同时也指定了缓存最大数目，以及缓存的时间。我们可以设置一个相对高的最大时间，这样我们可以在它们不活动超过20秒后清除掉。\nopen_file_cache_valid 在open_file_cache中指定检测正确信息的间隔时间。\nopen_file_cache_min_uses 定义了open_file_cache中指令参数不活动时间期间里最小的文件数。\nopen_file_cache_errors 指定了当搜索一个文件时是否缓存错误信息，也包括再次给配置中添加文件。我们也包括了服务器模块，这些是在不同文件中定义的。如果你的服务器模块不在这些位置，你就得修改这一行来指定正确的位置。\n")])])]),a("h3",{attrs:{id:"server模块"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#server模块"}},[s._v("#")]),s._v(" server模块")]),s._v(" "),a("p",[s._v("srever模块配置是http模块中的一个子模块，用来定义一个虚拟访问主机，也就是一个虚拟服务器的配置信息")]),s._v(" "),a("div",{staticClass:"language-shell extra-class"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[s._v("server "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    listen        "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("80")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n    server_name localhost    "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("192.168")]),s._v(".1.100"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n    root        /nginx/www"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n    index        index.php index.html index.html"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n    charset        utf-8"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n    access_log    logs/access.log"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n    error_log    logs/error.log"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("..")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("..")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("..")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])])]),a("p",[s._v("核心配置信息如下：")]),s._v(" "),a("ul",[a("li",[s._v("server：一个虚拟主机的配置，一个http中可以配置多个server")]),s._v(" "),a("li",[s._v("server_name：用力啊指定ip地址或者域名，多个配置之间用空格分隔")]),s._v(" "),a("li",[s._v("root：表示整个server虚拟主机内的根目录，所有当前主机中web项目的根目录")]),s._v(" "),a("li",[s._v("index：用户访问web网站时的全局首页")]),s._v(" "),a("li",[s._v("charset：用于设置www/路径中配置的网页的默认编码格式")]),s._v(" "),a("li",[s._v("access_log：用于指定该虚拟主机服务器中的访问记录日志存放路径")]),s._v(" "),a("li",[s._v("error_log：用于指定该虚拟主机服务器中访问错误日志的存放路径")])]),s._v(" "),a("h3",{attrs:{id:"location模块"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#location模块"}},[s._v("#")]),s._v(" location模块")]),s._v(" "),a("p",[s._v("location模块是nginx配置中出现最多的一个配置，主要用于配置路由访问信息")]),s._v(" "),a("p",[s._v("在路由访问信息配置中关联到反向代理、负载均衡等等各项功能，所以location模块也是一个非常重要的配置模块")]),s._v(" "),a("p",[s._v("基本配置")]),s._v(" "),a("div",{staticClass:"language-shell extra-class"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[s._v("location / "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    root    /nginx/www"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n    index    index.php index.html index.htm"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])])]),a("p",[s._v("location /：表示匹配访问根目录")]),s._v(" "),a("p",[s._v("root：用于指定访问根目录时，访问虚拟主机的web目录")]),s._v(" "),a("p",[s._v("index：在不指定访问具体资源时，默认展示的资源文件列表")]),s._v(" "),a("p",[s._v("反向代理配置方式")]),s._v(" "),a("p",[s._v("通过反向代理代理服务器访问模式，通过proxy_set配置让客户端访问透明化")]),s._v(" "),a("div",{staticClass:"language-shell extra-class"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[s._v("location / "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    proxy_pass http://localhost:8888"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n    proxy_set_header X-real-ip "),a("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$remote_addr")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n    proxy_set_header Host "),a("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$http_host")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])])]),a("p",[s._v("uwsgi配置")]),s._v(" "),a("p",[s._v("wsgi模式下的服务器配置访问方式")]),s._v(" "),a("div",{staticClass:"language-shell extra-class"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[s._v("location / "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    include uwsgi_params"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n    uwsgi_pass localhost:8888\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])])]),a("h3",{attrs:{id:"upstream模块"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#upstream模块"}},[s._v("#")]),s._v(" upstream模块")]),s._v(" "),a("p",[s._v("upstream模块主要负责负载均衡的配置，通过默认的轮询调度方式来分发请求到后端服务器")]),s._v(" "),a("p",[s._v("简单的配置方式如下")]),s._v(" "),a("div",{staticClass:"language-shell extra-class"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[s._v("upstream name "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    ip_hash"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n    server "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("192.168")]),s._v(".1.100:8000"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n    server "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("192.168")]),s._v(".1.100:8001 down"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n    server "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("192.168")]),s._v(".1.100:8002 "),a("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("max_fails")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("3")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n    server "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("192.168")]),s._v(".1.100:8003 "),a("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("fail_timeout")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("20s"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n    server "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("192.168")]),s._v(".1.100:8004 "),a("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("max_fails")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("3")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("fail_timeout")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("20s"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])])]),a("p",[s._v("核心配置信息如下")]),s._v(" "),a("ul",[a("li",[s._v("ip_hash：指定请求调度算法，默认是weight权重轮询调度，可以指定")]),s._v(" "),a("li",[s._v("server host:port：分发服务器的列表配置")]),s._v(" "),a("li",[s._v("-- down：表示该主机暂停服务")]),s._v(" "),a("li",[s._v("-- max_fails：表示失败最大次数，超过失败最大次数暂停服务")]),s._v(" "),a("li",[s._v("-- fail_timeout：表示如果请求受理失败，暂停指定的时间之后重新发起请求")])]),s._v(" "),a("h2",{attrs:{id:"参考文章"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#参考文章"}},[s._v("#")]),s._v(" 参考文章")]),s._v(" "),a("ul",[a("li",[s._v("https://www.cnblogs.com/fengff/p/8892590.html")])])])}),[],!1,null,null,null);t.default=e.exports}}]);