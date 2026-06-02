import AnnouncementBar from '../components/layout/AnnouncementBar'
import Footer from '../components/layout/Footer'
import Header from '../components/layout/Header'
import Hero from '../components/sections/Hero'
import CareerSection from '../components/sections/CareerSection'
import LocationFinder from '../components/sections/LocationFinder'
import NewsSection from '../components/sections/NewsSection'
import PainGrid from '../components/sections/PainGrid'
import ReferralSection from '../components/sections/ReferralSection'
import Testimonials from '../components/sections/Testimonials'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white pb-16 lg:pb-0">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-cora-blue focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to main content
      </a>
      <AnnouncementBar />
      <Header />
      <main id="main">
        <Hero />
        <PainGrid />
        <LocationFinder />
        <CareerSection />
        <ReferralSection />
        <Testimonials />
        <NewsSection />
      </main>
      <Footer />
    </div>
  )
}
