---
title: Redis安装部署
---

::: tip
本文主要是介绍 Redis安装部署 Centos7 + Centos8 。
:::

[[toc]]


## Centos7安装Redis

## 一、安装gcc依赖

由于 redis 是用 C 语言开发，安装之前必先确认是否安装 gcc 环境（gcc -v），如果没有安装，执行以下命令进行安装

 **[root@localhost local]# yum install -y gcc** 

 

## 二、下载并解压安装包

**[root@localhost local]# wget http://download.redis.io/releases/redis-5.0.3.tar.gz**

**[root@localhost local]# tar -zxvf redis-5.0.3.tar.gz**

 

## 三、cd切换到redis解压目录下，执行编译

**[root@localhost local]# cd redis-5.0.3**

**[root@localhost redis-5.0.3]# make**

 

## 四、安装并指定安装目录

**[root@localhost redis-5.0.3]# make install PREFIX=/usr/local/redis**

 

## 五、启动服务

### 5.1前台启动

**[root@localhost redis-5.0.3]# cd /usr/local/redis/bin/**

**[root@localhost bin]# ./redis-server**

 

### 5.2后台启动

从 redis 的源码目录中复制 redis.conf 到 redis 的安装目录

**[root@localhost bin]# cp /usr/local/redis-5.0.3/redis.conf /usr/local/redis/bin/**

 

修改 redis.conf 文件，把 daemonize no 改为 daemonize yes

**[root@localhost bin]# vi redis.conf**

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/db/redis/install-1.png')" alt="wxmp">

后台启动

**[root@localhost bin]# ./redis-server redis.conf**

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/db/redis/install-2.png')" alt="wxmp">

 

## 六、设置开机启动

添加开机启动服务

**[root@localhost bin]# vi /etc/systemd/system/redis.service**

复制粘贴以下内容：



[Unit]
Description=redis-server
After=network.target

[Service]
Type=forking
ExecStart=/usr/local/redis/bin/redis-server /usr/local/redis/bin/redis.conf
PrivateTmp=true

[Install]
WantedBy=multi-user.target



注意：ExecStart配置成自己的路径 

 

设置开机启动

**[root@localhost bin]# systemctl daemon-reload**

**[root@localhost bin]# systemctl start redis.service**

**[root@localhost bin]# systemctl enable redis.service**

 

创建 redis 命令软链接

**[root@localhost ~]# ln -s /usr/local/redis/bin/redis-cli /usr/bin/redis**

测试 redis

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/db/redis/install-3.png')" alt="wxmp">


服务操作命令

systemctl start redis.service  #启动redis服务

systemctl stop redis.service  #停止redis服务

systemctl restart redis.service  #重新启动服务

systemctl status redis.service  #查看服务当前状态

systemctl enable redis.service  #设置开机自启动

systemctl disable redis.service  #停止开机自启动

## 【----------------------------】

## CentOS8安装Redis的两种方式

## 一、yum方式安装

国内的话建议修改yum源为阿里云，修改方法参考： [CentOS 8修改yum源为国内源](https://www.4spaces.org/centos-modify-yum-repos/)；

### 1.添加EPEL仓库

在CentOS或Red Hat系统中，需要先添加EPEL仓库

1.  \#添加EPEL仓库
2.  sudo yum install epel-release
3.  \#更新yum源
4. sudo yum update

### 2.安装

``` shell
yum install redis
```

### 3.启动

``` shell
systemctl start redis
```

### 4.设置开机自启

``` shell
systemctl enable redis
```

### 5.修改配置

打开`/etc/redis.conf`文件。

### 1）允许远程连接

找到下面这一行，注释掉：

``` shell
bind 127.0.0.1
```

改为：

``` shell
#bind 127.0.0.1
```

### 2）启用密码

找到`# requirepass foobared`一行，删除前面的`#`注释，然后将`foobared`改为你自己的密码。

``` shell
requirepass your_password
```

### 6.开放端口

如果启用了防火墙，redis默认端口`6379`需要进行开放，开放端口参考： [CentOS开放端口的方法](https://www.4spaces.org/centos-open-porter/) 。

1.  sudo firewall-cmd --add-port=6379/tcp --permanent 
2.  sudo firewall-cmd --reload 
3. systemctl restart redis

7.测试远程连接

``` shell
telnet id 6379
```

能连接说明没问题。

## 二、源码编辑安装

1.  wget http://download.redis.io/redis-stable.tar.gz
2.  tar xvzf redis-stable.tar.gz
3.  cd redis-stable
4.  make test(可省略)
5.  make
6.  sudo make instal

## 参考文章
* https://www.cnblogs.com/heqiuyong/p/10463334.html
* https://www.cnblogs.com/woshixiaozhu/p/13829987.html