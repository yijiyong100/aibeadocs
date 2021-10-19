---
title: 常见互联网公司算法概览
---

::: tip
本文主要是介绍 常见互联网公司算法概览，面试题和相关解答来自网络，难免有纰漏和疏忽，阅读的时候，发现有疑问的地方，建议多方求证，也可以关注原文评论区，也欢迎在本站[【问题反馈页面】](https://www.yijiyong.com/about/aboutqa.html)留言反馈。
:::

[[toc]]

## 互联网公司最常见的面试算法题有哪些？(Leetcode)

首先，让我们回顾几个有意思的经典互联网公司的面试题目，热热身。

## 经典的互联网公式面试题目(LeetCode)

1. 给你一个长度为 n 的数组，其中只有一个数字出现了奇数次，其他均出现偶数次，问如何使用优秀的时空复杂度快速找到这个数字

[136. 只出现一次的数字leetcode-cn.com/problems/single-number/](https://leetcode-cn.com/problems/single-number/)

2. 给你一个长度为 n 的数组，其中只有一个数字出现了大于等于 n/2 次，问如何使用优秀的时空复杂度快速找到这个数字。

[169. 求众数leetcode-cn.com/problems/majority-element/](https://leetcode-cn.com/problems/majority-element/)

3. 给你一个 n*m 的二维数组，每行元素保证递增，每列元素保证递增，试问如何使用优秀的时间复杂度找到某个数字（或者判断不存在）。

[240. 搜索二维矩阵 IIleetcode-cn.com/problems/search-a-2d-matrix-ii/](https://leetcode-cn.com/problems/search-a-2d-matrix-ii/)

4. 给你两颗二叉搜索树，如何使用线性的时间复杂度，将它们合并成一颗二叉搜索树。

[88. 合并两个有序数组leetcode-cn.com/problems/merge-sorted-array/](https://leetcode-cn.com/problems/merge-sorted-array/)

5. 假设有 100 层的高楼，给你两个完全一样的鸡蛋。请你设计一种方法，能够试出来从第几层楼开始往下扔鸡蛋，鸡蛋会碎。 当然，这个问题还有推广版本，有兴趣的同学可以思考一下。 假设有 n 层楼，给你 k 个完全一样的鸡蛋，请问最坏情况下，至少需要试验多少次才能知道从第几层楼开始往下扔鸡蛋，鸡蛋会碎。

[887. 鸡蛋掉落leetcode-cn.com/problems/super-egg-drop/](https://leetcode-cn.com/problems/super-egg-drop/)

 

接下来，再认真回答一下这个问题。先划重点：面试 和 算法题。作为在电话 / 现场面试中短短不到一个小时时间内，提供给面试者白板编程解决的算法题目，它与笔试上机、编程竞赛中的题目在难度与形式上还是有一些不同的。

这里有一张互联网公司面试中经常考察的问题类型总结的思维导图，我们可以结合图片中的信息分析一下。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/post/algorithm/leetcodecommtotal-1.png')" alt="wxmp">


可以明确的一点是，面试算法题目在难度上（尤其是代码难度上）会略低一些，倾向于考察一些基础数据结构与算法，对于高级算法和奇技淫巧一般不作考察。

代码题主要考察编程语言的应用是否熟练，基础是否扎实，一般来会让面试者写出代码完成一些简单的需求或者使用递归实现某些功能，而数学题倾向于考察概率相关的问题。以上这两类问题，出现的频率不会很高，即使出现了也应该是面试中的简单部分，相信一定难不倒在座的各位。

算法与数据结构是面试考察的重中之重，也是大家日后刷题时需要着重训练的部分。简单的总结一下，大约有这些内容：

## **算法 - Algorithms**

00001. 排序算法：快速排序、归并排序、计数排序

00002. 搜索算法：回溯、递归、剪枝技巧

00003. 图论：最短路、最小生成树、网络流建模

00004. 动态规划：背包问题、最长子序列、计数问题

00005. 基础技巧：分治、倍增、二分、贪心

## **数据结构 - Data Structures**

00001. 数组与链表：单 / 双向链表、跳舞链

00002. 栈与队列

00003. 树与图：最近公共祖先、并查集

00004. 哈希表

00005. 堆：大 / 小根堆、可并堆

00006. 字符串：字典树、后缀树

对于上面总结的这部分内容，[力扣（LeetCode）](https://leetcode-cn.com/) 已经为大家准备好了相关专题，等待大家来练习啦。

算法部分，我们开设了 [初级算法 - 帮助入门](https://leetcode-cn.com/explore/interview/card/top-interview-questions-easy/)、[中级算法 - 巩固训练](https://leetcode-cn.com/explore/interview/card/top-interview-questions-medium/) 、 [高级算法 - 提升进阶](https://leetcode-cn.com/explore/interview/card/top-interview-questions-hard/) 三个不同的栏目，包含：数组、字符串、搜索、排序、动态规划、数学、图论等许多内容。大家可以针对自己当前的基础与能力，选择相对应的栏目进行练习。为了能够达到较好的效果，建议小伙伴将所有题目都练习 2～3 遍，吃透每一道题目哦。

数据结构部分，我们开设了一个 [数据结构探索板块](https://leetcode-cn.com/explore/learn/)，其中包含：队列与栈、数组与字符串、链表、哈希表、二叉树等丰富的内容。每一个章节都包含文字讲解与生动的图片演示，同时配套相关题目。相信只要认真练习，一定能受益匪浅。

力扣将 Top Interview Questions 里比较新的题目按照类别进行了整理，以供大家按模块练习。

## **模拟**

· [134. 加油站](https://leetcode-cn.com/problems/gas-station/)

· [146. LRU缓存机制](https://leetcode-cn.com/problems/lru-cache/)

· [202. 快乐数](https://leetcode-cn.com/problems/happy-number/)

· [289. 生命游戏](https://leetcode-cn.com/problems/game-of-life/)

· [371. 两整数之和](https://leetcode-cn.com/problems/sum-of-two-integers/)

· [412. Fizz Buzz](https://leetcode-cn.com/problems/fizz-buzz/)

## **数组**

· [152. 乘积最大子序列](https://leetcode-cn.com/problems/maximum-product-subarray/)

· [169. 求众数](https://leetcode-cn.com/problems/majority-element/)

· [189. 旋转数组](https://leetcode-cn.com/problems/rotate-array/)

· [217. 存在重复元素](https://leetcode-cn.com/problems/contains-duplicate/)

· [283. 移动零](https://leetcode-cn.com/problems/move-zeroes/)

· [384. 打乱数组](https://leetcode-cn.com/problems/shuffle-an-array/)

· [350. 两个数组的交集 II](https://leetcode-cn.com/problems/intersection-of-two-arrays-ii/)

· [334. 递增的三元子序列](https://leetcode-cn.com/problems/increasing-triplet-subsequence/)

· [240. 搜索二维矩阵 II](https://leetcode-cn.com/problems/search-a-2d-matrix-ii/)

· [238. 除自身以外数组的乘积](https://leetcode-cn.com/problems/product-of-array-except-self/)

## **链表**

· [138. 复制带随机指针的链表](https://leetcode-cn.com/problems/copy-list-with-random-pointer/)

· [141. 环形链表](https://leetcode-cn.com/problems/linked-list-cycle/)

· [148. 排序链表](https://leetcode-cn.com/problems/sort-list/)

· [160. 相交链表](https://leetcode-cn.com/problems/intersection-of-two-linked-lists/)

· [206. 反转链表](https://leetcode-cn.com/problems/reverse-linked-list/)

· [234. 回文链表](https://leetcode-cn.com/problems/palindrome-linked-list/)

· [237. 删除链表中的节点](https://leetcode-cn.com/problems/delete-node-in-a-linked-list/)

· [328. 奇偶链表](https://leetcode-cn.com/problems/odd-even-linked-list/)

## **堆**

· [155. 最小栈](https://leetcode-cn.com/problems/min-stack/)

· [215. 数组中的第K个最大元素](https://leetcode-cn.com/problems/kth-largest-element-in-an-array/)

· [295. 数据流的中位数](https://leetcode-cn.com/problems/find-median-from-data-stream/)

· [378. 有序矩阵中第K小的元素](https://leetcode-cn.com/problems/kth-smallest-element-in-a-sorted-matrix/)

· [347. 前K个高频元素](https://leetcode-cn.com/problems/top-k-frequent-elements/)

## **栈**

· [150. 逆波兰表达式求值](https://leetcode-cn.com/problems/evaluate-reverse-polish-notation/)

· [227. 基本计算器 II](https://leetcode-cn.com/problems/basic-calculator-ii/)

· [341. 扁平化嵌套列表迭代器](https://leetcode-cn.com/problems/flatten-nested-list-iterator/)

## **哈希 / Map**

· [171. Excel表列序号](https://leetcode-cn.com/problems/excel-sheet-column-number/)

· [454. 四数相加 II](https://leetcode-cn.com/problems/4sum-ii/)

· [380. 常数时间插入、删除和获取随机元素](https://leetcode-cn.com/problems/insert-delete-getrandom-o1/)

## **队列**

· [239. 滑动窗口最大值](https://leetcode-cn.com/problems/sliding-window-maximum/)

## **树**

· [230. 二叉搜索树中第K小的元素](https://leetcode-cn.com/problems/kth-smallest-element-in-a-bst/)

· [236. 二叉树的最近公共祖先](https://leetcode-cn.com/problems/lowest-common-ancestor-of-a-binary-tree/)

· [297. 二叉树的序列化与反序列化](https://leetcode-cn.com/problems/serialize-and-deserialize-binary-tree/)

## **线段树**

· [218. 天际线问题](https://leetcode-cn.com/problems/the-skyline-problem/)

## **排序**

· [179. 最大数](https://leetcode-cn.com/problems/largest-number/)

· [324. 摆动排序 II](https://leetcode-cn.com/problems/wiggle-sort-ii/)

## **二分检索**

· [162. 寻找峰值](https://leetcode-cn.com/problems/find-peak-element/)

· [287. 寻找重复数](https://leetcode-cn.com/problems/find-the-duplicate-number/)

· [315. 计算右侧小于当前元素的个数](https://leetcode-cn.com/problems/count-of-smaller-numbers-after-self/)

## **滑动窗口**

· [395. 至少有K个重复字符的最长子串](https://leetcode-cn.com/problems/longest-substring-with-at-least-k-repeating-characters/)

## **动态规划**

· [124. 二叉树中的最大路径和](https://leetcode-cn.com/problems/binary-tree-maximum-path-sum/)

· [128. 最长连续序列](https://leetcode-cn.com/problems/longest-consecutive-sequence/)

· [198. 打家劫舍](https://leetcode-cn.com/problems/house-robber/)

· [279. 完全平方数](https://leetcode-cn.com/problems/perfect-squares/)

· [300. 最长上升子序列](https://leetcode-cn.com/problems/longest-increasing-subsequence/)

· [322. 零钱兑换](https://leetcode-cn.com/problems/coin-change/)

· [329. 矩阵中的最长递增路径](https://leetcode-cn.com/problems/longest-increasing-path-in-a-matrix/)

## **图论**

· [127. 单词接龙](https://leetcode-cn.com/problems/word-ladder/)

· [200. 岛屿的个数](https://leetcode-cn.com/problems/number-of-islands/)

· [207. 课程表](https://leetcode-cn.com/problems/course-schedule/)

· [210. 课程表 II](https://leetcode-cn.com/problems/course-schedule-ii/)

## **数学 & 位运算**

· [136. 只出现一次的数字](https://leetcode-cn.com/problems/single-number/)

· [149. 直线上最多的点数](https://leetcode-cn.com/problems/max-points-on-a-line/)

· [166. 分数到小数](https://leetcode-cn.com/problems/fraction-to-recurring-decimal/)

· [172. 阶乘后的零](https://leetcode-cn.com/problems/factorial-trailing-zeroes/)

· [190. 颠倒二进制位](https://leetcode-cn.com/problems/reverse-bits/)

· [191. 位1的个数](https://leetcode-cn.com/problems/number-of-1-bits/)

· [204. 计数质数](https://leetcode-cn.com/problems/count-primes/)

· [268. 缺失数字](https://leetcode-cn.com/problems/missing-number/)

· [326. 3的幂](https://leetcode-cn.com/problems/power-of-three/)

## **字符串**

· [125. 验证回文串](https://leetcode-cn.com/problems/valid-palindrome/)

· [131. 分割回文串](https://leetcode-cn.com/problems/palindrome-partitioning/)

· [139. 单词拆分](https://leetcode-cn.com/problems/word-break/)

· [140. 单词拆分 II](https://leetcode-cn.com/problems/word-break-ii/)

· [208. 实现 Trie (前缀树)](https://leetcode-cn.com/problems/implement-trie-prefix-tree/)

· [212. 单词搜索 II](https://leetcode-cn.com/problems/word-search-ii/)

· [242. 有效的字母异位词](https://leetcode-cn.com/problems/valid-anagram/)

· [387. 字符串中的第一个唯一字符](https://leetcode-cn.com/problems/first-unique-character-in-a-string/)

· [344. 反转字符串](https://leetcode-cn.com/problems/reverse-string/)

## **前方干货预警**

力扣君特别为大家总结了“高频算法面试题汇总”卡片，在力扣探索频就可以找到，希望对各位即将面试的程序员小伙伴有帮助。最后，祝各位刷题愉快，早日拿到属于自己的Dream Offer。

[探索算法面试题汇总 - 力扣 (LeetCode)leetcode-cn.com/explore/interview/card/top-interview-quesitons-in-2018/](https://leetcode-cn.com/explore/interview/card/top-interview-quesitons-in-2018/)



## 参考文章
* https://www.zhihu.com/question/24964987
* https://www.cnblogs.com/songgj/p/12994157.html