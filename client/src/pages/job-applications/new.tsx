import { useNavigate } from 'react-router-dom';
import type { SubmitEventHandler } from 'react';
import { Button, TextField } from '@mui/material';

import { useCreateJobApplication } from '~/services/queries';
import { serializeFormData } from '~/utils/form-data';
import PageContainer from '~/components/page-container';
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
    <PageContainer>
      <h1>Create Job Application</h1>
      <form onSubmit={submitJobApplicationForm}>
        <TextField
          name="companyAttributes[name]"
          label="Company name"
          autoComplete="off"
          margin="normal"
          sx={{ minWidth: 300 }}
        />
        <TextField name="roleTitle" label="Role title" autoComplete="off" margin="normal" />
        <TextField name="listingUrl" label="Listing URL" autoComplete="off" margin="normal" />
        <TextField
          name="companyAttributes[websiteUrl]"
          label="Company website URL"
          autoComplete="off"
          margin="normal"
        />

        <Button type="submit" variant="contained" color="primary" size="large" sx={{ mt: 4 }}>
          Create job application
        </Button>
      </form>
    </PageContainer>
  );
};

export default JobApplicationsNew;
