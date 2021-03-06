---
title: 数据可视化-常用工具介绍
---

::: tip
本文主要是介绍 数据可视化-常用工具 的基础知识 。
:::

[[toc]]

## 几款好用的数据可视化工具 

## 可视化产品分类

看了很多数据可视化产品，总结下来分为几大类。

一．数据可视化库类

二．报表、BI类

三．大屏投放类

四．专业类（地图、科学计算、机器学习）

如果自主研发，肯定选择第一种数据可视化库类。我的需求是第二类和第三类，报表和大屏投放，如果能兼顾第二类和第三类功能的产品肯定是我的首选。第四类是针对特定的用户，我暂时没有类似的需求。对比了很多主流的工具，从价格、功能、无缝嵌入现有系统、量级、定制化、服务等几个方面综合考虑，我最终的选择是亿信BI。

下面我把这几类数据可视化产品中有代表性的和大家分享一下。

## 一．数据可视化库类

### Echarts

一个纯java的数据可视化库，百度的产品，常应用于软件产品开发或者 系统的图表模块，图表种类多，动态可视化效果，开源免费。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/da/dataview/intro/38f3c9194aae4821bec496c4e30d838c.jpeg')" alt="wxmp">

评价：非常好的一个可视化库，图表种类多，可选的主题。以前我们产品中就是使用echarts进行可视化需求的定制开发。Echarts中主要还是以图表为主，没有提供文本和表格方面的展现库，如果有相关需求还需要引入表格和文本方面的其他可视化库。

### 亿信BI

亿信BI让数据可视化。数据分析软件亿信BI内置数十种可视化元素和图形，通过简单的数据关系定义，就能实现丰富的可视化效果.。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/da/dataview/intro/97757d3bb11b4a0ca74123a8cf42b954.gif')" alt="wxmp">

评价：非常好的一个数据可视化软件，里面的图形丰富，不需要二次开发，可以直接拿过来用，操作很简单。能够将表格数据和预警部署到图上面去。

### **HighCharts**

与echarts相似，同样是可视化库，国外的产品，商用需要付费，文档详尽。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/da/dataview/intro/7426249dca11437f88e083e72eea42a3.jpeg')" alt="wxmp">

评价：同样是非常好的一个可视化库，图表种类多。但是同样需要进行二次开发，,没有提供文本和表格方面的展现库。而且因为商用付费，所以能选择echarts肯定不会选择highcharts。

### **AntV**

Antv是蚂蚁金服出品的一套数据可视化语法，是国内第一个才用the grammar of Graphics这套理论的可视化库。在提供可视化库同时也提供简单的数据归类分析能力。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/da/dataview/intro/e98ca9269a924d20a7009a44d2d18f62.jpeg')" alt="wxmp">

评价：是一个优秀的可视化库，需要进行二次开发。因为采用的是the grammar of Graphics 语法，和echarts相比各有千秋。

## 二．报表、BI类

### 百度图说

由echarts衍生出来的子产品，同样继承了echarts的特点，图表种类多，没有提供文本和表格方面的展现库。Echarts接受json格式的数据，百度图说把数据格式进行了封装，可以通过表格的形式组织数据。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/da/dataview/intro/c7dbc38c1fcd4d6888b9df40b416a547.jpeg')" alt="wxmp">

评价：可以把表格数据转换成图表展现形式的工具，支持excel数据导入 ，适合做静态的BI报告。因为数据偏静态，没看到与数据库结合的部分，很难和第三方系统结合展现动态变化的数据，如日报表、月报表、周报表等。

### **亿信BI**

它是一款大数据分析工具，亿信BI内置成熟的OLAP联机分析处理引擎，构建强大的数据计算能力。通过常规计算和挖掘计算的定义，可以快速、轻松地掌握数据中的含义，发现并预测数据趋势和相关性。通过对数据的统计、钻取、分析和挖掘，挖掘数据的蛛丝马迹，提出问题，找到原因，发现内在关系，真正释放企业数据力量，辅助领导决策，驱动企业不断进步。

评价：国内BI工具的领先者，拥有成熟的产品研发团队，优质的售前和售后服务，丰富的成功案例。

### **Tableau**

Tableau 是桌面系统中最简单的商业智能工具软件，Tableau 没有强迫用户编写自定义代码，新的控制台也可完全自定义配置。在控制台上，不仅能够监测信息，而且还提供完整的分析能力。Tableau控制台灵活，具有高度的动态性。

Tableau公司将数据运算与美观的图表完美地嫁接在一起。它的程序很容易上手，各公司可以用它将大量数据拖放到数字“画布”上，转眼间就能创建好各种图表。这一软件的理念是，界面上的数据越容易操控，公司对自己在所在业务领域里的所作所为到底是正确还是错误，就能了解得越透彻。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/da/dataview/intro/e11319965a66419cb6f5723c9496f7b2.jpeg')" alt="wxmp">

评价：全球知名的BI工具，价格6000元/年/人左右，如果不是因为价格以及是国外的产品，我可能就选择他了。以前踩过国外产品的坑，所以知道尿性，不花钱不会为你做任何定制化改动，有点担心售后，所以最终放弃了。

### **Power BI**

Power BI 是一套商业分析工具，用于在组织中提供见解。可连接数百个数据源、简化数据准备并提供即席分析。生成美观的报表并进行发布，供组织在 Web 和移动设备上使用。每个人都可创建个性化仪表板，获取针对其业务的全方位独特见解。在企业内实现扩展，内置管理和安全性。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/da/dataview/intro/43c562b238fd4f19920d9f1f1ff9791b.jpeg')" alt="wxmp">

评价：类似于excel的桌面bi工具，功能比excel更加强大。支持多种数据源。价格便宜。但是只能作为单独的bi工具使用，没办法和现有的系统结合到一起。生成的报表没办法引入到我们的系统中。

## 三．可视化大屏类

### 亿信BI

炫酷的大屏效果，布局格式随意，丰富的大屏模板让你眼花缭乱。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/da/dataview/intro/01b13df368a44a0ca05f453a9bc0960d.jpeg')" alt="wxmp">

评价：相比其他的来说，价格很好，功能强大支持数据源

### 阿里DataV

提供丰富的模板与图形，支持多数据源，拖拉式布局，支持服务化服务方式和本地部署。整体来说是一款很好的大屏的产品。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/da/dataview/intro/edbd18307ae04f84b3565ce135f9488e.jpeg')" alt="wxmp">

评价：产品不错，就是价格把我吓到了，服务版每年5100元/年，本地部署竟然要110万，每年续费也要37万。

## 四、专业地图类

很多工具都能实现数据地图，比如echarts，亿信BI，tableau等。比较专业的有地图慧、我要地图都用对应的地图开发api，不过我的需求不是专业搞地图的，所以没有深入了解。

### R-ggplot2

ggplot2是R语言最流行的第三方扩展包，是RStudio首席科学家Hadley Wickham读博期间的作品，是R相比其他语言一个独领风骚的特点。包名中“gg”

是grammar of graphics的简称，是一套优雅的绘图语法。主要用于机器学习绘图。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/da/dataview/intro/ab43aa1d1db04f48830a2777306225af.jpeg')" alt="wxmp">

评价：机器学习、数学、科学计算领域专业的绘图语言。专业与技术要求都很高，不是专业搞机器学习或者科学计算的工程师，一般不会用到。

### 亿信BI

拥有世界、中国各省市的图片地图及GIS地图。通过设计与搭配，可衍生出成千上万种可视化效果，而且还可以设置数据源等。

### Python

Python是一门编成语言,其周边的绘图库也比较丰富比如pandas和matplotlib ,pandas能够绘制线图、柱图、饼图、密度图、散点图等； matplotlib主要是绘制数学函数相关的图如三角函数图、概率模型图等。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/da/dataview/intro/7ef02a28c930441c8d1dd69a4f63a5ae.jpeg')" alt="wxmp">

## 参考文章
* https://www.sohu.com/a/308568942_100279938