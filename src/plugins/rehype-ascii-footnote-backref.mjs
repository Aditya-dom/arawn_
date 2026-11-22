import { visit } from 'unist-util-visit'

/* remark-gfm emits U+21A9 (↩) as the footnote back-link text, which many
   platforms render as a colour emoji. Replace it with plain ASCII. */
const BACKREF_CLASS = 'data-footnote-backref'
const LABEL = '^'

export function rehypeAsciiFootnoteBackref() {
  return tree => {
    visit(tree, 'element', node => {
      if (node.tagName !== 'a') return
      const cls = node.properties?.className
      const isBackref = Array.isArray(cls)
        ? cls.includes(BACKREF_CLASS)
        : cls === BACKREF_CLASS
      if (!isBackref) return
      node.children = [{ type: 'text', value: LABEL }]
    })
  }
}
