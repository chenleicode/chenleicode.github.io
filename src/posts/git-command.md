# 实用 Git 命令

下面将介绍工作中实用的 Git 命令。

## `git fetch -p`

`git fetch -p`（或 `git fetch --prune`）用于清理本地仓库中已被远程删除的分支引用。

## `git branch -vv | awk '/: gone]/{print $1}' | xargs git branch -D`

这个命令的作用是 **强制删除** 所有远程已删除的本地分支。我们来 **分步解析** 这个命令：

> Windows 用户需使用 Git Bash 或 WSL

### **1. `git branch -vv`**

`git branch -vv` 命令会列出 **所有本地分支**，并显示它们的 **远程跟踪信息**，例如：
```sh
  dev        abc123 [origin/dev] Fix login issue
  feature-x  def456 [origin/feature-x] Add new UI component
* main       ghi789 [origin/main] Merge pull request #42
  old-branch jkl111 [origin/old-branch: gone] Remove deprecated code
  unused     mno222 [origin/unused: gone] Old feature
```
其中：
- `[origin/dev]` 表示该分支仍然存在于远程仓库 `origin`。
- `[origin/old-branch: gone]` 表示 `origin/old-branch` **在远程仓库已被删除**。

我们要删除的分支就是那些 **跟踪的远程分支已删除** 的本地分支，比如 `old-branch` 和 `unused`。

### **2. `awk '/: gone]/{print $1}'`**

#### **解析 `awk`**

```sh
awk '/: gone]/{print $1}'
```
- `/.../`：表示 **正则匹配**，这里匹配 `: gone]`，即查找所有 **远程分支已删除** 的行。
- `{print $1}`：打印 **第一列**，即 **本地分支名**。

**执行后输出：**
```sh
old-branch
unused
```

### **3. `xargs git branch -D`**

`xargs` 作用是 **将前面命令的输出作为参数传递给后面的命令**。

```sh
xargs git branch -D
```
等效于：
```sh
git branch -D old-branch
git branch -D unused
```
这里的 `-D` 是 **强制删除** 分支，即使分支上有未合并的更改也会被删除。如果使用 `-d`，Git 可能会拒绝删除未合并的分支。

### **总结**

这条命令的完整流程：
1. `git branch -vv`：列出所有本地分支及其远程状态。
2. `awk '/: gone]/{print $1}'`：筛选出远程已删除的分支，并提取分支名称。
3. `xargs git branch -D`：使用 `git branch -D` **强制删除** 这些本地分支。

**最终效果**：所有 **远程已删除但本地仍存在的分支** 将被强制删除！
