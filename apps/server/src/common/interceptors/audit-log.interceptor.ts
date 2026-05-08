import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { PrismaService } from '../prisma/prisma.service';
import { Request } from 'express';

interface AuditableRequest extends Request {
  user?: { id: string; role: string };
}

@Injectable()
export class AuditLogInterceptor implements NestInterceptor {
  private readonly skipPaths = ['/api/v1/auth/login', '/api/v1/auth/verify-totp'];

  constructor(private prisma: PrismaService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<AuditableRequest>();
    const { method, path, ip, user } = request;

    // Skip uninteresting paths
    if (this.skipPaths.includes(path)) {
      return next.handle();
    }

    const resourceType = this.resolveResourceType(path);
    const action = this.resolveAction(method, path);

    // No audit mapping — skip silently
    if (!action) {
      return next.handle();
    }

    const startTime = Date.now();

    return next.handle().pipe(
      tap({
        next: () => {
          if (!user) return;
          this.prisma.auditLog.create({
            data: {
              action,
              operatorId: user.id,
              ipAddress: ip || '',
              resourceType,
              resourceId: this.extractResourceId(path),
              success: true,
              details: JSON.stringify({ method, path, duration: Date.now() - startTime }),
            },
          }).catch(() => {});
        },
        error: (err) => {
          if (!user) return;
          this.prisma.auditLog.create({
            data: {
              action,
              operatorId: user.id,
              ipAddress: ip || '',
              resourceType,
              resourceId: this.extractResourceId(path),
              success: false,
              failureReason: err.message?.slice(0, 500),
              details: JSON.stringify({ method, path, duration: Date.now() - startTime }),
            },
          }).catch(() => {});
        },
      }),
    );
  }

  private resolveResourceType(path: string): string | null {
    const segments = path.replace('/api/v1/', '').split('/');
    return segments[0] || null;
  }

  private resolveAction(method: string, path: string): string | null {
    const p = path.replace('/api/v1/', '');
    const resource = p.split('/')[0];

    const map: Record<string, Record<string, string>> = {
      users:       { POST: 'CREATE_USER', GET: 'VIEW_USER', PATCH: 'UPDATE_USER', DELETE: 'DELETE_USER' },
      patients:    { POST: 'CREATE_PATIENT', GET: 'VIEW_PATIENT', PATCH: 'UPDATE_PATIENT', DELETE: 'DELETE_PATIENT' },
      medications: { POST: 'CREATE_MEDICATION', GET: 'VIEW_MEDICATION', PATCH: 'UPDATE_MEDICATION', DELETE: 'DELETE_MEDICATION' },
      treatments:  { POST: 'CREATE_TREATMENT', GET: 'VIEW_TREATMENT', PATCH: 'UPDATE_TREATMENT', DELETE: 'DELETE_TREATMENT' },
      scheduling:  { POST: 'CREATE_SCHEDULE', GET: 'VIEW_SCHEDULE', PATCH: 'UPDATE_SCHEDULE', DELETE: 'DELETE_SCHEDULE' },
      followups:   { POST: 'CREATE_FOLLOWUP', GET: 'VIEW_FOLLOWUP', PATCH: 'UPDATE_FOLLOWUP', DELETE: 'DELETE_FOLLOWUP' },
      education:   { POST: 'CREATE_ARTICLE', GET: 'VIEW_ARTICLE', PATCH: 'UPDATE_ARTICLE', DELETE: 'DELETE_ARTICLE' },
      leave:       { POST: 'CREATE_LEAVE', GET: 'VIEW_LEAVE', PATCH: 'UPDATE_LEAVE' },
      'system-settings': { POST: 'UPDATE_SETTINGS', GET: 'VIEW_SETTINGS' },
    };

    return map[resource]?.[method] || null;
  }

  private extractResourceId(path: string): string | undefined {
    const match = path.replace('/api/v1/', '').match(/[^/]+\/([a-zA-Z0-9-]+)(?:\/|$)/);
    return match?.[1];
  }
}
