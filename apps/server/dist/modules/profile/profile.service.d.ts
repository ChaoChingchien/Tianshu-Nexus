import { PrismaService } from '../../common/prisma/prisma.service';
export declare class ProfileService {
    private prisma;
    constructor(prisma: PrismaService);
    getProfile(userId: string): Promise<{
        doctorProfile: {
            id: string;
            createdAt: Date;
            department: string | null;
            hospital: string | null;
            updatedAt: Date;
            userId: string;
            specialties: string | null;
            aiStyleFeatures: string | null;
            practiceProfile: string | null;
            totalCases: number;
            successCases: number;
            treatmentStats: string | null;
        } | null;
        id: string;
        createdAt: Date;
        username: string;
        email: string | null;
        displayName: string;
        role: import("@prisma/client").$Enums.Role;
        department: string | null;
        hospital: string | null;
        phone: string | null;
        avatarUrl: string | null;
        updatedAt: Date;
    }>;
    updateProfile(userId: string, dto: any): Promise<{
        doctorProfile: {
            id: string;
            createdAt: Date;
            department: string | null;
            hospital: string | null;
            updatedAt: Date;
            userId: string;
            specialties: string | null;
            aiStyleFeatures: string | null;
            practiceProfile: string | null;
            totalCases: number;
            successCases: number;
            treatmentStats: string | null;
        } | null;
        id: string;
        username: string;
        email: string | null;
        displayName: string;
        role: import("@prisma/client").$Enums.Role;
        department: string | null;
        hospital: string | null;
        phone: string | null;
        avatarUrl: string | null;
    }>;
    getPortfolio(userId: string): Promise<{}>;
    updatePortfolio(userId: string, dto: any): Promise<{
        id: string;
        createdAt: Date;
        department: string | null;
        hospital: string | null;
        updatedAt: Date;
        userId: string;
        specialties: string | null;
        aiStyleFeatures: string | null;
        practiceProfile: string | null;
        totalCases: number;
        successCases: number;
        treatmentStats: string | null;
    }>;
    changePassword(userId: string, dto: {
        oldPassword: string;
        newPassword: string;
    }): Promise<{
        success: boolean;
        message: string;
    }>;
}
//# sourceMappingURL=profile.service.d.ts.map