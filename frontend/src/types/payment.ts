// Shared router-state contract used when a "Buy" action on the therapy list
// hands a chosen plan to the Pay Bill form to prefill it.
// Description ← therapy plan name, Amount ← therapy plan amount.
export interface BuyTherapyState {
  description: string
  amount: number
}
