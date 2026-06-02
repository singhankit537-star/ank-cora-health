export default function Select({
  label,
  id,
  options = [],
  className = '',
  wrapperClassName = '',
  ...props
}) {
  const selectId = id ?? label?.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className={wrapperClassName}>
      {label && (
        <label
          htmlFor={selectId}
          className="mb-1 block text-sm font-medium text-cora-navy"
        >
          {label}
        </label>
      )}
      <select
        id={selectId}
        className={`w-full rounded-md border border-gray-300 bg-white px-4 py-2.5 text-gray-800 shadow-sm focus:border-cora-blue focus:outline-none focus:ring-2 focus:ring-cora-blue/30 ${className}`}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value ?? opt} value={opt.value ?? opt}>
            {opt.label ?? opt}
          </option>
        ))}
      </select>
    </div>
  )
}
