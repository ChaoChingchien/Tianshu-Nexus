export enum TreatmentCategory {
  ACUPUNCTURE = 'ACUPUNCTURE',
  TUINA = 'TUINA',
  MOXIBUSTION = 'MOXIBUSTION',
  CUPPING = 'CUPPING',
  SCRAPING = 'SCRAPING',
  PHYSIOTHERAPY = 'PHYSIOTHERAPY',
  PSYCHOLOGICAL_COUNSELING = 'PSYCHOLOGICAL_COUNSELING',
  PSYCHOTHERAPY = 'PSYCHOTHERAPY',
  MEDICATION = 'MEDICATION',
  SURGERY = 'SURGERY',
  REHABILITATION = 'REHABILITATION',
}

export const TreatmentCategoryLabel: Record<TreatmentCategory, string> = {
  [TreatmentCategory.ACUPUNCTURE]: '针灸',
  [TreatmentCategory.TUINA]: '推拿',
  [TreatmentCategory.MOXIBUSTION]: '艾灸',
  [TreatmentCategory.CUPPING]: '拔罐',
  [TreatmentCategory.SCRAPING]: '刮痧',
  [TreatmentCategory.PHYSIOTHERAPY]: '理疗',
  [TreatmentCategory.PSYCHOLOGICAL_COUNSELING]: '心理咨询',
  [TreatmentCategory.PSYCHOTHERAPY]: '心理治疗',
  [TreatmentCategory.MEDICATION]: '药物治疗',
  [TreatmentCategory.SURGERY]: '手术治疗',
  [TreatmentCategory.REHABILITATION]: '康复训练',
};
