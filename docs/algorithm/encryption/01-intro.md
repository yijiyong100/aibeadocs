---
title: 常见加密解密算法
---

::: tip
本文主要是介绍 常见加密解密算法。
:::

[[toc]]

## 字符串匹配算法]

### 字符串匹配问题的形式定义：

- **文本（Text）**是一个长度为 n 的数组 T[1..n]；
- **模式（Pattern）**是一个长度为 m 且 m≤n 的数组 P[1..m]；
- T 和 P 中的元素都属于有限的**字母表 Σ 表**；
- 如果 0≤s≤n-m，并且 T[s+1..s+m] = P[1..m]，即对 1≤j≤m，有 T[s+j] = P[j]，则说模式 P 在文本 T 中出现且位移为 s，且称 s 是一个**有效位移（Valid Shift）**。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/algorithm/strmatch/intro-1.png')" alt="wxmp">

比如上图中，目标是找出所有在文本 T = abcabaabcabac 中模式 P = abaa 的所有出现。该模式在此文本中仅出现一次，即在位移 s = 3 处，位移 s = 3 是有效位移。

### 解决字符串匹配的常用算法包括：

* BF算法(Brute Force)
* MP算法(Morris-Pratt)
* KMP算法(Knuth-Morris-Pratt)）
* BM算法(Boyer-Moore)
* BMH算法
* Needleman–Wunsch算法
* Trie 树(字典树)算法
* AC自动机算法
* Rabin-Karp算法 


### 字符串匹配算法通常分为两个步骤：

预处理(Preprocessing)和匹配(Matching)。所以算法的总运行时间为预处理和匹配的时间的总和。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/algorithm/strmatch/intro-2.png')" alt="wxmp">

## 参考文章
* https://www.cnblogs.com/gaochundong/p/string_matching.html