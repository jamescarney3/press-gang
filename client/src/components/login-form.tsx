import type { SubmitEventHandler } from 'react';
import { Button, TextField } from '@mui/material';

interface LoginFormProps {
  onSubmit: SubmitEventHandler;
}

const LoginForm = (props: LoginFormProps) => {
  return (
    <form onSubmit={props.onSubmit} autoComplete="off">
      <TextField name="emailAddress" type="email" label="Email address" autoComplete="off" margin="normal" />
      <TextField name="password" type="password" label="Password" autoComplete="off" margin="normal" />
      <Button type="submit" variant="contained" color="primary" size="large" sx={{ mt: 4 }}>
        Log in
      </Button>
    </form>
  );
};

export default LoginForm;
