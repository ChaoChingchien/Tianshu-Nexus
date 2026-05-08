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
exports.LeaveService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../common/prisma/prisma.service");
let LeaveService = class LeaveService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(query) {
        const { userId, status, type, startDate, endDate, page = 1, limit = 20 } = query;
        const where = {};
        if (userId)
            where.patientId = userId;
        if (status)
            where.status = status;
        if (type)
            where.leaveType = type;
        if (startDate || endDate) {
            where.startTime = {};
            if (startDate)
                where.startTime.gte = new Date(startDate);
            if (endDate)
                where.startTime.lte = new Date(endDate);
        }
        const [items, total] = await Promise.all([
            this.prisma.leaveRequest.findMany({
                where,
                skip: (page - 1) * limit,
                take: limit,
                orderBy: { createdAt: 'desc' },
                include: { patient: true, approvedBy: true },
            }),
            this.prisma.leaveRequest.count({ where }),
        ]);
        return { items, total, page, limit };
    }
    async findById(id) {
        const leave = await this.prisma.leaveRequest.findUnique({
            where: { id },
            include: { patient: true, approvedBy: true },
        });
        if (!leave)
            throw new common_1.NotFoundException('请假申请不存在');
        return leave;
    }
    async create(dto) {
        return this.prisma.leaveRequest.create({
            data: { ...dto, status: 'PENDING_APPROVAL' },
        });
    }
    async update(id, dto) {
        const leave = await this.prisma.leaveRequest.findUnique({ where: { id } });
        if (!leave)
            throw new common_1.NotFoundException('请假申请不存在');
        return this.prisma.leaveRequest.update({ where: { id }, data: dto });
    }
    async approve(id) {
        const leave = await this.prisma.leaveRequest.findUnique({ where: { id } });
        if (!leave)
            throw new common_1.NotFoundException('请假申请不存在');
        return this.prisma.leaveRequest.update({
            where: { id },
            data: { status: 'APPROVED', approvedAt: new Date() },
        });
    }
    async reject(id, dto) {
        const leave = await this.prisma.leaveRequest.findUnique({ where: { id } });
        if (!leave)
            throw new common_1.NotFoundException('请假申请不存在');
        return this.prisma.leaveRequest.update({
            where: { id },
            data: { status: 'REJECTED' },
        });
    }
    async cancel(id) {
        const leave = await this.prisma.leaveRequest.findUnique({ where: { id } });
        if (!leave)
            throw new common_1.NotFoundException('请假申请不存在');
        return this.prisma.leaveRequest.update({
            where: { id },
            data: { status: 'REJECTED' },
        });
    }
};
exports.LeaveService = LeaveService;
exports.LeaveService = LeaveService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], LeaveService);
//# sourceMappingURL=leave.service.js.map