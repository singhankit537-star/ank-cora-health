/**
 * Horizontal divider with a centred "OR" pill label.
 *
 * Marked `aria-hidden` because it is purely decorative — screen reader users
 * do not need to hear "OR" between form sections.
 *
 * @example
 * ```tsx
 * <form>
 *   <Button>Primary action</Button>
 *   <OrDivider />
 *   <Button variant="outline">Secondary action</Button>
 * </form>
 * ```
 */
export default function OrDivider() {
  return (
    <div className="flex items-center gap-3" aria-hidden="true">
      <span className="h-px flex-1 border-t border-dashed border-gray-300" />
      <span className="grid h-7 w-7 place-items-center rounded-full bg-white text-xs font-semibold text-cora-gray shadow-sm">
        OR
      </span>
      <span className="h-px flex-1 border-t border-dashed border-gray-300" />
    </div>
  )
}
