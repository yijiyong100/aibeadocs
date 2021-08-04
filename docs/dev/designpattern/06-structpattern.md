---
title: 设计模式-结构型模式
---

::: tip
本文主要是介绍 设计模式-结构型模式 。
:::

[[toc]]


## 设计模式-结构型模式介绍

　设计模式都是比较抽象的概念，所以大家一定要确保看懂类图而后再自己写代码加强记忆。

## 概述

　　结构型模式共七种：

- 适配器模式（Adapter）　　　　　　　　
- 外观模式（Facade）
- 桥接模式（Bridge）
- 装饰器模式（Decorator）
- 代理模式（Proxy）
- 享元模式（Flyweight）
- 组合模式（Composite）

　　其中又分为

　　接口适配：适配器、外观、桥接模式

　　行为扩展：装饰

　　性能与对象访问：代理、享元模式

　　抽象集合：组合模式

## 一、适配器模式

　　定义：将一个类的接口转换成客户希望的另外一个接口，Adapter模式使得原本由于接口不兼容而不能一起工作的那些类可以一起工作。

　　角色：适配器（Adapter）、被适配类、对象（Adaptee）

　　理解：客户需要Target，现实只有Adaptee，可以用一个实现Target协议的适配器通过类继承或者对象组合类获得被Adaptee。

　　类图：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dev/designpattern/3dp/653971-20170527222851782-1872713996.png')" alt="wxmp">

　　例子代码：



``` java
// 原有的接口，不符合客户要求interface IOrigin{
    public void deal();
}// 定义一个符合客户要求的新接口
interface ITarget{
    public void newDeal(int type);
}
class Target implements ITarget{
    private IOrigin origin;
    public void newDeal(int type){
        if (type==0){
            origin.deal();
        }else{
            //做其他
        }
    }
}
public class TestAdapter {
    public  void test(){
        // 原来是IOrigin接口但是不符合我要求，所以用ITarget适配一下
        // 
        ITarget target = new Target();
        target.newDeal(1);
    }
}
```



## 二、外观模式

　　定义：为子系统中一组不同的接口提供统一的接口

　　什么时候用：1.子系统正逐渐变得复杂，应用模式的过程中演化出许多类。可以使用外观为这些子系统类提供一个较简单的接口。2.可以使用外观对子系统分层，每个字系统级别有一个外观做为入口。让她们通过外观进行通信，可以简化他们的依赖关系。

　　类图：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dev/designpattern/3dp/653971-20170527223017594-1460630863.png')" alt="wxmp">

　　例子代码：



``` java
// 一个维修汽车厂系统包括，小车维修、公交维修、验收 
// 小车
class Car{
    // 维修
    public void repair();
}
// 公车
class Bus{
    // 维修
    public void repair();
}
// 维修人员
class Repairer{
    public void doRepair();
}
// 验收人员
class Checker{
    public void doCheck();
}

// 老板不可能管的那么细，他需要雇佣一个经理
class Leader{
    private Repairer repairer;
    private Checker checker;
    public void repair();
    public boolean check();
}
public class TestFacade {
    public void test(){
        // 老板接一个单子时，直接叫经理去修车，然后再问经理是否完成,这个经理就是一个外观
        Leader leader = new Leader();
        // 通知经理修车，不管经理下面有多少个维修人员，验收人员
        leader.repair();
        boolean isOk = leader.check();
    }
}
```



## 三、桥接模式

　　定义：将抽象部分与它的实现部分分离，使它可以独立的变更

　　角色：抽象层接口（Abstraction）、具体抽象层、实现者接口、具体实现者。

　　理解：这里有两个接口，一个是抽象层接口Abstraction，一个是Implementor接口，其中Abstraction持有Implementor的引用。客户端通过Abstraction来连接Implementor，以后Implementor可以动态的改变而不影响Abstraction。　　

　　什么时候用：1.不想在抽象与实现之间形成固定的绑定关系（这样就能在运行时切换实现）。2.抽象与实现都应可以通过子类化独立进行扩展。
3.对抽象的实现进行修改不应影响客户端代码。4.如果每个实现需要额外的子类以细化抽象，则说明有必要把它们分成两个部分。5.想在带有不同抽象接口的多个对象之间共享一个实现。

　　类图：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dev/designpattern/3dp/653971-20170527223711860-142102706.png')" alt="wxmp">

　　例子代码：



``` java
interface ILeader{
    public void doSomething();
}
class LeaderA implements ILeader{
    @Override
    public void doSomething() {}
}
class LeaderB implements ILeader{
    @Override
    public void doSomething() {}
}
class Boss {
    ILeader leader;
    public void setLeader(ILeader leader) {
        this.leader = leader;
    }
    public void doSomething(){
        this.leader.doSomething();
    }
}
public class TestBirdge {
    public void test(){
        Boss boss = new Boss();
        LeaderA leaderA = new LeaderA();
        boss.setLeader(leaderA);
        boss.doSomething();
        // 当某个经理离职的时候，老板可以再找一个有经验的经理来做事,
        LeaderB leaderB = new LeaderB();
        boss.setLeader(leaderB);
        boss.doSomething();
    }
}
```



## 四、装饰器模式

　　定义：动态的给对象添加一些额外的责任，就增加功能来说，装饰比生成子类更为灵活。

　　角色：组件接口（Component）、具体的组件、继承至Component的修饰接口（Decorator）、具体的修饰

　　理解：修饰接口Decorator继承Component，并持有Component的一个引用，所以起到了复用Component并增加新的功能。

　　什么时候用：1.想要在不影响其他对象的情况下，以动态、透明的方式给单个对象添加职责。2.想要扩展一个类的行为，却做不到。类定义可能被隐藏，无法进行子类化；或者对类的每个行为的扩展，哦支持每种功能组合，将产生大量的子类。



　　类图：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dev/designpattern/3dp/653971-20170527224017844-1132264734.png')" alt="wxmp">

 

　　例子代码：



``` java
interface ICar{
    public void run();
}
class Car implements ICar{
    @Override
    public void run() {

    }
}
// 现在想给汽车添加 氮气加速
// 下面用子类化方式实现
class SubClassCar extends Car{
    @Override
    public void run() {
        this.addNitrogen();
        super.run();
    }
    public void addNitrogen(){}
}
// 下面用装饰模式实现
class DecoratorCar implements ICar{
    private Car car;
    @Override
    public void run() {
        this.addNitrogen();
        car.run();
    }
    public void addNitrogen(){}
}
public class TestDecorator {
    public void test(){
        
    }
}
```



 

 

## 五、代理模式

　　定义：为其他对象提供一种代理以控制对这个对象的访问

　　角色：客户端（Client）、目标接口（subject）代理对象（Proxy）、真正的目标对象（RealSubject）

　　虚拟代理：客户端拥有Subject的引用，其实就是Proxy对象，Proxy对象持有RealSubject的引用，调用Proxy.request  Proxy会实际调用RealSubject.request

　　类图：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dev/designpattern/3dp/653971-20170527224537094-1672998526.png')" alt="wxmp">

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dev/designpattern/3dp/653971-20170527224611953-1023389966.png')" alt="wxmp">

 

例子代码：



``` java
// 一个顾客要买房
class Customer{
    public void sellHouse(){
    }
}
class Proxy {
    private Customer customer;
    public void buyHouse(){
        customer.sellHouse();
    }
}
public class TestProxy {
    public void test(){
        // 一个买家要买房的话直接跟中介（代理）大交道就可以了
        Proxy proxy = new Proxy();
        proxy.buyHouse();
    }
}
```



 

## 六、组合模式

　　定义：将对象组合成树形结构以表示’部分-整体’的层次结构。组合模式使得用户对单个对象和组合对象的使用具有一致性。

　　理解：组合模式让我们可以把相同的基类型的对象组合到树状结构中，其中父节点包含同类型的子节点。

　　什么时候用：1.想获得对象抽象的树形表示（部分-整体层次结构）。2.想让客户端统一处理组合结构中的所有对象。
　　类图：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dev/designpattern/3dp/653971-20170527224849844-1479696812.png')" alt="wxmp">

## 七、享元模式

　　定义：运用共享技术有效地支持大量细粒度的对象。

　　角色：享元池、享元接口、具体享元对象

　　理解：客户端需要享元对象时，先去享元池寻找，如果找到了就直接复用，如果没有找到就创建享元对象并保存到享元池。

　　类图：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dev/designpattern/3dp/653971-20170527225040188-528422058.png')" alt="wxmp">

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dev/designpattern/3dp/653971-20170527225138828-1204165094.png')" alt="wxmp">

 





## 参考文章
* https://www.cnblogs.com/shuigu/p/6908520.html
* https://www.cnblogs.com/shuigu/p/6911822.html
* https://www.cnblogs.com/shuigu/p/6911827.html