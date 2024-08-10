---
layout: home

hero:
  name: "编程之旅"
  text: "非正式的技术分享博客"
  tagline: "有趣，实用，好玩"
  actions:
    - theme: brand
      text: 现在开始
      link: /what-is-site
    - theme: alt
      text: 关于我
      link: '/me'
    - theme: alt
      text: 查看我的 GitHub 主页
      link: 'https://github.com/chenlei0608'

  image:
    src: /vitepress-logo-large.webp
    alt: VitePress

features:
  - title: val => {foo = val} 和 val => (foo = val)
    details: '在JavaScript中，箭头函数（Arrow Functions）有一些语法细节需要注意，尤其是当你使用大括号 `{}` 或圆括号 `()` 来定义函数体时'
    link: /frontend/arrow-function-bracket
    linkText: 查看详细内容
  - title: git submodule
    details: 'Git 子模块是一种将外部 Git 仓库嵌入到另一个 Git 仓库中的方法。它允许你将一个项目分解为多个独立的仓库，并在主项目中引用这些子模块'
    link: /frontend/git-submodule
    linkText: 查看详细内容
  - title: pngquant failed to build, make sure that libpng-dev is installed
    details: '安装依赖报错，这个报错有很多原因，我只介绍我出现的这个原因以及解决办法'
    link: /frontend/install-dependency-error
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

