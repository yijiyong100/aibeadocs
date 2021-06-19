---
title: Java类和对象操作
---

## Java基础知识篇【Java类和对象操作】

::: tip
本文主要是介绍Java Java类和对象操作 。
:::

[[toc]]


对象和类

## 一、对象和类
## 1.对象和类概述

Java作为一种面向对象语言。支持以下基本概念：

- 多态
- 继承
- 封装
- 抽象
- 类
- 对象
- 实例
- 方法
- 重载

本节我们重点研究**对象**和**类**的概念。

- **对象**：对象是类的一个实例（对象不是找个女朋友），有状态和行为。例如，一条狗是一个对象，它的状态有：颜色、名字、品种；行为有：摇尾巴、叫、吃等。
- **类**：类是一个模板，它描述一类对象的行为和状态。

## 2.Java中的对象

现在让我们深入了解什么是对象。看看周围真实的世界，会发现身边有很多对象，车，狗，人等等。所有这些对象都有自己的`状态`和`行为`。

拿一条狗来举例，它的状态有：名字、品种、颜色，行为有：叫、摇尾巴和跑。

对比现实对象和软件对象，它们之间十分相似。

软件对象也有状态和行为。软件对象的状态就是属性，行为通过方法体现。

在软件开发中，方法操作对象内部状态的改变，对象的相互调用也是通过方法来完成。

## 3.Java中的类

类可以看成是创建 Java 对象的模板。

通过下面一个简单的类来理解下 Java 中类的定义：

``` java
public class Dog{
  String breed;
  int age;
  String color;
  
  void barking(){
  }
 
  void hungry(){
  }
 
  void sleeping(){
  }
}
```

一个类可以包含以下类型变量：

- **局部变量**：在方法、构造方法或者语句块中定义的变量被称为局部变量。变量声明和初始化都是在方法中，方法结束后，变量就会自动销毁。
- **成员变量**：成员变量是定义在类中，方法体之外的变量。这种变量在创建对象的时候实例化。成员变量可以被类中方法、构造方法和特定类的语句块访问。
- **类变量**：类变量也声明在类中，方法体之外，但必须声明为static类型。

一个类可以拥有多个方法，在上面的例子中：`barking()`、`hungry()`和`sleeping()`都是Dog类的方法。

## 4.构造方法

每个类都有构造方法。如果没有显式地为类定义构造方法，Java编译器将会为该类提供一个默认构造方法。

在创建一个对象的时候，至少要调用一个构造方法。构造方法的名称必须与类同名，一个类可以有多个构造方法。

下面是一个构造方法示例：

``` java
public class Puppy{
   public Puppy(String name){
      //这个构造器仅有一个参数：name
      System.out.println("小狗的名字是 : " + name ); 
   }
   public static void main(String[] args){
      // 下面的语句将创建一个Puppy对象
      Puppy myPuppy = new Puppy( "tommy" );
   }
}
```

编译并运行上面的程序，会打印出下面的结果：

``` java
小狗的名字是 : tommy
```

## 5.访问实例变量和方法

通过已创建的对象来访问成员变量和成员方法，如下所示：

```java
/* 实例化对象 */
Object referenceVariable = new Constructor();
/* 访问类中的变量 */
referenceVariable.variableName;
/* 访问类中的方法 */
referenceVariable.methodName();
```

### 实例

下面的例子展示如何访问实例变量和调用成员方法：

``` java
public class Puppy{
   int puppyAge;
   public Puppy(String name){
      // 这个构造器仅有一个参数：name
      System.out.println("小狗的名字是 : " + name ); 
   }
 
   public void setAge( int age ){
       puppyAge = age;
   }
 
   public int getAge( ){
       System.out.println("小狗的年龄为 : " + puppyAge ); 
       return puppyAge;
   }
 
   public static void main(String[] args){
      /* 创建对象 */
      Puppy myPuppy = new Puppy( "tommy" );
      /* 通过方法来设定age */
      myPuppy.setAge( 2 );
      /* 调用另一个方法获取age */
      myPuppy.getAge( );
      /*你也可以像下面这样访问成员变量 */
      System.out.println("变量值 : " + myPuppy.puppyAge ); 
   }
}
```

编译并运行上面的程序，产生如下结果：

```
小狗的名字是 : tommy
小狗的年龄为 : 2
变量值 : 2
```

## 6.源文件声明规则

在本节的最后部分，我们将学习源文件的声明规则。当在一个源文件中定义多个类，并且还有 `import` 语句和 `package` 语句时，要特别注意这些规则。

- 一个源文件中只能有一个`public`类
- 一个源文件可以有多个非`public`类
- 源文件的名称应该和`public`类的类名保持一致。例如：源文件中`public`类的类名是 `Employee`，那么源文件应该命名为 `Employee.java`。
- 如果一个类定义在某个包中，那么`package`语句应该在源文件的首行。
- 如果源文件包含`import`语句，那么应该放在`package`语句和类定义之间。如果没有`package`语句，那么`import`语句应该在源文件中最前面。
- `import`语句和`package`语句对源文件中定义的所有类都有效。在同一源文件中，不能给不同的类不同的包声明。

类有若干种访问级别，并且类也分不同的类型：`抽象类`和`final类`等。这些将在访问控制章节介绍。

除了上面提到的几种类型，Java还有一些特殊的类，如：`内部类`、`匿名类`。

## 7.Java包

包主要用来对类和接口进行分类。当开发Java程序时，可能编写成百上千的类，因此很有必要对类和接口进行分类。

## 8.Import语句

在Java中，如果给出一个完整的限定名，包括包名、类名，那么Java编译器就可以很容易地定位到源代码或者类。`Import`语句就是用来提供一个合理的路径，使得编译器可以找到某个类。

例如，下面的命令行将会命令编译器载入`java_installation/java/io`路径下的所有类

```java
import java.io.*;
```

## 9.一个简单的例子

在该例子中，我们创建两个类：`Employee` 和 `EmployeeTest`。

首先打开文本编辑器，把下面的代码粘贴进去。注意将文件保存为 `Employee.java`。

`Employee`类有四个成员变量：`name`、`age`、`designation`和`salary`。该类显式声明了一个构造方法，该方法只有一个参数。

`Employee.java` 文件代码：

```java
import java.io.*;
 
public class Employee{
   String name;
   int age;
   String designation;
   double salary;
   // Employee 类的构造器
   public Employee(String name){
      this.name = name;
   }
   // 设置age的值
   public void empAge(int empAge){
      age =  empAge;
   }
   /* 设置designation的值*/
   public void empDesignation(String empDesig){
      designation = empDesig;
   }
   /* 设置salary的值*/
   public void empSalary(double empSalary){
      salary = empSalary;
   }
   /* 打印信息 */
   public void printEmployee(){
      System.out.println("名字:"+ name );
      System.out.println("年龄:" + age );
      System.out.println("职位:" + designation );
      System.out.println("薪水:" + salary);
   }
}
```

程序都是从 `main` 方法开始执行。为了能运行这个程序，必须包含 `main` 方法并且创建一个实例对象。

下面给出 `EmployeeTest` 类，该类实例化2个 `Employee` 类的实例，并调用方法设置变量的值。

将下面的代码保存在 `EmployeeTest.java` 文件中。

`EmployeeTest.java` 文件代码：

```java
import java.io.*;
public class EmployeeTest{
 
   public static void main(String[] args){
      /* 使用构造器创建两个对象 */
      Employee empOne = new Employee("Name1");
      Employee empTwo = new Employee("Name2");
 
      // 调用这两个对象的成员方法
      empOne.empAge(26);
      empOne.empDesignation("经理");
      empOne.empSalary(1000);
      empOne.printEmployee();
 
      empTwo.empAge(21);
      empTwo.empDesignation("职员");
      empTwo.empSalary(500);
      empTwo.printEmployee();
   }
}
```

编译这两个文件并且运行 `EmployeeTest` 类，可以看到如下结果：

``` java
$ javac EmployeeTest.java
$ java EmployeeTest 
名字:Name1
年龄:26
职位:经理
薪水:1000.0
名字:Name2
年龄:21
职位:职员
薪水:500.0
```

------
## 【----------------------------】
## 二、变量类型

## 1.变量类型概述

``` java
type identifier [ = value][, identifier [= value] ...] ;
```

格式说明：`type` 为Java数据类型。`identifier` 是变量名。可以使用逗号隔开来声明多个同类型变量。

以下列出了一些变量的声明实例，注意有些包含了初始化过程。

``` java
int a, b, c;         // 声明三个int型整数：a、 b、c
int d = 3, e = 4, f = 5; // 声明三个整数并赋予初值
byte z = 22;         // 声明并初始化 z
String s = "runoob";  // 声明并初始化字符串 s
double pi = 3.14159; // 声明了双精度浮点型变量 pi
char x = 'x';        // 声明变量 x 的值是字符 'x'。
```

Java语言支持的变量类型有：

- **类变量**：独立于方法之外的变量，用 `static` 修饰
- **实例变量**：独立于方法之外的变量，不过没有 `static` 修饰
- **局部变量**：类的方法中的变量

实例:

```java
public class Variable{
    static int allClicks=0;    // 类变量
    String str="hello world";  // 实例变量

    public void method(){
        int i =0;  // 局部变量
    }
}
```

## 2.局部变量

- 局部变量声明在方法、构造方法或者语句块中
- 局部变量在方法、构造方法、或者语句块被执行的时候创建，当它们执行完成后，变量将会被销毁
- 访问修饰符不能用于局部变量
- 局部变量只在声明它的方法、构造方法或者语句块中可见
- 局部变量是在栈上分配的
- 局部变量没有默认值，所以局部变量被声明后，必须经过初始化，才可以使用

### 实例 1

在以下实例中 `age` 是一个局部变量。定义在 `pupAge()` 方法中，它的作用域就限制在这个方法中。

```java
package net.work100.test;
 
public class Test{ 
   public void pupAge(){
      int age = 0;
      age = age + 7;
      System.out.println("小狗的年龄是: " + age);
   }
   
   public static void main(String[] args){
      Test test = new Test();
      test.pupAge();
   }
}
```

以上实例编译运行结果如下:

``` java
小狗的年龄是: 7
```

### 实例 2

在下面的例子中 `age` 变量没有初始化，所以在编译时会出错：

```java
package net.work100.test;
 
public class Test{ 
   public void pupAge(){
      int age;
      age = age + 7;
      System.out.println("小狗的年龄是 : " + age);
   }
   
   public static void main(String[] args){
      Test test = new Test();
      test.pupAge();
   }
}
```

以上实例编译运行结果如下:

``` java
Test.java:4:variable number might not have been initialized
age = age + 7;
         ^
1 error
```

## 3.实例变量

- 实例变量声明在一个类中，但在方法、构造方法和语句块之外
- 当一个对象被实例化之后，每个实例变量的值就跟着确定
- 实例变量在对象创建的时候创建，在对象被销毁的时候销毁
- 实例变量的值应该至少被一个方法、构造方法或者语句块引用，使得外部能够通过这些方式获取实例变量信息
- 实例变量可以声明在使用前或者使用后
- 访问修饰符可以修饰实例变量
- 实例变量对于类中的方法、构造方法或者语句块是可见的。一般情况下应该把实例变量设为私有。通过使用访问修饰符可以使实例变量对子类可见
- 实例变量具有默认值。数值型变量的默认值是`0`，布尔型变量的默认值是`false`，引用类型变量的默认值是`null`。变量的值可以在声明时指定，也可以在构造方法中指定
- 实例变量可以直接通过变量名访问。但在静态方法以及其他类中，就应该使用完全限定名：`ObejectReference.VariableName`

`Employee.java` 文件代码：

```java
import java.io.*;
public class Employee{
   // 这个实例变量对子类可见
   public String name;
   // 私有变量，仅在该类可见
   private double salary;
   //在构造器中对name赋值
   public Employee (String empName){
      name = empName;
   }
   //设定salary的值
   public void setSalary(double empSal){
      salary = empSal;
   }  
   // 打印信息
   public void printEmp(){
      System.out.println("名字 : " + name );
      System.out.println("薪水 : " + salary);
   }
 
   public static void main(String[] args){
      Employee empOne = new Employee("张三");
      empOne.setSalary(1000);
      empOne.printEmp();
   }
}
```

以上实例编译运行结果如下:

``` java
$ javac Employee.java $ java Employee名字 : 张三薪水 : 1000.0
```

## 4.类变量（静态变量）

- 类变量也称为静态变量，在类中以 `static` 关键字声明，但必须在方法之外
- 无论一个类创建了多少个对象，类只拥有类变量的一份拷贝
- 静态变量除了被声明为常量外很少使用。常量是指声明为 `public` / `private`，`final` 和 `static` 类型的变量。常量初始化后不可改变
- 静态变量储存在静态存储区。经常被声明为常量，很少单独使用 `static` 声明变量
- 静态变量在第一次被访问时创建，在程序结束时销毁
- 与实例变量具有相似的可见性。但为了对类的使用者可见，大多数静态变量声明为 `public` 类型
- 默认值和实例变量相似。数值型变量默认值是`0`，布尔型默认值是`false`，引用类型默认值是`null`。变量的值可以在声明的时候指定，也可以在构造方法中指定。此外，静态变量还可以在静态语句块中初始化
- 静态变量可以通过：`ClassName.VariableName` 的方式访问
- 类变量被声明为 `public static final` 类型时，类变量名称一般建议使用大写字母。如果静态变量不是 `public` 和 `final` 类型，其命名方式与实例变量以及局部变量的命名方式一致

`Employee.java` 文件代码：

```java
import java.io.*;
 
public class Employee {
    //salary是静态的私有变量
    private static double salary;
    // DEPARTMENT是一个常量
    public static final String DEPARTMENT = "开发人员";
    public static void main(String[] args){
    salary = 10000;
        System.out.println(DEPARTMENT+"平均工资:"+salary);
    }
}
```

以上实例编译运行结果如下:

``` java
开发人员平均工资:10000.0
```

> 注意：如果其他类想要访问该变量，可以这样访问：`Employee.DEPARTMENT`

## 【----------------------------】
## 三、基本数据类型

## 1.基本数据类型概述

变量就是申请内存来存储值。也就是说，当创建变量的时候，需要在内存中申请空间。

内存管理系统根据变量的类型为变量分配存储空间，分配的空间只能用来储存该类型数据。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/java/intro/datatype_1.png')" alt="wxmp">

因此，通过定义不同类型的变量，可以在内存中储存整数、小数或者字符。

Java 的两大数据类型:

- 内置数据类型
- 引用数据类型

## 2.内置数据类型

Java语言提供了八种基本类型。六种数字类型（四个整数型，两个浮点型），一种字符类型，还有一种布尔型。

### byte

- `byte` 数据类型是8位、有符号的，以二进制补码表示的整数
- 最小值是 `-128`（-2^7）
- 最大值是 `127`（2^7-1）
- 默认值是 `0`
- `byte` 类型用在大型数组中节约空间，主要代替整数，因为 `byte` 变量占用的空间只有 `int` 类型的四分之一
- 例子：`byte a = 100`，`byte b = -50`;

### short

- `short` 数据类型是 16 位、有符号的以二进制补码表示的整数
- 最小值是 `-32768`（-2^15）
- 最大值是 `32767`（2^15 - 1）
- `short` 数据类型也可以像 `byte` 那样节省空间。一个`short`变量是`int`型变量所占空间的二分之一
- 默认值是 `0`
- 例子：`short s = 1000`，`short r = -20000`;

### int

- `int` 数据类型是32位、有符号的以二进制补码表示的整数
- 最小值是 `-2,147,483,648`（-2^31）
- 最大值是 `2,147,483,647`（2^31 - 1）
- 一般地整型变量默认为 `int` 类型
- 默认值是 `0`
- 例子：`int a = 100000`, `int b = -200000`;

### long

- `long` 数据类型是 64 位、有符号的以二进制补码表示的整数
- 最小值是 `-9,223,372,036,854,775,808`（-2^63）
- 最大值是 `9,223,372,036,854,775,807`（2^63 -1）
- 这种类型主要使用在需要比较大整数的系统上
- 默认值是 `0L`
- 例子： `long a = 100000L`，`Long b = -200000L`;

> `L`理论上不分大小写，但是若写成`l`容易与数字`1`混淆，不容易分辩。所以最好大写

### float

- `float` 数据类型是单精度、32位、符合`IEEE 754`标准的浮点数
- `float` 在储存大型浮点数组的时候可节省内存空间
- 默认值是 `0.0f`
- 浮点数不能用来表示精确的值，如货币
- 例子：`float f1 = 234.5f`;

### double

- `double` 数据类型是双精度、64 位、符合`IEEE 754`标准的浮点数
- 浮点数的默认类型为`double`类型
- `double`类型同样不能表示精确的值，如货币
- 默认值是 `0.0d`
- 例子：`double d1 = 123.4`;

### boolean

- `boolean`数据类型表示一位的信息
- 只有两个取值：`true` 和 `false`
- 这种类型只作为一种标志来记录 `true/false` 情况
- 默认值是 `false`
- 例子：`boolean one = true`;

### char

- `char`类型是一个单一的 16 位 `Unicode` 字符
- 最小值是 `\u0000`（即为`0`）
- 最大值是 `\uffff`（即为`65,535`）
- `char` 数据类型可以储存任何字符
- 例子：`char letter = 'A';`

## 3.实例

对于数值类型的基本类型的取值范围，我们无需强制去记忆，因为它们的值都已经以常量的形式定义在对应的包装类中了。请看下面的例子：

```java
public class PrimitiveTypeTest {  
    public static void main(String[] args) {  
        // byte  
        System.out.println("基本类型：byte 二进制位数：" + Byte.SIZE);  
        System.out.println("包装类：java.lang.Byte");  
        System.out.println("最小值：Byte.MIN_VALUE=" + Byte.MIN_VALUE);  
        System.out.println("最大值：Byte.MAX_VALUE=" + Byte.MAX_VALUE);  
        System.out.println();  
  
        // short  
        System.out.println("基本类型：short 二进制位数：" + Short.SIZE);  
        System.out.println("包装类：java.lang.Short");  
        System.out.println("最小值：Short.MIN_VALUE=" + Short.MIN_VALUE);  
        System.out.println("最大值：Short.MAX_VALUE=" + Short.MAX_VALUE);  
        System.out.println();  
  
        // int  
        System.out.println("基本类型：int 二进制位数：" + Integer.SIZE);  
        System.out.println("包装类：java.lang.Integer");  
        System.out.println("最小值：Integer.MIN_VALUE=" + Integer.MIN_VALUE);  
        System.out.println("最大值：Integer.MAX_VALUE=" + Integer.MAX_VALUE);  
        System.out.println();  
  
        // long  
        System.out.println("基本类型：long 二进制位数：" + Long.SIZE);  
        System.out.println("包装类：java.lang.Long");  
        System.out.println("最小值：Long.MIN_VALUE=" + Long.MIN_VALUE);  
        System.out.println("最大值：Long.MAX_VALUE=" + Long.MAX_VALUE);  
        System.out.println();  
  
        // float  
        System.out.println("基本类型：float 二进制位数：" + Float.SIZE);  
        System.out.println("包装类：java.lang.Float");  
        System.out.println("最小值：Float.MIN_VALUE=" + Float.MIN_VALUE);  
        System.out.println("最大值：Float.MAX_VALUE=" + Float.MAX_VALUE);  
        System.out.println();  
  
        // double  
        System.out.println("基本类型：double 二进制位数：" + Double.SIZE);  
        System.out.println("包装类：java.lang.Double");  
        System.out.println("最小值：Double.MIN_VALUE=" + Double.MIN_VALUE);  
        System.out.println("最大值：Double.MAX_VALUE=" + Double.MAX_VALUE);  
        System.out.println();  
  
        // char  
        System.out.println("基本类型：char 二进制位数：" + Character.SIZE);  
        System.out.println("包装类：java.lang.Character");  
        // 以数值形式而不是字符形式将Character.MIN_VALUE输出到控制台  
        System.out.println("最小值：Character.MIN_VALUE="  
                + (int) Character.MIN_VALUE);  
        // 以数值形式而不是字符形式将Character.MAX_VALUE输出到控制台  
        System.out.println("最大值：Character.MAX_VALUE="  
                + (int) Character.MAX_VALUE);  
    }  
}
```

编译以上代码输出结果如下所示：

``` java
基本类型：byte 二进制位数：8
包装类：java.lang.Byte
最小值：Byte.MIN_VALUE=-128
最大值：Byte.MAX_VALUE=127

基本类型：short 二进制位数：16
包装类：java.lang.Short
最小值：Short.MIN_VALUE=-32768
最大值：Short.MAX_VALUE=32767

基本类型：int 二进制位数：32
包装类：java.lang.Integer
最小值：Integer.MIN_VALUE=-2147483648
最大值：Integer.MAX_VALUE=2147483647

基本类型：long 二进制位数：64
包装类：java.lang.Long
最小值：Long.MIN_VALUE=-9223372036854775808
最大值：Long.MAX_VALUE=9223372036854775807

基本类型：float 二进制位数：32
包装类：java.lang.Float
最小值：Float.MIN_VALUE=1.4E-45
最大值：Float.MAX_VALUE=3.4028235E38

基本类型：double 二进制位数：64
包装类：java.lang.Double
最小值：Double.MIN_VALUE=4.9E-324
最大值：Double.MAX_VALUE=1.7976931348623157E308

基本类型：char 二进制位数：16
包装类：java.lang.Character
最小值：Character.MIN_VALUE=0
最大值：Character.MAX_VALUE=65535
```

`Float` 和 `Double` 的最小值和最大值都是以科学记数法的形式输出的，结尾的"`E+数字`"表示E之前的数字要乘以10的多少次方。比如`3.14E3`就是3.14 × 103 =3140，3.14E-3 就是 3.14 x 10-3 =0.00314。

实际上，Java 中还存在另外一种基本类型 `void`，它也有对应的包装类 `java.lang.Void`，不过我们无法直接对它们进行操作。

## 4.类型默认值

下表列出了 Java 各个类型的默认值：

| 数据类型               | 默认值  |
| :--------------------- | :------ |
| byte                   | 0       |
| short                  | 0       |
| int                    | 0       |
| long                   | 0L      |
| float                  | 0.0f    |
| double                 | 0.0d    |
| char                   | 'u0000' |
| String (or any object) | null    |
| boolean                | false   |

实例:

```java
public class Test {
    static boolean bool;
    static byte by;
    static char ch;
    static double d;
    static float f;
    static int i;
    static long l;
    static short sh;
    static String str;
 
    public static void main(String[] args) {
        System.out.println("Bool :" + bool);
        System.out.println("Byte :" + by);
        System.out.println("Character:" + ch);
        System.out.println("Double :" + d);
        System.out.println("Float :" + f);
        System.out.println("Integer :" + i);
        System.out.println("Long :" + l);
        System.out.println("Short :" + sh);
        System.out.println("String :" + str);
    }
}
```

实例输出结果为：

``` java
Bool     :false
Byte     :0
Character:
Double   :0.0
Float    :0.0
Integer  :0
Long     :0
Short    :0
String   :null
```

## 5.引用类型

- 在Java中，引用类型的变量非常类似于`C/C++`的指针。引用类型指向一个对象，指向对象的变量是引用变量。这些变量在声明时被指定为一个特定的类型，比如 `Employee`、`Puppy` 等。变量一旦声明后，类型就不能被改变了。
- 对象、数组都是引用数据类型。
- 所有引用类型的默认值都是`null`。
- 一个引用变量可以用来引用任何与之兼容的类型。
- 例子：`Site site = new Site("光束云")`。

## 6.Java常量

常量在程序运行时是不能被修改的。

在 Java 中使用 `final` 关键字来修饰常量，声明方式和变量类似：

``` java
final double PI = 3.1415927;
```

虽然常量名也可以用小写，但为了便于识别，通常使用**大写字母表示常量**。

**字面量**可以赋给任何内置类型的变量。例如：

``` java
byte a = 68;
char a = 'A'
```

`byte`、`int`、`long`、和`short`都可以用`十进制`、`16进制`以及`8进制`的方式来表示。

当使用常量的时候，前缀 `0` 表示 `8进制`，而前缀 `0x` 代表 `16进制`, 例如：

``` java
int decimal = 100;
int octal = 0144;
int hexa =  0x64;
```

和其他语言一样，Java的字符串常量也是包含在两个引号之间的字符序列。下面是字符串型字面量的例子：

``` java
"Hello World"
"two\nlines"
"\"This is in quotes\""
```

字符串常量和字符常量都可以包含任何Unicode字符。例如：

``` java
char a = '\u0001';String a = "\u0001";
```

Java语言支持一些特殊的转义字符序列。

| 符号     | 字符含义                 |
| :------- | :----------------------- |
| `\n`     | 换行 (0x0a)              |
| `\r`     | 回车 (0x0d)              |
| `\f`     | 换页符(0x0c)             |
| `\b`     | 退格 (0x08)              |
| `\0`     | 空字符 (0x20)            |
| `\s`     | 字符串                   |
| `\t`     | 制表符                   |
| `\"`     | 双引号                   |
| `\'`     | 单引号                   |
| `\\`     | 反斜杠                   |
| `\ddd`   | 八进制字符 (ddd)         |
| `\uxxxx` | 16进制Unicode字符 (xxxx) |

## 7.自动类型转换

`整型`、`实型（常量）`、`字符型`数据可以混合运算。运算中，不同类型的数据先转化为同一类型，然后进行运算。

转换从低级到高级。

``` java
低  ------------------------------------>  高byte,short,char—> int —> long—> float —> double 
```

数据类型转换必须满足如下规则：

- 不能对`boolean`类型进行类型转换。
- 不能把对象类型转换成不相关类的对象。
- 在把容量大的类型转换为容量小的类型时必须使用强制类型转换。
- 转换过程中可能导致溢出或损失精度，例如：

``` java
int i =128;   byte b = (byte)i;
```

> 因为 `byte` 类型是 8 位，最大值为127，所以当 `int` 强制转换为 `byte` 类型时，值 128 时候就会导致溢出。

- 浮点数到整数的转换是通过舍弃小数得到，而不是四舍五入，例如：

``` java
(int)23.7 == 23;(int)-45.89f == -45
```

必须满足转换前的数据类型的位数要低于转换后的数据类型，例如: `short`数据类型的位数为16位，就可以自动转换位数为32的`int`类型，同样`float`数据类型的位数为32，可以自动转换为64位的`double`类型。

实例:

```java
public class ZiDongLeiZhuan{        public static void main(String[] args){            char c1='a';//定义一个char类型            int i1 = c1;//char自动类型转换为int            System.out.println("char自动类型转换为int后的值等于"+i1);            char c2 = 'A';//定义一个char类型            int i2 = c2+1;//char 类型和 int 类型计算            System.out.println("char类型和int计算后的值等于"+i2);        }}
```

运行结果为:

```
char自动类型转换为int后的值等于97char类型和int计算后的值等于66
```

> 解析：`c1` 的值为字符 `a`,查 `ASCII` 码表可知对应的 `int` 类型值为 `97`， `A` 对应值为 `65`，所以 `i2=65+1=66`。

## 8.强制类型转换

- 条件：转换的数据类型必须是兼容的。
- 格式：`(type)value` `type` 是要强制类型转换后的数据类型，实例：

```java
public class QiangZhiZhuanHuan{
    public static void main(String[] args){
        int i1 = 123;
        byte b = (byte)i1;//强制类型转换为byte
        System.out.println("int强制类型转换为byte后的值等于"+b);
    }
}
```

运行结果：

``` java
int强制类型转换为byte后的值等于123
```

## 9.隐含强制类型转换

- 整数的默认类型是 `int`。
- 浮点型不存在这种情况，因为在定义 `float` 类型时必须在数字后面跟上 `F` 或者 `f`。
  
 
## 【----------------------------】
## 四、修饰符

## 1.修饰符概述

Java 语言提供了很多修饰符，主要分为以下两类：

- 访问修饰符
- 非访问修饰符

修饰符用来定义类、方法或者变量，通常放在语句的最前端。我们通过下面的例子来说明：

```java
public class ClassName {   
  private boolean myFlag;
  static final double weeks = 9.5;
  protected static final int BOXWIDTH = 42;
  public static void main(String[] arguments) {
     // 方法体
  }
}
```

## 2.访问修饰符

Java 中，可以使用访问控制符来保护对类、变量、方法和构造方法的访问。Java 支持 4 种不同的访问权限：

- `default` (即默认，什么也不写）: 在同一包内可见，不使用任何修饰符。使用对象：类、接口、变量、方法
- `private` : 在同一类内可见。使用对象：变量、方法。 注意：不能修饰类（外部类）
- `public` : 对所有类可见。使用对象：类、接口、变量、方法
- `protected` : 对同一包内的类和所有子类可见。使用对象：变量、方法。 注意：不能修饰类（外部类）

我们可以通过以下表来说明访问权限：

| 修饰符      | 当前类 | 同一包内 | 子孙类(同一包) |                                                   子孙类(不同包)                                                   | 其他包 |
| :---------- | :----: | :------: | :------------: | :----------------------------------------------------------------------------------------------------------------: | :----: |
| `public`    |   Y    |    Y     |       Y        |                                                         Y                                                          |   Y    |
| `protected` |   Y    |    Y     |       Y        | Y/N ( [说明](https://www.cnblogs.com/liuxiaojun/p/training-java-modifier-type.html#受保护的访问修饰符-protected) ) |   N    |
| `default`   |   Y    |    Y     |       Y        |                                                         N                                                          |   N    |
| `private`   |   Y    |    N     |       N        |                                                         N                                                          |   N    |

### 2.1.默认访问修饰符-不使用任何关键字

使用默认访问修饰符声明的变量和方法，对同一个包内的类是可见的。接口里的变量都隐式声明为 `public static final`,而接口里的方法默认情况下访问权限为 `public`。

如下例所示，变量和方法的声明可以不使用任何修饰符:

``` java
String version = "1.5.1";
boolean processOrder() {
   return true;
}
```

### 2.2.私有访问修饰符(private)

私有访问修饰符是最严格的访问级别，所以被声明为 `private` 的方法、变量和构造方法只能被所属类访问，并且类和接口不能声明为 `private`。

声明为私有访问类型的变量只能通过类中公共的 `getter` 方法被外部类访问。

`private` 访问修饰符的使用主要用来隐藏类的实现细节和保护类的数据。

下面的类使用了私有访问修饰符：

```java
public class Logger {
   private String format;
   public String getFormat() {
      return this.format;
   }
   public void setFormat(String format) {
      this.format = format;
   }
}
```

实例中，`Logger` 类中的 `format` 变量为私有变量，所以其他类不能直接得到和设置该变量的值。为了使其他类能够操作该变量，定义了两个 `public` 方法：`getFormat()` （返回 `format` 的值）和 `setFormat(String)`（设置 format 的值）

### 2.3.公有访问修饰符(public)

被声明为 `public` 的类、方法、构造方法和接口能够被任何其他类访问。

如果几个相互访问的 `public` 类分布在不同的包中，则需要导入相应 `public` 类所在的包。由于类的继承性，类所有的公有方法和变量都能被其子类继承。

以下函数使用了公有访问控制：

``` java
public static void main(String[] arguments) {
   // ...
}
```

Java 程序的 `main()` 方法必须设置成公有的，否则，Java 解释器将不能运行该类。

### 2.4.受保护的访问修饰符(protected)

`protected` 需要从以下两个点来分析说明：

子类与基类在同一包中：被声明为 `protected` 的变量、方法和构造器能被同一个包中的任何其他类访问；

子类与基类不在同一包中：那么在子类中，子类实例可以访问其从基类继承而来的 `protected` 方法，而不能访问基类实例的 `protected` 方法。

`protected` 可以修饰数据成员，构造方法，方法成员，**不能修饰类（内部类除外）**。

接口及接口的成员变量和成员方法不能声明为 `protected`。

子类能访问 `protected` 修饰符声明的方法和变量，这样就能保护不相关的类使用这些方法和变量。

下面的父类使用了 `protected` 访问修饰符，子类重写了父类的 `openSpeaker()` 方法。

```java
class AudioPlayer {
   protected boolean openSpeaker(Speaker sp) {
      // 实现细节
   }
}
 
class StreamingAudioPlayer extends AudioPlayer {
   protected boolean openSpeaker(Speaker sp) {
      // 实现细节
   }
}
```

如果把 `openSpeaker()` 方法声明为 `private`，那么除了 `AudioPlayer` 之外的类将不能访问该方法。

如果把 `openSpeaker()` 声明为 `public`，那么所有的类都能够访问该方法。

如果我们只想让该方法对其所在类的子类可见，则将该方法声明为 `protected`。

### 2.5.访问控制和继承

请注意以下方法继承的规则：

- 父类中声明为 `public` 的方法在子类中也必须为 `public`。
- 父类中声明为 `protected` 的方法在子类中要么声明为 `protected`，要么声明为 `public`，不能声明为 `private`。
- 父类中声明为 `private` 的方法，不能够被继承。

## 3.非访问修饰符

为了实现一些其他的功能，Java 也提供了许多非访问修饰符：

- `static` 修饰符，用来修饰类方法和类变量。
- `final` 修饰符，用来修饰类、方法和变量，`final` 修饰的类不能够被继承，修饰的方法不能被继承类重新定义，修饰的变量为常量，是不可修改的。
- `abstract` 修饰符，用来创建抽象类和抽象方法。
- `synchronized` 和 `volatile` 修饰符，主要用于线程的编程。

### 3.1.static 修饰符

- **静态变量**：

`static` 关键字用来声明独立于对象的静态变量，无论一个类实例化多少对象，它的静态变量只有一份拷贝。 静态变量也被称为类变量。局部变量不能被声明为 `static` 变量。

- **静态方法**：

`static` 关键字用来声明独立于对象的静态方法。静态方法不能使用类的非静态变量。静态方法从参数列表得到数据，然后计算这些数据。

对类变量和方法的访问可以直接使用 `classname.variablename` 和 `classname.methodname` 的方式访问。

如下例所示，`static` 修饰符用来创建类方法和类变量：

```java
public class InstanceCounter {
   private static int numInstances = 0;
   protected static int getCount() {
      return numInstances;
   }
 
   private static void addInstance() {
      numInstances++;
   }
 
   InstanceCounter() {
      InstanceCounter.addInstance();
   }
 
   public static void main(String[] arguments) {
      System.out.println("Starting with " +
      InstanceCounter.getCount() + " instances");
      for (int i = 0; i < 500; ++i){
         new InstanceCounter();
          }
      System.out.println("Created " +
      InstanceCounter.getCount() + " instances");
   }
}
```

以上实例运行编辑结果如下:

``` java
Starting with 0 instances
Created 500 instances
```

### 3.2.final 修饰符

#### final 变量

`final` 表示"最后的、最终的"含义，变量一旦赋值后，不能被重新赋值。被 `final` 修饰的实例变量必须显式指定初始值。

`final` 修饰符通常和 `static` 修饰符一起使用来创建类常量。

实例：

```java
public class Test{
  final int value = 10;
  // 下面是声明常量的实例
  public static final int BOXWIDTH = 6;
  static final String TITLE = "Manager";
 
  public void changeValue(){
     value = 12; //将输出一个错误
  }
}
```

#### final 方法

父类中的 `final` 方法可以被子类继承，但是不能被子类重写。

声明 `final` 方法的主要目的是防止该方法的内容被修改。

如下所示，使用 `final` 修饰符声明方法：

```java
public class Test{    public final void changeName(){       // 方法体    }}
```

#### final 类

`final` 类不能被继承，没有类能够继承 `final` 类的任何特性。

实例：

```java
public final class Test {   // 类体}
```

### 3.3.abstract 修饰符

#### 抽象类

抽象类不能用来实例化对象，声明抽象类的唯一目的是为了将来对该类进行扩充。

一个类不能同时被 `abstract` 和 `final` 修饰。如果一个类包含抽象方法，那么该类一定要声明为抽象类，否则将出现编译错误。

抽象类可以包含抽象方法和非抽象方法。

实例：

```java
abstract class Caravan{   private double price;   private String model;   private String year;   public abstract void goFast(); //抽象方法   public abstract void changeColor();}
```

#### 抽象方法

抽象方法是一种没有任何实现的方法，该方法的的具体实现由子类提供。

抽象方法不能被声明成 `final` 和 `static`。

任何继承抽象类的子类必须实现父类的所有抽象方法，除非该子类也是抽象类。

如果一个类包含若干个抽象方法，那么该类必须声明为抽象类。抽象类可以不包含抽象方法。

抽象方法的声明以分号结尾，例如：`public abstract sample();`。

实例：

```java
public abstract class SuperClass{    abstract void m(); //抽象方法} class SubClass extends SuperClass{     //实现抽象方法      void m(){          //...      }}
```

### 3.4.synchronized 修饰符

`synchronized` 关键字声明的方法同一时间只能被一个线程访问。`synchronized` 修饰符可以应用于四个访问修饰符。

实例：

``` java
public synchronized void showDetails(){  //...}
```

### 3.5.transient 修饰符

序列化的对象包含被 `transient` 修饰的实例变量时，java 虚拟机(JVM)跳过该特定的变量。

该修饰符包含在定义变量的语句中，用来预处理类和变量的数据类型。

实例：

``` java
public transient int limit = 55;   // 不会持久化public int b; // 持久化
```

### 3.6.volatile 修饰符

`volatile` 修饰的成员变量在每次被线程访问时，都强制从共享内存中重新读取该成员变量的值。而且，当成员变量发生变化时，会强制线程将变化值回写到共享内存。这样在任何时刻，两个不同的线程总是看到某个成员变量的同一个值。

一个 `volatile` 对象引用可能是 `null`。

实例：

```java
public class MyRunnable implements Runnable
{
    private volatile boolean active;
    public void run()
    {
        active = true;
        while (active) // 第一行
        {
            // 代码
        }
    }
    public void stop()
    {
        active = false; // 第二行
    }
}
```

通常情况下，在一个线程调用 `run()` 方法（在 `Runnable` 开启的线程），在另一个线程调用 `stop()` 方法。 如果 第一行 中缓冲区的 `active` 值被使用，那么在 第二行 的 `active` 值为 `false` 时循环不会停止。

但是以上代码中我们使用了 `volatile` 修饰 `active`，所以该循环会停止。
## 【----------------------------】
## 五、运算符

## 1.运算符概述

计算机的最基本用途之一就是执行数学运算，作为一门计算机语言，Java也提供了一套丰富的运算符来操纵变量。我们可以把运算符分成以下几组：

- 算术运算符
- 关系运算符
- 位运算符
- 逻辑运算符
- 赋值运算符
- 其他运算符

## 2.算术运算符

算术运算符用在数学表达式中，它们的作用和在数学中的作用一样。下表列出了所有的算术运算符。

表格中的实例假设整数 `变量A` 的值为 `10`，`变量B` 的值为 `20`：

| 操作符 | 描述                                | 例子                                   |
| :----- | :---------------------------------- | :------------------------------------- |
| `+`    | `加法` : 相加运算符两侧的值         | `A + B` 等于 `30`                      |
| `-`    | `减法` : 左操作数减去右操作数       | `A – B` 等于 `-10`                     |
| `*`    | `乘法` : 相乘操作符两侧的值         | `A * B` 等于 `200`                     |
| `/`    | `除法` : 左操作数除以右操作数       | `B / A` 等于 `2`                       |
| `％`   | `取余` : 左操作数除以右操作数的余数 | `B%A` 等于 `0`                         |
| `++`   | `自增` : 操作数的值增加1            | `B++` 或 `++B` 等于 `21`(区别详见下文) |
| `--`   | `自减` : 操作数的值减少1            | `B--` 或 `--B` 等于 `19`(区别详见下文) |

下面的简单示例程序演示了算术运算符。复制并粘贴下面的 Java 程序并保存为 `Test.java` 文件，然后编译并运行这个程序：

```java
public class Test {
 
  public static void main(String[] args) {
     int a = 10;
     int b = 20;
     int c = 25;
     int d = 25;
     System.out.println("a + b = " + (a + b) );
     System.out.println("a - b = " + (a - b) );
     System.out.println("a * b = " + (a * b) );
     System.out.println("b / a = " + (b / a) );
     System.out.println("b % a = " + (b % a) );
     System.out.println("c % a = " + (c % a) );
     System.out.println("a++   = " +  (a++) );
     System.out.println("a--   = " +  (a--) );
     // 查看  d++ 与 ++d 的不同
     System.out.println("d++   = " +  (d++) );
     System.out.println("++d   = " +  (++d) );
  }
}
```

以上实例编译运行结果如下：

``` java
a + b = 30
a - b = -10
a * b = 200
b / a = 2
b % a = 0
c % a = 5
a++   = 10
a--   = 11
d++   = 25
++d   = 27
```

### 自增自减运算符

1).**自增(`++`)自减(`--`)运算符**: 是一种特殊的算术运算符，在算术运算符中需要两个操作数来进行运算，而自增自减运算符是一个操作数。

```java
public class selfAddMinus{
    public static void main(String[] args){
        int a = 3;//定义一个变量；
        int b = ++a;//自增运算
        int c = 3;
        int d = --c;//自减运算
        System.out.println("进行自增运算后的值等于"+b);
        System.out.println("进行自减运算后的值等于"+d);
    }
}
```

运行结果为：

``` java
进行自增运算后的值等于4
进行自减运算后的值等于2
```

解析：

- `int b = ++a;` 拆分运算过程为: `a=a+1=4`; `b=a=4`, 最后结果为`b=4`,`a=4`
- `int d = --c;` 拆分运算过程为: `c=c-1=2`; `d=c=2`, 最后结果为`d=2`,`c=2`

2).**前缀自增自减法(`++a`,`--a`)**: 先进行自增或者自减运算，再进行表达式运算。

3).**后缀自增自减法(`a++`,`a--`)**: 先进行表达式运算，再进行自增或者自减运算 实例：

```java
public class selfAddMinus{
    public static void main(String[] args){
        int a = 5;//定义一个变量；
        int b = 5;
        int x = 2*++a;
        int y = 2*b++;
        System.out.println("自增运算符前缀运算后a="+a+",x="+x);
        System.out.println("自增运算符后缀运算后b="+b+",y="+y);
    }
}
```

运行结果为：

``` java
自增运算符前缀运算后a=6，x=12
自增运算符后缀运算后b=6，y=10
```

## 3.关系运算符

下表为Java支持的关系运算符

表格中的实例整数 `变量A` 的值为 `10`，`变量B` 的值为 `20`：

| 运算符 | 描述                                                           | 例子         |
| :----- | :------------------------------------------------------------- | :----------- |
| ==     | 检查如果两个操作数的值是否相等，如果相等则条件为真             | (A == B)为假 |
| !=     | 检查如果两个操作数的值是否相等，如果值不相等则条件为真         | (A != B)为真 |
| >      | 检查左操作数的值是否大于右操作数的值，如果是那么条件为真       | (A > B)为假  |
| <      | 检查左操作数的值是否小于右操作数的值，如果是那么条件为真       | (A < B)为真  |
| >=     | 检查左操作数的值是否大于或等于右操作数的值，如果是那么条件为真 | (A >= B)为假 |
| <=     | 检查左操作数的值是否小于或等于右操作数的值，如果是那么条件为真 | (A <= B)为真 |

下面的简单示例程序演示了关系运算符。复制并粘贴下面的Java程序并保存为 `Test.java` 文件，然后编译并运行这个程序：

```java
public class Test {
 
  public static void main(String[] args) {
     int a = 10;
     int b = 20;
     System.out.println("a == b = " + (a == b) );
     System.out.println("a != b = " + (a != b) );
     System.out.println("a > b = " + (a > b) );
     System.out.println("a < b = " + (a < b) );
     System.out.println("b >= a = " + (b >= a) );
     System.out.println("b <= a = " + (b <= a) );
  }
}
```

以上实例编译运行结果如下：

``` java
a == b = false
a != b = true
a > b = false
a < b = true
b >= a = true
b <= a = false
```

## 4.位运算符

Java定义了位运算符，应用于整数类型(`int`)，长整型(`long`)，短整型(`short`)，字符型(`char`)，和字节型(`byte`)等类型。

位运算符作用在所有的位上，并且按位运算。假设 `A = 60`, `B = 13`; 它们的二进制格式表示将如下：

``` java
A = 0011 1100B = 0000 1101-----------------A & B = 0000 1100A | B = 0011 1101A ^ B = 0011 0001~A = 1100 0011
```

下表列出了位运算符的基本运算，假设整数 `变量A` 的值为 `60` 和 `变量B` 的值为 `13`：

| 操作符 | 描述                                                                             | 例子                         |
| :----- | :------------------------------------------------------------------------------- | :--------------------------- |
| ＆     | 如果相对应位都是1，则结果为1，否则为0                                            | (A ＆ B)得到12，即0000 1100  |
| \|     | 如果相对应位都是 0，则结果为 0，否则为 1                                         | (A \| B)得到61，即 0011 1101 |
| ^      | 如果相对应位值相同，则结果为0，否则为1                                           | (A ^ B)得到49，即 0011 0001  |
| 〜     | 按位取反运算符翻转操作数的每一位，即0变成1，1变成0                               | (〜A)得到-61，即1100 0011    |
| <<     | 按位左移运算符。左操作数按位左移右操作数指定的位数                               | A << 2得到240，即 1111 0000  |
| >>     | 按位右移运算符。左操作数按位右移右操作数指定的位数                               | A >> 2得到15即 1111          |
| >>>    | 按位右移补零操作符。左操作数的值按右操作数指定的位数右移，移动得到的空位以零填充 | A>>>2得到15即0000 1111       |

下面的简单示例程序演示了位运算符。复制并粘贴下面的Java程序并保存为 `Test.java` 文件，然后编译并运行这个程序：

```java
public class Test {  public static void main(String[] args) {     int a = 60; /* 60 = 0011 1100 */      int b = 13; /* 13 = 0000 1101 */     int c = 0;     c = a & b;       /* 12 = 0000 1100 */     System.out.println("a & b = " + c );      c = a | b;       /* 61 = 0011 1101 */     System.out.println("a | b = " + c );      c = a ^ b;       /* 49 = 0011 0001 */     System.out.println("a ^ b = " + c );      c = ~a;          /*-61 = 1100 0011 */     System.out.println("~a = " + c );      c = a << 2;     /* 240 = 1111 0000 */     System.out.println("a << 2 = " + c );      c = a >> 2;     /* 15 = 1111 */     System.out.println("a >> 2  = " + c );       c = a >>> 2;     /* 15 = 0000 1111 */     System.out.println("a >>> 2 = " + c );  }}
```

以上实例编译运行结果如下：

``` java
a & b = 12a | b = 61a ^ b = 49~a = -61a << 2 = 240a >> 2  = 15a >>> 2 = 15
```

## 5.逻辑运算符

下表列出了逻辑运算符的基本运算，假设布尔 `变量A` 为 `真`，`变量B` 为 `假`

| 操作符 | 描述                                                                                  | 例子           |
| :----- | :------------------------------------------------------------------------------------ | :------------- |
| &&     | 称为逻辑与运算符。当且仅当两个操作数都为真，条件才为真                                | (A && B)为假   |
| \|\|   | 称为逻辑或操作符。如果任何两个操作数任何一个为真，条件为真                            | (A \|\| B)为真 |
| !      | 称为逻辑非运算符。用来反转操作数的逻辑状态。如果条件为true，则逻辑非运算符将得到false | !(A && B)为真  |

下面的简单示例程序演示了逻辑运算符。复制并粘贴下面的Java程序并保存为 `Test.java` 文件，然后编译并运行这个程序：

```java
public class Test {  public static void main(String[] args) {     boolean a = true;     boolean b = false;     System.out.println("a && b = " + (a&&b));     System.out.println("a || b = " + (a||b) );     System.out.println("!(a && b) = " + !(a && b));  }}
```

以上实例编译运行结果如下：

``` java
a && b = falsea || b = true!(a && b) = true
```

## 6.短路逻辑运算符

当使用与逻辑运算符时，在两个操作数都为 `true` 时，结果才为 `true`，但是当得到第一个操作为 `false` 时，其结果就必定是 `false`，这时候就不会再判断第二个操作了。

```java
public class LuoJi{    public static void main(String[] args){        int a = 5;//定义一个变量；        boolean b = (a<4)&&(a++<10);        System.out.println("使用短路逻辑运算符的结果为"+b);        System.out.println("a的结果为"+a);    }}
```

运行结果为：

``` java
使用短路逻辑运算符的结果为falsea的结果为5
```

> 解析：该程序使用到了短路逻辑运算符(`&&`)，首先判断 `a<4` 的结果为 `false`，则 `b` 的结果必定是 `false`，所以不再执行第二个操作 `a++<10`的判断，所以 `a` 的值为 `5`。

## 7.赋值运算符

下面是Java语言支持的赋值运算符：

| 操作符  | 描述                                                         | 例子                                        |
| :------ | :----------------------------------------------------------- | :------------------------------------------ |
| `=`     | 简单的赋值运算符，将右操作数的值赋给左侧操作数               | `C = A + B` 将把 `A + B` 得到的值赋给 `C`   |
| `+=`    | 加和赋值操作符，它把左操作数和右操作数相加赋值给左操作数     | `C += A` 等价于 `C = C + A`                 |
| `-=`    | 减和赋值操作符，它把左操作数和右操作数相减赋值给左操作数     | `C -= A` 等价于 `C = C - A`                 |
| `*=`    | 乘和赋值操作符，它把左操作数和右操作数相乘赋值给左操作数     | `C *= A` 等价于 `C = C * A`                 |
| `/=`    | 除和赋值操作符，它把左操作数和右操作数相除赋值给左操作数     | `C /= A`，C 与 A 同类型时等价于 `C = C / A` |
| `(％)=` | 取模和赋值操作符，它把左操作数和右操作数取模后赋值给左操作数 | `C ％= A` 等价于 `C = C％A`                 |
| `<<=`   | 左移位赋值运算符                                             | `C <<= 2` 等价于 `C = C << 2`               |
| `>>=`   | 右移位赋值运算符                                             | `C >>= 2` 等价于 `C = C >> 2`               |
| `＆=`   | 按位与赋值运算符                                             | `C ＆= 2` 等价于 `C = C＆2`                 |
| `^=`    | 按位异或赋值操作符                                           | `C ^= 2` 等价于 `C = C ^ 2`                 |
| `\|=`   | 按位或赋值操作符                                             | `C \|= 2` 等价于 `C = C \| 2`               |

面的简单示例程序演示了赋值运算符。复制并粘贴下面的Java程序并保存为`Test.java`文件，然后编译并运行这个程序：

```java
public class Test {    public static void main(String[] args) {        int a = 10;        int b = 20;        int c = 0;        c = a + b;        System.out.println("c = a + b = " + c );        c += a ;        System.out.println("c += a  = " + c );        c -= a ;        System.out.println("c -= a = " + c );        c *= a ;        System.out.println("c *= a = " + c );        a = 10;        c = 15;        c /= a ;        System.out.println("c /= a = " + c );        a = 10;        c = 15;        c %= a ;        System.out.println("c %= a  = " + c );        c <<= 2 ;        System.out.println("c <<= 2 = " + c );        c >>= 2 ;        System.out.println("c >>= 2 = " + c );        c >>= 2 ;        System.out.println("c >>= 2 = " + c );        c &= a ;        System.out.println("c &= a  = " + c );        c ^= a ;        System.out.println("c ^= a   = " + c );        c |= a ;        System.out.println("c |= a   = " + c );    }}
```

以上实例编译运行结果如下：

``` java
c = a + b = 30c += a  = 40c -= a = 30c *= a = 300c /= a = 1c %= a  = 5c <<= 2 = 20c >>= 2 = 5c >>= 2 = 1c &= a  = 0c ^= a   = 10c |= a   = 10
```

`条件运算符`也被称为`三元运算符`。该运算符有3个操作数，并且需要判断布尔表达式的值。该运算符的主要是决定哪个值应该赋值给变量。

``` java
variable x = (expression) ? value if true : value if false
```

实例:

```java
public class Test {   public static void main(String[] args){      int a , b;      a = 10;      // 如果 a 等于 1 成立，则设置 b 为 20，否则为 30      b = (a == 1) ? 20 : 30;      System.out.println( "Value of b is : " +  b );       // 如果 a 等于 10 成立，则设置 b 为 20，否则为 30      b = (a == 10) ? 20 : 30;      System.out.println( "Value of b is : " + b );   }}
```

以上实例编译运行结果如下：

``` java
Value of b is : 30Value of b is : 20
```

## 8.instanceof运算符

该运算符用于操作对象实例，检查该对象是否是一个特定类型(类类型或接口类型)。

`instanceof` 运算符使用格式如下：

``` java
( Object reference variable ) instanceof  (class/interface type)
```

如果运算符左侧变量所指的对象，是操作符右侧类或接口(`class/interface`)的一个对象，那么结果为真。

下面是一个例子：

``` java
String name = "James";boolean result = name instanceof String; // 由于 name 是 String 类型，所以返回真
```

如果被比较的对象兼容于右侧类型,该运算符仍然返回`true`。

看下面的例子：

```java
class Vehicle {} public class Car extends Vehicle {   public static void main(String[] args){      Vehicle a = new Car();      boolean result =  a instanceof Car;      System.out.println( result);   }}
```

以上实例编译运行结果如下：

``` java
true
```

## 9.运算符优先级

当多个运算符出现在一个表达式中，谁先谁后呢?

这就涉及到运算符的优先级别的问题。在一个多运算符的表达式中，运算符优先级不同会导致最后得出的结果差别甚大。

例如，`(1+3)＋(3+2)*2;`，这个表达式如果按加号最优先计算，答案就是 `18`，如果按照乘号最优先，答案则是 `14`。

再如，`x = 7 + 3 * 2;` 这里`x`得到`13`，而不是`20`，因为乘法运算符比加法运算符有较高的优先级，所以先计算 `3 * 2` 得到`6`，然后再加`7`。

下表中具有最高优先级的运算符在的表的最上面，最低优先级的在表的底部。

| 类别     | 操作符                                     | 关联性   |
| :------- | :----------------------------------------- | :------- |
| 后缀     | () [] . (点操作符)                         | 左到右   |
| 一元     | + + - !〜                                  | 从右到左 |
| 乘性     | * /％                                      | 左到右   |
| 加性     | + -                                        | 左到右   |
| 移位     | >> >>> <<                                  | 左到右   |
| 关系     | >> = << =                                  | 左到右   |
| 相等     | == !=                                      | 左到右   |
| 按位与   | ＆                                         | 左到右   |
| 按位异或 | ^                                          | 左到右   |
| 按位或   | \|                                         | 左到右   |
| 逻辑与   | &&                                         | 左到右   |
| 逻辑或   | \|\|                                       | 左到右   |
| 条件     | ? :                                        | 从右到左 |
| 赋值     | = + = - = * = / =％= >> = << =＆= ^ = \| = | 从右到左 |
| 逗号     | ,                                          | 左到右   |

------



## 参考文章
* https://www.cnblogs.com/liuxiaojun/p/training-java-object-class.html
* https://www.cnblogs.com/liuxiaojun/p/training-java-basic-datatype.html
* https://www.cnblogs.com/liuxiaojun/p/training-java-variable-type.html
* https://www.cnblogs.com/liuxiaojun/p/training-java-modifier-type.html
* https://www.cnblogs.com/liuxiaojun/p/training-java-operator.html