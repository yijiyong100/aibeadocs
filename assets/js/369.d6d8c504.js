(window.webpackJsonp=window.webpackJsonp||[]).push([[369],{884:function(t,a,s){"use strict";s.r(a);var v=s(53),e=Object(v.a)({},(function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("div",{staticClass:"custom-block tip"},[s("p",{staticClass:"custom-block-title"},[t._v("TIP")]),t._v(" "),s("p",[t._v("本文主要是介绍 版本管理-Git命令撤销更改 。")])]),t._v(" "),s("p"),s("div",{staticClass:"table-of-contents"},[s("ul",[s("li",[s("a",{attrs:{href:"#git的4个阶段的撤销更改"}},[t._v("Git的4个阶段的撤销更改")])]),s("li",[s("a",{attrs:{href:"#基本概念"}},[t._v("基本概念")])]),s("li",[s("a",{attrs:{href:"#_3个步骤"}},[t._v("3个步骤")])]),s("li",[s("a",{attrs:{href:"#_4个区"}},[t._v("4个区")])]),s("li",[s("a",{attrs:{href:"#_5种状态"}},[t._v("5种状态")])]),s("li",[s("a",{attrs:{href:"#已修改-未暂存"}},[t._v("已修改，未暂存")])]),s("li",[s("a",{attrs:{href:"#已暂存-未提交"}},[t._v("已暂存，未提交")])]),s("li",[s("a",{attrs:{href:"#已提交-未推送"}},[t._v("已提交，未推送")])]),s("li",[s("a",{attrs:{href:"#已修改-未暂存"}},[t._v("已修改，未暂存")])]),s("li",[s("a",{attrs:{href:"#已暂存-未提交"}},[t._v("已暂存，未提交")])]),s("li",[s("a",{attrs:{href:"#已提交-未推送"}},[t._v("已提交，未推送")])]),s("li",[s("a",{attrs:{href:"#已推送"}},[t._v("已推送")])]),s("li",[s("a",{attrs:{href:"#总结"}},[t._v("总结")])]),s("li",[s("a",{attrs:{href:"#参考文章"}},[t._v("参考文章")])])])]),s("p"),t._v(" "),s("h2",{attrs:{id:"git的4个阶段的撤销更改"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#git的4个阶段的撤销更改"}},[t._v("#")]),t._v(" Git的4个阶段的撤销更改")]),t._v(" "),s("p",[t._v("虽然"),s("code",[t._v("git")]),t._v("诞生距今已有"),s("code",[t._v("12")]),t._v("年之久，网上各种关于"),s("code",[t._v("git")]),t._v("的介绍文章数不胜数，但是依然有很多人（包括我自己在内）对于它的功能不能完全掌握。以下的介绍只是基于我个人对于"),s("code",[t._v("git")]),t._v("的理解，并且可能生编硬造了一些不完全符合"),s("code",[t._v("git")]),t._v("说法的词语。目的只是为了让"),s("code",[t._v("git")]),t._v("通俗化，使初学者也能大概了解如何快速上手"),s("code",[t._v("git")]),t._v("。同时，下面所有讨论，我们都假设只使用一个分支，也就是主分支"),s("code",[t._v("master")]),t._v("的情况，虽然这种作法并不符合"),s("code",[t._v("git")]),t._v("规范，但是现实情况中绝大部分用户是直接在"),s("code",[t._v("master")]),t._v("分支上进行工作的，所以在这里我们不去引入更加复杂的各种分支的情况，也不涉及标签"),s("code",[t._v("tag")]),t._v("的操作，只讲在最简单的主分支上如何回退。")]),t._v(" "),s("h2",{attrs:{id:"基本概念"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#基本概念"}},[t._v("#")]),t._v(" 基本概念")]),t._v(" "),s("h2",{attrs:{id:"_3个步骤"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_3个步骤"}},[t._v("#")]),t._v(" 3个步骤")]),t._v(" "),s("img",{staticClass:"zoom-custom-imgs",attrs:{src:t.$withBase("/assets/img/dev/tool/gitcancel-1.png"),alt:"wxmp"}}),t._v(" "),s("p",[t._v("正常情况下，我们的工作流就是"),s("code",[t._v("3")]),t._v("个步骤，对应上图中的"),s("code",[t._v("3")]),t._v("个箭头线：")]),t._v(" "),s("div",{staticClass:"language-shell extra-class"},[s("pre",{pre:!0,attrs:{class:"language-shell"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("add")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v(".")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" commit -m "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"comment"')]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" push\n")])])]),s("ol",[s("li",[s("code",[t._v("git add .")]),t._v("把所有文件放入"),s("code",[t._v("暂存区")]),t._v("；")]),t._v(" "),s("li",[s("code",[t._v("git commit")]),t._v("把所有文件从"),s("code",[t._v("暂存区")]),t._v("提交进"),s("code",[t._v("本地仓库")]),t._v("；")]),t._v(" "),s("li",[s("code",[t._v("git push")]),t._v("把所有文件从"),s("code",[t._v("本地仓库")]),t._v("推送进"),s("code",[t._v("远程仓库")]),t._v("。")])]),t._v(" "),s("h2",{attrs:{id:"_4个区"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_4个区"}},[t._v("#")]),t._v(" 4个区")]),t._v(" "),s("p",[s("code",[t._v("git")]),t._v("之所以令人费解，主要是它相比于"),s("code",[t._v("svn")]),t._v("等等传统的版本管理工具，多引入了一个"),s("strong",[t._v("暂存区")]),t._v("("),s("code",[t._v("Stage")]),t._v(")的概念，就因为多了这一个概念，而使很多人疑惑。其实，在初学者来说，每个区具体怎么工作的，我们完全不需要关心，而只要知道有这么"),s("code",[t._v("4")]),t._v("个区就够了：")]),t._v(" "),s("ul",[s("li",[t._v("工作区("),s("code",[t._v("Working Area")]),t._v(")")]),t._v(" "),s("li",[t._v("暂存区("),s("code",[t._v("Stage")]),t._v(")")]),t._v(" "),s("li",[t._v("本地仓库("),s("code",[t._v("Local Repository")]),t._v(")")]),t._v(" "),s("li",[t._v("远程仓库("),s("code",[t._v("Remote Repository")]),t._v(")")])]),t._v(" "),s("h2",{attrs:{id:"_5种状态"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_5种状态"}},[t._v("#")]),t._v(" 5种状态")]),t._v(" "),s("p",[t._v("以上"),s("code",[t._v("4")]),t._v("个区，进入每一个区成功之后会产生一个状态，再加上最初始的一个状态，一共是"),s("code",[t._v("5")]),t._v("种状态。以下我们把这"),s("code",[t._v("5")]),t._v("种状态分别命名为：")]),t._v(" "),s("ul",[s("li",[t._v("未修改("),s("code",[t._v("Origin")]),t._v(")")]),t._v(" "),s("li",[t._v("已修改("),s("code",[t._v("Modified")]),t._v(")")]),t._v(" "),s("li",[t._v("已暂存("),s("code",[t._v("Staged")]),t._v(")")]),t._v(" "),s("li",[t._v("已提交("),s("code",[t._v("Committed")]),t._v(")")]),t._v(" "),s("li",[t._v("已推送("),s("code",[t._v("Pushed")]),t._v(")")])]),t._v(" "),s("h1",{attrs:{id:"检查修改"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#检查修改"}},[t._v("#")]),t._v(" 检查修改")]),t._v(" "),s("p",[t._v("了解了基本概念之后，我们来谈一谈犯错误之后如何撤销的问题。首先，我们要了解如何检查这"),s("code",[t._v("3")]),t._v("个步骤当中每一个步骤修改了什么，然后才好判断有没有修改成功。检查修改的二级命令都相同，都是"),s("code",[t._v("diff")]),t._v("，只是参数有所不同。")]),t._v(" "),s("h2",{attrs:{id:"已修改-未暂存"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#已修改-未暂存"}},[t._v("#")]),t._v(" 已修改，未暂存")]),t._v(" "),s("div",{staticClass:"language-shell extra-class"},[s("pre",{pre:!0,attrs:{class:"language-shell"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("diff")]),t._v("\n")])])]),s("p",[t._v("首先，我们来看一下，如果我们只是简单地在浏览器里保存了一下文件，但是还没有做"),s("code",[t._v("git add .")]),t._v("之前，我们如何检查有哪些修改。我们先随便拿一个文件来做一下实验：")]),t._v(" "),s("img",{staticClass:"zoom-custom-imgs",attrs:{src:t.$withBase("/assets/img/dev/tool/gitcancel-2.png"),alt:"wxmp"}}),t._v(" "),s("p",[t._v("我们在文件开头的第"),s("code",[t._v("2")]),t._v("行胡乱加了"),s("code",[t._v("4")]),t._v("个数字"),s("code",[t._v("1234")]),t._v("，存盘，这时文件进入了"),s("code",[t._v("已修改")]),t._v("状态，但是还没有进入"),s("code",[t._v("暂存区")]),t._v("，我们运行"),s("code",[t._v("git diff")]),t._v("，结果如下：")]),t._v(" "),s("div",{staticClass:"language-shell extra-class"},[s("pre",{pre:!0,attrs:{class:"language-shell"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[t._v("diff")]),t._v(" --git a/index.md b/index.md\nindex 73ff1ba"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1066758")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("100644")]),t._v("\n--- a/index.md\n+++ b/index.md\n@@ -1,5 +1,5 @@\n ---\n-layout: main\n+1234layout: main\n color: black\n ---\n")])])]),s("p",[s("code",[t._v("git diff")]),t._v("的结果告诉我们哪些文件已经做了哪些修改。")]),t._v(" "),s("h2",{attrs:{id:"已暂存-未提交"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#已暂存-未提交"}},[t._v("#")]),t._v(" 已暂存，未提交")]),t._v(" "),s("div",{staticClass:"language-shell extra-class"},[s("pre",{pre:!0,attrs:{class:"language-shell"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("diff")]),t._v(" --cached\n")])])]),s("p",[t._v("现在我们把修改放入"),s("code",[t._v("暂存区")]),t._v("看一下。先执行"),s("code",[t._v("git add .")]),t._v("，然后执行"),s("code",[t._v("git diff")]),t._v("，你会发现没有任何结果：")]),t._v(" "),s("img",{staticClass:"zoom-custom-imgs",attrs:{src:t.$withBase("/assets/img/dev/tool/gitcancel-3.png"),alt:"wxmp"}}),t._v(" "),s("p",[t._v("这说明"),s("code",[t._v("git diff")]),t._v("这个命令只检查我们的"),s("code",[t._v("工作区")]),t._v("和"),s("code",[t._v("暂存区")]),t._v("之间的差异，如果我们想看到"),s("code",[t._v("暂存区")]),t._v("和"),s("code",[t._v("本地仓库")]),t._v("之间的差异，就需要加一个参数"),s("code",[t._v("git diff --cached")]),t._v("：")]),t._v(" "),s("div",{staticClass:"language-shell extra-class"},[s("pre",{pre:!0,attrs:{class:"language-shell"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[t._v("diff")]),t._v(" --git a/index.md b/index.md\nindex 73ff1ba"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("..")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1066758")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("100644")]),t._v("\n--- a/index.md\n+++ b/index.md\n@@ -1,5 +1,5 @@\n ---\n-layout: main\n+1234layout: main\n color: black\n ---\n")])])]),s("p",[t._v("这时候我们看到的差异是"),s("code",[t._v("暂存区")]),t._v("和"),s("code",[t._v("本地仓库")]),t._v("之间的差异。")]),t._v(" "),s("h2",{attrs:{id:"已提交-未推送"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#已提交-未推送"}},[t._v("#")]),t._v(" 已提交，未推送")]),t._v(" "),s("div",{staticClass:"language-shell extra-class"},[s("pre",{pre:!0,attrs:{class:"language-shell"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("diff")]),t._v(" master origin/master\n")])])]),s("p",[t._v("现在，我们把修改从"),s("code",[t._v("暂存区")]),t._v("提交到"),s("code",[t._v("本地仓库")]),t._v("，再看一下差异。先执行"),s("code",[t._v("git commit")]),t._v("，然后再执行"),s("code",[t._v("git diff --cached")]),t._v("，没有差异，执行"),s("code",[t._v("git diff master origin/master")]),t._v("，可以看到差异：")]),t._v(" "),s("img",{staticClass:"zoom-custom-imgs",attrs:{src:t.$withBase("/assets/img/dev/tool/gitcancel-4.png"),alt:"wxmp"}}),t._v(" "),s("p",[t._v("在这里，"),s("code",[t._v("master")]),t._v("就是你的"),s("code",[t._v("本地仓库")]),t._v("，而"),s("code",[t._v("origin/master")]),t._v("就是你的"),s("code",[t._v("远程仓库")]),t._v("，"),s("code",[t._v("master")]),t._v("是主分支的意思，因为我们都在主分支上工作，所以这里两边都是"),s("code",[t._v("master")]),t._v("，而"),s("code",[t._v("origin")]),t._v("就代表远程。")]),t._v(" "),s("h1",{attrs:{id:"撤销修改"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#撤销修改"}},[t._v("#")]),t._v(" 撤销修改")]),t._v(" "),s("p",[t._v("了解清楚如何检查各种修改之后，我们开始尝试各种撤销操作。")]),t._v(" "),s("h2",{attrs:{id:"已修改-未暂存-2"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#已修改-未暂存-2"}},[t._v("#")]),t._v(" 已修改，未暂存")]),t._v(" "),s("p",[t._v("如果我们只是在编辑器里修改了文件，但还没有执行"),s("code",[t._v("git add .")]),t._v("，这时候我们的文件还在"),s("code",[t._v("工作区")]),t._v("，并没有进入"),s("code",[t._v("暂存区")]),t._v("，我们可以用：")]),t._v(" "),s("div",{staticClass:"language-shell extra-class"},[s("pre",{pre:!0,attrs:{class:"language-shell"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" checkout "),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v(".")]),t._v("\n")])])]),s("p",[t._v("或者")]),t._v(" "),s("div",{staticClass:"language-shell extra-class"},[s("pre",{pre:!0,attrs:{class:"language-shell"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" reset --hard\n")])])]),s("p",[t._v("来进行撤销操作。")]),t._v(" "),s("img",{staticClass:"zoom-custom-imgs",attrs:{src:t.$withBase("/assets/img/dev/tool/gitcancel-5.png"),alt:"wxmp"}}),t._v(" "),s("p",[t._v("可以看到，在执行完"),s("code",[t._v("git checkout .")]),t._v("之后，修改已被撤销，"),s("code",[t._v("git diff")]),t._v("没有任何内容了。")]),t._v(" "),s("blockquote",[s("p",[s("strong",[t._v("一对反义词")]),t._v(" "),s("code",[t._v("git add .")]),t._v("的反义词是"),s("code",[t._v("git checkout .")]),t._v("。做完修改之后，如果你想向前走一步，让修改进入"),s("code",[t._v("暂存区")]),t._v("，就执行"),s("code",[t._v("git add .")]),t._v("，如果你想向后退一步，撤销刚才的修改，就执行"),s("code",[t._v("git checkout .")]),t._v("。")])]),t._v(" "),s("h2",{attrs:{id:"已暂存-未提交-2"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#已暂存-未提交-2"}},[t._v("#")]),t._v(" 已暂存，未提交")]),t._v(" "),s("p",[t._v("你已经执行了"),s("code",[t._v("git add .")]),t._v("，但还没有执行"),s("code",[t._v('git commit -m "comment"')]),t._v("。这时候你意识到了错误，想要撤销，你可以执行：")]),t._v(" "),s("div",{staticClass:"language-shell extra-class"},[s("pre",{pre:!0,attrs:{class:"language-shell"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" reset\n"),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" checkout "),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v(".")]),t._v("\n")])])]),s("p",[t._v("或者")]),t._v(" "),s("div",{staticClass:"language-shell extra-class"},[s("pre",{pre:!0,attrs:{class:"language-shell"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" reset --hard\n")])])]),s("p",[s("code",[t._v("git reset")]),t._v("只是把修改退回到了"),s("code",[t._v("git add .")]),t._v("之前的状态，也就是说文件本身还处于"),s("code",[t._v("已修改未暂存")]),t._v("状态，你如果想退回"),s("code",[t._v("未修改")]),t._v("状态，还需要执行"),s("code",[t._v("git checkout .")]),t._v("。")]),t._v(" "),s("p",[t._v("或许你已经注意到了，以上两个步骤都可以用同一个命令"),s("code",[t._v("git reset --hard")]),t._v("来完成。是的，就是这个强大的命令，可以一步到位地把你的修改完全恢复到"),s("code",[t._v("未修改")]),t._v("的状态。")]),t._v(" "),s("h2",{attrs:{id:"已提交-未推送-2"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#已提交-未推送-2"}},[t._v("#")]),t._v(" 已提交，未推送")]),t._v(" "),s("p",[t._v("你的手太快，你既执行了"),s("code",[t._v("git add .")]),t._v("，又执行了"),s("code",[t._v("git commit")]),t._v("，这时候你的代码已经进入了你的"),s("code",[t._v("本地仓库")]),t._v("，然而你后悔了，怎么办？不要着急，还有办法。")]),t._v(" "),s("div",{staticClass:"language-shell extra-class"},[s("pre",{pre:!0,attrs:{class:"language-shell"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" reset --hard origin/master\n")])])]),s("p",[t._v("还是这个"),s("code",[t._v("git reset --hard")]),t._v("命令，只不过这次多了一个参数"),s("code",[t._v("origin/master")]),t._v("，正如我们上面讲过的，"),s("code",[t._v("origin/master")]),t._v("代表"),s("code",[t._v("远程仓库")]),t._v("，既然你已经污染了你的"),s("code",[t._v("本地仓库")]),t._v("，那么就从"),s("code",[t._v("远程仓库")]),t._v("把代码取回来吧。")]),t._v(" "),s("h2",{attrs:{id:"已推送"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#已推送"}},[t._v("#")]),t._v(" 已推送")]),t._v(" "),s("p",[t._v("很不幸，你的手实在是太快了，你既"),s("code",[t._v("git add")]),t._v("了，又"),s("code",[t._v("git commit")]),t._v("了，并且还"),s("code",[t._v("git push")]),t._v("了，这时你的代码已经进入"),s("code",[t._v("远程仓库")]),t._v("。如果你想恢复的话，还好，由于你的"),s("code",[t._v("本地仓库")]),t._v("和"),s("code",[t._v("远程仓库")]),t._v("是等价的，你只需要先恢复"),s("code",[t._v("本地仓库")]),t._v("，再强制"),s("code",[t._v("push")]),t._v("到"),s("code",[t._v("远程仓库")]),t._v("就好了：")]),t._v(" "),s("div",{staticClass:"language-shell extra-class"},[s("pre",{pre:!0,attrs:{class:"language-shell"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" reset --hard HEAD^\n"),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" push -f\n")])])]),s("img",{staticClass:"zoom-custom-imgs",attrs:{src:t.$withBase("/assets/img/dev/tool/gitcancel-6.png"),alt:"wxmp"}}),t._v(" "),s("h2",{attrs:{id:"总结"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#总结"}},[t._v("#")]),t._v(" 总结")]),t._v(" "),s("p",[t._v("以上"),s("code",[t._v("4")]),t._v("种状态的撤销我们都用到了同一个命令"),s("code",[t._v("git reset --hard")]),t._v("，前"),s("code",[t._v("2")]),t._v("种状态的用法甚至完全一样，所以只要掌握了"),s("code",[t._v("git reset --hard")]),t._v("这个命令的用法，从此你再也不用担心提交错误了。")]),t._v(" "),s("h2",{attrs:{id:"参考文章"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#参考文章"}},[t._v("#")]),t._v(" 参考文章")]),t._v(" "),s("ul",[s("li",[t._v("https://segmentfault.com/a/1190000011969554")])])])}),[],!1,null,null,null);a.default=e.exports}}]);