import fs from 'node:fs'
import path from 'node:path'

const distDir = path.resolve('dist')
const indexPath = path.join(distDir, 'index.html')
const html = fs.readFileSync(indexPath, 'utf8')
const lastmod = '2026-07-09'

const routes = [
  {
    path: '/',
    title: 'Vextor | Salesforce Consulting, BuilderTek Support and Automation',
    description:
      'Vextor helps project-based teams design, automate, and scale Salesforce with BuilderTek specialization, integrations, custom development, and managed support.',
  },
  {
    path: '/services',
    title: 'Services | Vextor Salesforce Consulting and BuilderTek Support',
    description:
      'Salesforce architecture, automation, Apex and LWC development, integrations, managed support, and BuilderTek specialization from Vextor.',
  },
  {
    path: '/industries',
    title: 'Industries | Vextor for Construction, Real Estate and Operations Teams',
    description:
      'Vextor supports construction, real estate, and operations-heavy teams with Salesforce consulting and BuilderTek workflow specialization.',
  },
  {
    path: '/work',
    title: 'Work | Vextor Salesforce Engagement Patterns',
    description:
      'See how Vextor approaches Salesforce automation, BuilderTek delivery, integrations, and long-term support for project-based businesses.',
  },
  {
    path: '/about',
    title: 'About Vextor | Salesforce Consulting and BuilderTek Expertise',
    description:
      'Learn how Vextor designs scalable Salesforce systems with strong architecture, process automation, integration depth, and BuilderTek expertise.',
  },
  {
    path: '/contact',
    title: 'Contact Vextor | Salesforce Consultation',
    description:
      'Contact Vextor for Salesforce consulting, BuilderTek support, integrations, automation planning, and managed platform delivery.',
  },
]

function escapeJson(value) {
  return JSON.stringify(value)
}

function buildPage(route) {
  const url = `https://vextor.co${route.path === '/' ? '/' : route.path}`
  const pageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: route.title,
    description: route.description,
    url,
    isPartOf: 'https://vextor.co/#website',
    about: 'https://vextor.co/#service',
  }

  let out = html
    .replace(/<title>.*?<\/title>/s, `<title>${route.title}</title>`)
    .replace(/<meta\s+name="description"\s+content=".*?"\s*\/>/s, `<meta name="description" content="${route.description}" />`)
    .replace(/<link\s+rel="canonical"\s+href=".*?"\s*\/>/s, `<link rel="canonical" href="${url}" />`)
    .replace(/<meta\s+property="og:title"\s+content=".*?"\s*\/>/s, `<meta property="og:title" content="${route.title}" />`)
    .replace(/<meta\s+property="og:description"\s+content=".*?"\s*\/>/s, `<meta property="og:description" content="${route.description}" />`)
    .replace(/<meta\s+property="og:url"\s+content=".*?"\s*\/>/s, `<meta property="og:url" content="${url}" />`)
    .replace(/<meta\s+name="twitter:title"\s+content=".*?"\s*\/>/s, `<meta name="twitter:title" content="${route.title}" />`)
    .replace(/<meta\s+name="twitter:description"\s+content=".*?"\s*\/>/s, `<meta name="twitter:description" content="${route.description}" />`)

  out = out.replace(
    '</head>',
    `    <script type="application/ld+json">${escapeJson(pageSchema)}</script>\n  </head>`
  )

  const targetDir = route.path === '/' ? distDir : path.join(distDir, route.path.slice(1))
  fs.mkdirSync(targetDir, { recursive: true })
  fs.writeFileSync(path.join(targetDir, 'index.html'), out)
}

for (const route of routes) buildPage(route)

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes
  .map((route, index) => `  <url>\n    <loc>https://vextor.co${route.path === '/' ? '/' : route.path}</loc>\n    <changefreq>${index === 0 ? 'weekly' : 'monthly'}</changefreq>\n    <priority>${index === 0 ? '1.0' : index < 3 ? '0.9' : '0.8'}</priority>\n    <lastmod>${lastmod}</lastmod>\n  </url>`)
  .join('\n')}\n</urlset>\n`
fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemap)
