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
  },
  {
    text: "我会回来的",
    movie: "终结者",
    year: "1984"
  },
  {
    text: "休斯敦，我们有麻烦了",
    movie: "阿波罗13号",
    year: "1995"
  },
  {
    text: "为什么这么严肃",
    movie: "蝙蝠侠：黑暗骑士",
    year: "2008"
  },
  {
    text: "你在跟我说话吗",
    movie: "出租车司机",
    year: "1976"
  },
  {
    text: "你不能承受真相",
    movie: "义海雄风",
    year: "1992"
  },
  {
    text: "生活得快一点，否则生活就会从你身边溜走",
    movie: "春风化雨",
    year: "1989"
  },
  {
    text: "继续游下去",
    movie: "海底总动员",
    year: "2003"
  },
  {
    text: "总有一天，明天会来的",
    movie: "乱世佳人",
    year: "1939"
  },
  {
    text: "你有梦想，就得去捍卫它",
    movie: "当幸福来敲门",
    year: "2006"
  },
  {
    text: "伟大的人不是生来伟大，而是在成长过程中展露伟大",
    movie: "教父",
    year: "1972"
  },
  {
    text: "我们都要努力活着，努力去爱，努力被爱",
    movie: "天堂电影院",
    year: "1988"
  }
]

const currentQuote = ref(movieQuotes[0])
const typewriterText = ref(null)
const isTyping = ref(false)
const showSource = ref(false)

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
