export interface JobApplication {
  id: string;
  company: string;
  contacts: string;
  role: string;
  customer?: string;
  budget?: string;
  status: string;
}

export type Status =
  | 'Initial Interview'
  | 'Technical Interview'
  | 'Client Interview'
  | 'Screening'
  | 'Rejected'
  | 'Cancelled'
  | 'Offer';