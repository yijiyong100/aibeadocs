---
title: CDH-CM基础介绍
---

::: tip
本文主要是介绍 CDH-CM基础知识 。
:::

[[toc]]

## Cloudra Manager概述

Cloudra Manager简称CM，它是一个web操作平台，可以借助安装CDH然后安装多种Hadoop框架。

### CloudraManager技术构成

Clients:客户端，通过web页面和ClouderaManager和服务器进行交互。

API：通过API和ClouderaManagement和服务器进行交互

Cloudera Repository：存储分发安装包

Management Server：进行监控和预警

Database：存储预警信息和配置信息。

Agent：分布在多台服务器，负责配置，启动和停止进程。监控主机。

结构图如下：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dw/cdh/cmintro-1.png')" alt="wxmp">

## 【----------------------------】

## 一、Cloudera Manager 介绍　

      Cloudra Manager简称CM，它是一个web操作平台，可以借助安装CDH然后安装多种Hadoop框架。

　　  Cloudera Manager是一个管理CDH的端到端的应用。
　　  作用：
　　　　– 管理
　　　　– 监控
　　　　– 诊断
　　　　– 集成

　　  架构

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dw/cdh/cminstall/183233-20160318224223834-188680934.png')" alt="wxmp">

　　  Server
　　　　– 管理控制台服务器和应用程序逻辑
　　　　– 负责软件安装、配置，启动和停止服务
　　　　– 管理服务运行的群集
　　  Agent
　　　　– 安装在每台主机上
　　　　– 负责启动和停止进程，配置，监控主机
　　  Management Service
　　　　– 由一组角色组成的服务，执行各种监视、报警和报告功能
　　  Database
　　  Cloudera Repository
　　  Clients
　　　　  Admin Console
　　　　  API

## 二、安装前环境搭建

### 1 .网络配置( 所有节点)
　　　　vi /etc/sysconfig/network 修改 hostname：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dw/cdh/cminstall/183233-20160318224520849-74277443.png')" alt="wxmp">
　　　　通过 service network restart 重启网络服务生效

　　　　vi /etc/hosts ,修改 ip 与主机名的对应关系

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dw/cdh/cminstall/183233-20160318224603146-172124452.png')" alt="wxmp">
### 2 .SSH 免密码登录

``` shell
　　　　主节点执行：
　　　　ssh-keygen -t dsa -P '' -f ~/.ssh/id_dsa
　　　　生成无密码密钥对

　　　　cat ~/.ssh/id_dsa.pub >> ~/.ssh/authorized_keys

　　　　然后将公钥添加到其他节点的authorized_keys上：

　　　　$ scp ~/.ssh/id_dsa.pub root@node6:/opt
　　　　$ scp ~/.ssh/id_dsa.pub root@node7:/opt
　　　　$ scp ~/.ssh/id_dsa.pub root@node8:/opt
　　　　#然后分别登录这三台虚拟机，将公钥覆盖到公钥中
　　　　$ cat /opt/id_dsa.pub >> ~/.ssh/authorized_keys


　　　　测试：主节点 ssh 其他节点 ……; 如果不能成功的话，则先在其他节点让做其他节点自己的免密码登录即：分别在节点上使用命令 ssh-keygen -t dsa -P '' -f ~/.ssh/id_dsa

　　　　然后再重复上面操作
```

### 3. 关闭 防火墙
``` shell 
　　　　临时关闭：
　　　　service iptables stop
　　　　永久关闭（重启后生效）：
　　　　chkconfig iptables off
```
### 4.关闭 SELINUX　　

``` shell 
　　　　临时关闭：
　　　　setenforce 0
　　　　修改配置文件/etc/selinux/config（重启生效） ：
　　　　将 SELINUX=enforcing 改为 SELINUX=disabled
　　　　查看 SELINUX 状态：
　　　　1)  /usr/sbin/sestatus –v
　　　　SELinux status: enabled（enabled：开启；disabled：关闭）
　　　　2) 使用命令：getenforce

``` 
### 5.安装 JDK　
``` shell 
　　　　本文采用 RPM 包安装…….执行：
　　　　rpm -ivh jdk-7u80-linux-x64.rpm
　　　　配置环境变量，修改/root/.bash_profile：
　　　　export JAVA_HOME=/usr/java/jdk1.7.0_80
　　　　export PATH=$JAVA_HOME/bin:$PATH
　　　　export CLASSPATH=.:$JAVA_HOMdE/lib/dt.jar:$JAVA_HOME/lib/tools.jar　　

　　　　生效：
　　　　source /etc/profile
　　　　查看版本：
　　　　[root@slave6 cdh]# java -version
　　　　java version "1.7.0_80"
　　　　Java(TM) SE Runtime Environment (build 1.7.0_80-b15)
　　　　Java HotSpot(TM) 64-Bit Server VM (build 24.80-b11, mixed mode)
```
### 6. 设置 NTP
``` shell
　　　　所有节点安装 NTP：
　　　　yum install ntp
　　　　配置开机启动：
　　　　chkconfig ntpd on
　　　　检查是否设置成功：
　　　　chkconfig --list ntpd （2-5 为 on 状态则成功）
　　　　设置同步：
　　　　ntpdate -u ntp.sjtu.edu.cn（时钟服务器根据实际环境设置、本文采用 210.72.145.44-国家授时中心服务器 IP 地址）
```
### 7.安装 配置 MySql

　　　　可使用Yum自带的Mysql  使用命令 yum install mysql-server
### 8.下载依赖包
``` shell
　　　　yum -y install  chkconfig  python  bind-utils  psmisc  libxslt  zlib  sqlite  cyrus-sasl-plain  cyrus-sasl-gssapi  fuse  fuse-libs  redhat-lsb
```
## 三、CM安装

### 1 . 安装 Cloudera Manager Server&Agent
``` shell
　　　　拷贝 cloudera-manager-el6-cm5.4.3_x86_64.tar.gz 到所有 Server、Agent 节点
　　　　创建 cm 目录：
　　　　mkdir /opt/cloudera-manager
　　　　解压 cm 压缩包：
　　　　tar xvzf cloudera-manager*.tar.gz -C /opt/cloudera-manager
```
### 2 . 创建用户 cloudera-scm （ 所有 节点）
　　　　执行：
　　　　

``` shell 
useradd --system --home=/opt/cloudera-manager/cm-5.0/run/cloudera-scm-server  --no-create-home --shell=/bin/false --comment "Cloudera SCM User" cloudera-scm
```
### 3 . 配置 CM Agent
　　　　修改文件/opt/cloudera-manager/cm-5.4.3/etc/cloudera-scm-agent/config.ini 中server_host 以及 server_port(默认7180 不变即可)
### 4 . 配置 CM Server 的 数据库

``` shell 
　　　　将驱动包拷贝到目录下（ 注意拷贝过去的驱动包名字一定要和下边的一样，否则会报错 ） ：
　　　　cp mysql-connector-java-5.1.31/mysql-connector-java-5.1.31-bin.jar /usr/share/java/mysql-connector-java.jar

　　　　登录MySql : $ mysql -p mysql -uroot  (首次登录不需要密码)

　　　　执行：

　　　　mysql> use mysql;

　　　　mysql> delete from user where user='';

　　　　mysql> update user set password=PASSWORD('123456') where user='root';  #为mysql的Root用户更改密码
```

``` shell
　　　--为其他客户端开启连接权限  如果是hive和mysql在同一台服务器上则不需要授权   可以把 %改成IP,则授权固定IP 


　　　　mysql>grant all privileges on *.* to 'root'@'%' identified by '123456';  

　　　　mysql> grant all on *.* to 'temp'@'%' identified by 'temp' with grant option;  #如果temp数据库存在，则先删除执行这句

　　　　mysql>flush privileges;  刷新权限

　　　　退出MySql 然后执行下面的命令

　　　　cd /opt/cloudera-manager/cm-5.4.3/share/cmf/schema

　　　　./scm_prepare_database.sh mysql -h myhost1.sf.cloudera.com -utemp -ptemp --scm-host myhost2.sf.cloudera.com scm scm scm

　　　　例如：　　

　　　　./scm_prepare_database.sh mysql -h node1 -utemp -ptemp --scm-host node1 scm scm scm
　　　　（对应于：数据库类型、数据库服务器、用户名、密码、CMServer 所在节点…….）　　　

　　　　mysql> drop user 'temp'@'%';
　　　　若上步失败或过程中操作中断，删除所有库、重头来过 /( ㄒ o ㄒ )/~~
　　　　

　　　　若安装 Oozie 等组件可能需要手动创建对应组件所需的数据库，例如：
　　　　create database ooziecm DEFAULT CHARACTER SET utf8;
　　　　grant all on ooziecm.* TO 'ooziecm'@'%' IDENTIFIED BY 'ooziecm';　

```

### 5. 创建 Parcel 目录
``` shell
　　　　Manager 节点创建目录/opt/cloudera/parcel-repo，执行：
　　　　mkdir -p /opt/cloudera/parcel-repo
　　　　chown cloudera-scm:cloudera-scm /opt/cloudera/parcel-repo
　　　　将下载好的文件（CDH-5.4.0-1.cdh5.4.0.p0.27-el6.parcel、CDH-5.4.0-1.cdh5.4.0.p0.27-el6.parcel.sha、manifest.json）拷贝到该目录下。
　　　　Agent 节点创建目录/opt/cloudera/parcels，执行：
　　　　mkdir -p /opt/cloudera/parcels
　　　　chown cloudera-scm:cloudera-scm /opt/cloudera/parcels
```
### 6. 启动 CM Manager&Agent 服务
``` shell

　　执行：
　　　　Manager：/opt/cloudera-manager/cm-5.4.3/etc/init.d/cloudera-scm-server start
　　　　Agents：/opt/cloudera-manager/cm-5.4.3/etc/init.d/cloudera-scm-agent start
　　访问：http://ManagerHost:7180，若可以访问（用户名、密码：admin） ，则安装成功。
　　Manager 启动成功需要等待一段时间，过程中会在数据库中创建对应的表需要耗费一些时间。
```
## 四、CDH5 5  安装

　　CM Manager && Agent 成功启动后，登录前端页面进行 CDH 安装配置。免费版本的 CM5 已经去除 50 个节点数量的限制。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dw/cdh/cminstall/183233-20160318231405662-1829943121.png')" alt="wxmp">

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dw/cdh/cminstall/183233-20160318231424631-1682521632.png')" alt="wxmp">

　　　　在这里指出了不同的版本之间功能上的不同

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dw/cdh/cminstall/183233-20160318231525506-955571955.png')" alt="wxmp">

　　　　选择当前要安装CDH的主机

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dw/cdh/cminstall/183233-20160318231626224-1221430358.png')" alt="wxmp">

　　　　选择安装CDH的版本，在这里我们要选择我们下载并且上传到Linux下的那个版本

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dw/cdh/cminstall/183233-20160318231714818-207229914.png')" alt="wxmp">

　　　　下载安装配置的阶段会比较慢，需要耐心等待

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dw/cdh/cminstall/183233-20160318231802006-500920483.png')" alt="wxmp">

　　　　检查正确性，在这里会有一个警告：xxx  最好是把警告解决了，然后再次重启然后访问7180进行安装

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dw/cdh/cminstall/183233-20160318231953553-113116066.png')" alt="wxmp">

　　　　在这里选择要安装哪些服务，建议都不选择，到安装成功以后再安装这些服务。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dw/cdh/cminstall/183233-20160318232053459-1150272523.png')" alt="wxmp">

　　　　配置数据库的链接，如果是按上面的一路走下来的话，那么数据库名、用户名、密码都是  temp  即：  temp  temp  temp

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dw/cdh/cminstall/183233-20160318232222740-1665554457.png')" alt="wxmp">

　　　　这个是各种服务的目录，最好记录下来，以方便后面使用

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dw/cdh/cminstall/183233-20160318232335849-1487432569.png')" alt="wxmp">

　　　　然后就是各种安装啦，安装在功以后会显示下面的界面

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dw/cdh/cminstall/183233-20160318232415224-1667444643.png')" alt="wxmp">

　　　　在左侧的位置会显示一些安装以后的一些警告信息和错误信息，如果是真正企业环境的话，建议把这些警告全部解决掉。


## 参考文章
* https://www.cnblogs.com/shun7man/p/12326282.html
* https://www.cnblogs.com/raphael5200/p/5294066.html