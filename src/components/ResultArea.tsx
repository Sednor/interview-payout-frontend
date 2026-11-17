import type { ReactNode } from 'react';

export type ResultTone = 'neutral' | 'success' | 'error';

export interface ResultAreaProps {
  tone?: ResultTone;
  title?: string;
  children?: ReactNode;
}

/** Live region for showing the outcome of a request. Screen readers announce changes. */
export function ResultArea({
  tone = 'neutral',
  title,
  children,
}: ResultAreaProps) {
  return (
    <div role="status" className={`result result-${tone}`}>
      {title && <p className="result-title">{title}</p>}
      {children}
    </div>
  );
}
