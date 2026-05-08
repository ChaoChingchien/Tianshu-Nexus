import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { PrismaService } from '../prisma/prisma.service';
export declare class AuditLogInterceptor implements NestInterceptor {
    private prisma;
    private readonly skipPaths;
    constructor(prisma: PrismaService);
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
    private resolveResourceType;
    private resolveAction;
    private extractResourceId;
}
//# sourceMappingURL=audit-log.interceptor.d.ts.map