---
title: OSI七层模型和TCP/IP
---

## OSI七层模型和TCP/IP

::: tip
本文主要是介绍 OSI七层模型和TCP/IP，相关的基础知识内容 。
:::

[[toc]]

OSI(Open System Interconnection)，开放式系统互联参考模型 。是一个逻辑上的定义，一个规范，它把网络协议从逻辑上分为了7层。每一层都有相关、相对应的物理设备，比如常规的路由器是三层交换设备，常规的交换机是二层交换设备。OSI七层模型是一种框架性的设计方法，建立七层模型的主要目的是为解决异种网络互连时所遇到的兼容性问题，其最主要的功能就是帮助不同类型的主机实现数据传输。它的最大优点是将服务、接口和协议这三个概念明确地区分开来，通过七个层次化的结构模型使不同的系统不同的网络之间实现可靠的通讯。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/java/net/model-1.png')" alt="wxmp">


TCP/IP协议是Internet最基本的协议、Internet国际互联网络的基础，主要由网络层的IP协议和传输层的TCP协议组成。TCP/IP 定义了电子设备如何连入因特网，以及数据如何在它们之间传输的标准。协议采用了4层的层级结构，每一层都呼叫它的下一层所提供的协议来完成自己的需求。

ISO制定的OSI参考模型的过于庞大、复杂招致了许多批评。伴随着互联网的流行，其本身所采用的TCP/IP协议栈获得了更为广泛的应用和认可。在TCP/IP参考模型中，去掉了OSI参考模型中的会话层和表示层（这两层的功能被合并到应用层实现）。同时将OSI参考模型中的数据链路层和物理层合并为主机到网络层。

## 1、OSI七层模型各层介绍

在互联网中实际使用的是TCP/IP参考模型。实际存在的协议主要包括在：物理层、数据链路层、网络层、传输层和应用层。各协议也分别对应这5个层次而已。

要找出7个层次所对应的各协议，恐怕会话层和表示层的协议难找到啊。。

​    【1】物理层：
     主要定义物理设备标准，如网线的接口类型、光纤的接口类型、各种传输介质的传输速率等。它的主要作用是传输比特流（就是由1、0转化为电流强弱来进行传输,到达目的地后在转化为1、0，也就是我们常说的数模转换与模数转换），这一层的数据叫做比特。

　　【2】数据链路层：
     定义了如何让格式化数据以进行传输，以及如何让控制对物理介质的访问，这一层通常还提供错误检测和纠正，以确保数据的可靠传输。

　　【3】网络层：
    在位于不同地理位置的网络中的两个主机系统之间提供连接和路径选择，Internet的发展使得从世界各站点访问信息的用户数大大增加，而网络层正是管理这种连接的层。

　　【4】传输层：
    定义了一些传输数据的协议和端口号（WWW端口80等），如：TCP（传输控制协议，传输效率低，可靠性强，用于传输可靠性要求高，数据量大的数据），UDP（用户数据报协议，与TCP特性恰恰相反，用于传输可靠性要求不高，数据量小的数据，如QQ聊天数据就是通过这种方式传输的）， 主要是将从下层接收的数据进行分段和传输，到达目的地址后再进行重组，常常把这一层数据叫做段。

###　　【5】会话层：
通过传输层（端口号：传输端口与接收端口）建立数据传输的通路，主要在你的系统之间发起会话或者接受会话请求（设备之间需要互相认识可以是IP也可以是MAC或者是主机名）。

###　　【6】表示层：
可确保一个系统的应用层所发送的信息可以被另一个系统的应用层读取。例如，PC程序与另一台计算机进行通信，其中一台计算机使用扩展二一十进制交换码（EBCDIC），而另一台则使用美国信息交换标准码（ASCII）来表示相同的字符。如有必要，表示层会通过使用一种通格式来实现多种数据格式之间的转换。

###　　【7】应用层： 
是最靠近用户的OSI层，这一层为用户的应用程序（例如电子邮件、文件传输和终端仿真）提供网络服务。

　　 
## 2、协议的归类

以下列表是一些协议的归类，如果有错了或不对的地方，希望各位大神多多提出！其实在应用、表示和会话这三层之间的协议可共用（由于实际的网络协议将它们归了一类所致）

 

### 应用层

DHCP · DNS · FTP · Gopher ·GTP · HTTP · IMAP4 · IRC · NNTP · NTP · POP3 · RPC · RTCP · RTP ·RTSP · SIP · SMTP ·SNMP · SSH · SDP · SOAP .STUN. SSDP · TELNET · XMPP

### 表示层

HTTP/HTML · FTP · Telnet · ASN.1（具有表示层功能）

### 会话层

ADSP ·ASP ·H.245·ISO-SP ·iSNS ·NetBIOS ·PAP ·RPC·

RTCP ·SMPP ·SCP ·SSH ·ZIP ·SDP（具有会话层功能）

### 传输层 

TCP · UDP · TLS · DCCP · SCTP ·RSVP · PPTP

### 网络层

IP (IPv4 · IPv6) · ICMP · ICMPv6 · IGMP ·IS-IS · IPsec · BGP · RIP · OSPF ·ARP · RARP

### 数据链路层 

Wi-Fi(IEEE 802.11) · WiMAX(IEEE 802.16) ·ATM · DTM · 令牌环 · 以太网路 ·

FDDI · 帧中继 · GPRS · EVDO · HSPA · HDLC · PPP · L2TP · ISDN ·STP

### 物理层

以太网路卡 · 调制解调器 · 电力线通信(PLC) · SONET/SDH（光同步数字传输网） · 

G.709（光传输网络） · 光导纤维 · 同轴电缆 · 双绞线

## 2、协议归类名称简述


### 应用层

　　· DHCP(动态主机分配协议)
　　· DNS (域名解析）
　　· FTP（File Transfer Protocol）文件传输协议
　　· Gopher （英文原义：The Internet Gopher Protocol 中文释义：（RFC-1436）网际Gopher协议）
　　· HTTP （Hypertext Transfer Protocol）超文本传输协议
　　· IMAP4 (Internet Message Access Protocol 4) 即 Internet信息访问协议的第4版本
　　· IRC （Internet Relay Chat ）网络聊天协议
　　· NNTP （Network News Transport Protocol）RFC-977）网络新闻传输协议
　　· XMPP 可扩展消息处理现场协议
　　· POP3 (Post Office Protocol 3)即邮局协议的第3个版本
　　· SIP 信令控制协议
　　· SMTP （Simple Mail Transfer Protocol）即简单邮件传输协议
　　· SNMP (Simple Network Management Protocol,简单网络管理协议)
　　· SSH （Secure Shell）安全外壳协议

   . SSL: 安全套接字层协议；

　　· TELNET 远程登录协议
　　· RPC （Remote Procedure Call Protocol）（RFC-1831）远程过程调用协议
　　· RTCP （RTP Control Protocol）RTP 控制协议
　　· RTSP （Real Time Streaming Protocol）实时流传输协议
　　· TLS （Transport Layer Security Protocol）传输层安全协议

　　· SDP( Session Description Protocol）会话描述协议
　　· SOAP （Simple Object Access Protocol）简单对象访问协议
　　· GTP 通用数据传输平台
　　· STUN （Simple Traversal of UDP over NATs，NAT 的UDP简单穿越）是一种网络协议
　　· NTP （Network Time Protocol）网络校时协议
### 传输层
　　·TCP（Transmission Control Protocol）传输控制协议
　　· UDP (User Datagram Protocol）用户数据报协议
　　· DCCP （Datagram Congestion Control Protocol）数据报拥塞控制协议
　　· SCTP（STREAM CONTROL TRANSMISSION PROTOCOL）流控制传输协议
　　· RTP(Real-time Transport Protocol或简写RTP）实时传送协议
　　· RSVP （Resource ReSer Vation Protocol）资源预留协议
　　· PPTP ( Point to Point Tunneling Protocol）点对点隧道协议
### 网络层
IP(IPv4 · IPv6) Internet Protocol（网络之间互连的协议）
ARP : Address Resolution Protocol即地址解析协议，实现通过IP地址得知其物理地址。
RARP :Reverse Address Resolution Protocol 反向地址转换协议允许局域网的物理机器从网关服务器的 ARP 表或者缓存上请求其 IP 地址。
ICMP :（Internet Control Message Protocol）Internet控制报文协议。它是TCP/IP协议族的一个子协议，用于在IP主机、路由器之间传递控制消息。
ICMPv6:
IGMP :Internet 组管理协议（IGMP）是因特网协议家族中的一个组播协议，用于IP 主机向任一个直接相邻的路由器报告他们的组成员情况。
RIP : 路由信息协议（RIP）是一种在网关与主机之间交换路由选择信息的标准。
OSPF : (Open Shortest Path First开放式最短路径优先).
BGP :（Border Gateway Protocol ）边界网关协议，用来连接Internet上独立系统的路由选择协议
IS-IS:（Intermediate System to Intermediate System Routing Protocol）中间系统到中间系统的路由选择协议.
IPsec:“Internet 协议安全性”是一种开放标准的框架结构，通过使用加密的安全服务以确保在 Internet 协议 (IP) 网络上进行保密而安全的通讯。
### 数据链路层
　　802.11 · 802.16 · Wi-Fi · WiMAX · ATM · DTM · 令牌环 · 以太网 · FDDI · 帧中继 · GPRS · EVDO · HSPA · HDLC · PPP · L2TP · ISDN
### 物理层
　　以太网物理层 · 调制解调器 · PLC · SONET/SDH · G.709 · 光导纤维 · 同轴电缆 · 双绞线

## 4. OSI七层协议模型精华

应用层协议需要掌握的是：

HTTP（Hyper text transfer protocol）、FTP（file transfer protocol）、SMTP（simple mail transfer rotocol）、POP3（post office protocol 3）、IMAP4（Internet mail access protocol）

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/java/net/model-2.png')" alt="wxmp">

 
## 5. OSI七层和TCP/IP四层的关系

1.1 OSI引入了服务、接口、协议、分层的概念，TCP/IP借鉴了OSI的这些概念建立TCP/IP模型。

1.2 OSI先有模型，后有协议，先有标准，后进行实践；而TCP/IP则相反，先有协议和应用再提出了模型，且是参照的OSI模型。

1.3 OSI是一种理论下的模型，而TCP/IP已被广泛使用，成为网络互联事实上的标准。

TCP：transmission control protocol 传输控制协议

UDP：user data protocol 用户数据报协议

| OSI七层网络模型         | TCP/IP四层概念模型                   | 对应网络协议                            |
| ----------------------- | ------------------------------------ | --------------------------------------- |
| 应用层（Application）   | 应用层                               | HTTP、TFTP, FTP, NFS, WAIS、SMTP        |
| 表示层（Presentation）  | Telnet, Rlogin, SNMP, Gopher         |                                         |
| 会话层（Session）       | SMTP, DNS                            |                                         |
| 传输层（Transport）     | 传输层                               | TCP, UDP                                |
| 网络层（Network）       | 网络层                               | IP, ICMP, ARP, RARP, AKP, UUCP          |
| 数据链路层（Data Link） | 数据链路层                           | FDDI, Ethernet, Arpanet, PDN, SLIP, PPP |
| 物理层（Physical）      | IEEE 802.1A, IEEE 802.2到IEEE 802.11 |                                         |

 

## 参考文章
* https://www.cnblogs.com/awkflf11/p/9190309.html
* https://www.shuzhiduo.com/A/gAJGDWb45Z/