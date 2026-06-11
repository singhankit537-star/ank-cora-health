import { useQuery } from '@tanstack/react-query'
import { getTherapies } from '@/services/mockApi'

// Fetches the public therapy catalogue via React Query. Components read
// `data`, `isLoading`, and `isError` — no Redux wiring needed here since this
// is read-only public data.
export function useTherapies() {
  return useQuery({
    queryKey: ['therapies'],
    queryFn: getTherapies,
  })
}
