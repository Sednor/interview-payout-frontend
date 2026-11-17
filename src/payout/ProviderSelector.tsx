import type { ProviderId } from './payout.contract';

const options: { id: ProviderId; label: string; description: string }[] = [
  { id: 'A', label: 'Provider A', description: 'US bank account' },
  { id: 'B', label: 'Provider B', description: 'IBAN account' },
];

export interface ProviderSelectorProps {
  value: ProviderId;
  onChange: (provider: ProviderId) => void;
}

export function ProviderSelector({ value, onChange }: ProviderSelectorProps) {
  return (
    <fieldset className="provider-selector">
      <legend>Provider</legend>
      {options.map(({ id, label, description }) => (
        <label key={id} className="provider-option">
          <input
            type="radio"
            name="provider"
            value={id}
            checked={value === id}
            onChange={() => onChange(id)}
          />
          <span className="provider-label">{label}</span>
          <span className="provider-description">{description}</span>
        </label>
      ))}
    </fieldset>
  );
}
