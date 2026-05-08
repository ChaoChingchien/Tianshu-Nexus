import apiClient from './api-client';

export const schedulingService = {
  // Stats
  getStats: async () => {
    const { data } = await apiClient.get('/scheduling/stats');
    return data.data;
  },

  // Doctor schedules
  getSchedules: async (query?: { doctorId?: string; dayOfWeek?: number }) => {
    const params = new URLSearchParams();
    if (query?.doctorId) params.set('doctorId', query.doctorId);
    if (query?.dayOfWeek !== undefined) params.set('dayOfWeek', String(query.dayOfWeek));
    const { data } = await apiClient.get(`/scheduling/schedules?${params}`);
    return data.data;
  },
  createSchedule: async (dto: any) => {
    const { data } = await apiClient.post('/scheduling/schedules', dto);
    return data.data;
  },
  updateSchedule: async (id: string, dto: any) => {
    const { data } = await apiClient.put(`/scheduling/schedules/${id}`, dto);
    return data.data;
  },
  deleteSchedule: async (id: string) => {
    const { data } = await apiClient.delete(`/scheduling/schedules/${id}`);
    return data.data;
  },

  // Appointments
  getAppointments: async (query?: { patientId?: string; doctorId?: string; date?: string; status?: string; page?: number; limit?: number }) => {
    const params = new URLSearchParams();
    if (query?.patientId) params.set('patientId', query.patientId);
    if (query?.doctorId) params.set('doctorId', query.doctorId);
    if (query?.date) params.set('date', query.date);
    if (query?.status) params.set('status', query.status);
    if (query?.page) params.set('page', String(query.page));
    if (query?.limit) params.set('limit', String(query.limit));
    const { data } = await apiClient.get(`/scheduling/appointments?${params}`);
    return data.data;
  },
  createAppointment: async (dto: any) => {
    const { data } = await apiClient.post('/scheduling/appointments', dto);
    return data.data;
  },
  updateAppointment: async (id: string, dto: any) => {
    const { data } = await apiClient.put(`/scheduling/appointments/${id}`, dto);
    return data.data;
  },
  cancelAppointment: async (id: string, reason?: string) => {
    const { data } = await apiClient.post(`/scheduling/appointments/${id}/cancel`, { reason });
    return data.data;
  },
  checkinAppointment: async (id: string) => {
    const { data } = await apiClient.post(`/scheduling/appointments/${id}/checkin`);
    return data.data;
  },
  // Aliases
  getDashboardStats: async () => schedulingService.getStats(),
  checkInAppointment: async (id: string) => schedulingService.checkinAppointment(id),
  completeAppointment: async (id: string) => schedulingService.updateAppointment(id, { status: 'COMPLETED' }),
};
