---
title: 设计模式-创建型模式
---

::: tip
本文主要是介绍 设计模式-创建型模式 。
:::

[[toc]]

## 简介

### 设计模式分为三大类：

　　**创建型模式**，共五种：工厂方法模式、抽象工厂模式、单例模式、建造者模式、原型模式。

　　**结构型模式**，共七种：适配器模式、装饰器模式、代理模式、外观模式、桥接模式、组合模式、享元模式。

　　**行为型模式**，共十一种：策略模式、模板方法模式、观察者模式、迭代子模式、责任链模式、命令模式、备忘录模式、状态模式、访问者模式、中介者模式、解释器模式。

### 设计模式的六大原则：

| 原则                          | 解释                                                                                                                                       |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| **单一原则 （SRP）**          | **一个类只做一件事**                                                                                                                       |
| **开放-封闭原则（OCP）**      | **软件实体（类、模块、函数）可以拓展，但是不可修改**                                                                                       |
| **依赖倒转原则（DIP）  **     | **A.高层模块不应该依赖底层，两个都应该依赖抽。B.抽象不应该依赖细节，细节依赖抽象**                                                         |
| **里氏代换原则（LSP）**       | **子类型必须能够替换掉它们的父类型**                                                                                                       |
| **迪米特法则（LoD）**         | **如果两个类不必直接通信，那么这两个类不应当发生直接的相互作用。如果其中一个类需要调用另一个类的某一个方法的话，可通过第三者发起这个调用** |
| **合成/聚合复用原则（CARP）** | **尽量使用合成/聚合，尽量不要使用类继承**                                                                                                  |



 

　　这一篇为第一篇介绍创建型模式，创建型模式一共有5种：

- 工厂模式　
- 抽象工厂模式 
- 单例模式
- 构造者模式
- 原型模式　　　

## 一、工厂模式

　　定义：定义一个用于创建对象的接口，让子类决定实例化哪一个类。使一个类的实例化延迟到其子类

　　适用：当一个类不知道它所必须创建的对象的类的时候

　　类图：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dev/designpattern/3dp/653971-20170527222032657-134821402.png')" alt="wxmp">

 

　　例子代码：



``` java
interface IProduct{}
class ProductA implements IProduct{}
class ProductB implements IProduct{}
interface IFactory{
    public IProduct getProduct();
}
class FactoryA implements IFactory{
    public IProduct getProduct(){
        return new ProductA();
    }
}
class FactoryB implements IFactory{
    public IProduct getProduct(){
        return new ProductB();
    }
}
// 工厂方法
class Factory {
    public IProduct getProductA(){
        return new ProductA();
    }
    public IProduct getProductB(){
        return new ProductB();
    }
    public IProduct getProduct(int type){
        if (type==1){
            return new ProductA();
        }else{
            return new ProductB();
        }
    }
}
public class TestFactory {
    public static void test(){
        IFactory factory = new FactoryA();
        IProduct product =factory.getProduct();
        // 
        factory = new FactoryB();
        product =factory.getProduct();
    }
}
```



## 二、抽象工厂模式

　　定义：提供一个创建一系列相关或相互依赖对象的接口，而无需指定它们具体的类

　　适用：一个系统要独立于它的产品的创建、组合和表示时

　　与工厂模式的区别：工厂模式的一个工厂接口的子类只能实例化一个产品；抽象工厂能实例多个产品

　　类图：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dev/designpattern/3dp/653971-20170527222201719-1934253831.png')" alt="wxmp">

 

　　例子代码：



``` java
// 产品1interface IProduct1{}
class Product1A implements IProduct1{}
// 扩展产品1 B系列
class Product1B implements IProduct1{}
// 产品2
interface IProduct2{}
class Product2A implements IProduct2{}
// 扩展产品2 B系列
class Product2B implements IProduct2{}
// 工厂
interface IFactory{
    public IProduct1 getProduct1();
    public IProduct2 getProduct2();
};
// 工厂 A ，生产A系列产品
class FactoryA implements IFactory{
    public IProduct1 getProduct1(){
        return new Product1A();
    };
    public IProduct2 getProduct2(){
        return new Product2A();
    };
}
// 工厂 B ，生产B系列产品
class FactoryB implements IFactory{
    public IProduct1 getProduct1(){
        return new Product1B();
    };
    public IProduct2 getProduct2(){
        return new Product2B();
    };
}
public class testAbstractFactory {
    public void test(){
        IFactory factory = new FactoryA();
        IProduct1 product1A = (IProduct1)factory.getProduct1();
        IProduct2 product2A = (IProduct2)factory.getProduct2();


        // 如果扩展产品系列B时，添加 FactoryB、ProductB即可，不需要修改原来代码
        factory = new FactoryB();
        IProduct1 product1B = (IProduct1)factory.getProduct1();
        IProduct2 product2B = (IProduct2)factory.getProduct2();

    }
}
```



## 三、单例模式

　　定义：保证一个类仅有一个实例，并提供一个访问它的全局访问点。

　　适用：当类只能有一个实例而且客户可以从一个众所周知的访问点访问它时

  类图：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dev/designpattern/3dp/653971-20170527222313688-531427659.png')" alt="wxmp">

 

　　例子代码：



``` java
class Singleton {
    private static Singleton instance = null;
    // 防止被外部实例化
    private Singleton() {
    }
    public static Singleton getInstance() {
        if (instance == null) {
            instance = new Singleton();
        }
        return instance;
    }
}
public class TestSingleton {
    public test(){
        // 获取单例
        Singleton singleton = Singleton.getInstance();
    }
}
```



##  四、构造者模式 

　　定义：将一个复杂对象的构建与它的表示分离，使得同样的构建过程可以创建不同的表示

　　适用：当创建复杂对象的算法应该独立于该对象的组成部分以及它们的装配方式时

　　类图：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dev/designpattern/3dp/653971-20170527222532078-1884719867.png')" alt="wxmp">

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dev/designpattern/3dp/653971-20170527222554532-1882160763.png')" alt="wxmp">

　　例子代码：



``` java
class Person{
    private String name;
    private String address;
    private int age;
    private int sex;
    private int height;
    private int weight;
    public void setName(String name) {this.name = name;}
    public String getName() {return name;}
    public void setAddress(String address) {this.address = address;}
    public String getAddress() {return address;}
    public void setAge(int age) {this.age = age;}
    public int getAge() {return age;}
    public void setSex(int sex) {this.sex = sex;}
    public int getSex() {return sex;}
    public void setHeight(int height) {this.height = height;}
    public int getHeight() {return height;}
    public void setWeight(int weight) {this.weight = weight;}
    public int getWeight() {return weight;}
}
class PersonBuilder{
    private Person person;
    public PersonBuilder(){
        this.person = new Person();
    }
    public PersonBuilder name(String name){
        this.person.setName(name);
        return this;
    }
    public PersonBuilder address(String address){
        this.person.setAddress(address);
        return this;
    }
    public PersonBuilder age(int age){
        this.person.setAge(age);
        return this;
    }
    public PersonBuilder sex(int sex){
        this.person.setSex(sex);
        return this;
    }
    public PersonBuilder height(int height){
        this.person.setHeight(height);
        return this;
    }
    public PersonBuilder weight(int weight){
        this.person.setWeight(weight);
        return this;
    }
}
public class TestBuilder {
    public test(){
        PersonBuilder builder = new PersonBuilder();
        Person person = builder.name("lion")
                .address("america")
                .age(18)
                .sex(2)
                .height(180)
                .weight(150);
    }
}
```



##  五、原型模式

　　定义：用原型实例指定创建对象的种类，并且通过拷贝这些原型创建新的对象

　　适用：当要实例化的类是在运行时刻指定时；或者需要创建多个对象并且这些对象内部状态相差不大

　　例子代码：



``` java
class Car implements Cloneable{
    private int id;
    public int getId() {return id;}
    public void setId(int id) {this.id = id;}

    public Car clone(){
        try {
            return (Car)super.clone();
        }catch (CloneNotSupportedException e) {
            e.printStackTrace();
            return null;
        }
    }
}
class Prototype implements Cloneable{
    private int id;
    private Car car;
    public Car getCar() {return car;}
    public void setCar(Car car) {this.car = car;}
    public int getId() {return id;}
    public void setId(int id) {this.id = id;}
    public Object clone(){
        try {
            boolean deep = true;
            if (deep){
                /**
                 * 深复制，复制出了两辆车
                 * */
                Prototype prototype = (Prototype)super.clone();
                prototype.setCar((Car)this.car.clone());
                // 继续复制其他引用对象
                return prototype;

            }else{
                /**
                 * 浅复制 ，是同一辆车
                 * */
                return super.clone();
            }
        } catch (CloneNotSupportedException e) {
            e.printStackTrace();
            return null;
        }
    }
}
public class TestPrototype {
    public void test(){
        Prototype p1 = new Prototype();
        p1.setCar(new Car());
        p1.setId(1);
        // 复制
        Prototype p2 = (Prototype)p1.clone();
        p2.setId(2);
    }
} 
```















## 参考文章
* https://www.cnblogs.com/shuigu/p/6908520.html
* https://www.cnblogs.com/shuigu/p/6911822.html
* https://www.cnblogs.com/shuigu/p/6911827.html