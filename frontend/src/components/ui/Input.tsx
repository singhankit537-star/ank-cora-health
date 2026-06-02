export default function Input({
  label,
  id,
  className = '',
  wrapperClassName = '',
  ...props
}) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className={wrapperClassName}>
      {label && (
        <label
          htmlFor={inputId}
          className="mb-1 block text-sm font-medium text-cora-navy"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={`w-full rounded-md border border-gray-300 px-4 py-2.5 text-gray-800 shadow-sm transition-colors placeholder:text-gray-400 focus:border-cora-blue focus:outline-none focus:ring-2 focus:ring-cora-blue/30 ${className}`}
        {...props}
      />
    </div>
  )
}
