---
title: 负载均衡介绍
---

::: tip
本文主要是介绍 负载均衡介绍 。
:::

[[toc]]

搭建MySQL高可用负载均衡集群


**阅读目录**


## 1、简介

　　使用MySQL时随着时间的增长，用户量以及数据量的逐渐增加，访问量更是剧增，最终将会使MySQL达到某个瓶颈，那么MySQL的性能将会大大降低。这一结果也不利于软件的推广。

　　那么如何跨过这个瓶颈，提高MySQL的并发量呢？方法有很多，分布式数据库、读写分离、高可用负载均衡、增加缓存服务器等等。之前的文章里已经介绍了读写分离的方案了，接下来我将讲解MySQL高可用负载均衡这一方法。

　　其中实现高可用负载均衡的方法有很多，例如LVS+keepalived组合实现、haproxy+keepalived组合实现等等，这里我们采用haproxy+keepalived组合实现MySQL高可用负载均衡这一技术。

 



## 2、基本环境

四台linux虚拟主机

Linux版本CentOS6.6

MySQL 5.5（已安装好）

haproxy-1.5.14

keepalived-1.2.19

IP：192.168.95.11（mysql1）、192.168.95.12（mysql2）、192.168.95.13（haproxy+keepalived）、192.168.95.14（haproxy+keepalived）、192.168.95.55（vip）

 



## 3、配置MySQL主主复制

详细配置步骤可以参考这篇文章：

http://www.cnblogs.com/phpstudy2015-6/p/6485819.html#_label7

以下简要介绍一下mysql的主主复制：

何为主主复制？就是两个mysql都能读能写，数据记录通过二进制传达给对方从而保持数据的一致性。

**（192.168.95.11****主从复制+192.168.95.12****主从复制==192.168.95.11****、192.168.95.12****主主复制）**

　　因此主主复制中必须要解决的事情就是自增主键的问题。如果mysql1主键id增加到12了，此时二进制数据还没到达mysql2，那么mysql2恰好要插入数据，那么新数据主键id也是12，那不就是乱套了么！解决这一问题我们可以直接更改MySQL中的配置文件即可。

**1****）、更改配置文件**



``` sql
--192.168.95.11：MySQL
server-id=11   #任意自然数n，只要保证两台MySQL主机不重复就可以了。
log-bin=mysql-bin   #开启二进制日志
auto_increment_increment=2   #步进值auto_imcrement。一般有n台主MySQL就填n
auto_increment_offset=1   #起始值。一般填第n台主MySQL。此时为第一台主MySQL
binlog-ignore=mysql   #忽略mysql库【我一般都不写】
binlog-ignore=information_schema   #忽略information_schema库【我一般都不写】
replicate-do-db=aa   #要同步的数据库，默认所有库
--192.168.95.12：MySQL
server-id=12
log-bin=mysql-bin
auto_increment_increment=2
auto_increment_offset=2
replicate-do-db=aa
```



配置好后重启MySQL

**2****）、配置192.168.95.11****主从复制**

　　1、在192.168.95.12中创建一个192.168.95.11主机中可以登录的MySQL用户

   用户：mysql11

   密码：mysql11

``` sql
mysql>GRANT REPLICATION SLAVE ON *.* TO ‘mysql11’@’192.168.95.11’ IDENTIFIED BY ’mysql11’;
mysql>FLUSH PRIVILEGES;
```

　　2、查看192.168.95.12二进制日志

``` sql
mysql> show master status;
```

 

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/db/mysqlopt2/mastercase/789055-20170413215414955-1866659756.jpg')" alt="wxmp">

　　3、告知二进制文件名与位置



``` sql
mysql> change master to
    -> master_host='192.168.95.11',
    -> master_user='mysql11',
    ->master_password='mysql11',
    ->master_log_file='mysql-bin.000097',
    -> master_log_pos=107;
```



　　4、查看结果

``` sql
mysql> slave start;
mysql> show slave status\G
```

 

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/db/mysqlopt2/mastercase/789055-20170413215523876-1824558273.jpg')" alt="wxmp">

配置主从复制成功

**3****）、配置192.168.95.12****主从复制**

同上

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/db/mysqlopt2/mastercase/789055-20170413215609611-1788666291.jpg')" alt="wxmp">

配置主从复制成功。

 



## 4、中间件简述



### 4.1、Haproxy 介绍

Haproxy是一个开源的高性能的反向代理或者说是负载均衡服务软件之一，它支持双机热备、虚拟主机、基于TCP和HTTP应用代理等功能。其配置简单，而且拥有很好的对服务器节点的健康检查功能（相当于keepalived健康检查），当其代理的后端服务器出现故障时，Haproxy会自动的将该故障服务器摘除，当服务器的故障恢复后Haproxy还会自动将RS服务器。

HAProxy特别适用于那些负载特大的web站点，这些站点通常又需要会话保持或七层处理。HAProxy运行在当前的硬件上，完全可以支持数以万计的并发连接。并且它的运行模式使得它可以很简单安全的整合进您当前的架构中， 同时可以保护你的web服务器不被暴露到网络上。

Haproxy软件引入了frontend，backend的功能，frontend（acl规则匹配）可以根据任意HTTP请求头做规则匹配，然后把请求定向到相关的backend（server pools等待前端把请求转过来的服务器组）。通过frontend和backup，我们可以很容易的实现haproxy的7层代理功能，haproxy是一款不可多得的优秀代理服务软件。



### 4.2、keepalived 介绍

keepalived是以VRRP协议为实现基础的，VRRP全称Virtual Router Redundancy Protocol，即虚拟路由冗余协议。

虚拟路由冗余协议，可以认为是实现路由器高可用的协议，即将N台提供相同功能的路由器组成一个路由器组，这个组里面有一个master和多个backup，master上面有一个对外提供服务的vip（该路由器所在局域网内其他机器的默认路由为该vip），master会发组播，当backup收不到vrrp包时就认为master宕掉了，这时就需要根据VRRP的优先级来选举一个backup当master。这样的话就可以保证路由器的高可用了。

keepalived主要有三个模块，分别是core、check和vrrp。core模块为keepalived的核心，负责主进程的启动、维护以及全局配置文件的加载和解析。check负责健康检查，包括常见的各种检查方式。vrrp模块是来实现VRRP协议的。

 



## 5、中间件的安装与配置（haproxy、keepalived）

百度云下载：链接：https://pan.baidu.com/s/13INX99ToeqRoZcaTHb1L8A 密码：0lmp



### 5.1、安装haproxy

在192.168.95.13、192.168.95.14安装haproxy（一模一样安装）



### 1）、编译安装haproxy

``` sql
# tar -zxvf haproxy-1.5.14.tar.gz
# cd haproxy-1.5.14
# make TARGET=linux26 ARCH=x86_64 
# make install SBINDIR=/usr/sbin/ MANDIR=/usr/share/man/ DOCDIR=/usr/share/doc/
```

 

注意：

1、为什么不用configure，请看下图。haproxy-1.5.14已经存在Makefile文件了。

2、make的时候，target以及arch需要根据自己的linux主机设置

3、make install的时候我增加了一些额外选项。这可加可不加由自己配置，不加的话将会按默认路径安装，请看下图。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/db/mysqlopt2/mastercase/789055-20170413220137111-563982290.jpg')" alt="wxmp">

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/db/mysqlopt2/mastercase/789055-20170413220148908-1689530172.jpg')" alt="wxmp">



### 2）、提供启动脚本

将haproxy这个启动脚本放在/etc/init.d/文件夹下，以便我们可以直接service启动它

【注意】：此启动脚本仅仅适合我以上的安装路径。假若安装路径不同，则需要进行相应的修改方可使用。

``` shell
#!/bin/sh
#
# haproxy
#
# chkconfig:   - 85 15
# description:  HAProxy is a free, very fast and reliable solution \
#               offering high availability, load balancing, and \
#               proxying for TCP and  HTTP-based applications
# processname: haproxy
# config:      /etc/haproxy/haproxy.cfg
# pidfile:     /var/run/haproxy.pid

# Source function library.
. /etc/rc.d/init.d/functions

# Source networking configuration.
. /etc/sysconfig/network

# Check that networking is up.
[ "$NETWORKING" = "no" ] && exit 0

exec="/usr/sbin/haproxy"
prog=$(basename $exec)

[ -e /etc/sysconfig/$prog ] && . /etc/sysconfig/$prog

cfgfile=/etc/haproxy/haproxy.cfg
pidfile=/var/run/haproxy.pid
lockfile=/var/lock/subsys/haproxy

check() {
    $exec -c -V -f $cfgfile $OPTIONS
}

start() {
    $exec -c -q -f $cfgfile $OPTIONS
    if [ $? -ne 0 ]; then
        echo "Errors in configuration file, check with $prog check."
        return 1
    fi

    echo -n $"Starting $prog: "
    # start it up here, usually something like "daemon $exec"
    daemon $exec -D -f $cfgfile -p $pidfile $OPTIONS
    retval=$?
    echo
    [ $retval -eq 0 ] && touch $lockfile
    return $retval
}

stop() {
    echo -n $"Stopping $prog: "
    # stop it here, often "killproc $prog"
    killproc $prog
    retval=$?
    echo
    [ $retval -eq 0 ] && rm -f $lockfile
    return $retval
}

restart() {
    $exec -c -q -f $cfgfile $OPTIONS
    if [ $? -ne 0 ]; then
        echo "Errors in configuration file, check with $prog check."
        return 1
    fi
    stop
    start
}

reload() {
    $exec -c -q -f $cfgfile $OPTIONS
    if [ $? -ne 0 ]; then
        echo "Errors in configuration file, check with $prog check."
        return 1
    fi
    echo -n $"Reloading $prog: "
    $exec -D -f $cfgfile -p $pidfile $OPTIONS -sf $(cat $pidfile)
    retval=$?
    echo
    return $retval
}

force_reload() {
    restart
}

fdr_status() {
    status $prog
}

case "$1" in
    start|stop|restart|reload)
        $1
        ;;
    force-reload)
        force_reload
        ;;
    check)
        check
        ;;
    status)
        fdr_status
        ;;
    condrestart|try-restart)
        [ ! -f $lockfile ] || restart
        ;;
    *)
        echo $"Usage: $0 {start|stop|status|restart|try-restart|reload|force-reload}"
        exit 2
esac
```

```  shell
#给执行权力
#chmod +x /etc/init.d/haproxy 
```



### 3）、提供配置文件

根据上面的启动脚本建立相应的目录以及配置文件

``` shell
# mkdir /etc/haproxy
# mkdir /var/lib/haproxy
# useradd -r haproxy       #建立脚本启动用户
# vi /etc/haproxy/haproxy.cfg
```

 

【配置文件】

\#这里的配置文件仅仅只是贴出来进行解析说明。

\#如果需要这个配置文件最好将注释解析全部删除掉，因为我在使用的过程中，正是因为存在注释解析而导致出错，删除后就能正常运行。

\#可以下载这个配置文件进行使用，与下面贴出来的配置文件一致，只是不存在注释解析

\#百度云下载该配置文件（不含注释）：链接：http://pan.baidu.com/s/1gfOMtKB 密码：zl9o

 



``` shell
global

    log         127.0.0.1 local2         //日志定义级别
    chroot      /var/lib/haproxy         //当前工作目录
    pidfile     /var/run/haproxy.pid     //进程id
    maxconn     4000                     //最大连接数
    user        haproxy                  //运行改程序的用户
    group       haproxy
    daemon                               //后台形式运行
    stats socket /var/lib/haproxy/stats

defaults
    mode                    tcp            //haproxy运行模式（http | tcp | health）
    log                     global
    option                  dontlognull
    option                  redispatch     //serverId对应的服务器挂掉后,强制定向到其他健康的服务器
    retries                 3              //三次连接失败则服务器不用
    timeout http-request    10s
    timeout queue           1m
    timeout connect         10s            //连接超时
    timeout client          1m             //客户端超时
    timeout server          1m             //服务器超时
    timeout http-keep-alive 10s
    timeout check           10s            //心跳检测
    maxconn                 600            //最大连接数

listen stats                               //配置haproxy状态页（用来查看的页面）
    mode http
    bind :8888
    stats enable
    stats hide-version                    //隐藏haproxy版本号
stats uri     /haproxyadmin?stats     //一会用于打开状态页的uri
    stats realm   Haproxy\ Statistics     //输入账户密码时的提示文字
    stats auth    admin:admin             //用户名:密码

frontend  main 
bind 0.0.0.0:3306                     //使用3306端口。监听前端端口【表示任何ip访问3306端口都会将数据轮番转发到mysql服务器群组中】
    default_backend             mysql     //后端服务器组名

backend mysql
    balance     leastconn                 //使用最少连接方式调度
    server mysql1 192.168.95.11:3306 check port 3306 maxconn 300
    server mysql2 192.168.95.12:3306 check port 3306 maxconn 300
```



 



### 4）、启动日志

``` shell
# vi /etc/rsyslog.conf 
```

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/db/mysqlopt2/mastercase/789055-20170413220722689-1937574322.jpg')" alt="wxmp">

```
#service rsyslog restart
```



### 5）、启动haproxy

``` shell
# service haproxy start
```

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/db/mysqlopt2/mastercase/789055-20170413220823642-231712137.jpg')" alt="wxmp">



### 6）、测试haproxy

安照配置文件进行相应的测试

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/db/mysqlopt2/mastercase/789055-20170413220910892-1280465641.jpg')" alt="wxmp">

打开浏览器输入192.168.95.13:8888/haproxyadmin?stats

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/db/mysqlopt2/mastercase/789055-20170413220924845-1167063848.jpg')" alt="wxmp">

登陆后如下如所示，表明安装haproxy成功。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/db/mysqlopt2/mastercase/789055-20170413220939720-768985685.jpg')" alt="wxmp">



### 5.2、安装keepalived

官网下载：http://www.keepalived.org/download.html

在192.168.95.13、192.168.95.14安装keepalived



### 1）、解决缺少的软件库文件

【这一步骤视具体的linux版本而定，有些已经安装openssl了。具体情况可以执行./configure就能够确定缺不缺少软件库文件了】

首先我们先将keepalived-1.2.19.tar.gz解压，然后进入目录./configure查看

``` shell
# tar -zxvf keepalived-1.2.19.tar.gz
# ./configure --prefix=/usr/local/keepalived  --sbindir=/usr/sbin/ --sysconfdir=/etc/ --mandir=/usr/local/share/man/ --with-kernel-dir=/usr/src/kernels/2.6.32-504.el6.x86_64/
```

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/db/mysqlopt2/mastercase/789055-20170413221140533-188004616.jpg')" alt="wxmp">

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/db/mysqlopt2/mastercase/789055-20170413221146455-416499155.jpg')" alt="wxmp">

 由上图可见keepalived的安装需要先安装软件OpenSSL

缺少头文件，只需要安装openssl和openssl-devel即可

最简单的方法是：yum -y install openssl openssl-devel

没网的朋友也不用怕，接下来将介绍的是**rpm方法安装：**

\#挂载光盘，在光盘中查找软件。若光盘找不到就直接下载，再传入linux进行安装

``` shell
# mount /dev/cdrom  /home/suifeng2/rom/
# cd rom/
# cd Packages/
# ls |grep openssl
```

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/db/mysqlopt2/mastercase/789055-20170414081004298-1312936056.jpg')" alt="wxmp">

安装keepalived软件时存在各种依赖，下图是我安装软件后整理的依赖关系图：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/db/mysqlopt2/mastercase/789055-20170414081041126-412729314.jpg')" alt="wxmp">

既然已经知道各软件依赖，则可按最后面的软件开始安装：

（你也可以从前面开始进行安装，一步一步的查看各个依赖关系）

**1****、安装openssl**

``` shell
# rpm -ivh openssl-1.0.1e-30.el6.x86_64.rpm
```

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/db/mysqlopt2/mastercase/789055-20170414081122533-1090149961.jpg')" alt="wxmp">

安装openssl成功

**2****、安装openssl-devel****
**

***安装libsepol-devel：\***

``` shell
# rpm -ivh libsepol-devel-2.0.41-4.el6.x86_64.rpm
```

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/db/mysqlopt2/mastercase/789055-20170414081203986-1033904545.jpg')" alt="wxmp">

***安装pkgconfig(libsepol)：\***

``` shell
# rpm -ivh pkgconfig-0.23-9.1.el6.x86_64.rpm
```

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/db/mysqlopt2/mastercase/789055-20170414081326048-108728484.jpg')" alt="wxmp">

***安装libselinux-devel：\***

``` shell
# rpm -ivh libselinux-devel-2.0.94-5.8.el6.x86_64.rpm
```

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/db/mysqlopt2/mastercase/789055-20170414081354861-1151114167.jpg')" alt="wxmp">

***安装keyutils-libs-devel：***

``` shell
# rpm -ivh keyutils-libs-devel-1.4-5.el6.x86_64.rpm
```

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/db/mysqlopt2/mastercase/789055-20170414081423955-808450124.jpg')" alt="wxmp">

安装libcom_err-devel：

``` shell
# rpm -ivh libcom_err-devel-141.12-21.el6.x86_64.rpm
```

 

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/db/mysqlopt2/mastercase/789055-20170414081449345-1582885369.jpg')" alt="wxmp">

***安装krb5-devel：***

``` shell
# rpm -ivh krb5-devel-1.10.3-33.el6.x86_64.rpm
```

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/db/mysqlopt2/mastercase/789055-20170414081613798-100750928.jpg')" alt="wxmp">

***安装zlib-devel：***

``` shell
# rpm -ivh zlib-devel-1.2.3-29.el6.x86_64.rpm
```

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/db/mysqlopt2/mastercase/789055-20170414081638705-1501389033.jpg')" alt="wxmp">

**安装openssl-devel****：**

``` shell
# rpm -ivh openssl-devel-1.0.1e-30.el6.x86_64.rpm
```

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/db/mysqlopt2/mastercase/789055-20170414081706642-834222715.jpg')" alt="wxmp">



### 2）、编译安装keepalived软件



``` shell
# cd keepalived-1.2.19
# ./configure --prefix=/usr/local/keepalived  --sbindir=/usr/sbin/ --sysconfdir=/etc/ --mandir=/usr/local/share/man/ --with-kernel-dir=/usr/src/kernels/2.6.32-504.el6.x86_64/
# make && make install
# chkconfig --add keepalived  #添加开机自启（我暂时没添加）
# chkconfig keepalived on
```



 

【注意】：

1、安装时./configure中的—prefix后的几个选择可选可不选，选了就可以采用service直接启动了。建议最好都加上吧

2、--with-kernel-dir这个选项根据自己的linux版本进行填写（在linux中使用命令uname –a可以查到）

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/db/mysqlopt2/mastercase/789055-20170414081810158-920097908.jpg')" alt="wxmp">



### 3）、创建配置文件

/etc/keepalived/文件夹已存在keepalived.conf文件，我们将它改名为keepalived.conf.back，再建立一个我们自己keepalived.conf配置文件。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/db/mysqlopt2/mastercase/789055-20170414081912595-1589363918.jpg')" alt="wxmp">

vi /etc/keepalived/keepalived.conf（13与14配置文件路径一致）

【以下是简单的配置文件，使用时最好去掉注释】

配置文件下载（不含注释）：

***192.168.95.13配置文件:***



``` shell
! Configuration File for keepalived
#简单的头部，这里主要可以做邮件通知报警等的设置，此处就暂不配置了；
global_defs {
        notificationd LVS_DEVEL
}
#预先定义一个脚本，方便后面调用，也可以定义多个，方便选择；
vrrp_script chk_haproxy {
    script "/etc/keepalived/chk.sh"  #具体脚本路径
    interval 2  #脚本循环运行间隔
}
#VRRP虚拟路由冗余协议配置
vrrp_instance VI_1 {   #VI_1 是自定义的名称；
    state BACKUP    #MASTER表示是一台主设备，BACKUP表示为备用设备【我们这里因为设置为开启不抢占，所以都设置为备用】
    nopreempt      #开启不抢占
    interface eth0   #指定VIP需要绑定的物理网卡
    virtual_router_id 11   #VRID虚拟路由标识，也叫做分组名称，该组内的设备需要相同
    priority 130   #定义这台设备的优先级 1-254；开启了不抢占，所以此处优先级必须高于另一台

    advert_int 1   #生存检测时的组播信息发送间隔，组内一致
    authentication {    #设置验证信息，组内一致
        auth_type PASS   #有PASS 和 AH 两种，常用 PASS
        auth_pass asd    #密码
    }
    virtual_ipaddress {
        192.168.95.55    #指定VIP地址，组内一致，可以设置多个IP
    }
    track_script {    #使用在这个域中使用预先定义的脚本，上面定义的
        chk_haproxy   
    }

    notify_backup "/etc/init.d/haproxy restart"   #表示当切换到backup状态时,要执行的脚本
    notify_fault "/etc/init.d/haproxy stop"     #故障时执行的脚本
}
```



***192.168.95.14配置文件:***

配置文件与上面的几乎一样，仅仅改变priority 120【只需要比上面的小即可】



### 4）、创建脚本文件

创建上面配置文件所需的脚本文件（13、14一样）

（检测haproxy有没有发生故障，发生故障则将keepalived停掉，让出vip）

``` shell
# vi /etc/keepalived/chk.sh#!/bin/bash
#
if [ $(ps -C haproxy --no-header | wc -l) -eq 0 ]; then
       /etc/init.d/keepalived stop
fi
给执行权限
# chmod +x /etc/keepalived/chk.sh
```

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/db/mysqlopt2/mastercase/789055-20170414082223158-2122872733.jpg')" alt="wxmp">

``` shell
启动keepalived：
# service keepalived start
```

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/db/mysqlopt2/mastercase/789055-20170414082247861-1856007348.jpg')" alt="wxmp">

安装keepalived成功！

 



## 6、功能测试

测试之前先在mysql1和mysql2中建立一个mysql用户，此用户可以允许13、14linux主机登陆：

用户：jack

密码：321

host：192.168.95.%

``` sql
mysql> GRANT ALL ON *.* TO 'jack'@'192.168.95.%' IDENTIFIED BY '321';
mysql> FLUSH PRIVILEGES;
```



### 6.1、流程简述

大概讲述一下整体的运作流程:

首先两个11,12的mysql以及13、14的haproxy、keepalived都启动；

keepalived在keepalived群组中获取虚拟IP，以及检测haproxy是否被kill；

haproxy负责将进来的数据转发到11或者12的mysql中。

下图是我画的简单理解图：（相对来说比较简洁哈，凑合凑合哈）

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/db/mysqlopt2/mastercase/789055-20170414082417220-1947348099.jpg')" alt="wxmp">

接下来我们将一个个功能的进行测试验证。



### 6.2、测试haproxy监听前端端口3306

1、frontend监听端口3306时，将mysql、haproxy、keepalived全部开启

2、使用任意一个mysql客户端登陆用户jack

登陆成功(windowns上登陆mysql)

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/db/mysqlopt2/mastercase/789055-20170414082454267-647656487.jpg')" alt="wxmp">

3、更改frontend监听端口为3307，继续操作登陆测试

登陆失败

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/db/mysqlopt2/mastercase/789055-20170414082555158-489818325.jpg')" alt="wxmp">

结果：说明了frontend监听端口的用处，有助于我们理解haproxy用法。



### 6.3、测试高可用+keepalived不抢占vip

可以通过haproxy监控页面获知谁获取了vip

1、依次启动13、14的keepalived、haproxy（启动keepalived后将会自动开启haproxy）

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/db/mysqlopt2/mastercase/789055-20170414082633189-1711212150.jpg')" alt="wxmp">

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/db/mysqlopt2/mastercase/789055-20170414082639205-259704877.jpg')" alt="wxmp">

2、访问http://192.168.95.55:8888/haproxyadmin?stats

13获取了vip

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/db/mysqlopt2/mastercase/789055-20170414082710986-1511278821.jpg')" alt="wxmp">

3、# kill -9 8923

刷新http://192.168.95.55:8888/haproxyadmin?stats

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/db/mysqlopt2/mastercase/789055-20170414082730501-587455310.jpg')" alt="wxmp">

14获取了vip，机器正常工作

结果：证明了高可用，挂了一台另一台继续工作

4、重新启动13的haproxy以及keepalived

并刷新http://192.168.95.55:8888/haproxyadmin?stats

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/db/mysqlopt2/mastercase/789055-20170414082824517-1843082583.jpg')" alt="wxmp">

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/db/mysqlopt2/mastercase/789055-20170414082838033-1048193667.jpg')" alt="wxmp">

结果：此时vip仍在14手中，证明了keepalived配置了不抢占vip，不必浪费资源去获取vip。



### 6.4、测试负载均衡

1、全部正常启动，此时vip在14手中

2、分别在11、12中开启抓包

``` shell
# tcpdump -n -i eth0 host 192.168.95.11 and 192.168.95.14
# tcpdump -n -i eth0 host 192.168.95.12 and 192.168.95.14
```

3、使用不同客户端登陆jack用户，不断向数据库添加数据

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/db/mysqlopt2/mastercase/789055-20170414082922611-1476794934.jpg')" alt="wxmp">

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/db/mysqlopt2/mastercase/789055-20170414082929673-1795226870.jpg')" alt="wxmp">

结果：此时14向11、12都有发送数据，此时证明负载均衡

【我们设置的haproxy中balance方式是最少连接方式，假若采用roundrobin方式测试结果将会更加明显】

注意：

当某一台mysql挂了以后，haproxy会将其踢出mysql服务器群组。

当有命令传来时会将其转发到正常的服务器上。

当出问题的mysql恢复后，haproxy又会自动地将它放回mysql服务器群组中，并且自动同步没有同步的数据

测试：

1、全部正常启动

mysql1、mysql2都正常

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/db/mysqlopt2/mastercase/789055-20170414084747783-1624501048.jpg')" alt="wxmp">

 2、将mysql2关掉

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/db/mysqlopt2/mastercase/789055-20170414084333111-1560178189.jpg')" alt="wxmp">

mysql2出问题，将其踢出mysql群组

3、启动mysql2

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/db/mysqlopt2/mastercase/789055-20170414084635673-770786182.jpg')" alt="wxmp">

mysql2恢复后又将其放回mysql群组里

【当mysql2挂掉时，若有数据插入，将会转发给mysql1，当mysql恢复后，又会将这些数据同步到mysql2中】

 



## 7、总结与建议

　　在这篇博文中我们不仅仅只关注这一整个mysql高可用负载均衡的实现方式，我们还应该理解haproxy以及keepalived的工作方式。Haproxy和keepalived这两个工具很强大，了解他们的实现方式，那么就可以以此类推与其他服务器组合构建强大健壮的服务集群。例如它可以与apache组合，构成高可用负载均衡的web集群。

　　这篇文章中只是简简单单的搭建了一个mysql高可用负载均衡的环境，真正应用到生产环境中，还需要根据具体项目进行相应的修改。

　　最后我的小建议就是看完这篇博客可以去了解了解更多的haproxy和keepalived的相应配置，以及学习与haproxy功能差不多的LVS。

 

（以上是自己的一些见解与总结，若有不足或者错误的地方请各位指出）

作者：[那一叶随风](http://www.cnblogs.com/phpstudy2015-6/)

声明：以上只代表本人在工作学习中某一时间内总结的观点或结论。转载时请在文章页面明显位置给出原文链接


## 参考文章
* https://www.cnblogs.com/phpstudy2015-6/p/6706465.html