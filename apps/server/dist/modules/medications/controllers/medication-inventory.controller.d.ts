import { MedicationInventoryService } from '../services/medication-inventory.service';
export declare class MedicationInventoryController {
    private medicationInventoryService;
    constructor(medicationInventoryService: MedicationInventoryService);
    findAll(query: {
        drugId?: string;
        batchNo?: string;
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
}
//# sourceMappingURL=medication-inventory.controller.d.ts.map