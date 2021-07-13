---
title: Redis精华总结
---

::: tip
本文主要是介绍 Redis精华总结 。
:::

[[toc]]

# Redis核心知识点总结

## 一、数据类型

### String

string 类型是 Redis 最基本的数据类型，string 类型的值最大能存储 512MB

```shell
SET runoob "test"
GET runoob
12
```

### Hash

Redis hash 是一个键值(key=>value)对集合。

Redis hash 是一个 string 类型的 field 和 value 的映射表，hash 特别适合用于存储对象。

```shell
HMSET runoob field1 "Hello" field2 "World"
HGET runoob field1
12
```

### Set

Redis 的 Set 是 string 类型的无序集合。

集合是通过哈希表实现的，所以添加，删除，查找的复杂度都是 O(1)。

```shell
sadd key member
smembers runoob
12
```

### SortedSet (ZSet)

Redis zset 和 set 一样也是string类型元素的集合,且不允许重复的成员。

不同的是每个元素都会关联一个double类型的分数。redis正是通过分数来为集合中的成员进行从小到大的排序。

zset的成员是唯一的,但分数(score)却可以重复。

```shell
zadd key score member 
ZRANGEBYSCORE runoob 0 1000
12
```

### List

Redis 列表是简单的字符串列表，按照插入顺序排序。你可以添加一个元素到列表的头部（左边）或者尾部（右边）。

列表最多可存储 232 - 1 元素 (4294967295, 每个列表可存储40多亿)。

```shell
lpush runoob mongodb
lrange runoob 0 10
12
```

### 适用场景

| 类型                 | 简介                                                   | 特性                                                                                                                                 | 场景                                                                                                  |
| -------------------- | ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------- |
| String(字符串)       | 二进制安全                                             | 可以包含任何数据,比如jpg图片或者序列化的对象,一个键最大能存储512M                                                                    | —                                                                                                     |
| Hash(字典)           | 键值对集合,即编程语言中的Map类型                       | 适合存储对象,并且可以像数据库中update一个属性一样只修改某一项属性值(Memcached中需要取出整个字符串反序列化成对象修改完再序列化存回去) | 存储、读取、修改用户属性                                                                              |
| List(列表)           | 链表(双向链表)                                         | 增删快,提供了操作某一段元素的API                                                                                                     | 1,最新消息排行等功能(比如朋友圈的时间线) 2,消息队列                                                   |
| Set(集合)            | 哈希表实现,元素不重复                                  | 1、添加、删除,查找的复杂度都是O(1) 2、为集合提供了求交集、并集、差集等操作                                                           | 1、共同好友 2、利用唯一性,统计访问网站的所有独立ip 3、好友推荐时,根据tag求交集,大于某个阈值就可以推荐 |
| Sorted Set(有序集合) | 将Set中的元素增加一个权重参数score,元素按score有序排列 | 数据插入集合时,已经进行天然排序                                                                                                      | 1、排行榜 2、带权重的消息队列                                                                         |

## 二、持久化

### RDB

#### rdb配置

```properties
#rdb文件的名称
dbfilename "dump.rdb"
#数据目录，数据库的写入会在这个目录。rdb、aof文件也会写在这个目录
dir "E:\\redis\\amaster"
#使用压缩rdb文件，rdb文件压缩使用LZF压缩算法，yes：压缩，但是需要一些cpu的消耗。no：不压缩，需要更多的磁盘空间
rdbcompression yes
#是否校验rdb文件。从rdb格式的第五个版本开始，在rdb文件的末尾会带上CRC64的校验和。这跟有利于文件的容错性，但是在保存rdb文件的时候，会有大概10%的性能损耗，所以如果你追求高性能，可以关闭该配置。
rdbchecksum yes
12345678
```

#### save执行原理

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/db/redis/sumary1/20200803221217536.png')" alt="wxmp">

save命令执行一个同步操作，以RDB文件的方式保存所有数据的快照。 由于save命令是同步命令，会占用Redis的主进程。若Redis数据非常多时，save命令执行速度会非常慢，阻塞所有客户端的请求。

#### bgsave原理

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/db/redis/sumary1/20200803221244698.png')" alt="wxmp">

通过后台fork一个新的线程执行，并不是立即执行，bgsave指令是对save指令造成的阻塞问题的解决方案，Redis后台所有的rdb持久化操作都是通过bgsave完成的

```properties
#当RDB持久化出现错误后，是否依然进行继续进行工作，yes：不能进行工作，no：可以继续进行工作，可以通过info中的rdb_last_bgsave_status了解RDB持久化是否有错误
stop-writes-on-bgsave-error yes
12
```

后台存储过程中如果出现错误停止操作

#### 通过后台配置自动保存

```properties
# 快照配置
# 注释掉“save”这一行配置项就可以让保存数据库功能失效
# 设置sedis进行数据库镜像的频率。
# 900秒（15分钟）内至少1个key值改变（则进行数据库保存--持久化）
# 300秒（5分钟）内至少10个key值改变（则进行数据库保存--持久化）
# 60秒（1分钟）内至少10000个key值改变（则进行数据库保存--持久化）
save 900 1
save 300 10
save 60 10000
123456789
```

second时间内发生了changes次数的变化即保存数据

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/db/redis/sumary1/20200803221323409.png')" alt="wxmp">

要根据业务实际情况进行配置，保存频率过高或者过低都可能会出现灾难性的问题；second和changes尽量设成互补的关系，例如时间短则changes次数高，时间长则changes次数设少一些；采用的是bgsave的方式

#### 对比

| 方式           | save指令 | bgsave指令和后台配置 |
| -------------- | -------- | -------------------- |
| 读写           | 同步     | 异步                 |
| 阻塞客户端指令 | 是       | 否                   |
| 额外消耗内存   | 否       | 是                   |
| 启动新进程     | 否       | 是                   |

#### rdb优缺点

优点：

紧凑压缩的二进制文件，存储效率较高；

存储的是redis某个时间点的数据快照，适合用于数据备份，全量复制场景；

rdb恢复数据的速度比aof速度快，因为保存的是数据而不是指令；

应用：服务器中每X小时执行bgsave备份，将rdb文件拷贝到远程机器中，用于灾难恢复；

缺点：

无法做到实时持久化，很大可能丢失数据；

bgsave指令每次运行都要执行fork操作创建子进程，会牺牲一些性能；

redis不同把那本rdb文件格式不统一，可能出现数据格式不兼容的情况；

### AOF

#### AOF 简介

AOF(append only file)持久化：以独立日志的方式记录每次写命令，重启时再重新执行aof文件中的命令达到数据恢复的目的。AOF主要用于解决数据持久化的实时性，是目前Redis持久化的主流方式。

#### AOF写数据的三种策略

always 每次 ：数据0误差，性能低

everysec 每秒 ：每秒将缓存区中的指令同步到aof文件中准确性较高，在宕机的情况下可能丢失1s的数据。

no 系统控制 ：由系统控制同步的周期，整体过程不可控

#### AOF持久化配置

```properties
#Redis会把每次写入的数据在接收后都写入 appendonly.aof 文件，每次启动时Redis都会先把这个文件的数据读入内存里，先忽略RDB文件。
appendonly yes
#aof文件名
appendfilename "appendonly.aof"
#aof持久化策略的配置
#no表示不执行fsync，由操作系统保证数据同步到磁盘，速度最快。
#always表示每次写入都执行fsync，以保证数据同步到磁盘。
#everysec表示每秒执行一次fsync，可能会导致丢失这1s数据。
appendfsync everysec
123456789
```

#### AOF重写工作原理

对于get之类的操作不需要写aof，只要写对数据进行修改的操作即可，并且将多条指令进行合并，例如对一个key进行多次set指需要保存最后一次set即可。即保留数据最终的写入命令，并且将多条写命令合并成一条命令。

```properties
手动重写指令
bgrewriteaof 

#aof自动重写配置。当目前aof文件大小超过上一次重写的aof文件大小的百分之多少进行重写，即当aof文件增长到一定大小的时候Redis能够调用bgrewriteaof对日志文件进行重写。当前AOF文件大小是上次日志重写得到AOF文件大小的二倍（设置为100）时，自动启动新的日志重写过程。
auto-aof-rewrite-percentage 100
#设置允许重写的最小aof文件大小，避免了达到约定百分比但尺寸仍然很小的情况还要重写
auto-aof-rewrite-min-size 64mb
1234567
```

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/db/redis/sumary1/20200803221350941.png')" alt="wxmp">

运行info persistence指令可以获取redis信息

自动重写触发条件

aof_current_size > auto_aof_rewrite_min_size

(aof_current_size-aof_base_size) / of_base_size >= auto-aof-rewrite-percentage

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/db/redis/sumary1/20200803221418782.png')" alt="wxmp">

### RDB和AOF对比

| 持久化方式   | RDB                | AOF                |
| ------------ | ------------------ | ------------------ |
| 占用存储空间 | 小（数据级：压缩） | 大（指令级：重写） |
| 存储速度     | 慢                 | 块                 |
| 恢复速度     | 块                 | 慢                 |
| 数据安全性   | 会丢失数据         | 依据策略决定       |
| 资源消耗     | 高/重量级          | 低/轻量级          |
| 启动优先级   | 低                 | 高                 |

### RDB和AOF选择策略

数据敏感：使用默认的AOF持久化方案；AOF持久化策略使用everysecond，每秒中fsync一次，该策略仍然可以保持良好的处理性能，出现问题时最后丢失0-1s内的数据。AOF存储体积大，恢复速度较慢。

数据如果呈现阶段有效性：采用RDB方案，数据可以良好的做到阶段内无丢失（开发或者运维手工维护），恢复速度较快，阶段点数据恢复采用RDB方案。

综合比较：

RDB与AOF实际是一种权衡，每种都有利弊。

不能承受数据丢失，对数据敏感，采用AOF。

如果能承受数分钟内数据丢失，追求最快的数据恢复速度采用RDB。

灾难恢复选用RDB

双宝险策略，同时开启RDB和AOF，重启后，redis优先使用AOF恢复数据降低丢失的数据量。

### 持久化应用场景

redis应用于抢购、限购类、限量发放的优惠券、激活码业务的数据存储设计；

redis应用于具有操作先后顺序的数据控制；

redis应用最最新消息展示；

redis应用于基于黑名单和白名单设定的服务控制；

redis应用于计数器组合排序功能对应的排名；

redis应用于按次结算的服务控制；

## 四、Redis事务

### 事务的基本操作

#### 定义

redis事务指的是一个命令的执行队列，将一系列预定义命令包装成一个整体，当执行时，一次性执行，中间不会被打断或者被干扰。

#### 取消

如果事务定义的过程中出现问题，通过discard命令终止当前事务的定义，发生再multi之后，exec指令之前。

#### 执行

通过multi设定事务的开启位置，执行此指令后，后续的指令均加入到事务中。

通过exec指令设置事务的结束位置，同时执行事务，与multi成对出现使用。

### 事务的工作流程

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/db/redis/sumary1/20200803221443866.png')" alt="wxmp">

### 事务操作注意事项

事务定义的过程中，某个输入的指令格式错误例如敲错字符了，那么整个事务中的所有命令均不会执行，包括哪些语法正确的命令；

如果指令格式正确，但是无法运行，例如对list进行incr操作，那么能够运行命令正确的指令，错误的指令不会被执行。因此如果出错了需要手动回滚之前正确执行的指令。

所有Redis事务基本不用。

### 事务锁

业务场景

天猫双11热卖过程中，对已售罄的货物追加补货，4个业务员都有权限进行补货，补货的操作可能是一系列的操作，牵涉到多个连续的操作，如何保证补货重复操作？

### 分布式锁

针对上述业务场景，

通过对key添加监视锁，在执行exec操作前，如果key发生了变化，则终止事务执行。

```shell
watch key1 [key...]
1
```

取消对所有key的监试

```shell
unwatch1
```

使用setnx设置一个公共锁(set if not exists)

setnx lockkey value

如果客户端获取完锁后未释放就发生了异常，或者释放锁前发生了宕机怎么处理？

### 思索的解决方案

通过位key添加过期时间---->expire key second | pexpire key millionseconds

锁定的过期时间设定推荐：业务执行最大耗时 * 120% + 平均网络延时 * 110%

setnx 和 expire不是一个原子操作，如果两条指令执行中间发生异常，那还有问题，怎么解决？

setnx的时候同时设置过期时间，通过事务实现

## 五、删除策略

### 过期数据概念

Redis是一种内存级的数据库，所有的数据均存放在内存中，内存中的数据可以通过ttl指令获取其状态，pttl key指令获取key 的过期时间，XX表示具有失效性的数据，-1表示永久有效的数据，-2表示已过期的数据或者被删除的或未定义的数据。

过期的数据是先存放在内存中的expire区域的

### 删除策略

#### 定时删除

创建一个定时器，当key设置有过期时间，且过期时间到达时，有定时任务器立即执行对key的删除操作。

优点：节约内存，到时就删除，快速释放掉不必要的内存占用。

缺点：cpu压力大，无论cpu此时负载多高，均占用cpu去删除key，会影响Redis服务器的响应时间和指令的吞吐量。

总结：用cpu性能换区内存空间

#### 惰性删除

数据到达过期时间时，不做处理，等下次访问该数据时；

 如果未过期，例如被续命了，则下次访问时返回数据；

 如果已过期，则删除数据，返回不存在

优点：节约cpu性能，发现必须删除的时候才删除。

缺点：内存压力大，出现长期占用内存的数据，因为不访问就不会删除。

总结：用内存换cpu性能

#### 定期删除

是上面两张方案的折中方案，配置中配置server.hz的值，默认10

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/db/redis/sumary1/20200803221511619.png')" alt="wxmp">

### 过期数据的底层存储结构

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/db/redis/sumary1/20200803221532768.png')" alt="wxmp">

### 删除策略的目标

在内存占用与CPU占用之间寻找一种平衡，顾此失彼都会造成Redis整体Redis性能的下降，甚至造成服务器宕机或者内存泄漏

### 删除策略对比

| 策略名称 | 内存情况         | CPU情况                       | 归纳               |
| -------- | ---------------- | ----------------------------- | ------------------ |
| 定时删除 | 节约内存，不占用 | 不分时段占用CPU资源，频率高   | 时间换空间         |
| 惰性删除 | 内存严重占用     | 延迟执行，CPU利用率高         | 空间换时间         |
| 定期删除 | 内存定期随机清理 | 每秒花费固定的CPU资源维护内存 | 随机抽查，重点抽查 |

### 逐出策略

当新的数据进入Redis时，如果内存不足怎么办？逐出策略

Redis使用内存存储数据时，在执行每一个命令前会调用freeMemoryIfNeeded()检测内存是否充足，如果内存不满足新加入数据的最低存储要求，Redis需要临时删除一些数据为当前指令操作的数据腾出空间，清理数据的策略称为逐出算法。

注意：逐出算法不能100%能够清理出足够的内存空间，如果不成功则反复执行，当对所有数据尝试清理完毕后，还是不能达到要求，则抛出OOM内存溢出的错误信息。

**配置**

```properties
# 最大可使用内存, 占用物理内存的比例，默认0，表示不限制，生产通常设置在50%以上
maxmemory 0 

# 每次选取待删除数据的个数; 选取数据时并不会全库扫描，导致严重的性能消耗，降低读写性能。因此采用随机获取数据的方式作为待检测删除数据
maxmemory-samples 100

# 删除策略, 达到最大内存厚度，对呗挑选出来数据进行删除的策略。
maxmemory-policy volatile-ttl
12345678
```

**算法**

1、通过检测即将过期的数据集server.db[i].expires

volatile-lru : 挑选最近最少使用的数据进行淘汰

volatile-lfu ： 选取最近使用次数最少的数据进行淘汰

volatile-ttl ： 挑选将要过期的数据进行淘汰

volatile-random ： 任意选取数据进行淘汰

2、通过检测全库数据集server.db[i].dict

allkeys-lru ：挑选最近最少使用的数据进行淘汰

allkeys-lfu ：选取最近使用次数最少的数据进行淘汰

allkeys-random ：挑选将要过期的数据进行淘汰

3、放弃数据逐出

no-enviction : 禁止数据驱逐，产生OOM错误

## 六、主从复制

### 简介

**背景**

互联网三高架构：高并发、高可用、高性能

可用性指的是系统一年内能对外提供服务的时间百分比，业界目标5个9，99.999%，即服务器年宕机时长低于315秒，约5.25分钟

主从复制即将master中的数据即时、有效的复制到slave中；

特征：一个master可以拥有多个slave，一个slave只对应一个master

职责：master负责写数据，执行写操作时，将出现变化的数据自动同步到salve，读数据（可忽略）

slave职责：读数据，禁止写数据

### 作用

读写分离：master写、slave读，提高服务器的读写负载能力；

负载均衡：基于只从结构，配合读写分离，有slave分担master的负载，根据需求的变化，改变slave的数量，通过多个从节点分担数据读取负载，大大提高Redis服务器并发量与数据吞吐量。

故障恢复：当master出现问题时，有slave提供服务，事项快速的故障恢复。

数据冗余：实现数据的热备份，时持久化之外的一种数据冗余方式。

### 三个阶段

主从复制的过程可以分为3个阶段：建立连接阶段（即准备阶段）、数据同步阶段、命令传播阶段

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/db/redis/sumary1/20200803221604935.png')" alt="wxmp">

### 工作流程

#### 建立连接阶段

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/db/redis/sumary1/20200803221643291.png')" alt="wxmp">

##### 主从连接建立的方式

方式一：客户端发送slaveof命令 slaveof masterip master port

方式二：启动服务器是添加参数 redis-server --slaveof masterip masterport

方式三：通过服务器conf配置 slaveof masterip masterport

主从断开连接指令 slaveof no one

注意：slave断开连接后，不会删除已有数据，只是不再接受master发送的数据

##### 授权访问

**master密码设置：**

方式1：master配置文件设置密码requirepass password

方式2：通过master客户端设置

```
config set requirepass passwordconfig get requires12
```

**slave设置密码访问：**

方式1：slave客户端发送命令设置密码 auth password

方式2：slave配置文件设置密码 masterauth password

方式3：启动客户端设置密码 redis-cli -a password

#### 数据同步阶段

全量复制

1 slave发送psync2指令请求master同步数据

2 master执行bgsave指令保存rdb快照

3 master在第一个slave连接时，创建命令缓存区

4 通过socket将rdb文件发送给slave

5 slave接受到rdb数据，将自己数据清空，执行rdb文件恢复过程

部分复制

6 slave执行完rdb恢复后，发送指令给master告知rdb恢复完成

7 master收到后发送复制缓存区信息给slave

8 slave收到信息后执行bgrewriteaof命令恢复数据

整个工作流程总结如下：

步骤一：slave请求同步数据

步骤二：master创建rdb同步数据

步骤三：slave恢复rdb同步数据

步骤四：slave请求部分同步数据

步骤六：slave恢复部分同步数据

数据同步完成

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/db/redis/sumary1/20200803221711708.png')" alt="wxmp">

数据同步阶段master情况说明：

1、如果master数据巨大，数据同步阶段应该避开流量高峰期，避免造成master阻塞，影响业务的正常执行。

2、复制缓冲区大小设定不合理会导致数据溢出。然后造成新的全量复制，导致slave进入死循环。

repl-backlog-size 1mb

3、复制缓存区存的是数据操作指令

4、master单机内存占用主机内存的比例不应该过大，建议使用50%到70%，留下30%-50%的内存用于执行bgsave命令和创建复制缓冲区。

数据同步阶段slave情况说明：

1、为了避免slave进行全量复制、部分复制的时候服务器响应阻塞或者数据不同步，建议关闭此期间的对外服务

slave-server-stale-data yes

2、数据同步阶段，master发送数据给slave可用理解成master是slave的一个客户端，主动向slave发送命令。

3、多个slave同时请求master数据同步时，master发送的rdb文件增多，会对带宽造成巨大冲击，如果master带宽不足，数据同步需要根据业务需求适量错峰。

4、slave过多时，建议调整拓扑结构，由一主多从结构变为树状结构，中间节点即使master也是slave，注意的是，层度越深，数据同步的延时越大，数据的一致性变差。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/db/redis/sumary1/20200803221750888.png')" alt="wxmp">

#### 命令传播阶段

当master数据库状态被修改后，导致主从服务器数据库状态不一致，此时需要让主从数据同步到一致的状态，同步的动作称为命令传播；master将接收到的数据变更命令发送给slave， slave接收命令后执行命令

命令传播阶段出现断网现象处理方案

| 断网情况       | 措施     |
| -------------- | -------- |
| 网络闪断闪连   | 忽略     |
| 短时间网络中断 | 部分复制 |
| 长时间网络中断 | 全量复制 |

部分复制的三个核心要素

1、服务器运行id（run id）

概念：服务器运行id是每一台服务器每次运行的身份识别码，一台服务器多次运行可以生成过个运行id。

作用：如果想两次操作均对一台服务器进行，必须每次操作携带对应的运行id用于对方识别自己，用于身份识别。

实现方式：运行id是每台服务器启动时自己生成的，master在首次连接slave时，会将自己的运行id传给slave，slave保存此id，通过info server命令，可以查看节点的runid。

2、master服务器的复制缓存区

概念：复制缓冲区又叫复制挤压缓冲区，是一个先进先出FIFO的队列，用于存储服务器执行过的命令，每次 传播命令，master都会将传播的命令记录下来，并存在在复制缓冲区。复制缓冲区的大小是固定的默认是1M，当入队列的元素大于缓冲区大小时，缓冲区队头的元素会被弹出。

何时创建：每台服务器启动时，如果有开启AOF或者被slave节点连接时，创建复制缓冲区。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/db/redis/sumary1/20200803221819453.png')" alt="wxmp">

3、master和slave的复制偏移量

复制偏移量offset指复制缓冲区中指令字节的位置

分类：

master复制偏移量：记录发送给所有slave的指令字节对应的位置（多个）

slave复制偏移量：记录slave接收master发送过来的指令字节对应的位置（一个）

来源：

master端：发送一次记录一次

slave端：接收一次记录一次

作用：同步信息对比master和slave的差异，当slave断线后数据恢复使用。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/db/redis/sumary1/20200803221855777.png')" alt="wxmp">

心跳机制：

进入命令传播阶段，master与slave之间需要进行信息交换，使用心跳机制进行维护，实现双方连接保持在线。

master心跳：

指令：ping

周期：由repl-ping-slave-period决定，默认10秒

作用：判断slave是否在线

查询：info replication 获取slave最后一次连接的时间间隔，lag项维持在0或者1视为正常

slave心跳：

指令：replconf ack（offset）

周期：1秒

作用：汇报slave自己的复制偏移量给master，获取最新的数据变更指令；同时判断master是否在线。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/db/redis/sumary1/20200803221924757.png')" alt="wxmp">

### 模拟结果

主

```verilog
[root@iZbp143t3oxhfc3ar7jey0Z redis-4.0.12]# redis-server redis.conf26260:C 07 Apr 10:15:24.212 # oO0OoO0OoO0Oo Redis is starting oO0OoO0OoO0Oo26260:C 07 Apr 10:15:24.212 # Redis version=4.0.12, bits=64, commit=00000000, modified=0, pid=26260, just started26260:C 07 Apr 10:15:24.212 # Configuration loaded                _._           _.-``__ ''-._      _.-``    `.  `_.  ''-._           Redis 4.0.12 (00000000/0) 64 bit  .-`` .-```.  ```\/    _.,_ ''-._ (    '      ,       .-`  | `,    )     Running in standalone mode |`-._`-...-` __...-.``-._|'` _.-'|     Port: 6379 |    `-._   `._    /     _.-'    |     PID: 26260  `-._    `-._  `-./  _.-'    _.-' |`-._`-._    `-.__.-'    _.-'_.-'| |    `-._`-._        _.-'_.-'    |           http://redis.io  `-._    `-._`-.__.-'_.-'    _.-' |`-._`-._    `-.__.-'    _.-'_.-'| |    `-._`-._        _.-'_.-'    |  `-._    `-._`-.__.-'_.-'    _.-'      `-._    `-.__.-'    _.-'          `-._        _.-'              `-.__.-'26260:M 07 Apr 10:15:24.215 # WARNING: The TCP backlog setting of 511 cannot be enforced because /proc/sys/net/core/somaxconn is set to the lower value of 128.26260:M 07 Apr 10:15:24.215 # Server initialized26260:M 07 Apr 10:15:24.215 # WARNING overcommit_memory is set to 0! Background save may fail under low memory condition. To fix this issue add 'vm.overcommit_memory = 1' to /etc/sysctl.conf and then reboot or run the command 'sysctl vm.overcommit_memory=1' for this to take effect.26260:M 07 Apr 10:15:24.215 # WARNING you have Transparent Huge Pages (THP) support enabled in your kernel. This will create latency and memory usage issues with Redis. To fix this issue run the command 'echo never > /sys/kernel/mm/transparent_hugepage/enabled' as root, and add it to your /etc/rc.local in order to retain the setting after a reboot. Redis must be restarted after THP is disabled.26260:M 07 Apr 10:15:24.215 * Ready to accept connections26260:M 07 Apr 10:30:33.003 * Slave 127.0.0.1:6380 asks for synchronization 从请求同步26260:M 07 Apr 10:30:33.003 * Partial resynchronization not accepted: Replication ID mismatch (Slave asked for '83c02182bfec39697066ab7cc9faa14603dc6ee9', my replication IDs are 'a950489a53d4fbfc41834ef633c8a59e95bca4c1' and '0000000000000000000000000000000000000000') 拒绝部分复制，因为runid不一样26260:M 07 Apr 10:30:33.003 * Starting BGSAVE for SYNC with target: disk 开始rdb保存26260:M 07 Apr 10:30:33.005 * Background saving started by pid 26728 26728:C 07 Apr 10:30:33.009 * DB saved on disk26728:C 07 Apr 10:30:33.503 * RDB: 6 MB of memory used by copy-on-write26260:M 07 Apr 10:30:33.603 * Background saving terminated with success26260:M 07 Apr 10:30:33.603 * Synchronization with slave 127.0.0.1:6380 succeeded 从同步成功26260:M 07 Apr 10:45:34.001 * 1 changes in 900 seconds. Saving...26260:M 07 Apr 10:45:34.001 * Background saving started by pid 2898628986:C 07 Apr 10:45:34.008 * DB saved on disk28986:C 07 Apr 10:45:34.008 * RDB: 2 MB of memory used by copy-on-write123456789101112131415161718192021222324252627282930313233343536373839
```

从

```verilog
[root@iZbp143t3oxhfc3ar7jey0Z redis-4.0.12]# redis-server redis-6380.conf
26434:C 07 Apr 10:20:41.532 # oO0OoO0OoO0Oo Redis is starting oO0OoO0OoO0Oo
26434:C 07 Apr 10:20:41.532 # Redis version=4.0.12, bits=64, commit=00000000, modified=0, pid=26434, just started
26434:C 07 Apr 10:20:41.532 # Configuration loaded
                _._
           _.-``__ ''-._
      _.-``    `.  `_.  ''-._           Redis 4.0.12 (00000000/0) 64 bit
  .-`` .-```.  ```\/    _.,_ ''-._
 (    '      ,       .-`  | `,    )     Running in standalone mode
 |`-._`-...-` __...-.``-._|'` _.-'|     Port: 6380
 |    `-._   `._    /     _.-'    |     PID: 26434
  `-._    `-._  `-./  _.-'    _.-'
 |`-._`-._    `-.__.-'    _.-'_.-'|
 |    `-._`-._        _.-'_.-'    |           http://redis.io
  `-._    `-._`-.__.-'_.-'    _.-'
 |`-._`-._    `-.__.-'    _.-'_.-'|
 |    `-._`-._        _.-'_.-'    |
  `-._    `-._`-.__.-'_.-'    _.-'
      `-._    `-.__.-'    _.-'
          `-._        _.-'
              `-.__.-'

26434:M 07 Apr 10:20:41.534 # WARNING: The TCP backlog setting of 511 cannot be enforced because /proc/sys/net/core/somaxconn is set to the lower value of 128.
26434:M 07 Apr 10:20:41.534 # Server initialized
26434:M 07 Apr 10:20:41.534 # WARNING overcommit_memory is set to 0! Background save may fail under low memory condition. To fix this issue add 'vm.overcommit_memory = 1' to /etc/sysctl.conf and then reboot or run the command 'sysctl vm.overcommit_memory=1' for this to take effect.
26434:M 07 Apr 10:20:41.534 # WARNING you have Transparent Huge Pages (THP) support enabled in your kernel. This will create latency and memory usage issues with Redis. To fix this issue run the command 'echo never > /sys/kernel/mm/transparent_hugepage/enabled' as root, and add it to your /etc/rc.local in order to retain the setting after a reboot. Redis must be restarted after THP is disabled.
26434:M 07 Apr 10:20:41.534 * Ready to accept connections
26434:S 07 Apr 10:30:31.644 * Before turning into a slave, using my master parameters to synthesize a cached master: I may be able to synchronize with the new master with just a partial transfer.
26434:S 07 Apr 10:30:31.644 * SLAVE OF 127.0.0.1:6379 enabled (user request from 'id=3 addr=127.0.0.1:34200 fd=9 name= age=525 idle=0 flags=N db=0 sub=0 psub=0 multi=-1 qbuf=0 qbuf-free=32768 obl=0 oll=0 omem=0 events=r cmd=slaveof')
26434:S 07 Apr 10:30:33.003 * Connecting to MASTER 127.0.0.1:6379 连接到主
26434:S 07 Apr 10:30:33.003 * MASTER <-> SLAVE sync started 主从同步开始
26434:S 07 Apr 10:30:33.003 * Non blocking connect for SYNC fired the event. 
26434:S 07 Apr 10:30:33.003 * Master replied to PING, replication can continue...
26434:S 07 Apr 10:30:33.003 * Trying a partial resynchronization (request 83c02182bfec39697066ab7cc9faa14603dc6ee9:1). 尝试部分复制
26434:S 07 Apr 10:30:33.006 * Full resync from master: 75f06abf1e9772f269eace1095fd8ed8726ecfaa:0 开始全量复制
26434:S 07 Apr 10:30:33.006 * Discarding previously cached master state.
26434:S 07 Apr 10:30:33.603 * MASTER <-> SLAVE sync: receiving 176 bytes from master
26434:S 07 Apr 10:30:33.603 * MASTER <-> SLAVE sync: Flushing old data 清除之前旧的数据
26434:S 07 Apr 10:30:33.604 * MASTER <-> SLAVE sync: Loading DB in memory 加载rdb数据
26434:S 07 Apr 10:30:33.604 * MASTER <-> SLAVE sync: Finished with success 同步成功
26434:S 07 Apr 10:30:33.605 * Background append only file rewriting started by pid 26729
26434:S 07 Apr 10:30:33.628 * AOF rewrite child asks to stop sending diffs.
26729:C 07 Apr 10:30:33.628 * Parent agreed to stop sending diffs. Finalizing AOF...
26729:C 07 Apr 10:30:33.628 * Concatenating 0.00 MB of AOF diff received from parent.
26729:C 07 Apr 10:30:33.629 * SYNC append only file rewrite performed
26729:C 07 Apr 10:30:33.629 * AOF rewrite: 0 MB of memory used by copy-on-write
26434:S 07 Apr 10:30:33.703 * Background AOF rewrite terminated with success
26434:S 07 Apr 10:30:33.703 * Residual parent diff successfully flushed to the r     ewritten AOF (0.00 MB)
26434:S 07 Apr 10:30:33.703 * Background AOF rewrite finished successfully
26434:S 07 Apr 10:35:42.001 * 1 changes in 900 seconds. Saving...
26434:S 07 Apr 10:35:42.001 * Background saving started by pid 28699
28699:C 07 Apr 10:35:42.004 * DB saved on disk
28699:C 07 Apr 10:35:42.005 * RDB: 0 MB of memory used by copy-on-write
26434:S 07 Apr 10:35:42.499 * Background saving terminated with success
123456789101112131415161718192021222324252627282930313233343536373839404142434445464748495051525354
```

### 常见问题

一、问题现象：

master的cpu占用过高或者slave频繁断开连接。

问题原因：

slave每1秒发送replconf ack命令到master

当salve街道了慢查询keys *，hgetall等，会占用大量cpu性能

master每1秒调用复制定时函数replicationCron(),比对slave发现发时间没有响应

最终结果：

master各种资源（输出缓冲区、宽带、连接等）被严重占用

解决方案：

通过设置合理的超时时间，确认是否释放slave

repl-timeout

该参数定义了超时时间的阈值（默认60s），超过该值，释放slave。

二、问题现象：

slave与master连接断开

问题原因：

master发送ping指令拼读较低

master设定超时时间最短

ping指令在网络中存在丢包

解决方案：

提高ping指令发送的频度

repl-ping-slave-period

超时时间repl-time的时间至少是ping指令频度的5到10倍，否则salve很容易判定超时

三、问题现象

网络环境不佳，出现网络中断，slave不提供服务

问题原因

复制缓冲区过小，断网后slave的offset月结，处罚全量复制

最终结果

slave反复进行全量复制

解决方案

修改复制缓冲区大小

repl-backlog-size

建议设置如下：

1、测算从master到save的重连平均时长second

2、获取master平均每秒产生写命令数据总量write_size_per_second

3、最优复制缓冲区空间=2 * second * write_size_per_second

问题现象

多个slave获取相同数据不同步

问题原因

网络信息不同步，数据发送有延迟

解决方案

优化主从间的网络环境，通常设置在同一个机房部署，如使用阿里云等云服务器时要注意此现象

监控主从节点延时（通过offset）判断，如果slave延迟过大，暂时屏蔽程序对该slave的数据访问

slave-serve-stale-data yes|no

开启后仅响应info、slaveof等少数命令（慎用，除非对数据一致性要求很高）

## 七、哨兵

### 背景介绍

主机宕机了怎么办，要做哪些事情？

将宕机的master下线

要找一个slave作为master

通知所有的slave连接新的master

启动新的master与slave

全量复制*N + 部分复制 * N

谁来确认master宕机了？

找一个新的master，怎么找？

修改配置后，原始的主恢复了怎么办？

### 哨兵简介

哨兵（sentinel）是一个分布式系统，用于对主从结构中的每台服务器进行监控，当出现故障时通过投票机制选择新的master并将所有slave连接到新的master。

### 哨兵作用

监控：不断检查master和slave是否正常运行；master存活检测、master与slave运行情况检测

通知：当被监控的服务器出现问题时，向其他（哨兵、客户端）发送通知。

自动故障转移：断开master与slave连接，选取一个slave作为master，将其他slave连接到新的mater，并告知客户端的服务器地址。

注意：哨兵也是一台Redis服务器，知识不提供数据服务，通常哨兵配置为单数

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/db/redis/sumary1/20200803222004589.png')" alt="wxmp">

### 搭建

### 工作原理

#### 阶段一：监控阶段

用于同步各个节点的状态信息

获取各个sentinel的状态（是否在线）：发送ping命令

获取master的状态：master属性：runid、role；各个slave的详细信息；发送info指令获取信息

获取所有的slave的状态（根据master中的slave信息）；发送info指令获取信息

#### 阶段二：通知阶段

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/db/redis/sumary1/2020080322203826.png')" alt="wxmp">

#### 阶段三：故障转移阶段

sentinel不断向Redis主从服务器发送hello消息确定服务器之间的状态，如果服务是长时间没有响应，则sentinel将服务器的状态改为sdown（主观下线），然后在sentinel的集群内发布这个消息，其他sentinel收到后也去连这台机器，如果一半以上的sentinel都认为该服务器断了，则将这个服务器状态改成odown（客观下线），并将它从集群中移除。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/db/redis/sumary1/20200803222101302.png')" alt="wxmp">

如果是master 宕机了，则sentinel集群中还需要选举出一个sentinel来处理这个宕机事件，由他来选出一个新的master。在sentinel集群内发起一轮投票，超过一半以上票数的sentinel成为主事者。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/db/redis/sumary1/20200803222118683.png')" alt="wxmp">

sentinel从slave中选举master的方案：

先pass掉不在线和响应慢的，然后pass掉与原来master断开事件久的，然后pass掉优先级低的，pass掉同步offset大的，最后更具runid大小判断选出一台slave成为新的master。

选举完后，sentinel向新的master 发送slaveof no one指令，并向其他slave发送slaveof 新的masterip 端口号指令，让他们同步新的master

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/db/redis/sumary1/20200803222156233.png')" alt="wxmp">

## 八、集群

### 集群简介

业务发展的过程中遇到峰值瓶颈，Redis提供的服务OPS可以达到10万/S,但是当前业务的OPS已经达到20万/S 的时候。

集群的作用：

分散单台Redis服务器的访问压力，实现负载均衡。

分散单台服务器的存储压力，实现可扩展性。

降低单台服务器宕机带来的业务灾难。

### 集群存储结构设计

通过算法计算出key应该保存的位置

CRC16(key)%16384

redis cluster 有固定的 16384 个 hash slot，对每个 key 计算 CRC16 值，然后对 16384 取模，可以获取 key 对应的 hash slot。

redis cluster 中每个 master 都会持有部分 slot，比如有 3 个 master，那么可能每个 master 持有 5000 多个 hash slot。hash slot 让 node 的增加和移除很简单，增加一个 master，就将其他 master 的 hash slot 移动部分过去，减少一个 master，就将它的 hash slot 移动到其他 master 上去。移动 hash slot 的成本是非常低的。客户端的 api，可以对指定的数据，让他们走同一个 hash slot，通过 hash tag 来实现。

### 集群内通信设计

在 redis cluster 架构下，每个 redis 要放开两个端口号，比如一个是 6379，另外一个就是 加1w 的端口号，比如 16379。

16379 端口号是用来进行节点间通信的，也就是 cluster bus 的东西，cluster bus 的通信，用来进行故障检测、配置更新、故障转移授权(如主从切换)。cluster bus 用了另外一种二进制的协议，gossip 协议，用于节点间进行高效的数据交换，占用更少的网络带宽和处理时间。

### cluster集群搭建

### cluster集群配置

```shell
#设置加入cluster，使成为cluster中的节点
cluster-enabled yes|no

#cluster配置文件名，该文件属于自动生成，用于快速查找文件并查询文件内容
cluster-config-file filename

#节点服务响应超时时间，用于判定该节点是否下线或者切换为主从节点
cluster-node-timeout milliseconds

#master连接的slave最小数量
cluster-migration-barrier count
1234567891011
```

### 主从下线及主从切换

## 九、Redis企业级解决方案

### 缓存预热

前期准备工作：

1、日常例行统计数据访问记录，统计访问频度较高的热点数据

2、利用LRU数据删除策略，构建数据留存队列；例如storm和kafka配合

准备工作：

3、将统计结果中的数据进行分类，根据数据级别，Redis优先加载级别高的热点数据

4、利用分布式多服务器同时进行数据读取，提速数据加载过程

实施：

1、使用脚本程序固定触发热第三数据的预热过程

2、如果条件运行使用CDN效果更好

### 缓存雪崩

缓存雪崩，是指在某一个时间段，缓存集中过期失效。

产生雪崩的原因之一，比如在写本文的时候，马上就要到双十二零点，很快就会迎来一波抢购，这波商品时间比较集中的放入了缓存，假设缓存一个小时。那么到了凌晨一点钟的时候，这批商品的缓存就都过期了。而对这批商品的访问查询，都落到了数据库上，对于数据库而言，就会产生周期性的压力波峰。

一般是采取不同分类商品，缓存不同周期。在同一分类中的商品，加上一个随机因子。这样能尽可能分散缓存过期时间，而且，热门类目的商品缓存时间长一些，冷门类目的商品缓存时间短一些，也能节省缓存服务的资源；也可以让缓存在夜间的时候失效，那个时候访问量较少。

其实集中过期，倒不是非常致命，比较致命的缓存雪崩，是缓存服务器某个节点宕机或断网。因为自然形成的缓存雪崩，一定是在某个时间段集中创建缓存，那么那个时候数据库能顶住压力，这个时候，数据库也是可以顶住压力的。无非就是对数据库产生周期性的压力而已。而缓存服务节点的宕机，对数据库服务器造成的压力是不可预知的，很有可能瞬间就把数据库压垮。

### 缓存击穿

缓存击穿，是指一个key非常热点，在不停的扛着大并发，大并发集中对这一个点进行访问，当这个key在失效的瞬间，持续的大并发就穿破缓存，直接请求数据库，就像在一个屏障上凿开了一个洞。

其实，大多数情况下这种爆款很难对数据库服务器造成压垮性的压力。达到这个级别的公司没有几家的。所以，务通常对主打商品都是早早的做好了准备，让缓存永不过期，或者对着类缓存做了预热提前加入到了缓存中。即便某些商品自己发酵成了爆款，也是直接设为永不过期就好了。

大道至简，mutex key互斥锁真心用不上。

### 缓存穿透

缓存穿透，是指查询一个数据库一定不存在的数据。正常的使用缓存流程大致是，数据查询先进行缓存查询，如果key不存在或者key已经过期，再对数据库进行查询，并把查询到的对象，放进缓存。如果数据库查询对象为空，则不放进缓存。

促销会采用缓存无活动的方式，也就是如果从数据库查询的对象为空，也放入缓存，只是设定的缓存过期时间较短，比如设置为60秒。

### 性能指标监控

1、命令数

2、内存使用率

3、连接数

benchmark

客户端运行monitor

slowlog命令

### 需要更大的并发量怎么处理

比如需要同时操作一份数据的时候，最多支持10万OPS，如果需要支持到100万OPS可以将者分数据分成10份，那么久可以支持100万OPS了，例如将100个活动资源分成10份，每一份支持10万OPS的话，10份就能够支持100万OPS了。

### Redis怎么做水平扩容

将现有槽slot中的数据迁移复制一份到新的槽中，然后将新的服务器加入到集群中

### redLock

全名叫做 Redis Distributed Lock;即使用redis实现的分布式锁； 使用场景：多个服务间保证同一时刻同一时间段内同一用户只能有一个请求（防止关键业务出现并发攻击）；

红锁，将锁过期和锁设置合并成一个原子性的操作，

**redis单实例中实现分布式锁的正确方式（原子性非常重要）:**

设置锁时，使用set命令，因为其包含了setnx,expire的功能，起到了原子操作的效果，给key设置随机值，并且只有在key不存在时才设置成功返回True,并且设置key的过期时间（最好用毫秒）

> ```
> SET key_name my_random_value NX PX 30000  
> # NX 表示if not exist 就设置并返回True，否则不设置并返回False   
> # PX 表示过期时间用毫秒级， 30000 表示这些毫秒时间后此key过期
> 123
> ```

红锁存在的问题：业务没执行完锁过期失效了，因此需要给锁进行续命，通过一个后台线程定期给锁续命，后台线程里通过一个循环每隔一段时间给锁续命，续命前先判断锁是否存在，存在则续，不存在则不续，线程执行完成，释放线程资源。

## 十、基础配置

``` shell
-------服务端配置-------
#设置服务器已守护进程方式运行
deamonize yes|no 

#绑定主机地址
bind 127.0.0.1

#设置服务器端口号
port 6379

#设置数据库数量
database 16

#设置服务器日志的记录级别
loglevel debug|verbose|notice|warning

#设置日志文件的名称
logfile 端口号.log

-------客户端配置--------
#设置同一时间客户端最大的连接数量，默认不限制0，如果设置超了，Redis会关闭新的连接
maxclients 0

#设置客户端闲置等待最大时长，达到最大值后关闭连接，如需关闭该功能，设置为0
timeout 300

-------多服务器快捷设置------
#导入并加载指定的配置温江信息，用于快速创建Redis公共配置较多的Redis实例配置文件，便于维护
include /path/server-端口号.conf
1234567891011121314151617181920212223242526272829
```

## 十一、底层

### redis单线程模型

#### 1、Redis的单线程理解

Redis客户端对服务端的每次调用都经历了发送命令，执行命令，返回结果三个过程。其中执行命令阶段，由于Redis是单线程来处理命令的，所有到达服务端的命令都不会立刻执行，所有的命令都会进入一个队列中，然后逐个执行，并且多个客户端发送的命令的执行顺序是不确定的，但是可以确定的是不会有两条命令被同时执行，不会产生并发问题，这就是Redis的单线程基本模型。

Redis服务器通过socket（套接字）与客户端或其他Redis服务器进行连接，而文件事件就是服务器对socket操作的抽象。服务器与客户端或其他服务器的通信会产生相应的文件事件，而服务器通过监听并处理这些事件来完成一系列网络通信操作。

Redis基于Reactor模式开发了自己的网络事件处理器——文件事件处理器，文件事件处理器使用I/O多路复用程序来同时监听多个socket（I/O多路复用技术下面有介绍），并根据socket目前执行的任务来为socket关联不同的事件处理器。当被监听的socket准备好执行连接应答、读取、写入、关闭等操作时，与操作相对应的文件事件就会产生，这时文件事件处理器就会调用socket之前已关联好的事件处理器来处理这些事件。

文件事件处理器的构成：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/db/redis/sumary1/20200803222243612.png')" alt="wxmp">

注意：其中I/O多路复用程序通过**队列**向文件事件分派器传送socket

#### 2、I/O多路复用技术

关于I/O多路复用(又被称为“事件驱动”)，首先要理解的是，操作系统为你提供了一个功能，当你的某个socket可读或者可写的时候，它可以给你一个通知。这样当配合非阻塞的socket使用时，只有当系统通知我哪个描述符可读了，我才去执行read操作，可以保证每次read都能读到有效数据而不做纯返回-1和EAGAIN的无用功，写操作类似。

操作系统的这个功能是通过select/poll/epoll/kqueue之类的系统调用函数来实现，这些函数都可以同时监视多个描述符的读写就绪状况，这样，多个描述符的I/O操作都能在一个线程内并发交替地顺序完成，这就叫I/O多路复用，这里的**“多路”指的是多个网络连接，“复用”指的是复用同一个Redis处理线程。（正如上图所示）**

采用多路 I/O 复用技术可以让单个线程高效的处理多个连接请求（尽量减少网络 I/O 的时间消耗），且 Redis 在内存中操作数据的速度非常快，也就是说内存内的操作不会成为影响Redis性能的瓶颈，所有 Redis 具有很高的吞吐量。

#### 3、常见疑问解答

**3.1、Redis的单线程为什么这么快？**

1.完全基于内存，绝大部分请求是纯粹的内存操作，非常快速。数据存在内存中，类似于HashMap，HashMap的优势就是查找和操作的时间复杂度都是O(1)；

2.数据结构简单，对数据操作也简单，Redis中的数据结构是专门进行设计的；

3.采用单线程，避免了不必要的上下文切换和竞争条件，也不存在多进程或者多线程导致的切换而消耗 CPU，不用去考虑各种锁的问题，不存在加锁释放锁操作，没有因为可能出现死锁而导致的性能消耗；

4.使用多路I/O复用模型，非阻塞I/O；

5.Redis直接自己构建了VM 机制 ，因为一般的系统调用系统函数的话，会浪费一定的时间去移动和请求；

**3.2、为什么不采用多进程或多线程处理？**

1.多线程处理可能涉及到锁

2.多线程处理会涉及到线程切换而消耗CPU

**3.3、单线程处理的缺点？**

1.耗时的命令会导致并发的下降，不只是读并发，写并发也会下降

2.无法发挥多核CPU性能，不过可以通过在单机开多个Redis实例来完善

**3.4、Redis不存在线程安全问题？**

Redis采用了线程封闭的方式，把任务封闭在一个线程，自然避免了线程安全问题，不过对于需要依赖多个redis操作（即：多个Redis操作命令）的复合操作来说，依然需要锁，而且有可能是分布式锁。

**3.5、Redis6.0后支持多线程版本？**

 Redis 的多线程部分只是用来处理网络数据的读写和协议解析，执行命令仍然是单线程。之所以这么设计是不想因为多线程而变得复杂，需要去控制 key、lua（一种轻量级脚本语言）、事务，LPUSH/LPOP（redis语法：将一个或多个值插入到列表头部（左边）、移出并获取列表的第一个元素(左边)） 等等的并发问题。整体的设计大体如下:
<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/db/redis/sumary1/20200803222400128.jpg')" alt="wxmp">


## 参考文章
* https://blog.csdn.net/khuangliang/article/details/107774704