export enum DrugCategory {
  PSYCHOTROPIC = 'PSYCHOTROPIC',
  WESTERN = 'WESTERN',
  CHINESE_PATENT = 'CHINESE_PATENT',
}

export const DrugCategoryLabel: Record<DrugCategory, string> = {
  [DrugCategory.PSYCHOTROPIC]: '精神类',
  [DrugCategory.WESTERN]: '西药',
  [DrugCategory.CHINESE_PATENT]: '中成药',
};
