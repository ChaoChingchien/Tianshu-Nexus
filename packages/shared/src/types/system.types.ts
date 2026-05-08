export interface ISystemSettings {
  id: string;
  systemName?: string;
  systemDescription?: string;
  enableSelfRegistration: boolean;
  enableTwoFactorAuth: boolean;
  sessionTimeoutMinutes: number;
  maxLoginAttempts: number;
  enableAuditLog: boolean;
  auditLogRetentionDays: number;
  enablePiiMask: boolean;
  defaultLanguage: string;
  timezone: string;
  enableDataBackup: boolean;
  backupIntervalHours: number;
  updatedAt: string;
}
