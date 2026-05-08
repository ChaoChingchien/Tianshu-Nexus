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
exports.AuditService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../common/prisma/prisma.service");
let AuditService = class AuditService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(query) {
        const { userId, action, resourceType, startDate, endDate, page = 1, limit = 20 } = query;
        const where = {};
        if (userId)
            where.operatorId = userId;
        if (action)
            where.action = action;
        if (resourceType)
            where.resourceType = resourceType;
        if (startDate || endDate) {
            where.createdAt = {};
            if (startDate)
                where.createdAt.gte = new Date(startDate);
            if (endDate)
                where.createdAt.lte = new Date(endDate);
        }
        const [items, total] = await Promise.all([
            this.prisma.auditLog.findMany({
                where,
                skip: (page - 1) * limit,
                take: limit,
                orderBy: { createdAt: 'desc' },
                include: { operator: { select: { id: true, username: true, displayName: true } } },
            }),
            this.prisma.auditLog.count({ where }),
        ]);
        return { items, total, page, limit };
    }
    async findById(id) {
        const log = await this.prisma.auditLog.findUnique({
            where: { id },
            include: { operator: { select: { id: true, username: true, displayName: true } } },
        });
        if (!log)
            throw new common_1.NotFoundException('审计日志不存在');
        return log;
    }
    async getStats(query) {
        const { startDate, endDate } = query;
        const where = {};
        if (startDate || endDate) {
            where.createdAt = {};
            if (startDate)
                where.createdAt.gte = new Date(startDate);
            if (endDate)
                where.createdAt.lte = new Date(endDate);
        }
        // Today range
        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0);
        const todayEnd = new Date();
        todayEnd.setHours(23, 59, 59, 999);
        const [total, today, success, failed] = await Promise.all([
            this.prisma.auditLog.count({ where }),
            this.prisma.auditLog.count({ where: { createdAt: { gte: todayStart, lte: todayEnd } } }),
            this.prisma.auditLog.count({ where: { ...where, success: true } }),
            this.prisma.auditLog.count({ where: { ...where, success: false } }),
        ]);
        return { total, today, success, failed };
    }
};
exports.AuditService = AuditService;
exports.AuditService = AuditService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AuditService);
//# sourceMappingURL=audit.service.js.map