import { useRef } from 'react';
import type { SubmitEventHandler } from 'react';

import { useCreateJobApplicationComment } from '~/services/queries';

import styles from '~/styles/components/application-comment-form.module.css';

interface CommentFormProps {
  commentableId: number;
}

const ApplicationCommentForm = (props: CommentFormProps) => {
  const { commentableId } = props;

  const textControlRef = useRef<HTMLTextAreaElement>(null);

  const resetTextControl = () => {
    const textControl = textControlRef.current;
    textControl!.value = '';
  };

  const createCommentMutation = useCreateJobApplicationComment(commentableId, { onSuccess: resetTextControl });

  const submitForm: SubmitEventHandler = (e) => {
    e.preventDefault();
    const text = new FormData(e.target).get('text') as string;
    createCommentMutation.mutate({ text });
  };

  return (
    <form onSubmit={submitForm}>
      <h2>New comment</h2>
      <textarea ref={textControlRef} name="text" placeholder="Comment" rows={1} className={styles.textInput}></textarea>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default ApplicationCommentForm;
