// TODO: environmentalize this
const API_ROOT = 'http://localhost:3000/api/v1';

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
};

const apiFetch = async (path: string, options?: FetchOptions) => {
  const url = [API_ROOT, path].join('/');
  const apiOptions = {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const response = await fetch(url, { ...options, ...apiOptions } as RequestInit);
  if (!response.ok) throw new Error(`http error - status: ${response.status}`);
  return response.json();
};

/**** SESSIONS ****/
export const createSession = async (credentials: { emailAddress: string; password: string }) => {
  return await apiFetch('session', { method: HTTP_METHODS.POST, body: JSON.stringify({ credentials }) });
};

export const destroySession = async () => {
  return await apiFetch('session', { method: HTTP_METHODS.DELETE });
};

export const getSession = async () => {
  try {
    await apiFetch('session');
    return true;
  } catch {
    return false;
  }
};

/**** JOB APPLICATIONS ****/
export const getJobApplications = async () => {
  return await apiFetch('job_applications');
};

export const getJobApplication = async (id: string) => {
  return await apiFetch(['job_applications', id].join('/'));
};

export const createJobApplication = async (jobApplication: unknown) => {
  return await apiFetch('job_applications', { method: HTTP_METHODS.POST, body: JSON.stringify({ jobApplication }) });
};

export const updateJobApplication = async (id: string, jobApplication: Record<string, unknown>) => {
  return await apiFetch(['job_applications', id].join('/'), {
    method: HTTP_METHODS.PATCH,
    body: JSON.stringify({ jobApplication }),
  });
};

/**** COMPANIES ****/
export const getCompanies = async () => {
  return await apiFetch('companies');
};
