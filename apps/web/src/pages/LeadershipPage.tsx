import AnnouncementBar from '../components/layout/AnnouncementBar'
import Footer from '../components/layout/Footer'
import Header from '../components/layout/Header'
import Container from '../components/ui/Container'
import { leadership } from '../data/leadership'
import type { Leader } from '../data/leadership'

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

function LeaderCard({ name, title, image }: Leader) {
  return (
    <li className="group">
      <div className="overflow-hidden rounded-lg bg-cora-light shadow-sm ring-1 ring-gray-100 transition-shadow group-hover:shadow-lg">
        <div className="aspect-[3/4] overflow-hidden">
          <img
            src={image}
            alt={name}
            loading="lazy"
            className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="p-4">
          <h2 className="text-sm font-semibold text-cora-navy">{name}</h2>
          <p className="mt-1 text-sm font-medium leading-snug text-cora-blue">{title}</p>
        </div>
      </div>
    </li>
  )
}
