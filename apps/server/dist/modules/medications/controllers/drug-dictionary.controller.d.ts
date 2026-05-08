import { DrugDictionaryService } from '../services/drug-dictionary.service';
export declare class DrugDictionaryController {
    private drugDictionaryService;
    constructor(drugDictionaryService: DrugDictionaryService);
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
            category: import("@prisma/client").$Enums.DrugCategory;
            description: string | null;
            genericName: string | null;
            specification: string | null;
            unit: string | null;
            defaultDosage: string | null;
            usage: string | null;
            price: number | null;
            manufacturer: string | null;
            totalStock: number;
            minStockWarning: number;
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
        category: import("@prisma/client").$Enums.DrugCategory;
        description: string | null;
        genericName: string | null;
        specification: string | null;
        unit: string | null;
        defaultDosage: string | null;
        usage: string | null;
        price: number | null;
        manufacturer: string | null;
        totalStock: number;
        minStockWarning: number;
    }>;
    create(dto: any): Promise<{
        id: string;
        createdAt: Date;
        name: string;
        isActive: boolean;
        updatedAt: Date;
        category: import("@prisma/client").$Enums.DrugCategory;
        description: string | null;
        genericName: string | null;
        specification: string | null;
        unit: string | null;
        defaultDosage: string | null;
        usage: string | null;
        price: number | null;
        manufacturer: string | null;
        totalStock: number;
        minStockWarning: number;
    }>;
    update(id: string, dto: any): Promise<{
        id: string;
        createdAt: Date;
        name: string;
        isActive: boolean;
        updatedAt: Date;
        category: import("@prisma/client").$Enums.DrugCategory;
        description: string | null;
        genericName: string | null;
        specification: string | null;
        unit: string | null;
        defaultDosage: string | null;
        usage: string | null;
        price: number | null;
        manufacturer: string | null;
        totalStock: number;
        minStockWarning: number;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        name: string;
        isActive: boolean;
        updatedAt: Date;
        category: import("@prisma/client").$Enums.DrugCategory;
        description: string | null;
        genericName: string | null;
        specification: string | null;
        unit: string | null;
        defaultDosage: string | null;
        usage: string | null;
        price: number | null;
        manufacturer: string | null;
        totalStock: number;
        minStockWarning: number;
    }>;
}
//# sourceMappingURL=drug-dictionary.controller.d.ts.map