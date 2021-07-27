---
title: SpringBoot-Hibernate案例
---

::: tip
本文主要是介绍 SpringBoot-Hibernate案例 。
:::

[[toc]]


## 一、springBoot2.x整合hibernate5

### 1.所需依赖：

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>
```

这里引入的是JPA的依赖，JPA就是Java持久化规范，而hibernate是这套规范的主要实现之一。

------

欢迎大家关注我的公众号 **javawebkf**，目前正在慢慢地将简书文章搬到公众号，以后简书和公众号文章将同步更新，且简书上的付费文章在公众号上将免费。

------

### 2.application.properties中的配置：
 springBoot2.x默认使用的连接池是hikari，号称是最快的连接池，用来替换druid的。由于springBoot2.x默认使用这个连接池，所以不需要添加额外的依赖，下面是其相关配置：



```bash
#最大连接数
spring.datasource.hikari.maximum-pool-size=20
#连接超时毫秒
spring.datasource.hikari.connection-timeout=60000
#空闲的连接的生命时长毫秒
spring.datasource.hikari.idle-timeout=60000
#连接的生命时长毫秒
spring.datasource.hikari.max-lifetime=60000
#验证连接有效性毫秒
spring.datasource.hikari.validation-timeout=3000
#登录超时毫秒
spring.datasource.hikari.login-timeout=5
```

其实以上配置也可以不写，不写就使用了默认的配置。

### 3.如何获取session？
 我们都知道hibernate首先要获取sessionFactory，然后从sessionFactory中获取session进行持久化操作。那么如何获取这个Session呢？

其实SpringBoot自动帮我们配置好了一个EntityManagerFactory，这个EntityManagerFactory里面就有我们需要的session。使用时，只需要@Autowired这个EntityManagerFactory，然后用openSession或者getCurrentSession方法即可拿到session。如下：



``` java
public class HibernateBaseDao<E> {
    /** 泛型的类型 */
    private final Class<E> entityClass;
    @Autowired
    private EntityManagerFactory entityManagerFactory;

    /** 获取泛型的类型  */
    @SuppressWarnings("rawtypes")
    private static Class getSuperClassGenricType(final Class clazz, final int index) {
        Type genType = clazz.getGenericSuperclass();
        if (!(genType instanceof ParameterizedType)) {
            return Object.class;
        }
        Type[] params = ((ParameterizedType) genType).getActualTypeArguments();
        if (index >= params.length || index < 0) {
            return Object.class;
        }
        if (!(params[index] instanceof Class)) {
            return Object.class;
        }
        return (Class<?>) params[index];
    }

    /** HibernateBaseDao的构造方法 */
    @SuppressWarnings("unchecked")
    public HibernateBaseDao() {
        this.entityClass = getSuperClassGenricType(this.getClass(), 0);
    }

    /** 获取session */
    @Transactional
    protected Session getSession() {
        return entityManagerFactory.unwrap(SessionFactory.class).openSession();//这种方式需要手动关闭session
        // 这种方式会自动关闭session，但是要配置current_session_context_class，并且需要使用事务
        //return entityManagerFactory.unwrap(SessionFactory.class).getCurrentSession();
    }
       
    public E get(Serializable id) {
        Assert.notNull(id, "id is required");
        return (E) this.getSession().get(this.entityClass, id);
    }
}
```

如上面的代码片段所示，直接@Autowired这个EntityManagerFactory，然后用openSession方法或者getCurrentSession方法从这里获取session即可。接下来说说获取session的这两种不同方式的区别。

- openSession：每次都会open一个新的session，用完之后需手动关闭session。
- getCurrentSession：用的是同一个session，会和当前线程绑定到到一起，在事务回滚或提交后会自动关闭。

根据上面的描述，可以知道getCurrentSession可能会更加方便，不需要手动关闭session。不过如果要使用这个方法，还需要进行如下配置。

### 4.使用getCurrentSession方法需要进行的配置：
 要使用这个方法，需要 配置`hibernate.current_session_context_class`。首先在application.properties中定义其配置：



```
hibernate.current_session_context_class=org.springframework.orm.hibernate5.SpringSessionContext
```

然后新建配置类注入这个配置：



```java
@Configuration
public class HibernateConfig {
    
    @Value("${spring.jpa.properties.hibernate.current_session_context_class}")
    public String current_session_context_class;
    @Autowired
    private DataSource dataSource;
    
    @Bean
    public LocalSessionFactoryBean sessionFactoryBean() {
       LocalSessionFactoryBean sessionFactoryBean = new LocalSessionFactoryBean();
       sessionFactoryBean.setDataSource(dataSource);
       sessionFactoryBean.setPackagesToScan("com.zhu.demo");//dao和entity的公共包
       Properties properties = new Properties();
       properties.setProperty("hibernate.current_session_context_class", current_session_context_class);
       sessionFactoryBean.setHibernateProperties(properties);
       return sessionFactoryBean;
    }
}
```

配置完之后，还需要将使用session的方法添加事务，否则会报错！如果是读数据操作，添加只读事务即可。

 这样就可以使用getCurrentSession这个方法了。在刚才那个HibernateBaseDao中，就可以自己封装一些常用的操作，以后使用时直接继承HibernateBaseDao，调用其相关方法即可，甚是方便。也许有小伙伴问为啥不直接用JPA呢，不是更方便吗？其实JPA未必更方便，JPA定义函数时还需要根据其命名规则来命名，所以还不如自己封装一下HibernateBaseDao呢。




## 参考文章
* https://www.jianshu.com/p/57e3c9a40709