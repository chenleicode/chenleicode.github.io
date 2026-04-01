import { createContentLoader } from 'vitepress'

function parsePostDate(value, url) {
  if (typeof value !== 'string') {
    throw new Error(`Post "${url}" is missing a valid string date in frontmatter.`)
  }

  const match = value.match(/^(\d{4})-(\d{2})-(\d{2})$/)

  if (!match) {
    throw new Error(`Post "${url}" has an invalid date "${value}". Expected YYYY-MM-DD.`)
  }

  const [, year, month, day] = match
  const parsedDate = new Date(Date.UTC(Number(year), Number(month) - 1, Number(day)))

  if (
    parsedDate.getUTCFullYear() !== Number(year) ||
    parsedDate.getUTCMonth() + 1 !== Number(month) ||
    parsedDate.getUTCDate() !== Number(day)
  ) {
    throw new Error(`Post "${url}" has a non-existent date "${value}".`)
  }

  return {
    year,
    sortKey: Number(`${year}${month}${day}`),
    display: `${year}.${month}.${day}`
  }
}

export default createContentLoader('posts/*.md', {
  transform(rawPosts) {
    return rawPosts
      .map(({ url, frontmatter }) => {
        const { title, date } = frontmatter

        if (typeof title !== 'string' || !title.trim()) {
          throw new Error(`Post "${url}" is missing a title in frontmatter.`)
        }

        const parsedDate = parsePostDate(date, url)

        return {
          title: title.trim(),
          url,
          relativePath: `${url.replace(/^\//, '')}.md`,
          date: parsedDate.display,
          year: parsedDate.year,
          sortKey: parsedDate.sortKey
        }
      })
      .sort((a, b) => b.sortKey - a.sortKey)
  }
})
