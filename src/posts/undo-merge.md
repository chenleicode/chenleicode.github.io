# 撤销 `git merge --no-ff feat/demo-0219`

要撤销正在进行的 `git merge --no-ff feat/demo-0219` 操作，有以下几种情况：

## 1. 合并未完成

如果合并尚未完成，可以中止合并过程：
```bash
git merge --abort
```
这会取消合并，并将你的工作目录恢复到合并前的状态。

## 2. 合并已完成

如果合并已经完成，但你想撤销它，可以使用 `git reset` 回退到合并前的状态。

首先，找到合并前的提交哈希：
```bash
git log --oneline
```
找到合并前的提交记录，复制其哈希值。

然后，使用 `git reset` 回退：
```bash
git reset --hard <commit-hash>
```
将 `<commit-hash>` 替换为合并前的提交哈希。这会丢弃合并后的所有更改，回退到指定提交。

## 总结

- 合并未完成：`git merge --abort`
- 合并已完成：`git reset --hard <commit-hash>`

通过这些步骤，你可以安全撤销合并操作。
