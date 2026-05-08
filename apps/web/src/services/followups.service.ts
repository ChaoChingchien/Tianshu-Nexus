import apiClient from './api-client';

export const followupsService = {
  // Dashboard / today's pending
  getTodayPending: async () => {
    const { data } = await apiClient.get('/followups/today-pending');
    return data.data;
  },

  // Follow-up plans
  getPlans: async (query?: { patientId?: string; status?: string; page?: number; limit?: number }) => {
    const params = new URLSearchParams();
    if (query?.patientId) params.set('patientId', query.patientId);
    if (query?.status) params.set('status', query.status);
    if (query?.page) params.set('page', String(query.page));
    if (query?.limit) params.set('limit', String(query.limit));
    const { data } = await apiClient.get(`/followups?${params}`);
    return data.data;
  },
  createPlan: async (dto: any) => {
    const { data } = await apiClient.post('/followups', dto);
    return data.data;
  },
  updatePlan: async (id: string, dto: any) => {
    const { data } = await apiClient.put(`/followups/${id}`, dto);
    return data.data;
  },
  completeFollowUp: async (id: string, dto: any) => {
    const { data } = await apiClient.post(`/followups/${id}/complete`, dto);
    return data.data;
  },
  executeFollowUp: async (id: string, dto: any) => {
    const { data } = await apiClient.post(`/followups/${id}/execute`, dto);
    return data.data;
  },
  getStats: async () => {
    const { data } = await apiClient.get('/followups/stats');
    return data.data;
  },
};
