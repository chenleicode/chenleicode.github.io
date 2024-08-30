# 安装依赖报错：pngquant failed to build, make sure that libpng-dev is installed

这个报错有很多原因，我只介绍我的报错原因以及解决办法。

## 操作系统

Windows 10

## 报错原因

我是一个强迫症，没事的时候总喜欢删除电脑多余的软件（当时觉得是多余的软件），其中我删除了两个软件，导致了在安装 pngquant 的过程中，没有编译 pngquant 二进制文件的环境了，因此出现报错。

![删除的软件](/Snipaste_2024-07-03_08-44-20.png)

::: info 注意
建议不要删除电脑自带的 Microsoft Visual C++
:::

## 解决办法

重新安装以下软件就可以了，应该是可以只安装一个，我是安装了两个（X86, X64）

![需要安装的软件](/Snipaste_2024-07-03_08-23-11.png)

链接：https://learn.microsoft.com/zh-cn/cpp/windows/latest-supported-vc-redist?view=msvc-170#latest-microsoft-visual-c-redistributable-version
