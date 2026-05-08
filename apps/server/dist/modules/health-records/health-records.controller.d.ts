import { HealthRecordsService } from './health-records.service';
export declare class HealthRecordsController {
    private healthRecordsService;
    constructor(healthRecordsService: HealthRecordsService);
    findAll(query: {
        patientId?: string;
        type?: string;
        page?: number;
        limit?: number;
    }): Promise<{
        items: ({
            patient: {
                patientProfile: string | null;
                id: string;
                createdAt: Date;
                name: string;
                department: string | null;
                phone: string | null;
                updatedAt: Date;
                deletedAt: Date | null;
                anonymousId: string;
                gender: string | null;
                age: number | null;
                address: string | null;
                idNumber: string | null;
                diagnosis: string | null;
                admissionDate: Date | null;
                bedNumber: string | null;
                notes: string | null;
                category: import("@prisma/client").$Enums.PatientCategory;
                isArchived: boolean;
                riskLevel: import("@prisma/client").$Enums.RiskLevel | null;
                riskWarning: string | null;
                patientFeatures: string | null;
                implicitPreferences: string | null;
                riskAssessment: string | null;
                primaryDoctorId: string | null;
                createdById: string | null;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            patientId: string;
            medicationHistory: string | null;
            visitRecords: string | null;
            examinationResults: string | null;
            diagnosisRecords: string | null;
        })[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(id: string): Promise<{
        patient: {
            patientProfile: string | null;
            id: string;
            createdAt: Date;
            name: string;
            department: string | null;
            phone: string | null;
            updatedAt: Date;
            deletedAt: Date | null;
            anonymousId: string;
            gender: string | null;
            age: number | null;
            address: string | null;
            idNumber: string | null;
            diagnosis: string | null;
            admissionDate: Date | null;
            bedNumber: string | null;
            notes: string | null;
            category: import("@prisma/client").$Enums.PatientCategory;
            isArchived: boolean;
            riskLevel: import("@prisma/client").$Enums.RiskLevel | null;
            riskWarning: string | null;
            patientFeatures: string | null;
            implicitPreferences: string | null;
            riskAssessment: string | null;
            primaryDoctorId: string | null;
            createdById: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        patientId: string;
        medicationHistory: string | null;
        visitRecords: string | null;
        examinationResults: string | null;
        diagnosisRecords: string | null;
    }>;
    create(dto: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        patientId: string;
        medicationHistory: string | null;
        visitRecords: string | null;
        examinationResults: string | null;
        diagnosisRecords: string | null;
    }>;
    update(id: string, dto: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        patientId: string;
        medicationHistory: string | null;
        visitRecords: string | null;
        examinationResults: string | null;
        diagnosisRecords: string | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        patientId: string;
        medicationHistory: string | null;
        visitRecords: string | null;
        examinationResults: string | null;
        diagnosisRecords: string | null;
    }>;
}
//# sourceMappingURL=health-records.controller.d.ts.map