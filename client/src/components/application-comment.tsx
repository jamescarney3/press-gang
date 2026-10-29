import type { Comment, JobApplication } from '~/types';

import styles from '~/styles/components/application-comment.module.css';
import { useDeleteJobApplicationComment } from '~/services/queries';

interface ApplicationCommentProps {
  comment: Comment;
  application: JobApplication;
}

const ApplicationComment = (props: ApplicationCommentProps) => {
  const { application, comment } = props;

  const deleteApplicationCommentMutation = useDeleteJobApplicationComment(application.id, comment.id);

  const onClickDeleteButton = () => {
    deleteApplicationCommentMutation.mutate();
  };

  return (
    <div className={styles.comment}>
      <span className={styles.commentDate}>{comment.createdAtYmd}</span>
      <button className={[styles.commentButton, 'btn-unstyled'].join(' ')} onClick={onClickDeleteButton}>
        ✕
      </button>
      <div className={styles.commentText}>{comment.text}</div>
    </div>
  );
};

export default ApplicationComment;
