---
title: 图-拓扑排序
---

::: tip
本文主要是介绍 图-拓扑排序 。
:::

[[toc]]

## 图---拓扑排序

拓扑排序是针对无环有向图的应用，无环：即图中没有回路


## 一：定义

## （一）AOV网(Activity On Vertex)


在一个表示工程的有向图中，用顶点表示活动，用弧表示活动之间的优先关系，这样的有向图为顶点表示活动的网，我们称为AOV网


### 注意（重点）：


AOV网中的弧表示活动之间存在的某种制约更新。其中AOV网中不能存在回路。


<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/algorithm/basic/toposort-1.png')" alt="wxmp">

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/algorithm/basic/toposort-2.png')" alt="wxmp">

## （二）拓扑序列


设G=(V,E)是一个具有n个顶点的有向图，V中的顶点序列v1,v2,...,vn,满足若从顶点vi到vj有一条路径，则在顶点序列中顶点vi必在vj之前，则我们称这样的顶点序列为一个拓扑序列


## （三）拓扑排序


所谓拓扑排序其实就是对一个有向图构造拓扑序列的过程


# 二：应用

## 我们对一个有向图进行构造时，会出现两个结果。

1.如果此网的全部顶点都被输出，则说明他是不存在环（回路）的AOV网

2.如果输出的顶点数少了，则说明这个网存在环（回路），不是AOV网
一个不存在回路的AOV网，我们可以把它用于在各种工程或项目的流程图中，满足各种应用场景的需要，所以实现拓扑排序的算法很有价值


## 补充：


我们之前在克鲁斯卡尔算法中提及使用并查集判断环和这里判断回路是不同的，使用并查集是判断生成树（是棵树），而且是针对无向图而言的，而我们这里的拓扑排序是针对有向图


<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/algorithm/basic/toposort-3.png')" alt="wxmp">


例如上图：
并查集是判断有环。（主要针对的是无向图）
拓扑排序判断无环。


# 三：拓扑排序算法


从AOV网中选择一个入度为0的顶点输出，然后删除此顶点，并删除以此顶点为尾的弧，重复操作指导输出全部顶点或者AOV网中不存在入度为0的顶点为止前面的最小生成树和最短路径都是使用的邻接矩阵，由于拓扑排序过程需要删除顶点，所以我们使用邻接表会更加方便，而且需要在顶点表中加入入度域，我们会根据顶点的入度决定是否删除


<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/algorithm/basic/toposort-4.png')" alt="wxmp">

### 例如：我们将下面的AOV网转邻接表

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/algorithm/basic/toposort-5.png')" alt="wxmp">
<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/algorithm/basic/toposort-6.png')" alt="wxmp">


对于算法的实现，我们需要借助栈或者队列来实现，都可以


# 四：代码实现

### 我们使用的是创建一个临时栈来存放顶点，也可以使用队列实现（实现方法不唯一，输出结果也不唯一）



``` c
Status TopologicalSort(AdjGraphList AG)
{
    EdgeNode* e;
    int i, j,k, gettop;
    int count = 0;    //用于统计输出顶点个数
    int top = -1;    //这是我们要创建的栈的指针
    int *stack = (int*)malloc(sizeof(int)*AG.numVertexes);    //这是我们创建的临时栈

    //最开始将所有入度为0的顶点入栈
    for (i = 0; i < AG.numVertexes; i++)
        if (!AG.adjlist[i].in)
            stack[++top] = i;

    //下面进入主循环，直到栈中无数据结束（全部顶点输出，或者剩余的成环，入度都不为0）
    while (top!=-1)
    {
        //出栈数据
        gettop = stack[top--];    //出栈
        printf("%c -> ", AG.adjlist[gettop].data);
        count++;
        //对他出栈数据的所有邻接点的入度减一
        for (e = AG.adjlist[gettop].firstedge; e;e=e->next)
        {
            k = e->adjvex;
            if (!(--AG.adjlist[k].in))
                stack[++top] = k;
        }
    }
    printf("\n");
    //进行判断，若是count小于顶点数，则有环
    if (count < AG.numVertexes)
        return ERROR;
    return OK;
}
```







```c
#define _CRT_SECURE_NO_WARNINGS
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>


#define MAXVEX 100    //最大顶点数
#define INFINITY 65535    //用0表示∞

#define OK 1
#define ERROR 0
#define TRUE 1
#define FALSE 0

typedef int Status;

typedef char VertexType;    //顶点类型，字符型A,B,C,D...
typedef int EdgeType;    //边上权值类型10,15,...

//邻接矩阵结构
typedef struct
{
    VertexType vers[MAXVEX];    //顶点表
    EdgeType arc[MAXVEX][MAXVEX];    //邻接矩阵，可看作边表
    int numVertexes, numEdges;    //图中当前的顶点数和边数
}MGraph;

typedef struct EdgeNode //边表结点
{
    int adjvex;
    int weight;
    struct EdgeNode* next;
}EdgeNode;

typedef struct VertexNode    //顶点表结点
{
    int in;
    VertexType data;
    EdgeNode* firstedge;
}VertexNode,AdjList[MAXVEX];


//邻接表结构
typedef struct  
{
    AdjList adjlist;
    int numVertexes, numEdges;    //图中当前的顶点数和边数
}AdjGraphList;

//创建邻接矩阵
void CreateMGraph(MGraph* G);
//显示邻接矩阵
void showGraph(MGraph G);
//邻接矩阵转邻接表
void MGragp2AdjList(MGraph G,AdjGraphList* AG);
//拓扑排序
Status TopologicalSort(AdjGraphList AG);

int main()
{
    MGraph MG;
    AdjGraphList AG;
    CreateMGraph(&MG);
    showGraph(MG);
    MGragp2AdjList(MG, &AG);
    if (TopologicalSort(AG))
        printf("no ring\n");
    else
        printf("ring\n");
    system("pause");
    return 0;
}

//生成邻接矩阵
void CreateMGraph(MGraph* G)
{
    int i, j, k, w;
    G->numVertexes = 14;
    G->numEdges = 20;
    //读入顶点信息
    G->vers[0] = 'A';
    G->vers[1] = 'B';
    G->vers[2] = 'C';
    G->vers[3] = 'D';
    G->vers[4] = 'E';
    G->vers[5] = 'F';
    G->vers[6] = 'G';
    G->vers[7] = 'H';
    G->vers[8] = 'I';
    G->vers[9] = 'J';
    G->vers[10] = 'K';
    G->vers[11] = 'L';
    G->vers[12] = 'M';
    G->vers[13] = 'N';

    //getchar();    //可以获取回车符
    for (i = 0; i < G->numVertexes; i++)
        for (j = 0; j < G->numVertexes; j++)
            G->arc[i][j] = INFINITY;    //邻接矩阵初始化

    //创建了有向邻接矩阵
    G->arc[0][4] = 1;
    G->arc[0][5] = 1;
    G->arc[0][11] = 1;
    G->arc[1][4] = 1;
    G->arc[1][2] = 1;
    G->arc[1][8] = 1;
    G->arc[2][5] = 1;
    G->arc[2][6] = 1;
    G->arc[2][9] = 1;
    G->arc[3][2] = 1;
    G->arc[3][13] = 1;
    G->arc[4][7] = 1;
    G->arc[5][8] = 1;
    G->arc[5][12] = 1;
    G->arc[6][5] = 1;
    G->arc[8][7] = 1;
    G->arc[9][10] = 1;
    G->arc[9][11] = 1;
    G->arc[10][13] = 1;
    G->arc[12][9] = 1;

}


//显示邻接矩阵
void showGraph(MGraph G)
{
    for (int i = 0; i < G.numVertexes; i++)
    {
        for (int j = 0; j < G.numVertexes; j++)
        {
            if (G.arc[i][j] != INFINITY)
                printf("%5d", G.arc[i][j]);
            else
                printf("    0");
        }
        printf("\n");
    }
}

void MGragp2AdjList(MGraph G, AdjGraphList* AG)
{
    int i, j;
    EdgeNode* edge;
    AG->numEdges = G.numEdges;
    AG->numVertexes = G.numVertexes;

    for (i = 0; i < G.numVertexes;i++)
    {
        AG->adjlist[i].data = G.vers[i];
        AG->adjlist[i].in = 0;
        AG->adjlist[i].firstedge = NULL;
    }

    for (i = 0; i < G.numVertexes; i++)
    {
        for (j = 0; j < G.numVertexes; j++)
        {
            if (G.arc[i][j] != INFINITY)
            {
                edge = (EdgeNode*)malloc(sizeof(EdgeNode));
                edge->adjvex = j;
                edge->weight = G.arc[i][j];
                edge->next = AG->adjlist[i].firstedge;
                AG->adjlist[i].firstedge = edge;
                AG->adjlist[j].in++;
            }
        }
    }
}

Status TopologicalSort(AdjGraphList AG)
{
    EdgeNode* e;
    int i, j, k, gettop;
    int count = 0;    //用于统计输出顶点个数
    int top = -1;    //这是我们要创建的栈的指针
    int *stack = (int*)malloc(sizeof(int)*AG.numVertexes);    //这是我们创建的临时栈

    //最开始将所有入度为0的顶点入栈
    for (i = 0; i < AG.numVertexes; i++)
        if (!AG.adjlist[i].in)
            stack[++top] = i;

    //下面进入主循环，直到栈中无数据结束
    while (top != -1)
    {
        //出栈数据
        gettop = stack[top--];    //出栈
        printf("%c -> ", AG.adjlist[gettop].data);
        count++;
        //对他出栈数据的所有邻接点的入度减一
        for (e = AG.adjlist[gettop].firstedge; e; e = e->next)
        {
            k = e->adjvex;
            if (!(--AG.adjlist[k].in))
                stack[++top] = k;
        }
    }
    printf("\n");
    //进行判断，若是count小于顶点数，则有环
    if (count < AG.numVertexes)
        return ERROR;
    return OK;
}
```



<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/algorithm/basic/toposort-7.png')" alt="wxmp">

```
若要测试有环，我们只需要加一条边v9-v5即可，记得边数加一
```

# 五：性能分析

```
对一个具有n个顶点e条弧的AOV网，我们几乎要对每个顶点进行出入栈操作，时间复杂度为O(n),我们要对每个顶点的入度减一，就是减少一条边，时间复杂度取决于边数，为O(e)。所以整个算法时间复杂度为O(n+e)
拓扑排序主要是为解决一个过程能否顺利进行的问题，但有时我们还需要解决过程完成需要的最短时间问题，这时我们就需要关键路径问题来解决
```

作者：[山上有风景](https://www.cnblogs.com/ssyfj/)
欢迎任何形式的转载，但请务必注明出处。
限于本人水平，如果文章和代码有表述不当之处，还请不吝赐教。

## 参考文章
* https://www.cnblogs.com/ssyfj/