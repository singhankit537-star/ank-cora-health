import { topNav } from '../../data/navigation'
import { Container } from '@ank-cora/ui-mfe'
import TopNavDropdown from './TopNavDropdown'

export default function AnnouncementBar({
  message = 'From new grads to seasoned pros, your next move starts here.',
  linkText = 'Explore CORA Careers',
  linkHref = '#careers',
  onClose,
}) {
  return (
    <div className="bg-cora-navy text-white">
      <Container className="flex items-center justify-between gap-4 py-2.5 text-sm">
        <p className="text-center sm:text-left">
          {message}{' '}
          <a
            href={linkHref}
            className="font-semibold underline underline-offset-2 hover:text-cora-teal"
          >
            {linkText}
          </a>
        </p>

        {/* Utility links moved up to the top-right corner */}
        <nav aria-label="Utility navigation" className="hidden lg:block">
          <ul className="flex items-center gap-5">
            {topNav.map((item) => (
              <TopNavDropdown
                key={item.label}
                label={item.label}
                href={item.href}
                items={item.children}
                highlight={item.highlight}
              />
            ))}
          </ul>
        </nav>

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 rounded p-1 hover:bg-white/10"
            aria-label="Close announcement"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </Container>
    </div>
  )
}
