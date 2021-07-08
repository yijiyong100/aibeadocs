---
title: 线程-变量副本
---


::: tip
本文主要是介绍 线程-变量副本 。
:::

[[toc]]

## 一、简介

　　早在JDK 1.2的版本中就提供java.lang.ThreadLocal，ThreadLocal为解决多线程程序的并发问题提供了一种新的思路。使用这个工具类可以很简洁地编写出优美的多线程程序。当使用ThreadLocal维护变量时，ThreadLocal为每个使用该变量的线程提供独立的变量副本，所以每一个线程都可以独立地改变自己的副本，而不会影响其它线程所对应的副本。从线程的角度看，目标变量就象是线程的本地变量，这也是类名中“Local”所要表达的意思。所以，在Java中编写线程局部变量的代码相对来说要笨拙一些，因此造成线程局部变量没有在Java开发者中得到很好的普及。人们常说，锁是一种以时间换空间的机制，而ThreadLocal正好是以空间换时间的。

　　变量值的共享可以使用public static的形式，所有线程都使用同一个变量，如果想实现每一个线程都有自己的共享变量该如何实现呢？JDK中的ThreadLocal类正是为了解决这样的问题。

　　ThreadLocal类并不是用来解决多线程环境下的共享变量问题，而是用来提供线程内部的共享变量，在多线程环境下，可以保证各个线程之间的变量互相隔离、相互独立。在线程中，可以通过get()/set()方法来访问变量。ThreadLocal实例通常来说都是private static类型的，它们希望将状态与线程进行关联。这种变量在线程的生命周期内起作用，可以减少同一个线程内多个函数或者组件之间一些公共变量的传递的复杂度。

## 二、和锁的比较

　　两个概念：线程安全，线程同步

　　事实上，ThreadLocal只解决线程安全的问题，并不能解决线程同步的问题，ThreadLocal既然为每个线程拷贝一份变量，没必要再进行同步，ThreadLocal并不是用来解决线程同步的，所以它与锁可以说是没有什么关系的。

　　总结：ThreadLocal解决的是同一个线程内的资源共享问题，而synchronized 解决的是多个线程间的资源共享问题。

## 三、ThreadLocal

ThreadLocal类接口很简单，只有4个方法：
　　
``` java
void set(T value)设置当前线程的线程局部变量的值。
　　public T get()该方法返回当前线程所对应的线程局部变量。
　　public void remove()将当前线程局部变量的值删除，目的是为了减少内存的占用，该方法是JDK 5.0新增的方法。需要指出的是，当线程结束后，对应该线程的局部变量将自动被垃圾回收，所以显式调用该方法清除线程的局部变量并不是必须的操作，但它可以加快内存回收的速度。
　　protected T initialValue()返回该线程局部变量的初始值，该方法是一个protected的方法，显然是为了让子类覆盖而设计的。这个方法是一个延迟调用方法，在线程第1次调用get()或set(T value)时才执行，并且仅执行1次。ThreadLocal中的缺省实现直接返回一个null。

　　在JDK5.0中，ThreadLocal已经支持泛型，该类的类名已经变为ThreadLocal<T>。API方法也相应进行了调整，新版本的API方法分别是void set(T value)、T get()以及T initialValue()。ThreadLocal是如何做到为每一个线程维护变量的副本的呢？其实实现的思路很简单：在ThreadLocal类中有一个Map，用于存储每一个线程的变量副本，Map中元素的键为线程对象，而值对应线程的变量副本。自己就可以提供一个简单的实现版本：
```


``` java
package com.test;  
 
public class TestNum {  
    // ①通过匿名内部类覆盖ThreadLocal的initialValue()方法，指定初始值  
     private static ThreadLocal<Integer> seqNum = new ThreadLocal<Integer>() {  
         public Integer initialValue() {  
            return 0;  
        }  
    };  
   
     // ②获取下一个序列值  
     public int getNextNum() {  
         seqNum.set(seqNum.get() + 1);  
         return seqNum.get();  
     }  
  
     public static void main(String[] args) {  
         TestNum sn = new TestNum();  
         // ③ 3个线程共享sn，各自产生序列号  
         TestClient t1 = new TestClient(sn);  
         TestClient t2 = new TestClient(sn);  
         TestClient t3 = new TestClient(sn);  
         t1.start();  
         t2.start();  
         t3.start();  
     }  
   
     private static class TestClient extends Thread {  
         private TestNum sn;  
   
         public TestClient(TestNum sn) {  
            this.sn = sn;  
         }  
   
      public void run() {  
             for (int i = 0; i < 3; i++) {  
                 // ④每个线程打出3个序列值  
                 System.out.println("thread[" + Thread.currentThread().getName() + "] --> sn["  
                          + sn.getNextNum() + "]");  
             }  
         }  
     }  
 }
```



　　通常我们通过匿名内部类的方式定义ThreadLocal的子类，提供初始的变量值，如例子中①处所示。TestClient线程产生一组序列号，在③处，我们生成3个TestClient，它们共享同一个TestNum实例。运行以上代码，在控制台上输出以下的结果：　　



``` java
thread[Thread-0] --> sn[1]
thread[Thread-1] --> sn[1]
thread[Thread-2] --> sn[1]
thread[Thread-1] --> sn[2]
thread[Thread-0] --> sn[2]
thread[Thread-1] --> sn[3]
thread[Thread-2] --> sn[2]
thread[Thread-0] --> sn[3]
thread[Thread-2] --> sn[3]
```



　　考察输出的结果信息，我们发现每个线程所产生的序号虽然都共享同一个TestNum实例，但它们并没有发生相互干扰的情况，而是各自产生独立的序列号，这是因为我们通过ThreadLocal为每一个线程提供了单独的副本。

 

## Thread同步机制的比较

　　ThreadLocal和线程同步机制相比有什么优势呢？ThreadLocal和线程同步机制都是为了解决多线程中相同变量的访问冲突问题。在同步机制中，通过对象的锁机制保证同一时间只有一个线程访问变量。这时该变量是多个线程共享的，使用同步机制要求程序慎密地分析什么时候对变量进行读写，什么时候需要锁定某个对象，什么时候释放对象锁等繁杂的问题，程序设计和编写难度相对较大。而ThreadLocal则从另一个角度来解决多线程的并发访问。ThreadLocal会为每一个线程提供一个独立的变量副本，从而隔离了多个线程对数据的访问冲突。因为每一个线程都拥有自己的变量副本，从而也就没有必要对该变量进行同步了。ThreadLocal提供了线程安全的共享对象，在编写多线程代码时，可以把不安全的变量封装进ThreadLocal。由于ThreadLocal中可以持有任何类型的对象，低版本JDK所提供的get()返回的是Object对象，需要强制类型转换。但JDK 5.0通过泛型很好的解决了这个问题，在一定程度地简化ThreadLocal的使用，代码清单 9 2就使用了JDK 5.0新的ThreadLocal T版本。

 

　　概括起来说，对于多线程资源共享的问题，同步机制采用了“以时间换空间”的方式，而ThreadLocal采用了“以空间换时间”的方式。前者仅提供一份变量，让不同的线程排队访问，而后者为每一个线程都提供了一份变量，因此可以同时访问而互不影响。Spring使用ThreadLocal解决线程安全问题我们知道在一般情况下，只有无状态的Bean才可以在多线程环境下共享，在Spring中，绝大部分Bean都可以声明为singleton作用域。就是因为Spring对一些Bean（如RequestContextHolder、TransactionSynchronizationManager、LocaleContextHolder等）中非线程安全状态采用ThreadLocal进行处理，让它们也成为线程安全的状态，因为有状态的Bean就可以在多线程中共享了。一般的Web应用划分为展现层、服务层和持久层三个层次，在不同的层中编写对应的逻辑，下层通过接口向上层开放功能调用。在一般情况下，从接收请求到返回响应所经过的所有程序调用都同属于一个线程，如下图所示：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/java/thread/threadlocal-1.png')" alt="wxmp">

　　同一线程贯通三层这样你就可以根据需要，将一些非线程安全的变量以ThreadLocal存放，在同一次请求响应的调用线程中，所有关联的对象引用到的都是同一个变量。下面的实例能够体现Spring对有状态Bean的改造思路：代码清单3 TestDao：非线程安全 　



``` java
package com.test;

import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;

public class TestDao {
    private Connection conn;// ①一个非线程安全的变量

    public void addTopic() throws SQLException {
        Statement stat = conn.createStatement();// ②引用非线程安全变量
        // …
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

　　由于①处的conn是成员变量，因为addTopic()方法是非线程安全的，必须在使用时创建一个新TopicDao实例（非singleton）。下面使用ThreadLocal对conn这个非线程安全的“状态”进行改造：代码清单4 TestDao：线程安全　　



``` java
package com.test;

import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;

public class TestDaoNew {
    // ①使用ThreadLocal保存Connection变量
    private static ThreadLocal<Connection> connThreadLocal = new ThreadLocal<Connection>();

    public static Connection getConnection() {
        // ②如果connThreadLocal没有本线程对应的Connection创建一个新的Connection，
        // 并将其保存到线程本地变量中。
        if (connThreadLocal.get() == null) {
            Connection conn = getConnection();
            connThreadLocal.set(conn);
            return conn;
        } else {
            return connThreadLocal.get();// ③直接返回线程本地变量
        }
    }

    public void addTopic() throws SQLException {
        // ④从ThreadLocal中获取线程对应的Connection
        Statement stat = getConnection().createStatement();
    }
}
```



　　不同的线程在使用TopicDao时，先判断connThreadLocal.get()是否是null，如果是null，则说明当前线程还没有对应的Connection对象，这时创建一个Connection对象并添加到本地线程变量中；如果不为null，则说明当前的线程已经拥有了Connection对象，直接使用就可以了。这样，就保证了不同的线程使用线程相关的Connection，而不会使用其它线程的Connection。因此，这个TopicDao就可以做到singleton共享了。当然，这个例子本身很粗糙，将Connection的ThreadLocal直接放在DAO只能做到本DAO的多个方法共享Connection时不发生线程安全问题，但无法和其它DAO共用同一个Connection，要做到同一事务多DAO共享同一Connection，必须在一个共同的外部类使用ThreadLocal保存Connection。ConnectionManager.java 



``` java
package com.test;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class ConnectionManager {

    private static ThreadLocal<Connection> connectionHolder = new ThreadLocal<Connection>() {
        @Override
        protected Connection initialValue() {
            Connection conn = null;
            try {
                conn = DriverManager.getConnection(
                        "jdbc:mysql://localhost:3306/test", "username",
                        "password");
            } catch (SQLException e) {
                e.printStackTrace();
            }
            return conn;
        }
    };

    public static Connection getConnection() {
        return connectionHolder.get();
    }

    public static void setConnection(Connection conn) {
        connectionHolder.set(conn);
    }
}
```



### ThreadLocal T

ThreadLocal最简单的实现方式就是ThreadLocal类内部有一个线程安全的Map，然后用线程的ID作为Map的key，实例对象作为Map的value，这样就能达到各个线程的值隔离的效果。

JDK最早期的ThreadLocal就是这样设计的，但是，之后ThreadLocal的设计换了一种方式。

那么到底ThreadLocal类是如何实现这种“为每个线程提供不同的变量拷贝”的呢？先来看一下ThreadLocal的set()方法的源码是如何实现的： 



``` java
 /**
     * Sets the current thread's copy of this thread-local variable
     * to the specified value.  Most subclasses will have no need to
     * override this method, relying solely on the {@link #initialValue}
     * method to set the values of thread-locals.
     *
     * @param value the value to be stored in the current thread's copy of
     *        this thread-local.
     */
    public void set(T value) {
        Thread t = Thread.currentThread();
        ThreadLocalMap map = getMap(t);
        if (map != null)
            map.set(this, value);
        else
            createMap(t, value);
    }
```



　　在这个方法内部我们看到，首先通过getMap(Thread t)方法获取一个和当前线程相关的ThreadLocalMap，然后将变量的值设置到这个ThreadLocalMap对象中，当然如果获取到的ThreadLocalMap对象为空，就通过createMap方法创建。线程隔离的秘密，就在于ThreadLocalMap这个类。ThreadLocalMap是ThreadLocal类的一个静态内部类，它实现了键值对的设置和获取（对比Map对象来理解），每个线程中都有一个独立的ThreadLocalMap副本，它所存储的值，只能被当前线程读取和修改。ThreadLocal类通过操作每一个线程特有的ThreadLocalMap副本，从而实现了变量访问在不同线程中的隔离。因为每个线程的变量都是自己特有的，完全不会有并发错误。还有一点就是，ThreadLocalMap存储的键值对中的键是this对象指向的ThreadLocal对象，而值就是你所设置的对象了。为了加深理解，我们接着看上面代码中出现的getMap和createMap方法的实现： 



``` java
    /**
     * Get the map associated with a ThreadLocal. Overridden in
     * InheritableThreadLocal.
     *
     * @param  t the current thread
     * @return the map
     */
    ThreadLocalMap getMap(Thread t) {
        return t.threadLocals;
    }

    /**
     * Create the map associated with a ThreadLocal. Overridden in
     * InheritableThreadLocal.
     *
     * @param t the current thread
     * @param firstValue value for the initial entry of the map
     * @param map the map to store.
     */
    void createMap(Thread t, T firstValue) {
        t.threadLocals = new ThreadLocalMap(this, firstValue);
    }
```



接下来再看一下ThreadLocal类中的get()方法



``` java
  /**
     * Returns the value in the current thread's copy of this
     * thread-local variable.  If the variable has no value for the
     * current thread, it is first initialized to the value returned
     * by an invocation of the {@link #initialValue} method.
     *
     * @return the current thread's value of this thread-local
     */
    public T get() {
        Thread t = Thread.currentThread();
        ThreadLocalMap map = getMap(t);
        if (map != null) {
            ThreadLocalMap.Entry e = map.getEntry(this);
            if (e != null)
                return (T)e.value;
        }
        return setInitialValue();
    }
```



get()方法主要做了以下事情：

1、调用Thread.currentThread()获取当前线程对象t；

2、根据当前线程对象，调用getMap(Thread)获取线程对应的ThreadLocalMap对象：

如上述

threadLocals是Thread类的成员变量，初始化为null：

``` java
ThreadLocal.ThreadLocalMap threadLocals = null;
```

 

再来看setInitialValue()方法： 



``` java
 /**
     * Variant of set() to establish initialValue. Used instead
     * of set() in case user has overridden the set() method.
     *
     * @return the initial value
     */
    private T setInitialValue() {
        T value = initialValue();
        Thread t = Thread.currentThread();
        ThreadLocalMap map = getMap(t);
        if (map != null)
            map.set(this, value);
        else
            createMap(t, value);
        return value;
    }
```



ThreadLocal的实现离不开ThreadLocalMap类，ThreadLocalMap类是ThreadLocal的静态内部类。每个Thread维护一个ThreadLocalMap映射表，这个映射表的key是ThreadLocal实例本身，value是真正需要存储的Object。这样的设计主要有以下几点优势：

这样设计之后每个Map的Entry数量变小了：之前是Thread的数量，现在是ThreadLocal的数量，能提高性能；
当Thread销毁之后对应的ThreadLocalMap也就随之销毁了，能减少内存使用量。

### ThreadLocalMap源码分析

ThreadLocalMap是用来存储与线程关联的value的哈希表，它具有HashMap的部分特性，比如容量、扩容阈值等，它内部通过Entry类来存储key和value，Entry类的定义为：



``` java
static class Entry extends WeakReference<ThreadLocal<?>> {
    /** The value associated with this ThreadLocal. */
    Object value;

    Entry(ThreadLocal<?> k, Object v) {
        super(k);
        value = v;
    }
}
```



Entry继承自WeakReference，通过上述源码super(k);可以知道，ThreadLocalMap是使用ThreadLocal的
[弱引用](https://blog.csdn.net/qq_38293564/article/details/80460945)作为Key的。

分析到这里，我们可以得到下面这个对象之间的引用结构图（其中，实线为强引用，虚线为弱引用）：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/java/thread/threadlocal-2.png')" alt="wxmp">

我们知道，弱引用对象在Java虚拟机进行垃圾回收时，就会被释放，那我们考虑这样一个问题：

ThreadLocalMap使用ThreadLocal的弱引用作为key，如果一个ThreadLocal没有外部关联的强引用，那么在虚拟机进行垃圾回收时，这个ThreadLocal会被回收，这样，ThreadLocalMap中就会出现key为null的Entry，这些key对应的value也就再无妨访问，但是value却存在一条从Current Thread过来的强引用链。因此只有当Current Thread销毁时，value才能得到释放。

该强引用链如下：

CurrentThread Ref -> Thread -> ThreadLocalMap -> Entry -> value

因此，只要这个线程对象被gc回收，那些key为null对应的value也会被回收，这样也没什么问题，但在线程对象不被回收的情况下，比如使用线程池的时候，核心线程是一直在运行的，线程对象不会回收，若是在这样的线程中存在上述现象，就可能出现内存泄露的问题。

那在ThreadLocalMap中是如何解决这个问题的呢？

在获取key对应的value时，会调用ThreadLocalMap的getEntry(ThreadLocal<?> key)方法，该方法源码如下：



``` java
private Entry getEntry(ThreadLocal<?> key) {
    int i = key.threadLocalHashCode & (table.length - 1);
    Entry e = table[i];
    if (e != null && e.get() == key)
        return e;
    else
        return getEntryAfterMiss(key, i, e);
}
```



通过key.threadLocalHashCode & (table.length - 1)来计算存储key的Entry的索引位置，然后判断对应的key是否存在，若存在，则返回其对应的value，否则，调用getEntryAfterMiss(ThreadLocal<?>, int, Entry)方法，源码如下：



``` java
private Entry getEntryAfterMiss(ThreadLocal<?> key, int i, Entry e) {
    Entry[] tab = table;
    int len = tab.length;

    while (e != null) {
        ThreadLocal<?> k = e.get();
        if (k == key)
            return e;
        if (k == null)
            expungeStaleEntry(i);
        else
            i = nextIndex(i, len);
        e = tab[i];
    }
    return null;
}
```



ThreadLocalMap采用线性探查的方式来处理哈希冲突，所以会有一个while循环去查找对应的key，在查找过程中，若发现key为null，即通过弱引用的key被回收了，会调用expungeStaleEntry(int)方法，其源码如下：



``` java
private int expungeStaleEntry(int staleSlot) {
    Entry[] tab = table;
    int len = tab.length;

    // expunge entry at staleSlot
    tab[staleSlot].value = null;
    tab[staleSlot] = null;
    size--;

    // Rehash until we encounter null
    Entry e;
    int i;
    for (i = nextIndex(staleSlot, len);
            (e = tab[i]) != null;
            i = nextIndex(i, len)) {
        ThreadLocal<?> k = e.get();
        if (k == null) {
            e.value = null;
            tab[i] = null;
            size--;
        } else {
            int h = k.threadLocalHashCode & (len - 1);
            if (h != i) {
                tab[i] = null;

                // Unlike Knuth 6.4 Algorithm R, we must scan until
                // null because multiple entries could have been stale.
                while (tab[h] != null)
                    h = nextIndex(h, len);
                tab[h] = e;
            }
        }
    }
    return i;
}
```



通过上述代码可以发现，若key为null，则该方法通过下述代码来清理与key对应的value以及Entry：

``` java
// expunge entry at staleSlot
tab[staleSlot].value = null;
tab[staleSlot] = null;
```

此时，CurrentThread Ref不存在一条到Entry对象的强引用链，Entry到value对象也不存在强引用，那在程序运行期间，它们自然也就会被回收。expungeStaleEntry(int)方法的后续代码就是以线性探查的方式，调整后续Entry的位置，同时检查key的有效性。

在ThreadLocalMap中的set()/getEntry()方法中，都会调用expungeStaleEntry(int)方法，但是如果我们既不需要添加value，也不需要获取value，那还是有可能产生内存泄漏的。所以很多情况下需要使用者手动调用ThreadLocal的remove()函数，手动删除不再需要的ThreadLocal，防止内存泄露。若对应的key存在，remove()方法也会调用expungeStaleEntry(int)方法，来删除对应的Entry和value。

其实，最好的方式就是将ThreadLocal变量定义成private static的，这样的话ThreadLocal的生命周期就更长，由于一直存在ThreadLocal的强引用，所以ThreadLocal也就不会被回收，也就能保证任何时候都能根据ThreadLocal的弱引用访问到Entry的value值，然后remove它，可以防止内存泄露。

InheritableThreadLocal
InheritableThreadLocal继承自ThreadLocal，使用InheritableThreadLocal类可以使子线程继承父线程的值，来看一段示例代码：

 



``` java
public class ThreadLocalTest {
    private static InheritableThreadLocal<Integer> inheritableThreadLocal = new InheritableThreadLocal<Integer>() {
        @Override
        protected Integer initialValue() {
            return Integer.valueOf(10);
        }
    };
    
    static class MyThread extends Thread {
        @Override
        public void run() {
            super.run();
            System.out.println(getName() + " inheritableThreadLocal.get() = " + inheritableThreadLocal.get());
        }
    }
    
    public static void main(String[] args) {
        System.out.println(Thread.currentThread().getName() + " inheritableThreadLocal.get() = " + inheritableThreadLocal.get());
        
        MyThread myThread = new MyThread();
        myThread.setName("线程A");
        myThread.start();
    }
}
```



 

运行结果：

``` java
main inheritableThreadLocal.get() = 10
线程A inheritableThreadLocal.get() = 10
```

 


可以看到子线程成功继承了父线程的值。

父线程还可以设置子线程的初始值，只需要重写InheritableThreadLocal类的childValue(T)方法即可，将上述代码的inheritableThreadLocal 定义修改为如下方式：



``` java
private static InheritableThreadLocal<Integer> inheritableThreadLocal = new InheritableThreadLocal<Integer>() {
    @Override
    protected Integer initialValue() {
        return Integer.valueOf(10);
    }
    
    @Override
    protected Integer childValue(Integer parentValue) {
        return Integer.valueOf(5);
    }
};
```



运行结果为：

main inheritableThreadLocal.get() = 10
线程A inheritableThreadLocal.get() = 5
可以看到，子进程成功获取到了父进程设置的初始值。

使用InheritableThreadLocal类需要注意的一点是，如果子线程在取得值的同时，主线程将InheritableThreadLocal中的值进行更改，那子线程获取的还是旧值。

线程中用来实现上述功能的ThreadLocalMap类变量为

``` java
ThreadLocal.ThreadLocalMap inheritableThreadLocals = null;
```

InheritableThreadLocal类的实现很简单，主要是重写了ThreadLocal类的getMap(Thread)方法和createMap(Thread, T)方法，将其中操作的ThreadLocalMap变量修改为了inheritableThreadLocals，这里不再进一步叙述。

## 参考文章
* https://www.cnblogs.com/bjlhx/p/7599464.html