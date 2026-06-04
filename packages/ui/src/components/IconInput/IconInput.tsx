import type { InputHTMLAttributes, ReactNode } from 'react'

/**
 * Props for the `IconInput` component.
 */
export interface IconInputProps extends InputHTMLAttributes<HTMLInputElement> {
  /**
   * Icon element rendered on the left side of the input.
   * Typically a small SVG (16–20 px).
   */
  icon: ReactNode
  /**
   * Optional element rendered on the right side of the input.
   * Useful for action buttons such as a "use my location" trigger.
   */
  trailing?: ReactNode
}

/**
 * Text input decorated with a leading icon and an optional trailing element.
 *
 * The leading `icon` is purely decorative (pointer-events disabled).
 * The `trailing` slot is interactive and intended for small icon-buttons.
 *
 * All native `<input>` attributes — including `aria-label`, `type`, and
 * `placeholder` — are forwarded to the underlying element.
 */
export default function IconInput({ icon, trailing, className = '', ...props }: IconInputProps) {
  return (
    <div className="relative">
      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
        {icon}
      </span>
      <input
        className={[
          'w-full rounded-md border border-gray-300 bg-white py-2.5 pl-10 text-gray-800 shadow-sm',
          trailing ? 'pr-10' : 'pr-4',
          'placeholder:text-gray-400',
          'focus:border-cora-blue focus:outline-none focus:ring-2 focus:ring-cora-blue/30',
          'disabled:cursor-not-allowed disabled:opacity-50',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        {...props}
      />
      {trailing && (
        <span className="absolute right-3 top-1/2 -translate-y-1/2">{trailing}</span>
      )}
    </div>
  )
}
