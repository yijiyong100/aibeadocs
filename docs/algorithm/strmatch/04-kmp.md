---
title: KMP算法(Knuth-Morris-Pratt)
---

::: tip
本文主要是介绍 KMP算法(Knuth-Morris-Pratt) 。
:::

[[toc]]


 　
## 1、KMP算法介绍

　　KMP算法与前面的MP算法一脉相承，都是充分利用先前匹配的过程中已经得到的结果来避免频繁回溯。回顾一下MP算法，如下图的模式串偏移，当前模式字符串P的左端的p0与目标字符串T中tj位置对齐。从左向右逐个进行比较，发现 pi 处的字符a 与 tj+1 处字符b发生失配。同时也表明 P(p0,p1,...,pi-1) 与 T'(tj,tj+1,...,tj+i-1) 是完全匹配的，这一部分子串在图中用字母u标示出。由于发生失配，随即移动模式字符串并进行下一轮的比较。此时，很自然地希望移动之后的结果可以使得模式字符串P中的一个前缀v，可以匹配到子串u的某一部分后缀。所以MP算法引入一个mpNext数组，并用它来对P中最长前缀进行标记。然后根据PmpNext[i] = c 和 Ti+j = b 之间展开下一轮比较。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/algorithm/strmatch/comm8/1731440-20191111214340865-1778654149.png')" alt="wxmp">

　　在MP算法的基础上再推进一步，继续前面的过程，当模式字符串P完成一次移动后，接下来马上要进行的工作是比较字符 b 和 c，为了避免随之而来的一次失配，在仅仅知道模式字符串P的情况下，保证一次移动后，紧随着前缀字符串v之后的那个字符c不等于原来失配的字符a（满足这个条件的最长前缀v是字符串u的加标边际）。KMP算法需要对mpNext表中符合要求的加标边际进行标识，符合要求指的是：① v可以匹配到u中某个后缀的最长前缀； ② 紧跟在v后面的字符c不同于紧跟在u后面的字符a。

### 2、kmpNext表的规则

　　在mpNext表生成的基础上，建立kmpNext表的规则分为4种情况，其中 1≤j≤m-1：

1. 如果 mpNext[j] = 0 且 pj = p0，则令kmpNext[j] = -1；
2. 如果 mpNext[j] = 0 且 pj ≠ p0，则令kmpNext[j] = 0；
3. 如果 mpNext[j] ≠ 0 且 pj ≠ pmpNext[j]，则令kmpNext[j] = mpNext[j]；
4. 如果 mpNext[j] ≠ 0 且 pj = pmpNext[j]，则用mpNext[j]中的值替换原来mpNext[j]中的j值，直到情况转换为前面3种情况的一种，从而递归求解kmpNext[j]。

　　在 j =0 的位置同样是 -1，并令kmpNext[m] = mpNext[m]，m是模式串P的长度。kmpNext[m]的值也是指示了后续进行匹配而需要将模式字符串移动的位数。

　　kmpNext表：

| j          | 0   | 1   | 2   | 3   | 4   | 5   | 6   | 7   |
| ---------- | --- | --- | --- | --- | --- | --- | --- | --- |
| p(j)       | c   | a   | a   | t   | c   | a   | t   |     |
| mpNext[j]  | -1  | 0   | 0   | 0   | 0   | 1   | 2   | 0   |
| kmpNext[j] | -1  | 0   | 0   | 0   | -1  | 0   | 2   | 0   |

 

### 3、代码



```cpp
 1     public void preKmp(char[] x, int m, int[] kmpNext) {
 2         int i, j;
 3         i = 0;
 4         j = kmpNext[0] = -1;
 5         while(i < m-1) {
 6             while (j > -1 && x[i] != x[j])
 7                 j = kmpNext[j];
 8             i++;
 9             j++;
10             if (x[i] == x[j])
11                 kmpNext[i] = kmpNext[j];
12             else
13                 kmpNext[i] = j;
14         }
15     }
16 
17     public void kmp(String p, String t) {
18         int m = p.length();
19         int n = t.length();
20 
21         if (m > n) {
22             System.err.println("Unsuccessful match!");
23             return;
24         }
25 
26         char[] x = p.toCharArray();
27         char[] y = t.toCharArray();
28 
29         int i = 0;
30         int j = 0;
31         int[] kmpNext = new int[m+1];
32         preKmp(x, m, kmpNext);
33 
34         while (j < n) {
35             while (i > -1 && x[i] != y[j])
36                 i = kmpNext[i];
37             i++;
38             j++;
39             if (i >= m) {
40                 System.out.println("Matching index found at: " + (j - i + 1));
41                 i = kmpNext[i];
42             }
43         }
44     }
```


### 3、KMP算法Next数组构建

KMP算法是用来处理一对一的匹配的。

朴素的匹配算法，或者说暴力匹配法，就是将两个字符串从头比到尾，若是有一个不同，那么从下一位再开始比。这样太慢了。所以KMP算法的思想是，对匹配串本身先做一个处理，得到一个next数组。这个数组是做什么用的呢？next [j] = k，代表j之前的字符串中有最大长度为k 的相同前缀后缀。记录这个有什么用呢？对于ABCDABC这个串，如果我们匹配ABCDABTBCDABC这个长串，当匹配到第7个字符T的时候就不匹配了,我们就不用直接移到B开始再比一次，而是直接移到第5位来比较，岂不美哉？所以求出了next数组，KMP就完成了一大半。next数组也可以说是开始比较的位数。

计算next数组的方法是对于长度为n的匹配串，从0到n-1位依次求出前缀后缀最大匹配长度。

比如ABCDABD这个串:

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/algorithm/strmatch/kmp-1.png')" alt="wxmp">

（图片来源https://www.cnblogs.com/zhangtianq/p/5839909.html）

如何去求next数组呢？k是匹配下标。这里没有从最后一位开始和第一位开始分别比较前缀后缀，而是利用了next[i-1]的结果。

``` cpp
void getnext()//获取next数组
{
    int i,n,k;
    n=strlen(ptr);
    memset(next,0,sizeof(next));
    k=0;
    for(i=1;i<n;i++)
    {
        while(k>0 && ptr[k]!=ptr[i])
            k=next[k];
        if(ptr[k]==ptr[i]) k++;
        next[i+1]=k;
	//next表示的是匹配长度
    }
}
```

这里我是按照《算法导论》的代码来写的。算法导论算法循环是从1到n而不是从0到n-1，所以在下面匹配的时候需要j=next[j+1]。

``` cpp

int kmp(char *a,char *b)//匹配ab两串，a为父串
{
    int i=0,j=0;
    int len1=strlen(a);
    int len2=strlen(b);
    getnext();
    while(i<len1&&j<len2)
    {
        if(j==0||a[i]==b[j])
        {   i++;j++;       }
        else j=next[j+1];//到前一个匹配点
    }
    if(j>=len2)
        return i-j;
    else return -1;
}
```

这里next数组的作用就显现出来了。最后返回的是i-j，也就是说，是从i位置前面的第j位开始的，也就是上面说的， next数组也可以说是开始比较的位数。也就是说，在父串的i位比的时候已经是在比子串的第j位了。

### 4、next数组 一个完整的代码：


``` cpp
#include <iostream>
#include <cstring>
#include <cstdio>
using namespace std;
const int N=100;
char str[100],ptr[100];//父串str和子串ptr
int next[100];
string ans;
void getnext()//获取next数组
{
    int i,n,k;
    n=strlen(ptr);
    memset(next,0,sizeof(next));
    k=0;
    for(i=1;i<n;i++)
    {
        while(k>0 && ptr[k]!=ptr[i])
            k=next[k];
        if(ptr[k]==ptr[i]) k++;
        next[i+1]=k;
	      //next表示的是匹配长度
    }
}
int kmp(char *a,char *b)//匹配ab两串，a为父串
{
    int i=0,j=0;
    int len1=strlen(a);
    int len2=strlen(b);
    getnext();
    while(i<len1&&j<len2)
    {
        if(j==0||a[i]==b[j])
        {   i++;j++;       }
        else j=next[j+1];//到前一个匹配点
    }
    if(j>=len2)
        return i-j;
    else return -1;
}
int main(){
	while( scanf( "%s%s", str, ptr ) )
	{
        int ans = kmp(str,ptr);
        if(ans>=0)
            printf( "%d\n", kmp( str,ptr ));
        else
            printf("Not find\n");
	}
	return 0;
}
```




## 参考文章
* https://www.cnblogs.com/gaochundong/p/string_matching.html
* https://www.cnblogs.com/magic-sea/tag/%E5%AD%97%E7%AC%A6%E4%B8%B2%E5%8C%B9%E9%85%8D%E7%AE%97%E6%B3%95/
* https://blog.csdn.net/qq_30346729/article/details/78835040