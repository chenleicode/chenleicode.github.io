<script setup>
import { computed } from 'vue'
import { useData } from 'vitepress'
import { data as posts } from '../../../src/posts.data.js'

const { page } = useData()

const currentPost = computed(() =>
  posts.find((post) => post.relativePath === page.value.relativePath)
)
</script>

<template>
  <div v-if="currentPost" class="post-date">
    {{ currentPost.date }}
  </div>
</template>

<style scoped>
.post-date {
  margin: -0.15rem 0 1.4rem;
  color: var(--vp-c-text-3);
  font-size: 0.92rem;
}
</style>
