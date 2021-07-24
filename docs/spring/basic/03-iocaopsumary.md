---
title: IOC和AOP-原理总结
---

::: tip
本文主要是介绍 IOC和AOP-原理总结 。
:::

[[toc]]

## 理解Spring的AOP和IOC实现原理


## 1.AOP

AOP（面向切面）是一种编程范式，提供从另一个角度来考虑程序结构以完善面向对象编程（OOP）。
AOP为开发者提供了一种描述横切关注点的机制，并能够自动将横切关注点织入到面向对象的软件系统中，从而实现了横切关注点的模块化。
AOP能够将那些与业务无关，却为业务模块所共同调用的逻辑或责任，例如事务处理、日志管理、权限控制等，封装起来，便于减少系统的重复代码，降低模块间的耦合度，并有利于未来的可操作性和可维护性。

### 使用AOP的好处

- 降低模块的耦合度
- 使系统容易扩展
- 提高代码复用性

### AOP的基本概念

- 连接点（JoinPoint）：需要在程序中插入横切关注点的点，连接点可能是在类初始化、方法调用、字段调用或处理异常等等。Spring中只支持方法执行连接点。

- 切入点（Pointcut）：一组相关连接点的集合。

- 通知（Advice）：在连接点上执行的行为，增强提供了在AOP中需要在切入点所选择的连接点处进行扩展现有行为的手段。包括前置增强（before advice）、后置增强 (after advice)、环绕增强 （around advice）。

- 切面（Aspect）：通知和切入点的结合。

- 织入（Weaving）：织入是一个过程，是将切面应用到目标对象从而创建出AOP代理对象的过程。

- 代理（Proxy）：通过代理方式来对目标对象应用切面。AOP代理可以用JDK动态代理或CGLIB代理实现。

- 目标对象（Target）：需要被织入关注点的对象。即被代理的对象。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/spring/basic/aopioc-1.jpg')" alt="wxmp">


实现AOP的主要设计模式就是动态代理。
Spring的动态代理有两种：一是JDK的动态代理；另一个是cglib动态代理。

### JDK动态代理模拟
JDK动态代理的两个核心接口(类)分别是InvocationHandler和Proxy。注意：只能代理接口。



```java
public class TimeHandler implements InvocationHandler {  
      
    // 目标对象  
    private Object targetObject;  
    
    public TimeHandler(Object targetObject){
          this.targetObject = targetObject;
    }
    @Override  
    //关联的这个实现类的方法被调用时将被执行  
    /*InvocationHandler接口的方法，proxy表示代理，method表示原对象被调用的方法，      
        args表示方法的参数*/  
    public Object invoke(Object proxy, Method method, Object[] args)  
            throws Throwable {  
        Object ret=null;  
        try{  
            System.out.println("方法之前："+System.currentTimeMillis());    
            //调用目标方法  
            ret=method.invoke(targetObject, args);  
            System.out.println("方法之后："+System.currentTimeMillis());  
        }catch(Exception e){  
            e.printStackTrace();  
            System.out.println("error");  
            throw e;  
        }  
        return ret;  
    }  
  
} 
```

TimeHandler 类实现了InvocationHandler接口。实现核心方法invoke，共有3个参数。第一个参数 生成的代理类实例，第二个参数 目标对象的方法，第三个参数 方法的参数值数组。



```java
public class ProxyUtil {
    
    @SuppressWarnings("unchecked")
    public static <T> T proxyOne(ClassLoader loader,Class<?>[] clz,InvocationHandler handler){
        return (T)Proxy.newProxyInstance(loader, clz, handler);
    }
}
```

ProxyUtil 类简单封装了一下Proxy.newProxyInstance()方法。该方法也有3个参数。第一个参数产生代理对象的类加载器，第二个参数目标对象的接口数组，第三个参数就是实现InvocationHandler接口的类实例。



```java
public interface UserManager {
    public void addUser(String userId, String userName);
}
public class UserManagerImpl implements UserManager {
    @Override
    public void addUser(String userId, String userName) {
        System.out.println("addUser(id:"+userId+",name:"+userName+")");
    }

}
```



```java
public static void main(String[] args) {
         UserManager um=new UserManagerImpl(); 
         LogHandler log =new LogHandler(um); 
     um=ProxyUtil.proxyOne(um.getClass().getClassLoader(), 
                 um.getClass().getInterfaces(), log);
         
       TimeHandler time = new TimeHandler(um);
       um=ProxyUtil.proxyOne(um.getClass().getClassLoader(), 
                 um.getClass().getInterfaces(), time);
         
         um.addUser("1111", "张三");
    }
```

为了演示需要，这边又增加了一个LogHandler，跟TimeHandler代码一样。

### CGLIB动态代理模拟
CGLIB动态代理的两个核心接口(类)分别是MethodInterceptor和Enhancer。是不是跟JDK动态代理很相似，用法也差不多。但CGLIB可以代理类和接口。注意：不能代理final类。



```java
public class TimeInterceptor implements MethodInterceptor {
    private Object target;  
    public TimeInterceptor(Object target) {
        this.target = target;
    }
    @Override
    public Object intercept(Object proxy, Method method, 
            Object[] args, MethodProxy invocation) throws Throwable {
        System.out.println("方法之前："+System.currentTimeMillis());
        Object ret = invocation.invoke(target, args); 
        System.out.println("方法之后："+System.currentTimeMillis());
        
        return ret;
    }
}
```

intercept方法4个参数。1.生成的代理类实例。2.被代理对象的方法引用。3.方法参数值数组。4.代理类对方法的代理引用。



```java
public class ProxyUtil {
    @SuppressWarnings("unchecked")
    public static <T> T proxyOne(Class<?> clz,MethodInterceptor interceptor){
        return (T)Enhancer.create(clz, interceptor);
    }

}
```

Enhancer类是CGLib中的字节码增强器。



```csharp
public class UserManage {
    public void addUser(String userId, String userName) {
        System.out.println("addUser(id:"+userId+",name:"+userName+")");
    }
}


public static void main(String[] args) {
        UserManage um = new UserManage();
        TimeInterceptor time = new TimeInterceptor(um);
        um = ProxyUtil.proxyOne(um.getClass(), time);
        um.addUser("111", "老王");
    }
```

## 2.IOC

IOC（控制反转）就是依赖倒置原则的一种代码设计思路。就是把原先在代码里面需要实现的对象创建、对象之间的依赖，反转给容器来帮忙实现。
Spring IOC容器通过xml,注解等其它方式配置类及类之间的依赖关系，完成了对象的创建和依赖的管理注入。实现IOC的主要设计模式是工厂模式。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/spring/basic/aopioc-2.png')" alt="wxmp">



### 使用IOC的好处



- 集中管理，实现类的可配置和易管理。
- 降低了类与类之间的耦合度。

### 简单模拟IOC



```java
public interface BeanFactory {
    Object getBean(String id);  
}

public class ClassPathXmlApplicationContext implements BeanFactory {
    //容器，用来存放注入的Bean  
    private Map<String, Object> container = new HashMap<String, Object>();  

    //解析xml文件，通过反射将配置的bean放到container中  
    public ClassPathXmlApplicationContext(String fileName) throws Exception{  
        SAXBuilder sb = new SAXBuilder(); 

        Document doc 
        =sb.build(ClassPathXmlApplicationContext.class.getResource("/"+fileName));
       
        Element root = doc.getRootElement();  
        List<Element> list = XPath.selectNodes(root, "/beans/bean");  

        for (int i = 0; i < list.size(); i++) {              
           Element bean = list.get(i);  
           String id = bean.getAttributeValue("id");  
           String clazz = bean.getAttributeValue("class");  
           Object o = Class.forName(clazz).newInstance();  
           container.put(id, o);  
          }  
    }
    @Override  
    public Object getBean(String id) {        
        return container.get(id);  
    }  

}
```

需要导入 jdom.jar包。



```xml
<?xml version="1.0" encoding="UTF-8"?>  
<beans>  
  <bean id="people" class="com.ioc.People" />  
  <bean id="chicken" class="com.ioc.Chicken" />  
  <bean id="dog" class="com.ioc.Dog" />  
</beans>  
```



```java
public interface Animal {
     void say();  
}

public class Dog implements Animal {
    @Override
    public void say() {
         System.out.println("汪汪"); 
    }
}
public class Chicken implements Animal {
    @Override
    public void say() {
        System.out.println("鸡你很美");  
    }
}
public class People {
    public void info(){
        System.out.println("小明-23岁");
    }
}
```



```java
public static void main(String[] args) throws Exception {  

        //加载配置文件  
        BeanFactory f = new ClassPathXmlApplicationContext("applicationContext.xml");  

        Object os = f.getBean("dog");  
        Animal dog = (Animal)os;  
        dog.say();  

        Object op = f.getBean("chicken");  
        Animal chicken = (Animal)op;  
        chicken.say();  

        Object p = f.getBean("people");  
        People people= (Animal)p;  
        people.info();  
    } 
```

**参考资料**
[我对AOP的理解](https://links.jianshu.com/go?to=https%3A%2F%2Fwww.iteye.com%2Fblog%2Fjinnianshilongnian-1474325)

[源码解读Spring IOC原理](https://links.jianshu.com/go?to=https%3A%2F%2Fwww.cnblogs.com%2FITtangtang%2Fp%2F3978349.html)

## 参考文章
* https://www.jianshu.com/p/78ba8bafb90a


