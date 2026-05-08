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
exports.TcmTreatmentsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../common/prisma/prisma.service");
let TcmTreatmentsService = class TcmTreatmentsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(query) {
        const { patientId, type, page = 1, limit = 20 } = query;
        const where = { deletedAt: null };
        if (patientId)
            where.patientId = patientId;
        if (type)
            where.type = type;
        const [items, total] = await Promise.all([
            this.prisma.tCMTreatment.findMany({
                where,
                skip: (page - 1) * limit,
                take: limit,
                orderBy: { createdAt: 'desc' },
            }),
            this.prisma.tCMTreatment.count({ where }),
        ]);
        return { items, total, page, limit };
    }
    async findById(id) {
        const treatment = await this.prisma.tCMTreatment.findUnique({
            where: { id },
        });
        if (!treatment)
            throw new common_1.NotFoundException('治疗记录不存在');
        return treatment;
    }
    async create(dto) {
        return this.prisma.tCMTreatment.create({ data: dto });
    }
    async update(id, dto) {
        const treatment = await this.prisma.tCMTreatment.findUnique({ where: { id } });
        if (!treatment)
            throw new common_1.NotFoundException('治疗记录不存在');
        return this.prisma.tCMTreatment.update({ where: { id }, data: dto });
    }
    async remove(id) {
        const treatment = await this.prisma.tCMTreatment.findUnique({ where: { id } });
        if (!treatment)
            throw new common_1.NotFoundException('治疗记录不存在');
        return this.prisma.tCMTreatment.delete({ where: { id } });
    }
};
exports.TcmTreatmentsService = TcmTreatmentsService;
exports.TcmTreatmentsService = TcmTreatmentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TcmTreatmentsService);
//# sourceMappingURL=tcm-treatments.service.js.map