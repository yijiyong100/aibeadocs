---
title: Flink-savePoint机制
---

::: tip
本文主要是介绍 Flink-savePoint机制 。
:::

[[toc]]

## Flink之状态之savepoint

## 1.总览

savepoints是外部存储的自包含的checkpoints，可以用来stop and resume，或者程序升级。savepoints利用checkpointing机制来创建流式作业的状态的完整快照（非增量快照），将checkpoint的数据和元数据都写入到一个外部文件系统。

如何触发、恢复或者释放savepoint了？下面一一道来。

## 2.分配Operator ID

极度推荐你给每个方法分配一个uid，这样才可以升级应用。ID起到的作用是明确每个operator的状态的使用范围。



``` shell
DataStream<String> stream = env.
  // Stateful source (e.g. Kafka) with ID
  .addSource(new StatefulSource())
  .uid("source-id") // ID for the source operator
  .shuffle()
  // Stateful mapper with ID
  .map(new StatefulMapper())
  .uid("mapper-id") // ID for the mapper
  // Stateless printing sink
  .print(); // Auto-generated ID
```



如果不手动指定ID，则系统会自动创建。如果这些ID不变，则应用可以被自动恢复出来。但是自动创建的ID依赖于应用的结构，任何应用的变动都可能导致ID的变化。所以，请手动分配ID吧。

### Savepoint State

什么是savepoint了？savepoint对每个有状态的operator保存一个map的KV结构，`Operator ID -> State` 。

``` shell
Operator ID | State
------------+------------------------
source-id   | State of StatefulSource
mapper-id   | State of StatefulMapper
```

上面代码片段的print方法没有savepoint结构，因为他是无状态的。通常，会尝试将map的每个entry都恢复回去。

## 3.Operations

可以利用cli来触发savepoint，或者cancel一个作业的同时做savepoint，或者从某个savepoint恢复，或者释放savepoint。

如果Flink版本大于1.2.0，则可以通过webui来恢复savepoints。

### Triggering Savepoints

当触发savepoint的时候，新的savepoint目录就会被创建，数据和元信息都会保存在这里。保存的位置可以是默认的目录，也可以是trigger命令指定的目录。但要注意，这个目录需要是JM和TM都可以访问的目录。

举例，对于`FsStateBackend` 或者 `RocksDBStateBackend而言：`



``` shell
# Savepoint target directory
/savepoints/

# Savepoint directory
/savepoints/savepoint-:shortjobid-:savepointid/

# Savepoint file contains the checkpoint meta data
/savepoints/savepoint-:shortjobid-:savepointid/_metadata

# Savepoint state
/savepoints/savepoint-:shortjobid-:savepointid/...
```



通常，不建议移动savepoints到别的地方，因为_metadata里面有绝对路径。但是在使用MemoryStateBackend的时候，元信息和数据会一起被存入_metadata文件，所以可以移动。

#### Trigger a Savepoint

``` shell
$ bin/flink savepoint :jobId [:targetDirectory]
```

如果命令会以jobid触发一次savepoint，返回的是本次savepoint的路径，这个路径可以用来恢复或者释放savepoint。

#### Trigger a Savepoint with YARN

``` shell
$ bin/flink savepoint :jobId [:targetDirectory] -yid :yarnAppId
```

以jobId和yarnAppId来触发savepoint。

#### Cancel Job with Savepoint

``` shell
$ bin/flink cancel -s [:targetDirectory] :jobId
```

取消作业的同时触发一次savepoint。

### Resuming from Savepoints

``` shell
$ bin/flink run -s :savepointPath [:runArgs]
```

这样提交作业就会让作业在指定的savepoint恢复出来，路径可以是savepoint的目录，也可以是_metadata的文件地址。

#### Allowing Non-Restored State

通常，恢复意味着savepoint的每一个状态都要恢复到应用中去，但如果你恰好去掉了某个operator，你可以通过设置来忽略这个状态，--allowNonRestoredState。

``` shell
$ bin/flink run -s :savepointPath -n [:runArgs]
```

### Disposing Savepoints

``` shell
$ bin/flink savepoint -d :savepointPath
```

如上，就释放了存储在savepointPath位置的savepoint。

其实也可以手动删除某个savepoint，这通过常规的文件系统操作就可以做到，并且不影响别的savepoints和checkpoints。

### Configuration

可以通过配置项state.savepoints.dir来定义一个默认的savepoint存储目录。当触发savepoints的时候，这个目录就会被用来存储savepoint，但是你也可以通过在trigger命令中指定目录来覆盖默认设置。

``` shell
# Default savepoint target directory
state.savepoints.dir: hdfs:///flink/savepoints
```

如果既没有默认目录，也没有指定目录，则触发savepoint就会失败。

## 4.FAQ

- 1. 是否需要给所有的operator指定ID？原则上，只需要给有状态的operator设置id就可以。但建议给所有的operator都设置。
- 2. 如果新的应用添加了一个有状态的operator会怎样？应用恢复的时候，新添加的operator会被当做没有状态来处理。
- 3. 如果删除了一个了？默认，恢复作业是所有状态都要恢复，删除了一个就会导致恢复失败，除非你指定可以忽略，见上面。
- 4. 如果改变了operator的顺序了？如果是你手动指定的id，则恢复不受影响。如果是自动生成的，改变了顺序往往也意味着id的改变，所以恢复会失败。
- 5. 如果添加、删除或者改变了没有状态的operator的顺序了？同4，手动设置了id则不受影响，否则会失败。
- 6. 如果改变了应用的并行度了？对于版本在1.2.0之后的，没影响？版本在之前怎么办？只能将应用和savepoint都升级到1.2.0之后。


## 参考文章
* https://www.cnblogs.com/029zz010buct/p/9405256.html
