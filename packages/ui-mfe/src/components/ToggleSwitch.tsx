import React from 'react';

export interface ToggleSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  id?: string;
}

export function ToggleSwitch({ checked, onChange, label, id }: ToggleSwitchProps) {
  const switchId = id ?? label.replace(/\s+/g, '-').toLowerCase();

  return (
    <div className="flex items-center gap-3 pt-1">
      <button
        type="button"
        id={switchId}
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors ${
          checked ? 'bg-lime-500' : 'bg-gray-300'
        }`}
      >
        <span
          className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${
            checked ? 'translate-x-5' : 'translate-x-0.5'
          }`}
        />
      </button>
      <label htmlFor={switchId} className="cursor-pointer text-sm font-medium text-cora-navy">
        {label}
      </label>
    </div>
  );
}

ToggleSwitch.displayName = 'ToggleSwitch';
