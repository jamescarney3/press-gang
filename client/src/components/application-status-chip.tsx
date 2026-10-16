import { type JobApplication } from '~/types';

import styles from '~/styles/components/application-status-chip.module.css';

const statusStyles = {
  applied: styles.applied,
  rejected: styles.rejected,
  stale: styles.stale,
  in_progress: styles.inProgress,
  offered: styles.offered,
  declined: styles.declined,
};

const statusNames = {
  applied: 'applied',
  rejected: 'rejected',
  stale: 'stale',
  in_progress: 'in progress',
  offered: 'offered',
  declined: 'declined',
};

interface ApplicationStatusChipProps {
  status: JobApplication['status'];
  className?: string;
}

const ApplicationStatusChip = (props: ApplicationStatusChipProps) => {
  const chipClass = [styles.chip, statusStyles[props.status], props.className].join(' ');

  return <div className={chipClass}>{statusNames[props.status]}</div>;
};

export default ApplicationStatusChip;
