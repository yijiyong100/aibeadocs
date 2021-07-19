---
title: 图-最短路径(Floyd)算法
---

::: tip
本文主要是介绍 图-最短路径(Floyd)算法 。
:::

[[toc]]

## 弗洛伊德(Floyd)算法

### 1.定义概览

Floyd-Warshall算法（Floyd-Warshall algorithm）是解决**任意两点间**的最短路径的一种算法，可以正确处理有向图或负权的最短路径问题，同时也被用于计算有向图的传递闭包。Floyd-Warshall算法的时间复杂度为O(N3)，空间复杂度为O(N2)。

### 2.算法思想

从vi到vj的所有可能存在的路径中，选出一条长度最短的路径。

### 3.算法过程

定义N阶方阵序列:*D*−1,*D*0,*D*1,*D*2....*D**n*−1

*D*−1[*i*][*j*]=*G*.*a**r**c*[*i*][*j*]

*D**k*[*i*][*j*]=*M**i**n*{*D**k*−1[*i*][*j*],*D**k*−1[*i*][*K*]+*D**k*−1[*k*][*j*]}

显然: *D**k*[*i*][*j*]是从vi到vj的所经顶点的序号不大于k的最短路径长度。
*D**n*中为所有顶点偶对vi、vj间的最终最短路径长度。

### 4.画片演示

矩阵坐标从0开始
<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/algorithm/basic/shortestpath-3.png')" alt="wxmp">

### 5.代码实现

```c
//G-->图，v0-->源点，P[v][w]表示v到其余各点w最短路径，D[v][w]表示v到其余各点w的带权路径长度和 
void ShortestPath_Floyd(AdjMatrix *G,int P[MAXVEX][MAXVEX],int D[MAXVEX][MAXVEX]){
    int v,w,k;

    //初始化D和P 
    for(v=0;v<G->vexnum;v++){
        for(w=0;w<G->vexnum;w++){
            D[v][w] = G->acre[v][w];
            P[v][w] = w; 
        }
    }

    for(k=0;k<G->vexnum;k++){
        for(v=0;v<G->vexnum;v++){
            for(w=0;w<G->vexnum;w++){

                if(D[v][w]>D[v][k]+D[k][w]){ //如果经过下标为k的顶点路径比原两点间的路径更短，则更新 
                    D[v][w] = D[v][k]+ D[k][w];
                    P[v][w] = P[v][k]; //路径设置经过下标为k的顶点 
                }
            }
        }
    }

}12345678910111213141516171819202122232425
```

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/algorithm/basic/shortestpath-4.png')" alt="wxmp">

解读路径矩阵P:
已0到3为例:

> p[0][3]=1,所以0–>1;
> p[1][3]=3,所以1–>3;
> 所以0到3:0–>1–>3

## 源码地址

[点此查看源码](https://github.com/hsc396612325/Blog/tree/master/text19)

## 参考资料
《大话数据结构》
《数据结构与算法》


## 参考文章
* https://www.freesion.com/article/1065562680/