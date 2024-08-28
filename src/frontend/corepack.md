# corepack
团队中统一包管理器的版本很重要，简单介绍一下 corepack 的使用指南，仅供参考

## 使用 corepack
1. 启用 corepack，默认是禁用的，需要手动启用

```bash
corepack enable
```

2. 打开一个 node 项目，项目需指定包管理器的版本

```json
{
  "packageManager": "pnpm@8.9.0"
}
```

3. 在项目文件目录下直接执行如下命令即可，若电脑上没有安装指定的 pnpm 版本，corepack 会为你安装此项目指定的版本

```bash
pnpm install
```

![pnpm-install-sucess](/pnpm-install-sucess.png)

::: info 注意事项
- 若在桌面目录下执行 pnpm 命令，corepack 会为你安装一个全局的 pnpm 版本，当项目没有指定的包管理器时，会使用此版本的包管理器

- corepack 会自动检测项目里是否有指定的包管理器，如果没有，使用全局版本，如果有，使用指定的版本，如果电脑上没有此版本，会在你执行pnpm 命令时帮你下载此版本
:::

## 使用 corepack 遇到的问题
目前只遇到一个网络问题

### 报错截图:
![pnpm-install-error](/pnpm-install-error.png)

### 出现原因：
国内网络访问不了默认npm镜像（https://registry.npmjs.org），即使开启科学上网也是访问不了（暂时不知道为什么）

### 解决办法：
使用阿里的 npm 镜像（https://registry.npmmirror.com），如果仅仅在 `.npmrc` 中设置了阿里镜像，没有效果，corepack 仍然使用的是默认镜像，因此需要额外设置 `COREPACK_NPM_REGISTRY` 的值

```bash
# powershell
setx COREPACK_NPM_REGISTRY https://registry.npmmirror.com
```
