---
title: TensorFlow-安装步骤详解
---

::: tip
本文主要是介绍 TensorFlow-安装步骤详解 。
:::

[[toc]]

## TensorFlow2安装（超详细步骤-人工智能实践）

## TensorFlow2安装教程

## 1 前言

点滴进步，加油！
最近在MOOC看北京大学的曹健老师的[《人工智能实践：Tensorflow笔记》](https://www.icourse163.org/course/PKU-1002536002)课程。
其中[第一章的第8节提到了详细的TensorFlow安装过程](https://www.icourse163.org/learn/PKU-1002536002?tid=1462067447#/learn/content?type=detail&id=1238898228&sm=1)。因为慕课的课程有时限，故记录在此处。

### 1.1 版本记录

我之前在**D:\SoftWare\Anaconda3-2019.10-Windows-x86_64\Scripts**路径下安装的TensorFlow2.0版本<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ad/tensorflow/install/20201014171256898.png')" alt="wxmp">
按照老师的课程安装了**TF2.1**环境，路径如下：两者互不干扰<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ad/tensorflow/install/20201014171439516.png')" alt="wxmp">

### 1.2 工具简介

**所需软件工具如下：**
1、[Anaconda](https://www.anaconda.com/products/individual)：https://anaconda.org/
2、[PyCharm](https://www.jetbrains.com/pycharm/download/#section=windows)：https://www.jetbrains.com/pycharm/

## 2 详细步骤及安装语句

说明：因我安装好，才想要记录，故以下截图大部分来自课程，少部分来自我的安装截图。

### 2.1 安装Anaconda

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ad/tensorflow/install/20201014172007263.png')" alt="wxmp">
<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ad/tensorflow/install/202010141720591.png')" alt="wxmp">

### 2.2 TensoFlow安装

打开Anaconda Prompt<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ad/tensorflow/install/20201014172148538.png')" alt="wxmp">
命令行输入：conda create -n TF2.1 python==3.7
<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ad/tensorflow/install/20201014172250235.png')" alt="wxmp"><img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ad/tensorflow/install/20201014172348818.png')" alt="wxmp">
命令行输入：conda activate TF2.1<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ad/tensorflow/install/20201014172544572.png')" alt="wxmp">
命令行输入：conda inatall cudatoolkit=10.1<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ad/tensorflow/install/20201014172635394.png')" alt="wxmp">
<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ad/tensorflow/install/20201014172646521.png')" alt="wxmp">
命令行输入：conda install cudnn=7.6<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ad/tensorflow/install/20201014172730126.png')" alt="wxmp">
<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ad/tensorflow/install/20201014172742129.png')" alt="wxmp">
<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ad/tensorflow/install/20201014172754783.png')" alt="wxmp">
命令行输入：pip install tensorflow==2.1<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ad/tensorflow/install/20201014172819373.png')" alt="wxmp">

### 2.3 验证是否成功

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ad/tensorflow/install/20201014172958186.png')" alt="wxmp">

语句列表及截图如下：

```python
import tensorflow as tf
tf._*version*_
```

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ad/tensorflow/install/20201014173032639.png')" alt="wxmp">
环境路径<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ad/tensorflow/install/202010141735260.png')" alt="wxmp">

### 2.4 PyCharm下载与安装

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ad/tensorflow/install/20201014173248154.png')" alt="wxmp">
<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ad/tensorflow/install/20201014173259919.png')" alt="wxmp">

### 2.5 PyCharm环境配置

创建工程
<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ad/tensorflow/install/20201014173408979.png')" alt="wxmp">
设置环境变量<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ad/tensorflow/install/20201014173801959.png')" alt="wxmp">
<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ad/tensorflow/install/20201014173820912.png')" alt="wxmp">
<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ad/tensorflow/install/20201014173920535.png')" alt="wxmp">
<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ad/tensorflow/install/20201014174023579.png')" alt="wxmp">
测试代码`

```python
import tensorflow as tf

tensorflow_version = tf.__version__
gpu_avilable = tf.test.is_gpu_available()

print("tensorflow version: ", tensorflow_version,"\tGPU aviable:", gpu_avilable)

a = tf.constant([1.0,2.0], name = 'a')
b = tf.constant([1.0,2.0], name = 'b')
result = tf.add(a,b,name='add')
print(result)`
```

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ad/tensorflow/install/20201014174255370.png')" alt="wxmp">

### 2.5.1 不唐初尝试

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ad/tensorflow/install/2020101417375391.png')" alt="wxmp">
<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ad/tensorflow/install/20201014173858642.png')" alt="wxmp">
<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ad/tensorflow/install/20201014173936898.png')" alt="wxmp">

## 其他安装教程参考：
Anaconda3+tensorflow2.0.0+PyCharm安装与环境搭建：
https://ai-wx.blog.csdn.net/article/details/104342769

[Anaconda3+tensorflow2.0.0+PyCharm安装与环境搭建](https://ai-wx.blog.csdn.net/article/details/104342769)


## 参考文章
* https://blog.csdn.net/qq_37777291/article/details/109078633