---
title: 开发效率-常用提升方法
---

::: tip
本文主要是介绍 开发效率-常用提升方法 。
:::

[[toc]]

## 提高软件开发效率的方法


一个开发任务下达以后，我们希望尽快的实现的，对软件开发工程师的要求是：多快好省

多--单位时间产量高

快--同样的产量所需的时间少

好--质量高

省--省钱，省时，省资源

这四个目标中最主要的又是“快”，也就是效率高，当然这四个指标之间也是有相互联系的。

###  1、加人和加班

提高效率的第一个办法就是**加人和加班**，这也是目前大多数企业采用的方法，特别的简单粗暴。首先看看加人，加人对项目开发效率的影响在起初人少的时候效果非常明显效，但是随着人员的增加，效率反而会降低。举一个饭店厨师炒菜的例子。厨房里的厨师越来越多，以至于人挤人，厨师都动不了了，那活如何干呢?谁都干不了。当然这是个极端的例子，而且人数增加，其沟通的成本也大幅增加，也容易人浮于事。加班呢？时间长，厨师的效率也下降啊。目前很多的企业采用加班的方式，实际提升的不是效率而是产量。人家一天工作8小时，我工作12个小时；虽然单位时间的效率低，但以天为衡量单位的话，自然效率高了，况且加班一般来说对企业的负担并不高。企业的加班加点是有其合理性的。

###  2、分工，流水线

第二个办法，就是**分工，流水线**。有人理菜，有人洗菜，有人切菜，有人炒菜，有人传菜。这就是厨房里有帮工和大厨的原因，也是现代泰勒制流水线的方法。员工的效率提高了，系统的效率也提高了。分工使得合作成为可能，分工的关键是合理划分阶段和模块。现代系统一般是多人共同合作完成的，我们很难想象一个人负责系统的所有开发工作。但是这也是有尽头的，流水线越长越好吗？还是以厨房为例，炒菜的工序再拆成打火，加油，加葱.....一群人围在一口锅旁，只为了打个火或加一勺油......这个景象也是够喜庆热闹和荒唐的！

###  3、多流水线，多厂房

第三个办法，采用**多流水线，多厂房**，这也是扩大规模。目前很多企业采用的方式，这适用于大规模生产的产品，同时其弊端也非常明显：投资太大，回收期长

### 4、招水平比较高的员工
第四个办法，就是**招水平比较高的员工**。这是一个好办法。如果高级工程师效率是初级工程师的4倍，但是工资不会是4倍的。但是这也有缺陷：1工程师的效率不会是无限的；2高级工程师的薪水也是比较高的，企业一旦项目不足，养人的成本是很高的，现在只有投入没有产出，那降低成本最明显和有效的措施就是裁人了，除非你是不可替代的，否则首先裁的就是工资高的人。

### 5、新技术，新设备
第五个办法就是采用**新技术，新设备**。比如厨房购置洗菜机，洗碗机等。

以上几种方法一般都要投入很多钱或其他资源的，那还有不需要投钱投人就可以提高效率的方法吗？有！那就是1改串行为并行；2复用；3减少不必要的工作；

看看厨房中是怎么做的：
### 6、调整工序，改串行为并行
第六种方法，就是**调整工序，改串行为并行**。做一道菜要经历理菜，洗菜，切菜，炒菜等过程。如果厨师也要负责理菜，洗菜，切菜的过程的话，这时候服务员在等着菜做出来，整个饭店的效率是低的，某个时间有的人忙死，有的人闲死；如果还是这几个人，但是每个人都有负责一道工序，整个厨房的效率是提高的（当然如果厨房里只有一个人的话，提高效率那也是很难的，具体如何改工序，大数学家华罗庚写的统筹方法说明的棒极了！）

### 7、复用【重点】
第七种方法，就是**复用**。厨房在不加人、物的情况下每天备好了菜，已经处理好，甚至是已经是加工成半成品了，客人有需要的时候，稍微加工一下就可以了。这些有些是自己做的，有些是外购的：净菜社、餐具清洁公司.......做菜就像搭积木一样。复用就是很多东西提前准备好，软件开发中有一句比较经典的话“不要重复做轮子”就是这个意思。减少不必要的工作也好理解，关键是如何做。我们也主要是研究这个，资源总是有限的，因而这也是比较有意义的。

### 8、做减法【减少不必要的工作】
第八种方法，**减少不必要的工作**。比如厨房里并不需要厨师知道某个菜是送到几号桌，只要把材料及要求交给厨师即可，厨师按章办事，厨师不需要跑到顾客面前问顾客需要什么，站在灶旁专心做菜就行。



在这里我们重点研究第七和第八种方法。为什么呢？主要是因为我们一般来说资源是及其有限的。小项目一个人搞定，稍微大一点搞一个开发小组，再大一点可能是项目组或项目部，但不管怎样，资源有限是关键。其主要的观点和策略是将“变”与“不变”进行区分，哪些是可变的，哪些是不可变的，这涉及到结构及结构之间的关系，不变的可以复用，变的部分重新开放。

## 效率提升法宝【复用】

### 复用的定义

复用就是很多东西提前准备好，软件开发中有一句比较经典的话“不要重复做轮子”就是这个意思。减少不必要的工作也好理解，关键是如何做。我们也主要是研究这个，资源总是有限的，因而这也是比较有意义的。

软件复用指的是利用已经存在的软件元素建立新的软件系统，这其中的软件元素既可以是软件产品、源程序，也可以是文档、设计思想甚至是领域知识。软件复用可以直接提高软件的开发效率、降低软件的开发成本、缩短软件的开发周期、提高软件质量。具体怎么进行复用？怎么减少不必要的工作呢？信息系统开发中如何实现呢？上述两种方法既有不同也有相同。

复用既可以复用自己的，也可以是复用别人的。复用别人的意思是不是每件事都要自己做的，充分发挥已有资源的优势（别人开发的代码、资料，开源的代码等，但要注意知识产权），这里主要分析如何复用自己的资源。

### 复用的关键点

**复用的关键点在于合理的划分模块**，**组织模块，减少不必要的耦合；减少不必要的工作的关键是直指本质，做关键的事。**复用其实也是一种减少不必要的工作的方法，如何减少不必要的工作远程复用。由于软件开发的复杂性，我们鼓励“合理的抄袭”，这就是复用，能够复用的部分或元素一般来说是经受了时间的考验，是安全可靠，值得信赖的。

这两项工作的立足点都在理解系统上。所开发的系统应该是结构化的，层次化的，易于理解的。我们理解事物，处理问题一般来说线性的，讲究过程，先干什么，再干什么（基于过程的，结构化的，以数据为中心，或者说是以‘对象’为中心的），而实际生活中我们遇到的问题常常是非线性的，这就要我们把它理顺，让系统容易理解。

复用有源代码及软构件的复用、框架的复用、架构的复用，以及业务模型、文档及过程、软件服务等的复用。源代码的复用是最常见也是最简单的复用形式，但由于软件系统的复杂性，很难大规模地重用已有源代码。框架、架构等的复用更确切的说是通过减少不必要的工作，提高开发效率的方法，这也是目前提高效率主要的方法。

### 源代码的复用：

复用的第1种方式是**复制、粘贴**。在小系统的时候这是一种好方法。但是弊端也很明显：复制、粘贴的东西一般来说总是要修改一番才好使用。代码处理的数据以及处理过程中的参数与处理的数据相关，改的的工作量很大。而且复制端（源端）如果要改的话，粘贴端（目的端）要修改吗？复制、粘贴以后发现粘贴的代码是有错误的，要修改复制端（源端）要改吗？另一方面系统中，粘贴的代码可能仅仅只有微小的改动，系统中重复的代码实在太多了，系统也比较臃肿。这都是个问题。

复用的第2种方法是**文件包含**。文件包含解决了复制端与粘贴端不一致的问题，部分解决了代码臃肿问题。

复用的第3种方式是**函数**。函数解决了代码重复、系统臃肿问题，且函数可以根据输入数据的不同有不同的输出结果。且实现了对处理过程的封装和抽象，易于理解。但是函数与数据的关系太密切，有可能数据处理的方法可能是相同的，不同的可能仅仅是数据类型的不同(比如整数和小数比较大小),或数据量的不同（比较三个整数的大小和比较四个整数的大小），这时候可能就要针对不同类型数据写不同的函数。而且函数明明是和数据密切联系的，偏偏将数据和处理数据的函数分割开。另外函数与函数之间也是有联系的，单纯的函数体现不出它们之间的联系。

复用的第4种方式是**宏**。宏是一种简单的替代。无参宏可以实现一处定义，处处使用，一处修改，处处修改。有参宏可以解决同一种方法，不同数据类型问题。但是宏也带来新问题：宏的错误难以定位，宏不对数据类型做检查，即使数据类型错误也照执行，带来了安全隐患。宏走向了函数的一个极端。

复用的第4种方式是**对象**。对象主要采用封装机制将数据与数据的处理方法解决数据与函数的分割问题，并体现函数之间的关系；采用多态解决数据类型问题；采用继承解决代码复用问题。

## 效率提升法宝【减少不必要的工作】


减少不必要的工作，争取一次成功是每个程序员的梦想和追求，但现实世界是复杂的，难以实现。软件开发的最大难题是需求变更，往往客户自己也是不清楚自己的真实的需求是什么。软件工作往往面临着大量的修改工作，修改就意味着重复，意味着大量的重复工作。对于代码我们有两阶段工作，一是创建代码，二是增加和修改代码。可以说软件开发也是增读改删（CRUD）的问题。我们希望创建的代码易理解、好修改，还要考虑以后的复用工作。**减少不必要的工作是提高软件开发效率的关键。**

### 1、合理规划
减少不必要的工作的第1种方式是**合理规划**。磨刀不误砍柴工，动手之前先想一想。合理规划有几条思想和原则很重要：

#### 原则1：不做重复的事（Don't Repeat Yourself）
这有两个层面的含义，一个的层面来说，别人干过的，或自己已经干过的就不要再干了，即为不要重复造轮子。另一个层面来说，系统的业务模块在你整个系统中能且只能出现一次。在一个系统内，每个知识必须有单一的，明确的，权威的呈现。

#### 原则2：保持简单直接（Keep it Simple Stupid，也叫KISS原则）。
通过尽可能容易的完成某件事情来实现精简方案，不要酷炫，简单即为美，小为美，小而简单也易于理解和实现。有一句话叫人不可能同时追两只兔子就是这个道理！也叫单一原则！

#### 原则3：你不需要它(You Ain’t Gonna Need It)。
不要试图解决所有问题，不要试图大而全，也不要试图解决一个问题的所有方面，这也体现了二八原则。

### 2、做好计划和文档

减少不必要的工作的第2种方式是**做好计划和文档**。分析设计工作应该是软件开发的重中之重，庙算、运筹帷幄说的就是计划的重要性，不能项目来了就撸起袖子加油干，而是应该停下脚步，好好调查一下，分析一下，思考一番。计划主要研究如何进行软件开发的项目管理工作，产品如何演进等，如敏捷开发方法。而文档也是很多技术人员比较感到头疼的问题，好记性不如烂笔头，但过度的文档也是负担。以上内容不详细述。

### 3、合理设计系统架构

减少不必要的工作的第3种方式是**合理设计系统架构**。降低系统复杂度的一个基本策略就是将它拆解成更小的单元。上面曾说复用的关键点在于合理的划分模块，组织模块，减少不必要的耦合。那么如何划分模块，如何组织模块，如何减少不必要的耦合呢？这属于软件架构的问题。

系统难以理解、难以修改，触一发而动全身，就是系统中对于“代码耦合”的结构问题。糟糕的代码耦合让整个系统变得难以理解、难以修改、难以分工、难以集成。系统的架构设计，是改善耦合的最好方式。架构设计的本质，就是：

　　划分耦合的单位——也就是划分模块。系统应该划分成什么样的模块，代表了设计者对于系统应对的需求的基本理解。一旦能清晰的划分出模块了，其代码耦合就有了最基本的范围。而模块本身也是提示程序员理解系统的基本单位。

　　规范耦合的形式——代码耦合的形式有很多种，如直接调用、事件响应、消息队列等等，这些形式提供了代码耦合的不同特征。直接调用的代码在静态阅读的时候非常容易理解，而事件响应则提供了运行时耦合的好处。耦合的形式还有另外一层含义，就是代码耦合的规范：那些模块之间应该直接耦合，哪些不能耦合，是否应该加入中间层次等等。

可以复用其他设计的架构，也可以采用自己设计的架构，针对某类问题也可以采用一定的软件构架（构架是已经具体实现的某种架构）。具体的软件构架问题后续再分析。

### 4、合理组织源文件

减少不必要的工作的第4种方式是**合理组织源文件。**从头开始进行软件开发可以说是创建代码。实现某个系统可以是单文件系统，也可以是多文件系统。目前的信息系统是少有单文件系统的。即使有单文件系统，其代码也是难以复用的，也难以多人合作。 软件工程师的成果是以代码的形式呈现的。各个模块分散在各个文件中，文件又以树形结构进行组织。厨房里至少也要按照生熟、荤素，红案白案等分类。

### 5、合理组织代码
减少不必要的工作的第5种方式是**合理组织代码**同样的功能可以采用不同的方法实现，如如何实现1~100的累加，如何实现排序等都比较著名，比如排序有冒泡排序、快速排序等，人们常有所谓将这些数据排列一下，排出个三六九等，实际如何排序并不关心，但实际的功能实现方法可是千差万别。组织代码就是研究代码实现某种功能以何种方式呈现和实现，数据结构，算法都属于此种方式，设计模式也属于此方面内容。算法和数据结构是研究如何实现某个功能，提高系统运行的**时间和空间效**率。不同的算法和数据结构当然会影响开发效率，合理组织代码强调在算法和数据结构等相同的情况下，如何提高系统**开发*效率**，简而言之就是实现同样的功能，如何代码写得少，写得快。合理组织代码重点研究设计模式等问题。使用设计模式是为了重用代码、让代码更容易被他人理解、保证代码可靠性，至于设计模式方面的内容， 允后再续；数据结构、算法等内容繁杂，理论极强，也不是重点，此处不予讨论。

减少不必要的工作的第6种方式是**规范代码编制。**合理的文件命名，编码规则，变量命名规则、必要的注释等属于此方面内容。代码模式也属于此部分内容。

上述6种方式，1要时刻记在脑子里（原则），2、6要成为制度性规定，4要形成习惯和行为模式，3、5是重点研究对象。

注意：[软件架构模式设计](https://zhidao.baidu.com/question/359596286.html)

在做软件[架构设计](https://www.baidu.com/s?wd=架构设计&tn=SE_PcZhidaonwhc_ngpagmjz&rsv_dl=gh_pc_zhidao)时,根据不同的抽象层次可分为三种不同层次的模式：架构模式(Architectural Pattern)、设计模式(Design Pattern)、代码模式(Coding Pattern)。

架构模式是一个系统的高层次策略，涉及到大尺度的组件以及整体性质和力学。架构模式的好坏可以影响到总体布局和框架性结构。

设计模式是中等尺度的结构策略。这些中等尺度的结构实现了一些大尺度组件的行为和它们之间的关系。模式的好坏不会影响到系统的总体布局和总体框架。设计模式定义出子系统或组件的微观结构。

代码模式（或成例）是特定的范例和与特定语言有关的编程技巧。代码模式的好坏会影响到一个中等尺度组件的内部、外部的结构或行为的底层细节，但不会影响到一个部件或子系统的中等尺度的结构，更不会影响到系统的总体布局和大尺度框架。

在《面向模式的软件体系架构》中将模式分为体系结构模式、设计模式和惯用法等三类。

在温煜的《软件架构设计》中将软件架构概念分为两大流派：组成派和决策派。我认为两派都有道理，都是从不同方面描述了同一个对象，不过我更赞成组成派：软件系统的架构将系统描述为接收组件及组件之间的交互。我之所以赞成这个概念是因为这样定义架构的话，对这个概念会产生比较直观和具体的理解，同时也易于描述（用图形来描述），而人是比较容易接受直观的和具体的描述的。架构设计当然涉及到一系列的决策，设计就是决策嘛。决策是普遍的，用普遍的东西来定义没法体现其特征，和没说差不多。 

## 参考文章
* https://blog.csdn.net/wxg_wuchujie88/article/details/86032030