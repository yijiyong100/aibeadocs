---
title: 机器学习算法-图解说明(下)
---

::: tip
本文主要是介绍 机器学习算法-图解说明(下) 。
:::

[[toc]]

## 人工智能的常用十种算法（下）

## 5. 朴素贝叶斯
[视频](https://www.youtube.com/watch?v=TpjPzKODuXo)

举个在 NLP 的应用

给一段文字，返回情感分类，这段文字的态度是positive，还是negative

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ai/mlalgorithm/photointro2/1363609-20190528162715002-1025526072.jpg')" alt="wxmp">

为了解决这个问题，可以只看其中的一些单词

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ai/mlalgorithm/photointro2/1363609-20190528162722246-1851754391.jpg')" alt="wxmp">

这段文字，将仅由一些单词和它们的计数代表

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ai/mlalgorithm/photointro2/1363609-20190528162728179-7557497.jpg')" alt="wxmp">

原始问题是：给你一句话，它属于哪一类

通过 bayes rules 变成一个比较简单容易求得的问题

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ai/mlalgorithm/photointro2/1363609-20190528162734966-2062642184.jpg')" alt="wxmp">

问题变成，这一类中这句话出现的概率是多少，当然，别忘了公式里的另外两个概率

栗子：单词 love 在 positive 的情况下出现的概率是 0.1，在 negative 的情况下出现的概率是 0.001

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ai/mlalgorithm/photointro2/1363609-20190528162743044-123878169.jpg')" alt="wxmp">

## 6. K最近邻
[视频](https://www.youtube.com/watch?v=zHbxbb2ye3E)

k nearest neighbours

给一个新的数据时，离它最近的 k 个点中，哪个类别多，这个数据就属于哪一类

栗子：要区分 猫 和 狗，通过 claws 和 sound 两个feature来判断的话，圆形和三角形是已知分类的了，那么这个 star 代表的是哪一类呢

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ai/mlalgorithm/photointro2/1363609-20190528162904314-94014037.jpg')" alt="wxmp">

k＝3时，这三条线链接的点就是最近的三个点，那么圆形多一些，所以这个star就是属于猫

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ai/mlalgorithm/photointro2/1363609-20190528162915550-169986647.jpg')" alt="wxmp">

## 7. K均值
[视频](https://www.youtube.com/watch?v=zHbxbb2ye3E)

想要将一组数据，分为三类，粉色数值大，黄色数值小
最开心先初始化，这里面选了最简单的 3，2，1 作为各类的初始值
剩下的数据里，每个都与三个初始值计算距离，然后归类到离它最近的初始值所在类别

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ai/mlalgorithm/photointro2/1363609-20190528162938381-2040032560.jpg')" alt="wxmp">

分好类后，计算每一类的平均值，作为新一轮的中心点

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ai/mlalgorithm/photointro2/1363609-20190528162943395-1058934206.jpg')" alt="wxmp">

几轮之后，分组不再变化了，就可以停止了

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ai/mlalgorithm/photointro2/1363609-20190528162954972-1619349820.jpg')" alt="wxmp">

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ai/mlalgorithm/photointro2/1363609-20190528163007861-424331964.jpg')" alt="wxmp">

## 8. Adaboost
[视频](https://www.youtube.com/watch?v=rz9dnmHmZsY)

adaboost 是 bosting 的方法之一

bosting就是把若干个分类效果并不好的分类器综合起来考虑，会得到一个效果比较好的分类器。

下图，左右两个决策树，单个看是效果不怎么好的，但是把同样的数据投入进去，把两个结果加起来考虑，就会增加可信度

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ai/mlalgorithm/photointro2/1363609-20190528163037244-1651598459.jpg')" alt="wxmp">

adaboost 的栗子，手写识别中，在画板上可以抓取到很多 features，例如 始点的方向，始点和终点的距离等等

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ai/mlalgorithm/photointro2/1363609-20190528163045080-483096861.jpg')" alt="wxmp">

training 的时候，会得到每个 feature 的 weight，例如 2 和 3 的开头部分很像，这个 feature 对分类起到的作用很小，它的权重也就会较小

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ai/mlalgorithm/photointro2/1363609-20190528163051599-1266822533.jpg')" alt="wxmp">

而这个 alpha 角 就具有很强的识别性，这个 feature 的权重就会较大，最后的预测结果是综合考虑这些 feature 的结果

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ai/mlalgorithm/photointro2/1363609-20190528163058241-134085146.jpg')" alt="wxmp">

## 9. 神经网络
[视频](https://www.youtube.com/watch?v=P2HPcj8lRJE&index=2&list=PLjJh1vlSEYgvGod9wWiydumYl8hOXixNu)

Neural Networks 适合一个input可能落入至少两个类别里

NN 由若干层神经元，和它们之间的联系组成
第一层是 input 层，最后一层是 output 层

在 hidden 层 和 output 层都有自己的 classifier

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ai/mlalgorithm/photointro2/1363609-20190528163133677-1097737182.jpg')" alt="wxmp">

input 输入到网络中，被激活，计算的分数被传递到下一层，激活后面的神经层，最后output 层的节点上的分数代表属于各类的分数，下图例子得到分类结果为 class 1

同样的 input 被传输到不同的节点上，之所以会得到不同的结果是因为各自节点有不同的weights 和 bias

这也就是 forward propagation

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ai/mlalgorithm/photointro2/1363609-20190528163140474-1114143555.jpg')" alt="wxmp">

## 10. 马尔可夫
[视频](https://www.youtube.com/watch?v=56mGTszb_iM)

Markov Chains 由 state 和 transitions 组成

栗子，根据这一句话 ‘the quick brown fox jumps over the lazy dog’，要得到 markov chain

步骤，先给每一个单词设定成一个状态，然后计算状态间转换的概率

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ai/mlalgorithm/photointro2/1363609-20190528163158689-418140667.jpg')" alt="wxmp">

这是一句话计算出来的概率，当你用大量文本去做统计的时候，会得到更大的状态转移矩阵，例如 the 后面可以连接的单词，及相应的概率

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ai/mlalgorithm/photointro2/1363609-20190528163210591-2070060481.jpg')" alt="wxmp">

生活中，键盘输入法的备选结果也是一样的原理，模型会更高级

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ai/mlalgorithm/photointro2/1363609-20190528163226297-1553931628.jpg')" alt="wxmp">

转载：https://blog.csdn.net/qq_45067177/article/details/90411885

## 参考文章
* https://www.cnblogs.com/nangua19/p/10938223.html