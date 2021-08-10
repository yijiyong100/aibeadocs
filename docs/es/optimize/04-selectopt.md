---
title: ES优化-查询性能优化
---

::: tip
本文主要是介绍 ES优化-查询性能优化 。
:::

[[toc]]

## ES 查询优化（一）


### 1、能用term就不用match_phrase

>  The Lucene nightly benchmarks show that a simple term query is about 10 times as fast as a phrase query, and about 20 times as fast as a proximity query (a phrase query with slop). 

term查询比match_phrase性能要快10倍，比带slop的match_phrase快20倍。

```shell
GET /my_index/my_type/_search
{
    "query": {
        "match_phrase": {
            "title": "quick"
        }
    }
}

变为

GET /my_index/my_type/_search
{
    "query": {
        "term": {
            "title": "quick"
        }
    }
}
```

### 2、如果查询条件与文档排序无关，则一定要用filter，既不用参与分数计算，还能缓存数据，加快下次查询。

比如说要查询类型为Ford，黄色的，名字包含dev的汽车，一般的查询语句应该如下：

```shell
GET /my_index/my_type/_search
{
    "bool": {
        "must": [
            {
                "term": {
                    "type": "ford"
                }
            },
            {
                "term": {
                    "color": "yellow"
                }
            },
            {
                "term": {
                    "name": "dev"
                }
            }
        ]
    }
}
```

上述查询中类型和颜色同样参与了文档排名得分的计算，但是由于类型和颜色仅作为过滤条件，计算得分至于name的匹配相关。因此上述的查询是不合理且效率不高的。

```shell
GET /my_index/my_type/_search
{
    "bool": {
        "must": {
            "term": {
                "name": "dev"
            }
        },
        "filter": [
        {
            "term": {
                "type": "ford"
            }
        },
        {
            "term": {
                "color": "yellow"
            }
        }]
    }
}
```

### 3、如果对查出的数据的顺序没有要求，则可按照_doc排序，取数据时按照插入的顺序返回。

>  _doc has no real use-case besides being the most efficient sort order. So if you don’t care about the order in which documents are returned, then you should sort by _doc. This especially helps when scrolling. _doc to sort by index order. 

```shell
GET /my_index/my_type/_search
{
    "query": {
        "term": {
            "name": "dev"
        }
    },
    "sort":[
        "_doc"
    ]
}
```

### 4、随机取n条（n>=10000）数据

1）可以利用ES自带的方法random score查询。缺点慢，消耗内存。

```shell
GET /my_index/my_type/_search
{
    "size": 10000,
    "query": {
        "function_score": {
            "query": {
                "term": {
                    "name": "dev"
                }
            },
            "random_score": {
                
            }
        }
    }
}
```

2）可以利用ES的脚本查询。缺点比random score少消耗点内存，但比random score慢。

```shell
GET /my_index/my_type/_search
{
    "query": {
        "term": {
            "name": "dev"
        }
    },
    "sort": {
        "_script": {
            "type": "number",
            "script": {
                "lang": "painless",
                "inline": "Math.random()"
            },
            "order": "asc"
        }
    }
}
```

3）插入数据时，多加一个字段mark，该字段的值随机生成。查询时，对该字段排序即可。

```shell
GET /my_index/my_type/_search
{
    "query": {
        "term": {
            "name": "dev"
        }
    },
    "sort":[
        "mark"
    ]
}
```

### 5、range Aggregations时耗时太长

```shell
{
    "aggs" : {
        "price_ranges" : {
            "range" : {
                "field" : "price",
                "ranges" : [
                    { "from" : 10, "to" : 50 },
                    { "from" : 50, "to" : 70 },
                    { "from" : 70, "to" : 100 }
                ]
            }
        }
    }
}
```

如例子所示，我们对[10,50)，[50,70)，[70,100)三个区间做了聚合操作。因为涉及到比较操作，数据量较大的情况下，可能会比较慢。 解决方案：在插入时，将要聚合的区间以keyword的形式写入索引中，查询时，对该字段做聚合即可。

```shell
假设price都小于100，插入的字段为mark，mark的值为10-50, 50-70, 70-100。
{
    "aggs" : {
        "genres" : {
            "terms" : { "field" : "mark" }
        }
    }
}
```

### 6、查询空字符串

如果是要查字段是否存在或丢失，用Exists Query查询即可(exists, must_not exits)。

```shell
GET /_search
{
    "query": {
        "exists" : { "field" : "user" }
    }
}

GET /_search
{
    "query": {
        "bool": {
            "must_not": {
                "exists": {
                    "field": "user"
                }
            }
        }
    }
}
```

这里指的是字段存在，且字段为“”的field。

```shell
curl localhost:9200/customer/_search?pretty -d'{
    "size": 5,
    "query": {
        "bool": {
            "must": {
                "script": {
                    "script": {
                        "inline": "doc['\''strnickname'\''].length()<1",
                        "lang": "painless"
                    }
                }
            }
        }
    }
}'
```

## 【----------------------------】



## ES 查询优化（二）

### 1、查询精确匹配

假设有 { "tags" : ["search"] } { "tags" : ["search", "open_source"] } 两个文档，{ "term" : { "tags" : "search" } }都能匹配，但想只搜索包含一个的值，怎么办？ 插入数据时多加一个长度字段： { "tags" : ["search"], "tag_count" : 1 } { "tags" : ["search", "open_source"], "tag_count" : 2 } 查找时加上tag_count精确查找即可。

```shell
GET /_search
{
    "query": {
        "constant_score": {
            "filter": {
                "term": {
                    "tag_count": 1
                }
            }
        },
        "term": {
            "tags": "search"
        }
    }
}
```

### 2、 忽略多个近义词匹配的相关性

我们知道jump, leap, 和 hop是近义词，它们表示的是同样的概念，因此在匹配时，我们希望匹配jump和leap的文档的相关性不能比仅匹配jump的文档高，该怎么做呢？设置coordination factor (coord)即可。

```shell
GET /_search
{
  "query": {
    "bool": {
      "disable_coord": true,
      "should": [
        { "term": { "text": "jump" }},
        { "term": { "text": "hop"  }},
        { "term": { "text": "leap" }}
      ]
    }
  }
}
```

### 3、查询时提高索引的相关性

比如说，我们es存储的是nginx的日志，昨天nginx出问题了，那么查看最近七天的日志时，为了快速找出昨天的错误，也不忽略前天的错误，那么昨天的nginx-log包含error的文档相关性应该比前天的高。默认的boost为1。

```shell
GET /docs_2017_12_*/_search 
{
  "indices_boost": { 
    "docs_2017_12_10": 3,
    "docs_2017_12_09": 2
  },
  "query": {
    "term": {
      "text": "error"
    }
  }
}
```

### 4、更改score计算方法

ES5.0之前默认用的是tf-idf来计算相关性，5.0之后（lucene6）用的BM25来计算相关性。所以这个就不说了。

### 5、针对数组字符串，match_phrase匹配不准确

```shell
PUT /my_index/groups/1
{
    "names": [ "John Abraham", "Lincoln Smith"]
}

GET /my_index/groups/_search
{
    "query": {
        "match_phrase": {
            "names": "Abraham Lincoln"
        }
    }
}
```

上述查询可以匹配的到插入的文档。原因是针对names建倒排时，各位置如下：

```shell
Position 1: john
Position 2: abraham
Position 3: lincoln
Position 4: smith
```

所以查询“Abraham Lincoln”可以查询的到。针对于这种情况通过设置position_increment_gap解决。

```shell
DELETE /my_index/groups/ 

PUT /my_index/_mapping/groups 
{
    "properties": {
        "names": {
            "type":                "string",
            "position_increment_gap": 100
        }
    }
}
```

重新导入数据，建索引时各个位置就会如下所示：

```shell
Position 1: john
Position 2: abraham
Position 103: lincoln
Position 104: smith
```

这样再次用match_phrase查询时，由于position没有互相挨着，就查询不到“Abraham Lincoln”。

### 6、Post Filter用于过滤返回的结果集

```shell
PUT /shirts
{
    "mappings": {
        "item": {
            "properties": {
                "brand": { "type": "keyword"},
                "color": { "type": "keyword"},
                "model": { "type": "keyword"}
            }
        }
    }
}
```

假设我们现在需要找出brand为gucci的所有颜色种类，但是只显示按model聚合的红色的文档，查询语句如下：

```shell
GET /shirts/_search
{
  "query": {
    "bool": {
      "filter": {
        "term": { "brand": "gucci" } 
      }
    }
  },
  "aggs": {
    "colors": {
      "terms": { "field": "color" } 
    },
    "color_red": {
      "filter": {
        "term": { "color": "red" } 
      },
      "aggs": {
        "models": {
          "terms": { "field": "model" } 
        }
      }
    }
  },
  "post_filter": { 
    "term": { "color": "red" }
  }
}
```



## 参考文章
* https://cloud.tencent.com/developer/article/1134070
* https://cloud.tencent.com/developer/article/1134061