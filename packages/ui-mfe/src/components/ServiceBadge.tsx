import React, { ReactNode } from 'react';

export interface ServiceBadgeProps {
  label: string;
  icon: ReactNode;
}

export function ServiceBadge({ label, icon }: ServiceBadgeProps) {
  return (
    <li className="flex flex-col items-center gap-2 text-center">
      <span className="grid h-12 w-12 place-items-center rounded-full border border-white/40 text-white">
        {icon}
      </span>
      <span className="max-w-24 text-xs font-semibold text-white">{label}</span>
    </li>
  );
}

ServiceBadge.displayName = 'ServiceBadge';
