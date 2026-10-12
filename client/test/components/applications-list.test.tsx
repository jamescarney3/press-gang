import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';

import ApplicationsList from '~/components/applications-list';
import type { JobApplication } from '~/types';

describe('ApplicationList component', () => {
  it('renders without crashing', () => {
    const jobApplications = [{}] as JobApplication[];
    const container = render(<ApplicationsList jobApplications={jobApplications} />);
    expect(container).toBeDefined();
  });
});
