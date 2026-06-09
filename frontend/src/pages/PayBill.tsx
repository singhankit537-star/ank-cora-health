/**
 * Pay bill route — hosts @ank-cora/pay-bill-mfe landing page
 */

import React, { useEffect, useState } from 'react';
import { PayBillPage } from '@ank-cora/pay-bill-mfe';
import type { PaymentPortal } from '@ank-cora/sdk';
import { withErrorBoundary } from '@hocs/withErrorBoundary';
import { coraSdk } from '@/sdk';

function PayBillRouteContent() {
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
    <div>
      {error && (
        <div className="bg-red-50 px-4 py-3 text-center text-sm text-red-700" role="alert">
          {error}
        </div>
      )}
      <PayBillPage portals={portals} onPortalSelect={handlePortalSelect} />
    </div>
  );
}

const PayBillRoute = withErrorBoundary(PayBillRouteContent);

export default PayBillRoute;
