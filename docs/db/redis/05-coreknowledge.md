---
title: Redis核心技术总结
---

::: tip
本文主要是介绍 Redis核心技术总结 。
:::

[[toc]]

## 导论

在平时的工作项目中，使用redis很长时间了，但一直没有系统的学习总结过，现在看到极客时间蒋德钧老师开设的《[Redis核心技术与实战](https://time.geekbang.org/column/intro/329)》,干货满满，特地跟随课程小小总结一下，以供日后复习之用。

## Redis 知识全景----两大维度，三大主线

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/db/redis/corek-1.png')" alt="wxmp">

应用维度学习路线：

1. 应用场景驱动

2. 典型案例驱动

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/db/redis/corek-2.png')" alt="wxmp">

## 1. redis的数据结构

数据类型（5种）：**String（字符串）、List（列表）、Hash（哈希）、Set（集合）和 Sorted Set（有序集合）**

数据结构（6种）：**简单动态字符串(Simple Dynamic String)、双向链表、压缩列表（ziplist）、哈希表、跳跃表（skiplist）和整数集合（intset）**

数据类型与数据结构对应关系：

一种：**String–>SDS**

二种：**集合类型（一个键对应了一个集合的数据） List、Hash、Set 和 Sorted Set**

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/db/redis/corek-3.png')" alt="wxmp">

### 键-值的结构组织

### 全局哈希表

无论String，还是集合类型，哈希桶中的元素都是指向它们的指针。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/db/redis/corek-4.png')" alt="wxmp">

### 哈希表的rehash

哈希冲突解决方式：链式哈希

渐近式哈希：把一次性大量拷贝的开销，分摊到了多次处理请求的过程中，避免了耗时操作，保证了数据的快速访问。

### redis数据结构的时间复杂度

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/db/redis/corek-5.png')" alt="wxmp">

### 不同操作的复杂度

**单元素操作是基础**

一种集合类型对单个数据实现的增删改查操

**范围操作非常耗时**

集合类型中的遍历操作，可以返回集合中的所有数据

**统计操作通常高效**

集合类型对集合中所有元素个数的记录

**例外情况只有几个**

压缩列表和双向链表都会记录表头和表尾的偏移量

## 参考文章
* https://www.pianshen.com/article/28621694700/