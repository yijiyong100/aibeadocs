---
title: Java反射机制
---


::: tip
本文主要是介绍 Java反射机制相关内容，反射机制在Java的动态类管理中起到了非常重要的作用。
:::

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

## 参考文章

* https://www.cnblogs.com/adamjwh/p/8372114.html