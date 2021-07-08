---
title: IO流输入输出操作
---


::: tip
本文主要是介绍 Java IO 输入输出操作 。
:::

[[toc]]

Java中执行输出和输入操作，需要通过IO流。例如最常见的System.out.println()就是一个输出流。IO流的类比较多，但核心体系就是由File、 InputStream 、OutputStream、Reader、Writer和Serializable(接口)组成的，后续会一一详细说明。

## I/O流基础概念

按照流的方向分为输入流（InputStream）与输出流(OuputStream)：

- 输入流：只能读取数据，不能写入数据。
- 输出流：只能写入数据，不能读取数据。

因为程序是运行在内存中，以内存角度来理解输入输出概念，如下：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/java/file/iobasic-1.png')" alt="wxmp">

可以看到输入与输出是一个相对概念，数据写入文件，对于程序来说是输出流，对文件来说是输入流。**但一般是以程序作为中心，所以从程序写入数据到其他位置，则是输出流，将数据读入程序中则是输入流。**

简单的说就是：**读取数据就是输入流，写入数据就是输出流。**

 

### **按照处理的数据单位分为字节流和字符流**

-  字节流：操作的数据单元是8位的字节。InputStream、OutputStream作为抽象基类。
-  字符流：操作的数据单元是字符。以Writer、Reader作为抽象基类。
-  字节流可以处理所有数据文件，若处理的是纯文本数据，建议使用字符流。

 

### **IO流中的三类数据源**

- 基于磁盘文件：FileInputStream、FileOutputSteam、FileReader、FileWriter
- 基于内存：ByteArrayInputStream ByteArrayOutputStream（ps:字节数组都是在内存中产生）
- 基于网络：SocketInputStream、SocketOutputStream（ps:网络通信时传输数据）

### **根据流的作用可分为节点流和处理流**

节点流：程序直接与数据源连接，和实际的输入/输出节点连接；处理流：对节点流进行包装，扩展原来的功能，由处理流执行IO操作。

处理流的作用和分类：

处理流可以隐藏底层设备上节点流的差异，无需关心数据源的来源，程序只需要通过处理流执行IO操作。处理流以节点流作为构造参数。通常情况下，推荐使用处理流来完成IO操作。

缓冲流：提供一个缓冲区，能够提高输入/输出的执行效率，减少同节点的频繁操作。例如：BufferedInputStream/BufferedOutputStream、BufferedReader/BufferWriter

转换流：将字节流转成字符流。字节流使用范围广，但字符流更方便。例如一个字节流的数据源是纯文本，转成字符流来处理会更好。InputStreamReader/OutputStreamWriter

打印输出流：打印输出指定内容，根据构造参数中的节点流来决定输出到何处。

``` java
PrintStream ：打印输出字节数据。
PrintWriter ： 打印输出文本数据。　
```

附图：JavaIO体系的全体类

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/java/file/iobasic-2.png')" alt="wxmp">

 

## IO流一些简单功能：

### （一）使用字节流读取本地文件



```java
//File对象定位数据源
public static void getContent(File file) throws IOException { 
//创建文件缓冲输入流
file BufferedInputStream bis = new BufferedInputStream(new FileInputStream(file)); 
byte[] buf = new byte[1024];//创建字节数组，存储临时读取的数据 
int len = 0;//记录数据读取的长度
 //循环读取数据
 while((len = bis.read(buf)) != -1) { //长度为-1则读取完毕 
 System.out.println(new String(buf,0,len));    
}
 bis.close(); //关闭流
}
```



【技巧】如果数据源是纯文本数据，使用字符流效率更高。

 

### （二）使用字符处理流读取本地文件内容



``` java
    public static void getContent(String path) throws IOException {
        File f = new File(path); 
        if (f.exists()) { // 判断文件或目录是否存在
            if (f.isFile()) { 
                BufferedReader br = new BufferedReader(new FileReader(path));//该缓冲流有一个readLine()独有方法
                String s = null;
                while ((s = br.readLine()) != null) {//readLine()每次读取一行
                    System.out.println(s);
                }
            }
        }
    }
```



该方法比上一个增加了文件判断，提高了程序的健壮性。使用了BufferedReader处理流来处理纯文本数据，比字节流更加简洁方便。

### （三）使用字符流写入数据到指定文件：



```java
public static void main(String[] args) throws IOException {
        //以标准输入作为扫描来源
        Scanner sc = new Scanner(System.in);
        File f = new File("D:\\reviewIO\\WRITERTest.txt");
        BufferedWriter bw = new BufferedWriter(new FileWriter(f));
        if(!f.exists()) {
            f.createNewFile();
        }
        while(true) {
            String s = sc.nextLine();
            bw.write(s);
            bw.flush();
            if(s.equals("结束") || s.equals("")) {
                System.out.println("写入数据结束！");
                return;
            }
        }
    }
```


 

### （四）使用转换流（InputStreamReader/OutputStreamWriter）

对写入数据进行改进：

``` java
public static void testConvert(File f) throws IOException {
        if(!f.exists()) {
            f.createNewFile();
        }
        //以System.in作为读取的数据源，即从键盘读取
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new FileWriter(f,true)); //允许添加内容，不会清除原有数据源
        String s = null;
        while(!(s = br.readLine()).equals("")) {
            bw.write(s);
            bw.newLine();//空一行
        }
        bw.flush();        
        bw.close();
        br.close();
    } 
```



因为System.in是一个InputStream对象，缓冲字符流无法直接使用，需要通过转换流将字节流转成字符流。然后使用字符输入处理流的readLine()每次读取一行，使用newLine()完成换行。

注意点：通常使用IO流写入文件时，写入的数据总会覆盖原来的数据，这是因为文件输出流默认不允许追加内容，所以需要为FileOuputStream、FileWriter的构造参数boolean append 传入true。

 

### （五）使用字节流完成文件复制



``` java
//字节流实现文件拷贝
    public static String copyFile(String src, String dest) throws IOException, ClassNotFoundException {
        File srcFile = new File(src);//源文件数据源
        File desFile = new File(dest);//写入到目标数据源
        //数据源不存在
        if(!srcFile.exists() || !desFile.exists()) {
            throw new ClassNotFoundException("源文件或者拷贝目标文件地址不存在！");
        }
        //非文件类型
        if(!srcFile.isFile() || !desFile.isFile()) {
            return "源文件或者目标文件不是文件类型!";
        }
        InputStream is = null;
        OutputStream os = null;
        byte[] buf = new byte[1024];//缓存区
        int len = 0;//读取长度
        try {
            is = new BufferedInputStream(new FileInputStream(srcFile));//读取数据源
            os = new BufferedOutputStream(new FileOutputStream(desFile));//写入到数据源            
            while((len = is.read(buf)) != -1) { //读取长度不为-1，继续读取
                os.write(buf); //读取内容之后马上写入目标数据源
            }
            os.flush();//输出
            return "文件拷贝成功！查看拷贝文件路径：" + desFile.getPath();                        
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }finally {
            if(is != null)
                is.close();
            if(os != null)
                os.close();
        }
        return "文件拷贝失败";
    }
```



 

### （六）使用打印流来完成写入数据操作：



``` java
        //输出内容的文件数据源
        File f = new File("D:\\reviewIO\\PW.java");
        PrintWriter pw = new PrintWriter(f);
        //把指定内容打印至数据源中
        pw.println("AAAAAAAAA");
        pw.println("BBBBBBBBB");
        pw.println("CCCCCCCCC");
        pw.flush();
        System.out.println("使用PrintWriter写入数据完成");
        System.out.println("==========读取写入的数据==========");
        BufferedReader br = new BufferedReader(new FileReader(f));
        String s = null;
        StringBuilder sb = new StringBuilder();//一个可变字符串
        while((s = br.readLine()) != null) {
            sb.append(s); //把读取的字符串组合起来
        }
        System.out.println(sb);
        br.close();
        pw.close();
```



一般情况下，若是输出文本数据，建议使用打印流。PrintWriter还可以指定输出文本使用何种字符集、在构造参数中指定是否自动刷新。如果不想覆盖原来的数据，使用该类的append()方法，就会在文件尾部添加内容。

 

### （七）使用打印流来完成文本拷贝：



``` java
    // 使用打印流PrintStream来完成文件拷贝
    public static void copyFile(File src, File dest) throws Exception {
        BufferedInputStream bis = new BufferedInputStream(new FileInputStream(src));
        BufferedOutputStream bos = new BufferedOutputStream(new FileOutputStream(dest));
        PrintStream ps = new PrintStream(bos, true);
        byte[] buf = new byte[1024];
        int len = 0;
        //循环读取数据，然后写入到目标文件
        while ((len = bis.read(buf)) != -1) {
            ps.write(buf);
        }
        ps.close();
        bos.close();
    }
```

打印流实现文件拷贝操作和字节流差不多，除了用到打印流构造函数的不自动刷新。打印流还有一个好处就是无需检查异常。

 
## 参考文章
* https://www.cnblogs.com/fwnboke/p/8529492.html