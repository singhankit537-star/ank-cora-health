import { useState } from 'react'
import AnnouncementBar from '../components/layout/AnnouncementBar'
import Footer from '../components/layout/Footer'
import Header from '../components/layout/Header'
import Container from '../components/ui/Container'

const TEAM_IMAGE =
  'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&q=80&w=900'

const services = [
  { label: 'Physical Therapy', icon: PhysicalIcon },
  { label: 'Occupational Therapy', icon: OccupationalIcon },
  { label: 'Speech Therapy', icon: SpeechIcon },
]

export default function AppointmentPage() {
  const [seenDoctor, setSeenDoctor] = useState(true)

  const handleSearch = (e) => {
    e.preventDefault()
    // Placeholder for clinic-search API integration
  }

  return (
    <div className="min-h-screen bg-white">
      <AnnouncementBar />
      <Header />

      <main id="main">
        <section className="relative overflow-hidden bg-cora-navy py-12 lg:py-20">
          {/* decorative background shapes */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 overflow-hidden"
          >
            <div className="absolute right-24 top-10 h-28 w-28 rounded-full bg-white/5" />
            <div className="absolute left-[44%] top-1/2 h-24 w-24 rounded-full bg-cora-teal/20" />
            <div className="absolute -right-20 bottom-0 h-72 w-72 rotate-45 rounded-3xl border border-white/5" />
            <div className="absolute right-10 top-1/3 h-80 w-80 rotate-45 rounded-3xl border border-white/5" />
          </div>

          <Container className="relative">
            <h1 className="mb-8 text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
              Get On Our Books And Get On With Your Life.
            </h1>

            <div className="grid items-start gap-10 lg:grid-cols-2">
              {/* ---- Booking form card ---- */}
              <div className="rounded-2xl bg-cora-sky p-6 shadow-2xl sm:p-8">
                <h2 className="text-lg font-bold uppercase tracking-wide text-cora-navy">
                  New Patient? Schedule An Appointment Now.
                </h2>
                <p className="mt-2 text-sm text-cora-gray">
                  If you are a current CORA patient, please call your clinic to schedule your
                  complete plan of care.
                </p>

                <form onSubmit={handleSearch} className="mt-6 space-y-4">
                  <IconInput
                    icon={<SearchIcon />}
                    placeholder="Type of Therapy"
                    aria-label="Type of Therapy"
                  />
                  <IconInput
                    icon={<PinIcon />}
                    trailing={
                      <button
                        type="button"
                        aria-label="Use my location"
                        className="text-cora-teal hover:text-cora-blue"
                      >
                        <LocateIcon />
                      </button>
                    }
                    placeholder="City, State or Zip Code"
                    aria-label="City, State or Zip Code"
                  />
                  <IconInput
                    icon={<CardIcon />}
                    placeholder="Insurance Provider"
                    aria-label="Insurance Provider"
                  />

                  {/* toggle */}
                  <div className="flex items-center gap-3 pt-1">
                    <button
                      type="button"
                      role="switch"
                      aria-checked={seenDoctor}
                      onClick={() => setSeenDoctor((v) => !v)}
                      className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors ${
                        seenDoctor ? 'bg-lime-500' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${
                          seenDoctor ? 'translate-x-5' : 'translate-x-0.5'
                        }`}
                      />
                    </button>
                    <span className="text-sm font-medium text-cora-navy">
                      Have you seen a doctor?
                    </span>
                  </div>

                  <button
                    type="submit"
                    className="flex w-full items-center justify-center gap-2 rounded-md bg-lime-500 px-6 py-3 font-semibold text-cora-navy transition-colors hover:bg-lime-600"
                  >
                    <SearchIcon />
                    Search Clinic Now
                  </button>

                  <OrDivider />

                  <p className="text-center text-sm text-cora-gray">
                    In case injury is due to an auto accident or a workers&apos; compensation
                    claim,
                  </p>
                  <SecondaryButton>Connect With CORA Team</SecondaryButton>

                  <OrDivider />

                  <SecondaryButton>Book Telehealth Appointment</SecondaryButton>
                </form>
              </div>

              {/* ---- Image + services ---- */}
              <div className="lg:pt-4">
                <div className="overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/10">
                  <img
                    src={TEAM_IMAGE}
                    alt="Care team ready to support your recovery"
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover"
                  />
                </div>

                <p className="mt-6 text-center text-base leading-relaxed text-white/90">
                  The sooner you make an appointment at a CORA Clinic near you, the sooner
                  you&apos;ll feel better. Let&apos;s do this!
                </p>

                <ul className="mt-6 flex items-start justify-center gap-8 sm:gap-12">
                  {services.map(({ label, icon: Icon }) => (
                    <li key={label} className="flex flex-col items-center gap-2 text-center">
                      <span className="grid h-12 w-12 place-items-center rounded-full border border-white/40 text-white">
                        <Icon />
                      </span>
                      <span className="max-w-[6rem] text-xs font-semibold text-white">
                        {label}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Container>
        </section>
      </main>
    </div>
  )
}

/* ---------- small building blocks ---------- */

function IconInput({ icon, trailing, className = '', ...props }) {
  return (
    <div className="relative">
      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
        {icon}
      </span>
      <input
        className={`w-full rounded-md border border-gray-300 bg-white py-2.5 pl-10 ${
          trailing ? 'pr-10' : 'pr-4'
        } text-gray-800 shadow-sm placeholder:text-gray-400 focus:border-cora-blue focus:outline-none focus:ring-2 focus:ring-cora-blue/30 ${className}`}
        {...props}
      />
      {trailing && (
        <span className="absolute right-3 top-1/2 -translate-y-1/2">{trailing}</span>
      )}
    </div>
  )
}

function SecondaryButton({ children }) {
  return (
    <button
      type="button"
      className="w-full rounded-md border border-cora-blue bg-white px-6 py-3 font-semibold text-cora-blue transition-colors hover:bg-cora-sky"
    >
      {children}
    </button>
  )
}

function OrDivider() {
  return (
    <div className="flex items-center gap-3" aria-hidden="true">
      <span className="h-px flex-1 border-t border-dashed border-gray-300" />
      <span className="grid h-7 w-7 place-items-center rounded-full bg-white text-xs font-semibold text-cora-gray shadow-sm">
        OR
      </span>
      <span className="h-px flex-1 border-t border-dashed border-gray-300" />
    </div>
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

function PinIcon() {
  return (
    <svg {...iconProps()}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s7-6.16 7-11a7 7 0 10-14 0c0 4.84 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  )
}

function LocateIcon() {
  return (
    <svg {...iconProps()}>
      <circle cx="12" cy="12" r="3" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v3M12 19v3M2 12h3M19 12h3" />
    </svg>
  )
}

function CardIcon() {
  return (
    <svg {...iconProps()}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path strokeLinecap="round" d="M3 10h18" />
    </svg>
  )
}

function PhysicalIcon() {
  return (
    <svg {...iconProps('h-6 w-6')}>
      <circle cx="9" cy="5" r="1.6" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 21l3-6 4 1 3-3M8 15l-1-4 5-1 3 3 3-1" />
    </svg>
  )
}

function OccupationalIcon() {
  return (
    <svg {...iconProps('h-6 w-6')}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 11V6a2 2 0 114 0v5M11 11V5a2 2 0 114 0v6M15 11V7a2 2 0 114 0v6a6 6 0 01-6 6h-1a6 6 0 01-6-6v-2a2 2 0 114 0" />
    </svg>
  )
}

function SpeechIcon() {
  return (
    <svg {...iconProps('h-6 w-6')}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 5h16v11H8l-4 4V5z" />
    </svg>
  )
}
