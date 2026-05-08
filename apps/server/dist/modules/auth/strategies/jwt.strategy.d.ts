import { Strategy } from 'passport-jwt';
import { PrismaService } from '../../../common/prisma/prisma.service';
interface JwtPayload {
    sub: string;
    username: string;
    role: string;
}
declare const JwtStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtStrategy extends JwtStrategy_base {
    private prisma;
    constructor(prisma: PrismaService);
    validate(payload: JwtPayload): Promise<{
        id: string;
        username: string;
        displayName: string;
        role: import("@prisma/client").$Enums.Role;
        isActive: boolean;
        totpEnabled: boolean;
        permissions: string | null;
    } | null>;
}
export {};
//# sourceMappingURL=jwt.strategy.d.ts.map