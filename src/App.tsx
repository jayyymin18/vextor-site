import React, { useEffect, useState } from 'react'
import { Link, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  CalendarCheck2,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  Code2,
  Compass,
  Database,
  HardHat,
  Instagram,
  LandPlot,
  Layers3,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Facebook,
  Route as RouteIcon,
  Settings2,
  ShieldCheck,
  Twitter,
  Users,
  Wrench,
  X,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

type SalesforceService = {
  title: string
  summary: string
  challenges: string[]
  included: string[]
  outcomes: string
}

const navItems = [
  { label: 'Services', to: '/services' },
  { label: 'Industries', to: '/industries' },
  { label: 'Work', to: '/work' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

const salesforceServices: SalesforceService[] = [
  {
    title: 'Salesforce Consulting and Roadmapping',
    summary:
      'Advisory support for platform direction, delivery planning, and operational priorities across teams.',
    challenges: [
      'Roadmaps that are unclear or constantly shifting',
      'Competing stakeholder requests with no delivery framework',
      'Implementation choices that create rework later',
    ],
    included: [
      'Current-state review and priority mapping',
      'Delivery roadmap tied to business workflows',
      'Release planning and governance model',
    ],
    outcomes: 'Clear execution priorities, faster decisions, and less roadmap drift.',
  },
  {
    title: 'Salesforce Architecture and Platform Design',
    summary:
      'Architecture for data, security, and automation boundaries so the org remains stable as complexity grows.',
    challenges: [
      'Inconsistent data model and reporting trust gaps',
      'Permission and sharing friction between departments',
      'Automation conflicts that slow release cycles',
    ],
    included: [
      'Data model and process boundary design',
      'Security, access, and visibility strategy',
      'Architecture guardrails for future development',
    ],
    outcomes: 'A platform foundation built for long-term reliability.',
  },
  {
    title: 'Automation and Workflow Engineering',
    summary:
      'Workflow design and implementation that remove manual bottlenecks and improve process control.',
    challenges: [
      'Approval chains that stall key decisions',
      'Manual handoffs causing data quality issues',
      'Lack of process visibility across operations',
    ],
    included: [
      'Process mapping and automation logic design',
      'Flow implementation with exception handling',
      'Operational dashboards for throughput and SLA tracking',
    ],
    outcomes: 'Cleaner execution, stronger accountability, and fewer process delays.',
  },
  {
    title: 'Custom Development (Apex and LWC)',
    summary:
      'Custom engineering for business-critical workflows that exceed native configuration limits.',
    challenges: [
      'Complex business rules not supported by standard setup',
      'Slow UI patterns for high-frequency users',
      'Feature requests that need maintainable custom logic',
    ],
    included: [
      'Apex service layer design and implementation',
      'LWC interfaces for role-specific user workflows',
      'Code quality controls and deployment discipline',
    ],
    outcomes: 'Faster user workflows with maintainable platform customizations.',
  },
  {
    title: 'Integration Engineering',
    summary:
      'System integration design and delivery for reliable data exchange across finance, ERP, and project systems.',
    challenges: [
      'Disconnected data between Salesforce and downstream systems',
      'Fragile integrations with poor error handling',
      'Latency and sync issues impacting operations',
    ],
    included: [
      'API mapping and integration architecture',
      'Robust error handling and monitoring patterns',
      'Data sync strategy and operational safeguards',
    ],
    outcomes: 'Reliable system coordination and stronger data confidence.',
  },
  {
    title: 'Managed Salesforce Support',
    summary:
      'Retainer-based support for teams that need ongoing delivery, optimization, and platform ownership.',
    challenges: [
      'Backlog growth without consistent execution',
      'Production issues without clear triage ownership',
      'No structured rhythm for continuous improvement',
    ],
    included: [
      'Prioritized support queue and sprint execution',
      'Incident triage and release support',
      'Monthly platform advisory and optimization reviews',
    ],
    outcomes: 'Steady improvement velocity without agency overhead.',
  },
]

const revealUp = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.52, ease: 'easeOut' },
  },
}

type PageMetaOptions = {
  path?: string
  ogTitle?: string
  ogDescription?: string
  ogImage?: string
  keywords?: string
  noindex?: boolean
}

function usePageMeta(title: string, description: string, options: PageMetaOptions = {}) {
  const {
    path = '/',
    ogTitle = title,
    ogDescription = description,
    ogImage = '/og-image.png',
    keywords = 'Vextor, Salesforce consulting, BuilderTek support, Salesforce automation, Salesforce integrations, Apex development, Lightning Web Components',
    noindex = false,
  } = options

  useEffect(() => {
    const siteUrl = 'https://www.vextor.co'
    const normalizedPath = path.startsWith('/') ? path : `/${path}`
    const canonicalUrl = new URL(normalizedPath, `${siteUrl}/`).toString()
    const ogImageUrl = new URL(ogImage, `${siteUrl}/`).toString()

    const upsertMetaByName = (name: string, content: string) => {
      let meta = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null
      if (!meta) {
        meta = document.createElement('meta')
        meta.setAttribute('name', name)
        document.head.appendChild(meta)
      }
      meta.content = content
    }

    const upsertMetaByProperty = (property: string, content: string) => {
      let meta = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null
      if (!meta) {
        meta = document.createElement('meta')
        meta.setAttribute('property', property)
        document.head.appendChild(meta)
      }
      meta.content = content
    }

    const upsertCanonical = (href: string) => {
      let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null
      if (!canonical) {
        canonical = document.createElement('link')
        canonical.setAttribute('rel', 'canonical')
        document.head.appendChild(canonical)
      }
      canonical.href = href
    }

    document.title = title
    upsertMetaByName('description', description)
    upsertMetaByName(
      'robots',
      noindex ? 'noindex,nofollow' : 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1'
    )
    upsertMetaByName(
      'googlebot',
      noindex ? 'noindex,nofollow' : 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1'
    )
    upsertMetaByName('keywords', keywords)
    upsertMetaByProperty('og:title', ogTitle)
    upsertMetaByProperty('og:description', ogDescription)
    upsertMetaByProperty('og:type', 'website')
    upsertMetaByProperty('og:locale', 'en_IN')
    upsertMetaByProperty('og:url', canonicalUrl)
    upsertMetaByProperty('og:image', ogImageUrl)
    upsertMetaByProperty('og:image:alt', 'Vextor branded Salesforce consulting preview')
    upsertMetaByProperty('og:site_name', 'Vextor')
    upsertMetaByName('twitter:card', 'summary_large_image')
    upsertMetaByName('twitter:title', ogTitle)
    upsertMetaByName('twitter:description', ogDescription)
    upsertMetaByName('twitter:image', ogImageUrl)
    upsertMetaByName('twitter:image:alt', 'Vextor branded Salesforce consulting preview')
    upsertCanonical(canonicalUrl)
  }, [description, noindex, ogDescription, ogImage, ogTitle, path, title])
}

function useStructuredData(id: string, payload: Record<string, unknown> | undefined) {
  const json = payload ? JSON.stringify(payload) : ''

  useEffect(() => {
    if (!json) return

    let script = document.querySelector(`script[data-structured-data="${id}"]`) as HTMLScriptElement | null
    if (!script) {
      script = document.createElement('script')
      script.type = 'application/ld+json'
      script.setAttribute('data-structured-data', id)
      document.head.appendChild(script)
    }

    script.textContent = json

    return () => {
      script?.remove()
    }
  }, [id, json])
}

function NavLink({ to, children }: { to: string; children: React.ReactNode }) {
  const location = useLocation()
  const isActive = location.pathname === to

  return (
    <Link
      to={to}
      className={`text-[0.92rem] font-medium tracking-[0.01em] transition-colors ${
        isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
      }`}
      aria-current={isActive ? 'page' : undefined}
    >
      {children}
    </Link>
  )
}

function SectionIntro({
  eyebrow,
  title,
  summary,
  align = 'left',
  titleTag = 'h2',
}: {
  eyebrow?: string
  title: string
  summary?: string
  align?: 'left' | 'center'
  titleTag?: 'h1' | 'h2'
}) {
  const TitleTag = titleTag

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={revealUp}
      className={align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}
    >
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <TitleTag className="section-title">{title}</TitleTag>
      {summary ? <p className="section-summary">{summary}</p> : null}
    </motion.div>
  )
}

function Visual({
  src,
  alt,
  caption,
  className,
  objectPosition,
}: {
  src: string
  alt: string
  caption?: string
  className?: string
  objectPosition?: string
}) {
  return (
    <figure className={`photo-frame ${className ?? ''}`}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="h-full w-full object-cover"
        style={objectPosition ? { objectPosition } : undefined}
      />
      {caption ? (
        <figcaption className="border-t border-border/80 px-4 py-3 text-xs text-muted-foreground">{caption}</figcaption>
      ) : null}
    </figure>
  )
}

type FaqEntry = {
  question: string
  answer: string
}

function FaqSection({
  eyebrow,
  title,
  summary,
  items,
}: {
  eyebrow: string
  title: string
  summary: string
  items: FaqEntry[]
}) {
  return (
    <section className="section-wrap border-t border-border bg-card/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionIntro eyebrow={eyebrow} title={title} summary={summary} />
        <div className="mt-10 grid gap-5">
          {items.map((item) => (
            <article key={item.question} className="faq-item">
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [location.pathname])

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      {children}
      <Footer />
    </div>
  )
}

function Header() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-white shadow-[0_10px_24px_-22px_rgba(15,23,42,0.26)]">
      <div className="mx-auto flex h-[4.75rem] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" aria-label="Vextor home" className="inline-flex items-center">
          <img
            src="/images/just%20final%20logo.svg"
            alt="Vextor Solution"
            className="brand-logo"
            loading="eager"
            fetchPriority="high"
          />
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to}>
              {item.label}
            </NavLink>
          ))}
          <Link to="/contact">
            <Button className="btn-solid" size="md">
              Book a Consultation <ArrowRight className="ml-2 size-4" />
            </Button>
          </Link>
        </nav>

        <button
          type="button"
          className={`inline-flex items-center justify-center rounded-2xl border p-2.5 shadow-[0_16px_30px_-22px_rgba(37,99,235,0.42)] transition md:hidden ${
            open
              ? 'border-[hsl(var(--accent))/0.26] bg-[hsl(var(--accent))] text-white'
              : 'border-[hsl(var(--accent))/0.14] bg-[hsl(var(--accent))/0.07] text-[hsl(var(--accent-strong))] hover:bg-[hsl(var(--accent))/0.12]'
          }`}
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label="Toggle menu"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open ? (
        <div id="mobile-nav" className="border-t border-border bg-white/95 shadow-[0_18px_40px_-34px_rgba(15,23,42,0.34)] backdrop-blur md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4 sm:px-6">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="rounded-2xl border border-transparent bg-white px-4 py-3 text-[0.95rem] font-medium text-foreground transition hover:border-border hover:bg-[hsl(var(--accent))/0.04]"
              >
                {item.label}
              </Link>
            ))}
            <Link to="/contact" className="mt-2">
              <Button className="btn-solid w-full justify-center">Book a Consultation</Button>
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  )
}

function Footer() {
  const socialLinks = [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/company/teamvextor', icon: Linkedin },
    { label: 'Facebook', href: 'https://www.facebook.com/teamvextor', icon: Facebook },
    { label: 'Instagram', href: 'https://www.instagram.com/teamvextor', icon: Instagram },
    { label: 'Twitter', href: 'https://x.com/TeamVextorr', icon: Twitter },
  ]

  return (
    <footer className="border-t border-border bg-footer">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr_0.9fr]">
          <div className="space-y-4">
            <img src="/images/just%20final%20logo.svg" alt="Vextor Solution" className="footer-brand-logo" loading="lazy" />
            <h2 className="text-2xl font-semibold tracking-tight">
              Salesforce consulting for operationally complex teams, with dedicated BuilderTek specialization.
            </h2>
            <p className="max-w-xl text-sm leading-7 text-muted-foreground">
              We help businesses design and scale Salesforce architecture, automation, custom development,
              integrations, and managed support. BuilderTek customers can engage us for specialized workflow
              customization and operational support.
            </p>
          </div>

          <div>
            <h3 className="footer-title">Pages</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <Link className="hover:text-accent" to="/services">
                  Services
                </Link>
              </li>
              <li>
                <Link className="hover:text-accent" to="/industries">
                  Industries
                </Link>
              </li>
              <li>
                <Link className="hover:text-accent" to="/work">
                  Work
                </Link>
              </li>
              <li>
                <Link className="hover:text-accent" to="/success-stories">
                  Success Stories
                </Link>
              </li>
              <li>
                <Link className="hover:text-accent" to="/about">
                  About
                </Link>
              </li>
              <li>
                <Link className="hover:text-accent" to="/contact">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="footer-title">Contact</h3>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Mail className="size-4 text-accent" />
                <a href="mailto:hello@vextor.co" className="hover:text-accent">
                  hello@vextor.co
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-1 size-4 text-accent" />
                <span>7th floor, The Link, Vijay Cross Rd, Navrangpura, Ahmedabad, Gujarat 380009</span>
              </li>
            </ul>
            <div className="mt-6">
              <p className="text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">Partner Badges</p>
              <div className="mt-3 flex items-center gap-3">
                <img
                  src="/images/consulting-partner.webp"
                  alt="Salesforce Consulting Partner badge"
                  className="h-14 w-auto rounded-md border border-border/70 bg-[#062D86]"
                  loading="lazy"
                />
                <img
                  src="/images/Salesforce-Partner-Logo.webp"
                  alt="Salesforce Partner badge"
                  className="h-14 w-14 rounded-md border border-border/70 bg-black object-contain"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="mt-6">
              <p className="text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">Follow Us</p>
              <div className="mt-3 flex items-center gap-2">
                {socialLinks.map(({ label, href, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="inline-flex size-9 items-center justify-center rounded-full border border-border bg-background text-muted-foreground transition hover:border-accent/40 hover:text-accent"
                  >
                    <Icon className="size-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-border pt-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Vextor Solution LLP. All rights reserved.</p>
          <p>Salesforce consulting | BuilderTek specialization | Managed support</p>
        </div>
      </div>
    </footer>
  )
}

function HomePage() {
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const homeFaqs: FaqEntry[] = [
    {
      question: 'What does Vextor specialize in?',
      answer:
        'Vextor specializes in Salesforce consulting for project-based businesses — architecture, implementation, custom development, integrations, and long-term platform ownership, with dedicated BuilderTek support as one area of deep expertise.',
    },
    {
      question: 'Do you only work with construction or BuilderTek teams?',
      answer:
        'No. We work across project-based businesses that need Salesforce to run estimating, delivery, and billing well. BuilderTek is one specialization, not a requirement to work with us.',
    },
    {
      question: 'Where is Vextor based?',
      answer:
        'Vextor is based in Ahmedabad, Gujarat, and supports teams remotely across India and international project-based operations environments.',
    },
  ]

  usePageMeta(
    'Vextor | Salesforce Consulting & BuilderTek Specialists',
    'Ahmedabad-based Salesforce consulting for project-driven teams, with BuilderTek specialization, automation, integrations, and managed support for operational scale.',
    { path: '/' }
  )
  useStructuredData('home-faq', {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: homeFaqs.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  })

  const trustLogos = [
    { src: '/images/trust/quickbooks.png', alt: 'QuickBooks', className: 'trust-logo-image trust-logo-image--quickbooks' },
    { src: '/images/trust/buildertek.png', alt: 'BuilderTek', className: 'trust-logo-image trust-logo-image--buildertek' },
    { src: '/images/trust/oracle.svg', alt: 'Oracle', className: 'trust-logo-image trust-logo-image--oracle' },
    { src: '/images/trust/microsoft.svg', alt: 'Microsoft', className: 'trust-logo-image trust-logo-image--microsoft' },
    { src: '/images/trust/dropbox.svg', alt: 'Dropbox', className: 'trust-logo-image trust-logo-image--dropbox' },
    { src: '/images/trust/sage.png', alt: 'Sage', className: 'trust-logo-image trust-logo-image--sage' },
    { src: '/images/trust/aws.svg', alt: 'AWS', className: 'trust-logo-image trust-logo-image--aws' },
    { src: '/images/trust/salesforce.svg', alt: 'Salesforce', className: 'trust-logo-image trust-logo-image--salesforce' },
  ]

  const serviceOverview = [
    {
      icon: Layers3,
      title: 'Salesforce Architecture & Implementation',
      text: 'Architecture, data design, and implementation planning built around project delivery workflows.',
    },
    {
      icon: HardHat,
      title: 'Custom Development & Configuration',
      text: 'Apex, Lightning Web Components, custom objects, and automation that extend Salesforce beyond out-of-the-box limits.',
    },
    {
      icon: RouteIcon,
      title: 'Integrations & Automation',
      text: 'Integration and workflow engineering across estimating, accounting, ERP, and field systems.',
    },
    {
      icon: ShieldCheck,
      title: 'Managed Support',
      text: 'Long-term admin, release, optimization, and operational support without adding full-time overhead.',
    },
  ]

  const valueProps = [
    {
      icon: Layers3,
      title: 'Salesforce that fits your operations',
      text: 'We design Salesforce around projects, bids, clients, and billing handoffs instead of generic CRM patterns.',
    },
    {
      icon: HardHat,
      title: 'Depth where it counts',
      text: 'From clean new builds to inherited complexity, we deliver Salesforce environments teams will actually use — including deep specialization in platforms like BuilderTek.',
    },
    {
      icon: RouteIcon,
      title: 'Support that stays engaged',
      text: 'Our managed support model keeps your Salesforce org healthy as process, teams, and reporting needs evolve.',
    },
  ]

  const deliverySteps = [
    {
      step: '01',
      icon: ClipboardList,
      title: 'Discover',
      text: 'We start with your projects, your people, and your operational pain points. Discovery is tailored to project-based delivery, not a generic CRM checklist.',
    },
    {
      step: '02',
      icon: Wrench,
      title: 'Build',
      text: 'Our Salesforce architects implement the workflows, custom configuration, custom development, and integrations your team actually needs.',
    },
    {
      step: '03',
      icon: Users,
      title: 'Grow',
      text: 'With managed support, training, and optimization, your platform keeps improving as your operations scale and change.',
    },
  ]

  const commonEngagements = [
    {
      title: 'Lead-to-Invoice Workflow Design',
      body: 'Map the full cycle from first inquiry through estimating, contract execution, project delivery, and billing handoff.',
    },
    {
      title: 'Implementation Cleanup & Migration',
      body: 'Stand up Salesforce correctly, migrate from legacy setups, or rework messy configurations — including specialized platforms like BuilderTek — without losing operating trust.',
    },
    {
      title: 'Support Retainers for Evolving Teams',
      body: 'Stay ahead of admin backlog, release changes, reporting needs, and process refinements without scrambling for outside help.',
    },
  ]

  const leadershipTrust = [
    {
      name: 'Kristi McLaughlin',
      role: 'CEO',
      company: 'ForeFront',
      text: 'Vextor has been a reliable extension of our team. They understand Salesforce deeply, communicate clearly, and consistently deliver solutions that help us move faster.',
    },
    {
      name: 'Vicki Lipinski',
      role: 'CEO',
      company: 'ACTS',
      text: 'Working with Vextor has been effortless. Their team is responsive, knowledgeable, and always focused on finding practical solutions that fit our business.',
    },
    {
      name: 'Brian Kwong',
      role: 'CEO',
      company: 'Better Partners',
      text: 'Vextor combines strong technical expertise with a genuine understanding of business needs. They deliver quality work and are a team we trust.',
    },
    {
      name: 'Brian Cronin',
      role: 'CEO',
      company: 'BuilderTek',
      text: 'Vextor has become an invaluable part of our Salesforce ecosystem. Their technical knowledge, ownership, and attention to detail have made a meaningful impact on our product and our customers.',
    },
    {
      name: 'Brent Stodolak',
      role: 'Manager',
      company: 'RHP',
      text: 'The Vextor team is dependable, proactive, and easy to work with. They consistently deliver high-quality Salesforce solutions on time.',
    },
    {
      name: 'Rebecca Wygal',
      role: 'Manager',
      company: 'RHP',
      text: "What stands out about Vextor is their responsiveness and commitment to getting things right. They're a trusted partner we can always count on.",
    },
    {
      name: 'Sara Unser',
      role: 'CEO',
      company: 'Flight Builders',
      text: 'Vextor quickly understood our business and translated our requirements into solutions that made a real difference. Their team is knowledgeable, collaborative, and dependable.',
    },
  ]

  const proofPoints = [
    'Ahmedabad-based consulting team focused on Salesforce delivery for operationally complex businesses',
    'Salesforce consulting with deep specialization capability for project-driven teams',
    'Support model built for architecture, implementation, optimization, and ongoing operational ownership',
  ]

  const caseSnapshots = [
    {
      title: 'Inherited Salesforce cleanup',
      body: 'We step in when automation is brittle, reporting trust is low, and teams need a clearer operating model before scaling further.',
    },
    {
      title: 'BuilderTek delivery recovery',
      body: 'For BuilderTek teams, we tighten procurement, approvals, job controls, and usability so the platform supports real execution instead of creating friction.',
    },
    {
      title: 'Integration and support ownership',
      body: 'When accounting, ERP, and Salesforce workflows are disconnected, we redesign the handoffs and stay engaged after launch through managed support.',
    },
  ]

  const featuredStories = [
    {
      title: 'BuilderTek workflow stabilization',
      body: 'Representative delivery support for teams that need procurement, approvals, and project controls working cleanly inside Salesforce.',
      outcome: 'Cleaner execution paths and fewer operational workarounds.',
    },
    {
      title: 'Inherited Salesforce architecture reset',
      body: 'For teams where reporting trust is weak, automation layers are brittle, and delivery quality depends on clarifying platform structure first.',
      outcome: 'A more maintainable operating model before new changes are layered in.',
    },
    {
      title: 'Cross-system integration recovery',
      body: 'Support for Salesforce environments where finance, ERP, estimating, and delivery systems are creating friction instead of shared visibility.',
      outcome: 'Better coordination across teams and stronger confidence in the system.',
    },
  ]

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveTestimonial((current) => (current + 1) % leadershipTrust.length)
    }, 6500)

    return () => window.clearInterval(interval)
  }, [leadershipTrust.length])

  const activeTrustQuote = leadershipTrust[activeTestimonial]

  return (
    <main>
      <section className="hero-wrap hero-premium">
        <div className="home-shell px-4 pb-14 pt-14 sm:px-6 sm:pb-16 sm:pt-16 lg:px-8 lg:pb-20 lg:pt-20">
          <div className="hero-layout">
            <motion.div initial="hidden" animate="show" variants={revealUp} className="hero-clean hero-editorial mx-auto text-center">
              <p className="hero-kicker">Salesforce Consulting Partner</p>
              <h1 className="hero-title">
                Salesforce built for the way <span className="hero-highlight">your projects run.</span>
              </h1>
              <p className="hero-copy">
                Vextor helps project-based businesses configure, automate, and scale Salesforce — from
                architecture and implementation to custom development, integrations, and long-term support.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link to="/contact">
                  <Button size="lg" className="btn-solid">
                    Book a Discovery Call <CalendarCheck2 className="ml-2 size-4" />
                  </Button>
                </Link>
                <Link to="/services">
                  <Button size="lg" variant="outline" className="btn-outline-dark">
                    See What We Do <ChevronRight className="ml-2 size-4" />
                  </Button>
                </Link>
              </div>
              <div className="hero-rail" aria-label="Core delivery themes">
                <span>Architecture-first delivery</span>
                <span>Custom development & integrations</span>
                <span>Automation aligned to operations</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="trust-strip-wrap border-b border-border">
        <div className="home-shell px-4 py-5 sm:px-6 lg:px-8">
          <div className="trust-strip-head">
            <p className="trust-strip-copy">Connected across the systems project-based teams already rely on.</p>
          </div>
          <div className="trust-strip-marquee" aria-label="Platform trust strip">
            <div className="trust-strip-track">
              {[...trustLogos, ...trustLogos].map(({ src, alt, className }, index) => (
                <div key={`${alt}-${index}`} className="trust-logo-card">
                  <img src={src} alt={alt} className={className} loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-wrap section-after-hero">
        <div className="home-shell px-4 sm:px-6 lg:px-8">
          <SectionIntro
            eyebrow="Services Overview"
            title="Salesforce consulting built around project-based operations"
            summary="From first implementation through long-term support, our work is structured around how project businesses estimate, execute, invoice, and scale."
          />
          <div className="editorial-pillars mt-12">
            {serviceOverview.map(({ icon: Icon, title, text }) => (
              <article key={title} className="editorial-pillar">
                <div className="editorial-pillar-head">
                  <span className="icon-wrap">
                    <Icon className="size-4" />
                  </span>
                  <h3>{title}</h3>
                </div>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-wrap border-y border-border bg-card/40">
        <div className="home-shell px-4 sm:px-6 lg:px-8">
          <div className="editorial-split">
            <SectionIntro
              eyebrow="Why Vextor"
              title="A consulting model designed for the realities of project-based work"
              summary="We combine platform architecture, hands-on development, and long-term support so the system keeps working after launch."
            />
            <div className="editorial-reasons">
              {valueProps.map(({ icon: Icon, title, text }) => (
                <article key={title} className="editorial-reason">
                  <div className="editorial-reason-title">
                    <span className="icon-wrap">
                      <Icon className="size-4" />
                    </span>
                    <h3>{title}</h3>
                  </div>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-wrap" id="buildertek-home">
        <div className="home-shell home-split grid gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1fr] lg:px-8">
          <div className="space-y-5">
            <SectionIntro
              eyebrow="BuilderTek Specialization"
              title="A dedicated BuilderTek practice for teams that run on jobs, not just pipelines"
              summary="BuilderTek is a serious operational platform. We treat it as a dedicated practice with implementation depth, custom configuration capability, and managed support."
            />
            <ul className="space-y-2 text-sm leading-7 text-muted-foreground">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-1 size-4 text-accent" /> New BuilderTek implementations around estimating, project management, and financial workflows
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-1 size-4 text-accent" /> Cleanup, migration, and reconfiguration for inherited BuilderTek environments
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-1 size-4 text-accent" /> Custom objects, automation, and extensions for workflows not covered out of the box
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-1 size-4 text-accent" /> Ongoing BuilderTek support, release management, and optimization for project-driven teams
              </li>
            </ul>
            <Link to="/services#buildertek-specialization" className="inline-flex items-center gap-2 text-sm font-medium hover:text-accent">
              Explore BuilderTek support <ArrowRight className="size-4" />
            </Link>
          </div>

          <Visual
            src="/images/home-buildertek-blueprint.svg"
            alt="Branded visual showing BuilderTek delivery support for project operations"
            caption="BuilderTek delivery support presented as an operational system, not a generic add-on."
            className="editorial-visual min-h-[390px]"
          />
        </div>
      </section>

      <section className="section-wrap border-y border-border bg-card/40">
        <div className="home-shell px-4 sm:px-6 lg:px-8">
          <SectionIntro
            eyebrow="How We Work"
            title="A consulting process built for discovery, delivery, and long-term scale"
            summary="We work in a way that matches project-based operations: understand the workflow, build the right system, then stay engaged as the business grows."
          />
          <div className="process-strip mt-12">
            {deliverySteps.map(({ step, icon: Icon, title, text }) => (
              <article key={title} className="process-step">
                <p className="step-chip">Step {step}</p>
                <div className="process-step-title">
                  <Icon className="size-4 text-accent" />
                  <h3>{title}</h3>
                </div>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-wrap">
        <div className="home-shell px-4 sm:px-6 lg:px-8">
          <SectionIntro
            eyebrow="Common Engagements"
            title="Where Vextor is typically brought in"
            summary="Representative examples of the operating problems, platform issues, and growth stages where teams usually engage us."
          />
          <div className="engagement-list mt-12">
            {commonEngagements.map((item) => (
              <article key={item.title} className="engagement-item">
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-wrap border-y border-border bg-card/40">
        <div className="home-shell px-4 sm:px-6 lg:px-8">
          <div className="editorial-split">
            <div className="space-y-5">
              <SectionIntro
                eyebrow="Proof Of Fit"
                title="Why project-based teams bring Vextor in"
                summary="The work is not generic CRM administration. Teams engage Vextor when Salesforce becomes a delivery system that needs stronger architecture, cleaner workflows, and operational accountability."
              />
              <ul className="space-y-2 text-sm leading-7 text-muted-foreground">
                {proofPoints.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-1 size-4 text-accent" /> {item}
                  </li>
                ))}
              </ul>
              <p className="text-sm leading-7 text-muted-foreground">
                We support organizations from Ahmedabad and beyond that need Salesforce to stay reliable as project delivery, approvals, reporting, and cross-system coordination grow more complex.
              </p>
            </div>

            <div className="editorial-reasons">
              {caseSnapshots.map((item) => (
                <article key={item.title} className="editorial-reason">
                  <div className="editorial-reason-title">
                    <span className="icon-wrap">
                      <ShieldCheck className="size-4" />
                    </span>
                    <h3>{item.title}</h3>
                  </div>
                  <p>{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-wrap">
        <div className="home-shell px-4 sm:px-6 lg:px-8">
          <SectionIntro
            eyebrow="Success Stories"
            title="Representative engagement stories that show where Vextor adds value"
            summary="These are the kinds of operating situations where project-based teams bring Vextor in to restore clarity, structure, and long-term platform confidence."
          />
          <div className="success-story-grid mt-12">
            {featuredStories.map((item) => (
              <article key={item.title} className="success-story-card">
                <p className="eyebrow">Representative Story</p>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
                <p className="success-story-outcome">{item.outcome}</p>
              </article>
            ))}
          </div>
          <div className="mt-8 flex justify-start">
            <Link to="/success-stories">
              <Button size="lg" variant="outline">
                Review Success Stories <ChevronRight className="ml-2 size-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="section-wrap border-y border-border bg-card/40">
        <div className="home-shell px-4 sm:px-6 lg:px-8">
          <SectionIntro
            eyebrow="Trusted By Leadership Teams"
            title="What client leaders say after working with Vextor"
            summary="Direct feedback from executives and operators who rely on Vextor for Salesforce execution, specialized delivery, and long-term platform ownership."
            align="center"
          />

          <div className="testimonial-feature mt-12">
            <div className="testimonial-feature-stage">
              <motion.article
                key={activeTrustQuote.name}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.32, ease: 'easeOut' }}
                className="testimonial-feature-card"
              >
                <p className="testimonial-feature-copy">{activeTrustQuote.text}</p>
                <div className="testimonial-feature-meta">
                  <p className="testimonial-feature-name">{activeTrustQuote.name}</p>
                  <p className="testimonial-feature-role">
                    {activeTrustQuote.role}, {activeTrustQuote.company}
                  </p>
                </div>
              </motion.article>
            </div>

            <div className="testimonial-feature-controls">
              <div className="testimonial-feature-buttons">
                <button
                  type="button"
                  className="testimonial-nav-button"
                  aria-label="Previous testimonial"
                  onClick={() =>
                    setActiveTestimonial((current) => (current - 1 + leadershipTrust.length) % leadershipTrust.length)
                  }
                >
                  <ChevronLeft className="size-4" />
                </button>
                <button
                  type="button"
                  className="testimonial-nav-button"
                  aria-label="Next testimonial"
                  onClick={() => setActiveTestimonial((current) => (current + 1) % leadershipTrust.length)}
                >
                  <ChevronRight className="size-4" />
                </button>
              </div>

              <div className="testimonial-feature-dots" aria-label="Testimonial selection">
                {leadershipTrust.map((item, index) => (
                  <button
                    key={item.name}
                    type="button"
                    aria-label={`Show testimonial from ${item.name}`}
                    aria-pressed={index === activeTestimonial}
                    className={`testimonial-dot ${index === activeTestimonial ? 'is-active' : ''}`}
                    onClick={() => setActiveTestimonial(index)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <FaqSection
        eyebrow="Homepage FAQ"
        title="Common questions before teams engage Vextor"
        summary="Short answers for organizations evaluating Salesforce consulting, BuilderTek support, and long-term platform ownership."
        items={homeFaqs}
      />

      <section className="section-wrap border-y border-border cta-premium text-deep-foreground">
        <div className="home-shell-narrow px-4 sm:px-6 lg:px-8">
          <div className="cta-band">
            <p className="eyebrow">Consultation</p>
            <h2 className="section-title max-w-2xl text-deep-foreground">
              Ready to get Salesforce working for your projects?
            </h2>
            <p className="section-summary max-w-2xl text-deep-muted">
              Whether you are starting from scratch, switching from another CRM, or fixing a Salesforce org that
              never quite fit, Vextor is built for what project-based teams actually need.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/contact">
                <Button size="lg" className="btn-solid">
                  Schedule a Free 30-Minute Consultation <ArrowRight className="ml-2 size-4" />
                </Button>
              </Link>
              <Link to="/services">
                <Button size="lg" variant="outline" className="btn-outline-invert">
                  Explore All Services
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

function ServicesPage() {
  const serviceFaqs: FaqEntry[] = [
    {
      question: 'What Salesforce services does Vextor provide?',
      answer:
        'Vextor provides Salesforce architecture, implementation planning, automation, Apex and Lightning development, integrations, managed support, and BuilderTek specialization for project-based teams.',
    },
    {
      question: 'Do I need to be a construction or BuilderTek team to work with Vextor?',
      answer:
        'No. We work across project-based and operations-heavy businesses on Salesforce generally. BuilderTek support is one specialization we offer, not a requirement.',
    },
    {
      question: 'Can Vextor support both engineering and long-term admin work?',
      answer:
        'Yes. Engagements can include architecture, custom development, integration work, release management, reporting improvements, and ongoing operational support after launch.',
    },
  ]

  const serviceEntryPoints = [
    {
      title: 'New delivery model design',
      body: 'For teams setting up Salesforce or resetting delivery structure before technical debt compounds.',
    },
    {
      title: 'Inherited org cleanup',
      body: 'For businesses dealing with reporting distrust, automation sprawl, and unclear ownership across teams.',
    },
    {
      title: 'Project-workflow refinement',
      body: 'For project-based organizations that need procurement, approvals, and project controls to work more cleanly — including specialized platforms like BuilderTek.',
    },
  ]

  usePageMeta(
    'Salesforce Consulting Services | Architecture, Automation & BuilderTek | Vextor',
    'Ahmedabad-based Salesforce consulting services for architecture, workflow automation, BuilderTek support, integrations, Apex development, and managed delivery for project-based teams.',
    { path: '/services' }
  )
  useStructuredData('services-faq', {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: serviceFaqs.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  })

  const serviceIcons = [Layers3, Compass, Settings2, Code2, Database, RouteIcon]

  return (
    <main>
      <section className="section-wrap border-b border-border bg-card/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionIntro
            eyebrow="Services"
            title="Salesforce consulting services built for execution-heavy teams"
            summary="Vextor supports architecture, automation, custom development, integrations, and managed support for businesses that rely on Salesforce well beyond pipeline management."
            titleTag="h1"
          />
        </div>
      </section>

      <section className="section-wrap border-b border-border/80">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:px-8">
          <div className="space-y-6">
            <SectionIntro
              eyebrow="How Teams Engage"
              title="Architecture decisions, workflow engineering, and long-term platform ownership"
              summary="Most teams come to Vextor when Salesforce has become operationally important and the cost of unclear structure starts showing up in approvals, reporting, release quality, and day-to-day execution."
            />
            <div className="editorial-reasons">
              {serviceEntryPoints.map((item) => (
                <article key={item.title} className="editorial-reason">
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              ))}
            </div>
          </div>

          <Visual
            src="/images/services-operations-diagram.svg"
            alt="Illustrated diagram showing architecture, automation, integration, and support working together"
            caption="A service model designed around architecture quality, process flow, and reliable delivery ownership."
            className="min-h-[360px] lg:min-h-[420px]"
          />
        </div>
      </section>

      <section className="section-wrap">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionIntro
            eyebrow="Primary Service Line"
            title="Salesforce consulting and engineering"
            summary="Built for operations teams that need Salesforce to support delivery control, not just CRM administration."
          />
          <div className="mt-8 space-y-6">
            {salesforceServices.map((service, index) => {
              const Icon = serviceIcons[index]
              return (
                <article key={service.title} className="service-article">
                  <div>
                    <h3 className="service-title">
                      <span className="icon-wrap">
                        <Icon className="size-4" />
                      </span>
                      {service.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">{service.summary}</p>
                  </div>

                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    <Card className="surface-card">
                      <CardHeader>
                        <CardTitle className="text-base">Common challenges addressed</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-sm leading-7 text-muted-foreground">
                          {service.challenges.map((item) => (
                            <li key={item} className="flex items-start gap-2">
                              <CheckCircle2 className="mt-1 size-4 text-accent" /> {item}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="surface-card">
                      <CardHeader>
                        <CardTitle className="text-base">Scope includes</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-sm leading-7 text-muted-foreground">
                          {service.included.map((item) => (
                            <li key={item} className="flex items-start gap-2">
                              <CheckCircle2 className="mt-1 size-4 text-accent" /> {item}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>

                  <p className="mt-5 rounded-2xl border border-border/75 bg-background px-4 py-3 text-sm text-muted-foreground">
                    <strong className="text-foreground">Expected outcome:</strong> {service.outcomes}
                  </p>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="section-wrap border-y border-border bg-card/40">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:px-8">
          <Visual
            src="/images/services-delivery-workshop.jpg"
            alt="Consulting workshop focused on planning Salesforce delivery"
            caption="Delivery workshops shaped around process clarity, architecture, and adoption."
            className="min-h-[340px] lg:min-h-[400px]"
            objectPosition="center 44%"
          />

          <div className="space-y-5">
            <SectionIntro
              eyebrow="Delivery Model"
              title="Architecture, implementation, and support that land cleanly with operations teams"
              summary="We structure delivery so business stakeholders, admins, and execution teams stay aligned from planning through rollout."
            />
            <ul className="space-y-2 text-sm leading-7 text-muted-foreground">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-1 size-4 text-accent" /> Discovery centered on process bottlenecks, not generic feature checklists
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-1 size-4 text-accent" /> Implementation sequencing that protects reporting trust and user adoption
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-1 size-4 text-accent" /> Support models that keep architecture stable as operational complexity grows
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section-wrap border-y border-border bg-card/60" id="buildertek-specialization">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_1fr] lg:px-8">
          <div>
            <SectionIntro
              eyebrow="Specialization"
              title="BuilderTek support and customization"
              summary="A dedicated specialization for BuilderTek customers who need process tuning, workflow customization, and ongoing support — one focused area within our broader Salesforce practice."
            />
            <ul className="mt-5 space-y-2 text-sm leading-7 text-muted-foreground">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-1 size-4 text-accent" /> Project operations workflow mapping
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-1 size-4 text-accent" /> RFQ, quote, PO, and approval refinement
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-1 size-4 text-accent" /> Budget, controls, and reporting process improvements
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-1 size-4 text-accent" /> BuilderTek usability and adoption optimization
              </li>
            </ul>
          </div>

          <Visual
            src="/images/services-buildertek-planning.jpg"
            alt="Construction planning table with project drawings and laptop"
            caption="BuilderTek specialization focused on project delivery workflows."
            className="min-h-[340px] lg:min-h-[400px]"
            objectPosition="center 50%"
          />
        </div>
      </section>

      <FaqSection
        eyebrow="Services FAQ"
        title="Questions teams usually ask before engaging Vextor"
        summary="A short set of practical answers for Salesforce consulting, BuilderTek support, and long-term delivery ownership."
        items={serviceFaqs}
      />
    </main>
  )
}

function IndustriesPage() {
  const industryFaqs: FaqEntry[] = [
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
  ]

  usePageMeta(
    'Salesforce for Construction, Real Estate & Project Teams | Vextor',
    'Industry-focused Salesforce consulting for construction, real estate, BuilderTek, and project-based operations teams that need stronger workflow control and system reliability.',
    { path: '/industries' }
  )
  useStructuredData('industries-faq', {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: industryFaqs.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  })

  return (
    <main>
      <section className="section-wrap border-b border-border bg-card/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionIntro
            eyebrow="Industries"
            title="Salesforce support for construction, real estate, and operations-heavy teams"
            summary="Vextor works with businesses where Salesforce supports execution, approvals, delivery visibility, and long-term process discipline."
            titleTag="h1"
          />
        </div>
      </section>

      <section className="section-wrap border-b border-border/80">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
          <div className="space-y-6">
            <SectionIntro
              eyebrow="Operational Fit"
              title="The common factor is workflow complexity, not just industry labels"
              summary="The strongest fit usually comes from environments with multiple stakeholders, process-heavy approvals, field coordination, delivery dependencies, and reporting pressure."
            />
            <div className="editorial-reasons">
              {[
                {
                  title: 'Construction and BuilderTek teams',
                  body: 'Project execution, procurement, change tracking, approvals, and reporting all depend on system clarity.',
                },
                {
                  title: 'Real estate and development groups',
                  body: 'Cross-functional coordination across pipeline, projects, vendors, and finance needs dependable workflow structure.',
                },
                {
                  title: 'Salesforce-heavy internal operations',
                  body: 'Teams that already run significant process load in Salesforce need cleaner architecture, better automation, and stable ownership.',
                },
              ].map((item) => (
                <article key={item.title} className="editorial-reason">
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              ))}
            </div>
          </div>

          <Visual
            src="/images/industries-operations-panel.svg"
            alt="Branded operations visual for cross-team workflow coordination"
            caption="Industry support starts with how the business actually coordinates work across people, systems, approvals, and financial controls."
            className="min-h-[340px] lg:min-h-[420px]"
          />
        </div>
      </section>

      <section className="section-wrap">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
          {[
            {
              icon: HardHat,
              title: 'Construction',
              text: 'Salesforce and BuilderTek support for procurement workflows, field-to-office coordination, approvals, and project execution visibility.',
            },
            {
              icon: LandPlot,
              title: 'Real Estate',
              text: 'Workflow and integration support across pipeline, development, vendor coordination, project delivery, and finance alignment.',
            },
            {
              icon: Users,
              title: 'Operations-Heavy Teams',
              text: 'Architecture, automation, development, and support for businesses running critical execution workflows inside Salesforce.',
            },
          ].map((item) => (
            <article key={item.title} className="service-article h-full">
              <h3 className="service-title">
                <span className="icon-wrap">
                  <item.icon className="size-4" />
                </span>
                {item.title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-wrap border-y border-border bg-card/60">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1fr] lg:px-8">
          <div>
            <SectionIntro
              eyebrow="BuilderTek Context"
              title="Where BuilderTek specialization is most relevant"
              summary="BuilderTek work is most valuable where project delivery workflows, financial controls, approvals, and cross-team execution need tighter system alignment."
            />
            <ul className="mt-5 space-y-2 text-sm leading-7 text-muted-foreground">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-1 size-4 text-accent" /> Procurement and purchasing workflow clarity
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-1 size-4 text-accent" /> Approval controls and escalation paths
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-1 size-4 text-accent" /> Budget visibility and role-based accountability
              </li>
            </ul>
          </div>

          <Visual
            src="/images/industries-construction-operations.jpg"
            alt="Urban construction project with crane and building structure"
            caption="BuilderTek process support for construction and real-estate operations."
            className="min-h-[320px] lg:min-h-[390px]"
            objectPosition="center 52%"
          />
        </div>
      </section>

      <section className="section-wrap border-b border-border/80">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:px-8">
          <Visual
            src="/images/industries-contractor-panel.svg"
            alt="Construction operations visual showing jobsite coordination and system visibility"
            caption="Operational consulting is strongest when architecture and delivery decisions stay close to jobsite reality."
            className="min-h-[320px] lg:min-h-[390px]"
          />

          <div className="space-y-5">
            <SectionIntro
              eyebrow="Where Vextor Adds Value"
              title="The goal is a system that operators trust, not just a platform that technically works"
              summary="Industry context matters because reporting, handoffs, approvals, field execution, and financial control all place different demands on Salesforce architecture."
            />
            <ul className="space-y-2 text-sm leading-7 text-muted-foreground">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-1 size-4 text-accent" /> Clean handoffs between office teams, project teams, and decision-makers
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-1 size-4 text-accent" /> Better visibility into operational status without reporting distrust
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-1 size-4 text-accent" /> Delivery workflows that remain understandable as the business scales
              </li>
            </ul>
          </div>
        </div>
      </section>

      <FaqSection
        eyebrow="Industries FAQ"
        title="Questions project-based teams ask before engaging Vextor"
        summary="A quick overview of industry fit, BuilderTek context, and the kinds of Salesforce environments Vextor supports."
        items={industryFaqs}
      />
    </main>
  )
}

function WorkPage() {
  usePageMeta(
    'Vextor Work | Salesforce Delivery for Project-Based Operations',
    'See how Vextor approaches Salesforce automation, BuilderTek delivery, integrations, and long-term support for project-based businesses.',
    { path: '/work' }
  )

  const workFocus = [
    {
      title: 'Operational architecture',
      body: 'We define the system structure that keeps reporting, process ownership, and future delivery stable.',
    },
    {
      title: 'Execution workflow engineering',
      body: 'We align automation, BuilderTek behavior, approvals, and handoffs with how teams actually operate.',
    },
    {
      title: 'Support after launch',
      body: 'We stay engaged where platform quality depends on release discipline, backlog ownership, and ongoing optimization.',
    },
  ]

  return (
    <main>
      <section className="section-wrap border-b border-border bg-card/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionIntro
            eyebrow="Our Work"
            title="Operational Salesforce delivery across consulting, engineering, and support"
            summary="At Vextor, our work focuses on helping businesses extend and optimize Salesforce around real operating needs."
            titleTag="h1"
          />
        </div>
      </section>

      <section className="section-wrap border-b border-border/80">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
          <div className="space-y-6">
            <SectionIntro
              eyebrow="Execution Lens"
              title="Work that stays close to approvals, handoffs, reporting, and day-to-day delivery"
              summary="The practical value of Salesforce consulting shows up in execution quality. Vextor’s work is shaped around the operating layer where process issues actually create friction."
            />
            <div className="editorial-reasons">
              {workFocus.map((item) => (
                <article key={item.title} className="editorial-reason">
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              ))}
            </div>
          </div>

          <Visual
            src="/images/work-operations-review.jpg"
            alt="Operations leaders reviewing delivery and reporting workflows"
            caption="Delivery work connected to real operating reviews, not isolated technical execution."
            className="min-h-[340px] lg:min-h-[430px]"
            objectPosition="center 42%"
          />
        </div>
      </section>

      <section className="section-wrap">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: 'Salesforce Automation',
                body: 'Designing workflows and automations that reduce manual work and streamline internal processes.',
              },
              {
                title: 'Custom Salesforce Development',
                body: 'Building Apex logic, Lightning Web Components, and extensions for unique business workflows.',
              },
              {
                title: 'System Integrations',
                body: 'Connecting Salesforce with external systems, APIs, and operational tools across the organization.',
              },
              {
                title: 'BuilderTek Optimization',
                body: 'Improving BuilderTek workflows, automation, and usability for construction operations.',
              },
              {
                title: 'Ongoing Salesforce Support',
                body: 'Providing long-term support for enhancements, troubleshooting, and continuous improvements.',
              },
            ].map((item) => (
              <Card key={item.title} className="surface-card">
                <CardHeader>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-7 text-muted-foreground">{item.body}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section-wrap border-y border-border bg-card/50">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_1fr] lg:px-8">
          <div className="space-y-5">
            <SectionIntro
              eyebrow="Program Delivery"
              title="Operating models that connect architecture decisions to daily execution"
              summary="The work is not limited to delivery artifacts. We help teams shape how Salesforce supports approvals, handoffs, visibility, and change management after launch."
            />
            <p className="text-sm leading-7 text-muted-foreground">
              Engagements typically bridge leadership priorities with admin execution, custom engineering, field workflows, and reporting reliability.
            </p>
          </div>

          <Visual
            src="/images/work-execution-visual.svg"
            alt="Branded visual showing delivery reviews, process checkpoints, and implementation flow"
            caption="A delivery model that keeps architecture, implementation, and operational handoff aligned."
            className="min-h-[320px] lg:min-h-[390px]"
          />
        </div>
      </section>

      <section className="section-wrap border-b border-border">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_1fr] lg:px-8">
          <div>
            <SectionIntro
              eyebrow="Delivery Focus"
              title="What we typically execute in engagements"
              summary="Architecture, automation, custom engineering, and support are delivered with clear operating outcomes."
            />
            <div className="mt-6 space-y-3 text-sm leading-7 text-muted-foreground">
              <p>1. Define business workflow requirements and process constraints.</p>
              <p>2. Design architecture and automation with maintainability in mind.</p>
              <p>3. Deliver in phases with quality controls and operational handover.</p>
            </div>
          </div>

          <Visual
            src="/images/work-consulting-execution.jpg"
            alt="Operations and planning workspace for consulting execution"
            caption="Execution model built around workflow quality and delivery consistency."
            className="min-h-[300px]"
            objectPosition="center 46%"
          />
        </div>
      </section>

      <section className="section-wrap bg-card/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionIntro
            eyebrow="Proof Path"
            title="See representative success stories"
            summary="Representative stories show how Vextor approaches inherited complexity, BuilderTek execution issues, and cross-system delivery problems without relying on generic CRM patterns."
          />
          <div className="mt-8">
            <Link to="/success-stories">
              <Button size="lg" variant="outline">
                Explore Success Stories <ChevronRight className="ml-2 size-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

function AboutPage() {
  usePageMeta(
    'About Vextor | Salesforce & BuilderTek Consulting Experts',
    'Learn how Ahmedabad-based Vextor designs scalable Salesforce systems with strong architecture, process automation, integration depth, and BuilderTek expertise.',
    { path: '/about' }
  )

  const outcomes = [
    'Clear architecture that scales with your operations',
    'Less manual work through practical automation',
    'Reliable integrations across finance and ops systems',
    'A maintainable Salesforce environment for long-term growth',
  ]

  const aboutPrinciples = [
    {
      title: 'Platform clarity first',
      body: 'We focus on the data, process, and ownership decisions that make future Salesforce delivery easier instead of harder.',
    },
    {
      title: 'Operational alignment',
      body: 'The system has to match how teams estimate, approve, deliver, report, and coordinate across functions.',
    },
    {
      title: 'Long-term maintainability',
      body: 'Architecture, custom logic, and support decisions are made with future change in mind, not just immediate launch pressure.',
    },
  ]

  return (
    <main>
      <section className="section-wrap border-b border-border bg-card/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionIntro
            eyebrow="About Vextor"
            title="Salesforce systems built for real operational complexity"
            summary="Vextor helps teams build scalable Salesforce environments that support daily execution, not just CRM workflows."
            titleTag="h1"
          />
        </div>
      </section>

      <section className="section-wrap border-b border-border/80">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
          <div className="space-y-5">
            <SectionIntro
              eyebrow="Who We Are"
              title="A consulting firm focused on long-term platform quality"
              summary="As organizations grow, Salesforce often becomes the core system for operations, coordination, and execution."
            />
            <p className="text-sm leading-7 text-muted-foreground">
              We design Salesforce systems that stay stable as workflows, teams, and integrations become more complex.
            </p>
            <div className="editorial-reasons">
              {aboutPrinciples.map((item) => (
                <article key={item.title} className="editorial-reason">
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              ))}
            </div>
          </div>

          <Visual
            src="/images/about-team-collaboration.jpg"
            alt="Collaborative architecture planning"
            caption="Collaborative planning and operational discovery before implementation."
            className="min-h-[340px] lg:min-h-[430px]"
            objectPosition="center 38%"
          />
        </div>
      </section>

      <section className="section-wrap border-y border-border bg-card/60">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <Visual
            src="/images/about-architecture-planning.jpg"
            alt="Structured Salesforce service model"
            caption="Balanced delivery across architecture, automation, development, and support."
            className="min-h-[300px]"
            objectPosition="center 52%"
          />

          <div className="space-y-5">
            <SectionIntro
              eyebrow="Our Approach"
              title="Strong foundations before rapid feature delivery"
              summary="We prioritize system structure, data clarity, and sustainable automation."
            />
            <ul className="space-y-2 text-sm leading-7 text-muted-foreground">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-1 size-4 text-accent" /> Data models designed for reporting trust and clean growth
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-1 size-4 text-accent" /> Automation that matches operational workflows
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-1 size-4 text-accent" /> Integrations built for reliability, not short-term patches
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-1 size-4 text-accent" /> Delivery decisions made with long-term maintainability in mind
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section-wrap">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1fr] lg:px-8">
          <div className="space-y-5">
            <SectionIntro
              eyebrow="Salesforce Expertise"
              title="Configuration, development, and integration depth"
              summary="We help organizations extend Salesforce into a dependable operational platform."
            />
            <ul className="space-y-2 text-sm leading-7 text-muted-foreground">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-1 size-4 text-accent" /> Salesforce architecture and governance design
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-1 size-4 text-accent" /> Apex and Lightning Web Components for custom workflows
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-1 size-4 text-accent" /> Automation frameworks for process control and consistency
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-1 size-4 text-accent" /> Integrations with external APIs, finance, and operations systems
              </li>
            </ul>
          </div>

          <Visual
            src="/images/about-platform-expertise.jpg"
            alt="Salesforce architecture blueprint"
            caption="Clear architecture patterns that stay reliable as the platform evolves."
            className="min-h-[300px]"
            objectPosition="center 44%"
          />
        </div>
      </section>

      <section className="section-wrap border-y border-border bg-card/60">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
          <Visual
            src="/images/about-buildertek-construction.jpg"
            alt="BuilderTek workflow mapping"
            caption="BuilderTek workflow refinement for project-driven teams."
            className="min-h-[300px]"
            objectPosition="center 58%"
          />

          <div className="space-y-5">
            <SectionIntro
              eyebrow="BuilderTek Specialization"
              title="Focused support for project and construction operations"
              summary="We help BuilderTek-heavy organizations align Salesforce with real project execution needs."
            />
            <ul className="space-y-2 text-sm leading-7 text-muted-foreground">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-1 size-4 text-accent" /> Vendor and bidding workflow improvements
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-1 size-4 text-accent" /> Purchase order and approval automation
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-1 size-4 text-accent" /> Budget tracking and project visibility enhancements
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-1 size-4 text-accent" /> Integration support for accounting and financial systems
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section-wrap">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionIntro
            eyebrow="Outcomes"
            title="What this delivers for your team"
            summary="The goal is a Salesforce environment that stays clear, reliable, and efficient over time."
          />
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {outcomes.map((item) => (
              <Card key={item} className="surface-card">
                <CardContent className="pt-5">
                  <p className="flex items-start gap-2 text-sm leading-7 text-muted-foreground">
                    <CheckCircle2 className="mt-1 size-4 text-accent" /> {item}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section-wrap border-t border-border bg-card/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionIntro
            eyebrow="Proof"
            title="Review the kinds of operating situations where Vextor is brought in"
            summary="If you want to understand how Vextor fits in real Salesforce environments, the representative success stories page shows the common delivery contexts more directly."
          />
          <div className="mt-8">
            <Link to="/success-stories">
              <Button size="lg" variant="outline">
                Explore Success Stories <ChevronRight className="ml-2 size-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

function ContactPage() {
  const contactFaqs: FaqEntry[] = [
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
  ]

  usePageMeta(
    'Contact Vextor | Salesforce & BuilderTek Consultation in Ahmedabad',
    'Contact Vextor for Salesforce consulting, BuilderTek support, automation planning, integrations, and long-term platform guidance for project-based teams.',
    { path: '/contact' }
  )
  useStructuredData('contact-page', {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact Vextor',
    url: 'https://www.vextor.co/contact',
    description:
      'Contact Vextor for Salesforce consulting, BuilderTek support, automation planning, integrations, and long-term platform guidance.',
    about: {
      '@id': 'https://www.vextor.co/#service',
    },
  })
  useStructuredData('contact-faq', {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: contactFaqs.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  })

  return (
    <main>
      <section className="section-wrap border-b border-border bg-card/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="contact-hero">
            <SectionIntro
              eyebrow="Contact"
              title="Start a focused Salesforce conversation with Vextor"
              summary="Share the problem clearly. We will review the Salesforce or BuilderTek context and come back with the most practical next step."
              titleTag="h1"
            />
            <div className="contact-hero-points">
              <span>Architecture review</span>
              <span>BuilderTek support</span>
              <span>Integration support</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section-wrap">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:px-8">
          <div className="contact-clean-shell">
            <div className="contact-clean-panel">
              <div className="space-y-5">
                <div>
                  <p className="eyebrow">Inquiry Form</p>
                  <h2 className="section-title text-[clamp(1.8rem,3.1vw,2.5rem)]">Tell us what you need help solving</h2>
                  <p className="section-summary max-w-none">
                    Share the issue, the current system context, and what a better outcome should look like.
                  </p>
                </div>

                <form
                  action="https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8&orgId=00DdN00000t9uBN"
                  method="POST"
                  className="space-y-5"
                >
                  <input type="hidden" name="oid" value="00DdN00000t9uBN" />
                  <input type="hidden" name="retURL" value="https://www.vextor.co/thank-you" />
                  <input type="hidden" id="lead_source" name="lead_source" value="Web" />

                  <div className="webtolead-grid">
                    <div className="webtolead-field">
                      <label className="form-label" htmlFor="first_name">
                        First Name
                      </label>
                      <input className="webtolead-input" id="first_name" maxLength={40} name="first_name" type="text" placeholder="First name" />
                    </div>
                    <div className="webtolead-field">
                      <label className="form-label" htmlFor="last_name">
                        Last Name
                      </label>
                      <input className="webtolead-input" id="last_name" maxLength={80} name="last_name" type="text" placeholder="Last name" required />
                    </div>
                  </div>

                  <div className="webtolead-grid">
                    <div className="webtolead-field">
                      <label className="form-label" htmlFor="email">
                        Work Email
                      </label>
                      <input className="webtolead-input" id="email" maxLength={80} name="email" type="email" placeholder="you@company.com" required />
                    </div>
                    <div className="webtolead-field">
                      <label className="form-label" htmlFor="company">
                        Company
                      </label>
                      <input className="webtolead-input" id="company" maxLength={40} name="company" type="text" placeholder="Company" required />
                    </div>
                  </div>

                  <div className="webtolead-grid">
                    <div className="webtolead-field">
                      <label className="form-label" htmlFor="mobile">
                        Mobile
                      </label>
                      <input className="webtolead-input" id="mobile" maxLength={40} name="mobile" type="text" placeholder="Optional phone number" />
                    </div>
                    <div className="webtolead-field">
                      <label className="form-label" htmlFor="city">
                        City
                      </label>
                      <input className="webtolead-input" id="city" maxLength={40} name="city" type="text" placeholder="City" />
                    </div>
                  </div>

                  <div className="webtolead-grid">
                    <div className="webtolead-field">
                      <label className="form-label" htmlFor="state">
                        State/Province
                      </label>
                      <input className="webtolead-input" id="state" maxLength={20} name="state" type="text" placeholder="State or province" />
                    </div>
                    <div className="webtolead-field">
                      <label className="form-label" htmlFor="country">
                        Country
                      </label>
                      <input className="webtolead-input" id="country" maxLength={40} name="country" type="text" placeholder="Country" />
                    </div>
                  </div>

                  <div className="webtolead-field">
                    <label className="form-label" htmlFor="description">
                      What do you need help with?
                    </label>
                    <textarea
                      className="webtolead-input webtolead-textarea"
                      id="description"
                      name="description"
                      rows={6}
                      placeholder="Describe the Salesforce or BuilderTek issue, the workflow friction, and what outcome your team needs."
                      required
                    />
                  </div>

                  <div className="contact-clean-actions">
                    <Button type="submit" name="submit" size="lg" className="btn-solid justify-center sm:min-w-[15rem]">
                      Send Inquiry
                    </Button>
                    <p className="text-sm leading-7 text-muted-foreground">
                      We review each inquiry directly and reply with the most practical next step.
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className="contact-clean-aside lg:sticky lg:top-28">
            <div className="contact-clean-card">
              <h2 className="text-2xl font-semibold tracking-tight">Direct contact</h2>
              <p className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="size-4 text-accent" />
                <a className="hover:text-accent" href="mailto:hello@vextor.co">
                  hello@vextor.co
                </a>
              </p>
              <p className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="mt-1 size-4 text-accent" />
                <span>7th floor, The Link, Vijay Cross Rd, Navrangpura, Ahmedabad, Gujarat 380009</span>
              </p>
            </div>

            <div className="contact-clean-card">
              <h3 className="text-lg font-semibold tracking-tight">Best fit conversations</h3>
              <ul className="space-y-2 text-sm leading-7 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-1 size-4 text-accent" /> Salesforce architecture and inherited org cleanup
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-1 size-4 text-accent" /> BuilderTek delivery support and workflow refinement
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-1 size-4 text-accent" /> Integrations, approvals, reporting trust, and operational redesign
                </li>
              </ul>
            </div>

            <div className="contact-clean-card contact-clean-card--accent">
              <p className="eyebrow">What happens next</p>
              <ol className="contact-next-steps">
                <li>We review the operational context and urgency.</li>
                <li>We identify the right conversation path for the request.</li>
                <li>We reply directly with clear next steps.</li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      <FaqSection
        eyebrow="Consultation FAQ"
        title="What to expect when you reach out"
        summary="Short answers to common questions before a first Salesforce or BuilderTek consultation."
        items={contactFaqs}
      />
    </main>
  )
}

function ThankYouPage() {
  usePageMeta(
    'Thank You | Vextor',
    'Thank you for contacting Vextor. Your inquiry has been received and the team will contact you soon.',
    { path: '/thank-you', noindex: true }
  )
  useStructuredData('thank-you-page', {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Thank You | Vextor',
    url: 'https://www.vextor.co/thank-you',
    description: 'Thank you for contacting Vextor. Your inquiry has been received and the team will contact you soon.',
  })

  return (
    <main>
      <section className="section-wrap border-b border-border bg-card/60">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div className="space-y-6">
            <p className="eyebrow">Inquiry Received</p>
            <h1 className="section-title">Thanks for contacting Vextor</h1>
            <p className="section-summary max-w-2xl">
              Your message has been sent successfully. We will review the inquiry and contact you soon with the most practical next step.
            </p>
            <div className="editorial-reasons">
              {[
                'A Vextor consultant will review the operational context and the type of support your team needs.',
                'If the request is BuilderTek-specific or time-sensitive, we will factor that into the first response.',
                'If you need to add detail, you can follow up directly at hello@vextor.co.',
              ].map((item) => (
                <article key={item} className="editorial-reason">
                  <h3>{item}</h3>
                </article>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <Link to="/">
                <Button className="btn-solid" size="lg">
                  Back to Homepage
                </Button>
              </Link>
              <Link to="/services">
                <Button variant="outline" size="lg">
                  Review Services <ChevronRight className="ml-2 size-4" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="thank-you-panel">
            <div className="thank-you-stack">
              <article className="thank-you-step-card">
                <p className="eyebrow">Step 01</p>
                <h2>We review the request</h2>
                <p>We look at the Salesforce context, BuilderTek relevance, and the delivery issue your team described.</p>
              </article>
              <article className="thank-you-step-card">
                <p className="eyebrow">Step 02</p>
                <h2>We respond with the right next step</h2>
                <p>You will hear back with a focused follow-up, not a generic sales reply or a cluttered handoff.</p>
              </article>
              <article className="thank-you-step-card thank-you-step-card--accent">
                <p className="eyebrow">Step 03</p>
                <h2>We move the conversation forward</h2>
                <p>If the request is time-sensitive, inherited-org related, or BuilderTek-specific, we prioritize accordingly.</p>
              </article>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

function SuccessStoriesPage() {
  const storyFaqs: FaqEntry[] = [
    {
      question: 'Are these public client case studies?',
      answer:
        'These stories are representative examples of the operating situations Vextor is typically engaged to solve. They are structured to show delivery context, priorities, and outcomes without exposing private client details.',
    },
    {
      question: 'What kinds of problems usually lead teams to Vextor?',
      answer:
        'Common triggers include inherited Salesforce complexity, weak reporting trust, BuilderTek process friction, disconnected integrations, and the need for long-term platform ownership after implementation.',
    },
    {
      question: 'Does Vextor only work on one-time projects?',
      answer:
        'No. Many engagements begin with a focused architecture or recovery need and then continue into managed support, optimization, and release ownership as the business evolves.',
    },
  ]

  const stories = [
    {
      eyebrow: 'Representative Story 01',
      title: 'Inherited org recovery before more complexity is layered in',
      summary:
        'Teams bring Vextor in when Salesforce has become difficult to trust. Reporting is weak, automation is brittle, and every requested change carries more risk than it should.',
      detail:
        'The first step is usually not another feature. It is clarifying process ownership, cleaning up architecture decisions, and stabilizing the data and automation layers that the business is already relying on.',
      outcomes: [
        'Clearer operating model for admins, leadership, and delivery teams',
        'More reliable reporting and cleaner release decisions',
        'A maintainable system foundation before new automation is added',
      ],
      visual: '/images/success-story-foundation.svg',
      alt: 'Branded visual showing architecture recovery and system cleanup',
    },
    {
      eyebrow: 'Representative Story 02',
      title: 'BuilderTek execution support for real project operations',
      summary:
        'For BuilderTek-heavy teams, the problem is often not feature availability. The problem is that workflows, approvals, and job controls are not aligned to how the team actually executes work.',
      detail:
        'Vextor helps reshape the operational layer around procurement, approvals, visibility, and process usability so BuilderTek supports execution instead of creating friction around it.',
      outcomes: [
        'Better day-to-day usability for project and operations teams',
        'Cleaner approval and procurement paths inside the system',
        'Stronger alignment between BuilderTek behavior and real delivery needs',
      ],
      visual: '/images/success-story-buildertek.svg',
      alt: 'Branded visual showing BuilderTek workflow refinement and delivery visibility',
    },
    {
      eyebrow: 'Representative Story 03',
      title: 'Cross-system integration support for finance and operations',
      summary:
        'When Salesforce, ERP, estimating, accounting, or field systems are out of sync, teams lose confidence in the platform and start relying on manual side processes.',
      detail:
        'These engagements focus on integration structure, data handoffs, and the operational controls needed so different systems support one workflow instead of fragmenting it.',
      outcomes: [
        'More reliable handoffs between Salesforce and surrounding systems',
        'Lower dependence on manual reconciliation and side spreadsheets',
        'Stronger confidence in platform-wide visibility and coordination',
      ],
      visual: '/images/success-story-integrations.svg',
      alt: 'Branded visual showing cross-system integration and operational handoffs',
    },
  ]

  usePageMeta(
    'Vextor Success Stories | Salesforce Proof For Project-Based Teams',
    'Representative Salesforce and BuilderTek success stories showing how Vextor supports inherited org recovery, BuilderTek execution, and cross-system operational clarity.',
    { path: '/success-stories' }
  )
  useStructuredData('success-stories-page', {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Vextor Success Stories',
    url: 'https://www.vextor.co/success-stories',
    description:
      'Representative Salesforce and BuilderTek success stories showing how Vextor supports inherited org recovery, BuilderTek execution, and cross-system operational clarity.',
  })
  useStructuredData('success-stories-list', {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Representative Vextor Success Stories',
    itemListElement: stories.map((story, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: story.title,
      description: story.summary,
    })),
  })
  useStructuredData('success-stories-faq', {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: storyFaqs.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  })

  return (
    <main>
      <section className="section-wrap border-b border-border bg-card/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionIntro
            eyebrow="Success Stories"
            title="Representative proof of how Vextor is brought into operational Salesforce environments"
            summary="These examples show the kinds of inherited complexity, BuilderTek delivery issues, and cross-system process problems that project-based teams typically engage Vextor to solve."
            titleTag="h1"
          />
        </div>
      </section>

      <section className="section-wrap border-b border-border/80">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.02fr_0.98fr] lg:px-8">
          <div className="space-y-5">
            <SectionIntro
              eyebrow="Proof Layer"
              title="Not generic CRM work. Operational Salesforce work."
              summary="The value of Vextor shows up where approvals, reporting, BuilderTek execution, integrations, and release quality all intersect with how the business actually runs."
            />
            <ul className="space-y-2 text-sm leading-7 text-muted-foreground">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-1 size-4 text-accent" /> Representative examples centered on delivery context, not vague marketing claims.
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-1 size-4 text-accent" /> Built to help buyers, search engines, and LLMs understand exactly where Vextor fits.
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-1 size-4 text-accent" /> Focused on project-based operations, BuilderTek specialization, and long-term platform ownership.
              </li>
            </ul>
          </div>

          <Visual
            src="/images/success-story-proof-panel.svg"
            alt="Branded visual showing proof themes across architecture, BuilderTek, and integrations"
            caption="Architecture recovery, BuilderTek execution, and cross-system coordination as repeatable proof themes."
            className="min-h-[320px] lg:min-h-[430px]"
          />
        </div>
      </section>

      <section className="section-wrap">
        <div className="mx-auto max-w-7xl space-y-10 px-4 sm:px-6 lg:px-8">
          {stories.map((story, index) => (
            <div
              key={story.title}
              className={`story-showcase ${index % 2 === 1 ? 'story-showcase--reverse' : ''}`}
            >
              <div className="space-y-5">
                <p className="eyebrow">{story.eyebrow}</p>
                <h2 className="section-title">{story.title}</h2>
                <p className="section-summary max-w-none">{story.summary}</p>
                <p className="text-sm leading-7 text-muted-foreground">{story.detail}</p>
                <ul className="space-y-2 text-sm leading-7 text-muted-foreground">
                  {story.outcomes.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-1 size-4 text-accent" /> {item}
                    </li>
                  ))}
                </ul>
              </div>

              <Visual
                src={story.visual}
                alt={story.alt}
                caption="Representative visual for a common Vextor engagement pattern."
                className="min-h-[300px] lg:min-h-[380px]"
              />
            </div>
          ))}
        </div>
      </section>

      <FaqSection
        eyebrow="Proof FAQ"
        title="Questions about Vextor’s success-story approach"
        summary="Short answers that explain how these proof pages are structured and what they are designed to show."
        items={storyFaqs}
      />
    </main>
  )
}

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/industries" element={<IndustriesPage />} />
        <Route path="/work" element={<WorkPage />} />
        <Route path="/success-stories" element={<SuccessStoriesPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/thank-you" element={<ThankYouPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  )
}
