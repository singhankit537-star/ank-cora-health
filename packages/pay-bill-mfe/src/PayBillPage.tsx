import type { PaymentPortal } from '@ank-cora/sdk';
import {
  Container,
  PaymentOptionSection,
  PaymentPortalButton,
  SectionRule,
  TriangleAccent,
} from '@ank-cora/ui-mfe';

export interface PayBillPageProps {
  portals?: PaymentPortal[];
  onPortalSelect?: (portal: PaymentPortal) => void;
}

const DEFAULT_PORTALS: PaymentPortal[] = [
  {
    id: 'patient',
    type: 'patient',
    label: 'Patient Payment Portal',
    description: 'If you are a patient making a payment, please click below.',
    url: '#',
  },
  {
    id: 'attorney',
    type: 'attorney',
    label: 'Attorney Payment Portal',
    description: 'If you are an attorney making a payment, please click below.',
    url: '#',
  },
];

export function PayBillPage({ portals, onPortalSelect }: PayBillPageProps) {
  const displayPortals = portals && portals.length > 0 ? portals : DEFAULT_PORTALS;
  const handleSelect = (portal: PaymentPortal) => {
    onPortalSelect?.(portal);
    if (!onPortalSelect && portal.url && portal.url !== '#') {
      window.open(portal.url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <>
      <section className="bg-white py-16 lg:py-24">
        <Container size="md">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-cora-navy sm:text-4xl lg:text-5xl">
              Payment Portals
            </h1>
            <h2 className="mt-4 text-xl text-cora-gray sm:text-2xl">
              Please select from the options below.
            </h2>
          </div>

          <div className="mx-auto mt-12 max-w-3xl">
            {displayPortals.map((portal, index) => (
              <div key={portal.id}>
                {index > 0 && <SectionRule />}
                <PaymentOptionSection description={portal.description}>
                  <PaymentPortalButton
                    href={onPortalSelect ? undefined : portal.url}
                    onClick={onPortalSelect ? () => handleSelect(portal) : undefined}
                  >
                    {portal.label}
                  </PaymentPortalButton>
                </PaymentOptionSection>
              </div>
            ))}

            <SectionRule />

            <p className="py-10 text-center text-lg font-medium text-cora-navy">
              Thank you for choosing CORA Physical Therapy.
            </p>
          </div>
        </Container>
      </section>

      <TriangleAccent />
    </>
  );
}

PayBillPage.displayName = 'PayBillPage';
