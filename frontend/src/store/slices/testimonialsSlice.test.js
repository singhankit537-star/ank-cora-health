import { describe, expect, it } from 'vitest'
import testimonialsReducer, {
  nextTestimonial,
  prevTestimonial,
  setActiveIndex,
} from './testimonialsSlice'

describe('testimonialsSlice', () => {
  const total = 4

  it('sets active index', () => {
    const state = testimonialsReducer(undefined, setActiveIndex(2))
    expect(state.activeIndex).toBe(2)
  })

  it('cycles forward with nextTestimonial', () => {
    let state = testimonialsReducer({ activeIndex: 3 }, nextTestimonial(total))
    expect(state.activeIndex).toBe(0)
  })

  it('cycles backward with prevTestimonial', () => {
    let state = testimonialsReducer({ activeIndex: 0 }, prevTestimonial(total))
    expect(state.activeIndex).toBe(3)
  })
})
