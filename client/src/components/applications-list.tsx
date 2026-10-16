import { Link } from 'react-router-dom';

import ApplicationStatusChip from '~/components/application-status-chip';
import type { JobApplication, Company } from '~/types';
import styles from '~/styles/components/applications-list.module.css';

interface ApplicationsListProps {
  jobApplications: JobApplication[];
}

const renderApplication = (jobApplication: JobApplication & { company: Company }) => (
  <Link to={`job-applications/${jobApplication.id}`} key={`application-${jobApplication.id}`} className={styles.link}>
    <li className={styles.applicationsListItem}>
      <span>{jobApplication.company?.name}</span>
      <span>{jobApplication.roleTitle}</span>
      <span>
        <ApplicationStatusChip status={jobApplication.status} />
      </span>
    </li>
  </Link>
);

const ApplicationsList = ({ jobApplications = [] }: ApplicationsListProps) => {
  return <ul className={styles.applicationList}>{jobApplications.map(renderApplication)}</ul>;
};

export default ApplicationsList;
