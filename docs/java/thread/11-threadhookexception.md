---
title: 线程-Hook和异常捕捉
---


::: tip
本文主要是介绍 线程-Hook和异常捕捉 。
:::

[[toc]]


## 一、获取线程运行时异常

　　在Thread类中有四个：

　　public void setUncaughtExceptionHandler(UncaughtExceptionHandler eh)：为某个特定线程指定UncaughtExceptionHandler

　　public static void setDefaultUncaughtExceptionHandler(UncaughtExceptionHandler eh)：设置全局的UncaughtExceptionHandler

　　public UncaughtExceptionHandler getUncaughtExceptionHandler()：获取特定线程的UncaughtExceptionHandler

　　public static UncaughtExceptionHandler getDefaultUncaughtExceptionHandler()：获取全局的UncaughtExceptionHandler

## 1.1、UncaughtExceptionHandler

　　线程在执行单元中是不允许抛出checked异常的，而且线程运行在自己的上下文中，派生他的线程将无法直接获得他运行中出现的异常信息。对此，java提供了UncaughtExceptionHandler接口，当线程在运行过程中出现异常时，会回调UncaughtExceptionHandler接口，从而得知哪个线程在运行时出错，以及出现什么样的错误。



``` java
    @FunctionalInterface
    public interface UncaughtExceptionHandler {
        /**
         * Method invoked when the given thread terminates due to the
         * given uncaught exception.
         * <p>Any exception thrown by this method will be ignored by the
         * Java Virtual Machine.
         * @param t the thread
         * @param e the exception
         */
        void uncaughtException(Thread t, Throwable e);
    }
```



　　UncaughtExceptionHandler是一个FunctionalInterface，只有一个抽象方法，该接口会被Thread的dispatchUncaughtException方法调用，如：



``` java
    /**
     * Dispatch an uncaught exception to the handler. This method is
     * intended to be called only by the JVM.
     */
    private void dispatchUncaughtException(Throwable e) {
        getUncaughtExceptionHandler().uncaughtException(this, e);
    }
```



　　当线程在运行过程中出现异常时，JVM会调用dispatchUncaughtException方法，该方法会将对应线程实例以及异常消息传递给回调接口

1.2、实例



``` java
    public static void main(String[] args) {
        Thread.setDefaultUncaughtExceptionHandler((t, e) -> {
            System.out.println(t.getName() + " occur execption.");
            e.printStackTrace();
        });

        final Thread thread = new Thread(() -> {
            try {
                TimeUnit.SECONDS.sleep(2);
            } catch (InterruptedException e) {
            }
            System.out.println(1 / 0);
        }, "Test-Thread");
        thread.start();
    }
```



输出

``` java
Test-Thread occur execption.
java.lang.ArithmeticException: / by zero
    at com.github.bjlhx15.common.threaddemo
```

 

此种设计方式比较常见，如Google的guava toolkit的EventBus。

## 1.3、源码

比较简单，主要是线程出现异常→main Group→System Group→System.err

## 二、注入钩子线程

## 2.1、Hook线程

　　通过Runtime可以为JVM进程退出时注入多个Hook线程。如下



``` java
    public static void main(String[] args) {
        Runtime.getRuntime().addShutdownHook(new Thread(()->{
            System.out.println("第1个hook,start");
            try {
                TimeUnit.SECONDS.sleep(1);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            System.out.println("第1个hook,end");
        }));
        Runtime.getRuntime().addShutdownHook(new Thread(()->{
            System.out.println("第2个hook,start");
            try {
                TimeUnit.SECONDS.sleep(2);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            System.out.println("第2个hook,end");
        }));
        System.out.println("程序结束。");
    }
```



输出：

``` java
程序结束。
第1个hook,start
第2个hook,start
第1个hook,end
第2个hook,end
```

 

2.2、实例

防止某个程序被重复启动，在进程启动时候创建一个lock文件，进程收到中断信号的时候会删除这个lock文件，比如mysql、zk、kafka等均能看到lock文件存在。



``` java
public class ThreadDemo11PreventDuplicatedHook {
    private final static String LOCK_PATH="/Users/lihongxu6/tmp/";
    private final static String LOCK_FILE=".lock";
    private final static String PERMISSIONS="rw-------";

    public static void main(String[] args) throws IOException {
        checkRunning();
        Runtime.getRuntime().addShutdownHook(new Thread(()->{
            System.out.println("The program received kill signal.");
            getLockFile().toFile().delete();
        }));
        while (true){
            try {
                TimeUnit.SECONDS.sleep(1);
                System.out.println("program is running.");
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }
    private static void checkRunning() throws IOException {
        Path path=getLockFile();
        if(path.toFile().exists())
            throw new RuntimeException("The program already running.");
        Set<PosixFilePermission> perms= PosixFilePermissions.fromString(PERMISSIONS);
        Files.createFile(path,PosixFilePermissions.asFileAttribute(perms));
    }
    private static Path getLockFile(){
        return Paths.get(LOCK_PATH,LOCK_FILE);
    }
}
```



 

运行过程中会出现

```
-rw-------    1 lihongxu6 lihongsu\Domain Users         0 Feb 18 17:23 .lock
```

在程序正常退出或者kill pid、kill -1 pid之后，JVM进程会收到中断信号，并且启动hook线程删除.lock文件，

```
program is running.
The program received kill signal.
```

##  2.3、注意事项

Hook线程只有在收到退出信号的时候被执行，如果在kill时候使用-9强杀进程，hook不会被执行。

hook线程一般用于一些资源释放工作，比如关闭句柄、socket连接、数据库的connection等

尽量不要做非常耗时操作

## 参考文章
* https://www.cnblogs.com/bjlhx/p/14412753.html