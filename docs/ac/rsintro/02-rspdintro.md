---
title: 推荐系统-产品视角介绍
---

::: tip
本文主要是介绍 推荐系统-产品视角介绍 。
:::

[[toc]]

## 一文读懂无处不在的智能推荐系统

对于智能推荐系统相信大家已经不再陌生了，现在它已经在内容分发平台、电商、广告、音视频等互联网产品中随处可见。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ac/rsintro/pdintro1-1.png')" alt="wxmp">

## 一、为什么越来越多产品需要做推荐系统？

## **主要有以下两方面的原因**

### **（1）信息过载**

互联网上每天都在产生海量的信息，用户想要迅速和准确地找到他们感兴趣的内容或商品越来越困难。如果用户的目标明确，他可以使用搜索（其实搜索也是有关键字的推荐、推荐是无关键字的搜索），但很多时候我们的用户是没有明确目标的。这时候如果产品能够高效匹配用户感兴趣的内容或商品，就能提高用户体验和粘性，获取更多的商业利益。

### **（2）长尾效应**

绝大多数用户的需求往往是关注主流内容和商品，而忽略相对冷门的大量“长尾”信息， 导致很多优秀的内容或商品没有机会被用户发现和关注。如果大量长尾信息无法获取到流量，信息生产者就会离开平台，影响平台生态的健康发展。

## 二、认识推荐系统

推荐系统定义：推荐系统是人与信息的连接器，用已有的连接去预测未来用户和物品之间会出现的连接。

推荐系统本质上处理的是信息，它的主要作用是在信息生产方和信息消费方之间搭建起桥梁，从而获取人的注意力。

世界是一个数字化的大网，从人类角度来看里面只有两类节点：人和其他。万事万物有相互连接的大趋势，比如：人和人倾向于有更多社会连接，于是有了各种社交产品；比如：人和商品有越来越多的消费连接，于是有了各种电商产品；比如：人和资讯有越来越多的阅读连接，于是有了信息流产品。

一个完整的推荐系统通常由以下部分组成：用户端前台展示、后台日志系统、推荐算法引擎。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ac/rsintro/pdintro1-2.png')" alt="wxmp">

个人绘制的推荐系统架构图

### **前台展示**：
就是你在app或网页上看到的推荐、猜你喜欢、你的个性化歌单、经常一起购买的商品等部分展示的内容。**后台日志系统**：用户数据、用户行为数据、内容数据等日志数据采集、存储、清洗和分析，从而建立画像体系，包括用户画像和物品画像。**推荐算法引擎**：各种算法模型、模型训练配置、推荐效果评估体系。**搭建推荐系统所需投入**：

首先要搭建团队，其中算法工程师是必不可少的，当前也是薪酬较高的；其次还要购置存储和计算资源，如果不是云产品你可能还要自己购置硬件设备；然后还有长时间的数据积累和算法优化。

推荐系统是一个需要长期持续投入的东西，从投入/产出比和时间成本上来说，产品经理不要随便拍大腿就要做一个智能推荐系统。

### **如何判断一个产品是否需要推荐系统？**

第一，看看产品的目的。如果一款产品的目的是建立越多连接越好，那么它最终需要一个推荐系统。

典型的目的不是建立连接的产品就是工具类产品，单纯为提高人类某些工作的效率而存在，比如：AXURE、ERP……虽然如今很多产品都从工具切入想做成社区，但至少在工具属性很强时不需要推荐系统。

第二，看看产品现有的连接。如果你的产品中物品很少，少到用人工就可以应付过来，用户产生的连接不多，这时候不适合搭建推荐系统。**应该要有长尾效应才可能让推荐系统发挥效果。**

## 三、推荐算法-协同过滤基本原理

推荐系统里最经典的算法非协同过滤莫属。协同过滤又称基于领域的算法，核心在于协同，互帮互助。其又可以分为两类：基于用户的协同过滤算法（UserCF)、基于物品的协同过滤算法（ItemCF）。

### **（1）基于用户的协同过滤算法（UserCF)**

当一个用户需要个性化推荐时，可以先通过用户的相似度计算找到和他有相似兴趣的其他用户，然后把那些用户喜欢而他没有听说过的物品推荐给他，这种方法称为基于用户的协同过滤算法。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ac/rsintro/pdintro1-3.png')" alt="wxmp">

如用户A曾经看过《增长黑客》、《流量池》和《原则》，用户B曾经看过《增长黑客》和《原则》，当我们给B推荐时，推荐系统计算出A和B的相似度比较高，而A曾经读过的《流量池》用户B没有读过，因此就将《流量池》推荐给B用户，这就是经典的基于用户的协同过滤。

由上面的描述可知，基于用户的协同过滤算法主要包括两个步骤：

找到和目标用户兴趣相似的用户集合；找到这个集合中的用户喜欢的，且目标用户没有听说过的物品推荐给目标用户。

### **（2）基于物品的协同过滤算法（ItemCF）**

介绍基于物品的协同过滤之前，先来看下基于用户的协同过滤可能带来的问题。

用户数据量比较大时，需要计算的用户之间的相似度会比较多，计算量大。构建用户向量时是使用用户对已消费过的物品的评分/行为来构建的，用户的兴趣是会随时间改变的，导致计算相似用户的频率较高。数据比较稀疏，用户和用户之间有共同的消费行为实际上是比较少的，而且一般都是一些热门物品，对发现用户兴趣帮助也不大。基于物品的协同过滤算法，给用户推荐那些和他们之前喜欢的物品相似的物品。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ac/rsintro/pdintro1-4.png')" alt="wxmp">

用户A、B和C分别喜欢的物品如图所示，则计算物品2与物品1的相似度的公式为：

物品2与物品1的相似度=同时喜欢物品1和物品2的用户数/喜欢物品1的用户数=2/3；物品3与物品1的相似度=0；物品4与物品1的相似度=1；如果对一个喜欢了物品1的用户D进行推荐，则推荐的优先级为4>2>3。基于物品的协同过滤算法主要包括的步骤：

计算物品之间的相似度；根据物品的相似度和用户的历史行为给用户生成推荐列表。以上只是协同过滤算法的基本原理，现实中的算法模型要远比这个复杂，而且很少采用单一模型，基本是组合模型。我也是刚刚才开始做推荐系统，至于更为复杂的矩阵分解、基于机器学习的推荐算法等后续我自己搞明白再单独成文分享给大家。

## 四、推荐系统的冷启动

**推荐系统需要已有的连接去预测未来用户和物品之间会出现的连接。**

对于BAT(百度腾讯阿里)、TMD（头条美团滴滴）这样的巨头他们已经积累了大量的用户数据，在某个产品上智能推荐的时候不存在冷启动的问题。

对于很多没有大量用户数据的产品来说，如何在这种情况下设计推荐系统并且让用户对推荐结果满意，从而愿意使用推荐系统，就是冷启动的问题。

### **冷启动问题主要分两大类**：

### **（1）用户冷启动**

用户冷启动主要解决如何给新用户或者不活跃用户做个性化推荐的问题。当新用户到来时，我们没有他的行为数据，所以也无法根据他的历史行为预测其兴趣，从而无法借此给他做个性化推荐。

### **（2）物品冷启动**

物品冷启动主要解决如何将新的物品或展示次数较少的物品推荐给可能对它感兴趣的用户这一问题。

**一般来说，可以参考如下方式来解决冷启动的问题**：

利用用户注册时提供的年龄、性别等数据做粗粒度的个性化推荐；利用用户的社交网络账号登录（需要用户授权），导入用户在社交网站上的好友信息，然后给用户推荐其好友喜欢的物品；要求新注册用户在首次登录时选择一些兴趣标签，根据收集到的用户兴趣信息，给用户推荐同类的物品；给新用户或不活跃用户推荐热门排行榜，然后等到用户数据收集到一定的时候，再切换为个性化推荐。

## **五、评估推荐系统的效果**

推荐系统推荐质量的高低可以通过如下指标进行评估，作为推荐系统的反馈结果他们也是算法模型迭代优化的依据。这些指标有些可以定量计算，有些只能定性描述。

### **（1）预测准确度**

准确度表现在用户对推荐内容的点击率，点击后的各种主动行为（购买、分享等），停留时长等。

### **（2）覆盖率**

覆盖率是描述一个推荐系统对物品长尾的发掘能力。最简单的定义是，推荐系统推荐出来的物品占总物品的比例。

### **（3）多样性**

良好的推荐系统不仅仅能够准确预测用户的喜好，而且能够扩展用户的视野，帮助用户发现那些他们可能会感兴趣，但不那么容易发现的东西。

比如：你在某个电商网站买了一双鞋子，然后你每次登录这个网站他都给你推荐鞋子，这种情况你就会对推荐系统很失望，这就是典型的不具备多样性。假如知道了用户的喜好，推荐系统大部分给他推荐感兴趣的，小部分去试探新的兴趣是更优的策略。

### **（4）新颖性**

新颖的推荐是指给用户推荐那些他们以前没有听说过的物品。

### **（5）惊喜度**

如果推荐结果和用户的历史兴趣不相似，但却让用户觉得满意，那么就可以说推荐结果的惊喜度很高。与新颖性的区别是推荐的新颖性仅仅取决于用户是否听说过这个推荐结果。

### **（6）信任度**

如果你有两个朋友，一个人你很信任，一个人经常满嘴跑火车，那么如果你信任的朋友推荐你去某个地方旅游，你很有可能听从他的推荐，但如果是那位满嘴跑火车的朋友推荐你去同样的地方旅游，你很有可能不去。这两个人可以看做两个推荐系统，尽管他们的推荐结果相同，但用户却可能产生不同的反应，这就是因为用户对他们有不同的信任度。

### **（7）实时性**

推荐系统的实时性，包括两方面：一是实时更新推荐列表满足用户新的行为变化；二是将新加入系统的物品推荐给用户。

### **（8）健壮性**

任何能带来利益的算法系统都会被攻击，最典型的案例就是搜索引擎的作弊与反作弊斗争。健壮性衡量了推荐系统抗击作弊的能力。

参考资料：

项亮.《智能推荐实践》；邢无刀.《推荐系统三十六计》。

本文由 @felixxiao 原创发布于人人都是产品经理。未经许可，禁止转载。

题图来自Unsplash，基于CC0协议

## 【----------------------------】

## AI必备知识：推荐系统

> 本文作者详细介绍了AI推荐系统，并提出了自己的想法。跟着作者思路一起来了解一下吧！

## 一、好的推荐系统

### 1. 什么是好的推荐系统——用户视角

什么是推荐系统?

当你心理产生一个需求的时候，能通过这个工具顺利实现对这个需求的搜索，并获得符合心理预期的产品列表，这个工具我们就称之为——推荐系统。

例如在现实生活中我们经常会用淘宝、京东、百度等产品，人们通常会基于目的（例如买洗面奶、洗发水、图书）的情况下去搜索想要的产品；或是在需求不明确的情况下，期望外部能传达符合自身内心需求的信息。

那么，什么样的推荐系统是好的推荐系统呢？

#### 1.1 用户层面：对用户真正有价值的推荐

1.1.1 符合用户的预期

推荐结果精准，能较大概率的覆盖用户的需求；用户搜索词与推荐物品有较高的匹配度，这里通常用召回率和准确率来衡量上述指标。

- 召回率：正例在实际总的正例中被预测正确的概率
- 准确率：正例被预测正确的概率

1.1.2 让用户产生惊喜

在满足精准性的情况下，推荐系统能挖掘人性需求，帮用户拓展眼界探索未知，产生惊喜。

其体现在推荐结果的多样性，物品间知识关联性等。比如用户搜索古典音乐类书籍，可以在列表中增加与此类型音乐相配的古典舞蹈、茶艺等书籍.

另外，推荐物品不能和用户所购买物品物理绑定。比如用户购买红楼梦上，系统推荐红楼梦下，这个推荐对用户来说并不存在真正心理需求

#### 1.2 系统层面：技术

对用户而言，对推荐结果的预期、反馈的时间、推荐物品更新的频率、系统容错机制等，都会直接影响用户体验。因此在系统层面，一个优秀的推荐系统需具备但不限于：

- 强大抵御并处理噪声数据（例如刷单产生的无效数据）的能力
- 高效数据计算及传输能力
- 稳定的存储机制
- 算法的精准性

#### 1.3 不断完善与优化

就像人一样，只有不断的学习，才能完善自身的知识体系以及对世界的认知，系统亦然。

好的推荐系统一定具备自我学习的能力，通过建立反馈机制和用户进行交互，从而不断优化对用户群体的认知，最终能实现对用户群体的精准聚类，为每类群体建立模型，物品精准投放。

#### 1.4 让用户信服的推荐理由

好的推荐系统势必会让用户产生强烈的信任与依赖感，给用户提供物品推荐的依据——推荐理由。

推荐理由可以体现出系统是如何判断物品进入用户的兴趣范围的。常用的推荐理由大概分为以下四类：

- 热门商品；推荐系统通常都会赋予部分热门商品一定的权重，由于感兴趣的人基数非常大，所以系统判断目标用户感兴趣的概率也较大
- 目标用户的好友同时也喜欢此类物品
- 喜欢某类物品的用户同时也喜欢这类物品
- 与某类物品内容有极大的关联性；这里关联性可以逐步细化，比如基于知识体系的推荐，即不同领域的匹配，或同一领域的梯度匹配等

#### 1.5 实现双赢

好的推荐系统不仅能让用户找到目标物品，也能让商家发现目标/潜在的用户群体，实现共赢。

### 2.什么是好的推荐系统——产品视角

推荐系统都会有一个明确的目的，无论是为了突破技术壁垒还是基于商业目的，最终都会根据目标，通过特定的用户行为数据来判断成功与否。

比如对于电商平台，用户关注、点赞、收藏、加入购物车等操作，都可以在一定程度上衡量推荐结果的精准性，但并未达到此系统的最终目标——支付。

因此我们可以选与系统最终目标最匹配的用户行为，也就是在这个过程中用户付出代价最大的行为作为主要的判断依据，比如购买成功，对此行为赋予相对较大的权重。

## 二、推荐系统架构

通过上面的介绍，大家应该对推荐系统有一个初步的认识了，那么推荐系统是由哪几部分构成呢，在这一部分，我将逐一解答。

大部分推荐系统都是由前台展示页面、后台日志系统和推荐算法系统三部分构成。

### 1. 前台展示页面

前台展示页面是直观展示给用户的界面，通过UI与用户交互，交互产生的用户行为数据将存储在后台日志系统中，开发者根据推荐算法对日志系统中的数据进行处理及分析，最终生成推荐结果。

那么，交互产生的用户行为数据包括哪些呢？

- 用户自身基础属性；即性别、年龄、学历、职业、所在地等，通常来源于用户注册信息或是其他平台数据。
- 用户行为：浏览网页、点击、收藏、购买、点赞、关注等行为。
- 用户行为结果：产生的话题、搜索关键词及反馈（评论/打分）等。

每种类型的数据可以抽象为一种特征，获取方式可来源于目标网站或社交网络。

### 2. 后台日志系统

日志系统主要是用来记录系统运行的轨迹，在记录的同时，跟踪分析错误，审计系统运行的流程。

日志记录的内容通常分为两大类，一是面向用户，二是面向开发者，这里我们更多关注第一类。

用户行为都会存储在日志数据库中，由于用户产生的数据量巨大且速度快，为了保证数据传输的稳定性，可以嵌入高吞吐量分布式消息系统——Kafka。

同时为了提高数据处理效率，通常会设定日志内容边界对检测出的无效数据源（例如刷单数据）先做过滤。当然经过筛选后的数据也并非规整，这就需要对数据进行一定层级的分级分类和格式规范了。

比如用户点击行为，会生成相应的点击日志，用户的每次查询会生成一个展示日志，与此同时会有一个并行的程序将归并点击日志与展示日志。

### 3. 推荐系统算法

有了前端展示后和后端数据之后，那么如何实现他俩的交互呢，这中间需要一个连接的桥梁——推荐系统算法。

推荐系统算法可以抽象为一个规则，只有把这个规则定义好，前端才知道哪些数据该展示并如何展示，后端数据库也知道哪些数据有价值。否则，如果将所有日志内容输出，不仅会增大用户信息检索的困难，系统也就失去了自身意义。

总的来说，推荐系统的实质就是一个用户行为特征与物品特征匹配的过程。

用户端特征包含用户自身、用户行为和用户行为结果三部分；物品特征包含标签、内容（关键词）等。

推荐结果均是基于用户特征及物品特征原始数据，在不同维度（时间、多样性、流行度等）上，根据用户需求赋予权重并进行处理（筛选、排序等）后的结果。即遵循用户—特征—物品过程。当推荐系统生成初始结果后，在通过过滤、排名算法生成最终推荐结果和推荐理由。

推荐引擎可抽象成一种特征，每种特征对应成一种推荐策略，结合不同用户需求，调整每个具体特征上所赋予的权重，最终生成特征物品-特征映射{item：Userfeature}，Userfeature为多个特征权重相加后的最终值。

## 三、常用推荐系统算法

### 1. 常用系统原理介绍

我们从推荐系统具体要解决什么问题以及如何解决问题来剖析原理。

首先，推荐系统要解决的**最核心的两个关键点是**：如何发现用户感兴趣的物品和如何确定物品之间的关系。其次，每个问题分别如何解决呢？

#### 1.1 如何发现用户感兴趣的物品

1.1.1 用户主动告诉系统对哪些类型感兴趣

用户**自行选定感兴趣的关键词**标签，系统将找到与此标签匹配的物品。

1.1.2 通过分析用户行为数据

利用用户在平台的历史浏览记录获取能代表用户的关键词，或导入**社交数据**，获取用户好友列表，从而基于用户好友喜爱物品生成推荐列表。

#### 1.2 如何确定物品与物品间的关系——相似度

相似度计算原理：所有相似度的计算都是基于矩阵的运算。

1.2.1 基于内容（关键词/标签）

大部分物品都会多维度特征，通过特征从而实现与用户的期望得以匹配，常用的是通过物品内容关键词或是给物品打标签的形式来匹配。

1.2.2 协同过滤

协同过滤也是推荐系统中常用的算法，其分为两种，基于用户和基于物品。

那什么是**基于用户**呢？

就是找到和你相似的一个小群体，小群体里面喜欢的东西都是你喜欢的，你获得的推荐结果就是这个小群体喜爱的物品集合。

那什么**基于物品**呢？

基于用户兴趣交集计算物品间的相似度，即喜欢物品i的用户有多少也喜欢物品j，通常用来表示物品间的相似度，同时结合用户历史行为生成推荐列表；用户的历史行为对物品间的相似性也具有一定的贡献度。

这样看来，基于物品的推荐系统，更加个性化同时也一定程度上反映了用户的兴趣传承。

### 2. 如何实现更加精准的分类

仅仅通过用户间兴趣交集生成推列表往往是不够的，在内容、标签的分类以及人群之间的关系上，如何进行深度挖掘？下面几种方法提供了一些优化思路。

#### 2.1 混合推荐

在实际的案例中，单个的推荐模型大多都无法满足预期，所以通常从系统、算法、结果、处理流程上采用不同的混合策略。

例如基于内容增强协同过滤（The content-boosted collaborative filtering recommender），此算法融合了协同过滤和基于内容的算法思想，和基于内容或协同过滤的单个模型相比，它预测能达到比较高的精度，同时它也能解决了数据稀疏和冷启动问题。

#### 2.2 隐语义模型

2.2.1 隐语义概念

类似于协同过滤中基于物品的方法；在每个具体分类中，以用户行为（兴趣）作为物品权重的分配依据。

2.2.2 与协同过滤不同之处（优化点）：

- 物品可以有多个分类维度；基于用户行为决定每个类中物品的权重（eg:如果某类用户群体都对某一物品特别感兴趣，在这类中这个物品的权重就非常大）
- 分类粒度更加细化；比如关于《深入理解OpenCV》这本书原来被划分为【计算机】类，细化之后可以分为【图像处理】类；

#### 2.3 文本精准匹配

为量化文本间的关联度，引入一个概念——TF-idf，通过比对搜索关键词与物品库单个物品的关键词或标签的相似性，从而生成推荐列表。

TF-idf值越大，说明相关性越大，反之；这里对TF-idf公式原理做简要说明加强理解：

> 计算公式：TF-idf =  f(t,d) x idf(t,D)

**TF**：频率；搜索词在特定文档中出现的频率：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ac/rsintro/pdintro2-1.png')" alt="wxmp">

**Idf**：搜索词在其他文档中出现的次数：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ac/rsintro/pdintro2-2.png')" alt="wxmp">

在文档搜索中，不仅要考虑搜索关键词在目标文档出现的频率，也要考虑关键词在其他文档出现的频率。

如果搜索词是大众词语，那么搜索的结果完全不具备参考价值，比如搜索词为the；在idf公式中，分子为所有文档的个数，分母为包含这个关键词的文档个数，如果是大众词语，则：idf=0，TF-idf=0，物品（关键词）间没有相关性。

#### 2.4 利用社交网络数据

社交网络中包含大量的用户数据，能更好的反映用户间的关系，用户关系通常有三种：

- 互为好友（Facebook）
- 单向关注（Twitter）
- 兴趣小组模式（豆瓣小组）

利用社交网络数据进行推荐通常都将用户间的熟悉程度和兴趣相似度作为最主要的两个判别指标。

**用户间熟悉程**度，即通过用户共同好友数量计算；**兴趣相似度**，即通过两个用户喜爱物品的重合度进行衡量。

弊端：用户数据量巨大，数据库读取消耗时间太长。

优化方法：

- 减少数据量；
- 重构数据库；

#### 2.5 时间特征

在日常生活中，物品迭代速度非常快，人们的近期行为通常比远期行为更加符合目前自身兴趣需求，因此在系统满足精准性的情况下，需要考虑推荐系统的**时效性**，根据不同推荐内容赋予时间权重。

例如新闻与经典书籍，新闻更新频繁具有较高的时效性，而经典书籍例如红楼梦，社会对它的需求已经处于平稳，因此时效性不高。

如何将时间权重赋予物品：

- 物品的生命周期：物品生命周期的长短决定了物品的时效性。一个物品随着流行度的增长，在线时长（一个物品在某天被用户产生过行为）也随之增加，斜率越大说明具有较低的时效性生命周期较长（如wikipedia)，斜率越小说明具有较高的时效性生命周期较短（如nytimes）。所以物品生命周期越长，与时间相关性越低。
- 人的兴趣爱好会随着时间而改变，不同阶段所感兴趣的物品差异较大，时间相隔越久，用户对物品产生的行为权重越低，近期行为赋予较高权重。

除此之外，不同物品推荐的**时间点**也是需要考虑因素之一，比如用户在工作时间，尽可能推送与工作相关的资讯或资料，与工作内容不相关的信息做降权，下班时间再适当调整权重。

但是同时也要考虑不同岗位工作状态存在不一致的情况，具体推送情况可以通过每个用户大量的行为数据来判断。

#### 2.6 环境特征

环境特征通常可以与时间特征配合。用户在不同的时间与地点的需求差异可能会很大甚至完全不同，或是在特定的时间与地点，对某种信息的需求会急速上升。

例如用户在纽约旅游，关注点会大量集中在纽约的衣食住行，但如果这个时候推荐系统推荐的信息都是伦敦的，那么结果可想而知。

## 四、 实战篇——如何维护用户数据

当用户数据量太大，例如引入社交网络或是新闻实施推荐，此时如果每次更新都读取一次数据库，那么效率会大幅下降导致用户体验不佳。

目前常用的有两种方案：

### 1. 消息队列

为每个用户维护一个消息队列，里面包含用户的基本属性（如年龄、性别、职业等）、喜爱的物品、朋友圈等。每当这个用户产生新的动作（搜索），系统将根据特定的规则，赋予消息队列中每部分数据的权重。最终获得推荐列表。

这里科普一下什么是消息队列。顾名思义，就是把传输的消息放在队列里，队列，可以抽象为一个容器，所以消息队列，就是一个用作保存传输中的消息容器。

在这个基础上，这个容器**可以跨平台、语言提供可靠的、持久的异步通讯机制**。

- 可靠是指：有且只有一次；有序。
- 异步是指：发送方和接收方可以不同时在线。

另外，通过消息队列还能实现系统解耦，这使得各个系统间可以相对独立运行。

### 2. 建立喜好词关键表

在数据库中，我们为每个用户维护一个**map**，也就是建立**“key-value”**键值对，key对应用户喜好词，value对应喜好程度。

每个新闻会有对应的关键词和Tf-idf值。当用户浏览一篇新闻时，系统会将这篇新闻的关键词和Tf-idf值插入到用户喜好此列表里。如果用户浏览了包含与原有相同关键词的新闻，Tf-idf值会自动相加并更新原有值。同时考虑数据库存储问题，根据具体需求为关键词量设定一个上限。

当然，除了存储问题，这里还有一个新问题：用户兴趣是否会变化呢？

比如在某某手机的发布会前或是世界杯，用户只在这段时间集中关注某一话题，但之后可能完全不在意了，那么在喜好词列表里，如何体现用户兴趣迁移呢？

这里引入一个新概念——**衰减机制**。每一个Tf-idf值乘上一个衰减因子， 同时在喜好列表中设定一个阈值L，当Tf-idf减少到小于L的时候，关键词直接删除。

## 五、未来思考

一个人在群体中的重要性和影响力以及人与人之间一直是难以通过几个参数或几个模型就能判别的，它们均是一个不规则的非线性模型。

平台数据对于深度挖掘人与人之间的关系来说其实是微不足道的，在现实生活中，人与人之间的关系本来就难以定论，存在着**表层关系与深层关系**。

表层关系具体是指社会赋予你们的关系，比如同事、上下属、同学等，深层关系则是指你们除了是同事以外，可能私下里是有着相同的兴趣爱好的朋友。

表层关系通常可以用数据挖掘定义，比如两个人的通话记录（这里不是指通话内容，而是打电话的时间、时长等）、位置信息等，但是外部信息数据通常会根据个人习惯而产生误差。

其实，对推荐系统的理解等价于**对人性的理解**；挖掘人与人的关系、人与物的关系、物与物的关系。

除了人们主动表达的需求，我认为最重要的，其实是人性的欲望。所谓道生一，一生二，三生万物，万物由道生出，而欲望乃道的其中一个产物。所以欲望通常不会平白无故的产生，欲望与欲望之间也不会毫无关联，个人的成长经历及生活环境造就了一个人的性格，让他养成了一些习惯。

习惯通常是有形无意识表达，而欲望通常是无意识无形表达。我在想，是否把习惯与欲望结合起来，是否就是对人性的建模。大数据时代，通过大量的用户成长数据与环境数据或许可以适当挖掘其中规则，但更加深入的，其实是要推导因果的关系。

参考文献：

[1] 新闻推荐系统：基于内容的推荐算法——TFIDF、衰减机制

[2]《推荐系统实战》；

[3]《日志系统设计》

[4]《消息队列应用场景》

[5] 推荐系统的混合加权技术研究

[6] Xiaoyuan Su and Taghi M. Khoshgoftaar, “A Survey of Collaborative Filtering Techniques”,Advances in Artificial Intelligence,2009.


本文由 @ShallyFeng 原创发布于人人都是产品经理。未经许可，禁止转载

题图来自 Unsplash ，基于 CC0 协议

## 参考文章
* https://baijiahao.baidu.com/s?id=1622806220749705800&wfr=spider&for=pc
* http://www.woshipm.com/ai/1064987.html