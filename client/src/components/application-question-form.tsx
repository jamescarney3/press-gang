import { useRef } from 'react';
import type { SubmitEventHandler } from 'react';

import { useCreateJobApplicationQuestion } from '~/services/queries';

interface QuestionFormProps {
  commentableId: number;
}

const ApplicationQuestionForm = (props: QuestionFormProps) => {
  const { commentableId } = props;

  const textControlRef = useRef<HTMLTextAreaElement>(null);

  const resetTextControl = () => {
    const textControl = textControlRef.current;
    textControl!.value = '';
  };

  const createCommentMutation = useCreateJobApplicationQuestion(commentableId, { onSuccess: resetTextControl });

  const submitForm: SubmitEventHandler = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const prompt = formData.get('text') as string;
    const answer = formData.get('text') as string;
    createCommentMutation.mutate({ prompt, answer });
  };

  return (
    <form onSubmit={submitForm}>
      <h2>New question</h2>
      <textarea ref={textControlRef} name="prompt" rows={5}></textarea>
      <textarea ref={textControlRef} name="answer" rows={5}></textarea>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default ApplicationQuestionForm;
