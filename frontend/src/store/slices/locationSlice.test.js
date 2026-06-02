import { describe, expect, it } from 'vitest'
import locationReducer, {
  resetLocationSearch,
  searchComplete,
  setQuery,
  setRadius,
  setResultsLimit,
  startSearch,
} from './locationSlice'

describe('locationSlice', () => {
  it('has correct initial state', () => {
    expect(locationReducer(undefined, { type: '@@INIT' })).toEqual({
      query: '',
      radius: '50',
      resultsLimit: '8',
      isSearching: false,
      hasSearched: false,
    })
  })

  it('updates query', () => {
    const state = locationReducer(undefined, setQuery('45806'))
    expect(state.query).toBe('45806')
  })

  it('updates radius and results limit', () => {
    let state = locationReducer(undefined, setRadius('25'))
    state = locationReducer(state, setResultsLimit('25'))
    expect(state.radius).toBe('25')
    expect(state.resultsLimit).toBe('25')
  })

  it('tracks search lifecycle', () => {
    let state = locationReducer(undefined, startSearch())
    expect(state.isSearching).toBe(true)

    state = locationReducer(state, searchComplete())
    expect(state.isSearching).toBe(false)
    expect(state.hasSearched).toBe(true)
  })

  it('resets to initial state', () => {
    let state = locationReducer(undefined, setQuery('Lima'))
    state = locationReducer(state, resetLocationSearch())
    expect(state.query).toBe('')
  })
})
