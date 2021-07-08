---
title: 线程-线程组
---


::: tip
本文主要是介绍 线程-线程组 。
:::

[[toc]]

线程组ThreadGroup表示一组线程的集合,一旦一个线程归属到一个线程组之中后，就不能再更换其所在的线程组。那么为什么要使用线程组呢？个人认为有以下的好处：方便统一管理，线程组可以进行复制，快速定位到一个线程，统一进行异常设置等。ThreadGroup它其实并不属于Java并发包中的内容，它是java.lang中的内容。但是掌握对其的于理解，在实际应用中有很大的帮助。

## 一、基本方法

### 1、获取当前线程组名

``` java
Thread.currentThread().getThreadGroup().getName()  
```

### 2、将线程放入到一个线程组中去

ThreadGroup threadGroup1 = new ThreadGroup("group1");
ThreadGroup threadGroup2 = new ThreadGroup("group2");
Thread thread1 =new Thread(threadGroup1, "group1's member");
Thread thread2 =new Thread(threadGroup2, "group2's member");

其中Thread中和ThreadGroup相关的构造函数：





``` java
    public Thread(ThreadGroup group, Runnable target) {
    init(group, target, "Thread-" + nextThreadNum(), 0);
    }


    public Thread(ThreadGroup group, String name) {
    init(group, null, name, 0);
    }


    public Thread(ThreadGroup group, Runnable target, String name) {
    init(group, target, name, 0);
    }

    public Thread(ThreadGroup group, Runnable target, String name,
                  long stackSize) {
    init(group, target, name, stackSize);
    }
```



它们最终都是调用同一个函数：





``` java
    private void init(ThreadGroup g, Runnable target, String name,
                      long stackSize) {
    Thread parent = currentThread();
    SecurityManager security = System.getSecurityManager();
    if (g == null) {
         //安全检查
        if (security != null) {
        g = security.getThreadGroup();
        }

        //设置线程组
        if (g == null) {
        g = parent.getThreadGroup();
        }
    }

    //检查可达性
    g.checkAccess();

     //是否有权限访问
    if (security != null) {
        if (isCCLOverridden(getClass())) {
            security.checkPermission(SUBCLASS_IMPLEMENTATION_PERMISSION);
        }
    }

     //往线程组添加线程但未启动
     g.addUnstarted();

    this.group = g;
    this.daemon = parent.isDaemon();//是否守护线程
    this.priority = parent.getPriority();//优先级
    this.name = name.toCharArray();
    if (security == null || isCCLOverridden(parent.getClass()))
        this.contextClassLoader = parent.getContextClassLoader();
    else
        this.contextClassLoader = parent.contextClassLoader;
    this.inheritedAccessControlContext = AccessController.getContext();
    this.target = target;
    setPriority(priority);
        if (parent.inheritableThreadLocals != null)
        this.inheritableThreadLocals =
        ThreadLocal.createInheritedMap(parent.inheritableThreadLocals);
        this.stackSize = stackSize;
        tid = nextThreadID();
        this.me = this;
    }
```



### 3、复制线程组：

```
//这样可以复制group里面的thread信息  
    Thread[] threads = new Thread[threadGroup.activeCount()];  
    threadGroup.enumerate(threads);
```

这里的activeCount很明显就是取得活动的线程，注意。默认情况 下，连同其子线程组也会进行复制。

### 4、未捕获异常处理
ThreadGroup中有一个uncaughtException()方法。当线程组中某个线程发生Unchecked exception异常时，由执行环境调用此方法进行相关处理，如果有必要，可以重新定义此方法

## 二、应用实例

### 1、基础示例





``` java
package com.lhx.common.thread;

import java.util.Date;
import java.util.Random;
import java.util.concurrent.TimeUnit;

class Result {
    private String name;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

}

public class SearchTask implements Runnable {
    public SearchTask(Result result) {
        this.result = result;
    }

    private Result result;

    @Override
    public void run() {
        String name = Thread.currentThread().getName();
        System.out.println("Thread Start " + name);
        try {
            doTask();
            result.setName(name);
        } catch (InterruptedException e) {
            System.out.printf("Thread %s: Interrupted\n", name);
            return;
        }
        System.out.printf("%s :Thread end %s\n" ,new Date(),name);
    }

    private void doTask() throws InterruptedException {
        Random random = new Random((new Date()).getTime());
        int value = (int) (random.nextDouble() * 100);
        System.out.printf("%s :Thread %s: %d\n",new Date(), Thread.currentThread().getName(),
                value);
        TimeUnit.SECONDS.sleep(value);
    }

    public static void main(String[] args) {
        System.out.println("main thread start:");

        //创建5个线程，并入group里面进行管理
        ThreadGroup threadGroup = new ThreadGroup("Searcher");
        Result result = new Result();
        SearchTask searchTask = new SearchTask(result);
        for (int i = 0; i < 5; i++) {
            Thread thred = new Thread(threadGroup, searchTask);
            thred.start();
            try {
                TimeUnit.SECONDS.sleep(1);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
        //通过这种方法可以看group里面的所有信息
        System.out.printf("Number of Threads: %d\n", threadGroup.activeCount());
        System.out.printf("Information about the Thread Group\n");
        threadGroup.list();

        //这样可以复制group里面的thread信息
        Thread[] threads = new Thread[threadGroup.activeCount()];
        threadGroup.enumerate(threads);
        for (int i = 0; i < threadGroup.activeCount(); i++) {
            System.out.printf("%s:Thread %s: %s\n",new Date(), threads[i].getName(),
                    threads[i].getState());
        }

        waitFinish(threadGroup);
        //将group里面的所有线程都给interpet
        threadGroup.interrupt();

        System.out.println("main thread end:");
    }

    private static void waitFinish(ThreadGroup threadGroup) {
        while (threadGroup.activeCount() > 0) {
            try {
                TimeUnit.SECONDS.sleep(1);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }

}
```



输出：



``` java
main thread start:
Thread Start Thread-0
Thu Sep 28 21:45:32 CST 2017 :Thread Thread-0: 42
Thread Start Thread-1
Thu Sep 28 21:45:33 CST 2017 :Thread Thread-1: 31
Thread Start Thread-2
Thu Sep 28 21:45:34 CST 2017 :Thread Thread-2: 12
Thread Start Thread-3
Thu Sep 28 21:45:35 CST 2017 :Thread Thread-3: 3
Thread Start Thread-4
Thu Sep 28 21:45:36 CST 2017 :Thread Thread-4: 30
Number of Threads: 5
Information about the Thread Group
java.lang.ThreadGroup[name=Searcher,maxpri=10]
    Thread[Thread-0,5,Searcher]
    Thread[Thread-1,5,Searcher]
    Thread[Thread-2,5,Searcher]
    Thread[Thread-3,5,Searcher]
    Thread[Thread-4,5,Searcher]
Thu Sep 28 21:45:37 CST 2017:Thread Thread-0: TIMED_WAITING
Thu Sep 28 21:45:37 CST 2017:Thread Thread-1: TIMED_WAITING
Thu Sep 28 21:45:37 CST 2017:Thread Thread-2: TIMED_WAITING
Thu Sep 28 21:45:37 CST 2017:Thread Thread-3: TIMED_WAITING
Thu Sep 28 21:45:37 CST 2017:Thread Thread-4: TIMED_WAITING
Thu Sep 28 21:45:38 CST 2017 :Thread end Thread-3
Thu Sep 28 21:45:46 CST 2017 :Thread end Thread-2
Thu Sep 28 21:46:04 CST 2017 :Thread end Thread-1
Thu Sep 28 21:46:06 CST 2017 :Thread end Thread-4
Thu Sep 28 21:46:14 CST 2017 :Thread end Thread-0
main thread end:
```



### 2、统一异常处理实例





``` java
package com.lhx.common.thread;

public class ThreadGroupException {
    public static void main(String[] args) {
        ThreadGroup threadGroup1 =
                // 这是匿名类写法
                new ThreadGroup("group1") {
                    // 继承ThreadGroup并重新定义以下方法
                    // 在线程成员抛出unchecked exception
                    // 会执行此方法
                    public void uncaughtException(Thread t, Throwable e) {
                        System.out.println(t.getName() + ": " + e.getMessage());
                    }
                };
        // 这是匿名类写法
        Thread thread1 =
                // 这个线程是threadGroup1的一员
                new Thread(threadGroup1, new Runnable() {
                    public void run() {
                        // 抛出unchecked异常
                        throw new RuntimeException("测试异常");
                    }
                });

        thread1.start();
    }
}
```



输出

```
Thread-0: 测试异常
```

## 三、源码解读

### 1、首先看其包含的变量



``` java
public class ThreadGroup implements Thread.UncaughtExceptionHandler {  
    private final ThreadGroup parent;//父亲ThreadGroup  
    String name;//ThreadGroup 的名称  
    int maxPriority;//线程最大优先级  
    boolean destroyed;//是否被销毁  
    boolean daemon;//是否守护线程  
    boolean vmAllowSuspension;//是否可以中断  
  
    int nUnstartedThreads = 0;//还未启动的线程  
    int nthreads;//ThreadGroup中线程数目  
    Thread threads[];//ThreadGroup中的线程  
  
    int ngroups;//线程组数目  
    ThreadGroup groups[];//线程组数组  
```



说明：

(1)线程组也可以包含其他线程组。如上面的groups[].
(2)线程组构成一棵树，在树中，除了初始线程组外，每个线程组都有一个父线程组

### 2、构造函数



``` java
//私有构造函数  
private ThreadGroup() {   
    this.name = "system";  
    this.maxPriority = Thread.MAX_PRIORITY;  
    this.parent = null;  
}  
  
//默认是以当前ThreadGroup传入作为parent  ThreadGroup，新线程组的父线程组是目前正在运行线程的线程组。
public ThreadGroup(String name) {  
    this(Thread.currentThread().getThreadGroup(), name);  
}  
  
//构造函数  
public ThreadGroup(ThreadGroup parent, String name) {  
    this(checkParentAccess(parent), parent, name);  
}  
  
//私有构造函数  
private ThreadGroup(Void unused, ThreadGroup parent, String name) {  
    this.name = name;  
    this.maxPriority = parent.maxPriority;  
    this.daemon = parent.daemon;  
    this.vmAllowSuspension = parent.vmAllowSuspension;  
    this.parent = parent;  
    parent.add(this);  
}  
```



其终的调用构造函数只有一个，父线程组的 checkAccess 方法在checkParentAccess中会调用：

``` java
//检查parent ThreadGroup  
 private static void checkParentAccess(ThreadGroup parent) {  
     parent.checkAccess();  
     return null;  
 }  
```

未捕获异常设置：



``` java
    public void uncaughtException(Thread t, Throwable e) {
        if (parent != null) {
            parent.uncaughtException(t, e);//父线程组不为空，设置到父线程组  
        } else {
            Thread.UncaughtExceptionHandler ueh = Thread.getDefaultUncaughtExceptionHandler();
            if (ueh != null) {
                ueh.uncaughtException(t, e);
            } else if (!(e instanceof ThreadDeath)) {
                System.err.print("Exception in thread \"" + t.getName() + "\" ");
                e.printStackTrace(System.err);
            }
        }
    }
```



如果父线程组存在, 则调用它的uncaughtException方法.
如果父线程组不存在, 但指定了默认处理器 (下节中的As the default handler for the application), 则调用默认的处理器
如果默认处理器没有设置, 则写错误日志.但如果 exception是ThreadDeath实例的话, 忽略

### 3、线程组复制：





``` java
    //此线程组及其子组中的所有活动线程复制到指定数组中。  
    public int enumerate(ThreadGroup list[]) {
        checkAccess();
        return enumerate(list, 0, true);
    }

    //此线程组及其子组中的所有活动线程复制到指定数组中。  
    public int enumerate(ThreadGroup list[], boolean recurse) {
        checkAccess();
        return enumerate(list, 0, recurse);
    }

    //此线程组中的所有活动线程复制到指定数组中。如果 recurse 标志为 true，则还包括对此线程的子组中的所有活动线程的引用。如果数组太小而无法保持所有线程，则    
    // 忽略额外的线程。  
    private int enumerate(ThreadGroup list[], int n, boolean recurse) {
        int ngroupsSnapshot = 0;
        ThreadGroup[] groupsSnapshot = null;
        synchronized (this) {
            if (destroyed) {
                return 0;
            }
            int ng = ngroups;
            if (ng > list.length - n) {//防止list放不下线程数目  
                ng = list.length - n;
            }
            if (ng > 0) {
                System.arraycopy(groups, 0, list, n, ng);//复制线程组  
                n += ng;
            }
            if (recurse) { //取得其子组  
                ngroupsSnapshot = ngroups;
                if (groups != null) {
                    groupsSnapshot = Arrays.copyOf(groups, ngroupsSnapshot);
                } else {
                    groupsSnapshot = null;
                }
            }
        }
        if (recurse) {//复制子组  
            for (int i = 0; i < ngroupsSnapshot; i++) {
                n = groupsSnapshot[i].enumerate(list, n, true);
            }
        }
        return n;
    }
```



### 4、其他方法

int activeCount()：获取线程组中活动线程的数量
interrupt()：中断线程组中所有线程
isDaemon()：是否为后台线程组
setDaemon(boolean daemon)：设置为后台线程组
setMaxPriority(int pri)：设置线程组的最高优先级

## 四、线程池和线程组区别

## 线程组：

* 1.线程组管理线程，设置优先级，等属性，安全控制。
* 2.线程组必须从属于其他线程组，默认是系统主线程组。
* 3.将线程加入到线程组需要先创建线程组对象，将其作为线程构造函数参数。
* 4.List（）输出线程树，enumerate（）复制线程组中所有线程到一个线程数组中

　　线程组存在的意义，首要原因是安全。java默认创建的线程都是属于系统线程组，而同一个线程组的线程是可以相互修改对方的数据的。但如果在不同的线程组中，那么就不能“跨线程组”修改数据，可以从一定程度上保证数据安全。

线程池：是为了管理线程的生命周期，复用线程，减少创建销毁线程的开销。

　　线程池存在的意义，首要作用是效率。
　　线程的创建和结束都需要耗费一定的系统时间（特别是创建），不停创建和删除线程会浪费大量的时间。所以，在创建出一条线程并使其在执行完任务后不结束，而是使其进入休眠状态，在需要用时再唤醒，那么 就可以节省一定的时间。
　　如果这样的线程比较多，那么就可以使用线程池来进行管理。保证效率。

　　一般情况下，线程越多占用内存也越大，并发量也越大。

### 线程组和线程池共有的特点：
　　1,都是管理一定数量的线程
　　2,都可以对线程进行控制---包括休眠，唤醒，结束，创建，中断（暂停）--但并不一定包含全部这些操作。


## 参考文章
* https://www.cnblogs.com/bjlhx/p/7609073.html