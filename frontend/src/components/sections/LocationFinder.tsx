import {
  searchComplete,
  setQuery,
  setRadius,
  setResultsLimit,
  startSearch,
} from '../../store/slices/locationSlice'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { Button } from '../ui/Button'
import { Container } from '../ui/Container'
import { Input } from '../ui/Input'
import { SectionHeading } from '../ui/SectionHeading'
import { Select } from '../ui/Select'

const radiusOptions = [
  { value: '10', label: '10 mi' },
  { value: '25', label: '25 mi' },
  { value: '50', label: '50 mi' },
  { value: '100', label: '100 mi' },
  { value: '200', label: '200 mi' },
  { value: '500', label: '500 mi' },
]

const resultOptions = [
  { value: '8', label: '8' },
  { value: '25', label: '25' },
  { value: '50', label: '50' },
  { value: '75', label: '75' },
  { value: '125', label: '125' },
]

export default function LocationFinder() {
  const dispatch = useAppDispatch()
  const { query, radius, resultsLimit, isSearching } = useAppSelector(
    (state) => state.location,
  )

  const handleSearch = (e) => {
    e.preventDefault()
    dispatch(startSearch())
    // Placeholder for location API integration
    dispatch(searchComplete())
  }

  return (
    <section id="locations" className="bg-cora-light py-16 lg:py-24">
      <Container>
        <SectionHeading title="Find A Location Near You" className="mb-10" />

        <form
          onSubmit={handleSearch}
          className="mx-auto max-w-3xl rounded-xl bg-white p-6 shadow-lg sm:p-8"
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Input
              label="ZIP or City"
              placeholder="Enter ZIP or city"
              value={query}
              onChange={(e) => dispatch(setQuery(e.target.value))}
              wrapperClassName="sm:col-span-2 lg:col-span-2"
            />
            <Select
              label="Search radius"
              options={radiusOptions}
              value={radius}
              onChange={(e) => dispatch(setRadius(e.target.value))}
            />
            <Select
              label="Results"
              options={resultOptions}
              value={resultsLimit}
              onChange={(e) => dispatch(setResultsLimit(e.target.value))}
            />
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <Button
              type="submit"
              variant="secondary"
              size="lg"
              disabled={isSearching}
            >
              {isSearching ? 'Searching…' : 'Search Locations'}
            </Button>
            <Button variant="ghost" href="#all-locations">
              See All Locations
            </Button>
          </div>
        </form>
      </Container>
    </section>
  )
}
