import { onMount } from 'svelte'
import { url } from '@utils/url-utils.ts'
import { i18n } from '@i18n/translation'
import I18nKey from '@i18n/i18nKey'
const keywordDesktop = ''
const keywordMobile = ''
let result = []
const fakeResult = [
  {
    url: url('/'),
    meta: {
      title: 'This Is a Fake Search Result',
    },
    excerpt:
      'Because the search cannot work in the <mark>dev</mark> environment.',
  },
  {
    url: url('/'),
    meta: {
      title: 'If You Want to Test the Search',
    },
    excerpt: 'Try running <mark>npm build && npm preview</mark> instead.',
  },
]

let search = (keyword: string, isDesktop: boolean) => {}

onMount(() => {
  search = async (keyword: string, isDesktop: boolean) => {
    const panel = document.getElementById('search-panel')
    if (!panel) return

    if (!keyword && isDesktop) {
      panel.classList.add('float-panel-closed')
      return
    }

    let arr = []
    if (import.meta.env.PROD) {
      const ret = await pagefind.search(keyword)
      for (const item of ret.results) {
        arr.push(await item.data())
      }
    } else {
      // Mock data for non-production environment
      // arr = JSON.parse('[{"url":"/","content":"Simple Guides for Fuwari. Cover image source: Source. This blog template is built with Astro. For the things that are not mentioned in this guide, you may find the answers in the Astro Docs. Front-matter of Posts. --- title: My First Blog Post published: 2023-09-09 description: This is the first post of my new Astro blog. image: ./cover.jpg tags: [Foo, Bar] category: Front-end draft: false ---AttributeDescription title. The title of the post. published. The date the post was published. description. A short description of the post. Displayed on index page. image. The cover image path of the post. 1. Start with http:// or https://: Use web image 2. Start with /: For image in public dir 3. With none of the prefixes: Relative to the markdown file. tags. The tags of the post. category. The category of the post. draft. If this post is still a draft, which won’t be displayed. Where to Place the Post Files. Your post files should be placed in src/content/posts/ directory. You can also create sub-directories to better organize your posts and assets. src/content/posts/ ├── post-1.md └── post-2/ ├── cover.png └── index.md.","word_count":187,"filters":{},"meta":{"title":"This Is a Fake Search Result"},"anchors":[{"element":"h2","id":"front-matter-of-posts","text":"Front-matter of Posts","location":34},{"element":"h2","id":"where-to-place-the-post-files","text":"Where to Place the Post Files","location":151}],"weighted_locations":[{"weight":10,"balanced_score":57600,"location":3}],"locations":[3],"raw_content":"Simple Guides for Fuwari. Cover image source: Source. This blog template is built with Astro. For the things that are not mentioned in this guide, you may find the answers in the Astro Docs. Front-matter of Posts. --- title: My First Blog Post published: 2023-09-09 description: This is the first post of my new Astro blog. image: ./cover.jpg tags: [Foo, Bar] category: Front-end draft: false ---AttributeDescription title. The title of the post. published. The date the post was published. description. A short description of the post. Displayed on index page. image. The cover image path of the post. 1. Start with http:// or https://: Use web image 2. Start with /: For image in public dir 3. With none of the prefixes: Relative to the markdown file. tags. The tags of the post. category. The category of the post. draft. If this post is still a draft, which won’t be displayed. Where to Place the Post Files. Your post files should be placed in src/content/posts/ directory. You can also create sub-directories to better organize your posts and assets. src/content/posts/ ├── post-1.md └── post-2/ ├── cover.png └── index.md.","raw_url":"/posts/guide/","excerpt":"Because the search cannot work in the <mark>dev</mark> environment.","sub_results":[{"title":"Simple Guides for Fuwari - Fuwari","url":"/posts/guide/","weighted_locations":[{"weight":10,"balanced_score":57600,"location":3}],"locations":[3],"excerpt":"Simple Guides for <mark>Fuwari.</mark> Cover image source: Source. This blog template is built with Astro. For the things that are not mentioned in this guide, you may find the answers"}]},{"url":"/","content":"About. This is the demo site for Fuwari. Sources of images used in this site. Unsplash. 星と少女 by Stella. Rabbit - v1.4 Showcase by Rabbit_YourMajesty.","word_count":25,"filters":{},"meta":{"title":"If You Want to Test the Search"},"anchors":[{"element":"h1","id":"about","text":"About","location":0},{"element":"h3","id":"sources-of-images-used-in-this-site","text":"Sources of images used in this site","location":8}],"weighted_locations":[{"weight":1,"balanced_score":576,"location":7}],"locations":[7],"raw_content":"About. This is the demo site for Fuwari. Sources of images used in this site. Unsplash. 星と少女 by Stella. Rabbit - v1.4 Showcase by Rabbit_YourMajesty.","raw_url":"/about/","excerpt":"Try running <mark>npm build && npm preview</mark> instead.","sub_results":[{"title":"About","url":"/about/#about","anchor":{"element":"h1","id":"about","text":"About","location":0},"weighted_locations":[{"weight":1,"balanced_score":576,"location":7}],"locations":[7],"excerpt":"About. This is the demo site for <mark>Fuwari.</mark>"}]}]')
      arr = fakeResult
    }

    if (!arr.length && isDesktop) {
      panel.classList.add('float-panel-closed')
      return
    }

    if (isDesktop) {
      panel.classList.remove('float-panel-closed')
    }
    result = arr
  }
})

const togglePanel = () => {
  const panel = document.getElementById('search-panel')
  panel?.classList.toggle('float-panel-closed')
}

$: search(keywordDesktop, true)
$: search(keywordMobile, false)
