/**
 * 12 项细粒度功能权限定义
 */
export const PERMISSIONS = {
  PATIENT_VIEW: 'patient:view',
  PATIENT_CREATE: 'patient:create',
  PATIENT_EDIT: 'patient:edit',
  PATIENT_DELETE: 'patient:delete',
  MEDICATION_MANAGE: 'medication:manage',
  TREATMENT_MANAGE: 'treatment:manage',
  SCHEDULE_MANAGE: 'schedule:manage',
  FOLLOWUP_MANAGE: 'followup:manage',
  EDUCATION_MANAGE: 'education:manage',
  AI_ACCESS: 'ai:access',
  AUDIT_VIEW: 'audit:view',
  SYSTEM_SETTINGS: 'system:settings',
} as const;

export type Permission = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];

export const PERMISSION_LABELS: Record<Permission, string> = {
  [PERMISSIONS.PATIENT_VIEW]: '患者查看',
  [PERMISSIONS.PATIENT_CREATE]: '患者创建',
  [PERMISSIONS.PATIENT_EDIT]: '患者编辑',
  [PERMISSIONS.PATIENT_DELETE]: '患者删除',
  [PERMISSIONS.MEDICATION_MANAGE]: '药品管理',
  [PERMISSIONS.TREATMENT_MANAGE]: '治疗管理',
  [PERMISSIONS.SCHEDULE_MANAGE]: '排班管理',
  [PERMISSIONS.FOLLOWUP_MANAGE]: '随访管理',
  [PERMISSIONS.EDUCATION_MANAGE]: '宣教管理',
  [PERMISSIONS.AI_ACCESS]: 'AI决策',
  [PERMISSIONS.AUDIT_VIEW]: '审计日志',
  [PERMISSIONS.SYSTEM_SETTINGS]: '系统设置',
};
