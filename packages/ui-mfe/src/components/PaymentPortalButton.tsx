import React, { ReactNode } from 'react';

export interface PaymentPortalButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  href?: string;
}

export function PaymentPortalButton({
  children,
  href,
  className = '',
  onClick,
  ...props
}: PaymentPortalButtonProps) {
  const classes = `
    inline-flex w-full max-w-md items-center justify-center rounded-md
    bg-cora-blue px-8 py-3 text-base font-semibold text-white
    transition-colors hover:bg-cora-navy
    ${className}
  `;

  if (href) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={classes} onClick={onClick} {...props}>
      {children}
    </button>
  );
}

PaymentPortalButton.displayName = 'PaymentPortalButton';
