---
title: SpringBoot整合Kafka
---

::: tip
本文主要是介绍 SpringBoot整合Kafka 。
:::

[[toc]]

## [SpringBoot整合kafka(实现producer和consumer)

本文代码使用的是Spring Boot 2.1.8.RELEASE 版本

### pom.xml 文件引入包

``` xml
<parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>2.1.8.RELEASE</version>
    <!-- 
    parent.relativePath用法：设定一个空值将始终从仓库中获取，不从本地路径获取
    查找顺序：relativePath元素中的地址 –> 本地仓库 –> 远程仓库
     -->
    <relativePath /> <!-- lookup parent from repository -->
</parent>
```



 

### 1、 pom.xml文件，引入依赖



``` xml
<!-- kafka依赖 begin -->
<dependency>
    <groupId>org.springframework.kafka</groupId>
    <artifactId>spring-kafka</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.kafka</groupId>
    <artifactId>spring-kafka-test</artifactId>
    <scope>test</scope>
</dependency>
<!-- kafka依赖 end -->
```



采用Kafka提供的StringSerializer和StringDeserializer进行序列化和反序列化

### 2、在application-dev.properties配置生产者



``` shell
#### kafka配置生产者 begin #### 
#============== kafka ===================
# 指定kafka server的地址，集群配多个，中间，逗号隔开
spring.kafka.bootstrap-servers=106.12.241.89:9092

#=============== provider  =======================
# 写入失败时，重试次数。当leader节点失效，一个repli节点会替代成为leader节点，此时可能出现写入失败，
# 当retris为0时，produce不会重复。retirs重发，此时repli节点完全成为leader节点，不会产生消息丢失。
spring.kafka.producer.retries=0
# 每次批量发送消息的数量,produce积累到一定数据，一次发送
spring.kafka.producer.batch-size=16384
# produce积累数据一次发送，缓存大小达到buffer.memory就发送数据
spring.kafka.producer.buffer-memory=33554432

#procedure要求leader在考虑完成请求之前收到的确认数，用于控制发送记录在服务端的持久化，其值可以为如下：
#acks = 0 如果设置为零，则生产者将不会等待来自服务器的任何确认，该记录将立即添加到套接字缓冲区并视为已发送。在这种情况下，无法保证服务器已收到记录，并且重试配置将不会生效（因为客户端通常不会知道任何故障），为每条记录返回的偏移量始终设置为-1。
#acks = 1 这意味着leader会将记录写入其本地日志，但无需等待所有副本服务器的完全确认即可做出回应，在这种情况下，如果leader在确认记录后立即失败，但在将数据复制到所有的副本服务器之前，则记录将会丢失。
#acks = all 这意味着leader将等待完整的同步副本集以确认记录，这保证了只要至少一个同步副本服务器仍然存活，记录就不会丢失，这是最强有力的保证，这相当于acks = -1的设置。
#可以设置的值为：all, -1, 0, 1
spring.kafka.producer.acks=1

# 指定消息key和消息体的编解码方式
spring.kafka.producer.key-serializer=org.apache.kafka.common.serialization.StringSerializer
spring.kafka.producer.value-serializer=org.apache.kafka.common.serialization.StringSerializer

#### kafka配置生产者 end #### 
```



### 3、生产者向kafka发送消息



``` java
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

/   
 *
 *
 * @author Lynch 
 */
@Controller
@RequestMapping("/api/kafka/")
public class KafkaController {
    @Autowired
    private KafkaTemplate<String,Object> kafkaTemplate;

    @GetMapping("send")
    @ResponseBody
    public boolean send(@RequestParam String message) {
        try {
            kafkaTemplate.send("testTopic", message);
            System.out.println("消息发送成功...");
        } catch (Exception e) {
            e.printStackTrace();
        }
        
        return true;
    }
    
    @GetMapping("test")
    @ResponseBody
    public String test(){
        System.out.println("hello world!");
        return "ok";
    }
}
```



 

### 4、在application-dev.properties配置消费者



``` shell
#### kafka配置消费者 start #### 
# 指定默认消费者group id --> 由于在kafka中，同一组中的consumer不会读取到同一个消息，依靠groud.id设置组名
spring.kafka.consumer.group-id=test
# smallest和largest才有效，如果smallest重新0开始读取，如果是largest从logfile的offset读取。一般情况下我们都是设置smallest
spring.kafka.consumer.auto-offset-reset=earliest
# enable.auto.commit:true --> 设置自动提交offset
spring.kafka.consumer.enable-auto-commit=true
#如果'enable.auto.commit'为true，则消费者偏移自动提交给Kafka的频率（以毫秒为单位），默认值为5000。
spring.kafka.consumer.auto-commit-interval=1000

# 指定消息key和消息体的编解码方式
spring.kafka.consumer.key-deserializer=org.apache.kafka.common.serialization.StringDeserializer
spring.kafka.consumer.value-deserializer=org.apache.kafka.common.serialization.StringDeserializer

#### kafka配置消费者 end #### 
```



 

### 5、消费者监听topic=testTopic的消息



``` java
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

/   
 * 消费者监听topic=testTopic的消息
 *
 * @author Lynch 
 */
@Component
public class ConsumerListener {
     
    @KafkaListener(topics = "testTopic")
    public void onMessage(String message){
        //insertIntoDb(buffer);//这里为插入数据库代码
        System.out.println("message: " + message);
    }

}
```



 

### 6、控制台打印消息



``` shell
http://localhost:8091/api/kafka/send?message=aaabbbccc

消息发送成功...
message: aaabbbccc

http://localhost:8091/api/kafka/send?message='1111' ##编解码方式是字符串，用单引号括起来表示字符串

消息发送成功...
message: '1111'
```



 

到此，采用Kafka提供的StringSerializer和StringDeserializer进行序列化和反序列化，因为此种序列化方式无法序列化实体类。

如果是实体类的消息传递，可以采用自定义序列化和反序列化器进行实体类的序列化和反序列化，由于Serializer和Deserializer影响到上下游系统，导致牵一发而动全身。自定义序列化&反序列化实现不是能力的体现，而是逗比的体现。所以强烈不建议自定义实现序列化&反序列化，推荐直接使用StringSerializer和StringDeserializer，然后使用json作为标准的数据传输格式。

## 参考文章
* https://www.cnblogs.com/linjiqin/p/11950758.html