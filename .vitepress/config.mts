import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "Chen Lei's Blog",
  description: "This is Chen Lei's blog",
  srcDir: './docs',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/git-submodule', activeMatch: '/guide/' },
      { text: 'Examples', link: '/examples/markdown-examples', activeMatch: '/examples/' }
    ],

    sidebar: {
      '/guide/': [
        {
          text: 'Guide',
          items: [
            { text: '安装依赖报错', link: '/guide/install-dependency-error' },
            { text: 'arrow function bracket', link: '/guide/arrow-function-bracket' },
            { text: 'git submodule', link: '/guide/git-submodule' }
          ]
        }
      ],
      '/examples/': [
        {
          text: 'Examples',
          collapsed: false,
          items: [
            { text: 'markdown-examples', link: '/examples/markdown-examples' },
            { text: 'api-examples', link: '/examples/api-examples' },
          ]
        },
        {
          text: 'Examples222',
          collapsed: false,
          items: [
            { text: 'markdown-examples-222', link: '/examples/markdown-examples-2' },
            { text: 'api-examples-222', link: '/examples/api-examples-2' },
          ]
        }
      ]
    },

    // 目前搜索显示语言是英语，暂没实现中文显示
    search: {
      provider: 'local',
    },

    footer: {
      message: '基于 MIT 许可发布',
      copyright: `版权所有 © ${new Date().getFullYear()} 陈磊`
    },

    docFooter: {
      prev: '上一页',
      next: '下一页'
    },

    outline: {
      label: '页面导航'
    },

    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium'
      }
    },
    
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
