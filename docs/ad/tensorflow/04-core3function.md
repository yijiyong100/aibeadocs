---
title: TensorFlow-三大核心功能
---

::: tip
本文主要是介绍 TensorFlow-三大核心功能，因为核心功能的便捷性使得，TensorFlow的开发神经网络非常的非常的方便和迅速，同时也使得其生态迅速发展和完善 。
:::

[[toc]]

## Tensorflow三大核心功能

深度学习的核心是算法的设计思想，深度学习框架只是我们实现算法的工具。下面我来介绍一下三大核心功能

### 加速计算
神经网络本质上由大量的矩阵相乘、矩阵相加等基本数学运算构成，Tensorflow等重要功能就是利用GPU方便地实现并行计算加速功能。为了演示GPU的加速效果，我将通过完成多次矩阵A和矩阵B的矩阵相乘运算，并测量其平均运算时间来比对。其中矩阵A的shape为[1,n],矩阵B的shape为[n,1]，通过调节n即可控制矩阵的大小。

首先我们分别创建使用CPU和GPU环境运算的2个矩阵

```python
#创建在CPU环境上运算的2个矩阵
with tf.device('/cpu:0')
    cpu_a = tf.random.normal([1,n])
    cpu_b = tf.random.normal([n,1])
    print(cpu_a.device,cpu_b.device)
#创建使用GPU环境运算的2个矩阵
with tf.device('/gpu:0')
    gpu_a = tf.random.normal([1,n])
    gpu_b = tf.random.normal([n,1])
    print(gpu_a.device,gpu_b.device)
```

接下来实现CPU和GPU运算的函数，并通过timeit.timeit()函数来测量两个函数的运算时间。需要注意的是，第一次计算时一般需要完成额外的环境初始化工作，因此这段时间不能计算在内。我们通过热身环节将这段时间去除，再测量预算时间



```python
def cpu_run():
    with tf.device('/cpu:0')
        c = tf.matmul(cpu_a,cpu_b)
    return c

def gpu_run():
    with tf.device('/gpu:0')
        c = tf.matmul(gpu_a,gpu_b)
    return c

#第一次计算需要热身，避免将初始化时间结算在内
cpu_time = timeit.timeit(cpu_run,number=10)
gpu_time = timeit.timeit(gpu_run,number=10)
print('warmup:',cpu_time,gpu_time)
#正式计算10次，取平均时间
cpu_time = timeit.timeit(cpu_run(),number=10)
gpu_time = timeit.timeit(gpu_run(),number=10)
print('run time:',cpu_time,gpu_time)
```

我们将不同大小n下的cpu和gpu环境的运算时间绘制为曲线。

### 自动梯度
在使用Tensorflow构建前向计算过程的时候，除了能够获得数值结果，Tensorflow还会自动构建计算图，通过Tensorflow提供的自动求导的功能，可以不需要手动推导，即可计算输出对网络参数的偏导数。考虑如下表达式：

y = aw^2 + bw +c, 输出y对于变量w的导数关系为：dy/dw = 2aw+b，考虑在(a,b,c,w) = (1,2,3,4)处的导数，代入上面的式子可得：dy/dw = 2*1*4 + 2 = 10. 通过Tensorflow方式，可以不需要手动推导导数的表达式，直接给出函数的表达式，即可由Tensorflow自动求导

```python
import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2' #忽略CPU与tensorflow版本问题
import tensorflow as tf
#创建4个张量，并赋值
a = tf.constant(1.)
b = tf.constant(2.)
c = tf.constant(3.)
w = tf.constant(4.)

with tf.GradientTape()as tape:#构建梯度环境
    tape.watch([w])#将w加入梯度跟踪列表
#构建计算过程，即函数表达式
    y = a * w**2 + b * w +c
#自动求导
[dy_dw] = tape.gradient(y,[w])
print(dy_dw)
```

### 常用神经网络接口
TensorFlow 除了提供底层的矩阵相乘、相加等数学函数，还内建了常用神经网络运算 函数、常用网络层、网络训练、模型保存与加载、网络部署等一系列深度学习系统的便捷 功能。使用 TensorFlow 开发，可以方便地利用这些功能完成常用业务流程，高效稳定。

## 参考文章
* https://www.jianshu.com/p/b9292c614b0f