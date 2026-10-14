export interface User {
  id: number;
  emailAddress: string;
  firstName: string;
  lastName: string;
  createdAt: string;
  updatedAt: string;
}

export interface JobApplication {
  id: number;
  companyId: number;
  roleTitle: string;
  listingUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface Company {
  id: number;
  name: number;
  websiteUrl: string;
  createdAt: string;
  updatedAt: string;
}
