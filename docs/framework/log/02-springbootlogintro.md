---
title: SpringBoot-常用日志框架
---

::: tip
本文主要是介绍  SpringBoot-常用日志框架。
:::

[[toc]]

## SpringBoot日志框架的选择及使用原理

### 1 日志框架介绍

对于我们日常开发日志是经常使用的，当然以前的我们可能还傻傻的各种`System.out.println("重要数据")`在控制台输出各种重要数据呢，投入生产的时候再注释掉。到现在为止呢，已经有很多日志可供选择了，而市面上常见的日志框架有很多，比如：JCL、SLF4J、Jboss-logging、jUL、log4j、log4j2、logback等等，我们该如何选择呢？
**市面上的日志框架；**

JUL、JCL、Jboss-logging、logback、log4j、log4j2、slf4j…

| 日志的抽象层                                                                             | 日志实现                                          |
| ---------------------------------------------------------------------------------------- | ------------------------------------------------- |
| JCL（Jakarta Commons Logging） SLF4j（Simple Logging Facade for Java） **jboss-logging** | Log4j JUL（java.util.logging） Log4j2 **Logback** |

左边选一个抽象层、右边来选一个实现；类似与我们经常使用的JDBC一样，选择不同的数据库驱动。

- 下面我们先看看日志的抽象层：JCL大家应该很熟悉，Commons Logging，spring中常用的框架最后一次更新2014年~~~；jboss-logging使用的场景太少了；就剩下SLF4j了也是我们springboot中使用的日志抽象层。
  
- 日志实现：大家应该看着都很熟悉把Log4j大家应该用的挺多的，Logback是Log4j的升级版本出至于同一个人开发的，考虑到以后的升级使用等问题，又写出了SLF4j的日志抽象层使用起来更加灵活。JUL（java.util.logging）一看就知道是java util包下的；Log4j2 咋一看像是Log4j的升级版本，其实并不是，它是apache下生产的日志框架。

**SpringBoot选用 SLF4j和logback**

### 2 SLF4j使用原理

[SL4j官网](https://www.slf4j.org/)
在使用手册中给我们写了一个著名的Hello world

``` java
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class HelloWorld {
public static void main(String[] args) {
Logger logger = LoggerFactory.getLogger(HelloWorld.class);
logger.info("Hello World");
}
}
```

下面我们看一张图到底如何使用：
<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/framework/log/2018110915400918.png')" alt="wxmp">

我们现在已经知道了springboot中使用的是 SLF4j和logback，但是如果我们想使用log4j该怎么办呢，从上面的图示中我们可以看出想要使用log4j我们肯定还是要使用 SLF4j作为抽象层，但是中间给我们加入了一层适配层（Adaptation layer）然后使用log4j进行实现，那么我们需要导入图示中的jar包即可，其他的也是一样了。所以说，**以后开发的时候，日志记录方法的调用，不应该来直接调用日志的实现类，而是调用日志抽象层里面的方法；** 每一个日志的实现框架都有自己的配置文件。使用slf4j以后，**配置文件还是做成日志实现框架自己本身的配置文件；**

- **可能存在的问题**
  现在开发中我么想使用slf4j+logback，但是对于一些遗留项目中例如Spring（commons-logging）、Hibernate（jboss-logging）…等等，如何去做到日志同一呢？

  你想到的问题SLF4j能想不到吗？答案是可以的，我们看看下面的图就明白了

  [官方地址](https://www.slf4j.org/legacy.html)

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/framework/log/20181109162021564.png')" alt="wxmp">

**如何让系统中所有的日志都统一到slf4j；**

1、将系统中其他日志框架先排除出去；

2、用中间包来替换原有的日志框架；

3、我们导入slf4j其他的实现

其实通过idea我们创建一个springboot项目也可以查看日志依赖（截取其中部分）：
SpringBoot使用它来做日志功能：

```xml
<dependency>
<groupId>org.springframework.boot</groupId>
<artifactId>spring-boot-starter-logging</artifactId>
</dependency>

```

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/framework/log/20181109163259389.png')" alt="wxmp">

**SpringBoot能自动适配所有的日志，而且底层使用slf4j+logback的方式记录日志，引入其他框架的时候，只需要把这个框架依赖的日志框架排除掉即可；**

- 例如

```xml
<dependency>
<groupId>org.springframework</groupId>
<artifactId>spring-core</artifactId>
<exclusions>
<exclusion>
<groupId>commons-logging</groupId>
<artifactId>commons-logging</artifactId>
</exclusion>
</exclusions>
</dependency>
12345678910
```

### 3 SpringBoot日志的默认配置

```java
package cn.zhangyu;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.applet.AppletContext;

@RunWith(SpringRunner.class)
@SpringBootTest
public class Springboot1ApplicationTests {
//记录器
Log log = LogFactory.getLog(Springboot1ApplicationTests.class);

@Test
public void test(){
//日志的级别；
//由低到高 trace<debug<info<warn<error
//可以调整输出的日志级别；日志就只会在这个级别以以后的高级别生效
log.trace("trace级别的日志");
log.debug("debug级别的日志");
//SpringBoot默认给我们使用的是info级别的，没有指定级别的就用SpringBoot默认规定的级别；root级别
log.info("info级别的日志");
log.warn("warn级别的日志");
log.error("error级别的日志");

}
}
```

- 其他配置

``` properties
#修改日志的级别，默认root是info
#logging.level.root=trace

# 不指定路径在当前项目下生成springboot.log日志
#logging.file=springboot.log
# 可以指定完整的路径；
logging.file=d://springboot.log

# 在当前磁盘的根路径下创建spring文件夹和里面的log文件夹；使用spring.log 作为默认文件
logging.path=/spring/log

# 在控制台输出的日志的格式
logging.pattern.console=%d{yyyy-MM-dd HH:mm:ss.SSS} [%thread] %-5level %logger{50} - %msg%n
# 指定文件中日志输出的格式
logging.pattern.file=%d{yyyy-MM-dd} === [%thread] === %-5level === %logger{50} ==== %msg%n
123456789101112131415
日志输出格式：
%d表示日期时间，
%thread表示线程名，
%-5level：级别从左显示5个字符宽度
%logger{50} 表示logger名字最长50个字符，否则按照句点分割。 
%msg：日志消息，
%n是换行符

```

### 4 SpringBoot指定日志文件

给类路径下放上每个日志框架自己的配置文件即可；SpringBoot就不使用他默认配置的了

| Logging System          | Customization                                                                    |
| ----------------------- | -------------------------------------------------------------------------------- |
| Logback                 | `logback-spring.xml`, `logback-spring.groovy`, `logback.xml` or `logback.groovy` |
| Log4j2                  | `log4j2-spring.xml` or `log4j2.xml`                                              |
| JDK (Java Util Logging) | `logging.properties`                                                             |

logback.xml：直接就被日志框架识别了；**logback-spring.xml**：如果使用`logback-spring.xml`，日志框架就不直接加载日志的配置项，需要加上`springProfile`标签由SpringBoot解析日志配置，即可以使用SpringBoot的高级Profile功能

```xml
<springProfile name="staging">
    <!-- configuration to be enabled when the "staging" profile is active -->
   可以指定某段配置只在某个环境下生效
</springProfile>

```

如：

```xml
<appender name="stdout" class="ch.qos.logback.core.ConsoleAppender">
        <!--
        日志输出格式：
   %d表示日期时间，
   %thread表示线程名，
   %-5level：级别从左显示5个字符宽度
   %logger{50} 表示logger名字最长50个字符，否则按照句点分割。 
   %msg：日志消息，
   %n是换行符
        -->
        <layout class="ch.qos.logback.classic.PatternLayout">
            <springProfile name="dev">
                <pattern>%d{yyyy-MM-dd HH:mm:ss.SSS} ----> [%thread] ---> %-5level %logger{50} - %msg%n</pattern>
            </springProfile>
            <springProfile name="!dev">
                <pattern>%d{yyyy-MM-dd HH:mm:ss.SSS} ==== [%thread] ==== %-5level %logger{50} - %msg%n</pattern>
            </springProfile>
        </layout>
    </appender>

```

如果使用logback.xml作为日志配置文件，还要使用profile功能，会有以下错误 `no applicable action for [springProfile]`

## 5 切换日志框架

可以按照idea中maven的关系图，进行相关的切换；

**slf4j+log4j的方式**；（不推荐，只是教大家如何切换）

- pom.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
	<modelVersion>4.0.0</modelVersion>

	<groupId>cn.zhangyu</groupId>
	<artifactId>springboot-1</artifactId>
	<version>0.0.1-SNAPSHOT</version>
	<packaging>jar</packaging>

	<name>springboot-1</name>
	<description>Demo project for Spring Boot</description>

	<parent>
		<groupId>org.springframework.boot</groupId>
		<artifactId>spring-boot-starter-parent</artifactId>
		<version>2.0.5.RELEASE</version>
		<relativePath/> <!-- lookup parent from repository -->
	</parent>

	<properties>
		<project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
		<project.reporting.outputEncoding>UTF-8</project.reporting.outputEncoding>
		<java.version>1.8</java.version>
	</properties>

	<dependencies>
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter</artifactId>
			<exclusions>
				<exclusion>
					<artifactId>log4j-to-slf4j</artifactId>
					<groupId>org.apache.logging.log4j</groupId>
				</exclusion>
				<exclusion>
					<artifactId>logback-classic</artifactId>
					<groupId>ch.qos.logback</groupId>
				</exclusion>
			</exclusions>
		</dependency>

		<dependency>
			<groupId>org.slf4j</groupId>
			<artifactId>slf4j-log4j12</artifactId>
		</dependency>

		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-test</artifactId>
			<scope>test</scope>
		</dependency>

		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-configuration</artifactId>
			<optional>true</optional>
		</dependency>
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-web</artifactId>
		</dependency>

	</dependencies>

	<build>
		<plugins>
			<plugin>
				<groupId>org.springframework.boot</groupId>
				<artifactId>spring-boot-maven-plugin</artifactId>
			</plugin>
		</plugins>
	</build>


</project>

```

- 在resource目录下添加log4j.properties

```properties
### set log levels ###
log4j.rootLogger = debug ,  stdout ,  D ,  E

### 输出到控制台 ###
log4j.appender.stdout = org.apache.log4j.ConsoleAppender
log4j.appender.stdout.Target = System.out
log4j.appender.stdout.layout = org.apache.log4j.PatternLayout
log4j.appender.stdout.layout.ConversionPattern =  %d{ABSOLUTE} ===== %5p %c{ 1 }:%L - %m%n

#### 输出到日志文件 ###
#log4j.appender.D = org.apache.log4j.DailyRollingFileAppender
#log4j.appender.D.File = logs/log.log
#log4j.appender.D.Append = true
#log4j.appender.D.Threshold = DEBUG ## 输出DEBUG级别以上的日志
#log4j.appender.D.layout = org.apache.log4j.PatternLayout
#log4j.appender.D.layout.ConversionPattern = %-d{yyyy-MM-dd HH:mm:ss}  [ %t:%r ] - [ %p ]  %m%n
#
#### 保存异常信息到单独文件 ###
#log4j.appender.D = org.apache.log4j.DailyRollingFileAppender
#log4j.appender.D.File = logs/error.log ## 异常日志文件名
#log4j.appender.D.Append = true
#log4j.appender.D.Threshold = ERROR ## 只输出ERROR级别以上的日志!!!
#log4j.appender.D.layout = org.apache.log4j.PatternLayout
#log4j.appender.D.layout.ConversionPattern = %-d{yyyy-MM-dd HH:mm:ss}  [ %t:%r ] - [ %p ]  %m%n


```

- 修改为log4j2

``` xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
	<modelVersion>4.0.0</modelVersion>

	<groupId>cn.zhangyu</groupId>
	<artifactId>springboot-1</artifactId>
	<version>0.0.1-SNAPSHOT</version>
	<packaging>jar</packaging>

	<name>springboot-1</name>
	<description>Demo project for Spring Boot</description>

	<parent>
		<groupId>org.springframework.boot</groupId>
		<artifactId>spring-boot-starter-parent</artifactId>
		<version>2.0.5.RELEASE</version>
		<relativePath/> <!-- lookup parent from repository -->
	</parent>

	<properties>
		<project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
		<project.reporting.outputEncoding>UTF-8</project.reporting.outputEncoding>
		<java.version>1.8</java.version>
	</properties>

	<dependencies>
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter</artifactId>
			<exclusions>
				<exclusion>
					<artifactId>spring-boot-starter-logging</artifactId>
					<groupId>org.springframework.boot</groupId>
				</exclusion>
			</exclusions>
		</dependency>

		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-log4j2</artifactId>
		</dependency>

		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-test</artifactId>
			<scope>test</scope>
		</dependency>

		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-configuration</artifactId>
			<optional>true</optional>
		</dependency>
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-web</artifactId>
		</dependency>

	</dependencies>

	<build>
		<plugins>
			<plugin>
				<groupId>org.springframework.boot</groupId>
				<artifactId>spring-boot-maven-plugin</artifactId>
			</plugin>
		</plugins>
	</build>
</project>
```



## 参考文章
* https://blog.csdn.net/xintonghanchuang/article/details/90752323