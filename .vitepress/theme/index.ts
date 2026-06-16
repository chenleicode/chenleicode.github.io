import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import type { Theme } from 'vitepress'
import CustomHome from './components/CustomHome.vue'
import PostBackLink from './components/PostBackLink.vue'
import PostArchive from './components/PostArchive.vue'
import PostDate from './components/PostDate.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('CustomHome', CustomHome)
    app.component('PostArchive', PostArchive)
    app.component('PostDate', PostDate)
  },
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'doc-before': () => h(PostBackLink)
    })
  }
} satisfies Theme
