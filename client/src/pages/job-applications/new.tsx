import { useNavigate } from 'react-router-dom';
import type { SubmitEventHandler } from 'react';

import { useCreateJobApplication } from '~/services/queries';
import { serializeFormData } from '~/utils/form-data';
import type { JobApplication } from '~/types';

const JobApplicationsNew = () => {
  const navigate = useNavigate();

  const createJobApplicationMutation = useCreateJobApplication({
    onSuccess: (jobApplication: JobApplication) => {
      navigate(['/job-applications', jobApplication.id].join('/'));
    },
  });

  const submitJobApplicationForm: SubmitEventHandler = (e) => {
    e.preventDefault();
    const jobApplicationData = serializeFormData(new FormData(e.target));
    createJobApplicationMutation.mutate(jobApplicationData as Record<string, unknown>);
  };

  return (
    <section>
      <h1>Create Job Application</h1>
      <form onSubmit={submitJobApplicationForm}>
        <label>
          <span>Role title:</span>
          <input name="roleTitle" autoComplete="off" />
        </label>

        <label>
          <span>Listing url:</span>
          <input name="listingUrl" autoComplete="off" />
        </label>

        <label>
          <span>Company name:</span>
          <input name="companyAttributes[name]" autoComplete="off" />
        </label>

        <label>
          <span>Company website url:</span>
          <input name="companyAttributes[websiteUrl]" autoComplete="off" />
        </label>

        <button type="submit" className="btn btn-primary">
          Create job application
        </button>
      </form>
    </section>
  );
};

export default JobApplicationsNew;
