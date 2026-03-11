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
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.52, ease: 'easeOut' },
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
      className={`text-sm font-medium tracking-[0.01em] transition-colors ${
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
}: {
  eyebrow?: string
  title: string
  summary?: string
  align?: 'left' | 'center'
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={revealUp}
      className={align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}
    >
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2 className="section-title">{title}</h2>
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
    <header className="sticky top-0 z-50 border-b border-border bg-background shadow-[0_8px_20px_-18px_rgba(15,23,42,0.45)]">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" aria-label="Vextor home" className="inline-flex flex-col leading-none">
          <span className="brand-word">Vextor</span>
          <span className="brand-sub">Solution</span>
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
          className="inline-flex items-center justify-center rounded-xl border border-border p-2 text-foreground transition hover:bg-card md:hidden"
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label="Toggle menu"
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
              <Button className="btn-solid w-full justify-center">Discuss Your Salesforce Roadmap</Button>
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  )
}

function Footer() {
  return (
    <footer className="border-t border-border bg-footer">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr_0.9fr]">
          <div className="space-y-4">
            <p className="eyebrow">Vextor Solution LLP</p>
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
      title: 'Operationally grounded',
      body: 'We design systems around how teams actually run work, approvals, and handoffs.',
    },
    {
      title: 'Senior execution',
      body: 'Architecture and engineering are delivered by experienced practitioners, not handoff chains.',
    },
    {
      title: 'Long-term accountability',
      body: 'Our support model keeps delivery momentum and platform quality after go-live.',
    },
  ]

  return (
    <main>
      <section className="hero-wrap">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-20">
          <motion.div initial="hidden" animate="show" variants={revealUp} className="space-y-7">
            <Badge className="badge-premium">Salesforce Consulting Partner for Operations Teams</Badge>
            <h1 className="hero-title">Salesforce consulting built for businesses that run on process quality.</h1>
            <p className="hero-copy">
              Vextor helps teams improve Salesforce architecture, automation, custom development, integrations,
              and managed support. For BuilderTek customers, we offer dedicated workflow customization and
              system support as a specialized capability.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/contact">
                <Button size="lg" className="btn-solid">
                  Discuss Your Salesforce Roadmap <CalendarCheck2 className="ml-2 size-4" />
                </Button>
              </Link>
              <Link to="/services#buildertek-specialization">
                <Button size="lg" variant="outline" className="btn-outline-dark">
                  Explore BuilderTek Support <ChevronRight className="ml-2 size-4" />
                </Button>
              </Link>
            </div>
            <ul className="grid gap-2 text-sm text-deep-muted sm:grid-cols-2">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 size-4 text-accent-soft" /> Salesforce architecture and automation
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 size-4 text-accent-soft" /> Apex and LWC development
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 size-4 text-accent-soft" /> Integration engineering and support
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 size-4 text-accent-soft" /> BuilderTek customization specialization
              </li>
            </ul>
          </motion.div>

          <Visual
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1500&q=80"
            alt="Modern architectural office district representing enterprise operations"
            caption="Enterprise architecture, process reliability, and long-term operational planning."
            className="min-h-[430px]"
            objectPosition="center 48%"
          />
        </div>
      </section>

      <section className="section-wrap">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionIntro
            eyebrow="Core Salesforce Services"
            title="Salesforce consulting as the primary service line"
            summary="From architecture to managed support, we help teams build stable Salesforce operations without unnecessary complexity."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {coreSalesforceCards.map(({ icon: Icon, title, text }) => (
              <Card key={title} className="surface-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-base">
                    <span className="icon-wrap">
                      <Icon className="size-4" />
                    </span>
                    {title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-7 text-muted-foreground">{text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section-wrap border-y border-border bg-card/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionIntro
            eyebrow="Why Clients Choose Vextor"
            title="A serious consulting partner for complex operating environments"
            summary="We focus on delivery quality, platform reliability, and practical collaboration with your internal teams."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {whyVextor.map((item) => (
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

      <section className="section-wrap" id="buildertek-home">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1fr] lg:px-8">
          <div className="space-y-5">
            <SectionIntro
              eyebrow="BuilderTek Specialization"
              title="Dedicated BuilderTek support for construction and real-estate workflows"
              summary="BuilderTek is treated as a focused specialization. Clients engage us for workflow customization, operational improvements, and support in BuilderTek-heavy environments."
            />
            <ul className="space-y-2 text-sm leading-7 text-muted-foreground">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-1 size-4 text-accent" /> RFQ, quote, PO, and approval workflow refinement
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-1 size-4 text-accent" /> Budget and project operations process optimization
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-1 size-4 text-accent" /> BuilderTek usability and adoption improvements
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-1 size-4 text-accent" /> Integration and support for BuilderTek-centric teams
              </li>
            </ul>
            <Link to="/services#buildertek-specialization" className="inline-flex items-center gap-2 text-sm font-medium hover:text-accent">
              View BuilderTek specialization details <ArrowRight className="size-4" />
            </Link>
          </div>

          <Visual
            src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1500&q=80"
            alt="Construction project environment showing planning and execution context"
            caption="BuilderTek support for project operations, procurement flow, and execution control."
            className="min-h-[390px]"
            objectPosition="center 52%"
          />
        </div>
      </section>

      <section className="section-wrap border-y border-border bg-card/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionIntro
            eyebrow="How We Work"
            title="Structured engagement from architecture to support"
            summary="A delivery cadence designed for clarity, accountability, and sustained platform quality."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-4">
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
              <Card key={title} className="surface-card">
                <CardHeader>
                  <p className="step-chip">Step {step}</p>
                  <CardTitle className="mt-2 flex items-center gap-2 text-base">
                    <Icon className="size-4 text-accent" /> {title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-7 text-muted-foreground">{text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section-wrap">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionIntro
            eyebrow="Selected Capabilities"
            title="Common delivery blocks clients engage us for"
            summary="Representative capability blocks for architecture, development, and operational support conversations."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
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

      <section className="section-wrap border-y border-border bg-deep text-deep-foreground">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Card className="surface-card deep-card p-8 sm:p-10">
            <p className="eyebrow">Consultation</p>
            <h2 className="section-title max-w-2xl text-deep-foreground">
              Need a clear plan for Salesforce delivery or BuilderTek workflow support?
            </h2>
            <p className="section-summary max-w-2xl text-deep-muted">
              Share your current bottlenecks. We will map a practical engagement path based on architecture,
              delivery scope, and support needs.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/contact">
                <Button size="lg" className="btn-solid">
                  Talk to Vextor <ArrowRight className="ml-2 size-4" />
                </Button>
              </Link>
              <Link to="/services">
                <Button size="lg" variant="outline" className="btn-outline-dark">
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

function ServicesPage() {
  usePageMeta(
    'Services | Vextor Salesforce Consulting',
    'Vextor offers Salesforce consulting, architecture, automation, custom development, integrations, and managed support, with BuilderTek specialization available separately.'
  )

  const serviceIcons = [Layers3, Compass, Settings2, Code2, Database, RouteIcon]

  return (
    <main>
      <section className="section-wrap border-b border-border bg-card/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionIntro
            eyebrow="Services"
            title="Salesforce services and BuilderTek specialization, clearly separated"
            summary="Salesforce consulting is our primary service line. BuilderTek support is offered as a dedicated specialization for relevant clients."
          />
        </div>
      </section>

      <section className="section-wrap">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionIntro
            eyebrow="Primary Service Line"
            title="Salesforce consulting and engineering"
            summary="Designed for operations teams that depend on Salesforce for execution quality and control."
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

      <section className="section-wrap border-y border-border bg-card/60" id="buildertek-specialization">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_1fr] lg:px-8">
          <div>
            <SectionIntro
              eyebrow="Specialization"
              title="BuilderTek support and customization"
              summary="A separate specialization for BuilderTek customers who need process tuning, workflow customization, and ongoing support."
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
            src="https://images.unsplash.com/photo-1541976590-713941681591?auto=format&fit=crop&w=1500&q=80"
            alt="Construction planning table with project drawings and laptop"
            caption="BuilderTek specialization focused on project delivery workflows."
            className="min-h-[340px]"
            objectPosition="center 50%"
          />
        </div>
      </section>
    </main>
  )
}

function IndustriesPage() {
  usePageMeta(
    'Industries | Vextor',
    'Vextor supports construction, real-estate, and operations-heavy businesses with Salesforce consulting and BuilderTek specialization.'
  )

  return (
    <main>
      <section className="section-wrap border-b border-border bg-card/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionIntro
            eyebrow="Industries"
            title="Built for teams where operational precision matters"
            summary="We support industries that rely on Salesforce for workflow consistency and delivery execution."
          />
        </div>
      </section>

      <section className="section-wrap">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
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
              title: 'Salesforce-Heavy Operations Teams',
              text: 'Architecture, automation, development, and support for businesses running critical process flows in Salesforce.',
            },
          ].map((item) => (
            <Card key={item.title} className="surface-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <item.icon className="size-4 text-accent" /> {item.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-7 text-muted-foreground">{item.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="section-wrap border-y border-border bg-card/60">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_1fr] lg:px-8">
          <div>
            <SectionIntro
              eyebrow="BuilderTek Context"
              title="Where BuilderTek specialization is most relevant"
              summary="BuilderTek work is focused on operational process quality inside construction and project-driven environments."
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
            src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1500&q=80"
            alt="Urban construction project with crane and building structure"
            caption="BuilderTek process support for construction and real-estate operations."
            className="min-h-[320px]"
            objectPosition="center 52%"
          />
        </div>
      </section>
    </main>
  )
}

function WorkPage() {
  usePageMeta(
    'Work | Vextor',
    'Review representative Vextor engagement patterns for Salesforce consulting and BuilderTek specialization.'
  )

  return (
    <main>
      <section className="section-wrap border-b border-border bg-card/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionIntro
            eyebrow="Our Work"
            title="Operational Salesforce delivery across consulting, engineering, and support"
            summary="At Vextor, our work focuses on helping businesses extend and optimize Salesforce around real operating needs."
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

      <section className="section-wrap border-y border-border bg-card/60">
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
            src="https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1500&q=80"
            alt="Operations and planning workspace for consulting execution"
            caption="Execution model built around workflow quality and delivery consistency."
            className="min-h-[300px]"
            objectPosition="center 46%"
          />
        </div>
      </section>
    </main>
  )
}

function AboutPage() {
  usePageMeta(
    'About Vextor | Salesforce Consulting Team',
    'Vextor is a Salesforce consulting team with dedicated BuilderTek specialization for operations-focused businesses.'
  )

  return (
    <main>
      <section className="section-wrap border-b border-border bg-card/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionIntro
            eyebrow="About Vextor"
            title="Building Salesforce systems that actually work for real operations"
            summary="Vextor was founded with a simple belief: Salesforce should not only store data, it should power how a business operates."
          />
        </div>
      </section>

      <section className="section-wrap">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1fr] lg:px-8">
          <Card className="surface-card">
            <CardHeader>
              <CardTitle className="text-xl">Story</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm leading-7 text-muted-foreground">
              <p>
                In many companies, Salesforce starts as CRM and then becomes the backbone of sales,
                operations, finance workflows, and project execution. As complexity grows, standard
                configuration is often not enough.
              </p>
              <p>
                Vextor exists to solve that gap. We help businesses design Salesforce environments that
                are reliable, scalable, and aligned to real day-to-day operating processes.
              </p>
            </CardContent>
          </Card>

          <Visual
            src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1500&q=80"
            alt="Consulting team planning session"
            caption="Hands-on consulting and architecture planning."
            className="min-h-[360px]"
            objectPosition="center 44%"
          />
        </div>
      </section>

      <section className="section-wrap border-y border-border bg-card/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionIntro
            eyebrow="Consulting Partner"
            title="A consulting partner, not just a vendor"
            summary="We work with clients as a long-term partner, not only for implementation but for continuous platform improvement."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
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
              <Card key={item.title} className="surface-card">
                <CardHeader>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-7 text-muted-foreground">{item.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section-wrap">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1fr] lg:px-8">
          <div>
            <SectionIntro
              eyebrow="Expertise"
              title="Deep Salesforce expertise with operational focus"
              summary="Our team works at the intersection of business operations and Salesforce technology."
            />
            <ul className="mt-5 space-y-2 text-sm leading-7 text-muted-foreground">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-1 size-4 text-accent" /> Salesforce architecture and system design
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-1 size-4 text-accent" /> Apex and Lightning Web Component development
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-1 size-4 text-accent" /> Process automation and workflow optimization
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-1 size-4 text-accent" /> Integration design and API connectivity
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-1 size-4 text-accent" /> Reporting and operational visibility
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-1 size-4 text-accent" /> Managed support and enhancement delivery
              </li>
            </ul>
          </div>

          <Visual
            src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1500&q=80"
            alt="Business operations planning desk"
            caption="Operational focus across architecture, automation, and engineering."
            className="min-h-[340px]"
            objectPosition="center 48%"
          />
        </div>
      </section>

      <section className="section-wrap border-y border-border bg-card/60">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1fr] lg:px-8">
          <div>
            <SectionIntro
              eyebrow="BuilderTek Specialization"
              title="Dedicated support for BuilderTek-centric teams"
              summary="Alongside broader Salesforce consulting, we support BuilderTek customers who need deeper workflow customization."
            />
            <ul className="mt-5 space-y-2 text-sm leading-7 text-muted-foreground">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-1 size-4 text-accent" /> Workflow automation and process design
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-1 size-4 text-accent" /> Project and purchasing workflow customization
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-1 size-4 text-accent" /> RFQ, quote, and PO process improvements
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-1 size-4 text-accent" /> UX improvements and operational reporting
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-1 size-4 text-accent" /> Integrations with other business systems
              </li>
            </ul>
          </div>

          <Visual
            src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1500&q=80"
            alt="Construction and project execution environment"
            caption="BuilderTek specialization for project and construction workflows."
            className="min-h-[340px]"
            objectPosition="center 48%"
          />
        </div>
      </section>

      <section className="section-wrap">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionIntro
            eyebrow="Philosophy"
            title="Technology should serve the business"
            summary="Every engagement follows a practical operating philosophy."
          />
          <div className="mt-8 grid gap-5 md:grid-cols-4">
            {[
              { title: 'Practical', text: 'Designed around real business processes.' },
              { title: 'Reliable', text: 'Built with clean architecture and scalable design.' },
              { title: 'Adaptable', text: 'Flexible enough to evolve as operations change.' },
              { title: 'Efficient', text: 'Reduces manual work and improves visibility.' },
            ].map((item) => (
              <Card key={item.title} className="surface-card">
                <CardHeader>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-7 text-muted-foreground">{item.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section-wrap border-y border-border bg-card/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionIntro
            eyebrow="Why Vextor"
            title="Why companies work with Vextor"
            summary="Companies usually engage us when they need specialist Salesforce and BuilderTek support with long-term reliability."
          />
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {[
              'A reliable Salesforce consulting partner',
              'Custom development beyond standard configuration',
              'Workflow automation aligned to real operations',
              'BuilderTek customization and support',
              'Ongoing system improvements and enhancements',
            ].map((item) => (
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
    </main>
  )
}

function ContactPage() {
  usePageMeta(
    'Contact Vextor | Salesforce Consultation',
    'Contact Vextor to discuss Salesforce consulting, architecture, custom development, and BuilderTek specialization support.'
  )

  return (
    <main>
      <section className="section-wrap border-b border-border bg-card/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionIntro
            eyebrow="Contact"
            title="Book a focused consultation"
            summary="Share your current Salesforce or BuilderTek challenge and we will propose the most practical next step."
          />
        </div>
      </section>

      <section className="section-wrap">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
          <div className="space-y-5">
            <Card className="surface-card">
              <CardHeader>
                <CardTitle className="text-xl">Contact form (Salesforce Web-to-Lead)</CardTitle>
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
                      <label className="form-label" htmlFor="first_name">
                        First Name
                      </label>
                      <input className="webtolead-input" id="first_name" maxLength={40} name="first_name" type="text" />
                    </div>
                    <div className="webtolead-field">
                      <label className="form-label" htmlFor="last_name">
                        Last Name
                      </label>
                      <input className="webtolead-input" id="last_name" maxLength={80} name="last_name" type="text" required />
                    </div>
                  </div>

                  <div className="webtolead-grid">
                    <div className="webtolead-field">
                      <label className="form-label" htmlFor="mobile">
                        Mobile
                      </label>
                      <input className="webtolead-input" id="mobile" maxLength={40} name="mobile" type="text" />
                    </div>
                    <div className="webtolead-field">
                      <label className="form-label" htmlFor="email">
                        Email
                      </label>
                      <input className="webtolead-input" id="email" maxLength={80} name="email" type="email" required />
                    </div>
                  </div>

                  <div className="webtolead-grid">
                    <div className="webtolead-field">
                      <label className="form-label" htmlFor="company">
                        Company
                      </label>
                      <input className="webtolead-input" id="company" maxLength={40} name="company" type="text" required />
                    </div>
                    <div className="webtolead-field">
                      <label className="form-label" htmlFor="city">
                        City
                      </label>
                      <input className="webtolead-input" id="city" maxLength={40} name="city" type="text" />
                    </div>
                  </div>

                  <div className="webtolead-grid">
                    <div className="webtolead-field">
                      <label className="form-label" htmlFor="state">
                        State/Province
                      </label>
                      <input className="webtolead-input" id="state" maxLength={20} name="state" type="text" />
                    </div>
                    <div className="webtolead-field">
                      <label className="form-label" htmlFor="country">
                        Country
                      </label>
                      <input className="webtolead-input" id="country" maxLength={40} name="country" type="text" />
                    </div>
                  </div>

                  <Button type="submit" name="submit" size="lg" className="btn-solid w-full justify-center">
                    Submit Inquiry
                  </Button>
                  <p className="text-xs text-muted-foreground">You will be redirected to vextor.co after successful submission.</p>
                </form>
              </CardContent>
            </Card>

            <Card className="surface-card">
              <CardHeader>
                <CardTitle className="text-lg">Before you submit</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm leading-7 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-1 size-4 text-accent" /> Mention your current Salesforce setup and where you need help.
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-1 size-4 text-accent" /> Add whether this is Salesforce consulting, BuilderTek support, or both.
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-1 size-4 text-accent" /> Share timeline expectations so we can scope the right engagement model.
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-5">
            <Card className="surface-card">
              <CardHeader>
                <CardTitle className="text-lg">What happens next</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-3 text-sm leading-7 text-muted-foreground">
                  <li className="flex gap-3">
                    <span className="list-index">1</span>
                    <span>We review your operating context and primary goals.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="list-index">2</span>
                    <span>We hold a focused consultation around scope and delivery path.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="list-index">3</span>
                    <span>We share an engagement recommendation with priorities and cadence.</span>
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
                  <a className="hover:text-accent" href="mailto:hello@vextor.co">
                    hello@vextor.co
                  </a>
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="size-4 text-accent" />
                  <a className="hover:text-accent" href="tel:+919016070659">
                    +91 90160 70659
                  </a>
                </p>
                <p className="flex items-center gap-2">
                  <MapPin className="size-4 text-accent" /> Ahmedabad, India
                </p>
              </CardContent>
            </Card>

            <Visual
              src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1500&q=80"
              alt="Business team in a focused planning meeting"
              caption="Consultation-led approach with structured implementation planning."
              className="min-h-[260px]"
              objectPosition="center 45%"
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
