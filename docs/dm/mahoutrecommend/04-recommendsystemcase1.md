---
title: Mahout-推荐系统案例(一)
---

::: tip
本文主要是介绍 Mahout-推荐系统案例(一) 。
:::

[[toc]]

## mahout推荐系统

本章包含以下内容：

- 首先看一下实战中的推荐系统
- 推荐引擎的精度评价
- 评价一个引擎的准确率和召回率
- 在真实数据集：GroupLens 上评价推荐系统

我们每天都会对喜欢的、不喜欢的、甚至不关心的事情有很多观点。这些事情往往发生的不知不觉。你在收音机上听歌，因为它容易记住或者因为听起来可怕而关注它 — 又或者根本不去关注它。同样的事情有可能发生在T恤衫，色拉，发型，滑雪胜地，面孔，电视节目。

尽管人们的爱好差异很大，但他们仍然遵循某种模式。人们倾向于喜欢一些事物，这些事物类似于他们自己喜欢的其他事物。因为我喜欢培根-生菜-西 红柿三明治，你可能猜到我可能也喜欢总汇三明治，类似于前者的带有火鸡肉的三明治。另外，人们倾向于喜欢兴趣和他们相似的人所喜欢的事物。当一个朋友进入设计学校，发现几乎周围所有同学都用一个苹果电脑 — 不用吃惊，他已经是一个终生的苹果用户。

这些模式可以用来预测喜好与否。如果将一个陌生人带到你面前并问你，她是否喜欢指环王三部曲，你只能胡乱猜测了。但是，如果她告诉我们她喜欢头 两部指环王，如果她不喜欢第3部，你会感到震惊。另一种情况，如果她说讨厌指环或者问“什么王？”，你可以准确的猜测她对指环王不感兴趣。

推荐系统是关于这些预测偏好模型的系统，并且使用他们为你发现新的、称心的事物。

## 1 推荐系统是什么

你因为某种原因从书架上拿起这本书。可能你看到它临近其他的你熟知的书，发现他们是有用的，想到书店是因为喜欢那些书的人也会喜欢这本书才把他们放到一起。也可能你看到这本书在你同事的书架上，你和这个同事经常分享机器学习方面的知识，或者他直接将这本书推荐给你。

后面的章节探索了人们实现推荐系统的很多方法，发现新事物，当然有这些过程在Mahout软件中是如何实现的。我们已经提到一些策略：为了发现你喜欢的items，你可能去寻找有相同兴趣的人。另一方面，你可以由其他人的明显偏好计算出类似你喜欢的items的其他items。这描述了两大类推 荐系统算法：“user-based”和“item-based”推荐系统。

### 1.1 协同过滤 vs 基于内容的推荐

严格的讲，上面章节提到例子是“协同过滤” — 仅仅基于user和item关系的生产推荐系统。这些技术不需要item自己的属性信息。在某种程度上，这是一个优点，该推荐系统框架不需要关心“item”是书、主题公园、花、甚至人，因为他们的任何属性都没有作为输入数据。

有很多其他的方法基于item的属性，一般被称之为“基于内容”的推荐技术。例如，如果一个朋友推荐一本书给你，因为这是一本Manning出版的书，这个朋友喜欢其他Manning的书，那么你的这个朋友在做类似于基于内容推荐的事情。这种想法基于书籍的属性：出版社。Mahout推荐框架没 有直接实现这些技术，尽管它提供一些方法将item的属性信息添加到计算中。基于这些，技术上称前面的方法为协同过滤框架。

这些技术没有没什么问题；正相反，他们工作的很好。他们是特定领域的方法，可能很难有效地将他们整理到一个框架中。为了建立一个基于内容的图书 推荐系统，我们需要决定书籍的哪些属性对推荐系统是有意义的、作用多少程度 — 页数、作者、出版社、颜色、字体。但是这些知识不能简单的应用于别的领域；像图书推荐的方法对披萨配料推荐是没什么帮助的。

基于这个原因，Mahout没有过多涉及这种类型的推荐。可以将这些想法融入进来，但首要任务是Mahout提供些什么。其中的一个样例将在下 一个章节中讲解，在那里你将建立一个约会网站的推荐引擎。在介绍完Mahout基于协同过滤推荐的实现后，你有机会探索它和基于内容的推荐之间关系的细 节。

### 1.2 推荐系统成为主流

现在，很多人已经看到了推荐系统在现实网站上的实现，像Amazon或者Netflix：基于浏览和交易历史，页面将产生一个认为对你有吸引力 的商品列表。这类推荐引擎在上世纪九十年代已经出现，但直到现在它仍然是使用大型计算机的专门研究者的领域。因为这些技术已经变更加主流，对它们的需求在增加，开源实现的提供也是一样。随着理解的深入和计算资源越来越廉价，推荐引擎变得越来越容易接近和广泛使用。

实际上，推荐技术不只是为用户推荐DVD类似的东西。这种方法非常通用，可以用来评估很多事物之间的关系的强弱。

在社区网络中，一个推荐系统可以为用户推荐用户。

## 2 运行你的第一个推荐引擎

Mahout包含了一个推荐引擎 — 有很多类型，实际上都是源于传统的user-based和item-based推荐系统。它还包含了基于“slope-one”技术的实现，一个新的、有 效的方法。你将会找到很多实验性的、初步的的SVD（singular value decomposition）实现。下面的章节将重新看Mahout的内容。在这些章节中，你将看到数据展示、浏览可用的推荐算法，评价推荐系统的有效 性，针对特殊问题协调和定制推荐系统，最后看一下分布式计算。

### 1 创建输入数据

为了探索Mahout中的推荐系统，最好从一个很小的示例入手。推荐系统的输入是必要的 — 这些数据是推荐的基础。因为非常熟悉的推荐系统引擎将item推荐给user，很容易的认为偏好是user和item之间的联系 — 尽管前面提到了user和item可以是任何事物。偏好包含了一个user ID和一个item ID，通常情况下，一个数值代表了user对item偏好的强度。Mahout中ID都是数值，实际上是整数。偏好值可以是任何值，值越大代表这正向偏好 越大。例如，这些值可能是1到5的打分，user将1给于他不喜欢的，5给他很喜欢的。

创建一个文本文件包含用户数据，命名为“1”到“5”，他们对四本书的偏好，简单的称之为“101”到“104”。在现实情况中，这些可能是公 司数据库中消费者ID和产品ID；Mahout并不需要user和item的ID一定为数值类型。使用下面的格式，生成文件intro.csv。

``` shell
1,101,5.0

1,102,3.0

1,103,2.5

2,101,2.0

2,102,2.5

2,103,5.0

2,104,2.0

3,101,2.5

3,104,4.0

3,105,4.5

3,107,5.0

4,101,5.0

4,103,3.0

4,104,4.5

4,106,4.0

5,101,4.0

5,102,3.0

5,103,2.0

5,104,4.0

5,105,3.5

5,106,4.0
```

经过一些学习之后，趋势就显现出来了。用户1和用户5具有相同的兴趣。他们都喜欢101这本书，对102的喜欢弱一些，对103的喜欢更弱。同理，用户1和4具有相同的兴趣，他们都喜欢101和103，没有信息显示用户4喜欢102。另一方面，用户1和用户2的兴趣好像正好相反，用户1喜欢 101，但用户2讨厌101，用户1喜欢103而用户2正好相反。用户1和3的交集很少，只有101这本书显示了他们的兴趣。看图2.1可能显现了 user和item之间的关系，可能是正的也可能是负的。

 

### 2 创建推荐系统

那么你应该给用户1推荐哪本书？不是101, 102或者103，因为用户已经知道自己对他们感兴趣，推荐系统需要发现新的事物。直觉告诉我们，用户4、5与用户1类似，所以推荐一些用户4和5喜欢的 书籍给用户1可能是不错的。这样使得104、105和106成为可能的推荐。整体上看，104是最有可能的一个推荐，这基于item 104的4.5和4.0的偏好打分。现在运行下面的代码：

Listing 2.2 a simple user-based recommender program withmahout 代码 

``` java
import java.io.File;
import java.io.IOException;
import java.util.List;

import org.apache.mahout.cf.taste.common.TasteException;
import org.apache.mahout.cf.taste.eval.RecommenderEvaluator;
import org.apache.mahout.cf.taste.impl.common.LongPrimitiveIterator;
import org.apache.mahout.cf.taste.impl.eval.AverageAbsoluteDifferenceRecommenderEvaluator;
import org.apache.mahout.cf.taste.impl.model.file.FileDataModel;
import org.apache.mahout.cf.taste.impl.neighborhood.NearestNUserNeighborhood;
import org.apache.mahout.cf.taste.impl.recommender.GenericUserBasedRecommender;
import org.apache.mahout.cf.taste.impl.similarity.EuclideanDistanceSimilarity;
import org.apache.mahout.cf.taste.model.DataModel;
import org.apache.mahout.cf.taste.recommender.RecommendedItem;
import org.apache.mahout.cf.taste.recommender.Recommender;
import org.apache.mahout.cf.taste.similarity.UserSimilarity;

public class UserCF {
    
    final static int NEIGHBORHOOD_NUM = 2;
    final static int RECOMMENDER_NUM = 3;
    
    public static void main(String[] args) throws IOException, TasteException {
        String file = "D:/yangkl/人工智能/datafile/item.csv";
        DataModel model = new FileDataModel(new File(file));
        UserSimilarity user = new EuclideanDistanceSimilarity(model);
        NearestNUserNeighborhood neighbor = new NearestNUserNeighborhood(NEIGHBORHOOD_NUM, user, model);
        Recommender r = new GenericUserBasedRecommender(model, neighbor, user);
        LongPrimitiveIterator iter = model.getUserIDs();
    
        while (iter.hasNext()) {
            long uid = iter.nextLong();
            List<RecommendedItem> list1 = r.recommend(uid, RECOMMENDER_NUM);
            
            System.out.printf("uid:%s", uid);
            for (RecommendedItem ritem : list1) {
                
                System.out.printf("(%s,%f)", ritem.getItemID(), ritem.getValue());
            }
            System.out.println();
        }
                
  
        
        
    }

}
```



 

A 加载数据文件

B 创建推荐系统引擎Createthe recommender engine

C 对user1, 推荐一个item

为了简洁，后面许多其他章节的示例中，代码列表将省略imports、类声明、方法声明，只是重复程序语句。为展示很好的展示各个模块之间的关系，请看图2.2。并不是Mahout中所有的推荐都是这样的，但这幅图可以给你一个样例的逻辑的初步印象。

接下来两章，在更细节的讨论这些模块之前，我们可以总结一下每个模块所扮演的角色。DataModel存储了所有的偏好信息，提供了对user 和item信息的访问。UserSimiliarity提供了两个用户如何相似的概念，这可能基于很多可能的矩阵和计算之一。 UserNeighborhood定义了一个给定用户的用户组的概念。最终，一个推荐系统将这些模块组合在一起将items推荐给users和相关功能。

### 3 分析输出

使用你细化的IDE编译运行，运行程序的输出应该是：RecommendedItem[item:104,value:4.257081]

请求一个推荐结果并得到一个。推荐系统引擎将书104推荐给用户1。甚至，这样做是因为推荐系统引擎将用户1对书104的偏好是4.3，这是所有推荐结果的最高打分。

这个结果并不算坏。107没有出现，本应该也是可以推荐的，但它只是和另一个具有不同爱好的user相关联。选104而不是106，因为104的打分高一些。还有，输出结果包含了一个用户1喜欢104的评估值 — 是介于用户4和5所表示的介于4.0和4.5的一个值。

直接看数据正确的结果并不明显，但是推荐系统引擎推荐了一个得体的结果。如果对从这个简单程序给出的有用并不明显的结果感到有一种愉快的刺痛，那么机器学习的世界是适合你的。

小数据集、产生推荐结果是一件微不足道的事情。现实中，数据集很大，并且噪声数据很多。例如，想象一个新闻网站推荐新闻给用户。偏好从文章的点 击中获取。但是，这里面的很多点击都是伪造的 — 可能很多读者点击一篇文章但他不一定喜欢它，或者点错了。可能很多点击都是在未登录的时候发生的，不能将其关联到一个用户。想象一下数据集有多大，可能是每月几十亿的点击量。

要从数据集产生正确的推荐结果并快速计算出是一件不一般的事情。稍后我们将展示工具Mahout如何解决这些问题。他将展示标准方法如何产生差的推荐结果或者占用了大量的cpu和内存时间，如何配置Mahout以提升性能。

## 3 评价推荐系统

整个评估的原理就是将数据集中的一部分数据作为测试数据。也就是这一部分数据程序不可见，然后推荐引擎通过剩余的训练数据推测测试数据的值，然后将推测值与真实的测试数据进行比较。

### 比较的方法有平均差值:
就是每一项与真实数据做差然后求平均值，另一种方式就是均方根。就是差值求平方和，然后求平方和的平均值，然后取平方根。这种方式会放大差值的影响，比如推荐的结果中差一个星值，产生的影响远大于1倍的影响就可以使用这种评估算法。

“真实偏好”并不充分，没有人会知道你将来是否会喜欢一些新的item。推荐引擎可以通过设置一部分真实数据作为测试数据。这些测试数据偏好在训练集中并不展示偏好值 — 要求推荐系统对这些缺少偏好值的数据作出评估，并比较和实际值的差距。

对于推荐系统产生一系列打分是很简单的。例如，

计算评估值和实际值之间的平均距离，在这种方法下，分值越低越好。0.0表示非常好的评估 — 评估值和实际值根本没有差距。

### 均方根（root-mean-square）也是一种方法，也是分值越低越好。

上面的表中展示了实际偏好度和评估偏好度集合的不同值，以及如何将它们转化为打分。均方根能比较重的处罚距离远的，例如item2，这是基于某种考虑在内的。因为平均距离容易理解，接下来的示例将使用它作为评估方法。

### 3.1 运行RecommenderEvaluator

下面是代码示例：

大部分的操作发生在evaluate()这个方法中。内部，RecommenderEvaluator将数据划分为训练集和测试集，创建一个新的训练DataModel和推荐引擎测试，比价评估结果和实际结果。

注意，没有将Recommender传给方法，这是因为在其内部，将基于创建的训练集的DataModel创建一个Recommender。所以调用者必须提供一个RecommenderBuilder对象用于从DataModel创建Recommender。

### 3.3 评估结果

程序打印出了评估结果：一个表明推荐系统表现如何的打分。在这种情况下你能看到很简单的1.0。尽管评价器内部有很多随机方法去选择测试数据，结果可能是一致的因为RandomUtils.useTestSeed()的使用，每次选取的随机数都一样。这只用于示例、单元测试来保证重复的结果。不要在真是数据上用它。

AverageAbsoluteDifferenceRecommenderEvaluator

基于AverageAbsoluteDifferenceRecommenderEvaluator实现，得到的这个值是什么含义？1.0意味着，平均意义上，推荐系统评估偏好和实际偏好的的距离是1.0.

1.0早1-5规模上并不大，但是我们的数据太少。如果数据集被随机划分结果可能不一样，因此训练、测试数据集可能每次跑都不一样。

这种技术可以应用于任何Recommender和DataModel。使用均方根打分的实现类RMSRecommenderEvaluator

替代AverageAbsoluteDifferenceRecommenderEvaluator。

evaluate()的null参数是DataModelBuilder的实例，用于控制训练DataModel是如何从训练数据上建立的。正常情况下默认就好，如果需要，可以使用特别实现的DataModel。DataModelBuilder用于将DataModel注入评价过程中。

参数1.0表示使用整个数据集的比例。这样用于产生一个很快的、可能精度低一些的评价方式。例如，0.1可能意味着用数据集的10%，忽略其他90%。这对于快速检测到Recommender的细微变化是非常有用的。

## 4 评估准确率和召回率

借用更普遍的看法，我们接收经典的信息检索矩阵去评价推荐系统：准确率和召回率。这些是用于搜索引擎的术语，通过query从众多可能结果中返回最好结果集。

一个搜索引擎不应该在靠前的结果中返回不相关的搜索结果，即使他致力于得到尽可能多的相关结果。”准确率”是指在靠前的结果中相关结果所占的比 例，当然这种相关是某种程度上我们定义的相关。”precisionat 10″应该是从前10个结果中判断得到的准确率。“召回率”靠前的结果中相关结果占的比例。看图2.3可以有一些直观的概念。

这些术语也可以应用到推荐系统中：准确率是靠前的推荐中好的推荐所占的比例，召回率是指出现在靠前推荐中好的推荐占整个好的推荐的比例。

### 4.1 运行RecommenderIRStatsEvaluator

Mahout提供了非常简单的方式为推荐系统计算结果。



## 5 评价GroupLen数据集

有了这些工具在手，我们不仅可以考虑速度，还要考虑推荐系统的效率。尽管大量数据集的例子还在几章以后，小数据集上评价性能已成为可能。

### 5.1 抽取推荐系统输入

GroupLens (http://grouplens.org/)是一个研究型的项目。提供了很多不同大小的数据集。每个都是用户对电影打分的真实数据。这是几个大的真实可用数据集之一，更多的将会在本书后续探寻。从GroupLens网站上下载“100K data set”,http://www.grouplens.org/node/73.解压下载文件，在解压后后，有一个叫ua.base的文件。该件tab分割userIDs, itemIDs, ratings（偏好值）和其他信息。

这个文件能使用吗？Tabs, 不是逗号，分隔字段，在每行结尾还有一个额外的字段。答案是肯定的。该文件可以类似FileDataModel的读取。回到前面列表2.3，试着用 ua.base的路径代替小文件路径。重新跑一遍数据。这时，评估可能需要几分钟，因为数据量是100k。

最后，你应该得到一个大约0.9的值。这不算坏，尽管值几乎分布在1-5区间内，听起来还不错。可能特殊的推荐系统对这种类型的数据来讲是不完全的？

### 5.2 其他推荐系统实验

在这个数据集上测试“slope-one” ，一个简单的算法，在后面的章节中会讲到。很容易替换RecommenderBuilder，使用org.apache.mahout.cf.taste.impl.recommender.slopeone.SlopeOneRecommeder, 像这样：


运行评价方法。你应该发现它很快，得到一个大约是0.748的值。正朝好的方向发展。

这并不能说明slope-one算法总是很快、很好。在给定数据集上，每一个算法都有自己的特性和属性，这些属性很难去检测出来。例如，slope-one算法运行时能够很快的计算推荐过程，但是它需要在计算前需要花费很大一部分时间构建内部数据结构。基于用户的推荐引擎，能够在其他数据集上拥有很快的计算速度和更高的准确度，我们将在第四章探索各种算法的优点。

 
## 6 总结

在这一章我们介绍了推荐引擎的思想。我们创建了一些简单的Mahout Recommender的输入，运行一个简单计算，然后输出结果。

然后，我们花时间介绍了推荐引擎系统的数据结果的质量评价，因为接下来的章节会频繁用到。这一章包含了评价推荐引擎的准确性，像传统的准确性和召回率。最后，我们尝试去评价GroupLens的真实数据集，观察如何将评价结果用于推荐引擎的性能提升上。

在我们继续详细学推荐引擎之前，需要花一些时间去了解另一个Mahout中推荐系统的基本概念：数据表示。接下来一章会着重讲这一点。

## 参考文章
* https://www.cnblogs.com/yuluoxingkong/p/7942102.html