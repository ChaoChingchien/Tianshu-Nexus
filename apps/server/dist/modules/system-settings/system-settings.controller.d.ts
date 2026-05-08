import { SystemSettingsService } from './system-settings.service';
export declare class SystemSettingsController {
    private systemSettingsService;
    constructor(systemSettingsService: SystemSettingsService);
    get(): Promise<{}>;
    update(dto: Record<string, any>): Promise<{
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
//# sourceMappingURL=system-settings.controller.d.ts.map