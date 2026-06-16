# 代码回滚

代码回滚通常指的是将代码库恢复到之前的某个状态。本篇文章主要介绍 git reset，但是需要提前介绍一点其他相关 Git 知识。

## HEAD

- HEAD 是一个指针，指向你当前所在的本地分支的最新提交。
- 它表示你在本地仓库中的当前工作状态。例如，当你在 main 分支上时，HEAD 会指向 main 分支的最新提交。
- 如果你在某个提交的游离状态（detached HEAD），HEAD 会直接指向那个提交，而不再指向分支。

## origin

在 Git 中，origin 是默认的远程仓库名称。它通常代表你克隆一个 Git 仓库时使用的远程地址。

假设你克隆一个远程仓库：

```bash
git clone https://github.com/username/repository.git
```

Git 会将远程仓库的 URL 保存为 origin，表示该远程仓库的默认连接。

查看远程仓库 origin

```bash
git remote -v
```

输出示例：

```bash
origin  https://github.com/username/repository.git (fetch)
origin  https://github.com/username/repository.git (push)
```

这表示 origin 是指向 https://github.com/username/repository.git 的远程仓库。

## origin/HEAD

- origin/HEAD 是一个符号引用，指向远程仓库（origin）的默认分支。
- 它通常是 Git 在克隆远程仓库时设置的，指向远程仓库的默认分支（比如 main 或 master）。
- origin/HEAD 并不是指向一个具体的提交，而是指向远程仓库的某个分支（默认分支）。

## git reset

git reset 用于撤销对当前分支历史的修改。它的主要作用是重置 HEAD、暂存区和工作目录的状态。此命令主要针对本地。

- git reset --soft commitHash：回退到某个提交，保留暂存区和工作区的修改。
- git reset --mixed commitHash（默认方式，可以省略 --mixed）：回退到某个提交，保留工作区的修改，清空暂存区。
- git reset --hard commitHash：回退到某个提交，丢弃所有修改，恢复到指定的提交状态。

示例1：

```bash
# 回退到 3h8g4k5lks2s7
git reset --hard 3h8g4k5lks2s7
# 强制推送覆盖远程仓库的历史
git push --force # git push --force-with-lease 此命令更安全
```

示例2：

```bash
# 回退到上个提交
git reset --hard HEAD^ # 或 git reset --hard HEAD~1 这俩命令完全等价
# 强制推送覆盖远程仓库的历史
git push --force # git push --force-with-lease 此命令更安全
```
