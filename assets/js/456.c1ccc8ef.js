(window.webpackJsonp=window.webpackJsonp||[]).push([[456],{971:function(a,e,n){"use strict";n.r(e);var t=n(53),_=Object(t.a)({},(function(){var a=this,e=a.$createElement,n=a._self._c||e;return n("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[n("div",{staticClass:"custom-block tip"},[n("p",{staticClass:"custom-block-title"},[a._v("TIP")]),a._v(" "),n("p",[a._v("本文主要是介绍 HDFS-基础介绍 。")])]),a._v(" "),n("p"),n("div",{staticClass:"table-of-contents"},[n("ul",[n("li",[n("a",{attrs:{href:"#一、hdfs简介及基本概念"}},[a._v("一、HDFS简介及基本概念")])]),n("li",[n("a",{attrs:{href:"#一-hdfs简介及其基本概念"}},[a._v("（一）HDFS简介及其基本概念")]),n("ul",[n("li",[n("a",{attrs:{href:"#_1、hdfs数据块"}},[a._v("1、HDFS数据块")])]),n("li",[n("a",{attrs:{href:"#_2、namenode和datanode"}},[a._v("2、namenode和datanode")])]),n("li",[n("a",{attrs:{href:"#_3、块缓存"}},[a._v("3、块缓存")])]),n("li",[n("a",{attrs:{href:"#_4、联邦hdfs"}},[a._v("4、联邦HDFS")])]),n("li",[n("a",{attrs:{href:"#_5、hdfs的高可用性"}},[a._v("5、HDFS的高可用性")])])])]),n("li",[n("a",{attrs:{href:"#参考文章"}},[a._v("参考文章")])])])]),n("p"),a._v(" "),n("h2",{attrs:{id:"一、hdfs简介及基本概念"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#一、hdfs简介及基本概念"}},[a._v("#")]),a._v(" 一、HDFS简介及基本概念")]),a._v(" "),n("p",[a._v("当需要存储的数据集的大小超过了一台独立的物理计算机的存储能力时，就需要对数据进行分区并存储到若干台计算机上去。管理网络中跨多台计算机存储的文件系统统称为"),n("strong",[a._v("分布式文件系统（distributed fileSystem）")]),a._v("。")]),a._v(" "),n("p",[a._v("分布式文件系统由于其跨计算机的特性，所以依赖于网络的传输，势必会比普通的本地文件系统更加复杂，比如：如何使得文件系统能够容忍节点的故障并且保证不丢失数据，这就是一个很大的挑战。")]),a._v(" "),n("hr"),a._v(" "),n("p",[a._v("本文相当于《Hadoop权威指南》的读书笔记。")]),a._v(" "),n("h2",{attrs:{id:"一-hdfs简介及其基本概念"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#一-hdfs简介及其基本概念"}},[a._v("#")]),a._v(" （一）HDFS简介及其基本概念")]),a._v(" "),n("p",[a._v("HDFS（Hadoop Distributed File System）是hadoop生态系统的一个重要组成部分，是hadoop中的的存储组件，在整个Hadoop中的地位非同一般，是最基础的一部分，因为它涉及到数据存储，MapReduce等计算模型都要依赖于存储在HDFS中的数据。HDFS是一个分布式文件系统，以流式数据访问模式存储超大文件，将数据分块存储到一个商业硬件集群内的不同机器上。")]),a._v(" "),n("p",[a._v("这里重点介绍其中涉及到的几个概念：\n-（1）"),n("strong",[a._v("超大文件")]),a._v("。目前的hadoop集群能够存储几百TB甚至PB级的数据。\n-（2）"),n("strong",[a._v("流式数据访问")]),a._v("。HDFS的访问模式是："),n("strong",[a._v("一次写入，多次读取")]),a._v("，更加关注的是读取整个数据集的整体时间。\n-（3）"),n("strong",[a._v("商用硬件")]),a._v("。HDFS集群的设备不需要多么昂贵和特殊，只要是一些日常使用的普通硬件即可，正因为如此，hdfs节点故障的可能性还是很高的，所以"),n("strong",[a._v("必须要有机制来处理这种单点故障")]),a._v("，保证数据的可靠。\n-（4）"),n("strong",[a._v("不支持低时间延迟的数据访问")]),a._v("。hdfs关心的是高数据吞吐量，不适合那些要求低时间延迟数据访问的应用。\n-（5）"),n("strong",[a._v("单用户写入，不支持任意修改")]),a._v("。hdfs的数据以读为主，只支持单个写入者，并且写操作总是以添加的形式在文末追加，不支持在任意位置进行修改。")]),a._v(" "),n("h3",{attrs:{id:"_1、hdfs数据块"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_1、hdfs数据块"}},[a._v("#")]),a._v(" 1、HDFS数据块")]),a._v(" "),n("p",[a._v("每个磁盘都有默认的数据块大小，这是文件系统进行数据读写的最小单位。这涉及到磁盘的相应知识，这里我们不多讲，后面整理一篇博客来记录一下磁盘的相应知识。")]),a._v(" "),n("p",[a._v("HDFS同样也有数据块的概念，默认一个块（block）的大小为128MB（HDFS的块这么大主要是为了最小化寻址开销），要在HDFS中存储的文件可以划分为多个分块，每个分块可以成为一个独立的存储单元。与本地磁盘不同的是，HDFS中小于一个块大小的文件并不会占据整个HDFS数据块。")]),a._v(" "),n("p",[a._v("对HDFS存储进行分块有很多好处：")]),a._v(" "),n("ul",[n("li",[a._v("一个文件的大小可以大于网络中任意一个磁盘的容量，文件的块可以利用集群中的任意一个磁盘进行存储。")]),a._v(" "),n("li",[a._v("使用抽象的块，而不是整个文件作为存储单元，可以简化存储管理，使得文件的元数据可以单独管理。")]),a._v(" "),n("li",[a._v("冗余备份。数据块非常适合用于数据备份，进而可以提供数据容错能力和提高可用性。每个块可以有多个备份（默认为三个），分别保存到相互独立的机器上去，这样就可以保证单点故障不会导致数据丢失。")])]),a._v(" "),n("h3",{attrs:{id:"_2、namenode和datanode"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_2、namenode和datanode"}},[a._v("#")]),a._v(" 2、namenode和datanode")]),a._v(" "),n("p",[a._v("HDFS集群的节点分为两类：namenode和datanode，以管理节点-工作节点的模式运行，即一个namenode和多个datanode，理解这两类节点对理解HDFS工作机制非常重要。")]),a._v(" "),n("p",[a._v("namenode作为管理节点，它负责整个文件系统的命名空间，并且维护着文件系统树和整棵树内所有的文件和目录，这些信息以两个文件的形式（命名空间镜像文件和编辑日志文件）永久存储在namenode 的本地磁盘上。除此之外，同时，namenode也记录每个文件中各个块所在的数据节点信息，但是不永久存储块的位置信息，因为块的信息可以在系统启动时重新构建。")]),a._v(" "),n("p",[a._v("datanode作为文件系统的工作节点，根据需要存储并检索数据块，定期向namenode发送他们所存储的块的列表。")]),a._v(" "),n("img",{staticClass:"zoom-custom-imgs",attrs:{src:a.$withBase("/assets/img/ds/hdfs/intro-1.png"),alt:"wxmp"}}),a._v(" "),n("p",[a._v("由此可见，namenode作为管理节点，它的地位是非同寻常的，一旦namenode宕机，那么所有文件都会丢失，因为namenode是唯一存储了元数据、文件与数据块之间对应关系的节点，所有文件信息都保存在这里，namenode毁坏后无法重建文件。因此，必须高度重视namenode的容错性。")]),a._v(" "),n("p",[a._v("为了使得namenode更加可靠，hadoop提供了两种机制：")]),a._v(" "),n("ul",[n("li",[n("p",[a._v("第一种机制是备份那些组成文件系统元数据持久状态的文件，比如：将文件系统的信息写入本地磁盘的同时，也写入一个远程挂载的网络文件系统（NFS），这些写操作实时同步并且保证原子性。")])]),a._v(" "),n("li",[n("p",[a._v("第二种机制是运行一个辅助namenode，用以保存命名空间镜像的副本，在namenode发生故障时启用。（也可以使用热备份namenode代替辅助namenode）。")])])]),a._v(" "),n("img",{staticClass:"zoom-custom-imgs",attrs:{src:a.$withBase("/assets/img/ds/hdfs/intro-2.png"),alt:"wxmp"}}),a._v(" "),n("h3",{attrs:{id:"_3、块缓存"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_3、块缓存"}},[a._v("#")]),a._v(" 3、块缓存")]),a._v(" "),n("p",[a._v("数据通常情况下都保存在磁盘，但是对于访问频繁的文件，其对应的数据块可能被显式的缓存到datanode的内存中，以堆外缓存的方式存在，一些计算任务（比如mapreduce）可以在缓存了数据的datanode上运行，利用块的缓存优势提高读操作的性能。")]),a._v(" "),n("h3",{attrs:{id:"_4、联邦hdfs"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_4、联邦hdfs"}},[a._v("#")]),a._v(" 4、联邦HDFS")]),a._v(" "),n("p",[a._v("namenode在内存中保存了文件系统中每个文件和每个数据块的引用关系，这意味着，当文件足够多时，namenode的内存将成为限制系统横向扩展的瓶颈。hadoop2.0引入了联邦HDFS允许系统通过添加namenode的方式实现扩展，每个namenode管理文件系统命名空间中的一部分，比如：一个namenode管理/usr下的文件，另外一个namenode管理/share目录下的文件。")]),a._v(" "),n("h3",{attrs:{id:"_5、hdfs的高可用性"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_5、hdfs的高可用性"}},[a._v("#")]),a._v(" 5、HDFS的高可用性")]),a._v(" "),n("p",[a._v("通过备份namenode存储的文件信息或者运行辅助namenode可以防止数据丢失，但是依旧没有保证了系统的高可用性。一旦namenode发生了单点失效，那么必须能够快速的启动一个拥有文件系统信息副本的新namenode，而这个过程需要以下几步：")]),a._v(" "),n("p",[a._v("（1）将命名空间的副本映像导入内存")]),a._v(" "),n("p",[a._v("（2）重新编辑日志")]),a._v(" "),n("p",[a._v("（3）接收足够多来自datanode的数据块报告，从而重建起数据块与位置的对应关系。")]),a._v(" "),n("p",[a._v("上述实际上就是一个namenode的冷启动过程，但是在数据量足够大的情况下，这个冷启动可能需要30分钟以上的时间，这是无法忍受的。")]),a._v(" "),n("p",[a._v("Hadoop2.0开始，增加了对高可用性的支持。采用了双机热备份的方式。同时使用一对活动-备用namenode，当活动namenode失效后，备用namenode可以迅速接管它的任务，这中间不会有任何的中断，以至于使得用户根本无法察觉。")]),a._v(" "),n("p",[a._v("为了实现这种双机热备份，HDFS架构需要作出以下几个改变：")]),a._v(" "),n("ul",[n("li",[a._v("两个namenode之间要通过高可用共享存储来实现编辑日志的共享")]),a._v(" "),n("li",[a._v("datanode要同时向两个namenode发送数据块的报告信息")]),a._v(" "),n("li",[a._v("客户端要使用特定机制来处理namenode的失效问题")]),a._v(" "),n("li",[a._v("备用namenode要为活动namenode设置周期性的检查点，从中判断活动namenode是否失效")])]),a._v(" "),n("p",[a._v("HDFS系统中运行着一个故障转移控制器，管理着将活动namenode转移为备用namenode的转换过程。同时，每一个namenode也运行着一个轻量级的故障转移控制器，主要目的就是监视宿主namenode是否失效，并在失效时实现迅速切换。")]),a._v(" "),n("h2",{attrs:{id:"参考文章"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#参考文章"}},[a._v("#")]),a._v(" 参考文章")]),a._v(" "),n("ul",[n("li",[a._v("https://www.cnblogs.com/gzshan/p/10981007.html")])])])}),[],!1,null,null,null);e.default=_.exports}}]);