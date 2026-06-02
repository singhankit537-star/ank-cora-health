import { useEffect, useRef, useState, type RefObject } from 'react'

export interface UseIntersectionObserverOptions {
  /** Visibility threshold (0-1, default 0.1) */
  threshold?: number
  /** Margin around root (default '0px') */
  rootMargin?: string
  /** Stop observing after first intersection (default true) */
  once?: boolean
}

/**
 * Hook to detect when an element enters the viewport using Intersection Observer.
 * Useful for lazy loading content, analytics tracking, and performance optimization.
 *
 * Returns a ref to attach to the element and the `isVisible` state.
 */
export function useIntersectionObserver<T extends Element = HTMLDivElement>({
  threshold = 0.1,
  rootMargin = '0px',
  once = true,
}: UseIntersectionObserverOptions = {}): [RefObject<T | null>, boolean] {
  const ref = useRef<T>(null)
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

    const element = ref.current
    if (element) {
      observer.observe(element)
    }

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [threshold, rootMargin, once])

  // Return true if currently visible OR has been visible before (for smooth transitions)
  return [ref, once ? hasBeenVisible : isVisible]
}
