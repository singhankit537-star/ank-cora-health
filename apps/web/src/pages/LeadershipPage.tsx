import AnnouncementBar from '@/components/layout/AnnouncementBar'
import Footer from '@/components/layout/Footer'
import Header from '@/components/layout/Header'
import { Container, LeaderCard } from '@cora/ui'
import { leadership } from '@/data/leadership'

export default function LeadershipPage() {
  return (
    <div className="min-h-screen bg-white">
      <AnnouncementBar />
      <Header />

      <main id="main">
        <section className="py-12 lg:py-20">
          <Container>
            <h1 className="text-center text-3xl font-bold tracking-tight text-cora-navy sm:text-4xl lg:text-5xl">
              Meet Our Leadership Team
            </h1>

            <ul className="mx-auto mt-12 grid max-w-4xl gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {leadership.map((person) => (
                <LeaderCard key={person.name} {...person} />
              ))}
            </ul>
          </Container>
        </section>
      </main>

      <Footer />
    </div>
  )
}
