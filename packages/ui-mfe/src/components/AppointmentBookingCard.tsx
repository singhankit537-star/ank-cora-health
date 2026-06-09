import React, { ReactNode } from 'react';

export interface AppointmentBookingCardProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export function AppointmentBookingCard({ title, subtitle, children }: AppointmentBookingCardProps) {
  return (
    <div className="rounded-2xl bg-cora-sky p-6 shadow-2xl sm:p-8">
      <h2 className="text-lg font-bold uppercase tracking-wide text-cora-navy">{title}</h2>
      {subtitle && <p className="mt-2 text-sm text-cora-gray">{subtitle}</p>}
      <div className="mt-6">{children}</div>
    </div>
  );
}

AppointmentBookingCard.displayName = 'AppointmentBookingCard';
