import { useState } from 'react'
import Button from '../ui/Button'
import Container from '../ui/Container'
import Input from '../ui/Input'
import SectionHeading from '../ui/SectionHeading'
import Select from '../ui/Select'

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
  const [zip, setZip] = useState('')

  const handleSearch = (e) => {
    e.preventDefault()
    // Placeholder for location API integration
  }

  return (
    <section id="locations" className="bg-cora-light py-16 lg:py-24">
      <Container>
        <SectionHeading
          title="Find A Location Near You"
          className="mb-10"
        />

        <form
          onSubmit={handleSearch}
          className="mx-auto max-w-3xl rounded-xl bg-white p-6 shadow-lg sm:p-8"
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Input
              label="ZIP or City"
              placeholder="Enter ZIP or city"
              value={zip}
              onChange={(e) => setZip(e.target.value)}
              wrapperClassName="sm:col-span-2 lg:col-span-2"
            />
            <Select
              label="Search radius"
              options={radiusOptions}
              defaultValue="50"
            />
            <Select
              label="Results"
              options={resultOptions}
              defaultValue="8"
            />
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <Button type="submit" variant="secondary" size="lg">
              Search Locations
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
