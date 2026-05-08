import { TcmTreatmentsService } from '../services/tcm-treatments.service';
export declare class TcmTreatmentsController {
    private tcmTreatmentsService;
    constructor(tcmTreatmentsService: TcmTreatmentsService);
    findAll(query: {
        patientId?: string;
        type?: string;
        page?: number;
        limit?: number;
    }): Promise<{
        items: {
            id: string;
            createdAt: Date;
            name: string;
            updatedAt: Date;
            category: import("@prisma/client").$Enums.TCMTreatmentCategoryType;
            description: string | null;
            customTags: string | null;
            indications: string | null;
            contraindications: string | null;
            suggestedDuration: number | null;
            referencePrice: number | null;
        }[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(id: string): Promise<{
        id: string;
        createdAt: Date;
        name: string;
        updatedAt: Date;
        category: import("@prisma/client").$Enums.TCMTreatmentCategoryType;
        description: string | null;
        customTags: string | null;
        indications: string | null;
        contraindications: string | null;
        suggestedDuration: number | null;
        referencePrice: number | null;
    }>;
    create(dto: any): Promise<{
        id: string;
        createdAt: Date;
        name: string;
        updatedAt: Date;
        category: import("@prisma/client").$Enums.TCMTreatmentCategoryType;
        description: string | null;
        customTags: string | null;
        indications: string | null;
        contraindications: string | null;
        suggestedDuration: number | null;
        referencePrice: number | null;
    }>;
    update(id: string, dto: any): Promise<{
        id: string;
        createdAt: Date;
        name: string;
        updatedAt: Date;
        category: import("@prisma/client").$Enums.TCMTreatmentCategoryType;
        description: string | null;
        customTags: string | null;
        indications: string | null;
        contraindications: string | null;
        suggestedDuration: number | null;
        referencePrice: number | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        name: string;
        updatedAt: Date;
        category: import("@prisma/client").$Enums.TCMTreatmentCategoryType;
        description: string | null;
        customTags: string | null;
        indications: string | null;
        contraindications: string | null;
        suggestedDuration: number | null;
        referencePrice: number | null;
    }>;
}
//# sourceMappingURL=tcm-treatments.controller.d.ts.map