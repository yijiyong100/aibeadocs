---
title: 图-遍历广度优先(BFS)
---

::: tip
本文主要是介绍 图-遍历广度优先(BFS) 。
:::

[[toc]]


## 图的遍历

图的遍历是和数的遍历类似，我们希望从图中某一顶点出发访遍图中其余顶点，且使每一个顶点仅被访问一次，这一过程就叫做图的遍历（Traversing Graph）。

树的遍历，毕竟根结点只有一个，遍历都是从根结点开始的。可图就复杂多了，因为它的任一顶点都可能和其余的所有顶点相邻接，极有可能存在沿着某条路径搜索后，又回到原点，而有些顶点确还没遍历到的情况。因此我们需要在遍历过程中把访问的顶点打上标记，以避免访问多次而不自知，具体办法是设置一个访问数组visited[n]，n是图中顶点个数，初值为0，访问过后设置为1。

对于图的遍历来说，如何避免因回路陷入死循环，就需要科学地设计遍历方案，通常有两种遍历次序方案：它们是深度广度优先遍历和深度优先遍历。


### 广度优先遍历

广度优先遍历（Breadth_First_Search），又称为广度优先搜索，简称BFS。继续用上面深度优先遍历的例子。通过这个例子来说明广度优先遍历的过程原理。我们首先将图变形为下面：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/algorithm/basic/mapbasic/20190507153539858.png')" alt="wxmp">

实际上图中各个顶点和边的关系并没有发生变化，只是可以更直观的看整个过程。

首先，先将A点入队，A点访问过了，队列不为空，将A出队，然后将A未访问的邻接点B、F入队。此时队还不为空，将B出队，然后将B的未访问的邻接点C、I、G入队。队仍然不为空，将F出队，再将F的未访问邻接点E入队。队依然不为空，将C出队，然后把C的未访问的邻接点D入队。队依然不为空，将I出队，I没有未被访问的邻接点。此时队仍然不为空，将G出队，再将G的未访问邻接点H入队。然后队不为空E出队，E没有未被访问的邻接点。然后队依然不为空D出队，D没有未被访问的邻接点。然后队不为空H出队，H没有未被访问的邻接点。最后队为空。结束。

### 示意图
具体过程如下图：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/algorithm/basic/mapbasic/20190507154825213.png')" alt="wxmp">

### 源代码参考
广度优先遍历代码如下：

```cpp
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
typedef struct _SqQueue
{
	VertexType data[MAXVEX];
	int head;					//队尾指针
	int rear;					//队尾指针
}SqQueue;


bool EnQueue(SqQueue *s1,VertexType v)
{
	if (s1->rear == MAXVEX)
	{
		return false;
	}
	s1->data[++s1->rear] = v;
	return true;
}

bool DeQueue(SqQueue *s1,VertexType *v)
{
	if (s1->rear == s1->head)
	{
		return false;
	}
	*v = s1->data[s1->rear];
	--s1->rear;
	return true;
}


bool EmptyQueue(SqQueue *s1)
{
	return (s1->head == s1->rear ? true : false);
}

int visited[MAXVEX];

void BFSTraverse(MGraph g)
{
	SqQueue s1;		//定义一个队列
	VertexType t;
	for (int i = 0; i < g.NumVexs; i++)		//先将访问数组中的元素全部设置为未访问过。
	{
		visited[i] = false;
	}
	for (int i = 0; i < g.NumVexs; i++)		//
	{
		if (!visited[i])					//如果结点i未被访问过
		{
			visited[i] = true;
			printf("%c", g.vexs[i]);		//打印i结点
			EnQueue(&s1, g.vexs[i]);		//将i结点入队
			while (EmptyQueue(&s1));		//若队列不为空
			{
				DeQueue(&s1,&t);			//将i出队，i赋给t变量
				for (int j = 0; j < g.NumVexs; j++)					//此循环，将i的所有未被访问的邻接点访问并且入队
				{
					if (g.arc[i][j] == 1 && visited[j] == false)	//如果i结点的邻接点j未被访问
					{
						visited[j] = true;							//访问j结点
						printf("%c",g.vexs[i]);						//打印j结点
						EnQueue(&s1,g.vexs[j]);						//将j结点入队
					}
				}
			}
		}
	}
}
```



## 参考文章
* https://blog.csdn.net/weixin_43977523/article/details/89402161