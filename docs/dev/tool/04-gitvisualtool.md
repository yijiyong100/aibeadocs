---
title: 版本管理-Git可视化工具
---

::: tip
本文主要是介绍 版本管理-Git可视化工具 。
:::

[[toc]]

## 几款常用的Git 图形化工具

作为一名开发人员，你不可能不知道git，无论你是开发自己的开源项目还是和团队一起进行大规模产品的开发，git都已经是源代码管理工具的首选。当然，那些hardcore developer会说，command line才是最好的工具，但并不是所有的时候command line都是高效的（不服？在command line里面做个compare试试你就知道了）。小编日常用的最多的也是command line，但是总还是会把几个好用的GUI Git客户端放在手边备着。

## 独立客户端工具

### GitHub for Desktop



全球开发人员交友俱乐部提供的强大工具，功能完善，使用方便。对于使用GitHub的开发人员来说是非常便捷的工具。界面干净，用起来非常顺手，上面的这条timeline非常漂亮，也可以直接提交PR。



<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dev/tool/gitvisual/20170427113512698.png')" alt="wxmp">



唯一让我失望的是GitHub for Desktop不带三方合并工具，你必须自己手动解决冲突才可以。



– 免费
– 同时支持 Windows 和 Mac：对于需要经常在不同的操作系统间切换的开发人员来说非常方便。
– 漂亮的界面：作为每天盯着看的工具，颜值是非常重要的
– 支持Pull Request：直接从客户端提交PR，很方便
– Timeline 支持：直接在时间线上显示每次提交的时间点和大小
– 支持git LFS：存储大文件更加节省空间和高效
– 不支持三方合并：需要借助第三方工具才行



### Source Tree



SourceTree是老牌的Git GUI管理工具了，也号称是最好用的Git GUI工具。我的体验是确实强大，功能丰富，基本操作和高级操作都设计得非常流畅，适合初学者上手。



<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dev/tool/gitvisual/20170427113315775.png')" alt="wxmp">



这个工具很有特色的一个功能就是支持Git Flow，你可以一键创建Git Flow的工作流。Git Flow是非常高效的团队协作模型和流程，Git的一大特色就是灵活轻量的分支，但如何在自己的团队中用好这个功能来匹配自己的研发流程是个问题。内置Git Flow让那些不太熟悉的开发人员也可以很快上手，并且将研发的业务流程固化在工具中，可以说是非常贴心的设计。



<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dev/tool/gitvisual/20170427113348541.png')" alt="wxmp">



在 Windows 环境下，SourceTree是多语言的，但是不知道为什么我的Mac版总是显示英文。



<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dev/tool/gitvisual/20170427113411619.png')" alt="wxmp">



– 免费
– 功能强大：无论你是新手还是重度用户，SourceTree 都会让你觉得很顺手。对于非常重度用户，Source Tree还支持自定义脚本的执行。
– 同时支持 Windows 和 Mac 操作系统
– 同时支持 Git 和 Mercurial 两种 VCS
– 内置GitHub, BitBucket 和 Stash 的支持：直接绑定帐号即可操作远程repo



### TortoiseGit



对这只小乌龟估计没有开发人员会不认识，SVN的超广泛使用也使得这个超好用的Svn客户端成了几乎每个开发人员的桌面必备软件。小乌龟只提供Windows版本，提供中文版支持的，对于中国的开发者来说者绝对是福音。



<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dev/tool/gitvisual/20170427113417025.png')" alt="wxmp">



小乌龟的文件管理器右键菜单的操作方式对于新手来说非常的容易上手，而且容易理解。



<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dev/tool/gitvisual/20170427113422260.png')" alt="wxmp">



– 免费
– 只支持Windows操作系统：与文件管理器的良好集成
– 中文界面
– 与TortoiseSVN一脉相承的操作体验



## IDE集成的Git客户端



对于使用IDE进行开发的程序员来说，可以不离开常用的IDE就直接操作源代码管理系统是最好的选择，以下是我对几个常见的IDE集成的git客户端的一点体验。



### Xcode



苹果的移动端应用体验没得说，但是桌面软件的体验就只能呵呵了。对于XCode里面的Git客户端来说，我只能说：够用！



<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dev/tool/gitvisual/20170427113427932.png')" alt="wxmp">



这个history的列表也是够简单的了。



### Eclipse – Egit



作为Java集成开发环境的代表，Eclipse内置了egit这个插件来提供git的集成支持。实话实说，这个插件的功能非常丰富，无论是普通的clone, commit, pull/push操作；还是复杂一些的git flow都有支持。除了颜值差点，其它都还好。



<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dev/tool/gitvisual/20170427113434135.png')" alt="wxmp">



### Visual Studio – Git Integration & GitHub Extension



Visual Studio 作为全宇宙最强IDE的名声已经在外，自从2013版本以来一直在针对Git的支持进行改进。如果配合社区版使用的话，也是完全免费的。对于使用Windows作为开发环境的程序员来说，VS里面的Git支持已经相当的完善。



直接克隆github上的repo



<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dev/tool/gitvisual/20170427113443620.png')" alt="wxmp">



分支和历史记录视图



<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dev/tool/gitvisual/20170427113449291.png')" alt="wxmp">



CodeLens 集成，可以直接在方法级别上查看git历史



<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dev/tool/gitvisual/20170427113455917.png')" alt="wxmp">



### Visual Studio Code



严格来说，Vscode不能算是IDE，只能算上代码编辑器而已，但是随着vscode上面插件的增加以及对于debugging的良好支持，vscode已经狠接近IDE的使用体验了。另外，vscode可以支持Windows, Mac和Linux操作系统，所以对于不同环境的开发人员来说都非常实用。



<img class= "zoom-custom-imgs" :src="$withBase('/assets/img/dev/tool/gitvisual/20170427113502729.png')" alt="wxmp">



总的来说，我最喜欢的是Source Tree 和 VS里面的Git支持，主要原因还是用的多，顺手。其实工具的选择更多的是个人喜好，再难用的工具，只要基本功能满足，天天用，用惯了也不会愿意更换其他的工具。以上的只是一点个人体验，希望对于刚入行的新程序员或者开始接触git的朋友们能够有些帮助。

## 参考文章
* https://blog.csdn.net/weixin_37887248/article/details/81011364