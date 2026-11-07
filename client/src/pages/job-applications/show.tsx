import { useParams } from 'react-router-dom';

import { useGetJobApplication, useUpdateJobApplication } from '~/services/queries';
import PageContainer from '~/components/page-container';
import ApplicationStatusSelect from '~/components/application-status-select';
import ApplicationHeading from '~/components/application-heading';
import ApplicationComment from '~/components/application-comment';
import ApplicationQuestion from '~/components/application-question';
import ApplicationCommentForm from '~/components/application-comment-form';
import { sortCommentsDescending } from '~/utils/sorting';
import type { JobApplication, Comment, Question } from '~/types';
import ApplicationQuestionForm from '~/components/application-question-form';

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
      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'auto auto',
          columnGap: 'var(--spacing-4)',
          rowGap: 'var(--spacing-4)',
        }}
      >
        <ApplicationCommentForm commentableId={jobApplication.id} />
        <ApplicationQuestionForm jobApplicationId={jobApplication.id} />
        <div>
          <h2>Comments</h2>
          {sortCommentsDescending(jobApplication.comments).map((comment: Comment) => (
            <ApplicationComment application={jobApplication} comment={comment} key={`comment-${comment.id}`} />
          ))}
        </div>
        <div>
          <h2>Questions and Answers</h2>
          {jobApplication.questions.map((question: Question) => (
            <ApplicationQuestion application={jobApplication} question={question} key={`comment-${question.id}`} />
          ))}
        </div>
      </section>
    </PageContainer>
  );
};

export default JobApplicationsShowPage;
