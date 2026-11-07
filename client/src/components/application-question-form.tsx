import { useRef } from 'react';
import type { SubmitEventHandler } from 'react';

import { useCreateJobApplicationQuestion } from '~/services/queries';

import styles from '~/styles/components/application-question-form.module.css';

interface QuestionFormProps {
  jobApplicationId: number;
}

const ApplicationQuestionForm = (props: QuestionFormProps) => {
  const { jobApplicationId } = props;

  const promptTextControlRef = useRef<HTMLTextAreaElement>(null);
  const answerTextControlRef = useRef<HTMLTextAreaElement>(null);

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
      <textarea
        ref={promptTextControlRef}
        name="prompt"
        placeholder="Prompt"
        rows={1}
        className={styles.promptInput}
      ></textarea>
      <label>
        <span>Answer</span>
        <textarea
          ref={answerTextControlRef}
          name="answer"
          placeholder="Answer"
          rows={1}
          className={styles.answerInput}
        ></textarea>
      </label>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default ApplicationQuestionForm;
