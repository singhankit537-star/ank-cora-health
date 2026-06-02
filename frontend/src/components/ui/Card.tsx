import type { ElementType, HTMLAttributes } from 'react'

interface CardProps extends HTMLAttributes<HTMLElement> {
  hover?: boolean
  as?: ElementType
}

export default function Card({
  children,
  className = '',
  hover = false,
  as: Tag = 'div',
  ...props
}: CardProps) {
  return (
    <Tag
      className={`overflow-hidden rounded-lg bg-white shadow-md ${hover ? 'transition-shadow hover:shadow-xl' : ''} ${className}`}
      {...props}
    >
      {children}
    </Tag>
  )
}
