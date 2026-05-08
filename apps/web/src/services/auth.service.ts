import apiClient from './api-client';

export const authService = {
  login: async (username: string, password: string) => {
    const { data } = await apiClient.post('/auth/login', { username, password });
    return data.data;
  },

  verifyTotp: async (userId: string, token: string) => {
    const { data } = await apiClient.post('/auth/verify-totp', { userId, token });
    return data.data;
  },

  register: async (dto: {
    username: string;
    password: string;
    displayName: string;
    invitationCode: string;
    hospital?: string;
    department?: string;
  }) => {
    const { data } = await apiClient.post('/auth/register', dto);
    return data.data;
  },

  getProfile: async () => {
    const { data } = await apiClient.post('/auth/profile');
    return data.data;
  },
};
