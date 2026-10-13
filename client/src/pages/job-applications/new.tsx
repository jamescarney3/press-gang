import type { SubmitEventHandler } from 'react';

// import { useCreateJobApplication } from '~/services/queries';
import { serializeFormData } from '~/utils/form-data';

const JobApplicationsNew = () => {
  // const createJobApplicationMutation = useCreateJobApplication();

  const submitJobApplicationForm: SubmitEventHandler = (e) => {
    e.preventDefault();
    const jobApplicationData = serializeFormData(new FormData(e.target));
    console.log(jobApplicationData);
    // createJobApplicationMutation.mutate(jobApplicationData);
  };

  return (
    <form onSubmit={submitJobApplicationForm}>
      <label>
        <span>Role title:</span>
        <br />
        <input name="jobApplication[roleTitle]" />
      </label>
      <br />
      <label>
        <span>Company name:</span>
        <br />
        <input name="jobApplication[companyAttributes][name]" />
      </label>
      <br />
      <label>
        <span>Company website url:</span>
        <br />
        <input name="jobApplication[companyAttributes][websiteUrl]" />
      </label>
      <br />
      <button type="submit">Create job application</button>
    </form>
  );
};

export default JobApplicationsNew;
