(window.webpackJsonp=window.webpackJsonp||[]).push([[307],{821:function(t,a,s){"use strict";s.r(a);var r=s(53),v=Object(r.a)({},(function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("div",{staticClass:"custom-block tip"},[s("p",{staticClass:"custom-block-title"},[t._v("TIP")]),t._v(" "),s("p",[t._v("本文主要是介绍 MySQL读写分离介绍 。")])]),t._v(" "),s("p"),s("div",{staticClass:"table-of-contents"},[s("ul",[s("li",[s("a",{attrs:{href:"#mycat-http-www-mycat-io-介绍"}},[t._v("MyCAT介绍")])]),s("li",[s("a",{attrs:{href:"#mycat的关键特性"}},[t._v("MyCAT的关键特性")])]),s("li",[s("a",{attrs:{href:"#mycat架构"}},[t._v("MyCAT架构")]),s("ul",[s("li",[s("a",{attrs:{href:"#mycat解决的问题"}},[t._v("Mycat解决的问题")])]),s("li",[s("a",{attrs:{href:"#分片策略"}},[t._v("分片策略")])])])]),s("li",[s("a",{attrs:{href:"#mycat分片策略"}},[t._v("mycat分片策略：")]),s("ul",[s("li",[s("a",{attrs:{href:"#一-global-全局表"}},[t._v("一 global-全局表")])]),s("li",[s("a",{attrs:{href:"#一-sharding-by-intfile"}},[t._v("一 sharding-by-intfile")])]),s("li",[s("a",{attrs:{href:"#一-mod-long"}},[t._v("一 mod-long")])]),s("li",[s("a",{attrs:{href:"#一-crc32slot"}},[t._v("一 crc32slot")])]),s("li",[s("a",{attrs:{href:"#一-sharding-by-murmur"}},[t._v("一 sharding-by-murmur")])]),s("li",[s("a",{attrs:{href:"#一-sharding-by-month"}},[t._v("一 sharding-by-month")])]),s("li",[s("a",{attrs:{href:"#一-auto-sharding-long"}},[t._v("一 auto-sharding-long")])])])]),s("li",[s("a",{attrs:{href:"#mycat读写分离"}},[t._v("Mycat读写分离")])]),s("li",[s("a",{attrs:{href:"#mysql的主从复制"}},[t._v("Mysql的主从复制")])]),s("li",[s("a",{attrs:{href:"#参考文章"}},[t._v("参考文章")])])])]),s("p"),t._v(" "),s("p",[t._v("Mysql读写分离最常用的解决方案就是MyCat了，本文的主要是Mycat的一个初步的原理和介绍。")]),t._v(" "),s("h2",{attrs:{id:"mycat介绍"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#mycat介绍"}},[t._v("#")]),t._v(" "),s("a",{attrs:{href:"http://www.mycat.io/",target:"_blank",rel:"noopener noreferrer"}},[t._v("MyCAT"),s("OutboundLink")],1),t._v("介绍")]),t._v(" "),s("p",[s("strong",[t._v("简单的说，MyCAT就是：")])]),t._v(" "),s("p",[t._v("一个彻底开源的，面向企业应用开发的“"),s("strong",[t._v("大数据库集群")]),t._v("”")]),t._v(" "),s("p",[t._v("支持"),s("strong",[t._v("事务")]),t._v("、"),s("strong",[t._v("ACID")]),t._v("（指数据库事务正确执行的四个基本要素的缩写。包含:原子性(Atomicity)、一致性(Consistency)、隔离性(Isolation)、持久性(Durability)）、"),s("strong",[t._v("可以替代Mysql")]),t._v("的加强版数据库")]),t._v(" "),s("p",[t._v("一个可以视为“Mysql”集群的企业级数据库，用来替代昂贵的Oracle集群")]),t._v(" "),s("p",[t._v("一个融合内存缓存技术、Nosql技术、HDFS大数据的新型SQL Server")]),t._v(" "),s("p",[t._v("结合传统数据库和新型分布式数据仓库的新一代企业级数据库产品")]),t._v(" "),s("p",[t._v("一个新颖的数据库中间件产品")]),t._v(" "),s("p",[t._v("MyCAT的目标是："),s("strong",[t._v("低成本的将现有的单机数据库和应用平滑迁移到“云”端，解决数据存储和业务规模迅速增长情况下的数据瓶颈问题。")])]),t._v(" "),s("h2",{attrs:{id:"mycat的关键特性"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#mycat的关键特性"}},[t._v("#")]),t._v(" MyCAT的关键特性")]),t._v(" "),s("p",[t._v("支持 SQL 92标准")]),t._v(" "),s("p",[t._v("支持Mysql集群，可以作为Proxy使用")]),t._v(" "),s("p",[t._v("支持JDBC连接ORACLE、DB2、SQL Server，将其模拟为MySQL Server使用")]),t._v(" "),s("p",[t._v("支持galera for mysql集群，percona-cluster或者mariadb cluster，提供高可用性数据分片集群")]),t._v(" "),s("p",[t._v("自动故障切换，高可用性")]),t._v(" "),s("p",[t._v("支持读写分离，支持Mysql双主多从，以及一主多从的模式")]),t._v(" "),s("p",[t._v("支持全局表，数据自动分片到多个节点，用于高效表关联查询")]),t._v(" "),s("p",[t._v("支持独有的基于E-R 关系的分片策略，实现了高效的表关联查询")]),t._v(" "),s("p",[t._v("多平台支持，部署和实施简单")]),t._v(" "),s("h2",{attrs:{id:"mycat架构"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#mycat架构"}},[t._v("#")]),t._v(" MyCAT架构")]),t._v(" "),s("img",{staticClass:"zoom-custom-imgs",attrs:{src:t.$withBase("/assets/img/db/mysqlopt2/mycat-1.png"),alt:"wxmp"}}),t._v(" "),s("h3",{attrs:{id:"mycat解决的问题"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#mycat解决的问题"}},[t._v("#")]),t._v(" Mycat解决的问题")]),t._v(" "),s("p",[t._v("l 性能问题")]),t._v(" "),s("p",[t._v("l 数据库连接过多")]),t._v(" "),s("p",[t._v("l E-R分片难处理")]),t._v(" "),s("p",[t._v("l 可用性问题")]),t._v(" "),s("p",[t._v("l 成本和伸缩性问题")]),t._v(" "),s("img",{staticClass:"zoom-custom-imgs",attrs:{src:t.$withBase("/assets/img/db/mysqlopt2/mycat-2.png"),alt:"wxmp"}}),t._v(" "),s("h3",{attrs:{id:"分片策略"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#分片策略"}},[t._v("#")]),t._v(" 分片策略")]),t._v(" "),s("p",[t._v("MyCAT支持水平分片与垂直分片：")]),t._v(" "),s("p",[t._v("水平分片：一个表格的数据分割到多个节点上，按照行分隔。")]),t._v(" "),s("p",[t._v("垂直分片：一个数据库中多个表格A，B，C，A存储到节点1上，B存储到节点2上，C存储到节点3上。")]),t._v(" "),s("img",{staticClass:"zoom-custom-imgs",attrs:{src:t.$withBase("/assets/img/db/mysqlopt2/mycat-3.png"),alt:"wxmp"}}),t._v(" "),s("p",[t._v("MyCAT通过定义表的分片规则来实现分片，每个表格可以捆绑一个分片规则，每个分片规则指定一个分片字段并绑定一个函数，来实现动态分片算法。")]),t._v(" "),s("p",[t._v("1、"),s("strong",[t._v("Schema")]),t._v("：逻辑库，与MySQL中的Database（数据库）对应，一个逻辑库中定义了所包括的Table。")]),t._v(" "),s("p",[t._v("2、"),s("strong",[t._v("Table")]),t._v("：表，即物理数据库中存储的某一张表，与传统数据库不同，这里的表格需要声明其所存储的逻辑数据节点DataNode。"),s("strong",[t._v("在此可以指定表的分片规则。")])]),t._v(" "),s("p",[t._v("3、"),s("strong",[t._v("DataNode")]),t._v("：MyCAT的逻辑数据节点，是存放table的具体物理节点，也称之为分片节点，通过DataSource来关联到后端某个具体数据库上")]),t._v(" "),s("p",[t._v("4、"),s("strong",[t._v("DataSource")]),t._v("：定义某个物理库的访问地址，用于捆绑到Datanode上")]),t._v(" "),s("h2",{attrs:{id:"mycat分片策略"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#mycat分片策略"}},[t._v("#")]),t._v(" mycat分片策略：")]),t._v(" "),s("h3",{attrs:{id:"一-global-全局表"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#一-global-全局表"}},[t._v("#")]),t._v(" 一 global-全局表")]),t._v(" "),s("p",[t._v("指定type为global，该表在所有的db存储的数据一致。")]),t._v(" "),s("h3",{attrs:{id:"一-sharding-by-intfile"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#一-sharding-by-intfile"}},[t._v("#")]),t._v(" 一 sharding-by-intfile")]),t._v(" "),s("p",[t._v("某些业务，不同的省，存储在不同的database中。")]),t._v(" "),s("p",[t._v("columns:表示字段")]),t._v(" "),s("p",[t._v("algorithm:指定方法")]),t._v(" "),s("h3",{attrs:{id:"一-mod-long"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#一-mod-long"}},[t._v("#")]),t._v(" 一 mod-long")]),t._v(" "),s("p",[t._v("求余数")]),t._v(" "),s("h3",{attrs:{id:"一-crc32slot"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#一-crc32slot"}},[t._v("#")]),t._v(" 一 crc32slot")]),t._v(" "),s("p",[t._v("注意：指定此分片规则，表格需重建。（自动添加_slot字段）")]),t._v(" "),s("h3",{attrs:{id:"一-sharding-by-murmur"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#一-sharding-by-murmur"}},[t._v("#")]),t._v(" 一 sharding-by-murmur")]),t._v(" "),s("p",[t._v("一致性hash")]),t._v(" "),s("h3",{attrs:{id:"一-sharding-by-month"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#一-sharding-by-month"}},[t._v("#")]),t._v(" 一 sharding-by-month")]),t._v(" "),s("h3",{attrs:{id:"一-auto-sharding-long"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#一-auto-sharding-long"}},[t._v("#")]),t._v(" 一 auto-sharding-long")]),t._v(" "),s("p",[t._v("根据指定的范围进行分片")]),t._v(" "),s("h2",{attrs:{id:"mycat读写分离"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#mycat读写分离"}},[t._v("#")]),t._v(" Mycat读写分离")]),t._v(" "),s("p",[t._v("数据库读写分离对于大型系统或者访问量很高的互联网应用来说，是必不可少的一个重要功能。对于MySQL来说，标准的读写分离是主从模式，一个写节点Master后面跟着多个读节点，读节点的数量取决于系统的压力，通常是1-3个读节点的配置")]),t._v(" "),s("img",{staticClass:"zoom-custom-imgs",attrs:{src:t.$withBase("/assets/img/db/mysqlopt2/mycat-4.png"),alt:"wxmp"}}),t._v(" "),s("p",[t._v("Mycat读写分离和自动切换机制，需要mysql的主从复制机制配合。")]),t._v(" "),s("h2",{attrs:{id:"mysql的主从复制"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#mysql的主从复制"}},[t._v("#")]),t._v(" Mysql的主从复制")]),t._v(" "),s("img",{staticClass:"zoom-custom-imgs",attrs:{src:t.$withBase("/assets/img/db/mysqlopt2/mycat-5.png"),alt:"wxmp"}}),t._v(" "),s("p",[t._v("主从配置需要注意的地方")]),t._v(" "),s("p",[t._v("1、主DB server和从DB server数据库的版本一致")]),t._v(" "),s("p",[t._v("2、主DB server和从DB server数据库数据一致[ 这里就会可以把主的备份在从上还原，也可以直接将主的数据目录拷贝到从的相应数据目录]")]),t._v(" "),s("p",[t._v("3、主DB server开启二进制日志,主DB server和从DB server的server_id都必须唯一")]),t._v(" "),s("p",[t._v("作　　者： "),s("strong",[s("a",{attrs:{href:"http://www.cnblogs.com/lxcy/",target:"_blank",rel:"noopener noreferrer"}},[t._v("Jony.K.Chen"),s("OutboundLink")],1)]),t._v("\n出　　处：http://www.cnblogs.com/lxcy/\n版权声明：本文版权归作者和博客园共有，欢迎转载，但未经作者同意必须保留此段声明，且在文章页面明显位置给出原文链接。")]),t._v(" "),s("h2",{attrs:{id:"参考文章"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#参考文章"}},[t._v("#")]),t._v(" 参考文章")]),t._v(" "),s("ul",[s("li",[t._v("https://www.cnblogs.com/lxcy/p/8530791.html")])])])}),[],!1,null,null,null);a.default=v.exports}}]);