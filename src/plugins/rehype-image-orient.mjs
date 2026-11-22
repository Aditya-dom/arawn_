import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'
import { visit } from 'unist-util-visit'

/* Tags each local markdown image as portrait or landscape so CSS can give every
   portrait one identical width. Capping height instead makes the rendered width
   depend on each photo's exact ratio, which leaves the column edge ragged. */
const addClass = (node, name) => {
  const c = node.properties.className
  node.properties.className = Array.isArray(c) ? [...c, name] : c ? [c, name] : [name]
}

export function rehypeImageOrient() {
  return async (tree, file) => {
    const mdPath = file?.history?.[0] ?? file?.path
    if (!mdPath) return
    const dir = path.dirname(mdPath)
    const jobs = []

    visit(tree, 'element', node => {
      if (node.tagName !== 'img') return
      node.properties = node.properties || {}
      // `![alt](src "small")` / `"xsmall"` opt a single image into a narrower
      // width. The title is stripped so it never shows as a browser tooltip.
      const SIZES = { small: 'img-small', xsmall: 'img-xsmall' }
      const sizeClass = SIZES[node.properties.title]
      if (sizeClass) {
        addClass(node, sizeClass)
        node.properties.title = undefined
      }

      const { width: w, height: h } = node.properties
      // Dimensions already resolved upstream: use them, no disk read needed.
      // A square is treated as portrait; at full column width it is far too tall.
      if (Number(w) > 0 && Number(h) > 0) {
        addClass(node, Number(h) >= Number(w) ? 'img-portrait' : 'img-landscape')
        return
      }
      const src = node.properties.src
      if (typeof src !== 'string' || /^(https?:|data:|\/)/.test(src)) return
      jobs.push(
        (async () => {
          const abs = path.resolve(dir, decodeURIComponent(src.split('?')[0]))
          if (!fs.existsSync(abs)) return
          try {
            const m = await sharp(abs).metadata()
            let [mw, mh] = [m.width, m.height]
            if (m.orientation && m.orientation >= 5) [mw, mh] = [mh, mw]
            if (mw > 0 && mh > 0) addClass(node, mh >= mw ? 'img-portrait' : 'img-landscape')
          } catch {}
        })(),
      )
    })

    if (jobs.length) await Promise.all(jobs)
  }
}
