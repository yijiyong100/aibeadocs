---
title: Ambari-介绍和安装
---

::: tip
本文主要是介绍 Hive-介绍和安装 。
:::

[[toc]]

## ambari介绍及安装

## Ambari简介

### Ambari概述

Apache Ambari是一种基于Web的工具，支持Apache Hadoop集群的创建、管理和监控。Ambari已支持大多数Hadoop组件，包括HDFS、MapReduce、Hive、Pig、 Hbase、Zookeeper、Sqoop和Hcatalog等；除此之外，Ambari还支持Spark、Storm等计算框架及资源调度平台YARN。

Apache Ambari 从集群节点和服务收集大量信息，并把它们表现为容易使用的，集中化的接口：Ambari Web.

Ambari Web显示诸如服务特定的摘要、图表以及警报信息。可通过Ambari Web对Hadoop集群进行创建、管理、监视、添加主机、更新服务配置等；也可以利用Ambari Web执行集群管理任务，例如启用 Kerberos 安全以及执行Stack升级。任何用户都可以查看Ambari Web特性。拥有administrator-level 角色的用户可以访问比 operator-level 或 view-only 的用户能访问的更多选项。例如，Ambari administrator 可以管理集群安全，一个 operator 用户可以监控集群，而 view-only 用户只能访问系统管理员授予他的必要的权限。

## Ambari体系结构

Ambari 自身也是一个分布式架构的软件，主要由两部分组成：Ambari Server 和 Ambari Agent。简单来说，用户通过Ambari Server通知 Ambari Agent 安装对应的软件；Agent 会定时地发送各个机器每个软件模块的状态给 Ambari Server，最终这些状态信息会呈现在 Ambari 的 GUI，方便用户了解到集群的各种状态，并进行相应的维护。

Ambari Server 从整个集群上收集信息。每个主机上都有 Ambari Agent, Ambari Server 通过 Ambari Agent 控制每部主机。

## Ambari安装

[http://doc.ailinux.net/docs/data/data-1ardi0l817b5q](http://doc.ailinux.net/docs/data/data-1ardi0l817b5q[[1]][1])

\#Ambari操作指南
https://docs.hortonworks.com/HDPDocuments/Ambari-2.6.1.5/bk_ambari-operations/content/ch_Overview_hdp-ambari-user-guide.html

 

## 安装准备阶段：

``` shell
本文介绍ambari安装及常用大数据组件安装配置等
```

### HDP版本兼容性

``` shell
CentOS 7
Python 2.7.x
JDK1.8+
Mariadb 5.5
Ambari2.6.1.5 
HDP 2.6.4
```

查看一下地址获取软件版本兼容性支持
https://supportmatrix.hortonworks.com/
由于严格依赖版本，所以要先确定安装的版本。

### 系统初始化

#### 更新yum源

``` shell
yum install -y wget
wget -O /etc/yum.repos.d/CentOS-Base.repo http://mirrors.aliyun.com/repo/Centos-7.repo
yum clean all
yum makecache
```

#### 修改主机名

``` shell
sudo hostnamectl set-hostname test-bg-xx
sudo hostname test-bg-xx
```

#### 修改时区：

``` shell
cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
```

#### 同步集群时间

``` shell
yum install –y ntp
ntpdate -u cn.pool.ntp.org
或：
ntpdate time1.aliyun.com
#### 硬件时间和系统时间同步:
clock -w
配置自动同步:/etc/crontab写入 
*/1 * * * * root ntpdate -u cn.pool.ntp.org >> /dev/null 2>&1
```

### 关闭防火墙和selinux

``` shell
#关闭防火墙
systemctl stop firewalld
systemctl disable firewalld

#关闭selinux
修改配置 
sed -i 's#SELINUX=enforcing#SELINUX=disabled#g' /etc/sysconfig/selinux
临时关闭
setenforce 0
```

#### 配置免密钥登录

``` shell
为了让Ambari服务器在所有集群主机上自动安装Ambari代理，您必须在Ambari服务器主机和集群中的所有其他主机之间设置无密码SSH连接。Ambari服务器主机使用SSH公钥认证来远程访问和安装Ambari代理
ssh-keygen -t rsa
ssh-copy-id -i ~/.ssh/id_rsa.pub root@node1
ssh-copy-id -i ~/.ssh/id_rsa.pub root@node2
ssh-copy-id -i ~/.ssh/id_rsa.pub root@node3
注意：您可以选择在每个集群主机上手动安装Ambari代理。在这种情况下，您不需要生成和分发SSH密钥
可以使用非root SSH帐户，如果该帐户可以执行sudo而不输入密码

#
#如果ssh端口不是默认，可以在.ssh下创建config文件,修改文件权限 配置如下:
touch config
chmod 600 config
[jt_ops@test-bg-m01 .ssh]$ cat config 
Host test-bg-m01
HostName test-bg-m01
User jt_ops
Port xx

Host test-bg-w01
HostName test-bg-w01
User jt_ops
Port xx
也可以修改/etc/sshd/ssh_config配置文件中的端口
```

#### 系统初始化参数

``` shell
cat >> /etc/sysctl.conf << EOF
fs.file-max=1000000
net.ipv4.tcp_max_tw_buckets = 6000
net.ipv4.tcp_sack = 1
net.ipv4.tcp_window_scaling = 1
net.ipv4.tcp_rmem = 4096 87380 4194304
net.ipv4.tcp_wmem = 4096 16384 4194304
net.ipv4.tcp_max_syn_backlog = 16384
net.core.netdev_max_backlog = 32768
net.core.somaxconn = 32768
net.core.wmem_default = 8388608
net.core.rmem_default = 8388608
net.core.rmem_max = 16777216
net.core.wmem_max = 16777216
net.ipv4.tcp_timestamps = 1
net.ipv4.tcp_fin_timeout = 20
net.ipv4.tcp_synack_retries = 2
net.ipv4.tcp_syn_retries = 2
net.ipv4.tcp_syncookies = 1
#net.ipv4.tcp_tw_len = 1
net.ipv4.tcp_tw_reuse = 1
net.ipv4.tcp_mem = 94500000 915000000 927000000
net.ipv4.tcp_max_orphans = 3276800
net.ipv4.ip_local_port_range = 1024 65000
net.nf_conntrack_max = 6553500
net.netfilter.nf_conntrack_max = 6553500
net.netfilter.nf_conntrack_tcp_timeout_close_wait = 60
net.netfilter.nf_conntrack_tcp_timeout_fin_wait = 120
net.netfilter.nf_conntrack_tcp_timeout_time_wait = 120
net.netfilter.nf_conntrack_tcp_timeout_established = 3600
net.ipv6.conf.all.disable_ipv6 = 1
net.ipv6.conf.default.disable_ipv6 = 1
kernel.numa_balancing = 0
kernel.shmmax = 68719476736
kernel.printk = 5
kernel.sysrq = 1
vm.overcommit_memory = 0
vm.swappiness = 0
EOF
```

#### 文件描述符和用户最大进程数

``` shell
#### 调整文件描述符
cat >> /etc/security/limits.conf <<EOF
* soft nproc 65535 
* hard nproc 65535 
* soft nofile 65535 
* hard nofile 65535 
EOF
##用户进程限制
cat >> /etc/security/limits.d/20-nproc.conf <<EOF
* soft nproc 8192
root soft nproc unlimited
EOF
```

## 安装

```
 安装有两种方法：
      在线安装和搭建本地yum源仓库安装
```

### 在线安装

#### 下载yum源配置文件repo

```
#如果做了免秘钥登陆，则只需要在主节点下载yum源

sudo wget -nv http://public-repo-1.hortonworks.com/ambari/centos7/2.x/updates/2.6.1.5/ambari.repo -O /etc/yum.repos.d/ambari.repo

sudo wget –nv http://public-repo-1.hortonworks.com/HDP/centos7/2.x/updates/2.6.4.0/hdp.repo -O /etc/yum.repos.d/hdp.repo

sudo wget -nv http://public-repo-1.hortonworks.com/HDP-GPL/centos7/2.x/updates/2.6.4.0/hdp.gpl.repo -O /etc/yum.repos.d/hdp.gpl.repo
```

### 离线安装

#### 制作本地源

``` shell
制作本地镜像源安装HDP，可以在主节点或者单独的一台服务器（建议）
选择一台可以访问internet的服务器配置本地源
apache httpd
提供离线仓库的下载服务
#安装apache
yum install httpd –y

下载软件源

在httpd网站根目录,默认是即/var/www/html/，创建目录ambari， 
并且将下载的压缩包解压到/var/www/html/ambari目录

cd /var/www/html/
mkdir ambari
cd /var/www/html/ambari/
http://public-repo-1.hortonworks.com/ambari/centos7/2.x/updates/2.6.1.5/ambari-2.6.1.5-centos7.tar.gz
http://public-repo-1.hortonworks.com/HDP/centos6/2.x/updates/2.6.4.0/HDP-2.6.4.0-centos6-rpm.tar.gz
http://public-repo-1.hortonworks.com/HDP-UTILS-1.1.0.22/repos/centos6/HDP-UTILS-1.1.0.22-centos6.tar.gz

http://public-repo-1.hortonworks.com/HDP-GPL/centos6/2.x/updates/2.6.4.0/HDP-GPL-2.6.4.0-centos6-rpm.tar.gz

解压下载的tar包
[root@dev-bg-m01 html]## cd /var/www/html/
[root@dev-bg-m01 html]## pwd
/var/www/html
[root@dev-bg-m01 html]#
[root@dev-bg-m01 html]## tree -L 2 ambari/
ambari/
├── ambari
│   └── centos7
├── HDP
│   └── centos7
├── HDP-GPL
│   └── centos7
└── HDP-UTILS-1.1.0.22
    ├── hdp-utils.repo
    ├── openblas
    ├── repodata
    ├── RPM-GPG-KEY
    └── snappy

11 directories, 1 file
[root@dev-bg-m01 html]#
```

#### 编辑ambari yum源文件

``` shell
[root@dev-bg-m01 yum.repos.d]## cat ambari.repo
#VERSION_NUMBER=2.6.1.5-3
[ambari-2.6.1.5]
name=ambari Version - ambari-2.6.1.5
baseurl=http://192.168.103.3/ambari/ambari/centos7/2.6.1.5-3/
gpgcheck=1
gpgkey=http://192.168.103.3/ambari/ambari/centos7/2.6.1.5-3/RPM-GPG-KEY/RPM-GPG-KEY-Jenkins
enabled=1
priority=1
[root@dev-bg-m01 yum.repos.d]#

[root@dev-bg-m01 yum.repos.d]## cat hdp.repo
#VERSION_NUMBER=2.6.4.0-91
[HDP-2.6.4.0]
name=HDP Version - HDP-2.6.4.0
baseurl=http://192.168.103.3/ambari/HDP/centos7/2.6.4.0-91/
gpgcheck=1
gpgkey=http://192.168.103.3/ambari/HDP/centos7/2.6.4.0-91/RPM-GPG-KEY/RPM-GPG-KEY-Jenkins
enabled=1
priority=1


[HDP-UTILS-1.1.0.22]
name=HDP-UTILS Version - HDP-UTILS-1.1.0.22
baseurl=http://192.168.103.3/ambari/HDP-UTILS-1.1.0.22/
gpgcheck=1
gpgkey=http://192.168.103.3/ambari/HDP-UTILS-1.1.0.22/RPM-GPG-KEY/RPM-GPG-KEY-Jenkins
enabled=1
priority=1
[root@dev-bg-m01 yum.repos.d]#

[root@dev-bg-m01 yum.repos.d]## cat hdp.gpl.repo
[HDP-2.6-GPL-repo-1]
name=HDP-2.6-GPL-repo-1
baseurl=http://192.168.103.3/ambari/HDP-GPL/centos7/2.6.4.0-91/
gpgkey=http://192.168.103.3/ambari/HDP-GPL/centos7/2.6.4.0-91/RPM-GPG-KEY/RPM-GPG-KEY-Jenkins
path=/
enabled=1
gpgcheck=0

[root@dev-bg-m01 yum.repos.d]#

更新yum 元数据
yum clean all
yum makecache
yum repolist
```

### 安装Ambari-server

``` shell
在主节点安装ambari-server
sudo yum install -y ambari-server
```

#### 配置Ambari-server

``` shell
配置mysql连接器
由于ambari要访问数据库，所以要添加lib包，请自行去mysql官网下载
sudo mkdir -p /usr/share/java
sudo cp /opt/mysql-connector-java-5.1.47/mysql-connector-java-5.1.47-bin.jar /usr/share/java/

在ambari-server配置文件中添加mysql lib包路径地址

执行一下命令配置jdbc环境

ambari-server setup --jdbc-db=mysql --jdbc-driver=/usr/share/java/mysql-connector-java-5.1.47-bin.jar

vim /etc/ambari-server/conf/ambari.properties
###在jdbc区下面找个位置添加如下如下语句
server.jdbc.driver.path=/usr/share/java/mysql-connector-java-5.1.47-bin.jar


检查环境并配置
执行以下命令
sudo ambari-server setup
按提示操作

会检查selinux，是否自定义用户，检查防火墙，设置JDK路径，数据库配置等，按提示操作即可

具体操作如下：

[root@dev-bg-m01 opt]## vim /etc/ambari-server/conf/ambari.properties 
[root@dev-bg-m01 opt]## ambari-server setup --jdbc-db=mysql --jdbc-driver=/usr/share/java/mysql-connector-java-5.1.47-bin.jar
Using python /usr/bin/python
Setup ambari-server
Copying /usr/share/java/mysql-connector-java-5.1.47-bin.jar to /var/lib/ambari-server/resources
If you are updating existing jdbc driver jar for mysql with mysql-connector-java-5.1.47-bin.jar. Please remove the old driver jar, from all hosts. Restarting services that need the driver, will automatically copy the new jar to the hosts.
JDBC driver was successfully initialized.
Ambari Server 'setup' completed successfully.
[root@dev-bg-m01 opt]## vim /etc/ambari-server/conf/ambari.properties 
[root@dev-bg-m01 opt]## ambari-server setup
Using python /usr/bin/python
Setup ambari-server
Checking SELinux...
SELinux status is 'disabled'
Customize user account for ambari-server daemon [y/n] (n)? y
Enter user account for ambari-server daemon (root):ambari
Adjusting ambari-server permissions and ownership...
Checking firewall status...
Checking JDK...
Do you want to change Oracle JDK [y/n] (n)? y 
[1] Oracle JDK 1.8 + Java Cryptography Extension (JCE) Policy Files 8
[2] Oracle JDK 1.7 + Java Cryptography Extension (JCE) Policy Files 7
[3] Custom JDK
==============================================================================
Enter choice (1): 3
WARNING: JDK must be installed on all hosts and JAVA_HOME must be valid on all hosts.
WARNING: JCE Policy files are required for configuring Kerberos security. If you plan to use Kerberos,please make sure JCE Unlimited Strength Jurisdiction Policy Files are valid on all hosts.
Path to JAVA_HOME: /opt/jdk1.8.0_161
Validating JDK on Ambari Server...done.
Checking GPL software agreement...
Completing setup...
Configuring database...
Enter advanced database configuration [y/n] (n)? y
Configuring database...
==============================================================================
Choose one of the following options:
[1] - PostgreSQL (Embedded)
[2] - Oracle
[3] - MySQL / MariaDB
[4] - PostgreSQL
[5] - Microsoft SQL Server (Tech Preview)
[6] - SQL Anywhere
[7] - BDB
==========================================

Enter choice (1): 3
Hostname (localhost): 192.168.103.3
Port (3306): 
Database name (ambari): 
Username (ambari): 
Enter Database Password (bigdata): 
Re-enter password: 
Configuring ambari database...
Configuring remote database connection properties...
WARNING: Before starting Ambari Server, you must run the following DDL against the database to create the schema: /var/lib/ambari-server/resources/Ambari-DDL-MySQL-CREATE.sql
Proceed with configuring remote database connection properties [y/n] (y)? n
WARNING: Remote database setup aborted.
Ambari Server 'setup' completed with warnings.
[root@dev-bg-m01 opt]#
```

#### 将Ambari数据库脚本导入到数据库

``` shell
mysql -uambari -pxxx
use ambari;
source /var/lib/ambari-server/resources/Ambari-DDL-MySQL-CREATE.sql

启动ambari server
ambari-server start

在浏览器中访问ip:8080，默认登录名：admin 密码:admin
```

添加服务组件
https://docs.hortonworks.com/HDPDocuments/Ambari-2.6.1.5/bk_ambari-administration/content/ambari_admin_overview.html

#### spark配置

``` shell
由于spark要访问数据库，所以要添加mysql lib包
cp /opt/mysql-connector-java-5.1.47/mysql-connector-java-5.1.47-bin.jar /usr/hdp/2.6.4.0-91/spark/lib/
```

## 安装数据库

使用现有数据库或者自己安装

``` shell
创建ambari和hive库
create database ambari character set utf8 ;

添加权限
GRANT ALL PRIVILEGES ON keystone.* TO 'keystone'@'%' IDENTIFIED BY 'ambari';
FLUSH PRIVILEGES;
删除权限：
revoke all privileges on ambari.* from ambari@'%';
```

## 程序安装目录

``` shell
程序默认安装目录
[root@test-bg-m01 2.6.4.0-91]## pwd
/usr/hdp/2.6.4.0-91
[root@test-bg-m01 2.6.4.0-91]## ls
atlas hadoop hadoop-mapreduce hbase hive2 kafka pig ranger-hdfs-plugin ranger-kafka-plugin ranger-yarn-plugin spark storm tez usr
etc hadoop-hdfs hadoop-yarn hive hive-hcatalog livy ranger-hbase-plugin ranger-hive-plugin ranger-storm-plugin slider spark2 storm-slider-client tez_hive2 zookeeper
[root@test-bg-m01 2.6.4.0-91]#


PID目录

/var/run/

日志目录
/var/logs/

一般修改log目录，在安装大数据组件的时候，修改配置文件即可。
```

### 删除服务

``` shell
先停止服务
Service Actions > Delete Service
yum remove xx
https://docs.hortonworks.com/HDPDocuments/Ambari-2.6.1.5/bk_ambari-administration/content/ambari_admin_overview.html
```

ambari监控

## ambari安装默认用户和用户组

https://docs.hortonworks.com/HDPDocuments/Ambari-2.6.1.5/bk_ambari-administration/content/defining_service_users_and_groups_for_a_hdp_2x_stack.html

## 常见问题

``` shell
问题1：Centos 7安装 ambari-agent报错NetUtil.py-[SSL: CERTIFICATE_VERIFY_FAILED]

Centos 7安装 ambari通过Ambari部署系统时，ambari-agent注册失败，在/var/log/ambari-agent的log中可以看到日志显示：
ERROR 2018-03-08 15:02:25,223 NetUtil.py:88 - [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed (_ssl.c:579) 
ERROR 2018-03-08 15:02:25,223 NetUtil.py:89 - SSLError: Failed to connect. Please check openssl library versions.

解决方法：

修改/etc/python/cert-verification.cfg配置文件： 
## vim /etc/python/cert-verification.cfg
[https]
verify=platform_default ###(这是默认配置)
修改为verify=disable

编辑 /etc/ambari-agent/conf/ambari-agent.ini 配置文件，在 [security] 节部分，确保设置如下两个值，其它值保持不变：
[root@ambari ~]## vim /etc/ambari-agent/conf/ambari-agent.ini
[security]
ssl_verify_cert=0
force_https_protocol=PROTOCOL_TLSv1_2
以上配置修改完后，重试即可通过ambari-agent注册，执行即可下一步
```

参考文档
官方文档安装文档

https://docs.hortonworks.com/HDPDocuments/Ambari-2.6.1.5/bk_ambari-installation/content/determine_product_interop.html


### 参考文章
* https://www.cnblogs.com/xuliang666/p/11381225.html