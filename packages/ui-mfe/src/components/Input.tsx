/**
 * Input Component
 * Reusable text input with label and error support
 */

import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <input
          ref={ref}
          className={`
            w-full px-4 py-2 border rounded-lg transition-colors
            ${error ? 'border-red-500 focus:border-red-600' : 'border-gray-300 focus:border-blue-500'}
            focus:outline-none focus:ring-2 focus:ring-offset-0
            ${error ? 'focus:ring-red-200' : 'focus:ring-blue-200'}
            ${className}
          `}
          {...props}
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        {helperText && !error && <p className="text-gray-500 text-sm mt-1">{helperText}</p>}
      </div>
    );
  },
);

Input.displayName = 'Input';
