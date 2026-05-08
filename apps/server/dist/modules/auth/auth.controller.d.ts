import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(dto: {
        username: string;
        password: string;
    }): Promise<{
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
    verifyTotp(dto: {
        userId: string;
        token: string;
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
    getProfile(user: any): Promise<{
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
}
//# sourceMappingURL=auth.controller.d.ts.map