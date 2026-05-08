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
exports.PatientsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../common/prisma/prisma.service");
let PatientsService = class PatientsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(query) {
        const { category, search, page = 1, limit = 20 } = query;
        const where = { deletedAt: null };
        if (category) {
            where.category = category;
        }
        if (search) {
            where.OR = [
                { name: { contains: search } },
                { phone: { contains: search } },
                { anonymousId: { contains: search } },
            ];
        }
        const [items, total] = await Promise.all([
            this.prisma.patient.findMany({
                where,
                skip: (page - 1) * limit,
                take: limit,
                orderBy: { createdAt: 'desc' },
            }),
            this.prisma.patient.count({ where }),
        ]);
        return { items, total, page, limit };
    }
    async findById(id) {
        const patient = await this.prisma.patient.findUnique({
            where: { id },
            include: { healthRecord: true },
        });
        if (!patient)
            throw new common_1.NotFoundException('患者不存在');
        return patient;
    }
    async create(dto) {
        return this.prisma.patient.create({ data: dto });
    }
    async update(id, dto) {
        const patient = await this.prisma.patient.findUnique({ where: { id } });
        if (!patient)
            throw new common_1.NotFoundException('患者不存在');
        return this.prisma.patient.update({ where: { id }, data: dto });
    }
    async remove(id) {
        const patient = await this.prisma.patient.findUnique({ where: { id } });
        if (!patient)
            throw new common_1.NotFoundException('患者不存在');
        return this.prisma.patient.update({
            where: { id },
            data: { deletedAt: new Date() },
        });
    }
};
exports.PatientsService = PatientsService;
exports.PatientsService = PatientsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PatientsService);
//# sourceMappingURL=patients.service.js.map