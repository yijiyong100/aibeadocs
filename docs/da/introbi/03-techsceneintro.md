---
title: 数据分析-BI技术场景介绍
---

::: tip
本文主要是介绍 数据分析-BI技术场景介绍 。
:::

[[toc]]

## BI的起源 

BI，英文全名是：Business Intelligence，中文为：商业智能。

BI可以简单定义为：利用软件或服务来把遍布于企业各处的数据转化为可行动的洞察，从而来影响企业的战略和战术决策。

## BI的基础是数据

BI的基础是数据，而数据是所有企业的重要工具，对于某些企业来说，可能数据就是其价值最高的那项资产。

在有计算机前，企业中就有了很多数据，那个时候数据主要是记录在纸张中（比如记账簿）。

接下来，数字化时代到了，流行了很多口号，比如“无纸化办公”等， 这个时候，各种业务系统百花齐放，比如：ERP（企业资源计划），CRM（客户关系管理），EHR（人力资源管理），财务管理系统等。

业务系统术业有专攻，但是当企业高层想要了解企业整体的运营情况时，单个业务系统就无法回答了，这时，BI系统响应时代召唤，闪亮登场。

## BI广泛应用于各行各业，但技术人员对BI的了解却很有限

BI以其通用性（万金油）和信息丰富度，被广大企业管理和运营人员所了解。

而在技术人员圈内，却很少被提及。（注：这里的技术人员主要是指软件研发相关技术人员）

比如：前几天和公司的HR聊天时，谈到：公司招聘时，如果是顾问线的应聘者，对观远和BI的了解就非常清楚，而要是研发线的应聘者，基本上不知道BI是做什么的。

所以， 我想，我这个”根红苗正“的研发老兵，也许可以多从技术人员关注的角度来多聊聊BI。

毕竟，BI的名字起的实在是太成功了， Business Intelligence，”智能“这个是非常吸引人的。虽然之前的BI系统并没怎么”智能"，但是在包括观远数据在内的新一代数据公司一直在为了把BI和数据变得更智能而不懈努力！

## BI系统主要看哪几点

所谓：“外行看热闹，内行看门道”。那么对于BI系统来说，我们主要看哪些重要的点呢？

## 1. 数据可视化 （Data Visualization）

所谓颜值即正义，数据可视化作为大家对BI的第一认知，肯定是一个非常重要的点。

这里我们可以看（非完全列表）：

- 可视化图形丰富程度
- 表格的支持（明细表、二维表，Pivot Table，条件样式等）
- 拖拽式配置
- 各种自定义（展示样式，日期数值格式化等）
- 页面布局（dashboard layout）
- 预制主题 （深色主题，浅色主题）
- 颜色运用（颜色色系搭配，对色盲人群友好）
- 自定义图形开发能力
- Story Telling

## 2. 数据集成 （Data Integrations）

有了可视化的皮，我们还要内部有货，还要有很多货。所以，BI还要看：能对接多少数据源，并且对接的难度和灵活度。

这里我们可以看（非完全列表）：

- 常见关系型数据库对接（是直连还是只能导入）
- 常见文件格式的对接（CSV，Excel等）
- Web Services对接 （泛指，包含SOAP和REST等）
- 异构数据源融合
- Public API支持自定义数据对接
- JSON 等半结构化支持
- SAP BW 等 MDX 类型支持
- 大数据系统对接（Hive，Spark，Presto等）

## 3. 分析（Analytics）

有了数据，有了可视化等原材料，我们需要有个米其林大厨来加工：

这里我们可以看（非完全列表）：

- Filter，Sort等基本操作
- 联动，下钻
- 高级辅助计算：同环比计算，百分比
- Grouping分组
- Window Function等OLAP分析
- 自定义函数
- 运算速度
- 预测分析
- What If 分析
- 高级Freeform分析（自定义SQL）
- 因子挖掘，归因分析

## 4. 内容分发 (Distribution)

有了内容和结果，我们要把好不容易做好的美食分发到企业内的每个人手中

这里我们可以看（非完全列表）：

- 移动端支持
- 导出CSV/Excel等能力
- 导出到 SFTP/网盘 等能力
- 定时调度能力
- 数据预警
- 邮件订阅

## 5. 企业集成(Enterprise Integerations)

数据有了价值，但是BI是企业中的良好市民，需要做很多企业相关集成

这里我们可以看（非完全列表）：

- 用户、用户组管理
- 行列权限
- LDAP等账号集成
- 企业微信、钉钉等集成
- 企业审计
- 数据备份

## 6. 部署方式（Deployment）

在决定部署前，还有一个比较重要的事项需要考虑：

- 基于公有云
- 私有化部署
- 混合型

## 总结

上面列的一些关键看点，主要是针对现有的BI系统所列出来的，现在新一代BI会有更多的新的特性和有意思的新趋势，我留在未来的文章中来谈。

不过从上面列出来的点里，我们也可以看出：BI系统涉及内容还是非常广的。曾经有人问我，BI系统的最核心内容是什么？我说不是可视化，不是数据处理，也不是数据对接，而是：如何把这么多复杂的点串到一起，而还能保证整体系统的一致体验。

## 参考文章
* https://zhuanlan.zhihu.com/p/141975968