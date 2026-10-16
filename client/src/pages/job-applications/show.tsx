import { useParams } from 'react-router-dom';

import { useGetJobApplication, useUpdateJobApplication } from '~/services/queries';
import PageContainer from '~/components/page-container';
import ApplicationStatusSelect from '~/components/application-status-select';
import ApplicationHeading from '~/components/application-heading';
import type { JobApplication } from '~/types';

const JobApplicationsShowPage = () => {
  const { id } = useParams();

  const { isPending, isError, data: jobApplication } = useGetJobApplication(id!);

  const updateJobApplicationMutation = useUpdateJobApplication(id!);

  const updateJobApplicationStatus = (status: JobApplication['status']) => {
    updateJobApplicationMutation.mutate({ status } as Record<string, unknown>);
  };

  if (isPending) return <div>Loading</div>;
  if (isError) return <div>Error</div>;
  return (
    <PageContainer>
      <ApplicationHeading jobApplication={jobApplication} />
      <section>
        <ApplicationStatusSelect onChange={(value: JobApplication['status']) => updateJobApplicationStatus(value)} />
        <div>Applied {jobApplication.appliedDate}</div>
      </section>
    </PageContainer>
  );
};

export default JobApplicationsShowPage;
