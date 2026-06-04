import type { SelectHTMLAttributes } from 'react'

/** A single option — either a plain string or a `{ value, label }` object. */
export type SelectOption = string | { value: string; label: string }

/**
 * Props for the `Select` component.
 */
export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  /** Renders a `<label>` above the select and auto-links it via `id`. */
  label?: string
  /** Array of options to render inside the `<select>`. */
  options?: SelectOption[]
  /** Extra class names applied to the outer wrapper `<div>`. */
  wrapperClassName?: string
}

/**
 * Styled `<select>` dropdown with an optional label.
 *
 * Options can be supplied as plain strings (value and display text are the
 * same) or as `{ value, label }` objects for separate identifiers and
 * human-readable text.
 */
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
        <label htmlFor={selectId} className="mb-1 block text-sm font-medium text-cora-navy">
          {label}
        </label>
      )}
      <select
        id={selectId}
        className={[
          'w-full rounded-md border border-gray-300 bg-white px-4 py-2.5 text-gray-800 shadow-sm',
          'focus:border-cora-blue focus:outline-none focus:ring-2 focus:ring-cora-blue/30',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
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
