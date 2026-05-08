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
exports.PatientGroupsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../common/prisma/prisma.service");
let PatientGroupsService = class PatientGroupsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(query) {
        const { search, page = 1, limit = 20 } = query;
        const where = { deletedAt: null };
        if (search) {
            where.name = { contains: search };
        }
        const [items, total] = await Promise.all([
            this.prisma.patientGroup.findMany({
                where,
                skip: (page - 1) * limit,
                take: limit,
                orderBy: { createdAt: 'desc' },
                include: { _count: { select: { members: true } } },
            }),
            this.prisma.patientGroup.count({ where }),
        ]);
        return { items, total, page, limit };
    }
    async findById(id) {
        const group = await this.prisma.patientGroup.findUnique({
            where: { id },
            include: { members: { include: { patient: true } } },
        });
        if (!group)
            throw new common_1.NotFoundException('分组不存在');
        return group;
    }
    async create(dto) {
        return this.prisma.patientGroup.create({ data: dto });
    }
    async update(id, dto) {
        const group = await this.prisma.patientGroup.findUnique({ where: { id } });
        if (!group)
            throw new common_1.NotFoundException('分组不存在');
        return this.prisma.patientGroup.update({ where: { id }, data: dto });
    }
    async remove(id) {
        const group = await this.prisma.patientGroup.findUnique({ where: { id } });
        if (!group)
            throw new common_1.NotFoundException('分组不存在');
        return this.prisma.patientGroup.delete({ where: { id } });
    }
    async addPatients(id, patientIds) {
        const group = await this.prisma.patientGroup.findUnique({ where: { id } });
        if (!group)
            throw new common_1.NotFoundException('分组不存在');
        return this.prisma.patientGroup.update({
            where: { id },
            data: {
                members: {
                    create: patientIds.map((patientId) => ({ patientId })),
                },
            },
            include: { members: { include: { patient: true } } },
        });
    }
    async removePatient(id, patientId) {
        const group = await this.prisma.patientGroup.findUnique({ where: { id } });
        if (!group)
            throw new common_1.NotFoundException('分组不存在');
        return this.prisma.patientGroup.update({
            where: { id },
            data: {
                members: {
                    deleteMany: { patientId },
                },
            },
            include: { members: { include: { patient: true } } },
        });
    }
};
exports.PatientGroupsService = PatientGroupsService;
exports.PatientGroupsService = PatientGroupsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PatientGroupsService);
//# sourceMappingURL=patient-groups.service.js.map