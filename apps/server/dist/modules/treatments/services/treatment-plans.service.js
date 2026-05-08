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
exports.TreatmentPlansService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../common/prisma/prisma.service");
let TreatmentPlansService = class TreatmentPlansService {
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
            this.prisma.treatmentPlan.findMany({
                where,
                skip: (page - 1) * limit,
                take: limit,
                orderBy: { createdAt: 'desc' },
                include: { patient: true },
            }),
            this.prisma.treatmentPlan.count({ where }),
        ]);
        return { items, total, page, limit };
    }
    async findById(id) {
        const plan = await this.prisma.treatmentPlan.findUnique({
            where: { id },
            include: { patient: true, medicalRecord: true },
        });
        if (!plan)
            throw new common_1.NotFoundException('治疗方案不存在');
        return plan;
    }
    async create(dto) {
        return this.prisma.treatmentPlan.create({
            data: { ...dto, status: 'DRAFT' },
        });
    }
    async update(id, dto) {
        const plan = await this.prisma.treatmentPlan.findUnique({ where: { id } });
        if (!plan)
            throw new common_1.NotFoundException('治疗方案不存在');
        return this.prisma.treatmentPlan.update({ where: { id }, data: dto });
    }
    async activate(id) {
        const plan = await this.prisma.treatmentPlan.findUnique({ where: { id } });
        if (!plan)
            throw new common_1.NotFoundException('治疗方案不存在');
        return this.prisma.treatmentPlan.update({
            where: { id },
            data: { status: 'IN_PROGRESS' },
        });
    }
    async complete(id) {
        const plan = await this.prisma.treatmentPlan.findUnique({ where: { id } });
        if (!plan)
            throw new common_1.NotFoundException('治疗方案不存在');
        return this.prisma.treatmentPlan.update({
            where: { id },
            data: { status: 'COMPLETED' },
        });
    }
};
exports.TreatmentPlansService = TreatmentPlansService;
exports.TreatmentPlansService = TreatmentPlansService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TreatmentPlansService);
//# sourceMappingURL=treatment-plans.service.js.map