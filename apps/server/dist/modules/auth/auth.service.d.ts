import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../common/prisma/prisma.service';
export declare class AuthService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    login(username: string, password: string): Promise<{
        accessToken: string;
        user: {
            id: any;
            username: any;
            displayName: any;
            role: any;
            permissions: any;
        };
    } | {
        requiresTotp: boolean;
        userId: string;
    }>;
    verifyTotp(userId: string, token: string): Promise<{
        accessToken: string;
        user: {
            id: any;
            username: any;
            displayName: any;
            role: any;
            permissions: any;
        };
    }>;
    register(dto: {
        username: string;
        password: string;
        displayName: string;
        invitationCode: string;
        hospital?: string;
        department?: string;
    }): Promise<{
        accessToken: string;
        user: {
            id: any;
            username: any;
            displayName: any;
            role: any;
            permissions: any;
        };
    }>;
    getProfile(userId: string): Promise<{
        id: string;
        createdAt: Date;
        username: string;
        email: string | null;
        displayName: string;
        role: import("@prisma/client").$Enums.Role;
        totpEnabled: boolean;
        department: string | null;
        hospital: string | null;
        phone: string | null;
        avatarUrl: string | null;
        isFirstLogin: boolean;
    } | null>;
    private generateToken;
}
//# sourceMappingURL=auth.service.d.ts.map