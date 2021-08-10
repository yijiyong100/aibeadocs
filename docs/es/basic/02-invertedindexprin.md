---
title: ES-倒排索引介绍
---

::: tip
本文主要是介绍 ES-倒排索引介绍 。
:::

[[toc]]

## 搜索引擎中的倒排索引是什么



目录



## 前言

数据的搜索与查找是计算机软件的核心算法，对海量文档进行快速检索，主要使用的就是倒排索引技术。
可能有人会说，我们平时在MySQL已经可以直接使用like查询了，为啥还要认识叫倒排索引的东西？

我们用下面例子说明，假设有一本书，相应页码存储的文章内容如下

| 页码 | 内容                                                                           |
| ---- | ------------------------------------------------------------------------------ |
| 1    | 生命在于运动                                                                   |
| 2    | 运动是生命的源泉                                                               |
| 3    | 日复一日地坚持练下去吧,只有活动适量才能保持训练的热情和提高运动的技能.——塞涅卡 |
| 4    | 活动是生活的基础!——歌德                                                        |
| 5    | 人的健全,不但靠饮食,尤靠运动                                                   |
| 6    | 奥林匹克的格言是“更高,更快,更强”                                               |
| 7    | 身体的健康因静止不动而破坏,因运动练习而长期保持.——苏格拉底                     |
| 8    | chenqionghe喜欢运动，绳命是如此的精彩，绳命是如此的辉煌                        |

书有很多篇文章，要在一本书中找出所有包含“运动”的文章，只能去一页页的翻书，看哪一页有这个单词，这种找法其实是正向索引，即通过文档(ID)去找单词。
然而，书越厚，你找的时间越久，因为每次都得找完一本书（这其实也是MySQL中的全表扫描），针对这样的内容检索场景，倒排索引就派上用场了。
和正向索引相反，倒排索引是通过单词去找文档(ID)。

## 一、倒排索引的原理

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/es/basic/invertedindex/662544-20200311214007446-1847909846.png')" alt="wxmp">

倒排索引相当于创建了关键词目录，记录了哪个单词被哪些文章包含，如下

| 关键词      | 页码        |
| ----------- | ----------- |
| 运动        | 1,2,3,5,7,8 |
| 活动        | 3,4         |
| 生命        | 1,2         |
| chenqionghe | 8           |

当我们要搜索找到有“运动”的文章时，先去关键词目录找，找到在1,2,3,5,7,8这几页，然后直接把书翻到这些页就能获取到相应的内容了。

如果我们要搜索“运动生命”，得先把这个分成“运动”和“生命”，再分别去目录找（因此怎么分词，也是搜索引擎中的一大艺术）。

倒排索引的原理其实就这么简单，惊不惊喜，意不意外~

## 二、倒排索引的应用

- Lucene
  <img class= "zoom-custom-imgs" :src="$withBase('/assets/img/es/basic/invertedindex/662544-20200311213719500-1130869978.png')" alt="wxmp">

[Lucene](https://lucene.apache.org/)是目前最为流行的开放源代码全文搜索引擎工具包，隶属于Apache基金会，由资深全文索引/检索专家Doug Cutting所发起，并以其妻子的中间名作为项目的名称。Lucene不是一个具有完整特征的搜索应用程序，而是一个专注于文本索引和搜索的工具包，能够为应用程序添加索引与搜索能力。

- ElasticSearch
  <img class= "zoom-custom-imgs" :src="$withBase('/assets/img/es/basic/invertedindex/662544-20200311213658879-302954968.png')" alt="wxmp">

[Elasticsearch](https://www.elastic.co/)是一个基于Lucene的搜索服务器。它提供了一个分布式多用户能力的全文搜索引擎，基于RESTful web接口。具体使用可以参考[Elasticsearch构建全文搜索系统](https://www.cnblogs.com/chenqionghe/p/12496827.html)

- Solr
  <img class= "zoom-custom-imgs" :src="$withBase('/assets/img/es/basic/invertedindex/662544-20200311213732701-2100689361.png')" alt="wxmp">

[Solr](https://www.baidu.com/link?url=TEWZQxAe3umGaHK2WJKqcUtz_VbIkEy6eLnEXIBEoQryFW37S-4HDEQQOElIvRIa&wd=&eqid=bd0bdfa1000151d8000000065e68e92a)是一个高性能，采用Java开发，基于Lucene的全文搜索服务器，封装了很多Lucene细节，是一个有HTTP接口的基于Lucene的查询服务器，

- Sphinx
  <img class= "zoom-custom-imgs" :src="$withBase('/assets/img/es/basic/invertedindex/662544-20200311213616229-824306464.png')" alt="wxmp">

[Sphinx](http://sphinxsearch.com/)是一款基于SQL的高性能全文检索引擎，利用Sphinx我们可以完成比数据库本身更专业的搜索功能，而且可以有很多针对性的性能优化。

另外其实MySQL的的全文索引也是基于倒排索引的，可以参考[从零开始学习MySQL全文索引](https://www.cnblogs.com/chenqionghe/p/12364524.html)

## 三、倒排索引和大数据“三驾马车”的故事

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/es/basic/invertedindex/662544-20200311190835177-393846276.png')" alt="wxmp">

倒排索引是对互联网内容的一种索引方法，例如我们使用百度或者谷歌，就是使用搜索词搜索到对应的互联网文档。
说到大数据，我们想到的是“三驾马车”，而这“三驾马车”最早是谷歌在2003年提出的。

1. GFS-海量内容存储
   为了构建倒排索引，谷歌需要存储整个互联网的内容，并存储构建倒排索引所需要的内容，在以前的技术条件，世界上没有现成的产品可以实现这种规模的倒排索引。所以，谷歌发明了谷歌文件系统，基于大量的廉价计算机构建的海量存储系统，对应“三驾马车”的分布式存储系统GFS，开源实现为HDFS。
2. MapReduce-海量数据计算框架
   从这个GFS中读取数据做计算，需要一个牛逼的计算框架，这就是“三驾马车”中的MapReduce，开源实现为Hadoop MapReduce，后来又出现了Flink、Storm、Spark这样的新星。
3. BigTable-超级大表
   虽然两驾马车已经可以实现存储互联网这种海量数据，但是互联网的内容变化太快，这种系统没办法做到增量更新。
   这时候，第三驾马车BigTable出来了，一个Key-Value存储系统，可以存储多个版本的值，对应的开源产品是HBase。

通过这“三驾马车”，谷歌具备了存储和分析海量数据的能力，再通过个性化广告系统不断地吸金，走在了时代的前沿。当时还没有任何一个公司能在大数据这个领域赶上谷歌，谷歌这个技术也没有开源。

同时，这“三驾马车”也是云计算的重要组成。

后来Hadoop出现了，出现了“三驾马车”的开源产品：HDFS、MapReduce、HBase。各个公司开始基于Hadoop生态构建出了自己的大数据平台，谷歌渐渐失去了在大数据时代的先发优势。

## 四、倒排索引和排序算法PageRank

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/es/basic/invertedindex/662544-20200311191026407-666153919.png')" alt="wxmp">

有了倒排索引，我们可以快速得到了搜索结果，但是怎么决定搜索结果的优先级呢？这时候就用到了一种叫PageRank的算法，计算机网页的权重，按照权重进行排序，权重越高排得越靠前

关于PageRank的原理可以参考[从小白视角理解<数据挖掘十大算法>](https://www.cnblogs.com/chenqionghe/p/12301905.html#一pagerank)

大道至简，light weight baby 

### 参考文章
* https://www.cnblogs.com/chenqionghe/p/12464671.html