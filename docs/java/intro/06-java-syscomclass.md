---
title: Java常用类和结构
---


::: tip
本文主要是介绍 Java常用类和结构 。
:::

[[toc]]

## 一、Number和Math类

## 1.概述

一般地，当需要使用数字的时候，我们通常使用内置数据类型，如：`byte`、`int`、`long`、`double` 等。

```java
int a = 5000;
float b = 13.65f;
byte c = 0x4a;
```

然而，在实际开发过程中，我们经常会遇到需要使用对象，而不是内置数据类型的情形。为了解决这个问题，Java 语言为每一个内置数据类型提供了对应的包装类。

所有的包装类（**Integer**、**Long**、**Byte**、**Double**、**Float**、**Short**）都是抽象类 Number 的子类。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/java/intro/datatype_2.jpg')" alt="wxmp">

这种由编译器特别支持的包装称为装箱，所以当内置数据类型被当作对象使用的时候，编译器会把内置类型装箱为包装类。相似的，编译器也可以把一个对象拆箱为内置类型。Number 类属于 `java.lang` 包。

下面是一个使用 Integer 对象的实例：

```java
public class Test{
 
   public static void main(String[] args){
      Integer x = 5;
      x =  x + 10;
      System.out.println(x); 
   }
}
```

以上实例编译运行结果如下：

``` java
15
```

当 `x` 被赋为整型值时，由于 `x` 是一个对象，所以编译器要对x进行装箱。然后，为了使 `x` 能进行加运算，所以要对 `x` 进行拆箱。

## 2.Math类

Java 的 Math 包含了用于执行基本数学运算的属性和方法，如初等指数、对数、平方根和三角函数。

Math 的方法都被定义为 `static` 形式，通过 Math 类可以在主函数中直接调用。

```java
public class Test {  
    public static void main (String []args)  
    {  
        System.out.println("90 度的正弦值：" + Math.sin(Math.PI/2));  
        System.out.println("0度的余弦值：" + Math.cos(0));  
        System.out.println("60度的正切值：" + Math.tan(Math.PI/3));  
        System.out.println("1的反正切值： " + Math.atan(1));  
        System.out.println("π/2的角度值：" + Math.toDegrees(Math.PI/2));  
        System.out.println(Math.PI);  
    }  
}
```

以上实例编译运行结果如下：

``` java
90 度的正弦值：1.0
0度的余弦值：1.0
60度的正切值：1.7320508075688767
1的反正切值： 0.7853981633974483
π/2的角度值：90.0
3.141592653589793
```

Number和Math类方法

## 3.Number和Math类方法

下面的表中列出的是 Number & Math 类常用的一些方法：

| 序号 | 方法与描述                                                                                                                                                        |
| :--- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1    | `xxxValue()` 将 Number 对象转换为xxx数据类型的值并返回。                                                                                                          |
| 2    | `compareTo()` 将number对象与参数比较。                                                                                                                            |
| 3    | `equals()` 判断number对象是否与参数相等。                                                                                                                         |
| 4    | `valueOf()`返回一个 Number 对象指定的内置数据类型                                                                                                                 |
| 5    | `toString()` 以字符串形式返回值。                                                                                                                                 |
| 6    | `parseInt()` 将字符串解析为 int 类型。                                                                                                                            |
| 7    | `abs()` 返回参数的绝对值。                                                                                                                                        |
| 8    | `ceil()` 返回大于等于( `>=` )给定参数的的最小整数，类型为双精度浮点型。                                                                                           |
| 9    | `floor()` 返回小于等于（ `<=` ）给定参数的最大整数 。                                                                                                             |
| 10   | `rint()` 返回与参数最接近的整数。返回类型为 double。                                                                                                              |
| 11   | `round()` 它表示四舍五入，算法为 `Math.floor(x+0.5)`，即将原来的数字加上 0.5 后再向下取整，所以，`Math.round(11.5)` 的结果为12，`Math.round(-11.5)` 的结果为-11。 |
| 12   | `min()` 返回两个参数中的最小值。                                                                                                                                  |
| 13   | `max()` 返回两个参数中的最大值。                                                                                                                                  |
| 14   | `exp()` 返回自然数底数e的参数次方。                                                                                                                               |
| 15   | `log()` 返回参数的自然数底数的对数值。                                                                                                                            |
| 16   | `pow()` 返回第一个参数的第二个参数次方。                                                                                                                          |
| 17   | `sqrt()` 求参数的算术平方根。                                                                                                                                     |
| 18   | `sin()` 求指定double类型参数的正弦值。                                                                                                                            |
| 19   | `cos()` 求指定double类型参数的余弦值。                                                                                                                            |
| 20   | `tan()` 求指定double类型参数的正切值。                                                                                                                            |
| 21   | `asin()` 求指定double类型参数的反正弦值。                                                                                                                         |
| 22   | `acos()` 求指定double类型参数的反余弦值。                                                                                                                         |
| 23   | `atan()` 求指定double类型参数的反正切值。                                                                                                                         |
| 24   | `atan2()` 将笛卡尔坐标转换为极坐标，并返回极坐标的角度值。                                                                                                        |
| 25   | `toDegrees()` 将参数转化为角度。                                                                                                                                  |
| 26   | `toRadians()` 将角度转换为弧度。                                                                                                                                  |
| 27   | `random()` 返回一个随机数。                                                                                                                                       |

## 4.Math的floor,round和ceil方法实例比较

| 参数  | `Math.floor` | `Math.round` | `Math.ceil` |
| :---: | :----------: | :----------: | :---------: |
|  1.4  |      1       |      1       |      2      |
|  1.5  |      1       |      2       |      2      |
|  1.6  |      1       |      2       |      2      |
| -1.4  |      -2      |      -1      |     -1      |
| -1.5  |      -2      |      -1      |     -1      |
| -1.6  |      -2      |      -2      |     -1      |

`floor`, `round` 和 `ceil` 实例：

```java
public class Main {   
  public static void main(String[] args) {   
    double[] nums = { 1.4, 1.5, 1.6, -1.4, -1.5, -1.6 };   
    for (double num : nums) {   
      test(num);   
    }   
  }   
  
  private static void test(double num) {   
    System.out.println("Math.floor(" + num + ")=" + Math.floor(num));   
    System.out.println("Math.round(" + num + ")=" + Math.round(num));   
    System.out.println("Math.ceil(" + num + ")=" + Math.ceil(num));   
  }   
}
```

以上实例执行输出结果为：

``` java
Math.floor(1.4)=1.0
Math.round(1.4)=1
Math.ceil(1.4)=2.0
Math.floor(1.5)=1.0
Math.round(1.5)=2
Math.ceil(1.5)=2.0
Math.floor(1.6)=1.0
Math.round(1.6)=2
Math.ceil(1.6)=2.0
Math.floor(-1.4)=-2.0
Math.round(-1.4)=-1
Math.ceil(-1.4)=-1.0
Math.floor(-1.5)=-2.0
Math.round(-1.5)=-1
Math.ceil(-1.5)=-1.0
Math.floor(-1.6)=-2.0
Math.round(-1.6)=-2
Math.ceil(-1.6)=-1.0
```

------




## 【----------------------------】
## 二、 Character类

请参照如上`章节导航`进行阅读

## 1.概述

`Character` 类用于对单个字符进行操作。

`Character` 类在对象中包装一个基本类型 `char` 的值

#### 实例

```java
char ch = 'a';
 
// Unicode 字符表示形式
char uniChar = '\u039A'; 
 
// 字符数组
char[] charArray ={ 'a', 'b', 'c', 'd', 'e' };
```

然而，在实际开发过程中，我们经常会遇到需要使用对象，而不是内置数据类型的情况。为了解决这个问题，Java 语言为内置数据类型 `char` 提供了包装类 `Character` 类。

`Character` 类提供了一系列方法来操纵字符。你可以使用 `Character` 的构造方法创建一个 `Character` 类对象，例如：

```java
Character ch = new Character('a');
```

在某些情况下，Java 编译器会自动创建一个 `Character` 对象。

例如，将一个 `char` 类型的参数传递给需要一个 `Character` 类型参数的方法时，那么编译器会自动地将 `char` 类型参数转换为 `Character` 对象。 这种特征称为装箱，反过来称为拆箱。

#### 实例

```java
// 原始字符 'a' 装箱到 Character 对象 ch 中
Character ch = 'a';
 
// 原始字符 'x' 用 test 方法装箱
// 返回拆箱的值到 'c'
char c = test('x');
```

## 2.转义序列

前面有反斜杠（`\`）的字符代表转义字符，它对编译器来说是有特殊含义的。

下面列表展示了Java的转义序列：

| 转义序列 | 描述                      |
| :------- | :------------------------ |
| \t       | 在文中该处插入一个`tab`键 |
| \b       | 在文中该处插入一个后退键  |
| \n       | 在文中该处换行            |
| \r       | 在文中该处插入回车        |
| \f       | 在文中该处插入换页符      |
| \'       | 在文中该处插入单引号      |
| \"       | 在文中该处插入双引号      |
| \\       | 在文中该处插入反斜杠      |

#### 实例

当打印语句遇到一个转义序列时，编译器可以正确地对其进行解释。

以下实例转义双引号并输出：

```java
public class Test {
 
   public static void main(String[] args) {
      System.out.println("访问\"光束云(work100.net)!\"");
   }
}
```

以上实例编译运行结果如下：

``` java
访问"光束云(work100.net)!"
```

## 3.Character方法

下面是 `Character` 类的方法：

| 序号  | 方法与描述                                           |
| :---: | :--------------------------------------------------- |
|   1   | `isLetter()` 是否是一个字母                          |
|   2   | `isDigit()` 是否是一个数字字符                       |
|   3   | `isWhitespace()` 是否是一个空白字符                  |
|   4   | `isUpperCase()` 是否是大写字母                       |
|   5   | `isLowerCase()` 是否是小写字母                       |
|   6   | `toUpperCase()` 指定字母的大写形式                   |
|   7   | `toLowerCase()` 指定字母的小写形式                   |
|   8   | `toString()` 返回字符的字符串形式，字符串的长度仅为1 |

------



## 【----------------------------】
## 三、String类

请参照如上`章节导航`进行阅读

## 1.概述

字符串广泛应用 在 Java 编程中，在 Java 中字符串属于对象，Java 提供了 `String` 类来创建和操作字符串。

## 2.创建字符串

创建字符串最简单的方式如下:

```java
String greeting = "光束云";
```

在代码中遇到字符串常量时，这里的值是 "`光束云`"，编译器会使用该值创建一个 `String` 对象。

和其它对象一样，可以使用关键字和构造方法来创建 `String` 对象。

`String` 类有 11 种构造方法，这些方法提供不同的参数来初始化字符串，比如提供一个字符数组参数:

```java
public class StringDemo{
   public static void main(String[] args){
      char[] helloArray = { 'w', 'o', 'r', 'k', '1', '0', '0', '.', 'n', 'e', 't'};
      String helloString = new String(helloArray);  
      System.out.println( helloString );
   }
}
```

以上实例编译运行结果如下：

``` java
work100.net
```

> 注意:`String` 类是不可改变的，所以你一旦创建了 `String` 对象，如果需要对字符串做很多修改，那么应该选择使用 `StringBuffer` & `StringBuilder` 类。

## 3.字符串长度

用于获取有关对象的信息的方法称为访问器方法。

`String` 类的一个访问器方法是 `length()` 方法，它返回字符串对象包含的字符数。

下面的代码执行后，`len` 变量等于 `15`:

```java
public class StringDemo {
    public static void main(String[] args) {
        String site = "www.work100.net";
        int len = site.length();
        System.out.println( "光束云网址长度 : " + len );
   }
}
```

以上实例编译运行结果如下：

``` java
光束云网址长度 : 15
```

## 4.连接字符串

`String` 类提供了连接两个字符串的方法：

```java
string1.concat(string2);
```

返回 `string2` 连接 `string1` 的新字符串。也可以对字符串常量使用 `concat()` 方法，如：

```java
"我的名字是 ".concat("光束云");
```

更常用的是使用'`+`'操作符来连接字符串，如：

```java
"Hello," + " 光束云" + "!"
```

结果如下:

``` java
"Hello, 光束云!"
```

下面是一个例子:

```java
public class StringDemo {    public static void main(String[] args) {             String string1 = "光束云网址：";             System.out.println("1、" + string1 + "www.work100.net");      }}
```

以上实例编译运行结果如下：

``` java
1、光束云网址：www.work100.net
```

## 5.创建格式化字符串

我们知道输出格式化数字可以使用 `printf()` 和 `format()` 方法。

`String` 类使用静态方法 `format()` 返回一个 `String` 对象而不是 `PrintStream` 对象。

`String` 类的静态方法 `format()` 能用来创建可复用的格式化字符串，而不仅仅是用于一次打印输出。

如下所示：

```java
System.out.printf("浮点型变量的值为 " +                  "%f, 整型变量的值为 " +                  " %d, 字符串变量的值为 " +                  "is %s", floatVar, intVar, stringVar);
```

你也可以这样写：

```java
String fs;fs = String.format("浮点型变量的值为 " +                   "%f, 整型变量的值为 " +                   " %d, 字符串变量的值为 " +                   " %s", floatVar, intVar, stringVar);
```

## 6.String方法

下面是 `String` 类支持的方法：

| 序号  | 方法描述                                                                                                                            |
| :---: | :---------------------------------------------------------------------------------------------------------------------------------- |
|   1   | `char charAt(int index)` 返回指定索引处的 `char` 值。                                                                               |
|   2   | `int compareTo(Object o)` 把这个字符串和另一个对象比较。                                                                            |
|   3   | `int compareTo(String anotherString)` 按字典顺序比较两个字符串。                                                                    |
|   4   | `int compareToIgnoreCase(String str)` 按字典顺序比较两个字符串，不考虑大小写。                                                      |
|   5   | `String concat(String str)` 将指定字符串连接到此字符串的结尾。                                                                      |
|   6   | `boolean contentEquals(StringBuffer sb)` 当且仅当字符串与指定的 `StringBuffer` 有相同顺序的字符时候返回真。                         |
|   7   | `static String copyValueOf(char[] data)` 返回指定数组中表示该字符序列的 `String`。                                                  |
|   8   | `static String copyValueOf(char[] data, int offset, int count)` 返回指定数组中表示该字符序列的 `String`。                           |
|   9   | `boolean endsWith(String suffix)` 测试此字符串是否以指定的后缀结束。                                                                |
|  10   | `boolean equals(Object anObject)` 将此字符串与指定的对象比较。                                                                      |
|  11   | `boolean equalsIgnoreCase(String anotherString)` 将此 `String` 与另一个 `String` 比较，不考虑大小写。                               |
|  12   | `byte[] getBytes()` 使用平台的默认字符集将此 `String` 编码为 `byte` 序列，并将结果存储到一个新的 `byte` 数组中。                    |
|  13   | `byte[] getBytes(String charsetName)` 使用指定的字符集将此 `String` 编码为 `byte` 序列，并将结果存储到一个新的 `byte` 数组中。      |
|  14   | `void getChars(int srcBegin, int srcEnd, char[] dst, int dstBegin)` 将字符从此字符串复制到目标字符数组。                            |
|  15   | `int hashCode()` 返回此字符串的哈希码。                                                                                             |
|  16   | `int indexOf(int ch)` 返回指定字符在此字符串中第一次出现处的索引。                                                                  |
|  17   | `int indexOf(int ch, int fromIndex)` 返回在此字符串中第一次出现指定字符处的索引，从指定的索引开始搜索。                             |
|  18   | `int indexOf(String str)` 返回指定子字符串在此字符串中第一次出现处的索引。                                                          |
|  19   | `int indexOf(String str, int fromIndex)` 返回指定子字符串在此字符串中第一次出现处的索引，从指定的索引开始。                         |
|  20   | `String intern()` 返回字符串对象的规范化表示形式。                                                                                  |
|  21   | `int lastIndexOf(int ch)` 返回指定字符在此字符串中最后一次出现处的索引。                                                            |
|  22   | `int lastIndexOf(int ch, int fromIndex)` 返回指定字符在此字符串中最后一次出现处的索引，从指定的索引处开始进行反向搜索。             |
|  23   | `int lastIndexOf(String str)` 返回指定子字符串在此字符串中最右边出现处的索引。                                                      |
|  24   | `int lastIndexOf(String str, int fromIndex)` 返回指定子字符串在此字符串中最后一次出现处的索引，从指定的索引开始反向搜索。           |
|  25   | `int length()` 返回此字符串的长度。                                                                                                 |
|  26   | `boolean matches(String regex)` 告知此字符串是否匹配给定的正则表达式。                                                              |
|  27   | `boolean regionMatches(boolean ignoreCase, int toffset, String other, int ooffset, int len)` 测试两个字符串区域是否相等。           |
|  28   | `boolean regionMatches(int toffset, String other, int ooffset, int len)` 测试两个字符串区域是否相等。                               |
|  29   | `String replace(char oldChar, char newChar)` 返回一个新的字符串，它是通过用 `newChar` 替换此字符串中出现的所有 `oldChar` 得到的。   |
|  30   | `String replaceAll(String regex, String replacement)` 使用给定的 `replacement` 替换此字符串所有匹配给定的正则表达式的子字符串。     |
|  31   | `String replaceFirst(String regex, String replacement)` 使用给定的 `replacement` 替换此字符串匹配给定的正则表达式的第一个子字符串。 |
|  32   | `String[] split(String regex)` 根据给定正则表达式的匹配拆分此字符串。                                                               |
|  33   | `String[] split(String regex, int limit)` 根据匹配给定的正则表达式来拆分此字符串。                                                  |
|  34   | `boolean startsWith(String prefix)` 测试此字符串是否以指定的前缀开始。                                                              |
|  35   | `boolean startsWith(String prefix, int toffset)` 测试此字符串从指定索引开始的子字符串是否以指定前缀开始。                           |
|  36   | `CharSequence subSequence(int beginIndex, int endIndex)` 返回一个新的字符序列，它是此序列的一个子序列。                             |
|  37   | `String substring(int beginIndex)` 返回一个新的字符串，它是此字符串的一个子字符串。                                                 |
|  38   | `String substring(int beginIndex, int endIndex)` 返回一个新字符串，它是此字符串的一个子字符串。                                     |
|  39   | `char[] toCharArray()` 将此字符串转换为一个新的字符数组。                                                                           |
|  40   | `String toLowerCase()` 使用默认语言环境的规则将此 `String` 中的所有字符都转换为小写。                                               |
|  41   | `String toLowerCase(Locale locale)` 使用给定 `Locale` 的规则将此 `String` 中的所有字符都转换为小写。                                |
|  42   | `String toString()` 返回此对象本身(它已经是一个字符串！)。                                                                          |
|  43   | `String toUpperCase()` 使用默认语言环境的规则将此 `String` 中的所有字符都转换为大写。                                               |
|  44   | `String toUpperCase(Locale locale)` 使用给定 `Locale` 的规则将此 `String` 中的所有字符都转换为大写。                                |
|  45   | `String trim()` 返回字符串的副本，忽略前导空白和尾部空白。                                                                          |
|  46   | `static String valueOf(primitive data type x)` 返回给定 `data type` 类型`x` 参数的字符串表示形式。                                  |

------


## 【----------------------------】
## 四、StringBuffe类r

| 序号  | 文内章节                                                                                                  | 视频 |
| :---: | :-------------------------------------------------------------------------------------------------------- | :--- |
|   1   | [概述](https://www.cnblogs.com/liuxiaojun/p/training-java-stringbuffer.html#概述)                         | -    |
|   2   | [StringBuffer类](https://www.cnblogs.com/liuxiaojun/p/training-java-stringbuffer.html#StringBuffer类)     | -    |
|   3   | [StringBuffer方法](https://www.cnblogs.com/liuxiaojun/p/training-java-stringbuffer.html#StringBuffer方法) | -    |

请参照如上`章节导航`进行阅读

## 1.概述

当对字符串进行修改的时候，需要使用 `StringBuffer` 和 `StringBuilder` 类。

## 2.StringBuffer类

和 `String` 类不同的是，`StringBuffer` 和 `StringBuilder` 类的对象能够被多次的修改，并且不产生新的未使用对象。

`StringBuilder` 类在 Java 5 中被提出，它和 `StringBuffer` 之间的最大不同在于 `StringBuilder` 的方法不是线程安全的(不能同步访问)。

由于 `StringBuilder` 相较于 `StringBuffer` 有速度优势，所以多数情况下建议使用 `StringBuilder` 类。然而在应用程序要求线程安全的情况下，则必须使用 `StringBuffer` 类。

```java
public class Test{
  public static void main(String[] args){
    StringBuffer sBuffer = new StringBuffer("光束云官网：");
    sBuffer.append("www");
    sBuffer.append(".work100");
    sBuffer.append(".net");
    System.out.println(sBuffer);  
  }
}
```

以上实例编译运行结果如下：

``` java
光束云官网：www.work100.net
```

## 3.StringBuffer方法

以下是 `StringBuffer` 类支持的主要方法：

| 序号  | 方法描述                                                                                           |
| :---: | :------------------------------------------------------------------------------------------------- |
|   1   | `public StringBuffer append(String s)` 将指定的字符串追加到此字符序列。                            |
|   2   | `public StringBuffer reverse()` 将此字符序列用其反转形式取代。                                     |
|   3   | `public delete(int start, int end)` 移除此序列的子字符串中的字符。                                 |
|   4   | `public insert(int offset, int i)` 将 `int` 参数的字符串表示形式插入此序列中。                     |
|   5   | `replace(int start, int end, String str)` 使用给定 `String` 中的字符替换此序列的子字符串中的字符。 |

下面的列表里的方法和 `String` 类的方法类似：

| 序号  | 方法描述                                                                                                      |
| :---: | :------------------------------------------------------------------------------------------------------------ |
|   1   | `int capacity()` 返回当前容量。                                                                               |
|   2   | `char charAt(int index)` 返回此序列中指定索引处的 `char` 值。                                                 |
|   3   | `void ensureCapacity(int minimumCapacity)` 确保容量至少等于指定的最小值。                                     |
|   4   | `void getChars(int srcBegin, int srcEnd, char[] dst, int dstBegin)` 将字符从此序列复制到目标字符数组 `dst`。  |
|   5   | `int indexOf(String str)` 返回第一次出现的指定子字符串在该字符串中的索引。                                    |
|   6   | `int indexOf(String str, int fromIndex)` 从指定的索引处开始，返回第一次出现的指定子字符串在该字符串中的索引。 |
|   7   | `int lastIndexOf(String str)` 返回最右边出现的指定子字符串在此字符串中的索引。                                |
|   8   | `int lastIndexOf(String str, int fromIndex)` 返回 `String` 对象中子字符串最后出现的位置。                     |
|   9   | `int length()` 返回长度(字符数)。                                                                             |
|  10   | `void setCharAt(int index, char ch)` 将给定索引处的字符设置为 ch。                                            |
|  11   | `void setLength(int newLength)` 设置字符序列的长度。                                                          |
|  12   | `CharSequence subSequence(int start, int end)` 返回一个新的字符序列，该字符序列是此序列的子序列。             |
|  13   | `String substring(int start)` 返回一个新的 `String`，它包含此字符序列当前所包含的字符子序列。                 |
|  14   | `String substring(int start, int end)` 返回一个新的 `String`，它包含此序列当前所包含的字符子序列。            |
|  15   | `String toString()` 返回此序列中数据的字符串表示形式。                                                        |

------

## 【----------------------------】
## 五、数组

## 1.概述

数组对于每一门编程语言来说都是重要的数据结构之一，当然不同语言对数组的实现及处理也不尽相同。

Java 语言中提供的数组是用来存储固定大小的同类型元素。

你可以声明一个数组变量，如 `numbers[100]` 来代替直接声明 100 个独立变量 `number0`，`number1`，`....`，`number99`。

本教程将为大家介绍 Java 数组的声明、创建和初始化，并给出其对应的代码。

## 2.声明数组变量

首先必须声明数组变量，才能在程序中使用数组。下面是声明数组变量的语法：

```java
dataType[] arrayRefVar;   // 首选的方法
 
或
 
dataType arrayRefVar[];  // 效果相同，但不是首选方法
```

> 注意: 建议使用 `dataType[] arrayRefVar` 的声明风格声明数组变量。 `dataType arrayRefVar[]` 风格是来自 C/C++ 语言 ，在Java中采用是为了让 C/C++ 程序员能够快速理解java语言。

#### 实例

下面是这两种语法的代码示例：

```java
double[] myList;         // 首选的方法
 
或
 
double myList[];         //  效果相同，但不是首选方法
```

## 3.创建数组

Java语言使用 `new` 操作符来创建数组，语法如下：

```java
arrayRefVar = new dataType[arraySize];
```

上面的语法语句做了两件事：

- 使用 `dataType[arraySize]` 创建了一个数组。
- 把新创建的数组的引用赋值给变量 `arrayRefVar`。

数组变量的声明，和创建数组可以用一条语句完成，如下所示：

```java
dataType[] arrayRefVar = new dataType[arraySize];
```

另外，你还可以使用如下的方式创建数组。

```java
dataType[] arrayRefVar = {value0, value1, ..., valuek};
```

数组的元素是通过索引访问的。数组索引从 `0` 开始，所以索引值从 `0` 到 `arrayRefVar.length - 1`。

#### 实例

下面的语句首先声明了一个数组变量 `myList`，接着创建了一个包含 10 个 `double` 类型元素的数组，并且把它的引用赋值给 `myList` 变量。

```java
public class TestArray {
   public static void main(String[] args) {
      // 数组大小
      int size = 10;
      // 定义数组
      double[] myList = new double[size];
      myList[0] = 5.6;
      myList[1] = 4.5;
      myList[2] = 3.3;
      myList[3] = 13.2;
      myList[4] = 4.0;
      myList[5] = 34.33;
      myList[6] = 34.0;
      myList[7] = 45.45;
      myList[8] = 99.993;
      myList[9] = 11123;
      // 计算所有元素的总和
      double total = 0;
      for (int i = 0; i < size; i++) {
         total += myList[i];
      }
      System.out.println("总和为： " + total);
   }
}
```

以上实例输出结果为：

``` java
总和为： 11367.373
```

下面的图片描绘了数组 `myList`。这里 `myList` 数组里有 10 个 `double` 元素，它的下标从 0 到 9。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/java/intro/array_1.jpg')" alt="wxmp">

## 4.处理数组

数组的元素类型和数组的大小都是确定的，所以当处理数组元素时候，我们通常使用基本循环或者 `For-Each` 循环。

#### 示例

该实例完整地展示了如何创建、初始化和操纵数组：

```java
public class TestArray {
   public static void main(String[] args) {
      double[] myList = {1.9, 2.9, 3.4, 3.5};
 
      // 打印所有数组元素
      for (int i = 0; i < myList.length; i++) {
         System.out.println(myList[i] + " ");
      }
      // 计算所有元素的总和
      double total = 0;
      for (int i = 0; i < myList.length; i++) {
         total += myList[i];
      }
      System.out.println("Total is " + total);
      // 查找最大元素
      double max = myList[0];
      for (int i = 1; i < myList.length; i++) {
         if (myList[i] > max) max = myList[i];
      }
      System.out.println("Max is " + max);
   }
}
```

以上实例编译运行结果如下：

``` java
1.92.93.43.5Total is 11.7Max is 3.5
```

## 5.For-Each循环

JDK 1.5 引进了一种新的循环类型，被称为 `For-Each` 循环或者加强型循环，它能在不使用下标的情况下遍历数组。

语法格式如下：

```java
for(type element: array){    System.out.println(element);}
```

#### 实例

该实例用来显示数组 `myList 中的所有元素`：

```java
public class TestArray {   public static void main(String[] args) {      double[] myList = {1.9, 2.9, 3.4, 3.5};       // 打印所有数组元素      for (double element: myList) {         System.out.println(element);      }   }}
```

以上实例编译运行结果如下：

``` java
1.92.93.43.5
```

## 6.数组作为函数的参数

数组可以作为参数传递给方法。

例如，下面的例子就是一个打印 `int` 数组中元素的方法:

```java
public static void printArray(int[] array) {
  for (int i = 0; i < array.length; i++) {
    System.out.print(array[i] + " ");
  }
}
```

下面例子调用 `printArray` 方法打印出 3，1，2，6，4 和 2：

```java
printArray(new int[]{3, 1, 2, 6, 4, 2});
```

## 7.数组作为函数的返回值

```java
public static int[] reverse(int[] list) {
  int[] result = new int[list.length];
 
  for (int i = 0, j = result.length - 1; i < list.length; i++, j--) {
    result[j] = list[i];
  }
  return result;
}
```

以上实例中 result 数组作为函数的返回值。

## 8.多维数组

多维数组可以看成是数组的数组，比如二维数组就是一个特殊的一维数组，其每一个元素都是一个一维数组，例如：

```java
String str[][] = new String[3][4];
```

### 多维数组的动态初始化（以二维数组为例）

1. 直接为每一维分配空间，格式如下：

```java
type[][] typeName = new type[typeLength1][typeLength2];
```

`type` 可以为基本数据类型和复合数据类型，`arraylength1` 和 `arraylength2` 必须为正整数，`arraylength1` 为行数，`arraylength2` 为列数。

例如：

```java
int a[][] = new int[2][3];
```

解析：

二维数组 `a` 可以看成一个两行三列的数组。

1. 从最高维开始，分别为每一维分配空间，例如：

```java
String s[][] = new String[2][];
s[0] = new String[2];
s[1] = new String[3];
s[0][0] = new String("Good");
s[0][1] = new String("Luck");
s[1][0] = new String("to");
s[1][1] = new String("you");
s[1][2] = new String("!");
```

解析：

`s[0]=new String[2]` 和 `s[1]=new String[3]` 是为最高维分配引用空间，也就是为最高维限制其能保存数据的最长的长度，然后再为其每个数组元素单独分配空间 `s0=new String("Good")` 等操作。

### 多维数组的引用（以二维数组为例）

对二维数组中的每个元素，引用方式为 `arrayName[index1][index2]`，例如：

```java
num[1][0];
```

## 9.Arrays类

`java.util.Arrays` 类能方便地操作数组，它提供的所有方法都是静态的。

具有以下功能：

- 给数组赋值：通过 `fill` 方法
- 对数组排序：通过 `sort` 方法,按升序
- 比较数组：通过 `equals` 方法比较数组中元素值是否相等
- 查找数组元素：通过 `binarySearch` 方法能对排序好的数组进行二分查找法操作

具体说明请查看下表：

| 序号  | 方法和说明                                                                                                                                                                                                                                                                                                                                        |
| :---: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
|   1   | `public static int binarySearch(Object[] a, Object key)` 用二分查找算法在给定数组中搜索给定值的对象(Byte,Int,double等)。数组在调用前必须排序好的。 如果查找值包含在数组中，则返回搜索键的索引；否则返回 (-(插入点) - 1)。                                                                                                                         |
|   2   | `public static boolean equals(long[] a, long[] a2)` 如果两个指定的 `long` 型数组彼此相等，则返回 `true`。 如果两个数组包含相同数量的元素，并且两个数组中的所有相应元素对都是相等的，则认为这两个数组是相等的。 换句话说，如果两个数组以相同顺序包含相同的元素，则两个数组是相等的。同样的方法适用于所有的其他基本数据类型（Byte，short，Int等）。 |
|   3   | `public static void fill(int[] a, int val)` 将指定的 int 值分配给指定 `int` 型数组指定范围中的每个元素。同样的方法适用于所有的其他基本数据类型（Byte，short，Int等）。                                                                                                                                                                            |
|   4   | `public static void sort(Object[] a)` 对指定对象数组根据其元素的自然顺序进行升序排列。同样的方法适用于所有的其他基本数据类型（Byte，short，Int等）。                                                                                                                                                                                              |

------

## 【----------------------------】
## 六、日期时间

## 1.概述

`java.util` 包提供了 `Date` 类来封装当前的日期和时间。 `Date` 类提供两个构造函数来实例化 `Date` 对象。

第一个构造函数使用当前日期和时间来初始化对象。

```java
Date( )
```

第二个构造函数接收一个参数，该参数是从 `1970年1月1日` 起的毫秒数。

```java
Date(long millisec)
```

`Date` 对象创建以后，可以调用下面的方法。

| 序号  | 方法和描述                                                                                                                                                    |
| :---: | :------------------------------------------------------------------------------------------------------------------------------------------------------------ |
|   1   | `boolean after(Date date)` 若当调用此方法的 `Date` 对象在指定日期之后返回 `true`,否则返回 `false`。                                                           |
|   2   | `boolean before(Date date)` 若当调用此方法的 `Date` 对象在指定日期之前返回 `true`,否则返回 `false`。                                                          |
|   3   | `Object clone( )` 返回此对象的副本。                                                                                                                          |
|   4   | `int compareTo(Date date)` 比较当调用此方法的Date对象和指定日期。两者相等时候返回0。 调用对象在指定日期之前则返回负数。调用对象在指定日期之后则返回正数。     |
|   5   | `int compareTo(Object obj)` 若obj是Date类型则操作等同于 `compareTo(Date)` 。否则它抛出 `ClassCastException`。                                                 |
|   6   | `boolean equals(Object date)` 当调用此方法的Date对象和指定日期相等时候返回 `true`,否则返回 `false`。                                                          |
|   7   | l`ong getTime( )` 返回自 `1970 年 1 月 1 日 00:00:00 GMT` 以来此 `Date` 对象表示的毫秒数。                                                                    |
|   8   | i`nt hashCode( )` 返回此对象的哈希码值。                                                                                                                      |
|   9   | `void setTime(long time)` 用自 `1970年1月1日00:00:00 GMT` 以后time毫秒数设置时间和日期。                                                                      |
|  10   | `String toString( )` 把此 `Date` 对象转换为以下形式的 String： dow mon dd hh:mm:ss zzz yyyy 其中： dow 是一周中的某一天 (Sun, Mon, Tue, Wed, Thu, Fri, Sat)。 |

## 2.获取当前日期时间

Java中获取当前日期和时间很简单，使用 `Date` 对象的 `toString()` 方法来打印当前日期和时间，如下所示：

```java
import java.util.Date;
  
public class DateDemo {
   public static void main(String[] args) {
       // 初始化 Date 对象
       Date date = new Date();
        
       // 使用 toString() 函数显示日期时间
       System.out.println(date.toString());
   }
}
```

以上实例编译运行结果如下:

``` java
Mon May 04 09:51:52 CDT 2019
```

## 3.日期比较

Java使用以下三种方法来比较两个日期：

- 使用 `getTime()` 方法获取两个日期（自 `1970年1月1日` 经历的毫秒数值），然后比较这两个值
- 使用方法 `before()`，`after()` 和 `equals()`。例如，一个月的12号比18号早，则 `new Date(99, 2, 12).before(new Date (99, 2, 18))` 返回 `true`
- 使用 `compareTo()` 方法，它是由 `Comparable` 接口定义的，`Date` 类实现了这个接口

## 4.使用SimpleDateFormat格式化日期

`SimpleDateFormat` 是一个以语言环境敏感的方式来格式化和分析日期的类。`SimpleDateFormat` 允许你选择任何用户自定义日期时间格式来运行。

例如：

```java
import  java.util.*;
import java.text.*;
 
public class DateDemo {
   public static void main(String[] args) {
 
      Date dNow = new Date( );
      SimpleDateFormat ft = new SimpleDateFormat ("yyyy-MM-dd hh:mm:ss");
 
      System.out.println("当前时间为: " + ft.format(dNow));
   }
}
SimpleDateFormat ft = new SimpleDateFormat ("yyyy-MM-dd hh:mm:ss");
```

这一行代码确立了转换的格式，其中 `yyyy` 是完整的公元年，`MM` 是月份，`dd` 是日期，`HH:mm:ss` 是`时、分、秒`。

**注意**: 有的格式大写，有的格式小写，例如 `MM` 是月份，`mm` 是分；`HH` 是 `24` 小时制，而 `hh` 是 `12` 小时制。

以上实例编译运行结果如下:

```java
当前时间为: 2019-12-06 10:16:34
```

## 5.日期和时间的格式化编码

时间模式字符串用来指定时间格式。在此模式中，所有的 `ASCII` 字母被保留为模式字母，定义如下：

| 字母 | 描述                     | 示例                    |
| :--- | :----------------------- | :---------------------- |
| G    | 纪元标记                 | AD                      |
| y    | 四位年份                 | 2001                    |
| M    | 月份                     | July or 07              |
| d    | 一个月的日期             | 10                      |
| h    | A.M./P.M. (1~12)格式小时 | 12                      |
| H    | 一天中的小时 (0~23)      | 22                      |
| m    | 分钟数                   | 30                      |
| s    | 秒数                     | 55                      |
| S    | 毫秒数                   | 234                     |
| E    | 星期几                   | Tuesday                 |
| D    | 一年中的日子             | 360                     |
| F    | 一个月中第几周的周几     | 2 (second Wed. in July) |
| w    | 一年中第几周             | 40                      |
| W    | 一个月中第几周           | 1                       |
| a    | A.M./P.M. 标记           | PM                      |
| k    | 一天中的小时(1~24)       | 24                      |
| K    | A.M./P.M. (0~11)格式小时 | 10                      |
| z    | 时区                     | Eastern Standard Time   |
| '    | 文字定界符               | Delimiter               |
| "    | 单引号                   | `                       |

## 6.使用printf格式化日期

`printf` 方法可以很轻松地格式化时间和日期。使用两个字母格式，它以 `%t` 开头并且以下面表格中的一个字母结尾。

| 转换符 | 说明                          | 示例                             |
| :----- | :---------------------------- | :------------------------------- |
| c      | 包括全部日期和时间信息        | 星期六 十月 27 14:21:20 CST 2007 |
| F      | "`年-月-日`"格式              | 2007-10-27                       |
| D      | "`月/日/年`"格式              | 10/27/07                         |
| r      | "`HH:MM:SS PM`"格式（12时制） | 02:25:51 下午                    |
| T      | "`HH:MM:SS`"格式（24时制）    | 14:28:16                         |
| R      | "`HH:MM`"格式（24时制）       | 14:28                            |

#### 实例

```java
import java.util.Date;
 
public class DateDemo {
 
  public static void main(String[] args) {
     // 初始化 Date 对象
     Date date = new Date();
 
     //c的使用  
    System.out.printf("全部日期和时间信息：%tc%n",date);          
    //f的使用  
    System.out.printf("年-月-日格式：%tF%n",date);  
    //d的使用  
    System.out.printf("月/日/年格式：%tD%n",date);  
    //r的使用  
    System.out.printf("HH:MM:SS PM格式（12时制）：%tr%n",date);  
    //t的使用  
    System.out.printf("HH:MM:SS格式（24时制）：%tT%n",date);  
    //R的使用  
    System.out.printf("HH:MM格式（24时制）：%tR",date);  
  }
}
```

以上实例编译运行结果如下:

``` java
全部日期和时间信息：星期一 九月 10 10:43:36 CST 2012  
年-月-日格式：2012-09-10  
月/日/年格式：09/10/12  
HH:MM:SS PM格式（12时制）：10:43:36 上午  
HH:MM:SS格式（24时制）：10:43:36  
HH:MM格式（24时制）：10:43  
```

如果你需要重复提供日期，那么利用这种方式来格式化它的每一部分就有点复杂了。因此，可以利用一个格式化字符串指出要被格式化的参数的索引。

索引必须紧跟在 `%` 后面，而且必须以$结束。例如：

```java
import java.util.Date;  public class DateDemo {    public static void main(String[] args) {       // 初始化 Date 对象       Date date = new Date();               // 使用toString()显示日期和时间       System.out.printf("%1$s %2$tB %2$td, %2$tY",                          "Due date:", date);   }}
```

以上实例编译运行结果如下:

``` java
Due date: February 09, 2014
```

或者，你可以使用 `<` 标志。它表明先前被格式化的参数要被再次使用。例如：

```java
import java.util.Date;  public class DateDemo {    public static void main(String[] args) {       // 初始化 Date 对象       Date date = new Date();               // 显示格式化时间       System.out.printf("%s %tB %<te, %<tY",                          "Due date:", date);   }}
```

以上实例编译运行结果如下:

``` java
Due date: February 09, 2019
```

定义日期格式的转换符可以使日期通过指定的转换符生成新字符串。这些日期转换符如下所示：

```java
import java.util.*;  public class DateDemo {   public static void main(String[] args) {       Date date=new Date();                                              //b的使用，月份简称          String str=String.format(Locale.US,"英文月份简称：%tb",date);               System.out.println(str);                                                                                      System.out.printf("本地月份简称：%tb%n",date);          //B的使用，月份全称          str=String.format(Locale.US,"英文月份全称：%tB",date);          System.out.println(str);          System.out.printf("本地月份全称：%tB%n",date);          //a的使用，星期简称          str=String.format(Locale.US,"英文星期的简称：%ta",date);          System.out.println(str);          //A的使用，星期全称          System.out.printf("本地星期的简称：%tA%n",date);          //C的使用，年前两位          System.out.printf("年的前两位数字（不足两位前面补0）：%tC%n",date);          //y的使用，年后两位          System.out.printf("年的后两位数字（不足两位前面补0）：%ty%n",date);          //j的使用，一年的天数          System.out.printf("一年中的天数（即年的第几天）：%tj%n",date);          //m的使用，月份          System.out.printf("两位数字的月份（不足两位前面补0）：%tm%n",date);          //d的使用，日（二位，不够补零）          System.out.printf("两位数字的日（不足两位前面补0）：%td%n",date);          //e的使用，日（一位不补零）          System.out.printf("月份的日（前面不补0）：%te",date);     }}
```

输出结果为：

``` java
英文月份简称：May本地月份简称：五月英文月份全称：May本地月份全称：五月英文星期的简称：Thu本地星期的简称：星期四年的前两位数字（不足两位前面补0）：20年的后两位数字（不足两位前面补0）：17一年中的天数（即年的第几天）：124两位数字的月份（不足两位前面补0）：05两位数字的日（不足两位前面补0）：04月份的日（前面不补0）：4
```

## 7.解析字符串为时间

`SimpleDateFormat` 类有一些附加的方法，特别是 `parse()`，它试图按照给定的 `SimpleDateFormat` 对象的格式化存储来解析字符串。

例如：

```java
import java.util.*;import java.text.*;  public class DateDemo {    public static void main(String[] args) {      SimpleDateFormat ft = new SimpleDateFormat ("yyyy-MM-dd");        String input = args.length == 0 ? "1818-11-11" : args[0];        System.out.print(input + " Parses as ");        Date t;        try {           t = ft.parse(input);           System.out.println(t);       } catch (ParseException e) {           System.out.println("Unparseable using " + ft);       }   }}
```

以上实例编译运行结果如下:

``` java
$ java DateDemo1818-11-11 Parses as Wed Nov 11 00:00:00 GMT 1818$ java DateDemo 2007-12-012007-12-01 Parses as Sat Dec 01 00:00:00 GMT 2007
```

## 8.Java休眠(sleep)

`sleep()` 使当前线程进入停滞状态（阻塞当前线程），让出 CPU 的使用、目的是不让当前线程独自霸占该进程所获的 CPU 资源，以留一定时间给其他线程执行的机会。

你可以让程序休眠一毫秒的时间或者到您的计算机的寿命长的任意段时间。例如，下面的程序会休眠3秒：

```java
import java.util.*;  public class SleepDemo {   public static void main(String[] args) {      try {          System.out.println(new Date( ) + "\n");          Thread.sleep(1000*3);   // 休眠3秒         System.out.println(new Date( ) + "\n");       } catch (Exception e) {           System.out.println("Got an exception!");       }   }}
```

以上实例编译运行结果如下:

``` java
Thu Sep 17 10:20:30 CST 2019Thu Sep 17 10:20:33 CST 2019
```

## 9.测量时间

下面的一个例子表明如何测量时间间隔（以毫秒为单位）：

```java
import java.util.*;  public class DiffDemo {    public static void main(String[] args) {      try {         long start = System.currentTimeMillis( );         System.out.println(new Date( ) + "\n");         Thread.sleep(5*60*10);         System.out.println(new Date( ) + "\n");         long end = System.currentTimeMillis( );         long diff = end - start;         System.out.println("Difference is : " + diff);      } catch (Exception e) {         System.out.println("Got an exception!");      }   }}
```

以上实例编译运行结果如下:

``` java
Fri Jan 08 09:48:47 CST 2016Fri Jan 08 09:48:50 CST 2016Difference is : 3019
```

## 10.Calendar类

我们现在已经能够格式化并创建一个日期对象了，但是我们如何才能设置和获取日期数据的特定部分呢，比如说小时，日，或者分钟?

我们又如何在日期的这些部分加上或者减去值呢? 答案是使用 `Calendar` 类。

`Calendar` 类的功能要比 `Date` 类强大很多，而且在实现方式上也比 `Date` 类要复杂一些。

`Calendar` 类是一个抽象类，在实际使用时实现特定的子类的对象，创建对象的过程对程序员来说是透明的，只需要使用 `getInstance` 方法创建即可。

### 创建一个代表系统当前日期的Calendar对象

```java
Calendar c = Calendar.getInstance();//默认是当前日期
```

### 创建一个指定日期的Calendar对象

使用 `Calendar` 类代表特定的时间，需要首先创建一个 `Calendar` 的对象，然后再设定该对象中的年月日参数来完成。

```java
//创建一个代表2009年6月12日的Calendar对象Calendar c1 = Calendar.getInstance();c1.set(2009, 6 - 1, 12);
```

### Calendar类对象字段类型

`Calendar` 类中用以下这些常量表示不同的意义，jdk内的很多类其实都是采用的这种思想

| 常量                  | 描述                           |
| :-------------------- | :----------------------------- |
| Calendar.YEAR         | 年份                           |
| Calendar.MONTH        | 月份                           |
| Calendar.DATE         | 日期                           |
| Calendar.DAY_OF_MONTH | 日期，和上面的字段意义完全相同 |
| Calendar.HOUR         | 12小时制的小时                 |
| Calendar.HOUR_OF_DAY  | 24小时制的小时                 |
| Calendar.MINUTE       | 分钟                           |
| Calendar.SECOND       | 秒                             |
| Calendar.DAY_OF_WEEK  | 星期几                         |

### Calendar类对象信息的设置

#### Set设置

如：

```java
Calendar c1 = Calendar.getInstance();
```

调用：

```java
public final void set(int year,int month,int date)c1.set(2009, 6, 12);//把Calendar对象c1的年月日分别设这为：2009、6、12
```

利用字段类型设置

如果只设定某个字段，例如日期的值，则可以使用如下 `set` 方法：

```java
public void set(int field,int value)
```

把 `c1` 对象代表的日期设置为 `10` 号，其它所有的数值会被重新计算

```java
c1.set(Calendar.DATE,10);
```

把 `c1` 对象代表的年份设置为 `2008` 年，其他的所有数值会被重新计算

```java
c1.set(Calendar.YEAR,2008);
```

其他字段属性 `set` 的意义以此类推

#### Add设置

```java
Calendar c1 = Calendar.getInstance();
```

把 `c1` 对象的日期加上 `10`，也就是 `c1` 也就表示为 `10` 天后的日期，其它所有的数值会被重新计算

```java
c1.add(Calendar.DATE, 10);
```

把 `c1` 对象的日期减去 `10`，也就是 `c1` 也就表示为 `10` 天前的日期，其它所有的数值会被重新计算

```java
c1.add(Calendar.DATE, -10);
```

其他字段属性的 `add` 的意义以此类推

### Calendar类对象信息的获得

```java
Calendar c1 = Calendar.getInstance();// 获得年份int year = c1.get(Calendar.YEAR);// 获得月份int month = c1.get(Calendar.MONTH) + 1;// 获得日期int date = c1.get(Calendar.DATE);// 获得小时int hour = c1.get(Calendar.HOUR_OF_DAY);// 获得分钟int minute = c1.get(Calendar.MINUTE);// 获得秒int second = c1.get(Calendar.SECOND);// 获得星期几（注意（这个与Date类是不同的）：1代表星期日、2代表星期1、3代表星期二，以此类推）int day = c1.get(Calendar.DAY_OF_WEEK);
```

## 11.GregorianCalendar类

`Calendar` 类实现了公历日历，`GregorianCalendar` 是 `Calendar` 类的一个具体实现。

`Calendar` 的 `getInstance()` 方法返回一个默认用当前的语言环境和时区初始化的 `GregorianCalendar` 对象。`GregorianCalendar` 定义了两个字段：`AD` 和 `BC`。这是代表公历定义的两个时代。

下面列出 `GregorianCalendar` 对象的几个构造方法：

| 序号 | 构造函数和说明                                                                                                                                                          |
| :--- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1    | `GregorianCalendar()` 在具有默认语言环境的默认时区内使用当前时间构造一个默认的 `GregorianCalendar`。                                                                    |
| 2    | `GregorianCalendar(int year, int month, int date)` 在具有默认语言环境的默认时区内构造一个带有给定日期设置的 `GregorianCalendar`                                         |
| 3    | `GregorianCalendar(int year, int month, int date, int hour, int minute)` 为具有默认语言环境的默认时区构造一个具有给定日期和时间设置的 `GregorianCalendar`。             |
| 4    | `GregorianCalendar(int year, int month, int date, int hour, int minute, int second)` 为具有默认语言环境的默认时区构造一个具有给定日期和时间设置的 `GregorianCalendar`。 |
| 5    | `GregorianCalendar(Locale aLocale)` 在具有给定语言环境的默认时区内构造一个基于当前时间的 `GregorianCalendar`。                                                          |
| 6    | `GregorianCalendar(TimeZone zone)` 在具有默认语言环境的给定时区内构造一个基于当前时间的 `GregorianCalendar`。                                                           |
| 7    | `GregorianCalendar(TimeZone zone, Locale aLocale)` 在具有给定语言环境的给定时区内构造一个基于当前时间的 `GregorianCalendar`。                                           |

这里是 `GregorianCalendar` 类提供的一些有用的方法列表：

| 序号 | 方法和说明                                                                                                       |
| :--- | :--------------------------------------------------------------------------------------------------------------- |
| 1    | `void add(int field, int amount)` 根据日历规则，将指定的（有符号的）时间量添加到给定的日历字段中。               |
| 2    | `protected void computeFields()` 转换 `UTC` 毫秒值为时间域值                                                     |
| 3    | `protected void computeTime()` 覆盖 `Calendar` ，转换时间域值为 `UTC` 毫秒值                                     |
| 4    | `boolean equals(Object obj)` 比较此 `GregorianCalendar` 与指定的 `Object`。                                      |
| 5    | `int get(int field)` 获取指定字段的时间值                                                                        |
| 6    | `int getActualMaximum(int field)` 返回当前日期，给定字段的最大值                                                 |
| 7    | `int getActualMinimum(int field)` 返回当前日期，给定字段的最小值                                                 |
| 8    | `int getGreatestMinimum(int field)` 返回此 `GregorianCalendar` 实例给定日历字段的最高的最小值。                  |
| 9    | `Date getGregorianChange()` 获得格里高利历的更改日期。                                                           |
| 10   | `int getLeastMaximum(int field)` 返回此 `GregorianCalendar` 实例给定日历字段的最低的最大值                       |
| 11   | `int getMaximum(int field)` 返回此 `GregorianCalendar` 实例的给定日历字段的最大值。                              |
| 12   | `Date getTime()` 获取日历当前时间。                                                                              |
| 13   | `long getTimeInMillis()` 获取用长整型表示的日历的当前时间                                                        |
| 14   | `TimeZone getTimeZone()` 获取时区。                                                                              |
| 15   | `int getMinimum(int field)` 返回给定字段的最小值。                                                               |
| 16   | `int hashCode()` 重写 `hashCode`.                                                                                |
| 17   | `boolean isLeapYear(int year)` 确定给定的年份是否为闰年。                                                        |
| 18   | `void roll(int field, boolean up)` 在给定的时间字段上添加或减去（上/下）单个时间单元，不更改更大的字段。         |
| 19   | `void set(int field, int value)` 用给定的值设置时间字段。                                                        |
| 20   | `void set(int year, int month, int date)` 设置年、月、日的值。                                                   |
| 21   | `void set(int year, int month, int date, int hour, int minute)` 设置年、月、日、小时、分钟的值。                 |
| 22   | `void set(int year, int month, int date, int hour, int minute, int second)` 设置年、月、日、小时、分钟、秒的值。 |
| 23   | `void setGregorianChange(Date date)` 设置 `GregorianCalendar` 的更改日期。                                       |
| 24   | `void setTime(Date date)` 用给定的日期设置 `Calendar` 的当前时间。                                               |
| 25   | `void setTimeInMillis(long millis)` 用给定的 `long` 型毫秒数设置 `Calendar` 的当前时间。                         |
| 26   | `void setTimeZone(TimeZone value)` 用给定时区值设置当前时区。                                                    |
| 27   | `String toString()` 返回代表日历的字符串。                                                                       |

#### 实例

```java
import java.util.*;  public class GregorianCalendarDemo {    public static void main(String[] args) {      String months[] = {      "Jan", "Feb", "Mar", "Apr",      "May", "Jun", "Jul", "Aug",      "Sep", "Oct", "Nov", "Dec"};            int year;      // 初始化 Gregorian 日历      // 使用当前时间和日期      // 默认为本地时间和时区      GregorianCalendar gcalendar = new GregorianCalendar();      // 显示当前时间和日期的信息      System.out.print("Date: ");      System.out.print(months[gcalendar.get(Calendar.MONTH)]);      System.out.print(" " + gcalendar.get(Calendar.DATE) + " ");      System.out.println(year = gcalendar.get(Calendar.YEAR));      System.out.print("Time: ");      System.out.print(gcalendar.get(Calendar.HOUR) + ":");      System.out.print(gcalendar.get(Calendar.MINUTE) + ":");      System.out.println(gcalendar.get(Calendar.SECOND));            // 测试当前年份是否为闰年      if(gcalendar.isLeapYear(year)) {         System.out.println("当前年份是闰年");      }      else {         System.out.println("当前年份不是闰年");      }   }}
```

以上实例编译运行结果如下：

``` java
Date: Apr 22 2009Time: 11:25:27当前年份不是闰年
```

#### 练习

`Calender` 的月份是从 `0` 开始的，但日期和年份是从 `1` 开始的

示例代码：

```java
import java.util.Calendar;public class Test {    public static void main(String[] args) {            Calendar c1 = Calendar.getInstance();            c1.set(2017, 1, 1);            System.out.println(c1.get(Calendar.YEAR)                    +"-"+c1.get(Calendar.MONTH)                    +"-"+c1.get(Calendar.DATE));            c1.set(2017, 1, 0);            System.out.println(c1.get(Calendar.YEAR)                    +"-"+c1.get(Calendar.MONTH)                    +"-"+c1.get(Calendar.DATE));    }}
```

运行结果：

``` java
2017-1-12017-0-31
```

可见，将日期设为0以后，月份变成了上个月，但月份可以为0

把月份改为2试试：

```java
import java.util.Calendar;public class Test {    public static void main(String[] args) {            Calendar c1 = Calendar.getInstance();            c1.set(2017, 2, 1);            System.out.println(c1.get(Calendar.YEAR)                    +"-"+c1.get(Calendar.MONTH)                    +"-"+c1.get(Calendar.DATE));            c1.set(2017, 2, 0);            System.out.println(c1.get(Calendar.YEAR)                    +"-"+c1.get(Calendar.MONTH)                    +"-"+c1.get(Calendar.DATE));    }}
```

运行结果：

``` java
2017-2-12017-1-28
```

可以看到上个月的最后一天是28号，所以 `Calendar.MONTH` 为1的时候是2月

既然日期设为0表示上个月的最后一天，那是不是可以设为负数呢？

```java
import java.util.Calendar;

public class Test {
    public static void main(String[] args) {
            Calendar c1 = Calendar.getInstance();
            c1.set(2017, 2, 1);
            System.out.println(c1.get(Calendar.YEAR)
                    +"-"+c1.get(Calendar.MONTH)
                    +"-"+c1.get(Calendar.DATE));
            c1.set(2017, 2, -10);
            System.out.println(c1.get(Calendar.YEAR)
                    +"-"+c1.get(Calendar.MONTH)
                    +"-"+c1.get(Calendar.DATE));
    }
}
```

运行结果：

``` java
2017-2-1
2017-1-18
```

果然可以，所以日期才可以自由加减。

月份也可以是负数，规则与日期一样，就不上代码了。

实测将年份设为非正数时，会自动变为 `绝对值+1`，不知其意义。

## 参考文章
* https://www.cnblogs.com/liuxiaojun/p/training-java-number-math.html
* https://www.cnblogs.com/liuxiaojun/p/training-java-character.html
* https://www.cnblogs.com/liuxiaojun/p/training-java-string.html
* https://www.cnblogs.com/liuxiaojun/p/training-java-stringbuffer.html
* https://www.cnblogs.com/liuxiaojun/p/training-java-stringbuffer.html
* https://www.cnblogs.com/liuxiaojun/p/training-java-array.html
* https://www.cnblogs.com/liuxiaojun/p/training-javajava-date-time.html