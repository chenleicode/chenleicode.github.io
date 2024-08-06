# 安装依赖报错：pngquant failed to build, make sure that libpng-dev is installed

这个报错有很多原因，我只介绍我出现的这个原因以及解决办法。

## 操作系统

Windows 10

## 原因

我是一个强迫症，没事的时候总喜欢删除电脑的流氓软件（我当时觉得没用），其中我删除了一下两个软件，个人觉得出现报错的原因是删除这两个电脑自带的程序后，在安装 pngquant 的过程中，没有编译 pngquant 二进制文件的环境了，因此出现报错。

<!-- ![删除的软件](./Snipaste_2024-07-03_08-44-20.png) -->

> 建议：不要删除电脑自带的 Microsoft Visual C++

## 解决办法

重新安装以下软件就可以了，应该是可以只安装一个，我是安装了两个（X86, X64）

<!-- ![需要安装的软件](./Snipaste_2024-07-03_08-23-11.png) -->

链接：https://learn.microsoft.com/zh-cn/cpp/windows/latest-supported-vc-redist?view=msvc-170#latest-microsoft-visual-c-redistributable-version
