import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Chen Lei's Blog",
  description: "This is Chen Lei's blog",
  srcDir: './docs',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      // { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/what-is-vitepress', activeMatch: '/guide/' },
      { text: 'Examples', link: '/examples/markdown-examples', activeMatch: '/examples/' }
    ],

    // 目前显示语言是英语，暂没实现中文显示
    search: {
      provider: 'local',
    },

    sidebar: {
      '/guide/': [
        {
          text: 'Guide',
          items: [
            { text: 'what is VitePress', link: '/guide/what-is-vitepress' },
            { text: 'One', link: '/guide/one' },
            { text: 'Two', link: '/guide/two' }
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
      { icon: 'github', link: 'https://github.com/chenlei0608' } // 陈磊的github个人主页
    ]
  }
})
