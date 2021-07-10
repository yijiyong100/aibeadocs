---
title: 参数配置优化
---

::: tip
本文主要是介绍 参数配置优化 。
:::

[[toc]]

 

## 一、全局配置

### （1）max_connections
最大连接数。默认值是151，最多2000。如果服务器的并发连接请求量比较大，建议调高此值，以增加并行连接数量。但是如果连接数越多，介于MySQL会为每个连接提供连接缓冲区，就会开销越多的内存，所以要适当调整该值。
查看最大连接数

``` sql
mysql> SHOW VARIABLES LIKE 'max_connections';
```

查看响应的连接数

``` sql
mysql> SHOW STATUS LIKE 'max%connections';
```

max_used_connections / max_connections \* 100% （理想值≈85%） 
如果max_used_connections跟max_connections相同 那么就是max_connections设置过低或者超过服务器负载上限了，低于10%则设置过大。
### （2）back_log
MySQL能暂存的连接数量，默认值是80，最多512，可设置为128。如果MySQL的连接数据达到max_connections时，新来的请求将会被存在堆栈中，以等待某一连接释放资源，*该堆栈的数量即back_log\*。如果等待连接的数量超过back_log，将不被授予连接资源。当主要MySQL线程在一个很短时间内得到非常多的连接请求，这就起作用。类似于线程池
### （3）key_buffer_size
索引缓冲区的大小，它决定索引处理的速度，尤其是索引读的速度。
通过检查状态值Key_read_requests和Key_reads，可以知道key_buffer_size设置是否合理。


``` sql
mysql> SHOW STATUS LIKE 'key_read%';
+-------------------+----------+
| Variable_name     | Value    |
+-------------------+----------+
| Key_read_requests | 90585564 |
| Key_reads         | 97031    |
+-------------------+----------+
```





计算索引未命中缓存的概率：
key_cache_miss_rate = Key_reads / Key_read_requests * 100%，设置在1/1000左右较好
key_buffer_size只对MyISAM表起作用。即使你不使用MyISAM表，但是内部的临时磁盘表是MyISAM表，也要使用该值。
默认配置数值是8388608(8M)，主机有4GB内存，可改为268435456(256M)
### （4）query_cache_size
使用查询缓存(query cache)，MySQL将查询结果存放在缓冲区中，今后对于同样的SELECT语句（区分大小写），将直接从缓冲区中读取结果。
最佳选项是将其从一开始就停用，设为0（现在MySQL 5.6的默认值）并利用其他方法加速查询：优化索引、增加拷贝分散负载或者启用额外的缓存（比如Redis或Memcached）。
通过检查状态值qcache_*，可以知道query_cache_size设置是否合理





``` sql
mysql> SHOW STATUS LIKE 'qcache%';
+-------------------------+----------+
| Variable_name           | Value    |
+-------------------------+----------+
| Qcache_free_blocks      | 1        |
| Qcache_free_memory      | 1031360  |
| Qcache_hits             | 0        |
| Qcache_inserts          | 0        |
| Qcache_lowmem_prunes    | 0        |
| Qcache_not_cached       | 10302865 |
| Qcache_queries_in_cache | 0        |
| Qcache_total_blocks     | 1        |
+-------------------------+----------+
```





查询缓存碎片率 = Qcache_free_blocks / Qcache_total_blocks * 100%
如果查询缓存碎片率超过20%，可以用FLUSH QUERY CACHE整理缓存碎片，或者试试减小query_cache_min_res_unit，如果你的查询都是小数据量的话。
查询缓存利用率 = (query_cache_size – Qcache_free_memory) / query_cache_size * 100%
查询缓存利用率在25%以下的话说明query_cache_size设置的过大，可适当减小；查询缓存利用率在80％以上而且Qcache_lowmem_prunes > 50的话说明query_cache_size可能有点小，要不就是碎片太多。
查询缓存命中率 = (Qcache_hits – Qcache_inserts) / Qcache_hits * 100%
如果Qcache_lowmem_prunes的值非常大，则表明经常出现缓冲不够的情况，如果Qcache_hits的值也非常大，则表明查询缓冲使用非常频繁，此时需要增加缓冲大小；如果Qcache_hits的值不大，则表明你的查询重复率很低，这种情况下使用查询缓冲反而会影响效率，那么可以考虑不用查询缓冲。此外，在SELECT语句中加入SQL_NO_CACHE可以明确表示不使用查询缓冲。
与查询缓冲有关的参数还有query_cache_type、query_cache_limit、query_cache_min_res_unit。
query_cache_type指定是否使用查询缓冲，可以设置为0、1、2，该变量是SESSION级的变量。
query_cache_limit指定单个查询能够使用的缓冲区大小，缺省为1M。
query_cache_min_res_unit指定分配缓冲区空间的最小单位，缺省为4K。检查状态值Qcache_free_blocks，如果该值非常大，则表明缓冲区中碎片很多，这就表明查询结果都比较小，此时需要减小query_cache_min_res_unit。
### （5）read_buffer_size
是MySQL读入缓冲区的大小，将对表进行顺序扫描的请求将分配一个读入缓冲区，MySQL会为它分配一段内存缓冲区，read_buffer_size变量控制这一缓冲区的大小，如果对表的顺序扫描非常频繁，并你认为频繁扫描进行的太慢，可以通过增加该变量值以及内存缓冲区大小提高其性能。
默认数值是131072(128K)，可改为16773120(16M)
### （6）read_rnd_buffer_size
随机读缓冲区大小。当按任意顺序读取行时(例如，按照排序顺序)，将分配一个随机读缓存区。进行排序查询时，MySQL会首先扫描一遍该缓冲，以避免磁盘搜索，提高查询速度，如果需要排序大量数据，可适当调高该值。但MySQL会为每个客户连接发放该缓冲空间，所以应尽量适当设置该值，以避免内存开销过大。
默认数值是262144(256K)，可改为16777208(16M)
### （7）sort_buffer_size
每个需要进行排序的线程分配该大小的一个缓冲区。增加这值加速ORDER BY或GROUP BY操作。
默认数值是10485760(1M)，可改为16777208(16M)
### （8）join_buffer_size
联合查询操作所能使用的缓冲区大小
read_buffer_size，read_rnd_buffer_size，sort_buffer_size，join_buffer_size为每个线程独占，也就是说，如果有100个线程连接，则占用为16M*100
### （9）table_open_cache
表高速缓存的大小。每当MySQL访问一个表时，如果在表缓冲区中还有空间，该表就被打开并放入其中，这样可以更快地访问表内容。
通过检查峰值时间的状态值Open_tables和Opened_tables，可以决定是否需要增加table_cache的值。





``` sql
mysql> SHOW STATUS LIKE 'open%tables';
+---------------+-------+
| Variable_name | Value |
+---------------+-------+
| Open_tables   | 2000  |
| Opened_tables | 0     |
+---------------+-------+
```





如果open_tables等于table_cache，并且opened_tables在不断增长，那么就需要增加table_cache的值了。注意，不能盲目地把table_cache设置成很大的值。如果设置得太高，可能会造成文件描述符不足，从而造成性能不稳定或者连接失败。
1G内存机器，推荐值是128-256。内存在4GB左右的服务器该参数可设置为256M或384M。
### （10）max_heap_table_size
用户可以创建的内存表(memory table)的大小。这个值用来计算内存表的最大行数值。
这个变量和tmp_table_size一起限制了内部内存表的大小。如果某个内部heap（堆积）表大小超过tmp_table_size，MySQL可以根据需要自动将内存中的heap表改为基于硬盘的MyISAM表。
### （11）tmp_table_size
临时表的大小，例如做高级GROUP BY操作生成的临时表。如果调高该值，MySQL同时将增加heap表的大小，可达到提高联接查询速度的效果，建议尽量优化查询，要确保查询过程中生成的临时表在内存中，避免临时表过大导致生成基于硬盘的MyISAM表。





``` sql
mysql> SHOW GLOBAL STATUS LIKE 'created_tmp%';
+-------------------------+----------+
| Variable_name           | Value    |
+-------------------------+----------+
| Created_tmp_disk_tables | 2884297  |
| Created_tmp_files       | 870      |
| Created_tmp_tables      | 15899696 |
+-------------------------+----------+
```


每次创建临时表，Created_tmp_tables增加，如果临时表大小超过tmp_table_size，则是在磁盘上创建临时表，Created_tmp_disk_tables也增加。
Created_tmp_files表示MySQL服务创建的临时文件文件数，比较理想的配置是：
Created_tmp_disk_tables / Created_tmp_tables * 100% <= 25%
### （12）thread_cache_size
线程缓存。当客户端断开之后，服务器处理此客户的线程将会缓存起来以响应下一个客户而不是销毁（前提是缓存数未达上限）。





``` sql
mysql> SHOW STATUS LIKE 'threads%';
+-------------------+---------+
| Variable_name     | Value   |
+-------------------+---------+
| Threads_cached    | 5       |
| Threads_connected | 13      |
| Threads_created   | 1095313 |
| Threads_running   | 1       |
+-------------------+---------+
```





Threads_cached :代表当前此时此刻线程缓存中有多少空闲线程。如果过大，表明MySQL服务器一直在创建线程，这也是比较耗资源，可以适当增加thread_cache_size
Threads_connected :代表当前已建立连接的数量，因为一个连接就需要一个线程，所以也可以看成当前被使用的线程数。
Threads_created :代表从最近一次服务启动，已创建线程的数量。
Threads_running :代表当前激活的（非睡眠状态）线程数。并不是代表正在使用的线程数，有时候连接已建立，但是连接处于sleep状态，这里相对应的线程也是sleep状态。
建议设置接近Threads_connected值，再结合物理内存：1G-8；2G-16；3G-32 综合考虑一下值。
（13）interactive_timeout
一个交互连接在被服务器在关闭前等待行动的秒数。默认值是28800（8小时），可设置为7200。
（14）wait_timeout
一个非交互连接在被服务器在关闭前等待行动的秒数。要同时设置interactive_timeout和wait_timeout才会生效。

## 二、InnoDB配置

### （1）innodb_buffer_pool_size
缓冲池的大小，缓存数据和索引，对InnoDB整体性能影响较大，相当于MyISAM的key_buffer_size。如果只用Innodb，可以把这个值设为内存的70%-80%。越大越好，这能保证你在大多数的读取操作时使用的是内存而不是硬盘。
### （2）innodb_log_buffer_size 
尚未执行的事务的缓存大小，默认值为8M，一般8M-16M。如果你有很多事务的更新，插入或删除操作，通过这个参数会大量的节省了磁盘I/O。但是如果你的事务中包含有二进制大对象或者大文本字段的话，这点缓存很快就会被填满并触发额外的I/O操作。看看Innodb_log_waits状态变量，如果它不是0，应该增大这个值。但太大了也是浪费内存，因为1秒钟总会flush一次，所以不需要设到超过1秒的需求。
### （3）innodb_flush_log_at_trx_commit
把log buffer的数据写入日志文件并flush磁盘的策略，该值对插入数据的速度影响非常大。取值分别为0、1(默认值)、2(推荐值)
0：事务提交时，不写入磁盘，而是每秒把log buffer的数据写入日志文件，并且flush(刷到磁盘)。速度最快，但不安全。mysqld进程的崩溃会导致上一秒钟所有事务数据的丢失。
1：每次事务提交时把log buffer的数据写入日志文件，并且flush(刷到磁盘)。最安全，但也最慢。确保了事务的ACID。
2：每次事务提交时把log buffer的数据写入日志文件，每秒flush(刷到磁盘)。速度较快，比0安全。操作系统崩溃或者系统断电会导致上一秒钟所有事务数据的丢失。
### （4）innodb_log_file_size
在一个日志组每个日志文件的大小，用于确保写操作快速而可靠并且在崩溃时恢复。一般用64M-512M，具体取决于服务器的空间。大的文件提供更高的性能，但数据库恢复时会用更多的时间。
### （5）innodb_additional_mem_pool_size
存储数据字典和其他内部数据结构的内存池大小。默认为1M，对于2G内存的机器，推荐值是20M，通常不用太大，应该与表结构的复杂度有关系。如果不够用，MySQL会在错误日志中写入一条警告信息。
### （6）innodb_buffer_pool_instances
可以开启多个内存缓冲池，这样可以并行的内存读写。默认为8，一般为1-8。最常1s就会刷新一次，故不用太大。对于较大的事务，可以增大缓存大小。如果InnoDB缓存池被划分成多个区域，建议每个区域不小于1GB的空间。
### （7）thread_concurrency
修改thread_concurrency值，由目前默认的8，修改为64 thread_concurrency=64
thread_concurrency应设为CPU核数的2倍.
比如有1个双核的CPU, 那thread_concurrency 的应该为4;
2个双核的cpu, thread_concurrency的值应为8.
show variables like 'thread_concurrency';


## 参考文章
* https://www.cnblogs.com/shoshana-kong/p/10517396.html
* https://www.cnblogs.com/brant/p/10955508.html