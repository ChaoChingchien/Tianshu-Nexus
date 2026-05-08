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
exports.MedicationOrdersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../common/prisma/prisma.service");
let MedicationOrdersService = class MedicationOrdersService {
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
            this.prisma.medicationOrder.findMany({
                where,
                skip: (page - 1) * limit,
                take: limit,
                orderBy: { createdAt: 'desc' },
                include: { patient: true, drug: true },
            }),
            this.prisma.medicationOrder.count({ where }),
        ]);
        return { items, total, page, limit };
    }
    async findById(id) {
        const order = await this.prisma.medicationOrder.findUnique({
            where: { id },
            include: { patient: true, drug: true },
        });
        if (!order)
            throw new common_1.NotFoundException('医嘱不存在');
        return order;
    }
    async create(dto) {
        return this.prisma.medicationOrder.create({
            data: { ...dto, status: 'ACTIVE' },
        });
    }
    async update(id, dto) {
        const order = await this.prisma.medicationOrder.findUnique({ where: { id } });
        if (!order)
            throw new common_1.NotFoundException('医嘱不存在');
        return this.prisma.medicationOrder.update({ where: { id }, data: dto });
    }
    async approve(id) {
        const order = await this.prisma.medicationOrder.findUnique({ where: { id } });
        if (!order)
            throw new common_1.NotFoundException('医嘱不存在');
        return this.prisma.medicationOrder.update({
            where: { id },
            data: { status: 'ACTIVE' },
        });
    }
    async cancel(id) {
        const order = await this.prisma.medicationOrder.findUnique({ where: { id } });
        if (!order)
            throw new common_1.NotFoundException('医嘱不存在');
        return this.prisma.medicationOrder.update({
            where: { id },
            data: { status: 'ACTIVE' },
        });
    }
};
exports.MedicationOrdersService = MedicationOrdersService;
exports.MedicationOrdersService = MedicationOrdersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], MedicationOrdersService);
//# sourceMappingURL=medication-orders.service.js.map