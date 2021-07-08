---
title: 网络编程-URI和URL
---


::: tip
本文主要是介绍 Java网络编程-URI和URL 。
:::

[[toc]]


任意给定主机上可能会有任意多个资源，这些资源需要有标识符方便主机之间访问对方的资源，因此这篇文章深入分析一下URL和URI。

# URI

URI全称是Uniform Resource Identifier，也就是统一资源标识符，它是一种采用特定的语法标识一个资源的字符串表示。URI所标识的资源可能是服务器上的一个文件，也可能是一个邮件地址、图书、主机名等。简单记为：URI是标识一个资源的字符串(这里先不必纠结标识的目标资源到底是什么，因为使用者一般不会见到资源的实体)，从服务器接收到的只是资源的一种字节表示(二进制序列，从网络流中读取)。URI的语法构成是：一个模式和一个模式特定部分。表示形式如下：

``` java
模式:模式特定部分

scheme:scheme specific part 
```

**注意：模式特定部分的表示形式取决于所使用的模式**。URI当前的常用模式包括：

- data：链接中直接包含经过BASE64编码的数据。
- file：本地磁盘上的文件。
- ftp：FTP服务器。
- http：使用超文本传输协议。
- mailto：电子邮件的地址。
- magnet：可以通过对等网络(端对端P2P，如BitTorrent)下载的资源。
- telnet：基于Telnet的服务的连接。
- urn：统一资源名(Uniform Resource Name)。

除此之外，Java中还大量使用了一些非标准的定制模式，如rmi、jar、jndi、doc、jdbc等，这些非标准的模式分别用于实现各种不同的用途。

URI中的模式特定部分没有固定的语法，不过，很多时候都是采用一种层次结构形式，如：

``` java
//授权机构/路径?查询参数

//authority/path?query
```

URI的authority部分指定了负责解析该URI其他部分的授权机构(authority)，很多时候，URI都是使用Internet主机作为授权机构。例如http://www.baidu.com/s?ie=utf-8，授权机构是www.baidu.com(在URL角度来看，主机名是www.baidu.com)。

URI的路径(path)是授权机构用来确定所标识资源的字符串。不同的授权机构可能会把相同的路径解析后指向不同的资源。其实这一点很明显，试下你写两个不同的项目，主页的路径都是/index.html，它们一定是完全相同的html文档。另外，路径是可以分层的，分层的各个部分使用斜线"/"进行分隔，而"."和".."操作符用于在分层层次结构中的导航(后面这两个操作符可能很少见到，了解即可)。

## URI的语法

URI的模式的组成部分可以是小写字母、数字、加号、点(.)和连号(-)。典型的URI的其他三个部分(模式特定部分，也就是授权机构、路径和查询参数)分别由ASCII字母组成(也就是字母A-Z、a-z和数字0-9)，此外，还可以使用标点符号`-、_、.、!和~`，而定界符(如/、?、&和=)有其预定义的用途。所有的其他字符，包括ASCII中拉丁字母，都需要使用百分号(%)转义，转义后的格式是：%+字符按照UTF-8编码再转成16进制的字符串表示。注意一点，如果前面提到的定界符没有作为定界符使用，也需要进行转义。举个简单的例子，如URI中存在中文字符"木"，木字的UTF-8编码为0xE6 0x9C 0xA8，那么它在URI中应该转义为%E6%9C%A8。Jdk中的URLEncoder或者apache-codec中的相关类库提供URI(URL)编码的功能。

URI中还可以携带用户的口令，因为会有安全漏洞，所以并不常见，这里也不展开分析。

## URI类

URI在Java中抽象为java.net.URI类。

### 构造URI实例
URI实例构造方法有很多个：

```java
public URI(String str) throws URISyntaxException

public URI(String scheme,String userInfo, String host, int port,
        String path, String query, String fragment) throws URISyntaxException

public URI(String scheme, String authority,
       String path, String query, String fragment)throws URISyntaxException

public URI(String scheme, String host, String path, String fragment) throws URISyntaxException

public URI(String scheme, String ssp, String fragment) throws URISyntaxException

//静态工厂方法，最终调用的是URI(String str)
public static URI create(String str)
```

注意的是构造URI实例的时候会检查是否符合URI的语法，否则会抛出URISyntaxException异常。以上的所有方法都是基于URI的模式+模式特定部分或者URI的各个部分构造URI实例，而静态工厂方法`public static URI create(String str)`主要是屏蔽了非检查型异常URISyntaxException，转化为检查型异常IllegalArgumentException，这样就不需要显式捕获异常。

### 获取URI的属性

前面也提到，URI引用包括最多三个部分：模式、模式特定部分和片段标识符，一般格式为：

``` java
模式:模式特定片段:片段标识符
```

基于这种语法规范，URI类提供了下面几个方法获取这些属性：

```java
public String getScheme()

public String getRawSchemeSpecificPart()

public String getSchemeSpecificPart()

public String getFragment()

public String getRawFragment()
```

PS：之所以没有`getRawScheme()`方法，是因为URI规范中强制规定，所有的模式名称必须由URI规范中合法的ASCII字符组成，也就是模式名称中不允许存在百分号转义。上面的`getRawSchemeSpecificPart()`是返回原始的模式特定部分，`getSchemeSpecificPart()`返回了经过解码(decode)的模式特定部分。同理，`getRawFragment()`返回原始的片段标识符，而`getFragment()`返回经过解码(decode)的片段标识符。当然，还有其他方法获取URI的基础属性：

```java
//是否绝对URI
public boolean isAbsolute()

//是否不透明的URI，如果isOpaque()返回true，URI是不透明的
//只能获取到模式、模式特定部分和片段标识符，获取不了host、port等
public boolean isOpaque()

public String getAuthority()

public String getRawAuthority()

public String getRawUserInfo()

public String getUserInfo()

public String getHost()

public int getPort()

public String getRawPath()

public String getPath()

public String getRawQuery()

public String getQuery()
```

PS：`isOpaque()`方法为true的时候，说明URI是不透明的，不透明的URI无法获取授权机构、路径、端口和查询参数等。另外，上面的获取属性的方法有些方法存在`getRawFoo()`的对应方法，这些`getRawFoo()`方法就是获取原始属性的值，如果没有`Raw`关键字，则返回解码后的字符串值。

### 解析相对URI

URI中提供了三个方法用于绝对URI和相对URI之间的转换：

```java
public URI resolve(URI uri)

public URI resolve(String str)

public URI relativize(URI uri)
```

其中，`resolve`方法是基于绝对URI和相对URI把相对URI补全为绝对URI，例如：

```java
public static void main(String[] args) throws Exception{
	URI absolute = URI.create("http://localhost:8080/index.html");
	URI relative = URI.create("/hello.html");
	URI resolve = absolute.resolve(relative);
	System.out.println(resolve);
}
//控制台输出
http://localhost:8080/hello.html
```

而`relativize`方法是基于绝对URI和相对URI反解出绝对URI中的相对URI部分，例如：

```java
public static void main(String[] args) throws Exception{
	URI absolute = URI.create("http://localhost:8080/index.html");
	URI relative = URI.create("http://localhost:8080/");
	URI resolve = relative.relativize(absolute);
	System.out.println(resolve);
}

//控制台输出
index.html
```

### URI的比较

URI类实现了Comparable接口，因此URI可以排序。URI的相等性不是基于字符串直接比较，相等的URI在透明性上必须是一致的，例如都是不透明的，其他部分才可以进行比较。URI比较的时候，模式和授权机构是忽略大小写的，其他部分必须区分大小写，用于转义无效字符串的十六进制数字除外。需要转义的字符在转义前和转义之后进行比较，会认为是不同的URI。

```java
//1.
URI uri1 = URI.create("http://localhost:8000/index.html");
URI uri2 = URI.create("http://LOCALHOST:8000/index.html");
System.out.println(uri1.equals(uri2));
//输出:true

//2.
URI uri3 = URI.create("http://localhost:8000/index/A");
URI uri4 = URI.create("http://LOCALHOST:8000/index/%41");
System.out.println(uri3.equals(uri4));
//输出:false
```

### URI的字符串表示

URI中有两个方法返回其字符串表示：

```java
public String toString()

public String toASCIIString()
```

`toString()`方法返回未编码的字符串形式，也就是特殊的字符不使用百分号转义，因此这个方法的返回值不能保证符合URI的语法，尽管它的各个部分是遵循URI的语法规范的。`toASCIIString()`方法返回经过编码的字符串形式(US-ACSII编码)，也就是特殊的字符一定经过了百分号转义。`toString()`存在的意义是提高URI的可读性，`toASCIIString()`方法存在的意义是提高URI的可用性。

# URL

URL全称是Uniform Resource Location，也就是统一资源位置。实际上，URL就是一种特殊的URI，它除了标识一个资源，还会为资源提供一个特定的网络位置，客户端可以通过它来获取URL对应的资源。

URL所表示的网络资源位置通常包括用于访问服务器的协议(如http、ftp等)、服务器的主机名或者IP地址、以及资源文件在该服务器上的路径。典型的URL例如http://localhost/myProject/index.html，它指示本地服务器的myProject目录下有一个名为index.html的文档，这个文档可以通过http协议访问(实际上，URL不一定是指服务器中的真实的物理路径，因为我们一般在服务器中部署应用，如Servlet应用，URL访问的很可能是应用的接口，至于最终映射到什么资源可以由应用自身决定)。

## URL的语法

URL的语法表示形式为：

``` java
protocol://userInfo@host:port/path?query#fragment

协议://用户信息@主机名:端口/路径?查询#片段
```

**protocol**：URL中的协议(protocol)是相应于URI中的模式(schema)的另一个叫法。URL中，协议部分可以是file、ftp、http、https、magnet、telnet或者其他定制协议字符串(但是不包括urn)。

**userInfo**：URL中的用户信息(userInfo)是服务器的登录信息，这部分信息是可选的。如果这部分信息存在，一般会包含一个用户名，极少情况下会包含一个口令。实际上URL携带用户信息是不安全的。

**port**：URL中的端口号(port)是指服务器中应用的运行端口，默认端口为80，此部分信息是可选的(也就如果不指定端口号就使用默认端口80)。

**path**：URL中的路径(path)用于表示服务器上的一个特定的目录(其实说一个特定的文件也可以)，这个特定的目录不一定是物理目录，也有可能是逻辑目录。这一点很容易说明，一般不可能把服务器上面的目录直接公开让所有人访问，服务器上面跑的一般是Web(Java的话一般是Servlet)应用，路径指向的实际数据来源甚至很大可能是在其他服务器上的MySQL中的查询结果。

**query**：查询参数(query)一般是一个字符串，它表示URL中向服务器提供的附加参数，一般只使用在http协议的URL中，其中包含了表单数据，来源于用户的输入，表示形式是key1=value1&key2=value2&keyn=valuen。

**fragment**：片段(fragment)表示远程服务器资源的某个特定的部分。假如服务器资源是一个HTML文档，此片段标识符将制定为该HTML文档的一个锚(Anchor)。如果远程资源是一个XML文档，那么这个片段标识符是一个XPointer。(如果用Markdown写过博客就知道，添加了导航目录之后，片段就是目录将要导航到的目的章节)

## 相对URL

URL可以告知浏览器一个文档(Document，假设URL对应服务器上的资源统一叫做文档)的大量信息：获取文档所使用的协议、文档所在的主机、文档在该主机中的路径等。文档中可能也存在引用和当前URL相同的URL，因此，在该文档中使用URL的时候并不要求完整地指定每一个URL，URL可以继承其父文档的协议、主机名和路径。继承了父文档URL的部分信息的这类不完整的URL称为相对URL(Reletive URL)，相反，完整指定所有部分的URL称为绝对URL(Absolute URL)。在相对URL中，缺少的各个部分与请求该文档的URL对应的部分相同。举个例子，我们访问本地服务器的一个HTML文档，URL为http://localhost:8080/myProject/index.html，index.html文档中存在一个超链接`<a href="login.html">`，当我们点击此超链接的时候，浏览器会从原始URL(http://localhost:8080/myProject/index.html)中截去index.html然后拼接login.html，最后访问http://localhost:8080/myProject/login.html。

如果相对URL以"/"开头，那么它是相对于文档的根目录，而不是当前的文档。举个例子，我们访问本地服务器的一个HTML文档，URL为http://localhost:8080/myProject/index.html，index.html文档中存在一个超链接`<a href="/login.html">`，当我们点击此超链接的时候，浏览器会跳转到http://localhost:8080/login.html。

相对URL有两个显著的优点：

- 1、减少文档编写量，毕竟可以省略一部分URL内容，不过这个不是重要的优点。
- 2、重要的优点是：相对URL允许使用多协议来提供一个文档树，例如http和ftp，使用相对URL编写的文档可以从一个网站直接复制或者迁移到另一个网站而不会破坏文档内部URL链接。

## URL类

java.net.URL类(后面直接叫URL)是JDK对URL的统一抽象，它是一个final修饰的类，也就是不允许派生子类。实际上，URL设计的时候采用了策略模式，不同的协议的处理器就是不同的策略，而URL类构成了上下文，通过它决定选用何种策略。URL的核心属性包括协议(或者叫模式)、主机名、端口、查询参数字符串和片段标识符(在JDK中被命名为ref)等，每个属性都可以单独设置。一旦一个URL对象被构造之后，它的所有属性都不能改变，也就是它的实例是线程安全的。

### 构造URL实例

URL实例的主要构造方法如下：

``` java
//基于URL的各个部分构造URL实例，其中file相当于path、query和fragment三个部分组成
public URL(String protocol, String host, int port, String file) throws MalformedURLException

//基于URL的各个部分构造URL实例，其中file相当于path、query和fragment三个部分组成，使用默认端口80
public URL(String protocol, String host, String file) throws MalformedURLException

//基于URL模式构造URL实例
public URL(String spec) throws MalformedURLException

//基于上下文(父)URL和URL模式构造相对URL实例
public URL(URL context, String spec) throws MalformedURLException
```

下面基于上面几个构造URL实例的方法举几个简单的编码例子：

```java
//1.
//注意file要带斜杆前缀/
URL url = new URL("http", "127.0.0.1", 8080, "/index");
//输出http://127.0.0.1:8080/index
System.out.println(url.toString());

//2.
URL url = new URL("http://127.0.0.1:8080/index");
//输出http://127.0.0.1:8080/index
System.out.println(url.toString());

//3.
URL url = new URL("http", "127.0.0.1", "/index");
//输出http://127.0.0.1/index
System.out.println(url.toString());

//4.
URL context = new URL("http", "127.0.0.1", "/index");
//构造相对URL，保留协议、host、port部分
URL url = new URL(context, "/login");
//输出http://127.0.0.1/login
System.out.println(url);
```

上面只说到通过URL类去构造对象，其实还有其他方法获取URL实例，例如：

```java
URL systemResource = ClassLoader.getSystemResource(String name)

Enumeration<URL> systemResources = ClassLoader.getSystemResources(String name)

URL resource = UrlMain.class.getResource(String name)

URL resource = UrlMain.class.getClassLoader().getResource(String name)

Enumeration<URL> resources = UrlMain.class.getClassLoader().getResources(String name)
```

其中，`ClassLoader.getSystemResource(String name)`和`ClassLoader.getSystemResources(String name)`都是先判断是否存在SystemClassLoader，若存在则使用SystemClassLoader加载资源，否则使用BootstrapClassLoader(BootstrapClassPath)进行资源加载，简单来说，这两个方法就是使用系统类加载器加载资源，加载资源时候，从类路径中加载资源，例如使用IDEA，则从编译后的/target目录中加载资源，这一点可以使用`ClassLoader.getSystemResource("")`进行验证。其他三个方法`Class#getResource(String name)`、`Class#getClassLoader()#getResource(String name)`和`Class#getClassLoader()#getResources(String name)`本质上都是基于AppClassLoader进行资源加载，它们加载资源的时候是从当前的Class所在的类路径(包括类的包路径，如果使用IDEA一般也是/target/类所在的包目录)进行加载，例如有一个类`club.throwable.Main.class`，如果目录club.throwable存在一张图片doge.jpg，则加载图片的时候可以这样子`club.throwable.Main.class.getResource("doge.jpg")`。值得注意的一点是，如果需要加载的资源是在一个特定目录中，那么`Class#getResource(String name)`中的name必须以文件路径分隔符开头，例如Window系统中用'/'，其他两个基于通过ClassLoader实例直接加载的不需要使用文件路径分隔符开头，这一点可以看`Class#getResource(String name)`方法中的`resolveName(name)`方法。

### 获取URL的属性

URL实例提供几个方法用于获取数据：

```java
public final InputStream openStream() throws java.io.IOException

public URLConnection openConnection() throws java.io.IOException

public URLConnection openConnection(Proxy proxy) throws java.io.IOException

public final Object getContent() throws java.io.IOException

public final Object getContent(Class[] classes) throws java.io.IOException
```

**InputStream openStream()**

`openStream()`方法连接到URL所引用的资源，在客户端和服务器之间完成必要的握手之后，返回一个InputStream实例，用于读取网络流数据。此方法返回的InputStream实例读取到的内容是Http请求体的原始报文(如果使用Http协议的话)，因此有可能是一个原始文本片段或者是一个二进制的序列(例如图片)。举个例子：

```java
	public static void main(String[] args) throws Exception{
		URL url = new URL("https://www.baidu.com");
		InputStream inputStream = url.openStream();
		int c;
		while ((c= inputStream.read()) != -1){
			System.out.print(c);
		}
		inputStream.close();
	}
```

**URLConnection openConnection()**

`openConnection()`和`openConnection(Proxy proxy)`是相似的，只是后者可以使用代理。`openConnection()`方法为指定的URL新建一个socket，并且返回一个URLConnection实例，它表示一个网络资源打开的连接，我们可以从这个打开的连接获取一个InputStream实例，用于读取网络流数据。如果上面的过程出现调用失败，会抛出一个IOException。

**Object getContent()**
`Object getContent()`和`Object getContent(Class[] classes)`是相似的，后者可以通过Class数组指定获取到的URL中的请求体内容转化为对应的类型的实体。`Object getContent()`实际上是调用了URLConnection实例中的getContent方法，一般来说，不建议使用这两个方法，因为转换的逻辑执行后的结果一般是不合符我们预想的结果。

### 获取URL属性

URL的属性获取可以理解为分解URL成URL组成的各个部分，这些部分的信息可以单独获取。前面提到过URL的各个组成部分，这里重复一下，URL分别由下面的几个部分组成：

- 模式(schema)，也称协议(protocol)。
- 用户信息(UserInfo)，这个并不常用。
- 授权机构，一般是"主机名(Host):port"的格式。
- 路径。
- 片段标识符，在Java中称为段或者ref。
- 查询字符串。

URL类中提供对应的方法分别是：

```java
//获取模式(协议)
public String getProtocol()

//获取主机名
public String getHost()

//获取授权机构,一般是host:port的形式
public String getAuthority()

//获取端口号port
public int getPort()

//返回协议的默认端口，如http协议的默认端口号为80，如果没有指定协议的默认端口则返回-1
public int getDefaultPort()

//返回URL字符串中从主机名后的第一个斜杆/一直到片段标识符的#字符之前的所有字符
public String getFile()

//返回的值和getFile()相似，但是不包含查询字符串
public String getPath()

//返回URL的片段标识符部分
public String getRef()

//返回URL的查询字符串
public String getQuery()

//返回URL中的用户信息,不常用
public String getUserInfo()
```

其中需要注意的是`getFile()`和`getPath()`，举个例子：

```java
URL url = new URL("https://localhost:8080/search?name=doge#anchor-1");
System.out.println(String.format("path=%s", url.getPath()));
System.out.println(String.format("file=%s", url.getFile()));
//控制台输出
path=/search
file=/search?name=doge
```

### 比较

URL实例的比较通常是使用`equals()`和`hashCode()`方法，当且仅当两个URL指向相同的主机、端口和路径上的资源，并且两者的片段标识符和查询字符串都相同的时候，才会认为两个URL是相等的。`equals()`调用的时候会尝试使用DNS解析主机，此方法有可能是一个阻塞的IO操作，会造成比较大的性能消耗，这个时候需要考虑使用缓存，或者把URL转化为URI进行比较。

### 转换

URL类中有三个常用的实例方法用于转换为另一种形式：

```java
public String toString()

public String toExternalForm()

public URI toURI()
```

实际上，`toString()`最终调用的是`toExternalForm()`，而`toExternalForm()`方法是使用StringBuilder把URL的各个组成部分拼接，返回的字符串可以方便直接使用在浏览器中。`toURI()`方法就是把URL实例转化为URI实例。

# URL的编码和解码

我们在做Web项目或者使用POSTMAN的时候经常会看到x-www-form-urlencoded，它是常用的媒体类型或者说内容类型(ContentType)，使用这种类型的时候，URL中的字符需要进行编码，那么为什么需要进行编码呢?这个是历史遗留原因，因为发明Web或者说Http(s)协议的时候，Unicode编码并未完全普及，URL中使用的字符必须来自ASCII的一个固定子集，这个固定子集是：

- 大写字母A-Z。
- 小写字母a-z。
- 数字0-9。
- 标点符号字符`-_.!~*'(和,)`。

其他字符如：`/&?@#;$+=%`也可以使用，但是它们限定于使用在特定的用途，如果这些字符串出现在URL路径或者查询字符串，它们以及路径和查询字符串的内容必须进行编码。

这里有个需要注意的地方：URL编码只针对URL路径和URL路径之后的部分，因为URL规范中规定，路径之前的部分必须满足ASCII固定子集的内容。

URL编码的方法很简单：除了ASCII数字、字母和部分指定的标点符号之外，所有的其他字符都要转化为字节表示，每个字节要转化为百分号(%)后面加2位十六进制数字。空格是一种特殊的字符，它使用得比较普遍，一般空格可以编码为%20或者加号(+)，但是加号本身的编码为%2B。而`/#=&和?`不作为分隔符的时候，必须进行编码。

解码过程就是上面编码过程的逆向操作，这里不具体展开。

Java中提供两个类java.net.URLEncoder和java.net.URLDecoder分别用于URL的编码和解码，注意需要使用两个参数的静态方法`encode(String value,String charset)`和`decode(String value,String charset)`，单参数的方法已经过期，不建议使用。注意在使用java.net.URLEncoder和java.net.URLDecoder的时候，它们的API不会判断URL的什么部分需要编码和解码，什么部分不需要编码和解码，直接整个URL字符串丢进去编码一定会出现意料之外的结果。举个反面列子：

```java
String url = "http://localhost:9090/index?name=张大doge";
String encode = URLEncoder.encode(url, "UTF-8");
System.out.println(encode);
//输出:http%3A%2F%2Flocalhost%3A9090%2Findex%3Fname%3D%E5%BC%A0%E5%A4%A7doge
```

实际上，我们只需要对Path和Path之后的字符进行编码和解码，例如对于URL`http://localhost:9090/index?name=张大doge`，我们需要编码和解码的部分只有index、name和张大doge这三个部分，其他部分应该保持原样。正确的例子如下：

```java
public static void main(String[] args) throws Exception {
	String raw= "http://localhost:9090/index?name=张大doge";
	String base = raw.substring(raw.lastIndexOf("//"));
	String pathLeft = base.substring(base.lastIndexOf("/") + 1);
	String[] array = pathLeft.split("\\?");
	String path = array[0];
	String query = array[1];
	base = raw.substring(0,raw.lastIndexOf(path));
	path = URLEncoder.encode(path, "UTF-8");
	String[] queryResult = query.split("=");
	String queryKey = URLEncoder.encode(queryResult[0], "UTF-8");
	String queryValue = URLEncoder.encode(queryResult[1], "UTF-8");
	System.out.println(base + path + "?" + queryKey + "=" + queryValue);
}
//输出结果：http://localhost:9090/index?name=%E5%BC%A0%E5%A4%A7doge
//其中UTF-8编码中张的十六进制表示为E5 BC A0，大的十六进制编码为E5 A4 A7
```

# 代理(Proxy)

许多系统会通过代理服务器访问Web应用或者其他服务器中的资源，代理服务器接收从本地客户端发出的请求再转发请求到远程服务器，然后远程服务器返回请求的结果到代理服务器，代理服务器接收到结果之后会把结果回传到本地服务器。这样做有两个比较重要的原因：

- 1、安全原因，防止远端的主机了解关于本地网络配置的细节。
- 2、过滤出站请求，限制浏览一些禁用的网站。

在Java中除了TCP连接使用传输层的SOCKET代理，其他应用层代理都不支持。Java对于SOCKET没有提供禁用代理的选项，但是可以通过下面三个系统属性配置来开启和限制代理：

```java
http.proxyHost：代理服务器的主机名，默认不设置此系统属性。
http.proxyPort:代理服务器的端口号，默认不设置此系统属性。
http.noneProxyHosts:不需要代理访问的主机名，多个用竖线|分隔，默认不设置此系统属性。

举个例子：
System.setProperty("http.proxyHost", "localhost");
System.setProperty("http.proxyPort", 1080);
System.setProperty("http.noneProxyHosts", "www.baidu.com|github.com");
```

## Proxy类

java.net.Proxy类提供了对代理服务器更细粒度的控制，也就是说这个类允许在编程的使用使用不同的远程服务器作为代理服务器，而不是通过系统属性全局配置代理。Proxy目前支持三种代理类型，分别是：

- Proxy.Type.DIRECT：直连，也就是不使用代理。
- Proxy.Type.HTTP：HTTP代理。
- Proxy.Type.SOCKS：socket的V4或者V5版本的代理。

使用的时候如下：

```java
SocketAddress socketAddress = new InetSocketAddress("localhost", 80);
Proxy proxy = new Proxy(Proxy.Type.HTTP, socketAddress);
Socket socket = new Socket(proxy);
//...
```

### ProxySelector类

每个运行中的Java虚拟机都会存在一个`java.net.ProxySelector`实例对象，用来确定不同连接使用的代理服务器。默认的`java.net.ProxySelector`的实现是`sun.net.spi.DefaultProxySelector`的实例，它会检查各种系统属性和URL的协议，再决定如果连接到不同的远程代理服务器，当然，开发者也可以继承和实现自定义的`java.net.ProxySelector`，从而可以根据协议、主机、路径日期等其他标准来选择不同的代理服务器。`java.net.ProxySelector`的几个核心的抽象方法如下：

```java
//获取默认的ProxySelector实例
public static ProxySelector getDefault()

//设置默认的ProxySelector实例
public static void setDefault(ProxySelector ps)

//通过URI获取可用的代理列表
public abstract List<Proxy> select(URI uri)

//告知ProxySelector不可用的代理和出现的异常
public abstract void connectFailed(URI uri, SocketAddress sa, IOException ioe)
```

如果需要扩展的话，最好加入缓存的功能，缓存可用的Proxy列表，一旦出现Proxy不可用，通过`connectFailed`进行清理和剔除不可用的代理节点即可。

# 小结

URL和URI是当前的网络世界或者系统中资源的重要标识符，了解它们的基础知识才能更好地进行网络编程。URI是统一资源标识符，它可以表示任何介质中的资源。而URL是统一资源位置，一般特指因特网中的网络资源位置，使用于Http或者Https协议中。很显然，URI可以表示的范围更大，URI实际上是包含了URL。而两者的区别可以参看上面的几个小节。


## 参考文章
* https://www.cnblogs.com/throwable/p/9740425.html