/**
 * Props for the `PageHero` component.
 */
export interface PageHeroProps {
  /** Large heading displayed in the hero. */
  title: string
  /**
   * Optional supporting text rendered below the title at 80 % opacity.
   * Keep this to one or two sentences.
   */
  subtitle?: string
}

/**
 * Full-width navy hero banner used at the top of interior pages.
 *
 * Renders a centred `<h1>` title with an optional subtitle.  Designed to sit
 * directly below the site `<Header>` without any extra wrapper.
 */
export default function PageHero({ title, subtitle }: PageHeroProps) {
  return (
    <section className="bg-cora-navy py-16 text-white">
      <div className="mx-auto max-w-4xl px-4 text-center">
        <h1 className="text-4xl font-bold">{title}</h1>
        {subtitle && <p className="mt-4 text-lg text-white/80">{subtitle}</p>}
      </div>
    </section>
  )
}
