import { useState } from 'react'
import { testimonials } from '../../data/testimonials'
import Container from '../ui/Container'
import SectionHeading from '../ui/SectionHeading'

export default function Testimonials() {
  const [active, setActive] = useState(0)
  const current = testimonials[active]

  return (
    <section className="bg-cora-light py-16 lg:py-24">
      <Container>
        <SectionHeading
          title="Testimonials"
          subtitle="See what our patients are saying about us."
          className="mb-12"
        />

        <div className="mx-auto max-w-4xl">
          <blockquote className="rounded-2xl bg-white p-8 shadow-lg sm:p-12">
            <svg
              className="mb-4 h-10 w-10 text-cora-teal opacity-60"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.996 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.984zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
            <p className="text-lg leading-relaxed text-cora-gray sm:text-xl">
              &ldquo;{current.quote}&rdquo;
            </p>
            <footer className="mt-6 font-semibold text-cora-navy">
              — {current.name}
            </footer>
          </blockquote>

          <div className="mt-8 flex items-center justify-center gap-2">
            {testimonials.map((t, i) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setActive(i)}
                className={`h-2.5 rounded-full transition-all ${
                  i === active ? 'w-8 bg-cora-blue' : 'w-2.5 bg-gray-300 hover:bg-cora-teal'
                }`}
                aria-label={`View testimonial from ${t.name}`}
                aria-current={i === active}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
