import { PrismaService } from '../../common/prisma/prisma.service';
import { Role } from '@tianshu/shared';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(query: {
        role?: string;
        search?: string;
    }): Promise<{
        id: string;
        createdAt: Date;
        username: string;
        email: string | null;
        displayName: string;
        role: import("@prisma/client").$Enums.Role;
        isActive: boolean;
        department: string | null;
        hospital: string | null;
        phone: string | null;
        permissions: string | null;
    }[]>;
    findById(id: string): Promise<{
        id: string;
        createdAt: Date;
        username: string;
        email: string | null;
        displayName: string;
        role: import("@prisma/client").$Enums.Role;
        isActive: boolean;
        totpEnabled: boolean;
        department: string | null;
        hospital: string | null;
        phone: string | null;
        permissions: string | null;
        updatedAt: Date;
    }>;
    create(dto: {
        username: string;
        password: string;
        displayName: string;
        role: Role;
        department?: string;
        hospital?: string;
        email?: string;
        phone?: string;
        permissions?: string;
    }): Promise<{
        id: string;
        createdAt: Date;
        username: string;
        displayName: string;
        role: import("@prisma/client").$Enums.Role;
    }>;
    update(id: string, dto: {
        displayName?: string;
        isActive?: boolean;
        department?: string;
        hospital?: string;
        email?: string;
        phone?: string;
        permissions?: string;
    }): Promise<{
        id: string;
        username: string;
        displayName: string;
        role: import("@prisma/client").$Enums.Role;
        isActive: boolean;
        permissions: string | null;
    }>;
    remove(id: string): Promise<{
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
    }>;
}
//# sourceMappingURL=users.service.d.ts.map