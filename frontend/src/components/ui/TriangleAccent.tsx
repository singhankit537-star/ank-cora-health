export default function TriangleAccent({ className = '', flip = false }) {
  return (
    <div
      className={`pointer-events-none overflow-hidden leading-none ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 80"
        className={`block w-full h-10 sm:h-14 ${flip ? 'rotate-180' : ''}`}
        preserveAspectRatio="none"
      >
        <polygon
          points="0,80 720,0 1440,80"
          className="fill-cora-sky"
        />
      </svg>
    </div>
  )
}
