---
title: 图-数据存储结构
---

::: tip
本文主要是介绍 图-数据存储结构 。
:::

[[toc]]


## 图存储结构

由于图的结构比较复杂，任意两个顶点之间都可能存在联系，因此无法以数据元素在内存中的物理位置来表示元素之间的关系，也就是说，图不可能用简单的顺序存储结构来表示。而多重链表的方式，即以一个数据域和多个指针域的结点表示图中的一个顶点，尽管可以实现图结构，但是以这种结构，如果各个结点的度数相差很大，按度数最大的顶点设置结点结构会造成很多存储单元的浪费，而若按每个顶点自己的度数设计不同的顶点结构，又带来操作的不便。如何实现物理存储是个难题。下面介绍前辈们提供的五种不同的存储结构。

### 1 、邻接矩阵

图的邻接矩阵存储方式使用两个数组来表示图。一个一维数组存储图中顶点信息，一个二维数组（称为邻接矩阵）存储图中的边或弧的信息。

接下来分享几个实例来学习邻接矩阵

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/algorithm/basic/mapbasic/20190504185444507.png')" alt="wxmp">

从这个例子我们可以清楚的知道arc[i][j]=0说明顶点vi与vj之间没有边，若arc[i][j]=1说明顶点vi与vj之间有边。由于是无向图，所以无向图的邻接矩阵是对称矩阵即vi到vj有边，那么vj到vi也有边。

如果我们要知道图中某个顶点的度那么只要将该顶点对应的行（或列）的元素值加起来，就是该顶点的度。

下面在来看一个有向图的例子：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/algorithm/basic/mapbasic/20190504190206489.png')" alt="wxmp">

如果arc[i][j]=0表示vi到vj不存在弧,arc[i][j]=1表示vi到vj存在弧。

有向图讲究入度与出度，某个顶点的入度为该顶点对应的列上所有元素之和，某个顶点的出度为该顶点对应的行上的所有元素之和。该顶点入度加上出度就是该顶点的度。

下面例看一个有向网图的例子：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/algorithm/basic/mapbasic/20190505155845285.png')" alt="wxmp">

这里用∞表示一个不可能的极限值用来代表不存在。

下面是图的邻接矩阵的结构定义：

```cpp
#include <iostream>
using namespace std;
typedef char VertexType;		//顶点类型
typedef int EdgeType;			//边权值类型

#define MAXVEX 100				//最大顶点数
#define INFINITY 65535			//用65535代表∞
typedef struct _MGraph			//图的邻接矩阵存储方式定义
{
	VertexType vexs[MAXVEX];	//定义顶点数组
	EdgeType arc[MAXVEX][MAXVEX];	//定义邻接矩阵
	int NumVexs;				//图中顶点数
	int NumEdges;				//图中边数
}MGraph;
 
```

### 2、邻接表

邻接表示不错的一种图的存储结构，但是我们发现对于边数相对顶点较少的图，这种结构时存在对存储空间的极大浪费。如我们要处理像下图这样的稀疏有向图：
 

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/algorithm/basic/mapbasic/20190505161701301.png')" alt="wxmp">

除了一条弧有权值外，没有其他弧，那么这就造成了存储空间的极大浪费。

这里我们采取了邻接表的存储方式。邻接表就是把数组与链表相结合的存储方法。

邻接表处理步骤如下：

1.图中顶点用一维数组存储，另外每个数据元素还需存储指向第一个邻接点的指针，以便于查找该顶点的信息。

2.图中每个顶点的vi的所有邻接点构成一个线性表，由于邻接点的个数不定，所以用单链表存储。无向图称为顶点vi的边表，有向图则称为vi作为弧尾的出边表。

下面举个无向图的邻接表的例子：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/algorithm/basic/mapbasic/2019050516304384.png')" alt="wxmp">

由这个例子知道顶点表的各个结点由data域和firstedge域（指针域）两个域表示。data是数据域，存储顶点的信息，firstedge是指针域，指向边表的第一个结点，即此顶点的第一个邻接点。边表结点由adjvex和next两个域组成。adjvex是邻接点域用来存储某顶点的邻接点在顶点表中的下标，next则存储指向边表中下一个结点的指针。

若是有向图，邻接表结构同样类似，不过有向图有方向，所以有向图有邻接表与逆邻接表两种方式，看如下例子：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/algorithm/basic/mapbasic/20190505164906492.png')" alt="wxmp">

当然我们可以建立一个有向图的逆邻接表，即对每个顶点都建立一个以顶点vi都建立一个以vi为弧头的表，上例的逆邻接表如下：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/algorithm/basic/mapbasic/20190505165040709.png')" alt="wxmp">

此时我们很容易就可以算出某个顶点的入度或出度是多少，判断两顶点是否存在弧也很容易实现。

对于带权值的网图，可以在边表结点中再定义一个weight的数据域，存储权值信息即可。

下面给出图的邻接表结构的定义：

```cpp
typedef char VertexType;		//顶点类型
typedef int EdgeType;			//边权值类型



#define MAXVEX 100				//最大顶点数
typedef struct _EdgeNode		//边结点
{
	int adjvex;					//邻接点域，存储该顶点对应下标
	EdgeType weight;			//用于存储权值，非网图可以不需要
	struct _EdgeNode *next;		//链域，指向下一个邻接点
}EdgeNode;

typedef struct _VexNode			//顶点结点
{
	VertexType data;			//数据域，存储结点信息
	struct _VexNode *firstedge;	//指针域，存储指向第一个邻接点的指针（边表头指针）
}VexNode,AdjList[MAXVEX];

typedef struct
{
	AdjList adjlist;
	int numvexs;				//图中顶点数
	int numedge;				//图中边数
}GraphAdjList;
```

### 3、十字链表

对于有向图来说，邻接表是有缺陷的，只知道出度问题，想了解入度就必须要遍历整个图才能知道，反之，逆邻接表解决了入度却不了解出度的情况。为了解决这个问题，我们要引出有向图的一种存储方法：**十字链表。**

实质上，十字链表就是将邻接表与逆邻接表结合起来。

我们需要重新定义顶点表结构如下图：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/algorithm/basic/mapbasic/20190505182926244.png')" alt="wxmp">

其中**firstin**表示入边表头指针，指向该顶点的入边表中的第一个顶点（相当于逆邻接表），**firstout**表示出边表头指针，指向该顶点的出边表中的第一个结点（相当于邻接表）。

重新定义边表结构如下：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/algorithm/basic/mapbasic/20190505182824398.png')" alt="wxmp">

其中tailvex是指弧起点在顶点表的下标，headvex是指弧终点在顶点表中的下标，headlink是指入边表指针域，指向终点相同的·下一条边，taillink是指向起点相同的下一条边。如果是网，还可以在增加一个weight域来存储权值。

下面来看一个例子：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/algorithm/basic/mapbasic/20190505184128493.png')" alt="wxmp">

上图中的虚线箭头其实就是该图的逆邻接表（入边（顶点做弧头））。实线就是该图的邻接表（出边（顶点做弧尾））。

有向图的十字链表存储方式代码如下：

```cpp
typedef char VertexType;		//顶点类型
typedef int EdgeType;			//边权值类型



#define MAXVEX 100				//最大顶点数
typedef struct _EdgeNode
{
	int tailvex;				//弧起点（弧尾）在顶点表的下标
	int headvex;				//弧终点（弧头）在顶点表的下标
	struct _EdgeNode *headlink;	//入边表指针域，用来指向终点相同的下一条边
	struct _EdgeNode *taillink;	//出边表指针域，用来指向起点相同的下一条边
}EdgeNode;

typedef struct _VexNode
{
	VertexType data;			//用来存放顶点信息
	EdgeNode *firstin;			//指针域，用来指向入边表的第一个顶点（即该顶点做弧头）
	EdgeNode *firstout;			//指针域，用来指向出边表的第一个顶点（即该顶点做弧尾）
}VexNode,Adjvexs[MAXVEX];

typedef struct
{
	Adjvexs adjvexs;			//定义顶点数组
	int numvexs;				//该图的顶点数
	int numedges;				//该图的边数
}GraphCrossLinkList;



 
```

### 4、邻接多重表

十字链表是对有向图的优化存储结构，对于无向图，如果我们关注的是顶点，那么邻接表是不错的选择，但如果我们更关注边的操作，比如对已经访问的边做标记，删除某一条边等操作。那就意味，需要找到这条边的两个边表结点进行操作，显然这是比较麻烦的。

所以我们重新定义边表结点结构如下：
 

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/algorithm/basic/mapbasic/20190506193335132.png')" alt="wxmp">

其中**ivex**与**jvex**是与某条边依附的两个顶点在顶点表中下标。**ilink**是指依附顶点**ivex**的下一条边，**jlink**是指依附顶点**jvex**的下一条边。这就是**邻接多重表**结构。

看下面的例子：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/algorithm/basic/mapbasic/20190506194422824.png')" alt="wxmp">

此例中图中有4个顶点，五条边。然后依次按照顺序连线，当我们需要删除（v0，v2）这条边时，只需要将图中6和9的指针域置为空。

我想大家应该明白，邻接多重表与邻接表的区别，仅仅是在于同一条边在邻接多重表中用一个结点表示，而在邻接表中用两个边表结点表示。

### 5、边集数组

边集数组是由两个一维数组构成。一个是存储顶点的信息；另一个是存储边的信息，这个边数组每个数据元素由一条边的起点下标（begin）、终点下标（end）和权（weight）组成。如下图是一个边集数组：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/algorithm/basic/mapbasic/20190506195438732.png')" alt="wxmp">

显然边集数组关注的是边的集合，在边集数组中要查找一个顶点的度需要扫描整个边数组，效率并不高，因此它更适合对边依次进行处理的操作。而不适合对顶点相关的操作。


## 参考文章
* https://blog.csdn.net/weixin_43977523/article/details/89402161