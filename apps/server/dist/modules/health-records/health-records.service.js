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
exports.HealthRecordsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../common/prisma/prisma.service");
let HealthRecordsService = class HealthRecordsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(query) {
        const { patientId, type, page = 1, limit = 20 } = query;
        const where = {};
        if (patientId)
            where.patientId = patientId;
        if (type)
            where.type = type;
        const [items, total] = await Promise.all([
            this.prisma.healthRecord.findMany({
                where,
                skip: (page - 1) * limit,
                take: limit,
                orderBy: { createdAt: 'desc' },
                include: { patient: true },
            }),
            this.prisma.healthRecord.count({ where }),
        ]);
        return { items, total, page, limit };
    }
    async findById(id) {
        const record = await this.prisma.healthRecord.findUnique({
            where: { id },
            include: { patient: true },
        });
        if (!record)
            throw new common_1.NotFoundException('健康档案不存在');
        return record;
    }
    async create(dto) {
        return this.prisma.healthRecord.create({ data: dto });
    }
    async update(id, dto) {
        const record = await this.prisma.healthRecord.findUnique({ where: { id } });
        if (!record)
            throw new common_1.NotFoundException('健康档案不存在');
        return this.prisma.healthRecord.update({ where: { id }, data: dto });
    }
    async remove(id) {
        const record = await this.prisma.healthRecord.findUnique({ where: { id } });
        if (!record)
            throw new common_1.NotFoundException('健康档案不存在');
        return this.prisma.healthRecord.delete({ where: { id } });
    }
};
exports.HealthRecordsService = HealthRecordsService;
exports.HealthRecordsService = HealthRecordsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], HealthRecordsService);
//# sourceMappingURL=health-records.service.js.map