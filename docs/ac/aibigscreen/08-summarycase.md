---
title: 智慧大屏-开源综合汇总案例
---

::: tip
本文主要是介绍 智慧大屏-开源综合汇总案例 。
:::

[[toc]]

## 大屏数据可视化案例

**数据可视化：把相对复杂的、抽象的数据通过可视的、交互的方式进行展示，从而形象直观地表达数据蕴含的信息和规律**。
**数据可视化是数据空间到图形空间的映射，是抽象数据的具象表达**。
**数据可视化交互的基本原则：总览为先，缩放过滤按需查看细节**。

大屏数据可视化是当前可视化领域的一项热门应用，通常可以分为信息展示类、数据分析类及监控预警类。
大屏数据可视化应用的难点并不在于图表类型的多样化，而在于如何能在简单的一页之内让用户读懂数据之间的层次与关联，这就关系到布局、色彩、图表、动效的综合运用。如排版布局应服务于业务，避免为展示而展示；配色一般以深色调为主，注重整体背景和单个视觉元素背景的一致性。
制作可视化大屏，最便捷有效的方式是使用DataV、帆软等报表工具，而本示例项目则使用ECharts自行开发。

### **项目案例 - 上市公司全景概览**

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ac/aibigscreen/sumcase-1.png')" alt="wxmp">

### **地图数据可视化 - 基于ECharts Geo**

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ac/aibigscreen/sumcase-2.png')" alt="wxmp">

### **3D图表展示 - 基于ECharts GL**
<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ac/aibigscreen/sumcase-3.png')" alt="wxmp">

### **热力图展示 - 基于ECharts & 百度地图**

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ac/aibigscreen/sumcase-4.png')" alt="wxmp">

### **ECharts扩展示例**

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ac/aibigscreen/sumcase-5.png')" alt="wxmp">

### **旭日图 - 基于ECharts V4.2**

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ac/aibigscreen/sumcase-6.png')" alt="wxmp">

### **地理信息数据 - ECharts & Baidu Map**

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ac/aibigscreen/sumcase-7.png')" alt="wxmp">

### 源码和案例展示地址

项目Git地址：https://github.com/yyhsong/iDataV

[项目Git地址](https://github.com/yyhsong/iDataV)

演示地址：https://yyhsong.github.io/iDataV

[演示地址](https://yyhsong.github.io/iDataV)

**后记**：
除自行开发可视化大屏外，还可以通过第三方服务来快速实现，如阿里云DataV、腾讯云图、百度Sugar等，具体可参考：https://blog.csdn.net/hwhsong/article/details/83097924。

## 【----------------------------】

## 大屏数据可视化

## 重要声明

本项目所有案例采用的数据均属虚构，切勿当真！

## 项目案例 - 上市公司全景概览

综合使用条形图、柱状图、折线图、饼图、地图、数字翻牌器来实现一个常规的大屏数据可视化项目。

## 项目案例 - 上市公司地域分布

以百度地图为底图，结合ECharts绘制地理信息数据

## 旭日图 - 基于ECharts V4.2

旭日图（Sunburst）是ECharts 4.0新增的图表类型，由多层的环形图组成，在数据结构上，内圈是外圈的父节点。 因此，它既能像饼图一样表现局部和整体的占比，又能像矩形树图一样表现层级关系。

## 树图 - 基于ECharts V4.2

树图是一种流行的利用包含关系表达层次化数据的可视化方法。

## 地图数据可视化 - 基于ECharts Geo

地图热点、飞线动效，世界地图、中国地图、省份地图、城市地图、区县地图

## 3D图表展示 - 基于ECharts GL

3D柱形图，3D地球，二维数据的3D化展示

## 热力图展示 - 基于ECharts & 百度地图

基于百度地图的热力图，基于笛卡尔坐标系的热力图

## ECharts扩展示例

词云，水球图，烟花秀，关系图谱，中国地图

## 阿里云DataV案例 - 智慧文旅驾驶舱

基于阿里云DataV大屏制作工具，演示图表组件基本用法

## 阿里云DataV案例 - 企业实时销售大盘

基于DataV行业模板快速生成，采用静态JSON数据

## 百度Sugar案例 - 上交所上市公司全景概览

基于百度Sugar行业模板快速生成，采用远程数据源

## 百度Sugar案例 - 深交所上市公司全景概览

以已有的大屏为模板快速创建，切换风格，更改数据源

## 腾讯云图案例 - 云计算服务监控

基于腾讯云图平台提供的模板制作，采用静态JSON数据

## 腾讯云图案例 - 智慧零售门店数据（竖屏版）

基于腾讯云图平台提供的模板制作，采用静态JSON数据，适用于竖屏展示

## 大屏模板

可在这些不同风格的模板基础上快速开始一个可视化大屏项目

------

演示地址：https://yyhsong.github.io/iDataV/

项目简介：https://blog.csdn.net/hwhsong/article/details/80805511


## 参考文章
* https://blog.csdn.net/hwhsong/article/details/80805511
* https://github.com/yyhsong/idatav