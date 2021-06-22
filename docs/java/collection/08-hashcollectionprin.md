---
title: Hash集合原理和总结
---

## Java基础知识篇【Hash集合原理和总结】

::: tip
本文主要是介绍 Hash集合原理和总结 。
:::

[[toc]]



# 一.HashSet原理及实现学习总结

，对于HashSet而言，它是基于HashMap来实现的，底层采用HashMap来保存元素。所以如果对HashMap比较熟悉，那么HashSet的原理应该很好理解!

## 1.HsahSet概述

HashSet实现Set接口，由哈希表（实际上是一个HashMap实例）支持。它不保证set 的迭代顺序；特别是它不保证该顺序恒久不变。此类允许使用null元素。

 

```
1 public class HashSet<E>  
2     extends AbstractSet<E>  
3     implements Set<E>, Cloneable, java.io.Serializable  
```

HashSet继承AbstractSet类，实现Set、Cloneable、Serializable接口。其中AbstractSet提供 Set 接口的骨干实现，从而最大限度地减少了实现此接口所需的工作。Set接口是一种不包括重复元素的Collection，它维持它自己的内部排序，所以随机访问没有任何意义。 
**基本属性：**

 

```
1 // 底层使用HashMap来保存HashSet中所有元素。
2     private transient HashMap<E, Object> map;
3 
4     // 定义一个虚拟的Object对象作为HashMap的value，将此对象定义为static final。
5     private static final Object PRESENT = new Object();
```

**构造函数：** 
从构造函数中可以看出HashSet所有的构造都是构造出一个新的HashMap，其中最后一个构造函数，为包访问权限是不对外公开，仅仅只在使用LinkedHashSet时才会发生作用。

## 2.HsahSet实现

因为HashSet是基于HashMap，所以对于HashSet，其方法的实现过程是非常简单的。 
### 1. iterator() 
iterator()方法 返回对此set中元素进行迭代的迭代器。返回元素的顺序并不是特定的。底层实际调用底层HashMap的keySet来返回所有的key。 可见HashSet中的元素，只是存放在了底层HashMap的key上， value使用一个static final的Object对象标识。

 

```
1 public Iterator<E> iterator() {
2         return map.keySet().iterator();
3     }
```

 

 

### 2.size() 
返回此set中的元素的数量（set的容量）。底层实际调用HashMap的size()方法返回Entry的数量，就得到该Set中元素的个数,即HashMap容器的大小。

```
1 public int size() {
2         return map.size();
3     }
```

### 3.isEmpty() 
isEmpty()判断HashSet()集合是否为空，如果此set不包含任何元素，则返回true。 底层实际调用HashMap的isEmpty()判断该HashSet是否为空。

```
1 public boolean isEmpty() {
2         return map.isEmpty();
3     }
```

### 4.contains(Object o) 
contains()，判断某个元素是否存在于HashSet()中，存在返回true，否则返回false。更加确切的讲应该是要满足这种关系才能返回true：(o==null ? e==null : o.equals(e))。底层调用containsKey判断HashMap的key值是否为空。

```
1 public boolean contains(Object o) {
2         return map.containsKey(o);
3     }
```

### 5.add() 
add()如果此 set 中尚未包含指定元素，则添加指定元素。如果此Set没有包含满足(e==null ? e2==null : e.equals(e2)) 的e2时，则将e2添加到Set中，否则不添加且返回false。由于底层使用HashMap的put方法将key = e，value=PRESENT构建成key-value键值对，当此e存在于HashMap的key中，则value将会覆盖原有value，但是key保持不变，所以如果将一个已经存在的e元素添加中HashSet中，新添加的元素是不会保存到HashMap中，所以这就满足了HashSet中元素不会重复的特性。

```
1 public boolean add(E e) {
2         return map.put(e, PRESENT) == null;
3     }
```

### 6.remove() 
remove()如果指定元素存在于此 set 中，则将其移除。底层使用HashMap的remove方法删除指定的Entry。

```
1 public boolean remove(Object o) {
2         return map.remove(o) == PRESENT;
3     }
```

### 7.clear() 
clear()从此 set 中移除所有元素。底层调用HashMap的clear方法清除所有的Entry。

```
1 public void clear() {
2         map.clear();
3     }
```

### 8.clone() 
底层实际调用HashMap的clone()方法，获取HashMap的浅表副本,并没有复制这些元素本身。



```
1 public Object clone() {
2         try {
3             HashSet<E> newSet = (HashSet<E>) super.clone();
4             newSet.map = (HashMap<E, Object>) map.clone();
5             return newSet;
6         } catch (CloneNotSupportedException e) {
7             throw new InternalError();
8         }
9     }
```



## 【----------------------------】
## 二.HashTable原理及实现学习总结

有两个类都提供了一个多种用途的hashTable机制，他们都可以将可以key和value结合起来构成键值对通过put(key,value)方法保存起来，然后通过get(key)方法获取相对应的value值。一个是前面提到的HashMap，还有一个就是马上要讲解的HashTable。对于HashTable而言，它在很大程度上和HashMap的实现差不多，如果我们对HashMap比较了解的话，对HashTable的认知会提高很大的帮助。他们两者之间只存在几点的不同，这个后面会阐述。


## 1、定义

​    HashTable在Java中的定义如下：

``` java
1 public class Hashtable<K,V>  
2     extends Dictionary<K,V>  
3     implements Map<K,V>, Cloneable, java.io.Serializable  
```

从中可以看出HashTable继承Dictionary类，实现Map接口。其中Dictionary类是任何可将键映射到相应值的类（如 `Hashtable`）的抽象父类。每个键和每个值都是一个对象。在任何一个 `Dictionary` 对象中，每个键至多与一个值相关联。Map是"key-value键值对"接口。

​    HashTable采用"拉链法"实现哈希表，它定义了几个重要的参数：table、count、threshold、loadFactor、modCount。

​    table：为一个Entry[]数组类型，Entry代表了“拉链”的节点，每一个Entry代表了一个键值对，哈希表的"key-value键值对"都是存储在Entry数组中的。

​    count：HashTable的大小，注意这个大小并不是HashTable的容器大小，而是他所包含Entry键值对的数量。

​    threshold：Hashtable的阈值，用于判断是否需要调整Hashtable的容量。threshold的值="容量*加载因子"。

​    loadFactor：加载因子。

​    modCount：用来实现“fail-fast”机制的（也就是快速失败）。所谓**快速失败**就是在并发集合中，其进行迭代操作时，若有其他线程对其进行结构性的修改，这时迭代器会立马感知到，并且立即抛出ConcurrentModificationException异常，而不是等到迭代完成之后才告诉你（你已经出错了）。

##  2、构造方法

​    在HashTabel中存在5个构造函数。通过这5个构造函数我们构建出一个我想要的HashTable。

``` java
1 public Hashtable() {  
2         this(11, 0.75f);  
3     }  
```

默认构造函数，容量为11，加载因子为0.75。

``` java
1 public Hashtable(int initialCapacity) {  
2         this(initialCapacity, 0.75f);  
3     }  
```

 用指定初始容量和默认的加载因子 (0.75) 构造一个新的空哈希表。



``` java
 1 public Hashtable(int initialCapacity, float loadFactor) {  
 2         //验证初始容量  
 3         if (initialCapacity < 0)  
 4             throw new IllegalArgumentException("Illegal Capacity: "+  
 5                                                initialCapacity);  
 6         //验证加载因子  
 7         if (loadFactor <= 0 || Float.isNaN(loadFactor))  
 8             throw new IllegalArgumentException("Illegal Load: "+loadFactor);  
 9   
10         if (initialCapacity==0)  
11             initialCapacity = 1;  
12           
13         this.loadFactor = loadFactor;  
14           
15         //初始化table，获得大小为initialCapacity的table数组  
16         table = new Entry[initialCapacity];  
17         //计算阀值  
18         threshold = (int)Math.min(initialCapacity * loadFactor, MAX_ARRAY_SIZE + 1);  
19         //初始化HashSeed值  
20         initHashSeedAsNeeded(initialCapacity);  
21     }  
```



用指定初始容量和指定加载因子构造一个新的空哈希表。其中initHashSeedAsNeeded方法用于初始化hashSeed参数，其中hashSeed用于计算key的hash值，它与key的hashCode进行**按位异或**运算。这个hashSeed是一个与实例相关的随机值，主要用于解决hash冲突。

``` java
1 private int hash(Object k) {  
2         return hashSeed ^ k.hashCode();  
3     }  
```

 构造一个与给定的 Map 具有相同映射关系的新哈希表。

``` java
1 public Hashtable(Map<? extends K, ? extends V> t) {  
2         //设置table容器大小，其值==t.size * 2 + 1  
3         this(Math.max(2*t.size(), 11), 0.75f);  
4         putAll(t);  
5     }  
```

## 3、主要方法

​    HashTable的API对外提供了许多方法，这些方法能够很好帮助我们操作HashTable，但是这里我只介绍两个最根本的方法：put、get。

​    首先我们先看put方法：将指定 `key` 映射到此哈希表中的指定 `value`。**注意这里键key和值value都不可为空。**



``` java
 1 public synchronized V put(K key, V value) {  
 2         // 确保value不为null  
 3         if (value == null) {  
 4             throw new NullPointerException();  //空指针异常
 5         }  
 6   
 7         /* 
 8          * 确保key在table[]是不重复的 
 9          * 处理过程： 
10          * 1、计算key的hash值，确认在table[]中的索引位置 
11          * 2、迭代index索引位置，如果该位置处的链表中存在一个一样的key，则替换其value，返回旧值 
12          */  
13         Entry tab[] = table;  
14         int hash = hash(key);    //计算key的hash值  
15         int index = (hash & 0x7FFFFFFF) % tab.length;     //确认该key的索引位置  
16         //迭代，寻找该key，替换  
17         for (Entry<K,V> e = tab[index] ; e != null ; e = e.next) {  
18             if ((e.hash == hash) && e.key.equals(key)) {  
19                 V old = e.value;  
20                 e.value = value;  
21                 return old;  
22             }  
23         }  
24   
25         modCount++;  
26         if (count >= threshold) {  //如果容器中的元素数量已经达到阀值，则进行扩容操作  
27             rehash();  
28             tab = table;  
29             hash = hash(key);  
30             index = (hash & 0x7FFFFFFF) % tab.length;  
31         }  
32   
33         // 在索引位置处插入一个新的节点  
34         Entry<K,V> e = tab[index];  
35         tab[index] = new Entry<>(hash, key, value, e);  
36         //容器中元素+1  
37         count++;  
38         return null;  
39     }  
```



put方法的整个处理流程是：计算key的hash值，根据hash值获得key在table数组中的索引位置，然后迭代该key处的Entry链表（我们暂且理解为链表），若该链表中存在一个这个的key对象，那么就直接替换其value值即可，否则在将改key-value节点插入该index索引位置处。如下：

​    首先我们假设一个容量为5的table，存在8、10、13、16、17、21。他们在table中位置如下：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/java/collection/hashc-1.jpg')" alt="wxmp">


然后我们插入一个数：put(16,22)，key=16在table的索引位置为1，同时在1索引位置有两个数，程序对该“链表”进行迭代，发现存在一个key=16,这时要做的工作就是用newValue=22替换oldValue16，并将oldValue=16返回。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/java/collection/hashc-2.jpg')" alt="wxmp">


 在put(33,33)，key=33所在的索引位置为3，并且在该链表中也没有存在某个key=33的节点，所以就将该节点插入该链表的第一个位置。

 

 在HashTabled的put方法中有两个地方需要注意：

​    **1、**HashTable的扩容操作，在put方法中，如果需要向table[]中添加Entry元素，会首先进行容量校验，如果容量已经达到了阀值，HashTable就会进行扩容处理rehash()，如下:



``` java
 1 protected void rehash() {  
 2         int oldCapacity = table.length;  
 3         //元素  
 4         Entry<K,V>[] oldMap = table;  
 5   
 6         //新容量=旧容量 * 2 + 1  
 7         int newCapacity = (oldCapacity << 1) + 1;  
 8         if (newCapacity - MAX_ARRAY_SIZE > 0) {  
 9             if (oldCapacity == MAX_ARRAY_SIZE)  
10                 return;  
11             newCapacity = MAX_ARRAY_SIZE;  
12         }  
13           
14         //新建一个size = newCapacity 的HashTable  
15         Entry<K,V>[] newMap = new Entry[];  
16   
17         modCount++;  
18         //重新计算阀值  
19         threshold = (int)Math.min(newCapacity * loadFactor, MAX_ARRAY_SIZE + 1);  
20         //重新计算hashSeed  
21         boolean rehash = initHashSeedAsNeeded(newCapacity);  
22   
23         table = newMap;  
24         //将原来的元素拷贝到新的HashTable中  
25         for (int i = oldCapacity ; i-- > 0 ;) {  
26             for (Entry<K,V> old = oldMap[i] ; old != null ; ) {  
27                 Entry<K,V> e = old;  
28                 old = old.next;  
29   
30                 if (rehash) {  
31                     e.hash = hash(e.key);  
32                 }  
33                 int index = (e.hash & 0x7FFFFFFF) % newCapacity;  
34                 e.next = newMap[index];  
35                 newMap[index] = e;  
36             }  
37         }  
38     }  
```



  在这个rehash()方法中我们可以看到容量扩大两倍+1，同时需要将原来HashTable中的元素一一复制到新的HashTable中，这个过程是比较消耗时间的，同时还需要重新计算hashSeed的，毕竟容量已经变了。这里对阀值啰嗦一下：比如初始值11、加载因子默认0.75，那么这个时候阀值threshold=8，当容器中的元素达到8时，HashTable进行一次扩容操作，容量 = 11 * 2 + 1 =23，而阀值threshold=23*0.75 = 17，当容器元素再一次达到阀值时，HashTable还会进行扩容操作，一次类推。

​    **2、**其实这里是我的一个疑问，在计算索引位置index时，HashTable进行了一个与运算过程（hash & 0x7FFFFFFF）。下面是计算key的hash值，这里hashSeed发挥了作用。

``` java
1 private int hash(Object k) {  2         return hashSeed ^ k.hashCode();  3     }  
```

 相对于put方法，get方法就会比较简单，处理过程就是计算key的hash值，判断在table数组中的索引位置，然后迭代链表，匹配直到找到相对应key的value,若没有找到返回null。



``` java
 1 public synchronized V get(Object key) {  
 2         Entry tab[] = table;  
 3         int hash = hash(key);  
 4         int index = (hash & 0x7FFFFFFF) % tab.length;  
 5         for (Entry<K,V> e = tab[index] ; e != null ; e = e.next) {  
 6             if ((e.hash == hash) && e.key.equals(key)) {  
 7                 return e.value;  
 8             }  
 9         }  
10         return null;  
11     }  
```



## 4、HashTable与HashMap的区别

​    HashTable和HashMap存在很多的相同点，但是他们还是有几个比较重要的不同点。

​    **第一：**我们从他们的定义就可以看出他们的不同，HashTable基于Dictionary类，而HashMap是基于AbstractMap。Dictionary是什么？它是任何可将键映射到相应值的类的抽象父类，而AbstractMap是基于Map接口的骨干实现，它以最大限度地减少实现此接口所需的工作。

​    **第二：**HashMap可以允许存在一个为null的key和任意个为null的value，但是HashTable中的key和value都不允许为null。如下：

​    当HashMap遇到为null的key时，它会调用putForNullKey方法来进行处理。对于value没有进行任何处理，只要是对象都可以。

``` java
1 if (key == null)  
2             return putForNullKey(value);  
```

 而当HashTable遇到null时，他会直接抛出NullPointerException异常信息。

``` java
1 if (value == null) {  
2             throw new NullPointerException();  
3         }  
```

 **第三：**Hashtable的方法是同步的，而HashMap的方法不是。所以有人一般都建议如果是涉及到多线程同步时采用HashTable，没有涉及就采用HashMap，但是在Collections类中存在一个静态方法：synchronizedMap()，该方法创建了一个线程安全的Map对象，并把它作为一个封装的对象来返回，所以通过Collections类的synchronizedMap方法是可以同步访问潜在的HashMap。

## 【----------------------------】
## 三.HashMap HashTable HashSet区别剖析总结

 HashMap、HashSet、HashTable之间的区别是Java程序员的一个常见面试题目，并深入源代码进行分析：

在分析之前，先将其区别列于下面：
## 1、HashMap、HashSet、HashTable之间的区别
 
* 1. 1、HashSet底层采用的是HashMap进行实现的，但是没有key-value，只有HashMap的key set的视图，HashSet不容许重复的对象
* 2. Hashtable是基于Dictionary类的，而HashMap是基于Map接口的一个实现
* 3. Hashtable里默认的方法是同步的，而HashMap则是非同步的，因此Hashtable是多线程安全的
* 4. HashMap可以将空值作为一个表的条目的key或者value,HashMap中由于键不能重复，因此只有一条记录的Key可以是空值，而value可以有多个为空，但HashTable不允许null值(键与值均不行)
* 5. 内存初始大小不同，HashTable初始大小是11，而HashMap初始大小是16
* 6. 内存扩容时采取的方式也不同，Hashtable采用的是2*old+1,而HashMap是2*old。
* 7. 哈希值的计算方法不同，Hashtable直接使用的是对象的hashCode,而HashMap则是在对象的hashCode的基础上还进行了一些变化

 

源代码分析：

**对于区别1，看下面的源码**


``` java
 1 //HashSet类的部份源代码  
 2 public class HashSet<E>  
 3     extends AbstractSet<E>  
 4     implements Set<E>, Cloneable, java.io.Serializable  
 5 {   //用于类的序列化，可以不用管它  
 6     static final long serialVersionUID = -5024744406713321676L;  
 7     //从这里可以看出HashSet类里面真的是采用HashMap来实现的  
 8     private transient HashMap<E,Object> map;  
 9   
10     // Dummy value to associate with an Object in the backing Map  
11     //这里是生成一个对象，生成这个对象的作用是将每一个键的值均关联于此对象，以满足HashMap的键值对  
12     private static final Object PRESENT = new Object();  
13   
14     /** 
15      * Constructs a new, empty set; the backing <tt>HashMap</tt> instance has 
16      * default initial capacity (16) and load factor (0.75). 
17      */  
18     //这里是一个构造函数，开构生成一个HashMap对象，用来存放数据  
19     public HashSet() {  
20     map = new HashMap<E,Object>();  
21     }  
```



 

从上面的代码中得出的结论是HashSet的确是采用HashMap来实现的，而且每一个键都关键同一个Object类的对象，因此键所关联的值没有意义，真正有意义的是键。而HashMap里的键是不允许重复的，因此1也就很容易明白了。

 

**对于区别2，继续看源代码如下**

``` java
1 //从这里可以看得出Hashtable是继承于Dictionary,实现了Map接口  
2 public class Hashtable<K,V>  
3     extends Dictionary<K,V>  
4     implements Map<K,V>, Cloneable, java.io.Serializable {  
1 //这里可以看出的是HashMap是继承于AbstractMap类，实现了Map接口  
2 //因此与Hashtable继承的父类不同  
3 public class HashMap<K,V>  
4     extends AbstractMap<K,V>  
5     implements Map<K,V>, Cloneable, Serializable  
```

**区别3，找一个具有针对性的方法看看，这个方法就是put**



``` java
 1 //Hashtable里的向集体增加键值对的方法，从这里可以明显看到的是  
 2 //采用了synchronized关键字，这个关键字的作用就是用于线程的同步操作  
 3 //因此下面这个方法对于多线程来说是安全的，但这会影响效率     
 4 public synchronized V put(K key, V value) {  
 5     // Make sure the value is not null  
 6     //如果值为空的，则会抛出异常  
 7     if (value == null) {  
 8         throw new NullPointerException();  
 9     }  
10   
11     // Makes sure the key is not already in the hashtable.  
12     Entry tab[] = table;  
13     //获得键值的hashCode,从这里也可以看得出key!=null,否则的话会抛出异常的呦  
14     int hash = key.hashCode();  
15     //获取键据所在的哈希表的位置  
16     int index = (hash & 0x7FFFFFFF) % tab.length;  
17     //从下面这个循环中可以看出的是，内部实现采用了链表，即桶状结构  
18     for (Entry<K,V> e = tab[index] ; e != null ; e = e.next) {  
19         //如果向Hashtable中增加同一个元素时，则会重新更新元素的值   
20         if ((e.hash == hash) && e.key.equals(key)) {  
21                 V old = e.value;  
22                 e.value = value;  
23                 return old;  
24         }  
25     }  
26     //后面的暂时不用管它，大概的意思就是内存的个数少于某个阀值时，进行重新分配内存  
27     modCount++;  
28     if (count >= threshold) {  
29         // Rehash the table if the threshold is exceeded  
30         rehash();  
31   
32             tab = table;  
33             index = (hash & 0x7FFFFFFF) % tab.length;  
34     }  
```





``` java
 1 //HashMap中的实现则相对来说要简单的很多了，如下代码  
 2 //这里的代码中没有synchronize关键字，即可以看出，这个关键函数不是线程安全的  
 3     public V put(K key, V value) {  
 4     //对于键是空时，将向Map中放值一个null-value构成的键值对  
 5     //对值却没有进行判空处理，意味着可以有多个具有键，键所对应的值却为空的元素。  
 6         if (key == null)  
 7             return putForNullKey(value);  
 8     //算出键所在的哈希表的位置  
 9         int hash = hash(key.hashCode());  
10         int i = indexFor(hash, table.length);  
11     //同样从这里可以看得出来的是采用的是链表结构，采用的是桶状  
12         for (Entry<K,V> e = table[i]; e != null; e = e.next) {  
13             Object k;  
14             //对于向集体中增加具有相同键的情况时，这里可以看出，并不增加进去，而是进行更新操作  
15             if (e.hash == hash && ((k = e.key) == key || key.equals(k))) {  
16                 V oldValue = e.value;  
17                 e.value = value;  
18                 e.recordAccess(this);  
19                 return oldValue;  
20             }  
21         }  
22         //开始增加元素  
23         modCount++;  
24         addEntry(hash, key, value, i);  
25         return null;  
26     }  
```



**区别4在上面的代码中，已经分析了，可以再细看一下**

 

**区别5内存初化大小不同，看看两者的源代码：**

``` java
1  public Hashtable() {  
2    //从这里可以看出，默认的初始化大小11，这里的11并不是11个字节，而是11个Entry,这个Entry是  
3    //实现链表的关键结构  
4    //这里的0.75代表的是装载因子  
5 this(11, 0.75f);  
6  }  
```

 



``` java
 1 //这里均是一些定义  
 2  public HashMap() {  
 3  //这个默认的装载因子也是0.75  
 4      this.loadFactor = DEFAULT_LOAD_FACTOR;  
 5  //默认的痤为0.75*16  
 6      threshold = (int)(DEFAULT_INITIAL_CAPACITY * DEFAULT_LOAD_FACTOR);  
 7  //这里开始是默认的初始化大小，这里大小是16  
 8      table = new Entry[DEFAULT_INITIAL_CAPACITY];  
 9      init();  
10  }  
```



从上面的代码中，可以看出的是两者的默认大小是不同的，一个是11，一个是16

 

**区别6内存的扩容方式，**看一看源代码也是很清楚的，其实区别是不大的，一个是2*oldCapacity+1, 一个是2*oldCapacity,你说大吗:）



``` java
 1 //Hashtable中调整内存的函数，这个函数没有synchronize关键字，但是protected呦  
 2 protected void rehash() {  
 3     //获取原来的表大小  
 4     int oldCapacity = table.length;  
 5     Entry[] oldMap = table;  
 6   //设置新的大小为2*oldCapacity+1  
 7     int newCapacity = oldCapacity * 2 + 1;  
 8     //开设空间  
 9     Entry[] newMap = new Entry[newCapacity];  
10   //以下就不用管了。。。  
11     modCount++;  
12     threshold = (int)(newCapacity * loadFactor);  
13     table = newMap;  
14   
15     for (int i = oldCapacity ; i-- > 0 ;) {  
16         for (Entry<K,V> old = oldMap[i] ; old != null ; ) {  
17         Entry<K,V> e = old;  
18         old = old.next;  
19   
20         int index = (e.hash & 0x7FFFFFFF) % newCapacity;  
21         e.next = newMap[index];  
22         newMap[index] = e;  
23         }  
24     }  
25     }  
```





``` java
1 //HashMap中要简单的多了，看看就知道了  
2 void addEntry(int hash, K key, V value, int bucketIndex) {  
3 Entry<K,V> e = table[bucketIndex];  
4        table[bucketIndex] = new Entry<K,V>(hash, key, value, e);  
5        //如果超过了阀值  
6        if (size++ >= threshold)  
7        //就将大小设置为原来的2倍  
8            resize(2 * table.length);  
9    }  
```



 

**对于区别7的哈希值计算方法的不同：**

``` java
1 //Hashtable中可以看出的是直接采用关键字的hashcode作为哈希值  
2 int hash = key.hashCode();  
3 //然后进行模运算，求出所在哗然表的位置   
4 int index = (hash & 0x7FFFFFFF) % tab.length;  
1 //HashMap中的实现  
2 //这两行代码的意思是先计算hashcode,然后再求其在哈希表的相应位置        
3 int hash = hash(key.hashCode());  
4 int i = indexFor(hash, table.length);  
```

上面的HashMap中可以看出关键在两个函数hash与indexFor

 

源码如下:



``` java
1 static int hash(int h) {  
2     // This function ensures that hashCodes that differ only by  
3     // constant multiples at each bit position have a bounded  
4     // number of collisions (approximately 8 at default load factor).  
5     //这个我就不多说了，>>>这个是无符号右移运算符，可以理解为无符号整型  
6     h ^= (h >>> 20) ^ (h >>> 12);  
7     return h ^ (h >>> 7) ^ (h >>> 4);  
8 }  
```



``` java
1 //求位于哈希表中的位置  
2  static int indexFor(int h, int length) {  
3      return h & (length-1);  
```




## 参考文章
* https://www.cnblogs.com/midiyu/p/8127562.html
* https://www.cnblogs.com/midiyu/p/8127608.html
* https://www.cnblogs.com/midiyu/p/8127648.html