import { defineConfig } from 'vitepress'

export default defineConfig({
  title: '编程之旅',
  description: '这是使用 VitePress 搭建的个人博客，主要是记录一些个人的学习笔记',
  lang: 'zh-CN',
  // base: '/',
  cleanUrls: true,
  srcDir: './src',
  // outDir: '.vitepress/dist',

  head: [
    ['link', { rel: 'icon', href: '/site-logo-circle.png' }]
  ],

  themeConfig: {
    logo: { src: '/site-logo.jpg', width: 24, height: 24 },
    nav: [
      { text: '博客', link: '/posts/git-submodule', activeMatch: '/posts/' },
      { text: '演讲', link: '/talk' },
      { text: '随笔', link: '/life-essay/malice', activeMatch: '/life-essay/' }
    ],

    sidebar: {
      '/posts/': {
        base: '/posts/',
        items: [
          {
            text: 'Git',
            collapsed: false,
            items: [
              { text: '实用 Git 命令', link: 'git-command' },
              { text: 'git submodule', link: 'git-submodule' },
              { text: 'git reset', link: 'git-reset' },
              { text: '撤销合并操作', link: 'undo-merge' }
            ]
          },
          {
            text: 'JavaScript',
            collapsed: false,
            items: [
              { text: '箭头函数-括号', link: 'arrow-function-bracket' }
            ]
          },
          {
            text: '报错',
            collapsed: false,
            items: [
              { text: 'pngquant failed to build, make sure that libpng-dev is installed', link: 'install-dependency-error' }
            ]
          },
          {
            text: '其他',
            collapsed: false,
            items: [
              { text: 'corepack', link: 'corepack' },
              { text: '使用 VitePress 搭建并自动化部署个人网站', link: 'vitepress-build-deploy' },
              { text: 'Powershell 7', link: 'powershell7' },
              { text: 'console.log()', link: 'console-log' }
            ]
          }
        ]
      },
      '/life-essay/': {
        base: '/life-essay/',
        items: [
          { text: '《恶意》读后感', link: 'malice' }
        ]
      }
    },

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
    },

    footer: {
      message: '基于 MIT 许可发布',
      copyright: `版权所有 © 2024 - ${new Date().getFullYear()} 陈磊`
    },

    docFooter: {
      prev: '上一页',
      next: '下一页'
    },

    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium'
      }
    },

    outline: {
      level: 'deep',
      label: '页面导航'
    },

    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',

    socialLinks: [
      { icon: 'github', link: 'https://github.com/chenleicode' }
    ]
  }
})
