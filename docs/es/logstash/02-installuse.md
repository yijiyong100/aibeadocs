---
title: Logstash-安装使用
---

::: tip
本文主要是介绍 Logstash-安装使用 。
:::

[[toc]]

## Logstash使用详解

> 　　Logstash是一款轻量级的日志搜集处理框架，可以方便的把分散的、多样化的日志搜集起来，并进行自定义的处理，然后传输到指定的位置，比如某个服务器或者文件。
>
> 　　本文针对[官方文档](https://www.elastic.co/guide/en/logstash/current/index.html)进行翻译以及实践，希望有更多的有用户了解、使用这款工具。

## 下载、安装、使用

　　这款工具是开箱即用的软件，[下载地址戳这里](https://www.elastic.co/downloads/logstash)，下载自己对应的系统版本即可。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/es/logstash/install/449064-20150912114217028-2060652.png')" alt="wxmp">

　　下载后直接解压，就可以了。

 

　　通过命令行，进入到logstash/bin目录，执行下面的命令：

``` shell
logstash -e ""
```

　　可以看到提示下面信息（这个命令稍后介绍），**输入hello world!**

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/es/logstash/install/449064-20150912120946325-1382526148.png')" alt="wxmp">

　　可以看到logstash尾我们自动添加了几个字段，时间戳@timestamp，版本@version，输入的类型type，以及主机名host。

## 工作原理

　　Logstash使用管道方式进行日志的搜集处理和输出。有点类似*NIX系统的管道命令 **xxx | ccc | ddd**，xxx执行完了会执行ccc，然后执行ddd。

　　在logstash中，包括了三个阶段:

　　**输入input --> 处理filter（不是必须的） --> 输出output**

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/es/logstash/install/449064-20150912115455559-525747352.png')" alt="wxmp">

　　每个阶段都由很多的插件配合工作，比如file、elasticsearch、redis等等。

　　每个阶段也可以指定多种方式，比如输出既可以输出到elasticsearch中，也可以指定到stdout在控制台打印。

 

　　由于这种插件式的组织方式，使得logstash变得易于扩展和定制。

## 命令行中常用的命令

　　-f：通过这个命令可以指定Logstash的配置文件，根据配置文件配置logstash

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/es/logstash/install/449064-20150912122337965-1219152269.png')" alt="wxmp">

　　-e：后面跟着字符串，该字符串可以被当做logstash的配置（如果是“” 则默认使用stdin作为输入，stdout作为输出）

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/es/logstash/install/449064-20150912121208137-496683476.png')" alt="wxmp">

　　-l：日志输出的地址（默认就是stdout直接在控制台中输出）

　　-t：测试配置文件是否正确，然后退出。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/es/logstash/install/449064-20150912122104215-1167629390.png')" alt="wxmp">

## 配置文件说明

　　前面介绍过logstash基本上由三部分组成，input、output以及用户需要才添加的filter，因此标准的配置文件格式如下：

``` shell
input {...} 
filter {...} 
output {...}
```

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/es/logstash/install/449064-20150912120202262-1671564203.png')" alt="wxmp">　　

　　在每个部分中，也可以指定多个访问方式，例如我想要指定两个日志来源文件，则可以这样写：

``` shell
input { 
 file { path =>"/var/log/messages" type =>"syslog"} 
 file { path =>"/var/log/apache/access.log" type =>"apache"} 
}
```

　　类似的，如果在filter中添加了多种处理规则，则按照它的顺序一一处理，但是有一些插件并不是线程安全的。

　　比如在filter中指定了两个一样的的插件，这两个任务并不能保证准确的按顺序执行，因此官方也推荐避免在filter中重复使用插件。

 

　　说完这些，简单的创建一个配置文件的小例子看看：



``` shell
input {
    file {　　　　 #指定监听的文件路径，注意必须是绝对路径
        path => "E:/software/logstash-1.5.4/logstash-1.5.4/data/test.log"
        start_position => beginning
    }
}
filter {
    
}
output {
    stdout {}
}
```



　　日志大致如下：

``` shell
1 hello,this is first line in test.log!
2 hello,my name is xingoo!
3 goodbye.this is last line in test.log!4 
```

　　注意最后有一个空行。

　　执行命令得到如下信息：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/es/logstash/install/449064-20150912122348497-608458129.png')" alt="wxmp">

　　细心的会发现，这个日志输出与上面的logstash -e "" 并不相同，这是因为上面的命令默认指定了返回的格式是json形式。

 

　　至此，就是logstash入门篇的介绍了，稍后会介绍关于logstash更多的内容，感兴趣的可以关注哦！

## 参考

【1】Logstash官方文档：[https://www.elastic.co/guide/en/logstash/current/index.html　](https://www.elastic.co/guide/en/logstash/current/index.html)[　](https://www.elastic.co/guide/en/logstash/current/index.html)

作者：[xingoo](http://www.cnblogs.com/xing901022)

出处：http://www.cnblogs.com/xing901022

本文版权归作者和博客园共有。欢迎转载，但必须保留此段声明，且在文章页面明显位置给出原文连接！



## 参考文章
* http://www.cnblogs.com/xing901022