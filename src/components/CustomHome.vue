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
                —— {{ currentQuote.movie }} ({{ currentQuote.year }})
              </footer>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="nav-buttons" :class="{ 'visible': showButtons }">
      <a href="/posts" class="nav-btn">
        <span class="btn-icon">📝</span>
        <span class="btn-text">博客</span>
      </a>
      <a href="/talks" class="nav-btn">
        <span class="btn-icon">🎤</span>
        <span class="btn-text">演讲</span>
      </a>
      <a href="/me" class="nav-btn">
        <span class="btn-icon">👤</span>
        <span class="btn-text">关于我</span>
      </a>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const movieQuotes = [
  {
    text: "生活就像一盒巧克力，你永远不知道下一颗是什么味道",
    movie: "阿甘正传",
    year: "1994"
  },
  {
    text: "希望是个好东西，也许是最好的，好东西是不会消亡的",
    movie: "肖申克的救赎",
    year: "1994"
  },
  {
    text: "做人如果没有梦想，那和咸鱼有什么分别",
    movie: "少林足球",
    year: "2001"
  },
  {
    text: "每个人都会死去，但不是每个人都曾经真正活过",
    movie: "勇敢的心",
    year: "1995"
  },
  {
    text: "昨天已成为历史，明天是未知的，而今天是上天赐予我们的礼物",
    movie: "功夫熊猫",
    year: "2008"
  }
]

const currentQuote = ref(movieQuotes[0])
const typewriterText = ref(null)
const isTyping = ref(false)
const showSource = ref(false)
const showButtons = ref(false)

const changeQuote = () => {
  const randomIndex = Math.floor(Math.random() * movieQuotes.length)
  currentQuote.value = movieQuotes[randomIndex]
  startTypewriter()
}

const startTypewriter = async () => {
  if (!typewriterText.value) return

  isTyping.value = true
  showSource.value = false
  showButtons.value = false
  typewriterText.value.textContent = ''

  const text = `"${currentQuote.value.text}"`
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

  // 来源显示后再显示按钮
  setTimeout(() => {
    showButtons.value = true
  }, 1000)
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
  padding-top: 20vh;
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

.nav-buttons {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%) translateY(20px);
  opacity: 0;
  transition: all 0.8s ease;
  z-index: 10;
}

.nav-buttons.visible {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}

.nav-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem 1.5rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  text-decoration: none;
  color: var(--vp-c-text-1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  min-width: 80px;
}

.nav-btn:hover {
  background: var(--vp-c-brand);
  color: var(--vp-c-white);
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
  border-color: var(--vp-c-brand);
}

.btn-icon {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  transition: transform 0.3s ease;
}

.nav-btn:hover .btn-icon {
  transform: scale(1.2);
}

.btn-text {
  font-size: 0.9rem;
  font-weight: 500;
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

  .nav-buttons {
    gap: 1rem;
    bottom: 1.5rem;
  }

  .nav-btn {
    padding: 0.8rem 1.2rem;
    min-width: 70px;
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

  .nav-buttons {
    flex-direction: row;
    gap: 0.6rem;
    align-items: center;
    bottom: 1rem;
  }

  .nav-btn {
    flex-direction: row;
    gap: 0.5rem;
    width: auto;
    min-width: auto;
    padding: 0.6rem 0.8rem;
    justify-content: center;
    white-space: nowrap;
  }

  .btn-icon {
    margin-bottom: 0;
    font-size: 1.2rem;
  }

  .btn-text {
    font-size: 0.8rem;
  }
}

/* 深色模式特殊处理 */
html.dark .custom-home {
  background-image:
    radial-gradient(circle at 25% 25%, var(--vp-c-brand-dimm) 0%, transparent 50%),
    radial-gradient(circle at 75% 75%, var(--vp-c-brand-dimm) 0%, transparent 50%);
}

html.dark .nav-btn {
  background: transparent;
  border-color: transparent;
}

html.dark .nav-btn:hover {
  background: var(--vp-c-brand);
  border-color: var(--vp-c-brand);
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