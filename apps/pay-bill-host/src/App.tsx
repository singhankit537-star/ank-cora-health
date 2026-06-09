import { useEffect, useState } from 'react';
import { PayBillPage } from '@ank-cora/pay-bill-mfe';
import type { PaymentPortal } from '@ank-cora/sdk';
import { coraSdk } from './sdk';

export default function App() {
  const [portals, setPortals] = useState<PaymentPortal[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    coraSdk.payments
      .getPortals()
      .then(setPortals)
      .catch((err) => setError(err instanceof Error ? err.message : 'Failed to load portals'));
  }, []);

  const handlePortalSelect = (portal: PaymentPortal) => {
    window.open(portal.url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-200 bg-white px-4 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <span className="text-xl font-bold text-cora-blue">CORA Health</span>
          <span className="text-sm text-cora-gray">Pay Bill</span>
        </div>
      </header>

      {error && (
        <div className="bg-red-50 px-4 py-3 text-center text-sm text-red-700" role="alert">
          {error}
        </div>
      )}

      <PayBillPage portals={portals} onPortalSelect={handlePortalSelect} />
    </div>
  );
}
