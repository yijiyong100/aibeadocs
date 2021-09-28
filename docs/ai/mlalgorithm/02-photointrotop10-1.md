---
title: 机器学习算法-图解说明(上)
---

::: tip
本文主要是介绍 机器学习算法-图解说明(上) 。
:::

[[toc]]

## 人工智能常用的十种算法（上）

## 1. 决策树
根据一些 feature 进行分类，每个节点提一个问题，通过判断，将数据分为两类，再继续提问。这些问题是根据已有数据学习出来的，再投入新数据的时候，就可以根据这棵树上的问题，将数据划分到合适的叶子上。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ai/mlalgorithm/photointro1/1363609-20190528161344920-11710147.jpg')" alt="wxmp">

如果你觉得这篇文章看起来稍微还有些吃力，或者想要更系统地学习人工智能，那么推荐你去看床长人工智能教程。非常棒的大神之作，教程不仅通俗易懂，而且很风趣幽默。点击这里可以查看教程。

## 2. 随机森林
[视频](https://www.youtube.com/watch?v=loNcrMjYh64)

在源数据中随机选取数据，组成几个子集


<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ai/mlalgorithm/photointro1/1363609-20190528161519623-1069882826.jpg')" alt="wxmp">

S 矩阵是源数据，有 1-N 条数据，A B C 是feature，最后一列C是类别

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ai/mlalgorithm/photointro1/1363609-20190528161526303-329040502.jpg')" alt="wxmp">

由 S 随机生成 M 个子矩阵

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ai/mlalgorithm/photointro1/1363609-20190528161545135-1012680863.jpg')" alt="wxmp">

这 M 个子集得到 M 个决策树

将新数据投入到这 M 个树中，得到 M 个分类结果，计数看预测成哪一类的数目最多，就将此类别作为最后的预测结果

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ai/mlalgorithm/photointro1/1363609-20190528161603107-1456818904.jpg')" alt="wxmp">

## 3. 逻辑回归
[视频](https://www.youtube.com/watch?v=gNhogKJ_q7U)

当预测目标是概率这样的，值域需要满足大于等于0，小于等于1的，这个时候单纯的线性模型是做不到的，因为在定义域不在某个范围之内时，值域也超出了规定区间。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ai/mlalgorithm/photointro1/1363609-20190528161635148-1079833422.jpg')" alt="wxmp">

所以此时需要这样的形状的模型会比较好

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ai/mlalgorithm/photointro1/1363609-20190528161645702-1813796884.jpg')" alt="wxmp">

那么怎么得到这样的模型呢？

这个模型需要满足两个条件 大于等于0，小于等于1
大于等于0 的模型可以选择 绝对值，平方值，这里用 指数函数，一定大于0
小于等于1 用除法，分子是自己，分母是自身加上1，那一定是小于1的了

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ai/mlalgorithm/photointro1/1363609-20190528161657605-462895388.jpg')" alt="wxmp">

再做一下变形，就得到了 logistic regression 模型

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ai/mlalgorithm/photointro1/1363609-20190528161710593-1568185846.jpg')" alt="wxmp">

通过源数据计算可以得到相应的系数了

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ai/mlalgorithm/photointro1/1363609-20190528161727774-1969347603.jpg')" alt="wxmp">

最后得到 logistic 的图形

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ai/mlalgorithm/photointro1/1363609-20190528161735813-1953677485.jpg')" alt="wxmp">

## 4. SVM
[视频](https://www.youtube.com/watch?v=1NxnPkZM9bc)

support vector machine

要将两类分开，想要得到一个超平面，最优的超平面是到两类的 margin 达到最大，margin就是超平面与离它最近一点的距离，如下图，Z2>Z1，所以绿色的超平面比较好

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ai/mlalgorithm/photointro1/1363609-20190528161934511-754481520.jpg')" alt="wxmp">

将这个超平面表示成一个线性方程，在线上方的一类，都大于等于1，另一类小于等于－1

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ai/mlalgorithm/photointro1/1363609-20190528162007797-187312423.jpg')" alt="wxmp">

点到面的距离根据图中的公式计算

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ai/mlalgorithm/photointro1/1363609-20190528162018596-820645908.jpg')" alt="wxmp">

所以得到 total margin 的表达式如下，目标是最大化这个 margin，就需要最小化分母，于是变成了一个优化问题

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ai/mlalgorithm/photointro1/1363609-20190528162025778-1858930614.jpg')" alt="wxmp">

举个栗子，三个点，找到最优的超平面，定义了 weight vector＝（2，3）－（1，1）

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ai/mlalgorithm/photointro1/1363609-20190528162033763-1619049275.jpg')" alt="wxmp">

得到 weight vector 为（a，2a），将两个点代入方程，代入（2，3）另其值＝1，代入（1，1）另其值＝-1，求解出 a 和 截矩 w0 的值，进而得到超平面的表达式。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ai/mlalgorithm/photointro1/1363609-20190528162040912-621430750.jpg')" alt="wxmp">

a 求出来后，代入（a，2a）得到的就是 support vector

a 和 w0 代入超平面的方程就是 support vector machine

转载：https://blog.csdn.net/qq_45067177/article/details/90411885 

## 参考文章
* https://www.cnblogs.com/nangua19/p/10938152.html