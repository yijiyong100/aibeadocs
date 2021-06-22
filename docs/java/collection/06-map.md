---
title: Java集合类 Map
---

## Java基础知识篇【集合类 Map】

::: tip
本文主要是介绍 集合类 Map ,Map接口下的两个重要的集合实现类HashMap,TreeMap 。
:::

[[toc]]

 

##  HashMap

HashMap 是一个散列表，它存储的内容是键值对(key-value)映射。
既然要介绍HashMap，那么就顺带介绍HashTable,两者进行比对。HashMap和Hashtable都是Map接口的经典实现类，由于Hashtable是个古老的Map实现类（从Hashtable的命名规范就可以看出，t没有大写，并不是我写错了），需要方法比较繁琐，不符合Map接口的规范。但是Hashtable也具有HashMap不具有的优点。下面我们进行两者之间的比对。

###  HashMap与Hashtable的区别

1.Hashtable是一个线程安全的Map实现，但HashMap是线程不安全的实现，所以HashMap比Hashtable的性能好一些；但如果有多个线程访问同一个Map对象时，这时用Hashtable实现类会更好。

2.Hashtable**不允许使用null作为key和value**，如果试图把null值放进Hashtable中，将会引发NullPointerException异常；但是HashMap可以使用null作为key或value。

###  HashMap判断key与value相等的标准

```
前面文章中，我们针对其他集合都分析了判断集合元素相等的标准。针对HashMap也不例外，不同的是有两个元素：key与value需要分别介绍判断相等的标准。
```

**key判断相等的标准**

类似于HashSet，HashMap与Hashtable判断两个key相等的标准是：**两个key通过equals()方法比较返回true,两个key的hashCode值也相等，则认为两个key是相等的。**

**注意：用作key的对象必须实现了hashCode()方法和equals()方法。并且最好两者返回的结果一致，即如果equals()返回true，hashCode()值相等。**

**value判断相等的标准**

HashMap与Hashtable判断两个value相等的标准是：只要两个对象通过equals()方法比较返回true即可。

**注意：**HashMap中key所组成的集合元素不能重复，value所组成的集合元素可以重复。

下面程序示范了HashMap判断key与value相等的标准。



``` java
 1 public class A {
 2     public int count;
 3 
 4     public A(int count) {
 5         this.count = count;
 6     }
 7     //根据count值来计算hashCode值
 8     @Override
 9     public int hashCode() {
10         final int prime = 31;
11         int result = 1;
12         result = prime * result + count;
13         return result;
14     }
15     //根据count值来判断两个对象是否相等
16     @Override
17     public boolean equals(Object obj) {
18         if (this == obj)
19             return true;
20         if (obj == null)
21             return false;
22         if (getClass() != obj.getClass())
23             return false;
24         A other = (A) obj;
25         if (count != other.count)
26             return false;
27         return true;
28     }
29 }
```



 



``` java
 1 public class B {
 2     public int count;
 3     public B(int count) {
 4         this.count = count;
 5     }
 6      //根据count值来判断两个对象是否相等
 7     @Override
 8     public boolean equals(Object obj) {
 9         if (this == obj)
10             return true;
11         if (obj == null)
12             return false;
13         if (getClass() != obj.getClass())
14             return false;
15         B other = (B) obj;
16         if (count != other.count)
17             return false;
18         return true;
19     }
20 
21 }
```





``` java
 1 public class HashMapTest {
 2     public static void main(String[] args){
 3         HashMap map = new HashMap();
 4         map.put(new A(1000), "集合Set");
 5         map.put(new A(2000), "集合List");
 6         map.put(new A(3000), new B(1000));
 7        //仅仅equals()比较为true，但认为是相同的value
 8         boolean isContainValue = map.containsValue(new B(1000));
 9         System.out.println(isContainValue);
10       //虽然是不同的对象，但是equals()和hashCode()返回结果都相等
11         boolean isContainKey = map.containsKey(new A(1000));
12         System.out.println(isContainKey);
13       //equals()和hashCode()返回结果不满足key相等的条件
14         System.out.println(map.containsKey(new A(4000)));
15     }
16     
17 }
```



输出结果：

``` java
true
true
false
```

**注意：**如果是加入HashMap的key是个可变对象，在加入到集合后又修改key的成员变量的值，可能导致hashCode()值以及equal()的比较结果发生变化，无法访问到该key。一般情况下不要修改。

###  HashMap的本质

下面我们从源码角度来理解HashMap。

**HashMap的构造函数**



``` java
// 默认构造函数。
HashMap()

// 指定“容量大小”的构造函数
HashMap(int capacity)

// 指定“容量大小”和“加载因子”的构造函数
HashMap(int capacity, float loadFactor)

// 包含“子Map”的构造函数
HashMap(Map<? extends K, ? extends V> map)
```



从构造函数中，了解到两个重要的元素：容量大小(capacity)以及加载因子(loadFactor)。
容量(capacity)是哈希表的容量，初始容量是哈希表在创建时的容量（即`DEFAULT_INITIAL_CAPACITY = 1 << 4`）。
加载因子 是哈希表在其容量自动增加之前可以达到多满的一种尺度。当哈希表中的条目数超出了加载因子与当前容量的乘积时，则要对该哈希表进行 resize操作（即重建内部数据结构），从而哈希表将具有大约两倍的桶数。
通常，默认加载因子是 0.75(即`DEFAULT_LOAD_FACTOR = 0.75f`), 这是在时间和空间成本上寻求一种折衷。加载因子过高虽然减少了空间开销，但同时也增加了查询成本（在大多数 HashMap 类的操作中，包括 get 和 put 操作，都反映了这一点）。在设置容量时应该考虑到映射中所需的条目数及其加载因子，以便最大限度地减少 resize操作次数。如果容量大于最大条目数除以加载因子，则不会发生 rehash 操作。

**Node类型**
HashMap是通过"拉链法"实现的哈希表。它包括几个重要的成员变量：table, size, threshold, loadFactor。

table是一个Node[]数组类型，而Node实际上就是一个单向链表。哈希表的"key-value键值对"都是存储在Node数组中的。

size是HashMap的大小，它是HashMap保存的键值对的数量。

threshold是HashMap的阈值，用于判断是否需要调整HashMap的容量。threshold的值="容量*加载因子"，当HashMap中存储数据的数量达到threshold时，就需要将HashMap的容量加倍。

loadFactor就是加载因子。

要想理解HashMap，首先就要理解基于Node实现的“拉链法”。

Java中数据存储方式最底层的两种结构，一种是数组，另一种就是链表，数组的特点：连续空间，寻址迅速，但是在刪除或者添加元素的时候需要有较大幅度的移动，所以查询速度快，增刪较慢。而链表正好相反，由于空间不连续，寻址困难，增刪元素只需修改指針，所以查询速度慢、增刪快。有沒有一种数组结构來综合一下数组和链表，以便发挥它们各自的优势？答案是肯定的！就是：哈希表。哈希表具有较快（常量级）的查询速度，及相对较快的增刪速度，所以很适合在海量数据的环境中使用。一般实现哈希表的方法采用“拉链法”，我們可以理解为“链表的数组”，如下图：



 

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/java/collection/map-1.png')" alt="wxmp">

 



图中，我们可以发现哈希表是由数组+链表組成的，一个长度为16的数组中，每個元素存储的是一个链表的头结点。那么这些元素是按照什么样的规则存储到数组中呢？
一般情況是通过hash(key)获得，也就是元素的key的哈希值。如果hash(key)值相等，则都存入该hash值所对应的链表中。它的內部其实是用一個Node数组來实现。

**所以每个数组元素代表一个链表，其中的共同点就是hash(key)相等。**

下面我们来了解下链表的基本元素Node。



``` java
 1 static class Node<K,V> implements Map.Entry<K,V> {
 2         final int hash;
 3         final K key;
 4         V value;
 5         // 指向下一个节点
 6         Node<K,V> next;
 7         //构造函数。
 8       // 输入参数包括"哈希值(hash)", "键(key)", "值(value)", "下一节点(next)"
 9         Node(int hash, K key, V value, Node<K,V> next) {
10             this.hash = hash;
11             this.key = key;
12             this.value = value;
13             this.next = next;
14         }
15 
16         public final K getKey()        { return key; }
17         public final V getValue()      { return value; }
18         public final String toString() { return key + "=" + value; }
19 
20         public final int hashCode() {
21             return Objects.hashCode(key) ^ Objects.hashCode(value);
22         }
23 
24         public final V setValue(V newValue) {
25             V oldValue = value;
26             value = newValue;
27             return oldValue;
28         }
29          // 判断两个Node是否相等
30         // 若两个Node的“key”和“value”都相等，则返回true。
31         // 否则，返回false
32         public final boolean equals(Object o) {
33             if (o == this)
34                 return true;
35             if (o instanceof Map.Entry) {
36                 Map.Entry<?,?> e = (Map.Entry<?,?>)o;
37                 if (Objects.equals(key, e.getKey()) &&
38                     Objects.equals(value, e.getValue()))
39                     return true;
40             }
41             return false;
42         }
43     }
```



再此结构下，实现了集合的增删改查功能，由于本篇的篇幅有限，这里就不具体介绍其源码实现了。

###  HashMap遍历方式

1.遍历HashMap的键值对

第一步：根据entrySet()获取HashMap的“键值对”的Set集合。
第二步：通过Iterator迭代器遍历“第一步”得到的集合。

2.遍历HashMap的键

第一步：根据keySet()获取HashMap的“键”的Set集合。
第二步：通过Iterator迭代器遍历“第一步”得到的集合。

3.遍历HashMap的值

第一步：根据value()获取HashMap的“值”的集合。
第二步：通过Iterator迭代器遍历“第一步”得到的集合。

###  LinkedHashMap实现类

HashSet有一个LinkedHashSet子类，HashMap也有一个LinkedHashMap子类；LinkedHashMap使用双向链表来维护key-value对的次序。
LinkedHashMap需要维护元素的插入顺序，因此性能略低于HashMap的性能；但是因为它以链表来维护内部顺序，所以在迭代访问**Map里的全部元素时有较好的性能**。迭代输出LinkedHashMap的元素时，将会按照添加key-value对的顺序输出。
**本质上来讲，LinkedHashMap=散列表+循环双向链表**

##  TreeMap

TreeMap是SortedMap接口的实现类。TreeMap 是一个**有序的key-value集合**，它是通过**红黑树**实现的，每个key-value对即作为红黑树的一个节点。

###  TreeMap排序方式

TreeMap有两种排序方式，和TreeSet一样。

**自然排序**：TreeMap的所有key必须实现Comparable接口，而且所有的key应该是同一个类的对象，否则会抛出ClassCastException异常。

**定制排序**：创建TreeMap时，传入一个Comparator对象，该对象负责对TreeMap中的所有key进行排序。

###  TreeMap中判断两个元素key、value相等的标准

类似于TreeSet中判断两个元素相等的标准，TreeMap中判断两个key相等的标准是：两个key通过compareTo()方法返回0，TreeMap即认为这两个key是相等的。

TreeMap中判断两个value相等的标准是：两个value通过equals()方法比较返回true。

**注意：**如果使用自定义类作为TreeMap的key，且想让TreeMap良好地工作，则重写该类的equals()方法和compareTo()方法时应保持一致的返回结果：两个key通过equals()方法比较返回true时，它们通过compareTo()方法比较应该返回0。如果两个方法的返回结果不一致，TreeMap与Map接口的规则就会冲突。

除此之外，与TreeSet类似，TreeMap根据排序特性，也添加了一部分新的方法，与TreeSet中的一致。可以参考前面的文章。

###  TreeMap的本质

###  红黑树

R-B Tree，全称是Red-Black Tree，又称为“红黑树”，它一种特殊的**二叉查找树**。红黑树的每个节点上都有存储位表示节点的颜色，可以是红(Red)或黑(Black)。

红黑树的特性:
（1）每个节点或者是黑色，或者是红色。
（2）根节点是黑色。
（3）每个叶子节点（NIL）是黑色。 [注意：这里叶子节点，是指为空(NIL或NULL)的叶子节点！]
（4）如果一个节点是红色的，则它的子节点必须是黑色的。
（5）从一个节点到该节点的子孙节点的所有路径上包含相同数目的黑节点。

注意：
(01) 特性(3)中的叶子节点，是只为空(NIL或null)的节点。
(02) 特性(5)，确保没有一条路径会比其他路径长出俩倍。因而，红黑树是相对是接近平衡的二叉树。

 

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/java/collection/map-2.png')" alt="wxmp">

 


**红黑树的时间复杂度为: O(log n)**
更多关于红黑树的增删改查操作，可以参考[这篇文章](https://link.jianshu.com/?t=http://www.cnblogs.com/skywang12345/p/3245399.html)。

 

**可以说TreeMap的增删改查等操作都是在一颗红黑树的基础上进行操作的。**

###  TreeMap遍历方式

遍历TreeMap的键值对

* 第一步：根据entrySet()获取TreeMap的“键值对”的Set集合。
* 第二步：通过Iterator迭代器遍历“第一步”得到的集合。

遍历TreeMap的键

* 第一步：根据keySet()获取TreeMap的“键”的Set集合。
* 第二步：通过Iterator迭代器遍历“第一步”得到的集合。

遍历TreeMap的值

* 第一步：根据value()获取TreeMap的“值”的集合。
* 第二步：通过Iterator迭代器遍历“第一步”得到的集合。

##  Map实现类的性能分析及适用场景

* HashMap与Hashtable实现机制几乎一样，但是HashMap比Hashtable性能更好些。
* LinkedHashMap比HashMap慢一点，因为它需要维护一个双向链表。
* TreeMap比HashMap与Hashtable慢（尤其在插入、删除key-value时更慢），因为TreeMap底层采用红黑树来管理键值对。


**适用场景：**
* 一般的应用场景，尽可能多考虑使用HashMap，因为其为快速查询设计的。
* 如果需要特定的排序时，考虑使用TreeMap。
* 如果仅仅需要插入的顺序时，考虑使用LinkedHashMap。

以上就是集合Map的内容，介绍地比较粗糙，感兴趣的话可以自己看源码深入了解其内部的结构。


## 参考文章
* https://www.cnblogs.com/midiyu/p/8145807.html