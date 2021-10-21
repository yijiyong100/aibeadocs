(window.webpackJsonp=window.webpackJsonp||[]).push([[96],{613:function(a,s,t){"use strict";t.r(s);var e=t(53),v=Object(e.a)({},(function(){var a=this,s=a.$createElement,t=a._self._c||s;return t("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[t("div",{staticClass:"custom-block tip"},[t("p",{staticClass:"custom-block-title"},[a._v("TIP")]),a._v(" "),t("p",[a._v("本文主要是介绍 深度学习-核心思想和精华总结 。")])]),a._v(" "),t("p"),t("div",{staticClass:"table-of-contents"},[t("ul",[t("li",[t("a",{attrs:{href:"#深度学习详解"}},[a._v("深度学习详解")])]),t("li",[t("a",{attrs:{href:"#人脑的视觉机理"}},[a._v("人脑的视觉机理")])]),t("li",[t("a",{attrs:{href:"#机器学习的特征"}},[a._v("机器学习的特征")]),t("ul",[t("li",[t("a",{attrs:{href:"#特征表示的粒度"}},[a._v("特征表示的粒度")])]),t("li",[t("a",{attrs:{href:"#初级-浅层-特征表示"}},[a._v("初级(浅层)特征表示")])]),t("li",[t("a",{attrs:{href:"#稀疏编码是一个重复迭代的过程-每次迭代分两步"}},[a._v("稀疏编码是一个重复迭代的过程，每次迭代分两步：")])]),t("li",[t("a",{attrs:{href:"#结构性特征表示"}},[a._v("结构性特征表示")])])])]),t("li",[t("a",{attrs:{href:"#深度学习的基本思想"}},[a._v("深度学习的基本思想")])]),t("li",[t("a",{attrs:{href:"#浅层学习和深度学习"}},[a._v("浅层学习和深度学习")])]),t("li",[t("a",{attrs:{href:"#深度学习与神经网络"}},[a._v("深度学习与神经网络")])]),t("li",[t("a",{attrs:{href:"#深度学习的训练过程"}},[a._v("深度学习的训练过程")]),t("ul",[t("li",[t("a",{attrs:{href:"#cnns卷积神经网络"}},[a._v("CNNs卷积神经网络")])]),t("li",[t("a",{attrs:{href:"#卷积神经网络的历史"}},[a._v("卷积神经网络的历史")])]),t("li",[t("a",{attrs:{href:"#卷积神经网络的网络结构"}},[a._v("卷积神经网络的网络结构")])])])]),t("li",[t("a",{attrs:{href:"#卷积神经网络训练过程"}},[a._v("卷积神经网络训练过程")]),t("ul",[t("li",[t("a",{attrs:{href:"#第一阶段-向前传播阶段"}},[a._v("第一阶段，向前传播阶段：")])]),t("li",[t("a",{attrs:{href:"#第二阶段-向后传播阶段"}},[a._v("第二阶段，向后传播阶段")])]),t("li",[t("a",{attrs:{href:"#卷积神经网络的优点"}},[a._v("卷积神经网络的优点")])]),t("li",[t("a",{attrs:{href:"#卷积网络较一般神经网络在图像处理方面有如下优点"}},[a._v("卷积网络较一般神经网络在图像处理方面有如下优点：")])])])]),t("li",[t("a",{attrs:{href:"#参考文章"}},[a._v("参考文章")])])])]),t("p"),a._v(" "),t("h2",{attrs:{id:"深度学习详解"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#深度学习详解"}},[a._v("#")]),a._v(" 深度学习详解")]),a._v(" "),t("p",[a._v("自2006年以来，机器学习领域，取得了突破性的进展。这个算法就是深度学习Deep Learning。机器学习在图像识别、语音识别、自然语言理解、天气预测、基因表达、内容推荐等很多方面的发展还存在着没有良好解决的问题。深度学习的出现就这个问题提出了一种解决方案。")]),a._v(" "),t("img",{staticClass:"zoom-custom-imgs",attrs:{src:a.$withBase("/assets/img/ai/dlintro/sum/11385343fbf2b2113e681912c48065380cd78e2c.png"),alt:"wxmp"}}),a._v(" "),t("p",[a._v("人工智能，就像长生不老和星际漫游一样，是人类最美好的梦想之一。虽然计算机技术已经取得了长足的进步，但是到目前为止，还没有一台电脑能产生“自我”的意识。但是自 2006 年以来，机器学习领域，取得了突破性的进展。图灵试验，至少不是那么可望而不可及了。至于技术手段，不仅仅依赖于云计算对大数据的并行处理能力，而且依赖于算法。这个算法就是深度学习Deep Learning。借助于 Deep Learning 算法，人类终于找到了如何处理“抽象概念”这个亘古难题的方法。")]),a._v(" "),t("p",[a._v("机器学习(Machine Learning)是一门专门研究计算机怎样模拟或实现人类的学习行为，以获取新的知识或技能，重新组织已有的知识结构市值不断改善自身的性能的学科，简单地说，机器学习就是通过算法，使得机器能从大量的历史数据中学习规律，从而对新的样本做智能识别或预测未来。")]),a._v(" "),t("p",[a._v("机器学习在图像识别、语音识别、自然语言理解、天气预测、基因表达、内容推荐等很多方面的发展还存在着没有良好解决的问题。")]),a._v(" "),t("p",[a._v("传统的模式识别方法：通过传感器获取数据，然后经过预处理、特征提取、特征选择、再到推理、预测或识别。")]),a._v(" "),t("img",{staticClass:"zoom-custom-imgs",attrs:{src:a.$withBase("/assets/img/ai/dlintro/sum/37d12f2eb9389b5082577c0e8b35e5dde6116ec6.png"),alt:"wxmp"}}),a._v(" "),t("p",[a._v("开始的通过传感器(例如CMOS)来获得数据。然后经过预处理、特征提取、特征选择，再到推理、预测或者识别。最后一个部分，也就是机器学习的部分，绝大部分的工作是在这方面做的，也存在很多的paper和研究。")]),a._v(" "),t("p",[a._v("而中间的三部分，概括起来就是特征表达。良好的特征表达，对最终算法的准确性起了非常关键的作用，而且系统主要的计算和测试工作都耗在这一大部分。但，这块实际中一般都是人工完成的，靠人工提取特征。而手工选取特征费时费力，需要专业知识，很大程度上靠经验和运气，那么机器能不能自动的学习特征呢?深度学习的出现就这个问题提出了一种解决方案。")]),a._v(" "),t("h2",{attrs:{id:"人脑的视觉机理"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#人脑的视觉机理"}},[a._v("#")]),a._v(" "),t("strong",[a._v("人脑的视觉机理")])]),a._v(" "),t("p",[a._v("1981 年的诺贝尔医学奖，颁发给了 David Hubel(出生于加拿大的美国神经生物学家)和TorstenWiesel，以及Roger Sperry。前两位的主要贡献，是“发现了视觉系统的信息处理”可视皮层是分级的。")]),a._v(" "),t("img",{staticClass:"zoom-custom-imgs",attrs:{src:a.$withBase("/assets/img/ai/dlintro/sum/d4628535e5dde711427adfaaa9efce1b9c1661c6.png"),alt:"wxmp"}}),a._v(" "),t("p",[a._v("1958 年，DavidHubel 和Torsten Wiesel 在 JohnHopkins University，研究瞳孔区域与大脑皮层神经元的对应关系。他们在猫的后脑头骨上，开了一个3 毫米的小洞，向洞里插入电极，测量神经元的活跃程度。")]),a._v(" "),t("p",[a._v("然后，他们在小猫的眼前，展现各种形状、各种亮度的物体。并且，在展现每一件物体时，还改变物体放置的位置和角度。他们期望通过这个办法，让小猫瞳孔感受不同类型、不同强弱的刺激。")]),a._v(" "),t("p",[a._v("之所以做这个试验，目的是去证明一个猜测。位于后脑皮层的不同视觉神经元，与瞳孔所受刺激之间，存在某种对应关系。一旦瞳孔受到某一种刺激，后脑皮层的某一部分神经元就会活跃。经历了很多天反复的枯燥的试验，David Hubel 和Torsten Wiesel 发现了一种被称为“方向选择性细胞(Orientation Selective Cell)”的神经元细胞。当瞳孔发现了眼前的物体的边缘，而且这个边缘指向某个方向时，这种神经元细胞就会活跃。")]),a._v(" "),t("p",[a._v("这个发现激发了人们对于神经系统的进一步思考。神经-中枢-大脑的工作过程，或许是一个不断迭代、不断抽象的过程。")]),a._v(" "),t("p",[a._v("例如，从原始信号摄入开始(瞳孔摄入像素 Pixels)，接着做初步处理(大脑皮层某些细胞发现边缘和方向)，然后抽象(大脑判定，眼前的物体的形状，是圆形的)，然后进一步抽象(大脑进一步判定该物体是只气球)。")]),a._v(" "),t("img",{staticClass:"zoom-custom-imgs",attrs:{src:a.$withBase("/assets/img/ai/dlintro/sum/b7fd5266d01609248cbe3e47da0735fae7cd34d6.png"),alt:"wxmp"}}),a._v(" "),t("p",[a._v("这个生理学的发现，促成了计算机人工智能，在四十年后的突破性发展。")]),a._v(" "),t("p",[a._v("总的来说，人的视觉系统的信息处理是分级的。从低级的V1区提取边缘特征，再到V2区的形状或者目标的部分等，再到更高层，整个目标、目标的行为等。也就是说高层的特征是低层特征的组合，从低层到高层的特征表示越来越抽象，越来越能表现语义或者意图。而抽象层面越高，存在的可能猜测就越少，就越利于分类。例如，单词集合和句子的对应是多对一的，句子和语义的对应又是多对一的，语义和意图的对应还是多对一的，这是个层级体系。")]),a._v(" "),t("h2",{attrs:{id:"机器学习的特征"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#机器学习的特征"}},[a._v("#")]),a._v(" "),t("strong",[a._v("机器学习的特征")])]),a._v(" "),t("p",[a._v("特征是机器学习系统的原材料，对最终模型的影响是毋庸置疑的。如果数据被很好的表达成了特征，通常线性模型就能达到满意的精度。")]),a._v(" "),t("h3",{attrs:{id:"特征表示的粒度"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#特征表示的粒度"}},[a._v("#")]),a._v(" "),t("strong",[a._v("特征表示的粒度")])]),a._v(" "),t("p",[a._v("学习算法在一个什么粒度上的特征表示，才有能发挥作用?就一个图片来说，像素级的特征根本没有价值。例如下面的摩托车，从像素级别，根本得不到任何信息，其无法进行摩托车和非摩托车的区分。而如果特征是一个具有结构性(或者说有含义)的时候，比如是否具有车把手(handle)，是否具有车轮(wheel)，就很容易把摩托车和非摩托车区分，学习算法才能发挥作用。")]),a._v(" "),t("img",{staticClass:"zoom-custom-imgs",attrs:{src:a.$withBase("/assets/img/ai/dlintro/sum/c75c10385343fbf21e6a3a7fbe7eca8065388f2c.png"),alt:"wxmp"}}),a._v(" "),t("h3",{attrs:{id:"初级-浅层-特征表示"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#初级-浅层-特征表示"}},[a._v("#")]),a._v(" "),t("strong",[a._v("初级(浅层)特征表示")])]),a._v(" "),t("p",[a._v("既然像素级的特征表示方法没有作用，那怎样的表示才有用呢?")]),a._v(" "),t("p",[a._v("1995 年前后，Bruno Olshausen和 David Field 两位学者任职 Cornell University，他们试图同时用生理学和计算机的手段，双管齐下，研究视觉问题。")]),a._v(" "),t("p",[a._v("他们收集了很多黑白风景照片，从这些照片中，提取出400个小碎片，每个照片碎片的尺寸均为 16x16 像素，不妨把这400个碎片标记为 S[i], i = 0,.. 399。接下来，再从这些黑白风景照片中，随机提取另一个碎片，尺寸也是 16x16 像素，不妨把这个碎片标记为 T。")]),a._v(" "),t("p",[a._v("他们提出的问题是，如何从这400个碎片中，选取一组碎片，S[k], 通过叠加的办法，合成出一个新的碎片，而这个新的碎片，应当与随机选择的目标碎片 T，尽可能相似，同时，S[k] 的数量尽可能少。用数学的语言来描述，就是：Sum_k (a[k] * S[k]) --\x3e T, 其中 a[k] 是在叠加碎片 S[k] 时的权重系数。")]),a._v(" "),t("p",[a._v("为解决这个问题，Bruno Olshausen和 David Field 发明了一个算法，稀疏编码(Sparse Coding)。")]),a._v(" "),t("h3",{attrs:{id:"稀疏编码是一个重复迭代的过程-每次迭代分两步"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#稀疏编码是一个重复迭代的过程-每次迭代分两步"}},[a._v("#")]),a._v(" "),t("strong",[a._v("稀疏编码是一个重复迭代的过程，每次迭代分两步")]),a._v("：")]),a._v(" "),t("p",[a._v("1)选择一组 S[k]，然后调整 a[k]，使得Sum_k (a[k] * S[k]) 最接近 T。")]),a._v(" "),t("p",[a._v("2)固定住 a[k]，在 400 个碎片中，选择其它更合适的碎片S’[k]，替代原先的 S[k]，使得Sum_k (a[k] * S’[k]) 最接近 T。")]),a._v(" "),t("p",[a._v("经过几次迭代后，最佳的 S[k] 组合，被遴选出来了。令人惊奇的是，被选中的 S[k]，基本上都是照片上不同物体的边缘线，这些线段形状相似，区别在于方向。")]),a._v(" "),t("p",[a._v("Bruno Olshausen和 David Field 的算法结果，与 David Hubel 和Torsten Wiesel 的生理发现，不谋而合!")]),a._v(" "),t("p",[a._v("也就是说，复杂图形，往往由一些基本结构组成。比如下图：一个图可以通过用64种正交的edges(可以理解成正交的基本结构)来线性表示。比如样例的x可以用1-64个edges中的三个按照0.8,0.3,0.5的权重调和而成。而其他基本edge没有贡献，因此均为0 。")]),a._v(" "),t("img",{staticClass:"zoom-custom-imgs",attrs:{src:a.$withBase("/assets/img/ai/dlintro/sum/0b46f21fbe096b637955c20c02338744ebf8ac1a.png"),alt:"wxmp"}}),a._v(" "),t("p",[a._v("另外，不仅图像存在这个规律，声音也存在。人们从未标注的声音中发现了20种基本的声音结构，其余的声音可以由这20种基本结构合成。")]),a._v(" "),t("img",{staticClass:"zoom-custom-imgs",attrs:{src:a.$withBase("/assets/img/ai/dlintro/sum/a8773912b31bb051abbf2f74387adab44bede0d7.png"),alt:"wxmp"}}),a._v(" "),t("h3",{attrs:{id:"结构性特征表示"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#结构性特征表示"}},[a._v("#")]),a._v(" "),t("strong",[a._v("结构性特征表示")])]),a._v(" "),t("p",[a._v("小块的图形可以由基本edge构成，更结构化，更复杂的，具有概念性的图形如何表示呢?这就需要更高层次的特征表示，比如V2，V4。因此V1看像素级是像素级。V2看V1是像素级，这个是层次递进的，高层表达由底层表达的组合而成。专业点说就是基basis。V1取提出的basis是边缘，然后V2层是V1层这些basis的组合，这时候V2区得到的又是高一层的basis。即上一层的basis组合的结果，上上层又是上一层的组合basis……(所以有大牛说Deep learning就是“搞基”，因为难听，所以美其名曰Deep learning或者Unsupervised Feature Learning)")]),a._v(" "),t("img",{staticClass:"zoom-custom-imgs",attrs:{src:a.$withBase("/assets/img/ai/dlintro/sum/96dda144ad34598205cc79ce02f431adcbef842c.png"),alt:"wxmp"}}),a._v(" "),t("p",[a._v("直观上说，就是找到make sense的小patch再将其进行combine，就得到了上一层的feature，递归地向上learning feature。")]),a._v(" "),t("p",[a._v("在不同object上做training是，所得的edge basis 是非常相似的，但object parts和models 就会completely different了(那咱们分辨car或者face是不是容易多了)。")]),a._v(" "),t("img",{staticClass:"zoom-custom-imgs",attrs:{src:a.$withBase("/assets/img/ai/dlintro/sum/faedab64034f78f0c89006af77310a55b2191cd6.png"),alt:"wxmp"}}),a._v(" "),t("p",[a._v("我们知道需要层次的特征构建，由浅入深，但每一层该有多少个特征呢?")]),a._v(" "),t("p",[a._v("任何一种方法，特征越多，给出的参考信息就越多，准确性会得到提升。但特征多意味着计算复杂，探索的空间大，可以用来训练的数据在每个特征上就会稀疏，都会带来各种问题，并不一定特征越多越好。")]),a._v(" "),t("h2",{attrs:{id:"深度学习的基本思想"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#深度学习的基本思想"}},[a._v("#")]),a._v(" "),t("strong",[a._v("深度学习的基本思想")])]),a._v(" "),t("p",[a._v("假设我们有一个系统S，它有n层(S1,…Sn)，它的输入是I，输出是O，形象地表示为：I =>S1=>S2=>…..=>Sn => O，如果输出O等于输入I，即输入I经过这个系统变化之后没有任何的信息损失(呵呵，大牛说，这是不可能的。信息论中有个“信息逐层丢失”的说法(信息处理不等式)，设处理a信息得到b，再对b处理得到c，那么可以证明：a和c的互信息不会超过a和b的互信息。这表明信息处理不会增加信息，大部分处理会丢失信息。当然了，如果丢掉的是没用的信息那多好啊)，保持了不变，这意味着输入I经过每一层Si都没有任何的信息损失，即在任何一层Si，它都是原有信息(即输入I)的另外一种表示。现在回到我们的主题Deep Learning，我们需要自动地学习特征，假设我们有一堆输入I(如一堆图像或者文本)，假设我们设计了一个系统S(有n层)，我们通过调整系统中参数，使得它的输出仍然是输入I，那么我们就可以自动地获取得到输入I的一系列层次特征，即S1，…, Sn。")]),a._v(" "),t("p",[a._v("对于深度学习来说，其思想就是对堆叠多个层，也就是说这一层的输出作为下一层的输入。通过这种方式，就可以实现对输入信息进行分级表达了。")]),a._v(" "),t("p",[a._v("另外，前面是假设输出严格地等于输入，这个限制太严格，我们可以略微地放松这个限制，例如我们只要使得输入与输出的差别尽可能地小即可，这个放松会导致另外一类不同的Deep Learning方法。上述就是Deep Learning的基本思想。")]),a._v(" "),t("h2",{attrs:{id:"浅层学习和深度学习"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#浅层学习和深度学习"}},[a._v("#")]),a._v(" "),t("strong",[a._v("浅层学习和深度学习")])]),a._v(" "),t("p",[a._v("20世纪80年代末期，用于人工神经网络的反向传播算法(也叫Back Propagation算法或者BP算法)的发明，给机器学习带来了希望，掀起了基于统计模型的机器学习热潮。这个热潮一直持续到今天。人们发现，利用BP算法可以让一个人工神经网络模型从大量训练样本中学习统计规律，从而对未知事件做预测。这种基于统计的机器学习方法比起过去基于人工规则的系统，在很多方面显出优越性。这个时候的人工神经网络，虽也被称作多层感知机(Multi-layer Perceptron)，但实际是种只含有一层隐层节点的浅层模型。")]),a._v(" "),t("p",[a._v("20世纪90年代，各种各样的浅层机器学习模型相继被提出，例如支撑向量机(SVM，Support Vector Machines)、 Boosting、最大熵方法(如LR，Logistic Regression)等。这些模型的结构基本上可以看成带有一层隐层节点(如SVM、Boosting)，或没有隐层节点(如LR)。这些模型无论是在理论分析还是应用中都获得了巨大的成功。相比之下，由于理论分析的难度大，训练方法又需要很多经验和技巧，这个时期浅层人工神经网络反而相对沉寂。")]),a._v(" "),t("p",[a._v("2006年，加拿大多伦多大学教授、机器学习领域的泰斗Geoffrey Hinton和他的学生RuslanSalakhutdinov在《科学》上发表了一篇文章，开启了深度学习在学术界和工业界的浪潮。这篇文章有两个主要观点：1)多隐层的人工神经网络具有优异的特征学习能力，学习得到的特征对数据有更本质的刻画，从而有利于可视化或分类;2)深度神经网络在训练上的难度，可以通过“逐层初始化”(layer-wise pre-training)来有效克服，在这篇文章中，逐层初始化是通过无监督学习实现的。")]),a._v(" "),t("p",[a._v("当前多数分类、回归等学习方法为浅层结构算法，其局限性在于有限样本和计算单元情况下对复杂函数的表示能力有限，针对复杂分类问题其泛化能力受到一定制约。深度学习可通过学习一种深层非线性网络结构，实现复杂函数逼近，表征输入数据分布式表示，并展现了强大的从少数样本集中学习数据集本质特征的能力。(多层的好处是可以用较少的参数表示复杂的函数)")]),a._v(" "),t("img",{staticClass:"zoom-custom-imgs",attrs:{src:a.$withBase("/assets/img/ai/dlintro/sum/7dd98d1001e93901e444116275ec54e736d1962c.png"),alt:"wxmp"}}),a._v(" "),t("p",[a._v("深度学习的实质，是通过构建具有很多隐层的机器学习模型和海量的训练数据，来学习更有用的特征，从而最终提升分类或预测的准确性。因此，“深度模型”是手段，“特征学习”是目的。区别于传统的浅层学习，深度学习的不同在于：1)强调了模型结构的深度，通常有5层、6层，甚至10多层的隐层节点;2)明确突出了特征学习的重要性，也就是说，通过逐层特征变换，将样本在原空间的特征表示变换到一个新特征空间，从而使分类或预测更加容易。与人工规则构造特征的方法相比，利用大数据来学习特征，更能够刻画数据的丰富内在信息。")]),a._v(" "),t("h2",{attrs:{id:"深度学习与神经网络"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#深度学习与神经网络"}},[a._v("#")]),a._v(" "),t("strong",[a._v("深度学习与神经网络")])]),a._v(" "),t("p",[a._v("深度学习是机器学习研究中的一个新的领域，其动机在于建立、模拟人脑进行分析学习的神经网络，它模仿人脑的机制来解释数据，例如图像，声音和文本。深度学习是无监督学习的一种。")]),a._v(" "),t("p",[a._v("深度学习的概念源于人工神经网络的研究。含多隐层的多层感知器就是一种深度学习结构。深度学习通过组合低层特征形成更加抽象的高层表示属性类别或特征，以发现数据的分布式特征表示。")]),a._v(" "),t("p",[a._v("Deep learning本身算是machine learning的一个分支，简单可以理解为neural network的发展。大约二三十年前，neural network曾经是ML领域特别火热的一个方向，但是后来确慢慢淡出了，原因包括以下几个方面：")]),a._v(" "),t("p",[a._v("1)比较容易过拟合，参数比较难tune，而且需要不少trick;")]),a._v(" "),t("p",[a._v("2)训练速度比较慢，在层次比较少(小于等于3)的情况下效果并不比其它方法更优;")]),a._v(" "),t("p",[a._v("所以中间有大约20多年的时间，神经网络被关注很少，这段时间基本上是SVM和boosting算法的天下。但是，一个痴心的老先生Hinton，他坚持了下来，并最终(和其它人一起Bengio、Yann.lecun等)提成了一个实际可行的deep learning框架。")]),a._v(" "),t("p",[a._v("Deep learning与传统的神经网络之间有相同的地方也有很多不同：")]),a._v(" "),t("p",[a._v("二者的相同在于deep learning采用了神经网络相似的分层结构，系统由包括输入层、隐层(多层)、输出层组成的多层网络，只有相邻层节点之间有连接，同一层以及跨层节点之间相互无连接，每一层可以看作是一个logistic regression模型;这种分层结构，是比较接近人类大脑的结构的。")]),a._v(" "),t("img",{staticClass:"zoom-custom-imgs",attrs:{src:a.$withBase("/assets/img/ai/dlintro/sum/b58f8c5494eef01fe4bc8499eefe9925bd317dc6.png"),alt:"wxmp"}}),a._v(" "),t("p",[a._v("而为了克服神经网络训练中的问题，DL采用了与神经网络很不同的训练机制。传统神经网络中，采用的是back propagation的方式进行，简单来讲就是采用迭代的算法来训练整个网络，随机设定初值，计算当前网络的输出，然后根据当前输出和label之间的差去改变前面各层的参数，直到收敛(整体是一个梯度下降法)。而deep learning整体上是一个layer-wise的训练机制。")]),a._v(" "),t("h2",{attrs:{id:"深度学习的训练过程"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#深度学习的训练过程"}},[a._v("#")]),a._v(" "),t("strong",[a._v("深度学习的训练过程")])]),a._v(" "),t("p",[a._v("使用自下上升非监督学习(就是从底层开始，一层一层的往顶层训练)")]),a._v(" "),t("p",[a._v("采用无标定数据(有标定数据也可)分层训练各层参数，这一步可以看作是一个无监督训练过程，是和传统神经网络区别最大的部分(这个过程可以看作是feature learning过程)：")]),a._v(" "),t("p",[a._v("具体的，先用无标定数据训练第一层，训练时先学习第一层的参数(这一层可以看作是得到一个使得输出和输入差别最小的三层神经网络的隐层)，由于模型capacity的限制以及稀疏性约束，使得得到的模型能够学习到数据本身的结构，从而得到比输入更具有表示能力的特征;在学习得到第n-1层后，将n-1层的输出作为第n层的输入，训练第n层，由此分别得到各层的参数;")]),a._v(" "),t("p",[a._v("自顶向下的监督学习(就是通过带标签的数据去训练，误差自顶向下传输，对网络进行微调)")]),a._v(" "),t("p",[a._v("基于第一步得到的各层参数进一步fine-tune整个多层模型的参数，这一步是一个有监督训练过程;第一步类似神经网络的随机初始化初值过程，由于DL的第一步不是随机初始化，而是通过学习输入数据的结构得到的，因而这个初值更接近全局最优，从而能够取得更好的效果;所以deep learning效果好很大程度上归功于第一步的feature learning过程。")]),a._v(" "),t("h3",{attrs:{id:"cnns卷积神经网络"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#cnns卷积神经网络"}},[a._v("#")]),a._v(" "),t("strong",[a._v("CNNs卷积神经网络")])]),a._v(" "),t("p",[a._v("卷积神经网络是人工神经网络的一种，已成为当前语音分析和图像识别领域的研究热点。它的权值共享网络结构使之更类似于生物神经网络，降低了网络模型的复杂度，减少了权值的数量。该优点在网络的输入是多维图像时表现的更为明显，使图像可以直接作为网络的输入，避免了传统识别算法中复杂的特征提取和数据重建过程。卷积网络是为识别二维形状而特殊设计的一个多层感知器，这种网络结构对平移、比例缩放、倾斜或者共他形式的变形具有高度不变性。")]),a._v(" "),t("p",[a._v("CNNs是受早期的延时神经网络(TDNN)的影响。延时神经网络通过在时间维度上共享权值降低学习复杂度，适用于语音和时间序列信号的处理。")]),a._v(" "),t("p",[a._v("CNNs是第一个真正成功训练多层网络结构的学习算法。它利用空间关系减少需要学习的参数数目以提高一般前向BP算法的训练性能。CNNs作为一个深度学习架构提出是为了最小化数据的预处理要求。在CNN中，图像的一小部分(局部感受区域)作为层级结构的最低层的输入，信息再依次传输到不同的层，每层通过一个数字滤波器去获得观测数据的最显著的特征。这个方法能够获取对平移、缩放和旋转不变的观测数据的显著特征，因为图像的局部感受区域允许神经元或者处理单元可以访问到最基础的特征，例如定向边缘或者角点。")]),a._v(" "),t("h3",{attrs:{id:"卷积神经网络的历史"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#卷积神经网络的历史"}},[a._v("#")]),a._v(" "),t("strong",[a._v("卷积神经网络的历史")])]),a._v(" "),t("p",[a._v("1962年Hubel和Wiesel通过对猫视觉皮层细胞的研究，提出了感受野(receptive field)的概念，1984年日本学者Fukushima基于感受野概念提出的神经认知机(neocognitron)可以看作是卷积神经网络的第一个实现网络，也是感受野概念在人工神经网络领域的首次应用。神经认知机将一个视觉模式分解成许多子模式(特征)，然后进入分层递阶式相连的特征平面进行处理，它试图将视觉系统模型化，使其能够在即使物体有位移或轻微变形的时候，也能完成识别。")]),a._v(" "),t("p",[a._v("通常神经认知机包含两类神经元，即承担特征抽取的S-元和抗变形的C-元。S-元中涉及两个重要参数，即感受野与阈值参数，前者确定输入连接的数目，后者则控制对特征子模式的反应程度。许多学者一直致力于提高神经认知机的性能的研究：在传统的神经认知机中，每个S-元的感光区中由C-元带来的视觉模糊量呈正态分布。如果感光区的边缘所产生的模糊效果要比中央来得大，S-元将会接受这种非正态模糊所导致的更大的变形容忍性。我们希望得到的是，训练模式与变形刺激模式在感受野的边缘与其中心所产生的效果之间的差异变得越来越大。为了有效地形成这种非正态模糊，Fukushima提出了带双C-元层的改进型神经认知机。")]),a._v(" "),t("p",[a._v("Van Ooyen和Niehuis为提高神经认知机的区别能力引入了一个新的参数。事实上，该参数作为一种抑制信号，抑制了神经元对重复激励特征的激励。多数神经网络在权值中记忆训练信息。根据Hebb学习规则，某种特征训练的次数越多，在以后的识别过程中就越容易被检测。也有学者将进化计算理论与神经认知机结合，通过减弱对重复性激励特征的训练学习，而使得网络注意那些不同的特征以助于提高区分能力。上述都是神经认知机的发展过程，而卷积神经网络可看作是神经认知机的推广形式，神经认知机是卷积神经网络的一种特例。")]),a._v(" "),t("h3",{attrs:{id:"卷积神经网络的网络结构"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#卷积神经网络的网络结构"}},[a._v("#")]),a._v(" "),t("strong",[a._v("卷积神经网络的网络结构")])]),a._v(" "),t("p",[a._v("卷积神经网络是一个多层的神经网络，每层由多个二维平面组成，而每个平面由多个独立神经元组成。")]),a._v(" "),t("img",{staticClass:"zoom-custom-imgs",attrs:{src:a.$withBase("/assets/img/ai/dlintro/sum/1b4c510fd9f9d72af8288c41da2a2834349bbb1a.png"),alt:"wxmp"}}),a._v(" "),t("p",[a._v("卷积神经网络的概念示范：输入图像通过和三个可训练的滤波器和可加偏置进行卷积，滤波过程如图一，卷积后在C1层产生三个特征映射图，然后特征映射图中每组的四个像素再进行求和，加权值，加偏置，通过一个Sigmoid函数得到三个S2层的特征映射图。这些映射图再进过滤波得到C3层。这个层级结构再和S2一样产生S4。最终，这些像素值被光栅化，并连接成一个向量输入到传统的神经网络，得到输出。")]),a._v(" "),t("p",[a._v("一般地，C层为特征提取层，每个神经元的输入与前一层的局部感受野相连，并提取该局部的特征，一旦该局部特征被提取后，它与其他特征间的位置关系也随之确定下来;S层是特征映射层，网络的每个计算层由多个特征映射组成，每个特征映射为一个平面，平面上所有神经元的权值相等。特征映射结构采用影响函数核小的sigmoid函数作为卷积网络的激活函数，使得特征映射具有位移不变性。")]),a._v(" "),t("p",[a._v("此外，由于一个映射面上的神经元共享权值，因而减少了网络自由参数的个数，降低了网络参数选择的复杂度。卷积神经网络中的每一个特征提取层(C-层)都紧跟着一个用来求局部平均与二次提取的计算层(S-层)，这种特有的两次特征提取结构使网络在识别时对输入样本有较高的畸变容忍能力。")]),a._v(" "),t("h2",{attrs:{id:"卷积神经网络训练过程"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#卷积神经网络训练过程"}},[a._v("#")]),a._v(" "),t("strong",[a._v("卷积神经网络训练过程")])]),a._v(" "),t("p",[a._v("神经网络用于模式识别的主流是有指导学习网络，无指导学习网络更多的是用于聚类分析。对于有指导的模式识别，由于任一样本的类别是已知的，样本在空间的分布不再是依据其自然分布倾向来划分，而是要根据同类样本在空间的分布及不同类样本之间的分离程度找一种适当的空间划分方法，或者找到一个分类边界，使得不同类样本分别位于不同的区域内。这就需要一个长时间且复杂的学习过程，不断调整用以划分样本空间的分类边界的位置，使尽可能少的样本被划分到非同类区域中。")]),a._v(" "),t("p",[a._v("卷积网络在本质上是一种输入到输出的映射，它能够学习大量的输入与输出之间的映射关系，而不需要任何输入和输出之间的精确的数学表达式，只要用已知的模式对卷积网络加以训练，网络就具有输入输出对之间的映射能力。卷积网络执行的是有导师训练，所以其样本集是由形如：(输入向量，理想输出向量)的向量对构成的。所有这些向量对，都应该是来源于网络即将模拟的系统的实际“运行”结果。它们可以是从实际运行系统中采集来的。在开始训练前，所有的权都应该用一些不同的小随机数进行初始化。“小随机数”用来保证网络不会因权值过大而进入饱和状态，从而导致训练失败;“不同”用来保证网络可以正常地学习。实际上，如果用相同的数去初始化权矩阵，则网络无能力学习。")]),a._v(" "),t("p",[a._v("训练算法与传统的BP算法差不多。主要包括4步，这4步被分为两个阶段：")]),a._v(" "),t("h3",{attrs:{id:"第一阶段-向前传播阶段"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#第一阶段-向前传播阶段"}},[a._v("#")]),a._v(" "),t("strong",[a._v("第一阶段，向前传播阶段")]),a._v("：")]),a._v(" "),t("p",[a._v("a)从样本集中取一个样本(X,Yp)，将X输入网络;")]),a._v(" "),t("p",[a._v("b)计算相应的实际输出Op。")]),a._v(" "),t("p",[a._v("在此阶段，信息从输入层经过逐级的变换，传送到输出层。这个过程也是网络在完成训练后正常运行时执行的过程。在此过程中，网络执行的是计算(实际上就是输入与每层的权值矩阵相点乘，得到最后的输出结果)：Op=Fn(…(F2(F1(XpW(1))W(2))…)W(n))")]),a._v(" "),t("h3",{attrs:{id:"第二阶段-向后传播阶段"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#第二阶段-向后传播阶段"}},[a._v("#")]),a._v(" "),t("strong",[a._v("第二阶段，向后传播阶段")])]),a._v(" "),t("p",[a._v("a)算实际输出Op与相应的理想输出Yp的差;")]),a._v(" "),t("p",[a._v("b)按极小化误差的方法反向传播调整权矩阵。")]),a._v(" "),t("h3",{attrs:{id:"卷积神经网络的优点"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#卷积神经网络的优点"}},[a._v("#")]),a._v(" "),t("strong",[a._v("卷积神经网络的优点")])]),a._v(" "),t("p",[a._v("卷积神经网络CNN主要用来识别位移、缩放及其他形式扭曲不变性的二维图形。由于CNN的特征检测层通过训练数据进行学习，所以在使用CNN时，避免了显式的特征抽取，而隐式地从训练数据中进行学习;再者由于同一特征映射面上的神经元权值相同，所以网络可以并行学习，这也是卷积网络相对于神经元彼此相连网络的一大优势。卷积神经网络以其局部权值共享的特殊结构在语音识别和图像处理方面有着独特的优越性，其布局更接近于实际的生物神经网络，权值共享降低了网络的复杂性，特别是多维输入向量的图像可以直接输入网络这一特点避免了特征提取和分类过程中数据重建的复杂度。")]),a._v(" "),t("p",[a._v("流的分类方式几乎都是基于统计特征的，这就意味着在进行分辨前必须提取某些特征。然而，显式的特征提取并不容易，在一些应用问题中也并非总是可靠的。卷积神经网络，它避免了显式的特征取样，隐式地从训练数据中进行学习。这使得卷积神经网络明显有别于其他基于神经网络的分类器，通过结构重组和减少权值将特征提取功能融合进多层感知器。它可以直接处理灰度图片，能够直接用于处理基于图像的分类。")]),a._v(" "),t("h3",{attrs:{id:"卷积网络较一般神经网络在图像处理方面有如下优点"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#卷积网络较一般神经网络在图像处理方面有如下优点"}},[a._v("#")]),a._v(" "),t("strong",[a._v("卷积网络较一般神经网络在图像处理方面有如下优点")]),a._v("：")]),a._v(" "),t("p",[a._v("a)输入图像和网络的拓扑结构能很好的吻合;")]),a._v(" "),t("p",[a._v("b)特征提取和模式分类同时进行，并同时在训练中产生;")]),a._v(" "),t("p",[a._v("c)权重共享可以减少网络的训练参数，使神经网络结构变得更简单，适应性更强。")]),a._v(" "),t("h2",{attrs:{id:"参考文章"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#参考文章"}},[a._v("#")]),a._v(" 参考文章")]),a._v(" "),t("ul",[t("li",[a._v("https://baike.baidu.com/tashuo/browse/content?id=d4c4e5133c22d037e28f6be7")])])])}),[],!1,null,null,null);s.default=v.exports}}]);