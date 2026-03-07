import React, { useEffect, useState } from 'react'
import { Link, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  CalendarCheck2,
  CheckCircle2,
  ChevronRight,
  CircuitBoard,
  ClipboardList,
  Code2,
  Compass,
  Database,
  Handshake,
  Hammer,
  HardHat,
  LandPlot,
  Layers3,
  Mail,
  MapPin,
  Menu,
  Phone,
  Settings2,
  ShieldCheck,
  TimerReset,
  Users,
  Wrench,
  X,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

type ServiceDetail = {
  title: string
  summary: string
  problemsSolved: string[]
  included: string[]
  idealClient: string
  outcomes: string
}

const navItems = [
  { label: 'Services', to: '/services' },
  { label: 'Industries', to: '/industries' },
  { label: 'Work', to: '/work' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

const serviceCards = [
  {
    icon: Layers3,
    title: 'Salesforce Consulting',
    description: 'Roadmaps, architecture decisions, platform governance, and implementation planning.',
  },
  {
    icon: CircuitBoard,
    title: 'Salesforce Architecture',
    description: 'Scalable org design for teams with complex approvals, data, and cross-team dependencies.',
  },
  {
    icon: Code2,
    title: 'Custom Development',
    description: 'Apex, LWC, APIs, and integrations for processes that do not fit out-of-the-box logic.',
  },
  {
    icon: Hammer,
    title: 'BuilderTek Customization',
    description: 'BuilderTek workflow refinements for RFQ, quote, PO, budgeting, and project operations.',
  },
  {
    icon: Settings2,
    title: 'Automation & Workflow',
    description: 'Process redesign with Flow, approvals, notifications, and operational controls.',
  },
  {
    icon: TimerReset,
    title: 'Managed Support',
    description: 'Retainer-based support for ongoing improvements, incident response, and user requests.',
  },
]

const servicesCatalog: ServiceDetail[] = [
  {
    title: 'Salesforce Consulting',
    summary:
      'Executive and operations-facing consulting to keep platform decisions aligned with business priorities.',
    problemsSolved: [
      'Unclear platform roadmap and competing stakeholder priorities',
      'Repeated rework from reactive, sprint-to-sprint decisions',
      'Slow delivery because teams are unsure what to standardize vs customize',
    ],
    included: [
      'Current-state audit and architecture recommendations',
      'Roadmap by business capability and delivery phase',
      'Governance framework for release quality and ownership',
    ],
    idealClient:
      'Organizations with growing Salesforce usage that need a senior consulting partner for platform direction.',
    outcomes:
      'A practical delivery plan, cleaner decision-making, and fewer expensive technical detours.',
  },
  {
    title: 'Salesforce Architecture',
    summary:
      'Architecture for data, security, and process boundaries so operations scale without creating an unstable org.',
    problemsSolved: [
      'Data model complexity causing report inconsistency and duplicate logic',
      'Security model gaps that block collaboration or introduce risk',
      'Integration architecture that breaks under operational volume',
    ],
    included: [
      'Object model and automation boundary design',
      'Profiles, permission sets, sharing, and record visibility strategy',
      'Release architecture with environment and deployment standards',
    ],
    idealClient:
      'Salesforce-heavy operations teams where multiple departments depend on clean data and reliable workflows.',
    outcomes:
      'A resilient technical foundation that supports delivery velocity and lower maintenance overhead.',
  },
  {
    title: 'Custom Development (Apex, LWC, Integrations)',
    summary:
      'Custom engineering for workflows where standard configuration cannot support operational requirements.',
    problemsSolved: [
      'Complex process rules that exceed native flow behavior',
      'Slow user workflows due to fragmented UI and repetitive manual steps',
      'Data latency between Salesforce and accounting, ERP, or project systems',
    ],
    included: [
      'Apex services, triggers, and orchestration patterns',
      'LWC interfaces optimized for role-specific daily workflows',
      'REST or event-driven integration services with robust error handling',
    ],
    idealClient:
      'Businesses running high-volume or specialized workflows that need disciplined engineering.',
    outcomes:
      'Faster operations, cleaner user experience, and dependable cross-system execution.',
  },
  {
    title: 'BuilderTek Customization',
    summary:
      'BuilderTek-focused consulting and implementation support tailored to construction and real-estate operations.',
    problemsSolved: [
      'RFQ, quote, and PO workflows that are hard to track end-to-end',
      'Budget and approval steps that rely on email and disconnected spreadsheets',
      'Low adoption caused by high-friction screens and unclear ownership',
    ],
    included: [
      'BuilderTek workflow mapping for office and field operations',
      'Process automation, custom screens, and role-based controls',
      'Operational reporting setup for project and procurement visibility',
    ],
    idealClient:
      'Construction and real-estate teams using BuilderTek who need tighter operational execution.',
    outcomes:
      'More predictable project execution, clearer procurement flow, and better platform adoption.',
  },
  {
    title: 'Automation & Workflow Design',
    summary:
      'End-to-end workflow redesign to remove manual handoffs and improve process reliability.',
    problemsSolved: [
      'Approval bottlenecks and unclear accountability',
      'Inconsistent process execution between departments',
      'Excessive manual updates reducing data quality',
    ],
    included: [
      'Process mapping and decision-point design',
      'Flow automation with exception paths and alerts',
      'Operational dashboards for SLA and throughput tracking',
    ],
    idealClient:
      'Operations leaders who need predictable execution and better visibility into process health.',
    outcomes:
      'Fewer process stalls, stronger data discipline, and improved operational throughput.',
  },
  {
    title: 'Managed Support / Retainers',
    summary:
      'Long-term Salesforce and BuilderTek support for teams that need dependable delivery after go-live.',
    problemsSolved: [
      'Backlogs that grow faster than internal teams can handle',
      'Production issues without clear triage ownership',
      'No structured cadence for optimization and maintenance',
    ],
    included: [
      'Prioritized backlog management and sprint-based improvements',
      'Support SLAs, issue triage, and release coordination',
      'Monthly advisory reviews and architecture checkpoints',
    ],
    idealClient:
      'Teams needing an embedded partner for ongoing enhancements, support, and roadmap execution.',
    outcomes:
      'Steady improvement velocity and reliable support without building a full in-house consulting bench.',
  },
]

const revealUp = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
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
      className={`text-sm font-medium transition-colors ${
        isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
      }`}
      aria-current={isActive ? 'page' : undefined}
    >
      {children}
    </Link>
  )
}

function ImagePanel({
  src,
  alt,
  label,
  caption,
  className,
}: {
  src: string
  alt: string
  label: string
  caption: string
  className?: string
}) {
  return (
    <figure className={`image-frame ${className ?? ''}`}>
      <img src={src} alt={alt} className="h-full w-full object-cover" loading="lazy" />
      <figcaption className="space-y-1 border-t border-border px-4 py-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">{label}</p>
        <p className="text-xs text-muted-foreground">{caption}</p>
      </figcaption>
    </figure>
  )
}

function SectionIntro({
  eyebrow,
  title,
  summary,
  align = 'left',
}: {
  eyebrow?: string
  title: string
  summary?: string
  align?: 'left' | 'center'
}) {
  return (
    <motion.div
      className={align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={revealUp}
    >
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2 className="section-title">{title}</h2>
      {summary ? <p className="section-summary">{summary}</p> : null}
    </motion.div>
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
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-end gap-3" aria-label="Vextor home">
          <span className="brand-mark" aria-hidden="true" />
          <span>
            <span className="block text-lg font-semibold tracking-tight">Vextor</span>
            <span className="block text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
              Vextor Solution LLP
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to}>
              {item.label}
            </NavLink>
          ))}
          <Link to="/contact">
            <Button size="md" className="btn-solid">
              Book a Consultation <ArrowRight className="ml-2 size-4" />
            </Button>
          </Link>
        </nav>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-xl border border-border p-2 text-foreground transition hover:bg-card md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label="Toggle menu"
          onClick={() => setOpen((current) => !current)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open ? (
        <div id="mobile-nav" className="border-t border-border bg-background md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4 sm:px-6">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="rounded-xl px-3 py-2 text-sm font-medium text-foreground transition hover:bg-card"
              >
                {item.label}
              </Link>
            ))}
            <Link to="/contact" className="mt-2">
              <Button size="md" className="btn-solid w-full justify-center">
                Start a Project Conversation
              </Button>
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  )
}

function Footer() {
  return (
    <footer className="border-t border-border bg-card/55">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr_0.9fr]">
          <div className="space-y-4">
            <p className="eyebrow">Vextor Solution LLP</p>
            <h2 className="text-2xl font-semibold tracking-tight">
              Salesforce and BuilderTek consulting for teams that run on operations, not theory.
            </h2>
            <p className="max-w-xl text-sm text-muted-foreground">
              We partner with construction, real-estate, and Salesforce-heavy teams that need architecture,
              custom development, automation, integrations, and long-term support.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-muted-foreground">Pages</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <Link to="/services" className="hover:text-accent">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/industries" className="hover:text-accent">
                  Construction & BuilderTek
                </Link>
              </li>
              <li>
                <Link to="/work" className="hover:text-accent">
                  Selected Work
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-accent">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-accent">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-muted-foreground">Contact</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Mail className="size-4 text-accent" />
                <a href="mailto:hello@vextor.co" className="hover:text-accent">
                  hello@vextor.co
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="size-4 text-accent" />
                <a href="tel:+919016070659" className="hover:text-accent">
                  +91 90160 70659
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="size-4 text-accent" /> Ahmedabad, India
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-border pt-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Vextor Solution LLP. All rights reserved.</p>
          <p>Salesforce consulting, BuilderTek specialization, architecture-first delivery.</p>
        </div>
      </div>
    </footer>
  )
}

function HomePage() {
  usePageMeta(
    'Vextor | Salesforce and BuilderTek Consulting Partner',
    'Vextor helps construction, real-estate, and operations teams design Salesforce architecture, BuilderTek workflows, custom development, integrations, and managed support.'
  )

  const homeCapabilities = [
    {
      title: 'Architecture decisions that prevent expensive rework',
      detail: 'Data model, security, and workflow boundaries aligned to real operating conditions.',
    },
    {
      title: 'BuilderTek process depth where execution matters',
      detail: 'RFQ, quote, PO, budget, approvals, and project tracking designed for speed and control.',
    },
    {
      title: 'Long-term support without enterprise-agency overhead',
      detail: 'Senior consulting and delivery continuity through structured retainers and clear SLAs.',
    },
  ]

  return (
    <main>
      <section className="hero-surface">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-20">
          <motion.div initial="hidden" animate="show" variants={revealUp} className="space-y-7">
            <Badge className="badge-premium">Salesforce + BuilderTek Consulting Partner</Badge>
            <h1 className="hero-title">
              Salesforce and BuilderTek systems built for operations teams that cannot afford friction.
            </h1>
            <p className="hero-copy">
              Vextor helps construction, real-estate, and process-heavy businesses fix platform bottlenecks,
              design stable architecture, build custom workflows, and run reliable long-term support.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/contact">
                <Button size="lg" className="btn-solid">
                  Book a Consultation <CalendarCheck2 className="ml-2 size-4" />
                </Button>
              </Link>
              <Link to="/industries">
                <Button variant="outline" size="lg" className="btn-outline">
                  Explore BuilderTek Support <ChevronRight className="ml-2 size-4" />
                </Button>
              </Link>
            </div>
            <ul className="grid gap-2 text-sm text-deep-muted sm:grid-cols-2">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 size-4 text-accent" /> Built for Salesforce-run operations teams
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 size-4 text-accent" /> Architecture, automation, custom engineering
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 size-4 text-accent" /> BuilderTek workflow customization depth
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 size-4 text-accent" /> Retainer model for continuous support
              </li>
            </ul>
          </motion.div>

          {/* Replace /public/images/hero-operations-grid.svg with a premium architecture + operations visual */}
          <ImagePanel
            src="/images/hero-operations-grid.svg"
            alt="Editorial operations board showing architectural lines and workflow blocks"
            label="Hero Visual"
            caption="Recommended replacement: architectural project-floor + workflow/dashboard composite image."
            className="min-h-[420px]"
          />
        </div>
      </section>

      <section className="section-wrap">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionIntro
            eyebrow="Trust and Positioning"
            title="Built for teams that rely on Salesforce to run daily operations."
            summary="We work best where delivery, finance, procurement, and field execution depend on clear workflows and dependable systems."
          />

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {homeCapabilities.map((item) => (
              <Card key={item.title} className="surface-card">
                <CardHeader>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{item.detail}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section-wrap border-y border-border bg-card/55">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionIntro
            eyebrow="Services"
            title="What Vextor delivers"
            summary="Consulting, architecture, engineering, and support organized around business-critical operations."
          />

          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {serviceCards.map(({ icon: Icon, title, description }) => (
              <Card key={title} className="surface-card group">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-base">
                    <span className="icon-wrap">
                      <Icon className="size-4" />
                    </span>
                    {title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section-wrap">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
          <div className="space-y-6">
            <SectionIntro
              eyebrow="BuilderTek Specialization"
              title="We understand how BuilderTek workflows affect project execution."
              summary="Our work focuses on operational flow, not cosmetic configuration. We optimize the steps your team actually depends on every day."
            />
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                'Project operations planning and role-based ownership',
                'RFQ, quote, and PO lifecycle alignment across teams',
                'Budget checks, approval controls, and auditability',
                'Custom interfaces for procurement and field-to-office handoffs',
                'Integrations between Salesforce, finance, and external systems',
                'Usability and adoption improvements for high-frequency users',
              ].map((point) => (
                <p key={point} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="mt-0.5 size-4 text-accent" /> {point}
                </p>
              ))}
            </div>
            <Link to="/industries" className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-accent">
              See the Construction + BuilderTek page <ArrowRight className="size-4" />
            </Link>
          </div>

          {/* Replace /public/images/buildertek-workflow-board.svg with BuilderTek process / dashboard imagery */}
          <ImagePanel
            src="/images/buildertek-workflow-board.svg"
            alt="Workflow board representing BuilderTek operations"
            label="BuilderTek Visual"
            caption="Recommended replacement: BuilderTek-oriented workflow board or project procurement dashboard scene."
            className="min-h-[390px]"
          />
        </div>
      </section>

      <section className="section-wrap border-y border-border bg-card/55">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionIntro
            eyebrow="How We Work"
            title="Clear engagement from discovery to ongoing support"
            summary="Structured delivery with practical milestones, technical accountability, and transparent communication."
          />

          <div className="mt-10 grid gap-5 md:grid-cols-4">
            {[
              {
                step: '01',
                title: 'Assess',
                text: 'Map current architecture, process risks, delivery gaps, and team constraints.',
                icon: ClipboardList,
              },
              {
                step: '02',
                title: 'Design',
                text: 'Define architecture and workflow blueprint with implementation priorities.',
                icon: Compass,
              },
              {
                step: '03',
                title: 'Build',
                text: 'Implement with iterative releases, QA controls, and stakeholder checkpoints.',
                icon: Wrench,
              },
              {
                step: '04',
                title: 'Support',
                text: 'Stabilize and evolve through a retainer model built for long-term value.',
                icon: Handshake,
              },
            ].map(({ step, title, text, icon: Icon }) => (
              <Card key={title} className="surface-card">
                <CardHeader>
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">Step {step}</p>
                  <CardTitle className="mt-2 flex items-center gap-2 text-base">
                    <Icon className="size-4 text-accent" /> {title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section-wrap">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionIntro
            eyebrow="Engagement Model"
            title="Flexible project delivery and retainer support"
            summary="Choose a model that matches your current stage, internal capacity, and roadmap urgency."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              {
                title: 'Focused Delivery Sprint',
                text: 'For clearly scoped architecture or implementation blocks with defined milestones.',
                chips: ['Defined scope', 'Delivery roadmap', 'Execution checkpoints'],
              },
              {
                title: 'Implementation Partner Model',
                text: 'For teams needing ongoing build velocity across multiple workflows and stakeholders.',
                chips: ['Senior consulting access', 'Iterative releases', 'Cross-team coordination'],
              },
              {
                title: 'Managed Salesforce Retainer',
                text: 'For long-term optimization, support, and continuous platform improvement.',
                chips: ['Support SLAs', 'Backlog ownership', 'Monthly advisory reviews'],
              },
            ].map((item) => (
              <Card key={item.title} className="surface-card">
                <CardHeader>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{item.text}</p>
                  <div className="flex flex-wrap gap-2">
                    {item.chips.map((chip) => (
                      <span key={chip} className="chip-small">
                        {chip}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section-wrap border-y border-border bg-deep text-deep-foreground">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionIntro
            eyebrow="Why Vextor"
            title="A specialist partner between freelance fragility and agency bloat"
            summary="You get senior technical judgment, consistent execution quality, and delivery ownership from start to support."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              {
                heading: 'Operational Context',
                body: 'We design for real workflows involving approvals, procurement dependencies, and field coordination.',
              },
              {
                heading: 'Technical Depth',
                body: 'Architecture, Apex/LWC engineering, and integration design are delivered by the same accountable team.',
              },
              {
                heading: 'Long-Term Reliability',
                body: 'Retainer support keeps your platform stable while your business processes continue to evolve.',
              },
            ].map((point) => (
              <Card key={point.heading} className="surface-card dark-surface-card">
                <CardHeader>
                  <CardTitle className="text-lg text-deep-foreground">{point.heading}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-deep-muted">{point.body}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section-wrap">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Card className="surface-card p-8 sm:p-10">
            <p className="eyebrow">Start the Conversation</p>
            <h2 className="section-title max-w-2xl">
              Discuss your Salesforce roadmap with a team that understands operations and delivery pressure.
            </h2>
            <p className="section-summary max-w-2xl">
              We can review architecture risks, BuilderTek process bottlenecks, custom development priorities, and
              support options in a focused consultation call.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/contact">
                <Button size="lg" className="btn-solid">
                  Talk to Vextor <ArrowRight className="ml-2 size-4" />
                </Button>
              </Link>
              <Link to="/services">
                <Button variant="outline" size="lg" className="btn-outline">
                  Review Service Scope
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </section>
    </main>
  )
}

function ServicesPage() {
  usePageMeta(
    'Services | Vextor Salesforce and BuilderTek Consulting',
    'Explore Vextor services: Salesforce consulting, architecture, custom development, BuilderTek customization, automation, and managed support retainers.'
  )

  const serviceIcons = [Layers3, ShieldCheck, Code2, Hammer, Settings2, TimerReset]

  return (
    <main>
      <section className="section-wrap border-b border-border bg-card/55">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionIntro
            eyebrow="Services"
            title="Salesforce and BuilderTek services designed for long-term operational reliability"
            summary="Each engagement is structured around practical delivery outcomes, not generic implementation scope."
          />
        </div>
      </section>

      <section className="section-wrap">
        <div className="mx-auto max-w-7xl space-y-6 px-4 sm:px-6 lg:px-8">
          {servicesCatalog.map((service, index) => {
            const Icon = serviceIcons[index]
            return (
              <article key={service.title} className="service-article">
                <div>
                  <p className="eyebrow">Service {index + 1}</p>
                  <h2 className="section-title mt-2 flex items-center gap-3 text-2xl sm:text-3xl">
                    <span className="icon-wrap">
                      <Icon className="size-4" />
                    </span>
                    {service.title}
                  </h2>
                  <p className="mt-4 text-sm leading-7 text-muted-foreground">{service.summary}</p>
                  <p className="mt-5 rounded-2xl border border-border/70 bg-background px-4 py-3 text-sm text-muted-foreground">
                    <strong className="text-foreground">Ideal client:</strong> {service.idealClient}
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Card className="surface-card">
                    <CardHeader>
                      <CardTitle className="text-base">Common problems solved</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        {service.problemsSolved.map((item) => (
                          <li key={item} className="flex items-start gap-2">
                            <CheckCircle2 className="mt-0.5 size-4 text-accent" /> {item}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="surface-card">
                    <CardHeader>
                      <CardTitle className="text-base">What is included</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        {service.included.map((item) => (
                          <li key={item} className="flex items-start gap-2">
                            <CheckCircle2 className="mt-0.5 size-4 text-accent" /> {item}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                <Card className="surface-card">
                  <CardContent className="pt-5">
                    <p className="text-sm text-muted-foreground">
                      <strong className="text-foreground">Expected outcomes:</strong> {service.outcomes}
                    </p>
                  </CardContent>
                </Card>
              </article>
            )
          })}
        </div>
      </section>

      <section className="section-wrap border-y border-border bg-card/55">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
          <div>
            <SectionIntro
              eyebrow="Delivery Model"
              title="How engagements are structured"
              summary="We keep ownership clear, timelines realistic, and communication consistent."
            />
            <div className="mt-6 space-y-3 text-sm text-muted-foreground">
              <p>1. Discovery and architecture alignment before implementation starts.</p>
              <p>2. Prioritized delivery plan with release checkpoints and stakeholder reviews.</p>
              <p>3. Post-launch support through retained delivery and advisory continuity.</p>
            </div>
          </div>

          {/* Replace /public/images/services-interface-panels.svg with service workflow or UI screenshots */}
          <ImagePanel
            src="/images/services-interface-panels.svg"
            alt="Interface-style visual with service delivery panels"
            label="Services Visual"
            caption="Recommended replacement: interface-oriented visuals showing roadmap, workflow, and release planning."
            className="min-h-[300px]"
          />
        </div>
      </section>
    </main>
  )
}

function IndustriesPage() {
  usePageMeta(
    'Construction and BuilderTek Expertise | Vextor',
    'Vextor supports construction and real-estate teams using Salesforce and BuilderTek with workflow design, customization, integrations, and managed support.'
  )

  const workflowAreas = [
    {
      title: 'Project Operations',
      detail: 'Role-based task flow across PMs, procurement, finance, and site coordination teams.',
      icon: HardHat,
    },
    {
      title: 'RFQ, Quote, and PO Lifecycle',
      detail: 'Structured transitions from request to supplier response to purchasing decisions.',
      icon: ClipboardList,
    },
    {
      title: 'Budgets and Financial Controls',
      detail: 'Approval paths, budget checkpoints, and reporting visibility for project stakeholders.',
      icon: Database,
    },
    {
      title: 'Custom UI and Usability',
      detail: 'LWC interfaces designed for users who execute high-frequency operational tasks.',
      icon: Code2,
    },
  ]

  return (
    <main>
      <section className="section-wrap border-b border-border bg-card/55">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionIntro
            eyebrow="Industry Focus"
            title="Construction and real-estate operations need more than generic Salesforce implementation"
            summary="Vextor works with BuilderTek and Salesforce teams that need dependable execution across procurement, approvals, budgets, and project delivery workflows."
          />
        </div>
      </section>

      <section className="section-wrap">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1fr] lg:px-8">
          <div className="space-y-4">
            <h2 className="section-title">BuilderTek workflow depth, grounded in day-to-day operations</h2>
            <p className="text-sm leading-7 text-muted-foreground">
              We help teams improve operational execution where it usually breaks down: disconnected approvals,
              unclear procurement ownership, delayed project decisions, and low-confidence reporting.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 size-4 text-accent" /> Procurement process alignment across request,
                review, and purchase stages.
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 size-4 text-accent" /> Budget and approval workflows with clearer
                accountability and reduced lag.
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 size-4 text-accent" /> Practical automation that supports field and
                office collaboration without adding friction.
              </li>
            </ul>
          </div>

          {/* Replace /public/images/industry-construction-operations.svg with real construction/operations photo */}
          <ImagePanel
            src="/images/industry-construction-operations.svg"
            alt="Construction operations visual with structured workflow elements"
            label="Industry Visual"
            caption="Recommended replacement: editorial construction operations image with subtle workflow overlay."
            className="min-h-[340px]"
          />
        </div>
      </section>

      <section className="section-wrap border-y border-border bg-card/55">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionIntro
            eyebrow="BuilderTek Capability"
            title="Areas where clients typically engage Vextor"
            summary="A focused approach to operational flow, system behavior, and adoption quality."
          />

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {workflowAreas.map(({ title, detail, icon: Icon }) => (
              <Card key={title} className="surface-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-lg">
                    <span className="icon-wrap">
                      <Icon className="size-4" />
                    </span>
                    {title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{detail}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section-wrap">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionIntro
            eyebrow="Who We Work Best With"
            title="Client profiles where we add the most value"
            summary="If your business depends on Salesforce for operational throughput, we can usually help quickly."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              {
                icon: HardHat,
                title: 'Construction Teams on BuilderTek',
                text: 'Project operations, procurement flow, and budget controls that need stronger system execution.',
              },
              {
                icon: LandPlot,
                title: 'Real-Estate Organizations',
                text: 'Sales, project, and finance workflows requiring tighter integration and process consistency.',
              },
              {
                icon: Users,
                title: 'Salesforce-Heavy Operations Teams',
                text: 'Businesses that need architecture, custom automation, and long-term support continuity.',
              },
            ].map(({ icon: Icon, title, text }) => (
              <Card key={title} className="surface-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Icon className="size-4 text-accent" /> {title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section-wrap border-t border-border bg-card/55">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Card className="surface-card p-8 sm:p-10">
            <h2 className="section-title max-w-2xl">Need BuilderTek process support that is practical and reliable?</h2>
            <p className="section-summary max-w-2xl">
              We can review your current flow and propose targeted improvements for approvals, procurement, automation,
              and day-to-day usability.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/contact">
                <Button size="lg" className="btn-solid">
                  Explore BuilderTek Support
                </Button>
              </Link>
              <Link to="/services">
                <Button variant="outline" size="lg" className="btn-outline">
                  Review Services
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </section>
    </main>
  )
}

function WorkPage() {
  usePageMeta(
    'Selected Work | Vextor',
    'Review Vextor project examples and delivery structures for Salesforce and BuilderTek consulting engagements.'
  )

  const caseStudies = [
    {
      title: 'BuilderTek Procurement Flow Stabilization',
      sector: 'Construction Operations',
      situation:
        'Procurement teams were managing RFQ and PO status through fragmented updates, creating delays and unclear ownership.',
      vextorScope:
        'Mapped process states, reworked approval logic, and implemented role-specific workflow visibility with automation triggers.',
      outputs:
        'Workflow blueprint, automation implementation, approval matrix, and support transition documentation.',
    },
    {
      title: 'Salesforce Architecture Reset for Multi-Team Delivery',
      sector: 'Real-Estate and Projects',
      situation:
        'The org had overlapping automation and inconsistent data ownership across project, sales, and finance teams.',
      vextorScope:
        'Introduced architecture boundaries, cleaned object relationships, and planned phased refactoring aligned with business priority.',
      outputs:
        'Architecture roadmap, release sequence, and governance model for future enhancements.',
    },
    {
      title: 'Custom Workflow UI for Operations Throughput',
      sector: 'Salesforce-Heavy Business Operations',
      situation:
        'High-frequency users faced slow, multi-screen updates for daily transaction workflows.',
      vextorScope:
        'Built focused LWC interfaces and orchestration logic to reduce step count and improve execution consistency.',
      outputs:
        'Custom UI components, service-layer code, deployment assets, and operational adoption guidance.',
    },
  ]

  return (
    <main>
      <section className="section-wrap border-b border-border bg-card/55">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionIntro
            eyebrow="Selected Work"
            title="Project structures that show how Vextor engages"
            summary="No inflated claims. This page demonstrates the type of delivery scope, process depth, and outputs clients can expect."
          />
        </div>
      </section>

      <section className="section-wrap">
        <div className="mx-auto max-w-7xl space-y-5 px-4 sm:px-6 lg:px-8">
          {caseStudies.map((study) => (
            <Card key={study.title} className="surface-card p-6 sm:p-7">
              <p className="eyebrow">{study.sector}</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight">{study.title}</h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">Situation</p>
                  <p className="mt-2 text-sm text-muted-foreground">{study.situation}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">Vextor Scope</p>
                  <p className="mt-2 text-sm text-muted-foreground">{study.vextorScope}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">Outputs</p>
                  <p className="mt-2 text-sm text-muted-foreground">{study.outputs}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="section-wrap border-y border-border bg-card/55">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
          <div>
            <SectionIntro
              eyebrow="Case Study Assets"
              title="Production-ready layout for future proof points"
              summary="Add real client-approved metrics, logos, and testimonial content later without redesigning page structure."
            />
            <p className="mt-5 text-sm text-muted-foreground">
              The structure is intentionally built for trust-safe publishing: challenge, scope, delivery outputs, and
              measurable outcomes once approved.
            </p>
          </div>

          {/* Replace /public/images/work-case-study-blueprint.svg with real case-study collage */}
          <ImagePanel
            src="/images/work-case-study-blueprint.svg"
            alt="Case study blueprint layout placeholder"
            label="Work Visual"
            caption="Recommended replacement: curated project photography + dashboard snippets + annotated outcomes."
            className="min-h-[300px]"
          />
        </div>
      </section>
    </main>
  )
}

function AboutPage() {
  usePageMeta(
    'About Vextor | Salesforce and BuilderTek Consulting Team',
    'Learn how Vextor works, who we partner with, and why operations teams choose us for Salesforce and BuilderTek consulting.'
  )

  return (
    <main>
      <section className="section-wrap border-b border-border bg-card/55">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionIntro
            eyebrow="About"
            title="Vextor is a specialist consulting team for Salesforce and BuilderTek operations"
            summary="We are built for businesses that need credible technical depth and a partner who understands how operations actually run."
          />
        </div>
      </section>

      <section className="section-wrap">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1fr] lg:px-8">
          <Card className="surface-card">
            <CardHeader>
              <CardTitle className="text-xl">Company story</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm leading-7 text-muted-foreground">
              <p>
                Vextor Solution LLP was formed to support teams that had outgrown generic Salesforce delivery. Many
                organizations had strong internal talent but still needed senior architecture and workflow expertise to
                keep operations stable while scaling.
              </p>
              <p>
                Our model stays intentionally focused: practical consulting, technical quality, and long-term support.
                We do not position ourselves as a mass-scale agency. We operate as an accountable partner for teams
                that value reliability.
              </p>
            </CardContent>
          </Card>

          {/* Replace /public/images/about-studio-collaboration.svg with team/workspace photograph */}
          <ImagePanel
            src="/images/about-studio-collaboration.svg"
            alt="Studio collaboration and planning boards"
            label="About Visual"
            caption="Recommended replacement: candid workspace/team planning visual with architectural references."
            className="min-h-[350px]"
          />
        </div>
      </section>

      <section className="section-wrap border-y border-border bg-card/55">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionIntro
            eyebrow="Approach"
            title="How we operate with client teams"
            summary="Calm execution, transparent communication, and architecture-first decisions."
          />

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              {
                title: 'Technical clarity before build velocity',
                text: 'We identify process and architecture constraints early so delivery momentum does not collapse later.',
              },
              {
                title: 'Operational realism over abstract frameworks',
                text: 'Every solution is shaped around who uses it, how often, and what failure points matter most.',
              },
              {
                title: 'Partnership continuity',
                text: 'Clients work with a team that stays involved from design to support, not handoffs between disconnected groups.',
              },
            ].map((item) => (
              <Card key={item.title} className="surface-card">
                <CardHeader>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{item.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section-wrap">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionIntro
            eyebrow="Client Fit"
            title="Teams we typically partner with"
            summary="We engage with organizations where Salesforce is central to operating performance."
          />

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <Card className="surface-card">
              <CardHeader>
                <CardTitle className="text-lg">Best fit client profile</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 size-4 text-accent" /> Construction and real-estate teams running
                    core process workflows on Salesforce + BuilderTek.
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 size-4 text-accent" /> Operations leaders needing architecture and
                    custom process support beyond standard admin capacity.
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 size-4 text-accent" /> Organizations that prefer long-term partner
                    accountability instead of one-off delivery.
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="surface-card">
              <CardHeader>
                <CardTitle className="text-lg">Leadership profile section</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <p>
                  This layout is intentionally ready for founder or leadership details. Add final profile copy, photo,
                  certifications, and domain expertise once approved.
                </p>
                <p>
                  Keeping this section structured now allows fast publishing later without redesigning the page.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  )
}

function ContactPage() {
  usePageMeta(
    'Contact Vextor | Discuss Your Salesforce Roadmap',
    'Book a Salesforce and BuilderTek consultation with Vextor. Share your goals and we will outline a practical engagement path.'
  )

  const [form, setForm] = useState({
    name: '',
    workEmail: '',
    company: '',
    challenge: '',
    details: '',
  })

  const onChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    alert(
      `Thanks, ${form.name || 'there'}! This demo form stores no data yet.\n\nRecommended next step: connect this form to your email or CRM.`
    )
    setForm({ name: '', workEmail: '', company: '', challenge: '', details: '' })
  }

  return (
    <main>
      <section className="section-wrap border-b border-border bg-card/55">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionIntro
            eyebrow="Contact"
            title="Let’s discuss your Salesforce and BuilderTek roadmap"
            summary="Share your current challenge and we will suggest a practical next-step path for architecture, delivery, and support."
          />
        </div>
      </section>

      <section className="section-wrap">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
          <Card className="surface-card">
            <CardHeader>
              <CardTitle className="text-xl">Project inquiry</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" onSubmit={onSubmit}>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="form-label">
                      Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={form.name}
                      onChange={onChange}
                      placeholder="Your full name"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="workEmail" className="form-label">
                      Work email
                    </label>
                    <Input
                      id="workEmail"
                      name="workEmail"
                      type="email"
                      value={form.workEmail}
                      onChange={onChange}
                      placeholder="name@company.com"
                      required
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="company" className="form-label">
                      Company
                    </label>
                    <Input
                      id="company"
                      name="company"
                      value={form.company}
                      onChange={onChange}
                      placeholder="Company name"
                    />
                  </div>
                  <div>
                    <label htmlFor="challenge" className="form-label">
                      Primary focus
                    </label>
                    <Input
                      id="challenge"
                      name="challenge"
                      value={form.challenge}
                      onChange={onChange}
                      placeholder="Architecture, BuilderTek, automation, support"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="details" className="form-label">
                    Brief context
                  </label>
                  <Textarea
                    id="details"
                    name="details"
                    rows={5}
                    value={form.details}
                    onChange={onChange}
                    placeholder="Tell us what is currently slowing your team down and what outcome you need."
                  />
                </div>

                <Button type="submit" size="lg" className="btn-solid w-full justify-center">
                  Start a Project Conversation
                </Button>
                <p className="text-xs text-muted-foreground">Demo form for UI review. No submission endpoint is connected yet.</p>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-5">
            <Card className="surface-card">
              <CardHeader>
                <CardTitle className="text-lg">What happens next</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex gap-3">
                    <span className="list-index">1</span>
                    <span>We review your inquiry and shortlist the most relevant consulting path.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="list-index">2</span>
                    <span>We schedule a focused consultation call around architecture and delivery priorities.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="list-index">3</span>
                    <span>We share a recommended engagement model with scope, cadence, and support options.</span>
                  </li>
                </ol>
              </CardContent>
            </Card>

            <Card className="surface-card">
              <CardHeader>
                <CardTitle className="text-lg">Direct contact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <p className="flex items-center gap-2">
                  <Mail className="size-4 text-accent" />
                  <a href="mailto:hello@vextor.co" className="hover:text-accent">
                    hello@vextor.co
                  </a>
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="size-4 text-accent" />
                  <a href="tel:+919016070659" className="hover:text-accent">
                    +91 90160 70659
                  </a>
                </p>
                <p className="flex items-center gap-2">
                  <MapPin className="size-4 text-accent" /> Ahmedabad, India
                </p>
              </CardContent>
            </Card>

            {/* Replace /public/images/contact-consultation-desk.svg with a consultation/workspace image */}
            <ImagePanel
              src="/images/contact-consultation-desk.svg"
              alt="Consultation workspace placeholder visual"
              label="Contact Visual"
              caption="Recommended replacement: clean consultation desk or whiteboard planning image."
              className="min-h-[260px]"
            />
          </div>
        </div>
      </section>
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
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  )
}
