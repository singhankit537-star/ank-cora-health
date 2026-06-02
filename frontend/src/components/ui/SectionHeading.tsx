export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  light = false,
  className = '',
}) {
  const alignClass =
    align === 'center' ? 'text-center mx-auto' : 'text-left'

  return (
    <div className={`max-w-3xl ${alignClass} ${className}`}>
      {eyebrow && (
        <p
          className={`mb-2 text-sm font-semibold uppercase tracking-wider ${light ? 'text-cora-teal' : 'text-cora-blue'}`}
        >
          {eyebrow}
        </p>
      )}
      {title && (
        <h2
          className={`text-3xl font-bold tracking-tight sm:text-4xl ${light ? 'text-white' : 'text-cora-navy'}`}
        >
          {title}
        </h2>
      )}
      {subtitle && (
        <p
          className={`mt-4 text-lg leading-relaxed ${light ? 'text-white/90' : 'text-cora-gray'}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
