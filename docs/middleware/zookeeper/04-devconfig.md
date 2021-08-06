---
title: Zookeeper-开发配置
---

::: tip
本文主要是介绍 Zookeeper-开发配置 。
:::

[[toc]]

## Zookeeper 4、Zookeeper开发

## 1、登录Zookeeper客户端

``` shell
#通过zkCli.sh可以登录到Zookeeper
$ cd /usr/local/zookeeper-3.4.6/bin
$ ./zkCli.sh 
```



``` shell
#如果显示下面这样就说明登录成功了
JLine support is enabled

WATCHER::

WatchedEvent state:SyncConnected type:None path:null
[zk: localhost:2181(CONNECTED) 0] 
```



## 2、如何在Zookeeper下使用帮助文档



``` shell
#通过 -h命令可以可看Zookeeper下的所有命令和使用方法
[zk: localhost:2181(CONNECTED) 0] -h
ZooKeeper -server host:port cmd args
    connect host:port
    get path [watch]
    ls path [watch]
    set path data [version]
    rmr path
    delquota [-n|-b] path
    quit 
    printwatches on|off
    create [-s] [-e] path data acl
    stat path [watch]
    close 
    ls2 path [watch]
    history 
    listquota path
    setAcl path acl
    getAcl path
    sync path
    redo cmdno
    addauth scheme auth
    delete path [version]
    setquota -n|-b val path
```



　　下面是一些小练习：



``` shell
#查看所有目录
ls /

#在Zookeeper的根目录下创建一个test的文件 内容是xxx
create / test2 womendoushixiaoxueshen

# 获取一个文件的值，下面是输出信息
get /test2

#womendoushixiaoxueshen
#cZxid = 0x4300000003
#ctime = Sun Mar 13 13:28:53 CST 2016
#mZxid = 0x4300000004
#mtime = Sun Mar 13 14:12:15 CST 2016
#pZxid = 0x4300000003
#cversion = 0
#dataVersion = 1
#aclVersion = 0
#ephemeralOwner = 0x0
#dataLength = 10
#numChildren = 0

#重新设置一个文件的值
 set /test2 helloword

#删除一个文件或目录
rmr /test2
```



## 参考文章
* https://www.cnblogs.com/raphael5200/p/5289690.html