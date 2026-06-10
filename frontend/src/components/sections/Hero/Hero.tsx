import Button from '../../ui/Button'
import Container from '../../ui/Container'
import TriangleAccent from '../../ui/TriangleAccent'
import ImageCarousel from '../../ui/ImageCarousel'
import type { CarouselImage } from '../../ui/ImageCarousel'
import {useNavigate} from 'react-router'

interface HeroProps {
  title?: string
  subtitle?: string
  images?: CarouselImage[]
}

// Add / remove / reorder hero slides here — each item is { src, alt }.
// Use Unsplash URLs with `auto=format&fit=crop&q=80` so responsive widths work.
// Base URLs intentionally omit &w= so ImageCarousel can build a correct srcSet
// for each breakpoint. Do not append &w= here.
const HERO_IMAGES: CarouselImage[] = [
  {
    src: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=75',
    alt: 'Physical therapist guiding a patient through rehabilitation exercises',
  },
  {
    src: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=75',
    alt: 'Clinician reviewing a treatment plan with a patient',
  },
  {
    src: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&q=75',
    alt: 'Therapist assisting with strength and mobility training',
  },
  {
    src: 'https://images.unsplash.com/photo-1597764690523-15bea4c581c9?auto=format&fit=crop&q=75',
    alt: 'Hands-on physical therapy session in a modern clinic',
  },
]


export default function Hero(
  {
  title = 'Physical Therapy for Everyone.',
  subtitle = 'With 250+ Physical Therapy and Rehabilitation Clinics, Find Care or a Career Close By.',
  images = HERO_IMAGES,
}: HeroProps) {
  const navigate = useNavigate()
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-cora-sky via-white to-white">
      <Container className="grid items-center gap-10 py-12 sm:gap-12 lg:grid-cols-2 lg:py-24">
        <div className="order-2 lg:order-1">
          <h1 className="text-4xl font-bold leading-[1.05] tracking-tight text-cora-navy sm:text-5xl lg:text-6xl xl:text-7xl">
            {title}
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-cora-gray sm:text-xl">
            {subtitle}
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
            <Button variant="primary" size="lg" onClick={() => navigate('/appointment')}>
              Schedule An Appointment
            </Button>
            <Button variant="outline" size="lg" onClick={() => navigate('/locations')}>
              See Locations
            </Button>
          </div>
        </div>
        <div className="order-1 lg:order-2">
          <div className="relative mx-auto max-w-md lg:max-w-none">
            {/* decorative accent behind the carousel */}
            <div
              aria-hidden="true"
              className="absolute -right-4 -top-4 -z-10 hidden h-full w-full rounded-3xl bg-cora-sky lg:block"
            />
            <ImageCarousel images={images} interval={4000} prioritizeFirst />
          </div>
        </div>
      </Container>
      <TriangleAccent />
    </section>
  )
}
