import { useState } from 'react'

export interface BodyAreaCategory {
  slug: string
  name: string
  intro: string
  conditionsTreated: string[]
}

const PREVIEW_COUNT = 3

export default function CategoryCard({ category }: { category: BodyAreaCategory }) {
  const [expanded, setExpanded] = useState(false)
  const visible = expanded
    ? category.conditionsTreated
    : category.conditionsTreated.slice(0, PREVIEW_COUNT)

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

      {category.conditionsTreated.length > PREVIEW_COUNT && (
        <button
          onClick={() => setExpanded((prev) => !prev)}
          aria-expanded={expanded}
          className="mt-4 text-sm font-medium text-cora-sky hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-cora-sky"
        >
          {expanded ? 'Show less' : `+${category.conditionsTreated.length - PREVIEW_COUNT} more`}
        </button>
      )}
    </article>
  )
}
