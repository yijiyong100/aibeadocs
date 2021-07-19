---
title: 图-最短路径(Dijkstra)算法
---

::: tip
本文主要是介绍 图-最短路径(Dijkstra)算法 。
:::

[[toc]]

## 最短路径的概念

从某顶点(源点)出发到另一顶点(目的点)的路径中,有一条各边(或弧)权值之和最小的路径称为最短路径。

形式化表述:

> 设有带权的有向图D=(V,{E})，D中的边权为W(e)。已知源点为v0，求v0到其它各顶点的最短路径。

最短路径有两种算法:迪杰斯特拉(Dijkstra)算法和弗洛伊德(Floyd)算法

## 迪杰斯特拉(Dijkstra)算法

### 1.定义概览

Dijkstra(迪杰斯特拉)算法是典型的单源最短路径算法，用于计算**一个节点到其他所有节点**的最短路径。主要特点是以起始点为中心向外层层扩展，直到扩展到终点为止。

问题描述：在无向图 G=(V,E) 中，假设每条边 E[i] 的长度为 w[i]，找到由顶点 V0 到其余各点的最短路径。（单源最短路径）

### 2.算法思想

如果源点v0到顶点vi的弧是v0到各点(最短)路径集合中最短者，则一定可以确定的是< v0,vi>是源点v0到vi的最短路径。

- 第一条最短路径(vo到vi是所有点中路径最短)最短路径的特点:
  这条路径上，必定只含有一条弧，并且这条弧权值最小。
- 下一条(路径次短)的最短路径的特点:
  它只含有两种情况：或者直接从源点到改点vj，或者**从源点到vi，在到达vj**
- 再下一条长度次短的特点:
  它可能有两种情况：或者直接从源点到达改点，或者从源点到达vi/cj,然后到达该点
- 其余最短路径的的特点:
  它或者是直接从源点到该点(只含一条弧)； 或者是从源点经过已求得最短路径的顶点，再到达该点

### 3.算法步骤

1. 初始化：S={v},v为源点。U={除V外所有点}
2. 从U中选择到v距离最小的顶点k，把K加入到S中。
3. 把k作为新的中间点，更新U中各点到源点的距离
4. 重复2,3过程直到所有点都在S中

### 4.动画演示

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/algorithm/basic/shortestpath-1.gif')" alt="wxmp">

### 5.代码实现

```c
//G-->图，v0-->源点，P[v]表示v前驱顶点下标,D[v]表示V0到v的最短路径长度和 
void ShortestPath_Dijkstra(AdjMatrix *G,int v0,int *P,int *D){
    int v,w,k,min;
    int book[MAXVEX]; //标记顶点v是否已找到最短路径

    for(v=0;v<G->vexnum;v++){  //初始化数据 
        book[v]=0;
        P[v]=0;
        D[v]=G->acre[0][v]; 
    } 

    D[v0]=0; //v0到v0距离为0 
    book[v0]=1;

    //开始主循环，每次求得v0到某个顶点的最短距离
    for(v=1;v<G->vexnum;v++){
        min=INFINITY;

        for(w=0;w<G->vexnum;w++){  //寻找到达v0距离最短的点 
            if(!book[w]&&D[w]<min){
                k=w;
                min=D[w];
            }
        }

        book[k]=1; //将此时找到的点标记 
        for(w=0;w<G->vexnum;w++){ //根据本次找达v0最短的点，更新其他点到v0的距离 

            //如果经过顶点k的路径比现在路径更短的话
            if(!book[w]&&(min+G->acre[k][w]<D[w])){
                D[w]=min+G->acre[k][w];
                P[w]=k;
            } 
        } 
    } 
}
```

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/algorithm/basic/shortestpath-2.png')" alt="wxmp">


## 参考文章
* https://www.freesion.com/article/1065562680/