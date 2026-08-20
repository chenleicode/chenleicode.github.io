<script setup lang="ts">
import { withBase } from 'vitepress'
import { data as posts } from '../../posts.data'

const formatDate = (date: string) => date.replaceAll('.', '/')
const toIsoDate = (date: string) => date.replace(/[./]/g, '-')
</script>

<template>
  <div class="post-list-view">
    <ul class="post-list">
      <li
        v-for="post in posts"
        :key="post.url"
        class="post-list-item"
      >
        <a :href="withBase(post.url)" class="post-link">
          {{ post.title }}
        </a>
        <time
          class="post-date"
          :datetime="toIsoDate(post.date)"
        >
          {{ formatDate(post.date) }}
        </time>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.post-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.post-list-item {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 0;
  border-bottom: 1px solid var(--vp-c-divider);
}

.post-link {
  min-width: 0;
  color: var(--vp-c-text-1);
  line-height: 1.6;
  text-decoration: none;
  overflow-wrap: anywhere;
}

.post-link::before {
  position: absolute;
  inset: 0;
  content: '';
}

.post-link:hover {
  color: var(--vp-c-brand-1);
}

.post-link:focus-visible {
  border-radius: 4px;
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 4px;
}

.post-date {
  color: var(--vp-c-text-3);
  font-size: 0.95rem;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}

@media (max-width: 640px) {
  .post-list-item {
    grid-template-columns: minmax(0, 1fr) auto;
    align-items: center;
    gap: 0.75rem;
    padding: 0.85rem 0;
  }

  .post-link {
    grid-column: 1;
    line-height: 1.55;
  }

  .post-date {
    grid-row: 1;
    grid-column: 2;
    color: var(--vp-c-text-3);
    font-size: 0.82rem;
    line-height: 1.55;
  }
}
</style>
