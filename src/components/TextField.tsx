import { useId, type ComponentProps } from 'react';

export interface TextFieldProps extends ComponentProps<'input'> {
  label: string;
  /** Validation message shown under the input. Marks the input as invalid. */
  error?: string;
  hint?: string;
}

/** Labelled input. Accepts every native <input> prop, including `ref`, so it works controlled or uncontrolled. */
export function TextField({
  label,
  error,
  hint,
  id,
  className,
  ...inputProps
}: TextFieldProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const hintId = hint ? `${inputId}-hint` : undefined;
  const errorId = error ? `${inputId}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined;

  return (
    <div className={['field', className].filter(Boolean).join(' ')}>
      <label htmlFor={inputId}>{label}</label>
      <input
        {...inputProps}
        id={inputId}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
      />
      {hint && (
        <p id={hintId} className="field-hint">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className="field-error">
          {error}
        </p>
      )}
    </div>
  );
}
