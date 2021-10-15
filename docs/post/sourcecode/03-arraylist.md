---
title: 源码解析-ArrayList
---

::: tip
本文主要是介绍 源码解析-ArrayList 。
:::

[[toc]]

## **ArrayList源码分析**

ArrayList就是动态数组，是Array的复杂版本，它提供了动态的增加和减少元素、灵活的设置数组的大小。

 

## **一、类声明**

```java
public class ArrayList<E> extends AbstractList<E>  implements List<E>, RandomAccess, Cloneable, java.io.Serializable
```

1）AbstractList提供了List接口的默认实现。

2）List接口定义了列表必须实现的方法。

3）RandomAccess是一个标记接口，接口内没有定义任何内容。

4）实现了Cloneable接口的类，可以调用Object.clone方法返回该对象的浅拷贝。

5）通过实现 java.io.Serializable 接口以启用其序列化功能。未实现此接口的类将无法使其任何状态序列化或反序列化。序列化接口没有方法或字段，仅用于标识可序列化的语义。

 

## **二、成员变量**

ArrayList定义只定义类两个私有属性：

```java
private transient Object[] elementData;// elementData存储ArrayList内的元素
private int size;// size表示它包含的元素的数量
```

 

## **三、构造方法**

ArrayList提供了三个构造方法：



```java
    //使用提供的initialCapacity来初始化elementData数组的大小
    public ArrayList(int initialCapacity) {
        super();
        if (initialCapacity < 0)
            throw new IllegalArgumentException("Illegal Capacity: "+ initialCapacity);
        this.elementData = new Object[initialCapacity];
    }
    //调用第一个构造方法并传入参数10，即默认elementData数组的大小为10
    public ArrayList() {
        this(10);
    }
    //将提供的集合转成数组返回给elementData
    public ArrayList(Collection<? extends E> c) {
        elementData = c.toArray();
        size = elementData.length;
        if (elementData.getClass() != Object[].class)
            elementData = Arrays.copyOf(elementData, size, Object[].class);
    }
```



 

## **四、成员方法**

### **add方法**

```java
　　//add(E e)是在尾部添加一个元素
    public boolean add(E e) {
        ensureCapacity(size + 1);  
        elementData[size++] = e;
        return true;
    }
```

　　看到add(E e)中先调用了ensureCapacity(size+1)方法，之后将元素的索引赋给elementData[size]，而后size自增。例如初次添加时，size为0，add将elementData[0]赋值为e，然后size设置为1（类似执行以下两条语句elementData[0]=e;size=1）。将元素的索引赋给elementData[size]不是会出现数组越界的情况。



```java
　　public void ensureCapacity(int minCapacity) {
        //每次调用ensureCapacoty方法，modCount的值都将增加，但未必数组结构会改变
        modCount++;
        int oldCapacity = elementData.length;
        if (minCapacity > oldCapacity) {
            Object oldData[] = elementData;
            int newCapacity = (oldCapacity * 3)/2 + 1;
            if (newCapacity < minCapacity)
                newCapacity = minCapacity;
            elementData = Arrays.copyOf(elementData, newCapacity);
        }
    }
```



　　增加modCount之后，判断minCapacity（即size+1）是否大于oldCapacity（即elementData.length）；

　　若大于，则调整容量为max((oldCapacity*3)/2+1,minCapacity)，调整elementData容量为新的容量，扩容是原来的1.5倍加1，并进行数组的复制，即返回一个内容为原数组元素，大小为新容量的数组赋给elementData；否则不做操作；

　　所以调用ensureCapacity至少将elementData的容量增加的1，所以elementData[size]不会出现越界的情况。容量的拓展将导致数组元素的复制，多次拓展容量将执行多次整个数组内容的复制。若提前能大致判断list的长度，调用ensureCapacity调整容量，将有效的提高运行速度。



```java
//add(int index,E element)在指定位置插入元素。
public void add(int index, E element) {
    if (index > size || index < 0)
        throw new IndexOutOfBoundsException("Index: "+index+", Size: "+size);
    ensureCapacity(size+1);  // Increments modCount!!
    System.arraycopy(elementData, index, elementData, index + 1,size - index);
    elementData[index] = element;
    size++;
}
```



　　首先判断指定位置index是否超出elementData的界限，之后调用ensureCapacity调整容量（若容量足够则不会拓展），调用System.arraycopy将elementData从index开始的size-index个元素复制到index+1至size+1的位置（即index开始的元素都向后移动一个位置），然后将index位置的值指向element。



```java
//将一个集合所有内容添加进来
public boolean addAll(Collection<? extends E> c) {
    Object[] a = c.toArray();
    int numNew = a.length;
    ensureCapacity(size + numNew);  // Increments modCount
    System.arraycopy(a, 0, elementData, size, numNew);
    size += numNew;
    return numNew != 0;
}
```



　　先将集合c转换成数组，根据转换后数组的程度和ArrayList的size拓展容量，之后调用System.arraycopy方法复制元素到elementData的尾部，调整size。根据返回的内容分析，只要集合c的大小不为空，即转换后的数组长度不为0则返回true。



```java
//在指定位置将一个集合内容添加进来
public boolean addAll(int index, Collection<? extends E> c) {
    if (index > size || index < 0)
        throw new IndexOutOfBoundsException("Index: " + index + ", Size: " + size);
    Object[] a = c.toArray();
    int numNew = a.length;
    ensureCapacity(size + numNew);  // Increments modCount
    int numMoved = size - index;
    if (numMoved > 0)
        System.arraycopy(elementData, index, elementData, index + numNew, numMoved);
    System.arraycopy(a, 0, elementData, index, numNew);
    size += numNew;
    return numNew != 0;
}
```



　　先判断index是否越界。其他内容与addAll(Collection`<?` extends E> c)基本一致，只是复制的时候先将index开始的元素向后移动X（c转为数组后的长度）个位置（也是一个复制的过程），之后将数组内容复制到elementData的index位置至index+X。

 

- get方法

```java
//获得指定位置的元素
public E get(int index) {
    RangeCheck(index);
    return (E) elementData[index];
}
```

　　需要调用了RangeCheck，就是检查一下是不是超出数组界限了。

```java
private void RangeCheck(int index) {
    if (index >= size)
        throw new IndexOutOfBoundsException("Index: "+index+", Size: "+size);
}
```

- remove方法



```java
//移除指定位置的元素并返回这个元素
public E remove(int index) {
    RangeCheck(index);
    modCount++;
    E oldValue = (E) elementData[index];
    int numMoved = size - index - 1;
    if (numMoved > 0)
        System.arraycopy(elementData, index+1, elementData, index,numMoved);
    elementData[--size] = null; // Let gc do its work
    return oldValue;
}
```



　　首先是检查范围，修改modCount，保留将要被移除的元素，通过数组拷贝的方法，将移除位置之后的元素向前挪动一个位置，将list末尾元素置空（null），返回被移除的元素。



```java
//移除指定元素
public boolean remove(Object o) {
    if (o == null) {
        for (int index = 0; index < size; index++)
            if (elementData[index] == null) {
                fastRemove(index);
                return true;
            }
     } else {
        for (int index = 0; index < size; index++)
            if (o.equals(elementData[index])) {
                fastRemove(index);
                return true;
            }
    }
    return false;
}
```



　　当移除成功后返回true，否则返回false。如果传入的对象是null，就会移除所有的null值，否则就找对对应的对象移除。remove(Object o)中通过遍历element寻找是否存在传入对象，一旦找到就调用fastRemove移除对象。



```java
//移除指定位置的元素但不返回
private void fastRemove(int index) {
    modCount++;
    int numMoved = size - index - 1;
    if (numMoved > 0)
        System.arraycopy(elementData, index+1, elementData, index,numMoved);
        elementData[--size] = null; // Let gc do its work
}
```



　　因为fastRemove跳过了判断边界的处理，因为找到元素就相当于确定了index不会超过边界，而且fastRemove并不返回被移除的元素。



```java
//移除某一个范围内的所有元素
protected void removeRange(int fromIndex, int toIndex) {
    modCount++;
    int numMoved = size - toIndex;
    System.arraycopy(elementData, toIndex, elementData, fromIndex, numMoved);
    int newSize = size - (toIndex-fromIndex);
    while (size != newSize)
        elementData[--size] = null;
}
```



　　执行过程是将elementData从toIndex位置开始的元素向前移动到fromIndex，然后将toIndex位置之后的元素全部置空顺便修改size。

　　这个方法是protected，及受保护的方法。由于ArrayList并没有实现subList(int fromIndex,int toIndex)方法，所以调用的是父类的方法。看到父类AbstractList的subList方法，ArrayList实现了RandomAccess接口，所以返回RandAccessSubList`<E>`(this,fromIndex,toIndex)，而RandAccessSubList只是调用了父类的构造方法SubList，由于subList方法返回的是List`<E>`所以该clear方法将调用AbstractList类的clear()方法其中有removeRange方法，为了避免冗余......所以没对用户开放。

- set方法



```java
//在指定位置替换元素
public E set(int index, E element) {
    RangeCheck(index);
    E oldValue = (E) elementData[index];
    elementData[index] = element;
    return oldValue;
}
```



　　首先检查范围，用新元素替换旧元素并返回旧元素。

- **clear方法**



```java
//清空所有内容
public void clear() {
    modCount++;
    for (int i = 0; i < size; i++)
        elementData[i] = null;
        size = 0;
}
```



　　clear的时候并没有修改elementData的长度，只是将所有元素置为null，size设置为0，

　　这使得确定不再修改list内容之后最好调用trimToSize来释放掉一些空间。

- 其他方法



```java
//返回此 ArrayList 实例的浅表副本。
public Object clone() {
    try {
        ArrayList<E> v = (ArrayList<E>) super.clone();
        v.elementData = Arrays.copyOf(elementData, size);
        v.modCount = 0;
            return v;
    } catch (CloneNotSupportedException e) {
        throw new InternalError();
    }
}
```



　　调用父类的clone方法返回一个对象的副本，将返回对象的elementData数组的内容赋值为原对象elementData数组的内容，将副本的modCount设置为0。　　

 



```java
//查找是否包含指定元素
public boolean contains(Object o) {
    return indexOf(o) >= 0;
}

//查找指定元素的坐标
public int indexOf(Object o) {
    if (o == null) {
        for (int i = 0; i < size; i++)
        if (elementData[i]==null)
            return i;
        } else {
            for (int i = 0; i < size; i++)
            if (o.equals(elementData[i]))
                return i;
        }
    return -1;
}

//查找指定元素最后一次出现的位置
public int lastIndexOf(Object o) {
    if (o == null) {
        for (int i = size-1; i >= 0; i--)
            if (elementData[i]==null)
                return i;
        } else {
            for (int i = size-1; i >= 0; i--)
                if (o.equals(elementData[i]))
                    return i;
        }
        return -1;
}
```



　　通过遍历elementData数组来判断对象是否在list中，若存在，返回index（[0,size-1]），若不存在则返回-1。所以contains方法可以通过indexOf(Object)方法的返回值来判断对象是否被包含在list中。

　　lastIndexOf，采用了从后向前遍历element数组，若遇到Object则返回index值，若没有遇到，返回-1。

 


调用Arrays.copyOf将返回一个数组，数组内容是size个elementData的元素，即拷贝elementData从0至size-1位置的元素到新数组并返回。如果传入数组的长度小于size，返回一个新的数组，大小为size，类型与传入数组相同。所传入数组长度与size相等，则将elementData复制到传入数组中并返回传入的数组。若传入数组长度大于size，除了复制elementData外，还将把返回数组的第size个元素置为空。


```java
public Object[] toArray() {
    return Arrays.copyOf(elementData, size);
}//转换成一个数组形式
public <T> T[] toArray(T[] a) {
    if (a.length < size)
    return (T[]) Arrays.copyOf(elementData, size, a.getClass());
    System.arraycopy(elementData, 0, a, 0, size);
    if (a.length > size)
        a[size] = null;
    return a;
}

//剔除无用的空间
public void trimToSize() {
    modCount++;
    int oldCapacity = elementData.length;
    if (size < oldCapacity) {
        elementData = Arrays.copyOf(elementData, size);
    }
}
```




由于elementData的长度会被拓展，size标记的是其中包含的元素的个数。所以会出现size很小但elementData.length很大的情况，将出现空间的浪费。trimToSize将返回一个新的数组给elementData，元素内容保持不变，length很size相同，节省空间。

## 参考文章
* https://www.cnblogs.com/winterfells/p/8867130.html