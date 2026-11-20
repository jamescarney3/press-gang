import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@mui/material/styles';
import theme from '~/styles/mui-theme';

const queryClient = new QueryClient();
import LoginPage from '~/pages/login-page';
import HomePage from '~/pages/home-page';
import JobApplicationsNew from '~/pages/job-applications/new';
import JobApplicationsShowPage from '~/pages/job-applications/show';
import AuthContainer from '~/components/auth-container';
import NavBar from '~/components/nav-bar';

function App() {
  const authRoutes = (
    <AuthContainer>
      <NavBar />
      <Routes>
        <Route path="/"></Route>
        <Route index element={<HomePage />} />
        <Route path="job-applications">
          <Route path="new" element={<JobApplicationsNew />} />
          <Route path=":id" element={<JobApplicationsShowPage />} />
        </Route>
      </Routes>
    </AuthContainer>
  );

  return (
    <ThemeProvider theme={theme} defaultMode="system" storageManager={null}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="*" element={authRoutes} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
