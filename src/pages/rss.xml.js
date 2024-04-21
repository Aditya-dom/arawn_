import rss from '@astrojs/rss'

import { formatBlogPosts } from '../content/posts'

const postImportResult = import.meta.glob('./blog/**/*.md', { eager: true })
const posts = formatBlogPosts(Object.values(postImportResult))

export const get = () =>
  rss({
    title: "Arawn's Blog",
    description: 'We live by the code & was raised by ethics.',
    site: import.meta.env.SITE,
    items: posts.map(post => ({
      link: post.url,
      title: post.frontmatter.title,
      pubDate: post.frontmatter.date,
      description: post.frontmatter.description,
      customData: `
      <author>${post.frontmatter.author}</author>
    `,
    })),
  })
