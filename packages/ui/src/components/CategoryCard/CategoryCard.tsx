import { useState } from 'react'

/** A single body-area treatment category. */
export interface BodyAreaCategory {
  /** URL-safe slug used as a React key. */
  slug: string
  /** Human-readable category name shown as the card heading. */
  name: string
  /** Short description rendered below the heading. */
  intro: string
  /** Full list of conditions treated within this category. */
  conditionsTreated: string[]
}

const PREVIEW_COUNT = 3

/**
 * Props for the `CategoryCard` component.
 */
export interface CategoryCardProps {
  /** The body-area category data to display. */
  category: BodyAreaCategory
}

/**
 * Interactive card that shows a body-area treatment category with a collapsed
 * list of conditions.
 *
 * The first `PREVIEW_COUNT` (3) conditions are always visible.  If there are
 * more, a "show more / show less" toggle is rendered below the tag list.
 */
export default function CategoryCard({ category }: CategoryCardProps) {
  const [expanded, setExpanded] = useState(false)
  const visible = expanded
    ? category.conditionsTreated
    : category.conditionsTreated.slice(0, PREVIEW_COUNT)
  const extra = category.conditionsTreated.length - PREVIEW_COUNT

  return (
    <article className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      <h2 className="mb-3 text-lg font-semibold text-cora-navy">{category.name}</h2>
      <p className="mb-4 text-sm leading-relaxed text-gray-500">{category.intro}</p>

      <div className="flex flex-wrap gap-2">
        {visible.map((cond) => (
          <span
            key={cond}
            className="rounded-full bg-cora-sky/10 px-3 py-1 text-xs font-medium text-cora-navy"
          >
            {cond}
          </span>
        ))}
      </div>

      {extra > 0 && (
        <button
          onClick={() => setExpanded((prev) => !prev)}
          aria-expanded={expanded}
          className="mt-4 text-sm font-medium text-cora-sky hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-cora-sky"
        >
          {expanded ? 'Show less' : `+${extra} more`}
        </button>
      )}
    </article>
  )
}
