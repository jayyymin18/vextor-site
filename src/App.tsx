import React, { useEffect, useState } from 'react'
import { Link, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  CalendarCheck2,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  Code2,
  Compass,
  Database,
  HardHat,
  LandPlot,
  Layers3,
  Mail,
  MapPin,
  Menu,
  Phone,
  Route as RouteIcon,
  Settings2,
  ShieldCheck,
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
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

const staggerChildren = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
}

function usePageMeta(title: string, description: string) {
  useEffect(() => {
    document.title = title
    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null
    if (!meta) {
      meta = document.createElement('meta')
      meta.setAttribute('name', 'description')
      document.head.appendChild(meta)
    }
    meta.content = description
  }, [title, description])
}

function NavLink({ to, children }: { to: string; children: React.ReactNode }) {
  const location = useLocation()
  const isActive = location.pathname === to

  return (
    <Link
      to={to}
      className={`text-[0.82rem] font-medium tracking-[0.01em] transition-colors duration-150 ${
        isActive
          ? 'text-foreground'
          : 'text-muted-foreground hover:text-foreground'
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
  dark = false,
}: {
  eyebrow?: string
  title: string
  summary?: string
  align?: 'left' | 'center'
  dark?: boolean
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      variants={revealUp}
      className={align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}
    >
      {eyebrow ? (
        <p className={`eyebrow ${dark ? 'text-accent-soft' : ''}`}>{eyebrow}</p>
      ) : null}
      <h2 className={`section-title ${dark ? 'text-deep-foreground' : ''}`}>{title}</h2>
      {summary ? (
        <p className={`section-summary ${dark ? '!text-deep-muted' : ''}`}>{summary}</p>
      ) : null}
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
        <figcaption className="border-t border-border/70 px-5 py-3 text-[0.72rem] leading-relaxed text-muted-foreground">
          {caption}
        </figcaption>
      ) : null}
    </figure>
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

/* ─────────────────────────────────────────────────────────────
   HEADER
   ───────────────────────────────────────────────────────────── */
function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 border-b border-border/60 bg-background/96 backdrop-blur-md transition-shadow duration-200 ${
        scrolled ? 'shadow-[0_4px_24px_-12px_rgba(30,27,23,0.18)]' : ''
      }`}
    >
      <div className="mx-auto flex h-[66px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Brand */}
        <Link
          to="/"
          aria-label="Vextor home"
          className="inline-flex items-center gap-2.5 group"
        >
          <span
            className="brand-mark transition-opacity duration-150 group-hover:opacity-80"
            aria-hidden="true"
          />
          <span className="brand-word">Vextor</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to}>
              {item.label}
            </NavLink>
          ))}
          <Link to="/contact">
            <Button className="btn-solid" size="md">
              Start a Conversation <ArrowRight className="ml-2 size-3.5" />
            </Button>
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-[6px] border border-border p-2 text-muted-foreground transition hover:bg-card hover:text-foreground md:hidden"
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label="Toggle menu"
        >
          {open ? <X className="size-4.5" /> : <Menu className="size-4.5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open ? (
        <div
          id="mobile-nav"
          className="border-t border-border/60 bg-background/98 backdrop-blur-md md:hidden"
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-0.5 px-4 py-4 sm:px-6">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="rounded-[6px] px-3 py-2.5 text-[0.83rem] font-medium text-foreground transition hover:bg-card"
              >
                {item.label}
              </Link>
            ))}
            <Link to="/contact" className="mt-3">
              <Button className="btn-solid w-full justify-center" size="lg">
                Start a Conversation
              </Button>
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  )
}

/* ─────────────────────────────────────────────────────────────
   FOOTER
   ───────────────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="bg-deep text-deep-foreground border-t border-[hsl(0_0%_0%/0.25)]">
      <div className="mx-auto max-w-7xl px-4 pt-16 pb-10 sm:px-6 lg:px-8">

        <div className="grid gap-12 lg:grid-cols-[1.4fr_0.7fr_0.9fr]">

          {/* Brand column */}
          <div className="space-y-5">
            <Link to="/" className="inline-flex items-center gap-2.5">
              <span className="brand-mark" aria-hidden="true" />
              <span
                className="font-['DM_Serif_Display',Georgia,serif] text-xl font-normal tracking-[-0.02em] text-deep-foreground"
              >
                Vextor
              </span>
            </Link>
            <p className="max-w-sm text-[0.875rem] leading-[1.82] text-deep-muted">
              Salesforce consulting for operationally complex teams, with dedicated BuilderTek
              specialization for construction and project-driven environments.
            </p>
            <div className="flex flex-col gap-2.5 text-[0.82rem] text-deep-muted">
              <a
                href="mailto:hello@vextor.co"
                className="inline-flex items-center gap-2 transition-colors hover:text-accent-soft"
              >
                <Mail className="size-3.5 text-accent" />
                hello@vextor.co
              </a>
              <a
                href="tel:+919016070659"
                className="inline-flex items-center gap-2 transition-colors hover:text-accent-soft"
              >
                <Phone className="size-3.5 text-accent" />
                +91 90160 70659
              </a>
              <span className="inline-flex items-center gap-2">
                <MapPin className="size-3.5 text-accent" />
                Ahmedabad, India
              </span>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p className="footer-title">Navigation</p>
            <ul className="mt-5 space-y-3">
              {navItems.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-[0.83rem] text-deep-muted transition-colors hover:text-accent-soft"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Specializations */}
          <div>
            <p className="footer-title">Specializations</p>
            <ul className="mt-5 space-y-3 text-[0.83rem] text-deep-muted">
              <li>Salesforce Architecture</li>
              <li>Automation &amp; Workflow</li>
              <li>Apex &amp; LWC Development</li>
              <li>Integration Engineering</li>
              <li>BuilderTek Workflows</li>
              <li>Managed Support</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col gap-1.5 border-t border-[hsl(0_0%_100%/0.07)] pt-6 text-[0.7rem] text-deep-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Vextor Solution LLP. All rights reserved.</p>
          <p className="tracking-wide">Salesforce Consulting &nbsp;·&nbsp; BuilderTek Specialization &nbsp;·&nbsp; India</p>
        </div>
      </div>
    </footer>
  )
}

/* ─────────────────────────────────────────────────────────────
   HOME PAGE
   ───────────────────────────────────────────────────────────── */
function HomePage() {
  usePageMeta(
    'Vextor | Salesforce Consulting and BuilderTek Specialization',
    'Vextor provides Salesforce consulting, architecture, automation, custom development, integrations, and managed support. We also offer dedicated BuilderTek workflow support.'
  )

  const coreSalesforceCards = [
    {
      icon: Layers3,
      title: 'Salesforce Consulting',
      text: 'Roadmaps, platform decisions, and governance that keep delivery aligned with operations.',
    },
    {
      icon: ShieldCheck,
      title: 'Architecture and Automation',
      text: 'Data model, security, and workflow design for reliable execution at scale.',
    },
    {
      icon: Code2,
      title: 'Custom Development',
      text: 'Apex, LWC, and integration engineering for workflows beyond standard configuration.',
    },
    {
      icon: RouteIcon,
      title: 'Managed Support',
      text: 'Retainer support for enhancements, release quality, and operational continuity.',
    },
  ]

  const whyVextor = [
    {
      label: '01',
      title: 'Operationally grounded',
      body: 'We design systems around how teams actually run work, approvals, and handoffs.',
    },
    {
      label: '02',
      title: 'Senior execution',
      body: 'Architecture and engineering are delivered by experienced practitioners, not handoff chains.',
    },
    {
      label: '03',
      title: 'Long-term accountability',
      body: 'Our support model keeps delivery momentum and platform quality after go-live.',
    },
  ]

  return (
    <main>

      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="hero-wrap">
        <div className="relative z-10 mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-8 lg:py-24">

          <motion.div
            initial="hidden"
            animate="show"
            variants={revealUp}
            className="space-y-8"
          >
            {/* Eyebrow badge */}
            <p className="badge-premium">
              Salesforce Consulting Partner for Operations Teams
            </p>

            <h1 className="hero-title text-deep-foreground">
              Salesforce consulting built for businesses that run on process quality.
            </h1>

            <p className="hero-copy">
              Vextor helps teams improve Salesforce architecture, automation, custom development,
              integrations, and managed support. For BuilderTek customers, we offer dedicated
              workflow customization and system support as a specialized capability.
            </p>

            <div className="flex flex-wrap gap-3 pt-1">
              <Link to="/contact">
                <Button size="lg" className="btn-solid">
                  Discuss Your Salesforce Roadmap <CalendarCheck2 className="ml-2 size-4" />
                </Button>
              </Link>
              <Link to="/services#buildertek-specialization">
                <Button size="lg" className="btn-outline-dark">
                  Explore BuilderTek Support <ChevronRight className="ml-2 size-4" />
                </Button>
              </Link>
            </div>

            <ul className="grid gap-2.5 pt-1 text-[0.82rem] text-deep-muted sm:grid-cols-2">
              <li className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-accent flex-shrink-0" />
                Salesforce architecture and automation
              </li>
              <li className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-accent flex-shrink-0" />
                Apex and LWC development
              </li>
              <li className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-accent flex-shrink-0" />
                Integration engineering and support
              </li>
              <li className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-accent flex-shrink-0" />
                BuilderTek customization specialization
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <Visual
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1500&q=80"
              alt="Modern architectural office district representing enterprise operations"
              caption="Enterprise architecture, process reliability, and long-term operational planning."
              className="min-h-[440px]"
              objectPosition="center 48%"
            />
          </motion.div>
        </div>
      </section>

      {/* ── Core Services ─────────────────────────────────── */}
      <section className="section-wrap">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionIntro
            eyebrow="Core Salesforce Services"
            title="Salesforce consulting as the primary service line"
            summary="From architecture to managed support, we help teams build stable Salesforce operations without unnecessary complexity."
          />
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerChildren}
            className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4"
          >
            {coreSalesforceCards.map(({ icon: Icon, title, text }) => (
              <motion.div key={title} variants={revealUp}>
                <Card className="surface-card h-full">
                  <CardHeader>
                    <div className="icon-wrap mb-3">
                      <Icon className="size-4" />
                    </div>
                    <CardTitle className="text-[0.95rem] font-semibold">{title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-[0.85rem] leading-[1.75] text-muted-foreground">{text}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Partner Ecosystem ─────────────────────────────── */}
      <section className="border-y border-border bg-card/50 py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="eyebrow">Partner Ecosystem</p>
              <h2 className="section-title mt-2 text-[1.6rem]">
                Platform familiarity and partner-context positioning
              </h2>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <img
                src="/images/sf-partner-badge.svg"
                alt="Salesforce Partner badge"
                className="h-28 w-auto rounded-[8px] border border-border bg-[#0D2A55]"
                loading="lazy"
              />
              <img
                src="/images/appexchange-badge.svg"
                alt="Available on AppExchange badge"
                className="h-28 w-auto rounded-[8px] border border-border bg-[#E8E2D5]"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Clients Choose Vextor ─────────────────────── */}
      <section className="section-wrap">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionIntro
            eyebrow="Why Clients Choose Vextor"
            title="A serious consulting partner for complex operating environments"
            summary="We focus on delivery quality, platform reliability, and practical collaboration with your internal teams."
          />
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerChildren}
            className="mt-12 grid gap-5 md:grid-cols-3"
          >
            {whyVextor.map((item) => (
              <motion.div key={item.title} variants={revealUp}>
                <Card className="surface-card h-full">
                  <CardHeader>
                    <p className="text-[0.62rem] font-semibold tracking-[0.16em] uppercase text-muted-foreground/60 mb-2">
                      {item.label}
                    </p>
                    <CardTitle className="text-[1.05rem] font-['DM_Serif_Display',Georgia,serif] font-normal tracking-[-0.01em]">
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-[0.85rem] leading-[1.78] text-muted-foreground">{item.body}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── BuilderTek Specialization ─────────────────────── */}
      <section
        className="section-wrap border-y border-border"
        id="buildertek-home"
        style={{ background: 'hsl(38 22% 94%)' }}
      >
        <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-[1fr_1fr] lg:items-center lg:px-8">
          <div className="space-y-7">
            <SectionIntro
              eyebrow="BuilderTek Specialization"
              title="Dedicated BuilderTek support for construction and real-estate workflows"
              summary="BuilderTek is treated as a focused specialization. Clients engage us for workflow customization, operational improvements, and support in BuilderTek-heavy environments."
            />
            <ul className="space-y-3 text-[0.86rem] leading-[1.75] text-muted-foreground">
              {[
                'RFQ, quote, PO, and approval workflow refinement',
                'Budget and project operations process optimization',
                'BuilderTek usability and adoption improvements',
                'Integration and support for BuilderTek-centric teams',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 size-4 text-accent flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <Link
              to="/services#buildertek-specialization"
              className="inline-flex items-center gap-2 text-[0.83rem] font-medium text-accent hover:text-accent-strong transition-colors"
            >
              View BuilderTek specialization details <ArrowRight className="size-3.5" />
            </Link>
          </div>

          <Visual
            src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1500&q=80"
            alt="Construction project environment showing planning and execution context"
            caption="BuilderTek support for project operations, procurement flow, and execution control."
            className="min-h-[400px]"
            objectPosition="center 52%"
          />
        </div>
      </section>

      {/* ── How We Work ──────────────────────────────────── */}
      <section className="section-wrap">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionIntro
            eyebrow="Engagement Model"
            title="Structured engagement from architecture to support"
            summary="A delivery cadence designed for clarity, accountability, and sustained platform quality."
          />
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerChildren}
            className="mt-12 grid gap-5 md:grid-cols-4"
          >
            {[
              {
                step: '01',
                icon: ClipboardList,
                title: 'Assess',
                text: 'Review architecture, process risk, and delivery constraints.',
              },
              {
                step: '02',
                icon: Compass,
                title: 'Design',
                text: 'Define platform and workflow design before build starts.',
              },
              {
                step: '03',
                icon: Wrench,
                title: 'Deliver',
                text: 'Implement in controlled increments with review checkpoints.',
              },
              {
                step: '04',
                icon: Users,
                title: 'Support',
                text: 'Continue through retainer support and advisory continuity.',
              },
            ].map(({ step, icon: Icon, title, text }) => (
              <motion.div key={title} variants={revealUp}>
                <Card className="surface-card h-full">
                  <CardHeader>
                    <p className="step-chip">Step {step}</p>
                    <div className="mt-4 flex items-center gap-2.5">
                      <Icon className="size-4 text-accent" />
                      <CardTitle className="text-[0.95rem] font-semibold">{title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-[0.85rem] leading-[1.75] text-muted-foreground">{text}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Selected Capabilities ─────────────────────────── */}
      <section className="section-wrap border-y border-border bg-card/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionIntro
            eyebrow="Selected Capabilities"
            title="Common delivery blocks clients engage us for"
            summary="Representative capability blocks for architecture, development, and operational support conversations."
          />
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerChildren}
            className="mt-12 grid gap-5 md:grid-cols-3"
          >
            {[
              {
                title: 'Salesforce Architecture Alignment',
                body: 'Platform design, automation boundary cleanup, and release governance for multi-team environments.',
              },
              {
                title: 'Custom Workflow Engineering',
                body: 'Apex and LWC delivery for high-frequency workflows where user speed and data quality both matter.',
              },
              {
                title: 'BuilderTek Process Optimization',
                body: 'Procurement and approval process refinement for BuilderTek workflows tied to project execution.',
              },
            ].map((item) => (
              <motion.div key={item.title} variants={revealUp}>
                <Card className="surface-card h-full">
                  <CardHeader>
                    <CardTitle className="text-[1rem] font-['DM_Serif_Display',Georgia,serif] font-normal tracking-[-0.01em] leading-snug">
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-[0.85rem] leading-[1.78] text-muted-foreground">{item.body}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="section-wrap bg-deep text-deep-foreground">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-[10px] border border-[hsl(0_0%_100%/0.08)] bg-[hsl(0_0%_100%/0.035)] px-8 py-12 sm:px-12">
            <p className="eyebrow text-accent-soft">Consultation</p>
            <h2 className="section-title mt-4 max-w-2xl text-deep-foreground">
              Need a clear plan for Salesforce delivery or BuilderTek workflow support?
            </h2>
            <p className="section-summary mt-4 max-w-xl !text-deep-muted">
              Share your current bottlenecks. We will map a practical engagement path based on
              architecture, delivery scope, and support needs.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/contact">
                <Button size="lg" className="btn-solid">
                  Talk to Vextor <ArrowRight className="ml-2 size-4" />
                </Button>
              </Link>
              <Link to="/services">
                <Button size="lg" className="btn-outline-dark">
                  Review Services
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

    </main>
  )
}

/* ─────────────────────────────────────────────────────────────
   SERVICES PAGE
   ───────────────────────────────────────────────────────────── */
function ServicesPage() {
  usePageMeta(
    'Services | Vextor Salesforce Consulting',
    'Vextor offers Salesforce consulting, architecture, automation, custom development, integrations, and managed support, with BuilderTek specialization available separately.'
  )

  const serviceIcons = [Layers3, Compass, Settings2, Code2, Database, RouteIcon]

  return (
    <main>

      {/* Page header */}
      <section className="border-b border-border bg-card/50 pb-0 pt-16 sm:pt-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-14">
          <SectionIntro
            eyebrow="Services"
            title="Salesforce services and BuilderTek specialization"
            summary="Salesforce consulting is our primary service line. BuilderTek support is offered as a dedicated specialization for relevant clients."
          />
        </div>
      </section>

      {/* Salesforce services */}
      <section className="section-wrap">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionIntro
            eyebrow="Primary Service Line"
            title="Salesforce consulting and engineering"
            summary="Designed for operations teams that depend on Salesforce for execution quality and control."
          />
          <div className="mt-10 space-y-6">
            {salesforceServices.map((service, index) => {
              const Icon = serviceIcons[index]
              return (
                <motion.article
                  key={service.title}
                  className="service-article"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.08 }}
                  transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <div>
                    <h3 className="service-title">
                      <span className="icon-wrap mt-0.5">
                        <Icon className="size-4" />
                      </span>
                      {service.title}
                    </h3>
                    <p className="mt-3 text-[0.875rem] leading-[1.8] text-muted-foreground">
                      {service.summary}
                    </p>
                  </div>

                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    <Card className="surface-card border-border/80">
                      <CardHeader>
                        <CardTitle className="text-[0.82rem] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                          Common challenges addressed
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2.5">
                          {service.challenges.map((item) => (
                            <li
                              key={item}
                              className="flex items-start gap-2.5 text-[0.84rem] leading-[1.72] text-muted-foreground"
                            >
                              <CheckCircle2 className="mt-0.5 size-4 text-accent flex-shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="surface-card border-border/80">
                      <CardHeader>
                        <CardTitle className="text-[0.82rem] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                          Scope includes
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2.5">
                          {service.included.map((item) => (
                            <li
                              key={item}
                              className="flex items-start gap-2.5 text-[0.84rem] leading-[1.72] text-muted-foreground"
                            >
                              <CheckCircle2 className="mt-0.5 size-4 text-accent flex-shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="mt-5 rounded-[8px] border border-border/60 bg-background px-5 py-3.5 text-[0.84rem] leading-[1.72] text-muted-foreground">
                    <strong className="font-semibold text-foreground">Expected outcome:</strong>{' '}
                    {service.outcomes}
                  </div>
                </motion.article>
              )
            })}
          </div>
        </div>
      </section>

      {/* BuilderTek Specialization */}
      <section
        className="section-wrap border-y border-border"
        id="buildertek-specialization"
        style={{ background: 'hsl(38 22% 94%)' }}
      >
        <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-[1fr_1fr] lg:items-center lg:px-8">
          <div>
            <SectionIntro
              eyebrow="Specialization"
              title="BuilderTek support and customization"
              summary="A dedicated specialization for BuilderTek customers who need process tuning, workflow customization, and ongoing support."
            />
            <ul className="mt-7 space-y-3 text-[0.86rem] leading-[1.75] text-muted-foreground">
              {[
                'Project operations workflow mapping',
                'RFQ, quote, PO, and approval refinement',
                'Budget, controls, and reporting process improvements',
                'BuilderTek usability and adoption optimization',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 size-4 text-accent flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <Visual
            src="https://images.unsplash.com/photo-1541976590-713941681591?auto=format&fit=crop&w=1500&q=80"
            alt="Construction planning table with project drawings and laptop"
            caption="BuilderTek specialization focused on project delivery workflows."
            className="min-h-[360px]"
            objectPosition="center 50%"
          />
        </div>
      </section>

    </main>
  )
}

/* ─────────────────────────────────────────────────────────────
   INDUSTRIES PAGE
   ───────────────────────────────────────────────────────────── */
function IndustriesPage() {
  usePageMeta(
    'Industries | Vextor',
    'Vextor supports construction, real-estate, and operations-heavy businesses with Salesforce consulting and BuilderTek specialization.'
  )

  return (
    <main>

      <section className="border-b border-border bg-card/50 pb-0 pt-16 sm:pt-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-14">
          <SectionIntro
            eyebrow="Industries"
            title="Built for teams where operational precision matters"
            summary="We support industries that rely on Salesforce for workflow consistency and delivery execution."
          />
        </div>
      </section>

      <section className="section-wrap">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerChildren}
            className="grid gap-6 lg:grid-cols-3"
          >
            {[
              {
                icon: HardHat,
                title: 'Construction',
                text: 'Salesforce and BuilderTek support for procurement workflows, approvals, and project operations.',
              },
              {
                icon: LandPlot,
                title: 'Real Estate',
                text: 'Workflow and integration support across sales, project delivery, and finance coordination.',
              },
              {
                icon: Users,
                title: 'Operations-Intensive Teams',
                text: 'Architecture, automation, development, and support for businesses running critical process flows in Salesforce.',
              },
            ].map((item) => (
              <motion.div key={item.title} variants={revealUp}>
                <Card className="surface-card h-full">
                  <CardHeader>
                    <div className="icon-wrap mb-3">
                      <item.icon className="size-4" />
                    </div>
                    <CardTitle className="text-[1.05rem] font-['DM_Serif_Display',Georgia,serif] font-normal tracking-[-0.01em]">
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-[0.86rem] leading-[1.78] text-muted-foreground">{item.text}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section
        className="section-wrap border-y border-border"
        style={{ background: 'hsl(38 22% 94%)' }}
      >
        <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-[1fr_1fr] lg:items-center lg:px-8">
          <div>
            <SectionIntro
              eyebrow="BuilderTek Context"
              title="Where BuilderTek specialization is most relevant"
              summary="BuilderTek work is focused on operational process quality inside construction and project-driven environments."
            />
            <ul className="mt-7 space-y-3 text-[0.86rem] leading-[1.75] text-muted-foreground">
              {[
                'Procurement and purchasing workflow clarity',
                'Approval controls and escalation paths',
                'Budget visibility and role-based accountability',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 size-4 text-accent flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <Visual
            src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1500&q=80"
            alt="Urban construction project with crane and building structure"
            caption="BuilderTek process support for construction and real-estate operations."
            className="min-h-[340px]"
            objectPosition="center 52%"
          />
        </div>
      </section>

    </main>
  )
}

/* ─────────────────────────────────────────────────────────────
   WORK PAGE
   ───────────────────────────────────────────────────────────── */
function WorkPage() {
  usePageMeta(
    'Work | Vextor',
    'Review representative Vextor engagement patterns for Salesforce consulting and BuilderTek specialization.'
  )

  return (
    <main>

      <section className="border-b border-border bg-card/50 pb-0 pt-16 sm:pt-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-14">
          <SectionIntro
            eyebrow="Our Work"
            title="Operational Salesforce delivery across consulting, engineering, and support"
            summary="At Vextor, our work focuses on helping businesses extend and optimize Salesforce around real operating needs."
          />
        </div>
      </section>

      <section className="section-wrap">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerChildren}
            className="grid gap-5 md:grid-cols-2 lg:grid-cols-3"
          >
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
              <motion.div key={item.title} variants={revealUp}>
                <Card className="surface-card h-full">
                  <CardHeader>
                    <CardTitle className="text-[1rem] font-['DM_Serif_Display',Georgia,serif] font-normal tracking-[-0.01em] leading-snug">
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-[0.85rem] leading-[1.78] text-muted-foreground">{item.body}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section
        className="section-wrap border-y border-border"
        style={{ background: 'hsl(38 22% 94%)' }}
      >
        <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-[1fr_1fr] lg:items-center lg:px-8">
          <div>
            <SectionIntro
              eyebrow="Delivery Focus"
              title="What we typically execute in engagements"
              summary="Architecture, automation, custom engineering, and support are delivered with clear operating outcomes."
            />
            <ol className="mt-7 space-y-4">
              {[
                'Define business workflow requirements and process constraints.',
                'Design architecture and automation with maintainability in mind.',
                'Deliver in phases with quality controls and operational handover.',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4 text-[0.86rem] leading-[1.75] text-muted-foreground">
                  <span className="list-index mt-0.5">{i + 1}</span>
                  {item}
                </li>
              ))}
            </ol>
          </div>

          <Visual
            src="https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1500&q=80"
            alt="Operations and planning workspace for consulting execution"
            caption="Execution model built around workflow quality and delivery consistency."
            className="min-h-[320px]"
            objectPosition="center 46%"
          />
        </div>
      </section>

    </main>
  )
}

/* ─────────────────────────────────────────────────────────────
   ABOUT PAGE
   ───────────────────────────────────────────────────────────── */
function AboutPage() {
  usePageMeta(
    'About Vextor | Salesforce Consulting Team',
    'Vextor is a Salesforce consulting team with dedicated BuilderTek specialization for operations-focused businesses.'
  )

  return (
    <main>

      <section className="border-b border-border bg-card/50 pb-0 pt-16 sm:pt-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-14">
          <SectionIntro
            eyebrow="About Vextor"
            title="Building Salesforce systems that actually work for real operations"
            summary="Vextor was founded with a simple belief: Salesforce should not only store data, it should power how a business operates."
          />
        </div>
      </section>

      {/* Story */}
      <section className="section-wrap">
        <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-[1fr_1fr] lg:items-start lg:px-8">
          <div className="space-y-5">
            <p className="eyebrow">Our Story</p>
            <h2 className="section-title">
              A firm built around operational complexity
            </h2>
            <div className="space-y-4 text-[0.9rem] leading-[1.82] text-muted-foreground">
              <p>
                In many companies, Salesforce starts as CRM and then becomes the backbone of sales,
                operations, finance workflows, and project execution. As complexity grows, standard
                configuration is often not enough.
              </p>
              <p>
                Vextor exists to solve that gap. We help businesses design Salesforce environments that
                are reliable, scalable, and aligned to real day-to-day operating processes.
              </p>
            </div>
          </div>

          <Visual
            src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1500&q=80"
            alt="Consulting team planning session"
            caption="Hands-on consulting and architecture planning."
            className="min-h-[380px]"
            objectPosition="center 44%"
          />
        </div>
      </section>

      {/* Consulting Partner */}
      <section className="section-wrap border-y border-border bg-card/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionIntro
            eyebrow="Consulting Partner"
            title="A consulting partner, not just a vendor"
            summary="We work with clients as a long-term partner, not only for implementation but for continuous platform improvement."
          />
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerChildren}
            className="mt-12 grid gap-5 md:grid-cols-3"
          >
            {[
              {
                title: 'Architecture planning',
                text: 'Platform design that supports growth without introducing avoidable technical debt.',
              },
              {
                title: 'Custom development',
                text: 'Apex and LWC delivery where standard configuration cannot support operational needs.',
              },
              {
                title: 'Ongoing support',
                text: 'Long-term support and enhancement cycles as your operating model evolves.',
              },
            ].map((item) => (
              <motion.div key={item.title} variants={revealUp}>
                <Card className="surface-card h-full">
                  <CardHeader>
                    <CardTitle className="text-[1rem] font-['DM_Serif_Display',Georgia,serif] font-normal tracking-[-0.01em]">
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-[0.85rem] leading-[1.78] text-muted-foreground">{item.text}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Expertise */}
      <section className="section-wrap">
        <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-[1fr_1fr] lg:items-start lg:px-8">
          <div>
            <SectionIntro
              eyebrow="Expertise"
              title="Deep Salesforce expertise with operational focus"
              summary="Our team works at the intersection of business operations and Salesforce technology."
            />
            <ul className="mt-7 space-y-3 text-[0.86rem] leading-[1.75] text-muted-foreground">
              {[
                'Salesforce architecture and system design',
                'Apex and Lightning Web Component development',
                'Process automation and workflow optimization',
                'Integration design and API connectivity',
                'Reporting and operational visibility',
                'Managed support and enhancement delivery',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 size-4 text-accent flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <Visual
            src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1500&q=80"
            alt="Business operations planning desk"
            caption="Operational focus across architecture, automation, and engineering."
            className="min-h-[360px]"
            objectPosition="center 48%"
          />
        </div>
      </section>

      {/* BuilderTek */}
      <section
        className="section-wrap border-y border-border"
        style={{ background: 'hsl(38 22% 94%)' }}
      >
        <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-[1fr_1fr] lg:items-center lg:px-8">
          <div>
            <SectionIntro
              eyebrow="BuilderTek Specialization"
              title="Dedicated support for BuilderTek-centric teams"
              summary="Alongside broader Salesforce consulting, we support BuilderTek customers who need deeper workflow customization."
            />
            <ul className="mt-7 space-y-3 text-[0.86rem] leading-[1.75] text-muted-foreground">
              {[
                'Workflow automation and process design',
                'Project and purchasing workflow customization',
                'RFQ, quote, and PO process improvements',
                'UX improvements and operational reporting',
                'Integrations with other business systems',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 size-4 text-accent flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <Visual
            src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1500&q=80"
            alt="Construction and project execution environment"
            caption="BuilderTek specialization for project and construction workflows."
            className="min-h-[360px]"
            objectPosition="center 48%"
          />
        </div>
      </section>

      {/* Philosophy */}
      <section className="section-wrap">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionIntro
            eyebrow="Philosophy"
            title="Technology should serve the business"
            summary="Every engagement follows a practical operating philosophy."
          />
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerChildren}
            className="mt-12 grid gap-5 md:grid-cols-4"
          >
            {[
              { title: 'Practical', text: 'Designed around real business processes.' },
              { title: 'Reliable', text: 'Built with clean architecture and scalable design.' },
              { title: 'Adaptable', text: 'Flexible enough to evolve as operations change.' },
              { title: 'Efficient', text: 'Reduces manual work and improves visibility.' },
            ].map((item) => (
              <motion.div key={item.title} variants={revealUp}>
                <Card className="surface-card h-full">
                  <CardHeader>
                    <CardTitle className="text-[1.05rem] font-['DM_Serif_Display',Georgia,serif] font-normal tracking-[-0.01em]">
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-[0.85rem] leading-[1.75] text-muted-foreground">{item.text}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Vextor */}
      <section className="section-wrap border-y border-border bg-card/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionIntro
            eyebrow="Why Vextor"
            title="Why companies work with Vextor"
            summary="Companies usually engage us when they need specialist Salesforce and BuilderTek support with long-term reliability."
          />
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerChildren}
            className="mt-12 grid gap-4 md:grid-cols-2"
          >
            {[
              'A reliable Salesforce consulting partner',
              'Custom development beyond standard configuration',
              'Workflow automation aligned to real operations',
              'BuilderTek customization and support',
              'Ongoing system improvements and enhancements',
            ].map((item) => (
              <motion.div key={item} variants={revealUp}>
                <div className="flex items-start gap-3 rounded-[8px] border border-border bg-card px-5 py-4 text-[0.86rem] leading-[1.72] text-muted-foreground">
                  <CheckCircle2 className="mt-0.5 size-4 text-accent flex-shrink-0" />
                  {item}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

    </main>
  )
}

/* ─────────────────────────────────────────────────────────────
   CONTACT PAGE
   ───────────────────────────────────────────────────────────── */
function ContactPage() {
  usePageMeta(
    'Contact Vextor | Salesforce Consultation',
    'Contact Vextor to discuss Salesforce consulting, architecture, custom development, and BuilderTek specialization support.'
  )

  return (
    <main>

      <section className="border-b border-border bg-card/50 pb-0 pt-16 sm:pt-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-14">
          <SectionIntro
            eyebrow="Contact"
            title="Book a focused consultation"
            summary="Share your current Salesforce or BuilderTek challenge and we will propose the most practical next step."
          />
        </div>
      </section>

      <section className="section-wrap">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">

          {/* Left: Form + tips */}
          <div className="space-y-5">
            <Card className="surface-card">
              <CardHeader className="pb-4">
                <p className="eyebrow">Inquiry</p>
                <h2 className="mt-2 font-['DM_Serif_Display',Georgia,serif] text-[1.55rem] font-normal tracking-[-0.015em] leading-snug">
                  Send us a message
                </h2>
              </CardHeader>
              <CardContent>
                <form
                  action="https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8&orgId=00DdN00000t9uBN"
                  method="POST"
                  className="space-y-4"
                >
                  <input type="hidden" name="oid" value="00DdN00000t9uBN" />
                  <input type="hidden" name="retURL" value="http://www.vextor.co" />

                  <div className="webtolead-grid">
                    <div className="webtolead-field">
                      <label className="form-label" htmlFor="first_name">First Name</label>
                      <input
                        className="webtolead-input"
                        id="first_name"
                        maxLength={40}
                        name="first_name"
                        type="text"
                        placeholder="Jane"
                      />
                    </div>
                    <div className="webtolead-field">
                      <label className="form-label" htmlFor="last_name">Last Name</label>
                      <input
                        className="webtolead-input"
                        id="last_name"
                        maxLength={80}
                        name="last_name"
                        type="text"
                        required
                        placeholder="Smith"
                      />
                    </div>
                  </div>

                  <div className="webtolead-grid">
                    <div className="webtolead-field">
                      <label className="form-label" htmlFor="email">Email Address</label>
                      <input
                        className="webtolead-input"
                        id="email"
                        maxLength={80}
                        name="email"
                        type="email"
                        required
                        placeholder="jane@company.com"
                      />
                    </div>
                    <div className="webtolead-field">
                      <label className="form-label" htmlFor="mobile">Phone</label>
                      <input
                        className="webtolead-input"
                        id="mobile"
                        maxLength={40}
                        name="mobile"
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                  </div>

                  <div className="webtolead-grid">
                    <div className="webtolead-field">
                      <label className="form-label" htmlFor="company">Company</label>
                      <input
                        className="webtolead-input"
                        id="company"
                        maxLength={40}
                        name="company"
                        type="text"
                        required
                        placeholder="Your Company"
                      />
                    </div>
                    <div className="webtolead-field">
                      <label className="form-label" htmlFor="city">City</label>
                      <input
                        className="webtolead-input"
                        id="city"
                        maxLength={40}
                        name="city"
                        type="text"
                        placeholder="New York"
                      />
                    </div>
                  </div>

                  <div className="webtolead-grid">
                    <div className="webtolead-field">
                      <label className="form-label" htmlFor="state">State / Province</label>
                      <input
                        className="webtolead-input"
                        id="state"
                        maxLength={20}
                        name="state"
                        type="text"
                        placeholder="NY"
                      />
                    </div>
                    <div className="webtolead-field">
                      <label className="form-label" htmlFor="country">Country</label>
                      <input
                        className="webtolead-input"
                        id="country"
                        maxLength={40}
                        name="country"
                        type="text"
                        placeholder="United States"
                      />
                    </div>
                  </div>

                  <div className="pt-2">
                    <Button
                      type="submit"
                      name="submit"
                      size="lg"
                      className="btn-solid w-full justify-center"
                    >
                      Submit Inquiry <ArrowRight className="ml-2 size-4" />
                    </Button>
                  </div>
                  <p className="text-center text-[0.72rem] text-muted-foreground">
                    You will be redirected to vextor.co after successful submission.
                  </p>
                </form>
              </CardContent>
            </Card>

            <Card className="surface-card">
              <CardHeader>
                <CardTitle className="text-[0.82rem] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                  Before you submit
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {[
                    'Mention your current Salesforce setup and where you need help.',
                    'Add whether this is Salesforce consulting, BuilderTek support, or both.',
                    'Share timeline expectations so we can scope the right engagement model.',
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-[0.85rem] leading-[1.72] text-muted-foreground"
                    >
                      <CheckCircle2 className="mt-0.5 size-4 text-accent flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Right: Next steps + contact info + image */}
          <div className="space-y-5">
            <Card className="surface-card">
              <CardHeader>
                <p className="eyebrow">Process</p>
                <CardTitle className="mt-2 text-[1rem] font-['DM_Serif_Display',Georgia,serif] font-normal tracking-[-0.01em]">
                  What happens next
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-4">
                  {[
                    'We review your operating context and primary goals.',
                    'We hold a focused consultation around scope and delivery path.',
                    'We share an engagement recommendation with priorities and cadence.',
                  ].map((item, i) => (
                    <li key={i} className="flex gap-3.5 text-[0.86rem] leading-[1.72] text-muted-foreground">
                      <span className="list-index mt-0.5">{i + 1}</span>
                      {item}
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>

            <Card className="surface-card">
              <CardHeader>
                <CardTitle className="text-[0.82rem] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                  Direct Contact
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3.5">
                <p className="flex items-center gap-2.5 text-[0.86rem] text-muted-foreground">
                  <Mail className="size-4 text-accent flex-shrink-0" />
                  <a className="hover:text-accent transition-colors" href="mailto:hello@vextor.co">
                    hello@vextor.co
                  </a>
                </p>
                <p className="flex items-center gap-2.5 text-[0.86rem] text-muted-foreground">
                  <Phone className="size-4 text-accent flex-shrink-0" />
                  <a className="hover:text-accent transition-colors" href="tel:+919016070659">
                    +91 90160 70659
                  </a>
                </p>
                <p className="flex items-center gap-2.5 text-[0.86rem] text-muted-foreground">
                  <MapPin className="size-4 text-accent flex-shrink-0" />
                  Ahmedabad, India
                </p>
              </CardContent>
            </Card>

            <Visual
              src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1500&q=80"
              alt="Business team in a focused planning meeting"
              caption="Consultation-led approach with structured implementation planning."
              className="min-h-[280px]"
              objectPosition="center 45%"
            />
          </div>
        </div>
      </section>

    </main>
  )
}

/* ─────────────────────────────────────────────────────────────
   APP ROOT
   ───────────────────────────────────────────────────────────── */
export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/"           element={<HomePage />} />
        <Route path="/services"   element={<ServicesPage />} />
        <Route path="/industries" element={<IndustriesPage />} />
        <Route path="/work"       element={<WorkPage />} />
        <Route path="/about"      element={<AboutPage />} />
        <Route path="/contact"    element={<ContactPage />} />
        <Route path="*"           element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  )
}
