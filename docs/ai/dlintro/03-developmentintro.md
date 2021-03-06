---
title: 深度学习-发展历史和核心事件
---

::: tip
本文主要是介绍 深度学习-发展历史和核心事件 。
:::

[[toc]]

## 深度学习

深度学习（deep learning）是机器学习的分支，是一种试图使用包含复杂结构或由多重非线性变换构成的多个处理层对数据进行高层抽象的算法。 深度学习是机器学习中一种基于对数据进行表征学习的算法，至今已有数种深度学习框架，如卷积神经网络和深度置信网络和递归神经网络等已被应用在计算机视觉、语音识别、自然语言处理、音频识别与生物信息学等领域并获取了极好的效果。

来源：[LeCun, Y., Bengio, Y., & Hinton, G. (2015). Deep learning. nature, 521(7553), 436.](https://www.nature.com/articles/nature14539)

简介

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ai/dlintro/hiscoreevent-1.png')" alt="wxmp">

图1.深度学习与人工智能关系图

[图片来源：论文Efficient processing of deep neural networks: A tutorial and survey；URL:https://arxiv.org/pdf/1703.09039.pdf]

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ai/dlintro/hiscoreevent-2.png')" alt="wxmp">

图2.深度学习通过分层学习多重抽象表征示意图。输入层是我们能从图中直接观察到的，第一层可以学习到比较简单的特征（如边缘），第二层在第一层学到的特征基础上，可以学习到角或者曲度等稍微复杂的特征，第三层则能学习到物体的复杂特征，从而识别出输入的物体。

[图片来源：Deep Learning Book; URL:http://www.deeplearningbook.org/]

深度学习（deep learning）是机器学习的分支，是一种试图使用包含复杂结构或由多重非线性变换构成的多个处理层对数据进行高层抽象的算法。

深度学习是机器学习中一种基于对数据进行表征学习的算法。观测值（例如一幅图像）可以使用多种方式来表示，如每个像素强度值的向量，或者更抽象地表示成一系列边、特定形状的区域等。而使用某些特定的表示方法更容易从实例中学习任务（例如，人脸识别或面部表情识别）。

近年来监督式深度学习方法（以反馈算法训练CNN、LSTM等）获得了空前的成功，而基于半监督或非监督式的方法（如DBM、DBN、stacked autoencoder）虽然在深度学习兴起阶段起到了重要的启蒙作用，但仍处在研究阶段并已获得不错的进展。在未来，非监督式学习将是深度学习的重要研究方向，因为人和动物的学习大多是非监督式的，我们通过观察来发现世界的构造，而不是被提前告知所有物体的名字。

表征学习的目标是寻求更好的表示方法并创建更好的模型来从大规模未标记数据中学习这些表示方法。表示方法来自神经科学，并松散地创建在类似神经系统中的信息处理和对通信模式的理解上，如神经编码，试图定义拉动神经元的反应之间的关系以及大脑中的神经元的电活动之间的关系。

至今已有数种深度学习框架，如卷积神经网络和深度置信网络和递归神经网络等已被应用在计算机视觉、语音识别、自然语言处理、音频识别与生物信息学等领域并获取了极好的效果。

[描述来源：维基百科；URL:[https://zh.wikipedia.org/wiki/%E6%B7%B1%E5%BA%A6%E5%AD%A6%E4%B9%A0](https://zh.wikipedia.org/wiki/深度学习)]

[描述来源:论文Deep learning; URL:https://www.nature.com/articles/nature14539]

## 发展历史

深度学习框架，尤其是基于人工神经网络的框架可以追溯到1980年福岛邦彦提出的新认知机，而人工神经网络的历史则更为久远，甚至可以追溯到公元前亚里士多德为了解释人类大脑的运行规律而提出的联想主义心理学。1989年，扬·勒丘恩（Yann LeCun）等人开始将1974年提出的标准反向传播算法应用于深度神经网络，这一网络被用于手写邮政编码识别，并且在美国成功地被银行商业化应用了，轰动一时。2007年前后，杰弗里·辛顿和鲁斯兰·萨拉赫丁诺夫（Ruslan Salakhutdinov）提出了一种在前馈神经网络中进行有效训练的算法。这一算法将网络中的每一层视为无监督的受限玻尔兹曼机（RBM），再使用有监督的反向传播算法进行调优。之后，由Hinton等人创造的深度置信网络（DBN）指出，RBM可以以贪婪的方式进行堆叠和训练，也掀起了深度学习的研究热潮。2009年，又进一步提出Deep Boltzmann Machine，它与DBN的区别在于，DBM允许在底层中双向连接。因此，用DBM表示堆叠的RBM，比用DBN好得多。

下表罗列了深度学习发展历史上的里程碑：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ai/dlintro/hiscoreevent-3.png')" alt="wxmp">

[表格来源：论文On the origin of deep learning；URL：https://arxiv.org/pdf/1702.07800.pdf]

随着深度学习的高速发展，出现了大量的新模型与架构, 这些架构在不同领域发挥着重要作用：

### **卷积神经网络（CNN）**
除了包含执行目标识别任务的 AlexNet（2012年Imagenet冠军） 等深度卷积网络，还包括很多优秀的模型用于处理目标检测、语义分割和超分辨率等任务。它们以不同的方式应用卷积过程处理不同的任务，并在这些任务上产生了非常好的效果。从基本上来说，卷积相对于最初的全连接网络有很多优秀的属性，例如它只和上一层神经元产生部分的连接，同一个卷积核可以在输入张量上重复使用，也就是说特征检测器可以在输入图像上重复检测是否有该局部特征。这是卷积网络十分优秀的属性，它大大减少了两层间参数的数量。

### **循环神经网络（recurrent neural network）**
是深度学习的重要组成部分，它可以让神经网络处理诸如文本、音频和视频等序列数据。它们可用来做序列的高层语义理解、序列标记，甚至可以从一个片段生产新的序列。目前有很多人工智能应用都依赖于循环深度神经网络，在谷歌（语音搜索）、百度（DeepSpeech）和亚马逊的产品中都能看到 RNN 的身影。基本的 RNN 结构难以处理长序列，然而一种特殊的 RNN 变种即「长短时记忆（LSTM）」网络可以很好地处理长序列问题。这种模型能力强大，在翻译、语音识别和图像描述等众多任务中均取得里程碑式的效果。因而，循环神经网络在最近几年得到了广泛使用。

### **Capsule**
是由深度学习先驱 Geoffrey Hinton 等人提出的新一代神经网络形式，旨在修正反向传播机制。「Capsule 是一组神经元，其输入输出向量表示特定实体类型的实例化参数（即特定物体、概念实体等出现的概率与某些属性）。我们使用输入输出向量的长度表征实体存在的概率，向量的方向表示实例化参数（即实体的某些图形属性）。同一层级的 capsule 通过变换矩阵对更高级别的 capsule 的实例化参数进行预测。当多个预测一致时（论文中使用动态路由使预测一致），更高级别的 capsule 将变得活跃。」

### **深度生成模型**
可以通过生成全新的样本来演示其对于数据的理解，尽管这些生成的样本非常类似于那些训练样本。许多这样的模型和之前的自编码器的思想有关，其有一个编码器函数将数据映射到表征，还有一个解码器函数（或生成器）将该抽象的表征映射到原始数据空间。此外，生成模型很多也应用到了 GAN 的思想，即通过判别器与生成器之间的对抗促使生成器生成非常真实的图像。在变分自编码器中，我们需要通过样本训练一个编码器和解码器，在这过程中我们能得到中间的隐藏变量。若我们需要生成新的图像，那么只需要在隐藏变量采样并投入解码器就能完成生成。而在生成对抗网络中，我们会定义一个判别模型与生成模型。首先我们会将生成的样本混合真实样本投递给判别模型以训练其鉴别真假的能力，随后再固定判别模型并训练生成模型，以生成更真实的图像。

深度学习对工业界也具有重要影响，随着硬件的发展，如高性能图形处理器的出现等，深度学习引发了新一轮的AI浪潮：

2011年微软研究院语音识别专家邓立和俞栋等人与深度学习专家Geoffery Hinton合作创造了第一个基于深度学习的语音识别系统，该系统也成为深度学习在语音识别领域繁盛发展和提升的起点。

2012年 Andrew Y. Ng和谷歌员工Jeff Dean领导的谷歌大脑研究小组用16000个处理器建造了一个神经网络，用来在YouTube视频上找猫，结果证明了在给予机器海量数据之后，现有的机器学习算法可以得到极大的提高。

美国几大巨头公司如Apple，Google，Facebook，Amazon，Microsoft 等都已成立专门研究院或相关部门开展深度学习研究并有产品推出，而国内的百度、阿里、腾讯等也在积极布局该领域。

## 主要事件

| **年份** | **事件**                                                                                                   | **相关论文/Reference**                                                                                                                                                                                                                                                      |
| -------- | ---------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1980     | 福岛邦彦提出的新认知机引入了使用无监督学习训练的卷积神经网络                                               | K. Fukushima., "Neocognitron: A self-organizing neural network model for a mechanism of pattern recognition unaffected by shift in position," Biol. Cybern., 36, 193–202, 1980                                                                                              |
| 1990     | 神经网络技术（CNN）开始被用于手写识别                                                                      | LeCun, Y., Boser, B. E., Denker, J. S., Henderson, D., Howard, R. E., Hubbard, W. E., & Jackel, L. D. (1990). Handwritten digit recognition with a back-propagation network. In Advances in neural information processing systems (pp. 396-404).                            |
| 1997     | Sepp Hochreiter和Jürgen Schmidhuber提出了长短期记忆循环神经网络-LSTM                                       | Hochreiter, S., & Schmidhuber, J. (1997). Long short-term memory. Neural computation, 9(8), 1735-1780.                                                                                                                                                                      |
| 2006     | 深度信念网络（Deep Belief Network）发表，深度学习的研究热潮自此开始慢慢展开                                | Hinton, G. E., Osindero, S., & Teh, Y. W. (2006). A fast learning algorithm for deep belief nets. Neural computation, 18(7), 1527-1554.Hinton, G. E., & Salakhutdinov, R. R. (2006). Reducing the dimensionality of data with neural networks. science, 313(5786), 504-507. |
| 2009     | 建立了Imagenet这一通用的图像数据库                                                                         | Deng, J., Dong, W., Socher, R., Li, L. J., Li, K., & Fei-Fei, L. (2009, June). Imagenet: A large-scale hierarchical image database. In Computer Vision and Pattern Recognition, 2009. CVPR 2009. IEEE Conference on (pp. 248-255). IEEE.                                    |
| 2012     | AlexNet在ImageNet比赛获胜，展现了神经网络技术在图像识别领域的特长                                          | Krizhevsky, A., Sutskever, I., & Hinton, G. E. (2012). Imagenet classification with deep convolutional neural networks. In Advances in neural information processing systems (pp. 1097-1105).                                                                               |
| 2013     | Facebook宣布Yann LeCun为其新建的AI实验室主管，研究利用深度学习算法进行类似自动标记照片中用户姓名这样的任务 | C. Metz., "Facebook's 'Deep Learning' Guru Reveals the Future of AI," Wired, 12 December 2013.                                                                                                                                                                              |
| 2014     | 在优化算法方面，提出了经典的Adam算法                                                                       | Kingma, D. P., & Ba, J. (2014). Adam: A method for stochastic optimization. arXiv preprint arXiv:1412.6980.                                                                                                                                                                 |
| 2016     | 以深度学习开发的围棋程序AlphaGo首度在比赛中击败人类顶尖选手，形成广泛的讨论                                | Silver, D., Huang, A., Maddison, C. J., Guez, A., Sifre, L., Van Den Driessche, G., ... & Dieleman, S. (2016). Mastering the game of Go with deep neural networks and tree search. Nature, 529(7587), 484-489.                                                              |

## 发展分析

### 瓶颈

对深度学习的主要批评是许多方法缺乏理论支撑。大多数深度结构仅仅是梯度下降的某些变式。尽管梯度下降已经被充分地研究，但理论涉及的其他算法，例如对比分歧算法，并没有获得充分的研究，其收敛性等问题仍不明确。深度学习方法常常被视为黑盒，大多数的结论确认都由经验而非理论来确定。

也有学者认为，深度学习应当被视为通向真正人工智能的一条途径，而不是一种包罗万象的解决方案。尽管深度学习的能力很强，但和真正的人工智能相比，仍然缺乏诸多重要的能力。

### 未来发展方向

深度学习常常被看作是通向真正人工智能的重要一步，其实际应用获得了越来越多公司和研究机构的参与。

Contributor: Yueqin Li

## 参考文章
* https://www.jiqizhixin.com/graph/technologies/01946acc-d031-4c0e-909c-f062643b7273