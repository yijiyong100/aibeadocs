---
title: Spring注解实现原理
---

::: tip
本文主要是介绍 Spring注解实现原理 。
:::

[[toc]]

## @Autowired和@Resource的区别：


在Java中使用@Autowired和@Resource注解进行装配，这两个注解分别是：

1、@Autowired按照默认类型(类名称)装配依赖对象，默认情况下它要求依赖对象必须存在，如果允许为null,可以设置它的required属性为false

如果我们按名称装配，可以结合@Qualifie注解一起使用。

``` java
如：
@Autowired @qualifie("personDaoBean")
private PersonDaoBean personDaoBean;
```


@Resource默认按照名称(name="test")进行装配,名称可以通过@resource的name属性设定，当找不到与名称匹配的bean才会按类型装配

注意：如果没有指定name属性，并且安装默认的名称依然找不到依赖对象时，@Resource会回退到按类型装配。但一旦指定了name属性，就只能按名称装配了。

 
## spring注解原理
下面的示例来简单的讲述spring注解原理：

本例实现了在set方法上和在字段属性上注解的处理解析。

### 1、定义注解

``` java
package com.yt.annotation;  
  
import java.lang.annotation.ElementType;  
import java.lang.annotation.Retention;  
import java.lang.annotation.RetentionPolicy;  
import java.lang.annotation.Target;  
  
/** 
 * @Description:定义注解 
 * @ClassName: ZxfResource 
 * @Project: spring-aop 
 * @Author: zxf 
 * @Date: 2011-6-7 
 */  
// 在运行时执行  
@Retention(RetentionPolicy.RUNTIME)  
// 注解适用地方(字段和方法)  
@Target({ ElementType.FIELD, ElementType.METHOD })  
public @interface ZxfResource {  
  
    //注解的name属性  
    public String name() default "";  
}  
```

### 2、带有注解的服务类

``` java
package com.yt.annotation;  
  
/** 
 * @Description: 带有注解的服务 
 * @ClassName: UserDaoImpl 
 * @Project: spring-aop 
 * @Author: zxf 
 * @Date: 2011-6-7 
 */  
public class UserServiceImpl {  
  
    public UserDaoImpl userDao;  
    public User1DaoImpl user1Dao;  
  
    // 字段上的注解,可以配置name属性  
    @ZxfResource  
    public User2DaoImpl user2Dao;  
  
    // set方法上的注解，带有name属性  
    @ZxfResource(name = "userDao")  
    public void setUserDao(UserDaoImpl userDao) {  
        this.userDao = userDao;  
    }  
  
    // set方法上的注解，没有配置name属性  
    @ZxfResource  
    public void setUser1Dao(User1DaoImpl user1Dao) {  
        this.user1Dao = user1Dao;  
    }  
  
    public void show() {  
        userDao.show();  
        user1Dao.show1();  
        user2Dao.show2();  
        System.out.println("这里是Service方法........");  
    }  
}  
```

### 3、要注入的DAO

``` java
package com.yt.annotation;  
  
/** 
 * @Description: 要注入的DAo类 
 * @ClassName: UserDaoImpl 
 * @Project: spring-aop 
 * @Author: zxf 
 * @Date: 2011-6-7 
 */  
public class UserDaoImpl {  
      
    String name ;  
      
    public void show(){  
        System.out.println("这里是dao方法........");  
    }  
}  
```

Xml代码 

``` java
<?xml version="1.0" encoding="UTF-8"?>  
<beans>  
    <bean id = "userDao" class="com.yt.annotation.UserDaoImpl" />  
    <bean id = "user1Dao" class="com.yt.annotation.User1DaoImpl" />  
    <bean id = "user2Dao" class="com.yt.annotation.User2DaoImpl" />  
    <bean id = "userService" class = "com.yt.annotation.UserServiceImpl" />  
</beans>  
```

 

### 4、注解处理器


``` java
package com.yt.annotation;  
  
import java.beans.Introspector;  
import java.beans.PropertyDescriptor;  
import java.lang.reflect.Field;  
import java.lang.reflect.Method;  
import java.util.ArrayList;  
import java.util.HashMap;  
import java.util.Iterator;  
import java.util.List;  
import java.util.Map;  
import org.apache.log4j.Logger;  
import org.dom4j.Document;  
import org.dom4j.DocumentException;  
import org.dom4j.Element;  
import org.dom4j.io.SAXReader;  
  
/** 
 * @Description: spring中的注解原理 
 * @ClassName: ClassPathXMLApplicationContext 
 * @Project: spring-aop 
 * @Author: zxf 
 * @Date: 2011-6-3 
 */  
public class ClassPathXMLApplicationContext {  
  
    Logger log = Logger.getLogger(ClassPathXMLApplicationContext.class);  
  
    List<BeanDefine> beanList = new ArrayList<BeanDefine>();  
    Map<String, Object> sigletions = new HashMap<String, Object>();  
  
    public ClassPathXMLApplicationContext(String fileName) {  
        //读取配置文件中管理的bean  
        this.readXML(fileName);  
        //实例化bean  
        this.instancesBean();  
        //注解处理器  
        this.annotationInject();  
    }  
  
    /** 
     * 读取Bean配置文件 
     * @param fileName 
     * @return 
     */  
    @SuppressWarnings("unchecked")  
    public void readXML(String fileName) {  
        Document document = null;  
        SAXReader saxReader = new SAXReader();  
        try {  
            ClassLoader classLoader =   
                Thread.currentThread().getContextClassLoader();  
            document = saxReader.read(classLoader.getResourceAsStream(fileName));  
            Element beans = document.getRootElement();  
            for (Iterator<Element> beansList = beans.elementIterator();   
                beansList.hasNext();) {  
                Element element = beansList.next();  
                BeanDefine bean = new BeanDefine(  
                        element.attributeValue("id"),  
                        element.attributeValue("class"));  
                beanList.add(bean);  
            }  
        } catch (DocumentException e) {  
            log.info("读取配置文件出错....");  
        }  
    }  
      
    /** 
     * 实例化Bean 
     */  
    public void instancesBean() {  
        for (BeanDefine bean : beanList) {  
            try {  
                sigletions.put(bean.getId(),   
                        Class.forName(bean.getClassName()).newInstance());  
            } catch (Exception e) {  
                log.info("实例化Bean出错...");  
            }  
        }  
    }  
      
    /** 
     * 注解处理器 
     * 如果注解ZxfResource配置了name属性，则根据name所指定的名称获取要注入的实例引用， 
     * 如果注解ZxfResource;没有配置name属性，则根据属性所属类型来扫描配置文件获取要 
     * 注入的实例引用 
     *  
     */  
    public void annotationInject(){  
        for(String beanName:sigletions.keySet()){  
            Object bean = sigletions.get(beanName);  
            if(bean!=null){  
                this.propertyAnnotation(bean);  
                this.fieldAnnotation(bean);  
            }  
        }  
    }  
      
    /** 
     * 处理在set方法加入的注解 
     * @param bean 处理的bean 
     */  
    public void propertyAnnotation(Object bean){  
        try {  
            //获取其属性的描述  
            PropertyDescriptor[] ps =   
                Introspector.getBeanInfo(bean.getClass()).getPropertyDescriptors();  
            for(PropertyDescriptor proderdesc : ps){  
                //获取所有set方法  
                Method setter = proderdesc.getWriteMethod();  
                //判断set方法是否定义了注解  
                if(setter!=null && setter.isAnnotationPresent(ZxfResource.class)){  
                    //获取当前注解，并判断name属性是否为空  
                    ZxfResource resource = setter.getAnnotation(ZxfResource.class);  
                    String name ="";  
                    Object value = null;  
                    if(resource.name()!=null&&!"".equals(resource.name())){  
                        //获取注解的name属性的内容  
                        name = resource.name();  
                        value = sigletions.get(name);  
                    }else{ //如果当前注解没有指定name属性,则根据类型进行匹配  
                        for(String key : sigletions.keySet()){  
                            //判断当前属性所属的类型是否在配置文件中存在  
                            if(proderdesc.getPropertyType().isAssignableFrom(sigletions.get(key).getClass())){  
                                //获取类型匹配的实例对象  
                                value = sigletions.get(key);  
                                break;  
                            }  
                        }  
                    }  
                    //允许访问private方法  
                    setter.setAccessible(true);  
                    //把引用对象注入属性  
                    setter.invoke(bean, value);   
                }  
            }  
        } catch (Exception e) {  
            log.info("set方法注解解析异常..........");  
        }  
    }  
      
    /** 
     * 处理在字段上的注解 
     * @param bean 处理的bean 
     */  
    public void fieldAnnotation(Object bean){  
        try {  
            //获取其全部的字段描述  
            Field[] fields = bean.getClass().getFields();  
            for(Field f : fields){  
                if(f!=null && f.isAnnotationPresent(ZxfResource.class)){  
                    ZxfResource resource = f.getAnnotation(ZxfResource.class);  
                    String name ="";  
                    Object value = null;  
                    if(resource.name()!=null&&!"".equals(resource.name())){  
                        name = resource.name();  
                        value = sigletions.get(name);  
                    }else{  
                        for(String key : sigletions.keySet()){  
                            //判断当前属性所属的类型是否在配置文件中存在  
                            if(f.getType().isAssignableFrom(sigletions.get(key).getClass())){  
                                //获取类型匹配的实例对象  
                                value = sigletions.get(key);  
                                break;  
                            }  
                        }  
                    }  
                    //允许访问private字段  
                    f.setAccessible(true);  
                    //把引用对象注入属性  
                    f.set(bean, value);  
                }  
            }  
        } catch (Exception e) {  
            log.info("字段注解解析异常..........");  
        }  
    }  
      
    /** 
     * 获取Map中的对应的bean实例 
     * @param beanId 
     * @return 
     */  
    public Object getBean(String beanId) {  
        return sigletions.get(beanId);  
    }  
  
  
    public static void main(String[] args) {  
        ClassPathXMLApplicationContext path = new ClassPathXMLApplicationContext(  
                "configAnnotation.xml");  
        UserServiceImpl userService =(UserServiceImpl)path.getBean("userService");  
        userService.show();  
    }  
}  
```
 


## 参考文章
* https://www.cnblogs.com/likeju/p/5072981.html