import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import {
  getSession,
  createSession,
  getJobApplications,
  getJobApplication,
  createJobApplication,
  updateJobApplication,
  getComments,
  createComment,
  deleteComment,
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

export const useGetJobApplication = (id: number) => {
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
  id: number,
  { onSuccess }: { onSuccess?: (jobApplication: JobApplication) => void } = {},
) => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (jobApplicationData: Record<string, unknown>) => updateJobApplication(id, jobApplicationData),
    onSuccess: (jobApplication: JobApplication) => {
      console.log(['job-application', id]);
      client.invalidateQueries({ queryKey: ['job-application', id] });
      onSuccess?.(jobApplication);
    },
  });
};

/**** COMMENTS ****/
export const useGetJobApplicationComments = (id: number) => {
  return useQuery({
    queryKey: ['job-application-comments', id],
    queryFn: () => getComments({ commentableId: id, commentableType: 'JobApplication' }),
  });
};

export const useDeleteJobApplicationComment = (commentableId: number, commentId: number) => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: () => deleteComment(commentId),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['job-application', commentableId] });
    },
  });
};

export const useCreateJobApplicationComment = (
  commentableId: number,
  { onSuccess }: { onSuccess?: () => void } = {},
) => {
  const client = useQueryClient();
  const commentableType = 'JobApplication';
  return useMutation({
    mutationFn: (comment: { text: string }) => createComment({ commentableId, commentableType, ...comment }),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['job-application', commentableId] });
      onSuccess?.();
    },
  });
};

/**** COMPANIES ****/
export const useGetCompanies = () => {
  return useQuery({
    queryKey: ['companies'],
    queryFn: getCompanies,
  });
};
