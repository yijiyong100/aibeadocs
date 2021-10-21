(window.webpackJsonp=window.webpackJsonp||[]).push([[809],{1325:function(t,s,a){"use strict";a.r(s);var v=a(53),_=Object(v.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[t._v("TIP")]),t._v(" "),a("p",[t._v("本文主要是介绍 研发效能-5组重要指标 。")])]),t._v(" "),a("p"),a("div",{staticClass:"table-of-contents"},[a("ul",[a("li",[a("a",{attrs:{href:"#如何衡量研发效能-阿里资深技术专家提出了5组指标"}},[t._v("如何衡量研发效能？阿里资深技术专家提出了5组指标")])]),a("li",[a("a",{attrs:{href:"#研发效能的度量-五组指标回答研发效能的根本问题"}},[t._v("研发效能的度量——五组指标回答研发效能的根本问题")])]),a("li",[a("a",{attrs:{href:"#研发效能的度量-五组指标具体定义"}},[t._v("研发效能的度量——五组指标具体定义")]),a("ul",[a("li",[a("a",{attrs:{href:"#第一-持续发布能力。具体包含两个细分指标-分别是"}},[t._v("第一：持续发布能力。具体包含两个细分指标，分别是：")])]),a("li",[a("a",{attrs:{href:"#第二-需求响应周期。具体包含两个细分的指标-分别是"}},[t._v("第二：需求响应周期。具体包含两个细分的指标，分别是：")])]),a("li",[a("a",{attrs:{href:"#第三-交付吞吐率。"}},[t._v("第三：交付吞吐率。")])]),a("li",[a("a",{attrs:{href:"#第四-交付过程质量。"}},[t._v("第四：交付过程质量。")])]),a("li",[a("a",{attrs:{href:"#第五-对外交付质量。"}},[t._v("第五：对外交付质量。")])])])]),a("li",[a("a",{attrs:{href:"#一个度量指标实例-缺陷趋势图"}},[t._v("一个度量指标实例：缺陷趋势图")])]),a("li",[a("a",{attrs:{href:"#效能改进的目标设定-部分团队的2-1-1愿景"}},[t._v("效能改进的目标设定：部分团队的2-1-1愿景")])]),a("li",[a("a",{attrs:{href:"#总结"}},[t._v("总结")])]),a("li",[a("a",{attrs:{href:"#参考文章"}},[t._v("参考文章")])])])]),a("p"),t._v(" "),a("h2",{attrs:{id:"如何衡量研发效能-阿里资深技术专家提出了5组指标"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#如何衡量研发效能-阿里资深技术专家提出了5组指标"}},[t._v("#")]),t._v(" 如何衡量研发效能？阿里资深技术专家提出了5组指标")]),t._v(" "),a("p",[t._v("阿里妹导读：新的一年，相信很多产品技术团队把研发效能提升列为重要的目标，甚至还有团队为此专门成立了项目组。然而，到底什么是好的研发效能，却很少有人能够表达清楚。标准不清晰，又何谈提升？")]),t._v(" "),a("p",[t._v("今天，阿里研发效能部资深技术专家何勉老师，将与大家分享他多年的思考与观点，希望对你有所启发。")]),t._v(" "),a("p",[t._v("本文将明确定义研发效能，并提供度量的五大指标，为研发效能的提升指明目标，并衡量提升的效果。本文也是关于研发效能提升及产品交付方法系列文章的开篇，为之后介绍的产品交付方法是否有效设立了标准。")]),t._v(" "),a("img",{staticClass:"zoom-custom-imgs",attrs:{src:t.$withBase("/assets/img/projprod/rdefficiencyintro/intro-1.png"),alt:"wxmp"}}),t._v(" "),a("p",[a("strong",[t._v("效率竖井是研发效能改进的最大问题")])]),t._v(" "),a("p",[t._v("产品交付需要前后职能（如：产品、开发、测试等）和平行部门（如：前端、后端、算法等）的协作。传统方法更多关注各个职能和部门的独立改进。然而，过度局部优化，往往导致效率竖井，反而损害整体效率。")]),t._v(" "),a("img",{staticClass:"zoom-custom-imgs",attrs:{src:t.$withBase("/assets/img/projprod/rdefficiencyintro/intro-2.png"),alt:"wxmp"}}),t._v(" "),a("p",[t._v("什么是效率竖井呢？上图描述了传统开发方式下，产品交付面临的普遍困境——各职能和部门局部优化带来一系列问题，如：")]),t._v(" "),a("ul",[a("li",[a("ol",[a("li",[t._v("基于局部信息的工作优先级安排，造成不同部门和职能间相互等待，让需求无法顺畅流动。比如前、中、后台对工作的优先处理不一致，进度无法对齐，让已经开始的需求不能及时交付。")])])]),t._v(" "),a("li",[a("ol",{attrs:{start:"2"}},[a("li",[t._v("批量式的工作移交，带来进一步等待。为了最大化单个环节的效率，各职能往往倾向于批量接受和移交工作，如批量的集成，批量的转测等。进一步造成需求在过程中的积压和等待。")])])]),t._v(" "),a("li",[a("ol",{attrs:{start:"3"}},[a("li",[t._v("跨部门的问题，经常得不到及时和有效的处理。公共环境的维护，就是一个典型的问题，是影响用户需求的顺畅交付。过程中需求跨部门的有效澄清、接口对齐、问题排查是另一些常见的公共问题，它们都会造成需求无法顺畅进展。")])])])]),t._v(" "),a("p",[t._v("以上只是一部分问题，它们共同作用，结果是：站在各自的视角，每个部门都觉得自己繁忙且“高效”；然而，站在全局和业务的视角，系统对外的反应却非常迟缓。这就是所谓效率竖井。")]),t._v(" "),a("blockquote",[a("p",[t._v("效率竖井：由局部优化导致，表现为：各个环节和部门繁忙而“高效”，但总体的效率和响应速度却很低。它是研发效能提升的普遍症结所在。")])]),t._v(" "),a("img",{staticClass:"zoom-custom-imgs",attrs:{src:t.$withBase("/assets/img/projprod/rdefficiencyintro/intro-3.png"),alt:"wxmp"}}),t._v(" "),a("p",[t._v("上图的折线反映了效率竖井下，单个需求的交付过程。绿色线表示需求正在被处理，红色线则表示需求在等待中。工作量不大的需求，交付周期却很长。因为大部分时间需求都处于等待状态。各个局部一片繁忙，外部却抱怨连连，相信很多人会感同身受。")]),t._v(" "),a("p",[a("strong",[t._v("持续快速交付价值的能力”是效能改进的核心目标")]),t._v("*")]),t._v(" "),a("p",[t._v("要改进研发效能，我们必须走出效率竖井。为此组织必须把改进的焦点从关注各个资源环节，转向关注整个系统。")]),t._v(" "),a("img",{staticClass:"zoom-custom-imgs",attrs:{src:t.$withBase("/assets/img/projprod/rdefficiencyintro/intro-4.png"),alt:"wxmp"}}),t._v(" "),a("p",[t._v("上图反映了效能改进的关键——从以局部资源效率为核心，转变为价值流动效率为核心的改进。")]),t._v(" "),a("p",[t._v("资源效率指的是，各环节的资源利用率和产出情况，如：资源的忙闲程度、使用率、代码产出和测试执行速度等。流动效率指的是，用户价值在系统中的流动速度，如：用户需求从提出到交付的时长，它越短越好；或者是过程中等待时间的占比，它越小越好。")]),t._v(" "),a("p",[t._v("用户价值的流动是串起整个系统，促进整体优化的不二选择。为了提高价值的流动效率，组织就必须关注用户价值在系统中端到端的流动过程，改进整个系统，而不仅仅是局部环节。以此为基础，效能改进的目标是：持续快速交付价值的能力。这也是对研发效能的基本定义。")]),t._v(" "),a("blockquote",[a("p",[t._v("持续快速交付价值的能力，是研发效能的核心定义。为此我们必须把改进的焦点从局部资源效率，转向价值流动效率，以保证全局和系统的优化。")])]),t._v(" "),a("h2",{attrs:{id:"研发效能的度量-五组指标回答研发效能的根本问题"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#研发效能的度量-五组指标回答研发效能的根本问题"}},[t._v("#")]),t._v(" 研发效能的度量——五组指标回答研发效能的根本问题")]),t._v(" "),a("p",[t._v("以上定性的定义了研发效能。管理学之父德鲁克说：“如果你不能度量它，就无法改进它”。度量帮助我们更深刻认识研发效能，设定改进方向，并衡量改进效果。")]),t._v(" "),a("p",[t._v("产品开发过程中会产生大量的数据，但数据不是度量。好的度量的标准是：它要为回答一个根本的问题讲述完整的故事。效能度量要回答的根本问题就是：一个组织“持续快速交付价值的能力”怎么样？")]),t._v(" "),a("img",{staticClass:"zoom-custom-imgs",attrs:{src:t.$withBase("/assets/img/projprod/rdefficiencyintro/intro-5.png"),alt:"wxmp"}}),t._v(" "),a("p",[t._v("为回答这个问题，应该提供怎样的一个完整故事呢？基于在天猫新零售、闲鱼、优酷、阿里健康、研发中台、阿里云等部门持续实践和探索，我们发展并验证了系统的研发效能指标体系。如上图所示，它由5组指标构成，分别是：")]),t._v(" "),a("h2",{attrs:{id:"研发效能的度量-五组指标具体定义"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#研发效能的度量-五组指标具体定义"}},[t._v("#")]),t._v(" 研发效能的度量——五组指标具体定义")]),t._v(" "),a("h3",{attrs:{id:"第一-持续发布能力。具体包含两个细分指标-分别是"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#第一-持续发布能力。具体包含两个细分指标-分别是"}},[t._v("#")]),t._v(" 第一：持续发布能力。具体包含两个细分指标，分别是：")]),t._v(" "),a("ul",[a("li",[t._v("发布频率。 团队对外响应的速度不会大于其交付频率，发布频率约束团队对外响应和价值的流动速度。它的衡量标准是单位时间内的有效发布次数。")]),t._v(" "),a("li",[t._v("发布前置时间（也被称为变更前置时间），也就是从代码提交到功能上线花费的时间，它体现了团队发布的基本能力。如果时间开销很大，就不合适加大发版频率。")])]),t._v(" "),a("h3",{attrs:{id:"第二-需求响应周期。具体包含两个细分的指标-分别是"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#第二-需求响应周期。具体包含两个细分的指标-分别是"}},[t._v("#")]),t._v(" 第二：需求响应周期。具体包含两个细分的指标，分别是：")]),t._v(" "),a("ul",[a("li",[t._v("交付周期时间。指的是从确认用户提出的需求开始，到需求上线所经历的平均时长。它反映团队（包含业务、开发、运营等职能）对客户问题或业务机会的响应速度；")]),t._v(" "),a("li",[t._v("开发周期时间。指的是从开发团队理解需求开始，到需求可以上线所经历的平均时长。它反映技术团队的响应能力。")])]),t._v(" "),a("p",[t._v("区分交付周期和开发周期，是为了解耦并明确问题，以做出针对性的改进。其中，交付周期是最终的目标和检验标准。")]),t._v(" "),a("h3",{attrs:{id:"第三-交付吞吐率。"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#第三-交付吞吐率。"}},[t._v("#")]),t._v(" 第三：交付吞吐率。")]),t._v(" "),a("p",[t._v("指的是单位时间内交付需求的数量。关于这一点，常见的问题是，个数能准确反映交付效率吗？这是个问题。所以，我们更多强调单个团队的需求吞吐率的前后对比，统计意义上它足以反映趋势和问题。")]),t._v(" "),a("h3",{attrs:{id:"第四-交付过程质量。"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#第四-交付过程质量。"}},[t._v("#")]),t._v(" 第四：交付过程质量。")]),t._v(" "),a("p",[t._v("它包含两个细分的指标，分别是：")]),t._v(" "),a("ul",[a("li",[t._v("开发过程中缺陷的创建和修复时间分布。我们希望缺陷能够持续和及时地被发现，并且在发现后尽快修复；")]),t._v(" "),a("li",[t._v("缺陷库存。我们希望在整个开发过程中控制缺陷库存量，让产品始终处于接近可发布状态，奠定持续交付的基础。")])]),t._v(" "),a("p",[t._v("交付过程质量的核心是内建质量，也就是全过程和全时段的质量。而非依赖特定的阶段，如测试阶段；或特定的时段，如项目后期。内建质量是持续交付的基础，关于其具体度量方法，下文会给出详细实例。")]),t._v(" "),a("h3",{attrs:{id:"第五-对外交付质量。"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#第五-对外交付质量。"}},[t._v("#")]),t._v(" 第五：对外交付质量。")]),t._v(" "),a("p",[t._v("它包含两个细分的指标，分别是：1)单位时间的故障（线上问题）数；2）故障平均解决时长。这两者共同决定了系统的可用性。")]),t._v(" "),a("img",{staticClass:"zoom-custom-imgs",attrs:{src:t.$withBase("/assets/img/projprod/rdefficiencyintro/intro-6.png"),alt:"wxmp"}}),t._v(" "),a("p",[t._v("如上图所示，这5组指标，从流动效率、资源效率和质量三个方面讲述了一个完整的故事，回答了组织持续交付价值的能力如何这个核心问题。其中，持续发布能力和需求响应周期这两组指标反映价值的流动效率；吞吐率反映资源效率；交付过程质量和对外交付质量这两组指标共同反映质量水平。")]),t._v(" "),a("h2",{attrs:{id:"一个度量指标实例-缺陷趋势图"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#一个度量指标实例-缺陷趋势图"}},[t._v("#")]),t._v(" 一个度量指标实例：缺陷趋势图")]),t._v(" "),a("p",[t._v("针对这些指标，云效提供了丰富的度量图表，后续云效产品团队还会进行场景化的梳理，提高其可用性。我会及时跟进，用专门的文章介绍云效的完整度量方案。在这里我先介绍一个例子——关于过程质量的度量图表。")]),t._v(" "),a("p",[t._v("“缺陷趋势图”是云效新设计的度量图表，它反映交付过程中缺陷发现和移除的时间分布，以及缺陷的库存趋势。")]),t._v(" "),a("img",{staticClass:"zoom-custom-imgs",attrs:{src:t.$withBase("/assets/img/projprod/rdefficiencyintro/intro-7.png"),alt:"wxmp"}}),t._v(" "),a("p",[t._v("如上图所示，图形的横坐标是日期，横坐标上方红色竖条代表这一天发现缺陷数量；横坐标下方绿色竖条代表当天解决的缺陷数量；橙色曲线代表缺陷存量。图中左右两个部分比较了两种交付模式。")]),t._v(" "),a("p",[t._v("左半部分，团队属于小瀑布的开发模式。“迭代”前期，团队集中设计、编码，引入缺陷，但并未即时地集成和验证。缺陷一直掩藏在系统中，直到项目后期，团队才开始集成和测试，缺陷集中爆发。")]),t._v(" "),a("p",[t._v("小瀑布模式下，过程质量差，带来大量的返工、延期和交付质量问题。该模式下，产品的交付时间依赖于何时缺陷能被充分移除，当然不能做到持续交付，也无法快速响应外部的需求和变化。并且，这一模式通常都导致后期的赶工，埋下交付质量隐患。")]),t._v(" "),a("p",[t._v("右半部分，团队开始向持续交付模式演进。在整个迭代过程中，团队以小粒度的需求为单位开发，持续地集成和测试它们，即时发现和解决问题。缺陷库存得到控制，系统始终处于接近可发布状态。这一模式更接近持续发布状态，团队对外的响应能力随之增强。")]),t._v(" "),a("p",[t._v("缺陷趋势图从一个侧面反映了团队的开发和交付模式。它引导团队持续且尽早发现缺陷并及时移除它们。控制缺陷库存，让系统始终处于接近可发布状态，保障了持续交付能力和对外响应能力。")]),t._v(" "),a("p",[t._v("缺陷趋势图是云效研发效能度量图表中的一个。后面，我会用专门的文章系统地解读这些图表的使用。")]),t._v(" "),a("h2",{attrs:{id:"效能改进的目标设定-部分团队的2-1-1愿景"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#效能改进的目标设定-部分团队的2-1-1愿景"}},[t._v("#")]),t._v(" 效能改进的目标设定：部分团队的2-1-1愿景")]),t._v(" "),a("p",[t._v("以上，我们介绍了研发效能度量。基于这样的度量体系，应该设定怎样的目标呢？我们在多个团队的实施过程中，逐渐沉淀出了可供参考的目标体系，它可以总结为三个数字——“2-1-1”。")]),t._v(" "),a("p",[t._v("“2-1-1”最初来自天猫新零售，其后在闲鱼和研发中台、阿里云等团队完善和采用。什么是“2-1-1”呢？")]),t._v(" "),a("ul",[a("li",[t._v('“2"指的2周的交付周期，85%以上的需求可以在2周内交付；')]),t._v(" "),a("li",[t._v("第一个“1”指的是1周的开发周期，85%以上的需求可以在1周内开发完成；")]),t._v(" "),a("li",[t._v("第二个“1”指的是1小时的发布前置时间 - -提交代码后可以在1小时内完成发布。[1]")])]),t._v(" "),a("img",{staticClass:"zoom-custom-imgs",attrs:{src:t.$withBase("/assets/img/projprod/rdefficiencyintro/5indicators-1.png"),alt:"wxmp"}}),t._v(" "),a("p",[t._v("达成“2-1-1”的愿景并不容易。1小时的发布前置时间，需要持续交付流水线，产品架构体系和自动测试、自动部署等能力的提升。1周的开发周期，涉及更多的能力和实践，如：需求的拆分和管理，开发团队的分工协作模式，以及持续集成和持续测试实践；最困难的则是2周的交付周期，首先它要以另外两个指标为基础，同时还涉及整个组织各职能和部门的协调一致和紧密协作；")]),t._v(" "),a("p",[t._v("“2-1-1”的目标都是关于流动效率的，你可能会问，那资源效率和质量呢？我们专注于流动效率，是因为它是组织效能改进的抓手，能够触发深层次的和系统性的改进。就像上面分析的，为达成“2-1-1”目标，团队需要技术、管理、协作等方面的全面实践升级，而这些实践的落地，必然会带来资源效率和质量的提升，并体现到相应的度量指标上。")]),t._v(" "),a("p",[t._v("当然，“2-1-1”是源自特定的团队，并非所有团队都要使用同样的值，比如对于涉及硬件开发的团队，两周的交付周期通常过于挑战。组织应根据自己的上下文设定恰当的目标，重要的是，它要指明改进的方向。")]),t._v(" "),a("h2",{attrs:{id:"总结"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#总结"}},[t._v("#")]),t._v(" 总结")]),t._v(" "),a("p",[t._v("本文定义了研发效能，它指的是一个组织持续快速交付价值的能力，可以从流动效率、资源效率和质量三个方面来衡量。其中流动效率是改进研发效能的核心抓手，它带来系统和全局的改进。")]),t._v(" "),a("img",{staticClass:"zoom-custom-imgs",attrs:{src:t.$withBase("/assets/img/projprod/rdefficiencyintro/5indicators-2.png"),alt:"wxmp"}}),t._v(" "),a("p",[t._v("如上图所示，研发效能最终为组织效能服务，必须体现到利润、增长、客户满意度等组织效能上；同时，研发效能的提升要落实到具体技术和管理的实践中，才可能发生。")]),t._v(" "),a("p",[t._v("定义和度量是提升研发效能的基础，相信你更关心提升研发的具体实践和方法。后续，何勉老师将综合多个团队的实践，介绍可操作的实践体系和落地方法，还请持续关注“阿里技术”公众号，我们将尽快为你送上。")]),t._v(" "),a("p",[t._v("注:")]),t._v(" "),a("p",[t._v("【1】最早云零售部门（天猫新零售的前身）提出的目标是2-1-3，前面的“2”和“1”的含义相同，不同的是最后一个“3”指30分钟——30分总完成发布前的回归测试，但不包含发布过程。天猫新零售的2-1-3是这一愿景的最初版本，后来阿里其他团队（最早是闲鱼）将30分钟改为了1小时，并包含了发布在内，这就是“2-1-1”目标的由来。")]),t._v(" "),a("h2",{attrs:{id:"参考文章"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#参考文章"}},[t._v("#")]),t._v(" 参考文章")]),t._v(" "),a("ul",[a("li",[t._v("https://blog.csdn.net/b0Q8cpra539haFS7/article/details/87310155")])])])}),[],!1,null,null,null);s.default=_.exports}}]);