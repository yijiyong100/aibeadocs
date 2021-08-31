---
title: HDFS-写入流程
---

::: tip
本文主要是介绍 HDFS-写入流程 。
:::

[[toc]]

## 二、HDFS文件读写流程

## HDFS数据流

  作为一个文件系统，文件的读和写是最基本的需求，这一部分我们来了解客户端是如何与HDFS进行交互的，也就是客户端与HDFS，以及构成HDFS的两类节点（namenode和datanode）之间的数据流是怎样的。

------

### 1、剖析文件读取过程

  客户端从HDFS读取文件，其内部的读取过程实际是比较复杂的，可以用下图来表示读取文件的基本流程。

对于客户端来说，首先是调用FileSystem对象的**open()方法来打开希望读取的文件**，然后DFS会返回一个文件输入流FSDataInputStream ，客户端对这个输入流**调用read()方法，读取数据**，一旦完成读取，就对这个输入流**调用close()方法**关闭，这三个过程对应图中的步骤1、3、6。

  以上三个步骤是从客户端的角度来分析的，实际上，要实现文件读取，HDFS内部还需要比较复杂的机制来支持，而**这些过程都是对客户端透明的**，所以客户端感受不到，在客户看来就像是在读取一个连续的流。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ds/hdfs/writeprocedure-1.png')" alt="wxmp">



  具体的，从HDFS的角度来说，客户端调用的FileSystem对象的open()方法，这个FileSystem对象实际上是分布式文件系统DistributedFileSystem的一个实例，DistributedFileSystem通过远程过程调用（RPC）来**调用namenode，以获得文件起始块的位置**（步骤2，namenode返回存有该数据块副本的datanode的地址）。当然，由于HDFS保存了一个数据块的多个副本（默认是3），所以满足请求的datanode地址不止一个，此时会根据它们与客户端的距离来排序，优先选择距离近的datanode，如果该客户端本身就是一个datanode，该客户端就可以从本地读取数据（比如：mapReduce就利用了这里的数据本地化优势）。

  open方法完成后，DistributedFileSystem类返回一个**FSDataInputStream文件输入流对象**给客户端。这个类转而封装为DFSInputStream对象，该对象管理着datanode和namenode的I/O。

  这个DFSInputStream存储着文件起始几个块的datanode地址，因此，客户端对这个输入流调用read()方法就可以知道到哪个datanode（网络拓扑中距离最近的）去读取数据，这样，反复调用read方法就可以将数据从datanode传输到客户端（步骤4）。到达一个块的末端时，会关闭和这个datanode的连接，寻找下一个块的最佳datanode，重复这个过程。

  当然，上面我们说DFSInputStream只存储着文件起始的几个块，在读取过程中，也会根据需要再次询问namenode来获取下一批数据块的datanode地址。一旦客户端读取完成，就调用close方法关闭数据流。

  如果在读取过程中，datanode遇到故障，很明显，输入流只需要从另外一个保存了该数据块副本的最近datanode读取即可，同时记住那个故障datanode，以后避免从那里读取数据。

**总结**：

以上就是HDFS的文件读取过程，从这个过程的分析中我们可以看出其优势在于客户端可以直接连接到datanode进行数据的读取，这样由于数据分散在不同的datanode上，就可以同时为大量并发的客户端提供服务。而namenode作为管理节点，只需要响应数据块位置的请求，告知客户端每个数据块所在的最佳datanode即可（datanode的位置信息存储在内存中，非常高效的可以获取）。这样使得namenode无需进行具体的数据传输任务，否则namenode在客户端数量多的情况下会成为瓶颈。

------

### 2、剖析文件写入过程

  接下来我们分析文件写入的过程，重点考虑的情况是如何新建一个文件、如何将数据写入文件并最后关闭该文件。

  同样的道理，从客户端的角度来说，这个过程是比较简单的，首先通过对DistributedFileSystem对象调用create()方法来新建文件，然后会返回一个FSDataOutputStream的文件输出流对象，由此客户端便可以调用这个输出流的write()方法写入数据，完成写入后，调用close()方法关闭输出流（下图中的步骤1、3、6）。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ds/hdfs/writeprocedure-2.png')" alt="wxmp">



然而，具体的，从HDFS的角度来看，这个写数据的过程就相当复杂了。客户端在调用**create方法**新建文件时，DistributedFileSystem会对namenode创建一个RPC调用，在文件系统的命名空间中新建一个文件，此时还没有相应的数据块（步骤2）。namedata接收到这个RPC调用后，会**进行一系列的检查**，确保这个文件不存在，并且这个客户端有新建文件的权限，然后再通过检查后就会为这个新文件在命名空间中加入一条记录（如果未通过检查则会返回异常），最后给客户端返回一个FSDataOutputStream对象。

  类似于文件读的过程，这个FSDataOutputStream对象转而封装成为一个DFSOutputStream对象，用于处理datanode和namenode之间的I/O。

接下来，客户端就可以调用输出流的write()方法进行数据写入，而在写入时，DFSOutputStream将数据分为一个一个的数据包，先写入内部队列，称为“**数据队列**”。然后有一个单独的DataStreamer来处理数据队列，它的职责是挑**选出适合存储数据副本的一组datanode**，并要求namenode分配新的数据块。假设副本数为3，那么选出来的datanode就是3个，这3个dadanode会构成一个**数据管线**。DataStreamer将数据包流式传输到管线中的第一个datanode，第一个存储并发到第二个，第二个存储并发到第三个（步骤4）。

  然后DFSOutputStream对象内部还有一个数据包队列用于接收datanode的确认回执，称为“**确认队列**”，收到所有datanode的确认消息后，该数据包才会从队列中删除。

  在客户端完成数据的写入后，对数据流调用**close()方法**（步骤6），该操作将剩余的所有数据包写入数据管线，并联系namenode告知文件写入完成之前，等待确认（步骤7）。

------

### 3、一致模型

  HDFS的一致模型描述了文件读、写的数据可见性。

  基于以上对文件读写过程的分析，我们知道新建一个文件之后，它可以在命名空间中立即可见，但是即使数据流已经刷新并存储，写入文件的内容并不保证能立即可见。当写入的数据超过一个数据块后，第一个数据块对新的reader就是可见的，也就是说：当前正在写的块对其他reader不可见。

  HDFS提供了一种将所有缓存刷新到datanode中的方法，即对FSDataOutputStream调用hflush()方法，当hflush方法调用成功后，到目前为止写入的数据都到达了datanode的写入管道并且对所有reader可见。

  但是，hflush()并不保证数据已经都写到磁盘上，为确保数据都写入磁盘，可以使用hsync()操作代替。

  在HDFS中，close方法实际上隐含了执行hflush()方法。

------

### 4、通过distcp并行复制

  当我们想从Hadoop文件系统中复制大量数据或者将大量数据复制到HDFS中时，可以采用Hadoop自带的一个程序distcp，它用来并行复制。

  distcp的一个用法是代替hadoop fs -cp，也可以用来在两个HDFS集群之间传输数据。

```shell
$ hadoop distcp file1 file2
$ hadoop distcp dir1 dir2
$ hadoop distco -update -delete -p hdfs://namenode1/foo hdfs://namenode2/foo
```

### 总结

  以上主要对HDFS文件系统的文件读写进行了详细的介绍，重点是掌握HDFS的文件读写流程，体会这种机制对整个分布式系统性能提升带来的好处。


## 参考文章
* https://www.cnblogs.com/gzshan/p/10985717.html