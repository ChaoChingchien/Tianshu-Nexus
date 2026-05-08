import { PatientCategory, RiskLevel } from '../enums';

export interface IPatient {
  id: string;
  anonymousId: string;
  name: string;
  gender?: string;
  age?: number;
  phone?: string;
  address?: string;
  idNumber?: string;
  diagnosis?: string;
  admissionDate?: string;
  bedNumber?: string;
  department?: string;
  primaryDoctorId?: string;
  notes?: string;
  category: PatientCategory;
  isArchived: boolean;
  riskLevel?: RiskLevel;
  riskWarning?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ICreatePatientInput {
  name: string;
  gender?: string;
  age?: number;
  phone?: string;
  address?: string;
  idNumber?: string;
  diagnosis?: string;
  admissionDate?: string;
  bedNumber?: string;
  department?: string;
  primaryDoctorId?: string;
  notes?: string;
  category?: PatientCategory;
}
