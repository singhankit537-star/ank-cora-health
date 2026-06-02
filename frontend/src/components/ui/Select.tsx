import type { SelectHTMLAttributes } from 'react'

export interface SelectOption {
  value: string
  label: string
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  wrapperClassName?: string
  options?: Array<SelectOption | string>
}

export default function Select({
  label,
  id,
  options = [],
  className = '',
  wrapperClassName = '',
  ...props
}: SelectProps) {
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
        {options.map((opt) => {
          const value = typeof opt === 'string' ? opt : opt.value
          const text = typeof opt === 'string' ? opt : opt.label
          return (
            <option key={value} value={value}>
              {text}
            </option>
          )
        })}
      </select>
    </div>
  )
}
