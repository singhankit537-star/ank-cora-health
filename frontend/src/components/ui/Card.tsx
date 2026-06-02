/**
 * Card Component
 * Reusable container with shadow and padding
 */

import React, { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className = '', hoverable = false }) => {
  return (
    <div
      className={`
        bg-white rounded-lg shadow-md p-6
        ${hoverable ? 'hover:shadow-lg transition-shadow duration-200 cursor-pointer' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

Card.displayName = 'Card';
