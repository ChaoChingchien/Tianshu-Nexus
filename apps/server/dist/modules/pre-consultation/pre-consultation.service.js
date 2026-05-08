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
exports.PreConsultationService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../common/prisma/prisma.service");
let PreConsultationService = class PreConsultationService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(query) {
        const { patientId, page = 1, limit = 20 } = query;
        const where = {};
        if (patientId) {
            where.patientId = patientId;
        }
        const [items, total] = await Promise.all([
            this.prisma.medicalRecord.findMany({
                where,
                skip: (page - 1) * limit,
                take: limit,
                orderBy: { createdAt: 'desc' },
            }),
            this.prisma.medicalRecord.count({ where }),
        ]);
        return { items, total, page, limit };
    }
    async findById(id) {
        const record = await this.prisma.medicalRecord.findUnique({
            where: { id },
        });
        if (!record)
            throw new common_1.NotFoundException('预诊问卷不存在');
        return record;
    }
    async create(dto) {
        return this.prisma.medicalRecord.create({
            data: { ...dto },
        });
    }
    async update(id, dto) {
        const record = await this.prisma.medicalRecord.findUnique({ where: { id } });
        if (!record)
            throw new common_1.NotFoundException('预诊问卷不存在');
        return this.prisma.medicalRecord.update({ where: { id }, data: dto });
    }
    async submitStep(id, step, dto) {
        const record = await this.prisma.medicalRecord.findUnique({ where: { id } });
        if (!record)
            throw new common_1.NotFoundException('预诊问卷不存在');
        const updateData = {};
        if (step === 1)
            updateData.symptoms = JSON.stringify(dto);
        if (step === 2)
            updateData.medicalHistory = JSON.stringify(dto);
        if (step === 3) {
            updateData.diagnosis = JSON.stringify(dto);
        }
        return this.prisma.medicalRecord.update({
            where: { id },
            data: updateData,
        });
    }
};
exports.PreConsultationService = PreConsultationService;
exports.PreConsultationService = PreConsultationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PreConsultationService);
//# sourceMappingURL=pre-consultation.service.js.map