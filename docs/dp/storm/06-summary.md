---
title: Storm-综合精华总结
---

::: tip
本文主要是介绍 Storm-综合精华总结 。
:::

[[toc]]

## **Storm介绍及原理**

## 一、**概述**

  Storm是一个开源的分布式实时计算系统，可以简单、可靠的处理大量的数据流。

  Storm有很多使用场景：如实时分析，在线机器学习，持续计算，分布式RPC，ETL等等。

  Storm支持水平扩展，具有高容错性，保证每个消息都会得到处理，而且处理速度很快(在一个小集群中，每个结点每秒可以处理数以百万计的消息)。

  Storm的部署和[运维](https://cloud.tencent.com/solution/operation?from=10680)都很便捷，而且更为重要的是可以使用任意编程语言来开发应用。

## 二、**组件**

### 1、**结构**

  storm结构称为topology(拓扑)，由stream(数据流)、spout(数据流的生成者)、bolt(数据流运算者)组成。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dp/storm/sum-1.png')" alt="wxmp">

下图为官网提供的模型：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dp/storm/sum-2.png')" alt="wxmp">

  不同于Hadoop中的job，Storm中的topology会一直运行下去，除非进程被杀死或取消部署。

### 2、**Stream**

  Storm的核心数据结构是tuple(元组)，本质上是包含了一个或多个键值对的列表。Stream是由无限个的tuple组成的序列。

### 3、**spout**

  spout连接数据源，将数据转化为tuple，并将tuple作为数据流进行发射。开发一个spout的主要工作就是利用API编写代码从数据源消费数据流。

  spout的数据源可以有很多种来源：

  web或者移动程序的点击流、社交网络的信息、传感器收集到的数据、应用程序产生的日志信息。

  spout通常只负责转换数据、发射数据，不会用于处理业务逻辑，防止与业务产生耦合，从而可以很方便的实现spout的复用。

### 4、**bolt**

  bolt主要负责数据的运算。将接收到的数据实施运算后，选择性的输出一个或多个数据流。

  一个bolt可以接收多个由spout或其他bolt发射的数据流，从而可以组建出复杂的数据转换和处理的网络拓扑结构。

  bolt常见的典型功能：

  过滤、连接、聚合、计算和[数据库](https://cloud.tencent.com/solution/database?from=10680)的读写。

## 三、**入门案例**

### 1、**案例结构**

  案例：Word Count案例

  语句Spout-->语句分隔Bolt-->单词计数Bolt-->上报Bolt。

### 2、**代码实现**

#### 1．**语句生成Spout**

  SentenceSpout

  作为入门案例，可以直接从一个数组中不断读取语句，作为数据来源。

  SentenceSpout不断读取语句将其作为数据来源，组装成单值tuple（键名sentence，键值为字符串格式的语句）向后发射。

```java
  {"sentence":"i am so shuai!"}
```

  代码：

```java
/**
 * BaseRichSpout类是ISpout接口和IComponent接口的一个简便的实现。采用了适配器模式，对用不到的方法提供了默认实现。
 */
public class SentenceSpout extends BaseRichSpout {

	private SpoutOutputCollector collector = null;
	private String[] sentencer = { 
			"i am so shuai", 
			"do you look me", 
			"you can see me", 
			"i am so shuai",
			"do you bilive" 
			};
	private int index = 0;

	/**
	 * ISpout接口中定义的方法 所有Spout组件在初始化时都会调用这个方法。 map 包含了Storm配置信息 context
	 * 提供了topology中的组件信息 collector 提供了发射tuple的方法
	 */
	@Override
	public void open(Map conf, TopologyContext context, SpoutOutputCollector collector) {
		this.collector = collector;
	}

	/**
	 * 覆盖自BaseRichSpout中的方法 核心方法 Storm通过调用此方法向发射tuple
	 */
	@Override
	public void nextTuple() {
		this.collector.emit(new Values(sentencer[index]));
		index = (index + 1 >= sentencer.length ? 0 : index + 1);
		Utils.sleep(1000);
	}

	/**
	 * IComponent接口中定义的方法 所有的Storm组件(spout、bolt)都要实现此接口。
	 * 此方法告诉Storm当前组件会发射哪些数据流，每个数据流中的tuple中包含哪些字段。
	 */
	@Override
	public void declareOutputFields(OutputFieldsDeclarer declarer) {
		declarer.declare(new Fields("sentence"));
	}
}
```

#### 2．**语句分隔Bolt**

  SplitSenetenceBolt

  语句分隔Bolt订阅SentenceSpout发射的tuple，每接收到一个tuple就获取"sentence"对应的值，然后将得到的语句按照空格切分为一个个单词。然后将每个单词向后发射一个tuple。

```java
{"word":"I"}
{"word":"am"}
{"word":"so"}
{"word":"shuai"}
```

  代码：

```java
/**
 * BaseRichBolt 是IComponent 和 IBolt接口的一个简单实现。采用了适配器模式，对用不到的方法提供了默认实现。
 */
public class SplitSenetenceBolt extends BaseRichBolt {

	private OutputCollector collector = null;

	/**
	 * 定义在IBolt中的方法 在bolt初始化时调用，用来初始化bolt stormConf 包含了Storm配置信息 context
	 * 提供了topology中的组件信息 collector 提供了发射tuple的方法
	 */
	@Override
	public void prepare(Map stormConf, TopologyContext context, OutputCollector collector) {
		this.collector = collector;
	}

	/**
	 * 覆盖自BaseRichBolt中的方法 核心方法 Storm通过调用此方法向发射tuple
	 */
	@Override
	public void execute(Tuple input) {
		String centence = input.getStringByField("sentence");
		String[] words = centence.split(" ");
		for (String word : words) {
			collector.emit(new Values(word));
		}
	}

	/**
	 * IComponent接口中定义的方法 所有的Storm组件(spout、bolt)都要实现此接口。
	 * 此方法告诉Storm当前组件会发射哪些数据流，每个数据流中的tuple中包含哪些字段。
	 */
	@Override
	public void declareOutputFields(OutputFieldsDeclarer declarer) {
		declarer.declare(new Fields("word"));
	}
}
```

#### 3．**单词计数Bolt**

  WordCountBolt

  单词计数Bolt订阅SplitSentenceBolt的输出，保存每个特定单词出现次数，当接收到一个新的tuple，会将对应单词计数加一，并向后发送该单词的当前计数。

```java
{"word":"I","count":3}
```

  代码：

```java
public class WordCountBolt extends BaseRichBolt {

	private OutputCollector collector = null;
	private Map<String, Integer> counts = null;

	/**
	 * 注意: 所有的序列化操作最好都在prepare方法中进行 原因:
	 * Storm在工作时会将所有的bolt和spout组件先进行序列化，然后发送到集群中，
     * 如果在序列化之前创建过任何无法序列化的对象都会造成序列化时抛出NotSerializableException。
	 * 此处的HashMap本身是可以序列化的所以不会有这个问题，但是有必要养成这样的习惯 。
	 */
	@Override
	public void prepare(Map stormConf, TopologyContext context, OutputCollector collector) {
		this.collector = collector;
		this.counts = new HashMap<>();
	}

	@Override
	public void execute(Tuple input) {
		String word = input.getStringByField("word");
		counts.put(word, counts.containsKey(word) ? counts.get(word) + 1 : 1);
		this.collector.emit(new Values(word, counts.get(word)));
	}

	@Override
	public void declareOutputFields(OutputFieldsDeclarer declarer) {
		declarer.declare(new Fields("word", "count"));
	}
}
```

#### 4．**上报Bolt**

  ReportBolt

  上报Bolt订阅WordCountBolt类的输出，内部维护一份所有单词的对应计数的表，当接收到一个tuple时，上报Bolt会更新表中的计数数据，并将值打印到终端。

```java
/**
 * 此Bolt处于数据流的末端，所以只接受tuple而不发射任何数据流。
 */
public class ReportBolt extends BaseRichBolt {

	private Map<String, Integer> counts = null;

	@Override
	public void prepare(Map stormConf, TopologyContext context, OutputCollector collector) {
		this.counts = new HashMap<>();
	}

	@Override
	public void execute(Tuple input) {
		String word = input.getStringByField("word");
		Integer count = input.getIntegerByField("count");
		counts.put(word, count);
	}

	/**
	 * Storm会在终止一个Bolt之前调用此方法。
	 *  此方法通常用来在Bolt退出之前释放资源。
	 *   此处我们用来输出统计结果到控制台。
	 * 注意：
	 * 真正集群环境下，cleanup()方法是不可靠的，不能保证一定执行，后续会讨论。
	 */
	@Override
	public void cleanup() {
		List<String> keys = new ArrayList<>();
		keys.addAll(counts.keySet());
		Collections.sort(keys);
		for (String key : keys) {
			Integer count = counts.get(key);
			System.err.println("--" + key + "发生了变化----数量为" + count + "--");
		}
	}

	@Override
	public void declareOutputFields(OutputFieldsDeclarer declarer) {
		// 处于流末端的tuple，没有任何输出数据流，所以此方法为空
	}
}
```

#### 5．**单词计数Topology**

  通过main方法组装处理流程。此处我们使用单机模式来测试。

```java
public class WCDirver {
	public static void main(String[] args) throws Exception {
		// --实例化Spout和Bolt
		SentenceSpout sentenceSpout = new SentenceSpout();
		SplitSenetenceBolt splitSenetenceBolt = new SplitSenetenceBolt();
		WordCountBolt wordCountBolt = new WordCountBolt();
		ReportBolt reportBolt = new ReportBolt();
		// --创建TopologyBuilder类实例
		TopologyBuilder builder = new TopologyBuilder();
		// --注册SentenceSpout
		builder.setSpout("sentence_spout", sentenceSpout);
		// --注册SplitSentenceBolt，订阅SentenceSpout发送的tuple.
		// 此处使用了shuffleGrouping方法，
		// 此方法指定所有的tuple随机均匀的分发给SplitSentenceBolt的实例。
		builder.setBolt("split_senetence_bolt", splitSenetenceBolt).shuffleGrouping("sentence_spout");
		// --注册WordCountBolt,，订阅SplitSentenceBolt发送的tuple
		// 此处使用了filedsGrouping方法，
		// 此方法可以将指定名称的tuple路由到同一个WordCountBolt实例中
		builder.setBolt("word_count_bolt", wordCountBolt).fieldsGrouping("split_senetence_bolt", new Fields("word"));
		// --注册ReprotBolt，订阅WordCountBolt发送的tuple
		// 此处使用了globalGrouping方法，表示所有的tuple都路由到唯一的ReprotBolt实例中
		builder.setBolt("report_bolt", reportBolt).globalGrouping("word_count_bolt");
		//--创建配置对象
		Config config = new Config();
		//--创建代表集群的对象，LocalCluster表示在本地开发环境来模拟一个完整的Storm集群
		//本地模式是开发和测试的简单方式，省去了在分布式集群中反复部署的开销
		//另外可以执行断点调试非常的便捷
		LocalCluster cluster = new LocalCluster();
		//--提交Topology给集群运行
		cluster.submitTopology("Wc_Topology", config, builder.createTopology());
		//--运行10秒钟后杀死Topology关闭集群
		Thread.sleep(10 * 1000);
		cluster.killTopology("Wc_Topology");
		cluster.shutdown();
	}
}
```

## 四、**并发机制**

### 1、**并发级别**

  Storm集群中的topology在如下的四个级别中存在并发：

#### 1．**Nodes**

  服务器：配置在Storm集群中的一个服务器，会执行Topology的一部分运算，一个Storm集群中包含一个或者多个Node。

#### 2．**Workers**

  JVM虚拟机、进程：指一个Node上相互独立运作的JVM进程，每个Node可以配置运行一个或多个worker。一个Topology会分配到一个或者多个worker上运行。

#### 3．**Executor**

  线程：指一个worker的jvm中运行的java线程。多个task可以指派给同一个executer来执行。除非是明确指定，Storm默认会给每个executor分配一个task。

#### 4．**Task**

  bolt/spout实例：task是spout和bolt的实例，他们的nextTuple()和execute()方法会被executors线程调用执行。

大多数情况下，除非明确指定，Storm的默认并发设置值是1。即，一台服务器(node)，为topology分配一个worker，每个executer执行一个task。

  如图：Storm默认并发机制。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dp/storm/sum-3.png')" alt="wxmp">

  此时唯一的并发机制出现在线程级即Executor。

### 2、**增加各级别并发**

#### 1．**增加Node**

  这个其实就是增加集群的服务器数量。

#### 2．**增加worker**

  可以通过API和修改配置两种方式修改分配给topology的woker数量。

  API增加woker：

```java
Config config = new Config();
config.setNumWorkers(2);
```

  单机模式下，增加worker的数量不会有任何提升速度的效果。

#### 3．**增加Executor**

  API增加Executor：

```java
builder.setSpout(spout_id,spout,2);
builder.setBolt(bolt_id,bolt,executor_num);
```

  这种办法为Spout或Bolt增加线程数量，默认每个线程都运行该Spout或Bolt的一个task。

#### 4．**增加Task**

  API增加Task：

```java
builder.setSpout(...).setNumTasks(2);
builder.setBolt(...).setNumTasks(task_num);
```

  如果手动设置过task的数量，task的总数量就是指定的数量个，而不管线程有几个，这些task会随机分配在这些个线程内部执行。

### 3、**数据流分组**

  数据流分组方式定义了数据如何进行分发。

  Storm内置了七种数据流分组方式:

#### 1．**Shuffle Grouping**

  随机分组。

  随机分发数据流中的tuple给bolt中的各个task，每个task接收到的tuple数量相同。

#### 2．**Fields Grouping**

  按字段分组。

  根据指定字段的值进行分组。指定字段具有相同值的tuple会路由到同一个bolt中的task中。

#### 3．**All Grouping**

  全复制分组。

  所有的tuple复制后分发给后续bolt的所有的task。

#### 4．**Globle Grouping**

  全局分组。

  这种分组方式将所有的tuple路由到唯一一个task上，Storm按照最小task id来选取接受数据的task。这种分组方式下配置bolt和task的并发度没有意义。

  这种方式会导致所有tuple都发送到一个JVM实例上，可能会引起Strom集群中某个JVM或者服务器出现性能瓶颈或崩溃。

#### 5．**None Grouping**

  不分组。

  在功能上和随机分组相同，为将来预留。

#### 6．**Direct Grouping**

  指向型分组。

  数据源会通过emitDirect()方法来判断一个tuple应该由哪个Strom组件来接受。只能在声明了是指向型数据流上使用。

#### 7．**Local or shuffle Grouping**

  本地或随机分组。

  和随机分组类似，但是，会将tuple分发给同一个worker内的bolt task，其他情况下采用随机分组方式。这种方式可以减少网络传输，从而提高topology的性能。

#### 8．**自定义**

  另外可以自定义数据流分组方式

  写类实现CustomStreamGrouping接口

  代码：

```java
/**
* 自定义数据流分组方式
* @author park
*
*/
public class MyStreamGrouping implements CustomStreamGrouping {

  /**
  * 运行时调用，用来初始化分组信息
  * context:topology上下文对象
  * stream:待分组数据流属性
  * targetTasks:所有待选task的标识符列表
  * 
 */
  @Override
  public void prepare(WorkerTopologyContext context, GlobalStreamId stream, List<Integer> targetTasks) {

  }

  /**
  * 核心方法，进行task选择
  * taskId:发送tuple的组件id
  * values:tuple的值
  * 返回值要发往哪个task
  */
  @Override
  public List<Integer> chooseTasks(int taskId, List<Object> values) {
    return null;
  }
}
```



## 五、**Storm集群中的概念**

### 1、**概述**

  Storm集群遵循主/从结构。Storm的主节点是半容错的。

  Strom集群由一个主节点(nimbus)和一个或者多个工作节点(supervisor)组成。

  除此之外Storm集群还需要一个ZooKeeper的来进行集群协调。

### 2、**nimbus**

  nimbus守护进程主要的责任是管理、协调和监控在集群上运行的topology。

  包括topology的发布，任务的指派，事件处理失败时重新指派任务。

#### 1．**任务发布流程**

  将topology发布到Storm集群。

  将预先打包成jar文件的topology和配置信息提交到nimbus服务器上，一旦nimbus接收到topology的压缩包，会将jar包分发到足够数量的supervisor节点上，当supervisor节点接收到了topology压缩文件，nimbus就会指派task到每个supervisor并且发送信号指示supervisor生成足够的worker来执行指派的task。

  nimbus记录所有的supervisor节点的状态和分配给他们的task，如果nimbus发现某个supervisor没有上报心跳或者已经不可达了，他将会将故障supervisor分配的task重新分配到集群中的其他supervisor节点。

#### 2．**半容错机制**

  nimbus并不参与topology的数据处理过程，只是负责topology的初始化、任务分发和进程监控。因此，即使nimbus守护进程在topology运行时停止了，只要分配的supervisor和worker健康运行，topology会一直继续处理数据，所以称之为半容错机制。

### 3、**supervisor**

  supervisor守护进程等待nimbus分配任务后生成并监控workers执行任务。

  supervisor和worker都是运行在不同的JVM进程上，如果supervisor启动的worker进程因为错误异常退出，supervisor将会尝试重新生成新的worker进程。


## 参考文章
* https://cloud.tencent.com/developer/article/1120796