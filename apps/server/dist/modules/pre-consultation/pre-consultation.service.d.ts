import { PrismaService } from '../../common/prisma/prisma.service';
export declare class PreConsultationService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(query: {
        patientId?: string;
        page?: number;
        limit?: number;
    }): Promise<{
        items: {
            treatmentPlan: string | null;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            diagnosis: string | null;
            patientId: string;
            symptoms: string | null;
            medicalHistory: string | null;
            doctorStyleFeatures: string | null;
            htePredictionResult: string | null;
            counterFactualComparison: string | null;
            followUpArrangement: string | null;
            riskMarkers: string | null;
            patientFeedback: string | null;
            treatmentOutcome: string | null;
        }[];
        total: number;
        page: number;
        limit: number;
    }>;
    findById(id: string): Promise<{
        treatmentPlan: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        diagnosis: string | null;
        patientId: string;
        symptoms: string | null;
        medicalHistory: string | null;
        doctorStyleFeatures: string | null;
        htePredictionResult: string | null;
        counterFactualComparison: string | null;
        followUpArrangement: string | null;
        riskMarkers: string | null;
        patientFeedback: string | null;
        treatmentOutcome: string | null;
    }>;
    create(dto: any): Promise<{
        treatmentPlan: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        diagnosis: string | null;
        patientId: string;
        symptoms: string | null;
        medicalHistory: string | null;
        doctorStyleFeatures: string | null;
        htePredictionResult: string | null;
        counterFactualComparison: string | null;
        followUpArrangement: string | null;
        riskMarkers: string | null;
        patientFeedback: string | null;
        treatmentOutcome: string | null;
    }>;
    update(id: string, dto: any): Promise<{
        treatmentPlan: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        diagnosis: string | null;
        patientId: string;
        symptoms: string | null;
        medicalHistory: string | null;
        doctorStyleFeatures: string | null;
        htePredictionResult: string | null;
        counterFactualComparison: string | null;
        followUpArrangement: string | null;
        riskMarkers: string | null;
        patientFeedback: string | null;
        treatmentOutcome: string | null;
    }>;
    submitStep(id: string, step: number, dto: any): Promise<{
        treatmentPlan: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        diagnosis: string | null;
        patientId: string;
        symptoms: string | null;
        medicalHistory: string | null;
        doctorStyleFeatures: string | null;
        htePredictionResult: string | null;
        counterFactualComparison: string | null;
        followUpArrangement: string | null;
        riskMarkers: string | null;
        patientFeedback: string | null;
        treatmentOutcome: string | null;
    }>;
}
//# sourceMappingURL=pre-consultation.service.d.ts.map