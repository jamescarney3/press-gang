import { useRef, useState } from 'react';
import { Button, TextField } from '@mui/material';
import type { SubmitEventHandler } from 'react';

import { useCreateJobApplicationQuestion } from '~/services/queries';

const COLLAPSE_TIMEOUT = 500;

interface QuestionFormProps {
  jobApplicationId: number;
}

const ApplicationQuestionForm = (props: QuestionFormProps) => {
  const { jobApplicationId } = props;

  const promptTextControlRef = useRef<HTMLTextAreaElement>(null);
  const answerTextControlRef = useRef<HTMLTextAreaElement>(null);

  const [promptFieldFocused, setPromptFieldFocused] = useState(false);
  const [commentPrompt, setCommentPrompt] = useState('');
  const [answerFieldFocused, setAnswerFieldFocused] = useState(false);
  const [commentAnswer, setCommentAnswer] = useState('');

  const resetTextControl = () => {
    const promptTextControl = promptTextControlRef.current;
    const answerTextControl = answerTextControlRef.current;
    promptTextControl!.value = '';
    answerTextControl!.value = '';
  };

  const createCommentMutation = useCreateJobApplicationQuestion(jobApplicationId, { onSuccess: resetTextControl });

  const submitForm: SubmitEventHandler = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const prompt = formData.get('prompt') as string;
    const answer = formData.get('answer') as string;
    createCommentMutation.mutate({ prompt, answer });
  };

  return (
    <form onSubmit={submitForm}>
      <h2>New question</h2>
      <TextField
        name="prompt"
        type="text"
        label="Prompt"
        value={commentPrompt}
        onChange={(e) => setCommentPrompt(e.target.value)}
        onFocus={() => setPromptFieldFocused(true)}
        onBlur={() => setTimeout(() => setPromptFieldFocused(false), COLLAPSE_TIMEOUT)}
        minRows={promptFieldFocused ? 5 : 1}
        multiline
        margin="normal"
        fullWidth
      />
      <TextField
        name="answer"
        type="text"
        label="Answer"
        value={commentAnswer}
        onChange={(e) => setCommentAnswer(e.target.value)}
        onFocus={() => setAnswerFieldFocused(true)}
        onBlur={() => setTimeout(() => setAnswerFieldFocused(false), COLLAPSE_TIMEOUT)}
        minRows={answerFieldFocused ? 5 : 1}
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

export default ApplicationQuestionForm;
