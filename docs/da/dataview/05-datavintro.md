---
title: 数据可视化-DataV基础介绍
---

::: tip
本文主要是介绍 数据可视化-DataV基础介绍 。
:::

[[toc]]

## datav数据可视化_数据大屏可视化工具篇—DataV

datav

前面猪猪侠已经分享了很多数据大屏可视化的精美模板，都是小编浪里淘沙一点一点收集起来的，感兴趣的小伙伴们可以进入猪猪侠主页直接获取大屏可视化模板，完全免费的哦。


## 首先来介绍一下，DataV是干什么的？

- 1. DataV是一个基于**Vue**的数据可视化组件库(有vue版本和react版本，今天主要介绍vue版本)
- 2. 提供用于提升页面动态视觉效果svg边框和装饰
- 3. 提供常用的图标(loading加载，边框，装饰，图表，动态环图，胶囊柱图，水位图，进度池，飞线图，锥形柱图，数字翻牌器，轮播表等等)

## 文档和案例介绍：

- [datav 参考文档和社区](http://datav.jiaminghi.com/)
- [datav 参考案例和展示](http://datav.jiaminghi.com/demo/)

- datav 参考文档和社区：[http://datav.jiaminghi.com/](http://datav.jiaminghi.com/)
- datav 参考案例和展示：[http://datav.jiaminghi.com/demo/](http://datav.jiaminghi.com/demo/)

## DataV案例开源项目：

大屏数据可视化项目：[https://github.com/yyhsong/iDataV](https://github.com/yyhsong/iDataV)

## 如何使用

**创建vue项目**

组件库依赖vue，要想使用它，首先要创建一个vue项目

```
// 1.安装vue-cli// npm i -g @vue/cli 或者 yarn global add @vue/cli// 2.创建Vue项目// vue create datav-project
```

**安装**

```
// cd datav-project// npm install @jiaminghi/data-view 或者 yarn add @jiaminghi/data-view
```

**使用**

```
// 将自动注册所有组件为全局组件import dataV from '@jiaminghi/data-view'Vue.use(dataV)
```

**按需引用**

```
import { borderBox1 } from '@jiaminghi/data-view'Vue.use(borderBox1)
```

详细的文档可以参展官网文档

## 组件介绍

### **loading加载**

数据尚未加载完成时，可以显示Loading效果，增强用户体验。

```
Loading...
```

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/da/dataview/datavintro-1.png')" alt="wxmp">

loading图，原图有动态效果

------

### **边框**

边框均由**SVG**元素绘制，体积轻量不失真，它们的使用极为方便

```
dv-border-box-1
```

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/da/dataview/datavintro-2.png')" alt="wxmp">

dv-border-Box-1，原图有动态效果

------

### **胶囊柱图**



<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/da/dataview/datavintro-3.png')" alt="wxmp">

胶囊柱图

------

### **水位图**



<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/da/dataview/datavintro-4.png')" alt="wxmp">

水位图，原图有动态效果

------

### **进度池**



<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/da/dataview/datavintro-5.png')" alt="wxmp">

进度池

------

### **飞线池**

设置一个中心点，若干飞线点，即可得到动态飞线图，组件提供的dev模式可以帮你快速配置飞线点位置。



<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/da/dataview/datavintro-6.png')" alt="wxmp">

飞线图，原图有动态效果

------

### **锥形柱图**

锥形柱图是特殊的柱状图，它将根据数值大小，降序排列锥形柱，适合排名类数据展示。



<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/da/dataview/datavintro-7.png')" alt="wxmp">

锥形柱图

------

### **轮播表**

轮播表可以单条轮播也可以整页轮播，支持点击事件，展示数据使用**v-html**渲染，因此你可以传递html字符串，定制个性化元素。



<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/da/dataview/datavintro-8.png')" alt="wxmp">

轮播表，原图有滚动效果

------

最后还是要给大家发福利，哈哈哈，三套基于datav的大屏可视化模板。
### 可视化模板案例

## 施工养护综合数据

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/da/dataview/datavintrocase-1.png')" alt="wxmp">

- [Demo演示地址](http://datav.jiaminghi.com/demo/construction-data/index.html)
- [Demo源码地址](https://github.com/jiaming743/datav.jiaminghi.com/tree/master/demo/construction-data)

### 机电运维管理台

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/da/dataview/datavintrocase-2.png')" alt="wxmp">

- [Demo演示地址](http://datav.jiaminghi.com/demo/manage-desk/index.html)
- [Demo源码地址](https://github.com/jiaming743/datav.jiaminghi.com/tree/master/demo/manage-desk)

### 机电设备电子档案

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/da/dataview/datavintrocase-3.png')" alt="wxmp">

- [Demo演示地址](http://datav.jiaminghi.com/demo/electronic-file/index.html)
- [Demo源码地址](https://github.com/jiaming743/datav.jiaminghi.com/tree/master/demo/electronic-file)


相关资源：[data-visual:一款*数据*可视化的*工具*-源码_*datav**数据**可视化工具*...](https://download.csdn.net/download/weixin_42110362/18487255?spm=1001.2101.3001.5697)


## 参考文章
* https://blog.csdn.net/weixin_36296864/article/details/113451513