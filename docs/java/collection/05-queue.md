---
title: Java集合类 Queue
---

## Java基础知识篇【集合类 Queue】

::: tip
本文主要是介绍 集合类 Queue,集合Queue中的内容就比较少了。主要是针对队列这种数据结构的使用来介绍Queue中的实现类 。
:::

[[toc]]

Queue用于模拟队列这种数据结构，队列通常是指“先进先出”（FIFO）的容器。新元素插入（offer）到队列的尾部，访问元素（poll）操作会返回队列头部的元素。通常，队列不允许随机访问队列中的元素。



 

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/java/collection/queue-1.png')" alt="wxmp">

 



这种结构就如同我们生活中的排队一样。

下面我们就来介绍Queue中的一个重要的实现类PriorityQueue。

## PriorityQueue

PriorityQueue保存队列元素的顺序不是按加入队列的顺序，而是按队列元素的大小进行重新排序。因此当调用peek()或pool()方法取出队列中头部的元素时，并不是取出最先进入队列的元素，而是取出队列中的最小的元素。

###  PriorityQueue的排序方式

PriorityQueue中的元素可以默认自然排序（也就是数字默认是小的在队列头，字符串则按字典序排列）或者通过提供的Comparator（比较器）在队列实例化时指定的排序方式。关于自然排序与Comparator（比较器）可以参考我在介绍[集合Set](http://www.cnblogs.com/midiyu/p/8135022.html)时的讲解。
**注意：**队列的头是按指定排序方式的最小元素。如果多个元素都是最小值，则头是其中一个元素——选择方法是任意的。

**注意：当PriorityQueue中没有指定Comparator时，加入PriorityQueue的元素必须实现了Comparable接口（即元素是可比较的），否则会导致 ClassCastException。**
下面具体写个例子来展示PriorityQueue中的排序方式：



``` java
 1 PriorityQueue<Integer> qi = new PriorityQueue<Integer>();
 2         qi.add(5);
 3         qi.add(2);
 4         qi.add(1);
 5         qi.add(10);
 6         qi.add(3);
 7         while (!qi.isEmpty()){
 8           System.out.print(qi.poll() + ",");
 9         }
10         System.out.println();
11         //采用降序排列的方式，越小的越排在队尾
12         Comparator<Integer> cmp = new Comparator<Integer>() {
13           public int compare(Integer e1, Integer e2) {
14             return e2 - e1;
15           }
16         };
17         PriorityQueue<Integer> q2 = new PriorityQueue<Integer>(5,cmp);
18         q2.add(2);
19         q2.add(8);
20         q2.add(9);
21         q2.add(1);
22         while (!q2.isEmpty()){
23               System.out.print(q2.poll() + ",");
24             }
```



输出结果：

``` java
1,2,3,5,10,
9,8,2,1,
```

由此可以看出，默认情况下PriorityQueue采用自然排序。指定Comparator的情况下，PriorityQueue采用指定的排序方式。

###  PriorityQueue的方法

PriorityQueue实现了Queue接口，下面列举出PriorityQueue的方法。



 

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/java/collection/queue-2.png')" alt="wxmp">

 

###  PriorityQueue的本质

PriorityQueue 本质也是一个动态数组，在这一方面与ArrayList是一致的。
PriorityQueue调用默认的构造方法时，使用默认的初始容量（**`DEFAULT_INITIAL_CAPACITY=11`**）创建一个 PriorityQueue，并根据其自然顺序来排序其元素（使用加入其中的集合元素实现的Comparable）。

```
1  public PriorityQueue() {
2         this(DEFAULT_INITIAL_CAPACITY, null);
3     }
```

当使用指定容量的构造方法时，使用指定的初始容量创建一个 PriorityQueue，并根据其自然顺序来排序其元素（使用加入其中的集合元素实现的Comparable）。

``` java
1  public PriorityQueue(int initialCapacity) {
2         this(initialCapacity, null);
3     }
```

当使用指定的初始容量创建一个 PriorityQueue，并根据指定的比较器comparator来排序其元素。



``` java
1 public PriorityQueue(int initialCapacity,
2                          Comparator<? super E> comparator) {
3         // Note: This restriction of at least one is not actually needed,
4         // but continues for 1.5 compatibility
5         if (initialCapacity < 1)
6             throw new IllegalArgumentException();
7         this.queue = new Object[initialCapacity];
8         this.comparator = comparator;
9     }
```



**从第三个构造方法可以看出，内部维护了一个动态数组**。当添加元素到集合时，会先检查数组是否还有余量，有余量则把新元素加入集合，没余量则调用 `grow()`方法增加容量，然后调用`siftUp`将新加入的元素排序插入对应位置。



``` java
 1 public boolean offer(E e) {
 2         if (e == null)
 3             throw new NullPointerException();
 4         modCount++;
 5         int i = size;
 6         if (i >= queue.length)
 7             grow(i + 1);
 8         size = i + 1;
 9         if (i == 0)
10             queue[0] = e;
11         else
12             siftUp(i, e);
13         return true;
14     }
```



除此之外，还要注意：
**①PriorityQueue不是线程安全的。**如果多个线程中的任意线程从结构上修改了列表， 则这些线程不应同时访问 PriorityQueue 实例，这时请使用**线程安全的PriorityBlockingQueue 类。**

**②不允许插入 null 元素。**

**③PriorityQueue实现插入方法（offer、poll、remove() 和 add 方法） 的时间复杂度是O(log(n)) ；实现 remove(Object) 和 contains(Object) 方法的时间复杂度是O(n) ；实现检索方法（peek、element 和 size）的时间复杂度是O(1)。**所以在遍历时，若不需要删除元素，则以peek的方式遍历每个元素。

**④方法iterator()中提供的迭代器并不保证以有序的方式遍历优PriorityQueue中的元素。**

## Dueue接口与ArrayDeque实现类

### Dueue接口

Deque接口是Queue接口的子接口，它代表一个双端队列。LinkedList也实现了Deque接口，所以也可以被当作双端队列使用。也可以看到前面对[LinkedList的介绍](https://www.jianshu.com/p/d436b4cf6b94)来理解Deque接口。
因此Deque接口增加了一些关于双端队列操作的方法。



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



 

从上面方法中可以看出，Deque不仅可以当成双端队列使用，而且可以被当成栈来使用，因为该类里还包含了pop(出栈)、push(入栈)两个方法。

###  Deque与Queue、Stack的关系

当 Deque 当做 Queue队列使用时（FIFO），添加元素是添加到队尾，删除时删除的是头部元素。从 Queue 接口继承的方法对应Deque 的方法如图所示：

 

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/java/collection/queue-3.png')" alt="wxmp">

 


Deque 也能当Stack栈用（LIFO）。这时入栈、出栈元素都是在 双端队列的头部 进行。Deque 中和Stack对应的方法如图所示：

 

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/java/collection/queue-4.png')" alt="wxmp">

 


**注意：**Stack过于古老，并且实现地非常不好，因此现在基本已经不用了，可以直接用Deque来代替Stack进行栈操作。

 

### ArrayDeque

顾名思义，就是用数组实现的Deque；既然是底层是数组那肯定也可以指定其capacity，也可以不指定，默认长度是16，然后根据添加的元素的个数，动态扩展。ArrayDeque由于是两端队列，所以其顺序是按照元素插入数组中对应位置产生的（下面会具体说明）。
由于本身数据结构的限制，ArrayDeque没有像ArrayList中的trimToSize方法可以为自己瘦身。ArrayDeque的使用方法就是上面的Deque的使用方法，基本没有对Deque拓展什么方法。

###  ArrayDeque的本质

**循环数组**
ArrayDeque为了满足可以同时在数组两端插入或删除元素的需求，其内部的动态数组还必须是循环的，即循环数组（circular array），也就是说数组的任何一点都可能被看作起点或者终点。
ArrayDeque维护了两个变量，表示ArrayDeque的头和尾

```
 transient int head;
 transient int tail;
```

当向头部插入元素时，head下标减一然后插入元素。而 tail表示的索引为当前末尾元素表示的索引值加一。若当向尾部插入元素时，直接向tail表示的位置插入，然后tail再减一。
具体以下面的图片为例解释。



 

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/java/collection/queue-6.png')" alt="wxmp">

 



在上图中：左边图表示从头部插入了4个元素，尾部插入了2个。初始的时候，head=0,tail=0。当从头部插入元素5，head-1，由于数组是循环数组，则移动到数组的最后位置插入5。当从头部插入元素34，head-1然后再对应位置插入。下面以此类推，最后在头部插入4个元素。当在尾部插入12时，直接在0的位置插入，然后tail=tail+1=1，当从尾部插入7时，直接在1的位置插入，然后tail = tail +1=2。最后队列中的输出顺序是8，3，34，5, 12, 7。
把数组看成一个首尾相接的圆形数组更好理解循环数组的含义。

下面具体看看ArrayDeque怎么把循环数组实际应用的？
`addFirst(E e)`为例来研究


``` java
public void addFirst(E e) {
        if (e == null)
            throw new NullPointerException();
        elements[head = (head - 1) & (elements.length - 1)] = e;
        if (head == tail)
            doubleCapacity();
    }
```




当加入元素时，先看是否为空（**ArrayDeque不可以存取null元素，因为系统根据某个位置是否为null来判断元素的存在**）。然后head-1插入元素。`head = (head - 1) & (elements.length - 1)`很好的解决了下标越界的问题。这段代码相当于取模，同时解决了head为负值的情况。因为elements.length必需是2的指数倍（代码中有具体操作），elements - 1就是二进制低位全1，跟head - 1相与之后就起到了取模的作用。如果head - 1为负数，其实只可能是-1，当为-1时，和elements.length - 1进行与操作，这时结果为elements.length - 1。其他情况则不变，等于它本身。

当插入元素后，在进行判断是否还有余量。因为tail总是指向下一个可插入的空位，也就意味着elements数组至少有一个空位，所以插入元素的时候不用考虑空间问题。

下面再说说扩容函数doubleCapacity()，其逻辑是申请一个更大的数组（原数组的两倍），然后将原数组复制过去。过程如下图所示：



 

![img](https://upload-images.jianshu.io/upload_images/3985563-404dc26d024d7109.png)

 



图中我们看到，复制分两次进行，第一次复制head右边的元素，第二次复制head左边的元素。



``` java
//doubleCapacity()
private void doubleCapacity() {
    assert head == tail;
    int p = head;
    int n = elements.length;
    int r = n - p; // head右边元素的个数
    int newCapacity = n << 1;//原空间的2倍
    if (newCapacity < 0)
        throw new IllegalStateException("Sorry, deque too big");
    Object[] a = new Object[newCapacity];
    System.arraycopy(elements, p, a, 0, r);//复制右半部分，对应上图中绿色部分
    System.arraycopy(elements, 0, a, r, p);//复制左半部分，对应上图中灰色部分
    elements = (E[])a;
    head = 0;
    tail = n;
}
```



由此，我们便理解了ArrayDeque循环数组添加以及扩容的过程，其他操作类似。
**注意：**ArrayDeque不是线程安全的。 当作为栈使用时，性能比Stack好；当作为队列使用时，性能比LinkedList好。




## 参考文章
* https://www.cnblogs.com/midiyu/p/8145503.html