import { useCallback, useEffect, useState } from 'react'

/**
 * Auto-rotating image carousel with prev/next arrows and dot indicators.
 *
 * To add or remove slides, just edit the `images` array passed in
 * (see `HERO_IMAGES` in Hero.jsx). Each item is:
 *   { src: string, alt: string }
 *
 * Props:
 *   images        - array of { src, alt }
 *   interval      - ms between auto-advances (default 4000)
 *   autoPlay      - enable/disable auto rotation (default true)
 *   sizes         - responsive `sizes` attribute for the <img>
 */
export default function ImageCarousel({
  images = [],
  interval = 4000,
  autoPlay = true,
  sizes = '(min-width: 1024px) 50vw, 100vw',
}) {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)
  const count = images.length

  const goTo = useCallback((index) => setCurrent((index + count) % count), [count])
  const next = useCallback(() => goTo(current + 1), [current, goTo])
  const prev = useCallback(() => goTo(current - 1), [current, goTo])

  // auto-advance, paused on hover/focus
  useEffect(() => {
    if (!autoPlay || paused || count <= 1) return
    const id = setInterval(() => setCurrent((c) => (c + 1) % count), interval)
    return () => clearInterval(id)
  }, [autoPlay, paused, count, interval])

  if (count === 0) return null

  return (
    <div
      className="group relative overflow-hidden rounded-3xl shadow-2xl ring-1 ring-cora-navy/5"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured images"
    >
      {/* slides */}
      <div
        className="flex transition-transform duration-700 ease-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {images.map((img, i) => (
          <div key={img.src} className="relative w-full shrink-0">
            <img
              src={img.src}
              srcSet={`${img.src}&w=480 480w, ${img.src}&w=800 800w, ${img.src}&w=1200 1200w`}
              sizes={sizes}
              alt={img.alt}
              loading={i === 0 ? 'eager' : 'lazy'}
              className="aspect-[4/3] w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-cora-navy/40 via-transparent to-transparent" />
          </div>
        ))}
      </div>

      {/* arrows (only when more than one slide) */}
      {count > 1 && (
        <>
          <button
            type="button"
            onClick={prev}
            aria-label="Previous image"
            className="absolute left-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/80 text-cora-navy opacity-0 shadow-md backdrop-blur transition hover:bg-white focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-cora-navy group-hover:opacity-100"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next image"
            className="absolute right-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/80 text-cora-navy opacity-0 shadow-md backdrop-blur transition hover:bg-white focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-cora-navy group-hover:opacity-100"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* dot indicators */}
          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
            {images.map((img, i) => (
              <button
                key={img.src}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Go to image ${i + 1}`}
                aria-current={i === current}
                className={`h-2.5 rounded-full transition-all ${
                  i === current ? 'w-6 bg-white' : 'w-2.5 bg-white/60 hover:bg-white/90'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
