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







## 参考文章
* https://www.cnblogs.com/midiyu/p/8126237.html
* https://www.cnblogs.com/midiyu/p/8126480.html
* https://www.cnblogs.com/midiyu/p/8127501.html
* https://www.cnblogs.com/midiyu/p/8127506.html