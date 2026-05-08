import { AuditService } from './audit.service';
export declare class AuditController {
    private auditService;
    constructor(auditService: AuditService);
    findAll(query: {
        userId?: string;
        action?: string;
        resourceType?: string;
        startDate?: string;
        endDate?: string;
        page?: number;
        limit?: number;
    }): Promise<{
        items: ({
            operator: {
                id: string;
                username: string;
                displayName: string;
            };
        } & {
            id: string;
            action: string;
            sessionId: string | null;
            ipAddress: string | null;
            resourceType: string | null;
            resourceId: string | null;
            details: string | null;
            success: boolean;
            failureReason: string | null;
            createdAt: Date;
            operatorId: string;
        })[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(id: string): Promise<{
        operator: {
            id: string;
            username: string;
            displayName: string;
        };
    } & {
        id: string;
        action: string;
        sessionId: string | null;
        ipAddress: string | null;
        resourceType: string | null;
        resourceId: string | null;
        details: string | null;
        success: boolean;
        failureReason: string | null;
        createdAt: Date;
        operatorId: string;
    }>;
    getStats(query: {
        startDate?: string;
        endDate?: string;
    }): Promise<{
        total: number;
        today: number;
        success: number;
        failed: number;
    }>;
}
//# sourceMappingURL=audit.controller.d.ts.map