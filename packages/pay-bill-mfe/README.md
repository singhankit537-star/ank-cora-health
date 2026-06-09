# @ank-cora/pay-bill-mfe

Payment portal landing page modeled after [CORA Pay Bill](https://coraphysicaltherapy.com/pay-bill-landing-page/).

## Usage

```tsx
import { PayBillPage } from '@ank-cora/pay-bill-mfe';
import { coraSdk } from '@/sdk';

const portals = await coraSdk.payments.getPortals();

<PayBillPage
  portals={portals}
  onPortalSelect={(portal) => window.open(portal.url, '_blank')}
/>
```

Mount at `/pay-bill` in the host app or deploy via `apps/pay-bill-host`.
