---
title: 线性数据结构-栈与队列
---

::: tip
本文主要是介绍 线性数据结构-栈与队列 。
:::

[[toc]]
## 栈与队列

栈和队列也是比较常见的数据结构，它们是比较特殊的线性表，因为对于栈来说，访问、插入和删除元素只能在栈顶进行，对于队列来说，元素只能从队列尾插入，从队列头访问和删除。

## 栈

### 栈定义
栈是限制插入和删除只能在一个位置上进行的表，该位置是表的末端，叫作栈顶，对栈的基本操作有push(进栈)和pop(出栈)，前者相当于插入，后者相当于删除最后一个元素。栈有时又叫作LIFO(Last In First Out)表，即后进先出。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/algorithm/basic/stackandqueue/2243690-2e9540a7b4b61cbd.png')" alt="wxmp">

### 栈的模型

下面我们看一道经典题目，加深对栈的理解。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/algorithm/basic/stackandqueue/2243690-54461e74300fb358.png')" alt="wxmp">

关于栈的一道经典题目

上图中的答案是C，其中的原理可以好好想一想。

因为栈也是一个表，所以任何实现表的方法都能实现栈。我们打开JDK中的类Stack的源码，可以看到它就是继承类Vector的。当然，Stack是Java2前的容器类，现在我们可以使用LinkedList来进行栈的所有操作。

## 队列
### 队列定义
队列是一种特殊的线性表，特殊之处在于它只允许在表的前端（front）进行删除操作，而在表的后端（rear）进行插入操作，和栈一样，队列是一种操作受限制的线性表。进行插入操作的端称为队尾，进行删除操作的端称为队头。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/algorithm/basic/stackandqueue/2243690-3116f05bb106b789.png')" alt="wxmp">

### 队列示意图

我们可以使用链表来实现队列，下面代码简单展示了利用LinkedList来实现队列类。

- 代码9 简单实现队列类



```cpp
public class MyQueue<E> {

    private LinkedList<E> list = new LinkedList<>();

    // 入队
    public void enqueue(E e) {
        list.addLast(e);
    }

    // 出队
    public E dequeue() {
        return list.removeFirst();
    }
}
```

普通的队列是一种先进先出的数据结构，而优先队列中，元素都被赋予优先级。当访问元素的时候，具有最高优先级的元素最先被删除。优先队列在生活中的应用还是比较多的，比如医院的急症室为病人赋予优先级，具有最高优先级的病人最先得到治疗。在Java集合框架中，类PriorityQueue就是优先队列的实现类，具体大家可以去阅读源码。


## 参考文章
* https://www.jianshu.com/p/230e6fde9c75