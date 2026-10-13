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
    <section>
      <h1>Create Job Application</h1>
      <form onSubmit={submitJobApplicationForm}>
        <label>
          <span>Role title:</span>
          <input name="jobApplication[roleTitle]" autoComplete="off" />
        </label>

        <label>
          <span>Company name:</span>
          <input name="jobApplication[companyAttributes][name]" autoComplete="off" />
        </label>

        <label>
          <span>Company website url:</span>
          <input name="jobApplication[companyAttributes][websiteUrl]" autoComplete="off" />
        </label>

        <button type="submit" className="btn btn-primary">
          Create job application
        </button>
      </form>
    </section>
  );
};

export default JobApplicationsNew;
