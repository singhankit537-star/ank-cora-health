import { useEffect, useRef, useState } from 'react'

/**
 * Hook to detect when an element enters the viewport using Intersection Observer.
 * Useful for lazy loading content, analytics tracking, and performance optimization.
 *
 * @param {Object} options - Intersection Observer options
 * @param {number} options.threshold - Visibility threshold (0-1, default 0.1)
 * @param {string} options.rootMargin - Margin around root (default '0px')
 * @param {boolean} options.once - Stop observing after first intersection (default true)
 * @returns {[React.RefObject, boolean]} - ref to attach to element and isVisible state
 */
export function useIntersectionObserver({
  threshold = 0.1,
  rootMargin = '0px',
  once = true,
} = {}) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const [hasBeenVisible, setHasBeenVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          setHasBeenVisible(true)
          if (once) {
            observer.unobserve(entry.target)
          }
        } else if (!once) {
          setIsVisible(false)
        }
      },
      {
        threshold,
        rootMargin,
      }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [threshold, rootMargin, once])

  // Return true if currently visible OR has been visible before (for smooth transitions)
  return [ref, once ? hasBeenVisible : isVisible]
}
