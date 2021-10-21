(window.webpackJsonp=window.webpackJsonp||[]).push([[811],{1327:function(v,_,t){"use strict";t.r(_);var a=t(53),s=Object(a.a)({},(function(){var v=this,_=v.$createElement,t=v._self._c||_;return t("ContentSlotsDistributor",{attrs:{"slot-key":v.$parent.slotKey}},[t("div",{staticClass:"custom-block tip"},[t("p",{staticClass:"custom-block-title"},[v._v("TIP")]),v._v(" "),t("p",[v._v("本文主要是介绍 研发效能-度量方式 。")])]),v._v(" "),t("p"),t("div",{staticClass:"table-of-contents"},[t("ul",[t("li",[t("a",{attrs:{href:"#如何度量研发效能"}},[v._v("如何度量研发效能？")])]),t("li",[t("a",{attrs:{href:"#度量的分类"}},[v._v("度量的分类")])]),t("li",[t("a",{attrs:{href:"#效能的本质"}},[v._v("效能的本质")])]),t("li",[t("a",{attrs:{href:"#模型的存储"}},[v._v("模型的存储")])]),t("li",[t("a",{attrs:{href:"#专家经验"}},[v._v("专家经验")])]),t("li",[t("a",{attrs:{href:"#总结"}},[v._v("总结")])]),t("li",[t("a",{attrs:{href:"#研发效能度量指标经验"}},[v._v("研发效能度量指标经验")])]),t("li",[t("a",{attrs:{href:"#参考文章"}},[v._v("参考文章")])])])]),t("p"),v._v(" "),t("h2",{attrs:{id:"如何度量研发效能"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#如何度量研发效能"}},[v._v("#")]),v._v(" 如何度量研发效能？")]),v._v(" "),t("p",[v._v("原创 金戟 阿里技术 2020-09-23")]),v._v(" "),t("p",[v._v("阿里妹导读：如今，研发效能越来越受到重视。那么效能的本质是什么？效能度量的终极目标是什么？如何让“专家经验”产品化、标准化，从“事后复盘”发展为“风险管控”？本文从度量的分类、效能本质、模型的存储等方面聊一聊效能度量，并分享一种研发度量领域模型。")]),v._v(" "),t("p",[v._v("没有可靠的度量就无法有效的改进，高度数字化的软件研发领域一直是进行各类效能度量尝试的创新重地。\n阿里云·云效服务的内部版本“Aone”承载着阿里集团数百个BU协同研发和持续交付的职责，笔者在数月前短暂的参与了该平台的效能透视镜板块建设，因而得以从平台的“上帝视角”重新审视效能度量这件事，随着项目开展，略微摸索了些门道。此文中观点源于这段时间里笔者在团队内以及与周边相关团队的讨论和个人思考，且作抛砖引玉之用。")]),v._v(" "),t("h2",{attrs:{id:"度量的分类"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#度量的分类"}},[v._v("#")]),v._v(" 度量的分类")]),v._v(" "),t("p",[v._v("度量的分类方式有很多，其中比较有意思的一种角度，是根据目标意图将度量划分为“针对人的度量”和“针对事的度量”。")]),v._v(" "),t("p",[v._v("任何协作系统都离不开人的参与，加之可与绩效、考核等事情牵上关系，即使相关指标的分析往往伴随着争议，针对人的度量在企业里有时依然被视为一种“刚需”。譬如“代码量”、“代码质量”、“工作时长”等数据评判都是常见的依据指标。从产品实现而言，由于对结果可解释性要求高，这类度量的单因素指标居多，计算方案通常不会太复杂，宜采用小范围同维度横向比较，防止过度泛化。")]),v._v(" "),t("p",[v._v("相比之下，针对事度量的范畴和方法更加灵活。既包括简单的数值指标，譬如产研中的发布频率、需求交付时长；也包括需要对比分析的多元指标，譬如需求在各阶段的停留时长、缺陷在各环境的漏测率等。在就事论事的基础上，为了更全面的理解事实的客观规律，还经常需要将一组数据向上聚合（譬如整个部门、整个项目的情况）或者跨领域关联（譬如业务领域需求关联到相关代码提交情况），从而获得更宽的观察视角。由于涉及的度量主体更多，有时为了确定哪个主体是主要的影响因素，还需要进行额外的归因判定。相较于以人为目标的度量，对事进行度量时，可以包含更多的经验和推理因素。")]),v._v(" "),t("p",[v._v("对人或对事主要是针对度量目的而言，在实际运用时，两者采用的具体指标会有许多共同之处，并不能一概而论。根据管理学中的“平衡计分卡（The Balanced ScoreCard）”理论，度量活动要遵循“目标-度量-指标-行动”的规则，指标最终服务于目标的达成，好的度量产品不仅应当反映“发生了什么”，还应当能根据目标提供“该怎么做”的辅助建议。因此度量类产品的成败，不仅是对指标设计者的领域理解、抽象能力的挑战，而且对产品自身的业务目标清晰度也会提出很高的要求。")]),v._v(" "),t("h2",{attrs:{id:"效能的本质"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#效能的本质"}},[v._v("#")]),v._v(" 效能的本质")]),v._v(" "),t("p",[v._v("归根究底而言，效能的本质是对价值流动速度和质量的评价。")]),v._v(" "),t("p",[v._v("“价值流”的概念伴随着精益思想的传播，被越来越多行业所接纳。不过很少有其他哪个行业能够像软件研发行业这样，能够让价值交付的各个环节几乎完全在线数字化，从而提供大量可分析的过程数据样本。")]),v._v(" "),t("p",[v._v("所谓价值流动过程可以表示为，“价值原料”在可被度量的价值加工活动之间有序传递，不断叠加价值增量，最终形成可被消费的“价值产物”。下图将这一过程的度量抽象为一种非常简洁的表示结构，可称为效能度量的“元模型”。")]),v._v(" "),t("img",{staticClass:"zoom-custom-imgs",attrs:{src:v.$withBase("/assets/img/projprod/rdefficiencyintro/measurement-1.png"),alt:"wxmp"}}),v._v(" "),t("p",[v._v("度量中所用的各类“领域特征”则是由在此元模型之上的领域对象，以及基于这些对象的“领域指标”来定义的。")]),v._v(" "),t("p",[v._v("譬如在研发领域，“价值原料”可以是一个业务方的需求，或是一个开发者突发奇想的创意。可被度量的活动包括需求拆解、任务指派、代码编写、测试、部署、验证、发布等等。每个活动本身都具有可被观测的属性，实体之间也具有可被量化的关系。这些实体、属性、关系就组成了特定领域的模型，下图展示了一种简化的研发度量领域模型（为了美观省略掉很多实体关系连接，仅作示意）。")]),v._v(" "),t("img",{staticClass:"zoom-custom-imgs",attrs:{src:v.$withBase("/assets/img/projprod/rdefficiencyintro/measurement-2.png"),alt:"wxmp"}}),v._v(" "),t("p",[v._v("有了领域模型，就可以基于规则制定指标。指标通常被描述为各种量化特征和实体属性的数值计算。有些指标是领域无关的，譬如端到端流通时长；有些指标是多个领域之间可以复用的，譬如许多行业都会有单位时间任务吞吐量、任务按时完成率这样的指标；有些指标是领域特有的，譬如研发领域的千行代码缺陷率等等。")]),v._v(" "),t("p",[v._v("在指标之上，还需要有与具体运用场景相匹配的工具或平台来将度量结果转换为便于观察分析的表现形式。譬如各种图表、报表，以及事件通知。")]),v._v(" "),t("p",[v._v("元模型和领域对象的分离，似乎能够形成一种足够抽象的通用度量产品，通过领域相关的指标规则、展示规则、通知告警规则，快速适配不同目标和场景，然而现实情况其实更复杂。一方面受制于计算能力，有些指标实际无法根据模型+规则实时计算出来，必须单独预先算好，以空间换时间。另一方面受限于价值增值过程的可观测性，并非所有行为的结果都能立即被简单量化（否则说服人们坚持锻炼身体就容易多了），即使在高度数字化的软件研发领域，依然存在数据质量和时效性问题，在使用数据时需要加以考虑。因此各种效能的场景虽然具有十分相似的流动特征，实际产品依然会不可避免的根据业务定制化，万能的度量工具或公式是不存在的。")]),v._v(" "),t("h2",{attrs:{id:"模型的存储"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#模型的存储"}},[v._v("#")]),v._v(" 模型的存储")]),v._v(" "),t("p",[v._v("对于度量模型的存储，图数据库可能是最好的选择，没有之一。")]),v._v(" "),t("p",[v._v("相比结构化的SQL数据库和文档型的NoSQL数据库，图数据库属于比较小众的一种偏门奇术，主要用在知识图谱和基于关系的信息搜索领域。从基本特征而言，图数据库通常具备NoSQL的非结构化KV存储能力，允许同一类实体具有不同属性项的实例，这对于处理来自多种数据源或多个子类型的实体信息带来很大便利。同时，图数据库通常能像SQL数据库那样支持事务和多实体关联查询。不仅如此，图数据库对复杂关系的检索性能远高于SQL数据库，对于判断、循环查询的支持也比SQL存储过程更加优雅。")]),v._v(" "),t("p",[v._v("然而这些基础能力上的差异，并非我推荐将图数据库用于效能度量的主要原因。")]),v._v(" "),t("p",[v._v("好的技术选型应该能够充分适应潜在的业务需求变动，避免过早将技术实现耦合到局部的应用场景。在基于SQL表的开发模式里，“表结构设计”是在软件详细设计阶段里非常重要的一个环节，因为它不仅是对整体业务领域的建模，还关系着未来数据查询的效率和便利性。熟悉SQL表设计的同学应该知道，1对1、1对N、N对N关系，数据表的处理方法是完全不同的：N对N关系需要额外设计关联表，1对N关系通常是在后者的实体上设计外键，而1对1关系的外键设计就更有讲究了，要根据实际场景来决定该在哪个实体上放另一者的外键，然后在使用的时候顺着这个关联方向来查询。对于聚合的设计也是如此，需要事先在被聚合表上提前设计好用于聚合的外键，因此会有“事实表”、“维度表”的区分。数据的查询规则，在数据库表结构设定的时候就被确定下来了。")]),v._v(" "),t("p",[v._v("对业务模式比较固定的场景而言，提前考虑好数据的使用方法并做针对性优化显得合情合理，然而效能度量业务并不属于此类。在度量领域里，关联、级联、聚合都是十分常见的指标计算操作，由于指标的作用在于发现潜藏于表面之下的问题，事先不应当提前规定只能从哪一类实体作为关联查询的起点，或者必须以哪些维度做聚合观察。")]),v._v(" "),t("p",[v._v("就图数据库的存储模型来说，所有业务实体都是平等的，任何类型的关系都由实体间的关联来表示。这就像是在SQL表设计时，不论是1对1还是N对N关系，总是额外增加一张关联表，却无需顾虑多表JOIN带来的性能影响。这样一来，相当于将查询和聚合方式的决策推迟到实际使用的时候再做，从而有效解耦建模和查询时的相互制约，不再需要为优化查询而返工改表。")]),v._v(" "),t("p",[v._v("此外，由于关联直接建立于实体之间，当删除实体的时候，实体间的关联也将自动断开。这就像有垃圾回收机制的Java语言不用自己管理内存指针一样。图数据库绝不会产生由于关系修改时的不对称清除而导致的数据不一致情况。")]),v._v(" "),t("p",[v._v("那图数据库会不会有坑？肯定有。不过在我们目前有限的探索里，遇到比较大的麻烦主要来自它不够完善的周边工具配套、阿里云图数据库服务的某些配置限制，以及市场上稀缺具备相关技能的专业工程师。")]),v._v(" "),t("h2",{attrs:{id:"专家经验"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#专家经验"}},[v._v("#")]),v._v(" 专家经验")]),v._v(" "),t("p",[v._v("在研发效能领域，度量的终极目标是DevOps文化所提倡的识别和消除系统性瓶颈。")]),v._v(" "),t("p",[v._v("通过各式各样的过程数据，经验丰富的项目经理和管理教练往往能够准确判断出项目的潜在问题和交付风险。\n在经济学领域有个十分有趣的“古德哈特定律”，即“当决策者试图以一个事物的客观测度指标作为指针来施行政策时，这一指标就再也不能有效测度事物了”。")]),v._v(" "),t("p",[v._v("然而效能度量并不是玄学，价值生产活动中的风险应当是有章可循的。古德哈特式的此消彼长现象其实来源于经济领域的范围太过宽广，任何实用指标往往只能是局部度量的结果。效能透视镜产品的提出者嵩华老师曾经分享过一种识别研发项目系统性风险的思路，即有的放矢的关注四种典型的全局现象：")]),v._v(" "),t("ul",[t("li",[v._v("流动阻滞")]),v._v(" "),t("li",[v._v("返工")]),v._v(" "),t("li",[v._v("落后的工程能力")]),v._v(" "),t("li",[v._v("技术债务")])]),v._v(" "),t("p",[v._v("这几种现象不太容易在局部进行遮掩，且在一定条件下能够相互叠加，成为“烂项目”的标配。\n透过整个研发过程中的种种现象，找到反映这些全局性问题的蛛丝马迹，不仅能在一定程度上让“专家经验”产品化、标准化，也有助于将效能数据的使用方法从当前普遍的“事后复盘”式向以全局流动速率和质量作为关注点的“风险管控”式发展，从而在可靠性和时效性两个方面都得到提升。")]),v._v(" "),t("h2",{attrs:{id:"总结"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#总结"}},[v._v("#")]),v._v(" 总结")]),v._v(" "),t("p",[v._v("数据不会骗人，但数据的呈现和解读依然有很大的空间值得探索。现实事物复杂而多面，度量正是为描述和对比这些具象事实而采取的抽象和量化措施，从某种意义上来说，度量的结果一定是片面的，反映部分事实。没有银弹，也没有完美的效能度量。")]),v._v(" "),t("p",[v._v("对于企业研发效能的提升，开发者工具、效能方法理论、效能度量指标都是缺一不可、环环相扣的几个重要板块，相信随着数据价值被越来越多的挖掘，我们终将实现更有效的反馈和更精确的赋能，让研发协作真正变得透明、简单、高效。")]),v._v(" "),t("p",[t("strong",[v._v("最后")]),v._v("\n分享十条前人总结的经验观点。")]),v._v(" "),t("h2",{attrs:{id:"研发效能度量指标经验"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#研发效能度量指标经验"}},[v._v("#")]),v._v(" 研发效能度量指标经验")]),v._v(" "),t("ol",[t("li",[t("ol",[t("li",[v._v("任何指标一旦用于管控，就不再可靠（古德哈特定律）。")]),v._v(" "),t("li",[v._v("测量的对象与人越近，越不可靠。")]),v._v(" "),t("li",[v._v("“凡可度量，皆可改造”是错的。")]),v._v(" "),t("li",[v._v("变化趋势的价值高于指标绝对值。")]),v._v(" "),t("li",[v._v("选择适当的而非“标准的”指标，若发现指标没用，果断舍弃。")]),v._v(" "),t("li",[v._v("务必了解指标的获取成本，明确指标意图和针对的企业目标。")]),v._v(" "),t("li",[v._v("设计“北极星指标”，指标数量越多，边际收益递减。")]),v._v(" "),t("li",[v._v("不要将指标对所有人透明。")]),v._v(" "),t("li",[v._v("让一线人员参与指标制定。")]),v._v(" "),t("li",[v._v("如果可能，合理缩短度量周期。")])])])]),v._v(" "),t("h2",{attrs:{id:"参考文章"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#参考文章"}},[v._v("#")]),v._v(" 参考文章")]),v._v(" "),t("ul",[t("li",[v._v("https://www.cnblogs.com/rsapaper/p/13716479.html")])])])}),[],!1,null,null,null);_.default=s.exports}}]);