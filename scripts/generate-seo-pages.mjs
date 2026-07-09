import fs from 'node:fs'
import path from 'node:path'

const distDir = path.resolve('dist')
const indexPath = path.join(distDir, 'index.html')
const html = fs.readFileSync(indexPath, 'utf8')
const lastmod = '2026-07-09'
const siteUrl = 'https://www.vextor.co'

const routes = [
  {
    path: '/',
    title: 'Salesforce Consulting for Project-Based Teams | Vextor',
    description:
      'Salesforce consulting, BuilderTek support, automation, and integrations for project-based teams that need cleaner delivery and stronger operational control.',
  },
  {
    path: '/services',
    title: 'Salesforce Consulting Services, BuilderTek Support & Automation | Vextor',
    description:
      'Salesforce architecture, BuilderTek support, automation, Apex and Lightning development, integrations, and managed support for project-based operations teams.',
    faq: [
      {
        question: 'What Salesforce services does Vextor provide?',
        answer:
          'Vextor provides Salesforce architecture, implementation planning, automation, Apex and Lightning development, integrations, managed support, and BuilderTek specialization for project-based teams.',
      },
      {
        question: 'Do you support BuilderTek implementations and cleanup?',
        answer:
          'Yes. We handle new BuilderTek implementations, inherited org cleanup, workflow redesign, usability improvements, and ongoing support for operational teams already running BuilderTek.',
      },
      {
        question: 'Can Vextor support both engineering and long-term admin work?',
        answer:
          'Yes. Engagements can include architecture, custom development, integration work, release management, reporting improvements, and ongoing operational support after launch.',
      },
    ],
  },
  {
    path: '/industries',
    title: 'Salesforce for Construction, Real Estate & Project Operations | Vextor',
    description:
      'Vextor supports construction, real estate, and operations-heavy teams with Salesforce consulting and BuilderTek workflow specialization.',
  },
  {
    path: '/work',
    title: 'Salesforce Delivery for Project-Based Operations | Vextor',
    description:
      'See how Vextor approaches Salesforce automation, BuilderTek delivery, integrations, and long-term support for project-based businesses.',
  },
  {
    path: '/about',
    title: 'About Vextor | Salesforce & BuilderTek Consulting Experts',
    description:
      'Learn how Vextor designs scalable Salesforce systems with strong architecture, process automation, integration depth, and BuilderTek expertise.',
  },
  {
    path: '/contact',
    title: 'Book a Salesforce Consultation | Vextor',
    description:
      'Book a Salesforce consultation with Vextor for architecture, BuilderTek support, integrations, automation planning, and managed platform delivery.',
    faq: [
      {
        question: 'What should I include before booking a Salesforce consultation?',
        answer:
          'The most useful starting point is your current Salesforce setup, the operational problem you want to solve, whether BuilderTek is involved, and any timeline or delivery pressure you are working against.',
      },
      {
        question: 'Do you work with teams outside Ahmedabad?',
        answer:
          'Yes. Vextor supports teams remotely and can work with businesses across India and international teams that need Salesforce consulting, BuilderTek support, and long-term operational guidance.',
      },
      {
        question: 'How quickly does Vextor respond to new inquiries?',
        answer:
          'New inquiries are reviewed directly so the next conversation can focus on scope, operational context, and the most practical engagement path rather than a generic intake process.',
      },
    ],
  },
]

function escapeJson(value) {
  return JSON.stringify(value)
}

function buildPage(route) {
  const url = `${siteUrl}${route.path === '/' ? '/' : route.path}`
  const pageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: route.title,
    description: route.description,
    url,
    isPartOf: `${siteUrl}/#website`,
    about: `${siteUrl}/#service`,
  }
  const faqSchema = route.faq
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: route.faq.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      }
    : null

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
    `    <script type="application/ld+json">${escapeJson(pageSchema)}</script>\n${
      faqSchema ? `    <script type="application/ld+json">${escapeJson(faqSchema)}</script>\n` : ''
    }  </head>`
  )

  const targetDir = route.path === '/' ? distDir : path.join(distDir, route.path.slice(1))
  fs.mkdirSync(targetDir, { recursive: true })
  fs.writeFileSync(path.join(targetDir, 'index.html'), out)
}

for (const route of routes) buildPage(route)

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes
  .map((route, index) => `  <url>\n    <loc>${siteUrl}${route.path === '/' ? '/' : route.path}</loc>\n    <changefreq>${index === 0 ? 'weekly' : 'monthly'}</changefreq>\n    <priority>${index === 0 ? '1.0' : index < 3 ? '0.9' : '0.8'}</priority>\n    <lastmod>${lastmod}</lastmod>\n  </url>`)
  .join('\n')}\n</urlset>\n`
fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemap)
