import { Button } from '@mui/material';

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
      <Button className={styles.commentButton} onClick={onClickDeleteButton}>
        ✕
      </Button>
      <div className={styles.commentText}>{comment.text}</div>
    </div>
  );
};

export default ApplicationComment;
