import { PrismaService } from '../../../common/prisma/prisma.service';
export declare class MedicationInventoryService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(query: {
        drugId?: string;
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
    findById(id: string): Promise<{
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
    update(id: string, dto: {
        totalStock?: number;
        minStockWarning?: number;
    }): Promise<{
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
//# sourceMappingURL=medication-inventory.service.d.ts.map