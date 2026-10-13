import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';

import LoginForm from '~/components/login-form';

describe('LoginForm component', () => {
  it('renders without crashing', () => {
    const submitForm = vi.fn();
    const container = render(<LoginForm onSubmit={submitForm} />);
    expect(container).toBeDefined();
  });
});
