---
title: 数据可视化-DataV和Sugar区别
---

::: tip
本文主要是介绍 数据可视化-DataV和Sugar区别 。
:::

[[toc]]

## 阿里DataV介绍
DataV是阿里云出品的专业大屏数据可视化服务， 旨在让更多的人看到数据可视化的魅力，帮助非专业的工程师通过图形化的界面轻松搭建专业水准的可视化应用，满足您会议展览、业务监控、风险预警、地理信息分析等多种业务的展示需求。

DataV可通过拖拽组件+配置数据的方式快速生成可视化大屏，并具有以下特点：

- 专业级大数据可视化：专精于地理信息与业务数据融合的可视化，提供丰富的行业模版和图表组件。
- 多种数据源支持：支持接入包括阿里云分析型数据库、关系型数据库、本地CSV上传和在线API等，支持动态请求。
- 图形化编辑界面：拖拽即可完成样式和数据配置，无需编程就能轻松搭建数据大屏。
- 灵活部署和发布：适配非常规拼接大屏，支持加密发布，支持本地部署。
  DataV已经是比较成熟的商业产品，分基础版、企业版、开发版等，不同版本的功能支持也不尽相同。

## 百度Sugar介绍
百度Sugar是与阿里云DataV类似的产品，目前正处于公测阶段，可免费使用。
在具体的产品使用体验上，百度Sugar还有很多地方有待完善，与DataV相比主要有以下不足：

- 提供的行业模板很少，目前只有4个；
- 支持的数据源类型较少，尤其不支持静态数据，不方便调试；
- 操作的便捷性上有很多细节需要完善，如不支持元素多选、对齐等操作，无法去掉表格的表头等；
- 有明显的系统Bug；

当然，Sugar也有一些做的比较好的地方，比如：

- 支持页面自适应，可适应全屏、宽度铺满（高度按比例缩放）、高度铺满（宽度按比例缩放）；
- 因为有ECharts的加持，报表渲染比较流畅；
- 支持以现有已完成的大屏为模板进行新建项目；

## 案例和操作截图

### 阿里云DataV后台操作界面：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/da/dataview/datavsugardiff-1.png')" alt="wxmp">

### 阿里云DataV示例 - 智慧文旅驾驶舱

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/da/dataview/datavsugardiff-2.png')" alt="wxmp">

### 阿里云DataV示例 - 企业实时销售大盘

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/da/dataview/datavsugardiff-3.png')" alt="wxmp">

百度Sugar后台操作界面：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/da/dataview/datavsugardiff-4.png')" alt="wxmp">

### 百度Sugar示例 - 上交所上市公司全景概览

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/da/dataview/datavsugardiff-5.png')" alt="wxmp">

## 百度Sugar示例 - 深交所上市公司全景概览

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/da/dataview/datavsugardiff-6.png')" alt="wxmp">

与阿里DataV和百度Sugar类似的产品还有腾讯云图，其使用介绍可参考：https://huangsong.blog.csdn.net/article/details/101527984

------

## DataV案例开源项目：

大屏数据可视化项目：[https://github.com/yyhsong/iDataV](https://github.com/yyhsong/iDataV)

## 参考文章
* https://blog.csdn.net/hwhsong/article/details/83097924