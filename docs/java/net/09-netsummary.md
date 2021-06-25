---
title: 网络编程-精华总结
---

## Java基础知识篇【Java网络编程精华总结】

::: tip
本文主要是介绍 Java网络编程精华总结 。
:::

[[toc]]



## 一、网络编程

> **网络编程** 就是用程序来实现不同设备之间的信息交互。

### 1、网络通信的三要素

> IP地址、端口号、传输协议（TCP、UDP）。

**IP地址**：网络设备中的编号，为了方便在网络中找到这台设备。

**端口号**：程序的编号，为了方便找到这个程序（0~65536）。

**传输协议**：通讯的规范（UDP、TCP）。

- **UDP：** 面向无连接，数据不可靠，速度快，传输效率高。
- **TCP：** 面向连接，数据可靠，速度慢，传输效率低。（需要三次握手：因为它需要确保双方信道都是畅通的）



### 2、三次握手（连接）

第一次握手，发送同步报文（SYN）；

第二次握手，发送应答报文和同步报文（SYN + ACK）；

第三次握手，发送应答报文（ACK）。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/java/net/sum-1.png')" alt="wxmp">



### 3、四次挥手（关闭）

第一次挥手，发送应答报文和结束报文（ACK + FIN）；

第二次握手，发送应答报文（ACK）；

第三次握手，发送应答报文和结束报文（ACK + FIN）；

第四次握手，发送应答报文（ACK）。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/java/net/sum-2.png')" alt="wxmp">



### 4、SOCKET（套接字）

> 数据在网络中进行传输是通过 **Socket** 来实现， **Socket** 是一个介质。通信的两端都要有一个 **Socket** 才能通信。
>
> **Socket** 也用于描述IP地址和端口，也就是一个通信链的句柄。



------

## 二、INETADDRESS 类

> **主机类**，在 Java 中用来表示一个主机，用于标识网络上的硬件资源，表示互联网协议地址（IP地址）。直接输出 InetAddress 对象，得到：**计算机名/IP地址**。它在 **java.net包** 中。



### 1、常用方法

#### 1）获取本地主机

```java
static InetAddress getLocalHost()
1
```

#### 2）根据IP地址或计算机名获取主机

```java
static InetAddress getByName(String host)
1
```

#### 3）获取计算机名

```java
String getHostName()
1
```

#### 4）获取IP地址

```java
String getHostAddress()
1
```

#### 5）获取字节数组的IP地址（[127.0.0.1]）

```java
byte[] getAddress[]
1
```



------

## 三、URL类

> **统一资源定位符类**，在 Java 中表示 Internet 上某一资源的地址。**URL由两部分组成：协议名称和资源名称。**中间用冒号隔开。它在 **java.net包** 中。**如：** [http://www.baidu.com](https://www.baidu.com/)



### 1、常用方法

http://www.baidu.com:8888/a/index.html?username=admin&password=123#test

#### 1）构造方法

```java
URL(String spec)
URL(URL context, String spec)
12
```

> **第二个构造方法：** 已存在的URL后面拼接文件路径spec

#### 2）获取协议

```java
String getProtocol()
1
```

#### 3）获取计算机名

```java
String getHost()
1
```

#### 4）获取端口号

```java
int getPort()
1
```

#### 5）获取文件路径（/A/INDEX.HTML）

```java
String getPath()
1
```

#### 6）获取文件名（文件路径？参数列表）

```java
String getFile()
1
```

#### 7）获取锚点

```java
String getRef()
1
```

#### 8）获取参数列表

```java
String getQuery()
1
```

#### 9）通过URL读取指定资源的输入流

```java
InputStream openStream()
1
```



### 2、应用

> 使用URL读取网页内容。

```java
main {
    // 创建URL对象，指向 www.baidu.com
    URL url = new URL("http://www.baidu.com");
    // 读取指定的输入流
    InputStream is = url.openStream();
    BufferedReader br = new BufferedReader(new InputStreamReader(is, "UTF-8"));
    String info = "";
    // 获取信息
    while ((info = br.readLine()) != null) {
        System.out.println(info);
    }
    // 释放资源
    br.close();
    is.close();
}
123456789101112131415
```



------

## 四、UDP协议通信

### 1、相关类及方法

#### 1）DATAGRAMSOCKET 类

> 此类表示用来发送和接收数据。

**构造方法：**

```java
DatagramSocket()
1
```

> 创建 Socket 对象，并随机分配一个端口号。

```java
DatagramSocket(int port)
1
```

> 创建 Socket 对象，并指定端口号。

**常用方法：**

```java
void send(DatagramPacket p)
1
```

> 发送方法，并将数据包进行发送。

```java
void receive(DatagramPacket p)
1
```

> 接收方法，接收数据包。

#### 2）DATAGRAMRACKET类

**构造方法：**

```java
DatagramPacket(bys, bys.length)
1
```

> **参数：** byte[] 数据；数据长度。

```java
DatagramRacket(byte[] buf, int length, InetAddress address, int port)
1
```

> **参数：** byte[] 数据；数据长度；接收端主机；接收端端口号。

**常用方法：**

```java
byte[] getData()
1
```

> 获取数据信息。

```java
int getLength()
1
```

> 获取数据信息的长度。

```java
InetAddress getAddress()
1
```

> 获取包中的主机。

```java
int getPort()
1
```

> 获取包中的端口号。



### 2、UDP协议收发数据的注意事项

端口号错误，数据可以正常发出，不会抛出异常，但是收不到数据。

**常见异常：**

```java
BindException : Address already in use : Cannot bind 端口已经绑定了
1
```



### 3、传输步骤

#### 1）发送数据步骤

- 创建发送端 Socket 对象（DatagramSocket类）；
- 创建数据并打包（DatagramPacket类）；
- 发送数据（send 方法）；
- 释放资源（close 方法）。

#### 2）接收数据步骤

- 创建接收端 Socket 对象（DatagramSocket类）；
- 接收数据（receive 方法 和 DatagramPacket类）；
- 解析数据（getData 方法 和 getLength 方法）；
- 释放资源（close 方法）。



### 4、应用

#### 1）发送数据

```java
main {
    // 创建发送端Socket对象
    DatagramSocket ds = new DatagramSocket();
    // 创建数据并打包
    String dataStr = "hello world";
    byte[] bys = dataStr.getBytes(); // 字节数据
    InetAddress address = InetAddress.getByName("127.0.0.1"); // 接收端的IP地址对象
    int port = 8888; // 接收端的端口号
    
    // 打包
    DatagramPacket dp = new DatagramPacket(bys, bys.length, address, port);
    // 发送数据
    ds.send(dp);
    // 释放资源
    ds.close();
}
12345678910111213141516
```

#### 2）接收数据

```java
main {
    // 创建接收端Socket对象
    DatagramSocket ds = new DatagramSocket(8888);
    // 接收数据
    byte[] bys = new byte[1024];
    DatagramPacket dp = new DatagramPacket(bys, bys.length); // 专门用来接收数据的包
    ds.receive(dp); // 接收数据，进入阻塞状态
    // 解析数据
    InetAddress address = dp.getAddress(); // 获取发送端的IP地址对象
    byte[] data = dp.getData(); // 获取发送端发送的数据
    int length = dp.getLength(); // 获取发送端发送的数据长度
    // 输出数据
    System.out.println("sender：" + address.getHostAddress());
    System.out.println("data：" + new String(data, 0, length));
    // 释放资源
    ds.close();
}
1234567891011121314151617
```



------

## 五、TCP协议通信

### 1、相关类及方法

#### 1）SOCKET 类

**构造方法：**

```java
Socket(String host, int port)
1
```

> 创建客户端 Socket 对象，并配置服务端的主机名和端口号。

#### 2）SERVERSOCKET 类

**构造方法：**

```java
ServerSocket(int port)
1
```

> 创建服务端 Socket 对象，并指定端口号。



### 2、传输步骤

#### 1）客户端步骤

- 创建客户端 Socket 对象（创建连接）；
- 获取输入输出流对象；
- 发送/接收数据；
- 释放资源。

#### 2）服务端步骤

- 创建服务端 Socket 对象；
- 监听客户端（阻塞）；
- 获取输入/输出流对象；
- 发送/接收数据；
- 释放资源。



### 3、应用

#### 1）客户端发送数据

```java
main {
    // 创建客户端Socket对象
    Socket client = new Socket("127.0.0.1", 8888);
    // 获取输出流对象，并配置自动刷新
    PrintWriter pw = new PrintWriter(client.getOutputStream(), true);
    // 输出数据
    pw.println("hello");
    // 释放资源
    pw.close();
    client.close();
}
1234567891011
```

#### 2）服务端接收数据

```java
main {
    // 创建服务端Socket对象
    ServerSocket server = new ServerSocket(8888);
    // 监听客户端对象，进入阻塞状态
    Socket client = Server.accept();
    // 获取输入流对象
    BufferedReader br = new BufferedReader(new InputStreamReader(client.getInputStream()));
    // 获取数据
    String info = br.readLine();
    System.out.println(info);
    // 释放资源
    br.close();
    client.close();
    // server.close(); // 服务器一般不关闭
}
123456789101112131415
```

## 六、应用

### 1、模拟用户登录（使用TCP协议实现）

**思路：**

- **客户端：**

① 创建客户端 Socket 对象；
② 获取用户名和密码；
③ 获取输出流对象；
④ 写出数据；
⑤ 获取输入流对象；
⑥ 获取服务器返回的数据；
⑦ 释放资源。

- **服务端：**

① 创建服务器 Socket 对象；
② 监听客户端（阻塞）；
③ 获取输入流对象；
④ 获取数据（用户名和密码）；
⑤ 获取输出流对象；
⑥ 判断用户名和密码是否正确；
⑦ 释放资源。




## 参考文章
* https://www.freesion.com/article/3224915753/#2_29