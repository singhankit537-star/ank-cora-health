/**
 * Props for the `Toggle` component.
 */
export interface ToggleProps {
  /** Whether the toggle is in the on (checked) state. */
  checked: boolean
  /**
   * Callback fired when the user clicks the toggle.
   * Receives the **next** value, not the synthetic event.
   */
  onChange: (checked: boolean) => void
  /** Accessible label rendered to the right of the switch. */
  label: string
  /** Disables the toggle and prevents interaction. */
  disabled?: boolean
}

/**
 * Accessible boolean switch rendered as a pill-shaped toggle with a label.
 *
 * Uses `role="switch"` and `aria-checked` so screen readers announce the
 * correct state.  The `onChange` callback receives the **next** boolean value,
 * making it a drop-in for controlled state.
 *
 * @example
 * ```tsx
 * const [on, setOn] = useState(false)
 * <Toggle checked={on} onChange={setOn} label="Receive notifications" />
 * ```
 */
export default function Toggle({ checked, onChange, label, disabled = false }: ToggleProps) {
  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={[
          'relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-lime-500',
          'disabled:cursor-not-allowed disabled:opacity-50',
          checked ? 'bg-lime-500' : 'bg-gray-300',
        ].join(' ')}
      >
        <span
          className={[
            'inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform',
            checked ? 'translate-x-5' : 'translate-x-0.5',
          ].join(' ')}
        />
      </button>
      <span className="text-sm font-medium text-cora-navy">{label}</span>
    </div>
  )
}
