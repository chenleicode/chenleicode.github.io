import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "编程之旅",
  description: "这是使用 VitePress 搭建的个人博客，主要是记录一些个人的学习笔记",
  base: "/blog/",
  cleanUrls: true,
  srcDir: './docs',

  themeConfig: {
    nav: [
      { text: '主页', link: '/' },
      { text: '前端', link: '/frontend/git-submodule', activeMatch: '/frontend/' }
    ],

    sidebar: {
      '/frontend/': {
        base: '/frontend/',
        items: [
          {
            text: 'Git',
            collapsed: false,
            items: [
              { text: 'git submodule', link: 'git-submodule' },
              { text: 'git commit', link: 'git-commit' }
            ]
          },
          {
            text: '其他',
            collapsed: false,
            items: [
              { text: '安装依赖报错', link: 'install-dependency-error' },
              { text: '箭头函数-括号', link: 'arrow-function-bracket' },
              { text: '使用 VitePress + GitHub Pages 搭建网站', link: 'github-deploy' },
              { text: '必要的最佳实践', link: 'best-practice' }
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

    footer: {
      message: '基于 MIT 许可发布',
      copyright: '特别说明：首页暂时使用了 VitePress 的 Logo，如有侵权请联系我删除'
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

    outline: [1, 3],
    outlineTitle: '页面导航',

    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',

    socialLinks: [
      { icon: 'github', link: 'https://github.com/chenlei0608' }
    ]
  }
})
