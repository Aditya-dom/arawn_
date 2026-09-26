import { visit } from 'unist-util-visit'

/* Machine translators (browser-native, Google Translate, LLM passes) walk text
   nodes indiscriminately: they rewrite identifiers inside code and shred the
   span soup KaTeX emits, which breaks rendering outright. Marking these
   subtrees opts them out across every translator. Must run after rehypeKatex
   so the .katex elements exist. */

const hasClass = (node, name) => {
  const className = node.properties?.className
  if (!className) return false
  return Array.isArray(className)
    ? className.includes(name)
    : String(className).split(/\s+/).includes(name)
}

const isCode = node => node.tagName === 'code' || node.tagName === 'pre'

const isMath = node =>
  hasClass(node, 'katex') ||
  hasClass(node, 'katex-display') ||
  hasClass(node, 'math')

export function rehypeNoTranslate() {
  return tree => {
    visit(tree, 'element', node => {
      if (!isCode(node) && !isMath(node)) return

      node.properties = node.properties || {}
      node.properties.translate = 'no'

      const className = node.properties.className
      if (Array.isArray(className)) {
        if (!className.includes('notranslate')) className.push('notranslate')
      } else if (className) {
        node.properties.className = `${className} notranslate`
      } else {
        node.properties.className = ['notranslate']
      }
    })
  }
}
