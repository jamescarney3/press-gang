import type { ReactNode } from 'react';
import type { JobApplication } from '~/types';

interface ApplicationStatusSelectProps {
  value?: string | number;
  onChange?: (value: JobApplication['status']) => void;
  children?: ReactNode;
}

const ApplicationStatusSelect = ({ onChange }: ApplicationStatusSelectProps) => {
  return (
    <form>
      <select onChange={(e) => onChange?.(e.target.value as JobApplication['status'])} value="">
        <option value="">Update status</option>
        <option value="applied">applied</option>
        <option value="in_progress">in progress</option>
        <option value="stale">stale</option>
        <option value="rejected">rejected</option>
        <option value="offered">offered</option>
        <option value="declined">declined</option>
      </select>
    </form>
  );
};

export default ApplicationStatusSelect;
