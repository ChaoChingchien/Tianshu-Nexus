import { PrismaService } from '../../common/prisma/prisma.service';
export declare class SystemSettingsService {
    private prisma;
    constructor(prisma: PrismaService);
    getSettings(): Promise<{}>;
    updateSettings(dto: Record<string, any>): Promise<{
        id: string;
        updatedAt: Date;
        systemName: string;
        systemDescription: string | null;
        enableSelfRegistration: boolean;
        enableTwoFactorAuth: boolean;
        sessionTimeoutMinutes: number;
        maxLoginAttempts: number;
        enableAuditLog: boolean;
        auditLogRetentionDays: number;
        enablePiiMask: boolean;
        defaultLanguage: string;
        timezone: string;
        enableDataBackup: boolean;
        backupIntervalHours: number;
    }>;
}
//# sourceMappingURL=system-settings.service.d.ts.map