import fs from 'node:fs'
import path from 'node:path'
import { createServer } from 'vite'
import { routes } from './generate-seo-pages.mjs'

const distDir = path.resolve('dist')

async function main() {
  const vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
  })

  try {
    const { render } = await vite.ssrLoadModule('/src/entry-server.tsx')

    for (const route of routes) {
      const targetDir = route.path === '/' ? distDir : path.join(distDir, route.path.slice(1))
      const filePath = path.join(targetDir, 'index.html')
      if (!fs.existsSync(filePath)) continue

      const appHtml = render(route.path)
      const html = fs.readFileSync(filePath, 'utf8')
      if (!html.includes('<div id="root"></div>')) {
        console.warn(`[prerender] ${route.path}: expected empty root div not found, skipping`)
        continue
      }
      fs.writeFileSync(filePath, html.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`))
      console.log(`[prerender] ${route.path} -> ${appHtml.length} bytes`)
    }
  } finally {
    await vite.close()
  }
}

main().catch((err) => {
  console.warn('[prerender] skipped due to an error (site will still deploy with prior SEO fixes intact):', err)
})
