import type { InputHTMLAttributes } from 'react'

/**
 * Props for the `Input` component.
 */
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /**
   * Renders a `<label>` element above the input.
   * Also auto-generates an `id` for the input if one is not supplied.
   */
  label?: string
  /** Extra class names applied to the outer wrapper `<div>`. */
  wrapperClassName?: string
}

/**
 * Styled text input with an optional label.
 *
 * When `label` is provided and no explicit `id` is given, an `id` is
 * automatically derived from the label text so the label and input are
 * always associated for accessibility.
 */
export default function Input({
  label,
  id,
  className = '',
  wrapperClassName = '',
  ...props
}: InputProps) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className={wrapperClassName}>
      {label && (
        <label htmlFor={inputId} className="mb-1 block text-sm font-medium text-cora-navy">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={[
          'w-full rounded-md border border-gray-300 px-4 py-2.5 text-gray-800 shadow-sm',
          'transition-colors placeholder:text-gray-400',
          'focus:border-cora-blue focus:outline-none focus:ring-2 focus:ring-cora-blue/30',
          'disabled:cursor-not-allowed disabled:opacity-50',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        {...props}
      />
    </div>
  )
}
