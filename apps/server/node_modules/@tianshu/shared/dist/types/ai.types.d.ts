export interface IHTEPredictionRequest {
    patientId: string;
    candidateTreatments: string[];
}
export interface IHTEPredictionResult {
    treatmentName: string;
    successRate: number;
    confidenceInterval: [number, number];
    expectedDuration: string;
    expectedCost: number;
}
export interface IHTEComparison {
    predictions: IHTEPredictionResult[];
    doctorPatientMatchScore?: number;
    weeklyImprovementCurve?: number[];
    probabilityCloud?: number[];
}
export interface IRiskAssessment {
    riskType: string;
    riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
    description: string;
    suggestion: string;
    overallScore: number;
}
export interface INLPStructurizeResult {
    structuredComplaint: string;
    extractedSymptoms: string[];
    extractedHistory: string[];
    implicitPreferences?: Record<string, unknown>;
}
export interface IOCRPrescriptionResult {
    rawText: string;
    structuredData: {
        drugName: string;
        specification?: string;
        dosage?: string;
        usage?: string;
    }[];
}
//# sourceMappingURL=ai.types.d.ts.map