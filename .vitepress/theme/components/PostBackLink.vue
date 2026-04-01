<script setup>
import { computed } from 'vue'
import { useData, withBase } from 'vitepress'

const { page } = useData()

const isPostPage = computed(() => page.value.relativePath.startsWith('posts/'))
</script>

<template>
  <div v-if="isPostPage" class="post-back-link">
    <a
      :href="withBase('/posts')"
      class="post-back-anchor"
      aria-label="返回博客列表"
      title="返回博客列表"
    >
      <svg
        class="post-back-icon"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M19 12H8"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
        />
        <path
          d="M12 8 8 12l4 4"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
        />
      </svg>
    </a>
  </div>
</template>

<style scoped>
.post-back-link {
  margin-bottom: 1rem;
}

.post-back-anchor {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.35rem 0.75rem;
  border: 1px solid transparent;
  border-radius: 999px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  font-family: "JetBrains Mono", "IBM Plex Mono", "SF Mono", "SFMono-Regular", Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  font-size: 0.9rem;
  font-weight: 600;
  letter-spacing: -0.01em;
  line-height: 1;
  text-decoration: none;
  transition: transform 0.2s ease, color 0.2s ease, border-color 0.2s ease, background-color 0.2s ease;
  /* margin-bottom: 30px; */
}

.post-back-anchor:hover {
  color: var(--vp-c-text-1);
  background: color-mix(in srgb, var(--vp-c-bg-soft) 88%, var(--vp-c-text-3));
  transform: translateY(-1px);
}

.post-back-icon {
  width: 1.35rem;
  height: 1.35rem;
  flex: none;
}
</style>
