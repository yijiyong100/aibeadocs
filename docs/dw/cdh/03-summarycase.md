---
title: CDH-安装案例总结
---

::: tip
本文主要是介绍 CDH-安装案例总结 。
:::

[[toc]]

## Centos7离线部署CDH6.3.2集群


## 一、CDH6要求和支持的版本

官方指导：[https://docs.cloudera.com/documentation/enterprise/6/release-notes/topics/rg_hardware_requirements.html#concept_oc2_s4b_jbb](https://links.jianshu.com/go?to=https%3A%2F%2Fdocs.cloudera.com%2Fdocumentation%2Fenterprise%2F6%2Frelease-notes%2Ftopics%2Frg_hardware_requirements.html%23concept_oc2_s4b_jbb)

## 二、环境准备

### 1.硬件

本次搭建使用ZStack对服务器进行虚拟化，共虚拟化5个节点，使用Linux发行版本为CentOS7.8。

| IP地址        | HostName  |  CPU  | Memory | Disk   |
| ------------- | :-------: | :---: | :----: | :----- |
| 192.168.10.31 | jht-cdh-1 |  40   | 100GB  | 700GB  |
| 192.168.11.20 | jht-cdh-2 |  40   |  60GB  | 1600GB |
| 192.169.11.21 | jht-cdh-3 |  40   |  60GB  | 1600GB |
| 192.168.11.26 | jht-cdh-4 |  40   |  60GB  | 1600GB |
| 192.168.11.27 | jht-cdh-5 |  50   |  60GB  | 1600GB |

### 2.软件包下载

由于目前Cloudera公司不允许下载免费的安装包，故将软件打包在网盘中，自取路径：
链接：[https://pan.baidu.com/s/11g_Ub9coen94koYzHbBCig](https://links.jianshu.com/go?to=https%3A%2F%2Fpan.baidu.com%2Fs%2F11g_Ub9coen94koYzHbBCig)
提取码：q01v

## 三、安装前环境修改

### 1.关闭防火墙

每个节点都要执行



``` shell 
1.查看防火墙状态
systemctl status firewalld.service
```



``` shell 
2.临时关闭防火墙
systemctl stop firewalld.service
```



``` shell 
3.设置防火墙开机不启动
systemctl disable firewalld.service
```

### 2.关闭selinux

#### 2.1什么是selinux

安全增强式Linux（SELinux, Security-Enhanced Linux）是一种强制访问控制（mandatory access control）的实现。它的作法是以最小权限原则（principle of least privilege）为基础，在Linux核心中使用Linux安全模块（Linux Security Modules）



``` shell 
1.查看eslinux状态
getenforce 0
```

返回状态为：Enforcing，为启动状态；Permissive，为未运行状态；



``` shell 
2.临时关闭eslinux
setenforce 0
```



``` shell 
3.永久关闭selinux
vim /etc/selinux/config
将SELINUX=enforcing修改为SELINUXTYPE=disable
```

### 3.修改hostname



``` shell 
1.查看hostname
hostname
```



``` shell 
2.修改hostname
vim /etc/hostname
将原hostname修改为想要修改的hostname
```

### 4.配置hosts文件



``` shell 
vim /etc/hosts

127.0.0.1   localhost localhost.localdomain localhost4 localhost4.localdomain4
::1         localhost localhost.localdomain localhost6 localhost6.localdomain6

添加
192.168.10.31 jht-cdh-1
192.168.11.21 jht-cdh-2
192.168.11.22 jht-cdh-3
192.168.11.26 jht-cdh-4
192.168.11.27 jht-cdh-5
```

### 5.配置免密码登陆



``` shell 
1.进入root目录
cd /root
```



``` shell 
2.生成公钥与私钥
ssh-keygen -t rsa
连续点三次回车
在/root/.ssh目录下生成两个文件id_rsa、id_rsa.pub（公钥、私钥）
每个节点都要生成！！！
```



``` shell 
3.将每台的公钥发送至第一台服务器
在其他服务器上执行：ssh-copy-id jht-cdh-1
需要输密码
```

此过程是将每台服务器的公钥复制在第一台服务器/root/.ssh/authorized_keys文件中



``` shell 
4.复制第一台服务器的认证到其他服务器
scp /root/.ssh/authorized_keys jht-cdh-2:/root/.ssh
scp /root/.ssh/authorized_keys jht-cdh-3:/root/.ssh
scp /root/.ssh/authorized_keys jht-cdh-4:/root/.ssh
scp /root/.ssh/authorized_keys jht-cdh-5:/root/.ssh
```

### 6.设置时钟同步

由于为离线安装，无法与外部时钟同步服务器进行同步，需要在集群内部设置一个时钟同步服务器，让其他服务器与此服务器进行时间同步，可以保证在集群内部的所有节点时间的一致的。



``` shell 
1.查看是否安装ntp服务（所有服务器都要进行验证）
rpm -aq ｜ grep ntp
ntpdate-4.2.6p5-29.el7.centos.x86_64
```

本台服务器已安装ntp服务，不需要进行安装
若没有安装可以通过yum或rpm的方式进行安装



``` shell 
2.配置时钟同步主服务器
vim /etc/ntp.conf
在配置文件中修改内容为
restrict 192.168.10.31 mask 255.255.255.0 nomodify notrap
（这里的IP为本机IP）

server 127.127.1.0
Fudge 127.127.1.0 stratum 8
```

修改后配置文件为：



<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dw/cdh/cdhinstallcase/25692595-44da11d54e385153.png')" alt="wxmp">





``` shell 
3.启动ntp服务
systemctl start ntpd.service
```



``` shell 
4.设置ntp服务开机启动
systemctl enable ntpd.service
```

时钟同步主服务器设置完毕，下来配置其他客户服务器



``` shell 
5.配置客户服务器
vim /etc/ntp.conf

修改内容：
server 192.168.10.31（这里的ip为时钟同步主服务器IP）
Fudge 192.168.10.31 stratum 8
```

修改后配置文件内容为：



<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dw/cdh/cdhinstallcase/25692595-57c879e2222b3771.png')" alt="wxmp">





``` shell 
6.启动配置服务器ntp
systemctl start ntpd.service
```



``` shell 
7.查看配置是否生效
ntpq -p

     remote           refid      st t when poll reach   delay   offset  jitter
==============================================================================
*jht-cdh-1       LOCAL(0)         6 u   40   64  377    0.312   -7.667   5.602
```



``` shell 
7.设置开机自启
systemctl enable ntpd.service
```

### 7.主节点部署mysql

1.将系统原装的mysql彻底删除



``` shell 
1.1.停止mysql服务
systemctl stop mysqld

1.2.查看安装mysql情况
rpm -qa | grep -i mysql

qt3-MySQL-3.3.8b-51.el7.x86_64
qt5-qtbase-mysql-5.9.7-2.el7.x86_64
qt-mysql-4.8.7-8.el7.x86_64

1.3.删除软件
rpm -e 包名

1.4.查看与mysql相关路径
find / -name mysql

/etc/selinux/targeted/active/modules/100/mysql
/var/lib/pcp/config/pmlogconf/mysql
/usr/lib64/mysql
/usr/share/mysql
/usr/include/mysql

1.5.删除相关路径
rm -rf 路径
```

系统默认安装mysql已经全部删除掉
2.下载配置mysql的rpm安装包



``` shell 
2.1创建一个关于mysql rpm的目录（随便创建，知道创建路径就行）
mkdir -p /opt/mysql/rpm
cd /opt/mysql/rpm

2.2.下载rpm包
wget https://repo.mysql.com/mysql80-community-release-el7-3.noarch.rpm

2.3.安装mysql源
yum localinstall -y mysql80-community-release-el7-3.noarch.rpm 

2.4.检查mysql源
yum repolist enabled | grep "mysql.*-community.*"

mysql-connectors-community/x86_64 MySQL Connectors Community                 203
mysql-tools-community/x86_64      MySQL Tools Community                      129
mysql80-community/x86_64          MySQL 8.0 Community Server                 265
```

现在能看出mysql为8.0版本的，需要修改yum的配置文件，安装5.7版本的



``` shell 
2.5.修改yum中关于mysql的配置文件
vim /etc/yum.repo.d/mysql-community.repo
```

将[mysql80-community]下的
enabled=1改为0
将[mysql57-community]下的
enabled=0改为1
修改完后：



<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dw/cdh/cdhinstallcase/25692595-6f86586fa7345b4c.png')" alt="wxmp">





``` shell 
2.6.再检查yum仓库
yum repolist enabled | grep "mysql.*-community.*"

mysql-connectors-community/x86_64 MySQL Connectors Community                 203
mysql-tools-community/x86_64      MySQL Tools Community                      129
mysql57-community/x86_64          MySQL 5.7 Community Server                 504
```

3.安装mysql



``` shell 
yum -y install mysql-community-server
```

4.启动mysql



```jsx
systemctl start mysqld.service

设置开机启动
systemctl enable mysqld

查看mysql状态
systemctl status mysqld.service

● mysqld.service - MySQL Server
   Loaded: loaded (/usr/lib/systemd/system/mysqld.service; enabled; vendor preset: disabled)
   Active: active (running) since 三 2021-06-09 11:31:26 CST; 1h 49min ago
     Docs: man:mysqld(8)
           http://dev.mysql.com/doc/refman/en/using-systemd.html
  Process: 20044 ExecStart=/usr/sbin/mysqld --daemonize --pid-file=/var/run/mysqld/mysqld.pid $MYSQLD_OPTS (code=exited, status=0/SUCCESS)
  Process: 20021 ExecStartPre=/usr/bin/mysqld_pre_systemd (code=exited, status=0/SUCCESS)
 Main PID: 20047 (mysqld)
    Tasks: 28
   CGroup: /system.slice/mysqld.service
           └─20047 /usr/sbin/mysqld --daemonize --pid-file=/var/run/mysqld/mysqld.pid

6月 09 11:31:25 jht-cdh-1 systemd[1]: Starting MySQL Server...
6月 09 11:31:26 jht-cdh-1 systemd[1]: Started MySQL Server.
```

可以看出mysql已经安装完成
5.修改mysql中root登陆密码



``` shell 
5.1.在/var/log/mysqld.log中查看默认密码
grep 'temporary password' /var/log/mysqld.log
2021-06-09T03:25:18.238900Z 1 [Note] A temporary password is generated for root@localhost: (Z<1diT>V2dk
```

密码为：(Z<1diT>V2dk



``` shell 
5.2.修改登录密码
mysql -u -p 
输入密码

ALTER USER 'root'@'localhost' IDENTIFIED BY '（要改的密码）';
```

6.修改mysql配置文件



``` shell 
vim /etc/my.cnf

添加内容
validate_password=off
character_set_server=utf8
init_connect='SET NAMES utf8'

重启mysql，将配置进行生效
systemctl restart mysqld
```

此配置内容不修改，创建CDH相关库时会出现问题
7.允许root用户远程登录



``` sql 
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY '（密码）' WITH GRANT OPTION;
FLUSH PRIVILEGES;
```

8.创建CDH相关mysql库



``` sql 
CREATE DATABASE scm DEFAULT CHARACTER SET utf8;
CREATE USER 'scm'@'%'IDENTIFIED BY 'scm';
GRANT ALL PRIVILEGES ON scm.* TO 'scm'@'%' IDENTIFIED BY 'scm';
GRANT ALL PRIVILEGES ON *.* TO 'scm'@'%' IDENTIFIED BY 'scm' WITH GRANT OPTION;

CREATE DATABASE amon DEFAULT CHARACTER SET utf8;
CREATE USER 'amon'@'%'IDENTIFIED BY 'amon';
GRANT ALL PRIVILEGES ON amon.* TO 'amon'@'%' IDENTIFIED BY 'amon';
GRANT ALL PRIVILEGES ON *.* TO 'amon'@'%' IDENTIFIED BY 'amon' WITH GRANT OPTION;

CREATE DATABASE hive DEFAULT CHARACTER SET utf8;
CREATE USER 'hive'@'%'IDENTIFIED BY 'hive';
GRANT ALL PRIVILEGES ON hive.* TO 'hive'@'%' IDENTIFIED BY 'hive';
GRANT ALL PRIVILEGES ON *.* TO 'hive'@'%' IDENTIFIED BY 'hive' WITH GRANT OPTION;

CREATE DATABASE hue DEFAULT CHARACTER SET utf8;
CREATE USER 'hue'@'%'IDENTIFIED BY 'hue';
GRANT ALL PRIVILEGES ON hue.* TO 'hue'@'%' IDENTIFIED BY 'hue';
GRANT ALL PRIVILEGES ON *.* TO 'hue'@'%' IDENTIFIED BY 'hue' WITH GRANT OPTION;

CREATE DATABASE oozie DEFAULT CHARACTER SET utf8;
CREATE USER 'oozie'@'%'IDENTIFIED BY 'oozie';
GRANT ALL PRIVILEGES ON oozie.* TO 'oozie'@'%' IDENTIFIED BY 'oozie';
GRANT ALL PRIVILEGES ON *.* TO 'oozie'@'%' IDENTIFIED BY 'oozie' WITH GRANT OPTION;

FLUSH PRIVILEGES;
```

### 8.创建本地YUM仓库

将网盘下载的两个文件夹上传至主服务器/var/www/html路径下



``` shell 
8.1.安装httpd服务
yum install -y httpd

8.2.启动httpd服务
systemctl start httpd

8.3.设置httpd服务为开机启动
systemctl enable httpd

8.4.在cm6.3.1目录下生成repodata目录
cd /var/www/html/cm6.3.1
createrepo .

8.5.将cdh6.3.2下一个文件改名
mv CDH-6.3.2-1.cdh6.3.2.p0.1605554-el6.parcel.sha256 CDH-6.3.2-1.cdh6.3.2.p0.1605554-el6.parcel.sha
```

生成关于cm的yum配置文件



``` shell 
8.6.在/etc/yum.repo.d/下编辑文件
vim cm.repo

增加内容为
[cmrepo]
name=cm_repo
baseurl=http://jht-cdh-1/cm6.3.1
enabled=true
gpgcheck=false
```



``` shell 
8.7.分发至其他节点
scp /etc /yum.repo .d/cm.repo jht-cdh-2:/etc/yum.repo.d
scp /etc /yum.repo .d/cm.repo jht-cdh-3:/etc/yum.repo.d
scp /etc /yum.repo .d/cm.repo jht-cdh-4:/etc/yum.repo.d
scp /etc /yum.repo .d/cm.repo jht-cdh-5:/etc/yum.repo.d

8.8.在所有服务器都执行
yum repolist

8.9.修改主节点httpd服务配置文件
vim /etc/httpd/conf/httpd.conf

将AddType application/x-gzip .gz .tgz增加配置.parcel

8.10.修改完成重启httpd
systemctl restart httpd
```

在web页面访问地址

[http://jht-cdh-1/cm6.3.1/](https://links.jianshu.com/go?to=http%3A%2F%2Fjht-cdh-1%2Fcm6.3.1%2F)

[http://jht-cdh-1/cdh6.3.2/](https://links.jianshu.com/go?to=http%3A%2F%2Fjht-cdh-1%2Fcdh6.3.2%2F)

### 9.所有服务器安装JDK



``` shell 
9.1.通过yum安装官方提供jdk
yum install -y oracle-j2sdk1.8-1.8.0+update181-1.x86_64
```



``` shell 
9.2.配置jdk环境
vim /etc /profile

增加内容
export JAVA_HOME=/usr/java/jdk1.8.0_181-cloudera
export CLASSPATH=.:$JAVA_HOME/jre/lib/rt.jar:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar
export PATH=:$JAVA_HOME/bin:$PATH

9.3.让配置生效
source /etc/profile
```



``` shell 
9.4.添加mysql驱动包
将mysql-connector-java-5.1.46.jar上传至/opt下
mv /opt/mysql-connector-java-5.1.46.jar /usr/share/java/mysql-connector-java.jar
```

## 四、部署Cloudera Manager

### 1.对所有节点安装daemons、agent



``` shell 
yum install -y cantos-release-scl
yum install -y python27 python27-devel
yum install -y cloudera-manager-daemons
yum install -y Cloudera-manager-agent 
```

### 2.修改所有节点agent配置



``` shell 
vim /etc/cloudera-scm-agent/config.ini

修改server_host值
server_host=jht-cdh-1
```

### 3.在主节点安装cloudera-manager-server及scm数据库初始化



``` shell 
3.1.安装server服务
yum install -y cloudera-manager-server
```



``` shell 
3.2.初始化scm数据库
/opt/cloudera/cm/schema/scm_prepare_database.sh mysql scm scm scm
```

### 4.启动cloudera-manager-server及所有cloudera-manager-agent



``` shell 
4.1.在主节点启动
systemctl start cloudera-scm-server

4.2.所有节点启动
systemctl start cloudera-scm-agent
```

第一次启动时间较长，等待一会
进入web界面[http://jht-cdh-1:7180](https://links.jianshu.com/go?to=http%3A%2F%2Fjht-cdh-1%3A7180)
默认登录账号：admin
默认登录密码：admin
若一直web界面进不去，查看日志



``` shell 
tail -100 /var/log/cloudera-scm-server/cloudera-scm-server.log
```

## 五、集群搭建

进入[http://jht-cdh-1:7180](https://links.jianshu.com/go?to=http%3A%2F%2Fjht-cdh-1%3A7180)
输入默认账号密码

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dw/cdh/cdhinstallcase/25692595-a2388f8c78a820d2.png')" alt="wxmp">




继续

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dw/cdh/cdhinstallcase/25692595-20688b27660fa0ed.png')" alt="wxmp">




接受
继续

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dw/cdh/cdhinstallcase/25692595-03819120818e24a1.png')" alt="wxmp">




选择Cloudera Enterprise Cloudera Enterprise 试用版（白嫖60天）
继续

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dw/cdh/cdhinstallcase/25692595-44f4ddb3473deb14.png')" alt="wxmp">





继续

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dw/cdh/cdhinstallcase/25692595-e07ecb423db85eca.png')" alt="wxmp">




修改集群名称
继续

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dw/cdh/cdhinstallcase/25692595-fa05f4f93796bf1f.png')" alt="wxmp">




可以进行新主机的查找，在下面输入主机的IP或一个IP段

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dw/cdh/cdhinstallcase/25692595-9b0f7acffc415dfb.png')" alt="wxmp">




我这里已经安装好agent服务，直接选择当前管理主机
继续

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dw/cdh/cdhinstallcase/25692595-f64cbdcac9c87d0e.png')" alt="wxmp">




这里选择更多选项
新添加自己的cdh的yum源

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dw/cdh/cdhinstallcase/25692595-de12588adeeac953.png')" alt="wxmp">




保存更改

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dw/cdh/cdhinstallcase/25692595-3328df9bca5c7e67.png')" alt="wxmp">




这里监测到可用的cdh包
继续

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dw/cdh/cdhinstallcase/25692595-c8452bb794632127.png')" alt="wxmp">




从yum源下载分配Parcels
继续

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dw/cdh/cdhinstallcase/25692595-14521b4b2769b0e7.png')" alt="wxmp">





检查主机
发现有两个问题，一个是swap分区，一个是启用透明大页面压缩，根据给的提示进行修改
修改swap分区



``` shell 
1.临时修改
sysctl vm.swappiness=10

2.永久修改
vim /etc/sysctl.conf
添加
vm. swappiness=10
```

修改启用透明大页面压缩



``` shell 
1.临时修改
echo never > /sys/kernel/mm/transparent_hugepage/defrag
echo never > /sys/kernel/mm/transparent_hugepage/enabled

2.永久修改
vim /etc /rc.local
添加
echo never > /sys/kernel/mm/transparent_hugepage/defrag
echo never > /sys/kernel/mm/transparent_hugepage/enabled
保存退出
chmod +x /etc/rc.local
```

重新运行，检查主机



<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dw/cdh/cdhinstallcase/25692595-643573a2518e67c3.png')" alt="wxmp">





没有问题
继续



<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dw/cdh/cdhinstallcase/25692595-c07bc1c282582d7a.png')" alt="wxmp">




继续
添加Cloudera Management Service服务

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dw/cdh/cdhinstallcase/25692595-b9ba3e6e550195eb.png')" alt="wxmp">



## 六.添加服务

这里以安装zookeeper为例进行安装，安装服务大同小异



<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dw/cdh/cdhinstallcase/25692595-1da2c28dc7c11bc4.png')" alt="wxmp">





添加服务



<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dw/cdh/cdhinstallcase/25692595-c6b1b21c3ae57b7e.png')" alt="wxmp">



### 安装zookeeper

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dw/cdh/cdhinstallcase/25692595-57dbd4e96e25a745.png')" alt="wxmp">





选择了3个节点进行安装，zookeeper需为基数个节点
继续



<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dw/cdh/cdhinstallcase/25692595-b982fdc7266e83cd.png')" alt="wxmp">





默认，继续



<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dw/cdh/cdhinstallcase/25692595-10618b31e141c70d.png')" alt="wxmp">




开始安装

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dw/cdh/cdhinstallcase/25692595-08032cc8bfe25262.png')" alt="wxmp">




继续

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dw/cdh/cdhinstallcase/25692595-7e1b9c0eb2db2288.png')" alt="wxmp">





完成
至此，CDH集群已经搭建完成，后续根据工作的需要进行大数据服务的安装。


### 参考文章
* https://www.jianshu.com/p/6f120a99cbae