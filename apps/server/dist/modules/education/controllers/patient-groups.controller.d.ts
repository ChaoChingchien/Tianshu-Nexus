import { PatientGroupsService } from '../services/patient-groups.service';
export declare class PatientGroupsController {
    private patientGroupsService;
    constructor(patientGroupsService: PatientGroupsService);
    findAll(query: {
        search?: string;
        page?: number;
        limit?: number;
    }): Promise<{
        items: ({
            _count: {
                members: number;
            };
        } & {
            id: string;
            createdAt: Date;
            name: string;
            updatedAt: Date;
            description: string | null;
        })[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(id: string): Promise<{
        members: ({
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
            patientId: string;
            groupId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        name: string;
        updatedAt: Date;
        description: string | null;
    }>;
    create(dto: any): Promise<{
        id: string;
        createdAt: Date;
        name: string;
        updatedAt: Date;
        description: string | null;
    }>;
    update(id: string, dto: any): Promise<{
        id: string;
        createdAt: Date;
        name: string;
        updatedAt: Date;
        description: string | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        name: string;
        updatedAt: Date;
        description: string | null;
    }>;
    addPatients(id: string, dto: {
        patientIds: string[];
    }): Promise<{
        members: ({
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
            patientId: string;
            groupId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        name: string;
        updatedAt: Date;
        description: string | null;
    }>;
    removePatient(id: string, patientId: string): Promise<{
        members: ({
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
            patientId: string;
            groupId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        name: string;
        updatedAt: Date;
        description: string | null;
    }>;
}
//# sourceMappingURL=patient-groups.controller.d.ts.map