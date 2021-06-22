---
title: List原理和总结
---

## Java基础知识篇【List原理和总结】

::: tip
本文主要是介绍 List原理和总结 。
:::

[[toc]]

## 一.ArrayList原理及实现学习总结

## 1、ArrayList介绍

ArrayList是一种线性数据结构，它的底层是用数组实现的，相当于动态数组。与Java中的数组相比，它的容量能动态增长。类似于C语言中的动态申请内存，动态增长内存。 

当创建一个数组的时候，就必须确定它的大小，系统会在内存中开辟一块连续的空间，用来保存数组，因此数组容量固定且无法动态改变。ArrayList在保留数组可以快速查找的优势的基础上，弥补了数组在创建后，要往数组添加元素的弊端。实现的基本方法如下： 
* 1. 快速查找：在物理内存上采用顺序存储结构，因此可根据索引快速的查找元素。 
* 2. 容量动态增长： 当数组容量不够用时（表1），创建一个比原数组容量大的新数组（表2），将数组中的元素“搬”到新数组（表3），再将新的元素也放入新数组（表4），最后将新数组赋给原数组即可。（从左到右依次为表1，表2、表3、表4）!
  
<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/java/collection/listprin-1.jpg')" alt="wxmp">


## 2、ArrayList继承关系

ArrayList继承于AbstractList，实现了List, RandomAccess, Cloneable, java.io.Serializable这些接口。 
实现了所有List接口的操作，并且ArrayList允许存储null值。除了没有进行同步，ArrayList基本等同于Vector。在Vector中几乎对所有的方法都进行了同步，但ArrayList仅对writeObject和readObject进行了同步，其它比如add(Object)、remove(int)等都没有同步。

``` java
1 public class ArrayList<E> extends AbstractList<E> implements List<E>, RandomAccess, Cloneable, java.io.Serializable {
2     }
```

 

 

ArrayList与Collection关系如下图，实线代表继承，虚线代表实现接口： 

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/java/collection/listprin-2.jpg')" alt="wxmp">

* 1. AbstractList提供了List接口的默认实现（个别方法为抽象方法）。
* 2. List接口定义了列表必须实现的方法。
* 3. 实现了RandomAccess接口：提供了随机访问功能。RandmoAccess是java中用来被List实现，为List提供快速访问功能的。在ArrayList中，我们即可以通过元素的序号快速获取元素对象；这就是快速随机访问。
* 4. 实现了Cloneable接口：可以调用Object.clone方法返回该对象的浅拷贝。
* 5. 实现了 java.io.Serializable 接口：可以启用其序列化功能，能通过序列化去传输。未实现此接口的类将无法使其任何状态序列化或反序列化。序列化接口没有方法或字段，仅用于标识可序列化的语义。

## 3、ArrayList的实现

对于ArrayList而言，它实现List接口、底层使用数组保存所有元素。其操作基本上是对数组的操作。下面进行具体的介绍：

### **1. 私有属性**

 

``` java
1 // 保存ArrayList中数据的数组
2 private transient Object[] elementData;
3 // ArrayList中实际数据的数量
4 private int size;
```

 

* 很容易理解，elementData存储ArrayList内的元素，size表示它包含的元素的数量。 
* 有个关键字需要解释：transient。 
* Java的serialization提供了一种持久化对象实例的机制。当持久化对象时，可能有一个特殊的对象数据成员，我们不想用serialization机制来保存它。为了在一个特定对象的一个域上关闭serialization，可以在这个域前加上关键字transient。

### **2.构造函数**

ArrayList提供了三种方式的构造器，可以构造一个指定初始容量的空列表、构造一个默认初始容量为10的空列表以及构造一个包含指定collection的元素的列表，这些元素按照该collection的迭代器返回它们的顺序排列的。



``` java
 1     // ArrayList带容量大小的构造函数。
 2     public ArrayList(int initialCapacity) {
 3         super();
 4         if (initialCapacity < 0)
 5             throw new IllegalArgumentException("Illegal Capacity: " + initialCapacity);　　//IllegalArgumentException：违规参数异常
 6         // 新建一个数组
 7         this.elementData = new Object[initialCapacity];
 8     }
 9 
10     // ArrayList构造函数。默认容量是10。
11     public ArrayList() {
12         this(10);
13     }
14 
15     // 创建一个包含collection的ArrayList
16     public ArrayList(Collection<? extends E> c) {
17         elementData = c.toArray();
18         size = elementData.length;
19         // c.toArray might (incorrectly) not return Object[] (see 6260652)
20         if (elementData.getClass() != Object[].class)
21             elementData = Arrays.copyOf(elementData, size, Object[].class);
22     }
```



 

 

### **3.元素存储** 
ArrayList是基于数组实现的，当添加元素的时候，如果数组大，则在将某个位置的值设置为指定元素即可，如果数组容量不够了，以add（E e）为例，可以看到add(E e)中先调用了**ensureCapacity(size+1)**方法，之后将元素的索引赋给elementData[size]，而后size自增。例如初次添加时，size为0，add将elementData[0]赋值为e，然后size设置为1（类似执行以下两条语句elementData[0]=e;size=1）。将元素的索引赋给elementData[size]不是会出现数组越界的情况吗？这里关键就在ensureCapacity(size+1)中了。 
具体实现如下： 
**(1)** 当调用下面这两个方法向数组中添加元素时，默认是添加到数组中最后一个元素的后面。内存结构变化如下： 

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/java/collection/listprin-3.jpg')" alt="wxmp">

 



``` java
 1 // 添加元素e
 2     public boolean add(E e) {
 3         // 确定ArrayList的容量大小
 4         ensureCapacity(size + 1); // Increments modCount!!
 5         // 添加e到ArrayList中
 6         elementData[size++] = e;
 7         return true;
 8     }
 9 // 将集合c追加到ArrayList中
10     public boolean addAll(Collection<? extends E> c) {
11         Object[] a = c.toArray();
12         int numNew = a.length;
13         ensureCapacity(size + numNew); // Increments modCount
14         System.arraycopy(a, 0, elementData, size, numNew);　　//把属组a中从0开始的元素copy到属组elementData中，从第size个元素开始15 　　　　　size += numNew; 16 　　　　　return numNew != 0; 17 }
```



 

 

**（2）**当调用下面这两个方法向数组中添加元素或集合时，会先查找索引位置，然后将元素添加到索引处，最后把添加前索引后面的元素追加到新元素的后面。 

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/java/collection/listprin-4.jpg')" alt="wxmp">


 



``` java
 1 // 将e添加到ArrayList的指定位置
 2     public void add(int index, E element) {
 3         if (index > size || index < 0)
 4             throw new IndexOutOfBoundsException("Index: " + index + ", Size: " + size);　　//索引越界异常
 5         ensureCapacity(size + 1); // Increments modCount!!
 6         System.arraycopy(elementData, index, elementData, index + 1, size - index);
 7         elementData[index] = element;
 8         size++;
 9     }
10     // 从index位置开始，将集合c添加到ArrayList
11     public boolean addAll(int index, Collection<? extends E> c) {
12         if (index > size || index < 0)
13             throw new IndexOutOfBoundsException("Index: " + index + ", Size: " + size);
14         Object[] a = c.toArray();
15         int numNew = a.length;
16         ensureCapacity(size + numNew); // Increments modCount
17         int numMoved = size - index;
18         if (numMoved > 0)
19             System.arraycopy(elementData, index, elementData, index + numNew, numMoved);
20         System.arraycopy(a, 0, elementData, index, numNew);
21         size += numNew;
22         return numNew != 0;
23     }
```



 

 

**（3）**调用该方法会将index位置的元素用新元素替代 

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/java/collection/listprin-5.jpg')" alt="wxmp">


 



``` java
1 // 设置index位置的值为element
2     public E set(int index, E element) {
3         RangeCheck(index);
4         E oldValue = (E) elementData[index];
5         elementData[index] = element;
6         return oldValue;
7     }
```



 

### **4.元素读取**

``` java
1 // 返回此列表中指定位置上的元素。
2     public E get(int index) {
3         RangeCheck(index);
4         return (E) elementData[index];
5     }
```

 

### **5.元素删除** 
ArrayList提供了根据下标或者指定对象两种方式的删除功能。如下： 
romove(int index)，首先是检查范围，修改modCount，保留将要被移除的元素，将移除位置之后的元素向前挪动一个位置，将list末尾元素置空（null），返回被移除的元素。 

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/java/collection/listprin-6.jpg')" alt="wxmp">


 

```  java
 1 // 删除ArrayList指定位置的元素
 2     public E remove(int index) {
 3         RangeCheck(index);
 4         modCount++;　　//modCount:修改统计数
 5         E oldValue = (E) elementData[index];
 6         int numMoved = size - index - 1;
 7         if (numMoved > 0)
 8             System.arraycopy(elementData, index + 1, elementData, index, numMoved);
 9         elementData[--size] = null; // Let gc do its work //该对象的引用变为null，虚拟机自动清理该对象
10         return oldValue;
11     }
```



 

 ### **6. 调整数组容量ensureCapacity** 
**（1）**从上面介绍的向ArrayList中存储元素的代码中，我们看到，每当向数组中添加元素时，都要去检查添加后元素的个数是否会超出当前数组的长度，如果超出，数组将会进行扩容，以满足添加数据的需求。数组扩容通过一个公开的方法ensureCapacity(int minCapacity)来实现。在实际添加大量元素前，我也可以使用ensureCapacity来手动增加ArrayList实例的容量，以减少递增式再分配的数量。

 



``` java
 1 // 确定ArrarList的容量。
 2     // 若ArrayList的容量不足以容纳当前的全部元素，设置 新的容量=“(原始容量x3)/2 + 1”
 3     public void ensureCapacity(int minCapacity) {
 4         // 将“修改统计数”+1
 5         modCount++;
 6         int oldCapacity = elementData.length;
 7         // 若当前容量不足以容纳当前的元素个数，设置 新的容量=“(原始容量x3)/2 + 1”
 8         if (minCapacity > oldCapacity) {
 9             Object oldData[] = elementData;
10             int newCapacity = (oldCapacity * 3) / 2 + 1;
11             if (newCapacity < minCapacity)
12                 newCapacity = minCapacity;
13             elementData = Arrays.copyOf(elementData, newCapacity);
14         }
15     }
```



 

 

从上述代码中可以看出，数组进行扩容时，**会将老数组中的元素重新拷贝一份到新的数组中，每次数组容量的增长大约是其原容量的1.5倍**。这种操作的代价是很高的，因此在实际使用时，我们应该尽量避免数组容量的扩张。当我们可预知要保存的元素的多少时，要在构造ArrayList实例时，就指定其容量，以避免数组扩容的发生。或者根据实际需求，通过调用ensureCapacity方法来手动增加ArrayList实例的容量。 
**(2)** ArrayList还给我们提供了将底层数组的容量调整为当前列表保存的实际元素的大小的功能。它可以通过trimToSize方法来实现。代码如下：



``` java
1 // 将当前容量值设为 =实际元素个数
2     public void trimToSize() {
3         modCount++;
4         int oldCapacity = elementData.length;
5         if (size < oldCapacity) {
6             elementData = Arrays.copyOf(elementData, size);
7         }
8     }
```



 

 

由于elementData的长度会被拓展，size标记的是其中包含的元素的个数。所以会出现size很小但elementData.length很大的情况，将出现空间的浪费。trimToSize将返回一个新的数组给elementData，元素内容保持不变，length和size相同，节省空间。 
### **7.转为静态数组toArray的两种方法** 
**（1）**调用Arrays.copyOf将返回一个数组，数组内容是size个elementData的元素，即拷贝elementData从0至size-1位置的元素到新数组并返回。

```
1 // 返回ArrayList的Object数组
2     public Object[] toArray() {
3         return Arrays.copyOf(elementData, size);
4     }
```

**（2）**如果传入数组的长度小于size，返回一个新的数组，大小为size，类型与传入数组相同。所传入数组长度与size相等，则将elementData复制到传入数组中并返回传入的数组。若传入数组长度大于size，除了复制elementData外，还将把返回数组的第size个元素置为空。



``` java
 1 // 返回ArrayList的模板数组。所谓模板数组，即可以将T设为任意的数据类型
 2     public <T> T[] toArray(T[] a) {
 3         // 若数组a的大小 < ArrayList的元素个数；
 4         // 则新建一个T[]数组，数组大小是“ArrayList的元素个数”，并将“ArrayList”全部拷贝到新数组中
 5         if (a.length < size)
 6             return (T[]) Arrays.copyOf(elementData, size, a.getClass());
 7         // 若数组a的大小 >= ArrayList的元素个数；
 8         // 则将ArrayList的全部元素都拷贝到数组a中。
 9         System.arraycopy(elementData, 0, a, 0, size);
10         if (a.length > size)
11             a[size] = null;
12         return a;
13     }
```



 

### **8.实现了Cloneable接口，进行数据浅拷贝**



``` java
 1 // 克隆函数
 2     public Object clone() {
 3         try {
 4             ArrayList<E> v = (ArrayList<E>) super.clone();
 5             // 将当前ArrayList的全部元素拷贝到v中
 6             v.elementData = Arrays.copyOf(elementData, size);
 7             v.modCount = 0;
 8             return v;
 9         } catch (CloneNotSupportedException e) {　　
10             // this shouldn't happen, since we are Cloneable
11             throw new InternalError();
12         }
13     }
```




 

### **9.实现Serializable 接口，启用其序列化功能**



``` java
 1     // java.io.Serializable的写入函数
 2     // 将ArrayList的“容量，所有的元素值”都写入到输出流中
 3     private void writeObject(java.io.ObjectOutputStream s) throws java.io.IOException {
 4         // Write out element count, and any hidden stuff
 5         int expectedModCount = modCount;
 6         s.defaultWriteObject();
 7         // 写入“数组的容量”
 8         s.writeInt(elementData.length);
 9         // 写入“数组的每一个元素”
10         for (int i = 0; i < size; i++)
11             s.writeObject(elementData[i]);
12         if (modCount != expectedModCount) {
13             throw new ConcurrentModificationException();
14         }
15     }
16 
17     // java.io.Serializable的读取函数：根据写入方式读出
18     // 先将ArrayList的“容量”读出，然后将“所有的元素值”读出
19     private void readObject(java.io.ObjectInputStream s) throws java.io.IOException, ClassNotFoundException {
20         // Read in size, and any hidden stuff
21         s.defaultReadObject();
22         // 从输入流中读取ArrayList的“容量”
23         int arrayLength = s.readInt();
24         Object[] a = elementData = new Object[arrayLength];
25         // 从输入流中将“所有的元素值”读出
26         for (int i = 0; i < size; i++)
27             a[i] = s.readObject();
28     }
```

## 【----------------------------】
## 二.LinkedList原理及实现学习总结


## 1、LinkedList实现原理概述

LinkedList 和 ArrayList 一样，都实现了 List 接口，但其内部的数据结构有本质的不同。LinkedList 是基于链表实现的（通过名字也能区分开来），所以它的插入和删除操作比 ArrayList 更加高效。但也是由于其为基于链表的，所以随机访问的效率要比 ArrayList 差。

## 2、LinkedList类定义

```
1 public class LinkedList<E>
2      extends AbstractSequentialList<E>
3      implements List<E>, Deque<E>, Cloneable, java.io.Serializable
```

 

* 1. LinkedList 是一个继承于AbstractSequentialList的双向链表。它也可以被当作**堆栈、队列或双端队列**进行操作。
* 2. LinkedList 实现 List 接口，能对它进行队列操作。
* 3. LinkedList 实现 Deque 接口，即能将LinkedList当作双端队列使用。
* 4. LinkedList 实现了Cloneable接口，即覆盖了函数clone()，能克隆。
* 5. LinkedList 实现java.io.Serializable接口，这意味着LinkedList支持序列化，能通过序列化去传输。
* 6. LinkedList 是非同步的。

 

为什么要继承自AbstractSequentialList ? 
AbstractSequentialList 实现了get(int index)、set(int index, E element)、add(int index, E element) 和 remove(int index)这些骨干性函数。降低了List接口的复杂度。这些接口都是随机访问List的，LinkedList是双向链表；既然它继承于AbstractSequentialList，就相当于已经实现了“get(int index)这些接口”。 
此外，我们若需要通过AbstractSequentialList自己实现一个列表，只需要扩展此类，并提供 listIterator() 和 size() 方法的实现即可。若要实现不可修改的列表，则需要实现列表迭代器的 hasNext、next、hasPrevious、previous 和 index 方法即可。

LinkedList的类图关系：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/java/collection/listprin-21.jpg')" alt="wxmp">

## 3、LinkedList数据结构原理

LinkedList底层的数据结构是基于**双向循环链表的，且头结点中不存放数据**,如下： 

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/java/collection/listprin-22.jpg')" alt="wxmp">

既然是双向链表，那么必定存在一种数据结构——我们可以称之为节点，节点实例保存业务数据，前一个节点的位置信息和后一个节点位置信息，如下图所示： 

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/java/collection/listprin-23.jpg')" alt="wxmp">

## 4、私有属性

LinkedList中之定义了两个属性：

```
1 private transient Entry<E> header = new Entry<E>(null, null, null);
2 private transient int size = 0;
```

 

 

header是双向链表的头节点，它是双向链表节点所对应的类Entry的实例。Entry中包含成员变量： previous, next, element。其中，previous是该节点的上一个节点，next是该节点的下一个节点，element是该节点所包含的值。 
　　size是双向链表中节点实例的个数。 
首先来了解**节点类Entry类**的代码。



``` java
 1 private static class Entry<E> {
 2      E element;
 3       Entry<E> next;
 4       Entry<E> previous;
 5 
 6       Entry(E element, Entry<E> next, Entry<E> previous) {
 7           this.element = element;
 8           this.next = next;
 9          this.previous = previous;
10              }
11           }
```


节点类很简单，element存放业务数据，previous与next分别存放前后节点的信息（在数据结构中我们通常称之为前后节点的指针）。

}

## 5、构造方法

LinkedList提供了两个构造方法。

``` java
1 public LinkedList() {    
2  header.next = header.previous = header;
3  }
4 public LinkedList(Collection<? extends E> c) {
5      this();
6    addAll(c);
```

第一个构造方法不接受参数，将header实例的previous和next全部指向header实例（**注意，这个是一个双向循环链表，如果不是循环链表，空链表的情况应该是header节点的前一节点和后一节点均为null**），这样整个链表其实就只有header一个节点，用于表示一个空的链表。 
执行完构造函数后，header实例自身形成一个**闭环**，如下图所示： 

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/java/collection/listprin-24.jpg')" alt="wxmp">

第二个构造方法接收一个Collection参数c，调用第一个构造方法构造一个空的链表，之后通过addAll将c中的元素全部添加到链表中。

## 6、元素添加

下面说明双向链表添加元素add()的原理:



``` java
 1  // 将元素(E)添加到LinkedList中
 2      public boolean add(E e) {
 3          // 将节点(节点数据是e)添加到表头(header)之前。
 4          // 即，将节点添加到双向链表的末端。         addBefore(e, header);
 5          return true;
 6      }
 7 
 8      public void add(int index, E element) {
 9          addBefore(element, (index==size ? header : entry(index)));
10      }
11 
12     private Entry<E> addBefore(E e, Entry<E> entry) {
13          Entry<E> newEntry = new Entry<E>(e, entry, entry.previous);
14          newEntry.previous.next = newEntry;
15          newEntry.next.previous = newEntry;
16          size++;
17          modCount++;
18          return newEntry;
19 }
```



 

addBefore(E e,Entry entry)方法是个私有方法，所以无法在外部程序中调用（当然，这是一般情况，你可以通过反射上面的还是能调用到的）。 
addBefore(E e,Entry entry)先通过Entry的构造方法创建e的节点newEntry（包含了将其下一个节点设置为entry，上一个节点设置为entry.previous的操作，相当于修改newEntry的“指针”），之后修改插入位置后newEntry的前一节点的next引用和后一节点的previous引用，使链表节点间的引用关系保持正确。之后修改和size大小和记录modCount，然后返回新插入的节点。 
下面分解“添加第一个数据”的步骤： 
第一步：初始化后LinkedList实例的情况： 

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/java/collection/listprin-25.jpg')" alt="wxmp">

第二步：初始化一个预添加的Entry实例（newEntry）。 
Entry newEntry = newEntry(e, entry, entry.previous); 

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/java/collection/listprin-26.jpg')" alt="wxmp">

第三步：调整新加入节点和头结点（header）的前后指针。 
newEntry.previous.next = newEntry; 
newEntry.previous即header，newEntry.previous.next即header的next指向newEntry实例。在上图中应该是“4号线”指向newEntry。 
newEntry.next.previous = newEntry; 
newEntry.next即header，newEntry.next.previous即header的previous指向newEntry实例。在上图中应该是“3号线”指向newEntry。 
调整后如下图所示： 
图——加入第一个节点后LinkedList示意图 

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/java/collection/listprin-27.jpg')" alt="wxmp">

下面分解“添加第二个数据”的步骤： 
第一步：新建节点。 
图——添加第二个节点 

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/java/collection/listprin-28.jpg')" alt="wxmp">

第二步：调整新节点和头结点的前后指针信息。 
图——调整前后指针信息 

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/java/collection/listprin-29.jpg')" alt="wxmp">

添加后续数据情况和上述一致，LinkedList实例是没有容量限制的。

总结，addBefore(E e,Entry entry)实现在entry之前插入由e构造的新节点。而add(E e)实现在header节点之前插入由e构造的新节点。为了便于理解，下面给出插入节点的示意图。 

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/java/collection/listprin-30.jpg')" alt="wxmp">
 



``` java
1 public void addFirst(E e) {
2      addBefore(e, header.next);
3  }
4 
5  public void addLast(E e) {
6      addBefore(e, header);
7  }
```



看上面的示意图，结合addBefore(E e,Entry entry)方法，很容易理解addFrist(E e)只需实现在header元素的下一个元素之前插入，即示意图中的一号之前。addLast(E e)只需在实现在header节点前（因为是循环链表，所以header的前一个节点就是链表的最后一个节点）插入节点（插入后在2号节点之后）。

## 7、删除数据remove()



``` java
 1 public E remove(int index) {
 2         Entry e = get(index);
 3         remove(e);
 4         return e.element;
 5     }
 6 
 7     private void remove(E e) {
 8         if (e == header)
 9             throw new NoSuchElementException();
10         // 将前一节点的next引用赋值为e的下一节点
11         e.previous.next = e.next;
12         // 将e的下一节点的previous赋值为e的上一节点
13         e.next.previous = e.previous;
14         // 上面两条语句的执行已经导致了无法在链表中访问到e节点，而下面解除了e节点对前后节点的引用
15         e.next = e.previous = null;
16         // 将被移除的节点的内容设为null
17         e.element = null;
18         // 修改size大小
19         size--;
20     }
```



 

 

由于删除了某一节点因此调整相应节点的前后指针信息，如下： 
e.previous.next = e.next;//预删除节点的前一节点的后指针指向预删除节点的后一个节点。 
e.next.previous = e.previous;//预删除节点的后一节点的前指针指向预删除节点的前一个节点。 
清空预删除节点： 
e.next = e.previous = null; 
e.element = null; 
交给gc完成资源回收，删除操作结束。 
与ArrayList比较而言，LinkedList的删除动作不需要“移动”很多数据，从而效率更高。

## 8、数据获取get()

Get(int)方法的实现在remove(int)中已经涉及过了。首先判断位置信息是否合法（大于等于0，小于当前LinkedList实例的Size），然后遍历到具体位置，获得节点的业务数据（element）并返回。 
注意：为了提高效率，需要根据获取的位置判断是从头还是从尾开始遍历。



``` java
 1 // 获取双向链表中指定位置的节点    
 2     private Entry<E> entry(int index) {    
 3         if (index < 0 || index >= size)    
 4             throw new IndexOutOfBoundsException("Index: "+index+    
 5                                                 ", Size: "+size);    
 6         Entry<E> e = header;    
 7         // 获取index处的节点。    
 8         // 若index < 双向链表长度的1/2,则从前先后查找;    
 9         // 否则，从后向前查找。    
10         if (index < (size >> 1)) {    
11             for (int i = 0; i <= index; i++)    
12                 e = e.next;    
13         } else {    
14             for (int i = size; i > index; i--)    
15                 e = e.previous;    
16         }    
17         return e;    
18     }
```



注意细节：位运算与直接做除法的区别。先将index与长度size的一半比较，如果index

## 9、 清除数据clear()



``` java
 1 public void clear() {
 2       Entry<E> e = header.next;
 3       // e可以理解为一个移动的“指针”，因为是循环链表，所以回到header的时候说明已经没有节点了
 4       while (e != header) {
 5          // 保留e的下一个节点的引用
 6           Entry<E> next = e.next;
 7           // 解除节点e对前后节点的引用
 8          e.next = e.previous = null;
 9           // 将节点e的内容置空
10          e.element = null;
11          // 将e移动到下一个节点
12          e = next;
13   }
14      // 将header构造成一个循环链表，同构造方法构造一个空的LinkedList
15      header.next = header.previous = header;
16      // 修改size
17      size = 0;
18      modCount++;
19  }
```



 

## 10、数据包含 contains(Object o)



``` java
 1 public boolean contains(Object o) {
 2      return indexOf(o) != -1;
 3  }
 4  // 从前向后查找，返回“值为对象(o)的节点对应的索引”  不存在就返回-1 
 5  public int indexOf(Object o) {
 6       int index = 0;
 7       if (o==null) {
 8           for (Entry e = header.next; e != header; e = e.next) {
 9               if (e.element==null)
10                   return index;
11               index++;
12          }
13       } else {
14          for (Entry e = header.next; e != header; e = e.next) {
15              if (o.equals(e.element))
16                  return index;
17              index++;
18         }
19     }
20      return -1;
21  }
```



indexOf(Object o)判断o链表中是否存在节点的element和o相等，若相等则返回该节点在链表中的索引位置，若不存在则放回-1。 
contains(Object o)方法通过判断indexOf(Object o)方法返回的值是否是-1来判断链表中是否包含对象o。

## 11、数据复制clone()与toArray()

clone()



``` java
 1 public Object clone() {
 2       LinkedList<E> clone = null;
 3       try {
 4           clone = (LinkedList<E>) super.clone();
 5       } catch (CloneNotSupportedException e) {
 6           throw new InternalError();
 7     }
 8       clone.header = new Entry<E>(null, null, null);
 9       clone.header.next = clone.header.previous = clone.header;
10      clone.size = 0;
11      clone.modCount = 0;
12      for (Entry<E> e = header.next; e != header; e = e.next)
13         clone.add(e.element);
14      return clone;
15  }
```



 

调用父类的clone()方法初始化对象链表clone，将clone构造成一个空的双向循环链表，之后将header的下一个节点开始将逐个节点添加到clone中。最后返回克隆的clone对象。 
toArray()



``` java
1 public Object[] toArray() {
2      Object[] result = new Object[size];
3      int i = 0;
4      for (Entry<E> e = header.next; e != header; e = e.next)
5          result[i++] = e.element;
6      return result;
7  }
```



创建大小和LinkedList相等的数组result，遍历链表，将每个节点的元素element复制到数组中，返回数组。 
toArray(T[] a)



``` java
 1 public <T> T[] toArray(T[] a) {
 2       if (a.length < size)
 3           a = (T[])java.lang.reflect.Array.newInstance(
 4                                  a.getClass().getComponentType(), size);
 5       int i = 0;
 6       Object[] result = a;
 7       for (Entry<E> e = header.next; e != header; e = e.next)
 8           result[i++] = e.element;
 9       if (a.length > size)
10          a[size] = null;
11      return a;
12  }
```



先判断出入的数组a的大小是否足够，若大小不够则拓展。这里用到了发射的方法，重新实例化了一个大小为size的数组。之后将数组a赋值给数组result，遍历链表向result中添加的元素。最后判断数组a的长度是否大于size，若大于则将size位置的内容设置为null。返回a。 
从代码中可以看出，数组a的length小于等于size时，a中所有元素被覆盖，被拓展来的空间存储的内容都是null；若数组a的length的length大于size，则0至size-1位置的内容被覆盖，size位置的元素被设置为null，size之后的元素不变。 
为什么不直接对数组a进行操作，要将a赋值给result数组之后对result数组进行操作？

## 12、遍历数据：Iterator()

LinkedList的Iterator 
除了Entry，LinkedList还有一个内部类：ListItr。 
ListItr实现了ListIterator接口，可知它是一个迭代器，通过它可以遍历修改LinkedList。 
在LinkedList中提供了获取ListItr对象的方法：listIterator(int index)。

``` java
1 public ListIterator<E> listIterator(int index) {
2      return new ListItr(index);
3  }
```

 

该方法只是简单的返回了一个ListItr对象。 
LinkedList中还有通过集成获得的listIterator()方法，该方法只是调用了listIterator(int index)并且传入0。

## 【----------------------------】

## 三.HashMap原理及实现学习总结
HashMap是Java中最常用的集合类框架之一，是Java语言中非常典型的数据结构。本篇主要是从HashMap的工作原理，数据结构分析，HashMap存储和读取几个方面对其进行学习总结。

## 1. HashMap的工作原理

HashMap基于hashing原理，我们通过put()和get()方法储存和获取对象。当我们将键值对传递给put()方法时，它调用键对象的hashCode()方法来计算hashcode，然后找到bucket位置来储存值对象。当获取对象时，通过键对象的equals()方法找到正确的键值对，然后返回值对象。HashMap使用LinkedList来解决碰撞问题，当发生碰撞了，对象将会储存在LinkedList的下一个节点中。 HashMap在每个LinkedList节点中储存键值对对象。 
当两个不同的键对象的hashcode相同时会发生什么？ 它们会储存在同一个bucket位置的LinkedList中。键对象的equals()方法用来找到键值对。

## 2.HashMap的定义

HashMap实现了Map接口，继承AbstractMap。其中Map接口定义了键映射到值的规则，而AbstractMap类提供 Map 接口的骨干实现，以最大限度地减少实现此接口所需的工作！

``` java
1 public class HashMap<K,V>  
2     extends AbstractMap<K,V>  
3     implements Map<K,V>, Cloneable, Serializable  
```

## 3.HashMap的数据结构

HashMap的底层主要是基于**数组**和**链表**来实现的，它之所以有相当快的查询速度主要是因为它是通过计算散列码来决定存储的位置。HashMap中主要是通过key的hashCode来计算hash值的，只要hashCode相同，计算出来的hash值就一样。如果存储的对象对多了，就有可能不同的对象所算出来的hash值是相同的，这就出现了所谓的hash冲突。学过数据结构的同学都知道，解决hash冲突的方法有很多，HashMap底层是通过链表来解决hash冲突的。 

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/java/collection/listprin-31.jpg')" alt="wxmp">

紫色部分即代表哈希表，也称为哈希数组，数组的每个元素都是一个单链表的头节点，链表是用来解决冲突的，如果不同的key映射到了数组的同一位置处，就将其放入单链表中。

## 4.HashMap的构造函数

在这里提到了两个参数：**初始容量，负载因子**。这两个参数是影响HashMap性能的重要参数，其中容量表示哈希表中桶的数量，初始容量是创建哈希表时的容量，加载因子是哈希表在其容量自动增加之前可以达到多满的一种尺度，它衡量的是一个散列表的空间的使用程度，负载因子越大表示散列表的装填程度越高，反之愈小。对于使用链表法的散列表来说，**查找一个元素的平均时间是O(1+a)**，因此如果负载因子越大，对空间的利用更充分，然而后果是查找效率的降低；如果负载因子太小，那么散列表的数据将过于稀疏，对空间造成严重浪费。系统默认负载因子为0.75，一般情况下我们是无需修改的。当哈希表中的条目数超出了加载因子与当前容量的乘积时，通过调用 rehash 方法将容量翻倍。 
HashMap一共重载了4个构造方法，分别为：

``` java
1 HashMap();//构造一个具有默认初始容量 (16) 和默认加载因子 (0.75) 的空 HashMap。
2 HashMap(int initialCapacity);//构造一个带指定初始容量和默认加载因子 (0.75) 的空 HashMap。
3 HashMap(int initialCapacity, float loadFactor);//构造一个带指定初始容量和加载因子的空 HashMap。
4 HashMap(Map<? extendsK,? extendsV> m); //构造一个映射关系与指定 Map 相同的 HashMap。
```

下面是第三个构造方法源码，其它构造方法最终调用的都是它：



``` java
 1 // 构造一个带指定初始容量和加载因子的空 HashMap。
 2     public HashMap(int initialCapacity, float loadFactor) {
 3         // 如果指定初始容量小于0，抛错
 4         if (initialCapacity < 0)
 5             throw new IllegalArgumentException("Illegal initial capacity: " + initialCapacity);
 6         // 如果初始容量大于系统默认最大容量，则初始容量为最大容量
 7         if (initialCapacity > MAXIMUM_CAPACITY)
 8             initialCapacity = MAXIMUM_CAPACITY;
 9         // 如果loadFactor小于0，或loadFactor是NaN，则抛错
10         if (loadFactor <= 0 || Float.isNaN(loadFactor))
11             throw new IllegalArgumentException("Illegal load factor: " + loadFactor);
12 
13         // 寻找一个2的k次幂capacity恰好大于initialCapacity
14         int capacity = 1;
15         while (capacity < initialCapacity)
16             capacity <<= 1;
17 
18         // 设置加载因子
19         this.loadFactor = loadFactor;
20         // 设置阈值为capacity * loadFactor，实际上当HashMap当前size到达这个阈值时，HashMap就需要扩大一倍了。
21         threshold = (int) (capacity * loadFactor);
22         // 创建一个capacity长度的数组用于保存数据
23         table = new Entry[capacity];
24         // 开始初始化
25         init();
26     }
```



从源码中可以看出，每次新建一个HashMap时，都会初始化一个table数组。table数组的元素为Entry节点。



``` java
 1 // 内置class输入对象，也就是我们说的桶
 2     static class Entry<K, V> implements Map.Entry<K, V> {
 3         final K key;
 4         V value;
 5         Entry<K, V> next;
 6         final int hash;
 7 
 8         // 构造函数
 9         Entry(int h, K k, V v, Entry<K, V> n) {
10             value = v;
11             next = n;
12             key = k;
13             hash = h;
14         }
15 
16         // 返回key
17         public final K getKey() {
18             return key;
19         }
20 
21         // 返回value
22         public final V getValue() {
23             return value;
24         }
25 
26         // 设置value
27         public final V setValue(V newValue) {
28             V oldValue = value;
29             value = newValue;
30             return oldValue;
31         }
32 
33         // 是否相同
34         public final boolean equals(Object o) {
35             // 如果o不是Map.Entry的实例，那么肯定不相同了
36             if (!(o instanceof Map.Entry))
37                 return false;
38             // 将o转成Map.Entry
39             Map.Entry e = (Map.Entry) o;
40             // 得到key和value对比是否相同，相同则为true
41             Object k1 = getKey();
42             Object k2 = e.getKey();
43             if (k1 == k2 || (k1 != null && k1.equals(k2))) {
44                 Object v1 = getValue();
45                 Object v2 = e.getValue();
46                 if (v1 == v2 || (v1 != null && v1.equals(v2)))
47                     return true;
48             }
49             // 否则为false
50             return false;
51         }
52 
53         // hashCode
54         public final int hashCode() {
55             return (key == null ? 0 : key.hashCode()) ^ (value == null ? 0 : value.hashCode());
56         }
57 
58         // 返回String
59         public final String toString() {
60             return getKey() + "=" + getValue();
61         }
62 
63         // 使用该方法证明该key已经在该map中
64         void recordAccess(HashMap<K, V> m) {
65         }
66 
67         // 该方法记录该key已经被移除了
68         void recordRemoval(HashMap<K, V> m) {
69         }
70     }
```



其中Entry为HashMap的内部类，它包含了**键key、值value、下一个节点next，以及hash值**，这是非常重要的，正是由于Entry才构成了table数组的项为链表。

## 5.HashMap的存储实现

HashMap中我们最长用的就是put(K, V)和get(K)。我们都知道，HashMap的K值是唯一的，那如何保证唯一性呢？我们首先想到的是用equals比较，没错，这样可以实现，但随着内部元素的增多，put和get的效率将越来越低，这里的时间复杂度是O(n)，假如有1000个元素，put时需要比较1000次。实际上，HashMap很少会用到equals方法，因为其内通过一个哈希表管理所有元素，哈希是通过hash单词音译过来的，也可以称为散列表，哈希算法可以快速的存取元素，**当我们调用put存值时，HashMap首先会调用K的hashCode方法，获取哈希码，通过哈希码快速找到某个存放位置，**这个位置可以被称之为bucketIndex，通过上面所述hashCode的协定可以知道，如果hashCode不同，equals一定为false，如果hashCode相同，equals不一定为true。所以理论上，hashCode可能存在冲突的情况，有个专业名词叫**碰撞**，当碰撞发生时，计算出的bucketIndex也是相同的，这时会取到bucketIndex位置已存储的元素，最终通过equals来比较，equals方法就是哈希码碰撞时才会执行的方法，所以前面说HashMap很少会用到equals。HashMap通过hashCode和equals最终判断出K是否已存在，如果已存在，则使用新V值替换旧V值，并返回旧V值，如果不存在 ，则存放新的键值对到bucketIndex位置。

　　即先用hashCode()方法，再用equals()方法

整个put过程的流程图如下： 

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/java/collection/listprin-32.jpg')" alt="wxmp">

相关源码如下：



``` java
 1 // 在此映射中关联指定值与指定键。如果该映射以前包含了一个该键的映射关系，则旧值被替换
 2     public V put(K key, V value) {
 3         // 当key为null，调用putForNullKey方法，保存null与table第一个位置中，这是HashMap允许为null的原因 
 4         if (key == null)
 5             return putForNullKey(value);
 6         // 使用hash函数预处理hashCode，计算key的hash值  
 7         int hash = hash(key.hashCode());//-------（1）
 8         // 计算key hash 值在 table 数组中的位置 
 9         int i = indexFor(hash, table.length);//------(2)
10         // 从i出开始迭代 e,找到 key 保存的位置
11         for (Entry<K, V> e = table[i]; e != null; e = e.next) {
12             Object k;
13             // 判断该条链上是否有hash值相同的(key相同) 
14             // 若存在相同，则直接覆盖value，返回旧value 
15             if (e.hash == hash && ((k = e.key) == key || key.equals(k))) {
16                 // 旧值 = 新值  
17                 V oldValue = e.value;
18                 // 将要存储的value存进去
19                 e.value = value;
20                 e.recordAccess(this);
21                 // 返回旧的value
22                 return oldValue;
23             }
24         }
25         // 修改次数增加1 
26         modCount++;
27         // 将key、value添加至i位置处 
28         addEntry(hash, key, value, i);
29         return null;
30     }
```



通过源码我们可以清晰看到HashMap保存数据的过程为：首先判断key是否为null，若为null，则直接调用**putForNullKey**方法。若不为空则先计算key的hash值，然后根据hash值搜索在table数组中的索引位置，如果table数组在该位置处有元素，则通过比较是否存在相同的key，若存在则覆盖原来key的value，否则将该元素保存在链头（最先保存的元素放在链尾）。若table在该处没有元素，则直接保存。这个过程看似比较简单，其实深有内幕。有如下几点： 
1、 先看迭代处。此处迭代原因就是为了防止存在相同的key值，若发现两个hash值（key）相同时，HashMap的处理方式是用新value替换旧value，这里并没有处理key，这就解释了HashMap中没有两个相同的key。 
2、 在看（1）、（2）处。这里是HashMap的精华所在。首先是hash方法，该方法为一个纯粹的数学计算，就是计算h的hash值。

``` java
1 static int hash(int h) {  
2         h ^= (h >>> 20) ^ (h >>> 12);  
3         return h ^ (h >>> 7) ^ (h >>> 4);  
4     }  
 我们知道对于HashMap的table而言，数据分布需要均匀（最好每项都只有一个元素，这样就可以直接找到），不能太紧也不能太松，太紧会导致查询速度慢，太松则浪费空间。计算hash值后，怎么才能保证table元素分布均与呢？我们会想到取模，
但是由于取模的消耗较大，HashMap是这样处理的：调用indexFor方法。
1 static int indexFor(int h, int length) {  
2         return h & (length-1);  
3     } 
```

 

**HashMap的底层数组长度总是2的n次方**，在构造函数中存在：capacity <<= 1;这样做总是能够保证HashMap的底层数组长度为2的n次方。当length为2的n次方时，h&(length - 1)就相当于对length取模，而且速度比直接取模快得多，**这是HashMap在速度上的一个优化。** 
这里再来复习put的流程：当我们想一个HashMap中添加一对key-value时，系统首先会计算key的hash值，然后根据hash值确认在table中存储的位置。若该位置没有元素，则直接插入。否则迭代该处元素链表并依此比较其key的hash值。如果两个hash值相等且key值相等(e.hash == hash && ((k = e.key) == key || key.equals(k))),则用新的Entry的value覆盖原来节点的value。如果两个hash值相等但key值不等 ，则将该节点插入该链表的链头。具体的实现过程见addEntry方法，如下：



``` java
 1 // 添加一个新的桶来保存该key和value
 2     void addEntry(int hash, K key, V value, int bucketIndex) {
 3         // 获取bucketIndex处的Entry 
 4         Entry<K, V> e = table[bucketIndex];
 5         // 将新创建的 Entry 放入 bucketIndex 索引处，并让新的 Entry 指向原来的 Entry  
 6         table[bucketIndex] = new Entry<K, V>(hash, key, value, e);
 7         // 若HashMap中元素的个数超过极限了，则容量扩大两倍 
 8         if (size++ >= threshold)
 9             // 调整容量
10             resize(2 * table.length);
11     }
```



这个方法中有两点需要注意：

一是链的产生：系统总是将新的Entry对象添加到bucketIndex处。如果bucketIndex处已经有了对象，那么新添加的Entry对象将指向原有的Entry对象，形成一条Entry链，但是若bucketIndex处没有Entry对象，也就是e==null,那么新添加的Entry对象指向null，也就不会产生Entry链了。 


二是扩容问题：随着HashMap中元素的数量越来越多，发生碰撞的概率就越来越大，所产生的链表长度就会越来越长，这样势必会影响HashMap的速度，为了保证HashMap的效率，系统必须要在某个临界点进行扩容处理。该临界点在当HashMap中元素的数量等于table数组长度*加载因子。但是扩容是一个非常耗时的过程，因为它需要重新计算这些数据在新table数组中的位置并进行复制处理。所以如果我们已经预知HashMap中元素的个数，那么预设元素的个数能够有效的提高HashMap的性能。

## 6.HashMap的读取实现

通过key的hash值找到在table数组中的索引处的Entry，然后返回该key对应的value即可。



``` java
 1 // 返回指定键所映射的值；如果对于该键来说，此映射不包含任何映射关系，则返回 null
 2     public V get(Object key) {
 3         // 若为null，调用getForNullKey方法返回相对应的value 
 4         if (key == null)
 5             return getForNullKey();
 6         // 根据该 key 的 hashCode 值计算它的 hash 码  
 7         int hash = hash(key.hashCode());
 8         // 取出 table 数组中指定索引处的值
 9         for (Entry<K, V> e = table[indexFor(hash, table.length)]; e != null; e = e.next) {
10             Object k;
11             // 如果hash值相等，并且key相等则证明这个桶里的东西是我们想要的
12             if (e.hash == hash && ((k = e.key) == key || key.equals(k)))
13                 return e.value;
14         }
15         // 所有桶都找遍了，没找到想要的，所以返回null
16         return null;
17     }
```



 

 

在这里能够根据key快速的取到value除了和HashMap的数据结构密不可分外，还和Entry有莫大的关系，在前面就提到过，HashMap在存储过程中并没有将key，value分开来存储，而是当做一个整体key-value来处理的，这个整体就是Entry对象。同时value也只相当于key的附属而已。在存储的过程中，系统根据key的hashcode来决定Entry在table数组中的存储位置，在取的过程中同样根据key的hashcode取出相对应的Entry对象。

## 7.HashMap和多线程相关的问题

HashMap是线程不安全的实现，而HashTable是线程安全的实现。所谓线程不安全，就是在多线程情况下直接使用HashMap会出现一些莫名其妙不可预知的问题，多线程和单线程的区别：单线程只有一条执行路径，而多线程是并发执行(非并行)，会有多条执行路径。如果HashMap是只读的(加载一次，以后只有读取，不会发生结构上的修改)，那使用没有问题。那如果HashMap是可写的(会发生结构上的修改)，则会引发诸多问题，如上面的fail-fast，也可以看下这里，这里就不去研究了。 

那在多线程下使用HashMap我们需要怎么做，几种方案： 
* 1.在外部包装HashMap，实现同步机制 
* 2.使用Map m = Collections.synchronizedMap(new HashMap(…));，这里就是对HashMap做了一次包装 
* 3.使用java.util.HashTable，效率最低 
* 4.使用java.util.concurrent.ConcurrentHashMap，相对安全，效率较高


## 【----------------------------】
## 四、HashMap源码分析

此章节，重点是对HashMap的源码分析。


``` java
  1 package dataStructure.hash;
  2 
  3 import java.io.*;
  4 import java.util.AbstractCollection;
  5 import java.util.AbstractMap;
  6 import java.util.AbstractSet;
  7 import java.util.Collection;
  8 import java.util.ConcurrentModificationException;
  9 import java.util.Iterator;
 10 import java.util.Map;
 11 import java.util.NoSuchElementException;
 12 import java.util.Set;
 13 
 14 public class HashMap<K, V> extends AbstractMap<K, V>implements Map<K, V>, Cloneable, Serializable {
 15 
 16     // 系统默认初始容量，必须是2的n次幂，这是出于优化考虑的
 17     static final int DEFAULT_INITIAL_CAPACITY = 16;
 18 
 19     // 系统默认最大容量
 20     static final int MAXIMUM_CAPACITY = 1 << 30;
 21 
 22     // 系统默认负载因子，可在构造函数中指定
 23     static final float DEFAULT_LOAD_FACTOR = 0.75f;
 24 
 25     // 用于存储的表，长度可以调整，且必须是2的n次幂
 26     transient Entry[] table;
 27 
 28     // 当前map的key-value映射数，也就是当前size
 29     transient int size;
 30 
 31     // 阈值
 32     int threshold;
 33 
 34     // 哈希表的负载因子
 35     final float loadFactor;
 36 
 37     // 用于确保使用迭代器的时候，HashMap并未进行更改
 38     transient volatile int modCount;
 39 
 40     // 构造一个带指定初始容量和加载因子的空 HashMap。
 41     public HashMap(int initialCapacity, float loadFactor) {
 42         // 如果指定初始容量小于0，抛错
 43         if (initialCapacity < 0)
 44             throw new IllegalArgumentException("Illegal initial capacity: " + initialCapacity);
 45         // 如果初始容量大于系统默认最大容量，则初始容量为最大容量
 46         if (initialCapacity > MAXIMUM_CAPACITY)
 47             initialCapacity = MAXIMUM_CAPACITY;
 48         // 如果loadFactor小于0，或loadFactor是NaN，则抛错
 49         if (loadFactor <= 0 || Float.isNaN(loadFactor))
 50             throw new IllegalArgumentException("Illegal load factor: " + loadFactor);
 51 
 52         // 寻找一个2的k次幂capacity恰好大于initialCapacity
 53         int capacity = 1;
 54         while (capacity < initialCapacity)
 55             capacity <<= 1;
 56 
 57         // 设置加载因子
 58         this.loadFactor = loadFactor;
 59         // 设置阈值为capacity * loadFactor，实际上当HashMap当前size到达这个阈值时，HashMap就需要扩大一倍了。
 60         threshold = (int) (capacity * loadFactor);
 61         // 创建一个capacity长度的数组用于保存数据
 62         table = new Entry[capacity];
 63         // 开始初始化
 64         init();
 65     }
 66 
 67     // 构造一个带指定初始容量和默认加载因子 (0.75) 的空 HashMap。
 68     public HashMap(int initialCapacity) {
 69         this(initialCapacity, DEFAULT_LOAD_FACTOR);
 70     }
 71 
 72     // 构造一个具有默认初始容量 (16) 和默认加载因子 (0.75) 的空 HashMap。
 73     public HashMap() {
 74         this.loadFactor = DEFAULT_LOAD_FACTOR;
 75         threshold = (int) (DEFAULT_INITIAL_CAPACITY * DEFAULT_LOAD_FACTOR);
 76         table = new Entry[DEFAULT_INITIAL_CAPACITY];
 77         init();
 78     }
 79 
 80     // 构造一个映射关系与指定 Map 相同的新 HashMap。
 81     public HashMap(Map<? extends K, ? extends V> m) {
 82         this(Math.max((int) (m.size() / DEFAULT_LOAD_FACTOR) + 1, DEFAULT_INITIAL_CAPACITY), DEFAULT_LOAD_FACTOR);
 83         putAllForCreate(m);
 84     }
 85 
 86     // 内部公用工具
 87 
 88     // 定义一个空方法用于未来的子对象扩展，该方法用于初始化之后，插入元素之前
 89     void init() {
 90     }
 91 
 92     // 预处理hash值，避免较差的离散hash序列，导致桶没有充分利用
 93     static int hash(int h) {
 94         h ^= (h >>> 20) ^ (h >>> 12);
 95         return h ^ (h >>> 7) ^ (h >>> 4);
 96     }
 97 
 98     // 返回对应hash值得索引
 99     static int indexFor(int h, int length) {
100         /*****************
101          * 由于length是2的n次幂，所以h & (length-1)相当于h % length。
102          * 对于length，其2进制表示为1000...0，那么length-1为0111...1。
103          * 那么对于任何小于length的数h，该式结果都是其本身h。 对于h = length，该式结果等于0。
104          * 对于大于length的数h，则和0111...1位与运算后， 比0111...1高或者长度相同的位都变成0，
105          * 相当于减去j个length，该式结果是h-j*length， 所以相当于h % length。 其中一个很常用的特例就是h & 1相当于h
106          * % 2。 这也是为什么length只能是2的n次幂的原因，为了优化。
107          */
108         return h & (length - 1);
109     }
110 
111     // 返回当前map的key-value映射数，也就是当前size
112     public int size() {
113         return size;
114     }
115 
116     // 该HashMap是否是空的，如果size为0，则为空
117     public boolean isEmpty() {
118         return size == 0;
119     }
120 
121     // 返回指定键所映射的值；如果对于该键来说，此映射不包含任何映射关系，则返回 null
122     public V get(Object key) {
123         // 若为null，调用getForNullKey方法返回相对应的value 
124         if (key == null)
125             return getForNullKey();
126         // 根据该 key 的 hashCode 值计算它的 hash 码  
127         int hash = hash(key.hashCode());
128         // 取出 table 数组中指定索引处的值
129         for (Entry<K, V> e = table[indexFor(hash, table.length)]; e != null; e = e.next) {
130             Object k;
131             // 如果hash值相等，并且key相等则证明这个桶里的东西是我们想要的
132             if (e.hash == hash && ((k = e.key) == key || key.equals(k)))
133                 return e.value;
134         }
135         // 所有桶都找遍了，没找到想要的，所以返回null
136         return null;
137     }
138 
139     // 如果要得到key为null的值，则通过这个获取
140     private V getForNullKey() {
141         // 遍历table[0]里的所有桶
142         for (Entry<K, V> e = table[0]; e != null; e = e.next) {
143             // 看看桶的key是不是null，是则返回相应值
144             if (e.key == null)
145                 return e.value;
146         }
147         // 没找到返回null
148         return null;
149     }
150 
151     // 如果此映射包含对于指定键的映射关系，则返回true
152     public boolean containsKey(Object key) {
153         return getEntry(key) != null;
154     }
155 
156     // 通过key获取一个value
157     final Entry<K, V> getEntry(Object key) {
158         // 如果key为null，则hash为0，否则用hash函数预处理
159         int hash = (key == null) ? 0 : hash(key.hashCode());
160         // 得到对应的hash值的桶，如果这个桶不是，就通过next获取下一个桶
161         for (Entry<K, V> e = table[indexFor(hash, table.length)]; e != null; e = e.next) {
162             Object k;
163             // 如果hash值相等，并且key相等则证明这个桶里的东西是我们想要的
164             if (e.hash == hash && ((k = e.key) == key || (key != null && key.equals(k))))
165                 return e;
166         }
167         // 所有桶都找遍了，没找到想要的，所以返回null
168         return null;
169     }
170 
171     // 在此映射中关联指定值与指定键。如果该映射以前包含了一个该键的映射关系，则旧值被替换
172     public V put(K key, V value) {
173         // 当key为null，调用putForNullKey方法，保存null与table第一个位置中，这是HashMap允许为null的原因 
174         if (key == null)
175             return putForNullKey(value);
176         // 使用hash函数预处理hashCode，计算key的hash值  
177         int hash = hash(key.hashCode());
178         // 计算key hash 值在 table 数组中的位置 
179         int i = indexFor(hash, table.length);
180         // 从i出开始迭代 e,找到 key 保存的位置
181         for (Entry<K, V> e = table[i]; e != null; e = e.next) {
182             Object k;
183             // 判断该条链上是否有hash值相同的(key相同) 
184             // 若存在相同，则直接覆盖value，返回旧value 
185             if (e.hash == hash && ((k = e.key) == key || key.equals(k))) {
186                 // 旧值 = 新值  
187                 V oldValue = e.value;
188                 // 将要存储的value存进去
189                 e.value = value;
190                 e.recordAccess(this);
191                 // 返回旧的value
192                 return oldValue;
193             }
194         }
195         // 修改次数增加1 
196         modCount++;
197         // 将key、value添加至i位置处 
198         addEntry(hash, key, value, i);
199         return null;
200     }
201 
202     // key为null怎么放value
203     private V putForNullKey(V value) {
204         // 遍历table[0]的所有桶
205         for (Entry<K, V> e = table[0]; e != null; e = e.next) {
206             // 如果key是null
207             if (e.key == null) {
208                 // 取出oldValue，并存入value
209                 V oldValue = e.value;
210                 e.value = value;
211                 e.recordAccess(this);
212                 // 返回oldValue
213                 return oldValue;
214             }
215         }
216         modCount++;
217         addEntry(0, null, value, 0);
218         return null;
219     }
220 
221     // 看看需不需要创建新的桶
222     private void putForCreate(K key, V value) {
223         // 如果key为null，则定义hash为0，否则用hash函数预处理
224         int hash = (key == null) ? 0 : hash(key.hashCode());
225         // 获取对应的索引
226         int i = indexFor(hash, table.length);
227 
228         // 遍历所有桶
229         for (Entry<K, V> e = table[i]; e != null; e = e.next) {
230             Object k;
231             // 如果有hash相同，且key相同，那么则不需要创建新的桶，退出
232             if (e.hash == hash && ((k = e.key) == key || (key != null && key.equals(k)))) {
233                 e.value = value;
234                 return;
235             }
236         }
237 
238         // 否则需要创建新的桶
239         createEntry(hash, key, value, i);
240     }
241 
242     // 根据Map创建所有对应的桶
243     private void putAllForCreate(Map<? extends K, ? extends V> m) {
244         for (Iterator<? extends Map.Entry<? extends K, ? extends V>> i = m.entrySet().iterator(); i.hasNext();) {
245             Map.Entry<? extends K, ? extends V> e = i.next();
246             putForCreate(e.getKey(), e.getValue());
247         }
248     }
249 
250     // 更具新的容量来resize这个HashMap
251     void resize(int newCapacity) {
252         // 保存oldTable
253         Entry[] oldTable = table;
254         // 保存旧的容量
255         int oldCapacity = oldTable.length;
256         // 如果旧的容量已经是系统默认最大容量了，那么将阈值设置成整形的最大值，退出
257         if (oldCapacity == MAXIMUM_CAPACITY) {
258             threshold = Integer.MAX_VALUE;
259             return;
260         }
261 
262         // 根据新的容量新建一个table
263         Entry[] newTable = new Entry[newCapacity];
264         // 将table转换成newTable
265         transfer(newTable);
266         // 将table设置newTable
267         table = newTable;
268         // 设置阈值
269         threshold = (int) (newCapacity * loadFactor);
270     }
271 
272     // 将所有格子里的桶都放到新的table中
273     void transfer(Entry[] newTable) {
274         // 得到旧的table
275         Entry[] src = table;
276         // 得到新的容量
277         int newCapacity = newTable.length;
278         // 遍历src里面的所有格子
279         for (int j = 0; j < src.length; j++) {
280             // 取到格子里的桶（也就是链表）
281             Entry<K, V> e = src[j];
282             // 如果e不为空
283             if (e != null) {
284                 // 将当前格子设成null
285                 src[j] = null;
286                 // 遍历格子的所有桶
287                 do {
288                     // 取出下个桶
289                     Entry<K, V> next = e.next;
290                     // 寻找新的索引
291                     int i = indexFor(e.hash, newCapacity);
292                     // 设置e.next为newTable[i]保存的桶（也就是链表连接上）
293                     e.next = newTable[i];
294                     // 将e设成newTable[i]
295                     newTable[i] = e;
296                     // 设置e为下一个桶
297                     e = next;
298                 } while (e != null);
299             }
300         }
301     }
302 
303     // 将指定映射的所有映射关系复制到此映射中，这些映射关系将替换此映射目前针对指定映射中所有键的所有映射关系
304     public void putAll(Map<? extends K, ? extends V> m) {
305         // 看看需要复制多少个映射关系
306         int numKeysToBeAdded = m.size();
307         if (numKeysToBeAdded == 0)
308             return;
309 
310         // 如果要复制的映射关系比阈值还要多
311         if (numKeysToBeAdded > threshold) {
312             // 重新计算新的容量先resize
313             int targetCapacity = (int) (numKeysToBeAdded / loadFactor + 1);
314             if (targetCapacity > MAXIMUM_CAPACITY)
315                 targetCapacity = MAXIMUM_CAPACITY;
316             int newCapacity = table.length;
317             while (newCapacity < targetCapacity)
318                 newCapacity <<= 1;
319             if (newCapacity > table.length)
320                 resize(newCapacity);
321         }
322 
323         // 迭代将key-value映射放进该HashMap
324         for (Iterator<? extends Map.Entry<? extends K, ? extends V>> i = m.entrySet().iterator(); i.hasNext();) {
325             Map.Entry<? extends K, ? extends V> e = i.next();
326             put(e.getKey(), e.getValue());
327         }
328     }
329 
330     // 从此映射中移除指定键的映射关系（如果存在）
331     public V remove(Object key) {
332         Entry<K, V> e = removeEntryForKey(key);
333         return (e == null ? null : e.value);
334     }
335 
336     // 根据key删除桶，并返回对应value
337     final Entry<K, V> removeEntryForKey(Object key) {
338         int hash = (key == null) ? 0 : hash(key.hashCode());
339         int i = indexFor(hash, table.length);
340         // 找到对应的格子
341         Entry<K, V> prev = table[i];
342         Entry<K, V> e = prev;
343 
344         // 遍历所有桶
345         while (e != null) {
346             Entry<K, V> next = e.next;
347             Object k;
348             // 如果找到对应的桶
349             if (e.hash == hash && ((k = e.key) == key || (key != null && key.equals(k)))) {
350                 modCount++;
351                 // size减1
352                 size--;
353                 // 如果第一个就是要删的桶
354                 if (prev == e)
355                     // 则table[i]等于下一个桶
356                     table[i] = next;
357                 else
358                     // 否则上一个桶的下一个等于下一个桶
359                     prev.next = next;
360                 e.recordRemoval(this);
361                 return e;
362             }
363             prev = e;
364             e = next;
365         }
366 
367         return e;
368     }
369 
370     // 根据桶来删除map里的值
371     final Entry<K, V> removeMapping(Object o) {
372         // 如果o不是Map.Entry的实例，则退出返回null
373         if (!(o instanceof Map.Entry))
374             return null;
375 
376         // 将o转成Map.Entry
377         Map.Entry<K, V> entry = (Map.Entry<K, V>) o;
378         // 得到他的key
379         Object key = entry.getKey();
380         // 得到对应的hash
381         int hash = (key == null) ? 0 : hash(key.hashCode());
382         // 得到对应的索引
383         int i = indexFor(hash, table.length);
384         Entry<K, V> prev = table[i];
385         Entry<K, V> e = prev;
386 
387         // 遍历所有桶
388         while (e != null) {
389             Entry<K, V> next = e.next;
390             // 如果找到对应的桶，则删掉它
391             if (e.hash == hash && e.equals(entry)) {
392                 modCount++;
393                 size--;
394                 if (prev == e)
395                     table[i] = next;
396                 else
397                     prev.next = next;
398                 e.recordRemoval(this);
399                 return e;
400             }
401             prev = e;
402             e = next;
403         }
404 
405         // 并返回该桶
406         return e;
407     }
408 
409     // 从此映射中移除所有映射关系。此调用返回后，映射将为空
410     public void clear() {
411         modCount++;
412         Entry[] tab = table;
413         // 遍历table中的所有格子，然偶后设为null
414         for (int i = 0; i < tab.length; i++)
415             tab[i] = null;
416         // 设置size为0
417         size = 0;
418     }
419 
420     // 如果此映射将一个或多个键映射到指定值，则返回 true
421     public boolean containsValue(Object value) {
422         // 如果value为空，则返回containsNullValue函数的返回值
423         if (value == null)
424             return containsNullValue();
425 
426         Entry[] tab = table;
427         // 遍历table所有格子（链表）
428         for (int i = 0; i < tab.length; i++)
429             // 遍历链表中的每个桶
430             for (Entry e = tab[i]; e != null; e = e.next)
431                 // 如果值相同，则返回true
432                 if (value.equals(e.value))
433                     return true;
434         // 否则返回false
435         return false;
436     }
437 
438     // 对value为null的处理，这里没什么特别的
439     private boolean containsNullValue() {
440         Entry[] tab = table;
441         for (int i = 0; i < tab.length; i++)
442             for (Entry e = tab[i]; e != null; e = e.next)
443                 if (e.value == null)
444                     return true;
445         return false;
446     }
447 
448     // 返回此 HashMap 实例的浅表副本：并不复制键和值本身
449     public Object clone() {
450         HashMap<K, V> result = null;
451         try {
452             result = (HashMap<K, V>) super.clone();
453         } catch (CloneNotSupportedException e) {
454             // assert false;
455         }
456         result.table = new Entry[table.length];
457         result.entrySet = null;
458         result.modCount = 0;
459         result.size = 0;
460         result.init();
461         result.putAllForCreate(this);
462 
463         return result;
464     }
465 
466     // 内置class输入对象，也就是我们说的桶
467     static class Entry<K, V> implements Map.Entry<K, V> {
468         final K key;
469         V value;
470         Entry<K, V> next;
471         final int hash;
472 
473         // 构造函数
474         Entry(int h, K k, V v, Entry<K, V> n) {
475             value = v;
476             next = n;
477             key = k;
478             hash = h;
479         }
480 
481         // 返回key
482         public final K getKey() {
483             return key;
484         }
485 
486         // 返回value
487         public final V getValue() {
488             return value;
489         }
490 
491         // 设置value
492         public final V setValue(V newValue) {
493             V oldValue = value;
494             value = newValue;
495             return oldValue;
496         }
497 
498         // 是否相同
499         public final boolean equals(Object o) {
500             // 如果o不是Map.Entry的实例，那么肯定不相同了
501             if (!(o instanceof Map.Entry))
502                 return false;
503             // 将o转成Map.Entry
504             Map.Entry e = (Map.Entry) o;
505             // 得到key和value对比是否相同，相同则为true
506             Object k1 = getKey();
507             Object k2 = e.getKey();
508             if (k1 == k2 || (k1 != null && k1.equals(k2))) {
509                 Object v1 = getValue();
510                 Object v2 = e.getValue();
511                 if (v1 == v2 || (v1 != null && v1.equals(v2)))
512                     return true;
513             }
514             // 否则为false
515             return false;
516         }
517 
518         // hashCode
519         public final int hashCode() {
520             return (key == null ? 0 : key.hashCode()) ^ (value == null ? 0 : value.hashCode());
521         }
522 
523         // 返回String
524         public final String toString() {
525             return getKey() + "=" + getValue();
526         }
527 
528         // 使用该方法证明该key已经在该map中
529         void recordAccess(HashMap<K, V> m) {
530         }
531 
532         // 该方法记录该key已经被移除了
533         void recordRemoval(HashMap<K, V> m) {
534         }
535     }
536 
537     // 添加一个新的桶来保存该key和value
538     void addEntry(int hash, K key, V value, int bucketIndex) {
539         // 获取bucketIndex处的Entry 
540         Entry<K, V> e = table[bucketIndex];
541         // 将新创建的 Entry 放入 bucketIndex 索引处，并让新的 Entry 指向原来的 Entry  
542         table[bucketIndex] = new Entry<K, V>(hash, key, value, e);
543         // 若HashMap中元素的个数超过极限了，则容量扩大两倍 
544         if (size++ >= threshold)
545             // 调整容量
546             resize(2 * table.length);
547     }
548 
549     // 新建一个桶，该方法不需要判断是否超过阈值
550     void createEntry(int hash, K key, V value, int bucketIndex) {
551         Entry<K, V> e = table[bucketIndex];
552         table[bucketIndex] = new Entry<K, V>(hash, key, value, e);
553         size++;
554     }
555 
556     // 内部class HashIterator迭代器
557     private abstract class HashIterator<E> implements Iterator<E> {
558         Entry<K, V> next; // 下一个桶
559         int expectedModCount; // 保护HashMap没有变更
560         int index; // 当前的索引
561         Entry<K, V> current; // 当前的桶
562 
563         // 构造方法
564         HashIterator() {
565             // 保存modCount，因为如果HashMap进行了任何操作modCount都会增加，所以如果发现modCount变化了，就可以抛出失败
566             expectedModCount = modCount;
567             // 进入第一个桶
568             if (size > 0) {
569                 Entry[] t = table;
570                 while (index < t.length && (next = t[index++]) == null)
571                     ;
572             }
573         }
574 
575         // 看看有没有下一个桶
576         public final boolean hasNext() {
577             return next != null;
578         }
579 
580         // 获取下一个桶
581         final Entry<K, V> nextEntry() {
582             // modCount变化了，抛出失败
583             if (modCount != expectedModCount)
584                 throw new ConcurrentModificationException();
585             // 得到next
586             Entry<K, V> e = next;
587             // 如果next为空，抛出失败
588             if (e == null)
589                 throw new NoSuchElementException();
590 
591             // 如果next.next为空，将next定义为下一个格子中的桶，否则为该格子的下一个桶
592             if ((next = e.next) == null) {
593                 Entry[] t = table;
594                 while (index < t.length && (next = t[index++]) == null)
595                     ;
596             }
597             // 给current赋值
598             current = e;
599             // 返回e
600             return e;
601         }
602 
603         // 删除
604         public void remove() {
605             // 如果当前为空，抛出
606             if (current == null)
607                 throw new IllegalStateException();
608             // modCount变化了，抛出失败
609             if (modCount != expectedModCount)
610                 throw new ConcurrentModificationException();
611             // 获得当前的key
612             Object k = current.key;
613             // 设置current为null
614             current = null;
615             // 删除掉对应key的元素
616             HashMap.this.removeEntryForKey(k);
617             // 重置expectedModCount
618             expectedModCount = modCount;
619         }
620 
621     }
622 
623     // 内部class ValueIterator迭代器，我们可以看到修改了next方法
624     private final class ValueIterator extends HashIterator<V> {
625         public V next() {
626             return nextEntry().value;
627         }
628     }
629 
630     // 内部class KeyIterator迭代器，我们可以看到修改了next方法
631     private final class KeyIterator extends HashIterator<K> {
632         public K next() {
633             return nextEntry().getKey();
634         }
635     }
636 
637     // 内部class EntryIterator迭代器，我们可以看到修改了next方法
638     private final class EntryIterator extends HashIterator<Map.Entry<K, V>> {
639         public Map.Entry<K, V> next() {
640             return nextEntry();
641         }
642     }
643 
644     // 定义对应的 iterator() 方法
645     Iterator<K> newKeyIterator() {
646         return new KeyIterator();
647     }
648 
649     Iterator<V> newValueIterator() {
650         return new ValueIterator();
651     }
652 
653     Iterator<Map.Entry<K, V>> newEntryIterator() {
654         return new EntryIterator();
655     }
656 
657     private transient Set<Map.Entry<K, V>> entrySet = null;
658 
659     /**
660      * 返回此映射中所包含的键的 Set 视图。 该 set 受映射的支持，所以对映射的更改将反映在该 set 中， 反之亦然。如果在对 set
661      * 进行迭代的同时修改了映射（通过迭代器自己的 remove 操作除外）， 则迭代结果是不确定的。该 set 支持元素的移除，通过
662      * Iterator.remove、Set.remove、removeAll、retainAll 和 clear 操作
663      * 可从该映射中移除相应的映射关系。它不支持 add 或 addAll 操作。
664      */
665     public Set<K> keySet() {
666         Set<K> ks = keySet();
667         // 如果keySet为空，则通过新建一个KeySet
668         return (ks != null ? ks : (ks = new KeySet()));
669     }
670 
671     // 内部类KeySet
672     private final class KeySet extends AbstractSet<K> {
673         // 定义iterator方法
674         public Iterator<K> iterator() {
675             return newKeyIterator();
676         }
677 
678         // 定义size
679         public int size() {
680             return size;
681         }
682 
683         // 定义contains
684         public boolean contains(Object o) {
685             return containsKey(o);
686         }
687 
688         // 定义remove
689         public boolean remove(Object o) {
690             return HashMap.this.removeEntryForKey(o) != null;
691         }
692 
693         // 定义clear
694         public void clear() {
695             HashMap.this.clear();
696         }
697     }
698 
699     /**
700      * 返回此映射所包含的值的 Collection 视图。 该 collection 受映射的支持，所以对映射的更改将反映在该 collection
701      * 中， 反之亦然。如果在对 collection 进行迭代的同时修改了映射（通过迭代器自己的 remove 操作除外）， 则迭代结果是不确定的。该
702      * collection 支持元素的移除， 通过
703      * Iterator.remove、Collection.remove、removeAll、retainAll 和 clear 操作
704      * 可从该映射中移除相应的映射关系。它不支持 add 或 addAll 操作。
705      */
706     public Collection<V> values() {
707         Collection<V> vs = values();
708         return (vs != null ? vs : (vs = new Values()));
709     }
710 
711     // 内部类Values
712     private final class Values extends AbstractCollection<V> {
713         public Iterator<V> iterator() {
714             return newValueIterator();
715         }
716 
717         public int size() {
718             return size;
719         }
720 
721         public boolean contains(Object o) {
722             return containsValue(o);
723         }
724 
725         public void clear() {
726             HashMap.this.clear();
727         }
728     }
729 
730     /**
731      * 返回此映射所包含的映射关系的 Set 视图。 该 set 受映射支持，所以对映射的更改将反映在此 set 中， 反之亦然。如果在对 set
732      * 进行迭代的同时修改了映射 （通过迭代器自己的 remove 操作，或者通过在该迭代器返回的映射项上执行 setValue 操作除外），
733      * 则迭代结果是不确定的。该 set 支持元素的移除， 通过
734      * Iterator.remove、Set.remove、removeAll、retainAll 和 clear 操作
735      * 可从该映射中移除相应的映射关系。它不支持 add 或 addAll 操作。
736      */
737     public Set<Map.Entry<K, V>> entrySet() {
738         return entrySet0();
739     }
740 
741     private Set<Map.Entry<K, V>> entrySet0() {
742         Set<Map.Entry<K, V>> es = entrySet;
743         return es != null ? es : (entrySet = new EntrySet());
744     }
745 
746     // 内部类EntrySet
747     private final class EntrySet extends AbstractSet<Map.Entry<K, V>> {
748         public Iterator<Map.Entry<K, V>> iterator() {
749             return newEntryIterator();
750         }
751 
752         public boolean contains(Object o) {
753             if (!(o instanceof Map.Entry))
754                 return false;
755             Map.Entry<K, V> e = (Map.Entry<K, V>) o;
756             Entry<K, V> candidate = getEntry(e.getKey());
757             return candidate != null && candidate.equals(e);
758         }
759 
760         public boolean remove(Object o) {
761             return removeMapping(o) != null;
762         }
763 
764         public int size() {
765             return size;
766         }
767 
768         public void clear() {
769             HashMap.this.clear();
770         }
771     }
772 
773     // 序列化方法
774     private void writeObject(java.io.ObjectOutputStream s) throws IOException {
775         Iterator<Map.Entry<K, V>> i = (size > 0) ? entrySet0().iterator() : null;
776 
777         s.defaultWriteObject();
778 
779         s.writeInt(table.length);
780 
781         s.writeInt(size);
782 
783         if (i != null) {
784             while (i.hasNext()) {
785                 Map.Entry<K, V> e = i.next();
786                 s.writeObject(e.getKey());
787                 s.writeObject(e.getValue());
788             }
789         }
790     }
791 
792     private static final long serialVersionUID = 362498820763181265L;
793 
794     // 通过序列读取对象
795     private void readObject(java.io.ObjectInputStream s) throws IOException, ClassNotFoundException {
796         s.defaultReadObject();
797 
798         int numBuckets = s.readInt();
799         table = new Entry[numBuckets];
800 
801         init();
802 
803         int size = s.readInt();
804 
805         for (int i = 0; i < size; i++) {
806             K key = (K) s.readObject();
807             V value = (V) s.readObject();
808             putForCreate(key, value);
809         }
810     }
811 
812     int capacity() {
813         return table.length;
814     }
815 
816     float loadFactor() {
817         return loadFactor;
818     }
819 }
```

[![复制代码](https://common.cnblogs.com/images/copycode.gif)](javascript:void(0);)


## 参考文章
* https://www.cnblogs.com/midiyu/p/8126237.html
* https://www.cnblogs.com/midiyu/p/8126480.html
* https://www.cnblogs.com/midiyu/p/8127501.html
* https://www.cnblogs.com/midiyu/p/8127506.html