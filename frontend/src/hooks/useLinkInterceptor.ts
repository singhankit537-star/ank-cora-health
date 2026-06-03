import { useEffect } from 'react'
import { useNavigate } from 'react-router'

/**
 * Installs a single document-level click listener that turns plain `<a href>`
 * internal links into client-side SPA navigations, so components can keep
 * rendering ordinary anchors instead of importing `<Link>` everywhere.
 *
 * Falls through to default browser behaviour for:
 *   - already-handled clicks and non-primary / modified clicks (new tab, etc.)
 *   - anchors with target="_blank"
 *   - hash (`#…`), absolute (`http`, `//`), `tel:` and `mailto:` links
 *
 * Mount once near the root of the app (e.g. inside the router's root layout).
 */
export function useLinkInterceptor(): void {
  const navigate = useNavigate()

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      // Let the browser handle modified clicks (new tab, download, etc.).
      if (
        e.defaultPrevented ||
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      ) {
        return
      }
      const anchor = (e.target as Element).closest('a')
      if (!anchor || anchor.target === '_blank') return
      const href = anchor.getAttribute('href')
      if (
        !href ||
        href.startsWith('#') ||
        href.startsWith('http') ||
        href.startsWith('//') ||
        href.startsWith('tel:') ||
        href.startsWith('mailto:')
      ) return
      e.preventDefault()
      navigate(href)
    }
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [navigate])
}
