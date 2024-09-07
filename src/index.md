---
layout: home

hero:
  name: "编程之旅"
  text: "这是陈磊的个人博客，不求完美但求真诚"
  tagline: "小小视角，大大世界，分享日常，精彩自现"
  actions:
    - theme: brand
      text: 现在开始
      link: /what-is-site
    - theme: alt
      text: 关于我
      link: '/me'

  image:
    src: /site-logo.jpg
    alt: VitePress

features:
  - title: pngquant failed to build, make sure that libpng-dev is installed
    details: '安装依赖报错，这个报错有很多原因，我只介绍我出现的这个原因以及解决办法'
    link: /frontend/install-dependency-error
    linkText: 查看详细内容
  - title: git submodule
    details: 'Git 子模块是一种将外部 Git 仓库嵌入到另一个 Git 仓库中的方法。它允许你将一个项目分解为多个独立的仓库，并在主项目中引用这些子模块'
    link: /frontend/git-submodule
    linkText: 查看详细内容
  - title: 第三季度技术分享
    link: /frontend/share-quarter-3
    details: '分享主题：使用 VitePress 搭建并自动化部署网站'
    linkText: 查看详细内容
  - title: Corepack
    link: /frontend/corepack
    details: 'Node 版本管理使用 nvm 等，对于包管理器 pnpm 的版本，可以尝试使用 corepack'
    linkText: 查看详细内容
---


<style>
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #98e98e 30%, #e180d2);

  --vp-home-hero-image-background-image: linear-gradient(-45deg, #69acdf 50%, #99dcb0 50%);
  --vp-home-hero-image-filter: blur(44px);
}

.VPHomeHero img {
  border-radius: 50%;
}

.VPNavBarTitle img {
  border-radius: 50%;
}

@media (min-width: 640px) {
  :root {
    --vp-home-hero-image-filter: blur(56px);
  }
}

@media (min-width: 960px) {
  :root {
    --vp-home-hero-image-filter: blur(68px);
  }
}
</style>
