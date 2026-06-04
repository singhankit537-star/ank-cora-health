import type { InputHTMLAttributes, ReactNode } from 'react'

interface IconInputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon: ReactNode
  trailing?: ReactNode
}

export default function IconInput({ icon, trailing, className = '', ...props }: IconInputProps) {
  return (
    <div className="relative">
      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
        {icon}
      </span>
      <input
        className={`w-full rounded-md border border-gray-300 bg-white py-2.5 pl-10 ${
          trailing ? 'pr-10' : 'pr-4'
        } text-gray-800 shadow-sm placeholder:text-gray-400 focus:border-cora-blue focus:outline-none focus:ring-2 focus:ring-cora-blue/30 ${className}`}
        {...props}
      />
      {trailing && (
        <span className="absolute right-3 top-1/2 -translate-y-1/2">{trailing}</span>
      )}
    </div>
  )
}
