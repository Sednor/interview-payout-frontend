import type { ComponentProps } from 'react';

export interface ButtonProps extends ComponentProps<'button'> {
  variant?: 'primary' | 'secondary';
}

export function Button({
  variant = 'primary',
  type = 'button',
  className,
  ...buttonProps
}: ButtonProps) {
  return (
    <button
      {...buttonProps}
      type={type}
      className={['button', `button-${variant}`, className]
        .filter(Boolean)
        .join(' ')}
    />
  );
}
