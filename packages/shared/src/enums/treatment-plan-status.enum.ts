export enum TreatmentPlanStatus {
  DRAFT = 'DRAFT',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  STOPPED = 'STOPPED',
}

export const TreatmentPlanStatusLabel: Record<TreatmentPlanStatus, string> = {
  [TreatmentPlanStatus.DRAFT]: '草稿',
  [TreatmentPlanStatus.IN_PROGRESS]: '执行中',
  [TreatmentPlanStatus.COMPLETED]: '已完成',
  [TreatmentPlanStatus.STOPPED]: '已停止',
};
