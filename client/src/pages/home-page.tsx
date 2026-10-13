import ApplicationsList from '~/components/applications-list';
import { useGetJobApplications, useGetCompanies } from '~/services/queries';
import type { JobApplication, Company } from '~/types';

const useHomePageState = () => {
  const jobApplicationsQuery = useGetJobApplications();
  const companiesQuery = useGetCompanies();

  const isPending = [jobApplicationsQuery.isPending, companiesQuery.isPending].some(Boolean);

  const errors = [jobApplicationsQuery.error, companiesQuery.error];
  const isError = errors.some(Boolean);

  const jobApplicationsData = jobApplicationsQuery.data || [];
  const companiesData = companiesQuery.data || [];

  const jobApplications = jobApplicationsData.map((jobApplication: JobApplication) => {
    const company = companiesData.find((current: Company) => current.id === jobApplication.companyId);
    return { ...jobApplication, company };
  });

  return { isPending, isError, data: jobApplications };
};

const HomePage = () => {
  const { isPending, isError, data } = useHomePageState();

  if (isPending) return <div>loading</div>;
  if (isError) return <div>page error</div>;
  return (
    <section>
      <h1>Job Applications</h1>
      <ApplicationsList jobApplications={data} />
    </section>
  );
};

export default HomePage;
