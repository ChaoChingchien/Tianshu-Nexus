import apiClient from './api-client';

export const profileService = {
  getProfile: async () => {
    const { data } = await apiClient.get('/profile');
    return data.data;
  },
  updateProfile: async (dto: any) => {
    const { data } = await apiClient.put('/profile', dto);
    return data.data;
  },
  changePassword: async (dto: { oldPassword: string; newPassword: string }) => {
    const { data } = await apiClient.post('/profile/change-password', dto);
    return data.data;
  },
  getDoctorPortfolio: async () => {
    const { data } = await apiClient.get('/profile/doctor/portfolio');
    return data.data;
  },
  updateDoctorPortfolio: async (dto: any) => {
    const { data } = await apiClient.put('/profile/doctor/portfolio', dto);
    return data.data;
  },
};
