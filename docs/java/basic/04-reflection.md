---
title: Java反射机制基础
---


::: tip
本文主要是介绍 Java反射机制相关内容，反射机制在Java的动态类管理中起到了非常重要的作用。
:::

[[toc]]

## 一、什么是反射
　　Java的反射（reflection）机制是指在程序的运行状态中，可以构造任意一个类的对象，可以了解任意一个对象所属的类，可以了解任意一个类的成员变量和方法，可以调用任意一个对象的属性和方法。这种动态获取信息及动态调用对象方法的功能叫Java的反射机制。

### 1. 反射机制的功能

　　Java反射机制主要提供了以下功能：

- 在运行时判断任意一个对象所属的类。
- 在运行时构造任意一个类的对象。
- 在运行时判断任意一个类所具有的成员变量和方法。
- 在运行时调用任意一个对象的方法。
- 生成动态代理。

### 2. 实现反射机制的类

 　Java中主要由以下的类来实现Java反射机制（这些类都位于java.lang.reflect包中）：

- Class类：代表一个类。 Field类：代表类的成员变量（成员变量也称为类的属性）。
- Method类：代表类的方法。
- Constructor类：代表类的构造方法。
- Array类：提供了动态创建数组，以及访问数组的元素的静态方法。

## 二、反射的使用

　　下面分步说明以下如何通过反射获取我们需要的内容。

　　我们先随意写一个Customer类（就是一个PO类），然后看看如何通过反射对这个类进行操作。

### 　　1. Customer类


``` java
 1 public class Customer {
 2     
 3     private Long id;
 4     private String name;
 5     private int age;
 6       
 7     public Customer() {}
 8     
 9     public Customer(String name,int age) {
10         this.name = name;
11         this.age = age;
12     }
13       
14     public Long getId() {
15         return id;
16     }
17     public void setId(Long id) {
18         this.id=id;
19     }
20     public String getName() {
21         return name;
22     }
23     public void setName(String name) {
24         this.name=name;
25     }
26     public int getAge() {
27         return age;
28     }
29     public void setAge(int age) {
30         this.age=age;
31     }
32 
33 }
```


###  　2. ReflectTester类

　　这个类用来演示Reflection API的基本使用方法。这里自定义的copy方法是用来创建一个和参数objcet同样类型的对象，然后把object对象中的所有属性拷贝到新建的对象中，并将其返回。


``` java
 1 import java.lang.reflect.Field;
 2 import java.lang.reflect.Method;
 3 
 4 public class ReflectTester {
 5     
 6     public Object copy(Object object) throws Exception{
 7         //获得对象的类型
 8         Class classType=object.getClass();
 9         System.out.println("Class:"+classType.getName());
10 
11         //通过默认构造方法创建一个新的对象
12         Object objectCopy=classType.getConstructor(new Class[]{}).newInstance(new Object[]{});
13 
14         //获得对象的所有属性
15         Field fields[]=classType.getDeclaredFields();
16 
17         for(int i=0; i<fields.length;i++){
18               Field field=fields[i];
19 
20               String fieldName=field.getName();
21               String firstLetter=fieldName.substring(0,1).toUpperCase();
22               //获得和属性对应的getXXX()方法的名字
23               String getMethodName="get"+firstLetter+fieldName.substring(1);
24               //获得和属性对应的setXXX()方法的名字
25               String setMethodName="set"+firstLetter+fieldName.substring(1);
26 
27               //获得和属性对应的getXXX()方法
28               Method getMethod=classType.getMethod(getMethodName,new Class[]{});
29               //获得和属性对应的setXXX()方法
30               Method setMethod=classType.getMethod(setMethodName,new Class[]{field.getType()});
31 
32               //调用原对象的getXXX()方法
33               Object value=getMethod.invoke(object,new Object[]{});
34               System.out.println(fieldName+":"+value);
35               //调用拷贝对象的setXXX()方法
36              setMethod.invoke(objectCopy,new Object[]{value});
37         }
38         return objectCopy;
39      }
40 
41 }
```


　　下面分析一下上述代码。

　　首先，通过Object类中的getClass()方法获取对象的类型。

``` java
Class classType=object.getClass();
```

　　而Class类是Reflection API中的核心类，主要方法如下：

- getName()：获得类的完整名字。 getFields()：获得类的public类型的属性。
- getDeclaredFields()：获得类的所有属性。
- getMethods()：获得类的public类型的方法。
- getDeclaredMethods()：获得类的所有方法。
- getMethod(String name, Class[] parameterTypes)：获得类的特定方法，name参数指定方法的名字，parameterTypes参数指定方法的参数类型。
- getConstrutors()：获得类的public类型的构造方法。
- getConstrutor(Class[] parameterTypes)：获得类的特定构造方法，parameterTypes参数指定构造方法的参数类型。
- newInstance()：通过类的不带参数的构造方法创建这个类的一个对象。

　　第二步，通过默认构造方法创建一个新的对象，即先调用Class类的getConstructor()方法获得一个Constructor对象，它代表默认的构造方法，然后调用Constructor对象的newInstance()方法构造一个实例。

``` java
Object objectCopy=classType.getConstructor(new Class[]{}).newInstance(new Object[]{});
```

　　第三步，获得对象的所有属性，即通过Class类的getDeclaredFields()方法返回类的所有属性，包括public、protected、default和private访问级别的属性，

``` java
Field fields[]=classType.getDeclaredFields();
```

　　第四步，获得每个属性相应的get/set方法，然后执行这些方法，把原来的对象属性拷贝到新的对象中。

　　这里我们可以写一个InvokeTester的类，然后运用反射机制调用一个InvokeTester对象的add()方法（自定义方法），如add()方法的两个参数为int类型，那么获取表示add()方法的Method对象代码如下：

``` java
Method addMethod=classType.getMethod("add",new Class[]{int.class,int.class});
```

 　上述代码中也有用到Method的invoke方法，其接收参数必须为对象，如果参数为基本数据类型，必须转换为相应的包装类型的对象，如int要转换为Integer。而invoke方法的返回值总是对象，如果实际被调用的方法的返回类型是基本数据类型，那么invoke方法会将其转换为相应的包装类型的对象，再将其返回。

　　下面简单测试一下，具体的方法调用如上面提到的add方法，可自行编写（具体实例见下篇）：


``` java
1 public static void main(String[] args) throws Exception {
2 　　Customer customer = new Customer();
3 　　customer.setId(10L);
4 　　customer.setName("adam");
5 　　customer.setAge(3);
6         
7 　　new ReflectTester().copy(customer);
8 }   
```


 　运行结果如下：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/java/reflection/reflect_1.png')" alt="wxmp">

## 三、具体实例

　　下面我们尝试着通过反射机制对一个jar包中的类进行分析，把类中所有的属性和方法提取出来，并写入到一个文件里中。

　　目录结构如下：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/java/reflection/reflect_2.png')" alt="wxmp">

### 1. ReflexDemo类

　　主要代码部分，通过反射获取类、属性及方法。


``` java
 1 import java.io.File;
 2 import java.lang.reflect.Field;
 3 import java.lang.reflect.Method;
 4 import java.net.URL;
 5 import java.net.URLClassLoader;
 6 import java.util.Enumeration;
 7 import java.util.jar.JarEntry;
 8 import java.util.jar.JarFile;
 9 
10 /**
11  * @ClassName: ReflexDemo
12  * @Description: 通过反射获取类、属性及方法
13  * @author adamjwh
14  * @date 2018年5月28日
15  *
16  */
17 public class ReflexDemo {
18 
19     private static StringBuffer sBuffer;
20     
21     public static void getJar(String jar) throws Exception {
22         try {
23             File file = new File(jar);
24             URL url = file.toURI().toURL();
25             URLClassLoader classLoader = new URLClassLoader(new URL[] { url },
26                     Thread.currentThread().getContextClassLoader());
27 
28             JarFile jarFile = new JarFile(jar);
29             Enumeration<JarEntry> enumeration = jarFile.entries();
30             JarEntry jarEntry;
31             
32             sBuffer = new StringBuffer();    //存数据
33 
34             while (enumeration.hasMoreElements()) {
35                 jarEntry = enumeration.nextElement();
36 
37                 if (jarEntry.getName().indexOf("META-INF") < 0) {
38                     String classFullName = jarEntry.getName();
39                     if (classFullName.indexOf(".class") < 0) {
40                         classFullName = classFullName.substring(0, classFullName.length() - 1);
41                     } else {
42                         // 去除后缀.class，获得类名
43                         String className = classFullName.substring(0, classFullName.length() - 6).replace("/", ".");
44                         Class<?> myClass = classLoader.loadClass(className);
45                         sBuffer.append("类名\t：" + className);
46                         System.out.println("类名\t：" + className);
47 
48                         // 获得属性名
49                         Class<?> clazz = Class.forName(className);
50                         Field[] fields = clazz.getDeclaredFields();
51                         for (Field field : fields) {
52                             sBuffer.append("属性名\t：" + field.getName() + "\n");
53                             System.out.println("属性名\t：" + field.getName());
54                             sBuffer.append("-属性类型\t：" + field.getType() + "\n");
55                             System.out.println("-属性类型\t：" + field.getType());
56                         }
57 
58                         // 获得方法名
59                         Method[] methods = myClass.getMethods();
60                         for (Method method : methods) {
61                             if (method.toString().indexOf(className) > 0) {
62                                 sBuffer.append("方法名\t：" + method.toString().substring(method.toString().indexOf(className)) + "\n");
63                                 System.out.println("方法名\t：" + method.toString().substring(method.toString().indexOf(className)));
64                             }
65                         }
66                         sBuffer.append("--------------------------------------------------------------------------------" + "\n");
67                         System.out.println("--------------------------------------------------------------------------------");
68                     }
69                 }
70             }
71         } catch (Exception e) {
72             e.printStackTrace();
73         } finally {
74             sBuffer.append("End");
75             System.out.println("End");
76             
77             WriteFile.write(sBuffer);    //写文件
78         }
79     }
80 
81 }
```

### 　　2. WriteFile类

　　进行写文件操作。


``` java
 1 import java.io.BufferedWriter;
 2 import java.io.File;
 3 import java.io.FileWriter;
 4 
 5 /**
 6  * @ClassName: WriteFile
 7  * @Description: 写文件操作
 8  * @author adamjwh
 9  * @date 2018年5月28日
10  *
11  */
12 public class WriteFile {
13 
14     private static String pathname = "src/com/adamjwh/jnp/ex14/out.txt";
15     
16     public static void write(StringBuffer sBuffer) throws Exception {
17         File file = new File(pathname);
18         BufferedWriter bw = new BufferedWriter(new FileWriter(file));
19         
20         bw.write(sBuffer.toString());
21         bw.close();
22     }
23     
24 }
```


### 3. Main类

　　这里我们需要在项目下新建一个lib文件夹，然后将要解析的jar包放入其中，比如这里我们放入jdk的dt.jar。目录结构如下：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/java/reflection/reflect_3.png')" alt="wxmp">

　　执行程序：


``` java
 1 /**
 2  * @ClassName: Main
 3  * @Description: 
 4  * @author adamjwh
 5  * @date 2018年5月28日
 6  *
 7  */
 8 public class Main {
 9     
10     private static String jar = "lib/dt.jar";
11     
12     public static void main(String[] args) throws Exception {
13         ReflexDemo.getJar(jar);
14     }
15 
16 }
```


　　运行结果如下：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/java/reflection/reflect_4.png')" alt="wxmp">

## 【----------------------------】

##  Java学习总结（十四）——java反射机制，利用反射动态创建对象


## 一．Java反射机制
### 1.什么是反射：
反射就是把Java类中的各种成份影射成一个个的Java对象。例：一个类有：成员变量，方法，构造方法等，包等等信息，利用反射技术可以对一个类进行剖析，把各个组成部分影射成一个个对象。

## 2.Java反射常用类：
- （1）Class类—可获取类和类的成员信息
- （2）Field类—可访问类的属性
- （3）Method—可调用类的方法
- （4）Constructor—可调用类的构造方法

## 3.如何使用反射（基本步骤）：
- （1）导入java.lang.reflect.*
- （2）获得需要操作的类的Java.lang.Class对象
- （3）调用Class的方法获取Field,Method等对象
- （4）使用反射API进行操作（设置属性，调用方法）

## 4.Class类：
- （1）Class类是Java反射机制的起源和入口
- （2）Class类的实例化对象代表一个正在运行的Java类或接口
 每个类都有自己的Class对象
 用于获取与类相关的各种信息
 提供了获取类信息的相关方法
 Class类继承至Object类
- （3）Class类存放类的结构信息
·类名；·父类，接口；·方法，构造方法，属性；·注释

## 5.获取Class类对象的三种方式：
- （1）方法一：

//方法1：对象.getClass()

Student stu=new Student();
Class clazz=stu.getClass();

- （2）方法二：
//方法2：类.class
Class clazz= Student.class;
Class clazz=String.class;


- (3) //方法三： 方法3：Class.forName()
clazz=Class.forName(“java.lang.String”);
clazz=Class.forName(“java.util.Date”);
例（代码）：
学生信息类（bean）

```java
package org.reflect.Class;

public class Student {
	private String name;
	private int age;
	private double score;

	public Student() {
	}

	public Student(String name, int age, double score) {
		this.name = name;
		this.age = age;
		this.score = score;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getAge() {
		return age;
	}

	public void setAge(int age) {
		this.age = age;
	}

	public double getScore() {
		return score;
	}

	public void setScore(double score) {
		this.score = score;
	}
	
	public void learn() {
		System.out.println(this.name + "正在学习...");
	}
	
	@Override
	public String toString() {
		return "Student [name=" + name + ", age=" + age + ", score=" + score
				+ "]";
	}

}


```

获取Class类对象测试类

```java
package org.reflect.Class;

import java.lang.reflect.Modifier;
public class ClassDemo {

	public static void main(String[] args) {
		Student stu=new Student();
		Class<?> c1=stu.getClass();//方式一
		Class<Student> c2= Student.class;//方式二
		Class<?> c3=null;
		try {
			c3=Class.forName("org.reflect.Class.Student");   // 方式三
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
		System.out.println("方式一获取的Class对象为："+c1.getSimpleName());
		System.out.println("方式二获取的Class对象为："+c2);
		System.out.println("方式三获取的Class对象为："+c3);
		int mod=c1.getModifiers();//获取修饰符所对应的整数
		String modifier=Modifier.toString(mod);//获取修饰符
		System.out.println(c1+"类所用的修饰符为："+modifier);
	}

}


```

运行结果：
方式一获取Class类对象：Student

方式二获取Class类对象：reflect.Student

方式三获取Class类对象：reflect.Student

Student类的修饰符：public


## 6.使用Class类获取类的结构信息
### （1）获取类的Class对象：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/java/reflection/reflectcase-1.png')" alt="wxmp">


### （2）获取Filed对象

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/java/reflection/reflectcase-2.png')" alt="wxmp">


### （3）获取Method对象

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/java/reflection/reflectcase-3.png')" alt="wxmp">


### （4）获取Constructor对象

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/java/reflection/reflectcase-4.png')" alt="wxmp">


代码示例（示例均已上述Student类为基础）

例1（获取Filed对象）

```java
package org.reflect.Filed;

import java.lang.reflect.Field;
import java.lang.reflect.Modifier;
public class FiledDemo {

	public static void main(String[] args) {
		Class<Student> cl=Student.class;//获取代表Student类的Class对象
		Field[] fields=cl.getDeclaredFields();//获取属性对象，返回数组
		System.out.println(cl.getSimpleName()+"类中声明的属性有：");
		for(Field f:fields){
			String filedName=f.getName();//获取属性名
			Class<?> filedType=f.getType();//获取属性类型
			int mod=f.getModifiers();//获取修饰符对应整数
			String modifier=Modifier.toString(mod);//获取修饰符
			System.out.println(modifier+" "+filedType.getSimpleName()+" "+filedName);
		}
	}

}


```

运行结果：
Student类中声明的属性有：

```java
private String name
private int age
private double score
```

例2（获取Method对象）

```java
package method;

import java.lang.reflect.Method;
import java.lang.reflect.Modifier;

public class MethodDemo {

	public static void main(String[] args) {
		try {
			Class<?> cls=Class.forName("method.Student");
			Method[] methods=cls.getDeclaredMethods();
			for(Method method:methods){
				String methodName=method.getName();   // 获取方法名称
				Class<?> returnType=method.getReturnType();  // 获取方法的返回值类型
				String modStr=Modifier.toString(method.getModifiers());   // 获取方法的修饰符
				Class<?>[] paramTypes=method.getParameterTypes();   // 获取参数类型
				System.out.print(modStr+" "+returnType.getSimpleName()+" "+methodName+"(");
				if(paramTypes.length==0){
					System.out.print(")");
				}
				for(int i=0;i<paramTypes.length;i++){   // 遍历形式参数类型
					if(i==paramTypes.length-1){
						System.out.print(paramTypes[i].getSimpleName()+" args"+i+")");
					}else{
						System.out.print(paramTypes[i].getSimpleName()+" args"+i+",");
					}
				}
				System.out.println();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

}


```

运行结果：

```java
public void eat(String args0,String args1)
public int getAge()
public void setAge(int args0)
public double getScore()
public void setScore(double args0)
```

## 7.使用反射动态创建对象
### （1）方法一：
使用Class的newInstance()方法，仅适用于无参构造方法

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/java/reflection/reflectcase-5.png')" alt="wxmp">


### （2）方法二：
方法二：调用Constructor的newInstance()方法，适用所有构造方法

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/java/reflection/reflectcase-6.png')" alt="wxmp">


例3（获取Constructor对象）

```java
package org.reflect.Constructor;

import java.lang.reflect.Constructor;

public class ConstructorDemo {

	public static void main(String[] args) {
		Class<Student> cl=Student.class;//获取Class对象，代表Student类
		try {
			Constructor<Student> con=cl.getDeclaredConstructor(String.class,int.class,double.class);//获取散参构造方法
			Student stu=con.newInstance("张无忌",23,96.7);
			System.out.println(stu);
		} catch (Exception e) {
			e.printStackTrace();
		} 
	}

}


``` 

运行结果：
Student [name=张无忌, age=23, score=96.7]

例4（动态创建方法）：

```java
package method;

import java.lang.reflect.Method;

public class InvokeMethod {

	public static void main(String[] args) {
		Class<Student> cls=Student.class;
		try {
			Student stu=cls.newInstance();   // 通过反射机制实例化对象,使用此newInstance()方法，要求类中必须包含一个无参构造方法
			Method setNameMethod=cls.getMethod("setName",String.class);
			setNameMethod.invoke(stu,"风清扬");   // 使用stu对象调用setName(String name)方法，传入"风清扬"参数
			Method getNameMethod=cls.getMethod("getName");
			System.out.println(getNameMethod.invoke(stu));  // 使用stu对象调用getName()方法，返回一个值
		} catch (Exception e) {
			e.printStackTrace();
		} 

	}

}


```

运行结果：
风清扬

## 【----------------------------】

## Java反射生成Class的3种方式以及反射创建对象的2种方式

想要了解反射生成class和创建java对象，首先我们要了解什么是反射？

## **一、什么是反射？**

Java反射说的是在运行状态中，对于任何一个类，我们都能够知道这个类有哪些方法和属性。对于任何一个对象，我们都能够对它的方法和属性进行调用。

**我们把这种动态获取对象信息和调用对象方法的功能称之为反射机制。**

## **二、反射生成Class的三种方式**

### **1.第一种方式（利用getClass（）方法）**

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/java/reflection/classnew-1.png')" alt="wxmp">

 

### **2.第二种方式（直接对象的.class）**

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/java/reflection/classnew-2.png')" alt="wxmp">

 

### **3.第三种方式（Class.forName()）**

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/java/reflection/classnew-3.png')" alt="wxmp">

 

 

注意：此种方法通过对象的全路径来获取Class的，当对象不存在时，会出现ClassNotFoundException异常。详细的可以看下Class.forName()的底层代码。

 

## **三、反射生成java对象的两种方式**

### **1.第一种方式newInstance();**


```java
调用public``无参构造器 ，若是没有，则会报异常
Object o = clazz.newInstance();　
没有无参构造函数异常：
```
<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/java/reflection/classnew-4.png')" alt="wxmp">


私有的构造函数异常：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/java/reflection/classnew-5.png')" alt="wxmp">

 

### **2.第二种方式：**

有带参数的构造函数的类，先获取到其构造对象，再通过该构造方法类获取实例：

/ /获取构造函数类的对象

Constroctor constroctor = User.class.getConstructor(String.class); 

// 使用构造器对象的newInstance方法初始化对象

Object obj = constroctor.newInstance("name"); 

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/java/reflection/classnew-6.png')" alt="wxmp">


## 参考文章

* https://www.cnblogs.com/adamjwh/p/8372114.html
* https://blog.51cto.com/u_13501268/2104207
* https://www.cnblogs.com/HaveChen/p/11778129.html