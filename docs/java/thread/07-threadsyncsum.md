---
title: 线程-同步问题总结
---


::: tip
本文主要是介绍 线程-同步问题总结 。
:::

[[toc]]

## 0、共享资源

　　指的是多个线程同时对同一份资源进行访问（读写操作），被多个线程访问的资源就称为共享资源。如何保证多个线程访问到的数据是一致的，则被称为数据同步或者资源同步。

## 一、同步问题引出，数据不一致问题引出

### 1、示例：

```  java
class MyThread9 implements Runnable {
    private int ticket = 5;
    @Override
    public void run() {// 主方法
        for (int i = 0; i < 10; i++) {
            if (ticket > 0)
                System.out.println(Thread.currentThread().getName() + ",ticket=" + (ticket--));
        }
    }
}
```



main方法



``` java
        MyThread9 mt = new MyThread9();
        Thread threadA = new Thread(mt, "票贩子A");
        Thread threadB = new Thread(mt, "票贩子B");
        Thread threadC = new Thread(mt, "票贩子C");
        threadA.start();
        threadB.start();
        threadC.start();
```



输出：
　　票贩子B,ticket=5
　　票贩子B,ticket=2
　　票贩子B,ticket=1
　　票贩子C,ticket=3
　　票贩子A,ticket=4

### 2、改造一下，增加卖票延迟





``` java
class MyThread9 implements Runnable {
    private int ticket = 5;

    @Override
    public void run() {// 主方法
        for (int i = 0; i < 10; i++) {
            if (ticket > 0) {
                try {
                    Thread.sleep(100);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
                System.out.println(Thread.currentThread().getName() + ",ticket=" + (ticket--));
            }
        }
    }
}
```



main方法调用





``` java
        MyThread9 mt = new MyThread9();
        Thread threadA = new Thread(mt, "票贩子A");
        Thread threadB = new Thread(mt, "票贩子B");
        Thread threadC = new Thread(mt, "票贩子C");
        threadA.start();
        threadB.start();
        threadC.start();
```



输出：
　　票贩子A,ticket=5
　　票贩子C,ticket=4
　　票贩子C,ticket=2
　　票贩子C,ticket=1
　　票贩子B,ticket=4
　　票贩子A,ticket=3

### 3、分析

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/java/thread/threadsync-1.png')" alt="wxmp">

　　那么这样的操作就属于线程的不同步操作，所以发现多个线程操作时必须要考虑到线程不同步问题。

　　一般情况下，如果一个对象的状态是可变的，同时它又是共享的（即至少可被多于一个线程同时访问），则它存在线程安全问题，总结来说：无论何时，只要有多于一个的线程访问给定的状态变量，而且其中某个线程会写入该变量，此时必须使用同步来协调线程对该变量的访问。

　　**避免出现线程安全问题三个方案：1、禁止跨线程访问变量。2、使状态变量为不可变。3、使用同步。（前两个方法实际就是放弃使用多线程，不可取，我们需要解决问题，而非逃避问题）。**

##  二、线程同步处理

### 1、实现同步操作

　　整个代码发现有个逻辑错误，判断是否有票，休眠，卖票分为三步，那么实际上每一个线程如果要执行卖票的话，其他线程应该等待当前线程执行完毕后才可以进入。

### 2、问题解决

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/java/thread/threadsync-2.png')" alt="wxmp">

### 3、线程同步的方法

#### 1.原子性

示例：



``` java
public class Generator {  
    private long value = 1;  
 
    public void getValue(){  
         value++;  
    }  
} 
```



　　此处的value++就是非原子操作，它是先取值、再加1、最后赋值的一种机制，是一种“读-写-改”的操作，原子操作需要保证，在对对象进行修改的过程中，对象的状态不能被改变！这个现象我们用一个名词：**竞争条件**来描述。换句话说，当计算结果的正确性依赖于运行时中相关的时序或者多线程的交替时，会产生竞争条件。（即想得到正确的答案，要依赖于一定的运气。正如value++中的情况，如果我的运气足够好，在对value进行操作时，无其它任何线程同时对其操作）　　

1.1.相关的示例如，单例模式【会有线程安全问题】



``` java
public static Singleton getInstance() {  
    if (instance == null) {  
        instance = new Singleton();  
    }  
    return instance;  
} 
```



饿汉式单例【可以使用，无线程安全问题】





``` java
public class MySingleton {  
      
    private static MySingleton instance = new MySingleton();  
      
    private MySingleton(){}  
      
    public static MySingleton getInstance() {  
        return instance;  
    }  
      
}
```



懒汉式单例【synchronized 同步方法】





``` java
public class MySingleton {        
    private static MySingleton instance = null;        
    private MySingleton(){}        
    public synchronized static MySingleton getInstance() {  
        try {   
            if(instance == null){//懒汉式   
                //创建实例之前可能会有一些准备性的耗时工作   
                Thread.sleep(300);  
                instance = new MySingleton();  
            }  
        } catch (InterruptedException e) {   
            e.printStackTrace();  
        }  
        return instance;  
    }  
} 
```



　　这种实现方式的运行效率会很低。同步方法效率低

懒汉式单例【synchronized 同步代码块】





``` java
public class MySingleton {        
    private static MySingleton instance = null;        
    private MySingleton(){}  
      
    //public synchronized static MySingleton getInstance() {  
    public static MySingleton getInstance() {  
        try {   
            synchronized (MySingleton.class) {  
                if(instance == null){//懒汉式   
                    //创建实例之前可能会有一些准备性的耗时工作   
                    Thread.sleep(300);  
                    instance = new MySingleton();  
                }  
            }  
        } catch (InterruptedException e) {   
            e.printStackTrace();  
        }  
        return instance;  
    }  
}  
```



实现将全部的代码都被锁上了，同样的效率很低下

懒汉模式【Double Check Locking 双检查锁机制（**推荐**）】

为了达到线程安全，又能提高代码执行效率，我们这里可以采用DCL的双检查锁机制来完成





``` java
public class MySingleton {  
      
    //使用volatile关键字保其可见性  
    volatile private static MySingleton instance = null;  
      
    private MySingleton(){}  
       
    public static MySingleton getInstance() {  
        try {    
            if(instance == null){//懒汉式   
                //创建实例之前可能会有一些准备性的耗时工作   
                Thread.sleep(300);  
                synchronized (MySingleton.class) {  
                    if(instance == null){//二次检查  
                        instance = new MySingleton();  
                    }  
                }  
            }   
        } catch (InterruptedException e) {   
            e.printStackTrace();  
        }  
        return instance;  
    }  
}  
```



在声明变量时使用了volatile关键字来保证其线程间的可见性；在同步代码块中使用二次检查，以保证其不被重复实例化。集合其二者，这种实现方式既保证了其高效性，也保证了其线程安全性。

### 通过原子变量AtomicLong 

　　将其转为线程安全的，在java.util.concurrent.atomic包下有一些将数字和对象引用进行原始状态转换的类，改造这个程序：



``` java
public class Generator {  
    private final AtomicLong value = new AtomicLong(0);  
      
    public void getValue(){  
        value.incrementAndGet();  
    }  
}  
```



### 2、实现锁，同步代码块或同步方法来解决。内部锁(synchronized)

#### 1.同步代码块

使用synchronized定义的代码块就称为同步代码块，但是在进行同步的时候需要设置一个同步对象，往往可以使用this同步当前对象

#### 2.示例 



``` java
class MyThread9 implements Runnable {
    private int ticket = 5;
    @Override
    public void run() {// 主方法
        for (int i = 0; i < 10; i++) {
            synchronized (this) {
                if (ticket > 0) {
                    try {
                        Thread.sleep(1000);
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                    System.out.println(Thread.currentThread().getName() + ",ticket=" + (ticket--));
                }
            }
        }
    }
}
```



main方法



``` java
       MyThread9 mt = new MyThread9();
        Thread threadA = new Thread(mt, "票贩子A");
        Thread threadB = new Thread(mt, "票贩子B");
        Thread threadC = new Thread(mt, "票贩子C");
        threadA.start();
        threadB.start();
        threadC.start();
```



输出
　　票贩子A,ticket=5
　　票贩子C,ticket=4
　　票贩子B,ticket=3
　　票贩子C,ticket=2
　　票贩子C,ticket=1

注意：加入同步之后整个代码执行速度变慢 。

**异步操作属于非线程安全操作，而同步操作属于线程安全操作**

#### 2.同步方法

示例 





``` java
class MyThread10 implements Runnable {
    private int ticket = 5;

    @Override
    public void run() {// 主方法
        for (int i = 0; i < 10; i++) {
            this.sale();
        }
    }

    public synchronized void sale() {
        if (ticket > 0) {
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            System.out.println(Thread.currentThread().getName() + ",ticket=" + (ticket--));
        }
    }
}
```



main方法





``` java
        MyThread10 mt = new MyThread10();
        Thread threadA = new Thread(mt, "票贩子A");
        Thread threadB = new Thread(mt, "票贩子B");
        Thread threadC = new Thread(mt, "票贩子C");
        threadA.start();
        threadB.start();
        threadC.start();
```



输出
　　票贩子A,ticket=5
　　票贩子C,ticket=4
　　票贩子B,ticket=3
　　票贩子C,ticket=2
　　票贩子C,ticket=1
在多线程访问同一资源时，一定要考虑到数据同步问题，使用synchronized

　　Java提供了完善的内置锁机制：synchronized块。在方法前synchronized关键字或者在方法中加synchronized语句块，锁住的都是方法中包含的对象，如果线程想获得所，那么就需要进入有synchronized关键字修饰的方法或块。采用synchronized有时会带来一定的性能下降。但是，无疑synchronized是最简单实用的同步机制，基本可以满足日常需求。内部锁扮演了互斥锁（即mutex）的角色，意味着同一时刻至多只能有一个线程可以拥有锁，当线程A想去请求一个被线程B占用的锁时，必然会发生阻塞，直到B释放该锁，如果B永不释放锁，A将一直等待下去。这种机制是一种基于调用的机制（每调用，即per-invocation），就是说不管哪个线程，如果调用声明为synchronized的方法，就可获得锁（前提是锁未被占用）。

## 三、死锁分析

　　死锁是一种不确定的状态，对于死锁的操作应该出现的越少越好。
　　多个线程同时访问一个资源可能带来什么问题。以及产生的附加问题
　　　　1.多个线程同时访问一个资源时必须考虑同步，可以使用synchronized定义同步代码块或同步方法
　　　　2.程序中如果过多的同步，那么将产生死锁
　　结论，
　　　　如果看见了synchronized声明的 方法，是一个同步方法，属于线程安全的操作
　　　　但是性能不会特别高。

3.1、死锁原因

1、交叉锁可能导致死锁

2、内存不足

3、数据库锁

4、文件锁

5、死循环引起的死锁

3.2、示例

hashmap可能引发的死锁



``` java
public class ThreadDemo08hashmapDeadLock {
    private final HashMap<String, String> map = new HashMap<>();

    public void add(String key, String value) {
        map.put(key, value);
    }

    public static void main(String[] args) {
        final ThreadDemo08hashmapDeadLock hashmapDeadLock = new ThreadDemo08hashmapDeadLock();
        for (int x = 0; x < 2; x++) {
            new Thread(() -> {
                for (int i = 0; i < Integer.MAX_VALUE; i++) {
                    hashmapDeadLock.add(String.valueOf(i), String.valueOf(i));

                }
            }).start();
        }
    }
}
```



如果需要使用线程安全的HashMap推荐使用，ConcurrentHashMap或Collections.synchronizedMap()

## 四、线程间通信

线程间通信又叫进程内通信

### 4.1、同步阻塞与异步非阻塞

设计系统采用异步非阻塞机制

### 4.2、单线程间通讯

通过使用对象的wait和notify

示例：两个线程间通讯，只有一个线程对EventQueue进行offer操作或者take操作。



``` java
public class EventQueue {
    private final int max;

    static class Event {
    }

    private final LinkedList<Event> eventQueue = new LinkedList<>();
    private final static int DEFAULT_MAX_EVENT = 10;

    public EventQueue() {
        this(DEFAULT_MAX_EVENT);
    }

    public EventQueue(int max) {
        this.max = max;
    }

    public void offer(Event event) {
        synchronized (eventQueue) {
            if (eventQueue.size() >= max) {
                console(" the queue is full");
                try {
                    eventQueue.wait();
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
            console(" the new event is submitted");
            eventQueue.addLast(event);
            eventQueue.notify();
        }
    }

    public Event take() {
        synchronized (eventQueue) {
            if (eventQueue.isEmpty()) {
                console("the queue is empty.");
                try {
                    eventQueue.wait();
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }

            Event event = eventQueue.removeFirst();
            this.eventQueue.notify();
            console("the event " + event + " is handled.");
            return event;
        }
    }

    private void console(String message) {
        System.out.println("线程名：" + currentThread().getName() + ":" + message);
    }
}
```



 

测试



``` java
public class EventClient {
    public static void main(String[] args) {
        final EventQueue eventQueue = new EventQueue();
        new Thread(() -> {
            while (true) {
                eventQueue.offer(new EventQueue.Event());
            }
        }, "producer").start();

        new Thread(() -> {
            while (true) {
                eventQueue.take();
                try {
                    TimeUnit.SECONDS.sleep(10);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        }, "consumer").start();
    }
}
```



 

输出



``` java
线程名：consumer:the queue is empty.
线程名：producer: the new event is submitted
线程名：producer: the new event is submitted
线程名：producer: the new event is submitted
线程名：producer: the new event is submitted
线程名：producer: the new event is submitted
线程名：producer: the new event is submitted
线程名：producer: the new event is submitted
线程名：producer: the new event is submitted
线程名：producer: the new event is submitted
线程名：producer: the new event is submitted
线程名：producer: the queue is full
线程名：consumer:the event com.github.bjlhx15.common.threaddemo.eg02singlethread.EventQueue$Event@608c4f0e is handled.
线程名：producer: the new event is submitted
线程名：producer: the queue is full
```



 

## 4.3、多线程间通信

通过使用notifyAll

代码改造将上述 EventQueue 中的if判断改为while，notify改为notifyAll，然后在测试使用多个消费者情况



```
线程名：producer: the new event is submitted
线程名：producer: the queue is full
线程名：consumer:the event com.github.bjlhx15.common.threaddemo.eg03multithread.EventQueue$Event@ba3ca71 is handled.
线程名：consumer:the event com.github.bjlhx15.common.threaddemo.eg03multithread.EventQueue$Event@2cced823 is handled.
线程名：producer: the new event is submitted
线程名：producer: the new event is submitted
线程名：producer: the queue is full
```



 

4.3.1、wait set 线程休息室

　　在虚拟机规范中存在一个wait set，数据结构没有明确定义。需要具体厂家实现。

　　线程调用了某个对象的wait方法之后都会被加入与该对象monitor关联的wait set中，并释放monitor的所有权。

　　nority方法之后，其中一个线程会从wait set中弹出，弹出规则归实现厂家；notifyAll将wait set线程全出弹出。

## 五、生产者与消费者【同步、重复】

线程间的通许问题以及object类的支持

### 1、基本模型

　　希望实现一种数据的生产和取出的操作形式，即：有多个不同的线程，这样的线程对象，分为生产者线程和消费者线程。理想状态是生产者每生产完一条完整数据之后，消费者就要取走这个数据，并且进行消费。

### 2、示例：

　　title="张三",content="帅哥"
　　title="李四",content="衰哥"

### 3、分析

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/java/thread/threadsync-3.png')" alt="wxmp">

### 4、示例代码，初期实现 





``` java
package com.lhx.thread.impl;

class Info {
 private String title;
 private String content;

 public String getTitle() {
  return title;
 }

 public void setTitle(String title) {
  this.title = title;
 }

 public String getContent() {
  return content;
 }

 public void setContent(String content) {
  this.content = content;
 }
}

class Productor implements Runnable {
 private Info info = null;

 public Productor(Info info) {
  this.info = info;
 }

 @Override
 public void run() {
  for (int i = 0; i < 50; i++)
   if (i % 2 == 0) {
    this.info.setTitle("张三");
    try {
     Thread.sleep(100);
    } catch (InterruptedException e) {
     e.printStackTrace();
    }
    this.info.setContent("衰哥");
   } else {
    this.info.setTitle("李四");
    try {
     Thread.sleep(100);
    } catch (InterruptedException e) {
     e.printStackTrace();
    }
    this.info.setContent("帅哥");
   }
 }
}

class Consumer implements Runnable {
 private Info info = null;

 public Consumer(Info info) {
  this.info = info;
 }

 public void run() {
  for (int i = 0; i < 50; i++) {
   try {
    Thread.sleep(100);
   } catch (InterruptedException e) {
    e.printStackTrace();
   }
   System.out.println(info.getTitle() + "-->" + info.getContent());
  }
 }
}

public class TestDemo2 {
 public static void main(String[] args) throws Exception {
  Info info = new Info();
  Productor productor = new Productor(info);
  Consumer consumer = new Consumer(info);
  new Thread(productor).start();
  new Thread(consumer).start();
 }
}
```



输出
　　李四-->衰哥
　　张三-->帅哥
　　李四-->衰哥
　　张三-->帅哥

### 5、以上执行存在问题：

　　1.数据错位
　　2.重复生产，重复取出

### 6、解决不同步问题

　　使用synchronized，操作Info来完成
改进 





``` java
package com.lhx.thread.impl;

class Info {
 private String title;
 private String content;

 public synchronized void set(String title, String content) {
  this.title = title;
  try {
   Thread.sleep(100);
  } catch (InterruptedException e) {
   e.printStackTrace();
  }
  this.content = content;
 }

 public synchronized void get() {
  System.out.println(title + "-->" + content);
 }
}

class Productor implements Runnable {
 private Info info = null;

 public Productor(Info info) {
  this.info = info;
 }

 @Override
 public void run() {
  for (int i = 0; i < 50; i++)
   if (i % 2 == 0) {
    this.info.set("张三", "衰哥");
   } else {
    this.info.set("李四", "帅哥");
   }
 }
}

class Consumer implements Runnable {
 private Info info = null;

 public Consumer(Info info) {
  this.info = info;
 }

 public void run() {
  for (int i = 0; i < 50; i++) {
   info.get();
  }
 }
}

public class TestDemo2 {
 public static void main(String[] args) throws Exception {
  Info info = new Info();
  Productor productor = new Productor(info);
  Consumer consumer = new Consumer(info);
  new Thread(productor).start();
  new Thread(consumer).start();
 }
}
```



数据的同步操作都交给了同步方法完成，
可以看到同步问题解决了，但是重复操作没有

### 7、 解决重复操作问题

增加等待与唤醒的处理机制，这样的操作可以使用Object类。Object提供以下操作
　　等待:public final void wait() throws InterruptedException
　　唤醒第一个等待线程:public final native void notify();
　　唤醒全部等待线程: public final native void notifyAll();
代码【**标准答案**】 





``` java
package com.lhx.thread.impl;

class Info {
 private String title;
 private String content;
 private boolean flag = true;
 // flag true 表示生产数据，但是不允许取走数据
 // flag false 表示取走数据，但是不允许生产数据

 public synchronized void set(String title, String content) {
  if (flag == false) {
   try {
    super.wait();// 等待
   } catch (InterruptedException e) {
    e.printStackTrace();
   }
  }
  this.title = title;
  try {
   Thread.sleep(100);
  } catch (InterruptedException e) {
   e.printStackTrace();
  }
  this.content = content;
  flag = false;
  super.notify();
 }

 public synchronized void get() {
  if (flag == true) {// 此时应该生产
   try {
    super.wait();// 等待
   } catch (InterruptedException e) {
    e.printStackTrace();
   }
  }

  try {
   Thread.sleep(100);
  } catch (InterruptedException e) {
   e.printStackTrace();
  }
  System.out.println(title + "-->" + content);
  flag = true;
  super.notify();
 }
}

class Productor implements Runnable {
 private Info info = null;

 public Productor(Info info) {
  this.info = info;
 }

 @Override
 public void run() {
  for (int i = 0; i < 50; i++)
   if (i % 2 == 0) {
    this.info.set("张三", "衰哥");
   } else {
    this.info.set("李四", "帅哥");
   }
 }
}

class Consumer implements Runnable {
 private Info info = null;

 public Consumer(Info info) {
  this.info = info;
 }

 public void run() {
  for (int i = 0; i < 50; i++) {
   info.get();
  }
 }
}

public class TestDemo2 {
 public static void main(String[] args) throws Exception {
  Info info = new Info();
  Productor productor = new Productor(info);
  Consumer consumer = new Consumer(info);
  new Thread(productor).start();
  new Thread(consumer).start();
 }
}
```



解释一下sleep和wait区别
　　sleep 是thread类定义的方法，在休眠到一定时间之后将自己唤醒
　　wait是object类定义的方法，表示线程等待执行，必须通过notify()、notifyAll()来进行唤醒







## 参考文章
* https://www.cnblogs.com/bjlhx/p/7594034.html