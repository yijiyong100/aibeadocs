(window.webpackJsonp=window.webpackJsonp||[]).push([[194],{709:function(t,s,a){"use strict";a.r(s);var n=a(53),r=Object(n.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[t._v("TIP")]),t._v(" "),a("p",[t._v("本文主要是介绍 常用算法思想-动态规划 。")])]),t._v(" "),a("p"),a("div",{staticClass:"table-of-contents"},[a("ul",[a("li",[a("a",{attrs:{href:"#五大常用算法之二-动态规划算法"}},[t._v("五大常用算法之二：动态规划算法")])]),a("li",[a("a",{attrs:{href:"#一、基本概念"}},[t._v("一、基本概念")])]),a("li",[a("a",{attrs:{href:"#二、基本思想与策略"}},[t._v("二、基本思想与策略")])]),a("li",[a("a",{attrs:{href:"#三、适用的情况"}},[t._v("三、适用的情况")])]),a("li",[a("a",{attrs:{href:"#四、求解的基本步骤"}},[t._v("四、求解的基本步骤")])]),a("li",[a("a",{attrs:{href:"#五、算法实现的说明"}},[t._v("五、算法实现的说明")])]),a("li",[a("a",{attrs:{href:"#六、动态规划算法基本框架"}},[t._v("六、动态规划算法基本框架")])]),a("li",[a("a",{attrs:{href:"#参考文章"}},[t._v("参考文章")])])])]),a("p"),t._v(" "),a("h2",{attrs:{id:"五大常用算法之二-动态规划算法"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#五大常用算法之二-动态规划算法"}},[t._v("#")]),t._v(" 五大常用算法之二：动态规划算法")]),t._v(" "),a("h2",{attrs:{id:"一、基本概念"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#一、基本概念"}},[t._v("#")]),t._v(" 一、基本概念")]),t._v(" "),a("p",[t._v("动态规划过程是：每次决策依赖于当前状态，又随即引起状态的转移。一个决策序列就是在变化的状态中产生出来的，所以，这种多阶段最优化决策解决问题的过程就称为动态规划。")]),t._v(" "),a("h2",{attrs:{id:"二、基本思想与策略"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#二、基本思想与策略"}},[t._v("#")]),t._v(" 二、基本思想与策略")]),t._v(" "),a("p",[t._v("基本思想与分治法类似，也是将待求解的问题分解为若干个子问题（阶段），按顺序求解子阶段，前一子问题的解，为后一子问题的求解提供了有用的信息。在求解任一子问题时，列出各种可能的局部解，通过决策保留那些有可能达到最优的局部解，丢弃其他局部解。依次解决各子问题，最后一个子问题就是初始问题的解。")]),t._v(" "),a("p",[t._v("由于动态规划解决的问题多数有重叠子问题这个特点，为减少重复计算，对每一个子问题只解一次，将其不同阶段的不同状态保存在一个二维数组中。")]),t._v(" "),a("p",[t._v("与分治法最大的差别是：适合于用动态规划法求解的问题，经分解后得到的子问题往往不是互相独立的（即下一个子阶段的求解是建立在上一个子阶段的解的基础上，进行进一步的求解）。")]),t._v(" "),a("hr"),t._v(" "),a("h2",{attrs:{id:"三、适用的情况"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#三、适用的情况"}},[t._v("#")]),t._v(" 三、适用的情况")]),t._v(" "),a("p",[t._v("能采用动态规划求解的问题的一般要具有3个性质：")]),t._v(" "),a("p",[t._v("(1) 最优化原理：如果问题的最优解所包含的子问题的解也是最优的，就称该问题具有最优子结构，即满足最优化原理。")]),t._v(" "),a("p",[t._v("(2) 无后效性：即某阶段状态一旦确定，就不受这个状态以后决策的影响。也就是说，某状态以后的过程不会影响以前的状态，只与当前状态有关。")]),t._v(" "),a("p",[t._v("（3）有重叠子问题：即子问题之间是不独立的，一个子问题在下一阶段决策中可能被多次使用到。（该性质并不是动态规划适用的必要条件，但是如果没有这条性质，动态规划算法同其他算法相比就不具备优势）")]),t._v(" "),a("hr"),t._v(" "),a("h2",{attrs:{id:"四、求解的基本步骤"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#四、求解的基本步骤"}},[t._v("#")]),t._v(" 四、求解的基本步骤")]),t._v(" "),a("p",[t._v("动态规划所处理的问题是一个多阶段决策问题，一般由初始状态开始，通过对中间阶段决策的选择，达到结束状态。这些决策形成了一个决策序列，同时确定了完成整个过程的一条活动路线(通常是求最优的活动路线)。如图所示。动态规划的设计都有着一定的模式，一般要经历以下几个步骤。")]),t._v(" "),a("p",[t._v("初始状态→│决策１│→│决策２│→…→│决策ｎ│→结束状态")]),t._v(" "),a("p",[t._v("​            图1 动态规划决策过程示意图")]),t._v(" "),a("p",[t._v("(1)"),a("strong",[t._v("划分阶段")]),t._v("：按照问题的时间或空间特征，把问题分为若干个阶段。在划分阶段时，注意划分后的阶段一定要是有序的或者是可排序的，否则问题就无法求解。")]),t._v(" "),a("p",[t._v("(2)"),a("strong",[t._v("确定状态和状态变量")]),t._v("：将问题发展到各个阶段时所处于的各种客观情况用不同的状态表示出来。当然，状态的选择要满足无后效性。")]),t._v(" "),a("p",[t._v("(3)"),a("strong",[t._v("确定决策并写出状态转移方程")]),t._v("：因为决策和状态转移有着天然的联系，状态转移就是根据上一阶段的状态和决策来导出本阶段的状态。所以如果确定了决策，状态转移方程也就可写出。但事实上常常是反过来做，根据相邻两个阶段的状态之间的关系来确定决策方法和状态转移方程。")]),t._v(" "),a("p",[t._v("(4)"),a("strong",[t._v("寻找边界条件")]),t._v("：给出的状态转移方程是一个递推式，需要一个递推的终止条件或边界条件。")]),t._v(" "),a("p",[t._v("一般，只要解决问题的阶段、状态和状态转移决策确定了，就可以写出状态转移方程（包括边界条件）。")]),t._v(" "),a("p",[t._v("实际应用中可以按以下几个简化的步骤进行设计：")]),t._v(" "),a("p",[t._v("（1）分析最优解的性质，并刻画其结构特征。")]),t._v(" "),a("p",[t._v("（2）递归的定义最优解。")]),t._v(" "),a("p",[t._v("（3）以自底向上或自顶向下的记忆化方式（备忘录法）计算出最优值")]),t._v(" "),a("p",[t._v("（4）根据计算最优值时得到的信息，构造问题的最优解")]),t._v(" "),a("hr"),t._v(" "),a("h2",{attrs:{id:"五、算法实现的说明"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#五、算法实现的说明"}},[t._v("#")]),t._v(" 五、算法实现的说明")]),t._v(" "),a("p",[t._v("动态规划的主要难点在于理论上的设计，也就是上面4个步骤的确定，一旦设计完成，实现部分就会非常简单。")]),t._v(" "),a("p",[t._v("使用动态规划求解问题，最重要的就是确定动态规划三要素：")]),t._v(" "),a("p",[t._v("（1）问题的阶段 （2）每个阶段的状态")]),t._v(" "),a("p",[t._v("（3）从前一个阶段转化到后一个阶段之间的递推关系。")]),t._v(" "),a("p",[t._v("递推关系必须是从次小的问题开始到较大的问题之间的转化，从这个角度来说，动态规划往往可以用递归程序来实现，不过因为递推可以充分利用前面保存的子问题的解来减少重复计算，所以对于大规模问题来说，有递归不可比拟的优势，这也是动态规划算法的核心之处。")]),t._v(" "),a("p",[t._v("确定了动态规划的这三要素，整个求解过程就可以用一个最优决策表来描述，最优决策表是一个二维表，其中行表示决策的阶段，列表示问题状态，表格需要填写的数据一般对应此问题的在某个阶段某个状态下的最优值（如最短路径，最长公共子序列，最大价值等），填表的过程就是根据递推关系，从1行1列开始，以行或者列优先的顺序，依次填写表格，最后根据整个表格的数据通过简单的取舍或者运算求得问题的最优解。")]),t._v(" "),a("p",[t._v("​      "),a("strong",[t._v("f(n,m)=max{f(n-1,m), f(n-1,m-w[n])+P(n,m)}")])]),t._v(" "),a("hr"),t._v(" "),a("h2",{attrs:{id:"六、动态规划算法基本框架"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#六、动态规划算法基本框架"}},[t._v("#")]),t._v(" 六、动态规划算法基本框架")]),t._v(" "),a("div",{staticClass:"language-c extra-class"},[a("pre",{pre:!0,attrs:{class:"language-c"}},[a("code",[t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("for")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("j"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" j"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<=")]),t._v("m"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" j"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("j"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 第一个阶段")]),t._v("\n "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),t._v("    xn"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("j"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" 初始值"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("3")]),t._v(" \n "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("4")]),t._v("  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("for")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("i"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("n"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" i"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">=")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" i"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("i"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 其他n-1个阶段")]),t._v("\n "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("5")]),t._v("    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("for")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("j"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" j"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">=")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("f")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("i"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" j"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("j"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//f(i)与i有关的表达式")]),t._v("\n "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("6")]),t._v("      xi"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("j"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("j"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("max（或min）"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("g")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("xi"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("j1"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v("j2"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("g")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("xi"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("jk"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v("jk"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("8")]),t._v(" \n "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("9")]),t._v(" t "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("g")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("x1"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("j1"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v("j2"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 由子问题的最优解求解整个问题的最优解的方案")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("10")]),t._v(" \n"),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("11")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("print")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("x1"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("j1"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("12")]),t._v(" \n"),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("13")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("for")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("i"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" i"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<=")]),t._v("n"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" i"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("i"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),t._v("）\n"),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("15")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("  \n"),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("17")]),t._v("      t "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" t"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("xi"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("ji"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("18")]),t._v(" \n"),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("19")]),t._v("      "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("for")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("j"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" j"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">=")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("f")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("i"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" j"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("j"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("21")]),t._v("         "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("t"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("xi"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("ji"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("23")]),t._v("              "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("break")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("25")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("h2",{attrs:{id:"参考文章"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#参考文章"}},[t._v("#")]),t._v(" 参考文章")]),t._v(" "),a("ul",[a("li",[t._v("https://www.cnblogs.com/steven_oyj/archive/2010/05/22/1741374.html")])])])}),[],!1,null,null,null);s.default=r.exports}}]);