---
title: 源码解析-LinkedList
---

::: tip
本文主要是介绍 源码解析-LinkedList 。
:::

[[toc]]

## **LinkedList源码分析**

LinkedList也和ArrayList一样实现了List接口，但是它执行插入和删除操作时比ArrayList更加高效，因为它是基于链表的。基于链表也决定了它在随机访问方面要比ArrayList逊色一点。除此之外，LinkedList还提供了一些可以使其作为栈、队列、双端队列的方法。这些方法中有些彼此之间只是名称的区别。


## **一、类声明**

```java
public class LinkedList<E> extends AbstractSequentialList<E> implements List<E>, Deque<E>, Cloneable, java.io.Serializable
```

LinkedList继承自AbstractSequenceList、实现了List及Deque接口。其实AbstractSequenceList已经实现了List接口，这里标注出List只是更加清晰而已。AbstractSequenceList提供了List接口的实现以减少实现List接口的复杂度。Deque接口定义了双端队列的操作。

 

## **二、成员变量**

LinkedList中之定义了两个属性以及一个内部类Entry：

```java
// header是链表的头结点了，Entry就是节点对象了
private transient Entry<E> header = new Entry<E>(null, null, null);
private transient int size = 0;// LinkedList对象里面存储的元素个数
```

Entry类及构造方法：



```java
private static class Entry<E> {
    E element;
    Entry<E> next;
    Entry<E> previous;
    Entry(E element, Entry<E> next, Entry<E> previous) {
        this.element = element;
        this.next = next;
        this.previous = previous;
    }
    private Entry<E> entry(int index) {
       if (index < 0 || index >= size)
              throw new IndexOutOfBoundsException("Index: "+index+     ", Size: "+size);
       Entry<E> e = header;
       // 根据这个判断决定从哪个方向遍历这个链表
       if (index < (size >> 1)) {
　　　　　　for (int i = 0; i <= index; i++)
　　　　　　　　e = e.next;
　　　　　　} else {
　　　　　　// 可以通过header节点向前遍历，说明这个一个循环双向链表，header的previous指向链表的最后一个节点，这也验证了构造方法中对于header节点的前后节点均指向自己的解释
　　　　　　　　for (int i = size; i > index; i--)
　　　　　　　　　　e = e.previous;
　　　　　　}
　　　　　return e;
　　}
}
```



 

定义了存储的元素、前一个元素、后一个元素，这就是双向链表的节点的定义，每个节点只知道自己的前一个节点和后一个节点。

 

## **三、构造方法**

LinkedList提供了两个构造方法。

第一个构造方法不接受参数，只是将header节点的前一节点和后一节点都设置为自身（注意，这个是一个双向循环链表，如果不是循环链表，空链表的情况应该是header节点的前一节点和后一节点均为null），这样整个链表其实就只有header一个节点，用于表示一个空的链表。

第二个构造方法接收一个Collection参数c，调用第一个构造方法构造一个空的链表，之后通过addAll将c中的元素全部添加到链表中。



```java
public LinkedList() {
    header.next = header.previous = header;
}
public LinkedList(Collection<? extends E> c) {
    this();
    addAll(c);
}
```



第二种构造方法调用的addAll方法如下：



```java
public boolean addAll(Collection<? extends E> c) {
    return addAll(size, c);
}
// index参数指定collection中插入的第一个元素的位置
public boolean addAll(int index, Collection<? extends E> c) {
    // 插入位置超过了链表的长度或小于0，报IndexOutOfBoundsException异常
    if (index < 0 || index > size)
        throw new IndexOutOfBoundsException("Index: "+index+    ", Size: "+size);
    Object[] a = c.toArray();
    int numNew = a.length;
    // 若需要插入的节点个数为0则返回false，表示没有插入元素
    if (numNew==0)
        return false;
    modCount++;
    // 保存index处的节点。插入位置如果是size，则在头结点前面插入，否则获取index处的节点
    Entry<E> successor = (index==size ? header : entry(index));
    //获取前一个节点，插入时需要修改这个节点的next引用
    Entry<E> predecessor = successor.previous;
    // 按顺序将a数组中的第一个元素插入到index处，将之后的元素插在这个元素后面
    for (int i=0; i<numNew; i++) {
        //插入操作，插入节点并修改指针
        Entry<E> e = new Entry<E>((E)a[i], successor, predecessor);
        // 插入节点后将前一节点的next指向当前节点，相当于修改前一节点的next指针
        predecessor.next = e;
        // 相当于C语言中成功插入元素后将指针向后移动一个位置以实现循环的功能
        predecessor = e;
    }
    // 插入元素前index处的元素链接到插入的Collection的最后一个节点
    successor.previous = predecessor;
    // 修改size
    size += numNew;
    return true;
}
```



构造方法中的调用了addAll(Collection`<? extends E> c`)方法，而在addAll(Collection`<? extends E> c`)方法中仅仅是将size当做index参数调用了addAll(int index,Collection`<? extends E> c`)方法。

 

## **四、成员方法**

### **add方法**

```java
public boolean add(E e) {
    addBefore(e, header);
    return true;
}

//与addAll中的解释是一样的
private Entry<E> addBefore(E e, Entry<E> entry) {
　　
    Entry<E> newEntry = new Entry<E>(e, entry, entry.previous);
    newEntry.previous.next = newEntry;
    newEntry.next.previous = newEntry;
    size++;
    modCount++;
    return newEntry;
}
```



add(E e)方法只是调用了addBefore(E e,Entry`<E>` entry)方法，并且返回true。

addBefore(E e,Entry`<E>` entry)方法是个私有方法，所以无法在外部程序中调用。addBefore(E e,Entry`<E>` entry)先通过Entry的构造方法创建e的节点newEntry（包含了将其下一个节点设置为entry，上一个节点设置为entry.previous的操作，相当于修改newEntry的“指针”），之后修改插入位置后newEntry的前一节点的next引用和后一节点的previous引用，使链表节点间的引用关系保持正确。之后修改和size大小和记录modCount，然后返回新插入的节点。

```java
//在指定位置插入元素
public void add(int index, E element) {
    addBefore(element, (index==size ? header : entry(index)));
}
```

以及在链表头和链表尾插入元素：

```java
public void addFirst(E e) {
    addBefore(e, header.next);
}
public void addLast(E e) {
    addBefore(e, header);
}
```

### get方法



```java
public E element() {
    return getFirst();
}
public E getFirst() {
    if (size==0)
        throw new NoSuchElementException();
    return header.next.element;
}
public E get(int index) {
    return entry(index).element;
}
public E getLast()  {
    if (size==0)
        throw new NoSuchElementException();
    return header.previous.element;
}
```



element()方法调用了getFirst()返回链表的第一个节点的元素。get(int index)方法用于获得指定索引位置的节点的元素。它通过entry(int index)方法获取节点。entry(int index)方法遍历链表并获取节点。getLast()方法和getFirst()方法类似，只是获取的是header节点的前一个节点的元素。因为是循环链表，所以header节点的前一节点就是链表的最后一个节点。

### 添加元素



```java
//先获取指定索引的节点，之后保留原来的元素，然后用element进行替换，之后返回原来的元素。
public E set(int index, E element) {
    Entry<E> e = entry(index);
    E oldVal = e.element;
    e.element = element;
    return oldVal;
}
```





```java
//在链表尾部插入元素。
public boolean offer(E e) {
    return add(e);
}
//在链表开头插入元素
public boolean offerFirst(E e) {
    addFirst(e);
    return true;
}
//在链表末尾插入元素
public boolean offerLast(E e) {
    addLast(e);
    return true;
}
```



peek()，peekFirst()，peekLast()调用了对应的get方法；

poll()，pollFirst()，pollLast()poll相关的方法都是获取并移除某个元素。都是和remove操作相关；

pop()，push(E e) 两个方法对应栈的操作，即弹出一个元素和压入一个元素，仅仅是调用了removeFirst()和addFirst()方法。

### 移除元素

remove相关操作：remove()，remove(int index)，remove(Object o)，removeFirst()，removeLast()，removeFirstOccurrence()，removeLastOccurence()几个remove方法最终都是调用了一个私有方法：remove(Entry`<E>` e)



```java
private E remove(Entry<E> e) {
    if (e == header)
        throw new NoSuchElementException();
    // 保留将被移除的节点e的内容
    E result = e.element;
    // 将前一节点的next引用赋值为e的下一节点
    e.previous.next = e.next;
    // 将e的下一节点的previous赋值为e的上一节点
    e.next.previous = e.previous;
    // 上面两条语句的执行已经导致了无法在链表中访问到e节点，而下面解除了e节点对前后节点的引用
    e.next = e.previous = null;
    // 将被移除的节点的内容设为null
    e.element = null;
    // 修改size大小
    size--;
    modCount++;
    // 返回移除节点e的内容
    return result;
}
```



### 其他方法

### 1）clear方法



```java
public void clear() {
    Entry<E> e = header.next;
    // e可以理解为一个移动的“指针”，因为是循环链表，所以回到header的时候说明已经没有节点了
    while (e != header) {
        // 保留e的下一个节点的引用
        Entry<E> next = e.next;
        // 接触节点e对前后节点的引用
        e.next = e.previous = null;
        // 将节点e的内容置空
        e.element = null;
        // 将e移动到下一个节点
        e = next;
    }
     // 将header构造成一个循环链表，同构造方法构造一个空的LinkedList
    header.next = header.previous = header;
    // 修改size
    size = 0;
    modCount++;
}
```



### 2）contains方法

```java
public boolean contains(Object o) {
    return indexOf(o) != -1;
}
```

### 3）indexof方法



```java
public int indexOf(Object o) {
    int index = 0;
    if (o==null) {
        for (Entry e = header.next; e != header; e = e.next) {
            if (e.element==null)
                return index;
            index++;
        }
    } else {
        for (Entry e = header.next; e != header; e = e.next) {
            if (o.equals(e.element))
                return index;
            index++;
        }
    }
    return -1;
}
```

indexOf(Object o)判断o链表中是否存在节点的element和o相等，若相等则返回该节点在链表中的索引位置，若不存在则放回-1。

contains(Object o)方法通过判断indexOf(Object o)方法返回的值是否是-1来判断链表中是否包含对象o。

### 4）clone方法

调用父类的clone()方法初始化对象链表clone，将clone构造成一个空的双向循环链表，之后将header的下一个节点开始将逐个节点添加到clone中。最后返回克隆的clone对象。

```java
public Object clone() {
    LinkedList<E> clone = null;
    try {
        clone = (LinkedList<E>) super.clone();
    } catch (CloneNotSupportedException e) {
        throw new InternalError();
    }
    clone.header = new Entry<E>(null, null, null);
    clone.header.next = clone.header.previous = clone.header;
    clone.size = 0;
    clone.modCount = 0;
    for (Entry<E> e = header.next; e != header; e = e.next)
        clone.add(e.element);
    return clone;
}
```

### 5）转换成数组

创建大小和LinkedList相等的数组result，遍历链表，将每个节点的元素element复制到数组中，返回数组。



```java
public Object[] toArray() {
    Object[] result = new Object[size];
    int i = 0;
    for (Entry<E> e = header.next; e != header; e = e.next)
        result[i++] = e.element;
    return result;
}

public Object[] toArray() {
    Object[] result = new Object[size];
    int i = 0;
    for (Entry<E> e = header.next; e != header; e = e.next)
        result[i++] = e.element;
    return result;
}

public <T> T[] toArray(T[] a) {
    if (a.length < size)
        a = (T[])java.lang.reflect.Array.newInstance(    a.getClass().getComponentType(), size);
        int i = 0;
        Object[] result = a;
        for (Entry<E> e = header.next; e != header; e = e.next)
            result[i++] = e.element;
        if (a.length > size)
            a[size] = null;
        return a;
}
```
先判断出入的数组a的大小是否足够，若大小不够则拓展。这里用到了发射的方法，重新实例化了一个大小为size的数组。之后将数组a赋值给数组result，遍历链表向result中添加的元素。最后判断数组a的长度是否大于size，若大于则将size位置的内容设置为null。返回a。从代码中可以看出，数组a的length小于等于size时，a中所有元素被覆盖，被拓展来的空间存储的内容都是null；若数组a的length的length大于size，则0至size-1位置的内容被覆盖，size位置的元素被设置为null，size之后的元素不变。

## 参考文章
* https://www.cnblogs.com/winterfells/p/8870401.html