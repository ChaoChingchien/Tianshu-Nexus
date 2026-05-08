export interface IDoctorProfile {
  id: string;
  userId: string;
  department?: string;
  hospital?: string;
  specialties?: string;
  aiStyleFeatures?: string;
  practiceProfile?: string;
  totalCases: number;
  successCases: number;
  treatmentStats?: string;
  createdAt: string;
  updatedAt: string;
}

export interface IHealthRecord {
  id: string;
  patientId: string;
  medicationHistory?: string;
  visitRecords?: string;
  examinationResults?: string;
  diagnosisRecords?: string;
  createdAt: string;
  updatedAt: string;
}
