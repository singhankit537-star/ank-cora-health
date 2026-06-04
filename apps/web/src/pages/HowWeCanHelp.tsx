import React from 'react'
import { PageHero, ServiceCard } from '@cora/ui'
import type { Service } from '@cora/ui'

const SERVICES: Service[] = [
  {
    id: 'pt',
    name: 'Physical Therapy',
    description: 'Evidence-based treatment to restore movement, reduce pain, and prevent future injury through targeted exercise and manual therapy.',
    category: 'physical-therapy',
    icon: '🏃',
  },
  {
    id: 'ot',
    name: 'Occupational Therapy',
    description: 'Helping patients regain the skills needed for daily living and work activities after injury, illness, or surgery.',
    category: 'rehabilitation',
    icon: '🤝',
  },
  {
    id: 'telehealth',
    name: 'Telehealth',
    description: 'Remote physical therapy sessions via video — same expert care from the comfort of your home.',
    category: 'physical-therapy',
    icon: '💻',
  },
  {
    id: 'sports-medicine',
    name: 'Sports Medicine',
    description: 'Specialized care for athletes — from injury prevention and performance optimization to post-surgery recovery.',
    category: 'sports-medicine',
    icon: '⚽',
  },
  {
    id: 'work-conditioning',
    name: 'Work Conditioning',
    description: 'Job-specific rehabilitation programs designed to safely return injured workers to full occupational function.',
    category: 'rehabilitation',
    icon: '🔧',
  },
  {
    id: 'orthopedic-rehab',
    name: 'Orthopedic Rehabilitation',
    description: 'Post-surgical and conservative care for musculoskeletal conditions — hips, knees, shoulders, and spine.',
    category: 'physical-therapy',
    icon: '🦴',
  },
  {
    id: 'balance-vestibular',
    name: 'Balance & Vestibular',
    description: 'Specialized therapy for dizziness, vertigo, and balance disorders to reduce fall risk and restore stability.',
    category: 'rehabilitation',
    icon: '⚖️',
  },
  {
    id: 'womens-health',
    name: "Women's Health",
    description: 'Pelvic floor rehabilitation and wellness programs tailored for women at all stages of life.',
    category: 'wellness',
    icon: '🌸',
  },
]

const HowWeCanHelp: React.FC = () => (
  <main>
    <PageHero
      title="How We Can Help"
      subtitle="Comprehensive physical therapy and rehabilitation services tailored to your needs."
    />

    <section className="bg-gray-50 py-16" aria-label="Our services">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {SERVICES.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>

    <section className="bg-white py-12 text-center">
      <h2 className="text-2xl font-bold text-cora-navy">Ready to Start Your Recovery?</h2>
      <p className="mt-2 text-gray-500">Find a CORA clinic near you.</p>
      <a
        href="/#locations"
        className="mt-6 inline-block rounded-lg bg-cora-navy px-6 py-3 text-sm font-semibold text-white transition hover:bg-cora-navy/90"
      >
        Find a Location
      </a>
    </section>
  </main>
)

export default HowWeCanHelp
