---
title: Pytorch-图像识别案例(二)
---

::: tip
本文主要是介绍 Pytorch-图像识别案例(二) 。
:::

[[toc]]

## 转载：深度学习之PyTorch实战（3）——实战手写数字识别

## 如果需要小编其他论文翻译，请移步小编的GitHub地址

　　传送门：[请点击我](https://github.com/LeBron-Jian/DeepLearningNote)

　　如果点击有误：https://github.com/LeBron-Jian/DeepLearningNote

　　上一节，我们已经学会了基于PyTorch深度学习框架高效，快捷的搭建一个神经网络，并对模型进行训练和对参数进行优化的方法，接下来让我们牛刀小试，基于PyTorch框架使用神经网络来解决一个关于手写数字识别的计算机视觉问题，评价我们搭建的模型的标准是它是否能准确的对手写数字图片进行识别。

　　其具体的过程是：先使用已经提供的训练数据对搭建好的神经网络模型进行训练并完成参数优化，然后使用优化好的模型对测试数据进行预测，对比预测值和真实值之间的损失值，同时计算出结果预测的准确率。在将要搭建的模型中会使用到卷积神经网络模型，下面让我们开始学习吧。

##  知识储备——深度学习中的常见概念

## 1：MNIST数据集的了解

　　MNIST数据集是一个已经被“嚼烂”了的数据集，很多教程都会对他“下手”，几乎成为了一个典范。

　　 具体详情请参考 [Yann LeCun's MNIST page ](http://yann.lecun.com/exdb/mnist/)或[ Chris Olah's visualizations of MNIST.](http://colah.github.io/posts/2014-10-Visualizing-MNIST/)

　　下载下来的文件如下：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ad/pytorch/case2/1226410-20181030155310554-424151723.png')" alt="wxmp">

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ad/pytorch/case2/1226410-20181030155248403-1557756165.png')" alt="wxmp">

 　可从该页面获得的MNIST手写数字数据库具有60,000个示例的训练集和10,000个示例的测试集。它是NIST提供的更大集合的子集。数字已经过尺寸标准化，并以固定尺寸的图像为中心。

　　对于那些希望在实际数据上尝试学习技术和模式识别方法，同时在预处理和格式化方面花费最少的人来说，它是一个很好的数据库。

## 2：梯度递减算法

　　在对决策函数进行优化的时候，通常是针对一个误差的度量，比如误差的平方，以求得一系列参数，从而最小化这个误差度量的值来进行的，而目前一般采用的计算方法是梯度递减法（Gradient Descent Method ）。这是一个非常形象的名字，好比一个游客要从某个不知名的高山上尽快，安全的下到谷底，这时候需要借助指南针来引导方向。对于这个游客，他需要在南北和东西两个轴向上进行选择，以保证下山的路在当前环境下即使最快的，又是最安全的。我们可以将南北和东西两个轴向想象成目标函数里面的两个维度或者自变量。那么这个游客怎么获取这个最优的路径呢？

　　在山顶的时候，游客因为不能完全看到通往谷底的情况，所以很可能随机选择一条路线。这个选择很多时候很关键。一般山顶是一块平地，有多个可以选择下山的可能点。如果真正下山的路线是在某个地方，而游客选择了另外一个地方，则很有可能最终到不了真正的谷底，可能到达半山腰或者山脚下的某一个地方，但是离真正的谷底差距可能不小。这就是优化问题中的由于初始化参数不佳导致只能获取局部最优解的情况，下图就形象的展示了这样的情况。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ad/pytorch/case2/1226410-20181029185543940-614592871.png')" alt="wxmp">

在优化算法中初始值的影响

　　梯度递减法是一种短视的方法，好比游客在下山的时候遇到非常浓的大雾，只能看见脚下一小块的地方，游客就把一个倾角计放在地上，看哪个方向最陡，然后朝着最陡的方向往下滑一段距离，下滑的距离通常根据游客对当前地形的审视度势来决定，停下来，再审视周边哪个方向现在是最陡的。继续重复上面的倾角计算并往下滑的动作，这跟优化中常用的最陡下降法很类似，可以看做最陡下降法的一个特例。在最陡下降法中，参数的更新使用如下公式：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ad/pytorch/case2/1226410-20190426082911603-363083405.png')" alt="wxmp">

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ad/pytorch/case2/1226410-20190426082930793-1424045889.png')" alt="wxmp">

 

 

　　但是在使用梯度递减法求解神经网络模型时，通常使用的是随机梯度递减法（Stochastic Gradient Descent），其公式如下：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ad/pytorch/case2/1226410-20181029190225521-1476060551.png')" alt="wxmp">

　　这个算法有如下几点变化：

```python
 首先，在计算时不是通览所有的数据后再执行优化计算，而是对于每个观测值或
者每组观测值执行梯度递减的优化计算。原来的那种算法因此被叫作批量（Batch）
或者离线（Offline）算法，而现在这种算法则被称为递增（Incremental）或者
在线（Online）算法，因为参数估计值随着观测组的更新而更新。
 
    其次，这个步进值通常从一开始就固定为一个较小的值。
 
    最后，通过上述公式可以看出，参数更新部分不仅取决于一阶偏微分的大小，还
包含了一个动量项 这个动量项的效果是将过去的累计更新项的一部分加入到当前参
数的更新项中，即把过去每一步的更新做一个指数递减的加权求和，可以看作对过
往的更新值的记忆，越远的记忆影响越小，越近的记忆影响越大。这有助于算法的
稳定性。如果步进值极小，而动量项里的控制变量α接近于数值1，那么在线算法就
近似于离线算法。
```

 　下图对梯度递减算法进行了形象的展示：

 <img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ad/pytorch/case2/1226410-20181029190425253-418506608.png')" alt="wxmp">

　　虽然现在最常见的算法是基于一阶偏微分的梯度递减法，但是跟其他几种以前常用的基于二阶偏微分的优化算法进行比较还是比较有趣的，有助于读者更好地理解这些算法。
　　基于二阶偏微分的算法通常统称为牛顿法，因为使用了比一阶偏微分更多的信息，可以看作游客在下山的过程中雾小了点，能直接看到周边的地势。假定整座山是一个平滑的凸形状，游客就可以一路下滑到谷底，不用中途停下来。当然，这个谷底也不能保证是最低的，有可能也是某个半山腰的洼地，因为还是有雾，游客无法彻底看清整个地势。
　　对一般的牛顿法的一种改进叫作增稳牛顿法（Stabilized Newton Method）。这种方法相当于游客带了一个高度计，因此他在滑下去以后可以查看结果，如果发现地势反而增高了，那么游客退回到原来的地方，重新跳一小步，从而保证每次下滑都能到达更低的点。对这种方法的进一步改进叫作岭增稳牛顿法（Ridge Stabilized NewtonMethod）。这种方法在上一种方法的基础上，游客不仅可以退回到原来的地方，而且重新下滑时还可以选择跳的方向，以保证有更多的机会使得下滑都离谷底更进一步。

　　对于深度学习模型中的函数，我们看到在每一层的节点都是一个激活函数套着一个组合函数的形式（参见图3.5），即常见的复合函数形式，那么在参数更新部分就需要用到微积分里面的链式法则（Chain Rule）来计算复合函数的导数

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ad/pytorch/case2/1226410-20181029190558092-1425656768.png')" alt="wxmp">

　　如果假设损失函数使用均方差，同时采用logistic的sigmoid激活函数，而组合函数是求和函数，则采用链式法则求解参数的更新可以写作：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ad/pytorch/case2/1226410-20181029190624201-1068185458.png')" alt="wxmp">

　　将上述公式带入前面提到的梯度递减算法的参数更新步骤中，就可以得到新的参数估计。更新偏置项b采用几乎一样的公式，只是这个时候x=1，因此上面公式中最后的x就消掉了。

## 3：后向传播算法

　　上一节对梯度递减算法进行了介绍，如果这个神经网络只有一层，那么反复运用这个算法到损失函数，依照上面公式更新参数直到收敛就好了。如果神经网络模型是一个深度模型，在输入层和输出层之间包含很多隐含层的话，就需要一个高效率的算法来尽量减少计算量。后向传播算法（Backpropagation）就是一种为了快速估计深度神经网络中的权重值而设计的算法。

　　设定f0，···，fN代表1，···，N层的决策函数，其中0对应于输入层，而N对应于输出层。如果已知各层的权重值和偏置项估计值，那么可以采用下面的递归算法快速求得在当前参数值下的损失函数大小：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ad/pytorch/case2/1226410-20181029190737173-796535986.png')" alt="wxmp">

　　为了更新参数值，即权重值和偏置项的估值，后向传播算法先正向计算组合函数和其他相关数值，再反向从输出层N求解损失函数开始，按照梯度递减算法逐次往输入层回算参数的更新量。
<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ad/pytorch/case2/1226410-20181029190815462-415425803.png')" alt="wxmp">

 

 　在深度学习模型所需的计算中会大量使用链式法则，这就会使很多计算结果得到重复使用，后向传播算法将这些中间结果保存下来可以极大地减少计算量，提高模型拟合速度。因为在每一层都使用同样的函数：f：R→R，在这些层中，有：f（1）=f（w），f（2）=f（f（1）），f（3）=f（f（2）），其中上标代表对应的网络层，要计算<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ad/pytorch/case2/1226410-20181029190909964-1294163308.png')" alt="wxmp">可以通过链式法则得到：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ad/pytorch/case2/1226410-20181029190930549-650306760.png')" alt="wxmp">

　　可以看到，只需计算f（w）一次，保存在变量f（1）中，就可以在以后的计算中使用多次，层数越多，效果越明显。相反，如果不是反向求解参数更新量，而是在正向传播那一步求解参数更新量，那么每一步中的f（w）都要重新求解，计算量大增。可以说，后向传播算法是神经网络模型普及的基础之一。

## 实战手写数字识别

　　手写数字识别是一个比较简单的任务，数字只可能是0-9中的一个，这是个10分类的问题。

　　MNIST手写数字识别项目因为数据量小，识别任务简单而成为图像识别入门的第一课，MNIST手写数字识别项目有如下特点：

　　（1） 识别难度低，即使把图片展开为一维数据，且只使用全连接层也能获得超过98%的识别准确度。

　　（2）计算量小，不需要GPU加速也可以快速训练完成。

　　（3）数据容易得到，教程容易得到。

## 超参数的确定

　　我们首先需要确定网络的层数和每层的节点数。关于第一个问题，实际上并没有什么理论化的方法，大家都是根据经验来拍，如果没有经验的话就随便拍一个。然后，你可以多试几个值，训练不同层数的神经网络，看看哪个效果最好就用哪个。嗯，现在你可能明白为什么说深度学习是个手艺活了，有些手艺很让人无语，而有些手艺还是很有技术含量的。

　　不过，有些基本道理我们还是明白的，我们知道网络层数越多越好，也知道层数越多训练难度越大。对于全连接网络，隐藏层最好不要超过三层。那么，我们可以先试试仅有一个隐藏层的神经网络效果怎么样。毕竟模型小的话，训练起来也快些(刚开始玩模型的时候，都希望快点看到结果)。

　　输入层节点数是确定的。因为MNIST数据集每个训练数据是28*28的图片，共784个像素，因此，输入层节点数应该是784，每个像素对应一个输入节点。

　　输出层节点数也是确定的。因为是10分类，我们可以用10个节点，每个节点对应一个分类。输出层10个节点中，输出最大值的那个节点对应的分类，就是模型的预测结果。

　　隐藏层节点数量是不好确定的，从1到100万都可以。下面有几个经验公式：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ad/pytorch/case2/1226410-20181110140428205-2115968734.png')" alt="wxmp">

　　因此，我们可以先根据上面的公式设置一个隐藏层节点数。如果有时间，我们可以设置不同的节点数，分别训练，看看哪个效果最好就用哪个。我们先拍一个，设隐藏层节点数为300吧。

　　对于3层784*300*10的全连接网络，总共有300*（784+1）+10*（300+1）=238510个参数！神经网络之所以强大，是它提供了一种非常简单的方法去实现大量的参数。目前百亿参数、千亿样本的超大规模神经网络也是有的。因为MNIST只有6万个训练样本，参数太多了很容易过拟合，效果反而不好。

## 模型的训练和评估

　　MNIST数据集包含10000个测试样本。我们先用60000个训练样本训练我们的网络，然后再用测试样本对网络进行测试，计算识别错误率：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ad/pytorch/case2/1226410-20181110140608338-831037645.png')" alt="wxmp">

　　我们每训练10轮，评估一次准确率。当准确率开始下降时（出现了过拟合）终止训练。

## 1.1 导入相关包

```python
import torch
# torchvision包的主要功能是实现数据的处理，导入和预览等
import torchvision
from torchvision import datasets
from torchvision import transforms
from torch.autograd import Variable
```

　　 首先，导入必要的包。对这个手写数字识别问题的解决只用到了torchvision中的部分功能，所以这里通过 from torchvision import方法导入其中的两个子包 datasets和transforms，我们将会用到这两个包。

## 1.2 获取手写数字的训练集和测试集

　　我们就要想办法获取手写数字的训练集和测试集。使用torchvision.datasets可以轻易实现对这些数据集的训练集和测试集的下
载，只需要使用 torchvision.datasets再加上需要下载的数据集的名称就可以了，比如在这个问题中我们要用到手写数字数据集，它的名称是MNIST，那么实现下载的代码就是torchvision.datasets.MNIST。其他常用的数据集如COCO、ImageNet、CIFCAR等都可以通过这个方法快速下载和载入。实现数据集下载的代码如下：

```python
# 首先获取手写数字的训练集和测试集
# root 用于指定数据集在下载之后的存放路径
# transform 用于指定导入数据集需要对数据进行那种变化操作
# train是指定在数据集下载完成后需要载入那部分数据，
# 如果设置为True 则说明载入的是该数据集的训练集部分
# 如果设置为FALSE 则说明载入的是该数据集的测试集部分
data_train = datasets.MNIST(root="./data/",
                           transform = transform,
                            train = True,
                            download = True)
 
data_test = datasets.MNIST(root="./data/",
                           transform = transform,
                            train = False)
```

 　其中，root用于指定数据集在下载之后的存放路径，这里存放在根目录下的data文件夹中；transform用于指定导入数据集时需要对数据进行哪种变换操作，在后面会介绍详细的变换操作类型，注意，要提前定义这些变换操作；train用于指定在数据集下载完成后需要载入哪部分数据，如果设置为True，则说明载入的是该数据集的训练集部分；如果设置为False，则说明载入的是该数据集的测试集部分。

## 1.3 数据预览和数据装载

　　在数据下载完成后并且载入后，我们还需要对数据进行装载。我们可以将数据的载入理解为对图片的处理，在处理完成后，我们就需要将这些图片打包好送给我们的模型进行训练了，而装载就是这个打包的过程。在装载时通过batch_size的值来确认每个包的大小，通过shuffle的值来确认是否在装载的过程中打乱图片的顺序。装载的代码如下：

```python
#数据预览和数据装载
# 下面对数据进行装载，我们可以将数据的载入理解为对图片的处理，
# 在处理完成后，我们就需要将这些图片打包好送给我们的模型进行训练 了  而装载就是这个打包的过程
# dataset 参数用于指定我们载入的数据集名称
# batch_size参数设置了每个包中的图片数据个数
#  在装载的过程会将数据随机打乱顺序并进打包
data_loader_train = torch.utils.data.DataLoader(dataset =data_train,
                                                batch_size = 64,
                                                shuffle = True)
data_loader_test = torch.utils.data.DataLoader(dataset =data_test,
                                                batch_size = 64,
                                                shuffle = True)
```

 　对数据的装载使用的是是torch.utils.data.DataLoader类，类中的dataset参数用于指定我们载入的数据集名称，batch_size参数设置了每个包中的图片数据个数，代码中的值是64，所以在每个包中会包含64张图片。将shuffle参数设置为True，在装载的过程会将数据随机打乱顺序并进行打包。
　　在装载完成后，我们可以选取其中一个批次的数据进行预览，进行数据预览的代码如下：

```python
# 在装载完成后，我们可以选取其中一个批次的数据进行预览
images,labels=next(iter(data_loader_train))
img = torchvision.utils.make_grid(images)
 
img = img.numpy().transpose(1,2,0)
std = [0.5,0.5,0.5]
mean = [0.5,0.5,0.5]
img = img*std +mean
print(labels)
# print([labels[i] for i in range(64)])
# 由于matplotlab中的展示图片无法显示，所以现在使用OpenCV中显示图片
# plt.imshow(img)
cv2.imshow('win',img)
key_pressed=cv2.waitKey(0)
```

在以上代码中使用了iter和next来获取取一个批次的图片数据和其对应的图片标签，然后使用torchvision.utils中的make_grid类方法将一个批次的图片构造成网格模式。需要传递给torchvision.utils.make_grid的参数就是一个批次的装载数据，每个批次的装载数据都是4维的，维度的构成从前往后分别为batch_size、channel、height和weight，分别对应一个批次中的数据个数、每张图片的色彩通道数、每张图片的高度和宽度。在通过torchvision.utils.make_grid之后，图片的维度变成了（channel,height,weight），这个批次的图片全部被整合到了一起，所以在这个维度中对应的值也和之前不一样了，但是色彩通道数保持不变。

　　若我们想使用Matplotlib将数据显示成正常的图片形式，则使用的数据首先必须是数组，其次这个数组的维度必须是
（height,weight,channel），即色彩通道数在最后面。所以我们要通过numpy和transpose完成原始数据类型的转换和数据维度的交换，这样才能够使用Matplotlib绘制出正确的图像。

　　在完成数据预览的代码中，我们先打印输出了这个批次中的数据的全部标签，然后才对这个批次中的所有图片数据进行显示，代码如下

 

```python
tensor([7, 1, 8, 3, 2, 3, 6, 7, 3, 9, 7, 3, 0, 0, 7, 5, 0, 0, 2, 5, 4, 4, 2, 7,
        6, 9, 8, 1, 8, 3, 7, 1, 8, 9, 6, 5, 3, 2, 0, 0, 4, 6, 1, 9, 2, 2, 2, 6,
        9, 8, 7, 2, 2, 6, 8, 2, 5, 8, 6, 1, 9, 9, 9, 8])
```

 　效果如下，可以看到输出的首先是64张图片对应的标签，然后是64张图片的预览结果：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ad/pytorch/case2/1226410-20181024152110078-265344788.png')" alt="wxmp">

## 1.4 模型搭建和参数优化　

　　在顺利完成数据装载后，我们就可以开始编写卷积神经网络模型的搭建和参数优化的代码了，因为我们想要搭建一个包含了卷积层，激活函数，池化层，全连接层的卷积神经网络来解决这个问题，所以模型在结构上会和之前简单的神经网络有所区别，当然，各个部分的功能实现依然是通过torch.nn中的类来完成的，比如卷积层使用torch.nn.Conv2d类方法来搭建，激活层使用torch.nn.ReLU类来搭建；池化层使用torch.nn.MaxPool2d类方法来搭建；全连接层使用torch.nn.Linear类方法来搭建。

```python
卷积神经网络CNN的结构一般包含这几层：
 
    输入层：用于数据的输入
 
    卷积层：使用卷积核进行特征提取和特征映射
 
    激励层：由于卷积也是一种线性运算，因此需要增加非线性映射
 
    池化层：进行下采样，对特征图稀疏处理，减少特征信息的损失
 
    输出层：用于输出结果
```

 

　　实现卷积神经网络模型搭建的代码如下：

```python
#模型搭建和参数优化
# 在顺利完成数据装载后，我们可以开始编写卷积神经网络模型的搭建和参数优化的代码
#卷积层使用torch.nn.Conv2d类来搭建
# 激活层使用torch.nn.ReLU 类方法来搭建
# 池化层使用torch.nn.MaxPool2d类方法来搭建
# 全连接层使用 torch.nn.Linear 类方法来搭建
 
class Model(torch.nn.Module):
    def __init__(self):
        super(Model,self).__init__()
        self.conv1 = torch.nn.Sequential(
            torch.nn.Conv2d(1,64,kernel_size=3,stride=1,padding=1),
            torch.nn.ReLU(),
            torch.nn.Conv2d(64,128,kernel_size=3,stride=1,padding=1),
            torch.nn.ReLU(),
            torch.nn.MaxPool2d(stride=2,kernel_size=2))
 
        self.dense = torch.nn.Sequential(
            torch.nn.Linear(14*14*128,1024),
            torch.nn.ReLU(),
            torch.nn.Dropout(p = 0.5),
            torch.nn.Linear(1024,10)
        )
 
    def forward(self, x):
        x = self.conv1(x)
        x = x.view(-1,14*14*128)
        x = self.dense(x)
        return x
```

因为这个问题并不复杂，所以我们选择搭建一个在结构层次上有所简化的卷积神经网络模型，在结构上使用了两个卷积层：一个最大池化层和两个全连接层。

最后说一下代码中前向传播forward函数中的内容，首先经过self.conv1进行卷积处理，然后进行x.view(-1,14*14*128)，对参数实现扁平化，因为之后紧接着的就是全连接层，所以如果不进行扁平化，则全连接层的实际输出的参数维度和其定义输入的维度将不匹配，程序将会报错，最后通过self.dense定义的全连接层进行最后的分类。

　　在编写完搭建卷积神经网络模型的代码后，我们就可以开始对模型进行训练和对参数进行优化了。首先，定义在训练之前使用哪种损失函数和优化函数：

```python
# 在编写完搭建卷积神经网络模型的代码后，我们可以对模型进行训练和参数进行优化了
# 首先 定义在训练之前使用哪种损失函数和优化函数
# 下面定义了计算损失值的损失函数使用的是交叉熵
# 优化函数使用的额是Adam自适应优化算法
model = Model()
cost = torch.nn.CrossEntropyLoss()
optimizer = torch.optim.Adam(model.parameters())
```

 　在以上的代码中定义了计算损失值的损失函数使用的是交叉熵，也确定了优化函数使用的是Adam自适应优化算法，需要优化的参数在Model中生成的全部参数，因为没有定义学习效率的值，所以使用默认值，然后通过打印输出的方式查看搭建好的模型的完整结构们只需要print(model)就OK。输出的结果如下：

```python
Model(
  (conv1): Sequential(
    (0): Conv2d(1, 64, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1))
    (1): ReLU()
    (2): Conv2d(64, 128, kernel_size=(3, 3), stride=(1, 1), padding=(1, 1))
    (3): ReLU()
    (4): MaxPool2d(kernel_size=2, stride=2, padding=0, dilation=1, ceil_mode=False)
  )
  (dense): Sequential(
    (0): Linear(in_features=25088, out_features=1024, bias=True)
    (1): ReLU()
    (2): Dropout(p=0.5)
    (3): Linear(in_features=1024, out_features=10, bias=True)
  )
)
```

 　最后，卷积神经网络模型进行模型训练和参数优化的代码如下：

```python
# 卷积神经网络模型进行模型训练和参数优化的代码
n_epochs = 5
 
for epoch in range(n_epochs):
    running_loss = 0.0
    running_corrrect = 0
    print("Epoch  {}/{}".format(epoch, n_epochs))
    print("-"*10)
    for data in data_loader_train:
        X_train , y_train = data
        X_train,y_train = Variable(X_train),Variable(y_train)
        outputs = model(X_train)
        _,pred = torch.max(outputs.data,1)
        optimizer.zero_grad()
        loss = cost(outputs,y_train)
 
        loss.backward()
        optimizer.step()
        running_loss += loss.data[0]
        running_corrrect += torch.sum(pred == y_train.data)
    testing_correct = 0
    for data in data_loader_train:
        X_test,y_test = data
        X_test,y_test = Variable(X_test),Variable(y_test)
        outputs = model(X_test)
        _,pred = torch.max(X_test)
        testing_correct += torch.sum(pred == y_test.data)
 
    print("Loss is {:.4f}, Train Accuracy is:{:.4f}%,Test Accuracy is:{:.4f}"
          .format(running_loss/len(data_train),100*running_corrrect/len(data_train),
                  100*testing_correct/len(data_test)))
```

　总的训练次数为5次，训练中的大部分代码和之前的相比较没有大的改动，增加的内容都在原来的基础上加入了更多的打印输出，其目的是更好的显示模型训练过程中的细节，同时，在每轮训练完成后，会使用测试集验证模型的泛化能力并计算准确率。在模型训练过程中打印输出的结果如下：

**（未实现原文结果！！！）**

```python
Epoch  0/5
----------
 
Process finished with exit code -1073741795 (0xC000001D)
```
**（这是原文作者实现的结果）**

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ad/pytorch/case2/1226410-20181024190612893-496402897.png')" alt="wxmp">

 

```python
Epoch  0/5
----------
----------
train ok
Loss is 0.0022, Train Accuracy is:95.0000%,Test Accuracy is:591.0000
Epoch  1/5
----------
train ok
Loss is 0.0007, Train Accuracy is:98.0000%,Test Accuracy is:594.0000
Epoch  2/5
----------
train ok
Loss is 0.0005, Train Accuracy is:98.0000%,Test Accuracy is:596.0000
Epoch  3/5
----------
train ok
Loss is 0.0004, Train Accuracy is:99.0000%,Test Accuracy is:595.0000
Epoch  4/5
----------
train ok
Loss is 0.0003, Train Accuracy is:99.0000%,Test Accuracy is:596.0000
运行时间为：-9805.16249585
```

 

　　可以看到，结果表现的非常不错，训练集达到的最高准确率为99.73%，而测试集达到的最高准确率为98.96%，如果我们使用功能更强大的卷积神经网络模型，则会取得比现在更好的结果。为了验证我们训练的模型是不是真的已如结果显示的一样准确，则最好的方法就是随机选取一部分测试集中的图片，用训练好的模型进行预测，看看和真实值有多大的偏差，并对结果进行可视化。

**本人对代码进行修改，实现的结果如下（windows7实现）**

```python
1
 
Epoch [1/5], Iter [100/600] Loss: 0.1948
Epoch [1/5], Iter [200/600] Loss: 0.1884
Epoch [1/5], Iter [300/600] Loss: 0.1267
Epoch [1/5], Iter [400/600] Loss: 0.2222
Epoch [1/5], Iter [500/600] Loss: 0.0289
Epoch [1/5], Iter [600/600] Loss: 0.0657
Epoch [2/5], Iter [100/600] Loss: 0.0138
Epoch [2/5], Iter [200/600] Loss: 0.1130
Epoch [2/5], Iter [300/600] Loss: 0.0487
Epoch [2/5], Iter [400/600] Loss: 0.0206
Epoch [2/5], Iter [500/600] Loss: 0.0284
Epoch [2/5], Iter [600/600] Loss: 0.0299
Epoch [3/5], Iter [100/600] Loss: 0.0279
Epoch [3/5], Iter [200/600] Loss: 0.0766
Epoch [3/5], Iter [300/600] Loss: 0.0158
Epoch [3/5], Iter [400/600] Loss: 0.0143
Epoch [3/5], Iter [500/600] Loss: 0.0180
Epoch [3/5], Iter [600/600] Loss: 0.0042
Epoch [4/5], Iter [100/600] Loss: 0.0117
Epoch [4/5], Iter [200/600] Loss: 0.0151
Epoch [4/5], Iter [300/600] Loss: 0.0034
Epoch [4/5], Iter [400/600] Loss: 0.0144
Epoch [4/5], Iter [500/600] Loss: 0.0482
Epoch [4/5], Iter [600/600] Loss: 0.0550
Epoch [5/5], Iter [100/600] Loss: 0.0393
Epoch [5/5], Iter [200/600] Loss: 0.0028
Epoch [5/5], Iter [300/600] Loss: 0.0368
Epoch [5/5], Iter [400/600] Loss: 0.0250
Epoch [5/5], Iter [500/600] Loss: 0.1075
Epoch [5/5], Iter [600/600] Loss: 0.0663
 
Process finished with exit code 0
```

 

##  1.5 完整代码及解析

（原文代码，本人未实现）

```python
#_*_coding:utf-8_*_
import matplotlib.pyplot as plt
import numpy as np
import cv2
import time
import torch
# torchvision包的主要功能是实现数据的处理，导入和预览等
import torchvision
from torchvision import datasets
from torchvision import transforms
from torch.autograd import Variable
 
start_time = time.time()
# 对数据进行载入及有相应变换,将Compose看成一种容器，他能对多种数据变换进行组合
# 传入的参数是一个列表，列表中的元素就是对载入的数据进行的各种变换操作
transform = transforms.Compose([transforms.ToTensor(),
                                transforms.Normalize(mean=[0.5,0.5,0.5],std=[0.5,0.5,0.5])])
 
 
# 首先获取手写数字的训练集和测试集
# root 用于指定数据集在下载之后的存放路径
# transform 用于指定导入数据集需要对数据进行那种变化操作
# train是指定在数据集下载完成后需要载入那部分数据，
# 如果设置为True 则说明载入的是该数据集的训练集部分
# 如果设置为FALSE 则说明载入的是该数据集的测试集部分
data_train = datasets.MNIST(root="./data/",
                           transform = transform,
                            train = True,
                            download = True)
 
data_test = datasets.MNIST(root="./data/",
                           transform = transform,
                            train = False)
 
 
#数据预览和数据装载
# 下面对数据进行装载，我们可以将数据的载入理解为对图片的处理，
# 在处理完成后，我们就需要将这些图片打包好送给我们的模型进行训练 了  而装载就是这个打包的过程
# dataset 参数用于指定我们载入的数据集名称
# batch_size参数设置了每个包中的图片数据个数
#  在装载的过程会将数据随机打乱顺序并进打包
data_loader_train = torch.utils.data.DataLoader(dataset =data_train,
                                                batch_size = 64,
                                                shuffle = True)
data_loader_test = torch.utils.data.DataLoader(dataset =data_test,
                                                batch_size = 64,
                                                shuffle = True)
 
# 在装载完成后，我们可以选取其中一个批次的数据进行预览
images,labels = next(iter(data_loader_train))
img = torchvision.utils.make_grid(images)
 
img = img.numpy().transpose(1,2,0)
 
std = [0.5,0.5,0.5]
mean = [0.5,0.5,0.5]
 
img = img*std +mean
# print(labels)
print([labels[i] for i in range(64)])
# 由于matplotlab中的展示图片无法显示，所以现在使用OpenCV中显示图片
# plt.imshow(img)
# cv2.imshow('win',img)
# key_pressed=cv2.waitKey(0)
 
#模型搭建和参数优化
# 在顺利完成数据装载后，我们可以开始编写卷积神经网络模型的搭建和参数优化的代码
#卷积层使用torch.nn.Conv2d类来搭建
# 激活层使用torch.nn.ReLU 类方法来搭建
# 池化层使用torch.nn.MaxPool2d类方法来搭建
# 全连接层使用 torch.nn.Linear 类方法来搭建
 
class Model(torch.nn.Module):
    def __init__(self):
        super(Model,self).__init__()
        self.conv1 = torch.nn.Sequential(
            torch.nn.Conv2d(1,64,kernel_size=3,stride=1,padding=1),
            torch.nn.ReLU(),
            torch.nn.Conv2d(64,128,kernel_size=3,stride=1,padding=1),
            torch.nn.ReLU(),
            torch.nn.MaxPool2d(stride=2,kernel_size=2))
 
        self.dense = torch.nn.Sequential(
            torch.nn.Linear(14*14*128,1024),
            torch.nn.ReLU(),
            torch.nn.Dropout(p = 0.5),
            torch.nn.Linear(1024,10)
        )
 
    # 我们通过继承torch.nn.Modeule来构造网络，因为手写数字
    # 识别比较简单，我们只是用了两个卷积层，一个最大池化层，两个全连接层。
    # 在向前传播过程中进行x.view(-1, 14 * 14 * 128)
    # 对参数实现扁平化。最后通过自己self.dense定义的全连接层进行最后的分类
    def forward(self, x):
        x = self.conv1(x)
        x = x.view(-1,14*14*128)
        x = self.dense(x)
        return x
 
 
# 在编写完搭建卷积神经网络模型的代码后，我们可以对模型进行训练和参数进行优化了
# 首先 定义在训练之前使用哪种损失函数和优化函数
# 下面定义了计算损失值的损失函数使用的是交叉熵
# 优化函数使用的额是Adam自适应优化算法
model = Model()
# 将所有的模型参数移动到GPU上
if torch.cuda.is_available():
    model.cuda()
cost = torch.nn.CrossEntropyLoss()
optimizer = torch.optim.Adam(model.parameters())
# print(model)
 
# 卷积神经网络模型进行模型训练和参数优化的代码
n_epochs = 5
 
for epoch in range(n_epochs):
    running_loss = 0.0
    running_correct = 0
    print("Epoch  {}/{}".format(epoch, n_epochs))
    print("-"*10)
    for data in data_loader_train:
        X_train , y_train = data
        # 有GPU加下面这行，没有不用加
        # X_train, y_train = X_train.cuda(), y_train.cuda()
        X_train , y_train = Variable(X_train),Variable(y_train)
        # print(y_train)
        outputs = model(X_train)
        # print(outputs)
        _,pred = torch.max(outputs.data,1)
        optimizer.zero_grad()
        loss = cost(outputs,y_train)
 
        loss.backward()
        optimizer.step()
        # running_loss += loss.data[0]
        running_loss += loss.item()
        running_correct += torch.sum(pred == y_train.data)
        # print("ok")
        # print("**************%s"%running_corrrect)
 
    print("train ok ")
    testing_correct = 0
    for data in data_loader_test:
        X_test,y_test = data
        # 有GPU加下面这行，没有不用加
        # X_test, y_test = X_test.cuda(), y_test.cuda()
        X_test,y_test = Variable(X_test),Variable(y_test)
        outputs = model(X_test)
        _, pred = torch.max(outputs,1)
        testing_correct += torch.sum(pred == y_test.data)
        # print(testing_correct)
 
    print( "Loss is :{:.4f},Train Accuracy is:{:.4f}%,Test Accuracy is:{:.4f}".format(
                 running_loss / len(data_train),100 * running_correct / len(data_train),
                 100 * testing_correct / len(data_test)))
 
 
stop_time = time.time()
print("time is %s" %(stop_time-start_time))
```

## （本人对原文代码进行修改，然后实现的是这个代码）

```python
import torch
import torch.nn as nn
import torchvision.datasets as normal_datasets
import torchvision.transforms as transforms
from torch.autograd import Variable
 
num_epochs = 5
batch_size = 100
learning_rate = 0.001
 
 
# 将数据处理成Variable, 如果有GPU, 可以转成cuda形式
def get_variable(x):
    x = Variable(x)
    return x.cuda() if torch.cuda.is_available() else x
 
 
# 从torchvision.datasets中加载一些常用数据集
train_dataset = normal_datasets.MNIST(
    root='./mnist/',  # 数据集保存路径
    train=True,  # 是否作为训练集
    transform=transforms.ToTensor(),  # 数据如何处理, 可以自己自定义
    download=True)  # 路径下没有的话, 可以下载
 
# 见数据加载器和batch
test_dataset = normal_datasets.MNIST(root='./mnist/',
                                     train=False,
                                     transform=transforms.ToTensor())
 
train_loader = torch.utils.data.DataLoader(dataset=train_dataset,
                                           batch_size=batch_size,
                                           shuffle=True)
 
test_loader = torch.utils.data.DataLoader(dataset=test_dataset,
                                          batch_size=batch_size,
                                          shuffle=False)
 
 
# 两层卷积
class CNN(nn.Module):
    def __init__(self):
        super(CNN, self).__init__()
        # 使用序列工具快速构建
        self.conv1 = nn.Sequential(
            nn.Conv2d(1, 16, kernel_size=5, padding=2),
            nn.BatchNorm2d(16),
            nn.ReLU(),
            nn.MaxPool2d(2))
        self.conv2 = nn.Sequential(
            nn.Conv2d(16, 32, kernel_size=5, padding=2),
            nn.BatchNorm2d(32),
            nn.ReLU(),
            nn.MaxPool2d(2))
        self.fc = nn.Linear(7 * 7 * 32, 10)
 
    def forward(self, x):
        out = self.conv1(x)
        out = self.conv2(out)
        out = out.view(out.size(0), -1)  # reshape
        out = self.fc(out)
        return out
 
 
cnn = CNN()
if torch.cuda.is_available():
    cnn = cnn.cuda()
 
# 选择损失函数和优化方法
loss_func = nn.CrossEntropyLoss()
optimizer = torch.optim.Adam(cnn.parameters(), lr=learning_rate)
 
for epoch in range(num_epochs):
    for i, (images, labels) in enumerate(train_loader):
        images = get_variable(images)
        labels = get_variable(labels)
 
        outputs = cnn(images)
        loss = loss_func(outputs, labels)
        optimizer.zero_grad()
        loss.backward()
        optimizer.step()
 
        if (i + 1) % 100 == 0:
            print('Epoch [%d/%d], Iter [%d/%d] Loss: %.4f'
                  % (epoch + 1, num_epochs, i + 1, len(train_dataset) // batch_size, loss.item()))
 
 
# Save the Trained Model
torch.save(cnn.state_dict(), 'cnn.pkl')
```

 

## 1.6 验证模型

　　为了验证我们训练的模型是不是真的已如结果显示的一样准确，则最好的方法就是随机选取一部分测试集中的图片，用训练好的模型进行预测，看看和真实值有多大的偏差，并对结果进行可视化，测试过程的代码如下：

```python
import matplotlib.pyplot as plt
import cv2
import torch
import torchvision
from torchvision import datasets
from torchvision import transforms
from torch.autograd import Variable
 
transform = transforms.Compose([transforms.ToTensor(),
                                transforms.Normalize(mean=[0.5,0.5,0.5],std=[0.5,0.5,0.5])])
 
 
data_test = datasets.MNIST(root="./data/",
                           transform = transform,
                            train = False)
 
 
data_loader_test = torch.utils.data.DataLoader(dataset =data_test,
                                                batch_size = 4,
                                                shuffle = True)
 
 
#模型搭建和参数优化
# 在顺利完成数据装载后，我们可以开始编写卷积神经网络模型的搭建和参数优化的代码
#卷积层使用torch.nn.Conv2d类来搭建
# 激活层使用torch.nn.ReLU 类方法来搭建
# 池化层使用torch.nn.MaxPool2d类方法来搭建
# 全连接层使用 torch.nn.Linear 类方法来搭建
 
class Model(torch.nn.Module):
    def __init__(self):
        super(Model,self).__init__()
        self.conv1 = torch.nn.Sequential(
            torch.nn.Conv2d(1,64,kernel_size=3,stride=1,padding=1),
            torch.nn.ReLU(),
            torch.nn.Conv2d(64,128,kernel_size=3,stride=1,padding=1),
            torch.nn.ReLU(),
            torch.nn.MaxPool2d(stride=2,kernel_size=2))
 
        self.dense = torch.nn.Sequential(
            torch.nn.Linear(14*14*128,1024),
            torch.nn.ReLU(),
            torch.nn.Dropout(p = 0.5),
            torch.nn.Linear(1024,10)
        )
 
    # 我们通过继承torch.nn.Modeule来构造网络，因为手写数字
    # 识别比较简单，我们只是用了两个卷积层，一个最大池化层，两个全连接层。
    # 在向前传播过程中进行x.view(-1, 14 * 14 * 128)
    # 对参数实现扁平化。最后通过自己self.dense定义的全连接层进行最后的分类
    def forward(self, x):
        x = self.conv1(x)
        x = x.view(-1,14*14*128)
        x = self.dense(x)
        return x
 
 
# 在编写完搭建卷积神经网络模型的代码后，我们可以对模型进行训练和参数进行优化了
# 首先 定义在训练之前使用哪种损失函数和优化函数
# 下面定义了计算损失值的损失函数使用的是交叉熵
# 优化函数使用的额是Adam自适应优化算法
model = Model()
# 将所有的模型参数移动到GPU上
if torch.cuda.is_available():
    model.cuda()
cost = torch.nn.CrossEntropyLoss()
optimizer = torch.optim.Adam(model.parameters())
# print(model)
 
# 卷积神经网络模型进行模型训练和参数优化的代码
n_epochs = 5
 
X_test,y_test = next(iter(data_loader_test))
inputs = Variable(X_test)
pred = model(inputs)
_,pred = torch.max(pred,1)
 
print("Predict Label is:",(i for i in pred))
print("Real Label is :",[i for i in y_test])
 
img = torchvision.utils.make_grid(X_test)
img = img.numpy().transpose(1,2,0)
 
std = [0.5,0.5,0.5]
mean = [0.5,0.5,0.5]
img = img*std +mean
cv2.imshow('win',img)
key_pressed=cv2.waitKey(0)
```

 　用于测试的数据标签结果输出的结果如下：

```python
Predict Label is: <generator object <genexpr> at 0x0000000015419C00>
Real Label is : [tensor(7), tensor(3), tensor(7), tensor(3)]
```

　　 在输出结果中，第1个结果是我们训练好的模型的预测值，第2个结果是这4个测试数据的真实值。对测试数据进行可视化，如图所示：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ad/pytorch/case2/1226410-20181025144824282-1243350761.png')" alt="wxmp">

　　可以看到，在图中可视化的这部分测试集图片，模型的预测结果和真实的结果是完全一致的。当然，如果想选取更多的测试集进行可视化，则只需将batch_size的值设置得更大。

 

不经一番彻骨寒 怎得梅花扑鼻香

## 参考文章
* https://www.cnblogs.com/wj-1314/p/9842719.html