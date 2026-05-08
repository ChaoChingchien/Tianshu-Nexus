import { PrismaService } from '../../../common/prisma/prisma.service';
export declare class TreatmentCatalogService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(query: {
        search?: string;
        category?: string;
        page?: number;
        limit?: number;
    }): Promise<{
        items: {
            id: string;
            createdAt: Date;
            name: string;
            isActive: boolean;
            updatedAt: Date;
            code: string | null;
            category: import("@prisma/client").$Enums.TreatmentCategoryType;
            description: string | null;
            price: number | null;
            standardDuration: number | null;
            standardFrequency: string | null;
            requiredEquipment: string | null;
            cancelLeadTime: number | null;
            customTags: string | null;
        }[];
        total: number;
        page: number;
        limit: number;
    }>;
    findById(id: string): Promise<{
        id: string;
        createdAt: Date;
        name: string;
        isActive: boolean;
        updatedAt: Date;
        code: string | null;
        category: import("@prisma/client").$Enums.TreatmentCategoryType;
        description: string | null;
        price: number | null;
        standardDuration: number | null;
        standardFrequency: string | null;
        requiredEquipment: string | null;
        cancelLeadTime: number | null;
        customTags: string | null;
    }>;
    create(dto: any): Promise<{
        id: string;
        createdAt: Date;
        name: string;
        isActive: boolean;
        updatedAt: Date;
        code: string | null;
        category: import("@prisma/client").$Enums.TreatmentCategoryType;
        description: string | null;
        price: number | null;
        standardDuration: number | null;
        standardFrequency: string | null;
        requiredEquipment: string | null;
        cancelLeadTime: number | null;
        customTags: string | null;
    }>;
    update(id: string, dto: any): Promise<{
        id: string;
        createdAt: Date;
        name: string;
        isActive: boolean;
        updatedAt: Date;
        code: string | null;
        category: import("@prisma/client").$Enums.TreatmentCategoryType;
        description: string | null;
        price: number | null;
        standardDuration: number | null;
        standardFrequency: string | null;
        requiredEquipment: string | null;
        cancelLeadTime: number | null;
        customTags: string | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        name: string;
        isActive: boolean;
        updatedAt: Date;
        code: string | null;
        category: import("@prisma/client").$Enums.TreatmentCategoryType;
        description: string | null;
        price: number | null;
        standardDuration: number | null;
        standardFrequency: string | null;
        requiredEquipment: string | null;
        cancelLeadTime: number | null;
        customTags: string | null;
    }>;
}
//# sourceMappingURL=treatment-catalog.service.d.ts.map