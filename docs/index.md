---
layout: home

hero:
  name: "编程之旅"
  text: "使用VitePress搭建，专注内容的个人博客"
  tagline: "有趣，实用，好玩"
  actions:
    - theme: brand
      text: 现在开始
      link: /what-is-site
    - theme: alt
      text: 关于我
      link: '/me'
    - theme: alt
      text: 查看我的GitHub主页
      link: 'https://github.com/chenlei0608'

  image:
    src: /vitepress-logo-large.webp
    alt: VitePress

features:
  - title: git commit
    details: 'Git commit 是 Git 版本控制系统中用于记录和描述每次代码变更的重要信息。它提供了一个清晰的记录，便于团队协作和历史追溯'
    link: /frontend/git-commit
    linkText: 查看详细内容
  - title: git submodule
    details: 'Git 子模块是一种将外部 Git 仓库嵌入到另一个 Git 仓库中的方法。它允许你将一个项目分解为多个独立的仓库，并在主项目中引用这些子模块。每个子模块都有自己的历史记录和版本控制，可以独立于主项目进行开发和维护'
    link: /frontend/git-submodule
    linkText: 查看详细内容
  - title: 使用 VitePress + GitHub Pages 搭建网站
    details: 'GitHub Pages 是 GitHub 提供的一项静态网站托管服务，可以将你的 GitHub 仓库中的内容直接发布为网页。简单易用，特别适合个人博客、项目文档和小型网站'
    link: /frontend/github-deploy
    linkText: 查看详细内容
---


<style>
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #bd34fe 30%, #41d1ff);

  --vp-home-hero-image-background-image: linear-gradient(-45deg, #bd34fe 50%, #47caff 50%);
  --vp-home-hero-image-filter: blur(44px);
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

