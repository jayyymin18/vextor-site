import fs from 'node:fs'
import path from 'node:path'

const distDir = path.resolve('dist')
const indexPath = path.join(distDir, 'index.html')
const html = fs.readFileSync(indexPath, 'utf8')
const lastmod = '2026-07-10'
const siteUrl = 'https://www.vextor.co'

const routes = [
  {
    path: '/',
    pageType: 'WebPage',
    title: 'Vextor | Salesforce Consulting & BuilderTek Specialists',
    description:
      'Ahmedabad-based Salesforce consulting for project-driven teams, with BuilderTek specialization, automation, integrations, and managed support for operational scale.',
    faq: [
      {
        question: 'What does Vextor specialize in?',
        answer:
          'Vextor specializes in Salesforce consulting for project-based businesses, with dedicated BuilderTek support, workflow automation, integrations, and long-term platform ownership.',
      },
      {
        question: 'Is Vextor a fit for BuilderTek teams?',
        answer:
          'Yes. Vextor works with BuilderTek-heavy teams that need implementation cleanup, procurement and approval workflow support, reporting clarity, and better day-to-day usability.',
      },
      {
        question: 'Where is Vextor based?',
        answer:
          'Vextor is based in Ahmedabad, Gujarat, and supports teams remotely across India and international project-based operations environments.',
      },
    ],
  },
  {
    path: '/services',
    pageType: 'CollectionPage',
    title: 'Salesforce Consulting Services | Architecture, Automation & BuilderTek | Vextor',
    description:
      'Ahmedabad-based Salesforce consulting services for architecture, workflow automation, BuilderTek support, integrations, Apex development, and managed delivery for project-based teams.',
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
    extraSchemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Salesforce Consulting Services',
        serviceType: [
          'Salesforce architecture',
          'Salesforce automation',
          'BuilderTek support',
          'Apex development',
          'Lightning Web Components',
          'Salesforce integrations',
          'Managed Salesforce support',
        ],
        provider: {
          '@id': `${siteUrl}/#organization`,
        },
        areaServed: 'Worldwide',
      },
    ],
  },
  {
    path: '/industries',
    pageType: 'CollectionPage',
    title: 'Salesforce for Construction, Real Estate & Project Teams | Vextor',
    description:
      'Industry-focused Salesforce consulting for construction, real estate, BuilderTek, and project-based operations teams that need stronger workflow control and system reliability.',
    faq: [
      {
        question: 'Which industries are the best fit for Vextor?',
        answer:
          'Vextor is best aligned with construction, real estate, project delivery, field operations, and other businesses where Salesforce supports approvals, execution tracking, and multi-team coordination.',
      },
      {
        question: 'Do you only work with BuilderTek customers?',
        answer:
          'No. BuilderTek is a specialization, not a requirement. Vextor also supports Salesforce environments that need architecture, automation, integrations, and operational process design outside BuilderTek.',
      },
      {
        question: 'What makes project-based operations different from standard CRM work?',
        answer:
          'Project-based teams usually depend on Salesforce for procurement, handoffs, billing triggers, visibility, and operational control. That requires stronger architecture and workflow design than a basic CRM implementation.',
      },
    ],
    extraSchemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'Industries Vextor Supports',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Construction' },
          { '@type': 'ListItem', position: 2, name: 'Real Estate' },
          { '@type': 'ListItem', position: 3, name: 'Project-Based Operations Teams' },
        ],
      },
    ],
  },
  {
    path: '/work',
    pageType: 'CollectionPage',
    title: 'Vextor Work | Salesforce Delivery for Project-Based Operations',
    description:
      'See how Vextor approaches Salesforce automation, BuilderTek delivery, integrations, and long-term support for project-based businesses.',
  },
  {
    path: '/about',
    pageType: 'AboutPage',
    title: 'About Vextor | Salesforce & BuilderTek Consulting Experts',
    description:
      'Learn how Ahmedabad-based Vextor designs scalable Salesforce systems with strong architecture, process automation, integration depth, and BuilderTek expertise.',
  },
  {
    path: '/contact',
    pageType: 'ContactPage',
    title: 'Contact Vextor | Salesforce & BuilderTek Consultation in Ahmedabad',
    description:
      'Contact Vextor for Salesforce consulting, BuilderTek support, automation planning, integrations, and long-term platform guidance for project-based teams.',
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
  {
    path: '/thank-you',
    pageType: 'WebPage',
    title: 'Thank You | Vextor',
    description: 'Thank you for contacting Vextor. Your inquiry has been received and the team will contact you soon.',
    noindex: true,
    includeInSitemap: false,
  },
]

function escapeJson(value) {
  return JSON.stringify(value)
}

function buildPage(route) {
  const url = `${siteUrl}${route.path === '/' ? '/' : route.path}`
  const pageSchema = {
    '@context': 'https://schema.org',
    '@type': route.pageType || 'WebPage',
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
  const extraSchemas = route.extraSchemas ?? []

  let out = html
    .replace(/<title>.*?<\/title>/s, `<title>${route.title}</title>`)
    .replace(/<meta\s+name="description"\s+content=".*?"\s*\/>/s, `<meta name="description" content="${route.description}" />`)
    .replace(
      /<meta\s+name="robots"\s+content=".*?"\s*\/>/s,
      `<meta name="robots" content="${
        route.noindex ? 'noindex,nofollow' : 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1'
      }" />`
    )
    .replace(
      /<meta\s+name="googlebot"\s+content=".*?"\s*\/>/s,
      `<meta name="googlebot" content="${
        route.noindex ? 'noindex,nofollow' : 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1'
      }" />`
    )
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
    }${extraSchemas.map((schema) => `    <script type="application/ld+json">${escapeJson(schema)}</script>\n`).join('')}  </head>`
  )

  const targetDir = route.path === '/' ? distDir : path.join(distDir, route.path.slice(1))
  fs.mkdirSync(targetDir, { recursive: true })
  fs.writeFileSync(path.join(targetDir, 'index.html'), out)
}

for (const route of routes) buildPage(route)

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes
  .filter((route) => route.includeInSitemap !== false)
  .map((route, index) => `  <url>\n    <loc>${siteUrl}${route.path === '/' ? '/' : route.path}</loc>\n    <changefreq>${index === 0 ? 'weekly' : 'monthly'}</changefreq>\n    <priority>${index === 0 ? '1.0' : index < 3 ? '0.9' : '0.8'}</priority>\n    <lastmod>${lastmod}</lastmod>\n  </url>`)
  .join('\n')}\n</urlset>\n`
fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemap)
