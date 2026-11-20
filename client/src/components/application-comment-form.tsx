import { useState } from 'react';
import { Button, TextField } from '@mui/material';
import type { SubmitEventHandler } from 'react';

import { useCreateJobApplicationComment } from '~/services/queries';

const COLLAPSE_TIMEOUT = 500;

interface CommentFormProps {
  commentableId: number;
}

const ApplicationCommentForm = (props: CommentFormProps) => {
  const { commentableId } = props;

  const [textFieldFocused, setTextFieldFocused] = useState(false);
  const [commentText, setCommentText] = useState('');

  const resetTextControl = () => {
    setCommentText('');
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
      <TextField
        type="text"
        label="Comment text"
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        onFocus={() => setTextFieldFocused(true)}
        onBlur={() => setTimeout(() => setTextFieldFocused(false), COLLAPSE_TIMEOUT)}
        minRows={textFieldFocused ? 5 : 1}
        name="text"
        multiline
        margin="normal"
        fullWidth
      />
      <Button type="submit" variant="contained" color="primary" size="large" sx={{ mt: 4 }}>
        Submit
      </Button>
    </form>
  );
};

export default ApplicationCommentForm;
