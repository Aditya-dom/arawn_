import { getCollection } from 'astro:content'
import rss from '@astrojs/rss'
import MarkdownIt from 'markdown-it'
import sanitizeHtml from 'sanitize-html'
const parser = new MarkdownIt()

export async function GET(context) {
  const blog = await getCollection('blog')
  return rss({
    title: 'Arawn’s Blog',
    description: 'We live by the Code & was raised by ethics.',
    site: context.site,
    items: blog.map(post => ({
      link: `/blog/${post.slug}/`,
      // Note: this will not process components or JSX expressions in MDX files.
      content: sanitizeHtml(parser.render(post.body), {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
      }),
      ...post.data,
    })),
  })
}
