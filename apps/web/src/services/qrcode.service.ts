import apiClient from './api-client';

export const qrcodeService = {
  generate: async (dto: { data: string; options?: { size?: number } }) => {
    const { data } = await apiClient.post('/qrcode/generate', dto);
    return data.data;
  },
  decode: async (image: string) => {
    const { data } = await apiClient.post('/qrcode/decode', { image });
    return data.data;
  },
};
