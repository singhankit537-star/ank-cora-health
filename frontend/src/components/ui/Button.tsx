const variants = {
  primary:
    'bg-cora-orange text-white hover:bg-orange-600 focus-visible:ring-cora-orange',
  secondary:
    'bg-cora-blue text-white hover:bg-cora-navy focus-visible:ring-cora-blue',
  outline:
    'border-2 border-cora-blue text-cora-blue bg-transparent hover:bg-cora-sky focus-visible:ring-cora-blue',
  ghost: 'text-cora-navy hover:bg-cora-sky focus-visible:ring-cora-navy',
  white:
    'bg-white text-cora-navy hover:bg-cora-sky focus-visible:ring-white',
}

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-2.5 text-sm font-semibold',
  lg: 'px-8 py-3 text-base font-semibold',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  href,
  ...props
}) {
  const classes = `inline-flex items-center justify-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${variants[variant] ?? variants.primary} ${sizes[size] ?? sizes.md} ${className}`

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    )
  }

  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  )
}
