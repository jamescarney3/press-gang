import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import {
  getSession,
  createSession,
  getJobApplications,
  getJobApplication,
  createJobApplication,
  updateJobApplication,
  getCompanies,
} from '~/services/api';
import type { JobApplication } from '~/types';

export const useGetSession = () => {
  return useQuery({
    queryKey: ['session'],
    queryFn: getSession,
    retry: false,
  });
};

export const useCreateSession = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (credentials: { emailAddress: string; password: string }) => createSession(credentials),
    onSuccess: () => client.setQueryData(['session'], true),
  });
};

export const useGetJobApplications = () => {
  return useQuery({
    queryKey: ['job-applications'],
    queryFn: getJobApplications,
  });
};

export const useGetJobApplication = (id: string) => {
  return useQuery({
    queryKey: ['job-application', id],
    queryFn: () => getJobApplication(id),
  });
};

export const useCreateJobApplication = ({
  onSuccess,
}: { onSuccess?: (jobApplication: JobApplication) => void } = {}) => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (jobApplicationData: Record<string, unknown>) => createJobApplication(jobApplicationData),
    onSuccess: (jobApplication: JobApplication) => {
      client.invalidateQueries({ queryKey: ['job-applications'] });
      onSuccess?.(jobApplication);
    },
  });
};

export const useUpdateJobApplication = (
  id: string,
  { onSuccess }: { onSuccess?: (jobApplication: JobApplication) => void } = {},
) => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (jobApplicationData: Record<string, unknown>) => updateJobApplication(id, jobApplicationData),
    onSuccess: (jobApplication: JobApplication) => {
      client.invalidateQueries({ queryKey: ['job-application', id] });
      onSuccess?.(jobApplication);
    },
  });
};

export const useGetCompanies = () => {
  return useQuery({
    queryKey: ['companies'],
    queryFn: getCompanies,
  });
};
