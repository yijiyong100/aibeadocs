---
title: HDFS-Java接口
---

::: tip
本文主要是介绍 HDFS-Java接口 。
:::

[[toc]]

## HDFS-Java接口实例

Hadoop是用java语言实现的，因此HDFS有很好的java接口用以编程，重点就是Hadoop的FileSystem类，它是所有文件系统的抽象类，HDFS实例（DistributedFileSystem）也是基于它实现的。本部分主要介绍如何通过使用HDFS的java接口来编写程序。

------

### 1、如何运行一个Hadoop程序

  当我们要写一个Hadoop的应用程序时，因为要用到hadoop的第三方依赖包，所以最好的方法是使用maven项目管理工具来构建，可以方便的管理所有第三方jar包。

  完成程序编写后，要在hadoop集群或者我们的伪分布式模式下运行这个作业，那就需要将代码打包成一个jar文件，Hadoop会在集群上发布这个文件，如果我们使用maven构建，那么maven在`mvn install`之后就正好生成了一个可用的jar文件，默认在target目录下。

  假设我们的类名为：URLCat，那么运行以下命令就可以执行程序。

```shell
$ export HADOOP_CLASSPATH=target/URLCat.jar
$ hadoop URLCat [参数]
```

  当然，如果我们不使用maven，那么首先需要下载对应的jar包放到工程目录下，然后在程序编写完成后，先完成编译，然后再手动生成jar包，从而运行程序。

```java
$ javac URLCat.java
$ jar cvf URLCat.jar URLCat.class
$ export HADOOP_CLASSPATH=URLCat.jar
$ hadoop URLCat [参数]
```

### 2、使用java从HDFS读取数据

  要从Hadoop中读取文件，有两种方法：一是使用java.net.URL对象打开数据流，从中读取数据；二是使用FileSystem API来打开一个文件的输入流。方法二更常用一些。

**（1）从URL读取数据**

  这种方法比较简单，但是为了让java程序可以识别hadoop的hdfs URL还需要一些额外的工作：通过FsUrlStreamHandlerFactory实例来调用java.net.URL对象的setURLStreamHandlerFactory方法，另外需要注意的是这个方法每个虚拟机只能调用一次，所以一般使用静态方法。

  在输入流和输出流之间复制数据可以使用简单的IOUtils类。

```java
import java.io.InputStream;
import java.net.URL;
import org.apache.hadoop.fs.FsUrlStreamHandlerFactory;
import org.apache.hadoop.io.IOUtils;

public class URLCat {
  static {  //每个虚拟机只能调用一次
    URL.setURLStreamHandlerFactory(new FsUrlStreamHandlerFactory());
  }
  
  public static void main(String[] args) throws Exception {
    InputStream in = null;
    try {
      in = new URL(args[0]).openStream();
      IOUtils.copyBytes(in, System.out, 4096, false); //后两个参数:缓冲区大小、是否关闭数据流
    } finally {
      IOUtils.closeStream(in);
    }
  }
}
```

**（2）通过FileSystem API读取数据**

  更常用的是，通过FileSystem API来打开一个文件的输入流，Hadoop文件系统中通过Path对象来代表文件，可以将路径视为一个Hadoop文件系统的URI，如：`hdfs://localhost/user/gz.shan/2.txt`.

  FileSystem是一个通用的文件系统API，想要从中读取文件，首先我们需要获取文件系统的实例。比如：想获取本地文件系统的实例，可以通过`FileSystem.getLocal(Configuration conf)`方法。

  这里我们是获取HDFS的实例，可以通过`FileSystem.get(URI uri，Configuration conf)`方法。有了FileSystem实例后，通过调用open方法来获取文件输入流。

```java
import java.io.InputStream;
import java.net.URI;

import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.FileSystem;
import org.apache.hadoop.fs.Path;
import org.apache.hadoop.io.IOUtils;

public class FileSystemCat {

  public static void main(String[] args) throws Exception {
    String uri = args[0];
    Configuration conf = new Configuration();
    FileSystem fs = FileSystem.get(URI.create(uri), conf); //获取文件系统实例
    InputStream in = null;
    try {
      in = fs.open(new Path(uri)); //获取文件输入流
      IOUtils.copyBytes(in, System.out, 4096, false);
    } finally {
      IOUtils.closeStream(in);
    }
  }
}
```

  实际上，这个open方法返回的并不是标准的java.io类对象，而是FSDataInputStream对象（一个继承了java.io.DataInputStream的特殊类）。

  FSDataInputStream最大的好处是支持随机访问，可以从流的任意位置读取数据。

```java
public class FsDataInputStream extends DataInputStream implements Seekable,PositionedReadable{}

public interface Seekable {
    void seek(long pos);
    long getPos();
}

public interface PositionedReadable{
    public int read(long position,byte[] buffer,int offset.int length);
    public void readFully(long position,byte[] buffer,int offset.int length);
    public void readFully(long position,byte[] buffer);
}
```

  Seekable接口支持长文件中找到指定位置，并有一个查询当前位置相对于文件起始偏移量的方法。seek()可以移动到文件中任意一个绝对位置，但是seek是一个相对开销比较高的操作，要谨慎使用，避免大量使用。

  PositionedReadable接口允许从一个指定偏移量处读取文件的一部分，read方法从指定position处读取至多length字节的数据存入到缓冲区buffer的指定偏移量offset处，返回实际读到的字节数。readfull将指定length长度的字节数据读到buffer中，除非已经到文件末尾，则抛出EOFException。

### 3、使用java向HDFS写入数据

  fileSystem有一系列新建文件的方法，最简单的是给准备建的文件指定一个Path对象，然后返回一个用于写入数据的输出流。新建文件使用的是create(Path f)方法，还有一种是在一个已有文件的末尾追加：append(Path f)。

  需要注意的是：create方法还有一个重载方法Progressable用于传递回调接口，从而将数据写入进度通知给应用，这在mapreduce中有广泛的应用。

```java
import java.io.BufferedInputStream;
import java.io.FileInputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.URI;

import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.FileSystem;
import org.apache.hadoop.fs.Path;
import org.apache.hadoop.io.IOUtils;
import org.apache.hadoop.util.Progressable;

public class FileCopyWithProgress {
  public static void main(String[] args) throws Exception {
    String localSrc = args[0];
    String dst = args[1];
    
    InputStream in = new BufferedInputStream(new FileInputStream(localSrc));
    
    Configuration conf = new Configuration();
    FileSystem fs = FileSystem.get(URI.create(dst), conf);
    OutputStream out = fs.create(new Path(dst), new Progressable() {
      public void progress() {
        System.out.print(".");
      }
    });
    
    IOUtils.copyBytes(in, out, 4096, true);
  }
}
```

  同样的，这里的create方法返回的并不是标准的OutputStream，而是FSDataOutputStream对象。不同的是：它只有一个查询文件当前位置的方法，不允许在文件中定位，也就是只允许顺序写入或者末尾追加，不支持其他位置的随意写入。

```java
public class FSDataOutputStream extends DataOutputStream implements syncable{
    public long getPos();
}
```

### 4、文件系统的查询

  除了文件读写以外，任何一个文件系统的重要特征就是提供其目录结构浏览和检索他所在文件和目录相关信息的功能。

**（1）文件元数据：FileStatus**

  FileStatus类封装了文件系统中文件和目录的元数据，包括文件长度、块大小、副本、修改时间、所有者、权限信息等。使用FileSystem的getFileStatus方法可以 获取文件或者目录的FileStatus对象。

```java
public void fileStatusForFile() throws IOException {
    Path file = new Path("/dir/file");
    FileStatus stat = fs.getFileStatus(file);
    assertThat(stat.getPath().toUri().getPath(), is("/dir/file"));
    assertThat(stat.isDirectory(), is(false));
    assertThat(stat.getLen(), is(7L));
    assertThat(stat.getModificationTime(),is(lessThanOrEqualTo(System.currentTimeMillis())));
    assertThat(stat.getReplication(), is((short) 1));
    assertThat(stat.getBlockSize(), is(128 * 1024 * 1024L));
    assertThat(stat.getOwner(), is(System.getProperty("user.name")));
    assertThat(stat.getGroup(), is("supergroup"));
    assertThat(stat.getPermission().toString(), is("rw-r--r--"));
  }
  
  @Test
  public void fileStatusForDirectory() throws IOException {
    Path dir = new Path("/dir");
    FileStatus stat = fs.getFileStatus(dir);
    assertThat(stat.getPath().toUri().getPath(), is("/dir"));
    assertThat(stat.isDirectory(), is(true));
    assertThat(stat.getLen(), is(0L));
    assertThat(stat.getModificationTime(),is(lessThanOrEqualTo(System.currentTimeMillis())));
    assertThat(stat.getReplication(), is((short) 0));
    assertThat(stat.getBlockSize(), is(0L));
    assertThat(stat.getOwner(), is(System.getProperty("user.name")));
    assertThat(stat.getGroup(), is("supergroup"));
    assertThat(stat.getPermission().toString(), is("rwxr-xr-x"));
  }
```

**（2）列出文件：listStatus**

  另外一个有用的功能是列出目录中的，这就是FileSystem的listStatus方法的功能。当参数是一个文件时，会返回数组形式的长度为1的FileStatus对象，当参数是一个目录时，会返回一个数组，包含0个或者多个FileStatus对象，表示此目录中的文件和目录。

  还有一个参数可以用于指定PathFilter来限制匹配的文件和目录。注意：也可以指定一组路径，如果指定一组路径，其执行结果相当于依次轮流传递每条路径并对其调用listStatus方法，返回的结果存入一个数组。

```java
public class ListStatus {
  public static void main(String[] args) throws Exception {
    String uri = args[0];
    Configuration conf = new Configuration();
    FileSystem fs = FileSystem.get(URI.create(uri), conf);
    
    Path[] paths = new Path[args.length];
    for (int i = 0; i < paths.length; i++) {
      paths[i] = new Path(args[i]);
    }
    
    FileStatus[] status = fs.listStatus(paths);
    Path[] listedPaths = FileUtil.stat2Paths(status); //将FileStatus对象数组转为Path数组
    for (Path p : listedPaths) {
      System.out.println(p);
    }
  }
}
```

**（3）文件模式**

  文件模式其实并不难理解，有时我们需要处理一批文件，需要是使用通配符来匹配多个文件，这叫“通配”，也就是我们熟知的正则表达式。文件模式就是用来做通配的。

  HDFS中的通配方法是：globStatus()，使用方法就类似于我们使用的正则表达式，不再赘述。

**（4）PathFilter对象**

  通配符可以完成匹配一批文件，但是有些情况它无法做到：比如排除一个特定的文件。这就需要过滤器，FileSystem的listStatus和globStatus都提供了PathFilter对象参数，可以用来控制通配符，实现一些过滤任务。

```java
//用于排除掉匹配了正则表达式的路径
public class RegexExcludePathFilter implements PathFilter {
  
  private final String regex;
  public RegexExcludePathFilter(String regex) {
    this.regex = regex;
  }
  public boolean accept(Path path) {
    return !path.toString().matches(regex);
  }
}
```

### 5、其他操作

**（1）目录**

  FileSystem提供了创建一个目录的方法：`public boolean mkdirs(Path f)`,创建成功返回true，但是通常情况下我们不需要显示创建目录，因为调用create方法时会自动创建父目录。

**（2）删除数据**

  FileSystem的delete方法可以用于删除文件或者目录：`public boolean delete(Path f,boolean recursive)`，只有当recursive的值为true时，非空目录及其内容才会被删除。

### 总结

  这几篇文章相当于《Hadoop权威指南》的读书笔记。至此，从理论和实践的角度对HDFS有了一个比较清晰的认识，后续再陆续介绍Hadoop生态系统中的其他组件。


## 参考文章
* https://www.cnblogs.com/gzshan/p/11064407.html