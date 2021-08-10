---
title: SpringBoot集成案例ES7.x
---

::: tip
本文主要是介绍 SpringBoot集成案例ES7.x 。
:::

[[toc]]

## ElasticSearch - SpringBoot集成ES7.x

## 1.整体设计思路(仿NBA中国官网)

>  这里我们依然是以[【NBA中国】](https://china.nba.com/playerindex/)为例。主要通过一套简单的Springboot项目来对ES的各种API进行使用和熟悉。
> <img class= "zoom-custom-imgs" :src="$withBase('/assets/img/es/case/casenba/20210204165456708.png')" alt="wxmp">
>  这里我们可以看到，目前的网站上主要提供了四处给我们搜索的地方。首先是右上方的`根据球员名称`，然后就是`字母开头`、`国家`、`球队`这些条件来搜索球员信息了。
>  
>  这里我们就根据这几个查询的需求来看看我们需要怎么去实现这些场景。

## 2.项目搭建

>  Springboot项目搭建不多说，这里只给出几个关键的文件配置。更完整的项目最后我会贴出链接，大家想看的话可以自行查看。

**pom.xml**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
	<modelVersion>4.0.0</modelVersion>
	<parent>
		<groupId>org.springframework.boot</groupId>
		<artifactId>spring-boot-starter-parent</artifactId>
		<version>2.4.2</version>
		<relativePath/> <!-- lookup parent from repository -->
	</parent>
	<groupId>com.ithzk.es</groupId>
	<artifactId>springboot-es</artifactId>
	<version>0.0.1-SNAPSHOT</version>
	<name>springboot-es</name>
	<description>Demo project for Spring Boot</description>
	<properties>
		<java.version>1.8</java.version>
	</properties>
	<dependencies>
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-web</artifactId>
		</dependency>
		<dependency>
			<groupId>org.projectlombok</groupId>
			<artifactId>lombok</artifactId>
			<optional>true</optional>
		</dependency>

		<!-- ElasticSearch -->
		<dependency>
			<groupId>org.elasticsearch.client</groupId>
			<artifactId>elasticsearch-rest-high-level-client</artifactId>
			<version>7.8.0</version>
		</dependency>
		<dependency>
			<groupId>org.elasticsearch</groupId>
			<artifactId>elasticsearch</artifactId>
			<version>7.8.0</version>
		</dependency>

		<dependency>
			<groupId>com.alibaba</groupId>
			<artifactId>fastjson</artifactId>
			<version>1.2.73</version>
		</dependency>
		<dependency>
			<groupId>com.alibaba</groupId>
			<artifactId>druid</artifactId>
			<version>1.1.23</version>
		</dependency>

		<!-- mybatis mysql -->
		<dependency>
			<groupId>org.mybatis.spring.boot</groupId>
			<artifactId>mybatis-spring-boot-starter</artifactId>
			<version>2.1.3</version>
		</dependency>
		<dependency>
			<groupId>mysql</groupId>
			<artifactId>mysql-connector-java</artifactId>
			<version>8.0.21</version>
		</dependency>
		<dependency>
			<groupId>mysql</groupId>
			<artifactId>mysql-connector-java</artifactId>
			<version>8.0.21</version>
		</dependency>

		<dependency>
			<groupId>org.apache.commons</groupId>
			<artifactId>commons-lang3</artifactId>
			<version>3.11</version>
		</dependency>
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-test</artifactId>
			<scope>test</scope>
		</dependency>
		<dependency>
			<groupId>junit</groupId>
			<artifactId>junit</artifactId>
			<version>4.12</version>
			<scope>test</scope>
		</dependency>
	</dependencies>

	<build>
		<plugins>
			<plugin>
				<groupId>org.springframework.boot</groupId>
				<artifactId>spring-boot-maven-plugin</artifactId>
				<configuration>
					<excludes>
						<exclude>
							<groupId>org.projectlombok</groupId>
							<artifactId>lombok</artifactId>
						</exclude>
					</excludes>
				</configuration>
			</plugin>
		</plugins>
	</build>

</project>
```

**application.yml**

```yml
spring:
  datasource:
    url: jdbc:mysql://111.229.125.192:3306/nba?useUnicode=true&characterEncoding=utf-8&serverTimezone=Asia/Shanghai
    username: nba
    password: nba
    druid:
      initial-size: 5 #连接池初始化大小
      min-idle: 10 #最小空闲连接数
      max-active: 20 #最大连接数
      web-stat-filter:
        exclusions: "*.js,*.gif,*.jpg,*.png,*.css,*.ico,/druid/*" #不统计这些请求数据
      stat-view-servlet: #访问监控网页的登录用户名和密码
        login-username: druid
        login-password: druid

server:
  port: 8080

logging:
  level:
    root: info
    com.ithzk.es: debug

elasticsearch:
  host: 111.229.125.192
  port: 9200

```

**ESConfig**

```java
@Configuration
@ConfigurationProperties(prefix = "elasticsearch")
@Data
public class ESConfig {

    private String host;

    private Integer port;

    @Bean(destroyMethod = "close")
    public RestHighLevelClient client(){
        return new RestHighLevelClient(RestClient.builder(new HttpHost(host, port)));
    }

}

```

**MybatisConfig**

```java
@Configuration
@MapperScan("com.ithzk.es.dao")
public class MybatisConfig {
    
}
12345
```

## 3.ES API的基本使用

>  之前我们一直都借助`kibana`去使用ES，现在开始我们就真正要通过ES API去感受它的魅力了。大家可以通过[es官网文档](https://www.elastic.co/guide/en/elasticsearch/client/java-rest/7.x/java-rest-high-javadoc.html)或者其他博客等途径了解各种API的使用。这里我们先通过下面请求把之前的索引数据给清除一下。
> <img class= "zoom-custom-imgs" :src="$withBase('/assets/img/es/case/casenba/20210203162005680.png')" alt="wxmp">

### 3.1 新增球员信息

>  新增球员信息其实十分简单，包括后面的操作基本都是通过我们`ESConfig`中的`RestHighLevelClient`客户端来进行操作。这里我们都通过Test方式来验证。

**NBAPlayerServiceImpl**

```java
@Service
@Slf4j
public class NBAPlayerServiceImpl implements NBAPlayerService {
    @Resource
    private RestHighLevelClient client;

    private static final String NBA_INDEX = "nba_v1";

    @Override
    public boolean addPlayer(NBAPlayer player, String id) throws IOException {
        IndexRequest request = new IndexRequest(NBA_INDEX).id(id).source(beanToMap(player));
        IndexResponse response = client.index(request, RequestOptions.DEFAULT);
        log.info("addPlayer {}", JSONObject.toJSON(response));
        return false;
    }
    
	public static <T> Map<String, Object> beanToMap(T bean) {
        Map<String, Object> map = new HashMap<>();
        if (bean != null) {
            BeanMap beanMap = BeanMap.create(bean);
            for (Object key : beanMap.keySet()) {
                if(beanMap.get(key) != null)
                    map.put(key + "", beanMap.get(key));
            }
        }
        return map;
    }
}

@RunWith(SpringRunner.class)
@SpringBootTest
class SpringbootEsApplicationTests {

	@Autowired
	private NBAPlayerService nbaPlayerService;

	@Test
	void addPlayer() throws IOException {
		NBAPlayer nbaPlayer = new NBAPlayer().setId(1).setDisplayNameEn("Tracy McGrady").setJerseyNo("1");
		nbaPlayerService.addPlayer(nbaPlayer, String.valueOf(nbaPlayer.getId()));
	}

}


```

>  这里可以看到我们主要是通过ES提供的`IndexRequest`去指定操作的索引并封装我们的数据。我们通过Test模拟了一条数据进行新增，这里我们可以看到ES中也是成功添加了这条数据的。
> <img class= "zoom-custom-imgs" :src="$withBase('/assets/img/es/case/casenba/20210203193908752.png')" alt="wxmp">

>  这里我们可以看到ES给我们响应值里将一些本次操作的一些相关信息带出来了。

```json
{
	"result": "CREATED",
	"fragment": false,
	"seqNo": 1698,
	"primaryTerm": 1,
	"index": "nba_v1",
	"shardId": {
		"fragment": true,
		"indexName": "nba_v1",
		"index": {
			"fragment": false,
			"name": "nba_v1",
			"uUID": "_na_"
		},
		"id": -1
	},
	"id": "1",
	"type": "_doc",
	"shardInfo": {
		"fragment": false,
		"total": 2,
		"failures": [],
		"failed": 0,
		"successful": 1
	},
	"version": 1
}

```

### 3.2 查看球员信息

>  既然我们都已经集成ES了，再通过Kibana去查找数据就太没水准了，我们来看看如何通过ES API来获取数据。

**NBAPlayerServiceImpl**

```java
	@Override
    public Map<String,Object> getPlayer(String id) throws IOException {
        GetRequest getRequest = new GetRequest(NBA_INDEX,id);
        GetResponse response = client.get(getRequest,RequestOptions.DEFAULT);
        log.info("addPlayer {}", JSONObject.toJSON(response));
        return response.getSource();
    }

```

>  这里可以看到我们成功获取了数据，与上面新增不同的是获取数据使用的是`GetRequest`而接收的是`GetResponse`。下面我贴出了整个`response`响应结果，一般我们在使用数据时只需调用`getSource()`方法即可。

```json
{
	"sourceInternal": {
		"fragment": true
	},
	"sourceAsMap": {
		"displayNameEn": "Tracy McGrady",
		"id": 1,
		"jerseyNo": "1"
	},
	"seqNo": 1698,
	"primaryTerm": 1,
	"index": "nba_v1",
	"sourceAsBytes": [123, 34, 100, 105, 115, 112, 108, 97, 121, 78, 97, 109, 101, 69, 110, 34, 58, 34, 84, 114, 97, 99, 121, 32, 77, 99, 71, 114, 97, 100, 121, 34, 44, 34, 105, 100, 34, 58, 49, 44, 34, 106, 101, 114, 115, 101, 121, 78, 111, 34, 58, 34, 49, 34, 125],
	"source": {
		"displayNameEn": "Tracy McGrady",
		"id": 1,
		"jerseyNo": "1"
	},
	"type": "_doc",
	"sourceAsString": "{\"displayNameEn\":\"Tracy McGrady\",\"id\":1,\"jerseyNo\":\"1\"}",
	"version": 1,
	"sourceEmpty": false,
	"fragment": false,
	"sourceAsBytesRef": {
		"fragment": true
	},
	"exists": true,
	"id": "1",
	"fields": {}
}

```

### 3.3 修改球员信息

>  修改的话其实同理，只不过将请求对象换成了`UpdateRequest`，其他基本完全一样。

**NBAPlayerServiceImpl**

```java
	@Override
    public boolean updatePlayer(NBAPlayer player,String id) throws IOException {
        UpdateRequest request = new UpdateRequest(NBA_INDEX,id).doc(beanToMap(player));
        UpdateResponse response = client.update(request,RequestOptions.DEFAULT);
        log.info("updatePlayer {}", JSONObject.toJSON(response));
        return true;
    }

	@Test
	void updatePlayer() throws IOException {
		NBAPlayer nbaPlayer = new NBAPlayer().setId(1).setDisplayNameEn("Lebron James").setJerseyNo("6");
		nbaPlayerService.updatePlayer(nbaPlayer, String.valueOf(nbaPlayer.getId()));
	}

```

>  这里响应结果的话和之前我们添加的时候也差不多，主要区别就是操作类型变了。

```json
{
	"result": "UPDATED",
	"fragment": false,
	"seqNo": 1699,
	"primaryTerm": 1,
	"index": "nba_v1",
	"shardId": {
		"fragment": true,
		"indexName": "nba_v1",
		"index": {
			"fragment": false,
			"name": "nba_v1",
			"uUID": "_na_"
		},
		"id": -1
	},
	"id": "1",
	"type": "_doc",
	"shardInfo": {
		"fragment": false,
		"total": 2,
		"failures": [],
		"failed": 0,
		"successful": 1
	},
	"version": 2
}

```

### 3.4 删除球员信息

>  删除球员信息的话感觉大家闭着眼都知道怎么做了，不过这里我们还是走一遍。

**NBAPlayerServiceImpl**

```java
	@Override
    public boolean deletePlayer(String id) throws IOException {
        DeleteRequest request = new DeleteRequest(NBA_INDEX,id);
        DeleteResponse response = client.delete(request, RequestOptions.DEFAULT);
        log.info("deletePlayer {}", JSONObject.toJSON(response));
        return true;
    }

```

>  结果估计咱们猜都猜到了。

```json
{
	"result": "DELETED",
	"fragment": false,
	"seqNo": 1700,
	"primaryTerm": 1,
	"index": "nba_v1",
	"shardId": {
		"fragment": true,
		"indexName": "nba_v1",
		"index": {
			"fragment": false,
			"name": "nba_v1",
			"uUID": "_na_"
		},
		"id": -1
	},
	"id": "1",
	"type": "_doc",
	"shardInfo": {
		"fragment": false,
		"total": 2,
		"failures": [],
		"failed": 0,
		"successful": 1
	},
	"version": 3
}

```

## 4.业务场景的实现

>  上面的话我们大概简单了解了一下ES的基本操作，可以发现ES提供给我们的API使用起来十分方便，基本没有啥门槛。那么ES作为搜索引擎，咱们当然最主要的还是使用他的各种查询了，这里我们就来看一看假如我们真的去给一个网站做搜索是怎样的呢？

### 4.1 数据库同步数据至ES

>  这里我们导入一份SQL脚本到数据库，这份SQL主要就是NBA官网的一些球员信息。咱们这里是从[【小D课堂】](https://xdclass.net/#/index)捞下的，小D老师应该是不会打咱们的，毕竟都是为了大家学习进步为国争光。SQL脚本的话我丢在项目`res`文件夹里，大家可以自己去找一下。
>  
>  这里我们开始导入一系列Mysql的包并且配置的作用就来了。我把关键的代码贴出来。

**NBAPlayer**

```java
import lombok.Data;
import lombok.ToString;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
@ToString
public class NBAPlayer {

    private Integer id;
    private String countryEn;
    private String country;
    private String code;
    private String displayAffiliation;
    private String displayName;
    private Integer draft;
    private String schoolType;
    private String weight;
    private Integer playYear;
    private String jerseyNo;
    private Long birthDay;
    private String birthDayStr;
    private String displayNameEn;
    private String position;
    private Double heightValue;
    private String playerId;
    private String teamCity;
    private String teamCityEn;
    private String teamName;
    private String teamNameEn;
    private String teamConference;
    private String teamConferenceEn;
    private Integer age;

}


```

**NBAPlayerMapper**

```java
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface NBAPlayerMapper {

    @Select("select * from nba_player")
    public List<NBAPlayer> selectAll();
}

```

>  这里我们调用的是上面添加球员信息的方法，多的就不贴出来了。
> **NBAPlayerServiceImpl**

```java
	@Override
    public boolean importAll() throws IOException {
        List<NBAPlayer> list = nbaPlayerMapper.selectAll();
        int count = 1;
        for(NBAPlayer player: list){
            addPlayer(player,String.valueOf(player.getId()));
            log.info("importAll {} : {}", count++, player);
        }
        return true;
    }

```

>  这里可以看到数据很快就添加到我们ES当中了，可以开始后面的业务流程了。
> <img class= "zoom-custom-imgs" :src="$withBase('/assets/img/es/case/casenba/20210204161833876.png')" alt="wxmp">

### 4.2 通过姓名查询球员信息

>  首先最基本的就是根据球员姓名来查找其信息，大家可以回顾一下上面的图片。这个需求比较简单但是也是很多业务比较核心基础的功能。
>  
>  话不多说，直接上代码。具体每个API怎么详细使用，大家可以看我之前发的那份官方API文档。

**NBAPlayerServiceImpl**

```java
	@Override
    public List<NBAPlayer> searchMatch(String key,String value) throws IOException {
        SearchRequest searchRequest = new SearchRequest(NBA_INDEX);
        SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder();
        searchSourceBuilder.query(QueryBuilders.matchQuery(key,value));
        searchSourceBuilder.from(START_OFFSET);
        searchSourceBuilder.size(MAX_COUNT);
        searchRequest.source(searchSourceBuilder);
        SearchResponse response = client.search(searchRequest,RequestOptions.DEFAULT);
        System.out.println(JSONObject.toJSON(response));

        SearchHit[] hits = response.getHits().getHits();
        List<NBAPlayer> playerList = new LinkedList<>();
        for(SearchHit hit: hits){
            NBAPlayer player = JSONObject.parseObject(hit.getSourceAsString(),NBAPlayer.class);
            playerList.add(player);
        }

        return playerList;
    }

```

**NBAPlayerController**

```java
@RestController
@RequestMapping("/nba")
public class NBAPlayerController {

    @RequestMapping("/searchMatchByDisplayNameEn")
    public List<NBAPlayer> searchMatchByDisplayNameEn(@RequestParam(value = "displayNameEn", required = false) String displayNameEn) {
        try {
            return nbaPlayerService.searchMatch("displayNameEn",displayNameEn);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }
}

```

>  上面的代码可以看到，只需要传入球员姓名的信息我们就会通过`match`的方式去匹配`displayNameEn`字段。
> <img class= "zoom-custom-imgs" :src="$withBase('/assets/img/es/case/casenba/20210204170140469.png')" alt="wxmp">

### 4.3 通过国家或球队查询球员信息

>  接下来就是通过国家或者是球队去匹配球员信息。这两个属性我们都是`keyword`类型，按照业务场景的话这里使用`term`查询就OK了。

**NBAPlayerServiceImpl**

```java
	@Override
    public List<NBAPlayer> searchTerm(String key,String value) throws IOException {
        SearchRequest searchRequest = new SearchRequest(NBA_INDEX);
        SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder();
        searchSourceBuilder.query(QueryBuilders.termQuery(key,value));
        searchSourceBuilder.from(START_OFFSET);
        searchSourceBuilder.size(MAX_COUNT);
        searchRequest.source(searchSourceBuilder);
        SearchResponse response = client.search(searchRequest,RequestOptions.DEFAULT);

        SearchHit[] hits = response.getHits().getHits();
        List<NBAPlayer> playerList = new LinkedList<>();
        for(SearchHit hit: hits){
            NBAPlayer player = JSONObject.parseObject(hit.getSourceAsString(),NBAPlayer.class);
            playerList.add(player);
        }

        return playerList;
    }

```

**NBAPlayerController**

```java
	@RequestMapping("/searchTerm")
    public List<NBAPlayer> searchTerm(@RequestParam(value = "country", required = false) String country,
                                      @RequestParam(value = "teamName", required = false) String teamName) {
        try {
            if(StringUtils.isNoneBlank(country))
                return nbaPlayerService.searchTerm("country",country);

            else if(StringUtils.isNoneBlank(teamName))
                return nbaPlayerService.searchTerm("teamName",teamName);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

```

>  这里我们验证一下，通过国家或球队名称都可以查找到我们想要的结果。
> <img class= "zoom-custom-imgs" :src="$withBase('/assets/img/es/case/casenba/20210204171002198.png')" alt="wxmp">
> <img class= "zoom-custom-imgs" :src="$withBase('/assets/img/es/case/casenba/20210204171048396.png')" alt="wxmp">

### 4.4 通过姓名字母前缀查询球员信息

>  最后的话就是中间一排从`A-Z`的字母，我们可以分析出这里是通过姓名首字母来匹配球员信息。

**NBAPlayerServiceImpl**

```java
	@Override
    public List<NBAPlayer> searchMatchPrefix(String key,String value) throws IOException {
        SearchRequest searchRequest = new SearchRequest(NBA_INDEX);
        SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder();
        searchSourceBuilder.query(QueryBuilders.prefixQuery(key,value));
        searchSourceBuilder.from(START_OFFSET);
        searchSourceBuilder.size(MAX_COUNT);
        searchRequest.source(searchSourceBuilder);
        SearchResponse response = client.search(searchRequest,RequestOptions.DEFAULT);
        System.out.println(JSONObject.toJSON(response));

        SearchHit[] hits = response.getHits().getHits();
        List<NBAPlayer> playerList = new LinkedList<>();
        for(SearchHit hit: hits){
            NBAPlayer player = JSONObject.parseObject(hit.getSourceAsString(),NBAPlayer.class);
            playerList.add(player);
        }

        return playerList;
    }

```

**NBAPlayerController**

```java
	@RequestMapping("/searchMatchPrefix")
    public List<NBAPlayer> searchMatchPrefix(@RequestParam(value = "displayNameEn", required = false) String displayNameEn) {
        try {
            return nbaPlayerService.searchMatchPrefix("displayNameEn",displayNameEn);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

```

>  这里我们可以看到已经达到了我们想要的效果了。
> <img class= "zoom-custom-imgs" :src="$withBase('/assets/img/es/case/casenba/20210204172543616.png')" alt="wxmp">
>  最后代码我这边上传到了[【码云】](https://gitee.com/onethree/springboot-es)上，大家需要的话可以自己看一看。另外这里我们简单实现了几种业务场景，还有更多丰富的场景和应用需要大家自己摸索，一起加油。

原文链接：https://blog.csdn.net/u013985664/article/details/113615960

## 参考文章
* https://dirge.blog.csdn.net/article/details/113615960