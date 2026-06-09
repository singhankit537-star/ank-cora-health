import React, { ReactNode } from 'react';

export interface SearchSubmitButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  icon?: ReactNode;
}

export function SearchSubmitButton({
  children,
  icon,
  className = '',
  ...props
}: SearchSubmitButtonProps) {
  return (
    <button
      type="submit"
      className={`
        flex w-full items-center justify-center gap-2 rounded-md bg-lime-500 px-6 py-3
        font-semibold text-cora-navy transition-colors hover:bg-lime-600
        ${className}
      `}
      {...props}
    >
      {icon}
      {children}
    </button>
  );
}

SearchSubmitButton.displayName = 'SearchSubmitButton';
