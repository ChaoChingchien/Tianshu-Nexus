import { ProfileService } from './profile.service';
export declare class ProfileController {
    private profileService;
    constructor(profileService: ProfileService);
    getProfile(user: any): Promise<{
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
    updateProfile(user: any, dto: any): Promise<{
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
    changePassword(user: any, dto: {
        oldPassword: string;
        newPassword: string;
    }): Promise<{
        success: boolean;
        message: string;
    }>;
    getPortfolio(user: any): Promise<{}>;
    updatePortfolio(user: any, dto: any): Promise<{
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
    getUserProfile(userId: string): Promise<{
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
    getUserPortfolio(userId: string): Promise<{}>;
}
//# sourceMappingURL=profile.controller.d.ts.map