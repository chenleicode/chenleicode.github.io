# GitHub 推送失败网络连接问题

最近换了电脑，果然又出现此网络问题了。

简单来说，出现此问题的原因是 22 端口被禁了，需要切换到 443 端口，下面是解决办法：

## 第一步：有梯子

这儿就不多介绍了，能推送代码到 GitHub ，大概率会有梯子。

## 第二步：配置 GitHub 的 SSH 连接（通过 443 端口）

创建或编辑 ~/.ssh/config，写入以下内容：

```
Host github.com
  Hostname ssh.github.com
  Port 443
```

然后执行以下命令，并按提示输入 yes 即可

```sh
ssh -T git@github.com
```

::: tip 注意
- `~` 在 macOS 中，代表 `/Users/username`,  在 Windows 下，代表 `C:\Users\username`
- 默认是看不到 `.ssh`, 需要手动显示隐藏的文件
:::

## 吐槽一下

在这儿偷偷吐槽一下，生活在中国大陆的程序员太不容易了，与各种网络问题缠斗，心太累了……
