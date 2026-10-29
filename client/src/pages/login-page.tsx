import type { SubmitEventHandler } from 'react';
import { Navigate } from 'react-router-dom';

import { useCreateSession, useGetSession } from '~/services/queries';
import LoginForm from '~/components/login-form';

const LoginPage = () => {
  const sessionQuery = useGetSession();
  const sessionMutation = useCreateSession();

  const onSubmitLoginForm: SubmitEventHandler = (e) => {
    e.preventDefault();
    const credentials = Object.fromEntries(new FormData(e.target).entries()) as {
      emailAddress: string;
      password: string;
    };
    sessionMutation.mutate(credentials);
  };

  if (sessionQuery.isPending) return 'Pending...';
  if (sessionQuery.error) return 'Error: ' + sessionQuery.error.message;
  if (sessionQuery.data) return <Navigate to="/" />;
  return (
    <section>
      <h1>Log in</h1>
      <LoginForm onSubmit={onSubmitLoginForm} />
    </section>
  );
};

export default LoginPage;
