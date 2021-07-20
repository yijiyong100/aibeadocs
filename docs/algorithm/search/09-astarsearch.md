---
title: 常用搜索算法-A*查找
---

::: tip
本文主要是介绍 常用搜索算法-A*查找 。
:::

[[toc]]


## A*搜索算法

A*搜索算法是最短路径问题中另一个非常经典的算法。A*算法常用于游戏中的NPC的移动计算，或网络游戏的BOT的移动计算上。

A*搜寻算法，俗称A星算法，作为启发式搜索算法中的一种，这是一种在图形平面上，有多个节点的路径，求出最低通过成本的算法。常用于游戏中的NPC的移动计算，或线上游戏的BOT的移动计算上。该算法像Dijkstra算法一样，可以找到一条最短路径；也像BFS一样，进行启发式的搜索。

该算法综合了Best-First Search和Dijkstra算法的优点：**在进行启发式搜索提高算法效率的同时，可以保证找到一条最优路径（基于评估函数）。**

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/algorithm/search/comm8/1187314-20180317181821691-617556157.png')" alt="wxmp">

下面举例说明这个算法的过程，举例用的网络如下，从S - > G：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/algorithm/search/comm8/1187314-20180317182610104-1625335187.png')" alt="wxmp">

### 方法一、仅采用积累距离

**算法流程：**

> ​               Get the end，break
>
> 　　　　　　　　　　|
>
> Initial Queue --> Test First Path --> Extend First Path ， sorted by ACC
>
> 　　　　　　　　　　|——————————|

 <img class= "zoom-custom-imgs" :src="$withBase('/assets/img/algorithm/search/comm8/1187314-20180317183714644-892267073.png')" alt="wxmp">

由于我每次都扩展的最小的积累距离值，所以第取出G的时候，就是G为最短路确定的时候，因为任何其他的路都比S - ›G长，而且日后也不可能更短。

其实这就是Dijkstra算法。当然在这里，我做了很多无效的extend，如果维护一个extend表，那么效率将会有很大的提升。

### 方法二、启发式距离 + 扩展列表

上面的Dijkstra方法不好的地方是很明显的，这种方法没有方向性，是一种发散式的搜索，事实上，运行一遍Dijkstra可以将源点到其他所有点的最短路径求出来。

然而，在很多问题中，我们并不需要源点到其他结点的距离信息，我们只关系源点到目的地的最短路径，这时候就可以使用启发式的距离，来让路径的生成变得有方向性。

具体做法就是将上面的选择过程中积累长度变成积累长度 + 启发式距离。

在找到一条路径后还需向下探查，直到其他路都绝无可能为止。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/algorithm/search/comm8/1187314-20180317185250470-1524723308.png')" alt="wxmp">

另外，这里加上了扩展列表，也就是已经扩展过的不会再继续扩展，这就是A*算法的思路。

A* = 分支限界 + 扩展列表 + 可容许启发式路径。

``` py
function A*(start,goal)
    closedset := the empty set                 //已经被估算的节点集合
    openset := set containing the initial node //将要被估算的节点集合，初始只包含start
    came_from := empty map
    g_score[start] := 0                        //g(n)
    h_score[start] := heuristic_estimate_of_distance(start, goal)    //通过估计函数 估计h(start)
    f_score[start] := h_score[start]            //f(n)=h(n)+g(n)，由于g(n)=0，所以省略
    while openset is not empty                 //当将被估算的节点存在时，执行循环
        x := the node in openset having the lowest f_score[] value   //在将被估计的集合中找到f(x)最小的节点
        if x = goal            //若x为终点，执行
            return reconstruct_path(came_from,goal)   //返回到x的最佳路径
        remove x from openset      //将x节点从将被估算的节点中删除
        add x to closedset      //将x节点插入已经被估算的节点
        for each y in neighbor_nodes(x)  //循环遍历与x相邻节点
            if y in closedset           //若y已被估值，跳过
                continue
            tentative_g_score := g_score[x] + dist_between(x,y)    //从起点到节点y的距离
 
            if y not in openset          //若y不是将被估算的节点
                add y to openset         //将y插入将被估算的节点中
                tentative_is_better := true     //暂时判断为更好
            elseif tentative_g_score < g_score[y]         //如果起点到y的距离小于y的实际距离
                tentative_is_better := true         //暂时判断为更好
            else
                tentative_is_better := false           //否则判断为更差
            if tentative_is_better = true            //如果判断为更好
                came_from[y] := x                  //将y设为x的子节点
                g_score[y] := tentative_g_score    //更新y到原点的距离
                h_score[y] := heuristic_estimate_of_distance(y, goal) //估计y到终点的距离
                f_score[y] := g_score[y] + h_score[y]
    return failure
 
function reconstruct_path(came_from,current_node)
    if came_from[current_node] is set
        p = reconstruct_path(came_from,came_from[current_node])
        return (p + current_node)
    else
        return current_node
```




## 参考文章
* http://www.cnblogs.com/maybe2030/
* https://www.cnblogs.com/magic-sea/tag/%E5%B8%B8%E8%A7%81%E7%9A%84%E6%9F%A5%E6%89%BE%E7%AE%97%E6%B3%95/
* https://www.cnblogs.com/hyserendipity/p/8591949.html