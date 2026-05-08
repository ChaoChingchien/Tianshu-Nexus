import apiClient from './api-client';

export const settingsService = {
  getSettings: async () => {
    const { data } = await apiClient.get('/system-settings');
    return data.data;
  },
  updateSettings: async (dto: any) => {
    const { data } = await apiClient.put('/system-settings', dto);
    return data.data;
  },
};
