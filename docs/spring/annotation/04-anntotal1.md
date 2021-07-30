---
title: Spring注解大全(一)
---

::: tip
本文主要是介绍 Spring注解大全(一) 。
:::

[[toc]]

Spring：Spring注解大全
 

## Spring 注解大全信息

### @Controller

**标识一个该类是Spring MVC controller处理器，用来创建处理http请求的对象.



``` java
@Controller
public class TestController {
        @RequestMapping("/test")
        public String test(Map<String,Object> map){

            return "hello";
        }
}
```



 



### @RestController

**Spring4之后加入的注解，原来在@Controller中返回json需要@ResponseBody来配合，如果直接用@RestController替代@Controller就不需要再配置@ResponseBody，默认返回json格式。



``` java
@RestController
public class TestController {
        @RequestMapping("/test")
        public String test(Map<String,Object> map){

            return "hello";
        }
}
```



 



### @Service

**用于标注业务层组件，以注解的方式把这个类注入到spring配置中



``` java
@Service
public class TestService {
        public String test(Map<String,Object> map){
            return "hello";
        }
}
```



 



### @Autowired

**用来装配bean，都可以写在字段上，或者方法上。
默认情况下必须要求依赖对象必须存在，如果要允许null值，可以设置它的required属性为false，例如：@Autowired(required=false)



``` java
@RestController
public class TestController {

        @Autowired(required=false)
        private TestService service;

        @RequestMapping("/test")
        public String test(Map<String,Object> map){

            return "hello";
        }
}
```



 



### @RequestMapping

**类定义处: 提供初步的请求映射信息，相对于 WEB 应用的根目录。
**方法处: 提供进一步的细分映射信息，相对于类定义处的 URL。(还有许多属性参数，不细讲，可自行查找)



``` java
@RestController
public class TestController {
        @RequestMapping("/test")
        public String test(Map<String,Object> map){

            return "hello";
        }
}
```



 



### @RequestParam

**用于将请求参数区数据映射到功能处理方法的参数上，其中course_id就是接口传递的参数，id就是映射course_id的参数名，也可以不写value属性

``` java
public Resp test(@RequestParam(value="course_id") Integer id){
        return Resp.success(customerInfoService.fetch(id));
    }
```

 



### @NonNull

**标注在方法、字段、参数上，表示对应的值可以为空。



``` java
public class Student {
    @NonNull
    private Integer age;
    private String name;

    public void setAge(Integer age){
       this.age = age;
    }

    public Integer getAge() {
        return age;
    }

    public void setName(String name){
        this.name = name;
    }

    public String getName(){
        return name;
    }

}
```



 



### @Nullable

**标注在方法、字段、参数上，表示对应的值不能为空。



``` java
public class Student {
    @Nullable
    private Integer age;
    private String name;

    public void setAge(Integer age){
       this.age = age;
    }

    public Integer getAge() {
        return age;
    }

    public void setName(String name){
        this.name = name;
    }

    public String getName(){
        return name;
    }

}
```



 



### @Resource(等同于@Autowired)

 **@Autowired按byType自动注入，****而@Resource默认按 byName自动注入，****@Resource有两个属性是比较重要的，分是name和type，Spring将@Resource注解的name属性解析为bean的名字，而type属性则解析为bean的类型。所以如果使用name属性，则使用byName的自动注入策略，而使用type属性时则使用byType自动注入策略。如果既不指定name也不指定type属性，这时将通过反射机制使用byName自动注入策略。



``` java
如果同时指定了name和type，则从Spring上下文中找到唯一匹配的bean进行装配，找不到则抛出异常
如果指定了name，则从上下文中查找名称（id）匹配的bean进行装配，找不到则抛出异常
如果指定了type，则从上下文中找到类型匹配的唯一bean进行装配，找不到或者找到多个，都会抛出异常
如果既没有指定name，又没有指定type，则自动按照byName方式进行装配；如果没有匹配，则回退为一个原始类型进行匹配，如果匹配则自动装配；
```





``` xml
<bean id="student1" class="com.tutorialspoint.Student">

      <property name="name"  value="Zara" />

      <property name="age"  value="11"/>

  </bean>



  <bean id="student2" class="com.tutorialspoint.Student">

      <property name="name"  value="Nuha" />

      <property name="age"  value="2"/>

  </bean>
```





``` java
@Resource(name= " student1")
private Student student ;

@Resource(type= "student2")

public void setSpellChecker( Studentstudent){ 
    this.Student= student; 
}
```



**示例：** 

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/spring/annotation/anntotal-1.png')" alt="wxmp">


<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/spring/annotation/anntotal-2.png')" alt="wxmp">


**使用name指定使用哪个实现类

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/spring/annotation/anntotal-3.png')" alt="wxmp">


 



### @Qualifier

**当一个接口有多个实现类时，就可以用此注解表明哪个实现类才是我们所需要的，名称为我们之前定义@Service注解的名称之一。



``` java
//接口类
public interface TestService{}

//实现类1
@Service("service1")public class TestServiceImpl1 implements TestService{}

//实现类2@Service("service2")public class TestServiceImpl2 implements TestService{}
```



``` java
//测试
@Autowired
@Qualifier("service1")
private TestService testService;
```

 



### @Component

```
**把普通pojo实例化到spring容器中，相当于配置文件中的 <bean id="" class=""/>
**它泛指各种组件，就是说当我们的类不属于各种归类的时候（不属于@Controller、@Services等的时候），我们就可以使用@Component来标注这个类。
**此外，被@controller 、@service、@repository 、@component 注解的类，都会把这些类纳入进spring容器中进行管理
```


``` java
@Component
public class TestClass {
        public String test(Map<String,Object> map){
            return "hello";
        }
}
```



 



### @Repository

**作用为给bean在容器中命名

**定义一个接口

```
public interface UserRepository {
    void save();
}
```

**两个实现类



``` java
package com.proc.bean.repository; import org.springframework.stereotype.Repository; //将此UserRepositoryImps类在容器中命名改为userRepository@Repository("userRepository")public class UserRepositoryImps implements UserRepository{     @Override    public void save() {        System.out.println("UserRepositoryImps save");    }}
```





``` java
package com.proc.bean.repository;
 
import org.springframework.stereotype.Repository;
 
//这个实现类则不进行命名
@Repository
public class UserJdbcImps implements UserRepository {
 
    @Override
    public void save() {
        System.out.println("UserJdbcImps save");
    }
}
```



**调用接口测试:



``` java
@Autowired
 
private UserRepository userRepository;

//会找到我们命名为userRepository的bean，并装配到userRepository中
```



 



### @Scope

**@Scope注解是springIoc容器中的一个作用域，在 Spring IoC 容器中具有以下几种作用域：基本作用域\**singleton（单例）\**、\**prototype(多例)\**，Web 作用域（reqeust、session、globalsession），自定义作用域。（@Scope注解默认的singleton单例模式）



``` java
prototype原型模式：
@Scope(value=ConfigurableBeanFactory.SCOPE_PROTOTYPE)这个是说在每次注入的时候回自动创建一个新的bean实例

singleton单例模式：
@Scope(value=ConfigurableBeanFactory.SCOPE_SINGLETON)单例模式，在整个应用中只能创建一个实例

globalsession模式：
@Scope(value=WebApplicationContext.SCOPE_GLOBAL_SESSION)全局session中的一般不常用

@Scope(value=WebApplicationContext.SCOPE_APPLICATION)在一个web应用中只创建一个实例

request模式：
@Scope(value=WebApplicationContext.SCOPE_REQUEST)在一个请求中创建一个实例

session模式：
@Scope(value=WebApplicationContext.SCOPE_SESSION)每次创建一个会话中创建一个实例
```





``` java
/**
     * 定义一个bean对象
     * @return
     */
    @Scope(value=ConfigurableBeanFactory.SCOPE_SINGLETON)
    @Bean(value="user0",name="user0",initMethod="initUser",destroyMethod="destroyUser")
    public User getUser(){
        System.out.println("创建user实例");
        return new User("张三",26);
    }
```




### @Bean

```
**产生一个bean的方法，并且交给Spring容器管理，\**相当于配置文件中的 <bean id="" class=""/>\**
```


``` java
@Bean
public class UserTest(){
    public User getUser(){
        System.out.println("创建user实例");
        return new User("张三",26);
    }
}
```



 



### @Transactional 

事务管理一般有编程式和声明式两种，编程式是直接在代码中进行编写事物处理过程，而声名式则是通过注解方式或者是在xml文件中进行配置，相对编程式很方便。



```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:tx="http://www.springframework.org/schema/tx"
       xmlns:aop="http://www.springframework.org/schema/aop"
       xsi:schemaLocation="http://www.springframework.org/schema/beans 
http://www.springframework.org/schema/beans/spring-beans.xsd
http://www.springframework.org/schema/tx
http://www.springframework.org/schema/tx/spring-tx.xsd">
```



**JDBC事务



```xml
<bean id="transactionManager" class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
        <property name="dataSource" ref="dataSource" />
 </bean>

<tx:annotation-driven transaction-manager="transactionManager" />
```



Hibernate事务



```xml
<bean id="transactionManager" class="org.springframework.orm.hibernate3.HibernateTransactionManager">
        <property name="sessionFactory" ref="sessionFactory" />
    </bean>
<tx:annotation-driven transaction-manager="transactionManager" />
```



JPA事务

```xml
<bean id="transactionManager" class="org.springframework.orm.jpa.JpaTransactionManager">
        <property name="sessionFactory" ref="sessionFactory" />
    </bean>
<tx:annotation-driven transaction-manager="transactionManager" />
```

Java原生API事务



```xml
<bean id="transactionManager" class="org.springframework.transaction.jta.JtaTransactionManager">
        <property name="transactionManagerName" value="java:/TransactionManager" />
    </bean>
<tx:annotation-driven transaction-manager="transactionManager" />
```



spring所有的事务管理策略类都继承自org.springframework.transaction.PlatformTransactionManager接口

 



### @Aspect

**作用是标记一个切面类（spring不会将切面注册为Bean也不会增强，但是需要扫描）



``` xml
<!-- 扫描Aspect增强的类 -->
<context:component-scan base-package="">
    <context:include-filter type="annotation"
        expression="org.aspectj.lang.annotation.Aspect"/>
</context:component-scan>

<!-- 开启@AspectJ注解支持 -->
<aop:aspectj-autoproxy/>
<?xml version="1.0" encoding="UTF-8"?>
  <beans xmlns="http://www.springframework.org/schema/beans"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:aop="http://www.springframework.org/schema/aop"
         xmlns:context="http://www.springframework.org/schema/context"
         xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd http://www.springframework.org/schema/aop http://www.springframework.org/schema/aop/spring-aop.xsd http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd">
    <!--包扫描-->    <context:component-scan base-package="com.cn"/>
    <!--开启ioc注解-->
    <context:annotation-config/>
    <!--开启aop注解-->
    <aop:aspectj-autoproxy/>
 </beans>
```



 



### @Pointcut

**定义切点，切点表达式(execution(权限访问符 返回值类型 方法所属的类名包路径.方法名(形参类型) 异常类型))



``` java
@Aspect
@Component
public class AfterThrowingAspect {

    //全路径execution(public String com.cnblogs.hellxz.test.Test.access(String,String))
    @Pointcut("execution(* com.cnblogs.hellxz.test.*.*(..))")
    public void pointcut() {}

    .......
}
```



 



### @Before

**前置增强，配合@Pointcut一起使用

 



``` java
@Aspect@Component
public class AfterThrowingAspect {

    //全路径execution(public String com.cnblogs.hellxz.test.Test.access(String,String))
    @Pointcut("execution(* com.cnblogs.hellxz.test.*.*(..))")
    public void pointcut() {}
     
    //前置增强
    @Before("pointcut()")
    public void before(JoinPoint jp){
        System.out.println("我是方法"+jp.getSignature().getName()+"的前置增强！");      
    }
}
```



 




### @AfterReturning

**后置增强，配合@Pointcut一起使用

 



``` java
@Aspect
@Component
public class AfterThrowingAspect {

    //全路径execution(public String com.cnblogs.hellxz.test.Test.access(String,String))
    @Pointcut("execution(* com.cnblogs.hellxz.test.*.*(..))")
    public void pointcut() {}
     
    //前置增强
    @Before("pointcut()")
    public void before(JoinPoint jp){
        System.out.println("我是方法"+jp.getSignature().getName()+"的前置增强！");      
    }

     //后置增强
     @AfterReturning(value = "pointcut()",returning = "obj")
     public void afterReturning(JoinPoint jp,Object obj){
         System.out.println("我是方法"+jp.getSignature().getName()+"的后置增强！"+",返回值为"+obj);
     }


}
```



 

 



### @Around

**环绕增强，\**配合@Pointcut一起使用\**

 



``` java
@Aspect
@Component
public class AfterThrowingAspect {

    //全路径execution(public String com.cnblogs.hellxz.test.Test.access(String,String))
    @Pointcut("execution(* com.cnblogs.hellxz.test.*.*(..))")
    public void pointcut() {}
     
    //前置增强
    @Before("pointcut()")
    public void before(JoinPoint jp){
        System.out.println("我是方法"+jp.getSignature().getName()+"的前置增强！");      
    }

     //后置增强
     @AfterReturning(value = "pointcut()",returning = "obj")
     public void afterReturning(JoinPoint jp,Object obj){
         System.out.println("我是方法"+jp.getSignature().getName()+"的后置增强！"+",返回值为"+obj);
     }

     //环绕增强
     @Around("pointcut()")
     public void around(ProceedingJoinPoint jp) throws Throwable {
         System.out.println("我是环绕增强中的前置增强！");
         Object proceed = jp.proceed();//植入目标方法
         System.out.println("我是环绕增强中的后置增强！");
     }


}
```



 

 



### @AfterThrowing

**异常抛出增强，\**\*\*配合@Pointcut一起使用\*\**\*

 



``` java
@Aspect
@Component
public class AfterThrowingAspect {

    //全路径execution(public String com.cnblogs.hellxz.test.Test.access(String,String))
    @Pointcut("execution(* com.cnblogs.hellxz.test.*.*(..))")
    public void pointcut() {}
     
    //前置增强
    @Before("pointcut()")
    public void before(JoinPoint jp){
        System.out.println("我是方法"+jp.getSignature().getName()+"的前置增强！");      
    }

     //后置增强
     @AfterReturning(value = "pointcut()",returning = "obj")
     public void afterReturning(JoinPoint jp,Object obj){
         System.out.println("我是方法"+jp.getSignature().getName()+"的后置增强！"+",返回值为"+obj);
     }

     //环绕增强
     @Around("pointcut()")
     public void around(ProceedingJoinPoint jp) throws Throwable {
         System.out.println("我是环绕增强中的前置增强！");
         Object proceed = jp.proceed();//植入目标方法
         System.out.println("我是环绕增强中的后置增强！");
     }

     //异常抛出增强
     @AfterThrowing(value = "pointcut()",throwing = "e")
     public void error(JoinPoint jp,Exception e){
         System.out.println("我是异常抛出增强"+",异常为："+e.getMessage());
     }


}
```



 

 



### @After

**最终增强(最后执行)，\**\*\*\*\*配合@Pointcut一起使用\*\*\*\*\**

 



``` java
@Aspect
@Component
public class AfterThrowingAspect {

    //全路径execution(public String com.cnblogs.hellxz.test.Test.access(String,String))
    @Pointcut("execution(* com.cnblogs.hellxz.test.*.*(..))")
    public void pointcut() {}
     
    //前置增强
    @Before("pointcut()")
    public void before(JoinPoint jp){
        System.out.println("我是方法"+jp.getSignature().getName()+"的前置增强！");      
    }

     //后置增强
     @AfterReturning(value = "pointcut()",returning = "obj")
     public void afterReturning(JoinPoint jp,Object obj){
         System.out.println("我是方法"+jp.getSignature().getName()+"的后置增强！"+",返回值为"+obj);
     }

     //环绕增强
     @Around("pointcut()")
     public void around(ProceedingJoinPoint jp) throws Throwable {
         System.out.println("我是环绕增强中的前置增强！");
         Object proceed = jp.proceed();//植入目标方法
         System.out.println("我是环绕增强中的后置增强！");
     }

     //异常抛出增强
     @AfterThrowing(value = "pointcut()",throwing = "e")
     public void error(JoinPoint jp,Exception e){
         System.out.println("我是异常抛出增强"+",异常为："+e.getMessage());
     }

     //最终增强
     @After("pointcut()")
     public void after(JoinPoint jp){
         System.out.println("我是最终增强");
     }
}
```



 

 



### @Cacheable（结合Redis搭建缓存机制）

***\**重点 单独一篇文章讲解\**

**用来标记缓存查询。可用用于方法或者类中。(简介)

**当标记在一个方法上时表示该方法是支持缓存的，
当标记在一个类上时则表示该类所有的方法都是支持缓存的。

 



### @CacheEvict

***\**重点 单独一篇文章讲解\**

**用来标记要清空缓存的方法，当这个方法被调用后，即会清空缓存。@CacheEvict(value=”UserCache”)

 



### @Required（注释检查）

**适用于bean属性setter方法，并表示受影响的bean属性必须在XML配置文件在配置时进行填充。否则，容器会抛出一个BeanInitializationException异常。

**通俗的讲：该注解放在setter方法上，表示当前的setter修饰的属性必须在Spring.xml中进行装配，否则报错\**BeanInitializationException异常，所以这是个检查注解。\**



``` java
public class Student {
    private Integer age;
    private String name;

    public Integer getAge() {
        return age;
    }

    @Required     //该注释放在的是set方法中，如果没有在xml配置文件中配置相关的属性，就会报错
    public void setAge(Integer age) {
        this.age = age;
    }
}
```





``` xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:aop="http://www.springframework.org/schema/aop"
    xmlns:tx="http://www.springframework.org/schema/tx"
    xmlns:context="http://www.springframework.org/schema/context"
    xsi:schemaLocation="
   http://www.springframework.org/schema/beans
   http://www.springframework.org/schema/beans/spring-beans-3.0.xsd
   http://www.springframework.org/schema/aop
   http://www.springframework.org/schema/aop/spring-aop-3.0.xsd
   http://www.springframework.org/schema/tx
   http://www.springframework.org/schema/tx/spring-tx-3.0.xsd
   http://www.springframework.org/schema/context     
   http://www.springframework.org/schema/context/spring-context-3.0.xsd">

    <context:annotation-config/>
    <!-- student bean的定义 -->
    <bean id = "student" class="com.how2java.w3cschool.required.Student">
        <property name = "name" value="派大星"/>
        <!-- 这里没有装配age属性，所以项目运行会报错 -->
    </bean>
    
</beans>
```



``` java
报错：“ Property 'age' is required for bean 'student' ”
```

 



### @ModelAttribute

**所有方法在调用前，先执行此@ModelAttribute方法.

 

**A.标注在有返回值的方法上

**当ModelAttribute设置了value，方法返回的值会以这个value为key，以参数接受到的值作为这个key对应的value，组成k-v键值对，存入到Model中，如下面的方法执行之后，最终相当于 model.addAttribute(“user_name”, name);假如 @ModelAttribute没有自定义value，则相当于
**model.addAttribute(“name”, name);

**往前台传数据，可以传对象，可以传List，通过el表达式 ${}可以获取到，

**类似于request.setAttribute("sts",sts)效果一样。



``` java
@ModelAttribute(value="user_name")
    public String before2(@RequestParam(required = false) String name, Model model) {
        System.out.println("进入了2：" + name);
        return name;
    }
```



**B.标注在没有返回值的方法上

**需要手动model.add方法



``` java
@ModelAttribute
    public void before(@RequestParam(required = false) Integer age, Model model){
        model.addAttribute("age", age);
        System.out.println("进入了1：" + age);
}
```



**C.标注在方法的参数上

**会将客户端传递过来的参数按名称注入到指定对象中，并且会将这个对象自动加入ModelMap中，便于View层使用.



``` java
@RequestMapping(value="/mod2")
     public Resp mod2(@ModelAttribute("user_name") String user_name, 
             @ModelAttribute("name") String name,
             @ModelAttribute("age") Integer age,Model model){
         System.out.println("进入mod2");
         System.out.println("user_name:"+user_name);
         System.out.println("name："+name);
         System.out.println("age:"+age);
         System.out.println("model:"+model);
        return Resp.success("1");
    }
```



 

 


## 参考文章
* https://blog.csdn.net/weixin_41990707/article/details/82292323