"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuditLogInterceptor = void 0;
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
const prisma_service_1 = require("../prisma/prisma.service");
let AuditLogInterceptor = class AuditLogInterceptor {
    prisma;
    skipPaths = ['/api/v1/auth/login', '/api/v1/auth/verify-totp'];
    constructor(prisma) {
        this.prisma = prisma;
    }
    intercept(context, next) {
        const request = context.switchToHttp().getRequest();
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
        return next.handle().pipe((0, operators_1.tap)({
            next: () => {
                if (!user)
                    return;
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
                }).catch(() => { });
            },
            error: (err) => {
                if (!user)
                    return;
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
                }).catch(() => { });
            },
        }));
    }
    resolveResourceType(path) {
        const segments = path.replace('/api/v1/', '').split('/');
        return segments[0] || null;
    }
    resolveAction(method, path) {
        const p = path.replace('/api/v1/', '');
        const resource = p.split('/')[0];
        const map = {
            users: { POST: 'CREATE_USER', GET: 'VIEW_USER', PATCH: 'UPDATE_USER', DELETE: 'DELETE_USER' },
            patients: { POST: 'CREATE_PATIENT', GET: 'VIEW_PATIENT', PATCH: 'UPDATE_PATIENT', DELETE: 'DELETE_PATIENT' },
            medications: { POST: 'CREATE_MEDICATION', GET: 'VIEW_MEDICATION', PATCH: 'UPDATE_MEDICATION', DELETE: 'DELETE_MEDICATION' },
            treatments: { POST: 'CREATE_TREATMENT', GET: 'VIEW_TREATMENT', PATCH: 'UPDATE_TREATMENT', DELETE: 'DELETE_TREATMENT' },
            scheduling: { POST: 'CREATE_SCHEDULE', GET: 'VIEW_SCHEDULE', PATCH: 'UPDATE_SCHEDULE', DELETE: 'DELETE_SCHEDULE' },
            followups: { POST: 'CREATE_FOLLOWUP', GET: 'VIEW_FOLLOWUP', PATCH: 'UPDATE_FOLLOWUP', DELETE: 'DELETE_FOLLOWUP' },
            education: { POST: 'CREATE_ARTICLE', GET: 'VIEW_ARTICLE', PATCH: 'UPDATE_ARTICLE', DELETE: 'DELETE_ARTICLE' },
            leave: { POST: 'CREATE_LEAVE', GET: 'VIEW_LEAVE', PATCH: 'UPDATE_LEAVE' },
            'system-settings': { POST: 'UPDATE_SETTINGS', GET: 'VIEW_SETTINGS' },
        };
        return map[resource]?.[method] || null;
    }
    extractResourceId(path) {
        const match = path.replace('/api/v1/', '').match(/[^/]+\/([a-zA-Z0-9-]+)(?:\/|$)/);
        return match?.[1];
    }
};
exports.AuditLogInterceptor = AuditLogInterceptor;
exports.AuditLogInterceptor = AuditLogInterceptor = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AuditLogInterceptor);
//# sourceMappingURL=audit-log.interceptor.js.map