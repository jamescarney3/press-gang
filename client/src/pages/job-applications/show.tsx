import { useParams } from 'react-router-dom';
import { useGetJobApplication } from '~/services/queries';

const JobApplicationsShowPage = () => {
  const { id } = useParams();

  const { isPending, isError, data: jobApplication } = useGetJobApplication(id);

  if (isPending) return <div>Loading</div>;
  if (isError) return <div>Error</div>;
  return (
    <>
      <section>
        <h1>
          <a href={jobApplication.company.websiteUrl} target="_blank">
            {jobApplication.company.name}
          </a>
        </h1>
        <h2>
          <a href={jobApplication.listingUrl} target="_blank">
            {jobApplication.roleTitle}
          </a>
        </h2>
        <div>Applied {jobApplication.appliedDate}</div>
      </section>
      <section></section>
    </>
  );
};

export default JobApplicationsShowPage;
