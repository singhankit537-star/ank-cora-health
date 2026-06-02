import type { ElementType, ReactNode } from 'react'

const sizes = {
  default: 'max-w-7xl',
  narrow: 'max-w-4xl',
  wide: 'max-w-[90rem]',
}

interface ContainerProps {
  children?: ReactNode
  className?: string
  size?: keyof typeof sizes
  as?: ElementType
}

export default function Container({
  children,
  className = '',
  size = 'default',
  as: Tag = 'div',
}: ContainerProps) {
  return (
    <Tag
      className={`mx-auto w-full px-4 sm:px-6 lg:px-8 ${sizes[size] ?? sizes.default} ${className}`}
    >
      {children}
    </Tag>
  )
}
