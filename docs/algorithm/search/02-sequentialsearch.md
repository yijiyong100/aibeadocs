---
title: 常用搜索算法-顺序查找
---

::: tip
本文主要是介绍 常用搜索算法-顺序查找 。
:::

[[toc]]


## 顺序查找

### 说明：

顺序查找适合于存储结构为顺序存储或链接存储的线性表。

### 基本思想：
顺序查找也称为线形查找，属于无序查找算法。从数据结构线形表的一端开始，顺序扫描，依次将扫描到的结点关键字与给定值k相比较，若相等则表示查找成功；若扫描结束仍没有找到关键字等于k的结点，表示查找失败。

### 复杂度分析：

　　查找成功时的平均查找长度为：（假设每个数据元素的概率相等） ASL = 1/n(1+2+3+…+n) = (n+1)/2 ;
　　当查找不成功时，需要n+1次比较，时间复杂度为O(n);

　　所以，**顺序查找的时间复杂度为O(n****)****。**

### C++实现源码：


``` cpp
//顺序查找
int SequenceSearch(int a[], int value, int n)
{
    int i;
    for(i=0; i<n; i++)
        if(a[i]==value)
            return i;
    return -1;
}
```



## 参考文章
* http://www.cnblogs.com/maybe2030/
* https://www.cnblogs.com/magic-sea/tag/%E5%B8%B8%E8%A7%81%E7%9A%84%E6%9F%A5%E6%89%BE%E7%AE%97%E6%B3%95/
* https://www.cnblogs.com/hyserendipity/p/8591949.html