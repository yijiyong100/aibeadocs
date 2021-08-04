---
title: 设计模式-行为型模式
---

::: tip
本文主要是介绍 设计模式-行为型模式 。
:::

[[toc]]

## 设计模式-行为型模式介绍

设计模式都是比较抽象的概念，所以大家一定要确保看懂类图，而后再自己写代码加强记忆。

## 概述

　　行为型模式一共有11种：

- 模板方法模式（Template Method）
- 策略模式（Strategy）
- 命令模式（Command）
- 中介者模式（Mediator）
- 观察者模式（Observer）
- 迭代器模式（Iteratior）
- 访问者模式（Visiter）
- 责任链模式（Chain of Responsibility）
- 备忘录模式（Memento）
- 状态模式（State）
- 解释器模式（Interpreter）

　　其中有分为：

　　算法封装：模板方法、策略、命令模式

　　对象去耦：中介、观察者模式

　　抽象集合：迭代器模式

　　行为扩展：访问者、责任链模式

　　对象状态：状态模式

　　解释器模式

## 一、模板方法模式 

　　定义：定义一个操作中算法的骨架，而将一些步骤延迟到子类中。模板方法使子类可以重定义算法的某些特定步骤而不改变该算法的结构。

　　适用：1.需要一次性实现算法的不变部分，并将可变行为留给子类来实现。2子类的共同行为应该被提出来放到公共类中，以避免代买重复。现有代码的差别应该被分离为新的操作。然后用一个调用这些新操作的模板方法来替换这些不同的代码。

　　类图：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dev/designpattern/3dp/653971-20170531095814289-1706535048.png')" alt="wxmp">

##  二、策略模式

　　定义：定义一系列算法，把它们一个个封装起来，并且使它们可互相替换。本模式使得算法可独立于使用它的客户而变化。

　　角色：策略接口（Strategy）、具体策略、环境对象

　　理解：环境对象持有Strategy的引用，Strategy对象可以动态改

　　类图：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dev/designpattern/3dp/653971-20170531100336399-1777006688.png')" alt="wxmp">

## 三、命令模式

　　定义：将请求封装成一个对象，从而可用不同的请求对客户端进行参数化，对请求排队或记录请求日志，以及支持可撤销的操作。

　　角色：客户端（Client）、命令调用者（Invoker）、命令接口（Command）、具体命令（ConcreteCommand）、命令接收者（Receiver）

　　理解：1.invoker保持有command的引用，command保持有Receiver的引用。2.客户创建Receiver、ConcreteCommand并把Receiver设置给ConcreteCommand，客户端直接通过ConcreteCommand.execute执行命令。或者创建一个Invoker并把ConcreteCommand设置给Invoker，然后通过Invoker来调用命令。

　　类图：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dev/designpattern/3dp/653971-20170531100824961-1338431598.png')" alt="wxmp">

## 四、中介者模式

　　定义：用中介对象封装一系列的对象交互。中介者使得各对象不需要显示地互相引用，从而使其耦合松散，而且可以独立的改变它们之间的交互。

　　角色：中介者接口（Mediator）、具体中介者、同事者接口（Colleague），具体同事者。

　　理解：每个Colleague都有一个Mediator实例，Mediator应该知道所有的Colleague

　　类图：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dev/designpattern/3dp/653971-20170531101453961-1480921203.png')" alt="wxmp">

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dev/designpattern/3dp/653971-20170531101939696-11931666.png')" alt="wxmp">

##  五、观察者

　　定义：定义了一种一对多的关系，让多个观察者监听某一主题对象，这个主题对象的状态变化时，会通知所有观察者对象，使它们自己更新自己

　　角色：发布者接口（Subject）、具体发布者、监听者接口（Observer）、具体监听者。

　　理解：Subject提供注册于注销的方法，客户把所有的Observer注册到Subject当中，当需要时Subject遍历所有注册的Observer并通知他们。

　　类图：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dev/designpattern/3dp/653971-20170531102234368-1770693265.png')" alt="wxmp">

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dev/designpattern/3dp/653971-20170531102303289-1413407777.png')" alt="wxmp">

## 六、迭代器模式

　　定义：提供一种方法顺序的访问一个聚合对象的各个元素，而又不暴露该对象内部表示

　　角色：迭代器、集合

　　理解：把遍历集合的职能从集合本身转移到迭代器对象，不同的迭代器可以执行不同的遍历策略。

　　适用：1.需要访问组合对象的内容，而又不暴露其内部表示。2.需要通过多种方式遍历组合对象3.需要提供一个统一的接口，用来遍历各种类型组合对象。

　　类图：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dev/designpattern/3dp/653971-20170531102831118-1697774337.png')" alt="wxmp">

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dev/designpattern/3dp/653971-20170531102852977-2022128856.png')" alt="wxmp"> 

## 七、访问者模式

　　定义：表示一个作用于某对象结构中的各元素的操作。它让我们可以在不改变各元素的类的前提下定义作用于这些元素的新操作。

　　角色：访问者（Vistor）接口、具体访问者、访问元素(Element)接口、具体元素

　　理解：1.元素对象通常是“部分-整体”结构中的节点。2.客户端创建一个ConcreteVistoer，把它传给一个ConcreteElement，ConcreteElement的所有集合都接受ConcreteVistoer的访问。

　　适用：

1. 一个复杂的对象结构包含很多其他对象，它们有不同的接口，但是相对这些对象实施一些依赖于其具体类型的操作。

2. 需要对一个组合结构中的对象进行很多不相关的操作，但是不想让这些操作污染这些对象的类。可将相关操作集中起来，定义在一个访问者类中，并在需要在访问者中定义的操作时使用它。

3. 定义复杂的结构类很少作修改，但经常需要向其添加新的操作。

　　类图：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dev/designpattern/3dp/653971-20170531103351243-1130284234.png')" alt="wxmp">

## 八、责任链模式

　　定义：使多个对象都有机会处理请求，从而避免请求的发送者与接受者之间的耦合关系。将这个对象连成一条链传递该请求，直到有一个对象处理它为止。

　　理解：对象引用同一类型的另一个对象，形成一条链。链中的每个对象实现了同样的方法，处理对链中第一个对象发起的同一个请求。

　　适用：

1. 有多个对象可处理请求，而处理程序只有在运行时才能确定。

2. 向一组对象发出请求，而不想现显式指定处理请求的特定处理程序。

　　类图：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dev/designpattern/3dp/653971-20170531104613164-1518603316.png')" alt="wxmp"> 

## 九、备忘录模式

　　定义：在不破坏封装的前提下，捕获一个对象的内部状态，并在该对象之外保存这个状态。这样以后就可将该对象恢复到原先保存的状态。、

　　角色：有三个角色：发起人（Originatior）、备忘录（Memento）、看管人（Caretaker）。

　　理解：发起人生成一个备忘录给看管人，看管人保存备忘录。当需要时，看管人获取备忘录交给发起人，发起人根据备忘录恢复自己。　　

　　类图：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dev/designpattern/3dp/653971-20170531104316930-1517976650.png')" alt="wxmp">

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dev/designpattern/3dp/653971-20170531104358586-153363401.png')" alt="wxmp">

 

 

## 十、状态模式

　　定义：允许一个对象在其内部状态改变时改变他的行为。对象看起来似乎改变了它的类。

　　角色：有2个角色：环境（context）、状态（state）

　　理解：1.state可以理解为一个接口。2.context持有state的一个实例，动态的改state就动态的改了context的行为。

　　类图：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dev/designpattern/3dp/653971-20170531104824914-1443641961.png')" alt="wxmp">

 

## 十一、解释器模式

　　定义：给定一个语言，定义它的文法的一种表示，并定义一个解释器，这个解释器使用该表示来解释语言中的句子。

　　角色：环境（context）、解释器

　　理解：给定一个环境，创建不同的解释器并把环境传给解释器，不同的解释器对环境有不同的解释。

　　类图：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dev/designpattern/3dp/653971-20170531105015930-1314888096.png')" alt="wxmp">

## 参考文章
* https://www.cnblogs.com/shuigu/p/6908520.html
* https://www.cnblogs.com/shuigu/p/6911822.html
* https://www.cnblogs.com/shuigu/p/6911827.html