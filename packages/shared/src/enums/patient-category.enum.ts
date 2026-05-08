export enum PatientCategory {
  INPATIENT = 'INPATIENT',
  OUTPATIENT = 'OUTPATIENT',
  CHARITY = 'CHARITY',
}

export const PatientCategoryLabel: Record<PatientCategory, string> = {
  [PatientCategory.INPATIENT]: '住院',
  [PatientCategory.OUTPATIENT]: '门诊',
  [PatientCategory.CHARITY]: '慈善',
};
