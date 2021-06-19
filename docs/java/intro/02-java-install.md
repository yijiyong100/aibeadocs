---
title: Java安装和环境变量
---

## Java基础知识篇【Java安装和环境变量】

::: tip
本文主要是介绍Java 安装和环境变量。
:::

[[toc]]

## 一、jdk安装及环境配置

## 1. 下载jdk

去oracle官网下载，这里使用的jdk版本为

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/java/intro/install_1.png')" alt="wxmp">

有一个需要注意的问题就是7u71后的jdk有两个版本，奇数版本为无BUG版，偶数版包含奇数版全部内容但是有一些未被验证的BUG，推荐使用奇数版。

注意根据自己的电脑选择 64位或者32位版本，目前大多数电脑都是需要安装64位的安装包。

jdk百度云下载地址：

链接：[https://pan.baidu.com/s/14gKuaLBtPpllG0l3zmH1_g](https://pan.baidu.com/s/14gKuaLBtPpllG0l3zmH1_g )
提取码：w0fb

 

##  2. 安装jdk

点击安装jdk后会进行两次安装，第一次是jdk，第二次是jre。注意将jdk和jre安装在同一目录【Java】下

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/java/intro/install_2.png')" alt="wxmp">

 

## 3. 配置Java环境变量

### ①. 新建【JAVA_HOME】变量

计算机右键属性--高级系统设置--环境变量--系统变量，新建 【JAVA_HOME】变量，变量值填写jdk的安装目录

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/java/intro/install_3.png')" alt="wxmp">

### ②. 编辑【Path】变量

在变量值最后输入 【%JAVA_HOME%\bin;%JAVA_HOME%\jre\bin;】

（注意原来Path的变量值末尾有没有;号，如果没有，先输入;号再输入上面的内容）

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/java/intro/install_4.png')" alt="wxmp">

### ③. 新建【CLASSPATH】变量

变量值为【.;%JAVA_HOME%\lib\dt.jar;%JAVA_HOME%\lib\tools.jar;】

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/java/intro/install_5.png')" alt="wxmp">

三个设置完毕之后点击确定（有两次点击）退出

 

## 4. 测试环境配置是否成功

在cmd中输入java –version 和javac 输出相应信息说明配置成功！

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/java/intro/install_6.png')" alt="wxmp">




## 参考文章
* https://www.cnblogs.com/qintang/p/9833568.html