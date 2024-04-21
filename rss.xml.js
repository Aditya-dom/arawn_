import rss, { pagesGlobToRssItems } from '@astrojs/rss'

export async function GET(context) {
  return rss({
    title: "Arawn's Blog",
    description: 'We live by the code & was raised by the code.',
    site: context.site,
    items: await pagesGlobToRssItems(import.meta.glob('./**/*.md')),
    customData: `<language>en-us</language>`,
  })
}
