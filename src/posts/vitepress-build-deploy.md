---
footer: false
sidebar: false
---

# 使用 VitePress 搭建并自动化部署个人网站

今天分享的主题是使用 VitePress 搭建并自动化部署个人网站。

## VitePress 是什么
[VitePress](https://vitepress.dev/zh/guide/what-is-vitepress) 是一个静态站点生成器 (SSG)，专为构建快速、以内容为中心的站点而设计。简而言之，VitePress 获取用 Markdown 编写的内容，对其应用主题，并生成可以轻松部署到任何地方的静态 HTML 页面。

::: info 其他 SSG
- [Jekyll](https://jekyllrb.com/)：GitHub Pages 原生集成
- [Rspress](https://rspress.dev/zh/)：基于 Rspack 和 React，字节跳动
:::

## 使用 VitePress 的网站
- [Vue](https://vuejs.org/)
- [Vite](https://vitejs.dev/)
- [Rollup](https://rollupjs.org/)
- [Pinia](https://pinia.vuejs.org/)
- [VueUse](https://vueuse.org/)
- [Vitest](https://vitest.dev/)
- [D3](https://d3js.org/)
- [UnoCSS](https://unocss.dev/)
- [Element Plus](https://element-plus.org/zh-CN/)
- [Husky](https://typicode.github.io/husky/zh/)
- [陈磊个人网站](https://chenleicode.top/)

...

## 快速搭建一个 Demo
```sh
# 创建文件目录
mkdir vitepress-demo

# 进入文件目录
cd vitepress-demo

# 安装 vitepress
npm add -D vitepress # 或 pnpm add -D vitepress

# 初始化 vitepress
npx vitepress init # 或 pnpm vitepress init

# 回答几个简单的问题
┌  Welcome to VitePress!
│
◇  Where should VitePress initialize the config?
│  ./docs
│
◇  Site title:
│  My Awesome Project
│
◇  Site description:
│  A VitePress Site
│
◇  Theme:
│  Default Theme
│
◇  Use TypeScript for config and theme files?
│  Yes
│
◇  Add VitePress npm scripts to package.json?
│  Yes
│
└  Done! Now run npm run docs:dev and start writing.
```

::: details 终端示例截图
![vitepress-demo-terminal](/vitepress-demo-terminal.png)
:::

::: tip 注意事项
- 默认生成的是 config.mjs 或 config.mts，如果要改成 config.js 或 config.ts，需要在 `package.json` 添加 `"type": "module"`
- 按照上述操作的构建输出目录是 `docs/.vitepress/dist`，如果 `问：Where should VitePress initialize the config?  答：./`, 构建输出目录是 `.vitepress/dist`
- 默认情况下，VitePress 将其开发服务器缓存存储在 `.vitepress/cache` 中，如果使用 Git，应该将它们添加到 .gitignore 文件中
- [演示 demo](https://chenleicode.top/demo/)
:::

## 语法
VitePress 的语法不算多，下面只介绍几个特别的语法点

### 基于文件的路由 {#file-based-routing}

VitePress 使用基于文件的路由，这意味着生成的 HTML 页面是从源 Markdown 文件的目录结构映射而来的。例如，给定以下目录结构：

```
.
├─ guide
│  ├─ getting-started.md
│  └─ index.md
├─ index.md
└─ prologue.md
```

生成的 HTML 页面会是这样：

```
index.md                  -->  /index.html (可以通过 / 访问)
prologue.md               -->  /prologue.html
guide/index.md            -->  /guide/index.html (可以通过 /guide/ 访问)
guide/getting-started.md  -->  /guide/getting-started.html
```

::: tip 注意事项
- 如果想要干净的路径:

```ts
// config.ts
export default defineConfig({
  cleanUrls: true
})
```

- 生成的 HTML 页面会是这样：

```
index.md                  -->  /
prologue.md               -->  /prologue
guide/index.md            -->  /guide/index
guide/getting-started.md  -->  /guide/getting-started
```
:::

生成的 HTML 可以托管在任何支持静态文件的 Web 服务器上。

### 根目录

项目根目录是与 `.vitepress` 特殊目录同级的地方。`.vitepress` 目录是 VitePress 配置文件、开发服务器缓存、构建输出和可选主题自定义代码的预留位置。

### 源目录

源目录是 Markdown 源文件所在的位置。默认情况下，它与项目根目录相同。但是，可以通过 `srcDir` 配置选项对其进行配置。

`srcDir` 选项是相对于项目根目录解析的。例如，对于 `srcDir: 'src'`，文件结构将如下所示：

```
.                          # 项目根目录
├─ .vitepress              # 配置目录
└─ src                     # 源目录
   ├─ getting-started.md
   └─ index.md
```

生成的源代码到 HTML 的映射：

```
src/index.md            -->  /index.html (可以通过 / 访问)
src/getting-started.md  -->  /getting-started.html
```

### 资源处理（public 目录）

放置在 public 中的资源将按原样复制到输出目录的根目录中。

请注意，应使用根绝对路径来引用放置在 public 中的文件——例如，`public/icon.png` 应始终在源代码中使用 `/icon.png` 引用。

### srcDir
- 类型：`string`
- 默认值： `.`

相对于项目根目录的 markdown 文件所在的文件夹。

```ts
export default defineConfig({
  srcDir: './src'
})
```

### base
- 类型：`string`
- 默认值： `/`

如果计划在子路径例如 GitHub 页面下部署站点，则需要设置此项。如果计划将站点部署到 `https://foo.github.io/bar/`，那么应该将 `base` 设置为 `'/bar/'`。它应该始终以 `/` 开头和结尾。

base 会自动添加到其他选项中以 `/` 开头的所有 URL 前面，因此只需指定一次。

```ts
// config.ts
export default defineConfig({
  base: '/base/'
})
```

### frontmatter 配置
frontmatter 支持基于页面的配置。在每个 markdown 文件中，可以使用 frontmatter 配置来覆盖站点级别或主题级别的配置选项

示例用法：

```md
---
title: Docs with VitePress
editLink: true
---
```

::: info 详细文档
https://vitepress.dev/zh/reference/frontmatter-config
:::

### 本地搜索
得益于 [minisearch](https://github.com/lucaong/minisearch/)，VitePress 支持使用浏览器内索引进行模糊全文搜索。要启用此功能，只需在 `.vitepress/config.ts` 文件中将 `themeConfig.search.provider` 选项设置为 `'local'` 即可：

```ts
import { defineConfig } from 'vitepress'

export default defineConfig({
  themeConfig: {
    search: {
      provider: 'local'
    }
  }
})
```

默认显示语言是英文，如果想要使用中文，请使用下面的写法：

```ts
import { defineConfig } from 'vitepress'

export default defineConfig({
  themeConfig: {
    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索文档',
            buttonAriaLabel: '搜索文档'
          },
          modal: {
            noResultsText: '无法找到相关结果',
            displayDetails: '显示详细列表',
            resetButtonTitle: '清除查询条件',
            footer: {
              selectText: '选择',
              navigateText: '切换',
              closeText: '关闭'
            }
          }
        }
      }
    }
  }
})
```

### Markdown 扩展

VitePress 带有内置的 Markdown 扩展，类似于 [MDX](https://www.mdxjs.cn/)

#### 使用 Vue

```md
<script setup>
import CustomComponent from '../../components/CustomComponent.vue'
</script>

# 简介

这是在 Markdown 中使用 Vue SFC

<CustomComponent />

## 标题2

xxxxxxxxxxxxxxxxxxxxxx

## 标题3

xxxxxxxxxxxxxxxxxxxxxxxxxxxxx

```

::: info 详细文档
https://vitepress.dev/zh/guide/using-vue
:::


#### 内部链接 {#internal-links}

内部链接将转换为单页导航的路由链接。此外，子目录中包含的每个 `index.md` 都会自动转换为 `index.html`，并带有相应的 URL `/`。

例如，给定以下目录结构：

```
.
├─ index.md
├─ foo
│  ├─ index.md
│  ├─ one.md
│  └─ two.md
└─ bar
   ├─ index.md
   ├─ three.md
   └─ four.md
```

假设现在处于 `foo/one.md` 文件中：

```md
[Home](/) <!-- 将用户导航至根目录下的 index.html -->
[foo](/foo/) <!-- 将用户导航至目录 foo 下的 index.html -->
[foo heading](./#heading) <!-- 将用户锚定到目录 foo 下的index文件中的一个标题上 -->
[bar - three](../bar/three) <!-- 可以省略扩展名 -->
[bar - three](../bar/three.md) <!-- 可以添加 .md -->
[bar - four](../bar/four.html) <!-- 或者可以添加 .html -->
```

- [主页](/)
- [Corepack](./corepack)
- [Corepack (遇到的问题)](./corepack#遇到的问题)

#### 外部链接 {#external-links}

外部链接带有 `target="_blank" rel="noreferrer"`：

- [vuejs.org](https://cn.vuejs.org)
- [VitePress on GitHub](https://github.com/vuejs/vitepress)

#### 自定义容器 {#custom-containers}

自定义容器可以通过它们的类型、标题和内容来定义。

**输入**

```md
::: info
This is an info box.
:::

::: tip
This is a tip.
:::

::: warning
This is a warning.
:::

::: danger
This is a dangerous warning.
:::

::: details
This is a details block.
:::
```

**输出**

::: info
This is an info box.
:::

::: tip
This is a tip.
:::

::: warning
This is a warning.
:::

::: danger
This is a dangerous warning.
:::

::: details
This is a details block.
:::

可以通过在容器的 "type" 之后附加文本来设置自定义标题。

**输入**

````md
::: danger STOP
危险区域，请勿继续
:::

::: details 点我查看代码
```js
console.log('Hello, VitePress!')
```
:::
````

**输出**

::: danger STOP
危险区域，请勿继续
:::

::: details 点我查看代码
```js
console.log('Hello, VitePress!')
```
:::

此外，还可以通过在站点配置中添加以下内容来全局设置自定义标题的内容

```ts
// config.ts
export default defineConfig({
  // ...
  markdown: {
    container: {
      tipLabel: '提示',
      warningLabel: '警告',
      dangerLabel: '危险',
      infoLabel: '信息',
      detailsLabel: '详细信息'
    }
  }
  // ...
})
```

## 使用 GitHub Pages 部署

1. 在项目的 `.github/workflows` 目录中创建一个名为 `deploy.yml` 的文件，其中包含这样的内容：

```yaml
# 构建 VitePress 站点并将其部署到 GitHub Pages 的示例工作流程
name: Deploy VitePress site to Pages

on:
  # 在针对 `main` 分支的推送上运行
  push:
    branches: [main]

  # 允许你从 Actions 选项卡手动运行此工作流程
  workflow_dispatch:

# 设置 GITHUB_TOKEN 的权限，以允许部署到 GitHub Pages
permissions:
  contents: read
  pages: write
  id-token: write

# 只允许同时进行一次部署，跳过正在运行和最新队列之间的运行队列
# 但是，不取消正在进行的运行，允许这些生产部署完成
concurrency:
  group: pages # 自定义的组名
  cancel-in-progress: false

jobs:
  # 构建工作
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          fetch-depth: 0 # 保留 Git 信息
      # 使用 pnpm
      # - name: Setup pnpm
      #   uses: pnpm/action-setup@v3
      #   with:
      #     version: latest
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm # 或 pnpm / yarn
      - name: Setup Pages
        uses: actions/configure-pages@v4
      - name: Install dependencies
        run: npm ci # 或 pnpm install / yarn install
      - name: Build with VitePress
        run: npm run docs:build # 或 pnpm docs:build / yarn docs:build
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: docs/.vitepress/dist # 构建输出目录

  # 部署工作
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    needs: build
    runs-on: ubuntu-latest
    name: Deploy
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

::: tip 注意事项
- 请将 base 设置为 `/repo-name/`
- GitHub Actions 是 GitHub 提供的一种持续集成和持续部署（CI/CD）服务，允许你在仓库中自动化各种软件开发工作流程。通过 GitHub Actions，你可以在特定的触发条件下自动执行代码的构建、测试、部署等任务，从而简化软件开发和发布的过程。类似于 GitLab CI/CD
- actions/* 是 GitHub Actions 提供的官方行动（Action），用于在 CI/CD 流水线中执行特定任务
- ubuntu-latest 是一个常用的 GitHub-hosted runner，也可以在本地或服务器上配置自有 runner
- github-pages 是 GitHub 提供的一项免费托管服务，允许你直接从 GitHub 仓库中发布静态网站
- npm ci：它是为持续集成环境设计的，直接从 package-lock.json 文件中安装依赖，并跳过创建或更新 package-lock.json 文件的步骤。提供更快的安装速度，确保安装的依赖与开发时使用的版本完全一致，避免潜在的依赖版本冲突或不一致问题
:::

2. 在存储库设置中的 `Pages` 菜单项下，选择 `Build and deployment > Source > GitHub Actions`

::: details 操作截图
![vitepress-demo-github-pages](/Snipaste_2024-08-07_16-24-24.png)
:::

3. 将更改推送到 main 分支并等待 GitHub Action 工作流完成。你应该看到站点部署到 `https://user-name.github.io/repo-name/`。你的站点将在每次推送到 main 分支时自动部署。
