---
title: MapReduce-基础介绍
---

::: tip
本文主要是介绍 MapReduce-基础知识 。
:::

[[toc]]

## MapReduce简介


### MapReduce定义：

MapReduce是一种可用于数据处理的编程框架。MapReduce采用"分而治之"的思想，把对大规模数据集的操作，分发给一个主节点管理下的各个分节点共同完成，然后通过整合各个节点的中间结果，得到最终结果。简单地说，MapReduce就是"任务的分解与结果的汇总"。

在分布式计算中，MapReduce框架负责处理了并行编程中分布式存储、工作调度、负载均衡、容错均衡、容错处理以及网络通信等复杂问题，把处理过程高度抽象为两个函数：map和reduce，map负责把任务分解成多个任务，reduce负责把分解后多任务处理的结果汇总起来。

### MapReduce适用的问题：

用MapReduce来处理的数据集（或任务）必须具备这样的特点：待处理的数据集可以分解成许多小的数据集，而且每一个小数据集都可以完全并行地进行处理。

### MapReduce框架中的名词解释：

#### split:

------

分片是指MapReduce框架将数据源根据一定的规则将源数据分成若干个小数据的过程；其中，一个小数据集，也被称为一个分片。

#### Map:

------

Map有两层含义：

- 其一、是指MapReduce框架中的Map过程，即将一个分片根据用户定义的Map逻辑处理后，经由MapReduce框架处理，形成输出结果，供后续Reduce过程使用；
- 其二，是指用户定义Java程序实现Mapper类的map接口的用户自定义逻辑，此时通常被称为mapper。

#### Reduce:

------

Reduce也有两层含义：

- 其一，是指MapReduce框架中的Reduce过程，即将Map的结果作为输入，根据用户定义的Reduce逻辑，将结果处理并汇总，输出最后的结果；
- 其二，是指用户定义Java程序实现Reducer类的reduce接口的用户自定义逻辑，此时通常被称为reducer。

#### Combine:

------

Combine是一个可由用户自定的过程，类似于Map和Reduce，MapReduce框架会在Map和Reduce过程中间调用Combine逻辑（会在下面章节中仔细讲解），通常Combine和reduce的用户代码是一样的(也可被称为本地的reduce过程)，但是请注意并不是所有用MapReduce框架实现的算法都适合增加Combine过程（比如求平均值）。

#### Partition:

------

在MapReduce框架中一个split对应一个map，一个partiton对应一个reduce(无partition指定时，由用户配置项指定，默认为1个）。 reduce的个数决定了输出文件的个数。比如，在需求中，数据是从对每个省汇总而成，要求计算结果按照省来存放，则需要根据源数据中的表明省的字段分区，用户自定义partition类，进行分区。

### MapReduce的原理:

#### wordcount:

------

wordcount是最简单也是最能体现MapReduce思想的程序之一，可以称为MapReduce版"Hello World"，该程序的完整代码可以在Hadoop安装包的"src/examples"目录下找到。单词计数主要完成功能是：统计一系列文本文件中每个单词出现的次数，即简单如下图所示：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dp/mr/intro-1.png')" alt="wxmp">

由于是示例，这里不涉及分区，更复杂的情况会在shuffle过程中仔细讨论。故这里n个split分别对应n个map，reduce数为1。

##### java代码：

``` java
package org.apache.hadoop.examples;
import java.io.IOException;
import java.util.StringTokenizer;
import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.Path;
import org.apache.hadoop.io.IntWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Job;
import org.apache.hadoop.mapreduce.Mapper;
import org.apache.hadoop.mapreduce.Reducer;
import org.apache.hadoop.mapreduce.lib.input.FileInputFormat;
import org.apache.hadoop.mapreduce.lib.output.FileOutputFormat;
import org.apache.hadoop.util.GenericOptionsParser;

public class WordCount {
public static class TokenizerMapper extends
        Mapper<Object, Text, Text, IntWritable> {
    private final static IntWritable one = new IntWritable(1);
    private Text word = new Text();
    public void map(Object key, Text value, Context context)
            throws IOException, InterruptedException {
        StringTokenizer itr = new StringTokenizer(value.toString());
        while (itr.hasMoreTokens()) {
            word.set(itr.nextToken());
            context.write(word, one);
        }
    }
}

public static class IntSumReducer extends
        Reducer<Text, IntWritable, Text, IntWritable> {
    private IntWritable result = new IntWritable();
    public void reduce(Text key, Iterable<IntWritable> values,
            Context context) throws IOException, InterruptedException{
        int sum = 0;
        for (IntWritable val : values) {
            sum += val.get();
        }
        result.set(sum);
        context.write(key, result);
    }
}

public static void main(String[] args) throws Exception {
    Configuration conf = new Configuration();
    conf.set("mapred.job.tracker", "10.1.69.179:9001");
    String[] ars = new String[] { "input", "newout" };
    String[] otherArgs = new GenericOptionsParser(conf, ars)
            .getRemainingArgs();
    if (otherArgs.length != 2) {
        System.err.println("Usage: wordcount  ");
        System.exit(2);
    }
    Job job = new Job(conf, "word count");
    job.setJarByClass(WordCount.class);
    job.setMapperClass(TokenizerMapper.class);
    job.setCombinerClass(IntSumReducer.class);
    job.setReducerClass(IntSumReducer.class);
    job.setOutputKeyClass(Text.class);
    job.setOutputValueClass(IntWritable.class);
    FileInputFormat.addInputPath(job, new Path(otherArgs[0]));
    FileOutputFormat.setOutputPath(job, new Path(otherArgs[1]));
    System.exit(job.waitForCompletion(true) ? 0 : 1);
	}
}
```

上述就是WordCount的用户代码和流程图。由于MapReduce作为一个分布式的框架，肯定有其用户定义的约束和规范，那么对于一个简单的MapReduce作业，用户需要定义Map和Reduce过程，在代码层级，就是继承Maper类实现map函数和继承Reducer类实现Reduce函数，用户分别在这两个方法中实现具体的计算逻辑。

##### wordcount流程概述：

下面结合代码和流程图，描述一下wordcount项目在MapReduce计算框架下的处理流程：

- 1. 首先，通过job.waitForCompletion(true)开启了WordCount这个MapReduce作业，后续通过InputFormat的实现类FileInputFormat将输入数据，即输入文件，分片从而得到Map方法，即Map用户定义的方法的输入，即图中所示，FileInputFormat将文件按照行分割，并组织成为的形式，成为用户Map方法的输入，其中Key是字符的偏移量，value即一行的内容。
- 2. 而后，数据被输入到用户定义的map方法中，map方法以文件中的每行数据作为输入，将每行按照空格分词，并将每个词组织为K-V对，输出；
- 3. Map的输出交予了MapReduce框架来进行处理，简单来说MapReduce框架将这些K-V对依照key的字典顺序由小到大排列，并对相同的key的value进行合并为数组list，输出给combine过程【其中的详细过程会在讲解shuffle过程时仔细讨论】；
- 4. 将map方法的输出结果根据Key排序完成之后，如果有combine过程被定义这时候MapReduce框架就会调用Combine过程。Combine过程是由用户指定的，必须的过程，一般Combine过程在逻辑上就是Reduce过程，map的输出结果需要通过网络传递给reduce，其作用是减少Map的输出的结果集的大小，从而降低网络的开销。用户通过job.setCombinerClass(IntSumReducer.class)指定Combine的实现类；Combine其实就是在Map端先执行一次用户的reduce方法，先在中间进行一次计算，从而将结果集减少；但是需要注意的是，并不是所有的算法都适用进行多次reduce计算，请谨慎选择；
- 5. 然后，多个map的结果，汇集到reduce，由于WordCount就开启了一个reduce，故只有一个reduce接收所有map端的输出；在输入到用户定义的reduce方法之前，MapReduce框架还会进行一步排序操作，这步操作类似于在map端进行的排序，将相同key的value合并为list，不同的是排序的输入，是来自于多个Map的输出，是根据key排序的K-V对数据；
- 6. 经过排序后的K-ValueList对，被输入到的Reduce方法，在WordCount的reduce方法中，它对每个key对应的value的list进行求和，从而获得每个单词的总的出现次数。

以上就是WordCount的概要的计算流程，后面的小节中将对一个MapReduce作业的工作机制，进行详细的描述，并针对shuffle过程对MapReduce的计算过程进行更加深入的讨论，设计到多分区的数据的计算的情况，展现真正的大数据量情况下Map和Reduce之间的计算流程和协同工作。

### MapReduce的工作机制

#### 相关名词解释：

------

##### jvm

JVM即Java Virtual Machine（Java虚拟机）的缩写，是一个Java用户程序进程的运行环境。

##### Client

Client（客户端）：编写MapReduce代码，配置作业，提交作业

##### JobTracker

JobTracker用于协调作业的运行。是一个Java应用程序，其主类是JobTracker。JobTracker是运行在Master节点的Java进程。Hadoop集群是一个采用主从方式的分布式处理系统，其中我们称主节点，即负责监控、管理从节点的节点为Master节点。而Jobtracker正是，管理、监控MapReduce作业运行的Java进程，故部署于Master节点之上。

##### TaskTracker

TaskTracker即为运行于从节点之上，真正执行划分后的任务的Java进程，主类是TaskTracker。

##### HDFS

Hdfs是的Hadoop系统中除了MapReduce外，另一个重要的组成部分，Hdfs是一套分布式的逻辑概念上的文件系统，也是主从模式，Master节点称为NameNode，Slave节点称为DataNode，内部将数据分散、冗余的存储在各个DataNode，由NameNode统一管理，对外呈现一个完整的屏蔽物理存储的逻辑文件系统。

#### MapReduce 1工作原理详述：

------

MapReduce工作机制详述：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dp/mr/intro-2.png')" alt="wxmp">

- 1. 用户代码通过job.waitForCompletion(true)开启了该MapReduce作业的执行，创建JobClient类对象，调用submitJob()函数；submitJob()函数完成了如下操作：
- 2. 通过New JobId() 函数向JobTracker获取作业Id,
   JobClient对MapReduce作业的相关信息进行检查和计算：检查输出路径是否存在，若存在则抛出异常，跳出终止作业；计算作业的输入分片，如果分片无法计算，则报错退出程序，例如输入路径不存在等；
- 3. 将运行作业所需资源（包括JAR包，作业配置，计算所得的分片信息），发送到Hdfs上的公共目录中；
- 4. 告知JobTracker作业准备就绪，向JobTracker提交作业；至此完成了submitJob()函数所有的工作。
   **提交作业后，waitForCompletion()每秒轮询作业的进度，如果发现自上次报告后有改变，便把进度报告到控制台。作业完成后，如果成功就显示作业计数器；如果失败则导致作业失败的错误被记录到控制台。**
- 5. JobTracker接收到submitJob()的请求，初始化作业，创建JobInProgress对象来跟踪和调度这个作业，并将JobInProgress对象加入作业调度队列；
- 6. JobTracker从HDFS中获取作业的分片信息，根据分片的个数创建对应的TaskInProgress对象监控和调度Map任务，并根据分区的个数或者是用户指定的数目（缺省为1），创建TaskInProgress对象监控和调度Reduce任务；
- 7. Map/Reduce任务的分配：
   Tasktracker作为MapReduce框架中的Slave节点，会通过一个简单的循环定时（可配置，缺省为10秒）通过RPC向JobTracker发送心跳，以便使JobTracker知晓TaskTracker是否存活，同时充当JobTracker与TaskTracker之间的通信通道；TaskTracker在发送的心跳同时，会告知JobTracker自己是否准备好运行新的任务，JobTracker将其组建为可运行任务的列表，供Map/Reduce任务使用。在向TaskTracker分配任务之前，JobTracker会根据**作业调度（默认方法是维护一个作业优先级列表）**的算法，首先选定一个要执行的作业，而后对作业的任务进行分配。对于Map和Reduce任务，每一个TaskTracker都有一定数量的限制，被称为任务槽位，例如，一个TaskTracker只能同时运行两个Map作业和两个Reduce作业，这个个数受到TaskTracker所在的机器的Cpu和内存的限制；其次，对于任务槽的分配，会先对Map任务进行分配，然后再对Reduce任务进行分配，原因很明显，由于Map任务是首先执行的，一个作业中，只有执行完了Map任务，才能执行Reduce任务。对于Map任务的分配，为了减少网络的延迟和消耗，JobTracker对于Map任务的分配采取**数据本地化和机架本地化原则**，尽量使Map任务所在的机器与该Map任务输入的分片数据所在的物理存储处于最近的网络位置；而对于Reduce任务则没有必要做这种考虑，由于Reduce的输入数据来源于Map任务的输出，而Map会将结果数据保存在本地的磁盘上，由Reduce任务从相应的Map任务所在的机器上拉去，故无法避免网络延迟，故对Reduce任务分配 ，即是取可运行列表第一个即可。
- 8. TaskTracker通过心跳通信，获得了一个任务，将作业的JAR包和配置，从Hdfs共享目录中复制到本地文件系统，在本地创建临时工作目录，将JAR包解压到临时工作目录中；
- 9. TaskTracker创建TaskInProgress对象监控和调度Map/Reduce任务。TaskInproress会创建TaskRunner，从而启动真正运行JAR包程序的子进程Child。
- 10. Child子进程会加载JAR包执行Map/Reduce任务，开始任务的执行。至此一个MapReduce作业完成了从提交、分配、执行的过程，但是在执行过程中，还涉及到一个重要的问题即作业的进度和状态是如何更新的呢？下面我们将详细讲解。
    **除了map任务和reduce任务，还会创建两个任务：作业创建和作业清理。这两个任务在TaskTracker中执行，在map任务运行之前来创建任务，在所有reduce任务完成之后完成清理工作，作业创建任务为作业创建输出路径和临时工作空间，作业清理清除作业运行过程中的临时目录。**

#### MapReduce作业状态和进度的更新

##### 状态和进度的定义

MapReduce作业是一个时间运行的批量作业，运行时间范围从数秒到数小时。这是一个很长的时间段，对于用户而言，能够得知作业的进展是很重要的。一个作业和它的每个任务都有一个状态，包括：作业或任务的状态（比如，运行状态、成功完成，失败状态等）、作业计数器的值、状态消息等。这些状态是如何在作业执行期间不断改变，他们是如何与客户端通信的呢？

一个Mapreduce作业在运行时，对其进度（即任务完成的百分比）要要保持追踪，在MapReduce框架中是如何定义进度的呢？对于Map任务而言，任务进度就是已处理的输入所占的比例；而对于Reduce任务就稍微复杂一些。Reduce的整个过程一般分为三个部分，与shuffle（后面详细介绍）的三个阶段相对应，即复制、排序和Reducer计算。MapReduce定义这三个阶段各占1/3，故例若已经执行的reducer计算一半的输入了，那么整个Reduce任务就执行了5/6了（1/3 + 1/3 + 1/6）。

##### 作业状态和进度更新

Map/Reduce任务中，也有一组计数器，负责对任务运行过程中的各个事件进行计数，这些计数器要么负责内置框架中，例如已写入的map输入记录数，要么由用户自己定义。

如果任务报告了进度，便会设置一个标志以表明状态变化将被发送到tasktracker。有一个独立的线程每隔3秒检查一次此标志，如果已设置，则告知tasktracker当前任务状态。同时，tasktracker每隔5秒发送“心跳”到JobTracker，并且由tasktracker运行的所有任务的状态都会在调用中被发送至JobTracker。

JobTracker将这些更新合并起来，产生一个表明所有运行作业及其所含任务状态的全视图。JobClient通过getJobStatus()方法每秒查询JobTracker来接收最新状态。

客户端通过使用JobClient的getJob()方法来得到一个RunningJob的实例，包含了作业的所有状态信息。

##### MapReduce子任务失败

- 用户代码抛出异常
  一般最常见的是用户代码抛出运行时异常导致失败。如果发生这种情况，子任务JVM进程，即Child进程，会在退出前向其父进程TaskTracker发送错误报告，错误报告将会被记录在用户日志当中。TaskTracker会将此次task attempt（MapReduce中将一次Map/Reduce任务的执行成为task attempt）标记为failed，并释放该任务的槽位运行其他任务。
- JVM突然退出
  子进程JVM突然退出，可能由于JVM bug而导致MapReduce用户代码造成的某些特殊原因造成JVM退出。在这种情况下，TaskTracker会注意到进程已退出，并将此次尝试标志位failed。
- 子进程挂起
  一旦TaskTracker注意到已经有一段时间没有收到进度更新，便会将任务标记为failed。在此之后，JVM子进程将会被自动杀死，任务超时时间是可配置的（mapred.task.timeout）。
- 任务被终止
  由于**推测执行机制**（后续介绍），任务的推测副本中有一个成功执行时，其他的副本将会被中止执行，并kill掉。JobTracker得知一个task attempt失败后（通过与TaskTracker心跳通信得知），将重新调度该任务的执行。JobTracker会尝试避免重新调度失败过的TaskTracker上的任务。此外，失败重试是有次数的限制，这个值是可以配置的，如果有任务的失败次数大于重试的限制，则会被标志为failed。
  在默认的情况下，一个MapReduce作业的任何一个子任务失败，都会导致整个作业被标记为失败，并退出。但是，对于一些应用程序，我们不希望一旦由上述的几个任务失败就中止运行整个作业，应为即是有任务失败，作业的一些结果可能还是可用的。在这种情况下，可以为作业设置在不触发作业失败的情况下允许失败的最大百分比。

##### TaskTracker失败

如果一个TaskTracker由于崩溃或者是运行过缓而失败，他将停止或者是很少发送“心跳”。JobTracker会注意到已经停止发送“心跳”的TaskTracker，并将它从等待任务调度的TaskTracker的列表中移除，并且重新调度任何在其上执行中的任务。

##### JobTracker失败

由于本文档中所讨论的hadoop是Master单点架构的，所以一旦JobTracker宕掉了，只能手动重启了。

##### 推测执行

MapReduce模型将作业分解成任务，然后并行执行各个任务以使整体作业的完成时间少于每个任务顺序执行的时间。这使得整个作业对于个别执行缓慢的任务很敏感，因为一个任务执行缓慢会使整个任务的实行时间增长，即”拖后腿“。

推测执行的策略就是在一个作业的所有任务启动之后，针对那些已经运行了一段时间的任务且该任务比其他任务的平均进度都要慢的任务，则会启动一个相同的任务作为备份，这就是”推测执行“。当其中任何副本任务成功执行时，其他的备份任务都会被中止，杀掉。

推测执行只是一种优化措施，并不能使作业运行的更加可靠。更应该查找并修复软件缺陷，是任务不会运行速度过慢。

#### Shuffle过程剖析

Shuffle描述着将mapper的输出作为输入传递给reducer的过程（注意不是reduce，是用户代码reducer），如图所示：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dp/mr/intro-3.png')" alt="wxmp">

在Hadoop这样的集群环境中，大部分map task与reduce task的执行是在不同的节点上。当然很多情况下Reduce执行时需要跨节点去拉取其它节点上的map task结果。如果集群正在运行的job有很多，那么task的正常执行对集群内部的网络资源消耗会很严重。这种网络消耗是正常的，我们不能限制，能做的就是最大化地减少不必要的消耗。还有在节点内，相比于内存，磁盘IO对job完成时间的影响也是可观的。从最基本的要求来说，我们对Shuffle过程的期望可以有：

- 完整地从map task端拉取数据到reduce端。
- 在跨节点拉取数据时，尽可能地减少对带宽的不必要消耗。
- 减少磁盘IO对task执行的影响。

##### map任务端

整个流程可以分为四步。简单些可以这样说，每个map task都有一个内存缓冲区，存储着map的输出结果，当缓冲区快满的时候需要将缓冲区的数据以一个临时文件的方式存放到磁盘，当整个map task结束后再对磁盘中这个map task产生的所有临时文件做合并，生成最终的正式输出文件，然后等待reduce task来拉数据。

- 1. 每个map任务都有一个环形内存缓冲区，用于缓存mapper函数的输出，其中缓冲区的大小可通过配置io.sort.mb来进行调整，一旦缓冲区中数据到达某一个阈值（io.sort.spill.prcent，默认80%），一个后台线程便被触发，锁定这80%的内存，将它们溢写（spill）到磁盘中。在写磁盘的过程中，mapper函数的输出会继续写入余下20%的内存缓冲区中，溢写和mapper输出互不影响，如果在此期间内存缓冲区被填满，map操作会被阻塞直到写磁盘过程完成。
- 2. 守护线程被触发，将从内存中溢出的数据刷写到磁盘时，经过如下几个过程：
   - 排序
     如图中所示的情况，输入分片，含有分区，在刷写到磁盘时，进行二元排序：首先按照分区值由小到大排序、而后按照key值进行字典序排序。
   - Combine
     如果用户代码中指定了combiner，则combiner就会在输出文件写到磁盘之前、二元排序之后运行。运行combiner的意义在于使map的输出更紧凑，减少溢写到磁盘的数据量，使得写到本地磁盘和传送给reducer的数据更少。
   - 合并
     一旦内存缓冲区达到溢写的阈值，就会新建一个溢出写文件（spill files），一次spill操作就会产生一个溢写文件，因此在map任务完成最后一条输出记录之后，可能会有几个溢出写文件。合并是将多个溢写文件合并到一个文件，所以可能也有相同的key存在，在这个过程中如果client设置过Combiner，也会使用Combiner来合并相同的key。 在任务完成之前，溢出写文件就被合并成一个按照分区、key排序并在排序后经过combiner过程的输出文件。

即combnier过程在内存溢写到磁盘和合并磁盘溢写文件的最后都会发生。

##### reduce任务端

- 复制阶段
  Reduce端，有一个线程会定期向JobTracker询问自己所需要的分片数据的map任务是否完成，直到获取到map的网络位置后，由多个复制线程从map任务所在机器的磁盘拉去相应的数据
- 排序阶段
  这里的merge如map端的merge动作，只是数组中存放的是不同map端copy来的数值。Copy过来的数据会先放入内存缓冲区中，但是当缓冲区中的数据超过阈值，则会触发排序。这里需要强调的是，merge有三种形式：1)内存到内存 2)内存到磁盘 3)磁盘到磁盘。默认情况下第一种形式不启用，当内存中的数据量到达一定阈值，就启动内存到磁盘的merge。与map 端类似，这也是溢写的过程，这个过程中如果你设置有Combiner，也是会启用的，然后在磁盘中生成了众多的溢写文件。第二种merge方式一直在运行，直到没有map端的数据时才结束，然后启动第三种磁盘到磁盘的merge方式生成最终的那个文件，将输入的key有序数据按照key排序排序，并将相同key的value合并为list。
- Reducer阶段
  排序阶段的最后一次合并会作为reducer阶段的输入直接输出到reducer阶段，而后已排序输入中的每一个key都要调用reducer函数，此阶段的输出直接写到输出的文件系统，一般为HDFS。

## 参考文章
* https://www.cnblogs.com/LeonNew/p/5486120.html