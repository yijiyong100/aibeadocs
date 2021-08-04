---
title: 版本管理-Git命令总结
---

::: tip
本文主要是介绍 版本管理-Git命令总结 。
:::

[[toc]]

## Git常用命令总结

### git init
在本地新建一个repo,进入一个项目目录,执行git init,会初始化一个repo,并在当前文件夹下创建一个.git文件夹.



### git clone
获取一个url对应的远程Git repo, 创建一个local copy.
一般的格式是git clone [url].
clone下来的repo会以url最后一个斜线后面的名称命名,创建一个文件夹,如果想要指定特定的名称,可以git clone [url] newname指定.



### git status
查询repo的状态.
git status -s: -s表示short, -s的输出标记会有两列,第一列是对staging区域而言,第二列是对working目录而言.



### git log
show commit history of a branch.
git log --oneline --number: 每条log只显示一行,显示number条.
git log --oneline --graph:可以图形化地表示出分支合并历史.
git log branchname可以显示特定分支的log.
git log --oneline branch1 ^branch2,可以查看在分支1,却不在分支2中的提交.^表示排除这个分支(Window下可能要给^branch2加上引号).
git log --decorate会显示出tag信息.
git log --author=[author name] 可以指定作者的提交历史.
git log --since --before --until --after 根据提交时间筛选log.
--no-merges可以将merge的commits排除在外.
git log --grep 根据commit信息过滤log: git log --grep=keywords
默认情况下, git log --grep --author是OR的关系,即满足一条即被返回,如果你想让它们是AND的关系,可以加上--all-match的option.
git log -S: filter by introduced diff.
比如: git log -SmethodName (注意S和后面的词之间没有等号分隔).
git log -p: show patch introduced at each commit.
每一个提交都是一个快照(snapshot),Git会把每次提交的diff计算出来,作为一个patch显示给你看.
另一种方法是git show [SHA].
git log --stat: show diffstat of changes introduced at each commit.
同样是用来看改动的相对信息的,--stat比-p的输出更简单一些.

  

### git add
在提交之前,Git有一个暂存区(staging area),可以放入新添加的文件或者加入新的改动. commit时提交的改动是上一次加入到staging area中的改动,而不是我们disk上的改动.
git add .
会递归地添加当前工作目录中的所有文件.



### git diff
不加参数的git diff:
show diff of unstaged changes.
此命令比较的是工作目录中当前文件和暂存区域快照之间的差异,也就是修改之后还没有暂存起来的变化内容.


若要看已经暂存起来的文件和上次提交时的快照之间的差异,可以用:
git diff --cached 命令.
show diff of staged changes.
(Git 1.6.1 及更高版本还允许使用 git diff --staged，效果是相同的).


git diff HEAD
show diff of all staged or unstated changes.
也即比较woking directory和上次提交之间所有的改动.


如果想看自从某个版本之后都改动了什么,可以用:
git diff [version tag]
跟log命令一样,diff也可以加上--stat参数来简化输出.


git diff [branchA] [branchB]可以用来比较两个分支.
它实际上会返回一个由A到B的patch,不是我们想要的结果.
一般我们想要的结果是两个分支分开以后各自的改动都是什么,是由命令:
git diff [branchA]…[branchB]给出的.
实际上它是:git diff $(git merge-base [branchA] [branchB]) [branchB]的结果.





### git commit
提交已经被add进来的改动.
git commit -m “the commit message"
git commit -a 会先把所有已经track的文件的改动add进来,然后提交(有点像svn的一次提交,不用先暂存). 对于没有track的文件,还是需要git add一下.
git commit --amend 增补提交. 会使用与当前提交节点相同的父节点进行一次新的提交,旧的提交将会被取消.



### git reset
undo changes and commits.
这里的HEAD关键字指的是当前分支最末梢最新的一个提交.也就是版本库中该分支上的最新版本.
git reset HEAD: unstage files from index and reset pointer to HEAD
这个命令用来把不小心add进去的文件从staged状态取出来,可以单独针对某一个文件操作: git reset HEAD - - filename, 这个- - 也可以不加.
git reset --soft
move HEAD to specific commit reference, index and staging are untouched.
git reset --hard
unstage files AND undo any changes in the working directory since last commit.
使用git reset —hard HEAD进行reset,即上次提交之后,所有staged的改动和工作目录的改动都会消失,还原到上次提交的状态.
这里的HEAD可以被写成任何一次提交的SHA-1.
不带soft和hard参数的git reset,实际上带的是默认参数mixed.


``` shell
总结:
git reset --mixed id,是将git的HEAD变了(也就是提交记录变了),但文件并没有改变，(也就是working tree并没有改变). 取消了commit和add的内容.
git reset --soft id. 实际上，是git reset –mixed id 后,又做了一次git add.即取消了commit的内容.
git reset --hard id.是将git的HEAD变了,文件也变了.
按改动范围排序如下:
soft (commit) < mixed (commit + add) < hard (commit + add + local working)
```


### git revert
反转撤销提交.只要把出错的提交(commit)的名字(reference)作为参数传给命令就可以了.
git revert HEAD: 撤销最近的一个提交.
git revert会创建一个反向的新提交,可以通过参数-n来告诉Git先不要提交.

  

### git rm
git rm file: 从staging区移除文件,同时也移除出工作目录.
git rm --cached: 从staging区移除文件,但留在工作目录中.
git rm --cached从功能上等同于git reset HEAD,清除了缓存区,但不动工作目录树.



### git clean
git clean是从工作目录中移除没有track的文件.
通常的参数是git clean -df:
-d表示同时移除目录,-f表示force,因为在git的配置文件中, clean.requireForce=true,如果不加-f,clean将会拒绝执行.



### git mv
git rm - - cached orig; mv orig new; git add new



### git stash
把当前的改动压入一个栈.
git stash将会把当前目录和index中的所有改动(但不包括未track的文件)压入一个栈,然后留给你一个clean的工作状态,即处于上一次最新提交处.
git stash list会显示这个栈的list.
git stash apply:取出stash中的上一个项目(stash@{0}),并且应用于当前的工作目录.
也可以指定别的项目,比如git stash apply stash@{1}.
如果你在应用stash中项目的同时想要删除它,可以用git stash pop


删除stash中的项目:
git stash drop: 删除上一个,也可指定参数删除指定的一个项目.
git stash clear: 删除所有项目.



### git branch
git branch可以用来列出分支,创建分支和删除分支.
git branch -v可以看见每一个分支的最后一次提交.
git branch: 列出本地所有分支,当前分支会被星号标示出.
git branch (branchname): 创建一个新的分支(当你用这种方式创建分支的时候,分支是基于你的上一次提交建立的). 
git branch -d (branchname): 删除一个分支.
删除remote的分支:
git push (remote-name) :(branch-name): delete a remote branch.
这个是因为完整的命令形式是:
git push remote-name local-branch:remote-branch
而这里local-branch的部分为空,就意味着删除了remote-branch



### git checkout

　　git checkout (branchname)





 切换到一个分支.

git checkout -b (branchname): 创建并切换到新的分支.
这个命令是将git branch newbranch和git checkout newbranch合在一起的结果.
checkout还有另一个作用:替换本地改动:
```
git checkout --<filename>
此命令会使用HEAD中的最新内容替换掉你的工作目录中的文件.已添加到暂存区的改动以及新文件都不会受到影响.
注意:git checkout filename会删除该文件中所有没有暂存和提交的改动,这个操作是不可逆的.
```


### git merge
把一个分支merge进当前的分支.
git merge [alias]/[branch]
把远程分支merge到当前分支.


如果出现冲突,需要手动修改,可以用git mergetool.
解决冲突的时候可以用到git diff,解决完之后用git add添加,即表示冲突已经被resolved.



### git tag
tag a point in history as import.
会在一个提交上建立永久性的书签,通常是发布一个release版本或者ship了什么东西之后加tag.
比如: git tag v1.0
git tag -a v1.0, -a参数会允许你添加一些信息,即make an annotated tag.
当你运行git tag -a命令的时候,Git会打开一个编辑器让你输入tag信息.

我们可以利用commit SHA来给一个过去的提交打tag:
git tag -a v0.9 XXXX


push的时候是不包含tag的,如果想包含,可以在push时加上--tags参数.
fetch的时候,branch HEAD可以reach的tags是自动被fetch下来的, tags that aren’t reachable from branch heads will be skipped.如果想确保所有的tags都被包含进来,需要加上--tags选项.



### git remote
list, add and delete remote repository aliases.
因为不需要每次都用完整的url,所以Git为每一个remote repo的url都建立一个别名,然后用git remote来管理这个list.
git remote: 列出remote aliases.
如果你clone一个project,Git会自动将原来的url添加进来,别名就叫做:origin.
git remote -v:可以看见每一个别名对应的实际url.
git remote add [alias] [url]: 添加一个新的remote repo.
git remote rm [alias]: 删除一个存在的remote alias.
git remote rename [old-alias] [new-alias]: 重命名.
git remote set-url [alias] [url]:更新url. 可以加上—push和fetch参数,为同一个别名set不同的存取地址.



### git fetch
download new branches and data from a remote repository.
可以git fetch [alias]取某一个远程repo,也可以git fetch --all取到全部repo
fetch将会取到所有你本地没有的数据,所有取下来的分支可以被叫做remote branches,它们和本地分支一样(可以看diff,log等,也可以merge到其他分支),但是Git不允许你checkout到它们. 



### git pull
fetch from a remote repo and try to merge into the current branch.
pull == fetch + merge FETCH_HEAD
git pull会首先执行git fetch,然后执行git merge,把取来的分支的head merge到当前分支.这个merge操作会产生一个新的commit.  
如果使用--rebase参数,它会执行git rebase来取代原来的git merge.





### git rebase
--rebase不会产生合并的提交,它会将本地的所有提交临时保存为补丁(patch),放在”.git/rebase”目录中,然后将当前分支更新到最新的分支尖端,最后把保存的补丁应用到分支上.
rebase的过程中,也许会出现冲突,Git会停止rebase并让你解决冲突,在解决完冲突之后,用git add去更新这些内容,然后无需执行commit,只需要:
git rebase --continue就会继续打余下的补丁.
git rebase --abort将会终止rebase,当前分支将会回到rebase之前的状态.



### git push
push your new branches and data to a remote repository.
git push [alias] [branch]
将会把当前分支merge到alias上的[branch]分支.如果分支已经存在,将会更新,如果不存在,将会添加这个分支.
如果有多个人向同一个remote repo push代码, Git会首先在你试图push的分支上运行git log,检查它的历史中是否能看到server上的branch现在的tip,如果本地历史中不能看到server的tip,说明本地的代码不是最新的,Git会拒绝你的push,让你先fetch,merge,之后再push,这样就保证了所有人的改动都会被考虑进来.



### git reflog
git reflog是对reflog进行管理的命令,reflog是git用来记录引用变化的一种机制,比如记录分支的变化或者是HEAD引用的变化.
当git reflog不指定引用的时候,默认列出HEAD的reflog.
HEAD@{0}代表HEAD当前的值,HEAD@{3}代表HEAD在3次变化之前的值.
git会将变化记录到HEAD对应的reflog文件中,其路径为.git/logs/HEAD, 分支的reflog文件都放在.git/logs/refs目录下的子目录中.





### 特殊符号:
```
^代表父提交,当一个提交有多个父提交时,可以通过在^后面跟上一个数字,表示第几个父提交: ^相当于^1.
~<n>相当于连续的<n>个^.
```
### 【----------------------------】

## Git的常用撤销技巧与解决冲突方法

``` shell
git checkout .`` ``#本地所有修改的。没有的提交的，都返回到原来的状态
git stash ``#把所有没有提交的修改暂存到stash里面。可用git stash pop回复。
git reset --hard HASH ``#返回到某个节点，不保留修改。
git reset --soft HASH ``#返回到某个节点。保留修改
```

## 撤销Git add 操作

 
``` shell
1. git reset HEAD <file>  # 取消add操作并保留修改  
2. git checkout -- <file> # 若继续该命令，则会删除掉刚刚的修改内容  
```

## 撤销Git commit操作
```
1. git reset --soft <commit_id>  #可以回退到某个commit并保存之前的修改 <commit_id>从git log中取，取前7位即可  
2. git reset --hard <commit_id>  #回退到某个commit不保留之前的修改  
```

## 撤销Git push操作

```
1. git revert <commit_id>  

原理: git revert 会产生一个新的 commit，它和指定 SHA 对应的 commit 是相反的（或者说是反转的）。 任何从原先的 commit 里删除的内容会在新的 commit 里被加回去，任何在原先的 commit 里加入的内容会在新的 commit 里被删除。这是 Git 最安全、最基本的撤销场景，因为它并不会改变历史 — 所以你现在可以 git push 新的“反转” commit 来抵消你错误提交的 commit。
```
 


### Git:代码冲突常见解决方法


如果系统中有一些配置文件在服务器上做了配置修改,然后后续开发又新添加一些配置项的时候,
在发布这个配置文件的时候,会发生代码冲突:
error: Your local changes to the following files would be overwritten by merge:
protected/config/main.php
Please, commit your changes or stash them before you can merge.

如果希望保留生产服务器上所做的改动,仅仅并入新配置项, 处理方法如下:
**git stash**
**git pull**
**git stash pop**
然后可以使用Git diff -w +文件名 来确认代码自动合并的情况.


反过来,如果希望用代码库中的文件完全覆盖本地工作版本. 方法如下:
**git reset --hard**
**git pull**



### 【----------------------------】
# [Git使用记录：Git各种撤销操作](https://segmentfault.com/a/1190000021901169)

[![img](https://avatar-static.segmentfault.com/236/441/2364410842-60768dd94e73b_huge128)**AlexZ33**](https://segmentfault.com/u/alexz33)发布于 2020-03-03

![img](https://sponsor.segmentfault.com/lg.php?bannerid=0&campaignid=0&zoneid=25&loc=https%3A%2F%2Fsegmentfault.com%2Fa%2F1190000021901169&referer=https%3A%2F%2Fsegmentfault.com%2Fa%2F1190000021901169&cb=200a8f595f)

# Git各种撤销操作



## 1,  git checkout -- file

可以撤销add和commit之后的文件

```shell
git checkout -- a.txt
```



## 2,  git checkout branch a.txt

用另外一个分支的文件替换当前分支的文件

```shell
git checkout master a.txt
```



## 3, git rm a.txt

直接删除某个文件

```shell
git rm a.txt
git commit -m "del a.txt"
```



## 4， git reset --soft|--mixed|--hard
``` shell
git reset --soft|--mixed|--hard <commit_id>

回退到某一个提交
1.第一种情况：还没有push，只是在本地commit

> 这里的<commit_id>就是每次commit的SHA-1，可以在log里查看到
> --mixed   会保留源码,只是将git commit和index 信息回退到了某个版本.
> --soft  保留源码,只回退到commit信息到某个版本.不涉及index的回退,如果还需要提交,直接commit即可.
> --hard   源码也会回退到某个版本,commit和index 都会回退到某个版本.(注意,这种方式是改变本地代码仓库源码)
```

简单总结一下，其实就是--soft 、--mixed以及--hard是三个恢复等级。使用--soft就仅仅将头指针恢复，已经add的缓存以及工作空间的所有东西都不变。如果使用--mixed，就将头恢复掉，已经add的缓存也会丢失掉，工作空间的代码什么的是不变的。如果使用--hard，那么一切就全都恢复了，头变，aad的缓存消失，代码什么的也恢复到以前状态。

```shell
git log
// 如果没有你想要的就在冒号状态下一直回车，退出是在冒号下输入q
git reset --hard f185d0ec
git push -f
// 强制提交

// 如果又后悔了，想回到最新的
git reflog
// 重复上边的步骤
```

2.commit push 代码已经更新到远程仓库

```shell
git revert <commit_id>
git push -f
```

revert 之后你的本地代码会回滚到指定的历史版本,这时你再 git push 既可以把线上的代码更新。
注意：git revert是用一次新的commit来回滚之前的commit，git reset是直接删除指定的commit，看似达到的效果是一样的,其实完全不同。
第一:上面我们说的如果你已经push到线上代码库, reset 删除指定commit以后,你git push可能导致一大堆冲突.但是revert 并不会.
第二:如果在日后现有分支和历史分支需要合并的时候,reset 恢复部分的代码依然会出现在历史分支里.但是revert 方向提交的commit 并不会出现在历史分支里.
第三:reset 是在正常的commit历史中,删除了指定的commit,这时 HEAD 是向后移动了,而 revert 是在正常的commit历史中再commit一次,只不过是反向提交,他的 HEAD 是一直向前的.



## 5, git reset HEAD~1

按提交步骤回退,~后边的数字是回退几次命令
(假如merge了一个其他的分支并提交）

```shell
git merge branch2
git push

// 现在要撤回

git reset HEAD~1
git checkout .
// 如果只是个别文件可以git checkout aa.txt bb.txt
git push -f
```



## 6, git rebase --onto baseBranch from to

删除中间的某次commit

我们先提交几次记录

> git log
> 我们会看到如下信息

```shell
commit aa1f22523b7c27c692a59588a72d396a97ae04be (HEAD -> branch2)
Author:
Date:   Tue Jul 10 21:34:55 2018 +0800

    4

commit cb10df56ea102a558c24625e4ebbb296e0b9d1e8
Author:
Date:   Tue Jul 10 21:34:38 2018 +0800

    3

commit 6407cefa0631920cfe8e12bfebc5f1f72c373b07
Author
Date:   Tue Jul 10 21:34:24 2018 +0800

    2

commit 3427ac34d38fb6bb06cfd222896e7e3a7a837219
Author:
Date:   Tue Jul 10 21:34:10 2018 +0800

    1
```

我们要删掉3的那次commit，我所在的分支是branch2，--onto后边第一个参数是base，也就是要删掉的commit的上一个commit，
第二个参数是我们要拼接的commit起始位置，第三个是结束位置
~表示分支的上一次或者上几次commit

```shell
git rebase --onto branch2~3 branch2~1 branch2

执行完会发现冲突，这时候删掉第3次commit的代码，解决完冲突，然后恢复到最后一次commit
git add .
git rebase --continue
```

再git log，会发现，第三次commit已经没有了

```shell
commit 20586673a513c53709f1e75f786e501c62d6537d (HEAD -> branch2)Author: Date:   Tue Jul 10 21:34:55 2018 +0800    4commit 6407cefa0631920cfe8e12bfebc5f1f72c373b07Author: Date:   Tue Jul 10 21:34:24 2018 +0800    2commit 3427ac34d38fb6bb06cfd222896e7e3a7a837219Author: Date:   Tue Jul 10 21:34:10 2018 +0800    1
```



## 7，git commit --amend

修改最后一次commit信息

```shell
git commit --amend此时处于vim状态，按c开始编辑，修改完按esc退出编辑，连续按两次大写Z，退出
```

修改之前几次的
比如要修改的commit是倒数第三条，使用下述命令：

```shell
git rebase -i HEAD~3
把pick改为edit
然后 :wq
git commit --amend
退出保存 :wq，然后回到正常状态
git rebase --continue
git push -f 推送到服务端
```



## 8, git merge --squash branch

合并的时候不想携带分支的commit信息，合并到master的时候只会留下一条信息

```shell
git merge --squash branch
 git add .
 git commit -m "merge branch"
 git push
```

## 9 [git如何从仓库中删除已经被跟踪的文件](https://link.segmentfault.com/?url=https%3A%2F%2Fblog.csdn.net%2Fhxfghgh%2Farticle%2Fdetails%2F83180394)

- 首先把该文件名写入到.gitignore中，如何写.gitignore请参考[https://github.com/github/gitignore](https://link.segmentfault.com/?url=https%3A%2F%2Fgithub.com%2Fgithub%2Fgitignore)
- 如果你要忽略的仅仅是一个文件，请使用如下命令：

git rm --cached 文件名

- 如果你要忽略的是一个目录或文件夹，则需要加-r参数：

git rm --cached -r 目录

- 执行完以上步骤之后，再去执行正常的git status, git add, git commit命令即可。把刚才的操作提交到仓库中即可




### 【----------------------------】


## 参考文章
* https://www.cnblogs.com/mengdd/p/4153773.html
* https://www.cnblogs.com/wihainan/p/6010895.html
* https://segmentfault.com/a/1190000021901169