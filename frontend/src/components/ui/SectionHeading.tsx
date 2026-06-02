/**
 * SectionHeading Component
 * Reusable section heading with optional subtitle
 */

import React from 'react';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
  centered?: boolean;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  title,
  subtitle,
  className = '',
  centered = true,
}) => {
  return (
    <div className={`${centered ? 'text-center' : ''} mb-12 ${className}`}>
      <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{title}</h2>
      {subtitle && <p className="text-lg text-gray-600 max-w-2xl mx-auto">{subtitle}</p>}
    </div>
  );
};

SectionHeading.displayName = 'SectionHeading';
