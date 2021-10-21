(window.webpackJsonp=window.webpackJsonp||[]).push([[474],{989:function(s,a,t){"use strict";t.r(a);var e=t(53),r=Object(e.a)({},(function(){var s=this,a=s.$createElement,t=s._self._c||a;return t("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[t("div",{staticClass:"custom-block tip"},[t("p",{staticClass:"custom-block-title"},[s._v("TIP")]),s._v(" "),t("p",[s._v("本文主要是介绍 CDH-CM基础知识 。")])]),s._v(" "),t("p"),t("div",{staticClass:"table-of-contents"},[t("ul",[t("li",[t("a",{attrs:{href:"#cloudra-manager概述"}},[s._v("Cloudra Manager概述")]),t("ul",[t("li",[t("a",{attrs:{href:"#cloudramanager技术构成"}},[s._v("CloudraManager技术构成")])])])]),t("li",[t("a",{attrs:{href:"#【-】"}},[s._v("【----------------------------】")])]),t("li",[t("a",{attrs:{href:"#一、cloudera-manager-介绍"}},[s._v("一、Cloudera Manager 介绍")])]),t("li",[t("a",{attrs:{href:"#二、安装前环境搭建"}},[s._v("二、安装前环境搭建")]),t("ul",[t("li",[t("a",{attrs:{href:"#_1-网络配置-所有节点"}},[s._v("1 .网络配置( 所有节点)")])]),t("li",[t("a",{attrs:{href:"#_3-关闭-防火墙"}},[s._v("3. 关闭 防火墙")])]),t("li",[t("a",{attrs:{href:"#_4-关闭-selinux"}},[s._v("4.关闭 SELINUX")])]),t("li",[t("a",{attrs:{href:"#_5-安装-jdk"}},[s._v("5.安装 JDK")])]),t("li",[t("a",{attrs:{href:"#_6-设置-ntp"}},[s._v("6. 设置 NTP")])]),t("li",[t("a",{attrs:{href:"#_7-安装-配置-mysql"}},[s._v("7.安装 配置 MySql")])]),t("li",[t("a",{attrs:{href:"#_8-下载依赖包"}},[s._v("8.下载依赖包")])])])]),t("li",[t("a",{attrs:{href:"#三、cm安装"}},[s._v("三、CM安装")]),t("ul",[t("li",[t("a",{attrs:{href:"#_1-安装-cloudera-manager-server-agent"}},[s._v("1 . 安装 Cloudera Manager Server&Agent")])]),t("li",[t("a",{attrs:{href:"#_2-创建用户-cloudera-scm-所有-节点"}},[s._v("2 . 创建用户 cloudera-scm （ 所有 节点）")])]),t("li",[t("a",{attrs:{href:"#_3-配置-cm-agent"}},[s._v("3 . 配置 CM Agent")])]),t("li",[t("a",{attrs:{href:"#_4-配置-cm-server-的-数据库"}},[s._v("4 . 配置 CM Server 的 数据库")])]),t("li",[t("a",{attrs:{href:"#_5-创建-parcel-目录"}},[s._v("5. 创建 Parcel 目录")])]),t("li",[t("a",{attrs:{href:"#_6-启动-cm-manager-agent-服务"}},[s._v("6. 启动 CM Manager&Agent 服务")])])])]),t("li",[t("a",{attrs:{href:"#四、cdh5-5-安装"}},[s._v("四、CDH5 5  安装")])]),t("li",[t("a",{attrs:{href:"#参考文章"}},[s._v("参考文章")])])])]),t("p"),s._v(" "),t("h2",{attrs:{id:"cloudra-manager概述"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#cloudra-manager概述"}},[s._v("#")]),s._v(" Cloudra Manager概述")]),s._v(" "),t("p",[s._v("Cloudra Manager简称CM，它是一个web操作平台，可以借助安装CDH然后安装多种Hadoop框架。")]),s._v(" "),t("h3",{attrs:{id:"cloudramanager技术构成"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#cloudramanager技术构成"}},[s._v("#")]),s._v(" CloudraManager技术构成")]),s._v(" "),t("p",[s._v("Clients:客户端，通过web页面和ClouderaManager和服务器进行交互。")]),s._v(" "),t("p",[s._v("API：通过API和ClouderaManagement和服务器进行交互")]),s._v(" "),t("p",[s._v("Cloudera Repository：存储分发安装包")]),s._v(" "),t("p",[s._v("Management Server：进行监控和预警")]),s._v(" "),t("p",[s._v("Database：存储预警信息和配置信息。")]),s._v(" "),t("p",[s._v("Agent：分布在多台服务器，负责配置，启动和停止进程。监控主机。")]),s._v(" "),t("p",[s._v("结构图如下：")]),s._v(" "),t("img",{staticClass:"zoom-custom-imgs",attrs:{src:s.$withBase("/assets/img/dw/cdh/cmintro-1.png"),alt:"wxmp"}}),s._v(" "),t("h2",{attrs:{id:"【-】"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#【-】"}},[s._v("#")]),s._v(" 【----------------------------】")]),s._v(" "),t("h2",{attrs:{id:"一、cloudera-manager-介绍"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#一、cloudera-manager-介绍"}},[s._v("#")]),s._v(" 一、Cloudera Manager 介绍")]),s._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",[t("code",[s._v("  Cloudra Manager简称CM，它是一个web操作平台，可以借助安装CDH然后安装多种Hadoop框架。\n")])])]),t("p",[s._v("Cloudera Manager是一个管理CDH的端到端的应用。\n　　  作用：\n　　　　– 管理\n　　　　– 监控\n　　　　– 诊断\n　　　　– 集成")]),s._v(" "),t("p",[s._v("架构")]),s._v(" "),t("img",{staticClass:"zoom-custom-imgs",attrs:{src:s.$withBase("/assets/img/dw/cdh/cminstall/183233-20160318224223834-188680934.png"),alt:"wxmp"}}),s._v(" "),t("p",[s._v("Server\n　　　　– 管理控制台服务器和应用程序逻辑\n　　　　– 负责软件安装、配置，启动和停止服务\n　　　　– 管理服务运行的群集\n　　  Agent\n　　　　– 安装在每台主机上\n　　　　– 负责启动和停止进程，配置，监控主机\n　　  Management Service\n　　　　– 由一组角色组成的服务，执行各种监视、报警和报告功能\n　　  Database\n　　  Cloudera Repository\n　　  Clients\n　　　　  Admin Console\n　　　　  API")]),s._v(" "),t("h2",{attrs:{id:"二、安装前环境搭建"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#二、安装前环境搭建"}},[s._v("#")]),s._v(" 二、安装前环境搭建")]),s._v(" "),t("h3",{attrs:{id:"_1-网络配置-所有节点"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1-网络配置-所有节点"}},[s._v("#")]),s._v(" 1 .网络配置( 所有节点)")]),s._v(" "),t("p",[s._v("vi /etc/sysconfig/network 修改 hostname：")]),s._v(" "),t("img",{staticClass:"zoom-custom-imgs",attrs:{src:s.$withBase("/assets/img/dw/cdh/cminstall/183233-20160318224520849-74277443.png"),alt:"wxmp"}}),s._v("\n　　　　通过 service network restart 重启网络服务生效\n"),t("p",[s._v("vi /etc/hosts ,修改 ip 与主机名的对应关系")]),s._v(" "),t("img",{staticClass:"zoom-custom-imgs",attrs:{src:s.$withBase("/assets/img/dw/cdh/cminstall/183233-20160318224603146-172124452.png"),alt:"wxmp"}}),s._v("\n### 2 .SSH 免密码登录\n"),t("div",{staticClass:"language-shell extra-class"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[s._v("　　　　主节点执行：\n　　　　ssh-keygen -t dsa -P "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("''")]),s._v(" -f ~/.ssh/id_dsa\n　　　　生成无密码密钥对\n\n　　　　"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("cat")]),s._v(" ~/.ssh/id_dsa.pub "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">>")]),s._v(" ~/.ssh/authorized_keys\n\n　　　　然后将公钥添加到其他节点的authorized_keys上：\n\n　　　　$ "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("scp")]),s._v(" ~/.ssh/id_dsa.pub root@node6:/opt\n　　　　$ "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("scp")]),s._v(" ~/.ssh/id_dsa.pub root@node7:/opt\n　　　　$ "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("scp")]),s._v(" ~/.ssh/id_dsa.pub root@node8:/opt\n　　　　"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#然后分别登录这三台虚拟机，将公钥覆盖到公钥中")]),s._v("\n　　　　$ "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("cat")]),s._v(" /opt/id_dsa.pub "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">>")]),s._v(" ~/.ssh/authorized_keys\n\n\n　　　　测试：主节点 "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("ssh")]),s._v(" 其他节点 ……"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" 如果不能成功的话，则先在其他节点让做其他节点自己的免密码登录即：分别在节点上使用命令 ssh-keygen -t dsa -P "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("''")]),s._v(" -f ~/.ssh/id_dsa\n\n　　　　然后再重复上面操作\n")])])]),t("h3",{attrs:{id:"_3-关闭-防火墙"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_3-关闭-防火墙"}},[s._v("#")]),s._v(" 3. 关闭 防火墙")]),s._v(" "),t("div",{staticClass:"language-shell extra-class"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[s._v("　　　　临时关闭：\n　　　　"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("service")]),s._v(" iptables stop\n　　　　永久关闭（重启后生效）：\n　　　　"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("chkconfig")]),s._v(" iptables off\n")])])]),t("h3",{attrs:{id:"_4-关闭-selinux"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_4-关闭-selinux"}},[s._v("#")]),s._v(" 4.关闭 SELINUX")]),s._v(" "),t("div",{staticClass:"language-shell extra-class"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[s._v("　　　　临时关闭：\n　　　　setenforce "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("\n　　　　修改配置文件/etc/selinux/config（重启生效） ：\n　　　　将 "),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("SELINUX")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("enforcing 改为 "),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("SELINUX")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("disabled\n　　　　查看 SELINUX 状态：\n　　　　"),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("  /usr/sbin/sestatus –v\n　　　　SELinux status: enabled（enabled：开启；disabled：关闭）\n　　　　"),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("2")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" 使用命令：getenforce\n\n")])])]),t("h3",{attrs:{id:"_5-安装-jdk"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_5-安装-jdk"}},[s._v("#")]),s._v(" 5.安装 JDK")]),s._v(" "),t("div",{staticClass:"language-shell extra-class"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[s._v("　　　　本文采用 RPM 包安装…….执行：\n　　　　"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("rpm")]),s._v(" -ivh jdk-7u80-linux-x64.rpm\n　　　　配置环境变量，修改/root/.bash_profile：\n　　　　"),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("export")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("JAVA_HOME")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("/usr/java/jdk1.7.0_80\n　　　　"),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("export")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[t("span",{pre:!0,attrs:{class:"token environment constant"}},[s._v("PATH")])]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$JAVA_HOME")]),s._v("/bin:"),t("span",{pre:!0,attrs:{class:"token environment constant"}},[s._v("$PATH")]),s._v("\n　　　　"),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("export")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("CLASSPATH")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(".:"),t("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$JAVA_HOMdE")]),s._v("/lib/dt.jar:"),t("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$JAVA_HOME")]),s._v("/lib/tools.jar　　\n\n　　　　生效：\n　　　　"),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("source")]),s._v(" /etc/profile\n　　　　查看版本：\n　　　　"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("root@slave6 cdh"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# java -version")]),s._v("\n　　　　java version "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"1.7.0_80"')]),s._v("\n　　　　Java"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("TM"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" SE Runtime Environment "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("build "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("1.7")]),s._v(".0_80-b15"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n　　　　Java HotSpot"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("TM"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("64")]),s._v("-Bit Server VM "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("build "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("24.80")]),s._v("-b11, mixed mode"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n")])])]),t("h3",{attrs:{id:"_6-设置-ntp"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_6-设置-ntp"}},[s._v("#")]),s._v(" 6. 设置 NTP")]),s._v(" "),t("div",{staticClass:"language-shell extra-class"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[s._v("　　　　所有节点安装 NTP：\n　　　　yum "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("install")]),s._v(" ntp\n　　　　配置开机启动：\n　　　　"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("chkconfig")]),s._v(" ntpd on\n　　　　检查是否设置成功：\n　　　　"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("chkconfig")]),s._v(" --list ntpd （2-5 为 on 状态则成功）\n　　　　设置同步：\n　　　　ntpdate -u ntp.sjtu.edu.cn（时钟服务器根据实际环境设置、本文采用 "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("210.72")]),s._v(".145.44-国家授时中心服务器 IP 地址）\n")])])]),t("h3",{attrs:{id:"_7-安装-配置-mysql"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_7-安装-配置-mysql"}},[s._v("#")]),s._v(" 7.安装 配置 MySql")]),s._v(" "),t("p",[s._v("可使用Yum自带的Mysql  使用命令 yum install mysql-server")]),s._v(" "),t("h3",{attrs:{id:"_8-下载依赖包"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_8-下载依赖包"}},[s._v("#")]),s._v(" 8.下载依赖包")]),s._v(" "),t("div",{staticClass:"language-shell extra-class"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[s._v("　　　　yum -y "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("install")]),s._v("  "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("chkconfig")]),s._v("  python  bind-utils  psmisc  libxslt  zlib  sqlite  cyrus-sasl-plain  cyrus-sasl-gssapi  fuse  fuse-libs  redhat-lsb\n")])])]),t("h2",{attrs:{id:"三、cm安装"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#三、cm安装"}},[s._v("#")]),s._v(" 三、CM安装")]),s._v(" "),t("h3",{attrs:{id:"_1-安装-cloudera-manager-server-agent"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1-安装-cloudera-manager-server-agent"}},[s._v("#")]),s._v(" 1 . 安装 Cloudera Manager Server&Agent")]),s._v(" "),t("div",{staticClass:"language-shell extra-class"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[s._v("　　　　拷贝 cloudera-manager-el6-cm5.4.3_x86_64.tar.gz 到所有 Server、Agent 节点\n　　　　创建 cm 目录：\n　　　　"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("mkdir")]),s._v(" /opt/cloudera-manager\n　　　　解压 cm 压缩包：\n　　　　"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("tar")]),s._v(" xvzf cloudera-manager*.tar.gz -C /opt/cloudera-manager\n")])])]),t("h3",{attrs:{id:"_2-创建用户-cloudera-scm-所有-节点"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_2-创建用户-cloudera-scm-所有-节点"}},[s._v("#")]),s._v(" 2 . 创建用户 cloudera-scm （ 所有 节点）")]),s._v(" "),t("p",[s._v("执行：")]),s._v(" "),t("div",{staticClass:"language-shell extra-class"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("useradd")]),s._v(" --system --home"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("/opt/cloudera-manager/cm-5.0/run/cloudera-scm-server  --no-create-home --shell"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("/bin/false --comment "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"Cloudera SCM User"')]),s._v(" cloudera-scm\n")])])]),t("h3",{attrs:{id:"_3-配置-cm-agent"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_3-配置-cm-agent"}},[s._v("#")]),s._v(" 3 . 配置 CM Agent")]),s._v(" "),t("p",[s._v("修改文件/opt/cloudera-manager/cm-5.4.3/etc/cloudera-scm-agent/config.ini 中server_host 以及 server_port(默认7180 不变即可)")]),s._v(" "),t("h3",{attrs:{id:"_4-配置-cm-server-的-数据库"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_4-配置-cm-server-的-数据库"}},[s._v("#")]),s._v(" 4 . 配置 CM Server 的 数据库")]),s._v(" "),t("div",{staticClass:"language-shell extra-class"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[s._v("　　　　将驱动包拷贝到目录下（ 注意拷贝过去的驱动包名字一定要和下边的一样，否则会报错 ） ：\n　　　　"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("cp")]),s._v(" mysql-connector-java-5.1.31/mysql-connector-java-5.1.31-bin.jar /usr/share/java/mysql-connector-java.jar\n\n　　　　登录MySql "),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v(":")]),s._v(" $ mysql -p mysql -uroot  "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("首次登录不需要密码"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n\n　　　　执行：\n\n　　　　mysql"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v(" use mysql"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n\n　　　　mysql"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v(" delete from user where "),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("user")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("''")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n\n　　　　mysql"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v(" update user "),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("set")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("password")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("PASSWORD"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'123456'")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" where "),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("user")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'root'")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("  "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#为mysql的Root用户更改密码")]),s._v("\n")])])]),t("div",{staticClass:"language-shell extra-class"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[s._v("　　　--为其他客户端开启连接权限  如果是hive和mysql在同一台服务器上则不需要授权   可以把 %改成IP,则授权固定IP \n\n\n　　　　mysql"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v("grant all privileges on *.* to "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'root'")]),s._v("@"),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'%'")]),s._v(" identified by "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'123456'")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("  \n\n　　　　mysql"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v(" grant all on *.* to "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'temp'")]),s._v("@"),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'%'")]),s._v(" identified by "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'temp'")]),s._v(" with grant option"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("  "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("#如果temp数据库存在，则先删除执行这句")]),s._v("\n\n　　　　mysql"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v("flush privileges"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("  刷新权限\n\n　　　　退出MySql 然后执行下面的命令\n\n　　　　"),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("cd")]),s._v(" /opt/cloudera-manager/cm-5.4.3/share/cmf/schema\n\n　　　　./scm_prepare_database.sh mysql -h myhost1.sf.cloudera.com -utemp -ptemp --scm-host myhost2.sf.cloudera.com scm scm scm\n\n　　　　例如：　　\n\n　　　　./scm_prepare_database.sh mysql -h node1 -utemp -ptemp --scm-host node1 scm scm scm\n　　　　（对应于：数据库类型、数据库服务器、用户名、密码、CMServer 所在节点…….）　　　\n\n　　　　mysql"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v(" drop user "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'temp'")]),s._v("@"),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'%'")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n　　　　若上步失败或过程中操作中断，删除所有库、重头来过 /"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v(" ㄒ o ㄒ "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("/~~\n　　　　\n\n　　　　若安装 Oozie 等组件可能需要手动创建对应组件所需的数据库，例如：\n　　　　create database ooziecm DEFAULT CHARACTER SET utf8"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n　　　　grant all on ooziecm.* TO "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'ooziecm'")]),s._v("@"),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'%'")]),s._v(" IDENTIFIED BY "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'ooziecm'")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("　\n\n")])])]),t("h3",{attrs:{id:"_5-创建-parcel-目录"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_5-创建-parcel-目录"}},[s._v("#")]),s._v(" 5. 创建 Parcel 目录")]),s._v(" "),t("div",{staticClass:"language-shell extra-class"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[s._v("　　　　Manager 节点创建目录/opt/cloudera/parcel-repo，执行：\n　　　　"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("mkdir")]),s._v(" -p /opt/cloudera/parcel-repo\n　　　　"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("chown")]),s._v(" cloudera-scm:cloudera-scm /opt/cloudera/parcel-repo\n　　　　将下载好的文件（CDH-5.4.0-1.cdh5.4.0.p0.27-el6.parcel、CDH-5.4.0-1.cdh5.4.0.p0.27-el6.parcel.sha、manifest.json）拷贝到该目录下。\n　　　　Agent 节点创建目录/opt/cloudera/parcels，执行：\n　　　　"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("mkdir")]),s._v(" -p /opt/cloudera/parcels\n　　　　"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("chown")]),s._v(" cloudera-scm:cloudera-scm /opt/cloudera/parcels\n")])])]),t("h3",{attrs:{id:"_6-启动-cm-manager-agent-服务"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_6-启动-cm-manager-agent-服务"}},[s._v("#")]),s._v(" 6. 启动 CM Manager&Agent 服务")]),s._v(" "),t("div",{staticClass:"language-shell extra-class"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[s._v("\n　　执行：\n　　　　Manager：/opt/cloudera-manager/cm-5.4.3/etc/init.d/cloudera-scm-server start\n　　　　Agents：/opt/cloudera-manager/cm-5.4.3/etc/init.d/cloudera-scm-agent start\n　　访问：http://ManagerHost:7180，若可以访问（用户名、密码：admin） ，则安装成功。\n　　Manager 启动成功需要等待一段时间，过程中会在数据库中创建对应的表需要耗费一些时间。\n")])])]),t("h2",{attrs:{id:"四、cdh5-5-安装"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#四、cdh5-5-安装"}},[s._v("#")]),s._v(" 四、CDH5 5  安装")]),s._v(" "),t("p",[s._v("CM Manager && Agent 成功启动后，登录前端页面进行 CDH 安装配置。免费版本的 CM5 已经去除 50 个节点数量的限制。")]),s._v(" "),t("img",{staticClass:"zoom-custom-imgs",attrs:{src:s.$withBase("/assets/img/dw/cdh/cminstall/183233-20160318231405662-1829943121.png"),alt:"wxmp"}}),s._v(" "),t("img",{staticClass:"zoom-custom-imgs",attrs:{src:s.$withBase("/assets/img/dw/cdh/cminstall/183233-20160318231424631-1682521632.png"),alt:"wxmp"}}),s._v(" "),t("p",[s._v("在这里指出了不同的版本之间功能上的不同")]),s._v(" "),t("img",{staticClass:"zoom-custom-imgs",attrs:{src:s.$withBase("/assets/img/dw/cdh/cminstall/183233-20160318231525506-955571955.png"),alt:"wxmp"}}),s._v(" "),t("p",[s._v("选择当前要安装CDH的主机")]),s._v(" "),t("img",{staticClass:"zoom-custom-imgs",attrs:{src:s.$withBase("/assets/img/dw/cdh/cminstall/183233-20160318231626224-1221430358.png"),alt:"wxmp"}}),s._v(" "),t("p",[s._v("选择安装CDH的版本，在这里我们要选择我们下载并且上传到Linux下的那个版本")]),s._v(" "),t("img",{staticClass:"zoom-custom-imgs",attrs:{src:s.$withBase("/assets/img/dw/cdh/cminstall/183233-20160318231714818-207229914.png"),alt:"wxmp"}}),s._v(" "),t("p",[s._v("下载安装配置的阶段会比较慢，需要耐心等待")]),s._v(" "),t("img",{staticClass:"zoom-custom-imgs",attrs:{src:s.$withBase("/assets/img/dw/cdh/cminstall/183233-20160318231802006-500920483.png"),alt:"wxmp"}}),s._v(" "),t("p",[s._v("检查正确性，在这里会有一个警告：xxx  最好是把警告解决了，然后再次重启然后访问7180进行安装")]),s._v(" "),t("img",{staticClass:"zoom-custom-imgs",attrs:{src:s.$withBase("/assets/img/dw/cdh/cminstall/183233-20160318231953553-113116066.png"),alt:"wxmp"}}),s._v(" "),t("p",[s._v("在这里选择要安装哪些服务，建议都不选择，到安装成功以后再安装这些服务。")]),s._v(" "),t("img",{staticClass:"zoom-custom-imgs",attrs:{src:s.$withBase("/assets/img/dw/cdh/cminstall/183233-20160318232053459-1150272523.png"),alt:"wxmp"}}),s._v(" "),t("p",[s._v("配置数据库的链接，如果是按上面的一路走下来的话，那么数据库名、用户名、密码都是  temp  即：  temp  temp  temp")]),s._v(" "),t("img",{staticClass:"zoom-custom-imgs",attrs:{src:s.$withBase("/assets/img/dw/cdh/cminstall/183233-20160318232222740-1665554457.png"),alt:"wxmp"}}),s._v(" "),t("p",[s._v("这个是各种服务的目录，最好记录下来，以方便后面使用")]),s._v(" "),t("img",{staticClass:"zoom-custom-imgs",attrs:{src:s.$withBase("/assets/img/dw/cdh/cminstall/183233-20160318232335849-1487432569.png"),alt:"wxmp"}}),s._v(" "),t("p",[s._v("然后就是各种安装啦，安装在功以后会显示下面的界面")]),s._v(" "),t("img",{staticClass:"zoom-custom-imgs",attrs:{src:s.$withBase("/assets/img/dw/cdh/cminstall/183233-20160318232415224-1667444643.png"),alt:"wxmp"}}),s._v(" "),t("p",[s._v("在左侧的位置会显示一些安装以后的一些警告信息和错误信息，如果是真正企业环境的话，建议把这些警告全部解决掉。")]),s._v(" "),t("h2",{attrs:{id:"参考文章"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#参考文章"}},[s._v("#")]),s._v(" 参考文章")]),s._v(" "),t("ul",[t("li",[s._v("https://www.cnblogs.com/shun7man/p/12326282.html")]),s._v(" "),t("li",[s._v("https://www.cnblogs.com/raphael5200/p/5294066.html")])])])}),[],!1,null,null,null);a.default=r.exports}}]);