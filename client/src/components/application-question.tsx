import type { Question, JobApplication } from '~/types';

import styles from '~/styles/components/application-question.module.css';
import { useDeleteJobApplicationComment } from '~/services/queries';

interface ApplicationQuestionProps {
  question: Question;
  application: JobApplication;
}

const ApplicationComment = (props: ApplicationQuestionProps) => {
  const { application, question } = props;

  const deleteApplicationCommentMutation = useDeleteJobApplicationComment(application.id, question.id);

  const onClickDeleteButton = () => {
    deleteApplicationCommentMutation.mutate();
  };

  return (
    <div className={styles.question}>
      <span className={styles.questionDate}>{question.createdAtYmd}</span>
      <button className={[styles.questionButton, 'btn-unstyled'].join(' ')} onClick={onClickDeleteButton}>
        ✕
      </button>
      <h3 className={styles.questionHeading}>Prompt:</h3>
      <p className={styles.questionPrompt}>{question.prompt}</p>
      <h3 className={styles.questionHeading}>Answer:</h3>
      <p className={styles.questionAnswer}>{question.answer}</p>
    </div>
  );
};

export default ApplicationComment;
