import Button from '../ui/Button'
import Container from '../ui/Container'
import SectionHeading from '../ui/SectionHeading'
import TriangleAccent from '../ui/TriangleAccent'

export default function CareerSection() {
  return (
    <section id="careers" className="relative overflow-hidden bg-cora-blue py-16 text-white lg:py-24">
      <TriangleAccent className="absolute top-0 left-0 right-0 [&_polygon]:fill-cora-light" />
      <Container className="relative">
        <SectionHeading
          title="Career Opportunities"
          subtitle="You may love your work, but do you love where you do it? Feel appreciated. Be supported. And thrive, when you join the team at CORA."
          light
          className="mb-10"
        />
        <div className="flex flex-wrap justify-center gap-4">
          <Button variant="white" size="lg" href="#careers-learn">
            Learn More
          </Button>
          <Button
            variant="outline"
            size="lg"
            href="#open-positions"
            className="border-white text-white hover:bg-white/10"
          >
            See Open Positions
          </Button>
        </div>
      </Container>
    </section>
  )
}
