import apiClient from './api-client';

export const leaveService = {
  getLeaves: async (query?: { patientId?: string; status?: string; page?: number; limit?: number }) => {
    const params = new URLSearchParams();
    if (query?.patientId) params.set('patientId', query.patientId);
    if (query?.status) params.set('status', query.status);
    if (query?.page) params.set('page', String(query.page));
    if (query?.limit) params.set('limit', String(query.limit));
    const { data } = await apiClient.get(`/leave?${params}`);
    return data.data;
  },
  createLeave: async (dto: any) => {
    const { data } = await apiClient.post('/leave', dto);
    return data.data;
  },
  approveLeave: async (id: string, dto?: { approved: boolean; comment?: string }) => {
    const { data } = await apiClient.post(`/leave/${id}/approve`, dto || { approved: true });
    return data.data;
  },
  rejectLeave: async (id: string, comment?: string) => {
    const { data } = await apiClient.post(`/leave/${id}/reject`, { comment });
    return data.data;
  },
  cancelLeave: async (id: string) => {
    const { data } = await apiClient.post(`/leave/${id}/cancel`);
    return data.data;
  },
  confirmReturn: async (id: string) => {
    const { data } = await apiClient.post(`/leave/${id}/confirm-return`);
    return data.data;
  },
  // Short-name aliases
  getLeaveRequests: async (query?: { patientId?: string; status?: string; page?: number; limit?: number }) => leaveService.getLeaves(query),
  createLeaveRequest: async (dto: any) => leaveService.createLeave(dto),
  approveLeaveRequest: async (id: string, dto: { approved: boolean; comment?: string }) => leaveService.approveLeave(id, dto),
  rejectLeaveRequest: async (id: string, comment?: string) => leaveService.rejectLeave(id, comment),
  cancelLeaveRequest: async (id: string) => leaveService.cancelLeave(id),
};
