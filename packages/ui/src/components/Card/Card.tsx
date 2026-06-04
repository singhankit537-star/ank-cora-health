import type { ElementType, HTMLAttributes, ReactNode } from 'react'

/**
 * Props for the `Card` component.
 */
export interface CardProps extends HTMLAttributes<HTMLElement> {
  /**
   * Adds a `hover:shadow-xl` transition for interactive cards.
   * @default false
   */
  hover?: boolean
  /**
   * Polymorphic tag override — render as `article`, `li`, `section`, etc.
   * @default 'div'
   */
  as?: ElementType
  /** Card content. */
  children?: ReactNode
}

/**
 * Versatile surface container with rounded corners and a drop shadow.
 *
 * Renders as a `div` by default.  Pass `as` to change the semantic element
 * (e.g. `as="article"` for content cards).  Enable `hover` for cards that
 * respond to pointer interaction.
 */
export default function Card({
  children,
  className = '',
  hover = false,
  as: Tag = 'div',
  ...props
}: CardProps) {
  return (
    <Tag
      className={[
        'overflow-hidden rounded-lg bg-white shadow-md',
        hover ? 'transition-shadow hover:shadow-xl' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {children}
    </Tag>
  )
}
