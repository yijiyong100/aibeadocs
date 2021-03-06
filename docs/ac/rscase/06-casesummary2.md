---
title: 推荐系统-实战精华总结(二)
---

::: tip
本文主要是介绍 推荐系统-实战精华总结(二) 。
:::

[[toc]]

## 智能推荐算法演变及学习笔记（二）：基于图模型的智能推荐（含知识图谱/图神经网络）



【最后再说一下】本文只对智能推荐算法中的基于图模型的智能推荐进行具体介绍！

## 一、基于知识图谱的智能推荐

以知识图谱作为边信息生成推荐的价值在于：一方面可以提供更准确的推荐；另一方面可以对推荐结果进行解释。

知识图谱由实体和关系组成（以电影推荐为例）：实体（用户、电影、演员、导演和类型）；关系（交互、归属、表演、导演和友谊）。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ac/rscase/sum2/1998154-20200508141555806-1253384272.png')" alt="wxmp">



### 1. 基于embedding的方法

基本思想：将知识图谱中的节点和边在低维向量空间中得到嵌入表示（Knowledge Graph Embedding，KGE），利用知识图谱丰富item/user的表示。

#### 1.1 KGE算法分类

- 基于翻译距离的模型（例如TransE、TransH、TransR、TransD等）：追求h + r = t

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ac/rscase/sum2/1998154-20200508183208450-1133153849.png')" alt="wxmp">

- 基于语义匹配的模型（例如RESCAL、DistMult、HolE、SME、NTN、MLP、NAM等）：将h/r/t输入到网络中进行训练学习

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ac/rscase/sum2/1998154-20200508183235203-184219944.png')" alt="wxmp">

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ac/rscase/sum2/1998154-20200508183326450-109792724.png')" alt="wxmp">

#### 1.2 基于embedding的方法分类（根据知识图谱中是否包含user）

- 使用item graph（即知识图谱仅由item和相关feature构成）：代表方法有CKE、DKN、KSR等
  - 首先利用KGE算法生成item embedding；
  - 然后结合item的文本/视觉特征、user-item交互矩阵等信息构成完整的item表示；
  - 最后再单独计算user表示和得分函数。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ac/rscase/sum2/1998154-20200508160435065-781183888.png')" alt="wxmp">

- 使用user-item graph（即知识图谱由user、item和相关feature构成）：代表方法有CFKG、SHINE、DKFM等
  - 先用KGE算法将user和item嵌入到同一向量空间；
  - 再通过计算user和item的距离直接得到得分函数的值。
- 将KGE算法与GAN、贝叶斯框架结合：代表方法有KTGAN、BEM等
- 使用多任务学习策略联合训练推荐模块与其他任务：代表方法有KTUP、MKR、RCF等

基于embedding的方法忽略了图中的信息连通模式，通常**无法为推荐结果提供解释。**



### **2. 基于path的方法**

基本思想：将知识图谱视为一个异构信息网络（user-item），考虑到user、item的连通相似性（语义相似性/结构对等性），进而提升推荐效果。其中，连通相似性的定义依赖meta-path结构（meta-path是连接两个实体的一条特定的路径）。

#### 2.1 基于path的方法分类（根据对path的不同利用方式）

- 基于path计算连通相似度，并作为正则项优化user、item的表示。
  - path可以预先指定（代表方法有Hete-MF、Hete-CF、HeteRec、HeteRec-p、FMG、SemRec等）
  - path可以借助外部知识库学习得到（代表方法有RuleRec等）
- 将所有/部分可能的path嵌入到低维空间，与user、item的表示共同训练，并发现对推荐影响最显著的path（连接模式）。
  - 代表性方法有MCRec、RKGE、KPRN、PGPR等

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ac/rscase/sum2/1998154-20200508170757358-1032630896.png')" alt="wxmp">

　　　　用户Alice与部分物品在知识图谱的关联图示

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ac/rscase/sum2/1998154-20200508170411421-924998711.png')" alt="wxmp">

　　　　KPRN模型图示

基于path的方法有天生的可解释性，但早期的方法没有结合embedding的思想，对user/item的表示较为简单，准确性仍有提升空间。



### 3. 联合方法

基本思想：**利用嵌入传播（常使用GNN）**完善user、item在知识图谱中有多跳邻居的表示。其中，传播过程可以看作是在知识图谱中发现user的偏好模式，类似于在基于path的方法中发现连接模式。

#### 3.1 联合方法分类（根据知识图谱中是否包含user）

- 使用item graph
  - 基于user波纹集传播user偏好，模拟用户兴趣在知识图谱上的传播过程，提升user表示能力（代表方法有RippleNet、AKUPM等）
  - 基于K阶邻居（实体波纹集）传播item属性，丰富item表示（代表方法有KGCN等）
- 使用user-item graph
  - 考虑user和item的高阶交互，同时增强user和item的表示（代表方法有KGAT、KNI、IntentGC等）

联合方法结合了基于embedding和基于path的方法，兼具准确性和可解释性，逐渐成为知识图谱推荐算法的主流方法。

 <img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ac/rscase/sum2/1998154-20200508151451763-1666419326.png')" alt="wxmp">

 *在表格中，Emb代表基于嵌入的方法，Uni代表统一方法，Att’代表注意力机制，‘RL’代表强化学习，‘AE’代表自动编码器，‘MF’代表矩阵分解。



### 4. 结合知识图谱特征学习的推荐系统分类

前面三节是以核心技术的角度来分类，本节以训练学习的角度来分类。（分类角度不同而已，助于理解）

#### 4.1 依次训练学习（例如DKN等）

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ac/rscase/sum2/1998154-20200505014950556-75571680.png')" alt="wxmp">

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ac/rscase/sum2/1998154-20200508161811916-1431539709.png')" alt="wxmp">

#### 4.2 联合训练学习（例如CKE、Ripple Network等）

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ac/rscase/sum2/1998154-20200505014956969-349930527.png')" alt="wxmp">

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ac/rscase/sum2/1998154-20200508162216621-846360158.png')" alt="wxmp">

#### 4.3 交替训练学习（例如MKR等）

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ac/rscase/sum2/1998154-20200505015003217-1882400557.png')" alt="wxmp">

 <img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ac/rscase/sum2/1998154-20200508204549513-185803197.png')" alt="wxmp">

## 二、基于图网络的智能推荐（写完发现等于介绍了一遍图网络！）



### 1. 知识图谱表示学习KGE与图网络表示学习的异同点

- 知识图谱表示学习中常常提到的一个概念就是三元组（头实体，关系，尾实体），但图网络表示学习中没有这个概念，对所有结点是一视同仁的。
- 知识图谱表示学习强调节点之间的关系表示，图网络表示学习强调节点的结构表示。(后来引入path的知识图谱一定层面上是在考虑图网络的结构)
- 知识图谱表示学习方法和图网络表示学习方法都是受word2vec启发衍生出来的。
  - 知识图谱表示学习启发于word2vec向量之间存在的关联性
  - 图网络表示学习启发于word2vec由中心词预测上下文的文本处理方式

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ac/rscase/sum2/1998154-20200508163226512-780813621.png')" alt="wxmp">

- 两者可以相互借鉴，例如将random walk思想应用于知识图谱，将Trans思想应用于网络表示。



### 2. 图网络表示学习（network representation/embedding）

- 基于矩阵分解的模型，比如SVD分解等
- 基于随机游走的模型，比如DeepWalk、Node2vec等

DeepWalk的主要思想是在由物品组成的图结构上进行随机游走，产生大量物品序列，然后将这些物品序列作为训练样本输入word2vec进行训练，得到物品的embedding。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ac/rscase/sum2/1998154-20200508211715931-1287848307.png')" alt="wxmp">

在DeepWalk的基础上，通过调整随机游走权重的方法，使embedding的结果在网络的**同质性**和**结构性**中进行权衡。

其中，网络的“同质性”指的是距离相近节点的embedding应该尽量近似，“结构性”指的是结构上相似的节点的embedding应该尽量接近。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ac/rscase/sum2/1998154-20200508211339815-1193217406.png')" alt="wxmp">

- 基于深度学习的模型（与下文的图神经网络呼应）：CNN、RNN、AE、GNN、GCN、结合注意力、结合强化学习、结合GAN等。



### 3. 图神经网络

#### 3.1 图神经网络GNN

GNN的核心观点：

- 通过节点信息（部分节点是有标签）的迭代传播使整张图达到收敛
- 在网络收敛的基础上再进行预测/分类

GNN的局限性：

- 一是没有区分不同边的功能
- 二是节点之间的状态存在较多的信息共享，导致节点的状态太过平滑，并且属于节点自身的特征信息匮乏

GNN的训练学习思路：

- 有监督：根据节点的标签信息计算损失即可
- 无监督：使用”相邻节点的编码相似“进行训练

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ac/rscase/sum2/1998154-20200509002850455-1390771848.png')" alt="wxmp">

#### 3.2 门控图神经网络GGNN

与GNN核心的不同在于不再以不动点理论为基础。

#### 3.3 图卷积神经网络GCN

思考如何解决图中邻居结点数量不固定的问题：

- 一是提出一种方式把非欧空间转换成欧式空间
- 二是找到一种可以处理变长邻居节点的卷积核在图上抽取信息

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ac/rscase/sum2/1998154-20200509003325915-1192299670.png')" alt="wxmp">

#### 3.4 GraphSage

解决GCN需要存放整张图信息的问题，利用采样部分节点的方式进行学习。

#### 3.5 图注意力网络Graph Attention Network

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ac/rscase/sum2/1998154-20200509124652361-955938301.png')" alt="wxmp">

#### 3.6 异质图神经网络：（与前面基于知识图谱的推荐方法呼应，细品）

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ac/rscase/sum2/1998154-20200508231238077-1617003335.png')" alt="wxmp">

#### 3.7 后续还有图神经网络结合聚类、自编码、注意力、强化学习、GAN等

#### 3.8 图神经网络的应用

在nlp、计算机视觉、**推荐系统**、强化学习、恶意检测、专业领域等都有很大的应用前景。

#### 3.9 四大图神经网络框架

- deep graph library (DGL)：支持pytorch、tensorflow
- pytorch geometric (PyG)：基于pytorch
- ant graph machine learning system：蚂蚁金服团队推出的大规模图机器学习系统
- tf_geometric：借鉴pytorch geometric，创建了tensorflow版本

## 三、知识图谱与图神经网络的相关问题探究



### 1. 图神经网络是如何处理类似知识图谱的有向异构图的？

- GCN是谱域的GNN：基于谱图理论，无法天然的处理有向图。
- GAT是空域的GNN：可以天然的处理有向图，通常定义入度的节点进行聚合。
- 知识图谱和异质图都有专门设计的GNN：
  - 知识图谱上的GNN关注于了对于不同关系含义的区别。
  - 异质图上的GNN关注于多种不同关系的融合来更好的描述节点。



### 2. 知识图谱与异质信息网络的区别？

- 一般来说，知识图谱比异质信息网络包含更多的点和边类型。但并不绝对，这两个定义并没有明确的界限，很多时候都是互为替代的。
- 前文提到，知识图谱强调节点之间的关系表示，图网络强调节点的结构表示。但其实知识图谱中基于path的方法和图网络中基于随机游走采路径的方法基本没有区别。

 

**【更新】介绍比较新的一些深度学习推荐模型改进方向：**

- 引入用户行为序列建模（例如TDM/TransRec等）
  - 将用户历史行为看做一个无序集合，对所有embedding取sum、max和各种attention等
  - 将用户历史行为看做一个时间序列，采用RNN/LSTN/GRU等建模
  - 抽取/聚类出用户的多峰兴趣，方法有Capsule等（阿里MIND提出）
  - 根据业务场景的特殊需求，采用其他方法

- 引入NLP领域知识建模（例如Transformer/BERT等）
- 多目标优化/多任务学习（例如阿里ESMM/Google MMoE等）
- 多模态信息融合
- 长期/短期兴趣分离（例如SDM等）
- 结合深度强化学习（例如YouTube推荐/今日头条广告推荐DEAR等）
- 图神经网络的预训练（即引入迁移学习的思路）
- ......


本文参考了大佬的知乎专栏：https://zhuanlan.zhihu.com/p/112530121

## 参考文章
* https://www.cnblogs.com/zhengzhicong/p/12850056.html