---
title: 图-精华总结
---

::: tip
本文主要是介绍 图-精华总结 。
:::

[[toc]]

# **图、prim算法、dijkstra算法**

## 一、图的定义

 **图(Graph)可以简单表示为G=<V, E>，其中V称为顶点(vertex)集合，E称为边(edge)集合。图论中的图(graph)表示的是顶点之间的邻接关系。

**

**(1) 无向图(undirect graph)**
   E中的每条边不带方向，称为无向图。
**(2) 有向图(direct graph)**
   E中的每条边具有方向，称为有向图。
**(3) 混合图**
    E中的一些边不带方向， 另一些边带有方向。
**(4) 图的阶**
   指图的顶点数目，即顶点集V中的元素个数。
**(5) 多重图**
   拥有平行边或自环的图。
**(6) 简单图**
   不含平行边和自环的图**.**

***\*<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/algorithm/basic/mapsummary/1157683-20170521105223353-241421271.png')" alt="wxmp">\****

  **(7) 边的表示方法与有关术语**
   a. 无向图的边称为无向边(edge)，它用无序偶表示
<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/algorithm/basic/mapsummary/1157683-20170521105546963-1782586440.png')" alt="wxmp">
    称顶点vi与vj相互邻接或互为邻接点(adjacent)；边(vi, vj)依附于(incident)顶点vi和vj或与顶点vi和vj相关联。
   b. 有向图的边称为有向边或弧(arc)，它用有序偶表示
<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/algorithm/basic/mapsummary/1157683-20170521105626338-2069692343.png')" alt="wxmp">
   称顶点vi为弧尾(tail)或始点(initial node)，顶点vj为弧头(head)或终端点(terminal node) ；vi邻接至vj，而vj邻接自vi；弧<vi, vj>依附于或关联顶点vi和vj。
 **(8) 顶点的度(degree)**
   a. 无向图顶点的度定义为与该顶点相关联的边的数目；
    **性质1：**无向图中，各顶点的度数和等于边数的2倍。
  b. 有向图顶点的度定义为与该顶度相关联的弧的数目。  
    即，有向图顶点的度=入度(indegree)+出度(outdegree)，其中入度定义为连接该顶点的弧头的数目；出度定义为连接该顶点的弧尾的数目。
   **性质2：**有向图中，顶点的入度和=出度和=弧的数目。
 **(9) 完全图**
   a. n阶无向简单图中，若每个顶点的度均为n-1，称该图为无向完全图。

​    **性质3：**n阶无向完全图边的数目为<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/algorithm/basic/mapsummary/1157683-20170521105907260-85985938.png')" alt="wxmp">
   b. n阶有向简单图中，若每个顶点的入度=出度=n-1，称该图为n阶有向完全图。
​    **性质4：**n阶有向完全图弧的数目为n(n-1)。
 **(10) 网(Network)**
   若图中的边带有权重(weight)，称为网。边上的权重一般代表某种代价或耗费。比如：顶点表示城市，边表示城市间的公路，则权重可以用公路里程来表示。若边上的权重为无穷大，一般表示代价无穷大等含义。
 **(11) 稀疏图(sparse graph)与稠密图(dense graph)**
​    若无向图或有向图有e条边或弧，若e很小(如e<nlog2n)，称为稀疏图，否则称为稠密图。
 **(12) 子图**
​    对于图G=<V, E>，若有另一图G'=<V', E'>满足<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/algorithm/basic/mapsummary/1157683-20170521110031807-805679056.png')" alt="wxmp">，称图G'为G的子图。

## **二、 图的路径**

 **（1）路径(path)**
    图G=<V, E>中，从任一顶点开始，由边或弧的邻接至关系构成的有限长顶点序列称为路径。注意：
     有向图的路径必须沿弧的方向构成顶点序列；
     构成路径的顶点可能重复出现(即允许反复绕圈)。
  **(2) 路径长度**
    路径中边或弧的数目。
  **(3) 简单路径**
    除第一个和最后一个顶点外，路径中无其它重复出现的顶点，称为简单路径。
  **(4) 回路或环(cycle)**
    路径中的第一个顶点和最后一个顶点相同时，称为回路或环。

## **三、图的连通性**

  **(1) 无向连通图**：在无向图中，若从顶点vi到vj有路径，则称vi和vj是连通的。若该图中任意两个顶点都是连通的，则称它是连通图。
  **(2) 连通分量**：无向图中的极大连通子图(包括子图中的所有顶点和所有边)称为连通分量或连通分支。连通图也可以定义为连通分支数等于1的图。
 <img class= "zoom-custom-imgs" :src="$withBase('/assets/img/algorithm/basic/mapsummary/1157683-20170521110412853-400077957.png')" alt="wxmp">

 

  **(3) 有向连通图**
    在有向图中，任一对顶点vi和vj(vi不等于vj)，若从vi到vj以及从vj到vi均连通(即存在路径)，称它是强连通的。
  **(4) 强连通分量**
    有向图中的极大强连通子图称为强连通分量。
  **性质1：**有向强连通图的充要条件是该图存在一个回路经过每个顶点至少1次。
  **性质2：**n阶无向连通图中至少有n-1条边； n阶有向连通图中至少有n条边。
  例如，3个顶点组成的最小无向和有向连通图
<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/algorithm/basic/mapsummary/1157683-20170521110555244-97912777.png')" alt="wxmp">

 **(5) 生成树**
    一个n阶连通图的生成树是一个极小连通子图，它包含图中全部n个顶点以及保证该子图是连通图的最少的n-1条边。
    **性质3：**在生成树上增加任何一条边，必形成回路。
 **(6) 有向树与生成森林**
    如果一个有向图恰有一个顶点入度为0，其余顶点的入度均为1，则是一棵有向树。一个有向图的生成森林由若干棵有向树组成，含有图中全部顶点，但只有中以构成若干棵不相交的有向树的弧。

## 四、图的存储结构

 **1.邻接矩阵**：若n阶图表示为G=<V, E>，其中V={v0, v1, …, vn-1}，则定义
<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/algorithm/basic/mapsummary/1157683-20170521110756807-1146602771.png')" alt="wxmp">

若图G为n阶网，则定义：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/algorithm/basic/mapsummary/1157683-20170521110827635-1830924933.png')" alt="wxmp">

其中，wij为边(vi, vj)或弧<vi, vj>上的权重。
**无向简单图邻接矩阵的性质：**
  关于主对角线对称，即A=AT；
  主对角线元素全为0；
  矩阵中1的数目=边数的2倍；
  第i行1的数目=第i列1的数目=顶点vi的度。
**2. 邻接表与逆邻接表：**若n阶图表示为G=<V, E>，其中V={v0, v1, …, vn-1}，则可用链表实现图的存储结构。
**（1）、邻接表：**
  a. 无向图：关联顶点vi的所有边组成的集合用单链表实现存储，头结点存储顶点vi的编号和信息，其余结点存储邻接于顶点vi的其它顶点的编号、边的权重和信息。这样共形成n个单链表，称为邻接表。
  b. 有向图：以顶点vi为弧尾的所有弧组成的集合用单链表实现存储，头结点存储弧尾vi的编号和信息，其余结点存储弧头顶点编号、弧的权重和信息。
**头结点(存储顶点vi)：**

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/algorithm/basic/mapsummary/1157683-20170521111233900-627093306.png')" alt="wxmp">





```c
1 typedef struct
2 { //顶点数据(可选)
3    ElemTp data;
4    //顶点信息(可选)
5    InfoTp info;
6    int i;  //顶点下标
7    ArcNode *firstarc;
8 } HNode;
```



**表结点(存储边或弧)：**

**<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/algorithm/basic/mapsummary/1157683-20170521111325213-2099142856.png')" alt="wxmp">**





```c
1 typedef struct node
2 { //边或弧的权重(可选)
3    double w;
4    //边或弧的信息(可选)
5    InfoTp info;
6    int j;  //邻接点下标
7    struct node *nextarc;
8 } ArcNode;
```



**整体数据结构：**





```c
#define MAX_N  最大顶点数
typedef  enum { DG, UDG, DN, UDN } GraphKind;
// DG:有向图, UDG:无向图, DN:有向网, UDN:无向网
typedef   struct
{  HNode h[MAX_N];  //头结点形成数组
    int n, e;   //n:实际顶点数; e:边或弧的数目
    Graphkind   kind;    //图的类型(可选)                                         
} ALGraph;
```



**(2)、 逆邻接表**
    有向图中，表结点存储邻接至顶点vi的所有弧，即头结点是弧头，表结点是弧尾。
**无向图邻接表存储结构示意图：**
<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/algorithm/basic/mapsummary/1157683-20170521111718682-965350899.png')" alt="wxmp"><img class= "zoom-custom-imgs" :src="$withBase('/assets/img/algorithm/basic/mapsummary/1157683-20170521111743994-330560105.png')" alt="wxmp">

**特点：**表结点数为边数的2倍；顶点vi的度为第i个单链表的表结点数。
有向图邻接表存储结构示意图：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/algorithm/basic/mapsummary/1157683-20170521111840463-1040957099.png')" alt="wxmp"><img class= "zoom-custom-imgs" :src="$withBase('/assets/img/algorithm/basic/mapsummary/1157683-20170521111858385-1601617724.png')" alt="wxmp">

特点：表结点数为弧的数目；顶点vi的出度为第i个单链表的表结点数。 (求入度不方便)
**有向图逆邻接表存储结构示意图：**

 <img class= "zoom-custom-imgs" :src="$withBase('/assets/img/algorithm/basic/mapsummary/1157683-20170521112010010-1049132215.png')" alt="wxmp"><img class= "zoom-custom-imgs" :src="$withBase('/assets/img/algorithm/basic/mapsummary/1157683-20170521112028322-1244928532.png')" alt="wxmp">

**特点**：表结点数为弧的数目；顶点vi的入度为第i个单链表的表结点数。(求出度不方便)

**3. 有向图的十字链表**
    每个表结点(弧<vi, vj>)在水平方向构成单链表，形成以vi为弧尾的所有弧组成的集合；
    每个表结点(弧<vi, vj>)在垂直方向构成单链表，形成以vj为弧头的所有弧组成的集合。
<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/algorithm/basic/mapsummary/1157683-20170521112139635-429145496.png')" alt="wxmp">





```c
typedef struct
{ //顶点数据(可选)
   ElemTp data; 
   //顶点信息(可选)
   InfoTp info;
   int i;  //顶点下标
   OLANode *firstin; 
   OLANode *firstout;
} OLHNode;
typedef struct node
{ //弧的权重(可选)
   double w; 
   //弧的信息(可选)
   InfoTp info;
   int i, j;  //弧的端点下标
   struct node *hlink;
   struct node *vlink;
} OLANode;
typedef   struct
{  OLHNode h[MAX_N];  //头结点形成数组
    int n, e;   //n:实际顶点数; e:边或弧的数目
    Graphkind   kind;    //图类型(可选)                                         
} OLGraph;
```



**十字链表特点**:表结点数等于弧的数目；求入度和出度都很方便。
**有向图十字链表存储结构示意图：**
<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/algorithm/basic/mapsummary/1157683-20170521112349572-633165106.png')" alt="wxmp"><img class= "zoom-custom-imgs" :src="$withBase('/assets/img/algorithm/basic/mapsummary/1157683-20170521112432978-272629370.png')" alt="wxmp">

**4. 无向图的邻接多重表**
   采用类似十字链表的思想实现无向图存储。任意边(vi, vj)只存储一个表结点，每个表结点有inext和jnext两个指针域，inext指向关联于顶点vi的下一条边，而jnext指向关联于顶点vj的下一边条。顶点vi的头结点仅含一个指针域，指向关联于vi的第1条边。
<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/algorithm/basic/mapsummary/1157683-20170521112531025-837963785.png')" alt="wxmp">

邻接多重表存储结构示意图：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/algorithm/basic/mapsummary/1157683-20170521112604947-1575855309.png')" alt="wxmp"><img class= "zoom-custom-imgs" :src="$withBase('/assets/img/algorithm/basic/mapsummary/1157683-20170521112631244-21545589.png')" alt="wxmp">

## **五、图的遍历和相关算法**

**1. 遍历的定义**
   从图中某顶点出发，沿路径方向访问每个顶点一次且仅一次。
**2. 图遍历算法的辅助数据结构**
   为避免顶点重复访问，需定义一个顶点标志数组visited[0..n-1]，标记每个顶点是否已访问。
**3. 图的深度优先搜索(Depth First Search)算法**
   搜索原则：沿出发顶点的第1条路径尽量深入，遍历路径上的所有顶点；然后退回到该顶点，搜索第2条, 第3条, …, 路径，直到以该顶点为始点的所有路径上的顶点都已访问过(这是递归算法)。对于非连通图，需从每个顶点出发，尝试深度优先遍历。**
**





```c
void DFStravel(Graph  &G)  //Graph为邻接矩阵
{  bool *visited=new bool[G.n];
    for(i=0; i<G.n; i++) visted[i]=false; 
    for(i=0; i<G.n; i++) //保证非连通图的遍历
        if (!visited[i])  DFS(G, i);
    delete []visited;
 }
void DFS(Graph  &G, int i) //从vi出发深度优先搜索
{  visit(i); visited[i]=true;
    for (j=First_Adj(G, i); j!=-1; j=Next_Adj(G, i, j))
       if (!visited[j])  DFS(G, j);
}
```



**4. 图的宽度优先搜索(Breadth First Search)算法**
**搜索原则：**

1.  访问遍历出发顶点，该顶点入队；
2.  队列不空，则队头顶点出队；
3.  访问出队顶点所有的未访问邻接点并将访问的顶点入队；
4.  重复(2), (3), 直到队列为空。

 以上为非递归算法，需设队列实现算法。对于非连通图，需从每个顶点出发，尝试宽度优先搜索。





```c
 1 void BFStravel(Graph  &G)  //Graph为邻接矩阵
 2 {  bool *visited=new bool[G.n];
 3     for(i=0; i<G.n; i++) visted[i]=false;
 4     InitQuene(Q); 
 5     for(i=0; i<G.n; i++) 
 6        if (!visited[i])  
 7        { visit(i); visited[i]=true; enQueue(Q, i);
 8           while(!Empty(Q))
 9           { u=delQueue(Q); 
10              for(v=First_Adj(G,u);v!=-1;v=Next_Adj(G,u,v))
11                 if(!visited[v])
12                { visit(v); visted[v]=true; enQueue(Q, v); 
13                 } // end of if !visited[v]
14            }   // end of while  
15          }      // end of if !visited[i]
16   delete []visited; 
17 }
```



**5. 求第1邻接点和下一个邻接点算法**





```c
 1 //邻接矩阵
 2 int First_Adj(Graph &G, int u)
 3 { for(v=0; v<G.n; v++) if(G.arcs[u][v]!=0) break;
 4    if(v<G.n) return v;
 5    return -1;
 6 }
 7 int  Next_Adj(Graph &G, int u, int v)
 8 { for(++v; v<G.n; v++) if(G.arcs[u][v]) break;
 9    if(v<G.n) return v;
10    return -1;
11 }
12 //邻接表和十字链表
13 for(v=First_Adj(G, u); v!=-1; v=Next_Adj(G, u, v))
14 //用以下循环语句代替
15 for(p=G.h[u].firstarc, v=p?p->j:-1; v!=-1;   \
16 p=p->nextarc, v=p?p->j:-1)      
17 //若为十字链表，则用以下循环语句代替
18 for(p=G.h[u].firstout, v=p?p->j:-1; v!=-1;   \
19 p=p->hlink, v=p?p->j:-1)
```



**6. 图的遍历算法的复杂度**
<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/algorithm/basic/mapsummary/1157683-20170521113304244-432436465.png')" alt="wxmp">

深度优先遍历顶点访问次序(从顶点v0出发):



<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/algorithm/basic/mapsummary/1157683-20170521113402010-1124604081.png')" alt="wxmp">

求邻接点次序不同，可得到不同的访问序列，如：v0, v2, v5, v6, v1, v3, v7, v4等
**宽度优先遍历顶点访问次序(从顶点v0出发):**
<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/algorithm/basic/mapsummary/1157683-20170521113506057-370221837.png')" alt="wxmp">

给定存储结构示意图，则遍历次序唯一确定:
<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/algorithm/basic/mapsummary/1157683-20170521113541916-478350383.png')" alt="wxmp"><img class= "zoom-custom-imgs" :src="$withBase('/assets/img/algorithm/basic/mapsummary/1157683-20170521113635416-1423428128.png')" alt="wxmp">

从0出发深度优先次序：
0, 1, 4, 2, 3
从0出发宽度优先次序：
0, 1, 3, 4, 2
**7、连通性与最小生成树**
 **1. 连通性的判断方法**
  无向图从任一顶点出发，若DFS或BFS可访问所有顶点，则该图是连通图；
  有向图从每个顶点出发，若DFS或BFS均可访问所有顶点，则该图是强连通图。
 **2. 求连通分支** 无向图DFSTravel或BFSTravel过程中，从顶点出发进行DFS或BFS的次数为连通分支数。
 **3. 求生成树** DFSTravel或BFSTravel经历的路径和顶点构成连通分支的生成树森林。若图是连通的，则得到生成树。
 **4.最小生成树的概念：**对于带权无向图(无向网)，其所有生成树中，边上权值之和最小的称为最小生成树。注意：最小生成树的构形不一定唯一。
 **5.最小生成树生成算法的基本原理-MST性质**
   **MST性质：**假设G＝(V, E)是一个连通网，U是顶点V的一个非空子集。若(u, v)是满足条件u∈U且v∈V－U的所有边中一条具有最小权值的边，则必存在一棵包含边(u, v)的最小生成树。
 **6.普里姆(Prim)算法**
   **算法思想：**直接运用MST性质。
    假设G＝(V, E)是连通网，TE是G上最小生成树中边的集合。算法从U＝{u0} (u0∈V)且TE＝{}开始，重复执行下列操作：
    在所有u∈U且v∈V－U的边(u, v) 中找一条权值最小的边(u', v')并入集合TE中，同时v'并入U，直到V＝U为止。
    最后，TE中必有n-1条边。T=(V, TE)就是G的**一棵最小生成树。**
    **用Prim算法手工构造最小生成树：记为T1**
<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/algorithm/basic/mapsummary/1157683-20170521114017135-1816605895.png')" alt="wxmp">

  **Prim算法的实现：**
    设置辅助数组closedge[0..n-1]，其中n表示无向连通网的顶点总数。
    设n个顶点组成的集合V={v0, v1, …, vn-1}且各顶点编号与closedge数组下标对应。若初始时U={v0}，在Prim算法执行过程中，对任意顶点vi属于V-U，closedge[i]包含两个域，即

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/algorithm/basic/mapsummary/1157683-20170521114113369-550325233.png')" alt="wxmp">

  若顶点vi已并入集合U，则令closedge[i].lowcost=0；
  若顶点vi在V-U中，且与U中每个顶点无边相边，可令closedge[i].lowcost=无穷。
  每趟从所有vi属于V-U中(closedge[i].lowcost>0表示vi属于V-U)选择lowcost最小的vi，将vi并入集合U。
  假设每趟并入U集合的顶点为vi，则
     a. 令closedge[i].lowcost=0;
     b. 调整其它lowcost>0的所有closedge元素，即
     对任意vj属于V-U，若cost(vi, vj)<closedge[j].lowcost，则更新 closedge[j].lowcost=cost(vi, vj)；closedge[j].vex=i否则，closedge[j]不更新。

 **T1的closedge数组动态变化过程:(vex, lowcost )**
<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/algorithm/basic/mapsummary/1157683-20170521114338025-1297605570.png')" alt="wxmp">

 **7、克鲁斯卡尔(Kruskl)算法**
   给定连通网N=(V, E)，令最小生成树的初始状态为只有n个顶点而无边的非连通图T，图中每个顶点自成一个连通分量。在E中选择最小权重的边，若该边依附的顶点落在T中不同的连通分量中，则将该边加入到T中，否则舍去此边而选择下一条权重最小的边。依次类推，直到T中所有顶点都在同一连通分量上为止。
核心：每次选择一条具有最小权值、且跨越两个不同连通分量的边，使两个不同连通分量变成一个连通分量。
<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/algorithm/basic/mapsummary/1157683-20170521114720994-1099627097.png')" alt="wxmp">

**Kruskl算法：需使用堆和求等价类算法，不用掌握。**
**Prim和Kruskl算法的时间复杂度**
  **Prim: T(n)=O(n2),** 适合边多的稠密度
  **Kruskl: T(n)=O(elog2e),**  适合边少的稀疏图
 **8、最短路径的概念**
  a.给定n阶有向或无向网N=(V, E)，其中，V={v0, v1, … , vn-1}。设P表示顶点vi到vj的一条路径中全部边(弧)组成的集合，则该条路径的带权路径长度定义为P中的所有边(弧)的权值之和。顶点vi到vj的最短路径是指vi到vj的所有路径中带权路径长度最小的路径。
  **3点说明：**
     顶点vi到vj的最短路径不一定唯一；
    若vi到vj不连通，则vi到vj的最短路径长度为无穷大；
    对于n阶无向网，顶点对的组合数为n(n-1)/2，即共有n(n-1)/2个最短路径；对于n阶有向网，则总共有n(n-1)个最短路径。
  b. **求最短路径的迪杰斯特拉算法(Dijkstra)**
   **算法说明：**
    对于n阶网N=(V, E)，Dijkstra算法按最短路径长度递增的次序求任意给定的某顶点(作为始点)到其它的n-1个顶点的最短路径。若需要求出全部顶点对间的最短路径，必须以每个顶点为源点应用Dijkstra算法n次。
    首先，引入辅助向量dist[0..n-1]，该向量用于存储n-1条最短路径的长度。设始点为vk， 则算法结束后，dist[i](i不等于k)的值为始点vk至顶点vi的最短路径长度。
    初始化：dist[i]=wk,i  i=0, 1, 2, …, n-1
    其中，若vi邻接自vk，则wk,i为边上权值，否则w（k,i）=无穷大。
      **第1步：求n-1个最短路径长度中的最小值以及对应路径终点**
        显然，始点vk到其它n-1个顶点的最短路径的最小值应为依附于始点vk的所有边(弧)中权值的最小值，对应路径终点为该最小权值边(弧)依附的另一邻接点。
       故，最短的最短路径的终点下标可用下式计算。<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/algorithm/basic/mapsummary/1157683-20170521115457385-17482427.png')" alt="wxmp">
        (1)式中，arg表示求下标i，使得i满足条件：dist[i]是所有dist[]中的最小值。
       总之，若下标j满足(1)式，则vk至vj的最短路径长度为dist[j]，且dist[j]是n-1个最短路径中长度最短的。
      **第2步：循环n-2趟(m=1, 2, … , n-2)，**
       按长度递增次序生成其它最短路径
       若视算法第1步为第0趟，记第m(m=0, 1, … , n-2)趟生成的最短路径终点下标为jm，则必须使
      <img class= "zoom-custom-imgs" :src="$withBase('/assets/img/algorithm/basic/mapsummary/1157683-20170521115616572-948868136.png')" alt="wxmp">

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/algorithm/basic/mapsummary/1157683-20170521115732463-856998728.png')" alt="wxmp">

## **六、实验实现Prim算法**

**6.1．实验内容**
  **用prim算法实现最小生成树。**
**6.2．输入与输出**
 **输入：**采用文件形式输入图的节点数，弧的数目，用三元组的形式输入弧的两个节点以及权重。
 **输出：**通过输出链接生成树的节点的次序以及对应边的权重得到最小生成树。
**6.3．关键数据结构与算法描述**
 **关键数据结构**：无向图的数据结构，closedge数组的数据结构。具体如下：





```c
/***********************************************/
typedef struct network
{
    int n;                //实际节点数
    int arcnum;           //弧的数目
    double w[MAXSIZE][MAXSIZE];//权重
}Network;//构建带有权重的网络图结构
typedef  struct
{
    double lowcost; //节点的最小权重域
    int      vex;   //节点的对应顶点位置
} CD_TP;     
 /***********************************************/
```



**算法描述：**
  Prim算法的原理为构建closedge数组，每个节点有两个域，分别为对应于生成树的最小权重的节点域以及该节点和最小生成树对应的最小权重数lowcost。通过n-1次遍历，每次遍历都要加入一个与已有节点相邻的最小顶点，然后更新剩余节点的与最小生成树对应的最小权重，以便进行下次遍历，经过n-1次遍历之后得到n-1个与初始顶点相关的节点，同时也就是得到了n-1条弧，构成n个节点的最小生成树。具体算法如下：





```c
/****************************************************/
for(i=0; i<G.n; i++)   //从k号顶点出发
   {
       closedge[i].vex=k;
       closedge[i].lowcost=G.w[k][i]; //定第k行，按行遍历
   }     
   cout<<"生成树按照从第"<<k+1<<"节点依次连接的节点为"<<endl;
   closedge[k].lowcost=0; //使第k行的权重由无穷大变为0，加入生成树
   cout<<k+1;              //输出k号顶点，因从0开始
   for(m=0; m<G.n-1; m++)  //n-1趟循环
   {
       for(i=0; i<G.n; i++)
           if(closedge[i].lowcost>0)
               break;
        for(j=i+1; j<G.n; j++)
           if(closedge[j].lowcost>0&&
               closedge[j].lowcost<closedge[i].lowcost)
               i=j; //找到生成树外的最小权重作为添加对象

         cout<<","<<i+1; //输出i号顶点，因从0开始
         closedge[i].lowcost=0;//添加进入生成树
         for(j=0; j<G.n; j++)
           if(closedge[j].lowcost>0&&
              closedge[j].lowcost>G.w[i][j])         
           {
               closedge[j].lowcost=G.w[i][j]; //更新符合条件closedge的最小权重域
               closedge[j].vex=i;       //同时更新对应的节点关联到目前最小权重关联点i
           }            
    }  
     cout<<endl<<"该生成树有"<<G.n<<"个节点，"<<G.arcnum<<"条弧"<<endl;
     cout<<"生成树的"<<G.n-1<<"条边及其权重为："<<endl;
     for(i=0; i<G.n; i++)
     if(i!=k) //k为起始节点，与自身相隔无穷大
     {
         cout<<"("<<i+1<<","<<closedge[i].vex+1<<")";
         cout<<"-"<<G.w[i][closedge[i].vex]<<endl;//与上面两点对应
     }
     delete []closedge;
/****************************************************/
```

**6.4****．理论与测试**
 对下图，经过5次遍历即可得到最小生成树：
<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/algorithm/basic/mapsummary/1157683-20170521120228572-637011641.png')" alt="wxmp">

**测试：在文件中输入如下信息：**

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/algorithm/basic/mapsummary/1157683-20170521124200463-391642788.png')" alt="wxmp">

**从v1开始遍历运行程序得到：**

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/algorithm/basic/mapsummary/1157683-20170521124238853-241318369.png')" alt="wxmp">

**然后再构建一个无向图如下：**

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/algorithm/basic/mapsummary/1157683-20170521124304353-1358285874.png')" alt="wxmp">

**最小生成树如下：**

 <img class= "zoom-custom-imgs" :src="$withBase('/assets/img/algorithm/basic/mapsummary/1157683-20170521124325088-256499612.png')" alt="wxmp">

**在文件中输入如下：**

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/algorithm/basic/mapsummary/1157683-20170521124406322-1244943912.png')" alt="wxmp">

**运行后输出如下：**

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/algorithm/basic/mapsummary/1157683-20170521124425322-115294566.png')" alt="wxmp">

**6.5、附录（源代码）**





```c
 1 #include "iostream"
 2 #include "stdio.h"
 3 #include"stdlib.h"
 4 using namespace std;
 5 #define infinity 1000000//定义为无穷大
 6 #define MAXSIZE  100    //节点最大数
 7 typedef struct network
 8 {
 9     int n;                //实际节点数
10     int arcnum;           //弧的数目
11     double w[MAXSIZE][MAXSIZE];//权重
12 }Network;//构建带有权重的网络图结构
13 typedef  struct
14 {
15     double lowcost; //节点的最小权重域
16     int      vex;   //节点的对应顶点位置
17 } CD_TP;     
18 //初始化图       
19 void InitGraph(Network  &G)
20 {
21     FILE *fp;
22     int i,j;
23     int n;
24     int arcnum;
25     double weight;
26     if((fp=fopen("F:Network.txt","r"))==NULL)
27     {
28         printf("can't open the text!/n");
29         exit(0);
30     }
31     fscanf(fp,"%d%d",&n,&arcnum);
32      G.n=n;
33      G.arcnum=arcnum;
34     for(i=0; i<G.n; i++)
35         for(j=0; j<G.n; j++)
36          G.w[i][j] = infinity;//初始化为无穷大
37     
38     while(fscanf(fp,"%d%d%lf", &i, &j, &weight)!=EOF)
39     {
40      G.w[i-1][j-1] = weight;//依次读入权重
41      G.w[j-1][i-1] = weight;//构建无向图
42     }
43     fclose(fp); //关闭文件
44 }
45 void  prim(Network &G, int k)   //从顶点vk出发
46 {
47     CD_TP *closedge=new CD_TP[G.n];
48    //初始化closedge
49     int i,j,m;
50    for(i=0; i<G.n; i++)   //从k号顶点出发
51    {
52        closedge[i].vex=k;
53        closedge[i].lowcost=G.w[k][i]; //定第k行，按行遍历
54    }     
55    cout<<"生成树按照从第"<<k+1<<"节点依次连接的节点为"<<endl;
56    closedge[k].lowcost=0; //使第k行的权重由无穷大变为0，加入生成树
57    cout<<k+1;              //输出k号顶点，因从0开始
58    for(m=0; m<G.n-1; m++)  //n-1趟循环
59    {
60        for(i=0; i<G.n; i++)
61            if(closedge[i].lowcost>0)
62                break;
63         for(j=i+1; j<G.n; j++)
64            if(closedge[j].lowcost>0&&
65                closedge[j].lowcost<closedge[i].lowcost)
66                i=j; //找到生成树外的最小权重作为添加对象
67 
68          cout<<","<<i+1; //输出i号顶点，因从0开始
69          closedge[i].lowcost=0;//添加进入生成树
70          for(j=0; j<G.n; j++)
71            if(closedge[j].lowcost>0&&
72               closedge[j].lowcost>G.w[i][j])         
73            {
74                closedge[j].lowcost=G.w[i][j]; //更新符合条件closedge的最小权重域
75                closedge[j].vex=i;         //同时更新对应的节点关联到目前最小权重关联点i
76            }            
77     }  
78      cout<<endl<<"该生成树有"<<G.n<<"个节点，"<<G.arcnum<<"条弧"<<endl;
79      cout<<"生成树的"<<G.n-1<<"条边及其权重为："<<endl;
80      for(i=0; i<G.n; i++)
81      if(i!=k) //k为起始节点，与自身相隔无穷大
82      {
83          cout<<"("<<i+1<<","<<closedge[i].vex+1<<")";
84          cout<<"-"<<G.w[i][closedge[i].vex]<<endl;//与上面两点对应
85      }
86      delete []closedge;
87 }
88 void MainMenu()
89 {
90     Network G;
91     InitGraph(G);
92     prim(G, 2);
93 }
94 int main()
95 {
96     MainMenu();
97     return 0;
98 }
```



## **七、dijkstra算法实验 **

**7.1．实验内容**
  用dijkstra算法求有向图或无向图最短路径。
**7.2．输入与输出**
 **输入：**用字符文件输入图的顶点数，弧数，以及三元组的包含下标和权重的邻接矩阵。
 **输出：**从某个源点出发所得到的到其他节点的最短路径。
**7.3．关键数据结构与算法描述**
 **关键数据结构：**图的邻接矩阵结构，具体如下：





```c
/************************************************/
typedef struct network
{
    int n;           //实际顶点数
    int arcnum;      //实际弧的数目
    NetType G_Type;  //图的类型，有向图/无向图
    int arcs[MX][MX];//邻接矩阵
}Network;//构建图的邻接矩阵用来存储权重
/***********************************************/
```



 **算法描述：**
  Dijkstra算法是计算源点到其他节点的最短路径的算法。要明白算法的核心，就要深刻理解DIST数组的作用，path二维数组的含义和final数组的标志。Dist数组存储的是每一次遍历后从源点到DIST下标各点的最短路径，若无路径则是无穷大。Path数组中path[i][j]为真表示从j到i是连通的当然可以间接连通。final[i]为1的时侯表示源点到顶点i已经找到最短路径。   
 **算法的核心就是经过G.n-1次循环刷新dist，path和final数组从而得到源点到各点的最短路径长度和路径走法。**
 1.首先dist数组承接源点到各点的路径长度，path数组初始化为false。final初始化为0；
 2.然后开始进行G.n-1次遍历找到源点到其他各点的最短路径：从源点开始找到DIST数组之中对应final不为1的所有元素中的最小值，将该最小值对应的顶点作为“相对源点”（从该顶点开始搜索），其final值标记为1.每次当final[i]为假的时候如果“相对源点”对应的dist数值加上“相对顶点”到新顶点权重值（相对顶点和新顶点是邻接关系）小于新顶点原来的dist值，则更新该dist[新顶点]的值。同时记录从源点到该点的路径，即在path数组中建立相应连接关系。以后的遍历都是找到“相对源点”然后重复上步做法。直至遍历结束。
 3.最后按照path数组和源点的对应关系就可打印出所有路径以及各路径的最短距离。
**以下是dijkstra算法的核心部分：**





```c
 1 /**********************************************************/
 2 void ShorttestPath_DIJ(Network &G,int v,path &p,Dist &dist)   
 3 {   
 4     int w,nv;   
 5     for(nv=0;nv<G.n;nv++)   
 6     {   
 7       final[nv]=0;   //初始化为0表示没有找到最短路径
 8       dist[nv]=G.arcs[v][nv];//将顶点v与其他节点的权重值赋给dist数组   
 9       ps[nv]=dist[nv];   //同时ps数组中备份一份
10       for(w=0;w<G.n;w++)
11           p[nv][w]=false;  //初始化所有路径都不通
12       if(dist[nv]<MX)      
13       {   
14           p[nv][v]=true;     //为dist数组中有意义的权重加上路径相通(v->nv)  
15           p[nv][nv]=true;    //同时自身也相通，为以后的延续路径做准备
16       }     
17     }  //end for
18 
19     dist[v]=0;         //该节点肯定不需遍历且路径长度为0
20     final[v]=1;        //标记该节点
21     int min;        //最小值判断未找到最短路径中的最短路径
22     //开始主循环   
23     for(int i=1;i<G.n;++i)   //G.n-1次循环，找到对应的最短路径
24     {   
25         min=MX;    
26         for(w=0;w<G.n;++w)   
27         {   
28             if(final[w]==0)   //若待进行操作
29             {   
30               if(dist[w]<min)   
31               {   
32                  v=w;       //则找到其中的最短路径，且改变开始节点
33                  min=dist[w];  //最小值为待计算路径最小值
34               }   
35             }   
36                 
37         }   
38             final[v]=1; //变换之后的v也已完成，需标记  
39             for(w=0;w<G.n;w++)   
40             {   //若该节点未找到最短路径并且满足如下条件则更新dist数组
41                 if(final[w]==0&&(min+G.arcs[v][w])<dist[w])   
42                 {   
43                     dist[w]=min+G.arcs[v][w];   //更新dist
44                     ps[w]=ps[v]+G.arcs[v][w]; //更新附带最短路径记录
45                      for(int pos=0;pos<G.n;pos++)   
46                      {
47                         //注意此处是最重要的构建顶点连接和传递的语句
48                        p[w][pos]=p[v][pos];//v能到达的，新的w必定能到达
49                      }   
50                      p[w][w]=true;//自身也要标记，为了p[w][pos]=p[v][pos]能传递下去   
51                 }  
52                 
53             }  //end for     
54     }  //end for     
55 }  
56 /***************************************************/
57 以下是打印最短路径的算法：
58 /***************************************************/
59 void DIJ_Print(Network &G,int start,path &P)   
60 {   
61    for(int i=1;i<G.n;i++) //最多打印G.n-1条  
62    {    
63         if(final[i]==1&&ps[i]!=INFINITY)   //已找到最短路径，则打印
64         {   
65           cout<<"距离为:"<<ps[i]<<"\t";   
66           cout<<start;   
67           int m=start; //从起始顶点开始链接  
68           for(int j=1;j<G.n;j++)   
69           {   
70               if( P[i][j]==true)  //若有从j到i点的路径   
71               {   
72                   if(G.arcs[m][j]>0 && G.arcs[m][j]<INFINITY)    
73                   {   
74                       cout<<"->"<<j;   
75                       m=j; //更新起始节点为当前输出节点  
76                       j=1; //重新开始遍历  
77                   }         
78               }   
79           } //end for  
80           cout<<endl;   
81         }  //end if
82    }// end for  
83 }   
84 /***************************************************/
```



**7.4.测试与理论**
 理论：给定一个有向图就可以得到源点到各点的最短路径（当然除了从源点到不能连通的点）。
**1.在文件中输入如下数据构建邻接矩阵**
<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/algorithm/basic/mapsummary/1157683-20170521125200275-1556760062.png')" alt="wxmp">

**2.****如下为一有向图**

**<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/algorithm/basic/mapsummary/1157683-20170521125226072-1517559473.png')" alt="wxmp">**

**对其将v0作为源点开始查找最短路径可得：**
**V0~v2 最短路径为：v0-v2，长度为:10**
**V0~v3 最短路径为:v0-v4-v3,长度为：50**
**V0~v4 最短路径为：v0-v4，长度为：30**
**V0~v5 最短路径为：v0-v4-v3-v5,长度为：60**
**其他的同理暂不赘述。**
**测试：**
**运行程序后为：**
<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/algorithm/basic/mapsummary/1157683-20170521125300916-1647830596.png')" alt="wxmp">

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/algorithm/basic/mapsummary/1157683-20170521125311260-45304041.png')" alt="wxmp">

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/algorithm/basic/mapsummary/1157683-20170521125326010-239411027.png')" alt="wxmp">

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/algorithm/basic/mapsummary/1157683-20170521125346072-1506596754.png')" alt="wxmp">

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/algorithm/basic/mapsummary/1157683-20170521125357775-48705214.png')" alt="wxmp">

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/algorithm/basic/mapsummary/1157683-20170521125409260-1658975918.png')" alt="wxmp">

**注意从****v5****出发不能到达任何一点，故无最短路径。**

**可见该算法是正确可行的。**

**7.5、附录（源代码）**





```c
  1 #include "iostream"   
  2 using namespace std;  
  3 #define MX     100          //数组长度最大值
  4 #define INFINITY  100000    //无穷大
  5 typedef bool    path[MX][MX];   
  6 typedef int Dist[MX];//v0到vi的的距离   
  7 int ps[MX]={0}; //最短路径值
  8 int final[MX];//final[i]=1代表已经求出v0到vi的最短路径
  9 typedef enum
 10 {
 11     DG,UDG
 12 }NetType;
 13 typedef struct network
 14 {
 15     int n;           //实际顶点数
 16     int arcnum;      //实际弧的数目
 17     NetType G_Type;  //图的类型，有向图/无向图
 18     int arcs[MX][MX];//邻接矩阵
 19 }Network;//构建图的邻接矩阵用来存储权重
 20 /***************图的初始化****************/
 21 void InitGraph(Network  &G)
 22 {
 23     FILE *fp;
 24     int i,j;
 25     int n;
 26     int arcnum;
 27     int weight;
 28     if((fp=fopen("F:dist.txt","r"))==NULL)
 29     {
 30         printf("can't open the text!/n");
 31         exit(0);
 32     }
 33     fscanf(fp,"%d%d",&n,&arcnum);
 34      G.n=n;
 35      G.arcnum=arcnum;
 36     
 37     for(i=0; i<G.n; i++)
 38         for(j=0; j<G.n; j++)
 39          G.arcs[i][j] = INFINITY;//初始化为无穷大
 40     while(fscanf(fp,"%d%d%d", &i, &j, &weight)!=EOF)
 41     {
 42      G.arcs[i][j] = weight;//依次读入权重
 43     }
 44     fclose(fp); //关闭文件
 45 }
 46 /*=====================================================*/  
 47 void ShorttestPath_DIJ(Network &G,int v,path &p,Dist &dist)   
 48 {   
 49     int w,nv;   
 50     for(nv=0;nv<G.n;nv++)   
 51     {   
 52       final[nv]=0;   //初始化为0表示没有找到最短路径
 53       dist[nv]=G.arcs[v][nv];//将顶点v与其他节点的权重值赋给dist数组   
 54       ps[nv]=dist[nv];   //同时ps数组中备份一份
 55       for(w=0;w<G.n;w++)
 56           p[nv][w]=false;  //初始化所有路径都不通
 57       if(dist[nv]<MX)      
 58       {   
 59           p[nv][v]=true;     //为dist数组中有意义的权重加上路径相通(v->nv)  
 60           p[nv][nv]=true;    //同时自身也相通，为以后的延续路径做准备
 61       }     
 62     }  //end for
 63 
 64     dist[v]=0;         //该节点肯定不需遍历且路径长度为0
 65     final[v]=1;        //标记该节点
 66     int min;        //最小值判断未找到最短路径中的最短路径
 67     //开始主循环   
 68     for(int i=1;i<G.n;++i)   //G.n-1次循环，找到对应的最短路径
 69     {   
 70         min=MX;    
 71         for(w=0;w<G.n;++w)   
 72         {   
 73             if(final[w]==0)   //若待进行操作
 74             {   
 75               if(dist[w]<min)   
 76               {   
 77                  v=w;       //则找到其中的最短路径，且改变开始节点
 78                  min=dist[w];  //最小值为待计算路径最小值
 79               }   
 80             }   
 81                 
 82         }   
 83             final[v]=1; //变换之后的v也已完成，需标记  
 84             for(w=0;w<G.n;w++)   
 85             {   //若该节点未找到最短路径并且满足如下条件则更新dist数组
 86                 if(final[w]==0&&(min+G.arcs[v][w])<dist[w])   
 87                 {   
 88                     dist[w]=min+G.arcs[v][w];   //更新dist
 89                     ps[w]=ps[v]+G.arcs[v][w]; //更新附带最短路径记录
 90                      for(int pos=0;pos<G.n;pos++)   
 91                      {
 92                         //注意此处是最重要的构建顶点连接和传递的语句
 93                        p[w][pos]=p[v][pos];//v能到达的，新的w必定能到达
 94                      }   
 95                      p[w][w]=true;//自身也要标记，为了p[w][pos]=p[v][pos]能传递下去   
 96                 }  
 97                 
 98             }  //end for     
 99     }  //end for     
100 }  
101 /*********************************打印路径****************************/
102 void DIJ_Print(Network &G,int start,path &P)   
103 {   
104    for(int i=1;i<G.n;i++) //最多打印G.n-1条  
105    {    
106         if(final[i]==1&&ps[i]!=INFINITY)   //已找到最短路径，则打印
107         {   
108           cout<<"距离为:"<<ps[i]<<"\t";   
109           cout<<start;   
110           int m=start; //从起始顶点开始链接  
111           for(int j=1;j<G.n;j++)   
112           {   
113               if( P[i][j]==true)  //若有从j到i点的路径   
114               {   
115                   if(G.arcs[m][j]>0 && G.arcs[m][j]<INFINITY)    
116                   {   
117                       cout<<"->"<<j;   
118                       m=j; //更新起始节点为当前输出节点  
119                       j=1; //重新开始遍历  
120                   }         
121               }   
122           } //end for  
123           cout<<endl;   
124         }  //end if
125    }// end for  
126 }   
127 /*******************算法控制中心**********************/
128 void ShortestPath(Network &G)   
129 {   
130     int start;     
131     Dist D;       //D[i]表示从start到i的最短距离；   
132     path P;       //P[i,j]表示从start到i的最短路径上会经过j   
133    
134     cout << "输入出发点(0~"<<G.n-1<<")" << endl;   
135     cin >> start;   
136     if(start>=0 && start<G.n)   
137     {   
138        //调用迪杰斯特拉算法   
139       ShorttestPath_DIJ(G,start,P,D);   
140       cout <<"从"<< start;   
141       cout << "到其他各点的最短路径长度 ："<<endl ;   
142       //调用迪杰斯特拉打印算法   
143        DIJ_Print(G,start,P);   
144     }//endif   
145     else  
146         cout << "没有这个地方！" << endl;   
147 }   
148 void MainMenu()
149 {
150     Network G;
151     InitGraph(G);
152     char choose;   
153     cout << "************************" << endl;   
154     cout << "    a.计算最短路径        " << endl;   
155     cout << "    b.退        出        " << endl;     
156     cout << "************************" << endl;   
157     cin >> choose;   
158     while(1)   
159     {   
160         if( choose=='a' )   
161         {   
162            ShortestPath(G);   
163            cout << "************************" << endl;   
164            cout << "    a.计算最短路径        " << endl;   
165            cout << "    b.退        出        " << endl;     
166            cout << "************************" << endl;   
167         }   
168         else  if(choose=='b')
169         {
170             exit(0);
171         }
172         else  cout << "输入错误，请重新输入:"<<endl;   
173         cin >> choose;   
174     }   
175 }
176 int main()   
177 {
178     MainMenu();
179     return 0;   
180 }  
```



## 八、总结

 在这一块中，讲了很多东西，这些东西都是和图这个数据结构相关的，图是一种非常重要的数据结构，对图的掌握可以让我们更好的认识和理解网络、城市等大型的拓扑结构，对于图的一些算法也是非常的精妙和有趣的，有着很强的实用价值。



## 参考文章
* https://www.cnblogs.com/zyrblog/p/6884416.html