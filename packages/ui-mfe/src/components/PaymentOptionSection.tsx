import React, { ReactNode } from 'react';

export interface PaymentOptionSectionProps {
  description: string;
  children: ReactNode;
}

export function PaymentOptionSection({ description, children }: PaymentOptionSectionProps) {
  return (
    <div className="py-10 text-center">
      <p className="mx-auto mb-6 max-w-2xl text-lg text-cora-gray">{description}</p>
      <div className="flex justify-center">{children}</div>
    </div>
  );
}

PaymentOptionSection.displayName = 'PaymentOptionSection';
