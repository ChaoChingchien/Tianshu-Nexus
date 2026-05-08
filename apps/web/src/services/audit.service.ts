import apiClient from './api-client';

export const auditService = {
  getAuditLogs: async (query?: {
    action?: string;
    operatorId?: string;
    resourceType?: string;
    success?: boolean;
    startDate?: string;
    endDate?: string;
    page?: number;
    limit?: number;
  }) => {
    const params = new URLSearchParams();
    if (query?.action) params.set('action', query.action);
    if (query?.operatorId) params.set('operatorId', query.operatorId);
    if (query?.resourceType) params.set('resourceType', query.resourceType);
    if (query?.success !== undefined) params.set('success', String(query.success));
    if (query?.startDate) params.set('startDate', query.startDate);
    if (query?.endDate) params.set('endDate', query.endDate);
    if (query?.page) params.set('page', String(query.page));
    if (query?.limit) params.set('limit', String(query.limit));
    const { data } = await apiClient.get(`/audit?${params}`);
    return data.data;
  },
  getStats: async () => {
    const { data } = await apiClient.get('/audit/stats');
    return data.data;
  },
};
