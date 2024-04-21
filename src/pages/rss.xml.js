import rss, { pagesGlobToRssItems } from '@astrojs/rss'

export async function GET(context) {
  return rss({
    title: 'Arawn’s Blog',
    description: 'We live by the code & was raised by the ethics.',
    site: context.site,
    items: await pagesGlobToRssItems(import.meta.glob('./blog/*.{md,mdx}')),
  })
}
