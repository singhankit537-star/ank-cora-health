import { Suspense, lazy, useMemo, useState } from 'react'
import AnnouncementBar from '../components/layout/AnnouncementBar'
import Footer from '../components/layout/Footer'
import Header from '../components/layout/Header'
import Container from '../components/ui/Container'
import { clinics, locationStates } from '../data/locations'
import type { Clinic } from '../data/locations'

// Leaflet is a heavy dependency (map engine + CSS), so the map is split into
// its own chunk and only fetched when this page renders.
const ClinicMap = lazy(() => import('../components/ui/ClinicMap'))

export default function FindLocationPage() {
  const [activeState, setActiveState] = useState<string | null>(null)
  const [query, setQuery] = useState('')

  const visibleClinics = useMemo(() => {
    return clinics.filter((c) => {
      const matchesState = !activeState || c.state === activeState
      const matchesQuery =
        !query ||
        `${c.city} ${c.state} ${c.address.join(' ')}`
          .toLowerCase()
          .includes(query.toLowerCase())
      return matchesState && matchesQuery
    })
  }, [activeState, query])

  return (
    <div className="min-h-screen bg-white">
      <AnnouncementBar />
      <Header />

      <main id="main">
        {/* ---- Hero / search ---- */}
        <section className="relative overflow-hidden bg-white py-12 lg:py-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-10 -z-0 h-64 w-64 -translate-x-1/2 rotate-45 rounded-3xl border border-cora-sky"
          />
          <Container className="relative text-center">
            <h1 className="text-3xl font-bold tracking-tight text-cora-navy sm:text-4xl">
              Find a CORA Physical Therapy Near You
            </h1>
            <p className="mt-3 text-lg font-semibold text-cora-navy">
              With 250+ clinics across 10 states, quality care is always nearby.
            </p>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-cora-gray">
              Our scheduling is rapid and our commitment to same-day treatment is unwavering.
              We&apos;re flexible because we know our patients&apos; schedules often are not. And
              we&apos;re always available. Any questions? Just ask!
            </p>

            <div className="mx-auto mt-8 flex max-w-3xl flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <button
                type="button"
                onClick={() => setActiveState(null)}
                className="inline-flex items-center gap-2 text-sm font-medium text-cora-blue hover:text-cora-navy"
              >
                <LocateIcon />
                Use my location
              </button>

              <div className="relative w-full max-w-sm">
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Enter location"
                  aria-label="Enter location"
                  className="w-full rounded-md border-b-2 border-lime-500 bg-cora-light px-4 py-2.5 pr-10 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-cora-blue/30"
                />
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <SearchIcon />
                </span>
              </div>

              <button
                type="button"
                onClick={() => {
                  setActiveState(null)
                  setQuery('')
                }}
                className="inline-flex items-center gap-1 text-sm font-medium text-cora-blue hover:text-cora-navy"
              >
                View All Locations
                <ArrowIcon />
              </button>
            </div>
          </Container>
        </section>

        {/* ---- Map (markers reflect the active filter) ---- */}
        <section aria-label="Clinic map">
          <Suspense
            fallback={
              <div
                className="h-[320px] w-full animate-pulse bg-cora-sky/30 sm:h-[420px]"
                role="status"
                aria-label="Loading map"
              />
            }
          >
            <ClinicMap clinics={visibleClinics} highlight={Boolean(activeState || query)} />
          </Suspense>
        </section>

        {/* ---- Filter + results ---- */}
        <section className="py-12 lg:py-16">
          <Container className="grid gap-10 lg:grid-cols-[220px_1fr]">
            {/* sidebar */}
            <aside>
              <h2 className="text-2xl font-bold text-cora-navy">Filter Locations</h2>
              <ul className="mt-5 space-y-2">
                {locationStates.map((state) => {
                  const isActive = state === activeState
                  return (
                    <li key={state}>
                      <button
                        type="button"
                        onClick={() => setActiveState(isActive ? null : state)}
                        className={`flex w-full items-center gap-2 text-left text-sm transition-colors ${
                          isActive
                            ? 'font-semibold text-cora-orange'
                            : 'text-cora-blue hover:text-cora-navy'
                        }`}
                      >
                        <span className="text-cora-orange">›</span>
                        {state}
                      </button>
                    </li>
                  )
                })}
              </ul>
            </aside>

            {/* cards */}
            <div>
              <p className="mb-4 text-sm text-cora-gray">
                Showing <span className="font-semibold text-cora-navy">{visibleClinics.length}</span>{' '}
                {visibleClinics.length === 1 ? 'clinic' : 'clinics'}
                {activeState ? ` in ${activeState}` : ''}
              </p>

              {visibleClinics.length === 0 ? (
                <p className="rounded-lg border border-dashed border-gray-300 p-8 text-center text-cora-gray">
                  No clinics match your search.
                </p>
              ) : (
                <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  {visibleClinics.map((clinic) => (
                    <ClinicCard key={`${clinic.city}-${clinic.phone}`} clinic={clinic} />
                  ))}
                </div>
              )}
            </div>
          </Container>
        </section>
      </main>

      <Footer />
    </div>
  )
}

function ClinicCard({ clinic }: { clinic: Clinic }) {
  const tel = `tel:${clinic.phone.replace(/[^\d]/g, '')}`
  return (
    <article className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-lg">
      <div className="h-2 bg-cora-navy" />
      <div className="p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-lg font-bold text-cora-navy">CORA {clinic.city}</h3>
          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-cora-sky text-xs font-bold text-cora-blue">
            C
          </span>
        </div>

        <address className="mt-3 not-italic">
          {clinic.address.map((line) => (
            <a
              key={line}
              href="#"
              className="block text-sm text-cora-blue underline underline-offset-2 hover:text-cora-navy"
            >
              {line}
            </a>
          ))}
        </address>

        <a
          href={tel}
          className="mt-4 inline-flex items-center gap-2 rounded-full bg-cora-navy px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-cora-blue"
        >
          {clinic.phone}
          <ArrowIcon />
        </a>
      </div>
    </article>
  )
}

/* ---------- icons ---------- */

function iconProps(size = 'h-5 w-5') {
  return {
    className: size,
    fill: 'none',
    viewBox: '0 0 24 24',
    stroke: 'currentColor',
    strokeWidth: 2,
    'aria-hidden': true,
  }
}

function SearchIcon() {
  return (
    <svg {...iconProps()}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" />
    </svg>
  )
}

function LocateIcon() {
  return (
    <svg {...iconProps('h-4 w-4')}>
      <circle cx="12" cy="12" r="3" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v3M12 19v3M2 12h3M19 12h3" />
    </svg>
  )
}

function ArrowIcon() {
  return (
    <svg {...iconProps('h-4 w-4')}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  )
}
