---
title: BMH算法
---

::: tip
本文主要是介绍 BMH算法 。
:::

[[toc]]


## 1、BMH算法介绍

　　在BM算法的实际应用中，坏字符偏移函数的应用次数要远远超过好后缀偏移函数的应用次数，坏字符偏移函数在匹配过程中起着移动指针的主导作用。在实际匹配过程，只是用坏字符偏移函数也非常有效。1980年，奈杰尔·豪斯普（Nigel Horspool）提出了改进的BM算法，也就是BMH算法。简化了BM算法，执行非常方便，效率也很可观。Boyer-Moore算法使用两种策略来确定不匹配模式的位移：坏字符策略和高端策略。 来自Horspool的想法是仅使用坏字符策略，而不使用导致不匹配的字符，而始终使用文本窗口的匹配的字符。

## 2、主要思想

　　Horspool建议仅使用窗口最右边字符的坏字符移位来计算Boyer-Moore算法中的移位。例如：

　　(a) Boyer-Moore

|   0   |   1   |   2   |   3   |   4   |   5   |   6   |   7   |   8   |   9   |  ...  |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
|   a   |   b   |   c   |   a   |   b   |   d   |   a   |   a   |   c   |   b   |   a   |
|   b   |   c   |   a   |   a   |   b   |       |       |       |       |       |       |
|       |   b   |   c   |   a   |   a   |   b   |       |       |       |       |       |

　　(b) Horspool

|   0   |   1   |   2   |   3   |   4   |   5   |   6   |   7   |   8   |   9   |  ...  |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
|   a   |   b   |   c   |   a   |   b   |   d   |   a   |   a   |   c   |   b   |   a   |
|   b   |   c   |   a   |   a   |   b   |       |       |       |       |       |       |
|       |       |       |       |   b   |   c   |   a   |   a   |   b   |       |       |

　　观察是上面两个不同算法的例子，后缀ab匹配，比较c-a表示不匹配。 Boyer-Moore算法（a）根据最后一次出现c的坏字符位置的策略确定滑动距离。 Horspool算法（b）根据最后一次出现的b来确定滑动距离，其中在模式的最后位置出现的b不计算在内。

　　同样在Horspool算法中，最有利的情况是，如果每次第一次比较都发现一个文本字符，而该字符根本不在模式中出现。 然后，该算法仅需要O（n / m）个比较。

　　坏字符策略所需的出现函数occ与Boyer-Moore算法中的计算略有不同。 对于每个字母字符a，occ（p，a）是它在p0 ... pm-2中最后一次出现的位置；如果根本不出现该字符，则为-1。 因此，不会考虑该模式的最后一个字符pm-1。

- occ(text, x) = 2
- occ(textet, t) = 3
- occ(text, t) = 0
- occ(next, t) = -1

　　这里的occ（textet，t）= 3，因为单词texte中t的最后一次出现在位置3。 此外，由于单词tex中t的最后一次出现在位置0，所以occ（text，t）= 0，最后，因为t根本不在nex中出现，所以occ（next，t）= -1。

　　给定模式p的出现函数存储在数组occ中，该数组由字母字符索引。 对于每个字符，元素a，occ [a]包含对应的函数值occ（p，a）。

## 3、BMH算法代码

Horspool算法所用到的坏字符策略



```c
 1     /**
 2      * 坏字符策略
 3      */
 4     private void horspoolInitocc() {
 5         int j;
 6         char a;
 7 
 8         for (a = 0; a < alphabetSize; a++)
 9             occ[a] = -1;
10 
11         for (j = 0; j < m - 1; j++) {
12             a = p[j];
13             occ[a] = j;
14         }
15     }
```



　　分析：预处理阶段为***O**(m + σ)*时间复杂度和***O****（σ）*空间复杂度。

Horspool算法的搜索函数



``` c
 1     /**
 2      * Horspool算法的搜索函数
 3      */
 4     private void horspoolSearch() {
 5         int i = 0, j;
 6         while (i <= n - m) {
 7             j = m - 1;
 8             while (j >= 0 && p[j] == t[i + j]) j--;
 9             if (j < 0) report(i);
10             i += m - 1;
11             i -= occ[t[i]];
12         }
13     }
```



　　搜索阶段具有二次最坏情况***O****(mn)*，但是可以证明，一个文本字符的平均比较数在*1σ* 和 *2 /（σ+ 1）*之间。

## 4、总结

　　BM算法中的坏字符策略对于σ比较小的来说不是很有效，但适合当σ与模式的长度相比比较大时。当ASCII表和在文本编辑器下进行的常规搜索一样BMH变得非常有用。在实践中，单独使用它会产生非常有效的算法。 Horspool建议仅使用窗口最右边字符的坏字符移位来计算Boyer-Moore算法中的移位。

源代码：





``` java
  1 package algorithm;
  2 
  3 public class Horspool {
  4     private static int alphabetSize = 256;
  5     private char[] p, t;        // 模式，文本
  6     private int m, n;           // 模式的长度，文本的长度
  7     private int[] occ;          // 记录文本字符在模式中的位置
  8     private String matches;     // 匹配位置
  9     private char[] showmatches; // 显示匹配的字符数组
 10 
 11     public Horspool() {
 12         occ = new int[alphabetSize];
 13     }
 14 
 15     public void search(String tt, String pp) {
 16         setText(tt);
 17         setPatten(pp);
 18         horspoolSearch();
 19     }
 20 
 21     /**
 22      * 设置文本
 23      *
 24      * @param tt
 25      */
 26     private void setText(String tt) {
 27         n = tt.length();
 28         t = tt.toCharArray();
 29         initMatches();
 30     }
 31 
 32     /**
 33      * 设置模式
 34      *
 35      * @param pp
 36      */
 37     private void setPatten(String pp) {
 38         m = pp.length();
 39         p = pp.toCharArray();
 40         horspoolInitocc();
 41     }
 42 
 43     /**
 44      * 坏字符策略
 45      */
 46     private void horspoolInitocc() {
 47         int j;
 48         char a;
 49 
 50         for (a = 0; a < alphabetSize; a++)
 51             occ[a] = -1;
 52 
 53         for (j = 0; j < m - 1; j++) {
 54             a = p[j];
 55             occ[a] = j;
 56         }
 57     }
 58 
 59     /**
 60      * Horspool算法的搜索函数
 61      */
 62     private void horspoolSearch() {
 63         int i = 0, j;
 64         while (i <= n - m) {
 65             j = m - 1;
 66             while (j >= 0 && p[j] == t[i + j]) j--;
 67             if (j < 0) report(i);
 68             i += m - 1;
 69             i -= occ[t[i]];
 70         }
 71     }
 72 
 73     /**
 74      * 初始化匹配位置该显示的数组
 75      */
 76     private void initMatches() {
 77         matches = "";
 78         showmatches = new char[n];
 79         for (int i = 0; i < n; i++) {
 80             showmatches[i] = ' ';
 81         }
 82     }
 83 
 84     /**
 85      * 匹配报告
 86      *
 87      * @param i
 88      */
 89     private void report(int i) {
 90         matches += i + " ";
 91         showmatches[i] = '^';
 92     }
 93 
 94     /**
 95      * 搜索后返回匹配位置
 96      *
 97      * @return
 98      */
 99     public String getMatches() {
100         return matches;
101     }
102 
103     /**
104      * BMH测试主函数
105      *
106      * @param args
107      */
108     public static void main(String[] args) {
109         Horspool horspool = new Horspool();
110         String tt, pp;
111         tt = "abcdabcd";
112         pp = "abc";
113         horspool.search(tt, pp);
114         System.out.println(pp);
115         System.out.println(tt);
116         System.out.println(horspool.showmatches);
117         System.out.println(horspool.getMatches());
118     }
119 }
```



## 参考文章
* https://www.cnblogs.com/gaochundong/p/string_matching.html
* https://www.cnblogs.com/magic-sea/tag/%E5%AD%97%E7%AC%A6%E4%B8%B2%E5%8C%B9%E9%85%8D%E7%AE%97%E6%B3%95/
