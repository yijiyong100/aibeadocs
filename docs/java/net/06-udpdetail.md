---
title: 网络编程-UDP详解
---


::: tip
本文主要是介绍 网络编程-UDP详解 。
:::

[[toc]]

**UDP详解**

## **一，TCP/IP协议栈中，TCP协议和UDP协议的联系和区别？**

　　　　联系：

　　　　　　TCP和UDP是TCP/IP协议栈中传输层的两个协议，它们使用网络层功能把数据包发送到目的地，从而为应用层提供网络服务。

　　　　区别：

　　　　　　1. TCP是面向连接的传输。UDP是无连接的传输。

　　　　　　2. TCP保证数据按照发送顺序到达，UDP无法保证。

　　　　　　4. TCP是可靠性传输，而UDP则是不可靠传输。

　　　　　　5. UDP因为少了很多控制信息，所以传输速度比TCP速度快。

　　　　　　6. TCP适合用于传输大量数据，UDP适合用于传输小量数据。

　　　　　　举例： TCP的server和client之间通信就好比两个人打电话。UDP的server和client之间的通信就像两个人发电报或者发短信。

 
## **二，UDP通讯协议的特点：**

　　　　　　1. 将数据极封装为数据包，面向无连接。

　　　  　 2. 每个数据包大小限制在64K中

　　　  　 3.因为无连接，所以不可靠

　　　　　　4. 因为不需要建立连接，所以速度快

　　　  　　5.udp 通讯是不分服务端与客户端的，只分发送端与接收端**。**


## **三，怎样来编写UDP？**

　　　　　　发送数据步骤：

　　　　　　　　1.创建socket服务

　　　　　　　　2.创建数据包

　　　　　　　　3.将数据封装到数据包中,添加ip和端口以及数据

　　　　　　　　4.发送

　　　　　　　　5.关闭资源

　　　　　　接收数据步骤：

　　　　　　　　1.创建socket服务，并监听端口

　　　　　　　　2.创建数据包，用来接收数据

　　　　　　　　3.用socket接收数据到数据包中

　　　　　　　　4.从数据包中取出数据

　　　　　　　　5.关闭资源

## **四，代码实现UDP通信**

###   **1.客户端代码**



``` java
 1 import java.io.IOException;
 2 import java.net.DatagramPacket;
 3 import java.net.DatagramSocket;
 4 import java.net.InetAddress;
 5 import java.util.Scanner;
 6 
 7 public class User {
 8     static Scanner sc=  new Scanner(System.in);
 9     public static void main(String[] args) throws IOException {
10         //1.创建客户端套接字
11         DatagramSocket ds = new DatagramSocket();
12         //2.创建客户端发送数据包
13         while(true){
14             System.out.println("请输入要发送的信息：");
15             String info = sc.nextLine();
16             byte []buf =info.getBytes();
17             DatagramPacket dp = new DatagramPacket(buf, buf.length, 
18                     InetAddress.getByName("localhost"), 152);
19             //3.发送数据包
20             ds.send(dp);
21             //4.结束发送循环
22             if("886".equals(info)){
23                 break;
24             }
25         }
26         //5.关闭套接字
27         ds.close();
28     }
29 }
```



###　**2.服务端代码**



``` java
 1 import java.io.IOException;
 2 import java.net.DatagramPacket;
 3 import java.net.DatagramSocket;
 4 import java.net.InetAddress;
 5 
 6 public class Server {
 7       public static void main(String[] args) throws IOException {
 8         //1.创建服务端套接字
 9         DatagramSocket ds = new DatagramSocket(152);//注意指定端口
10         //2.创建接受客户端信息的空数据包
11         while(true){
12             byte [] buf =new byte[1024];
13             DatagramPacket dp = new DatagramPacket(buf, buf.length);
14             //3.接受数据
15             ds.receive(dp);
16             //4.拆分数据
17             byte[] data = dp.getData();
18             //5.获取客户端IP和主机名
19             InetAddress ip = dp.getAddress();
20             String host = ip.getHostName();
21             //6.读取数据
22             String info = new String(buf,0,buf.length);
23             System.out.println("来自"+host+"的消息是:"+info);
24             ds.close();
25             //7.关闭套接字
26         }
27     }
28 }
```



 

## 参考文章
* https://www.cnblogs.com/topshark/p/10245560.html