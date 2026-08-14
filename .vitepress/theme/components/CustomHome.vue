<template>
  <div class="custom-home">
    <!-- 背景层：极光光晕 + 噪点纹理 -->
    <div class="bg" aria-hidden="true">
      <div class="orb orb-1"></div>
      <div class="orb orb-2"></div>
      <div class="orb orb-3"></div>
      <div class="orb orb-4"></div>
      <div class="grain"></div>
    </div>

    <!-- 背景层：粒子星图 -->
    <canvas ref="canvasRef" class="constellation" aria-hidden="true"></canvas>

    <!-- 跟随鼠标的柔光 -->
    <div ref="glowRef" class="mouse-glow" aria-hidden="true"></div>

    <!-- 主体内容 -->
    <section class="hero">
      <div class="avatar-wrap">
        <div class="avatar-ring"></div>
        <img class="avatar" :src="withBase('/avatar.jpg')" alt="陈磊" />
      </div>

      <h1 class="name">陈磊</h1>

      <p class="role">
        <span class="role-prefix">/</span>
        <span ref="roleText" class="role-type"></span>
        <span class="role-cursor" aria-hidden="true"></span>
      </p>

      <p class="tagline">写代码，也写生活 —— 欢迎来到我的数字花园</p>

      <div class="actions">
        <a class="btn btn-primary" :href="withBase('/posts')">进入博客</a>
        <a class="btn btn-ghost" :href="withBase('/me')">关于我</a>
      </div>

      <div class="socials">
        <a
          class="social"
          href="https://github.com/chenleicode"
          target="_blank"
          rel="noopener"
          aria-label="GitHub"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11.1 11.1 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.62 1.59.23 2.76.11 3.05.74.8 1.18 1.83 1.18 3.09 0 4.42-2.69 5.39-5.26 5.68.41.35.78 1.05.78 2.12 0 1.53-.01 2.76-.01 3.14 0 .31.21.67.8.56A10.52 10.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
          </svg>
        </a>
        <a class="social" :href="withBase('/feed.xml')" aria-label="RSS">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M6.18 15.64a2.18 2.18 0 0 1 2.18 2.18C8.36 19 7.38 20 6.18 20C5 20 4 19 4 17.82a2.18 2.18 0 0 1 2.18-2.18M4 4.44A15.56 15.56 0 0 1 19.56 20h-2.83A12.73 12.73 0 0 0 4 7.27V4.44m0 5.66a9.9 9.9 0 0 1 9.9 9.9h-2.83A7.07 7.07 0 0 0 4 12.93V10.1z" />
          </svg>
        </a>
      </div>
    </section>

    <div class="scroll-hint" aria-hidden="true"></div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { withBase } from 'vitepress'

/** 打字机循环展示的角色文案 */
const ROLES = ['一名程序员', '一个终身学习者', '一位生活记录者', '一名开源爱好者']

/** 鼠标柔光直径，需与 CSS 中 .mouse-glow 的尺寸保持一致 */
const GLOW_SIZE = 560

const roleText = ref<HTMLSpanElement | null>(null)
const canvasRef = ref<HTMLCanvasElement | null>(null)
const glowRef = ref<HTMLDivElement | null>(null)

let disposed = false
let field: ConstellationField | null = null
let themeObserver: MutationObserver | null = null
let typeTimer: ReturnType<typeof setTimeout> | null = null

const sleep = (ms: number) =>
  new Promise<void>((resolve) => {
    typeTimer = setTimeout(resolve, ms)
  })

/* ---------------------------------- 打字机 ---------------------------------- */

async function runTypewriter() {
  let index = 0
  while (!disposed) {
    const text = ROLES[index % ROLES.length]
    if (!roleText.value) return

    // 逐个字符打出
    for (let i = 0; i <= text.length && !disposed; i++) {
      roleText.value.textContent = text.slice(0, i)
      await sleep(110)
    }
    await sleep(2200)

    // 逐个字符删除
    for (let i = text.length; i >= 0 && !disposed; i--) {
      roleText.value.textContent = text.slice(0, i)
      await sleep(45)
    }
    await sleep(400)
    index++
  }
}

/* -------------------------------- 鼠标柔光跟随 -------------------------------- */

function handlePointerMove(e: PointerEvent) {
  if (!glowRef.value) return
  glowRef.value.style.opacity = '1'
  glowRef.value.style.transform = `translate3d(${e.clientX - GLOW_SIZE / 2}px, ${e.clientY - GLOW_SIZE / 2}px, 0)`
}

function handlePointerLeave() {
  if (glowRef.value) glowRef.value.style.opacity = '0'
}

/* -------------------------------- 主题色解析 -------------------------------- */

/** 读取当前主题下 --vp-c-brand-1 的实际颜色（跟随明暗模式切换） */
function resolveBrandColor(): string {
  const probe = document.createElement('div')
  probe.style.cssText =
    'position:absolute;opacity:0;pointer-events:none;color:var(--vp-c-brand-1)'
  document.body.appendChild(probe)
  const color = getComputedStyle(probe).color
  probe.remove()
  return color
}

/* ------------------------------- 粒子星图画布 ------------------------------- */

interface Star {
  x: number
  y: number
  vx: number
  vy: number
  r: number
}

class ConstellationField {
  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D
  private stars: Star[] = []
  private raf = 0
  private dpr = 1
  private width = 0
  private height = 0
  private rgb = '99, 102, 241'
  private mouseX = Number.NEGATIVE_INFINITY
  private mouseY = Number.NEGATIVE_INFINITY
  private running = false

  private readonly linkDist = 130
  private readonly mouseDist = 170
  private readonly repelDist = 110

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')!
    this.dpr = Math.min(window.devicePixelRatio || 1, 2)
    this.resize()
    window.addEventListener('resize', this.resize)
    window.addEventListener('pointermove', this.onPointerMove, { passive: true })
    document.addEventListener('visibilitychange', this.onVisibilityChange)
  }

  /** 接收类似 "rgb(102, 87, 255)" 的颜色字符串 */
  setColor(cssColor: string) {
    const m = cssColor.match(/[\d.]+/g)
    if (m && m.length >= 3) this.rgb = `${m[0]}, ${m[1]}, ${m[2]}`
  }

  start() {
    this.running = true
    this.loop()
  }

  destroy() {
    this.running = false
    cancelAnimationFrame(this.raf)
    window.removeEventListener('resize', this.resize)
    window.removeEventListener('pointermove', this.onPointerMove)
    document.removeEventListener('visibilitychange', this.onVisibilityChange)
  }

  private resize = () => {
    const rect = this.canvas.parentElement?.getBoundingClientRect()
    this.width = rect?.width ?? window.innerWidth
    this.height = rect?.height ?? window.innerHeight
    this.canvas.width = this.width * this.dpr
    this.canvas.height = this.height * this.dpr
    this.canvas.style.width = `${this.width}px`
    this.canvas.style.height = `${this.height}px`
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0)

    const count = Math.min(90, Math.round((this.width * this.height) / 15000))
    this.stars = Array.from({ length: count }, () => this.spawnStar())
  }

  private spawnStar(): Star {
    return {
      x: Math.random() * this.width,
      y: Math.random() * this.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: 0.8 + Math.random() * 1.2,
    }
  }

  private onPointerMove = (e: PointerEvent) => {
    const rect = this.canvas.getBoundingClientRect()
    this.mouseX = e.clientX - rect.left
    this.mouseY = e.clientY - rect.top
  }

  private onVisibilityChange = () => {
    if (document.hidden) this.pause()
    else this.resume()
  }

  private pause() {
    this.running = false
    cancelAnimationFrame(this.raf)
  }

  private resume() {
    if (!this.running) {
      this.running = true
      this.loop()
    }
  }

  private loop = () => {
    if (!this.running) return
    this.draw()
    this.raf = requestAnimationFrame(this.loop)
  }

  private draw() {
    const { ctx, width: w, height: h } = this
    ctx.clearRect(0, 0, w, h)

    // 星点漂移 + 鼠标轻微斥力
    for (const star of this.stars) {
      star.x += star.vx
      star.y += star.vy
      if (star.x < -6) star.x = w + 6
      if (star.x > w + 6) star.x = -6
      if (star.y < -6) star.y = h + 6
      if (star.y > h + 6) star.y = -6

      const dx = star.x - this.mouseX
      const dy = star.y - this.mouseY
      const dist = Math.hypot(dx, dy)
      if (dist < this.repelDist && dist > 0.001) {
        const force = (this.repelDist - dist) / this.repelDist
        star.x += (dx / dist) * force * 0.5
        star.y += (dy / dist) * force * 0.5
      }
    }

    // 星点之间的连线
    ctx.lineWidth = 1
    for (let i = 0; i < this.stars.length; i++) {
      const a = this.stars[i]

      for (let j = i + 1; j < this.stars.length; j++) {
        const b = this.stars[j]
        const dist = Math.hypot(a.x - b.x, a.y - b.y)
        if (dist < this.linkDist) {
          const alpha = (1 - dist / this.linkDist) * 0.16
          ctx.strokeStyle = `rgba(${this.rgb}, ${alpha})`
          ctx.beginPath()
          ctx.moveTo(a.x, a.y)
          ctx.lineTo(b.x, b.y)
          ctx.stroke()
        }
      }

      // 星点与鼠标之间的连线
      const mDist = Math.hypot(a.x - this.mouseX, a.y - this.mouseY)
      if (mDist < this.mouseDist) {
        const alpha = (1 - mDist / this.mouseDist) * 0.3
        ctx.strokeStyle = `rgba(${this.rgb}, ${alpha})`
        ctx.beginPath()
        ctx.moveTo(a.x, a.y)
        ctx.lineTo(this.mouseX, this.mouseY)
        ctx.stroke()
      }
    }

    // 星点本体
    for (const star of this.stars) {
      ctx.fillStyle = `rgba(${this.rgb}, 0.55)`
      ctx.beginPath()
      ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2)
      ctx.fill()
    }
  }
}

/* --------------------------------- 生命周期 --------------------------------- */

onMounted(() => {
  const prefersReducedMotion =
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false

  if (!prefersReducedMotion && canvasRef.value) {
    field = new ConstellationField(canvasRef.value)
    field.setColor(resolveBrandColor())
    field.start()

    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    window.addEventListener('pointerleave', handlePointerLeave)

    // 主题切换（明暗模式）时同步更新粒子颜色
    themeObserver = new MutationObserver(() => {
      field?.setColor(resolveBrandColor())
    })
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })
  }

  runTypewriter()
})

onBeforeUnmount(() => {
  disposed = true
  if (typeTimer) clearTimeout(typeTimer)
  field?.destroy()
  field = null
  themeObserver?.disconnect()
  themeObserver = null
  window.removeEventListener('pointermove', handlePointerMove)
  window.removeEventListener('pointerleave', handlePointerLeave)
})
</script>

<style scoped>
/* ------------------------------- 整体布局 ------------------------------- */

.custom-home {
  position: relative;
  min-height: 100vh;
  min-height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem 1.5rem;
  background: var(--vp-c-bg);
  transition: background-color 0.5s ease;
}

/* ------------------------------- 极光背景 ------------------------------- */

.bg {
  position: absolute;
  inset: 0;
  z-index: 0;
  overflow: hidden;
}

.orb {
  position: absolute;
  border-radius: 50%;
  will-change: transform;
}

.orb-1 {
  width: 52vmax;
  height: 52vmax;
  left: -14vmax;
  top: -16vmax;
  background: radial-gradient(circle, var(--vp-c-brand-1) 0%, transparent 62%);
  opacity: 0.16;
  animation: orbDrift1 26s ease-in-out infinite alternate;
}

.orb-2 {
  width: 44vmax;
  height: 44vmax;
  right: -12vmax;
  top: 6vmax;
  background: radial-gradient(circle, var(--vp-c-brand-2) 0%, transparent 62%);
  opacity: 0.13;
  animation: orbDrift2 32s ease-in-out infinite alternate;
}

.orb-3 {
  width: 46vmax;
  height: 46vmax;
  left: 18vmax;
  bottom: -18vmax;
  background: radial-gradient(circle, #22d3ee 0%, transparent 62%);
  opacity: 0.11;
  animation: orbDrift3 38s ease-in-out infinite alternate;
}

.orb-4 {
  width: 30vmax;
  height: 30vmax;
  right: 20vmax;
  bottom: -10vmax;
  background: radial-gradient(circle, #8b5cf6 0%, transparent 62%);
  opacity: 0.09;
  animation: orbDrift4 30s ease-in-out infinite alternate;
}

html.dark .orb-1 { opacity: 0.26; }
html.dark .orb-2 { opacity: 0.22; }
html.dark .orb-3 { opacity: 0.2; }
html.dark .orb-4 { opacity: 0.16; }

@keyframes orbDrift1 {
  from { transform: translate3d(0, 0, 0) scale(1); }
  to { transform: translate3d(6vmax, 4vmax, 0) scale(1.12); }
}

@keyframes orbDrift2 {
  from { transform: translate3d(0, 0, 0) scale(1.05); }
  to { transform: translate3d(-5vmax, -3vmax, 0) scale(0.95); }
}

@keyframes orbDrift3 {
  from { transform: translate3d(0, 0, 0) scale(0.95); }
  to { transform: translate3d(-4vmax, -5vmax, 0) scale(1.1); }
}

@keyframes orbDrift4 {
  from { transform: translate3d(0, 0, 0) scale(1); }
  to { transform: translate3d(-3vmax, 3vmax, 0) scale(1.15); }
}

/* 噪点纹理，增加质感 */
.grain {
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E");
  opacity: 0.04;
  mix-blend-mode: overlay;
}

/* ------------------------------- 粒子画布 ------------------------------- */

.constellation {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
}

/* ------------------------------- 鼠标柔光 ------------------------------- */

.mouse-glow {
  position: fixed;
  left: 0;
  top: 0;
  width: 560px;
  height: 560px;
  border-radius: 50%;
  pointer-events: none;
  z-index: 1;
  opacity: 0;
  background: radial-gradient(
    circle,
    color-mix(in srgb, var(--vp-c-brand-1) 9%, transparent) 0%,
    transparent 62%
  );
  transition:
    transform 0.6s cubic-bezier(0.2, 0.7, 0.3, 1),
    opacity 0.5s ease;
}

html.dark .mouse-glow {
  background: radial-gradient(
    circle,
    color-mix(in srgb, var(--vp-c-brand-1) 15%, transparent) 0%,
    transparent 62%
  );
}

/* ------------------------------- 主体内容 ------------------------------- */

.hero {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 760px;
  text-align: center;
}

.avatar-wrap {
  position: relative;
  width: 96px;
  height: 96px;
  margin: 0 auto 2rem;
  animation: rise 0.9s cubic-bezier(0.22, 0.9, 0.32, 1) 0.05s both;
}

/* 旋转的渐变光环 */
.avatar-ring {
  position: absolute;
  inset: -6px;
  border-radius: 50%;
  background: conic-gradient(
    from 0deg,
    var(--vp-c-brand-1),
    var(--vp-c-brand-2),
    var(--vp-c-brand-soft),
    var(--vp-c-brand-1)
  );
  animation: spin 6s linear infinite;
}

.avatar {
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid var(--vp-c-bg);
  box-shadow: 0 10px 34px rgba(0, 0, 0, 0.18);
}

html.dark .avatar {
  box-shadow: 0 10px 34px rgba(0, 0, 0, 0.5);
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.name {
  margin: 0;
  font-size: clamp(2.8rem, 9vw, 5rem);
  font-weight: 800;
  line-height: 1.15;
  letter-spacing: 0.08em;
  background: linear-gradient(
    100deg,
    var(--vp-c-text-1) 0%,
    var(--vp-c-brand-1) 42%,
    var(--vp-c-brand-2) 58%,
    var(--vp-c-text-1) 100%
  );
  background-size: 240% 100%;
  background-position: 0% 0%;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation:
    rise 0.9s cubic-bezier(0.22, 0.9, 0.32, 1) 0.15s both,
    nameShine 8s ease-in-out 1s infinite;
}

@keyframes nameShine {
  0%, 100% { background-position: 0% 0; }
  50% { background-position: 100% 0; }
}

.role {
  margin: 1.3rem 0 0;
  min-height: 2em;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: clamp(1.1rem, 2.6vw, 1.45rem);
  color: var(--vp-c-text-2);
  animation: rise 0.9s cubic-bezier(0.22, 0.9, 0.32, 1) 0.3s both;
}

.role-prefix {
  color: var(--vp-c-brand-1);
  font-weight: 700;
  margin-right: 0.5rem;
}

.role-type {
  letter-spacing: 0.04em;
}

.role-cursor {
  display: inline-block;
  width: 3px;
  height: 1.15em;
  margin-left: 5px;
  flex: 0 0 auto;
  border-radius: 2px;
  background: var(--vp-c-brand-1);
  animation: blink 1.1s step-end infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

.tagline {
  margin: 1.1rem auto 0;
  max-width: 560px;
  font-size: 1.05rem;
  line-height: 1.8;
  color: var(--vp-c-text-2);
  animation: rise 0.9s cubic-bezier(0.22, 0.9, 0.32, 1) 0.45s both;
}

.actions {
  margin-top: 2.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
  animation: rise 0.9s cubic-bezier(0.22, 0.9, 0.32, 1) 0.6s both;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 132px;
  padding: 0.72rem 1.7rem;
  border-radius: 999px;
  font-size: 0.98rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-decoration: none;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease,
    border-color 0.3s ease,
    color 0.3s ease,
    background-color 0.3s ease;
}

.btn-primary {
  background: var(--vp-button-brand-bg, var(--vp-c-brand-1));
  color: var(--vp-button-brand-text, #fff);
  box-shadow: 0 8px 24px color-mix(in srgb, var(--vp-c-brand-1) 30%, transparent);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 30px color-mix(in srgb, var(--vp-c-brand-1) 42%, transparent);
}

.btn-ghost {
  border: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-1);
  background: transparent;
  backdrop-filter: blur(8px);
}

.btn-ghost:hover {
  transform: translateY(-2px);
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
  box-shadow: 0 8px 22px rgba(0, 0, 0, 0.06);
}

.socials {
  margin-top: 2.6rem;
  display: flex;
  justify-content: center;
  gap: 1.1rem;
  animation: rise 0.9s cubic-bezier(0.22, 0.9, 0.32, 1) 0.75s both;
}

.social {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-2);
  transition: all 0.3s ease;
}

.social svg {
  width: 18px;
  height: 18px;
  fill: currentColor;
}

.social:hover {
  color: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
  transform: translateY(-3px);
  box-shadow: 0 8px 20px color-mix(in srgb, var(--vp-c-brand-1) 18%, transparent);
}

/* ------------------------------- 入场动画 ------------------------------- */

@keyframes rise {
  from {
    opacity: 0;
    transform: translateY(26px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ------------------------------- 滚动提示 ------------------------------- */

.scroll-hint {
  position: absolute;
  left: 50%;
  bottom: 1.5rem;
  z-index: 2;
  width: 24px;
  height: 38px;
  margin-left: -12px;
  border: 1.5px solid var(--vp-c-text-3);
  border-radius: 14px;
  animation: rise 0.9s cubic-bezier(0.22, 0.9, 0.32, 1) 1s both;
}

.scroll-hint::after {
  content: '';
  position: absolute;
  left: 50%;
  top: 7px;
  width: 3px;
  height: 8px;
  margin-left: -1.5px;
  border-radius: 2px;
  background: var(--vp-c-brand-1);
  animation: scrollDot 1.8s ease-in-out infinite;
}

@keyframes scrollDot {
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  70% {
    transform: translateY(13px);
    opacity: 0;
  }
  100% {
    transform: translateY(13px);
    opacity: 0;
  }
}

/* ------------------------------- 响应式 ------------------------------- */

@media (max-width: 640px) {
  .custom-home {
    padding: 3rem 1.25rem;
  }

  .avatar-wrap {
    width: 80px;
    height: 80px;
  }

  .scroll-hint {
    display: none;
  }
}

/* 弱化动态效果偏好 */
@media (prefers-reduced-motion: reduce) {
  .orb,
  .avatar-ring,
  .name,
  .role-cursor,
  .scroll-hint::after {
    animation: none !important;
  }

  .avatar-wrap,
  .name,
  .role,
  .tagline,
  .actions,
  .socials,
  .scroll-hint {
    animation: none !important;
  }
}
</style>
