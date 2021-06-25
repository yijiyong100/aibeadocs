---
title: 网络编程-TCP详解
---

## Java基础知识篇【网络编程-TCP详解】

::: tip
本文主要是介绍 网络编程详解-TCP 。
:::

[[toc]]

　**网络编程详解-TCP**

## **一，TCP协议的特点** 
      　 面向连接的协议(有发送端就一定要有接收端)

​     　　  通过三次连接握手建立连接

​       　　通过四次握手断开连接

​       　　基于IO流传输数据

​       　　传输数据大小没有限制

​       　　速度慢但可靠

 

## **二，TCP协议相关的两个类**
  　　 Socket(一个socket对象表示一个客户端对象)
    　  常用构造方法介绍

​            　　 Socket(String host, int port)

​               　　   host参数为服务器的ip地址字符串

​                　　   port参数为服务器的端口号

​         　　大家记忆的时候可以使用这一种记忆方式 ：记住socket是个客户端对象就可以了，参数就想socket对象既然是客户端对象他就需要连接服务器，那么他需要什么呢，连接服务器肯定需要服务端的IP和地址才能够连接。

​      

## **三，常用方法介绍**

　　OutputStream  getOutputStream() 获取字节输出流（该字节输出可以向服务端输出数据，只能获取一次，调用该方法多少次，获取到的还是同一个对象）
　　InputStream  getInputStream() 获取字节输入流（该字节输入流可以读取服务器端方式过来的数据，只能获取一次，调用该方法多少次，获取到的还是同一个对象）
　　void  shutdownOutputStream() 关闭输出流（在socket里面作用就是告诉服务器端，数据已经传输完成，调用该方法以后获取到的输出流就不能使用了）
　　void close() 关闭资源
　　int getPort() 获取服务器端的端口
　　InetAddress getInetAddress()

 

## **四，获取服务器端的IP地址对象**

   　　 ServerSocket（一个该类对象就代表一个服务端对象）
          　 常用构造方法介绍

​            　  ServerSocket(int port)

​                 　　  port参数为服务端的端口号

​          　 常用方法介绍

　　　　　　　Socket accept() 等待客户端连接，获取一个客户端对象
　　　　　　　InteAddress  getInteAdderss() 获取连接的客户端的ip对象
　　

## **五，网络编程(TCP-服务端响应客户端)代码**

###   **1.客户端代码**



``` java
 1 import java.io.BufferedReader;
 2 import java.io.BufferedWriter;
 3 import java.io.IOException;
 4 import java.io.InputStreamReader;
 5 import java.io.OutputStreamWriter;
 6 import java.net.Socket;
 7 import java.util.Scanner;
 8 
 9 public class UserClint_3 {
10     static Scanner sc = new Scanner(System.in);
11     public static void main(String[] args) throws IOException {
12         //1.创建客户端套接字
13         Socket s = new Socket("localhost", 152);
14         //2.创建客户端输出流
15         BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(s.getOutputStream()));
16         //3.用户输入用户和密码，并写入输出流
17         System.out.println("请输入用户名：");
18         String user = sc.nextLine();
19         System.out.println("请输入用户密码：");
20         String password = sc.nextLine();
21         bw.write(user);
22         bw.flush();
23         bw.newLine();
24         bw.write(password);
25         bw.flush();
26         
27         //4.通知服务端客户端用户信息写入完毕
28         s.shutdownOutput();
29         
30         //5.创建输入流来接受服务端响应的信息
31         BufferedReader br=  new BufferedReader(new InputStreamReader(s.getInputStream()));
32         String info = br.readLine();
33         //6.输出响应信息
34         System.out.println(info);
35         //7.关闭套接字
36         s.close();
37     }
38 }
```



 

### 简单配置
　　**.将客户登录信息放在在User.Properties文件中，持久化信息库**　

``` java
1 username=lsx
2 pwd=123
3 username=wn
4 pwd=123
```


###　　**3\**.服务器端代码\****



``` java
 1 import java.io.BufferedReader;
 2 import java.io.BufferedWriter;
 3 import java.io.FileInputStream;
 4 import java.io.IOException;
 5 import java.io.InputStreamReader;
 6 import java.io.OutputStreamWriter;
 7 import java.net.ServerSocket;
 8 import java.net.Socket;
 9 import java.util.HashMap;
10 import java.util.Map;
11 import java.util.Properties;
12 
13 public class UserServer_3 {
14     public static Map<String, String> User() throws  IOException{
15         //将用户信息存放在User.properties文件中
16         //创建properties类获取用户信息
17         Properties p = new Properties();
18         //通过load()方法读取用户信息
19         p.load(new FileInputStream("User.Properties"));
20         //通过getProperty()方法获取用户信息的键，得到用户信息的值
21         String user = p.getProperty("username");
22         String pwd = p.getProperty("pwd");
23         
24         //创建map集合，将用户信息的键以及对应的值放入集合中
25         Map<String, String> map = new HashMap<>();
26         map.put("username", user);
27         map.put("pwd", pwd);
28         return map;
29     }
30     public static void main(String[] args) throws IOException {
31         //1.创建服务器端套接字
32         ServerSocket ss = new ServerSocket(152);
33         //2.监听客户端套接字
34         Socket s = ss.accept();
35         //3.创建输入流用来读取客户端发送的用户信息
36         BufferedReader br = new BufferedReader(new InputStreamReader(s.getInputStream()));
37         //4.读取客户端发送的用户信息
38         String username = br.readLine();
39         String password = br.readLine();
40         
41         //5.调用map集合，拿到map集合里面的用户信息和客户端发送的信息进行比对
42         Map<String, String> map = User();
43         //6.创建输出流用来响应客户端
44         BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(s.getOutputStream()));
45         //7.进行信息比对
46         if(map.get("username").equals(username)&&map.get("pwd").equals(password)){
47             //8.写入响应信息
48             bw.write("恭喜您，登录成功！");
49             bw.flush();
50         }else{
51             bw.write("登录失败，用户或用户密码错误！");
52             bw.flush();
53         }
54         //9.关闭客户端套接字
55         s.close();
56     }
57 }
```


## 参考文章
* https://www.cnblogs.com/topshark/p/10242520.html