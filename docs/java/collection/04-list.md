---
title: Java集合类 List
---

## Java基础知识篇【集合类 List】

::: tip
本文主要是介绍 集合类 List ,Collection接口增加的一些重要功能以及List集合的两个重要子类ArrayList及LinkedList。。
:::

[[toc]]

## 一、List集合

### List集合判断元素相等的标准

List判断两个对象相等**只要通过equals()方法比较返回true即可**。
下面以用代码具体展示。
创建一个Book类，并重写equals()方法，如果两个Book对象的name属性相同，则认为两个对象相等。



``` java
 1 public class Book {
 2     public String name;
 3 
 4     @Override
 5     public boolean equals(Object obj) {
 6         if (this == obj)
 7             return true;
 8         if (obj == null)
 9             return false;
10         if (getClass() != obj.getClass())
11             return false;
12         Book other = (Book) obj;
13         if (this.name == other.name) {
14             return true;
15         } 
16         return false;
17     }
18 }
```
 

``` java
向List集合中加入book1对象，然后调用remove(Object o)方法，从集合中删除指定对象，这个时候指定的对象是book2。
```



``` java
 1 public static void main(String[] args){
 2         Book book1 = new Book();
 3         book1.name = "Effective Java";
 4         Book book2 = new Book();
 5         book2.name = "Effective Java";
 6         List<Book> list = new ArrayList<Book>();
 7         list.add(book1);
 8         list.remove(book2);
 9         System.out.println(list.size());
10     }
```
 

输出结果：

```
0
```

　　

可见把book1对象从集合中删除了，这表明List集合判断两个对象相等只要通过equals()方法比较返回true即可。
与Set不同，List还额外提供了一个listIterator()方法，该方法返回一个ListIterator对象。下面具体介绍下ListIterator。

### ListIterator

ListIterator接口在Iterator接口基础上增加了如下方法：

``` java
**boolean hasPrevious(): **如果以逆向遍历列表。如果迭代器有上一个元素，则返回 true。
Object previous():返回迭代器的前一个元素。
void add(Object o):将指定的元素插入列表（可选操作）。
```

 Iterator接口中的方法：

``` java
boolean hasNext()     判断集合是否有下一个元素
E next()                    返回迭代中的下一个元素
void remove()            从底层集合中删除此迭代器返回的最后一个元素（可选操作）
```

 

与Iterator相比，ListIterator增加了前向迭代的功能，还可以通过add()方法向List集合中添加元素。

## 二、ArrayList

既然要介绍ArrayList，那么就顺带一起介绍Vector。因为二者的用法功能非常相似，可以一起了解比对。

### ArrayList简介

ArrayList和Vector作为List类的两个典型实现，完全支持之前介绍的List接口的全部功能。
ArrayList和Vector类都是基于数组实现的List类，所以**ArrayList和Vector类封装了一个动态的、允许再分配的Object[]数组**。ArrayList或Vector对象使用initalCapacity参数来设置该数组的长度，当向ArrayList或Vector中添加元素超过了该数组的长度时，它们的initalCapacity会自动增加。下面我们通过阅读JDK 1.8 ArrayList源码来了解这些内容。

### ArrayList的本质

当以`List<Book> list = new ArrayList<Book>(3);`方式创建ArrayList集合时，


``` java
 1 //动态Object数组，用来保存加入到ArrayList的元素
 2 Object[] elementData;
 3 
 4 //ArrayList的构造函数，传入参数为数组大小
 5 public ArrayList(int initialCapacity) {
 6         if (initialCapacity > 0) {
 7              //创建一个对应大小的数组对象
 8             this.elementData = new Object[initialCapacity];
 9         } else if (initialCapacity == 0) {
10             //传入数字为0，将elementData 指定为一个静态类型的空数组
11             this.elementData = EMPTY_ELEMENTDATA;
12         } else {
13             throw new IllegalArgumentException("Illegal Capacity: "+　　//Illegal：非法，Argument：论据，参数-----IllegalArgumentException：非法参数异常
14                                                initialCapacity);
15         }
16     }
```



当以`List<Book> list = new ArrayList<Book>();`方式创建ArrayList集合时，不指定集合的大小


``` java
1 /**
2      *Constructs an empty list with an initial capacity of ten。意思是：构造一个空数组，默认的容量为10
3      */
4     public ArrayList() {
5         this.elementData = DEFAULTCAPACITY_EMPTY_ELEMENTDATA;　
6 }
```

在这里可以看出`private static final int DEFAULT_CAPACITY = 10;`默认容量确实为10。
当向数组中添加元素`list.add(book1);`时：
先调用add(E e)方法

``` java
1 public boolean add(E e) {
2         ensureCapacityInternal(size + 1);  // 数组的大小增加1
3         elementData[size++] = e;
4         return true;
5     }
```



 
在该方法中，先调用了一个ensureCapacityInternal()方法，顾名思义：该方法用来确保数组中是否还有足够容量。
经过一系列方法（不必关心），最后有个判断：如果剩余容量足够存放这个数据，则进行下一步，如果不够，则需要执行一个重要的方法：

``` java
1 private void grow(int minCapacity) {
2         //......省略部分内容  主要是为了生成大小合适的newCapacity
3        //下面这行就是进行了数组扩容
4         elementData = Arrays.copyOf(elementData, newCapacity);
5     }
```


 

**由此，我们就清楚地明白了，ArrayList是一个动态扩展的数组，Vector也同样如此。**
如果开始就知道ArrayList或Vector集合需要保存多少个元素，则可以在创建它们时就指定initalCapacity的大小，这样可以提高性能。
此外，ArrayList还提供了两个额外的方法来调整其容量大小：

``` java
void ensureCapacity(int minCapacity): 如有必要，增加此 ArrayList 实例的容量，以确保它至少能够容纳最小容量参数所指定的元素数。//minCapacity:最小容量参数void trimToSize():将此 ArrayList 实例的容量调整为列表的当前大小。
```

 

### ArrayList和Vector的区别

1.ArrayList是线程不安全的，Vector是线程安全的。
2.Vector的性能比ArrayList差。

### Stack

Stack是Vector的子类，用户模拟“栈”这种数据结构，“栈”通常是指“后进先出”(LIFO)的容器。最后“push”进栈的元素，将被最先“pop”出栈。如下图所示：



 

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/java/collection/list-1.png')" alt="wxmp">

 



Stack类里提供了如下几个方法：



 

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/java/collection/list-2.png')" alt="wxmp">

 


Stack与Vector一样，是线程安全的，但是性能较差，尽量少用Stack类。如果要实现栈”这种数据结构，可以考虑使用LinkedList(下面就会介绍)。

### ArrayList的遍历方式

ArrayList支持3种遍历方式
**(01) 第一种，通过迭代器遍历**

``` java
1 Integer value = null;
2 Iterator iter = list.iterator();
3 while (iter.hasNext()) {
4     value = (Integer)iter.next();
5 }
```



(02) 第二种，随机访问，通过索引值去遍历
由于ArrayList实现了RandomAccess接口，它支持通过索引值去随机访问元素。

``` java
1 Integer value = null;
2 int size = list.size();
3 for (int i=0; i<size; i++) {
4     value = (Integer)list.get(i);        
5 }
```



(03) 第三种，for循环遍历

``` java
1 Integer value = null;
2 for (Integer integ:list) {
3     value = integ;
4 }
```



**遍历ArrayList时，使用随机访问(即，通过索引序号访问)效率最高，而使用迭代器的效率最低。**具体可以测试下。

## 三、LinkedList

### LinkedList简介

* LinkedList类是List接口的实现类——这意味着它是一个List集合，可以根据索引来随机访问集合中的元素。除此之外，LinkedList还实现了Deque接口，可以被当作成**双端队列**来使用，因此既可以被当成**“栈"**来使用，也可以当成**队列**来使用。
* LinkedList的实现机制与ArrayList完全不同。ArrayList内部是以数组的形式来保存集合中的元素的，因此随机访问集合元素时有较好的性能；而* * * LinkedList内部以链表的形式来保存集合中的元素，因此随机访问集合元素时性能较差，但在插入、删除元素时性能比较出色。
由于LinkedList双端队列的特性，所以新增了一些方法。

 

LinkedList可以实现Stack(栈),Queue(队列)

### LinkedList方法



``` java
void addFirst(E e):将指定元素插入此列表的开头。
void addLast(E e): 将指定元素添加到此列表的结尾。
E getFirst(E e): 返回此列表的第一个元素。
E getLast(E e): 返回此列表的最后一个元素。
boolean offerFirst(E e): 在此列表的开头插入指定的元素。
boolean offerLast(E e): 在此列表末尾插入指定的元素。
E peekFirst(E e): 获取但不移除此列表的第一个元素；如果此列表为空，则返回 null。
E peekLast(E e): 获取但不移除此列表的最后一个元素；如果此列表为空，则返回 null。
E pollFirst(E e): 获取并移除此列表的第一个元素；如果此列表为空，则返回 null。
E pollLast(E e): 获取并移除此列表的最后一个元素；如果此列表为空，则返回 null。
E removeFirst(E e): 移除并返回此列表的第一个元素。
boolean removeFirstOccurrence(Objcet o): 从此列表中移除第一次出现的指定元素（从头部到尾部遍历列表时）。
E removeLast(E e): 移除并返回此列表的最后一个元素。
boolean removeLastOccurrence(Objcet o): 从此列表中移除最后一次出现的指定元素（从头部到尾部遍历列表时）。
```



 

下面我们就以阅读源码的方式来了解LinkedList内部是怎样维护链表的。

### LinkedList本质

LinkedList调用默认构造函数，创建一个链表。由于维护了一个表头，表尾的Node对象的变量，可以进行后续的添加元素到链表中的操作，以及其他删除，插入等操作。也因此实现了双向队列的功能，即可向表头加入元素，也可以向表尾加入元素

``` java
1 //成员变量：表头，表尾
2  transient Node<E> first;
3 transient Node<E> last;
4 //默认构造函数，表示创建一个空链表
5 public LinkedList() {
6     }
```



下面来了解Node类的具体情况


``` java
1 private static class Node<E> {
2         //表示集合元素的值
3         E item;
4        //指向下个元素
5         Node<E> next;
6      //指向上个元素
7         Node<E> prev;
8 ...................................省略
9     }
```






由此可以具体了解链表是如何串联起来并且每个节点包含了传入集合的元素。
下面以增加操作，具体了解LinkedList的工作原理。

``` java
1 public boolean add(E e) {
2         linkLast(e);
3         return true;
4     }
```



调用`linkLast(e);`方法，默认向表尾节点加入新的元素

``` java
 1 void linkLast(E e) {
 2         final Node<E> l = last;
 3         final Node<E> newNode = new Node<>(l, e, null);
 4         last = newNode;
 5         if (l == null)
 6             first = newNode;
 7         else
 8             l.next = newNode;
 9         size++;
10         modCount++;
11     }
```





更新表尾节点，建立连接。其他操作类似，维护了整个链表。
下面具体来看，如何将“双向链表和索引值联系起来的”？

``` java
1 public E get(int index) {
2         checkElementIndex(index);//检查索引是否有效
3         return node(index).item;
4     }
```



调用了`node(index)`方法返回了一个Node对象，其中`node(index)`方法具体如下


``` java
 1 Node<E> node(int index) {
 2         // assert isElementIndex(index);
 3 
 4         if (index < (size >> 1)) {
 5             Node<E> x = first;
 6             for (int i = 0; i < index; i++)
 7                 x = x.next;
 8             return x;
 9         } else {
10             Node<E> x = last;
11             for (int i = size - 1; i > index; i--)
12                 x = x.prev;
13             return x;
14         }
15     }
```





首先会比较“index”和“双向链表长度的1/2”；若前者小，则从链表头开始往后查找，直到index位置；否则，从链表末尾开始先前查找，直到index位置。这就是“双线链表和索引值联系起来”的方法。
到此我们便会明白，LinkedList在插入、删除元素时性能比较出色，随机访问集合元素时性能较差。

### LinkedList遍历方式

LinkedList支持多种遍历方式。
* 1.通过迭代器遍历LinkedList
* 2.通过快速随机访问遍历LinkedList
* 3.通过for循环遍历LinkedList
* 4.通过pollFirst()遍历LinkedList
* 5.通过pollLast()遍历LinkedList
* 6通过removeFirst()遍历LinkedList
* 7.通过removeLast()遍历LinkedList

实现都比较简单，就不贴代码了。
**其中采用逐个遍历的方式，效率比较高。采用随机访问的方式去遍历LinkedList的方式效率最低。**

**LinkedList也是非线程安全的。**

## 四、ArrayList与LinkedList性能对比

* ArrayList 是一个数组队列，相当于动态数组。它由数组实现，随机访问效率高，随机插入、随机删除效率低。ArrayList应使用随机访问(即，通过索引序号访问)遍历集合元素。
* LinkedList 是一个双向链表。它也可以被当作**堆栈、队列或双端队列**进行操作。LinkedList随机访问效率低，但随机插入、随机删除效率高。
* LinkedList应使用采用逐个遍历的方式遍历集合元素。

如果涉及到“动态数组”、“栈”、“队列”、“链表”等结构，应该考虑用List，具体的选择哪个List，根据下面的标准来取舍。

* (01) 对于需要快速插入，删除元素，应该使用LinkedList。
* (02) 对于需要快速随机访问元素，应该使用ArrayList。
* (03) 对于“单线程环境” 或者 “多线程环境，但List仅仅只会被单个线程操作”，此时应该使用非同步的类(如ArrayList)。对于“多线程环境，且List可能同时被多个线程操作”，此时，应该使用同步的类(如Vector)。


## 参考文章
* https://www.cnblogs.com/midiyu/p/8144718.html