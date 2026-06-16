<template>
  <div class="custom-home">
    <div class="hero-section">
      <div class="content-wrapper">
        <div class="main-content">
          <div class="quote-container">
            <div class="typewriter-quote">
              <p class="quote-text">
                <span ref="typewriterText" class="typewriter-text"></span>
                <span class="cursor" :class="{ 'blinking': isTyping }">|</span>
              </p>
              <footer class="quote-source" :class="{ 'visible': showSource }">
                —— {{ currentQuote.movie }}
              </footer>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface MovieQuote {
  text: string
  movie: string
}

const movieQuotes: MovieQuote[] = [
  {
    text: "生活就像一盒巧克力，你永远不知道下一颗是什么味道。",
    movie: "阿甘正传",
  },
  {
    text: "希望是个好东西，也许是最好的，好东西是不会消亡的。",
    movie: "肖申克的救赎",
  },
  {
    text: "总有一天，明天会来的。",
    movie: "乱世佳人",
  },
  {
    text: "伟大的人不是生来伟大，而是在成长过程中展露伟大。",
    movie: "教父",
  },
  {
    text: "我们都要努力活着，努力去爱，努力被爱。",
    movie: "天堂电影院",
  }
]

const currentQuote = ref<MovieQuote>(movieQuotes[0])
const typewriterText = ref<HTMLSpanElement | null>(null)
const isTyping = ref<boolean>(false)
const showSource = ref<boolean>(false)

const changeQuote = () => {
  const randomIndex = Math.floor(Math.random() * movieQuotes.length)
  currentQuote.value = movieQuotes[randomIndex]
  startTypewriter()
}

const startTypewriter = async () => {
  if (!typewriterText.value) return

  isTyping.value = true
  showSource.value = false
  typewriterText.value.textContent = ''

  const text = currentQuote.value.text
  const speed = 120 // 打字速度（毫秒）

  for (let i = 0; i < text.length; i++) {
    await new Promise(resolve => setTimeout(resolve, speed))
    typewriterText.value.textContent += text[i]
  }

  isTyping.value = false

  // 打字完成后显示来源
  setTimeout(() => {
    showSource.value = true
  }, 500)
}

onMounted(() => {
  // 随机显示一个台词
  changeQuote()
})
</script>

<style scoped>
.custom-home {
  min-height: calc(100vh - var(--vp-nav-height, 64px));
  background: var(--vp-c-bg);
  background-image:
    radial-gradient(circle at 25% 25%, var(--vp-c-brand-light) 0%, transparent 50%),
    radial-gradient(circle at 75% 75%, var(--vp-c-brand-soft) 0%, transparent 50%);
  position: relative;
  transition: background-color 0.5s ease;
  overflow: hidden;
}

.hero-section {
  min-height: calc(100vh - var(--vp-nav-height, 64px));
  display: flex;
  align-items: flex-start;
  justify-content: center;
  position: relative;
  padding: 2rem;
  padding-top: 25vh;
}

.content-wrapper {
  position: relative;
  z-index: 2;
  text-align: center;
  max-width: 800px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.main-content {
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 3rem;
  transition: all 0.3s ease;
  width: 100%;
  background: transparent;
}

.quote-container {
  animation: fadeInUp 1s ease-out 0.3s both;
}

.typewriter-quote {
  margin: 0;
  padding: 0;
  text-align: center;
}

.quote-text {
  font-size: 2rem;
  line-height: 1.8;
  color: var(--vp-c-text-1);
  margin-bottom: 2rem;
  font-style: italic;
  text-align: center;
  min-height: 3.6rem;
  display: inline-block;
  width: 100%;
}

.typewriter-text {
  display: inline;
}

.cursor {
  display: inline;
  color: var(--vp-c-brand);
  font-weight: bold;
  animation: blink 1s infinite;
}

.cursor.blinking {
  animation: blink 0.7s infinite;
}

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

.quote-source {
  font-size: 1.1rem;
  color: var(--vp-c-brand);
  font-weight: 500;
  text-align: center;
  opacity: 0;
  transform: translateY(10px);
  transition: all 0.5s ease;
}

.quote-source.visible {
  opacity: 1;
  transform: translateY(0);
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .hero-section {
    padding: 1rem;
    padding-top: 15vh;
  }

  .main-content {
    padding: 2rem;
  }

  .quote-text {
    font-size: 1.5rem;
    line-height: 1.6;
  }
}

@media (max-width: 480px) {
  .hero-section {
    padding-top: 12vh;
  }

  .main-content {
    padding: 1.5rem;
  }

  .quote-text {
    font-size: 1.3rem;
    line-height: 1.5;
  }

  .quote-source {
    font-size: 1rem;
  }
}

/* 深色模式特殊处理 */
html.dark .custom-home {
  background-image:
    radial-gradient(circle at 25% 25%, var(--vp-c-brand-dimm) 0%, transparent 50%),
    radial-gradient(circle at 75% 75%, var(--vp-c-brand-dimm) 0%, transparent 50%);
}

/* 确保兼容 VitePress 主题变量 */
:root {
  --vp-shadow-1: rgba(0, 0, 0, 0.04);
  --vp-shadow-2: rgba(0, 0, 0, 0.08);
}

html.dark {
  --vp-shadow-1: rgba(0, 0, 0, 0.3);
  --vp-shadow-2: rgba(0, 0, 0, 0.4);
}
</style>
