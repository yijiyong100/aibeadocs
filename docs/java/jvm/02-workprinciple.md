---
title: 虚拟机工作原理
---


::: tip
本文主要是介绍 虚拟机工作原理 。
:::

[[toc]]

Java虚拟机工作原理

## 虚拟机工作原理图

　　首先我想从宏观上介绍一下Java虚拟机的工作原理。从最初的我们编写的Java源文件（.java文件）是如何一步步执行的，如下图所示，首先Java源文件经过前端编译器（javac或ECJ）将.java文件编译为Java字节码文件，然后JRE加载Java字节码文件，载入系统分配给JVM的内存区，然后执行引擎解释或编译类文件，再由即时编译器将字节码转化为机器码。主要介绍下图中的类加载器和运行时数据区两个部分。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/java/jvm/prin-1.png')" alt="wxmp">

## 类加载

　　类加载指将类的字节码文件（.class）中的二进制数据读入内存，将其放在运行时数据区的方法区内，然后在堆上创建java.lang.Class对象，封装类在方法区内的数据结构。类加载的最终产品是位于堆中的类对象，类对象封装了类在方法区内的数据结构，并且向JAVA程序提供了访问方法区内数据结构的接口。如下是类加载器的层次关系图。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/java/jvm/prin-2.png')" alt="wxmp">

- - 启动类加载器（BootstrapClassLoader）：在JVM运行时被创建，负责加载存放在JDK安装目录下的jre\lib的类文件，或者被-Xbootclasspath参数指定的路径中，并且能被虚拟机识别的类库（如rt.jar，所有的java.*开头的类均被Bootstrap ClassLoader加载）。启动类无法被JAVA程序直接引用。
  - 扩展类加载器（Extension ClassLoader）：该类加载器负责加载JDK安装目录下的\jre\lib\ext的类，或者由java.ext.dirs系统变量指定路径中的所有类库，开发者也可以直接使用扩展类加载器。
  - 应用程序类加载器（AppClassLoader）：负责加载用户类路径（Classpath）所指定的类，开发者可以直接使用该类加载器，如果应用程序中没有定义过自己的类加载器，该类加载器为默认的类加载器。
  - 用户自定义类加载器（User ClassLoader）：JVM自带的类加载器是从本地文件系统加载标准的java class文件，而自定义的类加载器可以做到在执行非置信代码之前，自动验证数字签名，动态地创建符合用户特定需要的定制化构建类，从特定的场所（数据库、网络中）取得java class。

注意如上的类加载器并不是通过继承的方式实现的，而是通过组合的方式实现的。而JAVA虚拟机的加载模式是一种委派模式，如上图中的1-7步所示。下层的加载器能够看到上层加载器中的类，反之则不行。类加载器可以加载类但是不能卸载类。说了一大堆，还是感觉需要拿点代码说事。

首先我们先定义自己的类加载器MyClassLoader，继承自ClassLoader，并覆盖了父类的findClass(String name)方法，如下：

``` java
public class MyClassLoader extends ClassLoader{
    private String loaderName;  //类加载器名称
    private String path = "";   //加载类的路径
    private final String fileType = ".class";
    public MyClassLoader(String name){
        super();   //应用类加载器为该类的父类
        this.loaderName = name;
    }
    public MyClassLoader(ClassLoader parent,String name){
        super(parent);
        this.loaderName = name;
    }
    public String getPath(){return this.path;}
    public void setPath(String path){this.path = path;}
    @Override
    public String toString(){return this.loaderName;}
    
    @Override
    public Class<?> findClass(String name) throws ClassNotFoundException{
        byte[] data = loaderClassData(name);
        return this.defineClass(name, data, 0, data.length);
    }
    //读取.class文件
    private byte[] loaderClassData(String name){
        InputStream is = null;
        byte[] data = null;
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        try {
            is = new FileInputStream(new File(path + name + fileType));
            int c = 0;
            while(-1 != (c = is.read())){
                baos.write(c);
            }
            data = baos.toByteArray();

        } catch (Exception e) {
            e.printStackTrace();
        } finally{
            try {
                if(is != null)
                    is.close();
                if(baos != null)
                    baos.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return data;
    }
}

```


　　我们如何利用我们定义的类加载器加载指定的字节码文件（.class）呢？如通过MyClassLoader加载C:\\Users\\Administrator\\下的Test.class字节码文件，代码如下所示：



``` java
public class Client {
    public static void main(String[] args) {
        // TODO Auto-generated method stub        
        //MyClassLoader的父类加载器为系统默认的加载器AppClassLoader
        MyClassLoader myCLoader = new MyClassLoader("MyClassLoader");
        //指定MyClassLoader的父类加载器为ExtClassLoader
        //MyClassLoader myCLoader = new MyClassLoader(ClassLoader.getSystemClassLoader().getParent(),"MyClassLoader");
        myCLoader.setPath("C:\\Users\\Administrator\\");
        Class<?> clazz;
        try {
            clazz = myCLoader.loadClass("Test");
            Field[] filed = clazz.getFields();   //获取加载类的属性字段
            Method[] methods = clazz.getMethods();   //获取加载类的方法字段
            System.out.println("该类的类加载器为：" + clazz.getClassLoader());
            System.out.println("该类的类加载器的父类为:" + clazz.getClassLoader().getParent());
            System.out.println("该类的名称为：" + clazz.getName());
        } catch (ClassNotFoundException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
    }
}
```



## 运行时数据区

　　字节码的加载第一步，其后分别是认证、准备、解析、初始化，那么这些步骤又具体做了哪些工作，以及他们会对运行时数据区缠身什么影响呢？如下图所示：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/java/jvm/prin-3.png')" alt="wxmp">

　　如下我们将介绍运行时数据区，主要分为方法区、Java堆、虚拟机栈、本地方法栈、程序计数器。其中方法区和Java堆一样，是各个线程共享的内存区域，而虚拟机栈、本地方法栈、程序计数器是线程私有的内存区。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/java/jvm/prin-4.png')" alt="wxmp">


### Java堆：
Java堆是Java虚拟机所管理的内存中最大的一块，被进程的所有线程共享，在虚拟机启动时被创建。该区域的唯一目的就是存放对象实例，几乎所有的对象实例都在这里分配内存，随着JIT编译器的发展与逃逸分支技术逐渐成熟，栈上分配、标量替换等优化技术使得对象在堆上的分配内存变得不是那么“绝对”。Java堆是垃圾收集器管理的主要区域。由于现在的收集器基本都采用分代收集算法，所以Java堆中还可以分为老年代和新生代(Eden、From Survivor、To Survivor)。根据Java虚拟机规范，Java堆可以处于物理上不连续的内存空间，只要逻辑上连续即可。该区域的大小可以通过-Xmx和-Xms参数来扩展，如果堆中没有内存完成实例分配，并且堆也无法扩展，将会抛出OutOfMemoryError异常。

### 方法区：
用于存储被Java虚拟机加载的类信息、常量、静态变量、即时编译器编译后的代码等数据。不同于Java堆的是，Java虚拟机规范对方法区的限制非常宽松，可以选择不实现垃圾收集。但并非数据进入了方法区就“永久”存在了，这区域内存回收目标主要是针对常量池的回收和对类型的卸载。如果该区域内存不足也会抛出OutOfMemoryError异常。
     - 常量池：这个名词可能大家也经常见，它是方法区的一部分。Class文件除了有类的版本、字段、方法、接口等描述信息外，还有一项信息就是常量池，用于存放编译期生成的各种字面量和符号引用。Java虚拟机运行期间，也可能将新的常量放入常量池（如String类的intern()方法）。
### 虚拟机栈：
线程私有，生命周期与线程相同。虚拟机栈描述的是Java方法执行的内存模型：每个方法在执行时都会创建一个栈帧用于存储局部变量表、操作数栈、动态链接、方法出口等信息。每个方法从调用直至执行完成的过程，就对应着一个栈帧在虚拟机栈中入栈到出栈的过程。如果请求的站深度大于虚拟机所允许的深度，将抛出StackOverflowError异常，虚拟机栈在动态扩展时如果无法申请到足够的内存，就会抛出OutOfMemoryError异常。!
<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/java/jvm/prin-5.png')" alt="wxmp">

### 本地方法栈：
与虚拟机栈类似，不过虚拟机栈是为虚拟机执行Java方法（字节码）服务，而本地方法栈则是为虚拟机使用到的Native方法服务。该区域同样会报StackOverflowError和OutOfMemoryError异常。

### 程序计数器：
一块较小的内存空间，可以看作是当前线程所执行的字节码的行号指示器。字节码解释器工作时就是通过改变这个计数器的值来选取下一条需要执行的字节码指令，分支、循环、跳转、异常处理、线程恢复等基础功能都需要依赖这个计数器完成。如果线程正在执行一个Java方法，计数器记录的是正在执行的虚拟机字节码指令的地址，如果正在执行的是Native方法，这个计数器值为空。此内存区域是唯一一个在Java虚拟机规范中没有规定任何OutOfMemoryError情况的区域。

　　写了这么多，感觉还是少一个例子。通过最简单的一段代码解释一下，程序在运行时数据区个部分的变化情况。



``` java
public class Test{
      public static void main(String[] args){
           String name = "best.lei";
           sayHello(name);
       }
       public static void sayHello(String name){
           System.out.println("Hello " + name);
       }
}
```



　　通过编译器将Test.java文件编译为Test.class，利用javap -verbose Test.class对编译后的字节码进行分析，如下图所示：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/java/jvm/prin-6.png')" alt="wxmp">

　　我们在看看运行时数据区的变化：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/java/jvm/prin-7.png')" alt="wxmp">

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/java/jvm/prin-8.png')" alt="wxmp">




## 参考文章
* https://www.cnblogs.com/zhanglei93/p/6590609.html