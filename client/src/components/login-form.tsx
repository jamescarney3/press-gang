import type { SubmitEventHandler } from 'react';

interface LoginFormProps {
  onSubmit: SubmitEventHandler;
}

const LoginForm = (props: LoginFormProps) => {
  return (
    <form onSubmit={props.onSubmit}>
      <label>
        <span>Email address</span>
        <br />
        <input name="emailAddress" />
      </label>
      <br />
      <label>
        <span>Password</span>
        <br />
        <input name="password" />
      </label>
      <br />
      <button type="submit">Log in</button>
    </form>
  );
};

export default LoginForm;
