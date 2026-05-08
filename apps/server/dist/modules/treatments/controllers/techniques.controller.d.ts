import { TechniquesService } from '../services/techniques.service';
export declare class TechniquesController {
    private techniquesService;
    constructor(techniquesService: TechniquesService);
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
            updatedAt: Date;
            description: string | null;
            effects: string | null;
            operationMethod: string | null;
            retentionTime: string | null;
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
        description: string | null;
        effects: string | null;
        operationMethod: string | null;
        retentionTime: string | null;
    }>;
    create(dto: any): Promise<{
        id: string;
        createdAt: Date;
        name: string;
        updatedAt: Date;
        description: string | null;
        effects: string | null;
        operationMethod: string | null;
        retentionTime: string | null;
    }>;
    update(id: string, dto: any): Promise<{
        id: string;
        createdAt: Date;
        name: string;
        updatedAt: Date;
        description: string | null;
        effects: string | null;
        operationMethod: string | null;
        retentionTime: string | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        name: string;
        updatedAt: Date;
        description: string | null;
        effects: string | null;
        operationMethod: string | null;
        retentionTime: string | null;
    }>;
}
//# sourceMappingURL=techniques.controller.d.ts.map