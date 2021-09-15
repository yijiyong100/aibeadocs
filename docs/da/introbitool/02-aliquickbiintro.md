---
title: 阿里QuickBI工具介绍
---

::: tip
本文主要是介绍 阿里QuickBI工具介绍 。
:::

[[toc]]

## 【实践】QuickBI常见图表介绍


## 1. 摘要

本文介绍阿里云的QuickBI工具可以产生的各种图表类型，以便了解其产品最终呈现功能。

## 4. QuickBI常见图表介绍

### 4.1 漏斗图

漏斗图样式：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/da/introbitool/quickbi/1190574-4e882f19a71c743f.png')" alt="wxmp">

漏斗图配置：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/da/introbitool/quickbi/1190574-ef79f708c9a4124f.png')" alt="wxmp">

3.漏斗图配置.png

### 4.2 百分比堆积条形图

样式：



<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/da/introbitool/quickbi/1190574-8c8aefa761a2ee81.png')" alt="wxmp">

4.百分比堆积条形图.png

配置：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/da/introbitool/quickbi/1190574-34f2c65a4c4a6ce6.png')" alt="wxmp">

4.百分比堆积条形图配置.png

### 4.3 堆积面积图

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/da/introbitool/quickbi/1190574-253a6f671ff7d3fe.png')" alt="wxmp">

5.堆积面积图.png

### 4.4 雷达图

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/da/introbitool/quickbi/1190574-b6aa531fca39d83b.png')" alt="wxmp">

6.雷达图.png

### 4.5 指标看板

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/da/introbitool/quickbi/1190574-7d876fced47d319c.png')" alt="wxmp">

7.指标看板.png

### 4.6 色彩地图

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/da/introbitool/quickbi/1190574-a706bb9a86d79e81.png')" alt="wxmp">

8.色彩地图.png

### 4.7 组合图

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/da/introbitool/quickbi/1190574-5f548dcf2352ee5c.png')" alt="wxmp">

9.组合图.png

### 4.8 气泡地图

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/da/introbitool/quickbi/1190574-1086af0a04b1bae6.png')" alt="wxmp">

10.气泡地图.png

### 4.9 钻取组合图

参考例子，可以从西南区域到广西省份到广西各个城市的饼状图；

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/da/introbitool/quickbi/1190574-152069d0d8c015ee.gif')" alt="wxmp">

image

### 4.10 LBS飞线地图

LBS飞线地图以一个地图轮廓为背景，用动态的飞线反映两地或者多地之间的数据关系。

LBS飞线地图是由两个地理区域和LBS飞线度量构成的。地理区域由数据的维度决定，如省份或者城市；LBS飞线度量的大小由数据的度量决定，如运输成本、订单数量等。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/da/introbitool/quickbi/1190574-fced1e42c53ce47b.png')" alt="wxmp">

image

### 4.11 仪表盘

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/da/introbitool/quickbi/1190574-baf9c82f47f1b398.png')" alt="wxmp">

image

### 4.12 散点图

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/da/introbitool/quickbi/1190574-17edc21c34939b3d.png')" alt="wxmp">

img

### 4.13 矩阵树图

矩阵树图用来描述考察对象之间数据指标的相对占比关系。

矩阵树图是由色块标签和色块大小组成的。色块标签由数据的维度决定，如产品包箱；色块大小由数据的度量决定，如运输成本。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/da/introbitool/quickbi/1190574-a02054a2eb70660b.png')" alt="wxmp">

image

### 4.14 树图

树图是通过树形结构来展现层级数据的组织关系，以父子层次结构来组织对象，是枚举法的一种表达方式，例如查看某个省份下各地级市的收入状况，那么省份与地级市之间的关系就可以看做是父子层次结构。树图适用于与组织结构有关的分析，如公司的人员组织结构，或者医院的科室组织结构。

树图是由树父子节点标签和树父子节点指标构成的。每个树父子节点标签由数据的维度决定，如区域，产品类型等；每个树父子节点指标由数据的度量决定，如订单数量，订单金额等。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/da/introbitool/quickbi/1190574-f1282e68a52df365.png')" alt="wxmp">

image

### 4.15 词云图

词云图可以很直观的显示词频。适用于做一些用户的画像和用户的标签。

词云图是由词标签和词大小构成的。每个词标签由数据的维度决定，如客户名称，产品名称等；每个词大小由数据的度量决定，如利润金额，单价等。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/da/introbitool/quickbi/1190574-ca6f0c97881f13ad.png')" alt="wxmp">

image

### 4.16 来源去向图

来源去向图通过划分来源、中间和去向页面的统计数据，展示页面流转的流量数据。

来源去向图目前仅支持三级的维度，这三级维度是由中心节点、节点类型、节点名称构成；图表的度量是由节点指标构成。

- 来源去向图的中心节点、节点名称、节点类型最多取1个维度，并且维度字段之间是有层级关系的，节点类型字段的值，必须为source、center、goal三个维值，分别对应来源部分的取值、中心节点、以及去向的趋势。节点指标最多取一个度量。

  数据来源为：中心节点为所选维值，且节点类型为**source**；数据去向为：中心节点为所选维值，且节点类型为**goal**；占比取值为：来源取值÷ 中心节点的数值。

  <img class= "zoom-custom-imgs" :src="$withBase('/assets/img/da/introbitool/quickbi/1190574-ff5b9c2399b695e3.png')" alt="wxmp">

  image

### 4.17 排行榜

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/da/introbitool/quickbi/1190574-f2daead7ad22ba23.png')" alt="wxmp">

image

### 4.18 翻牌器

用来展示核心KPI数据的结果，并支持自定义背景颜色等样式设置。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/da/introbitool/quickbi/1190574-4a59a6300ac8e1e0.png')" alt="wxmp">

image

### 4.19 指标拆解树

指标拆解树的使用场景很多，例如渠道分析、贡献分析。通过分解核心指标，来找到影响指标的关键渠道或关键成员。

指标拆解树是由分析和拆解依据组成的。拆解依据由数据的维度决定，例如区域、 省份、城市、产品名称等；分析由数据的度量决定，例如销售额、订单数量等。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/da/introbitool/quickbi/1190574-a3d617a533e017e1.png')" alt="wxmp">

image

## 5. 参考

（2）Quick BI行业标杆客户实战应用场景和DEMO
[https://www.aliyun.com/product/bigdata/bi](https://links.jianshu.com/go?to=https%3A%2F%2Fwww.aliyun.com%2Fproduct%2Fbigdata%2Fbi)


## 参考文章
* https://www.jianshu.com/p/9a56e0f9e669