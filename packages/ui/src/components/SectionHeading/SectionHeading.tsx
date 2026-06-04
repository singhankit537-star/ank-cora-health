import type { ReactNode } from 'react'

/**
 * Props for the `SectionHeading` component.
 */
export interface SectionHeadingProps {
  /**
   * Small uppercase label displayed above the main title.
   * Useful for category or section identifiers.
   */
  eyebrow?: ReactNode
  /** The main `<h2>` heading text. */
  title?: ReactNode
  /** Supporting description rendered below the title. */
  subtitle?: ReactNode
  /**
   * Text alignment of the heading block.
   * @default 'center'
   */
  align?: 'center' | 'left'
  /**
   * Light colour scheme for use on dark backgrounds.
   * Switches text to white / teal instead of navy / blue.
   * @default false
   */
  light?: boolean
  /** Additional class names applied to the root `<div>`. */
  className?: string
}

/**
 * Reusable section heading with an optional eyebrow, title, and subtitle.
 *
 * Supports centred or left-aligned layouts and a `light` variant for dark
 * background sections.  Renders a semantic `<h2>` for the main heading.
 */
export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  light = false,
  className = '',
}: SectionHeadingProps) {
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-left'

  return (
    <div className={`max-w-3xl ${alignClass} ${className}`}>
      {eyebrow && (
        <p
          className={`mb-2 text-sm font-semibold uppercase tracking-wider ${
            light ? 'text-cora-teal' : 'text-cora-blue'
          }`}
        >
          {eyebrow}
        </p>
      )}
      {title && (
        <h2
          className={`text-3xl font-bold tracking-tight sm:text-4xl ${
            light ? 'text-white' : 'text-cora-navy'
          }`}
        >
          {title}
        </h2>
      )}
      {subtitle && (
        <p
          className={`mt-4 text-lg leading-relaxed ${
            light ? 'text-white/90' : 'text-cora-gray'
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
