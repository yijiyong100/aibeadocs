---
title: 并发编程-线程创建
---


::: tip
本文主要是介绍 常见线程的创建方式 。
:::

[[toc]]

## **一、线程实现方式**

 

线程实现有两种方式：继承Thread类，实现Runnable接口

### **1、继承Thread类**


``` java
1. **public** **class** MyThread **extends** Thread{ 
2.  
3.   @Override 
4.   **public** **void** run() { 
5. ​    System.out.println("Mythread执行"); 
6.   } 
7.  
8. } 



1. **public** **class** TestMain { 
2.   **public** **static** **void** main(String[] args) { 
3. ​    MyThread mythread = **new** MyThread(); 
4. ​    mythread.start(); 
5.   } 
6. } 
```

要点：继承Thread类，重写run方法，在run方法内编写代码实现业务。通过Thread实例的start方法启动多线程。

 

### **2、实现Runnable接口**


``` java
1. **public** **class** MyRunnable **implements** Runnable{ 
2.  
3.   @Override 
4.   **public** **void** run() { 
5. ​    System.out.println("MyRunnable执行"); 
6.   } 
7. } 



1. **public** **class** TestMain { 
2.   **public** **static** **void** main(String[] args) { 
3. ​    Thread thread = **new** Thread(**new** MyRunnable()); 
4. ​    thread.start(); 
5.   } 
6. } 
```

要点：实现Runnable接口，实现run方法，在run方法内编写代码实现业务。通过Thread(new Runnable实现类)构造函数，构造Thread，通过Thread实例的start方法启动多线程。

 

## **二、Thread 和 Runnable 的不同点**

Runnable是接口；

Thread 是类，Thread本身是实现了Runnable接口的类；

我们知道“一个类只能有一个父类，但是却能实现多个接口”，因此Runnable具有更好的扩展性。

此外，Runnable还可以用于“资源的共享”。即，多个线程都是基于某一个Runnable对象建立的，它们会共享Runnable对象上的资源。

通常，建议通过“Runnable”实现多线程！

 

 

## **三、为什么线程通过start启动，而不是run方法启动**

 

查看Thread源码中的start方法

 

``` java

1. **public** **synchronized** **void** start() { 
2.   //如果线程不是"就绪状态"，则抛出异常！ 
3.   **if** (threadStatus != 0) 
4. ​    **throw** **new** IllegalThreadStateException(); 
5.  
6.   //将线程添加到ThreadGroup中 
7.   group.add(**this**); 
8.  
9.   **boolean** started = **false**; 
10.   **try** { 
11. ​    // 通过start0()启动线程 
12. ​    start0(); 
13. ​     // 设置started标记 
14. ​    started = **true**; 
15.   } **finally** { 
16. ​    **try** { 
17. ​      **if** (!started) { 
18. ​        group.threadStartFailed(**this**); 
19. ​      } 
20. ​    } **catch** (Throwable ignore) {   
21. ​    } 
22.   } 
23. } 
```

 Thread调用start方法时，会启动start0()方法，而start0()是一个native方法，此时然后java虚拟机则会调用run方法，启动另外一个线程，

 

而当前start方法继续执行，这时有两个线程同时运行，当start()方法执行完成之后，线程start方法执行结束，该线程不可以重新启动。


``` java
1. **public** **void** run() { 
2.   **if** (target != **null**) { 
3. ​    target.run(); 
4.   } 
5. } 

```

 

继续看run方法，如果是线程本身是通过实现Runnable接口构建的，那么调用Runnable的run方法，否则调用重写了run方法的Thread类的方法。

所以，只可以通过start方法启动线程，而调用run方法时，只是调用run方法而已，不会启动另外一个线程。



**四、小结**

一旦涉及到多线程需要解决的问题，一般会有共享资源，那么尽量采用实现Runnable接口的实现方式，可以在多线程之间共享资源。

## 参考文章
* https://www.iteye.com/blog/haoran-10-2272220