---
title: 数据可视化-DataV简单案例
---

::: tip
本文主要是介绍 数据可视化-DataV简单案例 。
:::

[[toc]]

## 使用开源Datav——结合vue实现大屏数据展示案例


## Datav简介：

- 组件库基于Vue ，主要用于构建大屏（全屏）数据展示页面即数据可视化，具有多种类型组件可供使用。
- 文档链接：[Datav-Vue 大屏数据展示组件库](http://datav.jiaminghi.com/guide/)
- 代码下载：[datav大屏数据展示](https://gitee.com/mirce/datav_vue.git)

------

效果展示：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/da/dataview/datavsimplecase-1.png')" alt="wxmp">

------

### 详细步骤：

### 搭建vue-cli脚手架

这里我直接基于vue-admin-template模板开发，vue-admin-template下载地址:[vue-admin-template](https://github.com/PanJiaChen/vue-admin-template)
你也可以手动创建，具体步骤如下：

- 使用npm安装vue

```shell
 npm i -g @vue/cli
```

- 创建Vue项目

```shell
vue create datav-project
```

### 安装Datav

搭建好项目之后安装Datav

```shell
npm install @jiaminghi/data-view
```

全局注册组件

```js
import dataV from '@jiaminghi/data-view'
Vue.use(dataV)
```

主要项目目录如下：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/da/dataview/datavsimplecase-2.png')" alt="wxmp">

`index.vue`为主页面，其它为各个组件的页面

### 全屏展示

全屏展示数据需要使用全屏容器

```html
<dv-full-screen-container></dv-full-screen-container>
```

我们将需要展示的内容放在里面即可

Datav有多种类型组件可供使用，具体可参考文档使用：

- 边框
  带有不同边框的容器
- 装饰
  用来点缀页面效果，增加视觉效果
- 图表
  图表组件基于Charts封装，轻量，易用
- 其他
  飞线图/水位图/轮播表/…

------

编写各个组件

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/da/dataview/datavsimplecase-3.png')" alt="wxmp">

顾名思义，其组件名就是对应屏幕上的位置

然后在`index.vue`主页面中引入各个组件并编写样式

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/da/dataview/datavsimplecase-4.png')" alt="wxmp">

## 参考文章
* https://blog.csdn.net/micrice/article/details/109337074