import { IApiObject } from './api';

interface IStaff extends IApiObject {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  date_of_birth: string;
  home_address: string;
  city: string;
  state: string;
  zip_code: string;
  last_4_of_SNN: string;
  type_of_worker: string;
  type_of_employee: string;
  type_of_contractor: string;
  business_name: string;
  start_date: string;
  state_working_in: string;
  pay_rate_type: string;
  pay_rate_amount: string;
}

export type Staff = Partial<IStaff>;

export interface IStaffNote extends IApiObject {
  note_type: 'Incident' | 'General Note';
  note_date: string;
  note_description: string;
  note_file: null;
}

export interface IStaffContact extends IApiObject {
  name: string;
  relationship: string;
  phone_number: string;
}

export interface IStaffDocument extends IApiObject {
  document_title: string;
  staff_id: number;
  document_file: string;
}

export interface IStaffRole extends IApiObject {
  role_name: string;
  company_id: number;
}
