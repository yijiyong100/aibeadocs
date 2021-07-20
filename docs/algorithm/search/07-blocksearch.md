---
title: 常用搜索算法-分块查找
---

::: tip
本文主要是介绍 常用搜索算法-分块查找 。
:::

[[toc]]


## 分块查找

　　分块查找又称索引顺序查找，它是顺序查找的一种改进方法。
### 算法思想：
将n个数据元素"按块有序"划分为m块（m ≤ n）。每一块中的结点不必有序，但块与块之间必须"按块有序"；即第1块中任一元素的关键字都必须小于第2块中任一元素的关键字；而第2块中任一元素又都必须小于第3块中的任一元素，……

### 算法流程：
　　step1 先选取各块中的最大关键字构成一个索引表；
　　step2 查找分两个部分：先对索引表进行二分查找或顺序查找，以确定待查记录在哪一块中；然后，在已确定的块中用顺序法进行查找。

**分块查找**又称**索引顺序查找，**它是**顺序查找**的一种改进方法**。**

### 算法流程：

* - 先选取**各块**中的**最大关键字**构成一个**索引表**；
* - 查找分两个部分：先对索引表进行**二分查找**或**顺序查找**，以**确定待查记录**在**哪一块**中；然后，在已确定的块中用**顺序法**进行查找。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/algorithm/search/comm8/fenkuai-1.png')" alt="wxmp">

　　**注**：算法的思想是将n个数据元素"按块有序"划分为m块（m ≤ n）。每一块中的结点不必有序，但块与块之间必须"按块有序"，每个块内的的最大元素**小于**下一块所有元素的**任意一个值**。

　　所以，给定一个**待查找**的**key**，在查找这个**key值**位置时**，**会先去**索引表**中利用**顺序查找**或者**二分查找**来找出这个**key**所在块的**索引**开始位置，然后再根据**所在块的索引开始位置**开始查找这个key所在的**具体位置。**

　　下面给出一段**分块查找**的代码，其思想和上面描述的一样，都是通过**索引表**来找key的位置。

　　先给出**主表**和**索引表**：

``` java
 1     // 主表，size=30
 2     static int[] mainList = new int[]{
 3             101, 102, 103, 104, 105, 0, 0, 0, 0, 0,
 4             201, 202, 203, 204, 0, 0, 0, 0, 0, 0,
 5             301, 302, 303, 0, 0, 0, 0, 0, 0, 0
 6     };
 7 
 8     // 索引表
 9     static IndexItem[] indexItemList = new IndexItem[]{
10             new IndexItem(1, 0, 5),
11             new IndexItem(2, 10, 4),
12             new IndexItem(3, 20, 3)
13     };
```
　　索引表类：

``` java
    static class IndexItem {
        public int index; //值比较的索引
        public int start; //开始位置
        public int length;//块元素长度(非空)

        public IndexItem(int index, int start, int length) {
            this.index = index;
            this.start = start;
            this.length = length;
        }

        //... getter and setter
    }
```

　　**索引查找**算法：

``` java
 1     public static int indexSearch(int key) {
 2         IndexItem indexItem = null;
 3 
 4         //建立索引规则
 5         int index = key / 100;
 6 
 7         //遍历索引表
 8         for(int i = 0;i < indexItemList.length; i++) {
 9             //找到索引项
10             if(indexItemList[i].index == index) {
11                 indexItem = indexItemList[i];
12                 break;
13             }
14         }
15 
16         //索引表中不存在该索引项
17         if(indexItem == null)
18             return -1;
19 
20         //根据索引项，在主表中查找
21         for(int i = indexItem.start; i < indexItem.start + indexItem.length; i++) {
22             if(mainList[i] == key)
23                 return i;
24         }
25 
26         return -1;
27     }
```



　　**时间复杂度**分析：先按**二分查找**去找key在**索引表**为大概位置（所给出代码是顺序查找），然后**在主表**中的可能**所在块**的位置开始按顺序查找，所以时间复杂度为**O(log₂(m)+N/m)**，m为分块的数量，N为主表元素的数量，N/m 就是每块内元素的数量。

### 分块查找 的插入算法：

``` java
 1     /**
 2      * 插入数据
 3      *
 4      * @param key 要插入的值
 5      * @return true表示插入成功，false表示插入失败
 6      */
 7     public static boolean insert(int key) {
 8         IndexItem item = null;
 9 
10         // 建立索引规则
11         int index = key / 100;
12         int i = 0;
13         // 遍历索引表，找到对应的索引项
14         for (i = 0; i < indexItemList.length; i++) {
15             if (indexItemList[i].index == index) {
16                 item = indexItemList[i];
17                 break;
18             }
19         }
20         // 索引表中不存在该索引项
21         if (item == null) {
22             return false;
23         }
24 
25         // 根据索引项将值插入到主表中
26         mainList[item.start + item.length] = key;
27         // 更新索引表
28         indexItemList[i].length++;
29 
30         return true;
31     }
```



　　打印主表的函数：



``` java
 1     /**
 2      * 遍历打印
 3      */
 4     public static void display(int[] list) {
 5         System.out.println("******** 展示开始 ********");
 6         if (list != null && list.length > 0) {
 7             for (int i = 0; i < list.length; i++) {
 8                 System.out.print(list[i] + " ");
 9                 if ((i + 1) % 10 == 0) {
10                     System.out.println("");
11                 }
12             }
13         }
14         System.out.println("******** 展示结束 ********");
15     }
```



　　测试代码：



``` java
 1     public static void main(String[] args) {
 2         System.out.println("******** 索引查找 ********");
 3         System.out.println("");
 4         System.out.println("原始数据：");
 5         display(mainList);
 6         System.out.println("");
 7 
 8         //分块查找
 9         int key = 203;
10         System.out.println("元素" + key + "列表中的位置为：" + indexSearch(key) + "\n");
11 
12         //按规则插入数据并查找
13         int value = 106;
14         System.out.println("插入数据：" + value);
15         
16         // 插入成功，查找插入位置
17         if (insert(value)) {
18             System.out.println("插入后的主表：");
19             display(mainList);
20             System.out.println("");
21 
22             System.out.println("元素" + value + "在列表中的位置为：" + indexSearch(value));
23         }
24     }
```






## 参考文章
* http://www.cnblogs.com/maybe2030/
* https://www.cnblogs.com/magic-sea/tag/%E5%B8%B8%E8%A7%81%E7%9A%84%E6%9F%A5%E6%89%BE%E7%AE%97%E6%B3%95/
* https://www.cnblogs.com/hyserendipity/p/8591949.html