export enum TCMTreatmentCategory {
  MOXIBUSTION = 'MOXIBUSTION',
  CUPPING = 'CUPPING',
  SCRAPING = 'SCRAPING',
  EAR_ACUPOINT = 'EAR_ACUPOINT',
  ACUPUNCTURE = 'ACUPUNCTURE',
  TUINA = 'TUINA',
}

export const TCMTreatmentCategoryLabel: Record<TCMTreatmentCategory, string> = {
  [TCMTreatmentCategory.MOXIBUSTION]: '艾灸',
  [TCMTreatmentCategory.CUPPING]: '拔罐',
  [TCMTreatmentCategory.SCRAPING]: '刮痧',
  [TCMTreatmentCategory.EAR_ACUPOINT]: '耳穴',
  [TCMTreatmentCategory.ACUPUNCTURE]: '针灸',
  [TCMTreatmentCategory.TUINA]: '推拿',
};
