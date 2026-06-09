/**
 * Routes to integrated /pay-bill or external standalone host (VITE_PAY_BILL_URL).
 */
export function goToPayBill(navigate: (path: string) => void): void {
  const external = import.meta.env.VITE_PAY_BILL_URL;
  if (external && external.startsWith('http')) {
    window.location.href = external;
    return;
  }
  navigate('/pay-bill');
}

export function getPayBillUrl(): string {
  return import.meta.env.VITE_PAY_BILL_URL || '/pay-bill';
}
