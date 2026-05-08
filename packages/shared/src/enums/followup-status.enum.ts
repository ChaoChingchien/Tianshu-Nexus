export enum FollowUpType {
  ONLINE = 'ONLINE',
  OUTPATIENT = 'OUTPATIENT',
  PHONE = 'PHONE',
}

export enum FollowUpStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  MISSED = 'MISSED',
}

export const FollowUpTypeLabel: Record<FollowUpType, string> = {
  [FollowUpType.ONLINE]: '线上随访',
  [FollowUpType.OUTPATIENT]: '门诊随访',
  [FollowUpType.PHONE]: '电话随访',
};

export const FollowUpStatusLabel: Record<FollowUpStatus, string> = {
  [FollowUpStatus.PENDING]: '待执行',
  [FollowUpStatus.COMPLETED]: '已完成',
  [FollowUpStatus.MISSED]: '已错过',
};
