import Button from '../ui/Button'
import Container from '../ui/Container'
import SectionHeading from '../ui/SectionHeading'

const referralPoints = [
  {
    title: 'Earn A Referral Bonus',
    description:
      'Earn a $1,500 referral bonus when a full-time clinical candidate you recommend joins CORA and completes 90 days of employment.',
  },
  {
    title: 'How to Refer A Clinician',
    description:
      'Referring someone is simple! Just complete the referral form and ensure that your referral includes your name on their online application.',
  },
  {
    title: 'Refer A Clinician Today',
    description:
      'Help CORA find the best talent while earning a reward. Submit your referral today and be part of building a stronger team!',
  },
]

export default function ReferralSection() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <Container>
        <SectionHeading
          eyebrow="Community Referral Program"
          title="Earn While You Help CORA Grow"
          className="mb-12"
        />

        <div className="grid gap-8 md:grid-cols-3">
          {referralPoints.map((point) => (
            <article
              key={point.title}
              className="rounded-xl border border-gray-100 bg-cora-sky/50 p-6 shadow-sm"
            >
              <h3 className="text-xl font-bold text-cora-navy">{point.title}</h3>
              <p className="mt-3 text-cora-gray leading-relaxed">{point.description}</p>
            </article>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button variant="primary" size="lg" href="#referral">
            Take the first step
          </Button>
        </div>
      </Container>
    </section>
  )
}
