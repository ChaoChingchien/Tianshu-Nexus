import { PrismaService } from '../../../common/prisma/prisma.service';
export declare class TcmTreatmentsService {
    private prisma;
    constructor(prisma: PrismaService);
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
    findById(id: string): Promise<{
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
//# sourceMappingURL=tcm-treatments.service.d.ts.map