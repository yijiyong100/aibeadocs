---
title: Java集合类 Set
---

## Java基础知识篇【集合类 Set】

::: tip
本文主要是介绍 集合类 Set 。Set集合中包含了三个比较重要的实现类:HashSet、TreeSet和EnumSet。本篇文章将重点介绍这三个类。
:::

[[toc]]

　　

## 一、HashSet类

### HashSet简介

HashSet是Set接口的典型实现，实现了Set接口中的所有方法，并没有添加额外的方法，大多数时候使用Set集合时就是使用这个实现类。HashSet按Hash算法来存储集合中的元素。因此具有很好的存取和查找性能。

### HashSet特点

* 1.不能保证元素的排列顺序，顺序可能与添加顺序不同，顺序也有可能发生变化。
* 2.HashSet不是同步的，如果多个线程同时访问一个HashSet，则必须通过代码来保证其同步。
* 3.集合元素值可以是null。

除此之外，HashSet判断两个元素是否相等的标准也是其一大特点。HashSet集合判断两个元素相等的标准是两个对象通过equals()方法比较相等，并且两个对象的hashCode()方法返回值也相等。

写到这里，我们就要介绍下equals()和hashCode()方法了。

## equals()和hashCode()

### equals()

equals() 的作用是** 用来判断两个对象是否相等。**

equals() 定义在JDK的Object.java中。通过判断两个对象的 **地址** 是否相等(即，是否是同一个对象)来区分它们是否相等。源码如下：

``` java
1 public boolean equals(Object obj) {
2        return (this == obj);
3    }
```

既然Object.java中定义了equals()方法，这就意味着所有的Java类都实现了equals()方法，所有的类都可以通过equals()去比较两个对象是否相等。 但是，使用默认的“equals()”方法，等价于“==”方法。我们也可以在Object的子类中重写此方法，自定义“equals()”方法，在其中定义自己的判断逻辑，如果满足则返回true，不满足则返回false。下面我们自定义一个类 Person,并认为年龄，身高相等的两个Person对象，equals()方法比较结果相等。


 
``` java
 1 public class Person {
 2     public int age;
 3     public int height;
 4     @Override
 5     public boolean equals(Object obj) {
 6         if (this == obj)
 7             return true;
 8         if (obj == null)
 9             return false;
10         if (getClass() != obj.getClass())
11             return false;
12         Person other = (Person) obj;
13         if (age != other.age)
14             return false;
15         if (height != other.height)
16             return false;
17         return true;
18     }
19 }
```



``` java
 1 public class EqualTest {
 2   public static void main(String[] args){
 3       Person p1 = new Person();
 4       Person p2 =new Person();
 5       System.out.println(p1.equals(p2));
 6   }
 7 
 8 }
```



输出结果：

``` java
true
```

　　

下面根据“类是否覆盖equals()方法”，将它分为2类。
(01) 若某个类没有覆盖equals()方法，当它通过equals()比较两个对象时，实际上是比较两个对象是不是同一个对象。这时，等价于通过“==”去比较这两个对象，即两个对象的**内存地址**是否相同。
(02) 我们可以覆盖类的equals()方法，来让equals()通过其它方式比较两个对象是否相等。通常的做法是：若两个对象的**内容**相等，则equals()方法返回true；否则，返回fasle。

### hashCode()

hashCode() 的作用**是获取哈希码，也称为散列码；它实际上是返回一个int整数。这个哈希码的作用是确定该对象在哈希表中的索引位置。**

hashCode() 定义在JDK的Object.java中，这就意味着Java中的任何类都包含有hashCode() 函数。虽然，每个Java类都包含hashCode() 函数。**但是，仅仅当创建某个“类"的散列表时，该类的hashCode() 才有用。更通俗地说就是创建包含该类的HashMap，Hashtable，HashSet集合时，hashCode() 才有用。因为HashMap，Hashtable，HashSet就是散列表集合。**


在散列表中，hashCode()作用是：**确定该类的每一个对象在散列表中的位置；**其它情况下类的hashCode() 没有作用。**在散列表中hashCode() 的作用是获取对象的散列码，进而确定该对象在散列表中的位置。**

 

hashCode()也分两种情况。一种是Object类中默认的方法，另一种是在子类中重写的方法。
* (01) 若某个类没有覆盖hashCode()方法，当它的通过hashCode()比较两个对象时，实际上是比较两个对象是不是同一个对象。这时，等价于通过“==”去比较这两个对象，即两个对象的**内存地址**是否相同。
* (02) 我们可以覆盖类的hashCode()方法，来让hashCode()通过其它方式比较两个对象是否相等。通常的做法是：若两个对象的**内容**相等，则hashCode()方法返回true；否则，返回fasle。

通过对以上两个方法的了解。我们可以接下来学习HashSet集合中如何判断两个元素是否相等？

### HashSet中判断集合元素相等

两个对象比较 具体分为如下四个情况：

1.如果有两个元素通过equal()方法比较返回false，且它们的hashCode()方法返回不相等，HashSet将会把它们存储在不同的位置。

2.如果有两个元素通过equal()方法比较返回true，但它们的hashCode()方法返回不相等，HashSet将会把它们存储在不同的位置。

3.如果两个对象通过equals()方法比较不相等，但hashCode()方法比较相等，HashSet将会把它们存储在相同的位置，在这个位置以链表式结构来保存多个对象。这是因为当向HashSet集合中存入一个元素时，HashSet会调用对象的hashCode()方法来得到对象的hashCode值，然后根据该hashCode值来决定该对象存储在HashSet中存储位置。

4.如果有两个元素通过equal()方法比较返回true，且它们的hashCode()方法返回true，HashSet将不予添加。

HashSet判断两个元素相等的标准：**两个对象通过equals()方法比较相等，并且两个对象的hashCode()方法返回值也相等。**

**注意：HashSet是根据元素的hashCode值来快速定位的**，如果HashSet中两个以上的元素具有相同的hashCode值，将会导致性能下降。所以如果重写类的equals()方法和hashCode()方法时，应尽量保证两个对象通过hashCode()方法返回值相等时，通过equals()方法比较返回true。

### LinkedHashSet类

LinkedHashSet是HashSet对的子类，也是根据元素的hashCode值来决定元素的存储位置，同时使用链表维护元素的次序，使得元素是以插入的顺序来保存的。当遍历LinkedHashSet集合里的元素时，LinkedHashSet将会按元素的添加顺序来访问集合里的元素。但是由于要维护元素的插入顺序，在性能上略低与HashSet，但在迭代访问Set里的全部元素时有很好的性能。
**注意：**LinkedHashSet依然不允许元素重复，判断重复标准与HashSet一致。

**补充：**HashSet的实质是一个HashMap。**HashSet的所有集合元素，构成了HashMap的key，其value为一个静态Object对象**。因此HashSet的所有性质，HashMap的key所构成的集合都具备。可以参考后续文章中HashMap的相关内容进行比对。

## 二、TreeSet类

## TreeSet简介

TreeSet是SortedSet接口的实现类，正如SortedSet名字所暗示的，TreeSet可以确保集合元素处于排序状态。此外，TreeSet还提供了几个额外的方法。

### TreeSet的方法

``` java
1  comparator():返回对此 set 中的元素进行排序的比较器；如果此 set 使用其元素的自然顺序，则返回null。
2  first():返回此 set 中当前第一个（最低）元素。
3  last(): 返回此 set 中当前最后一个（最高）元素。
4  lower(E e):返回此 set 中严格小于给定元素的最大元素；如果不存在这样的元素，则返回 null。
5  higher(E e):返回此 set 中严格大于给定元素的最小元素；如果不存在这样的元素，则返回 null。
6  subSet(E fromElement, E toElement):返回此 set 的部分视图，其元素从 fromElement（包括）到 toElement（不包括）。
7  headSet(E toElement):返回此 set 的部分视图，其元素小于toElement。
8  tailSet(E fromElement):返回此 set 的部分视图，其元素大于等于 fromElement。
```

　　

### TreeSet的排序方式

TreeSet中所谓的有序，不同于之前所讲的插入顺序，而是通过集合中元素属性进行排序方式来实现的。
TreeSet支持两种排序方法：**自然排序**和**定制排序**。在默认情况下，TreeSet采用自然排序。

### 1.自然排序

在讲自然排序之前，要先讲一下**Comparable接口**。

Java提供了一个Comparable接口，该接口里定义了一个compareTo(Object obj)方法,该方法返回一个整数值，实现该接口的类必须实现该方法，实现了该接口的类的对象就可以比较大小了。当一个对象调用该方法与另一个对象比较时，例如obj1.compareTo(obj2),如果该方法返回0，则表明两个对象相等；如果该方法返回一个整数，则表明obj1大于obj2;如果该方法返回一个负整数，则表明oj1小于obj2。

TreeSet会调用集合中**元素所属类的compareTo(Object obj)方法**来比较元素之间的大小关系，然后将集合元素按升序排列，即把通过compareTo(Object obj)方法比较后比较大的的往后排。这种方式就是自然排序。

**Java的一些常用类已经实现了Comparable接口，并提供了比较大小的标准。**例如，String按字符串的UNICODE值进行比较，Integer等所有数值类型对应的包装类按它们的数值大小进行比较。

除了这些已经实现Comparable接口类之外，如果试图把一个对象添加到TreeSet时，则该对象的类必须实现Comparable接口，否则就会出现异常。
**注意：**TreeSet中只能添加同一种类型的对象，否则无法比较，会出现异常。

### TreeSet中判断集合元素相等

对于TreeSet集合而言，判断两个对象是否相等的唯一标准是：两个对象通过compareTo(Object obj)方法比较是否返回0——如果通过compareTo(Object obj)方法比较返回0，TreeSet则会认为它们相等，不予添加入集合内；否则就认为它们不相等，添加到集合内。
**TreeSet是根据红黑树结构找到集合元素的存储位置。**

### 2.定制排序

TreeSet的自然排序是根据集合元素中compareTo(Object obj)比较的大小，以升序排列。而定制排序是通过Comparator接口的帮助。该接口包含一个int compare(T o1,T o2)方法，该方法用于比较o1,o2的大小：如果该方法返回正整数，则表明o1大于o2；如果该方法返回0，则表明o1等于o2;如果该方法返回负整数，则表明o1小于o2。
如果要实现定制排序，则需要在创建TreeSet时，调用一个带参构造器，传入Comparator对象。并由该Comparator对象负责集合元素的排序逻辑，集合元素可以不必实现Comparable接口。下面具体演示一下这种用法：



``` java
 1 public static void main(String[] args){
 2         Person p1 = new Person();
 3         p1.age =20;
 4         Person p2 =new Person();
 5         p2.age = 30;
 6         Comparator<Person> comparator = new Comparator<Person>() {
 7 
 8             @Override
 9             public int compare(Person o1, Person o2) {
10                 //年龄越小的排在越后面
11                 if(o1.age<o2.age){
12                     return 1;
13                 }else if(o1.age>o2.age){
14                     return -1;
15                 }else{
16                     return 0;
17                 }
18                 
19             }
20         };
21         TreeSet<Person> set = new TreeSet<Person>(comparator);
22         set.add(p1);
23         set.add(p2);
24         System.out.println(set);
25     }
```



``` java
[Person[age=30], Person[age=20]]
```

　　

总结：无论使用自然排序还是定制排序，都可以通过自定义比较逻辑实现各种各样的排序方式。

注意:如果向TreeSet中添加了一个可变对象后，并且后面程序修改了该可变对象的实例变量，这将导致它与其他对象的大小顺序发生了改变，但TreeSet不会再次调整它们。下面程序演示这一现象：



``` java
TreeSet<Person> set = new TreeSet<Person>();
 2         Person p1 = new Person();
 3         p1.setAge(10);
 4         Person p2 =new Person();
 5         p2.setAge(30);
 6         Person p3 =new Person();
 7         p3.setAge(40);
 8         set.add(p1);
 9         set.add(p2);
10         set.add(p3);
11         System.out.println("初始年龄排序");
12         System.out.println(set);
13         //p1的年龄修改成60 最大
14         p1.age = 60;
15         System.out.println("修改p1年龄后集合排序");
16         System.out.println(set);
17         p2.age = 40;
18         System.out.println("修改p2年龄后集合排序");
19         System.out.println(set);
20         Person p4 = new Person();
```



其中Person实现Comparable接口，将Person对象按照年龄从小到大升序排列。
输出结果：

``` java
1  初始年龄排序
2  [Person[age=10], Person[age=30], Person[age=40]]
3  修改p1年龄后集合排序
4  [Person[age=60], Person[age=30], Person[age=40]]
5  修改p2年龄后集合排序
6  [Person[age=60], Person[age=40], Person[age=40]]
```

　　

可以看到并没有发生变化，而且如果修改后进行元素删除操作可能会不成功，具体比较复杂。**总之，推荐不要修改放入TreeSet集合中元素的关键实例变量。**
**补充：TreeSet也是非线程安全的。**

## 三、EnumSet类

### EnumSet简介

EnumSet是一个专为枚举类设计的集合类，EnumSet中的所有元素都必须是指定枚举类型的枚举值，该枚举类型在创建EnumSet时显示或隐式地指定。EnumSet的集合元素也是有序的，EnumSet以枚举值在EnumSet类内的定义顺序来决定集合元素的顺序。

### EnumSet特点

1.EnumSet集合不允许加入null元素。EnumSet中的所有元素都必须是指定枚举类型的枚举值。
2.EnumSet类没有暴露任何构造器来创建该类的实例，程序应该通过它提供的类方法来创建EnumSet对象。

EnumSet没有其他额外增加的方法，只是增加了一些创建EnumSet对象的方法。

### EnumSet创建对象的方法

 

 

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/java/collection/set-1.png')" alt="wxmp">

 


**补充：EnumSet 也是非线程安全的。**

 

## 四、HashSet、TreeSet和EnumSet的性能对比

**EnumSet性能>HashSet性能>LinkedHashSet>TreeSet性能**

EnumSet内部以位向量的形式存储，结构紧凑、高效，且只存储枚举类的枚举值，所以最高效。HashSet以hash算法进行位置存储，特别适合用于添加、查询操作。LinkedHashSet由于要维护链表，性能比HashSet差点，但是有了链表，LinkedHashSet更适合于插入、删除以及遍历操作。而TreeSet需要额外的红黑树算法来维护集合的次序，性能最次。

但是具体使用要考虑具体的使用场景。
* 当需要一个特定排序的集合时，使用TreeSet集合。
* 当需要保存枚举类的枚举值时，使用EnumSet集合。
* 当经常使用添加、查询操作时，使用HashSet。
* 当经常插入排序或使用删除、插入及遍历操作时，使用LinkedHashSet。

## 参考文章
* https://www.cnblogs.com/midiyu/p/8135022.html