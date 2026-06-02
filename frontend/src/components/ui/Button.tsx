/**
 * Button Component
 * Reusable button with multiple variants
 */

import React, { ReactNode } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  fullWidth?: boolean;
}

const variantClasses = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800',
  secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 active:bg-gray-400',
  outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50 active:bg-blue-100',
  danger: 'bg-red-600 text-white hover:bg-red-700 active:bg-red-800',
};

const sizeClasses = {
  sm: 'px-3 py-2 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      fullWidth = false,
      disabled = false,
      className = '',
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        className={`
          inline-flex items-center justify-center font-semibold rounded-lg transition-colors duration-200
          ${variantClasses[variant]}
          ${sizeClasses[size]}
          ${fullWidth ? 'w-full' : ''}
          ${disabled || isLoading ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}
          ${className}
        `}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && <span className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent" />}
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';
