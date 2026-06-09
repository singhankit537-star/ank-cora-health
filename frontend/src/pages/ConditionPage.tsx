import AnnouncementBar from '../components/layout/AnnouncementBar'
import Footer from '../components/layout/Footer'
import Header from '../components/layout/Header'
import { Button, Container } from '@ank-cora/ui-mfe'
import { getCondition } from '../data/conditions'

export default function ConditionPage({ slug }) {
  const condition = getCondition(slug)

  return (
    <div className="min-h-screen bg-white">
      <AnnouncementBar />
      <Header />
      {condition ? <ConditionContent condition={condition} /> : <NotFound slug={slug} />}
      <Footer />
    </div>
  )
}

function ConditionContent({ condition }) {
  const {
    name,
    heroImage,
    title,
    intro,
    subheading,
    body,
    symptoms,
    conditionsTreated,
    treatments,
  } = condition

  return (
    <main id="main">
      {/* ---- Hero banner ---- */}
      <section className="bg-gradient-to-b from-cora-sky/60 to-white pt-8 lg:pt-12">
        <Container>
          <div className="relative overflow-hidden rounded-2xl shadow-xl">
            <img
              src={heroImage}
              alt={`${name} physical therapy`}
              className="h-56 w-full object-cover sm:h-72 lg:h-96"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-cora-navy/40 to-transparent" />
          </div>
        </Container>
      </section>

      {/* ---- Intro + symptoms ---- */}
      <section className="py-12 lg:py-16">
        <Container className="grid gap-10 lg:grid-cols-3 lg:gap-14">
          {/* left: narrative */}
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-cora-navy sm:text-4xl">
              {title}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-cora-gray">{intro}</p>

            <MovementIcons />

            <h2 className="mt-10 text-2xl font-bold tracking-tight text-cora-navy">
              {subheading}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-cora-gray">{body}</p>
          </div>

          {/* right: symptoms card */}
          <aside className="lg:col-span-1">
            <div className="rounded-2xl border border-cora-sky bg-cora-light p-6 shadow-sm lg:sticky lg:top-28">
              <h3 className="border-l-4 border-cora-teal pl-3 text-lg font-bold text-cora-blue">
                {name} Symptoms
              </h3>
              <ul className="mt-4 space-y-2.5">
                {symptoms.map((symptom) => (
                  <li key={symptom} className="flex gap-2.5 text-sm text-cora-navy">
                    <Dot />
                    <span>{symptom}</span>
                  </li>
                ))}
              </ul>
              <Button
                variant="secondary"
                href="#appointment"
                className="mt-6 w-full gap-2"
              >
                <CheckIcon />
                Schedule a Free Screening
              </Button>
            </div>
          </aside>
        </Container>
      </section>

      {/* ---- Conditions + treatments split band ---- */}
      <section className="relative">
        {/* full-bleed split background on large screens */}
        <div aria-hidden="true" className="absolute inset-0 hidden lg:block">
          <div className="grid h-full grid-cols-2">
            <div className="bg-cora-teal" />
            <div className="bg-cora-blue" />
          </div>
        </div>

        <Container className="relative grid gap-px lg:grid-cols-2">
          <ListBlock
            className="bg-cora-teal p-8 lg:bg-transparent lg:pr-12"
            heading={`${name} Conditions CORA Treats:`}
            items={conditionsTreated}
          />
          <ListBlock
            className="bg-cora-blue p-8 lg:bg-transparent lg:pl-12"
            heading={`Treatments CORA Offers for ${name}`}
            items={treatments}
          />
        </Container>
      </section>

      {/* ---- Bottom CTA cards ---- */}
      <section className="py-14 lg:py-20">
        <Container>
          <div className="mx-auto grid max-w-4xl gap-5 sm:grid-cols-3">
            {ctaCards.map((card) => (
              <CtaCard key={card.title} {...card} />
            ))}
          </div>
        </Container>
      </section>
    </main>
  )
}

function ListBlock({ heading, items, className = '' }) {
  return (
    <div className={className}>
      <h2 className="text-lg font-bold text-white">{heading}</h2>
      <ul className="mt-4 grid gap-x-6 gap-y-2 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
        {items.map((item) => (
          <li key={item} className="flex gap-2.5 text-sm text-white/90">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-white/70" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

const ctaCards = [
  {
    title: 'Schedule an\nAppointment',
    subtitle: '',
    href: '#appointment',
    icon: CalendarIcon,
  },
  {
    title: 'No Referral?',
    subtitle: 'No Worries. Start therapy now.',
    href: '#appointment',
    icon: ReferralIcon,
  },
  {
    title: 'Schedule a Free\nScreening',
    subtitle: '',
    href: '#appointment',
    icon: ScreeningIcon,
  },
]

function CtaCard({ title, subtitle, href, icon: Icon }) {
  return (
    <a
      href={href}
      className="group flex flex-col items-center gap-2 rounded-xl bg-lime-100 px-5 py-7 text-center shadow-sm ring-1 ring-lime-200 transition-all hover:-translate-y-1 hover:bg-lime-200 hover:shadow-md"
    >
      <span className="text-cora-teal transition-colors group-hover:text-cora-blue">
        <Icon />
      </span>
      <span className="whitespace-pre-line font-semibold leading-snug text-cora-navy">
        {title}
      </span>
      {subtitle && <span className="text-xs text-cora-gray">{subtitle}</span>}
    </a>
  )
}

function MovementIcons() {
  const colors = ['text-lime-500', 'text-cora-teal', 'text-cora-blue', 'text-cora-navy']
  return (
    <div className="mt-6 flex gap-5" aria-hidden="true">
      {colors.map((color, i) => (
        <RunnerIcon key={color} className={`h-9 w-9 ${color}`} flip={i % 2 === 1} />
      ))}
    </div>
  )
}

function NotFound({ slug }) {
  return (
    <main id="main" className="py-24">
      <Container className="text-center">
        <h1 className="text-3xl font-bold text-cora-navy">Condition not found</h1>
        <p className="mt-3 text-cora-gray">
          We couldn’t find a page for “{slug}”.
        </p>
        <Button variant="secondary" href="#" className="mt-6">
          Back to Home
        </Button>
      </Container>
    </main>
  )
}

/* ---------- icons ---------- */

function Dot() {
  return <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-cora-teal" />
}

function CheckIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  )
}

function RunnerIcon({ className = '', flip = false }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      style={flip ? { transform: 'scaleX(-1)' } : undefined}
    >
      <circle cx="14" cy="4" r="2" />
      <path d="M13.5 7.5c-.7 0-1.3.4-1.7 1L9.3 13l-3.1 1.2a1 1 0 0 0 .7 1.9l3.6-1.4c.4-.2.7-.5.9-.9l.5-1 1.6 1.7-1.7 4.6a1 1 0 0 0 1.9.7l1.9-5.1a1.2 1.2 0 0 0-.3-1.3l-1.8-1.8.6-2 .9 1.6c.2.3.5.5.9.6l2.4.5a1 1 0 0 0 .4-2l-2-.4-1.5-2.6a2 2 0 0 0-1.7-1z" />
    </svg>
  )
}

function CalendarIcon() {
  return (
    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path strokeLinecap="round" d="M3 9h18M8 3v4M16 3v4" />
    </svg>
  )
}

function ReferralIcon() {
  return (
    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18M3 12h18" />
      <circle cx="12" cy="12" r="9" />
    </svg>
  )
}

function ScreeningIcon() {
  return (
    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l7 3v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6l7-3z" />
    </svg>
  )
}
