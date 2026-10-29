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
  status: 'applied' | 'rejected' | 'stale' | 'in_progress' | 'offered' | 'declined';
  createdAt: string;
  updatedAt: string;
  company: Company;
}

export interface Company {
  id: number;
  name: number;
  websiteUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  id: number;
  createdAt: string;
  createdAtYmd: string;
  text: string;
  userId: number;
  commentableId: number;
}
