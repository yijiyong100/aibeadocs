---
title: 算法时间和空间复杂度
---

::: tip
本文主要是介绍 算法时间和空间复杂度 。
:::

[[toc]]

## 算法的时间复杂度和空间复杂度

### 一、算法效率的度量方法

**1.事后统计方法**

这种方法主要是通过设计好的测试程序和数据，利用计算机计时器对不同算法编制的程序的运行时间进行比较，从而确定算法效率的高低。

**2.事前分析估算方法**

在计算机程序编写前，依据统计方法对算法进行估算。

经过总结，我们发现一个高级语言编写的程序在计算机上运行时所消耗的时间取决于下列因素：

1. 算法采用的策略，方案
2. 编译产生的代码质量
3. 问题的输入规模
4. 机器执行指令的速度

> 由此可见，抛开这些与计算机硬件、软件有关的因素，一个程序的运行时间依赖于算法的好坏和问题的输入规模。（所谓的问题输入规模是指输入量的多少）

实现：1+2+…+99+100
 第一种算法：



```cpp
int i, sum = 0, n = 100;   // 执行1次
for( i=1; i <= n; i++ )    // 执行了n+1次
{
    sum = sum + i;          // 执行n次
}
```

第二种算法：



```cpp
int sum = 0, n = 100;     // 执行1次
sum = (1+n)*n/2;          // 执行1次
```

第一种算法执行了1+(n+1)+n=2n+2次。
 第二种算法，是1+1=2次
 如果我们把循环看做一个整体，忽略头尾判断的开销，那么这两个算法其实就是n和1的差距。

分析一个算法的运行时间时，重要的是把基本操作的数量和输入模式关联起来。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/algorithm/basic/complexity/4807654-7d0f73fe1adcf178.jpg')" alt="wxmp">

算法效率的度量方法.jpg

### 二、函数的渐近增长

**例1：**
 假设两个算法的输入规模都是n，
 算法A要做2n+3次操作，即：先执行n次的循环，执行完成后再有一个n次的循环，最后有3次运算。
 算法B要做3n+1次操作，理解同上
 哪一个更快些？

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/algorithm/basic/complexity/4807654-b216fcb08567177e.jpg')" alt="wxmp">

算法比较.jpg

当n=1时，算法A1效率不如算法B1，
 当n=2时，两者效率相同；
 当n>2时，算法A1就开始优于算法B1了，随着n的继续增加，算法A1比算法B1 逐步拉大差距。所以总体上算法A1比算法B1优秀。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/algorithm/basic/complexity/4807654-0dd00bdbc9a5a705.jpg')" alt="wxmp">

线性图.jpg

函数的渐近增长：给定两个函数f(n)和g(n)，如果存在一个整数N，使得对于所有的n>N，f(n)总是比g(n)大，那么，我们说f(n)的增长渐近快于g(n)。

> 注：随着n的增大，后面的+3和+1其实是不影响最终的算法变化曲线的。所以，我们可以忽略这些加法常数。

**例2：**算法C是4n+8，算法D是2n^2+1。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/algorithm/basic/complexity/4807654-ce32051cc0d4f9af.jpg')" alt="wxmp">

算法比较2.jpg

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/algorithm/basic/complexity/4807654-95c95df9ca4bd48d.jpg')" alt="wxmp">

线性图2.jpg

去掉与n相乘的常数，两者的结果还是没有改变，算法C2的次数随着n的增长，还是远小于算法D2。也就是说，与最高次项相乘的常数并不重要，也可以忽略。

**例3：**算法E是2n2+3n+1，算法F是2n3+3n+1

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/algorithm/basic/complexity/4807654-2be2433eefc584db.jpg')" alt="wxmp">

算法比较3.jpg

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/algorithm/basic/complexity/4807654-2192c7b832d930b7.jpg')" alt="wxmp">

线性图3.jpg

**例4：**算法G是2n^2，算法H是3n+1，算法I是 2n^2+3n+1

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/algorithm/basic/complexity/4807654-d1e2a67f80378947.jpg')" alt="wxmp">

算法比较4.jpg

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/algorithm/basic/complexity/4807654-5b028bcccad31869.jpg')" alt="wxmp">

线性图4.jpg

当他们数据很小的时候是这样的：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/algorithm/basic/complexity/4807654-920b1aed7022a000.jpg')" alt="wxmp">

线性图4-小.jpg

这组数据我们看得很清楚，当n的值变得非常大的时候，3n+1已经没法和2n^2的结果相比较，最终几乎可以忽略不计。而算法G在跟算法I基本已经重合了。

于是我们可以得到这样一个结论，判断一个算法的效率时，函数中的常数和其他次要项常常可以忽略，而更应该关注主项（最高项）的阶数。

### 三、算法时间复杂度

**1.算法时间复杂度的定义：**
 在进行算法分析时，语句总的执行次数T(n)是关于问题规模n的函数，进而分析T(n)随n的变化情况并确定T(n)的数量级。算法的时间复杂度，也就是算法的时间量度，记作：T(n)= O(f(n))。它表示随问题规模n的增大，算法执行时间的增长率和f(n)的增长率相同，称作算法的渐近时间复杂度，简称为时间复杂度。其中f(n)是问题规模n的某个函数。

用大写O()来体现算法时间复杂度的记法，我们称之为大O记法。

一般情况下，随着输入规模n的增大，T(n)增长最慢的算法为最优算法。
 显然，由此算法时间复杂度的定义可知，我们的三个求和算法的时间复杂度分别为O(1)，O(n)，O(n^2)。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/algorithm/basic/complexity/4807654-b85dde77b61f8a33.jpg')" alt="wxmp">

算法时间复杂度.jpg

**2.推导大O阶方法**

如何分析一个算法的时间复杂度呢？即如何推导大O阶呢？

- 用常数1取代运行时间中的所有加法常数。
- 在修改后的运行次数函数中，只保留最高阶项。
- 如果最高阶项存在且不是1，则去除与这个项相乘的常数。
- 得到的最后结果就是大O阶。

①常数阶

例：段代码的大O是多少？



```cpp
int sum = 0, n = 100;
printf(“I love you.com\n”);
printf(“I love you.com\n”);
printf(“I love you.com\n”);
printf(“I love you.com\n”);
printf(“I love you.com\n”);
printf(“I love you.com\n”);
sum = (1+n)*n/2;
```

第一条就说明了所有加法常数给他个O(1)即可

②线性阶：一般含有非嵌套循环涉及线性阶，线性阶就是随着问题规模n的扩大，对应计算次数呈直线增长。



```cpp
int i , n = 100, sum = 0;
for( i=0; i < n; i++ )
{
    sum = sum + i;
}
```

上面这段代码，它的循环的时间复杂度为O(n)，因为循环体中的代码需要执行n次。

③平方阶



```cpp
int i, j, n = 100;
for( i=0; i < n; i++ )
{
    for( j=0; j < n; j++ )
    {
        printf(“I love FishC.com\n”);
    }
}
```

n等于100，也就是说外层循环每执行一次，内层循环就执行100次，那总共程序想要从这两个循环出来，需要执行100*100次，也就是n的平方。所以这段代码的时间复杂度为O(n^2)。

> 总结：如果有三个这样的嵌套循环就是n^3。所以总结得出，循环的时间复杂度等于循环体的复杂度乘以该循环运行的次数。



```cpp
int i, j, n = 100;
for( i=0; i < n; i++ )
{
    for( j=i; j < n; j++ )
    {
        printf(“I love FishC.com\n”);
    }
}
```

由于当i=0时，内循环执行了n次，当i=1时，内循环则执行n-1次……当i=n-1时，内循环执行1次，所以总的执行次数应该是：
 n+(n-1)+(n-2)+…+1 = n(n+1)/2
 n(n+1)/2 = n^2/2+n/2
 用我们推导大O的攻略，第一条忽略，因为没有常数相加。第二条只保留最高项，所以n/2这项去掉。第三条，去除与最高项相乘的常数，最终得O(n^2)。

④对数阶



```cpp
int i = 1, n = 100;
while( i < n )
{
    i = i * 2;
}
```

由于每次i*2之后，就距离n更近一步，假设有x个2相乘后大于或等于n，则会退出循环。
 于是由2^x = n得到x = log(2)n，所以这个循环的时间复杂度为O(logn)。

### 四、函数调用的时间复杂度分析

例：



```php
int i, j;
for(i=0; i < n; i++) {
    function(i);
}
void function(int count) {
    printf(“%d”, count);
}
```

函数体是打印这个参数，这很好理解。function函数的时间复杂度是O(1)，所以整体的时间复杂度就是循环的次数O(n)。

假如function是下面这样：



```cpp
void function(int count) {    int j;    for(j=count; j < n; j++) {        printf(“%d”, j);    }}
```

事实上，这和之前平方阶的时候举的第二个例子一样：function内部的循环次数随count的增加(接近n)而减少，所以根据游戏攻略算法的时间复杂度为O(n^2)。

例：



``` c
n++; //1
function(n); //1
for(i=0; i < n; i++) { //n
    function(i);
}
for(i=0; i < n; i++) { //n^2
    for(j=i; j < n; j++) {
        printf(“%d”, j);
    }
}
void function(int count) {
    printf(“%d”, count);
}
```

为：1+1+n+n2，所以最后是O(n2)

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/algorithm/basic/complexity/4807654-9d3b7f58b405a618.jpg')" alt="wxmp">

常见的时间复杂度.jpg

对应的线性图：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/algorithm/basic/complexity/4807654-598b0b7127074150.jpg')" alt="wxmp">

常见时间复杂度线性图.jpg

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/algorithm/basic/complexity/4807654-9d6c8a4eef4d29ed.jpg')" alt="wxmp">

时间复杂度线性图.jpg

常用的时间复杂度所耗费的时间从小到大依次是：
 O(1) < O(logn) < (n) < O(nlogn) < O(n^2) < O(n^3) < O(2^n) < O(n!) < O(n^n)

### 五、最坏情况与平均情况

我们查找一个有n个随机数字数组中的某个数字，最好的情况是第一个数字就是，那么算法的时间复杂度为O(1)，但也有可能这个数字就在最后一个位置，那么时间复杂度为O(n)。
 平均运行时间是期望的运行时间。
 最坏运行时间是一种保证。在应用中，这是一种最重要的需求，通常除非特别指定，我们提到的运行时间都是最坏情况的运行时间。

### 六、算法的空间复杂度

我们在写代码时，完全可以用空间来换去时间。
 举个例子说，要判断某年是不是闰年，你可能会花一点心思来写一个算法，每给一个年份，就可以通过这个算法计算得到是否闰年的结果。
 另外一种方法是，事先建立一个有2050个元素的数组，然后把所有的年份按下标的数字对应，如果是闰年，则此数组元素的值是1，如果不是元素的值则为0。这样，所谓的判断某一年是否为闰年就变成了查找这个数组某一个元素的值的问题。

第一种方法相比起第二种来说很明显非常节省空间，但每一次查询都需要经过一系列的计算才能知道是否为闰年。第二种方法虽然需要在内存里存储2050个元素的数组，但是每次查询只需要一次索引判断即可。

这就是通过一笔空间上的开销来换取计算时间开销的小技巧。到底哪一种方法好？其实还是要看你用在什么地方。

**定义：**算法的空间复杂度通过计算算法所需的存储空间实现，算法的空间复杂度的计算公式记作：S(n)=O(f(n))，其中，n为问题的规模，f(n)为语句关于n所占存储空间的函数。

通常，我们都是用“时间复杂度”来指运行时间的需求，是用“空间复杂度”指空间需求。
 当直接要让我们求“复杂度”时，通常指的是时间复杂度。
 显然对时间复杂度的追求更是属于算法的潮流！



## 参考文章
* https://www.jianshu.com/p/88a1c8ed6254