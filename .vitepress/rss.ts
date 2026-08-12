import { writeFileSync } from 'node:fs'
import path from 'node:path'
import { Feed } from 'feed'
import { createContentLoader, type SiteConfig } from 'vitepress'
import type { Plugin } from 'vite'

const siteUrl = 'https://chenleicode.top'

function sanitizePostHtml(html: string) {
  return html
    .replace(/^\s*<h1(?:\s[^>]*)?>[\s\S]*?<\/h1>\s*/i, '')
    .replace(
      /[ \t]*<a\b[^>]*\bclass=(?:"[^"]*\bheader-anchor\b[^"]*"|'[^']*\bheader-anchor\b[^']*')[^>]*>[\s\S]*?<\/a>/gi,
      ''
    )
}

function createFeed() {
  return new Feed({
    title: '陈磊',
    description: '陈磊的个人网站',
    id: siteUrl,
    link: siteUrl,
    language: 'zh-CN',
    copyright: '陈磊',
    author: {
      name: '陈磊',
      link: siteUrl
    }
  })
}

async function loadPosts(render: boolean) {
  const posts = await createContentLoader('posts/*.md', {
    render
  }).load()

  return posts
    .filter(({ url }) => url !== '/posts/' && url !== '/posts')
    .sort((a, b) => {
      const dateA = new Date(a.frontmatter.date)
      const dateB = new Date(b.frontmatter.date)
      return dateB.getTime() - dateA.getTime()
    })
}

export async function generateRSS(config: SiteConfig) {
  const feed = createFeed()
  const filteredPosts = await loadPosts(true)

  for (const { url, frontmatter, html } of filteredPosts) {
    feed.addItem({
      title: frontmatter.title,
      id: `${siteUrl}${url}`,
      link: `${siteUrl}${url}`,
      date: new Date(frontmatter.date),
      content: sanitizePostHtml(html)
    })
  }

  writeFileSync(path.join(config.outDir, 'feed.xml'), feed.rss2())
}

export function rssDevPlugin(): Plugin {
  return {
    name: 'rss-dev-server',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url !== '/feed.xml') return next()

        const feed = createFeed()
        const filteredPosts = await loadPosts(true)

        for (const { url, frontmatter, html } of filteredPosts) {
          feed.addItem({
            title: frontmatter.title,
            id: `${siteUrl}${url}`,
            link: `${siteUrl}${url}`,
            date: new Date(frontmatter.date),
            content: sanitizePostHtml(html)
          })
        }

        res.setHeader('Content-Type', 'application/xml')
        res.end(feed.rss2())
      })
    }
  }
}
