---
title: File类介绍
---

## Java基础知识篇【Java File类介绍】

::: tip
本文主要是介绍 Java File类介绍 。
:::

[[toc]]

## File类介绍

File是java.io包下面的一个类，代表与平台无关的文件或者目录。JAVA中，无论文件还是目录，都可以看作File类的一个对象。File类能对文件或目录新建，删除，获取属性等操作，但是不能直接操作文件内容（文件内容需要用数据流访问）。

JVM默认会将workspace作为相对路径，即user.dir系统变量所指路径, 即如果这样初始化file对象，File file = new File("."); 就是获取了user.dir路径。

### File类的常用方法

String getName() -如果file对象是一个文件，则返回文件名，如果是路径，则返回路径的最后一级

File getAbsoluteFile() -返回绝对路径

String getParent() -返回file对象所在目录的父目录

### File类检查文件

exists()-文件或目录是否存在

canRead()-是否可读

isFile()-是否是文件

isDirectory()-是否是目录

### File类获取文件属性

long lastModified() -最后修改时间

long length() -文件长度

### File类进行文件操作

createFile() -成功true，失败false

delete()

mkdir() -创建目录 ，file对象必须对应一个路径

String[] list() - 如果file对象是一个路径，list()将返回一个数组，如果路径下没有文件和子目录，则数组为empty；如果file对象是一个文件，或者file路径不存在，或者发生IO错误，则list()返回null

File[] listFiles() -同上，只不过返回的是File类型数组

### 文件过滤器FilenameFilter接口

如果FilenameFilter作为file.list()的参数传入，实现FilenameFilter接口的accept方法，可以实现文件过滤。

accept方法有两个参数，dir和name，通常可以对name做条件过滤。

 

## 下面是File类的综合演示，



``` java
 1 package io;
 2 
 3 import java.io.File;
 4 import java.io.FilenameFilter;
 5 import java.io.IOException;
 6 
 7 public class FileTest {
 8     public static void main(String[] args) throws IOException {
 9         //JVM默认会将workspace作为相对路径，即user.dir系统变量所指路径
10         File file = new File(".");
11         File file2 = new File("C:/PROJECT/JavaBasic/PROJECT_JavaBasic/tmp.txt");
12         File file3 = new File("./tmp.txt");
13         //如果file对象是一个文件，则返回文件名，如果是路径，则返回路径的最后一级
14         System.out.println(file.getName());
15         //当file为相对路径时，获取父路径可能会出错
16         file3.delete();
17         System.out.println("父路径:"+file3.getParent());
18         //获取绝对路径 
19         System.out.println(file.getAbsoluteFile());
20         //getAbsoluteFile返回的是File类型， getAbsolutePath则返回String类型
21         System.out.println(file.getAbsoluteFile().getParent());
22         //在当前路径下创建一个临时文件，第三个参数必须是路径，否则会报错
23         File tmpFile = File.createTempFile("aaa", ".txt", file);
24         //JVM退出时删除该文件
25         tmpFile.deleteOnExit();
26         //以系统时间作为名称创建文件
27         File newFile = new File(System.currentTimeMillis()+"");
28         System.out.println("newFile是否存在："+newFile.exists());
29         //以指定file对象来创建文件
30         newFile.createNewFile();
31         System.out.println("newFile是否存是文件："+newFile.isFile());
32         System.out.println("newFile是否存是目录："+newFile.isDirectory());
33         System.out.println("以newFile对象创建目录是否成功:"+newFile.mkdir());
34         //如果file对象是一个路径，list()将返回一个数组，如果路径下没有文件和子目录，则数组为empty
35         //如果file对象是一个文件，或者file路径不存在，或者发生IO错误，则list()返回null
36         String[] fileList = file.list();
37         System.out.println("====当前路径下的所有文件和目录如下====");
38         for (String fileName : fileList) {
39             System.out.println(fileName);
40         }
41         //listRoots静态方法列出所有磁盘根路径
42         File[] roots = File.listRoots();
43         System.out.println("====系统所有磁盘根路径如下====");
44         for (File root : roots) {
45             System.out.println(root);
46         }    
47         
48         String[] nameList = file.list(new FilenameFilter() {
49             @Override
50             public boolean accept(File dir, String name) {
51                 // TODO Auto-generated method stub
52                 return name.endsWith(".txt") || new File(name).isDirectory();
53             }
54         });
55         System.out.println("====过滤条件后如下====");
56         for (String filterName :  nameList) {
57             System.out.println(filterName);
58         }
59         
60     }
61 }
```



输出结果如下，



``` java
 1 .
 2 父路径:.
 3 C:\PROJECT\JavaBasic\PROJECT_JavaBasic\.
 4 C:\PROJECT\JavaBasic\PROJECT_JavaBasic
 5 newFile是否存在：false
 6 newFile是否存是文件：true
 7 newFile是否存是目录：false
 8 以newFile对象创建目录是否成功:false
 9 ====当前路径下的所有文件和目录如下====
10 .classpath
11 .project
12 .settings
13 1480521332106
14 1480521357843
15 1480521378187
16 1480522448612
17 1480522471511
18 1480522477413
19 1480522484941
20 1480522505253
21 aaa2174524463556527449.txt
22 bin
23 src
24 ====系统所有磁盘根路径如下====
25 C:\
26 D:\
27 E:\
28 F:\
29 ====过滤条件后如下====
30 .settings
31 aaa2174524463556527449.txt
32 bin
33 src
```




## 参考文章
* https://www.cnblogs.com/fysola/p/6120362.html