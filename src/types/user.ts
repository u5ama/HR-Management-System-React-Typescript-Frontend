export interface IUser {
  id: number;
  full_name: string;
  email: string;
  user_type: 'company' | 'staff';
  user_status: 'active' | 'NotActive';
  phone_number: string;
  company_name: string;
  company_location_zip_code: string;
  how_did_you_hear: string;
  industry_type: string;
  token: string;
  created_at: string;
  updated_at: string;
}
