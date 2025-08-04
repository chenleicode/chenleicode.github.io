import { defineConfig } from 'vitepress'

export default defineConfig({
  title: '陈磊',
  description: '陈磊的个人网站',
  lang: 'zh-CN',
  cleanUrls: true,
  srcDir: './src',

  head: [
    ['link', { rel: 'icon', href: '/site-logo-circle.png' }]
  ],

  themeConfig: {
    logo: { src: '/site-logo.jpg', width: 24, height: 24 },
    nav: [
      { text: '博客', link: '/posts', activeMatch: '/posts/' },
      { text: '演讲', link: '/talks' },
      { text: '笔记', link: '/notes/delete-local-branch', activeMatch: '/notes/' },
      { text: '关于我', link: '/me' },
      { text: '关于此网站', link: '/site'}
    ],

    sidebar: {
      '/notes/': {
        base: '/notes/',
        items: [
          {
            text: 'Git',
            collapsed: false,
            items: [
              { text: '删除本地分支', link: 'delete-local-branch' },
              { text: 'git submodule', link: 'git-submodule' },
              { text: 'git reset', link: 'git-reset' },
              { text: '撤销合并操作', link: 'undo-merge' }
            ]
          },
          {
            text: 'JavaScript',
            collapsed: false,
            items: [
              { text: '箭头函数-括号', link: 'arrow-function-bracket' },
              { text: 'console.log()', link: 'console-log' }
            ]
          },
          {
            text: 'CSS',
            collapsed: false,
            items: [
              { text: '伪类', link: 'css-pseudo-class' },
              { text: '伪元素', link: 'css-pseudo-element' }
            ]
          },
          {
            text: '其他',
            collapsed: false,
            items: [
              { text: 'corepack', link: 'corepack' },
            ]
          }
        ]
      },
      '/posts/': {
        base: '/posts/',
        items: [
          {
            text: '博客',
            collapsed: false,
            items: [
              { text: 'GitHub 推送失败网络连接', link: 'github-connect' },
              { text: '安装依赖报错：pngquant failed to build, make sure that libpng-dev is installed', link: 'install-dependency-error' },
              { text: '《恶意》读后感', link: 'malice' },
              { text: '使用 VitePress 搭建并自动化部署个人网站', link: 'vitepress-build-deploy' },
              { text: 'Mac 初体验', link: 'first-use-mac' }
            ]
          }
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

    // footer: {
    //   message: '基于 MIT 许可发布',
    //   copyright: `版权所有 © 2024 - ${new Date().getFullYear()} 陈磊`
    // },

    docFooter: {
      prev: '上一页',
      next: '下一页'
    },

    // lastUpdated: {
    //   text: '最后更新于',
    //   formatOptions: {
    //     dateStyle: 'short',
    //     timeStyle: 'medium'
    //   }
    // },

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
