import React from 'react';

interface IconProps {
  className?: string;
}

function iconProps(size = 'h-5 w-5', className = '') {
  return {
    className: `${size} ${className}`.trim(),
    fill: 'none' as const,
    viewBox: '0 0 24 24',
    stroke: 'currentColor',
    strokeWidth: 2,
    'aria-hidden': true,
  };
}

export function SearchIcon({ className }: IconProps) {
  return (
    <svg {...iconProps('h-5 w-5', className)}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
      />
    </svg>
  );
}

export function PinIcon({ className }: IconProps) {
  return (
    <svg {...iconProps('h-5 w-5', className)}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 21s7-6.16 7-11a7 7 0 10-14 0c0 4.84 7 11 7 11z"
      />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

export function LocateIcon({ className }: IconProps) {
  return (
    <svg {...iconProps('h-5 w-5', className)}>
      <circle cx="12" cy="12" r="3" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v3M12 19v3M2 12h3M19 12h3" />
    </svg>
  );
}

export function CardIcon({ className }: IconProps) {
  return (
    <svg {...iconProps('h-5 w-5', className)}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path strokeLinecap="round" d="M3 10h18" />
    </svg>
  );
}

export function PhysicalTherapyIcon({ className }: IconProps) {
  return (
    <svg {...iconProps('h-6 w-6', className)}>
      <circle cx="9" cy="5" r="1.6" />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 21l3-6 4 1 3-3M8 15l-1-4 5-1 3 3 3-1"
      />
    </svg>
  );
}

export function OccupationalTherapyIcon({ className }: IconProps) {
  return (
    <svg {...iconProps('h-6 w-6', className)}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7 11V6a2 2 0 114 0v5M11 11V5a2 2 0 114 0v6M15 11V7a2 2 0 114 0v6a6 6 0 01-6 6h-1a6 6 0 01-6-6v-2a2 2 0 114 0"
      />
    </svg>
  );
}

export function SpeechTherapyIcon({ className }: IconProps) {
  return (
    <svg {...iconProps('h-6 w-6', className)}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 5h16v11H8l-4 4V5z" />
    </svg>
  );
}
