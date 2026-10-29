import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

import { useGetSession } from '~/services/queries';

const AuthContainer = ({ children }: { children: ReactNode }) => {
  const sessionQuery = useGetSession();

  if (sessionQuery.isPending) return 'Pending...';
  if (sessionQuery.error) return 'Error: ' + sessionQuery.error.message;
  if (!sessionQuery.data) return <Navigate to="/login" />;
  return children;
};

export default AuthContainer;
