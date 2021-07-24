---
title: Spring-简洁版总结
---

::: tip
本文主要是介绍 Spring-简洁版总结 。
:::


[[toc]]

## Spring简洁版总结

### 一:为什么使用spring?

spring泉眼,最好的水,在企业开发中,是业务层最好的框架

### spring优点是什么?

1.低侵入,低耦合

2.方便集成其他框架

3.降低javaee开发难度

4.spring包含javaee三层每一层的解决方案(一站式)

 

### 二:Spring三大功能?

IOC DI AOP

IoC? inverse of control:控制反转?简单的说，就是把对象的实例化工作交给容器来完成；

传统的应用,a依赖b耦合度高,而spring呢,耦合度低,体现在哪呢?对象交给容器实例化,我们用

的时候去容器拿就好,实现真正的接口编程

通过Spring的IoC功能,我们在容器中得到了一个一个独立的bean.

### 三:spring使用步骤?

1,导入jar包依赖包

2,设置xml配置文件 其作用:告诉spring帮我管理哪些bean,里面有id和class两个要写

3.使用容器

3.1创建资源文件对象

3.2创建beanFactory对象,并传入上面的资源文件对象,注意:该对象的基于xml配置文件的

3.3通过getbean拿对象(按照名字和类型去拿)

### 四:spring加载过程

1,首先找到配置文件并加载

2,解析bean元素,识别id和class属性

3,通过反射建立一个class.forname.newInstance对象实例

4,把id作为key,把实例作为value存到容器中

5,通过getbean拿到对象实例

 

### 总结:

spring本质把原本写在java里的东西搬到xml配置文件里了,配置文件里配置的不是类型是,bean实例

 

一些细节:

我们通常吧配置文件分散到各个模块中,在总的模块中通过import引入,使得结构更清晰明了,有利于维护

和代码的悦读与阅读.

bean, id属性要求是唯一的,name不是,可以是多个名字,作用基本相同

 

### 五:测试相关的问题

传统的测试:缺点在于手动开启和关闭容器,每运行一个测试用例都要重启一次spring容器,我们的

spring容器是运行在JUnit测试里的

spring推荐使用spring的测试

其使用步骤为:

1.导入jar包

2.在测试类上加@runWith标签和ContextConfiguration标签

3.添加一个BeanFactory字段,并在他上面加一个@Autowired标签

4,在测试中,可以直接通过这个BeanFactory字段拿我们需要的bean

 

 

 

### 六:关于容器:

BeanFactory是spring中提供的最简单的,最基本的容器,器提供了IOC/DI功能,其重要方法getbean

我们一般使用ApplicationContext,其提供的功能更加强大全面,ApplicationContext接口继承了

BeanFactory接口,提供了AOP功能

注:BeanFactory是延迟实例化,用的时候才实例化,ApplicationContext在容器启动是时候就已经实

例化了,可通过lazy-init设置延迟实例化.对于web应用来说,一般选择迫切实例化,且我们把比较耗时的事情

放在系统启动的时候完成;

 

Scope关键字

用来设置单例的,默认就是单例的,一般在持久化和业务层对象选择单例,在struts2请求不能为单例

 

### 七:DI 依赖注入

dependence inject(依赖注入) 把对象的依赖关系全部交给spring容器来处理;

分为构造器注入和setter注入和自动注入也叫注解

构造器注入:能保证所有的都正确注入,依赖对象多,会造成参数过多

setter优点:依赖多,代码不好维护,可能会产生忘记配置的问题可通过@Required注解来避免

 

### DI注解的使用:

1,使用DI注解,在spring的配置文件里面还是需要配置bean本身;

2,@Autowired

 1,autowired标签可以把需要的对象自动的注入到目标对象中;

 2,autowired标签可以放在字段上,也可以放在setter方法上面;

 

### autowired的执行流程:

   1,加载和解析XML文件;

   2,实例化所有的bean,并且方到spring的容器当中;

   3,解析对象的类型,如果对象类型的某些字段或者setter方法上面有@Autowired标签,

​     1,在容器中找到对应的对象;

​     2,把找到的对象设置到字段或者setter方法中;

 ### 怎么找对象?

   1,首先按照类型找;

   2,如果没有找到;系统报错(默认情况下,autowired标签有一个@Required标签的作用)

   3,如果找到多个,按照字段或者属性的名字,再用名字+类型去找;

   4,如果1,3都没有找到,报错;

**注:**

   1,可以通过设置autowired的required=false让这个属性(字段)可以没有值;

   2,可以通过在字段或者setter方法上添加@Qualifier来规定我要注入的bean的名字;

   3,可以在Spring的主要对象上面添加@Autowired,让spring自动注入;

   4,所以,我们的spring的测试类,可以直接引用需要测试的目标对象就可以了;

### @Resource

  也可以通过resource标签来自动注入;

选择:

1,Resource是JavaEE的规范,但是缺少spring对autowired标签的一些加强;

2,一般我们选择使用@Autowired标签;

 

 

### 总结:spring的IoC/DI能为我们的应用做什么?

1,使用传统的方式,会产生:

 1,应用使用了接口,但是并没有做到真正的解耦;

 2,应用中的DAO和service并没有做单例(性能较差);

2,使用spring,

 1,应用中真正的就按照接口在编程了;

 2,spring就像一个粘合剂,在XML文件中自动的帮我们初始化了所有的对象,并设置好所有对象之间的依赖关系;

 3,除了配置文件,根本感觉不到spring的存在;

 

 

### 八:AOP

Aspect Oritention Programming(面向切面编程),其也是一种更高级的动态代理

切入点:要加入业务逻辑的点(在哪些类的哪些方法上面;)

通知:通知包含两个方面,1,代表方法的执行时间,2,在这个时间上面要做什么事情;

切面:一个切入点+一个通知=一个切面(在什么地方,在什么时候,做什么事情);

织入:把一个切面应用到真实对象上面的过程,就叫做织入; 

在Java中,没有语言能够准确的描述切入点;所以,有一个AspectJ,这是一种语言,提供了用于描述切入点的语言;

 

### 使用Spring的AOP两种方式:

1,使用XML的配置方式;

2,使用Annotation的配置方式;

 

**小结:**

1,准备了真实的对象,准备一个类,这个类里面的方法用来提供通知里面的做什么;

2,这两个类都要配置到Spring容器中;

3,配置springAOP

 1,引入aop命名空间;

 <aop:config>

   <aop:point-cut expression="" id="" />

   <aop:aspect ref="">

​      <aop:before method="" pointcut-ref="">

​      <aop:after-returning method="" pointcut-ref="">

​      <aop:after-throwing method="" pointcut-ref="">

   </aop:aspect>

 </aop:config>

4,我们在客户端还是直接注入的是在spring里面配置的真实对象;

 实际上,spring在为这些对象创建好代理对象之后,会使用这些创建好的代理对象去替换容器中的原始对象;

 

### SpringAOP的执行流程:

1，解析xml；

2，实例化所有的bean；

3，解析aop:config；

  1，解析aop：aspect，得到aspect引用的对象；txManager

  2，解析aop:aspect里面的每一个切面；

   1，得到该aspect对应的pointcut-ref；

   2，得到pointcut-ref对应的pointcut的表达式；

   3，使用表达式中用于匹配类型的表达式；

   4，使用该表达式去和spring里面配置的所有的bean的类型进行匹配；

​     1，如果匹配不上，不管；

​     2，如果匹配上了，该对象作为spring动态代理的目标对象；

​       1，如果该对象实现了接口，使用JDK的动态代理包装；

​       2，如果该对象没有实现接口，使用cglib包装；

​       3，得到配置的拦截时机+逻辑提供类（txManager）的对应方法（从method解析）+pointcut表达式中方法的匹配模式创建一个拦截器

​       4，在把该拦截器使用对应的动态代理机制代理成代理对象；

​       5，替换spring容器中的对应bean的实例；


## 参考文章
* https://www.cnblogs.com/renshengruozhiruchujian/p/6803334.html

