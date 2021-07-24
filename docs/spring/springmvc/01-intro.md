---
title: SpringMVC-入门介绍
---

::: tip
本文主要是介绍 SpringMVC-入门信息整理 。
:::

[[toc]]

## 1.Spring MVC简介

Spring MVC框架是有一个MVC框架，通过实现Model-View-Controller模式来很好地将数据、业务与展现进行分离。从这样一个角度来说，Spring MVC和Struts、Struts2非常类似。Spring MVC的设计是围绕DispatcherServlet展开的，DispatcherServlet负责将请求派发到特定的handler。通过可配置的handler mappings、view resolution、locale以及theme resolution来处理请求并且转到对应的视图。Spring MVC请求处理的整体流程如图：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/spring/springmvc/intro-1.png')" alt="wxmp">


Spring3.x中定义一个控制器类，必须以@Controller注解标记。当控制器类接收到一个请求时，它会在自己内部寻找一个合适的处理方法来处理请求。使用@RequestMapping注解将方法映射到一些请求上，以便让该方法处理那些请求。这种方法就像一般的类中的方法，方法名参数列表和返回值并不像Struts2之类的框架有很强的限制。方法参数列表具体以及返回值具体都有哪些，这里先不细说。这篇博客的目的在于简单介绍如何快速上手使用Spring MVC框架。

控制器在选择好适合处理请求的方法时，传入收到的请求(根据方法参数类型，可能以不同的类型传入)，并且调用该方法中的逻辑来进行处理(也可以是调用Service来真正处理)。方法逻辑可能也会在参数中添加或者删除数据。处理方法处理完之后，会委派给一个视图，由该视图来处理方法的返回值。处理程序的返回值并不代表视图的具体实现，可以只是String类型，代表视图名，甚至是void(这时候Spring MVC可以根据方法名或者控制器名找默认视图)。也不需要担心返回值只是视图名称的话，视图拿不到要显示的数据。因为方法参数对于视图来说也是可以拿到的。比如说，如果处理方法以Map为参数，那么这个Map对于视图也是可以拿到的。

返回的视图名称会返回给DispatcherServlet，它会根据一个视图解析器将视图名称解析为一个具体的视图实现。这里说到的视图解析器是一个实现了ViewResolver借口的Bean，它的任务就是返回一个视图的具体实现(HTML、JSP、PDF等等).

## 2.Spring MVC版本的helloworld

接下来我们用Spring MVC开发一个最最简单的Web应用。首先创建一个Dynamic Web Project。为了方便起见，我们将Spring dist目录下的所有jar包放到WEB-INF/lib目录下。这里我是用的是Spring3.1.x版本。此外还需要添加commons-logging包。

接下来在web.xml文件中配置DispatcherServlet，在web.xml文件中添加如下片段：

### web.xml 配置

``` xml
<servlet>
    <servlet-name>hello</servlet-name>
    <servlet-class>
        org.springframework.web.servlet.DispatcherServlet
    </servlet-class>
    <load-on-startup>1</load-on-startup>
</servlet>
<servlet-mapping>
    <servlet-name>hello</servlet-name>
    <url-pattern>/</url-pattern>
</servlet-mapping>
```

这里我们将DispatcherServlet命名为hello，并且让它在web项目一启动就加载。接下来我们需要在WEB-INF目录下创建一个hello-servlet.xml的Spring配置文件。Spring官方文档上推荐的默认的文件名是[servlet-name]-servlet.xml文件，这里servlet-name叫hello，因此，这个文件也就是叫hello-servlet.xml。在这个文件中可以定义各种各样的Spring MVC需要使用的Bean。需要说明的是，对于整个Web项目中的Spring配置文件中定义的Bean在这个配置文件中是可以继承的，反过来不成立。上面我们将所有的请求都交给DispatcherServlet。

### 现在我们定义一个控制器类HelloController：


``` java
package springmvc.controller;
 
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
 
@Controller
public class HelloController {
     
    @RequestMapping(value="/hello",method=RequestMethod.GET)
    public String sayHello(Model model) {
        model.addAttribute("msg", "Hello, World!");
        return "hello";
    }
}
```

首先通过@Controller注解标示这个类是一个控制器，接下来通过@RequestMapping注解为制定方法sayHello处理哪些请求，在这个例子中，sayHello方法仅仅处理GET类型的/hello请求。

sayHello方法接收一个org.springframework.ui.Model类型的参数model，SpringMVC会自动将请求参数封装进model中，我们可以简单的把model理解为一个Map。我们在方法中从model中取出参数person的值并且打印出来，接下来往model中添加一个属性msg，值为"Hello，World！"，然后返回视图名称hello。

接下来我们需要在Spring MVC配置文件中配置一个视图解析器，我们看看hello-servlet.xml的内容：
### hello-servlet.xml的内容

``` xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:p="http://www.springframework.org/schema/p"
    xmlns:context="http://www.springframework.org/schema/context"
    xmlns:mvc="http://www.springframework.org/schema/mvc"
    xsi:schemaLocation="
    http://www.springframework.org/schema/beans
    http://www.springframework.org/schema/beans/spring-beans-3.0.xsd
    http://www.springframework.org/schema/context
    http://www.springframework.org/schema/context/spring-context-3.0.xsd
    http://www.springframework.org/schema/mvc  
    http://www.springframework.org/schema/mvc/spring-mvc-3.0.xsd">
 
    <!-- 默认的注解映射的支持 -->
    <mvc:annotation-driven />
    <!--启用自动扫描  -->
    <context:component-scan base-package="springmvc.controller" />
    <bean class="org.springframework.web.servlet.view.InternalResourceViewResolver">
        <property name="prefix" value="/WEB-INF/jsp/" />
        <property name="suffix" value=".jsp" />
    </bean>
</beans>
```

前面没什么好说的，但是注意添加了mvc名称空间，接下来启用了spring的自动扫描，并且设置了默认的注解映射支持。这里需要重点解释的是配置文件中的那个bean。它的类型是是Spring MVC中最常用的一种视图解析器，当然还有很多其他的类型，由于这篇博客的重点在于简单的介绍Spring MVC，因此不重点介绍，后续博文会补充。prefix属性是指视图前缀，suffix是视图后缀，这里配置的是.jsp，我们在控制器的方法sayHello中返回的是hello，再结合这里的配置，对应的完整的视图是：/WEB-INF/jsp/hello.jsp。接下来我们完成这个视图，我们只是简单的取出我们放的信息msg：

### 页面案例代码展示

``` html
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>hello.jsp</title>
</head>
<body>
    ${msg}
</body>
</html>
```

接下来部署应用，我们访问http://localhost:8080/springmvc/hello ，会显示视图的内容，并且取出了msg的内容：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/spring/springmvc/intro-2.png')" alt="wxmp">


就这样一个简单的Spring MVC的Web应用就ok了。

author：wawlian
save me from myself

## 参考文章
* https://www.cnblogs.com/wawlian/archive/2012/11/17/2775435.html