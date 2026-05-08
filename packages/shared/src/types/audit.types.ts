export interface IAuditLog {
  id: string;
  action: string;
  operatorId: string;
  sessionId?: string;
  ipAddress?: string;
  resourceType?: string;
  resourceId?: string;
  details?: string;
  success: boolean;
  failureReason?: string;
  createdAt: string;
}
