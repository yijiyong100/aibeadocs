---
title: 常用搜索算法-二分查找
---

::: tip
本文主要是介绍 常用搜索算法-二分查找 。
:::

[[toc]]


##  二分查找

### 说明：
元素必须是有序的，如果是无序的则要先进行排序操作。

### 基本思想：
也称为是折半查找，属于有序查找算法。用给定值k先与中间结点的关键字比较，中间结点把线形表分成两个子表，若相等则查找成功；若不相等，再根据k与该中间结点关键字的比较结果确定下一步查找哪个子表，这样递归进行，直到查找到或查找结束发现表中没有这样的结点。

### 复杂度分析：
最坏情况下，关键词比较次数为log2(n+1)，且**期望时间复杂度为O(log2n)**；

　　注：**折半查找的前提条件是需要有序表顺序存储，对于静态查找表，一次排序后不再变化，折半查找能得到不错的效率。但对于需要****频繁执行插入或删除操作的数据集来说，维护有序的排序会带来不小的工作量，那就不建议使用。——《大话数据结构》**

### C++实现源码：





``` c
//二分查找（折半查找），版本1
int BinarySearch1(int a[], int value, int n)
{
    int low, high, mid;
    low = 0;
    high = n-1;
    while(low<=high)
    {
        mid = (low+high)/2;
        if(a[mid]==value)
            return mid;
        if(a[mid]>value)
            high = mid-1;
        if(a[mid]<value)
            low = mid+1;
    }
    return -1;
}

//二分查找，递归版本
int BinarySearch2(int a[], int value, int low, int high)
{
    int mid = low+(high-low)/2;
    if(a[mid]==value)
        return mid;
    if(a[mid]>value)
        return BinarySearch2(a, value, low, mid-1);
    if(a[mid]<value)
        return BinarySearch2(a, value, mid+1, high);
}
```






## 参考文章
* http://www.cnblogs.com/maybe2030/
* https://www.cnblogs.com/magic-sea/tag/%E5%B8%B8%E8%A7%81%E7%9A%84%E6%9F%A5%E6%89%BE%E7%AE%97%E6%B3%95/
* https://www.cnblogs.com/hyserendipity/p/8591949.html