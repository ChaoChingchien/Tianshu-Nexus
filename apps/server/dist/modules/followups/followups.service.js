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
exports.FollowupsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../common/prisma/prisma.service");
let FollowupsService = class FollowupsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(query) {
        const { patientId, status, page = 1, limit = 20 } = query;
        const where = {};
        if (patientId)
            where.patientId = patientId;
        if (status)
            where.status = status;
        const [items, total] = await Promise.all([
            this.prisma.followUp.findMany({
                where,
                skip: (page - 1) * limit,
                take: limit,
                orderBy: { createdAt: 'desc' },
                include: { patient: true, doctor: true },
            }),
            this.prisma.followUp.count({ where }),
        ]);
        return { items, total, page, limit };
    }
    async findById(id) {
        const plan = await this.prisma.followUp.findUnique({
            where: { id },
            include: { patient: true, doctor: true },
        });
        if (!plan)
            throw new common_1.NotFoundException('随访计划不存在');
        return plan;
    }
    async create(dto) {
        return this.prisma.followUp.create({
            data: { ...dto, status: 'PENDING' },
        });
    }
    async update(id, dto) {
        const plan = await this.prisma.followUp.findUnique({ where: { id } });
        if (!plan)
            throw new common_1.NotFoundException('随访计划不存在');
        return this.prisma.followUp.update({ where: { id }, data: dto });
    }
    async execute(id, dto) {
        const plan = await this.prisma.followUp.findUnique({ where: { id } });
        if (!plan)
            throw new common_1.NotFoundException('随访计划不存在');
        return this.prisma.followUp.update({
            where: { id },
            data: {
                ...dto,
                status: 'COMPLETED',
            },
        });
    }
    async findAllRecords(query) {
        const { planId, patientId, page = 1, limit = 20 } = query;
        const where = {};
        if (planId)
            where.id = planId;
        if (patientId)
            where.patientId = patientId;
        const [items, total] = await Promise.all([
            this.prisma.followUp.findMany({
                where,
                skip: (page - 1) * limit,
                take: limit,
                orderBy: { plannedDate: 'desc' },
                include: { patient: true, doctor: true },
            }),
            this.prisma.followUp.count({ where }),
        ]);
        return { items, total, page, limit };
    }
    async getStats() {
        const [pending, completed, missed] = await Promise.all([
            this.prisma.followUp.count({ where: { status: 'PENDING' } }),
            this.prisma.followUp.count({ where: { status: 'COMPLETED' } }),
            this.prisma.followUp.count({ where: { status: 'MISSED' } }),
        ]);
        return { pending, completed, missed };
    }
    async getTodayPending() {
        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0);
        const todayEnd = new Date();
        todayEnd.setHours(23, 59, 59, 999);
        return this.prisma.followUp.findMany({
            where: {
                status: 'PENDING',
                plannedDate: { gte: todayStart, lte: todayEnd },
            },
            include: { patient: true, doctor: true },
            orderBy: { plannedDate: 'asc' },
        });
    }
};
exports.FollowupsService = FollowupsService;
exports.FollowupsService = FollowupsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], FollowupsService);
//# sourceMappingURL=followups.service.js.map