---
title: 源码解析-Vector
---

::: tip
本文主要是介绍 源码解析-Vector 。
:::

[[toc]]

## **Vector源码解析**

### 首先说一下Vector和ArrayList的区别：

(1) Vector的所有方法都是有synchronized关键字的，即每一个方法都是同步的，所以在使用起来效率会非常低，但是保证了线程安全；而ArrayList的全部方法都是非同步的，所以相对Vector的效率会更高，所以它是线程不安全的。

 

(2) ArrayList在每次扩容时都是增加当前容量的1.5倍，而Vector在扩容时都是增加当前容量的两倍。

 

不需要考虑线程安全时，Java官方推荐我们使用ArrayList，

如果线程不安全时Java在Collections类中给我们提供了同步ArrayList的方法`public static <T> List<T> synchronizedList(List<T> list)`。它可以帮助我们实现同步ArrayList，但是你通过看synchronizedList的实现就会知道，它其实是创建了一个新的类叫做SynchronizedList，它其实只是对ArrayList的增删改查等常用方法加了synchronized字段，所以它的效率其实和Vector是一样的。

### 一、类声明


```java
public class Vector<E> extends AbstractList<E> implements List<E>, RandomAccess, Cloneable, java.io.Serializable
```

 

除了类名不一样，其他的和ArrayList完全一样：

1）AbstractList提供了List接口的默认实现。

2）List接口定义了列表必须实现的方法。

3）RandomAccess是一个标记接口，接口内没有定义任何内容。

4）实现了Cloneable接口的类，可以调用Object.clone方法返回该对象的浅拷贝。

5）通过实现 java.io.Serializable 接口以启用其序列化功能。未实现此接口的类将无法使其任何状态序列化或反序列化。序列化接口没有方法或字段，仅用于标识可序列化的语义。

 

### 二、成员变量

Vector定义只定义类两个私有属性：

```java
// 保存Vector中数据的数组    
protected Object[] elementData;    
// 实际数据的数量    
protected int elementCount;    
// 容量增长系数    
protected int capacityIncrement; 
```

 

### **三、构造方法**

Vector提供了四个构造方法：



```java
// Vector构造函数。默认容量是10。    
public Vector() {    
    this(10);    
}    
// 指定Vector容量大小的构造函数    
public Vector(int initialCapacity) {    
    this(initialCapacity, 0);    
}    
// 指定Vector"容量大小"和"增长系数"的构造函数    
public Vector(int initialCapacity, int capacityIncrement) {    
    super();    
    if (initialCapacity < 0)    
        throw new IllegalArgumentException("Illegal Capacity: "+    
                                               initialCapacity);    
    // 新建一个数组，数组容量是initialCapacity    
    this.elementData = new Object[initialCapacity];    
    // 设置容量增长系数    
    this.capacityIncrement = capacityIncrement;    
}    
   
// 指定集合的Vector构造函数。    
public Vector(Collection<? extends E> c) {    
    // 获取“集合(c)”的数组，并将其赋值给elementData    
    elementData = c.toArray();    
    // 设置数组长度    
    elementCount = elementData.length;    
    // c.toArray might (incorrectly) not return Object[] (see 6260652)    
    if (elementData.getClass() != Object[].class)    
        elementData = Arrays.copyOf(elementData, elementCount, Object[].class);    
} 
```

### **四、成员方法**

Vector的所有方法都是有synchronized关键字的，其他与ArrayList类似。

## 参考文章
* https://www.cnblogs.com/winterfells/p/8870266.html