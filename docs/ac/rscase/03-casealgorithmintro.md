---
title: 推荐系统-案例算法介绍
---

::: tip
本文主要是介绍 推荐系统-案例算法介绍 。
:::

[[toc]]

##  实战智能推荐系统（1）-- 个性化推荐系统及其基本推荐算法


个性化推荐系统是建立在海量数据挖掘基础上的一种高级商务智能平台，以帮助电子商务网站为其顾客购物提供完全个性化的决策支持和信息服务。

推荐系统有3个重要的模块：用户建模模块，推荐对象模块，推荐算法模块。

## 主要推荐算法

### 1. 基于内容推荐
基于内容推荐是信息过滤技术的延续与发展，它是建立在项目的内容信息上作出推断的，而不需要依据用户对项目的评价意见，更多的需要用机器学习的方法从关于内容的特征描述的事件中得到用户的兴趣资料。用户的资料模型取决于所用学习方法，常用的有决策树，神经网络和基于向量的表示方法等。基于内容的用户资料是需要有用户的历史数据，用户资料模型可能随着用户偏好的改变而改变。

基于内容推荐方法的优点：
- （1）不需要其他用户的数据，没有冷开始问题和稀疏问题
- （2）能为具有特殊兴趣爱好的用户进行推荐
- （3）能推荐新的或者不是很流行的项目，没有新项目问题
- （4）通过列出推荐项目的内容特征，可以解释为什么推荐那些项目
- （5）已经有比较好的技术，如关于分类学习方面的技术已相当成熟

缺点是要求内容能容易抽取成有意义的特征，要求特征内容有良好的机构性，并且用户的口味必须能用内容特征形式来表达，不能显式的得到其他用户的判断情况。

### 2. 协同过滤推荐

协同过滤推荐技术是推荐系统中应用最早和最为成功的技术之一，它一般采用最邻近技术，利用用户的历史爱好信息计算用户之间的距离。然后利用目标用户的最邻近用户对商品的评价的加权评价值来预测目标用户对特定商品的喜好程度，系统从而根据这一喜好程度来对目标用户进行推荐。

协同过滤最大的优点是对推荐对象没有特殊的要求，能处理非结构化的复杂对象，如音乐，电影。基于协同过滤的推荐系统可以说是从用户的角度来进行相应推荐的，而且是自动的，不需要用户努力的找到适合自己兴趣的推荐信息，如调查问卷等。
和基于内容的过滤方法对比，协同过滤具有如下的优点：
- （1）能够过滤难以进行机器自动内容分析的信息，如艺术品，音乐等
- （2）共享他人的经验，避免了内容分析的不完全和不精确
- （3）有推荐新信息的能力，可以发现内容上完全不相似的信息，用户对推荐信息的内容事先是预料不到的，这也是协同过滤基于内容过滤一个较大的差别，可以发现用户潜在的但自己尚未发现的兴趣爱好。
- （4）能够有效的使用其他相似用户的反馈信息，减少用户的反馈量，加快个性化学习的速度。

### 3. 基于关联规则推荐
基于关联规则的推荐是以关联规则为基础，把已购商品作为规则头，规则体为推荐对象。关联规则挖掘可以发现不同商品在销售过程中的相关性，在零售业中已经得到了成功的应用。管理规则就是在一个交易数据库中统计购买了商品集X的交易中有多大比例的交易同时购买了商品集Y，其直观的意义就是用户在购买某些商品时有多大的倾向去购买另外一些商品。

算法的第一步关联规则的发现最为关键且耗时，是算法的瓶颈，但可以离线进行。

### 4. 基于效用推荐

基于效用推荐是建立在对用户使用项目的效用情况上计算的，其核心问题是怎么样为每一个用户去建立一个效用函数。因此，用户资料模型很大程度上是由系统所采用的效用函数决定的。基于效用推荐的好处是它能把非产品的属性考虑进去，如供应商的可靠性和产品的可得性等考虑到效用计算中。

### 5. 基于知识推荐

基于知识推荐在某种程度上可以看成一种推理技术，它不是建立在用户需要和偏好的基础上推荐的。基于知识的方法因它们所用的功能知识不同而有明显的区别。效用知识是一种关于一个项目如何满足某一特定用户的知识，因此能解释需要和推荐的关系。所以用户资料可以是任何支持推理的知识结构，它可以是用户已经规范化的查询，也可以是一个更详细的用户需要的表示。

### 6. 组合推荐
由于各种推荐方法都有优缺点，所以在实际中，组合推荐经常被采用。研究应用最多的是内容推荐和协同过滤推荐的组合。最简单的做法就是分别用于基于内容的方法和协同过滤的推荐方法去产生一个预测结果，然后用某方法组合其结果。尽管从理论上有很多种推荐组合方法，但在某一具体问题中并不见得都有效，组合推荐的一个重要原则就是通过组合后要能避免或弥补各自推荐技术的弱点。

在组合上，有研究人员提出了七种组合思路

- 1）加权：加权多种推荐技术的结果
- 2）变换：根据问题背景和实际情况或要求决定变换采用不同的推荐技术
- 3）混合：同时采用多种推荐技术给出多种推荐结果为用户提供参考
- 4）特征组合：组合来自不同推荐数据源的特征被另一种推荐算法所采用
- 5）层叠：先用一种推荐技术产生一种粗糙的推荐结果，第二种推荐技术在这个结果上产生更精确的推荐结果
- 6）特征扩充：一种技术产生附加的特征信息嵌入到另一种推荐技术的特征输入中，感觉有点像特征组合
- 7）元级别：用一种推荐方法产生的模型作为另一种推荐方法的输入

## 【----------------------------】


## 浅谈推荐系统基础

这篇文章的技术难度会低一些，主要是对推荐系统所涉及到的各部分内容进行介绍，以及给出一些推荐系统的常用算法，比起技术，产品色彩会强不少。参考了《长尾理论》、《推荐系统实践》以及大量相关博客内容。

## 什么是推荐系统

我之前写过一篇[《长尾理论》精读](https://www.jianshu.com/p/2295be2d860a)，里面有这样的观点：

> 推动市场由热门经济学向长尾经济学转变有三种力量：第一种是生产普及的力量（生产者），第二种是传播普及的力量（集合器），第三种是供需相连的力量（过滤器）。

生产普及的力量指，当下大众制作**内容**（图像、音视频、文字等）的门槛大大降低，人们有能力制作并有意愿分享自己产生的**内容**。使得可供展示的**内容**量大大增加。

传播普及的力量指，相当一部分**内容**由原子存在变为比特存在，不再需要占据物理世界中的『货架』，而是存储在硬盘之中，存储成本的降低使得大量**非热门的长尾内容**可以被摆上虚拟世界中的『货架』，真的有了对外展示的机会。

而供需相连的力量，就是指推荐系统。

既然存在大量的**长尾内容**，那如何供需相连？推荐系统要做的，就是联系用户和内容，一方面帮助用户发现对自己有价值的内容；另一方面让内容能够展现在对它感兴趣的用户面前，从而实现内容消费者和内容生产者的双赢。

为了联系用户和内容，其实过去也有很优秀的解决方案，有代表性的比如**分类目录**和**搜索引擎**。

随着互联网规模的不断扩大，分类目录网站也只能覆盖少量的热门网站，越来越不能满足用户的需求，因此搜索引擎诞生了。搜索引擎可以让用户搜索关键词来找到自己所需要的信息，但是，搜索的前提就是用户要**主动**提供**准确**的关键词，但是如果用户无法准确的描述自己需求的关键词时，搜索引擎就无能为力了。

而推荐系统不同，它不需要用户提供明确的需求，甚至连用户主动提出需求都不需要。推荐系统通过分析用户的历史行为给用户的兴趣建模，从而主动给用户推荐能够满足它们兴趣和需求的内容。

## 什么是好的推荐系统？

先总体来说，一个完整的推荐系统一般存在三个参与方：**用户**、**内容提供者**和**提供推荐系统的网站**。

首先，推荐系统要满足用户的需求，给用户推荐那些让他们感兴趣的内容；其次，推荐系统要让内容提供者的内容都能被推荐给对其感兴趣的用户；最后，好的推荐系统设计，能够让推荐系统本身收集到高质量的用户反馈，不断提高推荐的质量，提高推荐系统的效益。

### 推荐系统实验方法

评价推荐系统效果的实验方法主要有三种，分别是**离线实验**、**用户调查**和**在线实验**。

离线实验一般是：

- 通过日志系统获得用户行为数据，并按照一定格式生成一个标准的数据集
- 将数据集按一定规则分成训练集和测试集
- 在训练集上训练用户兴趣模型，在测试集上进行预测
- 通过事先定义的离线指标评测算法在测试集上的预测结果

离线实验在数据集上完成，不需要真实用户参与，可以快速的计算出来。主要缺点是离线指标往往不包含很多商业上关注的指标，比如点击率、转化率。

用户调查是理论上最有效的方法，因为高预测准确率不等于高用户满意度，还是要从用户中来，到用户中去。

用户调查需要有一些真实的用户，让他们在需要测试的推荐系统上完成一些任务，同时我们观察和记录他们的行为，并让他们回答一些问题，最后通过分析他们的行为和答案了解测试系统的性能。

但是用户调查成本很高，而且测试用户也需要精心挑选，太麻烦了。

在线实验一般在离线实验和必要的用户调查之后，一般是将推荐系统上线做AB测试，将它和旧的算法进行比较。

AB测试是一种很常用的在线评测算法的实验方法，不仅是算法，对产品设计的改动也可以采用这种方法。它通过一定的规则将用户随机分成几组，并对不同组的用户采用不同的算法，然后通过统计不同组的各种不同的评测指标比较不同的算法性能，比如点击率。

AB测试的缺点是周期较长，影响较大，我们通常只用它测试那些在离线实验和用户调查中表现很好的算法。

一般而言，我们需要证明新的推荐算法在很多离线指标上优于现有算法，而且用户满意度不低于现有的算法，最后在线上AB测试后，发现在我们关心的指标上也优于现有的算法。这样新的推荐系统才能最终上线发布。

### 推荐系统评测指标

#### 用户满意度

用户满意度是推荐系统最重要的指标，但是用户满意度没法离线计算，只能通过用户调查和在线实验获得。

用户调查前面讲了，是找一些真实的用户去试用，然后统计行为以及询问一些问题。

在线实验一般是对一些线上用户的行为进行统计来得到用户满意度，比如在电子商务网站中，用户如果购买了推荐的商品，就表示他们在一定程度上满意；或者也可以设计一些用户反馈页面收集用户满意度。更一般的，我们可以统计点击率、用户停留时间和转化率等指标。

#### 预测准确度

在过去，很多人将推荐准确度作为推荐系统唯一追求的指标，比如一个推荐系统预测一个用户将来会购买一本书，而最后用户买了，这样推荐的准确度很高。

但是，如果用户本来就准备买这本书，无论推荐与否，都会购买，那这个推荐系统，实际上并没有让用户购买更多的书。

没有帮助用户找到新的感兴趣的内容，没有帮内容生产者找到新用户，也没增加推荐系统的总成交量（姑且叫成交量）。

所以，预测准确度当然很重要，但推荐系统也要能扩展用户的视野，帮助他们发现那些他们**可能会感兴趣，但却不那么容易发现**的东西。同时，推荐系统还要能够把那些埋没在长尾中的内容推荐给可能会对它们感兴趣的用户。

预测准确度在不同研究方向中表现形式也不同，比如**评分预测**中，就是需要预测，该用户在将来看到一个他没有评过分的物品时，会给这个物品评多少分。

在评分预测中，预测准确度一般通过均方根误差（RMSE）和平均绝对误差（MAE）计算，如下式：



<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ac/rscase/algorithmintro/1169201-28ac98ea801e3e5e.png')" alt="wxmp">

均方根误差

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ac/rscase/algorithmintro/1169201-eb34cec8b2eaea8b.png')" alt="wxmp">

平均绝对误差

式子都很好理解，主要思想就是误差累加，RMSE因为使用了平方项的惩罚，对系统的评测更加苛刻。

除了评分预测，还有**TopN推荐**，TopN推荐就是给用户一个个性化的推荐列表。而TopN推荐的预测准确度一般通过准确率和召回率度量，如下式：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ac/rscase/algorithmintro/1169201-eaeb38bb1d3039e8.png')" alt="wxmp">

召回率



<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ac/rscase/algorithmintro/1169201-ab61f80c8b7599a9.png')" alt="wxmp">

准确率

至于准确率和召回率，我在《浅谈机器学习基础》中有特别详细的讲解，还专门画了个图。而且在《浅谈自然语言处理基础》中，我还讲了F1测度，F1测度等于(2*准确率*召回率)/(准确率+召回率)，F1测度越高越好，这样就给出了判定两个在准确度和召回率各有优势算法优劣的简单方法。除了F1测度，《浅谈机器学习基础》还提到了ROC曲线，用于协助决策。

其实TopN推荐要比评分预测更有价值，因为判断用户对内容是否感兴趣要比预测用户对内容的评价更有意义，而且现在新的产品，也已经很少用评分来收集用户反馈了。TopN更直接也更有效。

#### 覆盖率

覆盖率描述一个推荐系统对长尾内容的发掘能力，也就是着力于达成前面的**『推荐系统要让内容提供者的内容都能被推荐给对其感兴趣的用户』**

先给一个最简单的覆盖率定义，就是对所有用户的推荐列表取并集，看看其是否覆盖率所有的内容，覆盖比例是多少。

但是上面的定义过于粗糙，为了更细致的描述推荐系统对长尾内容的发掘能力，我们选择统计所有用户的推荐列表中，不同物品出现次数的分布。

如果所有的物品都出现在推荐列表中，并且出现的次数差不多，那么推荐系统发掘长尾的能力就很好，那么如何度量这种定义下的覆盖率呢？

前面的文章不止一次的讲过熵，熵指混乱程度，熵最大的分布，就是各种物品出现的概率均匀，熵越小，就代表分布越集中，混乱程度越小。所以我们可以计算物品分布的熵值，并希望熵越大越好，熵越大指分布越平均，推荐系统也就更接近全覆盖，而不是只集中在少数热门的物品。熵的计算公式这里不给了，到处都是。

第二个指标是基尼系数，先给出计算公式：



<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ac/rscase/algorithmintro/1169201-b5e45b2e35ed43db.png')" alt="wxmp">

`p`函数是流行度从小到大的排序，`ij`是按照流行度从大到小排序物品列表中的第j个物品。

公式不好理解，这里给张图：



<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ac/rscase/algorithmintro/1169201-7be19aea8ced5be2.png')" alt="wxmp">

这张图怎么解释呢，黑色曲线表示最不热门的x%物品的总流行度的流行度占系统的比例y%，为什么相交在(0, 0)和(1, 1)呢，(0, 0)是说，空物品的流行度之和占总物品流行度之和的0%，(1, 1)是说，所有物品的流行度之和占总物品流行度之和的100%，这个很好理解。

然后为什么肯定在`y=x`之下，考虑这样一个情况，最均匀的情况，所有物品的流行度都相同，那么每增加固定百分比的物品，那增加的流行度在总流行度中占的比例也是固定的，而且也是相同的。看起来很绕，实际上很容易直观的感觉出来。

实际上，所有物品的流行度不会是相同的，有热门物品也有冷门物品，因为是从最不热门的物品开始计算的，所以刚开始可能很高百分比的冷门物品的流行度也不多，所以这条线就会在`y=x`下面，增加的非常缓慢；后面到了热门物品，很少的热门物品就能增加很多的流行度，所以这条曲线增加的速度开始越来越快，最后到达(1, 1)。

然后基尼系数就是SA/(SA+SB)了，基尼系数越小，就越接近`y=x`，最理想情况下，基尼系数为0，流行度完全均匀分布。

社会学中有种现象叫做马太效应，强者愈强，弱者愈弱。这样，越热门的物品会越热门，越冷门的物品越会无人问津，推荐系统就希望尽量消除这种马太效应，让冷门物品也能找到对自己感兴趣的用户，让用户也不必只看排行榜，自己的兴趣和需求也能得到更好的满足。所以我们先根据初始用户行为（根据用户行为定义的热门/冷门）计算物品的基尼系数，然后再根据推荐系统行为（根据推荐系统的推荐次数定义的热门/冷门）计算物品的基尼系数，如果后者的基尼系数反而大了，那说明推荐算法加剧了马太效应。

稍微解释一下，如果推荐系统只疯狂推荐某一种物品，其他物品都不推荐，这样的马太效应就反而更甚于初始的情况了，又会进一步加剧整个生态的马太效应。只有推荐系统对物品均匀的推荐，初始的热门/冷门物品的推荐次数都差不多，才能让初始的冷门产品热起来。

#### 多样性

多样性描述了推荐列表中物品两两之间的不相似性，推荐系统的整体多样性可以定义为所有用户推荐列表多样性的平均值。

相似性或者不相似性的度量方式有多种，比如用物品的内容相似度，我们就可以得到内容多样性函数；如果用协同过滤的相似度函数描述物品之间的相似度，就可以得到协同过滤的多样性函数。

其实提高覆盖率也能在侧面对提高多样性起到积极作用。

#### 新颖性

新颖的推荐是指给用户推荐那些他们之前没听说过的物品，最简单的方式当然是，把那些用户之前在系统中有过行为的物品从推荐列表中过滤掉。

还有种方式是让推荐结果中物品的平均热门程度较低，这样就更可能有较高的新颖性。牺牲精度提高新颖性是很容易的，困难的是不牺牲精度，同时提高新颖性。

#### 惊喜度

惊喜度是，如果推荐结果和用户的历史兴趣不相似，但却让用户觉得满意。提高推荐惊喜度需要提高用户满意度，同时降低推荐结果和用户历史兴趣的相似度。

新颖度和惊喜度的区别在，新颖度说的是没听过的物品，没听过的物品是有可能与用户的历史兴趣相似的，就没有了惊喜度。惊喜度可以说是新颖度的升级，因为没听过的物品中包含与历史兴趣相似的和不相似的物品。也许惊喜度的核心在于让用户无法理解推荐原因。

#### 信任度

信任度是指用户对于推荐系统的信任程度。我们可以通过提供给用户推荐理由以及利用用户的好友/信任的人的信息给用户做推荐来提高信任度。

但是其实很多情况下，对于一些很容易直观感受到推荐结果好坏的物品，比如音乐，信任度就不那么重要了。

#### 实时性

在很多网站中，因为物品具有很强的实时性，比如新闻、微博等，所以推荐系统的实时性就显得至关重要。

推荐系统的实时性包含两部分，一部分是推荐系统需要实时地更新推荐列表来满足用户新的需求；另一部分是推荐系统需要能够将新加入系统的物品推荐给用户。

实时性对完成推荐系统的冷启动也有着重要作用。

#### 健壮性

健壮性指一个推荐系统防止作弊的能力。

设计推荐系统时，应尽量使用代价比较高的用户行为。在使用数据前，可以进行攻击检测，从而对数据进行清理。

#### 商业目标

推荐系统也需要满足自身商业目标的需求。

### 总结

在上面提到的指标里，预测准确度、覆盖率、多样性、新颖性是可以离线计算的。实际评测算法时，我们一般采用预测准确度的正确率和召回率，覆盖率，还有推荐商品的平均流行度。

综合一下上面的指标，我们前面说了三个目标，分别是让用户满意、让物品提供者满意、让推荐系统满意。**用户满意度**对应第一个目标，**覆盖率**对应第二个目标，**商业目标**对应第三个目标。因为用户满意度不容易获得，所以实际上**预测准确度**替代用户满意度成为了最重要的指标。然后我们回到推荐列表上，将其与物品类型结合，物品种类多就是**多样性**；将其与用户认知结合，用户没听过就是**新颖性**。**惊喜度**是新颖性的升级。然后是整个推荐系统，推荐系统需要**实时性**和**健壮性**，来稳定保证好的推荐结果。而且有的场景的推荐系统还要考虑到用户对推荐系统的**信任度**的问题。

这样就把这十个指标串起来了，也更方便记忆。

当然我们在采用以上指标进行评测时，也要考虑到评测的用户维度、物品维度、时间维度，也就是涉及评测的用户群，物品的种类属性和评测的季节、时间等。这可以让我们发现不同算法在不同场景下的优缺点。

## 利用用户行为数据

实现个性化推荐最理想的情况，是用户告诉我们他喜欢什么，但这种方法有三个缺点：

- 第一个是，现在的自然语言处理技术还很难理解用户用来描述兴趣的自然语言；
- 第二个是，用户的兴趣是不断变化的；
- 第三个是，用户也不知道自己喜欢什么，或者说，用户也很难用语言描述自己喜欢什么。

这里考虑代入HMM的思想，用户的需求会不断变化，就是状态序列。而且这个状态序列是隐藏的，也就是我们无法直接获知用户的兴趣，不管是因为用户自己没意识到还是无法表达。我们需要通过观察序列，也就是用户的行为数据去做推测，去根据EM算法估计这个HMM的参数，然后再用其来得到用户的需求序列，也就是隐状态序列。

**基于用户行为分析**的算法是个性化推荐系统的重要算法，学术界一般将这种算法称为**协同过滤算法**。

我们能拿到的用户行为一般分为两种，**显性反馈行为**和**隐性反馈行为**，显性反馈行为就是点击喜欢不喜欢，或者评5分1分。隐性反馈行为指的是那些不能明确反应用户喜好的行为。最具代表性的隐性反馈行为就是页面浏览行为，虽然不明确，但数据量更大。而且隐性反馈只有正反馈，没有负反馈。

即便是反馈也分为有无上下文，实际上就是是否记录了用户反馈行为的时间以及前后行为，这里先只考虑无上下文的隐性反馈数据集。

### 用户行为分析

#### 用户活跃度和物品流行度的分布

互联网上的很多数据其实都满足长尾分布，也叫PowerLaw分布，我在《浅谈自然语言处理基础》中还提到过，就是讲平滑方法，古德图灵估计法那里。里面提到了Zipf定律，也即，如果将英文单词出现的频率按照由高到低排列，则每个单词出现的频率和它在热门排行榜中排名的常数次幂成反比。也可以这么说，如果`x1`，`x2`，`x3`是三个热门排名相邻的三类单词，`x1`最靠前，那么出现的频率`x2/x1 < x2/x3`，也就是最开始下降的最快，然后下降速度越来越慢。

我们发现，用户活跃度和物品流行度都满足长尾分布。

#### 用户活跃度和物品流行度的关系

我们认为，新用户倾向于浏览热门的物品，老用户会逐渐开始浏览冷门的物品。用户越活跃，越倾向于浏览冷门的物品。

仅仅基于用户数据设计的推荐算法一般称为协同过滤算法，协同过滤算法也分为不同种类，比如**基于邻域的方法**、**隐语义模型**、**基于图的随机游走算法**等。其中应用的最广的是基于邻域的方法，而基于邻域的方法主要包括以下两种：

- **基于用户的协同过滤算法**：给用户推荐和他兴趣相似的用户喜欢的物品
- **基于物品的协同过滤算法**：给用户推荐和他之前喜欢的物品相似的物品

简便起见，我们通常使用准确率、召回率、覆盖率和新颖度来对算法进行离线实验，覆盖率就用最简单的覆盖率定义，新颖度用推荐物品的平均流行度代替。

### 基于邻域的算法

#### 基于用户的协同过滤算法

基于用户的协同过滤算法主要包括两个步骤：

- 找到和目标用户兴趣相似的用户集合
- 找到这个集合中的用户喜欢的，且目标用户没有听说过的物品推荐给目标用户

第一步的关键就是找到和目标用户兴趣相似的用户，我们可以用两个用户兴趣的交集比上兴趣的并集来求得相似度（Jaccard相似度），或者利用余弦相似度计算。

如果用余弦相似度：



<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ac/rscase/algorithmintro/1169201-9c829f17703c9b31.png')" alt="wxmp">

分子是两个用户兴趣交集的模，分母是两个用户兴趣的模的乘积的平方根。

要注意的是，有很多用户之间根本就没有兴趣的交集，所以就不需要浪费时间在这种情况的计算上。

得到用户之间的兴趣相似度之后，UserCF算法会推荐给用户**和他兴趣最相似的K个用户最喜欢的若干个物品**。

判断该用户`u`对某一件物品`i`的感兴趣程度时的公式如下：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ac/rscase/algorithmintro/1169201-14370446384eb0c0.png')" alt="wxmp">



也即用K个和他兴趣最相似用户的平均兴趣代表这个用户的兴趣。`w`代表两个用户兴趣之间的相似程度，`r`指感兴趣程度的大小，这里统一为1。Σ下面的意思是，K个和`u`兴趣最相似的用户，而且同时要对物品`i`有过行为。可以这么理解，如果这K个用户都没有对某个物品有过行为，那基本就可以认为他们对该物品都不感兴趣，就不应该加到式子中。

换句话说，这K个用户，与用户`u`的相似度决定了他们的话语权，他们表决的方式就是自己是否对该物品有过正面行为。

最后我们只需要取感兴趣程度TopN的物品出来推荐给用户就好了，当然还要去掉该用户已经有过行为的物品。

K是UserCF算法的一个重要参数。K的选取会影响UserCF算法的结果。

一般进行算法评测时，我们会有两个标准算法，分别是MostPopular和Random算法，一个是按最高流行度来，一个是完全随机，都只是简单的去掉用户有过行为的物品。

UserCF算法的平均性能要远好于以上两个算法。

当然UserCF算法也有改进的空间，比如在计算用户相似度的时候，大家**同样购买了热门物品**其实没有什么说服力，并不能以此说明两个用户就相似了，所以我们需要对热门物品进行降权，如下式：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ac/rscase/algorithmintro/1169201-92454f869ca66a33.png')" alt="wxmp">



该公式与原公式相比，惩罚了用户`u`和用户`v`共同兴趣列表中热门物品对他们相似度的影响。这里先提一下TF-IDF，后面还要提，《浅谈机器学习基础》中讲K-means的时候就讲过TF-IDF，TF-IDF里的这个IDF，就是对出现在几乎所有文档中的热门词进行降权惩罚。

#### 基于物品的协同过滤算法

基于物品的协同过滤算法是目前业界应用最多的算法。

**如果网站的用户数目增加较快，计算用户兴趣的相似度矩阵就越来越难。**而ItemCF算法不计算用户兴趣的相似度矩阵，而是计算**物品之间的相似度**。还有，我们前面说过基于邻域的这两个算法都是协同过滤算法，协同过滤算法的定义就是只使用用户行为数据，所以这里所定义的物品的相似度，不利用物品本身的内容信息去计算，而是主要通过分析用户的行为记录计算物品之间的相似度。

**如果喜欢A的用户大多都喜欢B，那么A和B可以讲拥有一定的相似性。**或者说，就算不相似，那我们把B推荐给喜欢A的用户也是没错的。

基于物品的协同过滤算法主要分为两步：

- 计算物品之间的相似度
- 根据物品的相似度和用户的历史行为给用户生成推荐列表

我们可以用下面的公式定义物品之间的相似度：



<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ac/rscase/algorithmintro/1169201-9de56d23cccdbfbe.png')" alt="wxmp">

意思就是，买了`i`的用户有多少也买了`j`。如果两者的用户群重合比例越大，那么认为`i`和`j`就更相似。

但是还有个问题，就是如果按照上面的公式算，所有的物品都和热门商品相似，如果`j`是大热门商品的话，基本上喜欢`i`的全都喜欢`j`，这样就有问题，为了提高覆盖率，我们要对热门物品进行惩罚：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ac/rscase/algorithmintro/1169201-8f608099d023481d.png')" alt="wxmp">



上面的式子就对热门物品的权重进行了惩罚。

得到物品的相似度之后，ItemCF通过如下公式计算用户`u`对物品`i`的兴趣：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ac/rscase/algorithmintro/1169201-fd567e1349a645fb.png')" alt="wxmp">



与UserCF对比着来说，UserCF是用K个和用户`u`兴趣最相似用户的平均兴趣代表这个用户`u`的兴趣；ItemCF就是用K个和物品`j`最相似的物品来代表这个物品`j`。UserCF是，这K个用户，与用户`u`的相似度决定了他们的话语权，他们表决的方式就是自己是否对该物品有过正面行为；ItemCF是，这K个物品，与物品`j`的相似度决定了他们的话语权，他们表决的方式就是自己是否被该用户有过正面行为。

然后我们再回到物品相似度，虽然上面已经给热门物品降了权，但是我们还要考虑到热门用户的问题。我们认为，一个活跃用户可能会喜欢很多种类的物品，他对物品相似度的贡献应该小于不活跃的用户，因为不活跃的用户往往喜欢比较专一，在衡量物品相似度上更有价值，这叫IUF（Inverse User Frequence）。如下式：



<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ac/rscase/algorithmintro/1169201-8a3a375d245ebcc4.png')" alt="wxmp">

又进一步**对活跃用户进行了降权**。

另外，在有物品分类的情况下，我们需要对类内物品相似度进行归一化，因为通常热门类别类内相似度也较高。如果一个用户同时喜欢了热门类别和非热门类别的物品，如果纯按照相似度推荐，那就会都推荐给用户热门类别中的物品，会降低覆盖度、多样性。所以我们利用类内最大的相似度，对类内所有的相似度进行归一化。

#### UserCF和ItemCF的综合比较

主要从两个方面来讲，第一个，UserCF的推荐结果着重于反应和用户兴趣相似的小群体的热点，着重于**维系用户的历史兴趣**，因为就是根据历史兴趣计算出来的相似用户，进而计算出来的推荐商品。而ItemCF的推荐更加个性化，**反映用户自己的兴趣传承**，因为一旦用户的兴趣有了更新，喜欢了新物品，那么与该物品相关的物品在参与ItemCF进行计算时，就会马上有权重提高，被推荐出来。

这么说，UserCF帮你找了一些用户来代表你，他们的兴趣是不可能统一的发生大幅改变的，所以你得到的推荐结果都是这一类的东西；而ItemCF，一旦你兴趣列表变了，那接着就认为你兴趣变了，喜欢你这个新兴趣的人喜欢的物品就会被推荐给你。

UserCF认为喜欢同样物品的人相似，ItemCF认为被同样人喜欢的物品相似。UserCF对用户聚类，整体对待他们的喜好，ItemCF对物品聚类，喜欢一个就是喜欢一堆。

对于UserCF和ItemCF，再举一下典型的例子，首先是新闻网站，新闻网站必然要用UserCF，相似用户的兴趣基本相同，没问题；如果用了ItemCF，难道要推荐和这篇新闻相似的旧新闻？当然这两种方法也不是一定要绝对分开。

比如音乐网站，网易云音乐的推荐算法，就更接近ItemCF，你喜欢了一种新风格，这一风格的歌就会被推荐给你，而不是认为你一辈子只喜欢听一种类型的音乐，把你和与过去的你相似的人绑在一起。

第二个是从技术角度想，物品和用户表，哪个稳定就用哪个建模。物品迅速增加那就建立用户相似度表，用户迅速增加就建立物品相似度表。

### 隐语义模型

隐语义模型（latent factor model，LFM）是最近几年推荐系统最为热门的研究话题，它的核心思想是通过隐含特征联系用户兴趣和物品。

前面已经详细的介绍了UserCF和ItemCF，这里说一下LFM的主要思想，首先回忆一下SVD，SVD将矩阵拆解为三部分的乘积。《浅谈机器学习基础》中这样讲过：

> SVD的第二个用途是在自然语言处理中，我在《数学之美》这本书上读到。我们用A矩阵来描述成千上万篇文章和几十上百万个词的关联性，A里面每一列是一篇文章，每一行代表一个词，对应位置上是这个词的加权词频（比如TF-IDF值），然后我们对A进行奇异值分解，分成这样：A=XBY，这里和前面的：A=XY的关联性在于，两式的X相同，第二式的Y等于第一式中的BY，X是M*K，B是K*K，Y是K*N。

> 第一个矩阵X是对词分类的结果，它的每一行表示一个词，每一列表示一个同义词类，对应位置的值表示该词和该同义词类的相关性大小。

> 第三个矩阵Y是对文章分类的结果，它的每一列对应一篇文章，每一行表示一个主题，对应位置的值表示该文章和该主题的相关性大小。

> 第二个矩阵则展示了不同同义词类和不同文章主题的相关性大小。

推荐系统这里也是同理，如果将原数据按照SVD分解成三个矩阵的话，所得到的就是对用户兴趣的分类、对物品的分类以及用户兴趣类别与物品类别之间的关系。当然我们也知道SVD不仅能分解成三个矩阵的形式，也能分解为两矩阵的形式，意义是用户兴趣与某隐类的关系和该隐类与物品的关系。SVD的详细讲解可以参考前面的《浅谈机器学习基础》，其实下面要讲的LFM方法，也就是《浅谈机器学习基础》所讲的，SVD在推荐系统中的应用。

当然对用户兴趣和物品进行分类这件事情人工也是可以做的，但成本较大，而且效果也并不太好，所以这里就不详细说了。

隐含语义分析技术其实有很多著名的模型和方法，其中和该技术相关的有pLSA、LDA、隐含类别模型、隐含主题模型、矩阵分解等。这些方法在本质上是相通的。这里主要讲解LFM。

LFM通过如下公式计算用户`u`对物品`i`的兴趣：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ac/rscase/algorithmintro/1169201-07f23fb6c8851414.png')" alt="wxmp">



累加式子中的`p`代表用户`u`的兴趣和第`k`个隐类之间的关系，`q`代表第`k`个隐类和物品`i`之间的关系。对所有隐类求和的结果就是总的兴趣程度。

这其实是种机器学习方法，模型就是这个模型，然后我们可以用平方误差来做损失函数，就是给定训练集下，度量用户感兴趣与否的实际情况与预测结果是否相符，再用梯度下降最小化损失函数，减小模型预测结果与实际情况的误差，最终收敛就可以了。我们还可以在损失函数中添加正则项来防止过拟合。这些都是《浅谈机器学习基础》里面反复讲过的东西。

而且为了应对隐性反馈数据集只有正样本的情况，我们倾向于从用户没有行为的热门物品中选取适量（与正样本数平衡）的负样本。适量就不用说了，选择热门物品的原因在于，物品热门而用户对其无正面反馈，比冷门物品更能说明用户对其不感兴趣，而不是因为也许根本就没有发现。

LFM还有个问题，就是它很难实现实时的推荐，因为经典的LFM模型每次训练时都要扫描所有的用户行为记录，不是分分钟就能训练好就能更新用户隐类向量`p`和物品隐类向量`q`的。如果要将LFM应用在新闻网站这种内容实时更新的系统中，那是肯定无法满足需求的。

雅虎为了解决传统LFM不能实时化的问题，提出了一个解决方案，公式如下：



<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ac/rscase/algorithmintro/1169201-808b9206577afaff.png')" alt="wxmp">

后面那部分就是原先的用户隐类向量和物品隐类向量，几个小时更新一次。实时性体现在前面的式子上，`x`是根据用户历史行为特别训练的用户向量，`y`是根据物品的内容（关键词、属性、种类）去生成的物品内容特征向量。这样两者的乘积就能实时的估计出用户对该物品的兴趣，几小时后，通过传统的LFM就能得到更精确的数据。

就像上面说的，LFM与基于邻域的这两种方法UserCF和ItemCF相比，LFM不能在线实时推荐，需要提前训练好模型，而ItemCF可以，至于UserCF，只要和他相似的用户喜欢了新的物品，也可以做到实时推荐。

基于图的方法较麻烦，而且效果也比不上LFM，这里就不详细说了。

## 推荐系统冷启动问题

前面我们讲过如何使用用户行为数据去设计一个推荐系统，但是推荐系统该如何完成冷启动？

冷启动问题主要分为三种，一种是用户冷启动，对于一个新用户，我们没有他的历史行为数据，该怎么为其做个性化推荐；第二种是物品冷启动，就是如何将新的物品推荐给可能对它感兴趣的人；第三种是系统冷启动，也就是整个系统没有用户，只有一些物品的信息，该怎么办。

### 利用专家做初始标注

我们可以利用专家在若干个维度上对物品完成初始标记，后面再利用机器学习算法去计算相似度。这里不详细说了。

### 利用用户注册信息

比如我们可以利用用户的人口统计学信息、用户兴趣描述（很少）、从其他网站导入的用户站外行为数据。

我们可以计算拥有每种特征的人对各个物品的喜好程度，比如可以简单的定义为喜欢某种物品的人在拥有这种特征的人中所占的比例，而且我们还要注意要对热门物品降权，免得给所有特征的人都推荐热门物品。

### 选择合适的物品启动用户的兴趣

比如我们可以在用户注册后给用户提供一些物品，让用户反馈他们对这些物品的兴趣。

那启动物品集合该怎么选？该怎么设置题目给新用户做才最有效果？

回想一下《浅谈机器学习基础》里讲的决策树算法，这也就是一个对用户的分类问题，决策树算法里面，我们的思想是依次选择让整个数据集熵减小最大的特征对用户进行划分。如果我们已经拥有对用户兴趣的划分，也即可以方便的计算熵，那直接用决策树算法是最好的，但是如果我们没有，那也可以选择一种近似的决策树算法。

不过与决策树的思想相同，仍然要去选择区分度最大的物品对用户进行分类，我们可以用用户对物品评分的方差来度量，方差越大说明意见分歧越大，越有区分度。我们先选择最有区分度的物品对用户分类，然后再对不同类别的用户选择对该类别下的用户最有区分度的物品进行分类，不断迭代。在决策树算法中，我们用熵减，或者叫信息增益定义物品的区分度，而这里我们用的是评分方差。

### 利用社交网络

我们可以导入用户在其他系统中的社会化关系，然后按照UserCF算法的思想，把与用户有好友关系的用户临时当做相似用户，熟悉度替代相似度来使用UserCF算法进行推荐。

如果推荐系统是直接用来起到推荐好友的作用，那要考虑到网站的类型，如果用户的目的是为了获取内容，那尽量为其推荐与他爱好相似的用户；如果用户的目的是认识熟人，那根据社交关系链推荐会更有效果，比如推荐给他朋友的朋友，利用手机通讯录也是很好的选择。

还有一种是信息流推荐，这里也一并讲了，Facebook的EdgeRank是很流行的信息流推荐算法，该算法综合考虑了每个会话的时间、长度和与用户兴趣的相似度。

比如这样定义一条对话的权重：



<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ac/rscase/algorithmintro/1169201-ae12c014440a46f7.png')" alt="wxmp">

`u`指产生行为的用户和当前用户的熟悉度，熟悉度可以用共同好友数量来衡量；`w`指行为的权重，比如原创、评论、点赞、转发等，不同的行为应该有不同的权重；`d`指时间权重，越早的行为权重越低。

除了上面这些社会化因素之外，我们还可以进一步考虑用户本身对会话内容的偏好，比如会话的长度、会话话题与用户兴趣之间的相关性，这样再结合前面的社会化属性，就会比较全面了。

### 利用物品的内容信息

其实UserCF算法对物品冷启动并不敏感，新加入的物品，如果有推荐系统之外的方式能让用户看到，只要一个用户群中有一个人喜欢了，那这个物品就会扩散开来，然后又带动了进一步扩散。离线训练的用户相似度表是不需要动的。

但是ItemCF算法就不行了，对于新的物品，我们根本不知道它跟哪些物品相似，推荐系统就推荐不出来它，这涉及到物品相似度表，解决方案只能是频繁的更新相关表了，比如半小时更新一次。

我们还可以利用物品的内容信息来解决基于ItemCF的推荐系统的冷启动问题，我们可以将物品通过向量空间模型表示，维度可以是一些导演、演员之类的实体，如果内容是文本的，可以利用NLP技术抽取一些关键词，也就是《浅谈自然语言处理基础》里面提过的命名实体识别。

这样我们就得到了物品的一个关键词向量，里面的维度是较能够体现物品特征的关键词，然后再回想一下TF-IDF算法，我们就把一个个物品当成一篇篇文章，一个个关键词当做文章里的词。如果物品真的是文本，那就可以直接用TF-IDF算法，把每个维度替换成相应的TF-IDF值；如果不是文本，可以根据知识，人工的赋予TF权重，当然还可以计算出相应的IDF值来使模型更为精确。

然后我们的关键词向量就可以利用余弦相似度去参与计算物品的内容相似度了。对物品归类的话，可以直接用KNN，这样就得到了内容过滤算法ContentItemKNN。

内容过滤算法忽视了用户行为，从而也忽视了物品的流行度以及用户行为中所包含的规律，所以它的精度比较低，但新颖度却比较高。

为了优化内容过滤算法，这里提出主题模型LDA（Latent Dirichlet Allocation），先说一下LDA和LFM的关系，它们最相似的部分都是发现内容背后的隐含主题，但其它的关系真是不大，有人讲它们是雷锋和雷峰塔，Java和Javasript的关系。

LFM用的是矩阵分解的思想，然后梯度下降去学习，与SVD的思想相似。

而LDA由pLSA、LSA这两种主题模型演化而来，这里详细讲解一下，参考了[主题模型-LDA浅析](https://link.jianshu.com/?t=http://blog.csdn.net/huagong_adu/article/details/7937616)，不过我觉得我讲的好理解得多_(:з」∠)_

LDA模型对的基本思想是，一篇文章的每个词都是通过**以一定概率选择了某个主题，并从这个主题中以一定概率选择某个词语**来得到的。

我们先引入一个问题，如何生成M篇文章，每篇文章包含N个单词。

先说第一种最简单的方法：



<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ac/rscase/algorithmintro/1169201-505e200fe2a75923.png')" alt="wxmp">

我们先搞一批训练语料，学出单词`w`的概率分布`p(w)`，然后把这个分布用N次，得到一篇N个单词的文章，然后把这个方法用M次，得到M篇N个单词的文章。实际上也就是连着用`p(w)`这个分布M*N次。

这个方法的缺点就是单词没有主题，没有联系，乱七八糟。

然后是第二种方法：



<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ac/rscase/algorithmintro/1169201-90a22b8143c98e94.png')" alt="wxmp">

这种方法增加了主题`z`，主题`z`也有主题的分布`p(z)`。

先只看图，这个`z`在方框N外面，说明一篇N个词的文章只有一个主题；其次，这个`z`在方框M里面，M篇不同的文章有不同的主题`z`。

这样，这M篇文章，我们为每一篇文章都先根据`p(z)`生成一个`z`，然后在这篇文章内，再使用N次条件概率`p(w|z)`生成N个单词，由此得到M篇N个单词的文章。一个任务里面有M篇不同主题的文章，每篇文章的单词都是根据自己的主题生成的。

这个方法的缺点在于，每篇文章里只能有一个主题。

然后就是LDA方法了：



<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ac/rscase/algorithmintro/1169201-e1d9482afbbdd897.png')" alt="wxmp">

LDA一下子多了三个参数α、β和θ，我们先只看图，我们发现主题`z`放在了方框N里面，说明N个词，每个词都有自己的主题了，一个词的分布就成了`p(w|z)*p(z)`。然后我们看到θ，θ是一个主题向量，决定了`p(z)`，θ在方框N外面，说明每篇文章的N个词都有一个相同的θ，用于决定这篇文章内所有N个词的`p(z)`。θ在方框M里面，说明M篇文章，每篇文章都有一个不同的θ，而`p(θ)`也就被需要了，`p(θ)`是θ的分布，具体为Dirichlet分布，决定每篇文章的所有N个词都对应哪一个θ。然后再外面是α，α在方框M外面，也就说对于一个任务的这M篇文章，都是同一个α，而这个α决定了`p(θ)`。此外还有一个β，这个β是希望，词的分布概率不只被`z`决定，也即词的分布不是`p(w|z)*p(z)`而是`p(w|z,β)*p(z)`。

上面扯了这么多，都是为了方便理解，实际上就是这个公式：



<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ac/rscase/algorithmintro/1169201-c4874319afac1242.png')" alt="wxmp">

LDA联合概率分布

这么说，对于一个任务，我们先给定α、β（一个任务一个α、β），这个α决定了M篇文章都分别对应哪个主题向量θ（一篇文章一个θ），然后每篇文章的主题向量θ决定了这篇文章的主题分布`p(z)`，也就是这篇文章每个词都分别对应哪个主题`z`（一个词一个`z`）。然后每个词是由这个词的`z`和β共同决定的。

再精简一点，一个任务一个α、β，一篇文章一个主题向量θ，一个词一个主题`z`，α决定主题向量θ，主题向量θ决定主题`z`，主题`z`和β一块决定词`w`。

传统判断两个文档相似性的方法是通过查看两个文档共同出现的单词的多少，如TF-IDF等，这种方法没有考虑到文字背后的语义关联，可能在两个文档共同出现的单词很少甚至没有，而LDA是主题模型，可以通过隐含主题发现没有重复单词的文档的相似性。LDA在个性化推荐、社交网络、广告预测等各个领域的应用都非常广泛。

然后LDA的训练与HMM相似，采用的也是EM算法，最后会收敛到一个合理的分布上去。

我再尝试回答几个更本质的问题。

**为什么一个重复单词都没有，还能判定文章相似？**
用的单词虽然不重复，但都语义上相似。

**怎么判断单词语义上相似？**
出现在了相似文章中。

**那这不是个鸡生蛋蛋生鸡的问题吗？**
EM算法就是解决这种鸡蛋问题的，回忆《浅谈自然语言处理》里面对EM算法的讲解即可。

LDA可以合理的将单词归类到不同的隐含主题之中。而且如果文档的主题向量θ，也即主题`z`的分布较为相似，那我们就可以认为两篇文档具有较高的相似度，计算分布的相似度可以用KL散度，也就是相对熵。

## 与上下文信息结合

之前提到的推荐算法主要研究了如何联系用户兴趣和物品，将最符合用户兴趣的物品推荐给用户，但却都没有考虑到上下文。

比如举几个例子，不能因为用户在夏天喜欢过某件T恤，就在冬天也给该用户推荐类似的T恤；用户在中关村打开一个美食推荐系统时，不能给他推荐河北省的餐馆；用户在上班时和下班后的兴趣会有区别，在平时和周末的兴趣会有区别，甚至上厕所时和在办公桌旁阅读的喜好也是不同的。

### 时间上下文信息

一般认为，时间对用户兴趣的影响表现在**用户的兴趣是变化的**、**物品也是有生命周期的**、**季节\节日效应**。

推荐系统需要拥有实时性来满足用户变化的兴趣，比如用户一旦产生了新的行为，推荐系统就应该有恰当的反应。而且还有一点需要注意的是，推荐系统需要有**时间多样性**，也就是，即便是用户实际上没有进行任何操作，但我们也不应该每天给用户推荐相同的内容。

比如我们可以在生成推荐结果时加入一定的随机性，或者记录用户每天看到的推荐结果，对这些推荐结果进行适当的降权，又或者每天给用户使用不同的推荐算法。

这里我们主要考虑，时间上下文信息对我们经典的基于邻域的两个算法ItemCF和UserCF能够起到什么优化作用。

对于ItemCF，考虑第一点，用户在相隔很短的时间内喜欢的物品具有更高的相似度；然后是第二点，用户近期行为比用户很久之前的行为，更能体现用户现在的兴趣。

对于UserCF，考虑第一点，如果两个用户同时喜欢相同的物品，那么这两个用户应该有更大的兴趣相似度；然后是第二点，与当前用户最相似的这一组用户最近的兴趣，应该比这组用户很久之前的兴趣更加接近当前用户今天的兴趣。

毕竟ItemCF和UserCF都各有两个过程，只要将两个过程分别与时间结合起来，很容易就能知道该往哪个方向优化。

### 地点上下文信息

地点上下文与用户兴趣也有一定的关系，比如不同城市/国家的人的兴趣爱好会有不同，这叫**兴趣本地化**，还有用户往往在附近地区活动，一般不会因为要吃个饭坐高铁去别的地方，这叫**活动本地化**。

所以我们在分析用户行为数据时，可以考虑到用户位置和物品位置，当然这是一些实体化的服务提供者需要考虑的问题，如果讲网购，用户和物品位置对喜好的影响就小多了，但也并不是完全消失。

## 推荐系统实例

这里主要是讲好四张图，首先是第一张，推荐系统和其他系统之间的关系：



<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ac/rscase/algorithmintro/1169201-9b4e030013b7d621.png')" alt="wxmp">

推荐系统和其他系统之间的关系

我们通过用户行为以及其他数据设计推荐系统，推荐系统通过前台页面与用户产生交互，所得到的数据又被日志系统记录，处理后又回到用户行为数据库中，被用来设计更好的推荐系统。

然后是第二张，基于特征的推荐系统架构思路：



<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ac/rscase/algorithmintro/1169201-b0f291c16a3b84f6.png')" alt="wxmp">

基于特征的推荐系统架构思路

其实推荐系统做的就是文章最开头长尾理论里面讲的供需相连，就是连接用户与物品，那么用户与物品通过什么相连呢，我们统一的定义其为『特征』。

比如ItemCF，用户喜欢了一个物品，就相当于是有了一个特征，我们根据这个特征找到相似物品推荐给用户。

比如UserCF，用户和某K个用户最相似，这就也是一个特征，我们根据这个特征找到这K个用户最喜欢的物品推荐给用户。

至于LFM，那就与本质更接近了，它的隐含主题/语义就是特征。

还有LDA，LDA与ItemCF其实同理，用户喜欢了一篇文档，就相当于是有了一个特征，那根据主题向量θ找到相似的文档推荐给用户即可。

然后是第三张，推荐系统的架构图：



<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ac/rscase/algorithmintro/1169201-d95f0a151cbf231d.png')" alt="wxmp">

推荐系统的架构图

我们可以看到推荐系统可以有不止一个推荐引擎，有了多个推荐引擎，我们可以统筹兼顾，方便的配置不同特征和任务的权重，推荐系统只负责将多个推荐引擎的结果按照一定权重或者优先级合并、排序然后返回。

然后是第四张，推荐引擎的架构图：



<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ac/rscase/algorithmintro/1169201-0d1e1a378555f2f3.png')" alt="wxmp">

推荐引擎的架构图

推荐引擎架构主要包括三部分：

- 部分A负责从数据库或缓存中拿到用户行为数据，通过分析不同行为，生成当前用户的特征向量，如果使用非行为特征，就不需要行为提取和分析模块了，该模块的输出就是用户特征向量。
- 部分B负责将用户的特征向量通过特征-物品相关矩阵转化为该推荐引擎的初始推荐物品列表。
- 部分C负责对初始的推荐列表进行过滤、排名等处理，从而生成该引擎的最终推荐结果。

部分A和部分B都和算法的选择有关，这里主要说一下部分C，首先是过滤模块，我们通常要过滤掉用户已经产生过行为的物品、过滤掉候选物品以外的物品、过滤掉某些质量很差的商品。

过滤掉候选物品以外的物品有些难理解，意思是，比如说，有产品需求，是要求推荐这个种类的产品，或者用户自主设置了筛选条件，比如一定的价格区间或者限定了SPU等。

然后是排名模块，这个各个算法都有考虑，不过这里还是统一的说一下，对于各种推荐算法，我们往往都需要对热门物品进行降权，排名模块这里往往也需要一个对热门物品进行降权的子模块，来再一次提高新颖性。而且还可以考虑这样一个问题，**与用户喜欢的物品相似的**热门物品，用户更有可能已经知道了，可以在对热门物品降权时着重照顾一下这部分物品。

说完了新颖性，这里提一下多样性，如果仅按相似度去计算，很可能推荐出的物品都属于同一个类别。我们可以将原始推荐结果按某种内容属性分为几类，然后推荐每类前几名的物品。就像星际争霸比赛，虽然说是要看实力，但是也总是要分赛区的，每个赛区多少个名额，要是纯按实力，可能所有的名额都是韩国人的了。尽量让推荐结果来自不同的特征。

还有时间多样性，前面也提过了，即便是用户不操作，也尽量不让用户每天看到相同的推荐内容。可以引入随机、记录用户看过的推荐结果进行降权或者直接每天用不同的推荐算法。

排名模块最重要的部分就是用户反馈模块，用户反馈模块主要是通过分析用户之前和推荐结果的交互日志，预测用户会对什么样的推荐结果比较感兴趣，然后根据用户的兴趣进一步优化推荐结果。

比如推荐系统的目标是提高用户对于推荐结果的点击率，那么可以利用点击模型预测用户是否会点击推荐结果。比如搜索结果的点击预测、搜索广告的点击预测、上下文广告的点击预测。

构建这个预测模型首先需要提取特征，比如：

- 用户相关的特征：年龄、性别、活跃度
- 物品相关的特征：流行度、内容属性、评分
- 物品在推荐列表中的位置
- 用户之前是否点击过和推荐物品有同样推荐解释的其他推荐结果
- 用户之前是否点击过和推荐物品来自同样推荐引擎的其他推荐结果

本篇文章的推荐算法基本以推荐物品的推荐算法为主，上面的架构也更倾向于去解决物品推荐问题，不太适合解决社会化推荐问题。

## 参考文章
* https://www.jianshu.com/p/c8711ff27eb0