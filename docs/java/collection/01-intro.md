---
title: Java集合类基础介绍
---

## Java基础知识篇【集合类基础介绍】

::: tip
本文主要是介绍Java 集合类基础介绍。
:::

集合可以看作一个容器，集合中的对象可以很容易存放到集合中，也很容易将其从集合中取出来，还可以按一定的顺序摆放。Java中提供了不同的集合类，这些类具有不同的存储对象的方式，并提供了相应的方法方便用户对集合进行遍历。

　　集合的长度是可变的，用来存放对象的引用。常见的集合类有List集合、Set集合、Map集合。

## 一.集合类接口

　　以下接口的常用方法有很多，这里只提其中重要的几个方法，其它方法在使用时可参照API。

### 1. List接口

　　List是列表类型，以线性方式存储对象，自身的方法都与索引有关，个别常用方法如下。

| 方法                       | 返回值       | 功能描述                                                                                    |
| -------------------------- | ------------ | ------------------------------------------------------------------------------------------- |
| add(int index, Object obj) | void         | 用来向集合中的指定索引位置添加对象，集合的索引位置从0开始，其他对象的索引位置相对向后移一位 |
| set(int index, E element)  | Object       | 用指定元素替换列表中指定位置的元素，返回以前在指定位置的元素                                |
| indexOf(Object obj)        | int          | 返回列表中对象第一次出现的索引位置，如果集合中不包含该元素则返回-1                          |
| lastIndexOf(Object obj）   | int          | 返回列表中对象最后一次出现的索引位置，如果集合汇总不包含该元素则返回-1                      |
| listIterator()             | ListIterator | 用来获得一个包含所有对象的ListIterator迭代器                                                |

　　下面举一个实例，看看如何创建并添加修改集合元素。


``` java
 1 import java.util.Iterator;
 2 import java.util.LinkedList;
 3 import java.util.List;
 4 
 5 public class CollectionDemoList {
 6 
 7     public static void main(String[] args) {
 8         String aString = "A", bString = "B", cString = "C", dString = "D", eString  = "E";
 9         
10         List<String> list = new LinkedList<>();        // 创建list集合对象
11         list.add(aString);        // 向集合中添加元素
12         list.add(bString);
13         list.add(eString);
14         // 输出语句，用迭代器
15         Iterator<String> iter = list.iterator();        // 创建集合迭代器
16         while(iter.hasNext()) {        // 遍历集合中的元素
17             System.out.print(iter.next() + " ");
18         }
19         
20         System.out.println();        // 换行
21         list.set(1, cString);        // 将索引位置1的对象修改为对象bString
22         Iterator<String> it = list.iterator();
23         while(it.hasNext()) {
24             System.out.print(it.next() + " ");
25         }
26     }
27 
28 }
```
　　上述代码中，add()方法用于向集合中添加元素，set()方法用于修改集合中的元素，迭代器用于遍历集合中的元素并输出（会在下面的内容中涉及）。运行结果如下：

　　![img](https://images2017.cnblogs.com/blog/1018770/201801/1018770-20180128173103053-623695513.png)

　　其中创建List集合对象时，“<>”中是集合汇总元素的类型，如上方的String表示集合中的元素由String字符串构成。因为List是一个接口，所以new的是接口的实现类，在Eclipse中光标放在List上按Ctrl+T就可以看见List接口的所有实现类了。

### 　　2. Set接口

　　Set接口常用方法如下。

| 方法                   | 返回值   | 功能描述                                 |
| ---------------------- | -------- | ---------------------------------------- |
| add(Object obj)        | boolean  | 若集合中尚存在未指定的元素，则添加此元素 |
| addAll(Collection col) | boolean  | 将参数集合中所有元素添加到集合的尾部     |
| remove(Object obj)     | boolean  | 将指定的参数对象移除                     |
| clear()                | void     | 移除此Set中的所有元素                    |
| iterator()             | Iterator | 返回此Set中的元素上进行迭代的迭代器      |
| size()                 | int      | 返回此Set集合中的所有元素数              |
| isEmpty()              | boolean  | 如果Set不包含元素，则返回true            |

　　下面看一个例子，用addAll()方法把List集合对象存入到Set集合中并除掉重复值。


``` java
 1 import java.util.ArrayList;
 2 import java.util.HashSet;
 3 import java.util.Iterator;
 4 import java.util.List;
 5 import java.util.Set;
 6 
 7 public class CollectionDemoSet {
 8 
 9     public static void main(String[] args) {
10         List<String> list = new ArrayList<>();        // 创建List集合对象
11         list.add("dog");
12         list.add("cat");
13         list.add("fish");
14         list.add("cat");    //重复值
15         
16         Set<String> set = new HashSet<>();        // 创建List对象集合
17         set.addAll(list);        // 将List集合对象添加到Set集合中
18         Iterator<String> it = set.iterator();
19         while(it.hasNext()) {
20             System.out.print(it.next() + " ");
21         }
22     }
23 
24 }
```


 　同理，创建Set对象集合时，Set是一个接口，new的是接口的实现类。运行结果如下：

　　![img](https://images2017.cnblogs.com/blog/1018770/201801/1018770-20180128183355412-1422085333.png)

　　由于Set集合中的对象是无序的，遍历Set集合的结果与插入Set集合的顺序并不相同。

### 3. Map接口

　　Map接口提供了将键映射到值的对象，一个映射不能包含重复的键，每个键最多只能映射一个值。Map接口同样提供了clear()、isEmpty()、size()等方法，还有一些常用方法如下。

| 方法                | 返回值     | 功能描述                                                 |
| ------------------- | ---------- | -------------------------------------------------------- |
| put(key k, value v) | Object     | 向集合中添加指定的key与value的映射关系                   |
| get(Object key)     | boolean    | 如果存在指定的键对象，则返回该对象对应的值，否则返回null |
| values()            | Collection | 返回该集合中所有值对象形成的Collection集合               |

　　下面看一个例子。


``` java
 1 import java.util.HashMap;
 2 import java.util.Map;
 3 
 4 public class MapDemo {
 5 
 6     public static void main(String[] args) {
 7         Map<String, String> map = new HashMap<>();        // 创建Map集合
 8         map.put("1", "dog");
 9         map.put("2", "cat");
10         map.put("3", "fish");
11         for(int i=1; i<=3; i++) {
12             System.out.println("第" + i + "个元素是：" + map.get("" + i + ""));
13         }
14     }
15 
16 }
```


 　具体写法参照上例即可。运行结果如下：

　　![img](https://images2017.cnblogs.com/blog/1018770/201801/1018770-20180128183417615-1375531062.png)

　　创建Map集合时，Map接口的“<>”中含有两个类型，分别对应其key与value。

## 二、集合类接口的实现类

　　上面在定义一个接口时，都有new一个实现类，下面介绍几种常用的实现类。

### 　　1. List接口的实现类

　　List接口的实现类常用的有ArrayList和LinkedList，这两个实现类在上面的例子中已经出现过了。

　　ArrayList类实现了可变的数组，可以根据索引位置对集合进行快速的随机访问。LinkedList类采用链表结构保存对象，便于向集合中插入和删除对象。对于线性结构和链式结构不清楚的朋友可以看我之前的博客“数据的存储结构”，链接：http://www.cnblogs.com/adamjwh/p/5829604.html，也可以自行查阅资料。

　　分别通过ArrayList和LinkedList类实例化List集合如下：

``` java
List list1 = new ArrayList();
List list2 = new LinkedList();
```

### 2. Set接口的实现类

　　Set接口的实现类常用的有HashSet和TreeSet，实现如下：

``` java
Set<String> set1 = new HashSet<String>();
Set<String> set2 = new TreeSet<String>();
```

### 3. Map接口的实现类

　　Map接口的实现类常用的有HashMap和TreeMap，建议使用HashMap（效率相对较高）。

　　实现如下：

``` java
Map map = new HashMap();
Map map = new TreeMap();
```

##  三、迭代器

　　迭代器是利用Iterator接口创建的，在上面已经出现过了。如下是上方Set接口中的代码：

``` java
Iterator<String> it = set.iterator();    // 创建一个迭代器
while(it.hasNext()) {
    System.out.print(it.next() + " ");
}    
```

　　上述代码用Iterator接口和iterator()方法创建了一个迭代器；用while循环遍历这个集合，hasNext()方法是循环判断条件，即如果有元素可以迭代，返回true，循环继续执行；next()方法是返回迭代的下一个元素。除了这两个方法外，Iterator接口还有一个方法是remove()，用于从迭代器指向的collection中移除迭代器返回的最后一个元素。

## 参考文章

* https://www.cnblogs.com/adamjwh/p/8372114.html