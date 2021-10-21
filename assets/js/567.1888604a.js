(window.webpackJsonp=window.webpackJsonp||[]).push([[567],{1082:function(t,a,n){"use strict";n.r(a);var s=n(53),e=Object(s.a)({},(function(){var t=this,a=t.$createElement,n=t._self._c||a;return n("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[n("div",{staticClass:"custom-block tip"},[n("p",{staticClass:"custom-block-title"},[t._v("TIP")]),t._v(" "),n("p",[t._v("本文主要是介绍 Java注解基础 。")])]),t._v(" "),n("p"),n("div",{staticClass:"table-of-contents"},[n("ul",[n("li",[n("a",{attrs:{href:"#java注解总结-史上最全-有这一篇就够了"}},[t._v("Java注解总结（史上最全，有这一篇就够了）")])]),n("li",[n("a",{attrs:{href:"#什么是注解"}},[t._v("什么是注解？")]),n("ul",[n("li",[n("a",{attrs:{href:"#注解的定义"}},[t._v("注解的定义")])]),n("li",[n("a",{attrs:{href:"#注解的分类"}},[t._v("注解的分类")])]),n("li",[n("a",{attrs:{href:"#注解的使用"}},[t._v("注解的使用")])]),n("li",[n("a",{attrs:{href:"#自定义注解"}},[t._v("自定义注解")])]),n("li",[n("a",{attrs:{href:"#java注解的架构"}},[t._v("Java注解的架构")])]),n("li",[n("a",{attrs:{href:"#注解的作用"}},[t._v("注解的作用")])])])]),n("li",[n("a",{attrs:{href:"#参考文章"}},[t._v("参考文章")])])])]),n("p"),t._v(" "),n("h2",{attrs:{id:"java注解总结-史上最全-有这一篇就够了"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#java注解总结-史上最全-有这一篇就够了"}},[t._v("#")]),t._v(" Java注解总结（史上最全，有这一篇就够了）")]),t._v(" "),n("h2",{attrs:{id:"什么是注解"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#什么是注解"}},[t._v("#")]),t._v(" 什么是注解？")]),t._v(" "),n("h3",{attrs:{id:"注解的定义"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#注解的定义"}},[t._v("#")]),t._v(" 注解的定义")]),t._v(" "),n("p",[t._v("官网描述如下：")]),t._v(" "),n("p",[n("strong",[t._v("Java 注解用于为 Java 代码提供元数据。作为元数据，注解不直接影响你的代码执行，但也有一些类型的注解实际上可以用于这一目的。Java 注解是从 Java5 开始添加到 Java 的。")])]),t._v(" "),n("p",[t._v("将上面的话再翻译一下，如下：\n（1）元数据在开发中的作用就是做数据约束和标准定义，可以将其理解成代码的规范标准（代码的模板）；\n（2）代码的模板（元数据）不直接影响代码的执行，它只是帮助我们来更快捷的开发；")]),t._v(" "),n("p",[t._v("综上，注解是一种元数据，可以将它理解为注释、解释，它为我们在代码中添加信息提供了一种形式化的方法，它用于帮助我们更快捷的写代码。")]),t._v(" "),n("h3",{attrs:{id:"注解的分类"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#注解的分类"}},[t._v("#")]),t._v(" 注解的分类")]),t._v(" "),n("p",[t._v("一般常用的注解可以分为三类：")]),t._v(" "),n("p",[n("strong",[t._v("1、Java自带的标准注解")]),t._v("\n包括@Override、@Deprecated、@SuppressWarnings等，使用这些注解后编译器就会进行检查。")]),t._v(" "),n("p",[n("strong",[t._v("2、元注解")]),t._v("\n元注解是用于定义注解的注解，包括@Retention、@Target、@Inherited、@Documented、@Repeatable 等。\n元注解也是Java自带的标准注解，只不过用于修饰注解，比较特殊。")]),t._v(" "),n("p",[n("strong",[t._v("3、自定义注解")]),t._v("\n用户可以根据自己的需求定义注解。")]),t._v(" "),n("h3",{attrs:{id:"注解的使用"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#注解的使用"}},[t._v("#")]),t._v(" 注解的使用")]),t._v(" "),n("p",[n("strong",[t._v("使用Java自带的注解")]),t._v("\nJava 自带的注解，就是 java.lang中定义的一套注解，以Override注解为例，使用方法如下：")]),t._v(" "),n("div",{staticClass:"language-java extra-class"},[n("pre",{pre:!0,attrs:{class:"language-java"}},[n("code",[n("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[t._v("@Override")]),t._v("         "),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//在需要注解的方法上面@Override即可")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("protected")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("void")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("onCreate")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      \n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n")])])]),n("p",[t._v("常用的Java注解如下：")]),t._v(" "),n("ul",[n("li",[t._v("1  @Deprecated – 所标注内容不再被建议使用；")]),t._v(" "),n("li",[t._v("2  @Override – 只能标注方法，表示该方法覆盖父类中的方法；")]),t._v(" "),n("li",[t._v("3  @Documented --所标注内容可以出现在javadoc中；")]),t._v(" "),n("li",[t._v("4  @Inherited** – 只能被用来标注“Annotation类型”，它所标注的Annotation具有继承性；")]),t._v(" "),n("li",[t._v("5  @Retention** – 只能被用来标注“Annotation类型”，而且它被用来指定Annotation的RetentionPolicy属性；")]),t._v(" "),n("li",[t._v("6  @Target** – 只能被用来标注“Annotation类型”，而且它被用来指定Annotation的ElementType属性；")]),t._v(" "),n("li",[t._v("7  @SuppressWarnings – 所标注内容产生的警告，编译器会对这些警告保持静默；")]),t._v(" "),n("li",[t._v("8、@interface – 用于定义一个注解；")])]),t._v(" "),n("p",[t._v("其中，4、5、6、8多用于自定义注解，读者着重记一下。")]),t._v(" "),n("h3",{attrs:{id:"自定义注解"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#自定义注解"}},[t._v("#")]),t._v(" 自定义注解")]),t._v(" "),n("p",[t._v("在Java中，我们使用@interface注解来自定义一个注解，如下：")]),t._v(" "),n("div",{staticClass:"language-java extra-class"},[n("pre",{pre:!0,attrs:{class:"language-java"}},[n("code",[n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("public")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[t._v("@interface")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("MyTestAnnotation")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),n("p",[t._v("此时，我们已经定义了一个注解MyTestAnnotation ，接着我们就可以在类或者方法上作用我们刚刚新建的注解：")]),t._v(" "),n("div",{staticClass:"language-java extra-class"},[n("pre",{pre:!0,attrs:{class:"language-java"}},[n("code",[n("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[t._v("@MyTestAnnotation")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("public")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("class")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Test")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n   "),n("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[t._v("@MyTestAnnotation")]),t._v("\n   "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("public")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("static")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("void")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("testString")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n   "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n")])])]),n("p",[t._v("此时，我们已经自定义了一个注解，不过现在这个注解毫无意义。")]),t._v(" "),n("p",[t._v("要如何使注解工作呢？这就需要使用元注解了。")]),t._v(" "),n("p",[t._v("常用的元注解有@Retention、 @Target、 @Document、 @Inherited和@Repeatable五个。")]),t._v(" "),n("p",[n("strong",[t._v("@Retention")]),t._v("\nRetention英文意思有保留、保持的意思，它表示注解存在阶段是保留在源码（编译期），字节码（类加载）或者运行期（JVM中运行）。")]),t._v(" "),n("p",[t._v("在@Retention注解中使用枚举RetentionPolicy来表示注解保留时期：")]),t._v(" "),n("ul",[n("li",[t._v("@Retention(RetentionPolicy.SOURCE)，注解仅存在于源码中，在class字节码文件中不包含")]),t._v(" "),n("li",[t._v("@Retention(RetentionPolicy.CLASS)， 默认的保留策略，注解会在class字节码文件中存在，但运行时无法获得")]),t._v(" "),n("li",[t._v("@Retention(RetentionPolicy.RUNTIME)， 注解会在class字节码文件中存在，在运行时可以通过反射获取到")])]),t._v(" "),n("p",[t._v("如果我们是自定义注解，则通过前面分析，我们自定义注解如果只存着源码中或者字节码文件中就无法发挥作用，而在运行期间能获取到注解才能实现我们目的，所以自定义注解中肯定是使用 @Retention(RetentionPolicy.RUNTIME)，如下：")]),t._v(" "),n("div",{staticClass:"language-java extra-class"},[n("pre",{pre:!0,attrs:{class:"language-java"}},[n("code",[n("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[t._v("@Retention")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("RetentionPolicy")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("RUNTIME"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("public")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[t._v("@interface")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("MyTestAnnotation")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n")])])]),n("p",[n("strong",[t._v("@Target")]),t._v("\nTarget的英文意思是目标，这也很容易理解，使用@Target元注解表示我们的注解作用的范围就比较具体了，可以是类，方法，方法参数变量等，同样也是通过枚举类ElementType表达作用类型：")]),t._v(" "),n("ul",[n("li",[t._v("@Target(ElementType.TYPE) 作用接口、类、枚举、注解")]),t._v(" "),n("li",[t._v("@Target(ElementType.FIELD) 作用属性字段、枚举的常量")]),t._v(" "),n("li",[t._v("@Target(ElementType.METHOD) 作用方法")]),t._v(" "),n("li",[t._v("@Target(ElementType.PARAMETER) 作用方法参数")]),t._v(" "),n("li",[t._v("@Target(ElementType.CONSTRUCTOR) 作用构造函数")]),t._v(" "),n("li",[t._v("@Target(ElementType.LOCAL_VARIABLE)作用局部变量")]),t._v(" "),n("li",[t._v("@Target(ElementType.ANNOTATION_TYPE)作用于注解（@Retention注解中就使用该属性）")]),t._v(" "),n("li",[t._v("@Target(ElementType.PACKAGE) 作用于包")]),t._v(" "),n("li",[t._v("@Target(ElementType.TYPE_PARAMETER) 作用于类型泛型，即泛型方法、泛型类、泛型接口 （jdk1.8加入）")]),t._v(" "),n("li",[t._v("@Target(ElementType.TYPE_USE) 类型使用.可以用于标注任意类型除了 class （jdk1.8加入）")])]),t._v(" "),n("p",[t._v("一般比较常用的是ElementType.TYPE类型，如下：")]),t._v(" "),n("div",{staticClass:"language-java extra-class"},[n("pre",{pre:!0,attrs:{class:"language-java"}},[n("code",[n("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[t._v("@Retention")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("RetentionPolicy")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("RUNTIME"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[t._v("@Target")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("ElementType")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("TYPE"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("public")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[t._v("@interface")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("MyTestAnnotation")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n")])])]),n("p",[n("strong",[t._v("@Documented")]),t._v("\nDocument的英文意思是文档。它的作用是能够将注解中的元素包含到 Javadoc 中去。")]),t._v(" "),n("p",[n("strong",[t._v("@Inherited")]),t._v("\nInherited的英文意思是继承，但是这个继承和我们平时理解的继承大同小异，一个被@Inherited注解了的注解修饰了一个父类，如果他的子类没有被其他注解修饰，则它的子类也继承了父类的注解。")]),t._v(" "),n("p",[n("strong",[t._v("@Repeatable")]),t._v("\nRepeatable的英文意思是可重复的。顾名思义说明被这个元注解修饰的注解可以同时作用一个对象多次，但是每次作用注解又可以代表不同的含义。")]),t._v(" "),n("p",[n("strong",[t._v("注解的源码分析")]),t._v("\n我们以@Override注解为例，来分析其源码，想查看一个普通类一样，按住ctrl键点击@Override即可进入其源码，如下：")]),t._v(" "),n("div",{staticClass:"language-java extra-class"},[n("pre",{pre:!0,attrs:{class:"language-java"}},[n("code",[n("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[t._v("@Target")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("ElementType")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("METHOD"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[t._v("@Retention")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("RetentionPolicy")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("SOURCE"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("public")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[t._v("@interface")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Override")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n")])])]),n("p",[t._v("我们看到@Override注解就是通过@interface注解定义的一个普通注解，而我们知道，"),n("strong",[t._v("使用 @interface 定义注解时，意味着它实现了 java.lang.annotation.Annotation 接口，即该注解就是一个Annotation")])]),t._v(" "),n("p",[t._v("注意：定义 Annotation 时，@interface 是必须的，它和我们通常的 implemented 实现接口的方法不同。Annotation 接口的实现细节都由编译器完成。通过 @interface 定义注解后，该注解不能继承其他的注解或接口。")]),t._v(" "),n("p",[t._v("下面我们来分析一下Annotation 类的源码，如下：")]),t._v(" "),n("div",{staticClass:"language-java extra-class"},[n("pre",{pre:!0,attrs:{class:"language-java"}},[n("code",[n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("public")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("interface")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Annotation")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("boolean")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("equals")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Object")]),t._v(" var1"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n    "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("int")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("hashCode")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n    "),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("String")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("toString")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n    "),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Class")]),n("span",{pre:!0,attrs:{class:"token generics"}},[n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("?")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("extends")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Annotation")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("annotationType")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n")])])]),n("p",[t._v("通过以上源码，我们知道注解本身就是Annotation接口的子接口，也就是说注解中其实是可以有属性和方法，但是接口中的属性都是static final的，对于注解来说没什么意义，而我们定义接口的方法就相当于注解的属性，也就对应了前面说的为什么注解只有属性成员变量，其实他就是接口的方法，这就是为什么成员变量会有括号，不同于接口我们可以在注解的括号中给成员变量赋值。")]),t._v(" "),n("h3",{attrs:{id:"java注解的架构"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#java注解的架构"}},[t._v("#")]),t._v(" Java注解的架构")]),t._v(" "),n("p",[t._v("根据上述的源码分析，我们得出Java注解（Annotation）的架构如下：")]),t._v(" "),n("img",{staticClass:"zoom-custom-imgs",attrs:{src:t.$withBase("/assets/img/java/annotation/intro-1.png"),alt:"wxmp"}}),t._v(" "),n("p",[t._v("0、"),n("strong",[t._v("注解是接口类，都继承自Annotation接口类")])]),t._v(" "),n("p",[t._v("1、"),n("strong",[t._v("1 个 Annotation 和 1 个 RetentionPolicy 关联")]),t._v("\n可以理解为：每1个Annotation对象，都会有唯一的RetentionPolicy属性；")]),t._v(" "),n("p",[t._v("2、"),n("strong",[t._v("1 个 Annotation 和 1~n 个 ElementType 关联")]),t._v("\n可以理解为：对于每 1 个 Annotation 对象，可以有若干个 ElementType 属性；")]),t._v(" "),n("p",[t._v("3、"),n("strong",[t._v("Annotation 有许多实现类，包括：Deprecated, Documented, Inherited, Override 等等。")]),t._v("\nAnnotation 的每一个实现类都和1个 RetentionPolicy 关联并且和 1~n 个 ElementType 关联。")]),t._v(" "),n("h3",{attrs:{id:"注解的作用"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#注解的作用"}},[t._v("#")]),t._v(" 注解的作用")]),t._v(" "),n("p",[t._v("在说注解的用途之前，我们先介绍下XML和注解区别：")]),t._v(" "),n("ul",[n("li",[t._v("注解：是一种分散式的元数据，与源代码紧绑定。\nxml：是一种集中式的元数据，与源代码无绑定\n这部分多用于Java后台的配置项开发中，我们知道几年前服务器的配置项多存放在一个xml文件中，而spring 2.5 之后开始基于注解配置，从而实现了代替配置文件的功能。")])]),t._v(" "),n("p",[t._v("注解的用途有很多，上面的只是一个简单的例子，总起起来，注解有如下四大部分作用：")]),t._v(" "),n("p",[t._v("1、生成文档，通过代码里标识的元数据生成javadoc文档。")]),t._v(" "),n("p",[t._v("2、编译检查，通过代码里标识的元数据让编译器在编译期间进行检查验证。")]),t._v(" "),n("p",[t._v("3、编译时动态处理，编译时通过代码里标识的元数据动态处理，例如动态生成代码。")]),t._v(" "),n("p",[t._v("4、运行时动态处理，运行时通过代码里标识的元数据动态处理，例如使用反射注入实例")]),t._v(" "),n("h2",{attrs:{id:"参考文章"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#参考文章"}},[t._v("#")]),t._v(" 参考文章")]),t._v(" "),n("ul",[n("li",[t._v("https://blog.51cto.com/u_14230003/2440990")])])])}),[],!1,null,null,null);a.default=e.exports}}]);