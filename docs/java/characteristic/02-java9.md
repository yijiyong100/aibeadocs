---
title: Java 9语言新特性
---


::: tip
本文主要是介绍 Java 9语言新特性 。
:::

[[toc]]

本文主要讲述一下Java9的新特性

## 特性列表

完整的特性详见[JDK 9 features](http://openjdk.java.net/projects/jdk9/)，这里列几个相对重要的：

### 模块系统JPMS(`重磅`)

> 相关的规范及JEP:

- [Java Platform Module System (JSR 376)](http://openjdk.java.net/projects/jigsaw/spec/)
- [JEP 261: Module System](http://openjdk.java.net/jeps/261)
- [JEP 200: The Modular JDK](http://openjdk.java.net/jeps/200)
- [JEP 201: Modular Source Code](http://openjdk.java.net/jeps/201)
- [JEP 282: jlink: The Java Linker](http://openjdk.java.net/jeps/282)
- [JEP 220: Modular Run-Time Images](http://openjdk.java.net/jeps/220)
- [JEP 260: Encapsulate Most Internal APIs](http://openjdk.java.net/jeps/260)

> 相关解读

- [java9系列(三)模块系统精要](https://segmentfault.com/a/1190000013357446)
- [java9 opens与exports的区别](https://segmentfault.com/a/1190000013409571)
- [java9迁移注意事项](https://segmentfault.com/a/1190000013398709)
- [java9 module相关选项解析](https://segmentfault.com/a/1190000013440386)

### G1成为默认垃圾回收器

> 相关JEP:

- [JEP 248: Make G1 the Default Garbage Collector](http://openjdk.java.net/jeps/248)
- [JEP 291: Deprecate the Concurrent Mark Sweep (CMS) Garbage Collector](http://openjdk.java.net/jeps/291)
- [JEP 278: Additional Tests for Humongous Objects in G1](http://openjdk.java.net/jeps/278)

> 相关解读

- [java9系列(九)Make G1 the Default Garbage Collector](https://segmentfault.com/a/1190000013615459)

### Unified JVM/GC Logging

> 相关JEP:

- [JEP 158: Unified JVM Logging](http://openjdk.java.net/jeps/158)
- [JEP 264: Platform Logging API and Service](http://openjdk.java.net/jeps/264)
- [JEP 271: Unified GC Logging](http://openjdk.java.net/jeps/271)

> 相关解读

- [java9 gc log参数迁移](https://segmentfault.com/a/1190000013475524)

### HTTP/2 Client(Incubator)

支持HTTP2，同时改进httpclient的api，支持异步模式。

> 相关JEP

- [JEP 110: HTTP/2 Client (Incubator)](http://openjdk.java.net/jeps/110)

> 相关解读

- [java9系列(六)HTTP/2 Client (Incubator)](https://segmentfault.com/a/1190000013518969)

### jshell: The Java Shell (Read-Eval-Print Loop)

> 相关JEP

- [JEP 222: jshell: The Java Shell (Read-Eval-Print Loop)](http://openjdk.java.net/jeps/222)

> 相关解读

- [java9系列(一)安装及jshell使用](https://segmentfault.com/a/1190000011321448)

### Convenience Factory Methods for Collections

> 相关JEP

- [JEP 269: Convenience Factory Methods for Collections](http://openjdk.java.net/jeps/269)

以前大多使用Guava类库集合类的工厂，比如

```
Lists.newArrayList(1,2,3,4,5);
Sets.newHashSet(1,2,3,4,5);
Maps.newHashMap();
```

> 注意，上面这种返回的集合是mutable的

现在java9可以直接利用jdk内置的集合工厂，比如

```
List.of(1,2,3,4,5);
Set.of(1,2,3,4,5);
Map.of("key1","value1","key2","value2","key3","value3");
```

> 注意，jdk9上面这种集合工厂返回的是immutable的

### Process API Updates

> 相关JEP

- [JEP 102: Process API Updates](http://openjdk.java.net/jeps/102)

> 相关解读

- [java9系列(四)Process API更新](https://segmentfault.com/a/1190000013496056)

### Stack-Walking API

> 相关JEP

- [JEP 259: Stack-Walking API](http://openjdk.java.net/jeps/259)

> 相关解读

- [java9系列(五)Stack-Walking API](https://segmentfault.com/a/1190000013506140)

### Variable Handles

> 相关JEP

- [JEP 193: Variable Handles](http://openjdk.java.net/jeps/193)

> 相关解读

- [java9系列(七)Variable Handles](https://segmentfault.com/a/1190000013544841)

### docker方面支持

- [Java SE support for Docker CPU and memory limits](https://blogs.oracle.com/java-platform-group/java-se-support-for-docker-cpu-and-memory-limits)
- [Docker CPU limits](https://bugs.openjdk.java.net/browse/JDK-8140793)
- [Experimental support for Docker memory limits](https://bugs.openjdk.java.net/browse/JDK-8170888)
- [Docker memory limits](https://bugs.openjdk.java.net/browse/JDK-8146115)

### 其他

- [JEP 238: Multi-Release JAR Files](http://openjdk.java.net/jeps/238)
  - [java9系列(八)Multi-Release JAR Files](https://segmentfault.com/a/1190000013584354)
- [JEP 266: More Concurrency Updates](http://openjdk.java.net/jeps/266)
- [JEP 274: Enhanced Method Handles](http://openjdk.java.net/jeps/274)
- [JEP 295: Ahead-of-Time Compilation](http://openjdk.java.net/jeps/295)

## 小结

java9大刀阔斧，重磅引入了模块化系统，自身jdk的类库也首当其冲模块化。新引入的jlink可以精简化jdk的大小，外加Alpine Linux的docker镜像，可以大大减少java应用的docker镜像大小，同时也支持了Docker的cpu和memory限制(`Java SE 8u131及以上版本开始支持`)，非常值得使用。


## 参考文章
* https://segmentfault.com/a/1190000013620826