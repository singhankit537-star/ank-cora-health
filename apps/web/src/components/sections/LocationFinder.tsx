import React from 'react'
import { useAppSelector } from '@/store/hooks'
import type { Location } from '@/types'

// ── Sub-components ────────────────────────────────────────────────────────────
function LocationCard({ location }: { location: Location }) {
  return (
    <article className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-black/5">
      <h3 className="font-semibold text-cora-navy">
        {location.city}, {location.state}
      </h3>
      <p className="mt-1 text-sm text-gray-500">{location.address}</p>
      <p className="mt-1 text-sm font-medium text-cora-navy">{location.phone}</p>
    </article>
  )
}

function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-xl bg-white p-5 shadow-sm ring-1 ring-black/5">
      <div className="h-4 w-32 rounded bg-gray-200" />
      <div className="mt-2 h-3 w-48 rounded bg-gray-200" />
      <div className="mt-1 h-3 w-24 rounded bg-gray-200" />
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────
const LocationFinder: React.FC = () => {
  const { locations, loading, error } = useAppSelector((s) => s.locations)

  return (
    <section id="locations" className="bg-gray-50 py-16 lg:py-24" aria-labelledby="locations-heading">
      <div className="mx-auto max-w-6xl px-4">
        <h2 id="locations-heading" className="mb-2 text-center text-3xl font-bold text-cora-navy">
          Find a Location Near You
        </h2>
        <p className="mb-10 text-center text-gray-500">
          CORA Health has clinics across Florida.
        </p>

        {error && (
          <p role="alert" className="mb-6 text-center text-sm text-red-600">
            Unable to load locations. Please try again.
          </p>
        )}

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {loading
            ? Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)
            : locations.map((loc) => <LocationCard key={loc.id} location={loc} />)}
        </div>
      </div>
    </section>
  )
}

export default LocationFinder
