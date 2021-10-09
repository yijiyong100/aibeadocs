---
title: 智慧大屏-开源AJ-Report工具
---

::: tip
本文主要是介绍 智慧大屏-开源AJ-Report工具 。
:::

[[toc]]

## 分享一个数据可视化大屏项目(附源码)

**文末获取资料**

大屏设计（AJ-Report）是一个可视化拖拽编辑的全开源项目，直观，酷炫，具有科技感的图表工具。内置的基础功能包括数据源，数据集，报表管理。

多数据源支持，内置mysql、elasticsearch、kudu驱动，支持自定义数据集省去数据接口开发，支持17种大屏组件，不会开发，照着设计稿也可以制作大屏。

三步轻松完成大屏设计：配置数据源—->写SQL配置数据集—->拖拽配置大屏—->保存发布。欢迎体验。

## 数据流程图

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ac/aibigscreen/ajreport/c46fb07e37d6bbf3ff0e866b5a830ca6.png')" alt="wxmp">

## 核心技术

#### 后端

- Spring Boot2.3.5.RELEASE: Spring Boot是一款开箱即用框架，让我们的Spring应用变的更轻量化、更快的入门。在主程序执行main函数就可以运行。你也可以打包你的应用为jar并通过使用java -jar来运行你的Web应用；
- Mybatis-plus3.3.2: MyBatis-plus（简称 MP）是一个 MyBatis (opens new window) 的增强工具。
- flyway5.2.1: 主要用于在你的应用版本不断升级的同时，升级你的数据库结构和里面的数据

#### 前端

- npm：node.js的包管理工具，用于统一管理我们前端项目中需要用到的包、插件、工具、命令等，便于开发和维护。
- webpack：用于现代 JavaScript 应用程序的_静态模块打包工具
- ES6：Javascript的新版本，ECMAScript6的简称。利用ES6我们可以简化我们的JS代码，同时利用其提供的强大功能来快速实现JS逻辑。
- vue-cli：Vue的脚手架工具，用于自动生成Vue项目的目录及文件。
- vue-router：Vue提供的前端路由工具，利用其我们实现页面的路由控制，局部刷新及按需加载，构建单页应用，实现前后端分离。
- element-ui：基于MVVM框架Vue开源出来的一套前端ui组件。
- avue: 用该组件包裹后可以变成拖拽组件,采用相对于父类绝对定位;用键盘的上下左右也可以控制移动
- vue-echarts: vue-echarts是封装后的vue插件,基于 ECharts v4.0.1+ 开发
- vue-superslide: Vue-SuperSlide(Github) 是 SuperSlide 的 Vue 封装版本
- vuedraggable: 是一款基于Sortable.js实现的vue拖拽插件。

## 截图

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ac/aibigscreen/ajreport/810ee68d3dd99357c1e5d402a77ddd0a.png')" alt="wxmp">

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ac/aibigscreen/ajreport/b2b83f6707b0a40dd486c4fac01fc7f2.png')" alt="wxmp">

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ac/aibigscreen/ajreport/78fec7ff523687558a9715b2e8febce6.png')" alt="wxmp">

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ac/aibigscreen/ajreport/72c045c678154935f6807d9d8a44c7a3.png')" alt="wxmp">

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ac/aibigscreen/ajreport/1baf1c1ef0273406a379a2d60f705b53.png')" alt="wxmp">



整理：抓哇笔记

源码获取：[参见原文](https://blog.csdn.net/a934079371/article/details/119066690)


## 参考文章
* https://blog.csdn.net/a934079371/article/details/119066690