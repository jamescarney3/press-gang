import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();
import LoginPage from '~/pages/login-page';
import HomePage from '~/pages/home-page';
import JobApplicationsNew from '~/pages/job-applications/new';
import JobApplicationsShowPage from '~/pages/job-applications/show';
import AuthContainer from '~/components/auth-container';

function App() {
  const authRoutes = (
    <AuthContainer>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="job-applications">
          <Route path="new" element={<JobApplicationsNew />} />
          <Route path=":id" element={<JobApplicationsShowPage />} />
        </Route>
      </Routes>
    </AuthContainer>
  );

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={authRoutes} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
