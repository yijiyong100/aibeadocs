---
title: 并发编程-综合介绍
---

## Java高级知识篇【Java并发编程综合介绍】

::: tip
本文主要是介绍 Java并发编程综合介绍 。
:::

[[toc]]
## 基本概念

**线程和进程**

- 概念

  - 操作系统是包含多个进程，进程包含多个线程（至少一个）。
  - 进程：unix环境，运行的程序，是系统资源分配的基本单位，包括文件/网络句柄（共享）、内存（隔离）、用户id等。
  - 线程：cpu的基本调度单位，每个线程执行的都是进程代码的某个片段。包括栈、PC（指向自己代码所在的内存）、TLS(Thread Local Storage)

- 区别

  - 起源：先有进程后有线程，由于输入设备较慢，为了充分利用cpu资源而产生线程。
  - 概念：进程是资源分配基本单位；线程是cpu调度基本单位
  - 通信：进程间通过IPC；同一进程内的线程可以通过读写同一进程内的数据实现通信
  - 资源：线程使用进程内的资源，线程间的共享资源，如进程代码段，不共享的如各自的堆栈。
  - 开销不同：线程的创建、终止、切换、共享内存和文件资源都更轻量（进程间需要通过内核帮忙）

  java 在设计之初就支持多线程，而且可以一对一映射到操作系统的内核线程。

**多线程**

原因：单线程效率能够满足自然不用考虑多线程。多线程主要为了提高CPU利用率（发挥多核作用、避免无效等待）、便于编程建模（任务拆分）、性能定律（阿姆达尔定律：处理器多，其对程序效率的提高取决于程序的并行任务比例）。

场景：同时做多件事、提高效率、大并发量

局限：上下文切换消耗、异构化任务（任务都不一样）难以并行、线程安全问题（数据准确、活跃性问题）。

**并发、高并发**

并发性：与串行性相对应，不同的部分可以无序或同时执行而不影响结果。

高并发是一种状态，多线程是解决的方法之一。

QPS、带宽、PV、UV、并发连接数（大于同时在线的用户数）、服务器平均请求等待时间

**同步异步、阻塞非阻塞**

同步与异步：被调用方是否提醒，有提醒为异步

阻塞和非阻塞：调用方是否可以在结果出来前做别的事

## 核心知识

### 实现多线程

**本质构造 Thread 一种**

一般不用 Thread：1）从解耦角度，run应该和类本身的创建分开，Thread是将run()进行重写，Runnable则调用传入对象的方法；2）它用的是继承而非实现；3）不能借助线程池

Oracle说有两种，但从本质上来说只有一种方法创建线程，就是构造Thread类，而执行线程有两种方法，分别是Runnable，将Runnable对象传递给Thread类的run方法调用Runnable的run方法，Thread重写run方法并执行。如果从代码表面实现来看，则有很多种，比如线程池、匿名内部类、lambda、计时器等。

线程再多也就百级别，因为线程本身就消耗资源，再提高应该考虑异步。
>
对于IO密集型操作，多线程提升效果不大，重点是提高并发度（异步）

### 启动

**使用start**

start涉及两个线程：主线程和子线程。主线程执行start实际上是告诉jvm有空时创建子线程去执行。当上下文、栈、pc等资源准备后（就绪状态），等待cpu资源，之后才执行。

start不能重复调用，比如当第一个start执行后，线程进入end，此时就不能调用start重新启动了。源码来看，start一开始会判断线程状态是否为0，即未启动状态，然后把线程加入线程组，调用start0方法，并修改started状态。

start是让JVM创建线程去执行run，而直接调用run，则是由main来执行run

### 停止

**使用interrupt通知而非强制**。因为执行的线程本省更清楚如何来停止。

线程停止情况：正常执行完或者出现异常停止，其占据的资源会被JVM回收。

当线程在 sleep 等可响应中断的方法中被 interrupt，会抛异常。如果能保证 sleep 时收到 interrupt，就可以不使用 isInterrupted 判断。例如迭代中有 sleep，则不需要在迭代的条件中添加 isInterrupted。线程一旦响应中断就会把 isInterrupted 标记清除，所以如果在 while 里 try-catch sleep，是无法停止线程的。

``` java
响应中断的方法：
wait()
sleep()
join()
BlockingQueue.take()/put()
Lock.lockInterruptibly()
CountDownLatch.await()
CyclicBarrier.await()
Exchanger.exchange()
InterruptibleChannel相关方法
Selector相关方法
```

interrupt 之所以能够停止阻塞，是因为底层调用的是 cpp 代码，那涉及到操作系统层面的操作。

在开发中，如果 run 函数中调用一个方法，这个方法的异常不应该在这个方法内 catch，而是应该抛出，让调用方来觉得怎么处理。如果方法的编写者自己想做些处理，可以 catch，但在处理完后要 interrupt，这样调用方才能检查到 interrupted。在 run 方法中已经不能往上抛异常了。

直接调用stop方法，解锁已锁定的所有监视器，强制终止线程而非完成再终止。

suspend和resume已经被弃用，因为挂起线程时带上锁，容易出现死锁。

使用 volatile 加 标记变量 并不能很好的停止线程，因为在线程阻塞时不能抛异常，进而判断终止。

``` java
static boolean interrupted() 判断后会清除 interrupted 标记。判断的是当前主线程而不是调用者
boolean isInterrupted() 不会清除
```

面试回答：正确停止线程的方法是 interrupt请求，这样能够保证任务正常中断。但这个方法需要请求方（发送interrupt）、被请求方（适当时候检查isInterrupted或处理InterruptedException）、子方法被调用方（抛出异常或者自己处理后再恢复interrupted）互相配合。对于interrupt无法中断的阻塞，那就只能根据不同的类调用不同的方法来中断，比如 ReentrantLock.lockInterruptibly()

### 线程状态

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/java/thread/conintro-1.png')" alt="wxmp">

java runnable 对应系统的 ready 和 running。右边三种都是阻塞状态，它跟长时间运行的方法不同在于返回时间不可控。实际上，waiting 可以到 blocked（刚被唤醒），waiting 和 timed_waiting 可以到 terminated（出现异常）

Block：线程请求锁失败时进入阻塞队列，该状态线程会不断请求，成功后返回runnable

Waiting：调用特定方法主动进入等待队列，释放cpu和已获得的锁，等待其他线程唤醒

Timed_waiting：timeout 时自动进入阻塞队列。

sleep仅放弃cpu而不释放锁

wait和notify必须配套使用，即必须使用同一把锁调用。调用wait和notify的对象必须是他们所处同步块的锁对象。

### 重要方法

wait 让当前线程（不管是谁调用）进入阻塞并释放 monitor，只有调用该对象的 notify 且刚好是本对象本唤醒、notifyAll、interrupt、wait的timeout、interrupt，才会被唤醒。如果遇到中断，则会释放掉 monitor。wait、notify、notifyAll只能在 synchronized 代码块或方法中使用，这是为了防止准备执行wait时被切换到notify，结果切换回来执行wait后就没有人notify了。而 sleep 只针对自己，并不需要配合，所以不需要在 synchronized 中。另外，代码处于 synchronized，意味着即便已经调用 notify/notifyAll，monitor仍要等到执行完 synchronized 部分才会被释放。而此时被唤醒的线程就会进入 Blocked 状态。

wait、notify、notifyAll的调用都必须先有 monitor，即进入 synchronized，这是一个锁级别的操作，粒度更细，所以定义在 Object 下（对象头就有锁状态）。功能实际上比较底层，使用 condition 更方便。持有多个锁的时候注意防止死锁。

不要用 Thread 的 wait，因为 Thread 在退出时会自动调用 notify，这样会打乱自己原来的设计。

Sleep 方法可以让线程进入 Waiting 状态，不占用 cpu 资源，但不会释放锁（synchronized 和 lock），知道规定时间后再执行，如果休眠被中断，会抛出异常，清除中断状态。

wait/notify 和 sleep 的比较：相同在于阻塞、响应中断，不同在于同步方法、释放锁、指定时间、所属类。

```java
synchronized (lock) {
  lock.notify(); // 如果 直接 notify，会出现 IllegalMonitorStateException 
  lock.wait();
}
public synchronized void method(){
    wait(); // 实际上是 this.wait();
    notify();
}

public Class Test{
 public static synchronized void method（）{
    Test.class.notify();
 }
}
```

join：新的线程加入我们，所以我们要等待它执行完再出发。主线程等待子线程。主线程执行子线程.join时，catch 中加上子线程.interrupt。主线程执行join时处于 wait 状态。join的源码中是借助 wait 实现的，而 notify 是依赖 jvm 实现，即上面提到的每个 Thread 执行完都会调用 notifyAll 方法。

```java
thread.join();
// 上下效果一样
synchronized (thread) {
  thread.wait();
}
```

yield 释放 cpu 时间片，但不会释放锁，仍是 running，随时可能被再次执行。但 jvm 并不保证遵循这个原则，所以自己开发中一般不用 yield，但并发包里面用得不少。

### 线程

编号：系统用、自增（从1开始，因为是 ++num）。除了 main 线程外，jvm还自动创建其他线程，所以马上建立的main外线程不是2

Thread Group(main, ...), Finalizer（执行对象finalize方法）, Reference Handler（GC、引用相关线程）, Signal Dispatcher（把操作系统信号发给程序）

名称：可以随时修改

是否为守护线程：为用户线程提供服务，如果只剩下守护线程，jvm就会停止。线程默认继承父线程（用户或守护），可以把用户线程改为守护线程，但没必要。通常守护线程都是由jvm启动的，jvm启动时会先启动 main。

对比守护和普通：整体无区别，唯一区别在于是否影响jvm退出

优先级：10个级别，默认5。子线程会继承。程序设计不应该依赖优先级，不同的操作系统对优先级的定义是不一样的。

操作系统优先级的级别和java的不一致，而且系统有可能有越过优先级的分配资源的功能，这样优先级就无效了。低优先级甚至有可能饿死。

### 子线程的异常

子线程出现的异常，主线程难以感知（子线程抛异常，主线程照样执行），其异常在主线程无法用传统方法捕获。

处理方法：UncaughtExceptionHandler 来实现全局的子线程异常捕获

``` java
Thread.setDefaultUncaughtExceptionHandler(handler);
```

ThreadGroup本身实现了UncaughtExceptionHandler，子线程继承自它，所以子线程会调用它实现的uncaughtException，该方法不停地调用父类的uncaughtException，直到父类为null，然后看是否设置了uncaughtExceptionHandler，有的话调用，没有就输出栈信息。
>
run方法本身不能抛异常。

### 并发安全问题

当多个线程访问一个对象时，如果不用考虑这些线程在运行时环境下的调度和交替执行，也不需要进行额外的同步，或者在调用方进行任何其他的协调操作，调用这个对象的行为都可以获得正确的结果，那这个对象就是线程安全的。

本质是资源竞争，一些场景有

- a++：两个线程各自给同一个变量做加法，结果会比预定的要小。因为某个线程a取数加1，但还没写回内存，其他线程就进行读取，获得还没加1的结果，而在此基础上加1就会漏掉线程a的。

- 活跃性问题：死锁、饥饿

- 对象发布和初始化

  对象能够被发布的情况：public、方法返回、方法参数传入。

  逸出：方法返回一个private对象；还没完成初始化。

  解决方法

  - 每次返回private对象时，都新建一个副本，而不是直接给对象。
  - 监听者模式中，通过工程方法，保证 listener 构造方法执行完后再进行注册，最后才把 listener返回。

总结性提醒：

- 共享变量或资源，如对象属性、静态变量、共享缓存、数据库
- 所有依赖时序的操作，即便每一步都是线程安全的都有问题，例如read-modify-write（a++）、check-then-act
- 数据间的绑定关系，例如ip和端口号
- 使用第三方类时调研其线程安全性

性能问题：

- 调度：
  - 上下文切换：挂起进程/线程，把进程/线程状态放到内存某处，加载下一个进程/线程的状态到寄存器，最后转跳到程序计数器所指向的位置。
  - 缓存开销：缓存失效
  - 密集切换场景：抢锁、IO
- 协作：内存同步（synchronized、volatile等会禁止编译器的一些优化、cpu缓存失效）

JVM优化包括指令重排、消除不必要的锁

## Java内存模型

### JVM内存结构 vs Java 内存模型 vs Java对象模型

jvm内存结构：和jvm的运行时区域有关

java内存模型：和java的并发编程有关

java对象模型：和java对象在jvm中的表现形式有关

详细看《New Job Interview Part 1》和《开发拾遗》

### JMM

C语言不存在内存模型，依赖处理器，而处理器不同硬件有不同实现，结果相同代码有不同的运行效果。JMM就是为了解决这种不一致而产生的统一的一组规范，各JVM开发者都需要遵循。volatile、synchronized、Lock等原理都是JMM。有了JMM，java开发者就可以通过同步工具和关键字开发并发程序。

### 重排序、可见性、原子性

**重排序**

出现情况：jit翻译、jvm解释、cpu重排

对于小概率事件，可以通过死循环，直到出现小概率事件才退出，进而证明小概率的存在。

**可见性**

各线程的本地缓存是相互不可见的，只能通过主内存来共享信息，所以可见性的根本原因是多级缓存的存在。volatile 能够保证线程读取前，在其他线程本地缓存中修改的值flush到主内存。

JMM对多级缓存和内存进行了抽象，出现本地内存（working memory）、buffer、主内存。

Happens-before：前一个操作的结果能够被后一个操作看到，那就符合 happens-before。符合这个原则的情况有：

- 单线程：前一条代码的操作结果会被下一条代码看到
- 锁操作（synchronized和Lock）：前一个释放锁的线程的操作会被下一个获得锁的线程看到
- volatile：前一个线程的写操作会被下一个线程的读操作看到。注意，这让 volatile 有一个近朱者赤的作用，比如 a = 1; b = a，如果b加了 volatile，那么读线程一定能看到a的变化。
- 线程启动：thread.start()可以看到前面已经执行的结果（与单线程情况类似）
- join：threada.join()后面的肯定可以看到前面的操作的结果
- 传递性原则（与单线程类似）
- 中断：一个线程被其他线程中断，那么isInterrupted或者抛出InterruptedException一定能看到。
- 工具类：
  - 线程安全容器的get肯定能看到之前put的结果
  - CountDownLatch、Semaphore、CyclicBarrier、Future、线程池

例题

``` java
# thread1
x=1
y_read=y
# thread2
y=1
x_read=x
# 有可能 t1 和 t2 得到 y_read=0、x_read=0，由于乱序和可见性。

通过 object == null 来判断是否加锁时，要用 volatile object，否则 object 在锁代码块中进行实例化，分为分配内存、初始化变量、变量覆盖到内存，这几步有可能让锁外面的线程获得没有构建好的object 
```

## 锁的安全问题

数据库中有些有检测并放弃事务来解决死锁的功能，但JVM中并没有自动处理的功能，压力测试也不能找出所有潜在的死锁。

产生原因：竞争资源/调度顺序不当

找死锁的方法：jstack pid、MXBean

条件与解决：

- 互斥条件（有锁）：一般无法破除，除了设计初期
- 请求保持：一次性申请所有资源。（有时影响范围较大）
- 环路等待：
  - 资源按照队列线性申请：起点相同，例如统一加锁顺序，比如规定对唯一id小的先加锁，如果相同，再抢一把备用锁
  - 异类：哲学家问题里，加入一个先拿又筷再拿左筷的人
  - 中介检查与恢复：
    - 终止：线程按照优先级，例如重要性、已占用资源、运行时间等，来终止
    - 抢占：线程回退，放弃资源
- 不可剥夺：当进程申请的资源得不到满足，必须释放占有的资源；有一个中介做分配。或者超时释放。

对于线上死锁，防范于未然是必须的，之后一旦发现，先保存案发现场，重启服务，然后根据案发现场的信息查找原因，修改代码，重新发布。

开发中注意：

- synchronized不具备尝试锁能力，可以通过 Lock 的 tryLock(timeout) 来实现。一旦超时，发日志，报警。
- 多使用并发类而不是自己写底层的锁，例如atomic包下效率一般比Lock高。
- 尽量降低锁的粒度，例如如果使用同步代码块，就不使用同步方法；专锁专用
- 避免锁嵌套
- 分配资源前看能不能回收。

典型算法：银行家算法，现用「所需资源」-「已有资源」=「差距资源」，然后通过「剩余资源」去配对每个「差距资源」，「剩余资源」大于「差距资源」的，优先分配，待分配完的进程执行完后归还资源，然后再重新分配。

**活锁**：线程在运行，但是一直得不到进展，消耗cpu资源。解决方法：

- 往重试机制加入随机因素
- 对于消息队列的重试，可以先把数据放到发送队列的末尾；设置重试限制，超过限制的写入数据库。一旦数据库收到这些信息，会触发告警，而且定期会把数据库的这些信息尝试进行同步。

**饥饿**：线程始终得不到cpu资源。解决方法：避免持有锁而一直不释放、不要设置优先级

## 并发工具

### 线程池

好处：加快响应速度（避免不停的创建和销毁）；合理利用CPU和内存（循环利用）；统一管理（提供一些统计信息）

场景：服务器，或者5个线程以上的情况

**原理解析**

线程池的7个属性：

- corePoolSize：假设是a，那么同时来了b个任务（b<a），则线程池会创建出b个线程，之后这b个就成固定不会被回收，成了最小线程数
- MaximumPoolSize
- keepAliveTime和unit决定buffer的线程没工作时维持多久
- workQueue：任务队列，来不及执行的任务，满了才在 corePoolSize 的基础上增加（如果没有超过 MaximumPoolSize 的话）。选择 SynchronousQueue 相当于没有队列，选择 LinkedBlockingQueue 相当于无界队列，选择 ArrayBlockingQueue 有界
- threadFactory新建woker线程，即这个线程池维护的线程，并进行一些属性设置，比如线程名，优先级等等，handler任务装满队列，且线程数已经达到最大值时的策略，默认报错

数量设置：一般IO密集型，core5倍以上，CPU密集型，core的一到两倍。一般公式 `core_num * (1+avg_waiting_time/avg_working_time)`，更具体就需要压测。
>
其他策略：
.AbortPolicy:丢弃任务并抛出RejectedExecutionException异常。
.DiscardPolicy：也是丢弃任务，但是不抛出异常。
.DiscardOldestPolicy：丢弃队列最前面的任务，然后重新尝试执行任务（重复此过程）
.CallerRunsPolicy：由调用线程处理该任务

execute的执行步骤：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/java/thread/conintro-2.png')" alt="wxmp">

线程池如何实现线程复用？底层会创建 worker，其实现 runnable，但组合了 Thread，所以可以调用 run 方法，实际是调用 runWorker，里面先把 worker 的 task 取出，然后实现这个 task 的 run 方法

**线程池状态**

- running
- shutdown：不接受新任务，但处理排队任务
- stop：不接受新任务，也不处理排队任务，并中断正在进行的任务
- tidying：所有任务已经终止，线程数变为零，并执行 terminate 钩子方法
- terminated：terminate运行，等待被回收了

**内置线程池**

默认线程池的弊端：newSingleThredExecutor、newFixedThreadPool中的Queue是Integer最大值，newCachedThreadPool中的maximumPoolSize是Integer最大值，都可能OOM

ScheduledThreadPool 里面使用 DelayedWorkQueue，对于一些定时任务可以考虑使用。

**使用**

```java
//runnable
ExecutorService pool = Executors.newxxxThreadPool(); //Scheduled可以指定执行的延迟，速率等。
Runnable command = new MyRunnable();
pool.execute(command);//.submit配合future使用
pool.shutdown();// 进入停止状态，即不再接收任务（新提交会抛异常），里面所有线程执行完才结束线程池。
pool.isShutdown(); // 是否进入 shutdown 状态
pool.isTerminated(); // 是否都执行完了
pool.awaitTermination(); // 阻塞，等待一段时间，一旦发现已经 terminated，就返回true，超过时间就返回 false，被中断也会返回 false
shutdownNow(); // interrupt正在执行的任务，队列中的任务返回出一个List<Runnable>，需要做相应处理

// 钩子：重写 beforeExecute 和 afterExecute 来增加功能，比如日志、统计

// 生产中，线程池最好还是自己定义，这里就涉及 任务队列、线程工厂 和 拒绝策略 的实现
  

//callable
ExecutorService pool = Executors.newxxxThreadPool();
List<FuturefutureList = new ArrayList<>();
for(int i=0; i<20; i++){
    Callable<Integertask = new MyCallable();
	Future future = pool.submit(task);
    futureList.add(future);
}
for(Future<Integerf: futureLIst){
    Int res = future.get();//等线程执行完毕后才有，并继续执行。
}
pool.shutdown()；

//监控方法
getTaskCount, getCompletedTaskCount, getPoolSize（当前线程数）, getActiveCount()
```

### ThreadLocal

**场景**

- 每个线程需要一个独享的对象，通常是工具类，例如 SimpleDateFormat和Random。
- 每个线程内需要保存全局变量，例如拦截器中获取的用户信息，可能很多地方都用得上，而这些信息如果在各个地方都传递，会很麻烦。

**使用**

- 设置初始值：
  - initValue：初始化不依赖外部参数的。实际第一次 get 时才执行。
  - set：需要外部参数的
- 取值：get，如果执行 remove，之后的 get 会重新初始化

**原理**

每个 Thread 都有一个 ThreadLocalMap，里面存储多个 `Entry<ThreadLocal<?>, T>` 对象。当调用 ThreadLocal 实例的 get 时，会先获取执行这个方法的线程的 ThreadLocalMap，没有的话执行初始化，把 initialValue 产生的 value 组装成 entry 加入 map。`ThreadLocal<?>` 作为 key，通过内存地址来判断是否重复。

**开发注意**

- 内存泄漏：由于 entry 中的 key 是弱引用，而 value 是强引用，value 在 Thread 不断被复用的时候，即便 ThreadLocal 不再使用，value 也是不能被回收的。为了 value 能够顺利被回收，防止内存泄漏，当 ThreadLocal 不再需要时要主动调用 remove 方法。例如上面场景2中，可以通过拦截器在请求退出时调用 remove。
- 自动拆箱的空指针：如果方法返回的是包装类，但结果是 null，而方法的返回是对应的基本类型，那么就会出现空指针异常。所以方法返回类型要留意。
- 尽量用框架本身的方法，比如 Spring 的 RequestContextHolder，它本身就是使用 ThreadLocal 的，而且避免我们忘记 remove。

### Lock

最常见是 ReentrantLock，只允许一个线程访问共享资源。

**synchronized的不足**

- 代码块中途不能退出，除非用 wait
- 不能设置超时
- 锁条件单一（某个对象）
- 无法知道是否成功获取到锁

**使用**

lock：使用 lock 时，无论怎样都要用 try-finally。lock不能被中断，一旦陷入死锁就永久等待。

tryLock：可设置超时，lockInterruptibly 相当于 timeout 设置为无限。

**分类**

- 是否锁资源
  - 乐观（非互斥同步锁）：CAS，例如原子类、并发容器、GitHub
    - 优劣：不停重试耗费资源
    - 场景：并发写少，锁持有时间短，大部分是读
  - 悲观（互斥同步锁）：synchronized （jvm优化后部分乐观）和 Lock
    - 优劣：阻塞和唤醒有性能劣势，比如用户态/系统态、上下文切换、检查是否需要唤醒等；可能永久阻塞；优先级反转（低优先级获得锁了）
    - 场景：并发写多，锁持有时间较长（代码负责，有循环）
- 是否可以共享一把锁：通常出现在读写锁，ReentrantReadWriteLock，多读或者一写。读操作插队提高效率，但为了避免写饥饿，ReentrantReadWriteLock 默认是队列头节点为写锁时禁止读插队，写是一直可插队的。写锁降级：一个操作写完后是读取，但不想一直持有写锁，所以希望写完后降级为读锁。ReentrantReadWriteLock 允许释放写锁前获得读锁，但不能在释放「所有」读锁前获得写锁。
  - 共享锁：
  - 独占锁
- 竞争时是否排队
  - 公平：排队
  - 非公平：合适时机尝试插队，失败后排队。非公平主要想利用正在排队的线程被唤醒时的空档期，让后来的、已是运行状态的线程马上执行。ReentrantLock 默认策略；tryLock只要发现有锁就马上获取，不会排队，即便设置了公平
    - 优劣：性能好，但可能产生饥饿线程
- 同一线程是否可以重复获取同一把锁（底层通过AQS）
  - 可重入：
    - 优劣：避免重新获取锁时出现死锁；提高封装性，避免重复的上解锁
    - 场景：递归处理资源。
    - 使用：ReentrantLock 的相关方法，有getHoldCount, getQueueLength, isHeldByCurrentThread等方法，但线上用得少
  - 不可重入
- 是否可中断
  - 可中断锁：tryLock、lockInterruptibly
  - 不可中断锁：synchronized
- 等待锁过程
  - 自旋锁：不停尝试获得。
    - 场景：并发不高的场景，临界区小（获取锁后执行的时间短），效率比阻塞高
  - 非自旋锁：失败阻塞，直到被唤醒

**锁的优化**

- JVM：
  - 自旋锁和自适应：不会一直自旋，而且每次自旋的次数都可能调整
  - 锁消除：内部判断锁是否有必要
  - 锁粗化：多次获得的都是相同的锁，那就有可能只获取一次，最后才释放
- 开发：
  - 缩小同步代码块
  - 尽量不要锁方法
  - 通过消息队列等方式把多个并行任务交给一个线程/进程处理来减少锁的消耗
  - 避免人为制造“热点”，例如hashmap维护一个size变量，避免查看size时去遍历，导致其他线程的写阻塞
  - 避免内嵌锁
  - 使用合适的并发工具

### 原子类

**优劣**（相比于锁）：粒度更细，但高度竞争时效率不高

大体类别：primary、array、reference、fieldupdater、adder、accumulator

**reference**：将引用的替换变为原子

**fieldupdater**：某个类的某个属性升级为原子，而且可以选择是否进行原子加减。具体例子查看learning_thread的atomic包

**adder**：比primary的increment效果好。本质是空间换时间，把不同线程对应到不同的cell上进行修改，降低冲突概率，使用多段锁保证安全。内部有一个base变量和Cell数组，如果竞争不激烈，直接累加到base，如果竞争激烈，各个线程分散累加到自己的Cell[x]中（hash）。最后sum显示当前结果，即base和cell的总和，但由于没有加锁，实际上的结果并非是快照。

**accumulator**：比adder更通用，适合并行计算场景，结合线程池。不过jdk8的并行流或许更好。

**底层原理CAS**

compare and set：通过比较内存的值是否与预期的值相等来判断是否对内存的这个值进行更新。这个比较过程是CPU指令级别来保证原子性的。具体来说，Java 是通过它的 Unsafe 类来实现的，这个类包含不少 native 方法来调用操作系统的 api。

场景：乐观锁、并发容器（concurrentHashMap）、原子类

### final(略)

### 并发容器

历史抛弃：Vector、Hashtable、Collections.synchronizedList()

HashMap线程不安全的原因：

- 数据丢失原因：并发赋值时被覆盖（table[index]=new entry）、已遍历区间新增元素会丢失（transfer迁移数据时一些新增元素加到了已经遍历的槽上）、新table被覆盖（刚table = newtable，并插入元素，然后其他线程有执行table = newtable）等
- 死链原因（jdk7）：不同线程扩容时对共享的旧table的同一slot上的链表进行修改时，使得entry的连接形成环，导致后来的put、get、transfer等操作遍历该就table链时出现死循环。

ConcurrentHashMap原理：


- put：
<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/java/thread/conintro-3.png')" alt="wxmp">

  上面的「锁住该槽」指锁住数组中的 Node

- get：计算hash，直接取值 or 红黑找 or 遍历链表找

不能用get、++、put，要直接用 replace

CopyOnWrite适合读多写少，例如黑名单、每日更新。和读写锁的区别是读和写不互斥，但读会有延迟。CopyOnWrite 可以在遍历的时候修改集合元素，因为修改的对象和遍历的对象是不一样的。每次写都会创建出一个新的对象。

并发队列：

```
重要方法：
put、take：满或者空会阻塞
add、remove、element：会抛异常，element返回头元素，空抛异常
offer、poll：offer返回boolean，poll会删除，都可阻塞
peek：peek不会删除
```

ArrayBlockingQueue：指定容量，可以选择是否公平。

LinkedBlockQueue：take和put分为两把锁

PriorityBlockingQueue：自然顺序（非先进先出）

SynchronousQueue：容量为0

ConcurrentLinkedQueue：非阻塞队列

选择：容量不变/节省内存 ArrayBlockingQueue，容量可变 LinkedBlockQueue，是否需要排序，并发性

### 线程同步类

下面类基本淘汰了Object的wait、notify方式

CountDownLatch：经典是多等一或者一等多，但多等多也是可以的。针对事件，countdown并不会阻塞线程，不能复用，需要新建。

Semaphore：适合资源有限的限流场景，比如网关。类似轻量级的CountDownLatch。这个类更加注意公平，因为基本都是应对任务堆积的场景。

Condition：一个lock可以对应多个条件，所以更加灵活。

CyclicBarrier：针对线程的，因为调用的是await，可以复用

### AQS

AbstractQueuedSynchronizer 是 jdk 中很多并发工具类的框架类，例如 ReentrantLock、Semaphore、CountDownLatch 等。这些类的内部会有一个静态内部类继承自AQS。它负责线程状态的原子性管理、线程的阻塞和重启、线程队列管理。

AQS的三大核心：

- State：一个通过 CAS + volatile 实现安全并发增减的 int，不同并发类有不同含义。
- Deque（双向链表）：线程队列
- 获取和释放方法：不同并发类有不同含义。获取会先检查 State，符合条件才成功获取，并修改 State。释放相反。

https://juejin.im/post/5c11d6376fb9a049e82b6253

https://mp.weixin.qq.com/s/sA01gxC4EbgypCsQt5pVog

### Future

runnable 的 run 方法的返回值是 void 且没有定义能够抛出异常。正常来说，实现 run 方法的人更清楚这个任务会出什么异常，所以在 run 里面就把异常处理好是更好的选择。

使用 Future，实现一个 Callable 接口

- 给线程传入这个类的实例就能返回 Future 实例了。
- 用 FutureTask 来包装这个实例，然后把 futuretask 交给线程执行。之后就能调用 futuretask 的方法了

```java
future 接口的方法
boolean cancel(boolean mayInterruptIfRunning); // 如果清楚任务能够处理好 interrupt，可以用 true
boolean isCancelled();
boolean isDone();
V get() throws InterruptedException, ExecutionException;
V get(long timeout, TimeUnit unit) throws InterruptedException, ExecutionException, TimeoutException;
```

批量使用，定义一个 `List<Callable<U>>` 集合，然后交给executor，调用invokeAll，然后 block，直到所有任务完成。executor.invokeAll则只对最先完成的一个任务做处理，其他取消。下面则不需要等所有完成，可以提前对已完成的做处理。

```java
ExecutorCompletionService service
 	= new ExecutorCompletionService(executor);
for (Callable<Ttask : tasks) service.submit(task);
for (int i = 0; i < tasks.size(); i++) {
	Process service.take().get()
	// Do something else
}
public static CompletableFuture<StringreadPage() {...}
public static List<StringgetLinks(String content) {...}
CompletableFuture<Stringcontents = readPage();
CompletableFuture<List<URL>links = contents.thenApply(Parser::getLinks);
```

当 contents 完成时，getLinks 就会被另一个线程调用。thenCompose 用于组合 `T -CompletableFuture<U和 U-CompletableFuture<V为 T -CompletableFuture<V>`。其他一些方法可以让一组future执行，只要有一个执行成功就放弃其他的。

## 参考文章
* https://www.cnblogs.com/code2one/p/12900645.html