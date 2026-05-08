export enum LeaveType {
  LEAVE = 'LEAVE',
  OUTING = 'OUTING',
}

export enum LeaveStatus {
  PENDING_APPROVAL = 'PENDING_APPROVAL',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export const LeaveTypeLabel: Record<LeaveType, string> = {
  [LeaveType.LEAVE]: '请假',
  [LeaveType.OUTING]: '外出',
};

export const LeaveStatusLabel: Record<LeaveStatus, string> = {
  [LeaveStatus.PENDING_APPROVAL]: '待审批',
  [LeaveStatus.APPROVED]: '已批准',
  [LeaveStatus.REJECTED]: '已拒绝',
};
