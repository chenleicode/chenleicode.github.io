<script setup lang="ts">
import { computed } from 'vue'
import { withBase } from 'vitepress'
import { data as posts } from '../../posts.data'

const postsByYear = computed(() => {
  const groupedPosts = new Map()

  for (const post of posts) {
    const currentYearPosts = groupedPosts.get(post.year) ?? []
    currentYearPosts.push(post)
    groupedPosts.set(post.year, currentYearPosts)
  }

  return Array.from(groupedPosts, ([year, items]) => ({ year, items }))
})
</script>

<template>
  <div class="post-archive">
    <section
      v-for="group in postsByYear"
      :key="group.year"
      class="post-year-group"
    >
      <h2 class="post-year-title">{{ group.year }}年</h2>

      <ul class="post-list">
        <li
          v-for="post in group.items"
          :key="post.url"
          class="post-list-item"
        >
          <a :href="withBase(post.url)" class="post-link">
            {{ post.title }}
          </a>
          <span class="post-date">{{ post.date }}</span>
        </li>
      </ul>
    </section>
  </div>
</template>

<style scoped>
.post-year-group + .post-year-group {
  margin-top: 2rem;
}

.post-year-title {
  margin: 0 0 1rem;
  padding-top: 0;
  border-top: 0;
}

.post-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.post-list-item {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.5rem 0;
  border-bottom: 1px solid var(--vp-c-divider);
}

.post-link {
  color: var(--vp-c-text-1);
  text-decoration: none;
}

.post-link:hover {
  color: var(--vp-c-brand-1);
}

.post-date {
  color: var(--vp-c-text-2);
  font-size: 0.95rem;
  white-space: nowrap;
}

@media (max-width: 640px) {
  .post-list-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.35rem;
  }
}
</style>
