---
layout: home

hero:
  name: "编程之旅"
  text: "这是陈磊的个人网站，不求完美但求真诚"
  tagline: "小小视角，大大世界，记录日常"
  actions:
    - theme: brand
      text: 开始阅读
      link: /posts/delete-local-branch
    - theme: alt
      text: 关于我
      link: '/me'

  image:
    src: /site-logo.jpg
    alt: VitePress

features:
  - title: GitHub 推送失败网络连接
    details: '简单来说，出现此问题的原因是 22 端口被禁了，需要切换到 443 端口'
    link: /posts/github-connect
    linkText: 查看详细内容

  - title: git submodule
    details: 'Git 子模块是一种将外部 Git 仓库嵌入到另一个 Git 仓库中的方法。它允许你将一个项目分解为多个独立的仓库，并在主项目中引用这些子模块'
    link: /posts/git-submodule
    linkText: 查看详细内容

  - title: Corepack
    link: /posts/corepack
    details: 'Node 版本管理使用 nvm 等，对于包管理器 pnpm 的版本，可以尝试使用 corepack'
    linkText: 查看详细内容

  - title: 第三季度技术分享
    link: /posts/vitepress-build-deploy
    details: '分享主题：使用 VitePress 搭建并自动化部署网站'
    linkText: 查看详细内容
---


<style>
:root {
  --vp-home-hero-name-color: transparent !important;
  --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #98e98e 30%, #e180d2) !important;

  --vp-home-hero-image-background-image: linear-gradient(-45deg, #69acdf 50%, #99dcb0 50%) !important;
  --vp-home-hero-image-filter: blur(44px) !important;
}

.VPHomeHero img {
  border-radius: 50%;
}

.VPNavBarTitle img {
  border-radius: 50%;
}

@media (min-width: 640px) {
  :root {
    --vp-home-hero-image-filter: blur(56px) !important;
  }
}

@media (min-width: 960px) {
  :root {
    --vp-home-hero-image-filter: blur(68px) !important;
  }
}
</style>
