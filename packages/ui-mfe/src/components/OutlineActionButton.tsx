import React, { ReactNode } from 'react';

export interface OutlineActionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  fullWidth?: boolean;
}

export function OutlineActionButton({
  children,
  fullWidth = true,
  type = 'button',
  className = '',
  ...props
}: OutlineActionButtonProps) {
  return (
    <button
      type={type}
      className={`
        rounded-md border border-cora-blue bg-white px-6 py-3 font-semibold text-cora-blue
        transition-colors hover:bg-cora-sky
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}

OutlineActionButton.displayName = 'OutlineActionButton';
