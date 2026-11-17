import { useState, type FormEvent } from 'react';
import type { ProviderId } from './payout.contract';
import { ProviderSelector } from './ProviderSelector';

export function PayoutForm() {
  const [provider, setProvider] = useState<ProviderId>('A');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <form className="payout-form" onSubmit={handleSubmit} noValidate>
      <ProviderSelector value={provider} onChange={setProvider} />
    </form>
  );
}
