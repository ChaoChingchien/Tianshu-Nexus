import { PrismaService } from '../../../common/prisma/prisma.service';
export declare class DoctorSchedulesService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(query: {
        doctorId?: string;
        startDate?: string;
        endDate?: string;
        page?: number;
        limit?: number;
    }): Promise<{
        items: ({
            doctor: {
                id: string;
                createdAt: Date;
                username: string;
                email: string | null;
                passwordHash: string;
                displayName: string;
                role: import("@prisma/client").$Enums.Role;
                isActive: boolean;
                totpSecret: string | null;
                totpEnabled: boolean;
                department: string | null;
                hospital: string | null;
                phone: string | null;
                avatarUrl: string | null;
                isFirstLogin: boolean;
                permissions: string | null;
                updatedAt: Date;
                deletedAt: Date | null;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            doctorId: string;
            dayOfWeek: number;
            startTime: string;
            endTime: string;
            isAvailable: boolean;
        })[];
        total: number;
        page: number;
        limit: number;
    }>;
    findById(id: string): Promise<{
        doctor: {
            id: string;
            createdAt: Date;
            username: string;
            email: string | null;
            passwordHash: string;
            displayName: string;
            role: import("@prisma/client").$Enums.Role;
            isActive: boolean;
            totpSecret: string | null;
            totpEnabled: boolean;
            department: string | null;
            hospital: string | null;
            phone: string | null;
            avatarUrl: string | null;
            isFirstLogin: boolean;
            permissions: string | null;
            updatedAt: Date;
            deletedAt: Date | null;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        doctorId: string;
        dayOfWeek: number;
        startTime: string;
        endTime: string;
        isAvailable: boolean;
    }>;
    create(dto: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        doctorId: string;
        dayOfWeek: number;
        startTime: string;
        endTime: string;
        isAvailable: boolean;
    }>;
    update(id: string, dto: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        doctorId: string;
        dayOfWeek: number;
        startTime: string;
        endTime: string;
        isAvailable: boolean;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        doctorId: string;
        dayOfWeek: number;
        startTime: string;
        endTime: string;
        isAvailable: boolean;
    }>;
}
//# sourceMappingURL=doctor-schedules.service.d.ts.map