import { painAreas } from '../../data/painAreas'
import type { PainArea } from '../../data/painAreas'
import Button from '../ui/Button'
import Container from '../ui/Container'
import SectionHeading from '../ui/SectionHeading'

export default function PainGrid() {
  return (
    <section id="treat" className="bg-white py-16 lg:py-24">
      <Container>
        <SectionHeading title="Pinpoint Your Pain" className="mb-12" />

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 lg:gap-6">
          {painAreas.map((area) => (
            <PainCard key={area.id} {...area} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button variant="secondary" size="lg" href="#screening">
            Schedule My Free Screening
          </Button>
        </div>
      </Container>
    </section>
  )
}

type PainCardProps = Pick<PainArea, 'title' | 'image' | 'slug'>

function PainCard({ title, image, slug }: PainCardProps) {
  return (
    <a
      href={`/condition/${slug}`}
      className="group relative overflow-hidden rounded-lg shadow-md transition-transform hover:-translate-y-1 hover:shadow-xl"
    >
      <img
        src={image}
        alt={`${title} pain treatment`}
        className="aspect-[4/3] w-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-cora-navy/85 via-cora-navy/20 to-transparent" />
      <h3 className="absolute bottom-0 left-0 right-0 p-4 text-center text-lg font-bold text-white">
        {title}
      </h3>
    </a>
  )
}
