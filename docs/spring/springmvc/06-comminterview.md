---
title: SpringMvc-常见面试题
---

::: tip
本文主要是介绍 SpringMvc-常见面试题 。
:::

[[toc]]

## 什么是Spring MVC ？简单介绍下你对springMVC的理解?

Spring MVC是一个基于MVC架构的用来简化web应用程序开发的应用开发框架，它是Spring的一个模块,无需中间整合层来整合 ，它和Struts2一样都属于表现层的框架。在web模型中，MVC是一种很流行的框架，通过把Model，View，Controller分离，把较为复杂的web应用分成逻辑清晰的几部分，简化开发，减少出错，方便组内开发人员之间的配合。

## SpringMVC的流程？

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/spring/springmvc/interview-1.png')" alt="wxmp">


* （1）用户发送请求至前端控制器DispatcherServlet；
* （2） DispatcherServlet收到请求后，调用HandlerMapping处理器映射器，请求获取Handle；
* （3）处理器映射器根据请求url找到具体的处理器，生成处理器对象及处理器拦截器(如果有则生成)一并返回给DispatcherServlet；
* （4）DispatcherServlet通过HandlerAdapter处理器适配器调用处理器；
* （5）执行处理器(Handler，也叫后端控制器)；
* （6）Handler执行完成返回ModelAndView；
* （7）HandlerAdapter将Handler执行结果ModelAndView返回给DispatcherServlet；
* （8）DispatcherServlet将ModelAndView传给ViewReslover视图解析器进行解析；
* （9）ViewReslover解析后返回具体View；
* （10）DispatcherServlet对View进行渲染视图（即将模型数据填充至视图中）
* （11）DispatcherServlet响应用户。 相当于转发器，有了DispatcherServlet 就减少了其它组件之间的耦合度。

## Springmvc的优点:

如下：
* （1）它是基于组件技术的。全部的应用对象,无论控制器和视图,还是业务对象之类的都是 java组件.并且和Spring提供的其他基础结构紧密集成
* （2）不依赖于Servlet API(目标虽是如此,但是在实现的时候确实是依赖于Servlet的)
* （3）可以任意使用各种视图技术,而不仅仅局限于JSP
* （4） 支持各种请求资源的映射策略
* （5）它应是易于扩展的

## Spring MVC的主要组键？

六个主要组件：
* （1）前端控制器 DispatcherServlet（不需要程序员开发）
作用：接收请求、响应结果 相当于转发器，有了DispatcherServlet 就减少了其它组件之间的耦合度。

* （2）处理器映射器HandlerMapping（不需要程序员开发）
作用：根据请求的URL来查找Handler

* （3）处理器适配器HandlerAdapter
注意：在编写Handler的时候要按照HandlerAdapter要求的规则去编写，这样适配器HandlerAdapter才可以正确的去执行Handler。

* （4）处理器Handler（需要程序员开发）

* （5）视图解析器 ViewResolver（不需要程序员开发）
作用：进行视图的解析 根据视图逻辑名解析成真正的视图（view）

* （6）视图View（需要程序员开发jsp）
View是一个接口， 它的实现类支持不同的视图类型（jsp，freemarker，pdf等等）

## springMVC和struts2的区别有哪些?

区别：
* （1）springmvc的入口是一个servlet即前端控制器（DispatchServlet），而struts2入口是一个filter过虑器（StrutsPrepareAndExecuteFilter）。
* （2）springmvc是基于方法开发(一个url对应一个方法)，请求参数传递到方法的形参，可以设计为单例或多例(建议单例)，struts2是基于类开发，传递参数是通过类的属性，只能设计为多例。
* （3）Struts采用值栈存储请求和响应的数据，通过OGNL存取数据，springmvc通过参数解析器是将request请求内容解析，并给方法形参赋值，将数据和视图封装成ModelAndView对象，最后又将ModelAndView中的模型数据通过reques域传输到页面。Jsp视图解析器默认使用jstl。

## SpringMVC怎么样设定重定向和转发的？

举例：
* （1）在返回值前面加"forward:"就可以让结果转发,譬如"forward:user.do?name=method4"
* （2）在返回值前面加"redirect:"就可以让返回值重定向,譬如"redirect:[http://www.baidu.com](http://www.baidu.com/)"

## SpringMvc怎么和AJAX相互调用的？

通过Jackson框架就可以把Java里面的对象直接转化成Js可以识别的Json对象。具体步骤如下 ：
* （1）加入Jackson.jar
* （2）在配置文件中配置json的映射
* （3）在接受Ajax方法里面可以直接返回Object,List等,但方法前面要加上@ResponseBody注解。

## SpringMvc里面拦截器是怎么写的：

有两种写法,一种是实现HandlerInterceptor接口,另外一种是继承适配器类,，接着在接口方法当中，实现处理逻辑；然后在SpringMvc的配置文件中配置拦截器即可:

```xml
<!-- 配置SpringMvc的拦截器 -->
<mvc:interceptors>
	<!-- 配置一个拦截器的Bean就可以了 默认是对所有请求都拦截 -->
	<bean id="myInterceptor" class="com.et.action.MyHandlerInterceptor"></bean>
	<!-- 只针对部分请求拦截 -->
 	<mvc:interceptor>
		<mvc:mapping path="/modelMap.do" />
			<bean class="com.et.action.MyHandlerInterceptorAdapter" /> 
	</mvc:interceptor>
</mvc:interceptors>
copy
```

## 如何解决POST请求中文乱码问题，GET的又如何处理呢？

（1）解决post请求乱码问题：
在web.xml中加入：

```xml
<filter>
    <filter-name>CharacterEncodingFilter</filter-name>
    <filter-class>org.springframework.web.filter.CharacterEncodingFilter</filter-class>
    <init-param>
        <param-name>encoding</param-name>
        <param-value>utf-8</param-value>
    </init-param>
</filter>
<filter-mapping>
    <filter-name>CharacterEncodingFilter</filter-name>
    <url-pattern>/*</url-pattern>
</filter-mapping>
copy
```

（2）get请求中文参数出现乱码解决方法有两个：

①修改tomcat配置文件添加编码 `URIEncoding="utf-8"`与工程编码一致，如下：

```xml
<Connector URIEncoding="utf-8" connectionTimeout="20000" port="8080" protocol="HTTP/1.1" redirectPort="8443"/>
copy
```

②另外一种方法对参数进行重新编码：ISO8859-1是tomcat默认编码，需要将tomcat编码后的内容按utf-8编码。

```java
String userName = new String(request.getParamter("userName").getBytes("ISO8859-1"),"utf-8")
copy
```

## Spring MVC的异常处理 ？

答：可以将异常抛给Spring框架，由Spring框架来处理；我们只需要配置简单的异常处理器，在异常处理器中添视图页面即可。

## SpringMvc的核心入口类是什么,Struts1,Struts2的分别是什么：

答：SpringMvc的是DispatchServlet,Struts1的是ActionServlet,Struts2的是StrutsPrepareAndExecuteFilter。

## SpringMvc的控制器是不是单例模式,如果是,有什么问题,怎么解决？

答：是单例模式,所以在多线程访问的时候有线程安全问题,不要用同步,会影响性能的,解决方案是在控制器里面不能写字段。

## SpingMvc中的控制器的注解一般用那个,有没有别的注解可以替代？

答：一般用@Conntroller注解,表示是表现层,不能用用别的注解代替。

## @RequestMapping注解用在类上面有什么作用？

答：是一个用来处理请求地址映射的注解，可用于类或方法上。用于类上，表示类中的所有响应请求的方法都是以该地址作为父路径。

## 怎么样把某个请求映射到特定的方法上面？

答：直接在方法上面加上注解@RequestMapping,并且在这个注解里面写上要拦截的路径。

## 如果在拦截请求中,我想拦截get方式提交的方法,怎么配置？

答：可以在@RequestMapping注解里面加上method=RequestMethod.GET。

## 怎么样在方法里面得到Request,或者Session？

答：直接在方法的形参中声明request,SpringMvc就自动把request对象传入。

## 如果想在拦截的方法里面得到从前台传入的参数,怎么得到？

答：直接在形参里面声明这个参数就可以,但必须名字和传过来的参数一样。

## 如果前台有很多个参数传入,并且这些参数都是一个对象的,那么怎么样快速得到这个对象？

答：直接在方法中声明这个对象,SpringMvc就自动会把属性赋值到这个对象里面。

## SpringMvc中函数的返回值是什么？

答：返回值可以有很多类型,有String, ModelAndView，但一般用String比较好。

## SpringMvc用什么对象从后台向前台传递数据的？

答：通过ModelMap对象,可以在这个对象里面用put方法,把对象加到里面,前台就可以通过el表达式拿到。

## SpringMvc中有个类把视图和数据都合并的一起的,叫什么？

答：ModelAndView。

## 怎么样把ModelMap里面的数据放入Session里面？

答：可以在类上面加上@SessionAttributes注解,里面包含的字符串就是要放入session里面的key。

## 当一个方法向AJAX返回特殊对象,譬如Object,List等,需要做什么处理？

答：要加上@ResponseBody注解。

作　　者：Y.yang Blog
出　　处：https://www.cnblogs.com/yoci/p/10642379.html
关于博主：热爱技术，喜欢专研，一个平凡的架构梦，每天进步一点点，共勉~。
版权声明：-个人学习笔记-非商业性使用，部分资料来自互联网如有侵权联系删除，欢迎转载，但希望能给出原文连接。
声援博主：如果您觉得文章对您有帮助，可以点击文章右下角【推荐】一下。您的鼓励是博主的最大动力！

## 参考文章
* https://www.cnblogs.com/yoci/p/10642379.html