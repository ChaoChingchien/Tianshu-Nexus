import apiClient from './api-client';

export const patientsService = {
  findAll: async (query: { category?: string; search?: string; page?: number; limit?: number }) => {
    const params = new URLSearchParams();
    if (query.category) params.set('category', query.category);
    if (query.search) params.set('search', query.search);
    if (query.page) params.set('page', String(query.page));
    if (query.limit) params.set('limit', String(query.limit));
    const { data } = await apiClient.get(`/patients?${params}`);
    return data.data;
  },

  findById: async (id: string) => {
    const { data } = await apiClient.get(`/patients/${id}`);
    return data.data;
  },

  create: async (dto: any) => {
    const { data } = await apiClient.post('/patients', dto);
    return data.data;
  },

  update: async (id: string, dto: any) => {
    const { data } = await apiClient.put(`/patients/${id}`, dto);
    return data.data;
  },

  remove: async (id: string) => {
    const { data } = await apiClient.delete(`/patients/${id}`);
    return data.data;
  },
};
