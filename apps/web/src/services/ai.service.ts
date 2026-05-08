import apiClient from './api-client';

export const aiService = {
  // HTE (Heterogeneous Treatment Effect) prediction
  getHTEPrediction: async (dto: { patientId: string; candidateTreatments: string[] }) => {
    const { data } = await apiClient.post('/ai/hte/predict', dto);
    return data.data;
  },

  // Risk assessment
  getRiskAssessment: async (patientId: string) => {
    const { data } = await apiClient.get(`/ai/risk-assessment/${patientId}`);
    return data.data;
  },

  // NLP structurize
  nlpStructurize: async (text: string) => {
    const { data } = await apiClient.post('/ai/nlp/structurize', { text });
    return data.data;
  },

  // OCR prescription
  ocrPrescription: async (formData: FormData) => {
    const { data } = await apiClient.post('/ai/ocr/prescription', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data.data;
  },
};
