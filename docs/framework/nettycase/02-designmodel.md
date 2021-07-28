---
title: Netty-设计模式应用
---

::: tip
本文主要是介绍 Netty-设计模式应用 。
:::

[[toc]]

## 常用设计模式的实现，以及Netty中的设计模式

## 1.观察者模式

　　有两个角色，观察者和被观察者。当被观察者发出消息后，注册了的观察者会收到其消息，而没有注册的观察者就不会收到。



``` java
//定义观察者接口
interface Observer{
    //通知观察者
    void notify(String message);
}

//定义被观察者
interface Observed{
    //注册观察者
    void registerObserver(Observer o);
    //移除观察者
    void removeObserver(Observer o);
    //通知观察者
    void notifyObserver();
}

//实现一个被观察者（女神）
class Gril implements Observed{
    //女神最近的消息
    private String message;
    //追求女神的人
    List<Observer> observerList;

    public Gril(){
        observerList=new ArrayList<>();
    }

    @Override
    public void registerObserver(Observer o) {
        //多了一位追求者
        observerList.add(o);
    }

    @Override
    public void removeObserver(Observer o) {
        //一位勇士放弃了
        observerList.remove(o);
    }

    @Override
    public void notifyObserver() {
        //女神发出了一点消息
        for(Observer o:observerList){
            o.notify(message);
        }
    }

    public void setMeesage(String message){
        this.message=message;
    }
}

//实现观察者
class Handsome_Boy implements Observer{
    @Override
    public void notify(String message) {
        System.out.println("隔壁班帅哥收到消息:"+message);
    }
}
class Lao_Wang implements Observer{
    @Override
    public void notify(String message) {
        System.out.println("老王收到消息："+message);
    }
}
class Gay implements Observer{
    @Override
    public void notify(String message) {
        System.out.println("小伙汁收到消息："+message);
    }
}
//测试使用
public class observer_test {
    public static void main(String[] args) {
        //首先创建几个观察者和被观察者
        Gril gril=new Gril();
        Handsome_Boy boy=new Handsome_Boy();
        Gay gay=new Gay();
        Lao_Wang wang=new Lao_Wang();

        //注册观察者
        gril.registerObserver(boy);
        gril.registerObserver(wang);

        //被观察者发出通知
        gril.setMeesage("我好无聊啊");
        gril.notifyObserver();
    }
}
```



　　Netty中的应用：NioSocketChannel.writeAndFlush()。

## 2.责任链模式

　　责任链模式，让多个对象都有可能处理同一个请求，把多个对象连成一条链，让事件在这条链上传播，并且链上每个节点都可以终止传播 。熟悉Netty的朋友一定了解过这种设计模式，pipeline就像一个责任链，ChannelHandler就是其中处理逻辑的节点。



``` java
//创建一个逻辑处理器的抽象类
abstract class AbstractHandler {
    //下一个逻辑处理器，如果你想双向传播，还可以定义一个前节点
    AbstractHandler nextHandler;
    //执行事件并往下传播
    public void Execute(String message) {
        write(message);
　　　//可以加上其他条件，终止传播
        if (nextHandler != null)
            nextHandler.Execute(message);
    }
    //设置下一个逻辑处理器
    public void setNextHandler(AbstractHandler handler) {
        this.nextHandler = handler;
    }
    //实际的逻辑方法，需要具体的逻辑处理器去实现
    abstract void write(String message);
}

//逻辑处理器A
class HandlerA extends AbstractHandler {
    //实际的逻辑代码
    @Override
    void write(String message) {
        System.out.println("逻辑处理器A执行：" + message);
    }
}
//逻辑处理器B
class HandlerB extends AbstractHandler {
    @Override
    void write(String message) {
        System.out.println("逻辑处理器B执行：" + message);
    }
}
//逻辑处理器C
class HandlerC extends AbstractHandler {
    @Override
    void write(String message) {
        System.out.println("逻辑处理器C执行：" + message);
    }
}
//测试使用
public class Chain_ResponsibilityTest {
    public static void main(String[] args) {
        //首先创建逻辑处理器对象
        AbstractHandler a = new HandlerA();
        AbstractHandler b = new HandlerB();
        AbstractHandler c = new HandlerC();

        //把多个对象连成一条链
        a.setNextHandler(b);
        b.setNextHandler(c);

        //从头节点开始执行
        a.Execute("你好");
    }
}
```



　　最后ABC会按照链表顺序输出你好。

 

## 3.单例模式

　　单例模式的特点是一个类全局只有一个变量，创建时是线程安全的。
　　常见单例模式实现的代码：



``` java
public class Singleton {
    private static Singleton singleton;
    private Singleton(){}
    public static Singleton getInstance(){
        if(singleton==null){
            synchronized (Singleton.class){
                if(singleton==null)
                    singleton=new Singleton();
            }
        }
        return singleton;
    }
}
```



　　重点在于私有化构造函数，然后定义一个私有的静态全局变量，用以存储当前类的实例。向外提供一个获取实例的方法，如果当前实例变量不为空，说明已经实例化过，就直接返回。否则就进行实例化，为了防止多个线程同时进入if里面重复实例化，所以得加上synchronized。
　　另外，单例模式还有懒汉、饿汉之分。上面的代码就是一个懒汉单例模式，即获取实例时才去创建，这和Netty中的延迟加载是一个思想。而饿汉就是，定义实例变量时直接实例化了，同样要私有化构造函数，之后获取实例的方法直接返回这个变量就行。
　　单例模式在Netty中的应用：ReadTimeoutException等。

 

## 4.策略模式

　　简答地说，一个类的行为或算法可以在运行时更改，这就策略模式。当一个类需要根据运行时的数据，自动去选择执行什么逻辑，这时候我们就可以用上策略模式。下面来简单实现一下：



``` java
//定义一个行为接口
interface Calculate{
    int operation(int num1,int num2);
}

//继承行为接口，实现具体的行为或算法
class StrategyAdd implements Calculate{
    @Override
    public int operation(int num1,int num2) {
        return num1+num2;
    }
}
class StrategyMultiply implements Calculate{
    @Override
    public int operation(int num1, int num2) {
        return num1*num2;
    }
}
//封装一个供外部使用的类
class Use{
    private Calculate calculate;
    //接收的参数是那个父接口，这样实现了这个接口的类都可以传递进来
    public Use(Calculate calculate){
        this.calculate=calculate;
    }
    public int execute(int num1,int num2){
        //执行实际传递进来的类的operation方法
        return calculate.operation(num1,num2);
    }
}
public class Strategy {
    //测试使用
    public static void main(String[] args) {
        //假设这不是main方法，只是实际项目中的一个普通方法，args是用户或其他路径传入的一个参数
        //根据自己的实际需求甄别参数，选择具体行为
        if(args.length==0){
             Use use=new Use(new StrategyAdd());
             System.out.println(use.execute(5,5));//10
        }else {
            Use use1=new Use(new StrategyMultiply());
            System.out.println(use1.execute(5,5));//25
        }
    }
}
```



　　Netty中的应用：DefaultEventExecutorChooserFactor-newChooser

 

## 5.装饰者模式

　　不需要修改原有类的代码，就可以对这个类的对象附加其他效果。当要拓展一个类的功能时就可以使用这种设计模式。但这种设计模式的缺点也非常明显，会有额外的代码，当继承的层级多了以后，逻辑也更复杂。



``` java
//定义一个基础接口,获取商品价格
interface Goods{
    float getPrice();
}

//实现一个汽车商品，获取价格(原型)
class Car implements Goods{
    private float Price;
    public Car(float price){
        this.Price=price;
    }
    @Override
    public float getPrice() {
        return Price;
    }

}

//装饰者的父类，集中它们的优惠效果。如何集中的，关键在于装饰类获取价格方法时调用了父类的get方法。
//可以调试捋一捋，最终的价格计算其实是在打折时才开始一层层往上计算的
class On_Sale implements Goods{
    private Goods goods;
    public On_Sale(Goods goods){
        this.goods=goods;
    }
    @Override
    public float getPrice() {
        return this.goods.getPrice();
    }
}

//汽车立减优惠（装饰者类，原型附加功能）
class Car_Knock extends On_Sale{
    //立减金额
    private float amount;
    public Car_Knock(float amount,Goods goods){
        super(goods);
        this.amount=amount;
    }
    @Override
    public float getPrice() {
        return super.getPrice()-amount;
    }
}

//汽车打折优惠
class Car_Discount extends On_Sale{
    //打折多少
    private int discount;
    public Car_Discount(int discount,Goods goods){
        super(goods);
        this.discount=discount;
    }
    @Override
    public float getPrice() {
        return super.getPrice()*discount/10;
    }
}
//测试使用
public class decorator {
    public static void main(String[] args) {
        //创建一个原型，并传入价格
        Goods goods=new Car(120000);
        //当立减1000后
        goods=new Car_Knock(1000,goods);
        //在立减基础上再打个8折
        goods=new Car_Discount(8,goods);
        System.out.println(goods.getPrice());
    }
}
```



　　Netty中的应用：WrappedByteBuf、UnreleasableByteBuf、SimpleLeakAwareByteBuf。第一个类就相当于装饰者父类，后两个就是装饰类，而ByteBuf就是原型。

## 参考文章
* https://www.cnblogs.com/lbhym/p/12844295.html