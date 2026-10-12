import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, cleanup } from '@testing-library/react';

import AuthContainer from '~/components/auth-container';
import { useGetSession } from '~/services/queries';

vi.mock('react-router-dom');
vi.mock('~/services/queries');

type SessionReturnValue = ReturnType<typeof useGetSession>;

describe('AuthContainer component', () => {
  afterEach(cleanup);

  it('renders in pending state', () => {
    vi.mocked(useGetSession).mockReturnValue({ isPending: true } as SessionReturnValue);

    const container = render(<AuthContainer>auth content</AuthContainer>);
    expect(container).toBeDefined();
  });

  it('renders in error state', () => {
    vi.mocked(useGetSession).mockReturnValue({
      isError: true,
      error: { message: 'query failed' },
    } as SessionReturnValue);

    const container = render(<AuthContainer>auth content</AuthContainer>);
    expect(container).toBeDefined();
  });

  it('renders in authenticated state', () => {
    vi.mocked(useGetSession).mockReturnValue({ data: true } as SessionReturnValue);

    const container = render(<AuthContainer>auth content</AuthContainer>);
    expect(container).toBeDefined();
  });
});
