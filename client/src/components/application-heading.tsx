import ApplicationStatusChip from '~/components/application-status-chip';
import type { JobApplication } from '~/types';

import styles from '~/styles/components/application-heading.module.css';

interface ApplicationHeadingProps {
  jobApplication: JobApplication;
}

const ApplicationHeading = (props: ApplicationHeadingProps) => {
  const { jobApplication } = props;

  return (
    <section className={styles.container}>
      <h1 className={styles.companyName}>
        <a href={jobApplication.company.websiteUrl} target="_blank">
          {jobApplication.company.name}
        </a>
      </h1>
      <h2 className={styles.roleTitle}>
        <a href={jobApplication.listingUrl} target="_blank">
          {jobApplication.roleTitle}
        </a>
      </h2>
      <ApplicationStatusChip status={jobApplication.status} className={styles.status} />
    </section>
  );
};

export default ApplicationHeading;
