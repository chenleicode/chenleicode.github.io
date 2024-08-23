# GitHub Pages

GitHub Pages 是 GitHub 提供的一项静态网站托管服务，可以将你的 GitHub 仓库中的内容直接发布为网页。简单易用，特别适合个人博客、项目文档和小型网站

## 主要特点

1. **免费托管**：GitHub Pages 对所有 GitHub 用户免费提供托管服务。

2. **自动部署**：通过将代码推送到 GitHub 仓库，可以自动部署网站。

3. **自定义域名**：支持将自定义域名绑定到你的 GitHub Pages 网站。

4. **HTTPS 支持**：提供 HTTPS 支持，增强网站的安全性。

5. **Jekyll 支持**：内置支持 Jekyll，这是一个静态网站生成器，可以方便地创建博客和文档网站。虽然 GitHub Pages 也支持其他静态生成器，但 Jekyll 是其主要推荐的选项。

6. **无限存储和带宽**：适合个人项目、文档和小型网站，但对于大流量网站或需要频繁更新的内容，可能需要考虑其他托管解决方案。

## 使用 VitePress + GitHub Pages 搭建网站

1. **准备一个 VitePress 项目**：

![仓库](/Snipaste_2024-08-07_16-25-18.png)

2. **VitePress 项目注意事项**：

在 `.vitepress/config.mts` 文件中，添加以下代码：`base: "/chenlei-blog/"`

![代码截图](/Snipaste_2024-08-07_16-40-34.png)

3. **启用 GitHub Pages**：

![仓库设置](/Snipaste_2024-08-07_16-24-24.png)

4. **配置 `.github/workflows/deploy.yml` 文件**

```yaml
# 构建 VitePress 站点并将其部署到 GitHub Pages 的示例工作流程
name: Deploy VitePress site to Pages

on:
  # 在针对 `main` 分支的推送上运行。
  # 如果你使用 `master` 分支作为默认分支，请将其更改为 `master`
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
# 但是，不要取消正在进行的运行，因为我们希望允许这些生产部署完成
concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  # 构建工作
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          fetch-depth: 0 # 如果未启用 lastUpdated，则不需要
      # - uses: pnpm/action-setup@v3 # 如果使用 pnpm，请取消注释
      # - uses: oven-sh/setup-bun@v1 # 如果使用 Bun，请取消注释
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm # 或 pnpm / yarn
      - name: Setup Pages
        uses: actions/configure-pages@v4
      - name: Install dependencies
        run: npm ci # 或 pnpm install / bun install
      - name: Build with VitePress
        run: npm run build # 或 pnpm docs:build / bun run docs:build
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          # 特别注意：上传的文件路径！！！
          path: .vitepress/dist

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

> 注意：yml文件配置完成点击 `commit changes...`，然后第一次自动部署开始了。平时推送到 `main` 或 `master` 分支代码也会自动部署。

5. **访问和更新**：
   - 网站将会在 `https://username.github.io/repository-name` 网址下访问，username是GitHub用户名，repository-name是仓库名。
   - 任何更新或更改都需要通过推送到 GitHub 仓库来进行。



