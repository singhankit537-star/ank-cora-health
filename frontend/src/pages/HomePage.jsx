import { Suspense, lazy } from 'react'
import AnnouncementBar from '../components/layout/AnnouncementBar'
import { Footer } from '../components/layout/Footer'
import { Header } from '../components/layout/Header'
import CareerSection from '../components/sections/CareerSection'
import LocationFinder from '../components/sections/LocationFinder'
import NewsSection from '../components/sections/NewsSection'
import PainGrid from '../components/sections/PainGrid'
import ReferralSection from '../components/sections/ReferralSection'
import Testimonials from '../components/sections/Testimonials'

// Code split Hero component for better initial page load performance
const Hero = lazy(() => import('../components/sections/Hero'))

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white pb-16 lg:pb-0">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-cora-blue focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to main content
      </a>
      <AnnouncementBarConnected />
      <Header />
      <main id="main">
        <Suspense
          fallback={
            <section className="relative overflow-hidden bg-gradient-to-br from-cora-sky via-white to-white">
              <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
                <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
                  <div className="space-y-4">
                    <div className="h-12 w-3/4 animate-pulse rounded bg-cora-sky/30" />
                    <div className="h-4 w-full animate-pulse rounded bg-cora-sky/20" />
                    <div className="h-4 w-5/6 animate-pulse rounded bg-cora-sky/20" />
                  </div>
                  <div className="aspect-[4/3] animate-pulse rounded-3xl bg-cora-sky/30" />
                </div>
              </div>
            </section>
          }
        >
          <Hero />
        </Suspense>
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
