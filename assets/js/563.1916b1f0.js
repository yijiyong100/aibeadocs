(window.webpackJsonp=window.webpackJsonp||[]).push([[563],{1079:function(a,v,t){"use strict";t.r(v);var _=t(53),r=Object(_.a)({},(function(){var a=this,v=a.$createElement,t=a._self._c||v;return t("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[t("div",{staticClass:"custom-block tip"},[t("p",{staticClass:"custom-block-title"},[a._v("TIP")]),a._v(" "),t("p",[a._v("本文主要是介绍Java类和接口基础。")])]),a._v(" "),t("p"),t("div",{staticClass:"table-of-contents"},[t("ul",[t("li",[t("a",{attrs:{href:"#类与接口"}},[a._v("类与接口")])]),t("li",[t("a",{attrs:{href:"#抽象类和接口的对比"}},[a._v("抽象类和接口的对比")]),t("ul",[t("li",[t("a",{attrs:{href:"#相同点"}},[a._v("相同点")])]),t("li",[t("a",{attrs:{href:"#不同点"}},[a._v("不同点")])])])]),t("li",[t("a",{attrs:{href:"#普通类和抽象类有哪些区别"}},[a._v("普通类和抽象类有哪些区别？")])]),t("li",[t("a",{attrs:{href:"#抽象类能使用-final-修饰吗"}},[a._v("抽象类能使用 final 修饰吗？")])]),t("li",[t("a",{attrs:{href:"#创建一个对象用什么关键字-对象实例与对象引用有何不同"}},[a._v("创建一个对象用什么关键字？对象实例与对象引用有何不同？")])]),t("li",[t("a",{attrs:{href:"#成员变量与局部变量的区别有哪些"}},[a._v("成员变量与局部变量的区别有哪些")]),t("ul",[t("li",[t("a",{attrs:{href:"#作用域"}},[a._v("作用域")])]),t("li",[t("a",{attrs:{href:"#存储位置"}},[a._v("存储位置")])]),t("li",[t("a",{attrs:{href:"#生命周期"}},[a._v("生命周期")])]),t("li",[t("a",{attrs:{href:"#初始值"}},[a._v("初始值")])]),t("li",[t("a",{attrs:{href:"#使用原则"}},[a._v("使用原则")])])])]),t("li",[t("a",{attrs:{href:"#在java中定义一个不做事且没有参数的构造方法的作用"}},[a._v("在Java中定义一个不做事且没有参数的构造方法的作用")])]),t("li",[t("a",{attrs:{href:"#一个类的构造方法的作用是什么-若一个类没有声明构造方法-改程序能正确执行吗-为什么"}},[a._v("一个类的构造方法的作用是什么？若一个类没有声明构造方法，改程序能正确执行吗？为什么？")]),t("ul",[t("li",[t("a",{attrs:{href:"#构造方法有哪些特性"}},[a._v("构造方法有哪些特性？")])])])]),t("li",[t("a",{attrs:{href:"#静态变量和实例变量区别"}},[a._v("静态变量和实例变量区别")])]),t("li",[t("a",{attrs:{href:"#静态变量与普通变量区别"}},[a._v("静态变量与普通变量区别")])]),t("li",[t("a",{attrs:{href:"#静态方法和实例方法有何不同"}},[a._v("静态方法和实例方法有何不同？")]),t("ul",[t("li",[t("a",{attrs:{href:"#在外部调用静态方法时"}},[a._v("在外部调用静态方法时：")])]),t("li",[t("a",{attrs:{href:"#静态方法在访问本类的成员时"}},[a._v("静态方法在访问本类的成员时：")])])])]),t("li",[t("a",{attrs:{href:"#在一个静态方法内调用一个非静态成员为什么是非法的"}},[a._v("在一个静态方法内调用一个非静态成员为什么是非法的？")])]),t("li",[t("a",{attrs:{href:"#什么是方法的返回值-返回值的作用是什么"}},[a._v("什么是方法的返回值？返回值的作用是什么？")])]),t("li",[t("a",{attrs:{href:"#值传递"}},[a._v("值传递")])]),t("li",[t("a",{attrs:{href:"#为什么-java-中只有值传递"}},[a._v("为什么 Java 中只有值传递")])]),t("li",[t("a",{attrs:{href:"#jdk-中常用的包有哪些"}},[a._v("JDK 中常用的包有哪些")])])])]),t("p"),a._v(" "),t("h2",{attrs:{id:"类与接口"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#类与接口"}},[a._v("#")]),a._v(" "),t("strong",[a._v("类与接口")])]),a._v(" "),t("h2",{attrs:{id:"抽象类和接口的对比"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#抽象类和接口的对比"}},[a._v("#")]),a._v(" 抽象类和接口的对比")]),a._v(" "),t("p",[a._v("抽象类是用来捕捉子类的通用特性的。接口是抽象方法的集合。")]),a._v(" "),t("p",[a._v("从设计层面来说，\n抽象类是对类的抽象，是一种模板设计，\n接口是行为的抽象， 是一种行为的规范。")]),a._v(" "),t("h3",{attrs:{id:"相同点"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#相同点"}},[a._v("#")]),a._v(" 相同点")]),a._v(" "),t("p",[a._v("接口和抽象类都不能实例化\n都位于继承的顶端，用于被其他实现或继承\n都包含抽象方法，其子类都必须覆写这些抽象方法")]),a._v(" "),t("h3",{attrs:{id:"不同点"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#不同点"}},[a._v("#")]),a._v(" 不同点")]),a._v(" "),t("table",[t("thead",[t("tr",[t("th",[a._v("参数")]),a._v(" "),t("th",[a._v("抽象类")]),a._v(" "),t("th",[a._v("接口")])])]),a._v(" "),t("tbody",[t("tr",[t("td",[a._v("声明")]),a._v(" "),t("td",[a._v("抽象类使用abstract关键字声明")]),a._v(" "),t("td",[a._v("接口使用interface关键字声明")])]),a._v(" "),t("tr",[t("td",[a._v("实现")]),a._v(" "),t("td",[a._v("子类使用extends关键字来继承抽象类。如果子类不是抽象类的话，它需要提供抽象类中所有声明的方法的实现")]),a._v(" "),t("td",[a._v("子类使用implements关键字来实现接口。它需要提供接口中所有声明的方法的实现")])]),a._v(" "),t("tr",[t("td",[a._v("构造器")]),a._v(" "),t("td",[a._v("抽象类可以有构造器")]),a._v(" "),t("td",[a._v("接口不能有构造器")])]),a._v(" "),t("tr",[t("td",[a._v("访问修饰符")]),a._v(" "),t("td",[a._v("抽象类中的方法可以是任意访问修饰符")]),a._v(" "),t("td",[a._v("接口方法默认修饰符是public。并且不允许定义为 private 或者 protected")])]),a._v(" "),t("tr",[t("td",[a._v("多继承")]),a._v(" "),t("td",[a._v("一个类最多只能继承一个抽象类")]),a._v(" "),t("td",[a._v("一个类可以实现多个接口")])]),a._v(" "),t("tr",[t("td",[a._v("字段声明")]),a._v(" "),t("td",[a._v("抽象类的字段声明可以是任意的")]),a._v(" "),t("td",[a._v("接口的字段默认都是 static 和 final 的")])])])]),a._v(" "),t("p",[a._v("备注：Java8中接口中引入默认方法和静态方法，以此来减少抽象类和接口之间的差异。\n现在，我们可以为接口提供默认实现的方法了，并且不用强制子类来实现它。\n接口和抽象类各有优缺点，在接口和抽象类的选择上，必须遵守这样一个原则：\n行为模型应该总是通过接口而不是抽象类定义，所以通常是优先选用接口，尽量少用抽象类。")]),a._v(" "),t("p",[a._v("选择抽象类的时候通常是如下情况：需要定义子类的行为，又要为子类提供通用的功能。")]),a._v(" "),t("h2",{attrs:{id:"普通类和抽象类有哪些区别"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#普通类和抽象类有哪些区别"}},[a._v("#")]),a._v(" 普通类和抽象类有哪些区别？")]),a._v(" "),t("p",[a._v("普通类不能包含抽象方法，抽象类可以包含抽象方法。")]),a._v(" "),t("p",[a._v("抽象类不能直接实例化，普通类可以直接实例化。")]),a._v(" "),t("h2",{attrs:{id:"抽象类能使用-final-修饰吗"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#抽象类能使用-final-修饰吗"}},[a._v("#")]),a._v(" 抽象类能使用 final 修饰吗？")]),a._v(" "),t("p",[a._v("不能，定义抽象类就是让其他类继承的，如果定义为 final 该类就不能被继承，这样彼此就会产生矛盾，所以 final 不能修饰抽象类")]),a._v(" "),t("h2",{attrs:{id:"创建一个对象用什么关键字-对象实例与对象引用有何不同"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#创建一个对象用什么关键字-对象实例与对象引用有何不同"}},[a._v("#")]),a._v(" 创建一个对象用什么关键字？对象实例与对象引用有何不同？")]),a._v(" "),t("p",[a._v("new关键字，new创建对象实例（对象实例在堆内存中），对象引用指向对象实例（对象引用存放在栈内存中）。一个对象引用可以指向0个或1个对象（一根绳子可以不系气球，也可以系一个气球）;一个对象实例可以有n个引用指向它（可以用n条绳子系住一个气球）")]),a._v(" "),t("p",[t("strong",[a._v("变量与方法")])]),a._v(" "),t("h2",{attrs:{id:"成员变量与局部变量的区别有哪些"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#成员变量与局部变量的区别有哪些"}},[a._v("#")]),a._v(" 成员变量与局部变量的区别有哪些")]),a._v(" "),t("p",[a._v("变量：在程序执行的过程中，在某个范围内其值可以发生改变的量。从本质上讲，变量其实是内存中的一小块区域。")]),a._v(" "),t("p",[a._v("成员变量：方法外部，类内部定义的变量")]),a._v(" "),t("p",[a._v("局部变量：类的方法中的变量。")]),a._v(" "),t("p",[a._v("成员变量和局部变量的区别")]),a._v(" "),t("h3",{attrs:{id:"作用域"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#作用域"}},[a._v("#")]),a._v(" 作用域")]),a._v(" "),t("p",[a._v("成员变量：针对整个类有效。")]),a._v(" "),t("p",[a._v("局部变量：只在某个范围内有效。(一般指的就是方法,语句体内)")]),a._v(" "),t("h3",{attrs:{id:"存储位置"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#存储位置"}},[a._v("#")]),a._v(" 存储位置")]),a._v(" "),t("p",[a._v("成员变量：随着对象的创建而存在，随着对象的消失而消失，存储在堆内存中。")]),a._v(" "),t("p",[a._v("局部变量：在方法被调用，或者语句被执行的时候存在，存储在栈内存中。当方法调用完，或者语句结束后，就自动释放。")]),a._v(" "),t("h3",{attrs:{id:"生命周期"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#生命周期"}},[a._v("#")]),a._v(" 生命周期")]),a._v(" "),t("p",[a._v("成员变量：随着对象的创建而存在，随着对象的消失而消失")]),a._v(" "),t("p",[a._v("局部变量：当方法调用完，或者语句结束后，就自动释放。")]),a._v(" "),t("h3",{attrs:{id:"初始值"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#初始值"}},[a._v("#")]),a._v(" 初始值")]),a._v(" "),t("p",[a._v("成员变量：有默认初始值。")]),a._v(" "),t("p",[a._v("局部变量：没有默认初始值，使用前必须赋值。")]),a._v(" "),t("h3",{attrs:{id:"使用原则"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#使用原则"}},[a._v("#")]),a._v(" 使用原则")]),a._v(" "),t("p",[a._v("在使用变量时需要遵循的原则为：就近原则")]),a._v(" "),t("p",[a._v("首先在局部范围找，有就使用；接着在成员位置找。")]),a._v(" "),t("h2",{attrs:{id:"在java中定义一个不做事且没有参数的构造方法的作用"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#在java中定义一个不做事且没有参数的构造方法的作用"}},[a._v("#")]),a._v(" 在Java中定义一个不做事且没有参数的构造方法的作用")]),a._v(" "),t("p",[a._v("Java程序在执行子类的构造方法之前，如果没有用super()来调用父类特定的构造方法，则会调用父类中“没有参数的构造方法”。因此，如果父类中只定义了有参数的构造方法，而在子类的构造方法中又没有用super()来调用父类中特定的构造方法，则编译时将发生错误，因为Java程序在父类中找不到没有参数的构造方法可供执行。解决办法是在父类里加上一个不做事且没有参数的构造方法。")]),a._v(" "),t("p",[a._v("在调用子类构造方法之前会先调用父类没有参数的构造方法，其目的是？")]),a._v(" "),t("p",[a._v("帮助子类做初始化工作。")]),a._v(" "),t("h2",{attrs:{id:"一个类的构造方法的作用是什么-若一个类没有声明构造方法-改程序能正确执行吗-为什么"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#一个类的构造方法的作用是什么-若一个类没有声明构造方法-改程序能正确执行吗-为什么"}},[a._v("#")]),a._v(" 一个类的构造方法的作用是什么？若一个类没有声明构造方法，改程序能正确执行吗？为什么？")]),a._v(" "),t("p",[a._v("主要作用是完成对类对象的初始化工作。可以执行。因为一个类即使没有声明构造方法也会有默认的不带参数的构造方法。")]),a._v(" "),t("h3",{attrs:{id:"构造方法有哪些特性"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#构造方法有哪些特性"}},[a._v("#")]),a._v(" 构造方法有哪些特性？")]),a._v(" "),t("p",[a._v("名字与类名相同；")]),a._v(" "),t("p",[a._v("没有返回值，但不能用void声明构造函数；")]),a._v(" "),t("p",[a._v("生成类的对象时自动执行，无需调用。")]),a._v(" "),t("h2",{attrs:{id:"静态变量和实例变量区别"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#静态变量和实例变量区别"}},[a._v("#")]),a._v(" 静态变量和实例变量区别")]),a._v(" "),t("p",[a._v("静态变量：静态变量由于不属于任何实例对象，属于类的，所以在内存中只会有一份，在类的加载过程中，JVM只为静态变量分配一次内存空间。")]),a._v(" "),t("p",[a._v("实例变量：每次创建对象，都会为每个对象分配成员变量内存空间，实例变量是属于实例对象的，在内存中，创建几次对象，就有几份成员变量。")]),a._v(" "),t("h2",{attrs:{id:"静态变量与普通变量区别"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#静态变量与普通变量区别"}},[a._v("#")]),a._v(" 静态变量与普通变量区别")]),a._v(" "),t("p",[a._v("static变量也称作静态变量，静态变量和非静态变量的区别是：静态变量被所有的对象所共享，在内存中只有一个副本，它当且仅当在类初次加载时会被初始化。而非静态变量是对象所拥有的，在创建对象的时候被初始化，存在多个副本，各个对象拥有的副本互不影响。")]),a._v(" "),t("p",[a._v("还有一点就是static成员变量的初始化顺序按照定义的顺序进行初始化。")]),a._v(" "),t("h2",{attrs:{id:"静态方法和实例方法有何不同"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#静态方法和实例方法有何不同"}},[a._v("#")]),a._v(" 静态方法和实例方法有何不同？")]),a._v(" "),t("p",[a._v("静态方法和实例方法的区别主要体现在两个方面：")]),a._v(" "),t("h3",{attrs:{id:"在外部调用静态方法时"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#在外部调用静态方法时"}},[a._v("#")]),a._v(" 在外部调用静态方法时：")]),a._v(" "),t("p",[a._v('可以使用"类名.方法名"的方式，也可以使用"对象名.方法名"的方式。而实例方法只有后面这种方式。也就是说，调用静态方法可以无需创建对象。')]),a._v(" "),t("h3",{attrs:{id:"静态方法在访问本类的成员时"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#静态方法在访问本类的成员时"}},[a._v("#")]),a._v(" 静态方法在访问本类的成员时：")]),a._v(" "),t("p",[a._v("只允许访问静态成员（即静态成员变量和静态方法），而不允许访问实例成员变量和实例方法；实例方法则无此限制")]),a._v(" "),t("h2",{attrs:{id:"在一个静态方法内调用一个非静态成员为什么是非法的"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#在一个静态方法内调用一个非静态成员为什么是非法的"}},[a._v("#")]),a._v(" 在一个静态方法内调用一个非静态成员为什么是非法的？")]),a._v(" "),t("p",[a._v("由于静态方法可以不通过对象进行调用，因此在静态方法里，不能调用其他非静态变量，也不可以访问非静态变量成员。")]),a._v(" "),t("h2",{attrs:{id:"什么是方法的返回值-返回值的作用是什么"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#什么是方法的返回值-返回值的作用是什么"}},[a._v("#")]),a._v(" 什么是方法的返回值？返回值的作用是什么？")]),a._v(" "),t("p",[a._v("方法的返回值是指我们获取到的某个方法体中的代码执行后产生的结果！（前提是该方法可能产生结果）。返回值的作用:接收出结果，使得它可以用于其他的操作！")]),a._v(" "),t("h2",{attrs:{id:"值传递"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#值传递"}},[a._v("#")]),a._v(" 值传递")]),a._v(" "),t("p",[a._v("当一个对象被当作参数传递到一个方法后，此方法可改变这个对象的属性，并可返回变化后的结果，那么这里到底是值传递还是引用传递")]),a._v(" "),t("p",[a._v("是值传递。Java 语言的方法调用只支持参数的值传递。当一个对象实例作为一个参数被传递到方法中时，参数的值就是对该对象的引用。对象的属性可以在被调用过程中被改变，但对对象引用的改变是不会影响到调用者的")]),a._v(" "),t("h2",{attrs:{id:"为什么-java-中只有值传递"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#为什么-java-中只有值传递"}},[a._v("#")]),a._v(" 为什么 Java 中只有值传递")]),a._v(" "),t("p",[a._v("首先回顾一下在程序设计语言中有关将参数传递给方法（或函数）的一些专业术语。按值调用(call by value)表示方法接收的是调用者提供的值，而按引用调用（call by reference)表示方法接收的是调用者提供的变量地址。一个方法可以修改传递引用所对应的变量值，而不能修改传递值调用所对应的变量值。它用来描述各种程序设计语言（不只是Java)中方法参数传递方式。")]),a._v(" "),t("p",[a._v("Java程序设计语言总是采用按值调用。也就是说，方法得到的是所有参数值的一个拷贝，也就是说，方法不能修改传递给它的任何参数变量的内容。")]),a._v(" "),t("p",[t("strong",[a._v("Java包")])]),a._v(" "),t("h2",{attrs:{id:"jdk-中常用的包有哪些"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#jdk-中常用的包有哪些"}},[a._v("#")]),a._v(" JDK 中常用的包有哪些")]),a._v(" "),t("p",[a._v("java.lang：这个是系统的基础类；")]),a._v(" "),t("p",[a._v("java.io：这里面是所有输入输出有关的类，比如文件操作等；")]),a._v(" "),t("p",[a._v("java.nio：为了完善 io 包中的功能，提高 io 包中性能而写的一个新包；")]),a._v(" "),t("p",[a._v("java.net：这里面是与网络有关的类；")]),a._v(" "),t("p",[a._v("java.util：这个是系统辅助类，特别是集合类；")]),a._v(" "),t("p",[a._v("java.sql：这个是数据库操作的类。")]),a._v(" "),t("p",[a._v("import java和javax有什么区别")]),a._v(" "),t("p",[a._v("刚开始的时候 JavaAPI 所必需的包是 java 开头的包，javax 当时只是扩展 API 包来说使用。然而随着时间的推移，javax 逐渐的扩展成为 Java API 的组成部分。但是，将扩展从 javax 包移动到 java 包将是太麻烦了，最终会破坏一堆现有的代码。因此，最终决定 javax 包将成为标准API的一部分。")]),a._v(" "),t("p",[a._v("所以，实际上java和javax没有区别。这都是一个名字。")])])}),[],!1,null,null,null);v.default=r.exports}}]);