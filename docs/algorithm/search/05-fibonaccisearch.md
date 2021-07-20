---
title: 常用搜索算法-斐波那契查找
---

::: tip
本文主要是介绍 常用搜索算法-斐波那契查找 。
:::

[[toc]]



## 斐波那契查找

### 黄金分割
　　在介绍斐波那契查找算法之前，我们先介绍一下很它紧密相连并且大家都熟知的一个概念——黄金分割。

　　黄金比例又称黄金分割，是指事物各部分间一定的数学比例关系，即将整体一分为二，较大部分与较小部分之比等于整体与较大部分之比，其比值约为1:0.618或1.618:1。

　　0.618被公认为最具有审美意义的比例数字，这个数值的作用不仅仅体现在诸如绘画、雕塑、音乐、建筑等艺术领域，而且在管理、工程设计等方面也有着不可忽视的作用。因此被称为黄金分割。

　　大家记不记得斐波那契数列：1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89…….（从第三个数开始，后边每一个数都是前两个数的和）。然后我们会发现，随着斐波那契数列的递增，前后两个数的比值会越来越接近0.618，利用这个特性，我们就可以将黄金比例运用到查找技术中。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/algorithm/search/comm8/20150323100632467.png')" alt="wxmp">

### 基本思想：
也是二分查找的一种提升算法，通过运用黄金比例的概念在数列中选择查找点进行查找，提高查找效率。同样地，斐波那契查找也属于一种有序查找算法。

　　相对于折半查找，一般将待比较的key值与第mid=（low+high）/2位置的元素比较，比较结果分三种情况：

　　1）相等，mid位置的元素即为所求

　　2）>，low=mid+1;

   3）<，high=mid-1。

　　斐波那契查找与折半查找很相似，他是根据斐波那契序列的特点对有序表进行分割的。他要求开始表中记录的个数为某个斐波那契数小1，及n=F(k)-1;

 开始将k值与第F(k-1)位置的记录进行比较(及mid=low+F(k-1)-1),比较结果也分为三种

　　1）相等，mid位置的元素即为所求

　　2）>，low=mid+1,k-=2;

　　说明：low=mid+1说明待查找的元素在[mid+1,high]范围内，k-=2 说明范围[mid+1,high]内的元素个数为n-(F(k-1))= Fk-1-F(k-1)=Fk-F(k-1)-1=F(k-2)-1个，所以可以递归的应用斐波那契查找。

　　3）<，high=mid-1,k-=1。

　　说明：low=mid+1说明待查找的元素在[low,mid-1]范围内，k-=1 说明范围[low,mid-1]内的元素个数为F(k-1)-1个，所以可以递归 的应用斐波那契查找。

### 复杂度分析：
最坏情况下，时间复杂度为O(log2n)，且其期望复杂度也为O(log2n)。

### C++实现源码：





``` cpp
// 斐波那契查找.cpp 

#include "stdafx.h"
#include <memory>
#include  <iostream>
using namespace std;

const int max_size=20;//斐波那契数组的长度

/*构造一个斐波那契数组*/ 
void Fibonacci(int * F)
{
    F[0]=0;
    F[1]=1;
    for(int i=2;i<max_size;++i)
        F[i]=F[i-1]+F[i-2];
}

/*定义斐波那契查找法*/  
int FibonacciSearch(int *a, int n, int key)  //a为要查找的数组,n为要查找的数组长度,key为要查找的关键字
{
  int low=0;
  int high=n-1;
  
  int F[max_size];
  Fibonacci(F);//构造一个斐波那契数组F 

  int k=0;
  while(n>F[k]-1)//计算n位于斐波那契数列的位置
      ++k;

  int  * temp;//将数组a扩展到F[k]-1的长度
  temp=new int [F[k]-1];
  memcpy(temp,a,n*sizeof(int));

  for(int i=n;i<F[k]-1;++i)
     temp[i]=a[n-1];
  
  while(low<=high)
  {
    int mid=low+F[k-1]-1;
    if(key<temp[mid])
    {
      high=mid-1;
      k-=1;
    }
    else if(key>temp[mid])
    {
     low=mid+1;
     k-=2;
    }
    else
    {
       if(mid<n)
           return mid; //若相等则说明mid即为查找到的位置
       else
           return n-1; //若mid>=n则说明是扩展的数值,返回n-1
    }
  }  
  delete [] temp;
  return -1;
}

int main()
{
    int a[] = {0,16,24,35,47,59,62,73,88,99};
    int key=100;
    int index=FibonacciSearch(a,sizeof(a)/sizeof(int),key);
    cout<<key<<" is located at:"<<index;
    return 0;
}
```






## 参考文章
* http://www.cnblogs.com/maybe2030/
* https://www.cnblogs.com/magic-sea/tag/%E5%B8%B8%E8%A7%81%E7%9A%84%E6%9F%A5%E6%89%BE%E7%AE%97%E6%B3%95/
* https://www.cnblogs.com/hyserendipity/p/8591949.html