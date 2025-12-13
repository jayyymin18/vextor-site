import React, { useEffect, useMemo, useState } from 'react'
import { Routes, Route, Link, useLocation, Navigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { SpeedInsights } from "@vercel/speed-insights/next"
import {
  Sparkles, Rocket, Workflow, Handshake, CheckCircle2, Mail, Phone, MapPin, ArrowRight,
  CalendarCheck2, Cloud, ShieldCheck, Linkedin, Github, ExternalLink,
  Sun, Moon, Compass, LifeBuoy, LayoutDashboard, Star, Menu, X, MapPinned
} from 'lucide-react'

// Theme context
const ThemeContext = React.createContext<{ theme: 'light' | 'dark'; toggle: () => void }>({
  theme: 'light', toggle: () => {}
})

function ensureThemeStyles(theme: 'light' | 'dark') {
  const id = 'vextor-theme-vars'
  let style = document.getElementById(id) as HTMLStyleElement | null
  if (!style) {
    style = document.createElement('style')
    style.id = id
    document.head.appendChild(style)
  }
  const light = `
    .light, :root:not(.dark){
      --background: 23 72% 97%;
      --foreground: 232 32% 18%;
      --muted-foreground: 230 16% 42%;
      --card: 18 70% 99%;
      --border: 20 35% 86%;
      --accent: 210 55% 95%;
    }`
  const dark = `
    .dark{
      --background: 235 30% 12%;
      --foreground: 28 66% 94%;
      --muted-foreground: 230 20% 72%;
      --card: 235 26% 16%;
      --border: 230 22% 26%;
      --accent: 260 32% 22%;
    }`
  const base = `
    :root{color-scheme: light dark}
    body{
      background-color:hsl(var(--background));
      color:hsl(var(--foreground));
      background-image:
        radial-gradient(1100px 1100px at 12% 8%, hsla(340, 82%, 88%, 0.45), transparent),
        radial-gradient(1100px 1100px at 82% 0%, hsla(200, 80%, 88%, 0.35), transparent);
    }
    .bg-background{background-color:hsl(var(--background));}
    .bg-card{background-color:hsl(var(--card));}
    .text-foreground{color:hsl(var(--foreground));}
    .text-muted-foreground{color:hsl(var(--muted-foreground));}
    .border{border-color:hsl(var(--border));}
    .accent-surface{background-color:hsl(var(--accent));}
    input, textarea{color:hsl(var(--foreground));background:transparent}
    ::placeholder{color:hsl(var(--muted-foreground));opacity:0.95}
    .card-border{border:1px solid hsl(var(--border));}
    a{color:inherit;text-decoration-color:hsl(var(--muted-foreground));text-underline-offset:4px}
  `
  style.textContent = base + (theme === 'dark' ? dark : light)
}

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      const stored = localStorage.getItem('vextor-theme') as 'light' | 'dark' | null
      if (stored) return stored
    } catch {}
    const hour = new Date().getHours()
    const isDaytime = hour >= 6 && hour < 18
    return isDaytime ? 'light' : 'dark'
  })
  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', theme === 'dark')
    root.classList.toggle('light', theme === 'light')
    try { localStorage.setItem('vextor-theme', theme) } catch {}
    ensureThemeStyles(theme)
  }, [theme])
  const value = useMemo(() => ({ theme, toggle: () => setTheme(t => (t === 'dark' ? 'light' : 'dark')) }), [theme])
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

function ThemeToggle() {
  const { theme, toggle } = React.useContext(ThemeContext)
  return (
    <Button variant="outline" className="rounded-2xl" onClick={toggle} aria-label="Toggle color scheme">
      {theme === 'dark' ? (<span className="inline-flex items-center gap-2 text-sm"><Sun className="size-4" /> Light</span>)
                        : (<span className="inline-flex items-center gap-2 text-sm"><Moon className="size-4" /> Dark</span>)}
    </Button>
  )
}

// Shared UI
const fadeUp = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } } as const
const navItems = [
  { to: '/services', label: 'Services' },
  { to: '/industries', label: 'Industries' },
  { to: '/approach-results', label: 'Approach & Results' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
] as const
const Chip = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center rounded-full card-border bg-white/70 px-3 py-1 text-xs font-medium text-foreground backdrop-blur-sm dark:bg-white/10">{children}</span>
)

function Section({ id, eyebrow, title, subtitle, children }:{ id?: string; eyebrow?: string; title?: string; subtitle?: string; children?: React.ReactNode; }) {
  return (
    <section id={id} className="py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4">
        {(eyebrow || title) && (
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={fadeUp} className="mb-10 text-center">
            {eyebrow && (<span className="inline-block rounded-full bg-[linear-gradient(120deg,#ffd9e5,#ffe6c7,#d7f0ff)] px-3 py-1 text-xs font-medium text-[#2d2435] shadow-sm">{eyebrow}</span>)}
            {title && <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>}
            {subtitle && <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">{subtitle}</p>}
          </motion.div>
        )}
        {children}
      </div>
    </section>
  )
}

function Shell({ children }:{ children: React.ReactNode }) {
  const location = useLocation()
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }) }, [location.pathname])
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      {children}
      <Footer />
    </div>
  )
}

function NavLink({ to, children, onClick, className }:{ to: string; children: React.ReactNode; onClick?: () => void; className?: string; }) {
  const location = useLocation()
  const active = location.pathname === to
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`text-sm transition hover:text-foreground ${active ? 'text-foreground' : 'text-muted-foreground'} ${className || ''}`}
    >
      {children}
    </Link>
  )
}

function Header() {
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  useEffect(() => {
    document.body.classList.toggle('overflow-hidden', mobileOpen)
    return () => document.body.classList.remove('overflow-hidden')
  }, [mobileOpen])

  return (
    <header className="sticky top-0 z-50 bg-background/80 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-background/50">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/" className="group inline-flex items-end gap-2" aria-label="Vextor home">
          <img src="/favicon.svg" alt="Vextor" className="h-8 w-8 rounded-xl shadow" />
          <div className="leading-none">
            <div className="text-xl font-bold tracking-tight">Vextor</div>
            <div className="text-[10px] text-muted-foreground opacity-70 group-hover:opacity-100">Solution</div>
          </div>
        </Link>
        <nav className="hidden sm:flex">
          <div className="flex items-center gap-6">
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to}>{item.label}</NavLink>
            ))}
            <Link to="/contact"><Button className="rounded-2xl">Book a call <ArrowRight className="ml-2 size-4" /></Button></Link>
            <ThemeToggle />
          </div>
        </nav>
        <div className="flex items-center gap-2 sm:hidden">
          <Link to="/contact"><Button size="sm" className="rounded-2xl">Book a call</Button></Link>
          <Button
            variant="outline"
            size="icon"
            className="rounded-xl"
            onClick={() => setMobileOpen((open) => !open)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </div>
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="border-t border-[hsl(var(--border))] bg-background/95 shadow-lg backdrop-blur sm:hidden"
          >
            <div className="mx-auto max-w-6xl space-y-4 px-4 py-4">
              <div className="grid gap-2">
                {navItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-between rounded-xl border border-transparent bg-accent-surface px-4 py-3 text-foreground"
                  >
                    <span>{item.label}</span>
                    <ArrowRight className="size-4 text-muted-foreground" />
                  </NavLink>
                ))}
              </div>
              <div className="flex flex-col gap-3">
                <Link to="/contact" onClick={() => setMobileOpen(false)}><Button className="w-full rounded-2xl">Book a call <CalendarCheck2 className="ml-2 size-4" /></Button></Link>
                <div className="flex flex-wrap items-center gap-2">
                  <ThemeToggle />
                  <Chip>Avg. reply &lt; 12h</Chip>
                </div>
              </div>
              <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                <a href="mailto:hello@vextor.co" className="flex items-center gap-2 underline-offset-4 hover:underline"><Mail className="size-4" /> hello@vextor.co</a>
                <a href="tel:+919016070659" className="flex items-center gap-2 underline-offset-4 hover:underline"><Phone className="size-4" /> +91 9016070659</a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

function Footer() {
  return (
    <footer className="mt-16 bg-gradient-to-br from-[#fff4e6] via-[#f3e8ff] to-[#e0f4ff] py-12 text-foreground dark:from-[#12121c] dark:via-[#161827] dark:to-[#0f111a]">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <img src="/favicon.svg" alt="Vextor" className="h-9 w-9 rounded-xl shadow-sm" />
              <div>
                <div className="text-lg font-semibold">Vextor</div>
                <div className="text-xs text-muted-foreground">Salesforce consulting studio</div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">Architecture-first delivery for revenue, retention, and efficiency. Based in Ahmedabad, partnering globally.</p>
          </div>
          <div>
            <div className="mb-3 text-sm font-medium text-foreground">Company</div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/services" className="underline-offset-4 hover:underline">Services</Link></li>
              <li><Link to="/industries" className="underline-offset-4 hover:underline">Industries</Link></li>
              <li><Link to="/approach-results" className="underline-offset-4 hover:underline">Approach & Results</Link></li>
              <li><Link to="/about" className="underline-offset-4 hover:underline">About</Link></li>
            </ul>
          </div>
          <div>
            <div className="mb-3 text-sm font-medium text-foreground">Resources</div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/contact" className="underline-offset-4 hover:underline">Contact</Link></li>
              <li><span className="text-muted-foreground/80">Privacy & Terms</span></li>
              <li><span className="text-muted-foreground/80">Security</span></li>
            </ul>
          </div>
          <div className="space-y-2 text-sm text-foreground">
            <div className="mb-3 text-sm font-medium">Contact</div>
            <a href="mailto:hello@vextor.co" className="flex items-center gap-2 underline-offset-4 hover:underline"><Mail className="size-4" /> hello@vextor.co</a>
            <a href="tel:+919016070659" className="flex items-center gap-2 underline-offset-4 hover:underline"><Phone className="size-4" /> +91 9016070659</a>
            <a href="https://maps.google.com/?q=7th%20floor,%20The%20Link,%20Vijay%20Cross%20Rd,%20Navrangpura,%20Ahmedabad,%20Gujarat%20380009" className="flex items-start gap-2 underline-offset-4 hover:underline" target="_blank" rel="noopener noreferrer"><MapPinned className="mt-0.5 size-6 shrink-0" /> 7th floor, The Link, Vijay Cross Rd, Navrangpura, Ahmedabad, Gujarat 380009</a>
            <div className="pt-2">
              <img src="https://www.odigo.com/wp-content/uploads/2022/06/SALESFORCE-PARTNER.png" alt="Salesforce Partner" className="h-10 w-auto opacity-90" loading="lazy" />
            </div>
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-3 border-t border-[hsl(var(--border))] pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Vextor. All rights reserved.</p>
          <p>Design & built by Jaymin</p>
        </div>
      </div>
    </footer>
  )
}

// Pages
function HomePage() {
  const PartnerBadge = ({ label }:{ label: string }) => (
    <span className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium">
      <ShieldCheck className="size-4" /> {label}
    </span>
  )
  return (
    <main>
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60rem_60rem_at_12%_12%,rgba(255,196,217,0.4),transparent)]" />
        <div className="pointer-events-none absolute inset-y-0 right-0 -z-10 w-1/2 bg-gradient-to-l from-[#dff3ff]/70 via-[#ffe6f7]/60 to-transparent" />

        <div className="mx-auto max-w-6xl px-4 py-20 sm:py-28">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <motion.div initial="hidden" animate="show" variants={fadeUp}>
              <Badge className="mb-4">Revenue • Retention • Efficiency</Badge>
              <h1 className="text-balance text-4xl font-semibold leading-tight sm:text-5xl">Make Salesforce a growth and operations lever.</h1>
              <p className="mt-4 max-w-xl text-muted-foreground">
                We’re a service-based Salesforce consultancy that ties architecture to board metrics—faster revenue cycles, higher retention, lower cost-to-serve, and audit-ready governance. We are a <strong className="text-foreground">Salesforce Consulting Partner</strong> and <strong className="text-foreground">Salesforce ISV Partner</strong>.
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <PartnerBadge label="Salesforce Consulting Partner" />
                <PartnerBadge label="Salesforce ISV Partner" />
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link to="/contact"><Button className="rounded-2xl" size="lg">Get a proposal <Rocket className="ml-2 size-4" /></Button></Link>
                <Link to="/approach-results" className="inline-flex items-center text-sm"><span className="underline-offset-4 hover:underline">See our work</span><ExternalLink className="ml-2 size-4" /></Link>
              </div>
              <div className="mt-8 flex flex-wrap gap-2 text-xs text-muted-foreground">
                <Chip>Sales Cloud</Chip><Chip>Service Cloud</Chip><Chip>Experience Cloud</Chip><Chip>Field Service</Chip><Chip>CPQ</Chip><Chip>Marketing Cloud</Chip><Chip>Data & Integrations</Chip><Chip>LWC & Apex</Chip>
              </div>
            </motion.div>

            {/* Right visual column */}
            <div className="relative">
              <div className="pointer-events-none absolute -right-10 -top-10 h-64 w-64 rounded-full bg-gradient-to-tr from-[#ffd9e5]/80 via-[#ffe6c7]/80 to-[#d7f0ff]/80 blur-3xl" />
              <div className="relative mx-auto grid max-w-sm gap-4">
                <div className="rounded-2xl border card-border bg-card p-5 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-[#ffd9e5] via-[#ffe6c7] to-[#d7f0ff] text-[#2d2435]">
                      <Rocket className="size-5" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold">Build</div>
                      <div className="text-xs text-muted-foreground">LWC • Flows • Apex</div>
                    </div>
                  </div>
                </div>
                <div className="rounded-2xl border card-border bg-card p-5 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-[#d8f3ff] via-[#e5e8ff] to-[#d7f7f7] text-[#0f2f3c]">
                      <ShieldCheck className="size-5" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold">Secure</div>
                      <div className="text-xs text-muted-foreground">Sharing • SSO • Audits</div>
                    </div>
                  </div>
                </div>
                <div className="rounded-2xl border card-border bg-card p-5 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-[#dff3e3] via-[#f2f7d5] to-[#ffe9d6] text-[#1f3a2a]">
                      <Workflow className="size-5" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold">Automate</div>
                      <div className="text-xs text-muted-foreground">Ops • Portals • Analytics</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Section eyebrow="Trusted by teams" subtitle="We partner with product and operations leaders to modernize their Salesforce stack.">
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground">
          <Chip>ISV & SaaS</Chip><Chip>Fintech</Chip><Chip>Manufacturing</Chip><Chip>Healthcare</Chip><Chip>Retail & eCom</Chip>
        </div>
      </Section>

      <Section eyebrow="Business outcomes" title="What leadership cares about" subtitle="Programs mapped to revenue, retention, and risk goals—so the board sees the impact.">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { title: 'Revenue velocity', metric: '+12–24% faster cycles', desc: 'Guided selling, cleaner pipeline hygiene, and approvals that move deals without friction.', icon: <Rocket className="size-5" /> },
            { title: 'Customer loyalty', metric: '8–15 pt CSAT lift', desc: 'Service playbooks, knowledge, and proactive outreach that reduce churn and escalations.', icon: <Handshake className="size-5" /> },
            { title: 'Risk & compliance', metric: 'Audit-ready controls', desc: 'Sharing, SSO, and monitoring baked into delivery—no surprises during security reviews.', icon: <ShieldCheck className="size-5" /> },
          ].map((item, i) => (
            <Card key={i} className="rounded-2xl card-border bg-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg text-foreground">{item.icon}{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="text-2xl font-semibold text-foreground">{item.metric}</div>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <Section eyebrow="Why Vextor" title="Service-based, value-obsessed" subtitle="Clear outcomes, transparent delivery, and long-term care.">
        <div className="grid gap-6 lg:grid-cols-3">
          {[{k:'Outcome over output',d:'We map every sprint to business KPIs—time-to-onboard, win-rate, CSAT.'},{k:'Architected right',d:'Security, sharing, and data model choices that scale with your roadmap.'},{k:'Care & SLAs',d:'Post-go-live support with defined response times and proactive health checks.'}].map((w,i)=> (
            <Card key={i} className="rounded-2xl card-border bg-card"><CardHeader><CardTitle className="text-lg">{w.k}</CardTitle></CardHeader><CardContent><p className="text-sm text-muted-foreground">{w.d}</p></CardContent></Card>
          ))}
        </div>
      </Section>

      <Section eyebrow="What clients say" title="Reviews & testimonials" subtitle="Quotes to illustrate layout.">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            {name:'Brain Cronin', role:'Founder, BuilderTek', text:'Vextor cut our case resolution time by 31% and finally gave us dashboards the team actually uses.'},
            {name:'Kristi McLaughlin', role:'Founder, ForeFront', text:'They cleaned up our pipeline, automated handoffs, and our win rate jumped within two quarters.'},
            {name:'Vicki Lipinski', role:'Acts Housing', text:'Portal rollout was smooth and secure. The team’s weekly demos kept us aligned throughout.'},
            {name:'Brian Kwong', role:'betterpartners', text:'Our reporting is trustworthy now. Decisions are faster and more confident.'}
          ].map((t,i)=> (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30, rotateX: 8 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.45, delay: i * 0.08 } }}
              viewport={{ once: true, amount: 0.25 }}
              className="will-change-transform"
            >
              <Card className="rounded-2xl card-border bg-card shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                <CardHeader><CardTitle className="flex items-center gap-2 text-foreground">{Array.from({length:5}).map((_,j)=>(<Star key={j} className="size-4" />))}</CardTitle></CardHeader>
                <CardContent><p className="text-sm text-foreground">“{t.text}”</p><p className="mt-3 text-xs text-muted-foreground">— {t.name}, {t.role}</p></CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Start here" title="Ready to make Salesforce your advantage?" subtitle="Tell us about your goals—next, we’ll share a tailored plan and timeline.">
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link to="/contact"><Button size="lg" className="rounded-2xl">Book a 30‑min call<CalendarCheck2 className="ml-2 size-4" /></Button></Link>
          <Chip>Avg. reply time: <strong className="ml-1">&lt; 12h</strong></Chip>
          <Chip>Based in Ahmedabad • Works US shifts</Chip>
        </div>
      </Section>
    </main>
  )
}

function ServicesPage() {
  const services = [
    { icon: <Sparkles className="size-5" />, name: 'Advisory & Architecture', bullet: ['Org assessments & roadmaps','Security & sharing model','Data model & governance'] },
    { icon: <Cloud className="size-5" />, name: 'Implementation', bullet: ['Sales/Service/Experience Cloud','Flows, LWC, Apex','Field Service, CPQ'] },
    { icon: <Handshake className="size-5" />, name: 'Integrations', bullet: ['REST/SOAP, Platform Events','iPaaS & custom adapters','Data sync & dedupe'] },
    { icon: <LayoutDashboard className="size-5" />, name: 'Analytics', bullet: ['Reports & dashboards','Data pipeline setup','RevOps insights'] },
    { icon: <ShieldCheck className="size-5" />, name: 'Security & Compliance', bullet: ['Profiles, PermSets, SSO','Audit & monitoring','Backup & restore'] },
    { icon: <LifeBuoy className="size-5" />, name: 'Managed Services', bullet: ['Admin-as-a-service','Enhancements & BAU','SLA-backed support'] },
  ]
  const accelerators = [
    { name: 'Onboarding (DayOne)', points: ['Auto-creates role tasks','Email/Slack notifications','Journey tracking dashboard'] },
    { name: 'Revenue Ops Kit', points: ['MQL→SQL handoff','Forecast hygiene','Win-loss insights'] },
    { name: 'Service Excellence', points: ['Case deflection','CSAT workflows','Field agent mobile'] },
    { name: 'Partner Portal', points: ['Secure Experience Cloud','RBAC + sharing','Self-serve knowledge'] },
  ]
  return (
    <main>
      <Section eyebrow="What we do" title="Services built around outcomes" subtitle="Strategic consulting, hands-on engineering, and long-term care—so your org keeps working as hard as your team.">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Card key={i} className="rounded-2xl card-border bg-card"><CardHeader><CardTitle className="flex items-center gap-2 text-lg text-foreground">{s.icon}{s.name}</CardTitle></CardHeader><CardContent><ul className="space-y-2 text-sm text-muted-foreground">{s.bullet.map((b,j)=>(<li key={j} className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 size-4" />{b}</li>))}</ul></CardContent></Card>
          ))}
        </div>
      </Section>

      <Section eyebrow="Solutions" title="Prebuilt accelerators" subtitle="Kickstart common journeys with our opinionated blueprints.">
        <div className="grid gap-6 md:grid-cols-2">
          {accelerators.map((s, i) => (
            <Card key={i} className="rounded-2xl card-border bg-card"><CardHeader><CardTitle className="text-lg text-foreground">{s.name}</CardTitle></CardHeader><CardContent><ul className="space-y-2 text-sm text-muted-foreground">{s.points.map((p,j)=>(<li key={j} className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 size-4" />{p}</li>))}</ul></CardContent></Card>
          ))}
        </div>
      </Section>

      <Section eyebrow="Engagement models" title="How we can work together">
        <div className="grid gap-6 md:grid-cols-3">
          {[{n:'Project-based',d:'Fixed-scope delivery with milestones and demos.'},{n:'Dedicated squad',d:'Cross-functional team (admin, dev, QA) on a monthly retainer.'},{n:'Support & Care',d:'SLA-based support with proactive health checks.'}].map((e,i)=>(
            <Card key={i} className="rounded-2xl card-border bg-card"><CardHeader><CardTitle className="text-lg text-foreground">{e.n}</CardTitle></CardHeader><CardContent><p className="text-sm text-muted-foreground">{e.d}</p></CardContent></Card>
          ))}
        </div>
      </Section>
    </main>
  )
}

function IndustriesPage() {
  const rows = [
    { name: 'ISV & SaaS', text: 'Subscription ops, entitlement, in-app support, partner portals.' },
    { name: 'Fintech', text: 'KYC/AML workflows, dispute handling, collections, reporting.' },
    { name: 'Manufacturing', text: 'Lead-to-quote, dealer portals, service scheduling, warranties.' },
    { name: 'Healthcare', text: 'Provider networks, service ops, secure community portals.' },
    { name: 'Retail & eCom', text: 'Order support, loyalty, service excellence, analytics.' },
    { name: 'Education', text: 'Admissions, alumni relations, service excellence for students.' },
    { name: 'Logistics', text: 'Order tracking, returns, field service, partner visibility.' },
    { name: 'Nonprofit', text: 'Constituent services, volunteer portals, program analytics.' },
    { name: 'Energy', text: 'Asset service, outage comms, compliance workflows.' },
    { name: 'Hospitality', text: 'Guest support, loyalty operations, concierge workflows.' },
    { name: 'Media & Entertainment', text: 'Subscriber care, ad ops support, partner portals.' },
    { name: 'Real Estate', text: 'Broker onboarding, deal rooms, service requests.' },
  ]
  return (
    <main>
      <Section eyebrow="Where we play" title="Industries & patterns">
        <div className="grid gap-6 md:grid-cols-2">
          {rows.map((r,i)=>(
            <Card key={i} className="rounded-2xl card-border bg-card"><CardHeader><CardTitle className="flex items-center gap-2 text-lg text-foreground"><Compass className="size-5" /> {r.name}</CardTitle></CardHeader><CardContent><p className="text-sm text-muted-foreground">{r.text}</p></CardContent></Card>
          ))}
        </div>
      </Section>
    </main>
  )
}

function ApproachResultsPage() {
  const stages = [
    { stage: 'Discover', time: '10–15 days', blurb: 'Workshops, audit, roadmap' },
    { stage: 'Design', time: '1–2 weeks', blurb: 'Solution design, security' },
    { stage: 'Build', time: '2–6 sprints', blurb: 'Config, LWC, Apex, QA' },
    { stage: 'Adopt', time: 'ongoing', blurb: 'Training, support, analytics' },
  ]
  const items = [
    { kpi: '-42%', label: 'Onboarding time', desc: 'Automated employee Day 1 tasks across HR/IT/Manager.' },
    { kpi: '+27%', label: 'Win rate', desc: 'RevOps hygiene + guided selling playbooks.' },
    { kpi: '99.95%', label: 'Portal uptime', desc: 'Experience Cloud with robust sharing & monitoring.' },
    { kpi: '-68%', label: 'Manual data fixes', desc: 'Data pipeline + dedupe for reliable reporting.' },
    { kpi: '+34%', label: 'CSAT', desc: 'Service workflows, knowledge, and feedback loops.' },
    { kpi: 'x3', label: 'Release cadence', desc: 'CI/CD and branching model with quality gates.' },
  ]
  const stories = [
    { title: 'Unified Sales & Success', summary: 'Aligned Sales and Success on a single process, reducing handoff gaps and improving expansion.' },
    { title: 'Dealer Portal Modernization', summary: 'Migrated legacy portal to Experience Cloud with RBAC, boosting partner engagement.' },
    { title: 'Field Service Dispatching', summary: 'Optimized scheduling & inventory; improved first-visit resolution and utilization.' },
  ]
  return (
    <main>
      <Section eyebrow="Our approach" title="From discovery to value, fast" subtitle="Transparent delivery with weekly demos and no surprises.">
        <div className="grid gap-6 md:grid-cols-4">
          {stages.map((s,i)=>(
            <Card key={i} className="rounded-2xl card-border bg-card">
              <CardHeader><CardTitle className="flex items-center gap-2 text-base text-foreground">{s.stage}</CardTitle></CardHeader>
              <CardContent>
                <p className="text-sm text-foreground">{s.time}</p>
                <p className="mt-2 text-sm text-foreground">{s.blurb}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <Section eyebrow="Selected work" title="Results we’ve delivered" subtitle="Hypothetical examples to show structure.">
        <div className="grid gap-6 lg:grid-cols-3">
          {items.map((w,i)=>(
            <Card key={i} className="rounded-2xl card-border bg-card"><CardHeader><CardTitle className="text-3xl text-foreground">{w.kpi}</CardTitle><p className="text-sm text-muted-foreground">{w.label}</p></CardHeader><CardContent><p className="text-sm text-foreground">{w.desc}</p></CardContent></Card>
          ))}
        </div>
      </Section>

      <Section eyebrow="In-depth" title="Case study summaries">
        <div className="grid gap-6 md:grid-cols-3">
          {stories.map((s,i)=>(
            <Card key={i} className="rounded-2xl card-border bg-card"><CardHeader><CardTitle className="text-lg text-foreground">{s.title}</CardTitle></CardHeader><CardContent><p className="text-sm text-muted-foreground">{s.summary}</p><div className="pt-4"><Link to="/contact" className="text-sm underline-offset-4 hover:underline">Discuss this approach →</Link></div></CardContent></Card>
          ))}
        </div>
      </Section>

      <Section eyebrow="Client reviews" title="What customers say">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {n:'Ravi T.', r:'CTO, SaaS', t:'Their architects saved us months by getting the sharing model right from day one.'},
            {n:'Elena P.', r:'VP CX', t:'We finally have CSAT trending up and fewer escalations thanks to the new workflows.'},
            {n:'David L.', r:'Head of RevOps', t:'Our reporting is trustworthy now. Decisions are faster and more confident.'}
          ].map((c,i)=>(
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30, rotateX: 8 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.45, delay: i * 0.1 } }}
              viewport={{ once: true, amount: 0.25 }}
              className="will-change-transform"
            >
              <Card className="rounded-2xl card-border bg-card shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                <CardHeader><CardTitle className="flex items-center gap-1 text-foreground">{Array.from({length:5}).map((_,j)=>(<Star key={j} className="size-4" />))}</CardTitle></CardHeader>
                <CardContent><p className="text-sm text-foreground">“{c.t}”</p><p className="mt-3 text-xs text-muted-foreground">— {c.n}, {c.r}</p></CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>
    </main>
  )
}

function AboutPage() {
  const PartnerBadgeCard = ({ title, caption }:{ title: string; caption: string }) => (
    <Card className="rounded-2xl card-border bg-card">
      <CardHeader>
        <CardTitle className="text-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg border">
            <ShieldCheck className="size-5" />
          </div>
          <p className="text-sm text-muted-foreground">{caption}</p>
        </div>
      </CardContent>
    </Card>
  )
  return (
    <main>
      <Section eyebrow="Who we are" title="Vextor is a service‑based Salesforce consultancy" subtitle="Founded in India, partnering globally. We combine architecture-first thinking with pragmatic delivery.">
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="rounded-2xl card-border bg-card">
            <CardHeader><CardTitle className="text-foreground">Company overview</CardTitle></CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>We help product and operations teams turn Salesforce into a competitive advantage. Our focus is on durable architecture, maintainable automation, and measurable outcomes.</p>
              <p>We operate as an extension of your team with small, senior squads—solution architects, certified developers, admins, and QA—engaged through transparent sprints and SLAs.</p>
            </CardContent>
          </Card>
          <Card className="rounded-2xl card-border bg-card">
            <CardHeader><CardTitle className="text-foreground">Team & certifications</CardTitle></CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>Our team includes <strong className="text-foreground">Certified Salesforce Developers</strong>, Admins, and Consultants spanning Sales, Service, Experience Cloud, Field Service, and CPQ.</p>
              <p>We invest in continuous learning and internal playbooks so you benefit from repeatable best practices.</p>
            </CardContent>
          </Card>
        </div>
      </Section>

      <Section eyebrow="Recognitions" title="Partners & ecosystem">
        <div className="grid gap-6 md:grid-cols-2">
          <PartnerBadgeCard title="Salesforce Consulting Partner" caption="Recognized for solution design, implementation, and long-term adoption." />
          <PartnerBadgeCard title="Salesforce ISV Partner" caption="Experience building and supporting managed package products on the platform." />
        </div>
      </Section>

      <Section eyebrow="How we engage" title="Principles & ways of working">
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="rounded-2xl card-border bg-card"><CardHeader><CardTitle className="text-foreground">Our principles</CardTitle></CardHeader><CardContent className="space-y-2 text-sm text-muted-foreground"><p>Outcomes over output.</p><p>Security by default.</p><p>Automate ruthlessly; document what matters.</p></CardContent></Card>
          <Card className="rounded-2xl card-border bg-card"><CardHeader><CardTitle className="text-foreground">Engagement model</CardTitle></CardHeader><CardContent className="space-y-2 text-sm text-muted-foreground"><p>Small, senior teams that integrate with yours.</p><p>Weekly demos and open comms.</p><p>Clear milestones, no surprises.</p></CardContent></Card>
        </div>
      </Section>
    </main>
  )
}

function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm({ ...form, [e.target.name]: e.target.value })
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert(`Thanks, ${form.name || 'there'}! This is a demo—your details would be sent to Vextor.\n\nEmail: ${form.email}\nMessage: ${form.message}`)
    setForm({ name: '', email: '', message: '' })
  }
  return (
    <main>
      <Section eyebrow="Contact" title="Say hello">
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="rounded-2xl card-border bg-card">
            <CardHeader><CardTitle className="text-foreground">Start a project</CardTitle></CardHeader>
            <CardContent>
            <form
                action="https://formspree.io/f/movnzdpv"
                method="POST"
                className="space-y-4"
              >
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-xs text-muted-foreground">Name</label>
                    <Input name="name" required placeholder="Your name" />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs text-muted-foreground">Email</label>
                    <Input name="email" type="email" required placeholder="you@company.com" />
                  </div>
                </div>
                <div>
                  <label className="mb-1 block text-xs text-muted-foreground">Project brief</label>
                  <Textarea name="message" placeholder="A few lines about your goals…" rows={5} />
                </div>

                {/* (Optional) Add a hidden subject or source */}
                <input type="hidden" name="_subject" value="New contact from vextor.co" />
                <input type="hidden" name="_honeypot" />

                <Button type="submit" className="w-full rounded-2xl">Send message</Button>
                <p className="text-xs text-muted-foreground">
                  We’ll reply from <a href="mailto:hello@vextor.co" className="underline-offset-4 hover:underline">hello@vextor.co</a>.
                </p>
              </form>
            </CardContent>
          </Card>

          <div className="grid gap-6">
            <Card className="rounded-2xl card-border bg-card">
              <CardHeader><CardTitle className="text-foreground">Contact details</CardTitle></CardHeader>
              <CardContent className="space-y-3 text-sm text-foreground">
                <a href="mailto:hello@vextor.co" className="flex items-center gap-2 underline-offset-4 hover:underline"><Mail className="size-4" /> hello@vextor.co</a>
                <a href="tel:+919016070659" className="flex items-center gap-2 underline-offset-4 hover:underline"><Phone className="size-4" /> +91 9016070659</a>
                <a href="https://maps.google.com/?q=7th%20floor,%20The%20Link,%20Vijay%20Cross%20Rd,%20Navrangpura,%20Ahmedabad,%20Gujarat%20380009" className="flex items-start gap-2 underline-offset-4 hover:underline" target="_blank" rel="noopener noreferrer"><MapPinned className="mt-0.5 size-6 shrink-0" /> 7th floor, The Link, Vijay Cross Rd, Navrangpura, Ahmedabad, Gujarat 380009</a>
                <div className="flex items-center gap-3 pt-2">
                  <a href="#" aria-label="LinkedIn" className="inline-flex items-center gap-2 text-sm underline-offset-4 hover:underline" onClick={(e)=>e.preventDefault()}><Linkedin className="size-4" /> LinkedIn</a>
                  <a href="#" aria-label="GitHub" className="inline-flex items-center gap-2 text-sm underline-offset-4 hover:underline" onClick={(e)=>e.preventDefault()}><Github className="size-4" /> GitHub</a>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl card-border bg-card">
              <CardHeader><CardTitle className="text-foreground">Why Vextor?</CardTitle></CardHeader>
              <CardContent className="space-y-2 text-sm text-foreground">
                <p className="flex items-center gap-2"><ShieldCheck className="size-4" /> Service-based consulting partner</p>
                <p className="flex items-center gap-2"><Rocket className="size-4" /> Architecture-first delivery</p>
                <p className="flex items-center gap-2"><Sparkles className="size-4" /> Opinionated playbooks & accelerators</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </Section>
    </main>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <Shell>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/industries" element={<IndustriesPage />} />
          <Route path="/approach-results" element={<ApproachResultsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Shell>
    </ThemeProvider>
  )
}
