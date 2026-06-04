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
