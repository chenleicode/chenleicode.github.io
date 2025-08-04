# git submodule

Git 子模块是一种将外部 Git 仓库嵌入到另一个 Git 仓库中的方法。它允许你将一个项目分解为多个独立的仓库，并在主项目中引用这些子模块。每个子模块都有自己的历史记录和版本控制，可以独立于主项目进行开发和维护。

下面可能会涉及的名词含义：

- 主仓库：包含子模块的代码仓库，比如 [monorepo](https://github.com/chenleicode/monorepo)
- 子模块仓库：单独的某个代码仓库，它可能被某个主仓库引用作为子模块，比如 [monorepo-submodule-a](https://github.com/chenleicode/monorepo-submodule-a)
- 子模块：指在主仓库被引用的外部代码仓库，比如 [monorepo](https://github.com/chenleicode/monorepo) 的 apps/submodule-a

## 1. git submodule status

运行 `git submodule status` 命令可以查看当前 Git 仓库中所有子模块的状态。以下是一些可能的输出示例及其解释：

```sh
$ git submodule status
 1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s submodule1 (v1.0)
+2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9st submodule2 (heads/main)
-3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9stu submodule3 (not initialized)
```

每一行输出代表一个子模块的状态：

- `1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s submodule1 (v1.0)`: 子模块 `submodule1` 当前处于提交 `1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s`，指向 `v1.0` 标签。
- `+2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9st submodule2 (heads/main)`: 子模块 `submodule2` 有本地未提交的更改，当前处于提交 `2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9st`，位于 `main` 分支。
- `-3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9stu submodule3 (not initialized)`: 子模块 `submodule3` 尚未被初始化。

子模块状态前缀的含义：

- ` ` (空格)：子模块已初始化，工作目录干净。
- `+`：子模块有本地修改。
- `-`：子模块尚未初始化。

## 2. 克隆包含子模块的仓库

当别人克隆你的主项目仓库时，默认情况下，子模块并不会自动克隆。别人需要执行以下命令来初始化和更新子模块：

```sh
git clone <主仓库地址>
cd <主仓库目录>
git submodule update --init --recursive
```

`--init` 初始化子模块，`--recursive` 递归初始化和更新所有嵌套的子模块（如果存在嵌套子模块的话）。

## 3. 提交子模块的更改

如果在子模块改动并提交代码：

  ```sh
  cd apps/submodule-a # 进入子模块目录
  git add .
  git commit -m "fix: 修复bug"
  cd ../.. # 返回主仓库目录
  git add .
  git commit -m "Update submodule-a"
  git push
  ```

## 4. 更新子模块

场景：同事A在独立的子模块仓库（monorepo-submodule-a）提交代码后，同事B在包含子模块的主仓库（monorepo）中继续开发

  ```sh
  cd apps/submodule-a # 进入子模块目录
  git pull # 拉取最新更改
  cd ../.. # 返回主仓库目录
  git add .
  git commit -m "Update submodule-a"
  git push
  ```

## 5. `.gitmodules` 文件

`.gitmodules` 文件是 Git 仓库中用来管理子模块的配置文件。它通常位于项目的根目录中，记录了子模块的信息，包括子模块的路径和来源仓库。以下是 `.gitmodules` 文件的一个示例结构：

```ini
[submodule "apps/submodule-a"]
	path = apps/submodule-a
	url = git@github.com:chenleicode/monorepo-submodule-a.git
```

- **submodule ""apps/submodule-a""**: 定义子模块的名称。
- **path**: 指定子模块在主项目中的路径。
- **url**: 指定子模块的远程仓库地址。

## 6. 子模块的注意事项

- **子模块是独立仓库**：子模块有自己的 `.git` 目录，因此操作它们时，应该像管理一个普通 Git 仓库那样处理。例如，子模块中的代码更改需要单独提交和推送。
  
- **版本管理**：子模块在主仓库中始终指向一个特定的 commit，如果子模块发生更新，主仓库不会自动更新指向，需要手动更新并提交。
