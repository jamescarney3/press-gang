import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import {
  getSession,
  createSession,
  getJobApplications,
  getJobApplication,
  createJobApplication,
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
    queryKey: ['job-application'],
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
      client.invalidateQueries({ queryKey: ['job-applications', 'companies'] });
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
