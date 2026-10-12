import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';

import NavBar from '~/components/nav-bar';

vi.mock('react-router-dom');

describe('NavBar component', () => {
  it('renders without crashing', () => {
    const container = render(<NavBar />);
    expect(container).toBeDefined();
  });
});
