import apiClient from './api-client';

export const treatmentsService = {
  // Treatment catalog
  getTreatments: async (query?: { search?: string; category?: string; page?: number; limit?: number }) => {
    const params = new URLSearchParams();
    if (query?.search) params.set('search', query.search);
    if (query?.category) params.set('category', query.category);
    if (query?.page) params.set('page', String(query.page));
    if (query?.limit) params.set('limit', String(query.limit));
    const { data } = await apiClient.get(`/treatments/catalog?${params}`);
    return data.data;
  },
  createTreatment: async (dto: any) => {
    const { data } = await apiClient.post('/treatments/catalog', dto);
    return data.data;
  },
  updateTreatment: async (id: string, dto: any) => {
    const { data } = await apiClient.put(`/treatments/catalog/${id}`, dto);
    return data.data;
  },
  deleteTreatment: async (id: string) => {
    const { data } = await apiClient.delete(`/treatments/catalog/${id}`);
    return data.data;
  },

  // Acupoints
  getAcupoints: async (query?: { search?: string; meridian?: string; page?: number; limit?: number }) => {
    const params = new URLSearchParams();
    if (query?.search) params.set('search', query.search);
    if (query?.meridian) params.set('meridian', query.meridian);
    if (query?.page) params.set('page', String(query.page));
    if (query?.limit) params.set('limit', String(query.limit));
    const { data } = await apiClient.get(`/treatments/acupoints?${params}`);
    return data.data;
  },
  getAcupointById: async (id: string) => {
    const { data } = await apiClient.get(`/treatments/acupoints/${id}`);
    return data.data;
  },
  createAcupoint: async (dto: any) => {
    const { data } = await apiClient.post('/treatments/acupoints', dto);
    return data.data;
  },
  updateAcupoint: async (id: string, dto: any) => {
    const { data } = await apiClient.put(`/treatments/acupoints/${id}`, dto);
    return data.data;
  },
  deleteAcupoint: async (id: string) => {
    const { data } = await apiClient.delete(`/treatments/acupoints/${id}`);
    return data.data;
  },

  // Treatment plans
  getPlans: async (query?: { patientId?: string; status?: string; page?: number; limit?: number }) => {
    const params = new URLSearchParams();
    if (query?.patientId) params.set('patientId', query.patientId);
    if (query?.status) params.set('status', query.status);
    if (query?.page) params.set('page', String(query.page));
    if (query?.limit) params.set('limit', String(query.limit));
    const { data } = await apiClient.get(`/treatments/plans?${params}`);
    return data.data;
  },
  createPlan: async (dto: any) => {
    const { data } = await apiClient.post('/treatments/plans', dto);
    return data.data;
  },
  updatePlan: async (id: string, dto: any) => {
    const { data } = await apiClient.put(`/treatments/plans/${id}`, dto);
    return data.data;
  },
  deletePlan: async (id: string) => {
    const { data } = await apiClient.delete(`/treatments/plans/${id}`);
    return data.data;
  },

  // TCM treatments
  getTCMTreatments: async (query?: { search?: string; category?: string; page?: number; limit?: number }) => {
    const params = new URLSearchParams();
    if (query?.search) params.set('search', query.search);
    if (query?.category) params.set('category', query.category);
    if (query?.page) params.set('page', String(query.page));
    if (query?.limit) params.set('limit', String(query.limit));
    const { data } = await apiClient.get(`/treatments/tcm?${params}`);
    return data.data;
  },
  createTCMTreatment: async (dto: any) => {
    const { data } = await apiClient.post('/treatments/tcm', dto);
    return data.data;
  },
  updateTCMTreatment: async (id: string, dto: any) => {
    const { data } = await apiClient.put(`/treatments/tcm/${id}`, dto);
    return data.data;
  },
  deleteTCMTreatment: async (id: string) => {
    const { data } = await apiClient.delete(`/treatments/tcm/${id}`);
    return data.data;
  },

  // Alias: getCatalog = getTreatments
  getCatalog: async (query?: { search?: string; category?: string; page?: number; limit?: number }) => {
    const { data } = await apiClient.get(`/treatments/catalog`, { params: query || {} });
    return data.data;
  },
  createCatalogItem: async (dto: any) => {
    const { data } = await apiClient.post('/treatments/catalog', dto);
    return data.data;
  },
  updateCatalogItem: async (id: string, dto: any) => {
    const { data } = await apiClient.put(`/treatments/catalog/${id}`, dto);
    return data.data;
  },
  deleteCatalogItem: async (id: string) => {
    const { data } = await apiClient.delete(`/treatments/catalog/${id}`);
    return data.data;
  },
  getTreatmentPlans: async (query?: { patientId?: string; status?: string; page?: number; limit?: number }) => {
    const { data } = await apiClient.get(`/treatments/plans`, { params: query || {} });
    return data.data;
  },
};
