import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { LinearProgress } from '@mui/material';

import { useGetSession } from '~/services/queries';
import PageContainer from './page-container';

const AuthContainer = ({ children }: { children: ReactNode }) => {
  const sessionQuery = useGetSession();

  if (sessionQuery.isPending)
    return (
      <PageContainer>
        <LinearProgress />
      </PageContainer>
    );
  if (sessionQuery.error) return 'Error: ' + sessionQuery.error.message;
  if (!sessionQuery.data) return <Navigate to="/login" />;
  return children;
};

export default AuthContainer;
