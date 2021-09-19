---
title: 数据挖掘-开发流程总结
---

::: tip
本文主要是介绍 数据挖掘-开发流程总结 。
:::

[[toc]]

## 一、不变的招式

虽然数据分析，数据挖掘，一说预测看起来高大上，但是其实是有套路的，预测的代码大致都长下面这个样子

``` py
## 1.选择算法模型
model=new 算法模型()
## 2.开始训练（传入训练集特征train_x和训练集结果train_y）
model.fit(train_x, train_y)
## 3.预测结果（传入测试集test_x）
prediction=model.predic(测试集test_x)
## 4.计算准确率（对比预测结果prediction和测试集真实结果test_y）
准确率=metrics.accuracy_score(prediction, test_y)
```

套路说明：

- 1. 将已有的数据分成两部分，分别是训练集 (train_x,train_y)和测试集(test_x,test_y)
- 2. 每个集合都包含两部分数据，特征值x和结果值y
- 3. 选用算法模型，将训练集(train_x,train_y)进行训练，对测试集test_x进行预测得到预测结果prediction
- 4. 将预测结果prediction和真实结果test_y进行比对，得到预测的准确率

上面这些只是招式，其实内功都在模型上，那我们怎么判断内功比较厉害呢？

## 二、如何判断内功厉不厉害

模型就是内功，内功厉不厉害主要看下面这些指标，内功越强，预测的越准

### 1.准确率

- 准确率：accuracy
- 大部分情况，我们都可以使用预测的数据和真实的数据，挨个比对来获得`准确率`
- 对于正例比例极低的情况，比如

``` py
信用卡欺诈
某些疾病的识别
恐怖分子的判断
```

这种获取的是占很小的一部分，就需要用`精确率-召回率`来进行统计

### 2.精确率和召回率

- 精确率(Precision)：检索出来的正确条目数占检索出来的总条目数的多少，衡量的是查准率；
- 召回率(Recall)：检索出的正确的条目占全部正确条目数的多少，衡量的是查全率
比如，推荐系统根据你的喜好，推荐了10个商品，其中真正相关的是5个商品，在所有的商品库中，相关的商品一共有20个，则精确率 = 5/10，召回率 = 5/20

举个例子：

从一个大米和小麦混合的袋子里，抓一把大米，我们肯定希望抓出来的大米越多越好(精确率高)，然后我们还希望就是希望一把抓出来的是所有的大米(召回率高)，简单的说就是一个找的对，一个找的全。

关于模型的原理，可以查看[从小白视角理解 数据挖掘十大算法](https://www.cnblogs.com/chenqionghe/p/12301905.html)

## 三、代码套路和技巧

### 1.如何得到训练集和测试集

我们已经有了数据，需要将数据分成两部分：训练集和测试集

比如可以8成用来训练，2成用来测试结果，sklearn提供了train_test_split stratify函数，可以非常方便的为我们分割数据。

[train_test_split](https://scikit-learn.org/stable/modules/generated/sklearn.model_selection.train_test_split.html#sklearn.model_selection.train_test_split) 可以帮助我们把数据集抽取一部分作为测试集，这样我们就可以得到训练集和测试集。

参数

> train_data：所要划分的样本特征集
> train_target：需要划分的样本结果
> test_size / train_size: 测试集/训练集的大小，若输入小数表示比例，若输入整数表示数据个数。
> random_state：随机数种子，如果需要重复试验，可以指定非0值，将保证得到一组一样的随机数
> shuffle：是否打乱数据的顺序，再划分，默认True。
> stratify：none或者array/series类型的数据，表示按这列进行分层采样。

### 2.如何搜索最优的参数

GridSearchCV是参数自动搜索模块，只需要传入需要要调优的参数及参数的取值范围，它会把所有的参数都执行一遍，然后找出最优的，本质是一种穷举法

``` py
from sklearn.model_selection import GridSearchCV
## 初始化算法模型
model=算法模型()
## 设置参数值取值范围
params={"n_estimators": range(1,11)}
## 使用GriSearchCV找出最优参数
clf=GridSearchCV(estimator=model, param_grid=params)
## 执行训练
clf.fit(iris.data, iris.target)
## 得到最优分数和最优参数
print("最优分数： %.4lf" %clf.best_score_)
print("最优参数：", clf.best_params_)
```

### 3.如何对数据进行规范化

StandardScaler 可以采用Z-Score规范化数据，得到数据规范化为均值为 0，方差为1的正态分布

``` py
train_x = StandardScaler().fit_transform(train_x)
```

### 4.如何进行流水线作业

Python 有一种 Pipeline 管道机制。管道机制就是让我们把每一步都按顺序列下来，从而创建 Pipeline 流水线作业。每一步都采用 (‘名称’, 步骤) 的方式来表示。

比如我们可以把`数据规范化->搜索最优的参数`合成一步，写到一个Pipline中

``` py
rf = RandomForestClassifier()
parameters = {"randomforestclassifier__n_estimators": range(1,11)}
iris = load_iris()
pipeline = Pipeline([
        ('scaler', StandardScaler()),
        ('randomforestclassifier', rf)
])
## 使用GridSearchCV进行参数调优
clf = GridSearchCV(estimator=pipeline, param_grid=parameters)
## 对iris数据集进行分类
clf.fit(iris.data, iris.target)
print("最优分数： %.4lf" %clf.best_score_)
print("最优参数：", clf.best_params_)
```




## 参考文章
* https://www.cnblogs.com/chenqionghe/p/12322825.html