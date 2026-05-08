export enum AppointmentStatus {
  CONFIRMED = 'CONFIRMED',
  CHECKED_IN = 'CHECKED_IN',
  CANCELLED = 'CANCELLED',
  COMPLETED = 'COMPLETED',
  NO_SHOW = 'NO_SHOW',
}

export const AppointmentStatusLabel: Record<AppointmentStatus, string> = {
  [AppointmentStatus.CONFIRMED]: '已确认',
  [AppointmentStatus.CHECKED_IN]: '已签到',
  [AppointmentStatus.CANCELLED]: '已取消',
  [AppointmentStatus.COMPLETED]: '已完成',
  [AppointmentStatus.NO_SHOW]: '未到诊',
};
