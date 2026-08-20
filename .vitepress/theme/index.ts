import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import type { Theme } from 'vitepress'
import CustomHome from './components/CustomHome.vue'
import BackToPostList from './components/BackToPostList.vue'
import PostList from './components/PostList.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('CustomHome', CustomHome)
    app.component('PostList', PostList)
  },
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'doc-before': () => h(BackToPostList)
    })
  }
} satisfies Theme
