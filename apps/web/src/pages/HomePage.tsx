import { useEffect, useState } from 'react'
import { apiClient } from '@/services/api/client'
import { useAppDispatch } from '@/store/hooks'
import { fetchLocations } from '@/store/slices/locationSlice'
import Hero from '../components/sections/Hero'
import CareerSection from '../components/sections/CareerSection'
import LocationFinder from '../components/sections/LocationFinder'
import NewsSection from '../components/sections/NewsSection'
import PainGrid from '../components/sections/PainGrid'
import ReferralSection from '../components/sections/ReferralSection'
import Testimonials from '../components/sections/Testimonials'

type ApiStatus = 'checking' | 'connected' | 'offline'

const statusConfig: Record<ApiStatus, { label: string; className: string }> = {
  checking: { label: 'API: Checking…', className: 'bg-gray-100 text-gray-500' },
  connected: { label: 'API: Connected ✓', className: 'bg-lime-100 text-lime-700' },
  offline: { label: 'API: Offline', className: 'bg-red-100 text-red-600' },
}

export default function HomePage() {
  const [apiStatus, setApiStatus] = useState<ApiStatus>('checking')
  const dispatch = useAppDispatch()

  useEffect(() => {
    apiClient.get<{ ok: boolean }>('/health').then((res) => {
      setApiStatus(res.success && res.data?.ok ? 'connected' : 'offline')
    })
  }, [])

  useEffect(() => {
    dispatch(fetchLocations())
  }, [dispatch])

  return (
    <div className="min-h-screen bg-white pb-16 lg:pb-0">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-cora-blue focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to main content
      </a>
      <main id="main">
        <Hero />
        <PainGrid />
        <LocationFinder />
        <CareerSection />
        <ReferralSection />
        <Testimonials />
        <NewsSection />
      </main>

      {/* API health badge — bottom-right corner indicator */}
      <div role="status" aria-live="polite" className="fixed bottom-4 right-4 z-50">
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold shadow ${statusConfig[apiStatus].className}`}
        >
          {statusConfig[apiStatus].label}
        </span>
      </div>
    </div>
  )
}
