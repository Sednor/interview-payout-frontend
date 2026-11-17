import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { TextField } from './TextField';

describe('TextField', () => {
  it('accepts input and exposes its error message to assistive technology', async () => {
    const user = userEvent.setup();
    render(<TextField label="Reference" error="Required" />);

    const input = screen.getByLabelText('Reference');
    await user.type(input, 'INV-1');

    expect(input).toHaveValue('INV-1');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAccessibleDescription('Required');
  });
});
