---
title: Java基础核心类库
---

::: tip
本文主要是介绍 Java基础核心类库 。
:::

[[toc]]

## 前言

前言点击此处查看:
http://blog.csdn.net/wang7807564/article/details/79113195

Java自带很多实用的包，这些包中定义了很多类库，可以很方便地进行代码重用。
常用的Java核心包及其功能是：

| 包名            | 主要功能                                                   |
| --------------- | ---------------------------------------------------------- |
| java.applet     | 提供了创建applet需要的所有类                               |
| java.awt.*      | 提供了创建用户界面以及绘制和管理图形、图像的类             |
| java.beans.*    | 提供了开发Java Beans需要的所有类                           |
| java.io         | 提供了通过数据流、对象序列以及文件系统实现的系统输入、输出 |
| java.lang.*     | Java编程语言的基本类库                                     |
| java.math.*     | 提供了简明的整数算术以及十进制算术的基本函数               |
| java.rmi        | 提供了与远程方法调用相关的所有类                           |
| java.net        | 提供了用于实现网络通讯应用的所有类                         |
| java.security.* | 提供了设计网络安全方案需要的一些类                         |
| java.sql        | 提供了访问和处理来自于Java标准数据源数据的类               |
| java.util.*     | 包括集合类、时间处理模式、日期时间工具等各类常用工具包     |

除此之外，还有JAVA的扩展包，其包名及主要功能是:

| 包名                | 主要功能                                                   |
| ------------------- | ---------------------------------------------------------- |
| javax.accessibility | 定义了用户界面组件之间相互访问的一种机制                   |
| javax.naming.*      | 为命名服务提供了一系列类和接口                             |
| javax.swing.*       | 提供了很多轻量级的用户界面组件，是目前Java用户界面常用的包 |

## java.lang.*

这是Java最为基础和常用的包，是唯一可以不用import直接导入的包，其在编译的过程中会自动加载。在该包中定义了Object类，类型包容器，字符串类，System类，Runtime类等相关核心部分。后续部分将主要详解java.lang包内的一些关键类及其实现思想和JDK代码。

## 【----------------------------】

## Java核心类库

### Java 的类定义语法：

[类类型关键字] class 类名字 [extends] 父类名字 {

   [存取权限关键字] [静态标志] 变量名字；

   [存取权限关键字] [静态标志] 方法名字；

}

###  类型关键字：

abstract 抽象类 

     抽象类至少要有一个抽象操作函数，这样的类不能实例化，必须被子类继承，并改写抽象函数。 

final   终结类 

     终结类是类继承链的末端，不能作进一步的继承。

public  公共类 

      可以作进一步的继承，或其他的类中存取。

synchronized 同步类 

      所有的操作函数都是同步的

 

### 存取权限关键字：

public  公共方式 

      表示后续的变量或函数可以在其他任何类的任何地方存取

protected 保护方式 

      表示后续的变量或函数只能在本身或引申的子类中存取 

private  私有方式 

      表示后续的变量或函数只能在本身存取 

friendly 友好方式 

      表示后续的变量或操作函数能且只能被同一个包的所有对象存取，这是缺省模式。

 

### 静态标识关键字 

static 

- 如果修饰变量：表示从该类引申出的示例都共享同一个变量 
- 如果修饰函数：表示该函数只能存取静态变量

interface :包含一些未实现的操作函数集合，这些函数可以是公共的 public 或 抽象的 abstract 

变量可以是public 或 static 或 final。与抽象类区别：接口不强制用户去引申子类，接口能保证 

每个类实现具有同样的操作函数。

```java
接口语法：
public interface 接口名 {
  // 描述
  void func1();
  // 描述
  void func2();
}
使用接口：
class 类名 implements 接口 {
  void func1() { 实现部分 }
  void func2() { 实现部分 }
}
```

### Java中关键字：

this  指向本类的指针，往往可以省略 

super 指向父类的指针

 

### 异常处理语句： 

Java会检测错误，并判断发生了什么类型错误，当错误发生时，会停止运行程序把错误信息打印处理。

```java
1, try-catch-finally
格式：
try {
  一些可能产生异常处理的语句
} catch(某种错误类型1 错误变量名) {
  针对错误类型1，执行异常处理的操作
} catch(某种错误类型2 错误变量名) {
  针对错误类型2，执行异常处理的操作
} finally {
  执行异常处理的操作
}
2, throw 
格式:
throw 例外对象，其中例外对象可以是自己创建的新对象
void MyMethod() {
  try {
    if(no error) { 
      正常
    } else {
      throw new Exception();
    }
  } catch(new Exception e) {
    处理该例外情况
  }
}
```

## Java基础类库 
概念：代码重用是面向对象程序设计的一个最著优势、生成可重用、可继承的类可以节省大量的时间和精力， 

大大提高编程效率。Java把代码重用作为实现的核心，提供许多可为Java编程使用的标准对象，这些标准的Java对象统一称作Java类库。

Java类库结构： 

从功能上划分：语言类库、输入输出类库、实用程序类库和applet类库、图形用户接口awt类库、网络类库

### 基础类库： 
    import java.lang.*; 
    import java.io.*; 
    import java.util.*; 

1） 语言类库 java.lang软件包 

封装了各种基本编程功能类方法，基本对象类，布尔数、字符和数字类型包容器，基本数学函数类，字符串类 

标准输入输出等系统类，线程控制和例外处理类。

2） 输入输出类库 java.io软件包 

提供对不同的输入和输出设备读写数据的支持。主要包括：输入流、输出流、文件访问类、流标记类

3） 实用程序类库 java.util软件包 

提供了执行各种辅助功能的类，包括随机处理，日期类，向量和栈处理等。

### 一、应用类库： 
    import java.applet.* 
   import java.awt.* 
   import java.net.* 
1）applet 类库 
 提供在WWW浏览器环境中实现Java Applet的类，实现音视频播放等功能 
2）awt 类库 
 提供生成图像用户界面的类，包括的类方法有：窗口、按钮、菜单、字体等。 
3）net 网络类库 
 提供了对网络协议的接口功能，包括：Sockets、Telnet、FTP、WWW等

 
### 二、语言类库： 
Java语言类库是Java类库的核心部分，Java类层次顶部是Object类，而Object类就包含在语言类库中 

java.lang软件包在编译时自动加载，因此不需要明确的通过import语句导入。

### 1）Object类

```java
是Java类中最底层的类，是所有Java类的超类。
以下是Object类中的一些非常有用的成员函数：
protected Object clone()
  调用该成员函数的对象将生成一个新对象，并将其内容复制到新对象。
public int hashCode()
  该成员函数返回一个对象的散列码值，散列码是Java系统中表示对象的唯一整数
public final Class getClass()
  以Class类的形式返回一个对象的类信息，对象的类信息包括类名、父类名、实现的接口和其他属性
  如：System.out.println("class name:" + rect.getClass().getName());
public String toString()
  返回一个对象值的字符串，派生类需要重载这个函数
```

### 2）类型包容器 

类型包容器是对各种数据类型——布尔数、字符、整数和浮点数等一类实现的总称。 

类型包容器：是类，从类型包容器中获取数据一定要用：typeValue()函数 

类型包容器实现的类：Boolean、Character、Double、Float、Integer、Long

```java
成员函数：
public ClassType()
  所有类型包容器的构造函数都需要一个参数作为其封装的数据类型。如：Integer i = new Integer(1);
public type typeValue()
  返回生成的类型包容器的原始数据类型值；如：
  int x = i.intValue();	char y = ch.charValue();
public String toString()
  返回包容器中类型的字符串表示
public boolean equals(Object obj)
  除了Character，其他类型包容器都实现了该成员函数，用来比较两个数据类型对象是否相等
 
(1) Boolean类
  为布尔数据类型提供了一个对象包容器及面向对象的操作方法。
  public static boolean getBoolean(String name) 返回参数name的布尔属性值
  Boolean类有两种状态：TRUE(真) 或 FALSE(假)
  boolean bo = Boolean.TRUE; 或 boolean bo = Boolean.FALSE;
(2) Character 类
  public static boolean isLowerCase(char ch)
    如果字符是小写返回真，否则返回假
  public static boolean isUperCase(char ch)
  public static int digit(char ch, int radix);
    返回字符ch的整数值，其中radix为基数(2, 8, 10, 16)表示进制
  public static boolean isDigit(char ch)
  public static char forDigit(int digit, int radix)
  public static char toLowerCase()
  public static char toUpperCase(char ch)
(3) Number 类
  Number类是作为抽象类实现的，它是整数、长整数、浮点数和双精度的类型包容器
  public int intValue()
  public long longValue()
  public float floatValue()
  public double doubleValue()
  主要用于数据类型的转换，如：
  Double d = new Double(1.234);
  int x = d.intValue();
(4) Integer 类
  public static int parseInt(String s, int radix)
  public static int parseInt(String s)
    将一个字符串转换为整数值
  public static Integer parseInt(String s)
  public static Integer parseInt(String s, int val)
  public static int parseInt(String s, int radix)
  返回字符串name指定的整数属性值
  Integer类包括两个静态的数据成员：MINVALUE 和 MAXVALUE 用来指定Integer对象可表示的最小值和最大值	
(5) Float 类
  Float类是浮点数类型包容器
  public boolean isInfinite()
  public static boolean isInfinite(float v)	
  判断是否为无穷数
  public static int floatToIntBits(float value)
  public static float intBitsToFloat(int bits)
```

 

### 3）数学函数类 

```java
成员函数：
public static type max(type a, type b);	// type 可为：int long double  float
public static type min(type a, type b);
public static type abs(type a)
```

 

### 4）字符串类 

```java
Java 类库提供了两个字符串类：String 和 StringBuffer，其中String类用于不变的常量字符串，而
StrigBuffer用于可变的字符串。
(1)String类的使用
String s = "Hello world";
String s = new String(someString)
public String(char value[])
public String(char value[], int offset, int count)
public String(byte ascii[], int hibyte)
public String(byte ascii[], int hibyte, int offset, int count)
public int length();
public char charAt(int index)
public boolean equals(Object o)
public int compartTo(String s)
public boolean regionMatches(int toffset, String other, int offset, int len)
public boolean startsWith(String prefix)
public boolean endsWith(String suffix)
public int indexOf(String str)
public String substring(int beginIndex, int endIndex)
public String concat(String str)
public String toLowerCase()
public String toUpperCase()
public char toCharArray()
public static String valueOf(type variable)
字符串转为其他类型：String str;
float f = Float.valueOf(str).floatValue();
str.getBytes(0, str.length(), buf, 0);	// to byte []buf
str.getChars(0, str.length(), buf, 0);	// to char []buf	
其他转为字符串：
  String toString()
  new String();
(2)StringBuffer
主要提供了对字符串插入和增加数据的方法，当生成了一个StringBuffer对象后，可以通过函数toString()将
它转换为String对象。
public StrigBuffer()
public StringBuffer(int length);	// 生成一个空的字符串缓冲器
public StringBuffer(String str)
两个多态的成员函数：append() 和 insert()
public int length()
public int capacity()
public synchronized StringBuffer insert(int offset, type variable)
public String toString()
```

### 5）System和Runtime类 

```java
System和Runtime类提供了对系统和运行环境资源进行访问的能力，System类最有用的一个功能就是标准输入和输出流。Runtime类主要用于执行系统命令和确定系统资源，如系统内存大小。
(1) System 类
System类的所有变量和成员函数都是静态的。所以不需要生成一个System示例就可以调用其成员函数。
三个静态变量：
  public static InputStream in;
  public static PrintStream out;
  public static PrintStream err
这些变量与stdin、stdout、stderr的交互提供了read()、print()、println()等成员函数
重要的成员函数：
public static void arraycopy(type src[], int srcpos, type dst[], int despost, int length)
这里的type可以是boolean byte char short int long float double object 等
public static long currentTimeMillis()
public static Properties getProperties()
public static String getProperty(String key)
public static String getProperty(String key, String default_value)
public static void setProperties(Properties prop)	// Properties类对象来设置系统属性
public static void gc()	// 清理内存垃圾
public static loadLibrary(String libname)	// 载入动态链接库

(2)Runtime类
用于访问Java系统资源的另一个类；
public Process exec(String command)	// 执行系统命令，返回一个子进程，是一个多态成员函数
public void exit(int status)		// 根据status 指定的退出状态，终止解释器的运行
public long freeMemory()		// 返回系统剩余内存字节数
public long totalMemory()		// 返回系统总的内存字节数
```

### 三、输入/输出类库

### 1）输入流类

```java
1) InputStream
是一个抽象类，作为其它输出流类的基类，定义了读取字节流信息的基本接口。
定义了成员函数：
  public abstract int read()	// 从输入流读取一个字节的数据，作为整数返回
  public int read(byte b[])	// 部分阻塞
  public int read(byte b[], int off, int len)	// off：数组存放起始位置,len：读取最大数长度
  public long skip(long n)	// 跳过输入流中的n个字节，返回实际跳过的字节数
  public int available()		// 确定在没有阻塞情况下可以读取的输入数据字节数
  public synchronized void mark(int readlimit)	// 标记流的当前位置	
  public synchronized void reset()		// 返回上面标记的位置
  public boolean markSupported()			// 检验一个输入流是否支持mark/reset机制
  public void close()
(2) BufferedInputStream
  为输入提供了缓冲流，每次从输入设备读取数据时，将读取较多的数据并放入缓冲流，以后就可以直接从
流缓冲区而不是输入设备读数据。除了构造函数外，其他成员函数与InputStream相同。
BufferedInputStream(InputStream in)
BufferedInputStream(InputStream in, int size)
变量：
  protected byte buf[]	// 输入数据存储的缓冲区
  protected int count	// 缓冲区实际存储字节数
  protected int pos	// 缓冲区中当前读数据的位置
  protected int markpos	
  protected int marklimit
(3) DataInputStream
  用来从一个输入流读取基本Java数据类型，构造函数以一个InputStream对象为参数。
  DataInputStream(InputStream in)
  public final void readFully(byte [])	// 阻塞直到读完全部数据
  public final void readFully(byte b[], int off, int len)
  public final String readLine()	// 读取以\n \r \r\n EOF 终止的一行文本
  public final boolean readBoolean()
  public final byte readByte()
  public final int readUnsignedByte()
  public final short readShort()
  public final char readChar()
  public final int readInt()
  public final long readLong()
  public final float readFloat()
  public final double readDouble()
(4) FileInputStream
  用于执行简单的文件输入操作，对于复杂的需要用RandomAccessFile类。
构造函数：
  FileInputStream(String name)	// 文件名
  FileInputStream(File file);	// File 文件对象
  FileInputStream(FileDescriptor fbOcj);
(5) StringBufferInputStream
  用一个字符串作为输入缓冲区。
构造函数：
  StringBufferInputStream(String s)
成员变量：
  protected String buffer;
  protected int count;
  protected int pos;
```

### 2）输出流类

```java
(1) OutputStream
  其他输出流类的基类，定义了把数据写到输出设备的基本协议。
成员函数：
  public abstract void write(int b);	// b指定的单个字节写到输出
  public void write(byte b[])		
  public void write(byte b[], int off, int len)	// off 字节数组输出起始地址 len 输出数据字节数
  public void flush()		// 刷新输出流
  public void close()		// 当OutputStream对象破坏时，流将自动关闭
(2) PrintStream
  用于输出文本数据，如输出到标准输出。
构造函数：
  PrintStream(OutputStream out)
  PrintStream(OutputStream out, boolean autoflush)	// autoflush指定是否每当遇到换行符即输出流
成员函数：
  public boolean checkError()
  public void print(Object obj)	// 调用toString()打印输出
  public synchronized void print(String s)
  public synchronized void print(char s[])
  public void print(char/int/long/float/double/boolean )
  public void println(char/int/long/float/double/boolean )
  
(3) BufferedOutputStream
  对OutputStream类的扩展，对缓冲输出提供支持。每次写数据时不必写到输出设备，而是写数据到缓冲区。
构造函数：
  BufferedOutputStream(OutputStream out)
  BufferedOutputStream(OutputStream out, int size)	// size 指定缓冲区大小
成员变量：
  protected byte buf[];
  protected int count;
(4) DataOutputStream
  用于输出原始数据类型，如int float等。
(5) FileOutputStream
  用于执行简单的文件输出操作，对于复杂的文件输出可以使用RandomAccessFile类。
构造函数：
  FileOutputStream(String name)
  FileOutputStream(File file)
  FileOutputStream(FileDescriptor fbObj)
 
3）文件类
  前面我们介绍了两个基本的文件流输入输出流类：FileInputStream和FileOutputStream。除此之外
Java还为我们提供了两个队文件进行操作的类：File 和 RandomAccessFile。
(1) File 类
  以操作系统目录结构为模型，使你能访问一个文件的信息，包括文件属性、文件所在路径等。
构造函数：
  File(String path)	// 文件完全路径
  File(String path, String name)	// 文件路径 和 文件名
  File(File dir, String name)	// File对象来指定文件路径，name指定文件名
成员函数：
  public String getName()		// 获取文件名字
  public String getPath()		// 可能为相对路径
  public String getAbsolutePath()	// 绝对路径
  public String getParent();	// 上一级目录
  public boolean exists();
  public boolean canWrite();
  public boolean canRead();
  public boolean isFile();
  public boolean isDirectory();
  public boolean isAbsolute();
  public long lastModified();
  public long length();
  public boolean mkdir();
  public boolean mkdirs();
  public boolean renameTo(File dest);
  public boolean delete()
  public String[] list();
  public String[] list(FilenameFilter filter)
  
(2) RandomAccessFile 类
  提供了从一个文件读写数据的各种方法。使用FIleInputStream和FileOutputStream只能顺序的从头
到尾访问文件，而RandomAccessFile可以明确的从文件某个位置获取数据。
构造函数：
  public RandomAccessFile(String name, String mode)	// mode 可以是r 或 rw
  public RandomAccessFile(File file, String mode)
函数：
  public long length()	// 返回文件长度
  public void seek(long pos)	// 文件指针移动到指定位置
  public long getFilePointer()	// 返回文件指针
  public void close()	
  public int read()	// 读一个字节数据，指针移动8bit
  public int read(byte b[]) 	
  public int read(byte[], int off, int len)	// 读到b中以off开水地方
  public final String readLine()	// 读取一行以\n 或 EOF结束
  public final String readUTF()
  public final boolean readBoolean()
  public final byte readByte()
  public final char readChar()
  public final short readShort()
  public final int readInt()
  public final long readLong()
  public final float readFloat()
  public final double readDouble()
  public void write()
  public void write(byte [])
  public void write(byte[], inf off, int len)
  public final void writeUTF(String utf)
  public final void writeBoolean(boolean b)
  public final void writeByte(byte b)
  public final void writeChar(char c)
  public final void writeShort(short s)
  public final void writeInt(int i)
  public final void writeLong(long l)
  public final void writeFloat(float f)
  public final void writeDouble(double d)
```


## 参考文章
* https://blog.csdn.net/qishuo_java/article/details/50175031
* https://blog.csdn.net/wang7807564/article/details/79315042