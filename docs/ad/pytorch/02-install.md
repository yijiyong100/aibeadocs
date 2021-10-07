---
title: Pytorch-安装过程详解
---

::: tip
本文主要是介绍 Pytorch-安装过程详解 。
:::

[[toc]]

## Win10+Anaconda环境下安装Pytorch


## 1.安装说明

*本教程使用Anaconda建立Pytorch虚拟环境来安装Pytorch。*

**为什么要使用Anaconda虚拟环境安装Pytorch？**

- 因为环境中通常需要安装很多软件，例如：我同时在使用tensorflow框架。但是他们所需要的Python的关联模块或版本会有所差异。如果都装在一个环境中难免会引起冲突。所以，选择虚拟环境能很好地避免环境之间的冲突。

## 2.安装步骤

### （1）打开Anaconda Prompt

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ad/pytorch/install1-1.png')" alt="wxmp">

打开Anaconda Prompt

### （2）建立并切换到工作目录



```python
md \pythonwork
cd \pythonwork
```

- 后续Jupyter Notebook读取与存盘都会在此工作目录。

### （3）建立Pytorch Anaconda虚拟环境



```python
conda create --name pytorch python=3.6 anaconda
```

- 其中加入最后一项anaconda命令建立虚拟环境时，会同时安装例如Notebook、Numpy、Scipy、Matplotlib、Pandas等数据分析包，用户也可以不加，选择后续安装。

### （4）启动Pytorch Anaconda虚拟环境



```python
activate pytorch
```

### （5）安装Pytorch



```python
conda install pytorch torchvision cudatoolkit=9.0 -c pytorch
```

- 详情参见[Pytorch官网](https://links.jianshu.com/go?to=https%3A%2F%2Fpytorch.org%2F)。

- 具体命令根据你的环境选择。（我安装的CUDA9.0与Python3.6）

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ad/pytorch/install1-2.png')" alt="wxmp">

Pytorch官网

- 也可以采用其他方法安装：Pip、LibTorch、Source。（见上图自行选择）

### （6）测试

- 命令行输入`python`进入python，并输入下面代码：



```python
import torch
import torchvision
print(torch.__version__)
```

- 成功打印，测试成功，使用`exit()`退出python。

### （7）关闭Pytorch Anaconda虚拟环境



```python
conda deactivate
```

## 3.备注

- 到此就安装完成，同学们现在可以愉快地进行机器学习项目学习与开发了。（github上有无数开源代码，可以对感兴趣的项目直接进行搜索，然后对项目clone（需安装git）或直接download，也可以fork到自己的仓库（然后使用git pull到本地），当自己脑子短路或者什么的上去找找灵感吧）
- 在跑别人的项目时如果遇到相应module缺失的情况，打开Pytorch Anaconda虚拟环境用conda或pip安装即可解决。（建议优先使用conda，conda会分析依赖包，会将依赖包一同安装）
- 如果需要使用本虚拟环境在Notebook中跑项目，进入工作目录激活虚拟环境，输入Jupyter Notebook运行即可。
- 如果需要使用本虚拟环境在Pycharm进行项目开发，将设置里的Project Interpreter改为相应Anaconda文件目录下的Pytorch虚拟环境中的python.exe文件即可。(如：D:\Anaconda3\envs\pytorch\python.exe）
- **本教程为本人学习总结，希望对同样在入门学习中的你有所帮助**。

## 【----------------------------】


## PyTorch环境配置及安装

## 环境配置

------

**温馨提示：为了更好的教程体验，提供视频、阅读地址**

Youtube: https://www.youtube.com/playlist?list=PLgAyVnrNJ96CqYdjZ8v9YjQvCBcK5PZ-V

BiliBili: https://www.bilibili.com/video/av74281036/

Github: https://github.com/xiaotudui/PyTorch-Tutorial

相关下载：https://pan.baidu.com/s/16koDDDvAFO7rNoi-uR-A_g 提取码：pahi

在学习中，遇到任何问题，可以关注公众号：土堆碎念，直接在对话框中留言，我会不定时解答的~

**公众号：土堆碎念，回复：pytorch，即可获得所有的数据集及安装包，** 省去找软件、数据集的时间。（同步更新中，请勿急躁）

------

### 0. 前言

在计算机领域学习，最烦的一件事，就是安装软件，环境配置。而且，恰恰不如意的是，它还是你学习进程的第一关。第一关就出现大Boss。这样，超级容易打击学习的动力。

所以，在我看来，入门的话，一定要快，要不求甚解，先把握整体。所以，我的教程**安排顺序**和**一些方法**，不同于其他千篇一律的教程，其中也许有自己的想法。

如果你在学习中，有什么建议，或者遇到什么问题，可以关注公众号：土堆碎念，直接留言，私信我。

### 1. Anaconda 下载

在机器学习，深度学习中，要用到大量的 package（就是各种工具包）。如果说，函数是一个工具，那么 package 就是一个工具包。一个个安装 package 很麻烦，而且容易出现疏漏。于是，就有了 Anaconda，这是一个集成了常用于科学分析（机器学习，深度学习）的大量package。

**也就是说，你只要安装了 Anaconda，就安装了很多我们之后要用的许多packages。**（他还有很多功能，对入门帮助超大，后面再说）

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ad/pytorch/install/5dbac559bd461d945a86663a.png')" alt="wxmp">

Anaconda 的下载地址：[这儿](https://www.anaconda.com/distribution/)（目前，页面上是 Python3.7 的版本，我用的是3.6版本，**推荐3.6版本**）

之前使用过3.7版本，也许会遇到一些问题。

**推荐：** Anaconda历史版本链接：[这儿](https://repo.continuum.io/archive/)，选择这个版本： Anaconda 3-5.2.0

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ad/pytorch/install/5dbac43cbd461d945a86368a.png')" alt="wxmp">

### 2. Anaconda 安装

双击进行安装，需要注意以下几点：

**（1）记住安装路径，之后会用到**

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ad/pytorch/install/5dbac5cebd461d945a86794f.png')" alt="wxmp">

**（2）跳过安装 Microsoft VSCode**

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ad/pytorch/install/5dbac679bd461d945a868bad.png')" alt="wxmp">

为了检验是否安装成功，在开始菜单出，**左击 Anaconda Prompt**

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ad/pytorch/install/5dbac6c4bd461d945a8693d1.png')" alt="wxmp">

如果可以成功打开，且左边有 (base)，即安装成功。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ad/pytorch/install/5dbac72ebd461d945a869f93.png')" alt="wxmp">

### 3. 显卡配置（无 Nvidia 显卡的略过）

只要你打开任务管理器，在 GPU 那里看到了你的 NVIDIA 显卡，即可。说明你的硬件驱动，已安装。

如果你的 NVIDIA 显卡未显示，可以使用驱动人生，或者去[官网](https://www.nvidia.cn/Download/index.aspx?lang=cn)下载驱动。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ad/pytorch/install/5dbac97dbd461d945a86c899.png')" alt="wxmp">

### 4. 有序的管理环境

也许，你之后会遇到不同的项目，需要使用到不同版本的环境。比如这个项目要用到 pytorch 0.4，另一个项目要用到 pytorch 1.0，如果你卸载了0.4版本，安装了1.0版本。那么下一次，你再碰到0.4版本，你就需要卸载1.0版本，安装0.4版本。很折腾。

Anaconda 集成的 conda 包就能够解决这个问题。它可以创造出两个屋子，相互隔离。一个屋子放 0.4 版本，一个屋子放 1.0 版本。你需要哪个版本，就进哪个屋子工作。

我们首先使用 conda 指令创建一个屋子，叫做 pytorch。

指令如下：

```python
conda create -n pytorch python=3.6
```

conda 是指调用 conda 包，create 是创建的意思，-n 是指后面的名字是屋子的名字， pytorch是屋子的名字（可以更改成自己喜欢的），python=3.6 是指创建的屋子，是 python3.6 版本。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ad/pytorch/install/5dbacec6bd461d945a87395f.png')" alt="wxmp">

之后，弹出提示，输入 y，即可安装。

安装成功后，输入以下指令：

```python
conda info --envs
```

即可看到 conda 环境中，有新建的 pytorch 环境，右边的 * 号表示，当前你处于哪个环境。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ad/pytorch/install/5dbad001bd461d945a87470c.png')" alt="wxmp">

接下来，我们要在 pytorch 环境中，安装 PyTorch，（有点绕），使用如下指令，进入 pytorch 环境。

```python
conda activate pytorch
```

你可以看到左边的 base 变成了 pytorch，代表成功进入 pytorch 环境。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ad/pytorch/install/5dbad08ebd461d945a874e96.png')" alt="wxmp">

### 5. 安装 PyTorch 准备

终于到重头戏了，安装 PyTorch了。激动的打开[官网](https://pytorch.org/)，下拉到下面的页面。

（不得不说，PyTorch 在这方面做的真的好，不需要再人工安装 CUDA、cuDNN 之类的，全部都给你解决了。真的良心~以前安装真的繁琐。（吐槽一句，以前超麻烦的）

PyTorch Build 选择 Stable；选择系统；Package，Windows下推荐 conda，Linux 下推荐 pip；Python版本按照Anaconda的版本选择，我这里选择3.6，CUDA 推荐9.2。如果没有显卡的话，选择 None。我的选择如图所示：

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ad/pytorch/install/5dbacbfabd461d945a86e9cb.png')" alt="wxmp">

复制下面的代码，之后，在开始菜单中，打开 Anaconda Prompt，查看最左边括号中是 base 还是 pytorch。

如果是 base，使用 `conda activate pytorch` 进入 pytorch 环境中。之后粘贴即可。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ad/pytorch/install/5dbad0d2bd461d945a875203.png')" alt="wxmp">

果断输入y，之后就是漫长的等待。或者去休息吧，慢慢等着。看看剧啥的，等着它慢慢下吧。如果你的并不慢，恭喜恭喜。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ad/pytorch/install/5dbc38a5bd461d945adee566.png')" alt="wxmp">

### 6. 加速（可选）

有的时候，下载速度太慢了，可以利用我已经下载好的文件。

```shell
链接：https://pan.baidu.com/s/1cyEjHdluc4ufCkvtbgziqA 
提取码：bzfx 
复制这段内容后打开百度网盘手机App，操作更方便哦
```

将其中的 `pytorch-1.3.0-py3.6_cuda92_cudnn7_0.tar` 和 `cudatoolkit-9.2-0.tar`两个文件，复制到刚才 Anaconda 安装的目录下的 pkgs 文件夹中。

这两个文件，只能安装 pytorch1.3.0 和 cuda 9.2，仅限Windows。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ad/pytorch/install/5dbc4488bd461d945adfb217.png')" alt="wxmp">

之后，在 Anaconda Prompt 命令行窗口，多按几次 `Ctrl + C` 结束程序。然后，重新复制 PyTorch 安装命令，粘贴到命令行上，进行安装。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ad/pytorch/install/5dbacbfabd461d945a86e9cb.png')" alt="wxmp">

### 7. 验证是否安装成功

（1）在命令行左边为 pytorch 环境中，输入 python

（2）之后，输入 `import torch`，如果没有报错，意味着 PyTorch 已经顺利安装了

（3）接下来，输入 `torch.cuda.is_available`，如果是 True，意味着你可以使用 GPU，如果是 False，意味着只能使用CPU。

<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/ad/pytorch/install/5dbc45aabd461d945adfbf75.png')" alt="wxmp">

------

## 参考文章
* https://www.jianshu.com/p/ee08ca2c1160
* https://www.cnblogs.com/zhouzhiyao/p/11784055.html