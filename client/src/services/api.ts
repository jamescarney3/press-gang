const API_HOST = import.meta.env.VITE_API_HOST;
const API_PATH = '/api/v1';

const HTTP_METHODS = {
  POST: 'POST',
  DELETE: 'DELETE',
  PUT: 'PUT',
  PATCH: 'PATCH',
};

type PropertyOf<T> = T[keyof T];

type FetchOptions = {
  method?: PropertyOf<typeof HTTP_METHODS>;
  body?: string;
  search?: Record<string, string | number>;
};

const apiFetch = async (path: string, options?: FetchOptions) => {
  const url = new URL([API_PATH, path].join(''), API_HOST);
  const apiOptions = {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (options?.search) url.search = new URLSearchParams(options.search as Record<string, string>).toString();

  const response = await fetch(url.toString(), { ...apiOptions, ...options } as RequestInit);

  if (!response.ok) throw new Error(`http error - status: ${response.status}`);

  if (response.status === 204) return null;

  return response.json();
};

/**** SESSIONS ****/
export const createSession = async (credentials: { emailAddress: string; password: string }) => {
  return await apiFetch('/session', { method: HTTP_METHODS.POST, body: JSON.stringify({ credentials }) });
};

export const destroySession = async () => {
  return await apiFetch('/session', { method: HTTP_METHODS.DELETE });
};

export const getSession = async () => {
  try {
    await apiFetch('/session');
    return true;
  } catch {
    return false;
  }
};

/**** JOB APPLICATIONS ****/
export const getJobApplications = async () => {
  return await apiFetch('/job_applications');
};

export const getJobApplication = async (id: number) => {
  return await apiFetch(['/job_applications', id].join('/'));
};

export const createJobApplication = async (jobApplication: unknown) => {
  return await apiFetch('/job_applications', { method: HTTP_METHODS.POST, body: JSON.stringify({ jobApplication }) });
};

export const updateJobApplication = async (id: number, jobApplication: Record<string, unknown>) => {
  return await apiFetch(['/job_applications', id].join('/'), {
    method: HTTP_METHODS.PATCH,
    body: JSON.stringify({ jobApplication }),
  });
};

/**** COMMENTS ****/
export const getComments = async (search: { commentableId?: number; commentableType?: string } = {}) => {
  return await apiFetch('/comments', { search });
};

export const createComment = async (comment: { commentableId: number; commentableType: string; text: string }) => {
  return await apiFetch('/comments', { method: HTTP_METHODS.POST, body: JSON.stringify({ comment }) });
};

export const deleteComment = async (id: number) => {
  return await apiFetch(['/comments', id].join('/'), { method: HTTP_METHODS.DELETE });
};

/**** COMPANIES ****/
export const getCompanies = async () => {
  return await apiFetch('/companies');
};
