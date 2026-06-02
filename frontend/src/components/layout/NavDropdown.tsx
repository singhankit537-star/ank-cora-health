import { useState } from 'react'
import type { NavChild } from '../../data/navigation'

interface NavDropdownProps {
  label: string
  href: string
  items?: NavChild[]
}

export default function NavDropdown({ label, href, items = [] }: NavDropdownProps) {
  const [open, setOpen] = useState(false)

  return (
    <li
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <a
        href={href}
        className="flex items-center gap-1 px-3 py-4 text-sm font-medium text-cora-navy transition-colors hover:text-cora-blue"
        aria-expanded={open}
        aria-haspopup="true"
      >
        {label}
        <ChevronIcon open={open} />
      </a>
      {items.length > 0 && open && (
        <div className="absolute left-0 top-full z-50 min-w-[220px] rounded-md border border-gray-100 bg-white py-2 shadow-xl">
          <ul>
            {items.map((item) => {
              const label = typeof item === 'string' ? item : item.label
              const itemHref = typeof item === 'string' ? '#' : item.href
              return (
                <li key={label}>
                  <a
                    href={itemHref}
                    className="block px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-cora-sky hover:text-cora-blue"
                  >
                    {label}
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </li>
  )
}

interface ChevronIconProps {
  open: boolean
}

function ChevronIcon({ open }: ChevronIconProps) {
  return (
    <svg
      className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  )
}
