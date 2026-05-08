import { TreatmentCatalogService } from '../services/treatment-catalog.service';
export declare class TreatmentCatalogController {
    private treatmentCatalogService;
    constructor(treatmentCatalogService: TreatmentCatalogService);
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
    findOne(id: string): Promise<{
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
//# sourceMappingURL=treatment-catalog.controller.d.ts.map