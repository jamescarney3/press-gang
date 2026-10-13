import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { getSession, createSession, getJobApplications, getCompanies, createJobApplication } from '~/services/api';

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

export const useCreateJobApplication = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (jobApplicationData) => createJobApplication(jobApplicationData),
    onSuccess: () => client.invalidateQueries({ queryKey: ['job-applications', 'companies'] }),
  });
};

export const useGetCompanies = () => {
  return useQuery({
    queryKey: ['companies'],
    queryFn: getCompanies,
  });
};
