import apiClient from './api-client';

export const medicationsService = {
  // Drug Dictionary
  getDrugs: async (query?: { search?: string; category?: string; page?: number; limit?: number }) => {
    const params = new URLSearchParams();
    if (query?.search) params.set('search', query.search);
    if (query?.category) params.set('category', query.category);
    if (query?.page) params.set('page', String(query.page));
    if (query?.limit) params.set('limit', String(query.limit));
    const { data } = await apiClient.get(`/medications/drug-dictionary?${params}`);
    return data.data;
  },
  createDrug: async (dto: any) => {
    const { data } = await apiClient.post('/medications/drug-dictionary', dto);
    return data.data;
  },
  updateDrug: async (id: string, dto: any) => {
    const { data } = await apiClient.put(`/medications/drug-dictionary/${id}`, dto);
    return data.data;
  },
  deleteDrug: async (id: string) => {
    const { data } = await apiClient.delete(`/medications/drug-dictionary/${id}`);
    return data.data;
  },

  // Inventory
  getInventory: async () => {
    const { data } = await apiClient.get('/medications/inventory');
    return data.data;
  },
  updateStock: async (id: string, dto: any) => {
    const { data } = await apiClient.put(`/medications/inventory/${id}`, dto);
    return data.data;
  },

  // Orders
  getOrders: async (query?: { patientId?: string; status?: string; page?: number; limit?: number }) => {
    const params = new URLSearchParams();
    if (query?.patientId) params.set('patientId', query.patientId);
    if (query?.status) params.set('status', query.status);
    const { data } = await apiClient.get(`/medications/orders?${params}`);
    return data.data;
  },
  createOrder: async (dto: any) => {
    const { data } = await apiClient.post('/medications/orders', dto);
    return data.data;
  },

  // Dispensing
  getDispensing: async () => {
    const { data } = await apiClient.get('/medications/dispensing');
    return data.data;
  },
  dispense: async (dto: any) => {
    const { data } = await apiClient.post('/medications/dispensing', dto);
    return data.data;
  },
  confirmDispense: async (id: string) => {
    const { data } = await apiClient.post(`/medications/dispensing/${id}/confirm`);
    return data.data;
  },
};
