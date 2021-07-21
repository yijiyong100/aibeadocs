---
title: 数据结构和算法介绍
---

::: tip
本文主要是关于数据结构和算法介绍 。
:::

[[toc]]

## 数据结构

数据结构是计算机存储、组织数据的方式。数据结构是指相互之间存在一种或多种特定关系的数据元素的集合。通常情况下，精心选择的数据结构可以带来更高的运行或者存储效率。数据结构往往同高效的检索算法和索引技术有关。

## 定义

数据结构(data structure)是带有结构特性的数据元素的集合，它研究的是数据的逻辑结构和数据的物理结构以及它们之间的相互关系，并对这种结构定义相适应的运算，设计出相应的算法，并确保经过这些运算以后所得到的新结构仍保持原来的结构类型。简而言之，数据结构是相互之间存在一种或多种特定关系的数据元素的集合，即带“结构”的数据元素的集合。“结构”就是指数据元素之间存在的关系，分为逻辑结构和存储结构。
数据结构的研究内容是构造复杂软件系统的基础，它的核心技术是分解与抽象。通过分解可以划分出数据的层次；再通过抽象，舍弃数据元素的具体内容，就得到逻辑结构。类似地，通过分解将处理要求划分成各种功能，再通过抽象舍弃实现细节，就得到运算的定义。上述两个方面的结合可以将问题变换为数据结构。这是一个从具体（即具体问题）到抽象（即数据结构）的过程。然后，通过增加对实现细节的考虑进一步得到存储结构和实现运算，从而完成设计任务。这是一个从抽象（即数据结构）到具体（即具体实现）的过程。

## 研究对象

### 数据的逻辑结构

指反映数据元素之间的逻辑关系的数据结构，其中的逻辑关系是指数据元素之间的前后间关系，而与他们在计算机中的存储位置无关。逻辑结构包括：
1.集合：数据结构中的元素之间除了“同属一个集合” 的相互关系外，别无其他关系；
2.线性结构：数据结构中的元素存在一对一的相互关系；
3.树形结构：数据结构中的元素存在一对多的相互关系；
4.图形结构：数据结构中的元素存在多对多的相互关系。

### 数据的物理结构

指数据的逻辑结构在计算机存储空间的存放形式。
数据的物理结构是数据结构在计算机中的表示（又称映像），它包括数据元素的机内表示和关系的机内表示。由于具体实现的方法有顺序、链接、索引、散列等多种，所以，一种数据结构可表示成一种或多种存储结构。
数据元素的机内表示（映像方法）： 用二进制位（bit）的位串表示数据元素。通常称这种位串为节点（node）。当数据元素有若干个数据项组成时，位串中与各个数据项对应的子位串称为数据域（data field）。因此，节点是数据元素的机内表示（或机内映像）。
关系的机内表示（映像方法）：数据元素之间的关系的机内表示可以分为顺序映像和非顺序映像，常用两种存储结构：顺序存储结构和链式存储结构。顺序映像借助元素在存储器中的相对位置来表示数据元素之间的逻辑关系。非顺序映像借助指示元素存储位置的指针（pointer）来表示数据元素之间的逻辑关系。

### 数据存储结构

数据的逻辑结构在计算机存储空间中的存放形式称为数据的物理结构(也称为存储结构)。一般来说，一种数据结构的逻辑结构根据需要可以表示成多种存储结构，常用的存储结构有顺序存储、链式存储、索引存储和哈希存储等。
数据的顺序存储结构的特点是：借助元素在存储器中的相对位置来表示数据元素之间的逻辑关系；非顺序存储的特点是：借助指示元素存储地址的指针表示数据元素之间的逻辑关系。

## 常用的数据结构

在计算机科学的发展过程中，数据结构也随之发展。程序设计中常用的数据结构包括如下几个。
<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/algorithm/basic/intro-1.png')" alt="wxmp">

### 数组(Array)

数组是一种聚合数据类型，它是将具有相同类型的若干变量有序地组织在一起的集合。数组可以说是最基本的数据结构，在各种编程语言中都有对应。一个数组可以分解为多个数组元素，按照数据元素的类型，数组可以分为整型数组、字符型数组、浮点型数组、指针数组和结构数组等。数组还可以有一维、二维以及多维等表现形式。

### 栈( Stack)

栈是一种特殊的线性表，它只能在一个表的一个固定端进行数据结点的插入和删除操作。栈按照后进先出的原则来存储数据，也就是说，先插入的数据将被压入栈底，最后插入的数据在栈顶，读出数据时，从栈顶开始逐个读出。栈在汇编语言程序中，经常用于重要数据的现场保护。栈中没有数据时，称为空栈。

### 队列(Queue)

队列和栈类似，也是一种特殊的线性表。和栈不同的是，队列只允许在表的一端进行插入操作，而在另一端进行删除操作。一般来说，进行插入操作的一端称为队尾，进行删除操作的一端称为队头。队列中没有元素时，称为空队列。

### 链表( Linked List)

链表是一种数据元素按照链式存储结构进行存储的数据结构，这种存储结构具有在物理上存在非连续的特点。链表由一系列数据结点构成，每个数据结点包括数据域和指针域两部分。其中，指针域保存了数据结构中下一个元素存放的地址。链表结构中数据元素的逻辑顺序是通过链表中的指针链接次序来实现的。

### 树( Tree)

树是典型的非线性结构，它是包括，2个结点的有穷集合K。在树结构中，有且仅有一个根结点，该结点没有前驱结点。在树结构中的其他结点都有且仅有一个前驱结点，而且可以有两个后继结点，m≥0。

### 图(Graph)

图是另一种非线性数据结构。在图结构中，数据结点一般称为顶点，而边是顶点的有序偶对。如果两个顶点之间存在一条边，那么就表示这两个顶点具有相邻关系。

### 堆(Heap)

堆是一种特殊的树形数据结构，一般讨论的堆都是二叉堆。堆的特点是根结点的值是所有结点中最小的或者最大的，并且根结点的两个子树也是一个堆结构。

### 散列表(Hash)

散列表源自于散列函数(Hash function)，其思想是如果在结构中存在关键字和T相等的记录，那么必定在F(T)的存储位置可以找到该记录，这样就可以不用进行比较操作而直接取得所查记录。

## 常用算法

数据结构研究的内容：就是如何按一定的逻辑结构，把数据组织起来，并选择适当的存储表示方法把逻辑结构组织好的数据存储到计算机的存储器里。算法研究的目的是为了更有效的处理数据，提高数据运算效率。数据的运算是定义在数据的逻辑结构上，但运算的具体实现要在存储结构上进行。一般有以下几种常用运算：
(1)检索。检索就是在数据结构里查找满足一定条件的节点。一般是给定一个某字段的值，找具有该字段值的节点。
(2)插入。往数据结构中增加新的节点。
(3)删除。把指定的结点从数据结构中去掉。
(4)更新。改变指定节点的一个或多个字段的值。
(5)排序。把节点按某种指定的顺序重新排列。例如递增或递减。
<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/algorithm/basic/intro-2.png')" alt="wxmp">



## 算法

算法（Algorithm）是指解题方案的准确而完整的描述，是一系列解决问题的清晰指令，算法代表着用系统的方法描述解决问题的策略机制。也就是说，能够对一定规范的输入，在有限时间内获得所要求的输出。如果一个算法有缺陷，或不适合于某个问题，执行这个算法将不会解决这个问题。不同的算法可能用不同的时间、空间或效率来完成同样的任务。一个算法的优劣可以用空间复杂度与时间复杂度来衡量。

## 特征

一个算法应该具有以下五个重要的特征：

### 有穷性（Finiteness）

算法的有穷性是指算法必须能在执行有限个步骤之后终止；

### 确切性(Definiteness)

算法的每一步骤必须有确切的定义；

### 输入项(Input)

一个算法有0个或多个输入，以刻画运算对象的初始情况，所谓0个输入是指算法本身定出了初始条件；

### 输出项(Output)

一个算法有一个或多个输出，以反映对输入数据加工后的结果。没有输出的算法是毫无意义的；

### 可行性(Effectiveness)

算法中执行的任何计算步骤都是可以被分解为基本的可执行的操作步骤，即每个计算步骤都可以在有限时间内完成（也称之为有效性）。

## 要素

### 一、数据对象的运算和操作

计算机可以执行的基本操作是以指令的形式描述的。一个计算机系统能执行的所有指令的集合，成为该计算机系统的指令系统。一个计算机的基本运算和操作有如下四类：
1.算术运算：加减乘除等运算
2.逻辑运算：或、且、非等运算
3.关系运算：大于、小于、等于、不等于等运算
4.数据传输：输入、输出、赋值等运算

### 二、算法的控制结构

一个算法的功能结构不仅取决于所选用的操作，而且还与各操作之间的执行顺序有关。

## 评定

同一问题可用不同算法解决，而一个算法的质量优劣将影响到算法乃至程序的效率。算法分析的目的在于选择合适算法和改进算法。一个算法的评价主要从时间复杂度和空间复杂度来考虑。

### 时间复杂度

算法的时间复杂度是指执行算法所需要的计算工作量。一般来说，计算机算法是问题规模n 的函数f(n)，算法的时间复杂度也因此记做。
T(n)=Ο(f(n))
因此，问题的规模n 越大，算法执行的时间的增长率与f(n) 的增长率正相关，称作渐进时间复杂度（Asymptotic Time Complexity）。

### 空间复杂度

算法的空间复杂度是指算法需要消耗的内存空间。其计算和表示方法与时间复杂度类似，一般都用复杂度的渐近性来表示。同时间复杂度相比，空间复杂度的分析要简单得多。

```bash
算法的时间复杂度和空间复杂度是衡量一个算法优劣的重要指标，也是面试常问的问题。
1
```

### 正确性

算法的正确性是评价一个算法优劣的最重要的标准。

### 可读性

算法的可读性是指一个算法可供人们阅读的容易程度。

### 健壮性

健壮性是指一个算法对不合理数据输入的反应能力和处理能力，也称为容错性。

## 方法

### 递推法

递推是序列计算机中的一种常用算法。它是按照一定的规律来计算序列中的每个项，通常是通过计算机前面的一些项来得出序列中的指定项的值。其思想是把一个复杂的庞大的计算过程转化为简单过程的多次重复，该算法利用了计算机速度快和不知疲倦的机器特点。

### 递归法

程序调用自身的编程技巧称为递归（recursion）。一个过程或函数在其定义或说明中有直接或间接调用自身的一种方法，它通常把一个大型复杂的问题层层转化为一个与原问题相似的规模较小的问题来求解，递归策略只需少量的程序就可描述出解题过程所需要的多次重复计算，大大地减少了程序的代码量。递归的能力在于用有限的语句来定义对象的无限集合。一般来说，递归需要有边界条件、递归前进段和递归返回段。当边界条件不满足时，递归前进；当边界条件满足时，递归返回。
注意：
(1) 递归就是在过程或函数里调用自身;
(2) 在使用递归策略时，必须有一个明确的递归结束条件，称为递归出口。

### 穷举法

穷举法，或称为暴力破解法，其基本思路是：对于要解决的问题，列举出它的所有可能的情况，逐个判断有哪些是符合问题所要求的条件，从而得到问题的解。它也常用于对于密码的破译，即将密码进行逐个推算直到找出真正的密码为止。例如一个已知是四位并且全部由数字组成的密码，其可能共有10000种组合，因此最多尝试10000次就能找到正确的密码。理论上利用这种方法可以破解任何一种密码，问题只在于如何缩短试误时间。因此有些人运用计算机来增加效率，有些人辅以字典来缩小密码组合的范围。

### 贪心算法

贪心算法是一种对某些求最优解问题的更简单、更迅速的设计技术。
用贪心法设计算法的特点是一步一步地进行，常以当前情况为基础根据某个优化测度作最优选择，而不考虑各种可能的整体情况，它省去了为找最优解要穷尽所有可能而必须耗费的大量时间，它采用自顶向下,以迭代的方法做出相继的贪心选择,每做一次贪心选择就将所求问题简化为一个规模更小的子问题, 通过每一步贪心选择,可得到问题的一个最优解，虽然每一步上都要保证能获得局部最优解，但由此产生的全局解有时不一定是最优的，所以贪婪法不要回溯。
贪婪算法是一种改进了的分级处理方法，其核心是根据题意选取一种量度标准，然后将这多个输入排成这种量度标准所要求的顺序，按这种顺序一次输入一个量，如果这个输入和当前已构成在这种量度意义下的部分最佳解加在一起不能产生一个可行解，则不把此输入加到这部分解中。这种能够得到某种量度意义下最优解的分级处理方法称为贪婪算法。
对于一个给定的问题，往往可能有好几种量度标准。初看起来，这些量度标准似乎都是可取的，但实际上，用其中的大多数量度标准作贪婪处理所得到该量度意义下的最优解并不是问题的最优解，而是次优解。因此，选择能产生问题最优解的最优量度标准是使用贪婪算法的核心。
一般情况下，要选出最优量度标准并不是一件容易的事，但对某问题能选择出最优量度标准后，用贪婪算法求解则特别有效。

### 分治法

分治法是把一个复杂的问题分成两个或更多的相同或相似的子问题，再把子问题分成更小的子问题……直到最后子问题可以简单的直接求解，原问题的解即子问题的解的合并。
分治法所能解决的问题一般具有以下几个特征：
(1) 该问题的规模缩小到一定的程度就可以容易地解决；
(2) 该问题可以分解为若干个规模较小的相同问题，即该问题具有最优子结构性质；
(3) 利用该问题分解出的子问题的解可以合并为该问题的解；
(4) 该问题所分解出的各个子问题是相互独立的，即子问题之间不包含公共的子子问题。

### 动态规划法

动态规划是一种在数学和计算机科学中使用的，用于求解包含重叠子问题的最优化问题的方法。其基本思想是，将原问题分解为相似的子问题，在求解的过程中通过子问题的解求出原问题的解。动态规划的思想是多种算法的基础，被广泛应用于计算机科学和工程领域。
动态规划程序设计是对解最优化问题的一种途径、一种方法，而不是一种特殊算法。不象前面所述的那些搜索或数值计算那样，具有一个标准的数学表达式和明确清晰的解题方法。动态规划程序设计往往是针对一种最优化问题，由于各种问题的性质不同，确定最优解的条件也互不相同，因而动态规划的设计方法对不同的问题，有各具特色的解题方法，而不存在一种万能的动态规划算法，可以解决各类最优化问题。因此读者在学习时，除了要对基本概念和方法正确理解外，必须具体问题具体分析处理，以丰富的想象力去建立模型，用创造性的技巧去求解。

### 迭代法

迭代法也称辗转法，是一种不断用变量的旧值递推新值的过程，跟迭代法相对应的是直接法（或者称为一次解法），即一次性解决问题。迭代法又分为精确迭代和近似迭代。“二分法”和“牛顿迭代法”属于近似迭代法。迭代算法是用计算机解决问题的一种基本方法。它利用计算机运算速度快、适合做重复性操作的特点，让计算机对一组指令（或一定步骤）进行重复执行，在每次执行这组指令（或这些步骤）时，都从变量的原值推出它的一个新值。

### 分支界限法

分枝界限法是一个用途十分广泛的算法，运用这种算法的技巧性很强，不同类型的问题解法也各不相同。
分支定界法的基本思想是对有约束条件的最优化问题的所有可行解（数目有限）空间进行搜索。该算法在具体执行时，把全部可行的解空间不断分割为越来越小的子集（称为分支），并为每个子集内的解的值计算一个下界或上界（称为定界）。在每次分支后，对凡是界限超出已知可行解值那些子集不再做进一步分支，这样，解的许多子集（即搜索树上的许多结点）就可以不予考虑了，从而缩小了搜索范围。这一过程一直进行到找出可行解为止，该可行解的值不大于任何子集的界限。因此这种算法一般可以求得最优解。
与贪心算法一样，这种方法也是用来为组合优化问题设计求解算法的，所不同的是它在问题的整个可能解空间搜索，所设计出来的算法虽其时间复杂度比贪婪算法高，但它的优点是与穷举法类似，都能保证求出问题的最佳解，而且这种方法不是盲目的穷举搜索，而是在搜索过程中通过限界，可以中途停止对某些不可能得到最优解的子空间进一步搜索（类似于人工智能中的剪枝），故它比穷举法效率更高。

### 回溯法

回溯法（探索与回溯法）是一种选优搜索法，按选优条件向前搜索，以达到目标。但当探索到某一步时，发现原先选择并不优或达不到目标，就退回一步重新选择，这种走不通就退回再走的技术为回溯法，而满足回溯条件的某个状态的点称为“回溯点”。
其基本思想是，在包含问题的所有解的解空间树中，按照深度优先搜索的策略，从根结点出发深度探索解空间树。当探索到某一结点时，要先判断该结点是否包含问题的解，如果包含，就从该结点出发继续探索下去，如果该结点不包含问题的解，则逐层向其祖先结点回溯。（其实回溯法就是对隐式图的深度优先搜索算法）。 若用回溯法求问题的所有解时，要回溯到根，且根结点的所有可行的子树都要已被搜索遍才结束。 而若使用回溯法求任一个解时，只要搜索到问题的一个解就可以结束。

## 参考文章
* https://blog.csdn.net/m0_46864744/article/details/111313303