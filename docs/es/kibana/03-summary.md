---
title: Kibana-精华总结
---

::: tip
本文主要是介绍 Kibana-精华总结 。
:::

[[toc]]

##  Kibana详细入门教程

##  一、Kibana是什么

Kibana 是为 Elasticsearch设计的开源分析和可视化平台。你可以使用 Kibana 来搜索，查看存储在 Elasticsearch 索引中的数据并与之交互。你可以很容易实现高级的数据分析和可视化，以图表的形式展现出来。

使用前我们肯定需要先有Elasticsearch啦，安装使用Elasticsearch可以参考[Elasticsearch构建全文搜索系统](https://www.cnblogs.com/chenqionghe/p/12496827.html)

下面分别演示一下Kibana的安装、自定义索引，搜索，控制台调用es的api和可视化等操作，特别需要注意的是，控制台可以非常方便的来调用es的api，强烈推荐使用

##  二、如何安装

直接下载对应平台的版本就可以，参考地址[Installing Kibana](https://www.elastic.co/guide/en/kibana/current/install.html)

我里我直接下载了mac平台的[kibana-7.6.1-darwin-x86_64.tar.gz](https://artifacts.elastic.co/downloads/kibana/kibana-7.6.1-darwin-x86_64.tar.gz)

解压完画风如下

 [详见kibana详细入门教程图文](https://www.cnblogs.com/chenqionghe/p/12503181.html)

配置可以参考[Configring Kibana](https://www.elastic.co/guide/cn/kibana/current/settings.html)

设置监听端口号、es地址、索引名

 [详见kibana详细入门教程图文](https://www.cnblogs.com/chenqionghe/p/12503181.html)

默认情况下，kibana启动时将生成随机密钥，这可能导致重新启动后失败，需要配置多个实例中有相同的密钥
设置

``` shel
xpack.reporting.encryptionKey: "chenqionghe"
xpack.security.encryptionKey: "122333444455555666666777777788888888"
xpack.encryptedSavedObjects.encryptionKey: "122333444455555666666777777788888888"
```

启动

``` shel
./bin/kibana
```

打开http://localhost:5601，画风如下

 [详见kibana详细入门教程图文](https://www.cnblogs.com/chenqionghe/p/12503181.html)

提示我们可以使用示例数据，也可以使用自己已有的数据，我把示例数据都下载了，单击侧面导航中的 Discover 进入 Kibana 的数据探索功能：

 [详见kibana详细入门教程图文](https://www.cnblogs.com/chenqionghe/p/12503181.html)

可以看到数据已经导入了，我们可以直接使用查询栏编写语句查询

 [详见kibana详细入门教程图文](https://www.cnblogs.com/chenqionghe/p/12503181.html)

##  三、如何加载自定义索引

接下来演示加载已经创建book索引
单击 Management 选项

 [详见kibana详细入门教程图文](https://www.cnblogs.com/chenqionghe/p/12503181.html)

然后单击 Index Patterns 选项。

 [详见kibana详细入门教程图文](https://www.cnblogs.com/chenqionghe/p/12503181.html)

点击Create index pattern定义一个新的索引模式。

 [详见kibana详细入门教程图文](https://www.cnblogs.com/chenqionghe/p/12503181.html)

点击Next step

 [详见kibana详细入门教程图文](https://www.cnblogs.com/chenqionghe/p/12503181.html)

点击Create index pattern

 [详见kibana详细入门教程图文](https://www.cnblogs.com/chenqionghe/p/12503181.html)

出来如下界面，列出了所有index中的字段

 [详见kibana详细入门教程图文](https://www.cnblogs.com/chenqionghe/p/12503181.html)

接下来，我们再来使用一下kibana查看已经导入的索引数据

 [详见kibana详细入门教程图文](https://www.cnblogs.com/chenqionghe/p/12503181.html)

 [详见kibana详细入门教程图文](https://www.cnblogs.com/chenqionghe/p/12503181.html)

可以看到，已经能展示和检索出我们之前导入的数据，奥利给！

##  四、如何搜索数据


 [详见kibana详细入门教程图文](https://www.cnblogs.com/chenqionghe/p/12503181.html)

 [详见kibana详细入门教程图文](https://www.cnblogs.com/chenqionghe/p/12503181.html)

可以看到，我们能很方便地搜索栏使用Llucene查询，查询语法可以参考[Lucene查询语法汇总](https://www.cnblogs.com/chenqionghe/p/12501218.html)

##  五、如何切换中文

在`config/kibana.yml`添加

```shell
i18n.locale: "zh-CN"
```

重新启动，即可生效

 [详见kibana详细入门教程图文](https://www.cnblogs.com/chenqionghe/p/12503181.html)

##  六、如何使用控制台

控制台插件提供一个用户界面来和 Elasticsearch 的 REST API 交互。控制台有两个主要部分： editor ，用来编写提交给 Elasticsearch 的请求； response 面板，用来展示请求结果的响应。在页面顶部的文本框中输入 Elasticsearch 服务器的地址。默认地址是：“localhost:9200”。

点击左侧栏的[Dev Tools]，可以看到如下界面，可以很方便地执行命令

 [详见kibana详细入门教程图文](https://www.cnblogs.com/chenqionghe/p/12503181.html)

示例操作

``` shell
##  查看所有节点
GET _cat/nodes

##  查看book索引数据
GET book/_search
{
    "query": {
    "match": {
      "content": "chenqionghe"
    }
  }
}

##  添加一条数据
POST book/_doc 
{
  "page":8,
  "content": "chenqionghe喜欢运动，绳命是如此的精彩，绳命是多么的辉煌"
}

##  更新数据
PUT book/_doc/iSAz4XABrERdg9Ao0QZI
{
  "page":8,
  "content":"chenqionghe喜欢运动，绳命是剁么的回晃；绳命是入刺的井猜"
}

##  删除数据
POST book/_delete_by_query
{
  "query": {
    "match": {
      "page": 8
    }
  }
}

##  批量插入数据
POST book/_bulk
{ "index":{} }
{ "page":22 , "content": "Adversity, steeling will strengthen body.逆境磨练意志，锻炼增强体魄。"}
{ "index":{} }
{ "page":23 , "content": "Reading is to the mind, such as exercise is to the body.读书之于头脑，好比运动之于身体。"}
{ "index":{} }
{ "page":24 , "content": "Years make you old, anti-aging.岁月催人老，运动抗衰老。"}
{ "index":{} }
```


 [详见kibana详细入门教程图文](https://www.cnblogs.com/chenqionghe/p/12503181.html)

##  七、如何使用可视化

Kibana可视化控件基于 Elasticsearch 的查询。利用一系列的 Elasticsearch 查询聚合功能来提取和处理数据，再通过创建图表来呈现数据分布和趋势

点击Visualize菜单，进入可视化图表创建界面，Kibana自带有上10种图表，我们来创建一个自己的图表

 [详见kibana详细入门教程图文](https://www.cnblogs.com/chenqionghe/p/12503181.html)

我们来添加一个直方图

 [详见kibana详细入门教程图文](https://www.cnblogs.com/chenqionghe/p/12503181.html)

 [详见kibana详细入门教程图文](https://www.cnblogs.com/chenqionghe/p/12503181.html)

 [详见kibana详细入门教程图文](https://www.cnblogs.com/chenqionghe/p/12503181.html)

可以看到，默认已经有一个Y轴了，统计的是数量，我们添加一个X轴，点击Buckets下的Add

 [详见kibana详细入门教程图文](https://www.cnblogs.com/chenqionghe/p/12503181.html)

如下，我选择了customer_id字段作为x轴

 [详见kibana详细入门教程图文](https://www.cnblogs.com/chenqionghe/p/12503181.html)

执行后如下

 [详见kibana详细入门教程图文](https://www.cnblogs.com/chenqionghe/p/12503181.html)

保存一下

 [详见kibana详细入门教程图文](https://www.cnblogs.com/chenqionghe/p/12503181.html)

##  八、如何使用仪表盘

Kibana 仪表板（Dashboard） 展示保存的可视化结果集合。
就是可以把上面定义好的图表展示
创建一个Dashboard

 [详见kibana详细入门教程图文](https://www.cnblogs.com/chenqionghe/p/12503181.html)

添加已经存在的图表

 [详见kibana详细入门教程图文](https://www.cnblogs.com/chenqionghe/p/12503181.html)

 [详见kibana详细入门教程图文](https://www.cnblogs.com/chenqionghe/p/12503181.html)

添加完后保存即可，我们可以定制出非常丰富的面板，如下

 [详见kibana详细入门教程图文](https://www.cnblogs.com/chenqionghe/p/12503181.html)

Kibana的使用就是这么简单，是不是觉得超简单，建议自己去安装使用一下，加深印象，light weight baby !

###  参考文章
* https://www.cnblogs.com/chenqionghe/p/12503181.html