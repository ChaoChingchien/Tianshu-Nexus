import apiClient from './api-client';

export const educationService = {
  // Articles
  getArticles: async (query?: { search?: string; status?: string; category?: string; page?: number; limit?: number }) => {
    const params = new URLSearchParams();
    if (query?.search) params.set('search', query.search);
    if (query?.status) params.set('status', query.status);
    if (query?.category) params.set('category', query.category);
    if (query?.page) params.set('page', String(query.page));
    if (query?.limit) params.set('limit', String(query.limit));
    const { data } = await apiClient.get(`/education/articles?${params}`);
    return data.data;
  },
  createArticle: async (dto: any) => {
    const { data } = await apiClient.post('/education/articles', dto);
    return data.data;
  },
  updateArticle: async (id: string, dto: any) => {
    const { data } = await apiClient.put(`/education/articles/${id}`, dto);
    return data.data;
  },
  deleteArticle: async (id: string) => {
    const { data } = await apiClient.delete(`/education/articles/${id}`);
    return data.data;
  },
  publishArticle: async (id: string) => {
    const { data } = await apiClient.post(`/education/articles/${id}/publish`);
    return data.data;
  },
  approveArticle: async (id: string) => {
    const { data } = await apiClient.post(`/education/articles/${id}/approve`);
    return data.data;
  },
  rejectArticle: async (id: string, comment: string) => {
    const { data } = await apiClient.post(`/education/articles/${id}/reject`, { comment });
    return data.data;
  },
  submitForReview: async (id: string) => {
    const { data } = await apiClient.post(`/education/articles/${id}/submit-review`);
    return data.data;
  },

  // Patient groups
  getGroups: async () => {
    const { data } = await apiClient.get('/education/groups');
    return data.data;
  },
  createGroup: async (dto: any) => {
    const { data } = await apiClient.post('/education/groups', dto);
    return data.data;
  },
  updateGroup: async (id: string, dto: any) => {
    const { data } = await apiClient.put(`/education/groups/${id}`, dto);
    return data.data;
  },
  deleteGroup: async (id: string) => {
    const { data } = await apiClient.delete(`/education/groups/${id}`);
    return data.data;
  },
};
