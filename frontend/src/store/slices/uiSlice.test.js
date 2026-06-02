import { describe, expect, it } from 'vitest'
import uiReducer, { dismissAnnouncement, showAnnouncement } from './uiSlice'

describe('uiSlice', () => {
  it('dismisses and shows announcement bar', () => {
    let state = uiReducer(undefined, dismissAnnouncement())
    expect(state.announcementVisible).toBe(false)

    state = uiReducer(state, showAnnouncement())
    expect(state.announcementVisible).toBe(true)
  })
})
