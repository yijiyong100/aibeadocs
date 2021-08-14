---
title: JUC-同步器-介绍
---


::: tip
本文主要是介绍 JUC-同步器-介绍 。
:::

[[toc]]

# J.U.C体系进阶（四）：juc-sync 同步器框架


## juc-sync同步器 
juc-sync同步器框架，是指`java.util.concurrent`包下一些辅助同步器类，每个类都有自己适合的使用场景：

| 同步器名称     | 作用                                                                                                                        |
| -------------- | --------------------------------------------------------------------------------------------------------------------------- |
| CountDownLatch | 倒数计数器，构造时设定计数值，当计数值归零后，所有阻塞线程恢复执行；其内部实现了AQS框架                                     |
| CyclicBarrier  | 循环栅栏，构造时设定等待线程数，当所有线程都到达栅栏后，栅栏放行；其内部通过ReentrantLock和Condition实现同步                |
| Semaphore      | 信号量，类似于“令牌”，用于控制共享资源的访问数量；其内部实现了AQS框架                                                       |
| Exchanger      | 交换器，类似于双向栅栏，用于线程之间的配对和数据交换；其内部根据并发情况有“单槽交换”和“多槽交换”之分                        |
| Phaser         | 多阶段栅栏，相当于CyclicBarrier的升级版，可用于分阶段任务的并发控制执行；其内部比较复杂，支持树形结构，以减少并发带来的竞争 |



Java多线程环境中存在内置锁与同步锁，内置锁即由synchronized修饰的代码，借助于对象的内置锁实现，为重量级锁，同步锁即JUC中提供的多种类型的锁，其使用简便，功能强大，一起来看究竟吧！


## 一、CountDownLatch

- 允许一个或多个线程等待一组线程运行结束；
- 与CyclicBarrier相比：
   CountDownLatch允许一个或者多个线程等待一组线程，而CyclicBarrier允许多个线程互相等待；
   Cyclic的Barrier是循环使用的，而CountDownLatch中的计数器不是循环使用的，[CountDownLatch原理和源码解读](http://www.cnblogs.com/skywang12345/p/3533887.html)



```java
public class CountDownLatchTest {
    private static int size = 5;
    private static CountDownLatch cdl;
    
    public static void main(String[] args) {
        cdl = new CountDownLatch(size);

        try {
            for(int i=0;i<5;i++){
                new MyThread().start();
            }
        
            System.out.println(Thread.currentThread().getName()+":"+"正在运行");
            //主线程阻塞，等待其他线程
            cdl.await();
            System.out.println(Thread.currentThread().getName()+":"+"运行结束");
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
    
    static class MyThread extends Thread{

        @Override
        public void run() {
            super.run();
            try {
                Thread.sleep(1000);
                System.out.println(Thread.currentThread().getName()+":"+"休息1秒");
                cdl.countDown();
            } catch (Exception e) {
                e.getStackTrace();
            }
        }
    }
}
```



```java
main:正在运行
Thread-1:休息1秒
Thread-4:休息1秒
Thread-2:休息1秒
Thread-0:休息1秒
Thread-3:休息1秒
main:运行结束
```


## 二、CyclicBarrier

- 允许多个线程相互等待，直到达到公共屏障点；因为此处barrier释放线程后，可以重新使用，称为CyclicBarrier；
- 其本质为共享锁，却由ReentrantLock和Condition，即独占锁实现，源码解读参照[CyclicBarrier原理和源码解读](http://www.cnblogs.com/skywang12345/p/3533995.html)；



```java
public class CyclicBarrierTest {    
    private static int size = 5;
    private static CyclicBarrier cb;
    
    public static void main(String[] args) {
        cb = new CyclicBarrier(size,new Runnable(){
            public void run(){
                System.out.println("最后一个线程到达之后，所有线程释放之前");
            }
        });
        
        for (int i = 0; i < 5; i++) {
            new MyThread().start();
        }
    }
    
    static class MyThread extends Thread{
        @Override
        public void run() {
            super.run();
            try {
                System.out.println(Thread.currentThread().getName()+":"+"正在运行");
                cb.await();
                System.out.println(Thread.currentThread().getName()+":"+"运行结束");            
            } catch (Exception e) {
                e.getStackTrace();
            }
        }
    }
}
```



```shell
Thread-2:正在运行
Thread-4:正在运行
Thread-1:正在运行
Thread-3:正在运行
Thread-0:正在运行
最后一个线程到达之后，所有线程释放之前
Thread-0:运行结束
Thread-1:运行结束
Thread-2:运行结束
Thread-3:运行结束
Thread-4:运行结束
```

## 三、Semaphore

- 维护一个信号量许可集，通过acquire方法获取许可，无许可可用则等待，通过release方法释放许可，[Semaphore原理和源码解读](http://www.cnblogs.com/skywang12345/p/3534050.html)；
- 类比于停车场共有五个停车位，此时共有六辆车等待停车；五辆车获取许可后成功停车，第六量车因为车位许可而等待；若有车离开释放许可，则第六辆车获取许可，成功停车；
- 公平信号量和非公平信号量的作用原理，与公平锁和非公平锁相同，其
   释放信号量的方式相同，但是获取信号量的方式不同：
   公平信号量，如果线程在CLH队列头部，则直接获取，否则等待；
   非公平信号量，不考虑线程在CLH队列中的位置，直接获取；



```java
public class SemaphoreTest {
    private static int size = 10;
    private static Semaphore s;
    
    public static void main(String[] args) {
        s = new Semaphore(size);
        ExecutorService threadPool = Executors.newFixedThreadPool(3);
        threadPool.execute(new MyThread(5));
        threadPool.execute(new MyThread(4));
        threadPool.execute(new MyThread(7));
        threadPool.shutdown();
    }
    
    static class MyThread extends Thread{
        private int count;
        public MyThread(int count){
            this.count = count;
        }
        @Override
        public void run() {
            try {
                s.acquire(count);
                System.out.println(Thread.currentThread().getName()+"-acquire-"+count);
            } catch (Exception e) {
                e.getStackTrace();
            }finally{
                s.release(count);
                System.out.println(Thread.currentThread().getName()+"-release-"+count);
            }
        }
    }
}
```



```cpp
pool-1-thread-2-acquire-4
pool-1-thread-1-acquire-5 //thread-3在获取信号量时阻塞
pool-1-thread-1-release-5
pool-1-thread-2-release-4 
pool-1-thread-3-acquire-7
pool-1-thread-3-release-7
```

## 四、Exchanger

- 允许两个线程之间定义同步点交换数据，当两个线程均到同步点后，第一个线程的数据进入第二个线程，第二个线程的数据进入第一个线程；
- 通常当一个线程到达同步点时，有三种情况：
   另一个线程已经到达同步点且被挂起，则唤醒并交换数据；
   另一个线程为到达则自己被挂起，等待另一个线程到达后被唤醒；
   当前线程被中断，或者被挂起线程等待超时，则抛出异常；
- [Exchanger原理及源码解读](http://blog.csdn.net/chenssy/article/details/72550933)，源码难度阅读极大，欢迎看官们来挑战；



``` java
public class ExchangerTest {
    
    static class Producer implements Runnable{
    
        //生产者、消费者交换的数据结构
        private List<Stringbuffer;
    
        //步生产者和消费者的交换对象
        private Exchanger<List<String>exchanger;
        Producer(List<Stringbuffer,Exchanger<List<String>exchanger){
            this.buffer = buffer;
            this.exchanger = exchanger;
        }
    
        @Override
        public void run() {
            for(int i = 1 ; i < 5 ; i++){
                System.out.println("生产者第" + i + "次提供");
                for(int j = 1 ; j <= 3 ; j++){
                    System.out.println("生产者装入" + i  + "--" + j);
                    buffer.add("buffer：" + i + "--" + j);
                }
    
                System.out.println("生产者装满，等待与消费者交换...");
                try {
                    exchanger.exchange(buffer);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        }
    }
    
    static class Consumer implements Runnable {
        private List<Stringbuffer;
    
        private final Exchanger<List<String>exchanger;
    
        public Consumer(List<Stringbuffer, Exchanger<List<String>exchanger) {
            this.buffer = buffer;
            this.exchanger = exchanger;
        }
    
        @Override
        public void run() {
            for (int i = 1; i < 5; i++) {
                //调用exchange()与消费者进行数据交换
                try {
                    buffer = exchanger.exchange(buffer);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
    
                System.out.println("消费者第" + i + "次提取");
                for (int j = 1; j <= 3 ; j++) {
                    System.out.println("消费者 : " + buffer.get(0));
                    buffer.remove(0);
                }
            }
        }
    }
    
    public static void main(String[] args){
        List<Stringbuffer1 = new ArrayList<String>();
        List<Stringbuffer2 = new ArrayList<String>();
    
        Exchanger<List<String>exchanger = new Exchanger<List<String>>();
    
        Thread producerThread = new Thread(new Producer(buffer1,exchanger));
        Thread consumerThread = new Thread(new Consumer(buffer2,exchanger));
    
        producerThread.start();
        consumerThread.start();
    }
}
```



``` java
生产者第1次提供
生产者装入1--1
生产者装入1--2
生产者装入1--3
生产者装满，等待与消费者交换...
生产者第2次提供
生产者装入2--1
生产者装入2--2
消费者第1次提取
生产者装入2--3
消费者 : buffer：1--1
生产者装满，等待与消费者交换...
消费者 : buffer：1--2
消费者 : buffer：1--3
消费者第2次提取
生产者第3次提供
```



## 参考文章
* https://www.jianshu.com/p/0e411c78f385
* https://blog.csdn.net/weixin_40834464/article/details/89535034