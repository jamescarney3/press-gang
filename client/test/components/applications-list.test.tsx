import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';

import ApplicationsList from '~/components/applications-list';
import type { JobApplication } from '~/types';

vi.mock('react-router-dom');

describe('ApplicationList component', () => {
  it('renders without crashing', () => {
    const jobApplications = [{}] as JobApplication[];
    const container = render(<ApplicationsList jobApplications={jobApplications} />);
    expect(container).toBeDefined();
  });
});
