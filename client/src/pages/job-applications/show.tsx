import { useParams } from 'react-router-dom';

import { useGetJobApplication, useUpdateJobApplication } from '~/services/queries';
import PageContainer from '~/components/page-container';
import ApplicationStatusSelect from '~/components/application-status-select';
import ApplicationHeading from '~/components/application-heading';
import ApplicationComment from '~/components/application-comment';
import ApplicationCommentForm from '~/components/application-comment-form';
import { sortCommentsDescending } from '~/utils/sorting';
import type { JobApplication, Comment } from '~/types';

const JobApplicationsShowPage = () => {
  const { id } = useParams();

  const { isPending, isError, data: jobApplication } = useGetJobApplication(Number(id));

  const updateJobApplicationMutation = useUpdateJobApplication(Number(id));

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
      <section>
        <ApplicationCommentForm commentableId={jobApplication.id} />
        {sortCommentsDescending(jobApplication.comments).map((comment: Comment) => (
          <ApplicationComment application={jobApplication} comment={comment} key={`comment-${comment.id}`} />
        ))}
      </section>
    </PageContainer>
  );
};

export default JobApplicationsShowPage;
