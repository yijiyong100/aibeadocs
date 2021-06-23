---
title: 集合类精华总结
---

## Java基础知识篇【集合类精华总结】

::: tip
本文主要是介绍 集合类精华总结 。
:::

[[toc]]
## 一.Set
### 1.HashSet

``` java
boolean add(E e)    　添加
　访问
boolean remove(E e)　　    　删除
Iterator<E> iterator   　　　遍历
int size()    　　　  大小

boolean isEmpty()    　　　  是否为空
boolean contains(Object o)  是否包含
void clear()    　　  清空(删除所有元素)

Object[] toArray()    
<T> T[] toArray(T[] a)
```

### 2.LinkedHashSet

``` java
boolean add(E e)    　　　 添加
　　　 访问
boolean remove(E e)    　 删除
Iterator<E> iterator    　遍历
int size()    　　　大小

boolean isEmpty()    　　　是否为空
boolean contains(Object o)是否包含
void clear()    　 清空(删除所有元素)
```

### 3.TreeSet

``` java
boolean add(E e)    添加
访问
boolean remove(E e)    　　删除
Iterator<E> iterator    　 遍历
int size()    　　　 大小

boolean isEmpty()    　　　是否为空
boolean contains(Object o)    是否包含
void clear()    　　    清空(删除所有元素)

Comparator<? super E> comparator() 返回用于对该集合中的元素进行排序的比较器，或null，如果此集合使用其元素的natural ordering 。 
E first() 返回集合中当前的第一个(最低)元素
E last()
E pollFirst()    　　   检索并删除第一个（最低）元素，或返回 null如果该集合为空.
E pollLast()
E lower(E e)    返回这个集合中最大的元素严格小于给定的元素，如果没有这样的元素，则返回 null 。
```

## 二.List
### 1.ArrayList

``` java
boolean add(E e) void add(int index,E element) 添加
E get(int index) 　　    　 访问
int indexOf(Object o)    　　　    返回指定元素第一次出现的索引
boolean remove(int index)
boolean remove(Object o)    　　   删除

Iterator<E> iterator() 
ListIterator<E> listIterator() 
ListIterator<E> listIterator(int index)  遍历
int size()    大小
boolean isEmpty()        　 是否为空
boolean contains(Object o)        是否包含
void clear()    　　        清空(删除所有元素)
Object[] toArray() 
<T> T[] toArray(T[] a) 
```
### 2.Stack

``` java
E push(E item)    　　    压入堆栈
E peek()           查看堆栈顶部的兑现，但不移除
E pop()            移除顶部的对象并返回
boolean empty()    　     是否为空
int search(Object o)    　返回对象在堆栈中的位置，以1为基数
```

### 3.LinkedList

``` java
添加：
public boolean add(Object element)： 元素将被添加到链表的最后；
public boolean add(int index, Object element)：　　元素将被添加到链表指定索引的位置（从0开始）；
public boolean addFirst(Object element)：   在头部插入；
public boolean addLast(Object element)：    在尾部插入；
访问：
E getFirst()
E getLast()
E get()----不用
删除：
remove()： 　　  删除第一个元素；
remove(int index)：　　 删除指定索引位置的元素（从0开始）；
removeFirst()： 删除第一个元素；
removeLast()：  删除最后一个元素；clear()：　　清空列表；
list.subList(1,3).clear()：根据范围删除列表元素；


boolean contains() 　　是否包含
void set(int index,element) 替换元素
int indexOf()    　　查找元素位置
```

实现栈:

``` java
void addFirst(T v)-----push
T getFirst()-----------peek
T removeFirst()--------pop
boolean isEmpty()------empty
String toString()------打印栈元素
```

实现队列；

``` java
private Queue<T> storage = newLinkedList<T>();
void offer(T v)-------插入队尾void add(T v)---------插入，不违反容量限制
T peek()--------------得到队头，但不移除
T element()----------- 此方法与 peek 方法的惟一不同是，如果此队列为空，它会抛出一个异常 
T poll()--------------得到对头，并移除
T remove()------------此方法与 poll 方法的不同在于，如果此队列为空，它会抛出一个异常 
boolean isEmpty()------队列是否为空
String toString()------打印队列元素
```

## 三.Queue
### 1.PriorityQueue

``` java
boolean add(E e)
boolean offer(E e)-------------------添加
E peek()
E poll()-----------------------------获取对头
boolean remove(Object o)-------------删除
int size()---------------------------大小
Iterator<E> iterator()---------------遍历

boolean contains(Object o)-----------是否包含
Comparator<? super E> comparator()---返回用来对此队列中的元素进行排序的比较器;如果此队列根据其元素的自然排序进行排序，则返回null
Object[] toArray()
<T> T[] toArray(T[] a)
```

## 四.Map

``` java
V put(K key, V value) ------添加
V get(Object key) ----------访问
remove(Object key) ---------删除
遍历：
entrySet()------得到键值对
keySet()--------得到键
values()--------得到值

int size()----------大小
boolean isEmpty()---是否为空
```


## 五、集合的精华汇总

面向对象语言对事物的体现都是以对象的形式，所以为了方便对多个对象的操作，就对对象进行存储，集合就是存储对象最常用的一种方式。

　　数组虽然也可以存储对象，但长度是固定的；集合长度是可变的，数组中可以存储基本数据类型，集合只能存储对象。

　　集合类的特点：集合只用于存储对象，集合长度是可变的，集合可以存储不同类型的对象。　　

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/java/collection/sum-1.png')" alt="wxmp">

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/java/collection/sum-2.png')" alt="wxmp">

　　上述类图中，实线边框的是实现类，比如ArrayList，LinkedList，HashMap等，折线边框的是抽象类，比如AbstractCollection，AbstractList，AbstractMap等，而点线边框的是接口，比如Collection，Iterator，List等。

### 1、Iterator接口

　　Iterator接口，这是一个用于遍历集合中元素的接口，主要包含hashNext(),next(),remove()三种方法。它的一个子接口LinkedIterator在它的基础上又添加了三种方法，分别是add(),previous(),hasPrevious()。也就是说如果是先Iterator接口，那么在遍历集合中元素的时候，只能往后遍历，被遍历后的元素不会再遍历到，通常无序集合实现的都是这个接口，比如HashSet，HashMap；而那些元素有序的集合，实现的一般都是LinkedIterator接口，实现这个接口的集合可以双向遍历，既可以通过next()访问下一个元素，又可以通过previous()访问前一个元素，比如ArrayList。

　　抽象类的使用。如果要自己实现一个集合类，去实现那些抽象的接口会非常麻烦，工作量很大。这个时候就可以使用抽象类，这些抽象类中给我们提供了许多现成的实现，我们只需要根据自己的需求重写一些方法或者添加一些方法就可以实现自己需要的集合类，工作流昂大大降低。

### 2、Collection （集合的最大接口）继承关系

　　——List　可以存放重复的内容

　　——Set　　不能存放重复的内容，所以的重复内容靠hashCode()和equals()两个方法区分

　　——Queue　　队列接口

　　——SortedSet　　可以对集合中的数据进行排序

　　Collection定义了集合框架的共性功能。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/java/collection/sum-3.png')" alt="wxmp">


　　add方法的参数类型是Object。以便于接收任意类型对象。

　　集合中存储的都是对象的引用(地址)。

### 3、List的常用子类
　　特有方法。凡是可以操作角标的方法都是该体系特有的方法。

 　　<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/java/collection/sum-4.png')" alt="wxmp">


　　——ArrayList 　　线程不安全，查询速度快

　　——Vector　　线程安全，但速度慢，已被ArrayList替代

　　——LinkedList　　链表结果，增删速度快

### 4、Set接口

　　Set：元素是无序(存入和取出的顺序不一定一致)，元素不可以重复。
　　——HashSet:底层数据结构是哈希表。是线程不安全的。不同步。
* HashSet是如何保证元素唯一性的呢？
* 是通过元素的两个方法，hashCode和equals来完成。
* 如果元素的HashCode值相同，才会判断equals是否为true。
* 如果元素的hashcode值不同，不会调用equals。

注意,对于判断元素是否存在，以及删除等操作，依赖的方法是元素的hashcode和equals方法。

　　——TreeSet：

有序的存放：TreeSet　　线程不安全，可以对Set集合中的元素进行排序

通过compareTo或者compare方法来保证元素的唯一性，元素以二叉树的形式存放。

### 5、Object类

　　在实际开发中经常会碰到区分同一对象的问题，一个完整的类最好覆写Object类的hashCode()、equals()、toString()三个方法。

### 6、集合的输出

　　——4种常见的输出方式

　　——Iterator： 迭代输出，使用最多的输出方式

　　——ListIterator： Iterator的子接口，专门用于输出List中的内容

　　——Enumeration

　　——foreach

　　在迭代时，不可以通过集合对象的方法操作集合中的元素，因为会发生ConcurrentModificationException异常。所以，在迭代器时，只能用迭代器的放过操作元素，可是Iterator方法是有限的，只能对元素进行判断，取出，删除的操作，如果想要其他的操作如添加，修改等，就需要使用其子接口，ListIterator。该接口只能通过List集合的listIterator方法获取。

### 7、Map接口

* Correction、Set、List接口都属于单值的操作，而Map中的每个元素都使用key——>value的形式存储在集合中。

* Map集合：该集合存储键值对。一对一对往里存。而且要保证键的唯一性。

　　<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/java/collection/sum-5.png')" alt="wxmp">


### 8、Map接口的常用子类

Map
* ——HashMap：底层是哈希表数据结构，允许使用 null 值和 null 键，该集合是不同步的。将hashtable替代，jdk1.2.效率高。
* ——TreeMap：底层是二叉树数据结构。线程不同步。可以用于给map集合中的键进行排序。

### 9、集合工具类

　　Collections:集合框架的工具类。里面定义的都是静态方法。

　　Collections和Collection有什么区别？
* Collection是集合框架中的一个顶层接口，它里面定义了单列集合的共性方法。
* 它有两个常用的子接口，
* ——List：对元素都有定义索引。有序的。可以重复元素。
* ——Set：不可以重复元素。无序。

Collections是集合框架中的一个工具类。该类中的方法都是静态的。
* 提供的方法中有可以对list集合进行排序，二分查找等方法。
* 通常常用的集合都是线程不安全的。因为要提高效率。
* 如果多线程操作这些集合时，可以通过该工具类中的同步方法，将线程不安全的集合，转换成安全的。

### 10.比较
|            |             | 是否有序           | 是否允许元素重复                                          |
| ---------- | ----------- | ------------------ | --------------------------------------------------------- |
| Collection | 否          | 是                 |                                                           |
| List       | 是          | 是                 |                                                           |
| Set        | AbstractSet | 否                 | 否                                                        |
|            | HashSet     |                    |                                                           |
|            | TreeSet     | 是（用二叉排序树） |                                                           |
| Map        | AbstractMap | 否                 | 使用key-value来映射和存储数据，key必须唯一，value可以重复 |
|            | HashMap     |                    |                                                           |
|            | TreeMap     | 是（用二叉排序树） |                                                           |




### 11.总结：

　　List：add/remove/get/set。
* 1，ArrayList：其实就是数组，容量一大，频繁增删就是噩梦，适合随机查找；
* 2，LinkedList：增加了push/[pop|remove|pull]，其实都是removeFirst；
* 3，Vector：历史遗留产物，同步版的ArrayList，代码和ArrayList太像；
* 4，Stack：继承自Vector。Java里其实没有纯粹的Stack，可以自己实现，用组合的方式，封装一下LinkedList即可；
* 5，Queue：本来是单独的一类，不过在SUN的JDK里就是用LinkedList来提供这个功能的，主要方法是offer/pull/peek，因此归到这里呢。

　　Set：add/remove。可以用迭代器或者转换成list。

* 1，HashSet：内部采用HashMap实现的；
* 2，LinkedHashSet：采用LinkedHashMap实现；
* 3，TreeSet：TreeMap。

　　Map：put/get/remove。

* 1，HashMap/HashTable：散列表，和ArrayList一样采用数组实现，超过初始容量会对性能有损耗；
* 2，LinkedHashMap：继承自HashMap，但通过重写嵌套类HashMap.Entry实现了链表结构，同样有容量的问题；
* 3，Properties：是继承的HashTable。

顺便说一下Arrays.asList，这个方法的实现依赖一个嵌套类，这个嵌套类也叫ArrayList！

## 参考文章
* https://www.cnblogs.com/midiyu/p/8145964.html
* https://blog.csdn.net/qq_38584262/article/details/78547457