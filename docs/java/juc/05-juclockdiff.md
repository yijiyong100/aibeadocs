---
title: JUC-锁-比较
---


::: tip
本文主要是介绍 JUC-锁-比较 。
:::

[[toc]]

# [002-多线程-锁-同步锁-synchronized几种加锁方式、Java对象头和Monitor、Mutex Lock、JDK1.6对synchronized锁的优化实现]

## 一、synchronized概述基本使用

　　为确保共享变量不会出现并发问题，通常会对修改共享变量的代码块用`synchronized`加锁，确保同一时刻只有一个线程在修改共享变量，从而避免并发问题。

　　synchronized结论：

　　　　1、java5.0之前，协调线程间对共享对象的访问的机制只有synchronized和volatile，但是内置锁在功能上存在一些局限性，jdk5增加了Lock以及ReentrantLock。

　　　　2、java5.0，增加了一种新的机制：显式锁ReentrantLock，注意它并不是替代内置锁synchronized的机制，而是当内置锁不适用时，作为一种可选的高级功能。

　　　　3、jdk6之后，synchronized与java.util.concurrent包中的ReentrantLock相比，由于JDK1.6中加入了针对锁的优化措施，使得synchronized与ReentrantLock的性能基本持平。ReentrantLock只是提供了synchronized更丰富的功能，而不一定有更优的性能，所以在synchronized能实现需求的情况下，优先考虑使用synchronized来进行同步。 

　　　　synchronized在JDK5之前一直被称为重量级锁，底层是使用操作系统的mutex lock实现的，是一个较为鸡肋的设计，而在JDK6对synchronized内在机制进行了大量显著的优化，加入了CAS，轻量级锁和偏向锁的功能，性能上已经跟ReentrantLock相差无几，而且synchronized在使用上更加简单，不易出错（避免哲学家就餐问题造成的死锁），因此如果仅仅是为了实现互斥，而不需要使用基于Lock的附加属性（中断、条件等），推荐优先使用synchronized。

## 1、synchronized的几种加锁方式以及基础说明

 

| 修饰内容     | 锁类型     | 示例  |
| ------------ | ---------- | ----- |
| 没加锁       | 没加锁     | 示例1 |
| 修饰代码块   | 任意对象锁 | 示例2 |
| 修饰普通方法 | this锁     | 示例3 |
| 修饰静态方法 | 类锁       | 示例4 |

## 1.1、示例以及说明

### 示例1、没有`synchronized`加锁

``` java
public class NoSynchronizedDemo {
    public void method() {
        System.out.println("Method 1 start");
    }
}
```

查看核心字节码





``` java
  public void method();
    descriptor: ()V
    flags: ACC_PUBLIC
    Code:
      stack=2, locals=1, args_size=1
         0: getstatic     #2                  // Field java/lang/System.out:Ljava/io/PrintStream;
         3: ldc           #3                  // String Method 1 start
         5: invokevirtual #4                  // Method java/io/PrintStream.println:(Ljava/lang/String;)V
         8: return
      LineNumberTable:
        line 5: 0
        line 6: 8
      LocalVariableTable:
        Start  Length  Slot  Name   Signature
            0       9     0  this   Lcom/lhx/cloud/javathread/NoSynchronizedDemo;
```



### 示例2、同步方法块，锁是括号里面的对象



``` java
public class SynchronizedDemo {
    public void method() {
        synchronized (this) {
            System.out.println("Method 1 start");
        }
    }
}
```



查看字节码





``` java
  public void method();
    descriptor: ()V
    flags: ACC_PUBLIC
    Code:
      stack=2, locals=3, args_size=1
         0: aload_0
         1: dup
         2: astore_1
         3: monitorenter
         4: getstatic     #2                  // Field java/lang/System.out:Ljava/io/PrintStream;
         7: ldc           #3                  // String Method 1 start
         9: invokevirtual #4                  // Method java/io/PrintStream.println:(Ljava/lang/String;)V
        12: aload_1
        13: monitorexit
        14: goto          22
        17: astore_2
        18: aload_1
        19: monitorexit
        20: aload_2
        21: athrow
        22: return
```



可以看在加锁的代码块， 多了个 `monitorenter` , `monitorexit`

monitorenter

　　每个对象有一个监视器锁（monitor）。当monitor被占用时就会处于锁定状态，线程执行monitorenter指令时尝试获取monitor的所有权，过程如下：

1. 如果monitor的进入数为0，则该线程进入monitor，然后将进入数设置为1，该线程即为monitor的所有者。
2. 如果线程已经占有该monitor，只是重新进入，则进入monitor的进入数加1.
3. 如果其他线程已经占用了monitor，则该线程进入阻塞状态，直到monitor的进入数为0，再重新尝试获取monitor的所有权

　　小结：

　　　　Synchronize 可重入锁，即如果当前线程以获得锁对象，可再次获取该锁对象
　　　　即：该锁对象的监视器锁 monitor 具有可重入性，每进入一次，进入次数+1
　　　　从 synchronized 使用的语法上，如果修饰代码块，synchronize (object ) {} object 即为锁对象
　　　　如果修饰方法，普通方法可认为是 this 锁，即当前对象锁；静态方法可认为是 类锁

monitorexit

　　执行monitorexit的线程必须是objectref所对应的monitor的所有者。

1. 指令执行时，monitor的进入数减1
2. 如果减1后进入数为0，那线程退出monitor，不再是这个monitor的所有者
3. 其他被这个monitor阻塞的线程可以尝试去获取这个 monitor 的所有权

　　小结：

　　　　总结：通过以上描述，应该能很清楚的看出Synchronized的实现原理，Synchronized的语义底层是通过一个monitor的对象来完成，其实wait/notify等方法也依赖于monitor对象，这就是为什么只有在同步的块或者方法中才能调用wait/notify等方法，否则会抛出java.lang.IllegalMonitorStateException的异常的原因

### 示例3、普通同步方法，锁是当前实例对象

``` java
public class SynchronizedDemo2 {
    public synchronized void method() {
        System.out.println("Method 1 start");
    }
}
```

查看字节码





``` java
  public synchronized void method();
    descriptor: ()V
    flags: ACC_PUBLIC, ACC_SYNCHRONIZED
    Code:
      stack=2, locals=1, args_size=1
         0: getstatic     #2                  // Field java/lang/System.out:Ljava/io/PrintStream;
         3: ldc           #3                  // String Method 1 start
         5: invokevirtual #4                  // Method java/io/PrintStream.println:(Ljava/lang/String;)V
         8: return
```



注意在flags上增加了ACC_SYNCHRONIZED

### 示例4、静态同步方法，锁是当前类的class对象

``` java
public class SynchronizedDemoStatic {
    public static synchronized void method() {
        System.out.println("Method 1 start");
    }
}
```

查看字节码





``` java
  public static synchronized void method();
    descriptor: ()V
    flags: ACC_PUBLIC, ACC_STATIC, ACC_SYNCHRONIZED
    Code:
      stack=2, locals=0, args_size=0
         0: getstatic     #2                  // Field java/lang/System.out:Ljava/io/PrintStream;
         3: ldc           #3                  // String Method 1 start
         5: invokevirtual #4                  // Method java/io/PrintStream.println:(Ljava/lang/String;)V
         8: return
```



注意：在flags上增加了ACC_STATIC, ACC_SYNCHRONIZED

针对示例3、示例四，在flags上均增加了 ACC_SYNCHRONIZED

　　从反编译的结果来看，方法的同步并没有通过指令monitorenter和monitorexit来完成（理论上其实也可以通过这两条指令来实现），不过相对于普通方法【没加synchronized的】，其常量池中多了ACC_SYNCHRONIZED标示符。JVM就是根据该标示符来实现方法的同步的：当方法调用时，调用指令将会检查方法的 ACC_SYNCHRONIZED 访问标志是否被设置，如果设置了，执行线程将先获取monitor，获取成功之后才能执行方法体，方法执行完后再释放monitor。在方法执行期间，其他任何线程都无法再获得同一个monitor对象。 其实本质上没有区别，只是方法的同步是一种隐式的方式来实现，无需通过字节码来完成

## 1.2、小结

　　synchronized的指令严格遵守java happens-before规则，一个monitor exit指令之前必定有一个monitor enter。

下面是摘自《Java虚拟机规范》的话：

　　Java虚拟机可以支持方法级的同步和方法内部一段指令序列的同步，这两种同步结构都是使用管程（Monitor）来支持的。

　　方法级的同步是隐式，即无需通过字节码指令来控制的，它实现在方法调用和返回操作之中。虚拟机可以从方法常量池中的方法表结构中的ACC_SYNCHRONIZED访问标志区分一个方法是否同步方法。当方法调用时，调用指令将会检查方法的ACC_SYNCHRONIZED访问标志是否被设置，如果设置了，执行线程将先持有管程，然后再执行方法，最后在方法完成（无论是正常完成还是非正常完成）时释放管程。在方法执行期间，执行线程持有了管程，其他任何线程都无法再获得同一个管程。如果一个同步方法执行期间抛出了异常，并且在方法内部无法处理此异常，那这个同步方法所持有的管程将在异常抛到同步方法之外时自动释放。

　　同步一段指令集序列通常是由Java语言中的synchronized块来表示的，Java虚拟机的指令集中有monitorenter和monitorexit两条指令来支持synchronized关键字的语义，正确实现synchronized关键字需要编译器与Java虚拟机两者协作支持。

　　Java虚拟机中的同步（Synchronization）基于进入和退出管程（Monitor）对象实现。无论是显式同步（有明确的monitorenter和monitorexit指令）还是隐式同步（依赖方法调用和返回指令实现的）都是如此。

　　编译器必须确保无论方法通过何种方式完成，方法中调用过的每条monitorenter指令都必须有执行其对应monitorexit指令，而无论这个方法是正常结束还是异常结束。为了保证在方法异常完成时monitorenter和monitorexit指令依然可以正确配对执行，编译器会自动产生一个异常处理器，这个异常处理器声明可处理所有的异常，它的目的就是用来执行monitorexit指令。

## 二、理解储备-Java对象头和Monitor

## 2.1、java对象

　　在JVM中，实例对象在内存中的布局分为三块区域：对象头、实例变量和填充数据。如下：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/java/juc/juclockdiff-1.png')" alt="wxmp">

　　实例变量：存放类的属性数据信息，包括父类的属性信息，如果是数组的实例部分还包括数组的长度，这部分内存按**4字节对齐**。其实就是在java代码中能看到的属性和他们的值。 

　　填充数据：由于虚拟机要求对象起始地址必须是8字节的整数倍。填充数据不是必须存在的，仅仅是为了字节对齐，这点了解即可。

　　**对象头：**Hotspot虚拟机的对象头主要包括两部分数据：Mark Word（标记字段）、Klass Pointer（类型指针）、Array length（数组长度，只有数组类型才有）。

　　　　其中Klass Point【Class Metadata Address 】是对象指向它的类元数据的指针，虚拟机通过这个指针来确定这个对象是哪个类的实例，Mark Word用于存储对象自身的运行时数据，它是实现轻量级锁和偏向锁的关键。

### 2.1.1、对象头-Mark Word（标记字段）

　　Mark Word记录了对象和锁有关的信息，当这个对象被synchronized关键字当成同步锁时，围绕这个锁的一系列操作都和Mark Word有关。

　　Mark Word在32位JVM中的长度是32bit，在64位JVM中长度是64bit。

　　Mark Word在不同的锁状态下存储的内容不同，在32位JVM中是：

| 锁状态   | 25bit                | 4bit       | 1bit     | 2bit |     |
| -------- | -------------------- | ---------- | -------- | ---- | --- |
| 23bit    | 2bit                 | 是否偏向锁 | 锁标志位 |      |     |
| 无锁     | 对象的HashCode       | 分代年龄   | 0        | 01   |     |
| 偏向锁   | 线程ID               | Epoch      | 分代年龄 | 1    | 01  |
| 轻量级锁 | 指向栈中锁记录的指针 | 00         |          |      |     |
| 重量级锁 | 指向重量级锁的指针   | 10         |          |      |     |
| GC标记   | 空                   | 11         |          |      |     |

　　　　锁的级别从低到高：无锁、偏向锁、轻量级锁、重量级锁。

　　其中无锁和偏向锁的锁标志位都是01，只是在前面的1bit区分了这是无锁状态还是偏向锁状态。

　　JDK1.6以后的版本在处理同步锁时存在锁升级的概念，JVM对于同步锁的处理是从偏向锁开始的，随着竞争越来越激烈，处理方式从偏向锁升级到轻量级锁，最终升级到重量级锁。

　　JVM一般是这样使用锁和Mark Word的：

　　　　1，当没有被当成锁时，这就是一个普通的对象，Mark Word记录对象的HashCode，锁标志位是01，是否偏向锁那一位是0。

　　　　2，当对象被当做同步锁并有一个线程A抢到了锁时，锁标志位还是01，但是否偏向锁那一位改成1，前23bit记录抢到锁的线程id，表示进入偏向锁状态。

　　　　3，当线程A再次试图来获得锁时，JVM发现同步锁对象的标志位是01，是否偏向锁是1，也就是偏向状态，Mark Word中记录的线程id就是线程A自己的id，表示线程A已经获得了这个偏向锁，可以执行同步锁的代码。

　　　　4，当线程B试图获得这个锁时，JVM发现同步锁处于偏向状态，但是Mark Word中的线程id记录的不是B，那么线程B会先用CAS操作试图获得锁，这里的获得锁操作是有可能成功的，因为线程A一般不会自动释放偏向锁。如果抢锁成功，就把Mark Word里的线程id改为线程B的id，代表线程B获得了这个偏向锁，可以执行同步锁代码。如果抢锁失败，则继续执行步骤5。

　　　　5，偏向锁状态抢锁失败，代表当前锁有一定的竞争，偏向锁将升级为轻量级锁。JVM会在当前线程的线程栈中开辟一块单独的空间，里面保存指向对象锁Mark Word的指针，同时在对象锁Mark Word中保存指向这片空间的指针。上述两个保存操作都是CAS操作，如果保存成功，代表线程抢到了同步锁，就把Mark Word中的锁标志位改成00，可以执行同步锁代码。如果保存失败，表示抢锁失败，竞争太激烈，继续执行步骤6。

　　　　6，轻量级锁抢锁失败，JVM会使用自旋锁，自旋锁不是一个锁状态，只是代表不断的重试，尝试抢锁。从JDK1.7开始，自旋锁默认启用，自旋次数由JVM决定。如果抢锁成功则执行同步锁代码，如果失败则继续执行步骤7。

　　　　7，自旋锁重试之后如果抢锁依然失败，同步锁会升级至重量级锁，锁标志位改为10。在这个状态下，未抢到锁的线程都会被阻塞。

### 2.1.2、对象头-指向类的指针

　　该指针在32位JVM中的长度是32bit，在64位JVM中长度是64bit。

　　Java对象的类数据保存在方法区。

### 2.1.3、对象头-数组长度

　　只有数组对象保存了这部分数据。

　　该数据在32位和64位JVM中长度都是32bit。

## 2.2、**Monior**

　　Monitor可以理解为一种同步工具，也可理解为一种同步机制，常常被描述为一个Java对象。

　　　　1）互斥：一个Monitor在一个时刻只能被一个线程持有，即Monitor中的所有方法都是互斥的。

　　　　2）signal机制：如果条件变量不满足，允许一个正在持有Monitor的线程暂时释放持有权，当条件变量满足时，当前线程可以唤醒正在等待该条件变量的线程，然后重新获取Monitor的持有权。

　　所有的Java对象是天生的Monitor，每一个Java对象都有成为Monitor的潜质，因为在Java的设计中 ，每一个Java对象自打娘胎里出来就带了一把看不见的锁，它叫做内部锁或者Monitor锁。

　　Monitor的本质是依赖于底层操作系统的Mutex Lock实现，操作系统实现线程之间的切换需要从用户态到内核态的转换，成本非常高。

　　Monitor 是线程私有的数据结构，每一个线程都有一个可用monitor record列表，同时还有一个全局的可用列表。每一个被锁住的对象都会和一个monitor关联（对象头的MarkWord中的LockWord指向monitor的起始地址），同时monitor中有一个Owner字段存放拥有该锁的线程的唯一标识，表示该锁被这个线程占用。其结构如下：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/java/juc/juclockdiff-2.png')" alt="wxmp">

　　1.Owner字段：初始时为NULL表示当前没有任何线程拥有该monitor record，当线程成功拥有该锁后保存线程唯一标识，当锁被释放时又设置为NULL
　　2.EntryQ字段：关联一个系统互斥锁（semaphore），阻塞所有试图锁住monitor record失败的线程
　　3.RcThis字段：表示blocked或waiting在该monitor record上的所有线程的个数
　　4.Nest字段：用来实现重入锁的计数
　　5.HashCode字段：保存从对象头拷贝过来的HashCode值（可能还包含GC age）
　　6.Candidate字段：用来避免不必要的阻塞或等待线程唤醒，因为每一次只有一个线程能够成功拥有锁，如果每次前一个释放锁的线程唤醒所有正在阻塞或等待的线程，会引起不必要的上下文切换（从阻塞到就绪然后因为竞争锁失败又被阻塞）从而导致性能严重下降；Candidate只有两种可能的值0表示没有需要唤醒的线程1表示要唤醒一个继任线程来竞争锁

### 2.2.1、Monitor具体实现方式

　　1.Monitor是在jvm底层实现的，底层代码是c++
　　2.Monitor的enter方法：获取锁
　　3.Monitor的exit方法：释放锁
　　4.Monitor的wait方法：为java的Object的wait方法提供支持
　　5.Monitor的notify方法：为java的Object的notify方法提供支持
　　6.Monitor的notifyAll方法：为java的Object的notifyAll方法提供支持

### 2.2.2、Monitor机制

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/java/juc/juclockdiff-3.png')" alt="wxmp">

　　Monitor可以类比为一个特殊的房间，这个房间中有一些被保护的数据，Monitor保证每次只能有一个线程能进入这个房间进行访问被保护的数据，进入房间即为持有Monitor，退出房间即为释放Monitor。

　　当一个线程需要访问受保护的数据（即需要获取对象的Monitor）时，它会首先在entry-set入口队列中排队（这里并不是真正的按照排队顺序），如果没有其他线程正在持有对象的Monitor，那么它会和entry-set队列和wait-set队列中的被唤醒的其他线程进行竞争（即通过CPU调度），选出一个线程来获取对象的Monitor，执行受保护的代码段，执行完毕后释放Monitor，如果已经有线程持有对象的Monitor，那么需要等待其释放Monitor后再进行竞争。

　　再说一下wait-set队列。当一个线程拥有Monitor后，经过某些条件的判断（比如用户取钱发现账户没钱），这个时候需要调用Object的wait方法，线程就释放了Monitor，进入wait-set队列，等待Object的notify方法（比如用户向账户里面存钱）。当该对象调用了notify方法或者notifyAll方法后，wait-set中的线程就会被唤醒，然后在wait-set队列中被唤醒的线程和entry-set队列中的线程一起通过CPU调度来竞争对象的Monitor，最终只有一个线程能获取对象的Monitor。

注意：

- 当一个线程在wait-set中被唤醒后，并不一定会立刻获取Monitor，它需要和其他线程去竞争
- 如果一个线程是从wait-set队列中唤醒后，获取到的Monitor，它会去读取它自己保存的PC计数器中的地址，从它调用wait方法的地方开始执行。

## 2.3、Monitor与java对象以及线程是如何关联 

1.如果一个java对象被某个线程锁住，则该java对象的Mark Word字段中LockWord指向monitor的起始地址

2.Monitor的Owner字段会存放拥有相关联对象锁的线程id

## 2.4、锁的内存语义

　　内存可见性：同步块的可见性是由“如果对一个变量执行lock操作，将会清空工作内存中此变量的值，在执行引擎使用这个变量前需要重新执行load或assign操作初始化变量的值”、“对一个变量执行unlock操作之前，必须先把此变量同步回主内存中（执行store和write操作）”这两条规则获得的。

　　操作原子性：持有同一个锁的两个同步块只能串行地进入

　　锁的内存语义：

　　　　当线程释放锁时，JMM会把该线程对应的本地内存中的共享变量刷新到主内存中

　　　　当线程获取锁时，JMM会把该线程对应的本地内存置为无效。从而使得被监视器保护的临界区代码必须从主内存中读取共享变量

　　锁释放和锁获取的内存语义：

　　　　线程A释放一个锁，实质上是线程A向接下来将要获取这个锁的某个线程发出了（线程A对共享变量所做修改的）消息。

　　　　线程B获取一个锁，实质上是线程B接收了之前某个线程发出的（在释放这个锁之前对共享变量所做修改的）消息。

　　　　线程A释放锁，随后线程B获取这个锁，这个过程实质上是线程A通过主内存向线程B发送消息

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/java/juc/juclockdiff-4.png')" alt="wxmp">

## 2.5、Mutex Lock　　

　　监视器锁（Monitor）本质是依赖于底层的操作系统的Mutex Lock（互斥锁）来实现的。每个对象都对应于一个可称为" 互斥锁" 的标记，这个标记用来保证在任一时刻，只能有一个线程访问该对象。

　　互斥锁：用于保护临界区，确保同一时间只有一个线程访问数据。对共享资源的访问，先对互斥量进行加锁，如果互斥量已经上锁，调用线程会阻塞，直到互斥量被解锁。在完成了对共享资源的访问后，要对互斥量进行解锁。

　　mutex的工作方式：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/java/juc/juclockdiff-5.png')" alt="wxmp">

　　1) 申请mutex

　　2) 如果成功，则持有该mutex

　　3) 如果失败，则进行spin自旋. spin的过程就是在线等待mutex, 不断发起mutex gets, 直到获得mutex或者达到spin_count限制为止

　　4) 依据工作模式的不同选择yiled还是sleep

　　5) 若达到sleep限制或者被主动唤醒或者完成yield, 则重复1)~4)步，直到获得为止

　　由于Java的线程是映射到操作系统的原生线程之上的，如果要阻塞或唤醒一条线程，都需要操作系统来帮忙完成，这就需要从用户态转换到核心态中，因此状态转换需要耗费很多的处理器时间。所以synchronized是Java语言中的一个重量级操作。在JDK1.6中，虚拟机进行了一些优化，譬如在通知操作系统阻塞线程之前加入一段自旋等待过程，避免频繁地切入到核心态中：

## 2.6、互斥锁

　　在编程中，引入了对象互斥锁的概念，来保证共享数据操作的完整性。每个对象都对应于一个可称为" 互斥锁" 的标记，这个标记用来保证在任一时刻，只能有一个线程访问该对象。

　　互斥锁是用在多线程多任务互斥的，一个线程占用了某一个资源，那么别的线程就无法访问，直到这个线程unlock，其他的线程才开始可以利用这 个资源。

　　在java中，synchronized关键字修饰的同步代码块，是一种互斥锁。

## 2.7、线程安全与可重入性

### 2.7.1. 线程安全

　　线程安全函数的概念比较直观，众所周知，同一进程的不同线程会共享同一主内存，线程的私有栈中只包括PC,栈，操作数栈，局部变量数组和动态链接。对共享内存进行读写时，若要保证线程安全，则必须通过加锁的方式。

### 2.7.2. 可重入

　　定义：若一个程序或子程序可以“在任意时刻被中断然后操作系统调度执行另外一段代码，这段代码又调用了该子程序不会出错”，则称其为可重入（reentrant或re-entrant）的。即当该子程序正在运行时，执行线程可以再次进入并执行它，仍然获得符合设计时预期的结果。与多线程并发执行的线程安全不同，可重入强调对单个线程执行时重新进入同一个子程序仍然是安全的。

### 2.7.3、可重入的条件

　　不在函数内使用静态或全局数据。
　　不返回静态或全局数据，所有数据都由函数的调用者提供。
　　使用本地数据（工作内存），或者通过制作全局数据的本地拷贝来保护全局数据。
　　不调用不可重入函数。

### 2.7.4、可重入与线程安全

　　一般而言，可重入的函数一定是线程安全的，反之则不一定成立。在不加锁的前提下，如果一个函数用到了全局或静态变量，那么它不是线程安全的，也不是可重入的。如果我们加以改进，对全局变量的访问加锁，此时它是线程安全的但不是可重入的，因为通常的枷锁方式是针对不同线程的访问（如Java的synchronized），当同一个线程多次访问就会出现问题。只有当函数满足可重入的四条条件时，才是可重入的。

## 三、 JDK1.6对synchronized锁的优化实现

　　synchronized用的锁是存在Java对象头里的。

　　synchronized锁的状态总共有四种，无锁状态、偏向锁【jdk6之后】、轻量级锁【jdk6之后】和重量级锁【jdk6之前的synchronized实现】。随着锁的竞争，锁可以从偏向锁升级到轻量级锁，再升级的重量级锁，但是锁的升级是单向的，也就是说只能从低到高升级，不会出现锁的降级，关于重量级锁，前面我们已详细分析过，下面我们将介绍偏向锁和轻量级锁以及JVM的其他优化手段。

## **3.1、偏向锁**

　　偏向锁是Java 6之后加入的新锁，它是一种针对加锁操作的优化手段，经过研究发现，在大多数情况下，锁不仅不存在多线程竞争，而且总是由同一线程多次获得，因此为了减少同一线程获取锁(会涉及到一些CAS操作,耗时)的代价而引入偏向锁。

　　偏向锁的核心思想是，如果一个线程获得了锁，那么锁就进入偏向模式，此时Mark Word 的结构也变为偏向锁结构，当这个线程再次请求锁时，无需再做任何同步操作，即获取锁的过程，这样就省去了大量有关锁申请的操作，从而也就提供程序的性能。所以，对于没有锁竞争的场合，偏向锁有很好的优化效果，毕竟极有可能连续多次是同一个线程申请相同的锁。但是对于锁竞争比较激烈的场合，偏向锁就失效了，因为这样场合极有可能每次申请锁的线程都是不相同的，因此这种场合下不应该使用偏向锁，否则会得不偿失，需要注意的是，偏向锁失败后，并不会立即膨胀为重量级锁，而是先升级为轻量级锁。

　　当一个线程访问同步块并获取锁时，会在对象头和栈帧中的锁记录里存储锁偏向的线程ID，以后该线程在进入和退出同步块时不需要进行CAS操作来加锁和解锁，只需简单地测试一下对象头的Mark Word里是否存储着指向当前线程的偏向锁。引入偏向锁是为了在无多线程竞争的情况下尽量减少不必要的轻量级锁执行路径，因为轻量级锁的获取及释放依赖多次CAS原子指令，而偏向锁只需要在置换ThreadID的时候依赖一次CAS原子指令（由于一旦出现多线程竞争的情况就必须撤销偏向锁，所以偏向锁的撤销操作的性能损耗必须小于节省下来的CAS原子指令的性能消耗）。　　

　　优化点：在没有多线程竞争的情况下，减少轻量级锁的不必要的CAS操作。在无竞争情况下，完全消除同步。

　　优化方法：锁对象的Mark Word中记录获取锁的线程ID。

　　获取锁步骤：

　　　　1）判断锁对象是否是偏向锁（即锁标志位为01，偏向锁位为1），若为偏向锁状态执行2）。

　　　　2）判断锁对象的线程ID是否为当前线程的ID，如果是则说明已经获取到锁，执行代码块；否则执行3）。

　　　　3）当前线程使用CAS更新锁对象的线程ID为当前线程ID。如果成功，获取到锁；否则执行4）

　　　　4）当到达全局安全点，当前线程根据Mark Word中的线程ID通知持有锁的线程挂起，将锁对象Mark Word中的锁对象指针指向当前堆栈中最近的一个锁记录，偏向锁升级为轻量级锁，恢复被挂起的线程。

　　释放锁步骤：

　　　　偏向锁采用一种等到竞争出现时才释放锁的机制。当其他线程尝试竞争偏向锁时，当前线程才会释放释放锁，线程不会主动去释放偏向锁。偏向锁的撤销需要等待全局安全点。

　　　　1）首先暂停持有偏向锁的线程。

　　　　2）撤销偏向锁，恢复到无锁状态或轻量级锁状态。

　　关闭偏向锁：

　　　　偏向锁在Java 6和Java 7里是默认启用的。由于偏向锁是为了在只有一个线程执行同步块时提高性能，如果你确定应用程序里所有的锁通常情况下处于竞争状态，可以通过JVM参数关闭偏向锁：-XX:-UseBiasedLocking=false，那么程序默认会进入轻量级锁状态。

## **3.2、轻量级锁**

　　倘若偏向锁失败，虚拟机并不会立即升级为重量级锁，它还会尝试使用一种称为轻量级锁的优化手段(1.6之后加入的)，此时Mark Word 的结构也变为轻量级锁的结构。轻量级锁能够提升程序性能的依据是“对绝大部分的锁，在整个同步周期内都不存在竞争”，注意这是经验数据。需要了解的是，轻量级锁所适应的场景是线程交替执行同步块的场合，如果存在同一时间访问同一锁的场合，就会导致轻量级锁膨胀为重量级锁。

　　轻量级锁是为了在线程近乎交替执行同步块时提高性能。

　　优化点：在没有多线程竞争的情况下，通过CAS减少重量级锁使用操作系统互斥量产生的性能消耗。

　　什么情况下使用：关闭偏向锁或由于多线程竞争导致的偏向锁升级为轻量级锁。

　　获取锁步骤：

　　　　1）判断是否处于无锁状态，若是，则JVM在当前线程的栈帧中创建锁记录（Lock ）空间，用于存放锁对象中的Mark Word的拷贝，官方称为Displaced Mark Word；否则执行步骤3）。

　　　　2）当前线程尝试利用CAS将锁对象的Mark 新为指向锁记录的指针。如果更新成功意味着获取到锁，将锁标志位置为00，执行同步代码块；如果更新失败，执行步骤3）。

　　　　3）判断锁对象的Mark 否指向当前线程的栈帧，若是说明当前线程已经获取了锁，执行同步代码，否则说明其他线程已经获取了该锁对象，执行步骤4）。

　　　　4）当前线程尝试使用自旋来获取锁，自旋期间会不断的执行步骤1），直到获取到锁或自旋结束。因为自旋锁会消耗CPU，所限的自旋。如果自旋期间获取到锁（其他线程释放锁），执行同步块；否则锁膨胀为重量级锁，当前线程阻塞，等待持有锁的线程释放醒。

　　释放锁步骤：

　　　　1）从当前线程的栈帧中取出Displaced Mark Word存储的锁记录的内容。

　　　　2）当前线程尝试使用CAS将锁记录内容更新到锁对象中的Mark 。如果更新成功，则释放锁成功，将锁标志位置为01无锁状态；否则，执行3）。

　　　　3）CAS更新失败，说明有其他线程尝试获取锁。需要释放锁并同时唤醒等待的线程。

## **3.3、自旋锁向自适应自旋锁优化**

　　引入自旋锁的原因：互斥同步对性能最大的影响是阻塞的实现，因为挂起线程和恢复线程的操作都需要转入内核态中完成，这些操作给系统的并发性能带来很大的压力。同时虚拟机的开发团队也注意到在许多应用上面，共享数据的锁定状态只会持续很短一段时间，为了这一段很短的时间频繁地阻塞和唤醒线程是非常不值得的。

自旋锁

　　让该线程执行一段无意义的忙循环（自旋）等待一段时间，不会被立即挂起（自旋不放弃处理器额执行时间），看持有锁的线程是否会很快释放锁。自旋锁在JDK 1.4.2中引入，默认关闭，但是可以使用-XX:+UseSpinning开开启；在JDK1.6中默认开启。

自旋锁的缺点　　

　　自旋等待不能替代阻塞，虽然它可以避免线程切换带来的开销，但是它占用了处理器的时间。如果持有锁的线程很快就释放了锁，那么自旋的效率就非常好；反之，自旋的线程就会白白消耗掉处理器的资源，它不会做任何有意义的工作，这样反而会带来性能上的浪费。所以说，自旋等待的时间（自旋的次数）必须要有一个限度，例如让其循环10次，如果自旋超过了定义的时间仍然没有获取到锁，则应该被挂起（进入阻塞状态）。通过参数-XX:PreBlockSpin可以调整自旋次数，默认的自旋次数为10。

自适应的自旋锁【**Adaptive Spinning**】　　

　　JDK1.6引入自适应的自旋锁，自适应就意味着自旋的次数不再是固定的，它是由前一次在同一个锁上的自旋时间及锁的拥有者的状态来决定：如果在同一个锁的对象上，自旋等待刚刚成功获得过锁，并且持有锁的线程正在运行中，那么虚拟机就会认为这次自旋也很有可能再次成功，进而它将允许自旋等待持续相对更长的时间。如果对于某个锁，自旋很少成功获得过，那在以后要获取这个锁时将可能省略掉自旋过程，以避免浪费处理器资源。简单来说，就是线程如果自旋成功了，则下次自旋的次数会更多，如果自旋失败了，则自旋的次数就会减少。

　　从轻量级锁获取的流程中我们知道**，**当线程在获取轻量级锁的过程中执行CAS操作失败时，是要通过自旋来获取重量级锁的。问题在于，自旋是需要消耗CPU的，如果一直获取不到锁的话，那该线程就一直处在自旋状态，白白浪费CPU资源。解决这个问题最简单的办法就是指定自旋的次数，例如让其循环10次，如果还没获取到锁就进入阻塞状态。但是JDK采用了更聪明的方式——适应性自旋，简单来说就是线程如果自旋成功了，则下次自旋的次数会更多，如果自旋失败了，则自旋的次数就会减少。

自旋锁使用场景

　　当线程在获取轻量级锁的过程中执行CAS操作失败时，是要通过自旋来获取重量级锁的。轻量级锁失败后，虚拟机为了避免线程真实地在操作系统层面挂起，还会进行一项称为自旋锁的优化手段。这是基于在大多数情况下，线程持有锁的时间都不会太长，如果直接挂起操作系统层面的线程可能会得不偿失，毕竟操作系统实现线程之间的切换时需要从用户态转换到核心态，这个状态之间的转换需要相对比较长的时间，时间成本相对较高，因此自旋锁会假设在不久将来，当前的线程可以获得锁，因此虚拟机会让当前想要获取锁的线程做几个空循环(这也是称为自旋的原因)，一般不会太久，可能是50个循环或100循环，在经过若干次循环后，如果得到锁，就顺利进入临界区。如果还不能获得锁，那就会将线程在操作系统层面挂起，这就是自旋锁的优化方式，这种方式确实也是可以提升效率的。最后没办法也就只能升级为重量级锁了。

## **3.4、重量级锁**

　　**重量级锁基于Monitor实现，成本高。也就是synchronized在jdk1.6之前的实现。**

　　如果存在同一时间访问同一锁的情况，就会导致轻量级锁膨胀为重量级锁。Mark Word的锁标记位更新为10，Mark Word指向互斥量（重量级锁）

　　Synchronized的重量级锁是通过对象内部的一个叫做监视器锁（monitor）来实现的【即文章第一部分说明的实现】，监视器锁本质又是依赖于底层的操作系统的Mutex Lock（互斥锁）来实现的。而操作系统实现线程之间的切换需要从用户态转换到核心态，这个成本非常高，状态之间的转换需要相对比较长的时间，这就是为什么Synchronized在jdk1.6之前效率低的原因，不被推荐的原因，但是在jdk1.6之后，推荐优先使用，毕竟使用ReentrantLock还需主动加锁，关锁操作。

## **3.5、\**锁粗化（Lock Coarsening）和\*\*锁消除（Lock Elimination）\*\**\*优化**

锁粗化

　　锁粗化的概念应该比较好理解，就是将多次连接在一起的加锁、解锁操作合并为一次，将多个连续的锁扩展成一个范围更大的锁。





``` java
public class StringBufferTest {
    StringBuffer stringBuffer = new StringBuffer();

    public void append(){
        stringBuffer.append("a");
        stringBuffer.append("b");
        stringBuffer.append("c");
    }
}
```



　　这里每次调用stringBuffer.append方法都需要加锁和解锁，如果虚拟机检测到有一系列连串的对同一个对象加锁和解锁操作，就会将其合并成一次范围更大的加锁和解锁操作，即在第一次append方法时进行加锁，最后一次append方法结束后进行解锁。

消除锁

　　消除锁是虚拟机另外一种锁的优化，这种优化更彻底，Java虚拟机在JIT编译时(可以简单理解为当某段代码即将第一次被执行时进行编译，又称即时编译)，通过对运行上下文的扫描，去除不可能存在共享资源竞争的锁，通过这种方式消除没有必要的锁，可以节省毫无意义的请求锁时间，如下StringBuffer的append是一个同步方法，但是在add方法中的StringBuffer属于一个局部变量，并且不会被其他线程所使用，因此StringBuffer不可能存在共享资源竞争的情景，所以其实这过程是线程安全的，JVM会自动将其锁消除。





``` java
/**
 * @author lihongxu
 * @desc 消除StringBuffer同步锁
 * @since 2019/3/20 上午9:37
 */
public class StringBufferRemoveSync {
    public void add(String str1, String str2) {
        //StringBuffer是线程安全,由于sb只会在append方法中使用,不可能被其他线程引用
        //因此sb属于不可能共享的资源,JVM会自动消除内部的锁
        StringBuffer sb = new StringBuffer();
        sb.append(str1).append(str2);
    }

    public static void main(String[] args) {
        StringBufferRemoveSync rmsync = new StringBufferRemoveSync();
        for (int i = 0; i < 10000000; i++) {
            rmsync.add("abc", "123");
        }
    }
}
```



## 3.6、偏向锁、轻量级锁、重量级锁之间转换

　　可以结合上述，以及对象头，参看此图

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/java/juc/juclockdiff-6.png')" alt="wxmp">

## 3.7、几种锁之间对比

　　JDk中采用轻量级锁和偏向锁等对Synchronized的优化，但是这两种锁也不是完全没缺点的，比如竞争比较激烈的时候，不但无法提升效率，反而会降低效率，因为多了一个锁升级的过程，这个时候就需要通过-XX:-UseBiasedLocking来禁用偏向锁。

　　synchronized锁：由对象头中的Mark Word根据锁标志位的不同而被复用

| 锁       |                                                                                                                                                                                                                                                                                                                                                                                                                                                          | 优点                                                               | 缺点                                             | 适用场景                             |
| -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ | ------------------------------------------------ | ------------------------------------ |
| 偏向锁   | Mark Word存储锁偏向的线程ID，以后该线程在进入和退出同步块时不需要进行CAS操作来加锁和解锁，只需简单比较ThreadID。特点：只有等到线程竞争出现才释放偏向锁，持有偏向锁的线程不会主动释放偏向锁。之后的线程竞争偏向锁，会先检查持有偏向锁的线程是否存活，如果不存货，则对象变为无锁状态，重新偏向；如果仍存活，则偏向锁升级为轻量级锁，此时轻量级锁由原持有偏向锁的线程持有，继续执行其同步代码，而正在竞争的线程会进入自旋等待获得该轻量级锁                 | 加锁和解锁不需要额外的消耗，和执行非同步方法比仅存在纳秒级的差距。 | 如果线程间存在锁竞争，会带来额外的锁撤销的消耗。 | 适用于只有一个线程访问同步块场景。   |
| 轻量级锁 | 在当前线程的栈帧中建立一个名为锁记录（Lock Record）的空间，尝试拷贝锁对象目前的Mark Word到栈帧的Lock Record，若拷贝成功：虚拟机将使用CAS操作尝试将对象的Mark Word更新为指向Lock Record的指针，并将Lock record里的owner指针指向对象的Mark Word。若拷贝失败：若当前只有一个等待线程，则可通过自旋稍微等待一下，可能持有轻量级锁的线程很快就会释放锁。 但是当自旋超过一定的次数，或者一个线程在持有锁，一个在自旋，又有第三个来访时，轻量级锁膨胀为重量级锁 | 竞争的线程不会阻塞，提高了程序的响应速度。                         | 如果始终得不到锁竞争的线程使用自旋会消耗CPU。    | 追求响应时间。同步块执行速度非常快。 |
| 重量级锁 | 指向互斥量（mutex），底层通过操作系统的mutex lock实现。等待锁的线程会被阻塞，由于Linux下Java线程与操作系统内核态线程一一映射，所以涉及到用户态和内核态的切换、操作系统内核态中的线程的阻塞和恢复。                                                                                                                                                                                                                                                       | 线程竞争不使用自旋，不会消耗CPU。                                  | 线程阻塞，响应时间缓慢。                         | 追求吞吐量。同步块执行速度较长。     |

## 3.8、锁和对象头

对象实例由对象头、实例数据组成，其中对象头包括markword和类型指针，如果是数组，还包括数组长度;

| 类型     | 32位JVM | 64位JVM                       |
| -------- | ------- | ----------------------------- |
| markword | 32位    | 64位                          |
| 类型指针 | 32位    | 64bit ，开启指针压缩时为32bit |
| 数组长度 | 32位    | 32位                          |

未压缩头

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/java/juc/juclockdiff-7.png')" alt="wxmp">

压缩头

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/java/juc/juclockdiff-8.png')" alt="wxmp">

可以看到

- 开启指针压缩时，markword占用8bytes,类型指针占用8bytes，共占用16bytes;
- 未开启指针压缩时，markword占用8bytes,类型指针占用4bytes,但由于**java内存地址按照8bytes对齐,长度必须是8的倍数**，因此会从12bytes补全到16bytes;
- 数组长度为4bytes,同样会进行对齐，补足到8bytes;

另外从上面的截图可以看到，开启指针压缩之后，对象类型指针为0xf800c005,但实际的类型指针为0x7c0060028;那么指针是如何压缩的呢？实际上由于java地址一定是8的倍数，因此将0xf800c005*8即可得到实际的指针0x7c0060028,关于指针压缩的更多知识可参考[官方文档](https://link.jianshu.com/?t=http://docs.oracle.com/javase/7/docs/technotes/guides/vm/performance-enhancements-7.html#compressedOop)。

### markword结构

markword的结构，定义在markOop.hpp文件：





``` java
 32 bits:
  --------
  hash:25 ------------>| age:4    biased_lock:1 lock:2 (normal object)
  JavaThread*:23 epoch:2 age:4    biased_lock:1 lock:2 (biased object)
  size:32 ------------------------------------------>| (CMS free block)
  PromotedObject*:29 ---------->| promo_bits:3 ----->| (CMS promoted object)

  64 bits:
  --------
  unused:25 hash:31 -->| unused:1   age:4    biased_lock:1 lock:2 (normal object)
  JavaThread*:54 epoch:2 unused:1   age:4    biased_lock:1 lock:2 (biased object)
  PromotedObject*:61 --------------------->| promo_bits:3 ----->| (CMS promoted object)
  size:64 ----------------------------------------------------->| (CMS free block)

  unused:25 hash:31 -->| cms_free:1 age:4    biased_lock:1 lock:2 (COOPs && normal object)
  JavaThread*:54 epoch:2 cms_free:1 age:4    biased_lock:1 lock:2 (COOPs && biased object)
  narrowOop:32 unused:24 cms_free:1 unused:4 promo_bits:3 ----->| (COOPs && CMS promoted object)
  unused:21 size:35 -->| cms_free:1 unused:7 ------------------>| (COOPs && CMS free block)
 [ptr             | 00]  locked             ptr points to real header on stack
 [header      | 0 | 01]  unlocked           regular object header
 [ptr             | 10]  monitor            inflated lock (header is wapped out)
 [ptr             | 11]  marked             used by markSweep to mark an object
```



由于目前基本都在使用64位JVM,此处不再对32位的结构进行详细说明:

| 偏向锁标识位 | 锁标识位 | 锁状态   | 存储内容                     |
| ------------ | -------- | -------- | ---------------------------- |
| 0            | 01       | 未锁定   | hash code(31),年龄(4)        |
| 1            | 01       | 偏向锁   | 线程ID(54),时间戳(2),年龄(4) |
| 无           | 00       | 轻量级锁 | 栈中锁记录的指针(64)         |
| 无           | 10       | 重量级锁 | monitor的指针(64)            |
| 无           | 11       | GC标记   | 空，不需要记录信息           |

此处，有几点要注意:

- 如果对象没有重写hashcode方法，那么默认是调用**os::random**产生hashcode,可以通过System.identityHashCode获取；os::random产生hashcode的规则为:next_rand = (16807*seed) mod (2**31-1),因此可以使用31位存储;另外一旦生成了hashcode,JVM会将其记录在markword中；
- GC年龄采用4位bit存储，最大为15，例如MaxTenuringThreshold参数默认值就是15；
- 当处于轻量级锁、重量级锁时，记录的对象指针，根据JVM的说明，此时认为指针仍然是64位，最低两位假定为0;当处于偏向锁时，记录的为获得偏向锁的线程指针，该指针也是64位；





``` java
 We assume that stack/thread pointers have the lowest two bits cleared.
ObjectMonitor* monitor() const {
    assert(has_monitor(), "check");
    // Use xor instead of &~ to provide one extra tag-bit check.
    return (ObjectMonitor*) (value() ^ monitor_value);//monitor_value=2,value最右两位为10，因此异或之后最右两位为0
  }
JavaThread* biased_locker() const {
    assert(has_bias_pattern(), "should not call this otherwise");
    return (JavaThread*) ((intptr_t) (mask_bits(value(), ~(biased_lock_mask_in_place | age_mask_in_place | epoch_mask_in_place))));
//~(biased_lock_mask_in_place | age_mask_in_place | epoch_mask_in_place)为11111111111111111111110010000000，计算后的结果中，低10位全部为0;
  }
```



由于java中内存地址都是8的倍数，因此可以理解为最低3bit为0，因此假设轻量级和重量级锁的最低2位为0是成立的；但为什么偏向锁的最低10位都是0?查看markOop.hpp文件，发现有这么一句话:

``` java
// Alignment of JavaThread pointers encoded in object header required by biased locking
  enum { biased_lock_alignment    = 2 << (epoch_shift + epoch_bits)
//epoch_shift+epoch_bits＝10
  };
```

thread.hpp中重载了operator new:





``` java
void* operator new(size_t size) { return allocate(size, true); }

// ======= Thread ========
// Support for forcing alignment of thread objects for biased locking
void* Thread::allocate(size_t size, bool throw_excpt, MEMFLAGS flags) {
  if (UseBiasedLocking) {
    const int alignment = markOopDesc::biased_lock_alignment;//10
    size_t aligned_size = size + (alignment - sizeof(intptr_t));
    void* real_malloc_addr = throw_excpt? AllocateHeap(aligned_size, flags, CURRENT_PC)
                                          : os::malloc(aligned_size, flags, CURRENT_PC);
    void* aligned_addr     = (void*) align_size_up((intptr_t) real_malloc_addr, alignment);
    assert(((uintptr_t) aligned_addr + (uintptr_t) size) <=
           ((uintptr_t) real_malloc_addr + (uintptr_t) aligned_size),
           "JavaThread alignment code overflowed allocated storage");
    if (TraceBiasedLocking) {
      if (aligned_addr != real_malloc_addr)
        tty->print_cr("Aligned thread " INTPTR_FORMAT " to " INTPTR_FORMAT,
                      real_malloc_addr, aligned_addr);
    }
    ((Thread*) aligned_addr)->_real_malloc_address = real_malloc_addr;
    return aligned_addr;
  } else {
    return throw_excpt? AllocateHeap(size, flags, CURRENT_PC)
                       : os::malloc(size, flags, CURRENT_PC);
  }
}
```



如果开启了偏移锁,在创建线程时，线程地址会进行对齐处理，保证低10位为0

更多请参看链接：https://www.jianshu.com/p/ec28e3a59e80 

## 3.9、**synchronize的可重入性**

　　从互斥锁的设计上来说，当一个线程试图操作一个由其他线程持有的对象锁的临界资源时，将会处于阻塞状态，但当一个线程再次请求自己持有对象锁的临界资源时，这种情况属于重入锁，请求将会成功，在java中synchronized是基于原子性的内部锁机制，是可重入的，因此在一个线程调用synchronized方法的同时在其方法体内部调用该对象另一个synchronized方法，也就是说一个线程得到一个对象锁后再次请求该对象锁，是允许的，这就是synchronized的可重入性。

　　synchronized拥有强制原子性的内部锁机制，是一个可重入锁。因此，在一个线程使用synchronized方法时调用该对象另一个synchronized方法，即一个线程得到一个对象锁后再次请求该对象锁，是**永远可以拿到锁的**。

　　在Java内部，同一个线程调用自己类中其他synchronized方法/块时不会阻碍该线程的执行，同一个线程对同一个对象锁是可重入的，同一个线程可以获取同一把锁多次，也就是可以多次重入。原因是Java中线程获得对象锁的操作是以线程为单位的，而不是以调用为单位的。

### synchronized可重入锁的实现

　　每个锁关联一个线程持有者和一个计数器。当计数器为0时表示该锁没有被任何线程持有，那么任何线程都都可能获得该锁而调用相应方法。当一个线程请求成功后，JVM会记下持有锁的线程，并将计数器计为1。此时其他线程请求该锁，则必须等待。而该持有锁的线程如果再次请求这个锁，就可以再次拿到这个锁，同时计数器会递增。当线程退出一个synchronized方法/块时，计数器会递减，如果计数器为0则释放该锁。

注意：锁的持有者是线程，而且锁的是当前实例





``` java
public class Student {
 
    public static void main(String[] args) {
        Student student = new Student();
        student.doA();
    }
 
 
    public synchronized void doA() {
        System.out.println("do a");
        doB();
    }
 
    public synchronized void doB() {
        System.out.println("do b");
    }
}
```



 

四、自己动手写一个显示锁

　　synchronized关键字缺陷：

　　无法控制阻塞时长：如果两个线程调用一个阻塞方法，第一个调用需要执行10分钟，第二个只能等到第一个运行结束释放，才能执行，不能第二个设置一定时间后自己放弃

　　阻塞不可被中断：通过synchronized进入阻塞状态的线程不能中断.

接口类



``` java
public interface Lock {

    void lock() throws InterruptedException;

    void lock(long mills) throws InterruptedException, TimeoutException;

    void unlock();

    List<Thread> getBlockedThreads();
}
```

实现类


``` java
public class BooleanLock implements Lock {

    private Thread currentThread;

    private boolean locked = false;

    private final List<Thread> blockedList = new ArrayList<>();

    @Override
    public void lock() throws InterruptedException {
        synchronized (this) {
            while (locked) {
                final Thread tempThead = currentThread();
                try {
                    if (!blockedList.contains(currentThread()))
                        blockedList.add(currentThread());
                    this.wait();
                } catch (InterruptedException e) {
                    blockedList.remove(tempThead);
                    throw e;
                }
            }

            blockedList.remove(currentThread());
            this.locked = true;
            this.currentThread = currentThread();
        }
    }
    
    @Override
    public void lock(long mills) throws InterruptedException, TimeoutException {
        synchronized (this) {
            if (mills < 0) {
                this.lock();
            } else {
                long remainingMills = mills;
                long endMills = System.currentTimeMillis() + remainingMills;


                while (locked) {
                    if (remainingMills <= 0)
                        throw new TimeoutException("锁定时间获取异常");

                    if (!blockedList.contains(currentThread()))
                        blockedList.add(currentThread());
                    this.wait(remainingMills);
                    remainingMills = endMills - System.currentTimeMillis();
                }
            }

            blockedList.remove(currentThread());
            this.locked = true;
            this.currentThread = currentThread();
        }
    }

    @Override
    public void unlock() {
        synchronized (this) {
            if (currentThread == Thread.currentThread()) {
                this.locked = false;
                Optional.of(Thread.currentThread().getName() + " release the lock").ifPresent(p -> System.out.println(p));
                this.notifyAll();
            }
        }
    }

    @Override
    public List<Thread> getBlockedThreads() {
        return Collections.unmodifiableList(blockedList);
    }
}
```



 

测试



``` java
public class BooleanLockTest {
    private final Lock lock = new BooleanLock();

    public void syncMethod() {
        try {
            lock.lock();
            int randomInt = ThreadLocalRandom.current().nextInt(10);
            System.out.println(Thread.currentThread() + " get the lock");
            TimeUnit.SECONDS.sleep(randomInt);
        } catch (InterruptedException e) {
            e.printStackTrace();
        } finally {
            lock.unlock();
        }
    }

    public static void main(String[] args) {
        final BooleanLockTest booleanLockTest = new BooleanLockTest();
        IntStream.range(1, 10)
                .mapToObj(p -> new Thread(() -> {
                    booleanLockTest.syncMethod();
                }))
                .forEach(Thread::start);
    }
}
```



 

输出

``` java
Thread[Thread-0,5,main] get the lock
Thread-0 release the lock
Thread[Thread-8,5,main] get the lock
Thread-8 release the lock
Thread[Thread-1,5,main] get the lock
```



## 参考文章
* https://www.cnblogs.com/bjlhx/p/10555194.html