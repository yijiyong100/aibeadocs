(window.webpackJsonp=window.webpackJsonp||[]).push([[810],{1326:function(_,v,t){"use strict";t.r(v);var s=t(53),a=Object(s.a)({},(function(){var _=this,v=_.$createElement,t=_._self._c||v;return t("ContentSlotsDistributor",{attrs:{"slot-key":_.$parent.slotKey}},[t("div",{staticClass:"custom-block tip"},[t("p",{staticClass:"custom-block-title"},[_._v("TIP")]),_._v(" "),t("p",[_._v("本文主要是介绍 研发效能-6个关键点 。")])]),_._v(" "),t("p"),t("div",{staticClass:"table-of-contents"},[t("ul",[t("li",[t("a",{attrs:{href:"#研发效能的六个关键点"}},[_._v("研发效能的六个关键点")])]),t("li",[t("a",{attrs:{href:"#_01-视角"}},[_._v("01 视角")])]),t("li",[t("a",{attrs:{href:"#_02-感知"}},[_._v("02 感知")])]),t("li",[t("a",{attrs:{href:"#_03-时间"}},[_._v("03 时间")])]),t("li",[t("a",{attrs:{href:"#_04-浪费"}},[_._v("04 浪费")])]),t("li",[t("a",{attrs:{href:"#_05-工作方式"}},[_._v("05 工作方式")])]),t("li",[t("a",{attrs:{href:"#_06-行为"}},[_._v("06 行为")])]),t("li",[t("a",{attrs:{href:"#参考文章"}},[_._v("参考文章")])])])]),t("p"),_._v(" "),t("h2",{attrs:{id:"研发效能的六个关键点"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#研发效能的六个关键点"}},[_._v("#")]),_._v(" 研发效能的六个关键点")]),_._v(" "),t("p",[_._v("最近与某互联网公司架构师讨论了研发效能中的问题，整理分享如下。")]),_._v(" "),t("h2",{attrs:{id:"_01-视角"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_01-视角"}},[_._v("#")]),_._v(" 01 视角")]),_._v(" "),t("p",[_._v("有许多评估团队产出的办法，比如代码行、功能点、故事点和故事卡数量，这种度量方式不仅存在偏差，而且是一种"),t("strong",[_._v("非常局部的度量方式")]),_._v("，现在都已不再适用。更有许多研发团队存在着这种情况，开发编码的效率很高，测试和部署工作量大，成为瓶颈，或者需求澄清和排程的时间长，压缩了开发时间，无法详细地设计和验证，质量下滑拖累了效率。从而导致最后效能问题“每天工作投入度和响应上，自己感知已经够快了，业务还说我们慢，原因在哪里我也说不清楚”。")]),_._v(" "),t("p",[_._v("这里的关键点在于，效能为谁度量，即以谁的视角来看待效能？由于研发最终的目标是交付到业务，那效能最终面对的还是业务视角。")]),_._v(" "),t("h2",{attrs:{id:"_02-感知"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_02-感知"}},[_._v("#")]),_._v(" 02 感知")]),_._v(" "),t("p",[_._v("很多时候业务感知的“慢”，在于需求的端到端交付周期过长，也在于过程的信息不透明。“一个小需求，也要那么久才能上线！”而开发感知到的是，需求的评估、排程和跨组/团队协同过程太耗时了，是因为在这个过程中等待太久，才导致周期拉得很长。")]),_._v(" "),t("p",[_._v("一个需求从提出到发布，通常会经过分析、澄清、计划、设计、开发、测试、部署到正式发布几个阶段。")]),_._v(" "),t("p",[_._v("那么在各个环节中，究竟多长时间是合适的呢？精益思想给出了一个度量方法，就是"),t("strong",[_._v("最小积压")]),_._v("，理想状态下是做到零库存，即没有需求积压。如果业务持续不断地接收到产出物，同时看到新需求不断进入处理过程，就很难感知到“很慢”了。")]),_._v(" "),t("p",[_._v("举个例子，同样是等，在星巴克你能看到你的杯子正在什么位置，咖啡师正在准备什么；外卖下单后，你能看到骑手的位置和状态，就能缓解等待的焦虑。而在研发过程中，因为信息不透明带来的需要同步的“会议”实在是太多了。")]),_._v(" "),t("h2",{attrs:{id:"_03-时间"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_03-时间"}},[_._v("#")]),_._v(" 03 时间")]),_._v(" "),t("p",[_._v("近些年我们推崇的是使用时间来度量效能，并且在数个咨询项目上通过这种度量方式驱动，成功地帮助团队找到了改进点，优化了整体的交付周期。")]),_._v(" "),t("p",[_._v("三个关键的时间度量指标是：")]),_._v(" "),t("p",[t("strong",[_._v("Lead Time（前置时间）")]),_._v("：业务感知效能的重要指示灯，是指从业务提出需求到最终需求发布到业务的时间间隔（自然日）。如需求于9月1日提出，9月30日发布，那Lead Time就为29天。又被称为需求端到端交付周期。")]),_._v(" "),t("p",[t("strong",[_._v("Cycle Time（周期时间）")]),_._v("：研发内部效能的重要指示灯，是指开发团队接受需求到交付业务验收的时间间隔（自然日），覆盖了分析、设计、编码、测试及修复缺陷的时间。通常也称之为交付周期。")]),_._v(" "),t("p",[t("strong",[_._v("Takt Time（节拍时间）")]),_._v("：研发节奏制定的重要参考值，是指开发团队在周期时间内完成需求的平均时间。比如周期时间为29天，共产出10个需求，节拍时间就为2.9天。精益的理想状态是单件流，即最小的批量不间断流转，节拍时间就是缩小批量大小，迈向不间断流转的重要依据。")]),_._v(" "),t("p",[_._v("度量了这几个时间，那又如何来说明效能呢？")]),_._v(" "),t("h2",{attrs:{id:"_04-浪费"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_04-浪费"}},[_._v("#")]),_._v(" 04 浪费")]),_._v(" "),t("p",[_._v("前面提到精益给出的度量标准，即最小积压。在交付的各个环节中等待的任务，都是积压，即是浪费。对研发中的浪费，我们设定在计划启动之后进行统计，并分类原因：")]),_._v(" "),t("ul",[t("li",[t("strong",[_._v("进入开发阶段而未投入实际工作量")]),_._v("：比如一次领了太多的任务，其中几个任务并没有产出，计为浪费，因计划不当引起。")]),_._v(" "),t("li",[t("strong",[_._v("完成开发等待评审/测试")]),_._v("：由于不同角色的协作不流畅引起。")]),_._v(" "),t("li",[t("strong",[_._v("重做/返工")]),_._v("：由于需求理解不正确或实现不正确引起。")]),_._v(" "),t("li",[t("strong",[_._v("完成测试后等待验收")]),_._v("：由于不同职能的协作不流畅引起。")])]),_._v(" "),t("p",[_._v("根据大量的咨询经验，许多效能问题，只需要消除浪费就能够显著地提升，这个提升比率最低在40%，最高在89%；一些跨团队协作的痛点，仅仅通过统一拆分任务和计划方式，就将协同任务的节拍时间下降了40%之多。")]),_._v(" "),t("h2",{attrs:{id:"_05-工作方式"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_05-工作方式"}},[_._v("#")]),_._v(" 05 工作方式")]),_._v(" "),t("p",[_._v("推行敏捷最重要的就是带给大家一种全新的工作方式：从一种自上而下领导式的计划和管理，变成自下而上的团队合作达成目标。为达成这个转变，团队需要掌握几项技能：")]),_._v(" "),t("p",[t("strong",[_._v("设定目标")]),_._v("：从业务和用户的视角理解需求，了解业务价值、使用者和痛点，而不仅仅是功能说明清单。")]),_._v(" "),t("p",[t("strong",[_._v("需求分解")]),_._v("：”需求跨不跨迭代“、”需求分几个迭代开发完成“，也是迭代式开发中的一个常见问题。正确答案是：在敏捷开发里，无论选择哪类需求载体，**特性、用户故事还是任务，都不应该在计划阶段设定为跨迭代交付，**除非迭代目标没达成，在评审会议上转入下一个迭代。没有正确的需求分解方法，是排不出正确的迭代计划的。")]),_._v(" "),t("p",[t("strong",[_._v("任务估算")]),_._v("：ESTIMATE翻译为估算一直以来都被视为一种对交付时间的承诺，所以让开发团队感觉很难操作。如果用中文更准确的表达应为“评估”，估算技术，是一种从时间上量化交付周期和风险的手段。比如采用斐波那契数列进行估算，就能够很好地为不确定的风险添加缓冲时间。")]),_._v(" "),t("p",[t("strong",[_._v("迭代/看板计划")]),_._v("：许多团队仅仅是划分了一个更小的周期，就把它当作迭代。甚至还有团队划分出来的是开发人员的一个容量包，比如两周的工作量，排进一个迭代，迭代N的交付物，是测试团队在迭代N+1的测试版本，然后在N+1迭代中又挤进一些不可预测的缺陷修复工作量，最后在N+2/3迭代中发布迭代N的需求**。这也是许多开发团队自称已做到“两周一迭代”而业务觉得没啥变化的原因**：真实的”需求迭代“应该在六到八周左右，差不多一个半月到两个月。看板又是另一种工作计划方式，需要比迭代更细致的优先级排序，形成任务队列。在看板上，团队自顶向下拉动任务卡至交付泳道。")]),_._v(" "),t("p",[_._v("规矩千万条，最后都落墙角。工作方式大家都口头接受了，但一执行又全跑歪，又该怎么办呢？")]),_._v(" "),t("h2",{attrs:{id:"_06-行为"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_06-行为"}},[_._v("#")]),_._v(" 06 行为")]),_._v(" "),t("p",[_._v("讨论中架构师谈到，不止研发效能，还包括架构和代码质量，都已经制定了严格的标准，团队也接受了，但就是很难执行，现在针对一个200人级别的大型重构项目，不得不组建近30人的治理团队，负责评审代码和接口，以避免架构质量走偏。")]),_._v(" "),t("p",[_._v("我认为，"),t("strong",[_._v("这是一种治标不治本的方式")]),_._v("。结果有偏差，问题的根源在哪里？代码已经不合格了，评审、退回、重做和返工都是浪费。效能的改进是致力于消除这种浪费，而许多技术型管理者关注和控制的落脚点在最终结果，而不是原因。有没有亲自到现场走查一下，这些不合格的代码、接口是怎么写出来的呢？")]),_._v(" "),t("p",[t("strong",[_._v("许多规范只是原则，而开发人员执行的是操作")]),_._v("。比如说一个接口的设计规范明明要求：满足向前兼容。但开发出来的新版本却把旧的功能破坏了。开发人员很可能并不知道什么叫“向前兼容”，这些原则对并不了解它们的人来说，根本不具备指导意义。如果改成：")]),_._v(" "),t("blockquote",[t("p",[t("strong",[_._v("禁止")]),_._v("修改不熟悉的代码，如要修改，请和代码编写者或技术负责人沟通，并编写对应的单元测试，以避免破坏系统功能。 "),t("strong",[_._v("禁止")]),_._v("修改已发布的接口实现代码， "),t("strong",[_._v("应该")]),_._v("使用扩展的方式添加新的代码功能。如果要停用某个接口， "),t("strong",[_._v("必须")]),_._v("添加注解。示例：@Deprecated")])]),_._v(" "),t("p",[_._v("这类问题就可以避免了。")]),_._v(" "),t("p",[t("strong",[_._v("许多开发人员并没有养成高效的工作习惯")]),_._v("。每天第一时间处理什么任务？接到任务后第一时间处理什么？下班之前哪些事项必须收尾？每个人在动手开动这一切时，指导他的，是他过去的经验、习惯和思维方式，而不是在某个会议上突然听到的声音。把具体的工作步骤成文，并辅导团队逐步形成习惯，结合绩效对过程标准的考核，才能杜绝频繁返工、衔接不畅的浪费。每个10人左右的小团队内，一定要有人单对单的辅导，这就是公司作为一个有效的组织，而非一群人的关键原因。许多技术人员的关注点在于系统，而未关注到系统开发的过程，而这个过程中，最本质的就是人的行为，造成了研发效能的根本影响。")]),_._v(" "),t("h2",{attrs:{id:"参考文章"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#参考文章"}},[_._v("#")]),_._v(" 参考文章")]),_._v(" "),t("ul",[t("li",[_._v("https://www.sohu.com/a/315043195_120159925")])])])}),[],!1,null,null,null);v.default=a.exports}}]);